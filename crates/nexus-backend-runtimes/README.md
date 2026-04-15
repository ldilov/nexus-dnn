# nexus-backend-runtimes

Host-owned management of inference backend runtimes (llama.cpp, TensorRT-LLM, future engines). Extracted from the retired `nexus-local-llm` crate as part of [spec 011 — Host Runtime Pool](../../specs/011-host-runtime-pool/spec.md). The host owns install, validation, process supervision, and channel allocation; extensions own routing, prompt composition, and model semantics.

## Architecture

```text
+----------------------------------------+
| Extension (e.g. nexus.local-llm)       |
| - declares runtime_dependencies        |
| - calls /api/v1/backends/.../lease     |
| - speaks via the returned channel      |
+--------------------+-------------------+
                     |
                     v
+----------------------------------------+
| nexus-backend-runtimes (host crate)    |
| - install pipeline (download/extract)  |
| - validator + state machine            |
| - PortAllocator + Spawner              |
| - reserved_policy gate                 |
| - parameter_catalog (213 llama flags)  |
| - migrate_from_legacy + relocator      |
+--------------------+-------------------+
                     |
                     v
+----------------------------------------+
| host_runtime_installs (SQLite)         |
| host_runtime_leases   (SQLite)         |
| host_runtime_state_log (SQLite)        |
+----------------------------------------+
```

## Module map

| Module | Responsibility |
|---|---|
| `adapter` | `BackendAdapter` trait — install/validate/spawn surface a runtime family must implement |
| `channel` | `RuntimeChannelDescriptor` types: transport kind (HTTP/Unix/stdio/gRPC), API dialects, address, readiness |
| `lease` | `RuntimeLease` — extension-scoped claim over a running process |
| `spawn` | `SpawnRuntimeRequest`, `PortAllocator` (claims `[49152, 65535]`), `validate_spawn_request`, `http_status_for` |
| `reserved_policy` | 4-tier classifier: managed-spawn-disallowed, host-injected, host-governed, extension-passthrough |
| `parameter_catalog` | Embedded 213-entry llama.cpp launch flag catalog with policy classifications |
| `installs_store` | CRUD on `host_runtime_installs`; `resolve_dependency`, `list_dependents`, `migrate_from_legacy`, `relocate_legacy_binaries` |
| `state` / `state_log` | Install state machine + transition log |
| `validator` | Smoke-runs an installed binary; produces `Installed → NeedsRepair` reconciliation transitions |
| `download` / `extract` / `checksum` | Binary acquisition primitives shared across runtime families |
| `llamacpp` | llama.cpp adapter: install pipeline, probe, channel builder, installs store |
| `tensorrt_llm` | TensorRT-LLM adapter stub (returns `ImplementationStatus::Unavailable`) |

## Key contracts

### Reserved-flag policy

Every spawn request is walked once against the parameter catalog. First collision aborts the spawn with a typed error mapped to HTTP by `http_status_for`:

| Tier | Example flag | Outcome | HTTP |
|---|---|---|---|
| managed-spawn-disallowed | `--help`, `--version` | `ManagedSpawnDisallowed` | 422 |
| host-injected | `--port`, `--host` | `ReservedLaunchSetting` | 422 |
| host-governed | `--api-key`, `--metrics` | `ReservedLaunchSetting` (default-deny; opt-in via host settings only) | 422 |
| extension-passthrough | `--ctx-size`, `--temperature` | passes through unchanged | — |
| unknown | any flag not in the catalog | passes through unchanged (catalog is advisory) | — |

### Channel descriptor

Every `RuntimeLease` carries a `RuntimeChannelDescriptor`:

```rust
RuntimeChannelDescriptor {
    kind: HttpTcp,
    api_dialects: [OpenAiCompatible, NativeLlamaServer],
    address: Tcp { host, port },
    health: Some("/health"),
    metrics: None,        // present only when host enabled it
    ready: false,         // flips true once readiness probe succeeds twice
}
```

The `ready` flag is the only thing the readiness watcher mutates after spawn; the rest is immutable for the life of the lease.

### Migration from spec 010

Pre-spec-011 databases held runtime installs in `ext_local_llm_runtime_installs`. On host startup, `migrate_from_legacy` copies rows into `host_runtime_installs` (mapping `backend → family`, `release_id → version`, `accelerator_profile → accelerator`, `install_path → install_root`, `status → state` with `ready/installed_unvalidated → installed` and `broken → needs_repair`), then renames the legacy table to `..._migrated_008`. `relocate_legacy_binaries` follows up by `fs::rename`-ing binaries from `<data>/extensions/local-llm/runtimes/...` onto `<data>/runtimes/{family}/{version}/` and rewriting `install_root` + `binary_paths`. Both operations are idempotent.

## Adding a new runtime family

1. Implement `BackendAdapter` (see `llamacpp/mod.rs` for the reference) under `crates/nexus-backend-runtimes/src/{family}/`.
2. Implement `channel_builder::build(ctx) -> RuntimeChannelDescriptor` for the family's transport.
3. Ship a launch parameter catalog at `src/assets/{family}_parameter_catalog.json`; load it via `rust-embed` analogous to `parameter_catalog::llamacpp_catalog`.
4. Register the adapter in the host's `AdapterRegistry`.
5. Declare the family in any extension that needs it via the manifest's `runtime_dependencies` list.

## Tests

```bash
cargo test -p nexus-backend-runtimes
```

33 unit tests cover the parameter catalog loader, reserved-policy classifier (per tier), state-machine transitions, port allocator (hint honoring + collision rerouting), HTTP error mapping, dependency resolver (version operators + accelerator membership), legacy row migration (field mapping, idempotency), and FS relocator (path rewriting).

## CI checks

`scripts/verify-spec-011.sh` enforces the spec 011 FR-046 / spec 012 FR-121 invariant: `nexus-backend-runtimes` must never depend on an extension crate. It runs three checks:

1. **Direct deps** — greps `Cargo.toml` for any `extension-*`, `local-llm*`, `nexus-extension*`, or `nexus-local-llm*` entries.
2. **Transitive deps** — walks `cargo metadata --no-deps` for the same pattern (requires `jq`).
3. **Workspace compiles** — `cargo check --workspace --quiet`.

Run locally:

```bash
bash scripts/verify-spec-011.sh
```

Expected output on a clean tree:

```
[INFO] Verifying zero-extension-deps invariant for nexus-backend-runtimes
[PASS] No direct extension-crate dependencies in Cargo.toml
[PASS] No extension-crate dependencies reported by cargo metadata
[INFO] Running cargo check --workspace --quiet
[PASS] cargo check --workspace succeeded
[PASS] verify-spec-011 clean
```

Exit-code contract: `0` = all checks pass; non-zero = at least one `[FAIL]` line preceded the exit. Runtime is ~5s on a warm cargo cache (well under the 10s SC-107 budget). The companion harness `scripts/test_verify-spec-011.sh` mutates `Cargo.toml` and proves the script catches regressions.

When a CI workflow is added to this repo (`.github/workflows/ci.yml` or equivalent), wire in a step that runs `bash scripts/verify-spec-011.sh`; until then this script is the local gate.
