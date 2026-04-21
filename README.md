# nexus-dnn

A local-first, extensible AI workflow platform for composing, executing, and debugging multimodal pipelines across image, video, audio, and LLM tasks.

## Overview

nexus-dnn provides a developer-grade runtime that treats generative workflows as structured, reproducible software pipelines. It features a Rust host runtime as the execution authority, a typed extension system with versioned contracts, and a protocol-driven architecture that supports heterogeneous worker runtimes.

## Architecture

```text
+----------------------------------------------------------+
|  React/TS Web UI                                         |
|  stage view | graph editor | run trace | artifact browser|
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
| `nexus-api` | HTTP/WebSocket API server (axum) |
| `nexus-workflow` | Canonical workflow DAG model, validation, mutations |
| `nexus-scheduler` | Execution planning and node-to-worker scheduling |
| `nexus-worker` | Worker process supervision and lifecycle management |
| `nexus-artifact` | Artifact blob storage, manifests, and lineage tracking |
| `nexus-extension` | Extension discovery, manifest validation, operator indexing |
| `nexus-protocol` | Shared protocol types for host-worker communication |
| `nexus-events` | Typed event bus with broadcast and adapter support |
| `nexus-storage` | Metadata database (SQLite) with migration support |
| `nexus-run` | Run engine orchestrating workflow execution |
| `nexus-backend-runtimes` | Host-owned inference backend orchestration (llama.cpp, TensorRT-LLM): runtime-adapter lifecycle, channel allocation, spawn. After spec-018 the models-store, provenance, and deployment domains live in their own crates below. See [crate README](crates/nexus-backend-runtimes/README.md). |
| `nexus-models-store` | Models store extracted from `nexus-backend-runtimes` (spec 018): install pipeline, blob dedup, lease budget, quantization matching, resolver, verify, layout, reclaim. **Spec 025** adds the universal model catalog layer: `normalize` (pure-function pipeline from HF → `ModelFamily`), `capabilities` (sealed-trait `BackendAdapter` + `CapabilityRegistry`), `downloads` (2-slot semaphore orchestrator, resumable `Range` transfers, pause/resume, startup rehydration, FR-086 install-mapping). See [crate README](crates/nexus-models-store/README.md). |
| `nexus-provenance` | License resolution + Hugging Face metadata probe extracted from `nexus-backend-runtimes` (spec 018). |
| `nexus-deployments` | Deployments domain (spec 018): named, append-only, reloadable execution-context snapshots over canonical workflows/recipes. Save / load / execute / validate / clone / export / import services. |
| `nexus-huggingface` | Host-level Hugging Face capability — search, repo detail, resumable downloads |
| `nexus-local-llm-worker` | Builtin local-LLM extension worker (Rust sidecar). Consumes host model-store and backend-runtime registries via JSON-RPC; holds `RuntimeLease`s and proxies OpenAI-compatible HTTP to leased `llama-server` children. No Python runtime in the extension. |

## Quick Start

```bash
git clone <repo-url> nexus-dnn
cd nexus-dnn
cargo build --release
./target/release/nexus-dnn
```

One command builds the Rust host runtime and the React web UI into a single binary. Open [http://localhost:3000](http://localhost:3000) to access the platform.

> See the full [Getting Started tutorial](docs/getting-started.md) for a complete walkthrough.

## Development

```bash
cargo test            # Run all tests
cargo clippy          # Lint
cargo fmt --check     # Format check
cargo run             # Development mode
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

## Contributing

1. Fork the repository
2. Create a feature branch from `develop`
3. Ensure `cargo fmt`, `cargo clippy`, and `cargo test` pass
4. Submit a pull request

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.
