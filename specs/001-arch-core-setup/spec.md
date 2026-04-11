# Feature Specification: Architecture Core Setup

**Feature Branch**: `001-arch-core-setup`
**Created**: 2026-04-11
**Status**: Draft
**Input**: User description: "Setting up the architecture and the main app and make it extendable. Rust mono-repo with trait-first crate boundaries, core host runtime, transport abstraction, event bus, protocol types, and minimal frontend scaffold."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Platform Developer Initializes Workspace (Priority: P1)

A developer clones the nexus-dnn repository and runs the host binary for the first time. The host creates its data directory at `~/.nexus/`, initializes the metadata database, creates the artifact storage layout, and starts listening for API connections. The developer sees a startup log confirming all subsystems are healthy.

**Why this priority**: Without a bootable host runtime, nothing else in the platform can function. This is the foundation for every subsequent feature.

**Independent Test**: Run the compiled binary with no prior state. Verify `~/.nexus/` is created with expected subdirectories, the metadata database is initialized, and the host reports ready status.

**Acceptance Scenarios**:

1. **Given** a clean machine with no `~/.nexus/` directory, **When** the host binary starts, **Then** it creates `~/.nexus/db/`, `~/.nexus/artifacts/blobs/`, `~/.nexus/artifacts/manifests/`, `~/.nexus/artifacts/temp/`, `~/.nexus/artifacts/cache/`, `~/.nexus/extensions/`, and `~/.nexus/logs/`, initializes a SQLite metadata database, and prints a startup confirmation to stdout.
2. **Given** an existing `~/.nexus/` directory from a previous run, **When** the host binary starts, **Then** it reuses the existing data directory without data loss and reports ready status.
3. **Given** the host binary is running, **When** a developer sends an HTTP health check request, **Then** the host responds with a structured status indicating all subsystems are operational.

---

### User Story 2 - Extension Author Installs a Local Extension (Priority: P1)

An extension author places an extension package (containing a YAML manifest, operator definitions, and a runtime entrypoint) into the extensions directory. The host discovers the extension, validates its manifest against the JSON Schema, checks host API and protocol compatibility, indexes its operators, and reports the extension as available.

**Why this priority**: The extension system is the primary extensibility mechanism. Proving that manifests can be loaded, validated, and indexed is essential to the platform's core value proposition.

**Independent Test**: Place a valid example extension in the extensions directory. Start the host. Query the extension registry and verify the extension and its operators appear. Then place an invalid extension and verify it is rejected with a clear error.

**Acceptance Scenarios**:

1. **Given** a valid extension package in `~/.nexus/extensions/`, **When** the host starts or rescans, **Then** the host parses the manifest, validates it against the extension JSON Schema, checks `compatibility.hostApi` and `compatibility.protocol` ranges, indexes all declared operators, and marks the extension as active.
2. **Given** an extension with an incompatible `hostApi` range, **When** the host validates it, **Then** the host rejects activation with a structured error identifying the version mismatch.
3. **Given** an extension with a malformed manifest (missing required fields), **When** the host validates it, **Then** the host rejects it with a structured error listing the missing fields.
4. **Given** an extension with duplicate operator IDs within the same version, **When** the host validates it, **Then** the host rejects it with a clear error.

---

### User Story 3 - Host Starts and Handshakes with a Worker (Priority: P1)

The host spawns a worker process for an activated extension's runtime family. The host and worker perform a protocol handshake over the transport layer (JSON-RPC over stdio as the first implementation). The worker reports its available operators. The host registers the worker as healthy and ready to receive execution requests.

**Why this priority**: Without worker lifecycle management and protocol communication, no operator can ever execute. This proves the transport abstraction and protocol layers work end-to-end.

**Independent Test**: Start the host with a minimal example extension. Verify the host spawns a worker, completes the handshake, and the worker's operators appear as schedulable.

**Acceptance Scenarios**:

1. **Given** an activated extension with a declared runtime family, **When** the host starts the worker, **Then** the worker process is spawned with the declared entrypoint, the host sends a `handshake` request with protocol and host versions, and the worker responds with confirmation.
2. **Given** a successful handshake, **When** the host sends a `list_operators` request, **Then** the worker responds with its operator contracts and the host indexes them.
3. **Given** a worker that crashes during handshake, **When** the host detects the failure, **Then** the host marks the worker as unhealthy, emits a structured event, and does not schedule work to it.
4. **Given** a worker with an incompatible protocol version, **When** the handshake is attempted, **Then** the host rejects the connection and logs the version mismatch.

---

### User Story 4 - Developer Loads and Validates a Workflow (Priority: P2)

A developer provides a workflow definition file (YAML). The host parses it into the canonical workflow model, validates node-operator bindings, port type compatibility on edges, stage grouping integrity, and reports validation results. Invalid workflows produce structured error diagnostics.

**Why this priority**: The workflow engine is the heart of the platform. Validating that workflows can be loaded, type-checked, and represented as a typed DAG is a prerequisite for execution.

**Independent Test**: Load a valid workflow YAML and verify it parses without errors. Load a workflow with type-incompatible edges and verify the host reports the specific validation failure.

**Acceptance Scenarios**:

1. **Given** a valid workflow YAML file with typed nodes, edges, stages, and declared inputs/outputs, **When** the host loads it, **Then** the workflow is parsed into the canonical model, all node-operator bindings are resolved, port types on edges are validated as compatible, and the workflow is stored in the metadata database.
2. **Given** a workflow with an edge connecting incompatible port types, **When** the host validates it, **Then** validation fails with a structured error identifying the incompatible edge, the source port type, and the target port type.
3. **Given** a workflow referencing an operator ID that is not registered, **When** the host validates it, **Then** validation fails with a structured error identifying the unknown operator.

---

### User Story 5 - Host Executes a Minimal Workflow End-to-End (Priority: P2)

A developer triggers a run on a validated workflow. The host creates a run record, computes an execution plan (topological order, cache evaluation), schedules nodes to compatible workers, sends execution requests via the transport layer, receives artifact references and completion events, records lineage, and marks the run as completed.

**Why this priority**: This proves the full execution pipeline works together.

**Independent Test**: Execute a two-node workflow (e.g., load image then resize). Verify the run completes, artifacts are stored, lineage is recorded, and the run can be queried with full metadata.

**Acceptance Scenarios**:

1. **Given** a validated two-node workflow and a healthy worker, **When** a run is triggered, **Then** the host creates a run record, plans execution in topological order, schedules each node to a compatible worker, the worker produces output artifacts, the host records artifact manifests and lineage edges, and the run transitions to `completed`.
2. **Given** a running workflow where a worker crashes mid-execution, **When** the host detects the worker failure, **Then** the affected node transitions to `failed`, the run transitions to `failed`, structured diagnostics are recorded, and previously produced artifacts remain intact.
3. **Given** a completed run, **When** the developer queries the run, **Then** the response includes the workflow version, operator versions, extension versions, input artifacts, output artifacts, node timings, and cache hit/miss status for each node.

---

### User Story 6 - Event Subscribers Receive Live Updates (Priority: P2)

A consumer (CLI tool, future web UI, or test harness) subscribes to the event bus. As the host processes workflows, manages workers, and executes runs, the subscriber receives typed events in real time.

**Why this priority**: Observability is a core product goal. Proving the event bus works with at least one adapter enables all future UI and tooling integrations.

**Independent Test**: Start the host, connect a WebSocket client, trigger a run, and verify the client receives the expected sequence of events.

**Acceptance Scenarios**:

1. **Given** a WebSocket client connected to the event bus, **When** a run executes, **Then** the client receives events for each run state transition and node execution state change in order.
2. **Given** multiple WebSocket clients subscribed, **When** an event is emitted, **Then** all connected clients receive the event.
3. **Given** no subscribers are connected, **When** events are emitted, **Then** the host does not block or error.

---

### User Story 7 - API Server Exposes Host Capabilities (Priority: P2)

A developer or frontend application interacts with the host through a structured HTTP API. The API exposes endpoints for health checks, listing installed extensions, listing operators, loading workflows, triggering runs, querying run status, and subscribing to the event stream via WebSocket upgrade.

**Why this priority**: The API layer is the boundary between the host and all consumers.

**Independent Test**: Start the host, make HTTP requests to each endpoint, and verify correct responses.

**Acceptance Scenarios**:

1. **Given** the host is running, **When** a client sends `GET /health`, **Then** the host responds with subsystem status.
2. **Given** installed extensions with operators, **When** a client sends `GET /extensions`, **Then** the host responds with a list of extensions and their metadata.
3. **Given** installed extensions with operators, **When** a client sends `GET /operators`, **Then** the host responds with indexed operators including their input/output port types and config schemas.
4. **Given** a valid workflow, **When** a client sends `POST /workflows` with the workflow definition, **Then** the host validates, stores, and returns the workflow ID.
5. **Given** a stored workflow, **When** a client sends `POST /runs` with the workflow ID, **Then** the host creates a run, begins execution, and returns the run ID.
6. **Given** a running or completed run, **When** a client sends `GET /runs/{id}`, **Then** the host responds with full run state including node statuses, artifacts, and timing.

---

### User Story 8 - Frontend Scaffold Renders Workflow State (Priority: P3)

A developer opens the web UI in a browser. The frontend connects to the host API, fetches installed extensions and operators, and renders a basic stage view of a loaded workflow. The frontend subscribes to the event bus and displays live run progress.

**Why this priority**: The frontend is the primary product surface but depends on all backend systems. A minimal scaffold proves the API contract and event stream work from a real consumer.

**Independent Test**: Start the host with a loaded workflow. Open the frontend. Verify extensions and operators are listed, the workflow stages are rendered, and triggering a run shows live progress.

**Acceptance Scenarios**:

1. **Given** the host is running with loaded extensions, **When** the frontend loads, **Then** it displays the list of installed extensions and available operators.
2. **Given** a workflow is loaded in the host, **When** the frontend fetches it, **Then** it renders a read-only stage view showing stages, nodes, and their connections.
3. **Given** a run is in progress, **When** the frontend is connected via WebSocket, **Then** it displays live progress updates for each node.

---

### Edge Cases

- Host starts with a corrupted SQLite database — detect and offer recovery or re-initialization
- Extension manifest references a runtime family not yet supported — reject with a clear error, not crash
- Workflow references an operator from a disabled/uninstalled extension — fail validation with a specific error
- Worker process is killed by the OS (OOM) during execution — host detects, marks node as failed, does not hang
- Two extensions declare the same operator ID — host rejects the second with a conflict error
- Artifact storage runs out of disk space during a write — worker reports a structured failure, host handles gracefully
- WebSocket client disconnects mid-run — event bus cleans up the subscriber without affecting the run
- Host receives a malformed JSON-RPC message from a worker — logs the error, does not crash

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The host MUST create and manage its data directory at a configurable location (default `~/.nexus/`) with structured subdirectories for database, artifacts, extensions, and logs
- **FR-002**: The host MUST initialize and manage a SQLite metadata database for persisting extension records, operator indexes, workflow definitions, run state, artifact manifests, and lineage edges
- **FR-003**: The host MUST provide a filesystem-backed artifact store with content-organized layout for blobs, manifests, temporary files, and cache entries
- **FR-004**: The host MUST discover, parse, and validate extension manifests from the extensions directory using JSON Schema validation
- **FR-005**: The host MUST enforce host API version and protocol version compatibility checks during extension activation
- **FR-006**: The host MUST index operators from activated extensions and make them queryable
- **FR-007**: The host MUST manage worker process lifecycles including spawning, health checking, and termination
- **FR-008**: The host MUST implement a transport abstraction layer with JSON-RPC over stdio as the first concrete implementation
- **FR-009**: The host MUST implement the host-worker protocol including handshake, list_operators, validate_config, execute, cancel, and health_check operations
- **FR-010**: The host MUST parse workflow definitions from YAML into a canonical typed DAG model with nodes, edges, stages, inputs, and outputs
- **FR-011**: The host MUST validate workflow graphs including port type compatibility, operator binding resolution, and structural integrity (DAG property, no dangling edges)
- **FR-012**: The host MUST compute execution plans from workflow graphs using topological ordering
- **FR-013**: The host MUST schedule planned nodes to compatible workers based on runtime family and resource hints
- **FR-014**: The host MUST track run lifecycle states (created, queued, planning, running, paused, failed, cancelled, completed) and node execution states (pending, cache_hit, scheduled, starting, running, produced_output, failed, cancelled)
- **FR-015**: The host MUST record artifact manifests, lineage edges, and provenance metadata for every produced output
- **FR-016**: The host MUST provide a typed event bus that broadcasts state changes to internal and external subscribers
- **FR-017**: The host MUST expose a WebSocket adapter for the event bus
- **FR-018**: The host MUST expose an HTTP API for health checks, extension listing, operator listing, workflow management, run management, and event stream subscription
- **FR-019**: The host MUST persist enough run state to support querying completed and failed runs with full metadata
- **FR-020**: The host MUST handle worker crashes gracefully without crashing the host process
- **FR-021**: Each crate MUST expose its core functionality through a trait interface to enable alternative implementations and testing
- **FR-022**: Each crate MUST define domain-specific error types using typed error enums
- **FR-023**: A minimal frontend scaffold MUST connect to the host API, display extensions/operators, render a read-only stage view, and show live run progress via WebSocket

### Key Entities

- **Extension**: Installable package with identity, version, compatibility ranges, runtime family, capability declarations, and operator/recipe references
- **Operator**: Executable capability with identity, version, typed input/output ports, config schema, execution hints, and resource requirements
- **Workflow**: Typed DAG containing node instances, edges between ports, stage groupings, workflow-level inputs/outputs, and version metadata
- **Run**: Concrete execution instance of a workflow with lifecycle state, node execution states, timing data, and artifact references
- **Artifact**: Typed produced or consumed asset with manifest (identity, type, hash, lineage reference), stored as blob + metadata
- **Worker**: Supervised process serving one or more operators for a runtime family, with health state and capability set
- **Event**: Typed state change notification (workflow updated, run state transition, node progress, artifact produced, worker health change)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer can go from a fresh clone to a running host with healthy subsystems in under 5 minutes (build + first start)
- **SC-002**: A valid extension placed in the extensions directory is discovered, validated, and its operators indexed within 2 seconds of host start or rescan
- **SC-003**: An invalid extension manifest produces a structured error message identifying all validation failures within 1 second
- **SC-004**: A workflow with 10 nodes validates (type checking, operator binding, DAG verification) within 1 second
- **SC-005**: A two-node workflow executes end-to-end (plan, schedule, execute, store artifacts, record lineage) with a test worker in under 10 seconds
- **SC-006**: An event subscriber receives run state transitions within 100 milliseconds of occurrence
- **SC-007**: A worker crash during execution results in the affected node and run transitioning to failed state within 5 seconds, with no host crash
- **SC-008**: The host supports at least 10 concurrent WebSocket event subscribers without degradation
- **SC-009**: Every produced artifact is queryable by run ID and includes full provenance (workflow version, operator versions, extension versions, input artifacts, config values)
- **SC-010**: Each core crate (workflow-model, scheduler, worker-manager, artifact-store, extension-registry, protocol, event-bus) compiles and passes tests independently

## Assumptions

- The host runs on a single machine for v0 — no distributed scheduling or remote workers
- One workspace is active at a time
- No multi-user authentication model is needed for v0
- The Python runtime family is the primary worker runtime for v0, with native runtime as a secondary target
- SQLite is sufficient for metadata storage at v0 scale (thousands of runs, hundreds of extensions)
- The filesystem is the only artifact payload storage backend for v0
- Workers communicate with the host via local stdio — no network transport in v0
- The frontend scaffold is read-only for this sprint — no graph editing or recipe authoring
- Extension packages are installed by placing them in the extensions directory — no package manager or registry in v0
- Port type compatibility uses exact string matching in v0 — no implicit coercions
- Cache evaluation is host-owned — extensions provide hints but the host decides
- The host binary name is `nexus-dnn` and the data directory default is `~/.nexus/`
