# Contract — Migration 011 (`011_deployments.sql`)

**Owner**: `nexus-storage` (Clarification Q1 / FR-037). No extracted crate owns this file.
**Path**: `crates/nexus-storage/migrations/011_deployments.sql`.
**Runner entry**: add a new `execute_migration_statements(pool, include_str!(".../011_deployments.sql"), true)` call at the tail of `run_migrations` in `crates/nexus-storage/src/sqlite/migrations.rs`. `ignore_duplicate_column=true` so `ALTER TABLE … ADD COLUMN` is idempotent.

## Required SQL shape

```sql
-- 1. New deployment tables (full definitions below; verbatim from data-model.md §1.1–§1.12)

CREATE TABLE IF NOT EXISTS deployments ( … );
CREATE UNIQUE INDEX IF NOT EXISTS idx_deployments_slug      ON deployments(workspace_id, slug);
CREATE        INDEX IF NOT EXISTS idx_deployments_updated   ON deployments(workspace_id, updated_at DESC);
CREATE        INDEX IF NOT EXISTS idx_deployments_state     ON deployments(state, restore_state);

CREATE TABLE IF NOT EXISTS deployment_revisions ( … );
CREATE UNIQUE INDEX IF NOT EXISTS idx_deployment_revisions_number
    ON deployment_revisions(deployment_id, revision_number);

CREATE TABLE IF NOT EXISTS deployment_snapshots ( … );
CREATE        INDEX IF NOT EXISTS idx_deployment_snapshots_rev_kind
    ON deployment_snapshots(deployment_revision_id, snapshot_kind);

CREATE TABLE IF NOT EXISTS deployment_source_links ( … );
CREATE        INDEX IF NOT EXISTS idx_deployment_source_links_rev
    ON deployment_source_links(deployment_revision_id);

CREATE TABLE IF NOT EXISTS deployment_parameters ( … );
CREATE        INDEX IF NOT EXISTS idx_deployment_parameters_scope
    ON deployment_parameters(deployment_revision_id, scope);
CREATE        INDEX IF NOT EXISTS idx_deployment_parameters_target
    ON deployment_parameters(deployment_revision_id, binding_target);
CREATE UNIQUE INDEX IF NOT EXISTS idx_deployment_parameters_unique
    ON deployment_parameters(deployment_revision_id, scope, binding_target, logical_key);

CREATE TABLE IF NOT EXISTS deployment_runtime_bindings ( … );
CREATE TABLE IF NOT EXISTS deployment_model_bindings ( … );
CREATE TABLE IF NOT EXISTS deployment_artifact_bindings ( … );
CREATE TABLE IF NOT EXISTS deployment_validations ( … );
CREATE TABLE IF NOT EXISTS deployment_restore_diagnostics ( … );
CREATE TABLE IF NOT EXISTS deployment_run_links ( … );
CREATE TABLE IF NOT EXISTS deployment_tags ( … );

-- 2. Additive ALTER TABLE on existing tables (idempotent via runner)

ALTER TABLE workflows ADD COLUMN source_kind            TEXT NULL;
ALTER TABLE workflows ADD COLUMN source_extension_id    TEXT NULL;
ALTER TABLE workflows ADD COLUMN source_template_ref    TEXT NULL;
ALTER TABLE workflows ADD COLUMN availability_state     TEXT NULL;
ALTER TABLE workflows ADD COLUMN canonical_hash         TEXT NULL;
ALTER TABLE workflows ADD COLUMN parent_workflow_id     TEXT NULL;

ALTER TABLE recipes   ADD COLUMN source_kind            TEXT NULL;
ALTER TABLE recipes   ADD COLUMN source_extension_id    TEXT NULL;
ALTER TABLE recipes   ADD COLUMN source_template_ref    TEXT NULL;
ALTER TABLE recipes   ADD COLUMN availability_state     TEXT NULL;
ALTER TABLE recipes   ADD COLUMN mapping_contract_json  TEXT NULL;

-- Only if existing tables lack these columns (verified in /speckit.implement):
ALTER TABLE runtime_installs  ADD COLUMN schema_version INTEGER NULL;
ALTER TABLE runtime_installs  ADD COLUMN health_state   TEXT NULL;
ALTER TABLE runtime_settings  ADD COLUMN schema_version INTEGER NULL;
ALTER TABLE runtime_settings  ADD COLUMN health_state   TEXT NULL;

ALTER TABLE runs ADD COLUMN deployment_id            TEXT NULL;
ALTER TABLE runs ADD COLUMN deployment_revision_id   TEXT NULL;
ALTER TABLE runs ADD COLUMN execution_context_hash   TEXT NULL;
CREATE INDEX IF NOT EXISTS idx_runs_deployment            ON runs(deployment_id);
CREATE INDEX IF NOT EXISTS idx_runs_deployment_revision   ON runs(deployment_revision_id);
```

## Invariants

- **Append-only**: no `DROP TABLE`, no `DROP COLUMN`, no renames.
- **Idempotent**: every statement survives re-application (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ADD COLUMN` with runner's `ignore_duplicate_column=true`).
- **Numbering**: file is named `011_deployments.sql`. Future migrations continue numbering from `012` regardless of which crate contributes them conceptually — the file still lives in `nexus-storage/migrations/`.
- **No implicit FKs via SQLite**: foreign-key-style relationships are enforced at the repository layer, consistent with the existing project approach.
- **Back-fill**: none. Legacy runs carry NULL in the three new `runs` columns.

## Tests

- `crates/nexus-storage/tests/migration_011_apply_twice.rs` — apply the migration, apply it again, assert no error and table shape unchanged.
- `crates/nexus-storage/tests/migration_011_schema.rs` — assert every expected table + column + index exists after migration.
