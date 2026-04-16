# Contract: HTTP API — Modules surface + ZIP install

**Feature**: 019-extension-modules
**Status**: Draft (Phase 1)

All endpoints live under `crates/nexus-api/src/router.rs` and use the existing `ApiResponse` envelope.

## Endpoints introduced by this feature

| Method | Path | Handler | Spec ref |
|---|---|---|---|
| GET | `/api/v1/modules` | `modules::aggregator::list` | FR-027 |
| GET | `/api/v1/modules/{module_id}` | `modules::aggregator::detail` | FR-030 |
| GET | `/api/v1/modules/{module_id}/blueprint` | `modules::aggregator::blueprint` | FR-015 |
| POST | `/api/v1/modules/{module_id}/deployments` | `modules::deploy_shortcut::create` | FR-028 |
| POST | `/api/v1/modules/{module_id}/blueprint/dry-run` | `modules::dry_run::run` | FR-029 |
| POST | `/api/v1/modules/user:draft:{uuid}/materialize` | `modules::materialize::materialize` | FR-BM04 |
| POST | `/api/v1/extensions/install-from-zip` | `extensions_install::zip_handler::install` | FR-IE03 |

## `GET /api/v1/modules`

**Query params**:

| Name | Type | Required | Default | Notes |
|---|---|---|---|---|
| `q` | string | no | — | case-insensitive substring over display_name, tags, extension_id |
| `kind` | `extension \| user \| all` | no | `all` | filter by source kind |
| `status` | string | no | — | filter by compatibility summary status |
| `include` | CSV | no | `counts,compat,blueprints` | which optional fields to project; any subset |
| `limit` | u32 | no | 60 | 1..=200 |
| `offset` | u32 | no | 0 | pagination cursor |

**200 OK** — `ApiResponse<ModuleListEnvelope>`:

```json
{
  "success": true,
  "data": {
    "modules": [ /* ModuleSummary[] — see data-model.md §2.1 */ ],
    "total": 42,
    "limit": 60,
    "offset": 0
  }
}
```

**Ordering** (INV-019-6): Extension kind first, then User kind, each subgroup by `display_name ASC`.

**Performance**: ≤ 300 ms p95 on a 200-module fixture (plan Technical Context).

## `GET /api/v1/modules/{module_id}`

**Path params**:

| Name | Type | Notes |
|---|---|---|
| `module_id` | string | must match `^(ext:[A-Za-z0-9_\\-.]+\|user:[0-9a-f-]{36}\|user:blank)$`. Draft ids `user:draft:{uuid}` are REJECTED here (400 `module.draft_id_not_allowed`). |

**200 OK** — `ApiResponse<ModuleDetail>` (see data-model.md §2.2).

**404 Not Found** — `module.not_found` when the module does not exist (extension uninstalled, workflow deleted).

## `GET /api/v1/modules/{module_id}/blueprint`

**Query params**:

| Name | Type | Required | Default | Notes |
|---|---|---|---|---|
| `recipe_id` | string | no | primary | must belong to the module's `blueprints` array; 422 `module.recipe_not_in_module` otherwise |

**200 OK** — `ApiResponse<BlueprintProjection>`:

```json
{
  "success": true,
  "data": {
    "recipe_id": "rcp_...",
    "display_name": "Hyperlight V3",
    "description": "...",
    "is_primary": true,
    "steps": [ /* BlueprintStep[] */ ],
    "compatibility_preview": { /* per-dim chip row */ },
    "instances_preview": [ /* up to 5 DeploymentListRow */ ]
  }
}
```

## `POST /api/v1/modules/{module_id}/deployments`

**Body** (all optional):

```json
{
  "recipe_id": "rcp_...",
  "runtime_binding_overrides": { ... },
  "model_binding_overrides": { ... },
  "parameter_overlays": { ... },
  "workflow_patch": { ... },
  "display_name": "Cinema Engine — 4K"
}
```

**201 Created** — `ApiResponse<DeploymentEnvelope>` (identical shape to `POST /api/v1/deployments`, per spec 018 FR-013).

**Error codes**:

| Code | HTTP | Condition |
|---|---|---|
| `module.not_found` | 404 | module_id does not resolve |
| `module.recipe_not_in_module` | 422 | supplied `recipe_id` is not in this module's blueprints |
| `module.draft_id_not_allowed` | 400 | module_id matches `user:draft:*` — use `/materialize` instead |
| `module.disabled` | 409 | extension is disabled (cannot deploy) |
| any 018 `deployment.*` code | pass-through | `DeploymentSaveService::save` error surfaces unchanged |

**Idempotency**: not idempotent (each call creates a new deployment). Clients that need idempotency supply an `Idempotency-Key` header (reserved; not enforced in v1).

## `POST /api/v1/modules/{module_id}/blueprint/dry-run`

**Body**:

```json
{
  "recipe_id": "rcp_...",
  "parameter_overlays": { ... },
  "runtime_binding_overrides": { ... }
}
```

**200 OK** — `ApiResponse<DryRunPlan>`:

```json
{
  "success": true,
  "data": {
    "plan_id": "plan_ephemeral_...",
    "steps": [ /* PlanStep[] */ ],
    "warnings": [ /* Diagnostic[] */ ],
    "diagnostics": [ /* Diagnostic[] */ ]
  }
}
```

**Invariants**: no `runs` row is created; no artifact is written; no side effects outside host-memory trace logs. Response-time p95 ≤ 500 ms (FR-029 / SC of spec).

## `POST /api/v1/modules/user:draft:{uuid}/materialize`

**Path constraints**: `{uuid}` must match the UUID-v4 regex `^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`; mismatched ids return HTTP 400 `module.draft_uuid_invalid`.

**Body**:

```json
{
  "workflow_payload": { /* full workflow JSON */ },
  "display_name": "My User Module",
  "parameter_overlays": { ... },
  "runtime_binding_overrides": { ... },
  "model_binding_overrides": { ... }
}
```

**201 Created** (first call) or **200 OK** (idempotent repeat within TTL):

```json
{
  "success": true,
  "data": {
    "module_id": "user:{workflow_id}",
    "deployment_id": "dpl_...",
    "deployment_revision_id": "rev_..."
  }
}
```

**Transaction**: single SQLite transaction creating a `workflows` row + delegating to `DeploymentSaveService::save` with `save_mode=create`. Failure anywhere rolls back both.

**Idempotency**: server-side TTL map (FR-BM04). Second POST with same `{uuid}` AND same body hash within 10 min returns the original response shape with HTTP 200. Different body → HTTP 409 `module.draft_uuid_conflict` (a user cannot re-materialize the same UUID with a different payload — forces them to mint a new UUID).

## `POST /api/v1/extensions/install-from-zip`

**Content-Type**: `multipart/form-data`
**Fields**: `file` (the ZIP), single part only.
**Body size limit**: 64 MiB (enforced per-route via `RequestBodyLimitLayer`).

**201 Created** — `ApiResponse<ZipInstallResult>`:

```json
{
  "success": true,
  "data": {
    "extension_id": "ext_...",
    "module_id": "ext:ext_...",
    "manifest_summary": { "name": "...", "version": "4.2.0", "publisher": "...", "runtime_family": "..." },
    "install_diagnostics": [ /* Diagnostic[] — may contain warnings */ ]
  }
}
```

**Error response envelope** (all FR-IE05 cases):

```json
{
  "success": false,
  "error": {
    "code": "zip.slip_attempt",
    "message": "Archive contains a path escaping the extraction root",
    "details": { "offending_entry": "../../../etc/passwd" }
  }
}
```

**Error table** — HTTP code per FR-IE05 code:

| Code | HTTP |
|---|---|
| `zip.corrupt` | 422 |
| `zip.slip_attempt` | 422 |
| `zip.missing_manifest` | 422 |
| `zip.size_limit` | 413 |
| `zip.file_count_limit` | 422 |
| `zip.executable_outside_assets` | 422 |
| `manifest.invalid` | 422 |
| `manifest.icon_invalid` | 422 |
| `extension.already_installed` | 409 |
| `io.stage_failed` | 500 |

All error paths delete the staging temp dir before returning (FR-IE05).

## Events emitted

| Event | Payload fields | Emitted by |
|---|---|---|
| `module.viewed` | `{ module_id, viewer_session_id }` | Client→Host on Modules page focus (advisory, rate-limited) |
| `module.blueprint.viewed` | `{ module_id, recipe_id }` | Blueprint view render |
| `module.deploy.instance` | `{ module_id, deployment_id, source_extension_id }` | `POST /modules/{id}/deployments` on success |
| `module.installed` | `{ extension_id, module_id }` | `POST /extensions/install-from-zip` on success |
| `deployment.*` (018) | unchanged | delegated from `DeploymentSaveService` |

All events are **local-process only** (FR-TP01). No payload field carries user prompt text, model inputs/outputs, runtime setting values, or file paths outside workspace roots (FR-TP02).

## Contract tests (Phase 1 → written before implementation)

Land in `crates/nexus-api/tests/` as:

- `modules_contract.rs` — `GET /modules` schema + ordering + pagination
- `modules_detail_contract.rs` — `GET /modules/{id}` + blueprint projection
- `modules_deploy_shortcut.rs` — `POST /modules/{id}/deployments` with/without `recipe_id`; covers 404, 422 `module.recipe_not_in_module`, 400 `module.draft_id_not_allowed`
- `modules_materialize_idempotency.rs` — SC-019, SC-020
- `install_from_zip_contract.rs` — SC-017 happy + SC-018 adversarial fixtures
- `revision_view_revert_contract.rs` — SC-016 (happy + incompatible-revision + dirty-draft-preserving revert)
