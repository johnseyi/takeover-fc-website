import type { MetadataRoute } from "next";
import { matches } from "@/content/matches";
import { articles } from "@/content/news";
import { players } from "@/content/people";
import { site } from "@/content/site";

/** XML sitemap — master plan §53. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/club", priority: 0.9, changeFrequency: "monthly" },
    { path: "/club/leadership", priority: 0.7, changeFrequency: "monthly" },
    { path: "/teams", priority: 0.9, changeFrequency: "weekly" },
    { path: "/players", priority: 0.9, changeFrequency: "weekly" },
    { path: "/fixtures-results", priority: 0.95, changeFrequency: "daily" },
    { path: "/news", priority: 0.9, changeFrequency: "daily" },
    { path: "/community", priority: 0.9, changeFrequency: "monthly" },
    { path: "/academy", priority: 0.8, changeFrequency: "monthly" },
    { path: "/girls-football", priority: 0.6, changeFrequency: "monthly" },
    { path: "/partners", priority: 0.8, changeFrequency: "monthly" },
    { path: "/partner-with-us", priority: 0.85, changeFrequency: "monthly" },
    { path: "/support", priority: 0.85, changeFrequency: "monthly" },
    { path: "/media", priority: 0.7, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.7, changeFrequency: "weekly" },
    { path: "/videos", priority: 0.6, changeFrequency: "weekly" },
    { path: "/join", priority: 0.85, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: url(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...players.map((player) => ({
      url: url(`/players/${player.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: url(`/news/${article.slug}`),
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...matches
      .filter((match) => match.status === "played")
      .map((match) => ({
        url: url(`/matches/${match.slug}`),
        lastModified: new Date(match.kickoff),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
