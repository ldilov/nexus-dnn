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


def test_list_profiles_returns_eight_sorted() -> None:
    profiles = gp.list_profiles()
    assert len(profiles) == 8
    ids = [p.id for p in profiles]
    assert ids == sorted(ids)
    assert ids == [
        "ltx23-distilled-motion",
        "ltx23-distilled-motion-gothic",
        "ltx23-distilled-multiscene",
        "ltx23-distilled-official-schedule",
        "ltx23-distilled-single",
        "ltxv2-distilled-q4",
        "ltxv2-distilled-q4-quality",
        "ltxv2-multiscene",
    ]


def test_list_profiles_filters_by_architecture() -> None:
    ltxv2 = gp.list_profiles(architecture="ltxv2")
    assert [p.id for p in ltxv2] == [
        "ltxv2-distilled-q4",
        "ltxv2-distilled-q4-quality",
        "ltxv2-multiscene",
    ]
    ltxv097 = gp.list_profiles(architecture="ltxv097")
    assert len(ltxv097) == 5
    assert all(p.architecture == "ltxv097" for p in ltxv097)


def test_list_architectures() -> None:
    assert gp.list_architectures() == ["ltxv097", "ltxv2"]


def test_ltxv2_profile_fields() -> None:
    profile = gp.get_profile("ltxv2-distilled-q4")
    assert profile is not None
    assert profile.architecture == "ltxv2"
    assert profile.sampling["num_inference_steps"] == 8
    assert profile.sampling["guidance_scale"] == 1.0
    assert profile.render["width"] == 768
    assert profile.render["height"] == 512


def test_ltxv2_distilled_q4_retuned_for_i2v() -> None:
    profile = gp.get_profile("ltxv2-distilled-q4")
    assert profile is not None
    assert profile.render["path"] == "single"
    assert profile.render["frames"] == 105
    assert profile.render["base_fps"] == 16
    assert profile.render["output_fps"] == 32
    assert (profile.render["frames"] - 1) % 8 == 0
    assert profile.render["output_fps"] == 2 * profile.render["base_fps"]


def test_ltxv2_quality_profile_runs_uncond_branch() -> None:
    profile = gp.get_profile("ltxv2-distilled-q4-quality")
    assert profile is not None
    assert profile.architecture == "ltxv2"
    assert profile.sampling["guidance_scale"] == 1.1
    assert profile.sampling["guidance_scale"] > 1.0
    assert profile.render["path"] == "single"
    assert profile.render["frames"] == 105


def test_ltxv2_multiscene_profile_drives_manual_stitch() -> None:
    profile = gp.get_profile("ltxv2-multiscene")
    assert profile is not None
    assert profile.architecture == "ltxv2"
    assert profile.render["path"] == "manual_stitch"
    assert profile.render["condition_tail_frames"] == 3
    assert 0.0 < profile.render["condition_strength"] <= 1.0
    assert profile.render["color_anchor"] is True
    assert profile.render["frames"] == 105


def test_motion_profiles_declare_motion_prompts() -> None:
    for profile_id in ("ltx23-distilled-motion", "ltx23-distilled-motion-gothic"):
        profile = gp.get_profile(profile_id)
        assert profile is not None
        assert profile.render["motion_prompts"] is True


def test_non_motion_profiles_lack_motion_prompts() -> None:
    for profile_id in (
        "ltx23-distilled-single",
        "ltx23-distilled-multiscene",
        "ltx23-distilled-official-schedule",
    ):
        profile = gp.get_profile(profile_id)
        assert profile is not None
        assert not profile.render.get("motion_prompts")


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
