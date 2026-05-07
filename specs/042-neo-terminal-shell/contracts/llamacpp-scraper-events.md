# Contract: llama.cpp stderr → RunEventItem mapping

**Spec**: [spec.md](../spec.md) | **Plan**: [plan.md](../plan.md) | **Research**: [research.md](../research.md) | **Date**: 2026-05-08

This document is the canonical mapping between llama.cpp's stderr output and the structured `RunEventItem` events the Lattice consumes. Implementation lives in `crates/nexus-backend-runtimes/src/llamacpp/scraper_patterns.rs` and is invoked from `log_pipeline.rs`. No upstream patches to llama.cpp are required.

## Invocation flag

`llama-server` MUST be spawned with `--log-verbosity 1` (or `LLAMA_LOG_LEVEL=info`). This unlocks the per-tensor histogram + per-layer KV-cache debug lines that the Lattice synthesis depends on. Wired in `crates/nexus-backend-runtimes/src/llamacpp/spawn.rs`.

## Phase boundary classifier

A first-pass tokenizer captures `^(?P<func>\w+):\s+(?P<body>.*)$`. Phase transitions are derived from `func` family changes:

| `func` family | Phase emitted |
|---|---|
| `llama_model_loader` | `discover` (started) on first match; transitions to `print_meta` when `func` changes to `llm_load_print_meta` / `print_info` |
| `llm_load_print_meta` / `print_info` | `print_meta` (in_progress); transitions to `tensors` when `func` changes to `llm_load_tensors` / `load_tensors` |
| `llm_load_tensors` / `load_tensors` | `tensors` (in_progress); transitions to `kv_reserve` when `func` changes to `llama_kv_cache` / `llama_kv_cache_init` |
| `llama_kv_cache*` | `kv_reserve` (in_progress); transitions to `context_build` when `func` changes to `llama_context` / `llama_new_context_with_model` |
| `llama_context*` | `context_build` (in_progress); transitions to `warmup` after the `graph splits =` line |
| (silent stream + first inference token OR `/health` flips to `ok`) | `ready` (completed) |

`PhaseState` follows the natural flow: `started → in_progress → completed`. Failures emit `failed` and freeze the Lattice in last-known state.

## Per-pattern mapping

### Layer count discovery

**Stderr line**:

```
llm_load_print_meta: n_layer               = 32
```

**Regex**:

```rust
r"^(?P<func>\w+):\s+n_layer\s+=\s+(?P<n_layer>\d+)\s*$"
```

**Emits**: `RunEventItem::Metric { name: "model.n_layer", value: <n>, unit: Count, labels: {} }`

**Required**: cache `n_layer` as scraper state. Without it, downstream synthesis cannot run — emits `Gap { reason: NLayerMissing }` if absent by the end of `print_meta` phase.

---

### Tensor histogram → tensor.allocate synthesis

**Stderr line** (verbosity-gated; surfaces with `--log-verbosity 1`):

```
llama_model_loader: - tensor split  0:                blk.0.attn_q.weight q4_K     [  4096,  4096,     1,     1 ]    9.00 MiB
```

**Regex**:

```rust
r"^llama_model_loader:\s+-\s+tensor split\s+(?P<split>\d+):\s+(?P<name>\S+)\s+(?P<dtype>\S+)\s+\[\s*(?P<shape>[^\]]+?)\s*\]\s+(?P<mib>[0-9.]+)\s+MiB"
```

**Tensor-name parser** for layer + group derivation:

| Pattern | layer | group |
|---|---|---|
| `blk.<N>.attn_q.weight`, `blk.<N>.attn_k.weight`, `blk.<N>.attn_v.weight`, `blk.<N>.attn_output.weight` | `<N>` | `Attn` |
| `blk.<N>.ffn_up.weight`, `blk.<N>.ffn_down.weight`, `blk.<N>.ffn_gate.weight` | `<N>` | `Ffn` |
| `blk.<N>.attn_norm.weight`, `blk.<N>.ffn_norm.weight` | `<N>` | `Norm` |
| `token_embd.weight`, `tok_embeddings.weight` | none (aux row) | `Embed` |
| `output.weight`, `output_norm.weight` | none (aux row) | `Output` |
| (anything else with `blk.<N>.`) | `<N>` | `Other` |
| (anything else without `blk.`) | none | `Other` |

**Emits**: `RunEventItem::TensorAllocate { layer, group, bytes: mib * 1048576, target: Mixed, tensor_name, dtype }`

`target` is `Mixed` at this point because the offload plan has not been seen yet. Once the offload-plan line arrives (next pattern), the Lattice consumer updates the cell's `target` from the synthesized event.

**Fallback**: when the histogram is gated off (build without verbose), emit one `Gap { reason: TensorHistogramMissing }` and synthesize per-`(layer, group)` events from cached `n_layer` × estimated bytes-per-layer (computed from `total model bytes / n_layer / group_count`). The Lattice still renders, with `bytes: estimated` flagged.

---

### Offload plan → per-layer placement

**Stderr lines**:

```
llm_load_tensors: offloading 32 repeating layers to GPU
llm_load_tensors: offloading output layer to GPU
llm_load_tensors: offloaded 33/33 layers to GPU
```

When `--n-cpu-moe N` is set (spec 039), an additional line appears:

```
llm_load_tensors: offloading N expert layers to CPU (n-cpu-moe)
```

**Regexes**:

```rust
r"^\w+:\s+offloading\s+(?P<count>\d+)\s+repeating layers to GPU"
r"^\w+:\s+offloading\s+output layer to GPU"
r"^\w+:\s+offloaded\s+(?P<offloaded>\d+)/(?P<total>\d+)\s+layers to GPU"
r"^\w+:\s+offloading\s+(?P<count>\d+)\s+expert layers to CPU"
```

**Synthesis**: emits one `Phase { phase: Tensors, state: InProgress }` event with `summary: "67/70 layers on GPU + 3 expert layers on CPU"`. Emits one `TensorAllocate { ..., target: <derived> }` per known `(layer, group)` to *update* the prior `Mixed` placement to its actual `Gpu { device: 0 }` or `Cpu` target. Frontend Lattice consumer treats subsequent `TensorAllocate` events for the same `(layer, group)` as state updates rather than duplicates (deduped by `(layer, group, run_id)`).

`--n-cpu-moe N` causes the **last N expert (FFN) layers** to be `Cpu`; all other tensor groups stay `Gpu`. This produces the amber-column-at-bottom visual signature that the spec calls out.

---

### Buffer summaries → metric

**Stderr lines**:

```
llm_load_tensors:        CPU model buffer size =   234.50 MiB
llm_load_tensors:      CUDA0 model buffer size = 12450.00 MiB
llama_kv_cache:        CPU KV buffer size =    32.00 MiB
llama_kv_cache:      CUDA0 KV buffer size =   512.00 MiB
llama_context:      CUDA0 compute buffer size =   164.00 MiB
llama_context:        CPU output buffer size =     0.50 MiB
```

**Regex** (single, captures all four buffer kinds):

```rust
r"^(?P<func>\w+):\s+(?P<device>\S+)\s+(?P<kind>model|KV|compute|output)\s+buffer size\s*=\s*(?P<mib>[0-9.]+)\s+MiB"
```

**Emits**: `RunEventItem::Metric { name: "buffer.bytes", value: mib * 1048576, unit: Bytes, labels: { device, kind } }`

Device label is treated opaquely. A known-prefix table normalises `CUDA0..7`, `CPU`, `CPU_Mapped`, `CUDA_Host`, `Metal`, `SYCL0..N`, `ROCm`, `CANN`, `Vulkan0..N`, `RPC[host:port]`. Unknown labels emit `ScraperUnknown { raw_line }` AND the metric event (so the data isn't lost; the unknown is just flagged).

**Pulse-Floor consumption**: VRAM trace sums `buffer.bytes` where `device.startsWith("CUDA")` (or ROCm, Metal, SYCL, etc. per the GPU-prefix table) and divides by total VRAM (sourced separately via NVML/Metal/SYCL host probes). RAM trace sums `device == "CPU"` or `device == "CPU_Mapped"`.

---

### KV-cache aggregate

**Stderr line**:

```
llama_kv_cache: size = 1024.00 MiB (4096 cells, 32 layers, 1/1 seqs), K (f16):  512.00 MiB, V (f16):  512.00 MiB
```

**Regex**:

```rust
r"^llama_kv_cache:\s+size\s*=\s*(?P<total_mib>[0-9.]+)\s+MiB\s+\((?P<cells>\d+)\s+cells,\s+(?P<layers>\d+)\s+layers,\s+(?P<seqs_used>\d+)/(?P<seqs_max>\d+)\s+seqs\),\s+K\s+\((?P<k_dtype>[^)]+)\):\s*(?P<k_mib>[0-9.]+)\s+MiB,\s+V\s+\((?P<v_dtype>[^)]+)\):\s*(?P<v_mib>[0-9.]+)\s+MiB"
```

**Emits two metrics**:

```
Metric { name: "kv.bytes", value: k_mib * 1048576, labels: { kind: "K", dtype: k_dtype } }
Metric { name: "kv.bytes", value: v_mib * 1048576, labels: { kind: "V", dtype: v_dtype } }
```

Plus one phase progress: `Phase { phase: KvReserve, state: Completed, summary: "KV cache: <total_mib> MiB across <layers> layers, K (<k_dtype>) <k_mib>, V (<v_dtype>) <v_mib>" }`.

The K and V `dtype` labels feed the spec 039 Force-FP16-KV inspector — the Lattice idle-state Edit tab reads these to decide whether the "Force FP16 KV" button is currently active.

**Note**: aggregate `layers` count may be less than `n_layer` for hybrid Mamba models (some layers don't have KV cache). Use the explicit `layers` field; the Lattice marks layers without KV cache by leaving the `KvCache` cell in `pending` indefinitely AND emitting a `Phase { phase: KvReserve, summary: "<n> layers without KV cache (hybrid model)" }`.

---

### Per-layer KV debug (best-effort)

**Stderr lines** (only with `LLAMA_LOG_LEVEL=debug`):

```
llama_kv_cache: layer  23: dev = CUDA0
llama_kv_cache: layer  31: does not have KV cache
llama_kv_cache: layer   7: filtered
```

**Regexes**:

```rust
r"^llama_kv_cache:\s+layer\s+(?P<layer>\d+):\s+dev\s+=\s+(?P<device>\S+)"
r"^llama_kv_cache:\s+layer\s+(?P<layer>\d+):\s+does not have KV cache"
r"^llama_kv_cache:\s+layer\s+(?P<layer>\d+):\s+filtered"
```

**Emits** (when present): one `TensorAllocate { layer, group: KvCache, bytes: 0, target: <derived> }` per layer to mark the cell's per-layer placement. Bytes are unknown at debug-line time; consumer combines with the aggregate to derive per-layer share.

When debug is off (default — verbosity 1 only surfaces `info`, not `debug`), these lines do not appear; KV cells render with aggregate-derived state (uniform across all KV-bearing layers).

---

### Context build

**Stderr lines**:

```
llama_context: n_ctx = 4096
llama_context: n_batch = 512
llama_context: n_ubatch = 512
llama_context: flash_attn = 1
llama_context: kv_unified = 1
llama_context: graph nodes = 14336
llama_context: graph splits = 33
```

**Regexes**: per-key, e.g.:

```rust
r"^llama_context:\s+(?P<key>\w+)\s+=\s+(?P<value>\S+)"
```

**Emits**: each key becomes `Metric { name: "context.<key>", value: <numeric or 0/1>, labels: {} }`. The `graph splits =` line specifically emits `Phase { phase: ContextBuild, state: Completed, summary: "<value> graph splits, <n_ctx> ctx" }` and triggers the warmup phase boundary.

---

### Errors

#### VRAM OOM (multi-line aggregation)

**Stderr lines** (within a 2-second sliding window, in any order):

```
ggml_cuda_host_malloc: allocating 12450.00 MiB on device 0: cudaMalloc failed: out of memory
ggml_gallocr_reserve_n: failed to allocate CUDA0 buffer of size 13063061504
llama_new_context_with_model: failed to allocate compute buffers
```

**Regexes**:

```rust
r"cudaMalloc failed:\s+out of memory"
r"hipMalloc failed:\s+out of memory"
r"ggml_gallocr_reserve_n: failed to allocate (?P<device>\S+) buffer of size (?P<bytes>\d+)"
r"failed to allocate compute buffers"
```

**Emits**: one aggregated `Error { reason: VramOom, device: <captured>, bytes: <captured>, message: <full trio>, suggestion: "Try `n-gpu-layers ≤ <derived>` or `n-cpu-moe 1`" }`. The aggregator flushes after 2 seconds even if the trio is partial — emits with `reason: AllocFailurePartial` so the operator sees something rather than nothing.

The suggested action's `n-gpu-layers ≤ <derived>` calculation: `derived = floor((available_vram_bytes - kv_bytes - context_bytes) / per_layer_bytes)`, where the inputs are the most recent metrics in the Pulse-Floor stream. If unavailable, the suggestion falls back to `"Reduce n-gpu-layers or use n-cpu-moe 1"` without a number.

#### Other errors

| Stderr | Maps to |
|---|---|
| `llama_load_model_from_file: failed to load model` (or `llama_model_load_from_file: ...`) | `Error { reason: GgufParse, message }` |
| `llama_load_model_from_file: cancelled model load` | `Error { reason: UserCancelled }` |
| `llama_model_loader: error loading model hyperparameters: <reason>` | `Error { reason: GgufParse, message: <reason> }` |
| `llama_model_loader: tensor 'X' has invalid data` | `Error { reason: CorruptionSuspected, message: "tensor 'X' has invalid data" }` |
| `llama_model_loader: unknown type X` | `Error { reason: QuantizationMismatch, message: "unknown type X" }` |
| `llama_load_model_from_file: no backends are loaded` | `Error { reason: BackendInit, message }` |
| `llama_context: failed to allocate output buffer of size X MiB` | `Error { reason: KvCacheInit, message }` (output buffer fails are usually downstream of KV pressure) |

**Regex** (top-level error catcher):

```rust
r"^(?P<func>\w+):\s+(?:failed to|error loading|cancelled)\s+(?P<rest>.*)$"
```

---

### Unknown / drift

Any line whose `func:` matches the family pattern but whose body fails all per-`func` regexes:

**Emits**: `RunEventItem::ScraperUnknown { raw_line, scraper: "llamacpp.v1" }`.

These are queryable via `cmd_run_events_query_window` with `source_filter: ["llamacpp.scraper"]`. Aggregate counts surface in dev tools so format drift is detected before a release ships.

---

## Source identification

All events emitted by this scraper carry `source: "llamacpp.scraper"`. Multiple llama.cpp instances running concurrently are distinguished by `run_id` (caller-supplied — typically `<deployment_id>:<load_attempt_n>`).

## Test fixtures

The contract is verified by the test suite at `crates/nexus-backend-runtimes/tests/llamacpp_scraper_fixtures/`. Each fixture is a real llama.cpp stderr capture (replayed verbatim) with an expected `RunEventItem[]` JSON output. Fixtures cover:

- 70-layer Llama-3 Q4_K_M load (happy path, all phases, GPU-only)
- Mixed offload (`--n-gpu-layers 50` on a 70-layer model)
- MoE offload (`--n-cpu-moe 1` causing amber-column visual)
- VRAM OOM at layer 67 (trio aggregated)
- Cancelled load
- Corrupt tensor fixture (`tensor 'X' has invalid data`)
- Hybrid Mamba model (subset of layers without KV cache)
- ROCm fixture (`hipMalloc failed` trio variant)

Fixtures use real captured output so format-drift detection lands automatically when llama.cpp is upgraded.
