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

  const { filteredProducts, matchedVariantIds } = useMemo(() => {
    const activeSearch = searchQuery.trim().toLowerCase();
    const matchedVariantIds: Record<number, number> = {};

    if (!tags.length && !activeSearch) {
      return { filteredProducts: initialProducts, matchedVariantIds };
    }

    const allTerms = [...tags.map((t) => t.toLowerCase()), ...(activeSearch ? [activeSearch] : [])];

    const filtered = initialProducts.filter((p) => {
      const haystack = [
        String(p.name || ""),
        ...((p.variants || []).flatMap((v) => [v.barcode, v.displayName].filter(Boolean).map(String))),
      ].join(" ").toLowerCase();

      const matchesTags = tags.length === 0 || tags.some((tag) => haystack.includes(tag.toLowerCase()));
      const matchesSearch = !activeSearch || haystack.includes(activeSearch);

      if (matchesTags && matchesSearch) {
        // Nếu search không khớp tên sản phẩm → tìm variant cụ thể nào khớp
        const nameHay = String(p.name || "").toLowerCase();
        if (!allTerms.some((term) => nameHay.includes(term))) {
          const matched = (p.variants || []).find((v) => {
            const labels = [v.barcode, v.displayName].filter(Boolean).map((s) => String(s).toLowerCase());
            return allTerms.some((term) => labels.some((label) => label.includes(term)));
          });
          if (matched) matchedVariantIds[p.id] = matched.id;
        }
        return true;
      }
      return false;
    });

    return { filteredProducts: filtered, matchedVariantIds };
  }, [tags, searchQuery, initialProducts]);

  const productNames = useMemo(() => {
    const all: string[] = [];
    initialProducts.forEach((p) => {
      if (p.name) all.push(String(p.name).trim());
      (p.variants || []).forEach((v) => {
        if (v.barcode) all.push(String(v.barcode).trim());
      });
    });
    return [...new Set(all.filter(Boolean))];
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
            matchedVariantIds={matchedVariantIds}
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
