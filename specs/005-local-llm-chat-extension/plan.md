# Implementation Plan: Builtin Local LLM Chat & RAG Extension

**Branch**: `feature/005-local-llm-chat` | **Date**: 2026-04-13 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-local-llm-chat-extension/spec.md`
**Depends On**: 004 (Extension Storage Contributions)

---

## Technical Context

| Dimension | Value |
|-----------|-------|
| **Host language** | Rust (latest stable, 2024 edition) |
| **Async runtime** | tokio (multi-threaded) |
| **HTTP framework** | axum 0.8 |
| **Database** | SQLite via sqlx 0.8 (WAL mode, foreign keys enforced) |
| **Frontend** | React 19 + TypeScript 5.7, vanilla-extract styling |
| **Worker protocol** | JSON-RPC 2.0 over stdio |
| **Python SDK** | nexus_sdk 0.1.x (BaseWorker) → 0.2.0 (ServiceWorker, ManagedProcess) |
| **Backend 1** | llama.cpp via `llama-server` (native binary, GGUF models) |
| **Backend 2** | TensorRT-LLM via `trtllm-serve` (managed embedded Python env) |
| **Model source** | Hugging Face via `huggingface_hub` Python package |
| **Storage** | Spec-004 extension storage contributions (namespaced tables, `ext_local_llm_` prefix) |
| **Filesystem** | `~/.nexus/local-llm/` for runtime binaries, model files, logs, RAG indexes |
| **Event transport** | Host event bus → WebSocket → frontend |
| **Windows support** | First-class for both backends. No WSL2. |
| **CUDA isolation** | Per-backend profile CUDA requirement declaration; host prevents conflicting concurrent activation |
| **Environment isolation** | Managed embedded Python venv per backend profile; `runtime.environment` manifest block |

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Ecosystem-First | PASS | Uses `huggingface_hub` (official), `llama-server` (upstream), `trtllm-serve` (NVIDIA official). No hand-rolled HTTP wrappers. |
| II. Pure Functions, SOLID | PASS | `BackendAdapter` trait = Strategy pattern. Builder for profile configs. Observer for event bus. Repository for storage. Factory for adapter selection. |
| III. Extendability | PASS | Backend-neutral adapter contract. New backends implement one trait. `runtime.environment` manifest for future extension isolation. |
| IV. Self-Documenting Code | PASS | No inline comments specified. Clear naming: `BackendProfile`, `RuntimeInstall`, `NormalizedMetrics`. |
| V. Git-Flow Branching | PASS | Feature branch `feature/005-local-llm-chat` from `develop`. Conventional commits. |
| VI. Living Documentation | PASS | Spec, data model, contracts, quickstart, research all maintained. README update required at each phase. |
| VII. Clean Provenance | PASS | No generative tooling markers in output code. |
| VIII. Memory Safety | PASS | Rust host. `Result` for all fallible ops. No unsafe anticipated for this feature. Python env isolated from Rust memory model. |
| IX. Parallelism-First | PASS | Independent backend operations dispatched concurrently. Health checks as concurrent tasks. Pipeline stages overlap (schedule next node while current writes artifact). |
| X. Modern React Patterns | PASS | `use()` for data loading. Suspense boundaries for async. ServiceWorker for backend health polling (<=10s interval). No manual memoization. |

**Gate result**: All gates PASS. No violations detected.

---

## Goal

Deliver a credible vertical slice that proves: builtin extension activation, managed local backend installation, Hugging Face model acquisition, interactive local chat with streaming, workflow-native chat recipes, and a future-safe path to RAG and TensorRT-LLM.

---

## Phase 1 — Foundations (P0)

**Focus**: Generic host infrastructure, builtin extension support, Python SDK v2 core. NO LLM-specific logic in the host.

### Deliverables
- Builtin extension classification in host registry (`available_builtin` state)
- Extension activation/deactivation plumbing with pre-approved capabilities
- Generic binary installer service in host (download, checksum, unpack, validate — reusable by any extension)
- Generic Python environment provisioner in host (create venv from `runtime.environment` manifest — reusable by any extension)
- Spec-004 storage contribution declaration (migrations 001-003)
- `ServiceWorker` and `ManagedProcess` in Python SDK v2
- Backend-neutral adapter contract defined in Python SDK (not Rust)

### Exit Criteria
- Builtin extension can be activated on demand
- Backend profiles can be created and persisted in namespaced tables
- Runtime/model metadata survives host restart
- Python SDK v2 `ServiceWorker` can start/stop a managed subprocess

### Dependencies
- Spec 004 storage contribution infrastructure must be functional

---

## Phase 2 — llama.cpp Vertical Slice (P0)

**Focus**: First working backend from install through chat.

### Deliverables
- `LlamaCppReleaseResolver`: version manifest, OS/hardware probe, asset selection
- `LlamaCppInstaller`: archive download, unpack, validation, install manifest
- `LlamaCppProcessManager`: `llama-server` launch, port allocation, health checks, log capture, restart
- `LlamaCppHttpClient`: `/v1/chat/completions`, `/health`, `/metrics`, `/slots` mapping
- Normalized metrics collection and event emission
- Backend profile state machine (validating -> starting -> ready)
- Failure classification (structured error categories)
- Windows-first: CPU and CUDA profiles on Windows x64

### Exit Criteria
- User can install llama.cpp runtime from within the app
- User can select a local GGUF model file and start `llama-server`
- Health and metrics are collected and surfaced
- Backend failures produce structured diagnostics

### Dependencies
- Phase 1 complete

---

## Phase 3 — Hugging Face Integration + Chat UI (P0)

**Focus**: Model acquisition and interactive chat experience.

### Deliverables
- Python helper for HF search (`HfApi.list_models()`)
- File inventory inspection API for GGUF filtering
- Targeted single-file GGUF download with progress events
- Download task persistence and state management
- Local model registry (spec-004 migration 001 tables)
- Model browser UI contribution
- Chat session/thread/message storage (spec-004 migration 002)
- Stream event transport from backend through host to UI
- Chat UI: model selector, system prompt, streaming response, stop/retry/regenerate
- Backend health badge and session state indicator

### Exit Criteria
- User can search HF, select a GGUF file, download with progress, and see it in model registry
- User can create a chat session, send messages, receive streamed responses
- Stop, retry, and regenerate work correctly
- Sessions and threads persist across host restarts

### Dependencies
- Phase 2 complete (working llama.cpp backend)

---

## Phase 4 — Workflow/Recipe Projection (P1)

**Focus**: Making chat available as reproducible workflows.

### Deliverables
- `llm.chat.turn` operator contract and implementation
- `llm.prompt.compose` operator
- `llm.output.persist` operator
- Local Chat recipe definition (`local_chat.basic`)
- Thread/session artifact serialization rules
- Assistant output artifact viewer
- Interactive session to workflow promotion flow

### Exit Criteria
- Local Chat recipe runs end-to-end through the host run engine
- Run produces typed artifacts with provenance
- Workflow loads correctly even when LLM extension is inactive (unresolved operators visible)

### Dependencies
- Phase 3 complete (working interactive chat)

---

## Phase 5 — Initial RAG Support (P2)

**Focus**: Single-corpus retrieval-augmented generation.

### Deliverables
- RAG storage schema (spec-004 migration 003)
- Corpus metadata model and CRUD
- Document ingestion and text extraction pipeline
- Chunking operator with configurable policy
- Embedding generation operator (`llm.embed.text`)
- Retrieval operator (`llm.rag.retrieve`)
- Retrieval-trace artifact type and viewer
- Local RAG recipe (`local_chat.rag`)
- Corpus attachment to chat sessions

### Exit Criteria
- Single-corpus RAG runs through the host with inspectable retrieval trace
- Retrieval trace is a typed artifact, not ephemeral UI state
- RAG recipe executes end-to-end with provenance

### Dependencies
- Phase 3 complete (chat sessions)
- Phase 4 complete (workflow operators)
- Embedding model available via model registry

---

## Phase 6 — TensorRT-LLM Rollout (P2)

**Focus**: Second backend for NVIDIA-optimized inference, native on both Linux and Windows.

### Deliverables
- `TensorRtLlmEnvironmentProbe`: platform, GPU, Python, CUDA detection (no WSL2)
- `TensorRtLlmEnvManager`: managed embedded Python venv creation per backend profile, package install with pinned versions, importability check, CUDA validation
- `TensorRtLlmServeManager`: `trtllm-serve` launch, health, metrics
- Normalized metrics/health mapping to shared contract
- Linux native environment path
- Windows native environment path via managed embedded Python env
- CUDA compatibility validation: prevent conflicting concurrent profiles
- Backend comparison recipe (`local_chat.compare_backends`)
- `runtime.environment` manifest block: extensions declare Python/CUDA/dep requirements, host provisions

### Exit Criteria
- TensorRT-LLM works natively on validated Linux targets
- TensorRT-LLM works natively on Windows via managed embedded Python env
- Health and metrics are normalized through the same contract as llama.cpp
- CUDA conflict detection prevents incompatible concurrent backend activation
- `runtime.environment` manifest block is parseable and provisions environments correctly

### Dependencies
- Phase 1 complete (backend-neutral contract)
- Phase 3 complete (chat session infrastructure)
- Python SDK v2 `ServiceWorker` (Phase 1)

---

## Phase Summary

| Phase | Priority | Focus | Key Milestone |
|-------|----------|-------|---------------|
| 1 | P0 | Foundations | Builtin extension activates, storage works |
| 2 | P0 | llama.cpp | Backend installs and runs on Windows |
| 3 | P0 | HF + Chat | User can download model and chat |
| 4 | P1 | Workflows | Chat recipe runs with provenance |
| 5 | P2 | RAG | Single-corpus retrieval with trace |
| 6 | P2 | TensorRT-LLM | Second backend native on Linux + Windows |

---

## Risk Mitigations by Phase

| Phase | Risk | Mitigation |
|-------|------|------------|
| 1 | Spec 004 not ready | Phase 1 can use in-memory state temporarily; convert when 004 lands |
| 2 | llama.cpp release format changes | Version pinning manifest isolates from upstream churn |
| 3 | HF API rate limits | Client-side search result caching, graceful degradation |
| 3 | Large downloads fail | HF cache resume support, clean manifest lifecycle |
| 5 | Embedding model quality varies | Start with proven models, document tested configurations |
| 6 | TensorRT-LLM managed Python env on Windows | Structured CUDA diagnostics, embedded env isolation, llama.cpp remains default |
| 6 | CUDA version conflicts between backends | Host-enforced CUDA compatibility validation prevents conflicting concurrent activation |
