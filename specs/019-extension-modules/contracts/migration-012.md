# Contract: Migration 012 — `extensions` primary refs & icon

**Feature**: 019-extension-modules
**Status**: Draft (Phase 1)
**File**: `migrations/012_extensions_primary_refs.sql`
**Registered in**: `crates/nexus-storage/src/sqlite/migrations.rs`

## 1. Purpose

Add five nullable columns to `extensions` that carry:
- the module's **primary recipe** and **default workflow** references (FR-034)
- the module's **icon** manifest contract (FR-I01..FR-I05)

No data is rewritten. Existing rows default each new column to NULL.

## 2. SQL body

```sql
-- Additive columns on extensions; all nullable for forward-compat
ALTER TABLE extensions ADD COLUMN primary_recipe_id TEXT NULL;
ALTER TABLE extensions ADD COLUMN default_workflow_id TEXT NULL;
ALTER TABLE extensions ADD COLUMN icon_kind TEXT NULL;
ALTER TABLE extensions ADD COLUMN icon_symbol TEXT NULL;
ALTER TABLE extensions ADD COLUMN icon_svg TEXT NULL;
```

No indexes are added (the aggregator scans the full row on `GET /modules` — the table is small, typically < 100 rows; adding indexes is premature).

No constraints beyond NULLability are added (SQLite convention in this repo; referential integrity enforced in the Rust layer, consistent with spec 018).

## 3. Migration-runner registration

Edit `crates/nexus-storage/src/sqlite/migrations.rs` — add one call:

```rust
execute_migration_statements(
    pool,
    include_str!("../../../../migrations/012_extensions_primary_refs.sql"),
    true,   // ignore_duplicate_column → idempotent re-run
)
.await?;
```

Place the call after the existing 011 block so migration order stays monotonic (spec 018 FR-037).

## 4. Idempotency

All five `ALTER TABLE ADD COLUMN` statements are idempotent when re-run against an already-migrated DB because the runner swallows SQLite's `duplicate column` error (see the `ignore_duplicate_column` path in `run_migrations`). Re-running the full migration sequence on a live DB is a no-op.

## 5. Downstream updates

### 5.1 `crates/nexus-storage/queries/extensions/`

- `insert.sql` — append the five new column names and five `?` placeholders. Existing callers that did not set them pass `None`.
- `list.sql` — add the five columns to the `SELECT` projection.
- `get_by_id.sql` — same projection change.
- New file `upsert_primary_refs.sql` — `UPDATE extensions SET primary_recipe_id=?, default_workflow_id=? WHERE id=?`
- New file `upsert_icon.sql` — `UPDATE extensions SET icon_kind=?, icon_symbol=?, icon_svg=? WHERE id=?`

### 5.2 `crates/nexus-storage/src/records.rs`

`ExtensionRecord` gains:

```rust
pub struct ExtensionRecord {
    // ... existing fields ...
    pub primary_recipe_id: Option<RecipeId>,
    pub default_workflow_id: Option<WorkflowId>,
    pub icon_kind: Option<IconKind>,    // "symbol" | "svg" — persisted as TEXT
    pub icon_symbol: Option<String>,
    pub icon_svg: Option<String>,
}

pub enum IconKind { Symbol, Svg }  // NOT "Fallback" — that's a read-time composition
```

### 5.3 `crates/nexus-storage/src/sqlite/extensions.rs`

Update `insert_extension`, `list_extensions`, and `get_extension` mappers to read/write the five columns. Add `upsert_primary_refs` and `upsert_icon` helpers.

### 5.4 `crates/nexus-extension/src/registry/loaders.rs`

At extension-directory load time (legacy path), populate `primary_recipe_id`, `default_workflow_id`, and icon fields from the newly-parsed manifest if present. At ZIP-install time (new path), the install pipeline writes them as part of step 11 (registry publish).

## 6. Rollback posture

SQLite does not support `DROP COLUMN` in older versions universally; rolling back this migration requires a schema rebuild (CREATE new, COPY data, DROP old, RENAME) which is out of scope for v1. This is acceptable because the columns are nullable and never written by any path that could corrupt data — a bad release is reverted by reverting the app binary and leaving the columns unused.

## 7. Test matrix

| Test | File | Asserts |
|---|---|---|
| Migration applies cleanly | `crates/nexus-storage/src/sqlite/tests.rs::migration_012_applies` | `PRAGMA table_info(extensions)` after migration includes all five new columns |
| Migration is idempotent | `...::migration_012_idempotent_rerun` | Running the migration sequence twice leaves the schema identical |
| Legacy rows default to NULL | `...::migration_012_null_on_legacy` | Existing rows have all new columns = NULL |
| Round-trip of icon.symbol | `...::extensions_icon_symbol_roundtrip` | Insert with `icon_kind='symbol', icon_symbol='hub'` → read back identically |
| Round-trip of icon.svg | `...::extensions_icon_svg_roundtrip` | Insert with `icon_kind='svg', icon_svg='<svg…>'` → read back byte-identical |
| NULL icon_kind → fallback at aggregator | `crates/nexus-api/tests/modules_contract.rs::null_icon_renders_fallback` | `GET /api/v1/modules` returns `icon.kind='fallback'` with deterministic glyph |

## 8. Invariant preservation

- **INV-019-5** (data-model §5): enforced by the Rust mapper — on insert/update, the mapper refuses to write a row where `icon_kind='symbol' AND icon_symbol IS NULL` or `icon_kind='svg' AND icon_svg IS NULL` or `icon_kind IS NOT NULL AND icon_symbol IS NOT NULL AND icon_svg IS NOT NULL`. No database-level check constraint — SQLite convention in this repo.

- **INV-019-3/4**: enforced at manifest-ingest time (legacy loader or ZIP pipeline step 8), not at the DB layer. If the manifest declares `primary_recipe_id=X` but `X` does not exist in `recipes`, the extension fails to load with a `manifest.invalid` diagnostic.
