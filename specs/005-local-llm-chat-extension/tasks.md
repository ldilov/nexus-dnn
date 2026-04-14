# Tasks: Builtin Local LLM Chat & RAG Extension

**Input**: Design documents from `/specs/005-local-llm-chat-extension/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Integration tests are included per user story as the spec requires verifiable acceptance scenarios.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Host crates**: `crates/nexus-*/src/`
- **API handlers**: `crates/nexus-api/src/handlers/`
- **Storage**: `crates/nexus-storage/src/`
- **Extension**: `crates/nexus-extension/src/`
- **Python SDK**: `sdk/python/nexus_sdk/`
- **Migrations**: `migrations/`
- **Schemas**: `schemas/`
- **Frontend**: `apps/web/src/`
- **Extension package**: `extensions/builtin/local-llm/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, new crate scaffolding, extension package skeleton

- [x] T001 Create `crates/nexus-local-llm/` crate with Cargo.toml (deps: tokio, serde, reqwest, sha2, tracing, thiserror)
- [x] T002 [P] Create `extensions/builtin/local-llm/manifest.yaml` skeleton with extension id `nexus.local-llm`, spec_version, runtime family `builtin`, pre-approved capabilities
- [x] T003 [P] Create `extensions/builtin/local-llm/storage/migrations/` directory with empty 001, 002, 003 SQL files
- [x] T004 [P] Create `extensions/builtin/local-llm/operators/` directory with placeholder YAML files for `llm.chat.turn`, `llm.prompt.compose`, `llm.output.persist`
- [x] T005 [P] Create `extensions/builtin/local-llm/recipes/` directory with placeholder YAML for `local_chat.basic`
- [x] T006 [P] Create `extensions/builtin/local-llm/ui/` directory with placeholder UI contribution YAML files
- [x] T007 [P] Add `runtime.environment` block to manifest schema in `schemas/extension-manifest.json` (Python version, CUDA version, pip dependencies, env vars)
- [x] T008 Add `nexus-local-llm` to workspace members in root `Cargo.toml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

### Builtin extension support

- [x] T009 Add `available_builtin` state to `ExtensionStatus` enum in `crates/nexus-extension/src/lib.rs`
- [x] T010 [P] Add `activating`, `degraded`, `error` states to extension lifecycle state machine in `crates/nexus-extension/src/registry.rs`
- [x] T011 Add builtin extension discovery path in `ExtensionRegistry::scan()` — scan embedded manifests at `extensions/builtin/` in `crates/nexus-extension/src/registry.rs`
- [x] T012 [P] Add pre-approved capability grant logic in `crates/nexus-extension/src/validation.rs` — builtin extensions skip user approval for declared capabilities
- [x] T013 Add on-demand activation trigger in `crates/nexus-extension/src/registry.rs` — activate when first Chat open or explicit enable
- [x] T014 [P] Add `runtime.environment` manifest block parsing to `crates/nexus-extension/src/manifest.rs` — Python version, CUDA version, pip deps

### Backend-neutral adapter contract

- [x] T015 Define `BackendAdapter` async trait in `crates/nexus-local-llm/src/adapter.rs` — probe_environment, install_runtime, validate_runtime, start_service, stop_service, health, metrics, capabilities, chat, chat_stream, embeddings, validate_model, list_local_models
- [x] T016 [P] Define `BackendCapabilities` struct in `crates/nexus-local-llm/src/types.rs` — backend id, version, modes, streaming, embeddings, reranking, structured output, platform state, metrics
- [x] T017 [P] Define `NormalizedMetrics` struct in `crates/nexus-local-llm/src/types.rs` — prompt tokens, generated tokens, tok/s, KV cache ratio, active requests, GPU memory
- [x] T018 [P] Define `BackendHealth` struct in `crates/nexus-local-llm/src/types.rs` — status, backend id, version, model identity, PID, uptime, last error
- [x] T019 [P] Define `ChatRequest`, `ChatResponse`, `ChatStreamDelta`, `ChatStreamSummary` in `crates/nexus-local-llm/src/types.rs`
- [x] T020 [P] Define `StructuredError` with `ErrorCategory` enum in `crates/nexus-local-llm/src/error.rs` — 12 error categories per contract
- [x] T021 [P] Define `EnvironmentProbe`, `RecommendedProfile` structs in `crates/nexus-local-llm/src/types.rs`

### Storage schema (spec-004 contributions)

- [x] T022 Write spec-004 storage contribution migration 001 `extensions/builtin/local-llm/storage/migrations/001_backend_and_models.sql` — runtime_installs, model_installs, model_download_tasks, backend_profiles tables with indexes
- [x] T023 [P] Write migration 002 `extensions/builtin/local-llm/storage/migrations/002_chat_sessions.sql` — chat_threads, chat_messages, chat_sessions tables with indexes
- [x] T024 [P] Write migration 003 `extensions/builtin/local-llm/storage/migrations/003_rag.sql` — rag_corpora, rag_documents, retrieval_traces tables with indexes
- [x] T025 Add storage contribution declaration to `extensions/builtin/local-llm/manifest.yaml` — namespace `local_llm`, migration_profile `nexus_sqlite_v1`, migration file references

### Event types

- [x] T026 Define local-llm event types in `crates/nexus-local-llm/src/events.rs` — backend.install.progress, backend.state.changed, backend.health.changed, backend.metrics.updated, model.download.progress, model.download.complete, session.state.changed, chat.stream.delta, chat.stream.complete, chat.stream.error
- [x] T027 [P] Register local-llm event types with the host event bus in `crates/nexus-events/src/types.rs`

### Python SDK v2 core

- [x] T028 Create `sdk/python/nexus_sdk/service_worker.py` — `ServiceWorker` class extending `BaseWorker` with `on_startup()`, `on_shutdown()`, `on_health_check()`, `on_cancel()` hooks
- [x] T029 [P] Create `sdk/python/nexus_sdk/process.py` — `ManagedProcess` class with cross-platform subprocess spawn, stdout/stderr capture, exit detection, graceful shutdown, Windows `CREATE_NEW_PROCESS_GROUP` handling
- [x] T030 [P] Create `sdk/python/nexus_sdk/streaming.py` — `StreamingExecution`, `StreamDelta`, `StreamComplete` classes for typed token streaming separate from progress
- [x] T031 [P] Create `sdk/python/nexus_sdk/health.py` — `HealthReporter`, `HealthStatus` with readiness/liveness/degraded/failed states
- [x] T032 [P] Create `sdk/python/nexus_sdk/artifacts.py` — `ArtifactIO` with read_text, read_json, write_text, write_json, write_bytes helpers
- [x] T033 [P] Create `sdk/python/nexus_sdk/types/llm.py` — `ChatRequest`, `ChatMessage`, `GenerationParams`, `ChatDelta`, `TokenUsage`, `ChatComplete` dataclasses
- [x] T034 Add `stream_event`, `health_report`, `backend_state` notification methods to protocol in `sdk/python/nexus_sdk/protocol.py`
- [x] T035 Verify backward compatibility: run existing tests against unchanged `BaseWorker` in `sdk/python/`

### CUDA compatibility validation

- [x] T036 Add `cuda_requirement` field to `BackendProfile` data model in `crates/nexus-local-llm/src/types.rs`
- [x] T037 Implement CUDA compatibility validator in `crates/nexus-local-llm/src/validation.rs` — check no conflicting profiles active on same GPU at profile activation time

### Integration test

- [ ] T038 Write integration test: builtin extension discovered, activated on demand, operators indexed, UI contributions registered in `crates/nexus-core/tests/builtin_extension.rs`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 — Activate Extension & Prepare Backend (Priority: P0) MVP

**Goal**: User opens Chat, activates builtin extension, probes system, installs llama.cpp runtime, backend reaches `ready`

**Independent Test**: Fresh install. Activate extension, choose llama.cpp on Windows CPU, install runtime, verify backend `ready` with health endpoint passing.

### Tests for User Story 1

- [ ] T039 [P] [US1] Integration test: install llama.cpp on Windows CPU profile, verify install manifest created in `crates/nexus-core/tests/llamacpp_install.rs`
- [ ] T040 [P] [US1] Integration test: llama.cpp CUDA profile selects correct binary asset in `crates/nexus-core/tests/llamacpp_cuda_selection.rs`
- [ ] T041 [P] [US1] Integration test: model load failure produces structured diagnostic in `crates/nexus-core/tests/llamacpp_failure.rs`

### Implementation for User Story 1

#### llama.cpp release resolver

- [x] T042 [P] [US1] Create version manifest YAML `extensions/builtin/local-llm/backends/llamacpp/versions.yaml` — pinned version `b8766`, per-platform asset URLs, checksums
- [x] T043 [US1] Implement `LlamaCppReleaseResolver` in `crates/nexus-local-llm/src/llamacpp/resolver.rs` — map OS + arch + accelerator to download URL from version manifest

#### OS/hardware probe

- [x] T044 [US1] Implement `LlamaCppRuntimeProbe` in `crates/nexus-local-llm/src/llamacpp/probe.rs` — detect OS family, CPU arch, NVIDIA GPU presence, CUDA availability, recommend profiles

#### Installer

- [x] T045 [US1] Implement `LlamaCppInstaller` in `crates/nexus-local-llm/src/llamacpp/installer.rs` — download archive, verify checksum, unpack to `~/.nexus/local-llm/backends/llamacpp/installs/<version>/`, register install manifest
- [x] T046 [P] [US1] Implement managed install directory layout creation in `crates/nexus-local-llm/src/llamacpp/installer.rs` — manifests/, installs/, active/ subdirectories

#### Process manager

- [x] T047 [US1] Implement `LlamaCppProcessManager` in `crates/nexus-local-llm/src/llamacpp/process.rs` — generate command line from profile config, allocate port, spawn `llama-server` process
- [x] T048 [US1] Implement process lifecycle in `crates/nexus-local-llm/src/llamacpp/process.rs` — health polling, stdout/stderr capture, graceful stop, force kill, restart
- [x] T049 [P] [US1] Implement Windows-specific process handling in `crates/nexus-local-llm/src/llamacpp/process.rs` — path normalization, CREATE_NEW_PROCESS_GROUP, CTRL_BREAK_EVENT for stop

#### HTTP client

- [x] T050 [US1] Implement `LlamaCppHttpClient` in `crates/nexus-local-llm/src/llamacpp/client.rs` — `/v1/chat/completions` (sync + streaming SSE), `/health`, `/metrics` (Prometheus parse), `/slots`
- [x] T051 [US1] Implement readiness detection in `crates/nexus-local-llm/src/llamacpp/client.rs` — process alive + HTTP responds + model loaded + health passes

#### Adapter integration

- [x] T052 [US1] Implement `LlamaCppAdapter` (impl `BackendAdapter`) in `crates/nexus-local-llm/src/llamacpp/adapter.rs` — wire resolver, probe, installer, process manager, HTTP client
- [x] T053 [US1] Implement backend profile state machine in `crates/nexus-local-llm/src/llamacpp/adapter.rs` — created -> validating -> starting -> warming -> ready -> degraded/failed
- [x] T054 [US1] Implement normalized metrics mapping from llama.cpp Prometheus output to `NormalizedMetrics` in `crates/nexus-local-llm/src/llamacpp/metrics.rs`
- [x] T055 [US1] Implement structured failure classification in `crates/nexus-local-llm/src/llamacpp/error.rs` — binary missing, model file missing, port bind, CUDA mismatch, OOM, unexpected exit + remediation hints

#### GGUF model validation

- [x] T056 [US1] Implement GGUF model validation in `crates/nexus-local-llm/src/llamacpp/model.rs` — file exists, extension `.gguf`, size > 0, install manifest present

#### API handlers

- [x] T057 [US1] Implement backend profile REST handlers in `crates/nexus-api/src/handlers/local_llm_profiles.rs` — POST/GET/PUT/DELETE /local-llm/profiles, POST /local-llm/profiles/:id/start, POST /local-llm/profiles/:id/stop
- [x] T058 [US1] Implement runtime install REST handlers in `crates/nexus-api/src/handlers/local_llm_runtimes.rs` — GET /local-llm/runtimes, POST /local-llm/runtimes/install
- [x] T059 [US1] Register local-llm API routes in `crates/nexus-api/src/router.rs`

#### Event emission

- [x] T060 [US1] Emit backend.install.progress, backend.state.changed, backend.health.changed events from adapter lifecycle in `crates/nexus-local-llm/src/llamacpp/adapter.rs`

**Checkpoint**: User can activate extension, install llama.cpp, select a local GGUF model, start backend, see health — US1 complete

---

## Phase 4: User Story 2 — Browse HF, Download Model, Register Locally (Priority: P0)

**Goal**: User searches Hugging Face, selects a GGUF file, downloads with progress, model appears in local registry

**Independent Test**: Search HF, select GGUF, download, verify install manifest and model registry entry.

### Tests for User Story 2

- [ ] T061 [P] [US2] Integration test: search HF, select GGUF, download, verify install manifest in `crates/nexus-core/tests/hf_download.rs`
- [ ] T062 [P] [US2] Integration test: download cancellation cleans up properly in `crates/nexus-core/tests/hf_cancel.rs`

### Implementation for User Story 2

#### Python HF helper

- [x] T063 [P] [US2] Create `extensions/builtin/local-llm/worker/hf_helper.py` — Python script using `huggingface_hub` HfApi for search, file inspection, download with progress callbacks
- [x] T064 [P] [US2] Implement HF search adapter in `extensions/builtin/local-llm/worker/hf_helper.py` — `list_models()` with text/author filters, return normalized metadata JSON
- [x] T065 [US2] Implement file inventory inspection in `extensions/builtin/local-llm/worker/hf_helper.py` — list repo files, detect GGUF by extension, parse quantization hint from filename, report sizes
- [x] T066 [US2] Implement targeted single-file GGUF download in `extensions/builtin/local-llm/worker/hf_helper.py` — `hf_hub_download()` with progress callback emitting JSON lines to stdout
- [x] T067 [P] [US2] Implement filtered snapshot download in `extensions/builtin/local-llm/worker/hf_helper.py` — `snapshot_download()` with allow_patterns for TensorRT-LLM checkpoint repos

#### Model registry

- [x] T068 [US2] Implement `ModelRegistryService` in `crates/nexus-local-llm/src/models/registry.rs` — CRUD for model_installs table, create install manifest on download completion
- [x] T069 [US2] Implement `ModelDownloadService` in `crates/nexus-local-llm/src/models/download.rs` — create download task, spawn Python helper, parse progress lines, update task status, link to install manifest
- [x] T070 [US2] Implement download cancellation and retry in `crates/nexus-local-llm/src/models/download.rs` — kill Python process on cancel, resume by reusing existing metadata
- [x] T071 [P] [US2] Implement Nexus-computed compatibility hints in `crates/nexus-local-llm/src/models/compatibility.rs` — GGUF -> llamacpp tag, quantization parsing, size-based recommendations

#### Automatic download mode selection

- [x] T072 [US2] Implement backend-aware download mode selector in `crates/nexus-local-llm/src/models/download.rs` — llamacpp -> single_file (GGUF pick), tensorrt_llm -> filtered_snapshot (checkpoint repo)

#### HF token management

- [x] T073 [P] [US2] Implement HF token storage and redaction in `crates/nexus-local-llm/src/models/auth.rs` — secure storage, never written to logs, validation endpoint

#### API handlers

- [x] T074 [US2] Implement model REST handlers in `crates/nexus-api/src/handlers/local_llm_models.rs` — GET /local-llm/models, GET /local-llm/models/search, GET /local-llm/models/inspect, POST /local-llm/models/download, DELETE /local-llm/models/:id
- [x] T075 [US2] Register model API routes in `crates/nexus-api/src/router.rs`

#### Event emission

- [x] T076 [US2] Emit model.download.progress, model.download.complete, model.download.failed events from download service in `crates/nexus-local-llm/src/models/download.rs`

#### UI contribution metadata

- [x] T077 [P] [US2] Write model browser UI contribution YAML in `extensions/builtin/local-llm/ui/model_browser.yaml` — command kind, search/filter/file-list/download-action metadata
- [x] T078 [P] [US2] Write local model registry UI contribution YAML in `extensions/builtin/local-llm/ui/model_registry.yaml` — installed models list, delete/verify/disk usage

**Checkpoint**: User can search HF, download GGUF with progress, see model in registry — US2 complete

---

## Phase 5: User Story 3 — Chat Session, Streaming, Metrics (Priority: P0)

**Goal**: User creates a chat session, sends messages, receives streamed responses, can stop/retry, sees backend metrics

**Independent Test**: Create session, send message, receive streamed response, stop mid-generation, retry, inspect metrics.

### Tests for User Story 3

- [ ] T079 [P] [US3] Integration test: create session, send message, receive streamed response in `crates/nexus-core/tests/chat_streaming.rs`
- [ ] T080 [P] [US3] Integration test: stop mid-generation, verify partial message persisted in `crates/nexus-core/tests/chat_stop.rs`
- [ ] T081 [P] [US3] Integration test: retry preserves lineage, old message not overwritten in `crates/nexus-core/tests/chat_retry.rs`

### Implementation for User Story 3

#### Chat storage

- [x] T082 [US3] Implement `ChatThreadService` in `crates/nexus-local-llm/src/chat/threads.rs` — CRUD for chat_threads table (create, list, get, update title, archive)
- [x] T083 [US3] Implement `ChatMessageService` in `crates/nexus-local-llm/src/chat/messages.rs` — append to thread with ordinal, list by thread ordered, retry lineage via retry_of_message_id
- [x] T084 [US3] Implement `ChatSessionService` in `crates/nexus-local-llm/src/chat/sessions.rs` — create binding profile+thread, state machine (created -> starting -> ready -> streaming -> idle), generation overrides

#### Chat turn execution

- [x] T085 [US3] Implement chat turn executor in `crates/nexus-local-llm/src/chat/executor.rs` — compose ChatRequest from thread history + system prompt, call backend adapter chat_stream, persist assistant message
- [x] T086 [US3] Implement token stream relay in `crates/nexus-local-llm/src/chat/executor.rs` — backend SSE -> parse delta -> emit chat.stream.delta event -> on complete emit chat.stream.complete + update message

#### Stop/retry/regenerate

- [x] T087 [US3] Implement stop generation in `crates/nexus-local-llm/src/chat/executor.rs` — send cancellation to backend, mark message as is_partial=true, emit chat.stream.complete with partial flag
- [x] T088 [US3] Implement retry in `crates/nexus-local-llm/src/chat/executor.rs` — create new message with retry_of_message_id pointing to original, re-execute turn
- [x] T089 [US3] Implement regenerate in `crates/nexus-local-llm/src/chat/executor.rs` — find last assistant message, retry it

#### Session state management

- [x] T090 [US3] Implement session lifecycle state machine in `crates/nexus-local-llm/src/chat/sessions.rs` — start backend if not running, transition through states, detect degradation from health check failures
- [x] T091 [P] [US3] Implement backend health badge logic in `crates/nexus-local-llm/src/chat/sessions.rs` — poll health endpoint periodically, update session state and last_metrics_snapshot

#### API handlers

- [x] T092 [US3] Implement chat session REST handlers in `crates/nexus-api/src/handlers/local_llm_chat.rs` — POST/GET /local-llm/sessions, POST /local-llm/sessions/:id/messages (returns 202 + stream_id), POST /local-llm/sessions/:id/stop, POST /local-llm/sessions/:id/retry
- [x] T093 [US3] Implement thread REST handlers in `crates/nexus-api/src/handlers/local_llm_threads.rs` — POST/GET /local-llm/threads, GET /local-llm/threads/:id?include_messages=true, PUT /local-llm/threads/:id/archive
- [x] T094 [US3] Register chat/thread API routes in `crates/nexus-api/src/router.rs`

#### WebSocket streaming

- [x] T095 [US3] Extend WebSocket event stream in `crates/nexus-api/src/ws.rs` to relay chat.stream.delta, chat.stream.complete, chat.stream.error events to connected clients

#### UI contribution metadata

- [x] T096 [P] [US3] Write chat panel command YAML in `extensions/builtin/local-llm/ui/open_chat.yaml`
- [x] T097 [P] [US3] Write backend settings command YAML in `extensions/builtin/local-llm/ui/backend_settings.yaml`
- [x] T098 [P] [US3] Write session inspector panel YAML in `extensions/builtin/local-llm/ui/session_inspector.yaml`
- [x] T099 [P] [US3] Write backend health panel YAML in `extensions/builtin/local-llm/ui/backend_health.yaml`

**Checkpoint**: User can chat interactively with streaming, stop/retry, see metrics — US3 complete. This plus US1+US2 = MVP.

---

## Phase 6: User Story 4 — Workflow/Recipe Integration (Priority: P1)

**Goal**: Local Chat recipe runs end-to-end through host run engine with typed artifacts and provenance

**Independent Test**: Execute Local Chat recipe, verify run produces typed `text/assistant-response` artifact with backend/model provenance.

### Tests for User Story 4

- [ ] T100 [P] [US4] Integration test: Local Chat recipe runs end-to-end, produces artifacts in `crates/nexus-core/tests/chat_recipe.rs`
- [ ] T101 [P] [US4] Integration test: workflow loads with extension inactive, operators show unresolved in `crates/nexus-core/tests/unresolved_operators.rs`

### Implementation for User Story 4

#### Operator contracts

- [x] T102 [P] [US4] Write `llm.chat.turn` operator definition YAML in `extensions/builtin/local-llm/operators/chat_turn.yaml` — inputs: prompt (text/chat-message), backend_profile (model/backend-profile); outputs: assistant_message (text/assistant-response), metrics (json/metrics)
- [x] T103 [P] [US4] Write `llm.prompt.compose` operator definition YAML in `extensions/builtin/local-llm/operators/prompt_compose.yaml` — inputs: user_message, system_prompt, context; output: prompt
- [x] T104 [P] [US4] Write `llm.output.persist` operator definition YAML in `extensions/builtin/local-llm/operators/output_persist.yaml` — inputs: message; output: artifact_ref

#### Operator handler implementation

- [x] T105 [US4] Implement `llm.chat.turn` handler in `extensions/builtin/local-llm/worker/operators/chat_turn.py` — use ServiceWorker, call backend adapter, return assistant message + metrics
- [x] T106 [P] [US4] Implement `llm.prompt.compose` handler in `extensions/builtin/local-llm/worker/operators/prompt_compose.py` — assemble system prompt + user message + optional context
- [x] T107 [P] [US4] Implement `llm.output.persist` handler in `extensions/builtin/local-llm/worker/operators/output_persist.py` — write message to artifact store as text/assistant-response

#### Recipe and workflow template

- [x] T108 [US4] Write Local Chat recipe YAML `extensions/builtin/local-llm/recipes/local_chat_basic.yaml` — maps user-facing fields to workflow inputs
- [x] T109 [US4] Write Local Chat workflow template `extensions/builtin/local-llm/workflows/local_chat_basic.yaml` — compose_prompt -> chat_turn -> persist_message with typed ports

#### Artifact types

- [x] T110 [P] [US4] Register `text/chat-message`, `text/assistant-response`, `text/system-prompt` artifact types in extension manifest
- [x] T111 [P] [US4] Write chat thread artifact viewer YAML in `extensions/builtin/local-llm/ui/chat_thread_viewer.yaml`
- [x] T112 [P] [US4] Write Local Chat recipe card YAML in `extensions/builtin/local-llm/ui/local_chat_card.yaml`

#### Session-to-workflow promotion

- [x] T113 [US4] Implement "Save as Workflow" in `crates/nexus-local-llm/src/chat/promotion.rs` — serialize thread/session into workflow template with typed inputs/outputs, no backend-private memory handles
- [x] T114 [US4] Add POST /local-llm/sessions/:id/promote endpoint in `crates/nexus-api/src/handlers/local_llm_chat.rs`

#### Graceful degradation

- [ ] T115 [US4] Implement unresolved operator handling in `crates/nexus-workflow/src/validation.rs` — workflows load with missing extension operators shown as unresolved, not corrupted

**Checkpoint**: Local Chat recipe executes through run engine with provenance — US4 complete

---

## Phase 7: User Story 5 — TensorRT-LLM Native on Linux & Windows (Priority: P2)

**Goal**: Second backend working natively on Linux and Windows with managed embedded Python env, CUDA conflict detection

**Independent Test**: Linux: native TensorRT-LLM serves chat. Windows: managed Python env provisioned, chat works natively.

### Tests for User Story 5

- [ ] T116 [P] [US5] Integration test: Linux native TensorRT-LLM starts and serves chat in `crates/nexus-core/tests/tensorrt_linux.rs`
- [ ] T117 [P] [US5] Integration test: Windows managed env creation and chat in `crates/nexus-core/tests/tensorrt_windows.rs`
- [ ] T118 [P] [US5] Integration test: CUDA conflict detected when activating incompatible profiles in `crates/nexus-core/tests/cuda_conflict.rs`

### Implementation for User Story 5

#### Environment probe

- [x] T119 [US5] Implement `TensorRtLlmEnvironmentProbe` in `crates/nexus-local-llm/src/tensorrt/probe.rs` — detect platform, GPU, CUDA version, Python availability (no WSL2)

#### Managed embedded Python env

- [x] T120 [US5] Implement `TensorRtLlmEnvManager` in `crates/nexus-local-llm/src/tensorrt/env.rs` — create isolated Python venv at `~/.nexus/local-llm/backends/tensorrt-llm/envs/<profile-id>/`, install pinned deps from `runtime.environment` manifest
- [x] T121 [US5] Implement environment manifest persistence in `crates/nexus-local-llm/src/tensorrt/env.rs` — Python version, CUDA version, installed packages, validation result, timestamps
- [x] T122 [P] [US5] Implement `runtime.environment` manifest provisioner in `crates/nexus-local-llm/src/runtime_env.rs` — generic host-side environment provisioning from manifest declarations (reusable for future backends)

#### Serve manager

- [x] T123 [US5] Implement `TensorRtLlmServeManager` in `crates/nexus-local-llm/src/tensorrt/serve.rs` — launch `trtllm-serve` from managed venv, port allocation, health checks, log capture
- [x] T124 [US5] Implement serve-mode lifecycle state machine in `crates/nexus-local-llm/src/tensorrt/serve.rs` — env_missing -> env_installing -> env_ready -> starting -> warming -> ready

#### Adapter integration

- [x] T125 [US5] Implement `TensorRtLlmAdapter` (impl `BackendAdapter`) in `crates/nexus-local-llm/src/tensorrt/adapter.rs` — wire probe, env manager, serve manager
- [x] T126 [US5] Implement normalized metrics mapping from TensorRT-LLM to `NormalizedMetrics` in `crates/nexus-local-llm/src/tensorrt/metrics.rs`
- [x] T127 [US5] Implement structured failure categories in `crates/nexus-local-llm/src/tensorrt/error.rs` — no GPU, CUDA mismatch, Python env failed, import error, OOM

#### Runtime modes

- [x] T128 [P] [US5] Implement explicit runtime mode classification in `crates/nexus-local-llm/src/tensorrt/adapter.rs` — `linux_native`, `windows_native`, `unsupported` (no `wsl_sidecar`)

#### Model handling

- [x] T129 [US5] Implement TensorRT-LLM model handling in `crates/nexus-local-llm/src/tensorrt/model.rs` — HF checkpoint directory validation, repo-level model install support

**Checkpoint**: TensorRT-LLM works natively on Linux and Windows via managed env — US5 complete

---

## Phase 8: User Story 6 — RAG Corpora & Retrieval (Priority: P2)

**Goal**: User creates corpus, adds documents, indexes, queries through chat with inspectable retrieval trace

**Independent Test**: Create corpus, add document, index, query, verify retrieval trace artifact.

### Tests for User Story 6

- [ ] T130 [P] [US6] Integration test: create corpus, add document, index, query, verify retrieval trace in `crates/nexus-core/tests/rag_pipeline.rs`

### Implementation for User Story 6

#### Corpus management

- [ ] T131 [US6] Implement `CorpusService` in `crates/nexus-local-llm/src/rag/corpus.rs` — CRUD for rag_corpora table, state machine (created -> indexing -> ready)
- [ ] T132 [US6] Implement `DocumentService` in `crates/nexus-local-llm/src/rag/documents.rs` — add document to corpus, text extraction pipeline (plain text, markdown, PDF)

#### Chunking & embedding

- [ ] T133 [US6] Implement chunking in `crates/nexus-local-llm/src/rag/chunking.rs` — configurable chunk size and overlap, produce chunk manifest artifact
- [ ] T134 [US6] Implement embedding generation in `crates/nexus-local-llm/src/rag/embedding.rs` — call backend adapter embeddings(), store vectors, build index

#### Retrieval

- [ ] T135 [US6] Implement retrieval in `crates/nexus-local-llm/src/rag/retrieval.rs` — query index, return top-k chunks with scores, create retrieval-trace artifact
- [ ] T136 [US6] Implement context assembly in `crates/nexus-local-llm/src/rag/context.rs` — format retrieved chunks into prompt context with source references

#### RAG-enabled chat

- [ ] T137 [US6] Implement RAG chat turn in `crates/nexus-local-llm/src/chat/executor.rs` — when session has attached_corpus_ids: retrieve -> assemble context -> generate
- [ ] T138 [US6] Implement corpus attachment to sessions in `crates/nexus-local-llm/src/chat/sessions.rs` — update attached_corpus_ids, validate corpus is ready

#### Operators

- [x] T139 [P] [US6] Write `llm.embed.text` operator YAML in `extensions/builtin/local-llm/operators/embed_text.yaml`
- [x] T140 [P] [US6] Write `llm.rag.retrieve` operator YAML in `extensions/builtin/local-llm/operators/rag_retrieve.yaml`
- [x] T141 [US6] Implement `llm.embed.text` handler in `extensions/builtin/local-llm/worker/operators/embed_text.py`
- [x] T142 [US6] Implement `llm.rag.retrieve` handler in `extensions/builtin/local-llm/worker/operators/rag_retrieve.py`

#### Recipe

- [x] T143 [US6] Write Local RAG recipe YAML `extensions/builtin/local-llm/recipes/local_chat_rag.yaml`
- [x] T144 [US6] Write Local RAG workflow template `extensions/builtin/local-llm/workflows/local_chat_rag.yaml` — retrieve -> assemble_context -> chat_turn -> persist + retrieval_trace

#### UI contributions

- [x] T145 [P] [US6] Write retrieval trace viewer YAML in `extensions/builtin/local-llm/ui/retrieval_trace_viewer.yaml`
- [x] T146 [P] [US6] Write Local RAG recipe card YAML in `extensions/builtin/local-llm/ui/local_rag_card.yaml`

#### API handlers

- [x] T147 [US6] Implement corpus REST handlers in `crates/nexus-api/src/handlers/local_llm_rag.rs` — POST/GET/DELETE /local-llm/corpora, POST /local-llm/corpora/:id/documents, POST /local-llm/corpora/:id/index
- [x] T148 [US6] Register RAG API routes in `crates/nexus-api/src/router.rs`

**Checkpoint**: Single-corpus RAG runs with inspectable retrieval trace — US6 complete

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T149 [P] Implement runtime log capture and persistence to `~/.nexus/local-llm/backends/*/logs/` in `crates/nexus-local-llm/src/logging.rs`
- [x] T150 [P] Implement diagnostic snapshot on failure in `crates/nexus-local-llm/src/diagnostics.rs` — runtime state, effective config, last logs, error category
- [x] T151 [P] Write backend metrics inspector UI contribution YAML in `extensions/builtin/local-llm/ui/metrics_inspector.yaml`
- [x] T152 Implement extension activation persistence across restarts in `crates/nexus-local-llm/src/lifecycle.rs`
- [ ] T153 [P] Implement HF search result caching for rate limit mitigation in `crates/nexus-local-llm/src/models/cache.rs`
- [ ] T154 Security review: verify HF tokens never appear in logs, stderr, or UI diagnostics across all modules
- [ ] T155 Verify cross-extension artifact compatibility: text artifacts produced by other extensions consumable by RAG
- [ ] T156 Run quickstart.md scenarios 1-6 as manual validation
- [x] T157 [P] Update `extensions/builtin/local-llm/manifest.yaml` with all final operator, recipe, and UI contribution references
- [ ] T158 Code cleanup: ensure all files < 400 lines, functions < 50 lines per constitution

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories
- **Phase 3 (US1)**: Depends on Phase 2 — first user story, enables llama.cpp backend
- **Phase 4 (US2)**: Depends on Phase 2 — can run in parallel with US1 (different files)
- **Phase 5 (US3)**: Depends on Phase 3 (US1) for working backend + Phase 4 (US2) for model selection
- **Phase 6 (US4)**: Depends on Phase 5 (US3) for chat session infrastructure
- **Phase 7 (US5)**: Depends on Phase 2 only — can start after foundational, parallel with US1-US4
- **Phase 8 (US6)**: Depends on Phase 5 (US3) for chat + Phase 6 (US4) for operators
- **Phase 9 (Polish)**: Depends on all desired user stories being complete

### User Story Dependencies

```text
Phase 2 (Foundational)
  ├── US1 (Backend prep) ──┐
  ├── US2 (HF + models)  ──┤── US3 (Chat) ── US4 (Workflows) ── US6 (RAG)
  └── US5 (TensorRT-LLM) ──┘    (independent)
```

- **US1**: After Phase 2. No other story dependencies.
- **US2**: After Phase 2. Can start in parallel with US1.
- **US3**: After US1 (needs backend) + US2 (needs model).
- **US4**: After US3 (needs chat session infrastructure).
- **US5**: After Phase 2 only. Can run in parallel with US1-US4.
- **US6**: After US3 (needs chat) + US4 (needs operators).

### Within Each User Story

- Tests written alongside implementation (integration tests)
- Data models/types before services
- Services before API handlers
- Core implementation before UI contributions
- Story complete before moving to dependent stories

### Parallel Opportunities

- **Phase 2**: T016-T021 (all type definitions), T022-T024 (migrations), T028-T033 (SDK modules) — all parallelizable
- **US1 + US2**: Can start simultaneously after Phase 2
- **US5 (TensorRT-LLM)**: Fully parallel with US1-US4 after Phase 2
- **Within each US**: Tasks marked [P] can run in parallel

---

## Parallel Example: Phase 2 Foundation

```bash
# All type definitions in parallel:
T016: "Define BackendCapabilities in crates/nexus-local-llm/src/types.rs"
T017: "Define NormalizedMetrics in crates/nexus-local-llm/src/types.rs"
T018: "Define BackendHealth in crates/nexus-local-llm/src/types.rs"
T019: "Define ChatRequest/ChatResponse in crates/nexus-local-llm/src/types.rs"
T020: "Define StructuredError in crates/nexus-local-llm/src/error.rs"
T021: "Define EnvironmentProbe in crates/nexus-local-llm/src/types.rs"

# All SDK modules in parallel:
T028: "Create service_worker.py"
T029: "Create process.py"
T030: "Create streaming.py"
T031: "Create health.py"
T032: "Create artifacts.py"
T033: "Create types/llm.py"
```

## Parallel Example: US1 + US2 Simultaneously

```bash
# Developer A: US1 (llama.cpp adapter)
T042: "Create version manifest YAML"
T043: "Implement LlamaCppReleaseResolver"
T044: "Implement LlamaCppRuntimeProbe"

# Developer B: US2 (HF integration) — same time
T063: "Create hf_helper.py"
T064: "Implement HF search adapter"
T068: "Implement ModelRegistryService"
```

---

## Implementation Strategy

### MVP First (US1 + US2 + US3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: US1 (extension activates, backend ready)
4. Complete Phase 4: US2 (model download from HF)
5. Complete Phase 5: US3 (interactive chat with streaming)
6. **STOP and VALIDATE**: User can activate extension, download model, and chat locally
7. Deploy/demo if ready — this is the **minimum viable product**

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 + US2 → Backend + models ready (partial value)
3. US3 → Interactive chat works (**MVP!**)
4. US4 → Workflows with provenance
5. US5 → TensorRT-LLM (second backend)
6. US6 → RAG with retrieval trace
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers after Phase 2 completes:
- **Dev A**: US1 (llama.cpp adapter) → US3 (chat)
- **Dev B**: US2 (HF integration) → US4 (workflows)
- **Dev C**: US5 (TensorRT-LLM, independent track)
- **Dev D**: US6 (RAG, after US3+US4 ready)

---

## Task Count Summary

| Phase | Story | Tasks | Parallelizable |
|-------|-------|:-----:|:--------------:|
| 1 — Setup | — | 8 | 6 |
| 2 — Foundational | — | 30 | 18 |
| 3 — US1 | Backend prep | 22 | 5 |
| 4 — US2 | HF + models | 18 | 7 |
| 5 — US3 | Chat | 21 | 7 |
| 6 — US4 | Workflows | 16 | 7 |
| 7 — US5 | TensorRT-LLM | 14 | 4 |
| 8 — US6 | RAG | 19 | 4 |
| 9 — Polish | — | 10 | 5 |
| **Total** | | **158** | **63** |

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable at its checkpoint
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- MVP = US1 + US2 + US3 (Phases 1-5)
