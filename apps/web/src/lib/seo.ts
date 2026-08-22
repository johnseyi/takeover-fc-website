/**
 * SEO helpers — master plan §53.
 * Every major page gets a title, description, canonical URL, Open Graph image
 * and structured data. Schema types implemented: Organization, SportsTeam,
 * Person, Event, Article and BreadcrumbList.
 */

import type { Metadata } from "next";
import { site, contact, socials } from "@/content/site";
import type { Article, Match, Player } from "@/lib/types";

export const DEFAULT_OG_IMAGE = "/og-default.jpg";

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}

/** Build page metadata with canonical URL and Open Graph/Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  keywords,
}: PageMetaOptions): Metadata {
  const url = new URL(path, site.url).toString();

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url,
      siteName: site.name,
      locale: "en_UG",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.shortName}`,
      description,
      images: [image],
    },
  };
}

const abs = (path: string) => new URL(path, site.url).toString();

/* ------------------------------------------------------------------ *
 * Structured data
 * ------------------------------------------------------------------ */

/** Organization + SportsTeam, emitted once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    sport: "Association Football",
    url: site.url,
    logo: abs("/logo.png"),
    image: abs(DEFAULT_OG_IMAGE),
    description: site.description,
    foundingDate: String(site.founded),
    slogan: site.tagline,
    email: contact.general,
    parentOrganization: { "@type": "Organization", name: site.parentOrganisation },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    areaServed: [
      "Namuwongo",
      "Kanyogoga",
      "Kasanvu",
      "Soweto",
      "Tebaleka",
      "Kampala",
    ],
    sameAs: socials.map((s) => s.href),
  };
}

/** Person schema for a player profile. */
export function playerSchema(player: Player) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.alias ? `${player.name} "${player.alias}"` : player.name,
    url: abs(`/players/${player.slug}`),
    jobTitle: player.role ?? player.position,
    nationality: { "@type": "Country", name: player.nationality },
    memberOf: { "@id": `${site.url}/#organization` },
    ...(player.photo ? { image: abs(player.photo) } : {}),
    ...(player.school
      ? { alumniOf: { "@type": "EducationalOrganization", name: player.school } }
      : {}),
  };
}

/** SportsEvent schema for a fixture or result. */
export function matchSchema(match: Match) {
  const takeover = { "@type": "SportsTeam", name: site.name };
  const opponent = { "@type": "SportsTeam", name: match.opponent };

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: match.home
      ? `${site.shortName} vs ${match.opponent}`
      : `${match.opponent} vs ${site.shortName}`,
    url: abs(`/matches/${match.slug}`),
    startDate: match.kickoff,
    eventStatus:
      match.status === "postponed"
        ? "https://schema.org/EventPostponed"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: match.venue,
      address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
    },
    homeTeam: match.home ? takeover : opponent,
    awayTeam: match.home ? opponent : takeover,
    competitor: [takeover, opponent],
    organizer: { "@id": `${site.url}/#organization` },
  };
}

/** NewsArticle schema for a newsroom item. */
export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    url: abs(`/news/${article.slug}`),
    image: abs(article.featuredImage),
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    keywords: article.tags.join(", "),
    author: { "@type": "Organization", name: article.author },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(`/news/${article.slug}`) },
  };
}

/** BreadcrumbList schema; pair it with the visual <Breadcrumbs /> component. */
export function breadcrumbSchema(trail: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: abs(crumb.href),
    })),
  };
}
