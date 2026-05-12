# nexus-dnn

A local-first, extensible AI workflow platform for composing, executing, and debugging multimodal pipelines across image, video, audio, and LLM tasks.

## Overview

nexus-dnn provides a developer-grade runtime that treats generative workflows as structured, reproducible software pipelines. It features a Rust host runtime as the execution authority, a typed extension system with versioned contracts, and a protocol-driven architecture that supports heterogeneous worker runtimes.

## Architecture

```text
+----------------------------------------------------------+
|  React/TS Web UI — Spectral Graphite design language     |
|  shell + chat + draft AI suggestions + artifact browser  |
+----------------------------+-----------------------------+
                             |
                             | HTTP / WebSocket
                             v
+----------------------------------------------------------+
|  Rust Host Runtime                                       |
|  workflow engine | scheduler | artifact store | events   |
|  extension registry | worker manager | run engine        |
+-------------------+---------------------+----------------+
                    |                     |
                    | JSON-RPC (stdio)    | Filesystem
                    v                     v
      +------------------------+   +---------------------+
      | Extension Workers      |   | Artifact Store      |
      | Python | Native | Svc  |   | blobs + manifests   |
      +------------------------+   +---------------------+
```

### Crates

| Crate | Purpose |
|-------|---------|
| `nexus-core` | Binary entrypoint, application composition, configuration |
| `nexus-api` | HTTP/WebSocket API server (axum). **Spec 030** adds the generic extension dispatcher at `/api/v1/extensions/{ext_id}/{*rest}` — every new extension's HTTP surface lands without a single host route edit. See [extension_router](crates/nexus-api/src/extension_router/README.md) and [crate README](crates/nexus-api/README.md). |
| `nexus-workflow` | Canonical workflow DAG model, validation, mutations |
| `nexus-scheduler` | Execution planning and node-to-worker scheduling |
| `nexus-worker` | Worker process supervision and lifecycle management |
| `nexus-artifact` | Artifact blob storage, manifests, and lineage tracking |
| `nexus-extension` | Extension discovery, manifest validation, operator indexing. **Spec 030** adds `ExtensionRouterProvider` — the adapter trait extensions implement to publish HTTP routes via the host's generic dispatcher. See [crate README](crates/nexus-extension/README.md). |
| `nexus-protocol` | Shared protocol types for host-worker communication |
| `nexus-events` | Typed event bus with broadcast and adapter support |
| `nexus-storage` | Metadata database (SQLite) with migration support |
| `nexus-run` | Run engine orchestrating workflow execution |
| `nexus-backend-runtimes` | Host-owned inference backend orchestration (llama.cpp, TensorRT-LLM): runtime-adapter lifecycle, channel allocation, spawn. After spec-018 the models-store, provenance, and deployment domains live in their own crates below. **Spec 032** adds the generic multi-family pipeline under `generic/` + per-family handlers under `family_python/` / `family_native/`: any extension can contribute a backend runtime via its manifest (zero host edits), the host installs through a 10-phase pipeline, and extensions consume the worker as an `Arc<dyn BackendRuntimeLease>` over JSON-RPC/NDJSON/stdio. See [crate README](crates/nexus-backend-runtimes/README.md). |
| `nexus-models-store` | Models store extracted from `nexus-backend-runtimes` (spec 018): install pipeline, blob dedup, lease budget, quantization matching, resolver, verify, layout, reclaim. **Spec 025** adds the universal model catalog layer: `normalize` (pure-function pipeline from HF → `ModelFamily`), `capabilities` (sealed-trait `BackendAdapter` + `CapabilityRegistry`), `downloads` (2-slot semaphore orchestrator, resumable `Range` transfers, pause/resume, startup rehydration, FR-086 install-mapping). See [crate README](crates/nexus-models-store/README.md). |
| `nexus-provenance` | License resolution + Hugging Face metadata probe extracted from `nexus-backend-runtimes` (spec 018). |
| `nexus-deployments` | Deployments domain (spec 018): named, append-only, reloadable execution-context snapshots over canonical workflows/recipes. Save / load / execute / validate / clone / export / import services. |
| `nexus-huggingface` | Host-level Hugging Face capability — search, repo detail, resumable downloads |
| `nexus-local-llm-worker` | Builtin local-LLM extension worker (Rust sidecar). Consumes host model-store and backend-runtime registries via JSON-RPC; holds `RuntimeLease`s and proxies OpenAI-compatible HTTP to leased `llama-server` children. No Python runtime in the extension. |
| `nexus-run-events` | **Spec 042** — versioned, sequence-numbered structured event protocol emitted by every nexus-dnn worker scraper (model load, dependency install, GGUF probe, ...). Generic by design: `RunEventItem` + `WorkerScraper` trait + `EventBatch` transport. Feeds the Lattice / Pulse-Floor / Block surfaces in the desktop shell. See [crate README](crates/nexus-run-events/README.md). |
| `nexus-desktop-shell` | **Spec 042** — Tauri 2.x shell crate. Owns window lifecycle (close-to-tray, `RunEvent::ExitRequested` intercept), system-tray menu, custom titlebar helpers, and the IPC command dispatcher. Generic dispatcher routes by command name, not by extension. See [crate README](crates/nexus-desktop-shell/README.md). |

## Quick Start

```bash
git clone <repo-url> nexus-dnn
cd nexus-dnn
cargo build --release
./target/release/nexus-dnn
```

One command builds the Rust host runtime and the React web UI into a single binary. Open [http://localhost:3000](http://localhost:3000) to access the platform.

> See the full [Getting Started tutorial](docs/getting-started.md) for a complete walkthrough.

## Terminal Console

`nexus-tui` is a streaming terminal console for the running host — ambient
event flow, slash-command filters, structured event inspection, snapshot
artifacts, and one-key handoff to the desktop UI. It connects via SSE and
mirrors host activity in real time.

```bash
cargo dev             # host + TUI in one terminal (recommended)
```

See [`crates/nexus-tui/README.md`](crates/nexus-tui/README.md) for the full
command reference and architecture, or
[spec 044](specs/044-tui-streaming-console/spec.md) for the product
contract.

## Development

### Workspace cargo aliases

Defined in [`.cargo/config.toml`](.cargo/config.toml). Run
`cargo --list | grep alias` at any time to see them inline with the
built-in cargo subcommands.

| Alias | Expands to | Purpose |
|---|---|---|
| `cargo dev` | `cargo run -p nexus-core --bin nexus-dnn -- --with-tui` | Host + TUI, host-orchestrated (recommended) |
| `cargo dev-tui` | `cargo run -p nexus-tui --bin nexus -- --with-host` | Host + TUI, TUI-orchestrated |
| `cargo host` | `cargo run -p nexus-core --bin nexus-dnn` | Host only — for browser at [`localhost:3000`](http://localhost:3000) |
| `cargo tui` | `cargo run -p nexus-tui --bin nexus` | TUI only — attaches to a running host |

Pass-through args work as expected: `cargo dev --port 4000` becomes
`nexus-dnn --with-tui --port 4000`.

### Standard cargo commands

```bash
cargo test            # Run all tests
cargo clippy          # Lint
cargo fmt --check     # Format check
cargo build --release # Production build
```

### Listing every cargo subcommand (built-ins + aliases)

```bash
cargo --list                # everything cargo knows about
cargo --list | grep alias   # only the workspace aliases above
```

### Project Structure

```
nexus-dnn/
├── crates/           # Rust workspace crates
├── apps/web/         # React/TypeScript frontend
├── sdk/python/       # Python worker SDK
├── extensions/       # Extension packages
├── schemas/          # JSON Schemas for manifests and workflows
├── migrations/       # SQLite schema migrations
└── tests/            # Integration tests
```

## Documentation

| Document | Description |
|----------|-------------|
| [Getting Started](docs/getting-started.md) | Build, run, and execute your first workflow |
| [Architecture](docs/architecture.md) | System design, crate map, data flow |
| [Configuration](docs/configuration.md) | Environment variables, data directory, logging |
| [Extension Guide](docs/extension-guide.md) | Build and install custom extensions |
| [Workflow Authoring](docs/workflow-authoring.md) | Write workflow YAML definitions |
| [API Reference](docs/api-reference.md) | REST and WebSocket endpoint reference |
| [Worker Protocol](docs/worker-protocol.md) | JSON-RPC 2.0 stdio protocol |
| [Data Model](docs/data-model.md) | Entities, relationships, state machines |
| [Python SDK](docs/python-sdk.md) | Python worker SDK reference |

### Frontend design system — Spectral Graphite (Kinetic Observatory)

Spec 037 ships a unified **Spectral Graphite** design language — dark graphite surfaces, violet / indigo / magma accent duty rules, JetBrains Mono for IDs and timings, and a glassmorphism layer for floating UI. Two cross-cutting host primitives:

- **Generic `ChatSurface`** at [`apps/web/src/components/chat/`](apps/web/src/components/chat/) — a single chat shell shared by Local LLM and any deployment with chat context. Replaced four files of grandfathered host-extension boundary debt.
- **Draft AI suggestion stream** at `/api/v1/modules/drafts/{draft_id}/suggestions` (POST + cancel endpoint) — extension-agnostic SSE handler family in [`crates/nexus-api/src/handlers/draft_suggestions/`](crates/nexus-api/src/handlers/draft_suggestions/) that streams indigo per-line suggestions into the Module Draft view from any leasable text-completion backend.

### Spec 042 — Neo-Terminal Desktop Shell

A native desktop wrapper plus three terminal-aesthetic UI primitives that turn opaque worker telemetry into legible, tunable surfaces. Two new host crates ([`nexus-run-events`](crates/nexus-run-events/) + [`nexus-desktop-shell`](crates/nexus-desktop-shell/)) plus a Tauri sub-crate at [`apps/web/src-tauri/`](apps/web/src-tauri/).

User-facing features:

- **Block primitive** at [`apps/web/src/components/blocks/`](apps/web/src/components/blocks/) — the new prompt-style UI atom that wraps every actionable surface with a mnemonic chip, a collapsed-state inline sparkline, and an inset-only phosphor focus glow.
- **Model-load Lattice** at [`apps/web/src/components/runtime/model_load_lattice/`](apps/web/src/components/runtime/model_load_lattice/) — a Bloomberg-dense grid that visualises per-layer × per-tensor-group state during a llama.cpp model load (pending → discovered → assigned → reserved → ready, plus error / cpu_offloaded). Failure modes (VRAM OOM red point, n-cpu-moe amber column, cancelled load gap markers) are recognisable spatially without reading logs.
- **Pulse-Floor** at the bottom of every page — a 4 px telemetry band carrying VRAM / RAM / leases / tok-s. Quiet during health, dramatically bright during anomaly.
- **Single phosphor block cursor** as eye-anchor — pulse rate encodes system load (1 Hz rest → 2 Hz inference → 3 Hz model load).

#### Desktop launch

The desktop shell launches via the Tauri 2.x CLI. Per Tauri issue [#2643](https://github.com/tauri-apps/tauri/issues/2643), the CLI must be invoked from `apps/web/`, not from the workspace root.

```bash
cd apps/web
pnpm tauri dev          # dev build with hot-reload
pnpm tauri build        # platform bundles into target/release/bundle/
```

See [`specs/042-neo-terminal-shell/quickstart.md`](specs/042-neo-terminal-shell/quickstart.md) for the full walkthrough including the model-load smoke test, system-tray persistence verification, and anomaly-recognition exercise.

### Builtin extensions

| Extension | Purpose |
|-----------|---------|
| [`local-llm`](extensions/builtin/local-llm/) | Chat threads + per-thread LLM bindings on top of llama.cpp leases. |
| [`emotion-tts`](extensions/builtin/emotion-tts/) | Multi-character emotional TTS via IndexTTS-2. **Spec 036** adds non-destructive audio editing (trim / crop / normalize / pitch-preserving speed / fades / mute) on voice assets and per-utterance run outputs, with audit trail and preview-before-apply. |

## Contributing

1. Fork the repository
2. Create a feature branch from `develop`
3. Ensure `cargo fmt`, `cargo clippy`, and `cargo test` pass
4. Submit a pull request

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.
