# Feature Specification: Backend Runtime Hardening — Security Gate, Lifecycle Events, Migration Wiring

**Feature Branch**: `012-runtime-hardening`
**Created**: 2026-04-15
**Status**: Draft
**Supersedes focus of**: n/a — closes residual gaps from spec 011 surfaced by `/speckit.analyze`.
**Input**: Close the CRITICAL and HIGH gaps from the spec 011 analysis report. Wire the host-startup migration runner so upgrades actually apply, enforce extension-enable rejection for unmet runtime dependencies, harden host-governed launch flags with default-deny, emit the four missing runtime lifecycle events, expose a WebSocket bridge so frontend can observe `BackendEvent`, implement the drain-then-uninstall flow, and assert the zero-extension-deps invariant in CI.

## Executive Summary

Spec 011 shipped the channel-first Spawner end-to-end, but `/speckit.analyze` flagged seven CRITICAL/HIGH residual gaps. Without them:

1. **Migration is dead code.** `migrate_from_legacy` and `relocate_legacy_binaries` exist but are never invoked at startup. SC-009 (upgrade preserves installs) is a paper guarantee.
2. **Extension-enable does not validate runtime dependencies.** A user can enable an extension declaring `runtime_dependencies: [llama.cpp >=b9999]` even when no satisfying install exists. FR-009 is unenforced.
3. **Host-governed launch flags have no default-deny gate.** Extensions can pass `--api-key`, `--ssl-*`, `--tools`, `--media-path` via raw argv and the host forwards them. FR-028 / FR-038 security guarantee absent.
4. **The runtime event bus has zero subscribers.** `process.started`, `channel.ready`, `process.exited` publish into `tokio::broadcast` and nothing consumes them. The frontend cannot show runtime status. Four FR-016 event variants (`installed`, `repaired`, `unavailable`, `process_withdrawn`) are not even emitted.
5. **Drain-then-uninstall is not implemented.** `DELETE /api/v1/backends/{installId}` returns 501.
6. **The "zero extension dependencies" invariant is not test-verified.** Any future regression slips silently.

This spec closes all six.

## Architectural Intent

### Core principles applied

- **Living guarantees over paper guarantees**: every claim in spec 011 must have an automated test exercising it.
- **Default-deny on security boundaries**: host-governed surfaces require explicit typed opt-in; raw argv attempts are rejected.
- **Observable state transitions**: every lifecycle change emits an event, and the event bus has at least one production subscriber.
- **Bisectable startup sequence**: migration runs before the API server binds — never after.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Upgrade from pre-spec-011 install actually works (Priority: P1)

As a user upgrading from a build that pre-dates spec 011, the host detects my legacy `ext_local_llm_runtime_installs` rows on first start, copies them into `host_runtime_installs`, relocates the binary directory, and the runtime is usable without my intervention.

**Independent Test**: Seed a SQLite DB with one `ext_local_llm_runtime_installs` row plus a binary at `<data_dir>/extensions/local-llm/runtimes/llama.cpp/<version>/llama-server`. Start the host. Without any user action, the row appears in `host_runtime_installs`, the binary lives at `<data_dir>/runtimes/llama.cpp/<version>/llama-server`, and `GET /api/v1/backends` lists it.

**Acceptance Scenarios**:

1. **Given** a legacy DB and binary on disk, **When** the host starts, **Then** migration runs before the API server binds and the legacy table is renamed to `..._migrated_008`.
2. **Given** the host has already migrated once, **When** it restarts, **Then** the migrator is a no-op (idempotent guard).
3. **Given** migration fails partway (e.g. binary path unwritable), **When** the host starts, **Then** the host panics with structured diagnostic context (`tracing::error!(family, phase, error)`) before binding the HTTP port — operator-visible failure is preferred over silent split-brain.

### User Story 2 — Extensions cannot enable when their runtime dependency is unmet (Priority: P1)

As a user trying to enable an extension that declares `runtime_dependencies: [{ family: "llama.cpp", version: ">=b9999" }]` while only `b4970` is installed, the host blocks the enable and tells me to install/upgrade the runtime via the Backends panel.

**Independent Test**: Synthetic extension with an unsatisfiable runtime_dependency → enable returns 400 with a structured error pointing to the Backends panel. Same extension with a satisfiable dependency → enable succeeds.

**Acceptance Scenarios**:

1. **Given** an extension declares `runtime_dependencies` that no install satisfies, **When** the user enables it, **Then** the host returns 400 `RUNTIME_DEPENDENCY_UNMET` with a message naming the family + version range and linking to `/backends`.
2. **Given** an extension's dependency is satisfied, **When** enabled, **Then** the enable succeeds without prompt.
3. **Given** an extension declares no `runtime_dependencies`, **When** enabled, **Then** the resolver is a no-op.

### User Story 3 — Host-governed launch flags default-deny via raw argv (Priority: P1)

As a security-conscious operator, I am confident extensions cannot enable security-sensitive llama.cpp surfaces (API keys, TLS materials, exposed media paths, built-in tools, MCP proxy) by sneaking them into the spawn `args` field. The host rejects every host-governed flag passed via raw argv unless an explicit typed host-setting opt-in is present.

**Independent Test**: `SpawnRuntimeRequest { args: ["--api-key", "secret"] }` returns 422 `HOST_GOVERNED_DENIED` even though the flag is not in the host-injected tier. With the host setting `llama_cpp.api_key_enabled = true` and `llama_cpp.api_key = "secret"` configured, the host injects the same flag itself — extension still cannot pass it raw.

**Acceptance Scenarios**:

1. **Given** the parameter catalog classifies a flag as `host-governed`, **When** an extension passes it via raw argv, **Then** spawn returns 422 with `code: HOST_GOVERNED_DENIED` and the offending flag name.
2. **Given** an operator sets the typed host-setting opt-in for the same flag, **When** the extension spawns without passing it, **Then** the host injects the value from the typed setting and the process starts.
3. **Given** every denial, **When** it occurs, **Then** the host emits a `tracing::warn!` with the extension id, family, and flag name for audit.

### User Story 4 — Frontend observes runtime lifecycle events live (Priority: P1)

As a user watching the Backends panel after triggering an install/spawn, I see the runtime card transition through `installing → installed → starting → ready → serving → exited` in real time without polling.

**Independent Test**: Open a WebSocket to `/api/v1/backends/events`. Trigger an install + spawn. Observe events arriving in order: `install.started`, `install.completed`, `process.started`, `channel.ready`, then on shutdown `process.exited`.

**Acceptance Scenarios**:

1. **Given** a WebSocket subscriber to `/api/v1/backends/events`, **When** a runtime install begins, **Then** the subscriber receives `install.started` within 500ms.
2. **Given** a runtime spawns and becomes ready, **When** the supervisor flips `ready=true`, **Then** subscribers receive `channel.ready` with the lease id and channel descriptor.
3. **Given** multiple subscribers, **When** an event fires, **Then** all subscribers receive the same event (broadcast semantics).
4. **Given** a subscriber that lags, **When** the broadcast buffer overflows, **Then** the subscriber receives a `Lagged(N)` warning frame and the connection stays open.

### User Story 5 — Missing FR-016 lifecycle events are emitted (Priority: P2)

As a downstream observer (UI, metrics exporter, log pipeline), I receive the four currently-missing event variants the spec 011 contract promised: `installed`, `repaired`, `unavailable`, `process_withdrawn`.

**Independent Test**: Subscribe to the BackendEvent bus, run a fresh install → assert `installed` fires; trigger repair → `repaired`; mark install needs-repair externally → `unavailable`; uninstall while a lease is live → `process_withdrawn`.

**Acceptance Scenarios**:

1. **Given** an install completes, **When** the install pipeline flips state to `installed`, **Then** `installed` event fires with `runtime_install_id`.
2. **Given** a `repair` operation succeeds, **When** the state flips back to `installed`, **Then** `repaired` fires.
3. **Given** the validator marks an install `needs_repair`, **When** the state transition lands, **Then** `unavailable` fires.
4. **Given** the uninstall flow drains a live lease, **When** the lease is forcibly terminated, **Then** `process_withdrawn` fires (distinct from `process.exited` for clean exits).

### User Story 6 — Drain-then-uninstall flow works for runtimes with live leases (Priority: P2)

As a user uninstalling llama.cpp while one extension still holds a live lease, the host either blocks (with `?force=false`, the default) and tells me which extensions are dependents, or drains-then-removes (with `?force=true`).

**Independent Test**: Install llama.cpp, spawn one lease, attempt `DELETE /api/v1/backends/{installId}` without `?force=true` → 409 with dependent list. Retry with `?force=true` → 204; lease was terminated; `process_withdrawn` event fired.

**Acceptance Scenarios**:

1. **Given** an install has at least one live lease, **When** uninstall is called without `?force=true`, **Then** 409 `RUNTIME_IN_USE` is returned listing the dependent extension ids.
2. **Given** the same install, **When** uninstall is called with `?force=true`, **Then** all live leases are terminated, `process_withdrawn` events fire, the binary directory is removed, and the row is deleted.
3. **Given** a force-uninstall, **When** an extension subsequently attempts to spawn against the removed install, **Then** the spawn returns 404 `FAMILY_UNAVAILABLE`.

### User Story 7 — Zero-extension-dependencies invariant is CI-asserted (Priority: P2)

As a contributor, I cannot accidentally introduce a `nexus-backend-runtimes` → `extension-*` dependency edge because CI fails before the change merges.

**Independent Test**: Add a fake `extension-foo = { path = "..." }` line to `crates/nexus-backend-runtimes/Cargo.toml`; run the verification script → fails. Remove the line → passes.

**Acceptance Scenarios**:

1. **Given** the verification script `scripts/verify-spec-011.sh`, **When** it runs against a clean tree, **Then** it exits 0.
2. **Given** any commit introduces a host-crate→extension-crate edge, **When** the script runs, **Then** it exits non-zero with a clear message.
3. **Given** the script, **When** a contributor runs it locally, **Then** it completes in under 10 seconds.

## Edge Cases

- Migration runner partially completes (rows copied, binaries moved, but rename of legacy table interrupted) → on next start, the idempotency guard detects the partial state and resumes, not restarts.
- WebSocket subscriber connects after some events have already been published → it receives only events from connect-time forward (broadcast channel semantics; no replay).
- Two operators trigger uninstall with `?force=true` simultaneously → the second receives 404 because the first already removed the row; the second does not redundantly fire `process_withdrawn`.
- A host-governed flag is passed both via raw argv (denied) AND the corresponding typed setting is opt-in → the typed setting wins; the raw argv is logged as a denial but does not fail the spawn.
- Extension declares two `runtime_dependencies` for the same family with conflicting version ranges → enable fails with a structured error naming the conflict, NOT a cryptic resolver error.

## Requirements *(mandatory)*

### Functional Requirements

#### Migration startup wiring

- **FR-101**: The host MUST invoke `migrate_from_legacy` + `relocate_legacy_binaries` + `hydrate_on_start` from `nexus-core::app::run` BEFORE the HTTP server binds.
- **FR-102**: Migration MUST be idempotent across restarts.
- **FR-103**: Migration failures MUST be surfaced via `tracing::error!(family, phase, error)` with structured fields at every fail site and MUST NOT cause silent corruption. The host startup MUST then panic with the same diagnostic context (operator-visible failure preferred over silent split-brain — see US1 acceptance scenario 3).

#### Extension-enable runtime dependency resolution

- **FR-104**: When an extension is enabled, the host MUST resolve every `runtime_dependencies` entry against `host_runtime_installs`.
- **FR-105**: Unsatisfied dependencies MUST cause enable to fail with HTTP 400 `RUNTIME_DEPENDENCY_UNMET` and a message naming the family, version range, and a link to the Backends panel.
- **FR-106**: Conflicting `runtime_dependencies` within a single extension manifest MUST surface as `RUNTIME_DEPENDENCY_CONFLICT` with both ranges named.

#### Host-governed launch flag default-deny

- **FR-107**: For every flag the parameter catalog classifies as `host-governed`, raw passthrough via spawn `args` or `env` MUST be rejected with `BackendRuntimeError::HostGovernedDenied { flag }`.
- **FR-108**: Each `host-governed` flag MUST have a corresponding typed host-setting opt-in (e.g. `llama_cpp.api_key`, `llama_cpp.tls_cert_path`).
- **FR-109**: When a typed opt-in is set, the host MUST inject the corresponding flag into the child argv before fork.
- **FR-110**: Every denial MUST emit `tracing::warn!(extension_id, family, flag, "host_governed_denied")`.

#### Backend event bridge

- **FR-111**: The host MUST expose `GET /api/v1/backends/events` as a WebSocket endpoint that streams `BackendEvent`s.
- **FR-112**: The endpoint MUST support filtering by `family` and `runtime_install_id` query parameters.
- **FR-113**: The endpoint MUST handle `tokio::broadcast::error::RecvError::Lagged(N)` by sending a structured warning frame and keeping the connection open.
- **FR-114**: `AppState` MUST expose the `BackendEvent` bus publisher so handlers other than `Spawner` (e.g., install pipeline) can publish.

#### Missing FR-016 lifecycle events

- **FR-115**: The install pipeline MUST emit `install.completed` topic on completion and `install.repaired` after a successful repair operation. (Topic strings follow the existing dotted convention in `events.rs`.)
- **FR-116**: The validator MUST emit `install.unavailable` topic when transitioning an install to `needs_repair` state.
- **FR-117**: The uninstall flow MUST emit `process.withdrawn` topic (distinct from `process.exited`) when terminating live leases as part of forced uninstall.

#### Drain-then-uninstall

- **FR-118**: `DELETE /api/v1/backends/{installId}` MUST default to `?force=false` and return 409 `RUNTIME_IN_USE` with a dependent list when live leases exist.
- **FR-119**: With `?force=true`, the handler MUST drain live leases, fire `process_withdrawn` events, remove the binary directory, and delete the row, in that order.
- **FR-120**: Force-uninstall MUST NOT block on a single misbehaving lease for more than 10 seconds (then SIGKILL).

#### Verification

- **FR-121**: The script `scripts/verify-spec-011.sh` MUST assert: (a) `nexus-backend-runtimes` Cargo manifest has zero `extension-*` or `local-llm-*` dep entries, (b) `cargo metadata` shows no edges to extension crates, (c) `cargo check --workspace` is green.
- **FR-122**: The script MUST be added to CI documentation.

### Key Entities

- **HostGovernedDenial**: structured log + error event capturing `(extension_id, family, flag, attempted_value_redacted)`.
- **RuntimeDependencyResolution**: result of resolving an extension's manifest dependencies against `host_runtime_installs`; carries either `Satisfied(install_id)` or `Unmet { family, range, available_versions }`.
- **BackendEventSubscription**: per-WebSocket-connection filter + broadcast receiver.
- **UninstallContext**: `{ install_id, force: bool, dependents: Vec<ExtensionId>, live_leases: Vec<LeaseId> }`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-101**: Starting the host with a seeded legacy DB results in `host_runtime_installs` populated and the binary at the new path, with zero user intervention.
- **SC-102**: Enabling an extension with an unmet runtime dependency returns HTTP 400 within 100ms.
- **SC-103**: Passing `--api-key` via raw spawn args returns HTTP 422 within 50ms; the corresponding typed opt-in injects the flag without the extension passing it.
- **SC-104**: A WebSocket subscriber to `/api/v1/backends/events` receives `process.started` within 1 second of the spawn call.
- **SC-105**: All seven FR-016 event variants (`installed`, `repaired`, `unavailable`, `process.started`, `channel.ready`, `process.exited`, `process_withdrawn`) are emitted by at least one code path and observable via the WebSocket bridge.
- **SC-106**: `DELETE /api/v1/backends/{installId}?force=true` against a live lease completes in under 12 seconds (10s grace + 2s overhead) and removes the binary directory.
- **SC-107**: `bash scripts/verify-spec-011.sh` exits 0 on a clean tree and non-zero when a host→extension dep edge is introduced.

## Assumptions

- The `BackendEvent` bus broadcast capacity (1024) is sufficient for typical UI subscription patterns; lag handling (FR-113) covers overflow.
- Typed host-setting opt-ins for security-governed flags can be stored in the existing `runtime_settings` table without schema migration (extend JSON shape only).
- The `nexus-core::app::run` startup sequence has a clear pre-API-bind hook point; otherwise we add one in this spec.
- Extension-enable path lives in `nexus-extension::registry` or `nexus-core::extensions`; locating it is part of FR-104 implementation.

## Non-Goals

- **No new runtime families** — this spec is hardening of the existing Spawner contract.
- **No frontend lift** — the new WS endpoint is host-side only. Frontend `backends_view.tsx` rewrite stays in spec 013 (or beyond).
- **No new spec-kit primitives** — works within the existing spec/plan/tasks flow.
- **No test infra rewrite** — uses `DelayedHealthServer` from spec 011 + standard `axum::Router::oneshot` patterns.

## Companion Artifacts

- `contracts/host_backends_events_ws.http` — WebSocket upgrade contract for `/api/v1/backends/events`.
- `contracts/host_backends_uninstall.http` — extends spec 011's contract with the `?force=true` semantics.
- `contracts/extension_enable_runtime_dep_unmet.http` — error envelope for FR-105.
