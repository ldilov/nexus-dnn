# Wire-format contract: `RuntimeTuning` → `llama-server` argv

**Source of truth**: `extensions/builtin/local-llm/rust/src/chat/handlers.rs::runtime_to_args`.
**Reviewer rule**: every emission in this table MUST round-trip through a unit test in `runtime_to_args_*` (FR-008, FR-024).

## Throughput knobs (spec 039 additions)

| RuntimeTuning field | Emitted argv | Omission rule | Test name |
|---|---|---|---|
| `cache_reuse: Some(n)` | `--cache-reuse <n>` | None → flag omitted | `runtime_to_args_emits_cache_reuse_when_set` / `_omits_when_none` |
| `cram_mb: Some(n)` | `--cram <n>` | None → flag omitted | `runtime_to_args_emits_cram_when_set` / `_omits_when_none` |
| `checkpoint_every_n_tokens: Some(n)` | `--checkpoint-every-n-tokens <n>` | None → flag omitted | `runtime_to_args_emits_checkpoint_when_set` / `_omits_when_none` |
| `n_cpu_moe: Some(n)` where `n > 0` | `--n-cpu-moe <n>` | None **OR** `Some(0)` → flag omitted | `runtime_to_args_emits_n_cpu_moe_when_positive` / `_omits_when_zero` / `_omits_when_none` |

Independence: any subset of these four flags MAY appear in a single argv. Behaviour is documented per FR-002.

## Sampler-quality knobs (spec 039 additions)

| RuntimeTuning field | Emitted argv | Omission rule | Test name |
|---|---|---|---|
| `min_p: Some(p)` where `p > 0.0` | `--min-p <p>` | None **OR** `Some(0.0)` → flag omitted | `runtime_to_args_emits_min_p_when_positive` / `_omits_when_zero_or_none` |
| `dry_multiplier: Some(m)` where `m > 0.0` | `--dry-multiplier <m>` AND `--dry-base <dry_base>` AND `--dry-allowed-length <dry_allowed_length>` AND (when set) `--dry-penalty-last-n <dry_penalty_last_n>` | `dry_multiplier` is None **OR** `Some(0.0)` → ALL DRY flags omitted (FR-022) | `runtime_to_args_emits_dry_quartet_when_multiplier_positive` / `_omits_all_dry_flags_when_multiplier_zero` |

DRY quartet semantics: `dry_multiplier` is the gate. If it is unset or zero, the other three DRY fields are silently dropped from the argv. This matches upstream llama-server semantics where `--dry-multiplier 0.0` means "disable DRY".

## Mitigation flags (spec 039 additions)

| RuntimeTuning field | Emitted argv | Omission rule | Test name |
|---|---|---|---|
| `swa_full: Some(true)` | `--swa-full` (no value) | None **OR** `Some(false)` → flag omitted | `runtime_to_args_emits_swa_full_when_true` / `_omits_when_false_or_none` / `swa_full_emitted_when_cache_reuse_overridden_on_gemma3` (frontend integration check) |

`--swa-full` is a presence-only flag — emitted as a single arg without a value when `swa_full == Some(true)`.

## Existing fields (spec 037-era; documented for completeness)

| RuntimeTuning field | Emitted argv | Omission rule |
|---|---|---|
| `n_gpu_layers: Some(n)` | `--n-gpu-layers <n>` | None → flag omitted |
| `threads: Some(n)` | `--threads <n>` | None → flag omitted |
| `flash_attn: Some(true)` | `--flash-attn` | `Some(false)` or None → flag omitted |
| `ctx_size: Some(n)` | `--ctx-size <n>` | None → flag omitted |
| `cache_type_k: Some(s)` | `--cache-type-k <s>` | None → flag omitted |
| `cache_type_v: Some(s)` | `--cache-type-v <s>` | None → flag omitted |
| `mmap: Some(false)` | `--no-mmap` | `Some(true)` or None → flag omitted (default behaviour is mmap on) |
| `mlock: Some(true)` | `--mlock` | `Some(false)` or None → flag omitted |
| `n_batch: Some(n)` | `--batch-size <n>` | None → flag omitted |
| `n_ubatch: Some(n)` | `--ubatch-size <n>` | None → flag omitted |
| `n_parallel: Some(n)` | `--parallel <n>` | None → flag omitted |
| `cont_batching: Some(true)` | `--cont-batching` | `Some(false)` or None → flag omitted |
| `seed: Some(n)` | `--seed <n>` | None → flag omitted |

## Argv ordering

`runtime_to_args` MAY emit flags in any order — `llama-server` does not depend on argv ordering. Tests assert presence (and absence) of flag-value pairs, not their position. The implementation SHOULD group by helper (`append_throughput_args`, then `append_sampler_args`, then `append_mitigation_args`, then existing fields) for review readability.

## Frontend cross-reference

The form's "auto-applied flag" UX hooks (FR-029, the cache-reuse override on Gemma 3 / Qwen3-Next) work by writing `swa_full = Some(true)` into the form-state's `RuntimeTuning` payload BEFORE submission. The argv emission is unchanged — `runtime_to_args` reads `swa_full` and emits accordingly. This keeps the wire contract simple and operator-mutated identical to operator-implicit.
