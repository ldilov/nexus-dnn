"""Spec 034 US5 / T105 — Python-side model-family registry.

Mirrors the Rust-side ``families`` module: loads every
``recipes/families/*.yaml`` descriptor and exposes them for the
``family.list`` / ``family.switch`` RPC handlers.

The Python side is intentionally read-mostly — the Rust shim is the
source of truth for what's installed (it reconciles against the host
model-store). The Python FamilyLoader is here so the worker can
confirm a family_id against the same YAML set the host sees, load the
right adapter shim, and clear the speaker cache on switch.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml


DEFAULT_FAMILY_ID = "indextts-2"


@dataclass(frozen=True)
class FamilyDescriptor:
    family_id: str
    display_name: str
    model_family_ref: str
    engine_version_constraint: str
    supported_languages: tuple[str, ...] = field(default_factory=tuple)
    expected_artifacts: tuple[str, ...] = field(default_factory=tuple)
    default_generation: dict[str, Any] = field(default_factory=dict)


class FamilyLoader:
    """Discovers family descriptors under a ``recipes/families/`` directory."""

    def __init__(self, descriptors: list[FamilyDescriptor], active_family_id: str = DEFAULT_FAMILY_ID) -> None:
        self._descriptors = list(descriptors)
        self._by_id = {d.family_id: d for d in descriptors}
        if active_family_id not in self._by_id and descriptors:
            active_family_id = sorted(self._by_id.keys())[0]
        self._active_family_id = active_family_id

    @classmethod
    def load_from_dir(
        cls,
        directory: Path | str,
        active_family_id: str = DEFAULT_FAMILY_ID,
    ) -> "FamilyLoader":
        path = Path(directory)
        descriptors: list[FamilyDescriptor] = []
        if path.is_dir():
            for entry in sorted(path.iterdir()):
                if entry.suffix.lower() not in {".yaml", ".yml"} or not entry.is_file():
                    continue
                with entry.open("r", encoding="utf-8") as fh:
                    raw = yaml.safe_load(fh) or {}
                descriptors.append(
                    FamilyDescriptor(
                        family_id=str(raw["family_id"]),
                        display_name=str(raw.get("display_name", raw["family_id"])),
                        model_family_ref=str(raw.get("model_family_ref", "")),
                        engine_version_constraint=str(raw.get("engine_version_constraint", "")),
                        supported_languages=tuple(raw.get("supported_languages") or ()),
                        expected_artifacts=tuple(raw.get("expected_artifacts") or ()),
                        default_generation=dict(raw.get("default_generation") or {}),
                    )
                )
        return cls(descriptors, active_family_id=active_family_id)

    @property
    def active_family_id(self) -> str:
        return self._active_family_id

    def set_active_family(self, family_id: str) -> None:
        if family_id not in self._by_id:
            raise KeyError(f"family '{family_id}' is not registered")
        self._active_family_id = family_id

    def descriptors(self) -> tuple[FamilyDescriptor, ...]:
        return tuple(self._descriptors)

    def get(self, family_id: str) -> FamilyDescriptor | None:
        return self._by_id.get(family_id)

    def contains(self, family_id: str) -> bool:
        return family_id in self._by_id

    def wire_list_result(self) -> dict[str, Any]:
        """Mirror the Rust-side `family.list` RPC response shape."""

        return {
            "active_family": self._active_family_id,
            "known_families": [
                {
                    "family_id": d.family_id,
                    "engine_version": d.engine_version_constraint or None,
                    "languages": list(d.supported_languages),
                }
                for d in self._descriptors
            ],
        }
