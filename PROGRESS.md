# Takeover Creatives FC — Build Progress

Last updated: 2026-08-22 | Branch: `main` | Latest commit: `af3dbbc`
**Everything is pushed. Nothing is deployed anywhere yet.**

---

## Where things stand

The public website is finished and verified. The admin panel is built, tested
and works — but two things stand between it and real use:

1. **The website still reads static TypeScript files, not the API.** The backend
   is complete and the loop is tested, but nothing is wired across yet.
2. **Saving a player or an article through the panel corrupts the record.**
   Reproduced, details below. Do not use those screens until it is fixed.

---

## Sessions

| # | Date | What was built | Commit |
|---|---|---|---|
| **1** | 17 Aug | The whole public website — 53 routes, design system, content, SEO, accessibility | `46ea202` |
| **2** | 18 Aug | Crest aspect-ratio fix across four components; LAN origins allowed so phone testing works | `c4325aa` |
| **3** | 22 Aug | Monorepo restructure; Laravel 13 + Filament 5 admin panel; roles; smoke tests | `92bdee7` |
| **4** | 22 Aug | Content API, media resolver, ClubSeeder, on-demand revalidation, deployment guide | `af3dbbc` |

---

## ✅ Done and verified

### Website (`apps/web`)

- 53 routes, all prerendered. Typecheck and lint clean, zero warnings.
- Every page of the master plan's structure (§9) built, including the full
  14-section homepage wireframe (§60).
- Design system from the crest: emerald `#083018`, gold `#A88838`, cream.
  Both signature components (§59) implemented — the Takeover Line and the
  Takeover Grid.
- SEO (§53): per-page metadata, canonical URLs, OG images, sitemap, robots, and
  JSON-LD for `SportsTeam`, `Person`, `SportsEvent`, `NewsArticle`,
  `BreadcrumbList`.
- Accessibility (§48): skip link, focus rings, labelled forms, real tab
  semantics, alt text, full `prefers-reduced-motion` support.
- Verified visually at desktop and mobile widths. Two real bugs found and fixed
  this way: a date/opponent collision in the next-match panel, and the crest
  aspect ratio.

### Admin panel (`apps/api`)

- Laravel 13.26 + Filament 5.7, branded in club colours, grouped as Football /
  Newsroom / The Club / Media / Administration.
- **The match form is the one that matters** (§51) and is hand-built: entering a
  fixture is four fields; result, timeline, line-up, statistics and report stay
  hidden until a match is marked *Played*. Slugs generate from opponent + date.
- Role-based access (§65) — admin, editor, media, viewer — enforced in code and
  covered by tests. Deactivated accounts keep history but cannot sign in.
- Read-only JSON API at `/api/v1` returning the exact shapes the frontend's
  TypeScript types describe.
- On-demand revalidation: a save pings the site to rebuild only affected pages.
  A failed ping is logged and swallowed so a save never errors.
- `ClubSeeder` loads only content the club can stand behind — both documented
  players, real squads, real articles, real photography.
- **15 tests passing**: panel rendering, role enforcement, API shapes,
  published-only guarantee, played vs scheduled fixtures, revalidation fires
  with the right tag and secret, and a failing revalidation cannot break a save.

---

## 🔴 Blockers

### 1. Saving a player or article through the panel corrupts the record

**Confirmed by reproduction, not suspicion.**

Eight of the nine Filament forms are still the flat auto-generated scaffold.
Fields cast to `array` in the model — `bio`, `journey`, `achievements`, `stats`,
`quote`, `gallery` on Player; `body`, `tags` on Article — are rendered as a plain
`Textarea`, which submits a string.

What actually happens on save:

```
bio before : ["Paragraph one.", "Paragraph two."]   (array)
bio after  : "A single paragraph typed into a textarea."   (string)
API emits  : "A single paragraph typed into a textarea."
```

It does not throw. It silently changes the shape, and the website's
`bio.map(...)` would then break on that player's page.

**Affected:** Players, Articles, and to a lesser degree Teams, Staff, Albums,
Videos, Partners, Users — all still scaffold forms.
**Safe to use today:** Fixtures & Results only.
**Fix:** hand-build the remaining eight forms the way `FixtureForm` was built —
`Repeater` for paragraph lists, `TagsInput` for tags, `FileUpload` for images.

### 2. The website is not connected to the API

The backend is done and tested, but `apps/web` still imports from
`src/content/*.ts`. Roughly 20 pages need to move from `import { players }` to a
tagged `fetch`. Until then the panel and the site are two disconnected halves.

### 3. Site settings have no admin screen

`ClubSeeder` seeds contact details, socials and homepage statistics into the
`settings` table, and the API serves them at `/api/v1/settings` — but there is no
Filament resource for `Setting`, so they cannot be edited in the panel yet.

---

## ⚠️ Outstanding — needs a decision or information

| # | Item | Who |
|---|---|---|
| 1 | **Confirm the Hostinger PHP version** (hPanel → Advanced → PHP Configuration). Laravel 13 needs **8.3+**. If the Business plan is on 8.1/8.2 the stack must be pinned to an older Laravel — cheaper to fix now than at deploy. | John |
| 2 | **The two UI documents from Moses never arrived.** Searched the project, Downloads, Desktop, Documents and everything modified under `~/dev` — not on the machine. Offered to search Gmail/Drive; not yet actioned. | John |
| 3 | **Real squad, staff and fixtures** to be entered through the panel (blocked by #1 above for players). | Club |
| 4 | **Contact details and social links** are still placeholders in `apps/web/src/content/site.ts` and in the seeded settings. | Club |
| 5 | **`site.url`** must be set to the live domain before first deploy — it drives every canonical URL, sitemap entry and share card. | — |
| 6 | **Privacy policy and terms** need review against Uganda's Data Protection and Privacy Act. Both pages carry a visible notice until then. | Club |

---

## Deploy status

**Nothing is live.** No Vercel project, no Hostinger setup, no domain pointed.

`docs/DEPLOYMENT.md` has the full runbook. The two settings most likely to bite:

- **Vercel Root Directory must be `apps/web`** or the build fails — this is a
  monorepo now.
- **Keep Laravel's `.env` above the web root** on Hostinger. Putting the whole
  app inside `public_html` exposes it.

---

## Suggested next steps

1. **Fix the eight scaffold forms** — unblocks the panel for real use.
2. **Wire the frontend to the API** — closes the loop end to end.
3. **Add a Settings screen** so contact details are editable without a deploy.
4. **Confirm the PHP version**, then do a first deploy to a staging subdomain.

---

## Running it locally

```bash
# Website
cd apps/web && npm install && npm run dev          # localhost:3000

# Admin panel + API
cd apps/api && composer install
cp .env.example .env && php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve                                   # localhost:8000/admin
```

Seeded admin: `admin@takeoverfc.com` / `password` — change it before any deploy.

```bash
cd apps/api && php artisan test        # 15 tests
cd apps/web && npm run typecheck && npm run lint && npm run build
```
