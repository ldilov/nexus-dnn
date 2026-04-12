# Migration Profile and SQL Rules

## 1. Purpose

This document defines the allowed SQLite subset for extension schema contributions.

The goal is to enable practical relational storage without allowing SQL features that would make isolation, validation, or recovery fragile.

## 2. Migration unit rules

1. Each migration file is an ordered unit.
2. The host runs one migration file inside one database transaction where possible.
3. If a migration file fails, the transaction is rolled back and the extension is not activated.
4. Files are applied exactly once per namespace and extension version lineage according to the migration metadata tables.

## 3. Allowed statements in `nexus_sqlite_v1`

### Allowed

- `CREATE TABLE [IF NOT EXISTS]`
- `CREATE INDEX [IF NOT EXISTS]`
- `CREATE UNIQUE INDEX [IF NOT EXISTS]`
- `ALTER TABLE <table> ADD COLUMN ...`

### Conditionally allowed

- `CREATE TABLE` with foreign keys referencing only tables within the same effective prefix
- `CHECK` constraints
- default values that are SQLite-safe and deterministic

### Not allowed

- `DROP TABLE`
- `DROP VIEW`
- `DROP TRIGGER`
- `ALTER TABLE ... DROP COLUMN`
- `ALTER TABLE ... RENAME TO`
- `CREATE VIEW`
- `CREATE TRIGGER`
- `INSERT`, `UPDATE`, `DELETE`, `REPLACE`
- `ATTACH`, `DETACH`
- `VACUUM`
- `PRAGMA`
- virtual tables in v1
- FTS tables in v1
- generated columns that depend on unsupported SQLite features
- foreign keys into host core tables or other extension namespaces

## 4. Why this profile is conservative

The first implementation should optimize for:

- easy static validation
- low blast radius
- predictable upgrades
- easy rollback on failure
- no hidden data mutations during install

Backfills and complex transforms should happen through host-managed repair jobs or extension-runtime workflows later, not through unrestricted install-time SQL.

## 5. Naming rules

### Tables

All table names must match:

```text
^{{prefix}}[a-z][a-z0-9_]{1,62}$
```

### Indexes

All index names must match:

```text
^{{prefix}}idx_[a-z][a-z0-9_]{1,58}$
```

### Recommended table suffixes

- `threads`
- `messages`
- `models`
- `profiles`
- `embeddings`
- `attachments`
- `jobs`
- `sync_state`

## 6. Foreign key rules

1. Allowed only within the same namespace prefix.
2. No foreign keys to host core tables.
3. No foreign keys to tables owned by another extension.
4. `ON DELETE` and `ON UPDATE` actions must be one of:
   - `CASCADE`
   - `RESTRICT`
   - `SET NULL`
5. Circular references should be rejected in v1 unless explicitly proven safe.

## 7. Static validation pipeline

For each migration file, the host validator shall:

1. expand approved placeholders,
2. tokenize the SQL,
3. reject unsupported statements,
4. extract object names,
5. enforce prefix rules,
6. enforce same-namespace foreign key rules,
7. reject references to forbidden objects,
8. build a migration plan summary.

## 8. Dry-run validation pipeline

The host shall additionally run the expanded SQL against a temporary SQLite database that already contains:

- the current host core schema,
- extension storage metadata tables,
- prior applied migrations for the same extension namespace.

The dry-run shall verify:

- SQL parses and executes,
- the resulting object inventory matches expectations,
- no forbidden object was created,
- the migration sequence remains internally consistent.

## 9. Checksum policy

The host computes and records:

- raw file checksum
- expanded SQL checksum

Reason:

- raw checksum proves package integrity
- expanded checksum proves execution identity for a specific prefix/profile

## 10. Deferred features

These may be added later behind a new profile version, not in `nexus_sqlite_v1`:

- FTS5 for chat transcript search
- vector-table integrations
- views and read-only helper views
- carefully scoped triggers
- controlled data backfill steps
- online repair plans
