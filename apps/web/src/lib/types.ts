/**
 * Content entities for Takeover Creatives FC.
 *
 * These mirror the database structure set out in §52 of the master plan so the
 * same shapes can be served by a CMS later without touching any component.
 * Every page reads through `@/content/*`, never from a component-local literal.
 */

export type TeamId = "senior" | "under-17" | "academy" | "girls";

export type PlayerStatus = "active" | "academy" | "injured" | "graduate";

export type Position =
  | "Goalkeeper"
  | "Defender"
  | "Midfielder"
  | "Forward";

export type PreferredFoot = "Right" | "Left" | "Both";

/** §52 — PLAYER */
export interface Player {
  slug: string;
  name: string;
  /** Nickname shown in quotes on the profile, e.g. Imran Yasin "Santos". */
  alias?: string;
  photo?: string;
  photoAlt?: string;
  position: Position;
  /** Descriptive role shown under the name, e.g. "Captain / Midfielder". */
  role?: string;
  team: TeamId;
  number?: number;
  height?: string;
  preferredFoot?: PreferredFoot;
  school?: string;
  nationality: string;
  ageGroup: string;
  status: PlayerStatus;
  bio: string[];
  /** The player's route into and through the club. */
  journey?: { label: string; detail: string }[];
  achievements?: string[];
  stats?: { appearances?: number; goals?: number; assists?: number; cleanSheets?: number };
  quote?: { text: string; attribution?: string };
  gallery?: string[];
  /**
   * True for squad entries seeded as demo data. Anything marked placeholder is
   * excluded from the site build unless NEXT_PUBLIC_SHOW_PLACEHOLDERS is set.
   * See CONTENT.md.
   */
  placeholder?: boolean;
}

/** §52 — TEAM */
export interface Team {
  id: TeamId;
  name: string;
  shortName: string;
  ageGroup: string;
  status: "active" | "planned";
  summary: string;
  description: string[];
  image?: string;
  imageAlt?: string;
  coachSlugs?: string[];
}

/** §25 — Club leadership, management, technical, medical and support staff. */
export interface StaffMember {
  slug: string;
  name: string;
  position: string;
  department: "Leadership" | "Technical" | "Administration" | "Medical" | "Support";
  photo?: string;
  bio: string;
  responsibilities: string[];
  placeholder?: boolean;
}

export type MatchStatus = "scheduled" | "live" | "played" | "postponed";

export interface MatchEvent {
  minute: number;
  type: "goal" | "assist" | "yellow" | "red" | "substitution";
  player: string;
  detail?: string;
  team: "takeover" | "opponent";
}

/** §52 — MATCH */
export interface Match {
  slug: string;
  team: TeamId;
  opponent: string;
  /** True when Takeover FC is the home side. */
  home: boolean;
  /** ISO 8601 with an East Africa Time offset. */
  kickoff: string;
  venue: string;
  competition: string;
  status: MatchStatus;
  score?: { takeover: number; opponent: number };
  events?: MatchEvent[];
  lineup?: string[];
  substitutes?: string[];
  playerOfTheMatch?: string;
  statistics?: { label: string; takeover: number; opponent: number }[];
  report?: string[];
  photos?: string[];
  placeholder?: boolean;
}

export type ArticleCategory =
  | "Club News"
  | "Match Reports"
  | "Player Stories"
  | "Community"
  | "Academy"
  | "Partnerships"
  | "Opinion"
  | "Announcements";

/** §52 — ARTICLE */
export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  author: string;
  /** ISO date, e.g. "2026-08-04". */
  date: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  /** Plain paragraphs; strings beginning with "## " render as subheadings. */
  body: string[];
  tags: string[];
  featured?: boolean;
}

/** §52 — PARTNER */
export interface Partner {
  slug: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  partnershipType: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  description: string;
  cover: string;
  photos: { src: string; alt: string; caption?: string }[];
}

export interface VideoItem {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** YouTube ID once the club's channel is connected (§43). */
  youtubeId?: string;
  thumbnail: string;
  duration?: string;
}
