"""i2v and multi-scene conditioning helpers for the LTX-2 native path.

Spec 048. These helpers turn an input image into a keyframe latent and a
prior scene's grid latent into a continuation anchor — the conditioning
seam ``pipeline_ltx2._generate_single`` applies before the denoise loop.

The ltx-core conditioning items append *clean* reference tokens to the
noisy latent sequence and set their ``denoise_mask`` to ``1 - strength``
(strength 1.0 -> mask 0 -> kept fully clean). The denoise loop in
``pipeline_ltx2`` therefore honours ``LatentState.denoise_mask``: tokens
with mask < 1 are re-pinned to ``clean_latent`` every step and carry a
near-zero per-token timestep. With no conditioning the mask is all-ones
and the loop is bit-identical to the prior pure-t2v path.

Boundary: extension-local. Importing ``ltx_core`` internals is
intentional here — see ``pipeline_ltx2`` module docstring.
"""

from __future__ import annotations

import gc
import json
from pathlib import Path
from typing import Any

_DEFAULT_DECAY_SPAN = 12
_DECAY_START_FRACTION = 0.4


def load_input_image(path: str | None, width: int, height: int) -> Any | None:
    """Load an input image as an RGB ``PIL.Image`` cover-cropped to size.

    Returns ``None`` when ``path`` is unset or unreadable — the caller
    then falls back to pure-noise t2v. A dark placeholder is never
    synthesised here: an absent image means t2v, not a grey i2v.
    """
    if not path:
        return None
    try:
        from PIL import Image
    except ImportError:
        return None
    src = Path(path)
    if not src.is_file():
        return None
    img = Image.open(src).convert("RGB")
    if img.size != (width, height):
        img = _cover_crop(img, width, height)
    return img


def _cover_crop(img: Any, width: int, height: int) -> Any:
    """Scale-to-cover then centre-crop ``img`` to exactly (width, height)."""
    from PIL import Image

    src_w, src_h = img.size
    scale = max(width / src_w, height / src_h)
    new_w = max(width, round(src_w * scale))
    new_h = max(height, round(src_h * scale))
    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - width) // 2
    top = (new_h - height) // 2
    return img.crop((left, top, left + width, top + height))


def load_video_encoder(video_vae_path: Path, device: Any, logger: Any) -> Any:
    """Load the native ``VideoEncoder`` from the Kijai video-VAE safetensors.

    Mirrors ``pipeline_ltx2._decode_video_latent``'s decoder load: the
    safetensors metadata carries the VAE config, ``VideoEncoderConfigurator``
    builds the matching meta model, and the ``encoder.*`` keys **plus** the
    ``per_channel_statistics.*`` buffers load with ``assign=True``. The
    encoder normalises its own output into the denoise latent space via
    ``PerChannelStatistics`` — those statistics buffers are mandatory or
    the normalise step hits meta tensors.
    """
    import torch
    from safetensors import safe_open
    from safetensors.torch import load_file
    from ltx_core.loader.helpers import create_meta_model
    from ltx_core.model.video_vae import VideoEncoderConfigurator

    if not video_vae_path.is_file():
        raise RuntimeError(f"LTX-2 video VAE not found at {video_vae_path}")

    with safe_open(str(video_vae_path), framework="pt") as f:
        meta = f.metadata() or {}
    if "config" not in meta:
        raise RuntimeError(
            f"LTX-2 video VAE at {video_vae_path} has no 'config' metadata "
            "— cannot configure the native VideoEncoder."
        )
    vae_config = json.loads(meta["config"])

    encoder = create_meta_model(VideoEncoderConfigurator, vae_config)

    raw = load_file(str(video_vae_path))
    encoder_sd = {
        k[len("encoder.") :]: v
        for k, v in raw.items()
        if k.startswith("encoder.")
    }
    if not encoder_sd:
        raise RuntimeError(
            f"LTX-2 video VAE at {video_vae_path} carries no 'encoder.*' "
            "weights — the i2v keyframe encode needs the encoder half."
        )
    encoder_sd.update(
        {
            k: v
            for k, v in raw.items()
            if k.startswith("per_channel_statistics.")
        }
    )
    missing, _unexpected = encoder.load_state_dict(
        encoder_sd, strict=False, assign=True
    )
    if missing:
        raise RuntimeError(
            f"native VideoEncoder weight load mismatch — missing="
            f"{missing[:6]}."
        )

    meta_left = [
        n
        for n, t in (*encoder.named_parameters(), *encoder.named_buffers())
        if str(t.device) == "meta"
    ]
    if meta_left:
        raise RuntimeError(
            f"native VideoEncoder has {len(meta_left)} params/buffers still "
            f"on meta after load — sample {meta_left[:5]}."
        )

    encoder = encoder.to(device=device, dtype=torch.bfloat16)
    encoder.eval()
    logger.info("ltx2.video_encoder_loaded", keys=len(encoder_sd))
    return encoder


def encode_image_to_latent(
    image: Any, encoder: Any, device: Any, logger: Any
) -> Any:
    """VAE-encode a single RGB image into a one-frame latent.

    The PIL image is mapped to a ``[1, 3, 1, H, W]`` pixel tensor in
    ``[-1, 1]`` and run through the native ``VideoEncoder``, which
    normalises its own output into the denoise latent space via
    ``PerChannelStatistics``. Returns a ``[1, 128, 1, h, w]`` latent on
    ``device`` in bfloat16.
    """
    import numpy as np
    import torch

    arr = np.asarray(image.convert("RGB"), dtype=np.float32) / 127.5 - 1.0
    pixels = (
        torch.from_numpy(arr)
        .permute(2, 0, 1)
        .unsqueeze(0)
        .unsqueeze(2)
        .to(device=device, dtype=torch.bfloat16)
    )
    with torch.no_grad():
        latent = encoder(pixels)
    logger.info("ltx2.keyframe_encoded", latent_shape=list(latent.shape))
    return latent.to(torch.bfloat16)


def extract_tail_latent(grid_latent: Any, tail_frames: int) -> Any:
    """Slice the trailing ``tail_frames`` latent frames of a scene grid.

    ``grid_latent`` is the ``[B, C, F, H, W]`` latent ``unpatchify``
    yields. The tail is the momentum window carried into the next scene
    as a reference-latent condition. ``tail_frames`` is clamped to the
    available frame count.
    """
    frame_count = grid_latent.shape[2]
    n = max(1, min(int(tail_frames), frame_count))
    return grid_latent[:, :, -n:, :, :].contiguous()


def apply_image_cond_noise(
    latent: Any, noise_scale: float, seed: int
) -> Any:
    """Add scaled Gaussian noise to a keyframe latent to unlock motion.

    A perfectly clean keyframe over-anchors the i2v start and freezes the
    subject (spec 048 R2). A small seeded noise injection gives the
    denoise loop headroom to animate while keeping identity. ``noise_scale``
    0.0 is a no-op — the keyframe stays clean.
    """
    import torch

    if noise_scale <= 0.0:
        return latent
    generator = torch.Generator(device="cpu").manual_seed(int(seed))
    noise = torch.randn(
        tuple(latent.shape), generator=generator, dtype=torch.float32
    ).to(device=latent.device, dtype=latent.dtype)
    return latent + noise_scale * noise


def build_keyframe_condition(image_latent: Any, strength: float) -> Any:
    """Build the i2v first-frame ``VideoConditionByKeyframeIndex``.

    ``strength`` 1.0 pins a clean identity first frame; lower unlocks
    motion at the cost of identity drift.
    """
    from ltx_core.conditioning.types.keyframe_cond import (
        VideoConditionByKeyframeIndex,
    )

    return VideoConditionByKeyframeIndex(
        keyframes=image_latent,
        frame_idx=0,
        strength=float(strength),
        num_pixel_frames=1,
    )


def build_reference_condition(tail_latent: Any, strength: float) -> Any:
    """Build a scene-continuation ``VideoConditionByReferenceLatent``.

    The prior scene's tail latent is appended as a clean reference at
    ``downscale_factor=1`` (same resolution as the target). ``strength``
    governs how hard the new scene is anchored to that momentum window.
    """
    from ltx_core.conditioning.types.reference_video_cond import (
        VideoConditionByReferenceLatent,
    )

    return VideoConditionByReferenceLatent(
        latent=tail_latent,
        downscale_factor=1,
        strength=float(strength),
    )


def decay_condition_strength(
    base_strength: float,
    position: int,
    decay_span: int = _DEFAULT_DECAY_SPAN,
) -> float:
    """Ramp the carry strength from a softened start up to ``base_strength``.

    A continuation anchor held at full strength from the first frame
    over-constrains the start of a scene and produces a static opening
    (spec R2). Ramping the effective strength in over the first
    ``decay_span`` frames avoids that. ``position`` is the 0-based frame
    index; ``position >= decay_span`` returns ``base_strength`` unchanged.
    A non-positive ``decay_span`` disables the ramp.
    """
    if decay_span <= 0 or position >= decay_span:
        return base_strength
    pos = max(0, position)
    start = base_strength * _DECAY_START_FRACTION
    fraction = pos / decay_span
    return start + (base_strength - start) * fraction
