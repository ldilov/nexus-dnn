# Implementation Plan: Backend Runtime Capability & Shared Runtime Channel

**Branch**: `011-host-runtime-pool` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-host-runtime-pool/spec.md`
**Companion artifacts**: [llamacpp-launch-parameter-catalog.json](./llamacpp-launch-parameter-catalog.json), [llamacpp-launch-parameter-catalog.md](./llamacpp-launch-parameter-catalog.md)

## Summary

Promote backend runtime management out of the `nexus-local-llm` crate into a new host-owned crate `nexus-backend-runtimes`, remove `nexus-local-llm` from the workspace entirely, and move its domain logic (chat/RAG/model routing/preset UX) into `extensions/builtin/local-llm/`. Introduce a **channel-first spawn contract**: `spawn()` returns a `RuntimeLease` carrying a `RuntimeChannelDescriptor` that tells the extension *how to talk to* the backend process (HTTP+dialect, Unix socket, stdio JSON-RPC, gRPC, or custom). Enforce a four-tier launch-policy classifier (`managed-spawn-disallowed`, `host-injected`, `host-governed`, `extension-passthrough`) against the 213-entry llama.cpp parameter catalog shipped as data; unknown upstream flags still pass through. Migrate existing `ext_local_llm_runtime_installs` rows one-shot into a host-owned `host_runtime_installs` table with binary paths preserved. Ship `/api/v1/backends/*` and deprecate `/api/v1/llm/backends/*`.

Technical approach: the existing `BackendAdapter` trait and `AdapterRegistry` already live in `nexus-local-llm` and form the correct shape — they just need their home changed and their domain touch points stripped. The install pipeline, version-manifest loader, process spawn, log pipeline, validator, resolver, detector, state enum, settings, events, and download/extract/checksum primitives all move verbatim into `nexus-backend-runtimes`. The channel abstraction is a new module (`channel.rs`) layered on top of the adapter trait: each family adapter gains a `build_channel(ctx) -> RuntimeChannelDescriptor` method. The parameter catalog is embedded via `rust-embed` from the JSON companion artifact and exposed through `get_parameter_catalog(family) -> Arc<ParameterCatalog>`. Reserved-flag enforcement is a scanner that consults the catalog plus a per-family `ReservedPolicy` and rejects collisions before spawn. Migration 008 copies `ext_local_llm_runtime_installs` → `host_runtime_installs` with explicit column mapping; the old table is renamed to surface stale writes loudly.

This is larger than spec 010's HF capability — it touches the install pipeline, the Backends UI, the Python extension worker's RPC calls that drive install, live user data via migration, and the `Cargo.toml` workspace members. It is sequenced so no commit leaves the workspace half-refactored.

## Technical Context

**Language/Version**: Rust (stable, 2024 edition) on the host; TypeScript 5.7 (strict) on the frontend; Python 3.12 in the extension worker.
**Primary Dependencies** (net-new vs. spec 010): `rust-embed 8` (already in workspace) for the catalog JSON; `tokio::process::Child` (already used). No new crates.
**Storage**: SQLite via `nexus-storage`, extended by one host migration `migrations/008_host_runtime_pool.sql` creating `host_runtime_installs`, `host_runtime_leases`, `host_runtime_state_log`, plus a deprecation rename of the old extension-scoped table.
**Testing**: `cargo test` (unit + integration); new `crates/nexus-backend-runtimes/tests/` for install/spawn/channel/migration coverage. Frontend Vitest for the new Backends top-level view. No Playwright for this spec.
**Target Platform**: Linux/macOS/Windows desktop. `MachineDescriptor::detect` moves with the rest of the runtime plumbing.
**Project Type**: Web application (Rust backend + React frontend) — Option 2 structure.
**Performance Goals**: Runtime install hydration on cold start < 100 ms (single SQL query). `get_parameter_catalog` reads from embedded JSON, decoded once into `Arc<ParameterCatalog>`. Spawn-to-`channel_ready` varies by runtime (llama.cpp cold-loads can take minutes on CPU), but `process_started` MUST fire within 500 ms of the spawn call.
**Constraints**: Zero data loss on migration. Migration MUST be idempotent. No partial-state window: the whole refactor ships or none of it — cannot have `nexus-local-llm` half-removed across commits. Python worker RPC methods continue to function throughout the transition by calling the new host routes.
**Scale/Scope**: Up to ~5 concurrent runtime leases per host. Catalog: 213 entries at P1 (llama.cpp), growing as future families ship. Single-digit families at P1.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Note |
|-----------|--------|------|
| I. Ecosystem-First | ✅ | `rust-embed` already a workspace dep, reused for catalog packing. Process supervision via `tokio::process`. No new crates. |
| II. Pure Functions, SOLID | ✅ | `BackendAdapter` trait = Strategy; `ReservedPolicy::classify(flag)` is pure; channel builder is a pure function of adapter + context. |
| III. Extendability | ✅ | New runtime families drop in by implementing `BackendAdapter` + shipping a parameter catalog JSON; zero host code change. |
| IV. Self-Documenting Code | ✅ | No inline comments. Module `//!` docs explain reserved-flag policy and migration contract. |
| V. Git-Flow Branching | ✅ | Fresh `011-host-runtime-pool` branch off clean `main`. |
| VI. Living Documentation | ✅ | Root `README.md`, `crates/nexus-backend-runtimes/README.md` (new), `extensions/builtin/local-llm/README.md` updated. |
| VII. Clean Provenance | ✅ | Parameter catalog cites `ggml-org/llama.cpp tools/server/README.md` snapshot date. |
| VIII. Memory Safety | ✅ | No `unsafe`. Typed errors via `thiserror`. `Child::kill`, not raw signals. |
| IX. Parallelism-First | ✅ | Install + validate run concurrently; reconciler runs in a background `tokio::spawn` task; catalog load is one-shot cold-start, not hot path. |
| X. Modern React Patterns | ✅ | New top-level Backends view uses `use(installsPromise)` + Suspense; install progress subscribes to existing service-worker event bus; no manual memoization. |

**Result**: PASS. Workspace-member removal of `nexus-local-llm` is a breaking structural change by design, not a deviation — called out explicitly in Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/011-host-runtime-pool/
├── plan.md                                        # This file
├── spec.md                                        # Enhanced spec
├── research.md                                    # Phase 0 output
├── data-model.md                                  # Phase 1 — schema delta
├── contracts/
│   ├── host_backends_list.http                    # GET /api/v1/backends
│   ├── host_backends_install.http                 # POST /api/v1/backends/{family}/install
│   ├── host_backends_uninstall.http               # DELETE /api/v1/backends/{installId}
│   ├── host_backends_lease.http                   # POST /api/v1/backends/{installId}/lease
│   ├── host_backends_lease_release.http           # DELETE /api/v1/backends/leases/{leaseId}
│   ├── host_backends_parameter_catalog.http       # GET /api/v1/backends/{family}/parameters
│   └── extension_manifest_runtime_deps.schema.json
├── quickstart.md                                  # QA walkthrough
├── checklists/requirements.md                     # Already in place
├── llamacpp-launch-parameter-catalog.json         # Shipped as data
├── llamacpp-launch-parameter-catalog.md           # Human-readable mirror
└── tasks.md                                       # Phase 2 (not created by /speckit.plan)
```

### Source Code (repository root)

```text
crates/
├── nexus-backend-runtimes/                        # NEW host crate
│   ├── src/
│   │   ├── lib.rs                                 # BackendRuntimeCapability trait + re-exports
│   │   ├── adapter.rs                             # MOVED from nexus-local-llm
│   │   ├── channel.rs                             # NEW: RuntimeChannelDescriptor, kinds, dialects
│   │   ├── lease.rs                               # NEW: RuntimeLease, lifecycle handle
│   │   ├── spawn.rs                               # NEW: SpawnRuntimeRequest validator + launcher
│   │   ├── reserved_policy.rs                     # NEW: 4-tier classifier
│   │   ├── parameter_catalog.rs                   # NEW: embedded JSON loader
│   │   ├── installs_store.rs                      # MOVED: host_runtime_installs CRUD
│   │   ├── state.rs                               # MOVED + explicit NeedsRepair semantics
│   │   ├── state_log.rs                           # NEW: host_runtime_state_log append
│   │   ├── validator.rs                           # MOVED: reconciler Installed -> NeedsRepair only
│   │   ├── launch_spec.rs                         # MOVED
│   │   ├── log_pipeline.rs                        # MOVED
│   │   ├── log_store.rs                           # MOVED
│   │   ├── resolver.rs                            # MOVED
│   │   ├── detect.rs                              # MOVED
│   │   ├── settings.rs                            # MOVED
│   │   ├── settings_store.rs                      # MOVED
│   │   ├── events.rs                              # MOVED + process_started / channel_ready variants
│   │   ├── download.rs                            # MOVED (non-HF HTTPS)
│   │   ├── extract.rs                             # MOVED
│   │   ├── checksum.rs                            # MOVED (retire the local-llm + huggingface duplicates)
│   │   ├── error.rs                               # MOVED + ReservedLaunchSetting variant
│   │   ├── llamacpp/
│   │   │   ├── mod.rs                             # MOVED
│   │   │   ├── install_pipeline.rs                # MOVED
│   │   │   ├── probe.rs                           # MOVED
│   │   │   └── channel_builder.rs                 # NEW: llama-server -> RuntimeChannelDescriptor
│   │   ├── tensorrt_llm/
│   │   │   └── mod.rs                             # MOVED tensorrt_llm_stub.rs
│   │   └── assets/
│   │       └── llamacpp_parameter_catalog.json    # rust-embed source
│   ├── tests/
│   │   ├── install_pipeline.rs
│   │   ├── reserved_policy.rs
│   │   ├── migration_008.rs
│   │   ├── channel_llamacpp.rs
│   │   └── parameter_catalog.rs
│   └── Cargo.toml
├── nexus-local-llm/                               # REMOVED from workspace (directory deleted)
├── nexus-api/src/
│   ├── handlers/
│   │   └── backends.rs                            # REWRITTEN: delegates to nexus-backend-runtimes
│   ├── dto/
│   │   └── runtime.rs                             # NEW: RuntimeInstallDto, RuntimeLeaseDto, RuntimeChannelDto, ParameterCatalogDto
│   └── lib.rs                                     # AppState: backend_adapter_registry typed via nexus-backend-runtimes
└── nexus-storage/                                 # unchanged

migrations/
└── 008_host_runtime_pool.sql                      # NEW

extensions/builtin/local-llm/
├── worker/
│   ├── methods/runtime.py                         # UPDATED: /api/v1/backends/* not /api/v1/llm/backends/*
│   └── domain/model_router.py                     # NEW: ModelInstaller routing moved here from nexus-local-llm
├── storage/migrations/007_routing_remains.sql     # noop migration; schema-version bump only
└── manifest.yaml                                  # NEW FIELD: runtime_dependencies

apps/web/src/
├── api/
│   ├── client.ts                                  # UPDATED: fetchRuntimes / installRuntime / uninstallRuntime / getParameterCatalog
│   └── generated/
│       ├── RuntimeInstallDto.ts                   # ts-rs generated
│       ├── RuntimeLeaseDto.ts
│       ├── RuntimeChannelDto.ts
│       └── ParameterCatalogDto.ts
├── layout/shell.tsx                               # NEW nav slot: "Backends" top-level
└── views/backends_view.tsx                        # REWRITTEN: calls /api/v1/backends
```

**Structure Decision**: Option 2 — web application. **One new host crate `nexus-backend-runtimes`** owns all runtime plumbing. **`nexus-local-llm` is removed from workspace members.** Its domain logic moves into `extensions/builtin/local-llm/` — preferably into the Python worker, or a new extension-scoped Rust lib if the GGUF-header-read ergonomics force it. `/api/v1/llm/backends/*` deprecated in favor of `/api/v1/backends/*`. Frontend Backends view lifts from the local-llm drawer to top-level host navigation.

## Approach Per User Story

### US1 — Install llama.cpp once, use from multiple extensions (P1)

**Current state**: `ext_local_llm_runtime_installs` is extension-namespaced; binary lives under a local-llm-scoped path.

**Approach**:

1. Create `host_runtime_installs` owned by `nexus-backend-runtimes`. Schema mirrors the current table (see data-model.md) with no extension foreign key — runtimes are not extension-scoped.
2. Relocate install root from `<data_dir>/extensions/local-llm/runtimes/...` → `<data_dir>/runtimes/{family}/{version}/`. Migration 008 handles filesystem move + row copy; paths stored as absolute strings.
3. Extensions declare `runtime_dependencies: [{ family: "llama.cpp", version: ">=b4000", acceleration: ["cpu","cuda12","cuda13"] }]` in `manifest.yaml`. At extension-enable time, the host resolves the declaration against `host_runtime_installs` and refuses to enable if unmet, with a clear error pointing to the Backends panel.
4. `list_dependents(install_id)` returns every enabled extension declaring a dependency. Uninstall either blocks ("llama.cpp is in use by: …") or drains active leases after explicit user confirmation.

**Automated verification**: `tests/multi_consumer.rs::two_extensions_share_one_install` — fixture installs llama.cpp, enables two declaring extensions, asserts one row + zero extra bytes.

### US2 — `nexus-local-llm` removed; extension owns domain logic (P1)

**Approach**, sequenced so no commit leaves the workspace half-refactored:

1. Create empty `crates/nexus-backend-runtimes` with module skeletons (Phase 0 resolves exact module list).
2. Move files verbatim from `nexus-local-llm` (see Project Structure). Each move updates `mod` + `use` statements mechanically.
3. Update callers: `nexus-api`, `nexus-core`, `extensions/builtin/local-llm/worker/` replace `use nexus_local_llm::*` with `use nexus_backend_runtimes::*`. Type signatures stay identical this pass.
4. Extract domain code the spec-010 chunk-3 overreach lodged in `nexus-local-llm/src/manifest/install_models.rs` (`ModelInstaller` + `route_backend`) into `extensions/builtin/local-llm/`. Python worker is preferred; new extension-scoped Rust lib is the fallback if GGUF-header parsing is awkward in Python (Phase 0 decides).
5. Remove `crates/nexus-local-llm` from `Cargo.toml` workspace members. Delete the directory. Verify `cargo check --workspace` green.
6. Grep guard: `grep -r "nexus_local_llm\|nexus-local-llm" crates/ extensions/` returns zero hits outside docs.

**Automated verification**: `cargo tree -p nexus-backend-runtimes` has no extension-crate edges; workspace builds without `nexus-local-llm`; grep pattern returns zero via a `scripts/verify-spec-011.sh` check.

### US3 — Spawn returns a communication channel (P1)

**Approach**:

1. New types in `channel.rs`:
   ```rust
   pub struct RuntimeChannelDescriptor {
       pub kind: RuntimeChannelKind,
       pub api_dialects: Vec<ApiDialect>,
       pub address: RuntimeAddress,
       pub health: Option<RuntimeEndpoint>,
       pub metrics: Option<RuntimeEndpoint>,
       pub ready: bool,
   }
   pub enum RuntimeChannelKind { HttpTcp, HttpUnixSocket, StdioJsonRpc, GrpcTcp, CustomNative(String) }
   pub enum ApiDialect { OpenAiCompatible, AnthropicMessagesCompatible, NativeLlamaServer, Custom(String) }
   pub enum RuntimeAddress { Tcp { host: String, port: u16 }, UnixSocket(PathBuf), Stdio, Custom(String) }
   ```
2. Extend `BackendAdapter` trait with `fn build_channel(&self, ctx: &ChannelBuildCtx) -> RuntimeChannelDescriptor`. `ChannelBuildCtx` carries allocated port, bind address, family-specific metadata (e.g., whether `--jinja` was set).
3. llama.cpp channel builder returns:
   ```rust
   RuntimeChannelDescriptor {
       kind: RuntimeChannelKind::HttpTcp,
       api_dialects: vec![ApiDialect::OpenAiCompatible, ApiDialect::NativeLlamaServer],
       address: RuntimeAddress::Tcp { host, port },
       health: Some(RuntimeEndpoint::path("/health")),
       metrics: ctx.metrics_enabled.then(|| RuntimeEndpoint::path("/metrics")),
       ready: false,
   }
   ```
4. Readiness distinction (FR-015): `spawn()` emits `RuntimeEvent::ProcessStarted` within 500 ms of `tokio::process::Command::spawn`; a background task polls the health endpoint and emits `RuntimeEvent::ChannelReady` when it returns 200 twice consecutively 500 ms apart. Extensions receive events via the existing event bus.
5. Invalidation (FR-020): on `ProcessExited` or `ProcessWithdrawn`, `channel.ready` flips to false and the event propagates; the extension drains in-flight requests.

**Automated verification**: `tests/channel_llamacpp.rs` — spawn a mock llama-server that takes 2 s to bind; assert `ProcessStarted` fires immediately and `ChannelReady` ~2 s later. Kill the process; assert `ProcessExited` + channel invalidation.

### US4 — Generic spawn passthrough with explicit host-owned overrides (P1)

**Approach**:

1. `SpawnRuntimeRequest`:
   ```rust
   pub struct SpawnRuntimeRequest {
       pub extension_id: String,
       pub family: RuntimeFamilyId,
       pub version_req: Option<String>,
       pub accelerator: AcceleratorProfile,
       pub args: Vec<String>,                        // raw passthrough
       pub env: BTreeMap<String, String>,            // raw passthrough
       pub port_hint: Option<u16>,
       pub bind_mode: RuntimeBindMode,               // typed, host-owned
   }
   pub enum RuntimeBindMode { Loopback, LoopbackOnly, UnixSocket, Any }
   ```
2. `ReservedPolicy` scanner:
   - Consults the parameter catalog for the family.
   - Walks `args` + `env` once.
   - Classifies each: `managed-spawn-disallowed` / `host-injected` / `host-governed` / `extension-passthrough` / `unknown`.
   - `managed-spawn-disallowed` → `SpawnError::ManagedSpawnDisallowed(flag)`.
   - `host-injected` (`--port`, `--host`, `--reuse-port`) → `SpawnError::ReservedLaunchSetting(flag)`. Host supplies these from `RuntimeBindMode` + port allocator.
   - `host-governed` (`--api-key`, `--ssl-*`, `--webui-mcp-proxy`, `--tools`, `--metrics`, `--props`, `--slots`, `--media-path`, `--path`, `--log-*`) → per-family `HostPolicy`; default-deny, opt-in via typed host settings never raw argv.
   - `extension-passthrough` + `unknown` → forward verbatim. **Unknown is not a reject** (FR-027, FR-037).
3. Port allocation: `PortAllocator` picks next free port in `[49152, 65535]` on collision; final port written into `RuntimeChannelDescriptor`.
4. Env merging: host injects `LLAMA_ARG_HOST`, `LLAMA_ARG_PORT`, log sink paths after extension env; host injection always wins; scanner rejects collisions before injection runs.

**Automated verification**: `tests/reserved_policy.rs` — table-driven; at least one flag per tier per family; ≥ 3 "unknown" flags that must pass through. `tests/spawn_enforcement.rs` — request `--port 9999` expect `ReservedLaunchSetting`; omit port expect allocator output in returned lease.

### US5 — llama.cpp launch settings catalogued without freezing the host API (P2)

**Approach**:

1. Embed `llamacpp-launch-parameter-catalog.json` via `rust-embed`. Decode once at startup into `Arc<ParameterCatalog>`; cache in a static `OnceCell`.
2. `ParameterCatalog` shape mirrors the JSON:
   ```rust
   pub struct ParameterCatalog {
       pub family: String,
       pub snapshot_date: String,
       pub upstream_source: String,
       pub entries: Vec<ParameterCatalogEntry>,
       by_flag: HashMap<String, usize>,  // private index built at load
   }
   pub struct ParameterCatalogEntry {
       pub section: String,
       pub flags: Vec<String>,
       pub policy: ParameterPolicy,       // enum matching the 4 tiers
       pub summary: String,
       pub default: Option<String>,
       pub allowed_values: Option<String>,
       pub env_vars: Vec<String>,
       pub notes: Vec<String>,
       pub security_gated: bool,
   }
   ```
3. Exposed via `BackendRuntimeCapability::get_parameter_catalog(family) -> Arc<ParameterCatalog>`. REST: `GET /api/v1/backends/{family}/parameters` returns `ParameterCatalogDto`.
4. Non-normative: `ReservedPolicy::classify(flag)` falls through to `extension-passthrough` when the flag is absent from the catalog — the catalog is advisory (FR-037, SC-007).
5. Versioning: catalog carries `snapshot_date`; adapter's `catalog_version()` returns `"llama.cpp@2026-04-15"`. Upstream refreshes land as new JSON + version bump.

**Automated verification**: `tests/parameter_catalog.rs` — load shipped catalog, assert entry count = `total_entries` (213), assert `--port` is `host-injected`, assert `--novel-future-flag` classifies `extension-passthrough`.

### US6 — Clean migration from extension-scoped runtime state (P2)

**Approach**:

1. Migration 008 creates `host_runtime_installs`, `host_runtime_leases`, `host_runtime_state_log`. See [data-model.md](./data-model.md) for the SQL.
2. One-shot copy from `ext_local_llm_runtime_installs` with explicit column mapping. State mapping: `ready → installed`, `installed_unvalidated → installed`, `broken → needs_repair`.
3. Filesystem relocation: binaries move from `<data_dir>/extensions/local-llm/runtimes/...` to `<data_dir>/runtimes/{family}/{version}/...` by `nexus-backend-runtimes` on first start after 008 runs, if rows with old path prefix are detected. One-shot, idempotent; `host_runtime_installs.install_root` rewritten in-place.
4. Old table renamed: `ext_local_llm_runtime_installs` → `ext_local_llm_runtime_installs_migrated_008` so stray writes fail loudly rather than silently splitting state.
5. Idempotency: migration checks for the rename before doing anything. If the new table already has rows and the rename is complete, it no-ops.

**Automated verification**: `tests/migration_008.rs` — three fixtures:
- (a) fresh DB, no old table → `host_runtime_installs` exists, empty
- (b) one row in old table → migration runs, exactly one row in new table with correct mapping, old table renamed
- (c) migration already applied → re-running is a no-op; row count stable

## Complexity Tracking

| Violation / trade-off | Why needed | Simpler alternative rejected because |
|---|---|---|
| Removing `nexus-local-llm` from workspace members | The crate's name is a lie — it's 95% runtime plumbing. Leaving it perpetuates the extension-scoped runtime assumption for any future consumer. | Renaming in place was considered; rejected because git history becomes harder to follow and the old name remains as a cognitive tripwire. Delete + new crate is cleaner. |
| Moving `ModelInstaller` routing into the extension's Python worker | Domain logic belongs to the extension. The Rust ModelInstaller in the host crate was a spec-010 chunk-3 overreach this spec corrects. | Keeping it as a new extension-scoped Rust lib is an acceptable fallback if Python GGUF-header ergonomics are unpleasant. Phase 0 picks. |
| Filesystem relocation during migration 008 | Runtimes moving from extension-scoped paths to host-scoped paths is the whole point. Leaving binaries in old paths carries a "legacy path" flag forever. | Symlink compatibility shim considered; rejected because the legacy structure remains observable forever, and Windows lacks unelevated symlinks. Flat move is idempotent. |
| Top-level Backends view in the frontend | Runtimes are no longer extension-scoped; putting install UI in one extension's drawer is semantically wrong. | Keeping the Backends UI inside the local-llm drawer was considered; rejected because when a second extension declares the same runtime dependency, the user has to go to extension A to manage runtimes extension B depends on. Hostile discoverability. |
| Embedding the catalog as JSON (not a typed Rust const) | 213 entries; typed consts would be a wall of code painful to diff on upstream updates. JSON is data; Rust is code. | Rust const considered for compile-time type safety; rejected because the catalog is advisory and compile-time validation provides no runtime benefit. Policy enum discriminant is validated at load time. |

## Phase 0 — Research Topics

Research is tracked in [research.md](./research.md) (to be generated next). Open questions:

1. **Domain move target**: Python worker vs. new extension-scoped Rust lib for `ModelInstaller`. Evaluate GGUF-header parsing ergonomics. Initial recommendation: Python worker using `huggingface_hub`'s GGUF metadata reader.
2. **Reconciler frequency**: today frontend triggers probes via `useEffect`. Proposed: a single host-level `tokio::spawn` task running a presence check every 60 s per install. Debatable; could be filesystem-watch driven.
3. **Lease persistence**: `host_runtime_leases` persists across host restart, but live processes don't. Decide: (a) never persist (in-memory only), (b) persist but mark all `released` on startup, (c) persist + offer "resume after crash". Default: (b).
4. **Frontend nav slot for the new Backends view**: top-level route `/backends` or top-bar tab? Depends on the existing `TopBar`/`Sidebar` shape.
5. **Extension manifest schema bump**: adding `runtime_dependencies:` — does this require a spec-version bump? Check `crates/nexus-extension/src/manifest.rs`.
6. **tensorrt-llm stub parity**: decide whether to leave pure stub or wire at least version-manifest parsing.
7. **Deprecation window for `/api/v1/llm/backends/*`**: 410 Gone immediately vs. dual-route with `Deprecation` header for one release. Default: dual-route + deprecation header + log warning.

## Phase 1 — Design Artifacts

Produced by this command:

- [data-model.md](./data-model.md) — migration 008 schema + entity relationships + state-transition diagram.
- [contracts/](./contracts/) — 6 `.http` contract examples + extension manifest JSON schema delta for `runtime_dependencies`.
- [quickstart.md](./quickstart.md) — QA walk-through: fresh install, migration from spec-010 DB, multi-extension share, reserved-flag rejection, channel readiness, upgrade-with-running-process.

Agent context update: `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude`.

## Re-evaluation after Phase 1

All gates remain satisfied after design. The refactor is structural; principles I–X hold. Migration + filesystem relocation is the single highest implementation risk. Phase 0 research explicitly owns the partial-migration detection question.

**Result**: PASS. Proceed to `/speckit.tasks` next.

## Implementation Sequencing

For tasks.md, the dependency order:

1. **Foundational** — empty `nexus-backend-runtimes` crate; migration 008; parameter catalog loader.
2. **Move, then rename** — file-move all runtime plumbing from `nexus-local-llm` into `nexus-backend-runtimes` (verbatim, paths adjusted). Verify `cargo check` green.
3. **Extract domain** — move `ModelInstaller` + routing into the extension. Verify `cargo check` green.
4. **New contract surfaces** — `channel.rs`, `lease.rs`, `spawn.rs`, `reserved_policy.rs`. Tests green.
5. **Migration** — 008 runner + filesystem relocation. Migration test matrix passes.
6. **API surface** — host routes `/api/v1/backends/*`; dual-route old family with `Deprecation` header; regenerate TS DTOs.
7. **Frontend lift** — new top-level Backends view; extension-drawer entry removed or thinly wrapped.
8. **Remove crate** — delete `crates/nexus-local-llm`; drop from workspace members; workspace builds.
9. **Polish** — tracing spans, parameter catalog endpoint live, extension manifest schema bump, docs.

Each phase is a green-building commit to preserve bisectability. No commit leaves the workspace half-moved.
