from __future__ import annotations

import gc
import os
import sys
import time
import traceback
from pathlib import Path

_USAGE = """\
smoke-ltxv097-i2v-sharp — operator-gated real-GPU i2v sharpness probe

Image-to-video from a seed reference image (AR cover-cropped, C1) on
the LTX-Video 0.9.7 GGUF path: native gen at NEXUS_I2V_W x NEXUS_I2V_H
(default 1024x576 — exact 16:9, /32, >= the 960x540 minimum; any
override is snapped to a multiple of 32 as LTX requires), Q4_K_M, LOW
base_fps
(fps restored later by RIFE/FILM — a VRAM lever), aggressive VAE
tiling, model offload, NO transformer-refine upscale (kills the spill
driver). Then Real-ESRGAN ncnn 4x -> exact downscale to the target
(default 1920x1080, C2) and RIFE+FILM fps interpolation.

PROBE GOAL: does native-res gen fit WITHOUT WDDM/shared-VRAM spill?
Per-segment peak + reserved are printed; reserved > ~15 GiB flags a
spill. Ladder NEXUS_I2V_W/H upward across runs until it spills.

RUN (worker venv; .pth resolves ltx_video_worker from the MAIN repo):
  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \\
  PYTHONPATH=<ext>/worker/src \\
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-i2v-sharp.py

Env knobs (geometry / rate):
  NEXUS_I2V_W (1024) NEXUS_I2V_H (576) NEXUS_I2V_FPS (15)
  NEXUS_I2V_OUTFPS (2x FPS -> 30) NEXUS_I2V_SCENES (3) NEXUS_I2V_SECONDS (2.7)
  NEXUS_I2V_TARGET_W (1920) NEXUS_I2V_TARGET_H (1080)
  NEXUS_I2V_QUANT (ltxv-13b-0.9.7-dev-Q4_K_M.gguf)
  NEXUS_I2V_SEED (scripts/_assets/i2v-possession-seed.jpg)

Env knobs (sampling A/B — empty = production defaults):
  NEXUS_I2V_IMG_COND_NOISE (0.15)  raise to free motion from still anchor
  NEXUS_I2V_COND_STRENGTH (0.7)    lower to weaken first-frame anchor
  NEXUS_I2V_COND_TAIL (24)         tail frames carried into next scene
  NEXUS_I2V_GUIDANCE (6.0)         classifier-free guidance scale
  NEXUS_I2V_GUIDANCE_RESCALE (0.0) CFG variance rescale (try 0.3->0.5->0.7
                                   at cfg>=7; counters dolly-out bias)
  NEXUS_I2V_STEPS (30)             inference steps
  NEXUS_VIDEO_LTX23_FLOW_SHIFT (1) FlowMatchEuler shift (3.0-4.0 = more
                                   high-sigma steps = more motion freedom)
  NEXUS_I2V_TWO_PASS (0)           1 = enable two-stage latent upsample +
                                   refine (denoise=0.4, ~13 steps); skips
                                   pixel ESRGAN, decodes to target W/H
                                   directly. Research P1-6 biggest smudge
                                   fix. VRAM cost: stage-3 at 2x native.

Exit: 0 PASS, 1 FAIL/REVIEW, 2 prerequisite missing.
"""

# Predation arc (fictional). Seed image shows the nun ALREADY in the
# possessed state — grinning, hands raised, dark-eyed — so prompts
# escalate menace forward from that baseline rather than describing
# transition into possession (which the seed contradicts). Each scene
# leads with subject body motion and picks up where the previous
# scene's tail leaves the pose. STYLE_CAMERA leads the composite
# prompt to survive T5's 128-token truncation.
CHARACTER = (
    "a young nun in a black habit and white wimple, pale gaunt face, "
    "dark intense eyes"
)
# STYLE_CAMERA leads the composite prompt so the camera-suppression
# clause survives T5's 128-token truncation (Run A showed prompts
# composing to 158 tokens; STYLE-at-tail was being chopped, letting
# LTX default to its dolly-out fallback at scene end).
STYLE_CAMERA = (
    "static locked-off camera, no pan no zoom no dolly, "
    "only the subject moves"
)
STYLE_ATMOSPHERE = (
    "dark gothic horror, candlelit cathedral, volumetric god-rays, "
    "desaturated cold palette, film grain, cinematic 35mm, dramatic "
    "chiaroscuro, photorealistic"
)
# Research-aligned NEG (ltxv_13b_quality_research/09_parameter_preset_
# cheatsheet.md). Targets the specific artifacts visible in our sample:
# face/hand melting, finger fusion, motion smear. Camera-suppression
# kept from prior experimentation since dolly-out is our open issue.
NEG = (
    "worst quality, low quality, inconsistent motion, blurry, jittery, "
    "distorted, motion smear, motion artifacts, fused fingers, "
    "extra fingers, missing fingers, bad anatomy, weird hand, "
    "deformed hands, melted hands, distorted face, "
    "camera pan, camera zoom, camera dolly, dolly out, zoom out, "
    "wide shot"
)
SCENES = [
    "she snaps her head violently to the side, her hair whipping "
    "across her face, her tongue lashing out past her teeth, her "
    "shoulders jerking upward, candle flames exploding outward "
    "around her, robed onlookers stumbling backward",
    "she throws both arms wide open like wings, her body lurching "
    "upward off the floor, her habit billowing dramatically outward, "
    "her head snapping backward, a robed onlooker collapsing to the "
    "stones behind her, candles bursting in showers of sparks",
    "she hurls herself forward toward the camera, her arms shooting "
    "out reaching past the lens, her mouth tearing open in a snarl, "
    "her hair flying wildly around her face, the cathedral candles "
    "all exploding at once behind her",
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


def _sha256_head(path: Path, chunk_bytes: int = 8 * 1024 * 1024) -> str:
    import hashlib

    h = hashlib.sha256()
    try:
        with path.open("rb") as f:
            buf = f.read(chunk_bytes)
            while buf:
                h.update(buf)
                buf = f.read(chunk_bytes)
        return h.hexdigest()[:16]
    except OSError:
        return "unreadable"


def _log_bundle_hashes(pipe: object, quant: str) -> None:
    from pathlib import Path as _P

    host = os.environ.get("NEXUS_HOST_DATA_DIR", "")
    if not host:
        return
    gguf = _P(host) / "models" / "wsbagnsv1" / "ltxv-13b-0.9.7-dev-GGUF" / quant
    base = _P(host) / "models" / "Lightricks" / "LTX-Video-0.9.7-dev"
    parts: list[str] = [
        f"gguf={gguf.name}",
        f"gguf_sha16={_sha256_head(gguf) if gguf.is_file() else 'absent'}",
    ]
    for sub, label in (
        ("vae/diffusion_pytorch_model.safetensors", "vae"),
        ("text_encoder/model.safetensors", "t5"),
        ("scheduler/scheduler_config.json", "sched"),
    ):
        p = base / sub
        if p.is_file():
            parts.append(f"{label}_sha16={_sha256_head(p)}")
        else:
            for cand in base.rglob(sub.split("/")[-1]):
                parts.append(f"{label}_sha16={_sha256_head(cand)}")
                break
    sched_name = type(getattr(pipe, "scheduler", None)).__name__
    parts.append(f"scheduler_class={sched_name}")
    print(f"bundle: {', '.join(parts)}")


def _build_advanced() -> dict[str, float | int]:
    adv: dict[str, float | int] = {}
    for key, env in (
        ("image_cond_noise_scale", "NEXUS_I2V_IMG_COND_NOISE"),
        ("condition_strength", "NEXUS_I2V_COND_STRENGTH"),
        ("guidance_scale", "NEXUS_I2V_GUIDANCE"),
        ("guidance_rescale", "NEXUS_I2V_GUIDANCE_RESCALE"),
    ):
        v = _opt_float(env)
        if v is not None:
            adv[key] = v
    for key, env in (
        ("condition_tail_frames", "NEXUS_I2V_COND_TAIL"),
        ("num_inference_steps", "NEXUS_I2V_STEPS"),
    ):
        n = _opt_int(env)
        if n is not None:
            adv[key] = n
    return adv


def _snap32(x: int) -> int:
    # LTX requires gen width/height divisible by 32. Round to nearest,
    # floor at 32, so every ladder rung is a valid model resolution.
    return max(32, int(round(x / 32.0)) * 32)


def _probe_fps(path: Path) -> float:
    import ffmpeg

    p = ffmpeg.probe(str(path))
    v = next(s for s in p["streams"] if s["codec_type"] == "video")
    n, d = (v.get("r_frame_rate") or "0/1").split("/")
    return float(n) / float(d or "1")


def main() -> int:
    print(_USAGE)
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.setdefault("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "1")

    # Default 1024x576: exact 16:9, both /32, >= the operator-stated
    # 960x540 minimum. Any override is snapped to /32 (LTX requirement).
    # Default to LTX 13B 0.9.7's native motion-friendly resolution
    # (snap32-valid 16:9; 768x448 ~= 1.71:1 vs true 1.78). 1024x576 is
    # extrapolation outside training distribution → produces dolly-out
    # + freezes (Run F1 2026-05-20 GPU-proven motion+stable framing at
    # native vs camera-pong at 1024x576).
    W = _snap32(_int("NEXUS_I2V_W", 768))
    H = _snap32(_int("NEXUS_I2V_H", 448))
    fps = _int("NEXUS_I2V_FPS", 15)
    out_fps = _int("NEXUS_I2V_OUTFPS", fps * 2)
    n_scenes = max(1, _int("NEXUS_I2V_SCENES", 3))
    secs = float(os.environ.get("NEXUS_I2V_SECONDS", "2.7"))
    tw = _int("NEXUS_I2V_TARGET_W", 1920)
    th = _int("NEXUS_I2V_TARGET_H", 1080)
    quant = os.environ.get(
        "NEXUS_I2V_QUANT", "ltxv-13b-0.9.7-dev-Q4_K_M.gguf"
    )
    here = Path(__file__).resolve().parent
    seed_path = os.environ.get(
        "NEXUS_I2V_SEED", str(here / "_assets" / "i2v-possession-seed.jpg")
    )
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_i2v_sharp"
    segdir = outdir / "segments"
    segdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import esrgan_upscale as eu  # type: ignore
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker.fps_interp import try_interpolate
        from ltx_video_worker.ffmpeg_io import stitch_segments
        from ltx_video_worker.seam import apply_seam, seam_params
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
    seam = seam_params({}, "film")
    nf = max(17, int(round(secs * fps)))
    advanced = _build_advanced()
    print(
        f"i2v seed={Path(seed_path).name} native={W}x{H} fps={fps}->{out_fps} "
        f"scenes={n_scenes} seg_frames={nf} quant={quant} "
        f"target={tw}x{th} (gen=native-only, post=ESRGAN+RIFE/FILM)"
    )
    print(
        f"sampling overrides={advanced or '(production defaults)'}"
    )

    seed_img = mod._load_input_image(seed_path, W, H)  # C1 cover-crop
    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline(
        os.environ.get("NEXUS_VIDEO_LTX23_OFFLOAD_MODE", "model"),
        log,
        model_id=quant,
        vae_tiling=mod._resolve_vae_tiling({"vae_tiling": "aggressive"}),
    )
    print(f"pipeline built {time.perf_counter() - t0:.0f}s")
    _log_bundle_hashes(pipe, quant)
    samp = mod._sampling_params(advanced)
    print(
        f"resolved sampling: steps={samp['num_inference_steps']} "
        f"guidance={samp['guidance_scale']} "
        f"rescale={samp['guidance_rescale']} "
        f"image_cond_noise={samp['image_cond_noise_scale']} "
        f"cond_strength={samp['condition_strength']} "
        f"cond_tail={samp['condition_tail_frames']}"
    )
    import inspect as _i
    _sig = _i.signature(pipe.__call__).parameters
    print(
        f"pipeline accepts guidance_rescale: {'guidance_rescale' in _sig}"
    )
    cache: dict = {}

    prev_seam_tail = None
    cond: object = seed_img
    seg_paths: list[Path] = []
    worst_resv = 0.0
    # Per-window seed offset (research P1-9): each scene gets a distinct
    # but deterministic seed derived from its window-start frame index,
    # so windows don't share noise and chunk continuation stays sane.
    global_seed = _int("NEXUS_I2V_GLOBAL_SEED", 108)
    # Hard VRAM residency guard (research P1-8): 16 GiB card - reserve
    # ~1 GiB for driver/runtime fragmentation. Spill to Windows shared
    # GPU memory causes 10-20x slowdown without crashing; treat as a
    # failure mode, not graceful degradation.
    vram_ceiling_gib = float(os.environ.get("NEXUS_I2V_VRAM_CEILING", "15.0"))
    # Two-stage latent upsample + refine (research P1-6). When enabled:
    # pipeline runs at native W,H -> upsampler -> refine pass at 2*W,2*H
    # (denoise=0.4, ~steps/3 steps) -> resize to target_size. Skips the
    # pixel-space ESRGAN path entirely. Stage-3 quadruples activation
    # memory; the VRAM ceiling guard will catch any spill.
    two_pass = (os.environ.get("NEXUS_I2V_TWO_PASS", "0").strip().lower()
                in ("1", "true", "yes", "on"))
    if two_pass:
        print(f"two_pass=ON target={tw}x{th} (stage-3 at {W*2}x{H*2})")
    for si in range(n_scenes):
        prompt = (
            f"{STYLE_CAMERA}. {CHARACTER}. "
            f"{SCENES[si % len(SCENES)]}. {STYLE_ATMOSPHERE}"
        )
        seed = global_seed + si * nf
        t = time.perf_counter()
        torch.cuda.reset_peak_memory_stats()
        try:
            fr = list(
                mod._generate_segment_dispatch(
                    pipe, cache, two_pass,
                    (tw, th) if two_pass else None,
                    cond, prompt, NEG,
                    W, H, nf, seed, samp, None, log, "two_pass",
                )
            )
        except Exception as e:  # noqa: BLE001
            print(f"FAIL scene{si}: {e}")
            traceback.print_exc()
            return 1
        fr = apply_seam(prev_seam_tail, fr, seam, log)
        peak = torch.cuda.max_memory_allocated() / 1024**3
        resv = torch.cuda.max_memory_reserved() / 1024**3
        worst_resv = max(worst_resv, resv)
        if resv > vram_ceiling_gib:
            print(
                f"FAIL scene{si}: reserved={resv:.2f} GiB > ceiling "
                f"{vram_ceiling_gib:.2f} GiB (Windows shared-GPU-memory "
                f"spill risk). Lower NEXUS_I2V_W/H, increase VAE tile "
                f"count, or drop steps. Aborting before downstream "
                f"scenes degrade further."
            )
            return 1
        spill = "  <-- SPILL RISK" if resv > vram_ceiling_gib * 0.95 else ""
        tag = f"s{si}"
        for k, ix in {"first": 0, "mid": len(fr) // 2, "last": len(fr) - 1}.items():
            fr[ix].save(outdir / f"{tag}_{k}.png")
        seg_path = segdir / f"{len(seg_paths):03d}.mp4"
        mod._write_frames_as_mp4(fr, seg_path, base_fps=fps)
        seg_paths.append(seg_path)
        print(
            f"  {tag}: {len(fr)}f {time.perf_counter() - t:.0f}s "
            f"peak={peak:.2f} resv={resv:.2f} dims={fr[0].size}{spill}"
        )
        tcount = max(1, min(samp["condition_tail_frames"], len(fr)))
        prev_seam_tail = fr[-tcount:]
        # In two-pass mode `fr` is target-res (e.g. 1920x1080); the next
        # scene generates at native W,H so its conditioning tail must be
        # native too — feeding a target-res tail makes the pipeline
        # VAE-encode huge frames and spikes VRAM past the 16 GB ceiling
        # (2026-05-20 G2 scene-1 spill). The seam color-match still uses
        # the full-res prev_seam_tail.
        if two_pass and fr[0].size != (W, H):
            cond = [f.resize((W, H)) for f in fr[-tcount:]]
        else:
            cond = fr[-tcount:]
        del fr
        gc.collect()
        torch.cuda.empty_cache()

    if not seg_paths:
        print("FAIL: no segments")
        return 1

    stitched = outdir / "stitched.mp4"
    upscaled = outdir / "upscaled.mp4"
    final = outdir / "final.mp4"
    stitch_segments(seg_paths, stitched)
    sr_ok = eu.try_upscale(stitched, upscaled, tw, th, log)
    sr_src = upscaled if sr_ok else stitched
    interp_ok = try_interpolate(sr_src, final, fps, out_fps, log)
    out = final if interp_ok else sr_src
    out_w, out_h = (tw, th) if sr_ok else (W, H)
    final_fps = _probe_fps(out)

    print("\n== i2v SHARPNESS PROBE ==")
    print(f"  segments={len(seg_paths)} native={W}x{H} quant={quant}")
    print(f"  worst reserved={worst_resv:.2f} GiB "
          f"({'NO spill — fits' if worst_resv <= 15.0 else 'SPILL — too high'})")
    print(f"  esrgan ok={sr_ok} -> {out_w}x{out_h}")
    print(f"  interp ok={interp_ok} final_fps={final_fps:.2f} target={out_fps}")
    print(f"  final: {out}")
    print(f"  frames: {outdir}")
    verdict = worst_resv <= 15.0 and len(seg_paths) == n_scenes
    print("I2V_SHARP_RESULT:", "PASS" if verdict else "FAIL/REVIEW")
    return 0 if verdict else 1


if __name__ == "__main__":
    sys.exit(main())
