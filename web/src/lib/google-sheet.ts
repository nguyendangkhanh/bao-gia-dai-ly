import "server-only";
import { google } from "googleapis";
import fs from "node:fs/promises";
import path from "node:path";

export type DealerRecord = {
  name: string;
  shortName: string;
  groupName: string;
  pass: string;
  priceTier: "agent1" | "agent2";
};

const DEALERS_CACHE_FILE = path.join(process.cwd(), ".data", "dealers-cache.json");

async function getAuthClient() {
  const credentialPath = path.join(process.cwd(), "client_secret.json");
  const raw = await fs.readFile(credentialPath, "utf-8");
  const parsed = JSON.parse(raw);

  if (!parsed.type || parsed.type !== "service_account") {
    throw new Error("CREDENTIAL_NOT_SERVICE_ACCOUNT");
  }

  return new google.auth.GoogleAuth({
    credentials: parsed,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function readSheet(sheetId: string, tier: "agent1" | "agent2"): Promise<DealerRecord[]> {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "A:D" });
  const rows = res.data.values || [];
  if (rows.length <= 1) return [];

  return rows
    .slice(1)
    .map((row, idx) => {
      const stt = String(row[0] || "").trim();
      const shortName = String(row[1] || "").trim();
      const groupName = String(row[2] || "").trim() || "Chưa phân nhóm";
      const pass = String(row[3] || "").trim();

      return {
        name: groupName || `Đại lý dòng ${stt || idx + 2}`,
        shortName: shortName || groupName || `Đại lý ${stt || idx + 2}`,
        groupName,
        pass,
        priceTier: tier,
      };
    })
    .filter((r) => r.pass);
}

async function readDealerDiskCache(): Promise<DealerRecord[] | null> {
  try {
    const raw = await fs.readFile(DEALERS_CACHE_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.dealers) && parsed.dealers.length > 0) {
      return parsed.dealers as DealerRecord[];
    }
    return null;
  } catch {
    return null;
  }
}

async function writeDealerDiskCache(dealers: DealerRecord[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DEALERS_CACHE_FILE), { recursive: true });
    await fs.writeFile(
      DEALERS_CACHE_FILE,
      JSON.stringify({ updatedAt: new Date().toISOString(), dealers }, null, 2),
      "utf-8",
    );
  } catch {
    // non-critical, ignore
  }
}

async function fetchDealersFromSheets(): Promise<DealerRecord[]> {
  const s1 = process.env.GOOGLE_SHEET_ID_agentPrice1 || "";
  const s2 = process.env.GOOGLE_SHEET_ID_agentPrice2 || "";

  if (!s1 && !s2) {
    throw new Error("Missing GOOGLE_SHEET_ID_agentPrice1/GOOGLE_SHEET_ID_agentPrice2");
  }

  const [d1, d2] = await Promise.all([
    s1 ? readSheet(s1, "agent1") : Promise.resolve([]),
    s2 ? readSheet(s2, "agent2") : Promise.resolve([]),
  ]);
  return [...d1, ...d2];
}

// In-memory cache: reused within the same Node.js process across requests
let memCache: { dealers: DealerRecord[]; fetchedAt: number } | null = null;
const MEM_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getAllDealers(): Promise<DealerRecord[]> {
  // 1. Return in-memory cache if still fresh
  if (memCache && Date.now() - memCache.fetchedAt < MEM_CACHE_TTL_MS) {
    return memCache.dealers;
  }

  // 2. Try fetching live from Google Sheets
  try {
    const dealers = await fetchDealersFromSheets();
    memCache = { dealers, fetchedAt: Date.now() };
    // persist to disk asynchronously — don't await, never blocks login
    writeDealerDiskCache(dealers).catch(() => {});
    return dealers;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);

    // Re-throw errors that are configuration problems (not transient)
    if (msg.includes("CREDENTIAL_NOT_SERVICE_ACCOUNT")) throw error;
    if (msg.includes("Missing GOOGLE_SHEET_ID")) throw error;
    if (msg.includes("The caller does not have permission") || msg.includes("PERMISSION_DENIED")) throw error;
    if (msg.includes("Requested entity was not found") || msg.includes("Unable to parse range")) throw error;

    // 3. Transient error (rate-limit, timeout, network) — try stale in-memory
    if (memCache) {
      console.warn("[dealers] Sheet fetch failed, using stale in-memory cache:", msg);
      return memCache.dealers;
    }

    // 4. Fall back to disk cache
    const diskCached = await readDealerDiskCache();
    if (diskCached) {
      console.warn("[dealers] Sheet fetch failed, using disk cache:", msg);
      memCache = { dealers: diskCached, fetchedAt: Date.now() - MEM_CACHE_TTL_MS + 60_000 };
      return diskCached;
    }

    // 5. No cache at all — surface the error
    throw new Error(`SHEET_READ_FAILED:${msg}`);
  }
}

