<div align="center">
  <img src="public/logo.png" alt="Takeover Creatives FC crest" width="120">
  <h1>Takeover Creatives FC — Official Website</h1>
  <p><strong>Football With Purpose.</strong><br>
  Kampala, Uganda · Founded 2024 · Redefining Creativity Through Football</p>
</div>

---

The digital home of Takeover Creatives FC — a community-driven football club in
Kampala using football to develop young people, create opportunities and build a
stronger future.

Built to the club's Official Website Master Plan (`docs/`), which specifies the
brand direction, content architecture, page structure and standards this site is
measured against.

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint, zero warnings tolerated |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check:content` | **Lists every placeholder still to be replaced** |

## Stack

- **Next.js 16** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4** — design tokens defined in `src/app/globals.css`
- **next/font** — Inter for body, Anton as the condensed athletic display face
- **next/image** — automatic WebP/AVIF, responsive sizes, lazy loading
- No animation library: scroll reveals and counters are ~40 lines of
  `IntersectionObserver`, fully disabled under `prefers-reduced-motion`

Static-first — 52 routes prerender at build time. Only the pages that depend on
the current time (homepage, fixtures, teams) revalidate, hourly.

## Pages

| Route | Master plan |
|---|---|
| `/` | §10–20, full 14-section homepage wireframe (§60) |
| `/club` · `/club/leadership` | §21–25 |
| `/teams` | §26 |
| `/players` · `/players/[slug]` | §27–28 — filterable database + premium profiles |
| `/fixtures-results` · `/matches/[slug]` | §29–30 — tabs + match centre |
| `/news` · `/news/[slug]` | §31–32 |
| `/community` | §33–35 |
| `/academy` · `/girls-football` | §36–37 |
| `/partners` · `/partner-with-us` · `/support` | §38–40 |
| `/media` · `/gallery` · `/videos` | §41–43 |
| `/join` · `/contact` | §44–45 |
| `/privacy` · `/terms` | §9 footer |

## Design system

Colours are sampled from the club crest: emerald `#083018`, pyramid gold
`#A88838`, cream `#F7F2E6`. The full scale lives in the `@theme` block of
`src/app/globals.css`.

Two signature components carry the club's visual identity (§59):

- **The Takeover Line** — a thin emerald→gold gradient rule tracing the journey
  from player to team to community to club to future. It runs under the header,
  between sections, and appears on card hover.
- **The Takeover Grid** — a faint modular grid backing statistics, player cards,
  empty states and dark sections.

## Standards this site is built to

**Accessible** — semantic HTML, a skip link, visible gold focus rings on every
interactive element, labelled form fields, `aria-live` result counts, real
`role="tablist"` tabs, alt text on every meaningful image, and full
`prefers-reduced-motion` support.

**Fast** — static prerendering, no client-side animation library, optimised and
lazily-loaded images, `display: swap` fonts. The client JavaScript is limited to
the header, the countdown, the filters and two observers.

**Discoverable (§53)** — per-page titles, descriptions, canonical URLs and Open
Graph images; `sitemap.xml` and `robots.txt`; and JSON-LD structured data for
`SportsTeam`, `Person`, `SportsEvent`, `NewsArticle` and `BreadcrumbList`.

**Honest** — where the club has nothing to show yet, the site says so. The
partners page shows an open invitation rather than borrowed logos, the video hub
says the channel is being built, the league table says there is no table yet, the
academy says it has not opened, and player profiles show a crest avatar rather
than attributing a photograph to someone we cannot identify.

## ⚠️ Before this goes live

The master plan documents the club's identity, its communities and two named
players — but not a squad list, a fixture list, staff names or contact details.
Those sections are filled with **clearly-flagged placeholder data** so the design
could be built and reviewed.

```bash
npm run check:content
```

That prints every placeholder. At minimum, before launch:

1. **Replace or delete the 12 placeholder squad players** and the 9 staff roles
   in `src/content/people.ts`.
2. **Delete the 9 placeholder matches** in `src/content/matches.ts` — scores,
   goalscorers, line-ups and statistics are all invented — and enter real ones.
3. **Replace the placeholder contact details and social links** in
   `src/content/site.ts`.
4. **Set `site.url`** to the real domain. It drives every canonical URL, sitemap
   entry and share card.
5. **Delete or rewrite the placeholder match report** in `src/content/news.ts`.
6. **Have the privacy policy and terms reviewed** against Uganda's Data
   Protection and Privacy Act. Both pages carry a visible notice until then.

`CONTENT.md` explains every content file and how to edit it.

## Repository layout

```
src/
  app/          Routes (App Router), sitemap, robots, icons
  components/   UI library — header, footer, cards, filters, reveals
  content/      ALL site content. Edit here, not in components.
  lib/          Types (§52 entity spec), SEO helpers, utilities
public/images/  Web-ready photography (≤2400px)
assets/raw/     Original camera files incl. RAW — git-ignored, back these up
docs/           The Official Website Master Plan
scripts/        Content placeholder audit
```

## Deploying

The site is a standard Next.js app and deploys to Vercel with no configuration.

```bash
npm run build && npm start   # verify the production build locally first
```

Remember to set `site.url` in `src/content/site.ts` to the production domain
before the first deploy.

---

<div align="center">
  <sub>Takeover Creatives Uganda · Redefining Creativity Through Football</sub>
</div>
