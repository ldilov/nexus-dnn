# Research: Extension Storage Contributions

## R1: SQL Statement Validation in Rust

**Decision**: Use the `sqlparser` crate (sqlparser-rs) with `SQLiteDialect` for statement-type detection and object name extraction. Supplement with regex-based prefix validation for name compliance.

**Rationale**: `sqlparser` is the most mature SQL parser in Rust. It parses SQL into a full AST, making it straightforward to match on `Statement::CreateTable`, `Statement::CreateIndex`, `Statement::AlterTable` etc. and reject everything else. Object names are extracted directly from the AST nodes. The `SQLiteDialect` handles SQLite-specific syntax.

For prefix validation (ensuring table/index names start with `ext_<alias>_`), simple string matching on the extracted object names is more reliable than regex on raw SQL.

**Alternatives considered**:
- Regex-only tokenization: Fragile, fails on edge cases (strings containing SQL keywords, multi-line statements)
- `sqlite3_prepare_v2` for validation: Requires a real SQLite connection, can't do static analysis without side effects
- Custom parser: Unnecessary given sqlparser's maturity

## R2: Temporary SQLite for Dry-Run Validation

**Decision**: Use `sqlx::SqlitePool::connect("sqlite::memory:")` to create an in-memory temp database. Pre-load the host core schema + storage metadata tables by executing the same migrations. Then apply extension migrations and verify the result.

**Rationale**: sqlx fully supports in-memory SQLite databases. The pattern is: open temp pool, run host migrations to establish baseline schema, then apply extension migrations within a transaction. If any statement fails, the entire dry-run fails without affecting the real database. After successful apply, query `sqlite_master` to verify the object inventory matches expectations.

**Alternatives considered**:
- File-based temp DB: Works but slower and requires cleanup. In-memory is cleaner.
- Using the real DB with SAVEPOINT: Too risky — a failed savepoint could leave state

## R3: Migration File Checksums

**Decision**: Compute two checksums per migration file:
1. **Raw checksum**: SHA-256 of the file contents as-is (for package integrity)
2. **Expanded checksum**: SHA-256 of the SQL after `{{prefix}}` expansion (for execution identity)

Use the `sha2` crate for hashing.

**Rationale**: The raw checksum detects file tampering between installs. The expanded checksum detects if a migration would produce different SQL when applied with a different prefix (useful for detecting semantic changes vs prefix-only differences). Both are stored in the `extension_storage_migrations` table.

**Alternatives considered**:
- Single checksum: Insufficient — can't distinguish file changes from prefix changes
- MD5: Deprecated for integrity checks, SHA-256 is standard

## R4: Namespace Prefix Collision Detection

**Decision**: Query `sqlite_master` to check for existing objects with the computed prefix:
```sql
SELECT name FROM sqlite_master WHERE name LIKE ? || '%' AND type IN ('table', 'index')
```
Also maintain a deny list of reserved prefixes: `ext_sqlite_`, `ext_host_`, `ext_nexus_`, `ext_core_`.

**Rationale**: `sqlite_master` is the authoritative source for all database objects. Querying it before namespace reservation catches collisions with both other extensions and host tables. The deny list prevents extensions from choosing aliases that could be confused with host infrastructure.

## R5: Transactional Migration Apply

**Decision**: Use a single SQLite transaction wrapping: namespace reservation + all migration executions + metadata recording. SQLite DDL (CREATE TABLE, CREATE INDEX) IS transactional, unlike PostgreSQL, so this is safe.

For per-migration error granularity, use `SAVEPOINT` within the outer transaction:
```
BEGIN;
INSERT INTO extension_storage_namespaces ...;
SAVEPOINT migration_001;
  -- Execute 001_init.sql
  INSERT INTO extension_storage_migrations ...;
RELEASE migration_001;
SAVEPOINT migration_002;
  -- Execute 002_indexes.sql
  INSERT INTO extension_storage_migrations ...;
RELEASE migration_002;
COMMIT;
```

If any savepoint fails, ROLLBACK TO that savepoint, record the failure, and rollback the entire transaction.

**Rationale**: Single transaction ensures atomicity — either all migrations apply or none do. Savepoints give granular error reporting (which specific migration failed) without breaking atomicity.

## R6: Archive-Then-Drop Pattern

**Decision**: For `archive_then_drop` uninstall policy, export each namespace table as a JSONL (JSON Lines) file, one JSON object per row. Bundle all files into a ZIP archive. Record the archive path and content hash in `extension_storage_archives`.

**Rationale**: JSONL is simple, streamable, and human-readable. ZIP provides compression and single-file convenience. The alternative `.dump` format (SQLite SQL dump) preserves schema but is harder to inspect. For an archive that might be imported into a different system, JSONL is more portable.

**Implementation**: Use `sqlx::query("SELECT * FROM table")` to stream rows, serialize each as JSON with `serde_json`, write to a temp file, then ZIP all table files together.
