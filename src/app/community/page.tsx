import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import {
  Container,
  Cta,
  JsonLd,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  clubStats,
  communities,
  communityIntro,
  impactAreas,
} from "@/content/club";
import { getArticles } from "@/content/news";
import { players } from "@/content/people";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Community", href: "/community" },
];

export const metadata = pageMetadata({
  title: "Community",
  description:
    "Takeover Creatives FC works in Namuwongo, Kanyogoga, Kasanvu, Soweto and Tebaleka — using football to create access, education, mentorship, life skills and opportunity for young people in Kampala.",
  path: "/community",
  keywords: [
    "community football Uganda",
    "youth development Kampala",
    "Namuwongo football",
    "football mentorship Uganda",
  ],
});

export default function CommunityPage() {
  const communityStories = getArticles()
    .filter((article) => article.category === "Community" || article.category === "Player Stories")
    .slice(0, 3);

  const successStories = players.filter(
    (player) => player.slug === "kenneth-gidudu" || player.slug === "imran-yasin",
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="Community"
        title={
          <>
            Football is our platform.
            <br />
            People are our purpose.
          </>
        }
        trail={trail}
        image="/images/match-dirt-pitch-duel.jpg"
        imageAlt="Young footballers competing on a dirt pitch surrounded by community housing in Kampala"
        intro={
          <p>
            Takeover FC exists inside the communities it serves — not at a distance
            from them. This is what that work actually consists of.
          </p>
        }
      />

      {/* --- Why we work in the community ------------------------------- */}
      <Section className="bg-pitch-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Where We Come From"
                title="Five communities, one club."
                intro={communityIntro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              />
              <ul className="mt-9 flex flex-wrap gap-2">
                {communities.map((community) => (
                  <li key={community}>
                    <Pill tone="gold">{community}</Pill>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-cream/10">
                <Image
                  src="/images/squad-lineup-community.jpg"
                  alt="The Takeover FC squad lined up across their home ground with the surrounding community behind them"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-cream/50">
                The environment is part of the story, not the backdrop to it. The
                club plays and trains on the ground its players live beside.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --- Impact areas (§34) ------------------------------------------ */}
      <Section id="impact" className="bg-cream text-emerald-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Impact Areas"
              tone="dark"
              title="What the work actually does."
              intro={
                <p>
                  Five areas of community impact, each measured by what changes for
                  the young people involved rather than by how it sounds in a
                  report.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {impactAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 70} as="li">
                <div className="takeover-grid-dark h-full rounded-xl border border-emerald-900/12 bg-cream p-8">
                  <span className="display text-sm text-emerald-900/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-2xl text-emerald-900 sm:text-3xl">
                    {area.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-emerald-900/70">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --- Programmes -------------------------------------------------- */}
      <Section id="programmes" className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Programmes"
              title="How it runs week to week."
              intro={
                <p>
                  Community work at this stage of a club&apos;s life is practical
                  rather than institutional. This is the shape of it today, and it
                  will grow as the academy and partnerships develop.
                </p>
              }
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Organised football",
                description:
                  "Regular training and competitive fixtures for the senior and Under-17 squads, on ground within the communities we serve.",
              },
              {
                title: "Education connection",
                description:
                  "Participation is tied to staying connected to school. Football is the platform, never a substitute for education.",
              },
              {
                title: "Mentorship",
                description:
                  "Coaches and senior players who came from the same neighbourhoods provide guidance younger players will actually listen to.",
              },
            ].map((programme, index) => (
              <Reveal key={programme.title} delay={index * 90}>
                <article className="h-full rounded-xl border border-cream/12 bg-pitch-950/40 p-8">
                  <h3 className="display text-2xl text-cream sm:text-3xl">
                    {programme.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/65">
                    {programme.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-cream/12 pt-12 lg:grid-cols-4">
              {clubStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display text-5xl text-cream sm:text-6xl">
                    <StatCounter
                      value={stat.value}
                      suffix={"suffix" in stat ? stat.suffix : ""}
                      format={"format" in stat && stat.format === "plain" ? "plain" : "count"}
                    />
                  </dd>
                  <dt className="eyebrow mt-3 text-gold-500">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* --- Success stories (§35) --------------------------------------- */}
      <Section id="stories" className="bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Success Stories"
              title="What it looks like when it works."
              intro={
                <p>
                  The club will keep adding to this section. These are the stories
                  we can document today.
                </p>
              }
            />
          </Reveal>

          <div className="mt-14 space-y-6">
            {successStories.map((player, index) => (
              <Reveal key={player.slug} delay={index * 100}>
                <Link
                  href={`/players/${player.slug}`}
                  className="group block rounded-2xl border border-cream/10 bg-pitch-900/50 p-8 transition-colors duration-400 hover:border-gold-400/40 sm:p-10"
                >
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start lg:gap-12">
                    <div>
                      <h3 className="display text-3xl text-cream transition-colors duration-300 group-hover:text-gold-300 sm:text-4xl">
                        {player.name}
                      </h3>
                      {player.alias ? (
                        <p className="mt-2 text-lg italic text-gold-400">
                          “{player.alias}”
                        </p>
                      ) : null}
                      <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/45">
                        {player.role}
                      </p>
                    </div>

                    <div>
                      <p className="text-base leading-relaxed text-cream/70">
                        {player.bio[1]}
                      </p>
                      {player.achievements && player.achievements.length > 0 ? (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {player.achievements.map((achievement) => (
                            <li key={achievement}>
                              <Pill tone="gold">{achievement}</Pill>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <span className="mt-6 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-cream/45 transition-colors group-hover:text-gold-300">
                        Read the full story →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Community coverage ------------------------------------------ */}
      {communityStories.length > 0 ? (
        <Section className="border-t border-cream/8 bg-pitch-900/30">
          <Container>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                  eyebrow="From the Newsroom"
                  title="Community coverage."
                  className="max-w-xl"
                />
                <Cta href="/news" variant="outline">
                  All news
                </Cta>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {communityStories.map((article, index) => (
                <Reveal key={article.slug} delay={index * 80}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --- CTA ---------------------------------------------------------- */}
      <Section className="border-t border-cream/8 bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Takeover Opportunity"
              title="Work with us in the community."
              intro={
                <p>
                  Schools, NGOs, community organisations and individuals who want
                  to build something alongside the club are exactly who we want to
                  hear from.
                </p>
              }
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Cta href="/partner-with-us" variant="gold">
                Partner with us
              </Cta>
              <Cta href="/join#volunteer" variant="outline">
                Volunteer
              </Cta>
              <Cta href="/support" variant="outline">
                Support the club
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
