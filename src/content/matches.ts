/**
 * Fixtures, results and match centre data — master plan §§29–30.
 *
 * ⚠️  EVERY MATCH BELOW IS PLACEHOLDER DATA. No real Takeover FC fixture,
 * scoreline, goalscorer or line-up is recorded here. The records exist so the
 * fixtures tabs, match centre, countdown and statistics can be reviewed with a
 * realistic dataset. Delete them and enter real matches before launch.
 *
 * Run `npm run check:content` to list every placeholder record in the project.
 */

import type { Match } from "@/lib/types";

/** Kick-off times are ISO 8601 in East Africa Time (UTC+03:00). */
export const matches: Match[] = [
  /* ---------------- Upcoming ---------------- */
  {
    slug: "senior-vs-nsambya-united-2026-09-05",
    team: "senior",
    opponent: "Nsambya United",
    home: true,
    kickoff: "2026-09-05T16:00:00+03:00",
    venue: "Namuwongo Community Ground, Kampala",
    competition: "Kampala Community League",
    status: "scheduled",
    placeholder: true,
  },
  {
    slug: "u17-vs-kabalagala-youth-2026-09-12",
    team: "under-17",
    opponent: "Kabalagala Youth",
    home: false,
    kickoff: "2026-09-12T10:00:00+03:00",
    venue: "Kabalagala Playground, Kampala",
    competition: "Kampala Youth Championship",
    status: "scheduled",
    placeholder: true,
  },
  {
    slug: "senior-vs-kansanga-fc-2026-09-19",
    team: "senior",
    opponent: "Kansanga FC",
    home: true,
    kickoff: "2026-09-19T16:00:00+03:00",
    venue: "Namuwongo Community Ground, Kampala",
    competition: "Kampala Community League",
    status: "scheduled",
    placeholder: true,
  },
  {
    slug: "u17-vs-ggaba-academy-2026-09-26",
    team: "under-17",
    opponent: "Ggaba Academy",
    home: true,
    kickoff: "2026-09-26T10:00:00+03:00",
    venue: "Namuwongo Community Ground, Kampala",
    competition: "Kampala Youth Championship",
    status: "scheduled",
    placeholder: true,
  },
  {
    slug: "senior-vs-katwe-rangers-2026-10-03",
    team: "senior",
    opponent: "Katwe Rangers",
    home: false,
    kickoff: "2026-10-03T16:00:00+03:00",
    venue: "Katwe Grounds, Kampala",
    competition: "Kampala Community League",
    status: "scheduled",
    placeholder: true,
  },

  /* ---------------- Played ---------------- */
  {
    slug: "senior-vs-kabalagala-fc-2026-08-08",
    team: "senior",
    opponent: "Kabalagala FC",
    home: true,
    kickoff: "2026-08-08T16:00:00+03:00",
    venue: "Namuwongo Community Ground, Kampala",
    competition: "Kampala Community League",
    status: "played",
    score: { takeover: 3, opponent: 1 },
    playerOfTheMatch: "Moses Lubega",
    lineup: [
      "Brian Okello",
      "Ivan Ssekandi",
      "Samuel Wasswa",
      "Joseph Mukisa",
      "Daniel Kamya",
      "Moses Lubega",
      "Imran Yasin",
      "Patrick Ochieng",
      "Elias Nabimanya",
      "Allan Byaruhanga",
      "Hakim Ssentongo",
    ],
    substitutes: ["Isaac Tumwine", "Raymond Kizza", "Kenneth Gidudu"],
    events: [
      { minute: 18, type: "goal", player: "Patrick Ochieng", team: "takeover", detail: "Assisted by Moses Lubega" },
      { minute: 34, type: "yellow", player: "Daniel Kamya", team: "takeover" },
      { minute: 41, type: "goal", player: "Kabalagala FC", team: "opponent" },
      { minute: 63, type: "goal", player: "Moses Lubega", team: "takeover" },
      { minute: 77, type: "substitution", player: "Kenneth Gidudu", team: "takeover", detail: "On for Allan Byaruhanga" },
      { minute: 88, type: "goal", player: "Patrick Ochieng", team: "takeover", detail: "Assisted by Joseph Mukisa" },
    ],
    statistics: [
      { label: "Possession %", takeover: 56, opponent: 44 },
      { label: "Shots", takeover: 14, opponent: 8 },
      { label: "Shots on target", takeover: 7, opponent: 3 },
      { label: "Corners", takeover: 6, opponent: 4 },
      { label: "Fouls", takeover: 11, opponent: 14 },
    ],
    report: [
      "Placeholder match report. Replace with the club's own coverage before launch.",
      "A structured second-half performance settled a match that had been in the balance at the interval, with the midfield taking control after the hour mark.",
    ],
    photos: ["/images/match-driving-forward.jpg", "/images/player-celebration.jpg"],
    placeholder: true,
  },
  {
    slug: "u17-vs-muyenga-youth-2026-08-01",
    team: "under-17",
    opponent: "Muyenga Youth",
    home: false,
    kickoff: "2026-08-01T10:00:00+03:00",
    venue: "Muyenga Playground, Kampala",
    competition: "Kampala Youth Championship",
    status: "played",
    score: { takeover: 2, opponent: 2 },
    playerOfTheMatch: "Kenneth Gidudu",
    events: [
      { minute: 12, type: "goal", player: "Hakim Ssentongo", team: "takeover" },
      { minute: 29, type: "goal", player: "Muyenga Youth", team: "opponent" },
      { minute: 55, type: "goal", player: "Muyenga Youth", team: "opponent" },
      { minute: 81, type: "goal", player: "Allan Byaruhanga", team: "takeover", detail: "Assisted by Kenneth Gidudu" },
    ],
    statistics: [
      { label: "Possession %", takeover: 49, opponent: 51 },
      { label: "Shots", takeover: 10, opponent: 11 },
      { label: "Shots on target", takeover: 5, opponent: 5 },
      { label: "Corners", takeover: 3, opponent: 5 },
      { label: "Fouls", takeover: 9, opponent: 12 },
    ],
    report: [
      "Placeholder match report. Replace with the club's own coverage before launch.",
      "A late equaliser rescued a point in a match the Under-17s had led inside the opening quarter of an hour.",
    ],
    photos: ["/images/match-shielding-ball.jpg"],
    placeholder: true,
  },
  {
    slug: "senior-vs-soweto-fc-2026-07-25",
    team: "senior",
    opponent: "Soweto FC",
    home: false,
    kickoff: "2026-07-25T16:00:00+03:00",
    venue: "Soweto Grounds, Kampala",
    competition: "Kampala Community League",
    status: "played",
    score: { takeover: 1, opponent: 2 },
    playerOfTheMatch: "Brian Okello",
    events: [
      { minute: 22, type: "goal", player: "Soweto FC", team: "opponent" },
      { minute: 49, type: "goal", player: "Imran Yasin", team: "takeover" },
      { minute: 71, type: "red", player: "Samuel Wasswa", team: "takeover" },
      { minute: 84, type: "goal", player: "Soweto FC", team: "opponent" },
    ],
    statistics: [
      { label: "Possession %", takeover: 52, opponent: 48 },
      { label: "Shots", takeover: 9, opponent: 13 },
      { label: "Shots on target", takeover: 4, opponent: 6 },
      { label: "Corners", takeover: 4, opponent: 7 },
      { label: "Fouls", takeover: 15, opponent: 10 },
    ],
    report: [
      "Placeholder match report. Replace with the club's own coverage before launch.",
      "A dismissal on the hour changed the shape of the contest, and the hosts found a winner late.",
    ],
    photos: ["/images/match-shoulder-to-shoulder.jpg"],
    placeholder: true,
  },
  {
    slug: "u17-vs-nsambya-boys-2026-07-18",
    team: "under-17",
    opponent: "Nsambya Boys",
    home: true,
    kickoff: "2026-07-18T10:00:00+03:00",
    venue: "Namuwongo Community Ground, Kampala",
    competition: "Kampala Youth Championship",
    status: "played",
    score: { takeover: 4, opponent: 0 },
    playerOfTheMatch: "Hakim Ssentongo",
    events: [
      { minute: 9, type: "goal", player: "Hakim Ssentongo", team: "takeover" },
      { minute: 31, type: "goal", player: "Hakim Ssentongo", team: "takeover" },
      { minute: 58, type: "goal", player: "Kenneth Gidudu", team: "takeover" },
      { minute: 74, type: "goal", player: "Allan Byaruhanga", team: "takeover" },
    ],
    statistics: [
      { label: "Possession %", takeover: 63, opponent: 37 },
      { label: "Shots", takeover: 17, opponent: 5 },
      { label: "Shots on target", takeover: 9, opponent: 1 },
      { label: "Corners", takeover: 8, opponent: 2 },
      { label: "Fouls", takeover: 7, opponent: 13 },
    ],
    report: [
      "Placeholder match report. Replace with the club's own coverage before launch.",
      "The Under-17s' most complete performance of the season so far, settled well before the hour.",
    ],
    photos: ["/images/match-first-touch.jpg"],
    placeholder: true,
  },
];

/* ------------------------------------------------------------------ *
 * Selectors
 * ------------------------------------------------------------------ */

const byKickoffAsc = (a: Match, b: Match) =>
  new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime();

const byKickoffDesc = (a: Match, b: Match) =>
  new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime();

export function getUpcomingMatches(now: Date = new Date()): Match[] {
  return matches
    .filter((m) => m.status === "scheduled" && new Date(m.kickoff) >= now)
    .sort(byKickoffAsc);
}

export function getResults(): Match[] {
  return matches.filter((m) => m.status === "played").sort(byKickoffDesc);
}

/**
 * The single next fixture across all squads, or null when nothing is scheduled
 * — in which case the homepage shows "The next chapter is being built." (§11).
 */
export function getNextMatch(now: Date = new Date()): Match | null {
  return getUpcomingMatches(now)[0] ?? null;
}

export function getMatch(slug: string): Match | undefined {
  return matches.find((m) => m.slug === slug);
}

/** Aggregate goals for a named player across every recorded result. */
export function getGoalsFor(playerName: string): number {
  return matches
    .filter((m) => m.status === "played")
    .flatMap((m) => m.events ?? [])
    .filter((e) => e.type === "goal" && e.team === "takeover" && e.player === playerName)
    .length;
}

/** Simple club record derived from results — used on the fixtures page. */
export function getRecord() {
  const played = getResults();
  return {
    played: played.length,
    won: played.filter((m) => (m.score?.takeover ?? 0) > (m.score?.opponent ?? 0)).length,
    drawn: played.filter((m) => m.score && m.score.takeover === m.score.opponent).length,
    lost: played.filter((m) => (m.score?.takeover ?? 0) < (m.score?.opponent ?? 0)).length,
    goalsFor: played.reduce((sum, m) => sum + (m.score?.takeover ?? 0), 0),
    goalsAgainst: played.reduce((sum, m) => sum + (m.score?.opponent ?? 0), 0),
  };
}
