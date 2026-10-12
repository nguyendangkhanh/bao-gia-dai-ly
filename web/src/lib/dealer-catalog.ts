import "server-only";
import { getProductById, getProducts, getSkuOrder, mapConcurrent } from "@/lib/api";
import { filterIgnoredProducts } from "@/lib/product-filters";
import { sanitizeProductForDealer, PublicProduct } from "@/lib/public-api";
import { PriceTier } from "@/lib/dealer-api-keys";
import { Product } from "@/types/product";

export type DealerSort = "price_asc" | "price_desc" | "group_asc" | "group_desc" | null;

export type DealerCatalogProduct = PublicProduct & {
  dealerPriceMin: number | null;
  dealerPriceMax: number | null;
  retailMin: number | null;
  retailMax: number | null;
  cover: string | null;
};

export function parseDealerSort(raw: string | null): DealerSort {
  if (raw === "price_asc" || raw === "price_desc" || raw === "group_asc" || raw === "group_desc") return raw;
  return null;
}

function normalizeKey(value?: string | null) {
  return String(value || "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[–—_]/g, "-");
}

// Loại bỏ variant không có giá đại lý (null/0) — đồng nhất với catalog web nội bộ
// (xem filterAndSortProducts trong app/products/page.tsx), tránh lộ variant rác qua API.
function withPricedVariantsOnly(product: PublicProduct): DealerCatalogProduct {
  const variants = product.variants.filter((v) => typeof v.dealerPrice === "number" && v.dealerPrice > 0);
  const prices = variants.map((v) => v.dealerPrice as number);
  const retailPrices = variants.map((v) => v.price || 0).filter((p) => p > 0);
  return {
    ...product,
    cover: product.cover ?? product.images[0]?.url ?? null,
    retailMin: retailPrices.length ? Math.min(...retailPrices) : null,
    retailMax: retailPrices.length ? Math.max(...retailPrices) : null,
    variants,
    dealerPriceMin: prices.length ? Math.min(...prices) : null,
    dealerPriceMax: prices.length ? Math.max(...prices) : null,
  };
}

/**
 * Catalog đầy đủ cho đại lý qua public API: lấy toàn bộ sản phẩm (danh mục hiện
 * chỉ ~50-60 sản phẩm nên fetch hết 1 lần là rẻ), loại sản phẩm bị ẩn
 * (product-filters), enrich link sản phẩm từ Google Sheet SKU Order,
 * chọn đúng giá theo priceTier, loại variant không có giá,
 * loại sản phẩm không còn variant nào.
 */
export async function getDealerCatalog(search: string, priceTier: PriceTier): Promise<DealerCatalogProduct[]> {
  const [res, skuOrderItems] = await Promise.all([
    getProducts(1, 500, search),
    getSkuOrder().catch(() => []),
  ]);

  const skuLinkMap = new Map(
    skuOrderItems.map((item) => [normalizeKey(String(item.sku || "")), String(item.link || "").trim()]),
  );

  // Endpoint list không trả variants -> phải fetch detail từng sản phẩm (giống
  // logic "needsDetailFetch" ở app/products/page.tsx)
  const needsDetailFetch = !res.data[0] || !Array.isArray(res.data[0]?.variants);
  const productsBase: Product[] = needsDetailFetch
    ? await mapConcurrent(res.data, (p) => getProductById(String(p.id)), 6)
    : res.data;

  const enrichedProducts: Product[] = productsBase.map((product) => ({
    ...product,
    variants: (product.variants || []).map((variant) => {
      const skuKey = normalizeKey(String(variant.sku || ""));
      const barcodeKey = normalizeKey(String(variant.barcode || ""));
      const displayNameKey = normalizeKey(String(variant.displayName || ""));
      const mappedLink = skuLinkMap.get(skuKey) || skuLinkMap.get(barcodeKey) || skuLinkMap.get(displayNameKey) || "";
      return { ...variant, link: mappedLink || variant.link || "" };
    }),
  }));

  return filterIgnoredProducts(enrichedProducts)
    .map((p) => withPricedVariantsOnly(sanitizeProductForDealer(p, priceTier)))
    .filter((p) => p.variants.length > 0);
}

function compareGroup(a: DealerCatalogProduct, b: DealerCatalogProduct) {
  const va = String(a.vendor || "").trim();
  const vb = String(b.vendor || "").trim();
  if (!va && vb) return 1;
  if (va && !vb) return -1;
  const cmp = va.localeCompare(vb, "vi");
  return cmp !== 0 ? cmp : a.name.localeCompare(b.name, "vi");
}

export function sortDealerCatalog(products: DealerCatalogProduct[], sort: DealerSort): DealerCatalogProduct[] {
  const list = [...products];
  switch (sort) {
    case "price_asc":
      return list.sort((a, b) => (a.dealerPriceMin ?? Infinity) - (b.dealerPriceMin ?? Infinity));
    case "price_desc":
      return list.sort((a, b) => (b.dealerPriceMin ?? -Infinity) - (a.dealerPriceMin ?? -Infinity));
    case "group_asc":
      return list.sort(compareGroup);
    case "group_desc":
      return list.sort((a, b) => compareGroup(b, a));
    default:
      return list;
  }
}
