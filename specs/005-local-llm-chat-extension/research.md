# Research: Builtin Local LLM Chat & RAG Extension

**Spec**: 005
**Date**: 2026-04-13

---

## R-001: Extension form factor

**Decision**: Implement as a **builtin extension** that ships with the app but activates on demand.

**Rationale**: The feature needs deeper host integration than a purely external extension (runtime installation, process supervision, richer UI panels, storage conventions for model cache) while still benefiting from the extension contract, operator indexing, recipe contributions, and graceful disable/degraded behavior.

**Alternatives considered**:
- Hard-code local LLM support into the host core — rejected because it weakens the extension architecture and sets a bad precedent.
- Ship as purely external extension — rejected because runtime installation, model management, and Windows behavior are too operationally sensitive for the external trust model.

---

## R-002: Control-plane runtime choice

**Decision**: Use a **Rust supervisor** as the primary control plane, with Python helpers where valuable.

**Rationale**: Process supervision, install-state management, OS detection, port binding, log capture, Windows behavior, and health monitoring are natural fits for Rust in this codebase. Python remains valuable for `huggingface_hub` and TensorRT-LLM integration.

**Alternatives considered**:
- Python-only control plane — rejected because the hardest operational problems (process lifecycle, Windows behavior, crash recovery) are better handled in Rust.
- Native-only with no Python — rejected because Hugging Face and TensorRT-LLM integration become unnecessarily difficult.

---

## R-003: llama.cpp serving surface

**Decision**: Wrap `llama-server` as the default serving path for interactive chat.

**Rationale**: `llama-server` provides OpenAI-compatible API, health/metrics endpoints, slot inspection, prompt-cache operations, embeddings, and reranking — a much richer integration surface than one-shot CLI invocations.

**Alternatives considered**:
- `llama-cli` for interactive chat — rejected as primary path because it lacks service lifecycle and observability.
- Direct library embedding — deferred because executable wrapping is faster to ship and easier to isolate from host stability.

---

## R-004: TensorRT-LLM runtime model

**Decision**: Python-managed adapter with two modes: `serve` (via `trtllm-serve`) for interactive chat, and direct Python API for advanced/internal flows.

**Rationale**: Serve mode provides consistent HTTP semantics and health endpoints for the UI. Direct API preserves future flexibility for specialized workflow operators.

**Alternatives considered**:
- Direct Python API only — rejected because interactive service operations become less standardized.
- Serve-only forever — rejected because it constrains future advanced operators.

---

## R-005: TensorRT-LLM Windows strategy

**Decision**: Support TensorRT-LLM **natively on Windows** via a managed embedded Python environment. WSL2 is explicitly excluded as a runtime path.

**Rationale**: TensorRT-LLM has native Windows support. Each Python-managed backend gets its own isolated venv with pinned Python version, CUDA version, and dependencies. This avoids CUDA conflicts between backends (e.g. llama.cpp CUDA 13 vs TensorRT-LLM's CUDA requirement) and establishes the pattern for future per-extension runtime isolation. WSL2 adds unnecessary complexity and is not acceptable as a product dependency.

**Alternatives considered**:
- WSL2 sidecar path — rejected because WSL2 is not an acceptable product dependency; adds setup friction and operational complexity.
- Shared system Python — rejected because CUDA version conflicts between backends are inevitable without isolation.
- vllm-windows as second backend — noted as a future candidate (requires CUDA 12.4, Python 3.12 specifically) but TensorRT-LLM selected for v0 due to broader NVIDIA ecosystem integration.

---

## R-014: Managed embedded Python environments

**Decision**: Each Python-managed backend provisions its own isolated Python virtual environment with pinned dependencies. The `runtime.environment` manifest block declares requirements; the host provisions the environment.

**Rationale**: Backends have conflicting CUDA and Python package requirements. llama.cpp bundles its own CUDA runtime in binaries. TensorRT-LLM pins specific CUDA toolkit versions. Future backends (e.g. vllm-windows at CUDA 12.4) would add further conflicts. Per-backend isolation via managed venvs is the simplest reliable solution.

**Alternatives considered**:
- User-provided system Python — rejected because it pushes environment complexity onto the user and makes support impossible.
- Bundled Python runtime shipped with the extension — deferred because managed venv is simpler for v0 and achieves the same isolation.

---

## R-015: CUDA compatibility validation

**Decision**: Backend profiles declare their CUDA version requirement. The host validates compatibility at profile creation time and prevents simultaneous activation of conflicting CUDA profiles on the same GPU.

**Rationale**: Running two backends with different CUDA runtime requirements on the same GPU can cause driver conflicts and crashes. The host prevents this proactively rather than letting backends fail at runtime.

**Alternatives considered**:
- Full CUDA isolation per backend (each bundles its own CUDA libs) — deferred as overly complex for v0.
- Ignore conflicts; user responsibility — rejected because it produces opaque GPU-level crashes.

---

## R-006: Hugging Face integration

**Decision**: Use the official `huggingface_hub` Python package (`HfApi`, `hf_hub_download`, `snapshot_download`).

**Rationale**: The official client already provides exactly the surface the product needs. Re-implementing raw REST calls would duplicate behavior and increase maintenance.

**Alternatives considered**:
- Raw HTTP wrappers — rejected because they duplicate official client behavior.

---

## R-007: Model registry design

**Decision**: Add a Nexus-owned model registry layer on top of HF metadata and local paths. Store as spec-004 namespaced tables.

**Rationale**: The product needs backend compatibility hints, local install state, user labels, and verified-working metadata beyond what the HF cache provides.

**Alternatives considered**:
- Treat HF cache as sole source of truth — rejected because it is too low-level and lacks product-specific metadata.

---

## R-008: Chat and workflow relationship

**Decision**: Separate **interactive chat sessions** from **canonical workflow execution**, sharing backend profiles, models, threads, and artifacts.

**Rationale**: Interactive chat needs low-latency stateful UX. Workflows need reproducibility and run semantics. Forcing identical runtime paths would degrade one or both experiences.

**Alternatives considered**:
- Every interactive turn as a workflow run — rejected as too heavy for normal chat UX.
- Chat outside workflow system entirely — rejected because it breaks the platform thesis.

---

## R-009: RAG storage model

**Decision**: Host owns corpus metadata, chunk manifests, retrieval traces, and provenance. Extension owns chunking, embedding generation, retrieval execution, and context assembly.

**Rationale**: Preserves host authority and observability while letting the extension specialize LLM/RAG behavior. Retrieval traces as artifacts enables inspection and debugging.

**Alternatives considered**:
- Extension owns all retrieval state privately — rejected because it harms inspectability and interoperability with other extensions.

---

## R-010: Python SDK evolution

**Decision**: Expand the SDK with `ServiceWorker`, `ManagedProcess`, streaming abstractions, health reporting, and artifact I/O conveniences. Maintain backward compatibility with `BaseWorker`.

**Rationale**: The current stateless handler model is too narrow for service-style backends. The need is broader than just this extension.

**Alternatives considered**:
- Keep SDK minimal, hand-roll everything inside the extension — rejected because the patterns are reusable across future service-oriented extensions.

---

## R-011: Trust model for builtin extensions

**Decision**: Builtin extensions use the **same extension contract** as external extensions but ship with **pre-approved capabilities** declared in the manifest. The host grants these automatically without user prompts.

**Rationale**: Keeps the architecture uniform (one registry model, one validation pipeline, one lifecycle) while acknowledging that builtin extensions are trusted at build time. Avoids creating a separate "privileged extension" code path.

**Alternatives considered**:
- Elevated trust tier with distinct API surface — rejected because it fragments the extension architecture.
- Identical to external with user approval — rejected because prompting users to approve capabilities for a first-party shipped feature is poor UX.

---

## R-012: Storage mechanism

**Decision**: Use spec-004 extension storage contributions for all relational state. Use the filesystem for large binary assets (runtime binaries, model files, indexes).

**Rationale**: Spec 004 was designed precisely for this use case. It provides namespaced tables, host-governed migrations, and crash recovery. Binary assets are too large for SQLite and belong on the filesystem with manifest pointers.

**Alternatives considered**:
- Separate SQLite database per extension — rejected because spec 004 already solves namespace isolation within the shared database.
- All state in filesystem JSON files — rejected because it lacks queryability, atomicity, and the relational integrity needed for sessions/threads/messages.

---

## R-013: Streaming architecture

**Decision**: Token streaming uses the existing WebSocket event bus. The extension emits typed stream events (`chat.stream.delta`, `chat.stream.complete`, `chat.stream.error`) through the host event system.

**Rationale**: The host already has a WebSocket event stream to the frontend. Adding a second streaming channel would complicate the frontend and bypass host observability.

**Alternatives considered**:
- Direct WebSocket from frontend to backend runtime — rejected because it violates the "UI talks only to host" principle.
- SSE alongside existing WebSocket — rejected as unnecessary complexity when the event bus already supports the pattern.

---

## R-016: Extension self-sufficiency (host has no LLM knowledge)

**Decision**: ALL LLM-specific logic (backend adapters, chat executor, model registry, HF integration, RAG pipeline) lives inside the extension worker (Python). The host provides only generic infrastructure: binary installer, Python env provisioner, storage contributions, event bus. There is no `nexus-local-llm` Rust crate in the host.

**Rationale**: The core project principle is that extensions are self-sufficient. The host is a generic runtime — it should have zero knowledge of llama.cpp, TensorRT-LLM, Hugging Face, chat sessions, or any LLM concept. Putting domain logic in a host Rust crate violates extension boundaries, makes the host LLM-coupled, and prevents other extensions from reusing the same infrastructure patterns. The Python SDK v2 (`ServiceWorker`, `ManagedProcess`) provides everything the extension needs to manage backends, processes, streaming, and health autonomously.

**Alternatives considered**:
- Rust host crate with LLM adapters — rejected because it bakes LLM domain knowledge into the host, violating extension self-sufficiency.
- Hybrid with thin generic Rust crate — rejected because even "thin" host-side LLM logic creates coupling. The generic installer and env provisioner are sufficient host infrastructure.

---

## R-017: Generic host installer and env provisioner

**Decision**: The host provides two generic services available to any extension via the extension protocol:
1. **Generic binary installer**: download archive from URL → verify checksum → unpack to managed directory → validate binary exists
2. **Generic Python environment provisioner**: create isolated venv from `runtime.environment` manifest → install pinned deps → validate importability

**Rationale**: These are operational concerns (downloading, unpacking, venv management) that benefit from Rust-side system-level reliability (Windows path handling, process spawning, checksum verification). They are generic — not tied to any specific extension. Any extension that needs to manage binaries or Python environments can use them.

**Alternatives considered**:
- Extensions handle all installation themselves in Python — rejected because system-level operations (archive extraction, path normalization, Windows process groups) are more reliable in Rust.
- Full extension runtime management in host — rejected because it goes too far and creates domain coupling.
