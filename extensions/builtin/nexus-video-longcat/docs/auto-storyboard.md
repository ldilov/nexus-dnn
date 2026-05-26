# Auto Storyboard — `longcat.video.plan.expand`

One prompt + duration + scene_count → validator-clean `scenes[]` JSON the renderer accepts.

## Two paths

| Path | Trigger | Module | Dependencies | When to use |
|---|---|---|---|---|
| Deterministic compiler (S2-1) | `use_llm=false` OR LLM lease unavailable | `compile_storyboard.py` | pure stdlib | always — the floor |
| LLM enhancer (S2-2) | `use_llm=true` AND a real `LeaseClient` is injected | `plan_llm.py` | host cross-extension lease (deferred wiring) | future |

The LLM path is currently **shipped dark**: the default `NoLeaseClient` raises `LeaseUnavailableError` and the planner falls back to the deterministic compiler. Wiring the production lease (host-side broker, reverse-RPC SDK, or pre-injected handle) is a follow-up spec.

## RPC contract

Method: `longcat.video.plan.expand`

Request params:
- `prompt` (str, required) — natural-language user prompt.
- `duration_seconds` (float, required) — total target duration; clamped to `[scene_count * 0.5, 20.0]`.
- `scene_count` (int, required) — `[1, 16]`. Forced to `1` if the prompt contains a no-split literal (`continuous shot`, `do not split`, `one take`, etc.).
- `style_hint` (str, optional) — feeds anchor extraction + every compiled scene prompt.
- `use_llm` (bool, default `false`) — opt-in for the LLM path; falls back to deterministic when no lease.
- `seed` (int, default `42`) — reserved for future LLM-path determinism.

Response:
```json
{
  "scenes": [
    {"prompt": "...", "per_scene_generated_seconds": 4.0, "overlap_frames": 0,  "motion_intensity": "dynamic", "adain_factor": 0.2, "mode": "t2v"},
    {"prompt": "...", "per_scene_generated_seconds": 4.5, "overlap_frames": 13, "motion_intensity": "dynamic", "adain_factor": 0.2, "mode": "vc"},
    {"prompt": "...", "per_scene_generated_seconds": 4.5, "overlap_frames": 13, "motion_intensity": "intense", "adain_factor": 0.2, "mode": "vc"}
  ],
  "compiler": "deterministic | llm | llm_fallback_deterministic",
  "anchor": "Alice, noir",
  "warnings": [{"code": "...", "scene_index": null, "detail": "..."}]
}
```

Error response (input-validation gate):
```json
{"status": "error", "code": -32108, "sub_reason": "PROMPT_EMPTY|SCENE_COUNT_TOO_HIGH|DURATION_BELOW_SCENE_FLOOR", "detail": "..."}
```

## Deterministic compiler — what it does

1. Normalize whitespace, smart quotes, em/en dashes.
2. Clamp inputs: duration ∈ `[scene_count*0.5, 20.0]`, scene_count ∈ `[1, 16]`. Out of range → `PLAN_INVALID`.
3. Classify: no-split literal → `single_continuation`; otherwise honor the supplied `scene_count`.
4. Extract anchor: archetype pattern (`a samurai named Kenji`) > proper-name fallback (`Alice`) > style_hint > literal fallback (`cinematic`). Sanitized through printable-ASCII whitelist, capped at 60 chars.
5. Split beats: temporal markers (`then|next|meanwhile|cut to|...`) > semicolons > sentences > single beat.
6. Fit beats to scene_count: pad by repeating last; merge tail when too many.
7. Allocate per-scene generated duration: even split for fresh duration, plus `13/24s` overlap compensation for scene 1+.
8. Compose scene prompts: `"{anchor}. {beat}"`, trimmed to 280 chars.
9. Per scene: scene 0 = `mode=t2v overlap=0`; scene 1+ = `mode=vc overlap=13`. `adain_factor=0.2`, `motion_intensity` heuristic on action-verb density.

## LLM path (scaffold)

The `plan_llm.expand_prompt(..., use_llm=True, lease_client=<LeaseClient>)` flow:

1. Anchor + bounds derived deterministically (T-A — LLM never emits `num_frames`/`overlap_frames`).
2. Build system + user prompt with 1 inline positive example.
3. Call `LeaseClient.complete(system, user, max_tokens=512, timeout_s=15)`.
4. Strip code fences, find balanced `{...}`, `json.loads`. Reject if output > 8192 bytes.
5. Coerce per-scene fields (duration, motion, adain). Compute `num_frames`/`overlap`/`mode` in Python.
6. Repair anchor prefix if missing or reordered → emit `LLM_ANCHOR_REPAIRED` warning.
7. Run `validate_plan()`. On reject: 1 repair retry (combined wall ceiling 20s). On second failure: fall back to S2-1, surface warning code.
8. Truncate every warning `detail` to 200 chars + strip non-printable.

### Hardcoded parameters and rationale

| Constant | Value | Why locked |
|---|---|---|
| `LLM_TIMEOUT_S` | 15.0 | T=4 phase deadline (planner runs pre-render at T≤4; LongCat 13B loads at T=9). Llama-3.2-3B-Q4 CPU ≈15 tok/s × 200 tokens ≈ 13s + 2s margin. Higher silently stalls the render pipeline. |
| `LLM_COMBINED_WALL_TIMEOUT_S` | 20.0 | Hard ceiling across initial + repair attempt. Guarantees S2-1 fallback within fixed wall regardless of repair behavior. |
| `LLM_MAX_TOKENS` | 512 | Supports up to 6 scenes × ~70 tokens + JSON overhead. |
| `LLM_TEMPERATURE` | 0.2 | JSON adherence over creativity. User creativity belongs in the prompt, not in planner JSON. |
| `LLM_OUTPUT_MAX_BYTES` | 8192 | Pre-parse cap. Anything larger is malformed by definition. |

Config-time overrides are not exposed in v1. If a future LLM (e.g., Qwen3-8B on CPU) needs a longer budget, that's a follow-up spec change to plumb config through.

## Warning vocabulary

Codes emitted by this surface (in addition to the existing `plan_validate` codes):

- `ANCHOR_SANITIZED` — extracted anchor was truncated or non-ASCII stripped.
- `LLM_LEASE_UNAVAILABLE` — `use_llm=true` but no production `LeaseClient` or lease probe failed.
- `LLM_LEASE_TIMEOUT` — per-call or wall ceiling exceeded.
- `LLM_INVALID_JSON` — could not parse output after one repair retry.
- `LLM_VALIDATION_FAILED` — output parsed but `validate_plan()` rejected.
- `LLM_ANCHOR_REPAIRED` — canonical anchor was missing or reordered; re-injected. `detail` lists `scenes_repaired=[i,j,...]`.

Every error path lands at S2-1; the response always validates.

## Deferred — production lease wiring

The storyboard worker is a Python child of the host. The host's `acquire_lease()` (`crates/nexus-backend-runtimes/src/generic/leases/acquire.rs`) is Rust-only. Three options to enable the LLM path in production:

1. Reverse-RPC: extend the worker SDK so the worker can issue JSON-RPC requests to its parent host. The host adapter then proxies into `acquire_lease` and streams `text.complete.*` notifications back.
2. Host-side broker handler: add a generic `/api/v1/cross-extension/text-completion` handler in the host that any extension consumes; storyboard worker calls home via that endpoint. Must stay generic — no storyboard-specific routing in host code.
3. Pre-injected lease handle: host spawns the worker with a pre-acquired lease's FDs in env/argv; the worker reads them at boot and constructs a `LeaseClient` from them. Heavier launch coupling.

None of the three are in scope for this spec. The `LeaseClient` Protocol in `plan_llm.py` is a single sync method `complete(system, user, max_tokens, timeout_s) → str`; any of the three options can adapt to that surface (async refactor possible if the chosen mechanism requires it).

## Real-model latency benchmark (operator-run)

For when production wiring lands, validate the 15s timeout against your hardware:

1. Install Llama-3.2-3B-Instruct-Q4_K_M GGUF via the local-llm extension.
2. Acquire a `nexus.local-llm.completions` lease, send a 300-token user prompt with the system template above.
3. Measure wall time from `text.complete.start` to `text.complete.done`.
4. If p95 > 13s on your CPU, expect frequent `LLM_LEASE_TIMEOUT` fallbacks. Either use a smaller model (e.g., SmolLM2-1.7B-Q4) or accept the deterministic path as default.

## Test surface

- `tests/test_compile_storyboard.py` — 49 tests, classifier + anchor + beat split + frame math + duration allocation + golden prompts (6 parametrized).
- `tests/test_negative_prompts.py` — 7 tests, catalog + compose().
- `tests/test_plan_llm.py` — 27 tests, mock lease, repair retry, all 6 error → fallback paths, anchor repair.
- `tests/test_plan_expand_rpc.py` — 11 tests, RPC contract round-trip on both fake + real profiles.

Total: 94 new tests, all pure-Python, no GPU, no torch import. Runtime delta < 0.5s.
