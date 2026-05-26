from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional

import yaml

SAFETY_TIERS = frozenset({"mainstream", "developer_preview", "requires_local_policy"})
_DEFAULT_PROFILE_YAML = (
    Path(__file__).resolve().parents[3] / "config" / "model_profiles.yaml"
)


class ProfileRegistryError(Exception):
    pass


@dataclass(frozen=True)
class ModelProfile:
    id: str
    model: str
    quant: str
    safety_tier: str
    purpose: str
    context_size: int
    max_output_tokens: int
    temperature: float
    required_tags: tuple[str, ...]
    preferred_tags: tuple[str, ...]
    notes: Optional[str] = None
    requires_acknowledgement: bool = False

    def is_uncensored(self) -> bool:
        return self.safety_tier == "requires_local_policy"

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "model": self.model,
            "quant": self.quant,
            "safety_tier": self.safety_tier,
            "purpose": self.purpose,
            "context_size": self.context_size,
            "max_output_tokens": self.max_output_tokens,
            "temperature": self.temperature,
            "required_tags": list(self.required_tags),
            "preferred_tags": list(self.preferred_tags),
            "notes": self.notes,
            "requires_acknowledgement": self.requires_acknowledgement,
        }


@dataclass(frozen=True)
class ProfileRegistry:
    schema_version: int
    default_profile: str
    profiles: tuple[ModelProfile, ...]

    def _by_id(self) -> dict[str, ModelProfile]:
        return {p.id: p for p in self.profiles}

    def resolve(self, profile_id: str) -> ModelProfile:
        idx = self._by_id()
        if profile_id not in idx:
            known = sorted(idx)
            raise ProfileRegistryError(
                f"unknown profile_id={profile_id!r}; known={known}"
            )
        return idx[profile_id]

    def safe_default(self) -> ModelProfile:
        return self.resolve(self.default_profile)

    def filter_by_safety(self, allow_uncensored: bool = False) -> tuple[ModelProfile, ...]:
        if allow_uncensored:
            return self.profiles
        return tuple(p for p in self.profiles if not p.is_uncensored())


def _coerce_profile(raw: dict[str, Any]) -> ModelProfile:
    missing = [
        key
        for key in (
            "id",
            "model",
            "quant",
            "safety_tier",
            "purpose",
            "context_size",
            "max_output_tokens",
            "temperature",
            "required_tags",
            "preferred_tags",
        )
        if key not in raw
    ]
    if missing:
        raise ProfileRegistryError(
            f"profile {raw.get('id', '?')!r} missing fields: {missing}"
        )
    safety = str(raw["safety_tier"])
    if safety not in SAFETY_TIERS:
        raise ProfileRegistryError(
            f"profile {raw['id']!r}: invalid safety_tier={safety!r} "
            f"(must be one of {sorted(SAFETY_TIERS)})"
        )
    return ModelProfile(
        id=str(raw["id"]),
        model=str(raw["model"]),
        quant=str(raw["quant"]),
        safety_tier=safety,
        purpose=str(raw["purpose"]),
        context_size=int(raw["context_size"]),
        max_output_tokens=int(raw["max_output_tokens"]),
        temperature=float(raw["temperature"]),
        required_tags=tuple(raw["required_tags"]),
        preferred_tags=tuple(raw["preferred_tags"]),
        notes=raw.get("notes"),
        requires_acknowledgement=bool(raw.get("requires_acknowledgement", False)),
    )


def load_registry(path: Optional[Path] = None) -> ProfileRegistry:
    yaml_path = Path(path) if path is not None else _DEFAULT_PROFILE_YAML
    if not yaml_path.exists():
        raise ProfileRegistryError(f"profile registry not found: {yaml_path}")
    with yaml_path.open(encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    if int(data.get("schema_version", 0)) != 1:
        raise ProfileRegistryError(
            f"unsupported model_profiles schema_version={data.get('schema_version')} (this build expects 1)"
        )
    raw_profiles = data.get("profiles") or []
    profiles: list[ModelProfile] = []
    seen: set[str] = set()
    for raw in raw_profiles:
        profile = _coerce_profile(raw)
        if profile.id in seen:
            raise ProfileRegistryError(f"duplicate profile id: {profile.id}")
        seen.add(profile.id)
        profiles.append(profile)
    default_profile = str(data.get("default_profile", ""))
    if default_profile not in seen:
        raise ProfileRegistryError(
            f"default_profile={default_profile!r} not defined in profiles"
        )
    default_entry = next(p for p in profiles if p.id == default_profile)
    if default_entry.is_uncensored():
        raise ProfileRegistryError(
            f"default_profile={default_profile!r} has safety_tier=requires_local_policy; "
            "an uncensored model must not be the default"
        )
    return ProfileRegistry(
        schema_version=1,
        default_profile=default_profile,
        profiles=tuple(profiles),
    )
