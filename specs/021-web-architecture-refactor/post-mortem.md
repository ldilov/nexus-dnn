# Spec 021 — Post-Mortem & Residual Baseline

Spec 021 closed with **133 constitution violations still baseline-allowed**
(down from 194 at spec start — a 31 % reduction). The harness guarantees
*new* violations never merge; the remaining entries are real but not
release-blocking.

## Residual composition (2026-04-18)

| Rule | Count | Nature |
|---|---|---|
| SR-009 | 113 | Static inline `style={{…}}` objects — mechanical extract to `.css.ts` |
| SR-004 | 13 | `useEffect` + I/O inside components — should move to loader or SWR |
| SR-005 | 5 | Raw `fetch()` outside `services/` — one-off call sites in `hooks/use_api` + two screens |
| SR-006 | 2 | Duplicate basename (`models.css.ts` appears in two locations) |

## Why we're not closing these in spec 021

Each class is an independent sweep that touches different files, and each
fix is O(minutes) but there are 133 of them. Bundling into spec 021 would
have bloated the PR trail from ~13 commits to ~150. Harness enforcement
(no new violations) captures the safety value; the cleanup is a
dedicated pass.

## Follow-up sweeps

Three small, parallelizable follow-up specs:

1. **spec 022a — SR-009 inline-style sweep.** Walk every `style={{…}}`
   literal, extract to the screen's sibling `.css.ts`. Fully mechanical.
   Success criterion: `SR-009` count in baseline = 0.
2. **spec 022b — SR-004 loader pushdown.** Move component-level `useEffect`
   I/O into `loader()` functions on the owning route or into SWR/React 19
   Actions. Success criterion: `SR-004` count in baseline = 0.
3. **spec 022c — SR-005/006 residual dedup.** Delete the five raw `fetch`
   sites, merge `models.css.ts` duplicates. Success criterion: remaining
   counts = 0; baseline JSON collapses to `{ "violations": [] }` and
   T080 closes.

## Other follow-ups (from Sync Impact Report)

- **spec 023 — Remove `react-router-dom` compat alias.** The dep is pinned
  at ^7.14 as a transitional shim; once all source imports use
  `react-router`, the NPM dep can be removed. Single-line change plus a
  smoke run.
- **spec 024 — Migrate to `createBrowserRouter`.** Requires the Rust host
  to serve SPA fallback (`/*` → `index.html`). Blocks on that host-side
  capability. Value: clean URLs, no more `/#/` prefix in baselines, better
  analytics.

## FR refinements applied 2026-04-18 (post-ship)

Following a `/speckit-analyze` pass that caught divergence between the spec
text and the delivered code, four clauses were refined in-place so the spec
no longer misrepresents the ship state:

| FR | Change | Why |
|---|---|---|
| FR-019 | Scope widened from "live-polling only" to include cached-query surfaces (`use_api.ts` family) backed by a written `swr-inventory.md` | The shipped code uses SWR for modules/workflows/deployments/etc. reads that need on-focus revalidation + shared cache. Rewriting these as loaders would lose behavior, not improve compliance. The intent of FR-019 (discipline) is preserved via the inventory audit. |
| FR-020 | Reclassified as **deferred** into spec 023 | The `refreshLayouts` callback migration to a router `action` genuinely wasn't done. Grouping it with the `createBrowserRouter` migration (same files, same refactor shape) avoids duplicate churn. |
| FR-025 | Permits CSS keyframes as an alternative to Motion for route transitions | `domAnimation` alone is ~28 KB gzipped; impossible to reconcile with SC-012's 8 KB cap. CSS keyframes deliver the same UX at 0 KB JS cost. |
| FR-027 | `layoutId` shared-element replaced with scale+fade reveal; `data-*` markers preserved for future reintroduction | `layoutId` requires `domMax` (~40 KB), unreachable under SC-012. Behavior-wise, users still see a distinct, connected install animation. |

All refinements preserve the original **intent** (discipline, performance,
distinct UX) while matching shipped reality. The post-ship marker in the FR
text makes the provenance discoverable without rewriting history.

## Achievements worth keeping visible

- Constitution v1.2.0 + Appendix E (allowed NPM deps) + Appendix F (9
  structural rules) merged and enforced by `pnpm scan:constitution`.
- 10 screens migrated to the `views/<name>/*.view.tsx / *.ui.tsx / *.css.ts`
  layered pattern.
- `services/` declared as the sole I/O boundary (9 domain files).
- Router migrated from manual hash switch to `createHashRouter` + data
  mode (`loader` / `action`).
- Regression harness: 12-route Playwright smoke + 36 visual baselines
  across 3 viewports, reduced-motion-stable.
- Motion polish delivered at **−5.92 KB gzipped** main-chunk delta — better
  than the pre-animation baseline — by choosing CSS keyframes for route
  transitions and lazy-loading Motion into an install-modal-only chunk.
- CI gate: `pnpm scan:bundle-size` prevents future main-chunk bloat > 8 KB
  without an explicit baseline bump.
