import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { Countdown } from "@/components/countdown";
import { MatchCard, NextMatchPanel } from "@/components/match-card";
import { PlayerAvatar } from "@/components/player-card";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import {
  Container,
  Cta,
  Eyebrow,
  Pill,
  Section,
  SectionHeading,
  TakeoverLine,
} from "@/components/ui";

import {
  brandStory,
  clubStats,
  communities,
  communityIntro,
  impactPillars,
  timeline,
  whoWeAre,
} from "@/content/club";
import { getLatestArticles } from "@/content/news";
import { getNextMatch, getUpcomingMatches } from "@/content/matches";
import { partners } from "@/content/partners";
import { players } from "@/content/people";
import { site } from "@/content/site";
import { directionsUrl } from "@/lib/utils";

// Fixtures and the countdown are time-relative, so the homepage revalidates
// hourly rather than being frozen at build time.
export const revalidate = 3600;

export default function HomePage() {
  const nextMatch = getNextMatch();
  const upcoming = getUpcomingMatches().slice(0, 3);
  const latestNews = getLatestArticles(3);
  const featuredPlayer = players.find((p) => p.slug === "kenneth-gidudu");

  return (
    <>
      {/* ============================================================
          1 — CINEMATIC HERO (§10)
          ============================================================ */}
      <section className="relative isolate flex min-h-svh items-end overflow-hidden">
        <Image
          src="/images/squad-lineup-community.jpg"
          alt="The Takeover FC squad lined up across their home ground in Kampala, with the surrounding community directly behind them"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[50%_38%]"
        />
        {/* Layered scrims keep the headline legible without flattening the photograph. */}
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-pitch-950 via-pitch-950/55 to-pitch-950/35" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pitch-950/85 via-pitch-950/25 to-transparent" />

        <Container className="pb-20 pt-40 sm:pb-28">
          <Reveal>
            <Eyebrow>
              {site.location} · Founded {site.founded}
            </Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-6 max-w-4xl text-[3.25rem] leading-[0.88] text-cream sm:text-7xl lg:text-8xl">
              Football
              <br />
              With Purpose.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Takeover Creatives FC is a community-driven football club using the
              power of football to develop young people, create opportunities and
              build a stronger future.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Cta href="/club">Explore the club</Cta>
              <Cta href="/join" variant="outline">
                Join the movement
              </Cta>
            </div>
          </Reveal>
        </Container>

        {/* Subtle downward invitation (§10). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        >
          <svg viewBox="0 0 16 26" className="animate-scroll-hint h-6 w-4 text-gold-400">
            <path
              d="M8 1v22M2.5 17.5L8 23l5.5-5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <TakeoverLine />

      {/* ============================================================
          2 — NEXT MATCH (§11)
          ============================================================ */}
      <Section spacing="tight" className="bg-pitch-950">
        <Container>
          {nextMatch ? (
            <Reveal>
              <NextMatchPanel match={nextMatch} />
              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <Countdown target={nextMatch.kickoff} />
                <div className="flex flex-wrap gap-3">
                  <Cta href={`/fixtures-results`}>Match centre</Cta>
                  <Cta href={directionsUrl(nextMatch.venue)} variant="outline">
                    Get directions
                  </Cta>
                </div>
              </div>
            </Reveal>
          ) : (
            /* §11 — the honest empty state when nothing is scheduled. */
            <Reveal>
              <div className="takeover-grid rounded-2xl border border-cream/12 bg-pitch-900/60 px-8 py-16 text-center">
                <Eyebrow className="justify-center">Next Match</Eyebrow>
                <p className="display mt-6 text-3xl text-cream sm:text-4xl lg:text-5xl">
                  The next chapter is being built.
                </p>
                <div className="mt-8 flex justify-center">
                  <Cta href="/fixtures-results" variant="outline">
                    See all fixtures
                  </Cta>
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* ============================================================
          3 — CLUB STATISTICS (§12)
          ============================================================ */}
      <Section spacing="tight" className="border-y border-cream/8 bg-emerald-900/25">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {clubStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90} as="div">
                <dt className="eyebrow text-gold-500">{stat.label}</dt>
                <dd className="display mt-3 text-5xl text-cream sm:text-6xl lg:text-7xl">
                  <StatCounter
                    value={stat.value}
                    suffix={"suffix" in stat ? stat.suffix : ""}
                    format={"format" in stat && stat.format === "plain" ? "plain" : "count"}
                  />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ============================================================
          4 — MORE THAN A FOOTBALL TEAM (§13)
          ============================================================ */}
      <Section className="bg-cream text-emerald-900">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Who We Are"
                tone="dark"
                title="More than a football team."
                intro={whoWeAre.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              />
              <div className="mt-9">
                <Link
                  href="/club"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-emerald-700"
                >
                  Discover Takeover FC
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-3/4 lg:aspect-4/5">
                <Image
                  src="/images/squad-portrait-trio.jpg"
                  alt="Three Takeover FC players standing together in club shirts after a match"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-emerald-900/85 to-transparent" />
                <p className="absolute bottom-6 left-6 right-6 text-sm font-medium text-cream/90">
                  We don&apos;t simply develop footballers. We develop young people
                  through football.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          5 — OUR STORY TIMELINE (§14)
          Horizontal rail on desktop, vertical stack on mobile.
          ============================================================ */}
      <Section className="relative overflow-hidden bg-pitch-950">
        <div className="takeover-grid absolute inset-0 opacity-50" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title="It started with football."
              intro={
                <p>
                  But football became the platform. The platform became a
                  community. The community became a club. And the club is becoming
                  an institution.
                </p>
              }
            />
          </Reveal>
        </Container>

        <div className="relative mt-14">
          {/* The Takeover Line running the length of the journey. */}
          <div
            aria-hidden
            className="takeover-line absolute left-0 right-0 top-38 hidden h-px lg:block"
          />

          <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:gap-8">
            {timeline.map((entry, index) => (
              <Reveal
                key={entry.marker}
                delay={index * 100}
                className="w-[80vw] max-w-sm shrink-0 snap-start sm:w-[62vw] lg:w-[26rem]"
              >
                <article className="group">
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-cream/10">
                    <Image
                      src={entry.image}
                      alt={entry.imageAlt}
                      fill
                      sizes="(max-width: 640px) 80vw, 420px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-pitch-950/80 to-transparent" />
                  </div>

                  <div className="relative mt-8 lg:mt-6">
                    <span
                      aria-hidden
                      className="absolute -top-[2.05rem] left-0 hidden h-3 w-3 rounded-full border-2 border-pitch-950 bg-gold-400 lg:block"
                    />
                    <p className="display text-3xl text-gold-400 sm:text-4xl">
                      {entry.marker}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-cream sm:text-xl">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/60">
                      {entry.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================
          6 — THE COMMUNITY (§15)
          ============================================================ */}
      <Section className="relative isolate overflow-hidden">
        <Image
          src="/images/match-dirt-pitch-duel.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-pitch-950/88" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pitch-950 via-pitch-950/70 to-transparent" />

        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <SectionHeading
                eyebrow="The Community"
                title="Where we come from matters."
                intro={communityIntro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              />
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-9 flex flex-wrap gap-2">
                {communities.map((community) => (
                  <li key={community}>
                    <Pill tone="gold">{community}</Pill>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10">
                <Cta href="/community">Explore our community impact</Cta>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          7 — PLAYER STORY (§16)
          ============================================================ */}
      {featuredPlayer ? (
        <Section className="border-y border-cream/8 bg-pitch-900/40">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
              <Reveal>
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-cream/10">
                  <PlayerAvatar player={featuredPlayer} sizes="(max-width: 1024px) 100vw, 460px" />
                </div>
                <p className="mt-3 text-xs text-cream/35">
                  Portrait to follow. Club photography is not attributed to
                  individual players until identified.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <Eyebrow>Player Story</Eyebrow>
                <h2 className="display mt-5 text-4xl text-cream sm:text-5xl lg:text-6xl">
                  From the community to the captain&apos;s armband.
                </h2>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <p className="display text-2xl text-gold-400 sm:text-3xl">
                    {featuredPlayer.name}
                  </p>
                  <Pill>{featuredPlayer.role}</Pill>
                </div>

                <div className="mt-7 space-y-4 text-base leading-relaxed text-cream/70">
                  <p>{featuredPlayer.bio[0]}</p>
                  <p>{featuredPlayer.bio[2]}</p>
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Cta href={`/players/${featuredPlayer.slug}`}>Read the full profile</Cta>
                  <Cta href="/players" variant="outline">
                    Meet the squad
                  </Cta>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ============================================================
          8 — IMPACT (§17)
          ============================================================ */}
      <Section className="bg-cream text-emerald-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Impact"
              tone="dark"
              title="The score is bigger than the scoreboard."
              intro={
                <p>
                  Every match matters. But so does every young person who discovers
                  discipline, confidence, friendship, education and opportunity
                  through football.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-emerald-900/12 bg-emerald-900/12 sm:grid-cols-2 lg:grid-cols-3">
            {impactPillars.map((pillar, index) => (
              <Reveal key={pillar} delay={index * 70} as="li">
                <div className="flex h-full items-center gap-5 bg-cream px-6 py-8">
                  <span className="display text-2xl text-emerald-900/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-xl text-emerald-900 sm:text-2xl">
                    {pillar}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <div className="mt-12">
              <Link
                href="/community#impact"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-900/25 px-6 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-emerald-900 transition-colors hover:border-emerald-900 hover:bg-emerald-900 hover:text-cream"
              >
                See how we measure impact
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================
          9 — LATEST NEWS (§18)
          ============================================================ */}
      <Section className="bg-pitch-950">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Newsroom" title="Latest news." className="max-w-xl" />
              <Cta href="/news" variant="outline">
                View all news
              </Cta>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((article, index) => (
              <Reveal key={article.slug} delay={index * 90}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
          10 — UPCOMING FIXTURES (§60)
          ============================================================ */}
      <Section spacing="tight" className="border-y border-cream/8 bg-emerald-900/20">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Fixtures"
                title="What&rsquo;s coming next."
                className="max-w-xl"
              />
              <Cta href="/fixtures-results" variant="outline">
                Fixtures &amp; results
              </Cta>
            </div>
          </Reveal>

          {upcoming.length > 0 ? (
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {upcoming.map((match, index) => (
                <Reveal key={match.slug} delay={index * 90}>
                  <MatchCard match={match} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-cream/55">
              No fixtures are currently scheduled. The next chapter is being built.
            </p>
          )}
        </Container>
      </Section>

      {/* ============================================================
          11 — PARTNERS (§19)
          ============================================================ */}
      <Section className="bg-pitch-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Partners"
                title="Build the future with us."
                intro={
                  <p>
                    Takeover FC believes meaningful change is built through
                    collaboration. We work with organisations, businesses,
                    institutions and individuals who believe in the potential of
                    young people.
                  </p>
                }
              />
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href="/partner-with-us" variant="gold">
                  Become a partner
                </Cta>
                <Cta href="/support" variant="outline">
                  Support the club
                </Cta>
              </div>
            </Reveal>

            <Reveal delay={120}>
              {partners.length > 0 ? (
                /* Premium monochrome treatment once real partners exist (§19). */
                <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10 sm:grid-cols-3">
                  {partners.map((partner) => (
                    <li
                      key={partner.slug}
                      className="flex aspect-3/2 items-center justify-center bg-pitch-950 p-6"
                    >
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={140}
                          height={70}
                          className="max-h-12 w-auto opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                        />
                      ) : (
                        <span className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-cream/50">
                          {partner.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="takeover-grid flex h-full min-h-64 flex-col justify-center rounded-2xl border border-dashed border-cream/15 bg-cream/[0.02] p-9">
                  <p className="display text-2xl text-cream sm:text-3xl">
                    This space is deliberately empty.
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/60">
                    Takeover FC has no announced partners yet, and we would rather
                    show that honestly than fill the page. The first organisations
                    to join will be named here.
                  </p>
                  <div className="mt-7">
                    <Link
                      href="/partners"
                      className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-gold-400 transition-colors hover:text-gold-300"
                    >
                      How partnership works →
                    </Link>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          12 — FINAL CALL TO ACTION (§20)
          ============================================================ */}
      <Section
        spacing="loose"
        className="relative isolate overflow-hidden border-t border-cream/8"
      >
        <Image
          src="/images/champions-trophy-celebration.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-pitch-950/80" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-pitch-950 via-transparent to-pitch-950" />

        <Container className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">The Beginning</Eyebrow>
            <h2 className="display mx-auto mt-6 max-w-4xl text-5xl text-cream sm:text-6xl lg:text-7xl">
              This is only the beginning.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
              The club is growing. The vision is growing. And the opportunity to
              make an impact is growing with it.
            </p>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Cta href="/support" variant="gold">
                Support Takeover FC
              </Cta>
              <Cta href="/partner-with-us" variant="outline">
                Partner with us
              </Cta>
            </div>
          </Reveal>

          {/* §56 — the brand story, as the closing note. */}
          <Reveal delay={160}>
            <ul className="mx-auto mt-20 max-w-md space-y-2 border-t border-cream/10 pt-10">
              {brandStory.map((line, index) => (
                <li
                  key={line}
                  className="display text-lg text-cream sm:text-xl"
                  style={{ opacity: 0.5 + index * 0.125 }}
                >
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
