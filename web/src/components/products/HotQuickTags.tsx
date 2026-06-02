"use client";

import { useMemo, useState } from "react";

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
    <div className="fixed right-6 bottom-28 z-20 text-right md:bottom-[25%] md:right-3">
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="fixed right-6 bottom-[140px] h-14 w-14 rounded-full bg-[#f97316] text-white shadow-lg flex flex-col items-center justify-center md:right-3 md:bottom-[25%]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v10A2.5 2.5 0 0 1 19.5 17H8l-6 5V4.5Z" />
          </svg>
          <div className="mt-1 text-[9px] text-gray-100">Liên Hệ</div>
        </button>

        {open && (
          <div className="absolute right-0 bottom-[74px] w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="max-h-[60vh] overflow-y-auto px-1 py-1">
              {items.map((item) => (
                <div key={item.title} className="group flex w-full items-start gap-2 rounded-md px-3 py-2 hover:bg-orange-50">
                  <a
                    href={item.link}
                    target={item.link.startsWith("tel:") ? undefined : "_blank"}
                    rel={item.link.startsWith("tel:") ? undefined : "noopener noreferrer"}
                    className="flex min-w-0 flex-1 items-start gap-2 text-left"
                  >
                    <div className="pt-1"><DotIcon type={item.type} /></div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-800 group-hover:text-orange-700">{item.title}</div>
                      <div className="text-xs text-zinc-500">{item.description}</div>
                    </div>
                  </a>
                  {item.type === "store" && (
                    <button
                      type="button"
                      onClick={() => copyText(`store-${item.title}`, `${item.description}\n${item.link}`)}
                      className="shrink-0 rounded border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700 hover:bg-orange-100"
                    >
                      {copiedKey === `store-${item.title}` ? "Đã copy" : "Copy"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
