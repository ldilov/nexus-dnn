"""Output-profile catalog + RPC payload contract.

Pure-Python tests; no torch / no numpy. The frontend depends on the
shape returned by ``list_profiles_payload`` so we lock it down
explicitly here — keys must stay stable across schema_version=1.
"""

from __future__ import annotations

import math

import pytest

from longcat_video_worker.output_profiles import (
    OutputProfile,
    get_profile,
    list_profile_names,
    list_profiles,
    list_profiles_payload,
)


class TestCatalog:
    def test_catalog_has_1080p_and_720p(self):
        names = list_profile_names()
        assert "1080p" in names
        assert "720p" in names

    def test_get_profile_known(self):
        p = get_profile("1080p")
        assert p.name == "1080p"
        assert p.draft_width == 960
        assert p.draft_height == 540
        assert p.rtx_scale == 2

    def test_get_profile_unknown_raises(self):
        with pytest.raises(ValueError, match="unknown output profile"):
            get_profile("4k")


class TestProfileMath:
    @pytest.mark.parametrize(
        "name, exp_w, exp_h, exp_aspect",
        [
            ("1080p", 1920, 1080, "16:9"),
            ("720p", 1280, 720, "16:9"),
        ],
    )
    def test_final_dims_and_aspect(self, name, exp_w, exp_h, exp_aspect):
        p = get_profile(name)
        assert p.final_width == exp_w
        assert p.final_height == exp_h
        assert p.aspect_ratio == exp_aspect

    def test_budgets_are_positive(self):
        for p in list_profiles():
            assert p.wall_budget_s > 0
            assert p.vram_budget_gib > 0
            assert p.vram_budget_gib < 24, "16 GiB cards are the target; budgets must stay realistic"


class TestPayloadContract:
    """The UI fetches via RPC. Lock the JSON shape so a refactor cannot
    silently drop a key the frontend depends on."""

    def test_top_level_keys(self):
        payload = list_profiles_payload()
        assert set(payload.keys()) == {"schema_version", "profiles", "default"}
        assert payload["schema_version"] == 1
        assert payload["default"] in list_profile_names()

    def test_each_profile_has_expected_keys(self):
        payload = list_profiles_payload()
        expected = {
            "name",
            "label",
            "draft_width",
            "draft_height",
            "rtx_scale",
            "final_width",
            "final_height",
            "aspect_ratio",
            "wall_budget_s",
            "vram_budget_gib",
            "description",
        }
        assert len(payload["profiles"]) >= 2
        for p in payload["profiles"]:
            assert set(p.keys()) == expected
            assert isinstance(p["draft_width"], int)
            assert isinstance(p["rtx_scale"], int)
            assert isinstance(p["wall_budget_s"], (int, float))
            assert isinstance(p["description"], str) and p["description"]

    def test_payload_is_json_serializable(self):
        import json

        json.dumps(list_profiles_payload())  # should not raise

    def test_display_order_stable(self):
        # 1080p is the default and ships first in the catalog
        payload = list_profiles_payload()
        assert payload["profiles"][0]["name"] == payload["default"]


class TestFrozenInvariant:
    def test_profile_is_frozen(self):
        p = get_profile("720p")
        with pytest.raises(Exception):
            p.draft_width = 99  # type: ignore[misc]
