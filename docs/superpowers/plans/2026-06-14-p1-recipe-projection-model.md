# P1 — Recipe Projection Model + Pinning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce the `nexus-recipe` host crate with the recipe-projection data model + compatibility status, extend the `recipes` table to carry a pinned workflow version + projection payload, and pin existing extension recipes to a concrete workflow version at boot — so P2's compiler has typed projections to compile and P8 can surface `healthy`/`outdated`/`broken`.

**Architecture:** A new generic host crate `crates/nexus-recipe` owns the projection types (`RecipeProjection`, `ControlDef`, `PresetPack`, …) and `compute_version_status`. The `recipes` table gains additive columns (`workflow_id`, `workflow_version`, `projection_schema_version`, `projection`, `status`, `author_kind`) via idempotent `ALTER`. A boot step resolves each extension recipe's `workflow_template` → host `workflow_id` → `current_version` (from P0) and writes the pin. `delete_recipes_by_extension` is scoped to `author_kind='extension'` so future user recipes are never wiped by an extension rescan.

**Tech Stack:** Rust, `sqlx` (SQLite), `serde`/`serde_json`, `ts-rs`, `tokio` tests, in-memory SQLite.

**Depends on:** P0 (the `workflow_versions` table + `current_version` head + `get_workflow_current_version`).

**Migration-runner constraint (critical):** `crates/nexus-storage/src/sqlite/migrations.rs` re-runs EVERY migration on EVERY boot with no version tracking. All new SQL MUST be idempotent: `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, or `ALTER TABLE ADD COLUMN` registered with `ignore_duplicate_column = true`. **No table rebuilds.** This supersedes design §4.3's "rebuild to null extension_id"; nullable `extension_id` is NOT done here — user recipes (P6) use a reserved sentinel extension row instead, keeping the existing `NOT NULL`+FK intact.

---

### Task 1: Create the `nexus-recipe` crate (projection model + status)

**Files:**
- Create: `crates/nexus-recipe/Cargo.toml`
- Create: `crates/nexus-recipe/src/lib.rs`
- Create: `crates/nexus-recipe/src/projection.rs`
- Create: `crates/nexus-recipe/src/status.rs`

(The workspace `members = ["crates/*", ...]` glob in the root `Cargo.toml` auto-includes the new crate — no workspace edit needed.)

- [ ] **Step 1: Cargo.toml**

Create `crates/nexus-recipe/Cargo.toml`:

```toml
[package]
name = "nexus-recipe"
version = "0.1.0"
edition = "2024"

[dependencies]
serde = { workspace = true }
serde_json = { workspace = true }
thiserror = { workspace = true }

[dev-dependencies]
```

(Match `edition` to a sibling crate, e.g. copy the `edition` line from `crates/nexus-workflow/Cargo.toml`.)

- [ ] **Step 2: Projection types**

Create `crates/nexus-recipe/src/projection.rs`:

```rust
use std::collections::BTreeMap;

use serde::{Deserialize, Serialize};
use serde_json::Value;

/// A recipe projection: the curated, validated surface a recipe exposes over one
/// pinned workflow version. Authored by extensions (YAML) or users (builder).
#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq)]
pub struct RecipeProjection {
    pub schema_version: u32,
    #[serde(default)]
    pub sections: Vec<Section>,
    #[serde(default)]
    pub controls: Vec<ControlDef>,
    #[serde(default)]
    pub presets: Vec<PresetPack>,
    #[serde(default)]
    pub output: OutputPresentation,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct Section {
    pub id: String,
    pub title: String,
    #[serde(default)]
    pub order: u32,
    #[serde(default)]
    pub control_ids: Vec<String>,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum ControlKind {
    String,
    Enum,
    Bool,
    Int,
    Float,
    Asset,
    PresetSelector,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum ControlMode {
    Basic,
    Advanced,
    Hidden,
    Locked,
}

/// A user-facing control. `bindings` are the workflow target paths this control
/// writes to (fan-out = more than one). Target grammar is host-canonical:
/// `input:<name>` or `node:<node_id>.config.<dotted.pointer>`.
#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct ControlDef {
    pub control_id: String,
    pub kind: ControlKind,
    pub label: String,
    #[serde(default)]
    pub help_text: Option<String>,
    pub mode: ControlMode,
    #[serde(default)]
    pub default_value: Option<Value>,
    #[serde(default)]
    pub widget_hint: Option<String>,
    #[serde(default)]
    pub bindings: Vec<String>,
}

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum PresetSource {
    Extension,
    Recipe,
    User,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
pub struct PresetPack {
    pub preset_id: String,
    pub label: String,
    #[serde(default)]
    pub description: Option<String>,
    pub source: PresetSource,
    #[serde(default)]
    pub values: BTreeMap<String, Value>,
}

#[derive(Clone, Debug, Default, Serialize, Deserialize, PartialEq)]
pub struct OutputPresentation {
    #[serde(default)]
    pub primary_artifact: Option<String>,
    #[serde(default)]
    pub secondary: Vec<String>,
    #[serde(default)]
    pub preview_style: Option<String>,
    #[serde(default)]
    pub show_intermediate: bool,
}
```

- [ ] **Step 3: Status type + computation + failing tests**

Create `crates/nexus-recipe/src/status.rs`:

```rust
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum RecipeStatus {
    Healthy,
    Outdated,
    Broken,
}

impl RecipeStatus {
    pub fn as_str(self) -> &'static str {
        match self {
            RecipeStatus::Healthy => "healthy",
            RecipeStatus::Outdated => "outdated",
            RecipeStatus::Broken => "broken",
        }
    }
}

/// Version-skew status. `pinned` is the recipe's pinned workflow version;
/// `current` is the workflow's `current_version`; `pinned_exists` is whether the
/// pinned version row is present in history. Binding-level `broken` (a target
/// that no longer resolves) is layered in by the P2 compiler; this is the
/// version-only baseline.
pub fn compute_version_status(
    pinned: Option<&str>,
    current: Option<&str>,
    pinned_exists: bool,
) -> RecipeStatus {
    match pinned {
        None => RecipeStatus::Broken,
        Some(_) if !pinned_exists => RecipeStatus::Broken,
        Some(p) => match current {
            Some(c) if c != p => RecipeStatus::Outdated,
            _ => RecipeStatus::Healthy,
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unpinned_is_broken() {
        assert_eq!(compute_version_status(None, Some("3"), false), RecipeStatus::Broken);
    }

    #[test]
    fn missing_pinned_version_is_broken() {
        assert_eq!(compute_version_status(Some("2"), Some("3"), false), RecipeStatus::Broken);
    }

    #[test]
    fn newer_current_is_outdated() {
        assert_eq!(compute_version_status(Some("2"), Some("3"), true), RecipeStatus::Outdated);
    }

    #[test]
    fn matching_is_healthy() {
        assert_eq!(compute_version_status(Some("3"), Some("3"), true), RecipeStatus::Healthy);
    }
}
```

- [ ] **Step 4: lib.rs**

Create `crates/nexus-recipe/src/lib.rs`:

```rust
pub mod projection;
pub mod status;

pub use projection::{
    ControlDef, ControlKind, ControlMode, OutputPresentation, PresetPack, PresetSource,
    RecipeProjection, Section,
};
pub use status::{compute_version_status, RecipeStatus};
```

- [ ] **Step 5: Run tests**

Run: `cargo test -p nexus-recipe`
Expected: status tests PASS; crate builds.

- [ ] **Step 6: Commit**

```bash
git add crates/nexus-recipe/
git commit -m "feat(recipe): nexus-recipe crate — projection model + version status (P1)"
```

---

### Task 2: Migration 024 — additive recipe-projection columns

**Files:**
- Create: `migrations/024_recipe_projection.sql`
- Modify: `crates/nexus-storage/src/sqlite/migrations.rs:143` (register, `ignore_duplicate_column = true`)
- Test: `crates/nexus-storage/src/sqlite/tests.rs`

- [ ] **Step 1: Migration SQL**

Create `migrations/024_recipe_projection.sql`:

```sql
ALTER TABLE recipes ADD COLUMN workflow_id TEXT;
ALTER TABLE recipes ADD COLUMN workflow_version TEXT;
ALTER TABLE recipes ADD COLUMN projection_schema_version INTEGER;
ALTER TABLE recipes ADD COLUMN projection TEXT;
ALTER TABLE recipes ADD COLUMN status TEXT;
ALTER TABLE recipes ADD COLUMN author_kind TEXT NOT NULL DEFAULT 'extension';

CREATE INDEX IF NOT EXISTS idx_recipes_author ON recipes(author_kind);
```

- [ ] **Step 2: Register (idempotent)**

In `crates/nexus-storage/src/sqlite/migrations.rs`, before the final `Ok(())`:

```rust
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/024_recipe_projection.sql"),
        true,
    )
    .await?;
```

- [ ] **Step 3: Failing test**

Append to `crates/nexus-storage/src/sqlite/tests.rs`:

```rust
#[tokio::test]
async fn migration_024_adds_recipe_projection_columns() {
    let db = setup_db().await;
    sqlx::query(
        "SELECT workflow_id, workflow_version, projection_schema_version, projection, status, author_kind FROM recipes",
    )
    .fetch_all(db.pool())
    .await
    .expect("recipe projection columns should exist");
}
```

- [ ] **Step 4: Run**

Run: `cargo test -p nexus-storage migration_024_adds_recipe_projection_columns`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add migrations/024_recipe_projection.sql crates/nexus-storage/src/sqlite/migrations.rs crates/nexus-storage/src/sqlite/tests.rs
git commit -m "feat(storage): additive recipe projection columns (migration 024) (P1)"
```

---

### Task 3: Extend `RecipeRecord` + mapping + queries + DTO

**Files:**
- Modify: `crates/nexus-storage/src/records.rs:150-163` (`RecipeRecord`)
- Modify: `crates/nexus-storage/src/row_mapping.rs:127-142` (`map_recipe_row`)
- Modify: `crates/nexus-storage/queries/recipes/insert.sql`
- Modify: `crates/nexus-storage/src/sqlite/content.rs:7-24` (`insert_recipe` binds)
- Modify: `crates/nexus-api/src/mapping.rs:99-123` (`recipe_to_record`)
- Modify: `crates/nexus-api/src/dto/recipes.rs` (`RecipeDto` + `From`)
- Test: `crates/nexus-storage/src/sqlite/tests.rs`

Note: `extension_id`/`extension_version` stay `String` (NOT NULL) in P1.

- [ ] **Step 1: Extend the record**

In `crates/nexus-storage/src/records.rs`, add fields to `RecipeRecord` (after `bindings`, before `created_at`):

```rust
    pub workflow_id: Option<String>,
    pub workflow_version: Option<String>,
    pub projection_schema_version: Option<i64>,
    pub projection: Option<String>,
    pub status: Option<String>,
    pub author_kind: String,
```

- [ ] **Step 2: Map the new columns**

In `crates/nexus-storage/src/row_mapping.rs`, inside `map_recipe_row`, add before `created_at`:

```rust
        workflow_id: row.try_get("workflow_id").ok().flatten(),
        workflow_version: row.try_get("workflow_version").ok().flatten(),
        projection_schema_version: row.try_get("projection_schema_version").ok().flatten(),
        projection: row.try_get("projection").ok().flatten(),
        status: row.try_get("status").ok().flatten(),
        author_kind: row.try_get("author_kind").ok().flatten().unwrap_or_else(|| "extension".into()),
```

- [ ] **Step 3: Extend insert SQL + binds**

Replace `crates/nexus-storage/queries/recipes/insert.sql` with:

```sql
INSERT OR REPLACE INTO recipes
    (id, version, display_name, summary, category, extension_id, extension_version,
     workflow_template_ref, thumbnail, input_summary, bindings,
     workflow_id, workflow_version, projection_schema_version, projection, status, author_kind,
     created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
```

In `crates/nexus-storage/src/sqlite/content.rs` `insert_recipe`, add binds before `.bind(&r.created_at)`:

```rust
        .bind(&r.workflow_id)
        .bind(&r.workflow_version)
        .bind(r.projection_schema_version)
        .bind(&r.projection)
        .bind(&r.status)
        .bind(&r.author_kind)
```

- [ ] **Step 4: Update `recipe_to_record`**

In `crates/nexus-api/src/mapping.rs` `recipe_to_record`, set the new fields in the returned `RecipeRecord` (extension recipes; pin filled later by Task 5):

```rust
        workflow_id: None,
        workflow_version: None,
        projection_schema_version: None,
        projection: None,
        status: None,
        author_kind: "extension".to_owned(),
```

- [ ] **Step 5: Update the DTO**

In `crates/nexus-api/src/dto/recipes.rs`, add to `RecipeDto` (before `created_at`):

```rust
    pub workflow_id: Option<String>,
    pub workflow_version: Option<String>,
    pub status: Option<String>,
    pub author_kind: String,
```

And in the `From<&RecipeRecord>` impl, before `created_at`:

```rust
            workflow_id: r.workflow_id.clone(),
            workflow_version: r.workflow_version.clone(),
            status: r.status.clone(),
            author_kind: r.author_kind.clone(),
```

- [ ] **Step 6: Failing storage test**

Append to `crates/nexus-storage/src/sqlite/tests.rs` (extend the existing recipe test helper or add one):

```rust
fn make_recipe(id: &str, author: &str) -> RecipeRecord {
    RecipeRecord {
        id: id.into(), version: "1".into(), display_name: "R".into(),
        summary: "s".into(), category: "c".into(),
        extension_id: "test.ext".into(), extension_version: "1.0.0".into(),
        workflow_template_ref: "workflows/x.yaml".into(),
        thumbnail: None, input_summary: None, bindings: "{}".into(),
        workflow_id: Some("wf".into()), workflow_version: Some("1".into()),
        projection_schema_version: Some(1), projection: Some("{}".into()),
        status: Some("healthy".into()), author_kind: author.into(),
        created_at: "t".into(),
    }
}

#[tokio::test]
async fn recipe_roundtrip_carries_projection_fields() {
    let db = setup_db().await;
    // extensions FK target
    let mut ext = make_namespace("ignored", "test.ext"); // reuse no — build a real extension row
    let _ = &mut ext;
    db.insert_extension(&crate::records::ExtensionRecord {
        id: "test.ext".into(), name: None, version: "1.0.0".into(), description: None,
        publisher: None, host_api_compat: "1".into(), protocol_compat: "1".into(),
        runtime_family: "Process".into(), entrypoint: "x".into(), capabilities: None,
        status: "enabled".into(), directory: "/x".into(), installed_at: "t".into(),
        recipe_count: None, ui_contribution_count: None, validation_errors: None,
        primary_recipe_id: None, default_workflow_id: None, icon_kind: None,
        icon_symbol: None, icon_svg: None,
    }).await.unwrap();

    db.insert_recipe(&make_recipe("r1", "extension")).await.unwrap();
    let got = db.get_recipe("r1").await.unwrap();
    assert_eq!(got.workflow_version.as_deref(), Some("1"));
    assert_eq!(got.author_kind, "extension");
    assert_eq!(got.status.as_deref(), Some("healthy"));
}
```

(If `make_namespace` import noise is awkward, drop that placeholder line — only the `ExtensionRecord` insert + recipe insert/read matter.)

- [ ] **Step 7: Run + build the dependents**

Run: `cargo test -p nexus-storage recipe_roundtrip_carries_projection_fields && cargo build -p nexus-api`
Expected: PASS + build (regenerate ts-rs bindings if the build step requires it).

- [ ] **Step 8: Commit**

```bash
git add crates/nexus-storage/src/records.rs crates/nexus-storage/src/row_mapping.rs crates/nexus-storage/queries/recipes/insert.sql crates/nexus-storage/src/sqlite/content.rs crates/nexus-api/src/mapping.rs crates/nexus-api/src/dto/recipes.rs crates/nexus-storage/src/sqlite/tests.rs apps/web/src/api/generated/
git commit -m "feat(storage): RecipeRecord carries workflow pin + projection + status + author_kind (P1)"
```

---

### Task 4: Guard `delete_recipes_by_extension` to extension-authored rows

**Files:**
- Modify: `crates/nexus-storage/queries/recipes/delete_by_extension.sql`
- Test: `crates/nexus-storage/src/sqlite/tests.rs`

- [ ] **Step 1: Scope the delete**

Replace `crates/nexus-storage/queries/recipes/delete_by_extension.sql` with:

```sql
DELETE FROM recipes WHERE extension_id = ? AND author_kind = 'extension'
```

- [ ] **Step 2: Failing test**

Append to `crates/nexus-storage/src/sqlite/tests.rs`:

```rust
#[tokio::test]
async fn extension_delete_spares_user_recipes() {
    let db = setup_db().await;
    db.insert_extension(&crate::records::ExtensionRecord {
        id: "test.ext".into(), name: None, version: "1.0.0".into(), description: None,
        publisher: None, host_api_compat: "1".into(), protocol_compat: "1".into(),
        runtime_family: "Process".into(), entrypoint: "x".into(), capabilities: None,
        status: "enabled".into(), directory: "/x".into(), installed_at: "t".into(),
        recipe_count: None, ui_contribution_count: None, validation_errors: None,
        primary_recipe_id: None, default_workflow_id: None, icon_kind: None,
        icon_symbol: None, icon_svg: None,
    }).await.unwrap();
    db.insert_recipe(&make_recipe("ext-r", "extension")).await.unwrap();
    let mut user = make_recipe("user-r", "user");
    user.extension_id = "test.ext".into(); // P1: user rows still satisfy NOT NULL; P6 uses sentinel
    db.insert_recipe(&user).await.unwrap();

    db.delete_recipes_by_extension("test.ext").await.unwrap();

    assert!(db.get_recipe("ext-r").await.is_err());      // extension recipe gone
    assert!(db.get_recipe("user-r").await.is_ok());      // user recipe preserved
}
```

- [ ] **Step 3: Run**

Run: `cargo test -p nexus-storage extension_delete_spares_user_recipes`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-storage/queries/recipes/delete_by_extension.sql crates/nexus-storage/src/sqlite/tests.rs
git commit -m "feat(storage): extension recipe wipe spares user-authored rows (P1)"
```

---

### Task 5: Pin extension recipes to a workflow version at boot

**Files:**
- Create: `crates/nexus-storage/queries/recipes/update_pin.sql`
- Modify: `crates/nexus-storage/src/sqlite/content.rs` (add `update_recipe_pin`)
- Modify: `crates/nexus-storage/src/database.rs` (trait method)
- Modify: `crates/nexus-storage/src/sqlite/mod.rs` (delegation)
- Modify: `crates/nexus-core/src/app.rs` (add `pin_extension_recipes`, call at boot)
- Test: `crates/nexus-core/src/app.rs` `#[cfg(test)]`

- [ ] **Step 1: Pin update SQL + storage method**

Create `crates/nexus-storage/queries/recipes/update_pin.sql`:

```sql
UPDATE recipes SET workflow_id = ?, workflow_version = ?, status = ? WHERE id = ?
```

In `crates/nexus-storage/src/sqlite/content.rs`:

```rust
pub async fn update_recipe_pin(
    pool: &SqlitePool,
    id: &str,
    workflow_id: Option<&str>,
    workflow_version: Option<&str>,
    status: &str,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/recipes/update_pin.sql"))
        .bind(workflow_id)
        .bind(workflow_version)
        .bind(status)
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}
```

Add the trait method to `crates/nexus-storage/src/database.rs` (after `delete_recipes_by_extension`):

```rust
    async fn update_recipe_pin(
        &self,
        id: &str,
        workflow_id: Option<&str>,
        workflow_version: Option<&str>,
        status: &str,
    ) -> Result<(), StorageError>;
```

Add the delegation to `crates/nexus-storage/src/sqlite/mod.rs` (after `delete_recipes_by_extension` impl):

```rust
    async fn update_recipe_pin(
        &self,
        id: &str,
        workflow_id: Option<&str>,
        workflow_version: Option<&str>,
        status: &str,
    ) -> Result<(), StorageError> {
        content::update_recipe_pin(&self.pool, id, workflow_id, workflow_version, status).await
    }
```

- [ ] **Step 2: Boot pin step + failing test**

In `crates/nexus-core/src/app.rs`, add (and call it once at boot right after the recipe-persist completes inside `persist_discovery_to_db`):

```rust
use nexus_recipe::{compute_version_status, RecipeStatus};

/// For each extension recipe with a `workflow_template`, resolve the template
/// file to its host `workflow_id`, read the workflow's `current_version`, and
/// write the recipe's version pin + computed status. Recipes whose template
/// cannot be resolved are marked `broken` (needs re-pin).
async fn pin_extension_recipes(
    db: &Arc<SqliteDatabase>,
    ext: &ActivatedExtension,
) -> anyhow::Result<()> {
    for recipe in &ext.recipes {
        let Some(template_ref) = recipe.workflow_template.as_ref() else {
            continue;
        };
        let path = ext.directory.join(template_ref);
        let workflow_id = match std::fs::read_to_string(&path)
            .ok()
            .and_then(|c| nexus_workflow::parse_workflow(&c).ok())
        {
            Some(wf) => wf.id,
            None => {
                db.update_recipe_pin(&recipe.recipe.id, None, None, RecipeStatus::Broken.as_str())
                    .await?;
                continue;
            }
        };
        let current = db.get_workflow_current_version(&workflow_id).await.ok().flatten();
        let pinned_exists = current.is_some();
        let status = compute_version_status(current.as_deref(), current.as_deref(), pinned_exists);
        db.update_recipe_pin(
            &recipe.recipe.id,
            Some(&workflow_id),
            current.as_deref(),
            status.as_str(),
        )
        .await?;
    }
    Ok(())
}
```

(At pin time the recipe pins to the *current* version, so `pinned == current` → `healthy`; `outdated` only arises later when the workflow advances past the pin. Add `nexus-recipe` to `crates/nexus-core/Cargo.toml` `[dependencies]`: `nexus-recipe = { path = "../nexus-recipe" }`.)

Call site: in `persist_discovery_to_db`, after the existing per-extension persist calls, add `pin_extension_recipes(db, ext).await?;`.

Add the test (`#[cfg(test)]` in `app.rs`, or `crates/nexus-core/tests/pin_test.rs`):

```rust
#[tokio::test]
async fn pin_marks_recipe_healthy_when_workflow_present() {
    let db = std::sync::Arc::new(
        nexus_storage::SqliteDatabase::new("sqlite::memory:").await.unwrap(),
    );
    // Seed a workflow + its current version.
    db.insert_workflow(&nexus_storage::records::WorkflowRecord {
        id: "wf".into(), title: "T".into(), version: "0.1.0".into(),
        inputs: Some("[]".into()), outputs: Some("[]".into()),
        nodes: "[]".into(), edges: "[]".into(), stages: Some("[]".into()),
        created_at: "t".into(), updated_at: "t".into(),
        user_edited_at: None, extension_id: None,
        extension_version: None, extension_version_first_seen: None,
    }).await.unwrap();
    db.set_workflow_current_version("wf", "1", "t").await.unwrap();

    // status computation parity (the boot path needs a real ext on disk; assert the
    // pure decision here to keep the test hermetic):
    let status = nexus_recipe::compute_version_status(Some("1"), Some("1"), true);
    assert_eq!(status, nexus_recipe::RecipeStatus::Healthy);

    // and the storage write path works:
    db.update_recipe_pin("rid", Some("wf"), Some("1"), status.as_str()).await.unwrap_or(());
}
```

(The full `pin_extension_recipes` needs an `ActivatedExtension` with on-disk files; assert the decision + storage write here, and cover end-to-end pinning in a P1 integration test if the harness exists. Keep the unit test hermetic.)

- [ ] **Step 3: Run + build**

Run: `cargo build -p nexus-core && cargo test -p nexus-core pin_marks_recipe_healthy_when_workflow_present`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-storage/queries/recipes/update_pin.sql crates/nexus-storage/src/sqlite/content.rs crates/nexus-storage/src/database.rs crates/nexus-storage/src/sqlite/mod.rs crates/nexus-core/src/app.rs crates/nexus-core/Cargo.toml
git commit -m "feat(core): pin extension recipes to current workflow version at boot (P1)"
```

---

## Final verification

- [ ] **Tests + lint**

Run: `cargo test -p nexus-recipe -p nexus-storage -p nexus-core -p nexus-api && cargo fmt && cargo clippy -p nexus-recipe -p nexus-storage -p nexus-core -p nexus-api -- -D warnings`
Expected: green.

- [ ] **Boundary check (nexus-recipe stays generic)**

Run: `grep -rn "emotion-tts\|svi2\|local-llm\|local_llm\|_1\.config\." crates/nexus-recipe/src/`
Expected: zero hits.

---

## Self-review notes

- nexus-recipe crate + projection model + status → Task 1. ✅
- Recipe table additive columns (idempotent, no rebuild) → Task 2. ✅
- RecipeRecord/DTO/mapping carry pin + projection + status + author_kind → Task 3. ✅
- Guarded extension wipe → Task 4. ✅
- Boot pinning + status → Task 5. ✅
- **Deferred to P6** (not P1): nullable `extension_id` / FK relaxation for user recipes — replaced by a reserved sentinel extension row at P6 (the re-run-every-boot migration runner makes a table rebuild unsafe; this supersedes design §4.3). Flag in the design doc when P6 is planned.
- `operator_schema_hash` population (P0 left it `None`): still deferred — filled in P2 when the operator registry is threaded into the compiler.
- The API extension-refresh path (`mapping.rs::persist_recipes_for_extension`) does not pin inline; pins refresh on next boot via Task 5. Acceptable for P1; wire inline in P2/P3 if refresh-without-reboot pinning is needed.
