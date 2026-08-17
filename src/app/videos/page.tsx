import Image from "next/image";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  EmptyState,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";
import { videoCategories, videos } from "@/content/media";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Media", href: "/media" },
  { label: "Videos", href: "/videos" },
];

export const metadata = pageMetadata({
  title: "Videos",
  description:
    "The Takeover Creatives FC video hub — match highlights, interviews, training, player stories, community coverage and behind-the-scenes footage.",
  path: "/videos",
  keywords: ["Takeover FC videos", "Kampala football highlights"],
});

export default function VideosPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        eyebrow="Video Hub"
        title="Football, on film."
        trail={trail}
        image="/images/match-driving-forward.jpg"
        imageAlt="A Takeover FC player driving forward with the ball during a match"
        intro={
          <p>
            Match highlights, interviews, training and the stories behind the
            football — published through the club&apos;s own channel.
          </p>
        }
      />

      <Section className="bg-pitch-950">
        <Container>
          {videos.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <article key={video.slug} className="group">
                  <a
                    href={
                      video.youtubeId
                        ? `https://www.youtube.com/watch?v=${video.youtubeId}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-cream/10">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-pitch-950/35">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/40 bg-pitch-950/60 backdrop-blur-sm transition-colors group-hover:border-gold-400 group-hover:bg-gold-400">
                          <svg
                            aria-hidden
                            viewBox="0 0 16 16"
                            className="ml-0.5 h-5 w-5 text-cream group-hover:text-pitch-950"
                          >
                            <path d="M3 1.5l11 6.5-11 6.5z" fill="currentColor" />
                          </svg>
                        </span>
                      </div>
                      {video.duration ? (
                        <span className="absolute bottom-3 right-3 rounded bg-pitch-950/85 px-2 py-1 text-xs font-semibold text-cream">
                          {video.duration}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-4 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-gold-500">
                      {video.category}
                    </p>
                    <h2 className="display mt-2 text-xl text-cream transition-colors group-hover:text-gold-300">
                      {video.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-cream/55">
                      {video.description}
                    </p>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <Reveal>
              <EmptyState
                title="The channel is being built."
                description="Takeover FC's video content is not yet published. Match highlights, interviews and player stories will appear here once the club's channel is live. In the meantime, the photo gallery carries the club's visual record."
                action={{ label: "Photo gallery", href: "/gallery" }}
              />
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Planned categories */}
      <Section className="border-t border-cream/8 bg-pitch-900/30">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What We Will Publish"
              title="Seven kinds of film."
              intro={
                <p>
                  The club is committed to documenting its own work. These are the
                  categories the video hub will be organised around.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {videoCategories.map((category, index) => (
              <Reveal key={category} delay={index * 55} as="li">
                <div className="flex h-full items-center gap-4 bg-pitch-950 px-6 py-8">
                  <span className="display text-lg text-gold-500/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-lg text-cream sm:text-xl">
                    {category}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={140}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Cta href="/gallery" variant="outline">
                Photo gallery
              </Cta>
              <Cta href="/media" variant="outline">
                Media centre
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
