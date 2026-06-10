from __future__ import annotations

import asyncio
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Optional

_ARTIFACT_FILENAMES: dict[str, str] = {
    "dit-high-fp8": "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors",
    "dit-low-fp8": "I2V/Wan2_2-I2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors",
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
    "sd-cli": "sd-cli",
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

_NEGATIVE_PROMPT = (
    "色调艳丽，过曝，静态，细节模糊不清，字幕，风格，作品，画作，画面，静止，整体发灰，"
    "最差质量，低质量，JPEG压缩残留，丑陋的，残缺的，多余的手指，画得不好的手部，画得不好的脸部，"
    "畸形的，毁容的，形态畸形的肢体，手指融合，静止不动的画面，杂乱的背景，三条腿，背景人很多，倒着走"
)

_SWITCH_BOUNDARY = 0.9
_NUM_INFERENCE_STEPS = 50
_SIGMA_SHIFT = 5.0


def validate_render_params(params: dict[str, Any]) -> dict[str, Any]:
    ref = params.get("ref_image_path")
    if not ref:
        raise ValueError("ref_image_path is required")

    prompts = params.get("prompts")
    if not prompts:
        raise ValueError("prompts must be a non-empty list")

    num_clips = int(params.get("num_clips", len(prompts)))

    frames_per_clip = int(params.get("frames_per_clip", 81))
    if (frames_per_clip - 1) % 4 != 0:
        raise ValueError(f"frames_per_clip must be 4n+1 (49, 65, 81); got {frames_per_clip}")

    num_motion_latent = int(params.get("num_motion_latent", 1))
    # SVI 2.0 Pro carries the RAW previous-clip latent as the motion handoff and
    # explicitly forbids re-using the decoded last frame. Decode->re-encode is the
    # pre-Pro behaviour: it injects VAE-roundtrip error into the conditioning every
    # clip — the exact cross-clip error the LoRA was NOT trained to correct — which
    # compounds into identity drift. Default off (canonical); opt in to A/B only.
    pixel_re_encode = bool(params.get("pixel_re_encode", False))
    num_motion_frame = int(params.get("num_motion_frame", 4))
    # Wan VAE temporal compression: N pixel frames -> 1 + (N-1)//4 latent frames.
    # The re-encoded tail feeds build_conditioning_latents, which assigns
    # num_motion_latent frames into the conditioning slot. If the re-encode
    # yields fewer latent frames than num_motion_latent the assignment is
    # ill-shaped, so require enough pixel frames up front.
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
    return {
        "ref_image_path": str(ref),
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
        "interpolate_fps": int(params.get("interpolate_fps", 0)),
        "interpolate_method": str(params.get("interpolate_method", "rife")),
        "rife_bin": params.get("rife_bin"),
        "rife_model": params.get("rife_model"),
        "rife_weights": params.get("rife_weights"),
        "blocks_to_swap": int(params.get("blocks_to_swap", 40)),
        "teacache_thresh": float(params.get("teacache_thresh", 0.0)),
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
        "dit_high_path": params.get("dit_high_path"),
        "dit_low_path": params.get("dit_low_path"),
        "fixed_sigmas": params.get("fixed_sigmas"),
        "seed_multiplier": int(params.get("seed_multiplier", 42)),
        "models_dir": params.get("models_dir"),
        "output_path": params.get("output_path", "out.mp4"),
        "device": params.get("device"),
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


def register_svi2_handlers(worker: Any) -> None:
    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        validated = validate_render_params(params or {})
        if not validated.get("models_dir"):
            validated["models_dir"] = str(resolve_models_dir())
        return await asyncio.to_thread(_run_render, validated, worker)

    async def _render_cancel(_params: Any) -> dict[str, Any]:
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
    dit_path: Path, lora_path: Optional[Path], distill_lora_path: Optional[Path] = None
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

    # Stack a distill (Lightning/lightx2v) LoRA on top — re-wrapping nests
    # AdditiveLoraLinear so deltas sum: W·x + svi_delta + distill_delta.
    if distill_lora_path is not None and distill_lora_path.exists():
        dpairs = load_lora_pairs(distill_lora_path)
        distill_audit = wrap_module_with_lora(dit, dpairs)
        lora_audit = {"svi": lora_audit, "distill": distill_audit}

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


def _build_experts(params: dict[str, Any]) -> tuple[ExpertModel, ExpertModel]:
    models_dir = _models_dir_from(params)

    dh = params.get("distill_lora_high")
    dl = params.get("distill_lora_low")
    distill_high = Path(dh) if dh else None
    distill_low = Path(dl) if dl else None

    dit_high, dit_low = resolve_dit_paths(params, models_dir, require_overrides_exist=True)
    _require(dit_high, "Wan2.2 high-noise DiT (fp8)", models_dir)
    _require(dit_low, "Wan2.2 low-noise DiT (fp8)", models_dir)

    high = _build_expert(dit_high, _resolve(models_dir, "svi-lora-high"), distill_high)
    low = _build_expert(dit_low, _resolve(models_dir, "svi-lora-low"), distill_low)
    return high, low


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
) -> Any:
    import time

    import torch

    from .vram import log_vram

    expert_selector.reset()
    active_tier = "high"
    if move_to is not None:
        move_to("high")

    num_steps = len(timesteps)
    for step_idx in range(num_steps):
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

        with torch.no_grad():
            noise_pred_posi = dit(
                x=latent, timestep=ts, context=context_posi, clip_feature=None, y=y,
                tea_slot=0, tea_first=tea_first, tea_last=tea_last,
            )
            if cfg_scale != 1.0:
                noise_pred_nega = dit(
                    x=latent, timestep=ts, context=context_nega, clip_feature=None, y=y,
                    tea_slot=1, tea_first=tea_first, tea_last=tea_last,
                )
                noise_pred = noise_pred_nega + cfg_scale * (noise_pred_posi - noise_pred_nega)
            else:
                noise_pred = noise_pred_posi

        noise_pred = torch.nan_to_num(noise_pred, nan=0.0, posinf=0.0, neginf=0.0)
        latent = scheduler.step(noise_pred, timestep, latent)
        latent = torch.nan_to_num(latent, nan=0.0, posinf=0.0, neginf=0.0)

        if latent.is_cuda:
            del noise_pred, noise_pred_posi
            if cfg_scale != 1.0:
                del noise_pred_nega
            torch.cuda.empty_cache()
        log_vram(f"clip step {step_idx} tier={active_tier}")
        if on_step is not None:
            on_step(step_idx + 1, num_steps, time.perf_counter() - step_started)

    return latent


def _run_render(
    params: dict[str, Any],
    worker: Any = None,
    build_models: Optional[Callable[[dict[str, Any]], RenderModels]] = None,
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

    output_path = Path(params["output_path"])
    output_path.parent.mkdir(parents=True, exist_ok=True)

    device = params.get("device") or ("cuda" if torch.cuda.is_available() else "cpu")
    reset_peak()

    # Staged loading keeps peak host RAM at max(stage) instead of sum(stages):
    # encode prompts → FREE the 11 GiB text encoder → encode anchors with the
    # small VAE → only then load the two 14 GiB fp8 experts. A prebuilt
    # RenderModels (tests / callers) short-circuits the staging.
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

    ref_image = fit_to_resolution(Image.open(params["ref_image_path"]).convert("RGB"), width, height)

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

    # Stage 1 — encode every prompt once, then release the text encoder
    # entirely (UMT5-xxl is the single largest host-RAM tenant after the
    # experts). Contexts are tiny (1 x L x 4096) and cached on CPU.
    _notify(worker, "svi2.video.progress", {"fraction": 0.01, "stage": "loading_text_encoder"})
    text_encoder = prebuilt.text_encoder if prebuilt is not None else _build_text_encoder(params)
    if device == "cuda":
        text_encoder.to_cuda()
    _notify(worker, "svi2.video.progress", {"fraction": 0.03, "stage": "encoding_prompts"})
    unique_prompts = list(dict.fromkeys(prompts[i % len(prompts)] for i in range(num_clips)))
    ctx_cache = {p: text_encoder.encode_text(p).to("cpu") for p in unique_prompts}
    neg_context = (
        text_encoder.encode_text(negative_prompt).to("cpu") if cfg_scale != 1.0 else None
    )
    if device == "cuda":
        text_encoder.to_cpu()
        torch.cuda.empty_cache()
    if prebuilt is None:
        del text_encoder
        gc.collect()
    log_vram("stage1 done: prompts encoded, text encoder released")

    # Stage 2 — anchor/end keyframes through the (small) VAE before the
    # experts exist, so the encode never overlaps the 28 GiB expert load.
    _notify(worker, "svi2.video.progress", {"fraction": 0.05, "stage": "encoding_anchors"})
    vae = prebuilt.vae if prebuilt is not None else _build_vae(params)
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
    _notify(worker, "svi2.video.progress", {"fraction": 0.06, "stage": "loading_experts"})
    if prebuilt is not None:
        high, low = prebuilt.high, prebuilt.low
        audit = prebuilt.audit
    else:
        high, low = _build_experts(params)
        audit = {
            "high_fp8": high.fp8_audit,
            "low_fp8": low.fp8_audit,
            "high_lora": high.lora_audit,
            "low_lora": low.lora_audit,
        }
    models = RenderModels(high=high, low=low, vae=vae, text_encoder=None, audit=audit)
    log_vram("stage3 done: experts loaded")

    teacache_thresh: float = params["teacache_thresh"]
    teacache_on = teacache_thresh > 0.0
    models.high.dit.configure_tea_cache(teacache_on, teacache_thresh)
    models.low.dit.configure_tea_cache(teacache_on, teacache_thresh)

    mst, msh, msw = params["motion_scale_t"], params["motion_scale_h"], params["motion_scale_w"]
    motion_schedule = params.get("motion_scale_schedule")  # per-clip temporal ramp
    if not motion_schedule and (mst, msh, msw) != (1.0, 1.0, 1.0):
        models.high.dit.configure_motion_scale(mst, msh, msw)
        models.low.dit.configure_motion_scale(mst, msh, msw)

    def _move_to(tier: str) -> None:
        if device != "cuda":
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

    prev_last_latent: Any = None
    adain_reference: Any = None
    adain_factor: float = params["adain_factor"]
    writer = StreamingFrameWriter()
    stitcher = RollingCrossfadeStitcher(num_overlap_frame, mode=params["stitch_mode"])

    denoise_span = 0.90 / max(num_clips, 1)

    for clip_idx in range(num_clips):
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
        )

        # Cap colour/exposure drift down the continuation chain: match each
        # later clip's per-channel latent stats toward clip-0 (AdaIN). Off at 0.
        if clip_idx == 0:
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

        # Pixel re-encode continuation: replace the raw denoised latent tail with
        # a VAE round-trip of the last num_motion_frame output frames so the next
        # clip conditions on an on-manifold latent (caps escalating drift). Skip
        # on the final clip — its tail is never consumed.
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
    video_path = writer.finalize(output_path, fps=fps)

    # Denoise + decode are done — drop the 28 GiB of expert weights (and the
    # VAE) before interpolation, which only needs the tiny RIFE net.
    del models, high, low, vae
    gc.collect()
    if device == "cuda":
        torch.cuda.empty_cache()
    log_vram("experts released post-render")

    # Optional Maxine RTX super-resolution BEFORE interpolation — fewer frames
    # to upscale at native fps, and RIFE then interpolates at the final size.
    upscale_factor: int = params["upscale_factor"]
    upscale_engine = ""
    base_path = video_path
    if upscale_factor > 0:
        from .rtx_upscale import try_rtx_upscale

        _notify(worker, "svi2.video.progress", {"fraction": 0.975, "stage": "upscaling"})
        up_out = output_path.parent / (
            f"{output_path.stem}_x{upscale_factor}{output_path.suffix}"
        )
        upscaled = try_rtx_upscale(
            video_path,
            up_out,
            upscale_factor,
            quality=params["upscale_quality"],
            fps=fps,
            logger=getattr(worker, "logger", None),
        )
        if upscaled:
            video_path = up_out
            upscale_engine = "maxine_vsr"
            log_vram(f"rtx upscale x{upscale_factor} ({params['upscale_quality']})")
        else:
            log_vram("rtx upscale unavailable — keeping native resolution")

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
        )
        log_vram(f"interpolated {fps}->{interpolate_fps}fps via {interp_engine}")

    report_data = {
        "output_path": str(video_path),
        "base_output_path": str(base_path),
        "interpolated_fps": interpolate_fps if interpolate_fps > fps else 0,
        "interpolate_method": params["interpolate_method"],
        "interpolate_engine": interp_engine,
        "upscale_factor": upscale_factor if upscale_engine else 0,
        "upscale_quality": params["upscale_quality"],
        "upscale_engine": upscale_engine,
        "num_clips": num_clips,
        "frames": total_frames,
        "height": height,
        "width": width,
        "fps": fps,
        "peak_vram_bytes": peak_allocated(),
        "model_audit": audit,
        "stitch_mode": params["stitch_mode"],
        "pixel_re_encode": pixel_re_encode,
        "resolution_warning": resolution_warning,
    }
    write_render_report(output_path.parent, report_data)

    return {"status": "ok", "output_path": str(video_path)}


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
