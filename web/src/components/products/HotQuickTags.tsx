"use client";

import { useState } from "react";

export default function HotQuickTags({ tags }: { tags: string[] }) {
  const [open, setOpen] = useState(false);
  const [loadingTag, setLoadingTag] = useState<string | null>(null);

  return (
    <div className="fixed bottom-4 right-3 z-40 md:bottom-5 md:right-5">
      <div className="flex flex-col items-end gap-2">
        {open && (
          <div className="rounded-xl border border-orange-200 bg-white/95 p-2 shadow-lg backdrop-blur">
            <div className="grid gap-2">
              {tags.map((tag) => {
                const isLoading = loadingTag === tag;
                return (
                  <a
                    key={tag}
                    href={`/products?search=${encodeURIComponent(tag)}#product-list`}
                    onClick={() => setLoadingTag(tag)}
                    className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-100 text-center"
                    aria-disabled={!!loadingTag}
                  >
                    {isLoading ? "Đang tải..." : tag}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold shadow-lg"
        >
          HOT
        </button>
      </div>
    </div>
  );
}
