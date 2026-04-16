---
description: "Task list for 018-deployments"
---

# Tasks: Deployments

**Input**: Design documents in [specs/018-deployments/](.)
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/)

**Tests**: Test tasks are included throughout per Constitution Principle VI (Test-First Verification) and spec Success Criteria SC-001..SC-010. Red → Green → Refactor where infrastructure permits.

**Organization**: Grouped by user story (US1..US7) so each story ships as an independent MVP increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no incomplete deps)
- **[US#]**: user-story label (set on story-phase tasks only)
- Every task names an exact file path.

## Path conventions

Rust workspace under `crates/`. New crates: `crates/nexus-deployments/`, `crates/nexus-models-store/`, `crates/nexus-provenance/`. Migrations in `crates/nexus-storage/migrations/`. HTTP handlers in `crates/nexus-api/src/handlers/deployments/`.

---

## Phase 1 — Setup (shared infrastructure)

**Purpose**: scaffold the three new crates and wire them into the workspace so every subsequent phase can build against them.

- [ ] T001 Add three new crate entries to the workspace manifest in `Cargo.toml` under `[workspace] members = [ ... ]` — `crates/nexus-deployments`, `crates/nexus-models-store`, `crates/nexus-provenance`.
- [ ] T002 [P] Create `crates/nexus-deployments/Cargo.toml` with the manifest outlined in [contracts/deployments-crate.md](contracts/deployments-crate.md). Confirm `uuid` in the workspace dependency table enables the `v7` feature (add it if missing) per analysis finding A1.
- [ ] T003 [P] Create `crates/nexus-models-store/Cargo.toml` with the manifest outlined in [contracts/models-store-crate.md](contracts/models-store-crate.md).
- [ ] T004 [P] Create `crates/nexus-provenance/Cargo.toml` with the manifest outlined in [contracts/provenance-crate.md](contracts/provenance-crate.md).
- [ ] T005 [P] Create `crates/nexus-deployments/src/lib.rs` with empty public facade (`pub mod id; pub mod state; pub mod error; pub mod hash; pub mod events;` stubs compiling to `todo!()` where non-trivial).
- [ ] T006 [P] Create `crates/nexus-models-store/src/lib.rs` with empty module declarations matching the target layout in plan.md §Project Structure.
- [ ] T007 [P] Create `crates/nexus-provenance/src/lib.rs` with empty module declarations per plan.md.
- [ ] T008 [P] Create `crates/nexus-deployments/README.md` documenting purpose, public surface, invariants (per Constitution VIII).
- [ ] T009 [P] Create `crates/nexus-models-store/README.md`.
- [ ] T010 [P] Create `crates/nexus-provenance/README.md`.
- [ ] T011 Run `cargo check --workspace` and fix any manifest errors introduced in T001–T010. Commit with `feat(018): scaffold nexus-deployments / nexus-models-store / nexus-provenance crates`.

---

## Phase 2 — Foundational (blocking prerequisites for all user stories)

**Purpose**: migration 011, the storage mapper layer, the repository trait, and the hashing helper. All downstream stories depend on these.

### 2A — Migration 011 (delivers US6 — DB linkage schema)

- [ ] T012 [P] Write contract test `crates/nexus-storage/tests/migration_011_apply_twice.rs` asserting the migration applies twice without error (idempotency).
- [ ] T013 [P] Write contract test `crates/nexus-storage/tests/migration_011_schema.rs` asserting every expected table, column, and index from [data-model.md](data-model.md) §1 and §2 exists after migration.
- [ ] T014 Create migration file `crates/nexus-storage/migrations/011_deployments.sql` implementing the SQL shape in [contracts/migration-011.md](contracts/migration-011.md) — all 12 new tables + additive `ALTER TABLE` on `workflows`, `recipes`, `runs`, plus the indexes listed in data-model.md. **Before authoring**, inspect the current `runtime_installs` and `runtime_settings` schema (via `sqlite3 .schema` on a freshly-migrated DB, or by reading prior migrations 008/009): if `schema_version` / `health_state` columns already exist there, OMIT the `ALTER TABLE` lines for those tables entirely and record the skip in a leading SQL comment (`-- runtime_installs.schema_version already present in migration NNN, skipped`). Never emit a conditional migration. Closes analysis finding I1.
- [ ] T015 Extend `crates/nexus-storage/src/sqlite/migrations.rs::run_migrations` with the new `execute_migration_statements(pool, include_str!("../../../../migrations/011_deployments.sql"), true)` call at the tail.
- [ ] T016 Run T012 and T013 — they must go from RED → GREEN with no changes to T014/T015 other than fixing authored bugs.

### 2B — Hashing helper (SI-07)

- [ ] T017 [P] Write unit test `crates/nexus-deployments/tests/hash_determinism.rs` asserting `hash::sha256_jcs(value)` is byte-stable for a fixture set of JSON inputs (primitives, nested objects, reordered keys, unicode NFC cases) — covers SC-002.
- [ ] T018 Implement `crates/nexus-deployments/src/hash.rs` with `sha256_jcs(value: &serde_json::Value) -> [u8; 32]`, `hex(&[u8; 32]) -> String`, `EffectiveWorkflowHash`, `PayloadHash` newtypes. Depends on `json-canon` and `sha2` (added in T002).
- [ ] T019 Run T017 — must pass.

### 2C — Newtypes, enums, errors, events

- [ ] T020 [P] Implement `crates/nexus-deployments/src/id.rs` — `DeploymentId`, `DeploymentRevisionId` newtypes with `FromStr`, `Display`, `serde::{Serialize, Deserialize}`, UUIDv7-based constructor.
- [ ] T021 [P] Implement `crates/nexus-deployments/src/state.rs` — `DeploymentState`, `RestoreState`, `MappingState` enums with `#[non_exhaustive]`, `#[serde(rename_all = "snake_case")]`, and exhaustive-match helpers.
- [ ] T022 [P] Implement `crates/nexus-deployments/src/parameter.rs` — `ParameterScope` enum.
- [ ] T023 [P] Implement `crates/nexus-deployments/src/compatibility.rs` — `CompatDim`, `CompatState`, and `CompatibilitySummary` (map-like).
- [ ] T024 [P] Implement `crates/nexus-deployments/src/diagnostic.rs` — `Severity`, `Category`, `DiagnosticCode`, `Diagnostic` struct.
- [ ] T025 [P] Implement `crates/nexus-deployments/src/error.rs` — `DeploymentError` with every variant listed in [contracts/deployments-crate.md](contracts/deployments-crate.md).
- [ ] T026 [P] Implement `crates/nexus-deployments/src/events.rs` — `DeploymentEvent` `#[non_exhaustive]` enum per contracts file.

### 2D — Repository trait + mappers in nexus-storage

- [ ] T027 [P] Write contract test `crates/nexus-storage/tests/deployments_mapper_insert_deployment.rs` covering insert/fetch round-trip for `deployments`.
- [ ] T028 [P] Write contract test `crates/nexus-storage/tests/deployments_mapper_insert_revision.rs` covering append-only revision insert + `advance_current_revision`.
- [ ] T029 [P] Write contract test `crates/nexus-storage/tests/deployments_mapper_list_filters.rs` covering list-by-tag/state/backend_family/source.
- [ ] T030 Create `crates/nexus-storage/src/sqlite/deployments.rs` with raw sqlx mappers (DTOs + `insert_*`, `fetch_*`, `list`, `update_metadata`, `count_runs_referencing_revision`) for every new table in [data-model.md](data-model.md) §1.
- [ ] T031 [P] Author `crates/nexus-storage/queries/deployments/insert_deployment.sql`.
- [ ] T032 [P] Author `crates/nexus-storage/queries/deployments/insert_revision.sql`.
- [ ] T033 [P] Author `crates/nexus-storage/queries/deployments/insert_snapshot.sql`.
- [ ] T034 [P] Author `crates/nexus-storage/queries/deployments/insert_source_link.sql`.
- [ ] T035 [P] Author `crates/nexus-storage/queries/deployments/insert_parameter.sql` (batch-friendly).
- [ ] T036 [P] Author `crates/nexus-storage/queries/deployments/insert_runtime_binding.sql`.
- [ ] T037 [P] Author `crates/nexus-storage/queries/deployments/insert_model_binding.sql`.
- [ ] T038 [P] Author `crates/nexus-storage/queries/deployments/insert_artifact_binding.sql`.
- [ ] T039 [P] Author `crates/nexus-storage/queries/deployments/insert_validation.sql`.
- [ ] T040 [P] Author `crates/nexus-storage/queries/deployments/insert_restore_diagnostic.sql`.
- [ ] T041 [P] Author `crates/nexus-storage/queries/deployments/insert_run_link.sql`.
- [ ] T042 [P] Author `crates/nexus-storage/queries/deployments/insert_tag.sql`.
- [ ] T043 [P] Author `crates/nexus-storage/queries/deployments/get_deployment.sql`.
- [ ] T044 [P] Author `crates/nexus-storage/queries/deployments/get_revision.sql`.
- [ ] T045 [P] Author `crates/nexus-storage/queries/deployments/list_deployments.sql` with all §21 filter predicates.
- [ ] T046 [P] Author `crates/nexus-storage/queries/deployments/update_deployment_metadata.sql`.
- [ ] T047 [P] Author `crates/nexus-storage/queries/deployments/advance_current_revision.sql`.
- [ ] T048 [P] Author `crates/nexus-storage/queries/deployments/count_runs_referencing_revision.sql`.
- [ ] T049 Implement `crates/nexus-deployments/src/repository.rs` — the `DeploymentRepository` async trait (signatures in [contracts/deployments-crate.md](contracts/deployments-crate.md)) + a `SqliteDeploymentRepository` impl adapter that delegates to `nexus_storage::sqlite::deployments` mappers.
- [ ] T050 Run T027–T029 — must pass end-to-end against an in-memory SQLite with migration 011 applied.

### 2E — Workspace dependency-graph enforcement

- [ ] T051 Write workspace test `crates/nexus-api/tests/workspace_crate_graph.rs` that shells `cargo metadata --format-version 1` and asserts: (a) `nexus-backend-runtimes` has no dependency on `nexus-models-store`, `nexus-deployments`, or `nexus-provenance`; (b) `nexus-deployments` depends on `nexus-storage`, `nexus-models-store`, `nexus-provenance`; (c) `nexus-models-store` depends on `nexus-storage` but not on `nexus-backend-runtimes` or `nexus-deployments`; (d) the directories `crates/nexus-deployments`, `crates/nexus-models-store`, `crates/nexus-provenance` each contain no `migrations/` subdirectory and no `.sql` files (enforces FR-037 / analysis C3). Covers SC-005 / SC-006.

**Foundational checkpoint**: `cargo test -p nexus-storage -p nexus-deployments` and the workspace-graph test are green. All subsequent user-story phases can now start in parallel.

---

## Phase 3 — US1: Save a deployment without mutating sources (P1)

**Goal**: save current working state as a named deployment with full source lineage + runtime/model bindings + per-scope parameter overlays, guaranteeing no mutation of source `workflows` / `recipes` / `extensions` rows. Covers FR-001..FR-014, SC-001.

**Independent test criterion**: `POST /api/v1/deployments` creates deployment + revision 1 + all child rows atomically; source rows are byte-identical before and after.

### Tests for US1 (written first)

- [ ] T052 [P] [US1] Write regression test `crates/nexus-deployments/tests/save_no_source_mutation.rs` — snapshots `workflows` and `recipes` row hashes before and after a full save; asserts identity. Covers SC-001.
- [ ] T053 [P] [US1] Write integration test `crates/nexus-deployments/tests/save_roundtrip.rs` — save a fixture deployment, read it back via repository, assert field-by-field equality and `effective_workflow_hash` determinism.
- [ ] T054 [P] [US1] Write mapping-state derivation unit test `crates/nexus-deployments/tests/mapping_state.rs` — covers `fully_mapped` / `partially_mapped` / `custom` decisions for three fixture inputs (clean recipe, partial recipe, graph-escalated).
- [ ] T055 [P] [US1] Write HTTP contract test `crates/nexus-api/tests/deployments_create_contract.rs` — POST a valid body, assert `201`, envelope shape, and populated fields per [contracts/http-api.md](contracts/http-api.md#post-apiv1deployments--create-deployment).

### Implementation for US1

- [ ] T056 [P] [US1] Implement overlay normalization in `crates/nexus-deployments/src/snapshot/parameter_overlay.rs` — groups overlays by `ParameterScope`, sorts by `(scope, binding_target, logical_key)`, JCS-canonicalizes, hashes.
- [ ] T057 [P] [US1] Implement `crates/nexus-deployments/src/snapshot/workflow_resolved.rs` — produces the materialized `workflow_resolved` snapshot from an input session payload.
- [ ] T058 [P] [US1] Implement `crates/nexus-deployments/src/snapshot/recipe_projection.rs` — captures recipe field values + section state when saving from a recipe view.
- [ ] T059 [P] [US1] Implement `crates/nexus-deployments/src/snapshot/ui_state.rs` — optional `ui_restore_json` payload (§8.11).
- [ ] T060 [P] [US1] Implement `crates/nexus-deployments/src/binding/runtime.rs` — `RuntimeBinding` struct + mapper to `NewRuntimeBinding` repository row.
- [ ] T061 [P] [US1] Implement `crates/nexus-deployments/src/binding/model.rs` — `ModelBinding` struct + mapper.
- [ ] T062 [P] [US1] Implement `crates/nexus-deployments/src/binding/artifact.rs` — `ArtifactBinding` struct + mapper.
- [ ] T063 [US1] Implement `crates/nexus-deployments/src/service/save.rs` — `DeploymentSaveService::save` and `::save_new_revision`; transactional via a single `Repository` call path; emits `deployment.created` / `deployment.revision.created` via the event bus; enforces mapping-state derivation from T054 logic. Depends on T049 and T056–T062.
- [ ] T064 [US1] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/create.rs` — parse body, call `DeploymentSaveService::save`, map `DeploymentError` to status codes per [contracts/http-api.md](contracts/http-api.md#post-apiv1deployments--create-deployment).
- [ ] T065 [US1] Register the new handler in `crates/nexus-api/src/handlers/deployments/mod.rs` and mount `/api/v1/deployments` in `crates/nexus-api/src/router.rs`.
- [ ] T066 [US1] Run T052–T055 — all must pass.

---

## Phase 4 — US2: Load a deployment and restore an executable session (P1)

**Goal**: resolve availability, pick restore mode (`exact` / `rebase` / `degraded` / `read_only`), emit diagnostics, materialize working session. Covers FR-015, FR-016, §11.

**Independent test criterion**: after kill + restart, loading a previously-saved deployment returns a session whose recomputed `effective_workflow_hash` matches the stored one, never auto-installs missing extensions, and never mutates sources.

### Tests for US2

- [ ] T067 [P] [US2] Write integration test `crates/nexus-deployments/tests/restore_modes.rs` — four fixtures driving each restore state (`fully_restorable`, `restorable_with_rebase`, `restorable_with_degraded_features`, `restorable_read_only`).
- [ ] T068 [P] [US2] Write failure test `crates/nexus-deployments/tests/restore_missing_extension.rs` — extension disabled; asserts no auto-install, restore state degrades, `extension`-category diagnostic present. Covers SC-003.
- [ ] T069 [P] [US2] Write HTTP contract test `crates/nexus-api/tests/deployments_load_contract.rs`.

### Implementation for US2

- [ ] T070 [P] [US2] Implement compatibility classifier in `crates/nexus-deployments/src/compatibility.rs` — per-dimension state computation over stored snapshot vs current host state.
- [ ] T071 [P] [US2] Implement availability resolver in `crates/nexus-deployments/src/service/availability.rs` — queries `workflows`, `recipes`, `extensions`, `runtime_installs`, `runtime_settings`, `host_models` through repositories (no mutation).
- [ ] T072 [US2] Implement `crates/nexus-deployments/src/service/load.rs::DeploymentLoadService::load` — picks restore mode, assembles session DTO, emits `deployment.loaded` or `deployment.restore.degraded`. Depends on T070 + T071.
- [ ] T073 [US2] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/load.rs`.
- [ ] T074 [US2] Run T067–T069 — all must pass.

---

## Phase 5 — US3: Execute a deployment and record execution_context_hash on the run (P1)

**Goal**: compute `execution_context_hash`, create a `runs` row linked via `deployment_run_links`, route through the existing run orchestrator. Covers FR-017, FR-018, FR-026, SC-007.

**Independent test criterion**: a successful execute creates a run whose `deployment_id`, `deployment_revision_id`, `execution_context_hash` are all populated; `deployments.last_*_run_id` and `run_count` advance.

### Tests for US3

- [ ] T075 [P] [US3] Write integration test `crates/nexus-deployments/tests/execute_links_run.rs` — asserts post-conditions on `runs` and `deployment_run_links` rows + `deployments.run_count`.
- [ ] T076 [P] [US3] Write failure test `crates/nexus-deployments/tests/execute_blocked_when_read_only.rs` — execute refuses when `restore_state=restorable_read_only`.
- [ ] T077 [P] [US3] Write failure test `crates/nexus-deployments/tests/execute_no_silent_backend_swap.rs` — missing runtime install; execute returns blocking diagnostic; no substitution.
- [ ] T078 [P] [US3] Write HTTP contract test `crates/nexus-api/tests/deployments_run_contract.rs`.

### Implementation for US3

- [ ] T079 [US3] Extend `crates/nexus-storage/queries/runs/insert.sql` (or add a companion `insert_with_deployment.sql`) to accept the three new columns `deployment_id`, `deployment_revision_id`, `execution_context_hash`.
- [ ] T080 [US3] Implement `crates/nexus-deployments/src/service/execute.rs::DeploymentExecuteService::execute` — computes `execution_context_hash = sha256_jcs(resolved_workflow || overlays || runtime_binding || model_binding)`, creates run via `nexus_run::RunOrchestrator` trait, inserts `deployment_run_links`, emits `deployment.run.created`.
- [ ] T081 [US3] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/run.rs`.
- [ ] T082 [US3] Run T075–T078 — all must pass.

---

## Phase 6 — US4: Multi-instance deployments of one extension (P1)

**Goal**: two or more concurrent deployments rooted in the same `(workflow, recipe, extension)` with different runtime/model settings, each independently addressable and runnable. Covers FR-027..FR-029, SC-004.

**Independent test criterion**: creating two deployments with different runtime and model bindings from the same source yields distinct `effective_workflow_hash` values, independent lifecycle transitions, and no shared rows.

### Tests for US4

- [ ] T083 [P] [US4] Write integration test `crates/nexus-deployments/tests/multi_instance.rs` — creates two deployments from one extension recipe with different runtime + model bindings; asserts distinct `effective_workflow_hash`; archive one, confirm the other is untouched.
- [ ] T084 [P] [US4] Write integration test `crates/nexus-deployments/tests/multi_instance_extension_disabled.rs` — disable the common source extension; both deployments transition to `degraded`/`stale` without deletion.
- [ ] T085 [P] [US4] Write HTTP-level end-to-end test `crates/nexus-api/tests/deployments_multi_instance.rs`.

### Implementation for US4

- [ ] T086 [US4] Add `debug_assert!` in every child-row insert path inside `crates/nexus-deployments/src/service/save.rs` confirming each row's `deployment_revision_id` equals the parent revision's id (parameters, runtime binding, model binding, artifact bindings, snapshots, source links). Closes analysis finding C2 deterministically.
- [ ] T087 [US4] Run T083–T085 — all must pass with no code changes to US1–US3 services beyond those added in T086.

---

## Phase 7 — US5: Split nexus-backend-runtimes into three focused crates (P1)

**Goal**: extract `nexus-models-store` and `nexus-provenance` from the monolith; leave `nexus-backend-runtimes` with runtime-adapter orchestration only. Covers FR-034..FR-036, SC-005, SC-006.

**Independent test criterion**: workspace graph test passes; `cargo test --workspace` green; every existing models-store and provenance test still runs — from the new crates.

### Tests for US5 (use existing)

- [ ] T088 [P] [US5] Ensure T051 (workspace graph test) is up to date; if not yet present, author it. (No-op if already done in Phase 2E.)

### Implementation for US5 — models-store extraction

- [ ] T089 [US5] Move `crates/nexus-backend-runtimes/src/models_store/errors.rs` → `crates/nexus-models-store/src/errors.rs`. Keep type names unchanged.
- [ ] T090 [US5] Move `crates/nexus-backend-runtimes/src/models_store/blobs.rs` → `crates/nexus-models-store/src/blobs.rs`.
- [ ] T091 [US5] Move `crates/nexus-backend-runtimes/src/models_store/download.rs` → `crates/nexus-models-store/src/download.rs`.
- [ ] T092 [US5] Move `crates/nexus-backend-runtimes/src/models_store/install/` (all files) → `crates/nexus-models-store/src/install/`.
- [ ] T093 [US5] Move `crates/nexus-backend-runtimes/src/models_store/leases.rs` → `crates/nexus-models-store/src/leases.rs`.
- [ ] T094 [US5] Move `crates/nexus-backend-runtimes/src/models_store/quantization.rs` → `crates/nexus-models-store/src/quantization.rs`.
- [ ] T095 [US5] Move `crates/nexus-backend-runtimes/src/models_store/reclaim.rs` → `crates/nexus-models-store/src/reclaim.rs`.
- [ ] T096 [US5] Move `crates/nexus-backend-runtimes/src/models_store/resolver.rs` → `crates/nexus-models-store/src/resolver.rs`.
- [ ] T097 [US5] Move `crates/nexus-backend-runtimes/src/models_store/verify.rs` → `crates/nexus-models-store/src/verify.rs`.
- [ ] T098 [US5] Move `crates/nexus-backend-runtimes/src/checksum.rs` → `crates/nexus-models-store/src/checksum.rs`.
- [ ] T099 [US5] Update `crates/nexus-models-store/src/lib.rs` to declare and re-export every moved module.
- [ ] T100 [US5] Remove `pub mod models_store;` and related re-exports from `crates/nexus-backend-runtimes/src/lib.rs`; remove the `models_store/` subtree and `checksum.rs`.
- [ ] T101 [US5] Move tests `model_install_dedup.rs`, `model_blob_dedup.rs`, `quantization_matching.rs`, `model_lease_budget.rs`, `model_uninstall_blocked_by_lease.rs`, `model_resolver_latency.rs`, `model_resolve_dry_run.rs`, `model_layout.rs`, `model_private_visibility.rs` from `crates/nexus-backend-runtimes/tests/` → `crates/nexus-models-store/tests/`.

### Implementation for US5 — provenance extraction

- [ ] T102 [US5] Move `crates/nexus-backend-runtimes/src/models_store/provenance.rs` → `crates/nexus-provenance/src/license.rs`.
- [ ] T103 [US5] Move any HF-metadata probe helpers added in spec-017 R3 (search `nexus-backend-runtimes/src` for `hf_metadata` and related) → `crates/nexus-provenance/src/hf_metadata.rs`.
- [ ] T104 [US5] Update `crates/nexus-provenance/src/lib.rs` to declare and re-export moved modules.
- [ ] T105 [US5] Remove the corresponding files/modules from `crates/nexus-backend-runtimes`.

### Implementation for US5 — consumer path updates

- [ ] T106 [P] [US5] Update import paths in `crates/nexus-api/src/**/*.rs` — replace `nexus_backend_runtimes::models_store::` with `nexus_models_store::`, and provenance imports with `nexus_provenance::`.
- [ ] T107 [P] [US5] Update import paths in `crates/nexus-extension/src/**/*.rs`.
- [ ] T108 [P] [US5] Update any remaining import paths workspace-wide (`grep -r "nexus_backend_runtimes::models_store"` in `crates/`) and fix each hit.
- [ ] T109 [US5] Add `nexus-models-store` and `nexus-provenance` as dependencies to `crates/nexus-api/Cargo.toml` and `crates/nexus-extension/Cargo.toml` where the moved types are now referenced.
- [ ] T110 [US5] Run `cargo check --workspace`, then `cargo test --workspace`. All existing models-store and provenance tests must pass unchanged; T051 must pass. Covers SC-005 / SC-006.
- [ ] T111 [US5] Update `crates/nexus-backend-runtimes/README.md` to reflect the new narrowed scope (runtime-adapter orchestration only).

---

## Phase 8 — US7: List, filter, archive, favorite, clone, export, import, validate (P2)

**Goal**: management surface on top of Stories 1–6. Covers FR-030..FR-032, §21 endpoints beyond create/load/run, SI-02..SI-05, SC-008, SC-009.

### Tests for US7

- [ ] T112 [P] [US7] Write HTTP contract test `crates/nexus-api/tests/deployments_list_contract.rs` covering every filter in [contracts/http-api.md](contracts/http-api.md).
- [ ] T113 [P] [US7] Write HTTP contract test `crates/nexus-api/tests/deployments_detail_contract.rs`.
- [ ] T114 [P] [US7] Write HTTP contract test `crates/nexus-api/tests/deployments_revision_contract.rs`.
- [ ] T115 [P] [US7] Write HTTP contract test `crates/nexus-api/tests/deployments_metadata_patch_contract.rs`.
- [ ] T116 [P] [US7] Write HTTP contract test `crates/nexus-api/tests/deployments_validate_contract.rs`.
- [ ] T117 [P] [US7] Write HTTP contract test `crates/nexus-api/tests/deployments_clone_contract.rs`.
- [ ] T118 [P] [US7] Write secret-scan test `crates/nexus-deployments/tests/export_secret_scan.rs` — feeds payloads containing `api_key`, `secret`, `password`, bearer tokens; asserts export returns `ExportBlockedBySecret`. Covers SC-009.
- [ ] T119 [P] [US7] Write import-isolation test `crates/nexus-api/tests/deployments_import_no_autoinstall.rs` — imports a package referencing a missing extension; asserts deployment lands `degraded`/`stale`, zero new rows in `extensions`/`runtime_installs`/`runtime_settings`/`host_models`. Covers SC-008.
- [ ] T120 [P] [US7] Write diagnostic-taxonomy regression test `crates/nexus-deployments/tests/diagnostic_taxonomy.rs` — covers SC-010 (every failure surface produces a non-empty `(severity, category, code, message)`).

### Implementation for US7

- [ ] T121 [P] [US7] Implement `crates/nexus-deployments/src/service/validate.rs::DeploymentValidateService::validate` — writes `deployment_validations` + normalized `deployment_restore_diagnostics`, emits `deployment.validated` and `deployment.compatibility.changed`.
- [ ] T122 [P] [US7] Implement `crates/nexus-deployments/src/service/clone.rs::DeploymentCloneService::clone` — copies metadata + selected revision into a new deployment, records `source_kind=cloned_deployment` lineage.
- [ ] T123 [P] [US7] Implement `crates/nexus-deployments/src/service/export.rs::DeploymentExportService::export` — writes the R-07 envelope; secret-scan pass on every emitted value; `integrity.digest = sha256_jcs(...)`.
- [ ] T124 [P] [US7] Implement `crates/nexus-deployments/src/service/import.rs::DeploymentImportService::import` — schema-validate envelope; create deployment in `stale`/`degraded` when deps missing; NEVER writes extension/runtime/model tables.
- [ ] T125 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/list.rs`.
- [ ] T126 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/detail.rs`.
- [ ] T127 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/revisions.rs` (get revision).
- [ ] T128 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/metadata_patch.rs`.
- [ ] T129 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/validate.rs`.
- [ ] T130 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/clone.rs`.
- [ ] T131 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/export.rs`.
- [ ] T132 [P] [US7] Wire HTTP handler `crates/nexus-api/src/handlers/deployments/import.rs`.
- [ ] T133 [US7] Update `crates/nexus-api/src/router.rs` to register all Phase-8 routes.
- [ ] T134 [US7] Run T112–T120 — all must pass.

---

## Phase 9 — Revision retention invariants (P1 cross-cutting from Clarification Q5)

**Goal**: enforce FR-003 — revisions append-only, indefinitely retained, run-referenced revisions undeletable.

- [ ] T135 [P] Write unit test `crates/nexus-deployments/tests/revision_retention_undeletable.rs` — attempts to delete a revision referenced by a `deployment_run_links` row; asserts `DeploymentError::RevisionReferencedByRuns(n)` with a blocking diagnostic.
- [ ] T136 [P] Write unit test `crates/nexus-deployments/tests/revision_retention_unbounded.rs` — creates 50 revisions; asserts all rows persist and `current_revision_id` advances correctly.
- [ ] T137 Implement revision-delete guard in `DeploymentRepository::advance_current_revision` path (or a sibling `delete_revision` method) using `count_runs_referencing_revision` from T048/T049.
- [ ] T138 Run T135 and T136 — must pass.

---

## Phase 9b — Security hardening: path validation (SI-04)

**Goal**: deployment-stored paths (model locators, artifact refs, preferred output dirs) MUST be validated against the workspace allow-list before use on save, load, and import. Closes analysis finding U1.

- [ ] T149 [P] Write unit test `crates/nexus-deployments/tests/path_validation.rs` covering: absolute paths outside the workspace roots rejected; relative traversal (`..`, mixed slashes, URL-encoded) rejected; UNC / device paths on Windows rejected; symlink escapes rejected on resolution; well-formed workspace-relative paths accepted.
- [ ] T150 Implement `crates/nexus-deployments/src/path_guard.rs` — `PathGuard` newtype wrapping a verified `PathBuf`, `pub fn verify(raw: &str, allowed_roots: &[&Path]) -> Result<PathGuard, DeploymentError>`, `impl AsRef<Path>`. Uses `std::fs::canonicalize` for symlink resolution when the path exists; rejects otherwise by lexical checks.
- [ ] T151 Wire `PathGuard::verify` into:
  - `crates/nexus-deployments/src/service/save.rs` — every `model_locator` and `artifact_ref` that represents a local path.
  - `crates/nexus-deployments/src/service/load.rs` — re-verify on load (defence in depth).
  - `crates/nexus-deployments/src/service/import.rs` — reject imports with paths outside allow-list; deployment lands `degraded` with a `security` / `path_outside_workspace` diagnostic rather than silently accepting.
  Run T149 — must pass.

---

## Phase 10 — Polish & cross-cutting concerns

- [ ] T139 [P] Update root `README.md` workspace-shape section to reflect the three new crates and the shrunken `nexus-backend-runtimes` (Constitution VIII).
- [ ] T140 [P] Update `crates/nexus-storage/README.md` to document the new migration 011 and the deployments query tree.
- [ ] T141 [P] Update `crates/nexus-api/README.md` to document the new `/api/v1/deployments` surface.
- [ ] T142 [P] Add module-level `//!` docs to every new public module in `nexus-deployments`, `nexus-models-store`, `nexus-provenance` (Constitution IV doc-comments allowance).
- [ ] T143 [P] Add item-level `///` docs to every public trait, enum, and struct introduced by this feature (Constitution VIII, XI).
- [ ] T144 Run `cargo fmt --all`.
- [ ] T145 Run `cargo clippy --workspace --all-targets -- -D warnings` and fix any new warnings introduced by this feature.
- [ ] T146 Run `cargo test --workspace` — zero failures, zero unauthorized ignores; every `#[ignore]` has a one-line reason.
- [ ] T147 Verify every Success Criterion SC-001..SC-010 in [spec.md](spec.md) has at least one automated test. Fill any gap with an additional test in the appropriate crate.
- [ ] T148 Update [specs/018-deployments/checklists/requirements.md](checklists/requirements.md) to note "Phase 10 polish complete".
- [ ] T152 [P] Write consolidated event-emission test `crates/nexus-deployments/tests/events_emitted.rs` that drives save → validate → load → degrade → execute → archive against a capturing `Bus` stub and asserts all 10 events from §24 fire with correct payload shape. Closes analysis finding C1.
- [ ] T153 [P] Write migration-numbering guard test `crates/nexus-storage/tests/migrations_numbering.rs` asserting `crates/nexus-storage/migrations/*.sql` filenames are monotonic `NNN_*.sql` and every file is referenced from `run_migrations`. Closes analysis finding C4.

---

## Dependencies & completion order

```
Phase 1 (Setup)
  ↓
Phase 2 (Foundational — migration, hashing, newtypes, repository, graph test)
  ├──→ Phase 3 (US1 — Save)  ─────────┐
  │                                    ↓
  │                              Phase 4 (US2 — Load)
  │                                    ↓
  │                              Phase 5 (US3 — Execute)
  │                                    ↓
  │                              Phase 6 (US4 — Multi-instance)
  │
  ├──→ Phase 7 (US5 — Crate split)  [runs in parallel with Phases 3–6]
  │
  ├──→ Phase 9 (Revision retention)  [runs in parallel; depends on Phase 2 repo layer]
  │
  └──→ Phase 8 (US7 — Management surface)  [depends on Phases 2, 3, 4]

Phase 10 (Polish) runs last.
```

### Parallel opportunities

- **Inside Phase 2**: every `[P]` task — 2A tests, 2B hashing test, 2C enums/errors/events, 2D SQL files — can be authored concurrently across worktrees.
- **Phase 7 (US5) vs Phase 3 (US1)**: no file overlap; extract monolith in one worktree while building save service in another. The workspace graph test (T051) gates merge but not authorship.
- **Phase 8 (US7)**: T121–T132 are independent handlers/services.
- **Phase 10**: T139–T143 are doc changes in disjoint files.

### MVP scope

**Minimum viable delivery**: Phases 1 + 2 + 3 (US1 only) — users can save a deployment without mutating source assets, covered by SC-001. Ship as first merge; remaining phases land incrementally behind the same branch.

---

## Task-count summary

| Phase | Tasks | Parallelizable |
|---|---:|---:|
| 1 Setup                       | 11 | 9 |
| 2 Foundational                | 40 | 27 |
| 3 US1 Save                    | 15 | 10 |
| 4 US2 Load                    |  8 |  5 |
| 5 US3 Execute                 |  8 |  4 |
| 6 US4 Multi-instance          |  5 |  3 |
| 7 US5 Crate split             | 24 |  3 |
| 8 US7 Management surface      | 23 | 20 |
| 9 Revision retention          |  4 |  2 |
| 10 Polish                     | 10 |  5 |
| **Total**                     | **148** | **88** |

### Per-story coverage

| Story | Tasks | Key tests |
|---|---:|---|
| US1 — Save                   | 15 | T052–T055 |
| US2 — Load                   |  8 | T067–T069 |
| US3 — Execute                |  8 | T075–T078 |
| US4 — Multi-instance         |  5 | T083–T085 |
| US5 — Crate split            | 24 | T051, T088, T110 |
| US6 — DB linkage             | (folded into Phase 2) | T012, T013 |
| US7 — Management surface     | 23 | T112–T120 |

### Independent-test criteria (per story)

- **US1**: `save_no_source_mutation.rs` + `save_roundtrip.rs` + `deployments_create_contract.rs` green.
- **US2**: `restore_modes.rs` + `restore_missing_extension.rs` + `deployments_load_contract.rs` green.
- **US3**: `execute_links_run.rs` + `execute_blocked_when_read_only.rs` + `execute_no_silent_backend_swap.rs` + `deployments_run_contract.rs` green.
- **US4**: `multi_instance.rs` + `multi_instance_extension_disabled.rs` + `deployments_multi_instance.rs` green.
- **US5**: `workspace_crate_graph.rs` + `cargo test --workspace` green + all relocated models-store/provenance tests still passing.
- **US6**: `migration_011_apply_twice.rs` + `migration_011_schema.rs` green.
- **US7**: every contract test T112–T120 green.

### Success-criterion → task coverage map

| SC | Covered by |
|---|---|
| SC-001 | T052 |
| SC-002 | T017, T019, T053 |
| SC-003 | T068 |
| SC-004 | T083 |
| SC-005 | T051, T110 |
| SC-006 | T110, T146 |
| SC-007 | T075 |
| SC-008 | T119 |
| SC-009 | T118 |
| SC-010 | T120 |

### Format validation

Every task above uses the required `- [ ] T### [P?] [US?] <description with file path>` shape:
- Setup/Foundational/Retention/Polish phases carry no `[US#]` label.
- User-story phases always carry `[US1]..[US7]`.
- `[P]` appears only where the task targets a disjoint file from other in-phase work.
- Every task description names an exact file path.
