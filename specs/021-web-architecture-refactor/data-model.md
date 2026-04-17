# Data Model: Web App Architecture Refactor

**Phase**: 1 (Design & Contracts)
**Status**: Draft

This is a refactor, not a data feature. The "entities" below are the structural
units the refactor introduces or reorganizes, plus the regression-harness fixtures
that govern correctness. There are no database tables, no SQL migrations, no new
domain aggregates. The Rust host is untouched.

---

## 1. RouteDescriptor

Unit of routing in `apps/web/src/routes.ts`.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `path` | `string` | Yes (unless parent has `path` and this is an `index` route) | URL pattern, `:param` for dynamic segments, `*` for splat |
| `Component` | `() => JSX.Element` | Yes (unless `lazy`) | The screen's `Component` export from its `index.ts` |
| `loader` | `(args: LoaderFunctionArgs) => Promise<object>` | No | One-shot data fetch; throws `Response` on 4xx/5xx |
| `action` | `(args: ActionFunctionArgs) => Promise<Response \| object>` | No | Mutation handler for `<Form>` submissions |
| `errorElement` | `JSX.Element \| () => JSX.Element` | No | Rendered when loader/action throws |
| `children` | `RouteDescriptor[]` | No | Nested routes; parent's `Component` must render `<Outlet/>` |
| `index` | `true` | No | Marks the default child route at the parent's path |
| `lazy` | `() => Promise<{ loader?, action?, Component, errorElement? }>` | No | Split-bundled route module |

### Validation Rules

- Every `path` MUST either begin with `/` (absolute) OR be relative to the parent route.
- `Component` MUST NOT be defined when `lazy` is defined, and vice versa.
- A route with `action` MUST also have a `loader` (so revalidation has data to refresh).
- `errorElement` is REQUIRED on the root layout route (catches unexpected errors).
- Legacy redirect routes use `loader: () => redirect("/...")` and MUST NOT have `Component`.

### State Transitions

None — routes are static at module load. React Router builds its internal router state lazily as navigation occurs.

---

## 2. ScreenFolder

Canonical organization unit under `apps/web/src/views/<screen>/`.

### Required Files

| File | Responsibility |
|---|---|
| `<screen>.view.tsx` | Smart container. Consumes `useLoaderData`, holds transient UI state, defines handlers, returns a single `<X.ui ... />` element. |
| `<screen>.ui.tsx` | Presentational. Props-in, JSX-out. No I/O imports. |
| `<screen>.css.ts` | Vanilla-extract styles consumed by `.ui.tsx`. |
| `index.ts` | Re-exports `{ loader, action?, Component }` where `Component = <screen>.view`. |

### Optional Subtree

| Path | Responsibility |
|---|---|
| `components/` | Screen-scoped presentational components. May have their own `components/`, `*.css.ts`, etc. |
| `<screen>.loader.ts` | If the loader grows beyond ~25 lines, extract to a sibling file; re-exported via `index.ts`. |
| `<screen>.action.ts` | Same treatment for actions. |

### Validation Rules

- `<screen>.view.tsx` MUST contain exactly one JSX root element, which MUST be the screen's UI component.
- `<screen>.ui.tsx` MUST NOT import from `src/services/`, `src/api/client`, `src/hooks/use_api*`, `react-router` (except type-only imports), or any file under `src/views/<other-screen>/`.
- `index.ts` MUST re-export at minimum `{ loader, Component }`; routes without loaders re-export only `{ Component }`.
- Filename casing follows the existing repo convention: `snake_case.tsx` (not kebab-case from the LRS article; internal consistency wins).

### State Transitions

A ScreenFolder is migrated through three observable states during the refactor:

```
legacy (flat *_view.tsx in src/views/)
   ↓ US3 migration task
staged (folder exists, .view.tsx + .ui.tsx split, still using useEffect data)
   ↓ loader extraction
compliant (loader-driven, constitution XII.2 + XII.4 satisfied)
```

The `scan:constitution` scanner recognizes the `compliant` state by absence of forbidden patterns; there is no explicit marker.

---

## 3. ServiceModule

A file under `apps/web/src/services/` owning the HTTP/WebSocket/EventSource surface for one backend domain.

### Fields (module-level)

| Attribute | Type | Notes |
|---|---|---|
| `name` | file basename, snake_case | Matches backend noun: `backends.ts`, `host_models.ts`, `huggingface.ts`, … |
| `backendDomain` | URL prefix | E.g. `/api/v1/backends` |
| `exportedFunctions` | typed async functions | `async function listBackends(): Promise<BackendSummary[]>` |
| `exportedSubscriptions` | `(onEvent: (evt) => void) => () => void` | For WebSocket/EventSource; returns a teardown fn |

### Validation Rules

- A service module MUST NOT import from `src/views/` or `src/components/`.
- Every `fetch` call MUST go through the shared `services/api_client.ts` envelope (error-typed, 4xx/5xx unwrapped to `ContractError`).
- WebSocket URL construction MUST read from `window.location` — no hardcoded origins.
- Exported function names MUST match the HTTP verb semantics: `listX`, `getX`, `createX`, `updateX`, `deleteX`, `installX`, `resolveX`, etc. (constitution POLA).

---

## 4. RouteSmokeEntry

Unit of the route-smoke regression fixture at `apps/web/tests/smoke/routes.json`.

### Schema

```json
{
  "path": "/backends",
  "title": "Backends",
  "mustContain": ["Local runtimes", "Install", "GPU"],
  "viewports": [375, 768, 1440],
  "requiresFixture": false
}
```

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `path` | string | Yes | URL hash after `#` (e.g. `/backends`, `/modules/:moduleId`) — `:param` replaced with a fixture value by the harness |
| `title` | string | Yes | `<title>` element content or on-screen page title |
| `mustContain` | string[] ≥ 3 | Yes | User-visible strings that MUST appear within 3 seconds of navigation |
| `viewports` | number[] | No (default `[375, 768, 1440]`) | Widths to run visual diff at |
| `requiresFixture` | boolean | No | `true` if the route needs a mock data fixture (e.g., `/modules/:moduleId` needs a moduleId that exists) |
| `fixtureSeed` | string | No | Path to a JSON seed file under `tests/smoke/fixtures/` |

### Validation Rules

- The full set of entries MUST cover every route declared in `routes.ts` (enforced by a smoke-test-level assertion that compares the fixture count to the route count).
- `mustContain` strings SHOULD be user-visible copy, not CSS class names or test-ids (because copy is what users notice when it regresses).
- Route-smoke entries are authoritative — adding a new route means adding an entry in the same PR.

---

## 5. VisualBaseline

A PNG captured by Playwright and committed under `apps/web/tests/visual/baselines/<route-slug>/<viewport>.png`.

### Fields (file-level)

| Attribute | Notes |
|---|---|
| `route` | The slugified `path` (e.g., `backends`, `modules-moduleId-blueprint`) |
| `viewport` | One of `375`, `768`, `1440` |
| `pngPath` | `apps/web/tests/visual/baselines/<route>/<viewport>.png` |
| `sha` | Commit SHA the baseline was captured at, stored in a sibling `metadata.json` |

### Validation Rules

- Baselines MUST be captured on `main` immediately before the first refactor slice merges (FR-034), NOT retroactively.
- Any PR that updates a baseline MUST include a one-line rationale in the commit message and a reviewer sign-off (per FR-037).
- Baseline PNGs live in git-LFS if the repo is configured for it, or regular git otherwise — tracked in `.gitattributes` during US5.

---

## 6. ScannerRule

Unit of constitution enforcement in `apps/web/scripts/scan-constitution.mjs`.

### Schema (in-script)

```ts
interface ScannerRule {
  id: string;                   // SR-001, SR-002, ...
  clause: string;               // "Principle XII.3" / "Appendix F"
  description: string;
  match: (ast: SourceFile) => Array<{ line: number; col: number; msg: string }>;
}
```

### Rule Set (v0)

| ID | Clause | Forbidden Pattern |
|---|---|---|
| SR-001 | Appx F | `import ... from "framer-motion"` |
| SR-002 | Appx F | `import ... from "react-router-dom"` in any `.ts`/`.tsx` source |
| SR-003 | XII.3 | JSX `<BrowserRouter>`, `<HashRouter>`, `<Routes>`, `<Route>` |
| SR-004 | XII.4 | `useEffect` call whose body contains `fetch(` or `.then(` within the same arrow function |
| SR-005 | XII.4 | `fetch(` call site outside `apps/web/src/services/` (exemptions: `src/api/generated/`, `tests/`) |
| SR-006 | XII.7 | Two files with the same basename under `apps/web/src/` (exemptions: `index.ts`, `index.tsx`, `types.ts`) |
| SR-007 | XII.2 | `.view.tsx` file whose JSX tree has more than one direct child OR whose root is not a PascalCase component (likely a `<div>` or layout tag) |
| SR-008 | Appx F | Deep barrel chain (index.ts re-exports from another index.ts in a subdirectory) |
| SR-009 | XII.5 | `JSXAttribute[name="style"]` whose value is an ObjectExpression with ALL statically-evaluable literal properties (no `Identifier`, `CallExpression`, `BinaryExpression`, or `TemplateLiteral` with expressions). Dynamic styles — e.g., `style={{ width: `${pct}%` }}` — are permitted; truly static inline styles — e.g., `style={{ color: "#ba9eff" }}` — are not. |

### Validation Rules

- Exit code 2 on any violation (matches existing `scan:*` convention).
- Output format: `FILE:LINE:COL [RULE_ID] {description} → see constitution § {clause}`.
- Zero violations on `main` at the time `scan:constitution` is added (US5) — if pre-existing violations exist, the scanner allows a one-time baseline snapshot in `scripts/scan-constitution-baseline.json` that is shrunk monotonically. Constitution-violating imports that are NOT pre-existing MUST fail from day one.

---

## Cross-entity Relationships

```
RouteDescriptor ──────► ScreenFolder.index.ts (re-exports loader + Component)
ScreenFolder.view ────► uses ServiceModule.exportedFunctions (via loader)
ScreenFolder.ui   ────► (no relationship to ServiceModule — props only)
RouteDescriptor ──────► RouteSmokeEntry (1:1 by path)
RouteSmokeEntry ──────► VisualBaseline (1:N — one baseline per viewport)
ScannerRule     ──────► constitution clause (1:1)
ScannerRule     ──────► set of source files scanned (1:N)
```

The `scan:constitution` job consumes `routes.ts` and the source tree; the visual-regression Playwright suite consumes `routes.json` and writes/compares PNGs under `baselines/`.
