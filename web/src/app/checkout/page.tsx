"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { resolveImageUrl } from "@/lib/image-url";
import { CheckoutData } from "@/types/cart";

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

const HCM_HN_CITIES = [
  "hồ chí minh",
  "ho chi minh",
  "hcm",
  "tp.hcm",
  "tp hcm",
  "hà nội",
  "ha noi",
  "hn",
];

function isHcmOrHn(city: string) {
  return HCM_HN_CITIES.some((c) => city.toLowerCase().includes(c));
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, dealerTotal, retailTotal, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const [requiresInstallation, setRequiresInstallation] = useState(false);
  const [installationNotes, setInstallationNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"SEPAY" | "QR" | "CASH">(
    "SEPAY"
  );

  const [vatRequired, setVatRequired] = useState(false);
  const [vatCompanyName, setVatCompanyName] = useState("");
  const [vatTaxCode, setVatTaxCode] = useState("");
  const [vatAddress, setVatAddress] = useState("");
  const [vatEmail, setVatEmail] = useState("");

  const [notes, setNotes] = useState("");

  const showInstallation = isHcmOrHn(city);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Giỏ hàng trống</p>
          <a
            href="/products"
            className="text-orange-500 hover:underline"
          >
            Quay lại sản phẩm
          </a>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setSubmitting(true);
    setError("");

    const data: CheckoutData = {
      customer: { name: name.trim(), phone: phone.trim(), email: email.trim() || undefined },
      shippingAddress: {
        address: address.trim(),
        ward: ward.trim(),
        district: district.trim(),
        city: city.trim(),
      },
      requiresInstallation,
      installationNotes: installationNotes.trim() || undefined,
      paymentMethod,
      vat: vatRequired
        ? {
            required: true,
            companyName: vatCompanyName.trim(),
            taxCode: vatTaxCode.trim(),
            address: vatAddress.trim(),
            email: vatEmail.trim(),
          }
        : undefined,
      notes: notes.trim() || undefined,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          lineItems: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            retailPrice: item.retailPrice,
            dealerPrice: item.dealerPrice,
          })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Lỗi tạo đơn" }));
        throw new Error(err.message || "Lỗi tạo đơn hàng");
      }

      const result = await res.json();
      clear();
      router.push(`/orders/${result.order?.code || result.orderCode || "success"}`);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Đặt hàng</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order summary */}
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold mb-3">Sản phẩm</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.variantId} className="flex items-center gap-3 text-sm">
                  {item.imageUrl && (
                    <img
                      src={resolveImageUrl(item.imageUrl)}
                      alt=""
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{item.productName} - {item.variantName}</p>
                  </div>
                  <span className="text-zinc-500">x{item.quantity}</span>
                  <span className="font-medium">{formatVnd(item.dealerPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between">
              <span className="text-zinc-500 text-sm line-through">{formatVnd(retailTotal)}</span>
              <span className="font-semibold text-orange-600">{formatVnd(dealerTotal)}</span>
            </div>
          </section>

          {/* Customer info */}
          <section className="bg-white rounded-lg p-4 shadow-sm space-y-3">
            <h2 className="font-semibold">Thông tin khách hàng</h2>
            <input
              type="text"
              placeholder="Họ tên *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="tel"
              placeholder="Số điện thoại *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="email"
              placeholder="Email (không bắt buộc)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </section>

          {/* Shipping address */}
          <section className="bg-white rounded-lg p-4 shadow-sm space-y-3">
            <h2 className="font-semibold">Địa chỉ giao hàng</h2>
            <input
              type="text"
              placeholder="Địa chỉ *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Phường/Xã"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Quận/Huyện"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Tỉnh/Thành *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </section>

          {/* Installation (HCM/HN only) */}
          {showInstallation && (
            <section className="bg-white rounded-lg p-4 shadow-sm space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={requiresInstallation}
                  onChange={(e) => setRequiresInstallation(e.target.checked)}
                  className="rounded"
                />
                <span className="font-semibold">Cần lắp đặt</span>
              </label>
              {requiresInstallation && (
                <textarea
                  placeholder="Ghi chú lắp đặt (tầng, thời gian...)"
                  value={installationNotes}
                  onChange={(e) => setInstallationNotes(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  rows={2}
                />
              )}
            </section>
          )}

          {/* Payment */}
          <section className="bg-white rounded-lg p-4 shadow-sm space-y-3">
            <h2 className="font-semibold">Phương thức thanh toán</h2>
            <div className="space-y-2">
              {[
                { value: "SEPAY" as const, label: "Chuyển khoản qua SePay" },
                { value: "QR" as const, label: "Chuyển khoản QR" },
                { value: "CASH" as const, label: "Tiền mặt (COD)" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={() => setPaymentMethod(opt.value)}
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* VAT */}
          <section className="bg-white rounded-lg p-4 shadow-sm space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={vatRequired}
                onChange={(e) => setVatRequired(e.target.checked)}
                className="rounded"
              />
              <span className="font-semibold">Xuất VAT</span>
            </label>
            {vatRequired && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tên công ty"
                  value={vatCompanyName}
                  onChange={(e) => setVatCompanyName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Mã số thuế"
                  value={vatTaxCode}
                  onChange={(e) => setVatTaxCode(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Địa chỉ công ty"
                  value={vatAddress}
                  onChange={(e) => setVatAddress(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email nhận hóa đơn"
                  value={vatEmail}
                  onChange={(e) => setVatEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            )}
          </section>

          {/* Notes */}
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <textarea
              placeholder="Ghi chú đơn hàng"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              rows={2}
            />
          </section>

          <p className="text-xs text-zinc-400 text-center">
            Phí vận chuyển và lắp đặt sẽ được thông báo sau khi xác nhận đơn
          </p>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {submitting ? "Đang xử lý..." : `Xác nhận đặt hàng — ${formatVnd(dealerTotal)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
