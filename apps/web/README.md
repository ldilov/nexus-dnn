# nexus-web

Vite + React + vanilla-extract frontend for the nexus-dnn host.

## Running

```
pnpm install
pnpm dev         # serves at http://localhost:5173
pnpm build       # production build under dist/ + runs scan:cdn
pnpm typecheck   # tsc --noEmit
```

## Desktop build (Tauri 2.x — spec 042)

The desktop app wraps this frontend with a native window + system tray + embedded host. Prerequisites beyond the standard frontend deps:

```
cargo install tauri-cli --version "^2"   # one-time, ~3-5 min build
```

Then from this directory (`apps/web/`, NOT the workspace root — Tauri issue #2643):

```
pnpm tauri dev    # launches Vite + builds the Rust shell + opens the desktop window
pnpm tauri build  # produces platform bundles under target/release/bundle/
```

The browser dev workflow (`pnpm dev` above) continues to work unchanged for non-desktop iterations. The frontend's `services/ipc_adapter.ts` runtime-detects `window.isTauri` and routes IPC to either Tauri commands (desktop) or the existing axum HTTP/SSE endpoints (browser dev).

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

## Regression harness

The frontend ships three safety nets, all runnable from `apps/web/`:

- `pnpm scan:constitution` — AST scan over `src/` enforcing the frontend
  constitution (Principle XII / Appendix F). Nine rules (SR-001…SR-009);
  pre-existing violations are pinned in
  `scripts/scan-constitution-baseline.json` and MUST only shrink, never grow.
- `pnpm test:smoke` — Playwright smoke harness that visits every route
  enumerated in `tests/smoke/routes.json` and asserts user-visible copy
  appears within 3 seconds. Fail on missing string = missing UI regression.
- `pnpm test:visual` — Playwright visual regression at viewports 375 /
  768 / 1440 with `reducedMotion: 'reduce'` forced. Baselines live under
  `tests/visual/baselines/`. Capture with
  `pnpm test:visual --update-snapshots`; diff threshold is 0.5 % per-viewport.

Run all three at once via `pnpm scan:all && pnpm test:regression`. CI runs
the same gates on every PR touching `apps/web/`.

### Spec 037 — Spectral Graphite redesign harness

Two additional gates land with the [Spectral Graphite redesign](../../specs/037-spectral-graphite-redesign/quickstart.md):

- `pnpm audit:redesign` — six-check audit (`hex` / `px` / `filler` / `contrast` / `boundary` / `io-boundary`) over the redesign source. The `boundary` check is **required** in CI (Constitution XIII.7 — host ↔ extension boundary is a hard gate); the other five are **advisory** and post their findings as a PR comment via [`.github/workflows/audit-redesign.yml`](../../.github/workflows/audit-redesign.yml). Annotate legitimate exceptions with `// audit-allow: <check> — <reason ≥ 8 chars>` on the same line as the literal. Contract: [`contracts/audit_script.cli.md`](../../specs/037-spectral-graphite-redesign/contracts/audit_script.cli.md).
- `pnpm test:a11y` — Playwright + `@axe-core/playwright` baseline. Asserts zero serious/critical WCAG 2.2 AA violations on every primary host route at the documented `data-density="cozy"` × `data-accent="primary"` × `data-card="flat"` baseline; `tests/a11y/forced_colors.spec.ts` adds a Windows High Contrast emulation pass over the four anchor routes.

The operator smoke walkthrough for the redesign lives at [`specs/037-spectral-graphite-redesign/quickstart.md`](../../specs/037-spectral-graphite-redesign/quickstart.md).

## Layered architecture

Top-level folders under `src/` each serve one concern. **Never** cross-import
horizontally within the same layer — always go through `services/`.

| Folder | Role |
|---|---|
| `api/` | Machine-generated Rust → TS DTO types + thin `api_client.ts` shim |
| `services/` | **The only I/O boundary.** Nine domain files (backends, runs, layouts, events, …) wrap `api_client` and own SSE streams |
| `hooks/` | Shared React hooks (`use_api`, `use_event_stream`, `use_polling_metrics`) |
| `components/` | Cross-view presentational primitives (Tabs, Card, Button, …) |
| `layout/` | App shell — `Shell`, `TopBar`, `Sidebar`, `RightInspector` |
| `theme/` | vanilla-extract contract + `motion.ts` tokens |
| `views/<name>/` | One folder per screen — `.view.tsx` (loader + context), `.ui.tsx` (markup), `.css.ts` (styles), `index.ts`, plus optional `components/` and `hooks/` |
| `routes.tsx` | `createHashRouter` — single source of routing truth |
| `root_layout.tsx` | Outlet mounting + app-wide context |

Route transitions are **CSS-only** (`routeEnterKeyframes` in `app.css.ts`,
keyed by `location.pathname`, collapses to `none` under
`prefers-reduced-motion: reduce`). Motion (`motion@12`) is lazy-loaded via
`React.lazy` inside `views/backends/components/install_modal.tsx` so the
~28 KB sidecar chunk only ships to users who open the install flow. The
main chunk delta vs pre-Motion baseline is enforced by
`pnpm scan:bundle-size` against `bundle-baseline.json` (tolerance 8 KB).

### Updating a baseline (intentional visual change)

1. Make the visual change on a feature branch.
2. Run `pnpm test:visual --update-snapshots` locally.
3. Commit the updated PNGs in a dedicated commit with message
   `test(visual): update baseline for <route> — <reason>`.
4. Include a before/after image pair in the PR description.
5. Reviewer sign-off on the baseline commit is required independent of the
   functional review.

### Adding a new route

Add one entry to `tests/smoke/routes.json` with `path`, `title`, and at
least three `mustContain` strings, then capture a baseline for the new
route at all three viewports. The smoke harness asserts fixture-count ==
route-count so no route slips through unharnessed.
