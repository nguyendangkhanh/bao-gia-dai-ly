"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsSearchForm({ activeTags, productNames }: { activeTags: string[]; productNames: string[] }) {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState(activeTags);
  const [openSuggest, setOpenSuggest] = useState(false);
  const router = useRouter();

  const suggestions = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return [];
    return productNames.filter((name) => name.toLowerCase().includes(keyword)).slice(0, 8);
  }, [search, productNames]);

  const pushTags = (nextTags: string[]) => {
    const q = nextTags.length ? `?tags=${encodeURIComponent(nextTags.join("||"))}` : "";
    router.push(`/products${q}#product-list`);
  };

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    if (tags.some((t) => t.toLowerCase() === value.toLowerCase())) {
      setSearch("");
      setOpenSuggest(false);
      return;
    }
    const nextTags = [...tags, value];
    setTags(nextTags);
    setSearch("");
    setOpenSuggest(false);
    pushTags(nextTags);
  };

  const removeTag = (tag: string) => {
    const nextTags = tags.filter((t) => t !== tag);
    setTags(nextTags);
    pushTags(nextTags);
  };

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-3 shadow-lg space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-orange-50 border border-orange-200 px-2 py-1 text-xs font-semibold text-orange-700">
            {tag}
            <button type="button" className="rounded-full px-1 leading-none hover:bg-orange-100" onClick={() => removeTag(tag)}>×</button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpenSuggest(true);
          }}
          onFocus={() => setOpenSuggest(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(search);
            }
          }}
          placeholder="Tìm theo tên sản phẩm hoặc biến thể rồi nhấn Enter"
          className="tm-input pr-9"
          onBlur={() => setTimeout(() => setOpenSuggest(false), 120)}
        />

        {openSuggest && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-auto rounded-lg border border-orange-100 bg-white shadow-lg">
            {suggestions.map((name) => (
              <button
                key={name}
                type="button"
                className="block w-full border-b border-orange-50 px-3 py-2 text-left text-sm text-zinc-700 last:border-b-0 hover:bg-orange-50"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addTag(name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {search.trim() && (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 py-0.5 text-sm font-semibold text-zinc-500 hover:bg-zinc-100"
            onClick={() => setSearch("")}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
