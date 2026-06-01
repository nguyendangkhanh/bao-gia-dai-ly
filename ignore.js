

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function shouldIgnoreProduct(product) {
  const productName = normalizeText(product?.name);
  const hasIgnoredName = ignoreByNameInclude.some((keyword) => productName.includes(normalizeText(keyword)));
  if (hasIgnoredName) return true;

  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const hasIgnoredSku = variants.some((variant) => ignoreBySku.includes(String(variant?.sku || "").trim()));
  return hasIgnoredSku;
}

function filterIgnoredProducts(products) {
  return (Array.isArray(products) ? products : []).filter((product) => !shouldIgnoreProduct(product));
}

module.exports = {
  ignoreByNameInclude,
  ignoreBySku,
  shouldIgnoreProduct,
  filterIgnoredProducts,
};
