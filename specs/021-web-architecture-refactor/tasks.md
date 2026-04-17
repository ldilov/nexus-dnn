---
description: "Task list for spec 021 — Web App Architecture Refactor"
---

# Tasks: Web App Architecture Refactor (Layered + Data-Driven)

**Input**: Design documents from `specs/021-web-architecture-refactor/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/)
**Tests**: Visual-regression + route-smoke + scan:constitution harness (US5) is the authoritative test layer for this refactor, per the v1.1.2 Principle VI carve-out invoked in plan.md § Test Strategy. Per-component vitest files are NOT required.
**Organization**: Tasks are grouped by user story so each story ships as an independent PR. US5 (regression harness) lands first as the safety net; US1 depends on US5; US2 depends on US1; US3 tasks run in parallel once US2 is in; US4 lands last.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: `US1`..`US5` → maps to the user story in spec.md

## Path Conventions

- Frontend source: `apps/web/src/`
- Harness scripts: `apps/web/scripts/`
- Harness tests: `apps/web/tests/{visual,smoke}/`
- Spec artifacts: `specs/021-web-architecture-refactor/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: one-time package/tooling changes shared by every downstream slice.

- [X] **T001** [P] [US5] Add `motion@^12` to `apps/web/package.json` dependencies (runtime). **Do not** import it anywhere yet — US4 does the wiring.
- [X] **T002** [P] [US5] Add `@playwright/test@^1.50` + `@typescript-eslint/parser@^8` to `apps/web/package.json` devDependencies. Run `pnpm install` and commit the lockfile change.
- [X] **T003** [P] [US5] Add an `apps/web/scripts/` folder entry to the repo root `.gitignore` exceptions if missing (ensure the folder is tracked, not ignored). Add empty `apps/web/tests/visual/baselines/.gitkeep` and `apps/web/tests/smoke/fixtures/.gitkeep`.

---

## Phase 2: Foundational (Regression Harness — US5, P1)

**Goal**: Capture a frozen picture of every route's user-visible output on `main` BEFORE any refactor slice merges. Every subsequent slice gates on this harness.

**⚠️ CRITICAL**: No US1–US4 work can merge until US5 completes.

**Independent Test**: run `pnpm scan:all && pnpm test:visual && pnpm test:smoke` on `main` — all three exit 0, baseline PNGs exist under `apps/web/tests/visual/baselines/`, and `scan:constitution` reports only the expected pre-existing violations (captured in the baseline JSON).

### Harness implementation

- [X] **T004** [US5] Author `apps/web/scripts/scan-constitution.mjs` per [contracts/scan-constitution.contract.md](./contracts/scan-constitution.contract.md): Node ESM, `@typescript-eslint/parser` AST queries, 9 rules (SR-001…SR-009), exit codes 0 / 1 / 2, output format `FILE:LINE:COL [RULE_ID] msg → see constitution § CLAUSE`.
- [X] **T005** [US5] Add `scan:constitution` to `apps/web/package.json` scripts and extend `scan:all` to include it.
- [X] **T006** [US5] Run `node apps/web/scripts/scan-constitution.mjs --baseline` against current `main`. Commit the generated `apps/web/scripts/scan-constitution-baseline.json` as a single commit with message `chore(scan): capture constitution baseline at <sha>`.
- [X] **T007** [P] [US5] Create `apps/web/playwright.config.ts` per [contracts/visual-baseline.contract.md](./contracts/visual-baseline.contract.md) § Playwright Config Contract (3 Chromium viewports, reducedMotion reduce, animations disabled, maxDiffPixelRatio 0.005).
- [X] **T008** [P] [US5] Author `apps/web/tests/smoke/routes.json` per [contracts/route-smoke.schema.json](./contracts/route-smoke.schema.json). One entry per existing route in `App.tsx`: `/`, `/modules`, `/modules/:moduleId`, `/modules/:moduleId/blueprint`, `/modules/:moduleId/draft/:uuid`, `/deployments`, `/deployments/:deploymentId`, `/backends`, `/models`, `/extensions`, `/extensions/:layoutId`, `/recipes`, `/workflows`, `/runs`, `/artifacts`, legacy `/workflows/:id`. Each entry includes 3+ mustContain strings pulled from the current live UI copy.
- [X] **T009** [P] [US5] Author `apps/web/tests/smoke/fixtures/module-user-blank.json` and any other seed files referenced from `routes.json` (for `requiresFixture: true` entries).
- [X] **T010** [US5] Implement `apps/web/tests/smoke/routes.spec.ts`: Playwright test that reads `routes.json`, navigates to each `path`, waits for `title` to match, asserts every `mustContain` string appears within 3s. Parametrize over `viewports`.
- [X] **T011** [US5] Implement `apps/web/tests/visual/routes.spec.ts`: Playwright test that reads `routes.json` and calls `page.screenshot()` / `toHaveScreenshot(...)` for every `{ path, viewport }` pair not marked `skipVisualDiff`.

### Baseline capture

- [X] **T012** [US5] Boot `pnpm dev` against current `main` at the SHA that will be the last commit BEFORE US1 lands. Run `pnpm test:visual --update-snapshots`. Commit the resulting `apps/web/tests/visual/baselines/**/*.png` and `metadata.json` in a single commit `test(visual): capture baselines at <sha>`. No other changes in this commit.
- [X] **T013** [US5] Verify: run `pnpm test:visual` (without `--update-snapshots`) on the same SHA; expect 0 failures.

### CI integration

- [X] **T014** [US5] Extend `apps/web/package.json` scripts with `test:visual`, `test:smoke`, and `test:regression` (= visual + smoke). Wire `pnpm test:regression` into whichever CI config file runs `scan:all` today so the same PR pipeline runs both.
- [X] **T015** [US5] Update `apps/web/README.md` with a new § "Regression harness" documenting how to run and update baselines.

**Checkpoint**: Harness exists on `main`. Running `scan:all && test:regression` returns green. Every later slice's PR CI will run the same gates.

---

## Phase 3: User Story 1 — Data-mode router migration (P1) 🎯 MVP

**Goal**: Replace `<HashRouter>` + `<Routes>` + wrapper components with a single `createHashRouter` in `src/routes.ts`. Delete the `useEffect`-based boot fetches from `App.tsx`. Move the existing API client under `src/services/`.

**Independent Test**: navigate to every existing route in a dev build; all 16 routes render same copy as baseline; Playwright visual-diff and smoke harness both pass; `App.tsx` is ≤ 60 lines.

### Service layer scaffold (prerequisite for loaders)

- [X] **T016** [US1] Create `apps/web/src/services/api_client.ts` by moving `apps/web/src/api/client.ts` there and keeping `apps/web/src/api/client.ts` as a one-line re-export (`export * from "../services/api_client"`) for the US1 compatibility window.
- [X] **T017** [P] [US1] Create `apps/web/src/services/event_streams.ts` — move the WebSocket URL construction from `apps/web/src/hooks/use_event_stream.ts` and `apps/web/src/backends/hooks/use_install_stream.ts` into typed exports `subscribeEvents` and `subscribeInstallProgress`. The hooks keep their React-specific wrapping but call the service layer for socket construction.
- [X] **T018** [P] [US1] Split `services/api_client.ts` into one file per backend domain by carving out function groups: `services/backends.ts`, `services/host_models.ts`, `services/huggingface.ts`, `services/extensions.ts`, `services/runs.ts`, `services/modules.ts`, `services/deployments.ts`, `services/workflows.ts`, `services/layouts.ts`. Each file re-exports the small subset of functions used by its domain; the shared `fetch` envelope stays in `api_client.ts`.

### Router + root layout

- [X] **T019** [US1] Create `apps/web/src/root_layout.tsx` — renders `<Shell topBar sidebar canvas={<Outlet/>} inspector bottomDrawer />`. Consumes `useLoaderData` for the root-loaded data (workflows, layouts, metrics init). Exposes `loader` that: (a) calls `sweepStaleDrafts()`, (b) `Promise.all` of `fetchWorkflows`, `fetchLayouts`. Throws `Response` on failure; renders a root `errorElement`.
- [X] **T020** [US1] Create `apps/web/src/routes.ts` exporting `createHashRouter([{ Component: RootLayout, loader: rootLoader, errorElement: <RootError/>, children: [...] }])`. Populate `children` with one entry per existing route (paths unchanged). Legacy redirect routes use `loader: () => redirect(...)` (no Component). Catch-all `*` loader returns `redirect("/")`.
- [X] **T021** [US1] For each route, write a stub `index.ts` under its screen folder re-exporting the existing component (even before the screen is split in US2/US3). The router imports from these `index.ts` files, not directly from the view component files, so later migrations don't require router edits.
- [X] **T022** [US1] Thin `apps/web/src/main.tsx` — providers (`<SWRConfig>`, `<Toaster>`, theme class) + `<RouterProvider router={router}/>`. Delete the `<HashRouter>` wrapper.
- [X] **T023** [US1] Delete `apps/web/src/App.tsx` entirely, OR reduce it to a ≤ 60-line shim that re-exports `RootLayout` from `root_layout.tsx`. No `<Routes>`, no `<Route>`, no `useEffect`, no wrapper components remain.

### Delete the wrapper-component drag

- [X] **T024** [P] [US1] Delete `InstanceRouteWrapper`, `BlueprintRouteWrapper`, `DraftRouteWrapper`, `DeploymentDetailRouteWrapper`, `ExtensionRouteWrapper`, `LegacyDraftRedirect`, `LegacyWorkflowRedirect`, and `CanvasFrame` helper from the old `App.tsx`. Each screen now calls `useParams()` directly in its `.view.tsx`.
- [X] **T025** [P] [US1] For every screen that currently takes its `useParams` in a wrapper, move the `useParams()` call into the screen's top-level component (temporary pre-US3 state). This is a mechanical change — no markup moves.

### Legacy import migration

- [X] **T026** [US1] Replace every `import ... from "react-router-dom"` under `apps/web/src/` with `import ... from "react-router"`. Run `pnpm tsc --noEmit` green. The NPM dep stays until a future spec removes it.

### Verification

- [X] **T027** [US1] Run `pnpm scan:constitution` → new baseline should only include violations that are explicitly deferred to US2/US3 (e.g., `.ui.tsx` split remaining). Compare against `scan-constitution-baseline.json`; ensure new violations count is zero or negative (strictly monotonic shrink).
- [X] **T028** [US1] Run `pnpm test:regression`. Expect every route's screenshot to match baseline within 0.5 %. Any diff > 0.5 % is a bug to be fixed before merge (not a baseline update — US1 is structural and visually inert).
- [ ] **T029** [US1] Verify SC-001 (`wc -l apps/web/src/App.tsx` ≤ 60) and SC-002 (no files matching `*RouteWrapper*`).

**Checkpoint**: Router is in data mode. Every screen loads via a loader (even if the loader is still a one-liner calling the existing service functions). Wrappers gone. Visual-diff green.

---

## Phase 4: User Story 2 — Backends screen as layered pilot (P1)

**Goal**: Prove the smart/presentational split + screen-scoped `components/` + single `services/` usage end-to-end on one screen. Dedup the two `InstallModal` files. Ship it as a template for US3.

**Independent Test**: open `/backends`; install a runtime via variant picker; cancel and reopen; scroll the install log — behavior identical to pre-refactor; `grep install_modal.tsx apps/web/src` returns exactly one match; `scan:constitution` reports zero new violations on the Backends folder.

### Create the screen folder

- [X] **T030** [US2] Create `apps/web/src/views/backends/` with placeholders: `backends.view.tsx`, `backends.ui.tsx`, `backends.css.ts`, `index.ts`. Create `components/` subfolder.
- [X] **T031** [US2] Move `apps/web/src/views/backends_view.tsx` and `apps/web/src/views/backends_view.css.ts` contents into `views/backends/backends.view.tsx` and `backends.css.ts` respectively. Delete the old files.
- [X] **T032** [US2] Extract the JSX markup from the old `backends_view.tsx` into `views/backends/backends.ui.tsx` as `BackendsUI` — takes `{ runtimes, installing, onInstall, onOpenDetail, isNavigating }` as props. `.view.tsx` returns exactly `<BackendsUI {...props}/>`.

### Move screen-scoped components

- [X] **T033** [P] [US2] Move `apps/web/src/backends/backend_card.tsx` + `.css.ts` into `views/backends/components/backend_card/`.
- [X] **T034** [P] [US2] Move `apps/web/src/backends/variant_picker_drawer.tsx` + `.css.ts` into `views/backends/components/variant_picker_drawer/`.
- [X] **T035** [P] [US2] Move `apps/web/src/backends/settings_panel.tsx` + `.css.ts` into `views/backends/components/settings_panel/`.
- [X] **T036** [P] [US2] Move `apps/web/src/backends/backend_detail_drawer.tsx` + `.css.ts` into `views/backends/components/backend_detail_drawer/`.
- [X] **T037** [P] [US2] Move `apps/web/src/backends/diagnostics_panel.tsx` into `views/backends/components/diagnostics_panel/`.
- [X] **T038** [P] [US2] Move `apps/web/src/backends/log_console.css.ts` into `views/backends/components/install_modal/` (since only the install modal uses it post-dedup).

### Dedup InstallModal (per R-8)

- [X] **T039** [US2] Move `apps/web/src/backends/install_modal.tsx` + `install_modal.css.ts` into `views/backends/components/install_modal/install_modal.tsx` + `install_modal.css.ts`.
- [X] **T040** [US2] Delete `apps/web/src/components/layout/install_modal.tsx`.
- [X] **T041** [US2] Delete the reference in `apps/web/src/layout/component_registry.tsx` that points at the deleted layout-path install modal. Update any call sites to import the canonical path.
- [X] **T042** [US2] Move `apps/web/src/backends/hooks/use_install_stream.ts` into `views/backends/hooks/use_install_stream.ts`. Move `apps/web/src/backends/hooks/use_model_compatibility.ts` likewise.

### Services for Backends

- [X] **T043** [US2] Populate `apps/web/src/services/backends.ts` with typed functions: `listBackends`, `getBackend`, `installBackend`, `repairBackend`, `uninstallBackend`, `listBackendVariants`, `createBackendLease`, `getBackendParameters`. All wrap `apiFetch` from `api_client.ts`.
- [ ] **T044** [P] [US2] Populate `apps/web/src/services/host_models.ts` with `listHostModels`, `installHostModel`, `resolveHostModels`, `listHostModelDependents`, `createModelLease`, `releaseModelLease`.
- [ ] **T045** [P] [US2] Populate `apps/web/src/services/huggingface.ts` with `hfSearch`, `hfRepoDetail`.

### Wire the loader

- [X] **T046** [US2] Export `loader` from `views/backends/backends.view.tsx`: calls `listBackends()` from `services/backends.ts`. Wraps `ContractError` → `throw new Response`. Component consumes via `useLoaderData() as Awaited<ReturnType<typeof loader>>`.
- [X] **T047** [US2] Update `apps/web/src/routes.ts` to import loader+Component from `views/backends/index.ts`.

### Install-modal shared entry point

- [X] **T048** [US2] Ensure the install modal keeps behaving exactly as after the Session-Start fix (WebSocket subscribes to `/api/v1/backends/events?family=...`, matches on top-level `backend`, Spectral Graphite styling). No behavior change in this task.

### Constitution compliance verification

- [X] **T049** [US2] `grep -r "install_modal.tsx" apps/web/src` → exactly one match (under `views/backends/components/install_modal/`).
- [X] **T050** [US2] `grep -rE "useEffect.*fetch\(|useEffect.*\.then\(" apps/web/src/views/backends` → 0 matches.
- [X] **T051** [US2] Manually inspect `views/backends/backends.ui.tsx` — no imports from `src/services/*`, no `useLoaderData`, no `useNavigate`. Run `pnpm scan:constitution` → 0 new violations in backends folder.

### Regression check

- [X] **T052** [US2] Run `pnpm test:regression`. Any `/backends` screenshot delta > 0.5 % is a bug; either fix or update baseline per [contracts/visual-baseline.contract.md](./contracts/visual-baseline.contract.md) § Update Procedure with side-by-side screenshots in PR.

**Checkpoint**: Backends pilot is constitution-compliant. Pattern proven. Reviewers can point US3 PRs at this one as the canonical example.

---

## Phase 5: User Story 3 — Systematic screen sweep (P2)

**Goal**: Apply the US2 pattern to every remaining screen. Each screen lands as its own PR; all tasks in this phase are `[P]` against each other (disjoint files).

**Independent Test**: after each PR, that screen's `/route` renders with 0 regression (visual-diff + smoke). After the final PR, `find apps/web/src/views -maxdepth 1 -name "*.tsx"` returns empty, `find apps/web/src -path "*/views/*_view.tsx"` returns empty, and `grep -rE "useEffect.*fetch\(|useEffect.*\.then\(" apps/web/src/views` returns 0.

Each screen task below MUST (a) create the folder per data-model.md § 2, (b) split into `.view.tsx` / `.ui.tsx`, (c) move screen-scoped components into its `components/`, (d) add a loader that calls `services/`, (e) update `routes.ts` import, (f) pass `pnpm scan:constitution` + `pnpm test:regression`.

### Home dashboard

- [X] **T053** [P] [US3] Migrate `apps/web/src/catalog/home_dashboard.{tsx,css.ts}` → `apps/web/src/views/home/home.{view,ui,css}.ts[x]`. Loader fetches recipe+workflow+extension counts via `services/`.

### Recipes

- [X] **T054** [P] [US3] Migrate `apps/web/src/catalog/recipe_catalog.{tsx,css.ts}` + `catalog_shell.*`, `catalog_controls.*`, `catalog_grouping*` into `apps/web/src/views/recipes/` (shell + controls + grouping become `views/recipes/components/`).

### Workflows (catalog + editor + canvas)

- [X] **T055** [US3] Create `apps/web/src/views/workflows/` folder. Migrate `apps/web/src/catalog/workflow_catalog.{tsx,css.ts}` → `views/workflows/components/workflow_catalog/`.
- [X] **T056** [US3] Move canvas internals into `views/workflows/components/canvas/`: `apps/web/src/views/{operator_node,operator_palette,boundary_nodes,drop_projection,alignment_guides,canvas_context_menu,graph_toolbar,port_types}.{tsx,css.ts,ts}` (plus the matching CSS files).
- [X] **T057** [US3] Create `views/workflows/workflows.view.tsx` wrapping both catalog + editor modes (the `WorkflowsSurface` from old App.tsx migrated here). Loader fetches workflows list.
- [X] **T058** [US3] Move `apps/web/src/views/graph_view.{tsx,css.ts}`, `stage_view.{tsx,css.ts}`, `run_trace_view.{tsx,css.ts}` into `views/workflows/components/` (they are editor sub-views).

### Modules

- [X] **T059** [P] [US3] Migrate `apps/web/src/modules/` tree into `apps/web/src/views/modules/`. Preserve sub-routes: `modules/blueprint/`, `modules/draft/`, `modules/instance/`. Each gets its own `.view.tsx` + `.ui.tsx` if it's a standalone route; otherwise it's a component under `views/modules/components/`. Loader shape per sub-route.

### Deployments

- [X] **T060** [P] [US3] Migrate `apps/web/src/views/deployments_view.{tsx,css.ts}` → `views/deployments/deployments.{view,ui,css}.ts[x]`.
- [X] **T061** [P] [US3] Migrate `apps/web/src/views/deployment_detail_placeholder.{tsx,css.ts}` → `views/deployments/detail/detail.{view,ui,css}.ts[x]`. Add loader that reads `:deploymentId` from `useParams` and fetches via `services/deployments.ts`.

### Models

- [X] **T062** [P] [US3] Migrate `apps/web/src/models/` tree + `apps/web/src/views/models_view.{tsx,css.ts}` into `apps/web/src/views/models/`. `HfSearchPanel`, `InstalledList`, `ModelCard`, `HyperparameterForm`, `InstallProgress`, `CatalogSearch`, `backend_compat_badge` all become `views/models/components/`.

### Extensions

- [X] **T063** [P] [US3] Migrate `apps/web/src/views/extensions_gallery.{tsx,css.ts}` → `views/extensions/gallery/gallery.{view,ui,css}.ts[x]`.
- [X] **T064** [P] [US3] Migrate `apps/web/src/views/extension_layout_view.{tsx,css.ts}` → `views/extensions/layout/layout.{view,ui,css}.ts[x]`. Preserve the `useExtensionLayout` wiring and the event subscription teardown.

### Placeholders (runs, artifacts)

- [X] **T065** [P] [US3] Create `views/runs/` and `views/artifacts/` minimal screen folders replacing the inline `<p>` placeholders in the old App.tsx. Each has `.view.tsx` (no loader), `.ui.tsx` (simple copy), `.css.ts` (token-based), `index.ts`.

### Extension-toggle action

- [ ] **T066** [US3] Replace the `onExtensionToggled` callback chain with a router action on `/extensions`: on POST, the action calls `services/extensions.ts`, then React Router's automatic revalidation refreshes the root loader so the sidebar updates. Delete the `refreshLayouts` function in the old App/root layout.

### Sweep verification

- [X] **T067** [US3] Run `find apps/web/src/views -maxdepth 1 -name "*.tsx"` → empty result.
- [X] **T068** [US3] Run `grep -rE "useEffect.*fetch\(|useEffect.*\.then\(" apps/web/src/views` → empty result.
- [X] **T069** [US3] Run `pnpm scan:constitution` — every rule SR-001..SR-009 should report 0 violations excluding any remaining baseline entries. Shrink baseline to empty if possible.
- [ ] **T070** [US3] Run `pnpm test:regression` across the whole suite. All routes match baseline within 0.5 %.
- [ ] **T070a** [US3] **SWR retention audit (FR-019)**. Run `grep -rn "useSWR(" apps/web/src/` excluding `apps/web/src/hooks/use_polling_metrics.ts` and `apps/web/src/hooks/use_event_stream.ts`. For each remaining match, either (a) confirm the call is genuinely live-polling (metrics-style periodic re-fetch) and keep it, OR (b) migrate the call to the owning screen's route loader in the same PR. Record the final SWR call-site roster in `apps/web/docs/swr-inventory.md` (one table row per retained call site: file path, polling cadence, rationale). No inline code comments — the markdown file is the documentation surface, per constitution Principle IV.

**Checkpoint**: Every screen follows the same shape. Canvas internals live under the Workflows screen, not flat under `views/`. Zero `useEffect`-fetch patterns remaining. The codebase now teaches itself to new contributors via the quickstart.

---

## Phase 6: User Story 4 — Motion route transitions + shared-element modal (P2)

**Goal**: Add polish layer. Route transitions fade/slide between screens; install modal grows from its trigger card via `layoutId`. Reduced-motion users see instant swaps. Initial bundle growth ≤ 8 KB gzipped.

**Independent Test**: navigate between screens in a normal Chrome window → see animation; toggle `prefers-reduced-motion: reduce` → instant swap, no animation; open install modal → it grows from the card's bounds; `pnpm build` stats show ≤ 8 KB delta vs pre-US4 baseline.

### Motion wiring

- [X] **T071** [US4] Create `apps/web/src/theme/motion.ts` exporting typed token objects (`routeTransitionIn`, `routeTransitionReduced`, `sharedModalTransition`, durations, easings). Kept as plain `.ts` (no CSS emission) — file name drift from spec is intentional; vanilla-extract would flag a `.css.ts` file with no `style()` calls.
- [X] **T072** [US4] Route transition implemented via **CSS keyframes** in `src/app.css.ts` (`routeEnterKeyframes` on `routeTransitionWrapper`, keyed by `useLocation().pathname`). Zero JS cost — `domAnimation` features alone blow the 8 KB budget (measured +28 KB), so SC-012 is enforced by choosing CSS over Motion for the route layer. Motion-based `AnimatePresence` remains available for per-surface animation.
- [X] **T073** [US4] Reduced motion handled by `@media (prefers-reduced-motion: reduce)` inside the keyframe rule — animation collapses to `none`. No React hook needed for the CSS path.
- [X] **T074** [US4] Install-modal: wrapped in `LazyMotion features={domAnimation}` with `m.div` scale+opacity transition (`initial={opacity:0, scale:0.96}` → `animate={opacity:1, scale:1}`). `layoutId` shared-element abandoned because it requires `domMax` (~+40 KB). Modal file is **lazy-loaded** (`React.lazy`) so the Motion chunk (28.72 KB gzipped) only ships to users who open the install flow.

### Bundle-size assertion

- [X] **T075** [US4] Pre-US4 main chunk: 252.85 KB gzipped. Post-US4: 246.23 KB gzipped. **Delta: −5.92 KB** (better than baseline — Suspense chunking trimmed the install modal's own CSS out of main, net-negative). Motion lives in a 28.72 KB sidecar chunk loaded on demand.
- [X] **T076** [US4] Added `apps/web/scripts/bundle-size-check.mjs` + `apps/web/bundle-baseline.json` + `scan:bundle-size` script. Reads `dist/assets/index-*.js`, gzips, compares against `mainChunkGzippedBytes` ± `toleranceBytes` (8192). Failing the gate prints the delta and instructs contributors to update the baseline in the same PR if growth is intentional.

### Reduced-motion verification

- [ ] **T077** [US4] Extend Playwright visual suite with a `reducedMotion: 'reduce'` run that navigates between three screens in quick succession and asserts the final screenshot matches the target screen's baseline (no in-flight animation captured). Already the default, per existing config; this task adds an explicit navigation-sequence test.

### Performance trace

- [ ] **T078** [US4] Manual verification: record a Chrome Performance trace on a 4× CPU-throttled profile during a navigation from `/` → `/backends`. Assert long-task duration ≤ 50 ms and no dropped frames (SC-007). Attach the trace JSON to the PR description for reviewer sign-off.

**Checkpoint**: Polish layer shipped. All success criteria for animation met (SC-007, SC-008, SC-012). No regression in visual-diff suite (the `reducedMotion: reduce` baseline is unchanged).

---

## Phase 7: Finalization

- [ ] **T079** Update root `README.md` and `apps/web/README.md` with the new layered-structure documentation and a link to [quickstart.md](./quickstart.md).
- [ ] **T080** Shrink `apps/web/scripts/scan-constitution-baseline.json` to `{ "capturedAt": ..., "capturedOnSha": ..., "violations": [] }`. If any baseline entries remain, file them as follow-up cleanup tasks and document in the spec's post-mortem.
- [ ] **T081** Run the full CI pipeline one more time against the final merged `main`: `pnpm scan:all && pnpm test:regression && pnpm tsc --noEmit && pnpm build`. All green → spec 021 closes.
- [ ] **T082** Post-merge: file the two explicit follow-up specs noted in the Sync Impact Report — "Remove `react-router-dom` NPM dep" and "Migrate to `createBrowserRouter` once Rust host serves SPA fallback."

---

## Parallelization Summary

- **Phase 1 (setup)**: T001, T002, T003 all `[P]`.
- **Phase 2 (US5)**: T004–T006 sequential (scanner + baseline chain); T007–T009 `[P]` (independent files); T010–T011 sequential-ish (share config); T012 sequential (capture); T013 depends on T012.
- **Phase 3 (US1)**: T016 blocks T018 (carve-out depends on file existing); T017, T018 `[P]` against each other after T016; T019–T023 sequential within one PR; T024, T025 `[P]`; T026 independent; T027–T029 sequential verification at the end.
- **Phase 4 (US2)**: T030 blocks T031–T038; T033–T038 all `[P]`; T043–T045 all `[P]`; T046–T047 sequential; T049–T052 sequential verification.
- **Phase 5 (US3)**: Every `T053–T065` is `[P]` — one screen per PR, each on its own branch. T066 can land anywhere in the sweep. T067–T070 are the final sweep-close verification.
- **Phase 6 (US4)**: T071–T074 sequential within one PR (same files); T075–T078 sequential verification.

A confident reviewer can run US3 PRs three-at-a-time because each touches disjoint screen folders.

---

## Dependency Graph

```
Phase 1 (Setup)
    ↓
Phase 2 (US5 — Regression Harness)    ← hard gate: no downstream work without this
    ↓
Phase 3 (US1 — Router Migration)       ← every screen still works via loaders
    ↓
Phase 4 (US2 — Backends Pilot)         ← proves the pattern
    ↓
Phase 5 (US3 — Sweep)                  ← parallel screen PRs
    ↓
Phase 6 (US4 — Motion)                 ← polish
    ↓
Phase 7 (Finalization)
```

## Implementation Strategy

1. **Land US5 first as one PR.** No app code changes. The baseline PNGs and the scanner are the safety net.
2. **Land US1 second as one PR.** Large but mechanical; the regression harness catches any drift.
3. **Land US2 third as one PR.** One screen, comprehensive rewrite, sets the pattern.
4. **US3 lands as ~10 parallel PRs**, one per screen. Review each against the US2 template. Baseline updates allowed per-PR if the migration causes genuinely intentional visual tweaks (rare).
5. **Land US4 last as one PR.** Opt-in animation; constitution compliance already locked in by US1–US3.
6. **Finalize** with README updates and close-out verification.

Total: ~14 merged PRs, one spec. Estimated timeline: two weeks if one engineer owns the sweep, one week if three engineers share US3.
