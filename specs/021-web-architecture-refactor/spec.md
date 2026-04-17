# Feature Specification: Web App Architecture Refactor (Layered + Data-Driven)

**Feature Branch**: `021-web-architecture-refactor`
**Created**: 2026-04-17
**Status**: Draft
**Input**: User description: "Make very detailed specification that covers everything from ur research and findings for web app reorganizing and refactoring. Also we have to verify that we dont cause regression"

## Background

The `apps/web/` frontend has drifted from a clean architecture into a mixed state
where routing, data fetching, state, layout, and legacy redirects all coexist inside
a single 335-line `App.tsx`, screens invent their own folder shapes, the same
component (the backend install modal) exists in two different folders, and a batch
of canvas-internal components live alongside real top-level screens inside
`apps/web/src/views/`. The Rust host is healthy; the frontend is where complexity
leaks. Constitution **v1.2.0 Principle XII** codifies the destination state
(layered folders, smart/presentational split, React Router v7 data mode, single
`services/` I/O boundary, `motion` for animation, `vanilla-extract` for styles).
This spec is the execution plan that moves the codebase from *today* to *the
constitution*, in reviewable slices, without visible regression to the user.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Data-mode router migration (Priority: P1)

A contributor adds a new screen to the app. Instead of editing a 335-line `App.tsx`,
declaring a `<Route>` element, writing a wrapper component just to call
`useParams()`, and adding a `useEffect → fetch → setState` block elsewhere, they add
a single route object to `src/routes.ts` with a `loader`, a `Component`, and (if
relevant) an `errorElement`. Every existing screen has already been migrated to the
same shape, so the pattern is obvious from the neighbors.

**Why this priority**: The router is the organizing spine of the app. Until it
moves to data mode, the layered structure (US2, US3) cannot fully work, because
screens can't own their loaders and wrappers proliferate. This change alone
deletes ~250 lines from `App.tsx`, removes 7 route wrapper components, eliminates
the `useEffect` fetch dance at boot, and unlocks per-route error boundaries and
pending UI. It is the highest-leverage single PR.

**Independent Test**: Cold-load the app, navigate through every existing route
(`/`, `/modules`, `/modules/:id`, `/modules/:id/blueprint`, `/modules/:id/draft/:uuid`,
`/deployments`, `/deployments/:id`, `/backends`, `/models`, `/extensions`,
`/extensions/:layoutId`, `/recipes`, `/workflows`, `/runs`, `/artifacts`) and verify
every screen renders the same data, in the same order, with the same empty/error
states as before. Legacy URLs (`/workflows/:id`, `/modules/user:draft::uuid`)
continue to redirect correctly.

**Acceptance Scenarios**:

1. **Given** the app boots cold on `/`, **When** the root loader runs, **Then**
   the home dashboard renders the same recipe/workflow/extension sections that
   today's `App.tsx` populates via `useEffect`, with no flash of empty state.
2. **Given** a user visits `/modules/:moduleId/blueprint?recipe_id=foo`, **When**
   the blueprint route's loader resolves, **Then** the Blueprint view receives
   the decoded `moduleId` and the `recipe_id` query param via its loader data
   without a wrapper component in between.
3. **Given** a user visits `/workflows/:id` (legacy), **When** the router
   resolves, **Then** the response is `307` / client-side redirect to
   `/modules/user:<id>/blueprint` — same behavior as today's
   `LegacyWorkflowRedirect` component.
4. **Given** a loader throws a `Response` with status 502, **When** the route
   renders, **Then** the route's `errorElement` renders the upstream-failure
   banner instead of crashing the shell.
5. **Given** a navigation is in-flight, **When** `useNavigation()` reports
   `state !== "idle"`, **Then** the target view shows a pending shimmer instead
   of a blank canvas.
6. **Given** `apps/web/src/App.tsx` after the migration, **When** it is read,
   **Then** it contains providers plus `<RouterProvider router={router}/>` and no
   `useEffect`, no `<Routes>`, no wrapper components, no legacy redirect
   components.

---

### User Story 2 — Pilot screen migrated to the layered/smart-dumb paradigm (Priority: P1)

A contributor picks the Backends screen (the one we just touched for the install
modal fix) and reshapes it into the constitution-compliant form: a `views/backends/`
folder with `backends.view.tsx` (smart — loader, state, handlers), `backends.ui.tsx`
(markup only), `components/` (screen-scoped presentational components including
the install modal), and a single `index.ts` exporting `{ loader, Component }`. The
shared `services/` layer gets a typed wrapper around `/api/v1/backends`,
`/api/v1/host-models`, and the `/api/v1/backends/events` WebSocket. The duplicate
`InstallModal` files are deduped into one under `views/backends/components/install_modal/`.

**Why this priority**: One end-to-end example anchors the pattern. Without a
concrete before/after, subsequent screen migrations will drift. Backends is also
the file set most actively being modified (recent install-modal + HF search work),
so clean structure here pays dividends immediately.

**Independent Test**: Open the Backends screen, install a runtime through the
variant picker, cancel it, reopen the drawer, scroll the install log — all
behaviors identical to pre-refactor. The install modal component only exists at
one path. The `.ui.tsx` file compiles and renders in Storybook-like isolation
(via a tiny harness) with props supplied synchronously, proving no I/O leaked into
it.

**Acceptance Scenarios**:

1. **Given** `apps/web/src/views/backends/backends.ui.tsx`, **When** it is read,
   **Then** it contains no `fetch`, no `useSWR`, no `useLoaderData`, no
   `useNavigate`, no imports from `src/services/*`, and no router hooks other
   than `useNavigation` passed in as a prop.
2. **Given** `apps/web/src/views/backends/backends.view.tsx`, **When** it is
   read, **Then** it returns exactly one element (`<BackendsUI {...props} />`)
   and contains no JSX markup tags other than that single root.
3. **Given** a repo-wide file scan, **When** searching for files named
   `install_modal.tsx`, **Then** exactly one match exists, under
   `apps/web/src/views/backends/components/install_modal/`.
4. **Given** every `fetch(` call site in `apps/web/src/`, **When** the call-site
   file path is inspected, **Then** every match lives under `src/services/`.
5. **Given** a visual diff of the Backends screen at `1440×900` before and after
   the refactor, **When** compared with Playwright screenshot, **Then** pixel
   diff is < 0.5% (accounting for font subpixel rendering).

---

### User Story 3 — Systematic sweep across remaining screens (Priority: P2)

Every other top-level screen (`home`, `recipes`, `workflows`, `modules`, `modules/blueprint`,
`modules/draft`, `modules/instance`, `deployments`, `deployments/detail`, `models`,
`extensions/gallery`, `extensions/layout`, `runs` placeholder, `artifacts`
placeholder) is migrated to the same shape pioneered by US2. Canvas internals that
currently live in `apps/web/src/views/` (`operator_node`, `operator_palette`,
`boundary_nodes`, `drop_projection`, `alignment_guides`, `canvas_context_menu`,
`graph_toolbar`, `port_types`) are moved into `views/workflows/components/canvas/`
because they are screen-scoped parts of the Workflows editor, not standalone
screens.

**Why this priority**: Consistency. As long as any screen follows the old pattern,
contributors copy it and the drift resumes. P2 rather than P1 because US1 + US2
already deliver the architectural benefit; the sweep is about finishing the job
and should land screen-by-screen as small PRs.

**Independent Test**: After each screen migration, that screen's route loads, its
primary action completes, and no other screen's behavior changes. A codebase-wide
scan finds zero remaining `useEffect`-based data loads, zero wrapper components
existing only for `useParams()`, and zero files named `*_view.tsx` sitting flat
inside `apps/web/src/views/`.

**Acceptance Scenarios**:

1. **Given** `apps/web/src/views/`, **When** listed, **Then** every immediate
   child is either a folder named after a screen (`backends/`, `workflows/`,
   `deployments/`, ...) or excluded from the directory (no flat `*_view.tsx`
   files).
2. **Given** a `grep` for `useEffect.*fetch\|useEffect.*\.then\(` across
   `apps/web/src/views/`, **When** executed, **Then** the result set is empty.
3. **Given** the Workflows editor, **When** the user drags an operator from the
   palette onto the stage, **Then** the node renders identically to today
   (operator palette and node components simply moved into
   `views/workflows/components/canvas/` — no behavioral change).
4. **Given** the Deployments detail placeholder, **When** the user navigates to
   `/deployments/:id`, **Then** the back button still returns to
   `/deployments` (now via `useNavigate()` inside `deployments_detail.view.tsx`,
   not a wrapper component).

---

### User Story 4 — Route transitions and shared-element animation via Motion (Priority: P2)

When a user navigates between top-level screens, the outgoing view fades/slides
out and the incoming view animates in with tokens drawn from `theme/motion.css.ts`.
When the Backends install-modal is opened, it animates from the triggering card's
bounding box into its centered modal position using Motion's `layoutId` shared-
element support, not a CSS keyframe. All animations honor
`prefers-reduced-motion`.

**Why this priority**: Polish layer. Independent of US1–US3 structurally, but the
cleanest time to wire it is right after the router migration, because route
transitions need a stable `<Outlet/>` as the seam.

**Independent Test**: Toggle `prefers-reduced-motion` in DevTools; route
transitions collapse to instant swap, no animation plays. Back-and-forth
navigation between three screens in quick succession doesn't stack animations
(Motion's `mode="popLayout"` keeps queue bounded). Install-modal open/close runs
at 60fps on a mid-range laptop (measured via Chrome Performance trace).

**Acceptance Scenarios**:

1. **Given** `src/App.tsx` (or the root layout) after US4 lands, **When** read,
   **Then** an `<AnimatePresence mode="popLayout">` wraps the router `<Outlet/>`
   keyed on `useLocation().pathname`, and the import path is `motion/react`,
   never `framer-motion`.
2. **Given** any component using `motion.*` or `m.*`, **When** read, **Then**
   it consumes `useReducedMotion()` and short-circuits to a static render when
   the hook returns `true`.
3. **Given** Chrome Performance recording of a route change on a 4× CPU-throttled
   profile, **When** measured, **Then** the long-task duration is ≤ 50ms and no
   dropped frames are reported for the route transition.
4. **Given** the install modal open animation, **When** observed, **Then** the
   modal grows from the trigger card's position (shared `layoutId`) rather
   than fading in from nothing.

---

### User Story 5 — Regression-safety harness (Priority: P1)

Before, during, and after the refactor, a mechanical harness proves nothing
user-visible changed. The harness has three layers: (a) Playwright visual-
regression screenshots per route at 375 / 768 / 1440 widths with reduced motion
forced on; (b) a route-smoke JSON fixture enumerating every route and the user-
visible strings that MUST appear on first paint; (c) an automated guard that
blocks CI if a forbidden pattern from Appendix F of the constitution reappears.

**Why this priority**: The user explicitly requested "we have to verify that we
dont cause regression." Without this harness, the refactor is faith-based and a
subtle behavior drift (silent error swallow, missing redirect, lost empty state)
will escape review. This is P1 because it must land BEFORE US1 ships — it is the
safety net the migration needs.

**Independent Test**: Run the harness on `main` before starting the refactor to
establish baseline. Run it after each slice (US1, US2, each US3 screen, US4).
Any route whose screenshot delta exceeds 0.5% or whose expected strings go
missing fails the build. Any reintroduction of `<Routes>`/`<Route>` in new code,
`useEffect(...) fetch(...)`, duplicate component filenames, or `framer-motion`
imports fails the build.

**Acceptance Scenarios**:

1. **Given** the baseline Playwright suite on `main` before the refactor,
   **When** re-run after each slice of US1–US4, **Then** every route's
   screenshot matches the baseline within 0.5% per viewport.
2. **Given** the route-smoke fixture, **When** the test harness visits a route
   and scans the DOM, **Then** every expected user-visible string from the
   fixture is present (copy, CTA labels, empty-state text).
3. **Given** a contributor's PR that accidentally imports from `framer-motion`,
   **When** CI runs, **Then** the `scan:constitution` job fails with a message
   pointing at the offending file and Appendix F.
4. **Given** a contributor's PR that accidentally adds `useEffect(() => {
   fetch(...) })` inside a `views/*/` file, **When** CI runs, **Then** the
   `scan:constitution` job fails with a message pointing at Principle XII.4.
5. **Given** two files named `install_modal.tsx` in different folders, **When**
   CI runs, **Then** the `scan:duplicate-components` job fails.

---

### Edge Cases

- **In-flight WebSocket during route change**: when the user is on the Backends
  install modal with the `/api/v1/backends/events` WebSocket open and navigates
  away, the socket MUST close within 500ms (today it closes on component unmount;
  the refactor must preserve that teardown order).
- **Loader race after rapid navigation**: if the user clicks two sidebar items in
  quick succession, only the later loader's data MUST render; the earlier loader
  MUST be cancelled via the router's built-in `AbortSignal` piping.
- **SessionStorage drift on boot**: the existing `sweepStaleDrafts()` call at
  boot MUST continue to run; moving it into the root loader is the
  expected placement.
- **Extension layouts refresh after toggle**: today `refreshLayouts()` fires
  from `<ExtensionsGallery onExtensionToggled={...}/>`; after the refactor this
  MUST go through a router action with automatic revalidation of the root
  loader, so the sidebar reflects the change without manual re-fetch.
- **Reduced-motion users**: all animations MUST collapse to a static swap —
  forbidden outcomes are partial animation, jank, or layout shift.
- **Hash vs History router**: the existing app uses `HashRouter`; the data-mode
  migration uses `createHashRouter` (not `createBrowserRouter`) to preserve deep
  link compatibility, because the Rust server does not currently serve SPA
  fallback HTML for arbitrary paths. Moving to BrowserRouter is explicitly OUT
  OF SCOPE for this spec.
- **Deep links into drafts**: `/modules/user:blank/draft/:uuid` MUST continue
  to hydrate from `sessionStorage` via the draft envelope, not from the server.
- **Error during loader → full-shell crash**: loaders that throw non-Response
  errors MUST be caught by an `errorElement` on the root route so the shell
  (sidebar, top-bar) stays usable.
- **Legacy `react-router-dom` import**: removing the package from `package.json`
  is OUT OF SCOPE for this spec (it's a v7 compatibility alias and other deps
  may still reference it); ALL source imports MUST be updated to `react-router`.

## Requirements *(mandatory)*

### Functional Requirements

#### Routing (Principle XII.3)

- **FR-001**: The app MUST declare all routes in a single `src/routes.ts`
  exporting a router created via `createHashRouter([...])` (HashRouter is
  retained to preserve current deep-link behavior; see Assumptions).
- **FR-002**: `src/main.tsx` MUST mount the providers (`<SWRConfig>`,
  `<Toaster>`, theme class on root) and render exactly one child:
  `<RouterProvider router={router}/>`.
- **FR-003**: `src/App.tsx` MUST either be deleted or reduced to the root
  layout component that renders `<TopBar/>`, `<Sidebar/>`, `<Outlet/>`, and the
  bottom drawer — with no routing definitions, no `useEffect` fetches, and no
  wrapper components.
- **FR-004**: Every route that reads URL params MUST consume them via
  `useParams()` inside its `.view.tsx`; route wrapper components whose only
  purpose is to extract params MUST be deleted.
- **FR-005**: Every route with server data MUST declare a `loader` function
  that returns that data. Loaders MUST throw `Response` objects for upstream
  failures so `errorElement` can render them.
- **FR-006**: Legacy redirect routes (`/workflows/:id`,
  `/modules/user:draft::uuid`) MUST be implemented as
  `loader: () => redirect(...)` entries, not as components.
- **FR-007**: Heavy screens (`workflows/blueprint`, `modules/instance`,
  `extensions/layout`) MUST be split via `lazy: () => import(...)`.
- **FR-008**: The catch-all route (`*`) MUST redirect to `/` via a `loader`
  returning `redirect("/")`.
- **FR-009**: Every in-source import of `react-router-dom` MUST be changed to
  `react-router`; the NPM dep is kept for transitional compatibility but MUST
  not be imported from source.

#### Layered structure (Principle XII.1, XII.2)

- **FR-010**: `apps/web/src/views/` MUST contain only folders, each folder
  corresponding to a top-level screen. Flat `*_view.tsx` files at that depth
  MUST be removed (moved into their screen folder).
- **FR-011**: Each screen folder MUST contain, at minimum, `<screen>.view.tsx`,
  `<screen>.ui.tsx`, `<screen>.css.ts`, and `index.ts` re-exporting `{ loader,
  Component }` (and `{ action }` when mutations exist).
- **FR-012**: The `.ui.tsx` file MUST receive all data and handlers via props
  and MUST NOT import from `src/services/`, `src/hooks/use_api*`, or any router
  hook (with the sole exception of `useNavigation` pending-state, which MUST be
  received as a prop from the parent `.view.tsx`).
- **FR-013**: The `.view.tsx` file MUST contain only hooks, state, handlers,
  loader/action consumers, and a single JSX root element — the `<X.ui ... />`
  render. It MUST NOT contain any other JSX tag, `<div>`, or inline style.
- **FR-014**: Screen-scoped presentational components MUST live in
  `views/<screen>/components/`. A component is promoted to `src/components/`
  only after a second screen imports it.
- **FR-015**: The duplicate `InstallModal` files at
  `apps/web/src/backends/install_modal.tsx` and
  `apps/web/src/components/layout/install_modal.tsx` MUST be deduplicated into
  a single file under `apps/web/src/views/backends/components/install_modal/`.

#### I/O boundary (Principle XII.4)

- **FR-016**: All `fetch(...)`, `new WebSocket(...)`, and `new EventSource(...)`
  construction MUST live exclusively under `apps/web/src/services/`.
- **FR-017**: Screens MUST NOT call `fetch` directly; they MUST import typed
  functions from `services/`. Existing `src/api/client.ts` MUST be relocated
  to `src/services/api_client.ts` and re-exported for back-compat during the
  migration window (one release).
- **FR-018**: The `useEffect` block in current `App.tsx` that loads workflows,
  layouts, and sweeps drafts at boot MUST migrate to the root route's `loader`
  function, with `sweepStaleDrafts()` called synchronously before the loader
  resolves.
- **FR-019**: SWR is permitted only for live-polling surfaces — metrics
  (`usePollingMetrics`) and event stream (`useEventStream`). All other SWR
  calls MUST be migrated to route loaders.
- **FR-020**: Extension-toggle revalidation MUST use a router action on the
  gallery route; the current `refreshLayouts` callback chain MUST be deleted.

#### Styling (Principle XII.5)

- **FR-021**: Every component that ships styles MUST have a sibling `*.css.ts`
  using `@vanilla-extract/css`; inline `style={{...}}` MUST only contain truly
  dynamic values (computed widths, transforms, progress percentages).
- **FR-022**: No new import of Tailwind, styled-components, Emotion, or any
  other CSS-in-JS runtime is permitted in this spec.
- **FR-023**: All color, spacing, radius, and motion literals MUST come from
  `src/theme/` tokens or `src/styles/tokens.css`. Raw hex/rgb values in
  component styles MUST be replaced with token references.

#### Animation (Principle XII.6)

- **FR-024**: The workspace MUST add `motion` (not `framer-motion`) to
  `apps/web/package.json` dependencies.
- **FR-025**: Route transitions MUST be implemented via
  `<AnimatePresence mode="popLayout">` wrapping the router `<Outlet/>`, keyed
  on `useLocation().pathname`, with motion tokens sourced from
  `theme/motion.css.ts`.
- **FR-026**: Every `motion.*` or `m.*` component MUST read
  `useReducedMotion()` and fall back to a zero-duration transition when the
  hook returns `true`.
- **FR-027**: The backend install modal's open/close animation MUST use
  Motion's `layoutId` shared-element mechanism to animate between the trigger
  card's bounds and the modal's centered position.
- **FR-028**: Below-the-fold motion components MUST use `LazyMotion` + `m`
  instead of the full `motion.*` surface so the initial bundle adds ≤ 6 KB
  gzipped.

#### Regression prevention (User Story 5)

- **FR-029**: Playwright MUST be added as a dev dependency and a visual-
  regression suite MUST run every route at viewport widths 375, 768, and 1440
  with `prefers-reduced-motion: reduce` forced, saving baseline screenshots
  under `apps/web/tests/visual/baselines/`.
- **FR-030**: A route-smoke fixture (`apps/web/tests/smoke/routes.json`) MUST
  enumerate every route path, the expected page title, and 3–5 user-visible
  strings that MUST be present on first paint. The smoke harness MUST fail
  the build when any expected string is missing.
- **FR-031**: A `pnpm scan:constitution` script MUST be added that fails when
  any of the following appear in `apps/web/src/`:
    - Imports from `framer-motion`
    - Imports from `react-router-dom` in `.ts`/`.tsx` sources
    - `<BrowserRouter>`, `<HashRouter>`, `<Routes>`, or `<Route ` JSX
    - `useEffect(...)` blocks that contain `fetch(` or `.then(` within 10 lines
    - `fetch(` outside `src/services/`
    - Two files with the same base filename (e.g., `install_modal.tsx`) in
      different folders
    - Files inside `views/*/` matching `*.view.tsx` that contain JSX tags
      other than a single `<*UI` root element
- **FR-032**: The `scan:constitution` script MUST run in the pre-merge CI
  pipeline alongside the existing `scan:theme`, `scan:terminology`, and
  `scan:cdn` jobs.
- **FR-033**: The refactor MUST land in slices that each keep the app
  green-building and visually unchanged. Each slice MUST include a passing
  visual-regression run before merge.
- **FR-034**: The baseline Playwright screenshot set MUST be captured on
  `main` BEFORE the first refactor slice merges, tagged with the commit SHA,
  and committed under `apps/web/tests/visual/baselines/`.

#### Rollout discipline

- **FR-035**: Each slice (US1, US2, each US3 screen, US4) MUST ship as a
  separate PR with its own green CI run; big-bang merges are PROHIBITED.
- **FR-036**: No slice may break bisectability — every commit on the feature
  branch MUST pass `pnpm tsc --noEmit` and `pnpm build`.
- **FR-037**: Any slice that changes the rendered DOM of a screen beyond the
  allowed visual-diff budget MUST either (a) revert the visible change, or
  (b) update the Playwright baselines in a dedicated commit with a one-line
  rationale and reviewer sign-off.

### Key Entities *(include if feature involves data)*

- **Route definition**: `{ path, Component, loader?, action?, errorElement?, children?, lazy? }` — the unit of routing; lives in `src/routes.ts`.
- **Screen folder**: A directory under `views/` containing `.view.tsx`, `.ui.tsx`, `.css.ts`, `components/`, and `index.ts`. Canonical unit of organization.
- **Service module**: A file under `src/services/` owning the HTTP/WebSocket/EventSource calls for one backend domain; exports typed functions consumed by loaders/actions.
- **Route-smoke fixture entry**: `{ path, title, mustContain: string[], viewports: [375, 768, 1440] }` — one per route, used by the regression harness.
- **Visual baseline**: PNG captured by Playwright at a pinned viewport with reduced motion forced, committed under `apps/web/tests/visual/baselines/`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After US1 lands, `apps/web/src/App.tsx` is ≤ 60 lines (down from 575 today, measured with `wc -l`).
- **SC-002**: After US1 lands, the number of files matching `*RouteWrapper*` or components that exist only to call `useParams()` is zero.
- **SC-003**: After US1 lands, every existing route (16 total today) renders the same user-visible content — verified by a Playwright visual-regression suite with per-route delta ≤ 0.5% at viewports 375 / 768 / 1440, reduced motion forced.
- **SC-004**: After US2 lands, the Backends screen passes the constitution check: zero `fetch` calls outside `services/`, zero JSX tags in `.view.tsx` beyond one `<X.ui.../>` root, and exactly one file named `install_modal.tsx` in the repo.
- **SC-005**: After US3 completes, `find apps/web/src/views/ -maxdepth 1 -name '*.tsx'` returns zero results; every top-level entry under `views/` is a screen folder.
- **SC-006**: After US3 completes, a repo-wide grep for `useEffect.*fetch\|useEffect.*\.then\(` inside `apps/web/src/views/` returns zero results.
- **SC-007**: After US4 lands, route transitions on a 4× CPU-throttled profile complete in ≤ 250ms with zero dropped frames measured in a Chrome Performance trace.
- **SC-008**: After US4 lands, reduced-motion users see instant route swaps with no animation played (verified via Playwright with `prefers-reduced-motion` emulated).
- **SC-009**: The `pnpm scan:constitution` CI job runs on every PR touching `apps/web/` and fails within 30 seconds when any forbidden pattern from Appendix F is introduced.
- **SC-010**: Across the full refactor, zero user-visible regressions are reported — measured by visual-diff harness passing on every slice merge AND zero production-level bug reports filed against refactored screens in the week after each slice lands.
- **SC-011**: Time-to-add-a-new-screen drops measurably: a contributor adding a brand-new top-level screen (loader, view, ui, one sub-component) completes the scaffold in ≤ 15 minutes of editing (measured by time between first file creation and the screen rendering in dev server).
- **SC-012**: Initial JS bundle for `apps/web/` grows by ≤ 8 KB gzipped after Motion is introduced (measured via `vite build` stats), achieved by using `LazyMotion` + `m` instead of `motion.*`.

## Assumptions

- **HashRouter retained**: The existing app uses `HashRouter`, and the Rust server does not serve SPA fallback HTML for arbitrary paths. The migration uses `createHashRouter` (the data-mode equivalent) to preserve deep-link and refresh behavior without server changes. Upgrading to `createBrowserRouter` is a separate follow-up spec that requires the Rust server to emit `index.html` for unknown paths.
- **React Router v7 already installed**: `apps/web/package.json` pins `react-router-dom@^7.14.1`, which is the compatibility package for v7. Data-mode API (`createHashRouter`, `RouterProvider`, `useLoaderData`, `useNavigation`, `redirect`) ships from the unified `react-router` package and is available without a dependency change; the source imports simply move from `react-router-dom` to `react-router`.
- **No SSR**: `apps/web/` is a client-only Vite SPA. Framework mode is explicitly out of scope — we pick data mode because it gives loaders/actions/errorElement without the SSR/file-based-routing overhead.
- **Motion package is new**: `motion` is not currently in `package.json`. FR-024 adds it as a new dependency. Estimated net bundle impact with `LazyMotion + m`: +5–6 KB gzipped.
- **Backend contract tests cover invariants**: Per constitution Principle VI (design-heavy UI carve-out, v1.1.2), the Rust-side contract tests for `/api/v1/*` remain the authoritative safety net for data invariants. This refactor does not touch the Rust host.
- **Existing `scan:theme` / `scan:terminology` / `scan:cdn` CI scripts keep running**: FR-031 adds `scan:constitution` alongside them; it does not replace them.
- **One engineer, multiple PRs**: Each user story (US1, US2, each screen in US3, US4, US5's baseline) lands as a separate PR; reviewer sign-off per PR is expected. No single merge exceeds ~800 lines net diff.
- **Storybook not required**: The constitution and research reference Storybook, but this spec does not mandate adding it. The `.ui.tsx` / `.view.tsx` split keeps the door open for Storybook adoption later (a P3 follow-up spec).
- **`api/generated/` preserved**: TypeScript DTOs under `src/api/generated/` are machine-generated from Rust; they are NOT moved into `services/`. Services import from `api/generated/` as the type source.
- **The install-modal dedup preserves whichever implementation is newer**: The `apps/web/src/backends/install_modal.tsx` version (just redesigned in the previous session with Spectral Graphite, elapsed clock, proper log panel) is the canonical implementation; the `apps/web/src/components/layout/install_modal.tsx` copy is deleted.
