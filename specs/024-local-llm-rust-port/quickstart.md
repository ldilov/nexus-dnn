# Quickstart — nexus-local-llm-worker

**Audience**: contributors building or debugging the Rust port.

## Prerequisites

- Rust 1.84+ (workspace MSRV)
- A local llama.cpp `llama-server` binary somewhere on disk (upstream prebuilt or a hand-built one).
- A small GGUF for smoke tests (e.g. `qwen2.5-0.5b-q4km` — ~500 MB; keeps iteration fast).
- On Windows: `cargo` from the MSVC toolchain; on Linux: `pkg-config`, `libssl-dev` (TLS for reqwest).

## Build

```bash
cargo build -p nexus-local-llm-worker --release
```

Artifact: `target/release/nexus-local-llm-worker[.exe]`.

## Run alongside the dev host

The worker is a sidecar launched by the host over stdio. For local dev you can:

1. Register the worker binary as the local-llm extension entrypoint (manifest tweak — see `extensions/builtin/local-llm/manifest.yaml`, `runtime.entrypoint`).
2. Start the host normally (`cargo run -p nexus-run`).
3. Host discovers the extension and spawns the worker.

Alternatively, run the worker against a **fake host harness** for isolated testing:
```bash
cargo run -p nexus-local-llm-worker --example fake_host_chat_turn
```
The harness mocks `host.models.*` / `host.runtimes.*` responses and pipes JSON-RPC through a pair of `DuplexStream`s.

## Smoke test — first chat turn

With the worker integrated into the dev host:

1. Register a llama.cpp variant via the host UI (Models page → Runtimes → Install `llamacpp / cuda13`).
2. Download a small GGUF via the host UI (Models page → Add from HuggingFace).
3. Open the Chat layout. Pick the model. Type a prompt. You should see streaming tokens.

In the host log, successful startup looks like:
```
INFO  local_llm::lease_client  acquiring lease  install_id=... model_id=...
INFO  nexus_backend_runtimes::spawn  child spawned  install_id=... pid=12345
INFO  nexus_backend_runtimes::spawn  port bound  bound_port=56789
INFO  local_llm::lease_client  lease acquired  lease_id=... channel=http://127.0.0.1:56789
INFO  nexus_backend_runtimes::state  LoadingModel -> Ready  install_id=...
INFO  local_llm::proxy        chat_turn stream start  session_id=...
```
(Spawn + port-discovery log lines come from the **host-side** supervisor, not the extension.)

## Development loop

- Unit tests: `cargo test -p nexus-local-llm-worker`
- Contract tests: `cargo test -p nexus-local-llm-worker --test contract_host_apis`
- Integration tests (need a real `llama-server`): `NEXUS_LLAMA_SERVER=/path/to/llama-server cargo test -p nexus-local-llm-worker --features integration`

## Migration-from-Python (for contributors rolling the release)

1. The legacy Python tree (`extensions/builtin/local-llm/worker/`, `backends/`, `chat/`, `models/`, `rag/`, `operators/`, `methods/`) stays in-tree for Phase A + B.
2. First launch of the Rust worker runs the v0→v1 migration routine (`src/migration/v0_python_to_v1_rust.rs`) exactly once — detectable via the `~/.nexus/local-llm/.migration_v1_rust` marker file.
3. After stable release + one minor release of Rust stability, the Python tree is deleted in a follow-up commit.

## Useful host-side dev levers

- `RUST_LOG=nexus_local_llm_worker=debug,nexus_protocol=info` to see JSON-RPC traffic and state transitions without SSE chunks flooding the log.
- `NEXUS_LOCAL_LLM_POOL_CAP=1` to force single-slot pooling for easier debugging.
- `NEXUS_LOCAL_LLM_IDLE_TIMEOUT=10` (seconds) to exercise eviction quickly.
- Inspect pool: call Method `pool.list` via the host's debug RPC surface.

## Known sharp edges

- Orphan `llama-server` processes after host exit indicate a host-side bug (the extension releases leases; the host's `kill_on_drop` + refcount-to-zero path is authoritative). Report against `nexus-backend-runtimes`, not this crate.
- If `acquire_lease` hangs past its timeout, check the host's supervisor log for `LoadingModel` stalls — large GGUFs can take 30–60 s to load. Tune `acquire_lease_timeout` in extension config if needed.
- Extension-private runtimes (for future extensions like VLLM) follow a different pattern — they do NOT use `acquire_lease`; they spawn their own children. This crate is the "host-registered-runtime consumer" reference implementation only.
