# Spec 022 — Constitution Baseline Sweep (follow-up to 021)

**Status:** not started
**Opened:** 2026-04-18 (filed from spec 021 T082 / post-mortem)

## Goal

Drain the 133 constitution baseline entries left by spec 021 so
`apps/web/scripts/scan-constitution-baseline.json` collapses to
`{ "violations": [] }` and `pnpm scan:constitution` enforces green-field
compliance for the first time.

## Scope

Three parallelizable slices, one PR each:

### 022a — SR-009 inline-style sweep (113 violations)

Every `style={{…}}` literal in `apps/web/src/**` with all-static keys
moves into the sibling `.css.ts` as a named export. Mechanical — one
screen per commit inside a single PR, or one PR per screen.

### 022b — SR-004 loader pushdown (13 violations)

`useEffect` + I/O inside view components moves to:
- `loader()` on the owning route (data mode), or
- `useSWR(key, fetcher)` if the surface is live-polling, or
- React 19 `<form action>` if the I/O is user-triggered.

### 022c — SR-005/006 residual dedup (7 violations)

- 5 × SR-005: inline `fetch()` → promote to `services/<domain>`.
- 2 × SR-006: rename one of the two `models.css.ts` files to a
  domain-qualified basename.

## Exit criterion

`pnpm scan:constitution` reports `0 baseline-allowed, 0 new`. The baseline
JSON is committed with `violations: []` and retained only as a record of
`capturedAt` / `capturedOnSha`.

## Non-goals

- No behavior changes. No UX tweaks. No new dependencies.
- Visual regression baselines MUST NOT change. Any baseline diff is a
  regression, not progress.
