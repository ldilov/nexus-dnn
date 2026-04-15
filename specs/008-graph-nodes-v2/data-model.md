# Phase 1 Data Model — Graph Nodes v2

All entities are host-owned. DTO projections are auto-generated via `ts-rs` into `apps/web/src/api/generated/v2/`. Table names use the suffix `_v2` to coexist with v1. Every table has `created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))` unless noted.

## Entity catalogue

| Entity | Storage | Primary key | Parent |
|---|---|---|---|
| WorkflowV2 | `workflows_v2` | `id TEXT` | — |
| WorkflowVersion | `workflow_versions` | `id TEXT (blake3 chain)` | `workflow_id → workflows_v2.id` |
| NodeInstanceV2 | `node_instances_v2` | `id TEXT` | `workflow_version_id` |
| NodeBindingV2 | `node_bindings_v2` | `id TEXT` | `workflow_version_id` |
| Subgraph | `subgraphs_v2` | `id TEXT` | `workflow_version_id` |
| MutationCommand | `graph_mutation_log` | `id TEXT` | `workflow_version_id → workflow_versions.id` |
| ValidationResult | `validation_results` | `id INTEGER` | `workflow_version_id` |
| NodeAttempt | `node_attempts` | `id TEXT` | `run_id → runs.id` |
| RecipeBinding | `recipe_bindings` | `id TEXT` | `recipe_id` |
| RecipeMappingResult | `recipe_mapping_results` | `id INTEGER` | `workflow_version_id, recipe_id` |
| CapabilityDeclaration | `node_capability_declarations` | `id INTEGER` | `operator_id + version` |

---

## 1. WorkflowV2

Canonical workflow identity. Points at the current version.

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK | stable across versions |
| `title` | TEXT | UI label |
| `description` | TEXT NULL | |
| `spec_version` | TEXT | always `"0.2"` in v2 |
| `source_kind` | TEXT | `extension_template` \| `user_created` \| `migrated_from_v1` \| `imported` |
| `source_ref` | TEXT NULL | e.g. `nexus.chatllm/workflows/chat_rag_basic.yaml` |
| `current_version_id` | TEXT FK→workflow_versions.id | |
| `user_edited_at` | TEXT NULL | same semantics as v1 (edit protection) |
| `labels` | TEXT (JSON array) | |
| `created_at` | TEXT | |
| `updated_at` | TEXT | |

Invariants:
- `current_version_id` must reference a `workflow_versions` row whose `workflow_id` equals this row's `id`.
- `user_edited_at` is set on the first successful `mutate` after a reboot; cleared on `revert`.

## 2. WorkflowVersion

Immutable snapshot produced by applying one mutation to a parent version. Merkle-chained.

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK | `blake3(parent_id || canonical(command) || second_ts)` |
| `workflow_id` | TEXT FK | |
| `parent_version_id` | TEXT NULL | null for the seed version |
| `command_id` | TEXT FK→graph_mutation_log.id | null for the seed version |
| `mapping_state` | TEXT | `fully_mapped` \| `partially_mapped` \| `custom` \| `unmappable` |
| `validation_summary` | TEXT (JSON) | counts of errors/warnings/info + critical path |
| `created_at` | TEXT | |
| `created_by` | TEXT | `user:<id>` \| `extension:<id>` \| `migration` \| `system` |

State machine: versions are immutable; a rollback adds a new version whose `parent_version_id` equals the target, not a deletion.

## 3. NodeInstanceV2

Concrete use of an operator in a specific workflow version.

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK | composite with workflow_version_id in UNIQUE index; exposed as `node_id` in DTOs |
| `workflow_version_id` | TEXT FK | |
| `node_id` | TEXT | workflow-local id (e.g. `chat_turn`) |
| `operator_id` | TEXT | |
| `operator_version` | TEXT (semver) | |
| `extension_id` | TEXT | provenance |
| `display_name` | TEXT | |
| `node_class` | TEXT (JSON array) | `["inference","llm"]` etc. |
| `stage_id` | TEXT NULL | |
| `subgraph_id` | TEXT NULL | |
| `availability_state` | TEXT | `active` \| `missing_operator` \| `incompatible_version` \| `missing_runtime_adapter` \| `disabled_by_extension` \| `missing_dependency` \| `invalid_config` \| `orphaned` |
| `mapping_state` | TEXT | `fully_mapped` \| `partially_mapped` \| `customized` \| `unmapped` |
| `config_json` | TEXT | structural domain only |
| `runtime_bindings_json` | TEXT | `{ runtimeAdapterId, runtimeInstallId, deploymentRef, profileId }` |
| `model_parameters_json` | TEXT | model_load domain |
| `request_parameters_json` | TEXT | request domain |
| `inputs_json` | TEXT | map portName → NodeInputSource |
| `resources_json` | TEXT | advisory hints |
| `ui_json` | TEXT NULL | ui_only (never in cache key) |
| `tags_json` | TEXT NULL | |
| `notes` | TEXT NULL | |

Invariants:
- `(workflow_version_id, node_id)` UNIQUE.
- Every `inputs_json[portName].source.kind` must be one of the 6 valid forms: `workflow_input | node_output | literal | recipe_binding | previous_run_artifact | runtime_context`.
- `ui_json` must never be referenced by cache-key derivation.

## 4. NodeBindingV2

First-class binding (edge) with identity and validation state.

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK (binding_id) | |
| `workflow_version_id` | TEXT FK | |
| `source_kind` | TEXT | `workflow_input` \| `node_output` |
| `source_ref` | TEXT | node_id or `input` sentinel |
| `source_port` | TEXT | |
| `target_node_id` | TEXT | |
| `target_port` | TEXT | |
| `declared_type` | TEXT | as announced by the operator definitions |
| `resolved_type` | TEXT NULL | populated by the validator when the port is reachable |
| `transport` | TEXT | `literal_value` \| `artifact_ref` \| `runtime_handle` \| `deployment_ref` \| `stream_ref` |
| `conversion_ref` | TEXT NULL | node_id of an explicit conversion operator if inserted |
| `validation_state` | TEXT | `valid` \| `type_mismatch` \| `missing_source` \| `missing_target` \| `operator_unavailable` \| `ambiguous` \| `stale_due_to_version_change` |
| `created_by` | TEXT | |

Invariants:
- `(workflow_version_id, target_node_id, target_port)` UNIQUE — one binding per target port.
- Workflow-output bindings are **not** stored here; they live in the workflow document's `outputs[]` (see §10 below).

## 5. Subgraph

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK | |
| `workflow_version_id` | TEXT FK | |
| `label` | TEXT | |
| `contained_node_ids` | TEXT (JSON array) | subset of workflow's nodes |
| `exposed_inputs` | TEXT (JSON) | `[{ name, inner_ref: "nodeId:port", type }]` |
| `exposed_outputs` | TEXT (JSON) | same shape |
| `ui_json` | TEXT NULL | collapsed/expanded state |

Invariant: `contained_node_ids` must not overlap across subgraphs in the same workflow version.

## 6. MutationCommand (graph_mutation_log)

Append-only command log. Driver of version creation.

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK | UUIDv7 |
| `workflow_id` | TEXT FK | |
| `parent_version_id` | TEXT FK | version the command was applied to |
| `resulting_version_id` | TEXT FK | version produced by this command |
| `command_kind` | TEXT | `AddNode`, `ConnectPorts`, … (28 kinds) |
| `command_json` | TEXT | canonical JSON args |
| `applied_at` | TEXT | RFC3339 |
| `applied_by` | TEXT | `user:<id>` \| `extension:<id>` \| `system` |

## 7. ValidationResult

Structured validation emission per version.

| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK AUTOINCREMENT | |
| `workflow_version_id` | TEXT FK | |
| `severity` | TEXT | `error` \| `warning` \| `info` |
| `code` | TEXT | e.g. `required_input_missing`, `type_mismatch` |
| `message` | TEXT | |
| `node_id` | TEXT NULL | |
| `binding_id` | TEXT NULL | |
| `path` | TEXT NULL | dotted JSON path for config errors |
| `source` | TEXT | `host_schema` \| `host_graph` \| `operator_schema` \| `runtime_adapter` |
| `suggested_fix_json` | TEXT NULL | `{ kind, args }` actionable by the inspector |

## 8. NodeAttempt

One row per node execution attempt within a run.

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK | UUIDv7 |
| `run_id` | TEXT FK | |
| `node_id` | TEXT | |
| `attempt_index` | INTEGER | 1-based |
| `worker_id` | TEXT NULL | |
| `lifecycle_state` | TEXT | see §9 below |
| `started_at` | TEXT NULL | |
| `ended_at` | TEXT NULL | |
| `resolved_config_json` | TEXT | snapshot at scheduling time |
| `resolved_inputs_json` | TEXT | bindings materialized to concrete refs/values |
| `outputs_json` | TEXT NULL | artifact refs + structured values |
| `cache_decision` | TEXT | `hit` \| `miss` \| `skip:<reason>` |
| `failure_json` | TEXT NULL | structured `{ category, code, message, details, retryable }` |
| `metrics_json` | TEXT NULL | |

## 9. Node lifecycle state machine

```
pending ─► blocked ─► scheduled ─► starting ─► running ─► produced_output ─► validating_outputs ─► completed
                                                              │                                      ▲
                                                              ▼                                      │
                                                           failed  ────────────────── (retry) ───────┘
 pending ─► cache_hit ─► completed
 pending ─► skipped
 <any> ─► cancelled
```

Allowed transitions are enforced in `engine_v2.rs::transition(state, event)`.

## 10. Workflow document shape (persisted as composite of tables)

When fetched via `GET /v2/workflows/:id`, the API hydrates the active version:

```yaml
specVersion: "0.2"
workflow:
  id: local_chat_basic
  version: 1.0.0
  title: Local Chat
  source: { kind: extension_template, ref: nexus.chatllm/... }
  mappingState: fully_mapped
  labels: [llm, local]
  inputs:
    - { name: user_prompt, type: text/prompt }
  outputs:
    - { name: assistant_message, from: generate_1:assistant_message }
  stages:
    - { id: generate, label: Generate }
  subgraphs: []
  nodes: [ … ]         # from node_instances_v2
  bindings: [ … ]      # from node_bindings_v2 (edges)
  annotations: {}
  uiState: {}
```

`inputs[]` and `outputs[]` are **document-level fields**, not synthetic nodes (see research Q4).

## 11. RecipeBinding

| Field | Type | Notes |
|---|---|---|
| `id` | TEXT PK | |
| `recipe_id` | TEXT FK | |
| `field_id` | TEXT | recipe-local field name |
| `maps_to_kind` | TEXT | `workflow_input` \| `node_config` \| `node_runtime_binding` \| `node_model_parameter` \| `node_request_parameter` \| `node_literal_input` \| `workflow_output_metadata` |
| `maps_to_ref` | TEXT | path-like, e.g. `generate_1.request_parameters.temperature` |
| `visibility` | TEXT | `hidden` \| `advanced` \| `standard` \| `recipe_exposed` \| `graph_only` \| `debug_only` |
| `scope` | TEXT | `runtime` \| `model_load` \| `request` \| `structural` \| `ui_only` |
| `default_source_json` | TEXT NULL | |
| `validation_rules_json` | TEXT NULL | |

## 12. RecipeMappingResult

Per workflow-version × recipe pair.

| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | |
| `workflow_version_id` | TEXT FK | |
| `recipe_id` | TEXT FK | |
| `field_id` | TEXT | |
| `mapping_state` | TEXT | `fully_mapped` \| `partially_mapped` \| `custom` \| `invalid` |
| `diagnostic_json` | TEXT NULL | human-readable + suggested fix |

## 13. CapabilityDeclaration

Populated from operator-definition YAML on extension load.

| Field | Type | Notes |
|---|---|---|
| `id` | INTEGER PK | |
| `operator_id` | TEXT | |
| `operator_version` | TEXT (semver) | |
| `capability` | TEXT | `filesystem.read` \| `filesystem.write` \| `network.loopback` \| `network.remote` \| `process.spawn` \| `gpu.compute` \| `workspace.read` \| `workspace.write` \| `model.registry.read` |
| `details_json` | TEXT NULL | capability-specific args, e.g. allowed domains |

`GET /v2/workflows/:id` aggregates these across all nodes → `capabilities_summary` in the response.

## 14. Cross-entity invariants (checked in validator Layer 2)

1. Every `bindings[].target_node_id` exists in `nodes[]`.
2. Every `bindings[].source_ref` equals `"input"` OR exists in `nodes[]`.
3. Every `inputs[name].source` of kind `recipe_binding` references an existing `recipe_bindings.field_id`.
4. No cycle in the DAG formed by `(source_ref → target_node_id)` edges.
5. `outputs[].from` references an existing `{node_id}:{port_name}` pair.
6. For each `required` input on an operator's spec, the corresponding `NodeInstanceV2.inputs[name]` resolves (either to a binding or a literal).
7. `port.declared_type` matches `port.resolved_type` under the type-compatibility rules of `port_types.ts`.

## 15. Migration reference

| Migration | Adds |
|---|---|
| `006_workflow_v2_core.sql` | `workflows_v2`, `workflow_versions`, `node_instances_v2`, `node_bindings_v2`, `subgraphs_v2` |
| `007_workflow_v2_mutations_and_attempts.sql` | `graph_mutation_log`, `node_attempts`, `validation_results` |
| `008_recipe_bindings.sql` | `recipe_bindings`, `recipe_mapping_results` |
| `009_capability_summary.sql` | `node_capability_declarations` |

No existing table (`workflows`, `workflow_canvas_state`, `runs`, `node_executions`, `artifacts`, `lineage_edges`) is altered.
