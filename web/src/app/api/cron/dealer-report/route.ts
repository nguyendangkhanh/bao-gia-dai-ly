import { NextResponse } from "next/server";
import { sendDealerUsageReport } from "@/lib/telegram-report";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET || ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await sendDealerUsageReport(new Date());
  return NextResponse.json({ ok: true });
}
