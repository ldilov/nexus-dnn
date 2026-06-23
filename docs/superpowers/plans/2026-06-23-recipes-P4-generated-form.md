# P4: Generated baseline RecipeForm — Implementation Plan (nexus-dnn, 2026-06-23)

> **Cross-phase contracts:** All shared shapes/numbers/routes per `2026-06-23-recipes-00-CONTRACTS.md` — this plan does not re-derive them.

## Goal

A generic, host-owned React `RecipeForm` (Spectral Graphite tokens) renders ANY recipe projection: sections (advanced collapsed by default), `kind`→widget mapping, with `min`/`max`/`step`/`enum` constraints pulled from the operator `config_schema` **resolved server-side**, plus a preset rail and client-side validation that mirrors the P2 compiler. A new read endpoint `GET /api/v1/recipes/{id}/form` returns the projection + resolved per-control schema hints. The form POSTs to the P3 submit path (`POST /api/v1/recipes/{id}/run`), then transitions to the existing run-progress UI (nodeProgress/runId from the host event stream). Done = a recipe runs end-to-end from the generated form with zero extension-id literals in any touched host file.

## Current state (verified)

Re-read against current `main` (HEAD `edb5b870`, 2026-06-23). Drift from the 2026-06-14 design noted inline.

- **Recipe HTTP surface is GET-only.** `crates/nexus-api/src/router.rs:234-235` mounts only `GET /recipes` (`recipes::list_recipes`) and `GET /recipes/{id}` (`recipes::get_recipe`). Handlers live in `crates/nexus-api/src/handlers/recipes.rs:10` and `:23` — both thin DTO mappers. No `/recipes/{id}/form`, no `/recipes/{id}/run` yet. P3 (first writer) promotes the flat `handlers/recipes.rs` into a `handlers/recipes/` dir exposing `recipes::router()` (CONTRACTS C7); P4 adds the `form` read module + route under it. P3 owns `run`.
- **The Recipe tab is NOT a static step list (design §6.4 is inaccurate).** `apps/web/src/views/modules/blueprint.view.tsx:325-389` (the `mode==='recipe'` block, `role="tabpanel" id="panel-recipe"`) already renders Overview + a topo-sorted node-as-step projection (`RecipeStepList`, blueprint.view.tsx:529) + an inline dry-run `<pre>`. P4 augments/replaces this tabpanel body with the interactive form — it is not an empty stub.
- **Run-progress is NOT a standalone component.** Progress is `nodeProgress: Record<string,{status:string;progress:number}>` + `runId: string|null`, both on `RootOutletContext` (`apps/web/src/root_layout.tsx:74,77`), sourced from the host event stream (`latestProgressByNode`, root_layout.tsx:186) and consumed via `useRootOutletContext()`. blueprint.view passes `nodeProgress={{}}` (empty) today — live wiring is net-new for P4.
- **api client.** Canonical fetch is `apiFetch<T>(path, options?)` at `apps/web/src/services/api_client.ts:92` (BASE_URL `/api/v1`, unwraps `ApiEnvelope.data`, throws `ContractError`, 204→undefined). `apps/web/src/api/client.ts` is a re-export barrel; views import from `../../api/client`. Add new fns here + ts-rs DTOs under `apps/web/src/api/generated/`. Copy `dryRunModuleBlueprint` (:895) POST shape.
- **RecipeDto has NO `status`/`projection` fields today.** `crates/nexus-api/src/dto/recipes.rs:12-56` = `{ id, version, display_name, summary, category, extension_id, extension_version, workflow_template_ref, thumbnail, input_summary, bindings: Vec<RecipeFieldBindingDto>, created_at }`. The `projection` JSON column + `status` are added by P1. **P4 CONSUMES the P1 projection shape** — it does not invent it.
- **Operator `config_schema` server-side resolution exists.** Host-generic validator `validate_settings_against_schema(schema, instance) -> Result<(), Vec<String>>` (the draft-07 compile path) lives in `crates/nexus-extension/src/validation.rs:50-65`. The live operator list comes from `state.extension_registry.list_operators() -> Vec<OperatorDefinition>` (used at `crates/nexus-api/src/handlers/workflows.rs:70` etc.); `OperatorDefinition.config_schema: Option<serde_json::Value>` (`crates/nexus-extension/src/manifest.rs:175`). The form-hint endpoint resolves each binding's target node operator → `config_schema` → extracts `min/max/step/enum/type` server-side.
- **Tokens + tests.** vanilla-extract `vars`/`motion` from `apps/web/src/styles` (Spectral Graphite, `theme.css.ts`); co-located `*.css.ts` with px/hex audit discipline (raw px needs `// audit-allow: px — reason`; hex only in theme.css.ts). vitest config (`apps/web/vitest.config.ts`) has `vanillaExtractPlugin`, jsdom, globals; co-located `*.test.tsx`; jsdom lacks `scrollIntoView`/`matchMedia` (stub them); mock `useRootOutletContext` per-test.
- **Migrations.** P4 adds **NO migration** (it reads the P1 `recipes.projection` column). Migration numbers are owned per CONTRACTS C1 (P0=`026`, P1=`027`, P3=`028`) — P4 does not re-derive next-free from `main`.
- **Boundary.** `blueprint.view.tsx`, `api_client.ts`, `recipe_catalog.tsx` are boundary-clean (zero `local-llm`/`local_llm`). P4 must keep them so; the form is generic-by-`:id`.

## Approach

P4 is a thin **read + render** layer over the P1 projection and P3 submit. Strategy:

1. **Server-side hints.** Add `GET /recipes/{id}/form` returning `{ projection, control_hints }`. `control_hints` is computed host-side by resolving, for each control, its binding target's operator `config_schema` and lifting `{ kind?, min?, max?, step?, enum?, required? }`. This keeps the client dumb about schema resolution and matches §6.4 ("resolved server-side"). The hint computation is generic — keyed by `node:<id>.config.<pointer>` / `input:<name>`, no extension knowledge.
2. **Generic form component.** A `RecipeForm` (+ small per-`kind` widget set) renders sections from the projection, defaults from `default_value` overlaid by the selected preset, advanced sections collapsed. Client validation mirrors the compiler's surface rules (required, enum, min/max, locked/hidden) for fast feedback — the server stays authoritative.
3. **Submit + transition.** On submit, POST `{ control_values, preset_id? }` to `/recipes/{id}/run` (P3), receive `{ run_id }`, then surface run progress by consuming `runId`+`nodeProgress` from `useRootOutletContext()` overlaid on the existing graph/stage progress UI.
4. **Mount.** Render `RecipeForm` inside the existing `panel-recipe` tabpanel in `blueprint.view.tsx`, gated on the recipe having a projection (P1). When absent, fall back to the current read-only step list (graceful during rollout).
5. **TDD-first.** Rust handler test + DTO; web vitest for widget mapping, preset rail, client validation, submit→progress transition. Boundary test guards the new handler module.

## Changes (ordered steps)

> Server (Rust) steps 1-5 land first so the client has a contract. Then web steps 6-12.

1. **DTOs for the form endpoint** — `crates/nexus-api/src/dto/recipes.rs`.
   Add ts-rs-exported `RecipeFormDto { projection: RecipeProjectionDto, control_hints: Vec<ControlHintDto> }` and `ControlHintDto { control_id: String, kind: Option<String>, min: Option<f64>, max: Option<f64>, step: Option<f64>, enum_values: Option<Vec<serde_json::Value>>, required: Option<bool> }`. Reuse the P1 `RecipeProjectionDto` (projection shape from §4.2). Why: the client needs projection + resolved schema constraints in one round-trip.

2. **Hint resolver (host-generic)** — new `crates/nexus-api/src/handlers/recipes/form.rs` (under the `handlers/recipes/` dir P3 promotes per CONTRACTS C7).
   `resolve_control_hints(projection, operators: &[OperatorDefinition], snapshot: &WorkflowVersionSnapshot) -> Vec<ControlHintDto>`: for each control, take its first binding target; if `node:<id>.config.<pointer>`, find the node in the pinned `WorkflowVersionSnapshot.workflow`, resolve its operator → `config_schema`, walk the JSON pointer to the property schema, lift `minimum/maximum/multipleOf/enum/type/required`. If `input:<name>`, lift the `WorkflowPort` type. Reuses the P2-canonical `parse_target` (CONTRACTS C5), not `parse_path`. Generic by control_id + path string; no node-id literals, no extension-id literals. Why: §6.4 mandates server-side resolution of min/max/step/enum.

3. **`get_recipe_form` handler** — `crates/nexus-api/src/handlers/recipes/form.rs`.
   `pub async fn get_recipe_form(State<AppState>, Path<String>) -> Result<ApiResponse<RecipeFormDto>, ApiError>`: load recipe (404 on miss) → read its `projection` + pinned `(workflow_id, workflow_version)` (P1 fields) → `get_workflow_version(workflow_id, version)` (P0 storage read) → assemble the snapshot via `WorkflowVersionSnapshot::from_record(record, state.extension_registry.list_operators())` (P0's canonical assembly path, CONTRACTS C2) → `resolve_control_hints` over that snapshot → return DTO. If the recipe has no projection yet (legacy), return `404`/empty-projection per a small explicit rule so the client can fall back. Why: single read powering the form; reuses the one P0 assembly path so the form sees the same frozen snapshot as the compiler/diff.

4. **Route registration** — `crates/nexus-api/src/handlers/recipes/router.rs` (the `recipes::router()` P3 promotes per CONTRACTS C7).
   Add `.route("/{id}/form", get(form::get_recipe_form))` inside `recipes::router()`; declare `mod form;` in `handlers/recipes/mod.rs`. The host router already mounts `recipes::router()` once via `.nest("/recipes", recipes::router())` — do NOT add a flat `.route("/recipes/{id}/form")` in `router.rs` (CONTRACTS C7: exactly one `/recipes` nest survives, no double-mount). axum brace syntax `{id}`. Why: mount the generic-by-`:id` read route under the recipes subtree (host-overlay precedent: install `:179`, idle_timeout `:197`).

5. **Boundary test** — extend the **nexus-api-side** boundary test P3 stands up (CONTRACTS C7), which walks the `handlers/recipes/` modules for FORBIDDEN ext-id literals. Add `handlers/recipes/form.rs` to that test's walked-module set and assert it contains no extension-id literals and no `node:<id>.config`-shaped constant (mirror `crates/nexus-extension-deps/tests/boundary_test.rs`). Do NOT point the `nexus-recipe` boundary_test at nexus-api files — it walks only `crates/nexus-recipe/src` and never `include_str!`s nexus-api modules. Why: §8 hard gate.

6. **api client fns** — `apps/web/src/services/api_client.ts`.
   Add `fetchRecipeForm(id: string): Promise<RecipeFormDto>` = `apiFetch<RecipeFormDto>(\`/recipes/${encodeURIComponent(id)}/form\`)`; and `submitRecipeRun(id: string, body: { control_values: Record<string, unknown>; preset_id?: string }): Promise<{ run_id: string }>` = `apiFetch(\`/recipes/${encodeURIComponent(id)}/run\`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })`. Re-export both from `apps/web/src/api/client.ts`. Copy the `dryRunModuleBlueprint` (:895) POST shape. Why: typed client surface for the form.

7. **RecipeForm container** — new `apps/web/src/views/recipe-form/RecipeForm.tsx`.
   Props `{ recipeId: string }`. Loads via `useSWR(['recipe-form', recipeId], () => fetchRecipeForm(recipeId))`. Holds `controlValues` state seeded from `default_value` overlaid by selected preset. Renders sections (sorted by `order`); a section in `mode: advanced` is wrapped in a collapsed `<details>`. Renders each control via `<RecipeFieldWidget>`. Why: generic projection renderer.

8. **Widget switch** — new `apps/web/src/views/recipe-form/RecipeFieldWidget.tsx`.
   Map `kind`→widget: `string`→text input, `int`/`float`→number (apply `min`/`max`/`step` from `control_hints`), `bool`→checkbox/switch, `enum`→`<select>` (options from hint `enum_values` or projection), `asset`→file/asset picker stub, `preset_selector`→reuse preset rail. `mode: hidden` controls render nothing; `mode: locked` render disabled/read-only. Why: §6.4 kind→widget + server-resolved constraints.

9. **Preset rail** — new `apps/web/src/views/recipe-form/PresetRail.tsx`.
   Renders `projection.presets` as a selectable rail; selecting overlays that preset's `values` onto `controlValues` (a `locked` control's value is preset/default only). Tracks `selectedPresetId`. Why: §6.4 preset rail + §5 preset-as-base-layer semantics mirrored client-side.

10. **Client validation** — new `apps/web/src/views/recipe-form/validate.ts`.
    `validateControls(projection, hints, values) -> { errors: Record<string, string> }` mirroring compiler surface rules: required present, enum membership, min/max bounds, no user override of `locked`/`hidden`. Block submit while errors exist; show inline messages. Server stays authoritative. Why: §6.4 "validates client-side (mirrors compiler)".

11. **Submit + run-progress transition** — in `RecipeForm.tsx`.
    On valid submit → `submitRecipeRun(recipeId, { control_values, preset_id })` → receive `run_id`. Read `nodeProgress`/`runId` from `useRootOutletContext()`; switch the form view to a progress panel that reuses the existing graph/stage progress overlay (the same `nodeProgress` shape blueprint passes to `GraphView`). Why: §6.4 "transition to existing run-progress UI" — consume the event-bus, no new widget.

11b. **Result/preview panel honors `projection.output`** (FR-3, CONTRACTS C8) — new `apps/web/src/views/recipe-form/ResultPanel.tsx`.
    On run completion, render outputs driven by `projection.output`: present the `primary_artifact` first, then any `secondary[]`; pick the renderer from `preview_style` (e.g. `player`/`image`/`text`); show intermediate node outputs only when `show_intermediate` is true. Generic over the projection's declared output spec — no extension-specific artifact assumptions. Why: §6.4 / FR-3 mandates output presentation flow from the projection, not hardcoded per recipe.

12. **Mount in blueprint Recipe tab** — `apps/web/src/views/modules/blueprint.view.tsx:325-389`.
    Inside `panel-recipe`, when the recipe exposes a projection (P1 field present on the recipe DTO), render `<RecipeForm recipeId={selectedBlueprint.recipe_id} />` as a new leading `section` (e.g. "01 / Configure & run"), keeping the existing Overview/Steps/dry-run sections below as read-only context. When no projection (legacy recipe), render the current step list unchanged. Include the OR-4 graph-inspect affordance as a reusable **`RecipePinnedGraph`** component (CONTRACTS C8) that opens the recipe's **pinned `(workflow_id, workflow_version)` snapshot** in `GraphView` — the frozen snapshot, never the mutable workflow head. **P4 owns `RecipePinnedGraph`; P8 reuses it for the upgrade banner (single implementation, no fork).** Co-located `recipe_form.css.ts` using `vars`/`motion` (px/hex audit-clean). Why: §6.4 mount point; graceful fallback during rollout.

## TDD test plan

Write RED tests first, then implement to GREEN.

**Rust (`cargo test -p nexus-api`):**
- `get_recipe_form_returns_projection_and_hints` — recipe with a projection + pinned snapshot → 200, body has `projection` and one `control_hints` entry per control. (RED: handler/route absent.)
- `control_hints_lift_min_max_step_enum_from_operator_config_schema` — a control bound to `node:<id>.config.<key>` whose operator schema declares `minimum/maximum/multipleOf/enum` → hint carries those values. Asserts server-side resolution.
- `control_hints_lift_input_port_type` — control bound to `input:<name>` → hint `kind`/type from the `WorkflowPort` type.
- `get_recipe_form_404_for_unknown_recipe` — unknown id → `ApiError::NotFound`.
- `get_recipe_form_handles_legacy_recipe_without_projection` — recipe lacking a projection → defined fallback (empty projection or 404 per step 3 rule), never panics.
- Boundary (extends P3's nexus-api-side test, C7): `recipes_form_handler_has_no_extension_id_literals` — scan `handlers/recipes/form.rs` against the FORBIDDEN id list + assert no `node:<id>.config`/`_1.config.` literal.
GREEN: implement steps 1-5.

**Web (vitest, `apps/web` → `vitest`):**
- `RecipeFieldWidget.test.tsx` — `maps each kind to the expected widget`; `applies min/max/step from control hints to number input`; `renders enum options from hints`; `hidden control renders nothing`; `locked control renders disabled`.
- `PresetRail.test.tsx` — `selecting a preset overlays its values onto control state`; `selecting a preset does not override a locked control with a user value`.
- `validate.test.ts` — `flags missing required control`; `rejects enum value outside allowed set`; `rejects number below min / above max`; `passes a fully-valid value set`.
- `RecipeForm.test.tsx` — `renders sections with advanced collapsed`; `disables submit while validation errors exist`; `on submit posts control_values + preset_id and shows run progress` (mock `submitRecipeRun` → `{ run_id }`, mock `useRootOutletContext` returning `runId`+`nodeProgress`, assert transition to progress panel).
- `ResultPanel.test.tsx` (FR-3, CONTRACTS C8) — `renders primary_artifact then secondary[] per projection.output`; `selects renderer from preview_style`; `hides intermediate outputs when show_intermediate is false` / `shows them when true`. Asserts the rendered panel honors `projection.output`.
Setup: `vanillaExtractPlugin` is already configured; stub `scrollIntoView`/`matchMedia` if any widget needs them; mock `useRootOutletContext` per-test.
GREEN: implement steps 6-12.

## Acceptance criteria

- `GET /api/v1/recipes/{id}/form` returns the recipe projection plus per-control schema hints (`min`/`max`/`step`/`enum`/`required`/`kind`) resolved **server-side** from the operator `config_schema`.
- A generic host `RecipeForm` (Spectral Graphite vanilla-extract tokens) renders ANY projection: sections with advanced collapsed, `kind`→widget mapping honoring server hints, a preset rail, and client validation that mirrors the P2 compiler's surface rules.
- The form POSTs `{ control_values, preset_id? }` to `POST /api/v1/recipes/{id}/run`, receives a `run_id`, and transitions to the existing run-progress UI (consumes `runId`/`nodeProgress` from `useRootOutletContext()`).
- **The result/preview panel honors `projection.output`** (FR-3, CONTRACTS C8): it presents `primary_artifact` then `secondary[]`, picks its renderer from `preview_style`, and gates intermediate outputs on `show_intermediate`; covered by `ResultPanel.test.tsx`.
- **OR-4 graph inspectability (CONTRACTS C8):** a reusable **`RecipePinnedGraph`** affordance opens the recipe's **pinned `workflow_versions` snapshot** (the frozen `(workflow_id, workflow_version)`, NOT the mutable workflow head) in `GraphView`. **P4 owns this component; P8 reuses it for the upgrade banner (no second implementation).** The snapshot opened is the same one `WorkflowVersionSnapshot::from_record` assembles for hint resolution.
- The form is mounted in the `blueprint.view` Recipe tab (`panel-recipe`), with graceful fallback to the existing step list for projection-less legacy recipes.
- **A recipe runs end-to-end from the generated form.**
- Zero extension-id literals in every touched host file (`handlers/recipes/form.rs`, the `recipes::router()` route, `RecipeForm.tsx`, widgets, `ResultPanel.tsx`, `api_client.ts`, `blueprint.view.tsx`); the P3-owned nexus-api-side boundary test (extended for `form.rs`) is green; no growth of the `recipe_catalog.tsx` `includes('chat'|'rag')` heuristic.

## Dependencies & sequencing

- **Upstream:** P3 (`POST /recipes/{id}/run` + `create_run_from_resolved`) MUST exist for end-to-end run. P2 (`compile_recipe_run`) is the validation contract the client mirrors. P1 (recipe `projection` JSON column + pinned `workflow_version` + `status`) is the data the form reads. P0 (`workflow_versions` snapshot) backs hint resolution. So: **P0 → P1 → P2 → P3 → P4**.
- **Intra-phase order:** Rust steps 1→5 (DTO → hint resolver → handler → route → boundary) before web steps 6→12 (client fns → container → widgets → preset rail → validation → submit/transition → mount). Tests RED before each implementation block.

## Cross-phase contracts

**CONSUMES (from P0/P1/P2/P3 — per CONTRACTS):**
- P1 `RecipeProjectionDto` shape (`sections[]`, `controls[] {control_id, kind, label, help_text, mode, default_value, widget_hint, bindings[]}`, `presets[]`, `output {primary_artifact, secondary[], preview_style, show_intermediate}`) — projection JSON column on the `recipes` row (C6).
- P1 recipe DTO fields `workflow_id`, `workflow_version`, `status`, `projection` (added to `RecipeDto`).
- P0 `nexus_workflow::WorkflowVersionSnapshot` assembled via `WorkflowVersionSnapshot::from_record(record, operators)` (the single P0 assembly path, C2) from `get_workflow_version(workflow_id, version)` — source of node→operator mapping for hint resolution and the OR-4 pinned-graph inspect.
- P2 `parse_target` binding grammar (C5) and compiler surface rules (required / enum / min-max / locked / hidden, C4) — mirrored by `validate.ts`.
- P3 route `POST /api/v1/recipes/{id}/run` body `{ control_values, preset_id? }` → response `{ run_id }`; P3-promoted `handlers/recipes/` dir + `recipes::router()` (C7).
- Host `OperatorDefinition.config_schema` via `state.extension_registry.list_operators()`.
- `RootOutletContext.{ runId: string|null, nodeProgress: Record<string,{status:string;progress:number}> }`.

**PRODUCES:**
- Route `GET /api/v1/recipes/{id}/form` (host, generic-by-`:id`), registered inside the P3-promoted `recipes::router()` (C7).
- DTOs `RecipeFormDto { projection, control_hints }`, `ControlHintDto { control_id, kind?, min?, max?, step?, enum_values?, required? }` (ts-rs → `apps/web/src/api/generated/`).
- Handler module `crates/nexus-api/src/handlers/recipes/form.rs` (`get_recipe_form`, `resolve_control_hints`).
- Extension of the **nexus-api-side** boundary test (P3-owned) to cover `handlers/recipes/form.rs` (C7).
- Web client fns `fetchRecipeForm`, `submitRecipeRun`.
- Components `RecipeForm`, `RecipeFieldWidget`, `PresetRail`, `ResultPanel`; util `validateControls`.
- **No new migration / no new table** (P4 is read-only over P1 storage).

## Boundary discipline

- All new host code (`handlers/recipes/form.rs`, the `recipes::router()` route, `RecipeForm.tsx` and siblings incl. `ResultPanel.tsx`, `api_client.ts` additions, `blueprint.view.tsx` mount) is **generic by `control_id` and path string** — zero extension-id literals, zero hardcoded node ids. Per `.claude/rules/host-extension-boundary.md`.
- New route is generic-by-`:id` over host-owned `recipes` rows (host-overlay precedent: install `:179`, idle_timeout `:197`).
- Hint resolver validates against the generic operator registry (`config_schema` keyed by `id@version`), never an extension-specific table.
- The form must NOT extend the grandfathered `recipe_catalog.tsx:35-37` `includes('chat'|'rag')` icon heuristic (XIII.6 debt; flagged, not grown).
- The P3-owned nexus-api-side boundary test is extended to cover `handlers/recipes/form.rs` (mirror `crates/nexus-extension-deps/tests/boundary_test.rs`): no extension-id literals, no node-id-shaped constant. The `nexus-recipe` boundary test is NOT pointed at nexus-api files.
- House style: new-code body comments ≤2 lines (docstrings exempt); edit from repo root (comment-write hook breaks on cwd drift). Raw px in `*.css.ts` needs `// audit-allow: px — reason`; hex only in `theme.css.ts`.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| P1 projection DTO shape not finalized when P4 starts | P4 strictly CONSUMES the P1 `RecipeProjectionDto`; gate P4 start on P1 landing the DTO + ts-rs export. Don't redefine it here. |
| P3 `/recipes/{id}/run` not ready → no end-to-end | Build/test the form against a mocked `submitRecipeRun` first; the end-to-end acceptance is gated on P3. |
| Server hint resolution diverges from compiler validation (client shows constraints the compiler doesn't enforce, or vice-versa) | Resolve hints from the SAME operator `config_schema` the compiler uses; keep `validate.ts` to surface-rule parity only and let the server be authoritative (it re-validates via P2). |
| Legacy recipes have no projection → form crashes | Step 3 fallback rule + step 12 graceful fallback to existing step list; explicit test `get_recipe_form_handles_legacy_recipe_without_projection`. |
| jsdom missing `scrollIntoView`/`matchMedia` in widget tests | Stub in test setup (known repo gotcha). |
| Run-progress assumed to be a component (design wording) | It is event-bus state on `useRootOutletContext()`; consume `runId`+`nodeProgress`, do not import a nonexistent widget. |
| px/hex audit hook rejecting new css | Use `vars.*` tokens; annotate any unavoidable raw px with `// audit-allow`. |

## Out of scope

- The P6 no-code Recipe Builder + recipe write API (`POST/PUT/DELETE /recipes`) and `exposable-targets` endpoint.
- The P2 compiler internals and P3 `create_run_from_resolved` / frozen-graph execute (P4 only calls the P3 route).
- The P8 outdated-badge / upgrade-assistant / shareability bundle (P4 does not add a status badge).
- Custom (non-generated) per-extension recipe UIs.
- Normalized projection storage; nested-pointer resolver work (P2); conditional/computed binding targets (schema_version 2).
- Making the host run engine a real operator executor (stays a skeleton; real execution is extension-side).
