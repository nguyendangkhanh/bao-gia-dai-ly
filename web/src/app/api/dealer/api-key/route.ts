import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getApiKeyStatusForDealer, issueApiKey, revokeApiKeyForDealer } from "@/lib/dealer-api-keys";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const status = await getApiKeyStatusForDealer(session.shortName);
  return NextResponse.json(status);
}

// Cấp key mới (thu hồi key cũ nếu có) — chỉ trả plaintext apiKey LẦN DUY NHẤT trong response này.
export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const record = await issueApiKey(session.shortName);
    return NextResponse.json({ ok: true, apiKey: record.apiKey, createdAt: record.createdAt });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Issue failed" }, { status: 400 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const removed = await revokeApiKeyForDealer(session.shortName);
  return NextResponse.json({ ok: removed });
}
