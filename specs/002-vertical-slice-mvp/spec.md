# Feature Specification: Vertical Slice MVP

**Feature Branch**: `002-vertical-slice-mvp`
**Created**: 2026-04-11
**Status**: Draft
**Input**: 15-document requirements pack (nexus-vertical-slice-requirements-v3) covering scope, boundaries, functional requirements, domain model, extension system, UI contributions, API surface, runtime protocol, storage, workflow editing, frontend design tokens, acceptance criteria, and backlog.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Extension Discovery, Validation & UI Contribution Indexing (Priority: P1)

A user places an extension package (with manifest, operator definitions, recipe definitions, and UI contribution metadata) into the local extensions directory. On host startup or explicit refresh, the host discovers the package, validates the manifest against the v0 schema, checks host API and protocol compatibility ranges, validates all referenced operator, recipe, and UI contribution files, and transitions the extension through its state model (discovered -> valid -> active). The host indexes operators, recipes, and UI contributions and exposes them through normalized API endpoints. Invalid extensions are rejected with structured diagnostics and enter the invalid or quarantined state.

**Why this priority**: The extension registry is the foundation for every other capability. Without discoverable, validated extensions, no operators exist, no recipes exist, no workflows can bind to anything, and no UI contributions can be surfaced. This proves the core installability contract.

**Independent Test**: Place a valid example extension with operators, a recipe, and UI contributions in the extensions directory. Start the host. Query `/extensions`, `/operators`, `/recipes`, `/tools`, and `/ui/contributions` endpoints. Verify all records appear with normalized metadata. Place an invalid extension alongside it and verify rejection with structured errors.

**Acceptance Scenarios**:

1. **Given** a valid extension pack in the extensions directory, **When** the host starts, **Then** the extension is discovered, validated, activated, and its operators, recipes, and UI contributions are returned by the corresponding API endpoints with normalized metadata including display name, category, tags, and availability status.
2. **Given** an extension with an incompatible host API range, **When** the host validates it, **Then** the extension enters the invalid state with a structured error identifying the version mismatch, and the extension appears in the extensions list with state `invalid` and `validationErrors` populated.
3. **Given** an active extension, **When** the host receives a disable request, **Then** the extension transitions to disabled without deleting historical run records that reference it.
4. **Given** an active extension with UI contribution metadata (artifact viewer, command, config widget, inspector panel), **When** the frontend queries UI contributions, **Then** all contribution records are returned with kind, target type, supported types, priority, and availability.
5. **Given** an active extension with a recipe, **When** the frontend queries `/recipes`, **Then** the recipe appears with display name, summary, category, thumbnail reference, workflow template reference, and input summary.
6. **Given** an active extension, **When** the frontend queries `/tools`, **Then** the operator is surfaced as a tool with normalized id, kind, target id, display name, category, tags, icon, and availability.

---

### User Story 2 - Worker Launch, Handshake & Protocol Lifecycle (Priority: P1)

The host launches a Python worker process for an activated extension using the manifest-declared entrypoint. The host and worker perform a versioned JSON-RPC handshake over stdio. The worker reports its protocol version, runtime family, extension identity, session id, runtime info, and supported methods. The host verifies compatibility and indexes the worker's operators. The host periodically health-checks the worker. If the worker crashes, the host detects the failure, marks the worker unhealthy, updates affected node and run states, and preserves diagnostics.

**Why this priority**: Without a functional worker protocol, no operator can execute. This proves the runtime boundary, process supervision, and fault containment that keep the host stable regardless of extension behavior.

**Independent Test**: Start the host with the example Python extension. Verify the worker spawns, handshake completes with correct identity fields, operators are listed. Kill the worker process externally and verify the host detects the crash, marks the worker unhealthy, and remains operational.

**Acceptance Scenarios**:

1. **Given** an activated Python extension, **When** the host launches the worker, **Then** the host sends a handshake request, the worker responds with protocol version, runtime family, extension identity, session id, and supported methods, and the host verifies protocol compatibility.
2. **Given** a successful handshake, **When** the host sends `list_operators`, **Then** the worker responds with its operator contracts and the host indexes them as schedulable.
3. **Given** a running worker, **When** the host sends `validate_config` for an operator, **Then** the worker validates runtime-specific constraints beyond schema-level validation and returns valid/invalid with errors.
4. **Given** a running worker, **When** the host sends a `health_check`, **Then** the worker responds with liveness status.
5. **Given** a worker that crashes unexpectedly, **When** the host detects the exit, **Then** the host marks the worker unhealthy, emits a worker health event, updates any in-flight node to failed, updates the run to failed, and preserves logs and diagnostics.
6. **Given** a worker with an incompatible protocol version, **When** the handshake is attempted, **Then** the host fails fast, logs the mismatch, and does not schedule work to the worker.

---

### User Story 3 - Workflow Validation, Execution & Run Lifecycle (Priority: P1)

A user submits a workflow definition. The host validates the schema, DAG structure (no cycles), typed port compatibility on all edges, operator reference resolution, required input bindings, and config schema conformance. On success, the host persists the workflow. The user then creates a run with input bindings. The host computes execution order, resolves operator availability, assigns artifact write targets, and executes nodes sequentially through workers. Workers report progress events, the host emits them to subscribers, and on completion the host finalizes artifact manifests, records lineage, and marks the run complete. On failure, structured error payloads are captured and the run transitions appropriately.

**Why this priority**: This is the core execution pipeline — the entire reason the platform exists. It proves that workflows are validated, executed, and produce traceable outputs.

**Independent Test**: Submit the example workflow via API. Create a run with input bindings. Verify the run progresses through created -> planning -> running -> completed. Verify each node transitions through its states. Verify output artifacts are registered with manifests. Verify provenance is queryable. Submit an invalid workflow and verify structured validation errors.

**Acceptance Scenarios**:

1. **Given** a valid workflow YAML, **When** submitted to the validation endpoint, **Then** the host returns valid=true with a normalized summary including node count, stage count, and input/output declarations.
2. **Given** a workflow with a type-incompatible edge, **When** submitted for validation, **Then** the host returns valid=false with structured errors identifying the specific edge, source type, and target type.
3. **Given** a valid workflow and valid input bindings, **When** a run is created, **Then** the host creates a run record, computes execution order, verifies operator availability, and begins execution.
4. **Given** an executing run, **When** each node executes, **Then** the host transitions the node through pending -> scheduled -> starting -> running -> produced_output, emits events at each transition, and the worker emits progress notifications with percent and message.
5. **Given** a completed node, **When** the worker reports completion with output artifact references, **Then** the host finalizes the artifact manifest, records lineage edges linking inputs to outputs, and updates the node status.
6. **Given** a failed node, **When** the worker returns a structured error, **Then** the host maps the error to a node failure, transitions the run to failed, and preserves the error code, category, message, and retryable flag.
7. **Given** a completed run, **When** the user queries run detail, **Then** the response includes workflow version, extension versions, operator versions, node configs, input artifacts, output artifacts, timing metrics, and cache hit/miss status.

---

### User Story 4 - Artifact Registration, Browsing & Provenance (Priority: P1)

Every successful node output becomes a first-class artifact with a typed manifest, storage location, content hash, producer node reference, and run reference. Artifacts are browsable through the API with filtering by run, type, and producer node. Artifact detail responses include enough metadata for the frontend to select an appropriate viewer (using extension-contributed viewer metadata). Artifact content is streamable. Provenance is traceable: given any artifact, the system reveals the full chain of inputs, operator versions, configs, and extension versions that produced it.

**Why this priority**: Artifacts and provenance are the primary user-facing outputs. Without them, the platform produces no inspectable, traceable results.

**Independent Test**: Execute the example workflow. Query `/artifacts` filtered by run ID. Verify artifact records include type, manifest, content hash, and producer node. Query `/artifacts/{id}` and verify viewer candidates are included. Query provenance and verify the lineage chain is complete. Stream the artifact content via `/artifacts/{id}/content`.

**Acceptance Scenarios**:

1. **Given** a successful node output, **When** the worker completes, **Then** the host registers an artifact record with id, type, storage location, content hash, size, manifest metadata, and producer node reference.
2. **Given** registered artifacts, **When** the frontend queries `/artifacts` with optional run ID, type, or producer node filters, **Then** matching artifact summaries are returned.
3. **Given** an artifact, **When** the frontend queries artifact detail, **Then** the response includes manifest metadata, lineage summary, and viewer candidates (from host default viewers plus extension-contributed viewers ordered by priority).
4. **Given** an artifact, **When** the frontend requests artifact content, **Then** the host streams the binary payload with appropriate content type.
5. **Given** a completed run, **When** the user inspects an output artifact, **Then** the system shows the workflow version, operator version, extension version, input artifacts, and config values that produced it.

---

### User Story 5 - Event Streaming & Structured Observability (Priority: P2)

The host emits structured events for every significant state change: extension discovery, validation, worker lifecycle, run creation, run state transitions, node scheduling, node execution, node progress, node completion, node failure, and artifact production. Events are streamed to connected clients via WebSocket. The host also emits structured logs for all of these categories.

**Why this priority**: Observability is essential for debugging and UX. Without live events, the frontend cannot show real-time progress and the platform feels opaque.

**Independent Test**: Connect a WebSocket client to the event stream. Trigger an extension refresh and verify extension events appear. Start a run and verify the full event sequence: run.created, run.state_changed, node.scheduled, node.started, node.progress, node.completed, artifact.produced, run.state_changed(completed).

**Acceptance Scenarios**:

1. **Given** a WebSocket client subscribed to the event stream, **When** a run executes, **Then** the client receives all run and node lifecycle events in order with timestamps.
2. **Given** an extension discovery, **When** extensions are scanned, **Then** extension.discovered, extension.validated (or extension.invalid), and worker.started events are emitted.
3. **Given** a worker health change, **When** the worker becomes unhealthy, **Then** a worker.unhealthy event is emitted.
4. **Given** multiple WebSocket clients, **When** events are emitted, **Then** all connected clients receive every event.
5. **Given** no subscribers, **When** events are emitted, **Then** the host does not block or error.

---

### User Story 6 - Complete Host API Surface (Priority: P2)

The host exposes a comprehensive HTTP JSON API under `/api/v1` with consistent response envelopes, structured error payloads, and versioned endpoints. The API covers: health/system info, extensions (list, detail, refresh, enable, disable), operators (list, detail, filtered by category/extension/runtime), tools (normalized projection over operators and recipes), recipes (list, detail), UI contributions (list by kind, viewers, commands, inspectors, widgets), workflows (list, detail, validate, create, update), runs (list, detail, create, cancel, retry), artifacts (list, detail, content, provenance), and event streaming. All responses use a consistent envelope with data, meta (timestamp), and error fields.

**Why this priority**: The API is the contract between the host and all consumers (frontend, CLI, external tools). Every other story depends on a complete, well-structured API.

**Independent Test**: Make HTTP requests to every P0 and P1 endpoint. Verify correct response shapes, error envelopes, status codes, and pagination. Verify the system info endpoint returns host version, API version, supported runtime families, and supported spec versions.

**Acceptance Scenarios**:

1. **Given** the host is running, **When** a client sends `GET /health`, **Then** the response includes status, host version, protocol version, extension scan status, database status, and artifact store status.
2. **Given** the host is running, **When** a client sends `GET /system/info`, **Then** the response includes host version, API version, supported runtime families, supported spec versions, and workspace path.
3. **Given** active extensions, **When** a client queries operators with category and extension ID filters, **Then** only matching operators are returned with full metadata including input ports, output ports, config schema summary, execution hints, and availability.
4. **Given** a workflow submission with validation only, **When** a client sends `POST /workflows/validate`, **Then** the response includes valid boolean, errors, warnings, and normalized summary without persisting.
5. **Given** any API error, **When** the error occurs, **Then** the response uses the structured envelope with code, category, message, and optional details.

---

### User Story 7 - Frontend Shell, Token System & Core Views (Priority: P2)

A user opens the web UI and sees a professional dark-themed pipeline studio with three zones: left rail (navigation, workflow library, tool catalog, recipes, extensions), center canvas (stage view by default, graph view, run trace, artifact views), and right inspector (selected item details, node config, artifact metadata, run diagnostics). The entire UI is built on a token-based design system with semantic tokens for colors, typography, spacing, radius, shadows, blur, motion, and z-index. Extension-contributed UI surfaces inherit host tokens and visually integrate. The frontend fetches all capabilities dynamically from host APIs — nothing is hardcoded.

**Why this priority**: The frontend is the primary product surface. A token-based design system ensures visual coherence, theme switching, and extension surface integration from day one.

**Independent Test**: Open the web UI. Verify the three-zone shell renders. Verify the extension list, operator catalog, and recipe list are populated from host APIs. Load a workflow and verify the stage view renders stages with nodes. Start a run and verify live progress appears. Inspect an artifact and verify viewer selection uses contribution metadata.

**Acceptance Scenarios**:

1. **Given** the host is running with extensions, **When** the frontend loads, **Then** it renders the three-zone shell with left rail navigation, center canvas, and right inspector.
2. **Given** the default dark theme, **When** the UI renders, **Then** all surfaces use semantic tokens — no hardcoded one-off color values exist in feature components.
3. **Given** a loaded workflow, **When** the user views the stage view, **Then** stages are rendered in order with nodes inside each stage showing basic input/output relationships and per-node run status during execution.
4. **Given** a loaded workflow, **When** the user switches to graph view, **Then** nodes and edges are displayed with stage grouping visible, in read-only mode.
5. **Given** an executing run, **When** the frontend subscribes to events, **Then** the run trace view shows node state changes, progress messages, and final outputs in real time.
6. **Given** produced artifacts, **When** the user opens the artifact browser, **Then** artifacts are listed with type, producer, and run reference, and selecting an artifact shows its detail with viewer candidates from contribution metadata.
7. **Given** extension-contributed UI surfaces, **When** they render, **Then** they inherit host theme tokens and do not visually break the shell.

---

### User Story 8 - Example Image Extension & End-to-End Demo Flow (Priority: P2)

The repository includes a complete example Python extension pack (`example.image.basic`) that contributes: a resize operator, a grayscale operator, a recipe ("Basic Image Transform"), an image artifact viewer contribution, and a command contribution ("Run Basic Image Transform"). A corresponding example workflow with three stages (Preparation, Transform, Export) uses these operators. A user can install this extension, load the workflow, provide a source image input, execute the run, watch live progress, and inspect the output artifact with provenance — all through the UI or CLI.

**Why this priority**: The example extension is the proof that the entire architecture works end-to-end. It exercises every subsystem: extension discovery, worker protocol, workflow execution, artifact production, event streaming, and UI rendering.

**Independent Test**: Install the example extension. Start the host. Open the UI. Select the recipe. Provide an image. Execute the run. Verify the resize and grayscale operators execute with progress. Verify the output artifact is viewable. Verify provenance shows the complete chain.

**Acceptance Scenarios**:

1. **Given** the example extension installed, **When** the host starts, **Then** the resize operator, grayscale operator, recipe, artifact viewer contribution, and command contribution are all discovered and indexed.
2. **Given** the example recipe selected, **When** the user provides a source image and starts a run, **Then** the workflow executes through preparation (resize), transform (grayscale), and export stages sequentially.
3. **Given** the run executing, **When** each node runs, **Then** progress events are emitted and visible in the UI.
4. **Given** the run completed, **When** the user inspects the output, **Then** the artifact detail shows the image type, the viewer contribution is used for rendering, and provenance includes the full operator/extension/input chain.
5. **Given** the artifact viewer contribution, **When** the frontend selects a viewer for the image artifact, **Then** the contribution-declared viewer is preferred over the default host viewer based on priority.

---

### Edge Cases

- Extension manifest references a UI contribution type not recognized by the host — reject with structured error
- Extension declares an artifact viewer for a type no artifact currently produces — index it anyway (future use)
- Worker sends progress notification after the host has already cancelled the request — ignore gracefully
- Two extensions contribute viewers for the same artifact type — use priority field to resolve, host default as fallback
- Workflow has a node whose operator is from a disabled extension — validation fails with clear error before run creation
- Worker writes output to an unauthorized location (not the assigned write target) — host rejects the finalization
- Run retry requested for a run that completed successfully — reject with appropriate error
- Frontend disconnects from event stream during a run — run continues; frontend reconnects and catches up from current state
- Extension manifest has a recipe referencing a workflow template that does not exist — reject extension with structured error
- Config widget metadata references a schema field that does not exist in the operator config — ignore gracefully, render default widget

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The host MUST scan configured extension directories on startup and on explicit refresh, discovering all extension packages
- **FR-002**: The host MUST validate extension manifests against the v0 schema before activation
- **FR-003**: The host MUST reject extension activation when host API compatibility, protocol compatibility, runtime family, or referenced file validity checks fail
- **FR-004**: The host MUST track extension state through at minimum: discovered, invalid, valid, active, disabled, quarantined
- **FR-005**: The host MUST index operator metadata from active extensions and expose it through API
- **FR-006**: The host MUST index recipe metadata from active extensions and expose it through API
- **FR-007**: The host MUST index UI contribution metadata (artifact viewers, commands, config widgets, inspector panels, recipe cards, tool metadata) from active extensions and expose it through API
- **FR-008**: The host MUST load workflow definitions, validate them against schema and graph rules, and persist them
- **FR-009**: The workflow model MUST support declared workflow-level inputs and outputs with typed ports
- **FR-010**: The host MUST validate graph bindings based on declared port types with exact match semantics in v0
- **FR-011**: The workflow model MUST support named stages used by the UI and execution views
- **FR-012**: The host MUST accept run creation requests with workflow reference and input bindings
- **FR-013**: The host MUST compute execution order for the static DAG and detect dependency errors before execution
- **FR-014**: The host MUST launch worker processes for compatible runtime families (Python fully implemented, native as placeholder)
- **FR-015**: The host MUST perform a versioned handshake with each worker before using it, receiving protocol version, runtime family, extension identity, session id, runtime info, and supported methods
- **FR-016**: The host MUST verify required operator availability before planning execution
- **FR-017**: The host MUST send operator execution requests including run identity, node identity, config, typed inputs, and authorized output targets
- **FR-018**: The host MUST receive, persist, and publish worker progress events including request id, percent/units, message, and optional phase
- **FR-019**: The host MUST receive structured worker failures with code, category, message, retryable flag, and optional details, mapping them to node and run states
- **FR-020**: The host MUST finalize artifact records for successful worker outputs, registering type, storage location, content hash, and manifest metadata
- **FR-021**: The host MUST record provenance sufficient to reconstruct workflow version, extension/operator versions, node configs, input artifacts, scalar inputs, and output artifacts
- **FR-022**: The host MUST expose live run and node lifecycle events to the UI via WebSocket, including at minimum: extension.discovered, extension.validated, extension.invalid, worker.started, worker.unhealthy, run.created, run.state_changed, node.scheduled, node.started, node.progress, node.completed, node.failed, artifact.produced
- **FR-023**: The host MUST expose a tool/operator discovery API that the frontend queries dynamically, supporting filtering by category, extension, and runtime family
- **FR-024**: The host MUST expose a recipe discovery API with display metadata, category, and workflow template references
- **FR-025**: The host MUST expose a UI contribution discovery API for artifact viewers, commands, inspector panels, and config widget metadata, supporting filtering by kind, extension, and target type
- **FR-026**: The host MUST expose artifact listing and detail APIs with filtering by run, type, and producer node, including viewer candidate metadata in detail responses
- **FR-027**: The host MUST expose extension metadata and activation/validation state through dedicated API endpoints, with enable/disable/refresh capabilities
- **FR-028**: The host MUST expose system health including host version, protocol version, extension scan status, database status, and artifact store status
- **FR-029**: The platform MUST remain usable without the UI by driving workflow execution from CLI or HTTP API (headless operation)
- **FR-030**: The repository MUST include at least one example Python extension pack with operators, a recipe, UI contributions (artifact viewer + command), and a working worker implementation
- **FR-031**: The host MUST expose a `/tools` API as a normalized user-facing projection over operators and recipes with id, kind, target id, display name, category, tags, icon, and availability
- **FR-032**: The host MUST expose a `/system/info` endpoint returning host version, API version, supported runtime families, supported spec versions, and workspace path
- **FR-033**: The host MUST expose a `/workflows/validate` endpoint that validates without persisting
- **FR-034**: The host MUST support workflow update via PUT with version tracking
- **FR-035**: The host MUST support run cancellation and best-effort retry
- **FR-036**: All API responses MUST use a consistent envelope with data, meta (timestamp), and error fields
- **FR-037**: The frontend MUST use a token-based design system with semantic tokens for all visual properties (colors, typography, spacing, radius, shadows, blur, motion, z-index)
- **FR-038**: The frontend MUST implement a three-zone shell: left rail (navigation), center canvas (views), right inspector (details)
- **FR-039**: The frontend MUST support stage view, read-only graph view, run trace view, and artifact browser as canvas views
- **FR-040**: The frontend MUST render all operators without custom frontend bundles, using schema-driven forms as the default rendering path
- **FR-041**: Extension-contributed UI surfaces MUST inherit host theme tokens and degrade gracefully if absent
- **FR-042**: The host MUST be able to render all operators without any custom frontend bundle (headless-first)
- **FR-043**: The frontend MUST support the default dark theme and be architecturally ready for light theme and custom themes without component rewrites

### Key Entities

- **Extension**: Installable package with identity, version, publisher, spec version, host/protocol compatibility ranges, runtime family, entrypoint, capabilities, activation state, and contribution counts (operators, recipes, UI contributions)
- **Operator**: Versioned executable contract with identity, display name, category, tags, input/output port definitions, config schema, execution hints, resource hints, and extension source reference
- **Tool**: User-facing surfaced capability projected from operators and recipes, with kind, target id, display name, category, tags, icon, and availability
- **Recipe**: Curated workflow entry point with identity, display name, summary, category, thumbnail, workflow template reference, and input field bindings
- **UIContribution**: Extension-provided capability descriptor with kind (artifact viewer, command, config widget, inspector panel, recipe card, tool metadata), target, supported types, priority, and metadata
- **Workflow**: Typed DAG with metadata, version, inputs, outputs, stages, nodes, bindings, and optional subgraphs
- **NodeInstance**: Concrete operator use with config values and input bindings within a workflow
- **Run**: Concrete execution instance with workflow reference, state, per-node states, extension/operator version snapshots, event log references, and timing
- **Artifact**: First-class output with identity, type, storage location, manifest metadata, content hash, producer node, run reference, and viewer resolution metadata
- **Worker**: Supervised runtime process with session id, extension identity, runtime family, operator capabilities, and health state

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can install an example extension pack, start the host, and see the extension, its operators, recipe, and UI contributions indexed within 5 seconds of startup
- **SC-002**: A user can execute the example workflow end-to-end through a Python worker and produce an output artifact with full provenance in under 30 seconds
- **SC-003**: A user can observe live run progress in the frontend with event latency under 200 milliseconds from host emission to UI rendering
- **SC-004**: The host survives a Python worker crash without interruption — affected run transitions to failed within 5 seconds, host remains operational
- **SC-005**: All 30+ functional requirements are covered by API endpoint tests or integration tests
- **SC-006**: The frontend renders stage view, graph view, run trace, artifact browser, extension catalog, operator catalog, and recipe catalog from host API data with no hardcoded tool or extension information
- **SC-007**: The frontend ships with a token-based default dark theme where no core screen relies on hardcoded ad hoc colors
- **SC-008**: The produced artifact detail includes enough provenance to trace back to exact workflow version, operator versions, extension versions, configs, and input artifacts
- **SC-009**: An invalid extension (schema errors, compatibility mismatch, missing files) is rejected with structured diagnostics visible in both the API response and the frontend extension list
- **SC-010**: The vertical slice is runnable on a single developer workstation without distributed infrastructure

## Assumptions

- Local single-machine execution only — no distributed or LAN scheduling
- One workspace and one local data directory at `~/.nexus/`
- Python runtime family is fully implemented; native and external-service are placeholder support in schema and host model
- SQLite for metadata persistence, filesystem for artifact payloads
- JSON-RPC over stdio for host-worker communication in v0
- No public extension registry or marketplace
- No production authentication/authorization model
- No ComfyUI/A1111 compatibility
- No deep sandboxing or extension signing
- No arbitrary third-party frontend bundles — extensions contribute metadata-only UI descriptors
- Port type compatibility uses exact string matching (no hidden coercions)
- Sequential or minimally parallel execution is acceptable for v0 as long as contracts are correct
- The `/tools` endpoint is a normalized projection over operators and recipes, not a separate entity store
- The example extension uses simple deterministic image operations (resize, grayscale) to keep the demo predictable
- The frontend uses CSS variables for runtime theme switching with a semantic token layer
