import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/api";
import { authenticatePublicApiRequest, sanitizeProductForDealer, PUBLIC_API_CORS_HEADERS } from "@/lib/public-api";
import { shouldIgnoreProduct } from "@/lib/product-filters";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: PUBLIC_API_CORS_HEADERS,
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authenticatePublicApiRequest(req);
  if (!auth.ok) return auth.response;

  const { id } = await params;

  try {
    const product = await getProductById(id);
    if (shouldIgnoreProduct(product)) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404, headers: PUBLIC_API_CORS_HEADERS });
    }

    const sanitized = sanitizeProductForDealer(product, auth.dealer.priceTier);
    const variants = sanitized.variants.filter((v) => typeof v.dealerPrice === "number" && v.dealerPrice > 0);

    return NextResponse.json(
      { data: { ...sanitized, variants } },
      {
        headers: {
          ...PUBLIC_API_CORS_HEADERS,
          "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
          "X-Accel-Buffering": "no",
        },
      }
    );
  } catch (error) {
    console.error("[public-api] Lỗi getProductById:", error);
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404, headers: PUBLIC_API_CORS_HEADERS });
  }
}
