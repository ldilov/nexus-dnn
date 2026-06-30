"""metadata_json builder — single source of truth for the frozen metadata shape.

Both backends call build_metadata so the host/shim/web see an identical schema
regardless of profile (only the values differ). Shape matches the frozen
contract 1:1 except the `models` block (FLAME/ArcFace/Arc2Avatar).
"""
from __future__ import annotations

from typing import Any

MODEL_FLAME = "FLAME-2020"
MODEL_ARCFACE = "deepinsight/insightface"
MODEL_ARC2AVATAR = "Arc2Avatar"


def build_metadata(
    *,
    profile: str,
    operator: str,
    attention_backend: str,
    compute_cap: str,
    native_sm121: bool,
    load_s: float,
    run_s: float,
    vertices: int,
    faces: int,
    fallbacks: list[str],
    flame_model: str = MODEL_FLAME,
    arcface_model: str = MODEL_ARCFACE,
    arc2avatar_model: str = MODEL_ARC2AVATAR,
    residency: str = "balanced",
    tf32: bool = True,
    extra: dict[str, Any] | None = None,
) -> dict[str, Any]:
    meta: dict[str, Any] = {
        "operator": operator,
        "attention_backend": attention_backend,
        "compute_cap": compute_cap,
        "native_sm121": native_sm121,
        "stage_timings": {"load_s": round(load_s, 3), "run_s": round(run_s, 3)},
        "mesh": {"vertices": int(vertices), "faces": int(faces)},
        "fallbacks": list(fallbacks),
        "profile": profile,
        "models": {
            "flame": flame_model,
            "arcface": arcface_model,
            "arc2avatar": arc2avatar_model,
        },
        "perf": {"residency": residency, "tf32": bool(tf32)},
    }
    if extra:
        meta.update(extra)
    return meta
