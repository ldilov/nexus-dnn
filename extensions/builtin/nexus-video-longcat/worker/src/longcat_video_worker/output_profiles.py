"""End-to-end output profiles for the longcat video pipeline.

Each ``OutputProfile`` bundles the values an operator (or the UI)
needs to pick a final output target without thinking about draft
resolution vs RTX upscale factor vs VRAM budgeting separately:

* ``draft_width / draft_height`` — what the LongCat DiT actually
  renders. Picked to stay inside (or near) the training distribution
  so prompt fidelity is not degraded.
* ``rtx_upscale_scale`` — NVIDIA Maxine VFX VideoSuperRes factor
  applied to the assembled frame stack AFTER all draft + refinement
  work. Combined with the draft dims this fixes the final output
  resolution.
* ``wall_budget_s`` / ``vram_budget_gib`` — recommended ceilings on
  a 16 GiB RTX-class card. The UI surfaces these so the operator
  knows what to expect; the smoke harness uses them as fail-fast
  contract bounds.

This module is render-pipeline-independent and import-cheap (no
torch, no numpy). The smoke script and the RPC handler both pull
the catalog from here so there is exactly one source of truth.

NOTE: ``resolution_presets.ResolutionPreset`` covers a different
concept — DRAFT-only ladders for prompt iteration. Output profiles
are an end-to-end render target. The two coexist intentionally.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class OutputProfile:
    """Pre-baked draft + upscale + budget bundle keyed by final-output name."""

    name: str
    label: str
    draft_width: int
    draft_height: int
    rtx_scale: int
    wall_budget_s: float
    vram_budget_gib: float
    description: str

    @property
    def final_width(self) -> int:
        return self.draft_width * self.rtx_scale

    @property
    def final_height(self) -> int:
        return self.draft_height * self.rtx_scale

    @property
    def aspect_ratio(self) -> str:
        from math import gcd

        g = gcd(self.final_width, self.final_height)
        return f"{self.final_width // g}:{self.final_height // g}"

    def to_dict(self) -> dict[str, Any]:
        return {
            "name": self.name,
            "label": self.label,
            "draft_width": self.draft_width,
            "draft_height": self.draft_height,
            "rtx_scale": self.rtx_scale,
            "final_width": self.final_width,
            "final_height": self.final_height,
            "aspect_ratio": self.aspect_ratio,
            "wall_budget_s": self.wall_budget_s,
            "vram_budget_gib": self.vram_budget_gib,
            "description": self.description,
        }


_PROFILES: tuple[OutputProfile, ...] = (
    OutputProfile(
        name="1080p",
        label="1080p (1920×1080)",
        draft_width=960,
        draft_height=540,
        rtx_scale=2,
        wall_budget_s=4200.0,
        vram_budget_gib=15.5,
        description=(
            "Full HD output. Draft slightly above the LongCat sweet zone (768×448) "
            "so prompt fidelity stays high; RTX Maxine 2x handles the final upscale. "
            "Budget assumes 16 GiB GPU with distill + refinement co-resident."
        ),
    ),
    OutputProfile(
        name="720p",
        label="720p (1280×720)",
        draft_width=640,
        draft_height=360,
        rtx_scale=2,
        wall_budget_s=2700.0,
        vram_budget_gib=14.0,
        description=(
            "True HD output. Draft comfortably inside the LongCat training "
            "distribution; ~30% faster denoise and lower VRAM ceiling than the "
            "1080p profile. Preferred for iteration on prompts or transitions."
        ),
    ),
)


_BY_NAME: dict[str, OutputProfile] = {p.name: p for p in _PROFILES}


def list_profiles() -> tuple[OutputProfile, ...]:
    """Return the immutable profile catalog in display order."""
    return _PROFILES


def list_profile_names() -> tuple[str, ...]:
    return tuple(p.name for p in _PROFILES)


def get_profile(name: str) -> OutputProfile:
    """Return the profile with the given ``name`` or raise ``ValueError``."""
    if name not in _BY_NAME:
        raise ValueError(
            f"unknown output profile {name!r}; choose from {sorted(_BY_NAME.keys())}"
        )
    return _BY_NAME[name]


def list_profiles_payload() -> dict[str, Any]:
    """JSON-serializable payload used by the RPC handler and the UI.

    Shape:
        {
          "schema_version": 1,
          "profiles": [
            {name, label, draft_width, draft_height, rtx_scale,
             final_width, final_height, aspect_ratio,
             wall_budget_s, vram_budget_gib, description},
            ...
          ],
          "default": "1080p"
        }
    """
    return {
        "schema_version": 1,
        "profiles": [p.to_dict() for p in _PROFILES],
        "default": _PROFILES[0].name,
    }
