import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

export type TelemetryEvent = {
  type: "login" | "view_product";
  shortName: string;
  groupName: string;
  productName?: string;
  at: string;
};

const LOG_DIR = path.join(process.cwd(), ".data");
const LOG_FILE = path.join(LOG_DIR, "dealer-telemetry.jsonl");

export async function appendTelemetryEvent(event: Omit<TelemetryEvent, "at"> & { at?: string }) {
  await fs.mkdir(LOG_DIR, { recursive: true });
  const row: TelemetryEvent = { ...event, at: event.at || new Date().toISOString() };
  await fs.appendFile(LOG_FILE, `${JSON.stringify(row)}\n`, "utf-8");
}

export async function readTelemetryEvents(): Promise<TelemetryEvent[]> {
  try {
    const raw = await fs.readFile(LOG_FILE, "utf-8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as TelemetryEvent)
      .filter((e) => e?.shortName && e?.groupName && e?.at);
  } catch {
    return [];
  }
}
