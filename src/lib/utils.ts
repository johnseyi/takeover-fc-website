/** Small shared helpers. */

/** Join class names, dropping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const EAT = "Africa/Kampala";

/** e.g. "5 September 2026" */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: EAT,
  });
}

/** e.g. "Sat 5 Sep 2026" */
export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: EAT,
  });
}

/** e.g. "16:00" — always East Africa Time, the club's local time. */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: EAT,
  });
}

/** Initials used by the crest avatar fallback, e.g. "Kenneth Gidudu" → "KG". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Result letter for a played match, from Takeover FC's perspective. */
export function resultLetter(
  score: { takeover: number; opponent: number } | undefined,
): "W" | "D" | "L" | null {
  if (!score) return null;
  if (score.takeover > score.opponent) return "W";
  if (score.takeover < score.opponent) return "L";
  return "D";
}

/** Build a Google Maps directions link for a venue (§11 "Get directions"). */
export function directionsUrl(venue: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue)}`;
}
