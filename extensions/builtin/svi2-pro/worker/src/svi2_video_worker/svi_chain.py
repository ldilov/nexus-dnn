from __future__ import annotations

from typing import Any, Optional

import torch


def reencode_motion_tail(vae: Any, pixel_frames: list, num_motion_frame: int) -> torch.Tensor:
    # SVI continuation drift fix: instead of carrying the RAW denoised latent
    # tail forward (which accumulates off-manifold error clip over clip), decode
    # the clip to pixels and re-encode the last num_motion_frame frames through
    # the VAE. The round-trip snaps the motion-conditioning latent back onto the
    # VAE's natural manifold, killing colour/structure drift down the chain.
    #
    # Known limitation: the Wan VAE encoder is causal and treats frame 0 of its
    # input as a sequence origin (distinct first-frame normalization). Encoding
    # an isolated tail re-encodes that tail's first frame as an origin rather
    # than a continuation, so the conditioning latent is not bit-identical to a
    # full-clip encode. Accepted trade-off vs re-encoding from the true first
    # frame (far more expensive); attribute any residual seam to this.
    tail = pixel_frames[-num_motion_frame:] if num_motion_frame > 0 else list(pixel_frames)
    encoded = vae.encode_image(tail)
    return encoded[0]


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
