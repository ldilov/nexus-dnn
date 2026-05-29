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


def stitch_clip_frames(clips: list[list], num_overlap_frame: int) -> list:
    if not clips:
        return []
    result = list(clips[0])
    for clip in clips[1:]:
        result.extend(clip[num_overlap_frame:])
    return result


def anchor_is_fixed() -> bool:
    return True
