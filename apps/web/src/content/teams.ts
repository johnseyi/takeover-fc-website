/**
 * Squads — master plan §26.
 * The senior team and Under-17 are the club's active squads. The academy and
 * girls' programme are presented honestly as planned, not as if they exist.
 */

import type { Team } from "@/lib/types";

export const teams: Team[] = [
  {
    id: "senior",
    name: "Senior Team",
    shortName: "Senior",
    ageGroup: "Senior",
    status: "active",
    summary:
      "The club's first team, and the standard every other squad is measured against.",
    description: [
      "The senior team is where the club's identity is most visible: community players, competing week to week, representing the neighbourhoods they come from.",
      "It is also the destination the rest of the club's structure points toward — the proof that a pathway from community football into an organised squad genuinely exists.",
    ],
    image: "/images/senior-team-lineup.jpg",
    imageAlt:
      "The Takeover FC senior team lined up in white and green kit before a match",
    coachSlugs: ["head-coach", "goalkeeping-coach"],
  },
  {
    id: "under-17",
    name: "Under-17",
    shortName: "U17",
    ageGroup: "Under-17",
    status: "active",
    summary:
      "The club's youth squad, where development is the result and the scoreline is the by-product.",
    description: [
      "The Under-17 side is the heart of the club's youth work. Players here are still in school, still growing into their bodies, and still learning what commitment to a team actually costs.",
      "The squad is coached with that in mind: technique and game understanding first, results as the consequence of getting the rest right.",
    ],
    image: "/images/squad-portrait-five.jpg",
    imageAlt: "Five Takeover FC Under-17 players standing together in club kit",
    coachSlugs: ["under-17-coach"],
  },
  {
    id: "academy",
    name: "Takeover FC Academy",
    shortName: "Academy",
    ageGroup: "Youth",
    status: "planned",
    summary: "The next generation starts here.",
    description: [
      "A structured youth academy is the club's next major step: consistent coaching, education support and a defined pathway from community football into the Under-17 and senior squads.",
      "The academy is in development. We would rather build it properly than announce it early.",
    ],
    image: "/images/squad-portrait-trio.jpg",
    imageAlt: "Three young Takeover FC players in club shirts after a match",
  },
  {
    id: "girls",
    name: "Girls' Football",
    shortName: "Girls",
    ageGroup: "Youth",
    status: "planned",
    summary: "A pathway in development.",
    description: [
      "Football opportunities should not be limited by gender. Establishing a girls' programme is part of the club's long-term development strategy.",
      "This is a future programme, and we will present it as one until the first session is on the ground.",
    ],
  },
];

export function getTeam(id: string): Team | undefined {
  return teams.find((team) => team.id === id);
}
