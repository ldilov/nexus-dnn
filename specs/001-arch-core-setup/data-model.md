# Data Model: Architecture Core Setup

**Date**: 2026-04-11
**Feature**: 001-arch-core-setup

## Entities

### Extension

Represents an installable package that contributes operators, recipes, and runtime capabilities.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique extension identifier (e.g., `nexus.video.diffusers`) |
| name | String (optional) | Human-readable display name |
| version | SemVer | Extension version |
| description | String (optional) | Short description |
| publisher | String (optional) | Publisher identifier |
| host_api_compat | VersionReq | Compatible host API version range |
| protocol_compat | VersionReq | Compatible protocol version range |
| runtime_family | RuntimeFamily | Required runtime (python, native, builtin, external-service) |
| entrypoint | Path | Worker process entrypoint relative to extension root |
| capabilities | Vec<Capability> | Declared capability permissions |
| status | ExtensionStatus | active, disabled, invalid |
| installed_at | DateTime | Installation timestamp |
| directory | Path | Filesystem path to extension root |

**State transitions**: `discovered` -> `validating` -> `active` | `invalid` | `disabled`

### Operator

Represents an executable capability exposed by an extension.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique operator identifier (e.g., `video.interpolate.rife`) |
| version | SemVer | Operator contract version |
| extension_id | String | Owning extension identifier |
| display_name | String (optional) | Human-readable name |
| description | String (optional) | Short description |
| category | String (optional) | Grouping category |
| inputs | Vec<Port> | Typed input ports |
| outputs | Vec<Port> | Typed output ports |
| config_schema | JsonSchema | JSON Schema for operator configuration |
| execution_mode | ExecutionMode | job, streaming (v0: job only) |
| cacheable | bool | Whether outputs can be cached |
| resumable | bool | Whether execution can resume after interruption |
| resource_hints | ResourceHints | GPU, VRAM, CPU hints for scheduler |

### Port

Represents a typed input or output on an operator or workflow.

| Field | Type | Description |
|-------|------|-------------|
| name | String | Port identifier (unique within operator inputs or outputs) |
| port_type | String | Structured type identifier (e.g., `image/rgb`, `video/frame-sequence`) |
| required | bool | Whether the port must be connected (inputs only) |
| default_value | Value (optional) | Default value for optional inputs |

### Workflow

Represents a typed directed acyclic graph.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique workflow identifier |
| title | String | Human-readable title |
| version | SemVer | Workflow version |
| inputs | Vec<Port> | Workflow-level input ports |
| outputs | Vec<OutputBinding> | Workflow-level output bindings |
| nodes | Vec<NodeInstance> | Concrete operator instances |
| edges | Vec<Edge> | Connections between ports |
| stages | Vec<Stage> | Named groupings for UX |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last modification timestamp |

### NodeInstance

Represents a concrete use of an operator within a workflow.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique within workflow (e.g., `prep_1`) |
| operator_ref | OperatorRef | Operator ID + version |
| stage_id | String (optional) | Stage this node belongs to |
| config | JsonValue | Configuration values |
| position | (f64, f64) (optional) | UI position hint |

### Edge

Represents a connection between an output port and an input port.

| Field | Type | Description |
|-------|------|-------------|
| source | PortRef | Source node ID + port name (or `input:<workflow_input>`) |
| target | PortRef | Target node ID + port name |

### Stage

Named grouping for UX projection.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique within workflow |
| label | String | Display label |
| order | u32 | Rendering order |

### Run

Represents a concrete execution instance of a workflow.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique run identifier |
| workflow_id | UUID | Workflow being executed |
| workflow_version | SemVer | Workflow version at execution time |
| status | RunStatus | created, queued, planning, running, paused, failed, cancelled, completed |
| started_at | DateTime (optional) | Execution start time |
| completed_at | DateTime (optional) | Execution end time |
| error | String (optional) | Failure description |
| created_at | DateTime | Record creation timestamp |

### NodeExecution

Tracks the execution state of a single node within a run.

| Field | Type | Description |
|-------|------|-------------|
| run_id | UUID | Parent run |
| node_id | String | Node instance ID within workflow |
| status | NodeStatus | pending, cache_hit, scheduled, starting, running, produced_output, failed, cancelled |
| worker_id | String (optional) | Assigned worker |
| started_at | DateTime (optional) | Execution start |
| completed_at | DateTime (optional) | Execution end |
| duration_ms | u64 (optional) | Execution duration |
| error | String (optional) | Failure description |

### Artifact

Represents a typed produced or consumed asset.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique artifact identifier |
| artifact_type | String | Type identifier (e.g., `image/rgb`, `video/encoded`) |
| run_id | UUID | Producing run |
| node_id | String | Producing node |
| port_name | String | Output port name |
| content_hash | String | SHA-256 of payload |
| size_bytes | u64 | Payload size |
| blob_path | Path | Relative path in artifact store |
| metadata | JsonValue (optional) | Additional metadata |
| created_at | DateTime | Creation timestamp |

### LineageEdge

Tracks the provenance relationship between artifacts.

| Field | Type | Description |
|-------|------|-------------|
| output_artifact_id | UUID | Produced artifact |
| input_artifact_id | UUID | Consumed artifact |
| run_id | UUID | Run where this relationship occurred |
| node_id | String | Node that consumed input and produced output |

### Worker

Represents a supervised worker process.

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique worker identifier |
| extension_id | String | Extension this worker serves |
| runtime_family | RuntimeFamily | python, native, builtin, external-service |
| pid | u32 (optional) | OS process ID |
| status | WorkerStatus | starting, healthy, unhealthy, stopped |
| operators | Vec<String> | Operator IDs this worker can serve |
| started_at | DateTime | Process start time |
| last_health_check | DateTime (optional) | Last successful health check |

### Event

Typed state change notification.

| Variant | Fields | Description |
|---------|--------|-------------|
| WorkflowUpdated | workflow_id | Workflow was created or mutated |
| RunCreated | run_id, workflow_id | New run created |
| RunStateChanged | run_id, old_status, new_status | Run status transition |
| NodeScheduled | run_id, node_id, worker_id | Node assigned to worker |
| NodeStarted | run_id, node_id | Worker began execution |
| NodeProgress | run_id, node_id, percent, message | Execution progress |
| NodeCompleted | run_id, node_id, artifacts | Execution finished |
| NodeFailed | run_id, node_id, error | Execution failed |
| ArtifactProduced | artifact_id, run_id, node_id | New artifact stored |
| WorkerHealthChanged | worker_id, old_status, new_status | Worker health transition |

## Enums

### RuntimeFamily
`builtin` | `python` | `native` | `external_service`

### ExtensionStatus
`discovered` | `validating` | `active` | `invalid` | `disabled`

### RunStatus
`created` | `queued` | `planning` | `running` | `paused` | `failed` | `cancelled` | `completed`

### NodeStatus
`pending` | `cache_hit` | `scheduled` | `starting` | `running` | `produced_output` | `failed` | `cancelled`

### WorkerStatus
`starting` | `healthy` | `unhealthy` | `stopped`

### Capability
`filesystem_read` | `filesystem_write` | `network_loopback` | `network_remote` | `gpu_compute` | `process_spawn` | `model_registry_read` | `workspace_read` | `workspace_write`

## Relationships

```text
Extension 1--* Operator       (extension owns operators)
Workflow  1--* NodeInstance    (workflow contains nodes)
Workflow  1--* Edge            (workflow contains edges)
Workflow  1--* Stage           (workflow contains stages)
NodeInstance *--1 Operator     (node references operator)
Run       *--1 Workflow        (run executes workflow)
Run       1--* NodeExecution   (run tracks node states)
Run       1--* Artifact        (run produces artifacts)
Artifact  *--* Artifact        (lineage: input -> output via LineageEdge)
Worker    *--1 Extension       (worker serves extension)
```

## Validation Rules

- Extension ID must be unique across the registry
- Operator ID must be unique within an extension version
- Workflow must be a valid DAG (no cycles)
- All edges must connect compatible port types (exact match in v0)
- All node operator references must resolve to registered operators
- All required input ports must have incoming edges or defaults
- Config values must validate against the operator's config schema
- Extension host_api_compat must include the current host version
- Extension protocol_compat must include the current protocol version
