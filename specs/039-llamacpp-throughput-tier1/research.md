# Spec 039 — Deep Research Provenance

This document preserves the deep-research findings that justify the scope of `spec.md`. Generated 2026-05-07 via the `/deep-research` skill across three parallel research agents covering (a) llama.cpp core throughput knobs, (b) sampler + structured-output knobs, (c) real-world benchmarks + recipes. 40+ sources reviewed.

## Tier ranking that drives this spec

The deep-research synthesis assigned each candidate knob to one of three tiers based on impact-per-line-of-code and the user-perceived benefit of surfacing it in the form. Spec 039 implements **Tier 1 in full**, plus the **two Tier-2 sampler-quality items that pass a "real benefit only" filter**, plus **inline warnings for the six in-scope counter-intuitive pitfalls**.

### Tier 1 — Implemented in spec 039

- `--cache-reuse N` — multi-turn chat + RAG TTFT win via KV-shifting. **HIGH** impact, off by default upstream.
- `--cram MB` + `--checkpoint-every-n-tokens N` — host-memory prompt caching. Up to **~93 % TTFT reduction** on cached requests per upstream benchmarks.
- `--n-cpu-moe N` — MoE-aware offload. The 2025 release that finally made GPT-OSS-120B / Qwen3-235B usable on consumer GPUs. Hidden footgun: `GGML_OP_OFFLOAD_MIN_BATCH=32` interaction with `--n-cpu-moe > 0` collapses prefill unless `--batch-size`/`--ubatch-size` are bumped to ≥ 2048.

### Tier 2 — In scope under "real benefit only" filter

- **DRY (Don't Repeat Yourself)** — `--dry-multiplier`, `--dry-base`, `--dry-allowed-length`, `--dry-penalty-last-n`. Universally recommended over `--repeat-penalty` for chat. Penalises only actual repeating sequences, not natural recurrence.
- **min-p** — `--min-p`. Modern recommended replacement for top-p. 2025 sampler guides recommend it as the primary nucleus filter.
- **Profile presets** (Chat / Code & factual / Creative) — frontend-only state machine that pre-fills sampler combos from a curated value-map.

### Tier 2 — Out of scope (niche / subjective)

- XTC (`--xtc-probability`, `--xtc-threshold`) — creative writing only, hurts code/factual.
- top-nσ — temperature-invariant; useful for reasoning models at high temp but model-specific.
- DynaTemp, Mirostat, logit-bias, samplers chain reorder, typical-p — niche or subjective; deferred to a future quality-only spec.

### Tier 3 — Out of scope

- Multi-GPU knobs (`--main-gpu`, `--tensor-split`, `--split-mode tensor`) — wait for host-side multi-GPU enumeration.
- Reasoning-model knobs (`--reasoning-format`, `--reasoning-budget`).
- Speculative decoding (`--spec-draft-model` and family) — also known to regress on small-active MoE.
- LoRA (`--lora`, per-request adapter selection) — needs dedicated UX.
- HTTP threads / NUMA / CPU affinity / polling.

## Counter-intuitive pitfalls (the seven gotchas)

Documented in the deep-research report and translated into the form's behaviour. **Six are in-scope as inline warnings or auto-applied mitigations**; the seventh (containerized Metal) is environmental.

| # | Pitfall | Spec response |
|---|---------|---------------|
| 1 | **Flash-attn + KV-q8_0 collapses Gemma 3** — drops GPU utilization to 20-30 %. | FR-026: amber warning chip + one-click "Force FP16 KV" button on the form. |
| 2 | **`--top-k 0` causes ~2-5× slowdown** ([#15223](https://github.com/ggml-org/llama.cpp/issues/15223)). | FR-027: form clamps `top_k` minimum to 40 by default; below 40 requires explicit "I know what I'm doing" toggle. |
| 3 | **`--parallel > 1` actively hurts single-user chat** — slots reserve KV memory you can't reclaim. | FR-028: yellow info chip explaining slot KV cost when `n_parallel > 1`. |
| 4 | **Speculative decoding regresses on small-active MoE** (Qwen3-A3B etc.) — every config tested negative on RTX 3090. | Out of scope here (spec decoding itself is deferred). Future spec-decoding spec owns the corresponding warning. |
| 5 | **`--cache-reuse` broken for Gemma + Qwen3-Next unless `--swa-full` is set** ([#21468](https://github.com/ggml-org/llama.cpp/issues/21468), [#18497](https://github.com/ggml-org/llama.cpp/issues/18497)). | FR-029: when the operator overrides the cache-reuse safety lock on those families, the spawned argv ALSO includes `--swa-full`. New `swa_full: Option<bool>` field on `RuntimeTuning`. |
| 6 | **`--batch-size > 1024` regresses on CPU-only workloads** ([#6075](https://github.com/ggml-org/llama.cpp/issues/6075)). | FR-030: amber chip when `n_gpu_layers === 0` AND `n_batch > 1024`. Informational; does not auto-clamp. |
| 7 | **Containerized Metal is ~40 % slower than bare metal** even with GPU passthrough. | Out of scope — environmental, requires runtime-environment probe. Documented here for awareness. |

## Source map

The full deep-research report (3 parallel agents + synthesis) was generated 2026-05-07. Key sources cited inline in the report:

- [llama-server README (master)](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md) — flag reference
- [Doctor-Shotgun: MoE CPU+GPU offload guide](https://huggingface.co/blog/Doctor-Shotgun/llamacpp-moe-offload-guide) — `--n-cpu-moe` recipes + `--batch-size` interaction
- [Discussion #20574: Host-memory prompt caching](https://github.com/ggml-org/llama.cpp/discussions/20574) — `--cram` benchmarks (93 % TTFT cut)
- [Discussion #13606: KV cache reuse tutorial](https://github.com/ggml-org/llama.cpp/discussions/13606) — `--cache-reuse` mechanics
- [PR #6839: DRY sampler](https://github.com/ggml-org/llama.cpp/pull/6839) — DRY rationale + recommended defaults
- [smcleod.net: LLM Sampling Parameters Guide (2025)](https://smcleod.net/2025/04/llm-sampling-parameters-guide/) — min-p > top-p; preset recommendations
- [OmniForge: Five config flags slowing your LLM](https://omniforge.online/blog/your-local-llm-is-slow-because-of-five-config-flags) — Gemma 3 + flash-attn + Q8 KV regression
- [Issue #15223: top-k 0 slowdown](https://github.com/ggml-org/llama.cpp/issues/15223)
- [Issue #6075: batch-size regression on CPU-only](https://github.com/ggml-org/llama.cpp/issues/6075)
- [Issue #21468: Gemma cache-reuse regression](https://github.com/ggml-org/llama.cpp/issues/21468) | [Issue #18497: Qwen3-Next SWA cache-reuse](https://github.com/ggml-org/llama.cpp/issues/18497)
- [HackMD: Spec-decode MoE regression on Qwen3.6-35B-A3B](https://hackmd.io/ODXuOQNzSiyUITz7g9mtBw)
- [Issue #4055: Multi-GPU split discussion](https://github.com/ggml-org/llama.cpp/issues/4055) (deferred to future spec)
- [PR #10994: Per-request LoRA selection](https://github.com/ggml-org/llama.cpp/pull/10994) (deferred)

## Phase 0 — Plan-time resolutions (2026-05-07)

The `/speckit-plan` invocation surfaced nine open questions at the boundary between the spec text and the actual codebase. Each is resolved below; the resolutions are reflected in `plan.md` § Technical Context, § Project Structure, and `data-model.md`.

### R1 — Migration belongs to host's `migrations/`, not extension's

**Decision**: New migration is `migrations/021_installed_artifact_moe_metadata.sql` (host-owned, top-level `migrations/` folder).

**Rationale**: `model_store_installed_artifacts` was introduced by host migration `014_model_store_installed_artifacts.sql` and extended by `015_installed_artifact_extraction_metadata.sql` (spec 028). It is a host-owned table consumed today only by the local-llm extension but designed to serve any model-loading extension generically. Per Principle XIII.4, only `ext_<id_slug>__<table>` tables live in extension migrations. The columns added here (`is_moe`, `expert_layer_count`) are derived from generic GGUF metadata, not from extension-specific business logic, so they belong on the host-owned row.

**Alternatives considered**:
- Putting the migration under `extensions/builtin/local-llm/storage/migrations/` — rejected because (a) it would mean an extension migration writing into a host-owned table (XIII.4 violation), (b) it forecloses on future extensions consuming the same fields, (c) it confuses the migration ID space (extension's own series is at 008; the host's is at 020).

### R2 — GGUF MoE detection key

**Decision**: Read `<arch>.expert_count` from the GGUF header. Non-zero → `is_moe = true`. If absent, fall back to architecture-name string match against a curated list (`mixtral`, `qwen2moe`, `qwen3moe`, `deepseek2`, `dbrx`, `gptoss`, `glm4_moe`). If neither indicates MoE, write `is_moe = NULL` (frontend treats `NULL` as "unknown" → fallback path per FR-014).

**Rationale**: The `expert_count` key is the canonical indicator across modern MoE GGUFs. Architecture-name fallback handles GGUFs that omit `expert_count`. The curated list is small (≤ 10 names) and lives next to the GGUF reader; adding a new MoE family is a one-line change.

**Alternatives considered**:
- Pattern-matching against tensor names (`*.ffn_gate_inp.weight` etc.) — rejected because the reader would need to walk the tensor list, which is more expensive and the metadata-key path is reliable for files produced by `convert_hf_to_gguf.py` post-2025.
- Treating `expert_used_count` as the trigger — rejected because that key represents active-experts-per-token (e.g. 2 for Mixtral 8x7B), not whether the model is MoE.

### R3 — `expert_layer_count` semantics + computation

**Decision**: `expert_layer_count` is the number of transformer blocks containing MoE experts. In practice, when `is_moe = true` and `layer_count` is known (already extracted by spec 028), set `expert_layer_count = layer_count`. The field is `NULL` when `is_moe = false` OR when `layer_count` is also `NULL`.

**Rationale**: Mainstream MoE GGUFs (Mixtral, GPT-OSS, Qwen3-MoE, DeepSeek-V2, DBRX) apply experts to every transformer block. Mixed dense / MoE blocks (Granite-MoE, some DeepSeek variants) exist but are rare; the spec's FR-014 fallback (slider max=64 with "exact layer count unknown" note) covers them. A sharper estimator (counting non-zero `expert_feed_forward_length` blocks) is deferred to a future spec if operator-reported breakage materialises.

### R4 — `runtime_to_args` helper extraction

**Decision**: Extract `append_throughput_args(&RuntimeTuning, &mut Vec<String>)`, `append_sampler_args(...)`, and `append_mitigation_args(...)`. The top-level `runtime_to_args` becomes a sequence of helper calls. Each helper ≤ 25 lines per Principle III.

**Rationale**: The existing `runtime_to_args` is ~120 lines covering 13 fields. Adding 10 new fields without restructuring would push the function past Principle III's 25-line soft limit for any single logical block. Helper extraction is mechanical, preserves CQS (each helper mutates the out-param `Vec<String>` and returns `()`), and keeps each emission group co-located with its tests.

**Alternatives considered**: Inline emission in one big function — rejected on Principle III; a fluent builder API — rejected on YAGNI (the function is called once per load, by one caller, with one input shape).

### R5 — Form re-render budget on chip click

**Decision**: Sampler-preset chip click writes ~6 form-state fields in a single `setForm({...form, ...preset})` call. Budget < 1 ms confirmed by existing form vitest harness.

**Rationale**: React 19 batches the state update; chip click is one paint cycle. The `presetModified` flag is computed via `useMemo` from `(form, activePreset)` so it does not require a separate state-write.

### R6 — VRAM-budget formula constants

**Decision**: `moeFractionOfModel = 0.85` for MoE models (constant in `vram_budget.ts`, doc-commented with citation). Formula: `gpuBytesUsed ≈ modelSizeBytes × (nGpuLayers / totalLayers) × (1 − (nCpuMoe / max(1, expertLayerCount)) × 0.85)`. Returns `gpuBytesRemaining = hostVramBytes − gpuBytesUsed` when `hostVramBytes` is known; `null` otherwise.

**Rationale**: Published Mixtral and GPT-OSS-120B parameter-count breakdowns show ~85 % of weights are in expert FFN tensors (the part that moves to CPU when `--n-cpu-moe > 0`). The formula is approximate by design — the read-out copy uses a `~` prefix and the HelpTooltip says "Estimated; not a driver-level measurement." Golden tests pin three (input → output) cases representing typical operator scenarios.

**Alternatives considered**: Real driver probe (CUDA / Metal `cudaMemGetInfo`-equivalent) — rejected as out of scope; would require a host endpoint, per-platform code, and a non-trivial frontend-to-host roundtrip on slider drag.

### R7 — Idempotent re-probe for pre-upgrade rows

**Decision**: On read of a `model_store_installed_artifacts` row with `is_moe IS NULL` AND `extraction_status = 'success'`, the host's `nexus-models-store` schedules a one-shot async re-probe via `nexus-model-metadata`; the result is written back; subsequent reads hit the cached values.

**Rationale**: FR-007 mandates idempotent re-probe. The existing spec-028 codepath already supports lazy first-read extraction (ref. `extraction_status` column added in migration 015), so this is an additive use of the same mechanism — no new infrastructure.

### R8 — `--swa-full` is a flag, not a permission

**Decision**: Add `swa_full: Option<bool>` to `RuntimeTuning`. `runtime_to_args` emits `--swa-full` when `swa_full == Some(true)`. No host-runtime permission, no new endpoint.

**Rationale**: `--swa-full` is a generic llama-server CLI flag at the same layer as `--cache-reuse` and `--cram`. The form sets it to `Some(true)` only via the cache-reuse override path on known-broken families (FR-029). All other paths leave it `None`.

### R9 — `swa_full` persistence is derived, not standalone

**Decision**: The form does NOT expose a standalone `swa_full` toggle. Persistence ties it to the cache-reuse override: `lastTuningByFamily[familyId].cache_reuse_override === true` AND `KnownBrokenModelMatcher(familyId).broken === true` implies `swa_full = true`. Re-opening the dialog for the same family replays the override state and the form re-derives `swa_full`.

**Rationale**: POLA — operators who hit the override path see one consequence (the inline "auto-applied --swa-full" note) and one persisted state (the override flag). Adding a separate `swa_full` toggle would surface a flag that's only useful in conjunction with cache-reuse override, violating Principle II's KISS clause.

## Open follow-ups (not blocking Phase 1)

- **VRAM-budget formula refinement**: future spec may add a real driver probe via a generic `/api/host/gpu_facts` endpoint. Out of scope for spec 039.
- **Mixed dense/MoE expert-layer-count**: if operator-reported breakage on Granite-MoE-style architectures materialises, sharpen `expert_layer_count` extraction to count non-zero `expert_feed_forward_length` blocks. Tracked as a follow-up; the FR-014 fallback path (slider max=64, "exact layer count unknown") handles the failure mode meanwhile.
- **Containerized-Metal warning**: noted Out of Scope; documented here for awareness in case a future spec introduces a runtime-environment probe.

