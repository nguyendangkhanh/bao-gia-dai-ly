"use client";

import { useState } from "react";

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

export default function ProductVariantsCardList({ productName: _productName, variants, images, priceTier, isExpanded }: Props) {
  const [takeVat, setTakeVat] = useState(false);

  return (
    <div className="mt-4 grid gap-3" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col gap-2 rounded-xl border border-orange-100 bg-orange-50/40 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 text-sm">
          {/* <label className="inline-flex items-center gap-1.5 font-medium text-zinc-700">
            <input type="checkbox" checked readOnly className="h-4 w-4" />
            chưa VAT
          </label> */}
          <label className="inline-flex items-center gap-1.5 font-medium text-zinc-700">
            <input type="checkbox" checked={takeVat} onChange={(e) => setTakeVat(e.target.checked)} className="h-4 w-4" />
            lấy VAT
          </label>
        </div>
        <div className="text-xs text-zinc-500">Giá hiển thị theo lựa chọn VAT</div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          {variants.map((v) => {
            const variantImage = getVariantImage(images || [], v.imageId);
            const retail = v.price || 0;
            const dealer = (priceTier === "agent1" ? v.agentPrice1 : v.agentPrice2) || 0;
            const profit = Math.max(0, retail - dealer);
            const retailVat = retail + (retail * 8) / 100;
            const dealerVat = dealer + (dealer * 8) / 100;
            const profitVat = profit + (profit * 8) / 100 - (profit * 17) / 100;

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
                      <div className="mt-1 text-xs text-zinc-500">Lợi nhuận gốc: {formatVnd(profit)}</div>
                      <div className="mt-0.5 text-xs text-red-500">Khấu trừ 17%: -{formatVnd((profit * 17) / 100)}</div>
                      <div className="mt-1.5 text-lg font-semibold text-emerald-700">{formatVnd(profitVat)}</div>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-white p-3 text-left">
                      <div className="text-sm text-zinc-500">Lợi nhuận</div>
                      <div className="mt-1 text-lg font-semibold text-emerald-700">{formatVnd(profit)}</div>
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
