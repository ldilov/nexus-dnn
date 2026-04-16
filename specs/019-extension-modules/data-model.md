# Phase 1 Data Model: Extension Modules

**Feature**: 019-extension-modules
**Date**: 2026-04-16

No new persistent tables. Only additive columns on `extensions`. All other entities in this feature are **virtual** (composed at read time by the `/api/v1/modules/*` aggregator) or **transient** (client-side state, short-TTL server maps).

---

## 1. Schema changes (persisted)

### 1.1 `extensions` table — additive columns (migration `012_extensions_primary_refs.sql`)

```sql
ALTER TABLE extensions ADD COLUMN primary_recipe_id TEXT NULL;
ALTER TABLE extensions ADD COLUMN default_workflow_id TEXT NULL;
ALTER TABLE extensions ADD COLUMN icon_kind TEXT NULL;
ALTER TABLE extensions ADD COLUMN icon_symbol TEXT NULL;
ALTER TABLE extensions ADD COLUMN icon_svg TEXT NULL;
```

| Column | Type | Nullable | Purpose |
|---|---|---|---|
| `primary_recipe_id` | TEXT | YES | Logical reference to `recipes.id`; picks the module's default blueprint (FR-005, FR-028). Not a DB-enforced FK (SQLite convention in this repo). When NULL, the aggregator falls back to the first recipe by `sort_order` then lexical. |
| `default_workflow_id` | TEXT | YES | Logical reference to `workflows.id`; used by the deploy-shortcut endpoint (FR-028) to resolve the default workflow projection. Not a DB-enforced FK. When NULL, the aggregator synthesizes a workflow projection from the chosen recipe. |
| `icon_kind` | TEXT | YES | One of `"symbol"`, `"svg"`, NULL. NULL means the manifest declared no icon and the host should compute the FNV-1a fallback at read time (FR-I04). |
| `icon_symbol` | TEXT | YES | Material Symbols Outlined glyph name when `icon_kind='symbol'`. |
| `icon_svg` | TEXT | YES | Sanitized inline SVG (≤ 2 KiB) when `icon_kind='svg'`. Stored post-sanitization per FR-I03. |

**Rationale for storing icon in the `extensions` table**: the icon is a property of the installed extension, not of the manifest-ingest pipeline. It is authoritative once installed and does not vary per-request. Storing it here (vs a separate `extension_icons` table) is the minimum change; it also avoids a join on every `GET /api/v1/modules` call.

**Idempotency**: migration uses the existing `execute_migration_statements(..., ignore_duplicate_column = true)` path so re-running on an already-migrated database is a no-op (matches the 018 migration discipline).

---

## 2. Virtual entities (composed at read time)

### 2.1 `Module` (aggregate DTO returned by `GET /api/v1/modules`)

Not persisted. Composed by the aggregator over `extensions`, `recipes`, `workflows`, and `deployments`.

```rust
#[derive(Serialize, Debug, Clone)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub struct ModuleSummary {
    pub module_id: ModuleId,                    // "ext:{extension_id}" | "user:{workflow_id}" | "user:blank"
    pub source_kind: ModuleSourceKind,          // Extension | User | Blank
    pub extension_id: Option<ExtensionId>,
    pub display_name: String,
    pub icon: ModuleIcon,
    pub version: Option<String>,                // Always Some for Extension kind, None for User
    pub tags: Vec<String>,
    pub blueprints: Vec<RecipeRef>,             // Length ≥ 1 for Extension, exactly 1 for User
    pub default_runtime_binding_ref: Option<RuntimeBindingRef>,
    pub default_model_binding_ref: Option<ModelBindingRef>,
    pub deployments: DeploymentCounts,
    pub compatibility_summary: CompatibilitySummary,
}

#[derive(Serialize, Debug, Clone)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum ModuleSourceKind { Extension, User, Blank }

#[derive(Serialize, Debug, Clone)]
#[non_exhaustive]
pub struct DeploymentCounts {
    pub total: u32,
    pub by_state: HashMap<DeploymentState, u32>,
    pub by_restore_state: HashMap<DeploymentRestoreState, u32>,
}
```

**Identity**: `ModuleId` is a newtype over `String`, validated against `^(ext:[A-Za-z0-9_\-.]+|user:[0-9a-f-]{36}|user:blank|user:draft:[0-9a-f-]{36})$`. The `user:draft:*` form is accepted ONLY by the materialize endpoint (FR-BM04); all other endpoints reject it with HTTP 400.

**Validation rules** (aggregator-enforced):
- `source_kind=Extension` ⟹ `extension_id.is_some()` and `blueprints.len() ≥ 1`.
- `source_kind=User` ⟹ `extension_id.is_none()` and `blueprints.len() == 1`.
- `source_kind=Blank` ⟹ `module_id == "user:blank"` and `blueprints.is_empty()` and `deployments.total == 0`.
- If an Extension has zero `recipes` rows, the aggregator OMITS its module from the response and emits a `warning` diagnostic on the host event bus (`module.no_recipes`).

### 2.2 `ModuleDetail` (returned by `GET /api/v1/modules/{module_id}`)

```rust
#[derive(Serialize, Debug, Clone)]
#[non_exhaustive]
pub struct ModuleDetail {
    pub summary: ModuleSummary,
    pub deployments: Vec<DeploymentListRow>,     // full list, not counts
    pub recent_runs: Vec<RunSummary>,            // last 10 runs across all deployments of this module
    pub compatibility_by_dimension: HashMap<CompatibilityDimension, CompatibilityState>,
    pub blueprint_preview: Vec<BlueprintStepPreview>,  // first 3 steps of primary recipe
}
```

### 2.3 `RecipeRef` (virtual, returned inside `Module.blueprints`)

```rust
#[derive(Serialize, Debug, Clone)]
#[non_exhaustive]
pub struct RecipeRef {
    pub recipe_id: RecipeId,
    pub display_name: String,
    pub description: Option<String>,
    pub step_count: u32,
    pub tags: Vec<String>,
    pub is_primary: bool,                        // true iff recipe_id == extensions.primary_recipe_id
}
```

**Ordering rule**: `blueprints` is always sorted as `[primary, then by recipe.sort_order ASC, then lexical]`. If no primary is set on the extension row, the first element by the same sort becomes the implicit primary and carries `is_primary=true` (with the `warning` diagnostic `module.missing_primary_blueprint`).

### 2.4 `ModuleIcon` (virtual, returned inside `Module.icon`)

```rust
#[derive(Serialize, Debug, Clone)]
#[serde(tag = "kind", content = "value", rename_all = "snake_case")]
#[non_exhaustive]
pub enum ModuleIcon {
    Symbol(String),                              // glyph name (Material Symbols Outlined)
    Svg(String),                                 // sanitized SVG string
    Fallback { glyph: String, fallback_hash: u32 },  // deterministic FNV-1a pick
}
```

The JSON wire shape matches FR-I01: `{ "kind": "symbol" | "svg" | "fallback", "value": "...", "fallback_hash"?: 1234 }`.

**Fallback derivation** (FR-I04): the 16-item glyph set is `FALLBACK_GLYPHS = ["hub", "memory", "dataset", "settings_input_component", "polyline", "api", "network_node", "device_hub", "schema", "flowsheet", "lan", "widgets", "layers", "tune", "insights", "view_agenda"]`. For an extension with id `X`, pick `FALLBACK_GLYPHS[(fnv1a_64(X.as_bytes()) as u32 % 16) as usize]`.

### 2.5 `DeploymentListRow` (already in 018; summarized here for the module-detail composition)

Existing entity from spec 018, rendered with an additional **module badge hint** field added by this spec — but no schema change; the hint is computed from `source_extension_id` / `source_kind` at read time.

---

## 3. Client-only / transient entities

### 3.1 `DraftBlankModule` (client-state + short-TTL server map)

**Client side**:

```ts
type DraftBlankModule = {
  uuid: string;                            // crypto.randomUUID()
  workflow_payload: WorkflowPayload;       // initially empty
  display_name?: string;
  created_at: string;                      // ISO 8601
};
```

Stored only in `sessionStorage` under the key `nexus.module.draft.{uuid}`. Hard cap `512 KiB` per FR-BM03. Cleared on successful materialize or explicit discard.

**Server side**:

```rust
pub struct DraftMaterializeMap {
    entries: Arc<RwLock<HashMap<Uuid, (WorkflowId, DeploymentId, Instant)>>>,
}
```

TTL: 10 minutes. Sweeper task runs every 60 seconds and evicts expired entries. Not persisted; survives only within a single host process.

### 3.2 `InstanceEditorSession` (client-state)

```ts
type InstanceEditorSession =
  | { mode: "editing"; deployment_id: DeploymentId; current_revision_id: RevisionId;
      active_tab: "recipe" | "stage" | "graph" | "trace";
      recipe_segment: "overlay" | "blueprint";
      dirty_draft_payload: WorkflowPayload | null;
      last_save_attempt: SaveStatus | null; }
  | { mode: "viewing"; deployment_id: DeploymentId; current_revision_id: RevisionId;
      viewed_revision_id: RevisionId; active_tab: "recipe" | "stage" | "graph" | "trace";
      preserved_draft: WorkflowPayload | null; }
  | { mode: "draft"; draft_uuid: string;
      active_tab: "graph";
      dirty_draft_payload: WorkflowPayload; };
```

**State transitions** (exhaustive):

```
┌─────────┐   open(deployment_id)    ┌──────────┐
│ (init)  ├─────────────────────────>│ editing  │
└─────────┘                          └──────────┘
                                          │ ▲
               open(user:draft:uuid)      │ │ back_to_current
┌─────────┐                               │ │
│ (init)  ├──────────────>┌───────┐   pick_revision(r')
└─────────┘               │ draft │         │
                          └───────┘         ▼
                              │        ┌─────────┐
                              │        │ viewing │
                              │        └─────────┘
                              │             │
                              │             ▼
                      materialize OK   make_current OK
                              │             │
                              ▼             ▼
                        ┌──────────┐   ┌──────────┐
                        │ editing  │   │ editing  │
                        └──────────┘   └──────────┘
```

Draft-preservation rule (FR-RV03): `editing → viewing` preserves `dirty_draft_payload` as `preserved_draft`. `viewing → editing` (via `back_to_current`) restores it.

Make-current-with-dirty-draft rule (FR-RV05): `viewing → editing` (via `make_current_with_save_draft`) first POSTs an auto-draft revision carrying `preserved_draft`, then POSTs the revert revision. Both revisions advance `current_revision_id` in order.

### 3.3 `ZipInstallRequest` / `ZipInstallResult` (transient)

```rust
pub struct ZipInstallRequest {
    pub file_bytes_stream: Box<dyn AsyncRead + Unpin + Send>,
    pub file_size_hint: Option<u64>,
}

#[derive(Serialize)]
#[non_exhaustive]
pub struct ZipInstallResult {
    pub extension_id: ExtensionId,
    pub module_id: ModuleId,
    pub manifest_summary: ManifestSummary,
    pub install_diagnostics: Vec<Diagnostic>,
}
```

`ZipInstallError` covers every FR-IE05 code:

```rust
#[derive(thiserror::Error, Debug)]
#[non_exhaustive]
pub enum ZipInstallError {
    #[error("zip.corrupt: {0}")] Corrupt(String),
    #[error("zip.slip_attempt")] SlipAttempt,
    #[error("zip.missing_manifest")] MissingManifest,
    #[error("zip.size_limit: {actual} > {limit}")] SizeLimit { actual: u64, limit: u64 },
    #[error("zip.file_count_limit: {actual} > {limit}")] FileCountLimit { actual: usize, limit: usize },
    #[error("zip.executable_outside_assets: {path}")] ExecutableOutsideAssets { path: String },
    #[error("manifest.invalid: {0}")] ManifestInvalid(String),
    #[error("manifest.icon_invalid: {0}")] ManifestIconInvalid(String),
    #[error("extension.already_installed: {extension_id}")] AlreadyInstalled { extension_id: ExtensionId },
    #[error("io.stage_failed: {0}")] StageFailed(std::io::Error),
}
```

---

## 4. Identity formats and newtypes

| Newtype | Wire format | Invariant | Where created |
|---|---|---|---|
| `ModuleId` | `"ext:{id}" \| "user:{uuid}" \| "user:blank" \| "user:draft:{uuid}"` | Regex-validated on construction | Aggregator + client route parser |
| `DraftModuleUuid` | Uuid v4 | 36 chars, lowercase, hyphenated | Client `crypto.randomUUID()` |
| `ExtensionId` | existing | existing | existing |
| `RecipeId` | existing | existing | existing |
| `WorkflowId` | existing | existing | existing |
| `DeploymentId` | existing (018) | existing | existing |
| `RevisionId` | existing (018) | existing | existing |

`ModuleId::parse(s)` returns `Result<ModuleId, ModuleIdParseError>` rejecting any non-matching input. The aggregator handler calls `parse` before dispatching.

---

## 5. Schema invariants (cross-cutting)

- **INV-019-1**: No `workflows` row is created by any module-scoped operation except `POST /modules/user:draft:{uuid}/materialize`. Enforced by code review + FR-BM01.
- **INV-019-2**: No `deployments` row references a `source_workflow_id` that does not exist. Holds today (spec 018 FR-014); this feature adds no new create path that could violate it.
- **INV-019-3**: `extensions.primary_recipe_id` when non-NULL MUST reference a `recipes.id` whose `source_extension_id = extensions.id`. Enforced by the host at extension-install time (not by a DB constraint — SQLite convention in this repo).
- **INV-019-4**: `extensions.default_workflow_id` when non-NULL MUST reference a `workflows.id` whose `source_extension_id = extensions.id`. Same enforcement path.
- **INV-019-5**: Icon fields are mutually consistent: if `icon_kind='symbol'` then `icon_symbol IS NOT NULL AND icon_svg IS NULL`; if `icon_kind='svg'` then `icon_svg IS NOT NULL AND icon_symbol IS NULL`; if `icon_kind IS NULL` then both `icon_symbol` and `icon_svg` are NULL and the aggregator computes a `Fallback` at read time.
- **INV-019-6**: Module aggregator output ordering is stable: `blueprints` by primary-first-then-sort-order-then-lexical; `deployments` list by `created_at DESC`; `modules` list by `(source_kind: Extension first, then User), display_name ASC`.

---

## 6. Mapping to existing 018 entities

| Spec 019 entity | Source in 018 | Composition rule |
|---|---|---|
| `ModuleSummary.deployments` | `deployments` table | Aggregated by `module_id` — extension-kind modules group by `source_extension_id`, user-kind modules group by `source_workflow_id` |
| `ModuleDetail.recent_runs` | `runs` table via `deployment_run_links` | Top 10 rows by `runs.created_at DESC` across the module's deployments |
| `ModuleDetail.compatibility_by_dimension` | `deployment_revisions.compatibility_state_json` | Worst-case across all current revisions of the module's deployments |
| `ModuleSummary.default_runtime_binding_ref` | `deployment_runtime_bindings` (018) | None at module level by default; populated only if `extensions.default_workflow_id` is set and its most-recent deployment carries a runtime binding |

**Rule**: spec 019 never mutates any 018-owned row. Every composition is read-only.

---

## 7. Out of scope (data-model)

- No new tables.
- No schema change to `recipes`, `workflows`, `runs`, `deployments`, or any deployment child table.
- No change to spec 018's hashing discipline (SHA-256 over RFC 8785 JCS).
- No persistent draft-module storage (draft lives in sessionStorage + short-TTL server map only).
- No storage of ZIP-install telemetry beyond the existing event bus (FR-TP01).
