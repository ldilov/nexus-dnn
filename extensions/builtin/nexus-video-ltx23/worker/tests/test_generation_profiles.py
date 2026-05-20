"""Registry behaviour for the LTX generation-profile catalog."""

from __future__ import annotations

from typing import Any

import pytest

from ltx_video_worker import generation_profiles as gp


def test_get_profile_by_id() -> None:
    profile = gp.get_profile("ltx23-distilled-single")
    assert profile is not None
    assert profile.id == "ltx23-distilled-single"


def test_get_profile_by_alias() -> None:
    profile = gp.get_profile("distilled")
    assert profile is not None
    assert profile.id == "ltx23-distilled-single"


@pytest.mark.parametrize("key", [None, "", "  ", "unknown", "ltx23-bogus", 123])
def test_get_profile_unknown_returns_none(key: Any) -> None:
    assert gp.get_profile(key) is None


@pytest.mark.parametrize(
    "raw, expected",
    [
        ("ltx23-distilled-single", "ltx23-distilled-single"),
        ("  LTX23-Distilled-Single  ", "ltx23-distilled-single"),
        ("DISTILLED", "ltx23-distilled-single"),
        ("  distilled ", "ltx23-distilled-single"),
        ("ltx23-distilled-official-schedule", "ltx23-distilled-official-schedule"),
        (None, None),
        ("", None),
        ("   ", None),
        ("garbage", None),
        (42, None),
    ],
)
def test_resolve_profile_id_normalization(raw: Any, expected: Any) -> None:
    assert gp.resolve_profile_id(raw) == expected


def test_list_profiles_returns_three_sorted() -> None:
    profiles = gp.list_profiles()
    assert len(profiles) == 3
    ids = [p.id for p in profiles]
    assert ids == sorted(ids)
    assert ids == [
        "ltx23-distilled-multiscene",
        "ltx23-distilled-official-schedule",
        "ltx23-distilled-single",
    ]


def test_profile_sampling_returns_copy() -> None:
    samp = gp.profile_sampling("ltx23-distilled-single")
    assert samp == {"num_inference_steps": 8, "guidance_scale": 1.0}
    samp["num_inference_steps"] = 999
    assert gp.profile_sampling("ltx23-distilled-single")["num_inference_steps"] == 8


def test_profile_sampling_unknown_returns_empty_dict() -> None:
    assert gp.profile_sampling("nope") == {}
    assert gp.profile_sampling(None) == {}


@pytest.mark.parametrize("profile", gp.list_profiles(), ids=lambda p: p.id)
def test_seed_profile_fields_are_populated(profile: gp.GenerationProfile) -> None:
    assert profile.id.strip()
    assert profile.name.strip()
    assert profile.description.strip()
    assert profile.status in {"proven", "experimental"}
    assert profile.min_vram_gib > 0
    assert isinstance(profile.sampling, dict)
    assert isinstance(profile.render, dict)
