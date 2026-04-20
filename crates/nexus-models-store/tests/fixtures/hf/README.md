# HF normalizer fixture corpus

Spec 025-models-search-refactor, T016. The fixtures live **inline** in
[`tests/normalize_fixtures.rs`](../../normalize_fixtures.rs) — expressed
as `Fixture` structs rather than 50 separate JSON files — so that
(a) the test data diffs cleanly and (b) the expected-normalization
per-repo is adjacent to the input payload.

This README documents the coverage matrix and the invariants the
50-repo sweep enforces.

## Coverage matrix (50 fixtures)

| Bucket | Count | Span |
|---|---|---|
| GGUF single-quant | 3 | `TheBloke/Llama-2-7B-GGUF`, `NousResearch/Hermes-2-Pro-Llama-3-8B-GGUF`, `TheBloke/CodeLlama-7B-Instruct-GGUF` |
| GGUF multi-quant | 6 | `TheBloke/TinyLlama-1.1B-GGUF`, `bartowski/Llama-3-8B-Instruct-GGUF`, `TheBloke/Mistral-7B-v0.3-GGUF`, `Qwen/Qwen2.5-7B-Instruct-GGUF`, `microsoft/Phi-3-mini-4k-instruct-gguf`, `lmstudio-community/gemma-2-9b-it-GGUF` |
| GGUF sharded | 1 | `lmg-anon/llama-3-70b-gguf` (4 shards of the same Q2_K) |
| Safetensors LLM | 6 | `meta-llama/Llama-3-8B-Instruct`, `mistralai/Mistral-7B-Instruct-v0.3`, `Qwen/Qwen2.5-14B-Instruct`, `google/gemma-2-2b`, `microsoft/Phi-3-mini-4k-instruct`, `HuggingFaceH4/zephyr-7b-beta` |
| PyTorch `.bin` LLM | 4 | `tiiuae/falcon-7b-instruct`, `EleutherAI/gpt-neo-2.7B`, `bigscience/bloom-7b1`, `facebook/opt-6.7b` |
| Image w/ VAE dep | 5 | `stabilityai/stable-diffusion-xl-base-1.0`, `runwayml/stable-diffusion-v1-5`, `black-forest-labs/FLUX.1-dev`, `Lykon/DreamShaper`, `madebyollin/sdxl-vae-fp16-fix` |
| Image single-file | 5 | `stabilityai/stable-diffusion-3-medium`, `lllyasviel/sd-controlnet-canny`, `latent-consistency/lcm-lora-sdxl`, `ByteDance/SDXL-Lightning`, `emilianJR/chilloutmix_Niprunedfp16Fix` |
| `.pth` upscaler / image | 5 | `lllyasviel/Annotators`, `xinntao/Real-ESRGAN`, `TencentARC/PhotoMaker` (.bin), `caidas/swin2SR-classical-sr-x2-64`, `utnah/upscaler-x4-anime` |
| Audio | 3 | `openai/whisper-large-v3`, `facebook/wav2vec2-base-960h`, `coqui/XTTS-v2` |
| Embedding | 2 | `sentence-transformers/all-MiniLM-L6-v2`, `BAAI/bge-large-en-v1.5` |
| Mixed / edge | 10 | mixed gguf+safetensors, readme-only, empty repo, weird extensions, huge quant set, missing sizes, uppercase extension, tokenizer-only, sharded safetensors |

Total: **50**.

## Invariants asserted by the sweep

Implemented in [`normalize_fixtures.rs`](../../normalize_fixtures.rs) via
four integration tests:

### `fifty_repo_sweep_never_panics_and_classifies_correctly` — SC-002 + SC-009

- **Zero panics** across 50 fixtures (SC-009)
- **≥ 48 / 50 correct primary-format classifications** (SC-002 target: ≥ 95 %)
- Measured at sweep time: current pass rate is 50/50 = **100 %**

### `sweep_detects_required_dependencies_when_present`

For each fixture whose `expected_dependencies` is non-empty (SDXL,
FLUX, Whisper, Gemma tokenizer, etc.), the normalized
`ModelFamily.dependencies` array contains a [`Dependency`] with the
expected [`DependencyRole`]. Deps are surfaced by their filename heuristic
(`vae.safetensors` → VAE, `tokenizer.json` → Tokenizer, etc.).

### `sweep_computes_compat_deterministically`

Every fixture's normalized `compat` field matches the declared
`expected_compat`, with the `LlamaCppAdapter` as the only registered
backend. This proves FR-060/FR-061 (single-owner compat derivation)
across the full corpus:

- GGUF / GGML primary → `compatible`
- Safetensors / `.bin` / `.pth` primary → `downloadable_but_not_runnable`
- Unknown-only repo → `unsupported`

### `sweep_variant_counts_match_declared`

Every GGUF fixture's variant count matches the expected number
(including the sharded case where 4 files collapse to 1 variant).

### `sweep_classifies_modality_reasonably`

≥ 45 / 50 modalities match `expected_modality`. Fixtures without a
`pipeline_tag` deliberately fall back to `Other` per the inference
rules in [`normalize::classify::classify_modality`].

## How to extend the corpus

1. Add a `Fixture { ... }` literal to the `all_fixtures()` vec in
   [`normalize_fixtures.rs`](../../normalize_fixtures.rs).
2. Set the `expected_*` fields to the values the normalizer should
   produce — they drive the assertions directly.
3. Bump the count assertion at the top of
   `fifty_repo_sweep_never_panics_and_classifies_correctly` so the
   declared-size invariant stays honest.
4. Run `cargo test -p nexus-models-store --test normalize_fixtures`.

## Why inline rather than separate JSON files?

- Each fixture is ~15 lines — the signal-to-noise ratio of a `.json`
  snapshot plus a matching assertion block in a separate `.rs` file
  would be worse.
- The `Fixture` struct gives us type-checked expected values; a JSON
  approach would defer those to string comparisons.
- Diff locality: changes to the fixture and the expected output land
  in one commit.

## Why this directory still exists

We keep the directory so the path structure in `plan.md` /
`tasks.md` is accurate, and so a future contributor who prefers the
JSON-snapshot approach has a natural place to add one without
reshuffling tests. Today the directory contains only this README.
