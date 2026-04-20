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
| `nexus-local-llm-worker` | Builtin local-LLM extension worker (Rust sidecar, [spec 024](specs/024-local-llm-rust-port/)). Consumes host model-store + backend-runtime registries via JSON-RPC; holds `RuntimeLease`s and proxies OpenAI-compatible HTTP to leased `llama-server` children. Zero Python runtime in the extension. |

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

### Recent specs

- [spec 025 — Models Search Refactor](specs/025-models-search-refactor/)
  — Models Search page becomes a universal, format-aware, backend-aware
  catalog. Five new artifact formats (`gguf` / `ggml` / `safetensors` /
  `pytorch-bin` / `pth`), first-class GGUF quantization variants,
  dependency-bearing bundles (VAE / text encoder / tokenizer),
  capability-registry-driven backend filter (no hardcoded `llama.cpp`),
  resumable downloads with a 2-slot semaphore cap, pause / resume,
  startup rehydration, optional HF token with FR-114 re-queue on change,
  FR-086 reverse-mapping from installed artifact → upstream identity.
  New `/api/v1/model-store/{backends,search,models,downloads,settings/hf-token}`
  surface. Legacy `/api/v1/huggingface/search` stays for one release with
  deprecation headers. See [spec](specs/025-models-search-refactor/spec.md),
  [plan](specs/025-models-search-refactor/plan.md), and
  [tasks](specs/025-models-search-refactor/tasks.md).

- [spec 024 — Local LLM Extension Rust Port](specs/024-local-llm-rust-port/)
  — Python `local-llm` worker replaced by a compiled Rust sidecar. Extension
  is now a pure lease consumer against the host's `nexus-backend-runtimes`
  supervisor; host spawns `llama-server`, extension proxies OpenAI-compatible
  HTTP through `lease.channel.base_url`. Architectural rule: *spawn ownership
  follows registration ownership* — host-registered universal runtimes are
  host-spawned and shareable across extensions via refcounted leases; future
  extensions may still ship private runtimes and supervise them themselves.
- [spec 017 — Host-managed models](specs/017-host-managed-models/) — shared
  model store with per-extension leasing.
- [spec 019 — Extension Modules + Spectral Graphite UI](specs/019-extension-modules/)
  — modules surface, blank-module draft, ZIP install.
- [spec 020 — Backends + Models page polish](specs/020-backends-and-models-polish/)
  — Backends install flow (variant picker + InstallModal wiring),
  `/models` HF search panel, DAG draft-node UX. US1 (Install flow) landed;
  US2/US3/US4 in-flight.
- [spec 021 — Web App Architecture Refactor](specs/021-web-architecture-refactor/)
  — Layered frontend architecture (`views/<name>/*.view.tsx / .ui.tsx / .css.ts`),
  constitution v1.2.0 Principle XII + Appendices E/F, 9-rule AST scanner,
  Playwright smoke + visual regression harness across 3 viewports, motion
  polish via CSS keyframes + lazy-loaded Motion chunk. See
  [quickstart](specs/021-web-architecture-refactor/quickstart.md) for the
  contributor walkthrough.

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

## Recent Changes

- **Spec 019 — Extension Modules + Spectral Graphite UI**: The sidebar's separate `Recipes` and `Workflows` items collapse into a single `Modules` entry. Every installed extension and user-authored workflow surfaces as a card on the new Modules page (bento grid, virtualized past 60 cards). Each card carries `View Blueprint` (read-only view) and `Deploy Instance` (one-click POST → new deployment) CTAs; multi-recipe modules get a `(N) ▾` blueprint quick-pick. A Blank Module card mints a client-side UUID and lets users sketch a workflow before the first save — the server's `POST /api/v1/modules/user:draft:{uuid}/materialize` endpoint is body-hash idempotent for 10 min. New ZIP installer (`POST /api/v1/extensions/install-from-zip`) accepts compressed extensions with strict Zip-Slip/size/count/SVG validation, reachable from both the Modules page header and the Extensions gallery. See [specs/019-extension-modules/](specs/019-extension-modules/) for full details. Legacy routes `/#/recipes` and `/#/workflows/{id}` redirect with a one-release sunset window.
- **Spec 017 — Host-Managed Model Store**: New `nexus-backend-runtimes::models_store` owns a host-wide model catalog parallel to the runtime catalog. Extensions declare typed `model_dependencies` in their manifest (revision-pinned by default). Content-addressed blob store dedups byte-identical files across installs; per-device VRAM leases coordinate loads across extensions; resolver returns matched/missing/unsatisfiable in <100ms P95. Provenance (license SPDX + source revision) is populated on every `ready` row; private-install reclaim sweeps orphaned rows after a configurable grace period. New endpoints: `GET /api/v1/host-models`, `POST /api/v1/host-models/resolve`, `POST /api/v1/host-models/{id}/leases`, `DELETE /api/v1/host-models/leases/{id}`.
- **Spec 011 — Host Runtime Pool**: Inference runtimes (llama.cpp, TensorRT-LLM) are now managed by the host crate `nexus-backend-runtimes` and shared across every extension that declares a matching `runtime_dependencies` entry. The retired `nexus-local-llm` crate has been deleted; its plumbing lives in the new host crate, its domain logic (model routing, hyperparameter validation, install registry) lives inside `extensions/builtin/local-llm/worker/`. New top-level routes: `GET /api/v1/backends`, `GET /api/v1/backends/{family}/parameters`. Legacy `/api/v1/llm/backends/*` routes carry RFC 8594 `Deprecation` + `Sunset` headers pointing at the new surface.

## Contributing

1. Fork the repository
2. Create a feature branch from `develop`
3. Ensure `cargo fmt`, `cargo clippy`, and `cargo test` pass
4. Submit a pull request

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.
