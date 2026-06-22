"use client";

import { useState, useMemo } from "react";
import ProductsSearchForm from "./ProductsSearchForm";
import ProductsSectionList from "./ProductsSectionList";
import type { PriceAcknowledgementVariantChange } from "@/lib/price-notifications";

type Variant = {
  id: number;
  barcode: string | null;
  displayName: string | null;
  price: number | null;
  agentPrice1: number | null;
  agentPrice2: number | null;
  imageId: number | null;
  weight?: number | null;
  packageLength?: number | null;
  packageWidth?: number | null;
  packageHeight?: number | null;
};

type Product = {
  id: number;
  name: string;
  vendor?: string | null;
  cover?: string;
  retailMin: number;
  retailMax: number;
  variants: Variant[];
  images?: { id: number; url: string }[];
};

type Props = {
  initialProducts: Product[];
  priceTier: "agent1" | "agent2";
  initialTags: string[];
  recentlyChangedPriceDeltas: PriceAcknowledgementVariantChange[];
};

export default function ProductsCatalog({
  initialProducts,
  priceTier,
  initialTags,
  recentlyChangedPriceDeltas,
}: Props) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const activeSearch = searchQuery.trim().toLowerCase();
    if (!tags.length && !activeSearch) {
      return initialProducts;
    }

    return initialProducts.filter((p) => {
      const haystack = [
        String(p.name || ""),
        ...((p.variants || []).map((v) => String(v.barcode || v.displayName || ""))),
      ].join(" ").toLowerCase();

      // If tags exist, product must match at least one tag (OR behavior matching the original implementation)
      const matchesTags = tags.length === 0 || tags.some((tag) => haystack.includes(tag.toLowerCase()));
      // If text query exists, product must match it (AND behavior for typing refinement)
      const matchesSearch = !activeSearch || haystack.includes(activeSearch);

      return matchesTags && matchesSearch;
    });
  }, [tags, searchQuery, initialProducts]);

  const productNames = useMemo(() => {
    return [...new Set(initialProducts.map((p) => String(p.name || "").trim()).filter(Boolean))];
  }, [initialProducts]);

  const handleFilterChange = (filters: { tags: string[]; search: string }) => {
    setTags(filters.tags);
    setSearchQuery(filters.search);
  };

  return (
    <div className="space-y-5">
      <ProductsSearchForm
        activeTags={tags}
        productNames={productNames}
        onFilterChange={handleFilterChange}
      />

      <div id="product-list">
        {filteredProducts.length > 0 ? (
          <ProductsSectionList
            products={filteredProducts}
            priceTier={priceTier}
            recentlyChangedPriceDeltas={recentlyChangedPriceDeltas}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center text-zinc-500 shadow-md">
            Không tìm thấy sản phẩm phù hợp.
          </div>
        )}
      </div>
    </div>
  );
}
