"""Separate render pipeline for the LTX-Video 0.9.7 13B GGUF profile.

This is a DIFFERENT model line from the LTX-2.3-22B path in
``pipeline_diffusers.py``:

  - base_model ``Lightricks/LTX-Video`` (the original LTX-Video 0.9.x
    line), NOT LTX-2 / LTX-2.3
  - T5-XXL text encoder (NOT Gemma-3)
  - its own VAE (companion ``ltxv-13b-0.9.7-vae-BF16.safetensors``)
  - diffusers-native ``LTXConditionPipeline`` family + the documented
    upstream LTX-Video GGUF recipe
    (``LTXVideoTransformer3DModel.from_single_file(gguf,
    GGUFQuantizationConfig(...))``) — NOT the dg845 key-rename hack the
    LTX-2.3 GGUF needs.

Why it is its own module (not a branch inside the 85 KB
``pipeline_diffusers.py``): the user asked for a *separate* selectable
pipeline; keeping it isolated means it cannot destabilise the working
LTX-2.3 paths and the dispatch fork in ``__main__`` is a one-liner.

The Q4_K_M transformer (~8 GB) + companion VAE (~2.3 GB) fit a 16 GB
card RESIDENT — it never pages, so the ``GGUFParameter``-opaque-to-
offload-hooks wall that blocks the LTX-2.3 ``rtx50-gguf`` path does not
apply here. T5 is the only component that may need offload, handled by
``offload_mode='model'`` (the profile default).

GPU-UNVERIFIED: this follows the stable, documented diffusers
LTX-Video GGUF recipe + the exact RPC contract from
``pipeline_fake``/``pipeline_diffusers``, but the first real render on
a 16 GB card is the verification. Plan-time Guard 0d
(``[ltxv097_under_construction]``, gated on
``runtime_selection::ltxv097_proven()``) keeps the path rejected until
that first GPU run passes — flip the flag only then. The defensive
import/probe guards below turn an API/model-shape mismatch into an
actionable error notification instead of a deep stack trace.
"""

from __future__ import annotations

import asyncio
import functools
import gc
import os
import uuid
from pathlib import Path
from typing import Any, Callable

from .ffmpeg_io import stitch_segments, trim_to_duration
from .io_safety import ensure_dict, sanitize_run_id, sanitize_workdir
from .planning_validate import validate_plan
from .rpc import ErrorCodes, Methods, Notifications
from .seam import apply_seam, seam_params
from .vram import evict_models, memory_stats

# Lazy torch handle, populated on first pipeline load (mirrors the
# pipeline_diffusers `_LAZY_TORCH` pattern; the heavy import is
# pre-warmed on the main thread in __main__).
_LAZY_TORCH: Any = None

# Default transformer quant from the wsbagnsv1 ladder. Q6_K (~10 GB)
# is the 16 GB-fit pick: Q8_0 (14 GB) + T5/VAE/activations spills into
# Windows shared GPU memory on a 16 GB card (user-confirmed
# 2026-05-18). The forthcoming model dropdown makes this per-render
# selectable; Q6_K is the safe default. Override with
# NEXUS_VIDEO_LTX23_LTXV097_GGUF (or the future model_id param).
_DEFAULT_GGUF_BASENAME = "ltxv-13b-0.9.7-dev-Q6_K.gguf"
_GGUF_REPO = "wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF"
# CORRECT diffusers base for the 13b-0.9.7-dev GGUF: the dedicated
# diffusers-format repo (model_index + transformer/config + the proper
# 0.9.7 `vae/` + T5 + tokenizer + scheduler). NOT the `Lightricks/
# LTX-Video` monorepo (mixes 0.9.0–0.9.8 / 2B / 13B configs — pairing
# the GGUF with its transformer/vae config produced pure-noise output,
# RCA 2026-05-18). The companion ComfyUI VAE blob is NOT used: this
# repo's `vae/` is the canonical diffusers 0.9.7 video VAE.
_BASE_REPO = "Lightricks/LTX-Video-0.9.7-dev"

# Official 0.9.7 spatial latent upscaler (two-pass 720p). The on-disk
# asset is a single safetensors (ComfyUI shape) under the LTX-Video
# repo dir, not a diffusers tree — resolution handles both + the HF id.
_UPSCALER_REPO = "Lightricks/ltxv-spatial-upscaler-0.9.7"
_UPSCALER_SINGLE_REL = (
    "models/Lightricks/LTX-Video/ltxv-spatial-upscaler-0.9.7.safetensors"
)

# Sampling baseline (the example workflow + diffusers LTXConditionPipeline
# defaults). Every value is overridable via the render request's
# `advanced` block — these are the defaults a stable render starts from.
_BASE_W, _BASE_H = 768, 512          # native 13b-0.9.7 gen resolution
_DEF_STEPS = 30
# guidance_scale: the motion experiment (2026-05-18) showed g=3.0
# (diffusers default) → near-static even with motion-rich prompts
# (motion 0.029); g=6.0 + explicit motion language → genuine coherent
# camera/scene motion (0.123) with NO quality loss (GGUF Q-quant has
# no fp8 e4m3 saturation, so >5.5 is safe here, unlike the fp8/nvfp4
# LTX-2.3 profiles). 6.0 is the established base-motion baseline.
# NOTE: LTX is heavily prompt-driven for motion — static scene
# descriptions still yield static video at any guidance; prompts must
# describe camera/subject motion explicitly.
_DEF_GUIDANCE = 6.0
_DEF_DECODE_TIMESTEP = 0.05
_DEF_DECODE_NOISE_SCALE = 0.025
# image_cond_noise_scale: noise mixed into the conditioning frame. The
# workflow's "Set VAE Decoder Noise [0.05, 0.025]" is decode_timestep
# + decode_noise_scale — NOT this. 0.025 over-anchors → near-static
# conditioned scene 2 (2026-05-18 visual RCA). diffusers' default 0.15
# lets the continuation actually move while staying on-identity.
_DEF_IMAGE_COND_NOISE_SCALE = 0.15
# LTXVideoCondition.strength: 1.0 = fully anchor scene 2 to the prev
# frame (over-preserved/static). < 1.0 lets it diverge & animate while
# inheriting identity/style. 0.7 is the motion-vs-continuity baseline.
_DEF_CONDITION_STRENGTH = 0.7
# How many trailing frames of the previous scene to feed as the
# continuation's VIDEO condition (vs a single still, which over-anchors
# → static). One LTX latent temporal unit = 8 frames, so a meaningful
# motion-bearing tail is a small multiple. 24 ≈ 1 s @ 24fps of motion
# context; tunable via advanced.condition_tail_frames.
_DEF_CONDITION_TAIL_FRAMES = 24


class Ltxv097RunState:
    def __init__(self, run_id: str, workdir: Path, plan: dict[str, Any]):
        self.run_id = run_id
        self.workdir = workdir
        self.plan = plan
        self.cancelled = False
        self.generation_count = 0
        self.resumed_from_segment: int = 0
        self.bg_task: Any = None
        self.pipe: Any = None


def register_ltxv097_handlers(worker) -> None:
    state: dict[str, Ltxv097RunState] = {}
    # One cached pipeline per warm worker (profile-pinned process).
    cache: dict[str, Any] = {"pipe": None}

    async def models_list(_params):
        return {
            "models": [
                {"id": "ltxv-13b-0.9.7-dev", "available": True, "size_mb": 8200},
            ]
        }

    async def plan_validate(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        return validate_plan(
            params.get("plan", params), profile="rtx50-ltxv097-gguf"
        )

    async def render_start(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = sanitize_run_id(
            params.get("request_id"),
            fallback=f"run_{uuid.uuid4().hex[:12]}",
        )
        plan = ensure_dict(
            params.get("video") or params.get("plan"), name="plan", default={}
        )
        workdir = sanitize_workdir(
            params.get("workdir"),
            fallback=Path.cwd() / "ltxv097_workdir" / run_id,
        )
        workdir.mkdir(parents=True, exist_ok=True)

        rs = Ltxv097RunState(run_id=run_id, workdir=workdir, plan=plan)
        try:
            rs.resumed_from_segment = max(
                0, int(params.get("resumed_from_segment", 0))
            )
        except (TypeError, ValueError):
            rs.resumed_from_segment = 0
        state[run_id] = rs

        rs.bg_task = asyncio.create_task(
            _render_loop(worker, rs, params, cache),
            name=f"ltxv097-render-{run_id}",
        )
        return {"run_id": run_id, "status": "started"}

    async def render_cancel(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = params.get("run_id") or params.get("request_id")
        rs = state.get(run_id)
        if rs is None:
            raise ValueError(f"unknown run: {run_id}")
        rs.cancelled = True
        return {"run_id": run_id, "cancel_requested": True}

    async def segment_retry(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = sanitize_run_id(
            params.get("request_id") or params.get("run_id"),
            fallback=f"run_{uuid.uuid4().hex[:12]}",
        )
        try:
            seg_index = int(params["segment_index"])
        except (KeyError, ValueError, TypeError) as e:
            raise ValueError("segment_index missing or non-integer") from e
        if seg_index < 0:
            raise ValueError(
                f"segment_index must be non-negative, got {seg_index}"
            )
        plan = ensure_dict(
            params.get("video") or params.get("plan"), name="plan", default={}
        )
        workdir = sanitize_workdir(
            params.get("workdir"),
            fallback=Path.cwd() / "ltxv097_workdir" / run_id,
        )
        workdir.mkdir(parents=True, exist_ok=True)
        rs = state.get(run_id)
        if rs is None:
            rs = Ltxv097RunState(run_id=run_id, workdir=workdir, plan=plan)
            state[run_id] = rs
        else:
            rs.cancelled = False
            rs.plan = plan
            rs.workdir = workdir
        rs.bg_task = asyncio.create_task(
            _retry_segment_loop(worker, rs, params, cache, seg_index),
            name=f"ltxv097-retry-{run_id}-seg{seg_index}",
        )
        return {
            "run_id": run_id,
            "segment_index": seg_index,
            "status": "retrying",
        }

    worker.register(Methods.MODELS_LIST, models_list)
    worker.register(Methods.PLAN_VALIDATE, plan_validate)
    worker.register(Methods.RENDER_START, render_start)
    worker.register(Methods.RENDER_CANCEL, render_cancel)
    worker.register(Methods.SEGMENT_RETRY, segment_retry)


# --------------------------------------------------------------------------
# Model resolution + pipeline construction (the only 0.9.7-specific code)
# --------------------------------------------------------------------------


def _resolve_ltxv097_paths() -> tuple[Path, str]:
    """(transformer_gguf, base_repo_dir_or_id).

    Resolution: explicit env override → the standard
    ``<NEXUS_HOST_DATA_DIR>/models/<owner>/<name>/`` convention (matches
    ``installer._dest_dir``). The base repo falls back to the bare HF id
    so a first run can still pull the diffusers components if only the
    GGUF was staged. The VAE is NOT a separate artifact — it comes from
    the base 0.9.7-dev repo's own canonical `vae/`.
    """
    host_data = os.environ.get("NEXUS_HOST_DATA_DIR", "")

    def _models_dir(repo: str) -> Path:
        return Path(host_data).joinpath("models", *repo.split("/"))

    gguf_env = os.environ.get("NEXUS_VIDEO_LTX23_LTXV097_GGUF", "").strip()
    if gguf_env:
        gguf = Path(gguf_env)
    else:
        gguf = _models_dir(_GGUF_REPO) / _DEFAULT_GGUF_BASENAME

    base_env = os.environ.get("NEXUS_VIDEO_LTX23_MODEL_DIR", "").strip()
    if base_env:
        base = base_env
    else:
        base_dir = _models_dir(_BASE_REPO)
        base = str(base_dir) if base_dir.is_dir() else _BASE_REPO

    return gguf, base


def _import_ltx_pipeline_class() -> Any:
    """Probe the 0.9.x LTX pipeline class from the pinned diffusers.

    ``LTXConditionPipeline`` (0.9.5+, image/video conditioning) is
    preferred; falls back to the image-to-video / text-to-video
    classes. Raises a clear error naming the unmet expectation when
    none import — the first GPU run then gets an actionable message
    instead of an ImportError stack.
    """
    # `LTXConditionPipeline` is the PRIMARY: it is the only class that
    # exposes the LTX decode controls (`decode_timestep`,
    # `decode_noise_scale`) AND the scene-continuation API
    # (`conditions=[LTXVideoCondition(image, frame_index)]`) — both
    # mandatory for non-garbage 0.9.7 output (RCA 2026-05-18; the
    # bare-`image=` ImageToVideo path lacks the decode controls).
    last: Exception | None = None
    for name in (
        "LTXConditionPipeline",
        "LTXImageToVideoPipeline",
        "LTXPipeline",
    ):
        try:
            mod = __import__("diffusers", fromlist=[name])
            return getattr(mod, name)
        except (ImportError, AttributeError) as e:  # noqa: PERF203
            last = e
    raise RuntimeError(
        "no LTX-Video 0.9.x pipeline class importable from the pinned "
        f"diffusers (tried LTXConditionPipeline/LTXImageToVideoPipeline/"
        f"LTXPipeline): {last}. The 0.9.7 profile needs diffusers' native "
        "LTX-Video support."
    )


def _build_ltxv097_pipeline(offload_mode: str, logger: Any) -> Any:
    """Load the 0.9.7 pipeline: GGUF transformer + the 0.9.7-dev base
    (T5 + tokenizer + scheduler + canonical `vae/`).

    Pairing the GGUF with the matching `Lightricks/LTX-Video-0.9.7-dev`
    diffusers config is mandatory: the monorepo's mixed config produced
    pure noise (RCA 2026-05-18). Every external-shape assumption is
    guarded so a mismatch surfaces as a RuntimeError naming the piece.
    """
    global _LAZY_TORCH
    import torch  # pre-warmed on main thread in __main__

    _LAZY_TORCH = torch

    try:
        from diffusers import (  # type: ignore
            GGUFQuantizationConfig,
            LTXVideoTransformer3DModel,
        )
    except ImportError as e:
        raise RuntimeError(
            "diffusers is missing GGUFQuantizationConfig / "
            f"LTXVideoTransformer3DModel ({e}); the pinned diffusers "
            "build does not expose the LTX-Video GGUF recipe."
        ) from e

    gguf_path, base_repo = _resolve_ltxv097_paths()
    if not gguf_path.is_file():
        raise RuntimeError(
            f"LTX-Video 0.9.7 GGUF transformer not found at {gguf_path}. "
            f"Install the '{_GGUF_REPO}' weights or set "
            "NEXUS_VIDEO_LTX23_LTXV097_GGUF."
        )

    logger.info(
        "ltxv097.load_pipeline",
        gguf=str(gguf_path),
        base=base_repo,
        offload_mode=offload_mode,
    )

    transformer = LTXVideoTransformer3DModel.from_single_file(
        str(gguf_path),
        quantization_config=GGUFQuantizationConfig(
            compute_dtype=torch.bfloat16
        ),
        torch_dtype=torch.bfloat16,
    )

    # VAE + T5 + scheduler come from the 0.9.7-dev base repo's own
    # canonical diffusers components (its `vae/` is the correct 0.9.7
    # video VAE — the ComfyUI companion blob is not used).
    pipe_cls = _import_ltx_pipeline_class()
    pipe = pipe_cls.from_pretrained(
        base_repo,
        transformer=transformer,
        torch_dtype=torch.bfloat16,
    )

    # VAE tiling + slicing — MANDATORY for 16 GB. The LTX video-VAE
    # encode/decode is a dominant transient peak: a fresh (no-cond)
    # scene fit at 11.7 GiB, but scene 2's `LTXVideoCondition`
    # cond-image VAE-ENCODE pushed peak past 16 GB → Windows
    # shared-mem crawl (~80 s/step vs 4 s/step), 2026-05-18. Tiling
    # processes the latent in spatial tiles so the VAE peak is bounded
    # regardless of resolution/conditioning; negligible quality cost.
    for obj, meth in (
        (pipe, "enable_vae_tiling"),
        (pipe, "enable_vae_slicing"),
        (getattr(pipe, "vae", None), "enable_tiling"),
        (getattr(pipe, "vae", None), "enable_slicing"),
    ):
        fn = getattr(obj, meth, None) if obj is not None else None
        if callable(fn):
            try:
                fn()
                logger.info("ltxv097.vae_mem_opt", applied=meth)
            except Exception as e:  # noqa: BLE001 — best effort
                logger.info("ltxv097.vae_mem_opt_skip", meth=meth, err=str(e))

    # GGUF transformer resident; T5 paged. Honour host-resolved mode.
    if offload_mode == "none":
        pipe.to("cuda")
    elif offload_mode == "sequential" and hasattr(
        pipe, "enable_sequential_cpu_offload"
    ):
        pipe.enable_sequential_cpu_offload()
    elif hasattr(pipe, "enable_model_cpu_offload"):
        # Default ('model') + any unmapped mode: model offload keeps the
        # GGUF transformer resident while T5/VAE swap as needed.
        pipe.enable_model_cpu_offload()
    else:
        pipe.to("cuda")
    return pipe


def _ensure_pipeline(rs: Ltxv097RunState, cache: dict[str, Any], logger: Any) -> Any:
    if cache.get("pipe") is not None:
        rs.pipe = cache["pipe"]
        return rs.pipe
    offload_mode = os.environ.get(
        "NEXUS_VIDEO_LTX23_OFFLOAD_MODE", "model"
    ).strip() or "model"
    pipe = _build_ltxv097_pipeline(offload_mode, logger)
    cache["pipe"] = pipe
    rs.pipe = pipe
    return pipe


# --------------------------------------------------------------------------
# Render loop — mirrors pipeline_diffusers._render_loop's contract exactly
# --------------------------------------------------------------------------


async def _render_loop(
    worker, rs: Ltxv097RunState, raw_params: dict[str, Any], cache: dict[str, Any]
) -> None:
    plan = rs.plan
    width = int(plan.get("width", 768))
    height = int(plan.get("height", 512))
    base_fps = int(plan.get("base_fps", 24))
    duration = float(
        plan.get("requested_duration_seconds", plan.get("duration_seconds", 10))
    )
    segments = plan.get("segments") or []
    if not segments:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.PLAN_INVALID,
            "render plan contains no segments",
        )
        return

    advanced = raw_params.get("advanced") or {}
    samp = _sampling_params(advanced)
    seam = seam_params(
        advanced,
        os.environ.get("NEXUS_VIDEO_LTX23_SEAM_METHOD", "").strip() or None,
    )
    upscale = _coerce_flag(advanced.get("upscale")) or _coerce_flag(
        os.environ.get("NEXUS_VIDEO_LTX23_UPSCALE")
    )
    # The official 0.9.7 two-pass renders native then 2x-upsamples;
    # 720p is the proven target (render 768x512 → 1536x1024 → 1280x720).
    target_size = (1280, 720) if upscale else None

    prompt_obj = raw_params.get("prompt") or {}
    global_action = prompt_obj.get("action") or prompt_obj.get("prompt") or ""
    negative_prompt = prompt_obj.get("negative") or ""
    style_anchor = (prompt_obj.get("style") or "").strip()
    character_anchor = (prompt_obj.get("character") or "").strip()

    input_image_block = raw_params.get("input_image") or {}
    input_image_path = (
        input_image_block.get("path")
        if isinstance(input_image_block, dict)
        else None
    )
    last_frame_image = _load_input_image(input_image_path, width, height)

    try:
        await asyncio.to_thread(_ensure_pipeline, rs, cache, worker.logger)
    except Exception as e:  # noqa: BLE001 — load failure → actionable error
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED,
            f"ltxv097 pipeline load failed: {e}",
        )
        return

    segment_paths: list[Path] = []
    segment_count = len(segments)

    if rs.resumed_from_segment > 0:
        await worker.emit_notification(
            Notifications.RESUME_ACKNOWLEDGED,
            {"run_id": rs.run_id, "resumed_from_segment": rs.resumed_from_segment},
        )

    for seg in segments:
        if rs.cancelled:
            await _emit_error(
                worker, rs.run_id, ErrorCodes.RENDER_CANCELLED,
                "render cancelled by user",
            )
            return

        seg_index = int(seg.get("index", 0))
        seg_frame_count = int(seg.get("frame_count", 97))
        seg_seed = int(seg.get("seed", 0))
        seg_action_prompt = (
            seg.get("action_prompt") or global_action
        ).strip()
        effective_prompt = _compose_prompt(
            character=character_anchor,
            action=seg_action_prompt,
            style=style_anchor,
        )

        await worker.emit_notification(
            Notifications.SEGMENT_STARTED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "segment_count": segment_count,
                "effective_prompt": effective_prompt,
            },
        )

        seg_dir = rs.workdir / "segments" / f"{seg_index:03d}"
        seg_dir.mkdir(parents=True, exist_ok=True)
        seg_path = seg_dir / "raw.mp4"
        last_frame_path = seg_dir / "last_frame.png"

        loop = asyncio.get_running_loop()

        def emit_step(step_idx: int, _seg=seg_index) -> None:
            asyncio.run_coroutine_threadsafe(
                worker.emit_notification(
                    Notifications.SEGMENT_STEP,
                    {
                        "run_id": rs.run_id,
                        "segment_index": _seg,
                        "segment_count": segment_count,
                        "step": step_idx + 1,
                        "total_steps": samp["num_inference_steps"],
                    },
                ),
                loop,
            )

        try:
            frames = await asyncio.to_thread(
                functools.partial(
                    _generate_segment_dispatch,
                    rs.pipe,
                    cache,
                    upscale,
                    target_size,
                    last_frame_image,
                    effective_prompt,
                    negative_prompt,
                    width,
                    height,
                    seg_frame_count,
                    seg_seed,
                    samp,
                    emit_step,
                    worker.logger,
                )
            )
        except RuntimeError as e:
            msg = str(e)
            code = (
                ErrorCodes.VRAM_BUDGET_EXCEEDED
                if "out of memory" in msg.lower()
                else ErrorCodes.RENDER_FAILED
            )
            await _emit_error(worker, rs.run_id, code, msg)
            return
        except Exception as e:  # noqa: BLE001
            await _emit_error(
                worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e)
            )
            return

        # `last_frame_image` here still holds the PREVIOUS segment's
        # tail (or the seg-0 still / None) — the only point both
        # boundary sides are in memory before `del frames`. apply_seam
        # is a no-op unless that is a non-empty frame list, so the
        # first conditioned segment passes through untouched.
        frames = apply_seam(
            last_frame_image, list(frames), seam, worker.logger
        )

        _write_frames_as_mp4(frames, seg_path, base_fps=base_fps)
        _save_last_frame(frames, last_frame_path)
        # Carry the previous scene's last-N frames (the motion-bearing
        # VIDEO TAIL) as the next scene's condition — a single still
        # over-anchors → static continuation (motion RCA 2026-05-18).
        _fl = list(frames)
        _tail_n = max(1, min(samp["condition_tail_frames"], len(_fl)))
        last_frame_image = _fl[-_tail_n:]
        if upscale:
            # Output is 720p but the next scene's stage-1 renders at
            # native res and VAE-encodes this tail as its condition —
            # keep the condition at the generation resolution.
            last_frame_image = _resize_frames(last_frame_image, width, height)
        segment_paths.append(seg_path)

        for kind, p, mime in (
            ("raw_video", seg_path, "video/mp4"),
            ("last_frame", last_frame_path, "image/png"),
        ):
            await worker.emit_notification(
                Notifications.ARTIFACT_CREATED,
                {
                    "run_id": rs.run_id,
                    "segment_index": seg_index,
                    "kind": kind,
                    "path": str(p),
                    "mime": mime,
                },
            )

        rs.generation_count += 1
        await worker.emit_notification(
            Notifications.MEMORY_STATS,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                **memory_stats(rs.generation_count),
            },
        )
        await worker.emit_notification(
            Notifications.SEGMENT_COMPLETED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "segment_count": segment_count,
            },
        )
        await worker.emit_notification(
            Notifications.PROGRESS,
            {
                "run_id": rs.run_id,
                "overall_percent": ((seg_index + 1) / segment_count) * 100,
                "current_segment_index": seg_index,
                "segment_count": segment_count,
                "message": f"Generated segment {seg_index + 1} of {segment_count}",
            },
        )

        del frames
        gc.collect()
        if _LAZY_TORCH is not None and _LAZY_TORCH.cuda.is_available():
            try:
                _LAZY_TORCH.cuda.empty_cache()
            except Exception:  # noqa: BLE001
                pass

    final_dir = rs.workdir / "final"
    final_dir.mkdir(parents=True, exist_ok=True)
    stitched_path = final_dir / "stitched.mp4"
    final_path = final_dir / "final.mp4"
    stitch_segments(segment_paths, stitched_path)
    trim_to_duration(stitched_path, final_path, duration_s=duration)

    cache["pipe"] = None
    cache["upsampler"] = None
    evict_models(rs)

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
    await worker.emit_notification(
        Notifications.DONE,
        {
            "run_id": rs.run_id,
            "final_path": str(final_path),
            "duration_seconds": duration,
            "segment_count": segment_count,
            "profile": "rtx50-ltxv097-gguf",
        },
    )


async def _retry_segment_loop(
    worker,
    rs: Ltxv097RunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
    seg_index: int,
) -> None:
    """Re-run a single segment. Mirrors pipeline_fake's retry contract:
    no re-stitch, no DONE — the Rust supervisor treats retry-completion
    distinctly from render-completion.
    """
    plan = rs.plan
    width = int(plan.get("width", 768))
    height = int(plan.get("height", 512))
    base_fps = int(plan.get("base_fps", 24))
    segments = plan.get("segments") or []
    segment_count = len(segments) or (seg_index + 1)
    seg = next(
        (s for s in segments if int(s.get("index", -1)) == seg_index),
        {"index": seg_index},
    )
    advanced = raw_params.get("advanced") or {}
    samp = _sampling_params(advanced)
    prompt_obj = raw_params.get("prompt") or {}
    effective_prompt = _compose_prompt(
        character=(prompt_obj.get("character") or "").strip(),
        action=(
            seg.get("action_prompt")
            or prompt_obj.get("action")
            or prompt_obj.get("prompt")
            or ""
        ).strip(),
        style=(prompt_obj.get("style") or "").strip(),
    )
    negative_prompt = prompt_obj.get("negative") or ""

    if rs.cancelled:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_CANCELLED,
            "segment retry cancelled before start",
        )
        return

    try:
        await asyncio.to_thread(_ensure_pipeline, rs, cache, worker.logger)
    except Exception as e:  # noqa: BLE001
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED,
            f"ltxv097 pipeline load failed: {e}",
        )
        return

    await worker.emit_notification(
        Notifications.SEGMENT_STARTED,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            "segment_count": segment_count,
            "retry": True,
        },
    )

    seg_dir = rs.workdir / "segments" / f"{seg_index:03d}"
    seg_dir.mkdir(parents=True, exist_ok=True)
    seg_path = seg_dir / "raw.mp4"
    last_frame_path = seg_dir / "last_frame.png"
    prev_last = (
        rs.workdir / "segments" / f"{seg_index - 1:03d}" / "last_frame.png"
    )
    cond_image = _load_input_image(
        str(prev_last) if prev_last.is_file() else None, width, height
    )

    try:
        frames = await asyncio.to_thread(
            functools.partial(
                _generate_segment,
                rs.pipe,
                cond_image,
                effective_prompt,
                negative_prompt,
                width,
                height,
                int(seg.get("frame_count", 97)),
                int(seg.get("seed", 0)),
                samp,
                None,
            )
        )
    except Exception as e:  # noqa: BLE001
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e)
        )
        return

    # No seam treatment on retry: recovery conditions on the prior
    # segment's single last_frame.png (not the in-memory motion tail
    # apply_seam needs), and the retry contract re-writes raw.mp4 in
    # place without re-stitching — the boundary is re-treated when a
    # full render re-runs the loop.
    _write_frames_as_mp4(frames, seg_path, base_fps=base_fps)
    _save_last_frame(frames, last_frame_path)

    for kind, p, mime in (
        ("raw_video", seg_path, "video/mp4"),
        ("last_frame", last_frame_path, "image/png"),
    ):
        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "kind": kind,
                "path": str(p),
                "mime": mime,
                "retry": True,
            },
        )
    rs.generation_count += 1
    await worker.emit_notification(
        Notifications.MEMORY_STATS,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            **memory_stats(rs.generation_count),
        },
    )
    await worker.emit_notification(
        Notifications.SEGMENT_COMPLETED,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            "segment_count": segment_count,
            "retry": True,
        },
    )


# --------------------------------------------------------------------------
# Generation + IO helpers (self-contained — keeps this pipeline separate
# from the 85 KB LTX-2.3 module; logic mirrors its proven equivalents)
# --------------------------------------------------------------------------


def _sampling_params(advanced: dict[str, Any]) -> dict[str, Any]:
    """The tunable sampling baseline. Every key is overridable via the
    request's `advanced` block; absent/`null` → the documented default
    (example-workflow + diffusers `LTXConditionPipeline` values). This
    is the single source of truth for #4 "adjustable params".
    """
    g = advanced.get
    return {
        "num_inference_steps": int(
            _or_default(g("num_inference_steps"), _DEF_STEPS)
        ),
        "guidance_scale": float(
            _or_default(g("guidance_scale"), _DEF_GUIDANCE)
        ),
        "decode_timestep": float(
            _or_default(g("decode_timestep"), _DEF_DECODE_TIMESTEP)
        ),
        "decode_noise_scale": float(
            _or_default(g("decode_noise_scale"), _DEF_DECODE_NOISE_SCALE)
        ),
        "image_cond_noise_scale": float(
            _or_default(
                g("image_cond_noise_scale"), _DEF_IMAGE_COND_NOISE_SCALE
            )
        ),
        "condition_strength": float(
            _or_default(g("condition_strength"), _DEF_CONDITION_STRENGTH)
        ),
        "condition_tail_frames": int(
            _or_default(
                g("condition_tail_frames"), _DEF_CONDITION_TAIL_FRAMES
            )
        ),
    }


def _generate_segment(
    pipe: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    step_heartbeat: Callable[[int], None] | None = None,
) -> Any:
    """Call the LTX-Video 0.9.7 pipeline; return a list of PIL frames.

    Uses the correct `LTXConditionPipeline` contract: scene continuation
    via `conditions=[LTXVideoCondition(image, frame_index=0)]` (NOT bare
    `image=`, which the condition pipeline ignores), and the LTX decode
    controls (`decode_timestep`/`decode_noise_scale`) without which the
    VAE decode yields noise (RCA 2026-05-18). Still signature-filtered
    so the ImageToVideo/text-only fallback classes stay usable.
    """
    import inspect

    torch = _LAZY_TORCH
    generator = (
        torch.Generator(device="cuda").manual_seed(seed)
        if torch is not None
        else None
    )
    call_kwargs: dict[str, Any] = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width,
        "height": height,
        "num_frames": num_frames,
        "frame_rate": 24,
        "generator": generator,
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": samp["num_inference_steps"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "image_cond_noise_scale": samp["image_cond_noise_scale"],
    }
    sig_params = inspect.signature(pipe.__call__).parameters

    # `image` is either a single PIL frame (image-to-video / first
    # conditioned scene) OR a list of PIL frames = the previous
    # scene's VIDEO TAIL. A single finished still at frame_index=0
    # over-anchors → static continuation (2026-05-18 motion RCA);
    # conditioning on the motion-bearing tail gives the model a
    # velocity to continue, which is how LTX video-continuation is
    # designed. `video=` wins when a tail is supplied.
    is_tail = isinstance(image, (list, tuple)) and len(image) > 0
    if image is not None:
        if "conditions" in sig_params:
            try:
                from diffusers.pipelines.ltx.pipeline_ltx_condition import (  # type: ignore
                    LTXVideoCondition,
                )

                cond_kw = (
                    {"video": list(image)}
                    if is_tail
                    else {"image": image}
                )
                call_kwargs["conditions"] = [
                    LTXVideoCondition(
                        frame_index=0,
                        strength=samp.get("condition_strength", 0.7),
                        **cond_kw,
                    )
                ]
            except Exception:  # noqa: BLE001 — fall back to image=
                single = image[-1] if is_tail else image
                if "image" in sig_params:
                    call_kwargs["image"] = single
        else:
            single = image[-1] if is_tail else image
            if "image" in sig_params:
                call_kwargs["image"] = single
            elif "cond_image" in sig_params:
                call_kwargs["cond_image"] = single

    if step_heartbeat is not None and "callback_on_step_end" in sig_params:
        def _on_step_end(
            _p: Any, step_idx: int, _t: Any, cb: dict[str, Any]
        ) -> dict[str, Any]:
            try:
                step_heartbeat(step_idx)
            except Exception:  # noqa: BLE001 — never abort a render
                pass
            return cb

        call_kwargs["callback_on_step_end"] = _on_step_end

    call_kwargs = {k: v for k, v in call_kwargs.items() if k in sig_params}
    result = pipe(**call_kwargs)
    frames = getattr(result, "frames", None)
    if frames is None and isinstance(result, dict):
        frames = result.get("frames")
    if frames is None:
        raise RuntimeError(
            "LTX-Video 0.9.7 pipeline returned no frames — unknown "
            "result shape"
        )
    return (
        frames[0]
        if isinstance(frames, list) and len(frames) == 1
        else frames
    )


def _coerce_flag(value: Any) -> bool:
    if value is None or isinstance(value, bool):
        return bool(value)
    return str(value).strip().lower() in ("1", "true", "yes", "on")


def _resize_frames(frames: Any, width: int, height: int) -> list[Any]:
    try:
        from PIL import Image  # type: ignore
    except ImportError:
        return list(frames)
    out: list[Any] = []
    for f in frames:
        out.append(
            f if f.size == (width, height)
            else f.resize((width, height), Image.LANCZOS)
        )
    return out


def _resolve_upscaler_ref() -> tuple[str, bool]:
    """(ref, is_single_file). env → on-disk single-file → diffusers
    tree → bare HF id (mirrors the proven smoke + the GGUF/base
    resolution convention)."""
    env = os.environ.get("NEXUS_VIDEO_LTX23_UPSCALER", "").strip()
    if env:
        return env, env.endswith(".safetensors")
    host = os.environ.get("NEXUS_HOST_DATA_DIR", "")
    single = Path(host).joinpath(*_UPSCALER_SINGLE_REL.split("/"))
    if single.is_file():
        return str(single), True
    tree = Path(host).joinpath("models", *_UPSCALER_REPO.split("/"))
    if tree.is_dir():
        return str(tree), False
    return _UPSCALER_REPO, False


def _build_upsampler(pipe: Any, logger: Any) -> Any:
    """Load the spatial latent upsampler sharing the base pipeline's
    VAE instance (same latent normalisation — a fresh VAE washes the
    colour out). Raises RuntimeError naming the unmet expectation so
    the caller can fall back to the single-pass native render."""
    torch = _LAZY_TORCH
    try:
        from diffusers import LTXLatentUpsamplePipeline  # type: ignore
    except ImportError as e:
        raise RuntimeError(
            f"diffusers has no LTXLatentUpsamplePipeline ({e}); the "
            "pinned build cannot do the 0.9.7 two-pass upscale."
        ) from e
    ref, is_single = _resolve_upscaler_ref()
    errs: list[str] = []
    up = None
    if is_single and hasattr(LTXLatentUpsamplePipeline, "from_single_file"):
        try:
            up = LTXLatentUpsamplePipeline.from_single_file(
                ref, vae=pipe.vae, torch_dtype=torch.bfloat16
            )
        except Exception as e:  # noqa: BLE001
            errs.append(f"from_single_file({ref}): {e}")
    if up is None:
        pre = ref if not is_single else _UPSCALER_REPO
        try:
            up = LTXLatentUpsamplePipeline.from_pretrained(
                pre, vae=pipe.vae, torch_dtype=torch.bfloat16
            )
        except Exception as e:  # noqa: BLE001
            errs.append(f"from_pretrained({pre}): {e}")
    if up is None:
        raise RuntimeError(
            "spatial upscaler load failed (" + " | ".join(errs) + ")"
        )
    up.to("cuda")
    logger.info("ltxv097.upsampler_loaded", ref=ref, single_file=is_single)
    return up


def _ensure_upsampler(pipe: Any, cache: dict[str, Any], logger: Any) -> Any:
    if cache.get("upsampler") is None:
        cache["upsampler"] = _build_upsampler(pipe, logger)
    return cache["upsampler"]


def _ltx_conditioning(image: Any, samp: dict[str, Any], sig_params: Any) -> dict[str, Any]:
    """Build the LTXVideoCondition kwargs (the RCA'd continuation
    contract). Duplicated from `_generate_segment` by deliberate
    isolation — the proven single-pass stays byte-identical; the
    two-pass owns its own copy so a future change to one cannot
    silently regress the other."""
    if image is None:
        return {}
    is_tail = isinstance(image, (list, tuple)) and len(image) > 0
    if "conditions" in sig_params:
        try:
            from diffusers.pipelines.ltx.pipeline_ltx_condition import (  # type: ignore
                LTXVideoCondition,
            )

            cond_kw = {"video": list(image)} if is_tail else {"image": image}
            return {
                "conditions": [
                    LTXVideoCondition(
                        frame_index=0,
                        strength=samp.get("condition_strength", 0.7),
                        **cond_kw,
                    )
                ]
            }
        except Exception:  # noqa: BLE001 — fall back to image=
            pass
    single = image[-1] if (isinstance(image, (list, tuple)) and image) else image
    if "image" in sig_params:
        return {"image": single}
    if "cond_image" in sig_params:
        return {"cond_image": single}
    return {}


def _generate_segment_2pass(
    pipe: Any,
    upsampler: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    step_heartbeat: Callable[[int], None] | None,
    target_size: tuple[int, int],
) -> Any:
    """Official 0.9.7 two-pass: conditioned latent render → spatial
    latent upsample → short refine + tiled decode → resize to target.
    Raises RuntimeError on an unsupported pinned-diffusers signature so
    the caller falls back to the proven single pass (GPU-verified
    recipe; peak 13.5 GiB on a 16 GB card)."""
    import inspect

    torch = _LAZY_TORCH
    sig = inspect.signature(pipe.__call__).parameters
    for need in ("output_type", "latents", "denoise_strength"):
        if need not in sig:
            raise RuntimeError(
                f"two-pass upscale needs '{need}' on the pinned "
                "LTXConditionPipeline (absent) — single-pass fallback"
            )
    gen = (
        torch.Generator(device="cuda").manual_seed(seed)
        if torch is not None
        else None
    )

    k1: dict[str, Any] = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width,
        "height": height,
        "num_frames": num_frames,
        "frame_rate": 24,
        "generator": gen,
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": samp["num_inference_steps"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "image_cond_noise_scale": samp["image_cond_noise_scale"],
        "output_type": "latent",
    }
    k1.update(_ltx_conditioning(image, samp, sig))
    if step_heartbeat is not None and "callback_on_step_end" in sig:
        def _hb(_p: Any, i: int, _t: Any, cb: dict[str, Any]) -> dict[str, Any]:
            try:
                step_heartbeat(i)
            except Exception:  # noqa: BLE001 — never abort a render
                pass
            return cb

        k1["callback_on_step_end"] = _hb
    k1 = {k: v for k, v in k1.items() if k in sig}
    r1 = pipe(**k1)
    latents = getattr(r1, "frames", None)
    if latents is None and isinstance(r1, dict):
        latents = r1.get("frames")
    if latents is None:
        raise RuntimeError("two-pass stage1 returned no latent")

    up_out = upsampler(latents=latents, output_type="latent")
    upscaled = getattr(up_out, "frames", up_out)

    k3 = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width * 2,
        "height": height * 2,
        "num_frames": num_frames,
        "frame_rate": 24,
        "generator": (
            torch.Generator(device="cuda").manual_seed(seed)
            if torch is not None
            else None
        ),
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": max(6, samp["num_inference_steps"] // 3),
        "denoise_strength": 0.4,
        "latents": upscaled,
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "output_type": "pil",
    }
    k3 = {k: v for k, v in k3.items() if k in sig}
    r3 = pipe(**k3)
    frames = getattr(r3, "frames", None)
    if frames is None and isinstance(r3, dict):
        frames = r3.get("frames")
    if frames is None:
        raise RuntimeError("two-pass stage3 returned no frames")
    fl = (
        frames[0]
        if isinstance(frames, list) and len(frames) == 1
        else frames
    )
    return _resize_frames(fl, target_size[0], target_size[1])


def _generate_segment_dispatch(
    pipe: Any,
    cache: dict[str, Any],
    upscale: bool,
    target_size: tuple[int, int] | None,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    step_heartbeat: Callable[[int], None] | None,
    logger: Any,
) -> Any:
    """Single-pass by default; the two-pass 720p upscale when opted in,
    with an automatic fall-through to the proven single pass if the
    upscaler is unavailable or the pinned API can't do it (the native
    render must never be blocked by an optional quality upgrade)."""
    if upscale and target_size is not None:
        try:
            upsampler = _ensure_upsampler(pipe, cache, logger)
            return _generate_segment_2pass(
                pipe, upsampler, image, prompt, negative_prompt,
                width, height, num_frames, seed, samp,
                step_heartbeat, target_size,
            )
        except RuntimeError as e:
            logger.info("ltxv097.upscale_fallback", reason=str(e))
        except Exception as e:  # noqa: BLE001 — optional path never fatal
            logger.info("ltxv097.upscale_fallback", reason=str(e))
    return _generate_segment(
        pipe, image, prompt, negative_prompt, width, height,
        num_frames, seed, samp, step_heartbeat,
    )


def _compose_prompt(*, character: str, action: str, style: str) -> str:
    parts = [p.strip() for p in (character, action, style) if p and p.strip()]
    return ". ".join(parts)


def _load_input_image(path: str | None, width: int, height: int) -> Any:
    try:
        from PIL import Image  # type: ignore
    except ImportError:
        return None
    if path and Path(path).exists():
        img = Image.open(path).convert("RGB")
    else:
        img = Image.new("RGB", (width, height), (32, 32, 32))
    if img.size != (width, height):
        img = img.resize((width, height), Image.LANCZOS)
    return img


def _write_frames_as_mp4(frames: Any, path: Path, base_fps: int) -> None:
    import tempfile

    import ffmpeg  # type: ignore

    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ltxv097-seg-") as tmp:
        tmp_dir = Path(tmp)
        for i, frame in enumerate(frames):
            frame.save(tmp_dir / f"frame_{i:05d}.png")
        (
            ffmpeg.input(
                str(tmp_dir / "frame_%05d.png"), framerate=base_fps
            )
            .output(
                str(path),
                vcodec="libx264",
                pix_fmt="yuv420p",
                movflags="+faststart",
                loglevel="error",
            )
            .overwrite_output()
            .run()
        )


def _save_last_frame(frames: Any, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    last = frames[-1] if hasattr(frames, "__len__") else frames
    last.save(path)


def _or_default(value: Any, default: Any) -> Any:
    """Collapse both missing-key and explicit-JSON-null to the default
    (the host emits unset advanced knobs as ``null``)."""
    return default if value is None else value


async def _emit_error(worker, run_id: str, code: int, message: str) -> None:
    msg = message if len(message) <= 2000 else message[:2000] + "…"
    await worker.emit_notification(
        Notifications.ERROR,
        {"run_id": run_id, "code": code, "message": msg},
    )
