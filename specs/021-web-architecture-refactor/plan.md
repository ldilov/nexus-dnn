# Implementation Plan: Web App Architecture Refactor (Layered + Data-Driven)

**Branch**: `main` (working directly until feature branch cuts for first slice)  |  **Date**: 2026-04-17  |  **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/021-web-architecture-refactor/spec.md`

## Summary

Reshape `apps/web/` from a drifted mixed-responsibility SPA (335-line `App.tsx`, 7 param-only wrapper components, `useEffect` fetches, duplicated `InstallModal`, canvas internals and top-level screens co-mingled under `views/`) into the constitution-v1.2.0 Principle XII shape: layered folders (`components/`, `hooks/`, `services/`, `utils/`, `views/<screen>/`), smart/presentational split (`*.view.tsx` / `*.ui.tsx`), React Router v7 **data mode** (`createHashRouter` + loaders/actions/`errorElement`), single `services/` I/O boundary, `motion` (not `framer-motion`) for route transitions and shared-element modal animation, `vanilla-extract` as the sole styling layer. Ship in five reviewable slices (regression harness first, router migration, Backends pilot, screen-by-screen sweep, animation polish). Every slice gates on a Playwright visual-diff suite plus a new `scan:constitution` CI job that blocks reintroduction of forbidden patterns.

## Technical Context

**Language/Version**: TypeScript 5.7, React 19.0, Node ≥ 20 (for Vite 6 and Playwright)
**Primary Dependencies**: `react@^19`, `react-dom@^19`, `react-router@^7.14` (unified v7 package — source imports switch FROM `react-router-dom` TO `react-router`; the `-dom` NPM dep stays one release as a compat alias), `@vanilla-extract/css@^1.17`, `swr@^2.4` (live-polling surfaces only), `@xyflow/react@^12` (workflow canvas), `sonner@^2`. **New**: `motion@^12` (formerly Framer Motion — import path `motion/react`; use `LazyMotion + m` for bundle discipline).
**Storage**: N/A (frontend-only refactor; no DB, no sqlx). `sessionStorage` for draft envelopes (unchanged). The Rust host is untouched.
**Testing**: `vitest` for unit + integration (existing); **new**: `@playwright/test@^1.50` for visual regression + route-smoke; existing Node-based scanner scripts (`scan:theme`, `scan:terminology`, `scan:cdn`, `scan:noop`) plus **new** `scan:constitution` under `apps/web/scripts/`.
**Target Platform**: Evergreen desktop browsers (Chromium, Firefox, Safari), Windows/macOS/Linux; Vite-bundled SPA served by the Rust host at `/`. No mobile targets in this spec.
**Project Type**: Web-app frontend refactor inside an existing multi-language workspace (Rust host + TS/React frontend). No new projects created.
**Performance Goals**: Route transition ≤ 250ms on 4× CPU-throttled Chrome Performance trace (SC-007); first-paint bundle growth ≤ 8 KB gzipped after Motion introduction (SC-012); 60 fps install-modal open/close on a mid-range laptop.
**Constraints**: Zero visible regression (visual diff ≤ 0.5% per route viewport per SC-003/SC-010); every merge bisectable (`pnpm tsc --noEmit` + `pnpm build` green on every commit per FR-036); no Rust-side changes; HashRouter retained because the Rust server does not serve SPA fallback HTML (spec Assumptions); constitution v1.2.0 Principle XII + Appendices E/F MUST pass on every PR.
**Scale/Scope**: ~16 top-level routes, ~180 TS/TSX source files under `apps/web/src/`, single-digit contributors. Refactor lands in 5 PRs (US5 harness → US1 router → US2 pilot → US3 sweep screen-by-screen → US4 animation); US3 itself spans ~10 sub-PRs, one per screen.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Evaluation | Status |
|---|---|---|
| **I. Ecosystem-First** | Motion and Playwright are battle-tested, multi-million-download ecosystem packages — not hand-rolled. React Router v7 data mode is the official upgrade path, not a custom router. All new dependencies are standard OSS. | **PASS** |
| **II. SOLID / Pure Functions** | The `.view.tsx` / `.ui.tsx` split is SRP applied at the screen level (smart = side-effectful, dumb = pure render). Loaders are pure input→output functions of `{ params, request }`. Services are single-responsibility wrappers over one backend domain each. | **PASS** |
| **III. Modularity / Method Size** | Target file budgets: `.view.tsx` ≤ 150 lines, `.ui.tsx` ≤ 200 lines, loader ≤ 25 lines. `App.tsx` drops from 575 to ≤ 60 (SC-001). No `utils/helpers/common` folders larger than 100 lines. | **PASS** |
| **IV. Self-Documenting Code** | Zero inline comments in new source (constitution IV). Clause-reference comments in the `scan:constitution` rules reside in the scanner script (tooling, not app source), which is the documented exception carve-out for CI tooling. | **PASS** |
| **V. Extendability via Adapter Contracts** | Each route is a pluggable route-object; adding a new screen = adding a file and a route entry. Services expose typed function contracts consumed by loaders; swapping the API client implementation doesn't touch views. | **PASS** |
| **VI. Test-First Verification** | US5 (regression harness) lands **before** US1. Backend contract tests at `/api/v1/*` remain the invariant source of truth (Principle VI design-heavy-UI carve-out, v1.1.2). Per-screen vitest coverage extended opportunistically. Frontend test-strategy section below formally invokes the carve-out. | **PASS** (invoking carve-out; see § Test Strategy below) |
| **VII. Memory / Type Safety** | TypeScript `strict` already enabled in `tsconfig.json`. Loaders return typed objects consumed via `useLoaderData() as Awaited<ReturnType<typeof loader>>`. No `any`. WebSocket / `EventSource` lifecycle owned by effect cleanup — no leaks. | **PASS** |
| **VIII. Living Documentation** | `README.md` under `apps/web/` gains a § "Directory layout" block matching Principle XII.1. Root `README.md` link updated to reference spec 021. | **PASS** (to be updated in US1 PR) |
| **IX. Git-Flow Branching** | Each user story lands on a branch `021-web-architecture-refactor-usN-slug`, squash-merged into `main`. Conventional commits enforced. FR-036 mandates every commit keeps `pnpm tsc --noEmit` + `pnpm build` green. | **PASS** |
| **X. Parallelism-First** | US3 screen sweeps run independently — disjoint files, parallel PRs. Playwright visual-diff suite runs routes in parallel within a shard. | **PASS** |
| **XI. Rust Idioms & Anti-Pattern Registry** | No Rust changes. | **N/A** |
| **XII. Web Frontend Architecture** | **This spec is the mechanism to bring the codebase into compliance.** Every FR maps to a clause (XII.1–XII.7). `scan:constitution` (FR-031) mechanically enforces Appendix F on every PR. | **PASS** (by construction) |

**Test Strategy** (invoking Principle VI design-heavy-UI carve-out, v1.1.2):

The constitution amendment for spec 019 carved out per-component vitest/Playwright test files for predominantly visual integration surfaces. This spec inherits the carve-out with a **material hardening**: instead of deferring UI tests entirely, it introduces a **visual-regression harness** (Playwright) plus a **route-smoke harness** (DOM string assertions) as the safety net, since the refactor spans every screen. Per-component vitest files are NOT mandated for this spec — the visual baseline + string smoke + `scan:constitution` triad is the authoritative regression layer. Backend contract tests under `crates/nexus-api/tests/` remain untouched and remain the authoritative data-invariant safety net. This is recorded in § Edge Cases of spec.md and called out here per the carve-out's citation requirement.

**Gate status**: PASS on all applicable principles. No Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/021-web-architecture-refactor/
├── plan.md              # this file
├── spec.md              # feature specification (done)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output — domain entities of the refactor
├── quickstart.md        # Phase 1 output — "add a new screen" walkthrough
├── contracts/           # Phase 1 output — scanner rule contract + route-smoke JSON schema
│   ├── scan-constitution.contract.md
│   ├── route-smoke.schema.json
│   └── visual-baseline.contract.md
├── checklists/
│   └── requirements.md  # done (all items pass)
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

Target shape of `apps/web/src/` after this spec completes. Top-level folders marked `(new)` are created during US1/US2; `(kept)` already exist; `(moved)` relocate during US3.

```text
apps/
└── web/
    ├── package.json                    # + motion, + @playwright/test
    ├── playwright.config.ts            (new, US5)
    ├── scripts/
    │   └── scan-constitution.mjs       (new, US5)
    ├── tests/
    │   ├── visual/
    │   │   ├── baselines/              (new, US5 — PNG per-route per-viewport)
    │   │   └── routes.spec.ts
    │   └── smoke/
    │       ├── routes.json             (new, US5 — fixture)
    │       └── routes.spec.ts
    └── src/
        ├── assets/                     (kept)
        ├── components/                 (kept — cross-view presentational only)
        ├── hooks/                      (kept — React-only logic, no I/O)
        ├── services/                   (new, US2 — ONLY I/O boundary)
        │   ├── api_client.ts           (moved from src/api/client.ts)
        │   ├── backends.ts
        │   ├── host_models.ts
        │   ├── huggingface.ts
        │   ├── extensions.ts
        │   ├── runs.ts
        │   ├── modules.ts
        │   ├── deployments.ts
        │   └── event_streams.ts        (WebSocket subscriptions)
        ├── utils/                      (kept)
        ├── constants/                  (kept/added as needed)
        ├── types/                      (kept)
        ├── theme/                      (kept)
        ├── api/generated/              (kept — DTOs from Rust; do not move)
        ├── views/
        │   ├── home/                   (moved from catalog/home_dashboard.*)
        │   │   ├── home.view.tsx
        │   │   ├── home.ui.tsx
        │   │   ├── home.css.ts
        │   │   └── index.ts
        │   ├── recipes/                (moved from catalog/recipe_catalog.*)
        │   ├── workflows/              (moved from catalog/workflow_catalog.* + canvas internals)
        │   │   ├── components/
        │   │   │   ├── canvas/         (moved from src/views/{operator_*, alignment_*, drop_*, boundary_*, canvas_*, graph_toolbar, port_types})
        │   │   │   └── workflow_catalog/
        │   │   ├── workflows.view.tsx
        │   │   ├── workflows.ui.tsx
        │   │   └── index.ts
        │   ├── modules/                (moved from src/modules/)
        │   │   ├── modules.view.tsx
        │   │   ├── modules.ui.tsx
        │   │   └── blueprint/, draft/, instance/ (sub-routes or components)
        │   ├── deployments/            (moved from src/views/deployments_view.*)
        │   │   ├── deployments.view.tsx
        │   │   ├── deployments.ui.tsx
        │   │   └── detail/             (deployment_detail screen)
        │   ├── backends/               (PILOT, US2 — moved from src/backends/ + src/views/backends_view.*)
        │   │   ├── components/
        │   │   │   ├── install_modal/  (DEDUPED from src/backends/install_modal.* + src/components/layout/install_modal.*)
        │   │   │   ├── variant_picker_drawer/
        │   │   │   ├── backend_card/
        │   │   │   └── settings_panel/
        │   │   ├── backends.view.tsx
        │   │   ├── backends.ui.tsx
        │   │   ├── backends.css.ts
        │   │   └── index.ts
        │   ├── models/                 (moved from src/models/ + src/views/models_view.*)
        │   │   ├── components/
        │   │   ├── models.view.tsx
        │   │   ├── models.ui.tsx
        │   │   └── index.ts
        │   ├── extensions/             (moved from src/views/extensions_gallery.* + extension_layout_view.*)
        │   │   ├── gallery/
        │   │   └── layout/
        │   └── artifacts/              (placeholder screens moved from App.tsx inlines)
        ├── layout/                     (kept — shell, top_bar, sidebar, right_inspector)
        ├── routes.ts                   (new, US1)
        ├── root_layout.tsx             (new, US1 — replaces the routing-heavy App.tsx)
        ├── App.tsx                     (deleted after US1, or reduced to ≤ 60-line shim)
        └── main.tsx                    (thinned — providers + <RouterProvider/>)
```

**Structure Decision**: Single-project web-frontend refactor. No new workspace crates, no backend changes. The layout above is the *target* shape; US1 creates `routes.ts`, `root_layout.tsx`, `services/` scaffold, and migrates four anchor screens (home, backends, models, workflows-catalog) to unblock US2/US3. Each subsequent screen migration in US3 is an independent PR with its own visual-diff baseline update.

## Complexity Tracking

*No violations to justify. Constitution Check PASS on every applicable principle.*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *(none)*  | —          | —                                    |

---

## Phase 0 — Research (output: research.md)

Key decisions that must be settled before design:

1. **HashRouter vs BrowserRouter** — research.md locks in `createHashRouter` with rationale (Rust server does not serve SPA fallback; this is a reversible choice, not a dead-end).
2. **Motion package name and bundle strategy** — `motion` (not `framer-motion`); `LazyMotion + m` pattern to keep initial-bundle growth ≤ 8 KB gzipped.
3. **Loader data-shape convention** — loaders return an object whose type is inferred via `Awaited<ReturnType<typeof loader>>`; no `any` casts.
4. **Error element strategy** — one root `errorElement` on the layout route + per-route `errorElement` for upstream-data failures; loaders throw `Response` for HTTP errors.
5. **SWR → loader migration rule** — static data migrates; live-polling (metrics, event stream) stays SWR.
6. **Playwright config for regression harness** — three viewports (375, 768, 1440), reduced-motion forced, Chromium-only for baseline (spec allowance — other browsers verified spot-wise on release candidates).
7. **`scan:constitution` implementation vehicle** — Node ESM script under `apps/web/scripts/` using `@typescript-eslint/parser` for AST queries rather than fragile regexes; regex fallbacks only for import-string detection.
8. **Install-modal dedup — canonical copy** — `apps/web/src/backends/install_modal.tsx` (newly redesigned Spectral Graphite version) wins; `apps/web/src/components/layout/install_modal.tsx` is deleted.

All items had defensible defaults in the spec; research.md consolidates them with references to the documentation snapshot captured in the prior session's deep-research report.

## Phase 1 — Design & Contracts

### Data model (`data-model.md`)

This is a refactor, not a feature — "entities" are the structural units of the refactor itself, not domain data. data-model.md enumerates:

- **RouteDescriptor**: `{ path, Component, loader?, action?, errorElement?, lazy?, children? }` — the unit of routing in `src/routes.ts`.
- **ScreenFolder**: `{ name, viewFile, uiFile, cssFile, componentsDir, indexFile }` — canonical organization unit under `views/`.
- **ServiceModule**: `{ name, backendDomain, exportedFunctions[] }` — a single file under `services/` owning one domain's HTTP/WS surface.
- **RouteSmokeEntry**: `{ path, title, mustContain[], viewports[] }` — one per route, consumed by the smoke harness.
- **VisualBaseline**: `{ route, viewport, pngPath, sha }` — the regression-harness ground truth committed under `tests/visual/baselines/`.
- **ScannerRule**: `{ id, clause, pattern, message }` — one rule per forbidden pattern in Appendix F.

### Contracts (`contracts/`)

Three contract documents govern the refactor. None are API contracts in the HTTP sense — they are mechanical contracts between tooling, CI, and source code.

1. **`contracts/scan-constitution.contract.md`**: Exact list of Appendix F patterns the scanner blocks, the AST/regex used to detect each, the expected CI exit code (2), the message format pointing at file:line and constitution clause, and the list of path exemptions (the scanner script itself, `src/api/generated/`, `tests/`, baseline PNG paths).
2. **`contracts/route-smoke.schema.json`**: JSON Schema for `tests/smoke/routes.json` — every object MUST have `path`, `title`, `mustContain` (≥ 3 strings), and `viewports` (subset of `[375, 768, 1440]`).
3. **`contracts/visual-baseline.contract.md`**: Baseline capture procedure (commit SHA on `main`, Playwright invocation flags, viewport + reduced-motion settings), diff threshold (0.5% per route per viewport), update procedure for intentional visual changes (dedicated commit, reviewer sign-off).

### Quickstart (`quickstart.md`)

Contributor walkthrough: "How to add a new screen after the refactor." Covers the eight steps from "create the folder" to "route entry" to "loader" to "smoke fixture" to "visual baseline" to "merge." Serves as the permanent contributor onboarding for frontend work.

### Agent context update

Run the PowerShell agent-context script to add the new technology entries (motion, @playwright/test) to the Claude-specific agent context file at `CLAUDE.md` under the project root, per the speckit convention.

---

## Phase 2 — Tasks (created by `/speckit.tasks`, NOT this command)

Task breakdown lands in `tasks.md` in the next phase. Expected shape:

- **US5 first** (regression harness): Playwright install, config, baseline capture on `main`, route-smoke fixture authoring, scan-constitution scanner, CI wiring.
- **US1 router migration**: scaffold `routes.ts` + `root_layout.tsx` + `services/` directory, migrate four anchor screens (home, backends, models, workflows-catalog), delete wrappers, thin `App.tsx`.
- **US2 Backends pilot**: full `.view`/`.ui` split on Backends, dedup InstallModal, services/backends.ts + services/host_models.ts + services/huggingface.ts, update visual baseline.
- **US3 systematic sweep**: one task per remaining screen (home, recipes, workflows-editor, modules-blueprint/draft/instance, deployments/detail, models, extensions-gallery/layout, runs/artifacts placeholders). Canvas-internals move into `views/workflows/components/canvas/`.
- **US4 Motion integration**: `<AnimatePresence>` in root_layout, reduced-motion wiring, install-modal shared-element `layoutId`, LazyMotion setup, bundle-size assertion in CI.

---

## Summary

- **Branch**: `main` (feature branches cut per slice under `021-web-architecture-refactor-*`)
- **IMPL_PLAN**: `specs/021-web-architecture-refactor/plan.md` (this file)
- **Artifacts generated in this command**: `plan.md` (this file), `research.md`, `data-model.md`, `contracts/scan-constitution.contract.md`, `contracts/route-smoke.schema.json`, `contracts/visual-baseline.contract.md`, `quickstart.md`, agent context update.
- **Gate status**: Constitution Check PASS; Complexity Tracking empty; Test Strategy cites the v1.1.2 Principle VI carve-out with hardening (visual-regression + route-smoke + scanner).
- **Next command**: `/speckit.tasks` to generate the per-slice task list.
