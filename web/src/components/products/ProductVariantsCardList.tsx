"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { PriceAcknowledgementVariantChange } from "@/lib/price-notifications";

type Variant = {
  id: number;
  barcode: string | null;
  sku?: string | null;
  displayName: string | null;
  price: number | null;
  agentPrice1: number | null;
  agentPrice2: number | null;
  imageId: number | null;
  imageDecorIds?: number[] | null;
  link?: string | null;
  weight?: number | null;
  packageLength?: number | null;
  packageWidth?: number | null;
  packageHeight?: number | null;
};

type ProductImage = { id: number; url: string; variantIds?: number[] };

type Props = {
  productName: string;
  variants: Variant[];
  images: ProductImage[];
  priceTier: "agent1" | "agent2";
  isExpanded: boolean;
  recentlyChangedPriceDeltas?: PriceAcknowledgementVariantChange[];
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

function getVariantImage(images: ProductImage[], imageId?: number | null) {
  if (!imageId) return "";
  return images.find((img) => img.id === imageId)?.url || "";
}

function getVariantDecorImages(images: ProductImage[], variant: Variant) {
  const imageIds = Array.from(
    new Set(
      [
        ...(variant.imageDecorIds || []),
        ...images.filter((img) => img.variantIds?.includes(variant.id)).map((img) => img.id),
      ].filter((id): id is number => Boolean(id)),
    ),
  );

  const decorImages = imageIds
    .map((id) => images.find((img) => img.id === id))
    .filter((img): img is ProductImage => Boolean(img?.url));

  const mainImage = images.find((img) => img.id === variant.imageId && img.url);

  if (mainImage && !decorImages.some((img) => img.id === mainImage.id)) {
    decorImages.unshift(mainImage);
  }

  return decorImages;
}

function formatVnd(value: number) {
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

function parseCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export default function ProductVariantsCardList({ productName: _productName, variants, images, priceTier, isExpanded, recentlyChangedPriceDeltas = [] }: Props) {
  const [vatsMap, setVatsMap] = useState<Record<number, boolean>>({});
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [isVariantPickerOpen, setIsVariantPickerOpen] = useState(false);
  const [sellingPriceInput, setSellingPriceInput] = useState("");
  const [sellingPriceBlurred, setSellingPriceBlurred] = useState(false);
  const [shippingFeeInput, setShippingFeeInput] = useState("");
  const [dealerPaysShipping, setDealerPaysShipping] = useState(true);
  const [lightbox, setLightbox] = useState<{ variantId: number; index: number; images: ProductImage[] } | null>(null);
  const quickProfitRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledToQuickProfitRef = useRef(false);

  const [groupSamePrices, setGroupSamePrices] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeVariantIds, setActiveVariantIds] = useState<Record<string, number>>({});

  const closeLightbox = () => setLightbox(null);

  const showPrevLightboxImage = () => {
    setLightbox((current) => {
      if (!current || current.images.length === 0) return current;
      return {
        ...current,
        index: (current.index - 1 + current.images.length) % current.images.length,
      };
    });
  };

  const showNextLightboxImage = () => {
    setLightbox((current) => {
      if (!current || current.images.length === 0) return current;
      return {
        ...current,
        index: (current.index + 1) % current.images.length,
      };
    });
  };

  const openLightbox = (variantId: number, gallery: ProductImage[], index: number) => {
    if (gallery.length === 0) return;
    setLightbox({ variantId, images: gallery, index });
  };

  const currentLightboxImage = lightbox?.images[lightbox.index] || null;

  useEffect(() => {
    hasScrolledToQuickProfitRef.current = false;
  }, [selectedVariantId]);

  useEffect(() => {
    if (!isExpanded || typeof window === "undefined" || window.innerWidth >= 1024 || hasScrolledToQuickProfitRef.current) return;

    quickProfitRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    hasScrolledToQuickProfitRef.current = true;
  }, [isExpanded]);

  const selectedVariant = useMemo(() => {
    if (!variants.length) return null;
    return variants.find((variant) => variant.id === selectedVariantId) || variants[0];
  }, [selectedVariantId, variants]);

  const activeVariantChange = useMemo(() => {
    if (!selectedVariant) return null;
    return recentlyChangedPriceDeltas.find((c) => c.variantId === selectedVariant.id) || null;
  }, [selectedVariant, recentlyChangedPriceDeltas]);

  const selectedRetail = selectedVariant?.price || 0;
  const selectedDealer = ((priceTier === "agent1" ? selectedVariant?.agentPrice1 : selectedVariant?.agentPrice2) || 0);
  const retailFloorPrice = Math.max(0, selectedRetail - 250000);
  const minimumSellingPrice = Math.max(selectedDealer + 1, retailFloorPrice);
  const sellingPrice = parseCurrencyInput(sellingPriceInput);
  const shippingFee = parseCurrencyInput(shippingFeeInput);
  const hasQuickCalc = Boolean(selectedVariant && sellingPrice > 0);
  const isBelowMinimumSellingPrice = hasQuickCalc && sellingPrice < minimumSellingPrice;
  const shouldShowMinimumSellingPriceWarning = sellingPriceBlurred && isBelowMinimumSellingPrice;
  const minimumPriceReason = minimumSellingPrice === selectedDealer + 1 ? "phải cao hơn giá đại lý" : "không được thấp hơn giá bán lẻ trừ 250.000đ";
  const minimumSellingGap = hasQuickCalc && isBelowMinimumSellingPrice ? minimumSellingPrice - sellingPrice : 0;
  const retailFloorGap = selectedRetail > 0 ? selectedRetail - minimumSellingPrice : 0;
  const shouldUseRetailFloorRule = retailFloorPrice > selectedDealer;
  const minimumSellingPolicyText = shouldUseRetailFloorRule
    ? `Giá khách chốt phải từ ${formatVnd(minimumSellingPrice)} trở lên.`
    // : `Giá khách chốt phải cao hơn giá đại lý (${formatVnd(selectedDealer)}).`;
    : ``;

  const minimumSellingPolicyDetail = shouldUseRetailFloorRule
    ? `Mức tối thiểu được áp dụng là giá bán lẻ trừ ${formatVnd(retailFloorGap)}.`
    : "";
  const minimumSellingViolationText = `Giá khách chốt đang thấp hơn mức tối thiểu ${formatVnd(minimumSellingPrice)}.`;
  const minimumSellingViolationDetail = minimumSellingGap > 0 ? `Thiếu ${formatVnd(minimumSellingGap)} vì ${minimumPriceReason}.` : "";
  const minimumSellingHint = shouldUseRetailFloorRule
    ? `Tối thiểu ${minimumSellingPrice.toLocaleString("vi-VN")}đ`
    : `>${selectedDealer.toLocaleString("vi-VN")}đ`;
  const quickProfitBase = hasQuickCalc ? Math.max(0, sellingPrice - selectedDealer - (dealerPaysShipping ? shippingFee : 0)) : null;
  const quickProfitNet = quickProfitBase === null ? null : Math.max(0, quickProfitBase - (quickProfitBase * 17) / 100);

  const sellingPriceHint = selectedRetail ? minimumSellingHint : "Nhập giá bán";

  const sellingPriceInputClassName = `rounded-lg border px-3 py-2 outline-none focus:border-orange-400 ${
    shouldShowMinimumSellingPriceWarning ? "border-red-300 bg-red-50 text-red-700" : "border-orange-200"
  }`;

  const quickCalcSummaryClassName = `rounded-lg px-3 py-2 text-sm ${
    shouldShowMinimumSellingPriceWarning ? "bg-red-50 text-red-700" : "bg-orange-50 text-zinc-700"
  }`;

  const effectiveShippingFee = dealerPaysShipping ? shippingFee : 0;
  const quickCalcFormula = dealerPaysShipping
    ? `${formatVnd(sellingPrice)} - ${formatVnd(selectedDealer)} - ${formatVnd(effectiveShippingFee)}`
    : `${formatVnd(sellingPrice)} - ${formatVnd(selectedDealer)}`;

  const isSelectedVariantVat = selectedVariant ? !!vatsMap[selectedVariant.id] : false;
  const quickProfitDisplay = isSelectedVariantVat ? quickProfitNet || 0 : quickProfitBase || 0;
  const quickProfitLabel = isSelectedVariantVat ? "Lợi nhuận sau VAT" : "Lợi nhuận";

  const minimumSellingPriceWarning = selectedRetail ? minimumSellingPolicyText : "";

  const minimumSellingPriceViolation = selectedRetail ? minimumSellingViolationText : "";

  const minimumSellingPriceStatus = selectedRetail ? minimumSellingPolicyDetail : "";

  const minimumSellingPriceViolationDetail = minimumSellingViolationDetail;

  const sellingPriceHelpText = shouldShowMinimumSellingPriceWarning ? minimumSellingPriceViolation : minimumSellingPriceWarning;

  const summaryFooterText = shouldShowMinimumSellingPriceWarning ? minimumSellingPriceViolationDetail : minimumSellingPriceStatus;

  const quickCalcDisabledText = "Nhập giá khách chốt để tính nhanh lợi nhuận.";

  const quickCalcAlertText = shouldShowMinimumSellingPriceWarning ? "Giá này không đạt chính sách đại lý." : "";

  const quickCalcLabelClassName = shouldShowMinimumSellingPriceWarning ? "font-semibold text-red-700" : "font-semibold text-emerald-700";

  const sellingPriceHelpClassName = shouldShowMinimumSellingPriceWarning ? "text-xs text-red-600" : "text-xs text-zinc-500";

  const summaryFooterClassName = shouldShowMinimumSellingPriceWarning ? "text-xs text-red-600" : "text-xs text-zinc-500";

  const quickCalcAlertClassName = "text-xs font-medium text-red-600";

  const quickCalcShouldShowFooter = Boolean(summaryFooterText);

  const quickCalcShouldShowAlert = Boolean(quickCalcAlertText);

  const quickCalcShouldShowHelp = Boolean(sellingPriceHelpText);

  const quickCalcFormulaClassName = shouldShowMinimumSellingPriceWarning ? "text-xs text-red-600" : "text-xs text-zinc-500";

  const quickCalcProfitTextClassName = quickCalcLabelClassName;

  const quickCalcValue = formatVnd(quickProfitDisplay);

  const quickCalcFormulaText = quickCalcFormula;

  const quickCalcPolicyText = selectedRetail ? `` : "";

  const formatCurrencyField = (value: string) => {
    const amount = parseCurrencyInput(value);
    return amount ? amount.toLocaleString("vi-VN") : "";
  };

  const groups = useMemo(() => {
    if (!groupSamePrices) {
      return variants.map((v) => ({
        key: String(v.id),
        variants: [v],
        retail: v.price || 0,
        dealer: (priceTier === "agent1" ? v.agentPrice1 : v.agentPrice2) || 0,
      }));
    }

    const map: Record<string, Variant[]> = {};
    variants.forEach((v) => {
      const retail = v.price || 0;
      const dealer = (priceTier === "agent1" ? v.agentPrice1 : v.agentPrice2) || 0;
      const key = `${retail}_${dealer}`;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(v);
    });

    return Object.entries(map).map(([key, list]) => {
      const first = list[0];
      return {
        key,
        variants: list,
        retail: first.price || 0,
        dealer: (priceTier === "agent1" ? first.agentPrice1 : first.agentPrice2) || 0,
      };
    });
  }, [variants, priceTier, groupSamePrices]);

  const handleCopyGroupQuote = async (group: { variants: Variant[]; retail: number; dealer: number; key: string }) => {
    const names = group.variants.map((v) => v.barcode || v.displayName || "Sản phẩm").join(" / ");
    const groupTakeVat = group.variants.some((v) => !!vatsMap[v.id]);
    
    let text = `${_productName} - ${names}\n`;
    if (groupTakeVat) {
      const retailVat = group.retail + (group.retail * 8) / 100;
      text += `- Giá bán lẻ (+8% VAT): ${formatVnd(retailVat)}\n`;
    } else {
      text += `- Giá bán lẻ: ${formatVnd(group.retail)}\n`;
    }
    text += `- Giá đại lý: ${formatVnd(group.dealer)}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(`group-${group.key}`);
      setTimeout(() => setCopiedKey((prev) => (prev === `group-${group.key}` ? null : prev)), 1200);
    } catch (err) {
      console.error("Failed to copy quote:", err);
    }
  };

  const handleCopyAllQuotes = async () => {
    const text = groups.map((g) => {
      const names = g.variants.map((v) => v.barcode || v.displayName || "Sản phẩm").join(" / ");
      const retail = g.retail;
      const dealer = g.dealer;
      const groupTakeVat = g.variants.some((v) => !!vatsMap[v.id]);

      let itemText = `• ${names}\n`;
      if (groupTakeVat) {
        const retailVat = retail + (retail * 8) / 100;
        itemText += `  - Giá bán lẻ (+8% VAT): ${formatVnd(retailVat)}\n`;
      } else {
        itemText += `  - Giá bán lẻ: ${formatVnd(retail)}\n`;
      }
      itemText += `  - Giá đại lý: ${formatVnd(dealer)}`;
      return itemText;
    }).join("\n\n");

    const fullText = `Báo giá: ${_productName}\n--------------------------------\n${text}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedKey("all");
      setTimeout(() => setCopiedKey((prev) => (prev === "all" ? null : prev)), 1200);
    } catch (err) {
      console.error("Failed to copy all quotes:", err);
    }
  };

  return (
    <div
      className="mt-4 grid gap-3"
      onClick={(e) => e.stopPropagation()}
      onTouchStartCapture={(e) => e.stopPropagation()}
      onTouchEndCapture={(e) => e.stopPropagation()}
    >
      <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-1.5 font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedVariant ? !!vatsMap[selectedVariant.id] : false}
                onChange={(e) => {
                  if (selectedVariant) {
                    setVatsMap((prev) => ({
                      ...prev,
                      [selectedVariant.id]: e.target.checked,
                    }));
                  }
                }}
                className="h-4 w-4"
              />
              lấy VAT
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={dealerPaysShipping}
                onChange={(e) => setDealerPaysShipping(e.target.checked)}
                className="h-4 w-4"
              />
              Đại lý trả phí ship/lắp
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={groupSamePrices}
                onChange={(e) => setGroupSamePrices(e.target.checked)}
                className="h-4 w-4"
              />
              Gom nhóm cùng giá
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyAllQuotes}
              className="inline-flex items-center gap-1 rounded-lg border border-orange-200 bg-white px-2 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-50 transition"
            >
              <span>📋</span>
              <span>{copiedKey === "all" ? "Đã copy toàn bộ" : "Copy báo giá"}</span>
            </button>
            <div className="text-xs text-zinc-500">Giá hiển thị theo lựa chọn VAT</div>
          </div>
        </div>


        <div className="mt-3 rounded-lg border border-orange-100 bg-white p-3">
          {activeVariantChange && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 mb-3">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <span>🔔 Xác nhận đổi giá của "{_productName} - {selectedVariant?.displayName || selectedVariant?.barcode || `Variant ${selectedVariant?.id}`}" vào lúc: {activeVariantChange.acknowledgedAt ? formatDate(activeVariantChange.acknowledgedAt) : "Tuần này"}</span>
              </div>
              {activeVariantChange.dealerChange || activeVariantChange.retailChange ? (
                <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
                  {activeVariantChange.dealerChange && (
                    <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-1.5">
                      <span>Giá đại lý:</span>
                      <span className="font-bold flex items-center gap-1">
                        <span className="text-zinc-500 line-through font-normal">{formatVnd(activeVariantChange.dealerChange.oldValue || 0)}</span>
                        <span className="text-zinc-400">→</span>
                        <span className={activeVariantChange.dealerChange.direction === "increased" ? "text-red-700" : "text-emerald-700"}>
                          {formatVnd(activeVariantChange.dealerChange.newValue || 0)}
                        </span>
                      </span>
                    </div>
                  )}
                  {activeVariantChange.retailChange && (
                    <div className="flex items-center justify-between rounded-lg bg-white/60 px-3 py-1.5">
                      <span>Giá bán lẻ:</span>
                      <span className="font-bold flex items-center gap-1">
                        <span className="text-zinc-500 line-through font-normal">{formatVnd(activeVariantChange.retailChange.oldValue || 0)}</span>
                        <span className="text-zinc-400">→</span>
                        <span className={activeVariantChange.retailChange.direction === "increased" ? "text-red-700" : "text-emerald-700"}>
                          {formatVnd(activeVariantChange.retailChange.newValue || 0)}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-1 text-[11px] text-amber-800 italic">Vừa cập nhật giá</div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div ref={quickProfitRef} className="flex flex-col gap-1">
              <div className="text-sm font-semibold text-zinc-800">Tính nhanh lợi nhuận</div>
              <div className="text-xs text-zinc-500">Chọn sản phẩm và nhập giá bán thực tế để cập nhật trực tiếp ô lợi nhuận bên dưới.</div>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-4 xl:items-start">
              <div className="flex h-full flex-col gap-1 text-sm text-zinc-700">
                <span className="font-medium">Sản phẩm</span>
                <div
                  className="relative flex-1"
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setIsVariantPickerOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsVariantPickerOpen((open) => !open)}
                    className="flex min-h-14 w-full items-start justify-between gap-3 rounded-xl border border-orange-200 bg-white px-3 py-2 text-left shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 xl:min-h-[56px]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block break-words text-sm font-medium leading-5 text-zinc-800 [overflow-wrap:anywhere]">
                        {selectedVariant?.barcode || selectedVariant?.displayName || (selectedVariant ? `Variant ${selectedVariant.id}` : "Chọn sản phẩm")}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-zinc-500">
                        Giá bán lẻ: {formatVnd(selectedVariant?.price || 0)}
                      </span>
                      {selectedVariant && (
                        <span className="mt-0.5 block truncate text-xs text-zinc-500">
                          Giá đại lý: {formatVnd(selectedDealer)}
                        </span>
                      )}
                    </span>
                    <span className={`shrink-0 text-xs text-zinc-400 transition ${isVariantPickerOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>

                  {isVariantPickerOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-orange-100 bg-white shadow-lg">
                      <div className="max-h-72 overflow-y-auto p-1.5">
                        {variants.map((variant) => {
                          const isActive = selectedVariant?.id === variant.id;
                          const isRecentlyChanged = recentlyChangedPriceDeltas.some((c) => c.variantId === variant.id);
                          const primaryLabel = variant.barcode || variant.displayName || `Variant ${variant.id}`;
                          const priceLabel = formatVnd(variant.price || 0);
                          const dealerPrice = (priceTier === "agent1" ? variant.agentPrice1 : variant.agentPrice2) || 0;

                          return (
                            <button
                              key={variant.id}
                              type="button"
                              onClick={() => {
                                setSelectedVariantId(variant.id);
                                setIsVariantPickerOpen(false);
                              }}
                              className={`flex w-full flex-col items-start rounded-lg px-3 py-2 text-left transition ${
                                isActive ? "bg-orange-50 text-orange-700" : "text-zinc-700 hover:bg-zinc-50"
                              }`}
                            >
                              <span className="flex w-full items-center justify-between text-sm font-medium leading-5">
                                <span className="break-words [overflow-wrap:anywhere]">{primaryLabel}</span>
                                {isRecentlyChanged && (
                                  <span className="rounded bg-amber-100 px-1 py-0.5 text-[9px] font-bold text-amber-800 shrink-0 ml-1">
                                    Cập nhật giá
                                  </span>
                                )}
                              </span>
                              <span className={`w-full truncate text-xs ${isActive ? "text-orange-600" : "text-zinc-500"}`}>
                                Giá bán lẻ: {priceLabel}
                              </span>
                              <span className={`w-full truncate text-xs ${isActive ? "text-orange-600" : "text-zinc-500"}`}>
                                Giá đại lý: {formatVnd(dealerPrice)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
{/* 
              <label className="flex flex-col gap-1 text-sm text-zinc-700">
                <span className="font-medium">Giá bán lẻ</span>
                <input
                  value={selectedRetail ? formatVnd(selectedRetail) : "0đ"}
                  readOnly
                  className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-500 outline-none"
                />
              </label> */}

              <label className="flex h-full flex-col gap-1 text-sm text-zinc-700 xl:justify-start">
                <span className="font-medium">Giá khách chốt</span>
                <input
                  inputMode="numeric"
                  value={formatCurrencyField(sellingPriceInput)}
                  onChange={(e) => {
                    setSellingPriceInput(e.target.value);
                    setSellingPriceBlurred(false);
                  }}
                  onBlur={() => setSellingPriceBlurred(true)}
                  placeholder={sellingPriceHint}
                  className={`${sellingPriceInputClassName} xl:h-[56px]`}
                />
                <span className={`${sellingPriceHelpClassName} xl:min-h-[20px]`}>
                  {quickCalcShouldShowHelp ? sellingPriceHelpText : ""}
                </span>
              </label>

              <label className="flex h-full flex-col gap-1 text-sm text-zinc-700 xl:justify-start">
                <span className="font-medium">Phí ship/lắp</span>
                <input
                  inputMode="numeric"
                  value={formatCurrencyField(shippingFeeInput)}
                  onChange={(e) => setShippingFeeInput(e.target.value)}
                  placeholder="Nhập phí ship/lắp"
                  className="rounded-lg border border-orange-200 px-3 py-2 outline-none focus:border-orange-400 xl:h-[56px]"
                />
                <span className="text-xs xl:min-h-[20px]" />
              </label>
            </div>

            <div className="flex flex-col gap-3 lg:items-center">
              <div className={`${quickCalcSummaryClassName} ${hasQuickCalc ? "mx-auto w-full max-w-2xl text-center" : ""}`}>
                {hasQuickCalc ? (
                  <div className="space-y-1 text-center">
                    <div className={quickCalcFormulaClassName}>{quickCalcFormulaText}</div>
                    <div>
                      {quickProfitLabel}: <span className={quickCalcProfitTextClassName}>{quickCalcValue}</span>
                    </div>
                    {quickCalcShouldShowAlert && <div className={quickCalcAlertClassName}>{quickCalcAlertText}</div>}
                    {quickCalcShouldShowFooter && <div className={summaryFooterClassName}>{summaryFooterText}</div>}
                    {quickCalcPolicyText && <div className="text-xs text-zinc-500">{quickCalcPolicyText}</div>}
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500">{quickCalcDisabledText}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 gap-3 lg:gap-4">
          {groups.map((group) => {
            const first = group.variants[0];
            const activeVariantId = activeVariantIds[group.key] || first.id;
            const activeVariant = group.variants.find((v) => v.id === activeVariantId) || first;

            const retail = group.retail;
            const dealer = group.dealer;
            const profit = Math.max(0, retail - dealer);
            const retailVat = retail + (retail * 8) / 100;

            const isQuickCalcTarget = selectedVariant?.id === activeVariant.id;
            const displayedProfit = isQuickCalcTarget && quickProfitBase !== null ? quickProfitBase : profit;
            const displayedProfitNet = Math.max(0, displayedProfit - (displayedProfit * 17) / 100);
            const deduction = (displayedProfit * 17) / 100;
            const isQuickCalcActive = isQuickCalcTarget && quickProfitBase !== null;
            const variantTakeVat = !!vatsMap[activeVariant.id];

            const activeVariantGallery = getVariantDecorImages(images || [], activeVariant);
            const variantImage = getVariantImage(images || [], activeVariant.imageId) || activeVariantGallery[0]?.url || "";

            const activeLink = activeVariant.link || null;

            return (
              <article
                key={group.key}
                onClick={() => {
                  setSelectedVariantId(activeVariant.id);
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    quickProfitRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`relative overflow-hidden rounded-2xl border p-3.5 sm:p-5 lg:p-6 cursor-pointer transition ${
                  isQuickCalcTarget
                    ? "border-orange-300 bg-gradient-to-r from-orange-50/30 to-orange-100/30 ring-2 ring-orange-100"
                    : "border-orange-100 bg-gradient-to-r from-white to-orange-50/40 hover:border-orange-200"
                }`}
              >
                <div className="relative z-10 flex flex-col gap-4">
                  {/* Row 1: 2 columns */}
                  <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                    {/* Column 1: Image, Gallery, Weight/Dimensions */}
                    <div className="w-24 shrink-0 sm:w-28 lg:w-36" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => variantImage && openLightbox(activeVariant.id, activeVariantGallery.length ? activeVariantGallery : [{ id: activeVariant.imageId || activeVariant.id, url: variantImage }], 0)}
                        className="block h-24 w-full overflow-hidden rounded-lg border border-orange-100 bg-white sm:h-28 lg:h-36"
                      >
                        {variantImage ? (
                          <img src={imageUrl(variantImage)} alt={activeVariant.barcode || activeVariant.displayName || "variant"} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[11px] text-zinc-400">No image</div>
                        )}
                      </button>
                      {activeVariantGallery.length > 1 && (
                        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                          {activeVariantGallery.slice(0, 6).map((image, index) => (
                            <button
                              key={image.id}
                              type="button"
                              onClick={() => openLightbox(activeVariant.id, activeVariantGallery, index)}
                              className="h-10 w-10 lg:h-12 lg:w-12 shrink-0 overflow-hidden rounded-md border border-orange-100 bg-white transition hover:border-orange-300"
                            >
                              <img src={imageUrl(image.url)} alt={activeVariant.barcode || activeVariant.displayName || "variant"} className="h-full w-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 ">
                      <div className="min-w-0 overflow-hidden space-y-1.5 lg:space-y-2">
                           <div className="mt-3">
                        <p className="text-base sm:text-lg lg:text-xl font-semibold leading-snug text-[#1a1a1a] break-words [overflow-wrap:anywhere]">
                          {activeVariant.barcode || activeVariant.displayName || "-"}
                        </p>
                        {(() => {
                          const weightKg = activeVariant.weight ? activeVariant.weight / 1000 : null;
                          const dimensionsText = (activeVariant.packageLength && activeVariant.packageWidth && activeVariant.packageHeight)
                            ? `${activeVariant.packageLength}x${activeVariant.packageWidth}x${activeVariant.packageHeight} cm`
                            : null;
                          if (!weightKg && !dimensionsText) return null;
                          return (
                            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs lg:text-sm font-medium text-zinc-500">
                              {weightKg && (
                                <span className="inline-flex items-center gap-1">
                                  <span>⚖️</span>
                                  <span>{weightKg} kg</span>
                                </span>
                              )}
                              {dimensionsText && (
                                <span className="inline-flex items-center gap-1">
                                  <span>📦</span>
                                  <span>{dimensionsText}</span>
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                        <div className="flex flex-wrap gap-1.5 lg:gap-2.5">
                          <p className="inline-flex rounded-full bg-orange-50 px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm font-semibold text-orange-700">
                            Giá bán: {formatVnd(retail)}
                          </p>
                          {variantTakeVat && (
                            <>
                              <p className="inline-flex rounded-full bg-orange-50 px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm font-semibold text-orange-700">
                                +8%: {formatVnd((retail * 8) / 100)}
                              </p>
                              <p className="inline-flex rounded-full bg-orange-50 px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm font-semibold text-orange-700">
                                Sau VAT: {formatVnd(retailVat)}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 lg:gap-2.5">
                          <p className="inline-flex rounded-full bg-[#fdf2f2] border border-[#fde8e8] px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm font-semibold text-[#e63946]">
                            Giá đại lý: {formatVnd(dealer)}
                          </p>
                          {variantTakeVat ? (
                            <div className="inline-flex flex-col rounded-xl bg-emerald-50 border border-emerald-100 px-2.5 py-1 lg:px-3.5 lg:py-2 text-xs lg:text-sm text-emerald-800">
                              <span className="font-semibold text-emerald-700">Lợi nhuận sau VAT: {formatVnd(displayedProfitNet)}</span>
                              <span className="text-[10px] lg:text-xs text-zinc-500 mt-0.5">
                                Lợi nhuận gốc: {formatVnd(displayedProfit)}
                                {isQuickCalcActive && " (đã tính nhanh)"}
                              </span>
                              <span className="text-[10px] lg:text-xs text-red-500">Khấu trừ 17%: -{formatVnd(deduction)}</span>
                            </div>
                          ) : (
                            <p className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-2 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm font-semibold text-emerald-700">
                              Lợi nhuận: {formatVnd(displayedProfit)}
                              {isQuickCalcActive && <span className="ml-1 text-[10px] lg:text-xs text-orange-600 font-medium">(đã tính nhanh)</span>}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-1.5 lg:gap-2 " onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleCopyGroupQuote({ variants: [activeVariant], retail, dealer, key: group.key })}
                          className="inline-flex items-center gap-1 rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 lg:px-2.5 lg:py-1 text-[11px] lg:text-xs font-semibold text-orange-700 hover:bg-orange-100"
                          title="Copy báo giá của sản phẩm đang chọn"
                        >
                          <span>📋</span>
                          <span>{copiedKey === `group-${group.key}` ? "Đã copy" : "Copy"}</span>
                        </button>

                        <label className="inline-flex items-center gap-1 rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 lg:px-2.5 lg:py-1 text-[11px] lg:text-xs font-semibold text-orange-700 hover:bg-orange-100 cursor-pointer font-medium">
                          <input
                            type="checkbox"
                            checked={variantTakeVat}
                            onChange={(e) => {
                              setVatsMap((prev) => ({
                                ...prev,
                                [activeVariant.id]: e.target.checked,
                              }));
                            }}
                            className="h-3 w-3 lg:h-3.5 lg:w-3.5"
                          />
                          VAT
                        </label>

                        {activeLink && (
                          <a
                            href={activeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 lg:px-2.5 lg:py-1 text-[11px] lg:text-xs font-semibold text-orange-700 hover:bg-orange-100"
                            title={`Mở trang: ${activeVariant.barcode || activeVariant.displayName || ''}`}
                          >
                            <span aria-hidden>↗</span>
                            <span>Link</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: 1 merged column (the "Nhóm đồng giá" buttons list) */}
                  {group.variants.length > 1 && (
                    <div className="w-full border-t border-orange-100/80 pt-3" onClick={(e) => e.stopPropagation()}>
                      <p className="text-xs lg:text-sm font-semibold uppercase tracking-wider text-orange-600">Nhóm đồng giá ({group.variants.length})</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {group.variants.map((v) => {
                          const isActive = activeVariant.id === v.id;
                          const isRecentlyChanged = recentlyChangedPriceDeltas.some((c) => c.variantId === v.id);
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => {
                                setActiveVariantIds((prev) => ({
                                  ...prev,
                                  [group.key]: v.id,
                                }));
                                setSelectedVariantId(v.id);
                              }}
                              className={`inline-flex items-center rounded px-1.5 py-0.5 lg:px-2.5 lg:py-1.5 text-[10px] lg:text-xs font-medium border transition gap-1 ${
                                isActive
                                  ? "bg-orange-50 border-orange-200 text-orange-700 font-semibold shadow-sm"
                                  : isRecentlyChanged
                                    ? "bg-amber-50 border-amber-300 text-amber-800 font-semibold"
                                    : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200"
                              }`}
                            >
                              <span>{v.barcode || v.displayName || `Variant ${v.id}`}</span>
                              {isRecentlyChanged && <span className="text-[9px] text-amber-600 font-bold">⚡</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {typeof document !== "undefined" && lightbox && currentLightboxImage
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4"
              onClick={closeLightbox}
            >
              <div
                className="relative flex w-full max-w-5xl items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={showPrevLightboxImage}
                  className="absolute left-2 z-10 rounded-full bg-white/90 px-3 py-2 text-lg font-bold text-zinc-700 shadow hover:bg-white"
                >
                  ‹
                </button>
                <img
                  src={imageUrl(currentLightboxImage.url)}
                  alt="Variant preview"
                  className="max-h-[85vh] w-auto max-w-full rounded-xl bg-white object-contain"
                />
                <button
                  type="button"
                  onClick={showNextLightboxImage}
                  className="absolute right-2 z-10 rounded-full bg-white/90 px-3 py-2 text-lg font-bold text-zinc-700 shadow hover:bg-white"
                >
                  ›
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-zinc-700 shadow hover:bg-white"
                >
                  Đóng
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
