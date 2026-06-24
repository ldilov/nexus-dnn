# Workflow-Driven Recipes — Shared Contracts (P0–P8)

Date: 2026-06-23 · Status: Authoritative cross-phase contract · Grounded against `main` HEAD `edb5b870`

This document is the **single source of truth** for every shape, name, number, and route shared
across phases P0–P8. It exists because a 9-plan adversarial review found the per-phase plans internally
sound but **cross-phase incoherent** (2 CRITICAL + ~14 HIGH/MEDIUM contract mismatches — all from phases
planned against `main` in isolation). Each plan **cites this file verbatim**; no phase re-derives a shared
decision from `main`. When a plan and this file disagree, **this file wins** (raise an edit here, don't fork).

Companion: implementation design `2026-06-14-workflow-driven-recipes-implementation-design.md` (the §refs below
point into it). Per-phase plans: `2026-06-23-recipes-P{0..8}-*.md`. Program index: `2026-06-23-recipes-MASTER-PLAN.md`.

---

## C1. Migration ledger (resolves CRITICAL: 026 triple-collision)

Host migrations are **hand-registered** in `crates/nexus-storage/src/sqlite/migrations.rs` via `include_str!`
and run split-on-`;` every boot. A `migrations/NNN_*.sql` file is **inert until registered**. There is no
auto-discovery and no applied-migration table. Current highest on `main` = `025_deployment_presets.sql`
(registered at `migrations.rs:157-162`). Next-free is read **from this ledger**, never re-derived from `main`.

| number | file | phase | kind | registration flag |
|---|---|---|---|---|
| `026` | `026_workflow_versions.sql` | **P0** | CREATE TABLE + ALTER `workflows` | mixed (CREATE→`false`; the `workflows.current_version` ALTER→`true`) |
| `027` | `027_recipes_projection.sql` | **P1** | rebuild `recipes` (nullable ext id, `author_kind`, pin cols, `status`, `projection`) | per-statement |
| `028` | `028_run_resolved_graph.sql` | **P3** | CREATE TABLE `run_resolved_graphs` (+`run_inputs`) | `false` |
| `029` | `029_*.sql` | **P6 — conditional** | only if P1's `027` omitted a needed recipe column | `true` for ALTER |
| `030` | `030_*.sql` | **P8 — conditional** | only if an upgrade-audit / share-log table is genuinely needed | `false` |

- **P5 authors NO migration** — presets live in the `recipes.projection` JSON column (P1's `027`).
- P6/P8 default to **no new migration**. If one is unavoidable, P6 = `029`, P8 = `030` — never `026/027`.
- Every migration adds its `include_str!` line to `run_migrations` **in numeric order**, and a
  `migration_NNN_*` registration test. `ALTER TABLE ... ADD COLUMN` migrations pass
  `ignore_duplicate_column = true`; pure `CREATE TABLE/INDEX` pass `false`.
- **Six-place rule** for adding a column to an existing host table (P0/P1): `records.rs` struct +
  `migrations/NNN.sql` + registration + `insert.sql`(+bind) + `update.sql`(+bind, if mutable) + `map_*_row`
  + every `build_*_record` copy. A storage round-trip test must fail loudly on desync.

---

## C2. `WorkflowVersionSnapshot` (resolves CRITICAL: no producer; HIGH: per-node hash, assembly owner)

**Canonical location: `nexus_workflow::WorkflowVersionSnapshot` — PRODUCED BY P0.** P2's earlier "local
stand-in" is **deleted**; P2 imports the P0 type. Every consumer (P1/P2/P3/P4/P5/P6/P7/P8) names exactly this
crate path.

```rust
// nexus-workflow — frozen, validated assembly. The compiler/diff operate on this, never on the live head row.
pub struct WorkflowVersionSnapshot {
    pub workflow_id: String,
    pub version: String,
    pub workflow: Workflow,                          // host DAG (NodeInstance nodes; config: Option<Value>)
    pub operators: Vec<OperatorDefinition>,          // author-time defs, each carrying its config_schema
    pub canonical_hash: String,                      // rollup hash also stored in workflow_versions column
    pub operator_schema_hashes: BTreeMap<String, String>, // node_id -> per-node operator config_schema hash
}
```

- **Per-node `operator_schema_hashes`** (HIGH ③): P0 stores the single rollup `operator_schema_hash` in the
  `workflow_versions` row column, AND populates the per-node map on the snapshot so P8 drift detection can name
  the drifting `node_id`. P8 reads `snapshot.operator_schema_hashes[node_id]`; it does not recompute.
- **Assembly owner** (HIGH ④): P0 produces ALL of:
  - storage read `get_workflow_version(workflow_id, version) -> WorkflowVersionRecord` (`nexus-storage`), and
  - `WorkflowVersionSnapshot::from_workflow(workflow_id, version, canonical_hash, workflow, &[OperatorDefinition])`
    — **pure assembly in `nexus-workflow`** (no storage dep; computes the per-node `operator_schema_hashes`;
    registry-free, matching `validate_workflow` purity), and
  - the record→snapshot **parse** (JSON columns → `Workflow` → `from_workflow`) as a **host helper in `nexus-api`**
    (`workflow_version_record_to_snapshot(record, operators)`). It is NOT `nexus-workflow::from_record`: adding a
    `nexus-storage` dep to `nexus-workflow` would invert layering and risks a cycle via `nexus-extension-deps`.
    Handlers (P3/P4/P6/P8) that load a snapshot call this host helper, passing
    `state.extension_registry.list_operators()`; P2's compiler receives an already-assembled
    `&WorkflowVersionSnapshot`. P3's "if absent, add it" hedge is removed — P0 delivers all three.
- `OperatorDefinition` is **Deserialize-only** (`manifest.rs:175`). The snapshot is serialized for run-freeze
  and bundle export by serializing `workflow` + `inputs` + audit — **never the operator defs**. The `operators`
  field is in-memory only (skip in serde, or reconstruct on load from the registry).

---

## C3. `ResolvedRun` + `ValueSource` (P2 owns; resolves MEDIUM: AppliedSource dup)

```rust
// nexus-recipe — emitted by compile_recipe_run. Resolution + validation only; NO execution.
pub struct ResolvedRun {
    pub workflow_id: String,
    pub workflow_version: String,
    pub resolved_workflow: Workflow,            // frozen working copy with fan-out writes applied
    pub resolved_inputs: serde_json::Map<String, serde_json::Value>, // input:<name> literal values
    pub applied_controls: Vec<AppliedControl>,  // audit powering explain-this-preset / diff-vs-defaults
}
pub struct AppliedControl {
    pub control_id: String,
    pub targets: Vec<String>,                   // every fan-out target string this control wrote
    pub value: serde_json::Value,               // final effective value
    pub source: ValueSource,                    // provenance for OR-4 / explain / diff
}
pub enum ValueSource { Default, Preset, User }  // P2 OWNS this; P5 CONSUMES it (no AppliedSource)
```

`resolved_inputs` is a **side-channel map** (not written into `Workflow.inputs`, which is a port-declaration
list, not a value store). P3's `create_run_from_resolved` persists it as the `run_inputs` payload.

---

## C4. `BindingError` (P2 owns — full canonical enum; resolves HIGH ⑤ + MEDIUM UnknownPreset)

```rust
pub enum BindingError {
    UnknownControl { control_id: String },
    DuplicateControl { control_id: String },             // P2 add: dup control_id in projection -> reject (lock-bypass guard)
    UnknownPreset { preset_id: String },                 // missing preset_id -> reject (not silent)
    LockedOverride { control_id: String },               // USER overrides a `locked` control
    HiddenControlNotSettable { control_id: String },     // USER value on a `hidden` control -> reject
    UnknownTarget { target: String },
    PathResolveFailed { target: String, detail: String },
    TypeMismatch { target: String },
    SchemaViolation { node_id: String, field: String, detail: String },
    OperatorSchemaDrift { node_id: String },
    MissingRequired { control_id: String },
    Workflow(/* wraps validate_workflow errors */),
}
```

**Control-mode semantics (one rule, used by P2 layering AND P5 preset eval):**

| mode | default layer | preset layer | user layer |
|---|---|---|---|
| `basic` / `advanced` | applies | overlays | overlays |
| `locked` | applies | **MAY** overlay | **reject** → `LockedOverride` |
| `hidden` | applies | overlays | **reject** → `HiddenControlNotSettable` |

P2 (`compile_layers_*` tests) and P5 (`hidden_control_*`, `locked_*` tests) assert **reject**, not silent-drop.
HTTP mapping: all `BindingError` → `422 Unprocessable Entity` with the variant in the body (P3/P5/P6/P8 handlers).

---

## C5. Binding grammar + `parse_target` (P2 owns; resolves HIGH: dangling `parse_path`)

Host-canonical grammar (one definition, in `nexus-recipe` `resolver.rs`):

- `input:<name>` — a workflow input port (writes a literal into `resolved_inputs`, value-checked vs `WorkflowPort` type).
- `node:<node_id>.config.<dot.separated.pointer>` — nested JSON pointer into a node's `config`
  (`Option<Value>`; create the map if `None`; descend; `PathResolveFailed` if a scalar blocks descent).

```rust
pub enum BindingTarget { Input(String), NodeConfig { node_id: String, pointer: Vec<String> } }
pub fn parse_target(raw: &str) -> Result<BindingTarget, BindingError>;
```

**The public symbol is `parse_target` (NOT `parse_path`).** `parse_path` is the *deleted* EmotionTTS-private
single-key resolver (`workflow_binding.rs:317`, removed in P7) — no phase references it. P4 (hint resolution),
P6 (exposable-targets emits `node:<id>.config.<key>`), P7 (transcription), P8 (broken-binding check) all reuse
`parse_target`. Nested-pointer support is **net-new P2 work** (EmotionTTS only had single-key).

---

## C6. `RecipeProjection` + `RecipeStatus` (P1 owns; resolves LOW: CompatStatus; HIGH ⑥ refresh; FR-3)

```jsonc
// recipes.projection JSON column (P1 migration 027). snake_case throughout.
{
  "schema_version": 1,
  "sections":  [{ "id": "input", "title": "Input", "order": 0, "control_ids": ["script", "voice"] }],
  "controls":  [{ "control_id": "speech_speed", "kind": "float", "label": "Speech Speed",
                  "help_text": "...", "mode": "basic", "default_value": 1.0, "widget_hint": "slider",
                  "bindings": ["node:synthesis_1.config.speed_factor"] }],
  "presets":   [{ "preset_id": "final", "label": "Final", "source": "recipe",
                  "values": { "speech_speed": 1.0 } }],            // source: extension | recipe | user
  "output":    { "primary_artifact": "audio", "secondary": [], "preview_style": "player",
                  "show_intermediate": false },
  "custom_ui": { "extension_id": "...", "component_ref": "..." }    // FR-3 — OPTIONAL; null for generated UI
}
```

- `kind` ∈ `string|enum|bool|int|float|asset|preset_selector`. `mode` ∈ `basic|advanced|hidden|locked`.
- **`custom_ui`** (FR-3) is representable in P1's model from day one; *rendering* of a custom UI bundle is
  the FR-10 contract (see C8) — storing the reference is not the same as rendering it.

```rust
#[serde(rename_all = "snake_case")]
pub enum RecipeStatus { Healthy, Outdated, Broken }   // serializes to "healthy"|"outdated"|"broken"
// RecipeDto.status is a String (the lowercased variant). TS union: 'healthy'|'outdated'|'broken'.
```

- **One status name everywhere: `RecipeStatus`.** P8 must use `RecipeStatus` (not `CompatStatus`); if P8's
  bundle wants a distinct compatibility-summary type it defines `BundleCompatSummary` explicitly, never borrows.
- **Two entry points (P1 owns both):**
  - `compute_status(pinned_version, pinned_exists, current_version, bindings_ok, schema_drift) -> (RecipeStatus, Option<String>)` — pure primitive.
  - `assess_status(projection, pinned_snapshot, current_snapshot, operators) -> (RecipeStatus, Option<String>)` — runs binding checks + `compute_status`. **P6 and P8 call `assess_status`** (not the 3-arg primitive).
- **Status refresh-on-version-change (HIGH ⑥, FR-7/§4.2/§10):** P1 owns `refresh_status_for_workflow(db, workflow_id)`
  which enumerates recipes pinned to `workflow_id`, recomputes via `assess_status`, and persists the cached
  `status` column. **P1 wires it into the two version-advance sites P0 creates** — `update_workflow_graph`
  (after advancing `current_version`) and the boot/activation re-scan append in `app.rs`. §10 test
  `cached_status_refreshes_on_version_change` lives in P1.

---

## C7. Routes + handler module layout + boundary tests (resolves MEDIUM: route/module/boundary ownership)

**Workflow-versions subtree — P0 is the SOLE owner/registrar:**

- `GET /api/v1/workflows/{id}/versions`
- `GET /api/v1/workflows/{id}/versions/{version}`
- `GET /api/v1/workflows/{id}/versions/{version}/exposable-targets` — **handler authored by P6** (in
  `recipes/exposable_targets.rs`) but its **route is registered adjacent to P0's version routes**, registered
  once. P6 does NOT add a `/workflows/...` route inside `recipes::router()`.

> Note: this router uses axum **`{id}` brace syntax** (`router.rs:179/197/235`), not `:id`.

**Recipes subtree — `handlers/recipes/` directory, promoted by P3 (first writer):**

| route | method | phase | module |
|---|---|---|---|
| `/api/v1/recipes`, `/recipes/{id}` | GET | (exists) | `recipes/read.rs` |
| `/api/v1/recipes/{id}/run` | POST | P3 | `recipes/run.rs` |
| `/api/v1/recipes/{id}/form` | GET | P4 | `recipes/form.rs` |
| `/api/v1/recipes`, `/recipes/{id}` | POST/PUT/DELETE | P6 | `recipes/write.rs` |
| `/api/v1/recipes/{id}/presets` (+ explain/diff reads) | POST/GET | P5 | `recipes/presets.rs` |
| `/api/v1/recipes/{id}/upgrade-preview`, `/recipes/{id}/upgrade` | GET/POST | P8 | `recipes/upgrade.rs` |
| `/api/v1/recipes/{id}/bundle`, `/recipes/import` | GET/POST | P8 | `recipes/share.rs` |
| `/api/v1/deployments/{id}/runs` (extended) | POST | P3 | `deployments/handlers.rs` |

- **P3 promotes the flat `handlers/recipes.rs` → `handlers/recipes/` dir** (`mod.rs` + `router.rs` exposing
  `recipes::router()`), moving the existing GET handlers into `read.rs`. P4/P5/P6/P8 add modules under the dir
  and register via `recipes::router()`. **Exactly one** of `.nest("/recipes", recipes::router())` survives —
  no leftover flat `.route("/recipes/...")` double-mount.
- All routes are **generic-by-`{id}`** over host rows (recipes, workflows, workflow_versions) — host-overlay
  precedent (`install` `router.rs:179`, `idle_timeout` `:197`, deployments `handlers.rs:34`).

**Boundary tests (two, scoped per crate):**

1. `cargo test -p nexus-recipe --test boundary_test` — walks **only** `crates/nexus-recipe/src`; FORBIDDEN
   ext-id literal list + no-node-id-shaped-constant assertion (mirrors `nexus-extension-deps/tests/boundary_test.rs`).
2. **nexus-api-side** boundary test — stood up by **P3** (first to add a recipe handler), walks the new
   `handlers/recipes/` modules + the extended deployments run handler for FORBIDDEN ext-id literals. **P4/P6/P8
   extend this same test** for their handler modules. The nexus-recipe test does NOT `include_str!` nexus-api files.

---

## C8. Requirement coverage assignments (resolves completeness gaps)

| req | owner phase(s) | contract |
|---|---|---|
| **FR-3** output presentation rules | P1 stores `output{}`; **P4 renders** result panel from `projection.output` (primary/secondary/`preview_style`/`show_intermediate`) + test | C6 |
| **FR-3** custom_ui reference | P1 stores `custom_ui?`; rendering = FR-10 | C6 |
| **FR-7** outdated visibility | P1 `status` + refresh hook; P8 badge reads `status` only | C6 |
| **FR-7** upgrade **risk summary** | **P8** `RecipePinDiff.risk { Safe \| Outdated \| Breaking }` (derived from broken-bindings/schema-drift) + UI banner test | — |
| **FR-10 / FR-10.1** custom-UI contract | **P3** owns it: any UI (generated or custom) MUST submit through `POST /recipes/{id}/run` → `compile_recipe_run`, so it *physically cannot* invent params or bypass validation. P3 adds a regression test that a **legacy custom recipe UI still loads/runs** post-migration. **P7** asserts EmotionTTS stays script-first/preset-rich (FR-12). | — |
| **FR-11 / FR-12** video adoption | **DEFERRED** (explicit, see C9). Voice (EmotionTTS, P7) is the sole in-scope adopter; svi2-pro/video keep their RPCs. | §12 |
| **OR-1** validate at save AND run | P3 (run) + P5 (preset save) + P6 (builder save) — named as a spanning acceptance item in each | C4 |
| **OR-2** deterministic export | P8 bundle round-trip (JCS sha256 stable digest) | — |
| **OR-4** inspectability | (1) pinned version: P1/P8; (2) recipe bindings + (3) preset fan-out targets: P5 explain over `applied_controls`; (4) underlying graph: **P4 or P8** opens the **pinned snapshot** in `GraphView` (NOT the mutable head) | C2/C3 |
| status refresh on version change | P1 helper + P0 call sites (C6) | C6 |

---

## C9. Explicitly deferred (extends design §12)

- **FR-11/FR-12 video adoption** — voice-first this program; video (svi2-pro/LTX/LongCat) keeps its own RPC
  pipeline and migrates in a later program. Rationale: host run engine stays a skeleton (§12); a video adopter
  adds no new contract surface beyond what EmotionTTS proves.
- Conditional/computed binding targets + `node:<id>.input:<port>` — projection `schema_version` 2.
- Host run engine as a real operator executor — stays a skeleton; real execution is extension-side.
- Normalized projection storage — only if JSON-column querying becomes a bottleneck.
- Custom-UI **rendering** (loading a custom component bundle) — the FR-10 *contract* is owned (C8); rendering a
  bespoke bundle beyond the generated form / existing EmotionTTS UI is out of this program.

---

## C10. Boundary discipline (applies to every phase — `.claude/rules/host-extension-boundary.md`)

- `crates/nexus-recipe` and all new handlers are **generic by `control_id` + path string** — zero extension-id
  literals, zero hardcoded node ids. EmotionTTS specifics (15 controls, `*_1` ids, the `output_format` 2-target
  fan-out) live in **extension projection DATA** (C6), never in `nexus-recipe`.
- `nexus-recipe` depends ONLY on host crates (`nexus-workflow`, …); it never routes through `nexus-builtins`
  (the sole sanctioned extension-coupling bridge) and never imports an extension crate.
- `nexus-api` adds a host→host `[dependencies]` path dep on `nexus-recipe` (P1/P3). `nexus-core`/`nexus-api`
  stay extension-free.
- Do NOT extend the grandfathered `recipe.id.includes('chat'|'rag')` icon heuristic
  (`recipe_catalog.tsx:35-36`); the P8 status badge reads `recipe.status` only.
- House style / hooks: new-code body comments ≤2 lines (docstrings exempt — the `check-comment-write` hook
  blocks longer and breaks when shell cwd drifts off repo root; edit from repo root). Web: `vars.*` tokens or
  `// audit-allow: px — reason`; stub `scrollIntoView`/`matchMedia` in vitest.
