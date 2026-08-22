import Image from "next/image";
import Link from "next/link";

import { MatchCard } from "@/components/match-card";
import { PageHero } from "@/components/page-hero";
import { PlayerCard } from "@/components/player-card";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  Eyebrow,
  JsonLd,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { getResults, getUpcomingMatches } from "@/content/matches";
import { players, staff } from "@/content/people";
import { teams } from "@/content/teams";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { resultLetter } from "@/lib/utils";

export const revalidate = 3600;

const trail = [
  { label: "Home", href: "/" },
  { label: "Teams", href: "/teams" },
];

export const metadata = pageMetadata({
  title: "Teams",
  description:
    "The Takeover Creatives FC squads — the senior team, the Under-17 side, the planned youth academy and the girls' football pathway in development.",
  path: "/teams",
  keywords: ["Takeover FC teams", "youth football Kampala", "Under-17 football Uganda"],
});

const resultTone = {
  W: "bg-emerald-400/15 text-emerald-300 border-emerald-400/40",
  D: "bg-cream/8 text-cream/60 border-cream/25",
  L: "bg-red-400/12 text-red-300 border-red-400/35",
} as const;

export default function TeamsPage() {
  const activeTeams = teams.filter((team) => team.status === "active");
  const plannedTeams = teams.filter((team) => team.status === "planned");

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="Teams"
        title="The squads."
        trail={trail}
        image="/images/senior-team-lineup.jpg"
        imageAlt="The Takeover FC senior team lined up in white and green kit"
        intro={
          <p>
            Two active squads today, and a defined route between them. Every team
            in the club is coached toward the same standard, whatever the age
            group on the team sheet.
          </p>
        }
      />

      {activeTeams.map((team, teamIndex) => {
        const squad = players.filter((player) => player.team === team.id);
        const upcoming = getUpcomingMatches().filter((m) => m.team === team.id).slice(0, 2);
        const recent = getResults().filter((m) => m.team === team.id).slice(0, 4);
        const coaches = staff.filter((member) => team.coachSlugs?.includes(member.slug));

        return (
          <Section
            key={team.id}
            id={team.id}
            className={teamIndex % 2 === 0 ? "bg-pitch-950" : "bg-pitch-900/30"}
          >
            <Container>
              {/* Team header */}
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
                <Reveal>
                  <Eyebrow>{team.ageGroup}</Eyebrow>
                  <h2 className="display mt-5 text-5xl text-cream sm:text-6xl lg:text-7xl">
                    {team.name}
                  </h2>
                  <p className="mt-6 text-lg text-cream/75">{team.summary}</p>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-cream/60">
                    {team.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Recent form */}
                  {recent.length > 0 ? (
                    <div className="mt-9">
                      <h3 className="eyebrow text-cream/40">Recent form</h3>
                      <ul className="mt-4 flex gap-2">
                        {recent
                          .slice()
                          .reverse()
                          .map((match) => {
                            const letter = resultLetter(match.score);
                            if (!letter) return null;
                            return (
                              <li key={match.slug}>
                                <Link
                                  href={`/matches/${match.slug}`}
                                  aria-label={`${letter === "W" ? "Win" : letter === "D" ? "Draw" : "Loss"} against ${match.opponent}`}
                                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-transform hover:scale-110 ${resultTone[letter]}`}
                                >
                                  {letter}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ) : null}

                  {coaches.length > 0 ? (
                    <div className="mt-8">
                      <h3 className="eyebrow text-cream/40">Coaching</h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {coaches.map((coach) => (
                          <li key={coach.slug}>
                            <Pill tone="neutral">{coach.position}</Pill>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </Reveal>

                <Reveal delay={120}>
                  {team.image ? (
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-cream/10">
                      <Image
                        src={team.image}
                        alt={team.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 620px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </Reveal>
              </div>

              {/* Squad */}
              {squad.length > 0 ? (
                <div className="mt-16">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <h3 className="display text-2xl text-cream sm:text-3xl">Squad</h3>
                    <Link
                      href={`/players?team=${team.id}`}
                      className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-gold-400 transition-colors hover:text-gold-300"
                    >
                      Full player database →
                    </Link>
                  </div>
                  <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {squad.slice(0, 5).map((player, index) => (
                      <Reveal key={player.slug} delay={index * 60}>
                        <PlayerCard player={player} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Fixtures */}
              {upcoming.length > 0 ? (
                <div className="mt-16">
                  <h3 className="display text-2xl text-cream sm:text-3xl">Next fixtures</h3>
                  <div className="mt-7 grid gap-5 md:grid-cols-2">
                    {upcoming.map((match, index) => (
                      <Reveal key={match.slug} delay={index * 80}>
                        <MatchCard match={match} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}
            </Container>
          </Section>
        );
      })}

      {/* Planned squads — presented honestly as future programmes (§26). */}
      <Section className="border-t border-cream/8 bg-emerald-900/25">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="In Development"
              title="The next generation starts here."
              intro={
                <p>
                  Two further pathways are part of the club&apos;s development
                  strategy. Neither is running yet, and we will say so plainly
                  until they are.
                </p>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {plannedTeams.map((team, index) => (
              <Reveal key={team.id} delay={index * 100}>
                <article className="takeover-grid h-full rounded-2xl border border-dashed border-cream/18 bg-cream/[0.02] p-8">
                  <Pill tone="gold">
                    {team.id === "girls" ? "Coming soon" : "In development"}
                  </Pill>
                  <h3 className="display mt-6 text-3xl text-cream sm:text-4xl">
                    {team.name}
                  </h3>
                  <p className="mt-4 text-base text-cream/70">{team.summary}</p>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-cream/55">
                    {team.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Cta
                      href={team.id === "girls" ? "/girls-football" : "/academy"}
                      variant="outline"
                    >
                      {team.id === "girls" ? "Girls' football" : "The academy"}
                    </Cta>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="tight" className="bg-pitch-950">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-cream/10 bg-pitch-900/50 p-8 sm:p-10">
              <div>
                <h2 className="display text-3xl text-cream sm:text-4xl">
                  Want to play for Takeover FC?
                </h2>
                <p className="mt-3 max-w-lg text-sm text-cream/60">
                  Trials and registration are open to young players from our
                  communities and beyond.
                </p>
              </div>
              <Cta href="/join#player" variant="gold">
                Become a player
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
