# Koffi Cobbin

### Builder of useful software, physical prototypes, and impact-focused projects.

I design and build products at the intersection of technology, creativity, and
real-world usefulness. This repository is the home of my public portfolio and
the place where I document the work, experiments, and ideas behind the things I
ship.

## What I work on

- **Software products** — thoughtful interfaces, practical tools, and digital
  experiences
- **Physical prototypes** — turning early ideas into tangible, testable objects
- **Impact-focused projects** — work grounded in people, context, and
  meaningful outcomes
- **Creative technology** — exploring the space between design, engineering,
  and experimentation

## About this repository

The portfolio is a responsive React application built with Vite and TypeScript.
It presents projects by discipline, detailed project stories, an about page,
and a contact flow.

The app is intentionally frontend-first and runs with local mock data by
default, making it easy to explore and develop without a database or API
credentials.

### Highlights

- Responsive portfolio browsing across desktop and mobile
- Project and discipline-based navigation
- Project detail pages with structured content
- About page with timeline content
- Contact form with local development fallback behavior
- Optional API integration through `VITE_API_URL`

## Tech stack

`React` · `TypeScript` · `Vite` · `Tailwind CSS` · `Wouter` ·
`TanStack React Query` · `Framer Motion` · `Radix UI` · `pnpm`

## Run it locally

Requirements:

- Node.js 20+
- pnpm 10

```powershell
corepack enable
pnpm install
pnpm run dev:portfolio
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

For architecture notes, API configuration, routes, quality checks, and
troubleshooting, see the [development guide](Development.md).

## Repository map

```text
artifacts/portfolio/src/
├── components/   Shared UI and portfolio components
├── lib/          API helpers, types, and utilities
├── mocks/        Local portfolio data
└── pages/        Route-level page components
```

## Portfolio routes

| Route | Description |
| --- | --- |
| `/` | Portfolio home |
| `/about` | About page and timeline |
| `/contact` | Contact form |
| `/work/:discipline` | Projects grouped by discipline |
| `/work/:discipline/:project` | Project detail |

## Current focus

Building work that is clear, useful, and grounded in the people and conditions
around it.

---

If you are exploring the portfolio, start at the home page. If you are
interested in the implementation, start with
[`Development.md`](Development.md).
