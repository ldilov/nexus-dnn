from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional

import yaml

SAFETY_TIERS = frozenset({"mainstream", "developer_preview", "requires_local_policy"})
SUPPORTED_SCHEMA_VERSIONS = frozenset({1, 2})
_ULID_RE = __import__("re").compile(r"^[0-9A-HJKMNP-TV-Z]{26}$")


def _looks_like_install_id(value: str) -> bool:
    return bool(_ULID_RE.fullmatch(value)) or value.startswith("inst_")
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
    # Spec 051 D-B (schema_version=2). `n_gpu_layers=None` means "ask the
    # caller's auto-fit"; an explicit integer overrides auto-fit. The
    # value flows to the broker as an opaque int per the spec-050 PR-4
    # `StartParams.n_gpu_layers` contract. -1 = all-layers offload, 0 =
    # CPU only, positive = explicit count.
    n_gpu_layers: Optional[int] = None
    # Source schema version the entry was loaded from. Pre-Spec-051 v1
    # entries default to 1; v2 entries record 2. Lets downstream code
    # branch on schema age without re-reading YAML.
    schema_version: int = 1

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
            "n_gpu_layers": self.n_gpu_layers,
            "schema_version": self.schema_version,
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


def _coerce_profile(raw: dict[str, Any], schema_version: int = 1) -> ModelProfile:
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
    n_gpu_layers_raw = raw.get("n_gpu_layers")
    n_gpu_layers: Optional[int] = (
        int(n_gpu_layers_raw) if n_gpu_layers_raw is not None else None
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
        n_gpu_layers=n_gpu_layers,
        schema_version=schema_version,
    )


def load_registry(path: Optional[Path] = None) -> ProfileRegistry:
    yaml_path = Path(path) if path is not None else _DEFAULT_PROFILE_YAML
    if not yaml_path.exists():
        raise ProfileRegistryError(f"profile registry not found: {yaml_path}")
    with yaml_path.open(encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    schema_version_raw = data.get("schema_version", 0)
    try:
        schema_version = int(schema_version_raw)
    except (TypeError, ValueError):
        raise ProfileRegistryError(
            f"non-integer schema_version={schema_version_raw!r}"
        )
    if schema_version not in SUPPORTED_SCHEMA_VERSIONS:
        raise ProfileRegistryError(
            f"unsupported model_profiles schema_version={schema_version} "
            f"(this build accepts {sorted(SUPPORTED_SCHEMA_VERSIONS)})"
        )
    raw_profiles = data.get("profiles") or []
    profiles: list[ModelProfile] = []
    seen: set[str] = set()
    for raw in raw_profiles:
        profile = _coerce_profile(raw, schema_version=schema_version)
        if profile.id in seen:
            raise ProfileRegistryError(f"duplicate profile id: {profile.id}")
        # SECURITY B1: profile ids MUST be model-slug-style, never a host
        # runtime_install_id (ULID). An install-id key would couple the
        # extension config to host-owned identity. Reject any id that
        # parses as ULID-shaped (26 chars, Crockford base32).
        if _looks_like_install_id(profile.id):
            raise ProfileRegistryError(
                f"profile id {profile.id!r} looks like a host install id (ULID); "
                "profiles MUST use model slugs"
            )
        seen.add(profile.id)
        profiles.append(profile)
    default_profile = str(data.get("default_profile", ""))
    if default_profile not in seen:
        raise ProfileRegistryError(
            f"default_profile={default_profile!r} not defined in profiles"
        )
    default_entry = next(p for p in profiles if p.id == default_profile)
    if default_entry.safety_tier != "mainstream":
        raise ProfileRegistryError(
            f"default_profile={default_profile!r} has safety_tier={default_entry.safety_tier!r}; "
            "only mainstream profiles may be the default"
        )
    return ProfileRegistry(
        schema_version=schema_version,
        default_profile=default_profile,
        profiles=tuple(profiles),
    )
