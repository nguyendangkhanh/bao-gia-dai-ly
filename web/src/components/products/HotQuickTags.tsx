"use client";

import { useMemo, useState } from "react";
import CustomerAlertModal from "./CustomerAlertModal";

type ContactType = "youtube" | "messenger" | "fanpage" | "zalo" | "call" | "store";
type ContactItem = { title: string; description: string; link: string; type: ContactType };

function DotIcon({ type }: { type: ContactType }) {
  const colorMap: Record<ContactType, string> = {
    youtube: "bg-red-500",
    messenger: "bg-blue-500",
    fanpage: "bg-indigo-500",
    zalo: "bg-cyan-500",
    call: "bg-emerald-500",
    store: "bg-orange-500",
  };
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${colorMap[type]}`} />;
}

export default function HotQuickTags(_: { tags: string[] }) {
  const [open, setOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1200);
    } catch {
      setCopiedKey(null);
    }
  };

  const items = useMemo<ContactItem[]>(() => {
    const zaloLink = "https://zalo.me/0986084004";
    return [
      { title: "Zalo", description: "Nhắn tin miễn phí 24/24", link: zaloLink, type: "zalo" },
      { title: "Quận 2 (Đỗ Ô Tô)", description: "80 Nguyễn Hoàng, An Phú, Quận 2, TP. Hồ Chí Minh", link: "https://maps.app.goo.gl/vxv7M3BaKRqngXWp8", type: "store" },
      { title: "Tân Phú (Đỗ Ô Tô)", description: "25 Phan Chu Trinh, Tân Thành, Tân Phú, TP. Hồ Chí Minh", link: "https://maps.app.goo.gl/jFVwy9CxxTcAJjQb6", type: "store" },
      { title: "Trung Văn (Đỗ Ô Tô)", description: "Số 8, khu BT4 - 3, Vinaconex 3, Trung Văn, Nam Từ Liêm, TP. Hà Nội", link: "https://maps.app.goo.gl/ym6VAq54Fw1aKDpM9", type: "store" },
      { title: "Thái Thịnh (Đỗ Ô Tô)", description: "196 Thái Thịnh, Đống Đa, TP. Hà Nội", link: "https://maps.app.goo.gl/Mfbh3KG9VS7uBZQj9", type: "store" },
    ];
  }, []);

  return (
    <>
      {/* Floating Action Buttons Group */}
      <div className="fixed right-4 bottom-20 z-30 flex flex-col items-center gap-3 md:right-4 md:bottom-[20%]">
        {/* Nút 1: Liên Hệ (nằm phía trên) */}
        <div className="relative">
          {open && (
            <>
              {/* Backdrop để đóng dropdown khi click ra ngoài */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />
              <div className="absolute right-0 bottom-full mb-3 z-50 w-72 max-w-[calc(100vw-2rem)] origin-bottom-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 focus:outline-none overflow-hidden">
                <div className="border-b border-orange-100 bg-orange-50/70 px-3.5 py-2.5">
                  <div className="text-xs font-bold text-orange-800 uppercase tracking-wider">Thông Tin Liên Hệ & Showroom</div>
                  <div className="text-[11px] text-zinc-500">Manson hỗ trợ 24/24</div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto px-1 py-1.5">
                  {items.map((item) => (
                    <div key={item.title} className="group flex w-full items-start gap-2 rounded-xl px-2.5 py-2 hover:bg-orange-50 transition">
                      <a
                        href={item.link}
                        target={item.link.startsWith("tel:") ? undefined : "_blank"}
                        rel={item.link.startsWith("tel:") ? undefined : "noopener noreferrer"}
                        className="flex min-w-0 flex-1 items-start gap-2 text-left"
                      >
                        <div className="pt-1"><DotIcon type={item.type} /></div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover:text-orange-700">{item.title}</div>
                          <div className="text-[11px] text-zinc-500 leading-relaxed">{item.description}</div>
                        </div>
                      </a>
                      {item.type === "store" && (
                        <button
                          type="button"
                          onClick={() => copyText(`store-${item.title}`, `${item.description}\n${item.link}`)}
                          className="shrink-0 rounded-lg border border-orange-200 bg-orange-50 px-2 py-1 text-[10px] font-semibold text-orange-700 hover:bg-orange-100 transition active:scale-95 cursor-pointer"
                        >
                          {copiedKey === `store-${item.title}` ? "Đã chép" : "Copy"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Liên Hệ"
            className="h-14 w-14 rounded-full bg-[#f97316] text-white shadow-lg flex flex-col items-center justify-center hover:bg-[#ea580c] active:scale-95 transition-all cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
              <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v10A2.5 2.5 0 0 1 19.5 17H8l-6 5V4.5Z" />
            </svg>
            <div className="mt-0.5 text-[9px] text-gray-100 font-medium">Liên Hệ</div>
          </button>
        </div>

        {/* Nút 2: Báo Khách (nằm ngay bên dưới nút Liên Hệ, giao diện tương đương) */}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setIsAlertModalOpen(true);
          }}
          aria-label="Báo Khách Tới Showroom"
          className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex flex-col items-center justify-center hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 10s-.5-2-3-2-3 2-3 2v3h6v-3z" />
            <path d="M19 19a1.5 1.5 0 0 0 1.5-1.5v-1.5h-3v1.5A1.5 1.5 0 0 0 19 19z" />
          </svg>
          <div className="mt-0.5 text-[9px] text-gray-100 font-medium">Báo Khách</div>
        </button>
      </div>

      {/* Modal Báo Khách Tới Showroom */}
      {isAlertModalOpen && (
        <CustomerAlertModal
          isOpen={isAlertModalOpen}
          onClose={() => setIsAlertModalOpen(false)}
        />
      )}
    </>
  );
}
