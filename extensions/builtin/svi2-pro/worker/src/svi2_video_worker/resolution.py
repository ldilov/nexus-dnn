from __future__ import annotations

from typing import Any, Optional

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


__all__ = ["check_trained_resolution", "resolution_warning"]
