import asyncio
import json
from pathlib import Path

import jsonschema
import pytest

ROOT = Path(__file__).resolve().parents[2]
PRESET_DATA = json.loads((ROOT / "data" / "render_presets.json").read_text())
PRESETS = PRESET_DATA["presets"]
SCHEMA = json.loads((ROOT / "schemas" / "svi2_render_params.schema.json").read_text())

_SUB_BUDGET_PRESET_IDS = {"svi-canonical-704", "svi-canonical-640"}
_LAST_IMAGE_PRESET_IDS = {"flf2v-morph-lowvram"}


def _body(preset: dict) -> dict:
    body = {**preset["params"], "ref_image_path": "x.png", "prompts": ["a"]}
    if preset["id"] in _LAST_IMAGE_PRESET_IDS:
        body["last_image_path"] = "end.png"
    return body


def test_catalog_has_all_eleven_unique_presets():
    ids = [p["id"] for p in PRESETS]
    assert len(ids) == 11
    assert len(set(ids)) == 11


@pytest.mark.parametrize("preset", PRESETS, ids=[p["id"] for p in PRESETS])
def test_every_preset_validates_against_schema_and_worker(preset):
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    jsonschema.validate(_body(preset), SCHEMA)
    out = validate_render_params(_body(preset))
    assert out["width"] == preset["params"]["width"]
    assert out["height"] == preset["params"]["height"]


@pytest.mark.parametrize(
    "preset_id", sorted(_SUB_BUDGET_PRESET_IDS)
)
def test_sub_budget_presets_surface_machine_readable_resolution_warning(preset_id):
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    preset = next(p for p in PRESETS if p["id"] == preset_id)
    out = validate_render_params(_body(preset))
    warn = out["resolution_warning"]
    assert warn is not None
    assert warn["code"] == "RESOLUTION_OFF_BUDGET"
    assert warn["severity"] == "warning"
    assert warn["blocking"] is False
    assert warn["sub_budget"] is True
    assert isinstance(warn["message"], str) and warn["message"]


def test_trained_budget_preset_has_no_resolution_warning():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    canonical = next(p for p in PRESETS if p["id"] == "svi-canonical")
    out = validate_render_params(_body(canonical))
    assert out["resolution_warning"] is None


def test_flf2v_preset_rejects_render_without_last_image():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    flf2v = next(p for p in PRESETS if p["id"] == "flf2v-morph-lowvram")
    body = {**flf2v["params"], "ref_image_path": "x.png", "prompts": ["a"]}
    assert body.get("last_image_path") is None
    with pytest.raises(ValueError, match="last_image_path is required"):
        validate_render_params(body)


def test_flf2v_preset_accepts_render_with_last_image():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    flf2v = next(p for p in PRESETS if p["id"] == "flf2v-morph-lowvram")
    body = {**flf2v["params"], "ref_image_path": "x.png", "prompts": ["a"], "last_image_path": "end.png"}
    out = validate_render_params(body)
    assert out["last_image_path"] == "end.png"
    assert out["requires_last_image"] is True


def test_flf2v_rejects_multi_clip_chaining():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    flf2v = next(p for p in PRESETS if p["id"] == "flf2v-morph-lowvram")
    body = {
        **flf2v["params"],
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "last_image_path": "end.png",
        "num_clips": 3,
    }
    with pytest.raises(ValueError, match="num_clips=1"):
        validate_render_params(body)


@pytest.mark.parametrize("width,height", [(850, 480), (832, 470)])
def test_rejects_resolution_not_multiple_of_16(width, height):
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    with pytest.raises(ValueError, match="multiples of 16"):
        validate_render_params(
            {"ref_image_path": "x.png", "prompts": ["a"], "width": width, "height": height}
        )


_LEGACY_DRIFT_PRESET_IDS = {
    "natural-reference",
    "natural-rife48",
    "forced-motion-24",
    "natural-reference-lowvram",
    "natural-rife48-lowvram",
    "forced-motion-24-lowvram",
    "chained-single-prompt-lowvram",
}


def test_legacy_drift_presets_are_labeled_legacy():
    for p in PRESETS:
        if p["id"] in _LEGACY_DRIFT_PRESET_IDS:
            assert p["label"].startswith("Legacy A/B"), p["id"]
            assert "svi-canonical" in p["description"], p["id"]
        elif p["id"].startswith("svi-canonical") or p["id"] in _LAST_IMAGE_PRESET_IDS:
            assert not p["label"].startswith("Legacy"), p["id"]


def test_presets_list_rpc_returns_catalog_from_data_file():
    from svi2_video_worker.presets import load_presets, register_preset_handlers

    class _Worker:
        def __init__(self):
            self.handlers = {}

        def register(self, method, handler):
            self.handlers[method] = handler

    w = _Worker()
    register_preset_handlers(w)
    result = asyncio.new_event_loop().run_until_complete(w.handlers["svi2.presets.list"](None))
    assert result == load_presets()
    assert len(result["presets"]) == 11
