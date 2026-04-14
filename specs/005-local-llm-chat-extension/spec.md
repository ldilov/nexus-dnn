# Feature Specification: Builtin Local LLM Chat & RAG Extension

**Feature ID**: 005
**Feature Branch**: `feature/005-local-llm-chat`
**Created**: 2026-04-13
**Status**: Draft
**Depends On**: 004 (Extension Storage Contributions)
**Input**: nexus-dnn-local-llm-requirements.zip (8 design documents, draft spec, data model, research)

---

## 1. Problem Statement

Nexus positions itself as a local-first, extensible workflow runtime for multimodal AI. The platform already supports installable extensions that contribute operators, recipes, UI metadata, and runtime adapters. However, it lacks first-party local LLM capabilities:

- No integrated model management or acquisition from Hugging Face
- No managed local inference runtime (llama.cpp, TensorRT-LLM, etc.)
- No interactive chat surface backed by local models
- No workflow-native text generation, embeddings, or retrieval operators
- No Python SDK abstractions for long-lived service-style backends

Without these, users must rely entirely on external tooling for local inference, losing the platform's core value propositions: host-governed execution, artifact lineage, observability, and reproducible workflows.

## 2. Solution

Deliver a **builtin extension** that adds local LLM chat, model management, and optional RAG to Nexus. The extension ships with the application but activates on demand. It integrates through the same extension contract used by external extensions, with pre-approved capabilities declared at build time.

### 2.1 Design Stance

1. The extension is **builtin** — shipped with the app, known at build time, but not activated until the user needs it.
2. The Rust host provides **generic infrastructure only** — lifecycle management, generic binary installer, generic Python env provisioner, storage contributions, event bus. The host has **zero knowledge** of llama.cpp, TensorRT-LLM, Hugging Face, chat sessions, or any LLM-specific concept.
3. **All LLM-specific logic lives inside the extension worker** (Python) — backend adapters, model management, chat execution, HF integration, RAG pipeline. The extension is fully self-sufficient using Python SDK v2 `ServiceWorker` + `ManagedProcess`.
4. The extension communicates with the host **only** through the standard extension contract: JSON-RPC over stdio, storage contributions (spec 004), events, and artifact references.
5. The extension uses **spec 004 storage contributions** for all relational state (threads, messages, sessions, model installs, backend profiles).
6. Builtin extensions use the **same extension contract** as external extensions but ship with **pre-approved capabilities** that are automatically granted.
7. The host provides two generic services that any extension can use via the extension protocol:
   - **Generic binary installer**: download archive from URL → verify checksum → unpack to managed directory → validate binary exists
   - **Generic Python environment provisioner**: create isolated venv from `runtime.environment` manifest → install pinned deps → validate
8. Each backend that requires Python gets a **managed embedded Python environment** (isolated venv with pinned deps) to avoid conflicts between backends with different CUDA or package requirements.
9. Extensions can declare runtime environment requirements (`runtime.environment` manifest block) for Python version, CUDA version, and pip dependencies. The host provisions isolated environments per extension.
10. There is **no `nexus-local-llm` Rust crate** in the host. LLM domain logic does not leak into the host codebase.

### 2.2 Scope

**In scope**:

_Host-side (generic, reusable by any extension):_
- Builtin extension classification and on-demand activation
- Generic binary installer service (download, checksum, unpack, validate)
- Generic Python environment provisioner (create venv from `runtime.environment` manifest, install deps)
- `runtime.environment` manifest block for extensions to declare Python, CUDA, and dependency requirements
- Python SDK v2: service workers, managed subprocess helpers, streaming abstractions, health/lifecycle hooks, artifact I/O
- CUDA compatibility validation: backend profiles declare CUDA requirements; host prevents conflicting concurrent activation

_Extension-side (self-contained in the Local LLM extension worker):_
- Backend-neutral adapter contract within the extension (probe, install, validate, start, stop, health, metrics, chat, embeddings)
- llama.cpp adapter: managed install via host generic installer, `llama-server` process supervision via SDK `ManagedProcess`, health/metrics, GGUF model handling
- TensorRT-LLM adapter: serve mode + direct API mode, native on Linux and Windows via host generic env provisioner
- Hugging Face integration: search, inspect, targeted GGUF download, filtered snapshot, local model registry
- Interactive chat: sessions, threads, messages, streaming, stop/retry/regenerate, backend health — all managed by the extension worker
- Workflow/recipe integration: Local Chat recipe, Local RAG recipe, typed operators, artifact provenance
- RAG: corpus metadata, chunking, embedding generation, retrieval execution, retrieval-trace artifacts
- Cross-extension compatibility: typed ports, artifact references, graceful degradation when extension is inactive
- Windows as first-class platform for both llama.cpp (native binaries) and TensorRT-LLM (managed embedded Python env)
- Observability: structured events, backend metrics normalization, runtime logs, diagnostic preservation

**Out of scope**:
- Cloud model registries beyond Hugging Face
- Multi-user distributed serving
- Automatic checkpoint format conversion
- Hard real-time collaborative chat
- Full multimodal support (deferred to backend capability evolution)
- vLLM, ONNX Runtime GenAI, mlx adapters (future backends; vllm-windows noted as candidate for future CUDA 12.4-pinned backend)

---

## 3. Terminology

| Term | Definition |
|------|-----------|
| **builtin extension** | An extension shipped with the application binary, known at build time, activated on demand |
| **backend family** | A distinct inference runtime (e.g. `llamacpp`, `tensorrt_llm`) |
| **backend profile** | A user-selectable configuration binding a backend family, runtime mode, model, and generation defaults |
| **runtime install** | A managed installation record for a backend runtime binary or environment |
| **model install** | A locally registered model with repo identity, local paths, backend compatibility, and install metadata |
| **chat session** | A first-class interactive session bound to one backend profile and one thread |
| **chat thread** | An ordered conversation history, host-owned and reusable across sessions |
| **backend adapter** | An implementation of the backend-neutral contract for a specific backend family |
| **normalized metrics** | Backend-agnostic metrics shape used by the host and UI (tokens/s, cache usage, health) |
| **managed process** | A child process supervised by the Rust host with structured lifecycle, log capture, and health checks |
| **retrieval trace** | A typed artifact recording which chunks were retrieved, with what scores, for a given query |
| **service worker** | A Python SDK v2 worker class supporting long-lived runtime state and subprocess management |
| **managed embedded env** | An isolated Python virtual environment provisioned by the host per backend, with pinned Python version, CUDA requirements, and pip dependencies |
| **runtime.environment** | A manifest block where extensions declare their Python, CUDA, and dependency requirements for host-provisioned environment isolation |
| **CUDA compatibility** | Host-enforced rule: backend profiles declare their CUDA version requirement; conflicting profiles cannot be active simultaneously on the same GPU |

---

## 4. User Scenarios & Testing

### User Story 1 — Activate builtin extension and prepare a local backend (Priority: P0)

A user opens the Chat area for the first time. The host reveals a builtin Local LLM extension that is packaged with the application but not yet activated. The user enables it, chooses a backend profile, and the host activates the extension, probes the platform, surfaces compatible backend options, and prepares the selected runtime.

**Why this priority**: No chat, model management, or recipe functionality works unless the extension can be activated and a runtime prepared reliably.

**Independent Test**: Fresh install, no prior chat state. Open Chat, activate builtin extension, choose llama.cpp on Windows, install runtime, verify backend reaches `ready`.

**Acceptance Scenarios**:

1. **Given** the Local LLM extension ships with the application but is inactive, **When** the user opens Chat and chooses Enable, **Then** the host activates the builtin extension without requiring a manual extension package install. The extension's pre-approved capabilities (`filesystem.write`, `network.loopback`, `network.remote`, `process.spawn`, `gpu.compute`, `model_registry.read`) are granted automatically.
2. **Given** the extension is activating, **When** platform probing completes, **Then** the UI shows only backend/runtime choices that the current system can plausibly support, plus an expert override path.
3. **Given** a Windows x64 system with an NVIDIA GPU, **When** the user selects llama.cpp, **Then** the extension offers CPU, CUDA 12, and CUDA 13 choices when compatible, with a recommended default selected automatically.
4. **Given** the user selects an unsupported backend/runtime combination, **When** validation runs, **Then** the host blocks activation of that profile and returns a structured diagnostic with remediation hints.
5. **Given** the runtime finishes installation and validation, **When** the backend starts, **Then** the backend profile transitions through `installing -> validating -> starting -> ready` and exposes health and version information.
6. **Given** backend startup fails, **When** the host records the failure, **Then** the extension remains active but the backend profile enters `failed` with logs and diagnostics preserved.

---

### User Story 2 — Browse Hugging Face, download a compatible model, and register it locally (Priority: P0)

A user wants to chat with a local model but has not downloaded one yet. From the model browser inside the extension UI, the user searches Hugging Face, filters by backend compatibility, inspects available files, downloads the needed model asset, and selects the newly installed model for a backend profile.

**Why this priority**: A local-LLM feature without integrated model acquisition is too manual for the intended product experience.

**Independent Test**: Search for a GGUF model, select a single GGUF file, download it, verify progress updates, verify an install manifest is created, and verify the model becomes selectable in the chat UI.

**Acceptance Scenarios**:

1. **Given** the user opens the model browser, **When** they search Hugging Face, **Then** the extension returns model results with normalized metadata including repo id, display name, summary, compatibility hints, and install state.
2. **Given** a model result contains multiple files, **When** the user inspects it for llama.cpp usage, **Then** GGUF files are highlighted and the user can select a specific file rather than downloading the entire repository.
3. **Given** the user starts a model download, **When** the download is running, **Then** the host persists a model download task with progress, status, cancel capability, and final install manifest linkage.
4. **Given** a completed model download, **When** the install is registered, **Then** the model appears in the local model registry with repo id, revision, local path, backend compatibility tags, and file size metadata.
5. **Given** authentication is required for a private model, **When** the user has not provided valid credentials, **Then** the UI reports the auth requirement without leaking tokens or raw headers into logs.
6. **Given** a model download is interrupted, **When** the user resumes or retries, **Then** the extension reuses existing metadata and reports a clean final state instead of creating duplicate broken install records.

---

### User Story 3 — Start a chat session, stream responses, and inspect runtime metrics (Priority: P0)

A user selects a backend profile and a local model, enters a system prompt and user message, and begins chatting. The extension streams assistant output back to the UI, persists the thread, and surfaces backend health and throughput metrics.

**Why this priority**: This is the core user-visible value of the feature.

**Independent Test**: Start a chat session against llama.cpp, stream a response, stop mid-generation, retry, and inspect health and metrics.

**Acceptance Scenarios**:

1. **Given** a valid backend profile and local model, **When** the user starts a chat session, **Then** the host creates a first-class chat session record bound to backend, model, and generation defaults.
2. **Given** the backend supports streaming, **When** the assistant generates a response, **Then** the UI receives incremental stream events followed by a final completion record and normalized metrics.
3. **Given** a live generation, **When** the user presses Stop, **Then** the host sends a cancellation request, updates session state appropriately, and preserves the partial output.
4. **Given** the user retries a turn, **When** the retry begins, **Then** the extension records retry lineage within the thread model instead of silently overwriting prior output.
5. **Given** the backend exposes metrics, **When** generation completes, **Then** the UI can show prompt tokens, generated tokens, throughput, latency, and backend health.
6. **Given** the backend becomes unhealthy during chat, **When** health checks fail, **Then** the session enters `degraded`, the UI reflects the state, and diagnostics remain inspectable.

---

### User Story 4 — Run chat and RAG as recipes/workflows with provenance (Priority: P1)

A user wants the same local LLM capability available inside the workflow/recipe system. They create or open a Local Chat or Local RAG recipe, execute it through the host run engine, and inspect outputs and provenance.

**Why this priority**: The platform thesis is workflow-native. Local chat cannot remain a disconnected UI-only feature.

**Independent Test**: Execute a Local Chat recipe and a Local RAG recipe end-to-end. Verify typed inputs/outputs, run state transitions, output artifacts, and retrieval trace.

**Acceptance Scenarios**:

1. **Given** the Local LLM extension is active, **When** the frontend queries recipes, **Then** it receives at least one local chat recipe and one local RAG recipe with normalized display metadata.
2. **Given** a Local Chat workflow is executed, **When** the run completes, **Then** the host records workflow version, backend profile, model identity, message inputs, assistant output, and metrics as provenance.
3. **Given** a Local RAG workflow is executed, **When** retrieval occurs, **Then** the retrieved chunks and scores are persisted as a retrieval-trace artifact.
4. **Given** a workflow references this extension's operators but the extension is inactive, **When** the workflow is loaded, **Then** the workflow remains structurally intact and unresolved operators are surfaced clearly without corruption.
5. **Given** another installed extension produced text or document artifacts, **When** the Local RAG workflow consumes them, **Then** the host validates the typed connections and the recipe runs without private integration code.
6. **Given** the user promotes an interactive thread into a workflow snapshot, **When** the workflow is saved, **Then** the session/thread state is serialized into host-owned artifacts or inputs rather than backend-private memory objects.

---

### User Story 5 — Use TensorRT-LLM natively on Linux and Windows (Priority: P2)

An advanced user wants the NVIDIA-optimized backend. On both Linux and Windows, the product provisions a managed embedded Python environment with pinned TensorRT-LLM dependencies, starts the runtime natively, and serves chat through the normalized backend contract.

**Why this priority**: TensorRT-LLM is important but its environment complexity and CUDA version pinning require managed isolation. The managed embedded env pattern established here becomes the foundation for future per-extension runtime isolation.

**Independent Test**: On Linux, start a native TensorRT-LLM chat session. On Windows, verify the managed Python env is created with correct CUDA/Python versions and chat works natively.

**Acceptance Scenarios**:

1. **Given** a Linux system with a compatible NVIDIA GPU, **When** the user selects TensorRT-LLM, **Then** the extension provisions an isolated Python environment, installs pinned dependencies, starts the runtime, and serves chat requests through the normalized backend contract.
2. **Given** a Windows system with a compatible NVIDIA GPU, **When** the user selects TensorRT-LLM, **Then** the extension provisions a managed embedded Python environment natively on Windows (no WSL2), validates CUDA compatibility, and starts the backend.
3. **Given** the TensorRT-LLM runtime is running in serve mode, **When** the host inspects health and metrics, **Then** the backend exposes normalized health, version, queue/load, and performance data.
4. **Given** the TensorRT-LLM runtime is unavailable or CUDA requirements are not met, **When** the user tries to create a session, **Then** the host blocks the action with structured diagnostics (including CUDA version mismatch detail) and keeps the rest of the extension functional.
5. **Given** a llama.cpp profile using CUDA 13 is already active, **When** the user tries to activate a TensorRT-LLM profile requiring a different CUDA version, **Then** the host reports the CUDA conflict and requires the user to stop the conflicting profile first.

---

### User Story 6 — Manage local RAG corpora and inspect retrieval (Priority: P2)

A user creates a local document corpus, indexes it, attaches it to a chat session, and inspects how retrieval influenced the answer.

**Why this priority**: RAG is the primary value-add over basic chat. Making retrieval transparent and inspectable differentiates from opaque chatbot UIs.

**Independent Test**: Create a corpus, add documents, index, query through chat, inspect the retrieval trace artifact.

**Acceptance Scenarios**:

1. **Given** the user creates a corpus, **When** documents are added, **Then** the host records corpus metadata and document references.
2. **Given** documents are added to a corpus, **When** indexing completes, **Then** chunks, embeddings, and an index manifest are persisted as artifacts.
3. **Given** a corpus is attached to a chat session, **When** the user asks a question, **Then** the extension retrieves relevant chunks, assembles context, and generates an answer.
4. **Given** a RAG answer is generated, **When** the user inspects it, **Then** a retrieval-trace artifact shows retrieved chunks, scores, ordering, and context assembly.
5. **Given** the RAG corpus is in `indexing` state, **When** the user attempts a query, **Then** the system either waits for readiness or returns a structured error — never silently returns empty results.

---

## 5. Functional Requirements

### 5.1 Extension packaging, activation, and classification

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | The platform SHALL support a distinction between **builtin** and **external** extensions, where builtin extensions ship with the application image but can still be disabled or activated on demand. | P0 |
| FR-002 | The Local LLM feature SHALL be implemented as a builtin extension that participates in extension discovery, state, UI contribution indexing, and operator indexing through the same host registry model used for external extensions. | P0 |
| FR-003 | The host SHALL allow the builtin Local LLM extension to remain packaged but inactive until first use or explicit enablement. | P0 |
| FR-004 | The host SHALL persist extension activation state, backend profile state, and runtime installation state across restarts via spec-004 storage contributions. | P0 |
| FR-005 | The extension SHALL contribute operators, recipes, UI metadata, and runtime adapters without requiring direct UI-to-backend communication. | P0 |
| FR-006 | Builtin extensions SHALL declare their capabilities in the manifest. The host SHALL grant these capabilities automatically without user approval prompts, since the extension is trusted at build time. | P0 |
| FR-007 | The extension SHALL support the following activation states: `available_builtin`, `activating`, `active`, `degraded`, `disabled`, `error`. | P0 |

### 5.2 Backend-neutral runtime model

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-010 | The extension SHALL define a backend-neutral adapter contract covering: environment probe, runtime install, runtime validate, runtime start/stop, health, metrics, capabilities, chat generation, embeddings, model listing, and model download. | P0 |
| FR-011 | Every backend adapter SHALL report a normalized capabilities model including: backend id, version, supported modes, streaming support, embeddings support, reranking support, structured output support, platform support state, and metrics availability. | P0 |
| FR-012 | The frontend SHALL render backend state and controls through normalized host APIs rather than backend-specific direct clients. | P0 |
| FR-013 | The normalized metrics model SHALL include at minimum: prompt tokens total, generated tokens total, prompt throughput (tok/s), generation throughput (tok/s), KV cache usage ratio, active requests, and last-updated timestamp. | P1 |

### 5.3 llama.cpp adapter

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-020 | The extension SHALL support llama.cpp as the first implementation backend. | P0 |
| FR-021 | The llama.cpp adapter SHALL wrap `llama-server` as the primary interactive serving surface. | P0 |
| FR-022 | The extension SHALL support OS autodiscovery and runtime asset selection based on OS family, architecture, selected accelerator mode, and CUDA line. | P0 |
| FR-023 | On Windows x64, the llama.cpp installer SHALL support CPU and CUDA-backed profiles, including user override between CUDA 12 and CUDA 13 when both are configured. | P0 |
| FR-024 | The llama.cpp adapter SHALL manage install manifests, binary paths, effective runtime config, logs, health checks, and restart behavior as first-class state. | P0 |
| FR-025 | The llama.cpp adapter SHALL consume `/health`, `/metrics`, `/slots`, and `/v1/chat/completions` endpoints and map them into normalized host metrics/events. | P0 |
| FR-026 | The llama.cpp adapter SHALL support GGUF-backed model selection and validation before runtime startup. | P0 |
| FR-027 | The adapter SHALL use a version manifest (pinned known-good version) rather than hard-coded download URLs. Support optional user version override. | P0 |
| FR-028 | The adapter SHALL generate `llama-server` command lines from normalized profile configs. The full effective config SHALL be persisted for diagnostics. | P1 |
| FR-029 | The adapter SHALL classify failures into structured categories: binary missing, install corrupt, model file missing, port bind failure, CUDA mismatch, model load failure, OOM, request timeout, backend unavailable, unexpected exit. | P1 |

### 5.4 TensorRT-LLM adapter

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-030 | The extension SHALL define TensorRT-LLM as the second backend, implemented after llama.cpp. | P2 |
| FR-031 | The TensorRT-LLM adapter SHALL be Python-managed and support both `serve` mode (via `trtllm-serve`) for interactive chat and direct Python API mode for advanced workflows. | P2 |
| FR-032 | The adapter SHALL provision a **managed embedded Python environment** per backend profile with pinned Python version, CUDA toolkit version, and pip dependencies. The environment SHALL be isolated from system Python and other backend environments. | P2 |
| FR-033 | The adapter SHALL support native execution on both Linux and Windows. WSL2 is NOT a supported path. | P2 |
| FR-034 | The TensorRT-LLM adapter SHALL expose structured environment diagnostics including Python version, CUDA version, installed packages, backend mode, and last validation outcome. | P2 |
| FR-035 | The TensorRT-LLM adapter SHALL surface health, metrics, and structured runtime errors through the same normalized contract used by other backends. | P2 |
| FR-036 | The adapter SHALL support explicit runtime modes: `linux_native`, `windows_native`, `unsupported`. The `wsl_sidecar` mode is explicitly excluded. | P2 |
| FR-037 | Each backend profile SHALL declare its CUDA version requirement. The host SHALL validate CUDA compatibility at profile creation time and prevent simultaneous activation of profiles with conflicting CUDA versions on the same GPU. | P1 |
| FR-038 | The extension manifest SHALL support a `runtime.environment` block declaring: required Python version, required CUDA version, pip dependencies (with version pins), and optional environment variables. The host SHALL use this declaration to provision isolated environments. | P1 |

### 5.5 Model registry and Hugging Face integration

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-040 | The extension SHALL integrate with Hugging Face through the official `huggingface_hub` Python package for search and download operations. | P0 |
| FR-041 | The extension SHALL support model search, detail inspection, file inventory inspection, and backend compatibility hinting in the product UI. | P0 |
| FR-042 | The extension SHALL support targeted single-file download flows for llama.cpp GGUF usage. | P0 |
| FR-043 | The extension SHALL support filtered or full repository download modes where a backend requires more than one file. | P1 |
| FR-044 | The host SHALL persist model install manifests containing repo id, revision, selected files, local paths, backend compatibility tags, size metadata, and install timestamps. | P0 |
| FR-045 | The UI SHALL show download progress, state transitions, cancellation, retry, and final install outcomes as first-class tasks. | P0 |
| FR-046 | The extension SHALL support authenticated Hub access without leaking tokens to logs or UI diagnostics. | P1 |
| FR-047 | The extension SHALL distinguish between raw Hub metadata and Nexus-computed compatibility hints in its model registry data model. | P1 |
| FR-048 | The model browser SHALL present backend-aware views: GGUF files highlighted for llama.cpp, repo-level models for TensorRT-LLM. The download mode (single-file vs repo-level) SHALL be selected automatically based on the active backend — the user does not choose download modes manually. | P1 |
| FR-049 | The extension SHALL respect the HF cache model and keep a Nexus install manifest pointing to cached or managed-copy files. | P1 |

### 5.6 Chat sessions and conversational UX

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-050 | The host SHALL persist chat sessions as first-class objects containing backend profile, model identity, generation defaults, thread reference, session state, and timestamps. | P0 |
| FR-051 | The host SHALL persist message threads/messages as host-owned records via spec-004 storage contributions rather than leaving them only inside backend memory. | P0 |
| FR-052 | The extension SHALL support token/chunk streaming for backends that provide it. | P0 |
| FR-053 | The extension SHALL support stop, retry, regenerate, and model/backend switching through host APIs. | P0 |
| FR-054 | The extension SHALL preserve retry lineage (via `retry_of_message_id`) rather than silently overwriting prior outputs. | P1 |
| FR-055 | The UI SHALL show backend health and runtime state inline with the chat session. | P1 |
| FR-056 | The extension SHALL support system prompts, generation parameter overrides, and session-level defaults. | P0 |
| FR-057 | Chat sessions SHALL be reopenable across host restarts. | P1 |

### 5.7 Workflow and recipe integration

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-060 | The extension SHALL contribute at least one local chat recipe and one local RAG recipe. | P1 |
| FR-061 | Chat and RAG recipes SHALL compile to the canonical workflow model with typed inputs, outputs, and nodes. | P1 |
| FR-062 | Interactive sessions SHALL be promotable into workflow snapshots or recipe presets without requiring backend-private memory handles. | P2 |
| FR-063 | The extension SHALL expose workflow operators for: chat turn execution (`llm.chat.turn`), embeddings (`llm.embed.text`), retrieval (`llm.rag.retrieve`), prompt composition (`llm.prompt.compose`), output persistence (`llm.output.persist`), retrieval trace persistence (`llm.retrieval.trace.persist`). | P1 |
| FR-064 | Workflow outputs SHALL include text outputs and any retrieval/context trace artifacts necessary for debugging and provenance. | P1 |
| FR-065 | The extension SHALL support additional operators: `llm.session.create`, `llm.session.save`, `llm.session.load`, `llm.backend.start`, `llm.backend.stop`, `llm.model.download`. | P2 |

### 5.8 RAG

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-070 | The extension SHALL be architected so that RAG can be enabled without redesigning the chat/session model. | P1 |
| FR-071 | The host SHALL own corpus metadata, artifact identities, and provenance for ingested document content and retrieval traces. | P1 |
| FR-072 | The extension SHALL own chunking, embedding generation, retrieval execution, and context assembly policies. | P2 |
| FR-073 | The extension SHALL represent retrieval traces as inspectable artifacts (`text/retrieval-trace`) rather than ephemeral UI-only data. | P1 |
| FR-074 | The UI SHALL support attaching one or more corpora to a session or recipe where RAG is enabled. | P2 |
| FR-075 | The extension SHALL support a first RAG pipeline: ingest -> extract text -> chunk -> embed -> index -> retrieve -> assemble context -> generate answer + retrieval trace. | P2 |

### 5.9 Python SDK v2

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-080 | The Python SDK SHALL be extended with a `ServiceWorker` class supporting long-lived runtime state, startup/shutdown lifecycle, and subprocess management. | P1 |
| FR-081 | The Python SDK SHALL provide `ManagedProcess` helpers for cross-platform child process spawning, stdout/stderr capture, unexpected exit detection, and graceful shutdown. | P1 |
| FR-082 | The Python SDK SHALL provide typed streaming abstractions (`StreamingExecution`) for token/chunk events separate from coarse progress notifications. | P1 |
| FR-083 | The Python SDK SHALL provide lifecycle hooks: `on_startup()`, `on_shutdown()`, `on_health_check()`, `on_cancel()`. | P1 |
| FR-084 | The Python SDK SHALL provide artifact I/O convenience helpers for read references, write targets, and structured text/JSON outputs. | P2 |
| FR-085 | The Python SDK SHALL provide a structured health reporter supporting readiness, liveness, degraded state, backend version, and environment diagnostics. | P1 |
| FR-086 | The SDK refinement SHALL NOT break existing simple stateless workers (`BaseWorker`). | P0 |

### 5.10 Cross-extension compatibility

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-090 | Workflows referencing Local LLM operators SHALL remain loadable even if the extension is inactive; unresolved operators must be surfaced without corrupting workflow structure. | P1 |
| FR-091 | The Local LLM extension SHALL consume text/document artifacts produced by other extensions through typed ports and artifact references. | P1 |
| FR-092 | Other extensions SHALL consume assistant outputs, retrieval traces, and related artifacts produced by this extension. | P1 |
| FR-093 | All Local LLM UI contributions SHALL inherit the host design system and degrade gracefully where custom metadata is unavailable. | P0 |
| FR-094 | The host SHALL support opening workflows/recipes from different extensions within the same UI shell without extension-specific frontend bundles. | P1 |

### 5.11 Observability and diagnostics

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-100 | The host SHALL emit structured events for backend install progress, backend state changes, model download progress, session lifecycle, stream lifecycle, and backend failures. | P0 |
| FR-101 | The extension SHALL persist runtime logs and last-known diagnostics for both backend families. | P1 |
| FR-102 | The extension SHALL normalize backend metrics into a host-visible model suitable for dashboards, inspectors, or run/session summaries. | P1 |
| FR-103 | The product SHALL expose enough diagnostics to distinguish: install failure, config failure, model load failure, runtime health failure, and execution failure. | P1 |

### 5.12 Windows support

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-110 | Windows SHALL be a first-class supported host platform for the overall feature. | P0 |
| FR-111 | The llama.cpp adapter SHALL support a native Windows runtime. | P0 |
| FR-112 | The TensorRT-LLM adapter SHALL provide native Windows support via a managed embedded Python environment with pinned CUDA and dependency versions. WSL2 is not a supported path. | P2 |
| FR-113 | Path handling, process spawning, cancellation, log capture, and runtime validation SHALL be implemented with Windows behavior in mind rather than assuming POSIX semantics. | P0 |

---

## 6. Non-Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-001 | Backend failures SHALL NOT crash the Rust host. | P0 |
| NFR-002 | Runtime install state, model install state, chat sessions, and workflow provenance SHALL remain recoverable after host restart. | P0 |
| NFR-003 | All public extension-facing contracts SHALL be versioned. | P1 |
| NFR-004 | The default path for starting a chat-capable local model SHALL be understandable by an advanced-but-not-expert user without leaving the app. | P0 |
| NFR-005 | The architecture SHALL allow additional local or service backends without redesigning the host core. | P1 |
| NFR-006 | The extension SHALL preserve clear separation between interactive chat state and canonical workflow execution while reusing shared concepts. | P1 |
| NFR-007 | Backend selection UX SHALL avoid presenting backend-specific jargon as the only user-facing mental model. Profile names like "Balanced / easiest" and "NVIDIA optimized" are preferred over raw backend identifiers. | P1 |
| NFR-008 | All secrets or tokens used for Hugging Face authentication SHALL be redacted from logs. | P0 |
| NFR-009 | Metrics and diagnostics SHALL be detailed enough to support performance tuning and support/debug workflows. | P1 |
| NFR-010 | The feature SHALL degrade gracefully when a specific backend family is unavailable. | P0 |
| NFR-011 | Token streaming latency SHALL not exceed 100ms from backend emission to UI delivery under normal conditions. | P1 |
| NFR-012 | Model download progress SHALL update at least every 2 seconds during active transfers. | P1 |

---

## 7. Key Entities

See [data-model.md](data-model.md) for complete field definitions and state machines.

| Entity | Purpose | Storage |
|--------|---------|---------|
| **BackendProfile** | User-selectable runtime configuration binding backend family, runtime mode, model, and generation defaults | Spec-004 namespaced table |
| **RuntimeInstall** | Managed backend runtime installation record (version, assets, platform, validation outcome) | Spec-004 namespaced table |
| **ModelInstall** | Locally registered model with repo identity, local paths, backend compatibility, and install metadata | Spec-004 namespaced table |
| **ModelDownloadTask** | First-class model download operation with progress, cancellation, and final install linkage | Spec-004 namespaced table |
| **ChatSession** | Interactive session bound to backend profile, model, thread, with state and diagnostics | Spec-004 namespaced table |
| **ChatThread** | Ordered conversation history, host-owned and reusable | Spec-004 namespaced table |
| **ChatMessage** | Single message in a thread with role, content, metadata, and retry lineage | Spec-004 namespaced table |
| **RagCorpus** | Local retrieval corpus metadata | Spec-004 namespaced table |
| **RagDocument** | Document included in a corpus with source artifact reference | Spec-004 namespaced table |
| **RetrievalTrace** | Retrieval output for a query, pointing to a typed artifact | Spec-004 namespaced table |

---

## 8. Artifact Types

New artifact types introduced by this extension:

| Type | Description | Producer |
|------|-------------|----------|
| `text/chat-message` | Serialized assistant message for workflow interop | `llm.chat.turn` operator |
| `text/chat-thread` | Serialized thread snapshot for workflow promotion | `llm.session.save` operator |
| `text/system-prompt` | System prompt template artifact | Recipe input |
| `text/retrieval-query` | Query submitted to retrieval pipeline | `llm.rag.retrieve` operator |
| `text/retrieval-trace` | Retrieved chunks, scores, ordering, context assembly | `llm.rag.retrieve` operator |
| `text/assistant-response` | Final formatted assistant response | `llm.output.persist` operator |
| `embedding/vector-list` | Embedding vectors for a set of chunks | `llm.embed.text` operator |
| `rag/chunk-manifest` | Chunk boundaries, offsets, and metadata for a document | Chunking pipeline |
| `rag/index-manifest` | Index state for a corpus | Indexing pipeline |

---

## 9. Extension Contributions

### 9.1 Operators

| Operator ID | Version | Purpose | Priority |
|-------------|---------|---------|----------|
| `llm.chat.turn` | 1.0.0 | Execute one chat turn (prompt in, response out) | P0 |
| `llm.prompt.compose` | 1.0.0 | Assemble system prompt + user message + context | P1 |
| `llm.embed.text` | 1.0.0 | Generate embeddings for text input | P2 |
| `llm.rag.retrieve` | 1.0.0 | Retrieve relevant chunks from a corpus | P2 |
| `llm.rag.answer` | 1.0.0 | RAG answer generation (retrieve + generate) | P2 |
| `llm.output.persist` | 1.0.0 | Persist assistant output as typed artifact | P1 |
| `llm.retrieval.trace.persist` | 1.0.0 | Persist retrieval trace as artifact | P2 |
| `llm.session.create` | 1.0.0 | Create a chat session programmatically | P2 |
| `llm.session.save` | 1.0.0 | Serialize session/thread to artifact | P2 |
| `llm.session.load` | 1.0.0 | Load session/thread from artifact | P2 |
| `llm.backend.start` | 1.0.0 | Start a backend profile | P2 |
| `llm.backend.stop` | 1.0.0 | Stop a backend profile | P2 |
| `llm.model.download` | 1.0.0 | Download a model from Hugging Face | P2 |

### 9.2 Recipes

| Recipe ID | Purpose | Priority |
|-----------|---------|----------|
| `local_chat.basic` | Single-turn or threaded local chat | P1 |
| `local_chat.rag` | Local chat with retrieval from attached corpora | P2 |
| `local_chat.compare_backends` | Compare responses from two backend/model combos | P3 |
| `local_chat.summarize` | Summarize documents using local model | P3 |

### 9.3 UI Contributions

| Kind | ID | Purpose | Priority |
|------|----|---------|----------|
| `command` | `llm.open_chat` | Open chat panel | P0 |
| `command` | `llm.open_model_browser` | Open model browser | P0 |
| `command` | `llm.open_backend_settings` | Open backend settings | P0 |
| `inspector_panel` | `llm.session_inspector` | Chat session details and metrics | P1 |
| `inspector_panel` | `llm.backend_health` | Backend health and metrics card | P1 |
| `artifact_viewer` | `llm.chat_thread_viewer` | Render chat thread artifacts | P1 |
| `artifact_viewer` | `llm.retrieval_trace_viewer` | Render retrieval trace artifacts | P2 |
| `recipe_card` | `llm.local_chat_card` | Local Chat recipe display | P1 |
| `recipe_card` | `llm.local_rag_card` | Local RAG recipe display | P2 |

---

## 10. Storage Layout

The extension uses spec-004 storage contributions for relational state and the filesystem for large binary assets.

### 10.1 Database (spec-004 namespaced tables)

Namespace alias: `local_llm`
Effective prefix: `ext_local_llm_`

Tables: `backend_profiles`, `runtime_installs`, `model_installs`, `model_download_tasks`, `chat_sessions`, `chat_threads`, `chat_messages`, `rag_corpora`, `rag_documents`, `retrieval_traces`

### 10.2 Filesystem

```text
~/.nexus/local-llm/
  backends/
    llamacpp/
      manifests/          # install-<id>.json
      installs/           # versioned binary directories
        b8766/bin/ lib/
      active/             # per-profile runtime state
        profile-<id>/config.json logs/ runtime.pid
    tensorrt-llm/
      envs/               # Python environments
      active/             # per-profile runtime state
      logs/
  models/
    hf-cache/             # respects HF cache layout
    local-installs/       # managed copies
    metadata/             # Nexus-computed compatibility hints
  rag/
    corpora/              # per-corpus directories
    chunks/               # chunked text
    indexes/              # embedding indexes
```

---

## 11. Success Criteria

| ID | Criterion | Measured By |
|----|-----------|-------------|
| SC-001 | A user on Windows can activate the builtin extension, auto-install llama.cpp, download a GGUF model from HF, and reach a `ready` chat session without manual binary management. | End-to-end test |
| SC-002 | A user can search HF, inspect compatible models, download, and see the model in a local registry with backend hints. | End-to-end test |
| SC-003 | A user can chat, receive streamed responses, stop generation, retry, and inspect backend metrics. | End-to-end test |
| SC-004 | Local Chat and Local RAG recipes execute through the host run engine with typed artifacts and preserved provenance. | Integration test |
| SC-005 | Both llama.cpp and TensorRT-LLM work through one normalized backend contract without backend-specific logic in host core or frontend. | Architecture review |
| SC-006 | Extension storage tables survive host restart and upgrade via spec-004 migration lifecycle. | Integration test |

---

## 12. Assumptions and Constraints

1. The Rust host remains the canonical execution authority and metadata owner.
2. The builtin extension respects extension boundaries rather than hard-coding backend semantics into the host.
3. The first shippable vertical slice prioritizes llama.cpp on Windows and Linux.
4. TensorRT-LLM is added with native support on both Linux and Windows. WSL2 is not a supported execution path.
5. Spec 004 (Extension Storage Contributions) must be implemented before this feature's storage-dependent components.
6. The Python SDK v2 changes are backward-compatible with existing `BaseWorker` extensions.
7. The frontend communicates only with the Rust host — never directly with backend runtimes.
8. Each Python-managed backend gets its own isolated embedded Python environment (venv with pinned deps) to avoid CUDA and dependency conflicts between backends.
9. Backend profiles that require CUDA declare their version requirement. The host prevents simultaneous activation of profiles with conflicting CUDA versions.
10. The `runtime.environment` manifest block establishes the pattern for future per-extension runtime isolation — any extension can declare Python/CUDA/dependency requirements and receive a host-provisioned isolated environment.

---

## 13. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| llama.cpp upstream release format changes | Runtime install breaks | Version pinning manifest + integration tests on each pinned version |
| Hugging Face API rate limits during model search | UX degradation | Client-side caching of search results, graceful degradation messaging |
| TensorRT-LLM managed Python env on Windows | Environment creation failure, CUDA version mismatch | Structured diagnostics, CUDA compatibility validation at profile creation, fallback to llama.cpp |
| CUDA version conflicts between backends | Cannot run llama.cpp CUDA 13 and TensorRT-LLM simultaneously | Host-enforced CUDA compatibility validation prevents conflicting concurrent activation |
| Large GGUF downloads interrupted | Wasted bandwidth, broken installs | Resume support via HF cache, clean install manifest lifecycle |
| Backend process crashes during chat | Lost user context | Session/thread persistence, crash detection + diagnostic preservation |
| Spec 004 not ready when 005 implementation starts | Blocked storage work | Phase 1 can use temporary in-memory state; convert to spec-004 tables when ready |

---

## 14. Clarifications

### Session 2026-04-13

- Q: Should the second backend be TensorRT-LLM, vllm-windows, or both? → A: Keep TensorRT-LLM as second backend. No WSL2. Architecture should future-proof for per-extension isolated embedded runtimes/CUDA.
- Q: How should TensorRT-LLM handle its Python environment on Windows? → A: Managed embedded Python env per backend — extension creates an isolated venv with pinned deps per backend profile.
- Q: How should CUDA version conflicts between backends be handled? → A: Backend profiles declare CUDA requirements; host validates compatibility and prevents conflicting concurrent activation on the same GPU.
- Q: Should model download mode differ by backend (GGUF file pick vs repo download)? → A: Automatic — backend selection determines download mode; UI adapts silently.
- Q: Should per-extension runtime isolation be a platform capability or internal detail? → A: Add `runtime.environment` manifest block — extensions declare Python version, CUDA requirements, and pip dependencies; host provisions isolated per-extension environments.
- Q: Should LLM backend logic (adapters, chat executor, model registry) live in a Rust host crate or in the extension? → A: ALL LLM-specific logic lives in the extension worker (Python). The host provides only generic infrastructure (binary installer, env provisioner). No `nexus-local-llm` Rust crate. Extensions must be self-sufficient.

---

## 15. Related Documents

| Document | Description |
|----------|-------------|
| [data-model.md](data-model.md) | Entity field definitions, state machines, storage contribution mapping |
| [research.md](research.md) | Architectural decisions and trade-off analysis |
| [plan.md](plan.md) | Phased implementation plan with exit criteria |
| [tasks.md](tasks.md) | Full task breakdown by epic |
| [quickstart.md](quickstart.md) | User-facing scenario walkthroughs |
| [contracts/backend-adapter.md](contracts/backend-adapter.md) | Backend-neutral adapter contract |
| [contracts/chat-session-api.md](contracts/chat-session-api.md) | Chat session and thread API contract |
| [contracts/python-sdk-v2.md](contracts/python-sdk-v2.md) | Python SDK v2 contract |
