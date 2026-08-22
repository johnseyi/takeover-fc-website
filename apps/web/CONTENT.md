# Content guide — Takeover Creatives FC

Everything the website displays lives in `src/content/`. No component contains
hard-coded copy, so the whole site can be updated by editing these files without
touching a single component.

Run this at any time to see what still needs real information:

```bash
npm run check:content
```

---

## ⚠️ Read this before launch

The site was built from the Official Website Master Plan, which documents the
club's identity, communities, two named players and its plans — but not a squad
list, a fixture list, staff names or contact details. Rather than leave those
sections empty (and make the site look unfinished) or invent them silently, they
are filled with **clearly-flagged placeholder data**.

**Nothing marked below should go live as-is.**

### What is real

| Content | Source |
|---|---|
| Club identity, mission, vision, values, communities | Master plan §§1–24 |
| Kenneth Gidudu — Under-17 captain, Standard High School Zana — Ndeje Campus | Master plan §35 |
| Imran Yasin "Santos" — senior player; Post Primary, District and Regional Championships as school captain | Master plan §35 |
| All photography | Supplied by the club |
| Club crest and colours | Supplied by the club |
| Academy, girls' football, partnership and support copy | Master plan §§36–40 |

### What is placeholder

| Content | File | What to do |
|---|---|---|
| 12 squad players (Brian Okello → Hakim Ssentongo) | `people.ts` | Replace with the real squad, or delete |
| 9 staff roles | `people.ts` | Add the real post-holders' names, photos and biographies |
| 9 matches (fixtures + results) | `matches.ts` | Delete and enter real fixtures. **Scores, scorers, line-ups and statistics are all invented.** |
| Match report article | `news.ts` | The article itself carries a visible placeholder notice — replace or delete |
| Email addresses, phone, site URL | `site.ts` | Replace with the club's real channels |
| Social media links | `site.ts` | Replace with the club's real profile URLs |

Every placeholder record carries `placeholder: true` in the data, so you can find
them with a search as well as with the audit script.

---

## Files

### `site.ts` — identity, navigation, contact

Club name, tagline, the live URL used for canonical links and Open Graph tags,
contact addresses, social profiles, and the main/footer navigation.

**`site.url` must be updated to the real domain before launch** — it drives every
canonical URL, sitemap entry and social share card.

### `club.ts` — the club's words

Mission, vision, values, timeline, communities, impact areas, statistics, the
brand story, the "Takeover" language system, academy sections, girls' football,
partnership and support content. Copy here is taken from the master plan.

To update the homepage statistics, edit `clubStats`.

### `people.ts` — players and staff

Player records follow the master plan's §52 entity spec. A minimal new player:

```ts
{
  slug: "player-name",          // becomes /players/player-name
  name: "Player Name",
  position: "Midfielder",       // Goalkeeper | Defender | Midfielder | Forward
  role: "Captain / Under-17",   // free text, shown under the name
  team: "under-17",             // senior | under-17 | academy | girls
  number: 8,
  nationality: "Ugandan",
  ageGroup: "Under-17",
  status: "active",             // active | academy | injured | graduate
  bio: ["First paragraph.", "Second paragraph."],
}
```

Optional fields: `alias`, `photo`, `height`, `preferredFoot`, `school`,
`journey`, `achievements`, `stats`, `quote`, `gallery`.

**On portraits:** no supplied photograph is attributed to a named individual,
because we cannot confirm who is in each frame. Profiles show a crest avatar
until the club provides identified portraits — set `photo` (and `photoAlt`) once
you have them.

**On privacy:** per master plan §27, do not add dates of birth, home addresses,
phone numbers or any other sensitive detail to a player record. These pages are
public and many of the players are minors.

### `teams.ts` — squads

Two active squads and two planned pathways. Set `status: "planned"` for anything
not yet running — the site presents planned squads honestly rather than as if
they exist.

### `matches.ts` — fixtures and results

```ts
{
  slug: "senior-vs-opponent-2026-09-05",
  team: "senior",
  opponent: "Opponent FC",
  home: true,
  kickoff: "2026-09-05T16:00:00+03:00",   // ISO 8601, East Africa Time
  venue: "Namuwongo Community Ground, Kampala",
  competition: "Kampala Community League",
  status: "scheduled",                     // scheduled | live | played | postponed
}
```

Once played, change `status` to `"played"` and add `score`, `events`, `lineup`,
`statistics`, `report` and `photos`. A match centre page is generated
automatically at `/matches/<slug>` for every played match.

The homepage next-match block, the countdown, the season record and the fixtures
tabs are all derived from this file. If there are no scheduled matches, the
homepage automatically shows "The next chapter is being built."

### `news.ts` — the newsroom

Articles support eight categories. In `body`, a string starting with `## `
renders as a subheading; everything else renders as a paragraph.

Set `featured: true` to mark a story as significant. The newest article
automatically becomes the newsroom lead.

### `partners.ts` — partners

**Deliberately empty.** The partners page shows an open-invitation state while
this list is empty and switches to a logo wall automatically once real partners
are added. Do not add placeholder sponsor logos — it undermines exactly the
credibility the page exists to build.

### `media.ts` — gallery, videos, media kit

Gallery albums, planned albums, video categories, the club facts table and brand
usage rules. `videos` is empty until the club's YouTube channel exists — add
entries with a `youtubeId` and the hub renders them.

---

## Images

Web-ready images live in `public/images/`, capped at 2400px and served through
`next/image` (which generates WebP/AVIF at the right size per device).

Original camera files — including the RAW `.NEF` files — are kept in
`assets/raw/`, which is **git-ignored** to keep the repository small. Keep your
own backup of that folder; it is not in the repo.

To add a new image:

```bash
sips -s format jpeg -s formatOptions 72 -Z 2400 "source.jpg" --out public/images/descriptive-name.jpg
```

Always give `next/image` a meaningful `alt`. Decorative background photography
takes `alt=""`.

---

## Adding a CMS later

Every page reads through `src/content/*`, and the shapes in `src/lib/types.ts`
mirror the master plan's §52 database spec. To move to a CMS, replace the bodies
of the exported functions in the content files with fetches from your CMS — no
component needs to change.
