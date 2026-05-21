"""LTX-2 stage-2 latent upsampler — half-res stage-1 latent -> 2x latent.

The distilled LTX-2 pipeline is two-stage: stage 1 generates at half the
target resolution (its trained regime — full-res stage-1 starves the
8-step model of the token budget it needs to coordinate motion), then a
``LatentUpsampler`` doubles the latent spatially and a short stage-2
refine pass restores detail.

``ltx-core`` ships the native ``LatentUpsampler`` model + configurator;
the official ``ltx-2-spatial-upscaler-x2-1.0.safetensors`` carries an
embedded ltx-core config and native key layout, so it loads directly —
no comfy-key rename. The upsampler is a small (~950 MiB) latent-space
conv net: it runs on CPU so the 16 GiB GPU stays reserved for the 19B
transformer.

Boundary: extension-local. Importing ``ltx_core`` internals is
intentional here — see ``pipeline_ltx2`` module docstring.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def load_latent_upsampler(
    upsampler_path: Path, device: Any, logger: Any
) -> Any:
    """Load the native ``LatentUpsampler`` from the LTX-2 upscaler safetensors.

    Mirrors ``ltx2_conditioning.load_video_encoder``: the safetensors
    metadata carries the ltx-core config, ``LatentUpsamplerConfigurator``
    builds the matching meta model, and the native-layout weights load
    with ``assign=True``. ``device`` is normally ``"cpu"`` — the upsampler
    is latent-space and small, and keeping it off-GPU leaves the full
    VRAM budget for the 19B transformer.
    """
    import torch
    from safetensors import safe_open
    from safetensors.torch import load_file
    from ltx_core.loader.helpers import create_meta_model
    from ltx_core.model.upsampler import LatentUpsamplerConfigurator

    if not upsampler_path.is_file():
        raise RuntimeError(
            f"LTX-2 latent upsampler not found at {upsampler_path}."
        )

    with safe_open(str(upsampler_path), framework="pt") as f:
        meta = f.metadata() or {}
    if "config" not in meta:
        raise RuntimeError(
            f"LTX-2 upsampler at {upsampler_path} has no 'config' metadata "
            "— cannot configure the native LatentUpsampler."
        )
    config = json.loads(meta["config"])

    upsampler = create_meta_model(LatentUpsamplerConfigurator, config)

    raw = load_file(str(upsampler_path))
    missing, unexpected = upsampler.load_state_dict(
        raw, strict=False, assign=True
    )
    if missing:
        raise RuntimeError(
            f"native LatentUpsampler weight load mismatch — missing="
            f"{missing[:6]}."
        )

    meta_left = [
        n
        for n, t in (*upsampler.named_parameters(), *upsampler.named_buffers())
        if str(t.device) == "meta"
    ]
    if meta_left:
        raise RuntimeError(
            f"native LatentUpsampler has {len(meta_left)} params/buffers "
            f"still on meta after load — sample {meta_left[:5]}."
        )

    upsampler = upsampler.to(device=device, dtype=torch.float32)
    upsampler.eval()
    logger.info(
        "ltx2.latent_upsampler_loaded",
        tensors=len(raw),
        unexpected=len(unexpected),
        device=str(device),
    )
    return upsampler


def upsample_grid_latent(
    grid_latent: Any, video_encoder: Any, upsampler: Any
) -> Any:
    """Spatially 2x a stage-1 grid latent, keeping the denoise latent space.

    ``ltx-core``'s ``upsample_video`` un-normalises the latent with the
    VAE per-channel statistics, runs the conv upsampler, then re-normalises
    — the upsampler is trained on *un-normalised* latents while the
    denoise loop works in the normalised space. The compute runs in
    float32 on the upsampler's device (CPU); the result is cast back to
    the input dtype so the stage-2 transformer pass sees bfloat16.
    """
    import torch
    from ltx_core.model.upsampler.model import upsample_video

    out_dtype = grid_latent.dtype
    dev = next(upsampler.parameters()).device
    x = grid_latent.to(device=dev, dtype=torch.float32)
    with torch.no_grad():
        upsampled = upsample_video(x, video_encoder, upsampler)
    return upsampled.to(dtype=out_dtype)
