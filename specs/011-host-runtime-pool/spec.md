# Feature Specification: Backend Runtime Capability & Shared Runtime Channel

**Feature Branch**: `011-host-runtime-pool`
**Created**: 2026-04-15
**Status**: Draft (enhanced)
**Supersedes focus of**: host-runtime refactor draft centered on `nexus-local-llm`
**Input**: Move all backend runtime plumbing — LLM, video, diffusion, or future families — into `crates/nexus-backend-runtimes`. Delete `crates/nexus-local-llm` as a host/runtime crate. The `local-llm` extension keeps its own domain logic and is responsible for model UX, routing, prompts, request payloads, and feature-specific settings. The host owns install lifecycle, binary selection, spawn supervision, runtime channels, logs, validation, repair, and uninstall.

## Executive Summary

The current draft correctly identifies that runtime binaries must be installed once per host, not once per extension. The missing pieces are now explicit:

1. **`nexus-local-llm` must stop existing as a runtime crate**. Its generic runtime plumbing moves into `nexus-backend-runtimes`; its feature/domain logic lives under `extensions/builtin/local-llm/`.
2. **Spawn must return a communication channel, not just a process handle**. Extensions need a stable way to talk to backends such as `llama-server` after spawn.
3. **The host must not freeze `llama.cpp` into a giant typed Rust API**. `llama.cpp` already exposes a very large launch surface. The host should reserve only host-owned knobs and pass everything else through.
4. **The `llama.cpp` launch surface should be catalogued as data**. The runtime crate should ship a versioned parameter catalog for UI/help/validation, while still allowing unknown future flags to pass through.

## Architectural Intent

### Core principles

- **Install once per host**: runtime binaries, manifests, validation state, and repair flows are global host concerns.
- **Extension-owned domain semantics**: extensions choose models, prompt structure, chat templates, routing logic, feature flags, request schemas, and post-processing.
- **Channel-first spawn contract**: a running backend is only useful if the extension receives a concrete way to communicate with it.
- **Host only understands host-owned settings**: bind address, ports, lifecycle, logs, security-sensitive surfaces, and accelerator choice stay typed. Runtime-family flags remain mostly opaque.
- **Parameter catalogs are advisory, not a gate**: the catalog informs UI and docs, but unknown upstream flags must still be passable unless they collide with host-owned policy.

### Why this matters now

If runtime management stays attached to `nexus-local-llm`, every new extension that needs a backend family will either duplicate binaries or couple itself to an LLM-specific crate. That blocks the intended architecture for video, diffusion, code-assist, and multimodal extensions. A host-level runtime capability removes that coupling and keeps the extension surface clean.

## Background & Motivation

The earlier Host Runtime Pool draft already established the central refactor: generic runtime plumbing does not belong in an extension-named crate. That draft is the correct base, but two design gaps remain:

- it treats `spawn` mostly as process lifecycle, not as **runtime connectivity**, and
- it says argv/env should be opaque passthrough, but it does not define which launch settings the host must still own.

Those gaps become critical once `local-llm` stops owning the runtime process directly. A future extension needs to ask the host for a backend process and immediately know **how to reach it**. For `llama.cpp`, that usually means an HTTP endpoint with OpenAI-compatible and native llama-server routes; for future families it may mean HTTP over a Unix socket, stdio JSON-RPC, gRPC, or another transport.

## Proposed Architecture

### 1) Crate ownership after the refactor

**Host-owned crates**

- `crates/nexus-backend-runtimes`
  - runtime family registry
  - install / repair / uninstall pipelines
  - accelerator-aware binary selection
  - runtime validation and reconciler logic
  - managed spawn / shutdown / drain
  - runtime channel descriptors
  - logs and health supervision
  - parameter catalogs and reserved-setting policy

**Extension-owned code**

- `extensions/builtin/local-llm/`
  - model picker UX
  - chat / RAG / session logic
  - request/response normalization
  - preset management
  - inference defaults and user-facing hyperparameters
  - per-model template choices
  - decisions about which backend family or model to use

**Removed**

- `crates/nexus-local-llm`
  - removed as a workspace crate once migration lands
  - no permanent shim
  - any temporary compatibility layer must live inside the extension, not the host runtime path

### 2) Runtime family adapter model

Each runtime family adapter inside `nexus-backend-runtimes` owns:

- install manifest and distribution sources
- supported accelerator variants
- validation logic
- launch command construction
- reserved-flag stripping/rejection policy
- channel descriptor construction
- health/readiness detection
- parameter catalog snapshot(s)

At P1, adapters exist for:

- `llama.cpp`
- `tensorrt-llm` (stub parity preserved)

### 3) Spawn becomes a lease with a channel

`spawn()` should no longer be thought of as “start a process and return PID metadata”. It should return a **runtime lease**:

- process identity and lifecycle handle
- owning extension id
- installed runtime identity/version/accelerator
- readiness state
- logs handle / channel id
- **channel descriptor** used by the extension to communicate with the runtime

### 4) Runtime channels

A generic backend channel abstraction is required because not every runtime is best represented by `host + port`.

Recommended channel kinds:

- `http_tcp`
- `http_unix_socket`
- `stdio_jsonrpc`
- `grpc_tcp`
- `custom_native`

For each channel, the host returns a descriptor with enough information for the extension to connect without knowing process internals.

### 5) `llama.cpp` contract inside Nexus

For `llama.cpp`, the canonical spawned backend is `llama-server`, not `llama-cli`.

The adapter should expose a channel descriptor that includes:

- transport kind: `http_tcp` or `http_unix_socket`
- API dialects available: `openai-compatible`, `anthropic-messages-compatible`, `native-llama-server`
- base URL or socket path
- health endpoint
- optional metrics endpoint
- optional props/slots endpoints depending on host policy
- runtime metadata: model path/repo source, multimodal enabled, reasoning format if configured, router mode if enabled

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Install llama.cpp once, use from multiple extensions (Priority: P1)

As a user running both the `local-llm` extension and any future extension that wants GGUF-serving capability, I install llama.cpp once from the host Backends panel. Any extension that declares a compatible runtime dependency can use it immediately without reinstallation.

**Independent Test**: Install llama.cpp from the host Backends surface. Enable a second extension that declares `runtime_dependencies: [llama.cpp]`. The extension sees the runtime as available with zero duplicate bytes written under its own namespace.

**Acceptance Scenarios**:

1. **Given** no extension has been used before, **When** the user installs llama.cpp from the host Backends panel, **Then** the binary lands under a host-managed runtime directory and `host_runtime_installs` gains a host-owned row.
2. **Given** llama.cpp is installed at host level, **When** a second extension with `runtime_dependencies: [llama.cpp]` is enabled, **Then** it reports the runtime as available without an install prompt.
3. **Given** llama.cpp is installed at host level, **When** it is uninstalled from the Backends panel, **Then** every dependent extension transitions to runtime-unavailable state and blocks new spawn requests.
4. **Given** llama.cpp is installed, **When** two extensions each request a `llama-server` process, **Then** each receives an independent runtime lease and channel descriptor backed by the same on-disk binary.

### User Story 2 — `nexus-local-llm` is removed; the extension owns domain logic (Priority: P1)

As a contributor, I do not import or depend on `nexus-local-llm` for backend lifecycle anymore. The extension owns its own feature logic and calls the host runtime capability.

**Independent Test**: Remove `crates/nexus-local-llm` from workspace members. The workspace still builds because runtime plumbing lives in `nexus-backend-runtimes`, and local-llm feature code lives under the extension directory.

**Acceptance Scenarios**:

1. **Given** the refactor has landed, **When** someone greps `crates/nexus-backend-runtimes`, **Then** they find no feature-specific concepts such as chat sessions, RAG, conversation state, or model UX.
2. **Given** the refactor has landed, **When** someone inspects `extensions/builtin/local-llm/`, **Then** the extension contains the domain logic previously mixed into the old crate.
3. **Given** the refactor has landed, **When** the workspace is built, **Then** no host crate depends on `nexus-local-llm` because that crate no longer exists.

### User Story 3 — Spawn returns a communication channel for backends like llama.cpp (Priority: P1)

As an extension author, I can request a backend process and immediately receive a typed descriptor telling me how to communicate with it.

**Independent Test**: Call `spawn()` for a llama.cpp runtime. The result includes a ready-state channel descriptor containing a base URL or Unix socket path, declared API dialects, and a health endpoint.

**Acceptance Scenarios**:

1. **Given** an extension requests a llama.cpp runtime, **When** the process becomes ready, **Then** the host returns a `RuntimeChannelDescriptor` that points to the serving endpoint and identifies the supported protocol family.
2. **Given** the runtime exits unexpectedly, **When** the extension holds an active lease, **Then** the host emits a runtime-exited/runtime-withdrawn event and the channel becomes invalid.
3. **Given** a future runtime uses stdio or gRPC instead of HTTP, **When** the extension requests it, **Then** the same `spawn()` contract still works because channel kind is abstracted.

### User Story 4 — Generic spawn passthrough with explicit host-owned overrides (Priority: P1)

As an extension author, I can pass arbitrary argv/env for backend-specific behavior, while the host still controls bind address, port, logging, and other host-governed concerns.

**Independent Test**: The extension can pass an unknown future llama.cpp flag without a host code change, but passing a reserved flag such as `--port` fails fast with a clear error because the host owns it.

**Acceptance Scenarios**:

1. **Given** the extension calls `spawn()` with `args: ["--model", "path.gguf", "--novel-flag", "value"]`, **When** the process launches, **Then** the host forwards the unknown flag verbatim.
2. **Given** the extension also passes `--port 9999`, **When** the host validates the request, **Then** the spawn is rejected with a `ReservedLaunchSetting`-style error because `--port` is host-owned.
3. **Given** the extension omits a port, **When** the host spawns the process, **Then** it allocates one and includes it in the channel descriptor.
4. **Given** the extension passes environment variables that do not collide with reserved host env keys, **When** the process launches, **Then** they are forwarded verbatim.

### User Story 5 — Llama.cpp launch settings are catalogued without freezing the host API (Priority: P2)

As a contributor or UI author, I can inspect a versioned llama.cpp parameter catalog that documents the current launch surface, but the runtime still allows unknown future upstream flags to pass through.

**Independent Test**: Query the llama.cpp adapter for its parameter catalog. The catalog returns the known current flags and their policy classification. Then spawn the runtime with a flag missing from the catalog; the host still forwards it unless it collides with a reserved flag.

**Acceptance Scenarios**:

1. **Given** the host ships a llama.cpp adapter, **When** someone requests its parameter catalog, **Then** they receive a versioned dataset containing currently known launch flags grouped by scope.
2. **Given** upstream llama.cpp adds a new flag after Nexus ships, **When** an extension passes that flag through raw argv, **Then** the host does not block it purely because the catalog is older.
3. **Given** a flag is marked host-governed or disallowed in managed spawn, **When** an extension passes it through raw argv/env, **Then** the host rejects or overrides it according to policy.

### User Story 6 — Clean migration from extension-scoped runtime state (Priority: P2)

As a user with llama.cpp already installed under the old extension-scoped schema, I upgrade without reinstalling.

**Independent Test**: Start with `ext_local_llm_runtime_installs` populated and a valid on-disk binary. Run the migration. The install becomes visible in `host_runtime_installs`, the extension can spawn from it, and the old table is no longer used for writes.

**Acceptance Scenarios**:

1. **Given** a pre-refactor install exists, **When** the new version starts, **Then** runtime rows migrate to `host_runtime_installs` and remain usable.
2. **Given** the migration runs more than once, **When** it is retried, **Then** it remains idempotent.
3. **Given** migration fails partway, **When** the app is restarted, **Then** the system recovers without split-brain runtime state.

## Edge Cases

- Two extensions request the same runtime family simultaneously — each gets an independent runtime lease and isolated channel descriptor.
- The runtime binary is removed externally — reconciler marks install `NeedsRepair`; existing leases fail closed and new spawns are rejected until repair succeeds.
- An extension unloads while its runtime process is still busy — the host drains the lease, terminates the process, and invalidates the channel.
- User uninstalls a runtime while a live process exists — uninstall becomes a drain-then-remove flow; dependents receive a runtime-withdrawn event.
- Two extensions declare incompatible version ranges for the same runtime family — the conflict is surfaced before spawn time.
- An extension requests a runtime family unknown to the host — extension enable fails with a clear capability-resolution error.
- An extension passes reserved launch settings via argv/env — the host rejects the spawn before any process starts.
- A channel becomes ready late (for example, HTTP binds before the model finishes loading) — the host must distinguish process-started from channel-ready.
- A runtime only supports Unix sockets or stdio — the channel descriptor still makes the transport explicit and does not force a TCP port.

## Requirements *(mandatory)*

### Functional Requirements

#### Host runtime pool

- **FR-001**: The system MUST provide a host-level `BackendRuntimeCapability` implemented in `crates/nexus-backend-runtimes`.
- **FR-002**: The capability MUST expose `ensure_installed`, `list_installed`, `list_families`, `get_parameter_catalog`, `spawn`, `shutdown`, `validate`, `repair`, `uninstall`, `list_dependents`, and `subscribe_events`.
- **FR-003**: Runtime install state MUST be stored in a host-owned `host_runtime_installs` table.
- **FR-004**: Runtime binaries MUST live in a host-managed runtime directory, not an extension-owned data path.
- **FR-005**: Host APIs for runtime lifecycle MUST be served from `/api/v1/backends/*`; the legacy `/api/v1/llm/backends/*` surface is deprecated.
- **FR-006**: P1 runtime families MUST include `llama.cpp` and `tensorrt-llm`.

#### Extension contract

- **FR-007**: Extensions MUST declare runtime dependencies in their manifest.
- **FR-008**: Extensions MUST NOT install runtime binaries themselves.
- **FR-009**: The host MUST reject extension-owned binary management attempts with a clear host-runtime-pool error.
- **FR-010**: Extensions MUST receive a `RuntimeLease` from `spawn()`; they MUST NOT depend on direct child-process ownership.
- **FR-011**: When an extension unloads or is disabled, the host MUST terminate all leases owned by that extension.
- **FR-012**: Domain-specific inference request schemas, routing logic, prompt construction, session state, and post-processing MUST remain extension-owned.

#### Runtime channel contract

- **FR-013**: `RuntimeLease` MUST include a `RuntimeChannelDescriptor`.
- **FR-014**: `RuntimeChannelDescriptor` MUST describe at least: channel kind, transport location, readiness state, optional health endpoint, optional metrics endpoint, and declared API dialect(s).
- **FR-015**: The host MUST distinguish `process_started` from `channel_ready`.
- **FR-016**: The host MUST emit lifecycle events for at least: installed, repaired, unavailable, process_started, channel_ready, process_exited, process_withdrawn.
- **FR-017**: Extensions MUST be able to cache and use the returned channel descriptor without reading host-internal process state.
- **FR-018**: Channel kinds MUST support at least `http_tcp`, `http_unix_socket`, `stdio_jsonrpc`, and an extensible fallback for future transports.
- **FR-019**: For HTTP-based runtimes, the channel descriptor MUST include the base address and a readiness probe path.
- **FR-020**: If a runtime exits or is withdrawn, the host MUST invalidate the channel and notify the owning extension.

#### Spawn and launch-surface policy

- **FR-021**: `spawn()` MUST accept raw `args: Vec<String>` and raw `env: HashMap<String, String>` for runtime-specific passthrough.
- **FR-022**: `spawn()` MUST also accept typed host-owned fields for accelerator profile, bind mode, and optional port hint.
- **FR-023**: The host MUST own final bind address selection and final port allocation.
- **FR-024**: The host MUST reject argv/env entries that attempt to override reserved host-owned settings.
- **FR-025**: The host MUST document reserved host-owned settings per runtime family.
- **FR-026**: The host MUST capture stdout/stderr into the existing log store and expose a log handle on the lease.
- **FR-027**: Unknown non-reserved runtime flags MUST pass through without requiring a host code change.
- **FR-028**: The host MUST support host-governed security-sensitive surfaces such as API keys, TLS materials, exposed media paths, and built-in tool enablement.
- **FR-029**: The host MUST support drain-and-shutdown for running leases before binary removal.
- **FR-030**: The host MUST be able to validate a runtime after install and after repair using runtime-family-specific readiness checks.

#### Llama.cpp-specific expectations

- **FR-031**: The llama.cpp adapter MUST launch `llama-server` for managed serving scenarios.
- **FR-032**: The llama.cpp channel descriptor MUST declare support for OpenAI-compatible routes; it MAY additionally declare Anthropic-compatible and native llama-server routes when enabled.
- **FR-033**: The llama.cpp adapter MUST classify launch settings into `managed-spawn-disallowed`, `host-injected`, `host-governed`, or `extension-passthrough`.
- **FR-034**: The llama.cpp adapter MUST treat `--host` and `--port` as host-owned settings.
- **FR-035**: The llama.cpp adapter MUST keep the launch catalog versioned by upstream snapshot/release.
- **FR-036**: The llama.cpp adapter MUST expose a non-normative parameter catalog that is discoverable by UI and tooling.
- **FR-037**: The parameter catalog MUST NOT act as an allow-list for passthrough flags; unknown non-reserved flags still pass through.
- **FR-038**: The host SHOULD default security-sensitive llama.cpp surfaces such as built-in tools and the WebUI MCP proxy to disabled unless explicitly enabled by host policy.

#### Migration

- **FR-039**: The system MUST provide a one-shot migration from `ext_local_llm_runtime_installs` to `host_runtime_installs`.
- **FR-040**: Migration MUST preserve binary paths, versions, accelerator profile, install state, validation state, and last-failure classification.
- **FR-041**: Migration MUST be idempotent.
- **FR-042**: After migration, the old table MUST be deprecated so the new system cannot write fresh state there.

#### Crate layout

- **FR-043**: `crates/nexus-backend-runtimes` MUST own all generic runtime plumbing formerly living in `crates/nexus-local-llm`.
- **FR-044**: `crates/nexus-local-llm` MUST be removed from workspace members after the refactor lands.
- **FR-045**: Any surviving local-llm-specific code MUST live under `extensions/builtin/local-llm/`.
- **FR-046**: `nexus-backend-runtimes` MUST have zero dependencies on extension crates or feature-domain crates.

### Key Entities

- **Runtime Family**: a backend engine family such as `llama.cpp` or `tensorrt-llm` with install logic, validation, launch policy, and parameter catalogs.
- **Runtime Install**: a concrete host-local installation of a runtime family and version/variant.
- **Runtime Lease**: an extension-scoped claim over a running backend process, including lifecycle ownership, logs, and channel descriptor.
- **Runtime Channel Descriptor**: transport and protocol metadata needed by the extension to communicate with the backend.
- **Spawn Request**: typed host-owned launch fields plus raw argv/env passthrough.
- **Launch Parameter Catalog Entry**: versioned metadata describing a currently known runtime launch flag or setting, including host policy classification.
- **Extension Runtime Dependency**: extension manifest declaration of runtime family, version range, and supported accelerators.
- **Acceleration Profile**: typed enum for CPU/GPU family and runtime binary selection.

## Recommended Interface Shapes (non-binding but directionally important)

```rust
struct SpawnRuntimeRequest {
    extension_id: String,
    family: RuntimeFamilyId,
    version_req: Option<String>,
    accelerator: AcceleratorProfile,
    args: Vec<String>,
    env: BTreeMap<String, String>,
    port_hint: Option<u16>,
    bind_mode: RuntimeBindMode,
}

struct RuntimeLease {
    lease_id: RuntimeLeaseId,
    extension_id: String,
    install_id: RuntimeInstallId,
    pid: u32,
    log_channel_id: String,
    channel: RuntimeChannelDescriptor,
}

struct RuntimeChannelDescriptor {
    kind: RuntimeChannelKind,
    api_dialects: Vec<ApiDialect>,
    address: RuntimeAddress,
    health: Option<RuntimeEndpoint>,
    metrics: Option<RuntimeEndpoint>,
    ready: bool,
}
```

These shapes are included to make the missing channel concept concrete. They are not intended to lock implementation to a specific crate layout beyond the required capability split.

## Llama.cpp Policy for Nexus

### Host-owned / reserved concerns

The host should own or govern at least:

- network binding (`--host`, `--port`, reuse/bind semantics)
- auth and TLS surfaces
- observability surfaces (metrics, props exposure, slot monitoring exposure, log sinks)
- local file-system exposure (`--media-path`, built-in tools, MCP proxy)
- default WebUI exposure policy

### Extension-owned passthrough concerns

The extension should control, via raw argv/env or higher-level presets:

- model source/path/repo
- context/window sizing
- GPU offload details and tensor split decisions
- sampling defaults
- prompt cache and batching choices
- chat template / reasoning / grammar / JSON schema settings
- multimodal projector choices
- speculative decoding and draft-model settings
- router mode / multi-model settings if the extension chooses to use them

### Managed-spawn disallowed flags

Flags that make the process exit immediately or behave like a one-shot inspection command should be rejected in managed spawn mode. Examples include help/version/license/device-list style flags.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Two enabled extensions can share a single on-disk llama.cpp install with no binary duplication.
- **SC-002**: `host_runtime_installs` is the only authoritative runtime-install table after migration.
- **SC-003**: `cargo tree -p nexus-backend-runtimes` shows zero dependencies on extension crates or local-llm domain crates.
- **SC-004**: `crates/nexus-local-llm` is removed from workspace members.
- **SC-005**: `spawn()` for llama.cpp returns a valid runtime channel descriptor that points to a reachable serving endpoint once ready.
- **SC-006**: Reserved launch-setting collisions are rejected before process start.
- **SC-007**: Unknown non-reserved llama.cpp flags continue to pass through without host changes.
- **SC-008**: The shipped llama.cpp parameter catalog covers the documented upstream server launch surface snapshot used by this spec (213 documented flags: 84 common, 34 sampling, 95 server-specific).
- **SC-009**: Upgrading from the pre-refactor version preserves installed runtimes without forcing reinstall.

## Assumptions

- Spec 010’s host-owned capability direction remains valid and available as architectural precedent.
- The app continues to use managed child processes rather than introducing a new supervisor subsystem in this refactor.
- Local extensions can consume HTTP endpoints, Unix sockets, or other returned runtime channels without needing direct process ownership.
- Versioned runtime parameter catalogs can be shipped as data files or generated artifacts inside `nexus-backend-runtimes`.

## Non-Goals

- **No single shared inference process across multiple extensions** — binaries are shared; processes are still lease-scoped.
- **No giant typed Rust mirror of all llama.cpp flags** — only host-owned fields are typed.
- **No forced request-shape normalization across runtime families** — payload semantics stay extension-owned.
- **No new runtime families beyond llama.cpp and TensorRT-LLM in this spec**.
- **No change to extension RPC architecture beyond consuming the new host runtime capability**.

## Companion Artifacts

- `llamacpp-launch-parameter-catalog.md` — human-readable researched catalog of the current llama.cpp server launch surface and Nexus policy classification.
- `llamacpp-launch-parameter-catalog.json` — machine-readable catalog for UI/tooling.
