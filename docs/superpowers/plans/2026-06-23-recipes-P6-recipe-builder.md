# P6: No-code Recipe Builder + write API — Implementation Plan (nexus-dnn, 2026-06-23)

> **Cross-phase contracts:** All shared shapes/numbers/routes per `2026-06-23-recipes-00-CONTRACTS.md` — this plan
> does not re-derive them.

## Goal

A non-developer opens a generic host UI, picks a workflow version, scans its exposable targets (workflow inputs +
node configs with their operator schemas), exposes/locks/hides/renames/help-annotates them, organizes them into
sections, authors fan-out presets with live validation and lock-conflict detection, sets output rules, previews
the generated form, and **saves a runnable user recipe**. The save is rejected by the `nexus-recipe` compiler if
any binding or preset is broken. Crucially, an extension re-scan (activation) leaves these user recipes untouched,
because the delete-then-reinsert persistence is scoped to `author_kind = 'extension'`.

## Current state (verified)

P6 is net-new authoring over P0–P3 primitives. Grounded against current `main` (HEAD `edb5b870`, 2026-06-23):

- **Recipe HTTP surface is GET-only.** `crates/nexus-api/src/router.rs:234-235` registers only
  `GET /recipes` (`recipes::list_recipes`) and `GET /recipes/{id}` (`recipes::get_recipe`). Handlers are 2
  functions, ~35 lines, in `crates/nexus-api/src/handlers/recipes.rs:10,23`. **No POST/PUT/DELETE recipe routes
  exist** — the write API is fully net-new.
- **`RecipeRecord` blocks user rows today.** `crates/nexus-storage/src/records.rs:150-163` —
  `extension_id: String` and `extension_version: String` are **non-`Option` (NOT NULL)**;
  `migrations/002_recipes_contributions.sql:7` declares `extension_id TEXT NOT NULL REFERENCES extensions(id)`.
  There is **no `author_kind`, no `workflow_id`/`workflow_version` pin, no `projection`, no `status`** column.
  Those are produced by upstream **P1**; **P6 depends on P1 having landed them** (see Dependencies).
- **Recipe re-persist is UNCONDITIONAL delete-all-by-extension — the central P6 hazard.** TWO paths must both be
  scoped to `author_kind='extension'`: boot path `crates/nexus-core/src/app.rs:795-828`
  (`persist_recipe_records`, delete ~:800) and HTTP install path `crates/nexus-api/src/mapping.rs:59-77`
  (`persist_recipes_for_extension`, delete at `mapping.rs:64`, dispatched from `extensions.rs:369`).
  `RecipeRecord` has no user-edit guard today — recipes are fully extension-owned and regenerated each activation.
- **Compiler keystone is upstream (P2), net-new crate.** `crates/nexus-recipe/` does **not exist yet** (verified —
  0 matches for `compile_recipe_run`, `RecipeProjection`, `WorkflowVersionSnapshot`, `create_run_from_resolved`,
  `author_kind`, `exposable_targets` across `crates/` + `apps/web/src/`). P2 produces
  `compile_recipe_run(projection, snapshot, control_values, preset_id) -> Result<ResolvedRun, BindingError>`. P6
  reuses it at save-time for validation only.
- **Workflow version snapshots + read APIs are a P0 product.** Today a workflow has one mutable `version: String`
  (`records.rs:78`, `migrations/001_initial.sql:40`) with no history. P0 produces the `workflow_versions` table,
  `WorkflowVersionSnapshot`, and `GET /workflows/{id}/versions[/{version}]`. P6 layers the **exposable-targets**
  projection over a snapshot.
- **Per-node config validation + operator schema source.** `crates/nexus-workflow/src/validation.rs:245`
  `check_node_config(node: &NodeInstance, op_def: &OperatorDefinition)` is **private**; `validate_workflow`
  (`validation.rs:72`) is public; P2 adds the public `validate_node_config` wrapper. The exposable-targets
  endpoint reads `OperatorDefinition.config_schema: Option<serde_json::Value>`
  (`crates/nexus-extension/src/manifest.rs:175`) resolved via `state.extension_registry.list_operators()`
  (caller-side, keyed by `id@version`). Host-generic schema instance validation already exists:
  `validate_settings_against_schema(schema, instance) -> Result<(), Vec<String>>`
  (`crates/nexus-extension/src/validation.rs:50`, jsonschema draft7).
- **Route registration patterns.** `crates/nexus-api/src/router.rs:148` `pub fn build(state: AppState) -> Router`;
  flat routes via `.route("/path", get(h).post(h))` on `api_v1` (151-512); nested sub-routers via
  `.nest("/prefix", mod::router())` (519+). axum path params use **brace syntax `{id}`** (router.rs:179,197,235),
  not `:id`. Host-overlay-by-id precedents: `/extensions/{id}/install` (:179),
  `/extensions/{id}/settings/idle_timeout` (:197). Deployments uses its own nested `router()`
  (`crates/nexus-api/src/handlers/deployments/handlers.rs:34`; run route `/{id}/runs` at `:46`) — the model for a
  `recipes::router()`.
- **Boundary test precedents.** `crates/nexus-extension-deps/tests/boundary_test.rs:1-106` (walk whole `src/` +
  FORBIDDEN id list + handler-scoped opacity guard) and the leaner
  `crates/nexus-deployments/tests/preset_boundary.rs`. P6 mirrors these as
  `cargo test -p nexus-recipe --test boundary_test`.
- **Migration numbering + manual registration.** Per CONTRACTS ledger C1: P1 owns `027_recipes_projection.sql`
  (the recipe-table rebuild), P3 owns `028`, and **P6's conditional slot is `029`** — authored only if P1's `027`
  omitted a recipe column P6 needs. P6 otherwise authors **no new migration**. A new `migrations/NNN_*.sql` is INERT
  until an `execute_migration_statements(pool, include_str!("../../../../migrations/NNN_*.sql"), <bool>)` line is
  appended in numeric order in `crates/nexus-storage/src/sqlite/migrations.rs` (run_migrations, ~:12-164, 025
  wired ~157-162). No auto-discovery.
- **Workspace + dep wiring.** Root `Cargo.toml:4` globs `crates/*`, so `crates/nexus-recipe` (P1) auto-joins; P6
  only needs `nexus-api` to carry a `[dependencies]` path dep on `nexus-recipe` (P3 may already have added it).
  `nexus-recipe` must NOT route through `nexus-builtins` (sole extension-coupling bridge).
- **Frontend.** The Recipe surface renders inside `apps/web/src/views/modules/blueprint.view.tsx`
  (mode==='recipe' block ~:325), reached via `ModuleBlueprintRoute`
  (`apps/web/src/views/modules/modules.routes.tsx:16-26`). DRIFT vs design: that Recipe tab is **already** a
  dynamic topo-sorted node-as-step list (`RecipeStepList`), not a static stub. P4 adds the run `RecipeForm`; P6
  adds a separate generic **Builder** view (not a per-extension subdir). Client = `apiFetch<T>(path, options?)`
  (`apps/web/src/services/api_client.ts:92`, BASE_URL `/api/v1`, unwraps `ApiEnvelope.data`); DTOs are ts-rs
  generated into `apps/web/src/api/generated/`; vitest (`apps/web/vitest.config.ts`) uses `vanillaExtractPlugin()`
  + jsdom + globals (jsdom lacks `scrollIntoView`/`matchMedia` — stub when needed); styling = vanilla-extract
  Spectral Graphite vars from `apps/web/src/styles`.
- **Catalog grandfathered coupling.** `apps/web/src/catalog/recipe_catalog.tsx:32-38` has a cosmetic
  `recipe.id.includes('chat'|'rag')` icon heuristic — P6 must NOT extend it.

## Approach

P6 is two coordinated deliverables over the P2 compiler and P1 schema: (1) a host **write API** for user recipes
(`POST/PUT/DELETE /recipes`) plus a read-only **exposable-targets** endpoint, and (2) a generic **Recipe Builder**
React view that drives them. Everything is host-generic by `:id`, `control_id`, and path string — zero
extension-id literals, zero hardcoded node ids.

The keystone safety property is the **shared-table guard**: user recipes live in the same `recipes` table as
extension recipes (one catalog query), so both extension re-persist paths must filter their delete to
`author_kind = 'extension'`. P6 owns wiring + testing that guard (the schema column comes from P1).

Save-time integrity is enforced by routing every binding and preset through the existing `compile_recipe_run`
against the pinned `workflow_versions` snapshot; a `BindingError` becomes a 422 and rejects the save — broken
recipes never persist. The builder fetches `GET /workflows/{id}/versions/{version}/exposable-targets` to populate
the scan, validates locally as the user edits (mirroring compiler rules for fast feedback), then persists the full
projection document via the write API. Reuse the deployments nested-router shape (`recipes::router()`) to keep the
new routes co-located and the boundary test scoped. The server compiler is authority; client validation is
convenience.

## Changes (ordered steps)

> Assumes P0 (`workflow_versions` + snapshot read APIs + `WorkflowVersionSnapshot`), P1 (`nexus-recipe` crate +
> `RecipeProjection` + recipe-table migration 027 with nullable ext ids / `author_kind` / `workflow_id` /
> `workflow_version` / `projection` / `status` columns + `author_kind`-scoped delete), P2 (`compile_recipe_run` +
> `ResolvedRun` + public `validate_node_config`), and P3 (`POST /recipes/{id}/run` + `create_run_from_resolved`)
> have landed.

1. **Verify P1 schema landed (gate, no edit unless missing).** Read `crates/nexus-storage/src/records.rs`
   `RecipeRecord` and `migrations/027_recipes_projection.sql`. Confirm: `author_kind: String`, `workflow_id: Option<String>`,
   `workflow_version: Option<String>`, `projection: Option<String>` (JSON), `status: String`, and that
   `extension_id`/`extension_version` are now `Option<String>`. If a needed column is absent, STOP and author
   `029_user_recipe_builder.sql` (CONTRACTS ledger C1 — P6's conditional slot is **029**, only when P1's `027`
   omitted a needed recipe column; never `026/027`), wire it into
   `crates/nexus-storage/src/sqlite/migrations.rs` run_migrations in numeric order with
   `ignore_duplicate_column=true` (ALTER ADD COLUMN), and add the field to `RecipeRecord` + insert/update binds +
   row mapping. Why: P6's write API serializes the projection + pin into these columns; missing schema = silent
   desync, and this is a known prior root-cause bug class.

2. **Verify P1 scoped both extension-delete paths to `author_kind='extension'`; if absent, scope it.** P1 owns
   `delete_recipes_by_extension` and its `author_kind='extension'` scoping (CONTRACTS C1/C6 — the recipe table +
   author_kind are P1's). P6 **verifies** the existing `delete_recipes_by_extension` SQL already appends
   `AND author_kind = 'extension'` and that BOTH callers route through it — boot path
   `crates/nexus-core/src/app.rs:~800` and HTTP install path `crates/nexus-api/src/mapping.rs:64`. If P1 left it
   unscoped, P6 scopes the existing `delete_recipes_by_extension` in place (do **not** introduce a renamed
   `delete_recipes_by_extension_scoped` variant — keep one query name). Why: prevents extension re-scan from wiping
   user recipes (the P6 acceptance invariant). This is the single most important correctness check.

3. **Add user-recipe CRUD storage ops.** In the storage trait + sqlite impl +
   `crates/nexus-storage/queries/recipes/` add `insert_user_recipe`, `update_user_recipe`, `delete_user_recipe`
   (the latter two scoped `WHERE id = ? AND author_kind = 'user'`; NotFound when `rows_affected==0`). insert/update
   write the full `RecipeRecord` including `author_kind='user'`, `projection`, `workflow_id`, `workflow_version`,
   `status`. Why: the write API persists host-owned user rows; scoping update/delete by `author_kind` hard-stops
   cross-author tampering.

4. **Net-new DTOs in `crates/nexus-api/src/dto/recipe_builder.rs`.** ts-rs derived
   (`#[ts(export, export_to = "../../../apps/web/src/api/generated/")]`):
   - `ExposableTargetDto { target: String, kind: String, label: String, schema: Option<serde_json::Value>,
     node_id: Option<String>, port_type: Option<String>, required: bool, current_default: Option<serde_json::Value> }`
     — one row per `input:<name>` and per `node:<id>.config.<key>` leaf, with the operator `config_schema` slice.
   - `ExposableTargetsResponseDto { workflow_id, workflow_version, inputs: Vec<ExposableTargetDto>,
     node_configs: Vec<ExposableTargetDto> }`.
   - `RecipeWritePayloadDto { display_name, summary, category, workflow_id, workflow_version,
     projection: serde_json::Value }` — the builder save body. `id` server-generated on POST, path-supplied on PUT.
   Why: typed wire contract for scan + save; codegen keeps the TS in sync.

5. **Net-new handler module `crates/nexus-api/src/handlers/recipes/` (promote the file to a dir).** Move existing
   `list_recipes`/`get_recipe` into `recipes/read.rs`; add:
   - `recipes/exposable_targets.rs` — `get_exposable_targets(State, Path<(String,String)>)`: load the P0
     `workflow_versions` snapshot (NotFound→404); for each `WorkflowPort` emit an input target; for each node
     resolve its operator via `list_operators()` (keyed `id@version`), walk `config_schema.properties` to emit one
     node-config target per property with its sub-schema. Generic; no node-id literals.
   - `recipes/write.rs` — `create_recipe(State, Json<RecipeWritePayloadDto>)`,
     `update_recipe(State, Path<String>, Json<RecipeWritePayloadDto>)`, `delete_recipe(State, Path<String>)`.
     The HTTP handlers are **thin wrappers** over a **typed in-process service fn** (CONTRACTS C8):
     `create_user_recipe(state, name: &str, summary, category, workflow_id, workflow_version,
     projection: nexus_recipe::RecipeProjection) -> Result<RecipeRecord, ApiError>`. It takes an already-parsed
     `RecipeProjection` (NOT a JSON value) so **P8 migrate/import can call it directly without re-serializing**;
     `create_recipe` parses `RecipeWritePayloadDto.projection` once and delegates. The service fn loads the pinned
     snapshot, then for each preset calls `compile_recipe_run(&projection, &snapshot, &preset.values,
     Some(preset_id))` plus one defaults-only compile — any `BindingError` → `ApiError::BadRequest` (422), nothing
     persisted. On success it builds a `RecipeRecord` (`author_kind='user'`, `extension_id=None`, `status` from
     `assess_status(projection, pinned_snapshot, current_snapshot, operators)` per CONTRACTS C6) and calls the
     scoped storage op. `update_recipe` first loads existing and rejects `author_kind != 'user'` (403). `delete_recipe`
     uses `delete_user_recipe`.
   - `recipes/router.rs` — `pub fn router() -> Router<AppState>` mirroring deployments:
     `.route("/", get(read::list_recipes).post(write::create_recipe))`,
     `.route("/{id}", get(read::get_recipe).put(write::update_recipe).delete(write::delete_recipe))`.
   Why: co-locate; keep the boundary test scoped to one dir.

6. **Register routes in `crates/nexus-api/src/router.rs`.** Replace the two flat recipe routes (`:234-235`) with
   `.nest("/recipes", recipes::router())`. The exposable-targets route is registered **separately, adjacent to
   P0's `/workflows/{id}/versions[/{version}]` routes** (CONTRACTS C7 — P0 is the SOLE owner/registrar of the
   `/workflows/.../versions` subtree):
   `.route("/workflows/{id}/versions/{version}/exposable-targets", get(recipes::exposable_targets::get_exposable_targets))`.
   The **handler module** lives under `handlers/recipes/` (`recipes/exposable_targets.rs`, P6-authored), but its
   **route must NOT be added inside `recipes::router()`** — do not mount a `/workflows/...` route under the recipes
   nest. `recipes` is already imported (`:139-145`); ensure the new submodule paths resolve. Use brace `{id}`
   syntax. Why: exposes the write API via `recipes::router()` + the scan endpoint on P0's version subtree, generically by id.

7. **`nexus-recipe` save-validation + status helpers.** Ensure `nexus_recipe` exposes `RecipeProjection` (serde
   round-trip of `projection` JSON), and that `compile_recipe_run` is reachable from `nexus-api`. For the save-time
   `status` column, P6 calls P1's
   `assess_status(projection, pinned_snapshot, current_snapshot, operators) -> (RecipeStatus, Option<String>)`
   (CONTRACTS C6 — the binding-check + `compute_status` entry point; **not** the 3-arg `compute_status` primitive).
   Optionally add
   `validate_projection_for_save(projection, snapshot, operators) -> Result<(), Vec<SaveValidationError>>` that
   loops presets + a defaults run through `compile_recipe_run` and statically flags preset-overrides-locked-control
   conflicts, so handler + unit test share one gate. Add `nexus-recipe` as a `[dependencies]` path dep in
   `crates/nexus-api/Cargo.toml` if P3 hasn't. Why: save-time validation + status caching live in the host
   compiler crate, keeping handlers thin and generic.

8. **Frontend: api client functions.** In `apps/web/src/services/api_client.ts` add
   `fetchExposableTargets(workflowId, version)`, `createRecipe(body)`, `updateRecipe(id, body)`,
   `deleteRecipe(id)` using the `apiFetch` POST template
   (`{ method, body: JSON.stringify(body), headers: {'Content-Type':'application/json'} }`, `encodeURIComponent`
   on ids). Copy the `dryRunModuleBlueprint` POST shape (`:895`), NOT the typo'd `retryRun`/`cancelRun`. Why:
   typed client surface for the builder.

9. **Frontend: Recipe Builder view.** New generic dir `apps/web/src/views/recipe-builder/` (NOT under
   `views/extensions/<ext>/`): `RecipeBuilder.tsx` + step components + co-located `recipe_builder.css.ts` using
   `import { motion, vars } from '../../styles'` (Spectral Graphite tokens; raw px needs
   `// audit-allow: px — reason`, hex only in theme). Seven-step wizard mapping package §03: (1) pick workflow
   version (consumes `GET /workflows/{id}/versions`), (2) target scanner (exposable-targets →
   expose-basic/advanced/lock/hide/rename/help per row), (3) section builder (group/order control_ids), (4) preset
   author with live validation + **client-side lock-conflict detection** (flag any preset key bound to a `locked`
   control), (5) output rules, (6) preview via the P4 `RecipeForm` rendered read-only over the in-progress
   projection, (7) save → `createRecipe`/`updateRecipe`. Why: the no-code authoring surface; generic by id,
   reusable for any extension's workflow; reusing `RecipeForm` avoids a second renderer.

10. **Frontend: entry point.** New `apps/web/src/views/recipe-builder/recipe_builder.routes.tsx` registered in the
    host route table, plus a "Create Recipe from Workflow" / "Edit recipe" action in
    `apps/web/src/views/modules/blueprint.view.tsx` (workflow tab toolbar), generic by `workflow_id` query param.
    Do NOT grow the `recipe_catalog.tsx:35-36` `includes('chat'|'rag')` icon heuristic. Why: discoverable entry
    without boundary debt.

11. **Boundary tests — two, scoped per crate (CONTRACTS C7).**
    - `crates/nexus-recipe/tests/boundary_test.rs` — mirror `crates/nexus-extension-deps/tests/boundary_test.rs`:
      (a) walk whole `src/` + FORBIDDEN id list (`local-llm`, `local_llm`, `emotiontts`, `emotion-tts`, `svi2`,
      `indextts`); (b) literal-shape assertion that no node-id-shaped constant (`_1.config.`, a hardcoded
      `node:<literal-id>.config`) appears.
    - **Extend the P3-authored nexus-api-side boundary test** (the one P3 stood up over `handlers/recipes/` per
      CONTRACTS C7 — P4/P6/P8 extend the *same* test, do NOT add a second) so its walk covers the P6 handler
      modules `recipes/exposable_targets.rs` and `recipes/write.rs` for FORBIDDEN ext-id literals. The nexus-recipe
      test does NOT `include_str!` nexus-api files.
    Why: hard gate per design §8.

## TDD test plan

Write RED tests first, then implement GREEN. Rust = `cargo test`; web = `vitest` (from `apps/web`).

### Rust (storage / API integration)

- `extension_rescan_leaves_user_recipes_intact` (**the P6 acceptance invariant**) — insert one
  `author_kind='extension'` and one `author_kind='user'` recipe; call the scoped `delete_recipes_by_extension`;
  assert the user recipe still loads and the extension one is gone. GREEN: P1's `author_kind='extension'` scoping
  (Step 2 verifies it; scopes in place only if P1 left it unscoped).
- `create_recipe_persists_user_row_with_author_kind_user` — POST a valid projection; stored row has
  `author_kind='user'`, `extension_id=None`, the projection round-trips, pin columns set. GREEN: Steps 3+5.
- `create_recipe_rejects_broken_binding` — POST a projection whose control binds to `node:nonexistent.config.x`;
  assert 422 and nothing persisted. GREEN: route through `compile_recipe_run`, map `BindingError`→BadRequest.
- `create_recipe_rejects_locked_preset_override` — a preset sets a `locked` control; assert 422
  (`LockedOverride`). GREEN: preset loop calls compiler.
- `update_recipe_cannot_mutate_extension_row` — PUT on an `author_kind='extension'` id → 403, no change. GREEN:
  update guard scoped to `author_kind='user'`.
- `delete_recipe_only_deletes_user_row` — DELETE on extension id → 404/no-op; DELETE on user id removes it. GREEN:
  scoped delete op.
- `exposable_targets_lists_inputs_and_node_configs` — snapshot with N inputs + a node whose operator
  `config_schema` has M properties → N input targets + M node-config targets, each with its schema and correct
  `node:<id>.config.<key>` string. GREEN: Step 5 handler + `scan` walk.
- `exposable_targets_404_for_missing_version` — unknown `{version}` → 404. GREEN: snapshot load error mapping.

### Rust (`crates/nexus-recipe`, boundary)

- `no_extension_id_literals_in_source` and `no_node_id_shaped_constants` (`nexus-recipe` test) — RED until source
  is literal-clean. GREEN: keep the crate generic.
- Extension of the **P3-authored nexus-api-side boundary test** to walk the P6 `recipes/exposable_targets.rs` +
  `recipes/write.rs` handler modules for FORBIDDEN ext-id literals (CONTRACTS C7) — RED until handlers are
  literal-clean. GREEN: keep handlers generic.

### Web (vitest, jsdom)

- `recipe_builder.test.tsx › renders exposable targets from scan` — mock `fetchExposableTargets`; assert each
  target row renders expose/lock/hide/rename controls.
- `recipe_builder.test.tsx › flags lock-conflict when preset sets a locked control` — author a preset writing a
  locked control; assert an inline conflict warning + disabled Save.
- `recipe_builder.test.tsx › rejects save when client validation fails` — assert `createRecipe` is not called
  while a binding is unresolved.
- `recipe_builder.test.tsx › POSTs full projection on save` — mock `createRecipe`; assert it receives sections +
  controls + presets + output. Stub `scrollIntoView`/`matchMedia` if the wizard uses them.

GREEN order: implement storage guard + CRUD (Steps 2-3) and `nexus-recipe` helpers (Step 7) first (unblocks the
integration tests), then handlers + routes (5-6), then web client + wizard (8-10). If
`extension_rescan_leaves_user_recipes_intact` fails, the fix is P1's `author_kind='extension'` scoping (Step 2,
scope in place only if P1 left it unscoped) — never broaden the user delete.

## Acceptance criteria

1. A non-developer, using only the generic Builder UI, can: pick a workflow version → scan exposable targets →
   expose-basic/advanced/lock/hide/rename/help each → group into sections → author fan-out presets with **live
   validation + lock-conflict detection** → set output rules → preview the generated form (preset switching,
   validation feedback, hidden-vs-exposed view) → **save** a runnable user recipe.
2. `GET /api/v1/workflows/{id}/versions/{version}/exposable-targets` returns the inventory of `input:<name>` ports
   and `node:<id>.config.<key>` leaves with their operator schemas; unknown version → 404.
3. `POST /api/v1/recipes`, `PUT /api/v1/recipes/{id}`, `DELETE /api/v1/recipes/{id}` create/edit/delete **user**
   recipes; PUT/DELETE never mutate extension recipes (403/404).
4. **Save-time compiler validation rejects broken bindings/presets** (422), via `compile_recipe_run` against the
   pinned `workflow_versions` snapshot; nothing persists on failure.
5. **An extension re-scan (activation) leaves user recipes intact** — proven by
   `extension_rescan_leaves_user_recipes_intact`.
6. The saved recipe is runnable through the P3 `POST /recipes/{id}/run` path.
7. `cargo test -p nexus-recipe --test boundary_test` is green AND the extended P3-authored nexus-api-side boundary
   test (covering the P6 `recipes/` handler modules) is green; no extension-id literals or node-id-shaped
   constants in `nexus-recipe` or the new handler modules.

## Dependencies & sequencing

- **Upstream (must land first):** **P2** — `crates/nexus-recipe::compile_recipe_run` + `RecipeProjection` +
  `ResolvedRun` + `BindingError`; public `validate_node_config` in `nexus-workflow`. **P3** —
  `POST /recipes/{id}/run` (so a saved recipe is runnable) + `create_run_from_resolved`. **P1 (transitively):**
  recipe-table migration 027 (nullable `extension_id`/`extension_version`, `author_kind`, `projection`,
  `workflow_id`/`workflow_version`, `status`) + `author_kind`-scoped delete + pin backfill. **P0 (transitively):**
  `workflow_versions` table + `WorkflowVersionSnapshot` + version read APIs. Design DAG: P6 depends directly on
  **P2, P3**.
- **Intra-phase order:** Step 1 (gate) → Steps 2-3 (storage guard + CRUD) → Step 4 (DTOs) → Step 5 (handlers) →
  Step 6 (routes) → Step 7 (nexus-recipe wiring) → Steps 8-10 (frontend) → Step 11 (boundary test). Write RED
  tests per step before its GREEN.
- **Downstream:** **P7** (EmotionTTS migration) and **P8** (shareability import recreates a user recipe) depend on
  P6's write API.

## Cross-phase contracts

PRODUCES:
- Route `POST /api/v1/recipes` — body `RecipeWritePayloadDto { display_name, summary, category, workflow_id,
  workflow_version, projection }` → `RecipeDto` (201).
- Route `PUT /api/v1/recipes/{id}` — same body → `RecipeDto` (200); user rows only (else 403).
- Route `DELETE /api/v1/recipes/{id}` — user rows only (204/404).
- Route `GET /api/v1/workflows/{id}/versions/{version}/exposable-targets` →
  `ExposableTargetsResponseDto { workflow_id, workflow_version, inputs: ExposableTargetDto[],
  node_configs: ExposableTargetDto[] }`.
- DTOs `ExposableTargetDto`, `ExposableTargetsResponseDto`, `RecipeWritePayloadDto` (ts-rs exported to
  `apps/web/src/api/generated/`).
- Storage ops: `insert_user_recipe`, `update_user_recipe` (scoped `author_kind='user'`), `delete_user_recipe`
  (scoped `author_kind='user'`). (`delete_recipes_by_extension`'s `author_kind='extension'` scoping is **P1-owned**
  per CONTRACTS C1/C6 — P6 only verifies it, see Step 2.)
- In-process service fn `create_user_recipe(state, name, summary, category, workflow_id, workflow_version,
  projection: nexus_recipe::RecipeProjection) -> Result<RecipeRecord, ApiError>` (CONTRACTS C8) — the typed
  create path the HTTP `create_recipe` handler wraps; **P8 migrate/import calls this directly** with an already-parsed
  `RecipeProjection`, no JSON round-trip.
- Frontend client fns: `fetchExposableTargets`, `createRecipe`, `updateRecipe`, `deleteRecipe` in
  `apps/web/src/services/api_client.ts`.

CONSUMES:
- `nexus_recipe::compile_recipe_run(&RecipeProjection, &WorkflowVersionSnapshot, &ControlValues, Option<&str>)
  -> Result<ResolvedRun, BindingError>` (P2).
- `nexus_recipe::RecipeProjection` (P1/P2) + `assess_status(projection, pinned_snapshot, current_snapshot,
  operators) -> (RecipeStatus, Option<String>)` (P1, CONTRACTS C6 — P6 calls this, not the 3-arg `compute_status`).
- `WorkflowVersionSnapshot` + `workflow_versions` table + version read APIs (P0).
- `RecipeRecord` columns `author_kind`, `projection`, `workflow_id`, `workflow_version`, `status`, nullable
  `extension_id`/`extension_version` (P1 migration 027 per CONTRACTS C1).
- `state.extension_registry.list_operators() -> Vec<OperatorDefinition>` with
  `config_schema: Option<serde_json::Value>` (`crates/nexus-extension/src/manifest.rs:175`).
- `POST /api/v1/recipes/{id}/run` (P3) for runnability acceptance.

MIGRATION NUMBERS (CONTRACTS ledger C1): P6 authors **no new migration** if P1's `027` covers the columns. If a
column is missing, P6's conditional slot is **`029`** (`029_user_recipe_builder.sql`) — never `026/027` — wired
into `crates/nexus-storage/src/sqlite/migrations.rs` run_migrations in numeric order
(`ignore_duplicate_column=true` for ALTER ADD COLUMN).

## Boundary discipline

- `crates/nexus-recipe` and ALL new handlers (`recipes/exposable_targets.rs`, `recipes/write.rs`) are **generic by
  `:id`, `control_id`, and path string** — zero extension-id literals, zero hardcoded node ids. The EmotionTTS
  `RecipeField`/`targets()`/`CURATED_*` shape is NOT lifted; fan-out lives in `recipe.projection` data.
- New routes (`/recipes` write API, `…/exposable-targets`) are generic-by-`:id` over host-owned rows, following
  the host-overlay precedent (`/extensions/{id}/install` router.rs:179, `/extensions/{id}/settings/idle_timeout`
  :197). axum brace `{id}` syntax.
- User recipes, `author_kind`, and `projection` are **host-generic** columns in the host `recipes` table (P1) — no
  extension-named tables; the write API never writes to `ext_*` namespaced tables.
- Exposable-targets reads/validates against the generic operator registry (`config_schema` keyed by `id@version`),
  never an extension-specific table.
- The catalog `recipe_catalog.tsx:35-36` `includes('chat'|'rag')` heuristic is grandfathered debt — do NOT extend.
- Builder view lives in a generic dir (`apps/web/src/views/recipe-builder/`), NOT under `views/extensions/<ext>/`,
  no per-extension subdirectory.
- `nexus-recipe` depends only on host crates; it must NOT route through `nexus-builtins`.
- Boundary gate (two tests, CONTRACTS C7): `cargo test -p nexus-recipe --test boundary_test` (mirror
  `nexus-extension-deps/tests/boundary_test.rs` + `nexus-deployments/tests/preset_boundary.rs`) **plus** the
  P3-authored nexus-api-side boundary test extended to cover the P6 `recipes/` handler modules.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| P1 schema (author_kind/projection/pin/status) not yet landed | Step 1 gate verifies via build + schema grep; if missing, P6 authors migration **029** (CONTRACTS C1, never 026/027) + wires it into run_migrations (manual registration — NOT auto-discovered). |
| Shared `recipes` table: extension re-scan wipes user recipes | P1 scopes `delete_recipes_by_extension` to `author_kind='extension'` (CONTRACTS C1/C6); P6 verifies BOTH delete paths (`app.rs:~800`, `mapping.rs:64`) route through it (scopes in place only if P1 left it unscoped); RED test `extension_rescan_leaves_user_recipes_intact` proves it. |
| Write API mutates extension rows | `update_user_recipe`/`delete_user_recipe` scoped `author_kind='user'`; PUT loads existing and 403s non-user; tests `update_recipe_cannot_mutate_extension_row`, `delete_recipe_only_deletes_user_row`. |
| Save accepts broken bindings | Route every binding + preset through `compile_recipe_run` against the pinned snapshot; `BindingError` → 422, nothing persisted. |
| Client validation drifts from compiler | Client validation is fast-feedback only; the server compiler is authoritative on save (mirror, don't fork, the rules). |
| Migration not registered (prior root bug) | If `029` is authored, append the `execute_migration_statements(... include_str! ...)` line in numeric order in `migrations.rs`; `ignore_duplicate_column=true` for ALTER. |
| Boundary leak via node-id literals in fan-out | `no_node_id_shaped_constants` boundary test fails the build on `_1.config.`/`node:`-prefixed constants. |
| Comment-write hook blocks >2-line body comments / breaks off repo root | Keep new-code body comments ≤2 lines (docstrings exempt); edit from repo root. |
| jsdom missing scrollIntoView/matchMedia | Stub in vitest for any builder widget that uses them. |

## Out of scope

- The P2 compiler internals, P0 versioning, P1 projection schema + pin backfill (consumed, not built here).
- Conditional/computed binding targets and `node:<id>.input:<port>` (projection `schema_version` 2).
- Making the host run engine a real executor (stays a skeleton).
- EmotionTTS migration / compiler parity (P7) and shareability bundle export/import (P8 — though its import
  depends on this phase's write API).
- The P4 generated run `RecipeForm` itself (P6 only reuses it read-only for preview).
- Preset packs as a separate extension/recipe/user layer mechanism (P5); P6 authors recipe-scoped presets inside
  the projection only.
- Extension-scoped recipe authoring/permissions (package §3.8 "if permissions permit later") — user/private only.
- Auto-upgrading recipes to newer workflow versions.
