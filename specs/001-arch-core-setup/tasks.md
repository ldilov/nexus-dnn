# Tasks: Architecture Core Setup

**Input**: Design documents from `specs/001-arch-core-setup/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US8)
- Exact file paths included in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create the Rust workspace, all crate scaffolds, shared configuration, and JSON schemas.

- [x] T001 Create workspace root `Cargo.toml` with 10 member crates under `crates/`
- [x] T002 [P] Create `crates/nexus-protocol/Cargo.toml` with serde, serde_json, thiserror, semver dependencies
- [x] T003 [P] Create `crates/nexus-events/Cargo.toml` with tokio (sync), serde, thiserror dependencies
- [x] T004 [P] Create `crates/nexus-storage/Cargo.toml` with sqlx (runtime-tokio, sqlite), thiserror, tracing dependencies
- [x] T005 [P] Create `crates/nexus-artifact/Cargo.toml` with tokio (fs), sha2, uuid, serde, thiserror dependencies
- [x] T006 [P] Create `crates/nexus-extension/Cargo.toml` with serde-saphyr, jsonschema, semver, serde_json, thiserror dependencies
- [x] T007 [P] Create `crates/nexus-workflow/Cargo.toml` with serde-saphyr, serde, serde_json, uuid, thiserror dependencies
- [x] T008 [P] Create `crates/nexus-worker/Cargo.toml` with tokio (process, sync, time, io-util), tokio-util (codec), thiserror dependencies
- [x] T009 [P] Create `crates/nexus-scheduler/Cargo.toml` with thiserror, tracing dependencies
- [x] T010 [P] Create `crates/nexus-run/Cargo.toml` with tokio (sync, time), uuid, chrono, thiserror dependencies
- [x] T011 [P] Create `crates/nexus-api/Cargo.toml` with axum, tokio, tower, tower-http, serde, serde_json, thiserror dependencies
- [x] T012 [P] Create `crates/nexus-core/Cargo.toml` binary crate with all nexus-* crates, anyhow, clap, tracing-subscriber, tracing-log dependencies
- [x] T013 [P] Create `schemas/extension-manifest.json` — JSON Schema for extension manifest validation per contracts/extension-manifest.md
- [x] T014 [P] Create `schemas/operator-definition.json` — JSON Schema for operator definitions per contracts/extension-manifest.md
- [x] T015 [P] Create `schemas/workflow.json` — JSON Schema for workflow definitions per data-model.md Workflow entity
- [x] T016 [P] Create `migrations/001_initial.sql` — SQLite schema for all entities in data-model.md (extensions, operators, workflows, runs, node_executions, artifacts, lineage_edges, workers)
- [x] T017 Update `README.md` with project purpose, architecture overview, build instructions, and license per constitution principle VI
- [x] T018 [P] Create `.cargo/config.toml` with `[build] rustflags = ["-D", "warnings"]` for clippy-as-errors

**Checkpoint**: `cargo check` passes on empty workspace with all crate scaffolds.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story. These are shared types, traits, and subsystems that multiple stories depend on.

**CRITICAL**: No user story work can begin until this phase is complete.

- [x] T019 Implement shared domain types in `crates/nexus-protocol/src/lib.rs` — RuntimeFamily enum, Capability enum, PortType newtype, SemVer re-exports
- [x] T020 [P] Implement protocol message types in `crates/nexus-protocol/src/messages.rs` — Request, Response, Notification, ErrorPayload, HandshakeParams, ExecuteParams, ProgressParams, all per contracts/worker-protocol.md
- [x] T021 [P] Implement Transport trait in `crates/nexus-protocol/src/transport.rs` — async send/receive with associated error type, connection lifecycle
- [x] T022 [P] Implement protocol error types in `crates/nexus-protocol/src/error.rs` — ProtocolError enum with thiserror derives per worker-protocol.md error codes
- [x] T023 [P] Implement EventBus trait and broadcast implementation in `crates/nexus-events/src/bus.rs` — publish, subscribe, subscriber count methods; backed by tokio::sync::broadcast
- [x] T024 [P] Implement event types enum in `crates/nexus-events/src/types.rs` — all Event variants from data-model.md (WorkflowUpdated, RunCreated, RunStateChanged, NodeScheduled, NodeStarted, NodeProgress, NodeCompleted, NodeFailed, ArtifactProduced, WorkerHealthChanged)
- [x] T025 [P] Implement events error types in `crates/nexus-events/src/error.rs` — EventBusError enum
- [x] T026 [P] Implement Database trait in `crates/nexus-storage/src/database.rs` — async trait for CRUD on all entities (extensions, operators, workflows, runs, node_executions, artifacts, lineage_edges)
- [x] T027 Implement SQLite Database in `crates/nexus-storage/src/sqlite.rs` — concrete implementation using sqlx::SqlitePool, connection pool init, migration runner
- [x] T028 [P] Implement storage error types in `crates/nexus-storage/src/error.rs` — StorageError enum
- [x] T029 [P] Implement ArtifactStore trait in `crates/nexus-artifact/src/store.rs` — allocate_write_target, finalize, retrieve_blob_path, delete methods
- [x] T030 Implement filesystem ArtifactStore in `crates/nexus-artifact/src/fs_store.rs` — create directory layout (~/.nexus/artifacts/blobs|manifests|temp|cache), SHA-256 hashing, atomic writes
- [x] T031 [P] Implement artifact manifest types in `crates/nexus-artifact/src/manifest.rs` — ArtifactManifest, LineageEdge structs per data-model.md
- [x] T032 [P] Implement artifact error types in `crates/nexus-artifact/src/error.rs` — ArtifactError enum
- [x] T033 [P] Implement config loading in `crates/nexus-core/src/config.rs` — NexusConfig struct, data_dir (default ~/.nexus), port (default 3000), log_level, from CLI args (clap) and env vars
- [x] T034 Implement data directory initialization in `crates/nexus-core/src/app.rs` — create ~/.nexus/ subdirectories (db, artifacts/blobs, artifacts/manifests, artifacts/temp, artifacts/cache, extensions, logs), wire Database + ArtifactStore + EventBus
- [x] T035 Implement `crates/nexus-core/src/main.rs` — parse config, init tracing, init data dir, start subsystems, start API server, shutdown handling

**Checkpoint**: `cargo build` succeeds. Running binary creates `~/.nexus/` structure, initializes SQLite, and exits cleanly (no API routes yet).

---

## Phase 3: User Story 1 — Platform Developer Initializes Workspace (Priority: P1) MVP

**Goal**: Developer clones repo, builds, runs binary, sees healthy host with all subsystems operational.

**Independent Test**: Run binary with no prior state. Verify `~/.nexus/` created, DB initialized, health endpoint returns all-green.

### Implementation for User Story 1

- [x] T036 [US1] Implement health check subsystem status aggregation in `crates/nexus-core/src/app.rs` — HealthStatus struct with per-subsystem status (database, artifact_store, extension_registry, worker_manager, event_bus), expose via shared state
- [x] T037 [US1] Implement health endpoint handler in `crates/nexus-api/src/handlers/health.rs` — GET /api/v1/health returning HealthStatus JSON per contracts/host-api.md
- [x] T038 [US1] Implement API router skeleton in `crates/nexus-api/src/router.rs` — axum Router with /api/v1 prefix, State extractor for shared AppState, health route mounted
- [x] T039 [US1] Implement AppState struct in `crates/nexus-api/src/lib.rs` — holds Arc references to all subsystem trait objects (Database, ArtifactStore, EventBus, ExtensionRegistry, WorkerManager)
- [x] T040 [US1] Implement API error types in `crates/nexus-api/src/error.rs` — ApiError enum with IntoResponse impl for structured JSON error responses per contracts/host-api.md
- [x] T041 [US1] Wire API server startup in `crates/nexus-core/src/app.rs` — bind to configured port, graceful shutdown on SIGTERM/SIGINT, log startup confirmation with port and subsystem status

**Checkpoint**: `cargo run` starts host, creates `~/.nexus/`, `curl localhost:3000/api/v1/health` returns all-green JSON. US1 is independently functional.

---

## Phase 4: User Story 2 — Extension Author Installs a Local Extension (Priority: P1)

**Goal**: Extension placed in `~/.nexus/extensions/` is discovered, manifest validated against JSON Schema, compatibility checked, operators indexed.

**Independent Test**: Place valid/invalid extensions in directory, start host, query extension registry.

### Implementation for User Story 2

- [x] T042 [P] [US2] Implement extension manifest types in `crates/nexus-extension/src/manifest.rs` — ExtensionManifest, OperatorDefinition, RecipeDefinition, CompatibilityRange structs with serde derives, matching contracts/extension-manifest.md
- [x] T043 [P] [US2] Implement manifest YAML parser in `crates/nexus-extension/src/manifest.rs` — parse_manifest_from_path function using serde-saphyr, returns ExtensionManifest or structured error
- [x] T044 [US2] Implement JSON Schema validation in `crates/nexus-extension/src/manifest.rs` — validate_manifest function embedding schemas/extension-manifest.json via include_str!, validates parsed YAML against schema using jsonschema crate, returns list of validation errors
- [x] T045 [US2] Implement version compatibility checking in `crates/nexus-extension/src/manifest.rs` — check_compatibility function using semver::VersionReq to verify host_api and protocol ranges against current host/protocol versions
- [x] T046 [P] [US2] Implement operator definition parser in `crates/nexus-extension/src/manifest.rs` — parse_operator_definition function loading operator YAML files referenced in manifest, validate against schemas/operator-definition.json
- [x] T047 [P] [US2] Implement ExtensionRegistry trait in `crates/nexus-extension/src/registry.rs` — discover, validate, activate, deactivate, list_extensions, get_extension, list_operators, get_operator methods
- [x] T048 [US2] Implement in-memory ExtensionRegistry in `crates/nexus-extension/src/registry.rs` — scan extensions directory, parse+validate+index each extension, persist to Database, store indexed operators
- [x] T049 [P] [US2] Implement operator index in `crates/nexus-extension/src/operator_index.rs` — OperatorIndex struct for fast lookup by operator_id, by extension_id, by category, detecting duplicate IDs across extensions
- [x] T050 [P] [US2] Implement extension error types in `crates/nexus-extension/src/error.rs` — ExtensionError enum (ManifestParseError, SchemaValidationError, CompatibilityError, DuplicateOperator, IoError)
- [x] T051 [US2] Implement extension API handlers in `crates/nexus-api/src/handlers/extensions.rs` — GET /extensions, GET /extensions/{id}, POST /extensions/{id}/rescan per contracts/host-api.md
- [x] T052 [US2] Implement operator API handlers in `crates/nexus-api/src/handlers/operators.rs` — GET /operators, GET /operators/{id} per contracts/host-api.md
- [x] T053 [US2] Mount extension and operator routes in `crates/nexus-api/src/router.rs`
- [x] T054 [US2] Wire ExtensionRegistry into app startup in `crates/nexus-core/src/app.rs` — scan on startup, log discovered/active/invalid extensions
- [x] T055 [US2] Create example extension in `extensions/examples/hello-world/manifest.yaml` with one echo operator per contracts/extension-manifest.md format
- [x] T056 [P] [US2] Create example operator definition in `extensions/examples/hello-world/operators/echo.yaml` per contracts/extension-manifest.md operator shape

**Checkpoint**: Copy hello-world extension to `~/.nexus/extensions/`. Start host. `curl localhost:3000/api/v1/extensions` lists it. `curl localhost:3000/api/v1/operators` lists echo operator. Invalid manifest in a second extension is rejected with structured errors.

---

## Phase 5: User Story 3 — Host Starts and Handshakes with a Worker (Priority: P1)

**Goal**: Host spawns worker process for activated extension, completes JSON-RPC handshake over stdio, indexes worker operators.

**Independent Test**: Start host with hello-world extension. Verify worker spawned, handshake completed, operator indexed as schedulable.

### Implementation for User Story 3

- [x] T057 [P] [US3] Implement stdio Transport in `crates/nexus-protocol/src/stdio.rs` — StdioTransport struct wrapping tokio ChildStdin/ChildStdout with LinesCodec framing, implements Transport trait, send serializes Request to JSON line, receive deserializes Response/Notification
- [x] T058 [P] [US3] Implement RuntimeFamily trait in `crates/nexus-worker/src/runtime_family.rs` — spawn_worker method returning Transport handle, runtime-family-specific spawn logic (python: spawn python3 with entrypoint arg, native: spawn binary)
- [x] T059 [P] [US3] Implement PythonRuntime in `crates/nexus-worker/src/runtime_family.rs` — concrete RuntimeFamily for python workers, constructs Command with piped stdio, returns StdioTransport
- [x] T060 [US3] Implement WorkerProcess in `crates/nexus-worker/src/process.rs` — wraps tokio::process::Child with Transport, performs handshake sequence (send handshake -> verify response -> send list_operators -> index), health check loop, crash detection via child.wait() in separate task
- [x] T061 [US3] Implement WorkerManager trait in `crates/nexus-worker/src/manager.rs` — start_worker, stop_worker, list_workers, get_worker_for_operator, health_check methods
- [x] T062 [US3] Implement default WorkerManager in `crates/nexus-worker/src/manager.rs` — manages worker pool per extension, spawns on extension activation, routes operators to workers, emits WorkerHealthChanged events to EventBus
- [x] T063 [P] [US3] Implement worker error types in `crates/nexus-worker/src/error.rs` — WorkerError enum (SpawnFailed, HandshakeFailed, ProtocolMismatch, ProcessCrashed, HealthCheckFailed, SendFailed, ReceiveFailed)
- [x] T064 [US3] Wire WorkerManager into app startup in `crates/nexus-core/src/app.rs` — after extension discovery, start workers for active extensions with supported runtime families
- [x] T065 [US3] Create Python worker for hello-world extension in `extensions/examples/hello-world/worker/main.py` — reads JSON-RPC from stdin, responds to handshake + list_operators + execute (echo operator), writes responses to stdout
- [x] T066 [US3] Create Python SDK base in `sdk/python/nexus_sdk/worker.py` — BaseWorker class handling JSON-RPC stdin/stdout loop, method dispatch, progress/log notification helpers
- [x] T067 [P] [US3] Create Python SDK protocol types in `sdk/python/nexus_sdk/protocol.py` — Request, Response, Notification, ErrorPayload dataclasses matching contracts/worker-protocol.md
- [x] T068 [P] [US3] Create `sdk/python/pyproject.toml` with project metadata and no external dependencies

**Checkpoint**: Start host with hello-world extension. Logs show worker spawned, handshake completed, echo operator indexed. Worker crash is detected and logged. Incompatible protocol version is rejected.

---

## Phase 6: User Story 4 — Developer Loads and Validates a Workflow (Priority: P2)

**Goal**: Host parses workflow YAML, validates DAG structure, type-checks port connections, resolves operator bindings.

**Independent Test**: Load valid workflow YAML, verify it parses. Load invalid workflow, verify structured error diagnostics.

### Implementation for User Story 4

- [x] T069 [P] [US4] Implement workflow model types in `crates/nexus-workflow/src/model.rs` — Workflow, NodeInstance, Edge, Stage, Port, PortRef, OutputBinding, OperatorRef structs per data-model.md with serde derives
- [x] T070 [US4] Implement YAML workflow parser in `crates/nexus-workflow/src/parser.rs` — parse_workflow function using serde-saphyr, maps YAML to canonical model types, validates against schemas/workflow.json using jsonschema
- [x] T071 [US4] Implement DAG validation in `crates/nexus-workflow/src/validation.rs` — validate_dag function checking acyclicity (topological sort attempt), no dangling edges, all node IDs unique, all ports exist
- [x] T072 [US4] Implement port type checking in `crates/nexus-workflow/src/validation.rs` — validate_port_types function checking exact type match on every edge (source output type == target input type), reports all mismatches
- [x] T073 [US4] Implement operator binding resolution in `crates/nexus-workflow/src/validation.rs` — resolve_operator_bindings function checking every node's operator_ref resolves to a registered operator in ExtensionRegistry, all required inputs have edges or defaults, config validates against operator config_schema
- [x] T074 [US4] Implement full workflow validation pipeline in `crates/nexus-workflow/src/validation.rs` — validate_workflow function running DAG check + type check + binding resolution, collecting all errors
- [x] T075 [P] [US4] Implement workflow error types in `crates/nexus-workflow/src/error.rs` — WorkflowError enum (ParseError, SchemaError, CycleDetected, DanglingEdge, TypeMismatch, UnknownOperator, MissingRequiredInput, InvalidConfig)
- [x] T076 [US4] Implement workflow mutation operations in `crates/nexus-workflow/src/mutation.rs` — add_node, remove_node, connect_ports, disconnect_ports, update_config, add_stage, move_node_to_stage functions (pure functions returning new Workflow)
- [x] T077 [US4] Implement workflow API handlers in `crates/nexus-api/src/handlers/workflows.rs` — POST /workflows (parse + validate + store), GET /workflows, GET /workflows/{id}, DELETE /workflows/{id} per contracts/host-api.md
- [x] T078 [US4] Mount workflow routes in `crates/nexus-api/src/router.rs`
- [x] T079 [US4] Create example workflow YAML in `extensions/examples/hello-world/workflows/echo-workflow.yaml` — single echo node with text input/output, valid against schema

**Checkpoint**: `curl -X POST localhost:3000/api/v1/workflows -H "Content-Type: application/yaml" --data-binary @echo-workflow.yaml` returns valid workflow with ID. Submitting workflow with type mismatch returns structured error listing the incompatible edge.

---

## Phase 7: User Story 5 — Host Executes a Minimal Workflow End-to-End (Priority: P2)

**Goal**: Trigger run on validated workflow. Host plans, schedules, executes via worker, stores artifacts, records lineage, completes run.

**Independent Test**: Execute echo workflow. Verify run completes, artifact stored, lineage recorded, run queryable with full provenance.

### Implementation for User Story 5

- [x] T080 [P] [US5] Implement run and node state types in `crates/nexus-run/src/state.rs` — RunStatus enum, NodeStatus enum, RunRecord, NodeExecutionRecord structs per data-model.md
- [x] T081 [P] [US5] Implement execution planner in `crates/nexus-scheduler/src/planner.rs` — create_execution_plan function: topological sort of workflow nodes, cache lookup per node (stub for v0), returns ordered list of PlanStep with worker compatibility hints
- [x] T082 [P] [US5] Implement Scheduler trait in `crates/nexus-scheduler/src/scheduler.rs` — schedule_node method: takes PlanStep + available workers, returns WorkerAssignment based on runtime_family match and resource hints
- [x] T083 [US5] Implement default Scheduler in `crates/nexus-scheduler/src/scheduler.rs` — simple round-robin within compatible workers per runtime family
- [x] T084 [P] [US5] Implement scheduler error types in `crates/nexus-scheduler/src/error.rs` — SchedulerError enum (NoCompatibleWorker, PlanningFailed)
- [x] T085 [US5] Implement RunEngine trait in `crates/nexus-run/src/engine.rs` — create_run, execute_run, cancel_run, get_run methods
- [x] T086 [US5] Implement default RunEngine in `crates/nexus-run/src/engine.rs` — create run record, call planner, iterate plan steps, for each: update node status -> schedule to worker -> send execute request via Transport -> receive response -> store artifact manifest + lineage -> update node/run status, emit events to EventBus throughout
- [x] T087 [P] [US5] Implement run error types in `crates/nexus-run/src/error.rs` — RunError enum (WorkflowNotFound, PlanningFailed, SchedulingFailed, ExecutionFailed, WorkerCrashed, Cancelled)
- [x] T088 [US5] Implement worker crash handling in `crates/nexus-run/src/engine.rs` — detect worker crash during execution (Transport receive fails), transition node to failed, transition run to failed, record diagnostics, emit events
- [x] T089 [US5] Implement run API handlers in `crates/nexus-api/src/handlers/runs.rs` — POST /runs (create + start), GET /runs, GET /runs/{id} (full state with nodes, artifacts, timing), POST /runs/{id}/cancel per contracts/host-api.md
- [x] T090 [US5] Implement artifact API handlers in `crates/nexus-api/src/handlers/artifacts.rs` — GET /artifacts/{id}, GET /artifacts/{id}/blob, GET /artifacts/{id}/lineage per contracts/host-api.md
- [x] T091 [US5] Mount run and artifact routes in `crates/nexus-api/src/router.rs`
- [x] T092 [US5] Wire RunEngine + Scheduler into app in `crates/nexus-core/src/app.rs`

**Checkpoint**: POST a run for the echo workflow. Run completes. GET /runs/{id} shows completed status with node timing, artifact references, and provenance. Kill worker mid-run → node and run transition to failed.

---

## Phase 8: User Story 6 — Event Subscribers Receive Live Updates (Priority: P2)

**Goal**: WebSocket clients subscribe to event bus and receive typed events in real time during workflow execution.

**Independent Test**: Connect WebSocket, trigger run, verify ordered event stream (run created -> node scheduled -> node started -> node progress -> node completed -> artifact produced -> run completed).

### Implementation for User Story 6

- [x] T093 [US6] Implement WebSocket event adapter in `crates/nexus-api/src/ws.rs` — axum WebSocketUpgrade handler, subscribes to EventBus, serializes events to JSON, sends to WebSocket, handles client disconnect gracefully (drop subscription without blocking bus)
- [x] T094 [US6] Implement event filtering in `crates/nexus-api/src/ws.rs` — optional query params for event type filter and run_id filter on WebSocket connection
- [x] T095 [US6] Mount WebSocket route at `/api/v1/events` in `crates/nexus-api/src/router.rs`

**Checkpoint**: Connect via `websocat ws://localhost:3000/api/v1/events`. Trigger run. See all events in order. Multiple clients see same events. Disconnect one client — other clients unaffected.

---

## Phase 9: User Story 7 — API Server Exposes Host Capabilities (Priority: P2)

**Goal**: All REST endpoints documented in contracts/host-api.md are functional and return structured responses.

**Independent Test**: Make HTTP requests to every endpoint, verify correct responses and error handling.

### Implementation for User Story 7

- [x] T096 [US7] Implement request logging middleware in `crates/nexus-api/src/router.rs` — tower-http TraceLayer for structured request/response logging
- [x] T097 [US7] Implement CORS middleware in `crates/nexus-api/src/router.rs` — tower-http CorsLayer allowing localhost origins for frontend dev
- [x] T098 [US7] Implement API versioning structure in `crates/nexus-api/src/router.rs` — nest all routes under /api/v1, expose version in health response
- [x] T099 [US7] Add Content-Type validation for workflow POST in `crates/nexus-api/src/handlers/workflows.rs` — accept application/yaml, reject others with 400
- [x] T10- [ ] T100  [US7] Add pagination support to list endpoints in `crates/nexus-api/src/extractors.rs` — PaginationParams extractor (offset, limit with defaults), apply to GET /extensions, GET /operators, GET /workflows, GET /runs

**Checkpoint**: All 14 endpoints from contracts/host-api.md respond correctly. Error responses match the documented JSON format. CORS allows frontend access.

---

## Phase 10: User Story 8 — Frontend Scaffold Renders Workflow State (Priority: P3)

**Goal**: Minimal React app connects to host, shows extensions/operators, renders read-only stage view, displays live run progress.

**Independent Test**: Start host with workflow loaded. Open frontend. See extensions, stages, trigger run, watch live progress.

### Implementation for User Story 8

- [x] T101 [US8] Initialize React project in `apps/web/` — Vite + React + TypeScript, package.json, tsconfig.json, index.html
- [x] T102 [P] [US8] Implement API client in `apps/web/src/api/client.ts` — typed fetch wrapper for all host-api endpoints (health, extensions, operators, workflows, runs, artifacts)
- [x] T103 [P] [US8] Implement WebSocket hook in `apps/web/src/hooks/use_event_stream.ts` — connects to /api/v1/events, parses typed events, exposes event stream to components, handles reconnection
- [x] T104 [US8] Implement extensions list component in `apps/web/src/components/extensions_list.tsx` — fetches and displays installed extensions with status, operator count
- [x] T105 [US8] Implement operators list component in `apps/web/src/components/operators_list.tsx` — fetches and displays indexed operators with ports and categories
- [x] T106 [US8] Implement stage view component in `apps/web/src/components/stage_view.tsx` — fetches workflow, renders stages as columns with nodes inside, shows edges between nodes as lines
- [x] T107 [US8] Implement run progress component in `apps/web/src/components/run_progress.tsx` — displays live run status, per-node progress bars using event stream, final artifact links
- [x] T108 [US8] Implement app layout in `apps/web/src/main.tsx` — sidebar with extensions/operators, main area with stage view and run controls, bottom panel with run progress

**Checkpoint**: `npm run dev` in apps/web/. Browser shows extensions, operators, workflow stages. Click "Run" → live progress appears. Run completes → artifacts shown.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, testing infrastructure, CI readiness, and final cleanup.

- [x] T109 [P] Update `README.md` with full architecture overview, crate descriptions, quickstart from specs/001-arch-core-setup/quickstart.md, contribution guidelines, license section per constitution principle VI
- [x] T110 [P] Add integration test `tests/integration/extension_lifecycle.rs` — test extension discovery, validation of valid manifest, rejection of invalid manifest, operator indexing
- [x] T111 [P] Add integration test `tests/integration/workflow_validation.rs` — test workflow parsing, DAG validation, type checking, operator binding resolution for valid and invalid workflows
- [x] T112 [P] Add integration test `tests/integration/run_execution.rs` — test end-to-end run with echo workflow, verify run states, node states, artifact creation, lineage recording
- [x] T113 Run `cargo fmt --check` across entire workspace and fix any formatting issues
- [x] T114 Run `cargo clippy` across entire workspace and fix all warnings
- [x] T115 Run `cargo test` across entire workspace and verify all tests pass
- [x] T116 Verify health endpoint, extension listing, workflow submission, run execution, and event streaming work end-to-end per quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — health + API skeleton
- **US2 (Phase 4)**: Depends on Phase 2 — extension system
- **US3 (Phase 5)**: Depends on US2 — needs active extensions to spawn workers for
- **US4 (Phase 6)**: Depends on US2 — needs operator registry for binding resolution
- **US5 (Phase 7)**: Depends on US3 + US4 — needs workers + validated workflows
- **US6 (Phase 8)**: Depends on US5 — needs running executions to stream events from
- **US7 (Phase 9)**: Depends on US1-US6 — polishes all endpoints
- **US8 (Phase 10)**: Depends on US7 — needs functional API
- **Polish (Phase 11)**: Depends on all user stories

### User Story Dependencies

```text
Phase 2 (Foundational)
  ├── US1 (health/API)     ← independent
  ├── US2 (extensions)     ← independent
  │     └── US3 (workers)  ← depends on US2
  │     └── US4 (workflow)  ← depends on US2
  │           └── US5 (runs) ← depends on US3 + US4
  │                 └── US6 (events) ← depends on US5
  │                       └── US7 (API polish) ← depends on US1-US6
  │                             └── US8 (frontend) ← depends on US7
  └── Polish               ← depends on all
```

### Within Each User Story

- Models/types before services/traits
- Traits before concrete implementations
- Error types in parallel with anything
- API handlers after service implementations
- Route mounting after handlers

### Parallel Opportunities

**Phase 1** — ALL tasks T002-T018 are parallelizable (independent files)

**Phase 2** — T020-T025, T028-T032 are parallelizable within the phase

**Phase 4 (US2)** — T042, T043, T046, T049, T050, T055, T056 are parallelizable

**Phase 5 (US3)** — T057, T058, T059, T063, T067, T068 are parallelizable

**Phase 6 (US4)** — T069, T075 are parallelizable; T071-T073 are sequential

**Phase 7 (US5)** — T080, T081, T082, T084, T087 are parallelizable

**Phase 11** — T109-T112 are all parallelizable

---

## Implementation Strategy

### MVP First (US1 + US2 + US3)

1. Complete Phase 1: Setup (workspace scaffolding)
2. Complete Phase 2: Foundational (shared types, DB, artifact store, event bus)
3. Complete Phase 3: US1 (health endpoint, API skeleton)
4. Complete Phase 4: US2 (extension discovery and validation)
5. Complete Phase 5: US3 (worker handshake)
6. **STOP AND VALIDATE**: Host boots, discovers extensions, spawns workers, health is green

### Full Execution Pipeline

7. Complete Phase 6: US4 (workflow model + validation)
8. Complete Phase 7: US5 (run engine end-to-end)
9. Complete Phase 8: US6 (event streaming)
10. Complete Phase 9: US7 (API polish)

### Frontend Layer

11. Complete Phase 10: US8 (React scaffold)
12. Complete Phase 11: Polish

---

## Notes

- [P] tasks = different files, no dependencies
- [USn] label maps task to specific user story
- Each user story is independently testable at its checkpoint
- Commit after each task or logical group
- Stop at any checkpoint to validate
- No test tasks generated (not explicitly requested in spec)
