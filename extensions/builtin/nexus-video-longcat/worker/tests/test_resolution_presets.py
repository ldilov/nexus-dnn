from __future__ import annotations

import pytest

from longcat_video_worker.resolution_presets import (
    PRESETS,
    ResolutionPreset,
    find_nearest_preset,
    get_preset,
    list_preset_names,
)


def test_preset_count_and_names() -> None:
    assert len(PRESETS) == 4
    assert list_preset_names() == ("fast", "standard", "high", "max-native")


def test_get_preset_returns_expected_geometry() -> None:
    fast = get_preset("fast")
    assert (fast.height, fast.width, fast.num_frames) == (384, 672, 49)
    standard = get_preset("standard")
    assert (standard.height, standard.width, standard.num_frames) == (480, 832, 93)
    high = get_preset("high")
    assert (high.height, high.width, high.num_frames) == (576, 1024, 93)
    max_native = get_preset("max-native")
    assert (max_native.height, max_native.width, max_native.num_frames) == (720, 1280, 93)


def test_get_preset_unknown_raises() -> None:
    with pytest.raises(ValueError, match="unknown resolution preset"):
        get_preset("ultra")


def test_recommended_swap_monotonic() -> None:
    swaps = [p.recommended_swap for p in PRESETS]
    assert swaps == sorted(swaps)


def test_all_num_frames_satisfy_4n_plus_1() -> None:
    for preset in PRESETS:
        assert (preset.num_frames - 1) % 4 == 0, f"{preset.name} violates 4n+1"


def test_find_nearest_preset_exact_matches() -> None:
    for preset in PRESETS:
        nearest = find_nearest_preset(preset.height, preset.width)
        assert nearest is not None
        assert nearest.name == preset.name


def test_find_nearest_preset_close_match() -> None:
    nearest = find_nearest_preset(512, 896)
    assert nearest is not None
    assert nearest.name in ("standard", "high")


def test_find_nearest_preset_invalid_input_returns_none() -> None:
    assert find_nearest_preset(0, 0) is None
    assert find_nearest_preset(-1, 100) is None


def test_preset_is_immutable_namedtuple() -> None:
    p = get_preset("fast")
    assert isinstance(p, ResolutionPreset)
    with pytest.raises(AttributeError):
        p.height = 999
