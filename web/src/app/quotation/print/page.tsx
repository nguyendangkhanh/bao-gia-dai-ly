"use client";

import { useMemo } from "react";
import { QuoteDraft } from "@/types/quotation";

function Watermark({ text }: { text: string }) {
  const marks = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.10] print:opacity-[0.14]">
      <div className="grid h-full w-full grid-cols-3">
        {marks.map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <span className="-rotate-[28deg] text-[11px] font-semibold tracking-wide text-slate-700">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrintQuotationPage() {
  const draft = useMemo<QuoteDraft | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem("quoteDraft");
    if (!raw) return null;
    return JSON.parse(raw) as QuoteDraft;
  }, []);

  const total = useMemo(() => draft?.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0) || 0, [draft]);

  if (!draft) {
    return <main className="mx-auto max-w-3xl p-6">Không có dữ liệu báo giá.</main>;
  }

  const watermarkText = `CONFIDENTIAL • ${draft.dealerName} • ${draft.dealerGroup} • ${new Date(draft.createdAt).toLocaleString("vi-VN")}`;

  return (
    <main className="mx-auto w-full max-w-4xl bg-slate-100 p-6 print:bg-white">
      <div className="mb-4 flex justify-end gap-2 print:hidden">
        <button className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-slate-700 transition-all duration-200 hover:shadow" onClick={() => history.back()}>Quay lại</button>
        <button className="btn-primary" onClick={() => window.print()}>In / Xuất PDF</button>
      </div>

      <section className="relative overflow-hidden rounded-lg border border-slate-300 bg-white p-0 text-slate-900">
        <Watermark text={watermarkText} />

        <div className="relative z-10">
          <header className="bg-slate-900 px-6 py-5 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-wide">BÁO GIÁ ĐẠI LÝ</h1>
                <p className="mt-1 text-sm text-slate-200">The Manson</p>
              </div>
              <div className="text-right text-xs text-amber-300">
                <div>CONFIDENTIAL</div>
                <div>{new Date(draft.createdAt).toLocaleDateString("vi-VN")}</div>
              </div>
            </div>
          </header>

          <div className="grid gap-4 border-b border-slate-200 px-6 py-4 text-sm md:grid-cols-2">
            <div>
              <div className="mb-1 font-semibold text-slate-700">Thông tin khách hàng</div>
              <div>Khách hàng: {draft.customerName || "-"}</div>
              <div>Số điện thoại: {draft.customerPhone || "-"}</div>
              <div>Ghi chú: {draft.note || "-"}</div>
            </div>
            <div>
              <div className="mb-1 font-semibold text-slate-700">Thông tin đại lý</div>
              <div>Đại lý: {draft.dealerName}</div>
              <div>Nhóm: {draft.dealerGroup}</div>
              <div>Bảng giá áp dụng: {draft.priceTier === "agent1" ? "Đại lý 1" : "Đại lý 2"}</div>
            </div>
          </div>

          <div className="px-6 py-4">
            <table className="w-full border border-slate-300 text-sm">
              <thead>
                <tr className="bg-slate-900/95 text-white">
                  <th className="border border-slate-300 p-2 text-left">Sản phẩm</th>
                  <th className="border border-slate-300 p-2 text-left">Biến thể</th>
                  <th className="border border-slate-300 p-2 text-right">SL</th>
                  <th className="border border-slate-300 p-2 text-right">Đơn giá</th>
                  <th className="border border-slate-300 p-2 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {draft.lines.map((l, i) => (
                  <tr key={`${l.variantId}-${i}`} className={i % 2 ? "bg-slate-50" : "bg-white"}>
                    <td className="border border-slate-300 p-2">{l.productName}</td>
                    <td className="border border-slate-300 p-2">{l.variantName}</td>
                    <td className="border border-slate-300 p-2 text-right">{l.quantity}</td>
                    <td className="border border-slate-300 p-2 text-right">{l.unitPrice.toLocaleString("vi-VN")}</td>
                    <td className="border border-slate-300 p-2 text-right">{(l.quantity * l.unitPrice).toLocaleString("vi-VN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 bg-amber-50 px-6 py-4 text-right">
            <div className="text-sm text-slate-600">Tổng cộng (VNĐ)</div>
            <div className="text-2xl font-bold text-amber-700">{total.toLocaleString("vi-VN")} đ</div>
          </div>
        </div>
      </section>
    </main>
  );
}
