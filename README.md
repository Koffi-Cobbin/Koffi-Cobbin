# Koffi Cobbin Portfolio

A responsive portfolio for shipped software, physical prototypes, and impact-focused projects.

## Run locally on Windows

Install Node.js 20 or newer and pnpm 10, then run these commands from the repository root in PowerShell:

```powershell
corepack enable
pnpm install
pnpm run dev:portfolio
```

Open [http://localhost:5173](http://localhost:5173).

The portfolio uses local mock data by default, so no database or API credentials are needed. To connect a remote content API, create `artifacts/portfolio/.env.local` with:

```text
VITE_API_URL=https://your-api.example.com
```

The app is a pnpm workspace. Its frontend source is in `artifacts/portfolio/src/`; the main routes are `/`, `/about`, `/contact`, `/work/:discipline`, and `/work/:discipline/:project`.

## Checks

```powershell
pnpm --filter @workspace/portfolio run typecheck
pnpm --filter @workspace/portfolio run build
```