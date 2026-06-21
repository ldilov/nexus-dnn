from __future__ import annotations

import asyncio
import os
import sys
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Optional


def cpu_thread_count() -> int:
    """Worker-side thread budget for CPU-parallel ops (``cpu//2``, min 1)."""
    return max(1, (os.cpu_count() or 2) // 2)


THREADS = cpu_thread_count()

# Tracks the torch intra-op thread count we last applied (and the process
# default captured once) so fast-parallel toggling stays reversible + idempotent.
_torch_threads_applied: Optional[int] = None
_torch_threads_original: Optional[int] = None


def _apply_torch_threads(fast_parallel: bool) -> bool:
    """Apply the fast-parallel intra-op thread budget (cpu//2) or restore the
    process default when off. Idempotent and torch-absent-safe."""
    global _torch_threads_applied, _torch_threads_original
    try:
        import torch
    except ImportError:
        return False
    if _torch_threads_original is None:
        try:
            _torch_threads_original = torch.get_num_threads()
        except (RuntimeError, AttributeError):
            _torch_threads_original = 0
    target = THREADS if fast_parallel else _torch_threads_original
    if not target or target <= 0:
        return False
    if _torch_threads_applied == target:
        return False
    try:
        torch.set_num_threads(target)
    except (RuntimeError, AttributeError):
        return False
    _torch_threads_applied = target
    return True


class RenderCancelled(Exception):
    """Raised inside the render thread when a cooperative cancel signal fires.

    Carries no payload — the cancel handler already set the shared Event; this
    just unwinds the diffusion loop so the ``finally`` cleanup frees GPU/host
    memory before the worker replies."""

_ARTIFACT_FILENAMES: dict[str, str] = {
    "dit-high-fp8": "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors",
    "dit-low-fp8": "I2V/Wan2_2-I2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors",
    "dit-t2v-high": "T2V/Wan2_2-T2V-A14B_HIGH_fp8_e4m3fn_scaled_KJ.safetensors",
    "dit-t2v-low": "T2V/Wan2_2-T2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors",
    "svi-lora-high": "version-2.0/SVI_Wan2.2-I2V-A14B_high_noise_lora_v2.0_pro.safetensors",
    "svi-lora-low": "version-2.0/SVI_Wan2.2-I2V-A14B_low_noise_lora_v2.0_pro.safetensors",
    "text-encoder": "umt5-xxl-enc-bf16.safetensors",
    "vae": "Wan2_1_VAE_bf16.safetensors",
    "tokenizer": "google/umt5-xxl",
    "qwen-edit-diffusion": "Qwen-Image-Edit-2509-Q5_K_M.gguf",
    "qwen-edit-vae": "split_files/vae/qwen_image_vae.safetensors",
    "qwen-edit-llm": "Qwen2.5-VL-7B-Instruct-Q4_K_M.gguf",
    "qwen-edit-mmproj": "mmproj-F16.gguf",
    "rife-flownet": "flownet.pkl",
}

_WAN22_A14B_CONFIG: dict[str, Any] = {
    "has_image_input": False,
    "patch_size": (1, 2, 2),
    "in_dim": 36,
    "dim": 5120,
    "ffn_dim": 13824,
    "freq_dim": 256,
    "text_dim": 4096,
    "out_dim": 16,
    "num_heads": 40,
    "num_layers": 40,
    "eps": 1e-6,
    "require_clip_embedding": False,
}

# T2V variant of the i2v expert: latent-only in_dim=16, no y/clip conditioning.
_WAN22_T2V_A14B_CONFIG: dict[str, Any] = {
    **_WAN22_A14B_CONFIG,
    "in_dim": 16,
    "has_image_input": False,
    "require_vae_embedding": False,
    "require_clip_embedding": False,
}

_NEGATIVE_PROMPT = (
    "色调艳丽，过曝，静态，细节模糊不清，字幕，风格，作品，画作，画面，静止，整体发灰，"
    "最差质量，低质量，JPEG压缩残留，丑陋的，残缺的，多余的手指，画得不好的手部，画得不好的脸部，"
    "畸形的，毁容的，形态畸形的肢体，手指融合，静止不动的画面，杂乱的背景，三条腿，背景人很多，倒着走"
)

_SWITCH_BOUNDARY = 0.9
_NUM_INFERENCE_STEPS = 50
_SIGMA_SHIFT = 5.0

_TEACACHE_MULTIPLIER_THRESH: dict[float, float] = {
    1.0: 0.0,
    1.25: 0.04,
    1.5: 0.08,
    1.75: 0.115,
    2.0: 0.15,
    2.25: 0.19,
    2.5: 0.23,
}


MAX_LORA_WEIGHT = 4.0


def _clamp_lora_weight(v: object) -> float:
    try:
        f = float(v) if v is not None else 1.0
    except (TypeError, ValueError):
        f = 1.0
    return max(0.0, min(MAX_LORA_WEIGHT, f))


def _clamp_lora_weight_or(v: object, fallback: float) -> float:
    """Clamp to [0, MAX_LORA_WEIGHT]; None/invalid falls back so an explicit 0
    survives as a real per-tier weight while a missing field inherits the base.
    Distill LoRAs (lightx2v 3.0 high / 1.5 low) need the >2.0 headroom."""
    if v is None:
        return fallback
    try:
        f = float(v)
    except (TypeError, ValueError):
        return fallback
    return max(0.0, min(MAX_LORA_WEIGHT, f))


def _normalize_user_loras(raw: object) -> list[dict]:
    if not isinstance(raw, list):
        return []
    out: list[dict] = []
    for item in raw:
        if not isinstance(item, dict):
            continue
        path = item.get("path")
        if not isinstance(path, str) or not path.strip():
            continue
        base = _clamp_lora_weight(item.get("weight"))
        out.append(
            {
                "path": path,
                "weight": base,
                "weight_high": _clamp_lora_weight_or(item.get("weight_high"), base),
                "weight_low": _clamp_lora_weight_or(item.get("weight_low"), base),
            }
        )
        if len(out) >= 4:
            break
    return out


def _teacache_multiplier(params: dict[str, Any]) -> float:
    raw_mult = params.get("teacache_multiplier")
    return 1.0 if raw_mult is None else float(raw_mult)


def _resolve_teacache_thresh(params: dict[str, Any]) -> float:
    raw = params.get("teacache_thresh")
    if raw is not None:
        return max(0.0, float(raw))
    mult = _teacache_multiplier(params)
    keys = list(_TEACACHE_MULTIPLIER_THRESH)
    nearest = min(keys, key=lambda k: abs(k - mult))
    return _TEACACHE_MULTIPLIER_THRESH[nearest]


_MODE_IMAGE_TO_VIDEO = "image_to_video"
_MODE_TEXT_TO_VIDEO = "text_to_video"
_RENDER_MODES = frozenset({_MODE_IMAGE_TO_VIDEO, _MODE_TEXT_TO_VIDEO})

_SEED_ORIGIN_OPERATOR = "operator"
_SEED_ORIGIN_T2V_CLIP = "t2v_clip"


def needs_seed_clip(params: dict[str, Any]) -> bool:
    """True when clip 0 must be generated from text: t2v mode with no ref image.

    The Wan2.2-T2V-A14B experts generate clip 0 directly; its last decoded frame
    seeds the unchanged i2v + SVI chain (anchor) and its last latents seed the
    chain's motion carry. When the operator supplies a ``ref_image_path`` the
    image is used as the anchor and no t2v clip is generated (FR-006).
    """
    return params.get("mode") == _MODE_TEXT_TO_VIDEO and not params.get("ref_image_path")


def seed_origin(params: dict[str, Any]) -> str:
    """Report tag: ``t2v_clip`` when clip 0 is generated, else ``operator``."""
    return _SEED_ORIGIN_T2V_CLIP if needs_seed_clip(params) else _SEED_ORIGIN_OPERATOR


def validate_render_params(params: dict[str, Any]) -> dict[str, Any]:
    """Normalise and validate a render-params dict into the worker's canonical shape.

    ``seed`` fixes the initial noise of the text-to-video seed clip (clip 0,
    generated by the Wan2.2-T2V experts) for reproducible takes, and is distinct
    from ``seed_multiplier``, which derives per-clip noise seeds during the
    chained i2v render. ``seed_strength`` is reserved: accepted and carried
    through, but not yet wired into any pipeline stage.
    """
    mode = str(params.get("mode", _MODE_IMAGE_TO_VIDEO))
    if mode not in _RENDER_MODES:
        raise ValueError(
            f"mode must be one of {sorted(_RENDER_MODES)}; got {mode!r}"
        )

    ref = params.get("ref_image_path")
    if mode == _MODE_IMAGE_TO_VIDEO and not ref:
        raise ValueError("ref_image_path is required")

    prompts = params.get("prompts")
    if not prompts:
        raise ValueError("prompts must be a non-empty list")

    num_clips = int(params.get("num_clips", len(prompts)))

    frames_per_clip = int(params.get("frames_per_clip", 81))
    if (frames_per_clip - 1) % 4 != 0:
        raise ValueError(f"frames_per_clip must be 4n+1 (49, 65, 81); got {frames_per_clip}")

    num_motion_latent = int(params.get("num_motion_latent", 1))
    pixel_re_encode = bool(params.get("pixel_re_encode", False))
    num_motion_frame = int(params.get("num_motion_frame", 4))
    if pixel_re_encode:
        reencoded_latent_frames = 1 + (num_motion_frame - 1) // 4
        if reencoded_latent_frames < num_motion_latent:
            raise ValueError(
                f"pixel_re_encode with num_motion_frame={num_motion_frame} yields "
                f"{reencoded_latent_frames} latent frame(s), fewer than "
                f"num_motion_latent={num_motion_latent}; raise num_motion_frame to "
                f"at least {4 * (num_motion_latent - 1) + 1}"
            )

    last_image = params.get("last_image_path")
    requires_last_image = bool(params.get("requires_last_image", False))
    if requires_last_image and not last_image:
        raise ValueError(
            "last_image_path is required for this preset/mode "
            "(flf2v morph needs a target end keyframe)"
        )
    # FLF2V pins the end keyframe into EVERY clip's last latent slot, so a
    # chained render re-arrives at the keyframe each clip. Morphs are 1 clip.
    if last_image and num_clips > 1:
        raise ValueError(
            f"last_image_path (FLF2V) requires num_clips=1; got num_clips={num_clips}. "
            "For a longer morph raise frames_per_clip instead of chaining clips."
        )

    from .resolution import resolution_warning

    width = int(params.get("width", 480))
    height = int(params.get("height", 832))
    # Reference pipeline divides by VAE upsampling (8) x DiT patch (2) per axis.
    if width % 16 != 0 or height % 16 != 0:
        raise ValueError(
            f"width and height must be multiples of 16 (Wan VAE x DiT patch); got {width}x{height}"
        )
    res_warning = resolution_warning(width, height)
    seed = params.get("seed")
    seed_strength = params.get("seed_strength")
    return {
        "mode": mode,
        "seed": int(seed) if seed is not None else None,
        "seed_strength": float(seed_strength) if seed_strength is not None else None,
        "ref_image_path": str(ref) if ref else None,
        "last_image_path": str(last_image) if last_image else None,
        "prompts": list(prompts),
        "negative_prompt": str(params.get("negative_prompt", _NEGATIVE_PROMPT)),
        "num_clips": num_clips,
        "height": height,
        "width": width,
        "requires_last_image": requires_last_image,
        "resolution_warning": res_warning,
        "fps": int(params.get("fps", 15)),
        "frames_per_clip": frames_per_clip,
        "cfg_scale": float(params.get("cfg_scale", 5.0)),
        "num_inference_steps": int(params.get("num_inference_steps", _NUM_INFERENCE_STEPS)),
        "sigma_shift": float(params.get("sigma_shift", _SIGMA_SHIFT)),
        "switch_boundary": float(params.get("switch_boundary", _SWITCH_BOUNDARY)),
        "num_overlap_frame": int(params.get("num_overlap_frame", 4)),
        "stitch_mode": str(params.get("stitch_mode", "crossfade")),
        "ref_pad_num": int(params.get("ref_pad_num", 0)),
        "ref_pad_free_clips": int(params.get("ref_pad_free_clips", 2)),
        "ref_pad_schedule": (
            [int(v) for v in params["ref_pad_schedule"]]
            if params.get("ref_pad_schedule")
            else None
        ),
        "num_motion_latent": num_motion_latent,
        "pixel_re_encode": pixel_re_encode,
        "num_motion_frame": num_motion_frame,
        "upscale_factor": _validate_upscale_factor(params),
        "upscale_quality": _validate_upscale_quality(params),
        "upscale_model": _validate_upscale_model(params),
        "interpolate_fps": int(params.get("interpolate_fps", 0)),
        "interpolate_method": str(params.get("interpolate_method", "rife")),
        "rife_bin": params.get("rife_bin"),
        "rife_model": params.get("rife_model"),
        "rife_weights": params.get("rife_weights"),
        "blocks_to_swap": int(params.get("blocks_to_swap", 40)),
        "teacache_multiplier": _teacache_multiplier(params),
        "teacache_thresh": _resolve_teacache_thresh(params),
        "motion_scale_t": float(params.get("motion_scale_t", 1.0)),
        "motion_scale_h": float(params.get("motion_scale_h", 1.0)),
        "motion_scale_w": float(params.get("motion_scale_w", 1.0)),
        "motion_scale_schedule": params.get("motion_scale_schedule"),
        "image_cond_noise_scale": float(params.get("image_cond_noise_scale", 0.0)),
        "image_cond_noise_schedule": params.get("image_cond_noise_schedule"),
        "image_cond_noise_bg_protect": float(params.get("image_cond_noise_bg_protect", 0.0)),
        "adain_factor": float(params.get("adain_factor", 0.0)),
        "distill_lora_high": params.get("distill_lora_high"),
        "distill_lora_low": params.get("distill_lora_low"),
        "svi_lora_tier": _validate_svi_lora_tier(params),
        "torch_compile_mode": _validate_torch_compile_mode(params),
        "user_loras": _normalize_user_loras(params.get("user_loras")),
        "dit_high_path": params.get("dit_high_path"),
        "dit_low_path": params.get("dit_low_path"),
        "fixed_sigmas": params.get("fixed_sigmas"),
        "solver": str(params.get("solver", "euler")).lower()
        if str(params.get("solver", "euler")).lower() in {"euler", "heun", "euler_ancestral"}
        else "euler",
        "seed_multiplier": int(params.get("seed_multiplier", 42)),
        "models_dir": params.get("models_dir"),
        "output_path": params.get("output_path", "out.mp4"),
        "device": params.get("device"),
        "attention": params.get("attention"),
        "use_torch_compile": bool(params.get("use_torch_compile", False)),
        "fast_parallel": bool(params.get("fast_parallel", True)),
        "batch_prompt_encode": bool(params.get("batch_prompt_encode", False)),
    }


def _validate_upscale_factor(params: dict[str, Any]) -> int:
    from .rtx_upscale import UPSCALE_FACTORS

    factor = int(params.get("upscale_factor", 0))
    if factor not in UPSCALE_FACTORS:
        raise ValueError(
            f"upscale_factor must be one of {UPSCALE_FACTORS} (0 = off); got {factor}"
        )
    return factor


def _validate_upscale_quality(params: dict[str, Any]) -> str:
    from .rtx_upscale import DEFAULT_QUALITY, UPSCALE_QUALITIES

    quality = str(params.get("upscale_quality", DEFAULT_QUALITY)).upper()
    if quality not in UPSCALE_QUALITIES:
        raise ValueError(
            f"upscale_quality must be one of {UPSCALE_QUALITIES}; got {quality}"
        )
    return quality


# Upscaler engine selection. "auto" tries Maxine first (fast Tensor-Core path
# on Windows/RTX), then the DRCT-L transformer, then Real-ESRGAN — so an
# aarch64 host where Maxine has no build still gets the best available model.
UPSCALE_MODELS = (
    "auto", "maxine", "drct-l-hq", "drct-l-real", "hat-l", "swinir-l", "realesrgan"
)
DEFAULT_UPSCALE_MODEL = "auto"


def _validate_upscale_model(params: dict[str, Any]) -> str:
    model = str(params.get("upscale_model", DEFAULT_UPSCALE_MODEL)).lower()
    if model not in UPSCALE_MODELS:
        raise ValueError(
            f"upscale_model must be one of {UPSCALE_MODELS}; got {model}"
        )
    return model


# SINGLE-FILE base picks one tier; a split base gets the high/low pair.
# "off" skips SVI everywhere — for merged checkpoints (e.g. SmoothMix).
SVI_LORA_TIERS = ("high", "low", "off")
DEFAULT_SVI_LORA_TIER = "high"


def _validate_svi_lora_tier(params: dict[str, Any]) -> str:
    tier = str(params.get("svi_lora_tier", DEFAULT_SVI_LORA_TIER)).lower()
    return tier if tier in SVI_LORA_TIERS else DEFAULT_SVI_LORA_TIER


# torch.compile inductor mode. "reduce-overhead" enables CUDA graphs (lowest
# per-step overhead, more VRAM); "max-autotune" tunes kernels (slow first build).
TORCH_COMPILE_MODES = ("default", "reduce-overhead", "max-autotune")
DEFAULT_TORCH_COMPILE_MODE = "default"


def _validate_torch_compile_mode(params: dict[str, Any]) -> str:
    mode = str(params.get("torch_compile_mode", DEFAULT_TORCH_COMPILE_MODE)).lower()
    return mode if mode in TORCH_COMPILE_MODES else DEFAULT_TORCH_COMPILE_MODE


def _run_upscale_chain(
    worker: Any,
    params: dict[str, Any],
    video_path: Path,
    output_path: Path,
    fps: float,
    log_vram: Callable[[str], None],
) -> tuple[Path, str]:
    """Apply the optional super-resolution stage per `upscale_model`. "auto"
    tries Maxine → DRCT-L → Real-ESRGAN so an aarch64 host (no Maxine build)
    still lands the best available model. Every engine is fail-soft; a miss
    keeps native resolution. Returns (possibly-upscaled path, engine tag)."""
    factor: int = params["upscale_factor"]
    if factor <= 0:
        return video_path, ""

    model = params["upscale_model"]
    order = ["maxine", "drct-l-hq", "realesrgan"] if model == "auto" else [model]
    logger = getattr(worker, "logger", None)
    models_dir = params.get("models_dir")

    _notify(worker, "svi2.video.progress", {"fraction": 0.975, "stage": "upscaling"})
    # Transformer/ESRGAN engines run per-frame (far slower than Maxine's
    # Tensor-Core path), so a heartbeat keeps the client watchdog fed.
    with _ProgressHeartbeat(worker, "upscaling", 0.975):
        for engine in order:
            out = output_path.parent / (
                f"{output_path.stem}_{engine.replace('-', '_')}_x{factor}{output_path.suffix}"
            )
            if engine == "maxine":
                from .rtx_upscale import try_rtx_upscale

                if try_rtx_upscale(
                    video_path, out, factor,
                    quality=params["upscale_quality"], fps=fps, logger=logger,
                ):
                    log_vram(f"maxine upscale x{factor} ({params['upscale_quality']})")
                    return out, "maxine_vsr"
            elif engine == "realesrgan":
                from .esrgan_torch_upscale import try_esrgan_upscale

                if try_esrgan_upscale(
                    video_path, out, factor, fps=fps, logger=logger, models_dir=models_dir
                ):
                    log_vram(f"realesrgan upscale x{factor}")
                    return out, "esrgan_torch"
            else:
                from .spandrel_upscale import try_spandrel_upscale

                if try_spandrel_upscale(
                    video_path, out, factor, model_name=engine,
                    fps=fps, logger=logger, models_dir=models_dir,
                ):
                    log_vram(f"{engine} upscale x{factor}")
                    return out, engine.replace("-", "_")
    log_vram("upscale unavailable — keeping native resolution")
    return video_path, ""


def resolve_models_dir(explicit: str | None = None) -> Path:
    if explicit:
        return Path(explicit)
    env_dir = os.environ.get("SVI2_MODELS_DIR")
    if env_dir:
        return Path(env_dir)
    host_data = os.environ.get("NEXUS_HOST_DATA_DIR")
    if host_data:
        return Path(host_data) / "extensions" / "nexus.video.svi2-pro" / "models"
    return Path("models")


def _notify(worker: Any, method: str, params: dict[str, Any]) -> None:
    fn = getattr(worker, "notify_from_thread", None)
    if fn is None:
        return
    try:
        fn(method, params)
    except Exception:
        pass


class _ProgressHeartbeat:
    """Re-emit a progress notification on a timer while a long, frame-silent
    blocking step runs (multi-GB expert / text-encoder loads emit a single
    stage frame then go dark for tens of seconds). Without this the frontend
    stall watchdog (90s) falsely flags "no progress — connection may be lost"
    during a normal load. Emits via the thread-safe notify_from_thread path.
    Usable as a context manager or via explicit start()/stop() (stop() is
    idempotent, so it is safe to also stop from an on-step callback once real
    per-step frames take over)."""

    def __init__(
        self, worker: Any, stage: str, fraction: float, interval: float = 12.0
    ) -> None:
        self._worker = worker
        self._stage = stage
        self._fraction = fraction
        self._interval = interval
        self._stop = threading.Event()
        self._thread: Optional[threading.Thread] = None

    def start(self) -> None:
        if self._thread is not None:
            return

        def _beat() -> None:
            while not self._stop.wait(self._interval):
                _notify(
                    self._worker,
                    "svi2.video.progress",
                    {"fraction": self._fraction, "stage": self._stage},
                )

        self._thread = threading.Thread(
            target=_beat, name=f"svi2-heartbeat-{self._stage}", daemon=True
        )
        self._thread.start()

    def stop(self) -> None:
        self._stop.set()
        thread, self._thread = self._thread, None
        if thread is not None:
            thread.join(timeout=1.0)

    def __enter__(self) -> "_ProgressHeartbeat":
        self.start()
        return self

    def __exit__(self, *_exc: Any) -> None:
        self.stop()


def _sweep_vram() -> None:
    """Reclaim residual VRAM via the generic worker sweep (gc + empty_cache).

    Called once a render's stack frame is fully unwound, so the references the
    in-function ``finally`` still held (latents, conditioning, compiled
    experts) are gone and the sweep can actually return blocks to the driver.
    Lazy import avoids a circular dependency with ``main``; torch-absent-safe.
    """
    from .main import base_release_memory

    base_release_memory()


def register_svi2_handlers(worker: Any) -> None:
    cancel_event = threading.Event()

    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        cancel_event.clear()
        validated = validate_render_params(params or {})
        if not validated.get("models_dir"):
            validated["models_dir"] = str(resolve_models_dir())
        _log_render_inputs(params or {}, validated)
        try:
            return await asyncio.to_thread(
                _run_render, validated, worker, cancel_event=cancel_event
            )
        except RenderCancelled:
            return {"status": "cancelled"}
        finally:
            # Frame fully unwound here: no render-local GPU tensor survives,
            # so this sweep reclaims what the in-function finally could not.
            await asyncio.to_thread(_sweep_vram)

    async def _render_cancel(_params: Any) -> dict[str, Any]:
        cancel_event.set()
        return {"cancelled": True}

    worker.register("svi2.video.render.start", _render_start)
    worker.register("svi2.video.render.cancel", _render_cancel)


@dataclass
class ExpertModel:
    dit: Any
    fp8_audit: dict[str, object]
    lora_audit: dict[str, object]


@dataclass
class RenderModels:
    high: ExpertModel
    low: ExpertModel
    vae: Any
    text_encoder: Any
    audit: dict[str, object]


def _resolve(models_dir: Path, artifact_id: str) -> Path:
    return models_dir / _ARTIFACT_FILENAMES[artifact_id]


def _wan_model_builder(config: dict[str, Any]) -> Any:
    from .wan22 import WanModel

    return WanModel(**config)


def _build_expert(
    dit_path: Path,
    lora_path: Optional[Path],
    distill_lora_path: Optional[Path] = None,
    user_loras: Optional[list[dict]] = None,
) -> ExpertModel:
    from .wan22 import WanModel
    from .fp8_loader import load_expert_meta
    from .lora import load_lora_pairs, wrap_module_with_lora

    fp8_audit: dict[str, object] = {}
    if dit_path.exists():
        dit, fp8_audit = load_expert_meta(_WAN22_A14B_CONFIG, dit_path, _wan_model_builder)
    else:
        dit = WanModel(**_WAN22_A14B_CONFIG)
    dit.requires_grad_(False)
    dit.eval()

    lora_audit: dict[str, object] = {}
    if lora_path is not None and lora_path.exists():
        pairs = load_lora_pairs(lora_path)
        lora_audit = wrap_module_with_lora(dit, pairs)

    if distill_lora_path is not None and distill_lora_path.exists():
        dpairs = load_lora_pairs(distill_lora_path)
        distill_audit = wrap_module_with_lora(dit, dpairs)
        lora_audit = {"svi": lora_audit, "distill": distill_audit}

    user_audits: list[dict] = []
    for entry in (user_loras or []):
        p = Path(entry["path"])
        if not p.exists():
            user_audits.append({"path": entry["path"], "missing": True})
            continue
        upairs = load_lora_pairs(p)
        w = entry.get("weight", 1.0)
        if w != 1.0:
            upairs = {k: (a, b, s * w) for k, (a, b, s) in upairs.items()}
        entry_audit = wrap_module_with_lora(dit, upairs)
        user_audits.append({**entry_audit, "path": entry["path"]})
    if user_audits:
        if isinstance(lora_audit, dict) and lora_audit:
            lora_audit = {**lora_audit, "user": user_audits}
        else:
            lora_audit = {"user": user_audits}

    return ExpertModel(dit=dit, fp8_audit=fp8_audit, lora_audit=lora_audit)


def resolve_dit_paths(
    params: dict[str, Any], models_dir: Path, *, require_overrides_exist: bool = False
) -> tuple[Path, Path]:
    dit_high_override = params.get("dit_high_path")
    dit_low_override = params.get("dit_low_path")
    dit_high = Path(dit_high_override) if dit_high_override else _resolve(models_dir, "dit-high-fp8")
    dit_low = Path(dit_low_override) if dit_low_override else _resolve(models_dir, "dit-low-fp8")
    if require_overrides_exist:
        for label, override, path in (
            ("dit_high_path", dit_high_override, dit_high),
            ("dit_low_path", dit_low_override, dit_low),
        ):
            if override and not path.exists():
                raise ValueError(f"{label} does not exist: {path}")
    return dit_high, dit_low


def _models_dir_from(params: dict[str, Any]) -> Path:
    return Path(params["models_dir"]) if params.get("models_dir") else Path("models")


_BUNDLED_BASE_MODEL_LABEL = "Wan2.2-I2V-A14B fp8 (Kijai, bundled)"


def base_model_label(params: dict[str, Any], models_dir: Path) -> tuple[str, bool]:
    """Human label for the diffusion base model + whether it's a user override.

    Returns the bundled-checkpoint label when no ``dit_*_path`` override is set,
    otherwise the override filename(s). A single-file override (same path for
    both tiers) reads as one checkpoint; distinct paths read as a high/low pair.
    """
    override = bool(params.get("dit_high_path") or params.get("dit_low_path"))
    if not override:
        return _BUNDLED_BASE_MODEL_LABEL, False
    dit_high, dit_low = resolve_dit_paths(params, models_dir)
    if dit_high == dit_low:
        return f"{dit_high.name} (custom, single-file)", True
    return f"{dit_high.name} + {dit_low.name} (custom)", True


def _dynamo_counter_snapshot() -> dict[str, int]:
    """Read TorchDynamo's cumulative compile counters (best-effort).

    ``calls_captured``/``unique_graphs`` > 0 across a render proves compilation
    actually ran; a high ``graph_breaks`` means it kept falling back to eager.
    Returns an empty dict when torch/dynamo is unavailable."""
    try:
        from torch._dynamo.utils import counters

        stats = counters.get("stats", {})
        return {
            "calls_captured": int(stats.get("calls_captured", 0)),
            "unique_graphs": int(stats.get("unique_graphs", 0)),
            "graph_breaks": int(sum(counters.get("graph_break", {}).values())),
        }
    except Exception:
        return {}


def _dynamo_counter_diff(before: dict[str, int], after: dict[str, int]) -> dict[str, int]:
    if not after:
        return {}
    return {k: int(after.get(k, 0) - before.get(k, 0)) for k in after}


_LOGGED_INPUT_KEYS = (
    "dit_high_path", "dit_low_path", "svi_lora_tier", "num_inference_steps",
    "cfg_scale", "sigma_shift", "switch_boundary", "solver", "seed",
    "seed_multiplier", "fps", "interpolate_fps", "interpolate_method",
    "upscale_factor", "upscale_model", "upscale_quality", "num_clips",
    "frames_per_clip", "width", "height", "use_torch_compile",
    "torch_compile_mode", "blocks_to_swap", "teacache_thresh", "user_loras",
)


def _log_render_inputs(raw: dict[str, Any], validated: dict[str, Any]) -> None:
    """Dump resolved render inputs to stderr so the operator can confirm exactly
    what the UI delivered. ``keys_sent_by_ui`` lists which fields arrived in the
    raw RPC vs were filled by validation defaults — the ground truth for "did my
    setting reach the backend?"."""
    override = bool(raw.get("dit_high_path") or raw.get("dit_low_path"))
    loras = [
        {
            "file": Path(str(e.get("path", ""))).name,
            "high": e.get("weight_high", e.get("weight")),
            "low": e.get("weight_low", e.get("weight")),
        }
        for e in (validated.get("user_loras") or [])
    ]
    sent = sorted(k for k in _LOGGED_INPUT_KEYS if k in raw)
    lines = [
        f"[svi2-params] base_model={'OVERRIDE' if override else 'bundled'} "
        f"high={validated.get('dit_high_path') or 'bundled'} "
        f"low={validated.get('dit_low_path') or 'bundled'} "
        f"svi_lora_tier={validated.get('svi_lora_tier')}",
        f"[svi2-params] steps={validated.get('num_inference_steps')} "
        f"cfg={validated.get('cfg_scale')} shift={validated.get('sigma_shift')} "
        f"boundary={validated.get('switch_boundary')} solver={validated.get('solver')} "
        f"seed={validated.get('seed')} seed_mult={validated.get('seed_multiplier')}",
        f"[svi2-params] {validated.get('width')}x{validated.get('height')} "
        f"clips={validated.get('num_clips')} frames_per_clip={validated.get('frames_per_clip')} "
        f"fps={validated.get('fps')} interp_fps={validated.get('interpolate_fps')} "
        f"interp={validated.get('interpolate_method')}",
        f"[svi2-params] upscale={validated.get('upscale_factor')}x "
        f"model={validated.get('upscale_model')} q={validated.get('upscale_quality')} "
        f"compile={validated.get('use_torch_compile')} mode={validated.get('torch_compile_mode')} "
        f"blocks_to_swap={validated.get('blocks_to_swap')} teacache_thresh={validated.get('teacache_thresh')}",
        f"[svi2-params] user_loras={loras}",
        f"[svi2-params] keys_sent_by_ui={sent}",
    ]
    print("\n".join(lines), file=sys.stderr, flush=True)


def _summarize_lora_audit(audit: object) -> str:
    """One-line summary of which LoRAs actually wrapped DiT modules. wrapped=0
    means the LoRA did not match the model (wrong family) and had no effect."""
    if not isinstance(audit, dict) or not audit:
        return "none"
    if "wrapped_count" in audit:
        return f"svi(wrapped={audit.get('wrapped_count')},missing={audit.get('missing_count')})"
    parts: list[str] = []
    for key in ("svi", "distill"):
        sub = audit.get(key)
        if isinstance(sub, dict) and "wrapped_count" in sub:
            parts.append(f"{key}(wrapped={sub['wrapped_count']},missing={sub['missing_count']})")
    for user in audit.get("user", []) if isinstance(audit.get("user"), list) else []:
        name = Path(str(user.get("path", ""))).name
        if user.get("missing") is True:
            parts.append(f"user[{name}]=MISSING_FILE")
        else:
            parts.append(f"user[{name}](wrapped={user.get('wrapped_count')},missing={user.get('missing_count')})")
    return " ".join(parts) if parts else "none"


def _require(path: Path, what: str, models_dir: Path) -> Path:
    if not path.exists():
        raise FileNotFoundError(
            f"{what} not found at {path} (models_dir={models_dir}). "
            "Run the extension dependency installer, or set models_dir/SVI2_MODELS_DIR."
        )
    return path


def _build_text_encoder(params: dict[str, Any]) -> Any:
    from .text_encoder import TextEncoderWrapper

    models_dir = _models_dir_from(params)
    return TextEncoderWrapper(
        _require(_resolve(models_dir, "text-encoder"), "umt5-xxl text encoder", models_dir),
        tokenizer_path=_require(_resolve(models_dir, "tokenizer"), "umt5-xxl tokenizer", models_dir),
    )


def _build_vae(params: dict[str, Any]) -> Any:
    from .vae import VaeWrapper

    models_dir = _models_dir_from(params)
    return VaeWrapper(_require(_resolve(models_dir, "vae"), "Wan2.1 VAE", models_dir))


def _svi_lora_for_tier(models_dir: Path, tier: str) -> Optional[Path]:
    """Resolve the SVI2 LoRA file for a single-file expert. ``off`` → no LoRA."""
    if tier == "off":
        return None
    artifact = "svi-lora-low" if tier == "low" else "svi-lora-high"
    return _resolve(models_dir, artifact)


def _svi_loras_for_split(
    models_dir: Path, params: dict[str, Any]
) -> tuple[Optional[Path], Optional[Path]]:
    """Per-expert SVI2 LoRAs for a split (two-file) base: high→high, low→low.
    ``svi_lora_tier == "off"`` disables both — required for merged checkpoints
    (e.g. SmoothMix) that bake the behaviour into the weights and would be
    double-wrapped if the SVI pair were force-applied on top."""
    if _validate_svi_lora_tier(params) == "off":
        return None, None
    return _resolve(models_dir, "svi-lora-high"), _resolve(models_dir, "svi-lora-low")


def _user_lora_failures(audit: object) -> list[str]:
    """User LoRAs that genuinely did not apply: file not found, or 0 modules
    wrapped (incompatible). A PARTIAL match (some modules wrapped, others not —
    e.g. lightx2v's k_img/v_img keys on a model without image cross-attn) is
    normal and is NOT a failure. ``missing`` is ``True`` only for a missing file;
    the wrap audit's ``missing`` is a LIST of unmatched module names — hence the
    ``is True`` check so a non-empty list isn't misread as a missing file."""
    out: list[str] = []
    seen: set[str] = set()
    if not isinstance(audit, dict):
        return out
    for expert_label, lora_key in (("high", "high_lora"), ("low", "low_lora")):
        entry_audit = audit.get(lora_key)
        expert_user = entry_audit.get("user") if isinstance(entry_audit, dict) else None
        for entry in expert_user if isinstance(expert_user, list) else []:
            path = entry.get("path", "")
            if entry.get("missing") is True:
                msg = f"user LoRA not found ({expert_label}): {path}"
            elif entry.get("wrapped_count", 0) == 0:
                msg = f"user LoRA applied 0 modules ({expert_label}): {path} — not Wan2.2-compatible"
            else:
                continue
            if msg not in seen:
                seen.add(msg)
                out.append(msg)
    return out


def _tier_loras(user_loras: list[dict], tier: str) -> list[dict]:
    """Resolve the per-expert user-LoRA list: pick this tier's weight and drop
    LoRAs disabled for the tier (weight 0). _build_expert stays tier-agnostic."""
    key = "weight_high" if tier == "high" else "weight_low"
    out: list[dict] = []
    for entry in user_loras:
        weight = entry.get(key, entry.get("weight", 1.0))
        if weight <= 0.0:
            continue
        out.append({"path": entry["path"], "weight": weight})
    return out


def _user_loras_weights_differ(user_loras: list[dict]) -> bool:
    for entry in user_loras:
        base = entry.get("weight", 1.0)
        if entry.get("weight_high", base) != entry.get("weight_low", base):
            return True
    return False


def _build_experts(params: dict[str, Any]) -> tuple[ExpertModel, ExpertModel]:
    models_dir = _models_dir_from(params)

    dh = params.get("distill_lora_high")
    dl = params.get("distill_lora_low")
    distill_high = Path(dh) if dh else None
    distill_low = Path(dl) if dl else None

    dit_high, dit_low = resolve_dit_paths(params, models_dir, require_overrides_exist=True)
    _require(dit_high, "Wan2.2 high-noise DiT (fp8)", models_dir)
    _require(dit_low, "Wan2.2 low-noise DiT (fp8)", models_dir)

    user_loras = params.get("user_loras") or []
    high_loras = _tier_loras(user_loras, "high")
    low_loras = _tier_loras(user_loras, "low")

    # Single-file model: one SVI2 LoRA (operator's tier) wraps BOTH experts —
    # never fall through to the official high/low SVI split for a lone checkpoint.
    if dit_high == dit_low:
        svi_lora = _svi_lora_for_tier(models_dir, _validate_svi_lora_tier(params))
        # Share one 14B expert only when distill + per-tier weights all match;
        # differing per-tier state forces a second load (2× VRAM).
        if distill_high == distill_low and not _user_loras_weights_differ(user_loras):
            shared = _build_expert(dit_high, svi_lora, distill_high, high_loras)
            return shared, shared
        high = _build_expert(dit_high, svi_lora, distill_high, high_loras)
        low = _build_expert(dit_low, svi_lora, distill_low, low_loras)
        return high, low

    svi_high, svi_low = _svi_loras_for_split(models_dir, params)
    high = _build_expert(dit_high, svi_high, distill_high, high_loras)
    low = _build_expert(dit_low, svi_low, distill_low, low_loras)
    return high, low


def _build_t2v_expert(dit_path: Path) -> ExpertModel:
    """Build one Wan2.2-T2V-A14B expert: t2v config, fp8 weights, no SVI LoRA."""
    from .wan22 import WanModel
    from .fp8_loader import load_expert_meta

    fp8_audit: dict[str, object] = {}
    if dit_path.exists():
        dit, fp8_audit = load_expert_meta(
            _WAN22_T2V_A14B_CONFIG, dit_path, _wan_model_builder
        )
    else:
        dit = WanModel(**_WAN22_T2V_A14B_CONFIG)
    dit.requires_grad_(False)
    dit.eval()
    return ExpertModel(dit=dit, fp8_audit=fp8_audit, lora_audit={})


def _build_t2v_experts(params: dict[str, Any]) -> tuple[ExpertModel, ExpertModel]:
    models_dir = _models_dir_from(params)
    dit_high = _require(
        _resolve(models_dir, "dit-t2v-high"), "Wan2.2 T2V high-noise DiT (fp8)", models_dir
    )
    dit_low = _require(
        _resolve(models_dir, "dit-t2v-low"), "Wan2.2 T2V low-noise DiT (fp8)", models_dir
    )
    return _build_t2v_expert(dit_high), _build_t2v_expert(dit_low)


def _build_models(params: dict[str, Any]) -> RenderModels:
    high, low = _build_experts(params)
    audit = {"high_fp8": high.fp8_audit, "low_fp8": low.fp8_audit, "high_lora": high.lora_audit, "low_lora": low.lora_audit}
    return RenderModels(
        high=high,
        low=low,
        vae=_build_vae(params),
        text_encoder=_build_text_encoder(params),
        audit=audit,
    )


def _build_image_conditioning(
    anchor_lat: Any,
    prev_last_latent: Any,
    total_latent_frames: int,
    num_frames: int,
    height: int,
    width: int,
    num_motion_latent: int,
    image_cond_noise_scale: float = 0.0,
    image_cond_noise_bg_protect: float = 0.0,
    end_lat: Any = None,
    ref_pad_num: int = 0,
) -> Any:
    import torch
    from .svi_chain import build_conditioning_latents

    cond = build_conditioning_latents(
        anchor_lat,
        prev_last_latent,
        total_latent_frames=total_latent_frames,
        num_motion_latent=num_motion_latent,
        image_cond_noise_scale=image_cond_noise_scale,
        image_cond_noise_bg_protect=image_cond_noise_bg_protect,
        end_lat=end_lat,
        ref_pad_num=ref_pad_num,
    )

    lat_h = height // 8
    lat_w = width // 8
    msk = torch.ones(1, num_frames, lat_h, lat_w, dtype=cond.dtype, device=cond.device)
    msk[:, 1:] = 0
    # FLF2V: mark the last pixel frame as known conditioning too.
    if end_lat is not None:
        msk[:, -1] = 1.0
    msk = torch.concat([torch.repeat_interleave(msk[:, 0:1], repeats=4, dim=1), msk[:, 1:]], dim=1)
    msk = msk.view(1, msk.shape[1] // 4, 4, lat_h, lat_w)
    msk = msk.transpose(1, 2)[0]

    y = torch.concat([msk, cond], dim=0).unsqueeze(0)
    return y


def _eval_dit(
    dit: Any,
    latent: Any,
    ts: Any,
    context_posi: Any,
    context_nega: Any,
    y: Any,
    cfg_scale: float,
    tea_slot_base: int,
    tea_first: bool,
    tea_last: bool,
) -> Any:
    """Single model forward pass with CFG combine. Returns velocity (noise_pred)."""
    import torch

    with torch.no_grad():
        v_posi = dit(
            x=latent, timestep=ts, context=context_posi, clip_feature=None, y=y,
            tea_slot=tea_slot_base, tea_first=tea_first, tea_last=tea_last,
        )
        if cfg_scale != 1.0:
            # torch.compile reduce-overhead (CUDA graphs) reuses the DiT's static
            # output buffer on the next call, so clone v_posi before the v_nega
            # pass overwrites it — otherwise the CFG combine reads stale memory.
            v_posi = v_posi.clone()
            v_nega = dit(
                x=latent, timestep=ts, context=context_nega, clip_feature=None, y=y,
                tea_slot=tea_slot_base + 1, tea_first=tea_first, tea_last=tea_last,
            )
            v = v_nega + cfg_scale * (v_posi - v_nega)
        else:
            v = v_posi
    return torch.nan_to_num(v, nan=0.0, posinf=0.0, neginf=0.0)


def _ancestral_step_sigmas(
    sigma_from: float, sigma_to: float, eta: float = 1.0
) -> tuple[float, float]:
    """k-diffusion ancestral split (Euler a): descend deterministically to
    sigma_down, then re-noise by sigma_up so variance returns to sigma_to.
    Returns (sigma_to, 0.0) on the final step (sigma_to == 0)."""
    if eta <= 0.0 or sigma_to <= 0.0 or sigma_from <= 0.0:
        return sigma_to, 0.0
    inner = (sigma_to**2) * (sigma_from**2 - sigma_to**2) / (sigma_from**2)
    sigma_up = min(sigma_to, eta * (max(inner, 0.0) ** 0.5))
    sigma_down = max(sigma_to**2 - sigma_up**2, 0.0) ** 0.5
    return sigma_down, sigma_up


def _denoise_clip(
    models: RenderModels,
    latent: Any,
    y: Any,
    context_posi: Any,
    context_nega: Any,
    timesteps: Any,
    cfg_scale: float,
    expert_selector: Any,
    scheduler: Any,
    move_to: Optional[Callable[[str], None]] = None,
    on_step: Optional[Callable[[int, int, float], None]] = None,
    cancel_event: Optional[threading.Event] = None,
    solver: str = "euler",
) -> Any:
    # Heun is 2nd-order: two model evals per step, ~2× render time vs Euler.
    import time

    import torch

    from .vram import log_vram

    expert_selector.reset()
    active_tier = "high"
    if move_to is not None:
        move_to("high")

    use_heun = solver == "heun"
    num_steps = len(timesteps)
    for step_idx in range(num_steps):
        if cancel_event is not None and cancel_event.is_set():
            raise RenderCancelled()
        step_started = time.perf_counter()
        timestep = timesteps[step_idx]
        tier = expert_selector.select(float(timestep.item()))
        if tier != active_tier:
            active_tier = tier
            if move_to is not None:
                move_to(tier)

        dit = models.high.dit if active_tier == "high" else models.low.dit

        ts = timestep.unsqueeze(0).to(dtype=latent.dtype, device=latent.device)
        tea_first = step_idx == 0
        tea_last = step_idx == num_steps - 1

        sigma, sigma_next = scheduler.sigma_pair(step_idx)
        is_final_step = sigma_next == 0.0

        if use_heun and not is_final_step:
            # Heun (2nd-order trapezoidal): v1 at current latent/sigma,
            # Euler-predict x_pred, v2 at x_pred/sigma_next (re-routing the
            # expert by sigma_next in case it crosses the high/low boundary),
            # then average the two velocities for the final update.
            v1 = _eval_dit(
                dit, latent, ts, context_posi, context_nega, y,
                cfg_scale, tea_slot_base=0, tea_first=tea_first, tea_last=False,
            )
            dt = sigma_next - sigma
            x_pred = latent + v1 * dt

            ts_next = timestep.new_tensor([sigma_next * scheduler.num_train_timesteps]).to(
                dtype=latent.dtype, device=latent.device
            )
            tier2 = expert_selector.select(float(ts_next[0].item()))
            dit2 = models.high.dit if tier2 == "high" else models.low.dit
            if tier2 != active_tier and move_to is not None:
                move_to(tier2)

            v2 = _eval_dit(
                dit2, x_pred, ts_next, context_posi, context_nega, y,
                cfg_scale, tea_slot_base=0, tea_first=False, tea_last=tea_last,
            )
            v_avg = 0.5 * (v1 + v2)
            latent = latent + v_avg * dt
            latent = torch.nan_to_num(latent, nan=0.0, posinf=0.0, neginf=0.0)

            if latent.is_cuda:
                del v1, v2, v_avg, x_pred
                torch.cuda.empty_cache()
        elif solver == "euler_ancestral":
            # Deterministic descent to sigma_down (velocity = dx/dsigma), then
            # inject fresh noise scaled by sigma_up.
            v = _eval_dit(
                dit, latent, ts, context_posi, context_nega, y,
                cfg_scale, tea_slot_base=0, tea_first=tea_first, tea_last=tea_last,
            )
            sigma_down, sigma_up = _ancestral_step_sigmas(sigma, sigma_next)
            latent = latent + v * (sigma_down - sigma)
            if sigma_up > 0.0:
                latent = latent + torch.randn_like(latent) * sigma_up
            latent = torch.nan_to_num(latent, nan=0.0, posinf=0.0, neginf=0.0)

            if latent.is_cuda:
                del v
                torch.cuda.empty_cache()
        else:
            noise_pred = _eval_dit(
                dit, latent, ts, context_posi, context_nega, y,
                cfg_scale, tea_slot_base=0, tea_first=tea_first, tea_last=tea_last,
            )
            latent = scheduler.step(noise_pred, timestep, latent)
            latent = torch.nan_to_num(latent, nan=0.0, posinf=0.0, neginf=0.0)

            if latent.is_cuda:
                del noise_pred
                torch.cuda.empty_cache()

        log_vram(f"clip step {step_idx} tier={active_tier}")
        if on_step is not None:
            on_step(step_idx + 1, num_steps, time.perf_counter() - step_started)

    return latent


@dataclass
class T2vClip:
    frames: list
    last_latent: Any
    audit: dict[str, object]


def _t2v_block_swap_mover(
    high: ExpertModel, low: ExpertModel, blocks_to_swap: int, device: str
) -> Callable[[str], None]:
    import torch

    def _move_to(tier: str) -> None:
        if device != "cuda":
            return
        keep = high.dit if tier == "high" else low.dit
        drop = low.dit if tier == "high" else high.dit
        drop.to(torch.device("cpu"))
        drop.blocks_to_swap = 0
        keep.block_swap(
            blocks_to_swap,
            main_device=torch.device("cuda"),
            offload_device=torch.device("cpu"),
        )
        torch.cuda.empty_cache()

    return _move_to


def _generate_t2v_clip0(
    params: dict[str, Any],
    *,
    context_posi: Any,
    context_nega: Any,
    vae: Any,
    scheduler: Any,
    timesteps: Any,
    device: str,
    build_t2v_experts: Optional[Callable[[dict[str, Any]], tuple[ExpertModel, ExpertModel]]] = None,
    on_step: Optional[Callable[[int, int, float], None]] = None,
    cancel_event: Optional[threading.Event] = None,
) -> T2vClip:
    """Generate the text-to-video seed clip (clip 0) with the Wan2.2-T2V experts.

    Loads the t2v expert pair, denoises pure latent noise (no ``y`` conditioning
    — the t2v DiT has ``require_vae_embedding=False`` so text cross-attention
    alone drives it), decodes to frames, then frees the t2v experts before the
    caller loads the i2v chain. ``params['seed']`` fixes the initial noise for
    reproducibility. Returns the decoded frames and the raw last latents, which
    seed the chain's anchor and motion carry respectively.
    """
    import gc

    import torch

    from .expert_router import ExpertSelector
    from .vram import log_vram

    frames_per_clip: int = params["frames_per_clip"]
    height: int = params["height"]
    width: int = params["width"]
    total_latent_frames = (frames_per_clip - 1) // 4 + 1
    lat_h = height // 8
    lat_w = width // 8

    builder = build_t2v_experts or _build_t2v_experts
    high, low = builder(params)
    audit = {"t2v_high_fp8": high.fp8_audit, "t2v_low_fp8": low.fp8_audit}
    log_vram("t2v experts loaded")

    move_to = _t2v_block_swap_mover(high, low, params["blocks_to_swap"], device)
    t2v_models = RenderModels(high=high, low=low, vae=vae, text_encoder=None, audit=audit)

    seed = params.get("seed")
    seed = int(seed) if seed is not None else 0
    noise = torch.randn(
        1, _WAN22_T2V_A14B_CONFIG["out_dim"], total_latent_frames, lat_h, lat_w,
        generator=torch.Generator(device="cpu").manual_seed(seed),
    ).to(device=device, dtype=torch.bfloat16)

    try:
        latent = _denoise_clip(
            models=t2v_models,
            latent=noise,
            y=None,
            context_posi=context_posi,
            context_nega=context_nega,
            timesteps=timesteps,
            cfg_scale=params["cfg_scale"],
            expert_selector=ExpertSelector(boundary=params["switch_boundary"]),
            scheduler=scheduler,
            move_to=move_to,
            on_step=on_step,
            cancel_event=cancel_event,
            solver=params.get("solver", "euler"),
        )

        if device == "cuda":
            vae.to_cuda()
        frames = _to_pil_frames(vae.decode_latents(latent))
        if device == "cuda":
            vae.to_cpu()
            torch.cuda.empty_cache()
        last_latent = latent.detach()[0]
    finally:
        high = low = t2v_models = None
        gc.collect()
        if device == "cuda":
            torch.cuda.empty_cache()
    log_vram("t2v experts released")

    return T2vClip(frames=frames, last_latent=last_latent, audit=audit)


def _to_pinned_cpu(tensor: Any) -> Any:
    """Copy a (possibly CUDA) tensor to host RAM, pinning the destination.

    Pinned (page-locked) host memory makes the device->host copy faster and lets
    the later host->device move back use a non-blocking transfer. Byte-identical
    to ``tensor.to("cpu")``; falls back to a plain CPU copy when not on CUDA or
    when pinning is unavailable.
    """
    import torch

    if not isinstance(tensor, torch.Tensor):
        return tensor
    if tensor.device.type != "cuda":
        return tensor.detach().clone()
    try:
        host = torch.empty_like(tensor, device="cpu", pin_memory=True)
        host.copy_(tensor, non_blocking=True)
        torch.cuda.current_stream().synchronize()
        return host
    except (RuntimeError, TypeError):
        return tensor.to("cpu")


def _encode_prompts(
    text_encoder: Any,
    unique_prompts: list[str],
    negative_prompt: str,
    cfg_scale: float,
    *,
    batch_prompt_encode: bool,
    device: str,
) -> tuple[dict[str, Any], Any]:
    """Encode the unique prompts (+ negative) into CPU-resident context tensors.

    Default path: one forward pass per prompt (today's exact behavior). When
    ``batch_prompt_encode`` is on, all prompts (+ optional negative) run in a
    single batched UMT5 forward, then are sliced back per prompt — fewer kernel
    launches at the cost of altering the exact text-conditioning bytes.
    """
    if not batch_prompt_encode:
        ctx_cache = {p: _to_pinned_cpu(text_encoder.encode_text(p)) for p in unique_prompts}
        neg_context = (
            _to_pinned_cpu(text_encoder.encode_text(negative_prompt)) if cfg_scale != 1.0 else None
        )
        return ctx_cache, neg_context

    has_neg = cfg_scale != 1.0
    all_prompts = list(unique_prompts) + ([negative_prompt] if has_neg else [])
    batched = text_encoder.batch_encode_text(all_prompts)
    ctx_cache = {p: _to_pinned_cpu(batched[i : i + 1]) for i, p in enumerate(unique_prompts)}
    neg_context = _to_pinned_cpu(batched[-1:]) if has_neg else None
    return ctx_cache, neg_context


def _run_render(
    params: dict[str, Any],
    worker: Any = None,
    build_models: Optional[Callable[[dict[str, Any]], RenderModels]] = None,
    build_t2v_experts: Optional[Callable[[dict[str, Any]], tuple[ExpertModel, ExpertModel]]] = None,
    cancel_event: Optional[threading.Event] = None,
) -> dict[str, Any]:
    import gc

    import torch
    from PIL import Image

    from .expert_router import ExpertSelector
    from .wan22 import FlowMatchScheduler
    from .svi_chain import (
        RollingCrossfadeStitcher,
        adain_normalize_latent,
        reencode_motion_tail,
        ref_pad_for_clip,
    )
    from .resolution import fit_to_resolution
    from .resolution import resolution_warning as check_trained_resolution_struct
    from .ffmpeg_io import StreamingFrameWriter
    from .render_report import write_render_report
    from .vram import reset_peak, peak_allocated, log_vram

    from .attention_backend import set_attention_override
    import svi2_video_worker.attention_backend as _ab

    output_path = Path(params["output_path"])
    output_path.parent.mkdir(parents=True, exist_ok=True)

    device = params.get("device") or ("cuda" if torch.cuda.is_available() else "cpu")
    reset_peak()

    fast_parallel: bool = params["fast_parallel"]
    _apply_torch_threads(fast_parallel)

    set_attention_override(params.get("attention"))
    _ab._logged = False

    try:
        prebuilt = build_models(params) if build_models is not None else None

        num_clips: int = params["num_clips"]
        prompts: list[str] = params["prompts"]
        negative_prompt: str = params["negative_prompt"]
        frames_per_clip: int = params["frames_per_clip"]
        num_overlap_frame: int = params["num_overlap_frame"]
        num_motion_latent: int = params["num_motion_latent"]
        cfg_scale: float = params["cfg_scale"]
        fps: int = params["fps"]
        height: int = params["height"]
        width: int = params["width"]
        switch_boundary: float = params["switch_boundary"]
        pixel_re_encode: bool = params["pixel_re_encode"]
        num_motion_frame: int = params["num_motion_frame"]
        icn_scale: float = params["image_cond_noise_scale"]
        icn_schedule = params.get("image_cond_noise_schedule")
        icn_bg_protect: float = params["image_cond_noise_bg_protect"]
        ref_pad_num: int = params["ref_pad_num"]
        ref_pad_free_clips: int = params["ref_pad_free_clips"]
        ref_pad_schedule = params.get("ref_pad_schedule")

        resolution_warning = params.get("resolution_warning") or check_trained_resolution_struct(width, height)
        if resolution_warning:
            log_vram(f"WARN off-distribution resolution: {resolution_warning['message']}")

        generate_seed_clip = needs_seed_clip(params)
        if not generate_seed_clip and not params.get("ref_image_path"):
            raise ValueError("ref_image_path is required when no seed clip is generated")

        scheduler = FlowMatchScheduler(template="Wan")
        scheduler.set_timesteps(
            num_inference_steps=params["num_inference_steps"], shift=params["sigma_shift"]
        )
        if params.get("fixed_sigmas"):
            scheduler.set_fixed_sigmas(params["fixed_sigmas"])
        timesteps = scheduler.timesteps

        total_latent_frames = (frames_per_clip - 1) // 4 + 1
        lat_h = height // 8
        lat_w = width // 8

        expert_selector = ExpertSelector(boundary=switch_boundary)
        blocks_to_swap: int = params["blocks_to_swap"]

        _notify(worker, "svi2.video.progress", {"fraction": 0.01, "stage": "loading_text_encoder"})
        with _ProgressHeartbeat(worker, "loading_text_encoder", 0.01):
            text_encoder = (
                prebuilt.text_encoder if prebuilt is not None else _build_text_encoder(params)
            )
            if device == "cuda":
                text_encoder.to_cuda()
        _notify(worker, "svi2.video.progress", {"fraction": 0.03, "stage": "encoding_prompts"})
        unique_prompts = list(dict.fromkeys(prompts[i % len(prompts)] for i in range(num_clips)))
        ctx_cache, neg_context = _encode_prompts(
            text_encoder,
            unique_prompts,
            negative_prompt,
            cfg_scale,
            batch_prompt_encode=params["batch_prompt_encode"],
            device=device,
        )
        if device == "cuda":
            text_encoder.to_cpu()
            torch.cuda.empty_cache()
        if prebuilt is None:
            del text_encoder
            gc.collect()
        log_vram("stage1 done: prompts encoded, text encoder released")

        vae = prebuilt.vae if prebuilt is not None else _build_vae(params)
        writer = StreamingFrameWriter()
        stitcher = RollingCrossfadeStitcher(num_overlap_frame, mode=params["stitch_mode"])
        t2v_audit: dict[str, object] = {}
        seed_clip_frames: list = []
        seed_clip_last_latent: Any = None

        # Text-to-video seed: generate clip 0 with the Wan2.2-T2V experts (freed
        # before the i2v experts load), then seed the chain from its last frame.
        if generate_seed_clip:
            _notify(worker, "svi2.video.progress", {"fraction": 0.02, "stage": "loading_t2v_experts"})
            # Heartbeat covers the silent T2V-expert load inside _generate_t2v_clip0;
            # the first denoise step (on_step) means the load is done, so stop it
            t2v_load_hb = _ProgressHeartbeat(worker, "loading_t2v_experts", 0.02)
            t2v_load_hb.start()
            first_prompt = prompts[0]
            seed_ctx_posi = ctx_cache[first_prompt].to(device)
            seed_ctx_nega = neg_context.to(device) if neg_context is not None else seed_ctx_posi

            def _t2v_seed_on_step(step: int, num_steps: int, seconds: float) -> None:
                t2v_load_hb.stop()
                _notify(
                    worker,
                    "svi2.video.clip.step",
                    {
                        "clip_index": 0,
                        "step": step,
                        "total_steps": num_steps,
                        "seconds_per_step": round(seconds, 2),
                    },
                )
                frac = 0.02 + 0.03 * (step / max(num_steps, 1))
                _notify(worker, "svi2.video.progress", {"fraction": round(frac, 4), "stage": "t2v_seed_clip"})

            try:
                t2v_clip = _generate_t2v_clip0(
                    params,
                    context_posi=seed_ctx_posi,
                    context_nega=seed_ctx_nega,
                    vae=vae,
                    scheduler=scheduler,
                    timesteps=timesteps,
                    device=device,
                    build_t2v_experts=build_t2v_experts,
                    on_step=_t2v_seed_on_step,
                    cancel_event=cancel_event,
                )
            finally:
                t2v_load_hb.stop()
            seed_clip_frames = t2v_clip.frames
            seed_clip_last_latent = t2v_clip.last_latent
            t2v_audit = t2v_clip.audit
            ref_image = fit_to_resolution(seed_clip_frames[-1], width, height)
            writer.write_many(stitcher.push(seed_clip_frames))
            del seed_clip_frames
            _notify(worker, "svi2.video.clip.completed", {"clip_index": 0, "num_clips": num_clips})
        else:
            ref_image = fit_to_resolution(
                Image.open(str(params["ref_image_path"])).convert("RGB"), width, height
            )

        # Stage 2 — anchor/end keyframes through the (small) VAE before the
        # experts exist, so the encode never overlaps the 28 GiB expert load.
        _notify(worker, "svi2.video.progress", {"fraction": 0.05, "stage": "encoding_anchors"})
        vae.to_cuda() if device == "cuda" else vae.to_cpu()
        anchor_lat = vae.encode_image(ref_image)[0]
        end_lat = None
        if params.get("last_image_path"):
            end_image = fit_to_resolution(Image.open(params["last_image_path"]).convert("RGB"), width, height)
            end_lat = vae.encode_image(end_image)[0]
        if device == "cuda":
            vae.to_cpu()
            torch.cuda.empty_cache()
        log_vram("stage2 done: anchors encoded")

        # Stage 3 — the two fp8 experts, the only stage that needs big RAM.
        _bm_label, _bm_override = base_model_label(params, _models_dir_from(params))
        _notify(
            worker,
            "svi2.video.progress",
            {
                "fraction": 0.06,
                "stage": "loading_experts",
                "detail": f"Loading base model: {_bm_label}…",
            },
        )
        if prebuilt is not None:
            high, low = prebuilt.high, prebuilt.low
            audit = prebuilt.audit
        else:
            with _ProgressHeartbeat(worker, "loading_experts", 0.06):
                high, low = _build_experts(params)
            audit = {
                "high_fp8": high.fp8_audit,
                "low_fp8": low.fp8_audit,
                "high_lora": high.lora_audit,
                "low_lora": low.lora_audit,
            }
        models = RenderModels(high=high, low=low, vae=vae, text_encoder=None, audit=audit)
        shared_note = " (shared single-file expert)" if high is low else ""
        print(
            f"[svi2-lora] high: {_summarize_lora_audit(audit.get('high_lora'))}\n"
            f"[svi2-lora] low: {_summarize_lora_audit(audit.get('low_lora'))}{shared_note}",
            file=sys.stderr,
            flush=True,
        )
        lora_failures = _user_lora_failures(audit)
        if lora_failures:
            raise ValueError(
                "user LoRA(s) could not be applied — aborting before render: "
                + "; ".join(lora_failures)
            )
        log_vram("stage3 done: experts loaded")

        solver: str = params.get("solver", "euler")
        teacache_thresh: float = params["teacache_thresh"]
        teacache_disabled_by_solver = solver == "heun" and teacache_thresh > 0.0
        teacache_on = teacache_thresh > 0.0 and not teacache_disabled_by_solver
        models.high.dit.configure_tea_cache(teacache_on, teacache_thresh)
        models.low.dit.configure_tea_cache(teacache_on, teacache_thresh)

        compile_audit: dict[str, object] = {
            "requested": bool(params["use_torch_compile"]),
            "blocked_by_block_swap": bool(params["use_torch_compile"] and blocks_to_swap != 0),
            "engaged": False,
            "mode": None,
            "experts_compiled": 0,
        }
        compile_stats_before: dict[str, int] = {}
        if params["use_torch_compile"] and blocks_to_swap == 0:
            compile_mode = params["torch_compile_mode"]
            try:
                import torch._dynamo as _torch_dynamo

                # Backend/compile failure degrades to eager per-graph instead of
                # raising, so a bad install never crashes a long render.
                _torch_dynamo.config.suppress_errors = True
            except Exception:
                pass
            try:
                shared_expert = models.high.dit is models.low.dit
                compile_kwargs = {} if compile_mode == "default" else {"mode": compile_mode}
                compiled_high = torch.compile(models.high.dit, **compile_kwargs)
                models.high.dit = compiled_high
                # Keep a shared single-file expert ONE object so the `is`
                # identity (and the resident no-swap path in _move_to) still holds
                # after compile — else the shared weights get offloaded to CPU.
                if shared_expert:
                    models.low.dit = compiled_high
                    experts_compiled = 1
                else:
                    models.low.dit = torch.compile(models.low.dit, **compile_kwargs)
                    experts_compiled = 2
                compile_audit.update(
                    engaged=True, mode=compile_mode, experts_compiled=experts_compiled
                )
                compile_stats_before = _dynamo_counter_snapshot()
                log_vram(
                    f"torch.compile enabled mode={compile_mode} "
                    f"experts={experts_compiled} (blocks_to_swap=0)"
                )
            except Exception as exc:
                compile_audit["error"] = str(exc)
                print(f"[compile] torch.compile failed, using eager: {exc}", file=sys.stderr, flush=True)

        mst, msh, msw = params["motion_scale_t"], params["motion_scale_h"], params["motion_scale_w"]
        motion_schedule = params.get("motion_scale_schedule")  # per-clip temporal ramp
        if not motion_schedule and (mst, msh, msw) != (1.0, 1.0, 1.0):
            models.high.dit.configure_motion_scale(mst, msh, msw)
            models.low.dit.configure_motion_scale(mst, msh, msw)

        def _move_to(tier: str) -> None:
            if device != "cuda":
                return
            # Single shared expert (high is low): keep it resident, skip the
            # CPU round-trip the two-expert swap would otherwise do each switch.
            if models.high.dit is models.low.dit:
                models.high.dit.block_swap(
                    blocks_to_swap,
                    main_device=torch.device("cuda"),
                    offload_device=torch.device("cpu"),
                )
                return
            keep = models.high.dit if tier == "high" else models.low.dit
            drop = models.low.dit if tier == "high" else models.high.dit
            drop.to(torch.device("cpu"))
            drop.blocks_to_swap = 0
            keep.block_swap(
                blocks_to_swap,
                main_device=torch.device("cuda"),
                offload_device=torch.device("cpu"),
            )
            torch.cuda.empty_cache()

        # The t2v seed clip is global index 0 (its latents seed the motion carry and
        # AdaIN reference), so the i2v chain resumes at 1; pure i2v starts at 0.
        chain_start = 1 if generate_seed_clip else 0
        prev_last_latent: Any = seed_clip_last_latent if generate_seed_clip else None
        adain_reference: Any = seed_clip_last_latent if generate_seed_clip else None
        adain_factor: float = params["adain_factor"]

        denoise_span = 0.90 / max(num_clips, 1)

        try:
            for clip_idx in range(chain_start, num_clips):
                if cancel_event is not None and cancel_event.is_set():
                    raise RenderCancelled()
                log_vram(f"clip {clip_idx} start")
                _notify(
                    worker,
                    "svi2.video.clip.started",
                    {"clip_index": clip_idx, "num_clips": num_clips},
                )
                if teacache_on:
                    models.high.dit.reset_tea_cache()
                    models.low.dit.reset_tea_cache()
                if motion_schedule:
                    ms = float(motion_schedule[min(clip_idx, len(motion_schedule) - 1)])
                    models.high.dit.configure_motion_scale(ms, msh, msw)
                    models.low.dit.configure_motion_scale(ms, msh, msw)
                    log_vram(f"clip {clip_idx} motion_scale_t={ms}")
                prompt = prompts[clip_idx % len(prompts)]
                seed = params["seed_multiplier"] * clip_idx
                torch.manual_seed(seed)

                context_posi = ctx_cache[prompt].to(device)
                context_nega = neg_context.to(device) if neg_context is not None else context_posi

                noise = torch.randn(
                    1, _WAN22_A14B_CONFIG["out_dim"], total_latent_frames, lat_h, lat_w,
                    generator=torch.Generator(device="cpu").manual_seed(seed),
                ).to(device=device, dtype=torch.bfloat16)
                latent = noise

                clip_icn = (
                    float(icn_schedule[min(clip_idx, len(icn_schedule) - 1)])
                    if icn_schedule
                    else icn_scale
                )
                if clip_icn > 0.0:
                    log_vram(f"clip {clip_idx} image_cond_noise_scale={clip_icn}")
                clip_ref_pad = ref_pad_for_clip(
                    clip_idx, num_clips, ref_pad_num, ref_pad_free_clips, ref_pad_schedule
                )
                if clip_ref_pad != 0:
                    log_vram(f"clip {clip_idx} ref_pad_num={clip_ref_pad}")
                y = _build_image_conditioning(
                    anchor_lat.to(device),
                    prev_last_latent,
                    total_latent_frames=total_latent_frames,
                    num_frames=frames_per_clip,
                    height=height,
                    width=width,
                    num_motion_latent=num_motion_latent,
                    image_cond_noise_scale=clip_icn,
                    image_cond_noise_bg_protect=icn_bg_protect,
                    end_lat=end_lat.to(device) if end_lat is not None else None,
                    ref_pad_num=clip_ref_pad,
                )

                def _on_step(
                    step: int, total_steps: int, seconds: float, _clip_idx: int = clip_idx
                ) -> None:
                    _notify(
                        worker,
                        "svi2.video.clip.step",
                        {
                            "clip_index": _clip_idx,
                            "step": step,
                            "total_steps": total_steps,
                            "seconds_per_step": round(seconds, 2),
                        },
                    )
                    fraction = 0.07 + denoise_span * (_clip_idx + step / max(total_steps, 1))
                    _notify(
                        worker,
                        "svi2.video.progress",
                        {"fraction": round(min(fraction, 0.97), 4), "stage": "denoising"},
                    )

                latent = _denoise_clip(
                    models=models,
                    latent=latent,
                    y=y,
                    context_posi=context_posi,
                    context_nega=context_nega,
                    timesteps=timesteps,
                    cfg_scale=cfg_scale,
                    expert_selector=expert_selector,
                    scheduler=scheduler,
                    move_to=_move_to,
                    on_step=_on_step,
                    cancel_event=cancel_event,
                    solver=solver,
                )

                # Cap colour/exposure drift down the continuation chain: match each
                # later clip's per-channel latent stats toward clip-0 (AdaIN). Off at 0.
                if clip_idx == chain_start and not generate_seed_clip:
                    adain_reference = latent.detach()[0]
                elif adain_factor > 0.0 and adain_reference is not None:
                    adjusted = adain_normalize_latent(latent[0], adain_reference, adain_factor)
                    latent = adjusted.unsqueeze(0)
                    log_vram(f"clip {clip_idx} adain factor={adain_factor}")

                prev_last_latent = latent.detach()[0]

                log_vram(f"clip {clip_idx} denoise done")
                if device == "cuda":
                    models.vae.to_cuda()
                frames = models.vae.decode_latents(latent)
                pil_frames = _to_pil_frames(frames)

                is_last_clip = clip_idx == num_clips - 1
                if pixel_re_encode and num_motion_frame > 0 and not is_last_clip:
                    reenc = reencode_motion_tail(models.vae, pil_frames, num_motion_frame)
                    prev_last_latent = reenc.to(device=device, dtype=prev_last_latent.dtype)
                    log_vram(f"clip {clip_idx} pixel re-encode tail={num_motion_frame}")

                if device == "cuda":
                    models.vae.to_cpu()
                    torch.cuda.empty_cache()
                log_vram(f"clip {clip_idx} vae decode done")

                # Stream finalized frames to disk as each clip completes (rolling
                # crossfade holds only the overlap tail) so length is unbounded by RAM.
                writer.write_many(stitcher.push(pil_frames))
                del pil_frames, frames
                _notify(
                    worker,
                    "svi2.video.clip.completed",
                    {"clip_index": clip_idx, "num_clips": num_clips},
                )
                if device == "cuda":
                    _notify(
                        worker,
                        "runtime.memory_stats",
                        {
                            "vram_peak_gib": round(peak_allocated() / 1024**3, 2),
                            "vram_used_gib": round(torch.cuda.memory_allocated() / 1024**3, 2),
                        },
                    )

            _notify(worker, "svi2.video.progress", {"fraction": 0.97, "stage": "stitching"})
            writer.write_many(stitcher.flush())
            total_frames = writer.count
            video_path = writer.finalize(
                output_path, fps=fps, ffmpeg_threads=THREADS if fast_parallel else None
            )
        finally:
            models = high = low = vae = None
            gc.collect()
            if device == "cuda":
                torch.cuda.empty_cache()
            log_vram("experts released post-render")

        if compile_audit.get("engaged"):
            compile_audit["dynamo"] = _dynamo_counter_diff(
                compile_stats_before, _dynamo_counter_snapshot()
            )

        # Optional super-resolution BEFORE interpolation — fewer frames to
        # upscale at native fps, and RIFE then interpolates at the final size.
        # Engine per upscale_model: Maxine (Win/RTX) → DRCT-L → Real-ESRGAN.
        upscale_factor: int = params["upscale_factor"]
        base_path = video_path
        video_path, upscale_engine = _run_upscale_chain(
            worker, params, video_path, output_path, fps, log_vram
        )

        # Optional frame interpolation: native render stays at fps; this adds frames
        # to reach interpolate_fps (smooth high-fps, no speed-up). Off when 0/<=fps.
        interpolate_fps: int = params["interpolate_fps"]
        interp_engine = ""
        if interpolate_fps and interpolate_fps > fps:
            _notify(worker, "svi2.video.progress", {"fraction": 0.98, "stage": "interpolating"})
            from .interpolate import interpolate_video, resolve_rife_method

            interp_engine = resolve_rife_method(
                params["interpolate_method"], device=device, rife_bin=params.get("rife_bin")
            )
            interp_out = output_path.parent / f"{output_path.stem}_{interpolate_fps}fps{output_path.suffix}"
            video_path = interpolate_video(
                video_path,
                interp_out,
                src_fps=fps,
                target_fps=interpolate_fps,
                method=interp_engine,
                rife_bin=params.get("rife_bin"),
                rife_model=params.get("rife_model"),
                rife_weights=params.get("rife_weights"),
                device=device,
                src_frame_count=total_frames,
                ffmpeg_threads=THREADS if fast_parallel else None,
                fast_parallel=fast_parallel,
            )
            log_vram(f"interpolated {fps}->{interpolate_fps}fps via {interp_engine}")

        _rpt_models_dir = _models_dir_from(params)
        _rpt_dit_high, _rpt_dit_low = resolve_dit_paths(params, _rpt_models_dir)
        report_data = {
            "output_path": str(video_path),
            "base_output_path": str(base_path),
            "mode": params["mode"],
            "seed_origin": seed_origin(params),
            "seed_value": params.get("seed"),
            "interpolated_fps": interpolate_fps if interpolate_fps > fps else 0,
            "interpolate_method": params["interpolate_method"],
            "interpolate_engine": interp_engine,
            "upscale_factor": upscale_factor if upscale_engine else 0,
            "upscale_quality": params["upscale_quality"],
            "upscale_model": params["upscale_model"],
            "upscale_engine": upscale_engine,
            "num_clips": num_clips,
            "frames": total_frames,
            "height": height,
            "width": width,
            "fps": fps,
            "peak_vram_bytes": peak_allocated(),
            "model_audit": {**audit, **t2v_audit} if t2v_audit else audit,
            "stitch_mode": params["stitch_mode"],
            "base_model_high": str(_rpt_dit_high),
            "base_model_low": str(_rpt_dit_low),
            "base_model_override": bool(params.get("dit_high_path") or params.get("dit_low_path")),
            "svi_lora_tier": params["svi_lora_tier"],
            "torch_compile": compile_audit,
            "solver": solver,
            "teacache_disabled_by_solver": teacache_disabled_by_solver,
            "pixel_re_encode": pixel_re_encode,
            "resolution_warning": resolution_warning,
        }
        write_render_report(output_path.parent, report_data)

        return {"status": "ok", "output_path": str(video_path)}
    finally:
        set_attention_override(None)


def _to_pil_frames(frames: Any) -> list:
    from PIL import Image

    result = []
    for frame in frames:
        if hasattr(frame, "save"):
            result.append(frame)
            continue
        arr = frame.detach().cpu().numpy()
        result.append(Image.fromarray(arr.astype("uint8")))
    return result
