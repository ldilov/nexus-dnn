from __future__ import annotations

from typing import NamedTuple, Optional


class ResolutionPreset(NamedTuple):
    name: str
    height: int
    width: int
    num_frames: int
    recommended_swap: int
    notes: str


PRESETS: tuple[ResolutionPreset, ...] = (
    ResolutionPreset(
        name="fast",
        height=384,
        width=672,
        num_frames=49,
        recommended_swap=40,
        notes="Iteration preset; ~3 min wall on RTX 5070 Ti 16 GiB with distill",
    ),
    ResolutionPreset(
        name="standard",
        height=480,
        width=832,
        num_frames=93,
        recommended_swap=46,
        notes="Current GPU-validated baseline; ~6 min per scene with distill",
    ),
    ResolutionPreset(
        name="high",
        height=576,
        width=1024,
        num_frames=93,
        recommended_swap=48,
        notes="Native 576p; ~9 min per scene; needs full block swap on 16 GiB",
    ),
    ResolutionPreset(
        name="max-native",
        height=720,
        width=1280,
        num_frames=93,
        recommended_swap=48,
        notes="Native 720p before upscale; requires refinement LoRA off OR 24 GiB headroom",
    ),
)


_BY_NAME: dict[str, ResolutionPreset] = {p.name: p for p in PRESETS}


def get_preset(name: str) -> ResolutionPreset:
    if name not in _BY_NAME:
        raise ValueError(
            f"unknown resolution preset {name!r}; choose from {sorted(_BY_NAME.keys())}"
        )
    return _BY_NAME[name]


def list_preset_names() -> tuple[str, ...]:
    return tuple(p.name for p in PRESETS)


def find_nearest_preset(height: int, width: int) -> Optional[ResolutionPreset]:
    if height <= 0 or width <= 0:
        return None
    target = height * width
    best: Optional[ResolutionPreset] = None
    best_diff = float("inf")
    for preset in PRESETS:
        diff = abs(preset.height * preset.width - target)
        if diff < best_diff:
            best = preset
            best_diff = diff
    return best
