import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";
import {
  Breadcrumbs,
  Container,
  Cta,
  Eyebrow,
  JsonLd,
  Pill,
  Section,
  TakeoverLine,
} from "@/components/ui";
import {
  articles,
  getArticle,
  getReadingTime,
  getRelatedArticles,
} from "@/content/news";
import { site } from "@/content/site";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    image: article.featuredImage,
    type: "article",
    publishedTime: article.date,
    keywords: article.tags,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 3);
  const readingTime = getReadingTime(article);

  const trail = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: article.title, href: `/news/${article.slug}` },
  ];

  const shareUrl = new URL(`/news/${article.slug}`, site.url).toString();
  const shareLinks = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${shareUrl}`)}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <>
      <JsonLd data={[articleSchema(article), breadcrumbSchema(trail)]} />

      {/* --- Header ------------------------------------------------------ */}
      <section className="relative isolate overflow-hidden bg-pitch-950 pb-14 pt-32 sm:pt-40">
        <div className="takeover-grid absolute inset-0 -z-10 opacity-50" />
        <Container width="narrow">
          <Breadcrumbs trail={trail} />
          <Eyebrow className="mt-7">{article.category}</Eyebrow>
          <h1 className="display mt-5 text-4xl leading-[0.95] text-cream sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-cream/70">{article.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.14em] text-cream/40">
            <span className="text-cream/60">{article.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{readingTime} min read</span>
          </div>
        </Container>
        <TakeoverLine className="absolute inset-x-0 bottom-0" />
      </section>

      {/* --- Featured image ---------------------------------------------- */}
      <div className="bg-pitch-950">
        <Container>
          <figure className="relative aspect-16/9 overflow-hidden rounded-2xl border border-cream/10">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1150px"
              className="object-cover"
            />
          </figure>
        </Container>
      </div>

      {/* --- Body --------------------------------------------------------- */}
      <Section className="bg-pitch-950">
        <Container width="narrow">
          <div className="space-y-6">
            {article.body.map((block) =>
              block.startsWith("## ") ? (
                <h2
                  key={block}
                  className="display pt-6 text-2xl text-cream sm:text-3xl"
                >
                  {block.slice(3)}
                </h2>
              ) : block.startsWith("⚠️") ? (
                <p
                  key={block}
                  className="rounded-xl border border-gold-400/30 bg-gold-400/[0.07] px-5 py-4 text-sm leading-relaxed text-gold-200"
                >
                  {block}
                </p>
              ) : (
                <p
                  key={block}
                  className="text-lg leading-[1.75] text-cream/78"
                >
                  {block}
                </p>
              ),
            )}
          </div>

          {/* Tags */}
          {article.tags.length > 0 ? (
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-cream/10 pt-8">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Pill tone="neutral">{tag}</Pill>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Share (§32) */}
          <div className="mt-10">
            <h2 className="eyebrow text-gold-500">Share this story</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {shareLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-cream/18 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cream/65 transition-colors hover:border-gold-400/60 hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* --- Related ------------------------------------------------------ */}
      {related.length > 0 ? (
        <Section className="border-t border-cream/8 bg-pitch-900/30">
          <Container>
            <h2 className="display text-3xl text-cream sm:text-4xl">Related stories</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80}>
                  <ArticleCard article={item} />
                </Reveal>
              ))}
            </div>
            <div className="mt-12">
              <Cta href="/news" variant="outline">
                More from Takeover FC
              </Cta>
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
