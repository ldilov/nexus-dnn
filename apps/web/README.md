# nexus-web

Vite + React + vanilla-extract frontend for the nexus-dnn host.

## Running

```
pnpm install
pnpm dev         # serves at http://localhost:5173
pnpm build       # production build under dist/ + runs scan:cdn
pnpm typecheck   # tsc --noEmit
```

## Spectral Graphite theme (spec 019 FR-032 / FR-T03)

All colors, typography, elevation, and motion tokens live under
`src/styles/`. **No component file may introduce a raw color/font literal
or a remote CDN reference** — the three CI scanners (wired into
`pnpm scan:theme`, `pnpm scan:terminology`, and `pnpm scan:cdn`) will fail
the build.

Tokens:

- `theme.css.ts` — colors + font families + spacing + radius + z-index
- `motion.css.ts` — duration + easing budgets (every animated property
  references a named token; reduced-motion collapses them all to `0s` via
  `tokens.css`)
- `elevation.css.ts` — ghost border, glass panel, primary-dim glow,
  surface card, focus ring, acid-green pulse
- `typography.css.ts` — self-hosted `@font-face` declarations pointing at
  `/fonts/*.woff2`
- `tokens.css` — CSS custom-property mirror (read by third-party
  components that can't consume the vanilla-extract surface directly)

## Semantic model (spec 019 refinement, 2026-04-16)

```
Extension (installed)
   │
   ▼
Module = Instance         ← read-only preview surface (4 tabs)
   ├── Review  ─► /#/modules/{id}                 (read-only)
   ├── Deploy  ─► POST /modules/{id}/deployments  → /#/deployments/{id}
   └── Edit    ─► /#/modules/{id}/draft/{uuid}    (client-side draft)
                 │
                 └─ Save ─► POST materialize      → /#/deployments/{id}

Deployment                ← editable (spec 018)
```

**Instances never persist edits.** Any edit forks a client-side Draft; saving the Draft mints a new Deployment. The Draft pipeline is universal — Blank Module, Instance-fork, and (future) Deployment-fork all route through `/#/modules/{source_module_id}/draft/{uuid}`.

## Modules page (spec 019 US1)

The Modules page (`/#/modules`) replaces the legacy `Recipes` + `Workflows`
sidebar items with a single bento grid of cards. Each card:

- shows a `ModuleIcon` (symbol from manifest, sanitized SVG from manifest,
  or FNV-1a-hashed fallback glyph)
- renders `View Blueprint` and `Deploy Instance` CTAs
- displays a `(N) ▾` blueprint quick-pick when the module has multiple
  recipes

Module detail (`/#/modules/{id}`) shows the summary, compatibility chip,
all blueprints, and the flat list of instances derived from the module.
Blueprint view (`/#/modules/{id}/blueprint`) runs read-only with Dry Run
and Clone-to-Deployment CTAs plus an Export .nx affordance when the module
has ≥ 1 instance (FR-018).

Legacy routes redirect: `/#/recipes` → `/#/modules` and
`/#/workflows/{id}` → `/#/modules/user:{id}/blueprint` (FR-004).

## Blank Module draft lifecycle (spec 019 FR-BM01..FR-BM07)

Clicking the Blank Module card mints a client-side UUID v4 and pushes the
route `/#/modules/user:draft:{uuid}`. The draft is mirrored to
`sessionStorage` (`nexus.module.draft.{uuid}`, ≤ 512 KiB, 500 ms debounce)
until the first save, when `POST /api/v1/modules/user:draft:{uuid}/materialize`
creates the `workflows` row, the initial `deployments` row, and rewrites
the URL to `/#/deployments/{deployment_id}` without reload. Materialize is
idempotent for 10 min — replaying with the same body returns HTTP 200 and
the same ids; a different body returns HTTP 409 `module.draft_uuid_conflict`.

## Install Extension from ZIP (spec 019 US9)

`InstallExtensionDrawer` is reachable from the Modules page header and
from the Extensions sidebar gallery. It uploads the `.zip` via
`POST /api/v1/extensions/install-from-zip` and, on success, invalidates
the module list so the new card slides in. Error codes map 1:1 to the
pipeline's `FR-IE05` variants (`zip.slip_attempt`, `zip.size_limit`,
`extension.already_installed`, …).

## Accessibility (spec 019 US8)

- Instance editor tab bar: `role="tablist"` + `aria-selected` on each tab
- Recipe segmented control (Overlay | Blueprint): nested `role="tablist"`
- Module bento: `role="grid"` wrapper with `role="gridcell"` cards
- Every Material Symbol used for status carries a text label (FR-045)
- `@media (prefers-reduced-motion: reduce)` in `tokens.css` collapses
  every motion token to `0s`

## Local-first posture (spec 019 FR-TP04/FR-TP05)

Every font is served from `/fonts/*.woff2`; no Google Fonts. No third-party
CDN is referenced in the built bundle — `pnpm build` runs `scan:cdn`
against `dist/` to keep it that way.
