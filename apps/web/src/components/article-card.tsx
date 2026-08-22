import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

/** News card — image, category, headline, date, excerpt (§18). */
export function ArticleCard({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  return (
    <article className="group h-full">
      <Link href={`/news/${article.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-16/10 overflow-hidden rounded-xl border border-cream/10">
          <Image
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-pitch-950/70 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full border border-gold-400/40 bg-pitch-950/85 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-gold-300 backdrop-blur-sm">
            {article.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <time
            dateTime={article.date}
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-cream/40"
          >
            {formatDate(article.date)}
          </time>
          <h3 className="display mt-3 text-xl leading-[1.05] text-cream transition-colors duration-300 group-hover:text-gold-300 sm:text-2xl">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream/55">
            {article.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/45 transition-colors group-hover:text-gold-300">
            Read story
            <svg aria-hidden viewBox="0 0 12 10" className="h-2.5 w-3">
              <path
                d="M1 5h9M6.5 1L10.5 5 6.5 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
