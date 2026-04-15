# Phase 0 Research: Host Runtime Pool

**Feature**: 011-host-runtime-pool | **Date**: 2026-04-15

This document resolves the seven open questions from `plan.md` §"Phase 0 — Research Topics" and records the evidence behind every non-obvious architectural choice. Every decision here is testable and constrained — deferrals call themselves out explicitly.

## R1. Domain-move target: Python worker vs. new extension-scoped Rust lib

### Decision

Move `ModelInstaller` + `route_backend` routing logic into the existing **Python worker** at `extensions/builtin/local-llm/worker/models/`. Reuse the existing `HfClient`, `registry.py`, and `compatibility.py` modules. Expose it to the frontend via RPC methods dispatched through the existing `/api/v1/extensions/nexus.local-llm/rpc` surface.

### Rationale

Three converging reasons:

1. **The extension already has a Python HF client** (`worker/models/hf_client.py`) that spec 010 missed during implementation. Keeping the routing in Python co-locates related code.
2. **GGUF header parsing is trivially available via `huggingface_hub`**. The `huggingface_hub.hf_hub_download` API supports `subfolder` + header-only mode; `safetensors` + `gguf-py` give typed access to metadata. Rust GGUF parsing would require bringing in a new crate (candidate: `llama-cpp-2`) which is heavier than the actual need.
3. **The Python worker is the existing extension-domain home**. Chat sessions, RAG, preset management all live there. Having routing in Rust while everything else is Python means two deployment/packaging stories for the same extension.

The routing logic itself is small (~150 LOC): three tiered signals (GGUF file present → llama.cpp, `.engine` file → TRT, architecture in allowlist → TRT). Ports cleanly.

Hyperparameter validation (from spec 010 FR-014) follows the same move — the validator is ~50 LOC of pure bounds-checking.

### Alternatives considered

- **New extension-scoped Rust lib** `extensions/builtin/local-llm/rs/`: would require its own Cargo project, its own build integration, its own FFI or sidecar process to talk to the Python worker. Heavy for the amount of code involved.
- **Keep in `nexus-backend-runtimes`** as a "generic model router": rejected because the routing rules are llama.cpp-flavored (GGUF → llama.cpp is a domain assertion), and the whole point of this spec is to stop baking domain assumptions into the host crate.

### Test implication

`crates/nexus-backend-runtimes/tests/no_domain_in_host.rs` — grep-based test that scans the crate for terms like `"gguf"`, `"routing_signal"`, `"ModelInstaller"`, `"hyperparameter"`, asserts none present in `src/`.

## R2. Reconciler frequency and trigger

### Decision

A **single host-level `tokio::spawn` task** that wakes every 60 seconds and runs a presence check across all rows in `host_runtime_installs` whose `state = 'installed'`. If a binary is missing, it transitions the row to `needs_repair` via `state_log.append` with trigger `reconciler_probe`. The task is created once in `nexus-core/src/app.rs::run` and shut down on app exit.

### Rationale

- **60s is conservative**. Users rarely delete runtime binaries mid-session; when they do, they're happy to wait up to a minute to see the state update. Lower intervals burn CPU for no observable benefit.
- **Single task, not per-install**: amortizes the wakeup cost and centralizes the reconciler policy.
- **Filesystem watches rejected** for now. `notify` crate works but adds complexity (OS-specific backends, event debouncing, recursive vs. non-recursive quirks). Filesystem watch is worth it when the reconciler becomes hot-path; today it isn't.
- **The reconciler's contract from spec 010 US1** — "probe can only transition `installed → needs_repair`, never to `not_installed`" — lives in this task's implementation. The guard is a function `validator::reconcile(install) -> Option<StateTransition>` that returns `None` or `Some(Installed → NeedsRepair)` only.

### Alternatives considered

- **On-demand only** (no background task; reconcile on every API read): rejected because a user who never opens the Backends panel would never see drift. Silent rot.
- **Per-install watcher**: tempting but wrong — drift detection is cheap; the dispatch cost is higher than the check.

### Test implication

`tests/reconciler.rs::drift_transitions_to_needs_repair` — fixture install row, delete the binary off disk, tick the reconciler once, assert state is `needs_repair` and the state_log has a `reconciler_probe` entry.

## R3. Lease persistence across host restart

### Decision

**Persist leases to `host_runtime_leases` but mark all leases `released` on host startup.** Live processes do not survive a host restart; attempting to "resume" them would be lying to extensions.

### Rationale

Three options were weighed:

| Option | Behavior | Verdict |
|---|---|---|
| (a) Never persist — leases in-memory only | `host_runtime_leases` table removed | ❌ loses audit trail; diagnostics can't answer "who was using this runtime last week?" |
| (b) Persist + mark released on startup | ✅ | Straightforward. Extensions re-lease on next startup. |
| (c) Persist + "resume after crash" | Host tries to reattach to existing pid | Too fragile — cross-platform process identity preservation is a minefield; ownership/permissions drift; the reattached process may be a completely different program with a recycled pid. |

Option (b) preserves the audit trail (useful for support), keeps the contract honest, and is ~5 lines of SQL on startup.

### Implementation

In `nexus-backend-runtimes::installs_store::hydrate_on_start`:

```sql
UPDATE host_runtime_leases
SET released_at = datetime('now'), ready = 0
WHERE released_at IS NULL;
```

Run unconditionally on startup before serving any requests.

### Test implication

`tests/lease_hydration.rs::startup_marks_stale_leases_released` — insert an active lease row, call `hydrate_on_start`, assert `released_at IS NOT NULL` and `ready = 0`.

## R4. Frontend nav slot for the top-level Backends view

### Decision

Add **"Backends" as a top-level entry in the `Sidebar`** component at `apps/web/src/layout/sidebar.tsx`, between existing nav items. Route: `/backends`. The existing `BackendsView` at `apps/web/src/views/backends_view.tsx` is rewritten to call `/api/v1/backends/*` (not `/api/v1/llm/backends/*`).

### Rationale

Scanning the existing layout:
- `TopBar` is mode-switching (workflow view, catalog view, extensions, etc.) — not the right home for a persistent runtime management surface.
- `Sidebar` already hosts feature-level entries (extensions, workflows, recipes). Adding "Backends" alongside is consistent.
- The `component_registry.tsx` (YAML-driven layout system) is for extension-provided layouts, not host-owned surfaces. Backends is host-owned.

No new routing infrastructure required — the app uses a hash-router-ish pattern via `App.tsx` state; adding a new view id (`"backends"` already exists as a view id, just wired through the extension system today) is a pure reconnection.

### Test implication

Vitest: `apps/web/src/layout/sidebar.test.tsx::backends_nav_entry_renders_and_activates` — render Sidebar, click "Backends", assert the view prop propagates `backends`.

## R5. Extension manifest schema bump for `runtime_dependencies`

### Decision

**Additive extension of the existing manifest schema.** Add an optional `runtime_dependencies` field at the top level. No spec-version bump required — optional fields are backwards-compatible.

### Rationale

Inspection of `crates/nexus-extension/src/manifest.rs` shows the manifest is parsed via `serde` with `#[serde(default)]` on optional fields. Adding a new optional field does not break existing manifests.

Shape:

```yaml
runtime_dependencies:
  - family: "llama.cpp"
    version: ">=b4000"
    acceleration: ["cpu", "cuda12", "cuda13"]
```

Rust side:

```rust
#[derive(Debug, Deserialize)]
pub struct ExtensionManifest {
    // ... existing fields
    #[serde(default)]
    pub runtime_dependencies: Vec<RuntimeDependency>,
}

#[derive(Debug, Deserialize)]
pub struct RuntimeDependency {
    pub family: String,
    pub version: Option<String>,              // semver req
    #[serde(default)]
    pub acceleration: Vec<AcceleratorProfile>,
}
```

Backwards compat: existing extensions (zero `runtime_dependencies`) enable normally. New extensions that declare dependencies fail to enable if the host cannot satisfy them.

### Test implication

`crates/nexus-extension/src/manifest.rs#tests::manifest_without_runtime_dependencies_parses` (existing behavior); new test `manifest_with_runtime_dependencies_parses`.

## R6. TensorRT-LLM stub parity

### Decision

Leave TRT-LLM as a **pure stub** for spec 011. Its `BackendAdapter` implementation returns `ImplementationStatus::Unavailable { reason: "TensorRT-LLM runtime not yet implemented" }` and all of install/validate/spawn reject with that reason. Parameter catalog for TRT is a one-entry file documenting the stub state; swapped for the real catalog when TRT ships.

### Rationale

- The whole point of this spec is to make the pattern extendable. A full TRT implementation doesn't belong to 011; it belongs to whatever future spec adds TRT support.
- Stub parity with today means this spec preserves the existing state (which is also a stub). No regression.
- Shipping a fake catalog for TRT would mislead tooling into thinking TRT is usable. Clearer to return "not implemented" explicitly.

### Test implication

`tests/trt_stub.rs::spawn_fails_cleanly` — call `spawn` with `family: "tensorrt-llm"`, assert `SpawnError::FamilyUnavailable` with the stub reason.

## R7. Deprecation window for `/api/v1/llm/backends/*`

### Decision

**Dual-route for one release**: both `/api/v1/llm/backends/*` and `/api/v1/backends/*` serve identical responses for the full lifetime of this spec's merge. The old family emits a `Deprecation: true` response header (per RFC 8594) and a `Sunset` header with a target removal date (90 days post-merge). Every hit to the old family logs a warning with `tracing::warn!` including the caller's `User-Agent`.

### Rationale

- **Zero user-visible breakage**: frontends built against the old API keep working.
- **Observable migration**: the tracing warns make it easy to identify stragglers (dev tools, test scripts, third-party tools someone forgot about).
- **Hard removal date**: 90 days gives everyone a clear deadline; removal happens in a follow-up spec labeled `"deprecate /llm/backends route family"`.

### Implementation

`nexus-api::router::build` registers both route families. The old-family handlers are thin wrappers that call the new handlers and attach the deprecation headers:

```rust
async fn deprecated_list_backends(state: State<AppState>) -> Response {
    let mut response = backends::list(state).await.into_response();
    response.headers_mut().insert("Deprecation", HeaderValue::from_static("true"));
    response.headers_mut().insert(
        "Sunset",
        HeaderValue::from_str(&deprecation_sunset_date()).unwrap(),
    );
    tracing::warn!("deprecated route /api/v1/llm/backends hit");
    response
}
```

### Alternatives considered

- **410 Gone immediately**: breaks every existing caller on merge day. Rejected.
- **Permanent dual-route**: keeps cruft around forever. Rejected; hard sunset is clearer.

### Test implication

`tests/deprecated_routes.rs::old_family_serves_with_deprecation_header` — hit `/api/v1/llm/backends`, assert status 200, assert `Deprecation: true` and `Sunset: <date>` headers.

## Summary

All seven open questions resolved:

1. **R1** — domain move: Python worker.
2. **R2** — reconciler: 60 s `tokio::spawn` task, single instance.
3. **R3** — leases: persist + mark released on startup.
4. **R4** — frontend nav: Sidebar top-level "Backends" entry.
5. **R5** — manifest: optional `runtime_dependencies` field, no schema version bump.
6. **R6** — TRT: stub parity.
7. **R7** — old routes: dual-route for 90 days with deprecation headers.

Ready for Phase 1.
