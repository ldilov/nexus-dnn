# Implementation Plan: Architecture Core Setup

**Branch**: `001-arch-core-setup` | **Date**: 2026-04-11 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-arch-core-setup/spec.md`

## Summary

Set up the nexus-dnn mono-repo as a Rust workspace with trait-first crate boundaries. Implement the core host runtime (workflow engine, scheduler, worker manager, artifact store, extension registry, event bus, protocol layer), wire up an HTTP/WebSocket API server, and scaffold a minimal React frontend. Every subsystem exposes a trait interface with a default implementation backed by tokio, SQLite, and the filesystem.

## Technical Context

**Language/Version**: Rust (latest stable, 2024 edition)
**Primary Dependencies**: tokio 1.48, axum 0.8, sqlx 0.8, serde-saphyr 0.0.10, jsonschema 0.45, semver 1.0, thiserror 2.x, tracing 0.1
**Storage**: SQLite (metadata via sqlx) + filesystem (artifact blobs)
**Testing**: `cargo test` with unit, integration, and doc tests
**Target Platform**: Linux x64, Windows x64 (single machine, local execution)
**Project Type**: Platform runtime (daemon + API server + CLI)
**Performance Goals**: Workflow validation <1s for 10 nodes, event latency <100ms, worker crash recovery <5s
**Constraints**: Self-contained binary, no external database servers, data directory at `~/.nexus/`
**Scale/Scope**: v0 — hundreds of extensions, thousands of runs, single user, single machine

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Ecosystem-First | PASS | All dependencies are battle-tested ecosystem crates (tokio, axum, sqlx, serde). Custom code only for JSON-RPC stdio (no viable crate exists — see R-004). |
| II. Pure Functions & SOLID | PASS | Each crate exposes a trait (Interface Segregation, Dependency Inversion). Business logic in pure functions, side effects at boundaries. Single Responsibility per crate. |
| III. Extendability | PASS | Transport abstraction trait, storage trait, event bus trait, runtime family trait. New transports/storage/runtimes addable without modifying existing modules. |
| IV. Self-Documenting Code | PASS | No inline comments policy enforced. All functions, traits, and types named for clarity. |
| V. Git-Flow Branching | PASS | Working on feature branch `001-arch-core-setup`. Commits as `Lazar Dilov <ldilov@yahoo.com>`. |
| VI. Living Documentation | PASS | README.md update included as a deliverable. |
| VII. Clean Provenance | PASS | No AI traces in committed code. |

## Project Structure

### Documentation (this feature)

```text
specs/001-arch-core-setup/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── host-api.md
│   ├── worker-protocol.md
│   └── extension-manifest.md
└── tasks.md
```

### Source Code (repository root)

```text
nexus-dnn/
├── Cargo.toml                    # Workspace root
├── README.md
├── LICENSE
├── .gitignore
├── schemas/
│   ├── extension-manifest.json   # JSON Schema for extension manifests
│   ├── operator-definition.json  # JSON Schema for operator definitions
│   ├── recipe-definition.json    # JSON Schema for recipes
│   └── workflow.json             # JSON Schema for workflow definitions
├── crates/
│   ├── nexus-core/               # Binary entrypoint, composition root
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── app.rs            # Application builder, wires subsystems
│   │       └── config.rs         # CLI args, env, config file loading
│   ├── nexus-api/                # HTTP/WebSocket API layer (axum)
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── router.rs         # Route definitions
│   │       ├── handlers/         # Request handlers per resource
│   │       ├── extractors.rs     # Custom axum extractors
│   │       └── ws.rs             # WebSocket event stream adapter
│   ├── nexus-workflow/           # Canonical workflow model + validation
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── model.rs          # Workflow, Node, Edge, Stage, Port types
│   │       ├── validation.rs     # DAG validation, type checking, binding resolution
│   │       ├── mutation.rs       # Deterministic graph mutations
│   │       └── parser.rs         # YAML -> canonical model
│   ├── nexus-scheduler/          # Execution planning + scheduling
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── planner.rs        # Topological sort, cache lookup, plan generation
│   │       └── scheduler.rs      # Node-to-worker assignment
│   ├── nexus-worker/             # Worker supervision + process lifecycle
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── manager.rs        # Worker pool, spawn, health, terminate
│   │       ├── process.rs        # Child process wrapper (tokio::process)
│   │       └── runtime_family.rs # Runtime family trait + registry
│   ├── nexus-artifact/           # Artifact store + manifests
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── store.rs          # Blob storage, write targets, finalization
│   │       └── manifest.rs       # Artifact manifest types, lineage edges
│   ├── nexus-extension/          # Extension discovery, validation, indexing
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── registry.rs       # Extension registry trait + in-memory impl
│   │       ├── manifest.rs       # Manifest parsing + JSON Schema validation
│   │       └── operator_index.rs # Operator indexing from activated extensions
│   ├── nexus-protocol/           # Shared protocol types (host <-> worker)
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── messages.rs       # JSON-RPC request/response/notification types
│   │       ├── transport.rs      # Transport trait
│   │       └── stdio.rs          # JSON-RPC over stdio implementation
│   ├── nexus-events/             # Typed event bus
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── bus.rs            # EventBus trait + broadcast impl
│   │       └── types.rs          # Event enum (workflow, run, node, artifact, worker)
│   ├── nexus-storage/            # Metadata database (SQLite)
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       ├── database.rs       # Database trait + SQLite impl
│   │       └── migrations.rs     # Schema migration runner
│   └── nexus-run/                # Run engine (orchestrates execution)
│       ├── Cargo.toml
│       └── src/
│           ├── lib.rs
│           ├── engine.rs         # Run lifecycle, state transitions
│           └── state.rs          # Run and node state enums
├── apps/
│   └── web/                      # React/TS frontend scaffold
│       ├── package.json
│       ├── tsconfig.json
│       ├── src/
│       │   ├── main.tsx
│       │   ├── api/              # API client
│       │   ├── components/       # UI components
│       │   └── hooks/            # React hooks (useEventStream, etc.)
│       └── index.html
├── sdk/
│   └── python/                   # Python worker SDK (minimal for v0)
│       ├── pyproject.toml
│       └── nexus_sdk/
│           ├── __init__.py
│           ├── worker.py         # Base worker class
│           └── protocol.py       # JSON-RPC message types
├── extensions/
│   └── examples/
│       └── hello-world/          # Minimal example extension
│           ├── manifest.yaml
│           ├── operators/
│           │   └── echo.yaml
│           └── worker/
│               ├── main.py
│               └── requirements.txt
├── migrations/
│   └── 001_initial.sql           # Initial SQLite schema
└── tests/
    └── integration/
        ├── extension_lifecycle.rs
        ├── workflow_validation.rs
        └── run_execution.rs
```

**Structure Decision**: Rust workspace mono-repo with 10 domain crates under `crates/`, a React frontend under `apps/web/`, a Python SDK under `sdk/python/`, and example extensions under `extensions/examples/`. Each crate has a single responsibility with trait-based interfaces. The binary entrypoint (`nexus-core`) wires all subsystems together.

## Complexity Tracking

No constitution violations. All crates justified by the Single Responsibility principle and the documented architecture boundaries.

| Crate Count | Justification |
|-------------|---------------|
| 10 crates | Each maps 1:1 to a documented architecture boundary (workflow, scheduler, worker, artifact, extension, protocol, events, storage, API, run engine). Merging any two would violate SRP. |
