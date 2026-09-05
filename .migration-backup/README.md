<<<<<<< HEAD
# Portfolio — Frontend

Next.js (App Router) implementation of the plan in `Frontend.md`. This scaffold covers **Build Order steps 1–3**: routing skeleton, content-first pages (discipline grids + case studies), and About/Contact — all running against mock data.

## What's here

- Full route structure: `/`, `/work/[discipline]`, `/work/[discipline]/[slug]`, `/about`, `/contact`
- Data layer (`lib/api.ts`) that calls the real Django API when `NEXT_PUBLIC_API_URL` is set, and transparently falls back to `mocks/data.ts` otherwise — so this runs standalone before the backend exists
- Contact form wired end-to-end (React Hook Form + Zod + honeypot), posting through the same data layer
- Types (`lib/types.ts`) mirroring the API contract in `Backend.md` exactly

## What's deliberately not here yet

- **3D hub** — scheduled for Phase 3 in `Frontend.md`, after Phase 0.5 (visual identity) is locked. The landing page currently renders the 2D fallback treatment directly (see the comment in `app/page.tsx`); dropping in the R3F hub later means adding a client component behind a `dynamic()` import, with this grid staying as-is for reduced-motion/no-WebGL/mobile users.
- **Real visual identity** — `tailwind.config.ts` and `app/globals.css` hold intentionally neutral placeholder tokens (see comments in both files), not a designed palette/type system.
- **3D model viewer** on case-study pages — stubbed with a placeholder block wherever `project.model_3d` is set.

## Getting started

```bash
npm install
cp .env.example .env.local   # leave NEXT_PUBLIC_API_URL blank to use mock data
npm run dev
```

Visit `http://localhost:3000`.

## Connecting the real backend

Once `Backend.md`'s API is deployed, set `NEXT_PUBLIC_API_URL` in `.env.local` to its base URL. No other code changes are required — every page reads through `lib/api.ts`, which already matches the contract's field names and endpoint shapes.

## Next steps (in order)

1. Visual identity pass (Phase 0.5) — replace tokens in `tailwind.config.ts` / `app/globals.css`.
2. Connect to a live Backend.md deployment; retire the mock fallback for staging/prod.
3. Build the 3D hub (`react-three-fiber`, `drei`, `three`, `gsap` — not yet installed, add when this phase starts).
4. Motion/polish pass with Framer Motion.
5. Performance + accessibility audit (Lighthouse, reduced-motion testing, real mobile devices).
=======
### Hi, I'm Koffi Cobbin

I build across three areas that don't usually share a portfolio: fullstack web applications, hardware engineering, and impact-driven projects. Most of what's here is the product of taking an idea from a rough sketch to something people actually use — whether that's shipped code, a working prototype, or a tool built for a specific real-world outcome.

I like projects where the constraint is real: a physical board that has to survive the field, a codebase a small team has to maintain, a tool that only matters if someone without a technical background can pick it up and use it.

**Currently building:** an interactive portfolio site (Next.js + Django + Three.js) to bring these three areas together in one place — in progress in this repo.

#### What I work with

- **Software** — Next.js, React, TypeScript, Django, PostgreSQL
- **Hardware** — embedded systems, KiCad, rapid prototyping
- **Impact** — tools and products built for a specific community outcome, not just a demo

#### Open to

Collaborations that cross disciplines — a hardware idea that needs a software layer, or a software project that needs to survive contact with the physical world.

#### Find me

- Portfolio: *link coming soon*
- Reach out via the contact form on the portfolio once it's live

<sub>Repo docs: see [`DEVELOPMENT.md`](./DEVELOPMENT.md) for setup instructions, [`Frontend.md`](./Frontend.md) and `Backend.md` for the build plan.</sub>
>>>>>>> f675b1bb5aebca2a9692230e92a36d023a5a88a1
