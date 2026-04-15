# Phase 1 Data Model: Host Runtime Pool

**Feature**: 011-host-runtime-pool | **Date**: 2026-04-15

## Schema Delta — migration `008_host_runtime_pool.sql`

```sql
-- Host-owned runtime installs.
CREATE TABLE IF NOT EXISTS host_runtime_installs (
    install_id            TEXT PRIMARY KEY NOT NULL,
    family                TEXT NOT NULL,
    version               TEXT NOT NULL,
    accelerator           TEXT NOT NULL,
    install_root          TEXT NOT NULL,
    binary_paths          TEXT NOT NULL,
    state                 TEXT NOT NULL,
    validation_result     TEXT,
    last_failure_category TEXT,
    source_url            TEXT,
    checksum              TEXT,
    created_at            TEXT NOT NULL,
    updated_at            TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS host_runtime_idx_installs_family_state
    ON host_runtime_installs(family, state);

-- Extension-scoped leases over running runtime processes.
CREATE TABLE IF NOT EXISTS host_runtime_leases (
    lease_id              TEXT PRIMARY KEY NOT NULL,
    install_id            TEXT NOT NULL REFERENCES host_runtime_installs(install_id),
    extension_id          TEXT NOT NULL,
    pid                   INTEGER,
    port                  INTEGER,
    channel_kind          TEXT NOT NULL,
    channel_address       TEXT NOT NULL,
    api_dialects          TEXT NOT NULL,
    ready                 INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL,
    released_at           TEXT
);

CREATE INDEX IF NOT EXISTS host_runtime_idx_leases_install
    ON host_runtime_leases(install_id);
CREATE INDEX IF NOT EXISTS host_runtime_idx_leases_extension
    ON host_runtime_leases(extension_id);

-- Append-only audit trail of install state transitions.
CREATE TABLE IF NOT EXISTS host_runtime_state_log (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    install_id            TEXT NOT NULL,
    from_state            TEXT,
    to_state              TEXT NOT NULL,
    trigger               TEXT NOT NULL,
    detail                TEXT,
    occurred_at           TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS host_runtime_idx_state_log_install
    ON host_runtime_state_log(install_id);

-- One-shot row migration from the extension-scoped table (if present).
-- Executed via application code, not pure SQL, because column names differ.
-- See nexus_backend_runtimes::installs_store::migrate_from_legacy() for the
-- explicit mapping. After that copy, the old table is renamed:
--
--   ALTER TABLE ext_local_llm_runtime_installs
--     RENAME TO ext_local_llm_runtime_installs_migrated_008;
--
-- The rename acts as a loud tripwire for any code path that still writes
-- to the old name.
```

## Entities

### `RuntimeInstall` (new, host-owned)

| Field | Type | Notes |
|-------|------|-------|
| install_id | TEXT PK | Host-assigned; UUID-like |
| family | TEXT | e.g. `llama.cpp`, `tensorrt-llm` |
| version | TEXT | semver or upstream tag (e.g. `b4970`) |
| accelerator | TEXT | `cpu` \| `cuda12` \| `cuda13` \| `metal` \| `rocm` |
| install_root | TEXT | Absolute host path (post-migration) |
| binary_paths | TEXT (JSON) | Array of absolute paths; first is the canonical server binary |
| state | TEXT | `installing` → `installed` → (`needs_repair`) \| `failed` |
| validation_result | TEXT (JSON, nullable) | Full `ValidationReport` from last validate |
| last_failure_category | TEXT nullable | Derived from `ValidationReport::failure_category` |
| source_url | TEXT nullable | Where the asset was downloaded from |
| checksum | TEXT nullable | SHA-256 of the asset, hex-lowercase |
| created_at, updated_at | TEXT | ISO-8601 |

**State transitions** (enforced by `state::transition`):

```text
(new) ──► installing
installing ──► installed
installing ──► failed
installed  ──► needs_repair   (reconciler_probe only; never → installing; never → (deleted))
needs_repair ──► installed    (repair pipeline only)
installed  ──► (row deleted)  (uninstall; preceded by lease drain)
```

**Spec 010 US1 invariant carried here**: the reconciler MUST only transition `installed → needs_repair`. Any attempt by any caller to transition `installed → anything-else-except-via-user-action` is a bug and is rejected by `state::transition`.

### `RuntimeLease` (new)

| Field | Type | Notes |
|-------|------|-------|
| lease_id | TEXT PK | Host-assigned |
| install_id | TEXT FK | `host_runtime_installs.install_id` |
| extension_id | TEXT | Owner; releases on extension unload |
| pid | INTEGER nullable | Host-managed child pid; null after release |
| port | INTEGER nullable | Allocated port (if HTTP/TCP) |
| channel_kind | TEXT | `http_tcp` \| `http_unix_socket` \| `stdio_jsonrpc` \| `grpc_tcp` \| `custom_native:*` |
| channel_address | TEXT (JSON) | Opaque to other readers; typed via `RuntimeAddress` on the Rust side |
| api_dialects | TEXT (JSON) | Array of declared dialects |
| ready | INTEGER (0/1) | Flipped on `ChannelReady` event |
| created_at, released_at | TEXT, TEXT nullable | `released_at IS NULL` means the lease is live |

**On host startup**, `installs_store::hydrate_on_start` runs:

```sql
UPDATE host_runtime_leases
SET released_at = datetime('now'), ready = 0
WHERE released_at IS NULL;
```

This is R3's implementation: no live process survives a host restart, so no lease can claim live.

### `RuntimeStateLog` (new, append-only)

Audit trail. Never mutated. Queryable for diagnostics — useful for answering "who transitioned this install to `needs_repair` and when?" after a support escalation.

| Field | Type | Notes |
|-------|------|-------|
| id | INTEGER PK auto | Append order |
| install_id | TEXT | No FK (historical rows survive install deletion) |
| from_state, to_state | TEXT | `from_state IS NULL` on the initial `installing` transition |
| trigger | TEXT | `install_pipeline` \| `reconciler_probe` \| `user_action` \| `repair` \| `uninstall` |
| detail | TEXT nullable | Free-form diagnostic (e.g. failure category) |
| occurred_at | TEXT | ISO-8601 |

### `ParameterCatalog` (in-memory, not persisted)

Loaded once at startup from embedded JSON asset. Shape:

| Field | Type | Notes |
|-------|------|-------|
| family | String | e.g. `"llama.cpp"` |
| snapshot_date | String | ISO date of upstream snapshot |
| upstream_source | String | Upstream README reference |
| entries | `Vec<ParameterCatalogEntry>` | See below |
| by_flag | `HashMap<String, usize>` (private) | Index for O(1) flag lookup |

`ParameterCatalogEntry`:

| Field | Type | Notes |
|-------|------|-------|
| section | String | `Common params` \| `Sampling params` \| `Server-specific params` |
| flags | `Vec<String>` | All aliases (e.g. `["-h", "--help", "--usage"]`) |
| policy | `ParameterPolicy` | `ManagedSpawnDisallowed` \| `HostInjected` \| `HostGoverned` \| `ExtensionPassthrough` |
| summary | String | One-line purpose |
| default | `Option<String>` | From upstream docs |
| allowed_values | `Option<String>` | From upstream docs |
| env_vars | `Vec<String>` | e.g. `["LLAMA_ARG_PORT"]` |
| notes | `Vec<String>` | Multi-line annotations |
| security_gated | bool | Hard gate flag |

### `ExtensionRuntimeDependency` (manifest-level, not a table)

Declared in `extensions/builtin/*/manifest.yaml`:

```yaml
runtime_dependencies:
  - family: "llama.cpp"
    version: ">=b4000"
    acceleration: ["cpu", "cuda12", "cuda13"]
```

Resolved at extension-enable time:

| Field | Type | Notes |
|-------|------|-------|
| family | String | Must match a known `RuntimeFamilyId` |
| version | `Option<String>` | semver range; null = any |
| acceleration | `Vec<AcceleratorProfile>` | Any one must match a current install |

## Relationships

```text
RuntimeInstall 1 ─── 0..* RuntimeLease             (install_id)
RuntimeInstall 1 ─── 0..* RuntimeStateLog          (install_id, audit)
RuntimeLease   1 ─── (owning extension_id)         (no FK; extensions can come and go)
RuntimeInstall 1 ─── 1 ParameterCatalog            (per family; catalog is in-memory, not stored)
ExtensionManifest ─── 0..* ExtensionRuntimeDependency  (resolved at enable time)
```

## Invariants

- `host_runtime_installs.state` can transition only along the diagram above. Any unexpected transition is a bug caught by `state::transition` (returns typed error).
- `host_runtime_leases.released_at IS NULL` **if and only if** the host believes the process is live. On startup, all null releases are backfilled with `datetime('now')`.
- `host_runtime_installs.install_root` is absolute, canonical (symlinks resolved), and host-owned. No extension namespace prefix.
- `host_runtime_state_log` rows are never deleted or updated, not even on uninstall. Referenced install rows may be gone; the log is the surviving truth.
- A row exists in `host_runtime_installs` **if and only if** the checksum-verified artifacts are on disk at `install_root`. Partial/failed installs never commit a row.
- `ParameterCatalog` is immutable once loaded; the `Arc<ParameterCatalog>` can be shared freely across tasks.

## Legacy table after migration

`ext_local_llm_runtime_installs_migrated_008` — renamed from `ext_local_llm_runtime_installs` after the one-shot copy. Never read or written by the new host code. Kept as a safety net for 90 days post-merge; a follow-up migration drops it.

## Deprecated route family after migration

`/api/v1/llm/backends/*` — dual-routed for 90 days with `Deprecation: true` + `Sunset` headers. Per R7.
