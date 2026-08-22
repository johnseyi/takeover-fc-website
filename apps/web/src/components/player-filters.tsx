"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PlayerCard } from "@/components/player-card";
import { teams } from "@/content/teams";
import type { Player } from "@/lib/types";
import { cn } from "@/lib/utils";

type FilterKey = "team" | "position" | "ageGroup" | "nationality" | "status";

const ALL = "all";

const statusLabels: Record<string, string> = {
  active: "Squad",
  academy: "Academy",
  injured: "Injured",
  graduate: "Graduate",
};

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (next: string) => void;
}) {
  // A single-choice filter set; radiogroup keeps it navigable by keyboard.
  return (
    <fieldset>
      <legend className="eyebrow text-cream/40">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {[{ value: ALL, label: "All" }, ...options].map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors",
                selected
                  ? "border-gold-400 bg-gold-400 text-pitch-950"
                  : "border-cream/18 text-cream/60 hover:border-cream/40 hover:text-cream",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Searchable, filterable player database (§27). */
export function PlayerFilters({ players }: { players: Player[] }) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    team: searchParams.get("team") ?? ALL,
    position: ALL,
    ageGroup: ALL,
    nationality: ALL,
    status: ALL,
  });
  const [query, setQuery] = useState("");

  const options = useMemo(() => {
    const unique = (key: keyof Player) =>
      Array.from(new Set(players.map((p) => String(p[key])))).sort();

    return {
      team: teams
        .filter((team) => players.some((p) => p.team === team.id))
        .map((team) => ({ value: team.id, label: team.name })),
      position: unique("position").map((v) => ({ value: v, label: v })),
      ageGroup: unique("ageGroup").map((v) => ({ value: v, label: v })),
      nationality: unique("nationality").map((v) => ({ value: v, label: v })),
      status: unique("status").map((v) => ({ value: v, label: statusLabels[v] ?? v })),
    };
  }, [players]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return players.filter((player) => {
      if (filters.team !== ALL && player.team !== filters.team) return false;
      if (filters.position !== ALL && player.position !== filters.position) return false;
      if (filters.ageGroup !== ALL && player.ageGroup !== filters.ageGroup) return false;
      if (filters.nationality !== ALL && player.nationality !== filters.nationality)
        return false;
      if (filters.status !== ALL && player.status !== filters.status) return false;

      if (needle) {
        const haystack = [
          player.name,
          player.alias,
          player.role,
          player.position,
          String(player.number ?? ""),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }

      return true;
    });
  }, [players, filters, query]);

  const set = (key: FilterKey) => (value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const isFiltered =
    query.trim() !== "" || Object.values(filters).some((value) => value !== ALL);

  const reset = () => {
    setFilters({
      team: ALL,
      position: ALL,
      ageGroup: ALL,
      nationality: ALL,
      status: ALL,
    });
    setQuery("");
  };

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <label htmlFor="player-search" className="sr-only">
          Search players by name, position or squad number
        </label>
        <input
          id="player-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, position or squad number"
          className="w-full rounded-full border border-cream/15 bg-cream/[0.04] px-6 py-4 text-sm text-cream placeholder:text-cream/35 focus:border-gold-400/60 focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <FilterGroup label="Team" value={filters.team} options={options.team} onChange={set("team")} />
        <FilterGroup
          label="Position"
          value={filters.position}
          options={options.position}
          onChange={set("position")}
        />
        <FilterGroup
          label="Age group"
          value={filters.ageGroup}
          options={options.ageGroup}
          onChange={set("ageGroup")}
        />
        <FilterGroup
          label="Nationality"
          value={filters.nationality}
          options={options.nationality}
          onChange={set("nationality")}
        />
        <FilterGroup
          label="Status"
          value={filters.status}
          options={options.status}
          onChange={set("status")}
        />
      </div>

      {/* Result count */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-6">
        <p aria-live="polite" className="text-sm text-cream/55">
          {filtered.length} {filtered.length === 1 ? "player" : "players"}
        </p>
        {isFiltered ? (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-bold uppercase tracking-[0.14em] text-gold-400 transition-colors hover:text-gold-300"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((player) => (
            <PlayerCard key={player.slug} player={player} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-cream/50">
          No players match those filters.
        </p>
      )}
    </div>
  );
}
