# Operations, Security, and Uninstall

## 1. Security model

### 1.1 Core principles

1. The database file is host-owned infrastructure.
2. Extension workers do not own the database file.
3. The host validates all migration content before execution.
4. Namespace isolation is structural, not just conventional.
5. Administrative destructive operations require explicit user or operator intent.

### 1.2 Capability model

A storage-contributing extension must declare:

- `storage.schema_contribute`

This capability grants only the right to request host-managed namespace creation and migration application.

It does not grant:

- direct SQL execution against the host DB
- writes to core host tables
- unrestricted filesystem access to the DB file

### 1.3 Future runtime data access

If runtime access is needed later, add a host API layer such as:

- scoped row CRUD APIs
- prepared-statement templates owned by the host
- query descriptors validated by the host

Do not start with raw SQL from workers.

## 2. Backup and recovery

### 2.1 Backup requirement

Before destructive uninstall modes, the host should ensure one of:

- a fresh full-database backup exists, or
- an archive of the affected namespace objects is created.

### 2.2 Recovery requirement

The host should provide:

- re-validate all extension namespaces
- verify object inventory against recorded metadata
- re-mark orphaned namespaces after package removal
- export namespace data before purge

## 3. Quotas and limits

The first version should define soft operational limits even if enforcement is minimal:

- max migration files per extension: 64
- max statement count per migration: configurable, e.g. 128
- max object name length: 64
- max namespace alias length: 48

Future additions may include:

- per-namespace row count metrics
- per-namespace size estimates
- maintenance warnings when a namespace becomes large

## 4. Observability

Recommended logs:

- plan generation summary
- raw checksum and expanded checksum
- temp-db dry-run result
- applied migration ids and timings
- drift detection result
- uninstall summary

Recommended metrics:

- validation_duration_ms
- dry_run_duration_ms
- apply_duration_ms
- extension_namespace_count
- failed_storage_operations_total

## 5. Uninstall decision guidance

### Use `retain` when:
- historical data should remain inspectable
- the extension may be reinstalled later
- the user may still want exports

### Use `drop_namespace_objects` when:
- the extension data is disposable
- the user explicitly requested cleanup
- no historical dependency remains

### Use `archive_then_drop` when:
- data should be preserved outside the live DB
- the user wants cleanup plus recoverability

## 6. Data governance guidance for chat extensions

Chat extensions may hold:

- prompts
- transcripts
- attachments references
- backend model selections
- conversation metadata

Recommended policies:

- store large payloads as artifacts, not giant SQL blobs
- keep SQL tables for metadata and relationships
- support transcript export
- surface retention and purge controls clearly

## 7. Failure handling matrix

| failure | host reaction |
|---|---|
| invalid SQL profile | block activation |
| name collision | block activation |
| migration checksum drift | mark repair_required |
| dry-run failure | block activation |
| apply failure | rollback current migration and quarantine if repeated |
| uninstall archive failure | abort destructive uninstall |
| integrity drift | mark repair_required and emit event |
