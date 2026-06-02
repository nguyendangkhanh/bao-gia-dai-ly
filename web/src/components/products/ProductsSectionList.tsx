"use client";

import { useState } from "react";
import ProductVariantsCardList from "@/components/products/ProductVariantsCardList";

type Product = {
  id: number;
  name: string;
  vendor?: string | null;
  cover?: string;
  retailMin: number;
  retailMax: number;
  variants: {
    id: number;
    barcode: string | null;
    displayName: string | null;
    price: number | null;
    agentPrice1: number | null;
    agentPrice2: number | null;
    imageId: number | null;
  }[];
  images?: { id: number; url: string }[];
};

function imageUrl(url?: string | null) {
  if (!url) return "";

  let resolved = url;
  if (!resolved.startsWith("http://") && !resolved.startsWith("https://")) {
    const base = (process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL || process.env.UMI_APP_STATIC_FILE_BASE_URL || "https://crm.themanson.vn/api/public/").replace(/\/+$/, "");
    const filePath = resolved.replace(/^\/+/, "");
    resolved = `${base}/${filePath}`;
  }

  if (resolved.startsWith("https://localhost")) return resolved.replace("https://localhost", "http://localhost");
  if (resolved.startsWith("https://127.0.0.1")) return resolved.replace("https://127.0.0.1", "http://127.0.0.1");
  return resolved;
}

export default function ProductsSectionList({ products, priceTier }: { products: Product[]; priceTier: "agent1" | "agent2" }) {
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [popupProductId, setPopupProductId] = useState<number | null>(null);

  const onToggleProduct = (productId: number, productName: string) => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    const isOpeningInline = expandedProductId !== productId;
    const isOpeningPopup = popupProductId !== productId;

    if (isDesktop) {
      setPopupProductId((prev) => (prev === productId ? null : productId));
    } else {
      setExpandedProductId((prev) => (prev === productId ? null : productId));
    }

    if ((isDesktop && isOpeningPopup) || (!isDesktop && isOpeningInline)) {
      void fetch("/api/telemetry/product-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      }).catch(() => undefined);
    }
  };

  const handleProductTouchEnd = (productId: number, productName: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onToggleProduct(productId, productName);
    }
  };

  const handleProductClick = (productId: number, productName: string) => {
    onToggleProduct(productId, productName);
  };

  const handleProductKeyDown = (event: React.KeyboardEvent<HTMLElement>, productId: number, productName: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggleProduct(productId, productName);
    }
  };

  const closePopup = () => setPopupProductId(null);

  const popupProduct = products.find((p) => p.id === popupProductId) || null;
  const shouldIgnoreClickAfterTouch = typeof window !== "undefined" && window.innerWidth < 1024;

  const onSectionClick = (productId: number, productName: string) => {
    if (shouldIgnoreClickAfterTouch) return;
    handleProductClick(productId, productName);
  };

  const onSectionTouchEnd = (productId: number, productName: string) => {
    handleProductTouchEnd(productId, productName);
  };

  const onSectionKeyDown = (event: React.KeyboardEvent<HTMLElement>, productId: number, productName: string) => {
    handleProductKeyDown(event, productId, productName);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-3">
      {products.map((p) => {
        const isExpanded = expandedProductId === p.id;

        return (
          <section
            key={p.id}
            className="relative cursor-pointer overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            onClick={() => onSectionClick(p.id, p.name)}
            onTouchEnd={() => onSectionTouchEnd(p.id, p.name)}
            onKeyDown={(event) => onSectionKeyDown(event, p.id, p.name)}
            role="button"
            tabIndex={0}
          >
            <div className="relative z-10">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-orange-100 bg-orange-50">
                {p.cover ? (
                  <img src={imageUrl(p.cover)} alt={p.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">No image</div>
                )}
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <h2 className="text-base sm:text-lg font-semibold text-[#1a1a1a] break-words [overflow-wrap:anywhere] leading-snug">{p.name}</h2>
                <p className="mt-1 inline-flex max-w-full rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 break-all">
                  Giá lẻ: {p.retailMin === p.retailMax ? `${p.retailMax.toLocaleString("vi-VN")} đ` : `${p.retailMin.toLocaleString("vi-VN")} - ${p.retailMax.toLocaleString("vi-VN")} đ`}
                </p>
              </div>
            </div>

            {isExpanded && (
              <ProductVariantsCardList
                productName={p.name}
                variants={p.variants}
                images={p.images || []}
                priceTier={priceTier}
                isExpanded={isExpanded}
              />
            )}
            </div>
          </section>
        );
      })}
      {popupProduct && (
        <div className="fixed inset-0 z-50 hidden items-center justify-center bg-black/45 p-4 lg:flex" onClick={closePopup}>
          <div className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-900">{popupProduct.name}</h3>
              <button type="button" onClick={closePopup} className="rounded-md border border-slate-200 px-2 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50">Đóng</button>
            </div>
            <ProductVariantsCardList
              productName={popupProduct.name}
              variants={popupProduct.variants}
              images={popupProduct.images || []}
              priceTier={priceTier}
              isExpanded
            />
          </div>
        </div>
      )}
    </div>
  );
}
