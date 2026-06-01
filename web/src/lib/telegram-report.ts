import "server-only";
import { readTelemetryEvents, TelemetryEvent } from "@/lib/telemetry-log";
import { notifyRawTelegram } from "@/lib/telegram";

function periodStart(type: "day" | "week" | "month", now: Date) {
  const d = new Date(now);
  d.setSeconds(0, 0);
  if (type === "day") {
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (type === "week") {
    const day = d.getDay();
    const diff = day === 0 ? 6 : day - 1;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDdMmHm(input: string | Date) {
  const d = input instanceof Date ? input : new Date(input);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}-${mm} ${hh}:${min}`;
}

function summarize(label: string, events: TelemetryEvent[], start: Date, end: Date) {
  const scoped = events.filter((e) => {
    const t = new Date(e.at).getTime();
    return t >= start.getTime() && t <= end.getTime();
  });

  const dealers = new Map<string, Map<number, Set<string>>>();

  for (const e of scoped) {
    const dealerKey = e.shortName;
    const timeKey = new Date(e.at).getTime();

    if (!dealers.has(dealerKey)) {
      dealers.set(dealerKey, new Map());
    }

    const timeline = dealers.get(dealerKey)!;
    if (e.type !== "view_product" || !e.productName) {
      continue;
    }

    if (!timeline.has(timeKey)) {
      timeline.set(timeKey, new Set());
    }

    timeline.get(timeKey)!.add(e.productName);
  }

  const activeDealers = Array.from(dealers.entries()).filter(([, timeline]) => timeline.size > 0);
  const lines: string[] = [`${label}: ${activeDealers.length}`];

  for (const [dealerName, timeline] of activeDealers) {
    lines.push(`- ${dealerName}`);
    const sortedTimes = Array.from(timeline.keys()).sort((a, b) => a - b);

    sortedTimes.forEach((time, idx) => {
      const products = Array.from(timeline.get(time) || []);
      lines.push(`    ${idx + 1}/ ${formatDdMmHm(new Date(time))}: ${products.join(", ")}`);
    });
  }

  return lines.join("\n");
}

export async function sendDealerUsageReport(now = new Date()) {
  const events = await readTelemetryEvents();
  const end = now;

  const day = summarize("Ngày", events, periodStart("day", now), end);

  const header = `BÁO CÁO ${formatDdMmHm(now)}`;
  await notifyRawTelegram(`${header}\n\n${day}`);
}
