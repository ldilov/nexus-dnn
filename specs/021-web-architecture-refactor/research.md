# Research: Web App Architecture Refactor

**Phase**: 0 (Outline & Research)
**Status**: Complete — no unresolved `NEEDS CLARIFICATION` markers
**Sources**: [reactrouter.com/start/data/routing](https://reactrouter.com/start/data/routing), [playfulprogramming.com/posts/layered-react-structure](https://playfulprogramming.com/posts/layered-react-structure/), [motion.dev/docs/react](https://motion.dev/docs/react), prior-session deep research report, constitution v1.2.0, current-state audit of `apps/web/src/`.

---

## R-1. Router mode: `createHashRouter` (data mode) vs alternatives

**Decision**: `createHashRouter` from `react-router` (the unified v7 package), wrapped by `<RouterProvider>` in `main.tsx`.

**Rationale**:
- Today's app mounts `<HashRouter>` from `react-router-dom`. The Rust host at `/api/v1/*` does not serve `index.html` for arbitrary client paths — a hard refresh on `/backends` would 404 without server changes. Hash routing sidesteps this entirely.
- `createHashRouter` is the data-mode equivalent of `<HashRouter>`. It accepts the same route-object array as `createBrowserRouter` and supports all loaders/actions/errorElement APIs. **No feature gap.**
- Upgrading to `createBrowserRouter` is a reversible, additive follow-up spec: it only requires the Rust host to emit `index.html` for unknown paths. Leaving it for later keeps this spec's blast radius minimal.

**Alternatives considered**:
- *Framework mode* (Remix-style `@react-router/dev` Vite plugin with file-based routing + SSR/SSG): rejected — we're a client-only SPA behind a Rust server; SSR is out of scope and framework mode would force a bundler reorganization.
- *Declarative mode* (keep `<Routes>/<Route>`): rejected — no loaders, no actions, no error boundaries, no pending UI; constitution Principle XII.3 explicitly forbids.
- *TanStack Router*: rejected on ecosystem cost — we already have React Router v7 installed, data mode satisfies every requirement, switching ecosystems adds churn without proportional benefit.

---

## R-2. Animation library: Motion (`motion/react`) vs alternatives

**Decision**: Add `motion@^12` as a dependency; import exclusively from `motion/react`; use `LazyMotion` + the `m` component for below-the-fold motion; reserve the full `motion.*` surface for hero/frequent-use animations only.

**Rationale**:
- Framer Motion was renamed to "Motion" — same library, new package name, React 19 + React Compiler support confirmed. Motion has 30M+ monthly npm downloads and is used by Framer and Figma in production.
- `AnimatePresence mode="popLayout"` keyed on `useLocation().pathname` is the canonical route-transition pattern and handles interrupted transitions gracefully (unlike the native View Transitions API, which is not interruptible and blocks pointer events).
- `layoutId` enables shared-element transitions between the install-modal trigger card and the centered modal with one prop, replacing manual CSS keyframe work.
- `LazyMotion` + `m` keeps initial bundle growth ≤ 6 KB gzipped, leaving headroom for SC-012's 8 KB budget.

**Alternatives considered**:
- *Native View Transitions API* (`unstable_ViewTransition` in React 19): rejected for primary route transitions — not interruptible, blocks pointer events during the transition, less performant with many elements animating. May be worth a follow-up spec for simple crossfades.
- *react-spring*: rejected on ecosystem fit — Motion is the de-facto standard for declarative React animation and has better documentation for the specific patterns we need.
- *GSAP*: rejected — paid license for SplitText/MorphSVG, heavier bundle, imperative API that fights React reconciliation.

---

## R-3. Loader return-type convention

**Decision**: Loaders are async functions returning a plain object. In `.view.tsx`, consume via `useLoaderData() as Awaited<ReturnType<typeof loader>>`. No `unknown`, no `any`, no Zod parse at the view layer.

**Rationale**:
- React Router v7 does not yet ship typed-route generics in data mode (framework mode does, via `Route.LoaderData`). The `Awaited<ReturnType<typeof loader>>` cast is the established community pattern for data mode until v7's typed-routes escape experimental.
- Services own validation at the I/O boundary (Principle XII.4). By the time a loader returns, the shape is trusted; the cast is safe by construction.

**Alternatives considered**:
- Wrap every loader's return in `Zod.parse` at the view: rejected — duplicates validation, bloats bundle, hurts typing (Zod infers wider types than the services already produce).
- Use `defineLoader` / `typedRoutes` from a community package (`@tanstack/router`-style): rejected — adds a dependency for a cosmetic improvement.

---

## R-4. Error-element strategy

**Decision**: One `errorElement` on the root layout route catches unexpected errors (crashes the `<Outlet/>` but keeps `<TopBar/>` + `<Sidebar/>` usable). Each route that fetches upstream data declares a per-route `errorElement` that renders a domain-specific empty/retry state. Loaders `throw new Response(body, { status })` for 4xx/5xx upstream failures.

**Rationale**:
- Matches React Router v7's documented pattern: `useRouteError()` inside an `errorElement` receives the thrown value (either the Response or a plain Error). Views don't need to handle fetch failures manually; the router does.
- Shell stays usable during per-route failures — user can navigate away instead of being locked out by a blank screen.

**Alternatives considered**:
- Single global ErrorBoundary component wrapping the app: rejected — loses per-route context and upstream status info.
- Let each loader return `{ error: string }` union and have the view render conditionally: rejected — duplicates the React Router pattern and loses the free pending UI from `useNavigation()`.

---

## R-5. SWR retention policy

**Decision**: SWR stays for two live-polling surfaces — `usePollingMetrics` (periodic metrics re-fetch) and `useEventStream` (event-bus WebSocket consumption). All other SWR call sites migrate to route loaders.

**Rationale**:
- SWR's revalidation model is redundant with `useNavigation()` + route loaders for one-shot data.
- For data that *must* keep updating while the user is on the screen (metrics dashboard, event trace), SWR is still the right tool — loaders are one-shot.
- Constitution XII.4 explicitly permits SWR for live-polling surfaces.

**Alternatives considered**:
- Remove SWR entirely, implement polling via `setInterval` + loader revalidation: rejected — loader revalidation is per-navigation, not timer-driven; we'd reimplement SWR's dedup and focus-revalidation.
- Migrate everything to TanStack Query: rejected on churn cost; SWR is already configured globally and fits.

---

## R-6. Playwright regression harness configuration

**Decision**: `@playwright/test` at three viewports (375 mobile, 768 tablet, 1440 desktop), Chromium-only for baseline, `reducedMotion: 'reduce'` forced, `animations: 'disabled'` in screenshot options, pixel-diff threshold 0.5% (`maxDiffPixelRatio: 0.005`). Baselines committed under `apps/web/tests/visual/baselines/`. Firefox/Safari verified on release candidates manually — not part of per-PR CI.

**Rationale**:
- Chromium-only per-PR keeps CI time bounded (< 2 minutes for 16 routes × 3 viewports). Firefox/Safari give diminishing returns for this refactor because the changes are structural (imports, file moves) not rendering-sensitive.
- `reducedMotion: 'reduce'` eliminates the single largest source of visual-diff flakiness (Motion running at the moment of screenshot capture).
- 0.5% threshold accommodates font subpixel rendering differences across workstations without masking real regressions.

**Alternatives considered**:
- Full cross-browser matrix per PR: rejected on CI cost and flakiness.
- `@storybook/test-runner` visual regression: rejected — Storybook is not in scope.
- Percy/Chromatic hosted services: rejected — adds SaaS dependency for a one-time refactor harness; Playwright's local diff is sufficient.

---

## R-7. `scan:constitution` implementation vehicle

**Decision**: Node ESM script at `apps/web/scripts/scan-constitution.mjs`. Uses `@typescript-eslint/parser` to build ASTs for TS/TSX files under `apps/web/src/`, applies per-rule AST queries, exits with code 2 on any violation. Regex-only fallbacks for pure import-string detection (`framer-motion`, `react-router-dom`). Output format: `FILE:LINE:COL [RULE_ID] message → see constitution § CLAUSE`.

**Rationale**:
- AST-based checks avoid the fragility of regex-only scanners (false positives on string literals inside comments/docstrings, missed matches across line boundaries).
- One script is simpler than a full ESLint plugin and doesn't require contributors to install extra ESLint configuration.
- Exit code 2 matches the other `scan:*` scripts in `apps/web/`, so CI reuses the same job skeleton.

**Alternatives considered**:
- Custom ESLint plugin: rejected — heavier to author and maintain, blocks on ESLint version upgrades, contributors already skip ESLint on save.
- Pure regex script: rejected — a contributor writing `// framer-motion was renamed` in a comment would trip the scanner.
- `ast-grep` / `semgrep`: rejected — adds a tool dependency outside the npm ecosystem.

---

## R-8. Install-modal dedup — canonical copy

**Decision**: The newly redesigned `apps/web/src/backends/install_modal.tsx` (Spectral Graphite styling, elapsed clock, log auto-scroll, status badge, Hide/Cancel/Done footer, landed in the session prior to this spec) is the canonical version. Move it to `apps/web/src/views/backends/components/install_modal/`. Delete `apps/web/src/components/layout/install_modal.tsx` and `apps/web/src/layout/component_registry.tsx`'s reference that points at it. Any call site currently importing the layout version is updated in the same slice.

**Rationale**:
- The backends version is the actively maintained one and the only one receiving the recent WebSocket subscription fix.
- The `components/layout/install_modal.tsx` path was the prior generic placement before the Spectral Graphite redesign; it is now a dead fork.

**Alternatives considered**:
- Merge features from both and keep one under `components/layout/`: rejected — the two implementations diverged materially and merging risks regressions in the stream handling.
- Promote to `src/components/install_modal/` (cross-view): rejected — only the Backends screen uses it; per Principle XII.7 a component is promoted to `components/` only when a second view needs it.

---

## R-9. `services/` split vs single `api_client.ts`

**Decision**: Split by backend domain — one service file per `/api/v1/<noun>` family: `services/backends.ts`, `services/host_models.ts`, `services/huggingface.ts`, `services/extensions.ts`, `services/runs.ts`, `services/modules.ts`, `services/deployments.ts`. `services/event_streams.ts` owns all WebSocket/EventSource constructors. A shared `services/api_client.ts` holds the `fetch` envelope + `ContractError` class; domain files import from it.

**Rationale**:
- One file per domain gives each screen's loader a single natural import (`import { listBackends } from "@/services/backends"`).
- Keeps file sizes bounded — the existing `api/client.ts` (~several hundred lines of ad-hoc exports) is broken into cohesive modules.
- Matches constitution Principle III (modularity) and Linguistic-Modular-Units (named by domain, not by type).

**Alternatives considered**:
- Single `services/api.ts` re-exporting everything: rejected — becomes a dumping ground, defeats Linguistic-Modular-Units.
- Sub-folder per service (`services/backends/index.ts`): rejected — unnecessary nesting for files that average < 150 lines.

---

## R-10. `react-router-dom` package removal timing

**Decision**: Keep `react-router-dom@^7.14` in `package.json` for one release cycle as a transitional compatibility alias. **All source imports** under `apps/web/src/` migrate to `react-router`. A follow-up PR in the next spec removes the `-dom` dependency entirely. The `scan:constitution` scanner blocks new source imports of `react-router-dom` from day one.

**Rationale**:
- Transitive dependencies might still reference `react-router-dom`; removing the package risks a resolution error we don't want to debug during a structural refactor.
- The scanner prevents new drift regardless of what's installed.

**Alternatives considered**:
- Remove in the same PR: rejected on risk — one more failure mode during a multi-PR refactor.
- Keep indefinitely: rejected — constitution Appendix E explicitly lists `react-router` as the required import path; the `-dom` package is transitional.

---

## Summary of decisions

| # | Topic | Decision |
|---|---|---|
| R-1 | Router mode | `createHashRouter` (data mode) |
| R-2 | Animation | `motion` package, `motion/react` import path, `LazyMotion + m` for bundle discipline |
| R-3 | Loader types | Plain-object return, `Awaited<ReturnType<typeof loader>>` cast in view |
| R-4 | Error elements | Root layout `errorElement` + per-route `errorElement`; loaders throw `Response` |
| R-5 | SWR | Kept for `usePollingMetrics` and `useEventStream` only |
| R-6 | Playwright config | 3 viewports × Chromium, reduced-motion forced, 0.5% diff threshold |
| R-7 | Scanner | Node ESM + `@typescript-eslint/parser` AST queries |
| R-8 | InstallModal dedup | `src/backends/install_modal.tsx` is canonical; move to `views/backends/components/install_modal/` |
| R-9 | Services layout | One file per backend domain + shared `api_client.ts` + `event_streams.ts` |
| R-10 | `react-router-dom` | Source imports switch to `react-router`; NPM dep kept one release |

Every `[NEEDS CLARIFICATION]` consideration from the spec template resolved. Ready for Phase 1.
