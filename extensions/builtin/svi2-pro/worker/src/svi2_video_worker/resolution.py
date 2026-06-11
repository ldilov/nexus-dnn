from __future__ import annotations

from typing import TYPE_CHECKING, Any, Optional

if TYPE_CHECKING:
    from PIL.Image import Image as PILImage

_TRAINED_RESOLUTIONS = frozenset({(832, 480), (480, 832)})
_TRAINED_BUDGET_PX = 832 * 480
_SUB_BUDGET_FACTOR = 0.95


def check_trained_resolution(width: int, height: int) -> Optional[str]:
    if (width, height) in _TRAINED_RESOLUTIONS:
        return None
    return (
        f"resolution {width}x{height} is off the SVI LoRA training budget "
        f"(trained at 832x480 / 480x832, ~{_TRAINED_BUDGET_PX} px); identity-lock weakens "
        f"off-distribution and the subject can drift toward the model's prior over "
        f"a long chain. Render at 832x480 (landscape) or 480x832 (portrait)."
    )


def resolution_warning(width: int, height: int) -> Optional[dict[str, Any]]:
    message = check_trained_resolution(width, height)
    if message is None:
        return None
    budget_ratio = (width * height) / _TRAINED_BUDGET_PX
    return {
        "code": "RESOLUTION_OFF_BUDGET",
        "severity": "warning",
        "message": message,
        "width": width,
        "height": height,
        "trained_budget_px": _TRAINED_BUDGET_PX,
        "budget_ratio": round(budget_ratio, 3),
        "sub_budget": budget_ratio < _SUB_BUDGET_FACTOR,
        "blocking": False,
    }


def fit_to_resolution(img: "PILImage", width: int, height: int) -> "PILImage":
    """Cover-crop an image to exactly width x height without stretching.

    Scales the source up/down so it covers the target box (preserving aspect),
    then centre-crops the overflow. A raw `img.resize((width, height))` ignores
    aspect and squashes a portrait into a landscape box (and vice versa), which
    distorts the whole render because the conditioning latent is that image.
    """
    from PIL import Image

    src_w, src_h = img.size
    if (src_w, src_h) == (width, height):
        return img
    scale = max(width / src_w, height / src_h)
    rw, rh = max(width, round(src_w * scale)), max(height, round(src_h * scale))
    resized = img.resize((rw, rh), Image.LANCZOS)
    left = (rw - width) // 2
    top = (rh - height) // 2
    return resized.crop((left, top, left + width, top + height))


__all__ = ["check_trained_resolution", "resolution_warning", "fit_to_resolution"]
