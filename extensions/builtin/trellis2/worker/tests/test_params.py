import pytest

from trellis2_worker.params import (
    DEFAULT_SIMPLIFY_TARGET,
    DEFAULT_SPARSE_STEPS,
    NVDIFFRAST_FACE_LIMIT,
    validate_generate_params,
)


def _ok_params(**overrides) -> dict:
    base = {"image_path": "in.png", "output_path": "out.glb"}
    base.update(overrides)
    return base


def test_defaults_applied():
    v = validate_generate_params(_ok_params())
    assert v.sparse_steps == DEFAULT_SPARSE_STEPS
    assert v.simplify_target == DEFAULT_SIMPLIFY_TARGET
    assert v.texture is False
    assert v.residency == "balanced"


def test_image_aliases_accepted():
    assert validate_generate_params({"image": "a.png", "output_path": "o.glb"}).image_path == "a.png"
    assert (
        validate_generate_params({"ref_image_path": "b.png", "output_path": "o.glb"}).image_path
        == "b.png"
    )


def test_missing_image_rejected():
    with pytest.raises(ValueError, match="image"):
        validate_generate_params({"output_path": "o.glb"})


def test_missing_output_rejected():
    with pytest.raises(ValueError, match="output_path"):
        validate_generate_params({"image_path": "in.png"})


def test_invalid_residency_rejected():
    with pytest.raises(ValueError, match="residency"):
        validate_generate_params(_ok_params(residency="hyper"))


def test_non_integer_seed_rejected():
    with pytest.raises(ValueError, match="seed"):
        validate_generate_params(_ok_params(seed="notanint"))


def test_negative_steps_rejected():
    with pytest.raises(ValueError, match="sparse_steps"):
        validate_generate_params(_ok_params(sparse_steps=0))


def test_simplify_target_clamped_to_nvdiffrast_limit():
    v = validate_generate_params(_ok_params(simplify_target=NVDIFFRAST_FACE_LIMIT * 4))
    assert v.simplify_target == NVDIFFRAST_FACE_LIMIT


def test_simplify_target_under_limit_passes_through():
    v = validate_generate_params(_ok_params(simplify_target=500_000))
    assert v.simplify_target == 500_000


def test_texture_flag_coerced_to_bool():
    assert validate_generate_params(_ok_params(texture=1)).texture is True
    assert validate_generate_params(_ok_params(texture=0)).texture is False


def test_params_dict_required():
    with pytest.raises(ValueError, match="object"):
        validate_generate_params("not-a-dict")  # type: ignore


def test_guidance_levers_default_to_none():
    v = validate_generate_params(_ok_params())
    for stage in ("sparse", "shape", "texture"):
        assert getattr(v, f"{stage}_guidance_strength") is None
        assert getattr(v, f"{stage}_guidance_rescale") is None
        assert getattr(v, f"{stage}_rescale_t") is None
        assert getattr(v, f"{stage}_guidance_interval_start") is None
        assert getattr(v, f"{stage}_guidance_interval_end") is None


def test_stage_sampler_params_default_carries_only_steps():
    v = validate_generate_params(_ok_params(sparse_steps=8, shape_steps=9, texture_steps=10))
    assert v.stage_sampler_params("sparse") == {"steps": 8}
    assert v.stage_sampler_params("shape") == {"steps": 9}
    assert v.stage_sampler_params("texture") == {"steps": 10}


def test_guidance_levers_set_are_merged_into_stage_params():
    v = validate_generate_params(
        _ok_params(
            shape_guidance_strength=7.5,
            shape_guidance_rescale=0.5,
            shape_rescale_t=3.0,
            shape_guidance_interval_start=0.3,
            shape_guidance_interval_end=1.0,
        )
    )
    assert v.stage_sampler_params("shape") == {
        "steps": 12,
        "guidance_strength": 7.5,
        "guidance_rescale": 0.5,
        "rescale_t": 3.0,
        "guidance_interval": [0.3, 1.0],
    }


def test_guidance_interval_needs_both_endpoints():
    only_start = validate_generate_params(_ok_params(sparse_guidance_interval_start=0.3))
    assert "guidance_interval" not in only_start.stage_sampler_params("sparse")
    only_end = validate_generate_params(_ok_params(sparse_guidance_interval_end=0.9))
    assert "guidance_interval" not in only_end.stage_sampler_params("sparse")


def test_guidance_strength_clamped_to_max():
    v = validate_generate_params(_ok_params(sparse_guidance_strength=999.0))
    assert v.sparse_guidance_strength == 100.0


def test_guidance_rescale_clamped_to_unit_interval():
    v = validate_generate_params(_ok_params(texture_guidance_rescale=5.0))
    assert v.texture_guidance_rescale == 1.0
    v2 = validate_generate_params(_ok_params(texture_guidance_rescale=-2.0))
    assert v2.texture_guidance_rescale == 0.0


def test_rescale_t_clamped_to_max():
    v = validate_generate_params(_ok_params(shape_rescale_t=50.0))
    assert v.shape_rescale_t == 10.0


def test_guidance_interval_endpoints_clamped_to_unit_interval():
    v = validate_generate_params(
        _ok_params(sparse_guidance_interval_start=-1.0, sparse_guidance_interval_end=9.0)
    )
    assert v.stage_sampler_params("sparse")["guidance_interval"] == [0.0, 1.0]


def test_non_numeric_guidance_rejected():
    with pytest.raises(ValueError, match="shape_guidance_strength"):
        validate_generate_params(_ok_params(shape_guidance_strength="loud"))


def test_per_stage_levers_are_independent():
    v = validate_generate_params(
        _ok_params(sparse_guidance_strength=6.5, texture_guidance_strength=3.0)
    )
    assert v.stage_sampler_params("sparse") == {"steps": 12, "guidance_strength": 6.5}
    assert v.stage_sampler_params("shape") == {"steps": 12}
    assert v.stage_sampler_params("texture") == {"steps": 12, "guidance_strength": 3.0}
