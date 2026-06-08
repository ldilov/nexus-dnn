import json
from pathlib import Path

import jsonschema
import pytest

ROOT = Path(__file__).resolve().parents[2]
PRESETS = json.loads((ROOT / "data" / "render_presets.json").read_text())["presets"]
SCHEMA = json.loads((ROOT / "schemas" / "svi2_render_params.schema.json").read_text())


@pytest.mark.parametrize("preset", PRESETS, ids=[p["id"] for p in PRESETS])
def test_preset_params_validate_against_schema(preset):
    body = {**preset["params"], "ref_image_path": "x.png", "prompts": ["a"]}
    jsonschema.validate(body, SCHEMA)


@pytest.mark.parametrize("preset", PRESETS, ids=[p["id"] for p in PRESETS])
def test_preset_params_validate_against_worker(preset):
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    needs_last = preset["id"] == "flf2v-morph-lowvram"
    body = {**preset["params"], "ref_image_path": "x.png", "prompts": ["a"]}
    if needs_last:
        body["last_image_path"] = "end.png"
    out = validate_render_params(body)
    assert out["width"] == preset["params"]["width"]
    assert out["height"] == preset["params"]["height"]
