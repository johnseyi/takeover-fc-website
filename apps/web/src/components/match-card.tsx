import Image from "next/image";
import Link from "next/link";
import type { Match } from "@/lib/types";
import { getTeam } from "@/content/teams";
import { site } from "@/content/site";
import { cn, formatShortDate, formatTime, resultLetter } from "@/lib/utils";

const resultStyles = {
  W: "border-emerald-400/50 bg-emerald-400/12 text-emerald-300",
  D: "border-cream/25 bg-cream/8 text-cream/70",
  L: "border-red-400/40 bg-red-400/10 text-red-300",
} as const;

/** A fixture or result row — the workhorse of §29. */
export function MatchCard({ match }: { match: Match }) {
  const team = getTeam(match.team);
  const played = match.status === "played" && match.score;
  const letter = resultLetter(match.score);

  const home = match.home ? site.shortName : match.opponent;
  const away = match.home ? match.opponent : site.shortName;
  const homeScore = match.home ? match.score?.takeover : match.score?.opponent;
  const awayScore = match.home ? match.score?.opponent : match.score?.takeover;

  const inner = (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em]">
        <span className="text-gold-500">{match.competition}</span>
        <span aria-hidden className="text-cream/20">
          /
        </span>
        <span className="text-cream/45">{team?.shortName ?? match.team}</span>
        {played && letter ? (
          <span
            className={cn(
              "ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full border text-[0.6875rem]",
              resultStyles[letter],
            )}
          >
            {letter}
          </span>
        ) : (
          <span className="ml-auto text-emerald-400">
            {match.home ? "Home" : "Away"}
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <p
          className={cn(
            "display text-right text-xl leading-tight sm:text-2xl",
            home === site.shortName ? "text-cream" : "text-cream/60",
          )}
        >
          {home}
        </p>

        <div className="flex min-w-16 items-center justify-center">
          {played ? (
            <span className="display rounded-md bg-cream/8 px-3 py-1.5 text-2xl text-gold-300 tabular-nums sm:text-3xl">
              {homeScore}–{awayScore}
            </span>
          ) : (
            <span className="display text-lg text-cream/30 sm:text-xl">vs</span>
          )}
        </div>

        <p
          className={cn(
            "display text-left text-xl leading-tight sm:text-2xl",
            away === site.shortName ? "text-cream" : "text-cream/60",
          )}
        >
          {away}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-cream/8 pt-4 text-xs text-cream/50">
        <span>{formatShortDate(match.kickoff)}</span>
        {!played ? (
          <>
            <span aria-hidden className="text-cream/20">
              ·
            </span>
            <span>{formatTime(match.kickoff)} EAT</span>
          </>
        ) : null}
        <span aria-hidden className="text-cream/20">
          ·
        </span>
        <span className="truncate">{match.venue}</span>
      </div>
    </>
  );

  const shell =
    "group relative block overflow-hidden rounded-xl border border-cream/10 bg-pitch-900/70 p-5 transition-all duration-400 sm:p-6";

  if (!played) {
    return <div className={shell}>{inner}</div>;
  }

  return (
    <Link href={`/matches/${match.slug}`} className={cn(shell, "hover:border-gold-400/40")}>
      <div
        aria-hidden
        className="takeover-line absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {inner}
      <span className="mt-4 inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/45 transition-colors group-hover:text-gold-300">
        Match centre
        <svg aria-hidden viewBox="0 0 12 10" className="h-2.5 w-3">
          <path
            d="M1 5h9M6.5 1L10.5 5 6.5 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

/** The prominent NEXT MATCH block on the homepage (§11). */
export function NextMatchPanel({ match }: { match: Match }) {
  const team = getTeam(match.team);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cream/12 bg-pitch-900">
      <Image
        src="/images/match-shoulder-to-shoulder.jpg"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 1100px"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-linear-to-r from-pitch-950 via-pitch-950/85 to-pitch-950/40" />

      <div className="relative p-7 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="eyebrow text-gold-400">Next Match</span>
          <span aria-hidden className="h-px w-8 bg-gold-500/50" />
          <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/50">
            {team?.name} · {match.competition}
          </span>
        </div>

        {/* Both columns are explicitly bounded so a long opponent name can never
            overflow into the fixture details beside it. */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
          <div className="min-w-0">
            <p className="display text-4xl break-words text-cream sm:text-5xl lg:text-6xl">
              {site.shortName}
            </p>
            <p className="display my-2 text-xl text-gold-400/80 sm:text-2xl">vs</p>
            <p className="display text-4xl break-words text-cream/85 sm:text-5xl lg:text-6xl">
              {match.opponent}
            </p>
          </div>

          <dl className="grid min-w-0 grid-cols-3 gap-5 lg:gap-6">
            <div>
              <dt className="eyebrow text-cream/40">Date</dt>
              <dd className="mt-2 text-sm font-semibold text-cream sm:text-base">
                {formatShortDate(match.kickoff)}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-cream/40">Time</dt>
              <dd className="mt-2 text-sm font-semibold text-cream sm:text-base">
                {formatTime(match.kickoff)} EAT
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-cream/40">Venue</dt>
              <dd className="mt-2 text-sm font-semibold break-words text-cream sm:text-base">
                {match.venue}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
