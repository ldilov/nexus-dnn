# Manifest Storage Block Specification

## 1. Overview

This document proposes an additive `storage` block for `manifest.yaml`.

The proposal follows the current repo's snake_case style.

## 2. Proposed manifest shape

```yaml
spec_version: "0.2"

extension:
  id: "example.chat.llama"
  version: "0.4.0"
  name: "Local Chat for llama.cpp"
  description: "Chat-oriented local LLM operators, recipes, and chat history projection."
  publisher: "example"

compatibility:
  host_api: ">=0.2.0, <0.3.0"
  protocol: ">=0.2.0, <0.3.0"

runtime:
  family: "native"
  entrypoint: "worker/llama_adapter"

capabilities:
  - "model.registry.read"
  - "network.loopback"
  - "storage.schema_contribute"

operators:
  - file: "operators/llm_chat_generate.yaml"
  - file: "operators/chat_thread_append.yaml"

recipes:
  - file: "recipes/local_chat.yaml"

storage:
  spec_version: "0.1"
  engine: "sqlite"
  namespace:
    alias: "chat_llama"
    prefix_mode: "host_derived"
  migrations:
    strategy: "sql_file_list"
    files:
      - id: "001_init"
        path: "storage/migrations/001_init.sql"
      - id: "002_indexes"
        path: "storage/migrations/002_indexes.sql"
  sql_profile:
    profile: "nexus_sqlite_v1"
  uninstall:
    policy: "retain"
  runtime_access:
    mode: "host_api_only"
```

## 3. Field rules

### 3.1 `storage.spec_version`
- required when `storage` is present
- identifies the storage contribution contract version
- initial value: `0.1`

### 3.2 `storage.engine`
- required
- allowed value in the first implementation: `sqlite`

### 3.3 `storage.namespace.alias`
- required
- lowercase snake_case token
- regex: `^[a-z][a-z0-9_]{2,48}$`
- requested by the extension
- not the final authority for the actual prefix

### 3.4 `storage.namespace.prefix_mode`
- required
- initial allowed value: `host_derived`
- means the host computes the effective prefix from the alias and validates uniqueness

### 3.5 `storage.migrations.strategy`
- required
- initial allowed value: `sql_file_list`
- later values might include `dsl_bundle` or `host_api_steps`, but not in the first implementation

### 3.6 `storage.migrations.files`
- required if storage is declared
- ordered list
- every item must contain:
  - `id`
  - `path`
- `id` regex: `^[0-9]{3}_[a-z0-9_]{2,64}$`
- `path` must remain inside the extension directory
- duplicate migration ids are forbidden

### 3.7 `storage.sql_profile.profile`
- required
- initial allowed value: `nexus_sqlite_v1`
- binds the extension to the allowed SQL subset and validation rules in this package

### 3.8 `storage.uninstall.policy`
- optional
- allowed values:
  - `retain`
  - `drop_namespace_objects`
  - `archive_then_drop`
- default: `retain`

### 3.9 `storage.runtime_access.mode`
- optional
- allowed values in the first implementation:
  - `host_api_only`
- future candidates:
  - `scoped_sql_session`
  - `read_only_snapshot`
- default: `host_api_only`

## 4. Host-derived effective prefix

The host computes the effective prefix as:

```text
ext_<namespace_alias>_
```

Example:

- alias: `chat_llama`
- effective prefix: `ext_chat_llama_`

### Collision rule

If the computed prefix collides with an existing reserved prefix for a different extension, the host shall reject activation and surface a validation error.

### Reserved words rule

The host shall reject aliases that would result in prefixes colliding with:

- host core table prefixes
- SQLite internal object names
- existing extension namespace prefixes

## 5. Placeholder expansion

The host expands the following placeholder tokens inside migration files before validation and execution:

- `{{prefix}}` -> `ext_chat_llama_` or other host-approved prefix

No other placeholders are valid in v1.

## 6. Manifest validation additions

When `storage` is present, activation validation shall additionally enforce:

1. capability `storage.schema_contribute` is declared,
2. all migration files exist,
3. all migration ids are unique and ordered,
4. the alias is valid,
5. the profile is supported,
6. all SQL files pass static validation,
7. the migration plan passes dry-run validation.

## 7. Compatibility policy

- a change to `storage.spec_version` is a contract change
- a change to SQL profile is a compatibility change
- changing alias after migrations have been applied is forbidden
- removing historical migration files for an installed version is forbidden

## 8. Versioning recommendation

Keep this storage block versioned independently from the broader manifest spec, but embed it inside the manifest for packaging and discovery simplicity.
