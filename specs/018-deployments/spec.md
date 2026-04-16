# Feature Specification: Deployments

**Feature Branch**: `018-deployments`
**Created**: 2026-04-15
**Status**: Draft
**Input**: User description: "Review the md/json/zip inputs and create a new feature called Deployments. Also split the HUGE crate nexus-backend-runtimes into multiple focused modules/crates — backend-runtimes should not handle models-store, logging, etc. Ensure the database represents the relationship between recipes, workflows, and extensions. Each extension is a module (instance); we may have multiple instance deployments that differ by settings. UI is not ready yet — prepare the backend now."

**Source references**: `deployments-feature-requirements.md` (§§1–32), `deployments-feature-schema-draft.sql`, `deployments-feature-example.json`.

---

## Clarifications

### Session 2026-04-15

- Q: Under the crate split, where do deployment + models-store migrations live? → A: Centralized in `nexus-storage` — extracted crates own query/mapper code only; migrations remain single-sourced in `crates/nexus-storage/src/sqlite/migrations.rs`.
- Q: Is `workspace_id` a real entity now or forward-compat only? → A: Forward-compat only — `workspace_id TEXT NULL`, no `workspaces` table, no enforced FK; v1 deployments carry `NULL` unless a caller supplies a string.
- Q: What hash algorithm and canonicalization for `effective_workflow_hash`, `payload_hash`, and the parameter/runtime/model binding payload hashes? → A: **SHA-256 over RFC 8785 JCS** (JSON Canonicalization Scheme). Applies to every deployment-scoped hash required by SI-07 / §20.3.
- Q: What is the crate-extraction granularity? → A: Mid — three new crates: `nexus-models-store`, `nexus-deployments`, `nexus-provenance`. Observability stays as a module inside `nexus-core` (no dedicated crate). `nexus-backend-runtimes` retains runtime-adapter orchestration only.
- Q: What is the revision retention policy in v1? → A: Keep all revisions indefinitely; no automatic pruning; a revision referenced by any `runs` row (via `deployment_run_links` or `runs.deployment_revision_id`) MUST NOT be deletable. Pruning/compaction is a future feature and out of scope here.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Save current working state as a named Deployment without mutating source assets (Priority: P1)

A user is customizing a workflow derived from an extension-provided recipe (e.g., a `chatllm` chat flow). They change the prompt, seed, model selection, backend family, and one exposed parameter. Rather than overwriting the recipe/workflow, they ask the host to capture the full working state — source lineage, runtime binding, model binding, parameter overlays — as a persisted, reloadable Deployment (revision 1). The original recipe and workflow are never mutated.

**Why this priority**: Without this, users are forced to mutate canonical templates (dangerous) or keep state in memory (fragile). This user story is the **core product value** of the feature.

**Independent Test**: Given a workflow+recipe in the host DB and a dirty editor session, invoke the save operation; verify a new `deployments` row + `deployment_revisions` row + referenced bindings/parameters are persisted, the canonical source rows are byte-identical before and after, and the `effective_workflow_hash` is computed deterministically.

**Acceptance Scenarios**:

1. **Given** a loaded extension recipe with dirty parameter + model selection changes, **When** the host receives a save-deployment request, **Then** a deployment (with revision 1 in `save_mode=create`) is persisted containing source lineage, runtime binding, model binding, and normalized per-scope parameter overlays, and both `source_workflow` and `source_recipe` rows remain unchanged.
2. **Given** an existing deployment, **When** the user issues save-new-revision, **Then** a new `deployment_revisions` row with monotonically increasing `revision_number` is appended and `deployments.current_revision_id` is advanced atomically.
3. **Given** a save request made from a graph view that diverges from recipe assumptions, **When** the deployment is saved, **Then** `mapping_state` is recorded as `custom` and a change summary documents which recipe bindings were broken.

---

### User Story 2 — Reload a saved Deployment and restore an executable session (Priority: P1)

A user returns next day, picks a Deployment from the list, and asks the host to load it. The host resolves base source availability, runtime install, model locator, and extension presence; chooses an appropriate restore mode (`exact`, `rebase`, `degraded`, `read_only`); emits diagnostics before execution; and materializes a working editor session equivalent to the one they saved.

**Why this priority**: A save feature is worthless if restore is unreliable. This is the second half of the MVP.

**Independent Test**: Persist a deployment (Story 1), kill the host process, restart, call the load endpoint, and verify the returned session reproduces the saved canonical workflow hash, reports honest diagnostics, and does not mutate any source asset.

**Acceptance Scenarios**:

1. **Given** a fully restorable deployment with all dependencies present, **When** load is invoked, **Then** the host returns `restore_state=fully_restorable`, replays the snapshot, and the recomputed `effective_workflow_hash` matches the stored one.
2. **Given** a deployment whose referenced extension is disabled, **When** load is invoked, **Then** the host returns `restore_state=restorable_read_only` (or `restorable_with_degraded_features`), refuses to auto-install the extension, and emits `restore diagnostics` with category `extension` and a specific code.
3. **Given** a deployment whose model locator no longer exists on disk, **When** load is invoked, **Then** the host returns a non-silent degraded state and the deployment is NOT deleted or rewritten.

---

### User Story 3 — Run a Deployment and record the execution context hash against the run (Priority: P1)

After loading (Story 2) or directly from the list, a user executes a Deployment. The host revalidates runtime/model/operator availability, computes an `execution_context_hash`, creates a `run` linked via `deployment_run_links` to the specific `deployment_revision_id`, and executes through the normal host planning/scheduling pipeline. Run telemetry later attributes success/failure counts back to the deployment.

**Why this priority**: Deployments that cannot be executed are just metadata. Runs-per-revision traceability is also the foundation of reproducibility.

**Independent Test**: Execute a deployment; verify a `runs` row is created with `deployment_id`, `deployment_revision_id`, and `execution_context_hash` populated; verify `deployments.last_run_id`, `last_successful_run_id` (or `last_failed_run_id`), and `run_count` are updated on terminal state.

**Acceptance Scenarios**:

1. **Given** a ready deployment, **When** execute is invoked, **Then** a run is created and linked with `link_kind=executed_from`, and the run hash is derived from the effective workflow + overlays + runtime + model bindings.
2. **Given** a deployment whose runtime install disappeared since save, **When** execute is invoked, **Then** the host refuses to run, returns a blocking diagnostic, and does NOT silently fall back to a different backend family.

---

### User Story 4 — Multiple deployment instances of the same extension that differ only by settings (Priority: P1)

Users commonly want several concurrent deployments of the same extension-provided recipe with different runtime/model/parameter settings (e.g., one chat deployment on `llama.cpp` with a Q4 GGUF and 40 GPU layers, another on the same extension but `tensorrt-llm` with a different model). Each deployment must be independently addressable, independently restorable, independently runnable, and must clearly carry its own settings snapshot without sharing mutable state.

**Why this priority**: This is explicitly requested in the feature input and is the main differentiator from "preset". A single-instance model would block the most common real use case.

**Independent Test**: Create two deployments from the same `(extension, recipe, workflow)` triple with different runtime/model bindings; verify they have distinct ids, independent revisions, non-overlapping `effective_workflow_hash` values, and that loading one never mutates the other.

**Acceptance Scenarios**:

1. **Given** an extension recipe, **When** two save operations are performed with different runtime/model bindings, **Then** two independent `deployments` rows exist with separate lineage and separate bindings, both pointing to the same `source_extension_id`.
2. **Given** two deployments sharing source lineage, **When** one is archived or deleted, **Then** the other's `state` and `restore_state` are unaffected.

---

### User Story 5 — Backend-runtimes crate split into focused crates (Priority: P1)

The current `nexus-backend-runtimes` crate handles too many concerns (runtime adapters, models-store, logging plumbing, quantization, leases, resolver, provenance, etc.). As part of this feature, the codebase MUST be reorganized so that each bounded responsibility lives in its own crate, backend-runtimes depends only on the crates it actually needs, and downstream consumers (`nexus-api`, `nexus-extension`) can depend on the narrower crate they require.

**Why this priority**: Deployments introduce new bindings and new SQL surfaces. Piling more responsibilities on top of today's monolithic crate would make the build slower, the blast radius larger, and the ownership boundaries even harder to enforce. The split is a precondition for landing Deployments cleanly, and is explicitly requested by the user.

**Independent Test**: After split, `cargo tree -p nexus-backend-runtimes` shows no dependency on models-store internals, logging infrastructure, or deployment persistence; each extracted crate has its own `Cargo.toml`, its own unit tests, and builds independently; `cargo test -p <extracted-crate>` passes without pulling in runtime adapters.

**Acceptance Scenarios**:

1. **Given** the current monolithic crate, **When** the split is complete, **Then** three new crates exist — `nexus-models-store`, `nexus-deployments`, `nexus-provenance` — and `nexus-backend-runtimes` retains only runtime-adapter orchestration and its public traits. Observability lives as a module inside `nexus-core` (no dedicated crate).
2. **Given** the split workspace, **When** a consumer imports a single concern (e.g., model store), **Then** it does not transitively pull runtime-adapter code or deployment persistence code.
3. **Given** existing SQLite migrations, **When** the split is complete, **Then** the migration set still applies cleanly end-to-end and no migration file is orphaned between crates.

---

### User Story 6 — DB represents the recipe ↔ workflow ↔ extension graph that Deployments reference (Priority: P1)

For Deployments to carry honest provenance, the host DB MUST explicitly represent where workflows and recipes come from, which extension (and version) contributed them, and what their current availability state is. Today these linkages are implicit or missing. This story covers the schema extensions to `workflows`, `recipes`, runtime-install/settings tables, and `runs` so Deployments can reference them reliably.

**Why this priority**: Without these columns, Deployments cannot answer "where did this come from?" or "is this source still present?" — which is the core value proposition (§7 INV-06).

**Independent Test**: Inspect schema after migration; verify that `workflows` and `recipes` carry `source_kind`, `source_extension_id`, `source_template_ref`, `availability_state`, and that `runs` carry `deployment_id`, `deployment_revision_id`, `execution_context_hash`. Verify foreign-key-style referential integrity via insert/delete tests (logical FKs on SQLite where required).

**Acceptance Scenarios**:

1. **Given** a recipe contributed by an extension, **When** the extension is uninstalled, **Then** the recipe row's `availability_state` transitions to `unavailable` and deployments that depend on it transition to `degraded`/`stale` rather than being deleted.
2. **Given** two recipes with the same logical name from different extensions, **When** a deployment is saved, **Then** `deployment_source_links.source_extension_id` + `source_id` disambiguate unambiguously.

---

### User Story 7 — List, filter, archive, favorite, clone, export, import, validate (Priority: P2)

Management surface on top of the core save/load/run flows: list with filters (state, restore state, backend family, model format, source recipe/workflow, archived/favorite, tags), patch metadata (name/description/tags/archive/favorite), validate on demand, clone, export (no raw secrets, no binaries by default), and import (lands as `degraded`/`stale` if assets missing; NEVER auto-installs extensions or runtimes).

**Why this priority**: Needed for real-world use but depends on Stories 1–3 and 5–6. Not on the MVP critical path.

**Independent Test**: For each operation, exercise API-level contract tests that verify behavior, side effects, and invariants (especially "import does not auto-install dependencies").

**Acceptance Scenarios**:

1. **Given** an exported deployment package, **When** import is called on a host missing the required extension, **Then** the deployment is created in state `stale` or `degraded` with clear diagnostics, and no extension is installed silently.
2. **Given** a validate request, **When** dependencies are resolved, **Then** a `deployment_validations` row is written with severity-bucketed `deployment_restore_diagnostics` rows and counters.

---

### Edge Cases

- **Base recipe mutated upstream**: the pinned `base_recipe_version_ref` no longer matches current recipe hash — restore must not silently rebase; must surface a `recipe_mapping` diagnostic and offer `rebased` vs `exact snapshot` path.
- **Extension uninstalled then reinstalled at different version**: availability must recompute; `compatibility_state` per dimension (`host`, `workflow_schema`, `recipe`, `extension`, `operator`, `runtime_settings`, `profile`, `model`) stored on the revision must drive behavior.
- **Model file path moved**: missing-model must be surfaced, never guessed. Auto-substitution by capability class is explicitly forbidden by §12.2/§12.3.
- **Concurrent save from two sessions on the same deployment**: save-new-revision is append-only; race resolves deterministically by `revision_number` uniqueness.
- **Import package contains paths outside allowed workspace roots**: paths are treated as untrusted; loader validates before acceptance (§SI-04).
- **Encrypted/secret fields in overlay**: never serialized as raw values; only secret handles/ids are allowed (§8.12).
- **Very large resolved workflow snapshots**: stored in `deployment_snapshots.payload_json` with hash; future optimization path (msgpack, content-addressed storage) must not break existing rows.
- **Run attribution when revision is deleted**: revisions are append-only and are retained indefinitely in v1; any revision referenced by a run is undeletable by API and returns a blocking diagnostic on delete attempts.
- **Deployments referencing a workflow that was converted to a different `source_kind`**: `availability_state` must reflect the current kind, not the captured one.

---

## Requirements *(mandatory)*

### Functional Requirements — Deployment domain

- **FR-001**: The host MUST persist a `deployment` entity with identity/ownership fields (`id`, `workspace_id`, `slug`, `display_name`, `state`, `restore_state`, archived/favorite flags, `created_from_surface`, timestamps, run aggregates). `workspace_id` is `TEXT NULL` with no enforced foreign key and no companion `workspaces` table in this increment — it is a forward-compatibility slot only; all v1 deployments write `NULL` unless an explicit value is supplied.
- **FR-002**: Each deployment MUST have at least one `deployment_revision` with a monotonically increasing `revision_number`, an `effective_workflow_hash`, a recorded `save_mode` (`create`, `update`, `save_as_version`, `auto_draft`), and a recorded `mapping_state` (`fully_mapped` | `partially_mapped` | `custom`).
- **FR-003**: Revisions MUST be append-only. Mutation of an existing revision row is forbidden; corrections happen by creating a new revision. All revisions are retained indefinitely in v1 — no automatic pruning, no per-deployment cap. A revision referenced by any run (via `deployment_run_links` or `runs.deployment_revision_id`) MUST NOT be deletable under any API; a delete attempt MUST return a blocking diagnostic. Pruning/compaction is explicitly out of scope for this increment.
- **FR-004**: Each revision MUST persist source lineage via `deployment_source_links` (source kind, source id, version, extension id, template ref, availability state, `is_primary_source`).
- **FR-005**: Each revision MUST support storing at least one of: a materialized workflow snapshot (`deployment_snapshots` with `snapshot_kind=workflow_resolved`) or a normalized `workflow_patch_json`. Hybrid (both) MUST be the recommended default.
- **FR-006**: Parameter overlays MUST be stored normalized in `deployment_parameters`, keyed by `(scope, binding_target, logical_key)`, with scopes at minimum: `workflow_input`, `node_config`, `runtime`, `model_load`, `request`, `ui_state`, `execution_policy`.
- **FR-007**: Runtime/backend selections MUST be stored in `deployment_runtime_bindings` referencing profile / runtime-adapter / runtime-install / runtime-settings ids and a `compatibility_state`.
- **FR-008**: Model selections MUST be stored in `deployment_model_bindings` with source kind, locator, format, hash, size, quantization, capability class, load parameters, and a compatibility snapshot.
- **FR-009**: Artifact references MUST be stored in `deployment_artifact_bindings` distinguishing `input` / `reference` / `preview` / `thumbnail` / `preferred_output_dir` and whether pinned.
- **FR-010**: Validation results MUST be stored in `deployment_validations` with a `overall_state`, `restore_state`, counters for missing deps / warnings / errors, plus normalized per-diagnostic rows in `deployment_restore_diagnostics` (severity × category × code, with subject ref and resolution hint).
- **FR-011**: `deployment_run_links` MUST connect a run to a specific deployment revision with `link_kind` (`executed_from` | `resumed_from` | `created_from_run`).
- **FR-012**: `deployment_tags` MUST provide many-to-many tagging.

### Functional Requirements — Save / Load / Execute semantics

- **FR-013**: Save MUST be transactional: either the full revision + all child rows (snapshots, source links, parameters, bindings, artifacts) are persisted atomically, or none are.
- **FR-014**: Save MUST NOT mutate the base workflow, base recipe, extension-provided templates, runtime-install rows, or runtime-settings rows.
- **FR-015**: Load MUST resolve source availability, extension/operator presence, runtime availability, model locator, and artifact references before returning a session. The decision among `exact`, `rebased`, `degraded`, `read_only` MUST be explicit and returned to the caller.
- **FR-016**: Load MUST NOT auto-install missing extensions or runtimes. Missing dependencies MUST produce diagnostics, not silent substitutions.
- **FR-017**: Execute MUST compute an `execution_context_hash` from the effective workflow snapshot, parameter overlays, runtime binding, and model binding, and MUST persist it on the resulting run row.
- **FR-018**: Execute MUST refuse to run a deployment whose `restore_state ∈ {restorable_read_only, not_restorable}`, and MUST refuse silent backend-family substitution (§12.3 "High risk").
- **FR-019**: Clone MUST copy metadata + latest revision into a new deployment with a new id and revision_number=1, recording lineage to the source deployment in `deployment_source_links` (or an equivalent field) for traceability.

### Functional Requirements — Compatibility & diagnostics

- **FR-020**: Each revision MUST record compatibility state for at least these dimensions: host/schema, workflow schema, recipe definition, extension, operator contract, runtime-settings schema, profile, model descriptor. Allowed values per dimension: `exact | compatible | migrated | degraded | incompatible | missing`.
- **FR-021**: Diagnostics MUST use the taxonomy in §27: categories `source | recipe_mapping | operator | extension | runtime | model | artifact | profile | security | migration`, severities `info | warning | error | blocking`.
- **FR-022**: Host-controlled migrations MUST be versioned and auditable; when a migration alters deployment semantics, it MUST preserve the original snapshot payload where technically possible and record before/after compatibility state.

### Functional Requirements — DB integration with existing tables

- **FR-023**: The `workflows` table MUST gain `source_kind`, `source_extension_id`, `source_template_ref`, `availability_state`, `canonical_hash`, and (where user clones become first-class) `parent_workflow_id`.
- **FR-024**: The `recipes` table MUST gain `source_kind`, `source_extension_id`, `source_template_ref`, `availability_state`, `mapping_contract_json`.
- **FR-025**: Existing runtime-install / runtime-settings tables MUST expose stable ids referenced by `deployment_runtime_bindings`, including schema version and health/compatibility state fields.
- **FR-026**: The `runs` table MUST gain `deployment_id`, `deployment_revision_id`, and `execution_context_hash` (all nullable for legacy runs).

### Functional Requirements — Multi-instance deployments of one extension

- **FR-027**: A single extension MAY be the source of an unbounded number of concurrent deployments. The host MUST NOT couple deployment identity to extension identity.
- **FR-028**: Per-deployment runtime-settings, parameter overlays, runtime/model bindings MUST be isolated; no two deployments may share mutable state.
- **FR-029**: Disabling or uninstalling the source extension MUST transition affected deployments to `degraded`/`stale` without deletion.

### Functional Requirements — Security & integrity

- **SI-01**: Deployments MUST NOT contain executable code. Snapshots are metadata + references only.
- **SI-02**: Imported deployments MUST be schema-validated before acceptance.
- **SI-03**: Import MUST NOT auto-install missing extensions or runtimes.
- **SI-04**: Paths in deployments MUST be validated against the local workspace/allow-list before use.
- **SI-05**: Exported packages MUST NOT embed raw secrets by default. Only secret handles/ids are permissible (§8.12).
- **SI-06**: Migrations MUST be versioned and auditable.
- **SI-07**: Hashes MUST be stored for at least: effective workflow snapshot, parameter overlay payload, runtime binding payload, model binding payload (§20.3). All deployment-scoped hashes — `effective_workflow_hash`, `deployment_snapshots.payload_hash`, and the parameter/runtime/model binding payload hashes — MUST be computed as **SHA-256 over RFC 8785 JCS** (JSON Canonicalization Scheme) of the normalized payload. Any future algorithm change is a versioned migration under SI-06.

### Functional Requirements — API surface (backend-only, UI comes later)

- **FR-030**: The host MUST expose the endpoints enumerated in §21: `POST /api/v1/deployments`, `GET /api/v1/deployments`, `GET /api/v1/deployments/{id}`, `GET /api/v1/deployments/{id}/revisions/{revisionId}`, `PATCH /api/v1/deployments/{id}`, `POST /api/v1/deployments/{id}/revisions`, `POST /api/v1/deployments/{id}/validate`, `POST /api/v1/deployments/{id}/load`, `POST /api/v1/deployments/{id}/runs`, `POST /api/v1/deployments/{id}/clone`, `POST /api/v1/deployments/{id}/export`, `POST /api/v1/deployments/import`.
- **FR-031**: List MUST support filtering by workspace, tags, state, restore state, backend family, model format, source recipe/workflow, archived, favorite.
- **FR-032**: GET detail MUST return current-revision summary, compatibility summary, dirty-change summary, model/runtime context summary, and recent run history.

### Functional Requirements — Event model

- **FR-033**: The host MUST emit at minimum the events in §24: `deployment.created`, `deployment.updated`, `deployment.revision.created`, `deployment.validated`, `deployment.loaded`, `deployment.restore.degraded`, `deployment.archived`, `deployment.deleted`, `deployment.run.created`, `deployment.compatibility.changed`.

### Functional Requirements — Crate split

- **FR-034**: `nexus-backend-runtimes` MUST be split into the following bounded crates:
  - **`nexus-models-store`** — owns `models_store/{download, install, blobs, dedup, leases, quantization, resolver, verify, layout, errors}` plus the `checksum` helper (or re-exports from a shared utility).
  - **`nexus-deployments`** — owns all deployment domain logic introduced by this feature: save/load/execute orchestration, revision + snapshot + source-link + parameter + binding + validation + diagnostic entities, compatibility classification, and hashing (using the SHA-256/JCS rule in SI-07).
  - **`nexus-provenance`** — owns license resolution, HF metadata probing, and related provenance/licensing helpers introduced in the recent R3 work.
  - **`nexus-backend-runtimes`** retains **only** runtime-adapter orchestration and its public traits.
  Observability is **not** a new crate; it stays as a module under `nexus-core` consumed by all the above.
- **FR-035**: After the split, no extracted crate may depend on `nexus-backend-runtimes`; dependency arrows point from backend-runtimes (and `nexus-api`, `nexus-extension`) down to the extracted crates, never up.
- **FR-036**: Public surfaces used today by `nexus-api`, `nexus-extension`, and tests MUST remain functionally equivalent through the split. Import paths may change; behavior must not.
- **FR-037**: All SQL migrations — existing ones and every new table introduced by this feature (deployments and its children) — MUST remain centralized in `nexus-storage` (`crates/nexus-storage/src/sqlite/migrations.rs` and the accompanying `queries/` tree). Extracted crates (`nexus-deployments`, `nexus-models-store`, and any others) MUST depend on `nexus-storage` for DB access and contribute only query/mapper code; they MUST NOT carry their own migration directories. The migration numbering sequence stays monotonic across the whole workspace.

### Key Entities

- **Deployment**: top-level named, persisted working state; owns many revisions; has lifecycle state (`draft | saved | validated | ready | degraded | stale | archived | deleted`) and restore state (`fully_restorable | restorable_with_rebase | restorable_with_degraded_features | restorable_read_only | not_restorable`).
- **DeploymentRevision**: append-only immutable snapshot of a specific working state; carries base refs, mapping state, `effective_workflow_hash`, UI-restore/execution-policy/compatibility/change summary JSON.
- **DeploymentSnapshot**: materialized blob (resolved workflow, recipe projection, parameter overlay, UI state) with payload hash.
- **DeploymentSourceLink**: provenance edge from a revision to a source asset (workflow / recipe / extension template / imported workflow / user workflow), with availability state at capture time.
- **DeploymentParameter**: one normalized parameter record scoped by `(scope, binding_target, logical_key)` with value, default, user-modified flag, validation state.
- **DeploymentRuntimeBinding**: selected profile / runtime adapter / install / settings / backend family + capability snapshot + compatibility state.
- **DeploymentModelBinding**: selected model (locator, format, hash, quantization, capability class, load parameters) + compatibility snapshot.
- **DeploymentArtifactBinding**: input/reference/preview/thumbnail/output-dir artifact references.
- **DeploymentValidation + DeploymentRestoreDiagnostic**: last-known validation snapshot and its per-item diagnostics (severity × category × code).
- **DeploymentRunLink**: connects a deployment revision to an actual run (`executed_from | resumed_from | created_from_run`).
- **DeploymentTag**: many-to-many tags.
- **Workflow / Recipe (extended)**: gain source-kind, extension linkage, availability, canonical hash, and (for recipes) a mapping contract.
- **Run (extended)**: gains `deployment_id`, `deployment_revision_id`, `execution_context_hash`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After saving a deployment from a dirty recipe-derived session, the canonical source workflow and recipe rows are byte-identical before and after 100% of the time (automated regression test, per §30.4).
- **SC-002**: Save → kill process → restart → load round-trip preserves the `effective_workflow_hash` and parameter-overlay payload hash in 100% of passing test cases, verified by recomputing SHA-256 over RFC 8785 JCS of the normalized payloads and comparing byte-for-byte against stored values.
- **SC-003**: Loading a deployment whose extension is disabled never auto-installs the extension and always produces at least one diagnostic in category `extension` with severity `warning` or higher.
- **SC-004**: Two deployments created from the same extension/recipe with different runtime and model bindings have distinct `effective_workflow_hash` values and independent lifecycle state transitions (archive one does not change the other).
- **SC-005**: After the split, `cargo tree -p nexus-backend-runtimes` lists none of `nexus-models-store`, `nexus-deployments`, or `nexus-provenance` as a dependency (verified by a workspace-level test or script that fails the build if any of those forbidden edges appear).
- **SC-006**: After the split, `cargo check --workspace` and `cargo test --workspace` both succeed on a clean machine; no extracted crate transitively depends on `nexus-backend-runtimes`.
- **SC-007**: Execute-a-deployment creates exactly one `runs` row with `deployment_id`, `deployment_revision_id`, and `execution_context_hash` populated; 100% of runs initiated via the deployment endpoint carry those fields.
- **SC-008**: Importing a deployment package on a host missing the required extension lands the deployment in `degraded` or `stale` state 100% of the time and never creates an extension install, a runtime install, or a runtime-settings record.
- **SC-009**: No raw secret value is ever present in an exported deployment package (static scan of export output finds zero matches against a secret-pattern list).
- **SC-010**: For every diagnostic surfaced to the caller, the stored record carries a non-empty `(severity, category, code, message)` tuple — verified over a corpus of failure tests covering missing base recipe, missing extension, missing runtime install, missing model path, incompatible operator version, incompatible host schema version, and invalid import package (per §30.3).

---

## Assumptions

- SQLite remains the host metadata store; the migration set in `crates/nexus-storage/src/sqlite/migrations.rs` is the single authoritative source of schema for the whole workspace (see Clarification Q1).
- No `workspaces` table is introduced in this increment; `workspace_id` is carried as a nullable forward-compat slot only (see Clarification Q2).
- Existing host concepts (`workflow`, `recipe`, `run`, `profile`, `runtime_install`, `runtime_settings`, `artifact`) already exist in some form or will be extended as described in FR-023..FR-026; new columns are additive and backward-compatible.
- The UI is out of scope for this feature. Only the backend (DB schema, Rust crates, HTTP API, events) is delivered in this increment.
- "Each extension is a module (instance)" is interpreted as: the *extension package* is the module; a *deployment* is an instance configured from that module's recipe/workflow; multiple deployment instances of the same extension with different settings are a supported first-class case (see User Story 4 + FR-027..FR-029).
- Large binary artifacts (model files, datasets) are NOT stored inside deployment rows — only references/locators — consistent with §20.1.
- Versioned snapshot format begins with canonical normalized JSON (§20.2); msgpack / content-addressed storage is a non-breaking future optimization.
- The crate split (User Story 5) is in-scope for this feature because Deployments introduce new persistence surfaces that would compound the current monolith's debt. Final crate names and boundaries are deferred to `/speckit.plan`.
- Run-attribution back-fill for pre-existing `runs` rows is out of scope; new columns are nullable, legacy runs remain unlinked.
- Auto-draft deployments (§10.4) are supported in the schema (`save_mode=auto_draft`) but the host need not write them automatically in this increment; they are reserved for a future autosave feature and MUST remain distinct from user-approved deployments.
- Export/import package format details (manifest layout, envelope signing) are decided in `/speckit.plan`; this spec constrains only the invariants (no secrets, no binaries by default, schema-validated on import).
