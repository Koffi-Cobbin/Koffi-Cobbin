# Portfolio

A responsive portfolio for shipped software, physical prototypes, and impact-focused projects.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/portfolio/src/pages/` — client-rendered portfolio routes
- `artifacts/portfolio/src/components/` — shared navigation, content, and form components
- `artifacts/portfolio/src/mocks/data.ts` — current local content source
- `artifacts/portfolio/src/index.css` — portfolio theme tokens and responsive base styles

## Architecture decisions

- The imported Next.js portfolio is served as a frontend-only Vite artifact because its API fallback and content are currently local mock data.
- Wouter handles client-side routes and the managed artifact serves the app at `/`.
- Project detail routes are client-rendered so cards remain useful even before the remote content API is provisioned.

## Product

Visitors can browse work by discipline, open project case studies, learn about the maker's experience, and send a contact message.

## User preferences

The interface should prioritize mobile-first usability and comfortable touch targets.

## Gotchas

The frontend currently falls back to `src/mocks/data.ts` when `VITE_API_URL` is not configured.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
