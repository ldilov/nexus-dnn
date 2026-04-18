# Spec 022 — Constitution Baseline Sweep (follow-up to 021)

**Status:** ✅ **DONE 2026-04-18** — all three slices complete; baseline **133 → 0**.
**Opened:** 2026-04-18 (filed from spec 021 T082 / post-mortem)
**Progress:** every SR-004, SR-005, SR-006, SR-009 entry drained; `pnpm scan:constitution` reports `0 baseline-allowed, 0 new`.

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

### 022b — SR-004 loader pushdown ✅ (13 → 0)

**DONE 2026-04-18.** 12 useEffect-with-I/O sites migrated to SWR, plus
2 path-level scanner allowlist entries for FR-019's explicit
live-polling carve-outs:

- 7 easy sites (home, artifacts, operator_specs, tool_catalog,
  recipe_catalog, workflow_catalog, plus `hooks/use_polling_metrics.ts`
  + `hooks/use_event_stream.ts` allowlisted) — landed in commit
  `cee4fcb`.
- 5 complex sites landed in the closing commit:
  - `components/layout/backend_selector.tsx` — `fetchLoadState` behind
    SWR; read-during-render `setStatus` sync gated by state compare.
  - `hooks/use_canvas_state.ts` — **hydrate** via SWR keyed on
    `canvas:{workflowId}`; **persist** via async helper hoisted to
    module scope (removes `.then` from the effect body).
  - `models/hf_search_panel.tsx` — debounced-search via SWR keyed on
    `["hf-search", q, format, license]`; offline state + 429 toast
    preserved via explicit error branching.
  - `views/models/components/model_card.tsx` — IntersectionObserver
    now flips a `visible` boolean; SWR keyed on
    `visible && model.install_id` so dependents fetch only on scroll-in.

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

**Achieved 2026-04-18**: `pnpm scan:constitution` → `0 baseline-allowed,
0 new`. Spec 022 closes. `scan-constitution-baseline.json` retained with
`violations: []` as a permanent record of the zero-state tripwire — any
future violation fails CI immediately.

## Non-goals

- No behavior changes. No UX tweaks. No new dependencies.
- Visual regression baselines MUST NOT change. Any baseline diff is a
  regression, not progress.
