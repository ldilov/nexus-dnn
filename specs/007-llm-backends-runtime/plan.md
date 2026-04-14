# Implementation Plan: LLM Backends — Runtime Management, Installer, and llama.cpp First Slice

**Branch**: `007-llm-backends-runtime` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-llm-backends-runtime/spec.md`

## Summary

Refactor the Backends surface into a runtime-only management page, deliver a one-click installer for the upstream llama.cpp release executable, persist normalized runtime defaults, emit namespaced structured logs, classify failures into actionable diagnostics, and expose stable runtime identifiers that a future Deployments surface will consume. Model lifecycle and model-load options (Start/Stop, `n_gpu_layers`, model paths) are intentionally absent from this feature.

Technical approach: extend the existing `extensions/builtin/local-llm` extension with a Rust-side installer/validator/adapter living either in a new `crates/nexus-local-llm` crate or inside `nexus-extension`'s adapter layer; publish the nine REST endpoints and six event topics behind `nexus-api`; render the Backends page using the existing React 19 extension-layout renderer; store install/settings records under the extension-storage contribution (spec 004) in `ext_local_llm_*` tables.

## Technical Context

**Language/Version**: Rust (stable, 2024 edition) host + TypeScript 5.7 frontend; Python 3.12 worker (ServiceWorker adapter) — all already in use.
**Primary Dependencies**: tokio 1.48, axum 0.8, sqlx 0.8 (SQLite), serde/serde_json, tracing 0.1, thiserror 2.x, reqwest (HTTPS downloads), sha2 0.10 (checksum verification), zip 2.x / tar+flate2 (extraction), semver 1.0 (release pinning), zeroize-safe paths from `camino`; React 19 + vanilla-extract on the frontend; `nexus_sdk 0.2.0` ManagedProcess for the validation probe.
**Storage**: SQLite via extension-storage contributions (spec 004). New namespaced tables `ext_local_llm_runtime_installs` and `ext_local_llm_runtime_settings`; version manifest is a YAML file shipped inside `extensions/builtin/local-llm/backends/llamacpp/versions.yaml` (already present — extend schema to cover checksums and profile matrix).
**Testing**: `cargo test` (unit + integration per crate), `cargo test --test` for cross-crate flows, React Testing Library + Playwright for UI truthfulness snapshots, Python `pytest` for worker adapter changes. 80 %+ coverage required by project rules.
**Target Platform**: Host runs on Windows x64 and Linux x64 (first slice). First-slice accelerator profiles: CPU, CUDA 12, CUDA 13. Vulkan/HIP/SYCL/macOS out of scope.
**Project Type**: Multi-crate Rust workspace + React 19 web app + Python worker (web-service + desktop-style extension model).
**Performance Goals**: Install flow reaches `Complete` in under 5 minutes on a clean supported machine over typical broadband; validation probe completes in under 15 seconds; generated launch spec derivation is O(1) in normalized-config size.
**Constraints**: No source compilation of llama.cpp in the normal path; no network calls outside the install flow; binds to loopback by default; cancellation must be safe during resolve/download/verify/extract phases.
**Scale/Scope**: Single-host, single-user; up to a handful of concurrent runtime install tasks (typically one); hundreds of log lines/second sustained from wrapped processes.

## Constitution Check

Evaluated against v1.2.0 of `.specify/memory/constitution.md`:

- **I. Ecosystem-First** — PASS. Installer wraps upstream llama.cpp release binaries; downloads via `reqwest`, extraction via `zip`/`flate2`+`tar`, checksums via `sha2`, YAML via `serde-saphyr` (already in the tree), semver parsing via `semver`. No hand-rolled HTTP client, hash algorithm, archive parser, or YAML parser.
- **II. Pure Functions, SOLID & Design Patterns** — PASS. Pure functions for: launch-spec generation (normalized config → arg vector), asset resolver (machine descriptor + manifest → chosen asset), state-machine transition fn (current card state + event → next state). Side effects (HTTP, filesystem, subprocess) pushed to adapter boundary. Adapter pattern for backend families; Strategy for validation checks; Repository for install/settings records; Observer for event stream.
- **III. Extendability** — PASS. Adding a new backend family (future TensorRT-LLM, Vulkan profile) requires only a new adapter implementation and a new manifest entry; nothing in the page/renderer code is backend-specific beyond lookup by id.
- **IV. Self-Documenting Code** — PASS. No inline comments; names like `resolve_runtime_asset`, `VerifyChecksum`, `RuntimeCardState::InstalledUnvalidated` carry intent. Module-level docs may describe safety invariants, but inline comments are forbidden.
- **V. Git-Flow Branching** — PENDING. Feature branch `007-llm-backends-runtime` not yet created because the working tree carries unrelated modifications; the plan assumes the branch will be created off `develop` before implementation begins. Tracked in the Complexity Tracking table.
- **VI. Living Documentation** — PASS. `README.md` and `CLAUDE.md` will be updated by the agent-context script; user-facing docs for the Backends page ship as `quickstart.md` in this feature directory.
- **VII. Clean Provenance** — PASS. No generator markers are introduced.
- **VIII. Memory Safety** — PASS. No `unsafe` blocks are required. All process IO is via `tokio::process` through the existing `ManagedProcess` wrapper. All fallible operations return `Result` with typed error enums (`InstallError`, `ValidationError`, `RuntimeAdapterError`).
- **IX. Parallelism-First** — PASS. Download + checksum pipeline overlaps read with hash; extraction runs on `spawn_blocking`; log mirroring runs as a dedicated task; validation health-probe and stdout/stderr readers run concurrently. No blocking IO on async threads.
- **X. Modern React Patterns** — PASS. Page uses `use()` for suspense-driven data loading, Error Boundaries for failure states, no manual memoization, and offloads the install-progress stream to a ServiceWorker (the install event topic publishes frequently — well under 10 s between events — which matches the ServiceWorker guidance in the constitution).

**Complexity Tracking**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Branch `007-llm-backends-runtime` not yet created off `develop` at plan time | Working tree has many unrelated uncommitted modifications; creating the branch now would entangle them with this feature | Creating the branch with a dirty tree would violate the project's clean-provenance and git-flow discipline. The branch will be created at the start of implementation once the tree is triaged. |
| Separate `crates/nexus-local-llm` vs embedding logic in `nexus-extension` | Keeping the adapter + installer + validator + launch-spec in a focused crate preserves SRP and avoids bloating `nexus-extension` | Merging into `nexus-extension` would give that crate two unrelated reasons to change (generic extension host vs local-llm runtime) |

## Project Structure

### Documentation (this feature)

```text
specs/007-llm-backends-runtime/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── backends-rest-api.md
│   ├── backend-events.md
│   ├── version-manifest.schema.json
│   ├── install-manifest.schema.json
│   └── runtime-settings.schema.json
├── checklists/
│   └── requirements.md  # Already written by /speckit.specify
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
crates/
├── nexus-local-llm/                       # NEW — runtime adapter + installer
│   ├── Cargo.toml
│   ├── src/
│   │   ├── lib.rs
│   │   ├── adapter.rs                     # BackendAdapter trait + registry
│   │   ├── state.rs                       # RuntimeCardState state machine (pure)
│   │   ├── manifest/
│   │   │   ├── mod.rs
│   │   │   ├── version.rs                 # Pinned version manifest loader
│   │   │   └── install.rs                 # Install manifest (per-install record)
│   │   ├── resolver.rs                    # (MachineDescriptor, Manifest) -> Asset (pure)
│   │   ├── download.rs                    # HTTPS + progress (reqwest stream)
│   │   ├── checksum.rs                    # sha256 streaming verification
│   │   ├── extract.rs                     # zip/tar.gz dispatch
│   │   ├── detect.rs                      # Binary + dependency detection
│   │   ├── validator.rs                   # 7-step validation pipeline
│   │   ├── launch_spec.rs                 # Normalized settings -> arg vector (pure)
│   │   ├── settings.rs                    # Normalized runtime settings model
│   │   ├── diagnostics.rs                 # FailureCategory enum + report builder
│   │   ├── events.rs                      # llm.backend.* topic publishers
│   │   └── llamacpp/
│   │       ├── mod.rs                     # llama.cpp adapter impl
│   │       ├── assets.rs                  # Profile matrix (Windows/Linux × CPU/CUDA12/CUDA13)
│   │       └── probe.rs                   # `--version` + health endpoint probe
│   └── tests/
│       ├── resolver.rs
│       ├── launch_spec.rs
│       ├── state_machine.rs
│       ├── install_flow.rs                # End-to-end with mocked HTTP + temp dirs
│       └── validation_flow.rs
│
├── nexus-api/
│   └── src/handlers/backends.rs           # NEW — 9 REST endpoints wired here
├── nexus-storage/
│   └── queries/                           # NEW migration + queries for ext_local_llm_runtime_*
└── nexus-extension/                       # Untouched by this feature

extensions/builtin/local-llm/
├── manifest.yaml                          # UPDATED — add backends-page UI contribution if missing
├── backends/llamacpp/versions.yaml        # UPDATED — full profile matrix + checksums
└── worker/backends/                       # UPDATED — Python adapter bindings where applicable

apps/web/src/
├── views/backends_view.tsx                # NEW page view (uses layout_renderer)
├── views/backends_view.css.ts
├── backends/
│   ├── backend_card.tsx
│   ├── backend_card.css.ts
│   ├── install_modal.tsx
│   ├── install_modal.css.ts
│   ├── settings_panel.tsx
│   ├── settings_panel.css.ts
│   ├── diagnostics_panel.tsx
│   ├── log_console.tsx
│   └── hooks/
│       ├── use_backends.ts                # use() + Suspense boundary
│       └── use_install_stream.ts          # ServiceWorker-backed
└── service-workers/
    └── install_progress_worker.ts         # NEW

tests/
├── contract/backends_api.rs               # REST envelope + event payload schema
├── integration/backends_flow.rs           # Install → validate → settings → logs
└── web/                                   # Playwright snapshot: no Start/Stop on cards
```

**Structure Decision**: Add a new focused Rust crate `nexus-local-llm` that owns the adapter, installer, validator, and launch-spec logic; wire its HTTP surface through new handlers in `nexus-api`; persist records via `nexus-storage` using the extension-storage contribution introduced by spec 004. The Backends page is added under `apps/web/src/views/` and rendered by the existing extension-layout renderer, reusing the design system from spec 003. The Python worker (`extensions/builtin/local-llm/worker/`) is untouched by the runtime-installer slice but remains the process host for the wrapped `llama-server` at deployment time.

---

## Phase 0 — Research

See [research.md](./research.md).

## Phase 1 — Design & Contracts

See:
- [data-model.md](./data-model.md)
- [contracts/backends-rest-api.md](./contracts/backends-rest-api.md)
- [contracts/backend-events.md](./contracts/backend-events.md)
- [contracts/version-manifest.schema.json](./contracts/version-manifest.schema.json)
- [contracts/install-manifest.schema.json](./contracts/install-manifest.schema.json)
- [contracts/runtime-settings.schema.json](./contracts/runtime-settings.schema.json)
- [quickstart.md](./quickstart.md)

Post-design Constitution re-check: PASS (no new violations introduced by contracts or data model).

## Phase 2 — Tasks (deferred)

Run `/speckit.tasks` next to generate `tasks.md`.
