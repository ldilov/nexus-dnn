# Storage Contribution Requirements

## 1. Scope

This document defines the requirements for extension-declared relational storage contributions in the Nexus host SQLite database.

This feature covers:

- manifest declaration of storage needs
- migration file packaging
- namespace reservation
- migration validation and application
- metadata recording
- upgrade and uninstall behavior
- host APIs for inspection and operations
- extension examples such as chat history storage

This feature does not cover:

- arbitrary extension access to host core tables
- distributed databases
- remote multi-node schema management
- unrestricted SQL execution from extension workers
- vector search engine design beyond metadata representation

## 2. Goals

1. Allow extensions to persist structured relational state.
2. Preserve the host as the owner of the SQLite database.
3. Guarantee namespace isolation between extensions and core tables.
4. Make upgrades, disablement, and recovery deterministic.
5. Keep the feature compatible with the existing extension lifecycle.
6. Support extension categories such as local chat, retrieval, runtime adapters, and metadata-heavy integrations.

## 3. Non-goals

1. Replacing the artifact store with extension SQL tables.
2. Letting extensions redefine host lineage or cache semantics.
3. Supporting every SQLite feature in v1 of this storage model.
4. Solving remote sync and multi-user conflict resolution.
5. Giving third-party code a general-purpose SQL console into the host DB.

## 4. Terminology

- **storage contribution**: the manifest-declared storage section for an extension.
- **namespace alias**: a human-readable requested namespace token, such as `chat_llama`.
- **effective prefix**: the host-approved object prefix used in DB object names, such as `ext_chat_llama_`.
- **core table**: any host-owned table outside extension namespaces.
- **extension object**: a table or index created through an approved extension storage migration.
- **migration profile**: the allowed SQL subset for extension schema migrations.

## 5. Functional requirements

### FR-SC-001 - Manifest declaration
The extension manifest shall allow an optional `storage` block.

### FR-SC-002 - Host authority
The host shall remain the sole authority that opens the SQLite database, validates migration files, and applies schema changes.

### FR-SC-003 - Namespace reservation
The host shall reserve an effective namespace prefix for every extension that declares storage contributions.

### FR-SC-004 - Prefix enforcement
Every extension-created SQL object shall begin with the host-approved effective prefix.

### FR-SC-005 - Collision detection
The host shall reject activation if any declared or generated object collides with an existing object outside the same extension namespace.

### FR-SC-006 - Migration packaging
The manifest shall allow an ordered list of migration files packaged with the extension.

### FR-SC-007 - Validation before activation
The host shall validate all storage contributions before the extension enters the `active` state.

### FR-SC-008 - Checksum recording
The host shall record the checksum of every migration file applied for an extension version.

### FR-SC-009 - Idempotent install planning
The host shall compute an install or upgrade plan before mutating the database.

### FR-SC-010 - Dry-run validation
The host shall support validation in a temporary SQLite database before applying migrations to the real metadata database.

### FR-SC-011 - Ordered execution
The host shall apply extension migration files in manifest order.

### FR-SC-012 - Partial failure handling
If a migration fails, the host shall roll back the transaction for that migration unit and mark the extension invalid or quarantined.

### FR-SC-013 - State recording
The host shall record storage namespace status, schema version, applied migrations, and validation failures in host-owned metadata tables.

### FR-SC-014 - Upgrade support
The host shall support extension upgrades when the new migration plan is compatible with prior applied migrations.

### FR-SC-015 - Downgrade rules
The host shall reject unsafe downgrades by default unless an explicit host-supported downgrade strategy exists.

### FR-SC-016 - Uninstall policy
The host shall support explicit uninstall policies: `retain`, `drop_namespace_objects`, and `archive_then_drop`.

### FR-SC-017 - Disablement behavior
Disabling an extension shall not automatically drop its namespace objects.

### FR-SC-018 - Historical inspectability
Historical runs that reference an extension shall remain inspectable after an upgrade or disable action.

### FR-SC-019 - Read APIs
The host shall expose read APIs for namespace metadata, migration history, and object inventory.

### FR-SC-020 - Admin operations
The host shall expose admin operations for validating, applying, repairing, and uninstalling extension storage.

### FR-SC-021 - Event emission
The host shall emit events when namespaces are reserved, migrations are planned, applied, skipped, failed, repaired, or dropped.

### FR-SC-022 - Capability gate
An extension that declares storage contributions shall explicitly request a capability such as `storage.schema_contribute`.

### FR-SC-023 - Optional worker data access
If extension code requires reading or writing its relational data at runtime, the host shall provide a scoped access path later through approved APIs rather than direct ownership of the DB file.

### FR-SC-024 - Reserved placeholders
Migration files shall support only a small approved set of host expansion placeholders such as `{{prefix}}`.

### FR-SC-025 - No host-table references
Extension migrations shall not reference host core tables using foreign keys, triggers, inserts, or view definitions.

### FR-SC-026 - Object inventory
The host shall record every object created for an extension namespace, including table and index names.

### FR-SC-027 - Schema drift detection
The host shall detect drift between declared migrations, recorded checksums, and actual database objects.

### FR-SC-028 - Integrity verification
The host shall provide a command or API to verify extension storage integrity across all installed extensions.

### FR-SC-029 - Workspace scope
In v1 of this feature, namespace storage shall remain scoped to the current local workspace metadata database.

### FR-SC-030 - Extension pack portability
A packaged extension with storage contributions shall remain installable via local directory discovery using the same manifest-driven extension lifecycle.

## 6. Non-functional requirements

### NFR-SC-001 - Isolation
A faulty extension migration shall not corrupt unrelated extension namespaces or host core tables.

### NFR-SC-002 - Determinism
Migration validation and application shall be deterministic for the same extension package, host version, and existing migration state.

### NFR-SC-003 - Observability
Every storage lifecycle step shall be logged and surfaced as a typed event.

### NFR-SC-004 - Recoverability
The host shall be able to resume or repair extension storage state after a crash during validation or migration.

### NFR-SC-005 - Testability
The feature shall be testable with unit tests, temporary SQLite databases, and end-to-end extension install flows.

### NFR-SC-006 - Performance
Startup validation shall remain bounded and should avoid re-validating already-applied migrations unless checksums or versions changed.

### NFR-SC-007 - Clarity
The effective namespace prefix and migration history shall be visible to developers and users in diagnostics.

### NFR-SC-008 - Compatibility
The storage contribution contract shall be versioned in the manifest schema.

### NFR-SC-009 - Safety
The SQL profile shall default to a conservative subset that is easy to validate and reason about.

### NFR-SC-010 - Incremental adoption
The feature shall be optional and shall not affect extensions that do not declare storage contributions.

## 7. Acceptance summary

The feature is complete when:

1. an extension can declare a storage namespace and migration files in the manifest,
2. the host validates and applies them safely,
3. all objects are namespaced and tracked,
4. upgrade and uninstall behavior is explicit,
5. chat-style stateful extensions can use the model without database ownership.
