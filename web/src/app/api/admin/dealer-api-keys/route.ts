import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { issueApiKey, listApiKeys, revokeApiKey } from "@/lib/dealer-api-keys";

function isAdmin(req: NextRequest) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) return false;
  const header = req.headers.get("x-admin-secret") || "";
  if (!header) return false;

  const bufA = Buffer.from(header);
  const bufB = Buffer.from(secret);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ keys: await listApiKeys() });
}

// body: { shortName: string } -> tạo (và thu hồi key cũ của) đại lý này, trả apiKey 1 LẦN DUY NHẤT
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const shortName = String(body?.shortName || "").trim();
  if (!shortName) return NextResponse.json({ error: "Thiếu shortName" }, { status: 400 });

  try {
    const record = await issueApiKey(shortName);
    return NextResponse.json({ ok: true, ...record });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Issue failed" }, { status: 400 });
  }
}

// body: { apiKey: string }
export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const apiKey = String(body?.apiKey || "").trim();
  if (!apiKey) return NextResponse.json({ error: "Thiếu apiKey" }, { status: 400 });

  const removed = await revokeApiKey(apiKey);
  return NextResponse.json({ ok: removed });
}
