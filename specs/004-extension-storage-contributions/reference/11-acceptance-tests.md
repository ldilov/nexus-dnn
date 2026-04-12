# Acceptance Tests

## 1. Unit tests

### Manifest parsing
- valid storage block parses
- missing capability fails validation
- invalid alias fails validation
- duplicate migration ids fail validation
- path traversal in migration path is rejected

### Static SQL validation
- table names without prefix are rejected
- index names without prefix are rejected
- foreign key to host core table is rejected
- unsupported statement types are rejected
- valid create-table and create-index migrations pass

### Checksum handling
- raw checksum is stable
- expanded checksum changes when prefix changes
- checksum drift is detected for modified installed migration files

## 2. Dry-run tests

- clean install dry-run passes
- upgrade dry-run with additive migrations passes
- migration that creates conflicting object fails
- migration that uses forbidden `DROP TABLE` fails
- migration that references another extension namespace fails

## 3. Apply tests

- namespace is reserved on first install
- migration rows are recorded after apply
- object inventory rows are recorded
- extension becomes active after storage apply succeeds
- failed migration leaves no partial object inventory from that migration unit

## 4. Upgrade tests

- extension version bump with new migration file applies successfully
- changing contents of already-applied migration is rejected
- changing alias after install is rejected
- additive column migration succeeds

## 5. Disable and uninstall tests

- disable does not drop namespace objects
- uninstall with `retain` preserves tables
- uninstall with `drop_namespace_objects` removes extension objects only
- uninstall with `archive_then_drop` writes archive metadata before drop

## 6. Recovery tests

- crash after namespace reservation but before apply commit is recoverable
- crash after first migration but before final metadata update is detectable and repairable
- integrity verify detects drift after manual table deletion

## 7. End-to-end example tests

### Chat example
1. discover `example.chat.llama`
2. validate storage block
3. apply migrations
4. confirm tables exist with `ext_chat_llama_` prefix
5. create thread and messages through host-approved flows
6. list thread history in UI/API
7. disable extension
8. verify historical rows remain accessible for diagnostics

## 8. Success bar

The feature is accepted when:

- validation is strict,
- activation is safe,
- namespace isolation is proven,
- upgrade and uninstall behavior are deterministic,
- stateful extension examples work without direct DB ownership.
