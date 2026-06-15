# P6 — Projection Ingestion + Recipe Write API + No-Code Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.
>
> **Design-led UI (constitution XII.8):** Tasks 6–7 ship UI — invoke `nexudnn-design` for Spectral Graphite direction before styling. Plan CSS is a skeleton.

**Goal:** Make the P0–P4 rails actually *live*. First close the keystone gap the holistic review found — recipe `projection` is never populated — by ingesting an extension-authored projection from the recipe manifest, and proving it end-to-end with a real EmotionTTS projection. Then add a recipe write API + user-recipe storage and a no-code Recipe Builder so non-developers can author projections over any workflow.

**Architecture:** `RecipeFile` (in `nexus-extension`) gains `projection: Option<serde_json::Value>` (raw JSON — `nexus-extension` must NOT depend on `nexus-recipe`, that would cycle since `nexus-recipe → nexus-extension`). The host ingests it: `recipe_to_record`/`persist_recipe_records` serialize it into the `recipes.projection` column and validate it parses as `nexus_recipe::RecipeProjection` (warn, don't fail). User recipes are host-owned rows that satisfy the existing `extension_id NOT NULL`+FK via a reserved sentinel extension row `host.user-recipes` (idempotent boot insert) — avoiding the unsafe table rebuild the migration runner can't do idempotently. The builder is a generic host React surface that POSTs validated projections to the write API.

**Tech Stack:** Rust (serde_json, axum, ts-rs), React 19 + TS + vanilla-extract + SWR, sqlx (SQLite), vitest.

**Depends on:** P0 (versions), P1 (projection column, status, nexus-recipe), P2 (compiler — save-time validation), P3 (compile_and_launch), P4 (RecipeForm — builder reuses widgets + the form for preview).

**Build order:** Tasks 1→3 are the make-LIVE keystone (do first). Tasks 4–5 add the write path. Tasks 6–7 are the builder UI.

---

### Task 1: `RecipeFile.projection` (raw JSON) + parse

**Files:**
- Modify: `crates/nexus-extension/src/recipe.rs` (add field)
- Test: `crates/nexus-extension/src/recipe.rs` `#[cfg(test)]`

- [ ] **Step 1: Add the field + failing test**

In `crates/nexus-extension/src/recipe.rs`, add to `RecipeFile` (after `bindings`):

```rust
    /// Host-shape recipe projection authored by the extension, as RAW JSON.
    /// Kept untyped here because `nexus-extension` must not depend on
    /// `nexus-recipe` (that crate depends on this one). The host parses+validates
    /// it into `nexus_recipe::RecipeProjection` at ingestion time.
    #[serde(default)]
    pub projection: Option<serde_json::Value>,
```

Add a test (a new `#[cfg(test)] mod tests` if absent) that parses a recipe YAML with a `projection:` block and asserts `file.projection.is_some()` and a nested value reads back:

```rust
#[cfg(test)]
mod p6_projection_tests {
    use super::*;

    const YAML: &str = r#"
spec_version: '0.1'
recipe:
  id: r
  version: 1.0.0
  display_name: R
  summary: s
  category: c
workflow_template: workflows/x.yaml
projection:
  schema_version: 1
  controls:
    - control_id: speed
      kind: float
      label: Speed
      mode: basic
      default_value: 1.0
      bindings: ["node:post_1.config.speed"]
"#;

    #[test]
    fn parses_projection_block_as_raw_json() {
        let file: RecipeFile = serde_saphyr::from_str(YAML).unwrap();
        let proj = file.projection.expect("projection present");
        assert_eq!(proj["controls"][0]["control_id"], "speed");
    }
}
```

(Confirm the crate's YAML parser is `serde_saphyr` as `parse_recipe_definition` uses; match it.)

- [ ] **Step 2: Run + commit**

Run: `cargo test -p nexus-extension p6_projection_tests`
Expected: PASS.

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add crates/nexus-extension/src/recipe.rs
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(extension): RecipeFile carries raw projection block (P6)"
```

---

### Task 2: Host ingests + validates the projection

**Files:**
- Modify: `crates/nexus-api/src/mapping.rs` (`recipe_to_record`)
- Modify: `crates/nexus-core/src/app.rs` (`persist_recipe_records` / wherever `RecipeRecord` is built for boot)
- Test: `crates/nexus-api/src/mapping.rs` `#[cfg(test)]` or a storage roundtrip

The `recipes.projection` column + `RecipeRecord.projection` already exist (P1). Wire the manifest value into it + validate.

- [ ] **Step 1: Serialize + validate in `recipe_to_record`**

In `crates/nexus-api/src/mapping.rs` `recipe_to_record`, set the `projection` field (currently `None` from P1) from `recipe.projection`:

```rust
        projection: recipe.projection.as_ref().map(|v| {
            // best-effort validation: warn if it does not parse as a RecipeProjection
            if serde_json::from_value::<nexus_recipe::RecipeProjection>(v.clone()).is_err() {
                tracing::warn!(recipe_id = %recipe.recipe.id, "recipe projection does not parse as RecipeProjection; storing raw");
            }
            serde_json::to_string(v).unwrap_or_default()
        }),
        projection_schema_version: recipe
            .projection
            .as_ref()
            .and_then(|v| v.get("schema_version").and_then(|s| s.as_i64())),
```

(`nexus-api` already depends on `nexus-recipe` since P3. Keep `author_kind: "extension"`.)

- [ ] **Step 2: Mirror in the core boot persist path**

Find where `nexus-core/src/app.rs` builds `RecipeRecord` for boot persistence (`persist_recipe_records`). If it constructs `RecipeRecord` directly, set `projection`/`projection_schema_version` from `recipe.projection` the same way (nexus-core already deps nexus-recipe since P1). If boot delegates to `mapping::recipe_to_record`, no change needed — confirm which.

- [ ] **Step 3: Failing test**

Add a test that a `RecipeFile` with a projection round-trips into `RecipeRecord.projection` as parseable JSON containing the controls. Place it where `recipe_to_record` is testable (mapping.rs unit test constructing a `RecipeFile`/`ActivatedExtension` fixture, or a storage-level assertion after persist).

- [ ] **Step 4: Run + commit**

Run: `cargo test -p nexus-api recipe_to_record` (or the test name you used) `&& cargo build -p nexus-api -p nexus-core`
Expected: PASS.

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add crates/nexus-api/src/mapping.rs crates/nexus-core/src/app.rs
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(api,core): ingest extension recipe projection into projection column (P6)"
```

---

### Task 3: Author the real EmotionTTS projection — prove it LIVE

**Files:**
- Modify: `extensions/builtin/emotion-tts/recipes/emotional_dialogue_batch.yaml` (add `projection:` block)
- Test: `crates/nexus-api/tests/recipe_form_live_test.rs` (new integration test)

This proves the whole P0–P6 chain end-to-end on a real recipe. Derive the projection from the recipe's existing `fields:` + the node-target fan-out table in `extensions/builtin/emotion-tts/rust/src/workflow_binding.rs` (`RecipeField::targets()`).

- [ ] **Step 1: Add the `projection:` block**

Append to `extensions/builtin/emotion-tts/recipes/emotional_dialogue_batch.yaml` a host-shape projection. Map each UI field to its node-config targets from `targets()` (verbatim from `workflow_binding.rs` — e.g. OutputFormat → `node:postprocess_1.config.output_format` + `node:export_bundle_1.config.output_format`; SpeedFactor → `node:postprocess_1.config.speed_factor`; ScriptText → `input:script_text`):

```yaml
projection:
  schema_version: 1
  sections:
    - id: input
      title: Script
      order: 0
      control_ids: [script]
    - id: voice
      title: Voice & Emotion
      order: 1
      control_ids: [output_format, speed_factor]
  controls:
    - control_id: script
      kind: string
      label: Dialogue script
      mode: basic
      bindings: ["input:script_text"]
    - control_id: output_format
      kind: enum
      label: Output format
      mode: basic
      default_value: "mp3"
      bindings:
        - "node:postprocess_1.config.output_format"
        - "node:export_bundle_1.config.output_format"
    - control_id: speed_factor
      kind: float
      label: Speed
      mode: basic
      default_value: 1.0
      bindings: ["node:postprocess_1.config.speed_factor"]
  presets:
    - preset_id: fast_draft
      label: Fast Draft
      source: extension
      values: { output_format: "mp3", speed_factor: 1.2 }
  output:
    primary_artifact: audio
    preview_style: player
```

(Confirm the exact workflow input port name — `script_text` vs `script` — and node ids against `workflow_binding.rs` CURATED_NODES + the workflow YAML `workflows/emotional_dialogue_batch.yaml`. Use the real ones.)

- [ ] **Step 2: Failing live integration test**

Create `crates/nexus-api/tests/recipe_form_live_test.rs`. Using the api test harness (copy bootstrap from `recipe_run_test.rs`, written in P3): seed the emotion-tts workflow + a `workflow_versions` row + the emotion-tts recipe WITH the projection column populated (or run the real ingestion path), then:

```text
1. GET /recipes/{id}/form -> 200, controls includes "script","output_format","speed_factor"; output_format has enum/string schema_hint
2. POST /recipes/{id}/run {control_values:{output_format:"wav"}} -> 201; assert the persisted run_resolved_graph's workflow_json has BOTH postprocess_1.config.output_format and export_bundle_1.config.output_format == "wav" (fan-out proven on a real recipe)
```

Implement as real calls (or direct `build_recipe_form` + `compile_and_launch` against a seeded test `AppState`).

- [ ] **Step 3: Run + commit**

Run: `cargo test -p nexus-api --test recipe_form_live_test`
Expected: PASS — the slice is now live on a real recipe.

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add extensions/builtin/emotion-tts/recipes/emotional_dialogue_batch.yaml crates/nexus-api/tests/recipe_form_live_test.rs
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(emotion-tts): author host projection — slice live end-to-end (P6)"
```

---

### Task 4: User-recipe sentinel + recipe write API

**Files:**
- Modify: `crates/nexus-core/src/app.rs` (boot: idempotent sentinel extension insert)
- Create: `crates/nexus-storage/queries/recipes/update.sql` (full update for user recipes) + `delete.sql`
- Modify: `crates/nexus-storage/src/sqlite/content.rs` + `database.rs` + `sqlite/mod.rs` (update_recipe + delete_recipe methods)
- Modify: `crates/nexus-api/src/handlers/recipes.rs` (create/update/delete handlers)
- Modify: `crates/nexus-api/src/router.rs` (routes)
- Test: `crates/nexus-api/tests/recipe_write_test.rs`

- [ ] **Step 1: Boot sentinel extension row (idempotent)**

In `crates/nexus-core/src/app.rs` boot (after migrations/discovery), insert a reserved extension the FK can point at, idempotently:

```rust
let _ = db.insert_extension(&nexus_storage::records::ExtensionRecord {
    id: "host.user-recipes".into(), name: Some("User Recipes".into()),
    version: "1.0.0".into(), description: None, publisher: Some("host".into()),
    host_api_compat: "1".into(), protocol_compat: "1".into(),
    runtime_family: "None".into(), entrypoint: "".into(), capabilities: None,
    status: "enabled".into(), directory: "".into(),
    installed_at: chrono::Utc::now().to_rfc3339(),
    recipe_count: None, ui_contribution_count: None, validation_errors: None,
    primary_recipe_id: None, default_workflow_id: None,
    icon_kind: None, icon_symbol: None, icon_svg: None,
}).await; // insert_extension uses INSERT OR REPLACE — idempotent
```

(Confirm `insert_extension` is upsert/idempotent; if it errors on conflict, guard with a get-first. `runtime_family` value must satisfy any enum parsing — confirm a safe value.)

- [ ] **Step 2: Storage update/delete recipe**

Add `queries/recipes/update.sql` (UPDATE all user-editable columns incl. projection/workflow pin WHERE id=? AND author_kind='user') and `delete.sql` (DELETE WHERE id=? AND author_kind='user'). Add `update_recipe` + `delete_user_recipe` to `content.rs`, the `Database` trait, and `sqlite/mod.rs` delegations. (Guarding on `author_kind='user'` so the write API can never mutate extension recipes.)

- [ ] **Step 3: Write API handlers + validation**

In `handlers/recipes.rs` add `create_recipe`/`update_recipe`/`delete_recipe`. Body carries display_name/summary/category/workflow_id/workflow_version/projection. On create/update: set `extension_id="host.user-recipes"`, `author_kind="user"`; load the pinned workflow-version snapshot + operators and run the projection's controls/presets through `compile_recipe_run` with empty control_values for EACH preset (and a no-op compile) to validate every binding/preset resolves — reject (400) on `BindingError`. Compute `status` via `compute_version_status`.

Register `POST /recipes`, `PUT /recipes/{id}`, `DELETE /recipes/{id}` in `router.rs`.

- [ ] **Step 4: Test + commit**

`crates/nexus-api/tests/recipe_write_test.rs`: create a user recipe pinned to a seeded workflow with a valid projection → 201 + readable via GET; create with a projection whose binding targets a missing node → 400; an extension re-scan leaves the user recipe intact (reuse P1's guarded-delete behavior).

Run: `cargo test -p nexus-api --test recipe_write_test && cargo test -p nexus-storage`
Expected: PASS.

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add crates/nexus-storage/ crates/nexus-api/src/handlers/recipes.rs crates/nexus-api/src/router.rs crates/nexus-core/src/app.rs crates/nexus-api/tests/recipe_write_test.rs
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(api): recipe write API + user-recipe sentinel + save validation (P6)"
```

---

### Task 5: Exposable-targets endpoint

**Files:**
- Create: `crates/nexus-api/src/dto/exposable_targets.rs` (ts-rs DTO)
- Modify: `crates/nexus-api/src/dto/mod.rs`
- Modify: `crates/nexus-api/src/handlers/workflows.rs` (handler) + `router.rs`
- Test: `crates/nexus-api/src/...` unit test

- [ ] **Step 1: DTO + builder + handler**

`GET /api/v1/workflows/{id}/versions/{version}/exposable-targets` → `ExposableTargetsDto { inputs: [{ name, port_type }], node_configs: [{ node_id, operator, key_path, value_type, enum_values, minimum, maximum }] }`. Builder: load the version snapshot via `get_workflow_version` + `snapshot_to_workflow`; list `workflow.inputs` as `input:<name>` targets; for each node, read its operator `config_schema.properties` and flatten leaf paths into `node:<id>.config.<path>` candidates with their schema hints (reuse the recursive walker from `recipe_form.rs` — extract it to a shared `nexus_recipe` or `recipe_form` helper to avoid duplication). Generic by id.

- [ ] **Step 2: Test + commit**

Unit test: a workflow version with one input port + one node with a config_schema yields the expected target inventory.

Run: `cargo test -p nexus-api exposable_targets && cargo build -p nexus-api`

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add crates/nexus-api/src/dto/ crates/nexus-api/src/handlers/workflows.rs crates/nexus-api/src/router.rs apps/web/src/api/generated/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(api): exposable-targets endpoint for the recipe builder (P6)"
```

---

### Task 6: Recipe Builder — workflow inspector + control selection

> Invoke `nexudnn-design` for styling.

**Files:**
- Modify: `apps/web/src/services/api_client.ts` (client fns: `fetchExposableTargets`, `createRecipe`, `updateRecipe`)
- Create: `apps/web/src/views/recipe-builder/RecipeBuilder.tsx`, `builder_state.ts`, `builder.css.ts`
- Create: route + entry under the workflows/module surface
- Test: `apps/web/src/views/recipe-builder/builder_state.test.ts`

- [ ] **Step 1: Client fns + builder state model + failing test**

Add `fetchExposableTargets(workflowId, version)`, `createRecipe(body)`, `updateRecipe(id, body)` to `api_client.ts` (match existing fetch style + generated types). Create `builder_state.ts` — a pure reducer over `{ controls: DraftControl[], sections: DraftSection[], presets: DraftPreset[] }` with actions expose/lock/hide/rename/assign-section/add-preset, and a `toProjection(): RecipeProjection` serializer. Unit-test the reducer (expose a target → control appears; lock → mode locked; toProjection emits valid shape).

- [ ] **Step 2: Inspector + selection UI**

`RecipeBuilder.tsx` step 1–2: pick workflow version, fetch exposable targets, render the inventory with per-target actions (expose basic/advanced, lock, hide, rename, help). Drives `builder_state`.

- [ ] **Step 3: tsc + test + commit**

Run: `pnpm --dir apps/web tsc --noEmit && pnpm --dir apps/web vitest run src/views/recipe-builder`

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add apps/web/src/services/api_client.ts apps/web/src/views/recipe-builder/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(web): recipe builder — workflow inspector + control selection (P6)"
```

---

### Task 7: Recipe Builder — sections, presets, preview, save

> Invoke `nexudnn-design` for styling.

**Files:**
- Modify: `apps/web/src/views/recipe-builder/RecipeBuilder.tsx` (steps 3–7)
- Reuse: `apps/web/src/views/modules/recipe-form/RecipeForm.tsx` (P4) for the live preview
- Test: extend `builder_state.test.ts`

- [ ] **Step 1: Sections + preset authoring (with lock-conflict detection)**

Step 3–4 UI: create/reorder sections, drag controls in; author fan-out presets (a preset = `{control_id: value}` map), with client-side detection that a preset doesn't set a locked control. Reducer-backed; unit-test lock-conflict detection.

- [ ] **Step 2: Preview + save**

Step 6–7: render `<RecipeForm>` against a projection built from the current draft (preview using the same component end users see) — for preview, build a `RecipeFormDto` client-side from the draft (or POST a transient validate). Save calls `createRecipe`/`updateRecipe`; on success navigate to the new recipe's blueprint/form. Surface server `BindingError` validation messages inline.

- [ ] **Step 3: tsc + vitest + build + commit**

Run: `pnpm --dir apps/web tsc --noEmit && pnpm --dir apps/web vitest run src/views/recipe-builder && pnpm --dir apps/web build`

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add apps/web/src/views/recipe-builder/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(web): recipe builder — sections, presets, preview, save (P6)"
```

---

## Final verification

- [ ] `cargo test -p nexus-extension -p nexus-storage -p nexus-core -p nexus-api` (P6 binaries green; known pre-existing lease + gguf excluded).
- [ ] `cargo clippy -p nexus-extension -p nexus-api -- -D warnings` (P6 code clean).
- [ ] `pnpm --dir apps/web tsc --noEmit && pnpm --dir apps/web vitest run && pnpm --dir apps/web build`.
- [ ] Boundary: `grep -rn "emotion-tts\|svi2\|local-llm" crates/nexus-api/src/handlers/recipes.rs crates/nexus-api/src/dto/exposable_targets.rs apps/web/src/views/recipe-builder/` → zero (the emotion-tts projection lives in the EXTENSION's YAML, which is allowed; host code stays generic).
- [ ] **Live proof:** `recipe_form_live_test` green = a real recipe drives a real form + fan-out run.

---

## Self-review notes

- Keystone (projection ingestion) → Tasks 1–3; live proof via `recipe_form_live_test`. ✅ (Closes the holistic review's HIGH finding.)
- Crate-cycle avoided: `RecipeFile.projection` is raw `Value`; host parses (Task 1–2). ✅
- User recipes via sentinel extension row (no unsafe table rebuild) → Task 4. ✅
- Write API guarded to `author_kind='user'`; save-time compiler validation → Task 4. ✅
- Exposable-targets reuses the schema-hint walker (extract to avoid duplication) → Task 5. ✅
- No-code builder (generic host UI) → Tasks 6–7; reuses P4 RecipeForm for preview. ✅
- Boundary: emotion-tts projection is extension-owned YAML; host builder/write-API/ingestion are generic.
- **Note:** authoring an emotion-tts projection here overlaps P7 (its full reference adoption — refactoring `workflow_binding.rs` onto the host contract). Task 3 only ADDS a host projection; it does not yet remove the extension's hardcoded table. Full P7 adoption stays a later phase.
