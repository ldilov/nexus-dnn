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
