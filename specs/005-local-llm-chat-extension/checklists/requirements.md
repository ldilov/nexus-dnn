# Requirements Checklist: Builtin Local LLM Chat & RAG Extension

**Spec**: 005

---

## Phase 1 — Foundations

- [ ] Builtin extension classification works (`available_builtin` state)
- [ ] Pre-approved capabilities granted automatically
- [ ] On-demand activation creates storage tables
- [ ] Backend-neutral adapter trait defined and testable
- [ ] Backend profile CRUD APIs functional
- [ ] Runtime install and model install data models persisted
- [ ] Python SDK v2 `ServiceWorker` and `ManagedProcess` functional
- [ ] All state survives host restart

## Phase 2 — llama.cpp

- [ ] OS/hardware probe detects Windows x64, NVIDIA GPU, CUDA
- [ ] Version manifest selects correct release asset
- [ ] Runtime download, unpack, and validation complete on Windows CPU
- [ ] Runtime download, unpack, and validation complete on Windows CUDA
- [ ] `llama-server` starts, binds port, serves health endpoint
- [ ] Health and metrics collection works
- [ ] GGUF model validation works (file exists, size > 0, extension check)
- [ ] Failure classification produces structured diagnostics
- [ ] Backend profile state machine transitions correctly

## Phase 3 — Hugging Face + Chat

- [ ] HF search returns model results with metadata
- [ ] File inventory shows GGUF files with sizes and hints
- [ ] Targeted GGUF download works with progress events
- [ ] Download cancellation cleans up properly
- [ ] Model appears in registry after download
- [ ] Chat session creates with backend profile binding
- [ ] User message persisted, assistant message created
- [ ] Token streaming works end-to-end (backend -> host -> WebSocket -> UI)
- [ ] Stop generation preserves partial output
- [ ] Retry creates new message with lineage
- [ ] Sessions and threads persist across restart

## Phase 4 — Workflow/Recipe

- [ ] `llm.chat.turn` operator registered and executable
- [ ] Local Chat recipe compiles to valid workflow
- [ ] Recipe runs end-to-end through host run engine
- [ ] Run produces typed artifacts with provenance
- [ ] Workflow loads with inactive extension (operators show unresolved)
- [ ] "Save as workflow" from interactive chat works

## Phase 5 — RAG

- [ ] Corpus metadata CRUD works
- [ ] Document ingestion and text extraction works
- [ ] Chunking produces chunk manifest artifact
- [ ] Embedding generation works via backend adapter
- [ ] Retrieval returns ranked chunks with scores
- [ ] Retrieval trace persisted as typed artifact
- [ ] RAG recipe runs end-to-end

## Phase 6 — TensorRT-LLM

- [ ] Environment probe detects Linux/Windows, GPU, CUDA version (no WSL2)
- [ ] Managed embedded Python venv creation with pinned deps works on Linux
- [ ] Managed embedded Python venv creation with pinned deps works on Windows
- [ ] `trtllm-serve` starts and serves health endpoint on Linux
- [ ] `trtllm-serve` starts and serves health endpoint on Windows
- [ ] Normalized metrics mapping works
- [ ] CUDA compatibility validation prevents conflicting concurrent profiles
- [ ] `runtime.environment` manifest block parsed and provisions environments correctly

## Cross-Cutting

- [ ] Backend failures never crash the Rust host (NFR-001)
- [ ] HF tokens never appear in logs (NFR-008)
- [ ] Feature degrades gracefully when backend unavailable (NFR-010)
- [ ] Token streaming latency < 100ms (NFR-011)
- [ ] All contracts versioned (NFR-003)
