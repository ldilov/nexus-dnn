from __future__ import annotations

import asyncio
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable, Optional

_ARTIFACT_FILENAMES: dict[str, str] = {
    "dit-high-fp8": "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors",
    "dit-low-fp8": "I2V/Wan2_2-I2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors",
    "svi-lora-high": "version-2.0/SVI_Wan2.2-I2V-A14B_high_noise_lora_v2.0_pro.safetensors",
    "svi-lora-low": "version-2.0/SVI_Wan2.2-I2V-A14B_low_noise_lora_v2.0_pro.safetensors",
    "text-encoder": "umt5-xxl-enc-bf16.safetensors",
    "vae": "Wan2_2_VAE_bf16.safetensors",
    "tokenizer": "google/umt5-xxl",
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

_SWITCH_BOUNDARY = 0.875
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

    return {
        "ref_image_path": str(ref),
        "prompts": list(prompts),
        "negative_prompt": str(params.get("negative_prompt", _NEGATIVE_PROMPT)),
        "num_clips": num_clips,
        "height": int(params.get("height", 832)),
        "width": int(params.get("width", 480)),
        "fps": int(params.get("fps", 15)),
        "frames_per_clip": int(params.get("frames_per_clip", 81)),
        "cfg_scale": float(params.get("cfg_scale", 5.0)),
        "num_inference_steps": int(params.get("num_inference_steps", _NUM_INFERENCE_STEPS)),
        "sigma_shift": float(params.get("sigma_shift", _SIGMA_SHIFT)),
        "switch_boundary": float(params.get("switch_boundary", _SWITCH_BOUNDARY)),
        "num_overlap_frame": int(params.get("num_overlap_frame", 4)),
        "num_motion_latent": int(params.get("num_motion_latent", 1)),
        "blocks_to_swap": int(params.get("blocks_to_swap", 20)),
        "seed_multiplier": int(params.get("seed_multiplier", 42)),
        "models_dir": params.get("models_dir"),
        "output_path": params.get("output_path", "out.mp4"),
        "device": params.get("device"),
    }


def register_svi2_handlers(worker: Any) -> None:
    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        validated = validate_render_params(params or {})
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


def _build_expert(dit_path: Path, lora_path: Optional[Path]) -> ExpertModel:
    import torch

    from .wan22 import WanModel
    from .fp8_loader import (
        load_fp8_state_dict,
        build_fp8_linears,
        apply_fp8_linears_to_module,
        audit_key_overlap,
    )
    from .lora import load_lora_pairs, wrap_module_with_lora

    dit = WanModel(**_WAN22_A14B_CONFIG).eval()

    fp8_audit: dict[str, object] = {}
    if dit_path.exists():
        state = load_fp8_state_dict(dit_path)
        fp8_audit = audit_key_overlap(state, dit)
        linears = build_fp8_linears(state)
        apply_fp8_linears_to_module(dit, linears)

    lora_audit: dict[str, object] = {}
    if lora_path is not None and lora_path.exists():
        pairs = load_lora_pairs(lora_path)
        lora_audit = wrap_module_with_lora(dit, pairs)

    for p in dit.parameters():
        if p.dtype == torch.float32:
            p.data = p.data.to(torch.bfloat16)

    return ExpertModel(dit=dit, fp8_audit=fp8_audit, lora_audit=lora_audit)


def _build_models(params: dict[str, Any]) -> RenderModels:
    from .vae import VaeWrapper
    from .text_encoder import TextEncoderWrapper

    models_dir = Path(params["models_dir"]) if params.get("models_dir") else Path("models")

    high = _build_expert(_resolve(models_dir, "dit-high-fp8"), _resolve(models_dir, "svi-lora-high"))
    low = _build_expert(_resolve(models_dir, "dit-low-fp8"), _resolve(models_dir, "svi-lora-low"))

    vae = VaeWrapper(_resolve(models_dir, "vae"))
    text_encoder = TextEncoderWrapper(
        _resolve(models_dir, "text-encoder"),
        tokenizer_path=_resolve(models_dir, "tokenizer"),
    )

    audit = {"high_fp8": high.fp8_audit, "low_fp8": low.fp8_audit, "high_lora": high.lora_audit, "low_lora": low.lora_audit}
    return RenderModels(high=high, low=low, vae=vae, text_encoder=text_encoder, audit=audit)


def _build_image_conditioning(
    anchor_lat: Any,
    prev_last_latent: Any,
    total_latent_frames: int,
    num_frames: int,
    height: int,
    width: int,
    num_motion_latent: int,
) -> Any:
    import torch
    from .svi_chain import build_conditioning_latents

    cond = build_conditioning_latents(
        anchor_lat,
        prev_last_latent,
        total_latent_frames=total_latent_frames,
        num_motion_latent=num_motion_latent,
    )

    lat_h = height // 8
    lat_w = width // 8
    msk = torch.ones(1, num_frames, lat_h, lat_w, dtype=cond.dtype, device=cond.device)
    msk[:, 1:] = 0
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
) -> Any:
    import torch

    expert_selector.reset()
    active_tier = "high"
    if move_to is not None:
        move_to("high")

    for step_idx in range(len(timesteps)):
        timestep = timesteps[step_idx]
        tier = expert_selector.select(float(timestep.item()))
        if tier != active_tier:
            active_tier = tier
            if move_to is not None:
                move_to(tier)

        dit = models.high.dit if active_tier == "high" else models.low.dit

        ts = timestep.unsqueeze(0).to(dtype=latent.dtype, device=latent.device)

        with torch.no_grad():
            noise_pred_posi = dit(x=latent, timestep=ts, context=context_posi, clip_feature=None, y=y)
            if cfg_scale != 1.0:
                noise_pred_nega = dit(x=latent, timestep=ts, context=context_nega, clip_feature=None, y=y)
                noise_pred = noise_pred_nega + cfg_scale * (noise_pred_posi - noise_pred_nega)
            else:
                noise_pred = noise_pred_posi

        noise_pred = torch.nan_to_num(noise_pred, nan=0.0, posinf=0.0, neginf=0.0)
        latent = scheduler.step(noise_pred, timestep, latent)
        latent = torch.nan_to_num(latent, nan=0.0, posinf=0.0, neginf=0.0)

    return latent


def _run_render(
    params: dict[str, Any],
    worker: Any = None,
    build_models: Callable[[dict[str, Any]], RenderModels] = _build_models,
) -> dict[str, Any]:
    import torch
    from PIL import Image

    from .expert_router import ExpertSelector
    from .wan22 import FlowMatchScheduler
    from .svi_chain import stitch_clip_frames
    from .ffmpeg_io import frames_to_mp4
    from .render_report import write_render_report
    from .vram import reset_peak, peak_allocated

    output_path = Path(params["output_path"])
    output_path.parent.mkdir(parents=True, exist_ok=True)

    device = params.get("device") or ("cuda" if torch.cuda.is_available() else "cpu")
    reset_peak()

    models = build_models(params)

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

    ref_image = Image.open(params["ref_image_path"]).convert("RGB").resize((width, height))

    scheduler = FlowMatchScheduler(template="Wan")
    scheduler.set_timesteps(
        num_inference_steps=params["num_inference_steps"], shift=params["sigma_shift"]
    )
    timesteps = scheduler.timesteps

    total_latent_frames = (frames_per_clip - 1) // 4 + 1
    lat_h = height // 8
    lat_w = width // 8

    expert_selector = ExpertSelector(boundary=switch_boundary)
    blocks_to_swap: int = params["blocks_to_swap"]

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

    models.vae.to_cuda() if device == "cuda" else models.vae.to_cpu()
    anchor_lat = models.vae.encode_image(ref_image)[0]
    if device == "cuda":
        models.vae.to_cpu()
        torch.cuda.empty_cache()

    prev_last_latent: Any = None
    all_clips: list[list] = []

    for clip_idx in range(num_clips):
        prompt = prompts[clip_idx % len(prompts)]
        seed = params["seed_multiplier"] * clip_idx
        torch.manual_seed(seed)

        if device == "cuda":
            models.text_encoder.to_cuda()
        context_posi = models.text_encoder.encode_text(prompt)
        context_nega = models.text_encoder.encode_text(negative_prompt) if cfg_scale != 1.0 else context_posi
        if device == "cuda":
            models.text_encoder.to_cpu()
            torch.cuda.empty_cache()

        noise = torch.randn(
            1, _WAN22_A14B_CONFIG["out_dim"], total_latent_frames, lat_h, lat_w,
            generator=torch.Generator(device="cpu").manual_seed(seed),
        ).to(device)
        latent = noise

        y = _build_image_conditioning(
            anchor_lat.to(device),
            prev_last_latent,
            total_latent_frames=total_latent_frames,
            num_frames=frames_per_clip,
            height=height,
            width=width,
            num_motion_latent=num_motion_latent,
        )

        context_posi = context_posi.to(device)
        context_nega = context_nega.to(device)

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
        )

        prev_last_latent = latent.detach()[0]

        if device == "cuda":
            models.vae.to_cuda()
        frames = models.vae.decode_latents(latent)
        if device == "cuda":
            models.vae.to_cpu()
            torch.cuda.empty_cache()

        all_clips.append(_to_pil_frames(frames))

    stitched = stitch_clip_frames(all_clips, num_overlap_frame)
    video_path = frames_to_mp4(stitched, output_path, fps=fps)

    report_data = {
        "output_path": str(video_path),
        "num_clips": num_clips,
        "frames": len(stitched),
        "height": height,
        "width": width,
        "fps": fps,
        "peak_vram_bytes": peak_allocated(),
        "model_audit": models.audit,
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
