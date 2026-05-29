import json
from pathlib import Path
import jsonschema
ROOT = Path(__file__).resolve().parents[2]


def test_schema_accepts_valid_and_rejects_missing_image():
    schema = json.loads((ROOT / "schemas/svi2_render_params.schema.json").read_text())
    jsonschema.validate({"ref_image_path": "x.png", "prompts": ["a"], "num_clips": 1}, schema)
    try:
        jsonschema.validate({"prompts": ["a"]}, schema)
        assert False
    except jsonschema.ValidationError:
        pass


def test_schema_rejects_empty_prompts():
    schema = json.loads((ROOT / "schemas/svi2_render_params.schema.json").read_text())
    try:
        jsonschema.validate({"ref_image_path": "x.png", "prompts": []}, schema)
        assert False
    except jsonschema.ValidationError:
        pass


def test_schema_enforces_ranges():
    schema = json.loads((ROOT / "schemas/svi2_render_params.schema.json").read_text())
    try:
        jsonschema.validate({"ref_image_path": "x.png", "prompts": ["a"], "num_motion_latent": 99}, schema)
        assert False
    except jsonschema.ValidationError:
        pass
