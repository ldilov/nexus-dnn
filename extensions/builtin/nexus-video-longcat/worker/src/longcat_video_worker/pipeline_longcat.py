"""LongCat-Video pipeline adapter.

Wraps the upstream four-method API (generate_t2v, generate_i2v, generate_vc,
generate_refine) behind a uniform render(request) call. One _PipelineState per
worker process is lazily constructed on the first render and re-used for all
subsequent calls; the state is module-level to survive across async handler
invocations.

Component loading order on first render:
  1. _load_text_encoder  → tokenizer + UMT5EncoderModel
  2. _load_vae           → AutoencoderKLWan
  3. _load_scheduler     → FlowMatchEulerDiscreteScheduler
  4. _load_dit           → FP8-loaded LongCatVideoTransformer3DModel
  5. _build_pipeline     → LongCatVideoPipeline

Distill LoRA is applied additively at first render when use_distill=True and
the LoRA safetensors file is discoverable under the Kijai model dir. It is
NEVER merged into the FP8 weights.
"""

from __future__ import annotations

import logging
import os
import sys
import tempfile
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Literal, Optional

logger = logging.getLogger(__name__)


RenderMode = Literal["t2v", "i2v", "vc", "refine"]

_DISTILL_LORA_FILENAME = "LongCat_distill_lora_alpha64_bf16.safetensors"
_KJ_FP8_FILENAME = "LongCat_TI2V_comfy_fp8_e4m3fn_scaled_KJ.safetensors"
_KIJAI_REPO_SUBDIR = "Kijai/LongCat-Video_comfy"
_MEITUAN_REPO_SUBDIR = "meituan-longcat/LongCat-Video"


@dataclass
class LongCatRenderRequest:
    mode: RenderMode
    prompt: str
    negative_prompt: Optional[str] = None
    image_path: Optional[str] = None
    conditioning_video_path: Optional[str] = None
    low_res_video_path: Optional[str] = None
    height: int = 480
    width: int = 832
    num_frames: int = 93
    num_inference_steps: int = 50
    guidance_scale: float = 4.0
    use_distill: bool = False
    seed: Optional[int] = None
    max_sequence_length: int = 512
    offload_kv_cache: bool = False


@dataclass
class _PipelineState:
    pipeline: Any
    device: Any
    compute_dtype: Any
    vendor_dir: Path
    model_dir: Path
    tokenizer: Any
    text_encoder: Any
    vae: Any
    scheduler: Any
    dit: Any
    lora_network: Any = field(default=None)


_STATE: Optional[_PipelineState] = None


def _resolve_paths(host_data_dir: Optional[str] = None) -> tuple[Path, Path]:
    root_str = host_data_dir or os.environ.get("NEXUS_HOST_DATA_DIR")
    if not root_str:
        raise RuntimeError(
            "Cannot resolve model/vendor paths: NEXUS_HOST_DATA_DIR is unset "
            "and host_data_dir was not supplied."
        )
    root = Path(root_str)
    model_dir = root / "models" / _MEITUAN_REPO_SUBDIR
    vendor_dir = root / "extensions" / "nexus.video.longcat" / "vendor" / "longcat"
    return model_dir, vendor_dir


def _load_text_encoder(
    model_dir: Path, compute_dtype: Any, device: Any
) -> tuple[Any, Any]:
    from transformers import AutoTokenizer, UMT5EncoderModel

    tokenizer = AutoTokenizer.from_pretrained(str(model_dir / "tokenizer"))
    # UMT5-XXL is ~10 GiB in bf16. Load to CPU; accelerate.cpu_offload below
    # moves it to GPU only during encode_prompt forward. Saves ~9 GiB VRAM
    # during the entire denoise loop.
    text_encoder = UMT5EncoderModel.from_pretrained(
        str(model_dir / "text_encoder"),
        torch_dtype=compute_dtype,
    )
    _attach_cpu_offload(text_encoder, execution_device=device, label="text_encoder")
    return tokenizer, text_encoder


def _load_vae(model_dir: Path, compute_dtype: Any, device: Any) -> Any:
    from longcat_video.modules.autoencoder_kl_wan import AutoencoderKLWan

    # AutoencoderKLWan is ~500 MiB — small enough to stay resident, but the
    # decode forward allocates per-frame activations that can spike. Keep
    # the weights GPU-resident; the VideoProcessor handles tiling for memory
    # control. If 8GB cards complain, add _attach_cpu_offload here too.
    vae = AutoencoderKLWan.from_pretrained(
        str(model_dir / "vae"), torch_dtype=compute_dtype
    )
    vae = vae.to(device)
    return vae


def _attach_cpu_offload(
    model: Any, *, execution_device: Any, label: str
) -> None:
    try:
        from accelerate.hooks import AlignDevicesHook, add_hook_to_module
    except ImportError:
        logger.warning(
            "_attach_cpu_offload(%s): accelerate not importable; "
            "model stays on its current device.",
            label,
        )
        return

    hook = AlignDevicesHook(
        execution_device=execution_device,
        offload=True,
        io_same_device=True,
        offload_buffers=True,
        place_submodules=True,
    )
    add_hook_to_module(model, hook, append=True)
    logger.info(
        "_attach_cpu_offload(%s): hook attached (exec=%s, weights→cpu)",
        label,
        execution_device,
    )


def _load_scheduler(model_dir: Path, use_distill: bool) -> Any:
    from longcat_video.modules.scheduling_flow_match_euler_discrete import (
        FlowMatchEulerDiscreteScheduler,
    )

    scheduler = FlowMatchEulerDiscreteScheduler.from_pretrained(
        str(model_dir / "scheduler")
    )
    if use_distill:
        scheduler.config.shift = 12.0
        # `shift` is a read-only @property backed by `_shift`; write to the
        # underlying attribute directly.
        if hasattr(scheduler, "_shift"):
            scheduler._shift = 12.0
    return scheduler


def _load_dit(
    model_dir: Path,
    vendor_dir: Path,
    compute_dtype: Any,
    device: Any,
    host_data_dir: Optional[str],
    offload_mode: str = "none",
    block_swap_count: int = 0,
) -> Any:
    import json

    from .longcat_safetensors_loader import load_longcat_dit_from_safetensors

    root_str = host_data_dir or os.environ.get("NEXUS_HOST_DATA_DIR")
    if not root_str:
        raise RuntimeError(
            "_load_dit: NEXUS_HOST_DATA_DIR is unset; cannot locate KJ safetensors."
        )
    root = Path(root_str)
    kj_path = root / "models" / _KIJAI_REPO_SUBDIR / _KJ_FP8_FILENAME

    dit_config_path = model_dir / "dit" / "config.json"
    if not dit_config_path.is_file():
        raise FileNotFoundError(
            f"dit/config.json not found at {dit_config_path}. "
            "Re-run the installer (PROFILE_REPO allow_patterns now includes "
            "'dit/config.json')."
        )
    config = json.loads(dit_config_path.read_text(encoding="utf-8"))
    # Single-GPU mode: upstream DiT forward subscripts cp_split_hw
    # unconditionally (longcat_video_dit.py:329); None is a multi-GPU
    # placeholder. Force [1,1] so the no-op branch still passes shape check.
    if config.get("cp_split_hw") is None:
        config["cp_split_hw"] = [1, 1]
    # Attention backend selection. Order of preference: xformers (best VRAM)
    # > flash-attn-2 (faster, no Windows wheels) > sdpa monkey-patch fallback.
    # The host sets NEXUS_VIDEO_LONGCAT_ATTN to override; default = xformers
    # when importable, else fall through to our sdpa monkey-patch.
    config["enable_flashattn2"] = False
    config["enable_flashattn3"] = False
    config["enable_bsa"] = False
    config["enable_xformers"] = False
    attn_backend = os.environ.get("NEXUS_VIDEO_LONGCAT_ATTN", "auto").lower()
    if attn_backend in ("auto", "xformers"):
        try:
            import xformers  # noqa: F401
            config["enable_xformers"] = True
            logger.info("_load_dit: enable_xformers=True (xformers %s detected)", xformers.__version__)
        except ImportError:
            logger.info(
                "_load_dit: xformers unavailable; falling back to sdpa monkey-patch"
            )
    elif attn_backend == "flashattn2":
        config["enable_flashattn2"] = True
    elif attn_backend == "flashattn3":
        config["enable_flashattn3"] = True
    elif attn_backend == "sdpa":
        pass  # all three False → SDPA monkey-patch will engage

    bundle = load_longcat_dit_from_safetensors(
        kj_path,
        vendor_dir=vendor_dir,
        config=config,
        install_device=device,
        compute_dtype=compute_dtype,
        strict_schema=False,
        offload_mode=offload_mode,
        block_swap_count=block_swap_count,
    )
    return bundle.transformer


def _build_pipeline(
    tokenizer: Any,
    text_encoder: Any,
    vae: Any,
    scheduler: Any,
    dit: Any,
    vendor_dir: Path,
) -> Any:
    vstr = str(vendor_dir)
    if vstr not in sys.path:
        sys.path.insert(0, vstr)

    from longcat_video.pipeline_longcat_video import LongCatVideoPipeline

    return LongCatVideoPipeline(
        tokenizer=tokenizer,
        text_encoder=text_encoder,
        vae=vae,
        scheduler=scheduler,
        dit=dit,
    )


def _maybe_load_distill_lora(
    dit: Any, host_data_dir: Optional[str], vendor_dir: Path
) -> Any:
    root_str = host_data_dir or os.environ.get("NEXUS_HOST_DATA_DIR")
    if not root_str:
        logger.warning(
            "_maybe_load_distill_lora: NEXUS_HOST_DATA_DIR unset; skipping LoRA."
        )
        return None

    lora_path = Path(root_str) / "models" / _KIJAI_REPO_SUBDIR / _DISTILL_LORA_FILENAME
    if not lora_path.exists():
        logger.warning(
            "_maybe_load_distill_lora: distill LoRA not found at %s — proceeding "
            "without it (distill timestep schedule still active via use_distill=True).",
            lora_path,
        )
        return None

    vstr = str(vendor_dir)
    if vstr not in sys.path:
        sys.path.insert(0, vstr)

    try:
        from safetensors.torch import load_file
        from longcat_video.modules.lora_utils import create_lora_network

        lora_sd = load_file(str(lora_path), device="cpu")
        network = create_lora_network(
            transformer=dit,
            lora_network_state_dict_loaded=lora_sd,
            multiplier=1.0,
            network_dim=128,
            network_alpha=64.0,
        )
        import torch
        network = network.to(dtype=torch.bfloat16, device=next(dit.parameters()).device)
        logger.info(
            "_maybe_load_distill_lora: loaded LoRA from %s (%d modules)",
            lora_path,
            len(network.loras),
        )
        return network
    except Exception as exc:
        logger.warning(
            "_maybe_load_distill_lora: failed to load distill LoRA (%s); "
            "proceeding without it.",
            exc,
        )
        return None


def _state_config_key(
    *, use_distill: bool, offload_mode: str, block_swap_count: int
) -> tuple:
    # Cache key for _STATE. Any field that materially changes how the
    # pipeline is constructed must be in here, otherwise a second
    # render() call w/ different knobs silently reuses the first config.
    attn = os.environ.get("NEXUS_VIDEO_LONGCAT_ATTN", "auto").lower()
    return (bool(use_distill), str(offload_mode), int(block_swap_count), attn)


def _ensure_state(
    host_data_dir: Optional[str] = None,
    use_distill: bool = False,
    offload_mode: str = "none",
    block_swap_count: int = 0,
) -> _PipelineState:
    global _STATE
    requested_key = _state_config_key(
        use_distill=use_distill,
        offload_mode=offload_mode,
        block_swap_count=block_swap_count,
    )
    if _STATE is not None:
        cached_key = getattr(_STATE, "config_key", None)
        # Reuse on match. Treat a missing config_key (legacy / test-injected
        # state) as compatible to avoid breaking callers that hand-build the
        # singleton.
        if cached_key is None or cached_key == requested_key:
            return _STATE
        logger.warning(
            "_ensure_state: config changed since last build "
            "(cached=%r, requested=%r). Rebuilding pipeline state.",
            cached_key,
            requested_key,
        )
        _STATE = None
        try:
            import torch as _t
            _t.cuda.empty_cache()
        except ImportError:
            pass

    import torch

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    compute_dtype = torch.bfloat16

    model_dir, vendor_dir = _resolve_paths(host_data_dir)

    vstr = str(vendor_dir)
    if vstr not in sys.path:
        sys.path.insert(0, vstr)

    try:
        tokenizer, text_encoder = _load_text_encoder(model_dir, compute_dtype, device)
    except Exception as exc:
        raise RuntimeError(f"load_text_encoder failed: {exc}") from exc

    try:
        vae = _load_vae(model_dir, compute_dtype, device)
    except Exception as exc:
        raise RuntimeError(f"load_vae failed: {exc}") from exc

    try:
        scheduler = _load_scheduler(model_dir, use_distill=use_distill)
    except Exception as exc:
        raise RuntimeError(f"load_scheduler failed: {exc}") from exc

    try:
        dit = _load_dit(
            model_dir,
            vendor_dir,
            compute_dtype,
            device,
            host_data_dir,
            offload_mode=offload_mode,
            block_swap_count=block_swap_count,
        )
    except Exception as exc:
        raise RuntimeError(f"load_dit failed: {exc}") from exc

    try:
        pipeline = _build_pipeline(tokenizer, text_encoder, vae, scheduler, dit, vendor_dir)
    except Exception as exc:
        raise RuntimeError(f"build_pipeline failed: {exc}") from exc

    lora_network: Any = None
    if use_distill:
        lora_network = _maybe_load_distill_lora(dit, host_data_dir, vendor_dir)

    _STATE = _PipelineState(
        pipeline=pipeline,
        device=device,
        compute_dtype=compute_dtype,
        vendor_dir=vendor_dir,
        model_dir=model_dir,
        tokenizer=tokenizer,
        text_encoder=text_encoder,
        vae=vae,
        scheduler=scheduler,
        dit=dit,
        lora_network=lora_network,
    )
    _STATE.config_key = requested_key
    return _STATE


def _load_video_frames(video_path: str) -> Any:
    import numpy as np

    try:
        import cv2

        cap = cv2.VideoCapture(video_path)
        frames = []
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frames.append(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        cap.release()
        return np.array(frames, dtype=np.float32) / 255.0
    except Exception:
        pass

    try:
        from PIL import Image
        import imageio

        reader = imageio.get_reader(video_path)
        frames = [np.array(f, dtype=np.float32) / 255.0 for f in reader]
        reader.close()
        return np.array(frames)
    except Exception as exc:
        raise RuntimeError(
            f"_load_video_frames: cannot decode video {video_path!r}. "
            f"Install opencv-python or imageio. Original error: {exc}"
        ) from exc


def render(
    request: LongCatRenderRequest,
    *,
    output_dir: Optional[str] = None,
    host_data_dir: Optional[str] = None,
    offload_mode: Optional[str] = None,
    block_swap_count: Optional[int] = None,
) -> Path:
    import torch

    # Env-var overrides for operators driving the worker without modifying the
    # call site. RPC params (offload_mode, block_swap_count) take precedence
    # when supplied; env vars are the fallback for headless / scripted runs.
    if offload_mode is None:
        offload_mode = os.environ.get("NEXUS_VIDEO_LONGCAT_OFFLOAD_MODE", "none")
    if block_swap_count is None:
        env_swap = os.environ.get("NEXUS_VIDEO_LONGCAT_BLOCK_SWAP")
        try:
            block_swap_count = int(env_swap) if env_swap is not None else 0
        except ValueError:
            logger.warning(
                "NEXUS_VIDEO_LONGCAT_BLOCK_SWAP=%r is not an integer; "
                "falling back to block_swap_count=0",
                env_swap,
            )
            block_swap_count = 0

    phase = "build_pipeline"
    try:
        state = _ensure_state(
            host_data_dir=host_data_dir,
            use_distill=request.use_distill,
            offload_mode=offload_mode,
            block_swap_count=block_swap_count,
        )
    except RuntimeError as exc:
        msg = str(exc)
        for candidate in ("load_dit", "load_vae", "load_text_encoder", "load_scheduler"):
            if candidate in msg:
                phase = candidate
                break
        raise _PipelineError(phase, str(exc)) from exc

    generator: Optional[torch.Generator] = None
    if request.seed is not None:
        generator = torch.Generator(device=str(state.device))
        generator.manual_seed(request.seed)

    attn_kwargs: dict[str, Any] = {}
    if request.offload_kv_cache:
        attn_kwargs["offload_kv_cache"] = True

    phase = "generate"
    try:
        frames = _dispatch_generate(request, state, generator, attn_kwargs)
    except Exception as exc:
        raise _PipelineError("generate", str(exc)) from exc

    if output_dir:
        out_dir = Path(output_dir)
    else:
        out_dir = Path(tempfile.mkdtemp(prefix="nexus_longcat_"))

    out_dir.mkdir(parents=True, exist_ok=True)
    run_id = f"{int(time.time() * 1000)}"
    output_path = out_dir / f"{run_id}.mp4"

    import numpy as np

    arr = np.asarray(frames)
    if arr.ndim == 5:
        arr = arr[0]

    from .ffmpeg_io import write_video_frames

    write_video_frames(arr, fps=24, path=output_path)
    return output_path


def _dispatch_generate(
    request: LongCatRenderRequest,
    state: _PipelineState,
    generator: Any,
    attn_kwargs: dict[str, Any],
) -> Any:
    pipeline = state.pipeline

    common = dict(
        prompt=request.prompt,
        negative_prompt=request.negative_prompt,
        num_frames=request.num_frames,
        num_inference_steps=request.num_inference_steps,
        use_distill=request.use_distill,
        guidance_scale=request.guidance_scale,
        generator=generator,
        max_sequence_length=request.max_sequence_length,
        attention_kwargs=attn_kwargs if attn_kwargs else None,
    )

    if request.mode == "t2v":
        return pipeline.generate_t2v(
            height=request.height,
            width=request.width,
            **common,
        )

    if request.mode == "i2v":
        if not request.image_path:
            raise ValueError("i2v mode requires image_path")
        from PIL import Image

        pil_image = Image.open(request.image_path).convert("RGB")
        resolution = "720p" if request.height >= 720 else "480p"
        common_no_hw = {k: v for k, v in common.items()}
        return pipeline.generate_i2v(
            image=pil_image,
            resolution=resolution,
            **common_no_hw,
        )

    if request.mode == "vc":
        if not request.conditioning_video_path:
            raise ValueError("vc mode requires conditioning_video_path")
        import numpy as np
        from PIL import Image

        raw = _load_video_frames(request.conditioning_video_path)
        frames_pil = [Image.fromarray((f * 255).clip(0, 255).astype("uint8")) for f in raw]
        resolution = "720p" if request.height >= 720 else "480p"
        # `offload_kv_cache` is already routed through attention_kwargs via
        # `common` (see attn_kwargs build above). Passing it again as a bare
        # kwarg here would either shadow the attention_kwargs entry or
        # raise TypeError on generate_vc(...) signatures that don't accept
        # it as a top-level arg. Audit 2026-05-24 caught this.
        return pipeline.generate_vc(
            video=frames_pil,
            resolution=resolution,
            **common,
        )

    if request.mode == "refine":
        if not request.low_res_video_path:
            raise ValueError("refine mode requires low_res_video_path")
        return pipeline.generate_refine(
            stage1_video=request.low_res_video_path,
            **{k: v for k, v in common.items() if k not in ("guidance_scale", "use_distill")},
        )

    raise ValueError(f"Unknown render mode: {request.mode!r}")


class _PipelineError(RuntimeError):
    def __init__(self, phase: str, message: str) -> None:
        super().__init__(message)
        self.phase = phase


def register_longcat_handlers(worker: Any, *, use_distill: bool = False) -> None:
    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        if use_distill:
            params.setdefault("use_distill", True)
            params.setdefault("guidance_scale", 1.0)
            params.setdefault("num_inference_steps", 12)

        request = LongCatRenderRequest(
            mode=params.get("mode", "t2v"),
            prompt=params["prompt"],
            negative_prompt=params.get("negative_prompt"),
            image_path=params.get("image_path"),
            conditioning_video_path=params.get("conditioning_video_path"),
            low_res_video_path=params.get("low_res_video_path"),
            height=int(params.get("height", 480)),
            width=int(params.get("width", 832)),
            num_frames=int(params.get("num_frames", 93)),
            num_inference_steps=int(params.get("num_inference_steps", 50)),
            guidance_scale=float(params.get("guidance_scale", 4.0)),
            use_distill=bool(params.get("use_distill", use_distill)),
            seed=params.get("seed"),
            max_sequence_length=int(params.get("max_sequence_length", 512)),
            offload_kv_cache=bool(params.get("offload_kv_cache", False)),
        )

        host_data_dir = params.get("host_data_dir") or os.environ.get("NEXUS_HOST_DATA_DIR")
        output_dir = params.get("output_dir")
        offload_mode = params.get("offload_mode", "none")
        block_swap_count = int(params.get("block_swap_count", 0))

        t0 = time.monotonic()
        try:
            output_path = await __import__("asyncio").to_thread(
                render,
                request,
                output_dir=output_dir,
                host_data_dir=host_data_dir,
                offload_mode=offload_mode,
                block_swap_count=block_swap_count,
            )
            duration = time.monotonic() - t0
            return {
                "status": "ok",
                "output_path": str(output_path),
                "duration_seconds": round(duration, 2),
                "num_frames": request.num_frames,
            }
        except _PipelineError as exc:
            return {
                "status": "error",
                "code": -32603,
                "message": str(exc),
                "phase": exc.phase,
            }
        except Exception as exc:
            return {
                "status": "error",
                "code": -32603,
                "message": str(exc),
                "phase": "generate",
            }

    worker.register("longcat.video.render.start", _render_start)
