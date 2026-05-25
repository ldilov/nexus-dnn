# LLM Planner Requirements
## Future spec — DO NOT implement until S2-1 deterministic compiler ships first

The user wants "ONE creative prompt → coherent multiscene movie." Today that requires hand-authoring the `scenes[]` JSON. The deterministic compiler (`compile_storyboard.py`, backlog item S2-1) closes 80% of this with regex + heuristics + templates. This document captures requirements for an OPTIONAL LLM layer that sits ABOVE the deterministic compiler, falling back to it on failure.

The LLM planner is **not in scope for the current sprint**. It is captured here so the deterministic compiler's API does not paint into a corner.

---

## Goal

Take a single natural-language prompt + duration + scene_count + style hint, emit a `scenes[]` JSON that:

- Round-trips through `plan.validate` with `ok=true`, ≤2 warnings, 0 errors.
- Preserves character + style identity across scenes (Persistent Identity Anchor pattern from SOTA review — `{character}. {action}. {style}` per scene).
- Distributes user duration evenly across N scenes with overlap-aware frame math.
- Emits per-scene action delta phrases (each scene has a DISTINCT motion verb sequence).
- Inserts curated negative-prompt tokens (`negative_prompts.NEG.no_melt`, `no_deform`, `no_extra_limbs` from S2-14 backlog).
- Falls back to S2-1 deterministic compiler on LLM failure, timeout, or malformed output.

## Hard constraints

| Constraint | Rationale |
|---|---|
| CPU-only inference | Worker GPU is owned by LongCat 13B + UMT5 + VAE. No VRAM contention. |
| Spawn-and-exit process | Long-lived planner blocks render worker. Each plan invocation = fresh process. |
| <5 s latency p95 | Render takes 18 min; planning >5 s pollutes "iteration speed" perception. |
| <2 GB RAM peak | Run alongside worker boot without memory pressure. |
| Offline-capable | No API calls. Operator may render air-gapped. |
| Output is validated JSON | Validator is the contract; planner output goes through `validate_plan` before reaching `_render_start`. |
| Falls back deterministically | LLM unavailable → S2-1 compiler runs; same output shape, no user-visible failure. |
| Deterministic seed support | Same prompt + seed → same scenes JSON. Reproducibility. |
| Local-only model | No network for either model download or inference. Model cached at install time. |

## Model candidates (ranked by fit)

| Model | Q4 size | RAM peak | CPU tok/s | Notes |
|---|---|---|---|---|
| Llama-3.2-3B-Instruct-Q4 | ~1.8 GB | ~3.5 GB | 25-40 | Best scene-narrative quality at this size; structured-output stable |
| SmolLM2-1.7B-Q4 | ~1.1 GB | ~2.5 GB | 40-60 | Smaller + faster; narrative coherence slightly weaker on 4-scene chains |
| Phi-3-mini-3.8B-Q4 | ~2.3 GB | ~4 GB | 20-35 | Strongest JSON adherence; slightly slower; ~2 GB ceiling exceeded |
| Qwen2.5-1.5B-Instruct-Q4 | ~1 GB | ~2 GB | 50-70 | Smallest viable; weak on character continuity vocab |

**Recommended v1**: Llama-3.2-3B-Instruct-Q4 via `llama-cpp-python` Python bindings. Constrained sampling via `json_schema` parameter forces valid JSON.

## Interface

```python
def expand_prompt(
    prompt: str,
    duration_seconds: float,
    scene_count: int,
    style_hint: str | None = None,
    seed: int = 42,
    timeout_seconds: float = 5.0,
) -> dict[str, Any]:
    ...
```

Returns `{"scenes": [...], "compiler": "llm" | "deterministic_fallback", "model": "...", "warnings": [...]}`.

Lives at `extensions/builtin/nexus-video-longcat/worker/src/longcat_video_worker/plan_llm.py`.

Reuses S2-1's `compile_storyboard.compile()` as the fallback path.

## Prompt template (constrained JSON output)

```
You are a video storyboard planner. Output ONLY valid JSON with the following shape:
{
  "scenes": [
    {
      "prompt": "<≤80 words: character description + scene action + style anchor>",
      "duration_seconds": <float>,
      "overlap_frames": 13
    }
  ]
}

Rules:
1. Every scene MUST include the same character description (preserve identity).
2. Every scene MUST include the same style anchor.
3. Scene actions MUST differ — distinct motion verbs.
4. Total duration MUST equal the requested duration.
5. Each scene gets equal duration unless one is a climax (then +20%).
6. Include negative-prompt anti-melt tokens implicitly via positive phrasing (e.g. "stable form" not "no melt").

User prompt: {prompt}
Total duration: {duration_seconds} seconds
Scene count: {scene_count}
Style hint: {style_hint}

Output the JSON only. No prose, no markdown fences.
```

Use `llama-cpp-python` JSON-grammar sampler so the model cannot emit non-JSON tokens.

## Validation pipeline

```
expand_prompt
  → llm.generate(prompt, json_schema, seed) [≤5s timeout]
  → json.loads(output)
  → patch missing fields with deterministic defaults
  → validate_plan(payload)
  → if ok=true: return scenes
  → if ok=false: log + fall through
  → compile_storyboard.compile(prompt, duration, scene_count, style_hint)
  → validate_plan(payload)
  → return scenes (compiler="deterministic_fallback")
```

If even the deterministic compiler fails validation, raise `PlanCompilationError` — caller must surface.

## Negative-prompt strategy

Do NOT ask the LLM to author negative prompts. Use the curated catalog (`negative_prompts.NEG`) and apply on the validator/render side. LLMs hallucinate negative tokens; the catalog is auditable.

## RPC surface

Add `longcat.video.plan.expand` (or extend S2-2 `longcat.video.preset.expand`):

```json
{
  "method": "longcat.video.plan.expand",
  "params": {
    "prompt": "...",
    "duration_seconds": 12.0,
    "scene_count": 3,
    "style_hint": "cinematic horror",
    "use_llm": true,
    "seed": 42
  }
}
```

`use_llm=false` short-circuits to deterministic compiler. `use_llm=true` with no model installed falls back to deterministic + emits `LLM_NOT_INSTALLED` warning.

## Installation

LLM model file is OPTIONAL — installed via separate dependency step in `manifest.yaml`:

```yaml
- id: llm_planner
  type: model
  optional: true
  requires: [python, pkgs]
  spec:
    source: huggingface
    repo: bartowski/Llama-3.2-3B-Instruct-GGUF
    filename: Llama-3.2-3B-Instruct-Q4_K_M.gguf
    target: extension_local/models/planner/
    sha256: <pin>
```

Worker boot path: if model file present, import `llama_cpp` and warm; else log `planner_model_absent` and fall back to deterministic.

## Acceptance criteria (for the future spec)

1. **Latency**: p95 ≤5 s on a 6-core x86 CPU with 16 GB RAM, single warm process.
2. **Validation pass rate**: ≥95% of LLM outputs pass `plan.validate` first-try across a 100-prompt benchmark.
3. **Coherence A/B**: blind subjective rating (5 reviewers, 20 prompts × 2 outputs each) — LLM expansion vs deterministic compiler — LLM wins ≥60% on "character feels like same person across scenes" question.
4. **Fallback robustness**: zero hard failures across 1,000 randomized prompts; every prompt produces SOME validated output (LLM OR deterministic).
5. **Deterministic seed**: same `(prompt, duration, scene_count, style_hint, seed)` produces byte-identical JSON across 10 invocations.
6. **Offline test**: planner works with no network access (model loaded from local cache).

## Out of scope for v1

- Multi-turn dialog ("now make scene 2 calmer")
- Cross-language input (English only)
- LLM-authored negative prompts (use curated catalog)
- LLM-authored camera/lighting metadata (deterministic templates instead)
- Streaming output (full JSON returned in one call)
- Fine-tuned model (off-the-shelf Q4 instruct model only)

## Risks documented

- **Hallucination**: LLM invents characters/objects not in user prompt. Mitigation: prompt template explicitly says "use only what the input describes."
- **Token budget overrun**: 4-scene chain × character+style+action = ~400 tokens per scene = 1600 tokens total. UMT5-XXL has 4096-token context; safe with margin.
- **Mode collapse**: LLM emits 3 scenes with near-identical action deltas. Mitigation: validator's `DISTILL_STATIC_RISK` warning fires; deterministic fallback overrides.
- **Slow first call**: cold-start LLM load is ~3 s on CPU. Mitigation: pre-warm at worker boot if model present; fall back if pre-warm fails.

## Why not in scope today

S2-1 (deterministic compiler) ships first because:
1. Zero new dependency surface (pure-python).
2. Latency is microseconds, not seconds.
3. No model download / cache management.
4. Reproducibility is trivial.
5. Failure mode is bounded (it never hallucinates — it copies from templates).

Once S2-1 covers 80% of user-typed prompts, LLM layer can be added as quality enhancement on top. Without S2-1 as the floor, an LLM-only path has no fallback and becomes a single-point-of-failure.
