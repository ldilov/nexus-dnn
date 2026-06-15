# P5 — Preset Packs (user-defined + explain) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.
>
> **Design-led UI (XII.8):** Task 4 ships UI — invoke `nexudnn-design` before styling.

**Goal:** Complete the preset story. Extension- and recipe-authored presets already work end-to-end (they live in the projection — P1, are compiled — P2, and render in the form rail — P4). P5 adds **user-defined presets** (an end user saves their current control values as a named preset on a recipe), an **"explain this preset"** view (what it changes in the graph), and surfaces user presets in the form alongside authored ones.

**Architecture:** A host-owned `recipe_user_presets` table keyed by recipe id stores `{label, control_values}`. A preset CRUD API validates a candidate preset by running it through `compile_recipe_run` (P2) before saving — same validation as a run. `GET /recipes/{id}/form` merges user presets (`source: "user"`) into the projection's presets. "Explain" runs the compiler and returns `applied_controls` (control → targets → final values) — the audit trail the compiler already produces.

**Tech Stack:** Rust (sqlx, axum, ts-rs), React 19 + TS + SWR, vitest.

**Depends on:** P1 (projection presets + form DTO), P2 (`compile_recipe_run` + `applied_controls`), P3 (`compile_and_launch` plumbing), P4 (RecipeForm + preset rail). **Runs after P6** (a recipe needs a populated projection for user presets to reference real controls).

---

### Task 1: `recipe_user_presets` table + storage

**Files:**
- Create: `migrations/026_recipe_user_presets.sql`
- Modify: `crates/nexus-storage/src/sqlite/migrations.rs` (register)
- Modify: `crates/nexus-storage/src/records.rs` (record)
- Modify: `crates/nexus-storage/src/row_mapping.rs` (mapper + import)
- Create: `crates/nexus-storage/queries/recipe_user_presets/{insert,list_by_recipe,delete}.sql`
- Modify: `crates/nexus-storage/src/sqlite/content.rs` + `database.rs` + `sqlite/mod.rs`
- Test: `crates/nexus-storage/src/sqlite/tests.rs`

- [ ] **Step 1: Migration (idempotent)**

`migrations/026_recipe_user_presets.sql`:

```sql
CREATE TABLE IF NOT EXISTS recipe_user_presets (
    id TEXT PRIMARY KEY,
    recipe_id TEXT NOT NULL,
    label TEXT NOT NULL,
    values_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_recipe_user_presets_recipe ON recipe_user_presets(recipe_id);
```

Register in `migrations.rs` before the final `Ok(())` with `ignore_duplicate_column=false`.

- [ ] **Step 2: Record + mapper**

`records.rs`:

```rust
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeUserPresetRecord {
    pub id: String,
    pub recipe_id: String,
    pub label: String,
    pub values_json: String,
    pub created_at: String,
}
```

Add `map_recipe_user_preset_row` to `row_mapping.rs` (+ import).

- [ ] **Step 3: Queries + content.rs fns + trait + delegations**

`insert.sql` (INSERT), `list_by_recipe.sql` (SELECT * WHERE recipe_id=? ORDER BY created_at), `delete.sql` (DELETE WHERE id=?). Add `insert_recipe_user_preset`, `list_recipe_user_presets(recipe_id)`, `delete_recipe_user_preset(id)` to `content.rs`, the `Database` trait, and `sqlite/mod.rs` delegations.

- [ ] **Step 4: Failing test + run + commit**

Append a roundtrip test to `sqlite/tests.rs` (insert two presets for a recipe → list returns 2 ordered → delete one → list returns 1).

Run: `cargo test -p nexus-storage recipe_user_preset`

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add migrations/026_recipe_user_presets.sql crates/nexus-storage/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(storage): recipe_user_presets table + CRUD (P5)"
```

---

### Task 2: Preset CRUD API + merge into the form

**Files:**
- Create: `crates/nexus-api/src/dto/recipe_preset.rs` (ts-rs DTOs) + export in `dto/mod.rs`
- Modify: `crates/nexus-api/src/handlers/recipes.rs` (create/list/delete preset handlers)
- Modify: `crates/nexus-api/src/recipe_form.rs` (merge user presets into `build_recipe_form` output)
- Modify: `crates/nexus-api/src/router.rs` (routes)
- Test: `crates/nexus-api/tests/recipe_preset_test.rs`

- [ ] **Step 1: DTO + handlers + validation**

`POST /api/v1/recipes/{id}/presets` body `{ label, control_values }`: load the recipe's projection + pinned snapshot + operators; run `compile_recipe_run` with the `control_values` to validate they resolve (reject 400 on `BindingError`); on success insert a `RecipeUserPresetRecord` (id = `usrp_{uuid}`, values_json = serialized control_values). `GET /api/v1/recipes/{id}/presets` lists them. `DELETE /api/v1/recipes/{id}/presets/{preset_id}`.

- [ ] **Step 2: Merge user presets into the form**

Change `get_recipe_form` (or `build_recipe_form`) so the returned `presets` include both the projection's presets and the recipe's user presets (mapped to `FormPresetDto` with a `source` field — add `source: String` to `FormPresetDto` if not present, values: "extension"|"recipe"|"user"). The compiler already accepts any `preset_id`; ensure user-preset ids are resolvable at run time — see Task 3 note.

Run-time resolution: `compile_recipe_run` looks up `preset_id` in `projection.presets`. User presets aren't in the projection. So `compile_and_launch` (P3) must, when `preset_id` is a user preset, load its `control_values` and merge them into the submitted control values BEFORE compiling (or synthesize a transient PresetPack). Implement: in `compile_and_launch`, if `preset_id` doesn't match a projection preset, look it up in `recipe_user_presets`; if found, overlay its values onto `control_values` and pass `preset_id: None` to the compiler. Document this in the handler.

- [ ] **Step 3: Test + run + commit**

`recipe_preset_test.rs`: create a valid user preset → 201 + appears in GET /presets and in GET /form presets with source="user"; create an invalid preset (value out of schema range) → 400; run the recipe with the user preset id → the resolved graph reflects the preset's values.

Run: `cargo test -p nexus-api --test recipe_preset_test`

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add crates/nexus-api/ apps/web/src/api/generated/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(api): user-defined recipe presets + merge into form + run resolution (P5)"
```

---

### Task 3: "Explain this preset" endpoint

**Files:**
- Modify: `crates/nexus-api/src/handlers/recipes.rs` (explain handler) + `dto` + `router.rs`
- Test: `crates/nexus-api/tests/recipe_preset_test.rs` (extend)

- [ ] **Step 1: Endpoint**

`GET /api/v1/recipes/{id}/presets/{preset_id}/explain` → resolve the preset's values (projection preset or user preset), run `compile_recipe_run`, and return its `applied_controls` mapped to a DTO `{ control_id, targets: [string], value }[]` — i.e. exactly what the preset changes in the graph. Also include a `diff_from_defaults` flag per control (true when the value differs from the control's `default_value`).

- [ ] **Step 2: Test + run + commit**

Extend the test: explain a fan-out preset → response lists the control with BOTH its node targets and the value.

Run: `cargo test -p nexus-api --test recipe_preset_test`

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add crates/nexus-api/ apps/web/src/api/generated/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(api): explain-preset endpoint (applied controls + targets) (P5)"
```

---

### Task 4: Frontend — save + explain presets

> Invoke `nexudnn-design` for styling.

**Files:**
- Modify: `apps/web/src/services/api_client.ts` (`createRecipePreset`, `listRecipePresets`, `deleteRecipePreset`, `explainPreset`)
- Modify: `apps/web/src/views/modules/recipe-form/RecipeForm.tsx` ("Save as preset" + per-preset "Explain")
- Test: extend `apps/web/src/views/modules/recipe-form/*.test.tsx`

- [ ] **Step 1: Client fns**

Add the four client fns to `api_client.ts` matching the existing fetch style + generated types. (Use ASCII names: `createRecipePreset`, `listRecipePresets`, `deleteRecipePreset`, `explainPreset`.)

- [ ] **Step 2: UI**

In `RecipeForm.tsx`: a "Save as preset" control that captures the current `values` for editable controls, prompts for a label, and POSTs; on success the new preset appears in the rail (source="user", deletable). A per-preset "Explain" affordance (info icon/expander) that calls the explain endpoint and shows the control→targets→value list (an accessible disclosure, not a tooltip-only). User presets visually distinguished from authored ones.

- [ ] **Step 3: Test + verify + commit**

Add/extend a vitest test: clicking "Save as preset" calls the create client fn with the current values; explain renders the returned targets. Run `pnpm --dir apps/web tsc --noEmit && pnpm --dir apps/web vitest run src/views/modules/recipe-form && pnpm --dir apps/web build`.

```bash
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" add apps/web/src/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(web): save + explain recipe presets in the form (P5)"
```

---

## Final verification

- [ ] `cargo test -p nexus-storage -p nexus-api` (P5 binaries green; known pre-existing lease/gguf excluded).
- [ ] `cargo clippy -p nexus-api -- -D warnings` (P5 code clean).
- [ ] `pnpm --dir apps/web tsc --noEmit && pnpm --dir apps/web vitest run && pnpm --dir apps/web build`.
- [ ] Boundary: `grep -rn "emotion-tts\|svi2\|local-llm" crates/nexus-api/src/handlers/recipes.rs crates/nexus-storage/queries/recipe_user_presets/` → zero.

---

## Self-review notes

- Extension/recipe presets already work (P1/P2/P4); P5 adds USER presets + explain only — no rebuild of existing preset support. ✅
- User presets validated through `compile_recipe_run` at save AND resolved at run (overlay into control_values in `compile_and_launch`) → Task 2. ✅
- "Explain" reuses the compiler's `applied_controls` audit (no new resolution logic) → Task 3. ✅
- All presets validated by the SAME compiler — satisfies the design's "all presets validated against operator/node schemas". ✅
- Host-owned `recipe_user_presets` table is generic (keyed by recipe id); boundary clean.
- **Dependency:** needs P6's projection ingestion so a recipe has real controls for presets to reference. Sequence P5 after P6.
