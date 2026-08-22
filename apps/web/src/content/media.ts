/**
 * Gallery albums, video hub and media-centre assets — master plan §§41–43.
 *
 * Albums are editorially curated, not a photo dump (§42). Only photographs
 * actually supplied by the club appear here. Video categories are listed with
 * an honest empty state until the club's YouTube channel is connected.
 */

import type { GalleryAlbum, VideoItem } from "@/lib/types";

export const albums: GalleryAlbum[] = [
  {
    slug: "matchday",
    title: "Matchday",
    description:
      "Competitive football on the grounds the club calls home — dirt pitches, community backdrops, and no shortage of intensity.",
    cover: "/images/match-dirt-pitch-duel.jpg",
    photos: [
      {
        src: "/images/match-dirt-pitch-duel.jpg",
        alt: "Four players contest possession on a dirt pitch with community housing behind",
        caption: "Possession contested on the club's home ground.",
      },
      {
        src: "/images/match-shoulder-to-shoulder.jpg",
        alt: "Two players run shoulder to shoulder chasing a loose ball",
        caption: "Shoulder to shoulder, chasing the same ball.",
      },
      {
        src: "/images/match-driving-forward.jpg",
        alt: "A Takeover FC player drives forward with the ball under pressure",
        caption: "Driving forward under pressure.",
      },
      {
        src: "/images/match-first-touch.jpg",
        alt: "A player takes a first touch out of the air on a grass pitch",
        caption: "First touch, taken out of the air.",
      },
      {
        src: "/images/match-shielding-ball.jpg",
        alt: "A Takeover FC player shields the ball from an opponent",
        caption: "Shielding possession on the turn.",
      },
      {
        src: "/images/player-celebration.jpg",
        alt: "A Takeover FC player celebrates on a dirt pitch, kit covered in red dust",
        caption: "The kit tells you what kind of afternoon it was.",
      },
    ],
  },
  {
    slug: "players",
    title: "Players",
    description:
      "The squad, photographed where they play — after the final whistle, before anyone has changed.",
    cover: "/images/squad-portrait-trio.jpg",
    photos: [
      {
        src: "/images/squad-portrait-trio.jpg",
        alt: "Three Takeover FC players stand together in club shirts after a match",
        caption: "Three of the squad after full time.",
      },
      {
        src: "/images/squad-portrait-duo.jpg",
        alt: "Two Takeover FC players in club shirts, smiling after a match",
        caption: "The best part of the afternoon.",
      },
      {
        src: "/images/squad-portrait-five.jpg",
        alt: "Five Takeover FC players including the goalkeeper stand in a line in club kit",
        caption: "Five of the group, goalkeeper included.",
      },
      {
        src: "/images/senior-team-lineup.jpg",
        alt: "The Takeover FC senior team lined up in white and green kit before a match",
        caption: "The senior team before kick-off.",
      },
    ],
  },
  {
    slug: "community",
    title: "Community",
    description:
      "Where the club comes from. The environment is part of the story, not the background to it.",
    cover: "/images/squad-lineup-community.jpg",
    photos: [
      {
        src: "/images/squad-lineup-community.jpg",
        alt: "The Takeover FC squad lined up across a dirt pitch with community buildings behind them",
        caption: "Lined up on home ground, the community directly behind.",
      },
      {
        src: "/images/match-dirt-pitch-duel.jpg",
        alt: "Players compete on a dirt pitch surrounded by community housing",
        caption: "Football happening exactly where the club is rooted.",
      },
    ],
  },
  {
    slug: "events",
    title: "Events",
    description:
      "Finals, presentations and the afternoons that get remembered for longer than a league fixture.",
    cover: "/images/champions-medals.jpg",
    photos: [
      {
        src: "/images/champions-medals.jpg",
        alt: "A championship-winning squad with medals and a trophy alongside officials",
        caption: "Medals, a trophy, and a photograph nobody wanted to rush.",
      },
      {
        src: "/images/champions-trophy-celebration.jpg",
        alt: "Young footballers celebrating together around a championship trophy",
        caption: "The celebration that follows a season's work.",
      },
      {
        src: "/images/trophy-presentation.jpg",
        alt: "A captain receives a championship trophy at a presentation ceremony",
        caption: "The presentation.",
      },
    ],
  },
];

/** Albums the club plans to build once the photography exists (§42). */
export const plannedAlbums = [
  { title: "Training", description: "Weekly sessions and preparation." },
  { title: "Academy", description: "The youth academy, once it is running." },
  { title: "Partnerships", description: "Partner visits, launches and joint programmes." },
] as const;

/** §43 — Video hub categories. */
export const videoCategories = [
  "Match Highlights",
  "Interviews",
  "Training",
  "Player Stories",
  "Community Stories",
  "Club Announcements",
  "Behind The Scenes",
] as const;

/**
 * Videos are intentionally empty until the club's YouTube channel is connected.
 * Add entries with a `youtubeId` and the hub renders them automatically.
 */
export const videos: VideoItem[] = [];

/** §41 — Media centre downloadable assets. */
export const mediaAssets = [
  {
    title: "Club crest — full colour (PNG)",
    description: "Primary crest on a transparent background. For digital use.",
    href: "/logo.png",
    format: "PNG",
  },
] as const;

/** §41 — Facts a journalist needs without having to ask. */
export const mediaFacts = [
  { label: "Full name", value: "Takeover Creatives FC" },
  { label: "Short name", value: "Takeover FC" },
  { label: "Founded", value: "2024" },
  { label: "Based in", value: "Kampala, Uganda" },
  { label: "Parent organisation", value: "Takeover Creatives Uganda" },
  {
    label: "Core communities",
    value: "Namuwongo, Kanyogoga, Kasanvu, Soweto, Tebaleka",
  },
  { label: "Active squads", value: "Senior team, Under-17" },
  { label: "Club colours", value: "Emerald green, pyramid gold, cream" },
  { label: "Brand direction", value: "Redefining Creativity" },
] as const;

/** Usage rules that protect the club's identity assets. */
export const brandGuidelines = [
  "Use the crest at its original proportions. Do not stretch, rotate or recolour it.",
  "Leave clear space around the crest equal to at least half its width.",
  "Do not place the crest on a busy photograph without a solid or darkened backing.",
  'Refer to the club as "Takeover Creatives FC" on first mention and "Takeover FC" thereafter.',
  "Do not use the crest to imply endorsement of a product, organisation or campaign without written permission.",
] as const;
