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


def test_canonical_family_defaults_are_85_frames_16fps_6_clips():
    presets = _load_presets()
    for pid in ("svi-canonical", "svi-canonical-704", "svi-canonical-640"):
        params = presets[pid]["params"]
        assert params["frames_per_clip"] == 85, pid
        assert (params["frames_per_clip"] - 1) % 4 == 0, pid
        assert params["fps"] == 16, pid
        assert params["num_clips"] == 6, pid
        assert params["num_overlap_frame"] == 5, pid


_LEGACY_IDS = {
    "natural-reference",
    "natural-rife48",
    "forced-motion-24",
    "natural-reference-lowvram",
    "natural-rife48-lowvram",
    "forced-motion-24-lowvram",
    "chained-single-prompt-lowvram",
}
_HIDDEN_IDS = {"svi-canonical-704", "svi-canonical-640"}


def test_legacy_and_hidden_flags_match_catalog_contract():
    presets = _load_presets()
    for pid, preset in presets.items():
        legacy = preset.get("legacy", False)
        hidden = preset.get("hidden", False)
        assert isinstance(legacy, bool), pid
        assert isinstance(hidden, bool), pid
        assert legacy == (pid in _LEGACY_IDS), pid
        assert hidden == (pid in _HIDDEN_IDS), pid
    assert not (_LEGACY_IDS & _HIDDEN_IDS)
    for visible_id in ("svi-canonical", "flf2v-morph-lowvram"):
        assert not presets[visible_id].get("legacy", False)
        assert not presets[visible_id].get("hidden", False)


def test_canonical_preset_params_validate():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    params = _load_presets()["svi-canonical"]["params"]
    out = validate_render_params({**params, "ref_image_path": "x.png", "prompts": ["a"]})
    assert out["pixel_re_encode"] is False
    assert out["stitch_mode"] == "trim"
    assert out["width"] == 832 and out["height"] == 480


def test_resolution_stepdown_presets_exist_and_are_offbudget():
    from svi2_video_worker.resolution import check_trained_resolution

    presets = _load_presets()
    for pid, wh in (("svi-canonical-640", (640, 368)), ("svi-canonical-704", (704, 400))):
        assert pid in presets, pid
        p = presets[pid]["params"]
        assert (p["width"], p["height"]) == wh
        assert p["pixel_re_encode"] is False and p["stitch_mode"] == "trim"
        # below the 480p budget -> resolution warning must fire
        assert check_trained_resolution(p["width"], p["height"]) is not None


def test_all_presets_have_unique_ids_and_required_fields():
    raw = json.loads(PRESETS.read_text())["presets"]
    ids = [p["id"] for p in raw]
    assert len(ids) == len(set(ids))
    for p in raw:
        assert p["id"] and p["label"] and isinstance(p["params"], dict)
