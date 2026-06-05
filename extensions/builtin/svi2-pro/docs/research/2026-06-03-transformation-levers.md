# SVI2-Pro — Unchecked Levers for Prompt-Driven Transformation i2v

**Date:** 2026-06-03
**Branch:** `feat/svi2-attention-fp8-pipeline-knobs`
**Method:** 5 parallel web-research passes (sampling theory / Wan2.2 architecture / conditioning-control / long-video coherence / community empirics), reconciled against the actual `pipeline_svi2.py` source.

---

## The problem, restated

Wan2.2-I2V-A14B + SVI long-video LoRA identity-LOCKS to the reference. Prompts barely transform the subject (nun → demonic: black eyes, veins, cracks). Pushing transformation either does nothing or, past a ceiling, swaps the subject entirely. Our `image_cond_noise_scale` (ICN) ceilings at ~0.45 before subject-swap.

## Root cause (cross-agent consensus)

Image conditioning is architecturally **higher-bandwidth** than text. In a generic Wan2.2-i2v there are TWO identity channels:
1. VAE concat-latent `y` (ref encoded → concatenated with noisy latents + mask) — spatial, per-step.
2. CLIP-vision embed (`encoder_hidden_states_image`) — semantic, via cross-attention.

**Pipeline reconciliation (verified in source):** our worker calls the DiT with `clip_feature=None` (`pipeline_svi2.py:287,292`). **Channel 2 is OFF.** So our identity-lock comes entirely from channel 1 (`y`, built by `build_conditioning_latents`), which is exactly what ICN noises. That explains the hard ICN ceiling: we are attacking the only identity channel we have, and beyond ~0.45 the anchor is too corrupted to sample coherently → swap.

**Implication:** the "scale the CLIP embed" lever (high value in a generic pipeline) is **N/A for us** unless we re-enable `clip_feature`. Our real headroom is sampler-side guidance, the edit-then-animate reframe, SVI-LoRA asymmetry, and the coherence levers.

---

## TIER 1 — Real, unchecked, high-value, applies to our pipeline

### 1. Edit-then-animate (keyframe edit → i2v) — HIGHEST LEVERAGE
**Agreed #1 by 2 of 5 agents (conditioning + community), #3 by a third.**
Stop fighting the sampler. Pre-edit the ref into the *transformed state* with an image-edit model (FLUX.1-Kontext or Qwen-Image-Edit 2509/2512: "keep face structure + habit, make eyes solid black, dark veins from eye sockets, pale cracked skin"), then i2v the edited frame. Now identity-lock works **for** us — the model animates black eyes/veins instead of refusing to invent them. Subject-swap disappears because the appearance is baked into the conditioning image, not extracted from the prompt.
- Multi-clip progression: edit refs at 30 / 60 / 90 % transformation, one per clip → smooth ramp.
- **Effort:** LOW for one-shot (zero worker code — just point `--ref-image` at the edited frame). MED to automate per-clip (`per_clip_ref_images` list + re-encode anchor per clip, ~15 lines).
- **Why it works:** image-channel bandwidth dominates text; give it an already-transformed signal and maximizing the anchor (low ICN, strong) becomes *desirable*.
- Refs: AnyV2V (arXiv 2403.14468), IF-V2V (2509.21917), I2VEdit (SIGGRAPH Asia 2024), FLUX.1-Kontext, Qwen-Image-Edit. Community-confirmed Qwen-Edit→FLF2V workflow on RunComfy.
- **This is the recommended first experiment. Validatable in under 2h with existing hardware.**

### 2. ALG — Adaptive Low-Pass Guidance
**Surfaced independently by 3 of 5 agents. Wan2.1 AND Wan2.2 validated, training-free.**
Low-pass-filter the reference latent during the first ~10 % of denoising steps, then restore full detail. Kills "conditional image leakage" (the model shortcutting onto ref high-freq detail in step 1, pre-collapsing the trajectory before the prompt can steer). +36 % dynamic degree on VBench-I2V, identity drop <0.3 %.
- **Effort:** LOW–MED. In `_build_image_conditioning`/anchor build, blur `anchor_lat` (bilinear down-up or gaussian) while `step/total < t_trans` (default 0.1), then unfiltered. Code: `github.com/choi403/ALG` (`pipeline_wan_image2video_lowpass.py`).
- **Note:** ALG and ICN attack the same root (over-conditioning on `y`) via different mechanisms — test ALG **separately** first; they may interact.
- Ref: arXiv 2506.08456 (CVPR 2026 Highlight).

### 3. SLG / STG — Skip-Layer / Spatiotemporal-Skip Guidance
**Agents 1 + 5. Kijai-native (`WanVideoSLG`), community calls it "a game-changer."**
Build an implicit weak model by skipping select DiT blocks on one CFG branch, then push away from it. Sharpens prompt adherence **without** the motion-collapse that high CFG causes.
- **Settings:** blocks `"9"` or `"10"`, start_percent 0.1, end_percent 1.0, scale 0.5–1.5.
- **Effort:** LOW–MED (a few lines wrapping the denoiser call; main cost = grid-searching which of our 40 blocks to skip per expert). Reference impl: Kijai commit `8ac0da07`, LTXVideo `stg.py`.
- Ref: STG arXiv 2411.18664 (CVPR 2025).

### 4. NAG — Normalized Attention Guidance
**Agents 1 + 5. Validated on Wan2.1-I2V. Kijai-native (`WanVideoApplyNAG`).**
Makes negative prompts actually repel in attention-feature space — works even at CFG 1.0 / distilled, where our negatives are currently dead weight. Negative `"unchanged appearance, static, normal human face, clear eyes"` to actively suppress the identity attractor.
- **Settings:** nag_scale 11, nag_tau 2.5, nag_alpha 0.25.
- **Effort:** MED (attention hook in the DiT forward to extrapolate + L1-normalize uncond features).
- Ref: arXiv 2505.21179 (NeurIPS 2025).

### 5. Per-expert differential CFG (high-noise ≫ low-noise)
**Agent 2. Wan2.2-specific, near-zero cost.**
The high-noise expert (t>0.9) owns structure/transformation; low-noise owns identity/detail. Run a high CFG on the high-noise pass (push the transformation) and a soft CFG on the low-noise pass (avoid overcook + reduce identity over-lock). e.g. cfg_high=7.0, cfg_low=3.0.
- **Effort:** LOW — we already track `switch_boundary`; split the single `cfg_scale` into two and apply at the boundary (~3 lines). Compose with a small `switch_boundary` shift (0.9→0.93–0.95) to give the transformation expert more steps.

### 6. SVI-LoRA asymmetry / detach on the transformation clip
**Agent 2 #1. Single-render diagnostic, LOW effort.**
SVI's identity-reinforcement concentrates in the low-noise refinement pass. Try SVI alpha=0 on the LOW expert (keep HIGH for motion continuity), or detach SVI entirely on the transformation clip (rely on tail-frame continuity from `prev_samples`). Answers "is SVI itself the dominant lock?" in one render.
- **Effort:** LOW (`apply_lora(model_low, svi, alpha=0.0)` for that clip).

### 7. CFG-Zero* (flow-match trajectory fix)
**Agent 1 #3. Validated on Wan2.1. Lowest-risk math change.**
Per-step optimal guidance scalar α\* + zero-init the first 1–2 steps. Fixes early-step velocity-field error in flow-matching, letting the same transformation land at a *lower* nominal CFG → less swap risk. Zero-init also protects the structured (tail-conditioned) init of continuation clips.
- **Effort:** LOW (sampler math only, ~5 lines). Composes with everything. Code: `github.com/WeichenFan/CFG-Zero-star`.

### 8. Prompt travel — per-step / per-clip embedding switch
**Agents 1, 3, 5 (incl. Prompt Relay, arXiv 2604.10030, Wan2.2-supported).**
Use the identity embedding at high-noise steps (structure), switch to the transformation embedding at low-noise steps (texture); and/or lerp `context_posi` from identity→transform across clips. Routes "who" and "what changes" to the denoising phases that own them.
- **Effort:** LOW for per-clip lerp / per-step switch (~5–15 lines); MED–HIGH for full Prompt Relay attention routing.

---

## TIER 2 — Coherence levers (multi-clip drift, not transformation)

### 9. Noisy context conditioning on the motion tail — coherence #1, 1 line
**Agent 4 #1.** We feed a *perfectly clean* pixel re-encode as continuation context, but SVI's error-recycling LoRA was trained to *correct* slightly-degraded context. Add σ≈0.05–0.12 noise to the motion latents before they become the next clip's anchor — better matches training, cuts clip-3+ escalation. Does NOT block transformation (slightly loosens the prior-clip lock). Try σ ∈ {0.03, 0.07, 0.12}. Refs: HiAR 2603.08703, FAR 2503.19325.

### 10. Hamming / cosine latent overlap blend at seams — LOW
**Agent 4 #2.** We already hold `num_overlap_frame=4`. Blend them in latent space with a Hamming taper instead of a hard pixel cut → kills colour/brightness seam jumps. Pure post-process, ~30 lines, transformation-neutral. Refs: Gen-L-Video 2305.18264, Overlapping Co-Denoising 2511.03272.

### 11. RIFLEx 2× single-pass — fewer seams, 1-line RoPE change
**Agent 4.** Reduce the temporal RoPE intrinsic frequency to extrapolate to ~162 frames (10s) in ONE pass (training-free at 2×). Folds 2 clips into 1 → removes a seam + an error-accumulation event. Verify quality at 120f first. Ref: RIFLEx arXiv 2502.15894 (ICML 2025).

### 12. Dual-ref + per-clip anchor decay — directly tunes the conflict
**Agent 4 #3.** Make the reference-anchor weight a per-clip schedule (`[1.0, 0.6, 0.3]`): strong early (lock identity), weaker late (let transformation through while tail-continuity holds the thread). The one lever that *designs* the coherence-vs-transformation tradeoff instead of fighting it. MED. Refs: FlashI2V 2509.25187.

### 13. AdaIN → exponential global mean/var carry — LOW
**Agent 4.** Upgrade shipped AdaIN: carry an EMA of all prior-clip latent stats (not just clip N-1), optionally histogram-match low-freq colour only so legitimate transformation colour shifts survive.

---

## NOT recommended / N/A for us

- **Scale CLIP-vision embed (`encoder_hidden_states_image`)** — N/A: our pipeline runs `clip_feature=None`. Would require re-enabling channel 2 first.
- **IP-Adapter latent-scale knob** — mathematically adjacent to ICN; same ceiling, marginal.
- **ControlNet / Fun-Control / VACE / Fun-Inpaint** — different checkpoints, not SVI-LoRA-compatible for multi-clip; HIGH infra. VACE face-mask *post-pass* is the only viable variant (surgical face-region transform, composite outside mask) but needs a second model + ~28 GB.
- **Focal Guidance** — strongest match to the mechanism but no code release; HIGH research cost.
- **FramePack / TTC inverted sampling** — anchors hard to the *original* state → actively fights the desired transformation. Good only for pure identity preservation.
- **Dynamic thresholding / FreeInit** — image-space / U-Net-era; FreeInit measurably *hurts* Wan dynamic degree.

---

## Recommended experiment ladder (cheapest → deepest)

1. **Edit-then-animate one-shot** (lever 1) — FLUX.1-Kontext/Qwen-Edit the ref, i2v with ICN≈0, existing pipeline. Zero code. If this lands the look, it reframes the whole effort.
2. **In parallel, ship the free coherence wins:** noisy context σ (9), Hamming seam blend (10), EMA AdaIN (13).
3. **CFG-Zero\* (7) + per-expert CFG (5) + switch_boundary shift** — all low-risk sampler edits, compose.
4. **ALG (2)** — separately from ICN; compare against the current ICN-ceiling render (this run, `nun_icn_universal.mp4`).
5. **SLG (3) + NAG (4)** — prompt-amplification stack on top.
6. **SVI-LoRA detach diagnostic (6)** — one render, tells us how much of the lock is SVI vs base.
7. If still walled: **per-clip ref-anchor decay (12)** + **prompt travel/Prompt Relay (8)**, then consider re-enabling `clip_feature` to unlock channel-2 levers.

## Open verification items
- Confirm `build_conditioning_latents` is the sole identity channel (it is, given `clip_feature=None`) — gate ALG/ICN interaction tests on that.
- ALG t_trans likely needs tuning UP (0.2–0.3) for us since clips are tail-conditioned, not static-image-conditioned.
- SLG/STG + Focal-Guidance both need a per-block grid search; no published Wan2.2 layer indices.

## Source index
ALG 2506.08456 · STG 2411.18664 · CFG-Zero* 2503.18886 · NAG 2505.21179 · APG 2410.02416 · Focal Guidance 2601.07287 · FlashI2V 2509.25187 · RIFLEx 2502.15894 · FreeNoise 2310.15169 · Overlapping Co-Denoising 2511.03272 · HiAR 2603.08703 · FAR 2503.19325 · Prompt Relay 2604.10030 · AnyV2V 2403.14468 · IF-V2V 2509.21917 · SVI 2510.09212 · Kijai WanVideoWrapper (SLG/NAG nodes) · choi403/ALG · WeichenFan/CFG-Zero-star.
