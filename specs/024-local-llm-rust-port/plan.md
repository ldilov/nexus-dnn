# Implementation Plan: Local LLM Extension — Rust Port (Subprocess Orchestration)

**Branch**: `024-local-llm-rust-port` | **Date**: 2026-04-18 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/024-local-llm-rust-port/spec.md`

## Summary

Replace the CPython sidecar worker for `nexus.local-llm` with a compiled Rust sidecar worker that speaks the existing JSON-RPC-over-stdio protocol. Extension responsibilities shrink to: (1) **acquiring and holding `RuntimeLease`s** against host-supervised `llama-server` children, (2) proxying OpenAI-compatible calls to the leased child's `channel.base_url`, (3) chat/RAG session state, (4) emitting the same Operators/Methods/UI/recipes/workflows the Python extension emits. llama.cpp binary installation, variant management, model store, HuggingFace download, GGUF metadata parsing, **and the `llama-server` process lifecycle itself** are host responsibilities exposed via `host.runtimes.*` / `host.models.*` APIs. The generalized architectural rule is *spawn ownership follows registration ownership* — future extensions shipping their own private runtimes (e.g., a VLLM extension with embedded Python) spawn those themselves; universal host-registered runtimes are host-spawned and shareable across extensions via refcounted leases. Zero Python in the shipped bundle. Frontend unchanged.

## Technical Context

**Language/Version**: Rust 1.84 (workspace MSRV, per existing crates).
**Primary Dependencies**:
- `tokio` 1.x (async runtime, process, I/O)
- `reqwest` (rustls-tls, `stream` feature — SSE / chunked bodies)
- `eventsource-stream` or thin hand-rolled SSE parser (SSE re-emission)
- `serde` / `serde_json` (JSON-RPC + payloads)
- `tracing` + `tracing-subscriber` (structured logs per FR-028)
- `thiserror` (typed errors per constitution VII)
- `anyhow` (extension binary top-level only)
- Workspace re-use: `nexus-protocol` (JSON-RPC transport, `RuntimeFamily::Native`, `ModelDependency`, `Quantization`), `nexus-extension` (manifest parse, Operator/Method, UI, recipe, storage contribution), `nexus-storage` (SQLite pool), `nexus-backend-runtimes` (consumes its resolver / launch-spec / lease APIs over IPC; does NOT link spawn-internals), `nexus-models-store` (same — consumed via IPC, not linked).
**Storage**: SQLite via `nexus-storage`; migrations `001`..`005` reused unchanged (frozen contract per spec Assumptions). No new migrations in v1.
**Testing**: `cargo test` per-crate (unit), workspace-level integration tests in `crates/nexus-local-llm-worker/tests/`, contract tests under `specs/024-local-llm-rust-port/contracts/tests/` executed against a fake host harness. 80% coverage target (constitution VI); 100% coverage on the lease state machine (SC-010) — post-Q1 pivot the extension is a lease consumer, not a process supervisor.
**Target Platform**: Windows x86_64 (primary), Linux x86_64 (secondary). macOS out of v1.
**Project Type**: Desktop-app extension — sidecar binary launched by the host over stdio.
**Performance Goals**: Chat first-token latency within 10 ms p95 of Python baseline (SC-008); zero-orphan shutdown (SC-006); crash detection ≤ 2 s (SC-005).
**Constraints**: Worker cold start ≤ Python baseline (SC-002); Rust worker binary + static deps ≤ 20 MB per OS (within the 60 MB bundle budget, SC-004); no Python runtime in artifact (SC-001).
**Scale/Scope**: Single-user desktop. Concurrent children bounded by pool cap (default 2). Concurrent chat turns bounded by `llama-server --parallel`. Single-digit MB in-memory footprint for the worker itself.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Status | Notes |
|---|---|---|---|
| I | Ecosystem-First | **PASS** | All non-trivial utilities delegated to ecosystem crates (tokio, reqwest, tracing, serde, thiserror). No hand-rolled HTTP/process/logging. |
| II | SOLID + classical | **PASS** | Strategy for supervisor backends; Command for Operator handlers; RAII for child processes and port leases; pure functions for payload transforms; CQS enforced (spawn vs query split). |
| III | Modularity + small crates | **PASS** | New crate `nexus-local-llm-worker` under `crates/`. Modules split by concern: `lease_client`, `pool/`, `proxy/`, `operators/`, `methods/`, `host_rpc/`, `notifications/`, `migration/`. No single module > 800 LOC target. |
| IV | Self-documenting code | **PASS** | Zero inline comments in production code; `///` on public items only; `// SAFETY:` only if `unsafe` is introduced (goal: none). |
| V | Extendability via adapter contracts | **PASS** | Supervisor is a `RuntimeSupervisor` trait so a future `whisper-cpp` or `stable-diffusion-cpp` extension can reuse 80% of the pool/proxy machinery. Runtime codename is not hardcoded (FR-007). |
| VI | Test-first | **PASS** | Contract tests frozen in Phase 1; unit tests for each module; lease state machine tests exhaustive per SC-010. |
| VII | Memory + type safety | **PASS** | No `unsafe`. Newtypes for `RuntimeId`, `ModelId`, `LeaseId`, `Port`, `ChildPid`, `VariantCodename`. `thiserror` in the crate; `anyhow` only in `main.rs`. RAII guards for child processes (`kill_on_drop(true)`) and port bindings. |
| VIII | Living docs | **PASS** | `crates/nexus-local-llm-worker/README.md` + `extensions/builtin/local-llm/README.md` rewritten; root `README.md` updated when the new crate lands. |
| IX | Git-flow + bisectable | **PASS** | Branch `024-local-llm-rust-port`. Each task commit keeps `cargo check --workspace` green. |
| X | Parallelism-first | **PASS** | Supervisor health probes, download tasks, log drains, and HTTP proxies run on independent `tokio::spawn` tasks. Pool evictions and new spawns proceed concurrently where keys differ. |
| XI | Rust idioms + anti-patterns | **PASS** | `#[non_exhaustive]` on public enums; builders for `ChildLaunchConfig`; borrowed arg types (`&Path`, `&str`) everywhere non-owning; iterator/combinator form for payload mapping; no `.clone()` for borrow-checker reasons. |
| XII | Web frontend architecture | **N/A** | No frontend changes in this spec (SC-007 enforces zero-delta). |

Additional architectural constraints:
- **Storage**: migrations append-only — reusing `001..005`. If a v1.x patch surfaces a gap, it goes as `006_*`.
- **Process supervision**: `tokio::process::Command` with `kill_on_drop(true)` (constitution § Architectural Constraints).
- **Transport**: extension ↔ host uses existing JSON-RPC-over-stdio (`nexus-protocol::StdioTransport`); extension ↔ `llama-server` uses loopback HTTP/1.1 and SSE.

No violations. Complexity Tracking section below remains empty.

## Project Structure

### Documentation (this feature)

```text
specs/024-local-llm-rust-port/
├── plan.md              # This file
├── research.md          # Phase 0 — resolved unknowns + alignment with existing nexus-backend-runtimes
├── data-model.md        # Phase 1 — entities + state machines
├── quickstart.md        # Phase 1 — build + run + dev loop
├── contracts/
│   ├── host-apis.md            # Host APIs this extension consumes
│   ├── operators.md            # Operators this extension exposes
│   ├── methods.md              # JSON-RPC methods this extension exposes
│   ├── events.md               # Events this extension emits
│   └── tests/                  # contract test fixtures + snapshot payloads
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output — created by /speckit-tasks, NOT here
```

### Source Code (repository root)

```text
crates/
├── nexus-local-llm-worker/          # NEW — sidecar binary + its library half
│   ├── Cargo.toml
│   ├── README.md
│   ├── src/
│   │   ├── main.rs                  # binary entrypoint — anyhow at top, calls lib::run()
│   │   ├── lib.rs                   # crate public API used by tests and main.rs
│   │   ├── ids.rs                   # newtypes: RuntimeId, ModelId, LeaseId, VariantCodename, ChildPid, Port
│   │   ├── errors.rs                # thiserror WorkerError enum (BackendUnavailable, ModelMissing, ...)
│   │   ├── resolver_client.rs       # JSON-RPC client over host transport: host.models.*, host.runtimes.*
│   │   ├── lease_client/
│   │   │   ├── mod.rs               # LeaseClient — acquire / release / observe
│   │   │   ├── state_stream.rs      # subscribe to host-pushed backend.state events per lease
│   │   │   └── guard.rs             # LeaseGuard (RAII — releases on drop)
│   │   ├── pool/
│   │   │   ├── mod.rs               # RuntimePool keyed by (variant, model_id), slots hold LeaseGuards
│   │   │   ├── key.rs               # PoolKey newtype + Hash/Eq
│   │   │   ├── lru.rs               # idle eviction + LRU ordering
│   │   │   └── config.rs            # cap + idle_timeout (host-settings sourced)
│   │   ├── proxy/
│   │   │   ├── mod.rs               # OpenAI-compat HTTP proxy
│   │   │   ├── chat.rs              # /v1/chat/completions + SSE forwarding
│   │   │   ├── embeddings.rs        # /v1/embeddings
│   │   │   └── health.rs            # passthrough /health for UI inspector
│   │   ├── operators/
│   │   │   ├── mod.rs
│   │   │   ├── chat_turn.rs         # llm.chat.turn
│   │   │   ├── prompt_compose.rs    # llm.prompt.compose
│   │   │   ├── output_persist.rs    # llm.output.persist
│   │   │   ├── embed_text.rs        # llm.embed.text
│   │   │   └── rag_retrieve.rs      # llm.rag.retrieve
│   │   ├── methods/
│   │   │   ├── mod.rs
│   │   │   ├── backend_logs.rs      # backend.logs.tail
│   │   │   ├── backend_state.rs     # backend.state.get / observe
│   │   │   └── pool_inspect.rs      # pool.list (debug/inspector only)
│   │   ├── storage/
│   │   │   ├── mod.rs               # chat sessions, RAG tables (reuses extension SQL pool)
│   │   │   └── queries.rs
│   │   ├── migration/
│   │   │   └── v0_python_to_v1_rust.rs  # one-shot discover+register legacy paths
│   │   ├── events.rs                # backend.state / backend.crashed / backend.hung
│   │   └── config.rs                # worker config from host settings
│   └── tests/
│       ├── lease_lifecycle.rs              # acquire → state stream → release; drop-releases invariant
│       ├── pool_lifecycle.rs               # LRU, idle evict, cap enforcement
│       ├── proxy_streaming.rs              # SSE fan-in → Operator event fan-out
│       ├── migration_legacy_paths.rs
│       └── contract_host_apis.rs           # against a fake resolver harness
│
└── (other host crates unchanged)

extensions/builtin/local-llm/
├── manifest.yaml                    # EDITED — runtime.family → native, entrypoint → worker binary, python_version removed
├── worker/                          # DELETED in this spec (see Migration section of this plan)
├── backends/                        # DELETED
├── operators/, recipes/, ui/, storage/, workflows/   # UNCHANGED — extension-declared YAML stays authoritative
└── README.md                        # REWRITTEN to describe Rust sidecar
```

**Structure Decision**: Single new workspace crate `crates/nexus-local-llm-worker/` producing a single sidecar binary. The extension's declarative YAML (manifest, operators, recipes, UI contributions, workflows, SQL migrations) remains **in place and unchanged** — only the compiled-worker half moves from Python to Rust.

Why a dedicated crate (not folded into `nexus-backend-runtimes` or `nexus-extension`):
- **Constitution III / V** — the extension is a *consumer* of those host crates, not an internal module of them. Putting extension worker code in a host crate would invert the dependency direction.
- **Constitution V / FR-005** — the decoupling principle means the extension must not reach into host internals (resolver, installer, spawn). It can only call them via the JSON-RPC bridge. A separate crate enforces that boundary at the module-graph level.
- **Single-binary artifact** — builtin extensions ship as sibling binaries next to the host, co-distributed in the same installer.

## Phase 0 — Research & Open Questions

Artifact: [research.md](research.md)

Research topics, each framed as *Decision + Rationale + Alternatives*:

1. **Reconcile spec Q1 with existing `nexus-backend-runtimes` infrastructure.** The host already has `LaunchSpec`, `RuntimeLease`, `RuntimeChannelDescriptor`, and `spawn/supervise.rs`. The spec's Q1 answer put spawning in the extension, but the existing code implies the *host* can spawn and hand the extension a lease+channel. Research task: determine which split is actually in play today in the Python extension's consumption of these APIs, and choose one of: (a) keep spec's extension-supervises stance, extend the host's resolver to return a raw `LaunchSpec` that the extension executes; (b) pivot to extension-consumes-lease, delete supervisor code from extension. Decision required before supervisor/ modules are written.

2. **SSE parsing choice** — `eventsource-stream` vs hand-rolled. `eventsource-stream` is maintained and correct; a 40-LOC hand parser suffices for `llama-server`'s shape. Pick one with explicit rationale.

3. **Port discovery mechanism** — parse `llama-server`'s startup log line (`main: HTTP server listening on 127.0.0.1:PORT`) vs pass `--port 0` and read the chosen port from an explicit handshake. Current llama.cpp prints the port to stderr in a stable line; parse-then-probe is viable. Alternative: use an OS-assigned port via a unix-socket/pipe (non-portable on Windows). Decide.

3b. **Graceful-shutdown verb for `llama-server`** — does the upstream build expose a `/shutdown` endpoint in the variants we consume, or is `SIGTERM`/`TerminateProcess` the only lever? Spec FR-015 assumes the first is preferred. Verify against upstream `llama-server` flags per variant-set.

4. **Migration source-of-truth discovery** — legacy Python extension stored variant installs under `~/.nexus/local-llm/llamacpp/<variant>/<build-tag>/bin/`. Does the current `nexus-backend-runtimes::runtime_installs_store` already index these, or does the extension need to scan the filesystem on first launch? Decide the migration routine's data source.

5. **User preference persistence for runtime variant** — spec FR-007 requires "explicit user preference → capability match → any healthy." Where is user preference stored: extension's SQL (extension-scoped), or host's user-settings (cross-extension)? Prefer host settings for uniformity.

6. **GGUF metadata fields required by `llama-server` launch** — spec FR-023 requires metadata come from the host's Model Store, not from extension-side GGUF parsing. Enumerate the exact fields `llama-server` needs at spawn time (context length, chat template, tokenizer hints) so the host contract can be validated as complete.

7. **Chat-turn cancellation semantics** — is `llama-server` capable of aborting an in-flight generation slot mid-stream via an HTTP signal, or do we drop the SSE connection and rely on server-side idle detection? Spec FR-018 requires ≤ 200 ms cancel.

8. **Sidecar protocol version** — does the existing `nexus-protocol::StdioTransport` need any new message types to support the resolver-client calls (`host.models.*`, `host.runtimes.*`), or do those ride on the existing JSON-RPC `call_method` surface? If new, version bump required.

9. **`tokio` feature surface** — enumerate the exact feature flags we need (`rt-multi-thread`, `macros`, `process`, `io-util`, `fs`, `net`, `time`, `sync`, `signal`) to avoid pulling the whole `full` feature and bloating binary size past SC-004.

10. **Windows child-process graceful stop** — on Windows, `SIGTERM` doesn't exist; we need `GenerateConsoleCtrlEvent` or `TerminateProcess`. Pick the library (`shared_child`, or direct `windows-sys`) and verify behaviour under admin and non-admin shells.

**Output**: `research.md` with each item resolved before any `supervisor/` code is written.

## Phase 1 — Design & Contracts

Artifacts:

- [data-model.md](data-model.md) — all entities and state machines:
  - `Model` (host-owned, consumed via host API) — fields per spec Key Entities
  - `BackendRuntime` (host-owned, consumed via host API) — fields per spec Key Entities
  - `RuntimeChild` (extension-owned) — state machine: `Spawning → Loading → Ready → Draining → Stopped`; side transitions to `Crashed`, `Hung`, `Evicted`
  - `RuntimePool` (extension-owned) — key, cap, idle timeout, LRU order, eviction policy
  - `ChatSession` / `RagCorpus` (unchanged schema, documented here for completeness)
  - `UserRuntimePreference` (optional; location decided in research #5)
  - `MigrationMarker` (extension-local file + row)
- [contracts/host-apis.md](contracts/host-apis.md) — every host API the extension calls, with JSON-RPC method name, request shape, response shape, error codes. Frozen for this spec.
- [contracts/operators.md](contracts/operators.md) — five Operators with request/response/event shapes. Frozen; byte-identical to Python where spec allows.
- [contracts/methods.md](contracts/methods.md) — Methods this extension exposes (`backend.logs.tail`, `backend.state.get`, `backend.state.observe`, `pool.list`). Newly documented since the Python worker's equivalents were not explicitly contracted.
- [contracts/events.md](contracts/events.md) — `backend.state`, `backend.crashed`, `backend.hung`, `backend.log_line`, `pool.evicted`, `model.removed` (consumed), plus Operator-scoped `chunk`/`done`/`error`.
- [contracts/tests/](contracts/tests/) — fixture JSON payloads for every contract entry. These drive the contract tests in `crates/nexus-local-llm-worker/tests/contract_*`.
- [quickstart.md](quickstart.md) — how to build the worker, plug it into a local dev host, load a model, and run a chat turn end-to-end; also the migration-from-Python story for contributors.

Agent context update: run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` after artifacts are written so `CLAUDE.md` reflects the new crate.

Re-evaluate Constitution Check post-design: no violations expected; re-check will be noted in research.md closure.

## Migration Plan (developer-side — distinct from user-data migration in spec FR-006)

1. **Phase A — parallel build.** New Rust crate lands, Python worker remains shipping in the same release. Extension manifest still points to Python. Rust worker is buildable and has passing unit/contract tests but is dark-launched.
2. **Phase B — manifest flip on a staging channel.** Release channel toggles `runtime.family: native` and swaps the entrypoint. Beta users exercise the Rust worker. Rollback = flip the manifest back.
3. **Phase C — cut-over.** Manifest flip reaches stable. Python tree (`extensions/builtin/local-llm/worker/`, `backends/`, `chat/`, `models/`, `rag/`, `operators/`, `methods/`, `state.py`) deleted in a follow-up PR after one minor release of Rust stability. A `docs(local-llm): remove python worker` commit handles the deletion.
4. **Rollback window**: Phase B / early Phase C rollbacks retain user data (SC-003) because SQL schema + data dir layout are unchanged. Phase C-final has no rollback — deletion is permanent.

## Test Strategy

- **Unit** (`crates/nexus-local-llm-worker/tests/` and module-level `#[cfg(test)]`):
  - Lease lifecycle — acquire → hold → state-stream consumption → release; `LeaseGuard::drop` always releases (SC-010 applies to this state machine)
  - Pool LRU + idle eviction — deterministic under fake clock; eviction triggers `release_lease`
  - Proxy SSE — stream of chunks reconstructs correct Operator events; drop-to-cancel forwards the connection drop to the leased runtime
  - Resolver client — fake host harness returns canned `host.models.*` / `host.runtimes.*` responses
  - Migration — synthetic legacy paths + expected `register_existing` calls
- **Contract** (driven from `contracts/tests/` fixtures):
  - One test per host-API call shape (consumer-side): `host.models.*`, `host.runtimes.acquire_lease`, `release_lease`, `host.settings.*`
  - One test per exposed Operator payload shape
  - One test per exposed Method payload shape
  - One test per emitted / consumed event payload shape (including host-pushed `backend.state`, `model.removed`, `runtime.removed`, `host.shutdown`)
- **Integration** (against a real host running a real `llama-server` behind a lease):
  - End-to-end chat — acquire lease, issue chat turn, verify streaming, release. Gated behind a feature flag so GPU-less CI can skip.
  - Lease-release hygiene — acquire N leases, kill the worker process, host-side refcount returns to zero within deadline.
  - Host-pushed `backend.crashed` propagation — host simulates a child crash on a held lease; worker surfaces `BackendUnavailable` on in-flight Operator within 2 s (SC-005).

**No carve-out needed** — this is backend code, not design-heavy UI. Constitution VI strict test-first applies.

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Host lease API gaps for llama.cpp-specific settings (n_gpu_layers, chat template, parallelism) | Medium | Extension cannot exercise all spawn-time knobs | Settings-override field in `acquire_lease` request; research #6 enumerates required fields; gap becomes a host-spec follow-up if discovered during integration. |
| Contract drift from Python baseline | Medium | Frontend regression | Snapshot tests freeze Python output on a set of canonical inputs before the Rust path is enabled. |
| Lease leak — worker crashes without releasing | Medium | Orphan children (violates SC-006) on host side | Host already enforces `kill_on_drop` + stdio-EOF teardown; extension-side `LeaseGuard` Drop impl releases synchronously. Integration test asserts refcount returns to zero after worker kill. |
| GGUF metadata gaps from host API | Medium | Silent wrong-output bug | Research #6 enumerates required fields; extension fails fast with `ModelMetadataIncomplete` per FR-023. |
| Binary size bloat past SC-004 | Low | Fails success criterion | `cargo-bloat` in CI once the crate compiles; minimal tokio features (Research #9). |
| llama-server upstream API break between variants | Low | Breaks proxy | Contract tests against a pinned upstream b-tag; version-specific flag compatibility layer if needed (flag compat lives host-side since launch_spec is host-owned). |
| Cross-extension lease contention (two extensions want llama.cpp + same model, different settings) | Low | Request stalls | Host owns the shared-vs-new-child decision; extension waits on `acquire_lease` with a bounded timeout and surfaces `BackendBusy` on timeout. |

## Complexity Tracking

*(Empty — no Constitution Check violations.)*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|

---

**Phase 2 (not produced here)**: `/speckit-tasks` will decompose this plan into dependency-ordered tasks.
