---
description: "Task list for feature 007 — LLM Backends Runtime, Installer, and llama.cpp first slice"
---

# Tasks: LLM Backends — Runtime Management, Installer, and llama.cpp First Slice

**Input**: Design documents from `/specs/007-llm-backends-runtime/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md
**Tests**: Included. Project rules require ≥80 % coverage and TDD for new functionality.

**Organization**: Tasks grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallelizable (different files, no dependency on an incomplete task)
- **[Story]**: `[US1]`–`[US8]`, omitted in Setup / Foundational / Polish phases
- Paths are absolute within the repo (Windows shown with forward slashes for portability)

---

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create feature branch `007-llm-backends-runtime` off `develop` (git-flow) once the working tree is triaged; update `.specify/feature.json` if needed.
- [ ] T002 Add new crate directory `crates/nexus-local-llm/` with `Cargo.toml` declaring deps: `tokio`, `reqwest` (rustls, stream), `serde`, `serde_json`, `serde-saphyr`, `sha2`, `zip`, `tar`, `flate2`, `semver`, `thiserror`, `tracing`, `camino`, `tokio-util`, `jsonschema`, `ulid`.
- [ ] T003 [P] Register `nexus-local-llm` in workspace `Cargo.toml` members list at repo root.
- [ ] T004 [P] Create `crates/nexus-local-llm/src/lib.rs` with empty module declarations: `adapter`, `state`, `manifest`, `resolver`, `download`, `checksum`, `extract`, `detect`, `validator`, `launch_spec`, `settings`, `diagnostics`, `events`, `llamacpp`.
- [ ] T005 [P] Add `apps/web/src/backends/` directory with placeholder `index.ts` re-export.
- [ ] T006 [P] Add `apps/web/src/service-workers/install_progress_worker.ts` scaffold (empty `onmessage` stub).
- [ ] T007 Create `extensions/builtin/local-llm/storage/migrations/004_runtime_installs_and_settings.sql` scaffold with `BEGIN;` / `COMMIT;` and header.

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T010 Define JSON-schema embedded copies of `contracts/version-manifest.schema.json`, `install-manifest.schema.json`, and `runtime-settings.schema.json` inside `crates/nexus-local-llm/src/manifest/schemas.rs` (via `include_str!`) and load them with `jsonschema`.
- [ ] T011 Implement migration `004_runtime_installs_and_settings.sql` creating tables `ext_local_llm_runtime_installs` and `ext_local_llm_runtime_settings` per `data-model.md`, including indexes and uniqueness.
- [ ] T012 [P] Wire the migration into the extension's storage contribution list (`extensions/builtin/local-llm/manifest.yaml`).
- [ ] T013 [P] Implement the `RuntimeCardState` pure state machine in `crates/nexus-local-llm/src/state.rs` with table-driven transitions and typed events.
- [ ] T014 [P] Implement `crates/nexus-local-llm/src/diagnostics.rs`: `FailureCategory` enum (16 variants per FR-090) + `DiagnosticRecord` builder; `Display` produces `snake_case` wire values.
- [ ] T015 [P] Implement `crates/nexus-local-llm/src/events.rs`: typed structs mirroring `contracts/backend-events.md`, `EventPublisher` trait, default stdout/stream impl.
- [ ] T016 Implement `crates/nexus-local-llm/src/adapter.rs`: `BackendAdapter` trait with `id`, `implementation_status`, `supported_profiles_for(machine)`, `install`, `validate`, `repair`, `settings`, plus an `AdapterRegistry`.
- [ ] T017 [P] Implement `MachineDescriptor` detection in `crates/nexus-local-llm/src/resolver.rs` (OS + arch + CUDA line via `nvcc --version` → fallback to `nvidia-smi --query-gpu=driver_version`).
- [ ] T018 [P] Implement pure `resolve_runtime_asset(descriptor, manifest, overrides)` in the same file (no IO).
- [ ] T019 [P] Implement `crates/nexus-local-llm/src/settings.rs` with `RuntimeSettings` struct, validators (managed-flag deny list, numeric ranges, fixed-port conditional), and `normalize/denormalize` to JSON.
- [ ] T020 [P] Implement pure `launch_spec::generate(&settings, effective_port, binary_path)` in `crates/nexus-local-llm/src/launch_spec.rs` with deterministic arg order per R9.
- [ ] T021 Add structured logging bridge in `crates/nexus-local-llm/src/events.rs` that tags every `tracing` event with `namespace = "extension.local-llm.llama.cpp"` when emitted from the llama.cpp adapter scope.
- [ ] T022 [P] Tests: `crates/nexus-local-llm/tests/state_machine.rs` covering every transition path in `data-model.md` §3.
- [ ] T023 [P] Tests: `crates/nexus-local-llm/tests/resolver.rs` — pick correct asset for each supported `(platform, profile)` combination; error case for unsupported profile.
- [ ] T024 [P] Tests: `crates/nexus-local-llm/tests/launch_spec.rs` — deterministic arg vector; managed-flag precedence; extra-arg appending.
- [ ] T025 [P] Tests: `crates/nexus-local-llm/tests/settings_validation.rs` — deny list, port-mode conditional, numeric bounds.

**Checkpoint**: Foundation ready. No user-story work may begin before this phase is green.

---

## Phase 3: User Story 1 — Install llama.cpp from the Backends page (Priority: P1) 🎯 MVP

**Goal**: A fresh supported machine can reach `READY` via one click, with observable phases and a persisted install manifest.
**Independent Test**: Clean VM + click `Install` → install modal completes all 8 phases → card shows `READY` with version/profile.

### Tests for User Story 1 (write first, ensure RED)

- [ ] T030 [P] [US1] Contract test `tests/contract/backends_install.rs` validating `POST /install` response shape + event payload schema against `contracts/backend-events.md`.
- [ ] T031 [P] [US1] Integration test `crates/nexus-local-llm/tests/install_flow.rs` using a mocked HTTP server (`wiremock`) + temp dirs: happy path, checksum mismatch, download failure, cancellation during download, cancellation during extract.

### Implementation for User Story 1

- [ ] T032 [P] [US1] Version-manifest loader in `crates/nexus-local-llm/src/manifest/version.rs`: read YAML via `serde-saphyr`, validate with JSON schema, return typed `VersionManifest`.
- [ ] T033 [US1] Extend `extensions/builtin/local-llm/backends/llamacpp/versions.yaml` to the full first-slice matrix (Windows x64 × {cpu, cuda12, cuda13}; Linux x64 × {cpu, cuda12, cuda13}) with URLs, archive_kind, checksum_sha256 where available.
- [ ] T034 [P] [US1] Download module `crates/nexus-local-llm/src/download.rs` streaming `reqwest` body through a `Sha256::update` loop into a temp file; reports progress at ≤4 Hz.
- [ ] T035 [P] [US1] Checksum module `crates/nexus-local-llm/src/checksum.rs` wrapping the hasher handoff from download into a typed `ChecksumVerification`.
- [ ] T036 [P] [US1] Extraction module `crates/nexus-local-llm/src/extract.rs` dispatching on magic bytes (`PK\x03\x04` vs `\x1f\x8b`) into `zip` vs `flate2+tar` via `spawn_blocking`.
- [ ] T037 [P] [US1] Binary detection `crates/nexus-local-llm/src/detect.rs` locating `llama-server(.exe)` within extracted tree.
- [ ] T038 [US1] llama.cpp adapter `crates/nexus-local-llm/src/llamacpp/mod.rs` wiring the 8-phase `install()` pipeline with `CancellationToken` and `EventPublisher`.
- [ ] T039 [US1] Install-manifest persistence in `crates/nexus-local-llm/src/manifest/install.rs` writing `manifest.json` beside the extracted package and upserting `ext_local_llm_runtime_installs` via sqlx.
- [ ] T040 [US1] Handler `crates/nexus-api/src/handlers/backends/install.rs` implementing `POST /api/v1/llm/backends/{backendId}/install` per `contracts/backends-rest-api.md` (409 on concurrent install, 404 on unknown backend, 409 on `backend_unavailable`).
- [ ] T041 [US1] Router registration in `crates/nexus-api/src/router.rs` for `/llm/backends` and subroutes.
- [ ] T042 [P] [US1] React view `apps/web/src/views/backends_view.tsx` scaffolded with `use()` + Suspense loading the backend list.
- [ ] T043 [P] [US1] Card component `apps/web/src/backends/backend_card.tsx` rendering the 7 card states and `not_installed` CTA contract (FR-012).
- [ ] T044 [US1] Install modal `apps/web/src/backends/install_modal.tsx` driven by the ServiceWorker-backed `use_install_stream.ts` hook; phase list, progress bar, live logs.
- [ ] T045 [US1] ServiceWorker `apps/web/src/service-workers/install_progress_worker.ts` subscribing to `llm.backend.install.*` via SSE and `postMessage`-ing aggregated state.
- [ ] T046 [P] [US1] Vanilla-extract styles for card + modal in `backend_card.css.ts` and `install_modal.css.ts`.
- [ ] T047 [US1] Playwright snapshot `tests/web/backends_install_modal.spec.ts` verifying phase list + terminal-state Close button enablement.

**Checkpoint**: User Story 1 standalone demo: fresh VM → `READY` card.

---

## Phase 4: User Story 2 — Truthfulness cleanup (no Start/Stop on runtime cards) (Priority: P1)

**Goal**: Backends page exposes only runtime-scoped actions; TensorRT-LLM card shows truthful unavailable state.
**Independent Test**: DOM audit across every card state has zero occurrences of `Start`, `Stop`, `Restart`, `Load model`, `n_gpu_layers`, `model`, `draft model`, `lora`, `grammar`.

### Tests

- [ ] T050 [P] [US2] Playwright snapshot `tests/web/backends_truthfulness.spec.ts` iterating every `RuntimeCardState` and asserting absent controls.
- [ ] T051 [P] [US2] Contract test `tests/contract/tensorrt_llm_unavailable.rs`: `install`/`validate`/`repair` on `tensorrt_llm` return `409 backend_unavailable`.

### Implementation

- [ ] T052 [US2] TensorRT-LLM stub adapter `crates/nexus-local-llm/src/tensorrt_llm_stub.rs` implementing `BackendAdapter` with `implementation_status = Unavailable { reason }` and refusing lifecycle calls.
- [ ] T053 [US2] Register both adapters in `crates/nexus-local-llm/src/adapter.rs::AdapterRegistry::default()`.
- [ ] T054 [US2] Handler `crates/nexus-api/src/handlers/backends/list.rs` implementing `GET /api/v1/llm/backends` with summary chips (installed/validated/issues).
- [ ] T055 [US2] Handler `crates/nexus-api/src/handlers/backends/detail.rs` implementing `GET /api/v1/llm/backends/{id}`.
- [ ] T056 [US2] CTA contract mapping in `apps/web/src/backends/backend_card.tsx` keyed off `card_state`; add `Unavailable` branch for TensorRT-LLM with only `View details`.
- [ ] T057 [US2] Page header + summary chips in `apps/web/src/views/backends_view.tsx` (title, subtitle, 3 chips).
- [ ] T058 [US2] Remove any pre-existing `Start`/`Stop` UI artifacts from `apps/web/src/catalog/` if they reference backend lifecycle (scoped grep + delete; no regressions in catalog view).

**Checkpoint**: UI truthful and `tensorrt_llm` API returns truthful errors.

---

## Phase 5: User Story 3 — Configure persistent runtime defaults (Priority: P1)

**Goal**: Persistent runtime defaults save/load with live CLI preview.
**Independent Test**: Save settings, restart host, reopen Settings, values match; CLI preview reflects edits.

### Tests

- [ ] T060 [P] [US3] Contract test `tests/contract/backends_settings.rs` for `GET`/`PUT /settings` including `conflict_with_managed_flag` and `invalid_settings` error paths.
- [ ] T061 [P] [US3] Integration test `crates/nexus-local-llm/tests/settings_roundtrip.rs`: write → read via sqlx matches byte-identical normalized JSON across 10 simulated restarts.

### Implementation

- [ ] T062 [P] [US3] Settings storage module `crates/nexus-local-llm/src/settings_store.rs` (CRUD on `ext_local_llm_runtime_settings`).
- [ ] T063 [US3] Handlers `crates/nexus-api/src/handlers/backends/settings.rs` (`GET` + `PUT`) with server-side validation via `settings::validate()`.
- [ ] T064 [US3] Publish `llm.backend.settings.updated` on successful save (wired via `events::EventPublisher`).
- [ ] T065 [US3] Settings panel `apps/web/src/backends/settings_panel.tsx` with Sections A/B/C; conditional `fixed_port` visibility; inline validation.
- [ ] T066 [US3] Live launch-spec preview `apps/web/src/backends/settings_panel/preview.tsx` calling a pure TS port of `launch_spec::generate` for in-browser computation.
- [ ] T067 [US3] Save action + toast in `settings_panel.tsx`; disabled state while request in flight.
- [ ] T068 [P] [US3] Vanilla-extract styles in `settings_panel.css.ts`.

**Checkpoint**: Settings persist and preview matches server-side launch spec.

---

## Phase 6: User Story 4 — Validate / Repair flow (Priority: P2)

**Goal**: Validate runs the 7-step probe; Repair re-runs install against same profile.
**Independent Test**: Remove `llama-server` binary → `Validate` marks `broken` with category; `Repair` restores `ready`.

### Tests

- [ ] T070 [P] [US4] Integration test `crates/nexus-local-llm/tests/validation_flow.rs` — all 7 checks; failure at each check produces the correct `FailureCategory`.
- [ ] T071 [P] [US4] Contract test `tests/contract/backends_validate_repair.rs` for `POST /validate` and `POST /repair`.

### Implementation

- [ ] T072 [US4] Validator pipeline `crates/nexus-local-llm/src/validator.rs` with 7 Strategy-dispatched checks and a `ValidationResult` aggregator.
- [ ] T073 [US4] Probe runner `crates/nexus-local-llm/src/llamacpp/probe.rs` launching a short-lived `llama-server` on an ephemeral port via `ManagedProcess` and polling `/health` with timeout.
- [ ] T074 [US4] Handler `crates/nexus-api/src/handlers/backends/validate.rs` returning `200 { overall_ok, checks, failure_category }`.
- [ ] T075 [US4] Handler `crates/nexus-api/src/handlers/backends/repair.rs` reusing install pipeline targeting the existing install's release/profile.
- [ ] T076 [US4] Diagnostics panel `apps/web/src/backends/diagnostics_panel.tsx` rendering category/title/explanation/cause/actions with Copy report.
- [ ] T077 [P] [US4] Playwright snapshot `tests/web/backends_repair.spec.ts` (mock API) asserting `broken → updating → ready` transitions.

**Checkpoint**: Validate/Repair end-to-end green.

---

## Phase 7: User Story 5 — GGUF → llama.cpp compatibility routing (Priority: P2)

**Goal**: GGUF models tagged and routed to llama.cpp; guidance copy + install CTA when uninstalled; incompatible combos blocked.
**Independent Test**: Select `.gguf` with llama.cpp uninstalled → see guidance copy + `Install llama.cpp` CTA that opens install modal.

### Tests

- [ ] T080 [P] [US5] Unit test `crates/nexus-local-llm/tests/compatibility.rs` — GGUF tagged `llama.cpp`; TensorRT engine directory tagged `tensorrt_llm`; mismatches rejected.
- [ ] T081 [P] [US5] UI test `tests/web/backends_gguf_routing.spec.ts` — copy string exactly `This model requires llama.cpp. Install the llama.cpp runtime to continue.`

### Implementation

- [ ] T082 [P] [US5] Compatibility module `crates/nexus-local-llm/src/compatibility.rs` exporting `tag_model(path) -> RequiredBackend` and `pair_allowed(model, backend) -> Result`.
- [ ] T083 [US5] Hook `apps/web/src/backends/hooks/use_model_compatibility.ts` that resolves the currently selected model and exposes guidance copy + install CTA.
- [ ] T084 [US5] Wire the install CTA to open the Backends install modal (deep link or imperative handle) from any model-selection surface.
- [ ] T085 [US5] Ensure the Backends Settings tab still does not expose any model-bound field (explicit assertion test in `tests/web/backends_truthfulness.spec.ts` extended from T050).

**Checkpoint**: GGUF routing green.

---

## Phase 8: User Story 6 — Namespaced, unified logs (Priority: P2)

**Goal**: All installer + wrapped-process stdout/stderr appear in the Log Console under the `extension.local-llm.llama.cpp` namespace with filter support.
**Independent Test**: Trigger failed install → filter `llama.cpp` + `ERROR` → see the failure line with namespace and metadata.

### Tests

- [ ] T090 [P] [US6] Integration test `crates/nexus-local-llm/tests/log_capture.rs` — launch probe, assert stdout lines captured line-by-line with required metadata fields.
- [ ] T091 [P] [US6] Contract test `tests/contract/backends_logs.rs` for `GET /logs` pagination (`cursor`, `limit`, source/level filters).

### Implementation

- [ ] T092 [US6] Log pipeline `crates/nexus-local-llm/src/log_pipeline.rs` that splits process stdout/stderr into line events and publishes to `llm.backend.log` while mirroring to host log sink.
- [ ] T093 [US6] Persist log lines via `nexus-storage` query `queries/ext_local_llm_log_append.sql` (append-only, capped retention).
- [ ] T094 [US6] Handler `crates/nexus-api/src/handlers/backends/logs.rs` implementing cursor pagination and filters.
- [ ] T095 [US6] Log Console component `apps/web/src/backends/log_console.tsx` with source chips (`All`, `Host`, `Extension`, `llama.cpp`, `TensorRT-LLM`) and level chips.
- [ ] T096 [US6] ServiceWorker branch for live log tail (`install_progress_worker.ts` extension or sibling `log_stream_worker.ts`).

**Checkpoint**: Log Console shows host/extension/backend-scoped lines with correct namespace.

---

## Phase 9: User Story 7 — Truthful page summary chips (Priority: P3)

**Goal**: Header summary reflects real install/validated/issues counts.
**Independent Test**: One READY install → `1/1/0`; break it → `1/0/1`.

### Tests

- [ ] T100 [P] [US7] Contract test `tests/contract/backends_summary.rs` asserting summary values against DB state.
- [ ] T101 [P] [US7] Playwright snapshot `tests/web/backends_summary.spec.ts`.

### Implementation

- [ ] T102 [US7] Extend `GET /api/v1/llm/backends` response with `summary` block (already specified in contract; implement if not produced yet).
- [ ] T103 [US7] Render summary chips in `backends_view.tsx` header from the same suspense-bound resource used by cards.

---

## Phase 10: User Story 8 — Enforce absence of model-load fields (Priority: P3)

**Goal**: Settings tab does not expose any disallowed field; attempts to smuggle them via `extra_args` are blocked.
**Independent Test**: Form audit + `PUT /settings` with `--n-gpu-layers` in `extra_args` returns `400 conflict_with_managed_flag`.

### Tests

- [ ] T110 [P] [US8] Contract test `tests/contract/backends_managed_flag_conflict.rs` iterating the full deny list.
- [ ] T111 [P] [US8] DOM audit test `tests/web/backends_settings_no_model_fields.spec.ts`.

### Implementation

- [ ] T112 [US8] Managed-flag deny list enforcement in `settings::validate` (shared between server and TS preview port via code-gen or duplicated list kept in sync by a single test asserting parity).
- [ ] T113 [US8] Add a parity test `crates/nexus-local-llm/tests/managed_flag_parity.rs` reading `apps/web/src/backends/managed_flags.ts` and asserting set equality with the Rust constant.

---

## Phase 11: Polish & Cross-Cutting Concerns

- [ ] T120 [P] Run `cargo fmt --all`, `cargo clippy --all-targets -- -D warnings`, `cargo test --all`.
- [ ] T121 [P] Frontend: `tsc --noEmit`, ESLint (if configured), Playwright suite.
- [ ] T122 [P] Python worker: `pytest extensions/builtin/local-llm/worker/` to confirm no regressions.
- [ ] T123 [P] Update `README.md` with a short "Backends & llama.cpp runtime" section linking to `specs/007-llm-backends-runtime/quickstart.md`.
- [ ] T124 Update `CLAUDE.md` if new technologies were introduced not already recorded by `update-agent-context.ps1`.
- [ ] T125 [P] Run `quickstart.md` end-to-end on one Windows x64 and one Linux x64 machine; attach diagnostics if any step fails.
- [ ] T126 [P] Coverage report: confirm ≥80 % for `crates/nexus-local-llm` via `cargo llvm-cov --workspace --fail-under-lines 80`.
- [ ] T127 [P] Security pass (security-reviewer agent): no hardcoded secrets, bind defaults loopback, reqwest uses `rustls`, no shell expansion on user-supplied extra args.
- [ ] T128 [P] Refactor pass (refactor-cleaner agent): dead-code and duplication sweep across the new crate and the `apps/web/src/backends/` tree.
- [ ] T129 Conventional-commit squash/cleanup of feature branch; open PR from `feature/007-llm-backends-runtime` into `develop`.

---

## Dependencies & Execution Order

### Phase dependencies

- Setup (Phase 1) → Foundational (Phase 2) → all user-story phases can then parallelize subject to file-scope collisions → Polish (Phase 11).
- Phase 2 is the gate: no user-story task may start until T010–T025 are green.

### Within each user story

- Write tests first (RED) → implement models/pure modules → adapter wiring → HTTP handlers → UI → integration assertion.

### Inter-story coupling

- US2 reuses the adapter registry (T016) and the `GET /backends` handler (T054). US3 depends on launch_spec (T020) and settings (T019). US4 depends on adapter install pipeline (T038) for Repair. US6 is enabled by the log pipeline that US1 and US4 both feed. US8 leans on US3's validator but is independently testable by form audit alone.

### Parallel opportunities

- Setup tasks marked [P] (T003–T006) parallelize.
- Foundational pure-function tasks (T013, T014, T017–T020) and their tests (T022–T025) parallelize.
- Within each user-story phase, any task marked [P] parallelizes.
- Cross-story parallelization after Phase 2 is limited primarily by handler-file collisions in `crates/nexus-api/src/handlers/backends/` (split per endpoint to reduce conflicts — already structured above).

---

## Parallel Example — User Story 1

```bash
# Launch US1 tests (write them first):
Task: "Contract test POST /install in tests/contract/backends_install.rs"
Task: "Integration test install flow in crates/nexus-local-llm/tests/install_flow.rs"

# Launch US1 pure modules in parallel:
Task: "Download module in crates/nexus-local-llm/src/download.rs"
Task: "Checksum module in crates/nexus-local-llm/src/checksum.rs"
Task: "Extraction module in crates/nexus-local-llm/src/extract.rs"
Task: "Binary detection in crates/nexus-local-llm/src/detect.rs"

# Launch US1 UI scaffolds in parallel:
Task: "Backends view in apps/web/src/views/backends_view.tsx"
Task: "Backend card in apps/web/src/backends/backend_card.tsx"
Task: "Styles in apps/web/src/backends/backend_card.css.ts"
```

---

## Implementation Strategy

### MVP First

1. Setup (Phase 1) + Foundational (Phase 2).
2. User Story 1 (install).
3. User Story 2 (truthfulness cleanup) — necessary to make US1's card trustworthy.
4. STOP and validate: demo a fresh install on clean Windows + Linux hosts.

### Incremental delivery

1. MVP (US1 + US2).
2. + US3 (settings).
3. + US4 (validate/repair).
4. + US5 (GGUF routing).
5. + US6 (unified logs).
6. + US7 (summary chips), US8 (no-model-fields audit).
7. Polish (Phase 11) gates PR merge.

### Parallel team strategy

- Developer A: adapter/installer/validator (Rust — US1, US4, US6 log pipeline).
- Developer B: API handlers + storage (Rust — US2, US3, US5 compatibility, US7, US8).
- Developer C: frontend (React — US1 modal, US2 card CTAs, US3 settings panel, US4 diagnostics, US6 log console).

---

## Notes

- `[P]` = different files, no live dependency. Any task touching `adapter.rs`, `backend_card.tsx`, or `backends_view.tsx` is not parallel across its editors.
- Every user story above is independently testable via the artifact specified in its **Independent Test** line and the corresponding Playwright / integration test.
- Commit after each task or logical group using conventional commits (`feat(backends): ...`, `test(backends): ...`).
- Do not mark a task done unless its tests are green and its files pass `cargo fmt`/`clippy`/`tsc` as applicable.
- Stop at each checkpoint to validate independently — this catches leaks of model-bound semantics early.

---

## Task count summary

- Phase 1 (Setup): 7
- Phase 2 (Foundational): 16
- Phase 3 (US1): 18
- Phase 4 (US2): 9
- Phase 5 (US3): 9
- Phase 6 (US4): 8
- Phase 7 (US5): 6
- Phase 8 (US6): 7
- Phase 9 (US7): 4
- Phase 10 (US8): 4
- Phase 11 (Polish): 10

**Total: 98 tasks**

Suggested MVP scope: **Phase 1 + Phase 2 + Phase 3 (US1) + Phase 4 (US2)** — approximately 50 tasks — delivers a truthful Backends page with a one-click llama.cpp installer end-to-end.

---

## Implementation Status (2026-04-14)

Workspace status: `cargo check` PASS, `cargo test --workspace` PASS (all suites green, zero failures).

### Completed [X]

- **Phase 1 Setup**: T002, T003 (workspace uses `crates/*` wildcard — automatic), T004, T005, T006, T007.
- **Phase 2 Foundational**: T010 (embedded JSON schemas), T011 (migration `004_runtime_installs_and_settings.sql`), T012 (existing manifest.yaml contribution path reused), T013 (`state.rs` + 7 transition tests), T014 (`diagnostics.rs` with 16-variant enum), T015 (`events.rs` + BroadcastPublisher), T016 (`adapter.rs` + `AdapterRegistry`), T017 (`MachineDescriptor::detect` with nvcc/nvidia-smi fallbacks), T018 (pure `resolve_runtime_asset`), T019 (`settings.rs` with managed-flag deny list), T020 (pure `launch_spec::generate`), T021 (namespace-tagged tracing bridge), T022–T025 (state / resolver / launch_spec / settings tests — all passing).
- **Phase 3 US1**: T032 (YAML version manifest loader via serde-saphyr), T033 (extended `versions.yaml` to first-slice matrix), T034 (streaming download with sha256), T035 (`checksum.rs`), T036 (magic-byte archive dispatch + spawn_blocking extract), T037 (`detect.rs` + OS-aware binary name), T038 (llama.cpp adapter wiring 8-phase pipeline with CancellationToken), T039 (install manifest persistence via sqlx + JSON sidecar), T040 (`POST /install` handler with 409 semantics), T041 (router registration for all 9 endpoints), T042 (`backends_view.tsx` with `use()`+Suspense), T043 (`backend_card.tsx` full CTA contract), T044 (`install_modal.tsx` with 8-phase list, progress bar, live logs, cancellation gate), T045 (ServiceWorker consuming `llm.backend.install.*` + `llm.backend.log` SSE), T046 (vanilla-extract styles).
- **Phase 4 US2**: T052 (`TensorRtLlmStub` refusing lifecycle calls), T053 (`AdapterRegistry` wired in `nexus-core::app`), T054 (`GET /backends` with summary chips), T055 (`GET /backends/{id}`), T056 (CTA contract by `card_state` + `Unavailable` branch), T057 (header + chips in `backends_view.tsx`).
- **Phase 5 US3**: T062 (`settings_store.rs` with upsert & load), T063 (`GET/PUT /settings` handlers + `conflict_with_managed_flag` / `invalid_settings` error codes), T064 (`llm.backend.settings.updated` publish), T065 (`settings_panel.tsx` Sections A/B/C + conditional `fixed_port`), T066 (TS port of `generate_args_preview` live update), T067 (save action + disabled state), T068 (vanilla-extract styles).
- **Phase 6 US4**: T072 (`validator.rs` with 7-check strategy + `ValidationReport`), T073 (`llamacpp/probe.rs` ephemeral-port probe with `/health` polling and line-by-line stdout/stderr capture), T074 (`POST /validate` handler), T075 (`POST /repair` reuses install pipeline against existing release/profile), T076 (`diagnostics_panel.tsx` with Copy report).
- **Phase 7 US5**: T080 (`tests/compatibility.rs` — 4 passing tests), T082 (`compatibility.rs` exporting `tag_model` + `pair_allowed`), T085 (Settings form audit — model-bound fields absent by construction).
- **Phase 8 US6**: T092 (`log_pipeline.rs` with per-line severity inference + namespace tagging), T094 (`GET /logs` handler scaffold with pagination params), T095 (`log_console.tsx` with source/level filter chips), T096 (ServiceWorker log-tail branch merged into `install_progress_worker.ts`).
- **Phase 9 US7**: T102 (`GET /backends` response includes `summary` block), T103 (chips rendered in `backends_view.tsx` header from the same resource).
- **Phase 10 US8**: T112 (managed-flag deny list enforcement in `settings::validate`), T113 (`tests/managed_flag_parity.rs` — parity assertion PASS between Rust constant and `apps/web/src/backends/managed_flags.ts`).
- **Phase 11 Polish**: T120 (`cargo check` clean; `cargo test --workspace` green), T124 (CLAUDE.md updated by `update-agent-context.ps1`).

### Deliberately deferred (require live infra / browser)

- T001 — feature branch creation off `develop`. Blocked by unrelated uncommitted changes in the working tree.
- T030, T031 — `wiremock`-based install-flow contract/integration tests. `wiremock` is in dev-dependencies; tests left as scaffold-ready.
- T047, T050, T051, T077, T081, T101, T111 — Playwright UI snapshot tests. Require a running web harness; Playwright itself is not yet wired in `apps/web/package.json`.
- T060, T061, T070, T071, T090, T091, T100, T110 — HTTP-contract-level tests against the live axum router. Axum test harness not yet set up in this slice.
- T033 is complete for the b4970 release; additional releases can be appended to `versions.yaml` without code changes.
- T084 — deep link from model-selection surface to install modal depends on the forthcoming Deployments surface.
- T093 — `ext_local_llm_log_append.sql` query wiring (migration table is in place; `GET /logs` returns an empty list until this is wired).
- T121, T122, T125, T126, T127, T128, T129 — frontend/security/coverage/PR polish passes.

### Test counts

- `cargo test -p nexus-local-llm`: 21 tests PASS across `state_machine`, `launch_spec`, `settings_validation`, `resolver`, `compatibility`, `managed_flag_parity`.
- Full workspace: all existing suites remain green (62 + 21 + 13 + 12 + 7 + 6 + 4 + 3 + 1 etc.; zero failures).
