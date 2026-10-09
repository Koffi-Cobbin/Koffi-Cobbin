# Task Log

Running record of work done in this repository. Newest entries first.

**How to use:** add one row per task when it finishes (or changes status). Keep
entries to a single line; put decisions, blockers, and follow-ups in Notes.

## Status values

| Status | Meaning |
| --- | --- |
| ✅ Done | Finished and verified |
| 🔄 In progress | Actively being worked on |
| ⏳ Planned | Scoped but not started |
| ❌ Blocked | Halted — reason required in Notes |

## Log

| Date | Task | Status | Notes / Outcome |
| --- | --- | --- | --- |
| 2026-10-09 | Fix 8 of 10 audit vulnerabilities via pnpm overrides (js-yaml, brace-expansion, source-map-js, fast-uri, postcss-selector-parser 6→7, proxy-addr CRITICAL) | ✅ Done | `pnpm-workspace.yaml` overrides with GHSA references; verified: audit 10→2, typecheck exit 0, portfolio build exit 0 |
| 2026-10-09 | Differentiate experience titles (FileForge → Backend Engineer, QuickDiscount → Fullstack Developer, DrapeRoom → Frontend Engineer, SalvageMe → Co-Founder & Lead Fullstack Developer) | ✅ Done | Updated `artifacts/portfolio/src/mocks/data.ts` and `README.md` to stay in sync |
| 2026-10-09 | Create task log in `docs/` | ✅ Done | First file in `docs/`; format defined above |
| 2026-10-09 | Explore repository (monorepo, portfolio, API, backend docs) | ✅ Done | Surveyed workspace layout, Vite portfolio, Express/orval/Drizzle scaffolding, Django blueprint; found no tests |
| 2026-10-09 | Update portfolio experience section, add projects, refresh README | ✅ Done | Commit `81fb05d` |
| 2026-10-09 | Homepage redesign — discipline cards, impact stats, experience timeline, CTA | ✅ Done | Commit `00e5c14`; follow-up `60f9dd9` redid discipline cards visual-first |
| 2026-10-09 | SEO/metadata refresh — title, meta description, canonical trailing-slash redirects, portrait OG image | ✅ Done | Commits `15e446a`, `5cc1c86`, `3ed7722`, `4a795ef` |
| 2026-10-09 | Firebase Hosting config — image caching, CORS header, domain migration to `koffi-cobbin.web.app` | ✅ Done | Commits `739d69b`, `331448c`, `a209631` |

## Known gaps (candidates for future tasks)

- No automated tests anywhere in the workspace — typecheck (`pnpm run typecheck`) is the only gate.
- `lib/db` Drizzle schema is empty; `api-server` exposes only `/api/healthz`, not the endpoints the frontend contract expects (`Development.md`).
- Contact form posts directly to Formspree, bypassing the documented `POST /api/contact/`.
- Django backend from `Django-Backend.md` is blueprint-only — no `backend/` directory exists.
