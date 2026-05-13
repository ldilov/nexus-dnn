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
from typing import Any, Callable

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

        # Pipeline load can take minutes on a cold cache (22B fp8 →
        # CPU-offload pinned memory) and must NOT block the JSON-RPC
        # reply — the host's send_rpc has a fixed timeout, and a
        # blocking load times out before the render even starts.
        # Reply immediately and run load+render in a background task.
        rs = DiffusersRunState(
            run_id=run_id, workdir=workdir, plan=plan, pipe=None, device=None
        )
        state[run_id] = rs

        asyncio.create_task(
            _load_then_render(worker, rs, params, cached_pipe_ref, profile)
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
    # repo_id is owner/name; the snapshot lands at <host_data_dir>/models/<owner>/<name>/
    parts = family.split("/")
    candidate = Path(host_data_dir).joinpath("models", *parts)
    return candidate if candidate.exists() else None


def _resolve_gguf_transformer_override(model_dir: Path) -> Path | None:
    """Resolve a GGUF transformer override for ``model_dir``.

    Resolution order:
      1. ``NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF`` env var — explicit
         absolute or model-relative path to a single ``.gguf`` file.
      2. A single ``*.gguf`` file sitting in ``model_dir`` alongside
         the diffusers tree (e.g. an operator drops the GGUF in there
         after running the standard ``from_pretrained`` install).

    Returns None when no override is configured. The standard
    safetensors pipeline path runs unchanged in that case.
    """
    explicit = os.environ.get("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", "").strip()
    if explicit:
        p = Path(explicit)
        if not p.is_absolute():
            p = model_dir / explicit
        return p if p.is_file() else None

    from .gguf_loader import find_gguf_transformer

    return find_gguf_transformer(model_dir)


def _expected_family_id(profile: str) -> str | None:
    """Map profile → Hugging Face repo. Single source of truth for quant routing.

    Mirrors `installer.py::PROFILE_REPO`. All real-runtime profiles point
    at the community port `dg845/LTX-2.3-Distilled-Diffusers` — the only
    diffusers-format repo with the correct LTX-2.3 transformer config
    (9 conditioning channels). The official Lightricks single-file repos
    won't load via standard `from_pretrained`; see
    `specs/046-ltx23-video-generation/verification/p0-t001-results.md`.
    """
    if profile in ("rtx40-fp8", "rtx50-fp8", "rtx50-nvfp4"):
        return "dg845/LTX-2.3-Distilled-Diffusers"
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

        # Prefer the image-to-video class for scene chaining: scene N+1
        # is image-conditioned on scene N's last frame, which gives
        # visual continuity across long-video segment boundaries.
        # `LTX2ImageToVideoPipeline` shares the same sub-components as
        # the text-to-video `LTX2Pipeline`, so we can force-instantiate
        # it against the dg845 repo even though its `model_index.json`
        # nominally declares LTX2Pipeline (validated 2026-05-13 on the
        # RTX 5070 Ti — same weights load cleanly).
        # Fallback chain handles older diffusers releases.
        try:
            from diffusers import LTX2ImageToVideoPipeline as _PipeClass  # type: ignore
        except ImportError:
            try:
                from diffusers import LTX2Pipeline as _PipeClass  # type: ignore
            except ImportError:
                try:
                    from diffusers import LTXImageToVideoPipeline as _PipeClass  # type: ignore
                except ImportError as ie:
                    raise _ModelLoadFailed(
                        f"no LTX pipeline class importable from diffusers: {ie}. "
                        "Ensure the diffusers extras pin (git@adff1cae9...) is installed."
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

        gguf_override = _resolve_gguf_transformer_override(model_dir)
        if gguf_override is not None:
            from . import gguf_loader

            worker.logger.info(
                "diffusers.load_pipeline.gguf_override",
                gguf_path=str(gguf_override),
                base_config_dir=str(model_dir),
            )
            gguf_transformer = gguf_loader.load_gguf_transformer(
                gguf_override,
                model_dir,
                compute_dtype=dtype,
            )
            pipe.transformer = gguf_transformer

        # Sequential CPU offload over model_cpu_offload:
        # - 4.7 GB peak VRAM vs 37 GB (validated 2026-05-13 on RTX 5070 Ti,
        #   16 GB VRAM, dg845/LTX-2.3-Distilled-Diffusers BF16 weights).
        # - 13.7 s/step vs 75 s/step (the model_offload path spilled to
        #   system RAM via Windows unified memory).
        # The sequential mode swaps individual layers in/out as they're
        # called; never lands the whole transformer on GPU at once. Slower
        # micro-cost per layer transfer is dwarfed by the avoided spill.
        #
        # `pipe.to(device)` is intentionally OMITTED — sequential offload
        # manages device placement itself; calling `.to(...)` first pulls
        # everything onto GPU and defeats the offload.
        if hasattr(pipe, "enable_sequential_cpu_offload"):
            pipe.enable_sequential_cpu_offload()
        elif hasattr(pipe, "enable_model_cpu_offload"):
            # Older diffusers — accept the spill rather than crash.
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


async def _load_then_render(
    worker,
    rs: DiffusersRunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
    profile: str,
) -> None:
    """Pipeline load runs off the JSON-RPC reply path.

    The 22B fp8 pipeline takes 30s–several-minutes to materialise on
    cold cache (read safetensors, allocate GPU buffers, set up CPU
    offload hooks). Doing this inside `render_start` blocks the
    JSON-RPC handler past the host's send_rpc timeout. Run it here
    instead — render_start has already returned `status:started`.
    """
    await worker.emit_notification(
        Notifications.PROGRESS,
        {"run_id": rs.run_id, "phase": "loading_model", "profile": profile},
    )
    try:
        pipe, device = await asyncio.to_thread(
            _ensure_pipeline_loaded, worker, profile, cache
        )
    except _ModelMissing as err:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_MISSING, str(err)
        )
        return
    except _ModelLoadFailed as err:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED, str(err)
        )
        return
    except Exception as err:  # noqa: BLE001 — diffusers can throw anything
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED,
            f"unexpected pipeline load failure: {err.__class__.__name__}: {err}",
        )
        return

    rs.pipe = pipe
    rs.device = device

    await worker.emit_notification(
        Notifications.PROGRESS,
        {"run_id": rs.run_id, "phase": "rendering"},
    )
    await _render_loop(worker, rs, raw_params, cache, profile)


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

    # Hyperparameters — pulled from the top-level request_params (NOT the
    # `plan` dict, since these are user-facing knobs, not planner output).
    # Defaults match the LTX 2.3 distilled pipeline's recommended values
    # (guidance_scale 4.0, 8 inference steps for a distilled model).
    advanced = raw_params.get("advanced") or {}
    guidance_scale = float(advanced.get("guidance_scale", 4.0))
    num_inference_steps = int(advanced.get("num_inference_steps", 8))
    if not segments:
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.PLAN_INVALID,
            "render plan contains no segments",
        )
        return

    prompt_obj = raw_params.get("prompt") or {}
    global_action = prompt_obj.get("action") or prompt_obj.get("prompt") or ""
    negative_prompt = prompt_obj.get("negative") or ""
    style_anchor = (prompt_obj.get("style") or "").strip()
    character_anchor = (prompt_obj.get("character") or "").strip()

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
        # Per-segment override from the planner's `scenes[]` zip; falls
        # back to the global action prompt when this segment isn't
        # claimed by any scene in the script.
        seg_action_prompt = (seg.get("action_prompt") or global_action).strip()
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

        # Heartbeat callback fires at the end of each diffusers
        # inference step. The pipe runs inside `asyncio.to_thread`, so
        # we capture the running loop here and schedule notifications
        # via `run_coroutine_threadsafe` from the worker thread.
        loop = asyncio.get_running_loop()

        def emit_step(step_idx: int) -> None:
            coro = worker.emit_notification(
                Notifications.SEGMENT_STEP,
                {
                    "run_id": rs.run_id,
                    "segment_index": seg_index,
                    "segment_count": segment_count,
                    "step": step_idx + 1,
                    "total_steps": num_inference_steps,
                },
            )
            asyncio.run_coroutine_threadsafe(coro, loop)

        try:
            frames = await asyncio.to_thread(
                _generate_segment,
                rs.pipe,
                last_frame_image,
                effective_prompt,
                negative_prompt,
                width,
                height,
                seg_frame_count,
                seg_seed,
                guidance_scale,
                num_inference_steps,
                emit_step,
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


def _compose_prompt(*, character: str, action: str, style: str) -> str:
    """Build the LTX-2.3 prompt string from the three anchors.

    Convention for video diffusion: subject first (anchors who/what is
    on screen so the model commits to that identity), action middle
    (what they do this scene), style last (how it looks). Empty parts
    drop silently — single global prompt still works.

    Threading the same character + style on every scene is the cheapest
    way to keep visual continuity across cuts; combined with image
    conditioning from the previous segment's last frame, it's the
    practical answer to "preserve characters and art style across the
    chain". The seed strategy (planner derives correlated per-scene
    seeds from a master seed) handles RNG-driven lighting continuity.
    """
    parts = [p.strip() for p in (character, action, style) if p and p.strip()]
    return ". ".join(parts)


def _generate_segment(
    pipe: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    guidance_scale: float,
    num_inference_steps: int,
    step_heartbeat: Callable[[int], None] | None = None,
) -> Any:
    """Call into the LTX pipeline. Returns a list of PIL.Image frames.

    The pipeline class varies between releases — `LTX2ImageToVideoPipeline`
    is preferred (accepts `image=` for scene chaining), but we fall back
    to `LTX2Pipeline` (text-to-video) and `LTXI2VLongMultiPromptPipeline`
    (`cond_image=`) by probing the active class's signature. The text-only
    fallback silently drops the input image — fine for a fresh run with
    no seed image, but breaks the multi-segment chain.
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
        "generator": generator,
        "guidance_scale": guidance_scale,
        "num_inference_steps": num_inference_steps,
    }

    sig_params = inspect.signature(pipe.__call__).parameters
    if image is not None:
        if "image" in sig_params:
            call_kwargs["image"] = image
        elif "cond_image" in sig_params:
            call_kwargs["cond_image"] = image
        # else: text-to-video pipeline; silently drop the input image.

    # Per-inference-step heartbeat. diffusers calls
    # `callback_on_step_end(pipeline, step_index, timestep, callback_kwargs)`
    # at the end of each denoising step and expects the dict back. We
    # use this purely as a progress beacon — no kwargs are mutated.
    if step_heartbeat is not None and "callback_on_step_end" in sig_params:
        def _on_step_end(_pipe: Any, step_idx: int, _t: Any, cb_kwargs: dict[str, Any]) -> dict[str, Any]:
            try:
                step_heartbeat(step_idx)
            except Exception:  # noqa: BLE001 — heartbeats must NEVER abort a render
                pass
            return cb_kwargs

        call_kwargs["callback_on_step_end"] = _on_step_end

    # Drop kwargs the active pipeline doesn't accept (older / different
    # variants may not expose guidance_scale or num_inference_steps).
    call_kwargs = {k: v for k, v in call_kwargs.items() if k in sig_params}

    result = pipe(**call_kwargs)
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
