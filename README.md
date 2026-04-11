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
3. Follow the [project constitution](.specify/memory/constitution.md) principles
4. Ensure `cargo fmt`, `cargo clippy`, and `cargo test` pass
5. Submit a pull request

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.
