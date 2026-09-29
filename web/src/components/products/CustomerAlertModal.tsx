"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MANSON_SHOWROOMS, ShowroomBranch } from "@/types/customer-alert";

interface CustomerAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductName?: string;
}

const QUICK_TIME_PRESETS = ["Hôm nay", "Sáng mai", "Chiều mai", "Đang tới ngay"];
const QUICK_PRODUCT_TAGS = ["E3 Lite", "Foris", "Atum", "Bàn 1 động cơ", "Bàn 2 động cơ", "Không biết"];

export default function CustomerAlertModal({
  isOpen,
  onClose,
  defaultProductName = "",
}: CustomerAlertModalProps) {
  const [selectedBranch, setSelectedBranch] = useState<ShowroomBranch | null>(null);
  const [productName, setProductName] = useState(defaultProductName);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [expectedTime, setExpectedTime] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetForm = useCallback(() => {
    setSelectedBranch(null);
    setProductName(defaultProductName);
    setCustomerName("");
    setCustomerPhone("");
    setExpectedTime("");
    setErrorMsg("");
    setIsSuccess(false);
  }, [defaultProductName]);

  const handleClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Cleanup auto-close timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitting, handleClose]);

  if (!isOpen) return null;

  const isProductTagActive = (tag: string) =>
    productName
      .split(",")
      .map((p) => p.trim().toLowerCase())
      .includes(tag.toLowerCase());

  const toggleProductTag = (tag: string) => {
    setProductName((prev) => {
      const parts = prev
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      const isActive = parts.some((p) => p.toLowerCase() === tag.toLowerCase());
      const next = isActive
        ? parts.filter((p) => p.toLowerCase() !== tag.toLowerCase())
        : [...parts, tag];
      return next.join(", ");
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedBranch) {
      setErrorMsg("Vui lòng chọn một chi nhánh showroom Manson bên dưới.");
      return;
    }
    if (!productName.trim() || productName.trim().length < 2) {
      setErrorMsg("Vui lòng nhập sản phẩm khách xem.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/customer-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          showroomTitle: selectedBranch.title,
          showroomAddress: selectedBranch.description,
          productName: productName.trim(),
          customerName: customerName.trim() || undefined,
          customerPhone: customerPhone.trim() || undefined,
          expectedTime: expectedTime.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || "Không thể gửi báo khách lúc này. Vui lòng thử lại.");
        return;
      }

      setIsSuccess(true);
      // Auto close after 2.5s with cleanup protection
      timerRef.current = setTimeout(() => {
        handleClose();
      }, 2500);
    } catch {
      setErrorMsg("Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customer-alert-title"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => !isSubmitting && handleClose()}
      />

      {/* Modal / Bottom Sheet Card */}
      <div className="relative z-10 w-full max-w-xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl overflow-hidden border border-zinc-200">
        {/* Mobile Pull/Drag Indicator */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-zinc-300" />
        </div>

        {/* Header */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-orange-50 via-white to-orange-50/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 10s-.5-2-3-2-3 2-3 2v3h6v-3z" />
                <path d="M19 19a1.5 1.5 0 0 0 1.5-1.5v-1.5h-3v1.5A1.5 1.5 0 0 0 19 19z" />
              </svg>
            </div>
            <div>
              <h2 id="customer-alert-title" className="text-base sm:text-lg font-bold text-zinc-900 leading-tight">
                Báo Khách Tới Showroom
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Báo trước để nhân viên showroom Manson đón tiếp chu đáo
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition active:scale-95 disabled:opacity-50"
            aria-label="Đóng"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5 flex-1 space-y-4">
          {isSuccess ? (
            <div className="py-8 px-4 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Báo Khách Thành Công!</h3>
              <p className="text-sm text-zinc-600 max-w-sm mx-auto">
                Thông tin đã được chuyển tức thì tới nhóm hỗ trợ showroom Manson.
              </p>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-left text-xs sm:text-sm space-y-1.5 text-zinc-700 max-w-sm mx-auto">
                <p><span className="font-semibold text-zinc-900">Chi nhánh:</span> {selectedBranch?.title}</p>
                <p><span className="font-semibold text-zinc-900">Khách xem sản phẩm:</span> {productName}</p>
                {customerName && <p><span className="font-semibold text-zinc-900">Khách hàng:</span> {customerName} {customerPhone ? `(${customerPhone})` : ""}</p>}
                {expectedTime && <p><span className="font-semibold text-zinc-900">Dự kiến:</span> {expectedTime}</p>}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="mt-3 w-full max-w-xs rounded-xl bg-orange-600 py-2.5 text-sm font-semibold text-white shadow hover:bg-orange-700 transition"
              >
                Đóng thông báo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 flex items-start gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-red-500 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Showroom selector */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-2">
                  1. Chọn Chi Nhánh Khách Sẽ Tới <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MANSON_SHOWROOMS.map((showroom) => {
                    const isSelected = selectedBranch?.id === showroom.id;
                    return (
                      <button
                        key={showroom.id}
                        type="button"
                        onClick={() => {
                          setSelectedBranch(showroom);
                          if (errorMsg) setErrorMsg("");
                        }}
                        className={`flex flex-col text-left p-3 rounded-xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? "border-orange-500 bg-orange-50/70 ring-2 ring-orange-500/20 shadow-sm"
                            : "border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold text-xs sm:text-sm text-zinc-900 leading-snug">
                            {showroom.title}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded shrink-0 ${
                              showroom.city === "HCM"
                                ? "bg-sky-100 text-sky-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {showroom.city}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                          {showroom.description}
                        </p>
                        {isSelected && (
                          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-orange-600">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Đã chọn chi nhánh này
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product */}
              <div>
                <label htmlFor="product-name" className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1">
                  2. Khách Xem Sản Phẩm <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {QUICK_PRODUCT_TAGS.map((tag) => {
                    const isActive = isProductTagActive(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleProductTag(tag)}
                        className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border transition ${
                          isActive
                            ? "bg-orange-50 border-orange-400 text-orange-700 font-medium"
                            : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        {tag}
                        {isActive && <span className="text-orange-500 font-bold leading-none">×</span>}
                      </button>
                    );
                  })}
                </div>
                <input
                  id="product-name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="VD: Ghế Manson Vera, Iris..."
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  required
                />
              </div>

              {/* Customer info (Optional) */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-zinc-800 mb-1">
                  3. Thông Tin Khách Hàng <span className="text-xs font-normal text-zinc-500">(Nên có)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Tên khách (VD: Anh Tuấn)"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Số điện thoại (để showroom nhận diện)"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              {/* Expected Time (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="expected-time" className="block text-xs sm:text-sm font-semibold text-zinc-800">
                    4. Thời Gian Dự Kiến Khách Tới <span className="text-xs font-normal text-zinc-500">(Tùy chọn)</span>
                  </label>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {QUICK_TIME_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setExpectedTime(preset)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                        expectedTime === preset
                          ? "bg-orange-50 border-orange-400 text-orange-700 font-medium"
                          : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  id="expected-time"
                  type="text"
                  value={expectedTime}
                  onChange={(e) => setExpectedTime(e.target.value)}
                  placeholder="VD: 15h chiều nay, ngày mai..."
                  className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold text-base shadow-md flex items-center justify-center gap-2 transition disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Đang gửi thông tin...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      <span>Gửi Báo Khách Tới Showroom</span>
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[11px] text-zinc-400">
                  Thông báo sẽ được bot Telegram tự động gửi vào nhóm showroom Manson (-5290572248)
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
