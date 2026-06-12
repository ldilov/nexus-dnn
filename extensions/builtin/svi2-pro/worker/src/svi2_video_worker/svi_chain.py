from __future__ import annotations

from typing import Any, Optional

import numpy as np
import torch
from PIL import Image


def reencode_motion_tail(vae: Any, pixel_frames: list, num_motion_frame: int) -> torch.Tensor:
    tail = pixel_frames[-num_motion_frame:] if num_motion_frame > 0 else list(pixel_frames)
    encoded = vae.encode_image(tail)
    return encoded[0]


def radial_noise_mask(
    height: int, width: int, bg_protect: float, *, device=None, dtype=None
) -> torch.Tensor:
    ys = torch.linspace(-1.0, 1.0, height, device=device, dtype=dtype).view(height, 1)
    xs = torch.linspace(-1.0, 1.0, width, device=device, dtype=dtype).view(1, width)
    r = torch.sqrt(ys * ys + xs * xs) / (2.0 ** 0.5)  # 0 centre -> 1 corner
    return (1.0 - bg_protect * r).clamp(0.0, 1.0)


def build_conditioning_latents(
    anchor_lat: torch.Tensor,
    prev_last_latent: Optional[torch.Tensor],
    total_latent_frames: int,
    num_motion_latent: int,
    image_cond_noise_scale: float = 0.0,
    image_cond_noise_bg_protect: float = 0.0,
    end_lat: Optional[torch.Tensor] = None,
    ref_pad_num: int = 0,
) -> torch.Tensor:
    C, _, H, W = anchor_lat.shape
    y = torch.zeros(C, total_latent_frames, H, W, dtype=anchor_lat.dtype, device=anchor_lat.device)
    y[:, 0] = anchor_lat[:, 0]
    n_cond = 1
    if prev_last_latent is not None and num_motion_latent > 0:
        tail = prev_last_latent[:, -num_motion_latent:]
        y[:, 1 : 1 + num_motion_latent] = tail
        n_cond = 1 + num_motion_latent
    if end_lat is not None:
        y[:, -1] = end_lat[:, 0]
    if ref_pad_num != 0:
        pad_start = n_cond
        pad_stop = total_latent_frames - (1 if end_lat is not None else 0)
        if ref_pad_num > 0:
            pad_stop = min(pad_stop, pad_start + ref_pad_num)
        if pad_stop > pad_start:
            y[:, pad_start:pad_stop] = anchor_lat[:, 0:1]
    if image_cond_noise_scale > 0.0:
        noise = torch.randn_like(y[:, :n_cond])
        if image_cond_noise_bg_protect > 0.0:
            mask = radial_noise_mask(H, W, image_cond_noise_bg_protect, device=y.device, dtype=y.dtype)
            noise = noise * mask
        y[:, :n_cond] = y[:, :n_cond] + image_cond_noise_scale * noise
    return y


def adain_normalize_latent(
    latent: torch.Tensor, reference: torch.Tensor, factor: float = 0.5
) -> torch.Tensor:
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


def _crossfade_frames(a: list, b: list) -> list:
    n = len(a)
    out = []
    for i in range(n):
        alpha = 0.5 - 0.5 * np.cos(np.pi * (i + 1) / (n + 1))
        fa = np.asarray(a[i], dtype=np.float32)
        fb = np.asarray(b[i], dtype=np.float32)
        blended = (1.0 - alpha) * fa + alpha * fb
        out.append(Image.fromarray(np.clip(blended, 0, 255).astype("uint8")))
    return out


from .resolution import check_trained_resolution  # noqa: E402  re-export, torch-free


def stitch_clip_frames(
    clips: list[list], num_overlap_frame: int, mode: str = "crossfade"
) -> list:
    if not clips:
        return []
    result = list(clips[0])
    for clip in clips[1:]:
        n = num_overlap_frame
        if mode == "trim":
            result.extend(clip[n:] if n > 0 else list(clip))
            continue
        if n > 0 and len(result) >= n and len(clip) >= n:
            result[-n:] = _crossfade_frames(result[-n:], clip[:n])
            result.extend(clip[n:])
        else:
            result.extend(clip[n:])
    return result


def ref_pad_for_clip(
    clip_idx: int,
    num_clips: int,
    max_pad: int,
    free_clips: int,
    schedule: Optional[list] = None,
) -> int:
    if schedule:
        return int(schedule[min(clip_idx, len(schedule) - 1)])
    if max_pad == 0 or clip_idx < free_clips:
        return 0
    if max_pad < 0:
        return -1
    denom = max(1, num_clips - free_clips)
    step = clip_idx - free_clips + 1
    return round(max_pad * step / denom)


class RollingCrossfadeStitcher:
    def __init__(self, num_overlap_frame: int, mode: str = "crossfade") -> None:
        self.n = num_overlap_frame
        self.mode = mode
        self._tail: Optional[list] = None  # None until first push
        self._started = False  # trim mode: first-clip detection

    def push(self, clip: list) -> list:
        n = self.n
        if self.mode == "trim":
            if not self._started:
                self._started = True
                return list(clip)
            return list(clip[n:] if n > 0 else clip)
        if self._tail is None:
            if n > 0 and len(clip) >= n:
                self._tail = list(clip[-n:])
                return list(clip[:-n])
            self._tail = []
            return list(clip)
        if n > 0 and len(self._tail) >= n and len(clip) >= n:
            head = _crossfade_frames(self._tail, clip[:n])
            body = clip[n:]
            if len(body) >= n:
                self._tail = list(body[-n:])
                return head + list(body[:-n])
            self._tail = []
            return head + list(body)
        out = list(self._tail) + list(clip[n:])
        self._tail = list(clip[-n:]) if n > 0 and len(clip) >= n else []
        return out

    def flush(self) -> list:
        if self.mode == "trim":
            return []
        tail = self._tail or []
        self._tail = None
        return list(tail)


def anchor_is_fixed() -> bool:
    return True
