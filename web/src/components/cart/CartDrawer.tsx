"use client";

import { useCart } from "./CartProvider";
import { resolveImageUrl } from "@/lib/image-url";
import Link from "next/link";

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    dealerTotal,
    retailTotal,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            Giỏ hàng ({items.length} sản phẩm)
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-zinc-100 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">
              Giỏ hàng trống
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-3 border-b pb-3"
              >
                {item.imageUrl && (
                  <img
                    src={resolveImageUrl(item.imageUrl)}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.productName}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {item.variantName}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs line-through text-zinc-400">
                      {formatVnd(item.retailPrice)}
                    </span>
                    <span className="text-sm font-semibold text-orange-600">
                      {formatVnd(item.dealerPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded border text-sm hover:bg-zinc-50"
                    >
                      -
                    </button>
                    <span className="text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded border text-sm hover:bg-zinc-50"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="ml-auto text-xs text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Giá niêm yết:</span>
              <span className="line-through text-zinc-400">
                {formatVnd(retailTotal)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Tổng cộng:</span>
              <span className="text-orange-600">{formatVnd(dealerTotal)}</span>
            </div>
            <p className="text-xs text-zinc-400">
              Phí vận chuyển và lắp đặt sẽ được thông báo sau
            </p>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Đặt hàng
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
