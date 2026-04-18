# Phase 0 — Research & Open Questions

**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md) | **Date**: 2026-04-18

Each topic is resolved as *Decision / Rationale / Alternatives considered*. Any item marked **OPEN** blocks Phase 1 artifact freeze.

---

## 1. Ownership reconciliation: spec Q1 vs existing `nexus-backend-runtimes` infrastructure

**Finding**: the host already exposes supervision primitives — `LaunchSpec`, `LlamaServerLaunchSpec` (launch_spec.rs), `RuntimeLease { lease_id, install_id, extension_id, pid, log_channel_id, channel: RuntimeChannelDescriptor }` (lease.rs), `spawn/supervise.rs`, `runtime_installs_store/`. The lease shape carries a `pid` and a network channel descriptor, strongly suggesting the *host* spawns the child and hands the extension a lease + channel.

The spec's Q1 answer was recorded as "extension spawns, host provides paths." That conflicts with the existing infrastructure, which is closer to "host spawns, extension holds a lease and talks through a channel."

**Decision (recommended — PROPOSE TO USER BEFORE TASKS PHASE)**: **Pivot Q1 interpretation to "host owns the spawn and supervision, extension holds a `RuntimeLease` and talks to `channel.base_url`."** The user's original vote was `B`; their verbal flow was ambiguous; the existing infrastructure encodes `B`; and the decoupling directive ("host owns the backend-runtime") aligns best with host-owned spawn. Pivoting avoids duplicating the supervisor in two places (host's `spawn/supervise.rs` and a new extension supervisor).

**Consequences of pivot:**
- `crates/nexus-local-llm-worker/src/supervisor/` shrinks to a **lease consumer**: it holds a `RuntimeLease` acquired via `host.runtimes.acquire_lease(...)`, subscribes to `backend.state` events scoped to that lease, and releases the lease on drop. It does NOT `tokio::process::Command::spawn` anything.
- Pool keying stays the same `(variant, model_id)` but each pool slot holds a lease, not a child process.
- FR-010–FR-016 (spec) need wording tweaks: "worker MUST spawn" → "worker MUST acquire a lease via host API"; the supervision SLOs (probe interval, restart attempts) become host concerns.
- FR-015 shutdown-hygiene concern shifts: extension's responsibility becomes "release all leases on drop"; orphan prevention is host-side (and it already exists per `kill_on_drop(true)` in the Architectural Constraints).
- Spec's Clarifications section to be amended with a Q1-revision note.

**If user rejects the pivot** (sticks with extension-spawns): a new host API `host.runtimes.resolve_launch_spec(runtime_id, model_id) → LaunchSpec` must be added, and `spawn/supervise.rs` stays host-only for non-extension backends. The extension then implements its own supervisor with `tokio::process::Command` + `kill_on_drop(true)`. Everything in the plan's `supervisor/` module is written from scratch. Duplication is real but contained.

**Alternatives considered:**
- **Hybrid** (extension spawns but registers PID with host for cleanup): adds complexity without a clear win; makes orphan prevention a multi-owner problem. Rejected.
- **Silently go with spec** without flagging: would either duplicate host code or require reading `nexus-backend-runtimes` internals from the extension crate (violates decoupling, constitution V). Rejected.

**Status**: **RESOLVED 2026-04-18** — user approved the pivot. Spec §Clarifications amended with the revised Q1. Consequences: the `supervisor/` module is a lease consumer, not a process supervisor; FR-010..FR-016 rewritten in terms of `acquire_lease` / `channel.base_url` / `release_lease`; research items #3, #3b, #10 become moot (host-side concerns). Generalization captured: *spawn ownership follows registration ownership* — host-registered runtimes are host-spawned, extension-shipped private runtimes (e.g., a future VLLM extension's embedded Python env) remain extension-spawned.

---

## 2. SSE parsing choice

**Decision**: use `eventsource-stream` (thin, maintained, ~300 LOC, `Stream<Item = Result<Event, _>>` shape composes cleanly with `reqwest::Response::bytes_stream()`). Add to `Cargo.toml` with no features beyond default.

**Rationale**: llama.cpp's SSE frames follow standard `event:` / `data:` conventions; edge cases (chunked boundaries, keepalives) are already handled. A hand parser would be 40 LOC today and 200 LOC after the first edge case.

**Alternatives**: hand-rolled parser (rejected — YAGNI wins once → YAGNI loses forever); `async-sse` (pulls `http-types`, much larger dep tree).

---

## 3. Port discovery mechanism — **MOOT** (superseded by #1 pivot)

Host owns port selection via `settings.port_mode` + `launch_spec::generate`; extension consumes `lease.channel.base_url` verbatim. No extension-side discovery logic.

---

## 3b. Graceful-shutdown verb for `llama-server` — **MOOT** (superseded by #1 pivot)

Host owns the shutdown ladder for leased runtimes. Extension's only obligation is `release_lease`.

---

## 4. Migration source-of-truth discovery

**Decision**: the one-shot migration routine (FR-006) scans `~/.nexus/local-llm/llamacpp/*/` on first launch if no `migration_marker` file exists, and invokes `host.runtimes.register_existing_install({path, variant_hint})` for each discovered binary. Models similarly: scan the Python extension's model registry SQL rows (migration `001_backend_and_models.sql` table schema is stable) and call `host.models.register_existing(...)`. Requires the host to expose the two `register_existing*` APIs.

**Rationale**: the extension is the only component that knows where the legacy Python paths were. Host runtime-installs-store indexes host-owned layouts, not legacy extension-owned ones.

**Alternatives**: have the host scan (rejected — violates single-choice; the host shouldn't know about this extension's legacy paths); require user-initiated migration (rejected — SC-003 violation).

---

## 5. User preference persistence for runtime variant

**Decision**: store in host user-settings under a namespaced key (`local-llm.runtime_preferences[<model_id>] = <variant_codename>`) via a host API `host.settings.get/set`. Uniform with other per-user preferences; works cross-extension if a future extension wants the same "pick CUDA 13 for this model" memory.

**Alternatives**: extension-local SQL table (rejected — not discoverable to the host UI; violates the decoupling principle for a genuinely user-scoped pref).

---

## 6. GGUF metadata fields required by `llama-server` launch

**Decision**: the extension requires from `host.models.get(model_id)` at minimum:
- `file_path` — absolute path to the GGUF file.
- `format: "GGUF"` — gate for runtime-compat check.
- `metadata.context_length` — to set `--ctx-size` (fallback to settings default if absent).
- `metadata.architecture` — for logging and advice; not strictly required by llama-server CLI.
- `metadata.chat_template` — OPTIONAL; `llama-server` has embedded fallbacks.
- `metadata.recommended_ngl` — OPTIONAL hint for GPU-layer count (heuristic if absent).

If `file_path` or `format` is missing → `ModelMetadataIncomplete` hard error (spec FR-023). If optional fields are missing → warn + fallback defaults.

**Rationale**: keeps the host contract narrow; matches what `llama-server`'s CLI actually consumes.

---

## 7. Chat-turn cancellation semantics

**Decision**: cancel by dropping the SSE `reqwest` response stream. `llama-server`'s slot autosense detects the dropped connection and frees the slot within one token boundary (sub-100 ms at typical throughputs). Spec FR-018's 200 ms budget is met.

**Rationale**: upstream `llama-server` lacks a dedicated "abort request N" HTTP verb; dropping the connection is the documented mechanism.

**Alternatives**: send a separate abort HTTP call (no such API exists); kill the child (rejected — drops other concurrent turns).

---

## 8. Sidecar protocol version

**Decision**: no protocol bump needed. Resolver-client calls (`host.models.*`, `host.runtimes.*`) ride on the existing JSON-RPC `call_method` surface (`nexus-protocol::StdioTransport`) with the method names used as `method` field strings. The host-side dispatch code needs a small addition to route these method names to the resolver implementations, but that's a host-spec concern; no change to the protocol envelope.

**Alternatives**: introduce a typed host-API RPC channel (rejected — over-engineering; YAGNI; adds a version-skew failure mode).

---

## 9. Tokio feature surface

**Decision**: enable exactly `rt-multi-thread`, `macros`, `process`, `io-util`, `fs`, `net`, `time`, `sync`, `signal`. Avoid `full`. Measured binary size impact via `cargo-bloat --release --crates`; budget line for the plan's SC-004.

**Rationale**: each excluded feature trims ~100–400 KB; full carries tracing, parking_lot ringbuffer, etc. that we don't need.

---

## 10. Windows child-process graceful stop — **MOOT** (superseded by #1 pivot)

Host-side `spawn/supervise.rs` already handles this for leased runtimes.

---

## Consolidated Decision Table

| # | Topic | Decision | Status |
|---|---|---|---|
| 1 | Q1 ownership reconcile | **Pivot approved — host-spawn + extension holds lease** | Resolved |
| 2 | SSE parser | `eventsource-stream` crate | Resolved |
| 3 | Port discovery | Superseded — lease `channel.base_url` | Moot |
| 3b | Graceful shutdown verb | Superseded — host owns shutdown ladder | Moot |
| 4 | Migration scan | Extension-owned scan → `host.*.register_existing` | Resolved |
| 5 | User runtime pref | Host user-settings | Resolved |
| 6 | Required model metadata | `file_path`, `format` mandatory; rest optional | Resolved |
| 7 | Chat cancel | Drop SSE stream | Resolved |
| 8 | Protocol bump | None | Resolved |
| 9 | Tokio features | Explicit feature list, no `full` | Resolved |
| 10 | Windows graceful stop | Superseded — host owns it | Moot |

**Gate**: all items resolved. Phase 1 artifacts are frozen against these decisions. `/speckit-tasks` is unblocked.
