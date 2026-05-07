# Quickstart: llama.cpp Throughput Tier-1 Knobs

**Audience**: operators using the Local-LLM extension's ModelLoadDialog. **Spec**: [spec.md](./spec.md). **Plan**: [plan.md](./plan.md). **Success criteria**: SC-001 .. SC-011 in `spec.md`.

This walkthrough covers three primary scenarios. Each scenario lists the form steps, the resulting `llama-server` argv (visible in the host log if you tail it), and the operator-perceptible signal that confirms the knob is doing its job.

---

## Scenario A — Reuse KV cache for chat follow-up turns (SC-001, SC-005)

**When to use**: any chat thread where the system prompt + early turns are stable and you intend to send 2+ follow-up turns. Matches User Story 1.

**Excluded models**: any model whose `family_id` matches the known-broken matcher (Gemma 3 family, Qwen3-Next SWA hybrid). The form disables the toggle by default for these and offers an explicit override.

### Steps

1. Open the ModelLoadDialog (header → model button).
2. Pick a non-Gemma chat model (e.g. Llama-3.1-8B-Instruct).
3. Expand the **Memory** section.
4. Flip on **Reuse KV cache**. A "Min chunk" numeric input appears with default `256`. Leave it.
5. Click **Load**.

### Expected argv (suffix)

```text
… --cache-reuse 256 …
```

### Success signal

Send three sequential turns to the same thread (a fresh thread, then two follow-ups). The first turn's TTFT is unchanged from baseline; the second and third turns drop noticeably (≥ 30 % per SC-001) because llama-server skips re-prefilling the shared prefix.

### Gemma 3 / Qwen3-Next path

If the active model is Gemma 3 family or Qwen3-Next, the toggle is disabled by default with an inline amber chip explaining the upstream regression ([#21468](https://github.com/ggml-org/llama.cpp/issues/21468) / [#18497](https://github.com/ggml-org/llama.cpp/issues/18497)). Click the **enable anyway** affordance to unlock the toggle. When you load with the override on:

```text
… --cache-reuse 256 --swa-full …
```

`--swa-full` is auto-applied because the override implies you want cache-reuse despite the SWA regression; the inline note next to the override checkbox documents this.

---

## Scenario B — Persist prompt cache to RAM for RAG-style workloads (SC-002)

**When to use**: any workflow that sends repeated requests with a long stable system prompt and a varying user question (RAG, embedding-batched evaluation, prompt-shaped inference loops). Matches User Story 2.

### Steps

1. Open the ModelLoadDialog.
2. Pick any model (RAG-style workloads are model-agnostic for this knob).
3. Expand the **Performance / Advanced** collapsible details element.
4. Flip on **Persist prompt cache to RAM**. Two numeric inputs appear inline: "Cache size" (default `1024` MB) and "Checkpoint every" (default `8192` tokens). Leave the defaults for the first run.
5. Click **Load**.

### Expected argv (suffix)

```text
… --cram 1024 --checkpoint-every-n-tokens 8192 …
```

### Success signal

Send five consecutive requests that share a long system prompt. The first request's TTFT is similar to the no-cache baseline (the prefix has not been seen yet). The second request's TTFT drops sharply (≥ 50 % per SC-002, up to ~93 % per upstream benchmarks). Subsequent requests stay at the lower TTFT until the cache budget is exhausted.

### Tuning

- Bump **Cache size** to `4096` MB on workstations with > 32 GB system RAM if you have many distinct prefixes.
- Bump **Checkpoint every** to `16384` tokens if you have very long prefixes (32k+ context); keep `8192` for the typical RAG case.

---

## Scenario C — MoE offload for 100B+ models on consumer GPUs (SC-003, SC-004)

**When to use**: loading a Mixture-of-Experts model that does not fit fully in VRAM (GPT-OSS-120B, Qwen3-235B-A22B, Mixtral 8x22B, DeepSeek-V2). Matches User Story 3 + 4.

**Pre-requisite**: the model must be installed via the host's model-store install pipeline. The install pipeline reads the GGUF header and writes `is_moe` + `expert_layer_count` into the host row (per FR-005). Pre-existing artifacts are re-probed on first read after upgrade (FR-007).

### Steps (RTX 3090 example loading GPT-OSS-120B)

1. Open the ModelLoadDialog.
2. Pick GPT-OSS-120B from the list. Because `is_moe === true` and `expert_layer_count === 40` (the model has 40 transformer blocks with experts), the form renders a **MoE offload** slider in the **Performance / Advanced** section with `min=0, max=40, default=0`.
3. Adjacent to the slider you'll see a VRAM-budget read-out, e.g. `~ 65.0 GB / 24 GB GPU used` — this is the no-offload baseline; obviously over-budget.
4. Drag the slider to `28`. The read-out shrinks (the formula is approximate; the `~` prefix flags the estimate). The form auto-bumps `n_batch` and `n_ubatch` to `2048` (or your higher value, whichever is greater) and shows a "Bumped to 2048 for MoE offload" callout next to the batch controls.
5. Click **Load**.

### Expected argv (suffix)

```text
… --n-cpu-moe 28 --batch-size 2048 --ubatch-size 2048 …
```

### Success signal

The host log shows `llama-server` accepting the load. The first inference produces a non-zero token-per-second stream (per SC-003). Without the auto-bumped batch sizes, prefill would silently collapse to slow CPU rates because of the `GGML_OP_OFFLOAD_MIN_BATCH=32` interaction with `--n-cpu-moe > 0` — the form hides this footgun.

### Slider tuning

- **RTX 3090 (24 GB)**: try `28` for GPT-OSS-120B as a starting point; `32` for Qwen3-235B-A22B.
- **RTX 4090 (24 GB)**: try `16` for GPT-OSS-120B; `24` for Qwen3-235B-A22B.
- **48 GB+ workstation card**: full GPU offload (`0`) often fits; the slider is informational.

### Negative path: non-MoE model

Load a dense model (Llama-3.1-8B-Instruct, Mistral-7B). The form does NOT render the MoE offload slider (per SC-004). The presence of the slider is a clean function of the `is_moe` boolean from the AvailableModel DTO.

---

## Scenario D — Pick a sampler preset (SC-011)

**When to use**: tuning generation quality without reading the upstream sampler docs. Matches User Story 5.

### Steps

1. Open the ModelLoadDialog.
2. Expand the **Performance / Advanced** section, scroll to the new **Sampler quality** group.
3. Click one of the three preset chips:
   - **Chat (default)** — defaults; clears DRY and min-p.
   - **Code & factual** — clears DRY, sets `min_p = 0.10`, clamps `top_k` to `40`, drops temperature to `0.2`.
   - **Creative** — sets DRY (multiplier `0.8`, base `1.75`, allowed-length `2`), `min_p = 0.02`, `top_k = 40`, temperature `1.0`.
4. (Optional) Manually adjust any field. The chip stays highlighted with a "modified" dot.
5. Click **Load**.

### Expected argv (suffix — Creative preset)

```text
… --min-p 0.02 --dry-multiplier 0.8 --dry-base 1.75 --dry-allowed-length 2 …
```

### Re-clicking a modified chip

If you click the same chip again while it shows the modified dot, a confirmation dialog appears: "Re-apply Creative preset? This will discard your manual edits." Confirm to reset; cancel to keep your edits.

---

## Scenario E — Counter-intuitive pitfall warnings (SC-008, SC-009, SC-010)

The form surfaces six pitfall warnings inline at the moment of input (FR-026 .. FR-030). You won't trigger them in normal use; they're guardrails for non-obvious upstream behaviour.

| Trigger | What you see | What you do |
|---|---|---|
| Gemma 3 model + `flash_attn=true` + `cache_type_k=q8_0` | Amber chip near KV controls: "Flash Attention + Q8 KV is known to collapse Gemma 3 GPU utilization. Recommend FP16 KV." | Click **Force FP16 KV** to set both KV types to `fp16`. |
| Type `0` into `top_k` | Form clamps to `40` and shows a transient info chip explaining the slowdown ([#15223](https://github.com/ggml-org/llama.cpp/issues/15223)). | Nothing — clamp is automatic. To override below 40, flip the explicit "I know what I'm doing" toggle. |
| `n_parallel > 1` | Yellow info chip: "Each slot reserves a full KV cache. n_parallel > 1 is for multi-user serving — not real concurrent batching for single-user chat." | Informational only. Drop it back to `1` unless you're hosting multiple users. |
| Cache-reuse override on Gemma 3 / Qwen3-Next | Inline note next to override checkbox: "--swa-full will be added automatically to mitigate the SWA regression on this model family." | Nothing — the form auto-applies the flag. Per SC-010. |
| `n_gpu_layers === 0` AND `n_batch > 1024` | Amber chip below batch controls: "CPU-only workloads regress above batch size 1024 ([#6075](https://github.com/ggml-org/llama.cpp/issues/6075))." | Lower `n_batch` unless you have profiled otherwise. |

---

## Verifying success criteria from this walkthrough

| SC | Verification |
|---|---|
| SC-001 (cache-reuse TTFT cut) | Scenario A success signal — three-turn TTFT comparison with toggle off vs on. |
| SC-002 (cram TTFT cut) | Scenario B success signal — five-request comparison with toggle off vs on. |
| SC-003 (MoE on consumer GPU) | Scenario C success signal — first inference produces non-zero tok/s. |
| SC-004 (slider hidden on dense models) | Scenario C negative path. |
| SC-005 (Gemma 3 cache-reuse safety) | Scenario A Gemma 3 path. |
| SC-006 (boundary discipline) | Reviewer runs the three grep commands listed in spec User Story 7. |
| SC-007 (tests pass) | `cargo test --workspace` + `pnpm vitest run` green. |
| SC-008 (Gemma 3 + flash + q8 warning) | Scenario E first row. |
| SC-009 (top_k=0 clamp) | Scenario E second row. |
| SC-010 (auto --swa-full) | Scenario A Gemma 3 path argv inspection. |
| SC-011 (preset chip one-click) | Scenario D. |
