# Frontend.md — Next.js + React Three Fiber

This document is self-contained: a frontend developer should be able to build against it using the API contract in `Backend.md` (or mocked data in the same shape) without needing the backend running locally.

---

## 1. Stack

| Purpose | Tool |
|---|---|
| Framework | Next.js 14+ (App Router) |
| 3D | React Three Fiber + drei + Three.js |
| Animation | Framer Motion (UI transitions), GSAP (scroll/camera work) |
| Styling | Tailwind CSS |
| State | Zustand |
| Data fetching | Server Components (fetch to Django API); React Query for client-side interactivity |
| Forms | React Hook Form + Zod |
| Content editing preview | Next.js Draft Mode (tied to Wagtail preview links) |

---

## 2. Site Map & Routes

```
/                         3D hub / landing — discipline selector
/work/[discipline]        Full project grid (Software / Hardware / Impact), paginated
/work/[discipline]/[slug] Individual case study
/about                    Bio, timeline, skills
/contact                  Contact form
```

- `[discipline]` values come from the backend `Discipline` model (slugs) — do not hardcode a fixed list; fetch and render dynamically so a new discipline can be added later without a frontend deploy.

---

## 3. Page-by-Page Plan

### 3.1 Landing (`/`)
- **Above the fold**: lightweight 2D hero (name, tagline, CTA) that renders instantly — the 3D canvas loads after.
- **3D hub**: orbiting node graph — one node per discipline (max, since we're only surfacing curated content here, not full catalogs).
  - Each node shows the discipline's **2–4 flagship projects** on hover/tap (thumbnail + title), pulled from `is_featured=true` projects.
  - Clicking a node routes to `/work/[discipline]`.
  - Clicking a flagship preview routes straight to `/work/[discipline]/[slug]`.
- **Fallback**: if `prefers-reduced-motion` is set, on mobile, or on WebGL-unsupported browsers, render a static 2D card grid of the three disciplines instead of mounting the canvas at all.
- Canvas is loaded via `dynamic(() => import('./Hub3D'), { ssr: false })` with a `<Suspense>` boundary and a simple loading state.

### 3.2 Discipline grid (`/work/[discipline]`)
- Standard responsive grid/list, server-rendered (ISR) from `GET /api/projects/?discipline={slug}`.
- Filter/sort controls: by tag (tech stack), by date. No design ceiling on count — pagination or infinite scroll.
- Featured projects can get a visually larger card at the top, but this page shows **all** projects, not just flagship ones.

### 3.3 Case study (`/work/[discipline]/[slug]`)
- Rendered from `GET /api/projects/{slug}/`.
- Template must flex per discipline without being three separate templates:
  - Common: title, summary, rich-text/MDX body, gallery, tech/tool tags, date, links (repo/live/demo).
  - Conditional blocks (render only if data present): embedded video, 3D model viewer (`.glb` via drei `<Stage>`/`<OrbitControls>` for hardware projects), external link buttons (GitHub/live demo), impact metrics block (e.g., stats for impact projects).
- This "common shell + optional blocks" approach avoids hardcoding three templates and lets Wagtail-driven content decide what renders.

### 3.4 About (`/about`)
- Bio, skills (grouped by category), timeline (from `TimelineEntry` model) — a simple vertical/horizontal timeline component, filterable by discipline if desired.

### 3.5 Contact (`/contact`)
- React Hook Form + Zod validation, submits to `POST /api/contact/`.
- Honeypot field for spam; disable submit button + show inline success/error state (no full page reload).

---

## 4. 3D Implementation Notes

- **Concept locked**: orbiting node graph, 3 nodes (one per discipline), each surfacing 2–4 flagship project previews.
- Build the 3D layer *after* Phase 0.5 (visual identity) lands — colors/materials should reflect the real palette, not placeholders, to avoid redoing shaders/materials twice.
- Use draco-compressed `.glb` for any custom models; keep total first-load 3D asset weight under ~5MB.
- Bake lighting where possible; avoid expensive real-time shadows unless performance testing proves it's fine on mid-range mobile.
- Camera/orbit controls should be gentle and auto-rotate slowly when idle, pausing on interaction.

---

## 5. Data Contract Expectations (from Backend)

The frontend should treat these shapes as the contract (see `Backend.md` for full field lists):

```
GET /api/disciplines/            → [{ slug, name, description, theme_color, icon_ref }]
GET /api/projects/?discipline=&featured=  → [{ slug, title, summary, cover_image, discipline, is_featured, tags, date }]
GET /api/projects/{slug}/        → full case-study object incl. optional blocks
GET /api/timeline/               → [{ title, org, date_range, description, discipline }]
POST /api/contact/               → { name, email, message } + honeypot field
```

If the backend isn't ready yet, mock these exact shapes locally (e.g., MSW or static JSON) so integration is a drop-in swap later.

---

## 6. Environments & Config

- `NEXT_PUBLIC_API_URL` — points to Django API base URL (local/staging/prod).
- Draft mode secret shared with backend for Wagtail preview links.
- CORS must be enabled on the backend for whichever domain this is deployed to (Vercel preview URLs + production domain).

---

## 7. Build Order (Frontend-only sequencing)

1. Scaffold Next.js app, Tailwind, base layout, routing skeleton — build against **mocked data** matching the contract above.
2. Build discipline grid + case-study templates (the "content-first" pages) — highest priority since this is what visitors read.
3. Build About + Contact pages.
4. Once Phase 0.5 visual identity is delivered (palette/type/discipline accents), build the 3D hub.
5. Wire in real API calls once backend endpoints are live (swap mocks → fetch calls).
6. Add scroll/transition polish (Framer Motion, GSAP).
7. Performance + accessibility pass: Lighthouse, reduced-motion testing, mobile testing on real low/mid-end devices.

---

## 8. Performance & Accessibility Guardrails

- 3D canvas must never block first paint — always ship the 2D hero first.
- Provide a non-3D fallback path for reduced-motion, low-power, and no-WebGL cases.
- All interactive 3D elements need a keyboard/non-pointer equivalent (e.g., the same discipline links exist as plain HTML anchors even if visually secondary), for accessibility and SEO crawlability.
- Images/models lazy-loaded; use `next/image` for all raster assets.
