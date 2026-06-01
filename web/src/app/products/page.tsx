import { getProductById, getProducts, getSkuOrder } from "@/lib/api";
import { clearSession, getSession } from "@/lib/auth";
import ProductsSectionList from "@/components/products/ProductsSectionList";
import HotQuickTags from "@/components/products/HotQuickTags";
import ProductsSearchForm from "@/components/products/ProductsSearchForm";
import { redirect } from "next/navigation";


const ignoreByNameInclude = [
  "Khung Bàn Nâng Hạ Manson SmartDesk",
  "Khung Nâng Hạ 2 Động Cơ Trắng",
  "Khung Nâng Hạ 2 Động Cơ Đen",
  "sihoo",
  "gtchair",
  "T21",
  "Vera Wintex",
  "Iris Wintex",
  "Khung Bàn Nâng Hạ 2 Động Cơ",
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

function filterAndSortProducts(products: any[], tierKey: "agentPrice1" | "agentPrice2", skuOrderMap: Map<string, number>) {
  return filterIgnoredProducts(products)
    .map((p) => {
      const variants = sortVariantsByDealerPrice(
        (p.variants || []).filter((v: any) => {
          const val = tierKey === "agentPrice2" ? v.agentPrice2 : v.agentPrice1;
          return typeof val === "number" && val > 0;
        }),
        tierKey,
        skuOrderMap,
      );
      const retailPrices = variants.map((v: any) => v.price || 0).filter((price: number) => price > 0);
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
  const res = await getProducts(1, 1000, "");
  const skuOrderItems = await getSkuOrder();

  const skuOrderMap = new Map(
    skuOrderItems.map((item, index) => [item.sku.trim().toLowerCase(), Number.isFinite(item.position) ? item.position : index + 1]),
  );
  const skuLinkMap = new Map(
    skuOrderItems.map((item) => [normalizeKey(String(item.sku || "")), String(item.link || "").trim()]),
  );

  const detailedProductsRaw = await Promise.all(res.data.map((p) => getProductById(String(p.id))));
  const detailedProducts = detailedProductsRaw.map((product) => ({
    ...product,
    variants: (product.variants || []).map((variant: any) => {
      const skuKey = normalizeKey(String(variant.sku || ""));
      const barcodeKey = normalizeKey(String(variant.barcode || ""));
      const displayNameKey = normalizeKey(String(variant.displayName || ""));
      const mappedLink = skuLinkMap.get(skuKey) || skuLinkMap.get(barcodeKey) || skuLinkMap.get(displayNameKey) || "";
      return { ...variant, link: mappedLink || variant.link || "" };
    }),
  }));
  const tierKey = session.priceTier === "agent2" ? "agentPrice2" : "agentPrice1";
  const filteredSorted = filterAndSortProducts(detailedProducts, tierKey, skuOrderMap);
  const filteredByTags = activeTags.length
    ? filteredSorted.filter((p) => {
        const haystack = [
          String(p.name || ""),
          ...((p.variants || []).map((v: any) => String(v.barcode || v.displayName || ""))),
        ].join(" ").toLowerCase();
        return activeTags.some((tag) => haystack.includes(tag.toLowerCase()));
      })
    : filteredSorted;

  const variantsWithLinkCount = filteredByTags.reduce(
    (acc, p) => acc + (p.variants || []).filter((v: any) => String(v.link || "").trim()).length,
    0,
  );
  const debugSkuOrderKeys = skuOrderItems.slice(0, 10).map((i) => normalizeKey(String(i.sku || "")));
  const debugVariantKeys = filteredByTags
    .flatMap((p) => (p.variants || []).map((v: any) => normalizeKey(String(v.sku || v.barcode || v.displayName || ""))))
    .filter(Boolean)
    .slice(0, 10);
  const debugMatchedVariantKeys = debugVariantKeys.filter((k) => !!skuLinkMap.get(k));
  const debugMissingVariantKeys = debugVariantKeys.filter((k) => !skuLinkMap.get(k));
  const debugSkuOrderSize = skuOrderItems.length;
  const debugSkuOrderWithLink = skuOrderItems.filter((i) => String(i.link || "").trim()).length;

  return (
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

      <ProductsSearchForm activeTags={activeTags} productNames={[...new Set(filteredSorted.map((p) => String(p.name || "").trim()).filter(Boolean))]} />

      {/* <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700 space-y-1">
        <div>Debug: tổng variant có link = <b>{variantsWithLinkCount}</b></div>
        <div>SKU order tổng: {debugSkuOrderSize}, có link: {debugSkuOrderWithLink}</div>
        <div>SKU order item[0]: {JSON.stringify(skuOrderItems[0] || null)}</div>
        <div>SKU order (10): {debugSkuOrderKeys.join(" | ")}</div>
        <div>Variant keys (10): {debugVariantKeys.join(" | ")}</div>
        <div>Matched keys: {debugMatchedVariantKeys.join(" | ") || "(none)"}</div>
        <div>Missing keys: {debugMissingVariantKeys.join(" | ") || "(none)"}</div>
      </div> */}

      <div id="product-list">
        <ProductsSectionList
          products={filteredByTags}
          priceTier={session.priceTier}
        />
      </div>

      <HotQuickTags tags={quickTags} />
    </main>
  );
}
