# P2: Binding compiler (keystone) — Implementation Plan (nexus-dnn, 2026-06-23)

All shared shapes/numbers/routes per 2026-06-23-recipes-00-CONTRACTS.md — this plan does not re-derive them.

## Goal

Add the host-owned binding compiler to `nexus-recipe`: `compile_recipe_run(projection, snapshot, control_values, preset_id) -> ResolvedRun`. It layers `defaults → preset → user` control values (rejecting `LockedOverride`, never user-setting `hidden`), resolves each control's fan-out bindings onto a working copy of the host `nexus_workflow::Workflow` (writing node `config` via a nested JSON pointer and workflow `inputs` as `NodeInput::Literal`), validates the mutated graph via `validate_workflow` + a **new public** `validate_node_config` wrapper + a **new input-value check** against `WorkflowPort` types, and emits a `ResolvedRun` carrying the frozen graph and an `applied_controls` audit. **Resolution + validation only — zero execution.** Done = the full compiler test suite is green with zero extension-id literals and zero hardcoded node ids.

## Current state (verified)

Verified against current `main` (HEAD `edb5b870`, 2026-06-23). The design is dated 2026-06-14; deltas noted. P1 plan (`docs/superpowers/plans/2026-06-23-recipes-P1-projection-model.md`) is the upstream contract this phase builds on.

- **Host workflow model is `NodeInstance`, not `Node`.** `crates/nexus-workflow/src/model.rs:5-16` `Workflow { id, title, version, inputs: Vec<WorkflowPort>, outputs: Vec<OutputBinding>, nodes: Vec<NodeInstance>, stages: Vec<Stage>, created_at, updated_at }`. `NodeInstance` (model.rs:31-38) = `{ id: String, operator: String, stage: Option<String>, inputs: HashMap<String, NodeInput>, config: Option<serde_json::Value> }`. **The design slice header says `Node`; there is NO type named `Node` — any plan code using `Node` will not compile.** Use `NodeInstance`.
- **`NodeInput`** (model.rs:40-45) is `#[serde(untagged)] { Reference { from: String } | Literal { value: serde_json::Value } }`. Projecting a control value onto a workflow input port = a `NodeInput::Literal`.
- **`WorkflowPort`** (model.rs:18-23) = `{ name: String, port_type: String /* serde rename "type" */ }`. Today port types are only matched **port-to-port** as opaque strings (validation.rs:27-41) — there is **no value-vs-type check** for a literal projected onto an input. That check is net-new P2 work.
- **`validate_workflow`** (`crates/nexus-workflow/src/validation.rs:72-80`): `pub fn validate_workflow(&Workflow, &[OperatorDefinition]) -> Result<Vec<String>, WorkflowError>` → runs `validate_dag` → `validate_port_types` → `resolve_operator_bindings`; returns topo-sorted node ids. Reuse as-is.
- **`check_node_config` is PRIVATE** (validation.rs:245-272): `fn check_node_config(node: &NodeInstance, op_def: &OperatorDefinition) -> Result<(), WorkflowError>`, reachable only transitively via `resolve_operator_bindings` (validation.rs:66). It **silently returns `Ok` when `op_def.config_schema` is `None` OR `node.config` is `None`** (validation.rs:249-255), then compiles `jsonschema::draft7::new(schema_value)` and runs `schema.validate(config)`, mapping failures to `WorkflowError::InvalidConfig { node_id, detail }`. A **public `validate_node_config` wrapper does not exist** — net-new (design §5, §3.1).
- **Operator resolution from the registry is caller-side.** `validate_workflow` is pure over the passed `&[OperatorDefinition]`. Callers fetch via `state.extension_registry.list_operators()` (e.g. `crates/nexus-api/src/handlers/workflows.rs:70`). Inside validation, `build_operator_map` (validation.rs:162-167) keys `(id, version)`; `parse_operator_ref` (validation.rs:169-174) splits `node.operator` on the **last** `@` (`rsplit_once('@')`). So the compiler accepts the operator slice from its caller (the snapshot), not a registry.
- **`OperatorDefinition`** (`crates/nexus-extension/src/manifest.rs:169-181`): `{ spec_version, operator: OperatorInfo, execution, inputs: Option<Vec<PortSpec>>, outputs: Option<Vec<PortSpec>>, config_schema: Option<serde_json::Value>, resources, ui }` — **`Deserialize` only, NOT `Serialize`**. `OperatorInfo` (manifest.rs:183-190) holds `id`/`version`. `PortSpec` (manifest.rs:199-206) = `{ name, port_type /* rename "type" */, required: Option<bool>, default: Option<Value> }`.
- **`WorkflowError`** (`crates/nexus-workflow/src/error.rs:1-40`) is the validation error enum (`CycleDetected`, `UnknownOperator`, `MissingRequiredInput`, `InvalidConfig{node_id,detail}`, …). The compiler's `BindingError` is a **new, separate** enum in `nexus-recipe` that wraps/maps `WorkflowError`.
- **EmotionTTS `parse_path` is the resolver prior art (single-key only).** `extensions/builtin/emotion-tts/rust/src/workflow_binding.rs:317-344`: accepts `input:<key>` (whole remainder, flat) and `node:<id>.config.<key>` where `<key>` is taken **verbatim — NOT split on dots** (so `a.b` is one map key). It operates on EmotionTTS's own flat `WorkflowDocument` (`config: BTreeMap<String,Value>`), structurally different from the host model. **The host grammar (§4.2 / §5) must support a NESTED JSON pointer after `config.` — that nesting is net-new P2 work, not inherited.** The `RecipeField`/`targets()`/`CURATED_*` tables are extension-private and are **not** lifted; fan-out comes from `recipe.bindings` (data).
- **P1 produces what P2 consumes** (P1 plan, file above): crate `nexus-recipe` exists with `src/lib.rs`, `src/status.rs`, `src/projection.rs` (`RecipeProjection { schema_version, sections, controls, presets, output }`, `CURRENT_PROJECTION_SCHEMA_VERSION = 1`), `src/backfill.rs`, and a `nexus-workflow` path dep already in `Cargo.toml`. A control carries `control_id`, `kind`, `mode` (`basic|advanced|hidden|locked`), `default_value`, and `bindings: Vec<String>` (the fan-out target strings). A preset carries `values: Map<control_id, Value>`. **P2 adds `src/compiler.rs` + resolver/error/resolved modules onto this skeleton.**

**Drift from the 2026-06-14 design:** (1) `Node` → `NodeInstance` everywhere. (2) `check_node_config` private at validation.rs:**245** (design said 245-272 — accurate). (3) the EmotionTTS resolver is single-key; nested-pointer support is explicit new work. (4) `WorkflowVersionSnapshot` is the **canonical P0** type `nexus_workflow::WorkflowVersionSnapshot` (CONTRACTS C2) carrying the host `Workflow` + `operators` + `canonical_hash` + per-node `operator_schema_hashes`; P2 imports it directly — no local stand-in (a hard P0 precondition).

## Approach

Keep the compiler **pure and DB-free** in `nexus-recipe`: it takes data in (`&RecipeProjection`, `&WorkflowVersionSnapshot`, `&ControlValues`, `Option<&str>`) and returns `Result<ResolvedRun, BindingError>`. No registry access, no storage, no execution — the caller (P3 API handler) resolves the snapshot + operator slice and persists/runs the result.

Four-stage algorithm (design §5), each independently unit-tested:

1. **Layer effective values** — `default_value` per control, overlay preset `values`, overlay user `control_values`; reject a user value targeting a `locked` control (`LockedOverride`); never accept a user value for a `hidden` control (default/preset only); error `UnknownControl` for a user key with no matching control; error `MissingRequired` for a required control with no effective value.
2. **Resolve fan-out onto a working copy** — clone `snapshot.workflow`; for each `(control, effective_value)` and each binding string, parse into `BindingTarget { Input(String) | NodeConfig { node_id, pointer: Vec<String> } }`, then **write every target** (fan-out). Node config write: if `config` is `None`, create `Value::Object`; descend the JSON pointer creating intermediate objects; set the leaf. Input write: record the literal into a `resolved_inputs` map keyed by port name (the run engine consumes that). This is the **net-new host-model writer**.
3. **Validate** — `validate_workflow(&working_copy, &snapshot.operators)` (cycle/topo/port-type/operator-resolve + transitive config validation); additionally call the new public `validate_node_config(node, op_def)` per touched node for a precise per-node error; and run the **input-value check** (each resolved input value vs its `WorkflowPort.port_type`). Map any `WorkflowError` into the matching `BindingError`.
4. **Emit `ResolvedRun`** — `{ workflow_id, workflow_version, resolved_workflow, resolved_inputs, applied_controls }`. `applied_controls` is the `control_id → targets → final value → source` audit. **No execution.**

**Control-mode table (CONTRACTS C4 — the one layering rule, shared with P5 preset eval):**

| mode | default layer | preset layer | user layer |
|---|---|---|---|
| `basic` / `advanced` | applies | overlays | overlays |
| `locked` | applies | **MAY** overlay | **reject** → `LockedOverride` |
| `hidden` | applies | overlays | **reject** → `HiddenControlNotSettable` |

P2 (`compile_layers_*` + the reject tests) asserts **reject**, not silent-drop, matching P5's `hidden_control_*` / `locked_*` tests. All `BindingError` → `422` at the HTTP boundary (P3/P5 handlers).

Generalize the EmotionTTS resolver into a host primitive (new `src/resolver.rs`) that **splits the post-`config.` tail on `.` into a pointer vector** (the nesting EmotionTTS lacks). Keep `BindingError` (new enum in `src/error.rs`) separate from `WorkflowError` and map between them. Everything stays generic by `control_id` and path string; the boundary test from P1 already guards the crate.

## Changes (ordered steps)

1. **Public `validate_node_config` wrapper** — `crates/nexus-workflow/src/validation.rs`. Add `pub fn validate_node_config(node: &NodeInstance, op_def: &OperatorDefinition) -> Result<(), WorkflowError>` that delegates to (or absorbs the body of) the private `check_node_config` (validation.rs:245); keep `check_node_config` as a thin private caller or fold it in. Export from `crates/nexus-workflow/src/lib.rs:11-13` (`pub use validation::{… , validate_node_config}`). Why: design §3.1/§5 — the compiler needs a per-node config validator entrypoint; today it is private.
   - Preserve the silent-skip behavior (Ok when `config_schema` or `node.config` is `None`) — the compiler relies on `validate_workflow`'s `MissingRequiredInput` + the input-value check for presence, not on `validate_node_config`.

2. **New `src/error.rs` in `nexus-recipe`** — `pub enum BindingError`, the **full canonical enum from CONTRACTS C4** (verbatim — do not trim): `UnknownControl { control_id }`, `UnknownPreset { preset_id }`, `LockedOverride { control_id }`, `HiddenControlNotSettable { control_id }`, `UnknownTarget { target }`, `PathResolveFailed { target, detail }`, `TypeMismatch { target }`, `SchemaViolation { node_id, field, detail }`, `OperatorSchemaDrift { node_id }`, `MissingRequired { control_id }`, and `Workflow(WorkflowError)` (`#[from]` to absorb `validate_workflow` failures). Derive `Debug, thiserror::Error`. **`HiddenControlNotSettable` and `UnknownPreset` are distinct rejecting variants** — a user value on a `hidden` control is REJECTED with `HiddenControlNotSettable` (NOT reused `LockedOverride`, NOT silent); a missing `preset_id` is REJECTED with `UnknownPreset`. HTTP mapping: every `BindingError` → `422 Unprocessable Entity` with the variant in the body (P3/P5 handlers). Why: typed compiler errors distinct from `WorkflowError`, named consistently for the whole program.

3. **New `src/resolver.rs` in `nexus-recipe`** — host-canonical grammar (CONTRACTS C5; generalized from EmotionTTS, with nesting). The public symbol is **`parse_target` (NOT `parse_path`)** — `parse_path` is the deleted EmotionTTS-private single-key resolver and is referenced by no phase.
   - `pub enum BindingTarget { Input(String), NodeConfig { node_id: String, pointer: Vec<String> } }` (CONTRACTS C5).
   - `pub fn parse_target(raw: &str) -> Result<BindingTarget, BindingError>`: `input:<name>` → `Input(name)` (reject empty); `node:<id>.config.<a.b.c>` → split `<id>` on first `.`, strip the literal `config.` prefix, then **split the remaining tail on `.` into `pointer: Vec<String>`** (the nesting EmotionTTS lacks); reject malformed / empty segments / missing `config.` infix with `PathResolveFailed`.
   - `pub fn write_node_config(node: &mut NodeInstance, pointer: &[String], value: Value) -> Result<(), BindingError>`: if `node.config` is `None`, set `Some(Value::Object(Map::new()))`; descend the pointer, creating intermediate `Object`s, error `PathResolveFailed` if a segment collides with a non-object; set the leaf.
   - Why: the reusable resolver primitive (design §1, §5 step 2) — generic, no node-id literals.

4. **New `src/resolved.rs` in `nexus-recipe`** — `pub struct ResolvedRun { workflow_id: String, workflow_version: String, resolved_workflow: nexus_workflow::Workflow, resolved_inputs: BTreeMap<String, Value>, applied_controls: Vec<AppliedControl> }` and `pub struct AppliedControl { control_id: String, targets: Vec<String>, value: Value, source: ValueSource }`; `pub enum ValueSource { Default, Preset, User }`. Derive `Clone, Debug, Serialize, Deserialize`. **`ValueSource` is OWNED here (CONTRACTS C3) and lives on `AppliedControl`** — P5 CONSUMES it for explain/diff; there is no separate `AppliedSource`. Why: the validated output payload + audit (design §5 step 4).

5. **`WorkflowVersionSnapshot` consumption (CONTRACTS C2)** — import the canonical P0 type `nexus_workflow::WorkflowVersionSnapshot`; **do not** define a local stand-in. P0 delivery is a hard precondition (CONTRACTS C2: "P2's earlier 'local stand-in' is deleted; P2 imports the P0 type"). The canonical shape is `{ workflow_id, version, workflow: Workflow, operators: Vec<OperatorDefinition>, canonical_hash: String, operator_schema_hashes: BTreeMap<String, String> }` — note `version` (not `workflow_version`) and the per-node `operator_schema_hashes` map. The compiler reads `snapshot.workflow` + `snapshot.operators`; it does not recompute hashes. Add `nexus-extension` as a `nexus-recipe` dep if not already present (needed for `OperatorDefinition` in the snapshot). Why: one assembly path program-wide (CONTRACTS C2 `from_record`); the compiler signature is unaffected by the swap.

6. **New `src/compiler.rs` in `nexus-recipe`** — the keystone:
   ```rust
   // compile_recipe_run: layer values, fan-out onto a copy, validate, emit. No execution.
   pub fn compile_recipe_run(
       projection: &RecipeProjection,
       snapshot: &WorkflowVersionSnapshot,
       control_values: &ControlValues,
       preset_id: Option<&str>,
   ) -> Result<ResolvedRun, BindingError>
   ```
   - `pub type ControlValues = BTreeMap<String, serde_json::Value>` (keyed by `control_id`).
   - **Stage 1 layering** (`effective_values`): start from each control's `default_value`; if `preset_id`, look it up in `projection.presets` (`UnknownPreset` if the id is absent) and overlay its `values` (`UnknownControl` if a preset value names a missing control); overlay `control_values` rejecting `LockedOverride` for `mode == locked` and `UnknownControl` for unknown keys; reject a user override of a `mode == hidden` control with **`HiddenControlNotSettable`** (default/preset may still set hidden controls — only the USER layer is rejected); `MissingRequired` if a required control has no effective value. Record `ValueSource` per control for the audit. This layering follows the **control-mode table below** verbatim.
   - **Stage 2 fan-out** (`apply_bindings`): `let mut wf = snapshot.workflow.clone();` then for each control's effective value, for each binding in `control.bindings`, `parse_target` → on `Input(name)` record into `resolved_inputs`; on `NodeConfig{node_id, pointer}` find the node (`UnknownTarget` if absent) and `write_node_config`. Collect `AppliedControl` rows.
   - **Stage 3 validate**: `validate_workflow(&wf, &snapshot.operators).map_err(BindingError::from)?`; per touched node call `validate_node_config`; then `check_input_values(&wf, &resolved_inputs)` (step 7).
   - **Stage 4 emit**: build `ResolvedRun`.
   - Why: design §5 — the keystone. Generic by `control_id` + path string; zero ext-id literals; zero node-id literals.

7. **Input-value check** — local helper in `src/compiler.rs`: `fn check_input_values(wf: &Workflow, resolved_inputs: &BTreeMap<String, Value>) -> Result<(), BindingError>`. For each `(name, value)`, find the matching `WorkflowPort` (`UnknownTarget` if no such port), assert the JSON value's shape matches `port.port_type` (`"string"|"text"` → string, `"int"|"integer"` → integer, `"float"|"number"` → number, `"bool"|"boolean"` → bool; unknown port types pass permissively). Error `TypeMismatch { target }` (CONTRACTS C4 — single `target` field; the expected/got detail belongs in logs, not the variant). Why: design §5 step 3 — today only port-to-port strings are matched (model.rs:18-23); a literal projected onto an input port needs a value check.

8. **Wire modules + exports** — `crates/nexus-recipe/src/lib.rs`: `pub mod compiler; pub mod resolver; pub mod resolved; pub mod error;` (no local `snapshot` module — `WorkflowVersionSnapshot` comes from `nexus-workflow`, CONTRACTS C2) and re-export `compile_recipe_run`, `ResolvedRun`, `AppliedControl`, `ValueSource`, `BindingError`, `BindingTarget`, `ControlValues`. Why: public surface consumed by P3.

9. **Preset evaluation reuse** — no separate path: presets are evaluated by calling `compile_recipe_run` with `preset_id = Some(...)` and empty `control_values`, so a preset validates identically to a manual run (design §5). Document as an invariant (covered by the parity test, no new code).

## TDD test plan

Write RED first (all assert the not-yet-built `nexus_recipe::compile_recipe_run` + helpers), then implement steps 1-8 to GREEN. `cargo test -p nexus-recipe`. Build fixtures with a tiny 2-3 node `Workflow` + matching `OperatorDefinition`s carrying a `config_schema` (draft-07) and `WorkflowPort` inputs (inline builder; no DB, no registry).

### `crates/nexus-workflow` (wrapper)
- `validate_node_config_is_public_and_passes_valid_config` — a node whose `config` satisfies the operator `config_schema` returns `Ok`.
- `validate_node_config_rejects_schema_violation` — a config violating the schema returns `WorkflowError::InvalidConfig { node_id, .. }`.
- `validate_node_config_skips_when_no_schema_or_no_config` — `config_schema: None` OR `node.config: None` returns `Ok` (preserve existing silent-skip).

### `crates/nexus-recipe` — resolver (`src/resolver.rs`)
- `parse_target_input_port` — `"input:script_text"` → `BindingTarget::Input("script_text")`.
- `parse_target_node_config_flat` — `"node:synth.config.speed"` → `NodeConfig{ node_id:"synth", pointer:["speed"] }`.
- `parse_target_node_config_nested` — `"node:synth.config.emotion.alpha"` → `pointer:["emotion","alpha"]` (the EmotionTTS-missing nesting).
- `parse_target_rejects_missing_config_infix` — `"node:synth.speed"` → `PathResolveFailed`.
- `parse_target_rejects_empty_segment` — `"input:"` and `"node:.config.x"` → error.
- `write_node_config_creates_map_when_none` — node `config: None`, write `["speed"]=1.0` → `config` becomes `{"speed":1.0}`.
- `write_node_config_descends_nested_pointer` — write `["emotion","alpha"]=0.5` creates the intermediate object.
- `write_node_config_errors_on_non_object_collision` — leaf path crosses a scalar → `PathResolveFailed`.

### `crates/nexus-recipe` — compiler (`src/compiler.rs`)
- `compile_fans_out_one_control_to_many_targets` — a control with 2 bindings (an `input:` + a `node:.config.`) writes BOTH; `applied_controls` lists both targets.
- `compile_layers_default_then_preset_then_user` — default `1.0`, preset `2.0`, user `3.0` → resolved `3.0`, `ValueSource::User`; preset-only control keeps `Preset`; untouched control keeps `Default`.
- `compile_rejects_locked_override` — user value targeting a `mode:"locked"` control → `BindingError::LockedOverride`.
- `compile_hidden_control_rejects_with_hidden_control_not_settable` — user value for a `mode:"hidden"` control → `BindingError::HiddenControlNotSettable { control_id }` (rejected, NOT silently applied, NOT `LockedOverride`); a default/preset value on the same hidden control still applies.
- `compile_errors_unknown_preset` — `preset_id = Some("ghost")` with no matching preset → `BindingError::UnknownPreset { preset_id }`.
- `compile_errors_unknown_control` — user `control_values` key with no control → `UnknownControl`.
- `compile_errors_missing_required` — required control with no default/preset/user value → `MissingRequired`.
- `compile_errors_unknown_target_node` — binding `node:ghost.config.x` where `ghost` is absent → `UnknownTarget`.
- `compile_resolves_nested_node_config_pointer` — binding `node:emotion.config.global.alpha` writes the nested leaf in the resolved workflow.
- `compile_writes_input_literal_into_resolved_inputs` — `input:script_text` value lands in `resolved_inputs["script_text"]` (not mutating the port list).
- `compile_input_value_type_mismatch` — projecting a string onto a `type:"int"` input port → `TypeMismatch`.
- `compile_schema_violation_rejected` — a control value that makes a node config violate its operator `config_schema` → mapped `Workflow(InvalidConfig)` / `SchemaViolation { node_id, field, detail }`.
- `compile_valid_run_emits_resolved_run_with_audit` — happy path: `ResolvedRun.resolved_workflow` reflects every write, `resolved_inputs` populated, `applied_controls` audit complete with sources, no side effects.
- `compile_preset_parity_with_manual` — compiling with `preset_id=Some("final")` + empty user values yields the SAME `resolved_workflow`/`resolved_inputs` as manually passing that preset's `values` as `control_values` (design §5 preset-as-compiler invariant).

### Boundary (`cargo test -p nexus-recipe --test boundary_test`)
- Re-run the P1 boundary test (walk whole `src/`): assert no `FORBIDDEN` extension-id literals and no node-id-shaped constant (`node:`, `.config.`, `_1.config`) in `crates/nexus-recipe/src/` — the new compiler/resolver/error modules stay generic (parse strings come from data, never literals).

### Implementation order
RED: write the wrapper tests + all resolver + compiler tests. GREEN: step 1 (wrapper) → steps 2-5 (error/resolver/resolved/snapshot types) → steps 6-7 (compiler + input check) → step 8 (exports). Boundary test stays green throughout.

## Acceptance criteria

- `compile_recipe_run(projection, snapshot, control_values, preset_id) -> ResolvedRun` exists in `nexus-recipe` and is pure (no DB, no registry, no execution).
- Layering `defaults → preset → user` works per the control-mode table; **a user override of a `locked` control is rejected (`LockedOverride`)**; **a user value on a `hidden` control is rejected (`HiddenControlNotSettable`)** — hidden stays default/preset-only; a missing `preset_id` is rejected (`UnknownPreset`); `UnknownControl` and `MissingRequired` enforced.
- The **net-new host-model writer** fans out one control to many targets, writes `NodeInstance.config` via a **nested JSON pointer** (creating maps as needed), and records `input:` literals into `resolved_inputs`.
- Validation reuses `validate_workflow` + the **new public `validate_node_config`** wrapper + a **new input-value check** of each input vs its `WorkflowPort` type.
- `ResolvedRun` carries `resolved_workflow` (frozen graph), `resolved_inputs`, and an `applied_controls` audit (control → targets → value → source).
- Preset evaluation is the same compiler path (parity test green).
- **Full compiler test suite green** (`cargo test -p nexus-recipe`); `validate_node_config` wrapper tests green (`cargo test -p nexus-workflow`).
- **Zero extension-id literals / zero hardcoded node ids** in `crates/nexus-recipe/` — `cargo test -p nexus-recipe --test boundary_test` green.

## Dependencies & sequencing

- **Upstream:** **P1** (required) — `nexus-recipe` crate skeleton, `RecipeProjection` model (`controls[].bindings`, `mode`, `default_value`; `presets[].values`), `nexus-workflow` dep. **P0** (required, hard precondition per CONTRACTS C2) — produces `nexus_workflow::WorkflowVersionSnapshot`; P2 imports it directly, no local stand-in.
- **Intra-phase order:** (1) public `validate_node_config` in `nexus-workflow`; (2) `error` + `resolver` + `resolved` types; (3) `compiler` + input-value check; (4) exports. Resolver/types precede the compiler.
- **Downstream consumers:** **P3** (submit routes + `create_run_from_resolved`) consumes `compile_recipe_run` + `ResolvedRun`; **P5** (preset packs) validates presets through this compiler; **P7** (EmotionTTS parity) feeds its bindings through this compiler for resolution-only and asserts parity with the old hardcoded `targets()` table.

## Cross-phase contracts

**PRODUCES:**
- `nexus_workflow::validate_node_config(node: &NodeInstance, op_def: &OperatorDefinition) -> Result<(), WorkflowError>` — new **public** wrapper exported from `crates/nexus-workflow/src/lib.rs`.
- `nexus_recipe::compile_recipe_run(projection: &RecipeProjection, snapshot: &WorkflowVersionSnapshot, control_values: &ControlValues, preset_id: Option<&str>) -> Result<ResolvedRun, BindingError>`.
- `ResolvedRun { workflow_id: String, workflow_version: String, resolved_workflow: nexus_workflow::Workflow, resolved_inputs: BTreeMap<String, Value>, applied_controls: Vec<AppliedControl> }` (`Serialize`/`Deserialize`).
- `AppliedControl { control_id, targets: Vec<String>, value: Value, source: ValueSource }`; `ValueSource { Default | Preset | User }`.
- `BindingTarget { Input(String) | NodeConfig { node_id: String, pointer: Vec<String> } }` + `parse_target` + `write_node_config`.
- `BindingError { UnknownControl | UnknownPreset | LockedOverride | HiddenControlNotSettable | UnknownTarget | PathResolveFailed | TypeMismatch | SchemaViolation | OperatorSchemaDrift | MissingRequired | Workflow(WorkflowError) }` (full canonical enum, CONTRACTS C4).
- `ControlValues = BTreeMap<String, serde_json::Value>`.
- **Host-canonical binding grammar:** `input:<name>` and `node:<node_id>.config.<dot.separated.json.pointer>` (nested supported — deviates from EmotionTTS single-key and from the package's colon form).

**CONSUMES:**
- From **P1**: `RecipeProjection` (`schema_version`, `sections`, `controls[] { control_id, kind, mode, default_value, bindings: Vec<String> }`, `presets[] { preset_id, values: Map }`, `output`); the `nexus-recipe` crate + its `nexus-workflow` dep.
- From **P0** (hard precondition, CONTRACTS C2): `nexus_workflow::WorkflowVersionSnapshot { workflow_id, version, workflow, operators, canonical_hash, operator_schema_hashes }` — the canonical type carrying the host `Workflow` + author-time operator set. No local stand-in.
- From `nexus-workflow`: `Workflow`, `NodeInstance`, `NodeInput`, `WorkflowPort`, `validate_workflow`, `WorkflowError`. From `nexus-extension`: `OperatorDefinition` (Deserialize-only).

## Boundary discipline

- `crates/nexus-recipe` is a **host** crate (`.claude/rules/host-extension-boundary.md`). The compiler, resolver, error, and resolved-run modules are **generic by `control_id` and path string** — **zero extension-id literals, zero hardcoded node ids**. All node ids and config keys arrive as data from `recipe.bindings` / `control_values`; none are written as constants. The EmotionTTS `RecipeField`/`targets()`/`CURATED_*` shape is **not** lifted — only the generic resolver primitive is generalized.
- Enforced by `cargo test -p nexus-recipe --test boundary_test` (walk-whole-`src/` FORBIDDEN-id scan + node-id-shape guard), mirroring `crates/nexus-extension-deps/tests/boundary_test.rs`.
- The compiler validates against the **generic operator set** passed in by the caller (`config_schema` keyed by `id@version`), never an extension-specific table or registry literal.
- `nexus-recipe` depends only on host crates (`nexus-workflow`, `nexus-extension`); it does **not** route through `nexus-builtins` (the sole sanctioned extension-coupling bridge).
- Keep new body comments ≤2 lines (docstrings exempt); edit from repo root — the `check-comment-write.py` PreToolUse hook breaks when shell cwd drifts.

## Risks & mitigations

- **`Node` vs `NodeInstance` naming.** Mitigation: use `NodeInstance` everywhere; verified at model.rs:31-38.
- **EmotionTTS resolver only handles a flat key; host needs nesting.** Mitigation: `parse_target` splits the post-`config.` tail on `.` into a `Vec<String>` pointer; `write_node_config` descends/creates intermediate objects; dedicated nested tests.
- **`check_node_config` silently skips when config/schema absent.** Mitigation: presence is enforced by `validate_workflow`'s `MissingRequiredInput` + the new input-value check, not by `validate_node_config`; documented.
- **`OperatorDefinition` is Deserialize-only.** Mitigation: never serialize it; the snapshot carries it by value for validation, and `ResolvedRun` serializes the `Workflow` + inputs + audit, not the operator defs.
- **P0 is a hard precondition (CONTRACTS C2).** P2 imports `nexus_workflow::WorkflowVersionSnapshot` directly — no local stand-in to keep in sync. If P0 has not landed, P2 is blocked, not forked; sequence P0 before P2.
- **`operator_schema_hashes` drift detection** is P0/P8 territory; `OperatorSchemaDrift { node_id }` is defined in `BindingError` now but only wired when a consumer compares `snapshot.operator_schema_hashes[node_id]` — keep the variant, leave drift-checking to consumers.
- **JSON-pointer write corrupts an existing scalar.** Mitigation: `write_node_config` errors `PathResolveFailed` on a non-object collision rather than overwriting; tested.

## Out of scope

- Submit routes (`POST /recipes/{id}/run`, extended `POST /deployments/{id}/runs`), `create_run_from_resolved`, frozen-graph `execute_run` — **P3**.
- Generated `RecipeForm` + `GET /recipes/{id}/form` — **P4**.
- Preset packs (extension/recipe/user) + explain/diff UI — **P5** (P2 only guarantees preset-as-compiler parity).
- Recipe write API / exposable-targets / Recipe Builder — **P6**.
- EmotionTTS migration + parity E2E (deleting `RecipeField`/`targets()`/`CURATED_*`) — **P7**.
- Workflow versioning storage (`workflow_versions`, `current_version`, `WorkflowVersionSnapshot` as the canonical `nexus-workflow` type) — **P0**.
- Operator-schema-drift computation, outdated/upgrade, shareability bundle — **P0/P8**.
- Conditional/computed targets and `node:<id>.input:<port>` — projection `schema_version` 2 (deferred).
