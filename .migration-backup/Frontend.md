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

1. ✅ Scaffold Next.js app, Tailwind, base layout, routing skeleton — build against **mocked data** matching the contract above.
2. ✅ Build discipline grid + case-study templates (the "content-first" pages) — highest priority since this is what visitors read.
3. ✅ Build About + Contact pages.
4. ✅ Phase 0.5 visual identity (palette/type/discipline accents) — **COMPLETE**.
5. Build the 3D hub (React Three Fiber).
6. Wire in real API calls once backend endpoints are live (swap mocks → fetch calls).
7. Add scroll/transition polish (Framer Motion, GSAP).
8. Performance + accessibility pass: Lighthouse, reduced-motion testing, mobile testing on real low/mid-end devices.

---

## 8. Performance & Accessibility Guardrails

- 3D canvas must never block first paint — always ship the 2D hero first.
- Provide a non-3D fallback path for reduced-motion, low-power, and no-WebGL cases.
- All interactive 3D elements need a keyboard/non-pointer equivalent (e.g., the same discipline links exist as plain HTML anchors even if visually secondary), for accessibility and SEO crawlability.
- Images/models lazy-loaded; use `next/image` for all raster assets.

---

## 9. Current Status (Build Order Steps 1-4 Complete)

**Completed:**
- ✅ Next.js 14 App Router scaffold with Tailwind CSS
- ✅ Base layout (Header, Footer, navigation)
- ✅ Routing skeleton (5 routes)
- ✅ Mock data layer (`lib/api.ts`) matching Backend.md contract
- ✅ Discipline grid pages with responsive cards
- ✅ Case study template with rich-text rendering
- ✅ About page with timeline component
- ✅ Contact form with React Hook Form + Zod validation
- ✅ TypeScript interfaces mirroring backend models
- ✅ Phase 0.5 Visual Identity (see §11 for details)

**Architecture Achieved:**
- Server Components by default (only ContactForm is client-side)
- Centralized data access via `lib/api.ts` (mock/API switching via env var)
- Dynamic routing with data-driven discipline slugs
- ISR with 60s revalidation
- Accessibility foundations (reduced-motion, focus-visible, semantic HTML)
- Discipline-specific theming via `data-discipline` attributes

---

## 11. Phase 0.5 — Visual Identity (Complete)

### 11.1 Color System

**Base Neutrals (Warm undertone for cohesion):**
- `ink`: Deep charcoal (#1c1917) — primary text
- `paper`: Warm off-white (#fafaf9) — backgrounds
- `line`: Subtle warm gray (#e7e5e4) — borders
- `muted`: Balanced medium gray (#78716c) — secondary text

**Discipline Accent Colors:**

| Discipline | Primary | Mood | Shades |
|------------|---------|------|--------|
| Software | #0ea5e9 (Sky 500) | Cool, precise, digital | 50-900 |
| Hardware | #f97316 (Orange 500) | Warm, tangible, industrial | 50-900 |
| Impact | #10b981 (Emerald 500) | Organic, growth, human | 50-900 |

### 11.2 Typography

**Font Pairing:**
- **Display:** Instrument Serif — Modern, elegant serif with character
- **Body:** Inter — Highly readable, neutral, excellent for long-form
- **Mono:** JetBrains Mono — For code snippets and technical content

**Implementation:**
- Google Fonts loaded via `next/font/google` for optimal performance
- CSS custom properties for fallback: `--font-display`, `--font-body`, `--font-mono`

### 11.3 Discipline Moods

**Software (Cool Precision)**
- Color temperature: Cool blues/cyans
- Visual language: Crisp lines, geometric patterns, code-like aesthetics
- Applications: Code blocks, technical diagrams, digital interfaces

**Hardware (Warm Craft)**
- Color temperature: Warm oranges/ambers
- Visual language: Industrial textures, metallic accents, tangible materials
- Applications: Product photos, circuit diagrams, physical prototypes

**Impact (Natural Growth)**
- Color temperature: Neutral-warm greens
- Visual language: Organic shapes, natural gradients, human-focused
- Applications: Environmental data, community projects, sustainability metrics

### 11.4 Design Tokens Implemented

**Tailwind Config (`tailwind.config.ts`):**
- Extended color palette with discipline-specific shades
- Custom font families (display, body, mono)
- Animation keyframes (fade-in, slide-up, slide-in-left)
- Shadow utilities (soft, medium, lift)
- Max-width constraints (prose: 68ch, content: 1200px)

**CSS Custom Properties (`globals.css`):**
- Discipline accent colors for dynamic theming
- Spacing scale variables
- Transition timing functions
- Component utilities (card, btn, tag styles)

**Component Styles:**
- `.card` — Base card with hover effects
- `.card-discipline` — Discipline-themed cards with accent borders
- `.btn-primary`, `.btn-secondary` — Button variants
- `.btn-software`, `.btn-hardware`, `.btn-impact` — Discipline-specific buttons
- `.tag`, `.tag-software`, `.tag-hardware`, `.tag-impact` — Tag/chip components
- `.timeline-item` — Timeline entries with discipline colors

### 11.5 Accessibility

- Focus-visible outlines on all interactive elements
- Reduced-motion support disables animations
- Semantic HTML throughout
- Color contrast ratios meet WCAG AA
- Print styles included

---

## 12. Critical Fixes Required

### 12.1 Security: XSS Vulnerability
- **Issue:** `dangerouslySetInnerHTML` in case study page renders unsanitized HTML
- **Fix:** Add DOMPurify (`isomorphic-dompurify`) for server-side sanitization
- **Priority:** Critical — blocks production deployment

### 12.2 Error Handling Boundaries
- **Issue:** No `error.tsx` files exist; API failures crash entire pages
- **Fix:** Add error boundaries at:
  - `app/error.tsx` (root)
  - `app/work/[discipline]/error.tsx`
  - `app/work/[discipline]/[slug]/error.tsx`
- **Priority:** High

### 12.3 Loading States
- **Issue:** No `loading.tsx` files; blank pages during data fetching
- **Fix:** Add loading skeletons for:
  - `app/work/[discipline]/loading.tsx`
  - `app/work/[discipline]/[slug]/loading.tsx`
  - `app/about/loading.tsx`
- **Priority:** High

---

## 13. Performance Improvements

### 13.1 Data Fetching Optimization
- **Issue:** N+1 fetching on home page (fetches projects per discipline)
- **Fix:** Single `getProjects()` call, filter client-side or use `Promise.all` for parallel fetching
- **Priority:** Medium

### 13.2 Header Caching
- **Issue:** Header fetches disciplines on every navigation
- **Fix:** Increase `revalidate` time for disciplines (e.g., 3600s) or fetch in layout and pass via context
- **Priority:** Medium

### 13.3 Image Domain Restriction
- **Issue:** Wildcard `https://**` in `next.config.js` allows arbitrary image sources
- **Fix:** Restrict `remotePatterns` to actual CDN/S3 host once provisioned
- **Priority:** Low (placeholder acceptable for development)

---

## 14. Code Quality Improvements

### 14.1 Remove Unused Dependencies
- **Issue:** `zustand`, `framer-motion`, `clsx` installed but not imported
- **Fix:** Remove until needed (Phase 3) or document purpose clearly
- **Priority:** Low

### 14.2 ESLint Configuration
- **Issue:** No `.eslintrc.json` file despite eslint being installed
- **Fix:** Add `.eslintrc.json` with `{ "extends": "next/core-web-vitals" }`
- **Priority:** Medium

### 14.3 Prettier Setup
- **Issue:** No code formatting configuration
- **Fix:** Add `.prettierrc` and `format` script to package.json
- **Priority:** Low

### 14.4 TypeScript Strictness
- **Issue:** Dynamic route params typed as plain objects (may break in Next.js 15+)
- **Fix:** Use `params: Promise<{ discipline: string; slug: string }>` convention
- **Priority:** Low (future-proofing)

---

## 15. Missing Features (Per Frontend.md Spec)

### 15.1 Pagination & Filtering
- **Spec:** Section 3.2 requires "pagination or infinite scroll" + "filter/sort controls"
- **Status:** Not implemented — all projects render at once
- **Priority:** High (usability)

### 15.2 SEO Optimization
- **Issue:** No `generateMetadata()` or `generateStaticParams()` exports
- **Fix:** Add per-page metadata and static generation for known slugs
- **Priority:** High (discoverability)

### 15.3 Custom 404 Page
- **Issue:** `notFound()` called but no `not-found.tsx` exists
- **Fix:** Create `app/not-found.tsx` with branded error page
- **Priority:** Medium

### 15.4 Draft Mode Integration
- **Issue:** `DRAFT_MODE_SECRET` defined in `.env.example` but not wired up
- **Fix:** Implement Next.js Draft Mode for Wagtail preview links
- **Priority:** Low (requires backend coordination)

### 15.5 Static Assets
- **Issue:** `public/` directory empty — no favicon, robots.txt, sitemap.xml
- **Fix:** Add essential static assets
- **Priority:** Medium

---

## 16. Next Steps Plan

### Phase 5: Hardening (Immediate — 1-2 days)
1. Add DOMPurify for HTML sanitization
2. Create `error.tsx` files for all routes
3. Create `loading.tsx` skeletons
4. Add `.eslintrc.json` configuration
5. Add custom `not-found.tsx` page

### Phase 6: Feature Completion (Next — 3-5 days)
1. Implement pagination on discipline grids
2. Add filter/sort controls (by tech stack, date)
3. Add `generateMetadata()` for all pages
4. Add `generateStaticParams()` for known slugs
5. Create favicon and static assets

### Phase 7: Backend Integration (When API Ready)
1. Wire up real API endpoints (swap mocks → fetch)
2. Implement Draft Mode for Wagtail previews
3. Test CORS configuration
4. Update image domains in `next.config.js`

### Phase 8: Polish (After Visual Identity)
1. Build 3D hub with React Three Fiber
2. Add Framer Motion transitions
3. Add GSAP scroll animations
4. Performance optimization pass
5. Accessibility audit (Lighthouse, real device testing)

---

## 17. Testing Checklist

### Functional Testing
- [ ] All routes render correctly
- [ ] Dynamic routing works for all discipline slugs
- [ ] 404 page shows for invalid slugs
- [ ] Contact form validation works
- [ ] Contact form submission handles success/error states
- [ ] Navigation links work correctly

### Performance Testing
- [ ] Lighthouse score > 90 for all metrics
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.5s

### Accessibility Testing
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility verified
- [ ] Reduced-motion preferences respected
- [ ] Color contrast ratios meet WCAG AA
- [ ] Focus indicators visible

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome for Android

### Responsive Testing
- [ ] Mobile (320px-480px)
- [ ] Tablet (768px-1024px)
- [ ] Desktop (1280px+)
- [ ] Large screens (1920px+)
