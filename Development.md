# Development Guide

This document explains how to set up, run, and maintain the Koffi Cobbin
portfolio locally.

## App overview

The project is a responsive portfolio for shipped software, physical
prototypes, and impact-focused projects. It is implemented as a React
single-page application built with Vite and TypeScript.

The portfolio currently runs frontend-only:

- Local mock data is used by default.
- An optional HTTP API can be configured with `VITE_API_URL`.
- The contact form simulates a successful submission when no API is
  configured, which makes the complete form flow testable locally.

## Technology stack

- React and React DOM
- TypeScript
- Vite
- Tailwind CSS
- Wouter for client-side routing
- TanStack React Query for query management
- Framer Motion for animation
- Radix UI components
- pnpm workspaces

## Repository structure

```text
.
├── artifacts/
│   └── portfolio/
│       ├── src/
│       │   ├── components/   Shared UI and portfolio components
│       │   ├── hooks/        Reusable React hooks
│       │   ├── lib/          API helpers, types, and utilities
│       │   ├── mocks/        Local portfolio data
│       │   └── pages/        Route-level page components
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── attached_assets/          Images and other static source assets
├── lib/                      Shared workspace packages
├── scripts/                  Workspace helper scripts
├── package.json              Root workspace scripts
├── pnpm-lock.yaml            Locked dependency versions
└── pnpm-workspace.yaml       Workspace package configuration
```

The primary application source is in `artifacts/portfolio/src/`.

## Prerequisites

Install the following before setting up the project:

- Node.js 20 or newer
- pnpm 10

On Windows, use PowerShell. The root install check is implemented in Node.js
so the setup does not depend on POSIX shell commands.

## Initial setup

From the repository root:

```powershell
corepack enable
pnpm install
```

`pnpm install` installs dependencies for the complete workspace, including
the Portfolio package and shared packages.

## Run the development server

Start the portfolio from the repository root:

```powershell
pnpm run dev:portfolio
```

Open [http://localhost:5173](http://localhost:5173) in a browser.

The underlying package command is:

```powershell
pnpm --filter @workspace/portfolio run dev
```

The Vite server binds to `0.0.0.0`, uses port `5173` by default, and enables
strict port checking. To use another port for a local session, set `PORT`
before starting the command:

```powershell
$env:PORT = "5174"
pnpm run dev:portfolio
```

The application also supports a `BASE_PATH` environment variable when it
needs to be served below `/`:

```powershell
$env:BASE_PATH = "/portfolio/"
pnpm run dev:portfolio
```

When running both variables in the same PowerShell session, clear them when
they are no longer needed:

```powershell
Remove-Item Env:PORT -ErrorAction SilentlyContinue
Remove-Item Env:BASE_PATH -ErrorAction SilentlyContinue
```

## Optional API configuration

Without configuration, the app uses the data in
`artifacts/portfolio/src/mocks/data.ts`.

To connect an API during local development, create
`artifacts/portfolio/.env.local`:

```text
VITE_API_URL=https://your-api.example.com
```

Vite exposes variables prefixed with `VITE_` to browser code, so do not put
secrets in this file. The configured API is expected to provide these
endpoints:

```text
GET  /api/disciplines/
GET  /api/projects/?discipline=<slug>&featured=<true|false>
GET  /api/projects/<slug>/
GET  /api/timeline/
POST /api/contact/
```

The frontend falls back to mock data when a read request is unavailable. The
contact request uses the configured API when `VITE_API_URL` is present and
otherwise returns a simulated success response after a short delay.

## Application routes

The client-side routes are defined in `artifacts/portfolio/src/App.tsx`:

| Route | Purpose |
| --- | --- |
| `/` | Portfolio home page |
| `/about` | About page and timeline |
| `/contact` | Contact form |
| `/work/:discipline` | Projects grouped by discipline |
| `/work/:discipline/:project` | Project detail page |

Unknown routes render the not-found page.

## Updating portfolio content

For the local/demo experience, update
`artifacts/portfolio/src/mocks/data.ts`. The file contains the disciplines,
projects, project summaries, and timeline entries consumed by the API helper.

When an API is configured, the API responses take precedence over the local
fallback data for successful requests.

Images and other static assets should be kept in `attached_assets/` when they
are shared across the workspace. The Vite configuration exposes that
directory through the `@assets` alias.

## Quality checks

Run the portfolio typecheck:

```powershell
pnpm --filter @workspace/portfolio run typecheck
```

Build the portfolio for production:

```powershell
pnpm --filter @workspace/portfolio run build
```

Run the workspace typechecks:

```powershell
pnpm run typecheck
```

Run the full workspace build:

```powershell
pnpm run build
```

The portfolio production output is written to
`artifacts/portfolio/dist/public/`.

## Preview a production build

After running the portfolio build, serve the generated app locally with:

```powershell
pnpm --filter @workspace/portfolio run serve
```

The preview server uses the same `PORT` value as the Vite configuration and
defaults to port `5173`.

## Development conventions

- Keep route-level UI in `artifacts/portfolio/src/pages/`.
- Put reusable visual pieces in `artifacts/portfolio/src/components/`.
- Put API access and fallback behavior in `artifacts/portfolio/src/lib/api.ts`.
- Keep shared TypeScript models in `artifacts/portfolio/src/lib/types.ts`.
- Prefer the existing UI primitives and Tailwind conventions before adding a
  new component pattern.
- Keep the app frontend-only unless a backend requirement is explicitly
  added.
- Do not commit `.env` or `.env.*` files containing local configuration or
  secrets.

## Troubleshooting

### `pnpm` is not recognized

Run:

```powershell
corepack enable
```

Then open a new PowerShell session and retry `pnpm install`.

### The requested port is already in use

The Vite server uses strict port checking and will stop instead of silently
switching ports. Either stop the process using the port or choose another
one:

```powershell
$env:PORT = "5174"
pnpm run dev:portfolio
```

### Changes to environment variables are not visible

Restart the Vite development server after changing `.env.local` or any
`VITE_*` variable. These values are read when Vite starts.

### Pages show mock content

This is expected when `VITE_API_URL` is not set or when the configured API
request fails. Check the browser console and confirm the API URL and endpoint
responses if remote content is expected.