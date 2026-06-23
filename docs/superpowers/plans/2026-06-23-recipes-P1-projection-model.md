# P1: Recipe projection model + pin-backfill + recipe-table migration — Implementation Plan (nexus-dnn, 2026-06-23)

All shared shapes/numbers/routes per 2026-06-23-recipes-00-CONTRACTS.md — this plan does not re-derive them.

## Goal

Stand up the `nexus-recipe` host crate (skeleton + projection model + status computation) and extend the host
recipe schema so a recipe pins exactly one immutable workflow version (`workflow_id` + `workflow_version`),
carries a normalized `projection` JSON document, and surfaces a cached compatibility `status`
(`healthy`|`outdated`|`broken`). The recipe table is softened to host-own user recipes (nullable
`extension_id`/`extension_version`, `author_kind`, guarded extension-scoped delete), and every existing
extension recipe is pin-backfilled (stem → `workflow_id` → `current_version`, unresolvable → `broken` +
`needs re-pin`). Done = projection round-trips through storage, status is unit-tested, existing extension
recipes pin (or fall to `broken+needs-re-pin`) without losing their legacy display path, and a user-authored
recipe row can be inserted.

## Current state (verified)

Re-read against current `main` (HEAD `edb5b870`, 2026-06-23). Anchors below are confirmed, not from the stale
2026-06-14 design.

- **Recipe schema** — `migrations/002_recipes_contributions.sql:7-8` declares `extension_id TEXT NOT NULL
  REFERENCES extensions(id)` and `extension_version TEXT NOT NULL`. `workflow_template_ref TEXT NOT NULL`
  (`:9`) is a bare filename stem, not a version-pinned id. No `workflow_id`, `workflow_version`,
  `projection`, `projection_schema_version`, `status`, or `author_kind` columns exist. PK `id` (`:2`).
- **RecipeRecord** — `crates/nexus-storage/src/records.rs:150-163`. `extension_id: String` and
  `extension_version: String` are **non-Option** (NOT NULL at the Rust level). No `user_edited_at`, no status.
- **Migration registration is manual** — `crates/nexus-storage/src/sqlite/migrations.rs:12-164`. Each file is
  hand-wired via `execute_migration_statements(pool, include_str!(".../NNN_*.sql"), ignore_dup_col)`. **Highest
  migration is 025** (`025_deployment_presets.sql`, wired at `:157-162`) — on raw `main` the next-free number is
  026, but per the C1 ledger that number belongs to P0; P1 owns **027** (see below). A `.sql` file is
  INERT until its `include_str!` call is appended here (the known unregistered-migration root bug). `true` =
  swallow `duplicate column` for `ALTER TABLE ADD COLUMN`; `false` = pure CREATE. Statements split on literal `;`.
  - **Migration number per CONTRACTS C1 ledger: P0=`026`, P1=`027`, P3=`028`.** Highest on `main` is `025`;
    P1 owns `027` (P0's `026_workflow_versions.sql` lands first). DRIFT vs design: design predates 024/025
    and references migration "024-not-yet"; the authoritative number is the C1 ledger, not a `main` re-derivation.
- **Recipe SQL is inline `.sql` files** under `crates/nexus-storage/queries/recipes/` (insert.sql, get_by_id.sql,
  list.sql, list_by_extension.sql, delete_by_extension.sql), bound in `crates/nexus-storage/src/sqlite/content.rs`
  (`insert_recipe` :7, binds 12 cols in struct order; `delete_recipes_by_extension` :58). `insert.sql` =
  `INSERT INTO recipes (12 cols) VALUES (12 ?)`.
- **Row mapping** — `crates/nexus-storage/src/row_mapping.rs:127-142` `map_recipe_row` reads the 12 columns via
  `row.get(...)`. Adding a column requires updating this AND records.rs AND insert.sql binds.
- **DUAL persist path** (delete-then-reinsert, NO user-edit guard):
  - boot/activation: `crates/nexus-core/src/app.rs:795-828` `persist_recipe_records` — `delete_recipes_by_extension`
    at `:800`, builds `RecipeRecord` inline `:809-822`, `insert_recipe` `:824`.
  - HTTP install: `crates/nexus-api/src/mapping.rs:59-77` `persist_recipes_for_extension` — delete `:64`, loop +
    `insert_recipe` `:68-75`; record built by `recipe_to_record` `:99-123`.
  - Both must be touched in sync for any RecipeRecord shape change.
- **Database trait** — `crates/nexus-storage/src/database.rs:99-106` recipe methods; SqliteDatabase delegates at
  `crates/nexus-storage/src/sqlite/mod.rs:222-243`.
- **DTO** — `crates/nexus-api/src/dto/recipes.rs:12-27` `RecipeDto` (+ `From<&RecipeRecord>` impl at `:29-56`),
  ts-rs exported to `apps/web/src/api/generated/`. `bindings` exposed as `Vec<RecipeFieldBindingDto>` (parsed from
  JSON). NO status field. Handlers GET-only: `crates/nexus-api/src/handlers/recipes.rs` (`list_recipes` :10,
  `get_recipe` :23).
- **Workspace** — root `Cargo.toml:4` members glob `crates/*` (a new `crates/nexus-recipe/` auto-joins; no members
  edit). `workspace.dependencies` (`:14-32`) provides serde/serde_json/thiserror/uuid/chrono/etc.
- **Boundary-test precedent** — `crates/nexus-extension-deps/tests/boundary_test.rs` (walk whole `src/`, FORBIDDEN
  id list, handler-scoped opacity guard). Mirror for `nexus-recipe`.
- **P0 dependency (assumed delivered)** — `workflow_versions` table + `workflows.current_version` head pointer +
  read APIs `GET /workflows/{id}/versions[/{version}]` + the net-new `nexus_workflow::WorkflowVersionSnapshot`
  type (CONTRACTS C2 — the single canonical crate path) plus P0's `WorkflowVersionSnapshot::from_record(record,
  operators)` assembler. P1 consumes the head pointer for backfill and the snapshot for `assess_status`; it does
  not author versions.

## Approach

Two largely-independent workstreams under one phase, sequenced so the migration lands before any code reads the
new columns:

1. **Storage schema + record shape (WS-A).** Author `migrations/027_recipes_projection.sql` (CONTRACTS C1: P1=027) adding
   `workflow_id`, `workflow_version`, `projection`, `projection_schema_version`, `status`, `status_reason`,
   `author_kind` to `recipes`, and softening `extension_id`/`extension_version` to nullable. SQLite cannot drop a
   NOT NULL constraint via `ALTER`, so the migration does a table-rebuild (rename → create new shape → copy →
   drop old → rename) for the nullable change while ALTER-adding the rest. Update `RecipeRecord` (Option-ize the
   two ext fields, add the new fields), `insert.sql`, `map_recipe_row`, and both persist builders. Scope the
   extension delete to `author_kind='extension'`.

2. **`nexus-recipe` crate (WS-B).** New host crate owning: the `RecipeProjection` model (sections/controls/
   presets/output/`custom_ui?`, `schema_version`), a `RecipeStatus` enum (snake_case serde) plus BOTH the pure
   `compute_status` primitive and the higher-level `assess_status` (CONTRACTS C6 — the entry point P6/P8 call),
   and a `resolve_pin` helper that maps a `workflow_template_ref` stem → `workflow_id` → `current_version`. The
   crate stays generic-by-`control_id`/path-string with zero extension-id literals; a `boundary_test` enforces it.

3. **Wire-up (WS-C).** Migration-time + boot-time pin backfill that calls `nexus-recipe::resolve_pin`, writing
   the resolved pin or `status='broken'` + `status_reason='needs_re_pin'`. Surface `status` (+ pin fields) on
   `RecipeDto` so the catalog can later read it (P8), keeping the legacy `bindings`/`workflow_template_ref`
   display path intact.

TDD throughout: storage round-trip + nullable-insert tests, projection serde round-trip, status truth table, and
pin-backfill resolution tests are written RED first.

## Changes (ordered steps)

1. **`migrations/027_recipes_projection.sql`** (NEW; CONTRACTS C1 ledger — P0=026, P1=027, P3=028). Add the projection/pin/status/author columns and make the
   two extension fields nullable. The ADD COLUMNs are plain ALTER (idempotent via `ignore_duplicate_column=true`):
   ```sql
   -- new columns are additive; nullable ext fields require a table rebuild below
   ALTER TABLE recipes ADD COLUMN workflow_id TEXT;
   ALTER TABLE recipes ADD COLUMN workflow_version TEXT;
   ALTER TABLE recipes ADD COLUMN projection TEXT;
   ALTER TABLE recipes ADD COLUMN projection_schema_version INTEGER NOT NULL DEFAULT 1;
   ALTER TABLE recipes ADD COLUMN status TEXT NOT NULL DEFAULT 'healthy';
   ALTER TABLE recipes ADD COLUMN status_reason TEXT;
   ALTER TABLE recipes ADD COLUMN author_kind TEXT NOT NULL DEFAULT 'extension';
   ```
   Then a table-rebuild for the nullable change: `CREATE TABLE recipes_rebuild (... extension_id TEXT,
   extension_version TEXT, all new cols, no NOT NULL on ext fields, soft FK dropped ...)`,
   `INSERT INTO recipes_rebuild SELECT ... FROM recipes`, `DROP TABLE recipes`,
   `ALTER TABLE recipes_rebuild RENAME TO recipes`, recreate `idx_recipes_extension` + `idx_recipes_category`.
   **Idempotency:** because the runner re-runs every migration each boot, the ADD COLUMNs are safe via the
   duplicate-column swallow, and the rebuild must only fire when the old shape is still present. Author the
   rebuild so a second run is a harmless no-op (the rebuilt table has nullable ext cols, so re-adding columns
   trips the duplicate-column swallow and the rebuild block, if re-run, recreates an equivalent table). Keep the
   rebuild minimal and document the re-run reasoning in a <=2-line SQL header comment. Why: P1 must allow
   `extension_id IS NULL` for user recipes and add the pin/status/projection surface.

2. **Register 027** in `crates/nexus-storage/src/sqlite/migrations.rs`. Append after P0's `026` block (which P0
   appends after the 025 block at `:157-162`), in numeric order:
   `execute_migration_statements(pool, include_str!("../../../../migrations/027_recipes_projection.sql"), true).await?;`
   (`true` — it contains `ALTER TABLE ADD COLUMN`). Why: unregistered migrations silently never run.

3. **`crates/nexus-storage/src/records.rs`** — update `RecipeRecord` (`:150-163`): change `extension_id:
   Option<String>`, `extension_version: Option<String>`; add `workflow_id: Option<String>`, `workflow_version:
   Option<String>`, `projection: Option<String>`, `projection_schema_version: i64`, `status: String`,
   `status_reason: Option<String>`, `author_kind: String`. Why: mirror the new schema; `Option`-ize ext fields
   for user recipes.

4. **`crates/nexus-storage/queries/recipes/insert.sql`** — extend the column + placeholder list to include the
   seven new columns in a fixed order; **`crates/nexus-storage/src/sqlite/content.rs`** `insert_recipe` (`:7-23`)
   — add `.bind(...)` calls in the exact same order. Why: persist new fields.

5. **`crates/nexus-storage/src/row_mapping.rs`** `map_recipe_row` (`:127-142`) — read the seven new columns
   (`projection_schema_version` via `row.get::<i64,_>`; `author_kind`/`status` as `String`; the rest `Option`).
   Why: reads must match the new shape or every fetch desyncs.

6. **`crates/nexus-storage/queries/recipes/delete_by_extension.sql`** — add `AND author_kind = 'extension'` to the
   `WHERE` clause. Why: the shared-table hazard — extension re-scan must never wipe user recipes. **P1 is the SOLE
   OWNER of this `author_kind='extension'`-scoped delete** (it lands with the nullable/`author_kind` migration);
   P6 (user-recipe writes) only VERIFIES the scoping holds for its inserts — it does not re-author the guard.

7. **Both persist builders** — `crates/nexus-core/src/app.rs:809-822` (boot) and
   `crates/nexus-api/src/mapping.rs:109-122` (`recipe_to_record`, HTTP install). Set `extension_id:
   Some(ext_id.clone())`, `extension_version: Some(...)`, `author_kind: "extension".into()`, `status:
   "healthy".into()` (corrected by backfill in step 9), `status_reason: None`, `projection: None` for now,
   `projection_schema_version: 1`, `workflow_id`/`workflow_version`: `None` (backfilled). Why: keep both
   producers in sync; extension recipes are `author_kind=extension`.

8. **`crates/nexus-recipe`** (NEW crate). `Cargo.toml` (edition 2024; deps `serde`, `serde_json`, `thiserror`,
   `chrono` via `{ workspace = true }`; path dep on `nexus-workflow`). `src/lib.rs` re-exports. Modules:
   - `projection.rs` — `RecipeProjection { schema_version: u32, sections: Vec<Section>, controls: Vec<Control>,
     presets: Vec<Preset>, output: Output, custom_ui: Option<CustomUi> }` plus `Section`, `Control { control_id,
     kind, label, help_text?, mode, default_value, widget_hint?, bindings: Vec<String> }` (kind enum string|enum|
     bool|int|float|asset|preset_selector; mode enum basic|advanced|hidden|locked), `Preset { preset_id, label,
     description?, source, values: Map }`, `Output`, and `CustomUi { extension_id: String, component_ref: String }`.
     The `custom_ui` field is **FR-3 / CONTRACTS C6** — `#[serde(default, skip_serializing_if = "Option::is_none")]`,
     `null`/absent for generated UI; P1 only STORES the reference, rendering is the FR-10 contract (C8). All
     `serde(rename_all = "snake_case")` to match the CONTRACTS C6 JSON. Serde round-trips.
   - `status.rs` — `#[serde(rename_all = "snake_case")] pub enum RecipeStatus { Healthy, Outdated, Broken }`
     (serializes `"healthy"|"outdated"|"broken"`; CONTRACTS C6) with `as_str`/`from_str`. **Two entry points,
     P1 owns both (CONTRACTS C6):**
     - **Pure primitive** — `pub fn compute_status(pinned_version_exists, pinned_is_current, bindings_ok,
       operator_schema_drift, unresolved_pin) -> (RecipeStatus, Option<String>)`. Truth table:
       unresolved/missing/!bindings_ok/drift → `Broken` (+ reason); valid-but-not-current → `Outdated`;
       else `Healthy`. No registry/DB access — keeps the unit pure.
     - **Higher-level** — `pub fn assess_status(projection: &RecipeProjection, pinned_snapshot:
       Option<&WorkflowVersionSnapshot>, current_snapshot: Option<&WorkflowVersionSnapshot>, operators:
       &[OperatorDefinition]) -> (RecipeStatus, Option<String>)`. Runs the binding checks (resolve
       `projection` bindings against the pinned snapshot, derive `bindings_ok` + per-node `operator_schema_drift`
       from `pinned` vs `current` operator-schema hashes) then delegates to `compute_status`. **P6 and P8 call
       `assess_status`** (not the 5-arg primitive); `refresh_status_for_workflow` (step 9b) also routes through it.
     `RecipeDto.status` is a `String` (lowercased variant; CONTRACTS C6), never the enum on the wire.
   - `pin_backfill.rs` — `pub fn resolve_pin(template_ref: &str, lookup: &dyn StemLookup) -> PinResult` where
     `StemLookup` is a trait the host implements (stem → `Option<workflow_id>`, `workflow_id` →
     `Option<current_version>`). Returns `Resolved { workflow_id, workflow_version }` or `Unresolvable`. Stem
     normalization: strip a `workflows/` prefix and a `.yaml`/`.yml` suffix before lookup. Why: the
     keystone-crate skeleton + the P1-mandatory backfill primitive, kept host-generic.

9. **Pin-backfill wire-up** — after step 7 persist, in BOTH boot (`app.rs`) and HTTP-install (`mapping.rs`) paths
   (or a shared helper called from both), for each just-persisted extension recipe call
   `nexus_recipe::resolve_pin(&record.workflow_template_ref, &lookup)` where `lookup` queries the host workflow
   head pointer (P0 `current_version`). On `Resolved`, UPDATE the recipe row's `workflow_id`/`workflow_version`
   and recompute `status` via `compute_status`; on `Unresolvable`, set `status='broken'`,
   `status_reason='needs_re_pin'`, leave pins NULL. Add a storage method
   `update_recipe_pin(id, workflow_id, workflow_version, status, status_reason)` (trait in `database.rs`, impl in
   `content.rs` + new `queries/recipes/update_pin.sql`, delegate in `sqlite/mod.rs`). Why: without backfill every
   extension recipe computes `broken` the moment P1 lands; legacy display still works because
   `workflow_template_ref`/`bindings` are untouched.

   **Node-id shape the EmotionTTS pin resolves to (P7 precondition — CONTRACTS C8 / completeness).** `resolve_pin`
   maps a *stem* → `workflow_id` → `current_version`; it does NOT touch node ids. But the pinned
   `WorkflowVersionSnapshot` that `assess_status` later resolves bindings against carries `NodeInstance` ids in the
   **suffixed `*_1` shape** (e.g. `synthesis_1`), NOT the un-suffixed YAML node ids (e.g. `synthesis`) — the host
   assembler appends the instance ordinal when materializing a workflow from its YAML template. Therefore the
   EmotionTTS projection bindings P7 transcribes MUST target the suffixed ids
   (`node:synthesis_1.config.speed_factor`, matching CONTRACTS C6), so the recipe's pinned snapshot resolves them.
   P1 records this as the contract P7 depends on; P1 itself stays node-id-agnostic (boundary_test forbids node-id
   literals in `nexus-recipe/src` — the assertion below uses a synthetic fixture, not a hardcoded crate constant).

9b. **`refresh_status_for_workflow(db, workflow_id)` (P1 OWNS — CONTRACTS C6, FR-7/§4.2/§10).** A host-side helper
    (in `nexus-recipe`, or `nexus-core` wiring over the `nexus-recipe` `assess_status` + storage trait) that
    enumerates recipes pinned to `workflow_id`, loads each recipe's projection + the pinned and current
    `WorkflowVersionSnapshot`s, recomputes via `assess_status`, and persists the cached `status`/`status_reason`
    column via `update_recipe_pin`. **P1 wires it into the TWO version-advance sites P0 creates:**
    `update_workflow_graph` (after P0 advances `workflows.current_version`) and the boot/activation re-scan append
    in `app.rs`. The recipe's own pin stays fixed; only the cached compatibility `status` is refreshed when its
    pinned workflow advances. Why: a pinned recipe must flip `healthy → outdated/broken` when its workflow gains
    a new version, without a manual re-pin.

10. **`crates/nexus-recipe/tests/boundary_test.rs`** (NEW). Mirror `nexus-extension-deps`: walk whole `src/`,
    assert no extension-id literals (FORBIDDEN list incl. `local-llm`, `emotiontts`, `svi2`, `rag`, `chat`), and a
    literal-shape assertion that no node-id-shaped constant (`node:`, `_1.config.`, `.config.`) appears in the
    crate source. Why: §8 hard gate — `cargo test -p nexus-recipe --test boundary_test`.

11. **`crates/nexus-api/src/dto/recipes.rs`** — add `status: String`, `status_reason: Option<String>`,
    `workflow_id: Option<String>`, `workflow_version: Option<String>` to `RecipeDto` (`:12-27`) and the
    `From<&RecipeRecord>` impl (`:29-56`). `RecipeDto.status` is a `String` (CONTRACTS C6), not the enum.
    `extension_id`/`extension_version` become `Option<String>` to match the record. Regenerate ts-rs
    bindings (cargo test exports). Why: expose pin + status to the web shell (consumed by P8); keep the DTO
    faithful to the record.

12. **`crates/nexus-api/Cargo.toml`** — add `nexus-recipe = { path = "../nexus-recipe" }` (production dep; host
    crate, boundary-clean). Why: handlers/wire-up reference the projection + backfill types.

## TDD test plan

Write these RED first, then implement to GREEN.

**Storage (cargo test -p nexus-storage)**
- `recipe_record_round_trips_with_new_columns` — insert a `RecipeRecord` with projection/status/author_kind set,
  `get_recipe`, assert all new fields survive. (Asserts schema + binds + row_mapping coherent.)
- `user_recipe_insert_with_null_extension_succeeds` — insert a record with `extension_id: None`,
  `extension_version: None`, `author_kind: "user"`; assert it persists and reads back NULL. (Asserts nullable
  migration worked.)
- `delete_recipes_by_extension_leaves_user_recipes` — insert one extension recipe + one user recipe (NULL ext),
  call `delete_recipes_by_extension(ext)`, assert the user recipe remains and the extension one is gone.
- `migration_027_reruns_idempotently` — run migrations twice against the same pool; assert no error and the
  nullable shape + new columns persist.
- GREEN: run migration 027, Option-ize record, extend insert.sql/binds/row_mapping, add `author_kind` guard to
  delete SQL.

**`nexus-recipe` (cargo test -p nexus-recipe)**
- `projection_serde_round_trips` — deserialize a fixture matching CONTRACTS C6 JSON, re-serialize, assert
  semantic equality (sections/controls/presets/output, snake_case keys, fan-out `bindings` array).
- `projection_custom_ui_round_trips` (FR-3, CONTRACTS C6) — a projection WITH `custom_ui { extension_id,
  component_ref }` round-trips and re-serializes to the snake_case `custom_ui` object; a projection WITHOUT it
  omits the key entirely (`skip_serializing_if`), and a fixture with `custom_ui: null`/absent deserializes to `None`.
- `status_broken_when_pin_unresolvable` / `status_broken_on_operator_schema_drift` /
  `status_broken_when_pinned_version_missing` — `compute_status` returns `Broken` + correct reason.
- `status_outdated_when_pinned_not_current` — returns `Outdated`, never blocks.
- `status_healthy_when_pinned_current_and_no_drift` — returns `Healthy`.
- `recipe_status_serializes_snake_case` — `RecipeStatus::{Healthy,Outdated,Broken}` serde to
  `"healthy"|"outdated"|"broken"` (CONTRACTS C6).
- `assess_status_derives_facts_from_snapshots` (CONTRACTS C6) — `assess_status(projection, pinned_snapshot,
  current_snapshot, operators)` resolves projection bindings + per-node schema-hash drift and returns the same
  `(RecipeStatus, reason)` the primitive would for the equivalent facts (drift → `Broken`; pinned≠current,
  no drift → `Outdated`; pinned==current, bindings_ok → `Healthy`).
- `resolve_pin_strips_stem_and_resolves_current_version` — `workflows/emotional_dialogue_batch.yaml` →
  `workflow_id` → `current_version` via a fake `StemLookup`, asserts `Resolved`.
- `resolve_pin_unresolvable_stem_returns_unresolvable` — unknown stem → `Unresolvable`.
- `assess_status_resolves_suffixed_node_id_bindings` (P7 precondition — CONTRACTS C8) — a synthetic projection
  whose binding targets the **suffixed** `node:synthesis_1.config.<field>` resolves cleanly against a
  `WorkflowVersionSnapshot` whose `NodeInstance` id is `synthesis_1` (→ `bindings_ok`, contributes to `Healthy`),
  while the same projection bound to the **un-suffixed** `node:synthesis.config.<field>` fails to resolve
  (→ `Broken`/broken-binding). Pins the suffixed `*_1` shape as the contract P7's EmotionTTS bindings must match.
  Uses synthetic ids only — no hardcoded extension/node literals in `src/` (boundary_test stays green).
- `boundary_no_extension_literals` / `boundary_no_node_id_shapes` (the boundary_test file).
- GREEN: implement projection/status/pin_backfill modules.

**Wire-up (cargo test -p nexus-core / -p nexus-api integration)**
- `extension_recipe_pinned_on_persist` — persist an extension whose recipe stem resolves; assert the row gets
  `workflow_id`/`workflow_version` set and `status='healthy'`.
- `extension_recipe_unresolvable_marks_needs_re_pin` — stem that resolves to nothing → `status='broken'`,
  `status_reason='needs_re_pin'`, pins NULL, legacy `workflow_template_ref`/`bindings` intact.
- `cached_status_refreshes_on_version_change` (§10, CONTRACTS C6) — a recipe pinned to a workflow at its
  current version reads `status='healthy'`; advance the workflow's `current_version` (P0 site) and invoke
  `refresh_status_for_workflow(db, workflow_id)`; assert the recipe's cached `status` flips to `outdated`
  (pin unchanged, no schema drift) and persists.
- GREEN: backfill wire-up + `update_recipe_pin` + `refresh_status_for_workflow` + the two P0 call sites.

## Acceptance criteria

- Migration test green: 027 applies idempotently (including re-run) and yields nullable `extension_id`/
  `extension_version` + the projection/pin/status/author columns.
- A `RecipeProjection` round-trips through serde and through the `recipes.projection` JSON column.
- `RecipeStatus` / `compute_status` unit-tested across healthy / outdated / broken (incl. operator-schema-drift
  and unresolvable-pin reasons).
- Every existing extension recipe is pin-backfilled: resolvable stems get `workflow_id`+`workflow_version` and a
  computed `status`; unresolvable stems get `status='broken'` + `status_reason='needs_re_pin'` and keep working
  via the legacy display path.
- A user-authored recipe (`extension_id IS NULL`, `author_kind='user'`) can be inserted, and an extension re-scan
  (`delete_recipes_by_extension`) leaves it untouched.
- `cargo test -p nexus-recipe --test boundary_test` passes (zero extension-id literals, zero node-id-shaped
  constants).

## Dependencies & sequencing

- **Upstream: P0** — requires `workflows.current_version` head pointer (for stem → current_version) and the
  `WorkflowVersionSnapshot` type in `nexus-workflow` (the P1 crate depends on `nexus-workflow`; backfill reads the
  head pointer). If P0's current_version is not yet present, the `StemLookup` impl is the integration seam to
  stub.
- **Intra-phase order:** WS-A migration + record/SQL/row_mapping (steps 1-7) → `nexus-recipe` crate + tests
  (steps 8, 10) → backfill wire-up + `update_recipe_pin` (step 9) → `refresh_status_for_workflow` + the two P0
  call sites (step 9b) → DTO + api dep (steps 11-12). Crate scaffolding (step 8) can proceed in parallel with WS-A.
- **Downstream:** P2 (compiler) consumes the `RecipeProjection` type and `nexus_workflow::WorkflowVersionSnapshot`;
  P6 uses the nullable/`author_kind` table for user-recipe writes and calls `assess_status` — and only VERIFIES
  P1's `author_kind='extension'`-scoped delete (P1 owns that guard, step 6); P8 reads the cached `status` and calls
  `assess_status`. **P7 precondition:** P1 records that a pinned snapshot exposes `NodeInstance` ids in the
  suffixed `*_1` shape, so P7's transcribed EmotionTTS bindings must use `node:synthesis_1.config.*` (see step 9).

## Cross-phase contracts

PRODUCES:
- Migration **027_recipes_projection.sql** (CONTRACTS C1 ledger) — recipes gains `workflow_id TEXT`, `workflow_version TEXT`,
  `projection TEXT`, `projection_schema_version INTEGER NOT NULL DEFAULT 1`, `status TEXT NOT NULL DEFAULT
  'healthy'`, `status_reason TEXT`, `author_kind TEXT NOT NULL DEFAULT 'extension'`; `extension_id`/
  `extension_version` become nullable (FK softened to soft/by-convention).
- Crate **`nexus-recipe`** with: `RecipeProjection { schema_version: u32, sections, controls, presets, output,
  custom_ui: Option<CustomUi> }` (serde snake_case; `custom_ui` per FR-3 / CONTRACTS C6, optional), `Control {
  control_id, kind, label, help_text?, mode, default_value, widget_hint?, bindings: Vec<String> }`,
  `Preset { preset_id, label, description?, source, values }`, `CustomUi { extension_id, component_ref }`.
- `#[serde(rename_all = "snake_case")] pub enum RecipeStatus { Healthy, Outdated, Broken }` (serializes
  `healthy|outdated|broken`; CONTRACTS C6) + the pure `pub fn compute_status(pinned_version_exists,
  pinned_is_current, bindings_ok, operator_schema_drift, unresolved_pin) -> (RecipeStatus, Option<String>)`
  AND the higher-level `pub fn assess_status(projection, pinned_snapshot, current_snapshot, operators) ->
  (RecipeStatus, Option<String>)` — **the entry point P6/P8 call**. `RecipeDto.status` is a `String`.
- `pub fn resolve_pin(template_ref: &str, lookup: &dyn StemLookup) -> PinResult` (+ `trait StemLookup`).
- `RecipeRecord` new shape (Option ext fields + 7 new fields) — `crates/nexus-storage/src/records.rs`.
- Storage method `update_recipe_pin(id, workflow_id, workflow_version, status, status_reason)` on the `Database`
  trait + `queries/recipes/update_pin.sql`.
- `refresh_status_for_workflow(db, workflow_id)` (P1 OWNS — CONTRACTS C6) wired into P0's two version-advance
  sites (`update_workflow_graph` + the `app.rs` boot/activation re-scan); recomputes cached `status` via
  `assess_status` for every recipe pinned to the advanced workflow.
- `RecipeDto` gains `status`, `status_reason`, `workflow_id`, `workflow_version` (ts-rs →
  `apps/web/src/api/generated/RecipeDto.ts`).

CONSUMES (from P0):
- `workflows.current_version` head pointer and `nexus_workflow::WorkflowVersionSnapshot` (CONTRACTS C2 — the
  single canonical crate path; P1 names exactly this, never a local stand-in). `assess_status` /
  `refresh_status_for_workflow` take `WorkflowVersionSnapshot` for the pinned + current versions, assembled via
  P0's `WorkflowVersionSnapshot::from_record(record, operators)`.
- Read API `GET /workflows/{id}/versions[/{version}]` (only if the `StemLookup` impl resolves via API vs direct
  storage; prefer direct in-process storage).

## Boundary discipline

- `crates/nexus-recipe` is a **host crate** (generic infrastructure). Zero extension-id literals, zero hardcoded
  node ids — generic by `control_id` and path string only. The EmotionTTS `RecipeField`/`targets()`/`CURATED_*`
  tables are NOT lifted into this crate (extension-private; P7 transcribes them into projection data).
- `migrations/027_recipes_projection.sql` lives in the **host** `migrations/` folder and is host-generic
  (`workflow_id`, `author_kind`, status are not extension-named). No extension-specific tables here.
- No new HTTP routes in P1 (read surface unchanged); `RecipeDto` stays generic. The grandfathered
  `recipe.id.includes('chat'|'rag')` icon heuristic in `apps/web/src/catalog/recipe_catalog.tsx:32-38` is NOT
  touched or extended (P8 adds the status badge instead).
- Boundary enforced by `cargo test -p nexus-recipe --test boundary_test` (mirrors the spec-035 precedent).
- `nexus-recipe` depends only on host crates (`nexus-workflow`); it does NOT route through `nexus-builtins`
  (the sole sanctioned extension-coupling bridge).
- House style: new-code body comments <=2 lines (docstrings exempt); edit from repo root so the comment-write
  PreToolUse hook resolves correctly.

## Risks & mitigations

- **SQLite cannot relax NOT NULL via ALTER** → use a table-rebuild (rename/create/copy/drop/rename + recreate
  indexes) for the nullable change; ADD COLUMNs stay plain ALTER (idempotent under `ignore_duplicate_column`).
  Test re-run idempotency explicitly (`migration_027_reruns_idempotently`).
- **Migration not registered** (the known root bug) → step 2 appends the `include_str!` call; covered by the
  round-trip storage test which only passes if 027 actually ran.
- **Dual persist path drift** → steps 7 + 9 touch BOTH `app.rs` and `mapping.rs`; the unresolvable-backfill test
  runs through the persist path to catch a missed builder.
- **Backfill instantly breaks every recipe** → unresolvable → `broken+needs_re_pin` with the legacy
  `workflow_template_ref`/`bindings` display untouched; tested.
- **FK softening loses referential intent for extension rows** → keep `extension_id` as a soft FK (by
  convention, enforced in app code on the extension-persist path); user rows legitimately NULL.
- **P0 not landed** → `StemLookup` is the integration seam; stub it for unit tests, wire to `current_version`
  once P0 is in.

## Out of scope

- The binding compiler / fan-out writer / `ResolvedRun` (P2).
- `compile_recipe_run`, the public `validate_node_config` wrapper, input-value checks (P2).
- Submit routes `POST /recipes/{id}/run`, deployment run extension, `create_run_from_resolved` (P3).
- Generated `RecipeForm`, `GET /recipes/{id}/form` (P4); preset packs (P5); recipe builder + write API (P6).
- EmotionTTS migration / hardcoded-table removal (P7); outdated badge UI + shareability bundle (P8).
- Authoring `workflow_versions` rows or changing workflow write paths (P0).
- P1 keeps `compute_status` a PURE primitive (no registry/DB). The higher-level `assess_status` and
  `refresh_status_for_workflow` (status recompute on version-advance) ARE in P1 scope (CONTRACTS C6); P6/P8
  call `assess_status` for their own recompute sites (e.g. upgrade-preview), but the version-change refresh
  hook + its two P0 call sites belong to P1.
