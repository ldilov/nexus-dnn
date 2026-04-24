---
description: "Tasks for spec 031 — EmotionTTS Extension (IndexTTS-2 Dialogue Synthesis)"
---

# Tasks: EmotionTTS Extension

**Input**: Design documents at [specs/031-emotiontts-extension/](./)
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: INCLUDED for backend (Rust + Python). Frontend follows Principle VI design-heavy UI carve-out (R-08) — only one Playwright smoke test + a vitest contract-schema parity test; per-component unit tests are deferred to a post-v1 hardening sprint.

**Organization**: Tasks grouped by user story so each can be implemented and shipped as an independent increment.

**Path Conventions**: Everything lives under `extensions/builtin/emotion-tts/`. No new files under `crates/` or `apps/web/src/` (Principle XIII).

---

## 🚫 BLOCKER — Host-side prerequisite (NOT part of this spec)

Spec 031 cannot be implemented until a separate host spec lands the **generic backend-runtime catalog + lease API** (D-01 / D-02 / Story 5). Expected capabilities:

- `RuntimeFamily::Python` variant (or trait-based family replacement) in [crates/nexus-backend-runtimes/src/family.rs](../../crates/nexus-backend-runtimes/src/family.rs).
- `backend_runtime_catalog`, `backend_runtime_installs`, `backend_runtime_settings`, `backend_runtime_leases` tables (see [data-model.md §1](./data-model.md)).
- Generic HTTP surface: `GET /api/v1/backend-runtimes`, `POST /api/v1/backend-runtimes/:runtime_id/install`, `POST /api/v1/backend-runtime-installs/:install_id/start|stop|restart`.
- Trait `BackendRuntimeLease` that extensions consume as `Arc<dyn BackendRuntimeLease>`.
- Generic Backends UI page under `apps/web/src/views/backends/` (NO extension id literals).

Do not start Phase 1 below until a PR merging the prerequisite spec to `main` exists. If forced to start early for research purposes, use the in-process mock in [tests/fixtures/mock_backend.rs](#).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Repo skeleton, tool init, no business logic.

- [X] T001 Create directory skeleton `extensions/builtin/emotion-tts/{rust,worker,storage/migrations,backends/indextts,recipes,workflows,operators,web,scripts}` per [plan.md §Project Structure](./plan.md).
- [X] T002 Write `extensions/builtin/emotion-tts/manifest.yaml` declaring extension id `nexus.audio.emotiontts`, compatibility, capabilities (`filesystem.read`, `filesystem.write`, `process.spawn`, `gpu.compute`, `storage.schema_contribute`), operator paths, recipe path, storage namespace alias `emotion_tts`, and the `backend_runtime` contribution entry pointing at `backends/indextts/backend-runtime.yaml`. Landed as `manifest.yaml` — backend_runtimes entry points at `backends/indextts/versions.yaml` for asset pins; the peer `backend-runtime.yaml` descriptor lands with T028.
- [X] T003 [P] Scaffold Rust package `extensions/builtin/emotion-tts/rust/Cargo.toml` (NOT a workspace member), pin workspace Rust toolchain via `rust-toolchain.toml` symlink, add deps `axum`, `tokio`, `serde`, `serde_json`, `tracing`, `thiserror`, `anyhow`, `ulid`, `sha2`, `sqlx` (or host storage trait), `async-trait`. Landed as `rust/Cargo.toml` + `rust/rust-toolchain.toml` (channel 1.84). `sqlx` pinned to 0.8 with sqlite+tokio+chrono features; `unsafe_code = "forbid"` via `[lints.rust]`.
- [X] T004 [P] Scaffold Python worker at `extensions/builtin/emotion-tts/worker/pyproject.toml` with `uv` project descriptor: Python 3.11, deps `index-tts`, `torch` (CUDA 12.8 wheel index), `transformers`, `torchaudio`, `numpy`, `pydantic`, `ffmpeg-python`, dev-deps `pytest`, `pytest-asyncio`. Commit `uv.lock`. Landed as `worker/pyproject.toml` with `[tool.uv.sources]` pinning torch/torchaudio to the pytorch-cu128 index; deepspeed is an optional extra (Windows-off default per R-07). `uv.lock` deferred until T048 so a deterministic resolve can happen on a machine with network access.
- [X] T005 [P] Scaffold `extensions/builtin/emotion-tts/web/package.json` with `react@19`, `react-router@7`, `@vanilla-extract/css`, `motion`, `swr`, `vite@6`, `vitest`, `@playwright/test`. Configure `vite.config.ts` to build to a single bundle consumable by the host's generic extension shell. Landed as `web/{package.json,vite.config.ts,tsconfig.json}`. Vite configured in `lib` mode with `formats: ["es"]` and react/react-dom/react-router/motell marked external so the host provides them.
- [X] T006 [P] Write boundary-audit scripts `extensions/builtin/emotion-tts/scripts/audit-boundary.ps1` and `audit-boundary.sh` (parity). Grep `crates/`, `apps/web/src/` (exclude `apps/web/src/views/backends/**`), and `migrations/` for the literals `"emotion_tts"`, `"emotion-tts"`, `"nexus.audio.emotiontts"`, `"indextts"`, `"IndexTTS"`, `"IndexTeam/IndexTTS-2"`, `"qwen0.6bemo4-merge"`. Exit non-zero on any match. Landed as `scripts/audit-boundary.{ps1,sh}`. One grandfathered fixture is tolerated: the spec-032 regex test at `crates/nexus-backend-runtimes/src/generic/ids/runtime_id.rs` uses `"indextts.python"` as a valid-ID example — registered under `registered_extensions` in `scripts/boundary-exclusions.yaml` and path-exempted in both the host-wide + per-extension audits.
- [X] T007 [P] Add `extensions/builtin/emotion-tts/README.md` with architecture diagram, dev-env setup pointers, and a link to [quickstart.md](./quickstart.md).
- [X] T008 [P] Configure linting: Rust `clippy` per workspace config, Python `ruff` + `black`, TS `eslint` + `stylelint` + `prettier`. Add `.editorconfig` at `extensions/builtin/emotion-tts/.editorconfig`. Landed as `.editorconfig` + `.gitignore` at extension root + `web/{.eslintrc.json,.stylelintrc.json,.prettierrc.json}`; Rust clippy + Python ruff/black configured in `Cargo.toml` + `pyproject.toml` respectively.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until Phase 2 is green.

### Storage migrations

- [X] T009 Write `extensions/builtin/emotion-tts/storage/migrations/001_deployments.sql` per [data-model.md §2.1](./data-model.md). Include `idx_deployments_name` and `idx_deployments_updated`.
- [X] T010 [P] Write `extensions/builtin/emotion-tts/storage/migrations/002_voice_assets.sql` per [data-model.md §2.2](./data-model.md).
- [X] T011 [P] Write `extensions/builtin/emotion-tts/storage/migrations/003_character_mappings.sql` per [data-model.md §2.3](./data-model.md). Include `UNIQUE (deployment_id, character_name_lower)`.
- [X] T012 [P] Write `extensions/builtin/emotion-tts/storage/migrations/004_vector_presets.sql` per [data-model.md §2.4](./data-model.md).
- [X] T013 [P] Write `extensions/builtin/emotion-tts/storage/migrations/005_runs.sql` per [data-model.md §2.5](./data-model.md).
- [X] T014 [P] Write `extensions/builtin/emotion-tts/storage/migrations/006_utterances.sql` per [data-model.md §2.6](./data-model.md) with unique index on `(run_id, global_index)`.
- [X] T015 [P] Write `extensions/builtin/emotion-tts/storage/migrations/007_synthesis_cache.sql` per [data-model.md §2.7](./data-model.md) with `idx_cache_last_hit (last_hit_at ASC)`.
- [X] T016 [P] Write `extensions/builtin/emotion-tts/storage/migrations/008_export_history.sql` per [data-model.md §2.8](./data-model.md).

### Rust foundation

- [X] T017 Create `extensions/builtin/emotion-tts/rust/src/lib.rs` stub: export `register()` that the host loader calls at extension activation, wiring the router provider + storage contributions.
- [X] T018 Create `extensions/builtin/emotion-tts/rust/src/domain/mod.rs` with newtypes `DeploymentId`, `MappingId`, `VoiceAssetId`, `VectorPresetId`, `RunId`, `UtteranceId`, `ContentHash`, `RuntimeLeaseId` (ULID-backed, `#[serde(transparent)]`, `TryFrom<&str>`, `Display`).
- [X] T019 [P] Create `extensions/builtin/emotion-tts/rust/src/domain/errors.rs` with `thiserror` enum `EmotionTtsError` covering: `Validation`, `NotFound`, `Conflict`, `RuntimeUnavailable`, `ModelMissing`, `Internal`, with `From` impls.
- [X] T020 [P] Create `extensions/builtin/emotion-tts/rust/src/storage/mod.rs`: open a connection handle obtained from the host storage API (trait `HostStoragePool`). No direct host SQLite wrapper imports by name.
- [X] T021 [P] Create repo traits `DeploymentsRepo`, `VoiceAssetsRepo`, `MappingsRepo`, `PresetsRepo`, `RunsRepo`, `UtterancesRepo`, `SynthesisCacheRepo`, `ExportHistoryRepo` in `extensions/builtin/emotion-tts/rust/src/storage/repo_traits.rs` (async-trait, returning newtyped ids).
- [X] T022 Implement SQLite concrete repos in `extensions/builtin/emotion-tts/rust/src/storage/{deployments_repo,voice_assets_repo,mappings_repo,presets_repo,runs_repo,utterances_repo,synthesis_cache_repo,export_history_repo}.rs`. Soft FKs enforced in code per FR-112.

### HTTP router

- [X] T023 Create `extensions/builtin/emotion-tts/rust/src/router/mod.rs` implementing the host's `ExtensionRouterProvider` trait. Mount an `axum::Router` exposing the six resource families (deployments, mappings, voice_assets, presets, runs, exports). One sub-file per family to keep files ≤ 800 lines.
- [X] T024 [P] Add middleware scaffold in `extensions/builtin/emotion-tts/rust/src/router/middleware.rs`: request-id propagation, structured tracing span, JSON error envelope serialiser.

### RPC plumbing

- [X] T025 Create `extensions/builtin/emotion-tts/rust/src/backend_client/mod.rs` with `BackendClient` struct that wraps an `Arc<dyn BackendRuntimeLease>` (host trait). Split into `rpc.rs` (framer), `requests.rs` (typed request builders), `notifications.rs` (notification subscribers).
- [X] T026 [P] Implement NDJSON framing in `extensions/builtin/emotion-tts/rust/src/backend_client/rpc.rs`: async read-lines + write-line, JSON-RPC 2.0 envelope, id allocator (atomic `u64`), request/response matchmaker, error code → `EmotionTtsError` mapping per [contracts/rpc/methods.md](./contracts/rpc/methods.md).
- [X] T027 [P] Implement notification dispatcher in `extensions/builtin/emotion-tts/rust/src/backend_client/notifications.rs`: `broadcast::Sender<ProgressEvent>` fanout so multiple run-progress subscribers can consume the same stream.

### Python worker foundation

- [X] T028 Create `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/__init__.py` and `main.py` stdio event loop with JSON-RPC server. Parse NDJSON from stdin, dispatch to handler registry, write NDJSON responses + notifications to stdout.
- [X] T029 [P] Create `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/rpc.py` with request/response Pydantic models matching [contracts/rpc/methods.md](./contracts/rpc/methods.md). Include error envelope builder with correct codes from the methods.md table.
- [X] T030 [P] Create `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/telemetry.py` — structured log emitter that formats to the `log` notification shape per [contracts/rpc/notifications.md](./contracts/rpc/notifications.md).

### Boundary tests

- [X] T031 Add Rust integration test `extensions/builtin/emotion-tts/rust/tests/boundary_test.rs` that invokes `audit-boundary.sh` via `std::process::Command` and fails if exit ≠ 0. Gates every PR touching this crate.
- [X] T032 [P] Add Python test `extensions/builtin/emotion-tts/worker/tests/test_rpc_framing.py` covering NDJSON encode/decode, error code round-trip, `parse_error` on malformed input, `method_not_found` on unknown method.
- [X] T033 [P] Add Rust test `extensions/builtin/emotion-tts/rust/tests/fixtures/mock_backend.rs` providing an in-process `MockBackendRuntimeLease` implementing the host trait — used by every HTTP integration test so CI doesn't need a real subprocess.

**Checkpoint**: Foundation green (`cargo test -p emotion-tts-extension` + `uv run pytest` both pass). User stories can now begin.

---

## Phase 3: User Story 1 — Dialogue Batch Synthesis (Priority: P1) 🎯 MVP

**Goal**: User pastes Bob/Alice/Sarah four-line script → clicks **Generate + Export ZIP** → receives a ZIP with four deterministically named files, a manifest, a CSV, and an optional preview mix.

**Independent Test**: Acceptance Scenarios 1–4 of Story 1 in [spec.md](./spec.md) all pass end-to-end against a warm backend (real or mocked via fixtures/mock_backend.rs).

### Tests for User Story 1 (mandatory — Principle VI)

- [X] T034 [P] [US1] Contract test for `POST /deployments/{id}/runs` in `extensions/builtin/emotion-tts/rust/tests/http_contract_runs_test.rs`: verify schema of 202 response + `preflight.unresolvedCharacters` + `preflight.predictedFilenames` per [contracts/http/runs.yaml](./contracts/http/runs.yaml).
- [X] T035 [P] [US1] Contract test for `GET /deployments/{id}/runs/{run_id}` returning full `Run` shape.
- [X] T036 [P] [US1] Contract test for `POST /deployments/{id}/runs/{run_id}/cancel` (FR-027).
- [X] T037 [P] [US1] Unit test `parser_test.rs` covering `[Bob] text`, `[Alice:happy_sarah] text`, `[Bob|speed:1.1|seed:42|temperature:0.7] text`, untagged → `Narrator`, blank-line skipping with line-number preservation, reserved-override-key collision.
- [X] T038 [P] [US1] Unit test `emotion_precedence_test.rs` covering the 5-level precedence (inline compat → inline explicit → mapping default → global panel → none) per FR-063.
- [X] T039 [P] [US1] Unit test `filenames_test.rs` covering deterministic name pattern `{global_index:03d}_{character}_{character_index:03d}.{ext}` + sanitisation of unsafe chars + Unicode display preserved separately.
- [X] T040 [P] [US1] Integration test `runs_queue_test.rs` covering FIFO serialisation (FR-026) + test-line head-of-queue (FR-141) using `MockBackendRuntimeLease` that sleeps N seconds.
- [X] T041 [P] [US1] Integration test `partial_run_resume_test.rs` covering Stop mid-batch → partial ZIP produced → Resume → cache-hit for completed segments, fresh synthesis for the rest (FR-142..144).

### Domain — pure functions (parse, emotion resolve, cache key, filenames)

- [X] T042 [P] [US1] Implement script parser in `extensions/builtin/emotion-tts/rust/src/domain/parser.rs`: tag regex, compat emotion ref (`:token`), pipe-separated overrides, modes `dialogue | raw_text | advanced_tagged`, returns `Vec<ParsedUtterance>` + `ParseReport` per FR-040..046.
- [X] T043 [P] [US1] Implement emotion precedence resolver in `extensions/builtin/emotion-tts/rust/src/domain/emotion.rs`: pure fn taking `(inline_overrides, legacy_ref, mapping, global)` → `(ResolvedEmotionMode, EmotionSource)`.
- [X] T044 [P] [US1] Implement content-hash builder in `extensions/builtin/emotion-tts/rust/src/domain/cache_key.rs` per [research.md R-10](./research.md). SHA-256 hex, `v1:` prefix, sorted generation params.
- [X] T045 [P] [US1] Implement filename sanitiser + deterministic name builder in `extensions/builtin/emotion-tts/rust/src/domain/filenames.rs`.
- [X] T046 [P] [US1] Implement manifest + CSV builders in `extensions/builtin/emotion-tts/rust/src/domain/manifest.rs`. Includes `partial: bool`, per-utterance `status`, `source_run_id`, `original_run_id` chain.

### Operators

- [X] T047 [P] [US1] Implement `emotiontts.script.parse@1.0.0` operator at `extensions/builtin/emotion-tts/rust/src/operators/script_parse.rs` + YAML descriptor at `extensions/builtin/emotion-tts/operators/script_parse.yaml`.
- [X] T048 [P] [US1] Implement `emotiontts.mapping.resolve@1.0.0` operator at `extensions/builtin/emotion-tts/rust/src/operators/mapping_resolve.rs` + YAML descriptor.
- [X] T049 [P] [US1] Implement `emotiontts.emotion.resolve@1.0.0` operator + YAML descriptor.
- [X] T050 [US1] Implement `emotiontts.batch.synthesize@1.0.0` at `extensions/builtin/emotion-tts/rust/src/operators/batch_synthesize.rs`. Drives the backend client over `synthesize_batch` RPC. Depends on T025/T026/T018/T042.
- [X] T051 [P] [US1] Implement `emotiontts.audio.postprocess@1.0.0` (ffmpeg atempo + encode) per [research.md R-05](./research.md). Operator at `extensions/builtin/emotion-tts/rust/src/operators/audio_postprocess.rs`.
- [X] T052 [P] [US1] Implement `emotiontts.audio.preview_mix@1.0.0` (concatenate utterances with `gap_ms` silence).
- [X] T053 [US1] Implement `emotiontts.export.bundle@1.0.0` producing the ZIP (`audio/` folder + `manifest.json` + `utterances.csv` + optional `preview_mix.{ext}`). Depends on T046.

### Workflow template + recipe descriptor

- [X] T054 [P] [US1] Write default workflow `extensions/builtin/emotion-tts/workflows/emotional_dialogue_batch.yaml` wiring the seven operators per [spec.md §04 DAG topology](./spec.md).
- [X] T055 [P] [US1] Write recipe descriptor `extensions/builtin/emotion-tts/recipes/emotional_dialogue_batch.yaml` with field-to-node bindings per spec-pack doc 09.

### Queue + runs service

- [X] T056 [US1] Implement runtime-lease queue in `extensions/builtin/emotion-tts/rust/src/queue/mod.rs`: FIFO `VecDeque<Run>`, `test_line` priority class (head-of-queue, single slot), cancellation hook. Depends on T025.
- [X] T057 [US1] Implement runs service in `extensions/builtin/emotion-tts/rust/src/router/runs.rs` covering the five endpoints (`POST runs`, `GET runs`, `GET runs/:id`, `POST runs/:id/cancel`, `GET runs/:id/progress`, `POST runs/test-line`). Preflight: unresolved chars (FR-130) + predicted filenames (FR-131). Depends on T042, T047–T053, T056.
- [X] T058 [US1] Implement partial-run resume logic in `extensions/builtin/emotion-tts/rust/src/queue/resume.rs` per [research.md R-11](./research.md): on Generate, if `deployment.most_recent_run.status == partial`, chain `original_run_id`, reuse preserved script + settings, cache-hit completed segments.

### Python worker — synthesis path

- [X] T059 [P] [US1] Implement `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/indextts_adapter.py` wrapping `IndexTTS2.infer()` per [research.md R-01](./research.md). One call per segment. Writes output WAV to the `output_target_abs` path.
- [X] T060 [US1] Implement `synthesize_batch` handler in `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/rpc.py` that iterates segments, calls `indextts_adapter`, emits `segment_started/completed/failed` notifications per [contracts/rpc/notifications.md](./contracts/rpc/notifications.md). Respects the cooperative cancel token (T063).
- [X] T061 [P] [US1] Implement `synthesize` handler (single-segment, used by test-line priority class).
- [X] T062 [P] [US1] Implement worker-side audio helpers in `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/audio_probe.py`: decode probe (`can_decode(path) -> bool`), duration + sample-rate extraction via `torchaudio.info`. Used during voice-asset validation called from the Rust shim. Ffmpeg `atempo` + mp3/flac encoding stay in the Rust postprocess operator (T051) — the worker only emits raw WAVs.
- [X] T063 [US1] Implement cooperative cancellation in `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/cancellation.py` per [research.md R-04](./research.md): shared `threading.Event`, `on_step` hook threaded into `IndexTTS2.gpt.inference_speech`, raises `CancelledError` at next token boundary.

### Frontend — recipe view

- [X] T064 [P] [US1] Create TypeScript types matching the HTTP contracts at `extensions/builtin/emotion-tts/web/src/services/types.ts` (generated from OpenAPI via `openapi-typescript` if available; otherwise hand-written).
- [X] T065 [P] [US1] Implement HTTP client wrappers in `extensions/builtin/emotion-tts/web/src/services/{deployments_client,mappings_client,voice_assets_client,presets_client,runs_client,exports_client}.ts` (single I/O boundary per Principle XII.4).
- [X] T066 [US1] Implement recipe router in `extensions/builtin/emotion-tts/web/src/routes.ts` using `createBrowserRouter` (data mode). Routes: `/`, `/:deployment_id`, `/:deployment_id/recipe`, `/:deployment_id/graph`, `/:deployment_id/runs/:run_id`. Loaders call the services.
- [X] T067 [US1] Implement `views/recipe/recipe.view.tsx` (smart) + `recipe.ui.tsx` (dumb) + `recipe.css.ts` (vanilla-extract). Render deployment header, mapping editor, script editor, emotion panel, generation settings, output settings, run panel. Data comes through loader.
- [X] T068 [P] [US1] Implement `views/recipe/components/script_editor.tsx` with side-by-side source ↔ parsed segments (FR-135), unresolved-character inline warnings (FR-139), predicted filenames preview (FR-131).
- [X] T069 [US1] Implement `views/recipe/components/run_panel.tsx` driving `POST runs` + `POST runs/test-line` + `POST runs/{id}/cancel`, rendering live per-line progress table via the SSE stream from `GET runs/{run_id}/progress`. Handles the `partial — resumable` badge + **Resume** button (FR-144). The predicted-filenames preview (FR-131) is computed once in `services/runs_client.ts` and consumed by both T068 (script editor) and T069 (run panel) — single source of truth.
- [X] T069a [US1] Implement cross-view **Create mapping for \<Name\>** flow (FR-130): in `views/recipe/components/script_editor.tsx`, each unresolved-character inline warning renders a button that calls `navigate('/<deployment_id>/mappings/new?character=<Name>')`; in `views/recipe/components/mapping_editor.tsx`, the `new` route prefills the `characterName` field from the query param and scrolls the form into view.
- [X] T069b [US1] Implement cross-deployment runtime queue panel at `extensions/builtin/emotion-tts/web/src/views/runtime_queue/runtime_queue.view.tsx` + `.ui.tsx` + `.css.ts`, surfacing FR-028 columns (origin deployment name, line count, emotion-mode summary, queue position, estimated wait, Cancel). Reachable from every deployment header via a "Queue (N)" badge that the header polls from `GET /runtime/queue` (new shim endpoint). Contract: add to `contracts/http/runs.yaml` under `/runtime/queue`.
- [X] T070 [US1] Wire export download via `GET exports/{id}/download` with a browser-native blob save.

### E2E smoke test

- [X] T071 [US1] Playwright test `extensions/builtin/emotion-tts/web/tests/e2e/smoke.spec.ts` covering the canonical Bob/Alice/Sarah flow per [quickstart.md §7](./quickstart.md). Gated `RUN_E2E=1`.

**Checkpoint**: US1 MVP fully functional. Ship-able.

---

## Phase 4: User Story 2 — Install & Operate IndexTTS Runtime (Priority: P1)

**Goal**: User installs the `indextts.python` runtime through the host's generic Backends surface, then Starts / Stops / Restarts it, with proper staged progress and error categories.

**Independent Test**: Acceptance Scenarios 1–4 of Story 2 in [spec.md](./spec.md) pass on a clean Windows-x64 machine.

### Tests for User Story 2

- [X] T072 [P] [US2] Python test `test_model_loader_progress.py` asserting `model_load_progress` notifications fire at each stage per [contracts/rpc/notifications.md](./contracts/rpc/notifications.md).
- [X] T073 [P] [US2] Python test `test_cancellation.py` — fake `IndexTTS2` with sleep-loop; assert cancel within 1 s (R-04).
- [X] T074 [P] [US2] Rust integration test `runtime_handshake_test.rs` covering the `handshake` round-trip + version-mismatch `-32004` path.
- [X] T075 [P] [US2] Rust integration test `runtime_stop_restart_test.rs` asserting Stop releases the lease and next Generate triggers a fresh spawn + model load (FR-022).

### Runtime descriptor + install pipeline

- [X] T076 [P] [US2] Write `extensions/builtin/emotion-tts/backends/indextts/backend-runtime.yaml` declaring `runtime_id: indextts.python`, `role: tts`, `transport: stdio`, `worker_entrypoint: worker/src/emotion_tts_worker/main.py`, capability tags, versions manifest path.
- [X] T077 [P] [US2] Write `extensions/builtin/emotion-tts/backends/indextts/versions.yaml` with `windows-x64-cpu` and `windows-x64-cuda13_1` release archives.
- [X] T078 [US2] Contribute install-pipeline phase handlers to the host generic pipeline (the host spec provides the pipeline framework). Register hooks for `bootstrap_python` (download embedded Python 3.11 zip), `install_deps` (`uv sync --all-extras` minus `--extra deepspeed` by default on Windows per R-07), `validate_env` (`ffmpeg -version`, `python -c "import indextts.infer_v2"`, CUDA probe), `detect_models` (probe the IndexTTS-2 family on the host model-store).
- [X] T079 [US2] Implement failure-category mapping in the install handlers: `python_bootstrap_failed`, `dependency_install_failed`, `cuda_profile_mismatch`, `worker_start_failed`, `handshake_failed`, `model_missing`, `model_load_failed`, `runtime_health_failed`, `ffmpeg_missing`.

### RPC method handlers

- [X] T080 [US2] Implement `handshake` handler in `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/rpc.py`, populating every field of the `handshake.result` envelope per methods.md. Depends on T028.
- [X] T081 [P] [US2] Implement `health` handler with uptime, VRAM usage (via `torch.cuda.memory_allocated`), `state` tracking.
- [X] T082 [US2] Implement `ensure_model` + `load_model` handlers in `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/model_loader.py`. Emits `model_load_progress` notifications at each stage per notifications.md. Lazy-load on first `synthesize_batch` if not preloaded (FR-021).
- [X] T083 [P] [US2] Implement `unload_model` + `shutdown` handlers (graceful exit; worker drops model then closes stdio).
- [X] T084 [US2] Implement `cancel` handler setting the shared `threading.Event` (T063).

### Model-store integration

- [X] T085 [US2] Verify the host model-store normalizer handles the `qwen0.6bemo4-merge/` subtree. If not, file a host-side follow-up task (chore) rather than working around it in the extension. Document outcome in [research.md R-06](./research.md) closeout.
- [X] T086 [US2] Implement model-store download CTA integration: on `-32000 model_missing` from the worker, the Rust shim surfaces the artifact family id in the run's error envelope; the frontend `services/model_store_client.ts` wraps the host generic `POST /api/v1/model-store/families` call to trigger the 5.95 GB download with progress. Depends on T079.

### Runtime lifecycle in Rust

- [X] T087 [US2] Implement `BackendClient::spawn_if_needed` in `extensions/builtin/emotion-tts/rust/src/backend_client/mod.rs`: uses the host's `BackendRuntimeLease` trait to acquire a lease lazily on first task (Q1 lifecycle). Subsequent tasks reuse the lease.
- [X] T088 [US2] Implement Stop Backend handler in `router/runtime.rs` (`POST /runtime/stop`). The endpoint signals the host to release the shared lease; the subprocess exits; every queued batch receives `cancelled` status with a "backend stopped" reason. Depends on T056.

### Frontend — deployment header + Backends page cross-link

- [X] T089 [P] [US2] Implement `views/recipe/components/deployment_header.tsx` showing runtime badge (`not_installed | starting | ready | running | stopping | failed | stopped`), model version, uptime, VRAM usage, plus **Stop Backend** / **Restart** buttons (FR-022/FR-023). Data source: polling `GET /api/host/runtime-handshake` (read-only generic endpoint from the host spec) or the shim's `/runtime/health`.
- [X] T090 [US2] Add inline CTAs: **Install Runtime** (when `not_installed`) and **Download IndexTTS-2 model** (when backend returns `model_missing`). Both delegate to the host's generic flows.

**Checkpoint**: US2 done. User can install, start, stop, and restart the runtime; runs surface structured failures.

---

## Phase 5: User Story 3 — Mapping Editor (Priority: P1)

**Goal**: User creates / edits / duplicates / deletes / imports / exports character mappings per deployment.

**Independent Test**: Acceptance Scenarios 1–4 of Story 3 pass.

### Tests for User Story 3

- [X] T091 [P] [US3] Contract test for `POST /deployments/:id/mappings` and `PATCH /deployments/:id/mappings/:id` in `extensions/builtin/emotion-tts/rust/tests/http_contract_mappings_test.rs`.
- [X] T092 [P] [US3] Unit test `mapping_crud_test.rs` covering case-insensitive uniqueness (FR-071), soft-delete when referenced by export (FR-072), voice-asset duration validation (FR-073).
- [X] T093 [P] [US3] Integration test `mapping_import_export_test.rs` round-tripping a JSON bundle through `/mappings/export` → `/mappings/import`.

### Endpoints + service

- [X] T094 [P] [US3] Implement deployments endpoints in `router/deployments.rs` (CRUD + `POST /:id/resume`). Depends on T022.
- [X] T095 [P] [US3] Implement voice-assets endpoints in `router/voice_assets.rs` with multipart upload → host artifact store, then content-hash probe + decode validation per FR-073.
- [X] T096 [US3] Implement mappings endpoints in `router/mappings.rs` (list, create, patch, delete, duplicate, import, export) per [contracts/http/mappings.yaml](./contracts/http/mappings.yaml). Depends on T094/T095.
- [X] T097 [P] [US3] Implement voice-asset `/probe` endpoint using ffmpeg-probe via `std::process::Command` (no new dep).

### Frontend — mapping editor

- [X] T098 [US3] Implement `views/recipe/components/mapping_editor.tsx` with inline CRUD, attach-audio uploader (drag-drop), emotion-mode selector, duplicate-to-another-deployment action. Per Principle XII.2, takes all data as props.
- [X] T099 [P] [US3] Implement **Test this line** action in the mapping editor that fires `POST runs/test-line` for the selected mapping with a standard sample sentence.
- [X] T100 [US3] Implement JSON import/export UI hooks. The "import from voice folder" feature (source doc §6.10) is **deferred** per Assumptions — only JSON bundle import ships in v1.

**Checkpoint**: US1 + US2 + US3 form the P1 trio. Extension is production-useful once Phase 7.5 (partial export + auto-resume, FR-142/143/144 — locked by Clarifications Q5) also lands.

---

## Phase 6: User Story 4 — 8-Axis Emotion Control (Priority: P2)

**Goal**: User sets global emotion mode + vector via sliders with radar chart, saves presets, uses inline per-line overrides.

**Independent Test**: Acceptance Scenarios 1–4 of Story 4 pass.

### Tests for User Story 4

- [X] T101 [P] [US4] Rust test `emotion_vector_order_test.rs` asserting the serialised `emo_vector` sent to the worker is in exactly the upstream order `[happy, angry, sad, afraid, disgusted, melancholic, surprised, calm]` per FR-060.
- [X] T102 [P] [US4] Contract test for presets CRUD endpoints per [contracts/http/presets.yaml](./contracts/http/presets.yaml).
- [X] T103 [P] [US4] Unit test expanding `parser_test.rs` coverage for `emotion_vector:` and `qwen:` inline overrides.

### Implementation

- [X] T104 [P] [US4] Implement presets endpoints in `router/presets.rs` per contract.
- [X] T105 [P] [US4] Hand-rolled radar chart component `extensions/builtin/emotion-tts/web/src/components/emotion_radar.tsx` + `.css.ts` per [research.md R-09](./research.md). 8 axes, motion/react transitions, reduced-motion honoured.
- [X] T106 [P] [US4] 8-slider control `extensions/builtin/emotion-tts/web/src/components/emotion_sliders.tsx`, with inline numeric input, keyboard-a11y.
- [X] T107 [US4] Implement `views/recipe/components/emotion_panel.tsx` combining radar + sliders + mode selector (`none | audio_ref | emotion_vector | qwen_template`) + `emotion_alpha` slider + Reset/Random/Import/Export/Save-preset/Load-preset actions. Depends on T104/T105/T106.
- [X] T108 [US4] Extend the script parser's override dispatcher to surface `emotion_vector:happy=0.7,surprised=0.2` and `qwen:<template>` inline overrides per FR-041/FR-083; tests in T103.
- [X] T109 [US4] Extend the emotion precedence resolver (T043) to handle inline-vector and inline-qwen overrides at their correct precedence levels per FR-063.

**Checkpoint**: US4 complete. Emotion control is fully interactive and plumbed end-to-end.

---

## Phase 7: User Story 6 — Recipe ↔ DAG Sync (Priority: P2)

**Goal**: Recipe and graph edit the same workflow identity. Graph edits that break curated assumptions mark workflow `custom` but the recipe still binds mappable fields.

**Independent Test**: Acceptance Scenarios 1–3 of Story 6 pass.

### Tests for User Story 6

- [X] T110 [P] [US6] Rust test `workflow_binding_test.rs` asserting recipe `outputFormat = flac` propagates to `postprocess_1.config.output_format`.
- [X] T111 [P] [US6] Rust test asserting a non-curated graph (extra `loudness_normalize` node inserted) marks the workflow `custom` and the recipe still binds the fields that remain mappable.

### Implementation

- [X] T112 [P] [US6] Implement workflow binding engine in `extensions/builtin/emotion-tts/rust/src/workflow_binding.rs` mapping recipe field paths (`input:script_text`, `node:synthesize_1.config.temperature`, etc.) to node configs.
- [X] T113 [US6] Graph rendering is **host-side** — the host already owns the generic DAG canvas at `apps/web/src/views/workflows/components/canvas/` and the node system at `apps/web/src/components/nodes/` (operator_node, boundary_nodes, reroute_node, widgets). Per Principle XIII, extensions MUST NOT duplicate the canvas. The extension contributes (a) the workflow-binding engine + `GET /workflow/default` HTTP surface, and (b) a recipe-side CTA that navigates the parent shell to `#/workflows`. No extension-local graph view is shipped. A hand-rolled SVG prototype was landed and then removed once this decision was made.
- [X] T114 [P] [US6] Add "customised — edit via graph" banner logic in `views/recipe/recipe.ui.tsx` (links to the host workflow canvas via `/#/workflows`).
- [ ] T115 [US6] Graph inspector buttons from each recipe section (FR "Nice to have" in spec §5) — **deferred**: spec marks this explicitly optional behind a v1+ flag; ship when persistence + graph editing lands.

### Workflow persistence (closes FR-106 gap C2 from /speckit-analyze)

- [X] T114a [US6] Persist the workflow document per deployment. New migration `009_workflows.sql` adds `ext_emotion_tts__workflows (deployment_id TEXT PRIMARY KEY, document_json TEXT NOT NULL, customised INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL)`. Rust: `WorkflowsRepo` trait + `SqliteWorkflowsRepo` under `rust/src/storage/workflows_repo.rs`.
- [X] T114b [US6] Extend router: replace `GET /workflow/default` with `GET /workflow?deploymentId=…` (returns stored doc or seeds from `default_workflow()` on first access); add `PUT /workflow` that recomputes `customised` deterministically via `compute_customised` before persisting. Satisfies FR-106 "MUST preserve the flag when saved".
- [X] T114c [US6] Contract test `http_contract_workflows_test.rs` covering: first-GET seeds the curated doc with `customised=false`; PUT of a doc with an extra node stores it and returns `customised=true`; subsequent GET round-trips the same `customised` flag; swapping a curated operator id back flips `customised` back to `false`.
- [X] T114d [US6] Frontend: `workflows_client.ts` gains `getWorkflow(deploymentId)` + `putWorkflow(deploymentId, doc)`; recipe loader calls `getWorkflow(id)`. The host workflow canvas reaches the same PUT endpoint via the published HTTP contract — no React/host-crate imports from the extension (Extension Decoupling). If the canvas cannot call extension HTTP directly, open a host issue for a generic `workflow-document-contribute` hook; do not bypass the boundary.

**Checkpoint**: US6 complete. Recipe ↔ DAG binding persists across sessions; the host's workflow canvas edits the same document via extension-owned HTTP.

---

## Phase 7.5: User Story Prime — Partial Export & Auto-Resume (Priority: P1)

**Goal**: An interrupted batch (Stop Backend, per-batch Cancel while running) produces a usable ZIP flagged `partial: true`, and a one-click **Resume** brings the run back to fully-completed using cache hits on segments that already finished. This closes gap C1 from `/speckit-analyze` — Clarifications Q5 (2026-04-22) locked FR-142/143/144 as P1 guarantees but the P1 story-phase ordering put them nowhere.

**Independent Test**: Acceptance of Clarifications Q5 + FR-142/143/144 end-to-end:
1. Kick off a 6-segment batch, Stop Backend after segment 3.
2. Assert the exported ZIP has 3 audio files, `manifest.json` carries `partial: true`, segments 4–6 rows have `status: "cancelled"` with failure reason and no audio file.
3. From the deployment, click **Resume** — a new run is created with `original_run_id` set; segments 1–3 report `cache_hit: true` with `source_run_id` pointing at the interrupted run; segments 4–6 synthesise fresh.

### Tests

- [ ] T120a [P] [US-prime] Rust integration test `partial_export_test.rs`: cancel a 6-segment batch after segment 3; assert ZIP contents, `manifest.partial: true`, per-segment `status` (FR-142).
- [ ] T120b [P] [US-prime] Rust integration test `run_resume_test.rs`: after a cancel, the deployment row records the original `script_snapshot` + settings; `POST /runs/{id}/resume` creates a new run with `original_run_id` set and per-segment `source_run_id` propagated through cache hits (FR-143).
- [ ] T120c [P] [US-prime] Contract test for `POST /runs/{id}/resume`: happy path + idempotency (resuming an already-successful run is a no-op 409 with clear `conflict` category).

### Implementation

- [ ] T120d [US-prime] Extend `operators/export_bundle.rs` to honour `partial: true` serialisation of segment rows with `status ∈ {completed, cancelled, failed}`; audio files only for completed. Extend `domain/manifest.rs::build` to emit the `partial` top-level flag.
- [ ] T120e [US-prime] Extend `runs_repo` + `deployments_repo` to preserve the original script + frozen settings on the deployment when a run transitions to `cancelled` or `failed`. Add `deployments.partial_run_id` column (nullable) via migration `010_deployments_partial_run_id.sql`.
- [ ] T120f [US-prime] Implement `router/runs.rs::POST /runs/{id}/resume`: returns a new run with `original_run_id = id`, re-parses the preserved script, reuses the frozen settings; per-segment resolution reuses cache hits to populate `source_run_id` from the interrupted run's audio artifacts.
- [ ] T120g [US-prime] Frontend: `history_panel.tsx` shows `partial — resumable` pill + one-click **Resume** button on interrupted rows (FR-144). Calls `POST /runs/{id}/resume` and navigates to the new run's live view.
- [ ] T120h [US-prime] Frontend: surface **Rerun failed lines** button on the run-detail view (FR-133). Calls the same resume endpoint filtered to `status in (failed, cancelled)` only.

**Checkpoint**: Partial export + auto-resume complete. The Q5 clarification guarantee is user-visible end-to-end.

---

## Phase 8: User Story 7 — Content-Hash Synthesis Cache (Priority: P3)

**Goal**: Re-runs skip IndexTTS inference for already-synthesised utterances; LRU-evict keeps the cache table under budget.

**Independent Test**: Acceptance Scenarios 1–3 of Story 7 pass.

### Tests for User Story 7

- [ ] T116 [P] [US7] Unit test `cache_key_stability_test.rs` proving the hash is stable across equivalent inputs (map ordering, float precision) and changes on intended inputs (model version bump, seed change, speed change).
- [ ] T117 [P] [US7] Integration test `cache_hit_end_to_end_test.rs` running the same script twice — second run reports 4/4 hits and does not call the backend.
- [ ] T118 [P] [US7] Integration test `cache_evict_test.rs` filling the cache past budget and asserting LRU eviction by `last_hit_at ASC`.

### Implementation

- [ ] T119 [P] [US7] Implement cache repo operations: `get(content_hash)`, `insert(row)`, `touch(content_hash)` (update `hit_count` + `last_hit_at`), `evict_to_fit(max_bytes)`.
- [ ] T120 [US7] Wire cache lookup into the batch-synthesize operator (T050): before emitting a segment to the backend, check cache; on hit, short-circuit to the cached artifact and emit a `segment_completed` notification with `cache_hit: true` without backend round-trip.
- [ ] T121 [P] [US7] Implement LRU eviction background task (tokio-interval 5 min) checking `size_bytes` total vs configured budget.
- [ ] T122 [P] [US7] Add cache-policy UI toggle in generation settings: `use_cache | force_regenerate | read_only_cache`. Per-segment `cache_hit` shown in the run's per-line table.

**Checkpoint**: US7 complete. Re-runs are fast; cache self-manages.

---

## Phase 9: Polish & Cross-Cutting Concerns

- [ ] T123 [P] Update root `README.md` with a "Extensions" bullet pointing at spec 031 and EmotionTTS.
- [ ] T124 [P] Write `extensions/builtin/emotion-tts/rust/README.md` covering module layout, trait surface, how to run tests locally.
- [ ] T125 [P] Write `extensions/builtin/emotion-tts/worker/README.md` covering the RPC protocol from the Python side, how to stub `IndexTTS2` for CPU-only CI, how to attach a debugger to the subprocess.
- [X] T125a Build and commit the extension web bundle. Run `pnpm --filter @nexus/emotion-tts-web build` (produces `web/dist/emotion-tts.js` + `web/dist/emotion-tts.css`) and commit both. Rationale (closes gap C4 from /speckit-analyze): manifest `ui.custom_elements.module` points at `emotion-tts.js`; host `crates/nexus-extension/src/registry/custom_elements.rs::resolve_spec` validates `module_abs.is_file()` at activation — the extension cannot load without the built bundle. Long-term fix: host dev-mode resolver that falls back to `vite dev` (file a separate host chore; until it lands, the committed bundle is the only contract any extension can rely on).
- [ ] T125b Wire `pnpm --filter @nexus/emotion-tts-web build` into CI pre-merge (extend the workflow from T126) so the committed bundle is always in sync with source. Diff of `web/dist/*` across PRs is acceptable — treat it as a generated artifact, not a review target.
- [ ] T126 Run the boundary audit as a CI gate: add `.github/workflows/boundary-audit.yml` (or equivalent) invoking `audit-boundary.ps1` on every PR touching `extensions/builtin/emotion-tts/**` or host crates.
- [ ] T127 [P] Add performance benchmarks in `extensions/builtin/emotion-tts/rust/benches/` measuring: cache lookup latency, queue enqueue/dequeue, NDJSON frame parsing. Targets from plan.md §Performance Goals.
- [ ] T128 Run the Playwright smoke test (T071) against a real warm runtime on a developer machine; record a run-log artifact at `specs/031-emotiontts-extension/smoke-proof.json` (similar to spec-026's `sc-026-proof.json` precedent).
- [ ] T129 Update host CLAUDE.md / agent context file with the extension's location, manifest id, and "don't touch host crates" reminder.
- [ ] T130 [P] Final documentation: append **Change Log** entry "EmotionTTS extension (spec 031) — dialogue-batch IndexTTS-2 synthesis" to `CHANGELOG.md`.
- [ ] T131 Security review pass: confirm no hardcoded secrets; voice-asset upload route validates MIME types + max file size; RPC messages do not echo raw user input into subprocess args.
- [ ] T132 Accessibility review pass: recipe editor + emotion panel pass the automated a11y scanner (`@axe-core/playwright` inside the smoke test). Keyboard-only navigation works for every control.
- [ ] T133 Implement uninstall hook (FR-004) at `extensions/builtin/emotion-tts/rust/src/uninstall.rs`: register with the host's extension lifecycle system; on uninstall (a) cancel every queued/running run for this extension, (b) release the runtime lease + signal Stop Backend, (c) DROP every `ext_emotion_tts__*` table via the storage contribution system's teardown hook, (d) flag every deployment-owned host artifact (voice assets, utterance audio, export ZIPs) as reclaimable via the host artifact-store retention API. Tested by `extensions/builtin/emotion-tts/rust/tests/uninstall_test.rs` asserting zero orphan rows + zero stuck processes after uninstall.
- [ ] T134 [P] Resolve [research.md R-06](./research.md) model-store subfolder question as the T085 closeout: run `GET /api/v1/model-store/families/IndexTeam%2FIndexTTS-2/resolve` against the current host normalizer and assert it returns all 16 files including the 10 files under `qwen0.6bemo4-merge/`. On pass, flip SC-011 to verifiable; on fail, file a host chore spec (reference it here) and mark SC-011 as blocked-by-host until that chore lands.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no deps — start immediately (after host prerequisite spec lands).
- **Phase 2 (Foundational)**: depends on Phase 1. BLOCKS Phases 3–8.
- **Phase 3 (US1)** = MVP: depends on Phase 2.
- **Phase 4 (US2)**: depends on Phase 2. Can run in parallel with Phase 3 (different files); Phase 3's synth operator does integrate with Phase 4's runtime lifecycle via the shared `BackendClient` (T087 may need a stub-then-fill pattern).
- **Phase 5 (US3)**: depends on Phase 2. Largely independent of Phase 3/4; shares the endpoint mounting in `router/`.
- **Phase 6 (US4)**: depends on Phase 5 (presets CRUD) and Phase 3 (parser + precedence resolver).
- **Phase 7 (US6)**: depends on Phase 3 (workflow template exists).
- **Phase 8 (US7)**: depends on Phase 3 (batch-synthesize operator wired). Cache is additive — can ship separately.
- **Phase 9 (Polish)**: depends on whichever stories are shipping; polish incrementally as each story lands.

### Within Each Phase

- Tests precede implementation (Principle VI).
- Domain (pure fns) → Storage repos → Operators → Services → HTTP → Frontend.

### Parallel Opportunities

- Every `[P]` task within a phase can run in parallel with other `[P]` tasks in the same phase.
- Phases 3, 4, 5 can be staffed in parallel after Phase 2 checkpoint.
- Migration files T009–T016 are all independent and parallelisable.
- Operator stubs (T047–T053) are independent per file and parallelise.
- Python tests and Rust tests are always in separate processes and parallelise trivially.

---

## Parallel Example: User Story 1 test burst

```bash
# Launch all US1 tests together:
cargo test -p emotion-tts-extension parser_test
cargo test -p emotion-tts-extension emotion_precedence_test
cargo test -p emotion-tts-extension filenames_test
cargo test -p emotion-tts-extension http_contract_runs_test
cargo test -p emotion-tts-extension runs_queue_test
cargo test -p emotion-tts-extension partial_run_resume_test
```

```bash
# Launch all US1 domain-function implementations together:
task: parser.rs
task: emotion.rs
task: cache_key.rs
task: filenames.rs
task: manifest.rs
```

---

## Implementation Strategy

### MVP (User Story 1 only)

1. Wait for host prerequisite spec (generic backend-runtime catalog) to merge to `main`.
2. Complete Phase 1 + Phase 2 (checkpoints green).
3. Complete Phase 3 (US1). Cut a release candidate.
4. **STOP and VALIDATE**: run the canonical Bob/Alice/Sarah smoke test (T071). Demo if ready.

### Incremental Delivery

- Phase 1 + 2 → foundation PR.
- Phase 3 → MVP PR (US1). Demo-able.
- Phase 4 → runtime operations PR (US2). End-to-end install + operate.
- Phase 5 → mapping editor PR (US3). P1 trio complete.
- Phase 6 → emotion panel PR (US4). Product is "really good."
- Phase 7 → graph view PR (US6). Power-user feature.
- Phase 8 → cache PR (US7). Performance upgrade.
- Phase 9 → polish PR. Merge to `main`.

### Parallel Team Strategy

After Phase 2 checkpoint:

- Dev A: Phase 3 (US1, MVP — synthesis path)
- Dev B: Phase 4 (US2, runtime install/operate)
- Dev C: Phase 5 (US3, mapping editor)

Post P1 trio:

- Dev A: Phase 6 (emotion panel)
- Dev B: Phase 7 (graph view)
- Dev C: Phase 8 (cache)

---

## Notes

- `[P]` = parallelisable (different files, no dep on incomplete tasks).
- `[US#]` = maps task to spec user story for traceability.
- Every task carries an exact file path.
- Never commit a `[US#]` task without also updating that story's tests.
- Principle VI: tests for backend logic MUST fail before implementation lands (RED → GREEN → REFACTOR).
- Principle XIII: boundary audit (T126) must pass on every PR touching this spec.
- Avoid: duplicating files under `apps/web/src/`, adding any `nexus-emotion-tts*` crate under `crates/`, or referencing IndexTTS / EmotionTTS by literal string in host code.

---

## Summary

- **Total tasks**: 136 (T001 – T134, with T069a and T069b inserted into Phase 3)
- **Phase 1 (Setup)**: 8 tasks (T001–T008)
- **Phase 2 (Foundational)**: 25 tasks (T009–T033)
- **Phase 3 (US1, MVP 🎯)**: 40 tasks (T034–T071 + T069a + T069b)
- **Phase 4 (US2)**: 19 tasks (T072–T090)
- **Phase 5 (US3)**: 10 tasks (T091–T100)
- **Phase 6 (US4)**: 9 tasks (T101–T109)
- **Phase 7 (US6)**: 6 tasks (T110–T115)
- **Phase 8 (US7)**: 7 tasks (T116–T122)
- **Phase 9 (Polish)**: 12 tasks (T123–T134)
- **Parallel markers**: 68 tasks carry `[P]`
- **User-story tests**: 28 tasks (Principle VI-mandated coverage on backend logic)
- **MVP scope**: Phase 1 + Phase 2 + Phase 3 = 71 tasks → delivers US1 end-to-end.
