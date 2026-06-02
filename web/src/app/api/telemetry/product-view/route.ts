import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { notifyDealerViewProduct } from "@/lib/telegram";
import { appendTelemetryEvent } from "@/lib/telemetry-log";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const productName = String(body?.productName || "").trim();
  if (!productName) return NextResponse.json({ ok: false }, { status: 400 });

  if (session.name !== "Khanh") {
    await notifyDealerViewProduct(session.shortName, productName);
  }
  await appendTelemetryEvent({ type: "view_product", shortName: session.shortName, groupName: session.groupName, productName });
  return NextResponse.json({ ok: true });
}
