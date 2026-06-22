"use client";

import { useRef, useState } from "react";
import ProductVariantsCardList from "@/components/products/ProductVariantsCardList";
import type { PriceAcknowledgementVariantChange } from "@/lib/price-notifications";

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
    weight?: number | null;
    packageLength?: number | null;
    packageWidth?: number | null;
    packageHeight?: number | null;
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

function formatVnd(value: number | null | undefined) {
  if (value === null || value === undefined) return "0đ";
  return `${value.toLocaleString("vi-VN")}đ`;
}

function formatDate(isoString?: string) {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch {
    return "";
  }
}

export default function ProductsSectionList({
  products,
  priceTier,
  recentlyChangedPriceDeltas = [],
}: {
  products: Product[];
  priceTier: "agent1" | "agent2";
  recentlyChangedPriceDeltas?: PriceAcknowledgementVariantChange[];
}) {
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [popupProductId, setPopupProductId] = useState<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const mobileTapThreshold = 10;

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

  const onSectionClick = (productId: number, productName: string) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      handleProductClick(productId, productName);
    }
  };

  const onSectionKeyDown = (event: React.KeyboardEvent<HTMLElement>, productId: number, productName: string) => {
    handleProductKeyDown(event, productId, productName);
  };

  const onSectionTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const onSectionTouchEnd = (productId: number, productName: string, event: React.TouchEvent<HTMLElement>) => {
    const touchStartY = touchStartYRef.current;
    touchStartYRef.current = null;

    const touchEndY = event.changedTouches[0]?.clientY;
    if (touchStartY === null || touchEndY === undefined) return;
    if (Math.abs(touchEndY - touchStartY) > mobileTapThreshold) return;

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onToggleProduct(productId, productName);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-3">
      {products.map((p) => {
        const isExpanded = expandedProductId === p.id;
        
        const productChanges = p.variants
          .map((v) => recentlyChangedPriceDeltas.find((c) => c.variantId === v.id))
          .filter(Boolean) as PriceAcknowledgementVariantChange[];
        const hasChangedPrice = productChanges.length > 0;
        
        const latestAckAt = productChanges.reduce((latest, c) => {
          if (!c.acknowledgedAt) return latest;
          if (!latest) return c.acknowledgedAt;
          return new Date(c.acknowledgedAt) > new Date(latest) ? c.acknowledgedAt : latest;
        }, undefined as string | undefined);

        return (
          <section
            key={p.id}
            className={`relative cursor-pointer overflow-hidden rounded-2xl border p-4 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
              hasChangedPrice
                ? "border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/30"
                : "border-orange-100 bg-white"
            }`}
            onClick={() => onSectionClick(p.id, p.name)}
            onTouchStart={onSectionTouchStart}
            onTouchEnd={(event) => onSectionTouchEnd(p.id, p.name, event)}
            onKeyDown={(event) => onSectionKeyDown(event, p.id, p.name)}
            role="button"
            tabIndex={0}
          >
            <div className="relative z-10">
            {hasChangedPrice && (
              <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            )}
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
                <div className="mt-1 flex">
                  <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                    Giá lẻ: {p.retailMin === p.retailMax ? `${p.retailMax.toLocaleString("vi-VN")} đ` : `${p.retailMin.toLocaleString("vi-VN")} - ${p.retailMax.toLocaleString("vi-VN")} đ`}
                  </span>
                </div>
                {(() => {
                  const firstVariant = p.variants?.[0];
                  const weightKg = firstVariant?.weight ? firstVariant.weight / 1000 : null;
                  const dimensionsText = (firstVariant?.packageLength && firstVariant?.packageWidth && firstVariant?.packageHeight)
                    ? `${firstVariant.packageLength}x${firstVariant.packageWidth}x${firstVariant.packageHeight} cm`
                    : null;
                  if (!weightKg && !dimensionsText) return null;
                  return (
                    <div className="mt-1.5 flex items-center gap-2">
                      {weightKg && (
                        <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          ⚖️ {weightKg} kg
                        </span>
                      )}
                      {dimensionsText && (
                        <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          📦 {dimensionsText}
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            {hasChangedPrice && (
              <div className="mt-3 rounded-xl bg-orange-50/80 border border-orange-100 p-2.5 text-xs text-orange-900 space-y-1" onClick={(e) => e.stopPropagation()}>
                <div className="font-bold flex items-center gap-1">
                  <span>✨ Xác nhận đổi giá: {latestAckAt ? formatDate(latestAckAt) : "Tuần này"}</span>
                </div>
                <div className="divide-y divide-orange-100/50">
                  {productChanges.map((change) => {
                    const v = p.variants.find((variant) => variant.id === change.variantId);
                    if (!v) return null;
                    const label = v.displayName || v.barcode || "Sản phẩm";
                    return (
                      <div key={change.variantId} className="py-1 first:pt-0 last:pb-0">
                        <div className="font-semibold text-slate-800 truncate" title={label}>{label}</div>
                        <div className="mt-0.5 flex flex-col gap-0.5 text-[10px] text-slate-600">
                          {change.dealerChange && (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Đại lý:</span>
                              <span className="font-semibold text-zinc-600 line-through">{formatVnd(change.dealerChange.oldValue)}</span>
                              <span className="text-zinc-400">→</span>
                              <span className={`font-semibold ${change.dealerChange.direction === "increased" ? "text-red-600" : "text-emerald-600"}`}>
                                {formatVnd(change.dealerChange.newValue)}
                              </span>
                            </div>
                          )}
                          {change.retailChange && (
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Bán lẻ:</span>
                              <span className="font-semibold text-zinc-600 line-through">{formatVnd(change.retailChange.oldValue)}</span>
                              <span className="text-zinc-400">→</span>
                              <span className={`font-semibold ${change.retailChange.direction === "increased" ? "text-red-600" : "text-emerald-600"}`}>
                                {formatVnd(change.retailChange.newValue)}
                              </span>
                            </div>
                          )}
                          {!change.dealerChange && !change.retailChange && (
                            <span className="text-[10px] text-zinc-500 italic">Vừa cập nhật giá</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
 
            {isExpanded && (
              <ProductVariantsCardList
                productName={p.name}
                variants={p.variants}
                images={p.images || []}
                priceTier={priceTier}
                isExpanded={isExpanded}
                recentlyChangedPriceDeltas={recentlyChangedPriceDeltas}
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
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">{popupProduct.name}</h3>
                {(() => {
                  const firstVariant = popupProduct.variants?.[0];
                  const weightKg = firstVariant?.weight ? firstVariant.weight / 1000 : null;
                  const dimensionsText = (firstVariant?.packageLength && firstVariant?.packageWidth && firstVariant?.packageHeight)
                    ? `${firstVariant.packageLength}x${firstVariant.packageWidth}x${firstVariant.packageHeight} cm`
                    : null;
                  if (!weightKg && !dimensionsText) return null;
                  return (
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      {weightKg && (
                        <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          ⚖️ {weightKg} kg
                        </span>
                      )}
                      {dimensionsText && (
                        <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          📦 {dimensionsText}
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>
              <button type="button" onClick={closePopup} className="rounded-md border border-slate-200 px-2 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50">Đóng</button>
            </div>
            <ProductVariantsCardList
              productName={popupProduct.name}
              variants={popupProduct.variants}
              images={popupProduct.images || []}
              priceTier={priceTier}
              isExpanded
              recentlyChangedPriceDeltas={recentlyChangedPriceDeltas}
            />
          </div>
        </div>
      )}
    </div>
  );
}
