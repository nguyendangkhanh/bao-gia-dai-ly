import "server-only";
import { google } from "googleapis";
import fs from "node:fs/promises";
import path from "node:path";

export type DealerRecord = {
  name: string;
  shortName:string;
  groupName: string;
  pass: string;
  priceTier: "agent1" | "agent2";
};

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

export async function getAllDealers() {
  const s1 = process.env.GOOGLE_SHEET_ID_agentPrice1 || "";
  const s2 = process.env.GOOGLE_SHEET_ID_agentPrice2 || "";

  if (!s1 && !s2) {
    throw new Error("Missing GOOGLE_SHEET_ID_agentPrice1/GOOGLE_SHEET_ID_agentPrice2");
  }

  try {
    const [d1, d2] = await Promise.all([
      s1 ? readSheet(s1, "agent1") : Promise.resolve([]),
      s2 ? readSheet(s2, "agent2") : Promise.resolve([]),
    ]);
    return [...d1, ...d2];
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    throw new Error(`SHEET_READ_FAILED:${details}`);
  }
}
