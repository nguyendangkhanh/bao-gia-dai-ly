"use client";

import { useState } from "react";

export default function HotQuickTags({ tags }: { tags: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-3 top-1/2 z-40 -translate-y-1/2">
      <div className="flex flex-col items-end gap-2">
        {open && (
          <div className="rounded-xl border border-orange-200 bg-white/95 p-2 shadow-lg backdrop-blur">
            <div className="grid gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/products?search=${encodeURIComponent(tag)}#product-list`}
                  className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-100 text-center"
                >
                  {tag}
                </a>
              ))}
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
