# P0 — Immutable Workflow Versioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every workflow an append-only history of immutable version snapshots plus a `current_version` head pointer, so later phases can pin a recipe to one exact workflow version and detect `outdated`/`broken`.

**Architecture:** Add a `workflow_versions` table (immutable rows, PK `(workflow_id, version)`) and a `workflows.current_version` head pointer. A canonical content hash (JCS + SHA-256, reusing the scheme already in `nexus-deployments::hash`) decides whether an edit/boot-rescan produces a *new* version or is a no-op. The two existing in-place overwrite paths (`update.sql` for user edits, `INSERT OR REPLACE` for create/boot) keep maintaining the `workflows` head row for back-compat display, but now ALSO append a version row through one shared policy helper that never moves a user-pinned head when an extension re-persists.

**Tech Stack:** Rust, `sqlx` (SQLite), `serde_json`, `sha2` + `json-canon` (already in the workspace via `nexus-deployments`), `axum`, `tokio` tests, in-memory SQLite (`sqlite::memory:`).

**Scope note:** The snapshot `version` is a per-workflow **monotonic integer string** (`"1"`, `"2"`, …), distinct from the authored semver in `Workflow.version`. P0 does NOT change `RunRecord.workflow_version` semantics (no consumer yet) — that reconciliation happens in P3.

---

### Task 1: Migration 023 — `workflow_versions` table + `current_version` column

**Files:**
- Create: `migrations/023_workflow_versions.sql`
- Modify: `crates/nexus-storage/src/sqlite/migrations.rs:143` (add registration before `Ok(())`)
- Test: `crates/nexus-storage/src/sqlite/tests.rs` (append)

- [ ] **Step 1: Write the migration SQL**

Create `migrations/023_workflow_versions.sql`:

```sql
CREATE TABLE IF NOT EXISTS workflow_versions (
    workflow_id TEXT NOT NULL,
    version TEXT NOT NULL,
    canonical_hash TEXT NOT NULL,
    operator_schema_hash TEXT,
    inputs TEXT,
    outputs TEXT,
    nodes TEXT NOT NULL,
    edges TEXT NOT NULL,
    stages TEXT,
    author_kind TEXT NOT NULL DEFAULT 'extension',
    extension_id TEXT,
    extension_version TEXT,
    created_at TEXT NOT NULL,
    PRIMARY KEY (workflow_id, version)
);

ALTER TABLE workflows ADD COLUMN current_version TEXT;
```

- [ ] **Step 2: Register the migration**

In `crates/nexus-storage/src/sqlite/migrations.rs`, insert before the final `Ok(())` (after the `022` block at line 143):

```rust
    // spec workflow-driven-recipes P0 — immutable workflow version history
    execute_migration_statements(
        pool,
        include_str!("../../../../migrations/023_workflow_versions.sql"),
        true,
    )
    .await?;
```

(`true` = ignore `duplicate column`, required because of the `ALTER TABLE ... ADD COLUMN`.)

- [ ] **Step 3: Write the failing test**

Append to `crates/nexus-storage/src/sqlite/tests.rs`:

```rust
#[tokio::test]
async fn migration_023_creates_workflow_versions_and_current_version() {
    let db = setup_db().await;
    // workflow_versions table is queryable
    sqlx::query("SELECT workflow_id, version, canonical_hash, author_kind FROM workflow_versions")
        .fetch_all(db.pool())
        .await
        .expect("workflow_versions table should exist");
    // workflows.current_version column exists
    sqlx::query("SELECT current_version FROM workflows")
        .fetch_all(db.pool())
        .await
        .expect("workflows.current_version column should exist");
}
```

- [ ] **Step 4: Run the test**

Run: `cargo test -p nexus-storage migration_023_creates_workflow_versions_and_current_version`
Expected: PASS (migration runs inside `SqliteDatabase::new`).

- [ ] **Step 5: Commit**

```bash
git add migrations/023_workflow_versions.sql crates/nexus-storage/src/sqlite/migrations.rs crates/nexus-storage/src/sqlite/tests.rs
git commit -m "feat(storage): add workflow_versions table + current_version column (P0)"
```

---

### Task 2: `WorkflowVersionRecord` + row mapping

**Files:**
- Modify: `crates/nexus-storage/src/records.rs:98` (after `WorkflowRecord`)
- Modify: `crates/nexus-storage/src/row_mapping.rs:72` (after `map_workflow_row`)
- Modify: `crates/nexus-storage/src/row_mapping.rs:4-7` (add to import list)

- [ ] **Step 1: Add the record struct**

In `crates/nexus-storage/src/records.rs`, after the `WorkflowRecord` block (line 98):

```rust
/// An immutable snapshot of a workflow's graph at one point in time. Rows are
/// append-only; `(workflow_id, version)` is the primary key. `version` is a
/// per-workflow monotonic integer string ("1", "2", ...), distinct from the
/// authored semver carried on `WorkflowRecord.version`.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct WorkflowVersionRecord {
    pub workflow_id: String,
    pub version: String,
    pub canonical_hash: String,
    pub operator_schema_hash: Option<String>,
    pub inputs: Option<String>,
    pub outputs: Option<String>,
    pub nodes: String,
    pub edges: String,
    pub stages: Option<String>,
    pub author_kind: String,
    pub extension_id: Option<String>,
    pub extension_version: Option<String>,
    pub created_at: String,
}
```

- [ ] **Step 2: Add the row mapper**

In `crates/nexus-storage/src/row_mapping.rs`, add `WorkflowVersionRecord` to the `use crate::records::{...}` list (line 4-7), then after `map_workflow_row` (line 72):

```rust
pub fn map_workflow_version_row(row: SqliteRow) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: row.get("workflow_id"),
        version: row.get("version"),
        canonical_hash: row.get("canonical_hash"),
        operator_schema_hash: row.try_get("operator_schema_hash").ok().flatten(),
        inputs: row.try_get("inputs").ok().flatten(),
        outputs: row.try_get("outputs").ok().flatten(),
        nodes: row.get("nodes"),
        edges: row.get("edges"),
        stages: row.try_get("stages").ok().flatten(),
        author_kind: row.get("author_kind"),
        extension_id: row.try_get("extension_id").ok().flatten(),
        extension_version: row.try_get("extension_version").ok().flatten(),
        created_at: row.get("created_at"),
    }
}
```

- [ ] **Step 3: Verify it compiles**

Run: `cargo build -p nexus-storage`
Expected: builds (no test yet; behavior tested in Task 3).

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-storage/src/records.rs crates/nexus-storage/src/row_mapping.rs
git commit -m "feat(storage): add WorkflowVersionRecord + row mapper (P0)"
```

---

### Task 3: Version storage queries + trait methods + storage tests

**Files:**
- Create: `crates/nexus-storage/queries/workflows/insert_version.sql`
- Create: `crates/nexus-storage/queries/workflows/get_version.sql`
- Create: `crates/nexus-storage/queries/workflows/list_versions.sql`
- Create: `crates/nexus-storage/queries/workflows/get_current_version.sql`
- Create: `crates/nexus-storage/queries/workflows/set_current_version.sql`
- Modify: `crates/nexus-storage/src/sqlite/workflows.rs` (append fns)
- Modify: `crates/nexus-storage/src/database.rs:30` (add trait methods after `clear_workflow_user_edit`)
- Modify: `crates/nexus-storage/src/sqlite/mod.rs:102` (add impl delegations)
- Test: `crates/nexus-storage/src/sqlite/tests.rs`

- [ ] **Step 1: Write the SQL files**

`insert_version.sql`:
```sql
INSERT OR IGNORE INTO workflow_versions
    (workflow_id, version, canonical_hash, operator_schema_hash,
     inputs, outputs, nodes, edges, stages,
     author_kind, extension_id, extension_version, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
```

`get_version.sql`:
```sql
SELECT * FROM workflow_versions WHERE workflow_id = ? AND version = ?
```

`list_versions.sql`:
```sql
SELECT * FROM workflow_versions WHERE workflow_id = ?
ORDER BY CAST(version AS INTEGER) ASC
```

`get_current_version.sql`:
```sql
SELECT current_version FROM workflows WHERE id = ?
```

`set_current_version.sql`:
```sql
UPDATE workflows SET current_version = ?, updated_at = ? WHERE id = ?
```

- [ ] **Step 2: Add the SQLite functions**

Append to `crates/nexus-storage/src/sqlite/workflows.rs`:

```rust
pub async fn insert_workflow_version(
    pool: &SqlitePool,
    r: &WorkflowVersionRecord,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/workflows/insert_version.sql"))
        .bind(&r.workflow_id)
        .bind(&r.version)
        .bind(&r.canonical_hash)
        .bind(&r.operator_schema_hash)
        .bind(&r.inputs)
        .bind(&r.outputs)
        .bind(&r.nodes)
        .bind(&r.edges)
        .bind(&r.stages)
        .bind(&r.author_kind)
        .bind(&r.extension_id)
        .bind(&r.extension_version)
        .bind(&r.created_at)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_workflow_version(
    pool: &SqlitePool,
    workflow_id: &str,
    version: &str,
) -> Result<WorkflowVersionRecord, StorageError> {
    sqlx::query(include_str!("../../queries/workflows/get_version.sql"))
        .bind(workflow_id)
        .bind(version)
        .map(map_workflow_version_row)
        .fetch_optional(pool)
        .await?
        .ok_or_else(|| StorageError::NotFound {
            entity: "workflow_version".into(),
            id: format!("{workflow_id}@{version}"),
        })
}

pub async fn list_workflow_versions(
    pool: &SqlitePool,
    workflow_id: &str,
) -> Result<Vec<WorkflowVersionRecord>, StorageError> {
    Ok(
        sqlx::query(include_str!("../../queries/workflows/list_versions.sql"))
            .bind(workflow_id)
            .map(map_workflow_version_row)
            .fetch_all(pool)
            .await?,
    )
}

pub async fn get_workflow_current_version(
    pool: &SqlitePool,
    id: &str,
) -> Result<Option<String>, StorageError> {
    use sqlx::Row;
    let row = sqlx::query(include_str!("../../queries/workflows/get_current_version.sql"))
        .bind(id)
        .fetch_optional(pool)
        .await?;
    Ok(row.and_then(|r| r.try_get::<Option<String>, _>("current_version").ok().flatten()))
}

pub async fn set_workflow_current_version(
    pool: &SqlitePool,
    id: &str,
    version: &str,
    updated_at: &str,
) -> Result<(), StorageError> {
    sqlx::query(include_str!("../../queries/workflows/set_current_version.sql"))
        .bind(version)
        .bind(updated_at)
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}
```

- [ ] **Step 3: Add trait methods**

In `crates/nexus-storage/src/database.rs`, after `clear_workflow_user_edit` (line 30) add to the import block `WorkflowVersionRecord`, then add:

```rust
    async fn insert_workflow_version(
        &self,
        record: &WorkflowVersionRecord,
    ) -> Result<(), StorageError>;
    async fn get_workflow_version(
        &self,
        workflow_id: &str,
        version: &str,
    ) -> Result<WorkflowVersionRecord, StorageError>;
    async fn list_workflow_versions(
        &self,
        workflow_id: &str,
    ) -> Result<Vec<WorkflowVersionRecord>, StorageError>;
    async fn get_workflow_current_version(
        &self,
        id: &str,
    ) -> Result<Option<String>, StorageError>;
    async fn set_workflow_current_version(
        &self,
        id: &str,
        version: &str,
        updated_at: &str,
    ) -> Result<(), StorageError>;
```

- [ ] **Step 4: Add impl delegations**

In `crates/nexus-storage/src/sqlite/mod.rs`, add `WorkflowVersionRecord` to the `use crate::records::{...}` block (line 17-21), then after `clear_workflow_user_edit` impl (line 102):

```rust
    async fn insert_workflow_version(
        &self,
        r: &WorkflowVersionRecord,
    ) -> Result<(), StorageError> {
        workflows::insert_workflow_version(&self.pool, r).await
    }

    async fn get_workflow_version(
        &self,
        workflow_id: &str,
        version: &str,
    ) -> Result<WorkflowVersionRecord, StorageError> {
        workflows::get_workflow_version(&self.pool, workflow_id, version).await
    }

    async fn list_workflow_versions(
        &self,
        workflow_id: &str,
    ) -> Result<Vec<WorkflowVersionRecord>, StorageError> {
        workflows::list_workflow_versions(&self.pool, workflow_id).await
    }

    async fn get_workflow_current_version(
        &self,
        id: &str,
    ) -> Result<Option<String>, StorageError> {
        workflows::get_workflow_current_version(&self.pool, id).await
    }

    async fn set_workflow_current_version(
        &self,
        id: &str,
        version: &str,
        updated_at: &str,
    ) -> Result<(), StorageError> {
        workflows::set_workflow_current_version(&self.pool, id, version, updated_at).await
    }
```

Also add `WorkflowVersionRecord` to the `use crate::records::*;` already wildcarded in `sqlite/workflows.rs` (line 4 is `use crate::records::*;`) — no change needed there.

- [ ] **Step 5: Write the failing test**

Append to `crates/nexus-storage/src/sqlite/tests.rs` (add a helper + test):

```rust
fn make_workflow(id: &str) -> WorkflowRecord {
    WorkflowRecord {
        id: id.into(),
        title: "T".into(),
        version: "0.1.0".into(),
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        created_at: "2026-01-01T00:00:00Z".into(),
        updated_at: "2026-01-01T00:00:00Z".into(),
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    }
}

fn make_version(workflow_id: &str, version: &str, hash: &str, author: &str) -> WorkflowVersionRecord {
    WorkflowVersionRecord {
        workflow_id: workflow_id.into(),
        version: version.into(),
        canonical_hash: hash.into(),
        operator_schema_hash: None,
        inputs: Some("[]".into()),
        outputs: Some("[]".into()),
        nodes: "[]".into(),
        edges: "[]".into(),
        stages: Some("[]".into()),
        author_kind: author.into(),
        extension_id: None,
        extension_version: None,
        created_at: "2026-01-01T00:00:00Z".into(),
    }
}

#[tokio::test]
async fn workflow_version_insert_list_and_current_pointer() {
    let db = setup_db().await;
    db.insert_workflow(&make_workflow("wf-1")).await.unwrap();

    db.insert_workflow_version(&make_version("wf-1", "1", "hashA", "extension"))
        .await
        .unwrap();
    db.insert_workflow_version(&make_version("wf-1", "2", "hashB", "user"))
        .await
        .unwrap();

    let versions = db.list_workflow_versions("wf-1").await.unwrap();
    assert_eq!(versions.len(), 2);
    assert_eq!(versions[0].version, "1");
    assert_eq!(versions[1].version, "2");
    assert_eq!(versions[1].author_kind, "user");

    assert!(db.get_workflow_current_version("wf-1").await.unwrap().is_none());
    db.set_workflow_current_version("wf-1", "2", "2026-01-02T00:00:00Z")
        .await
        .unwrap();
    assert_eq!(
        db.get_workflow_current_version("wf-1").await.unwrap().as_deref(),
        Some("2")
    );

    let v = db.get_workflow_version("wf-1", "1").await.unwrap();
    assert_eq!(v.canonical_hash, "hashA");
}
```

- [ ] **Step 6: Run the test**

Run: `cargo test -p nexus-storage workflow_version_insert_list_and_current_pointer`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add crates/nexus-storage/queries/workflows/ crates/nexus-storage/src/sqlite/workflows.rs crates/nexus-storage/src/database.rs crates/nexus-storage/src/sqlite/mod.rs crates/nexus-storage/src/sqlite/tests.rs
git commit -m "feat(storage): workflow version CRUD + current_version accessors (P0)"
```

---

### Task 4: Canonical hashing in `nexus-workflow`

**Files:**
- Modify: `crates/nexus-workflow/Cargo.toml` (add deps)
- Create: `crates/nexus-workflow/src/versioning.rs`
- Modify: `crates/nexus-workflow/src/lib.rs` (declare + re-export module)

- [ ] **Step 1: Add dependencies**

In `crates/nexus-workflow/Cargo.toml` under `[dependencies]` add (mirroring `nexus-deployments`):

```toml
sha2 = "0.10"
json-canon = "0.1"
```

(Confirm exact versions match the workspace by copying the lines from `crates/nexus-deployments/Cargo.toml`.)

- [ ] **Step 2: Write the failing test + module**

Create `crates/nexus-workflow/src/versioning.rs`:

```rust
use serde_json::Value;
use sha2::{Digest, Sha256};

use crate::Workflow;

/// Build the canonical content value for a workflow: only the execution-shaping
/// fields, never timestamps/ids/titles. Hashing this detects real graph changes.
pub fn canonical_graph_value(workflow: &Workflow) -> Value {
    serde_json::json!({
        "inputs": workflow.inputs,
        "outputs": workflow.outputs,
        "nodes": workflow.nodes,
        "stages": workflow.stages,
    })
}

/// Hash an already-built canonical value with JCS (RFC 8785) + SHA-256, hex
/// encoded. Key order is normalized by JCS so `HashMap`-backed node inputs hash
/// deterministically.
pub fn hash_canonical_value(value: &Value) -> Result<String, serde_json::Error> {
    let canonical = json_canon::to_string(value)?;
    let mut hasher = Sha256::new();
    hasher.update(canonical.as_bytes());
    let digest = hasher.finalize();
    let mut out = String::with_capacity(64);
    for b in digest {
        out.push_str(&format!("{b:02x}"));
    }
    Ok(out)
}

/// Canonical content hash of a whole workflow graph.
pub fn compute_canonical_hash(workflow: &Workflow) -> Result<String, serde_json::Error> {
    hash_canonical_value(&canonical_graph_value(workflow))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{NodeInput, NodeInstance, Stage, Workflow};
    use std::collections::HashMap;

    fn wf_with_node_inputs(order: &[(&str, &str)]) -> Workflow {
        let mut inputs = HashMap::new();
        for (port, from) in order {
            inputs.insert(
                (*port).to_string(),
                NodeInput::Reference { from: (*from).to_string() },
            );
        }
        Workflow {
            id: "wf".into(),
            title: "T".into(),
            version: "0.1.0".into(),
            inputs: vec![],
            outputs: vec![],
            nodes: vec![NodeInstance {
                id: "n1".into(),
                operator: "op@1.0.0".into(),
                stage: None,
                inputs,
                config: None,
            }],
            stages: vec![Stage { id: "s".into(), label: "S".into() }],
            created_at: "x".into(),
            updated_at: "y".into(),
        }
    }

    #[test]
    fn hash_is_independent_of_hashmap_insertion_order() {
        let a = wf_with_node_inputs(&[("p1", "n0:o"), ("p2", "n0:o2")]);
        let b = wf_with_node_inputs(&[("p2", "n0:o2"), ("p1", "n0:o")]);
        assert_eq!(
            compute_canonical_hash(&a).unwrap(),
            compute_canonical_hash(&b).unwrap()
        );
    }

    #[test]
    fn hash_changes_when_graph_changes() {
        let a = wf_with_node_inputs(&[("p1", "n0:o")]);
        let b = wf_with_node_inputs(&[("p1", "n0:DIFFERENT")]);
        assert_ne!(
            compute_canonical_hash(&a).unwrap(),
            compute_canonical_hash(&b).unwrap()
        );
    }
}
```

- [ ] **Step 3: Declare + re-export the module**

In `crates/nexus-workflow/src/lib.rs` add `pub mod versioning;` and re-export: `pub use versioning::{canonical_graph_value, compute_canonical_hash, hash_canonical_value};` (place alongside the existing `model` re-exports).

- [ ] **Step 4: Run the tests**

Run: `cargo test -p nexus-workflow versioning`
Expected: both tests PASS.

- [ ] **Step 5: Commit**

```bash
git add crates/nexus-workflow/Cargo.toml crates/nexus-workflow/src/versioning.rs crates/nexus-workflow/src/lib.rs
git commit -m "feat(workflow): canonical graph hashing (JCS + SHA-256) (P0)"
```

---

### Task 5: Shared version-recording policy helper

**Files:**
- Create: `crates/nexus-storage/src/versioning.rs`
- Modify: `crates/nexus-storage/src/lib.rs` (declare + re-export)
- Test: in the new module's `#[cfg(test)]`

This helper holds the ONE policy used by create, edit, and boot: append a version when the graph changed, no-op when unchanged, and never move a user-pinned head when an extension re-persists.

- [ ] **Step 1: Write the helper + failing tests**

Create `crates/nexus-storage/src/versioning.rs`:

```rust
use crate::database::Database;
use crate::error::StorageError;
use crate::records::WorkflowVersionRecord;

/// Author of a new version. `Extension` rows never displace a user-pinned head.
pub enum VersionAuthor {
    User,
    Extension { id: String, version: String },
}

/// The graph payload + hashes for a candidate new version (precomputed by the
/// caller, which owns the `nexus-workflow` model).
pub struct NewWorkflowVersion {
    pub canonical_hash: String,
    pub operator_schema_hash: Option<String>,
    pub inputs: Option<String>,
    pub outputs: Option<String>,
    pub nodes: String,
    pub edges: String,
    pub stages: Option<String>,
    pub author: VersionAuthor,
}

fn next_version(existing: &[WorkflowVersionRecord]) -> String {
    (existing.len() + 1).to_string()
}

fn build_record(
    workflow_id: &str,
    version: &str,
    v: &NewWorkflowVersion,
    now: &str,
) -> WorkflowVersionRecord {
    let (author_kind, extension_id, extension_version) = match &v.author {
        VersionAuthor::User => ("user".to_string(), None, None),
        VersionAuthor::Extension { id, version } => {
            ("extension".to_string(), Some(id.clone()), Some(version.clone()))
        }
    };
    WorkflowVersionRecord {
        workflow_id: workflow_id.to_string(),
        version: version.to_string(),
        canonical_hash: v.canonical_hash.clone(),
        operator_schema_hash: v.operator_schema_hash.clone(),
        inputs: v.inputs.clone(),
        outputs: v.outputs.clone(),
        nodes: v.nodes.clone(),
        edges: v.edges.clone(),
        stages: v.stages.clone(),
        author_kind,
        extension_id,
        extension_version,
        created_at: now.to_string(),
    }
}

/// Append an immutable version if the graph changed vs the current head, and
/// advance `current_version` unless an extension is re-persisting over a
/// user-pinned head. Returns the version string that is current afterward.
pub async fn record_version_if_changed<D: Database + ?Sized>(
    db: &D,
    workflow_id: &str,
    v: NewWorkflowVersion,
    now: &str,
) -> Result<String, StorageError> {
    let existing = db.list_workflow_versions(workflow_id).await?;
    let current = db.get_workflow_current_version(workflow_id).await?;

    if let Some(cur) = current.as_deref() {
        if let Ok(head) = db.get_workflow_version(workflow_id, cur).await {
            if head.canonical_hash == v.canonical_hash {
                return Ok(cur.to_string());
            }
            let extension_over_user = matches!(v.author, VersionAuthor::Extension { .. })
                && head.author_kind == "user";
            if extension_over_user {
                let ver = next_version(&existing);
                db.insert_workflow_version(&build_record(workflow_id, &ver, &v, now))
                    .await?;
                return Ok(cur.to_string());
            }
        }
    }

    let ver = next_version(&existing);
    db.insert_workflow_version(&build_record(workflow_id, &ver, &v, now))
        .await?;
    db.set_workflow_current_version(workflow_id, &ver, now).await?;
    Ok(ver)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::records::WorkflowRecord;
    use crate::sqlite::SqliteDatabase;

    async fn db() -> SqliteDatabase {
        SqliteDatabase::new("sqlite::memory:").await.unwrap()
    }

    fn seed_workflow(id: &str) -> WorkflowRecord {
        WorkflowRecord {
            id: id.into(), title: "T".into(), version: "0.1.0".into(),
            inputs: Some("[]".into()), outputs: Some("[]".into()),
            nodes: "[]".into(), edges: "[]".into(), stages: Some("[]".into()),
            created_at: "t".into(), updated_at: "t".into(),
            user_edited_at: None, extension_id: None,
            extension_version: None, extension_version_first_seen: None,
        }
    }

    fn candidate(hash: &str, author: VersionAuthor) -> NewWorkflowVersion {
        NewWorkflowVersion {
            canonical_hash: hash.into(), operator_schema_hash: None,
            inputs: Some("[]".into()), outputs: Some("[]".into()),
            nodes: "[]".into(), edges: "[]".into(), stages: Some("[]".into()),
            author,
        }
    }

    #[tokio::test]
    async fn first_record_creates_version_1_and_sets_head() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        let v = record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t").await.unwrap();
        assert_eq!(v, "1");
        assert_eq!(db.get_workflow_current_version("wf").await.unwrap().as_deref(), Some("1"));
    }

    #[tokio::test]
    async fn identical_hash_is_noop() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t").await.unwrap();
        let again = record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t").await.unwrap();
        assert_eq!(again, "1");
        assert_eq!(db.list_workflow_versions("wf").await.unwrap().len(), 1);
    }

    #[tokio::test]
    async fn user_edit_advances_head() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t").await.unwrap();
        let v = record_version_if_changed(&db, "wf", candidate("h2", VersionAuthor::User), "t").await.unwrap();
        assert_eq!(v, "2");
        assert_eq!(db.get_workflow_current_version("wf").await.unwrap().as_deref(), Some("2"));
    }

    #[tokio::test]
    async fn extension_does_not_move_user_pinned_head() {
        let db = db().await;
        db.insert_workflow(&seed_workflow("wf")).await.unwrap();
        record_version_if_changed(&db, "wf", candidate("h1", VersionAuthor::User), "t").await.unwrap();
        let ext = VersionAuthor::Extension { id: "e".into(), version: "1.0.0".into() };
        let head = record_version_if_changed(&db, "wf", candidate("h2", ext), "t").await.unwrap();
        // history records the extension version, but the head stays user-pinned at "1"
        assert_eq!(head, "1");
        assert_eq!(db.list_workflow_versions("wf").await.unwrap().len(), 2);
        assert_eq!(db.get_workflow_current_version("wf").await.unwrap().as_deref(), Some("1"));
    }
}
```

- [ ] **Step 2: Declare + re-export**

In `crates/nexus-storage/src/lib.rs` add `pub mod versioning;` and re-export `pub use versioning::{record_version_if_changed, NewWorkflowVersion, VersionAuthor};`.

- [ ] **Step 3: Run the tests**

Run: `cargo test -p nexus-storage versioning::tests`
Expected: all four PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-storage/src/versioning.rs crates/nexus-storage/src/lib.rs
git commit -m "feat(storage): version-recording policy (no-op/append/user-pin guard) (P0)"
```

---

### Task 6: `create_workflow` records the initial version

**Files:**
- Create: `crates/nexus-api/src/workflow_versioning.rs` (caller-side builder)
- Modify: `crates/nexus-api/src/lib.rs` (declare module)
- Modify: `crates/nexus-api/src/handlers/workflows.rs:125-153` (`create_workflow`)
- Test: `crates/nexus-api/src/workflow_versioning.rs` `#[cfg(test)]`

- [ ] **Step 1: Write the caller-side builder + failing test**

Create `crates/nexus-api/src/workflow_versioning.rs`:

```rust
use nexus_storage::records::WorkflowRecord;
use nexus_storage::versioning::{NewWorkflowVersion, VersionAuthor};
use nexus_workflow::{compute_canonical_hash, Workflow};

/// Build a `NewWorkflowVersion` from a parsed workflow + its storage record
/// (the record already holds canonical JSON strings for the graph columns).
pub fn new_version_from(
    workflow: &Workflow,
    record: &WorkflowRecord,
    author: VersionAuthor,
) -> Result<NewWorkflowVersion, serde_json::Error> {
    Ok(NewWorkflowVersion {
        canonical_hash: compute_canonical_hash(workflow)?,
        operator_schema_hash: None,
        inputs: record.inputs.clone(),
        outputs: record.outputs.clone(),
        nodes: record.nodes.clone(),
        edges: record.edges.clone(),
        stages: record.stages.clone(),
        author,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_workflow::parse_workflow;

    const YAML: &str = r#"
id: wf
title: T
version: 0.1.0
inputs: []
outputs: []
stages: []
nodes: []
"#;

    fn record() -> WorkflowRecord {
        WorkflowRecord {
            id: "wf".into(), title: "T".into(), version: "0.1.0".into(),
            inputs: Some("[]".into()), outputs: Some("[]".into()),
            nodes: "[]".into(), edges: "[]".into(), stages: Some("[]".into()),
            created_at: "t".into(), updated_at: "t".into(),
            user_edited_at: None, extension_id: None,
            extension_version: None, extension_version_first_seen: None,
        }
    }

    #[test]
    fn builds_a_versioned_candidate_with_a_hash() {
        let wf = parse_workflow(YAML).unwrap();
        let nv = new_version_from(&wf, &record(), VersionAuthor::User).unwrap();
        assert_eq!(nv.canonical_hash.len(), 64);
        assert!(matches!(nv.author, VersionAuthor::User));
    }
}
```

(If the `parse_workflow` YAML shape differs, copy a known-good workflow YAML from `extensions/builtin/local-llm/workflows/local_chat_basic.yaml` for the test fixture.)

- [ ] **Step 2: Declare the module**

In `crates/nexus-api/src/lib.rs` add `pub mod workflow_versioning;`.

- [ ] **Step 3: Wire `create_workflow`**

In `crates/nexus-api/src/handlers/workflows.rs`, in `create_workflow` after the successful `insert_workflow` (line 144), add (the workflow has no extension attribution at create time, so author is `User`):

```rust
    let author = match &record.extension_id {
        Some(id) => nexus_storage::versioning::VersionAuthor::Extension {
            id: id.clone(),
            version: record.extension_version.clone().unwrap_or_default(),
        },
        None => nexus_storage::versioning::VersionAuthor::User,
    };
    if let Ok(nv) = crate::workflow_versioning::new_version_from(&workflow, &record, author) {
        let _ = nexus_storage::versioning::record_version_if_changed(&*state.db, &workflow.id, nv, &now).await;
    }
```

(`&*state.db` deref-coerces the `Arc<SqliteDatabase>` / `Arc<dyn Database>` into the generic `&D`. If `AppState.db` is `Arc<dyn Database>`, change the helper bound call site to `record_version_if_changed(state.db.as_ref(), ...)`.)

- [ ] **Step 4: Run the test + build**

Run: `cargo test -p nexus-api workflow_versioning && cargo build -p nexus-api`
Expected: test PASS, build OK.

- [ ] **Step 5: Commit**

```bash
git add crates/nexus-api/src/workflow_versioning.rs crates/nexus-api/src/lib.rs crates/nexus-api/src/handlers/workflows.rs
git commit -m "feat(api): create_workflow records initial immutable version (P0)"
```

---

### Task 7: `update_workflow_graph` appends a user version (or no-ops)

**Files:**
- Modify: `crates/nexus-api/src/handlers/workflows.rs:197-236` (`update_workflow_graph`)
- Test: `crates/nexus-api/tests/workflow_versioning_test.rs` (new integration test)

- [ ] **Step 1: Wire the handler**

In `update_workflow_graph`, after the successful `update_workflow(&record)` (line 227) and before the `get_workflow` refetch (line 229), add:

```rust
    let author = nexus_storage::versioning::VersionAuthor::User;
    if let Ok(nv) = crate::workflow_versioning::new_version_from(&workflow, &record, author) {
        let _ = nexus_storage::versioning::record_version_if_changed(&*state.db, &id, nv, &now).await;
    }
```

- [ ] **Step 2: Write the failing integration test**

Create `crates/nexus-api/tests/workflow_versioning_test.rs`. Use the existing api integration-test harness (copy the `AppState`/router bootstrap from an existing file under `crates/nexus-api/tests/`, e.g. the spec_029 tests referenced in the boundary rule). The behavioral assertions:

```rust
// PSEUDOCODE-FREE BEHAVIOR (fill bootstrap from an existing tests/ file):
// 1. POST /workflows with a valid graph  -> 201
// 2. GET  /workflows/{id}/versions       -> ["1"], current_version == "1"
// 3. PUT  /workflows/{id}/graph (changed) -> 200
// 4. GET  /workflows/{id}/versions       -> ["1","2"], current_version == "2"
// 5. PUT  /workflows/{id}/graph (same graph again) -> 200
// 6. GET  /workflows/{id}/versions       -> still ["1","2"] (no-op)
```

Implement these as real `reqwest`/`tower::ServiceExt::oneshot` calls matching the harness already used in `crates/nexus-api/tests/`. The version-list endpoint is added in Task 10 — order Task 10 before this step if writing the HTTP assertion, or assert via a direct `db.list_workflow_versions(...)` call against the test `AppState.db` to avoid the dependency.

- [ ] **Step 3: Run**

Run: `cargo test -p nexus-api --test workflow_versioning_test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-api/src/handlers/workflows.rs crates/nexus-api/tests/workflow_versioning_test.rs
git commit -m "feat(api): user graph edits append immutable versions (P0)"
```

---

### Task 8: `revert_workflow` re-points the head to the latest extension version

**Files:**
- Modify: `crates/nexus-api/src/handlers/workflows.rs:241-258` (`revert_workflow`)
- Test: extend `crates/nexus-api/tests/workflow_versioning_test.rs`

- [ ] **Step 1: Wire the handler**

Replace the body of `revert_workflow` so it both clears the stamp AND re-points `current_version` to the latest extension-authored version (falling back to clearing only when none exists):

```rust
pub async fn revert_workflow(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<WorkflowDto>, ApiError> {
    state
        .db
        .clear_workflow_user_edit(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let versions = state
        .db
        .list_workflow_versions(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    if let Some(latest_ext) = versions
        .iter()
        .filter(|v| v.author_kind == "extension")
        .next_back()
    {
        let now = Utc::now().to_rfc3339();
        state
            .db
            .set_workflow_current_version(&id, &latest_ext.version, &now)
            .await
            .map_err(|e| ApiError::Internal(e.to_string()))?;
    }

    let fresh = state
        .db
        .get_workflow(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(WorkflowDto::from(&fresh)))
}
```

- [ ] **Step 2: Add the behavior to the integration test**

Append to `workflow_versioning_test.rs`: seed a workflow with an extension version "1" and a user version "2" (head=="2"); call `POST /workflows/{id}/revert`; assert `current_version == "1"`.

- [ ] **Step 3: Run**

Run: `cargo test -p nexus-api --test workflow_versioning_test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-api/src/handlers/workflows.rs crates/nexus-api/tests/workflow_versioning_test.rs
git commit -m "feat(api): revert re-points head to latest extension version (P0)"
```

---

### Task 9: Boot re-persist + one-shot backfill record versions

**Files:**
- Modify: `crates/nexus-core/src/app.rs:568-666` (`persist_workflow_records`)
- Modify: `crates/nexus-core/src/app.rs` (add `backfill_workflow_versions` + call it once at boot, after discovery persist at `persist_discovery_to_db`)
- Test: `crates/nexus-core/src/app.rs` `#[cfg(test)]` (or a `tests/` file if `app.rs` has no test module)

- [ ] **Step 1: Record extension versions during re-persist**

In `persist_workflow_records`, after the successful `db.insert_workflow(&record)` (line 660), add:

```rust
        let author = nexus_storage::versioning::VersionAuthor::Extension {
            id: ext.manifest.extension.id.clone(),
            version: ext.manifest.extension.version.clone(),
        };
        let nv = nexus_storage::versioning::NewWorkflowVersion {
            canonical_hash: match nexus_workflow::compute_canonical_hash(&workflow) {
                Ok(h) => h,
                Err(_) => continue,
            },
            operator_schema_hash: None,
            inputs: record.inputs.clone(),
            outputs: record.outputs.clone(),
            nodes: record.nodes.clone(),
            edges: record.edges.clone(),
            stages: record.stages.clone(),
            author,
        };
        let _ = nexus_storage::versioning::record_version_if_changed(
            db.as_ref(),
            &workflow.id,
            nv,
            &now,
        )
        .await;
```

Note: the existing `user_edited_at` skip (lines 610-635) returns `continue` BEFORE this point, so a user-pinned WorkflowRecord is still not overwritten; but to also capture shipped-graph history for user-pinned rows, move the version-record call ABOVE the skip's `continue` (record the extension version for history; `record_version_if_changed` already refuses to move a user head). Place the version-record block immediately after `workflow` is parsed (line 605) and before the `existing` user-edit branch.

- [ ] **Step 2: Add the backfill + failing test**

Add to `crates/nexus-core/src/app.rs`:

```rust
/// One-shot: for every workflow row that has no `current_version`, seed an
/// immutable version "1" from its stored graph so pre-P0 workflows participate
/// in version history.
pub async fn backfill_workflow_versions(db: &SqliteDatabase) -> anyhow::Result<()> {
    use nexus_workflow::hash_canonical_value;
    for wf in db.list_workflows().await? {
        if db.get_workflow_current_version(&wf.id).await?.is_some() {
            continue;
        }
        let value = serde_json::json!({
            "inputs": wf.inputs.as_deref().map(parse_or_null).unwrap_or(serde_json::Value::Null),
            "outputs": wf.outputs.as_deref().map(parse_or_null).unwrap_or(serde_json::Value::Null),
            "nodes": parse_or_null(&wf.nodes),
            "stages": wf.stages.as_deref().map(parse_or_null).unwrap_or(serde_json::Value::Null),
        });
        let hash = hash_canonical_value(&value)?;
        let author = match (&wf.extension_id, wf.user_edited_at.is_some()) {
            (Some(id), false) => nexus_storage::versioning::VersionAuthor::Extension {
                id: id.clone(),
                version: wf.extension_version.clone().unwrap_or_default(),
            },
            _ => nexus_storage::versioning::VersionAuthor::User,
        };
        let nv = nexus_storage::versioning::NewWorkflowVersion {
            canonical_hash: hash,
            operator_schema_hash: None,
            inputs: wf.inputs.clone(),
            outputs: wf.outputs.clone(),
            nodes: wf.nodes.clone(),
            edges: wf.edges.clone(),
            stages: wf.stages.clone(),
            author,
        };
        let now = chrono::Utc::now().to_rfc3339();
        nexus_storage::versioning::record_version_if_changed(db, &wf.id, nv, &now).await?;
    }
    Ok(())
}

fn parse_or_null(s: &str) -> serde_json::Value {
    serde_json::from_str(s).unwrap_or(serde_json::Value::Null)
}
```

Call `backfill_workflow_versions(&db).await?;` once at boot, immediately after the discovery-persist step completes (find the call site of `persist_discovery_to_db` and add the backfill right after it).

Add the test (use an `app.rs` `#[cfg(test)] mod tests` block, or `crates/nexus-core/tests/backfill_test.rs`):

```rust
#[tokio::test]
async fn backfill_seeds_version_for_preexisting_workflow() {
    let db = nexus_storage::SqliteDatabase::new("sqlite::memory:").await.unwrap();
    db.insert_workflow(&nexus_storage::records::WorkflowRecord {
        id: "wf".into(), title: "T".into(), version: "0.1.0".into(),
        inputs: Some("[]".into()), outputs: Some("[]".into()),
        nodes: "[]".into(), edges: "[]".into(), stages: Some("[]".into()),
        created_at: "t".into(), updated_at: "t".into(),
        user_edited_at: None, extension_id: None,
        extension_version: None, extension_version_first_seen: None,
    }).await.unwrap();

    super::backfill_workflow_versions(&db).await.unwrap();

    assert_eq!(db.get_workflow_current_version("wf").await.unwrap().as_deref(), Some("1"));
    assert_eq!(db.list_workflow_versions("wf").await.unwrap().len(), 1);
}
```

- [ ] **Step 3: Run**

Run: `cargo test -p nexus-core backfill_seeds_version_for_preexisting_workflow`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add crates/nexus-core/src/app.rs
git commit -m "feat(core): boot records extension versions + backfills pre-P0 workflows (P0)"
```

---

### Task 10: Version read APIs

**Files:**
- Create: `crates/nexus-api/src/dto/workflow_versions.rs` (DTO)
- Modify: `crates/nexus-api/src/dto/mod.rs` (export)
- Modify: `crates/nexus-api/src/handlers/workflows.rs` (two handlers)
- Modify: `crates/nexus-api/src/router.rs` (two routes under the workflows nest)
- Test: extend `crates/nexus-api/tests/workflow_versioning_test.rs`

- [ ] **Step 1: Add the DTO**

Create `crates/nexus-api/src/dto/workflow_versions.rs`:

```rust
use serde::Serialize;
use ts_rs::TS;

use nexus_storage::records::WorkflowVersionRecord;

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowVersionDto {
    pub workflow_id: String,
    pub version: String,
    pub canonical_hash: String,
    pub author_kind: String,
    pub extension_id: Option<String>,
    pub extension_version: Option<String>,
    pub created_at: String,
    pub is_current: bool,
}

impl WorkflowVersionDto {
    pub fn from_record(r: &WorkflowVersionRecord, current: Option<&str>) -> Self {
        Self {
            workflow_id: r.workflow_id.clone(),
            version: r.version.clone(),
            canonical_hash: r.canonical_hash.clone(),
            author_kind: r.author_kind.clone(),
            extension_id: r.extension_id.clone(),
            extension_version: r.extension_version.clone(),
            created_at: r.created_at.clone(),
            is_current: current == Some(r.version.as_str()),
        }
    }
}
```

Export it from `crates/nexus-api/src/dto/mod.rs` (`pub mod workflow_versions; pub use workflow_versions::WorkflowVersionDto;`).

- [ ] **Step 2: Add the handlers**

In `crates/nexus-api/src/handlers/workflows.rs`, add:

```rust
pub async fn list_workflow_versions(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<ListResponseDto<crate::dto::WorkflowVersionDto>>, ApiError> {
    let current = state
        .db
        .get_workflow_current_version(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let versions = state
        .db
        .list_workflow_versions(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let items = versions
        .iter()
        .map(|v| crate::dto::WorkflowVersionDto::from_record(v, current.as_deref()))
        .collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_workflow_version(
    State(state): State<AppState>,
    Path((id, version)): Path<(String, String)>,
) -> Result<ApiResponse<crate::dto::WorkflowVersionDto>, ApiError> {
    let current = state
        .db
        .get_workflow_current_version(&id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let record = state
        .db
        .get_workflow_version(&id, &version)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    Ok(ApiResponse::ok(crate::dto::WorkflowVersionDto::from_record(
        &record,
        current.as_deref(),
    )))
}
```

- [ ] **Step 3: Register the routes**

In `crates/nexus-api/src/router.rs`, in the workflows route group (near the existing `/workflows/:id/graph` registration), add:

```rust
        .route("/{id}/versions", get(handlers::workflows::list_workflow_versions))
        .route("/{id}/versions/{version}", get(handlers::workflows::get_workflow_version))
```

(Match the exact nesting/prefix and `get` import already used for `/workflows/:id` — copy the surrounding style.)

- [ ] **Step 4: Add the HTTP assertions**

Extend `workflow_versioning_test.rs` to call `GET /workflows/{id}/versions` and assert the list length + `is_current` flag, replacing the direct-db assertions from Task 7 if desired.

- [ ] **Step 5: Run + regen TS types**

Run: `cargo test -p nexus-api --test workflow_versioning_test`
Expected: PASS. Then run the existing ts-rs export step (the repo regenerates `apps/web/src/api/generated/` from `#[ts(export)]` — run the same command other DTO changes use, e.g. `cargo test -p nexus-api export_bindings` if present).

- [ ] **Step 6: Commit**

```bash
git add crates/nexus-api/src/dto/ crates/nexus-api/src/handlers/workflows.rs crates/nexus-api/src/router.rs apps/web/src/api/generated/
git commit -m "feat(api): GET workflow versions list + detail (P0)"
```

---

## Final verification

- [ ] **Workspace build + tests green**

Run: `cargo test -p nexus-storage -p nexus-workflow -p nexus-api -p nexus-core`
Expected: all P0 tests PASS; no regressions.

- [ ] **Format + lint**

Run: `cargo fmt && cargo clippy -p nexus-storage -p nexus-workflow -p nexus-api -p nexus-core -- -D warnings`
Expected: clean.

- [ ] **Boundary sanity (no extension literals introduced)**

Run: `grep -rn "emotion-tts\|svi2\|local-llm\|local_llm" crates/nexus-storage/src/versioning.rs crates/nexus-workflow/src/versioning.rs crates/nexus-api/src/workflow_versioning.rs`
Expected: zero hits (all P0 code is generic).

---

## Self-review notes (spec coverage)

- Immutable `workflow_versions` + `current_version` head → Tasks 1-3. ✅
- Both overwrite paths append versions (user edit Task 7; create Task 6; boot Task 9) without removing the back-compat head row. ✅
- No-op on identical hash; user-pin guard → Task 5 (policy) + tests. ✅
- `operator_schema_hash` column exists (populated as `None` in P0; filled in P1 when the registry is threaded through — flagged, not silently dropped). ⚠️ P1 dependency.
- Backfill of pre-P0 workflows → Task 9. ✅
- `revert` redefined as head re-point → Task 8. ✅
- Version read APIs → Task 10. ✅
- Recipe-pin backfill, `status`, recipe-table migration → **P1** (out of P0 scope by design).

> `AppState.db` concrete type: every `record_version_if_changed(&*state.db, ...)` / `db.as_ref()` call assumes a deref to `&D: Database`. Confirm `AppState.db`'s type in `crates/nexus-api/src/lib.rs` at Task 6 Step 3 and use the matching deref form across Tasks 6-8.
