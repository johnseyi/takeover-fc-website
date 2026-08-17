"use client";

import { useState } from "react";
import { MatchCard } from "@/components/match-card";
import { EmptyState } from "@/components/ui";
import type { Match } from "@/lib/types";
import { cn } from "@/lib/utils";

type TabId = "upcoming" | "results" | "fixtures" | "table";

const TABS: { id: TabId; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "results", label: "Results" },
  { id: "fixtures", label: "Fixtures" },
  { id: "table", label: "Table" },
];

/** Group matches by "September 2026" for the full fixture list. */
function groupByMonth(matches: Match[]) {
  const groups = new Map<string, Match[]>();

  for (const match of matches) {
    const key = new Date(match.kickoff).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "Africa/Kampala",
    });
    groups.set(key, [...(groups.get(key) ?? []), match]);
  }

  return Array.from(groups.entries());
}

export function FixturesTabs({
  upcoming,
  results,
  initialTab = "upcoming",
}: {
  upcoming: Match[];
  results: Match[];
  initialTab?: TabId;
}) {
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <div>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Fixtures and results"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        {TABS.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.14em] transition-colors",
                selected
                  ? "border-gold-400 bg-gold-400 text-pitch-950"
                  : "border-cream/18 text-cream/60 hover:border-cream/40 hover:text-cream",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {/* Upcoming — the next few matches across all squads. */}
        <div
          role="tabpanel"
          id="panel-upcoming"
          aria-labelledby="tab-upcoming"
          hidden={tab !== "upcoming"}
        >
          {upcoming.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {upcoming.slice(0, 4).map((match) => (
                <MatchCard key={match.slug} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="The next chapter is being built."
              description="No matches are currently scheduled. Fixtures will appear here as soon as the club's next competition dates are confirmed."
              action={{ label: "Follow the club", href: "/news" }}
            />
          )}
        </div>

        {/* Results */}
        <div
          role="tabpanel"
          id="panel-results"
          aria-labelledby="tab-results"
          hidden={tab !== "results"}
        >
          {results.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {results.map((match) => (
                <MatchCard key={match.slug} match={match} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No results recorded yet."
              description="Match results, scorers and reports will be published here after each fixture."
            />
          )}
        </div>

        {/* Full fixture list, grouped by month */}
        <div
          role="tabpanel"
          id="panel-fixtures"
          aria-labelledby="tab-fixtures"
          hidden={tab !== "fixtures"}
        >
          {upcoming.length > 0 ? (
            <div className="space-y-12">
              {groupByMonth(upcoming).map(([month, monthMatches]) => (
                <section key={month}>
                  <h3 className="display text-2xl text-gold-400 sm:text-3xl">{month}</h3>
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {monthMatches.map((match) => (
                      <MatchCard key={match.slug} match={match} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No fixtures scheduled."
              description="The full fixture list will be published once competition dates are confirmed."
            />
          )}
        </div>

        {/* League table — honest empty state until a table applies (§50). */}
        <div
          role="tabpanel"
          id="panel-table"
          aria-labelledby="tab-table"
          hidden={tab !== "table"}
        >
          <EmptyState
            title="No league table to show yet."
            description="A standings table will appear here once Takeover FC is competing in a league that publishes one. Until then, results are the honest record."
            action={{ label: "See results", href: "/fixtures-results" }}
          />
        </div>
      </div>
    </div>
  );
}
