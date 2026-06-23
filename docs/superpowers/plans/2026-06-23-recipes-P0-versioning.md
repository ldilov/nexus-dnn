# P0: Immutable workflow versioning — Implementation Plan (nexus-dnn, 2026-06-23)

All shared shapes/numbers/routes per 2026-06-23-recipes-00-CONTRACTS.md — this plan does not re-derive them.

## Goal

Replace the single mutable `workflow.version` string with an append-only `workflow_versions`
history table plus a `current_version` head pointer on `workflows`. Every write path (user graph
edit, create, boot re-persist) appends an immutable version only when content actually changes
(content-hash dedup); `revert_workflow` re-points the head to the latest extension-authored version
instead of waiting for a reboot; and two read APIs expose version history. Done = forward migration
seeds one version per existing workflow, a user edit produces a new immutable row, an identical
re-scan appends nothing, and revert re-points the head — all under `cargo test`.

## Current state (verified)

Re-read against current `main` (HEAD `edb5b870`, 2026-06-23). The 2026-06-14 design's storage-level
picture is intact; only line numbers and migration numbering drifted.

- `WorkflowRecord` has a single mutable `pub version: String` plus `user_edited_at` + extension
  attribution columns — `crates/nexus-storage/src/records.rs:74-98`. No history, no version table.
  `RunRecord.workflow_version` (`records.rs:104`) is the only historical snapshot today.
- `workflows` table: `version TEXT NOT NULL`, no head pointer — `migrations/001_initial.sql:37-48`.
  `user_edited_at` from `migrations/004_workflow_user_edits.sql`; attribution from
  `migrations/006_workflow_extension_attribution.sql`.
- Two overwrite paths, no hashing:
  - INSERT OR REPLACE full-row upsert — `crates/nexus-storage/queries/workflows/insert.sql:1`, bound
    in `crates/nexus-storage/src/sqlite/workflows.rs:7-26`. Callers: `create_workflow`
    (`crates/nexus-api/src/handlers/workflows.rs:125-153`) and boot re-persist
    (`crates/nexus-core/src/app.rs:627-644`).
  - Plain UPDATE — `crates/nexus-storage/queries/workflows/update.sql:1`, bound in
    `sqlite/workflows.rs:49-70`. Callers: `update_workflow`
    (`handlers/workflows.rs:88-123`) and `update_workflow_graph` (`handlers/workflows.rs:197-236`).
- `update_workflow_graph` stamps `user_edited_at = Some(now)` and preserves identity/attribution
  from `existing` — `handlers/workflows.rs:215-221`.
- `revert_workflow` calls `db.clear_workflow_user_edit(&id)` only — `handlers/workflows.rs:241-258`;
  storage is inline SQL `UPDATE workflows SET user_edited_at = NULL WHERE id = ?` —
  `sqlite/workflows.rs:86-92`. YAML re-apply is deferred to the next boot (restart-latency window).
- Boot re-persist skips rows where `user_edited_at.is_some()` (`continue`) and one-shot backfills
  attribution — `crates/nexus-core/src/app.rs:592-617`; otherwise rebuilds and `insert_workflow`
  (`app.rs:627-644`). Record builder `build_workflow_record` at `app.rs:650-687` (boot copy).
- Handler-side record builder `build_workflow_record` — `handlers/workflows.rs:435` (sets
  `user_edited_at:None`, attribution `None`; `update_workflow_graph` overrides afterward).
- `Database` trait workflow surface — `crates/nexus-storage/src/database.rs:23-52`. Row mapper
  `map_workflow_row` — `crates/nexus-storage/src/row_mapping.rs:55-72`.
- `validate_workflow(&Workflow, &[OperatorDefinition]) -> Result<Vec<String>, WorkflowError>` —
  `crates/nexus-workflow/src/validation.rs:72-80`, re-exported from `lib.rs:11-13`. `Workflow` carries
  `inputs/outputs/nodes/edges(via extract_edges)/stages` plus `version`, `created_at`, `updated_at`
  (`model.rs`). This is the canonical source for `canonical_hash`.
- **Drift from design:** the design references migration anchors up to ~022. Per the CONTRACTS C1
  ledger, **highest on `main` = `025_deployment_presets.sql`; next-free per ledger = `026`** (this plan
  does not re-derive it from `main`). Migrations are hand-registered via `include_str!` in
  `crates/nexus-storage/src/sqlite/migrations.rs:12-164`; a dropped `.sql` file is INERT until its
  `execute_migration_statements(...)` call is appended. `ignore_duplicate_column=true` for
  `ALTER TABLE ADD COLUMN`, `false` for pure `CREATE`. C1 fixes P0's `026` registration flag as
  **mixed** (the `CREATE TABLE` runs with `false`; the `workflows.current_version` `ALTER` with `true`);
  per-statement registration honors that split (see step 2).
- **Design vs chosen approach:** §4.1 says snapshot content columns "migrate into `workflow_versions`"
  and `workflows` becomes pure identity+head. This plan keeps the existing `workflows` content
  columns in place (lower-risk; the editable `GraphView` and `WorkflowDto` keep reading the head row)
  and treats them as a denormalized mirror of `current_version`. `workflow_versions` is the immutable
  source of truth; `workflows` content columns are kept in sync with the head on every append. This
  satisfies every P0 acceptance criterion without a destructive column move (see Risks).

## Approach

Additive, host-generic, append-only. Add migration `026` as a CONTRACTS-C1 mixed-flag split: a new
`workflow_versions` table (PK `(workflow_id, version)`) in `026_workflow_versions.sql` (CREATE-flag
`false`) plus `ALTER TABLE workflows ADD COLUMN current_version TEXT` in `026_workflow_versions_alter.sql`
(ALTER-flag `true`). Introduce a `canonical_hash` helper (sorted-key canonical JSON over the host
`Workflow`) and an `operator_schema_hash` helper (sorted-key hash of the resolved operator
`config_schema`s the workflow's nodes reference) in `nexus-workflow`, plus the C2 `WorkflowVersionSnapshot`
assembly type. Add storage ops
(`insert_workflow_version`, `latest_version_for_author`, `list_workflow_versions`,
`get_workflow_version`, `set_current_version`) to the `Database` trait + sqlite impl + new `.sql`
files. Route all three write paths through a single shared "append-if-changed" helper that: computes
`canonical_hash`; no-ops if it equals the head version's stored hash for the relevant author kind;
otherwise inserts a new immutable `workflow_versions` row, advances `current_version`, and mirrors
content onto the head `workflows` row. Redefine `revert_workflow` to re-point `current_version` to the
latest extension-authored version (clearing `user_edited_at`) and mirror that snapshot back onto the
head row. Add the forward data migration in code (seed one version per existing workflow at boot,
before re-persist). Expose `GET /workflows/{id}/versions` and `GET /workflows/{id}/versions/{version}`.
Everything stays in host crates with zero extension-id literals; a boundary `cargo test` is added.

## Changes (ordered steps)

1. **Migration files for `026`** (new). Per CONTRACTS C1 the `026` migration is **mixed** and registers
   with split flags, so author it as two `.sql` files (the ledger number stays `026`):
   - `migrations/026_workflow_versions.sql` — CREATE only (registers `false`):
     - `CREATE TABLE IF NOT EXISTS workflow_versions (workflow_id TEXT NOT NULL, version TEXT NOT NULL,
       canonical_hash TEXT NOT NULL, operator_schema_hash TEXT NOT NULL, nodes TEXT NOT NULL, edges TEXT
       NOT NULL, inputs TEXT, outputs TEXT, stages TEXT, author_kind TEXT NOT NULL, extension_id TEXT,
       extension_version TEXT, created_at TEXT NOT NULL, PRIMARY KEY (workflow_id, version));`
     - `CREATE INDEX IF NOT EXISTS idx_workflow_versions_workflow ON workflow_versions(workflow_id);`
   - `migrations/026_workflow_versions_alter.sql` — ALTER only (registers `true`):
     - `ALTER TABLE workflows ADD COLUMN current_version TEXT;`
   Why: `workflow_versions` is the append-only source of truth; `current_version` is the head pointer.
   Table name is generic (host-owned) per the boundary rule. C1's mixed flag forbids running the
   duplicate-column swallow over the CREATE statements, hence the file split.

2. **Register migration 026** in `crates/nexus-storage/src/sqlite/migrations.rs`. Append after the 025
   block (before `Ok(())` at line 163). Per CONTRACTS C1, `026` is a **mixed** migration: the
   `CREATE TABLE`/`CREATE INDEX` statements register with `ignore_duplicate_column = false` and the
   `workflows.current_version` `ALTER TABLE ADD COLUMN` with `true`. Honor that split by registering the
   two parts as separate `.sql` files (one CREATE-only, one ALTER-only) so each gets its own flag:
   ```rust
   execute_migration_statements(
       pool,
       include_str!("../../../../migrations/026_workflow_versions.sql"),
       false, // CREATE TABLE + CREATE INDEX only
   ).await?;
   execute_migration_statements(
       pool,
       include_str!("../../../../migrations/026_workflow_versions_alter.sql"),
       true,  // ALTER TABLE workflows ADD COLUMN current_version
   ).await?;
   ```
   Why: the file is inert until registered. C1's mixed flag means the duplicate-column swallow must
   apply ONLY to the ALTER; running the whole mixed file under a single `true` would mask real CREATE
   errors. Splitting the SQL into a CREATE file (`false`) and an ALTER file (`true`) keeps each
   statement on its contract-correct idempotency flag.

3. **New `WorkflowVersionRecord`** in `crates/nexus-storage/src/records.rs` (after `WorkflowRecord`,
   line 98). Fields exactly mirror the table columns in bind order: `workflow_id`, `version`,
   `canonical_hash`, `operator_schema_hash`, `nodes`, `edges`, `inputs: Option<String>`,
   `outputs: Option<String>`, `stages: Option<String>`, `author_kind`, `extension_id: Option<String>`,
   `extension_version: Option<String>`, `created_at`. Derive `Clone, Debug, Serialize, Deserialize`.
   Add `pub current_version: Option<String>` to `WorkflowRecord` (the new head pointer). Why: the
   six-place column-addition rule — record type is place 1.

4. **Row mapper** in `crates/nexus-storage/src/row_mapping.rs`. Add `pub fn
   map_workflow_version_row(row: SqliteRow) -> WorkflowVersionRecord` mirroring `map_workflow_row`
   (use `row.try_get(...).ok().flatten()` for the nullable columns). Add
   `current_version: row.try_get("current_version").ok().flatten()` to `map_workflow_row` (line 55-72).
   Why: reads desync if the new column is not mapped.

5. **Update `workflows` queries** for the new mirror column:
   - `crates/nexus-storage/queries/workflows/insert.sql` — add `current_version` as the 15th column +
     placeholder; bind `&r.current_version` last in `insert_workflow` (`sqlite/workflows.rs:7-26`).
   - `crates/nexus-storage/queries/workflows/update.sql` — add `current_version=?` to the SET list;
     bind `&r.current_version` before the `WHERE id=?` bind in `update_workflow`
     (`sqlite/workflows.rs:49-70`). Keep created_at/extension_* omitted as today.
   Why: places 4-5 of the column-addition rule. `INSERT OR REPLACE` must carry the head pointer so a
   re-persist round-trip preserves it.

6. **New version query files** under `crates/nexus-storage/queries/workflow_versions/`:
   - `insert.sql` — `INSERT INTO workflow_versions (13 cols) VALUES (13 ?)` (no OR REPLACE; immutable).
   - `list_by_workflow.sql` — `SELECT * FROM workflow_versions WHERE workflow_id = ? ORDER BY created_at`.
   - `get_one.sql` — `SELECT * FROM workflow_versions WHERE workflow_id = ? AND version = ?`.
   - `latest_by_author.sql` — `SELECT * FROM workflow_versions WHERE workflow_id = ? AND author_kind = ?
     ORDER BY created_at DESC LIMIT 1`.
   Why: parameterized queries are the storage convention (`security.md`).

7. **New storage module** `crates/nexus-storage/src/sqlite/workflow_versions.rs` implementing
   `insert_workflow_version`, `list_workflow_versions`, `get_workflow_version`,
   `latest_workflow_version_for_author(pool, workflow_id, author_kind)` against the `.sql` files,
   mapping via `map_workflow_version_row`. Add a `set_current_version(pool, workflow_id, version,
   updated_at)` helper (inline `UPDATE workflows SET current_version = ?, updated_at = ? WHERE id = ?`).
   Wire the module into `crates/nexus-storage/src/sqlite/mod.rs` (declare `mod workflow_versions;` and
   delegate in the `SqliteDatabase` impls alongside the existing `workflows` delegations ~mod.rs:80-112).

8. **Extend the `Database` trait** in `crates/nexus-storage/src/database.rs` (after the workflow block,
   line 23-52):
   ```rust
   async fn insert_workflow_version(&self, record: &WorkflowVersionRecord) -> Result<(), StorageError>;
   async fn list_workflow_versions(&self, workflow_id: &str) -> Result<Vec<WorkflowVersionRecord>, StorageError>;
   async fn get_workflow_version(&self, workflow_id: &str, version: &str) -> Result<WorkflowVersionRecord, StorageError>;
   async fn latest_workflow_version_for_author(&self, workflow_id: &str, author_kind: &str) -> Result<Option<WorkflowVersionRecord>, StorageError>;
   async fn set_current_version(&self, workflow_id: &str, version: &str, updated_at: &str) -> Result<(), StorageError>;
   ```
   Import `WorkflowVersionRecord` in the `use crate::records::{...}` block (line 2-6). Implement all
   five on `SqliteDatabase`.

9. **Canonical hashing in `nexus-workflow`.** New module `crates/nexus-workflow/src/hashing.rs`:
   - `pub fn canonical_hash(workflow: &Workflow) -> String` — serialize `{nodes, edges (via
     extract_edges), inputs, outputs, stages}` into a canonical (sorted-key, no-whitespace) JSON
     string, then `sha256` hex. Deliberately excludes `id`, `title`, `version`, timestamps so the hash
     is content-only and stable. Use `serde_json::Value` with a recursive key-sort, or the existing JCS
     helper if one is reachable (check `sha256_jcs` usage in `nexus-deployments`); prefer a local
     sorted-serializer to avoid a cross-crate dep.
   - `pub fn operator_schema_hash(workflow: &Workflow, operators: &[OperatorDefinition]) -> String` —
     for each node, resolve `(op_id, op_version)` via the same `parse_operator_ref` rule and collect
     the operator's `config_schema` (if any) keyed by `id@version`; sort keys; canonical-JSON; sha256.
     Missing operators contribute a sentinel (empty) so the hash still computes (drift detection is a
     P1 concern; P0 just records the value).
   Export both from `crates/nexus-workflow/src/lib.rs` (add to the `pub use` block at line 11-13 and
   `pub mod hashing;` at line 1-5). Why: §4.1 requires `canonical_hash` + `operator_schema_hash` on
   every snapshot; both are pure functions over the host model.

9b. **`WorkflowVersionSnapshot` in `nexus-workflow` (HARD P0 DELIVERABLE per CONTRACTS C2).** New module
    `crates/nexus-workflow/src/snapshot.rs` defining the canonical frozen-assembly type — the SOLE
    producer of `nexus_workflow::WorkflowVersionSnapshot` for the whole program (P2's earlier "local
    stand-in" is deleted; P1/P2/P3/P4/P5/P6/P8 import THIS type). Exact C2 shape:
    ```rust
    pub struct WorkflowVersionSnapshot {
        pub workflow_id: String,
        pub version: String,
        pub workflow: Workflow,
        pub operators: Vec<OperatorDefinition>,
        pub canonical_hash: String,
        pub operator_schema_hashes: BTreeMap<String, String>,
    }
    ```
    - **Per-node `operator_schema_hashes`** (`node_id -> per-node config_schema hash`): populate this map
      on the snapshot so P8 drift detection can name the drifting `node_id` via
      `snapshot.operator_schema_hashes[node_id]`. The single **rollup** hash still lives only in the
      `workflow_versions.operator_schema_hash` column (step 9 / step 1 table). Add a hashing helper
      `operator_schema_hashes_by_node(&Workflow, &[OperatorDefinition]) -> BTreeMap<String, String>` in
      `hashing.rs` to compute the per-node map (the rollup `operator_schema_hash` is a deterministic fold
      over it; keep both so the column and the map cannot disagree).
    - **Assembly owner** (C2): P0 produces BOTH the storage read and the assembly path —
      - `get_workflow_version(workflow_id, version) -> WorkflowVersionRecord` (the `Database` op from
        step 8 / step 7 sqlite impl) is the storage read C2 names, and
      - `WorkflowVersionSnapshot::from_record(record: &WorkflowVersionRecord, operators: &[OperatorDefinition]) -> Result<Self, WorkflowError>`
        is the assembly: parse the record's `nodes/edges/inputs/outputs/stages` JSON into a `Workflow`,
        carry `canonical_hash` from the column, and compute `operator_schema_hashes` from the passed
        registry slice. The **caller passes the registry slice** (`state.extension_registry.list_operators()`),
        keeping `nexus-workflow` registry-free (matches `validate_workflow` purity — no registry import).
    - `OperatorDefinition` is Deserialize-only; the `operators` field is in-memory only. If the snapshot
      ever needs `Serialize` (run-freeze/bundle export), serialize `workflow` + audit and reconstruct
      `operators` from the registry on load — never serialize the operator defs.
    Export `WorkflowVersionSnapshot` and the helper from `lib.rs`. P3's "if absent, add it" hedge is
    void: this is a hard P0 precondition for P1+. Why: C2 makes P0 the canonical producer; downstream
    phases name exactly this crate path.

10. **Shared append-if-changed helper** in `crates/nexus-api/src/handlers/workflows.rs` (new private
    `async fn`). Signature roughly:
    ```rust
    async fn append_workflow_version_if_changed(
        state: &AppState, workflow: &Workflow, author_kind: &str,
        extension_id: Option<&str>, extension_version: Option<&str>, now: &str,
    ) -> Result<String, ApiError>; // returns the resulting current_version
    ```
    Logic: compute `canonical_hash` + `operator_schema_hash` (operators from
    `state.extension_registry.list_operators()`); fetch `latest_workflow_version_for_author(id,
    author_kind)`; if its `canonical_hash` equals the new one, return its version unchanged (NO-OP);
    else compute the next version string (see Cross-phase contracts — version-bump rule), insert a new
    `WorkflowVersionRecord`, call `set_current_version`, and return the new version. Why: the hash/no-op
    logic is net-new and must be shared across all three write paths so they behave identically.

11. **Rewire `update_workflow_graph`** (`handlers/workflows.rs:197-236`). After validation, call the
    shared helper with `author_kind="user"` (passing `existing.extension_id/version`), set
    `record.user_edited_at = Some(now)` and `record.current_version = Some(new_version)`, then mirror
    the snapshot onto the head row via the existing `update_workflow` call. Leave a single-line
    `// P1: refresh_status_for_workflow hook site` marker immediately after `current_version` advances —
    this is **version-advance site #1** (CONTRACTS C6); P0 does not call it. Why: a user edit must create
    a user-authored immutable version and pin the head to it.

12. **Rewire `create_workflow` (`:125-153`) and `update_workflow` (`:88-123`)** to call the shared
    helper (user author kind for the standalone create/update API; these are user-driven). Set
    `current_version` on the record before insert/update. Why: both overwrite paths must append.

13. **Rewire boot re-persist** in `crates/nexus-core/src/app.rs:589-645`. For rows that fall through the
    `user_edited_at` skip-guard (i.e. not user-pinned), call the equivalent append-if-changed logic with
    `author_kind="extension"` (a `nexus-core`-side helper, since this is not in `nexus-api`; it can call
    the same `Database` ops + `nexus_workflow::canonical_hash`). Only insert a new extension version when
    the incoming `canonical_hash` differs from the latest extension-authored version; never move a
    user-pinned head (the existing skip-guard already prevents touching user-edited rows). Update both
    `build_workflow_record` copies (`app.rs:650-687` and `handlers/workflows.rs:435`) to set
    `current_version`. Leave a single-line `// P1: refresh_status_for_workflow hook site` marker right
    where an extension append advances the head — this is **version-advance site #2** (CONTRACTS C6);
    P0 does not call it. Why: re-scan must append-only-on-change and never overwrite a user version.

14. **Forward data migration (code, runs at boot before re-persist).** New `async fn
    seed_workflow_versions(db)` in `crates/nexus-core/src/app.rs`, invoked once during startup ahead of
    extension re-persist: for every existing `workflows` row whose `current_version IS NULL`, build a
    `Workflow` from the row, compute both hashes, insert one `WorkflowVersionRecord` at the row's
    `version` (or `"1.0.0"` if empty), set `author_kind` from `user_edited_at` (`Some` -> `"user"`, else
    `"extension"`), copy `extension_id/version` provenance, and `set_current_version` to that version.
    Idempotent (skips rows that already have `current_version`). Why: §4.1 migration requirement —
    every existing workflow gets exactly one seed version and a head pointer.

15. **Redefine `revert_workflow`** (`handlers/workflows.rs:241-258`). New behavior: look up
    `latest_workflow_version_for_author(id, "extension")`; if found, `set_current_version` to it, clear
    `user_edited_at` (keep `clear_workflow_user_edit`), and mirror that snapshot's content onto the head
    `workflows` row immediately (so the revert is visible without a reboot). If no extension version
    exists, return the row unchanged (or a 409 — see Open questions). Why: §4.1 redefines revert as
    re-pointing the head, no data loss, no restart-latency window.

16. **Two read handlers** in `crates/nexus-api/src/handlers/workflows.rs`:
    - `list_workflow_versions(State, Path<String>) -> ApiResponse<ListResponseDto<WorkflowVersionDto>>`
    - `get_workflow_version(State, Path<(String, String)>) -> ApiResponse<WorkflowVersionDto>`
    Add a `WorkflowVersionDto` (ts-rs exported) in `crates/nexus-api/src/dto/` mirroring
    `WorkflowVersionRecord` (parse `nodes/edges/inputs/outputs/stages` JSON strings into structured
    fields, like `WorkflowDto`). Register routes in `crates/nexus-api/src/router.rs` after line 283
    (braces syntax): `.route("/workflows/{id}/versions", get(workflows::list_workflow_versions))` and
    `.route("/workflows/{id}/versions/{version}", get(workflows::get_workflow_version))`. Per CONTRACTS
    C7, **P0 is the SOLE owner/registrar of the entire `/workflows/{id}/versions[/{version}]` subtree.**
    P6 authors the `exposable-targets` handler (in `recipes/exposable_targets.rs`) but does NOT add a
    `/workflows/...` route inside `recipes::router()`; its
    `GET /workflows/{id}/versions/{version}/exposable-targets` route is **registered adjacent to P0's two
    version routes here**, once. P0 reserves that adjacent registration slot so P6 only supplies the
    handler fn.

17. **Boundary test** `crates/nexus-storage/tests/workflow_versions_boundary.rs` (or extend an existing
    host boundary test): mirror `crates/nexus-extension-deps/tests/boundary_test.rs` —
    `include_str!` BOTH `026` files (`026_workflow_versions.sql` + `026_workflow_versions_alter.sql`) and
    assert the table name is generic (`workflow_versions`, no `ext_`/extension-id prefix) and neither SQL
    file contains forbidden extension-id literals (`local-llm`, `emotiontts`, etc.). Why: §8 + the
    migration-table-name generic check from the `preset_boundary.rs` precedent.

## TDD test plan

Write RED tests first, then implement. Rust = `cargo test`; no web in P0.

**Hashing unit tests** — `crates/nexus-workflow/src/hashing.rs` `#[cfg(test)]`:
- `canonical_hash_is_stable_across_key_order` — two `Workflow`s with the same content but different
  in-memory node/config map insertion order hash equal.
- `canonical_hash_ignores_identity_and_timestamps` — changing `id`/`title`/`version`/`created_at`
  does not change the hash; changing a node config does.
- `operator_schema_hash_changes_when_schema_changes` — same workflow, two operator slices with
  different `config_schema` for the referenced op produce different hashes.
- `operator_schema_hashes_by_node_keys_each_node` — the per-node map has one entry per node id, and a
  schema change on one referenced op changes only that node's entry (rollup hash changes too).

**Snapshot assembly tests** — `crates/nexus-workflow/src/snapshot.rs` `#[cfg(test)]` (per CONTRACTS C2):
- `from_record_round_trips_workflow_and_hash` — `from_record` parses `nodes/edges/inputs/outputs/stages`
  into a `Workflow` equal to the source and carries `canonical_hash` verbatim from the column.
- `from_record_populates_per_node_schema_hashes` — the assembled snapshot's `operator_schema_hashes`
  has one entry per node, computed from the passed registry slice (caller-supplied operators).
- `from_record_is_registry_free` — assembly takes operators as a `&[OperatorDefinition]` argument; the
  module does not import the registry (compile-level / structural assertion, mirrors `validate_workflow`).

**Storage tests** — `crates/nexus-storage/tests/` (sqlite in-memory):
- `insert_and_list_workflow_versions_round_trip` — insert two versions, `list_workflow_versions`
  returns both in created_at order.
- `get_workflow_version_returns_exact_snapshot` and `get_workflow_version_missing_is_not_found`.
- `latest_for_author_filters_by_author_kind` — inserting a `user` version does not change
  `latest_workflow_version_for_author(id, "extension")`.
- `set_current_version_updates_head` — head row `current_version` reflects the call.
- `migration_026_creates_table_and_column` — run `run_migrations` (both split `026` files: CREATE-flag
  `false`, ALTER-flag `true` per C1) against a fresh in-memory DB and assert `workflow_versions` exists
  and `workflows.current_version` is queryable; a second `run_migrations` stays idempotent (the ALTER's
  duplicate-column is swallowed, the CREATE's `IF NOT EXISTS` no-ops).

**Append-if-changed / write-path tests** — `crates/nexus-api/tests/` (or handler-level):
- `user_edit_appends_new_immutable_version` — `update_workflow_graph` with changed content inserts a
  new `user`-authored row and advances `current_version`; the prior version row is unchanged.
- `identical_save_is_noop` — saving the same graph twice appends exactly one version (second call
  matches `canonical_hash`, no new row, head unchanged).
- `extension_rescan_appends_only_on_change` — boot re-persist with identical YAML appends nothing;
  with changed YAML appends one `extension` version.
- `extension_rescan_never_moves_user_pinned_head` — after a user edit, an extension re-scan with
  different YAML appends an `extension` version but leaves `current_version` pointed at the user
  version (skip-guard + author-kind isolation).
- `revert_repoints_head_to_latest_extension_version` — after a user edit, `revert_workflow` sets
  `current_version` to the latest extension version, clears `user_edited_at`, mirrors content onto the
  head row, and the user version still exists in history (no data loss).

**Forward-migration test**:
- `seed_workflow_versions_creates_one_version_per_row` — given pre-seeded `workflows` rows (one
  user-edited, one not), `seed_workflow_versions` creates exactly one version each with the correct
  `author_kind`, sets `current_version`, and is idempotent on a second run.

**Read-API test**:
- `get_versions_endpoints_return_history` — `GET /workflows/{id}/versions` lists, `/{version}` fetches
  one, missing version is 404.

**Boundary test** (RED until migration named generically): `workflow_versions_boundary` asserts no
extension-id literals and a generic table name.

GREEN: implement steps 1-17 (including 9b — `WorkflowVersionSnapshot` + `from_record`). Run
`cargo test -p nexus-workflow -p nexus-storage -p nexus-api` and the boundary test. Then `cargo fmt` +
`cargo clippy -- -D warnings`.

## Acceptance criteria

- **Migration test green:** both `026` split files (`026_workflow_versions.sql` CREATE-flag `false`,
  `026_workflow_versions_alter.sql` ALTER-flag `true`, per C1) are registered, run idempotently, and
  create `workflow_versions` (PK `(workflow_id, version)`) and `workflows.current_version`.
- **Forward migration:** every existing `workflows` row is seeded with exactly one immutable
  `workflow_versions` row at its current version (`"1.0.0"` if unset), correct `author_kind` derived
  from `user_edited_at`, `current_version` set; re-running the seed is a no-op.
- **User edit -> new immutable row:** `update_workflow_graph` on changed content inserts a new
  user-authored version, advances the head, and never mutates a prior version row.
- **Re-scan appends only on change:** boot re-persist with identical YAML appends nothing (hash match);
  changed YAML appends exactly one extension-authored version; a user-pinned head is never moved.
- **Revert re-points:** `revert_workflow` re-points `current_version` to the latest extension-authored
  version (visible without reboot), clears `user_edited_at`, and preserves the user version in history.
- **No-op on identical hash:** any save whose `canonical_hash` equals the relevant author's head hash
  inserts no new row.
- **Read APIs:** `GET /workflows/{id}/versions` and `GET /workflows/{id}/versions/{version}` return
  history; missing version -> 404.
- **`operator_schema_hash` recorded** on every snapshot (drift consumption deferred to P1).
- **`WorkflowVersionSnapshot` produced (hard P0 deliverable, CONTRACTS C2):** `nexus_workflow`
  exports `WorkflowVersionSnapshot` (with per-node `operator_schema_hashes: BTreeMap`) and
  `WorkflowVersionSnapshot::from_record(record, operators)` assembles it from a `WorkflowVersionRecord`
  + caller-passed registry slice, keeping `nexus-workflow` registry-free. `get_workflow_version`
  storage read exists.
- **Versions subtree sole-registrar (CONTRACTS C7):** P0 registers `/workflows/{id}/versions` and
  `/{version}` and reserves the adjacent slot for P6's exposable-targets route.
- **Boundary gate green:** generic table name, zero extension-id literals in new host code/SQL.

## Dependencies & sequencing

- **Upstream:** none (P0 is the root of the program DAG; P1+ depend on it).
- **Intra-phase order:** (1-2) migration files + split registration -> (3-8) storage types/queries/
  trait/impl (incl. `get_workflow_version`) -> (9) hashing in `nexus-workflow` -> (9b)
  `WorkflowVersionSnapshot` + `from_record` assembly (depends on 9 hashing + the step-8
  `WorkflowVersionRecord`) -> (10-13) write-path rewiring (shared helper first, then the three callers;
  steps 11 & 13 leave the two C6 version-advance hook-site markers) -> (14) forward migration ->
  (15) revert -> (16) read APIs (P0 sole registrar of the versions subtree; reserves P6's adjacent
  exposable-targets slot) -> (17) boundary test. Write the RED tests for each unit immediately before
  its implementation block.

## Cross-phase contracts

All shared shapes/numbers/routes per 2026-06-23-recipes-00-CONTRACTS.md — this section restates only the
artifacts P0 PRODUCES; it does not re-derive shared decisions.

PRODUCES (P1/P2/P3/P4/P5/P6/P8 consume these):
- **Table `workflow_versions`** (migration **026**, mixed-flag split per C1), PK `(workflow_id, version)`,
  columns: `workflow_id, version, canonical_hash, operator_schema_hash, nodes, edges, inputs, outputs,
  stages, author_kind ('user'|'extension'), extension_id, extension_version, created_at`. Append-only.
  The `operator_schema_hash` column holds the single **rollup** hash.
- **Column `workflows.current_version TEXT`** — head pointer (nullable until seeded, then non-null).
- **`WorkflowVersionRecord`** (`crates/nexus-storage/src/records.rs`) and **`WorkflowVersionDto`**
  (`crates/nexus-api/src/dto/`, ts-rs exported).
- **`nexus_workflow::WorkflowVersionSnapshot`** (per CONTRACTS C2) — the canonical frozen-assembly type
  (`workflow_id`, `version`, `workflow`, `operators`, `canonical_hash`, plus per-node
  `operator_schema_hashes: BTreeMap<String, String>`). **P0 is the sole producer**; downstream phases
  import this crate path (P2's local stand-in deleted). The `operators` field is in-memory only.
- **`WorkflowVersionSnapshot::from_record(&WorkflowVersionRecord, &[OperatorDefinition]) -> Result<Self, WorkflowError>`**
  — the single assembly path; caller passes the registry slice (`list_operators()`), `nexus-workflow`
  stays registry-free. P3/P4/P5/P6/P8 use this one path.
- **`pub fn nexus_workflow::canonical_hash(&Workflow) -> String`**, **`pub fn
  nexus_workflow::operator_schema_hash(&Workflow, &[OperatorDefinition]) -> String`** (rollup), and
  **`operator_schema_hashes_by_node(&Workflow, &[OperatorDefinition]) -> BTreeMap<String, String>`** —
  reused by the snapshot assembly and downstream status computation.
- **`Database` ops:** `insert_workflow_version`, `list_workflow_versions`, **`get_workflow_version`**
  (the C2-named storage read), `latest_workflow_version_for_author`, `set_current_version`.
- **Routes:** `GET /api/v1/workflows/{id}/versions`, `GET /api/v1/workflows/{id}/versions/{version}`
  (P0 is the SOLE registrar — see C7 note below).
- **Workflow-versions subtree ownership (CONTRACTS C7):** P0 is the **sole owner/registrar** of the
  `/workflows/{id}/versions[/{version}]` route subtree. P6's
  `GET /workflows/{id}/versions/{version}/exposable-targets` handler is authored in P6
  (`recipes/exposable_targets.rs`) but its route is **registered adjacent to P0's version routes** (in
  `router.rs`, next to step 16's two registrations), exactly once — P6 never adds a `/workflows/...`
  route inside `recipes::router()`. P0 reserves the adjacent slot.
- **Version-bump rule (decision needed, see Open questions):** new versions derive a fresh string; the
  default is to append a monotonically increasing suffix when the incoming `version` collides with an
  existing `(workflow_id, version)` PK (e.g. `1.0.0`, `1.0.0+2`), so the PK never conflicts on append.
- **Two version-advance sites left identifiable for P1 (per CONTRACTS C6):** P0 does NOT compute recipe
  status, but it leaves the two places where `current_version` advances clearly identifiable so P1 can
  wire `refresh_status_for_workflow(db, workflow_id)` into them:
  1. `update_workflow_graph` (step 11) — right **after** the shared helper advances `current_version`.
  2. the boot/activation re-scan append in `crates/nexus-core/src/app.rs` (step 13) — right after an
     extension-authored append advances the head.
  P1 owns `refresh_status_for_workflow` and the `cached_status_refreshes_on_version_change` test; P0's
  job is only to make these two call sites unmistakable (a short `// P1: refresh_status_for_workflow
  hook site` marker at each). Refreshing status is explicitly out of P0 scope.

CONSUMES: nothing (root phase). Reuses `validate_workflow`, `extract_edges`, `parse_operator_ref`,
`list_operators()`, and the existing `WorkflowRecord` content columns as the head mirror.

## Boundary discipline

- All new code lives in host crates (`nexus-storage`, `nexus-workflow`, `nexus-api`, `nexus-core`) —
  **zero extension-id literals**, zero hardcoded node ids. `author_kind` and `extension_id` are opaque
  generic strings set from whatever extension is active at boot; no branching on a specific id.
- New table `workflow_versions` is host-generic and lives in the root `migrations/` folder (host
  schema) — NOT under any `extensions/builtin/<ext-id>/storage/` tree, and not prefixed `ext_`.
- New routes are generic-by-`:id`/`:version` over host-owned rows, following the host-overlay
  precedent (install, settings/idle_timeout). axum brace syntax `{id}`/`{version}`.
- Boundary `cargo test` mirrors `crates/nexus-extension-deps/tests/boundary_test.rs` +
  `crates/nexus-deployments/tests/preset_boundary.rs` (generic table-name assertion).
- Edit from repo root: the `check-comment-write.py` PreToolUse hook breaks when shell cwd drifts off
  the repo root, and blocks body comments > 2 lines (docstrings exempt).

## Risks & mitigations

- **Content columns kept on `workflows` (mirror) drift from `workflow_versions`.** Mitigation: every
  append and every revert mirrors the head snapshot onto the `workflows` row in the same handler call;
  a storage test asserts head content matches the `current_version` snapshot after each write path. The
  alternative (physically moving columns out, per literal §4.1) is deferred — it would break `WorkflowDto`,
  `GraphView`, and `RunRecord.workflow_version` capture for no P0-acceptance benefit.
- **PK collision when the incoming `version` string repeats** (UI controls `version` verbatim today, no
  server increment). Mitigation: the version-bump rule appends a unique suffix on collision; a test
  covers two saves with the same declared `version` but different content.
- **`canonical_hash` instability** across serde key order / float formatting. Mitigation: sorted-key
  canonical serialization + an explicit stability test; floats are passed through as the JSON the model
  already stores (no re-parse).
- **Forward migration ordering at boot** — must run before extension re-persist or unseeded rows take
  the wrong author kind. Mitigation: `seed_workflow_versions` runs first in startup and is idempotent.
- **Migration not registered** (the known prior root bug). Mitigation: step 2 appends BOTH `026`
  `include_str!` calls (CREATE-flag `false`, ALTER-flag `true` per C1); a migration test fails loudly if
  the table or the `current_version` column is absent.
- **`operator_schema_hash` for missing operators.** Mitigation: sentinel-empty contribution so the hash
  still computes; drift -> `broken` is a P1 concern, explicitly out of P0 scope here.

## Out of scope

- Physically moving `workflows` content columns into `workflow_versions` (kept as a mirror; deferred).
- Recipe projection, pinning, `status`, and the recipe-table migration (P1).
- The binding compiler and `WorkflowVersionSnapshot` *consumption* (P2 imports the P0-produced type),
  `validate_node_config` wrapper (P2). P0 PRODUCES `WorkflowVersionSnapshot` + `from_record` (step 9b,
  CONTRACTS C2); only its consumption/compilation is out of scope.
- Consuming `operator_schema_hash` to compute `broken` (P1).
- Any UI for version history / diff / outdated badge (P8); P0 ships read APIs only.
- Auto-upgrading or auto-incrementing semantic versions beyond collision-avoidance suffixing.
