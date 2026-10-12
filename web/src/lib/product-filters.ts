import "server-only";

// Sản phẩm/SKU chủ động KHÔNG hiển thị cho đại lý (ngừng hợp tác/ngừng bán sỉ...).
// Dùng chung cho cả trang catalog nội bộ (/products) và public API cho đại lý
// (/api/public/products) để đảm bảo API không lộ sản phẩm đã bị ẩn trên web.
const ignoreByNameInclude = [
  "sihoo",
  "gtchair",
  "T21",
  "Vera Wintex",
  "Iris Wintex",
];
const ignoreBySku = ["XMS.T21D", "XMS.T21X"];

export function shouldIgnoreProduct(product: { name?: string; variants?: { sku?: string | null }[] }) {
  const name = String(product.name || "").trim().toLowerCase();
  if (ignoreByNameInclude.some((keyword) => name.includes(String(keyword).trim().toLowerCase()))) return true;
  const skus = (product.variants || []).map((v) => String(v.sku || "").trim().toUpperCase());
  return skus.some((sku) => ignoreBySku.includes(sku));
}

export function filterIgnoredProducts<T extends { name?: string; variants?: { sku?: string | null }[] }>(products: T[]) {
  return products.filter((p) => !shouldIgnoreProduct(p));
}
