# Spec 022 — Constitution Baseline Sweep (follow-up to 021)

**Status:** **mostly done 2026-04-18** — 022c complete, 022a complete, 022b 7/12 complete (5 deferred-complexity residuals remain)
**Opened:** 2026-04-18 (filed from spec 021 T082 / post-mortem)
**Progress:** baseline 133 → 5 (all SR-005, SR-006, SR-009 drained; 5 SR-004 residuals remain, all complex-lifecycle cases documented below)

## Goal

Drain the 133 constitution baseline entries left by spec 021 so
`apps/web/scripts/scan-constitution-baseline.json` collapses to
`{ "violations": [] }` and `pnpm scan:constitution` enforces green-field
compliance for the first time.

## Scope

Three parallelizable slices, one PR each:

### 022a — SR-009 inline-style sweep ✅ (113 → 0)

**DONE 2026-04-18.** Every `style={{…}}` literal with all-static keys
extracted into sibling `.css.ts` as a named export. Landed across three
commits ending in `<commit-hash>`. Visual-regression suite green
throughout.

### 022b — SR-004 loader pushdown (13 → 5, 7 done)

**Partially done 2026-04-18.** 7 simple call sites migrated to SWR
(matching refined FR-019's cached-query category). Five deferred-
complexity residuals remain:

- `hooks/use_canvas_state.ts:113, 134` — reducer-integrated workflow
  canvas state; moving to loader requires redesigning how unsaved edits
  interact with the route transition.
- `models/hf_search_panel.tsx:48` — debounced paginated HF search;
  SWR migration needs `useSWRInfinite` + query-key design.
- `views/modules/components/model_card.tsx:26` — conditional per-card
  dependents fetch; works but lives inside a render-time effect.
- `components/layout/backend_selector.tsx:53` — legacy pre-spec-021
  install flow that the backends redesign will replace; migration is
  wasted work until that lands.

Tracked as 022b-followup; not urgent since `scan:constitution`
prevents *new* SR-004 entries.

### 022c — SR-005/006 residual dedup ✅ (7 → 0)

**DONE 2026-04-18.** All 5 SR-005 sites moved into `services/`
(fetchHostBackends → `services/backends`; backend_selector RPC →
`services/local_llm_rpc`; hook WebSocket → `openEventsSocket` in
`services/event_streams`). Scanner allowlist extended with
`service-workers/` since those files are themselves an I/O boundary.
Dead `src/models/models.css.ts` stub deleted, resolving SR-006 dup.

## Exit criterion

`pnpm scan:constitution` reports `0 baseline-allowed, 0 new`. The baseline
JSON is committed with `violations: []` and retained only as a record of
`capturedAt` / `capturedOnSha`.

**Current state 2026-04-18**: 5 SR-004 entries remain; all are
deliberate deferrals for the reasons above. The spec can close once
those 5 sites migrate.

## Non-goals

- No behavior changes. No UX tweaks. No new dependencies.
- Visual regression baselines MUST NOT change. Any baseline diff is a
  regression, not progress.
