from __future__ import annotations

import gc
import os
import sys
import time
import traceback
from pathlib import Path

_USAGE = """\
smoke-ltxv097-multiscene-20s — distilled-13B multi-scene continuity e2e

Renders a ~20 s two-scene video as stitched 5-6 s segments on the
LTX-Video 0.9.7 DISTILLED 13B GGUF path (preset="distilled" → 8 steps,
guidance 1.0). Scene 1 (first half) and scene 2 (second half) share the
character + style anchor; scene 2 continues scene 1 with a new action.

Tiered (NEXUS_I2V_TIER, default 3) — each tier isolates one question so
a failure is attributable (debate-gate ruling, 2026-05-20):
  1  single-clip distilled-preset regression. One segment. Establishes
     the baseline + reports whether the default 8-step schedule looks
     materially wrong (→ pursue a custom-timestep schedule) or fine.
  2  Path A vs Path B. The same 2 scenes rendered twice: manual
     stitched segments (last-frame + video-tail conditioning) vs the
     LongMultiPrompt single-call sliding-window pipeline. Side-by-side
     evidence for the architecture choice — the prior LongMP "melt"
     was the dev model, not distilled.
  3  full 4-segment 20 s e2e. The deliverable.

Metrics policy (operator ruling): motion / seam / sharpness print as
advisory PASS/WARN/FAIL telemetry and do NOT change the exit code. The
run hard-FAILS only on a render exception or a wrong decoded frame
count. Every segment + sample frame is retained for human review.

RUN (worker venv; .pth resolves ltx_video_worker from the MAIN repo):
  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \\
  PYTHONPATH=<ext>/worker/src \\
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-multiscene-20s.py

Env knobs:
  NEXUS_I2V_TIER (3)        1 | 2 | 3 — see above
  NEXUS_I2V_W (768) NEXUS_I2V_H (512)   gen resolution (snapped /32)
  NEXUS_I2V_FPS (24)        base frame rate
  NEXUS_I2V_SEG_SECONDS (5) per-segment duration; frames snapped 8n+1
  NEXUS_I2V_SEGMENTS (4)    tier-3 segment count (3 or 4 → ~15-24 s)
  NEXUS_I2V_QUANT (ltxv-13b-0.9.7-distilled-Q4_K_M.gguf)
  NEXUS_I2V_SEED (_assets/i2v-possession-seed.jpg)  identity image
  NEXUS_I2V_GLOBAL_SEED (108)  master seed; per-segment seed = master+i*nf
  NEXUS_I2V_VRAM_CEILING (15.0)  GiB; reserved above → loud spill warning
  NEXUS_I2V_GUIDANCE ()    override preset guidance (1.0); 1.1-1.5 makes
                           the negative prompt marginally active
  NEXUS_I2V_STEPS ()       override preset steps (8)
  NEXUS_I2V_IMG_COND_NOISE ()  override image_cond_noise_scale (0.15)
  NEXUS_I2V_COND_STRENGTH ()   override condition_strength (0.7); keep
                           >=0.65 — lower morphs identity (GPU-proven)
  NEXUS_I2V_TIMESTEPS ()   custom sampling schedule: "official" = the
                           distilled set [1000,993,987,981,975,909,725,
                           0.03], or a comma list; empty = uniform steps
  NEXUS_I2V_COLOR_ANCHOR (1)   1 = normalize every segment back to
                           segment 0 — colour mean/std (contrast) AND
                           high-frequency energy (over-sharpen); 0 = off
  NEXUS_I2V_TEMPORAL_TILE (48) NEXUS_I2V_TEMPORAL_OVERLAP (16)  tier-2 B

Exit: 0 PASS, 1 FAIL (render crash / wrong frame count), 2 prereq missing.
"""

# Two-scene continuity content. CHARACTER + STYLE anchor every segment;
# only the per-segment action changes. Segments 0..h-1 are scene 1,
# h..n-1 are scene 2 — scene 2 continues scene 1 with a different action.
CHARACTER = (
    "the same pale-faced young nun, black veil, white wimple, "
    "dark hollow eyes"
)
STYLE = (
    "locked-off camera, candlelit gothic cathedral, volumetric haze, "
    "cinematic 35mm film grain, photorealistic"
)
NEG = (
    "worst quality, low quality, inconsistent motion, blurry, jittery, "
    "distorted, motion smear, motion artifacts, fused fingers, "
    "extra fingers, missing fingers, bad anatomy, deformed hands, "
    "melted hands, distorted face, changing face, morphing identity, "
    "mask-like face"
)
SCENE1_ACTIONS = [
    "she slowly tilts her head, her grin widening as her dark eyes "
    "fix on the camera, candle flames trembling beside her",
    "she leans toward the camera, lifting one trembling hand, her "
    "fingers spreading wide, her smile stretching unnaturally",
]
SCENE2_ACTIONS = [
    "she slowly rises to her feet, candlelight sliding across her "
    "veil, her gaze still locked forward, the haze swirling around her",
    "she turns away from the camera and walks into the dark nave, the "
    "candle flames guttering low in her wake",
]


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


def _int(env: str, d: int) -> int:
    try:
        return int(os.environ.get(env, str(d)))
    except ValueError:
        return d


def _float(env: str, d: float) -> float:
    try:
        return float(os.environ.get(env, str(d)))
    except ValueError:
        return d


def _opt_float(env: str) -> float | None:
    v = os.environ.get(env)
    if v is None or not v.strip():
        return None
    try:
        return float(v)
    except ValueError:
        return None


def _opt_int(env: str) -> int | None:
    v = os.environ.get(env)
    if v is None or not v.strip():
        return None
    try:
        return int(v)
    except ValueError:
        return None


def _snap32(x: int) -> int:
    return max(32, int(round(x / 32.0)) * 32)


def _snap_8nplus1(x: int) -> int:
    return max(9, ((max(9, x) - 1) // 8) * 8 + 1)


def _sharpness(frame) -> float:
    """Laplacian variance — higher is sharper. Telemetry only: it cannot
    tell motion blur from melt, so it is never a gate (debate ruling)."""
    import numpy as np

    a = np.asarray(frame.convert("L"), dtype=np.float32)
    lap = (
        -4.0 * a[1:-1, 1:-1]
        + a[:-2, 1:-1]
        + a[2:, 1:-1]
        + a[1:-1, :-2]
        + a[1:-1, 2:]
    )
    return float(lap.var())


def _boundary_delta(prev_last, cur_first) -> float:
    """Mean absolute RGB delta across a segment seam, normalised 0..1."""
    import numpy as np

    x = np.asarray(prev_last.convert("RGB").resize((128, 128)), dtype=np.float32)
    y = np.asarray(cur_first.convert("RGB").resize((128, 128)), dtype=np.float32)
    return float(np.mean(np.abs(x - y)) / 255.0)


def _opt_schedule(env: str):
    """Parse NEXUS_I2V_TIMESTEPS: 'official', a comma list, or None."""
    v = os.environ.get(env, "").strip()
    if not v:
        return None
    if v.lower() == "official":
        return "official"
    try:
        return [float(x) for x in v.split(",") if x.strip()]
    except ValueError:
        return None


_HF_BLUR_RADIUS = 2.0


def _seg_color_stats(frames):
    """Per-channel (mean, std) over a segment's RGB frames."""
    import numpy as np

    arr = np.stack(
        [np.asarray(f.convert("RGB"), dtype=np.float32) for f in frames]
    )
    return arr.mean(axis=(0, 1, 2)), arr.std(axis=(0, 1, 2)) + 1e-6


def _seg_hf_energy(frames) -> float:
    """Mean high-frequency energy of a segment — std of (frame - blur).
    Colour mean/std miss this; it is the band that compounds into the
    over-sharpened look down the conditioning chain."""
    import numpy as np
    from PIL import ImageFilter

    vals = []
    for f in frames:
        rgb = f.convert("RGB")
        blur = rgb.filter(ImageFilter.GaussianBlur(radius=_HF_BLUR_RADIUS))
        hf = np.asarray(rgb, dtype=np.float32) - np.asarray(blur, dtype=np.float32)
        vals.append(float(hf.std()))
    return sum(vals) / max(1, len(vals))


def _apply_color_anchor(frames, ref_mean, ref_std):
    """AdaIN-shift a segment's frames so its colour mean/std match the
    reference (segment 0). One affine correction per channel applied to
    every frame — kills cross-segment contrast drift without disturbing
    intra-segment motion or lighting changes."""
    import numpy as np
    from PIL import Image

    cur_mean, cur_std = _seg_color_stats(frames)
    out = []
    for f in frames:
        a = np.asarray(f.convert("RGB"), dtype=np.float32)
        a = (a - cur_mean) / cur_std * ref_std + ref_mean
        out.append(Image.fromarray(np.clip(a, 0.0, 255.0).astype(np.uint8)))
    return out


def _apply_hf_guard(frames, cur_hf: float, ref_hf: float):
    """Attenuate a segment's high-frequency band toward segment 0's
    energy. Only ever softens (scale <= 1), never sharpens — so it can
    only undo accumulated over-sharpening, never add ringing."""
    import numpy as np
    from PIL import Image, ImageFilter

    scale = min(1.0, ref_hf / (cur_hf + 1e-6))
    if scale > 0.985:
        return frames
    out = []
    for f in frames:
        rgb = f.convert("RGB")
        blur = rgb.filter(ImageFilter.GaussianBlur(radius=_HF_BLUR_RADIUS))
        base = np.asarray(blur, dtype=np.float32)
        hf = np.asarray(rgb, dtype=np.float32) - base
        a = base + hf * scale
        out.append(Image.fromarray(np.clip(a, 0.0, 255.0).astype(np.uint8)))
    return out


def _seg_actions(n_segments: int) -> list[str]:
    """Map n segments onto the two scenes — first half scene 1, second
    half scene 2 — so a 3- or 4-segment run is always a 2-scene story."""
    half = max(1, n_segments // 2)
    out: list[str] = []
    for i in range(n_segments):
        if i < half:
            out.append(SCENE1_ACTIONS[i % len(SCENE1_ACTIONS)])
        else:
            out.append(SCENE2_ACTIONS[(i - half) % len(SCENE2_ACTIONS)])
    return out


def _advisory(motion_mod, frames, prev_tail_last) -> tuple[str, str]:
    """Return (verdict, line) advisory telemetry for one segment's
    frames. Verdict is one of pass/warn/fail but never gates the run."""
    metrics = motion_mod.motion_metrics(frames)
    verdict = motion_mod.assess_motion(metrics)
    sharp = sum(_sharpness(frames[i]) for i in (0, len(frames) // 2, -1)) / 3.0
    seam_txt = ""
    if prev_tail_last is not None:
        seam_txt = f" seam_delta={_boundary_delta(prev_tail_last, frames[0]):.4f}"
    line = (
        f"motion={verdict['verdict']} mean_delta={metrics['mean_delta']:.5f} "
        f"frozen_pairs={metrics['frozen_pairs']} sharpness={sharp:.1f}{seam_txt}"
    )
    return verdict["verdict"], line


def _render_path_a(
    mod,
    motion_mod,
    seam_lib,
    torch,
    pipe,
    seed_img,
    actions,
    width: int,
    height: int,
    nf: int,
    global_seed: int,
    samp: dict,
    segdir: Path,
    framedir: Path,
    vram_ceiling: float,
    log,
) -> tuple[list[Path], list[str], int]:
    """Manual stitched-segment render (Path A). Returns (segment mp4
    paths, advisory lines, hard_fail_count)."""
    seam = seam_lib.seam_params({}, "film")
    color_anchor = os.environ.get(
        "NEXUS_I2V_COLOR_ANCHOR", "1"
    ).strip().lower() not in ("0", "false", "no", "off")
    seg_paths: list[Path] = []
    advisories: list[str] = []
    hard_fail = 0
    cond: object = seed_img
    prev_seam_tail = None
    prev_tail_last = None
    ref_color = None
    ref_hf = None
    for si, action in enumerate(actions):
        prompt = f"{CHARACTER}. {action}. {STYLE}"
        seed = global_seed + si * nf
        t = time.perf_counter()
        torch.cuda.reset_peak_memory_stats()
        try:
            fr = list(
                mod._generate_segment_dispatch(
                    pipe, {}, False, None, cond, prompt, NEG,
                    width, height, nf, seed, samp, None, log, "two_pass",
                )
            )
        except Exception as e:  # noqa: BLE001 — render crash is a hard fail
            print(f"  FAIL seg{si}: {e}")
            traceback.print_exc()
            return seg_paths, advisories, hard_fail + 1
        if len(fr) != nf:
            print(
                f"  FAIL seg{si}: decoded {len(fr)} frames, expected {nf} "
                "— skipping (a wrong-length tail would corrupt the chain)"
            )
            hard_fail += 1
            del fr
            gc.collect()
            torch.cuda.empty_cache()
            continue
        # Cross-segment anchor: segment 0 sets the reference; every later
        # segment is AdaIN-shifted (colour mean/std) AND high-frequency
        # attenuated back to it, before the seam and before its tail
        # feeds the next segment — so neither contrast nor over-sharpen
        # can compound down the conditioning chain.
        anchored = ""
        if si == 0:
            ref_color = _seg_color_stats(fr)
            ref_hf = _seg_hf_energy(fr)
        elif color_anchor and ref_color is not None:
            fr = _apply_color_anchor(fr, *ref_color)
            fr = _apply_hf_guard(fr, _seg_hf_energy(fr), ref_hf)
            anchored = " anchored(color+hf)"
        fr = seam_lib.apply_seam(prev_seam_tail, fr, seam, log)
        peak = torch.cuda.max_memory_allocated() / 1024**3
        resv = torch.cuda.max_memory_reserved() / 1024**3
        verdict, adv = _advisory(motion_mod, fr, prev_tail_last)
        advisories.append(f"seg{si}: {adv}{anchored}")
        spill = "  <-- SPILL WARNING" if resv > vram_ceiling else ""
        for k, ix in {"first": 0, "mid": len(fr) // 2, "last": -1}.items():
            fr[ix].save(framedir / f"a_seg{si}_{k}.png")
        seg_path = segdir / f"a_{si:03d}.mp4"
        mod._write_frames_as_mp4(fr, seg_path, base_fps=24)
        seg_paths.append(seg_path)
        print(
            f"  seg{si}: {len(fr)}f {time.perf_counter() - t:.0f}s "
            f"peak={peak:.2f} resv={resv:.2f}GiB [{adv}{anchored}]{spill}"
        )
        tcount = max(1, min(samp["condition_tail_frames"], len(fr)))
        prev_seam_tail = fr[-tcount:]
        prev_tail_last = fr[-1]
        cond = fr[-tcount:]
        del fr
        gc.collect()
        torch.cuda.empty_cache()
    return seg_paths, advisories, hard_fail


def main() -> int:  # noqa: C901 — linear tiered script, splitting hurts clarity
    print(_USAGE)
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")

    tier = _int("NEXUS_I2V_TIER", 3)
    if tier not in (1, 2, 3):
        print(f"FAIL: NEXUS_I2V_TIER must be 1|2|3, got {tier}")
        return 2
    width = _snap32(_int("NEXUS_I2V_W", 768))
    height = _snap32(_int("NEXUS_I2V_H", 512))
    fps = _int("NEXUS_I2V_FPS", 24)
    seg_seconds = _float("NEXUS_I2V_SEG_SECONDS", 5.0)
    nf = _snap_8nplus1(int(round(seg_seconds * fps)))
    n_segments = max(2, _int("NEXUS_I2V_SEGMENTS", 4))
    quant = os.environ.get(
        "NEXUS_I2V_QUANT", "ltxv-13b-0.9.7-distilled-Q4_K_M.gguf"
    )
    here = Path(__file__).resolve().parent
    seed_path = os.environ.get(
        "NEXUS_I2V_SEED", str(here / "_assets" / "i2v-possession-seed.jpg")
    )
    global_seed = _int("NEXUS_I2V_GLOBAL_SEED", 108)
    vram_ceiling = _float("NEXUS_I2V_VRAM_CEILING", 15.0)
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_multiscene_20s"
    segdir = outdir / "segments"
    framedir = outdir / "frames"
    segdir.mkdir(parents=True, exist_ok=True)
    framedir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import motion as motion_mod  # type: ignore
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker import seam as seam_lib  # type: ignore
        from ltx_video_worker.ffmpeg_io import stitch_segments
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2
    if not Path(seed_path).is_file():
        print(f"FAIL: seed image not found: {seed_path}")
        return 2

    log = _Log()
    # preset="distilled" → 8 steps / guidance 1.0; explicit env still wins.
    advanced: dict[str, float | int | str] = {"preset": "distilled"}
    ov_g = _opt_float("NEXUS_I2V_GUIDANCE")
    if ov_g is not None:
        advanced["guidance_scale"] = ov_g
    ov_s = _opt_int("NEXUS_I2V_STEPS")
    if ov_s is not None:
        advanced["num_inference_steps"] = ov_s
    ov_icn = _opt_float("NEXUS_I2V_IMG_COND_NOISE")
    if ov_icn is not None:
        advanced["image_cond_noise_scale"] = ov_icn
    ov_cs = _opt_float("NEXUS_I2V_COND_STRENGTH")
    if ov_cs is not None:
        advanced["condition_strength"] = ov_cs
    ov_ts = _opt_schedule("NEXUS_I2V_TIMESTEPS")
    if ov_ts is not None:
        advanced["timestep_schedule"] = ov_ts
    tile = _int("NEXUS_I2V_TEMPORAL_TILE", mod._DEF_LONGMP_TILE)
    overlap = _int("NEXUS_I2V_TEMPORAL_OVERLAP", mod._DEF_LONGMP_OVERLAP)
    advanced["temporal_tile_size"] = tile
    advanced["temporal_overlap"] = overlap
    samp = mod._sampling_params(advanced)

    print(
        f"\ntier={tier} gen={width}x{height} fps={fps} seg_frames={nf} "
        f"(~{nf / fps:.1f}s) quant={quant}"
    )
    sched = samp.get("timestep_schedule")
    print(
        f"resolved sampling: preset=distilled "
        f"steps={samp['num_inference_steps']} "
        f"guidance={samp['guidance_scale']} "
        f"image_cond_noise={samp['image_cond_noise_scale']} "
        f"cond_strength={samp['condition_strength']} "
        f"cond_tail={samp['condition_tail_frames']} "
        f"timesteps={'uniform' if not sched else sched}"
    )

    seed_img = mod._load_input_image(seed_path, width, height)
    offload = os.environ.get("NEXUS_VIDEO_LTX23_OFFLOAD_MODE", "model")
    vae_tiling = mod._resolve_vae_tiling({"vae_tiling": "aggressive"})

    # ----- Tier 1: single-clip distilled-preset regression -----
    if tier == 1:
        t0 = time.perf_counter()
        pipe = mod._build_ltxv097_pipeline(
            offload, log, model_id=quant, vae_tiling=vae_tiling
        )
        print(f"pipeline built {time.perf_counter() - t0:.0f}s")
        paths, advs, hard_fail = _render_path_a(
            mod, motion_mod, seam_lib, torch, pipe, seed_img,
            [SCENE1_ACTIONS[0]], width, height, nf, global_seed, samp,
            segdir, framedir, vram_ceiling, log,
        )
        print("\n== TIER 1 — distilled-preset baseline ==")
        for a in advs:
            print(f"  {a}")
        print(
            "  NOTE: if motion=fail or sharpness is visibly low on the "
            "retained frames, the default 8-step schedule may be wrong "
            "for this checkpoint → pursue the official custom timestep "
            "schedule [1000,993,987,981,975,909,725,0.03]. If the clip "
            "looks finished, the schedule work stays deferred."
        )
        verdict = hard_fail == 0 and len(paths) == 1
        print(f"  artifacts: {outdir}")
        print("MULTISCENE_20S_RESULT:", "PASS" if verdict else "FAIL")
        return 0 if verdict else 1

    # ----- Tier 2: Path A vs Path B comparison -----
    if tier == 2:
        actions = _seg_actions(2)
        scenes = [f"{CHARACTER}. {a}. {STYLE}" for a in actions]
        hard_fail = 0

        print("\n-- Path A: manual stitched segments --")
        t0 = time.perf_counter()
        pipe_a = mod._build_ltxv097_pipeline(
            offload, log, model_id=quant, vae_tiling=vae_tiling
        )
        print(f"  pipeline built {time.perf_counter() - t0:.0f}s")
        paths_a, advs_a, hf_a = _render_path_a(
            mod, motion_mod, seam_lib, torch, pipe_a, seed_img, actions,
            width, height, nf, global_seed, samp, segdir, framedir,
            vram_ceiling, log,
        )
        hard_fail += hf_a
        if paths_a:
            stitch_segments(paths_a, outdir / "pathA_stitched.mp4")
        del pipe_a
        gc.collect()
        torch.cuda.empty_cache()

        print("\n-- Path B: LongMultiPrompt single-call --")
        total_frames = _snap_8nplus1(nf * 2)
        while mod._longmp_window_count(total_frames, tile, overlap) < 2:
            total_frames += 8
        windows = mod._longmp_window_count(total_frames, tile, overlap)
        print(
            f"  total_frames={total_frames} windows={windows} "
            f"tile={tile} overlap={overlap}"
        )
        t0 = time.perf_counter()
        pipe_b = mod._build_ltxv097_longmp_pipeline(
            offload, log, model_id=quant, vae_tiling=vae_tiling
        )
        print(f"  pipeline built {time.perf_counter() - t0:.0f}s")
        adv_b = "longmp: (not run)"
        try:
            t = time.perf_counter()
            torch.cuda.reset_peak_memory_stats()
            fr = list(
                mod._generate_video_longmp(
                    pipe_b, seed_img, scenes, NEG, width, height,
                    total_frames, global_seed, samp, advanced, log,
                )
            )
            peak = torch.cuda.max_memory_allocated() / 1024**3
            resv = torch.cuda.max_memory_reserved() / 1024**3
            # LongMP's fused output length is decided by the window math,
            # not the input estimate — report it, never gate on it.
            if len(fr) != total_frames:
                print(
                    f"  note: longmp decoded {len(fr)} frames "
                    f"(input estimate was {total_frames}; window fusion "
                    "sets the real length)"
                )
            _, adv_b = _advisory(motion_mod, fr, None)
            adv_b = f"longmp: {adv_b}"
            for k, ix in {"first": 0, "mid": len(fr) // 2, "last": -1}.items():
                fr[ix].save(framedir / f"b_longmp_{k}.png")
            seg_b = segdir / "b_000.mp4"
            mod._write_frames_as_mp4(fr, seg_b, base_fps=24)
            stitch_segments([seg_b], outdir / "pathB_stitched.mp4")
            print(
                f"  longmp: {len(fr)}f {time.perf_counter() - t:.0f}s "
                f"peak={peak:.2f} resv={resv:.2f}GiB [{adv_b}]"
            )
            del fr
        except Exception as e:  # noqa: BLE001 — render crash is a hard fail
            print(f"  FAIL longmp: {e}")
            traceback.print_exc()
            hard_fail += 1
        del pipe_b
        gc.collect()
        torch.cuda.empty_cache()

        print("\n== TIER 2 — Path A vs Path B ==")
        print("  Path A (manual stitched):")
        for a in advs_a:
            print(f"    {a}")
        print(f"  Path B (LongMP single-call):\n    {adv_b}")
        print(
            "  REVIEW: eyeball pathA_stitched.mp4 vs pathB_stitched.mp4 — "
            "pick the architecture with the cleaner seams + identity for "
            "tier 3. The prior LongMP melt was the dev model; this is the "
            "distilled-model verdict."
        )
        verdict = hard_fail == 0
        print(f"  artifacts: {outdir}")
        print("MULTISCENE_20S_RESULT:", "PASS" if verdict else "FAIL")
        return 0 if verdict else 1

    # ----- Tier 3: full 4-segment 20 s e2e -----
    actions = _seg_actions(n_segments)
    half = max(1, n_segments // 2)
    print(
        f"\ntier 3: {n_segments} segments, scene 1 = seg 0..{half - 1}, "
        f"scene 2 = seg {half}..{n_segments - 1}, "
        f"~{n_segments * nf / fps:.1f}s total"
    )
    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline(
        offload, log, model_id=quant, vae_tiling=vae_tiling
    )
    print(f"pipeline built {time.perf_counter() - t0:.0f}s")
    paths, advs, hard_fail = _render_path_a(
        mod, motion_mod, seam_lib, torch, pipe, seed_img, actions,
        width, height, nf, global_seed, samp, segdir, framedir,
        vram_ceiling, log,
    )
    if not paths:
        print("FAIL: no segments rendered")
        return 1
    stitched = outdir / "final_20s.mp4"
    stitch_segments(paths, stitched)

    warn = [a for a in advs if "motion=warn" in a or "motion=fail" in a]
    print("\n== TIER 3 — 20 s multi-scene e2e ==")
    print(f"  segments={len(paths)}/{n_segments} seg_frames={nf}")
    for a in advs:
        print(f"  {a}")
    if warn:
        print(f"  REVIEW: {len(warn)} segment(s) flagged motion warn/fail "
              "— eyeball the retained frames; metrics do not gate.")
    print(f"  final: {stitched}")
    print(f"  artifacts: {outdir}")
    verdict = hard_fail == 0 and len(paths) == n_segments
    print("MULTISCENE_20S_RESULT:", "PASS" if verdict else "FAIL")
    return 0 if verdict else 1


if __name__ == "__main__":
    sys.exit(main())
