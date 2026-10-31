import { NextRequest, NextResponse } from "next/server";
import { getProductById, getSkuOrder } from "@/lib/api";
import { authenticatePublicApiRequest, sanitizeProductForDealer, PUBLIC_API_CORS_HEADERS } from "@/lib/public-api";
import { shouldIgnoreProduct } from "@/lib/product-filters";
import { Product } from "@/types/product";

function normalizeKey(value?: string | null) {
  return String(value || "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[–—_]/g, "-");
}

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
    const [product, skuOrderItems] = await Promise.all([
      getProductById(id),
      getSkuOrder().catch(() => []),
    ]);
    if (shouldIgnoreProduct(product)) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404, headers: PUBLIC_API_CORS_HEADERS });
    }

    const skuLinkMap = new Map(
      skuOrderItems.map((item) => [normalizeKey(String(item.sku || "")), String(item.link || "").trim()]),
    );

    const enrichedProduct: Product = {
      ...product,
      variants: (product.variants || []).map((variant) => {
        const skuKey = normalizeKey(String(variant.sku || ""));
        const barcodeKey = normalizeKey(String(variant.barcode || ""));
        const displayNameKey = normalizeKey(String(variant.displayName || ""));
        const mappedLink = skuLinkMap.get(skuKey) || skuLinkMap.get(barcodeKey) || skuLinkMap.get(displayNameKey) || "";
        return { ...variant, link: mappedLink || variant.link || "" };
      }),
    };

    const sanitized = sanitizeProductForDealer(enrichedProduct, auth.dealer.priceTier);
    const variants = sanitized.variants.filter((v) => typeof v.dealerPrice === "number" && v.dealerPrice > 0);
    const prices = variants.map((v) => v.dealerPrice as number);
    const retailPrices = variants.map((v) => v.price || 0).filter((p) => p > 0);

    return NextResponse.json(
      {
        data: {
          ...sanitized,
          cover: sanitized.cover ?? sanitized.images[0]?.url ?? null,
          retailMin: retailPrices.length ? Math.min(...retailPrices) : null,
          retailMax: retailPrices.length ? Math.max(...retailPrices) : null,
          dealerPriceMin: prices.length ? Math.min(...prices) : null,
          dealerPriceMax: prices.length ? Math.max(...prices) : null,
          variants,
        },
      },
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
