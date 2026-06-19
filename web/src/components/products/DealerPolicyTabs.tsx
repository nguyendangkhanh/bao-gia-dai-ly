"use client";

import { useState } from "react";

export default function DealerPolicyTabs() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cooperation" | "policy" | "payment">("cooperation");

  const tabs = [
    { id: "cooperation", label: "🤝 Hợp tác & Vận hành", color: "from-[#ff6b35] to-[#f97316]" },
    { id: "policy", label: "📜 Chính sách Đại lý", color: "from-[#f97316] to-[#e63946]" },
    // { id: "payment", label: "💳 Trả góp & Thanh toán", color: "from-[#e63946] to-[#ff6b35]" },
  ] as const;

  const banks = [
    "Techcombank", "Vietcombank", "Sacombank", "VPBank", "HSBC",
    "BIDV", "Citibank", "VIB", "Shinhan Bank", "TPBank",
    "MB Bank", "ACB", "MSB", "Home Credit", "FE Credit",
    "HDBank", "OCB", "Eximbank", "SeABank", "Nam A Bank",
    "VietCapital Bank", "Mcredit", "Kienlong Bank", "SHB", "LPBank"
  ];

  return (
    <div className="w-full">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-5 py-4 rounded-xl border border-orange-100 bg-orange-50/50 hover:bg-orange-50 font-semibold text-orange-800 transition shadow-sm"
      >
        <span className="flex items-center gap-2 text-base md:text-lg">
          📖 <span>Hướng dẫn hợp tác & Chính sách Đại lý (Xem chi tiết)</span>
        </span>
        <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* Slide / Tabs content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl border border-orange-100 bg-white p-4 md:p-6 shadow-md space-y-6">
            
            {/* Tabs Selector */}
            <div className="flex flex-wrap gap-2 border-b border-zinc-100 pb-3">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-md shadow-orange-100`
                        : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Cooperation */}
            {activeTab === "cooperation" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                
                {/* section 1 */}
                <div className="p-5 rounded-2xl bg-orange-50/30 border border-orange-100/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2 mb-4">
                      <span>✨</span> Ưu Điểm Khi Hợp Tác
                    </h3>
                    <ul className="space-y-3.5 text-sm text-zinc-700 font-medium">
                      <li className="flex items-start gap-2.5">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Không cần bỏ vốn để nhập hàng - Không sợ tồn kho - Không giới hạn số lượng nhập tối thiểu.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Có chi nhánh tại Hà Nội và Tp. Hồ Chí Minh tiện giao nhận và trải nghiệm.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Giá đại lý cạnh tranh - tốt nhất trên thị trường, thường xuyên cập nhật theo thời giá để mang lại lợi nhuận tối đa.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* section 2 */}
                <div className="p-5 rounded-2xl bg-orange-50/30 border border-orange-100/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2 mb-4">
                      <span>⚡</span> Quy Trình Vận Hành
                    </h3>
                    <ul className="space-y-3.5 text-sm text-zinc-700 font-medium">
                      <li className="flex items-start gap-2.5">
                        <span className="bg-orange-100 text-orange-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</span>
                        <span>Tiếp nhận đơn từ đại lý bao gồm: tên sản phẩm, số lượng, số tiền cần thu hộ (COD), số điện thoại và địa chỉ khách.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="bg-orange-100 text-orange-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</span>
                        <span>Xử lý đơn, đóng gói và vận chuyển trực tiếp theo yêu cầu của đại lý trên <span className="font-bold text-orange-700">Toàn Quốc</span>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="bg-orange-100 text-orange-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</span>
                        <span>Sau khi giao dịch thành công, hoàn tiền thu hộ/lợi nhuận vào STK của đại lý trong vòng <span className="font-bold text-orange-700">1 ngày làm việc</span>.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* section 3 */}
                <div className="p-5 rounded-2xl bg-orange-50/30 border border-orange-100/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2 mb-4">
                      <span>🛡️</span> Thông Tin Bảo Hành
                    </h3>
                    <ul className="space-y-3.5 text-sm text-zinc-700 font-medium">
                      <li className="flex items-start gap-2.5">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Sản phẩm được bảo hành uy tín nếu nguyên nhân lỗi từ nhà sản xuất (Lỗi bộ phận, tính năng ghế).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Sau khi đơn hàng hoàn tất, khách hàng của đại lý sẽ được kích hoạt hệ thống bảo hành điện tử tự động.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Đại lý và khách hàng tra cứu thông tin bảo hành điện tử dễ dàng bằng SĐT tại website.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5">
                    <a
                      href="https://baohanh.themanson.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition"
                    >
                      Tra cứu bảo hành ↗
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Policy */}
            {activeTab === "policy" && (
              <div className="space-y-6 animate-fade-in text-zinc-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Freeship rule */}
                  <div className="p-5 rounded-2xl bg-orange-50/30 border border-orange-100/50 space-y-4">
                    <h3 className="text-base font-bold text-orange-800 flex items-center gap-1.5 border-b border-orange-100 pb-2">
                      🚚 Chính Sách Miễn Phí Vận Chuyển
                    </h3>
                    <p className="text-sm font-medium">Miễn phí vận chuyển nội thành Hà Nội & TP. Hồ Chí Minh khi đạt một trong các tiêu chí:</p>
                    <ul className="space-y-2.5 text-sm font-medium pl-2">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Nhập tối thiểu <span className="font-bold text-orange-700">20 sản phẩm</span> thuộc các thương hiệu/mẫu: <span className="font-semibold text-zinc-800">Sihoo / Herman Miller / Manson Butterfly Wing / Vera / Iris / Atum / E3 Pro</span>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Nhập tối thiểu <span className="font-bold text-orange-700">30 sản phẩm</span> thuộc thương hiệu <span className="font-semibold text-zinc-800">Manson</span>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold mt-0.5">•</span>
                        <span>Nhập ghép các thương hiệu tối thiểu <span className="font-bold text-orange-700">25 sản phẩm</span>.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Payment & VAT rule */}
                  <div className="p-5 rounded-2xl bg-orange-50/30 border border-orange-100/50 space-y-4">
                    <h3 className="text-base font-bold text-orange-800 flex items-center gap-1.5 border-b border-orange-100 pb-2">
                      💰 Thanh Toán & Hóa Đơn VAT
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">💸</span>
                        <div>
                          <h4 className="font-bold text-zinc-800 text-sm">Phương thức thanh toán</h4>
                          <p className="text-sm font-medium text-zinc-600 mt-0.5">Thanh toán tiền hàng khi xuất kho, không áp dụng công nợ đại lý.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 border border-orange-200/50">
                        <span className="text-2xl mt-0.5">📅</span>
                        <div>
                          <h4 className="font-bold text-orange-800 text-sm">Chính sách xuất hóa đơn VAT</h4>
                          <p className="text-sm font-semibold text-orange-700 mt-1">Xuất hóa đơn VAT tối đa trong vòng 3 ngày kể từ khi đơn hàng hoàn tất.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other policies */}
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/50 space-y-4">
                  <h3 className="text-base font-bold text-zinc-800 flex items-center gap-1.5 border-b border-zinc-200 pb-2">
                    📋 Quy Định Vận Chuyển, Liên Tỉnh & Giá Bán
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-400 mt-0.5">▪</span>
                        <span><span className="font-semibold text-zinc-800">Vận chuyển liên kho HN-HCM:</span> Hàng được chuyển trực tiếp từ kho HCM đến tay khách HN và ngược lại. Tiền lãi hoàn lại cho đại lý trong vòng 01 ngày làm việc sau khi hoàn tất đơn.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-400 mt-0.5">▪</span>
                        <span><span className="font-semibold text-zinc-800">Trải nghiệm sản phẩm:</span> Đại lý có thể gửi địa chỉ showroom Manson để khách của mình qua trải nghiệm sản phẩm trực tiếp.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-400 mt-0.5">▪</span>
                        <span><span className="font-semibold text-zinc-800">Cước phí giao hàng:</span> Cước tỉnh theo giá GHTK hoặc Viettel Post. Giao xe khách yêu cầu thanh toán trước tiền hàng. Phí ship nội thành HN/HCM theo Heyu, Ahamove, Lalamove (cộng phụ phí cồng kềnh nếu có).</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-400 mt-0.5">▪</span>
                        <span><span className="font-semibold text-zinc-800">Phí lắp đặt tại nhà:</span> Nội thành Hà Nội và TP. Hồ Chí Minh thu thêm 30.000đ / 01 sản phẩm.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-zinc-400 mt-0.5">▪</span>
                        <span><span className="font-semibold text-zinc-800">Quy định bán hàng:</span> Đại lý cam kết không tự ý bán phá giá sản phẩm. Ưu tiên miễn phí vận chuyển/lắp đặt hoặc tặng kèm "Kê chân Manson FR08 / FR09" khi bán ghế cho khách lẻ.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Payment */}
            {activeTab === "payment" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                
                {/* Column 1 & 2: Installment logic & banks */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Credit Installment */}
                  <div className="p-5 rounded-2xl bg-orange-50/30 border border-orange-100/50 space-y-4">
                    <h3 className="text-base font-bold text-orange-800 flex items-center gap-1.5">
                      💳 Thanh Toán Tín Dụng & Trả Góp 0%
                    </h3>
                    <div className="space-y-2.5 text-sm font-medium text-zinc-700">
                      <p>Hỗ trợ khách hàng của đại lý thanh toán bằng thẻ tín dụng hoặc chuyển đổi trả góp lãi suất 0%.</p>
                      <div className="p-4 rounded-xl bg-orange-50 border border-orange-200/50">
                        <p className="font-bold text-orange-900 text-xs uppercase tracking-wide">Công thức tính số tiền trả góp khách thanh toán:</p>
                        <p className="font-extrabold text-orange-700 text-sm md:text-base mt-1.5">
                          Tổng số tiền = Giá trị đơn hàng + Phí chu kỳ trả góp + (1.9% ~ 2.5%)
                        </p>
                      </div>
                      <div className="mt-4 pt-1">
                        <a
                          href="https://tragop.themanson.vn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition"
                        >
                          🌐 Tra cứu hạn mức & biểu phí trả góp ↗
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Mapped Bank Network */}
                  <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/50 space-y-3.5">
                    <h4 className="text-sm font-bold text-zinc-800 uppercase tracking-wide border-b border-zinc-200 pb-2">
                      🏦 Mạng Lưới Ngân Hàng Liên Kết Trả Góp
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {banks.map((bank) => (
                        <span
                          key={bank}
                          className="px-2.5 py-1.5 rounded-lg border border-zinc-200/70 bg-white text-xs font-semibold text-zinc-700 hover:border-orange-200 hover:text-orange-700 transition"
                        >
                          {bank}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 3: Contact & Showrooms */}
                <div className="p-5 rounded-2xl bg-[#ff6b35]/5 border border-[#ff6b35]/20 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="border-b border-[#ff6b35]/10 pb-3">
                      <h3 className="text-lg font-black text-orange-600 tracking-wide uppercase">The Manson</h3>
                      <p className="text-xs font-semibold italic text-orange-800/80">The heartbeat of chair</p>
                    </div>

                    <div className="space-y-3.5 text-xs font-semibold text-zinc-700">
                      <div>
                        <h4 className="text-zinc-900 font-bold mb-1 flex items-center gap-1.5">
                          📍 Showroom Hà Nội
                        </h4>
                        <p className="pl-5 text-zinc-600 leading-relaxed font-medium">Số 8, khu BT4 - 3, KDT Vinaconex 3, phường Trung Văn, quận Nam Từ Liêm.</p>
                      </div>

                      <div>
                        <h4 className="text-zinc-900 font-bold mb-1 flex items-center gap-1.5">
                          📍 Showroom Tân Phú (HCM)
                        </h4>
                        <p className="pl-5 text-zinc-600 leading-relaxed font-medium">25 Phan Chu Trinh, phường Tân Thành, quận Tân Phú.</p>
                      </div>

                      <div>
                        <h4 className="text-zinc-900 font-bold mb-1 flex items-center gap-1.5">
                          📍 Showroom Quận 2 (HCM)
                        </h4>
                        <p className="pl-5 text-zinc-600 leading-relaxed font-medium">80 Nguyễn Hoàng, phường An Phú, Quận 2.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#ff6b35]/10">
                    <a
                      href="https://themanson.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-orange-100 hover:border-orange-300 font-bold text-xs text-orange-900 transition"
                    >
                      <span>🌐 Website: themanson.vn</span>
                      <span>↗</span>
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-orange-100 hover:border-orange-300 font-bold text-xs text-orange-900 transition"
                    >
                      <span>👥 Fanpage: The Manson</span>
                      <span>↗</span>
                    </a>
                    <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs">
                      <span>📞 Liên hệ: 1900 99 88 36</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
