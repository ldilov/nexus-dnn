"""Real-GPU smoke: demonic-nun arc with soft transitions + refinement + RTX 2x upscale.

Three-scene possession arc rendered with every quality lever enabled:
  * use_distill (16-step LongCat distill LoRA, guidance 1.0)
  * apply_refinement (12-step refinement LoRA, spatial-only)
  * force_refinement_with_upscale (overrides the dual-LoRA VRAM guard)
  * rtx_upscale_scale=2 (NVIDIA Maxine VFX VideoSuperRes, HIGH quality)
  * soft transitions on BOTH boundaries with hand-tuned bridge text,
    boundary_jitter_px=0.35, boundary_grain_sigma=0.02

After the render finishes, the MP4 is decoded with ffmpeg and the per-
boundary transition_break_score is merged into the render report so the
operator can compare against future runs.

Usage:
    cd extensions/builtin/nexus-video-longcat/worker
    uv run --extra diffusers --extra rtx python ../scripts/gpu_smoke_demonic_nun_full.py

Exit codes:
    0  ok
    1  unexpected exception
    2  VRAM OOM or budget breach
    3  missing weights / nvvfx
    4  contract assertion failed (frame count, wall exceeded)
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import subprocess
import sys
import time
import traceback
from pathlib import Path

_DEFAULT_SEED = 6661666
_FPS = 24
# Bumped 13 -> 17 (next 4n+1) so each new scene re-uses more of the prior
# tail as conditioning. Stronger temporal pin = better identity continuity
# across the chain; soft-pin work prevents the seam tell that a longer
# overlap would otherwise amplify.
_OVERLAP_FRAMES = 17
_ADAIN_FACTOR = 0.2
_BOUNDARY_JITTER_PX = 0.35
_BOUNDARY_GRAIN_SIGMA = 0.02
_RTX_UPSCALE_QUALITY = "HIGH"
# Bumped 16 -> 20 for the distill draft. 16 = the LoRA's trained step count
# (LongCat paper Sec. 4.2 — going BELOW collapses motion pacing). Going above
# is safe in-distribution and gives the denoise extra polish for tighter
# temporal coherence.
_NUM_INFERENCE_STEPS = 20

_SCENES = [
    {
        "prompt": (
            "a young nun in a black habit grins menacingly in a candlelit gothic "
            "chapel, sinister widening smile, dramatic warm candle light on her "
            "face, slow forward camera push, cinematic horror atmosphere"
        ),
        "duration_seconds": 3.0,
        "motion_intensity": "dynamic",
    },
    {
        "prompt": (
            "the same young nun's body convulses in the gothic chapel, her head "
            "jerking backward, the cathedral begins to rain inside, candles "
            "flicker violently around her, dramatic high-contrast lighting, "
            "intense supernatural atmosphere"
        ),
        "duration_seconds": 3.0,
        "motion_intensity": "intense",
    },
    {
        # Possession-confirmation beat. Distill struggles with eye-color
        # transitions; the prompt asks for a STATE (eyes are pitch black
        # voids) rather than a TRANSFORMATION (eyes turn black). The
        # anti-melt negative tokens are auto-injected so doubled/ghost
        # faces are suppressed.
        "prompt": (
            "the same young nun stares straight at the camera in the rain-"
            "soaked gothic chapel, her eyes pitch black voids reflecting "
            "candle light, dark veins faintly visible on her pale forehead, "
            "slow zoom on her face, cinematic horror"
        ),
        "duration_seconds": 3.0,
        "motion_intensity": "intense",
    },
    {
        "prompt": (
            "the same young nun collapses slowly to the wet stone cathedral "
            "floor in pouring rain, body curled and twisted on the ground, "
            "water reflecting candle light, gothic columns rising around her, "
            "cinematic dramatic anguish"
        ),
        "duration_seconds": 3.0,
        "motion_intensity": "intense",
    },
]

# Bridge texts use only stems that appear in the adjacent scene prompts
# (validator enforces on RPC path; smoke bypasses but we keep the same
# discipline so the transitions stay portable).
_TRANSITIONS_SPEC = [
    {
        "type": "soft",
        "bridge_text": (
            "the camera holds on the nun as the candles flicker around her face"
        ),
    },
    {
        "type": "soft",
        "bridge_text": (
            "the camera settles on the nun as the rain pours around her face"
        ),
    },
    {
        "type": "soft",
        "bridge_text": (
            "the nun lowers as the rain pours around her toward the floor"
        ),
    },
]


def _expected_draft_frames(scenes: list[dict], fps: int, overlap: int) -> int:
    per_scene = [int(round(sc["duration_seconds"] * fps)) for sc in scenes]
    total = per_scene[0]
    for n in per_scene[1:]:
        total += n - overlap
    return total


def _probe_frame_count(mp4_path: Path) -> int:
    cmd = [
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-count_frames",
        "-show_entries", "stream=nb_read_frames",
        "-of", "default=nokey=1:noprint_wrappers=1",
        str(mp4_path),
    ]
    return int(
        subprocess.run(cmd, capture_output=True, text=True, check=True).stdout.strip()
    )


def _probe_dimensions(mp4_path: Path) -> tuple[int, int]:
    cmd = [
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-show_entries", "stream=width,height",
        "-of", "csv=s=x:p=0",
        str(mp4_path),
    ]
    raw = subprocess.run(cmd, capture_output=True, text=True, check=True).stdout.strip()
    w, h = raw.split("x")
    return int(w), int(h)


def _decode_mp4_to_array(mp4_path: Path, height: int, width: int):
    import numpy as np

    cmd = [
        "ffmpeg", "-v", "error",
        "-i", str(mp4_path),
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-",
    ]
    result = subprocess.run(cmd, capture_output=True, check=True)
    raw = result.stdout
    bytes_per_frame = height * width * 3
    n_frames = len(raw) // bytes_per_frame
    arr = np.frombuffer(raw, dtype=np.uint8)
    return arr[: n_frames * bytes_per_frame].reshape(n_frames, height, width, 3).copy()


def _build_request(profile, image_path=None, scenes_src=None, transitions_src=None):
    from longcat_video_worker.pipeline_longcat import (
        LongCatRenderRequest,
        Scene,
        Transition,
    )

    scenes_data = scenes_src if scenes_src is not None else _SCENES
    transitions_data = transitions_src if transitions_src is not None else _TRANSITIONS_SPEC

    scenes = [
        Scene(
            prompt=sc["prompt"],
            duration_seconds=sc["duration_seconds"],
            overlap_frames=_OVERLAP_FRAMES,
            adain_factor=_ADAIN_FACTOR,
            motion_intensity=sc.get("motion_intensity", "dynamic"),
        )
        for sc in scenes_data
    ]
    transitions = [
        Transition(
            from_scene=i,
            to_scene=i + 1,
            type=spec["type"],
            bridge_text=spec.get("bridge_text"),
            ramp_frames=spec.get("ramp_frames", 8),
        )
        for i, spec in enumerate(transitions_data)
    ]
    return LongCatRenderRequest(
        mode=("i2v" if image_path else "t2v"),
        prompt=scenes_data[0]["prompt"],
        negative_prompt=(
            "blurry, low quality, distorted, watermark, text overlay"
        ),
        image_path=image_path,
        height=profile.draft_height,
        width=profile.draft_width,
        num_frames=int(round(scenes_data[0]["duration_seconds"] * _FPS)),
        num_inference_steps=_NUM_INFERENCE_STEPS,
        guidance_scale=1.0,
        use_distill=True,
        seed=_DEFAULT_SEED,
        offload_kv_cache=True,
        offload_mode="partial",
        block_swap_count=46,
        scenes=scenes,
        transitions=transitions,
        adain_factor=_ADAIN_FACTOR,
        continuation_overlap_frames=_OVERLAP_FRAMES,
        boundary_jitter_px=_BOUNDARY_JITTER_PX,
        boundary_grain_sigma=_BOUNDARY_GRAIN_SIGMA,
        image_cond_noise_scale=0.15,
        apply_refinement=True,
        refinement_steps=12,
        refinement_guidance=1.0,
        refinement_spatial_only=True,
        rtx_upscale_scale=profile.rtx_scale,
        rtx_upscale_quality=_RTX_UPSCALE_QUALITY,
        # F3: drop force_refinement_with_upscale; pick refinement OR RTX, not
        # both stacked. Refinement runs per-scene at draft res; RTX upscales
        # the assembled stack at the end. Stacked dual-LoRA + RTX amplifies
        # whatever artefacts the draft has.
        force_refinement_with_upscale=False,
    )


def main() -> int:
    if "src" not in sys.path:
        sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "worker" / "src"))
    from longcat_video_worker.output_profiles import get_profile, list_profile_names

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--profile",
        choices=list(list_profile_names()),
        default="1080p",
        help=(
            "Resolution profile. 1080p = 960x540 draft x RTX 2x (final 1920x1080). "
            "720p = 640x360 draft x RTX 2x (final 1280x720)."
        ),
    )
    parser.add_argument(
        "--wall-budget",
        type=float,
        default=None,
        help="Override profile wall budget (seconds).",
    )
    parser.add_argument(
        "--vram-budget",
        type=float,
        default=None,
        help="Override profile peak VRAM budget (GiB).",
    )
    parser.add_argument("--skip-score", action="store_true",
                        help="Skip MP4 decode + boundary score merge")
    parser.add_argument(
        "--image-path",
        type=str,
        default=None,
        help=(
            "Optional JPG/PNG to anchor scene 0 as i2v (identity locked to "
            "the source image). When omitted, scene 0 runs t2v and the "
            "subject is hallucinated from the prompt each run."
        ),
    )
    parser.add_argument(
        "--preset",
        type=str,
        default=None,
        help=(
            "Load scenes/transitions/recommended profile/image-path defaults "
            "from a named ScenePreset in extensions/builtin/nexus-video-"
            "longcat/scene_presets/. CLI flags --profile / --image-path "
            "override the preset's defaults when supplied."
        ),
    )
    parser.add_argument(
        "--list-presets",
        action="store_true",
        help="Print available ScenePreset names and exit.",
    )
    args = parser.parse_args()

    if args.list_presets:
        from longcat_video_worker.scene_presets import list_presets
        for p in list_presets():
            print(f"{p.name:32s}  [{p.quality_status:10s}]  {p.label}")
        return 0

    preset_scenes = None
    preset_transitions = None
    if args.preset:
        from longcat_video_worker.scene_presets import (
            ScenePresetError,
            get_preset,
        )
        try:
            preset = get_preset(args.preset)
        except ScenePresetError as exc:
            print(f"ERROR: {exc}", file=sys.stderr)
            return 1
        preset_scenes = [
            {
                "prompt": s.prompt,
                "duration_seconds": s.duration_seconds,
                "motion_intensity": s.motion_intensity,
            }
            for s in preset.scenes
        ]
        preset_transitions = [t.to_dict() for t in preset.transitions]
        # Preset defaults apply only when CLI did not specify
        if args.image_path is None and preset.default_image_path:
            args.image_path = preset.default_image_path
        if args.profile == "1080p" and preset.recommended_output_profile != "1080p":
            # CLI default is 1080p; honour preset's recommendation when CLI
            # was not explicitly overridden. argparse cannot distinguish
            # "user set 1080p" from "default 1080p", so we apply preset's
            # recommendation whenever it differs from the CLI default.
            args.profile = preset.recommended_output_profile

    profile = get_profile(args.profile)
    wall_budget = args.wall_budget if args.wall_budget is not None else profile.wall_budget_s
    vram_budget = args.vram_budget if args.vram_budget is not None else profile.vram_budget_gib

    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(name)s %(levelname)s %(message)s",
        datefmt="%H:%M:%S",
        stream=sys.stderr,
    )
    log = logging.getLogger("longcat-demonic-nun-smoke")

    host_data_dir = os.environ.get("NEXUS_HOST_DATA_DIR", "D:/longcat_install")
    os.environ["NEXUS_HOST_DATA_DIR"] = host_data_dir
    output_dir = Path(host_data_dir) / f"smoke_demonic_nun_full_{profile.name}"
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        if not torch.cuda.is_available():
            log.error("CUDA not available; smoke requires a GPU.")
            return 1
        log.info(
            "device=%s vram=%.2f GiB",
            torch.cuda.get_device_name(0),
            torch.cuda.get_device_properties(0).total_memory / 1024**3,
        )
    except ImportError as e:
        log.error("torch import failed: %s", e)
        return 1

    eff_scenes = preset_scenes if preset_scenes is not None else _SCENES
    eff_transitions = preset_transitions if preset_transitions is not None else _TRANSITIONS_SPEC
    expected_draft = _expected_draft_frames(eff_scenes, _FPS, _OVERLAP_FRAMES)
    expected_w = profile.final_width
    expected_h = profile.final_height
    log.info(
        "profile=%s preset=%s config: scenes=%d seed=%d draft=%dx%d->upscale=%dx%d "
        "expected_frames=%d wall_budget=%.0fs vram_budget=%.1fGiB",
        profile.name, args.preset or "<inline>", len(eff_scenes), _DEFAULT_SEED,
        profile.draft_width, profile.draft_height, expected_w, expected_h,
        expected_draft, wall_budget, vram_budget,
    )
    for i, sc in enumerate(eff_scenes):
        log.info("scene[%d] motion=%s duration=%.1fs prompt=%r",
                 i, sc.get("motion_intensity", "dynamic"),
                 sc["duration_seconds"], sc["prompt"][:90])
    for i, t in enumerate(eff_transitions):
        log.info("transition[%d]: type=%s bridge=%r",
                 i, t["type"], t.get("bridge_text", ""))

    from longcat_video_worker.pipeline_longcat import render

    image_path = args.image_path
    if image_path:
        from pathlib import Path as _P
        ip = _P(image_path)
        if not ip.exists():
            log.error("--image-path does not exist: %s", image_path)
            return 3
        log.info("i2v anchor image=%s", ip)
    else:
        log.info("t2v mode (no --image-path supplied; subject hallucinated from prompt)")
    request = _build_request(
        profile,
        image_path=image_path,
        scenes_src=preset_scenes,
        transitions_src=preset_transitions,
    )
    torch.cuda.reset_peak_memory_stats()
    t0 = time.monotonic()
    try:
        out_path = render(
            request,
            output_dir=output_dir,
            host_data_dir=host_data_dir,
            offload_mode="partial",
            block_swap_count=46,
            strict_scene_errors=True,
        )
    except RuntimeError as e:
        msg = str(e)
        if "out of memory" in msg.lower():
            log.error("VRAM OOM: %s", e)
            return 2
        log.error("RuntimeError: %s", e)
        traceback.print_exc()
        return 1
    except FileNotFoundError as e:
        log.error("missing weights or nvvfx: %s", e)
        return 3
    except Exception as e:  # noqa: BLE001
        log.error("unexpected exception: %s", e)
        traceback.print_exc()
        return 1

    dt = time.monotonic() - t0
    peak_gib = torch.cuda.max_memory_allocated() / 1024**3
    log.info("render done: %s (%.2f s, peak %.2f GiB)", out_path, dt, peak_gib)

    if dt > wall_budget:
        log.error("wall=%.1fs exceeded budget=%.1fs", dt, wall_budget)
        return 4
    if peak_gib > vram_budget:
        log.error("peak VRAM=%.2f GiB exceeded budget=%.2f GiB", peak_gib, vram_budget)
        return 2

    try:
        actual_frames = _probe_frame_count(out_path)
        actual_w, actual_h = _probe_dimensions(out_path)
    except subprocess.CalledProcessError as e:
        log.error("ffprobe failed: %s", e)
        return 4
    log.info("frame_count=%d (expected_draft=%d) dimensions=%dx%d (expected_upscale=%dx%d)",
             actual_frames, expected_draft, actual_w, actual_h, expected_w, expected_h)
    if actual_frames != expected_draft:
        log.error("frame count mismatch: expected=%d actual=%d",
                  expected_draft, actual_frames)
        return 4
    if (actual_w, actual_h) != (expected_w, expected_h):
        log.warning(
            "dimension mismatch: expected=%dx%d actual=%dx%d (RTX upscale may have been skipped)",
            expected_w, expected_h, actual_w, actual_h,
        )

    if args.skip_score:
        log.info("PASS (skip-score)")
        return 0

    try:
        from longcat_video_worker.boundary_telemetry import (
            boundary_frame_indices,
            compute_boundary_break_scores,
            merge_scores_into_report,
            summarize_scores,
        )

        per_scene_num_frames = [int(round(sc["duration_seconds"] * _FPS)) for sc in eff_scenes]
        per_scene_overlap = [0] + [_OVERLAP_FRAMES] * (len(eff_scenes) - 1)
        boundaries = boundary_frame_indices(per_scene_num_frames, per_scene_overlap)
        log.info("computed boundary indices (draft-frame domain): %s", boundaries)

        frames = _decode_mp4_to_array(out_path, actual_h, actual_w)
        scores = compute_boundary_break_scores(frames, boundaries)
        summary = summarize_scores(scores)
        log.info("boundary_scores=%s summary=%s", scores, summary)
        report_path = (
            out_path.parent / f"{out_path.stem}.render_report.json"
        )
        merged = merge_scores_into_report(report_path, scores)
        log.info("scores merged into %s: %s", report_path, merged)
        if report_path.exists():
            with report_path.open() as fh:
                log.info("render_report.json keys: %s",
                         sorted(json.load(fh).keys()))
    except subprocess.CalledProcessError as e:
        log.warning("ffmpeg decode failed for scoring (non-fatal): %s", e)
    except Exception as e:  # noqa: BLE001
        log.warning("scoring failed (non-fatal): %s", e)
        traceback.print_exc()

    log.info("PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
