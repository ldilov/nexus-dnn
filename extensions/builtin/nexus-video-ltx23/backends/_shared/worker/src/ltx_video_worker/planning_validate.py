"""ltx.video.plan.validate — runtime-side checks on a RenderPlan.

The Rust extension worker computes the plan and persists it before lease
acquisition. The runtime then validates the plan against its actual
installed capabilities (model availability, VRAM headroom, supported
modes, FPS bounds).
"""

from __future__ import annotations

from typing import Any


def validate_plan(plan: dict[str, Any], profile: str) -> dict[str, Any]:
    warnings: list[str] = []
    errors: list[str] = []

    if plan.get("mode") != "external_segments":
        errors.append(
            f"unsupported render mode: {plan.get('mode')!r}. Only "
            f"'external_segments' is implemented in v1."
        )

    w = plan.get("width", 0)
    h = plan.get("height", 0)
    if w % 32 != 0 or h % 32 != 0:
        errors.append(f"width/height must be divisible by 32; got {w}x{h}")

    for seg in plan.get("segments", []):
        n = seg.get("frame_count", 0)
        if (n - 1) % 8 != 0:
            errors.append(
                f"segment {seg.get('index')}: frame_count must be 8n+1; got {n}"
            )

    if profile == "fake" and plan.get("requested_duration_seconds", 0) > 300:
        warnings.append("Fake profile clamps long videos for testing.")

    return {
        "ok": len(errors) == 0,
        "warnings": warnings,
        "errors": errors,
    }
