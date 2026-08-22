import Image from "next/image";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  JsonLd,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { albums, plannedAlbums } from "@/content/media";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Media", href: "/media" },
  { label: "Gallery", href: "/gallery" },
];

export const metadata = pageMetadata({
  title: "Photo Gallery",
  description:
    "Curated photography from Takeover Creatives FC — matchday, players, community and events, documented in the Kampala neighbourhoods the club comes from.",
  path: "/gallery",
  image: "/images/match-dirt-pitch-duel.jpg",
  keywords: ["Takeover FC photos", "Kampala football photography"],
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        eyebrow="Photo Gallery"
        title="The club, documented."
        trail={trail}
        image="/images/match-shoulder-to-shoulder.jpg"
        imageAlt="Two footballers running shoulder to shoulder during a match"
        intro={
          <p>
            Curated albums rather than a photo dump. Every image here is the
            club&apos;s own — real players, real matches, real ground.
          </p>
        }
      />

      {albums.map((album, albumIndex) => (
        <Section
          key={album.slug}
          id={album.slug}
          className={albumIndex % 2 === 0 ? "bg-pitch-950" : "bg-pitch-900/30"}
        >
          <Container>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                  eyebrow={`Album ${String(albumIndex + 1).padStart(2, "0")}`}
                  title={album.title}
                  intro={<p>{album.description}</p>}
                  className="max-w-2xl"
                />
                <Pill tone="neutral">{album.photos.length} photographs</Pill>
              </div>
            </Reveal>

            {/* The Takeover Grid, applied as a masonry-ish editorial layout. */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {album.photos.map((photo, index) => (
                <Reveal
                  key={photo.src}
                  delay={index * 60}
                  className={index === 0 ? "sm:col-span-2 sm:row-span-2" : undefined}
                >
                  <figure className="group relative h-full overflow-hidden rounded-xl border border-cream/10">
                    <div
                      className={
                        index === 0
                          ? "relative aspect-4/3 sm:aspect-square"
                          : "relative aspect-4/3"
                      }
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={
                          index === 0
                            ? "(max-width: 640px) 100vw, 700px"
                            : "(max-width: 640px) 100vw, 380px"
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-pitch-950/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                    {photo.caption ? (
                      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-sm text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {photo.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* Albums still to come */}
      <Section className="border-t border-cream/8 bg-emerald-900/25">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Coming Albums"
              title="Still being photographed."
              intro={
                <p>
                  Three albums the club is actively building. They will appear here
                  once there is genuine photography to fill them.
                </p>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plannedAlbums.map((album, index) => (
              <Reveal key={album.title} delay={index * 90}>
                <div className="takeover-grid h-full rounded-xl border border-dashed border-cream/15 bg-cream/[0.02] p-8">
                  <h3 className="display text-2xl text-cream/70">{album.title}</h3>
                  <p className="mt-3 text-sm text-cream/45">{album.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Cta href="/media#media-kit" variant="outline">
                Media kit
              </Cta>
              <Cta href="/videos" variant="outline">
                Video hub
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
