# Phase 1 — Data Model: LLM Backends Runtime

**Feature**: 007-llm-backends-runtime
**Date**: 2026-04-14

This feature introduces runtime-scoped persistence and in-memory state. All SQLite tables are owned by the `local-llm` extension under the `ext_local_llm_` namespace (per spec 004).

---

## 1. Persistent entities (SQLite)

### 1.1 `ext_local_llm_runtime_installs`

A validated (or previously validated) local installation of a backend family.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `runtime_install_id` | TEXT PK | NOT NULL, `rtinst_<ULID>` | Stable identifier across host restarts |
| `backend` | TEXT | NOT NULL, one of (`llama.cpp`, `tensorrt_llm`) | Backend family |
| `release_id` | TEXT | NOT NULL | Upstream release tag (e.g., `b7472`) |
| `platform` | TEXT | NOT NULL, one of (`windows-x64`, `linux-x64`) | OS + arch |
| `accelerator_profile` | TEXT | NOT NULL, one of (`cpu`, `cuda12`, `cuda13`) | First-slice profiles |
| `source_url` | TEXT | NOT NULL | Asset URL the install was downloaded from |
| `checksum_sha256` | TEXT | NULLABLE | Present when the version manifest included one |
| `install_path` | TEXT | NOT NULL | Absolute path to `<runtime_dir>/package/` |
| `binary_path` | TEXT | NOT NULL | Absolute path to `llama-server(.exe)` |
| `status` | TEXT | NOT NULL, one of (`installed_unvalidated`, `ready`, `broken`, `updating`) | Last known persisted state |
| `installed_at` | INTEGER | NOT NULL | Unix ms |
| `validated_at` | INTEGER | NULLABLE | Unix ms; null until first successful validation |
| `last_failure_category` | TEXT | NULLABLE | Populated when `status = broken` |
| `created_at` | INTEGER | NOT NULL | Unix ms |
| `updated_at` | INTEGER | NOT NULL | Unix ms |

**Indexes**: `(backend, platform, accelerator_profile)`, `(status)`.

**Uniqueness**: `(backend, release_id, platform, accelerator_profile)` — only one install per exact profile/release combination.

### 1.2 `ext_local_llm_runtime_settings`

Persistent runtime defaults. One row per backend family (single active setting row per backend in the first slice).

| Column | Type | Constraints | Description |
|---|---|---|---|
| `runtime_settings_id` | TEXT PK | NOT NULL, `rts_<ULID>` | |
| `backend` | TEXT | NOT NULL, UNIQUE | Backend family |
| `install_ref` | TEXT | NULLABLE, FK → `runtime_installs.runtime_install_id` | Optional binding to a specific install |
| `threads` | INTEGER | NOT NULL, ≥ 1, ≤ 1024 | |
| `threads_batch` | INTEGER | NOT NULL, ≥ 1, ≤ 1024 | |
| `default_context` | INTEGER | NOT NULL, ≥ 128, ≤ 1048576 | |
| `parallel_requests` | INTEGER | NOT NULL, ≥ 1, ≤ 64 | |
| `bind_address` | TEXT | NOT NULL, default `127.0.0.1` | IP/hostname; `0.0.0.0` requires admin opt-in (future) |
| `port_mode` | TEXT | NOT NULL, one of (`auto`, `fixed`) | |
| `fixed_port` | INTEGER | NULLABLE, 1–65535, required iff `port_mode = fixed` | |
| `extra_args_json` | TEXT | NOT NULL, default `"[]"` | JSON array of strings |
| `created_at` | INTEGER | NOT NULL | |
| `updated_at` | INTEGER | NOT NULL | |

**Validation rules**:
- `port_mode = fixed` ⇒ `fixed_port IS NOT NULL`.
- `extra_args_json` must parse as a `string[]`.
- None of the extra-arg tokens may appear in the managed-flag deny list: `--host`, `--port`, `--threads`, `--threads-batch`, `--ctx-size`, `--parallel`, `--n-gpu-layers`, `-m`, `--model`, `--lora`, `--draft-model`, `--embedding`, `--rerank`, `--grammar`, `--grammar-file`, `--chat-template`, `--chat-template-file`.

---

## 2. In-memory / transient entities

### 2.1 `InstallTask`

Fields: `install_task_id` (`itask_<ULID>`), `backend`, `target_release_id`, `target_profile`, `phase` (`resolve|download|verify|extract|detect|validate|persist|complete`), `bytes_downloaded`, `bytes_total`, `started_at`, `terminal_state` (`none|completed|cancelled|failed`), `failure_category`, `cancellation_token`.

### 2.2 `ValidationResult`

Fields: `runtime_install_id`, `checks` (ordered list of 7 entries, each `{ check_id, ok, message, duration_ms }`), `overall_ok`, `started_at`, `finished_at`, `failure_category` (nullable).

### 2.3 `DiagnosticRecord`

Fields: `category` (enum from FR-090), `title`, `explanation`, `likely_cause`, `suggested_actions` (`string[]`), `technical_details` (JSON), `event_refs` (`string[]`), `created_at`.

### 2.4 `RuntimeLogLine`

Fields: `timestamp`, `source` (`host|extension|llama.cpp|tensorrt_llm`), `runtime_id` (nullable), `deployment_id` (nullable), `severity` (`info|warn|error`), `namespace` (e.g., `extension.local-llm.llama.cpp`), `message`.

---

## 3. State machine

`RuntimeCardState` ∈ { `unsupported`, `not_installed`, `installing`, `installed_unvalidated`, `ready`, `broken`, `updating` }.

Transitions:

```
 not_installed ──install──▶ installing ──success──▶ installed_unvalidated ──validate_ok──▶ ready
                                   │                           │
                                   ├──cancel──▶ not_installed  └──validate_fail──▶ broken
                                   └──fail──▶ not_installed (partial files cleaned)
 ready ──repair──▶ updating ──success──▶ installed_unvalidated ──validate_ok──▶ ready
 ready ──validate_fail──▶ broken
 broken ──repair──▶ updating ──...
 <any> ──machine_unsupported──▶ unsupported (UI-derived; not persisted as install row)
```

The transition function is a pure function `(current, event) -> next` implemented in `state.rs` and covered by table-driven tests.

---

## 4. Keys, identifiers, and stability

- All persistent ids use ULID under a typed prefix (`rtinst_`, `rts_`, `itask_`) — monotonic, URL-safe, sortable.
- Identifiers are stable across host restarts and are the values referenced by the forthcoming Deployments feature.
- Settings are addressed by `backend` (unique); clients may use either `backend` or `runtime_settings_id` via the REST API.

---

## 5. Validation-rule summary (cross-references)

| Field / Constraint | Source |
|---|---|
| Accelerator profiles first-slice | FR-029 |
| Extra-args deny list | FR-057 (+ FR-056) |
| Port mode semantics | FR-052, FR-062 |
| Bind default loopback | FR-052 |
| Settings cannot include model-bound fields | FR-056 |
| Launch spec determinism | FR-063, SC-007 |
| Install manifest required fields | FR-027 |
| Card state set | FR-011 |
| Failure categories | FR-090 |

---

## 6. Migration

A new migration file `004_runtime_installs_and_settings.sql` added under `extensions/builtin/local-llm/storage/migrations/`. Migration is forward-only and idempotent (guarded by `CREATE TABLE IF NOT EXISTS`). Rolling back is performed via the extension-storage contribution's standard teardown path (spec 004).
