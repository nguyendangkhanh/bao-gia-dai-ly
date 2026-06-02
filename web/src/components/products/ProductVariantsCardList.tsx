"use client";

import { useMemo, useState } from "react";

type Variant = {
  id: number;
  barcode: string | null;
  displayName: string | null;
  price: number | null;
  agentPrice1: number | null;
  agentPrice2: number | null;
  imageId: number | null;
  link?: string | null;
};

type ProductImage = { id: number; url: string };

type Props = {
  productName: string;
  variants: Variant[];
  images: ProductImage[];
  priceTier: "agent1" | "agent2";
  isExpanded: boolean;
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

function formatVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

function parseCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export default function ProductVariantsCardList({ productName: _productName, variants, images, priceTier, isExpanded }: Props) {
  const [takeVat, setTakeVat] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [isVariantPickerOpen, setIsVariantPickerOpen] = useState(false);
  const [sellingPriceInput, setSellingPriceInput] = useState("");
  const [sellingPriceBlurred, setSellingPriceBlurred] = useState(false);
  const [shippingFeeInput, setShippingFeeInput] = useState("");
  const [dealerPaysShipping, setDealerPaysShipping] = useState(true);

  const selectedVariant = useMemo(() => {
    if (!variants.length) return null;
    return variants.find((variant) => variant.id === selectedVariantId) || variants[0];
  }, [selectedVariantId, variants]);

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

  const quickProfitDisplay = takeVat ? quickProfitNet || 0 : quickProfitBase || 0;
  const quickProfitLabel = takeVat ? "Lợi nhuận sau VAT" : "Lợi nhuận";

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

  return (
    <div className="mt-4 grid gap-3" onClick={(e) => e.stopPropagation()}>
      <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-1.5 font-medium text-zinc-700">
              <input type="checkbox" checked={takeVat} onChange={(e) => setTakeVat(e.target.checked)} className="h-4 w-4" />
              lấy VAT
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={dealerPaysShipping}
                onChange={(e) => setDealerPaysShipping(e.target.checked)}
                className="h-4 w-4"
              />
              Đại lý trả phí ship/lắp
            </label>
          </div>
          <div className="text-xs text-zinc-500">Giá hiển thị theo lựa chọn VAT</div>
        </div>


        <div className="mt-3 rounded-lg border border-orange-100 bg-white p-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
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
                    </span>
                    <span className={`shrink-0 text-xs text-zinc-400 transition ${isVariantPickerOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>

                  {isVariantPickerOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-orange-100 bg-white shadow-lg">
                      <div className="max-h-72 overflow-y-auto p-1.5">
                        {variants.map((variant) => {
                          const isActive = selectedVariant?.id === variant.id;
                          const primaryLabel = variant.barcode || variant.displayName || `Variant ${variant.id}`;
                          const priceLabel = formatVnd(variant.price || 0);

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
                              <span className="w-full break-words text-sm font-medium leading-5 [overflow-wrap:anywhere]">{primaryLabel}</span>
                              <span className={`w-full truncate text-xs ${isActive ? "text-orange-600" : "text-zinc-500"}`}>
                                Giá bán lẻ: {priceLabel}
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
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {variants.map((v) => {
            const variantImage = getVariantImage(images || [], v.imageId);
            const retail = v.price || 0;
            const dealer = (priceTier === "agent1" ? v.agentPrice1 : v.agentPrice2) || 0;
            const profit = Math.max(0, retail - dealer);
            const retailVat = retail + (retail * 8) / 100;
            const isQuickCalcTarget = selectedVariant?.id === v.id;
            const displayedProfit = isQuickCalcTarget && quickProfitBase !== null ? quickProfitBase : profit;
            const displayedProfitNet = Math.max(0, displayedProfit - (displayedProfit * 17) / 100);
            const deduction = (displayedProfit * 17) / 100;
            const isQuickCalcActive = isQuickCalcTarget && quickProfitBase !== null;

            return (
              <article key={v.id} className="relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-r from-white to-orange-50/40 p-3.5">
                <div className="relative z-10">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-orange-100 bg-white sm:h-16 sm:w-16">
                    {variantImage ? (
                      <img src={imageUrl(variantImage)} alt={v.barcode || v.displayName || "variant"} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[11px] text-zinc-400">No image</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <p className="text-base font-semibold leading-snug text-[#1a1a1a] break-words [overflow-wrap:anywhere]">{v.barcode || v.displayName || "-"}</p>
                      {v.link && (
                        <a
                          href={v.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-orange-200 bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-orange-700 hover:bg-orange-100"
                          title="Mở trang sản phẩm"
                        >
                          <span aria-hidden>↗</span>
                          <span>Link</span>
                        </a>
                      )}
                    </div>
                    <div className="mt-2 min-w-0 overflow-hidden space-y-1">
                      <p className="inline-flex max-w-full rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 break-all">
                        Giá bán: {formatVnd(retail)}
                      </p>
                      <p className={`inline-flex max-w-full rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 break-all transition-opacity ${takeVat ? "opacity-100" : "opacity-0"}`}>
                        +8%: {formatVnd((retail * 8) / 100)}
                      </p>
                      <p className={`inline-flex max-w-full rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700 break-all transition-opacity ${takeVat ? "opacity-100" : "opacity-0"}`}>
                        Sau VAT: {formatVnd(retailVat)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2.5 text-base">
                  <div className="rounded-lg bg-white p-3 text-left">
                    <div className="text-sm text-zinc-500">Giá đại lý</div>
                    <div className="mt-1 text-lg font-semibold text-[#e63946]">{formatVnd(dealer)}</div>
                  </div>
                  {takeVat ? (
                    <div className="rounded-lg bg-white p-3 text-left">
                      <div className="text-sm text-zinc-500">Lợi nhuận sau VAT</div>
                      <div className="mt-1 text-xs text-zinc-500">
                        Lợi nhuận gốc: {formatVnd(displayedProfit)}
                        {isQuickCalcActive && <span className="ml-1 font-medium text-orange-600">(đã áp dụng tính nhanh)</span>}
                      </div>
                      <div className="mt-0.5 text-xs text-red-500">Khấu trừ 17%: -{formatVnd(deduction)}</div>
                      <div className="mt-1 text-lg font-semibold text-emerald-700">{formatVnd(displayedProfitNet)}</div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-white p-3 text-left">
                      <div className="text-sm text-zinc-500">Lợi nhuận</div>
                      <div className="mt-1 text-lg font-semibold text-emerald-700">{formatVnd(displayedProfit)}</div>
                      {isQuickCalcActive && <div className="mt-0.5 text-xs text-orange-600">Đã áp dụng giá khách chốt và phí ship/lắp</div>}
                    </div>
                  )}
                </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
