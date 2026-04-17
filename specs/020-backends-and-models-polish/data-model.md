# Data Model — Backends + Models page polish

No SQL schema changes. All new data is either (a) projected from existing stores at read time or (b) frontend-only presentation state.

## Backend DTOs (Rust, serialized via serde)

### `BackendVariantDto` — new

```rust
#[derive(Debug, Serialize)]
pub struct BackendVariantDto {
    pub release_id: String,
    pub platform: String,
    pub accelerator_profile: AcceleratorProfile,
    pub label: String,
    pub recommended: bool,
    pub supported: bool,
    pub disabled_reason: Option<String>,
    pub size_bytes: Option<u64>,
    pub checksum_sha256: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct BackendVariantsResponse {
    pub variants: Vec<BackendVariantDto>,
    pub recommended_release_id: Option<String>,
}
```

Projected from `VersionManifest.releases.*.assets` filtered by `MachineDescriptor`. `label` is `"{release_id} · {platform} · {accelerator_profile}"` (matching the existing `versionLabel` helper in `backend_card.tsx`).

### `InstallHostModelRequest` — new (reuses `InstallModelRequestDto` shape minus `extension_id` path segment)

```rust
#[derive(Debug, Deserialize)]
pub struct InstallHostModelRequest {
    pub source: ModelSource,
    pub repo_id: String,
    pub revision: Option<String>,
    pub files: Vec<String>,
    pub display_name: Option<String>,
}
```

Response: `ModelInstallTaskDto` (already exists). `owner_extension_id` is set to `None` in the store row on success.

**Dedup behavior**: on SHA match the handler returns `HTTP 200 OK` with the existing `ModelInstallTaskDto` carrying `already_installed: true`. On new install it returns `HTTP 201 CREATED` with a fresh `task_id`. Frontend branches on `response.status`.

### `DependentsResponse` — new

```rust
#[derive(Debug, Serialize)]
pub struct DependentEntry {
    pub extension_id: String,
    pub display_name: String,
    pub kind: DependentKind,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum DependentKind { Lease, DeclaredDep }

#[derive(Debug, Serialize)]
pub struct DependentsResponse {
    pub count: u32,
    pub extensions: Vec<DependentEntry>,
}
```

Source: JOIN on `host_model_leases` (kind = `Lease`) UNION extensions with a declared model dep matching the install's `{family, variant, quantization}` (kind = `DeclaredDep`). Deduplicated by `extension_id` (prefer `Lease` over `DeclaredDep` when both apply).

## Frontend view-models (TypeScript)

### `VariantRow` — new (matches `BackendVariantDto` 1:1)

Rendered in `VariantPickerDrawer`. `supported=false` rows are rendered with `aria-disabled="true"` and a tooltip showing `disabled_reason`.

### `BackendDetailViewModel` — new

Aggregates `BackendSummary` (already fetched by `/backends/{id}`) with the last 200 log lines (fetched on drawer open via existing `GET /llm/backends/{id}/logs` + live WS tail).

### `HostModelRowVM` — extension of existing `HostModelView`

```ts
interface HostModelRowVM extends HostModelView {
  dependents?: { count: number; loaded: boolean };
}
```

`dependents` is lazily populated via `fetchHostModelDependents(install_id)` when a row becomes visible (IntersectionObserver). The chip renders `"Shared by N extension(s)"` when `loaded === true`, else a skeleton.

### `DraftNodeState` — new (frontend-only, not persisted)

```ts
type NodeMode = "draft" | "live";
interface DraftNodeState {
  modes: ReadonlyMap<string, NodeMode>;
  markDraft(nodeId: string): DraftNodeState;
  promote(nodeId: string): DraftNodeState;
  clear(): DraftNodeState;
}
```

Invariants:
- A freshly dropped operator node is added with `modes.set(id, "draft")`.
- Promotion to `"live"` happens on (a) explicit user action (right-click → "Mark as live"), or (b) auto-promotion when all `required: true` input ports have an incoming edge — computed from the latest `workflow.edges` on every render.
- Demotion is **never** automatic (FR-Q4-03). Deleting an edge on a live node shows the normal "required input disconnected" error.
- State clears on workflow switch (`useEffect(..., [workflow.id])`). A reload by definition loses drafts — acceptable because a loaded-from-server workflow has no unfinished drops.
- Save rejects any draft nodes with a visible error listing their ids (FR-Q4-04).

## State transitions — DraftNodeState

```
 (drop_operator_node)
         │
         ▼
   ┌──────────┐    (all required inputs wired OR user marks live)
   │  draft   ├─────────────────────────────────────────────────┐
   └──────────┘                                                 │
                                                                ▼
                                                          ┌──────────┐
                                                          │   live   │
                                                          └─────┬────┘
                                                                │
                                                                │ (never transitions back)
                                                                │
                                                                ▼
                                                            (remains live — required-port errors surface normally)
```

## Validation rules (derived from FR-*)

- **Variants** — `variants.len() >= 1` OR endpoint returns `404 CATALOG_UNAVAILABLE` (Q1-edge3).
- **Host model install** — `files.len() >= 1`; SHA match short-circuit per dedup contract.
- **Dependents** — endpoint is read-only and safe to call with any `install_id` (returns `404` if install id unknown).
- **Draft save guard** — `workflow.nodes.every(n => modes.get(n.id) !== "draft")` before emitting `updateWorkflowGraph`.
