# Implementation Plan: Backends + Models page polish (Q1 / Q3 / Q4)

**Branch**: `020-backends-and-models-polish` | **Date**: 2026-04-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/020-backends-and-models-polish/spec.md`

## Summary

Three deferred phases from the 2026-04-17 research pass, landing on one branch:

- **Q1 (P1)** — Wire `BackendCard.Install` / `View Details` / `Repair` / `Uninstall` through a new `VariantPickerDrawer` + new `BackendDetailDrawer` into the already-built `InstallModal`. Requires the detail endpoint to expose per-variant release data so the picker has something to list.
- **Q3 (P1)** — Merge the HF search + install UX from `ModelsPanel.tsx` into the host-level `ModelsView`, decoupling it from a single `extensionId` scope and routing through a new host-level install path that lands rows in `host_model_installs` with `owner_extension_id = NULL`.
- **Q4 (P3)** — Frontend-only `draft | live` per-node flag in the React Flow canvas so freshly-dropped operator nodes stop shouting "required input not connected" until the user has actually had a chance to wire them.

Two `[NEEDS CLARIFICATION]` markers from the spec (FR-Q3-04 `installed_by` column, FR-Q3-06 `dependents` endpoint) are resolved in `research.md` §1 before contract work begins.

## Technical Context

**Language/Version**: Rust 1.84 (workspace MSRV) · TypeScript 5.x · React 19
**Primary Dependencies**: axum, tokio, serde (Rust) · @xyflow/react (Dagre), SWR, sonner, vanilla-extract (web)
**Storage**: SQLite via `nexus-storage` (no new migrations; FR-Q3-04 `installed_by` resolved as "defer")
**Testing**: cargo test (backend contract + router tests) · vitest/Playwright for frontend deferred under Principle VI design-heavy-UI carve-out
**Target Platform**: Windows 11 + Linux host desktops (spec-017 host-governed runtime)
**Project Type**: web — Rust host at `crates/nexus-api` + React SPA at `apps/web/`
**Performance Goals**: HF search P95 < 1.5 s (SC-Q3-01); dedup install < 500 ms (SC-Q3-02); node validation < 100 ms after promotion (SC-Q4-02)
**Constraints**: No new workspace dependencies (Principle I — reuse existing `hfSearch`, `InstallModal`, React Flow state). No `noop` handlers left behind (SC-Q1-02).
**Scale/Scope**: ≤10 backends, ~200 HF results/page, DAGs ≤100 operator nodes per workflow.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | PASS / Note / FAIL | Notes |
|---|---|---|
| I. Ecosystem-First | PASS | No new deps; reuses `hfSearch`, `installExtensionModel` pipeline, `InstallModal`, `@xyflow/react` state machinery. |
| II. SOLID & Pure Functions | PASS | `VariantPickerDrawer` / `BackendDetailDrawer` / `HfSearchPanel` are SRP components. Install side effects isolated behind one `runInstall(variant)` action. |
| III. Modularity & Small Files | PASS | Each new component is its own file (target ≤300 lines). No `utils.ts` bucket. |
| IV. Self-Documenting Code | PASS | No inline comments in source; module `//!` / `///` docs on new handlers only. |
| V. Extendability | PASS | Variant catalog is derived from the existing `VersionManifest`; a new backend family auto-populates its picker without host code changes. |
| VI. Test-First Verification | PASS-with-note | Spec invokes v1.1.2 design-heavy-UI carve-out for per-component vitest/Playwright. Backend contract tests (new `/variants`, new `/host-models` POST, new `/dependents`) remain mandatory and land first. See **Test strategy** below. |
| VII. Memory & Type Safety | PASS | Newtype `InstallId` already in place; new handlers use existing `RuntimeAdapterError`. No `unsafe`. |
| VIII. Living Documentation | PASS | `crates/nexus-api/README.md` + root `README.md` updated in the implementation sprint that touches routes. |
| IX. Git-Flow Branching | PASS | Feature branch `020-backends-and-models-polish`; every commit keeps `cargo check --workspace` green. |
| X. Parallelism-First | PASS | Q1 (frontend + backend variants), Q3 (frontend + backend host-install + dependents), Q4 (frontend-only) are independent and implemented in parallel tasks. |
| XI. Rust Idioms Registry | PASS | New handlers return typed errors; borrowed `&str` params; no `.clone()` for borrow-checker escape. |

### Test strategy (Principle VI carve-out invocation)

Q1 and Q3 each ship one or more new backend endpoints; cargo router-level contract tests are mandatory for all three and land before the UI task. Q4 is pure-frontend presentation state with no data invariant. The frontend interaction tests (vitest for `VariantPickerDrawer` reducer, Playwright for the install happy path) are **deferred** under the carve-out that spec 019 invoked, with a follow-up sprint tracked in `tasks.md`. Deferral rationale: all three phases are visual integrations; the invariants that matter (install manifest parsing, dedup, envelope shape, dependents aggregation) are enforced in Rust and covered.

## Project Structure

### Documentation (this feature)

```text
specs/020-backends-and-models-polish/
├── plan.md              # This file
├── research.md          # Phase 0 — clarification resolutions + reuse audit
├── data-model.md        # Phase 1 — UI view-models + backend DTOs
├── quickstart.md        # Phase 1 — "install llama.cpp CUDA 12 in 90 s" walkthrough
├── contracts/
│   ├── backends_variants.http      # GET /api/v1/llm/backends/{id}/variants
│   ├── host_models_install.http    # POST /api/v1/host-models
│   └── host_model_dependents.http  # GET /api/v1/host-models/{install_id}/dependents
├── spec.md              # Input
└── tasks.md             # /speckit.tasks output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
crates/
├── nexus-api/src/handlers/backends/
│   ├── catalog.rs            # EDIT — add `variants()` handler (Q1)
│   ├── host_models.rs        # EDIT — add host-scope install + dependents handlers (Q3)
│   └── mod.rs                # EDIT — re-export new handlers
├── nexus-api/src/router.rs   # EDIT — wire 3 new routes
└── nexus-backend-runtimes/src/manifest/version.rs   # REUSE — source for Variant projection

apps/web/src/
├── backends/
│   ├── variant_picker_drawer.tsx       # NEW — picker UI (Q1)
│   ├── variant_picker_drawer.css.ts    # NEW
│   ├── backend_detail_drawer.tsx       # NEW — View Details drawer (Q1)
│   ├── backend_detail_drawer.css.ts    # NEW
│   └── hooks/
│       └── use_install_stream.ts       # NEW — WS adapter → AsyncIterable<InstallStreamEvent>
├── models/
│   ├── hf_search_panel.tsx             # NEW — host-scope extraction from ModelsPanel.tsx
│   └── hf_search_panel.css.ts          # NEW
├── views/
│   ├── backends_view.tsx               # EDIT — replace noop handlers (Q1)
│   ├── models_view.tsx                 # EDIT — mount HfSearchPanel alongside installed grid (Q3)
│   └── graph_view.tsx                  # EDIT — wire draft | live node state (Q4)
├── hooks/
│   └── use_draft_nodes.ts              # NEW — Map<nodeId, "draft"|"live"> with promotion rules (Q4)
├── nodes/
│   └── operator_node.tsx               # EDIT — orange dashed border + required-port suppression (Q4)
└── api/
    └── client.ts                       # EDIT — add fetchBackendVariants, installHostModel, fetchHostModelDependents
```

**Structure Decision**: Existing web + Rust host layout. All changes stay within `crates/nexus-api/src/handlers/backends/` and `apps/web/src/{backends,models,views,hooks,nodes}/`. No new crates; no frontend package moves.

## Phase 0 — Outline & Research

Output: [research.md](research.md). Resolves the two `[NEEDS CLARIFICATION]` markers and audits reuse sources.

- FR-Q3-04 (`installed_by` column) → **defer** (YAGNI; provenance already in task events).
- FR-Q3-06 (dependents endpoint) → **ship now** (30-line JOIN; SC-Q3-03 needs accurate N).
- InstallModal event source → adapt existing WS channel via new `use_install_stream(backendId)` hook.
- Variant catalog source → project `VersionManifest` via a new `variants()` handler filtered by `MachineDescriptor::detect()`.
- Q4 draft-node persistence → frontend-only, not persisted; cleared on workflow switch.

## Phase 1 — Design & Contracts

### Data Model

See [data-model.md](data-model.md). Key entities:
- **`BackendVariantDto`** — `{ release_id, platform, accelerator_profile, label, recommended, supported, disabled_reason, size_bytes, checksum_sha256 }`.
- **`InstallHostModelRequest`** / dedup response — same `ModelInstallTaskDto` shape with `already_installed: bool`.
- **`DependentsResponse`** — `{ count, extensions: [{ extension_id, display_name, kind: "lease" | "declared_dep" }] }`.
- **`DraftNodeState`** — frontend-only `Map<nodeId, "draft" | "live">`; promotion rules + save guard.

### Contracts

See `specs/020-backends-and-models-polish/contracts/`:

1. `GET /api/v1/llm/backends/{backendId}/variants` → `ApiResponse<BackendVariantsResponse>`
2. `POST /api/v1/host-models` → `ApiResponse<ModelInstallTaskDto>` (201 new / 200 dedup)
3. `GET /api/v1/host-models/{install_id}/dependents` → `ApiResponse<DependentsResponse>`

Existing contracts reused unchanged:
- `GET /api/v1/llm/backends/{id}` (detail)
- `POST /api/v1/llm/backends/{id}/install`
- `DELETE /api/v1/backends/{installId}` (uninstall)
- `POST /api/v1/llm/backends/{id}/validate`
- `GET /api/v1/host-models` (list)
- `GET /api/v1/huggingface/search?q=...`
- WS channel emitting `llm.backend.install.progress|completed|failed|log`

### Quickstart

See [quickstart.md](quickstart.md). End-to-end walkthrough: empty DB → `/backends` → Install llama.cpp (CUDA 12) → `InstallModal` completes → `READY` → `/models` → HF search → install top GGUF → row shared with `local-llm` extension without re-download + DAG draft-node behavior verification.

### Agent-file update

`.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` will be run at implementation kickoff. No new tech stack entries required; `CLAUDE.md` already lists Rust 1.84 + SQLite via `nexus-storage`.

### Post-design Constitution re-check

All gates remain PASS. No new violations surfaced by Phase 1 design.

## Complexity Tracking

No principle violations require justification. The single PASS-with-note (Principle VI) is a pre-approved v1.1.2 carve-out, documented in **Test strategy** above with a follow-up sprint.

---

## Artifacts generated by this command

- `specs/020-backends-and-models-polish/plan.md` (this file)
- `specs/020-backends-and-models-polish/research.md`
- `specs/020-backends-and-models-polish/data-model.md`
- `specs/020-backends-and-models-polish/quickstart.md`
- `specs/020-backends-and-models-polish/contracts/backends_variants.http`
- `specs/020-backends-and-models-polish/contracts/host_models_install.http`
- `specs/020-backends-and-models-polish/contracts/host_model_dependents.http`

**Branch**: currently on `main` with unstaged work from the 2026-04-17 session. Implementation kickoff should first cut branch `020-backends-and-models-polish` (first task in `tasks.md`).

**Next command**: `/speckit.tasks` against this plan to emit `tasks.md` ordered Q1 contracts → Q1 frontend → Q3 contracts → Q3 frontend → Q4 frontend.
