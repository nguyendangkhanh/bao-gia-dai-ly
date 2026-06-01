"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuoteDraft } from "@/types/quotation";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
  sessionUser: {
    name: string;
    groupName: string;
    priceTier: "agent1" | "agent2";
  };
};

export default function QuotationBuilder({ products, sessionUser }: Props) {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [productId, setProductId] = useState<string>("");
  const [variantId, setVariantId] = useState<string>("");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [useCustomPrice, setUseCustomPrice] = useState(false);
  const [quantity, setQuantity] = useState<string>("1");
  const [lines, setLines] = useState<QuoteDraft["lines"]>([]);

  const selectedProduct = products.find((p) => String(p.id) === productId);
  const variants = selectedProduct?.variants || [];
  const selectedVariant = variants.find((v) => String(v.id) === variantId);
  const total = useMemo(() => lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0), [lines]);

  const addLine = () => {
    if (!selectedProduct || !selectedVariant) return;
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) return;

    const tierPrice = sessionUser.priceTier === "agent2" ? (selectedVariant.agentPrice2 || 0) : (selectedVariant.agentPrice1 || 0);
    const unitPrice = useCustomPrice ? Number(customPrice || 0) : tierPrice;

    setLines((prev) => [
      ...prev,
      {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        variantId: selectedVariant.id,
        variantName: selectedVariant.displayName || "",
        sku: selectedVariant.sku || "",
        unitPrice,
        quantity: qty,
      },
    ]);
  };

  const viewQuote = () => {
    const draft: QuoteDraft = {
      customerName,
      customerPhone,
      note,
      dealerName: sessionUser.name,
      dealerGroup: sessionUser.groupName,
      priceTier: sessionUser.priceTier,
      lines,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem("quoteDraft", JSON.stringify(draft));
    router.push("/quotation/print");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        <input placeholder="Tên khách hàng" className="rounded border px-3 py-2" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <input placeholder="Số điện thoại" className="rounded border px-3 py-2" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        <input placeholder="Ghi chú" className="rounded border px-3 py-2" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className="rounded border border-blue-900/20 bg-blue-50 p-3 text-sm text-blue-900">Đang áp dụng giá theo nhóm đại lý: <strong>{sessionUser.priceTier === "agent1" ? "Đại lý 1" : "Đại lý 2"}</strong></div>

      <div className="grid gap-3 md:grid-cols-6">
        <select className="rounded border px-3 py-2 md:col-span-2" value={productId} onChange={(e) => { setProductId(e.target.value); setVariantId(""); }}>
          <option value="">Chọn sản phẩm</option>
          {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select className="rounded border px-3 py-2 md:col-span-2" value={variantId} onChange={(e) => setVariantId(e.target.value)}>
          <option value="">Chọn biến thể</option>
          {variants.map((v) => <option key={v.id} value={v.id}>{v.displayName || v.sku || v.id}</option>)}
        </select>
        <label className="flex items-center gap-2 rounded border px-3 py-2 text-sm">
          <input type="checkbox" checked={useCustomPrice} onChange={(e) => setUseCustomPrice(e.target.checked)} /> Giá tùy chỉnh
        </label>
        <input className="rounded border px-3 py-2" type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>

      {useCustomPrice && (
        <input className="rounded border px-3 py-2" type="number" min={0} value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder="Nhập giá tùy chỉnh" />
      )}

      <button className="rounded bg-blue-900 px-4 py-2 text-white" onClick={addLine}>Thêm dòng báo giá</button>

      <div className="overflow-x-auto rounded border">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50"><tr><th className="p-2 text-left">Sản phẩm</th><th className="p-2 text-left">Biến thể</th><th className="p-2 text-right">SL</th><th className="p-2 text-right">Đơn giá</th><th className="p-2 text-right">Thành tiền</th></tr></thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={`${l.variantId}-${i}`} className="border-t">
                <td className="p-2">{l.productName}</td>
                <td className="p-2">{l.variantName}</td>
                <td className="p-2 text-right">{l.quantity}</td>
                <td className="p-2 text-right">{l.unitPrice.toLocaleString("vi-VN")}</td>
                <td className="p-2 text-right">{(l.quantity * l.unitPrice).toLocaleString("vi-VN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-semibold">Tổng cộng: {total.toLocaleString("vi-VN")} đ</div>
      <div className="flex justify-end">
        <button className="rounded bg-amber-600 px-4 py-2 text-white disabled:opacity-50" disabled={!lines.length} onClick={viewQuote}>Xem báo giá</button>
      </div>
    </div>
  );
}
