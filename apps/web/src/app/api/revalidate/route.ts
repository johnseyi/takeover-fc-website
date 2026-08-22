import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint.
 *
 * The Laravel admin panel calls this whenever content changes, so a match
 * result saved by the club appears on the site within seconds instead of
 * waiting for a timed rebuild. Only the pages built with the given cache tag
 * are regenerated.
 *
 * Authenticated with a shared secret in the `x-revalidate-secret` header, which
 * must match REVALIDATE_SECRET in this app's environment and
 * FRONTEND_REVALIDATE_SECRET in the backend's.
 */

/** Tags the backend is allowed to invalidate. */
const ALLOWED_TAGS = [
  "players",
  "teams",
  "fixtures",
  "articles",
  "staff",
  "partners",
  "albums",
  "videos",
  "settings",
] as const;

type AllowedTag = (typeof ALLOWED_TAGS)[number];

function isAllowedTag(value: unknown): value is AllowedTag {
  return typeof value === "string" && ALLOWED_TAGS.includes(value as AllowedTag);
}

/**
 * Constant-time-ish comparison. Not a full timing-safe compare, but it avoids
 * the trivial early-exit leak of `===` on secrets of differing content.
 */
function secretMatches(provided: string | null, expected: string): boolean {
  if (!provided || provided.length !== expected.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;

  // Refuse rather than accept-everything when the secret is not configured.
  if (!expected) {
    return NextResponse.json(
      { revalidated: false, error: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  if (!secretMatches(request.headers.get("x-revalidate-secret"), expected)) {
    return NextResponse.json(
      { revalidated: false, error: "Invalid secret." },
      { status: 401 },
    );
  }

  let tag: unknown;
  try {
    ({ tag } = await request.json());
  } catch {
    return NextResponse.json(
      { revalidated: false, error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  if (!isAllowedTag(tag)) {
    return NextResponse.json(
      { revalidated: false, error: `Unknown tag: ${String(tag)}` },
      { status: 400 },
    );
  }

  // Next 16 requires a cacheLife profile. "max" expires the tag as aggressively
  // as the cache allows, which is what an editor pressing Save expects.
  revalidateTag(tag, "max");

  return NextResponse.json({
    revalidated: true,
    tag,
    at: new Date().toISOString(),
  });
}
