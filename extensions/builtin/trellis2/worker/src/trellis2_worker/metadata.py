"""metadata_json builder — single source of truth for the frozen metadata shape.

Both backends call build_metadata so the host/shim/web see an identical schema
regardless of profile (only the values differ).
"""
from __future__ import annotations

from typing import Any

MODEL_TRELLIS = "microsoft/TRELLIS.2-4B"
MODEL_DINOV3 = "facebook/dinov3-vitl16-pretrain-lvd1689m"
MODEL_DINOV3_MIRROR = "kiennt120/dinov3-vitl16-pretrain-lvd1689m"


def build_metadata(
    *,
    profile: str,
    attention_backend: str,
    compute_cap: str,
    native_sm121: bool,
    load_s: float,
    run_s: float,
    vertices: int,
    faces: int,
    fallbacks: list[str],
    trellis_model: str = MODEL_TRELLIS,
    dinov3_model: str = MODEL_DINOV3,
    residency: str = "balanced",
    tf32: bool = True,
) -> dict[str, Any]:
    return {
        "attention_backend": attention_backend,
        "compute_cap": compute_cap,
        "native_sm121": native_sm121,
        "stage_timings": {"load_s": round(load_s, 3), "run_s": round(run_s, 3)},
        "mesh": {"vertices": int(vertices), "faces": int(faces)},
        "fallbacks": list(fallbacks),
        "profile": profile,
        "models": {"trellis": trellis_model, "dinov3": dinov3_model},
        "perf": {"residency": residency, "tf32": bool(tf32)},
    }
