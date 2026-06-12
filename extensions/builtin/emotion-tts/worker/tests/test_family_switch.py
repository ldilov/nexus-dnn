"""T106 — family.switch service tests (spec 034 US5)."""

from __future__ import annotations

from dataclasses import dataclass

import pytest

from emotion_tts_worker.families import FamilyDescriptor, FamilyLoader
from emotion_tts_worker.families.switch import (
    ArtifactStatusProbe,
    FamilyIncompatible,
    FamilyNotInstalled,
    FamilySwitcher,
    build_always_available_probe,
    build_not_installed_probe,
)
from emotion_tts_worker.speaker_cache import SpeakerCacheKey


@dataclass
class _Cache:
    cleared_families: list[str]

    def __init__(self) -> None:
        self.cleared_families = []

    def clear_family(self, family: str) -> int:
        self.cleared_families.append(family)
        return 0


class StubAdapter:
    def __init__(self, initial_family: str = "indextts-2") -> None:
        self._active_family = initial_family
        self._cache = _Cache()
        self.unloaded = 0
        self.set_family_calls: list[str] = []

    def unload(self) -> int:
        self.unloaded += 1
        return 512  # pretend 512 MB was resident

    def set_active_model_family(self, family_id: str) -> None:
        self.set_family_calls.append(family_id)
        self._active_family = family_id

    def clear_speaker_cache_family(self, family: str) -> int:
        return self._cache.clear_family(family)


def build_loader() -> FamilyLoader:
    return FamilyLoader(
        [
            FamilyDescriptor(
                family_id="indextts-2",
                display_name="v2",
                model_family_ref="IndexTeam/IndexTTS-2",
                engine_version_constraint=">=0.1.0",
            ),
            FamilyDescriptor(
                family_id="indextts-2-5",
                display_name="v2.5",
                model_family_ref="IndexTeam/IndexTTS-2.5",
                engine_version_constraint=">=0.2.0",
            ),
        ],
        active_family_id="indextts-2",
    )


def test_switch_to_same_family_is_idempotent_noop():
    loader = build_loader()
    adapter = StubAdapter(initial_family="indextts-2")
    switcher = FamilySwitcher(loader, adapter, build_always_available_probe())

    result = switcher.switch("indextts-2")
    assert not result.switched
    assert result.load_duration_ms == 0
    assert adapter.unloaded == 0
    assert adapter.set_family_calls == []


def test_successful_switch_unloads_clears_cache_and_sets_active():
    loader = build_loader()
    adapter = StubAdapter()
    switcher = FamilySwitcher(loader, adapter, build_always_available_probe())

    result = switcher.switch("indextts-2-5")

    assert result.switched is True
    assert result.vram_delta_mb == 512
    assert result.load_duration_ms >= 0

    assert adapter.unloaded == 1
    assert adapter.set_family_calls == ["indextts-2-5"]
    assert loader.active_family_id == "indextts-2-5"

    # FR-223: both families' cache entries are dropped (old then new).
    assert adapter._cache.cleared_families == ["indextts-2", "indextts-2-5"]


def test_switch_to_not_installed_family_raises():
    loader = build_loader()
    adapter = StubAdapter()
    switcher = FamilySwitcher(loader, adapter, build_not_installed_probe())

    with pytest.raises(FamilyNotInstalled):
        switcher.switch("indextts-2-5")
    # Adapter state must NOT have been mutated on failure.
    assert adapter.unloaded == 0
    assert adapter.set_family_calls == []
    assert loader.active_family_id == "indextts-2"


def test_switch_to_partial_install_surfaces_as_not_installed():
    loader = build_loader()
    adapter = StubAdapter()

    def partial_probe(_family_id: str, _ref: str) -> str:
        return "partial"

    switcher = FamilySwitcher(loader, adapter, partial_probe)
    with pytest.raises(FamilyNotInstalled):
        switcher.switch("indextts-2-5")


def test_switch_to_incompatible_raises():
    loader = build_loader()
    adapter = StubAdapter()

    def incompat_probe(_family_id: str, _ref: str) -> str:
        return "incompatible"

    switcher = FamilySwitcher(loader, adapter, incompat_probe)
    with pytest.raises(FamilyIncompatible):
        switcher.switch("indextts-2-5")


def test_unknown_family_id_raises_incompatible():
    loader = build_loader()
    adapter = StubAdapter()
    switcher = FamilySwitcher(loader, adapter, build_always_available_probe())

    with pytest.raises(FamilyIncompatible):
        switcher.switch("made-up")


def test_switch_uses_model_family_ref_for_probe():
    loader = build_loader()
    adapter = StubAdapter()

    received: list[tuple[str, str]] = []

    def tracking_probe(family_id: str, model_family_ref: str) -> str:
        received.append((family_id, model_family_ref))
        return "available"

    switcher = FamilySwitcher(loader, adapter, tracking_probe)
    switcher.switch("indextts-2-5")
    assert received == [("indextts-2-5", "IndexTeam/IndexTTS-2.5")]


def test_repeated_switch_cycle_keeps_cache_empty_of_both_families():
    loader = build_loader()
    adapter = StubAdapter()
    switcher = FamilySwitcher(loader, adapter, build_always_available_probe())

    switcher.switch("indextts-2-5")
    switcher.switch("indextts-2")
    # Two switches × 2 clears each = 4 clear calls total, alternating
    # family ids across the cycle.
    assert len(adapter._cache.cleared_families) == 4
