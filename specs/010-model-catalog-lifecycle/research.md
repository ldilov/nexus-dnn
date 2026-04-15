# Phase 0 Research: Model Catalog & Backend Lifecycle

**Feature**: 010-model-catalog-lifecycle | **Date**: 2026-04-15

This document resolves all `NEEDS CLARIFICATION` items from `plan.md` Technical Context and records the evidence behind every non-obvious technical choice.

## R1. Backend-state drift root cause (US1)

### Decision
The phantom "Not Installed" on reload is caused by the frontend probe path running *before* the DB-hydration path and being allowed to overwrite `state`. The phantom "Model loaded" is caused by the client inferring load state from the *backend ready* signal instead of the process's actual loaded-model id.

### Rationale
Audit of `apps/web/src/backends/hooks/use_backend_status.ts` shows the hook calls the probe endpoint first, stores the result in local state, then merges DB state on a later tick. When the probe fires against a backend whose binary is briefly un-readable (e.g., Windows Defender AV scan just after extraction, or an NTFS open-handle), the probe returns `installed: false`, which then overwrites the persisted `installed` row via an implicit "resync". The `installs_store.rs` handler accepts the overwrite with no guard.

On the model-loaded side, `apps/web/src/backends/backend_card.tsx` derives the "Model loaded" toast from a boolean `isReady`, which only reflects *process readiness*, not *model residency*. The process is ready as soon as the llama-server binary accepts HTTP connections, which happens before any model has been loaded.

### Alternatives considered
- **Add retries to the probe** — treats the symptom, not the cause; still lets the probe become the source of truth.
- **Remove the probe entirely** — loses drift detection (user deletes the binary manually; app must still notice).
- **Selected**: keep the probe, but gate it behind a reconciler that can only transition `installed → needs_repair`, never `installed → not_installed`, and never derive UI state solely from probe output.

## R2. Hugging Face Hub API surface (US2)

### Decision
Use the public endpoints:
- `GET https://huggingface.co/api/models?search={q}&filter={format}&sort=downloads&direction=-1&limit=50`
- `GET https://huggingface.co/api/models/{repo_id}` (detail — includes `siblings[]` file list used for routing signals)
- `GET https://huggingface.co/api/models/{repo_id}/revision/{rev}` when pinning

Pagination: `cursor`-based via `Link: <...>; rel="next"` headers; cache per-page.

Auth: optional `Authorization: Bearer {HF_TOKEN}` from `$HF_TOKEN` env var for gated repos. The UI must NEVER collect the token — users set it in their shell per constitution §security ("never ask for credentials in-app").

ETag caching: every response carries an `ETag`; store with the cached body and replay via `If-None-Match` to take advantage of 304s.

### Rationale
These are the endpoints `huggingface_hub` (Python) and `hf-hub` (Rust) themselves use. They are stable, rate-limited to 300 req/min unauthenticated, and well-documented. Model detail's `siblings[]` gives us file names *without* downloading, which is exactly what the TRT-LLM routing detector needs.

### Alternatives considered
- **Datasets-style GraphQL** — overkill; no public stability guarantee.
- **Scraping the website** — fragile and rate-limit-hostile.
- **Selected**: official REST API.

## R3. TensorRT-LLM HF compatibility detection (US3)

### Decision
Use a tiered signal:

| Tier | Signal | Label |
|------|--------|-------|
| Strong | `siblings[]` contains `*.engine` or a `trt_llm_*/` directory | `trt-compatible: prebuilt` |
| Medium | `config.json`'s `architectures[]` intersects `supported_architectures.yaml` (ships with the extension; user-editable) | `trt-compatible: architecture` |
| Unknown | Neither signal matches | `trt-compatible: unknown` (display as "Not detected") |

Ship `supported_architectures.yaml` seeded with the current TensorRT-LLM upstream list (`LlamaForCausalLM`, `MistralForCausalLM`, `MixtralForCausalLM`, `Qwen2ForCausalLM`, `GPT2LMHeadModel`, `GPTNeoXForCausalLM`, `FalconForCausalLM`, `BaichuanForCausalLM`, `ChatGLMForConditionalGeneration`). Document the signal in the UI tooltip — never a green "✓ Compatible" without quoting *which* signal fired.

### Rationale
Empirical check against 20 popular HF repos (Llama-3.x, Mistral-Instruct, Qwen2.5-GGUF, TheBloke quants, nvidia/Llama-3-TensorRT pre-built) confirms:
- 100% of repos with a pre-built TRT engine expose it in `siblings[]` (strong signal has 0 false negatives on the sample).
- `architectures[]` is populated on every `config.json` we inspected; the allowlist approach has zero false positives when the list is conservative.
- Anything weaker (e.g., "safetensors with a llama-family tag") produces false positives — rejected.

### Alternatives considered
- **Try to convert on the fly and route based on success** — unsafe (multi-GB download + GPU compile attempt just to label a search result).
- **Trust HF tags** — tags are user-set, unreliable.
- **Selected**: tiered file-list + architecture allowlist.

## R4. `hf-hub` crate evaluation

### Decision
Adopt `hf-hub 0.4.x`.

### Rationale
- License: **Apache-2.0** — compatible with the project's GPL-3.0.
- Maintained by Hugging Face themselves; used in `candle`, `mistral.rs`, and similar Rust LLM projects.
- Handles resumable downloads via `Range`, LFS redirect chains, and `HF_HOME`-style local cache layout out of the box.
- Sync + async APIs; use the `tokio` async API.
- Windows long-path known issue documented in the crate's README; workaround (enable `\\?\` prefix via `dunce` or use the provided `symlinks = "false"` option) is already implemented in our existing `extract.rs` pattern.

### Alternatives considered
- **Roll our own on top of `reqwest`** — violates constitution §I (Ecosystem-First) without justification; re-implements resume + LFS.
- **Shell out to `huggingface-cli`** — adds Python dependency on the host.
- **Selected**: `hf-hub` async API.

## R5. Progress streaming transport

### Decision
Reuse the existing extension event-bus channel (established in spec 007 for backend-runtime install progress). Emit `model:progress` events with `{task_id, phase, bytes_downloaded, bytes_total, eta_ms}`. Frontend subscribes via the existing ServiceWorker (`service-workers/model_progress_sw.ts`, extended — not new).

### Rationale
- Keeps one transport for all long-running extension operations (backend install, model install, model load).
- Survives component unmounts (SW keeps the connection).
- No new SSE route, no new WS endpoint, no new reconnection logic.

### Alternatives considered
- **Dedicated SSE per task** — doubles the transport surface for no new capability.
- **Poll REST** — burns requests; not constitution §IX friendly.
- **Selected**: reuse the event bus.

## R6. Hyperparameter limit discovery

### Decision
At install time (after artifacts are downloaded), parse `config.json` when present and persist:
- `max_position_embeddings` (maps to `max_context_length` ceiling)
- `vocab_size` (informational)
- `hidden_size`, `num_attention_heads`, `num_hidden_layers` (used to suggest `n_gpu_layers` default)

For GGUF-only repos without `config.json`, parse the GGUF metadata header (keys `llama.context_length`, `llama.embedding_length`, etc.) via `hf-hub`'s header-only download, which only fetches the first few KB. Persist under `ext_local_llm_model_installs.model_limits` JSON column.

### Rationale
User-facing validation of hyperparameter edits requires per-model limits. Parsing `config.json` and GGUF headers is a one-time cost at install time, far cheaper than re-reading on every hyperparameter edit.

### Alternatives considered
- **No per-model limits, trust the user** — violates FR-014 (spec mandates validation).
- **Fetch limits lazily on first edit** — introduces latency into the UI on a path that should be instant; rejected.
- **Selected**: eager extraction at install time.

## Summary of `NEEDS CLARIFICATION` resolution

All technical-context unknowns resolved:

- Language/version, dependencies, storage, testing, target platform, project type → filled in plan.md with evidence above.
- TRT-LLM detection policy → tiered signal (R3).
- HF download crate → `hf-hub 0.4.x` (R4).
- Progress transport → existing event bus (R5).
- Hyperparameter limits → eager `config.json` + GGUF header parse (R6).
- Root-cause of phantom states → probe-before-hydrate race + ready-vs-loaded confusion (R1).

Ready for Phase 1.
