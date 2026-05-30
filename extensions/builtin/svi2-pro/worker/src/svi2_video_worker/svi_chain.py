from __future__ import annotations

from typing import Optional

import torch


def build_conditioning_latents(
    anchor_lat: torch.Tensor,
    prev_last_latent: Optional[torch.Tensor],
    total_latent_frames: int,
    num_motion_latent: int,
) -> torch.Tensor:
    C, _, H, W = anchor_lat.shape
    y = torch.zeros(C, total_latent_frames, H, W, dtype=anchor_lat.dtype, device=anchor_lat.device)
    y[:, 0] = anchor_lat[:, 0]
    if prev_last_latent is not None and num_motion_latent > 0:
        tail = prev_last_latent[:, -num_motion_latent:]
        y[:, 1 : 1 + num_motion_latent] = tail
    return y


def adain_normalize_latent(
    latent: torch.Tensor, reference: torch.Tensor, factor: float = 0.5
) -> torch.Tensor:
    # Per-channel (dim 0 = C for [C,F,H,W]) mean/std match toward the reference
    # (clip-0) latent, blended by factor. Caps colour/exposure drift accumulating
    # down an SVI continuation chain. factor 0 = off, 1 = full re-normalization.
    if factor <= 0.0:
        return latent
    eps = 1e-5
    dims = tuple(range(1, latent.ndim))
    l_mean = latent.mean(dim=dims, keepdim=True)
    l_std = latent.std(dim=dims, keepdim=True) + eps
    r_mean = reference.mean(dim=dims, keepdim=True)
    r_std = reference.std(dim=dims, keepdim=True) + eps
    normalized = (latent - l_mean) / l_std * r_std + r_mean
    return latent + factor * (normalized - latent)


def stitch_clip_frames(clips: list[list], num_overlap_frame: int) -> list:
    if not clips:
        return []
    result = list(clips[0])
    for clip in clips[1:]:
        result.extend(clip[num_overlap_frame:])
    return result


def anchor_is_fixed() -> bool:
    return True
