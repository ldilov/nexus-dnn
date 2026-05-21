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
    architecture: str = "ltxv097"


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
    "ltx23-distilled-motion": GenerationProfile(
        id="ltx23-distilled-motion",
        name="Distilled — motion (realistic)",
        description=(
            "Distilled 13B with the motion prompt set (anti-static negative + "
            "prepended motion-cue system prompt, no locked-off camera) at CFG "
            "1.25. Photorealistic, visibly animated character motion."
        ),
        sampling={"num_inference_steps": 8, "guidance_scale": 1.25},
        render={
            "path": "manual_stitch",
            "color_anchor": True,
            "segments": 4,
            "motion_prompts": True,
        },
        status="proven",
        min_vram_gib=14,
    ),
    "ltx23-distilled-motion-gothic": GenerationProfile(
        id="ltx23-distilled-motion-gothic",
        name="Distilled — motion (gothic, stylized)",
        description=(
            "Distilled 13B motion prompt set at CFG 5.0 with 16 sampling "
            "steps (above the checkpoint's ~8-step design point — GPU-proven "
            "to stay coherent here). High-contrast, stylized, dramatic look "
            "— deliberately over-saturated. Roughly 2x render time."
        ),
        sampling={"num_inference_steps": 16, "guidance_scale": 5.0},
        render={
            "path": "manual_stitch",
            "color_anchor": True,
            "segments": 4,
            "motion_prompts": True,
        },
        status="proven",
        min_vram_gib=14,
    ),
    "ltxv2-distilled-q4": GenerationProfile(
        id="ltxv2-distilled-q4",
        name="LTX-2 19B distilled — Q4 single clip (i2v)",
        description=(
            "LTX-2 19B distilled, Kijai Q4_K_M GGUF transformer. 8 steps, "
            "guidance 1.0, LTX-2 distilled sigma schedule. Image-to-video "
            "primary path: input image -> 105-frame 768x512 clip at 16 fps "
            "base, RIFE-interpolated to 32 fps, esrgan-upscaled to 720p. "
            "Separate Gemma-3-12B prompt encode then unload, then "
            "transformer + connector."
        ),
        sampling={
            "num_inference_steps": 8,
            "guidance_scale": 1.0,
            "sigmas": "distilled",
        },
        render={
            "path": "single",
            "width": 768,
            "height": 512,
            "frames": 105,
            "base_fps": 16,
            "output_fps": 32,
        },
        status="experimental",
        min_vram_gib=16,
        architecture="ltxv2",
    ),
    "ltxv2-distilled-q4-quality": GenerationProfile(
        id="ltxv2-distilled-q4-quality",
        name="LTX-2 19B distilled — Q4 quality (negative-prompt live)",
        description=(
            "LTX-2 19B distilled at guidance 1.1 — the uncond branch runs, "
            "so the builtin negative prompt applies. Otherwise identical to "
            "ltxv2-distilled-q4. Roughly 2x denoise cost for the second "
            "(uncond) transformer forward per step."
        ),
        sampling={
            "num_inference_steps": 8,
            "guidance_scale": 1.1,
            "sigmas": "distilled",
        },
        render={
            "path": "single",
            "width": 768,
            "height": 512,
            "frames": 105,
            "base_fps": 16,
            "output_fps": 32,
        },
        status="experimental",
        min_vram_gib=16,
        architecture="ltxv2",
    ),
    "ltxv2-multiscene": GenerationProfile(
        id="ltxv2-multiscene",
        name="LTX-2 19B distilled — multi-scene continuation",
        description=(
            "LTX-2 19B distilled multi-scene continuation. 2-3 scenes, each "
            "a 105-frame 768x512 i2v render where scene N continues scene "
            "N-1 via a 3-frame latent tail carried as a reference-latent "
            "condition. apply_seam cleans each boundary; the 19B transformer "
            "stays warm across all scenes."
        ),
        sampling={
            "num_inference_steps": 8,
            "guidance_scale": 1.0,
            "sigmas": "distilled",
        },
        render={
            "path": "manual_stitch",
            "width": 768,
            "height": 512,
            "frames": 105,
            "base_fps": 16,
            "output_fps": 32,
            "condition_strength": 0.5,
            "condition_tail_frames": 3,
            "color_anchor": True,
        },
        status="experimental",
        min_vram_gib=16,
        architecture="ltxv2",
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


def list_profiles(architecture: str | None = None) -> list[GenerationProfile]:
    profiles = _PROFILES.values()
    if architecture is not None:
        profiles = [p for p in profiles if p.architecture == architecture]
    return sorted(profiles, key=lambda p: p.id)


def list_architectures() -> list[str]:
    return sorted({p.architecture for p in _PROFILES.values()})


def profile_sampling(key: str | None) -> dict[str, Any]:
    profile = get_profile(key)
    return dict(profile.sampling) if profile else {}
