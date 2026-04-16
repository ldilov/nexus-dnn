# Implementation Plan: Deployments

**Branch**: `018-deployments` | **Date**: 2026-04-15 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/018-deployments/spec.md`

## Summary

Land **Deployments** as a first-class host feature — persisted, append-only, reloadable execution-context snapshots over canonical workflows/recipes — and at the same time split the over-grown `nexus-backend-runtimes` crate into three focused crates (`nexus-models-store`, `nexus-deployments`, `nexus-provenance`), with `nexus-backend-runtimes` retained only for runtime-adapter orchestration. All migrations stay centralized in `nexus-storage` (Clarification Q1). Hashes are SHA-256 over RFC 8785 JCS (Q3). `workspace_id` is a nullable forward-compat slot only (Q2). Revisions are retained indefinitely; run-referenced revisions are undeletable (Q5). The feature is backend-only; UI is explicitly out of scope.

## Technical Context

**Language/Version**: Rust 1.84 (workspace MSRV per existing crates)
**Primary Dependencies**:
- `sqlx` (SQLite, `runtime-tokio`, compile-time macros) — persistence
- `serde` + `serde_json` — entity (de)serialization
- `json-canon` (or equivalent crate implementing RFC 8785 JCS) — canonical JSON for hashing
- `sha2` — SHA-256 (already used across repo)
- `thiserror` — typed errors in libs; `anyhow` in app-layer
- `axum` (already in `nexus-api`) — HTTP surface for §21 endpoints
- `tokio` — async runtime
- `tracing` — observability (module lives in `nexus-core`)
- `uuid` — deployment/revision ids
- `time` / `chrono` — timestamps (match existing repo choice)

**Storage**: SQLite via `nexus-storage`. One new migration `011_deployments.sql` introduces all 12 deployment tables + additive `ALTER TABLE` on `workflows`, `recipes`, runtime-install/settings tables, and `runs`. Migration is idempotent per the existing runner contract.
**Testing**: `cargo test --workspace` with `#[tokio::test]` for async; `rstest` for table-driven cases; `mockall` where a trait boundary is injected. Contract tests live under `crates/nexus-api/tests/`; crate-level unit tests live inside each new crate.
**Target Platform**: Linux + Windows desktop host, same as the rest of the workspace.
**Project Type**: Rust workspace (library + cli + api). No frontend in this increment.
**Performance Goals**:
- Save a deployment with ≤ 2 MB canonical workflow JSON in under 250 ms p95 on local SQLite.
- Load (exact restore, all deps present) in under 500 ms p95.
- List (filter + page) 1k deployments in under 150 ms p95.
**Constraints**:
- Migrations stay centralized in `nexus-storage` (Clarification Q1 / FR-037). No extracted crate owns its own migrations directory.
- Hashes are SHA-256 over RFC 8785 JCS (Q3 / SI-07). No per-call-site ad-hoc canonicalization.
- `nexus-backend-runtimes` MUST NOT depend on any of the three new crates after the split (SC-005).
- No secrets in exported packages (SC-009). Only secret handles/ids.
- Revisions are append-only and indefinitely retained (Q5 / FR-003).
**Scale/Scope**:
- Up to ~10k deployments per workspace, up to a few hundred revisions per deployment (unpruned).
- Snapshot payloads: typically 50 KB – 2 MB; outlier cap handled by streaming read, not in-memory.
- ~12 new SQLite tables, 12 HTTP endpoints, 3 new crates, 1 migration file.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Note |
|---|---|---|
| I. Ecosystem-First | **PASS** | `sqlx`, `serde`, `json-canon`, `sha2`, `axum`, `uuid` — every dependency is battle-tested and already present in-workspace except `json-canon` (added with justification in research.md). |
| II. SOLID / Pure Functions / Classical Principles | **PASS** | Save/Load/Execute are split into **service → repository → mapper** layers. Domain logic (hashing, mapping-state derivation, compatibility classification) is pure; I/O confined to repository boundary. CQS respected (save/load commands vs query endpoints). |
| III. Modularity / Method Size / Small Crates | **PASS** | Three new focused crates (`nexus-models-store`, `nexus-deployments`, `nexus-provenance`). No file expected to exceed 400 LOC. `nexus-backend-runtimes` shrinks from a ~1.2 kLOC monolith to runtime-adapter orchestration only. |
| IV. Self-Documenting Code (NON-NEGOTIABLE) | **PASS** | No inline comments in production code. Doc-comments (`///`, `//!`) reserved for public trait contracts and safety/invariants. Test files may carry minimal assertion-intent notes. |
| V. Extendability via Adapter Contracts | **PASS** | Public `DeploymentRepository`, `DeploymentSnapshotStore`, and `CompatibilityClassifier` traits; public enums `#[non_exhaustive]`; deserializers use `#[serde(default)]`. New runtime/model/extension kinds land purely via trait impls in their owning crate. |
| VI. Test-First Verification | **PASS** | Phase 1 produces contract tests **before** implementation; `/speckit.tasks` will list tests as the first task in every user-story block. 80 %+ coverage target. |
| VII. Memory & Type Safety | **PASS** | Newtypes for `DeploymentId`, `DeploymentRevisionId`, `EffectiveWorkflowHash`, `PayloadHash`. Typed errors via `thiserror` (`DeploymentError`). No `unwrap()` outside tests. No new `unsafe`. |
| VIII. Living Documentation | **PASS** | Each new crate ships a `README.md`; root `README.md` gets a workspace-shape update in the same merge; `specs/018-deployments/` holds spec + plan + tasks + contracts. |
| IX. Git-Flow / Bisectable History | **PASS** | Branch already `018-deployments`. Plan decomposes into commits that each leave `cargo check --workspace` green (schema → crate skeletons → feature walls come later behind a flag). |
| X. Parallelism-First | **PASS** | Save pipeline writes snapshot + bindings + parameters in parallel awaits where independent; list/query uses prepared statements. Long-running validate runs via `tokio::spawn`. |
| XI. Rust Idioms & Anti-Pattern Registry | **PASS** | Builder for `DeploymentSaveRequest`; RAII guard for the save transaction; `#[non_exhaustive]` on every public enum; iterator-chain style for overlay normalization; no deref polymorphism; no clones-to-satisfy-borrowck. |

**Result**: all PASS. No Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/018-deployments/
├── spec.md                  # /speckit.specify output (clarified)
├── plan.md                  # THIS FILE
├── research.md              # Phase 0 output (below)
├── data-model.md            # Phase 1 output (below)
├── contracts/               # Phase 1 output
│   ├── http-api.md          # REST contracts for §21 endpoints
│   ├── deployments-crate.md # Public trait/type signatures — nexus-deployments
│   ├── models-store-crate.md
│   ├── provenance-crate.md
│   └── migration-011.md     # Migration content contract
├── quickstart.md            # Phase 1 output — how to verify the feature locally
├── checklists/
│   └── requirements.md      # already written in /specify
└── tasks.md                 # /speckit.tasks output (NOT created here)
```

### Source Code (repository root)

```text
crates/
├── nexus-api/
│   ├── src/handlers/deployments/     # NEW — §21 HTTP handlers
│   │   ├── mod.rs
│   │   ├── create.rs
│   │   ├── list.rs
│   │   ├── detail.rs
│   │   ├── revisions.rs
│   │   ├── metadata_patch.rs
│   │   ├── validate.rs
│   │   ├── load.rs
│   │   ├── run.rs
│   │   ├── clone.rs
│   │   ├── export.rs
│   │   └── import.rs
│   ├── src/router.rs                 # mount /api/v1/deployments
│   └── tests/
│       ├── deployments_contract.rs   # NEW — contract tests per endpoint
│       ├── deployments_multi_instance.rs
│       └── deployments_import_export.rs
│
├── nexus-storage/                    # migrations stay centralized HERE
│   ├── migrations/011_deployments.sql  # NEW — all deployment tables + ALTERs
│   ├── src/sqlite/migrations.rs      # add execute_migration_statements(…, "011")
│   ├── src/sqlite/deployments.rs     # NEW — raw sqlx mappers used by the crate below
│   └── queries/deployments/          # NEW — sqlx query files
│       ├── insert_deployment.sql
│       ├── insert_revision.sql
│       ├── insert_snapshot.sql
│       ├── insert_source_link.sql
│       ├── insert_parameter.sql
│       ├── insert_runtime_binding.sql
│       ├── insert_model_binding.sql
│       ├── insert_artifact_binding.sql
│       ├── insert_validation.sql
│       ├── insert_restore_diagnostic.sql
│       ├── insert_run_link.sql
│       ├── insert_tag.sql
│       ├── get_deployment.sql
│       ├── get_revision.sql
│       ├── list_deployments.sql
│       ├── update_deployment_metadata.sql
│       └── advance_current_revision.sql
│
├── nexus-deployments/                # NEW CRATE
│   ├── Cargo.toml
│   ├── README.md
│   ├── src/
│   │   ├── lib.rs                    # pub use facade
│   │   ├── id.rs                     # DeploymentId, DeploymentRevisionId newtypes
│   │   ├── hash.rs                   # SHA-256 over RFC 8785 JCS (PayloadHash, EffectiveWorkflowHash)
│   │   ├── error.rs                  # DeploymentError (thiserror)
│   │   ├── state.rs                  # lifecycle + restore + mapping enums
│   │   ├── compatibility.rs          # dimension × state classifier
│   │   ├── snapshot/
│   │   │   ├── mod.rs
│   │   │   ├── workflow_resolved.rs
│   │   │   ├── recipe_projection.rs
│   │   │   ├── parameter_overlay.rs
│   │   │   └── ui_state.rs
│   │   ├── parameter.rs              # DeploymentParameter + ParameterScope
│   │   ├── binding/
│   │   │   ├── runtime.rs            # RuntimeBinding
│   │   │   ├── model.rs              # ModelBinding
│   │   │   └── artifact.rs           # ArtifactBinding
│   │   ├── diagnostic.rs             # Severity, Category, Code, Diagnostic
│   │   ├── repository.rs             # DeploymentRepository trait (DIP)
│   │   ├── service/
│   │   │   ├── save.rs               # save + save_new_revision
│   │   │   ├── load.rs               # restore-mode selection
│   │   │   ├── validate.rs
│   │   │   ├── execute.rs            # execution_context_hash + run link
│   │   │   ├── clone.rs
│   │   │   ├── export.rs             # package manifest (no secrets, no binaries)
│   │   │   └── import.rs             # schema-validated, no auto-install
│   │   └── events.rs                 # §24 event enums (#[non_exhaustive])
│   └── tests/
│       ├── save_roundtrip.rs
│       ├── restore_modes.rs
│       ├── multi_instance.rs
│       ├── revision_retention.rs     # SC-005 style
│       ├── hash_determinism.rs       # SC-002
│       └── import_export.rs
│
├── nexus-models-store/               # NEW CRATE (extracted from nexus-backend-runtimes)
│   ├── Cargo.toml
│   ├── README.md
│   ├── src/
│   │   ├── lib.rs
│   │   ├── errors.rs                 # was models_store/errors.rs
│   │   ├── blobs.rs                  # was models_store/blobs.rs
│   │   ├── download.rs               # was models_store/download.rs
│   │   ├── install/                  # was models_store/install/
│   │   │   ├── mod.rs
│   │   │   ├── dto.rs
│   │   │   ├── fetcher.rs
│   │   │   ├── dedup.rs
│   │   │   └── pipeline.rs
│   │   ├── leases.rs                 # was models_store/leases.rs
│   │   ├── quantization.rs           # was models_store/quantization.rs
│   │   ├── reclaim.rs                # was models_store/reclaim.rs
│   │   ├── resolver.rs               # was models_store/resolver.rs
│   │   ├── verify.rs                 # was models_store/verify.rs
│   │   └── checksum.rs               # moved from nexus-backend-runtimes/src/checksum.rs
│   └── tests/
│       └── (existing tests relocated: model_install_dedup.rs, model_blob_dedup.rs,
│            quantization_matching.rs, model_lease_budget.rs,
│            model_uninstall_blocked_by_lease.rs, model_resolver_latency.rs,
│            model_resolve_dry_run.rs, model_layout.rs,
│            model_private_visibility.rs, model_uninstall_blocked_by_lease.rs)
│
├── nexus-provenance/                 # NEW CRATE (extracted)
│   ├── Cargo.toml
│   ├── README.md
│   ├── src/
│   │   ├── lib.rs
│   │   ├── license.rs                # was models_store/provenance.rs
│   │   └── hf_metadata.rs            # HF probe helpers from R3
│   └── tests/
│
├── nexus-backend-runtimes/           # RESIDUAL after split
│   ├── src/
│   │   ├── lib.rs                    # pub re-exports reduced to runtime-adapter surface
│   │   ├── adapter.rs                # unchanged
│   │   ├── channel.rs                # unchanged
│   │   ├── compatibility.rs          # unchanged
│   │   ├── detect.rs                 # unchanged
│   │   ├── diagnostics.rs            # unchanged
│   │   ├── error.rs                  # unchanged
│   │   ├── events.rs                 # unchanged
│   │   ├── extract.rs                # unchanged
│   │   ├── family.rs                 # unchanged
│   │   ├── launch_spec.rs            # unchanged
│   │   ├── lease.rs                  # unchanged
│   │   ├── llamacpp/                 # unchanged
│   │   ├── log_pipeline.rs           # unchanged (observability module, stays here for now)
│   │   ├── log_store.rs              # unchanged
│   │   ├── manifest/                 # unchanged
│   │   ├── parameter_catalog.rs      # unchanged
│   │   ├── reserved_policy.rs        # unchanged
│   │   ├── resolver.rs               # unchanged (runtime-registry flavour)
│   │   ├── runtime_installs_store/   # unchanged
│   │   ├── settings.rs               # unchanged
│   │   ├── settings_store.rs         # unchanged
│   │   ├── spawn/                    # unchanged
│   │   ├── state.rs                  # unchanged
│   │   ├── state_log.rs              # unchanged
│   │   ├── tensorrt_llm/             # unchanged
│   │   └── validator.rs              # unchanged
│   └── (models_store/, checksum.rs, manifest/provenance bits moved OUT — see above)
│
├── nexus-core/
│   └── src/observability/            # module (no new crate per Clarification Q4)
│       └── mod.rs
│
└── nexus-extension/
    ├── src/manifest.rs               # gains model_dependencies pass-through (already in R-series)
    └── tests/model_dependencies_manifest.rs   # unchanged
```

**Structure Decision**:

- Three new crates under `crates/` as named in Clarification Q4: `nexus-models-store`, `nexus-deployments`, `nexus-provenance`.
- `nexus-backend-runtimes` keeps runtime-adapter code and its public traits; shrinks by ~600 LOC.
- All SQL migrations and query files remain in `nexus-storage` per Clarification Q1 — extracted crates consume `nexus-storage` repositories/mappers.
- HTTP surface is added to existing `nexus-api` under a `deployments/` handler module, mounted on `/api/v1/deployments`.
- Observability stays inside `nexus-core` (no dedicated crate), re-exported where needed.
- Dependency arrows (enforced by SC-005 / SC-006 test):
  - `nexus-api` → `nexus-deployments` → `nexus-storage`
  - `nexus-api` → `nexus-models-store` → `nexus-storage`
  - `nexus-deployments` → `nexus-models-store` (to reference model records)
  - `nexus-deployments` → `nexus-provenance` (to attach provenance summaries to bindings)
  - `nexus-backend-runtimes` → *none of the three new crates*
  - No reverse edges; enforced by a workspace-level test (`workspace_crate_graph.rs`).

## Complexity Tracking

> No Constitution Check violations. Table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *(none)* | — | — |
