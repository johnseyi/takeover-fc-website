import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/article-card";
import { PlayerAvatar, PlayerCard } from "@/components/player-card";
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
import { getGoalsFor } from "@/content/matches";
import { getArticles } from "@/content/news";
import { players } from "@/content/people";
import { getTeam } from "@/content/teams";
import { breadcrumbSchema, pageMetadata, playerSchema } from "@/lib/seo";

export function generateStaticParams() {
  return players.map((player) => ({ slug: player.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = players.find((p) => p.slug === slug);
  if (!player) return {};

  const team = getTeam(player.team);
  const displayName = player.alias ? `${player.name} "${player.alias}"` : player.name;

  return pageMetadata({
    title: displayName,
    description: `${displayName} — ${player.role ?? player.position}, ${team?.name ?? player.ageGroup} at Takeover Creatives FC, Kampala. Profile, football journey, achievements and statistics.`,
    path: `/players/${player.slug}`,
    image: player.photo,
    keywords: [player.name, "Takeover FC player", player.position],
  });
}

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = players.find((p) => p.slug === slug);
  if (!player) notFound();

  const team = getTeam(player.team);
  const teammates = players.filter((p) => p.team === player.team && p.slug !== player.slug);

  // Stories that name this player in their tags.
  const relatedStories = getArticles()
    .filter((article) => article.tags.includes(player.name))
    .slice(0, 3);

  const goals = getGoalsFor(player.name);

  const trail = [
    { label: "Home", href: "/" },
    { label: "Players", href: "/players" },
    { label: player.name, href: `/players/${player.slug}` },
  ];

  const profileRows = [
    { label: "Position", value: player.position },
    { label: "Squad number", value: player.number ? String(player.number) : null },
    { label: "Team", value: team?.name ?? player.ageGroup },
    { label: "Height", value: player.height ?? null },
    { label: "Preferred foot", value: player.preferredFoot ?? null },
    { label: "Nationality", value: player.nationality },
    { label: "School", value: player.school ?? null },
  ].filter((row) => row.value);

  const stats = [
    { label: "Appearances", value: player.stats?.appearances },
    { label: "Goals", value: player.stats?.goals ?? (goals || undefined) },
    { label: "Assists", value: player.stats?.assists },
    { label: "Clean sheets", value: player.stats?.cleanSheets },
  ].filter((stat) => typeof stat.value === "number");

  return (
    <>
      <JsonLd data={[playerSchema(player), breadcrumbSchema(trail)]} />

      {/* --- Hero (§28) -------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-pitch-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="takeover-grid absolute inset-0 -z-10 opacity-60" />

        <Container>
          <Breadcrumbs trail={trail} />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-16">
            <div className="relative aspect-4/5 max-w-sm overflow-hidden rounded-2xl border border-cream/12">
              <PlayerAvatar player={player} sizes="(max-width: 1024px) 100vw, 420px" />
              {player.number ? (
                <span
                  aria-hidden
                  className="display absolute bottom-3 right-4 text-7xl leading-none text-cream/12"
                >
                  {player.number}
                </span>
              ) : null}
            </div>

            <div>
              <Eyebrow>{team?.name ?? player.ageGroup}</Eyebrow>
              <h1 className="display mt-5 text-5xl text-cream sm:text-6xl lg:text-7xl">
                {player.name}
              </h1>
              {player.alias ? (
                <p className="mt-3 text-xl italic text-gold-400">“{player.alias}”</p>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-2">
                <Pill>{player.role ?? player.position}</Pill>
                {player.number ? <Pill tone="gold">No. {player.number}</Pill> : null}
                {player.status !== "active" ? (
                  <Pill tone="neutral">
                    {player.status === "injured"
                      ? "Injured"
                      : player.status === "academy"
                        ? "Academy"
                        : "Graduate"}
                  </Pill>
                ) : null}
              </div>

              {!player.photo ? (
                <p className="mt-6 max-w-md text-xs leading-relaxed text-cream/35">
                  Portrait to follow. The club does not attribute photographs to
                  individual players until each image is identified.
                </p>
              ) : null}
            </div>
          </div>
        </Container>

        <TakeoverLine className="absolute inset-x-0 bottom-0" />
      </section>

      {/* --- Profile + statistics --------------------------------------- */}
      <Section className="bg-pitch-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
            {/* Biography */}
            <Reveal>
              <h2 className="display text-3xl text-cream sm:text-4xl">Player profile</h2>
              <div className="mt-7 space-y-5 text-base leading-relaxed text-cream/70">
                {player.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {player.journey && player.journey.length > 0 ? (
                <div className="mt-14">
                  <h2 className="display text-3xl text-cream sm:text-4xl">
                    Football journey
                  </h2>
                  <ol className="mt-8 space-y-8 border-l border-cream/12 pl-8">
                    {player.journey.map((step) => (
                      <li key={step.label} className="relative">
                        <span
                          aria-hidden
                          className="absolute -left-[2.28rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-pitch-950 bg-gold-400"
                        />
                        <h3 className="text-base font-bold text-cream">{step.label}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-cream/60">
                          {step.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {player.quote ? (
                <blockquote className="mt-14 border-l-2 border-gold-400 pl-7">
                  <p className="display text-2xl leading-tight text-cream sm:text-3xl">
                    “{player.quote.text}”
                  </p>
                  {player.quote.attribution ? (
                    <footer className="mt-4 text-xs uppercase tracking-[0.16em] text-cream/40">
                      {player.quote.attribution}
                    </footer>
                  ) : null}
                </blockquote>
              ) : null}
            </Reveal>

            {/* Facts panel */}
            <Reveal delay={120}>
              <div className="sticky top-28 space-y-6">
                <div className="rounded-xl border border-cream/12 bg-pitch-900/60 p-7">
                  <h2 className="eyebrow text-gold-500">Profile</h2>
                  <dl className="mt-5 divide-y divide-cream/8">
                    {profileRows.map((row) => (
                      <div key={row.label} className="flex justify-between gap-4 py-3">
                        <dt className="text-sm text-cream/45">{row.label}</dt>
                        <dd className="text-right text-sm font-semibold text-cream">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {stats.length > 0 ? (
                  <div className="rounded-xl border border-cream/12 bg-pitch-900/60 p-7">
                    <h2 className="eyebrow text-gold-500">Statistics</h2>
                    <dl className="mt-5 grid grid-cols-2 gap-5">
                      {stats.map((stat) => (
                        <div key={stat.label}>
                          <dd className="display text-4xl text-cream tabular-nums">
                            {stat.value}
                          </dd>
                          <dt className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-cream/40">
                            {stat.label}
                          </dt>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}

                {player.achievements && player.achievements.length > 0 ? (
                  <div className="rounded-xl border border-gold-400/25 bg-gold-400/[0.05] p-7">
                    <h2 className="eyebrow text-gold-400">Achievements</h2>
                    <ul className="mt-5 space-y-3">
                      {player.achievements.map((achievement) => (
                        <li key={achievement} className="flex gap-3 text-sm text-cream/80">
                          <svg
                            aria-hidden
                            viewBox="0 0 14 14"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400"
                          >
                            <path
                              d="M7 1l1.8 3.9 4.2.5-3.1 2.9.8 4.2L7 10.5 3.3 12.5l.8-4.2L1 5.4l4.2-.5z"
                              fill="currentColor"
                            />
                          </svg>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --- Photo gallery ---------------------------------------------- */}
      {player.gallery && player.gallery.length > 0 ? (
        <Section spacing="tight" className="border-t border-cream/8 bg-pitch-900/30">
          <Container>
            <h2 className="display text-3xl text-cream sm:text-4xl">Photo gallery</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {player.gallery.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={src}
                    alt={`${player.name} — club photography`}
                    fill
                    sizes="(max-width: 640px) 50vw, 300px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --- Related stories --------------------------------------------- */}
      {relatedStories.length > 0 ? (
        <Section className="border-t border-cream/8 bg-pitch-950">
          <Container>
            <h2 className="display text-3xl text-cream sm:text-4xl">Related stories</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {relatedStories.map((article, index) => (
                <Reveal key={article.slug} delay={index * 80}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --- Teammates ---------------------------------------------------- */}
      {teammates.length > 0 ? (
        <Section spacing="tight" className="border-t border-cream/8 bg-emerald-900/20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-3xl text-cream sm:text-4xl">
                More from the {team?.name ?? "squad"}
              </h2>
              <Link
                href="/players"
                className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-gold-400 transition-colors hover:text-gold-300"
              >
                All players →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {teammates.slice(0, 5).map((teammate) => (
                <PlayerCard key={teammate.slug} player={teammate} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="tight" className="bg-pitch-950">
        <Container>
          <div className="flex flex-wrap gap-3">
            <Cta href="/players" variant="outline">
              Back to all players
            </Cta>
            <Cta href="/join#player">Join Takeover</Cta>
          </div>
        </Container>
      </Section>
    </>
  );
}
