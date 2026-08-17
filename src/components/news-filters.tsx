"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "@/components/article-card";
import type { Article } from "@/lib/types";
import { cn } from "@/lib/utils";

const ALL = "All";

/** Newsroom category filter (§31). */
export function NewsFilters({
  articles,
  categories,
}: {
  articles: Article[];
  categories: string[];
}) {
  const [category, setCategory] = useState(ALL);

  const filtered = useMemo(
    () => (category === ALL ? articles : articles.filter((a) => a.category === category)),
    [articles, category],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="News categories"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        {[ALL, ...categories].map((item) => {
          const selected = category === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(item)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.14em] transition-colors",
                selected
                  ? "border-gold-400 bg-gold-400 text-pitch-950"
                  : "border-cream/18 text-cream/60 hover:border-cream/40 hover:text-cream",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-cream/45">
        {filtered.length} {filtered.length === 1 ? "story" : "stories"}
      </p>

      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, index) => (
          <ArticleCard key={article.slug} article={article} priority={index < 3} />
        ))}
      </div>
    </div>
  );
}
