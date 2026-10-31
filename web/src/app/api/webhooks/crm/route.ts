import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.DEALER_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-secret-key") || "";
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await req.json();
    const { topic, data } = payload;

    console.log(`[webhook] Received: ${topic}, order: ${data?.code || data?.id || "unknown"}`);

    // Future: revalidate order status cache, send push notifications, etc.

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[webhook] Error:", err.message);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
