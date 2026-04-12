# Nexus Extension Storage Contributions Pack

This package specifies a host-owned, extension-declared SQLite schema contribution model for Nexus.

It is designed for the "later, richer model" where an extension pack may declare its own namespaced relational storage needs in the manifest, while the host remains the sole authority over the database, migration application, validation, installation lifecycle, and operational safety.

## What this pack contains

- `01-adr-extension-storage-contributions.md`
  - architectural decision record
- `02-storage-contribution-requirements.md`
  - detailed functional and non-functional requirements
- `03-manifest-storage-block-spec.md`
  - proposed manifest additions and field-by-field rules
- `04-migration-profile-and-sql-rules.md`
  - allowed SQL profile and validation rules
- `05-host-validation-and-application-lifecycle.md`
  - discovery, validation, apply, upgrade, disable, uninstall flow
- `06-core-metadata-tables.md`
  - required host-owned metadata tables
- `07-api-events-and-rust-service-contracts.md`
  - host APIs, event bus contracts, service interfaces
- `08-operations-security-and-uninstall.md`
  - security model, quotas, backups, retention, failures
- `09-chat-llama-example-pack.md`
  - worked example for a chat-oriented LLM extension
- `10-implementation-roadmap.md`
  - step-by-step implementation plan mapped to the current repo layout
- `11-acceptance-tests.md`
  - integration, migration, and recovery test plan
- `schemas/storage-contribution.schema.json`
  - machine-readable schema sketch for the new manifest block
- `examples/chat-llama/manifest.yaml`
  - manifest example using the proposed storage block
- `examples/chat-llama/storage/migrations/*.sql`
  - migration examples using host namespace expansion
- `examples/api/*.json`
  - sample API/event payloads

## Primary design stance

1. The extension does not own the SQLite database.
2. The host owns database files, connections, WAL mode, migrations, integrity checks, and recovery.
3. The extension can request a storage namespace and migrations through the manifest.
4. The host validates, plans, and applies storage changes before the extension becomes active.
5. Extension tables live in a reserved namespace with a host-controlled prefix.
6. Extensions never write to host core tables directly.
7. Historical runs remain inspectable across extension upgrades.

## Recommended repository placement

This package maps naturally into the current repo as:

```text
crates/nexus-extension/
crates/nexus-storage/
crates/nexus-api/
crates/nexus-events/
schemas/
docs/
examples/
tests/integration/
```

## Recommended rollout strategy

Implement this after the first worker-backed execution slice is proven, but before a broad third-party ecosystem push. The feature belongs in the "real extension model" and stabilization phase, not in the narrowest MVP.
