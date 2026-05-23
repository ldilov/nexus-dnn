"""Smoke tests for the LongCat-Video worker scaffold."""

from __future__ import annotations

import pytest

from longcat_video_worker import __version__
from longcat_video_worker.profiles import PROFILES, get_profile
from longcat_video_worker.pipeline_longcat import LongCatRenderRequest


def test_version_string() -> None:
    assert __version__ == "0.1.0"


def test_profiles_registered() -> None:
    ids = {p.profile_id for p in PROFILES}
    assert ids == {"rtx50-fp8", "rtx50-fp8-distill", "fake"}


def test_fake_profile_lookup() -> None:
    p = get_profile("fake")
    assert p.quantization == "fake"
    assert p.runtime_id == "nexus.video.longcat.fake"


def test_unknown_profile_raises() -> None:
    with pytest.raises(KeyError, match="unknown LongCat profile"):
        get_profile("does-not-exist")


def test_distill_profile_uses_cfg_1() -> None:
    p = get_profile("rtx50-fp8-distill")
    assert p.use_distill is True
    assert p.guidance_scale == 1.0
    assert p.num_inference_steps == 12


def test_render_request_construct() -> None:
    req = LongCatRenderRequest(mode="i2v", prompt="hello", image_path="/tmp/x.png")
    assert req.height == 480
    assert req.width == 832
    assert req.num_frames == 93
