# Phase 1 — Data Model: Deployments

**Feature**: 018-deployments | **Date**: 2026-04-15
**Authoritative SQL**: `crates/nexus-storage/migrations/011_deployments.sql` (generated in `/speckit.implement`).
**Hash rule**: SHA-256 over RFC 8785 JCS for every hash column below.

This document defines the logical entities, their fields, relationships, state transitions, and invariants. It is the source of truth the migration file and the Rust types in `nexus-deployments` must mirror.

---

## 1. New tables

### 1.1 `deployments`

Top-level deployment record. Owns many revisions.

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. `DeploymentId` newtype; opaque UUIDv7 string. |
| `workspace_id` | TEXT | NULL | Forward-compat slot (Clarification Q2). No FK. |
| `slug` | TEXT | NOT NULL | URL-safe. Unique per `(workspace_id, slug)` — SQLite treats NULLs as distinct, which is the desired v1 behavior. |
| `display_name` | TEXT | NOT NULL | |
| `description` | TEXT | NULL | |
| `state` | TEXT | NOT NULL | lifecycle enum (§3.1). |
| `restore_state` | TEXT | NOT NULL | restore enum (§3.2). |
| `is_archived` | INTEGER | NOT NULL DEFAULT 0 | boolean 0/1. |
| `is_favorite` | INTEGER | NOT NULL DEFAULT 0 | boolean 0/1. |
| `created_at` | TEXT | NOT NULL | ISO-8601 UTC. |
| `updated_at` | TEXT | NOT NULL | ISO-8601 UTC. |
| `created_from_surface` | TEXT | NOT NULL | `recipe_view` | `graph_view` | `stage_view` | `chat_view` | `api`. |
| `current_revision_id` | TEXT | NULL | references `deployment_revisions.id`. NULL only mid-save before first revision commits. |
| `last_validation_id` | TEXT | NULL | references `deployment_validations.id`. |
| `last_run_id` | TEXT | NULL | references `runs.id`. |
| `last_successful_run_id` | TEXT | NULL | references `runs.id`. |
| `last_failed_run_id` | TEXT | NULL | references `runs.id`. |
| `run_count` | INTEGER | NOT NULL DEFAULT 0 | |
| `notes_markdown` | TEXT | NULL | |

Indexes:
- `UNIQUE (workspace_id, slug)`
- `(workspace_id, updated_at DESC)`
- `(state, restore_state)`

Invariants:
- `current_revision_id` either NULL (pre-first-save, transient) or points at a row whose `deployment_id = this.id`.
- `run_count` equals the COUNT of `deployment_run_links` rows with matching `deployment_id` (maintained by repository).

---

### 1.2 `deployment_revisions` (APPEND-ONLY)

Immutable snapshot of a specific working state.

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. `DeploymentRevisionId`. |
| `deployment_id` | TEXT | NOT NULL | references `deployments.id`. |
| `revision_number` | INTEGER | NOT NULL | monotonic per deployment starting at 1. |
| `save_mode` | TEXT | NOT NULL | `create` | `update` | `save_as_version` | `auto_draft`. |
| `created_at` | TEXT | NOT NULL | |
| `created_by_action` | TEXT | NOT NULL | free-form audit label. |
| `base_workflow_ref` | TEXT | NULL | `workflows.id`. |
| `base_workflow_version_ref` | TEXT | NULL | workflow version/hash. |
| `base_recipe_ref` | TEXT | NULL | `recipes.id`. |
| `base_recipe_version_ref` | TEXT | NULL | recipe version/hash. |
| `base_extension_ref` | TEXT | NULL | `extensions.id` of the source extension. |
| `mapping_state` | TEXT | NOT NULL | `fully_mapped` | `partially_mapped` | `custom`. |
| `workflow_snapshot_id` | TEXT | NULL | references `deployment_snapshots.id` (the `workflow_resolved` snapshot). |
| `workflow_patch_json` | TEXT | NULL | optional JSON-patch against base workflow. |
| `effective_workflow_hash` | TEXT | NOT NULL | SHA-256 / JCS over the resolved workflow JSON. |
| `ui_restore_json` | TEXT | NULL | optional UI restoration state (§8.11). |
| `execution_policy_json` | TEXT | NULL | §8.9. |
| `compatibility_summary_json` | TEXT | NULL | per-dimension classification snapshot (§3.4). |
| `change_summary_json` | TEXT | NULL | delta vs source (§8.5). |

Constraints:
- `UNIQUE (deployment_id, revision_number)`
- No UPDATE/DELETE allowed by API. Repository enforces via DENY-on-conflict and an explicit `delete_revision()` method that returns a blocking diagnostic when any `deployment_run_links` row references the revision.

---

### 1.3 `deployment_snapshots`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `snapshot_kind` | TEXT | NOT NULL | `workflow_resolved` | `recipe_projection` | `parameter_overlay` | `ui_state`. |
| `payload_format` | TEXT | NOT NULL | `json` now; `json_patch` / `msgpack` reserved. |
| `payload_json` | TEXT | NOT NULL | canonical JCS-normalized text. |
| `payload_hash` | TEXT | NOT NULL | SHA-256 / JCS. |
| `created_at` | TEXT | NOT NULL | |

Index: `(deployment_revision_id, snapshot_kind)`.

---

### 1.4 `deployment_source_links`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `source_kind` | TEXT | NOT NULL | `workflow` | `recipe` | `extension_recipe` | `user_workflow` | `imported_workflow` | `cloned_deployment`. |
| `source_id` | TEXT | NULL | id in the respective table. |
| `source_version_id` | TEXT | NULL | |
| `source_extension_id` | TEXT | NULL | |
| `source_template_ref` | TEXT | NULL | |
| `source_availability_state` | TEXT | NOT NULL | `available` | `unavailable` | `version_mismatch` | `missing_extension` at capture. |
| `is_primary_source` | INTEGER | NOT NULL DEFAULT 0 | |

Index: `(deployment_revision_id)`, `(source_kind, source_id)`.

---

### 1.5 `deployment_parameters`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `scope` | TEXT | NOT NULL | `workflow_input` | `node_config` | `runtime` | `model_load` | `request` | `ui_state` | `execution_policy`. |
| `binding_target` | TEXT | NOT NULL | dotted path (e.g. `node:chat_generate_1.config`). |
| `logical_key` | TEXT | NOT NULL | |
| `data_type` | TEXT | NOT NULL | `string` | `integer` | `number` | `boolean` | `json` | `enum`. |
| `value_json` | TEXT | NOT NULL | canonical JCS JSON scalar or object. |
| `default_value_json` | TEXT | NULL | |
| `is_user_modified` | INTEGER | NOT NULL DEFAULT 1 | |
| `is_recipe_exposed` | INTEGER | NOT NULL DEFAULT 0 | |
| `is_runtime_exposed` | INTEGER | NOT NULL DEFAULT 0 | |
| `validation_state` | TEXT | NOT NULL | `ok` | `warning` | `error`. |
| `validation_message` | TEXT | NULL | |

Indexes: `(deployment_revision_id, scope)`, `(deployment_revision_id, binding_target)`.
Uniqueness: `(deployment_revision_id, scope, binding_target, logical_key)`.

---

### 1.6 `deployment_runtime_bindings`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `profile_id` | TEXT | NULL | |
| `runtime_adapter_id` | TEXT | NULL | |
| `runtime_install_id` | TEXT | NULL | references `runtime_installs.id`. |
| `runtime_settings_id` | TEXT | NULL | references `runtime_settings.id`. |
| `backend_family` | TEXT | NULL | `llama.cpp` | `tensorrt-llm` | … (free-form; validated by runtime registry). |
| `backend_display_name` | TEXT | NULL | |
| `compatibility_state` | TEXT | NOT NULL | `exact` | `compatible` | `migrated` | `degraded` | `incompatible` | `missing`. |
| `capability_snapshot_json` | TEXT | NULL | |
| `selection_reason` | TEXT | NULL | |

Index: `(deployment_revision_id)`, `(runtime_install_id)`.

---

### 1.7 `deployment_model_bindings`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `model_record_id` | TEXT | NULL | references `host_models.id` when locally managed. |
| `model_source_kind` | TEXT | NOT NULL | `local_file` | `huggingface` | `extension_asset` | `workspace_asset`. |
| `model_locator` | TEXT | NULL | path, HF repo+file, or asset id. |
| `model_format` | TEXT | NULL | `gguf` | `safetensors` | …. |
| `model_hash` | TEXT | NULL | SHA-256 of the file (matches existing `host_models` hash). |
| `model_size_bytes` | INTEGER | NULL | |
| `quantization` | TEXT | NULL | `Q4_K_M` etc. |
| `capability_class` | TEXT | NULL | `chat` | `embedding` | `reranker` | `diffusion` | …. |
| `compatibility_snapshot_json` | TEXT | NULL | |
| `load_parameters_json` | TEXT | NULL | JCS-canonical. |

Index: `(deployment_revision_id)`, `(model_record_id)`.

---

### 1.8 `deployment_artifact_bindings`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `usage_kind` | TEXT | NOT NULL | `input` | `reference` | `preview` | `thumbnail` | `preferred_output_dir`. |
| `binding_target` | TEXT | NULL | |
| `artifact_id` | TEXT | NULL | references `artifacts.id`. |
| `artifact_ref` | TEXT | NULL | external ref (URL, workspace path). |
| `is_pinned` | INTEGER | NOT NULL DEFAULT 1 | |

Index: `(deployment_revision_id, usage_kind)`.

---

### 1.9 `deployment_validations`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `validated_at` | TEXT | NOT NULL | |
| `overall_state` | TEXT | NOT NULL | `ok` | `warning` | `error` | `blocking`. |
| `restore_state` | TEXT | NOT NULL | restore enum (§3.2). |
| `diagnostics_json` | TEXT | NOT NULL | full payload (also normalized into `deployment_restore_diagnostics`). |
| `missing_dependencies_count` | INTEGER | NOT NULL DEFAULT 0 | |
| `warnings_count` | INTEGER | NOT NULL DEFAULT 0 | |
| `errors_count` | INTEGER | NOT NULL DEFAULT 0 | |

Index: `(deployment_revision_id, validated_at DESC)`.

---

### 1.10 `deployment_restore_diagnostics`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_validation_id` | TEXT | NOT NULL | |
| `severity` | TEXT | NOT NULL | `info` | `warning` | `error` | `blocking`. |
| `category` | TEXT | NOT NULL | `source` | `recipe_mapping` | `operator` | `extension` | `runtime` | `model` | `artifact` | `profile` | `security` | `migration`. |
| `code` | TEXT | NOT NULL | stable machine-readable code (e.g. `model.locator_missing`). |
| `message` | TEXT | NOT NULL | human-readable. |
| `subject_ref` | TEXT | NULL | e.g. `node:model_loader_1.config`. |
| `resolution_hint` | TEXT | NULL | |

Index: `(deployment_validation_id)`, `(severity, category)`.

---

### 1.11 `deployment_run_links`

| Column | Type | Null | Notes |
|---|---|---|---|
| `id` | TEXT | NOT NULL | PK. |
| `deployment_id` | TEXT | NOT NULL | |
| `deployment_revision_id` | TEXT | NOT NULL | |
| `run_id` | TEXT | NOT NULL | references `runs.id`. |
| `link_kind` | TEXT | NOT NULL | `executed_from` | `resumed_from` | `created_from_run`. |
| `created_at` | TEXT | NOT NULL | |

Index: `(deployment_id)`, `(run_id)`.

---

### 1.12 `deployment_tags`

| Column | Type | Null | Notes |
|---|---|---|---|
| `deployment_id` | TEXT | NOT NULL | composite PK part. |
| `tag` | TEXT | NOT NULL | composite PK part. |

PK: `(deployment_id, tag)`.

---

## 2. Additive changes to existing tables

All additions are `ALTER TABLE … ADD COLUMN` — nullable, no default-value rewrites, idempotent via the existing migration runner.

### 2.1 `workflows` — FR-023
- `source_kind` TEXT NULL
- `source_extension_id` TEXT NULL
- `source_template_ref` TEXT NULL
- `availability_state` TEXT NULL
- `canonical_hash` TEXT NULL
- `parent_workflow_id` TEXT NULL

### 2.2 `recipes` — FR-024
- `source_kind` TEXT NULL
- `source_extension_id` TEXT NULL
- `source_template_ref` TEXT NULL
- `availability_state` TEXT NULL
- `mapping_contract_json` TEXT NULL

### 2.3 `runtime_installs` / `runtime_settings` — FR-025
If the existing tables already expose stable ids, schema_version, and a health/compatibility column (verified in `/speckit.implement`), no changes are required. Otherwise add:
- `schema_version` INTEGER NULL
- `health_state` TEXT NULL

### 2.4 `runs` — FR-026
- `deployment_id` TEXT NULL
- `deployment_revision_id` TEXT NULL
- `execution_context_hash` TEXT NULL

Index: `(deployment_id)`, `(deployment_revision_id)`.

---

## 3. Enumerations

### 3.1 Deployment lifecycle state

```
draft → saved → validated → ready → {degraded | stale} → archived → deleted
                                                      ↑      ↑
                                      (re-validation brings ready back in)
```

Allowed states: `draft` | `saved` | `validated` | `ready` | `degraded` | `stale` | `archived` | `deleted`.

### 3.2 Restore state

`fully_restorable` | `restorable_with_rebase` | `restorable_with_degraded_features` | `restorable_read_only` | `not_restorable`.

### 3.3 Mapping state

`fully_mapped` | `partially_mapped` | `custom`.

### 3.4 Compatibility dimensions × states

Dimensions (stored inside `compatibility_summary_json` and per-binding `compatibility_state`):
- `host_schema`, `workflow_schema`, `recipe_definition`, `extension`, `operator_contract`, `runtime_settings`, `profile`, `model_descriptor`.

States per dimension: `exact` | `compatible` | `migrated` | `degraded` | `incompatible` | `missing`.

### 3.5 Diagnostic taxonomy (§1.10)

Severity: `info` | `warning` | `error` | `blocking`.
Category: `source` | `recipe_mapping` | `operator` | `extension` | `runtime` | `model` | `artifact` | `profile` | `security` | `migration`.

---

## 4. Cross-entity invariants

1. **Source-asset immutability during save/load** (INV-02, SC-001): no write path inside `nexus-deployments` ever updates rows in `workflows`, `recipes`, or any extension-owned source table.
2. **Revision append-only** (FR-003): `deployment_revisions` has no API-level UPDATE or DELETE path for rows referenced by `deployment_run_links`.
3. **Hash determinism** (SI-07, SC-002): every `*_hash` column is computed via the single helper `nexus_deployments::hash::sha256_jcs(value)` so tests can reproduce it.
4. **No silent substitution on load** (§12.3): load never rewrites `runtime_install_id`, `runtime_settings_id`, `model_record_id`, or any `backend_family` field to satisfy availability.
5. **Export/import asymmetry** (SI-03, SC-008): import creates deployment + revisions + snapshots only; it never writes `extensions`, `runtime_installs`, `runtime_settings`, or `host_models`.
6. **Run attribution** (FR-017): every row in `deployment_run_links` must point at a revision whose `deployment_id` matches the link's `deployment_id` and a run row whose `deployment_id`/`deployment_revision_id` fields match.
7. **Multi-instance isolation** (FR-027..FR-029): two deployments rooted in the same `source_extension_id` must have disjoint row sets across all twelve new tables; no shared rows.

---

## 5. Rust type mirrors (authoritative names)

| Domain concept | Rust type | Crate |
|---|---|---|
| Deployment id | `DeploymentId` (newtype over `String`) | `nexus-deployments::id` |
| Revision id | `DeploymentRevisionId` | `nexus-deployments::id` |
| Effective workflow hash | `EffectiveWorkflowHash` (newtype over `[u8; 32]`, hex-serialized) | `nexus-deployments::hash` |
| Snapshot payload hash | `PayloadHash` | `nexus-deployments::hash` |
| Lifecycle state | `DeploymentState` enum `#[non_exhaustive]` | `nexus-deployments::state` |
| Restore state | `RestoreState` enum `#[non_exhaustive]` | `nexus-deployments::state` |
| Mapping state | `MappingState` enum | `nexus-deployments::state` |
| Parameter scope | `ParameterScope` enum `#[non_exhaustive]` | `nexus-deployments::parameter` |
| Compatibility dimension/state | `CompatDim`, `CompatState` enums `#[non_exhaustive]` | `nexus-deployments::compatibility` |
| Diagnostic severity/category/code | `Severity`, `Category`, `DiagnosticCode` | `nexus-deployments::diagnostic` |
| Event enum | `DeploymentEvent` `#[non_exhaustive]` | `nexus-deployments::events` |
| Repository trait | `DeploymentRepository` | `nexus-deployments::repository` |
| Snapshot store trait | `DeploymentSnapshotStore` | `nexus-deployments::snapshot` |
| Errors | `DeploymentError` (thiserror) | `nexus-deployments::error` |
