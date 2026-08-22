/**
 * Players and staff.
 *
 * ⚠️  REAL vs PLACEHOLDER
 * Only two player records are drawn from documented club information: Kenneth
 * Gidudu and Imran Yasin ("Santos"), both named in §35 of the master plan.
 * Every other player and every staff member is marked `placeholder: true` and
 * exists purely so the squad, filtering and profile pages can be reviewed with
 * a realistic amount of data. Replace or delete them before launch.
 *
 * Run `npm run check:content` to list every placeholder record in the project.
 *
 * ⚠️  PORTRAITS
 * No supplied photograph is attributed to a named individual, because we cannot
 * confirm who is in each frame. Profiles therefore render a crest avatar until
 * the club provides identified portraits. Set `photo` once you have them.
 */

import type { Player, StaffMember } from "@/lib/types";

export const players: Player[] = [
  /* ------------------------------------------------------------------ *
   * Documented players
   * ------------------------------------------------------------------ */
  {
    slug: "kenneth-gidudu",
    name: "Kenneth Gidudu",
    position: "Midfielder",
    role: "Captain / Under-17",
    team: "under-17",
    nationality: "Ugandan",
    ageGroup: "Under-17",
    status: "active",
    school: "Standard High School Zana — Ndeje Campus",
    bio: [
      "Kenneth captains the Takeover FC Under-17 side, and he leads the way most young captains have to at this level — by being the most consistent person on the pitch rather than the loudest.",
      "He came through community football in the neighbourhoods the club was built in, and his development has tracked the club's own: more structure, more discipline, more responsibility each season.",
      "Alongside his football, Kenneth is a student at Standard High School Zana — Ndeje Campus, where his leadership within the squad has become one of the clearest examples of what the club is trying to build.",
    ],
    journey: [
      {
        label: "Community football",
        detail:
          "Introduced to organised football through Takeover FC's work in the surrounding communities.",
      },
      {
        label: "Under-17 squad",
        detail: "Established himself as a regular in the club's Under-17 team.",
      },
      {
        label: "Captain",
        detail:
          "Appointed captain of the Under-17 side, taking responsibility for standards on and off the pitch.",
      },
    ],
    achievements: ["Captain of the Takeover FC Under-17 team"],
    quote: {
      text: "We don't simply develop footballers. We develop young people through football.",
      attribution: "The club standard Kenneth leads by",
    },
  },
  {
    slug: "imran-yasin",
    name: "Imran Yasin",
    alias: "Santos",
    position: "Midfielder",
    role: "Senior Team",
    team: "senior",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    school: "Standard High School Zana — Ndeje Campus",
    bio: [
      'Known throughout the club as "Santos", Imran Yasin is one of the clearest examples of what leadership looks like at Takeover FC.',
      "He captained the senior team at Standard High School Zana — Ndeje Campus, and the side's record under his leadership speaks for itself: the Post Primary Championship, the District Championship and the Regional Championship.",
      "That combination — a player who wins and who raises the standard of the people around him — is exactly the profile the club is trying to produce.",
    ],
    journey: [
      {
        label: "Community football",
        detail: "Came through football in the communities Takeover FC serves.",
      },
      {
        label: "School captaincy",
        detail:
          "Captained the senior team at Standard High School Zana — Ndeje Campus.",
      },
      {
        label: "Championship run",
        detail:
          "Led the side to the Post Primary, District and Regional Championships.",
      },
    ],
    achievements: [
      "Post Primary Championship",
      "District Championship",
      "Regional Championship",
      "Captain, Standard High School Zana — Ndeje Campus senior team",
    ],
    quote: {
      text: "Talent without discipline cannot build a lasting career.",
      attribution: "Takeover FC core value",
    },
  },

  /* ------------------------------------------------------------------ *
   * PLACEHOLDER squad — demo data only. Replace before launch.
   * ------------------------------------------------------------------ */
  {
    slug: "brian-okello",
    name: "Brian Okello",
    position: "Goalkeeper",
    role: "Goalkeeper",
    team: "senior",
    number: 1,
    height: "1.87m",
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    bio: [
      "Placeholder profile. Replace with the player's real biography before launch.",
    ],
    stats: { appearances: 14, cleanSheets: 5, goals: 0, assists: 0 },
    placeholder: true,
  },
  {
    slug: "samuel-wasswa",
    name: "Samuel Wasswa",
    position: "Defender",
    role: "Centre-back",
    team: "senior",
    number: 4,
    height: "1.82m",
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 15, goals: 2, assists: 1 },
    placeholder: true,
  },
  {
    slug: "joseph-mukisa",
    name: "Joseph Mukisa",
    position: "Defender",
    role: "Left-back",
    team: "senior",
    number: 3,
    preferredFoot: "Left",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 13, goals: 0, assists: 3 },
    placeholder: true,
  },
  {
    slug: "ivan-ssekandi",
    name: "Ivan Ssekandi",
    position: "Defender",
    role: "Right-back",
    team: "senior",
    number: 2,
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 12, goals: 1, assists: 2 },
    placeholder: true,
  },
  {
    slug: "daniel-kamya",
    name: "Daniel Kamya",
    position: "Midfielder",
    role: "Defensive midfielder",
    team: "senior",
    number: 6,
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 15, goals: 1, assists: 4 },
    placeholder: true,
  },
  {
    slug: "moses-lubega",
    name: "Moses Lubega",
    position: "Midfielder",
    role: "Attacking midfielder",
    team: "senior",
    number: 10,
    preferredFoot: "Left",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 14, goals: 6, assists: 7 },
    placeholder: true,
  },
  {
    slug: "patrick-ochieng",
    name: "Patrick Ochieng",
    position: "Forward",
    role: "Striker",
    team: "senior",
    number: 9,
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 15, goals: 11, assists: 3 },
    placeholder: true,
  },
  {
    slug: "elias-nabimanya",
    name: "Elias Nabimanya",
    position: "Forward",
    role: "Winger",
    team: "senior",
    number: 7,
    preferredFoot: "Left",
    nationality: "Ugandan",
    ageGroup: "Senior",
    status: "injured",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 9, goals: 4, assists: 5 },
    placeholder: true,
  },
  {
    slug: "isaac-tumwine",
    name: "Isaac Tumwine",
    position: "Goalkeeper",
    role: "Goalkeeper",
    team: "under-17",
    number: 1,
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Under-17",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 10, cleanSheets: 4 },
    placeholder: true,
  },
  {
    slug: "raymond-kizza",
    name: "Raymond Kizza",
    position: "Defender",
    role: "Centre-back",
    team: "under-17",
    number: 5,
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Under-17",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 11, goals: 1 },
    placeholder: true,
  },
  {
    slug: "allan-byaruhanga",
    name: "Allan Byaruhanga",
    position: "Midfielder",
    role: "Central midfielder",
    team: "under-17",
    number: 8,
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Under-17",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 12, goals: 3, assists: 4 },
    placeholder: true,
  },
  {
    slug: "hakim-ssentongo",
    name: "Hakim Ssentongo",
    position: "Forward",
    role: "Striker",
    team: "under-17",
    number: 11,
    preferredFoot: "Right",
    nationality: "Ugandan",
    ageGroup: "Under-17",
    status: "active",
    bio: ["Placeholder profile. Replace with the player's real biography before launch."],
    stats: { appearances: 12, goals: 8, assists: 2 },
    placeholder: true,
  },
];

/** ⚠️ Every staff record below is placeholder data. Replace before launch. */
export const staff: StaffMember[] = [
  {
    slug: "club-chairperson",
    name: "Chairperson",
    position: "Club Chairperson",
    department: "Leadership",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Overall direction of the club",
      "Institutional partnerships and representation",
      "Governance and accountability",
    ],
    placeholder: true,
  },
  {
    slug: "club-manager",
    name: "Club Manager",
    position: "Club Manager",
    department: "Leadership",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Day-to-day running of the club",
      "Fixture and competition administration",
      "Coordination between teams, staff and community programmes",
    ],
    placeholder: true,
  },
  {
    slug: "head-coach",
    name: "Head Coach",
    position: "Head Coach — Senior Team",
    department: "Technical",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Senior team selection and match preparation",
      "Training programme and player development plans",
      "Coaching standards across the club",
    ],
    placeholder: true,
  },
  {
    slug: "under-17-coach",
    name: "Under-17 Coach",
    position: "Coach — Under-17",
    department: "Technical",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Under-17 training and matchday management",
      "Individual development tracking",
      "Progression of players toward the senior squad",
    ],
    placeholder: true,
  },
  {
    slug: "goalkeeping-coach",
    name: "Goalkeeping Coach",
    position: "Goalkeeping Coach",
    department: "Technical",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Specialist goalkeeper sessions across all squads",
      "Match preparation for goalkeepers",
    ],
    placeholder: true,
  },
  {
    slug: "community-officer",
    name: "Community Officer",
    position: "Community Programmes Officer",
    department: "Administration",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Community programme delivery across the five core communities",
      "School and partner liaison",
      "Participant welfare and safeguarding referrals",
    ],
    placeholder: true,
  },
  {
    slug: "media-officer",
    name: "Media Officer",
    position: "Media & Communications Officer",
    department: "Administration",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Club photography, video and match coverage",
      "Website and social media publishing",
      "Press and media enquiries",
    ],
    placeholder: true,
  },
  {
    slug: "team-physiotherapist",
    name: "Team Physiotherapist",
    position: "Physiotherapist",
    department: "Medical",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Injury assessment, treatment and return-to-play decisions",
      "Matchday medical cover",
      "Player conditioning and injury prevention",
    ],
    placeholder: true,
  },
  {
    slug: "kit-manager",
    name: "Kit & Equipment Manager",
    position: "Kit & Equipment Manager",
    department: "Support",
    bio: "Placeholder profile. Replace with the real post-holder's name and biography.",
    responsibilities: [
      "Kit, training equipment and matchday logistics",
      "Equipment donations and inventory",
    ],
    placeholder: true,
  },
];
