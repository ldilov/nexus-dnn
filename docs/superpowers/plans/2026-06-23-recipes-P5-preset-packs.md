# P5: Preset packs (extension/recipe/user) — Implementation Plan (nexus-dnn, 2026-06-23)

> **Cross-phase contracts:** All shared shapes/numbers/routes per `2026-06-23-recipes-00-CONTRACTS.md` — this plan does not re-derive them.

## Goal

Make presets a first-class, **data-driven** layer of the recipe projection sourced from three origins — `extension`, `recipe`, and `user` — and evaluated by the **same** `nexus-recipe` compiler that handles a manual run, with the selected preset's `values` applied as the **base layer** beneath user overrides. Add two read-only projections over the compiler's `applied_controls` audit: **explain-this-preset** (what a preset changes in the graph) and **diff-vs-defaults** (which final values came from workflow defaults vs preset vs user). Done looks like: a preset id submitted through `POST /recipes/{id}/run` resolves+validates identically to typing those same values by hand, user presets persist on host-owned recipe rows, and the explain/diff endpoints return correct per-control provenance with zero new execution paths.

## Current state (verified)

This phase consumes P0/P1/P2 outputs and adds the preset layer on top. Verified anchors against current code (HEAD `edb5b870`, 2026-06-23):

- **Compiler entry point (P2, consumed).** The design's keystone signature is `compile_recipe_run(projection, snapshot, control_values, preset_id: Option<&str>) -> Result<ResolvedRun, BindingError>` (design §5). The `preset_id` parameter and the `applied_controls` audit field on `ResolvedRun` are **already in P2's contract** — P5 does not change the compiler signature; it fills in the preset-layering algorithm step 1 ("overlay that preset's `values`") and adds the read-only projections. `ResolvedRun` carries `applied_controls` = control → targets → final-value audit, where each entry already includes `source: ValueSource { Default, Preset, User }` (CONTRACTS C3 — **P2 owns and populates this field**; P5 only reads it, and defines NO `AppliedSource`).
- **Projection presets (P1, consumed).** `recipes.projection` is a JSON column (P1) holding `presets: [{ preset_id, label, description, source: "extension"|"recipe"|"user", values }]` (design §4.2). P5 formalizes the `source` field semantics and adds user-preset persistence.
- **Validation reuse.** `validate_workflow(workflow, operators) -> Result<Vec<String>, WorkflowError>` is public at `crates/nexus-workflow/src/validation.rs:72`; the per-node config validator `check_node_config` is **private** at `validation.rs:245` and P2 adds the public `validate_node_config` wrapper. P5 reuses both transitively through the compiler — it does **not** call validation directly.
- **Recipe DTO + handlers (host).** `RecipeDto` at `crates/nexus-api/src/dto/recipes.rs:12-27` (ts-rs exported); recipe routes are GET-only: `GET /recipes`, `GET /recipes/{id}` at `crates/nexus-api/src/router.rs:234-235`; handlers `list_recipes`/`get_recipe` at `crates/nexus-api/src/handlers/recipes.rs:10,23`. **P3 promotes the flat `handlers/recipes.rs` → `handlers/recipes/` dir** with `recipes::router()` (CONTRACTS C7); P5 adds its `handlers/recipes/presets.rs` module under that dir and registers via `recipes::router()` — it does NOT add flat `.route("/recipes/...")` lines in the top-level `router.rs`.
- **Recipe persistence is delete-then-reinsert per extension** in TWO places: `crates/nexus-core/src/app.rs:795-828` (boot) and `crates/nexus-api/src/mapping.rs:59-123` (HTTP install). P1 scopes that delete to `author_kind='extension'`; P5 user presets live inside a **user**-authored recipe row's `projection`, so an extension re-scan must not touch them (covered by the P1 guard; P5 adds a regression test).
- **Migration numbering/registration.** Per CONTRACTS C1, **P5 authors NO migration** — presets live inside the existing P1 `recipes.projection` JSON column (P1's migration 027). The C1 ledger reserves 026–030 (026=P0 … 030=P8-conditional); P5 holds no number. Any host migration MUST be hand-registered in `crates/nexus-storage/src/sqlite/migrations.rs` `run_migrations` via `execute_migration_statements(pool, include_str!("../../../../migrations/NNN_*.sql"), <bool>)` — dropping the file alone is inert (known prior root bug) — but P5 adds none. A denormalized diff cache is out of scope (see Out of scope).
- **Unrelated precedent — `crates/nexus-deployments` "deployment presets" (migration 025, `crates/nexus-deployments/src/service/preset.rs`, `tests/preset_boundary.rs`) is a DIFFERENT concept** (a named deployment-export envelope keyed by recipe) — NOT the projection-level preset packs of this phase. Do not extend or couple to it. Reuse only its **boundary-test pattern** (`include_str!` source scan + FORBIDDEN list, `tests/preset_boundary.rs:1-39`).

Drift from the 2026-06-14 design: none material for P5. The design's P5 acceptance row ("Preset packs from extension/recipe/user evaluated by the SAME compiler … explain/diff read-only over `applied_controls`") is intact. P5 is small precisely because P2 already reserved `preset_id` + `applied_controls`.

## Approach

Treat presets as **pure data layered by the compiler**, never as a separate code path. The strategy:

1. **Lock the preset evaluation semantics inside the compiler.** Step 1 of `compile_recipe_run` becomes: effective value = control `default_value`, then overlay selected preset's `values` (matched by `preset_id` against `projection.presets`), then overlay user `control_values`. Per the single control-mode rule in CONTRACTS C4: a USER override of a `locked` control → **reject** with `LockedOverride` (an author preset MAY overlay a locked control); a USER value on a `hidden` control → **reject** with `HiddenControlNotSettable` (NOT silent-ignore — preset+default still apply to hidden controls, but a user value is a hard error). This makes "preset run" and "manual run" the same evaluation, just with a different base layer — exactly the acceptance.
2. **Read provenance off `applied_controls`.** Each `applied_controls` entry already carries `source: ValueSource` (`Default`|`Preset`|`User`) — the field is **owned and populated by P2** (CONTRACTS C3); P5 adds no new source field and defines no `AppliedSource`. Explain/diff are pure read projections over that existing field, with no recomputation.
3. **Surface presets + provenance read-only first** (`GET /recipes/{id}/presets`, `GET /recipes/{id}/explain?preset_id=…`, `GET /recipes/{id}/diff?preset_id=…&control_values=…`) — these are projections over a compile result, host-generic.
4. **Add user-preset write** (`POST /recipes/{id}/presets`, `DELETE /recipes/{id}/presets/{preset_id}`) that mutates the `projection.presets` array of a **user-authored** recipe only (extension/recipe presets are read-only), validating the new preset through the compiler before persisting (a preset that fails compile is rejected at save — same gate as manual run).
5. **Keep everything host-generic** (generic by `control_id`/path string), wire the `nexus-recipe` boundary test to also cover the new preset modules, and add the EmotionTTS-parity-adjacent test that an extension re-scan leaves user presets intact.

No execution path is added: presets feed the existing P3 `create_run_from_resolved` consumption point only via `compile_recipe_run`.

## Changes (ordered steps)

> All Rust changes live in host crates `nexus-recipe` (compiler + projection model) and `nexus-api` (handlers/DTOs). Zero extension-id literals. Edit from repo root so the comment-write hook resolves.

1. **`crates/nexus-recipe/src/projection.rs` — formalize the preset model.**
   Define (or confirm from P1) `PresetSource { Extension, Recipe, User }` (serde `snake_case`) and `Preset { preset_id: String, label: String, description: Option<String>, source: PresetSource, values: BTreeMap<String, serde_json::Value> }`. Add `RecipeProjection::preset(&self, preset_id: &str) -> Option<&Preset>` and `RecipeProjection::presets_by_source(&self, source: PresetSource) -> impl Iterator<Item=&Preset>`. Why: the compiler and handlers need a typed, source-aware lookup; keeps preset values opaque `serde_json::Value` keyed by `control_id`.

2. **`crates/nexus-recipe/src/compiler.rs` — implement preset layering in step 1 of `compile_recipe_run`.**
   In the effective-value layering loop: seed from `control.default_value`; if `preset_id` is `Some`, look up the preset (return `BindingError::UnknownPreset { preset_id }` if absent) and overlay its `values` per matching `control_id`; then overlay user `control_values`. Enforce `mode` per CONTRACTS C4: a `user` value on a `locked` control → **reject** `LockedOverride` (author preset MAY overlay locked); a `user` value on a `hidden` control → **reject** `HiddenControlNotSettable` (NOT silent-ignore; preset+default still apply to the hidden control). Why: this is the single place that makes preset-run == manual-run; presets are validated by the same downstream `validate_workflow` + `validate_node_config` already in P2.

3. **`crates/nexus-recipe/src/resolved.rs` (or wherever `ResolvedRun`/`applied_controls` live) — consume P2's per-control provenance (no new type).**
   The `applied_controls` entry type **already** carries `source: ValueSource { Default, Preset, User }`, owned and populated by P2's compiler during layering (CONTRACTS C3). P5 defines **no** `AppliedSource` and adds **no** source field — it reads the existing `ValueSource` directly. Why: explain/diff become pure reads over P2's audit, no second compile of "defaults only" and no duplicate provenance enum.

4. **`crates/nexus-recipe/src/explain.rs` (new) — read-only projections.**
   Add two pure functions over a compiled `ResolvedRun`:
   - `explain_preset(resolved: &ResolvedRun) -> PresetExplanation` → list of `{ control_id, label, final_value, targets: [path strings], source }` for controls whose `source == Preset` (what this preset changes in the graph).
   - `diff_vs_defaults(resolved: &ResolvedRun) -> Vec<ControlDiff>` → for every control, `{ control_id, default_value, effective_value, source, overridden: bool }`. Why: §6.5 requires both to be read-only projections over `applied_controls`; keeping them in the crate makes them unit-testable without HTTP.

5. **`crates/nexus-recipe/src/error.rs` — consume P2's `BindingError` (no new variants).**
   Per CONTRACTS C4, P2 owns the **full** canonical `BindingError` enum, already including `UnknownPreset { preset_id }`, `LockedOverride { control_id }`, and `HiddenControlNotSettable { control_id }`. P5 adds **no** variant; it raises the existing ones during layering. All `BindingError` variants map to **`422 Unprocessable Entity`** with the variant in the body (CONTRACTS C4 HTTP mapping). Why: a missing preset, a user-locked override, or a user value on a hidden control must each fail loud as 422 (not a silent default run, not a silent-ignore).

6. **`crates/nexus-api/src/dto/presets.rs` (new) — wire DTOs (ts-rs exported).**
   `PresetDto { preset_id, label, description: Option<String>, source: String, control_count: usize }` for the rail; `PresetExplanationDto { entries: Vec<PresetExplainEntryDto> }` with `{ control_id, label, final_value: serde_json::Value, targets: Vec<String>, source: String }`; `ControlDiffDto { control_id, default_value, effective_value, source, overridden }`; and write DTO `CreateUserPresetBody { label, description?, values: BTreeMap<String, Value> }`. Export to `apps/web/src/api/generated/` via `#[ts(export, export_to = "../../../apps/web/src/api/generated/")]`. Why: frontend P4/P8 consume these; ts-rs keeps the contract in sync.

7. **`crates/nexus-api/src/handlers/recipes/presets.rs` (new) — generic-by-`:id` handlers.**
   Lives **under the `handlers/recipes/` directory** (promoted by P3 as first writer, CONTRACTS C7), registered via `recipes::router()` — NOT a flat `handlers/recipe_presets.rs`. Routes: `POST/GET /api/v1/recipes/{id}/presets` (+ explain/diff reads) per the C7 route table.
   - `GET /recipes/{id}/presets` → load recipe projection → map `projection.presets` to `Vec<PresetDto>` (all sources).
   - `GET /recipes/{id}/explain` (query `preset_id`) → load recipe + pinned `workflow_versions` snapshot (P1/P0) → `compile_recipe_run(projection, snapshot, &empty_control_values, Some(preset_id))` → `explain_preset(&resolved)` → `PresetExplanationDto`.
   - `GET /recipes/{id}/diff` (query `preset_id?`, `control_values` JSON) → compile → `diff_vs_defaults` → `Vec<ControlDiffDto>`.
   - `POST /recipes/{id}/presets` → reject unless recipe `author_kind == 'user'` (403); validate the new preset by running `compile_recipe_run` with the preset's `values` as `control_values` and `preset_id=None` (rejects broken presets, design §6.5 save-gate); append a `source="user"` preset to `projection.presets` (generate `preset_id` slug, collision → 409); persist via the shared host storage op `update_recipe_projection(recipe_id, projection_json)` (P1/P6-owned, scoped to `author_kind='user'` — see Dependencies; not a P5 throwaway).
   - `DELETE /recipes/{id}/presets/{preset_id}` → reject if preset `source != "user"` (409) or recipe not user-authored (403); remove from array; persist.
   Why: read endpoints unblock P4/P8 UI; write endpoints deliver user presets. All host-owned rows, generic by id.

8. **Register the new routes inside `recipes::router()` (`crates/nexus-api/src/handlers/recipes/router.rs`).**
   P5 adds the preset routes to the **`recipes::router()`** built in the `handlers/recipes/` dir (promoted by P3, CONTRACTS C7) — NOT a flat `.route("/recipes/...")` in the top-level `router.rs` (exactly one `.nest("/recipes", recipes::router())` survives). Add: `.route("/{id}/presets", get(presets::list_presets).post(presets::create_user_preset))`, `.route("/{id}/presets/{preset_id}", delete(presets::delete_user_preset))`, `.route("/{id}/explain", get(presets::explain_preset))`, `.route("/{id}/diff", get(presets::diff_vs_defaults))`. Declare `mod presets;` in `handlers/recipes/mod.rs`. Why: axum brace `{id}` syntax matches this router; host-overlay-by-`:id` precedent (install `:179`, idle_timeout `:197`); generic by `{id}` over host `recipes` rows.

9. **Extend BOTH boundary tests (CONTRACTS C7) to cover the new preset modules.**
   - `crates/nexus-recipe/tests/boundary_test.rs` — the existing P1/P2 whole-`src` `walk_rs(src)` already covers `projection.rs`, `compiler.rs`, `explain.rs`; assert no node-id-shaped literal (`node:`, `_1.config.`, `.config.`) and no FORBIDDEN extension id (`local-llm`, `local_llm`, `emotion-tts`, `nexus.video`, `nexus.rag`) in any preset code.
   - **nexus-api-side boundary test** (stood up by P3, CONTRACTS C7) — P5 **extends this same test** to walk its new `handlers/recipes/presets.rs` module for FORBIDDEN ext-id literals. The nexus-recipe test does NOT `include_str!` nexus-api files.
   Why: §8 hard gate; mirrors `nexus-extension-deps/tests/boundary_test.rs` whole-`src` walk + `nexus-deployments/tests/preset_boundary.rs` source scan.

## TDD test plan

Write RED tests first, then implement. Rust = `cargo test -p nexus-recipe` / `-p nexus-api`; web = `vitest` under `apps/web`.

### nexus-recipe (compiler + projections) — RED first

1. `preset_values_apply_as_base_layer_beneath_defaults` — asserts: with a preset overriding control `speed` and no user value, `compile_recipe_run(.., preset_id=Some("final"))` resolves `speed` to the preset value (not the default).
2. `user_value_overrides_preset_value` — same preset, but a user `control_values` entry for `speed` wins; `applied_controls[speed].source == User`.
3. `preset_run_equals_manual_run_same_resolved_graph` — **core acceptance**: compiling with `preset_id=Some("final")` and empty user values yields byte-identical `resolved_workflow` + `resolved_inputs` to compiling with `preset_id=None` and the preset's `values` passed as `control_values`. (Presets validated identically to manual runs.)
4. `unknown_preset_id_is_rejected` — `preset_id=Some("nope")` → `BindingError::UnknownPreset`.
5. `preset_cannot_override_locked_control` — preset targeting a `locked` control: decide+assert the chosen rule (preset MAY set a locked control's value since it is author-authored; a USER override of locked → `LockedOverride`). Assert user-locked rejection; assert preset-locked allowed.
6. `hidden_control_accepts_preset_rejects_user` — a `hidden` control accepts a preset value (preset+default layers apply), but a USER value on that hidden control → **reject** `BindingError::HiddenControlNotSettable` (per CONTRACTS C4 — NOT silent-ignore). Assert both: preset-only resolves to the preset value; user value errors.
7. `broken_preset_fails_compile` — a preset whose value violates the operator `config_schema` → `SchemaViolation` (proves the save-gate rejects it).
7a. `preset_value_type_mismatch_on_input_port_is_rejected` (FR-4 completeness) — a preset value that fans onto an `input:<name>` port (binding grammar `input:<name>`, CONTRACTS C5) with a value whose type does not match the `WorkflowPort` type → `BindingError::TypeMismatch { target }`, surfaced through the **run/explain path** (i.e. via `compile_recipe_run`, mapping to 422). Asserts the input-port fan-out is type-checked exactly like a node-config fan-out, not just the node-config case.
8. `applied_controls_records_source_per_control` — defaults→`Default`, preset-overridden→`Preset`, user-overridden→`User`.
9. `explain_preset_lists_only_preset_sourced_controls_with_targets` — `explain_preset` returns exactly the controls whose `source==Preset`, each with its binding target paths.
10. `diff_vs_defaults_marks_overridden_and_source` — every control appears; `overridden==true` iff `effective_value != default_value`; `source` correct.
11. `presets_by_source_filters_extension_recipe_user` — projection helper returns the right subset per source.

GREEN: implement steps 1-5 (projection model, compiler layering, provenance, explain/diff, error variant).

### nexus-api (handlers) — RED first

12. `get_presets_returns_all_sources` — `GET /recipes/{id}/presets` lists extension+recipe+user presets with correct `source` strings and `control_count`.
13. `explain_endpoint_returns_graph_changes_for_preset` — `GET /recipes/{id}/explain?preset_id=final` → entries match the preset's affected targets.
14. `diff_endpoint_returns_per_control_provenance` — `GET /recipes/{id}/diff?preset_id=final` → diff rows with sources.
15. `create_user_preset_on_user_recipe_persists` — `POST /recipes/{id}/presets` on an `author_kind='user'` recipe appends a `source='user'` preset and round-trips on a subsequent GET.
16. `create_user_preset_on_extension_recipe_is_forbidden` — same POST on an extension recipe → 403.
17. `create_broken_user_preset_is_rejected` — POST whose values fail compile → 422 (save-gate).
18. `delete_user_preset_removes_only_user_presets` — DELETE a `source='user'` preset succeeds; DELETE an extension/recipe preset → 409.
19. `extension_rescan_leaves_user_presets_untouched` — install/activation re-scan of the owning extension does NOT delete a user-authored recipe's user presets (relies on P1 `author_kind='extension'`-scoped delete; this is the P5 regression guard).

GREEN: implement steps 6-8.

### Boundary (RED→GREEN)

20. `no_extension_id_literals_in_preset_code` + `no_node_id_shaped_constants_in_preset_code` — `cargo test -p nexus-recipe --test boundary_test` (step 9).

### Frontend (vitest, apps/web) — RED first

21. `preset_rail_renders_sources` (`*.test.tsx`) — given a `PresetDto[]` with mixed sources, the rail groups/labels extension vs recipe vs user. Stub `scrollIntoView`/`matchMedia`; mock `useRootOutletContext`.
22. `explain_panel_shows_changed_controls` — renders `PresetExplanationDto` entries (control label → final value → targets).

GREEN: minimal `PresetRail` + `ExplainPanel` presentational components using `vars`/`motion` tokens from `apps/web/src/styles` (Spectral Graphite), co-located `*.css.ts`, raw px carrying `// audit-allow: px — reason`.

## Acceptance criteria

- **Preset packs from extension/recipe/user are evaluated by the SAME compiler**, with the selected preset's `values` as the **base layer** beneath user overrides — proven by `preset_run_equals_manual_run_same_resolved_graph` (test 3): a preset run and a manual run with identical effective values produce byte-identical `ResolvedRun`.
- **Presets are validated identically to manual runs (OR-1 save-side, CONTRACTS C8)** — a preset violating an operator `config_schema` fails compile (test 7) and is rejected at user-preset save with the same `BindingError`→422 gate (test 17). P5 owns the save-side clause of OR-1 ("validate at save AND run"), shared with P3 (run) and P6 (builder save).
- **Explain-this-preset and diff-vs-defaults are read-only projections over `applied_controls`** — no new compile-of-defaults, no execution; provenance (`default`|`preset`|`user`) is stamped during layering and surfaced unchanged (tests 8-10, 13-14).
- **User presets persist on host-owned rows** and only on user-authored recipes; extension/recipe presets are read-only (tests 15-16, 18); an extension re-scan never wipes user presets (test 19).
- **Boundary clean**: `cargo test -p nexus-recipe --test boundary_test` green; zero extension-id literals / node-id-shaped constants in preset code (test 20).

## Dependencies & sequencing

- **Upstream (required):** P0 (`workflow_versions` snapshot + `WorkflowVersionSnapshot` type), P1 (`nexus-recipe` skeleton, `recipes.projection` JSON column with `presets[]`, `author_kind` + nullable extension id + `author_kind='extension'`-scoped delete guard), P2 (`compile_recipe_run` with `preset_id` param + `ResolvedRun.applied_controls`). P5's read endpoints additionally need a pinned snapshot to compile against (P0/P1).
- **Write-path dependency note (P5→P6 sequencing — not a throwaway op):** the user-preset write (step 7 POST/DELETE) mutates a recipe's `projection`. The shared persistence primitive is a **storage op `update_recipe_projection(recipe_id, projection_json)` owned by P1/P6** (scoped to `author_kind='user'`), NOT a P5-private throwaway. Sequencing: P5 should land **after** P6's recipe write API (`PUT /recipes/{id}`) so the save-gate calls P6's `update_recipe_projection` directly. If P5 must land first, it stands up `update_recipe_projection` as a host storage op that **P6 then adopts as-is** (same signature, no rewrite) — flag in the PR so P6 consumes rather than re-implements it. Either way the user-preset save is a permanent host-owned write path, not scaffolding.
- **OR-1 (validate-at-save, save-side) — acceptance.** CONTRACTS C8 assigns OR-1 ("validate at save AND run") jointly to P3 (run), **P5 (preset save)**, and P6 (builder save). P5 owns the **save-side** clause: every user-preset write compiles the preset's `values` through `compile_recipe_run` before persisting, so an invalid preset is rejected at save with the same `BindingError`→422 gate as a run. This is a named, spanning acceptance item for P5 (proven by tests 7 + 17).
- **Intra-phase order:** projection model (1) → compiler layering + provenance (2-3) → explain/diff + error (4-5) → DTOs (6) → handlers (7) → routes (8) → boundary test (9). Read endpoints (GET presets/explain/diff) are independently shippable before the write endpoints.
- **Downstream:** P8 (outdated/upgrade + shareability) consumes preset packs in the export bundle; P4 form consumes the preset rail; P6 builder authors presets (step 5 "Build presets") through these same endpoints.

## Cross-phase contracts

**PRODUCES:**
- `Preset { preset_id: String, label: String, description: Option<String>, source: PresetSource, values: BTreeMap<String, serde_json::Value> }` and `PresetSource { Extension, Recipe, User }` (`crates/nexus-recipe/src/projection.rs`).
- (none — provenance reuses P2's `applied_controls[*].source: ValueSource { Default, Preset, User }`; P5 defines NO `AppliedSource`).
- `explain_preset(&ResolvedRun) -> PresetExplanation`, `diff_vs_defaults(&ResolvedRun) -> Vec<ControlDiff>` (`crates/nexus-recipe/src/explain.rs`).
- (none — `BindingError` incl. `UnknownPreset`/`LockedOverride`/`HiddenControlNotSettable` is the full P2-owned enum per CONTRACTS C4; P5 raises it, does not extend it).
- Routes (host-generic, axum `{id}`): `GET /api/v1/recipes/{id}/presets`, `POST /api/v1/recipes/{id}/presets`, `DELETE /api/v1/recipes/{id}/presets/{preset_id}`, `GET /api/v1/recipes/{id}/explain?preset_id=`, `GET /api/v1/recipes/{id}/diff?preset_id=&control_values=`.
- DTOs (ts-rs → `apps/web/src/api/generated/`): `PresetDto`, `PresetExplanationDto` + `PresetExplainEntryDto`, `ControlDiffDto`, `CreateUserPresetBody`.

**CONSUMES:**
- `compile_recipe_run(projection: &RecipeProjection, snapshot: &WorkflowVersionSnapshot, control_values: &ControlValues, preset_id: Option<&str>) -> Result<ResolvedRun, BindingError>` (P2).
- `ResolvedRun.applied_controls[*].source: ValueSource { Default, Preset, User }` (P2 owns; P5 reads it for explain/diff).
- `RecipeProjection` + `recipes.projection` JSON column + `author_kind` (P1).
- `WorkflowVersionSnapshot` + pinned `(workflow_id, workflow_version)` (P0/P1).
- `BindingError` (full canonical enum, incl. `UnknownPreset`, `LockedOverride`, `HiddenControlNotSettable`; P2 owns per CONTRACTS C4) — all variants → `422`.
- `validate_workflow` / `validate_node_config` — transitively via the compiler (P2; `crates/nexus-workflow/src/validation.rs`).
- P1's `author_kind='extension'`-scoped `delete_recipes_by_extension` (guards user presets on re-scan).

**Migrations:** **P5 authors NO migration** (CONTRACTS C1 — presets live in the existing P1 `recipes.projection` JSON column, P1's migration 027). Per the C1 ledger, 026–030 are reserved (026=P0, 027=P1, 028=P3, 029=P6-conditional, 030=P8-conditional); P5 holds **no** number. A denormalized diff cache is explicitly out of scope (see Out of scope); if it ever became necessary it would require a CONTRACTS C1 ledger amendment, not an ad-hoc 026.

## Boundary discipline

- `crates/nexus-recipe` (preset model, compiler layering, explain/diff) and all new `nexus-api` handlers are **generic by `control_id` and path string** — zero extension-id literals, zero hardcoded node ids. Presets are opaque `BTreeMap<String, Value>` keyed by generic control ids.
- New routes are **generic-by-`:id`** over host-owned rows (`recipes`), following the host-overlay precedent (`install`, `settings/idle_timeout`). Nothing in the route path or handler branches on an extension id.
- The compiler validates against the **generic operator registry** (`config_schema` keyed by `id@version`), never an extension-specific table.
- Do NOT couple to or extend `crates/nexus-deployments` "deployment presets" (migration 025 / `preset.rs`) — unrelated concept; reuse only its boundary-test shape.
- Do NOT extend the grandfathered `recipe.id.includes('chat'|'rag')` icon heuristic in `apps/web/src/catalog/recipe_catalog.tsx`.
- Wire `cargo test -p nexus-recipe --test boundary_test` to cover the new preset modules (mirrors `crates/nexus-extension-deps/tests/boundary_test.rs` whole-`src` walk + `crates/nexus-deployments/tests/preset_boundary.rs` `include_str!` source scan).

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Preset run diverges subtly from manual run (different code path) | Single layering site in `compile_recipe_run`; assert byte-identical `ResolvedRun` (test 3). No separate preset executor. |
| Locked/hidden semantics ambiguous for presets vs users | Follow the one rule in CONTRACTS C4: preset (author) MAY overlay locked; USER override of locked → reject `LockedOverride`; USER value on hidden → reject `HiddenControlNotSettable` (NOT silent-ignore); preset+default still apply to hidden (tests 5-6). |
| User-preset write path home unclear if P6 not merged | Shared host storage op `update_recipe_projection` (P1/P6-owned, scoped `author_kind='user'`) — P5 sequences after P6, or stands it up for P6 to adopt as-is; flagged in PR (Dependencies). Not a throwaway. |
| Extension re-scan wipes user presets (shared `recipes` table) | Relies on P1 `author_kind='extension'`-scoped delete; P5 adds regression test 19. |
| explain/diff recompute O(recipes×bindings) per request | Both are pure reads over one `ResolvedRun.applied_controls`; provenance stamped at layering time — no second compile. |
| `applied_controls.source` not threaded through P2 | `source: ValueSource` is P2-owned (CONTRACTS C3) — P5 must NOT define its own `AppliedSource`. If P2 shipped without populating it, coordinate a P2 amendment (raise an edit in CONTRACTS), never a P5 fork. |
| Broken user preset persisted | Save-gate compiles the preset values first (test 17); reject on `SchemaViolation`/`TypeMismatch`. |

## Out of scope

- Auto-applying or auto-migrating presets across workflow versions (P8 upgrade assistant handles version drift).
- Denormalized diff/explain cache table (only if JSON-over-`applied_controls` projection becomes a measured bottleneck).
- Sharing/export of preset packs in a bundle (P8 shareability consumes presets; P5 only produces the data + read projections).
- Extension-scoped recipe presets authored via UI ("extension-scoped recipe, if permissions permit later", package §3.8) — user + read-only extension/recipe sources only.
- Coupling to `nexus-deployments` deployment-export presets (different feature).
- Making the host run engine execute presets for real (engine stays a skeleton; resolution+validation only).
