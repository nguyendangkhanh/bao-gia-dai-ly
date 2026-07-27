import { getProductById, getProducts, getSkuOrder } from "@/lib/api";
import { clearSession, getSession } from "@/lib/auth";
import ProductsCatalog from "@/components/products/ProductsCatalog";
import HotQuickTags from "@/components/products/HotQuickTags";
import DealerPolicyTabs from "@/components/products/DealerPolicyTabs";
import PriceChangeNotificationPopup from "@/components/products/PriceChangeNotificationPopup";
import { getPendingPriceNotificationForDealer, getRecentlyAcknowledgedChanges } from "@/lib/price-notifications";
import { Product, ProductVariant } from "@/types/product";

type ProductListItem = Product & {
  cover?: string;
  retailMin: number;
  retailMax: number;
  skuOrder: number;
  variants: ProductVariant[];
};
import { redirect } from "next/navigation";

const ignoreByNameInclude = [
  "sihoo",
  "gtchair",
  "T21",
  "Vera Wintex",
  "Iris Wintex",
];
const ignoreBySku = ["XMS.T21D", "XMS.T21X"];

function shouldIgnoreProduct(product: { name?: string; variants?: { sku?: string | null }[] }) {
  const name = String(product.name || "").trim().toLowerCase();
  if (ignoreByNameInclude.some((keyword) => name.includes(String(keyword).trim().toLowerCase()))) return true;
  const skus = (product.variants || []).map((v) => String(v.sku || "").trim().toUpperCase());
  return skus.some((sku) => ignoreBySku.includes(sku));
}

function filterIgnoredProducts<T extends { name?: string; variants?: { sku?: string | null }[] }>(products: T[]) {
  return products.filter((p) => !shouldIgnoreProduct(p));
}

function normalizeSku(sku?: string | null) {
  return String(sku || "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[–—_]/g, "-");
}

function normalizeKey(value?: string | null) {
  return String(value || "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[–—_]/g, "-");
}

function sortVariantsByDealerPrice<T extends { sku?: string | null; agentPrice1?: number | null; agentPrice2?: number | null }>(
  variants: T[],
  tierKey: "agentPrice1" | "agentPrice2",
  skuOrderMap: Map<string, number>,
) {
  return [...variants].sort((a, b) => {
    const priceA = (tierKey === "agentPrice2" ? a.agentPrice2 : a.agentPrice1) ?? Number.MAX_SAFE_INTEGER;
    const priceB = (tierKey === "agentPrice2" ? b.agentPrice2 : b.agentPrice1) ?? Number.MAX_SAFE_INTEGER;
    if (priceA !== priceB) return priceA - priceB;
    const orderA = skuOrderMap.get(normalizeSku(a.sku)) ?? Number.MAX_SAFE_INTEGER;
    const orderB = skuOrderMap.get(normalizeSku(b.sku)) ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
}

function getProductOrderByVariants(variants: { sku?: string | null }[], skuOrderMap: Map<string, number>) {
  let best = Number.MAX_SAFE_INTEGER;
  for (const v of variants) {
    const order = skuOrderMap.get(normalizeSku(v.sku));
    if (order !== undefined && order < best) best = order;
  }
  return best;
}

function filterAndSortProducts(products: Product[], tierKey: "agentPrice1" | "agentPrice2", skuOrderMap: Map<string, number>): ProductListItem[] {
  return filterIgnoredProducts(products)
    .map((p) => {
      const variants = sortVariantsByDealerPrice(
        (p.variants || []).filter((v: ProductVariant) => {
          const val = tierKey === "agentPrice2" ? v.agentPrice2 : v.agentPrice1;
          return typeof val === "number" && val > 0;
        }),
        tierKey,
        skuOrderMap,
      );
      const retailPrices = variants.map((v) => v.price || 0).filter((price) => price > 0);
      const retailMin = retailPrices.length ? Math.min(...retailPrices) : 0;
      const retailMax = retailPrices.length ? Math.max(...retailPrices) : 0;
      const cover = p.images?.[0]?.url || "";
      const skuOrder = getProductOrderByVariants(variants, skuOrderMap);
      return { ...p, variants, retailMin, retailMax, cover, skuOrder };
    })
    .filter((p) => p.variants.length > 0 && Number.isFinite(p.retailMin))
    .sort((a, b) => a.retailMax - b.retailMax);
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ search?: string; tags?: string }> }) {
  async function logoutAction() {
    "use server";
    await clearSession();
    redirect("/login");
  }

  const quickTags = ["e3 lite", "foris", "atum", "bàn", "libernovo"];

  const session = await getSession();
  if (!session) redirect("/login");

  const params = await searchParams;
  const tagsFromParam = String(params.tags || "").split("||").map((t) => t.trim()).filter(Boolean);
  const legacySearch = String(params.search || "").trim();
  const activeTags = tagsFromParam.length ? tagsFromParam : legacySearch ? [legacySearch] : [];
  
  // Fetch the entire product catalog (limit 500) to support local search & caching
  const [res, skuOrderItems] = await Promise.all([
    getProducts(1, 500, ""),
    getSkuOrder(),
  ]);
  const needsDetailFetch = !res.data[0] || !Array.isArray(res.data[0]?.variants);
  const productsBase = needsDetailFetch
    ? await Promise.all(res.data.map((p) => getProductById(String(p.id))))
    : res.data;

  const skuOrderMap = new Map(
    skuOrderItems.map((item, index) => [item.sku.trim().toLowerCase(), Number.isFinite(item.position) ? item.position : index + 1]),
  );
  const skuLinkMap = new Map(
    skuOrderItems.map((item) => [normalizeKey(String(item.sku || "")), String(item.link || "").trim()]),
  );

  const enrichedProducts = productsBase.map((product) => ({
    ...product,
    variants: (product.variants || []).map((variant) => {
      const skuKey = normalizeKey(String(variant.sku || ""));
      const barcodeKey = normalizeKey(String(variant.barcode || ""));
      const displayNameKey = normalizeKey(String(variant.displayName || ""));
      const mappedLink = skuLinkMap.get(skuKey) || skuLinkMap.get(barcodeKey) || skuLinkMap.get(displayNameKey) || "";
      return { ...variant, link: mappedLink || variant.link || "" };
    }),
  }));

  const tierKey = session.priceTier === "agent2" ? "agentPrice2" : "agentPrice1";
  const filteredSorted = filterAndSortProducts(enrichedProducts, tierKey, skuOrderMap);

  const [pendingPriceNotification, recentlyChangedPriceDeltas] = await Promise.all([
    getPendingPriceNotificationForDealer({
      dealerShortName: session.shortName,
      priceTier: session.priceTier,
      products: enrichedProducts,
    }),
    getRecentlyAcknowledgedChanges(session.shortName),
  ]);

  return (
    <>
      <main className="mx-auto w-full max-w-7xl space-y-5 overflow-x-hidden p-4 md:p-6 fade-in">
        <section className="rounded-2xl bg-gradient-to-r from-[#ff6b35] via-[#f97316] to-[#e63946] p-5 text-white shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Bảng giá đại lý The Manson</h1>
              <p className="mt-1 text-sm text-white/90">Danh sách sản phẩm hiển thị theo nhóm giá: {session.priceTier === "agent1" ? "Đại lý 1" : "Đại lý 2"}</p>
            </div>
            <form action={logoutAction}>
              <button type="submit" className="rounded-lg border border-white/60 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white">Logout</button>
            </form>
          </div>
        </section>

        <DealerPolicyTabs />

        <ProductsCatalog
          initialProducts={filteredSorted}
          priceTier={session.priceTier}
          initialTags={activeTags}
          recentlyChangedPriceDeltas={recentlyChangedPriceDeltas}
        />

        <HotQuickTags tags={quickTags} />
      </main>

      <PriceChangeNotificationPopup notification={pendingPriceNotification} />
    </>
  );
}
