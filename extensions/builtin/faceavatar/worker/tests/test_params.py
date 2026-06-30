import pytest

from faceavatar_worker.params import (
    DEFAULT_ARC_ITERS,
    DEFAULT_BLEND_RING,
    MAX_ARC_ITERS,
    validate_generate_head_params,
    validate_graft_head_params,
)


def _gen(**overrides) -> dict:
    base = {"image_path": "in.png", "output_path": "out.glb"}
    base.update(overrides)
    return base


def test_generate_defaults_applied():
    v = validate_generate_head_params(_gen())
    assert v.image_path == "in.png"
    assert v.output_path == "out.glb"
    assert v.seed is None
    assert v.expression == "neutral"
    assert v.texture is True
    assert v.crop == "bust"
    assert v.arc_iters is None
    assert v.residency == "balanced"


def test_generate_image_aliases_accepted():
    assert validate_generate_head_params({"image": "a.png", "output_path": "o.glb"}).image_path == "a.png"
    assert (
        validate_generate_head_params({"ref_image_path": "b.png", "output_path": "o.glb"}).image_path
        == "b.png"
    )


def test_generate_missing_image_rejected():
    with pytest.raises(ValueError, match="image"):
        validate_generate_head_params({"output_path": "o.glb"})


def test_generate_missing_output_rejected():
    with pytest.raises(ValueError, match="output_path"):
        validate_generate_head_params({"image_path": "in.png"})


def test_generate_invalid_expression_rejected():
    with pytest.raises(ValueError, match="expression"):
        validate_generate_head_params(_gen(expression="angry"))


def test_generate_expression_source_accepted():
    assert validate_generate_head_params(_gen(expression="source")).expression == "source"


def test_generate_invalid_crop_rejected():
    with pytest.raises(ValueError, match="crop"):
        validate_generate_head_params(_gen(crop="torso"))


def test_generate_crop_head_accepted():
    assert validate_generate_head_params(_gen(crop="head")).crop == "head"


def test_generate_texture_coerced_to_bool():
    assert validate_generate_head_params(_gen(texture=0)).texture is False
    assert validate_generate_head_params(_gen(texture=1)).texture is True


def test_generate_invalid_residency_rejected():
    with pytest.raises(ValueError, match="residency"):
        validate_generate_head_params(_gen(residency="hyper"))


def test_generate_non_integer_seed_rejected():
    with pytest.raises(ValueError, match="seed"):
        validate_generate_head_params(_gen(seed="notanint"))


def test_generate_arc_iters_clamped_to_max():
    assert validate_generate_head_params(_gen(arc_iters=MAX_ARC_ITERS * 2)).arc_iters == MAX_ARC_ITERS


def test_generate_arc_iters_passed_through():
    assert validate_generate_head_params(_gen(arc_iters=120)).arc_iters == 120


def test_generate_arc_iters_non_integer_rejected():
    with pytest.raises(ValueError, match="arc_iters"):
        validate_generate_head_params(_gen(arc_iters="slow"))


def test_generate_params_dict_required():
    with pytest.raises(ValueError, match="object"):
        validate_generate_head_params("not-a-dict")  # type: ignore


def _graft(**overrides) -> dict:
    base = {"base_mesh_path": "base.glb", "image_path": "in.png", "output_path": "out.glb"}
    base.update(overrides)
    return base


def test_graft_defaults_applied():
    v = validate_graft_head_params(_graft())
    assert v.base_mesh_path == "base.glb"
    assert v.image_path == "in.png"
    assert v.output_path == "out.glb"
    assert v.seed is None
    assert v.seam == "neck"
    assert v.keep_hair is True
    assert v.blend_ring == DEFAULT_BLEND_RING
    assert v.align == "landmark"
    assert v.texture_blend is True
    assert v.arc_iters is None
    assert v.residency == "balanced"


def test_graft_base_mesh_aliases_accepted():
    assert validate_graft_head_params(
        {"base_mesh": "a.glb", "image_path": "i.png", "output_path": "o.glb"}
    ).base_mesh_path == "a.glb"
    assert validate_graft_head_params(
        {"mesh_path": "b.glb", "image_path": "i.png", "output_path": "o.glb"}
    ).base_mesh_path == "b.glb"
    assert validate_graft_head_params(
        {"mesh": "c.glb", "image_path": "i.png", "output_path": "o.glb"}
    ).base_mesh_path == "c.glb"


def test_graft_missing_base_mesh_rejected():
    with pytest.raises(ValueError, match="base_mesh"):
        validate_graft_head_params({"image_path": "i.png", "output_path": "o.glb"})


def test_graft_missing_image_rejected():
    with pytest.raises(ValueError, match="image"):
        validate_graft_head_params({"base_mesh_path": "b.glb", "output_path": "o.glb"})


def test_graft_missing_output_rejected():
    with pytest.raises(ValueError, match="output_path"):
        validate_graft_head_params({"base_mesh_path": "b.glb", "image_path": "i.png"})


def test_graft_invalid_seam_rejected():
    with pytest.raises(ValueError, match="seam"):
        validate_graft_head_params(_graft(seam="ear"))


def test_graft_seam_hairline_accepted():
    assert validate_graft_head_params(_graft(seam="hairline")).seam == "hairline"


def test_graft_invalid_align_rejected():
    with pytest.raises(ValueError, match="align"):
        validate_graft_head_params(_graft(align="auto"))


def test_graft_align_manual_accepted():
    assert validate_graft_head_params(_graft(align="manual")).align == "manual"


def test_graft_keep_hair_coerced_to_bool():
    assert validate_graft_head_params(_graft(keep_hair=0)).keep_hair is False
    assert validate_graft_head_params(_graft(keep_hair=1)).keep_hair is True


def test_graft_texture_blend_coerced_to_bool():
    assert validate_graft_head_params(_graft(texture_blend=0)).texture_blend is False


def test_graft_blend_ring_clamped_to_unit_interval():
    assert validate_graft_head_params(_graft(blend_ring=5.0)).blend_ring == 1.0
    assert validate_graft_head_params(_graft(blend_ring=-2.0)).blend_ring == 0.0


def test_graft_blend_ring_passed_through():
    assert validate_graft_head_params(_graft(blend_ring=0.5)).blend_ring == 0.5


def test_graft_blend_ring_non_numeric_rejected():
    with pytest.raises(ValueError, match="blend_ring"):
        validate_graft_head_params(_graft(blend_ring="wide"))


def test_graft_invalid_residency_rejected():
    with pytest.raises(ValueError, match="residency"):
        validate_graft_head_params(_graft(residency="hyper"))


def test_graft_arc_iters_clamped_to_max():
    assert validate_graft_head_params(_graft(arc_iters=MAX_ARC_ITERS * 3)).arc_iters == MAX_ARC_ITERS


def test_graft_params_dict_required():
    with pytest.raises(ValueError, match="object"):
        validate_graft_head_params("not-a-dict")  # type: ignore
