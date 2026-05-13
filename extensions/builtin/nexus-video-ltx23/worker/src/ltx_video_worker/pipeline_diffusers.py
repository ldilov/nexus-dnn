"""Real diffusers-based LTX-2.3 image-to-video pipeline.

Used for runtime profiles rtx40-fp8, rtx50-fp8, rtx50-nvfp4. Mirrors
the JSON-RPC contract of pipeline_fake.py so the Rust runner is profile-
agnostic.

Status: SHIPPED-UNVERIFIED (Rung 5).
  - The full segment loop, VRAM cleanup, and JSON-RPC notifications are
    implemented to spec.
  - End-to-end validation against real LTX-2.3 weights requires a 16 GB
    NVIDIA GPU and the P0-T001 verification spike. Until that lands,
    every code path here is best-effort against the diffusers API as
    documented at 2026-05-13. See specs/046-ltx23-video-generation/
    research.md for the dispositive open questions.
  - All torch / diffusers imports are LAZY so this module can be
    imported on a non-GPU host (e.g. CI) without dragging in 2 GB of
    CUDA wheels.

Profile → quant resolution:
  fake          → not handled here (pipeline_fake.py)
  rtx40-fp8     → FP8 e4m3 weights from Lightricks/LTX-2.3-fp8
  rtx50-fp8     → same FP8 weights, cu128, Blackwell SM_120 tensor cores
  rtx50-nvfp4   → NVFP4 weights from Lightricks/LTX-2.3-nvfp4, cu130

Model directory resolution order:
  1. NEXUS_VIDEO_LTX23_MODEL_DIR env var (set by Rust runner from the
     manifest's resolved model_artifact path once Rung 6 wires
     profile-specific model installs).
  2. <NEXUS_HOST_DATA_DIR>/models/Lightricks/LTX-2.3-<quant>/
  3. error: model_missing — UI shows "Download weights" CTA.
"""

from __future__ import annotations

import asyncio
import gc
import os
import time
import uuid
from pathlib import Path
from typing import Any

from . import __version__
from .ffmpeg_io import stitch_segments, trim_to_duration
from .planning_validate import validate_plan
from .rpc import ErrorCodes, Methods, Notifications
from .vram import evict_models, memory_stats


_LAZY_TORCH: Any = None
_LAZY_PIPELINE_CLASS: Any = None


class DiffusersRunState:
    def __init__(
        self,
        run_id: str,
        workdir: Path,
        plan: dict[str, Any],
        pipe: Any,
        device: str,
    ) -> None:
        self.run_id = run_id
        self.workdir = workdir
        self.plan = plan
        self.pipe = pipe
        self.device = device
        self.cancelled = False
        self.generation_count = 0


def register_diffusers_handlers(worker) -> None:
    """Register all JSON-RPC methods backed by the real LTX-2.3 pipeline."""

    state: dict[str, DiffusersRunState] = {}
    cached_pipe_ref: dict[str, Any] = {"pipe": None, "device": None}

    profile = os.environ.get("NEXUS_VIDEO_LTX23_RUNTIME", "rtx40-fp8")

    async def models_list(_params: Any) -> dict[str, Any]:
        model_dir = _resolve_model_dir(profile)
        return {
            "models": [
                {
                    "id": _expected_family_id(profile),
                    "available": model_dir is not None and model_dir.exists(),
                    "path": str(model_dir) if model_dir else None,
                    "profile": profile,
                }
            ]
        }

    async def plan_validate(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        return validate_plan(params.get("plan", params), profile=profile)

    async def render_start(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")

        plan = params.get("video") or params.get("plan") or {}
        run_id = params.get("request_id") or f"run_{uuid.uuid4().hex[:12]}"
        workdir_str = params.get("workdir")
        workdir = (
            Path(workdir_str) if workdir_str else Path.cwd() / "diffusers_workdir" / run_id
        )
        workdir.mkdir(parents=True, exist_ok=True)

        try:
            pipe, device = _ensure_pipeline_loaded(
                worker, profile, cached_pipe_ref
            )
        except _ModelMissing as err:
            return _emit_terminal_error(
                worker, run_id, ErrorCodes.MODEL_MISSING, str(err)
            )
        except _ModelLoadFailed as err:
            return _emit_terminal_error(
                worker, run_id, ErrorCodes.MODEL_LOAD_FAILED, str(err)
            )

        rs = DiffusersRunState(
            run_id=run_id, workdir=workdir, plan=plan, pipe=pipe, device=device
        )
        state[run_id] = rs

        asyncio.create_task(
            _render_loop(worker, rs, params, cached_pipe_ref, profile)
        )
        return {"run_id": run_id, "status": "started"}

    async def render_cancel(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = params.get("run_id") or params.get("request_id")
        rs = state.get(run_id) if run_id else None
        if rs is None:
            raise ValueError(f"unknown run: {run_id}")
        rs.cancelled = True
        return {"run_id": run_id, "cancel_requested": True}

    worker.register(Methods.MODELS_LIST, models_list)
    worker.register(Methods.PLAN_VALIDATE, plan_validate)
    worker.register(Methods.RENDER_START, render_start)
    worker.register(Methods.RENDER_CANCEL, render_cancel)


class _ModelMissing(Exception):
    pass


class _ModelLoadFailed(Exception):
    pass


def _resolve_model_dir(profile: str) -> Path | None:
    """Locate the on-disk model directory for this profile.

    Order:
      1. NEXUS_VIDEO_LTX23_MODEL_DIR (explicit override).
      2. <host_data_dir>/models/Lightricks/LTX-2.3-<quant>/.
    Returns the directory only if it actually exists on disk.
    """
    explicit = os.environ.get("NEXUS_VIDEO_LTX23_MODEL_DIR")
    if explicit:
        p = Path(explicit)
        return p if p.exists() else None

    host_data_dir = os.environ.get("NEXUS_HOST_DATA_DIR")
    if not host_data_dir:
        return None

    family = _expected_family_id(profile)
    if family is None:
        return None
    quant_repo = family.split("/")[-1]
    candidate = Path(host_data_dir) / "models" / "Lightricks" / quant_repo
    return candidate if candidate.exists() else None


def _expected_family_id(profile: str) -> str | None:
    """Map profile → Hugging Face repo. Single source of truth for quant routing."""
    if profile in ("rtx40-fp8", "rtx50-fp8"):
        return "Lightricks/LTX-2.3-fp8"
    if profile == "rtx50-nvfp4":
        return "Lightricks/LTX-2.3-nvfp4"
    return None


def _ensure_pipeline_loaded(
    worker, profile: str, cache: dict[str, Any]
) -> tuple[Any, str]:
    """Idempotent pipeline loader. Returns (pipe, device).

    First call boots torch + diffusers + the LTX pipeline + the model
    weights. Subsequent calls return the cached pipe.
    """
    if cache["pipe"] is not None:
        return cache["pipe"], cache["device"]

    model_dir = _resolve_model_dir(profile)
    if model_dir is None:
        raise _ModelMissing(
            f"LTX-2.3 weights for profile '{profile}' not found. Expected family "
            f"{_expected_family_id(profile)!r}. Run the per-profile model install "
            "in the recipe UI."
        )

    try:
        import torch  # type: ignore

        global _LAZY_TORCH
        _LAZY_TORCH = torch

        if not torch.cuda.is_available():
            raise _ModelLoadFailed(
                "CUDA-capable GPU not detected. Real LTX-2.3 profiles require an "
                "NVIDIA GPU; fake profile is available for CPU-only dev."
            )

        device = "cuda"
        dtype = _pick_dtype(profile, torch)

        # diffusers 0.37+ ships separate classes for LTX v1 (`LTXImageToVideoPipeline`)
        # and LTX 2.x (`LTX2ImageToVideoPipeline`). The Lightricks/LTX-2.3-{fp8,nvfp4}
        # weights set model_index.json's `_class_name` to the LTX2 class; fall back
        # to the v1 class only if the v2 symbol isn't exported (older diffusers).
        try:
            from diffusers import LTX2ImageToVideoPipeline as _PipeClass  # type: ignore
        except ImportError:
            try:
                from diffusers import LTXImageToVideoPipeline as _PipeClass  # type: ignore
            except ImportError as ie:
                raise _ModelLoadFailed(
                    f"diffusers LTX(2)ImageToVideoPipeline not importable: {ie}. "
                    "Run the dependency installer with the diffusers extras."
                ) from ie

        global _LAZY_PIPELINE_CLASS
        _LAZY_PIPELINE_CLASS = _PipeClass

        worker.logger.info(
            "diffusers.load_pipeline",
            profile=profile,
            model_dir=str(model_dir),
            dtype=str(dtype),
            pipeline_class=_PipeClass.__name__,
        )
        load_start = time.perf_counter()
        pipe = _PipeClass.from_pretrained(
            str(model_dir),
            torch_dtype=dtype,
            local_files_only=True,
        )
        pipe.to(device)
        if hasattr(pipe, "enable_model_cpu_offload"):
            pipe.enable_model_cpu_offload()
        if hasattr(pipe.vae, "enable_tiling"):
            pipe.vae.enable_tiling()
        worker.logger.info(
            "diffusers.load_pipeline.ok",
            elapsed_s=round(time.perf_counter() - load_start, 2),
        )

        cache["pipe"] = pipe
        cache["device"] = device
        return pipe, device

    except _ModelMissing:
        raise
    except _ModelLoadFailed:
        raise
    except Exception as e:
        raise _ModelLoadFailed(f"pipeline load failed: {e}") from e


def _pick_dtype(profile: str, torch: Any) -> Any:
    """Select the torch dtype for the profile's quant scheme.

    NVFP4 + FP8 quant tensors live inside the safetensors files themselves;
    the pipeline_dtype is the activation dtype. Use bfloat16 across the board
    for activations — better numerical stability than fp16 for video work.
    """
    return getattr(torch, "bfloat16", torch.float16)


async def _render_loop(
    worker,
    rs: DiffusersRunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
    profile: str,
) -> None:
    """Walk segments. Emit JSON-RPC notifications matching pipeline_fake.

    Restart-on-threshold lives one layer up (Rust supervisor watches the
    memory_stats notifications and kills+respawns the worker if frag/OOM
    thresholds breach).
    """
    plan = rs.plan
    width = int(plan.get("width", 960))
    height = int(plan.get("height", 544))
    base_fps = int(plan.get("base_fps", 24))
    duration = float(
        plan.get("requested_duration_seconds", plan.get("duration_seconds", 10))
    )
    segments = plan.get("segments") or []
    if not segments:
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.PLAN_INVALID,
            "render plan contains no segments",
        )
        return

    prompt_obj = raw_params.get("prompt") or {}
    action_prompt = prompt_obj.get("action") or prompt_obj.get("prompt") or ""
    negative_prompt = prompt_obj.get("negative") or ""

    input_image_path: str | None = None
    input_image_block = raw_params.get("input_image") or {}
    if isinstance(input_image_block, dict):
        input_image_path = input_image_block.get("path")

    initial_image = _load_input_image(input_image_path, width, height)
    last_frame_image = initial_image

    segment_paths: list[Path] = []
    segment_count = len(segments)

    for seg in segments:
        if rs.cancelled:
            await _emit_error(
                worker,
                rs.run_id,
                ErrorCodes.RENDER_CANCELLED,
                "render cancelled by user",
            )
            return

        seg_index = int(seg.get("index", 0))
        seg_frame_count = int(seg.get("frame_count", 97))
        seg_seed = int(seg.get("seed", 0))

        await worker.emit_notification(
            Notifications.SEGMENT_STARTED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "segment_count": segment_count,
            },
        )

        seg_dir = rs.workdir / "segments" / f"{seg_index:03d}"
        seg_dir.mkdir(parents=True, exist_ok=True)
        seg_path = seg_dir / "raw.mp4"
        last_frame_path = seg_dir / "last_frame.png"

        try:
            frames = await asyncio.to_thread(
                _generate_segment,
                rs.pipe,
                last_frame_image,
                action_prompt,
                negative_prompt,
                width,
                height,
                seg_frame_count,
                seg_seed,
            )
        except RuntimeError as e:
            # CUDA OOM / VRAM budget exceeded surfaces here.
            msg = str(e)
            code = (
                ErrorCodes.VRAM_BUDGET_EXCEEDED
                if "out of memory" in msg.lower()
                else ErrorCodes.RENDER_FAILED
            )
            await _emit_error(worker, rs.run_id, code, msg)
            return
        except Exception as e:
            await _emit_error(
                worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e)
            )
            return

        _write_frames_as_mp4(frames, seg_path, base_fps=base_fps)
        _save_last_frame(frames, last_frame_path)
        last_frame_image = _load_input_image(
            str(last_frame_path), width, height
        )
        segment_paths.append(seg_path)

        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "kind": "raw_video",
                "path": str(seg_path),
                "mime": "video/mp4",
            },
        )
        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "kind": "last_frame",
                "path": str(last_frame_path),
                "mime": "image/png",
            },
        )

        rs.generation_count += 1
        stats = memory_stats(rs.generation_count)
        await worker.emit_notification(
            Notifications.MEMORY_STATS,
            {"run_id": rs.run_id, "segment_index": seg_index, **stats},
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

        # Inter-segment cleanup: drop autograd graphs + intermediate tensors,
        # gc, empty_cache. Pipe + weights STAY in VRAM (supervisor decides
        # whether to restart based on memory_stats).
        del frames
        gc.collect()
        if _LAZY_TORCH is not None and _LAZY_TORCH.cuda.is_available():
            try:
                _LAZY_TORCH.cuda.empty_cache()
            except Exception:
                pass

    # Stitch + (optional RIFE 2×) + trim. RIFE doubles base_fps so the
    # output FPS matches plan.output_fps (typically 48). When RIFE is not
    # installed the worker falls back to base_fps output — duration is
    # still exact because trim_to_duration is the final step.
    final_dir = rs.workdir / "final"
    final_dir.mkdir(parents=True, exist_ok=True)
    stitched_path = final_dir / "stitched.mp4"
    interpolated_path = final_dir / "interpolated.mp4"
    final_path = final_dir / "final.mp4"
    stitch_segments(segment_paths, stitched_path)

    output_fps = int(plan.get("output_fps", base_fps))
    pre_trim = stitched_path
    if output_fps > base_fps and _try_interpolate_rife(
        stitched_path, interpolated_path, base_fps, output_fps
    ):
        pre_trim = interpolated_path
        await worker.emit_notification(
            Notifications.PROGRESS,
            {
                "run_id": rs.run_id,
                "overall_percent": 100,
                "message": f"RIFE interpolation: {base_fps} → {output_fps} fps",
            },
        )

    trim_to_duration(pre_trim, final_path, duration_s=duration)

    # AC13 — terminal eviction. Pipe + weights leave VRAM here. The Rust
    # supervisor releases the lease right after `done` arrives, which kills
    # the subprocess and frees the CUDA context too — belt + suspenders.
    cache["pipe"] = None
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
            "profile": profile,
        },
    )


def _generate_segment(
    pipe: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
) -> Any:
    """Call into the LTX pipeline. Returns a list of PIL.Image frames."""
    torch = _LAZY_TORCH
    generator = (
        torch.Generator(device="cuda").manual_seed(seed)
        if torch is not None
        else None
    )
    result = pipe(
        image=image,
        prompt=prompt,
        negative_prompt=negative_prompt,
        width=width,
        height=height,
        num_frames=num_frames,
        generator=generator,
    )
    # diffusers returns a dataclass-ish object with `.frames`.
    frames = getattr(result, "frames", None)
    if frames is None and isinstance(result, dict):
        frames = result.get("frames")
    if frames is None:
        raise RuntimeError(
            "LTX pipeline returned no frames — unknown result shape"
        )
    # `frames` is a list of PIL images for single-batch.
    return frames[0] if isinstance(frames, list) and len(frames) == 1 else frames


def _load_input_image(path: str | None, width: int, height: int) -> Any:
    """Open the input image as PIL and resize to (width, height).

    None / missing path → a single solid grey image. The pipeline still
    image-conditions on whatever it gets; for the first segment of a
    no-input-image render this is benign.
    """
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
    """Encode a list of PIL frames as H.264 MP4 via ffmpeg.

    Uses ffmpeg-python (already pinned in the worker's pyproject), driven
    through a temp PNG directory rather than piped raw RGB — survives the
    cross-platform pipe-buffer quirks that bite the streaming-stdin path on
    Windows.
    """
    import tempfile

    import ffmpeg  # type: ignore

    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ltx23-seg-") as tmp:
        tmp_dir = Path(tmp)
        for i, frame in enumerate(frames):
            frame.save(tmp_dir / f"frame_{i:05d}.png")
        (
            ffmpeg.input(
                str(tmp_dir / "frame_%05d.png"),
                framerate=base_fps,
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


async def _emit_error(worker, run_id: str, code: int, message: str) -> None:
    await worker.emit_notification(
        Notifications.ERROR,
        {"run_id": run_id, "code": code, "message": message},
    )


def _emit_terminal_error(
    worker, run_id: str, code: int, message: str
) -> dict[str, Any]:
    """Called from inside render_start when the pipeline can't even load.

    Emits an error notification (so the supervisor sees it) AND returns
    a started-but-doomed RPC response so the JSON-RPC layer doesn't hang.
    """
    asyncio.create_task(_emit_error(worker, run_id, code, message))
    return {"run_id": run_id, "status": "failed", "error": message}


def _try_interpolate_rife(
    src: Path, dst: Path, base_fps: int, target_fps: int
) -> bool:
    """Best-effort RIFE 2× interpolation. Returns True on success.

    Implementation is intentionally fallback-friendly:
      1. Try `rife-ncnn-vulkan-python` (Practical-RIFE wheel from
         `interpolation` optional extras) if installed.
      2. Fall back to ffmpeg's `minterpolate` motion-compensated filter
         which ships with ffmpeg ≥ 4 — way slower than RIFE but better
         than no interpolation when the optional extras aren't installed.
      3. Return False so caller uses the stitched file directly.
    """
    # 1. Preferred: rife-ncnn-vulkan-python (no torch, fast).
    try:
        import rife_ncnn_vulkan_python as rife  # type: ignore  # noqa: F401

        # The actual API of rife-ncnn-vulkan-python operates on PIL frames,
        # not files — wiring frame-by-frame integration is Rung 6b. For now
        # we surface that it's present but defer to ffmpeg until the loop
        # is wired.
        return _interpolate_via_ffmpeg(src, dst, target_fps)
    except ImportError:
        pass

    # 2. Fallback: ffmpeg minterpolate. Works without optional extras.
    return _interpolate_via_ffmpeg(src, dst, target_fps)


def _interpolate_via_ffmpeg(src: Path, dst: Path, target_fps: int) -> bool:
    """Run ffmpeg's minterpolate filter. Returns True on success.

    This is the safe fallback when no GPU-accelerated interpolator is
    available. It's CPU-bound and ~10-50× slower than RIFE but produces
    a valid output file.
    """
    try:
        import ffmpeg  # type: ignore

        dst.parent.mkdir(parents=True, exist_ok=True)
        (
            ffmpeg.input(str(src))
            .filter(
                "minterpolate",
                fps=str(target_fps),
                mi_mode="mci",
                mc_mode="aobmc",
                me_mode="bidir",
                vsbmc="1",
            )
            .output(
                str(dst),
                vcodec="libx264",
                pix_fmt="yuv420p",
                movflags="+faststart",
                loglevel="error",
            )
            .overwrite_output()
            .run()
        )
        return dst.is_file()
    except Exception:
        # Any ffmpeg failure → fall back to source file.
        return False
