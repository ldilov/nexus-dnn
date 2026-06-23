# P8: Outdated/Upgrade Assistant + Shareability Bundle — Implementation Plan (nexus-dnn, 2026-06-23)

> All shared shapes/numbers/routes per 2026-06-23-recipes-00-CONTRACTS.md — this plan does not re-derive them.

## Goal

Surface recipe compatibility (`healthy`/`outdated`/`broken`) in the catalog and blueprint **only** from the host-computed `status` field — never by extending the grandfathered `recipe.id.includes('chat'|'rag')` heuristic. Add an **upgrade assistant** that diffs a recipe's pinned `workflow_version` against the workflow's `current_version` (changed nodes/params, broken bindings) and offers a **migration copy** (clone the recipe, bump `recipe_version`, re-pin to current, surface still-broken bindings) — never auto-upgrade. Add a **shareability bundle** that exports `{ projection, pinned workflow_versions snapshot, presets, required extension/operator versions, compatibility summary, optional thumbnail/samples }` and imports it by validating and recreating the workflow version (as an immutable snapshot) plus the recipe (as a user recipe). Done = outdated/broken visibly derive from `status`; the migration-copy flow produces a working re-pinned user recipe; a bundle round-trips (export → import → equivalent recipe + resolvable run).

## Current state (verified)

P8 is a **consumer** of P0/P1/P5/P6. The seam map confirms none of those columns/types exist on `main` yet — they are produced by upstream phases. This plan is written against the contracts those phases declare (see Cross-phase contracts) and the current host code those phases extend.

Verified against current code (re-read 2026-06-23):

- **Catalog heuristic still present, icon-only.** `apps/web/src/catalog/recipe_catalog.tsx:32-38` — `iconFor()` falls through to `recipe.id.toLowerCase().includes("chat")` / `includes("rag")` for icon selection. `RECIPE_STATUS_FILTERS: StatusKey[] = []` (`recipe_catalog.tsx:40`) — no status filter wired today. `CatalogControls` already accepts `availableStatuses` and renders status filters (`recipe_catalog.tsx:126`), and `matchesControls` already filters on `controls.statusFilters` (`recipe_catalog.tsx:87`). So the catalog has a **status-filter slot ready** — P8 fills it once `RecipeDto.status` exists.
- **RecipeDto has no `status` / no version pin today.** `crates/nexus-api/src/dto/recipes.rs:12-27` + generated `apps/web/src/api/generated/RecipeDto.ts`: fields are `id, version, display_name, summary, category, extension_id, extension_version, workflow_template_ref, thumbnail, input_summary, bindings, created_at`. P1 adds `workflow_id`/`workflow_version`/`status`/`projection`; P8 relies on those being on the DTO. `export type Recipe = RecipeDto` (`api_client.ts:220`); `fetchRecipes()` (`api_client.ts:297`).
- **Recipe routes are GET-only.** `crates/nexus-api/src/router.rs:234-235` = `GET /recipes`, `GET /recipes/{id}`. Handlers `list_recipes`/`get_recipe` in the flat `crates/nexus-api/src/handlers/recipes.rs` **today** — but per CONTRACTS C7, **P3 promotes this to a `handlers/recipes/` dir** (`mod.rs` + `router.rs` exposing `recipes::router()`), moving the GETs into `read.rs`. P8 adds its handler modules (`upgrade.rs`, `share.rs`) **under that dir** and registers via `recipes::router()` — not by extending the flat file. P6 adds the recipe write API (`POST/PUT/DELETE /recipes`); P8's migration-copy + import reuse P6's create path.
- **Deployment export/import is the bundle precedent.** `crates/nexus-deployments/src/service/export.rs:9-32` defines `ExportEnvelope { package_version: u32, deployment, revisions, extension_settings (#[serde(default)]), integrity: Integrity { hash_algo, digest } }`; secret-redaction via `SECRET_PATTERNS` (`export.rs:34-43`) and `envelope_contains_secret`. `import.rs` (13.2K) validates+recreates. This is the exact shape/round-trip discipline a **recipe bundle** mirrors — but it lives in `nexus-deployments`; the recipe bundle is owned by `nexus-recipe` (P2 crate).
- **Boundary-test precedent.** `crates/nexus-deployments/tests/preset_boundary.rs` (`include_str!` source + `FORBIDDEN` extension-id list + generic-table-name assertion) and the heavier spec-035 `crates/nexus-extension-deps/tests/boundary_test.rs` (walk whole `src/` + handler-scoped opacity). Per CONTRACTS C7 there are **two** boundary tests: `nexus-recipe`'s own `boundary_test` (walks `nexus-recipe/src` — P8's `upgrade.rs`/`migrate.rs`/`bundle.rs`/`import.rs`) AND the **nexus-api-side** boundary test stood up by P3, which P8 **extends** to cover its `handlers/recipes/upgrade.rs` + `share.rs` modules.
- **Migration numbering drifted.** Highest host migration is `migrations/025_deployment_presets.sql`; `crates/nexus-storage/src/sqlite/migrations.rs:157-162` registers 025 last. **P8 default = no new host migration** (it reuses P0's `workflow_versions` and P1's recipe columns). Per the CONTRACTS C1 migration ledger, IF an upgrade-audit / share-log table is genuinely unavoidable it is authored as **`030`** (NOT `026/027`, which belong to P0/P1) with kind `false` (pure `CREATE TABLE`), and **hand-registered** in `run_migrations` in numeric order — a dropped `.sql` is inert otherwise.

Drift from the 2026-06-14 design: the design cites `recipe_catalog.tsx` includes-heuristic (still accurate, icon-only), `export.rs`/`import.rs` (still the bundle precedent), and deployment pin columns in `011_deployments.sql` (intact). No P8-relevant anchor moved except migration numbering (024/025 landed after the design).

## Approach

P8 is **read-derive + clone + serialize/deserialize**, not a new compute engine. Three workstreams, all built on upstream contracts:

1. **Status surfacing (UI-only, depends P1).** The host already computes and caches `status` on the recipe row (P1, authoritative in `nexus-recipe`). P8 adds nothing to the computation — it threads `status` through `RecipeDto` (already P1's job) to the web, renders a badge on the recipe card, and wires the existing `availableStatuses`/`statusFilters` slot. The `includes('chat'|'rag')` block is left untouched (debt, flagged not grown).

2. **Upgrade assistant (host service in `nexus-recipe`, depends P0+P1+P2).** A pure diff function `diff_recipe_pin(projection, pinned_snapshot, current_snapshot)` compares the pinned `WorkflowVersionSnapshot` against `current_version`, classifying changed nodes/params and which of the recipe's projection bindings no longer resolve/validate against `current`. A read route `GET /recipes/{id}/upgrade-preview` returns the diff. A write route `POST /recipes/{id}/upgrade` performs the **migration copy**: build a new **user** recipe (P6 create path) re-pinned to `current_version`, bump `recipe_version`, carry the projection, and stamp the still-broken bindings in the response. Never mutates the original; never auto-applies.

3. **Shareability bundle (host service in `nexus-recipe`, depends P1+P6).** Mirror the deployment `ExportEnvelope` discipline with a recipe-shaped `RecipeBundle`. Export = recipe projection + the pinned `workflow_versions` snapshot (immutable, by-value) + presets (from the projection) + required extension/operator versions (derived from the snapshot's operator refs + per-node `operator_schema_hashes[node_id]`, CONTRACTS C2) + a `BundleCompatSummary` (`RecipeStatus` + reason, recomputed via P1's `assess_status`) + optional thumbnail/samples. Import = validate the bundle (schema + integrity digest + that every operator the snapshot references is resolvable in the live registry), recreate the workflow version as an immutable snapshot if absent, and create the recipe as a **user** recipe via P6. Round-trip test: export a recipe, import into a clean store, assert the imported recipe compiles a run identical to the source.

All new Rust lives in `crates/nexus-recipe` (host, generic). All new routes are generic-by-`{id}` (brace syntax per CONTRACTS C7) and registered via `recipes::router()`. Zero extension-id literals; the boundary test enforces it.

## Changes (ordered steps)

> Cold-execution note: P0/P1/P2/P5/P6 must be merged first (see Dependencies). Each step below references the upstream contract it consumes. Edit from the repo root (a write-time comment hook breaks when cwd drifts and rejects body comments >2 lines).

### A. Upgrade assistant — host service + routes (Rust)

1. **`crates/nexus-recipe/src/upgrade.rs` (new).** Add the diff types and pure function:
   - `RecipePinDiff { recipe_id, pinned_version, current_version, is_outdated: bool, changed_nodes: Vec<NodeChange>, changed_params: Vec<ParamChange>, broken_bindings: Vec<BrokenBinding>, risk: UpgradeRisk, summary: RecipeStatus }` — `summary` uses the canonical `RecipeStatus` (CONTRACTS C6), never `CompatStatus`.
   - **`pub enum UpgradeRisk { Safe, Outdated, Breaking }` (FR-7 risk summary, CONTRACTS C8).** Derived from the diff: `Breaking` if any broken bindings or a `SchemaHashDrift`; `Outdated` if `is_outdated` with no breakage; `Safe` if pinned == current. This is the banner-level summary the upgrade UI surfaces — a digest of the raw diff, not the raw diff itself.
   - `NodeChange { node_id, kind: Added|Removed|OperatorChanged{from,to}|SchemaHashDrift }`, `ParamChange { node_id, field, kind }`, `BrokenBinding { control_id, target, reason }` where `reason` reuses P2's `BindingError` rendering.
   - `pub fn diff_recipe_pin(projection: &RecipeProjection, pinned: &WorkflowVersionSnapshot, current: &WorkflowVersionSnapshot) -> RecipePinDiff`. Compute node-set delta by `node_id`, operator-ref delta by `operator-id@version`, schema drift per node by comparing `pinned.operator_schema_hashes[node_id]` against `current.operator_schema_hashes[node_id]` (P0 supplies the per-node map — CONTRACTS C2; do NOT assume a single whole-workflow hash), and broken bindings by attempting to resolve every `projection.controls[].bindings[]` target against `current` (reuse P2's `parse_target` + `validate_node_config`, no execution). `is_outdated` = pinned != current AND no broken bindings; broken bindings ⇒ `summary = RecipeStatus::Broken`.
   - Why: the diff is the authoritative payload behind both the preview route and the migration-copy decision; keeping it pure makes it unit-testable without a DB. `risk` keeps the UI banner from re-deriving severity client-side.

2. **`crates/nexus-recipe/src/migrate.rs` (new).** Add the migration-copy builder:
   - `pub fn build_migration_copy(source: &RecipeRecord, projection: &RecipeProjection, current_version: &str) -> MigrationCopyPlan` returning a `NewUserRecipe` (the P6 create input) with: a fresh `id` (host-generated, generic — not derived from any extension id), `author_kind = "user"`, `workflow_version = current_version`, `recipe_version` = bump of source's `recipe_version` (semver patch bump or `+1`), the same `projection` (carried verbatim), and `display_name` suffixed (e.g. `"<name> (upgraded)"`).
   - The function does **not** persist; it returns the plan so the handler can run P6's create + re-run the compiler to surface post-copy broken bindings.
   - Why: separation keeps the clone logic pure and lets the handler own persistence + the post-copy validation pass.

3. **`crates/nexus-api/src/handlers/recipes/upgrade.rs` (new module under the P3-promoted `handlers/recipes/` dir).** Add two handlers:
   - `get_recipe_upgrade_preview(State, Path<id>)`: load recipe → load pinned snapshot (`workflow_versions`, P0) → load `current_version` snapshot → `diff_recipe_pin` → return `RecipePinDiffDto`. 404 if recipe/snapshot missing; never mutates.
   - `upgrade_recipe(State, Path<id>)`: load recipe + projection + current snapshot → `build_migration_copy` → call P6's user-recipe create service → re-run `compile_recipe_run` against `current` to recompute broken bindings → return `{ new_recipe_id, broken_bindings }`. Host-owned rows only.
   - Register the two routes via `recipes::router()` (CONTRACTS C7 — P8 owns `recipes/upgrade.rs`); do NOT add a flat `.route("/recipes/...")` in the top-level router.
   - Why: generic-by-`{id}` host overlay routes (install/idle_timeout precedent), no extension branching.

4. **`crates/nexus-api/src/handlers/recipes/router.rs` (extend `recipes::router()`, NOT the top-level router).** Add inside the nested recipe router that P3 promotes (CONTRACTS C7 — exactly one `.nest("/recipes", recipes::router())` survives):
   - `.route("/{id}/upgrade-preview", get(upgrade::get_recipe_upgrade_preview))`
   - `.route("/{id}/upgrade", post(upgrade::upgrade_recipe))`
   - Why: keeps recipe routes co-located under `recipes::router()`; brace `{id}` syntax matches this router; no double-mount.

### B. Shareability bundle — host service + routes (Rust)

5. **`crates/nexus-recipe/src/bundle.rs` (new).** Mirror `ExportEnvelope` discipline:
   - `RecipeBundle { package_version: u32, recipe: RecipeManifestValue, projection: RecipeProjection, workflow_snapshot: WorkflowVersionSnapshot, presets: Vec<PresetValue>, requirements: Requirements, compatibility: BundleCompatSummary, #[serde(default, skip_serializing_if="Option::is_none")] thumbnail: Option<String>, #[serde(default, skip_serializing_if="Vec::is_empty")] samples: Vec<SampleValue>, integrity: Integrity }`.
   - `Requirements { extensions: Vec<{id, version}>, operators: Vec<{id, version, schema_hash}> }` derived from the snapshot's node operator refs + P0's per-node `operator_schema_hashes[node_id]` (CONTRACTS C2).
   - **`BundleCompatSummary { status: RecipeStatus, reason: Option<String> }`** — the bundle's distinct summary type. Per CONTRACTS C6, P8 reuses the canonical `RecipeStatus` for the `status` field and defines `BundleCompatSummary` explicitly (it does NOT borrow `RecipeProjection`'s type, nor reintroduce a `CompatStatus`). The `status`/`reason` are recomputed via P1's `assess_status` at export time, never hand-rolled.
   - Reuse the deployment `Integrity { hash_algo, digest }` shape and a JCS-sha256 digest over the bundle (copy `sha256_jcs`/`hex` approach from `nexus-deployments::hash`; do not cross-depend — duplicate the small helper or factor it into a shared util if one exists). Run the `SECRET_PATTERNS` redaction guard (port `envelope_contains_secret`) before emitting — bundles must not carry secrets.
   - `pub fn export_recipe_bundle(recipe, projection, snapshot, presets, status: RecipeStatus) -> RecipeBundle` and `pub fn validate_bundle(&RecipeBundle, &OperatorRegistrySnapshot) -> Result<(), BundleError>` (schema/version check + integrity recompute + every operator resolvable + no secrets). The `status` passed in is whatever P1's `assess_status` returned for the recipe; the bundle wraps it in `BundleCompatSummary`.
   - Why: bundle export/import is serialize/validate/recreate — the deployment precedent is proven; reusing its envelope+integrity+redaction discipline avoids re-deriving security-sensitive code.

6. **`crates/nexus-recipe/src/import.rs` (new) or extend `bundle.rs`.** `pub fn plan_bundle_import(&RecipeBundle, &dyn WorkflowVersionStore, &dyn RecipeStore) -> Result<ImportPlan, BundleError>`:
   - If the workflow version (by `workflow_id` + `workflow_version` + `canonical_hash`) is absent, plan to recreate it as an **immutable snapshot** (P0 `workflow_versions` insert; never overwrite an existing version).
   - Plan to create the recipe as a **user** recipe (`author_kind="user"`, P6 create), pinned to the imported `workflow_version`.
   - Reject on: integrity mismatch, unresolvable operator, projection that fails compile against the imported snapshot.
   - Why: import depends on P6 (user recipes are host-owned rows) and P0 (immutable version snapshots); planning separately keeps validation pure.

7. **`crates/nexus-api/src/handlers/recipes/share.rs` (new module under `handlers/recipes/`).** Add:
   - `export_recipe_bundle(State, Path<id>)`: load recipe + projection + pinned snapshot + presets + status → `export_recipe_bundle` → return JSON (or attachment). Redaction guard runs inside the service.
   - `import_recipe_bundle(State, Json<RecipeBundle>)`: `validate_bundle` against the live operator registry → `plan_bundle_import` → execute (recreate version if needed + P6 create recipe) → return `{ recipe_id, created_workflow_version: bool }`. 422 on invalid bundle (all `BindingError`/`BundleError` → 422, CONTRACTS C4).
   - Register both routes via `recipes::router()` (CONTRACTS C7 — P8 owns `recipes/share.rs`).
   - Why: generic host routes over host-owned rows.

8. **`crates/nexus-api/src/handlers/recipes/router.rs` (extend `recipes::router()`).**
   - `.route("/{id}/bundle", get(share::export_recipe_bundle))`
   - `.route("/import", post(share::import_recipe_bundle))`
   - Why: export is `{id}`-scoped; import is collection-scoped (creates a new recipe), matching P6's `POST /recipes` placement; both live under `recipes::router()`, no top-level double-mount.

### C. DTOs + ts-rs export (Rust → web types)

9. **`crates/nexus-api/src/dto/recipes.rs` (extend).** Add `#[derive(TS)] #[ts(export, export_to="../../../apps/web/src/api/generated/")]` DTOs mirroring `RecipePinDiff` (including the `risk` summary field and the `summary`/`status` as the lowercased `RecipeStatus` string — never `CompatStatus`), `BrokenBinding`, the upgrade-result, and `RecipeBundle` (whose `compatibility` is a `BundleCompatSummary`; bundle can be a thin re-export of the `nexus-recipe` serde type if it already `Serialize`s cleanly; prefer a dedicated DTO to keep the wire contract owned by the api layer). Ensure `RecipeDto` carries the P1 `status` (a `String`, the lowercased `RecipeStatus` variant per CONTRACTS C6) and `workflow_version` fields (P1 task; verify present, do not duplicate).
   - Why: ts-rs regenerates `apps/web/src/api/generated/*.ts` so the web layer is typed.

### D. Catalog + blueprint status badge + upgrade UI (web)

10. **`apps/web/src/services/api_client.ts` (extend).** Add typed fetchers using the existing `apiFetch` pattern (copy the `dryRunModuleBlueprint` POST shape, not the typo'd `retryRun`):
    - `fetchRecipeUpgradePreview(id)` → `GET /recipes/{id}/upgrade-preview`.
    - `upgradeRecipe(id)` → `POST /recipes/{id}/upgrade`.
    - `exportRecipeBundle(id)` → `GET /recipes/{id}/bundle`.
    - `importRecipeBundle(bundle)` → `POST /recipes/import`.
    - Why: single canonical client; views import from `../../api/client`.

11. **`apps/web/src/catalog/recipe_catalog.tsx` (extend, do NOT grow the heuristic).**
    - Add a `StatusBadge` to `RecipeCard` driven by `recipe.status` (`healthy`/`outdated`/`broken`) — a new badge element near `styles.categoryBadge` (`recipe_catalog.tsx:196`). Use vanilla-extract tokens (new classes in `recipe_catalog.css`); no raw px/hex.
    - Set `RECIPE_STATUS_FILTERS` (`recipe_catalog.tsx:40`) to the real status keys so `CatalogControls` renders the filter and `matchesControls` filters on it (both wiring points already exist).
    - **Leave `iconFor()` lines 35-36 (`includes('chat'|'rag')`) untouched.** The badge derives from `status`, not from id substrings.
    - Why: the acceptance bar requires the badge to derive **only** from host `status`; the catalog already has the filter slot wired.

12. **`apps/web/src/views/modules/blueprint.view.tsx` (extend, Recipe tab).** In the `mode==='recipe'` block, when the recipe is `outdated`/`broken`, render an **upgrade banner** that calls `fetchRecipeUpgradePreview`. The banner leads with the `RecipePinDiff.risk` summary (`Safe`/`Outdated`/`Breaking`, CONTRACTS C8) — a human-readable severity line — and only then expands the raw diff (changed nodes/params, broken bindings). It does NOT dump the raw diff with no summary. An "Upgrade (create a copy)" action is wired to `upgradeRecipe`; on success, surface the new recipe id and any still-broken bindings.
    - **OR-4 "view the pinned snapshot graph" affordance (CONTRACTS C8).** **Reuse P4's `RecipePinnedGraph` component** (do NOT reimplement); add a control in the upgrade banner that mounts it over the recipe's **pinned** `WorkflowVersionSnapshot` — never the mutable workflow head — so the user can inspect exactly what the recipe is pinned to.
    - Add an "Export bundle" affordance (downloads the bundle JSON) and an import entry point (file picker → `importRecipeBundle`).
    - Why: the design mounts P4/P8 recipe UX in the blueprint Recipe tab; status + risk-summarised upgrade + pinned-graph inspectability + share are surfaced where the recipe is viewed.

## TDD test plan

Write RED tests first, then implement to GREEN.

### Rust — `crates/nexus-recipe` (unit + boundary)

`cargo test -p nexus-recipe`

1. `diff_detects_outdated_when_current_newer_no_broken_bindings` — pinned snapshot v1, current v2 with all bindings still resolving ⇒ `is_outdated == true`, `summary == RecipeStatus::Outdated`, `risk == UpgradeRisk::Outdated`, `broken_bindings.is_empty()`.
2. `diff_flags_broken_binding_when_target_node_removed` — current snapshot drops a node a control binds to ⇒ that control appears in `broken_bindings` with an `UnknownTarget`/`PathResolveFailed` reason (via `parse_target`), `summary == RecipeStatus::Broken`, `risk == UpgradeRisk::Breaking`.
3. `diff_flags_schema_hash_drift_as_broken` — same `operator-id@version` but different `operator_schema_hashes[node_id]` between pinned and current (per-node map, CONTRACTS C2) ⇒ `NodeChange::SchemaHashDrift` + `summary == RecipeStatus::Broken` + `risk == UpgradeRisk::Breaking`.
4. `diff_reports_no_change_when_pinned_equals_current` — identical snapshots ⇒ `is_outdated == false`, empty change lists, `summary == RecipeStatus::Healthy`, `risk == UpgradeRisk::Safe`.
5. `migration_copy_repins_to_current_and_bumps_recipe_version` — `build_migration_copy` ⇒ `author_kind == "user"`, `workflow_version == current`, `recipe_version` strictly greater than source, projection carried verbatim, fresh non-extension id.
6. `migration_copy_does_not_mutate_source` — source `RecipeRecord` unchanged after planning (immutability).
7. `bundle_export_then_import_round_trips` — export a recipe bundle, `validate_bundle` passes, `plan_bundle_import` recreates an equivalent user recipe; the imported projection compiles a run identical (resolved node configs + inputs byte-equal) to the source under the same control values.
8. `bundle_import_rejects_on_integrity_mismatch` — tamper one field after export ⇒ `validate_bundle` returns `BundleError::IntegrityMismatch`.
9. `bundle_import_rejects_unresolvable_operator` — registry missing an operator the snapshot references ⇒ `BundleError` (no recipe created).
10. `bundle_export_redacts_or_rejects_secrets` — a projection default containing an `api_key`-shaped value ⇒ export refuses (mirrors `envelope_contains_secret`).
11. `bundle_import_creates_immutable_version_only_if_absent` — importing when the version already exists does NOT overwrite the existing `workflow_versions` row.

**Two boundary tests (CONTRACTS C7):**

`cargo test -p nexus-recipe --test boundary_test` (extend the existing P2/P6 nexus-recipe boundary test — walks ONLY `crates/nexus-recipe/src`):

12. `no_extension_id_literals_in_upgrade_bundle_src` — walk `crates/nexus-recipe/src/` (incl. `upgrade.rs`, `migrate.rs`, `bundle.rs`, `import.rs`); assert none contains the `FORBIDDEN` extension ids or node-id-shaped constants (`node:<id>.config`, `_1.config.`).

`cargo test -p nexus-api --test recipes_boundary_test` (the **nexus-api-side** boundary test P3 stands up; P8 **extends** it — CONTRACTS C7):

12b. `no_extension_id_literals_in_recipe_upgrade_share_handlers` — extend the P3 test to also `include_str!`/walk `crates/nexus-api/src/handlers/recipes/upgrade.rs` and `.../share.rs`; assert zero `FORBIDDEN` ext-id literals and no node-id-shaped constants. The nexus-recipe test does NOT `include_str!` nexus-api files; handler opacity is covered here.

### Web — vitest (`apps/web`)

`vitest` (jsdom; vanilla-extract plugin already in `vitest.config.ts`)

13. `recipe_catalog.test.tsx :: renders status badge from recipe.status` — a recipe with `status: "outdated"` renders the outdated badge; `status: "broken"` renders the broken badge; `healthy` renders the healthy/no-warn state. Assert the badge text/role, NOT an icon derived from id.
14. `recipe_catalog.test.tsx :: status filter narrows the list` — selecting the `broken` status filter shows only broken recipes (exercises the now-populated `RECIPE_STATUS_FILTERS` + `matchesControls`).
15. `recipe_catalog.test.tsx :: chat/rag id does not drive status` — a recipe whose id contains `"chat"` but `status: "healthy"` shows the healthy state (guards against regressing into the heuristic for status).
16. `blueprint_upgrade.test.tsx :: outdated recipe banner leads with risk summary` — mock `fetchRecipeUpgradePreview` returning `risk: "Breaking"`; assert the banner renders the **risk summary** line (`Breaking`/`Outdated`/`Safe`, CONTRACTS C8) as the lead, the expanded diff (changed nodes / broken bindings) renders, and the "Upgrade (create a copy)" button calls `upgradeRecipe`. Guard: the banner is NOT just a raw diff dump with no severity line.
16b. `blueprint_upgrade.test.tsx :: view-pinned-snapshot-graph opens GraphView over the pinned snapshot` — clicking the "view the pinned snapshot graph" affordance (OR-4, CONTRACTS C8) mounts P4's `RecipePinnedGraph` (which wraps `GraphView`) with the recipe's **pinned** `WorkflowVersionSnapshot`, not the mutable workflow head.
17. `recipe_bundle.test.ts :: export then import client round-trip` — mock the two endpoints; assert `exportRecipeBundle` shape and that `importRecipeBundle` posts it back unchanged. Stub `scrollIntoView`/`matchMedia` if any widget needs them.

GREEN implementation note: implement steps A→D until every test above passes; run `cargo fmt && cargo clippy -p nexus-recipe -- -D warnings` and the web `biome`/`tsc` gate.

## Acceptance criteria

- **Outdated surfaced from `status`.** The catalog and blueprint Recipe tab show `healthy`/`outdated`/`broken` strictly from the host-computed `RecipeDto.status`. The `recipe_catalog.tsx` `includes('chat'|'rag')` heuristic is **not** extended for status (icon-only debt left as-is). A test proves a `chat`-id recipe with `status: healthy` is not flagged.
- **Migration copy works.** `POST /recipes/{id}/upgrade` produces a **new user recipe** re-pinned to `current_version` with a bumped `recipe_version`, carrying the projection, leaving the original untouched, and returning the set of still-broken bindings. No auto-upgrade path exists.
- **Upgrade preview is read-only + risk-summarised.** `GET /recipes/{id}/upgrade-preview` returns the pinned-vs-current diff (changed nodes/params, broken bindings) plus a `RecipePinDiff.risk` summary (`Safe`/`Outdated`/`Breaking`, derived from broken-bindings/schema-drift, CONTRACTS C8) and mutates nothing. The upgrade banner leads with that risk summary, not a raw diff dump.
- **Pinned snapshot is inspectable (OR-4).** The Recipe tab reuses P4's `RecipePinnedGraph` affordance to open the recipe's pinned `WorkflowVersionSnapshot` in `GraphView` — the pinned snapshot, never the mutable workflow head (CONTRACTS C8); P8 does not reimplement it.
- **Bundle round-trips.** `GET /recipes/{id}/bundle` exports `{ projection, pinned workflow_versions snapshot, presets, required ext/operator versions, compatibility summary, optional thumbnail/samples }` (secret-redacted, integrity-stamped); `POST /recipes/import` validates (schema + integrity + operator resolvability) and recreates the workflow version (immutable, only if absent) plus the recipe as a user recipe. The imported recipe compiles a run identical to the source.
- **Boundary clean.** Both boundary tests pass (CONTRACTS C7): `cargo test -p nexus-recipe --test boundary_test` with the new `nexus-recipe/src` modules in scope, AND the P3-owned nexus-api-side boundary test extended to cover `handlers/recipes/upgrade.rs` + `share.rs`. Zero extension-id literals; new routes registered via `recipes::router()` and generic-by-`{id}`.

## Dependencies & sequencing

Upstream (must be merged before P8 starts):
- **P0** — immutable `workflow_versions` table + `WorkflowVersionSnapshot` type (carries `workflow`, `operators`, `canonical_hash`, and the per-node `operator_schema_hashes: BTreeMap<node_id, hash>` map — CONTRACTS C2); `current_version` pointer; `GET /workflows/{id}/versions[/{version}]`.
- **P1** — recipe `workflow_id`/`workflow_version`/`projection`/`status` columns + `RecipeProjection` type + the cached `status` computation in `nexus-recipe`; the `RecipeDto.status` field.
- **P2** — `nexus-recipe` crate + `compile_recipe_run` + `parse_target`/`BindingTarget` (CONTRACTS C5; `parse_path` is the deleted EmotionTTS symbol — never referenced) + public `validate_node_config` + `BindingError`.
- **P5** — preset packs (the projection `presets`) the bundle exports.
- **P6** — user-recipe table migration (`author_kind`, nullable `extension_id`) + the `POST /recipes` create service the migration-copy and import reuse.

Intra-phase order: A (upgrade) and B (bundle) are independent Rust workstreams — parallelizable. C (DTOs) follows whichever Rust shape lands first. D (web) follows C (needs generated TS types). Within D: step 10 (client) → 11 (catalog badge) and 12 (blueprint upgrade/share) in parallel.

## Cross-phase contracts

PRODUCES:
- Routes (CONTRACTS C7 — registered via `recipes::router()`, brace `{id}` syntax): `GET /api/v1/recipes/{id}/upgrade-preview` (`recipes/upgrade.rs`), `POST /api/v1/recipes/{id}/upgrade` (`recipes/upgrade.rs`), `GET /api/v1/recipes/{id}/bundle` (`recipes/share.rs`), `POST /api/v1/recipes/import` (`recipes/share.rs`) — all generic-by-`{id}`, host-owned rows.
- Types (Rust, `crates/nexus-recipe`): `RecipePinDiff`, `UpgradeRisk { Safe | Outdated | Breaking }`, `NodeChange`, `ParamChange`, `BrokenBinding`, `MigrationCopyPlan`/`NewUserRecipe`, `RecipeBundle { package_version, recipe, projection, workflow_snapshot, presets, requirements, compatibility, thumbnail?, samples, integrity }`, `Requirements`, `BundleCompatSummary`, `BundleError`. (`summary`/`status` fields reuse the canonical `RecipeStatus` from C6, not a local `CompatStatus`.)
- DTOs (ts-rs): `RecipePinDiffDto` (carries the `risk` summary `'Safe'|'Outdated'|'Breaking'` + `summary` as the lowercased `RecipeStatus` string), `BrokenBindingDto`, `RecipeUpgradeResultDto`, `RecipeBundleDto` → `apps/web/src/api/generated/`.
- Web fetchers: `fetchRecipeUpgradePreview`, `upgradeRecipe`, `exportRecipeBundle`, `importRecipeBundle`.

CONSUMES:
- `WorkflowVersionSnapshot` + per-node `operator_schema_hashes[node_id]` + `canonical_hash` (P0, CONTRACTS C2); `workflow_versions` store + immutability rule.
- `RecipeProjection`, `RecipeDto.status` (a `String`), `RecipeDto.workflow_version`, the canonical `RecipeStatus` enum, and P1's `assess_status` entry point for any status recompute (P1, CONTRACTS C6).
- `compile_recipe_run`, `parse_target`/`BindingTarget`, `validate_node_config`, `BindingError` (P2).
- Projection `presets` (P5).
- User-recipe create service (`author_kind="user"`, nullable `extension_id`) + `POST /recipes` (P6).
- No new host migration by default (reuses P0/P1 tables). Per CONTRACTS C1, if an upgrade-audit / share-log table is genuinely unavoidable it is `030` (NOT `026/027`). Integrity helper pattern from `nexus-deployments::hash` (`sha256_jcs`/`hex`) and redaction pattern from `export.rs` (`SECRET_PATTERNS`/`envelope_contains_secret`) — copied/factored, not cross-depended.

## Boundary discipline

- All new Rust lives in `crates/nexus-recipe` (host, generic). **Zero extension-id literals, zero node-id-shaped constants.** The migration-copy id and any generated identifiers are host-generic, never derived from an extension id.
- New routes are generic-by-`{id}` over host-owned rows (recipes, workflows, workflow_versions), following the host-overlay precedent (install, settings/idle_timeout). The host never parses extension sub-paths.
- The catalog badge derives **only** from host `status`. The grandfathered `includes('chat'|'rag')` heuristic in `recipe_catalog.tsx` (icon-only, XIII.6 debt) is **not** extended — flagged, not grown.
- TWO boundary tests (CONTRACTS C7): `cargo test -p nexus-recipe --test boundary_test` covers the new `nexus-recipe/src` modules (upgrade/migrate/bundle/import) + a node-id-shape literal assertion; the **nexus-api-side** boundary test (stood up by P3) is **extended by P8** to cover the new `crates/nexus-api/src/handlers/recipes/upgrade.rs` + `share.rs` modules. The nexus-recipe test does not `include_str!` nexus-api files.
- svi2-pro / local-llm RPCs untouched; no force-routing.
- Bundle export runs the secret-redaction guard before emitting; integrity digest is recomputed on import (no trust of client-supplied digest).

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| P8 starts before P0/P1/P6 land → no `status`/snapshot/user-recipe create to consume | Hard gate: P8 is blocked on P0,P1,P5,P6 (design §11). Each contract above names its producer; do not stub them in P8. |
| Bundle import is an arbitrary-deserialize attack surface (recreates a workflow version + recipe) | Validate schema + recompute integrity digest server-side + assert every operator resolvable in the live registry + run secret-redaction; reject (422) before any write. Mirror the deployment import hardening. Recreate version as immutable, only-if-absent (never overwrite). |
| Status badge silently regresses into the id heuristic | Explicit test (`chat`-id + `status: healthy` ⇒ not flagged); leave `iconFor` untouched; badge reads `recipe.status` exclusively. |
| Schema-drift detection misses "changed-at-same-version" operators | Compare `operator_schema_hashes[node_id]` per node (P0's per-node map, CONTRACTS C2), not just `id@version` presence — surfaces drift as `broken`. |
| Migration copy accidentally mutates the source recipe | `build_migration_copy` is pure (returns a plan); immutability test asserts source unchanged; handler persists only the new user recipe. |
| Integrity helper duplicated from `nexus-deployments` drifts | Prefer factoring `sha256_jcs`/`hex` into a shared host util if one exists; otherwise duplicate the minimal helper with a test pinning the algorithm string (`hash_algo`). |

## Out of scope

- Auto-upgrade / in-place recipe mutation (design forbids; migration is always a copy).
- Real run execution / artifact production (host engine stays a skeleton; bundle round-trip is measured on resolved values, not artifacts).
- `status` **computation** itself (owned by P1's `nexus-recipe` cache; P8 only surfaces and diffs).
- Normalized projection/version tables (deferred per design §4.1/§4.2; projection stays a JSON document; versions stay `workflow_versions` rows).
- Cross-store remote sharing / a bundle registry (P8 ships file-level export/import only).
- Extending the deployment `ExportEnvelope` to carry recipes (recipe bundle is its own `RecipeBundle` owned by `nexus-recipe`).
- svi2-pro / local-llm migration to the compiler (P7 + later).
