"""Multi-scene continuation render for the LTX-2 19B native path.

Spec 048 F4 — the ``render.path == "manual_stitch"`` branch. A 2-3 scene
video where scene N is an exact, context-preserving continuation of
scene N-1:

  - Scene prompts are encoded in one upfront batched Gemma pass, then
    Gemma is unloaded once and the 19B transformer is loaded and kept
    **warm across every scene** (no per-scene evict).
  - Scene 0 is an i2v render anchored on the user's input image.
  - Scene N>0 carries scene N-1's 3-frame **latent** tail as a
    ``VideoConditionByReferenceLatent`` — no VAE decode/re-encode
    roundtrip — plus an optional low-weight global anchor to scene 0's
    first frame to cap cumulative drift.
  - After denoise the grids are decoded; ``seam.apply_seam`` cleans each
    photometric/temporal boundary before the segments are stitched and
    the esrgan + RIFE post-render tail runs.

Boundary: extension-local. Imports ``pipeline_ltx2`` (same extension)
for the shared native-stack and render primitives.
"""

from __future__ import annotations

import asyncio
import gc
import os
from typing import Any

from . import ltx2_conditioning as cond
from . import ltx2_upsampler as ups
from . import pipeline_ltx2 as pl
from .ffmpeg_io import stitch_segments, trim_to_duration
from .rpc import ErrorCodes, Notifications
from .seam import apply_seam, seam_params
from .vram import evict_models, memory_stats

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


def _compose_scene_prompt(
    prompt_obj: dict[str, Any],
    scene_action: str,
    motion_intensity: str = pl._DEF_MOTION_INTENSITY,
) -> str:
    """Compose one scene's effective prompt from the global prompt parts.

    Mirrors the single-clip prompt builder: character + per-scene action
    + style + the motion-intensity nudge + the anti-artifact quality
    suffix.
    """
    character = (prompt_obj.get("character") or "").strip()
    style = (prompt_obj.get("style") or "").strip()
    action = scene_action.strip() or (
        prompt_obj.get("action")
        or prompt_obj.get("prompt")
        or prompt_obj.get("text")
        or ""
    ).strip()
    motion = pl._MOTION_INTENSITY_SUFFIX.get(
        motion_intensity, pl._MOTION_INTENSITY_SUFFIX[pl._DEF_MOTION_INTENSITY]
    )
    return ". ".join(
        p
        for p in (character, action, style, motion, pl._POSITIVE_QUALITY_SUFFIX)
        if p
    )


def _build_scene_specs(
    plan: dict[str, Any], geometry: dict[str, int]
) -> list[dict[str, Any]]:
    """Build per-scene specs from ``plan["segments"]``.

    Each spec carries the scene index, an 8n+1-snapped frame count, the
    per-scene seed, and the per-scene action prompt.
    """
    segments = plan.get("segments") or []
    default_frames = geometry["num_frames"]
    specs: list[dict[str, Any]] = []
    for i, seg in enumerate(segments):
        if not isinstance(seg, dict):
            continue
        frame_count = pl._coerce_int(
            seg.get("frame_count") or seg.get("num_frames"), default_frames
        )
        frame_count = (
            pl._snap_to_multiple(frame_count - 1, pl._VAE_TIME_SCALE, 0) + 1
        )
        specs.append(
            {
                "index": pl._coerce_int(seg.get("index"), i),
                "num_frames": frame_count,
                "seed": pl._coerce_int(seg.get("seed"), 0),
                "action_prompt": str(seg.get("action_prompt") or "").strip(),
            }
        )
    return specs


def _scene_geometry(
    base_geometry: dict[str, int], num_frames: int
) -> dict[str, int]:
    """Copy the base geometry with a per-scene frame count."""
    scene = dict(base_geometry)
    scene["num_frames"] = num_frames
    return scene


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


async def run_multiscene(
    worker: Any,
    rs: Any,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
) -> None:
    """Execute the ``manual_stitch`` multi-scene continuation render."""
    plan = rs.plan
    advanced = raw_params.get("advanced") or {}
    render_block = plan.get("render") if isinstance(plan.get("render"), dict) else {}
    geometry = pl._resolve_geometry(plan)
    samp = pl._resolve_sampling(advanced)
    vae_tiling = pl._resolve_vae_tiling(advanced)
    paths = pl._resolve_paths()

    scenes = _build_scene_specs(plan, geometry)
    if not scenes:
        await pl._emit_error(
            worker, rs.run_id, ErrorCodes.PLAN_INVALID,
            "manual_stitch render plan carries no segments",
        )
        return

    prompt_obj = raw_params.get("prompt") or {}
    negative_prompt = (
        prompt_obj.get("negative") or pl._DEF_NEGATIVE_PROMPT
    ).strip()
    scene_prompts = [
        _compose_scene_prompt(
            prompt_obj, s["action_prompt"], samp["motion_intensity"]
        )
        for s in scenes
    ]
    if not any(p.strip() for p in scene_prompts):
        await pl._emit_error(
            worker, rs.run_id, ErrorCodes.PLAN_INVALID,
            "manual_stitch render plan has no prompt text",
        )
        return

    if rs.cancelled:
        await pl._emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_CANCELLED,
            "render cancelled by user",
        )
        return

    scene_count = len(scenes)
    await worker.emit_notification(
        Notifications.SEGMENT_STARTED,
        {
            "run_id": rs.run_id,
            "segment_index": 0,
            "segment_count": scene_count,
            "effective_prompt": scene_prompts[0],
        },
    )

    # Stage 1 — one batched Gemma encode for every scene prompt.
    try:
        scene_embeds = await asyncio.to_thread(
            pl.encode_prompts_with_gemma,
            paths,
            scene_prompts,
            negative_prompt,
            samp["guidance_scale"],
            worker.logger,
        )
    except Exception as e:  # noqa: BLE001 — actionable error, not a stack
        await pl._emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED,
            f"ltxv2 multi-scene Gemma encode failed: {e}",
        )
        return

    # Stage 1b — i2v keyframe for scene 0. Two-stage encodes it at both
    # the half-res (stage 1) and full-res (refine) geometry.
    input_image_block = raw_params.get("input_image") or {}
    input_image_path = (
        input_image_block.get("path")
        if isinstance(input_image_block, dict)
        else None
    )
    keyframe_strength = pl._coerce_float(
        advanced.get("keyframe_strength"), pl._DEF_KEYFRAME_STRENGTH
    )
    two_stage = bool(samp.get("two_stage", pl._DEF_TWO_STAGE))
    geo_half = {
        **geometry,
        "width": geometry["width"] // 2,
        "height": geometry["height"] // 2,
    }
    kf_full = None
    kf_half = None
    if input_image_path:
        try:
            kf_full = await asyncio.to_thread(
                pl.encode_keyframe, paths, input_image_path, geometry,
                keyframe_strength, worker.logger,
            )
            if two_stage:
                kf_half = await asyncio.to_thread(
                    pl.encode_keyframe, paths, input_image_path, geo_half,
                    keyframe_strength, worker.logger,
                )
        except Exception as e:  # noqa: BLE001
            await pl._emit_error(
                worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED,
                f"ltxv2 multi-scene keyframe encode failed: {e}",
            )
            return

    await worker.emit_notification(
        Notifications.PROGRESS,
        {
            "run_id": rs.run_id,
            "overall_percent": 15.0,
            "current_segment_index": 0,
            "segment_count": scene_count,
            "message": "Scenes encoded; loading transformer",
        },
    )

    # Stage 2 — load the 19B transformer once; it stays warm across scenes.
    try:
        await asyncio.to_thread(pl._ensure_stack, rs, cache, worker.logger)
    except Exception as e:  # noqa: BLE001
        await pl._emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED,
            f"ltxv2 native stack load failed: {e}",
        )
        return

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

    # Stage 3 — denoise every scene with the transformer warm, carrying
    # the latent tail forward. Two-stage runs each scene as half-res
    # stage 1 -> 2x upsample -> refine; the continuation tail is sliced
    # from the half-res stage-1 grid so it conditions the next scene's
    # stage-1 pass at the matching resolution.
    upsampler = None
    vae_encoder = None
    if two_stage:
        import torch as _torch

        upsampler = ups.load_latent_upsampler(
            paths.latent_upsampler, "cpu", worker.logger
        )
        vae_encoder = cond.load_video_encoder(
            paths.video_vae, _torch.device("cpu"), worker.logger
        )
    keyframe_stage1 = kf_half if two_stage else kf_full
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
            await worker.emit_notification(
                Notifications.PROGRESS,
                {
                    "run_id": rs.run_id,
                    "overall_percent": 15.0 + 55.0 * (i + 1) / scene_count,
                    "current_segment_index": i,
                    "segment_count": scene_count,
                    "message": f"Scene {i + 1}/{scene_count} denoised",
                },
            )
    except RuntimeError as e:
        msg = str(e)
        code = (
            ErrorCodes.VRAM_BUDGET_EXCEEDED
            if "out of memory" in msg.lower()
            else ErrorCodes.RENDER_FAILED
        )
        await pl._emit_error(worker, rs.run_id, code, msg)
        return
    except Exception as e:  # noqa: BLE001
        await pl._emit_error(worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e))
        return
    finally:
        pl.evict_transformer(rs.pipe) if rs.pipe is not None else None
        cache["bundle"] = None
        rs.pipe = None
        evict_models(rs)
        gc.collect()

    # Stage 4 — decode each scene, seam the boundary, write per-scene MP4.
    import torch

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    seam_cfg = seam_params(
        advanced,
        os.environ.get("NEXUS_VIDEO_LTX23_SEAM_METHOD", "").strip() or None,
    )
    segment_paths: list[Any] = []
    prev_frames: list[Any] | None = None
    try:
        for i, grid in enumerate(grids):
            frames = await asyncio.to_thread(
                pl.decode_grid_to_frames,
                grid.to(device),
                paths,
                device,
                worker.logger,
                scenes[i]["num_frames"],
                vae_tiling,
            )
            if prev_frames is not None:
                frames = apply_seam(
                    prev_frames[-_SEAM_PREV_TAIL:], list(frames),
                    seam_cfg, worker.logger,
                )
            seg_dir = rs.workdir / "segments" / f"{i:03d}"
            seg_dir.mkdir(parents=True, exist_ok=True)
            seg_path = seg_dir / "raw.mp4"
            pl._write_frames_as_mp4(frames, seg_path, geometry["frame_rate"])
            segment_paths.append(seg_path)
            prev_frames = frames
            await worker.emit_notification(
                Notifications.SEGMENT_COMPLETED,
                {
                    "run_id": rs.run_id,
                    "segment_index": i,
                    "segment_count": scene_count,
                },
            )
    except Exception as e:  # noqa: BLE001
        await pl._emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED,
            f"ltxv2 multi-scene decode/seam failed: {e}",
        )
        return

    if prev_frames:
        try:
            last_frame_path = rs.workdir / "segments" / "last_frame.png"
            pl._save_last_frame(prev_frames, last_frame_path)
        except Exception:  # noqa: BLE001 — last-frame artifact is advisory
            pass

    rs.generation_count += 1
    await worker.emit_notification(
        Notifications.MEMORY_STATS,
        {
            "run_id": rs.run_id,
            "segment_index": scene_count - 1,
            **memory_stats(rs.generation_count),
        },
    )

    # Stage 5 — stitch, esrgan upscale + RIFE tail, trim.
    final_dir = rs.workdir / "final"
    final_dir.mkdir(parents=True, exist_ok=True)
    stitched_path = final_dir / "stitched.mp4"
    final_path = final_dir / "final.mp4"
    duration = float(
        plan.get("requested_duration_seconds")
        or plan.get("duration_seconds")
        or sum(
            s["num_frames"] / max(1, geometry["frame_rate"]) for s in scenes
        )
    )
    stitch_segments(segment_paths, stitched_path)
    pre_trim = await asyncio.to_thread(
        pl.post_render_tail,
        stitched_path,
        final_dir,
        advanced,
        geometry,
        worker.logger,
    )
    trim_to_duration(pre_trim, final_path, duration_s=duration)

    await worker.emit_notification(
        Notifications.ARTIFACT_CREATED,
        {
            "run_id": rs.run_id,
            "kind": "final_video",
            "path": str(final_path),
            "mime": "video/mp4",
            "duration_seconds": duration,
        },
    )
    pl._write_render_sidecar(
        final_dir / "render.json",
        advanced=advanced,
        paths=paths,
        geometry=geometry,
        samp=samp,
        seed=scenes[0]["seed"],
        conditioning={
            "mode": "i2v" if kf_full is not None else "t2v",
            "render_path": "manual_stitch",
            "keyframe_strength": keyframe_strength,
            "image_cond_noise_scale": samp["image_cond_noise_scale"],
            "condition_strength": condition_strength,
            "condition_tail_frames": tail_frames,
            "adain_factor": _ADAIN_FACTOR if scene_count > 1 else 0.0,
        },
        scene_count=scene_count,
        duration=duration,
        logger=worker.logger,
    )

    await worker.emit_notification(
        Notifications.DONE,
        {
            "run_id": rs.run_id,
            "final_path": str(final_path),
            "duration_seconds": duration,
            "segment_count": scene_count,
            "profile": "rtx50-ltx2-gguf",
        },
    )
