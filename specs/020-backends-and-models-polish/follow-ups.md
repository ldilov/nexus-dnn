# Spec 020 follow-ups

66/68 tasks complete. The 2 remaining are operator actions that cannot be executed in a code session.

## T504 — Quickstart wall-time capture

**Status**: not runnable in automated sessions (needs live Rust daemon + real HF network).

Run the walkthrough in [quickstart.md](quickstart.md) end-to-end on a fresh DB. Capture:
- **SC-Q1-01** — fresh DB → CUDA 12 llama.cpp installed, under 90 s wall time.
- **SC-Q3-01** — HF search first-page P95 under 1.5 s.
- **SC-Q3-02** — dedup install under 500 ms.
- **SC-Q4-02** — live-node validation under 100 ms after edge mutation.

Paste results into the spec 020 PR description.

## T511 — Squash before merge

**Status**: post-review action for the operator.

Every commit on `020-backends-and-models-polish` must leave the workspace green-building (`cargo check --workspace` passes) so `git bisect` remains useful (Principle IX). Current branch has 3 structured commits — no intermediate broken states. If additional fix-up commits land during review, squash before merging to `main`.

---

## Landed in the four implementation sessions

### US1 — Install flow (P1)
- `GET /api/v1/llm/backends/{id}/variants` endpoint (4 contract tests).
- `project_variants` pure helper (5 unit tests).
- Frontend `VariantPickerDrawer` + `InstallModal` wiring, all `noop` handlers gone.
- `pnpm scan:noop` CI script.

### US2 — View Details drawer (P2)
- `BackendDetailDrawer` glassmorphic — metadata grid, live LogConsole, Validate/Repair/Uninstall with two-click confirm.

### US3 — HF search on /models (P1)
- `GET /api/v1/host-models/{id}/dependents` endpoint (3 contract tests).
- `POST /api/v1/host-models` endpoint with **real pipeline** (5 contract tests):
  - HF `detail` + `download` into staging dir with per-file SHA256.
  - `install_from_staging` in nexus-models-store composes dedup + insert + CAS materialize.
  - 201 new / 200 dedup / 403 private / 404 repo / 401 gated / 429 rate-limited / 502 unreachable.
- Frontend `HfSearchPanel` with debounce, filters, dedup detection, offline detection.
- "Shared by N extension(s)" chip with lazy-load via IntersectionObserver.
- `use_host_model_install_stream` hook ready for async progress emission.

### US4 — DAG draft nodes (P3)
- `useDraftNodes` hook + `computePromotions` pure helper.
- `.nodeDraft` orange-dashed outline, `DRAFT` chip, required-input error suppression, auto-promote on wire, no-demotion guard.
- Save-guard toast listing stuck draft ids; right-click "Mark all N live".

### Polish
- Path-traversal helpers `safe_join_under` (7 tests) + `guard_relative_path` (5 tests).
- `scrim` + `shadowElevation` theme tokens.
- `#[non_exhaustive]` on public DTOs.
- READMEs updated.
- Spectral Graphite design system memory saved.

---

## Gate summary

- **Rust**: `cargo test -p nexus-api -p nexus-models-store --tests` → **210 pass, 0 fail** (22 new tests).
- **Clippy**: clean on touched crates.
- **Frontend**: `pnpm tsc --noEmit` + `scan:theme` (198 files) + `scan:noop` all green.
- **Visual**: `/backends` + `/models` confirmed in preview.

## Commit structure on `020-backends-and-models-polish`

```
86e5a50 docs(spec-020): mark T001/T211/T213/T223 complete
536f3f8 feat(host-models): real install pipeline (spec 020 T211/T213/T223)
0b65250 feat(backends+models): spec 020 — variant picker, detail drawer, HF panel, DAG drafts
```

All three commits leave `cargo check --workspace` green.

Ready for PR once T504 metrics captured.
