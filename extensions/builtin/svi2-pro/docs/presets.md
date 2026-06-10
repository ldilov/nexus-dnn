# svi2-pro — Render Presets

Source of truth: `data/render_presets.json`. Each preset's `params` map 1:1 to
`validate_render_params` keys (see [fields.md](fields.md)). Presets are
UI-selectable starting points; every field stays individually nudgeable after a
preset is applied.

## The canonical family (recommended)

These implement the reference-faithful **SVI 2.0 Pro** chaining that holds
subject identity across a long chain: raw previous-clip latent handoff
(`pixel_re_encode: false`), clean concat+overlap-trim stitching
(`stitch_mode: "trim"`), no ref-pad crutch, no AdaIN. Identity holds via the
anchor latent + raw motion latent + the error-recycling SVI LoRA. Use ONE
prompt across all clips and keep appearance-change verbs OUT of it — the anchor
defines identity, the prompt drives MOTION.

| Preset | Resolution | In-distribution? | Use when |
|---|---|---|---|
| **`svi-canonical`** | 832×480 | ✅ trained 480p budget | Default. Best identity stability. **Validated 2026-06-05 (5×69f run): demonic-nun identity held across the whole take.** |
| `svi-canonical-704` | 704×400 | ⚠️ one step down (~0.7× budget) | Faster / less VRAM, mild drift risk. Fires the resolution warning. |
| `svi-canonical-640` | 640×368 | ⚠️ two steps down (~0.6× budget) | Fast preview / iteration. Weakest identity-lock — drift may resurface. Not for final renders. |

All three: 6 clips × 85f (overlap 5) → 485f @16fps → RIFE 48 = **30.3 s** (85f ≈ 5.3 s per segment);
50 steps, cfg 4.0, sigma_shift 5.0, switch 0.9, swap 40.

**Length scaling:** stitched frames = `frames_per_clip + (num_clips-1) × (frames_per_clip - num_overlap_frame)`. Raise `num_clips` for a longer take (one prompt, identity holds).

**Resolution rule:** the SVI LoRA was trained at the 480p budget (832×480 /
480×832, ~399k px). Anything off that budget weakens identity restoration and
fires an off-distribution warning in the worker log + render_report. Above the
drifting 960×544 you already saw collapse; below 480p the lock weakens. Stay at
832×480 unless you accept the trade.

## Natural family (vanilla Wan2.2-I2V, no SVI canonical discipline)

These predate the canonical fix and keep `pixel_re_encode: true` + crossfade.
They produce coherent *motion* but can drift identity over many clips. Kept for
A/B and for short (≤3 clip) renders where drift is not yet visible.

| Preset | Notes |
|---|---|
| `natural-reference` | 832×480, 3 clips, light AdaIN 0.1 + pixel re-encode. Baseline vanilla look. |
| `natural-rife48` | `natural-reference` + RIFE to 48 fps (smooth playback, no speed-up). |
| `natural-reference-lowvram` | Same, `blocks_to_swap=40` for 16 GB cards. |
| `natural-rife48-lowvram` | RIFE variant for 16 GB. |

## Diagnostic / specialty

| Preset | Purpose |
|---|---|
| `forced-motion-24` | Over-driven RoPE motion ramp + 24 fps + strong AdaIN, fewer steps. Exaggerated/uncanny motion. **Diagnostic only** — `motion_scale > 1.5` deforms past training. |
| `forced-motion-24-lowvram` | Same, 16 GB. |
| `flf2v-morph-lowvram` | First-last-frame morph: animates `--ref-image` → `--last-image` over one seamless clip (no chaining seam). Pin an edited end keyframe; the model interpolates. 960×544, single clip. |
| `chained-single-prompt-lowvram` | Long take via ONE prompt + crossfade seams (pre-canonical). Superseded by `svi-canonical` for identity; kept for the crossfade-stitch look. |

## Environment levers (not preset params — operator env)

Set these in the shell, not the preset:

- `SVI2_FP8_COMPUTE=bf16` — Blackwell `torch._scaled_mm` colour-smudge fix. **Recommended on RTX 50.**
- `SVI2_ATTENTION=flash2` — attention backend (`flash2` recommended; `sdpa` fallback). flash_attn is NOT optional per SVI tips — mouth/16 s artifacts without it.

## Transformation (edit-then-animate)

To transform appearance (not just animate), do NOT use ICN or
appearance-change prompts (they drift). Instead edit the **anchor keyframe**
first, then animate it — the video model propagates the edit coherently:

- `--qwen-edit-prompt "<edit>"` on the smoke runs Qwen-Image-Edit-2509 on
  `--ref-image` before the SVI render. See [fields.md](fields.md#qwen-anchor-edit).
- Or use `flf2v-morph-lowvram` with an edited `--last-image` for an on-screen
  start→end morph.
