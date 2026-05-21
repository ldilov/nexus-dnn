"""Unit tests for the spec-048 two-stage distilled pipeline config surface.

The GPU render path (``run_two_stage_denoise``, the LatentUpsampler load)
is exercised by the ``smoke-ltxv2-*`` scripts; these cover the pure
CPU-only config resolution.
"""

from __future__ import annotations

import pytest

torch = pytest.importorskip("torch")

from ltx_video_worker import pipeline_ltx2 as pl


def test_resolve_sampling_two_stage_default_on() -> None:
    samp = pl._resolve_sampling({})
    assert samp["two_stage"] is True
    assert samp["motion_intensity"] == "dynamic"


def test_resolve_sampling_two_stage_is_configurable() -> None:
    assert pl._resolve_sampling({"two_stage": False})["two_stage"] is False
    assert pl._resolve_sampling({"two_stage": True})["two_stage"] is True


def test_resolve_sampling_motion_intensity_is_configurable() -> None:
    for level in ("dynamic", "intense"):
        samp = pl._resolve_sampling({"motion_intensity": level})
        assert samp["motion_intensity"] == level


def test_resolve_sampling_motion_intensity_invalid_falls_back() -> None:
    # Dropped levels (calm/moderate) and unknowns fall back to the default.
    for level in ("bogus", "calm", "moderate"):
        samp = pl._resolve_sampling({"motion_intensity": level})
        assert samp["motion_intensity"] == pl._DEF_MOTION_INTENSITY


def test_motion_intensity_levels_all_have_a_suffix() -> None:
    assert set(pl._MOTION_INTENSITY_SUFFIX) == {"dynamic", "intense"}
    assert pl._DEF_MOTION_INTENSITY in pl._MOTION_INTENSITY_SUFFIX


def test_resolve_geometry_snaps_to_64_for_clean_half_res() -> None:
    geo = pl._resolve_geometry({"width": 700, "height": 500})
    assert geo["width"] % 64 == 0
    assert geo["height"] % 64 == 0
    # The two-stage half-res geometry must be a clean VAE-scale multiple.
    assert (geo["width"] // 2) % pl._VAE_SPATIAL_SCALE == 0
    assert (geo["height"] // 2) % pl._VAE_SPATIAL_SCALE == 0


def test_stage2_distilled_sigmas_are_a_descending_3_step_schedule() -> None:
    sigmas = pl._STAGE2_DISTILLED_SIGMAS
    assert len(sigmas) == 4  # 3 Euler steps
    assert sigmas[0] == pytest.approx(0.909375)
    assert sigmas[-1] == 0.0
    assert list(sigmas) == sorted(sigmas, reverse=True)
