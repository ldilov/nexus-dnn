# nexus.local-llm

Builtin extension for local LLM inference: chat, embeddings, RAG, and recipe/workflow orchestration. The extension is a lease consumer against host-owned runtimes (llama.cpp today; extension-private runtimes a later scope).

## Spec 024 — Rust worker port (2026-04)

The Python `ServiceWorker` is superseded by a compiled Rust sidecar at [`crates/nexus-local-llm-worker`](../../../crates/nexus-local-llm-worker/). See [spec 024](../../../specs/024-local-llm-rust-port/) for the full design.

- `runtime.family` in `manifest.yaml` is now `native`; `runtime.entrypoint` points at the compiled worker binary (`bin/nexus-local-llm-worker${exe_suffix}`). Python fields removed.
- Extension no longer spawns `llama-server`. For host-registered runtimes (llama.cpp), the extension calls `host.runtimes.acquire_lease(...)` and proxies OpenAI-compatible HTTP to `lease.channel.base_url`. The host spawns, supervises, and tears down the runtime child.
- Chat session, RAG corpus, and migration SQL (migrations `001`–`005`) are preserved unchanged; no user-data migration required.
- Zero Python runtime in the shipped artifact.

The Python worker tree remains in-tree for one minor release as reference and will be removed by a follow-up commit.

## Spec 011 changes

This extension no longer owns the runtime install lifecycle. Following [spec 011](../../../specs/011-host-runtime-pool/spec.md), the host crate `nexus-backend-runtimes` owns:

- llama.cpp / TensorRT-LLM binary install, validation, repair, uninstall
- Process supervision and channel allocation
- Reserved-flag enforcement at spawn time
- The shared `host_runtime_installs` table (so multiple extensions can declare a dependency on a single install)

This extension owns:

- Model download and registry (`worker/models/`)
- Hyperparameter validation against model limits (`worker/models/hyperparameters.py`)
- Backend routing for an HF repo (`worker/models/router.py`)
- Chat session, thread, message persistence
- The chat / RAG operators and recipes

## Runtime dependency declaration

The `manifest.yaml` declares which host-managed runtimes this extension needs:

```yaml
runtime_dependencies:
  - family: "llama.cpp"
    version: ">=b4000"
    acceleration:
      - "cpu"
      - "cuda12"
      - "cuda13"
```

At enable time the host resolves this against `host_runtime_installs` and refuses to enable the extension when the requirement cannot be met. Operators install the runtime via the top-level Backends panel; once installed it serves every extension declaring a matching `runtime_dependencies` entry.

## Worker module map

| Module | Responsibility |
|---|---|
| `worker/models/router.py` | Tiered backend routing — GGUF → llamacpp; `*.engine` → trt-prebuilt; arch allowlist → trt-architecture; else `NoRoute` |
| `worker/models/installer.py` | Plans an HF model install, parses `config.json` for `max_position_embeddings` etc., commits to `ext_local_llm_model_installs` |
| `worker/models/hyperparameters.py` | Validates a profile against model limits (`temperature ∈ (0, 2]`, `n_gpu_layers ≤ num_layers`, etc.); raises `HyperparametersOutOfRange` |
| `worker/models/registry.py` | In-memory model registry hydrated from extension storage |
| `worker/methods/runtime.py` | Legacy worker-managed runtime install methods (deprecated; use host `/api/v1/backends/...` instead) |
| `worker/methods/profile.py` | Backend profile lifecycle |
| `worker/methods/lifecycle.py` | Worker readiness + shutdown |

## Storage

Migrations under `storage/migrations/` create namespaced `ext_local_llm_*` tables:

- `001_backend_and_models.sql` — backend profiles + model installs
- `002_chat_sessions.sql` — sessions + threads + messages
- `003_rag.sql` — RAG embedding + retrieval state
- `004_run_history.sql` — past run records
- `005_profile_expansion.sql` — extended hyperparameter columns
- `006_model_hyperparameters.sql` — model-limits cache (spec 010)

The pre-spec-011 `ext_local_llm_runtime_installs` table is migrated by the host's `migrate_from_legacy` runner and then renamed to `_migrated_008`. Do not write to it from extension code.

## Tests

Worker-side tests live alongside the modules they cover. Run with the standard nexus-dnn worker harness; pure-Python modules (`router`, `hyperparameters`) are also unit-testable in isolation with `pytest worker/`.
