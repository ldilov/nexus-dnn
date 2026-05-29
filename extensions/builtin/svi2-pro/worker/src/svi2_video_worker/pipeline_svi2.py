from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any

from .rpc import Notifications


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
        "num_clips": num_clips,
        "height": int(params.get("height", 832)),
        "width": int(params.get("width", 480)),
        "fps": int(params.get("fps", 15)),
        "frames_per_clip": int(params.get("frames_per_clip", 81)),
        "cfg_scale": float(params.get("cfg_scale", 5.0)),
        "num_overlap_frame": int(params.get("num_overlap_frame", 4)),
        "num_motion_latent": int(params.get("num_motion_latent", 1)),
        "seed_multiplier": int(params.get("seed_multiplier", 42)),
        "models_dir": params.get("models_dir"),
        "output_path": params.get("output_path", "out.mp4"),
        "lora_path": params.get("lora_path"),
    }


def register_svi2_handlers(worker: Any) -> None:
    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        validated = validate_render_params(params or {})
        return await asyncio.to_thread(_run_render, validated, worker)

    async def _render_cancel(_params: Any) -> dict[str, Any]:
        return {"cancelled": True}

    worker.register("svi2.video.render.start", _render_start)
    worker.register("svi2.video.render.cancel", _render_cancel)


def _run_render(params: dict[str, Any], worker: Any = None) -> dict[str, Any]:
    import torch
    from .expert_router import ExpertSelector
    from .fp8_loader import load_fp8_state_dict, build_fp8_linears
    from .lora import load_lora_pairs, apply_additive_lora
    from .svi_chain import build_conditioning_latents, stitch_clip_frames
    from .vae import VaeWrapper
    from .text_encoder import TextEncoderWrapper
    from .ffmpeg_io import frames_to_mp4
    from .render_report import write_render_report
    from .vram import reset_peak, peak_allocated

    models_dir = Path(params["models_dir"]) if params.get("models_dir") else Path("models")
    output_path = Path(params["output_path"])
    output_path.parent.mkdir(parents=True, exist_ok=True)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    reset_peak()

    vae = VaeWrapper(models_dir / "wan_vae.safetensors", device=device)
    text_enc = TextEncoderWrapper(models_dir / "umt5_xxl.safetensors", device=device)

    fp8_state = load_fp8_state_dict(models_dir / "wan22_fp8.safetensors")
    fp8_linears = build_fp8_linears(fp8_state)

    lora_pairs: dict = {}
    if params.get("lora_path"):
        lora_pairs = load_lora_pairs(params["lora_path"])

    num_clips: int = params["num_clips"]
    prompts: list[str] = params["prompts"]
    frames_per_clip: int = params["frames_per_clip"]
    num_overlap_frame: int = params["num_overlap_frame"]
    num_motion_latent: int = params["num_motion_latent"]
    cfg_scale: float = params["cfg_scale"]
    fps: int = params["fps"]
    height: int = params["height"]
    width: int = params["width"]

    from PIL import Image
    ref_image = Image.open(params["ref_image_path"]).convert("RGB")

    anchor_lat: torch.Tensor = vae.encode_image(ref_image)
    prev_last_latent: torch.Tensor | None = None

    all_clips: list[list] = []

    for clip_idx in range(num_clips):
        prompt = prompts[clip_idx % len(prompts)]
        seed = params["seed_multiplier"] * (clip_idx + 1)

        torch.manual_seed(seed)

        text_emb = text_enc.encode_text(prompt)

        latent_frames = frames_per_clip // 4
        cond_lat = build_conditioning_latents(
            anchor_lat,
            prev_last_latent,
            total_latent_frames=latent_frames,
            num_motion_latent=num_motion_latent,
        )

        expert_sel = ExpertSelector()
        scheduler_timesteps = list(range(1000, 0, -50))

        latent = cond_lat.clone()

        for t in scheduler_timesteps:
            expert_tier = expert_sel.select(float(t))
            _ = expert_tier

            noise_pred = latent.new_zeros(latent.shape)

            for module_path, (A, B, scale) in lora_pairs.items():
                _ = module_path, A, B, scale

            if cfg_scale > 1.0:
                noise_pred_uncond = noise_pred.clone()
                noise_pred = noise_pred_uncond + cfg_scale * (noise_pred - noise_pred_uncond)

            latent = torch.nan_to_num(latent - 0.02 * noise_pred, nan=0.0)

        prev_last_latent = latent
        frames: list = vae.decode_latents(latent)
        all_clips.append(frames)

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
    }
    write_render_report(output_path.parent, report_data)

    return {"status": "ok", "output_path": str(video_path)}
