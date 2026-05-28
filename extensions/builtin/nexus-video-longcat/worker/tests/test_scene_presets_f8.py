"""F8 — scene preset catalog + RPC payload contract.

Pure-Python tests; no torch / no numpy. UI consumes the payload shape, so
top-level keys + per-preset keys are locked.
"""

from __future__ import annotations

import json

import pytest

from longcat_video_worker import scene_presets as sp


class TestCatalogLoad:
    def test_catalog_is_non_empty(self):
        # ship at least one starter preset (demonic-nun-possession)
        names = sp.list_preset_names()
        assert "demonic-nun-possession" in names

    def test_catalog_is_cached(self):
        a = sp.list_presets()
        b = sp.list_presets()
        assert a is b  # cached identity

    def test_reload_clears_cache(self):
        sp.list_presets()
        n = sp.reload_catalog()
        assert n >= 1


class TestGetPreset:
    def test_known(self):
        p = sp.get_preset("demonic-nun-possession")
        assert p.name == "demonic-nun-possession"
        assert p.label
        assert p.quality_status in sp.QUALITY_STATUSES
        assert p.default_mode in sp.MODES
        assert p.recommended_output_profile in sp.RECOMMENDED_OUTPUT_PROFILES

    def test_unknown_raises(self):
        with pytest.raises(sp.ScenePresetError, match="unknown scene preset"):
            sp.get_preset("does-not-exist")

    def test_scenes_have_required_fields(self):
        p = sp.get_preset("demonic-nun-possession")
        assert len(p.scenes) >= 2
        for s in p.scenes:
            assert s.prompt
            assert s.duration_seconds > 0
            assert s.motion_intensity in ("static", "dynamic", "intense")

    def test_transitions_align_with_scenes(self):
        p = sp.get_preset("demonic-nun-possession")
        if p.transitions:
            assert len(p.transitions) == len(p.scenes) - 1
            for t in p.transitions:
                assert t.type in ("soft", "hard_cut", "dissolve")


class TestPayloadContract:
    """UI consumes this shape. Lock the keys."""

    def test_top_level_keys(self):
        payload = sp.list_presets_payload()
        assert set(payload.keys()) == {"schema_version", "presets", "count"}
        assert payload["schema_version"] == 1
        assert payload["count"] == len(payload["presets"])

    def test_each_preset_has_expected_keys(self):
        payload = sp.list_presets_payload()
        expected_required = {
            "schema_version",
            "name",
            "label",
            "description",
            "quality_status",
            "default_mode",
            "default_image_path",
            "recommended_output_profile",
            "scenes",
            "transitions",
            "tags",
        }
        assert payload["presets"], "catalog must ship at least one preset"
        for p in payload["presets"]:
            assert expected_required.issubset(p.keys()), (
                f"missing keys in {p.get('name')}: {expected_required - set(p.keys())}"
            )

    def test_payload_is_json_serializable(self):
        json.dumps(sp.list_presets_payload())


class TestValidationErrors:
    def test_bad_schema_version(self, tmp_path):
        bad = tmp_path / "bad.json"
        bad.write_text(json.dumps({"schema_version": 99, "name": "x", "label": "X",
                                   "scenes": [{"prompt": "p", "duration_seconds": 1.0}]}))
        with pytest.raises(sp.ScenePresetError, match="schema_version"):
            sp.load_preset_file(bad)

    def test_missing_name(self, tmp_path):
        bad = tmp_path / "bad.json"
        bad.write_text(json.dumps({"schema_version": 1, "label": "X",
                                   "scenes": [{"prompt": "p", "duration_seconds": 1.0}]}))
        with pytest.raises(sp.ScenePresetError, match="name"):
            sp.load_preset_file(bad)

    def test_unknown_quality_status(self, tmp_path):
        bad = tmp_path / "bad.json"
        bad.write_text(json.dumps({
            "schema_version": 1, "name": "x", "label": "X",
            "quality_status": "amazing",
            "scenes": [{"prompt": "p", "duration_seconds": 1.0}],
        }))
        with pytest.raises(sp.ScenePresetError, match="quality_status"):
            sp.load_preset_file(bad)

    def test_transition_count_mismatch(self, tmp_path):
        bad = tmp_path / "bad.json"
        bad.write_text(json.dumps({
            "schema_version": 1, "name": "x", "label": "X",
            "scenes": [
                {"prompt": "a", "duration_seconds": 1.0},
                {"prompt": "b", "duration_seconds": 1.0},
                {"prompt": "c", "duration_seconds": 1.0},
            ],
            # 3 scenes => 2 transitions required, supplying 1 should fail
            "transitions": [{"type": "soft", "bridge_text": "x"}],
        }))
        with pytest.raises(sp.ScenePresetError, match="transitions length"):
            sp.load_preset_file(bad)

    def test_empty_scenes(self, tmp_path):
        bad = tmp_path / "bad.json"
        bad.write_text(json.dumps({
            "schema_version": 1, "name": "x", "label": "X", "scenes": [],
        }))
        with pytest.raises(sp.ScenePresetError, match="scenes"):
            sp.load_preset_file(bad)

    def test_non_object_top_level(self, tmp_path):
        bad = tmp_path / "bad.json"
        bad.write_text(json.dumps(["nope"]))
        with pytest.raises(sp.ScenePresetError, match="top-level"):
            sp.load_preset_file(bad)


class TestRoundTrip:
    def test_preset_to_dict_round_trip(self):
        p = sp.get_preset("demonic-nun-possession")
        d = p.to_dict()
        assert d["name"] == p.name
        assert d["label"] == p.label
        assert len(d["scenes"]) == len(p.scenes)
        assert len(d["transitions"]) == len(p.transitions)
