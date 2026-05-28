"""Named scene-preset catalog for multi-scene composition.

A ScenePreset is a saved, named bundle:

* prompts + per-scene motion + duration
* optional transitions[] with bridge text (S1 semantics)
* a recommended OutputProfile (720p / 1080p) for the render target
* optional default i2v anchor image path
* quality_status (draft / validated / preferred / deprecated)
* tags + provenance dates

Presets are stored as JSON files under the extension's ``scene_presets/``
directory; they are loaded at import time from disk so an operator can
add a new preset by dropping a new ``.json`` and restarting the worker.
The UI consumes the catalog via the JSON-RPC handler
``longcat.video.scene_presets.list``.

This module is render-pipeline-independent (no torch, no numpy) and
import-cheap. ``resolution_presets.ResolutionPreset`` and
``output_profiles.OutputProfile`` cover orthogonal concepts — draft-only
ladders and final-output targets respectively — and intentionally
coexist with scene presets.
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path
from typing import Any, Optional

SCENE_PRESET_SCHEMA_VERSION = 1

QUALITY_STATUSES = ("draft", "validated", "preferred", "deprecated")
MODES = ("t2v", "i2v")
RECOMMENDED_OUTPUT_PROFILES = ("720p", "1080p")

_log = logging.getLogger("longcat.scene_presets")

_PRESET_DIR = (
    Path(__file__).resolve().parents[3] / "scene_presets"
)


class ScenePresetError(Exception):
    pass


@dataclass(frozen=True)
class ScenePresetSceneEntry:
    prompt: str
    duration_seconds: float
    motion_intensity: str = "dynamic"

    def to_dict(self) -> dict[str, Any]:
        return {
            "prompt": self.prompt,
            "duration_seconds": self.duration_seconds,
            "motion_intensity": self.motion_intensity,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ScenePresetSceneEntry":
        return cls(
            prompt=str(data["prompt"]),
            duration_seconds=float(data["duration_seconds"]),
            motion_intensity=str(data.get("motion_intensity", "dynamic")),
        )


@dataclass(frozen=True)
class ScenePresetTransitionEntry:
    type: str = "hard_cut"
    bridge_text: Optional[str] = None
    ramp_frames: int = 8

    def to_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "type": self.type,
            "ramp_frames": self.ramp_frames,
        }
        if self.bridge_text is not None:
            out["bridge_text"] = self.bridge_text
        return out

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ScenePresetTransitionEntry":
        return cls(
            type=str(data.get("type", "hard_cut")),
            bridge_text=data.get("bridge_text"),
            ramp_frames=int(data.get("ramp_frames", 8)),
        )


@dataclass(frozen=True)
class ScenePreset:
    name: str
    label: str
    scenes: tuple[ScenePresetSceneEntry, ...]
    transitions: tuple[ScenePresetTransitionEntry, ...] = ()
    description: str = ""
    quality_status: str = "draft"
    default_mode: str = "t2v"
    default_image_path: Optional[str] = None
    recommended_output_profile: str = "720p"
    tags: tuple[str, ...] = field(default_factory=tuple)
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    schema_version: int = SCENE_PRESET_SCHEMA_VERSION

    def to_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "schema_version": self.schema_version,
            "name": self.name,
            "label": self.label,
            "description": self.description,
            "quality_status": self.quality_status,
            "default_mode": self.default_mode,
            "default_image_path": self.default_image_path,
            "recommended_output_profile": self.recommended_output_profile,
            "scenes": [s.to_dict() for s in self.scenes],
            "transitions": [t.to_dict() for t in self.transitions],
            "tags": list(self.tags),
        }
        if self.created_at is not None:
            out["created_at"] = self.created_at
        if self.updated_at is not None:
            out["updated_at"] = self.updated_at
        return out


def _validate_preset_dict(data: dict[str, Any]) -> ScenePreset:
    """Build + validate a ScenePreset from a JSON-decoded dict.

    Raises ScenePresetError with a human-readable message on any contract
    violation. The validator is intentionally narrow — JSON-schema-level
    structural checks; deeper checks (e.g. transition count == scenes-1)
    are deferred to plan_validate when the preset is used in a render.
    """
    version = int(data.get("schema_version", 0))
    if version != SCENE_PRESET_SCHEMA_VERSION:
        raise ScenePresetError(
            f"schema_version={version} not supported (expected {SCENE_PRESET_SCHEMA_VERSION})"
        )

    name = data.get("name")
    if not isinstance(name, str) or not name:
        raise ScenePresetError("name must be a non-empty string")

    label = data.get("label")
    if not isinstance(label, str) or not label:
        raise ScenePresetError(f"preset {name!r}: label must be a non-empty string")

    quality_status = str(data.get("quality_status", "draft"))
    if quality_status not in QUALITY_STATUSES:
        raise ScenePresetError(
            f"preset {name!r}: quality_status={quality_status!r} not in {QUALITY_STATUSES}"
        )

    default_mode = str(data.get("default_mode", "t2v"))
    if default_mode not in MODES:
        raise ScenePresetError(
            f"preset {name!r}: default_mode={default_mode!r} not in {MODES}"
        )

    recommended_output_profile = str(data.get("recommended_output_profile", "720p"))
    if recommended_output_profile not in RECOMMENDED_OUTPUT_PROFILES:
        raise ScenePresetError(
            f"preset {name!r}: recommended_output_profile={recommended_output_profile!r} "
            f"not in {RECOMMENDED_OUTPUT_PROFILES}"
        )

    scenes_raw = data.get("scenes")
    if not isinstance(scenes_raw, list) or not scenes_raw:
        raise ScenePresetError(f"preset {name!r}: scenes must be a non-empty list")
    scenes = tuple(ScenePresetSceneEntry.from_dict(s) for s in scenes_raw)

    transitions_raw = data.get("transitions") or []
    transitions = tuple(
        ScenePresetTransitionEntry.from_dict(t) for t in transitions_raw
    )
    if transitions and len(transitions) != len(scenes) - 1:
        raise ScenePresetError(
            f"preset {name!r}: transitions length {len(transitions)} != "
            f"scenes-1 ({len(scenes) - 1})"
        )

    tags_raw = data.get("tags") or []
    tags = tuple(str(t) for t in tags_raw)

    return ScenePreset(
        schema_version=version,
        name=name,
        label=label,
        description=str(data.get("description", "")),
        quality_status=quality_status,
        default_mode=default_mode,
        default_image_path=data.get("default_image_path"),
        recommended_output_profile=recommended_output_profile,
        scenes=scenes,
        transitions=transitions,
        tags=tags,
        created_at=data.get("created_at"),
        updated_at=data.get("updated_at"),
    )


def load_preset_file(path: Path) -> ScenePreset:
    """Load + validate a single preset JSON file. Raises ScenePresetError."""
    try:
        with path.open(encoding="utf-8") as fh:
            data = json.load(fh)
    except (OSError, json.JSONDecodeError) as exc:
        raise ScenePresetError(f"{path}: failed to read/parse: {exc}") from exc
    if not isinstance(data, dict):
        raise ScenePresetError(f"{path}: top-level JSON must be an object")
    return _validate_preset_dict(data)


@lru_cache(maxsize=1)
def _load_catalog_cached() -> tuple[ScenePreset, ...]:
    if not _PRESET_DIR.exists():
        _log.warning("scene_presets: directory %s does not exist", _PRESET_DIR)
        return ()
    presets: list[ScenePreset] = []
    for path in sorted(_PRESET_DIR.glob("*.json")):
        try:
            presets.append(load_preset_file(path))
        except ScenePresetError as exc:
            _log.warning("scene_presets: skipping %s: %s", path.name, exc)
    return tuple(presets)


def list_presets() -> tuple[ScenePreset, ...]:
    """Return the immutable catalog in filename-sorted order. Cached."""
    return _load_catalog_cached()


def list_preset_names() -> tuple[str, ...]:
    return tuple(p.name for p in list_presets())


def get_preset(name: str) -> ScenePreset:
    """Return the preset with the given ``name`` or raise ``ScenePresetError``."""
    by_name = {p.name: p for p in list_presets()}
    if name not in by_name:
        raise ScenePresetError(
            f"unknown scene preset {name!r}; choose from {sorted(by_name.keys())}"
        )
    return by_name[name]


def list_presets_payload() -> dict[str, Any]:
    """JSON-serializable payload used by the RPC handler and the UI.

    Shape:
        {
          "schema_version": 1,
          "presets": [<ScenePreset.to_dict()>, ...],
          "count": <int>
        }
    """
    presets = list_presets()
    return {
        "schema_version": SCENE_PRESET_SCHEMA_VERSION,
        "presets": [p.to_dict() for p in presets],
        "count": len(presets),
    }


def reload_catalog() -> int:
    """Clear the LRU cache so a freshly-added JSON file is picked up.

    Returns the new catalog size. Used by operators while iterating on
    preset authoring; production deployments restart the worker.
    """
    _load_catalog_cached.cache_clear()
    return len(list_presets())
