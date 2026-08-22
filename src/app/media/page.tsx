import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";
import { albums, brandGuidelines, mediaAssets, mediaFacts } from "@/content/media";
import { getArticles } from "@/content/news";
import { contact, site } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const trail = [
  { label: "Home", href: "/" },
  { label: "Media", href: "/media" },
];

export const metadata = pageMetadata({
  title: "Media Centre",
  description:
    "Official Takeover Creatives FC media centre — club facts, crest and identity assets, photography, press releases and media contacts for journalists covering the club.",
  path: "/media",
  keywords: ["Takeover FC media kit", "football club press Uganda"],
});

export default function MediaPage() {
  const announcements = getArticles()
    .filter((article) => article.category === "Club News" || article.category === "Partnerships")
    .slice(0, 4);

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        eyebrow="Media Centre"
        title="Everything a journalist needs."
        trail={trail}
        intro={
          <p>
            Official club information, identity assets, photography and contacts.
            If something you need is missing, email the club and we will supply it.
          </p>
        }
      />

      {/* Club facts */}
      <Section className="bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Club Facts" title="The official record." />
          </Reveal>

          <dl className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
            {mediaFacts.map((fact, index) => (
              <Reveal key={fact.label} delay={index * 40} as="div">
                <div className="grid gap-2 py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8">
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/40">
                    {fact.label}
                  </dt>
                  <dd className="text-base text-cream">{fact.value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Media kit */}
      <Section id="media-kit" className="border-y border-cream/8 bg-pitch-900/30">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Media Kit"
                title="Club identity assets."
                intro={
                  <p>
                    The crest is the club&apos;s primary identity asset. Use it as
                    supplied, and follow the usage rules below so the mark stays
                    consistent wherever it appears.
                  </p>
                }
              />

              <ul className="mt-10 space-y-3">
                {mediaAssets.map((asset) => (
                  <li key={asset.title}>
                    <a
                      href={asset.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 rounded-xl border border-cream/12 bg-pitch-900/60 p-5 transition-colors hover:border-gold-400/45"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-cream">
                          {asset.title}
                        </span>
                        <span className="mt-1 block text-xs text-cream/50">
                          {asset.description}
                        </span>
                      </span>
                      <span className="shrink-0 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-gold-400">
                        {asset.format}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <h3 className="eyebrow text-gold-500">Usage rules</h3>
                <ul className="mt-5 space-y-3">
                  {brandGuidelines.map((rule) => (
                    <li key={rule} className="flex gap-3 text-sm leading-relaxed text-cream/65">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400"
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex aspect-square items-center justify-center rounded-2xl border border-cream/12 bg-linear-to-b from-emerald-900 to-pitch-950 p-14">
                <Image
                  src="/logo.png"
                  alt={`${site.name} club crest`}
                  width={332}
                  height={420}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { name: "Emerald Green", hex: "#083018" },
                  { name: "Pyramid Gold", hex: "#A88838" },
                  { name: "Cream", hex: "#F7F2E6" },
                ].map((swatch) => (
                  <div key={swatch.hex} className="rounded-lg border border-cream/12 p-3">
                    <div
                      className="h-10 w-full rounded"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <p className="mt-2.5 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-cream/70">
                      {swatch.name}
                    </p>
                    <p className="mt-0.5 text-[0.625rem] text-cream/40">{swatch.hex}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Photography */}
      <Section className="bg-pitch-950">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Official Photography"
                title="Approved club images."
                intro={
                  <p>
                    Curated albums of official club photography. Contact the media
                    inbox for high-resolution files and permission to publish.
                  </p>
                }
                className="max-w-xl"
              />
              <Cta href="/gallery" variant="outline">
                Full gallery
              </Cta>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {albums.map((album, index) => (
              <Reveal key={album.slug} delay={index * 70}>
                <Link
                  href={`/gallery#${album.slug}`}
                  className="group relative block aspect-4/5 overflow-hidden rounded-xl border border-cream/10"
                >
                  <Image
                    src={album.cover}
                    alt={album.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-pitch-950 via-pitch-950/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4">
                    <h3 className="display text-xl text-cream">{album.title}</h3>
                    <p className="mt-1 text-xs text-cream/50">
                      {album.photos.length} photographs
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Press releases */}
      <Section className="border-t border-cream/8 bg-pitch-900/30">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Press Releases" title="Official announcements." />
          </Reveal>

          <ul className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
            {announcements.map((article, index) => (
              <Reveal key={article.slug} delay={index * 50} as="li">
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6"
                >
                  <span className="text-lg font-semibold text-cream transition-colors group-hover:text-gold-300">
                    {article.title}
                  </span>
                  <time
                    dateTime={article.date}
                    className="text-xs uppercase tracking-[0.14em] text-cream/40"
                  >
                    {formatDate(article.date)}
                  </time>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Media contacts */}
      <Section className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Media Contacts"
              title="Talk to the club."
              intro={
                <p>
                  For interviews, high-resolution photography, match accreditation or
                  comment, contact the media inbox.
                </p>
              }
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Media enquiries", value: contact.media },
                { label: "General enquiries", value: contact.general },
                { label: "Partnership enquiries", value: contact.partnerships },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-cream/12 bg-pitch-950/40 p-6"
                >
                  <p className="eyebrow text-cream/40">{item.label}</p>
                  <a
                    href={`mailto:${item.value}`}
                    className="mt-3 block text-sm text-cream underline decoration-cream/25 underline-offset-4 transition-colors hover:text-gold-300"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
