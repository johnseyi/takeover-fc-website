import Image from "next/image";
import { notFound } from "next/navigation";

import { MatchCard } from "@/components/match-card";
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
import { getMatch, getResults, matches } from "@/content/matches";
import { site } from "@/content/site";
import { getTeam } from "@/content/teams";
import { breadcrumbSchema, matchSchema, pageMetadata } from "@/lib/seo";
import { formatDate, formatTime } from "@/lib/utils";
import type { MatchEvent } from "@/lib/types";

export function generateStaticParams() {
  return matches
    .filter((match) => match.status === "played")
    .map((match) => ({ slug: match.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = getMatch(slug);
  if (!match) return {};

  const title = match.score
    ? `${site.shortName} ${match.score.takeover}–${match.score.opponent} ${match.opponent}`
    : `${site.shortName} vs ${match.opponent}`;

  return pageMetadata({
    title,
    description: `Match centre: ${title}. ${match.competition} at ${match.venue}, ${formatDate(match.kickoff)}. Line-ups, timeline, statistics and match report.`,
    path: `/matches/${match.slug}`,
    image: match.photos?.[0],
  });
}

const eventIcon: Record<MatchEvent["type"], string> = {
  goal: "⚽",
  assist: "◎",
  yellow: "▮",
  red: "▮",
  substitution: "⇄",
};

const eventLabel: Record<MatchEvent["type"], string> = {
  goal: "Goal",
  assist: "Assist",
  yellow: "Yellow card",
  red: "Red card",
  substitution: "Substitution",
};

export default async function MatchCentrePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = getMatch(slug);
  if (!match) notFound();

  const team = getTeam(match.team);
  const home = match.home ? site.shortName : match.opponent;
  const away = match.home ? match.opponent : site.shortName;
  const homeScore = match.home ? match.score?.takeover : match.score?.opponent;
  const awayScore = match.home ? match.score?.opponent : match.score?.takeover;

  const goalscorers = (match.events ?? []).filter(
    (event) => event.type === "goal" && event.team === "takeover",
  );
  const cards = (match.events ?? []).filter(
    (event) => event.type === "yellow" || event.type === "red",
  );

  const otherResults = getResults()
    .filter((m) => m.slug !== match.slug)
    .slice(0, 2);

  const trail = [
    { label: "Home", href: "/" },
    { label: "Fixtures & Results", href: "/fixtures-results" },
    { label: `vs ${match.opponent}`, href: `/matches/${match.slug}` },
  ];

  return (
    <>
      <JsonLd data={[matchSchema(match), breadcrumbSchema(trail)]} />

      {/* --- Scoreline hero ---------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-pitch-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
        {match.photos?.[0] ? (
          <>
            <Image
              src={match.photos[0]}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover opacity-20"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-pitch-950 via-pitch-950/85 to-pitch-950" />
          </>
        ) : (
          <div className="takeover-grid absolute inset-0 -z-10 opacity-60" />
        )}

        <Container>
          <Breadcrumbs trail={trail} />

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Eyebrow>{match.competition}</Eyebrow>
            <span aria-hidden className="text-cream/20">
              /
            </span>
            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/50">
              {team?.name}
            </span>
          </div>

          <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
            <p className="display text-right text-3xl leading-[0.95] text-cream sm:text-5xl lg:text-6xl">
              {home}
            </p>
            <p className="display rounded-xl border border-cream/12 bg-cream/[0.06] px-5 py-3 text-4xl text-gold-300 tabular-nums sm:px-8 sm:text-6xl lg:text-7xl">
              {homeScore}–{awayScore}
            </p>
            <p className="display text-left text-3xl leading-[0.95] text-cream sm:text-5xl lg:text-6xl">
              {away}
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-cream/10 pt-8 sm:grid-cols-4">
            <div>
              <dt className="eyebrow text-cream/40">Date</dt>
              <dd className="mt-2 text-sm font-semibold text-cream">
                {formatDate(match.kickoff)}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-cream/40">Kick-off</dt>
              <dd className="mt-2 text-sm font-semibold text-cream">
                {formatTime(match.kickoff)} EAT
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-cream/40">Venue</dt>
              <dd className="mt-2 text-sm font-semibold text-cream">{match.venue}</dd>
            </div>
            {match.playerOfTheMatch ? (
              <div>
                <dt className="eyebrow text-cream/40">Player of the match</dt>
                <dd className="mt-2 text-sm font-semibold text-gold-300">
                  {match.playerOfTheMatch}
                </dd>
              </div>
            ) : null}
          </dl>
        </Container>

        <TakeoverLine className="absolute inset-x-0 bottom-0" />
      </section>

      {/* --- Overview: scorers and cards --------------------------------- */}
      {(goalscorers.length > 0 || cards.length > 0) && (
        <Section spacing="tight" className="border-b border-cream/8 bg-pitch-900/30">
          <Container>
            <div className="grid gap-10 sm:grid-cols-2">
              {goalscorers.length > 0 ? (
                <Reveal>
                  <h2 className="eyebrow text-gold-500">Goalscorers</h2>
                  <ul className="mt-5 space-y-3">
                    {goalscorers.map((event, index) => (
                      <li key={`${event.player}-${index}`} className="flex items-baseline gap-3">
                        <span className="display w-11 shrink-0 text-lg text-gold-400 tabular-nums">
                          {event.minute}&apos;
                        </span>
                        <span>
                          <span className="text-base font-semibold text-cream">
                            {event.player}
                          </span>
                          {event.detail ? (
                            <span className="ml-2 text-sm text-cream/45">
                              {event.detail}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {cards.length > 0 ? (
                <Reveal delay={100}>
                  <h2 className="eyebrow text-gold-500">Cards</h2>
                  <ul className="mt-5 space-y-3">
                    {cards.map((event, index) => (
                      <li key={`${event.player}-${index}`} className="flex items-baseline gap-3">
                        <span className="display w-11 shrink-0 text-lg text-cream/50 tabular-nums">
                          {event.minute}&apos;
                        </span>
                        <span
                          aria-hidden
                          className={`inline-block h-4 w-3 rounded-[2px] ${
                            event.type === "red" ? "bg-red-500" : "bg-yellow-400"
                          }`}
                        />
                        <span className="text-base font-semibold text-cream">
                          {event.player}
                        </span>
                        <span className="sr-only">{eventLabel[event.type]}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </Section>
      )}

      {/* --- Timeline, line-up, statistics -------------------------------- */}
      <Section className="bg-pitch-950">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              {/* Timeline */}
              {match.events && match.events.length > 0 ? (
                <Reveal>
                  <h2 className="display text-3xl text-cream sm:text-4xl">
                    Match timeline
                  </h2>
                  <ol className="mt-8 space-y-6 border-l border-cream/12 pl-8">
                    {match.events.map((event, index) => (
                      <li key={index} className="relative">
                        <span
                          aria-hidden
                          className={`absolute -left-[2.28rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-pitch-950 ${
                            event.team === "takeover" ? "bg-emerald-400" : "bg-cream/35"
                          }`}
                        />
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="display text-lg text-gold-400 tabular-nums">
                            {event.minute}&apos;
                          </span>
                          <span aria-hidden className="text-sm">
                            {eventIcon[event.type]}
                          </span>
                          <span className="text-base font-semibold text-cream">
                            {event.player}
                          </span>
                          <span className="text-xs uppercase tracking-[0.12em] text-cream/40">
                            {eventLabel[event.type]}
                          </span>
                        </div>
                        {event.detail ? (
                          <p className="mt-1.5 text-sm text-cream/50">{event.detail}</p>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </Reveal>
              ) : null}

              {/* Match report */}
              {match.report && match.report.length > 0 ? (
                <Reveal delay={100}>
                  <div className="mt-16">
                    <h2 className="display text-3xl text-cream sm:text-4xl">
                      Match report
                    </h2>
                    <div className="mt-7 space-y-5 text-base leading-relaxed text-cream/70">
                      {match.report.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>

            {/* Line-up and stats */}
            <div className="space-y-6">
              {match.statistics && match.statistics.length > 0 ? (
                <Reveal>
                  <div className="rounded-xl border border-cream/12 bg-pitch-900/60 p-7">
                    <h2 className="eyebrow text-gold-500">Statistics</h2>
                    <ul className="mt-6 space-y-5">
                      {match.statistics.map((stat) => {
                        const total = stat.takeover + stat.opponent || 1;
                        const share = (stat.takeover / total) * 100;
                        return (
                          <li key={stat.label}>
                            <div className="flex items-baseline justify-between text-sm">
                              <span className="font-semibold text-cream tabular-nums">
                                {stat.takeover}
                              </span>
                              <span className="text-xs uppercase tracking-[0.1em] text-cream/45">
                                {stat.label}
                              </span>
                              <span className="font-semibold text-cream/60 tabular-nums">
                                {stat.opponent}
                              </span>
                            </div>
                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream/10">
                              <div
                                className="h-full rounded-full bg-emerald-400"
                                style={{ width: `${share}%` }}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              {match.lineup && match.lineup.length > 0 ? (
                <Reveal delay={100}>
                  <div className="rounded-xl border border-cream/12 bg-pitch-900/60 p-7">
                    <h2 className="eyebrow text-gold-500">Line-up</h2>
                    <ol className="mt-5 space-y-2">
                      {match.lineup.map((name) => (
                        <li key={name} className="text-sm text-cream/80">
                          {name}
                        </li>
                      ))}
                    </ol>

                    {match.substitutes && match.substitutes.length > 0 ? (
                      <>
                        <h3 className="eyebrow mt-7 text-cream/40">Substitutes</h3>
                        <ol className="mt-4 space-y-2">
                          {match.substitutes.map((name) => (
                            <li key={name} className="text-sm text-cream/55">
                              {name}
                            </li>
                          ))}
                        </ol>
                      </>
                    ) : null}
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* --- Photos -------------------------------------------------------- */}
      {match.photos && match.photos.length > 0 ? (
        <Section spacing="tight" className="border-t border-cream/8 bg-pitch-900/30">
          <Container>
            <h2 className="display text-3xl text-cream sm:text-4xl">Photos</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {match.photos.map((src) => (
                <div
                  key={src}
                  className="relative aspect-4/3 overflow-hidden rounded-xl border border-cream/10"
                >
                  <Image
                    src={src}
                    alt={`Match photography — ${site.shortName} vs ${match.opponent}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --- More results -------------------------------------------------- */}
      {otherResults.length > 0 ? (
        <Section spacing="tight" className="border-t border-cream/8 bg-pitch-950">
          <Container>
            <h2 className="display text-3xl text-cream sm:text-4xl">More results</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {otherResults.map((other) => (
                <MatchCard key={other.slug} match={other} />
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Cta href="/fixtures-results" variant="outline">
                All fixtures &amp; results
              </Cta>
              {match.placeholder ? <Pill tone="neutral">Sample match record</Pill> : null}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
