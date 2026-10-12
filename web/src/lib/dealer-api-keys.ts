import "server-only";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getAllDealers } from "@/lib/google-sheet";

export type PriceTier = "agent1" | "agent2";

export type DealerApiKeyRecord = {
  keyHash: string;
  apiKeySuffix: string;
  shortName: string;
  groupName: string;
  priceTier: PriceTier;
  createdAt: string;
  revokedAt: string | null;
  lastUsedAt: string | null;
};

type DealerApiKeyStore = {
  keys: DealerApiKeyRecord[];
};

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "dealer-api-keys.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export function hashApiKey(apiKey: string): string {
  return crypto.createHash("sha256").update(apiKey.trim()).digest("hex");
}

function secureCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// In-memory buffer for lastUsedAt to avoid constant disk writes and race conditions
const pendingLastUsed = new Map<string, string>();
let flushTimer: NodeJS.Timeout | null = null;

function scheduleLastUsedUpdate(keyHash: string) {
  pendingLastUsed.set(keyHash, new Date().toISOString());
  if (!flushTimer) {
    flushTimer = setTimeout(async () => {
      flushTimer = null;
      try {
        const store = await readStore();
        let changed = false;
        for (const [hash, time] of pendingLastUsed.entries()) {
          const rec = store.keys.find((k) => k.keyHash === hash);
          if (rec && rec.lastUsedAt !== time) {
            rec.lastUsedAt = time;
            changed = true;
          }
        }
        pendingLastUsed.clear();
        if (changed) {
          await writeStore(store);
        }
      } catch {
        // non-critical, will retry next interval
      }
    }, 5000);
    flushTimer.unref?.();
  }
}

async function readStore(): Promise<DealerApiKeyStore> {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as { keys?: (DealerApiKeyRecord & { apiKey?: string })[] };
    const keys: DealerApiKeyRecord[] = [];
    let migrated = false;

    for (const item of parsed.keys || []) {
      if (item.apiKey && !item.keyHash) {
        // Legacy plaintext format migration
        const keyHash = hashApiKey(item.apiKey);
        const apiKeySuffix = item.apiKey.slice(-6);
        keys.push({
          keyHash,
          apiKeySuffix,
          shortName: item.shortName,
          groupName: item.groupName,
          priceTier: item.priceTier,
          createdAt: item.createdAt,
          revokedAt: item.revokedAt,
          lastUsedAt: item.lastUsedAt,
        });
        migrated = true;
      } else if (item.keyHash) {
        keys.push({
          keyHash: item.keyHash,
          apiKeySuffix: item.apiKeySuffix || item.keyHash.slice(-6),
          shortName: item.shortName,
          groupName: item.groupName,
          priceTier: item.priceTier,
          createdAt: item.createdAt,
          revokedAt: item.revokedAt,
          lastUsedAt: item.lastUsedAt,
        });
      }
    }

    const store: DealerApiKeyStore = { keys };
    if (migrated) {
      await writeStore(store);
    }
    return store;
  } catch {
    return { keys: [] };
  }
}

// Atomic file write using temp file and rename to avoid partial writes / corruption
async function writeStore(store: DealerApiKeyStore) {
  await ensureDataDir();
  const tmpFile = `${STORE_FILE}.${Date.now()}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmpFile, `${JSON.stringify(store, null, 2)}\n`, "utf-8");
  await fs.rename(tmpFile, STORE_FILE);
}

function generateApiKey() {
  return `dlk_${crypto.randomBytes(24).toString("hex")}`;
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export type IssuedApiKeyResult = DealerApiKeyRecord & { apiKey: string };

/**
 * Cấp API key mới cho đại lý (tra theo shortName trong Google Sheet).
 * Thu hồi mọi key còn active của đại lý đó trước khi cấp key mới.
 * CHỈ trả về raw apiKey trong kết quả hàm này — KHÔNG lưu raw apiKey xuống đĩa (chỉ lưu hash SHA-256).
 */
export async function issueApiKey(shortName: string): Promise<IssuedApiKeyResult> {
  const dealers = await getAllDealers();
  const dealer = dealers.find((d) => normalize(d.shortName) === normalize(shortName));
  if (!dealer) {
    throw new Error(`Không tìm thấy đại lý với shortName "${shortName}"`);
  }

  const store = await readStore();
  const now = new Date().toISOString();

  // Thu hồi key active cũ của đại lý này (nếu có)
  store.keys.forEach((k) => {
    if (normalize(k.shortName) === normalize(shortName) && !k.revokedAt) {
      k.revokedAt = now;
    }
  });

  const rawKey = generateApiKey();
  const keyHash = hashApiKey(rawKey);
  const apiKeySuffix = rawKey.slice(-6);

  const record: DealerApiKeyRecord = {
    keyHash,
    apiKeySuffix,
    shortName: dealer.shortName,
    groupName: dealer.groupName,
    priceTier: dealer.priceTier,
    createdAt: now,
    revokedAt: null,
    lastUsedAt: null,
  };

  store.keys.push(record);
  await writeStore(store);

  return { ...record, apiKey: rawKey };
}

/**
 * Thu hồi API key theo identifier (hỗ trợ raw key, keyHash hoặc apiKeySuffix).
 */
export async function revokeApiKey(identifier: string): Promise<boolean> {
  const clean = identifier.trim();
  if (!clean) return false;
  const store = await readStore();

  let targetHash = "";
  if (clean.startsWith("dlk_")) {
    targetHash = hashApiKey(clean);
  } else if (clean.length === 64) {
    targetHash = clean;
  }

  const record = store.keys.find((k) => {
    if (k.revokedAt) return false;
    if (targetHash && secureCompare(k.keyHash, targetHash)) return true;
    if (k.apiKeySuffix === clean) return true;
    return false;
  });

  if (!record) return false;
  record.revokedAt = new Date().toISOString();
  await writeStore(store);
  return true;
}

export type PublicDealerInfo = {
  shortName: string;
  groupName: string;
  priceTier: PriceTier;
};

/**
 * Xác thực API key cho request từ đại lý bằng hàm băm SHA-256 an toàn.
 * Trả về null nếu key không tồn tại/đã bị revoke.
 */
export async function getDealerByApiKey(apiKey: string): Promise<PublicDealerInfo | null> {
  if (!apiKey || typeof apiKey !== "string") return null;
  const targetHash = hashApiKey(apiKey);
  const store = await readStore();
  const record = store.keys.find((k) => secureCompare(k.keyHash, targetHash));
  if (!record || record.revokedAt) return null;

  scheduleLastUsedUpdate(record.keyHash);

  return { shortName: record.shortName, groupName: record.groupName, priceTier: record.priceTier };
}

export type DealerApiKeyStatus = {
  hasKey: boolean;
  apiKeySuffix: string | null;
  createdAt: string | null;
  lastUsedAt: string | null;
};

/**
 * Trạng thái key hiện tại của đại lý (dùng cho trang tự quản lý /api-key) —
 * KHÔNG bao giờ trả full apiKey, chỉ trả 6 ký tự cuối.
 */
export async function getApiKeyStatusForDealer(shortName: string): Promise<DealerApiKeyStatus> {
  const store = await readStore();
  const record = store.keys.find((k) => normalize(k.shortName) === normalize(shortName) && !k.revokedAt);
  if (!record) return { hasKey: false, apiKeySuffix: null, createdAt: null, lastUsedAt: null };
  return {
    hasKey: true,
    apiKeySuffix: record.apiKeySuffix,
    createdAt: record.createdAt,
    lastUsedAt: record.lastUsedAt,
  };
}

/**
 * Đại lý tự thu hồi key hiện tại của mình (không cần biết giá trị key).
 */
export async function revokeApiKeyForDealer(shortName: string): Promise<boolean> {
  const store = await readStore();
  const record = store.keys.find((k) => normalize(k.shortName) === normalize(shortName) && !k.revokedAt);
  if (!record) return false;
  record.revokedAt = new Date().toISOString();
  await writeStore(store);
  return true;
}

export type MaskedDealerApiKeyRecord = DealerApiKeyRecord;

export async function listApiKeys(): Promise<MaskedDealerApiKeyRecord[]> {
  const store = await readStore();
  return store.keys;
}
