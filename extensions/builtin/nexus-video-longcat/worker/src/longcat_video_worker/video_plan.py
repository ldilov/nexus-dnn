from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any, Optional

SCHEMA_VERSION = 1

_SCHEMA_DIR = Path(__file__).resolve().parents[3] / "schemas"
_PLAN_SCHEMA_PATH = _SCHEMA_DIR / "longcat_video_plan.schema.json"
_SCENE_SCHEMA_PATH = _SCHEMA_DIR / "scene_prompt_packet.schema.json"
_ADAIN_SCHEMA_PATH = _SCHEMA_DIR / "adain_style_packet.schema.json"


@dataclass(frozen=True)
class ScenePromptPacket:
    prompt: str
    per_scene_generated_seconds: float
    overlap_frames: int
    motion_intensity: str
    adain_factor: float
    mode: str
    negative_prompt: Optional[str] = None

    def to_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "prompt": self.prompt,
            "per_scene_generated_seconds": self.per_scene_generated_seconds,
            "overlap_frames": self.overlap_frames,
            "motion_intensity": self.motion_intensity,
            "adain_factor": self.adain_factor,
            "mode": self.mode,
        }
        if self.negative_prompt is not None:
            out["negative_prompt"] = self.negative_prompt
        return out

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ScenePromptPacket":
        return cls(
            prompt=str(data["prompt"]),
            per_scene_generated_seconds=float(data["per_scene_generated_seconds"]),
            overlap_frames=int(data["overlap_frames"]),
            motion_intensity=str(data["motion_intensity"]),
            adain_factor=float(data["adain_factor"]),
            mode=str(data["mode"]),
            negative_prompt=data.get("negative_prompt"),
        )


@dataclass(frozen=True)
class ContinuityPacket:
    identity_anchors: tuple[str, ...] = ()
    clothing_anchors: tuple[str, ...] = ()
    persistent_objects: tuple[str, ...] = ()
    locked_rules: tuple[str, ...] = ()

    def to_dict(self) -> dict[str, Any]:
        return {
            "identity_anchors": list(self.identity_anchors),
            "clothing_anchors": list(self.clothing_anchors),
            "persistent_objects": list(self.persistent_objects),
            "locked_rules": list(self.locked_rules),
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ContinuityPacket":
        return cls(
            identity_anchors=tuple(data.get("identity_anchors", []) or []),
            clothing_anchors=tuple(data.get("clothing_anchors", []) or []),
            persistent_objects=tuple(data.get("persistent_objects", []) or []),
            locked_rules=tuple(data.get("locked_rules", []) or []),
        )

    def is_empty(self) -> bool:
        return not (
            self.identity_anchors
            or self.clothing_anchors
            or self.persistent_objects
            or self.locked_rules
        )


@dataclass(frozen=True)
class StylePacket:
    lighting: Optional[str] = None
    lens: Optional[str] = None
    palette: Optional[str] = None
    register: Optional[str] = None

    def to_dict(self) -> dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "StylePacket":
        return cls(
            lighting=data.get("lighting"),
            lens=data.get("lens"),
            palette=data.get("palette"),
            register=data.get("register"),
        )

    def is_empty(self) -> bool:
        return not (self.lighting or self.lens or self.palette or self.register)


@dataclass(frozen=True)
class AdaINOverride:
    scene_index: int
    factor: float

    def to_dict(self) -> dict[str, Any]:
        return {"scene_index": self.scene_index, "factor": self.factor}


@dataclass(frozen=True)
class AdaINStylePacket:
    reference_scene_index: int
    default_factor: float
    per_scene_overrides: tuple[AdaINOverride, ...] = ()

    def to_dict(self) -> dict[str, Any]:
        return {
            "schema_version": SCHEMA_VERSION,
            "reference_scene_index": self.reference_scene_index,
            "default_factor": self.default_factor,
            "per_scene_overrides": [o.to_dict() for o in self.per_scene_overrides],
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "AdaINStylePacket":
        overrides = tuple(
            AdaINOverride(
                scene_index=int(o["scene_index"]),
                factor=float(o["factor"]),
            )
            for o in data.get("per_scene_overrides", []) or []
        )
        return cls(
            reference_scene_index=int(data["reference_scene_index"]),
            default_factor=float(data["default_factor"]),
            per_scene_overrides=overrides,
        )


@dataclass(frozen=True)
class InterpolationPlan:
    enabled: bool = False
    target_fps: Optional[int] = None
    method: str = "none"

    def to_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {"enabled": self.enabled, "method": self.method}
        if self.target_fps is not None:
            out["target_fps"] = self.target_fps
        return out

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "InterpolationPlan":
        return cls(
            enabled=bool(data.get("enabled", False)),
            target_fps=data.get("target_fps"),
            method=str(data.get("method", "none")),
        )


@dataclass(frozen=True)
class PlanWarningEntry:
    code: str
    detail: str
    scene_index: Optional[int] = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "code": self.code,
            "scene_index": self.scene_index,
            "detail": self.detail,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "PlanWarningEntry":
        return cls(
            code=str(data["code"]),
            detail=str(data["detail"]),
            scene_index=data.get("scene_index"),
        )


@dataclass(frozen=True)
class PlanSource:
    compiler: Optional[str] = None
    llm_model: Optional[str] = None
    llm_profile: Optional[str] = None

    def to_dict(self) -> dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "PlanSource":
        return cls(
            compiler=data.get("compiler"),
            llm_model=data.get("llm_model"),
            llm_profile=data.get("llm_profile"),
        )

    def is_empty(self) -> bool:
        return not (self.compiler or self.llm_model or self.llm_profile)


@dataclass(frozen=True)
class VideoPlan:
    classification: str
    anchor: str
    scenes: tuple[ScenePromptPacket, ...]
    continuity: ContinuityPacket = field(default_factory=ContinuityPacket)
    style: StylePacket = field(default_factory=StylePacket)
    adain: Optional[AdaINStylePacket] = None
    interpolation: InterpolationPlan = field(default_factory=InterpolationPlan)
    warnings: tuple[PlanWarningEntry, ...] = ()
    source: PlanSource = field(default_factory=PlanSource)

    def to_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "schema_version": SCHEMA_VERSION,
            "classification": self.classification,
            "anchor": self.anchor,
            "scenes": [s.to_dict() for s in self.scenes],
        }
        if not self.continuity.is_empty():
            out["continuity"] = self.continuity.to_dict()
        if not self.style.is_empty():
            out["style"] = self.style.to_dict()
        if self.adain is not None:
            out["adain"] = self.adain.to_dict()
        if self.interpolation.enabled or self.interpolation.method != "none":
            out["interpolation"] = self.interpolation.to_dict()
        if self.warnings:
            out["warnings"] = [w.to_dict() for w in self.warnings]
        if not self.source.is_empty():
            out["source"] = self.source.to_dict()
        return out

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "VideoPlan":
        # Default to 0 so an absent schema_version surfaces as a version
        # mismatch instead of silently loading a partial / corrupted blob
        # as if it were current. Producers MUST stamp schema_version.
        version = int(data.get("schema_version", 0))
        if version != SCHEMA_VERSION:
            raise ValueError(
                f"VideoPlan schema_version={version} not supported (this build expects {SCHEMA_VERSION})"
            )
        scenes = tuple(ScenePromptPacket.from_dict(s) for s in data["scenes"])
        return cls(
            classification=str(data["classification"]),
            anchor=str(data["anchor"]),
            scenes=scenes,
            continuity=ContinuityPacket.from_dict(data.get("continuity", {}) or {}),
            style=StylePacket.from_dict(data.get("style", {}) or {}),
            adain=(
                AdaINStylePacket.from_dict(data["adain"])
                if data.get("adain")
                else None
            ),
            interpolation=InterpolationPlan.from_dict(data.get("interpolation", {}) or {}),
            warnings=tuple(
                PlanWarningEntry.from_dict(w) for w in data.get("warnings", []) or []
            ),
            source=PlanSource.from_dict(data.get("source", {}) or {}),
        )


def load_plan_schema() -> dict[str, Any]:
    with _PLAN_SCHEMA_PATH.open(encoding="utf-8") as fh:
        return json.load(fh)


def load_scene_schema() -> dict[str, Any]:
    with _SCENE_SCHEMA_PATH.open(encoding="utf-8") as fh:
        return json.load(fh)


def load_adain_schema() -> dict[str, Any]:
    with _ADAIN_SCHEMA_PATH.open(encoding="utf-8") as fh:
        return json.load(fh)
