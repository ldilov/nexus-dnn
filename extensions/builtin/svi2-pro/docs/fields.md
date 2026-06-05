# svi2-pro — Render Fields Reference (UI exposure)

Every field accepted by `validate_render_params` (worker render params) plus the
gpu_smoke-level Qwen edit + environment levers. Defaults are the worker defaults;
presets ([presets.md](presets.md)) override a subset. `*` = required.

Legend — **UI tier**: `core` (always shown), `quality`, `coherence`,
`identity` (advanced), `motion` (advanced), `transform`, `perf`, `distill`,
`repro`, `env`.

---

## Core inputs

| Field | Type | Default | UI | What it does / nudge guidance |
|---|---|---|---|---|
| `ref_image_path` * | path | — | core | The i2v anchor/first frame. **Defines identity** — re-injected into every clip. Use a high-quality, aspect-matched image. For transformation, supply an *edited* keyframe here (edit-then-animate). |
| `prompts` * | string[] | — | core | One entry per clip (cycled if fewer). **Use a single prompt** for a coherent long take. Describe **MOTION**, not appearance change — appearance verbs ("eyes deepening") fight the anchor and cause drift. |
| `negative_prompt` | string | Wan default (CN) | quality | Standard Wan negative. Rarely changed. |
| `num_clips` | int | len(prompts) | core | Number of chained clips = length. Stitched frames = `frames_per_clip + (num_clips-1)×(frames_per_clip-num_overlap_frame)`. |
| `frames_per_clip` | int (4n+1) | 81 | core | Frames per clip. **Must be 4n+1** (49, 65, 69, 81). 69 → 20 s at 5 clips. Bigger = longer clip + more VRAM at decode. |
| `width` / `height` | int (÷16) | 480 / 832 | core | Render resolution. **832×480 (landscape) or 480×832 (portrait) = trained 480p budget.** Off-budget fires a warning and weakens identity-lock (see [presets.md](presets.md) resolution rule). Both must be divisible by 16. |
| `fps` | int | 15 | core | Native render fps (playback speed). 16 is the SVI clip rate. |
| `output_path` | path | out.mp4 | core | Output mp4. RIFE variant written as `<stem>_<interpolate_fps>fps.mp4`. |
| `models_dir` | path | models | core | Weights root (DiT fp8 + SVI LoRAs + vae + text encoder). |
| `device` | str | auto | perf | `cuda` / `cpu`. Auto-detects. |

## Frame interpolation (smooth high-fps)

| Field | Type | Default | UI | Notes |
|---|---|---|---|---|
| `interpolate_fps` | int | 0 | core | Post-render target fps (adds in-between frames, **no speed-up**). 0/≤fps = off. 48 from 16 = ×3. |
| `interpolate_method` | str | rife | quality | `rife` (auto: torch IFNet on CUDA → ncnn bin → ffmpeg), `rife_torch`, `rife_ncnn`, `ffmpeg`. |
| `rife_bin` / `rife_model` / `rife_weights` | path | — | quality | Optional rife-ncnn-vulkan binary / model / flownet.pkl. Auto-downloads torch weights if unset. |

## Sampling / quality

| Field | Type | Default | UI | What it does / nudge guidance |
|---|---|---|---|---|
| `num_inference_steps` | int | 50 | quality | Denoise steps/clip. 50 = SVI reference. Fewer = faster/lower quality. Distilled models use 4–8 with `fixed_sigmas`. |
| `cfg_scale` | float | 5.0 | quality | Guidance. SVI reference = 4.0. Higher = stronger prompt/text adherence (range ~1–6). Distilled = 1.0. cfg=1.0 skips the negative pass (≈2× faster). |
| `sigma_shift` | float | 5.0 | quality | FlowMatch shift. Wan default 5.0. Lower (3.5–4.0) = more motion. Range 3.0–5.0. |
| `switch_boundary` | float | 0.9 | quality | MoE high→low expert switch (t<900). Wan2.2 i2v = 0.9. Rarely changed. |
| `seed_multiplier` | int | 42 | repro | Per-clip seed = `seed_multiplier × clip_idx`. Fix for reproducibility; change to resample. |

## Coherence / chaining (canonical mechanics)

| Field | Type | Default | UI | What it does / nudge guidance |
|---|---|---|---|---|
| `pixel_re_encode` | bool | **false** | coherence | **Keep OFF (canonical).** Off = carry the RAW previous-clip latent (SVI 2.0 Pro). On = decode→VAE re-encode the tail — injects roundtrip error the LoRA can't correct → identity drift. On only for A/B. |
| `stitch_mode` | enum | crossfade | coherence | `trim` (canonical: concat + drop next clip's leading overlap, no blend) or `crossfade` (cosine-blend the overlap — hides seams but averages two draws). Canonical presets use `trim`. |
| `num_overlap_frame` | int | 4 | coherence | Frames overlapped between clips (trimmed or crossfaded). SVI reference = 5. Larger = smoother join but more redundancy. |
| `num_motion_latent` | int | 1 | coherence | Latent frames of the previous clip carried as motion conditioning. SVI = 1. Raising (with `num_motion_frame`≥5) tightens continuity but can freeze motion. |
| `num_motion_frame` | int | 4 | coherence | Pixel frames used for the motion tail / re-encode depth. With `pixel_re_encode` on, must yield ≥ `num_motion_latent` latent frames (`1+(N-1)//4`). |

## Identity controls (advanced — non-canonical crutches)

> The canonical path holds identity WITHOUT these. They are levers for the
> edit-then-animate / transformation cases, or to fight drift at off-budget res.
> Default all to off.

| Field | Type | Default | UI | What it does / nudge guidance |
|---|---|---|---|---|
| `ref_pad_num` | int | 0 | identity | Bias padding latent slots toward the anchor. `0` = off (canonical). `-1` = every slot (strongest lock, **freezes motion**). small N (3–6) = anchor the clip head only. Ramps across clips via the next two fields. |
| `ref_pad_free_clips` | int | 2 | identity | Early clips kept fully free (ref_pad=0) before the lock ramps in. Protects good early motion. |
| `ref_pad_schedule` | int[] | null | identity | Explicit per-clip ref_pad list e.g. `[0,0,3,5]` — overrides the auto-ramp. |
| `adain_factor` | float | 0.0 | identity | Per-channel latent stat-match toward clip-0 (caps **colour/exposure** drift only, NOT geometry/identity). 0 = off, 0.1–0.5 typical. |
| `image_cond_noise_scale` | float | 0.0 | transform | ICN: noise the anchor/motion conditioning so the prompt can override the input image (for transformation). 0 = rigid ref-lock. 0.2–0.45 usable; ~0.7 swaps the subject. **Trades identity for transformability.** Prefer edit-then-animate instead. |
| `image_cond_noise_schedule` | float[] | null | transform | Per-clip ICN ramp e.g. `[0.1,0.3,0.45]` — overrides the scalar. |
| `image_cond_noise_bg_protect` | float | 0.0 | transform | Spatially mask ICN toward frame centre (protect background/edges). 0 = uniform, 1 = corners fully protected. Assumes a centred subject. |

## Motion (advanced)

| Field | Type | Default | UI | What it does / nudge guidance |
|---|---|---|---|---|
| `motion_scale_t` / `_h` / `_w` | float | 1.0 | motion | RoPE temporal/spatial stretch. 1.0 = off. `t` 1.3–1.6 adds motion but `>1.5` deforms faces/mouth. |
| `motion_scale_schedule` | float[] | null | motion | Per-clip temporal ramp e.g. `[1.0,1.3,1.6]` — overrides `motion_scale_t`. Diagnostic; over-drives motion. |

## Transformation

| Field | Type | Default | UI | What it does |
|---|---|---|---|---|
| `last_image_path` | path | null | transform | FLF2V end keyframe. Animates `ref_image` → `last_image` over the clip (start→end morph, no seam). Pin an edited target state here. |

### Qwen anchor edit (edit-then-animate, gpu_smoke flags)

Runs **before** the SVI render: Qwen-Image-Edit-2509 edits the anchor, then SVI
animates the edited frame. Coherent transformation, no per-frame flicker. (UI
would expose these as a "transform anchor" panel.)

| Flag | Default | What it does |
|---|---|---|
| `--qwen-edit-prompt` | "" (off) | Edit instruction for the anchor. Keep face geometry/pose/framing; change only appearance. Empty = no edit. |
| `--qwen-sd-bin` | sd-cli path | stable-diffusion.cpp binary. |
| `--qwen-models-dir` | qwen models dir | Holds the Qwen-Image-Edit GGUF quartet. |
| `--qwen-steps` | 24 | Edit sampling steps. |
| `--qwen-cfg` | 2.5 | Edit cfg-scale. |
| `--qwen-flow-shift` | 3.0 | Edit flow-shift. |
| `--qwen-edited-out` | `<output>_anchor_edited.png` | Where the edited anchor is written. |

## Performance / VRAM

| Field | Type | Default | UI | What it does / nudge guidance |
|---|---|---|---|---|
| `blocks_to_swap` | int | 40 | perf | DiT blocks offloaded CPU↔GPU per step. **Higher = LESS VRAM** (40 = all = lowest peak ~10 GiB at 832×480). Lower = more resident = more VRAM but fewer transfers. **Counterintuitive:** at <2 GiB free, Windows (no `expandable_segments`) thrashes the allocator → ~3× slower; give ≥4 GiB free before lowering below 40. Validated 28 ran ~30 s/step with headroom. |
| `teacache_thresh` | float | 0.0 | perf | TeaCache accumulated rel-L1 threshold. 0 = off. 0.05–0.15 = faster, lower quality (can ghost). |

## Distilled models (advanced)

| Field | Type | Default | UI | Notes |
|---|---|---|---|---|
| `distill_lora_high` / `_low` | path | null | distill | Lightning/lightx2v distill LoRA stacked on each expert. Enables 4–8 step cfg=1. |
| `dit_high_path` / `dit_low_path` | path | null | distill | Override the high/low DiT fp8 weights (e.g. a distilled base model). |
| `fixed_sigmas` | float[] | null | distill | Explicit sigma list for distilled models e.g. `[1.0,0.9375,0.8333,0.625,0.0]` — overrides `sigma_shift`. |

## Environment levers (shell, not render params)

| Env | Recommended | What it does |
|---|---|---|
| `SVI2_FP8_COMPUTE` | `bf16` | Blackwell `torch._scaled_mm` colour-smudge fix on RTX 50. |
| `SVI2_ATTENTION` | `flash2` | Attention backend: `flash2` (recommended), `sage2/3`, `sdpa` (fallback). flash_attn NOT optional per SVI tips. |

---

## Suggested UI grouping

1. **Basics** (core): ref image, prompt, num_clips, frames_per_clip, resolution, fps, interpolate_fps.
2. **Quality** (quality): steps, cfg_scale, sigma_shift, seed.
3. **Coherence** (coherence): pixel_re_encode, stitch_mode, num_overlap_frame, num_motion_latent — *defaulted to canonical, collapsed*.
4. **Transform** (transform): Qwen anchor edit panel, last_image (FLF2V), ICN — *one path at a time*.
5. **Advanced** (identity/motion/distill): ref_pad*, adain, motion_scale*, distill* — *collapsed, with "off = canonical" hints*.
6. **Performance** (perf/env): blocks_to_swap, teacache, SVI2_* env — *with the VRAM-vs-speed note*.
