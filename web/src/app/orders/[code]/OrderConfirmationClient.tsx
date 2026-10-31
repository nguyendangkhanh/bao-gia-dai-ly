"use client";

function formatVnd(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function OrderConfirmationClient({
  code,
  dealerName,
}: {
  code: string;
  dealerName: string;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-green-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-zinc-800">Đặt hàng thành công!</h1>
          <p className="text-zinc-500 mt-1">Đơn hàng của bạn đã được ghi nhận</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Mã đơn hàng:</span>
            <span className="font-semibold text-zinc-800">{code}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Đại lý:</span>
            <span className="font-medium text-zinc-700">{dealerName}</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 space-y-1">
          <p className="font-semibold">Thông tin thanh toán và vận chuyển</p>
          <p>Phí vận chuyển và lắp đặt (nếu có) sẽ được nhân viên thông báo sau khi xác nhận đơn hàng.</p>
          <p>Trạng thái đơn hàng sẽ được cập nhật qua Zalo.</p>
        </div>

        <div className="flex gap-3">
          <a
            href="/products"
            className="flex-1 text-center border border-orange-200 text-orange-600 py-2.5 rounded-lg font-medium hover:bg-orange-50 transition-colors text-sm"
          >
            Tiếp tục mua
          </a>
        </div>
      </div>
    </div>
  );
}
