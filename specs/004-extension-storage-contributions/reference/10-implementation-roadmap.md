# Implementation Roadmap

## 1. Recommended sequencing

This roadmap fits the current repo layout and existing architecture direction.

## 2. Phase A - ADR and schemas

### Deliverables

- adopt the ADR in `01-adr-extension-storage-contributions.md`
- add `storage` block to `schemas/extension-manifest.json`
- add `schemas/storage-contribution.schema.json`
- document SQL profile `nexus_sqlite_v1`

### Repo touch points

- `schemas/extension-manifest.json`
- `schemas/storage-contribution.schema.json`
- `docs/extension-guide.md`
- `docs/database-schema.md`
- `docs/extension-internals.md`

## 3. Phase B - parser and validator

### Deliverables

- parse new storage block in `crates/nexus-extension`
- validate alias, migration ids, file paths
- implement static SQL validator
- implement dry-run validator against temp SQLite DB

### Repo touch points

- `crates/nexus-extension/src/...`
- `crates/nexus-storage/src/...`
- unit tests under both crates

## 4. Phase C - host core metadata tables

### Deliverables

- add host migration for storage metadata tables
- add repository/service methods for namespaces, migrations, objects, operations

### Repo touch points

- `migrations/003_extension_storage_core.sql`
- `crates/nexus-storage/src/...`
- `docs/database-schema.md`

## 5. Phase D - apply lifecycle integration

### Deliverables

- integrate storage validation into extension activation pipeline
- reserve namespace prefixes
- apply migrations transactionally
- emit events
- block activation on storage errors

### Repo touch points

- `crates/nexus-extension`
- `crates/nexus-storage`
- `crates/nexus-events`
- `crates/nexus-core`

## 6. Phase E - API and diagnostics

### Deliverables

- expose storage status endpoints
- expose verify and uninstall operations
- show storage info in extension detail UI later

### Repo touch points

- `crates/nexus-api`
- `apps/web`

## 7. Phase F - example extension

### Deliverables

- add an example storage-contributing extension pack
- recommend the chat/llama example or a simpler thread/message example first
- ship docs and tests with it

### Repo touch points

- `extensions/examples/...`
- `docs/extension-guide.md`
- `tests/integration/...`

## 8. Suggested implementation checklist

### Parser and model
- [ ] add `StorageContribution` model types
- [ ] add manifest schema validation
- [ ] add profile enum and placeholder rules

### Validation
- [ ] path safety checks
- [ ] checksum computation
- [ ] static SQL tokenizer/parser
- [ ] object inventory extraction
- [ ] temp DB dry-run pipeline

### Storage core
- [ ] metadata tables
- [ ] namespace reservation logic
- [ ] migration apply logic
- [ ] integrity verification
- [ ] uninstall modes

### Events and API
- [ ] event payloads
- [ ] status endpoint
- [ ] validate endpoint
- [ ] verify endpoint
- [ ] uninstall endpoint

### Docs and examples
- [ ] extension guide update
- [ ] database schema update
- [ ] chat example pack
- [ ] acceptance tests

## 9. Recommendation on timing

Do not block the first thin vertical execution slice on this feature.

Build it after the worker-backed slice is real, but before heavily encouraging third-party extension authors to build stateful packs.
