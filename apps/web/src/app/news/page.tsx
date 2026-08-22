import Image from "next/image";
import Link from "next/link";

import { NewsFilters } from "@/components/news-filters";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, JsonLd, Section } from "@/components/ui";
import { getActiveCategories, getArticles } from "@/content/news";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const trail = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
];

export const metadata = pageMetadata({
  title: "Newsroom",
  description:
    "Official news from Takeover Creatives FC — club announcements, match reports, player stories, community coverage, academy updates and partnership news from Kampala.",
  path: "/news",
  keywords: ["Takeover FC news", "Kampala football news", "youth football Uganda news"],
});

export default function NewsPage() {
  const articles = getArticles();
  const categories = getActiveCategories();
  const [lead, ...rest] = articles;

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        eyebrow="Newsroom"
        title="The club's own record."
        trail={trail}
        intro={
          <p>
            Takeover FC&apos;s official media centre — announcements, match
            coverage, player stories and the community work behind the football.
          </p>
        }
      />

      {/* Lead story */}
      {lead ? (
        <Section spacing="tight" className="bg-pitch-950">
          <Container>
            <Reveal>
              <Link href={`/news/${lead.slug}`} className="group block">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
                  <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-cream/10">
                    <Image
                      src={lead.featuredImage}
                      alt={lead.featuredImageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-pitch-950/60 to-transparent" />
                  </div>

                  <div>
                    <Eyebrow>{lead.category}</Eyebrow>
                    <h2 className="display mt-5 text-4xl leading-[0.95] text-cream transition-colors duration-300 group-hover:text-gold-300 sm:text-5xl">
                      {lead.title}
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-cream/65">
                      {lead.excerpt}
                    </p>
                    <p className="mt-6 text-xs uppercase tracking-[0.16em] text-cream/40">
                      {lead.author} · <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* All stories, filterable */}
      <Section className="border-t border-cream/8 bg-pitch-950">
        <Container>
          <NewsFilters articles={rest.length > 0 ? rest : articles} categories={categories} />
        </Container>
      </Section>
    </>
  );
}
