from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class GenerationProfile:
    id: str
    name: str
    description: str
    sampling: dict[str, Any]
    render: dict[str, Any]
    status: str
    min_vram_gib: int


_PROFILES: dict[str, GenerationProfile] = {
    "ltx23-distilled-single": GenerationProfile(
        id="ltx23-distilled-single",
        name="Distilled — single clip",
        description=(
            "LTX-Video 0.9.7 distilled 13B, 8 steps, guidance 1.0. Fast "
            "single short clip; the operator-confirmed baseline."
        ),
        sampling={"num_inference_steps": 8, "guidance_scale": 1.0},
        render={"path": "single"},
        status="proven",
        min_vram_gib=12,
    ),
    "ltx23-distilled-multiscene": GenerationProfile(
        id="ltx23-distilled-multiscene",
        name="Distilled — 20s multi-scene",
        description=(
            "Distilled 13B multi-segment continuation (manual last-frame+tail "
            "stitch) with cross-segment colour/HF drift anchor. GPU-proven for "
            "a 4-segment ~20s two-scene video."
        ),
        sampling={
            "num_inference_steps": 8,
            "guidance_scale": 1.0,
            "condition_strength": 0.7,
            "image_cond_noise_scale": 0.15,
        },
        render={"path": "manual_stitch", "color_anchor": True, "segments": 4},
        status="proven",
        min_vram_gib=13,
    ),
    "ltx23-distilled-official-schedule": GenerationProfile(
        id="ltx23-distilled-official-schedule",
        name="Distilled — official timestep schedule",
        description=(
            "Distilled 13B with LTX's published distilled timestep schedule "
            "instead of uniform 8 steps. Opt-in quality variant."
        ),
        sampling={
            "num_inference_steps": 8,
            "guidance_scale": 1.0,
            "timestep_schedule": "official",
        },
        render={"path": "single"},
        status="experimental",
        min_vram_gib=12,
    ),
}

_ALIASES: dict[str, str] = {"distilled": "ltx23-distilled-single"}


def resolve_profile_id(key: str | None) -> str | None:
    if not isinstance(key, str):
        return None
    norm = key.strip().lower()
    if not norm:
        return None
    if norm in _PROFILES:
        return norm
    return _ALIASES.get(norm)


def get_profile(key: str | None) -> GenerationProfile | None:
    resolved = resolve_profile_id(key)
    return _PROFILES.get(resolved) if resolved else None


def list_profiles() -> list[GenerationProfile]:
    return sorted(_PROFILES.values(), key=lambda p: p.id)


def profile_sampling(key: str | None) -> dict[str, Any]:
    profile = get_profile(key)
    return dict(profile.sampling) if profile else {}
