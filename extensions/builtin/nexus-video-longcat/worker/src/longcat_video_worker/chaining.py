"""Multiscene chaining helpers ported from the LTXV2 worker.

Currently exposes ``adain_color_match`` for pixel-level colour drift control
across scene-N>1 continuations. The LongCat ``generate_vc`` hard-pins
conditioning frames (KV-cache or timestep-mask), so RGB statistics drift
across a chain when prompts swing widely. Pulling each scene's tail toward
a stable anchor caps the drift without touching the model.

The latent-level equivalent lives upstream in ``ltx2_conditioning.py``; this
module mirrors the API shape (``factor`` 0-1, ``reference`` argument).
"""
from __future__ import annotations

from typing import Any, Tuple

import numpy as np

ColorAnchor = Tuple[np.ndarray, np.ndarray]


def compute_color_anchor(frames_u8: np.ndarray) -> ColorAnchor:
    """Per-channel ``(mean, std)`` over a uint8 frame stack.

    Reduces over the frame, height, width axes; preserves channel dim.
    Returns float32 arrays of shape ``(C,)`` regardless of input dtype.
    """
    if frames_u8.ndim != 4 or frames_u8.shape[-1] != 3:
        raise ValueError(
            f"compute_color_anchor expects shape (N, H, W, 3); got {frames_u8.shape}"
        )
    work = frames_u8.astype(np.float32)
    mean = work.mean(axis=(0, 1, 2))
    std = work.std(axis=(0, 1, 2))
    return mean, std


def adain_color_match(
    frames_u8: np.ndarray,
    reference: ColorAnchor,
    factor: float = 0.2,
) -> np.ndarray:
    """Blend frame colour statistics toward ``reference`` by ``factor``.

    AdaIN drift control: scene-N>1 tail frames are nudged toward the
    scene-1 anchor so per-channel mean / std do not ratchet across a chain.
    ``factor`` 0.0 is a no-op; 1.0 fully replaces statistics; 0.1-0.3 is
    the usable band — higher flattens intended lighting changes between
    scenes. Computed in float32 for stability, returned as uint8 clipped
    to [0, 255].
    """
    if factor <= 0.0:
        return frames_u8
    if frames_u8.ndim != 4 or frames_u8.shape[-1] != 3:
        raise ValueError(
            f"adain_color_match expects shape (N, H, W, 3); got {frames_u8.shape}"
        )
    ref_mean, ref_std = reference
    if ref_mean.shape != (3,) or ref_std.shape != (3,):
        raise ValueError(
            f"reference anchor must be (mean(3,), std(3,)); got "
            f"mean={ref_mean.shape} std={ref_std.shape}"
        )
    eps = 1e-5
    work = frames_u8.astype(np.float32)
    cur_mean = work.mean(axis=(0, 1, 2))
    cur_std = work.std(axis=(0, 1, 2))
    normalized = (work - cur_mean) / (cur_std + eps) * ref_std + ref_mean
    blended = work + factor * (normalized - work)
    return np.clip(blended, 0.0, 255.0).round().astype(np.uint8)


def pin_last_frame_for_vc(
    latent_tail: np.ndarray, target_channels: int = 128
) -> np.ndarray:
    if latent_tail.ndim < 2:
        raise ValueError(
            f"pin_last_frame_for_vc expects ndim>=2; got shape {latent_tail.shape}"
        )
    current_channels = latent_tail.shape[0]
    if current_channels == target_channels:
        return latent_tail.astype(np.float32, copy=True)
    if current_channels > target_channels:
        return latent_tail[:target_channels].astype(np.float32, copy=True)
    repeat_count = target_channels // current_channels
    remainder = target_channels - repeat_count * current_channels
    tiled = np.concatenate([latent_tail] * repeat_count, axis=0)
    if remainder > 0:
        tiled = np.concatenate([tiled, latent_tail[:remainder]], axis=0)
    return tiled.astype(np.float32, copy=True)


def damp_adain_drift(factor: float, scene_idx: int) -> float:
    decay = max(0.5, 1.0 - 0.08 * max(0, scene_idx - 3))
    return float(factor) * decay


def purge_kv_cache(transformer: Any) -> None:
    if transformer is None:
        return
    if hasattr(transformer, "kv_cache"):
        try:
            transformer.kv_cache = None
        except (AttributeError, TypeError):
            return
