import Image from "next/image";
import Link from "next/link";
import type { Player } from "@/lib/types";
import { cn, initials } from "@/lib/utils";

/**
 * Crest avatar fallback.
 *
 * No supplied photograph is attributed to a named individual — we cannot verify
 * who is in each frame, and misidentifying a young player is not a risk worth
 * taking for a nicer card. Profiles show a crest-and-initials portrait until the
 * club supplies identified images.
 */
export function PlayerAvatar({
  player,
  className,
  sizes,
}: {
  player: Player;
  className?: string;
  sizes?: string;
}) {
  if (player.photo) {
    return (
      <Image
        src={player.photo}
        alt={player.photoAlt ?? player.name}
        fill
        sizes={sizes ?? "(max-width: 640px) 50vw, 300px"}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "takeover-grid absolute inset-0 flex flex-col items-center justify-center bg-linear-to-b from-emerald-900 to-pitch-950",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt=""
        width={101}
        height={128}
        className="h-20 w-auto opacity-70 sm:h-24"
      />
      <span
        aria-hidden
        className="display mt-4 text-3xl text-cream/25 sm:text-4xl"
      >
        {initials(player.name)}
      </span>
    </div>
  );
}

const statusLabels: Record<Player["status"], string> = {
  active: "Squad",
  academy: "Academy",
  injured: "Injured",
  graduate: "Graduate",
};

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link
      href={`/players/${player.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-cream/10 bg-pitch-900 transition-all duration-500 hover:border-gold-400/40"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <PlayerAvatar
          player={player}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Squad number, set into the corner like a shirt print. */}
        {player.number ? (
          <span
            aria-hidden
            className="display absolute right-3 top-2 text-5xl leading-none text-cream/15 transition-colors duration-500 group-hover:text-gold-400/40 sm:text-6xl"
          >
            {player.number}
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-pitch-950 to-transparent" />

        {player.status !== "active" ? (
          <span className="absolute left-3 top-3 rounded-full border border-gold-400/40 bg-pitch-950/80 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-gold-300">
            {statusLabels[player.status]}
          </span>
        ) : null}
      </div>

      <div className="relative px-4 pb-5 pt-3">
        <div
          aria-hidden
          className="takeover-line absolute inset-x-4 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-gold-500">
          {player.role ?? player.position}
        </p>
        <h3 className="display mt-2 text-xl text-cream transition-colors duration-300 group-hover:text-gold-300 sm:text-2xl">
          {player.name}
        </h3>
        {player.alias ? (
          <p className="mt-1 text-xs italic text-cream/45">“{player.alias}”</p>
        ) : null}
      </div>
    </Link>
  );
}
