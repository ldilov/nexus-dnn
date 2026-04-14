# Research: Extension Storage Contributions

---

## R1: SQL Statement Validation in Rust

**Decision**: Use the `sqlparser` crate (sqlparser-rs) with `SQLiteDialect` for statement-type detection and object name extraction. Supplement with string matching on extracted names for prefix compliance.

**Rationale**: `sqlparser` is the most mature SQL parser in Rust. It parses SQL into a full AST, making it straightforward to match on `Statement::CreateTable`, `Statement::CreateIndex`, `Statement::AlterTable` etc. and reject everything else. Object names are extracted directly from AST nodes. The `SQLiteDialect` handles SQLite-specific syntax.

For prefix validation, simple string matching on extracted object names is more reliable than regex on raw SQL.

**Alternatives considered**:
- Regex-only tokenization: Fragile, fails on edge cases (strings containing SQL keywords, multi-line statements)
- `sqlite3_prepare_v2` for validation: Requires a real SQLite connection, can't do pure static analysis
- Custom parser: Unnecessary given sqlparser's maturity

**Version**: `sqlparser ^0.55`

---

## R2: Temporary SQLite for Dry-Run Validation

**Decision**: Use `sqlx::SqlitePool::connect("sqlite::memory:")` with `max_connections=1` to create an in-memory temp database. Pre-load host core schema (migrations 001-003), then apply extension migrations and verify object inventory.

**Rationale**: sqlx supports in-memory SQLite databases natively. The pipeline: open temp pool → run host migrations → apply extension migrations within transaction → query `sqlite_master` to verify inventory → close temp DB. If any statement fails, dry-run fails without affecting the real database.

**Alternatives considered**:
- File-based temp DB: Slower, requires cleanup. In-memory is cleaner.
- Using real DB with SAVEPOINT: Too risky — a failed savepoint could leave state.
- rusqlite (non-async): Would work but breaks the async-first architecture.

---

## R3: Migration File Checksums

**Decision**: Compute two checksums per migration file using SHA-256 (`sha2` crate):

1. **Raw checksum**: SHA-256 of file contents as-is → package integrity
2. **Expanded checksum**: SHA-256 of SQL after `{{prefix}}` expansion → execution identity

**Rationale**: Raw checksum detects file tampering between installs. Expanded checksum detects if a migration would produce different SQL when applied with a different prefix. Both stored in `extension_storage_migrations`.

**Alternatives considered**:
- Single checksum: Insufficient — can't distinguish file changes from prefix changes
- MD5: Deprecated for integrity checks
- BLAKE3: Faster but less ubiquitous. SHA-256 is standard.

**Version**: `sha2 ^0.10`

---

## R4: Namespace Prefix Collision Detection

**Decision**: Two-layer collision check:

1. Query `extension_storage_namespaces` for existing prefix reservations
2. Query `sqlite_master` for objects with the computed prefix: `SELECT name FROM sqlite_master WHERE name LIKE ? || '%' AND type IN ('table', 'index')`

Plus a hardcoded deny list: `ext_sqlite_`, `ext_host_`, `ext_nexus_`, `ext_core_`.

**Rationale**: `extension_storage_namespaces` catches reservations from the storage contribution system. `sqlite_master` catches any objects that might exist from manual creation or other systems. Deny list prevents confusion with host infrastructure.

---

## R5: Transactional Migration Apply

**Decision**: Single SQLite transaction wrapping: namespace reservation + all migration executions + metadata recording. Use SAVEPOINTs within the outer transaction for per-migration error granularity.

```
BEGIN;
INSERT INTO extension_storage_namespaces ...;
INSERT INTO extension_storage_operations ...;
SAVEPOINT migration_001;
  -- Execute 001_init.sql
  INSERT INTO extension_storage_migrations ...;
  INSERT INTO extension_storage_objects ...;
RELEASE migration_001;
SAVEPOINT migration_002;
  -- Execute 002_indexes.sql
  INSERT INTO extension_storage_migrations ...;
  INSERT INTO extension_storage_objects ...;
RELEASE migration_002;
UPDATE extension_storage_namespaces SET status='active' ...;
UPDATE extension_storage_operations SET status='completed' ...;
COMMIT;
```

If any savepoint fails: ROLLBACK TO that savepoint, record failure, ROLLBACK entire transaction.

**Rationale**: SQLite DDL (CREATE TABLE, CREATE INDEX) IS transactional unlike PostgreSQL. Single transaction ensures atomicity — all or nothing. SAVEPOINTs give granular error reporting without breaking atomicity.

---

## R6: Archive Format for archive_then_drop

**Decision**: JSONL ZIP format.

- One `.jsonl` file per namespace table (one JSON object per row)
- All table files bundled into a single `.zip` archive
- Archive named: `ext_<alias>_<ISO8601_timestamp>.zip`
- Archive placed in: `<workspace>/archives/`
- SHA-256 content hash recorded in `extension_storage_archives`
- Table and row counts recorded for verification

**Rationale**: JSONL is simple, streamable, and human-readable. ZIP provides compression and single-file convenience. More portable than SQLite `.dump` format for potential import into other systems.

**Implementation**: Use `sqlx::query("SELECT * FROM table")` to stream rows, serialize each as JSON with `serde_json`, write to temp files, then create ZIP archive with `zip` crate.

**Alternatives considered**:
- SQLite .dump: Preserves schema exactly but harder to inspect and less portable
- CSV: Loses type information, poor handling of JSON/TEXT columns
- Parquet: Overkill for this use case, heavy dependency

---

## R7: Configurable Host Limits

**Decision**: Define sensible defaults with host-level configuration overrides.

| Limit | Default | Enforced At |
|-------|---------|-------------|
| max_migrations_per_extension | 64 | Manifest validation (Stage A) |
| max_statements_per_migration | 128 | Static validation (Stage B) |
| max_migration_file_bytes | 1,048,576 (1 MiB) | File read before validation |
| quarantine_threshold | 3 | Apply failure count tracking |

**Rationale**: Hard limits prevent abuse without configuration. Configurable limits allow operators to adjust for long-lived extensions or specific deployment needs. Defaults are conservative but practical.

**Configuration path**: `storage.limits.*` in host configuration.

---

## R8: Uninstall Policy Changes on Upgrade

**Decision**: Allow policy changes on upgrade. The latest manifest version wins.

When an extension upgrades from v0.4.0 (policy=`retain`) to v0.5.0 (policy=`drop_namespace_objects`), the namespace metadata is updated to reflect the new policy. The policy is declarative intent — it only takes effect when an uninstall is actually triggered.

**Rationale**: The uninstall policy is a forward-looking preference, not a constraint on current state. Allowing changes gives extension developers flexibility to adjust cleanup behavior as their extension matures. The Uninstall API also supports `policy_override`, so operators always have the final say.

---

## R9: Migration File Requirements

**Decision**: Enforce strict requirements on migration files:

1. **Encoding**: UTF-8 only. Reject files that fail UTF-8 validation.
2. **Extension**: Must end in `.sql`.
3. **Size**: Must not exceed `max_migration_file_bytes` (default 1 MiB).
4. **Content**: Must contain at least one executable SQL statement (non-empty after stripping comments and whitespace).
5. **Path**: Must be relative to extension directory. No `..` path traversal.

**Rationale**: These constraints prevent edge cases: binary injection, oversized files consuming validation resources, empty files creating confusing migration history, and path traversal attacks.

---

## R10: Quarantine Behavior

**Decision**: Configurable quarantine threshold (default: 3 consecutive failures).

After N consecutive apply failures for the same extension:
1. Mark extension status as `quarantined_storage`
2. Suppress further automatic activation attempts
3. Preserve all diagnostic data (failed plans, error logs)
4. Require manual intervention: package replacement or explicit retry via admin API

The counter resets on successful apply or manual reset.

**Rationale**: Prevents infinite retry loops during development or with broken packages. Three is generous enough to handle transient issues but catches persistent problems quickly.

---

## R11: Concurrent Extension Installation Safety

**Decision**: Extensions are discovered and processed sequentially within the discovery pipeline. Namespace reservation is serialized via database transactions.

The `discover_and_activate()` method in `InMemoryExtensionRegistry` iterates extensions sequentially. Within each extension's activation, the `apply_plan()` method uses a single SQLite transaction that includes the namespace reservation INSERT. SQLite's write serialization guarantees only one writer at a time.

**Rationale**: The host process is single-instance. There's no need for distributed locking. SQLite's built-in transaction serialization is sufficient. If multiple host instances were ever supported (future), this would need a distributed lock or advisory lock mechanism.
