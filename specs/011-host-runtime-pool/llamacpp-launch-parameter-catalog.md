# llama.cpp Launch Parameter Catalog for Nexus

**Snapshot date**: 2026-04-15  
**Upstream basis**: `ggml-org/llama.cpp` `tools/server/README.md` plus the upstream function-calling and multimodal docs reviewed the same day.  
**Scope**: `llama-server` launch surface for managed GGUF serving inside Nexus.  
**Catalog size**: 213 documented launch parameters (84 common, 34 sampling, 95 server-specific).

## How to read this catalog

This file is **descriptive**, not normative. Nexus should still allow unknown future `llama.cpp` flags to pass through unless they collide with host-owned policy.

### Policy legend

- **managed-spawn-disallowed** — not appropriate for a long-running host-managed backend process; usually exits immediately or performs one-shot inspection.
- **host-injected** — the host owns the final value and injects it.
- **host-governed** — the setting affects security, observability, network surface, or host policy and should not be passed through blindly.
- **extension-passthrough** — extension-controlled; host forwards as-is.

### Recommended Nexus handling

1. Parse raw argv/env only enough to detect reserved collisions.
2. Reject managed-spawn-disallowed flags in spawn requests.
3. Reject or override host-injected / host-governed settings according to host policy.
4. Pass everything else through unchanged.

## Notes about llama.cpp in Nexus

- The managed serving binary should be `llama-server`.
- `llama.cpp` currently exposes both OpenAI-compatible and native server endpoints, with optional Anthropic-compatible messages routing.
- Multimodal serving is available through `llama-server` when the appropriate mmproj configuration is present.
- Function calling and tool use are supported, but built-in filesystem tools and the MCP proxy are security-sensitive and should stay host-governed.


## Common params

| Flag(s) | Policy | Purpose | Key details | Nexus note |
|---|---|---|---|---|
| `-h`<br/>`--help`<br/>`--usage` | managed-spawn-disallowed | Prints usage and exit. | — | Reject during managed spawn. |
| `--version` | managed-spawn-disallowed | Shows version and build info. | — | Reject during managed spawn. |
| `--license` | managed-spawn-disallowed | Shows source code license and dependencies. | — | Reject during managed spawn. |
| `-cl`<br/>`--cache-list` | managed-spawn-disallowed | Shows list of models in cache. | — | Reject during managed spawn. |
| `--completion-bash` | managed-spawn-disallowed | Prints source-able bash completion script for llama.cpp. | — | Reject during managed spawn. |
| `-t`<br/>`--threads` | extension-passthrough | Sets CPU threads to use during generation. | default: -1<br/>env: LLAMA_ARG_THREADS | Forward as raw argv/env from the extension. |
| `-tb`<br/>`--threads-batch` | extension-passthrough | Sets threads to use during batch and prompt processing. | default: same as --threads | Forward as raw argv/env from the extension. |
| `-C`<br/>`--cpu-mask` | extension-passthrough | CPU affinity mask: arbitrarily long hex. Complements cpu-range. | default: "" | Forward as raw argv/env from the extension. |
| `-Cr`<br/>`--cpu-range` | extension-passthrough | Range of CPUs for affinity. Complements --cpu-mask. | — | Forward as raw argv/env from the extension. |
| `--cpu-strict` | extension-passthrough | Uses strict CPU placement. | default: 0 | Forward as raw argv/env from the extension. |
| `--prio` | extension-passthrough | Configures process/thread priority : low(-1), normal(0), medium(1), high(2), realtime(3). | default: 0 | Forward as raw argv/env from the extension. |
| `--poll` | extension-passthrough | Uses polling level to wait for work (0 - no polling, default: 50). | — | Forward as raw argv/env from the extension. |
| `-Cb`<br/>`--cpu-mask-batch` | extension-passthrough | CPU affinity mask: arbitrarily long hex. Complements cpu-range-batch. | default: same as --cpu-mask | Forward as raw argv/env from the extension. |
| `-Crb`<br/>`--cpu-range-batch` | extension-passthrough | Ranges of CPUs for affinity. Complements --cpu-mask-batch. | — | Forward as raw argv/env from the extension. |
| `--cpu-strict-batch` | extension-passthrough | Uses strict CPU placement. | default: same as --cpu-strict | Forward as raw argv/env from the extension. |
| `--prio-batch` | extension-passthrough | Configures process/thread priority : 0-normal, 1-medium, 2-high, 3-realtime. | default: 0 | Forward as raw argv/env from the extension. |
| `--poll-batch` | extension-passthrough | Uses polling to wait for work. | default: same as --poll | Forward as raw argv/env from the extension. |
| `-c`<br/>`--ctx-size` | extension-passthrough | Sets the prompt context. | default: 0, 0 = loaded from model<br/>env: LLAMA_ARG_CTX_SIZE | Forward as raw argv/env from the extension. |
| `-n`<br/>`--predict`<br/>`--n-predict` | extension-passthrough | Sets tokens to predict. | default: -1, -1 = infinity<br/>env: LLAMA_ARG_N_PREDICT | Forward as raw argv/env from the extension. |
| `-b`<br/>`--batch-size` | extension-passthrough | Sets the logical maximum batch size. | default: 2048<br/>env: LLAMA_ARG_BATCH | Forward as raw argv/env from the extension. |
| `-ub`<br/>`--ubatch-size` | extension-passthrough | Sets the physical maximum batch size. | default: 512<br/>env: LLAMA_ARG_UBATCH | Forward as raw argv/env from the extension. |
| `--keep` | extension-passthrough | Sets tokens to keep from the initial prompt. | default: 0, -1 = all | Forward as raw argv/env from the extension. |
| `--swa-full` | extension-passthrough | Uses full-size SWA cache. | default: false<br/>env: LLAMA_ARG_SWA_FULL<br/>(more info) | Forward as raw argv/env from the extension. |
| `-fa`<br/>`--flash-attn` | extension-passthrough | Configures Flash Attention use ('on', 'off', or 'auto', default: 'auto'). | env: LLAMA_ARG_FLASH_ATTN | Forward as raw argv/env from the extension. |
| `--perf`<br/>`--no-perf` | extension-passthrough | Toggles whether to enable internal libllama performance timings. | default: false<br/>env: LLAMA_ARG_PERF | Forward as raw argv/env from the extension. |
| `-e`<br/>`--escape`<br/>`--no-escape` | extension-passthrough | Toggles whether to process escapes sequences (\n, \r, \t, \', \", \\). | default: true | Forward as raw argv/env from the extension. |
| `--rope-scaling` | extension-passthrough | RoPE frequency scaling method, defaults to linear unless specified by the model. | env: LLAMA_ARG_ROPE_SCALING_TYPE | Forward as raw argv/env from the extension. |
| `--rope-scale` | extension-passthrough | RoPE context scaling factor, expands context by a factor of N. | env: LLAMA_ARG_ROPE_SCALE | Forward as raw argv/env from the extension. |
| `--rope-freq-base` | extension-passthrough | RoPE base frequency, used by NTK-aware scaling. | default: loaded from model<br/>env: LLAMA_ARG_ROPE_FREQ_BASE | Forward as raw argv/env from the extension. |
| `--rope-freq-scale` | extension-passthrough | RoPE frequency scaling factor, expands context by a factor of 1/N. | env: LLAMA_ARG_ROPE_FREQ_SCALE | Forward as raw argv/env from the extension. |
| `--yarn-orig-ctx` | extension-passthrough | YaRN: original context size of model. | default: 0 = model training context size<br/>env: LLAMA_ARG_YARN_ORIG_CTX | Forward as raw argv/env from the extension. |
| `--yarn-ext-factor` | extension-passthrough | YaRN: extrapolation mix factor. | default: -1.00, 0.0 = full interpolation<br/>env: LLAMA_ARG_YARN_EXT_FACTOR | Forward as raw argv/env from the extension. |
| `--yarn-attn-factor` | extension-passthrough | YaRN: scale sqrt(t) or attention magnitude. | default: -1.00<br/>env: LLAMA_ARG_YARN_ATTN_FACTOR | Forward as raw argv/env from the extension. |
| `--yarn-beta-slow` | extension-passthrough | YaRN: high correction dim or alpha. | default: -1.00<br/>env: LLAMA_ARG_YARN_BETA_SLOW | Forward as raw argv/env from the extension. |
| `--yarn-beta-fast` | extension-passthrough | YaRN: low correction dim or beta. | default: -1.00<br/>env: LLAMA_ARG_YARN_BETA_FAST | Forward as raw argv/env from the extension. |
| `-kvo`<br/>`--kv-offload`<br/>`-nkvo`<br/>`--no-kv-offload` | extension-passthrough | Toggles whether to enable KV cache offloading. | default: enabled<br/>env: LLAMA_ARG_KV_OFFLOAD | Forward as raw argv/env from the extension. |
| `--repack`<br/>`-nr`<br/>`--no-repack` | extension-passthrough | Toggles whether to enable weight repacking. | default: enabled<br/>env: LLAMA_ARG_REPACK | Forward as raw argv/env from the extension. |
| `--no-host` | extension-passthrough | Bypass host buffer allowing extra buffers to be used. | env: LLAMA_ARG_NO_HOST | Forward as raw argv/env from the extension. |
| `-ctk`<br/>`--cache-type-k` | extension-passthrough | KV cache data type for K. | default: f16<br/>values: f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1<br/>env: LLAMA_ARG_CACHE_TYPE_K | Forward as raw argv/env from the extension. |
| `-ctv`<br/>`--cache-type-v` | extension-passthrough | KV cache data type for V. | default: f16<br/>values: f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1<br/>env: LLAMA_ARG_CACHE_TYPE_V | Forward as raw argv/env from the extension. |
| `-dt`<br/>`--defrag-thold` | extension-passthrough | KV cache defragmentation threshold (DEPRECATED). | env: LLAMA_ARG_DEFRAG_THOLD | Forward as raw argv/env from the extension. |
| `--mlock` | extension-passthrough | Forces system to keep model in RAM rather than swapping or compressing. | env: LLAMA_ARG_MLOCK | Forward as raw argv/env from the extension. |
| `--mmap`<br/>`--no-mmap` | extension-passthrough | Toggles whether to memory-map model. (if mmap disabled, slower load but may reduce pageouts if not using mlock). | default: enabled<br/>env: LLAMA_ARG_MMAP | Forward as raw argv/env from the extension. |
| `-dio`<br/>`--direct-io`<br/>`-ndio`<br/>`--no-direct-io` | extension-passthrough | Uses DirectIO if available. | default: disabled<br/>env: LLAMA_ARG_DIO | Forward as raw argv/env from the extension. |
| `--numa` | extension-passthrough | Applies optimizations that optimizations that help on some NUMA systems. | env: LLAMA_ARG_NUMA<br/>- distribute: spread execution evenly over all nodes; - isolate: only spawn threads on CPUs on the node that execution started on | Forward as raw argv/env from the extension. |
| `-dev`<br/>`--device` | extension-passthrough | Comma-separated list of devices to use for offloading (none = don't offload). | env: LLAMA_ARG_DEVICE<br/>use --list-devices to see a list of available devices | Forward as raw argv/env from the extension. |
| `--list-devices` | managed-spawn-disallowed | Prints list of available devices and exit. | — | Reject during managed spawn. |
| `-ot`<br/>`--override-tensor` | extension-passthrough | Override tensor buffer type. | env: LLAMA_ARG_OVERRIDE_TENSOR | Forward as raw argv/env from the extension. |
| `-cmoe`<br/>`--cpu-moe` | extension-passthrough | Keep all Mixture of Experts (MoE) weights in the CPU. | env: LLAMA_ARG_CPU_MOE | Forward as raw argv/env from the extension. |
| `-ncmoe`<br/>`--n-cpu-moe` | extension-passthrough | Keep the Mixture of Experts (MoE) weights of the first N layers in the CPU. | env: LLAMA_ARG_N_CPU_MOE | Forward as raw argv/env from the extension. |
| `-ngl`<br/>`--gpu-layers`<br/>`--n-gpu-layers` | extension-passthrough | Caps layers to store in VRAM, either an exact number, 'auto', or 'all'. | default: auto<br/>env: LLAMA_ARG_N_GPU_LAYERS | Forward as raw argv/env from the extension. |
| `-sm`<br/>`--split-mode` | extension-passthrough | How to split the model across multiple GPUs, one of:. | env: LLAMA_ARG_SPLIT_MODE<br/>- none: use one GPU only; - layer (default): split layers and KV across GPUs | Forward as raw argv/env from the extension. |
| `-ts`<br/>`--tensor-split` | extension-passthrough | Fraction of the model to offload to each GPU, comma-separated list of proportions, e.g. 3,1. | env: LLAMA_ARG_TENSOR_SPLIT | Forward as raw argv/env from the extension. |
| `-mg`<br/>`--main-gpu` | extension-passthrough | The GPU to use for the model (with split-mode = none), or for intermediate results and KV (with split-mode = row). | default: 0<br/>env: LLAMA_ARG_MAIN_GPU | Forward as raw argv/env from the extension. |
| `-fit`<br/>`--fit` | extension-passthrough | Toggles whether to adjust unset arguments to fit in device memory ('on' or 'off', default: 'on'). | env: LLAMA_ARG_FIT | Forward as raw argv/env from the extension. |
| `-fitt`<br/>`--fit-target` | extension-passthrough | Target margin per device for --fit, comma-separated list of values, single value is broadcast across all devices, default: 1024. | env: LLAMA_ARG_FIT_TARGET | Forward as raw argv/env from the extension. |
| `-fitc`<br/>`--fit-ctx` | extension-passthrough | Minimum ctx size that can be set by --fit option, default: 4096. | env: LLAMA_ARG_FIT_CTX | Forward as raw argv/env from the extension. |
| `--check-tensors` | extension-passthrough | Check model tensor data for invalid values. | default: false | Forward as raw argv/env from the extension. |
| `--override-kv` | extension-passthrough | Advanced option to override model metadata by key. to specify multiple overrides, either use comma-separated values. | types: int, float, bool, str. example: --override-kv tokenizer.ggml.add_bos_token=bool:false,tokenizer.ggml.add_eos_token=bool:false | Forward as raw argv/env from the extension. |
| `--op-offload`<br/>`--no-op-offload` | extension-passthrough | Toggles whether to offload host tensor operations to device. | default: true | Forward as raw argv/env from the extension. |
| `--lora` | extension-passthrough | Specifies file path for LoRA adapter (use comma-separated values to load multiple adapters). | — | Forward as raw argv/env from the extension. |
| `--lora-scaled` | extension-passthrough | Specifies file path for LoRA adapter with user defined scaling (format: FNAME:SCALE,...). | note: use comma-separated values | Forward as raw argv/env from the extension. |
| `--control-vector` | extension-passthrough | Adds a control vector. | note: use comma-separated values to add multiple control vectors | Forward as raw argv/env from the extension. |
| `--control-vector-scaled` | extension-passthrough | Adds a control vector with user defined scaling SCALE. | note: use comma-separated values (format: FNAME:SCALE,...) | Forward as raw argv/env from the extension. |
| `--control-vector-layer-range` | extension-passthrough | Layer range to apply the control vector(s) to, start and end inclusive. | — | Forward as raw argv/env from the extension. |
| `-m`<br/>`--model` | extension-passthrough | Specifies local model path. | env: LLAMA_ARG_MODEL | Forward as raw argv/env from the extension. |
| `-mu`<br/>`--model-url` | extension-passthrough | Specifies remote model download URL. | default: unused<br/>env: LLAMA_ARG_MODEL_URL | Forward as raw argv/env from the extension. |
| `-dr`<br/>`--docker-repo` | extension-passthrough | Docker Hub model repository. repo is optional, default to ai/. quant is optional, default to :latest. | default: unused<br/>env: LLAMA_ARG_DOCKER_REPO<br/>example: gemma3 | Forward as raw argv/env from the extension. |
| `-hf`<br/>`-hfr`<br/>`--hf-repo` | extension-passthrough | Hugging Face model repository; quant is optional, case-insensitive, default to Q4_K_M, or falls back to the first file in the repo if Q4_K_M doesn't exist. | default: unused<br/>env: LLAMA_ARG_HF_REPO<br/>mmproj is also downloaded automatically if available. to disable, add --no-mmproj; example: ggml-org/GLM-4.7-Flash-GGUF:Q4_K_M | Forward as raw argv/env from the extension. |
| `-hfd`<br/>`-hfrd`<br/>`--hf-repo-draft` | extension-passthrough | Same as --hf-repo, but for the draft model. | default: unused<br/>env: LLAMA_ARG_HFD_REPO | Forward as raw argv/env from the extension. |
| `-hff`<br/>`--hf-file` | extension-passthrough | Hugging Face model file. If specified, it will override the quant in --hf-repo. | default: unused<br/>env: LLAMA_ARG_HF_FILE | Forward as raw argv/env from the extension. |
| `-hfv`<br/>`-hfrv`<br/>`--hf-repo-v` | extension-passthrough | Hugging Face model repository for the vocoder model. | default: unused<br/>env: LLAMA_ARG_HF_REPO_V | Forward as raw argv/env from the extension. |
| `-hffv`<br/>`--hf-file-v` | extension-passthrough | Hugging Face model file for the vocoder model. | default: unused<br/>env: LLAMA_ARG_HF_FILE_V | Forward as raw argv/env from the extension. |
| `-hft`<br/>`--hf-token` | extension-passthrough | Hugging Face access token. | default: value from HF_TOKEN environment variable<br/>env: HF_TOKEN | Forward as raw argv/env from the extension. |
| `--log-disable` | host-governed | Log disable. | — | Gate behind host policy or typed host settings. |
| `--log-file` | host-governed | Log to file. | env: LLAMA_LOG_FILE | Gate behind host policy or typed host settings. |
| `--log-colors` | host-governed | Configures colored logging ('on', 'off', or 'auto', default: 'auto'). | env: LLAMA_LOG_COLORS<br/>'auto' enables colors when output is to a terminal | Gate behind host policy or typed host settings. |
| `-v`<br/>`--verbose`<br/>`--log-verbose` | host-governed | Configures verbosity level to infinity (i.e. log all messages, useful for debugging). | — | Gate behind host policy or typed host settings. |
| `--offline` | extension-passthrough | Runs in offline mode: forces use of cache, prevents network access. | env: LLAMA_OFFLINE | Forward as raw argv/env from the extension. |
| `-lv`<br/>`--verbosity`<br/>`--log-verbosity` | host-governed | Configures the verbosity threshold. Messages with a higher verbosity will be ignored. Values:. | default: 3<br/>env: LLAMA_LOG_VERBOSITY<br/>- 0: generic output; - 1: error | Gate behind host policy or typed host settings. |
| `--log-prefix` | host-governed | Enable prefix in log messages. | env: LLAMA_LOG_PREFIX | Gate behind host policy or typed host settings. |
| `--log-timestamps` | host-governed | Enable timestamps in log messages. | env: LLAMA_LOG_TIMESTAMPS | Gate behind host policy or typed host settings. |
| `-ctkd`<br/>`--cache-type-k-draft` | extension-passthrough | KV cache data type for K for the draft model. | default: f16<br/>values: f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1<br/>env: LLAMA_ARG_CACHE_TYPE_K_DRAFT | Forward as raw argv/env from the extension. |
| `-ctvd`<br/>`--cache-type-v-draft` | extension-passthrough | KV cache data type for V for the draft model. | default: f16<br/>values: f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1<br/>env: LLAMA_ARG_CACHE_TYPE_V_DRAFT | Forward as raw argv/env from the extension. |

## Sampling params

| Flag(s) | Policy | Purpose | Key details | Nexus note |
|---|---|---|---|---|
| `--samplers` | extension-passthrough | Samplers that will be used for generation in the order, separated by ';'. | default: penalties;dry;top_n_sigma;top_k;typ_p;top_p;min_p;xtc;temperature | Forward as raw argv/env from the extension. |
| `-s`<br/>`--seed` | extension-passthrough | RNG seed. | default: -1, use random seed for -1 | Forward as raw argv/env from the extension. |
| `--sampler-seq`<br/>`--sampling-seq` | extension-passthrough | Simplified sequence for samplers that will be used. | default: edskypmxt | Forward as raw argv/env from the extension. |
| `--ignore-eos` | extension-passthrough | Ignore end of stream token and continue generating (implies --logit-bias EOS-inf). | — | Forward as raw argv/env from the extension. |
| `--temp`<br/>`--temperature` | extension-passthrough | Temperature. | default: 0.80 | Forward as raw argv/env from the extension. |
| `--top-k` | extension-passthrough | Top-k sampling. | default: 40, 0 = disabled<br/>env: LLAMA_ARG_TOP_K | Forward as raw argv/env from the extension. |
| `--top-p` | extension-passthrough | Top-p sampling. | default: 0.95, 1.0 = disabled | Forward as raw argv/env from the extension. |
| `--min-p` | extension-passthrough | Min-p sampling. | default: 0.05, 0.0 = disabled | Forward as raw argv/env from the extension. |
| `--top-nsigma`<br/>`--top-n-sigma` | extension-passthrough | Top-n-sigma sampling. | default: -1.00, -1.0 = disabled | Forward as raw argv/env from the extension. |
| `--xtc-probability` | extension-passthrough | Xtc probability. | default: 0.00, 0.0 = disabled | Forward as raw argv/env from the extension. |
| `--xtc-threshold` | extension-passthrough | Xtc threshold. | default: 0.10, 1.0 = disabled | Forward as raw argv/env from the extension. |
| `--typical`<br/>`--typical-p` | extension-passthrough | Locally typical sampling, parameter p. | default: 1.00, 1.0 = disabled | Forward as raw argv/env from the extension. |
| `--repeat-last-n` | extension-passthrough | Last n tokens to consider for penalize. | default: 64, 0 = disabled, -1 = ctx_size | Forward as raw argv/env from the extension. |
| `--repeat-penalty` | extension-passthrough | Penalize repeat sequence of tokens. | default: 1.00, 1.0 = disabled | Forward as raw argv/env from the extension. |
| `--presence-penalty` | extension-passthrough | Repeat alpha presence penalty. | default: 0.00, 0.0 = disabled | Forward as raw argv/env from the extension. |
| `--frequency-penalty` | extension-passthrough | Repeat alpha frequency penalty. | default: 0.00, 0.0 = disabled | Forward as raw argv/env from the extension. |
| `--dry-multiplier` | extension-passthrough | Configures DRY sampling multiplier. | default: 0.00, 0.0 = disabled | Forward as raw argv/env from the extension. |
| `--dry-base` | extension-passthrough | Configures DRY sampling base value. | default: 1.75 | Forward as raw argv/env from the extension. |
| `--dry-allowed-length` | extension-passthrough | Configures allowed length for DRY sampling. | default: 2 | Forward as raw argv/env from the extension. |
| `--dry-penalty-last-n` | extension-passthrough | Configures DRY penalty for the last n tokens. | default: -1, 0 = disable, -1 = context size | Forward as raw argv/env from the extension. |
| `--dry-sequence-breaker` | extension-passthrough | Adds sequence breaker for DRY sampling, clearing out default breakers ('\n', ':', '"', '*') in the process; use "none" to not use any sequence breakers. | — | Forward as raw argv/env from the extension. |
| `--adaptive-target` | extension-passthrough | Adaptive-p: select tokens near this probability (valid range 0.0 to 1.0; negative = disabled). | default: -1.00<br/>(more info) | Forward as raw argv/env from the extension. |
| `--adaptive-decay` | extension-passthrough | Adaptive-p: decay rate for target adaptation over time. lower values are more reactive, higher values are more stable. | default: 0.90<br/>(valid range 0.0 to 0.99) | Forward as raw argv/env from the extension. |
| `--dynatemp-range` | extension-passthrough | Dynamic temperature range. | default: 0.00, 0.0 = disabled | Forward as raw argv/env from the extension. |
| `--dynatemp-exp` | extension-passthrough | Dynamic temperature exponent. | default: 1.00 | Forward as raw argv/env from the extension. |
| `--mirostat` | extension-passthrough | Uses Mirostat sampling. | default: 0, 0 = disabled, 1 = Mirostat, 2 = Mirostat 2.0<br/>Top K, Nucleus and Locally Typical samplers are ignored if used. | Forward as raw argv/env from the extension. |
| `--mirostat-lr` | extension-passthrough | Mirostat learning rate, parameter eta. | default: 0.10 | Forward as raw argv/env from the extension. |
| `--mirostat-ent` | extension-passthrough | Mirostat target entropy, parameter tau. | default: 5.00 | Forward as raw argv/env from the extension. |
| `-l`<br/>`--logit-bias` | extension-passthrough | Modifies the likelihood of token appearing in the completion. | i.e. --logit-bias 15043+1 to increase likelihood of token ' Hello'; or --logit-bias 15043-1 to decrease likelihood of token ' Hello' | Forward as raw argv/env from the extension. |
| `--grammar` | extension-passthrough | BNF-like grammar to constrain generations (see samples in grammars/ dir). | — | Forward as raw argv/env from the extension. |
| `--grammar-file` | extension-passthrough | File to read grammar from. | — | Forward as raw argv/env from the extension. |
| `-j`<br/>`--json-schema` | extension-passthrough | JSON schema to constrain generations (https://json-schema.org/), e.g. {} for any JSON object. | For schemas w/ external $refs, use --grammar + example/json_schema_to_grammar.py instead | Forward as raw argv/env from the extension. |
| `-jf`<br/>`--json-schema-file` | extension-passthrough | File containing a JSON schema to constrain generations (https://json-schema.org/), e.g. {} for any JSON object. | For schemas w/ external $refs, use --grammar + example/json_schema_to_grammar.py instead | Forward as raw argv/env from the extension. |
| `-bs`<br/>`--backend-sampling` | extension-passthrough | Enable backend sampling (experimental). | default: disabled<br/>env: LLAMA_ARG_BACKEND_SAMPLING | Forward as raw argv/env from the extension. |

## Server-specific params

| Flag(s) | Policy | Purpose | Key details | Nexus note |
|---|---|---|---|---|
| `-lcs`<br/>`--lookup-cache-static` | extension-passthrough | Specifies file path for static lookup cache to use for lookup decoding (not updated by generation). | — | Forward as raw argv/env from the extension. |
| `-lcd`<br/>`--lookup-cache-dynamic` | extension-passthrough | Specifies file path for dynamic lookup cache to use for lookup decoding (updated by generation). | — | Forward as raw argv/env from the extension. |
| `-ctxcp`<br/>`--ctx-checkpoints`<br/>`--swa-checkpoints` | extension-passthrough | Max number of context checkpoints to create per slot. | default: 32<br/>env: LLAMA_ARG_CTX_CHECKPOINTS | Forward as raw argv/env from the extension. |
| `-cpent`<br/>`--checkpoint-every-n-tokens` | extension-passthrough | Create a checkpoint every n tokens during prefill (processing), -1 to disable. | default: 8192<br/>env: LLAMA_ARG_CHECKPOINT_EVERY_NT | Forward as raw argv/env from the extension. |
| `-cram`<br/>`--cache-ram` | extension-passthrough | Configures the maximum cache size in MiB. | default: 8192, -1 - no limit, 0 - disable<br/>env: LLAMA_ARG_CACHE_RAM | Forward as raw argv/env from the extension. |
| `-kvu`<br/>`--kv-unified`<br/>`-no-kvu`<br/>`--no-kv-unified` | extension-passthrough | Uses single unified KV buffer shared across all sequences. | default: enabled if number of slots is auto<br/>env: LLAMA_ARG_KV_UNIFIED | Forward as raw argv/env from the extension. |
| `--clear-idle`<br/>`--no-clear-idle` | extension-passthrough | Save and clear idle slots on new task. | default: enabled, requires unified KV and cache-ram<br/>env: LLAMA_ARG_CLEAR_IDLE | Forward as raw argv/env from the extension. |
| `--context-shift`<br/>`--no-context-shift` | extension-passthrough | Toggles whether to use context shift on infinite text generation. | default: disabled<br/>env: LLAMA_ARG_CONTEXT_SHIFT | Forward as raw argv/env from the extension. |
| `-r`<br/>`--reverse-prompt` | extension-passthrough | Halt generation at PROMPT, return control in interactive mode. | — | Forward as raw argv/env from the extension. |
| `-sp`<br/>`--special` | extension-passthrough | Special tokens output enabled. | default: false | Forward as raw argv/env from the extension. |
| `--warmup`<br/>`--no-warmup` | extension-passthrough | Toggles whether to perform warmup with an empty run. | default: enabled | Forward as raw argv/env from the extension. |
| `--spm-infill` | extension-passthrough | Uses Suffix/Prefix/Middle pattern for infill (instead of Prefix/Suffix/Middle) as some models prefer this. | default: disabled | Forward as raw argv/env from the extension. |
| `--pooling` | extension-passthrough | Pooling type for embeddings, use model default if unspecified. | env: LLAMA_ARG_POOLING | Forward as raw argv/env from the extension. |
| `-np`<br/>`--parallel` | extension-passthrough | Sets server slots. | default: -1, -1 = auto<br/>env: LLAMA_ARG_N_PARALLEL | Forward as raw argv/env from the extension. |
| `-cb`<br/>`--cont-batching`<br/>`-nocb`<br/>`--no-cont-batching` | extension-passthrough | Toggles whether to enable continuous batching (a.k.a dynamic batching). | default: enabled<br/>env: LLAMA_ARG_CONT_BATCHING | Forward as raw argv/env from the extension. |
| `-mm`<br/>`--mmproj` | extension-passthrough | Specifies file path for a multimodal projector file. see tools/mtmd/README.md. | env: LLAMA_ARG_MMPROJ<br/>note: if -hf is used, this argument can be omitted | Forward as raw argv/env from the extension. |
| `-mmu`<br/>`--mmproj-url` | extension-passthrough | Specifies URL for a multimodal projector file. see tools/mtmd/README.md. | env: LLAMA_ARG_MMPROJ_URL | Forward as raw argv/env from the extension. |
| `--mmproj-auto`<br/>`--no-mmproj`<br/>`--no-mmproj-auto` | extension-passthrough | Toggles whether to use multimodal projector file (if available), useful when using -hf. | default: enabled<br/>env: LLAMA_ARG_MMPROJ_AUTO | Forward as raw argv/env from the extension. |
| `--mmproj-offload`<br/>`--no-mmproj-offload` | extension-passthrough | Toggles whether to enable GPU offloading for multimodal projector. | default: enabled<br/>env: LLAMA_ARG_MMPROJ_OFFLOAD | Forward as raw argv/env from the extension. |
| `--image-min-tokens` | extension-passthrough | Sets minimum tokens each image can take, only used by vision models with dynamic resolution. | default: read from model<br/>env: LLAMA_ARG_IMAGE_MIN_TOKENS | Forward as raw argv/env from the extension. |
| `--image-max-tokens` | extension-passthrough | Caps tokens each image can take, only used by vision models with dynamic resolution. | default: read from model<br/>env: LLAMA_ARG_IMAGE_MAX_TOKENS | Forward as raw argv/env from the extension. |
| `-otd`<br/>`--override-tensor-draft` | extension-passthrough | Override tensor buffer type for draft model. | — | Forward as raw argv/env from the extension. |
| `-cmoed`<br/>`--cpu-moe-draft` | extension-passthrough | Keep all Mixture of Experts (MoE) weights in the CPU for the draft model. | env: LLAMA_ARG_CPU_MOE_DRAFT | Forward as raw argv/env from the extension. |
| `-ncmoed`<br/>`--n-cpu-moe-draft` | extension-passthrough | Keep the Mixture of Experts (MoE) weights of the first N layers in the CPU for the draft model. | env: LLAMA_ARG_N_CPU_MOE_DRAFT | Forward as raw argv/env from the extension. |
| `-a`<br/>`--alias` | extension-passthrough | Configures model name aliases, comma-separated (to be used by API). | env: LLAMA_ARG_ALIAS | Forward as raw argv/env from the extension. |
| `--tags` | extension-passthrough | Configures model tags, comma-separated (informational, not used for routing). | env: LLAMA_ARG_TAGS | Forward as raw argv/env from the extension. |
| `--host` | host-injected | Ip address to listen, or bind to an UNIX socket if the address ends with .sock. | default: 127.0.0.1<br/>env: LLAMA_ARG_HOST | Host supplies the final value. |
| `--port` | host-injected | Port to listen. | default: 8080<br/>env: LLAMA_ARG_PORT | Host supplies the final value. |
| `--reuse-port` | host-injected | Allow multiple sockets to bind to the same port. | default: disabled<br/>env: LLAMA_ARG_REUSE_PORT | Host supplies the final value. |
| `--path` | host-governed | Specifies file path for serve static files from (default: ). | env: LLAMA_ARG_STATIC_PATH | Gate behind host policy or typed host settings. |
| `--api-prefix` | host-governed | Prefix path the server serves from, without the trailing slash (default: ). | env: LLAMA_ARG_API_PREFIX | Gate behind host policy or typed host settings. |
| `--webui-config` | host-governed | JSON that provides default WebUI settings (overrides WebUI defaults). | env: LLAMA_ARG_WEBUI_CONFIG | Gate behind host policy or typed host settings. |
| `--webui-config-file` | host-governed | JSON file that provides default WebUI settings (overrides WebUI defaults). | env: LLAMA_ARG_WEBUI_CONFIG_FILE | Gate behind host policy or typed host settings. |
| `--webui-mcp-proxy`<br/>`--no-webui-mcp-proxy` | host-governed | Experimental: whether to enable MCP CORS proxy - do not enable in untrusted environments. | default: disabled<br/>env: LLAMA_ARG_WEBUI_MCP_PROXY | Gate behind host policy or typed host settings. |
| `--tools` | host-governed | Experimental: whether to enable built-in tools for AI agents - do not enable in untrusted environments. | default: no tools<br/>env: LLAMA_ARG_TOOLS<br/>specify "all" to enable all tools; available tools: read_file, file_glob_search, grep_search, exec_shell_command, write_file, edit_file, apply_diff | Gate behind host policy or typed host settings. |
| `--webui`<br/>`--no-webui` | host-governed | Toggles whether to enable the Web UI. | default: enabled<br/>env: LLAMA_ARG_WEBUI | Gate behind host policy or typed host settings. |
| `--embedding`<br/>`--embeddings` | extension-passthrough | Restrict to only support embedding use case; use only with dedicated embedding models. | default: disabled<br/>env: LLAMA_ARG_EMBEDDINGS | Forward as raw argv/env from the extension. |
| `--rerank`<br/>`--reranking` | extension-passthrough | Enable reranking endpoint on server. | default: disabled<br/>env: LLAMA_ARG_RERANKING | Forward as raw argv/env from the extension. |
| `--api-key` | host-governed | API key to use for authentication, multiple keys can be provided as a comma-separated list. | default: none<br/>env: LLAMA_API_KEY | Gate behind host policy or typed host settings. |
| `--api-key-file` | host-governed | Specifies file path for file containing API keys. | default: none | Gate behind host policy or typed host settings. |
| `--ssl-key-file` | host-governed | Specifies file path for file a PEM-encoded SSL private key. | env: LLAMA_ARG_SSL_KEY_FILE | Gate behind host policy or typed host settings. |
| `--ssl-cert-file` | host-governed | Specifies file path for file a PEM-encoded SSL certificate. | env: LLAMA_ARG_SSL_CERT_FILE | Gate behind host policy or typed host settings. |
| `--chat-template-kwargs` | extension-passthrough | Sets additional params for the json template parser, must be a valid json object string, e.g. '{"key1":"value1","key2":"value2"}'. | env: LLAMA_CHAT_TEMPLATE_KWARGS | Forward as raw argv/env from the extension. |
| `-to`<br/>`--timeout` | host-governed | Server read/write timeout in seconds. | default: 600<br/>env: LLAMA_ARG_TIMEOUT | Gate behind host policy or typed host settings. |
| `--threads-http` | host-governed | Sets threads used to process HTTP requests. | default: -1<br/>env: LLAMA_ARG_THREADS_HTTP | Gate behind host policy or typed host settings. |
| `--cache-prompt`<br/>`--no-cache-prompt` | extension-passthrough | Toggles whether to enable prompt caching. | default: enabled<br/>env: LLAMA_ARG_CACHE_PROMPT | Forward as raw argv/env from the extension. |
| `--cache-reuse` | extension-passthrough | Min chunk size to attempt reusing from the cache via KV shifting, requires prompt caching to be enabled. | default: 0<br/>env: LLAMA_ARG_CACHE_REUSE<br/>(card) | Forward as raw argv/env from the extension. |
| `--metrics` | host-governed | Enable prometheus compatible metrics endpoint. | default: disabled<br/>env: LLAMA_ARG_ENDPOINT_METRICS | Gate behind host policy or typed host settings. |
| `--props` | host-governed | Enable changing global properties via POST /props. | default: disabled<br/>env: LLAMA_ARG_ENDPOINT_PROPS | Gate behind host policy or typed host settings. |
| `--slots`<br/>`--no-slots` | host-governed | Expose slots monitoring endpoint. | default: enabled<br/>env: LLAMA_ARG_ENDPOINT_SLOTS | Gate behind host policy or typed host settings. |
| `--slot-save-path` | host-governed | Specifies file path for save slot kv cache. | default: disabled | Gate behind host policy or typed host settings. |
| `--media-path` | host-governed | Directory for loading local media files; files can be accessed via file:// URLs using relative paths. | default: disabled | Gate behind host policy or typed host settings. |
| `--models-dir` | extension-passthrough | Directory containing models for the router server. | default: disabled<br/>env: LLAMA_ARG_MODELS_DIR | Forward as raw argv/env from the extension. |
| `--models-preset` | extension-passthrough | Specifies file path for INI file containing model presets for the router server. | default: disabled<br/>env: LLAMA_ARG_MODELS_PRESET | Forward as raw argv/env from the extension. |
| `--models-max` | extension-passthrough | For router server, maximum number of models to load simultaneously. | default: 4, 0 = unlimited<br/>env: LLAMA_ARG_MODELS_MAX | Forward as raw argv/env from the extension. |
| `--models-autoload`<br/>`--no-models-autoload` | extension-passthrough | For router server, whether to automatically load models. | default: enabled<br/>env: LLAMA_ARG_MODELS_AUTOLOAD | Forward as raw argv/env from the extension. |
| `--jinja`<br/>`--no-jinja` | extension-passthrough | Toggles whether to use jinja template engine for chat. | default: enabled<br/>env: LLAMA_ARG_JINJA | Forward as raw argv/env from the extension. |
| `--reasoning-format` | extension-passthrough | Controls whether thought tags are allowed and/or extracted from the response, and in which format they're returned; one of:. | default: auto<br/>env: LLAMA_ARG_THINK<br/>- none: leaves thoughts unparsed in message.content; - deepseek: puts thoughts in message.reasoning_content | Forward as raw argv/env from the extension. |
| `-rea`<br/>`--reasoning` | extension-passthrough | Uses reasoning/thinking in the chat ('on', 'off', or 'auto', default: 'auto' (detect from template)). | env: LLAMA_ARG_REASONING | Forward as raw argv/env from the extension. |
| `--reasoning-budget` | extension-passthrough | Token budget for thinking: -1 for unrestricted, 0 for immediate end, N>0 for token budget. | default: -1<br/>env: LLAMA_ARG_THINK_BUDGET | Forward as raw argv/env from the extension. |
| `--reasoning-budget-message` | extension-passthrough | Message injected before the end-of-thinking tag when reasoning budget is exhausted. | default: none<br/>env: LLAMA_ARG_THINK_BUDGET_MESSAGE | Forward as raw argv/env from the extension. |
| `--chat-template` | extension-passthrough | Configures custom jinja chat template. | default: template taken from model's metadata<br/>env: LLAMA_ARG_CHAT_TEMPLATE<br/>if suffix/prefix are specified, template will be disabled; only commonly used templates are accepted (unless --jinja is set before this flag): | Forward as raw argv/env from the extension. |
| `--chat-template-file` | extension-passthrough | Configures custom jinja chat template file. | default: template taken from model's metadata<br/>env: LLAMA_ARG_CHAT_TEMPLATE_FILE<br/>if suffix/prefix are specified, template will be disabled; only commonly used templates are accepted (unless --jinja is set before this flag): | Forward as raw argv/env from the extension. |
| `--skip-chat-parsing`<br/>`--no-skip-chat-parsing` | extension-passthrough | Forces a pure content parser, even if a Jinja template is specified; model will output everything in the content section, including any reasoning and/or tool calls. | default: disabled<br/>env: LLAMA_ARG_SKIP_CHAT_PARSING | Forward as raw argv/env from the extension. |
| `--prefill-assistant`<br/>`--no-prefill-assistant` | extension-passthrough | Toggles whether to prefill the assistant's response if the last message is an assistant message. | default: prefill enabled<br/>env: LLAMA_ARG_PREFILL_ASSISTANT<br/>when this flag is set, if the last message is an assistant message then it will be treated as a full message and not prefilled | Forward as raw argv/env from the extension. |
| `-sps`<br/>`--slot-prompt-similarity` | extension-passthrough | How much the prompt of a request must match the prompt of a slot in order to use that slot. | default: 0.10, 0.0 = disabled | Forward as raw argv/env from the extension. |
| `--lora-init-without-apply` | extension-passthrough | Load LoRA adapters without applying them (apply later via POST /lora-adapters). | default: disabled | Forward as raw argv/env from the extension. |
| `--sleep-idle-seconds` | extension-passthrough | Sets seconds of idleness after which the server will sleep. | default: -1; -1 = disabled | Forward as raw argv/env from the extension. |
| `-td`<br/>`--threads-draft` | extension-passthrough | Sets threads to use during generation. | default: same as --threads | Forward as raw argv/env from the extension. |
| `-tbd`<br/>`--threads-batch-draft` | extension-passthrough | Sets threads to use during batch and prompt processing. | default: same as --threads-draft | Forward as raw argv/env from the extension. |
| `--draft`<br/>`--draft-n`<br/>`--draft-max` | extension-passthrough | Sets tokens to draft for speculative decoding. | default: 16<br/>env: LLAMA_ARG_DRAFT_MAX | Forward as raw argv/env from the extension. |
| `--draft-min`<br/>`--draft-n-min` | extension-passthrough | Sets minimum draft tokens to use for speculative decoding. | default: 0<br/>env: LLAMA_ARG_DRAFT_MIN | Forward as raw argv/env from the extension. |
| `--draft-p-min` | extension-passthrough | Minimum speculative decoding probability (greedy). | default: 0.75<br/>env: LLAMA_ARG_DRAFT_P_MIN | Forward as raw argv/env from the extension. |
| `-cd`<br/>`--ctx-size-draft` | extension-passthrough | Sets the prompt context for the draft model. | default: 0, 0 = loaded from model<br/>env: LLAMA_ARG_CTX_SIZE_DRAFT | Forward as raw argv/env from the extension. |
| `-devd`<br/>`--device-draft` | extension-passthrough | Comma-separated list of devices to use for offloading the draft model (none = don't offload). | use --list-devices to see a list of available devices | Forward as raw argv/env from the extension. |
| `-ngld`<br/>`--gpu-layers-draft`<br/>`--n-gpu-layers-draft` | extension-passthrough | Caps draft model layers to store in VRAM, either an exact number, 'auto', or 'all'. | default: auto<br/>env: LLAMA_ARG_N_GPU_LAYERS_DRAFT | Forward as raw argv/env from the extension. |
| `-md`<br/>`--model-draft` | extension-passthrough | Draft model for speculative decoding. | default: unused<br/>env: LLAMA_ARG_MODEL_DRAFT | Forward as raw argv/env from the extension. |
| `--spec-replace` | extension-passthrough | Translate the string in TARGET into DRAFT if the draft model and main model are not compatible. | — | Forward as raw argv/env from the extension. |
| `--spec-type` | extension-passthrough | Type of speculative decoding to use when no draft model is provided. | default: none<br/>env: LLAMA_ARG_SPEC_TYPE | Forward as raw argv/env from the extension. |
| `--spec-ngram-size-n` | extension-passthrough | Ngram size N for ngram-simple/ngram-map speculative decoding, length of lookup n-gram. | default: 12 | Forward as raw argv/env from the extension. |
| `--spec-ngram-size-m` | extension-passthrough | Ngram size M for ngram-simple/ngram-map speculative decoding, length of draft m-gram. | default: 48 | Forward as raw argv/env from the extension. |
| `--spec-ngram-min-hits` | extension-passthrough | Minimum hits for ngram-map speculative decoding. | default: 1 | Forward as raw argv/env from the extension. |
| `-mv`<br/>`--model-vocoder` | extension-passthrough | Vocoder model for audio generation. | default: unused | Forward as raw argv/env from the extension. |
| `--tts-use-guide-tokens` | extension-passthrough | Uses guide tokens to improve TTS word recall. | — | Forward as raw argv/env from the extension. |
| `--embd-gemma-default` | extension-passthrough | Uses default EmbeddingGemma model (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--fim-qwen-1.5b-default` | extension-passthrough | Uses default Qwen 2.5 Coder 1.5B (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--fim-qwen-3b-default` | extension-passthrough | Uses default Qwen 2.5 Coder 3B (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--fim-qwen-7b-default` | extension-passthrough | Uses default Qwen 2.5 Coder 7B (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--fim-qwen-7b-spec` | extension-passthrough | Uses Qwen 2.5 Coder 7B + 0.5B draft for speculative decoding (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--fim-qwen-14b-spec` | extension-passthrough | Uses Qwen 2.5 Coder 14B + 0.5B draft for speculative decoding (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--fim-qwen-30b-default` | extension-passthrough | Uses default Qwen 3 Coder 30B A3B Instruct (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--gpt-oss-20b-default` | extension-passthrough | Uses gpt-oss-20b (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--gpt-oss-120b-default` | extension-passthrough | Uses gpt-oss-120b (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--vision-gemma-4b-default` | extension-passthrough | Uses Gemma 3 4B QAT (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
| `--vision-gemma-12b-default` | extension-passthrough | Uses Gemma 3 12B QAT (note: can download weights from the internet). | — | Forward as raw argv/env from the extension. |
