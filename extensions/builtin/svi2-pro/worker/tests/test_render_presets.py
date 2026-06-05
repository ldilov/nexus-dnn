import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PRESETS = ROOT / "data" / "render_presets.json"


def _load_presets() -> dict:
    return {p["id"]: p for p in json.loads(PRESETS.read_text())["presets"]}


def test_canonical_preset_exists_and_is_reference_faithful():
    presets = _load_presets()
    assert "svi-canonical" in presets
    params = presets["svi-canonical"]["params"]
    assert (params["width"], params["height"]) == (832, 480)   # trained 480p budget
    assert params["pixel_re_encode"] is False                  # raw-latent handoff (Pro rule)
    assert params["stitch_mode"] == "trim"                     # clean concat, no crossfade
    assert params.get("ref_pad_num", 0) == 0                   # no ref-pad crutch
    assert params.get("adain_factor", 0.0) == 0.0              # rely on anchor + LoRA, not colour patch


def test_canonical_preset_params_validate():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    params = _load_presets()["svi-canonical"]["params"]
    out = validate_render_params({**params, "ref_image_path": "x.png", "prompts": ["a"]})
    assert out["pixel_re_encode"] is False
    assert out["stitch_mode"] == "trim"
    assert out["width"] == 832 and out["height"] == 480


def test_all_presets_have_unique_ids_and_required_fields():
    raw = json.loads(PRESETS.read_text())["presets"]
    ids = [p["id"] for p in raw]
    assert len(ids) == len(set(ids))
    for p in raw:
        assert p["id"] and p["label"] and isinstance(p["params"], dict)
