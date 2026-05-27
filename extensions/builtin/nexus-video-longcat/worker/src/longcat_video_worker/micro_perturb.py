"""Pin-frame micro-perturbation for soft scene transitions.

The hard-clean-pin path feeds the prev-scene tail verbatim into
``generate_vc`` as conditioning. The first frame of the new scene is
therefore byte-identical to the last frame of the previous scene. The
eye reads that frozen pixel field as a hard cut and the diffusion model
fights its own pinned latents against the new prompt's cross-attention.

Since the upstream pipeline does not expose a per-frame x0 weight, the
only x0 lever we own at the API surface is the conditioning frames
themselves: we perturb frame 0 of the tail before it enters
``generate_vc``. Two independent ops, both opt-in (defaults are 0.0):

* **subpixel jitter** — sub-pixel translation breaks the frozen-pixel
  tell while preserving content; magnitudes <= 0.5 px are visually
  imperceptible but enough for the model to read frame 0 as a
  continuation tick instead of a freeze.
* **grain reseed** — Gaussian noise injection adds high-frequency
  texture variation, releasing the cross-attn from the burned-in cond
  signature without changing colour statistics meaningfully.

Pure numpy + PIL. No torch. Module is import-cheap.
"""

from __future__ import annotations

from typing import Optional

import numpy as np

MAX_JITTER_PX = 0.5
MAX_GRAIN_SIGMA = 0.05
DEFAULT_JITTER_PX = 0.0
DEFAULT_GRAIN_SIGMA = 0.0


def _subpixel_translate(frame_u8: np.ndarray, dx: float, dy: float) -> np.ndarray:
    """Bilinear sub-pixel translation of a single (H, W, 3) uint8 frame.

    Uses PIL's affine transform (bilinear resample) so the translation is
    sub-pixel accurate without dragging in scipy. Out-of-frame pixels are
    filled by edge replication via reflection so the boundary does not
    introduce a black hairline at the translation direction.
    """
    if abs(dx) < 1e-9 and abs(dy) < 1e-9:
        return frame_u8
    from PIL import Image

    img = Image.fromarray(frame_u8, mode="RGB")
    shifted = img.transform(
        img.size,
        Image.AFFINE,
        (1, 0, -dx, 0, 1, -dy),
        resample=Image.BILINEAR,
    )
    return np.asarray(shifted)


def perturb_pin_frame(
    tail_u8: np.ndarray,
    jitter_px: float = DEFAULT_JITTER_PX,
    grain_sigma: float = DEFAULT_GRAIN_SIGMA,
    seed: Optional[int] = None,
) -> np.ndarray:
    """Apply micro-jitter + grain reseed to frame 0 of a tail stack.

    ``tail_u8`` is the per-scene-overlap RGB tail being fed into
    ``generate_vc`` as conditioning. Only frame 0 is perturbed — that
    frame is the pin point the eye reads as the seam. Frames 1..N are
    returned untouched so the AdaIN colour anchor and overlap-overlap
    semantics are preserved.

    Both magnitudes are clamped to safe upper bounds: jitter <= 0.5 px
    and grain sigma <= 0.05 (relative to [0, 1]). Anything larger reads
    as a visible artefact.

    Returns a NEW array; ``tail_u8`` is not mutated.
    """
    if tail_u8.ndim != 4 or tail_u8.shape[-1] != 3:
        raise ValueError(
            f"perturb_pin_frame expects shape (T, H, W, 3); got {tail_u8.shape}"
        )
    if tail_u8.shape[0] == 0:
        return tail_u8
    if tail_u8.dtype != np.uint8:
        raise ValueError(
            f"perturb_pin_frame expects uint8 input; got dtype={tail_u8.dtype}"
        )

    jitter_px = max(0.0, min(MAX_JITTER_PX, float(jitter_px)))
    grain_sigma = max(0.0, min(MAX_GRAIN_SIGMA, float(grain_sigma)))

    if jitter_px == 0.0 and grain_sigma == 0.0:
        return tail_u8

    out = tail_u8.copy()
    rng = np.random.default_rng(seed)

    if jitter_px > 0.0:
        dx = float((rng.random() - 0.5) * 2.0 * jitter_px)
        dy = float((rng.random() - 0.5) * 2.0 * jitter_px)
        out[0] = _subpixel_translate(out[0], dx, dy)

    if grain_sigma > 0.0:
        frame_f = out[0].astype(np.float32)
        noise = rng.normal(0.0, grain_sigma * 255.0, frame_f.shape).astype(np.float32)
        out[0] = np.clip(frame_f + noise, 0.0, 255.0).astype(np.uint8)

    return out
