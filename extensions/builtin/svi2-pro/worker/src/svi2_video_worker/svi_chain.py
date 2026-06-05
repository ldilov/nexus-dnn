from __future__ import annotations

from typing import Any, Optional

import numpy as np
import torch
from PIL import Image


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


def radial_noise_mask(
    height: int, width: int, bg_protect: float, *, device=None, dtype=None
) -> torch.Tensor:
    # Spatial weight for ICN noise: 1.0 at frame centre, (1-bg_protect) at the
    # corners. Concentrates conditioning noise on the (centred) subject and
    # protects the edges/background so it stays coherent. bg_protect 0 = uniform
    # (no protection), 1 = corners fully protected. Assumes a centred subject.
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
    # FLF2V: pin the target end keyframe into the last latent slot so the model
    # interpolates start->end over the clip (prompt guides the morph path).
    # Outside the [:n_cond] ICN slice, so it stays a clean target.
    if end_lat is not None:
        y[:, -1] = end_lat[:, 0]
    # ref_pad_num (SVI ref_pad_num): bias padding slots toward the reference so
    # identity/background hold over a long chain. -1 = every remaining slot
    # (strongest lock, but freezes motion), 0 = off (zero-pad, drifts), N = only
    # the first N padding slots after the cond block (balanced: anchors the clip
    # head, leaves later frames free to move). Never overwrites the FLF end slot.
    if ref_pad_num != 0:
        pad_start = n_cond
        pad_stop = total_latent_frames - (1 if end_lat is not None else 0)
        if ref_pad_num > 0:
            pad_stop = min(pad_stop, pad_start + ref_pad_num)
        if pad_stop > pad_start:
            y[:, pad_start:pad_stop] = anchor_lat[:, 0:1]
    # Image-conditioning noise (ICN): perturb the ref/anchor (and motion-tail)
    # conditioning latents so the DiT is not hard-locked to the input image and
    # can follow prompt-driven transformations (eyes/veins/pose changes). 0 =
    # rigid ref lock; higher = more deviation (and less identity stability).
    # image_cond_noise_bg_protect (>0) masks the noise toward the centre so the
    # background/edges keep their structure while the subject transforms.
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


def _crossfade_frames(a: list, b: list) -> list:
    # Cosine alpha ramp over the overlap region: a fades out, b fades in. Hides
    # the segment seam instead of hard-cutting (which leaves a visible jump).
    n = len(a)
    out = []
    for i in range(n):
        alpha = 0.5 - 0.5 * np.cos(np.pi * (i + 1) / (n + 1))
        fa = np.asarray(a[i], dtype=np.float32)
        fb = np.asarray(b[i], dtype=np.float32)
        blended = (1.0 - alpha) * fa + alpha * fb
        out.append(Image.fromarray(np.clip(blended, 0, 255).astype("uint8")))
    return out


_TRAINED_RESOLUTIONS = frozenset({(832, 480), (480, 832)})


def check_trained_resolution(width: int, height: int) -> Optional[str]:
    # The SVI LoRA is error-recycling-trained at the 480p budget (832x480 /
    # 480x832, ~399k px). Off that budget the learned anchor-restoration is
    # evaluated out-of-distribution, so identity-lock weakens and the subject
    # relaxes toward the model's face prior over a long chain. Returns a warning
    # string for off-budget resolutions, or None when on a trained budget.
    if (width, height) in _TRAINED_RESOLUTIONS:
        return None
    return (
        f"resolution {width}x{height} is off the SVI LoRA training budget "
        f"(trained at 832x480 / 480x832, ~{832 * 480} px); identity-lock weakens "
        f"off-distribution and the subject can drift toward the model's prior over "
        f"a long chain. Render at 832x480 (landscape) or 480x832 (portrait)."
    )


def stitch_clip_frames(
    clips: list[list], num_overlap_frame: int, mode: str = "crossfade"
) -> list:
    # mode="crossfade": cosine-blend the overlap (hides a seam, but averages two
    # independent draws). mode="trim": canonical SVI/Wan2GP — keep the previous
    # clip whole and drop the next clip's leading num_overlap_frame duplicates,
    # no blend. Continuity comes from the latent conditioning, not pixel blending.
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
    # Per-clip ref-pad strength, auto-ramped (no hardcoded list). Early clips
    # (< free_clips) stay free (0) so their motion is untouched; the lock then
    # ramps linearly to max_pad at the final clip, because drift accumulates with
    # clip index. max_pad=-1 = full lock on the non-free clips. An explicit
    # `schedule` list overrides the ramp entirely (advanced).
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
    # Streaming equivalent of stitch_clip_frames: push one clip at a time, get
    # back the frames that are now final (safe to write to disk), while the
    # overlap tail is held until the next clip arrives to crossfade against it.
    # Holds at most num_overlap_frame frames in memory -> O(1) in clip count.
    # push(c0)+push(c1)+...+flush() yields exactly stitch_clip_frames([c0,c1,...]).
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
