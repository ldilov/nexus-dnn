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
