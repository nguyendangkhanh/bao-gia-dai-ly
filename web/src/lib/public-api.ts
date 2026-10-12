import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/product";
import { getDealerByApiKey, PublicDealerInfo } from "@/lib/dealer-api-keys";
import { checkRateLimit } from "@/lib/rate-limit";
import { resolveImageUrl } from "@/lib/image-url";

export type PublicProductVariant = {
  id: number;
  barcode: string | null;
  sku: string | null;
  displayName: string | null;
  price: number | null;
  dealerPrice: number | null;
  active: boolean;
  imageId: number | null;
};

export type PublicImage = {
  id: number;
  url: string;
  alt: string | null;
  position: number | null;
  variantIds: number[];
};

export type PublicProduct = {
  id: number;
  name: string;
  vendor: string;
  description: string | null;
  images: PublicImage[];
  variants: PublicProductVariant[];
};

/**
 * Chỉ trả giá đúng tier của đại lý gọi API (agentPrice1/2) — KHÔNG trả cả 2 mức giá,
 * khác với lib/api.ts (dùng cho trang web nội bộ, nơi server tự chọn giá theo session).
 */
export function sanitizeProductForDealer(product: Product, priceTier: PublicDealerInfo["priceTier"]): PublicProduct {
  // Chỉ chọn các trường ảnh cần thiết, loại bỏ formats đồ sộ của CRM (large, small...)
  // giúp giảm 90% kích thước payload, tránh tràn buffer proxy (Nginx 128KB buffer overflow)
  // và tuyệt đối không làm lộ mảng variants nội bộ của CRM.
  const images: PublicImage[] = (product.images || []).map((img) => ({
    id: img.id,
    url: resolveImageUrl(img.url),
    alt: img.alt ?? null,
    position: img.position ?? null,
    variantIds: img.variantIds ?? [],
  }));

  return {
    id: product.id,
    name: product.name,
    vendor: product.vendor,
    description: product.description,
    images,
    variants: (product.variants || []).map((v) => ({
      id: v.id,
      barcode: v.barcode,
      sku: v.sku,
      displayName: v.displayName,
      price: v.price,
      dealerPrice: priceTier === "agent2" ? v.agentPrice2 : v.agentPrice1,
      active: v.active,
      imageId: v.imageId,
    })),
  };
}

function extractApiKey(req: NextRequest): string {
  const header = req.headers.get("authorization") || "";
  return header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export type PublicApiAuthResult =
  | { ok: true; dealer: PublicDealerInfo }
  | { ok: false; response: NextResponse };

export const PUBLIC_API_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Max-Age": "86400",
};

/**
 * Xác thực API key + rate limit cho public API đại lý. Dùng ở đầu mỗi route handler:
 *   const auth = await authenticatePublicApiRequest(req);
 *   if (!auth.ok) return auth.response;
 */
export async function authenticatePublicApiRequest(req: NextRequest): Promise<PublicApiAuthResult> {
  // 1. Tầng phòng thủ cấp IP: 120 req/phút để ngăn chặn tấn công DoS/brute-force trước khi tra cứu key
  const clientIp = getClientIp(req);
  const ipRl = checkRateLimit(`ip:${clientIp}`, 120, 60_000);
  if (!ipRl.allowed) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Quá nhiều request từ địa chỉ IP này, vui lòng thử lại sau" },
        {
          status: 429,
          headers: {
            ...PUBLIC_API_CORS_HEADERS,
            "Retry-After": String(Math.ceil((ipRl.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Limit": "120",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(ipRl.resetAt / 1000)),
          },
        },
      ),
    };
  }

  // 2. Kiểm tra header Authorization
  const apiKey = extractApiKey(req);
  if (!apiKey) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Thiếu Authorization: Bearer <api_key>" },
        { status: 401, headers: PUBLIC_API_CORS_HEADERS },
      ),
    };
  }

  // 3. Tra cứu và xác thực API Key
  const dealer = await getDealerByApiKey(apiKey);
  if (!dealer) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "API key không hợp lệ hoặc đã bị thu hồi" },
        { status: 401, headers: PUBLIC_API_CORS_HEADERS },
      ),
    };
  }

  // 4. Rate-limit theo đại lý đã xác thực
  const rl = checkRateLimit(`dealer:${dealer.shortName}`);
  if (!rl.allowed) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Quá nhiều request, vui lòng thử lại sau" },
        {
          status: 429,
          headers: {
            ...PUBLIC_API_CORS_HEADERS,
            "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(rl.resetAt / 1000)),
          },
        },
      ),
    };
  }

  return { ok: true, dealer };
}
