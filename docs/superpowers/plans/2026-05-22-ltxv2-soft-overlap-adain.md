# LTXV2 Multiscene Soft-Overlap + AdaIN Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make LTX-2 19B distilled multiscene continuation survive a prompt change by replacing the hard clean-pin carry with a soft, re-denoisable latent overlap plus latent-space AdaIN drift control.

**Architecture:** The current multiscene path carries the prior scene's latent tail as a `VideoConditionByLatentIndex` at strength 0.9 (`denoise_mask` 0.1 — near-hard pin). On a prompt change the pinned-clean old-prompt frames cannot be reconciled by the headroom-free 8-step distilled schedule → angular faceting / figure multiplication. This plan ports the looping-sampler mechanism onto the existing ltx-core primitives: (1) soften the carry to strength ~0.5 so the overlap region is re-denoised under the new prompt; (2) re-noise the soft-conditioned tokens in the denoise seed so their declared sigma matches their actual noise level — the load-bearing fix without which soft strength just produces "half-denoised garbage"; (3) AdaIN-normalize each continuation scene's latent statistics toward scene 0 to cap colour/exposure drift; (4) kill the dead 105-frame default and the broken global anchor.

**Tech Stack:** Python 3.11/3.12, PyTorch, `ltx-core` (native LTX-2 building blocks), pytest. All edits are extension-local under `extensions/builtin/nexus-video-ltx23/worker/`.

---

## Background — why this plan exists

Source-verified facts the tasks depend on:

- `ltx_core.conditioning.types.latent_cond.VideoConditionByLatentIndex.apply_to` writes the conditioning latent into **both** `latent` (the denoise seed) and `clean_latent`, and sets `denoise_mask = 1.0 - strength` on those token positions. It does **not** re-noise the seed. (Verified: `.venv/.../ltx_core/conditioning/types/latent_cond.py:40-42`.)
- `run_native_denoise` ([pipeline_ltx2.py:1559-1602](../../../extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_ltx2.py)) steps every token at `token_sigma = sigma * denoise_mask`. For a hard pin (`denoise_mask == 0`) the clean seed is consistent with `token_sigma == 0`. For a soft token (`0 < denoise_mask < 1`) the seed is clean but the loop declares it noised at `sigma0 * mask` → noise-level mismatch → the overlap melts. This is why the team observed soft strength "leaving the overlap half-denoised" and (wrongly) concluded the base model cannot extend.
- `VideoConditionByReferenceLatent` (the current global anchor) **appends** reference tokens that an IC-LoRA is trained to attend across; on the bare distilled transformer it is weak/ignored (verified: `reference_video_cond.py` docstring "for IC-LoRA inference"). The global anchor was therefore tested in a non-functional form — remove it; AdaIN replaces its intent.
- The `ltxv2-multiscene` profile already ships `condition_strength: 0.5`, but `run_multiscene` falls back to a hard-coded **0.9** default when the plan's `render` block omits it, and the in-code comment explicitly reasons for 0.9. Soft strength **without** the seed re-noise (Task 3) regresses — Task 3 and Task 4 must land together before any GPU test.
- A 49-frame distilled clip is GPU-coherent; 105 chromatic-blows-out (token-budget limit on the time axis). `_DEF_FRAMES = 105` and three `ltxv2-*` profiles still ship 105 — dead on arrival.

**Task ordering is a hard dependency:** Task 3 (seed re-noise) must be committed before or with Task 4 (soft default). Do not GPU-test after Task 4 alone.

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/generation_profiles.py` | Generation profile registry | Modify — 3 profiles `frames` 105→49 |
| `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_ltx2.py` | Native LTX-2 render pipeline + denoise loop | Modify — `_DEF_FRAMES` 105→49; add `_renoise_soft_conditioned_tokens` helper; wire it into `run_native_denoise` |
| `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_conditioning.py` | i2v / continuation conditioning helpers | Modify — add `adain_normalize_latent` pure helper |
| `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_multiscene.py` | Multiscene continuation orchestration | Modify — soft-strength default, drop global anchor, wire AdaIN |
| `extensions/builtin/nexus-video-ltx23/worker/tests/test_generation_profiles.py` | Profile tests | Modify — 105→49 assertions |
| `extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_conditioning.py` | Conditioning-helper tests | Modify — add AdaIN tests |
| `extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_two_stage.py` | Denoise-pipeline tests | Modify — add seed-renoise helper tests |
| `extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_multiscene.py` | Multiscene tests | Modify — update `_scene_conditioning` signature, drop anchor test |

All commands below assume the working directory:
`extensions/builtin/nexus-video-ltx23/worker/`

---

## Task 0: Pre-flight — commit the pending `kf_full` fix

The working tree carries one uncommitted edit: `ltx2_multiscene.py` already has the `keyframe_item` → `kf_full` NameError fix (the sidecar `conditioning=` block uses `kf_full`). Commit it standalone so this plan's commits stay clean.

**Files:**
- Modify (already done in tree): `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_multiscene.py`

- [ ] **Step 1: Confirm the pending edit is only the `kf_full` fix**

Run: `git diff extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_multiscene.py`
Expected: a small diff around the `_write_render_sidecar` call referencing `kf_full` (the `"mode": "i2v" if kf_full is not None else "t2v"` line). If the diff contains anything else, stop and review.

- [ ] **Step 2: Commit it**

```bash
git add extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_multiscene.py
git commit -m "fix(048-ltxv2-enhancements): correct run_multiscene NameError (keyframe_item -> kf_full)"
```

Expected: clean commit. `git status --short` then shows only the untracked `t1.jpg` / `t2.jpg` (leave those alone — they are scratch images, not part of this plan).

---

## Task 1: Kill the dead 105-frame default

49 frames is GPU-coherent for the distilled 19B 2-stage path; 105 chromatic-blows-out. Retire 105 from `_DEF_FRAMES` and all three `ltxv2-*` profiles.

**Files:**
- Modify: `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_ltx2.py:112`
- Modify: `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/generation_profiles.py` (3 profiles: `ltxv2-distilled-q4`, `ltxv2-distilled-q4-quality`, `ltxv2-multiscene`)
- Test: `extensions/builtin/nexus-video-ltx23/worker/tests/test_generation_profiles.py`

- [ ] **Step 1: Update the failing tests first**

In `tests/test_generation_profiles.py`, change the three `frames` assertions from `105` to `49`:

```python
# in test_ltxv2_distilled_q4_retuned_for_i2v
    assert profile.render["frames"] == 49
```

```python
# in test_ltxv2_quality_profile_runs_uncond_branch
    assert profile.render["frames"] == 49
```

```python
# in test_ltxv2_multiscene_profile_drives_manual_stitch
    assert profile.render["frames"] == 49
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_generation_profiles.py -v -k ltxv2`
Expected: FAIL — three assertions `assert 105 == 49`.

- [ ] **Step 3: Update `_DEF_FRAMES`**

In `src/ltx_video_worker/pipeline_ltx2.py`, line 112:

```python
_DEF_FRAMES = 49
```

- [ ] **Step 4: Update the three profiles**

In `src/ltx_video_worker/generation_profiles.py`, change `"frames": 105` to `"frames": 49` in the `render={...}` block of `ltxv2-distilled-q4` (line ~122), `ltxv2-distilled-q4-quality` (line ~148), and `ltxv2-multiscene` (line ~175).

In the same file, update the now-stale description strings:
- `ltxv2-distilled-q4` description: change `"input image -> 105-frame 768x512 clip"` to `"input image -> 49-frame 768x512 clip"`.
- `ltxv2-multiscene` description: change `"each a 105-frame 768x512 i2v render where scene N continues scene N-1 via a 3-frame latent tail carried as a reference-latent condition"` to `"each a 49-frame 768x512 i2v render where scene N continues scene N-1 via a soft latent-overlap condition, AdaIN-normalised to scene 0"`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `pytest tests/test_generation_profiles.py -v -k ltxv2`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_ltx2.py extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/generation_profiles.py extensions/builtin/nexus-video-ltx23/worker/tests/test_generation_profiles.py
git commit -m "fix(048-ltxv2-enhancements): retire dead 105-frame default, ltxv2 -> 49 frames"
```

---

## Task 2: `adain_normalize_latent` helper

A pure helper that nudges a latent's per-channel mean/std toward a reference latent's, scaled by a blend factor. This is the drift-control mechanism — each continuation scene's grid is pulled back toward scene 0's statistics so colour/exposure does not ratchet across the chain.

**Files:**
- Modify: `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_conditioning.py`
- Test: `extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_conditioning.py`

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_ltx2_conditioning.py`:

```python
def test_adain_normalize_latent_factor_zero_is_noop() -> None:
    latent = torch.randn(1, 128, 4, 4, 6)
    reference = torch.randn(1, 128, 4, 4, 6) * 3.0 + 5.0
    out = cond.adain_normalize_latent(latent, reference, factor=0.0)
    assert torch.equal(out, latent)


def test_adain_normalize_latent_factor_one_matches_reference_stats() -> None:
    latent = torch.randn(2, 8, 3, 5, 6)
    reference = torch.randn(2, 8, 3, 5, 6) * 4.0 - 2.0
    out = cond.adain_normalize_latent(latent, reference, factor=1.0)
    dims = (0, 2, 3, 4)
    assert torch.allclose(
        out.mean(dim=dims), reference.mean(dim=dims), atol=1e-3
    )
    assert torch.allclose(
        out.std(dim=dims), reference.std(dim=dims), atol=1e-3
    )


def test_adain_normalize_latent_partial_factor_moves_toward_reference() -> None:
    latent = torch.zeros(1, 4, 2, 3, 3)
    reference = torch.ones(1, 4, 2, 3, 3) * 10.0
    out = cond.adain_normalize_latent(latent, reference, factor=0.2)
    # latent mean 0, reference mean 10 -> 0.2 blend lands strictly between.
    out_mean = float(out.mean())
    assert 0.0 < out_mean < 10.0
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_ltx2_conditioning.py -v -k adain`
Expected: FAIL — `AttributeError: module 'ltx_video_worker.ltx2_conditioning' has no attribute 'adain_normalize_latent'`.

- [ ] **Step 3: Implement the helper**

Append to `src/ltx_video_worker/ltx2_conditioning.py` (after `decay_condition_strength`):

```python
def adain_normalize_latent(
    latent: Any, reference: Any, factor: float = 0.2
) -> Any:
    """Pull ``latent``'s per-channel mean/std toward ``reference``'s.

    AdaIN drift control: each continuation scene's latent statistics are
    nudged back toward scene 0's so colour / exposure does not ratchet
    across a chain. ``factor`` 0.0 is a no-op; 1.0 fully replaces the
    statistics; 0.1-0.3 is the usable band — higher flattens intended
    lighting changes. Statistics are taken per channel (dim 1) over the
    batch / frame / spatial axes. Computed in float32 for stability,
    returned in ``latent``'s dtype.
    """
    import torch

    if factor <= 0.0:
        return latent

    dims = (0, 2, 3, 4)
    eps = 1e-5
    work = latent.to(torch.float32)
    ref = reference.to(torch.float32)
    lat_mean = work.mean(dim=dims, keepdim=True)
    lat_std = work.std(dim=dims, keepdim=True)
    ref_mean = ref.mean(dim=dims, keepdim=True)
    ref_std = ref.std(dim=dims, keepdim=True)
    normalized = (work - lat_mean) / (lat_std + eps) * ref_std + ref_mean
    out = work + factor * (normalized - work)
    return out.to(latent.dtype)
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pytest tests/test_ltx2_conditioning.py -v -k adain`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_conditioning.py extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_conditioning.py
git commit -m "feat(048-ltxv2-enhancements): add adain_normalize_latent drift-control helper"
```

---

## Task 3: Seed re-noise for soft-conditioned tokens

The load-bearing fix. A conditioning item writes its clean latent into the denoise seed and sets `denoise_mask = 1 - strength`, but never re-noises the seed. The loop then treats those tokens at `sigma * denoise_mask`. For a hard pin (`mask == 0`) the clean seed matches `token_sigma == 0`; for a soft token (`0 < mask < 1`) the seed is clean while the loop declares it noised → mismatch → melt. This task re-noises **only** the soft tokens to the rectified-flow seed `(1 - sigma0*mask)*clean + sigma0*mask*noise`, leaving hard-pin and pure-noise tokens untouched.

**Files:**
- Modify: `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_ltx2.py`
- Test: `extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_two_stage.py`

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_ltx2_two_stage.py` (the file already does `torch = pytest.importorskip("torch")` and imports the worker package — if it does not, add `import pytest`, `torch = pytest.importorskip("torch")`, and `from ltx_video_worker import pipeline_ltx2 as pl` at the top):

```python
def test_renoise_leaves_hard_and_noise_tokens_untouched() -> None:
    latent = torch.randn(1, 4, 8)
    clean = torch.randn(1, 4, 8)
    noise = torch.randn(1, 4, 8)
    # All tokens are either hard pins (mask 0) or pure noise (mask 1).
    denoise_mask = torch.tensor([[[0.0], [1.0], [0.0], [1.0]]])
    out = pl._renoise_soft_conditioned_tokens(
        latent, clean, denoise_mask, noise, sigma0=1.0
    )
    assert torch.equal(out, latent)


def test_renoise_reseeds_soft_tokens_to_declared_sigma() -> None:
    latent = torch.randn(1, 3, 8)
    clean = torch.randn(1, 3, 8)
    noise = torch.randn(1, 3, 8)
    # Token 1 is soft (mask 0.5); tokens 0 and 2 are hard pin / pure noise.
    denoise_mask = torch.tensor([[[0.0], [0.5], [1.0]]])
    out = pl._renoise_soft_conditioned_tokens(
        latent, clean, denoise_mask, noise, sigma0=1.0
    )
    # Soft token 1: (1 - 1.0*0.5)*clean + 1.0*0.5*noise.
    expected_soft = 0.5 * clean[:, 1] + 0.5 * noise[:, 1]
    assert torch.allclose(out[:, 1], expected_soft, atol=1e-5)
    # Untouched.
    assert torch.equal(out[:, 0], latent[:, 0])
    assert torch.equal(out[:, 2], latent[:, 2])
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_ltx2_two_stage.py -v -k renoise`
Expected: FAIL — `AttributeError: module 'ltx_video_worker.pipeline_ltx2' has no attribute '_renoise_soft_conditioned_tokens'`.

- [ ] **Step 3: Implement the helper**

In `src/ltx_video_worker/pipeline_ltx2.py`, add this function immediately above `def run_native_denoise(` (around line 1365):

```python
def _renoise_soft_conditioned_tokens(
    latent: Any,
    clean_latent: Any,
    denoise_mask: Any,
    noise: Any,
    sigma0: float,
) -> Any:
    """Re-noise softly-conditioned tokens to their declared noise level.

    A conditioning item writes its clean latent into ``latent`` and
    ``clean_latent`` and sets ``denoise_mask = 1 - strength``. The loop
    steps every token at ``sigma * denoise_mask``. A hard pin (mask 0)
    and a pure-noise token (mask 1) are already seed-consistent; a SOFT
    token (0 < mask < 1) is seeded clean but declared noised at
    ``sigma0 * mask`` — a mismatch that melts the overlap. This re-noises
    only the soft tokens to the rectified-flow seed
    ``(1 - sigma0*mask)*clean + sigma0*mask*noise``.
    """
    import torch

    mask = denoise_mask[..., 0]
    soft = (mask > 0.0) & (mask < 1.0)
    if not bool(soft.any()):
        return latent
    sigma_eff = (sigma0 * mask).unsqueeze(-1)
    reseeded = (
        (1.0 - sigma_eff) * clean_latent.to(torch.float32)
        + sigma_eff * noise.to(torch.float32)
    ).to(latent.dtype)
    return torch.where(soft.unsqueeze(-1), reseeded, latent)
```

- [ ] **Step 4: Wire it into `run_native_denoise`**

In `src/ltx_video_worker/pipeline_ltx2.py`, find this block inside `run_native_denoise` (around lines 1495-1500):

```python
    latent = state.latent
    positions = state.positions
    denoise_mask = state.denoise_mask.to(torch.float32)
    clean_latent = state.clean_latent
    attention_mask = state.attention_mask
    mask_flat = denoise_mask[..., 0]
```

Replace it with (adds the re-noise call after `clean_latent` is bound):

```python
    latent = state.latent
    positions = state.positions
    denoise_mask = state.denoise_mask.to(torch.float32)
    clean_latent = state.clean_latent
    attention_mask = state.attention_mask
    if has_cond:
        latent = _renoise_soft_conditioned_tokens(
            latent, clean_latent, denoise_mask, noise, sigma0
        )
    mask_flat = denoise_mask[..., 0]
```

(`noise` and `sigma0` are already defined earlier in the function — `sigma0` at the `sigma0 = float(sigmas[0])` line, `noise` at the `noise = torch.randn(...)` block. `has_cond` is already defined. No new imports.)

- [ ] **Step 5: Run the tests to verify they pass**

Run: `pytest tests/test_ltx2_two_stage.py -v -k renoise`
Expected: PASS (2 tests).

- [ ] **Step 6: Verify no regression to the existing two-stage / conditioning tests**

Run: `pytest tests/test_ltx2_two_stage.py tests/test_ltx2_conditioning.py -v`
Expected: PASS — all tests. (Hard-pin keyframe paths have `mask == 0`, so `_renoise_soft_conditioned_tokens` is a no-op for them; the GPU-proven single-clip i2v path is unchanged.)

- [ ] **Step 7: Commit**

```bash
git add extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_ltx2.py extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_two_stage.py
git commit -m "fix(048-ltxv2-enhancements): re-noise soft-conditioned tokens to declared sigma"
```

---

## Task 4: Soft-overlap default + drop global anchor + wire AdaIN

Flip the multiscene continuation default from a near-hard pin (0.9) to a soft, re-denoisable overlap (0.5); remove the global anchor (a `VideoConditionByReferenceLatent` append that the bare distilled transformer does not meaningfully attend to without an IC-LoRA); and AdaIN-normalize every continuation scene's latent toward scene 0.

**Files:**
- Modify: `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_multiscene.py`
- Test: `extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_multiscene.py`

- [ ] **Step 1: Update the failing tests first**

In `tests/test_ltx2_multiscene.py`:

Replace `test_scene_0_conditioning_uses_keyframe_per_stage` with:

```python
def test_scene_0_conditioning_uses_keyframe_per_stage() -> None:
    kf_stage1, kf_stage2 = object(), object()
    stage1, stage2 = ms._scene_conditioning(
        0, kf_stage1, kf_stage2, None, 0.5
    )
    assert stage1 == [kf_stage1]
    assert stage2 == [kf_stage2]
```

Replace `test_scene_0_conditioning_empty_without_keyframe` with:

```python
def test_scene_0_conditioning_empty_without_keyframe() -> None:
    stage1, stage2 = ms._scene_conditioning(0, None, None, None, 0.5)
    assert stage1 == []
    assert stage2 == []
```

Replace `test_continuation_scene_carries_tail_and_global_anchor` with:

```python
def test_continuation_scene_carries_tail_only() -> None:
    from ltx_core.conditioning.types.latent_cond import (
        VideoConditionByLatentIndex,
    )

    tail = torch.randn(1, 128, 2, 4, 6)
    stage1, stage2 = ms._scene_conditioning(1, None, None, tail, 0.5)
    # Continuation scene carries exactly one condition — the soft tail.
    assert len(stage1) == 1
    assert stage2 == []
    assert isinstance(stage1[0], VideoConditionByLatentIndex)
    assert stage1[0].latent_idx == 0
    assert stage1[0].latent is tail
    assert stage1[0].strength == 0.5


def test_default_continuation_strength_is_soft() -> None:
    # Guard against regressing to the hard near-clean pin.
    assert ms._DEF_CONTINUATION_STRENGTH == 0.5
    assert ms._DEF_CONTINUATION_STRENGTH < 0.9
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pytest tests/test_ltx2_multiscene.py -v`
Expected: FAIL — `_scene_conditioning` still takes 7 positional args; `ms._DEF_CONTINUATION_STRENGTH` does not exist.

- [ ] **Step 3: Replace the module constants**

In `src/ltx_video_worker/ltx2_multiscene.py`, replace lines 38-44:

```python
# Low-weight anchor to scene-0's first latent frame — caps cumulative
# colour / identity drift across a 3-scene chain without freezing motion
# (spec 048 D12 / R1).
_GLOBAL_ANCHOR_STRENGTH = 0.15
# Pixel frames of the prior scene handed to `apply_seam` as the colour /
# overlap reference.
_SEAM_PREV_TAIL = 16
```

with:

```python
# Soft-overlap continuation strength. The carried latent tail conditions
# the next scene at denoise_mask = 1 - strength; ~0.5 leaves the overlap
# re-denoisable under the new prompt instead of hard-pinning old content.
_DEF_CONTINUATION_STRENGTH = 0.5
# AdaIN blend factor — pulls each continuation scene's latent statistics
# toward scene 0's to cap colour / exposure drift across the chain.
_ADAIN_FACTOR = 0.2
# Pixel frames of the prior scene handed to `apply_seam` as the colour /
# overlap reference.
_SEAM_PREV_TAIL = 16
```

- [ ] **Step 4: Rewrite `_scene_conditioning`**

In `src/ltx_video_worker/ltx2_multiscene.py`, replace the whole `_scene_conditioning` function (lines 116-150) with:

```python
def _scene_conditioning(
    scene_index: int,
    keyframe_stage1: Any | None,
    keyframe_stage2: Any | None,
    prev_tail: Any | None,
    condition_strength: float,
) -> tuple[list[Any], list[Any]]:
    """Build ``(stage1, stage2)`` conditioning item lists for one scene.

    Scene 0 anchors to the i2v keyframe — ``keyframe_stage1`` conditions
    the (half-res) stage-1 pass, ``keyframe_stage2`` the full-res refine.
    Scene N>0 carries the prior scene's stage-1 tail as a soft overlap
    (``build_continuation_condition`` at ``condition_strength`` ~0.5): the
    overlap latent frames are re-denoised under the new prompt rather than
    hard-pinned. The refine needs no condition — continuity is carried in
    the upsampled latent. With the single-stage path ``keyframe_stage1 ==
    keyframe_stage2`` and only the stage-1 list is used.
    """
    if scene_index == 0:
        s1 = [keyframe_stage1] if keyframe_stage1 is not None else []
        s2 = [keyframe_stage2] if keyframe_stage2 is not None else []
        return s1, s2
    s1: list[Any] = []
    if prev_tail is not None:
        s1.append(
            cond.build_continuation_condition(prev_tail, condition_strength)
        )
    return s1, []
```

- [ ] **Step 5: Soften the `condition_strength` default and drop the anchor resolve**

In `run_multiscene`, replace lines 286-303:

```python
    # Continuation is a latent-frame replace (build_continuation_condition):
    # the carried tail frames ARE the new scene's opening frames, so the
    # strength is held near-clean (0.9) — the 0.5 append-reference default
    # left the overlap half-denoised. Two tail frames anchor continuity
    # without over-pinning the new scene's opening motion.
    condition_strength = pl._coerce_float(
        advanced.get("condition_strength")
        or render_block.get("condition_strength"),
        0.9,
    )
    tail_frames = pl._coerce_int(
        advanced.get("condition_tail_frames")
        or render_block.get("condition_tail_frames"),
        2,
    )
    use_global_anchor = bool(
        render_block.get("global_anchor", render_block.get("color_anchor", True))
    )
```

with:

```python
    # Soft latent-overlap continuation: the carried tail conditions the
    # next scene at denoise_mask = 1 - strength, so ~0.5 lets the overlap
    # be re-denoised under the new prompt. A near-clean pin (0.9) carries
    # the old prompt's content fingerprint and the 8-step distilled
    # schedule cannot reconcile it on a prompt change.
    condition_strength = pl._coerce_float(
        advanced.get("condition_strength")
        or render_block.get("condition_strength"),
        _DEF_CONTINUATION_STRENGTH,
    )
    tail_frames = pl._coerce_int(
        advanced.get("condition_tail_frames")
        or render_block.get("condition_tail_frames"),
        2,
    )
```

- [ ] **Step 6: Rewrite the scene loop — drop the anchor, wire AdaIN**

In `run_multiscene`, replace the loop block (lines 322-351, from `grids: list[Any] = []` through `grids.append(grid.to("cpu"))`):

```python
    grids: list[Any] = []
    try:
        prev_tail = None
        anchor_latent = None
        for i, scene in enumerate(scenes):
            if rs.cancelled:
                raise RuntimeError("render cancelled by user")
            stage1, stage2 = _scene_conditioning(
                i, keyframe_stage1, kf_full, prev_tail, anchor_latent,
                condition_strength, use_global_anchor,
            )
            scene_geo = _scene_geometry(geometry, scene["num_frames"])
            if two_stage:
                grid, grid_tail = await asyncio.to_thread(
                    pl.run_two_stage_denoise,
                    rs.pipe, scene_embeds[i], scene_geo, samp,
                    scene["seed"], None, worker.logger,
                    upsampler, vae_encoder, stage1, stage2,
                )
            else:
                grid = await asyncio.to_thread(
                    pl.run_native_denoise,
                    rs.pipe, scene_embeds[i], scene_geo, samp,
                    scene["seed"], None, worker.logger, stage1,
                )
                grid_tail = grid
            prev_tail = cond.extract_tail_latent(grid_tail, tail_frames)
            if i == 0:
                anchor_latent = grid_tail[:, :, :1, :, :].contiguous()
            grids.append(grid.to("cpu"))
```

with:

```python
    grids: list[Any] = []
    try:
        prev_tail = None
        scene0_full = None
        scene0_stage1 = None
        for i, scene in enumerate(scenes):
            if rs.cancelled:
                raise RuntimeError("render cancelled by user")
            stage1, stage2 = _scene_conditioning(
                i, keyframe_stage1, kf_full, prev_tail, condition_strength,
            )
            scene_geo = _scene_geometry(geometry, scene["num_frames"])
            if two_stage:
                grid, grid_tail = await asyncio.to_thread(
                    pl.run_two_stage_denoise,
                    rs.pipe, scene_embeds[i], scene_geo, samp,
                    scene["seed"], None, worker.logger,
                    upsampler, vae_encoder, stage1, stage2,
                )
            else:
                grid = await asyncio.to_thread(
                    pl.run_native_denoise,
                    rs.pipe, scene_embeds[i], scene_geo, samp,
                    scene["seed"], None, worker.logger, stage1,
                )
                grid_tail = grid
            # AdaIN every continuation scene back toward scene 0's latent
            # statistics so colour / exposure does not ratchet down the
            # chain; scene 0 is the reference and is left untouched.
            if i == 0:
                scene0_full = grid
                scene0_stage1 = grid_tail
            else:
                grid = cond.adain_normalize_latent(
                    grid, scene0_full, _ADAIN_FACTOR
                )
                if two_stage:
                    grid_tail = cond.adain_normalize_latent(
                        grid_tail, scene0_stage1, _ADAIN_FACTOR
                    )
                else:
                    grid_tail = grid
            prev_tail = cond.extract_tail_latent(grid_tail, tail_frames)
            grids.append(grid.to("cpu"))
```

- [ ] **Step 7: Record AdaIN in the render sidecar**

In `run_multiscene`, find the `conditioning={...}` dict passed to `pl._write_render_sidecar` (around lines 485-492) and add one entry after `"condition_tail_frames": tail_frames,`:

```python
            "adain_factor": _ADAIN_FACTOR if scene_count > 1 else 0.0,
```

- [ ] **Step 8: Run the multiscene tests to verify they pass**

Run: `pytest tests/test_ltx2_multiscene.py -v`
Expected: PASS — including the new `test_continuation_scene_carries_tail_only` and `test_default_continuation_strength_is_soft`.

- [ ] **Step 9: Commit**

```bash
git add extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/ltx2_multiscene.py extensions/builtin/nexus-video-ltx23/worker/tests/test_ltx2_multiscene.py
git commit -m "feat(048-ltxv2-enhancements): soft-overlap multiscene continuation + latent AdaIN"
```

---

## Task 5: Full suite verification + GPU validation handoff

**Files:** none — verification only.

- [ ] **Step 1: Run the full worker test suite**

Run: `pytest -q`
Expected: PASS — all tests green (the checkpoint baseline was 349 worker tests; this plan adds 7 and modifies ~6, so expect ~356 passing). If any unrelated test fails, investigate before proceeding — do not edit unrelated tests to force green.

- [ ] **Step 2: Lint the changed files**

Run: `ruff check src/ltx_video_worker/ltx2_multiscene.py src/ltx_video_worker/ltx2_conditioning.py src/ltx_video_worker/pipeline_ltx2.py src/ltx_video_worker/generation_profiles.py`
Expected: no errors. Fix any that appear (typically unused-import if a symbol was removed).

- [ ] **Step 3: Confirm the global-anchor symbol is fully gone**

Run: `git grep -n "use_global_anchor\|_GLOBAL_ANCHOR_STRENGTH\|anchor_latent" extensions/builtin/nexus-video-ltx23/worker/src`
Expected: no matches. (`build_reference_condition` in `ltx2_conditioning.py` may remain — it is unused by multiscene now but still has unit-test coverage; leave it, removing it is out of scope.)

- [ ] **Step 4: Commit any lint fixes**

If Step 2 produced fixes:

```bash
git add -A extensions/builtin/nexus-video-ltx23/worker/src
git commit -m "chore(048-ltxv2-enhancements): lint sweep for soft-overlap changes"
```

If no fixes were needed, skip this step.

- [ ] **Step 5: GPU validation (manual — operator runs on RTX 5070 Ti)**

This cannot run in the implementation session. Hand off to the operator with these instructions:

Run the multiscene e2e harness (`.tmp_e2e_nuns.py` — the rewritten harness from the prior debug session) with a **3-scene, distinct-per-scene-prompt** plan at 49 frames/scene, two-stage on. Output lands under `C:\Users\lazar\.nexus\_ltxv2_multiscene_e2e\`.

Score every render on the checkpoint's 4-axis rubric from the **full contact sheet** (head/mid/tail strips — never verdict from 3 sampled frames):
- **Motionness** — up is good
- **Deformations** — down is good (the prompt-change faceting / figure multiplication)
- **Smudginess** — down is good
- **Staticness** — down is good

Pass criteria for this plan: scenes 1 and 2 are **coherent** (no angular faceting, no figure multiplication) under distinct per-scene prompts, and colour does not visibly ratchet from scene 0 → scene 2. That is the bug-#3 fix.

If scenes 1-2 are coherent but **static / under-moving**, that is the expected next tuning axis — try `condition_strength` 0.4 and/or `tail_frames` 2→1 via the plan's `advanced` overrides (no code change needed; both are already plumbed). If scenes 1-2 still face/multiply at strength 0.5, drop to 0.35 before concluding the soft-overlap approach is insufficient.

---

## Risks & Tradeoffs

- **Soft strength without the seed re-noise regresses.** Task 3 must ship with Task 4. A soft `condition_strength` on a clean, un-renoised seed is the exact "half-denoised overlap" the team already saw and (wrongly) rejected. The plan commits Task 3 first; do not GPU-test between Task 3 and Task 4.
- **AdaIN factor is a flatten/drift tradeoff.** 0.2 is the findings-doc long-form default. Too high flattens intended lighting changes; too low lets colour ratchet. It is plumbed as `_ADAIN_FACTOR`; if scene-2 colour still drifts, raise toward 0.3 — if lighting looks flat, lower toward 0.1.
- **`build_reference_condition` becomes unused by multiscene.** It is left in place (still unit-tested). Removing it and the broken append-anchor concept entirely is a separate cleanup, out of scope here.
- **`decay_condition_strength` stays dead.** Per-frame strength ramping needs a per-token mask, which `VideoConditionByLatentIndex` (one scalar strength) does not support. Wiring it is a larger change (a custom per-token conditioning item) and is deferred — it addresses the static-opener artifact, not the prompt-change bug this plan targets.
- **No automated GPU test.** The unit tests cover the pure surface (AdaIN math, the re-noise helper, conditioning-list shape, profile values). The actual prompt-change-coherence claim is only provable on the RTX 5070 Ti — Task 5 Step 5.
- **GGUF numerics.** The stack is a 19B distilled GGUF dequantized to bf16 — an unverified port vs the official safetensors `ltx-core` path. The plan's changes are dtype-agnostic (AdaIN computes in float32, the re-noise preserves `latent.dtype`), but if boundary artefacts persist after a clean GPU pass, quantization is the next suspect to rule out.

---

## Self-Review

**Spec coverage** — research takeaways → tasks:
- #2 soften the pin / #3 real overlap → Task 4 (`_DEF_CONTINUATION_STRENGTH = 0.5`); overlap count `tail_frames` already ~1/3 of 7 latent frames, left at the existing default.
- #5 latent AdaIN → Task 2 + Task 4 Step 6.
- #8 fix `_DEF_FRAMES` 105→49 → Task 1.
- #9 re-test/remove the broken anchor → Task 4 (removed; AdaIN replaces its intent).
- Seed-renoise (the load-bearing correctness fix that makes soft overlap work at all) → Task 3.
- #4 wire `decay_condition_strength` → explicitly deferred (Risks) — needs per-token strength, out of scope.
- #6 don't add STG / #7 don't chase IC-LoRA → honoured by omission; no STG, no LoRA in this plan.
- #1 don't adopt Solution B as default → honoured; the plan keeps and fixes the latent-tail path.

**Placeholder scan** — no TBD / "handle edge cases" / "similar to Task N"; every code step shows full code.

**Type consistency** — `adain_normalize_latent(latent, reference, factor)` defined Task 2, called Task 4 Step 6 with `_ADAIN_FACTOR`. `_renoise_soft_conditioned_tokens(latent, clean_latent, denoise_mask, noise, sigma0)` defined Task 3 Step 3, called Task 3 Step 4 with matching args. `_scene_conditioning` 5-arg signature defined Task 4 Step 4, called Task 4 Step 6 with 5 args, tested Task 4 Step 1 with 5 args — consistent. `_DEF_CONTINUATION_STRENGTH` / `_ADAIN_FACTOR` defined Task 4 Step 3, used Steps 5/6/7 and tested Step 1.
