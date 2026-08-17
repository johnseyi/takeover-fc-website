/**
 * Global site configuration: identity, navigation, contact and social.
 *
 * ⚠️  PLACEHOLDERS — every value under `contact` and `socials` is a formatted
 * placeholder, not a real club channel. Replace them with Takeover FC's actual
 * details before launch. They are gathered here so it is a single-file change.
 * See CONTENT.md.
 */

export const site = {
  name: "Takeover Creatives FC",
  shortName: "Takeover FC",
  tagline: "Football With Purpose.",
  philosophy: "Redefining Creativity Through Football.",
  founded: 2024,
  location: "Kampala, Uganda",
  parentOrganisation: "Takeover Creatives Uganda",
  description:
    "Takeover Creatives FC is a community-driven football club in Kampala, Uganda, using the power of football to develop young people, create opportunities and build a stronger future.",
  /** Update to the live domain at launch; drives canonical URLs and OG tags. */
  url: "https://takeoverfc.com",
} as const;

/** ⚠️ PLACEHOLDER — replace with the club's real contact channels. */
export const contact = {
  general: "hello@takeoverfc.com",
  partnerships: "partners@takeoverfc.com",
  media: "media@takeoverfc.com",
  players: "join@takeoverfc.com",
  phone: "+256 700 000 000",
  address: "Namuwongo, Kampala, Uganda",
} as const;

/** ⚠️ PLACEHOLDER — replace with the club's real profile URLs. */
export const socials = [
  { label: "Instagram", handle: "@takeovercreativesfc", href: "https://instagram.com/" },
  { label: "Facebook", handle: "Takeover Creatives FC", href: "https://facebook.com/" },
  { label: "TikTok", handle: "@takeovercreativesfc", href: "https://tiktok.com/" },
  { label: "YouTube", handle: "Takeover Creatives FC", href: "https://youtube.com/" },
  { label: "X", handle: "@takeoverfc", href: "https://x.com/" },
] as const;

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

/** Main navigation — master plan §9. */
export const mainNav: NavItem[] = [
  {
    label: "Club",
    href: "/club",
    children: [
      { label: "About the Club", href: "/club", description: "Who we are and why we exist" },
      { label: "Leadership", href: "/club/leadership", description: "The people running the club" },
      { label: "Academy", href: "/academy", description: "Building the next generation" },
      { label: "Girls' Football", href: "/girls-football", description: "A pathway in development" },
    ],
  },
  { label: "Teams", href: "/teams" },
  { label: "Players", href: "/players" },
  { label: "Fixtures & Results", href: "/fixtures-results" },
  { label: "News", href: "/news" },
  { label: "Community", href: "/community" },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Our Partners", href: "/partners", description: "How organisations work with us" },
      { label: "Partner With Us", href: "/partner-with-us", description: "Sponsorship information" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Media Centre", href: "/media", description: "Assets, press and contacts" },
      { label: "Photo Gallery", href: "/gallery", description: "Curated club albums" },
      { label: "Videos", href: "/videos", description: "Highlights and stories" },
    ],
  },
];

/** The two persistent calls to action in the header — master plan §61. */
export const primaryActions = [
  { label: "Join Takeover", href: "/join" },
  { label: "Support Us", href: "/support" },
] as const;

/** Footer navigation — master plan §47. */
export const footerNav = [
  {
    heading: "Club",
    links: [
      { label: "About", href: "/club" },
      { label: "Leadership", href: "/club/leadership" },
      { label: "Teams", href: "/teams" },
      { label: "Players", href: "/players" },
      { label: "Academy", href: "/academy" },
    ],
  },
  {
    heading: "Football",
    links: [
      { label: "Fixtures", href: "/fixtures-results?tab=fixtures" },
      { label: "Results", href: "/fixtures-results?tab=results" },
      { label: "Match Centre", href: "/fixtures-results?tab=results" },
      { label: "Statistics", href: "/players" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Impact", href: "/community#impact" },
      { label: "Stories", href: "/community#stories" },
      { label: "Programmes", href: "/community#programmes" },
      { label: "Girls' Football", href: "/girls-football" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Partner", href: "/partner-with-us" },
      { label: "Support", href: "/support" },
      { label: "Volunteer", href: "/join#volunteer" },
      { label: "Join", href: "/join" },
    ],
  },
  {
    heading: "Media",
    links: [
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
      { label: "Videos", href: "/videos" },
      { label: "Media Kit", href: "/media#media-kit" },
    ],
  },
] as const;

export const legalNav = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Media Kit", href: "/media#media-kit" },
] as const;
