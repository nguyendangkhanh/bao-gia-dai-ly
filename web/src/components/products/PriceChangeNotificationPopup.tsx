"use client";

import { useMemo, useState } from "react";
import type { DealerPriceNotification } from "@/lib/price-notifications";

function formatVnd(value: number | null | undefined) {
  const amount = typeof value === "number" && Number.isFinite(value) ? value : 0;
  return `${amount.toLocaleString("vi-VN")}đ`;
}

function changeLabel(direction: "increased" | "decreased") {
  return direction === "increased" ? "tăng" : "giảm";
}

export default function PriceChangeNotificationPopup({ notification }: { notification: DealerPriceNotification | null }) {
  const [isOpen, setIsOpen] = useState(Boolean(notification));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const groupedItems = useMemo(() => {
    if (!notification) return [];
    const grouped = new Map<number, { productId: number; productName: string; items: DealerPriceNotification["items"] }>();

    for (const item of notification.items) {
      const entry = grouped.get(item.productId);
      if (entry) {
        entry.items.push(item);
        continue;
      }
      grouped.set(item.productId, { productId: item.productId, productName: item.productName, items: [item] });
    }

    return Array.from(grouped.values());
  }, [notification]);

  if (!notification || !isOpen) return null;

  const acknowledge = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/price-notifications/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          snapshotVersion: notification.snapshotVersion,
          variantIds: notification.items.map((item) => item.variantId),
          changes: notification.items.map((item) => ({
            variantId: item.variantId,
            retailChange: item.retailChange,
            dealerChange: item.dealerChange,
          })),
        }),
      });

      if (!res.ok) {
        setError("Không thể lưu xác nhận. Vui lòng thử lại.");
        return;
      }

      setIsOpen(false);
    } catch {
      setError("Không thể lưu xác nhận. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4">
      <div className="max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-orange-100 bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 px-5 py-4 text-white">
          <h2 className="text-xl font-bold">{notification.title}</h2>
          <p className="mt-1 text-sm text-white/90">{notification.summary}</p>
        </div>

        <div className="max-h-[calc(88vh-170px)] space-y-4 overflow-y-auto px-5 py-4">
          {groupedItems.map((group) => (
            <section key={group.productId} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-4">
              <h3 className="text-base font-bold text-slate-900">{group.productName}</h3>
              <div className="mt-3 space-y-3">
                {group.items.map((item) => (
                  <article key={item.variantId} className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="text-sm font-semibold text-slate-900">{item.variantLabel}</div>
                    <div className="mt-2 grid gap-2 md:grid-cols-2">
                      {item.retailChange && (
                        <div className="rounded-xl bg-orange-50 px-3 py-2 text-sm text-orange-800">
                          Giá bán {changeLabel(item.retailChange.direction)}: {formatVnd(item.retailChange.oldValue)} → {formatVnd(item.retailChange.newValue)}
                        </div>
                      )}
                      {item.dealerChange && (
                        <div className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
                          Giá đại lý {changeLabel(item.dealerChange.direction)}: {formatVnd(item.dealerChange.oldValue)} → {formatVnd(item.dealerChange.newValue)}
                        </div>
                      )}
                    </div>
                    <div className={`mt-3 rounded-xl px-3 py-2 text-sm ${
                      item.profitImpact === "positive"
                        ? "bg-emerald-50 text-emerald-700"
                        : item.profitImpact === "negative"
                          ? "bg-red-50 text-red-700"
                          : "bg-slate-50 text-slate-600"
                    }`}>
                      <div className="font-semibold">{item.profitMessage}</div>
                      <div className="mt-1 text-xs">
                        Lợi nhuận tham chiếu: {formatVnd(item.profitBefore)} → {formatVnd(item.profitAfter)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        </div>

        <div className="border-t border-orange-100 bg-white px-5 py-4">
          <button
            type="button"
            onClick={acknowledge}
            disabled={isSubmitting}
            className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Đang lưu xác nhận..." : "Tôi đã nắm thông tin"}
          </button>
        </div>
      </div>
    </div>
  );
}
