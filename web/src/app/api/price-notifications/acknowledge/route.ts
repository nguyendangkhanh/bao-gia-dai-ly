import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { acknowledgePriceNotification } from "@/lib/price-notifications";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const snapshotVersion = String(body?.snapshotVersion || "").trim();
  if (!snapshotVersion) return NextResponse.json({ ok: false }, { status: 400 });

  await acknowledgePriceNotification({
    dealerShortName: session.shortName,
    snapshotVersion,
    priceTier: session.priceTier,
  });

  return NextResponse.json({ ok: true });
}
