# LongCat multiscene chaining port — recon (2026-05-25)

Goal: port LTXV2 chaining tricks (AdaIN, soft-overlap, x0-pin decouple) to LongCat to fix scene-N>1 melt when prompt magnitude swings hard between scenes (nun-possession smoke: scene 1 calm prayer → scene 3 demonic levitation).

## Upstream surface

`extensions/builtin/nexus-video-longcat/worker/.venv` → vendor path `D:/longcat_install/extensions/nexus.video.longcat/vendor/longcat/longcat_video/pipeline_longcat_video.py`.

### `LongCatVideoPipeline.generate_vc` (vendor L837)

Two cond-pinning mechanisms:

| `use_kv_cache` | Used by | Pin mechanism |
|---|---|---|
| `True` | `_run_continuation_loop` (pipeline_longcat.py:1174) | L1023 cond latents popped, L1024 cached via `_cache_clean_latents`, L1026 `latents = latents[:, :, num_cond_latents:]` — denoise loop never touches cond, re-concat at L1082. |
| `False` | `_run_scene_loop` (pipeline_longcat.py:1370) | L1043 `timestep[:, :num_cond_latents] = 0` zeroes noise on cond region, L1075 scheduler step only on `latents[:, :, num_cond_latents:]`. Cond never advances. |

Both are **hard pins**. No exposed `condition_strength`, `soft_pin_scale`, or per-timestep mask kwarg.

### `LongCatVideoPipeline.prepare_latents` (vendor L215)

- Accepts `latents=` kwarg (L228) → if provided, used as starting noise.
- If `video=` also provided (always true in generate_vc path), L253-281 VAE-encodes the video and **overwrites** `latents[:, :, :num_cond_latents] = cond_latents` at L281.
- L278 `cond_latents = self.normalize_latents(cond_latents)` — normalization happens AFTER VAE encode, BEFORE overwrite. This is the cleanest hook point for latent-level AdaIN.

## Port plan

### Task 2 — AdaIN color-match (FEASIBLE, cheap)

**Option A (chosen for v1):** Pixel-level pre-AdaIN on tail PIL frames inside our `_run_scene_loop` before passing to `generate_vc`. Reference = scene-1 last N frames (anchor). Per-frame per-channel mean/std blend with factor 0.2.

Pros: zero upstream patching, ~30 LOC.
Cons: lower fidelity than latent-level (color blend, not feature blend).

**Option B (upgrade path):** Monkey-patch `prepare_latents` on pipeline instance to apply `adain_normalize_latent(cond_latents, ref_cond_latents, factor)` between L278 and L281.

### Task 3 — soft-overlap condition strength (FEASIBLE, harder)

Forklift `generate_vc` into `pipeline_longcat.py` as `_generate_vc_soft`. Modify:
- L1043 `timestep[:, :num_cond_latents] = 0` → `timestep[:, :num_cond_latents] = t * soft_pin_scale_at(step_idx)`
- L1075 scheduler.step branch → step full latents but blend cond region: `latents = pin_mask * frozen_cond_init + (1-pin_mask) * stepped`

~80 LOC fork + ~10 LOC of mods.

Constraint: only applicable to `use_kv_cache=False` branch (scene loop). KV-cache branch (continuation loop) has cond physically separated from latent tensor — soft-overlap would require KV-cache invalidation which fights the architecture.

### Task 4 — x0-pin decouple (BUNDLED with Task 3)

`soft_pin_scale_at(step_idx)` returns a decay schedule (e.g., linear from 1.0 at step 0 → 0.0 at step N/2). The "decouple" name in LTXV2 means: pin fraction is independent of sigma schedule. Concretely: per-step constant array `[1.0, 0.8, 0.6, 0.4, 0.2, 0.0, 0, 0, …]` controlling cond noise injection, NOT tied to the model's denoise sigma sequence.

## Decision matrix

| Task | Approach | LOC | Risk |
|---|---|---|---|
| #2 AdaIN | pixel-level (Option A) | ~30 | low |
| #3 soft-overlap | forklift generate_vc, scene-loop only | ~90 | medium (must preserve upstream behavior bit-perfectly when soft_pin_scale=hard) |
| #4 x0-pin schedule | bundled with #3 | ~20 | low |

Total new code: ~140 LOC + tests. Multi-day but tractable.

## Pin mode default (backwards-compat)

Default `soft_pin_scale=None` → exact upstream hard-pin behavior preserved. New flags opt-in:
- `LongCatRenderRequest.adain_factor: float = 0.0` (0 disables, 0.2 typical)
- `LongCatRenderRequest.overlap_condition_strength: float = 1.0` (1.0 = hard, 0.5 = LTXV2 default)
- `LongCatRenderRequest.soft_pin_schedule: Literal["hard", "linear_decay", "cosine_decay"] = "hard"`

Scenes JSON gains per-scene override of all three.
