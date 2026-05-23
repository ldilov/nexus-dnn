from __future__ import annotations

from pathlib import Path
from typing import Any

import pytest

from .conftest import synth_fp8_safetensors


def _has_torch_fp8() -> bool:
    try:
        import torch

        return hasattr(torch, "float8_e4m3fn")
    except ImportError:
        return False


def _loader() -> Any:
    import longcat_video_worker.longcat_safetensors_loader as m

    return m


# ---------------------------------------------------------------------------
# Pure-Python / constant tests (no torch required)
# These import only the constants that are defined before the torch import in
# the loader.  Because the loader does `import torch.nn as _nn` at the top
# level we cannot import it without torch; instead we verify the constants by
# importing the module only when torch is available and assert hard-coded
# expected values here so any linter-driven rename still causes a failure.
# ---------------------------------------------------------------------------


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_weight_scale_suffixes_constant() -> None:
    sl = _loader()
    assert sl.WEIGHT_SCALE_SUFFIXES == (
        ".scale_weight",
        ".weight_scale",
        ".scale",
        ".weight_scale_inv",
    )


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_has_scale_suffix_positive() -> None:
    sl = _loader()
    all_suffixes = list(sl.WEIGHT_SCALE_SUFFIXES) + list(sl.INPUT_SCALE_SUFFIXES)
    for suf in all_suffixes:
        key = f"blocks.0.attn.to_q.weight{suf}"
        assert sl._has_scale_suffix(key), f"expected True for {key!r}"


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_has_scale_suffix_negative() -> None:
    sl = _loader()
    for key in ("blocks.0.proj.weight", "norm1.bias", "random.string"):
        assert not sl._has_scale_suffix(key), f"expected False for {key!r}"


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_strip_scale_suffix() -> None:
    sl = _loader()
    result = sl._strip_scale_suffix("blocks.0.attn.to_q.weight_scale")
    assert result == "blocks.0.attn.to_q", f"got {result!r}"

    assert sl._strip_scale_suffix("blocks.0.proj.weight") is None
    assert sl._strip_scale_suffix("norm1.bias") is None


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_partition_extras() -> None:
    sl = _loader()
    extras = ["a.weight_scale", "b.scale", "c.bias"]
    scale_like, orphan = sl._partition_extras(extras)
    assert "a.weight_scale" in scale_like
    assert "b.scale" in scale_like
    assert "c.bias" in orphan


# ---------------------------------------------------------------------------
# Torch-dependent tests
# ---------------------------------------------------------------------------


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_fp8_dtypes_includes_e4m3fn() -> None:
    import torch

    sl = _loader()
    dtypes = sl._fp8_dtypes()
    assert torch.float8_e4m3fn in dtypes


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_is_fp8_positive_negative() -> None:
    import torch

    sl = _loader()
    assert sl._is_fp8(torch.float8_e4m3fn) is True
    assert sl._is_fp8(torch.bfloat16) is False


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_fp8_linear_construct() -> None:
    import torch

    sl = _loader()
    layer = sl.FP8Linear(64, 128, bias=True, compute_dtype=torch.bfloat16, device="cpu")
    assert layer.weight.dtype == torch.float8_e4m3fn
    assert layer.weight_scale is None
    assert layer.input_scale is None


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_attach_scale_scalar() -> None:
    import torch

    sl = _loader()
    layer = sl.FP8Linear(64, 128, bias=False, compute_dtype=torch.bfloat16, device="cpu")
    scale = torch.tensor(0.5, dtype=torch.bfloat16).reshape(())
    layer.attach_scale(scale)
    assert layer.weight_scale is scale


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_attach_scale_wrong_numel_raises() -> None:
    import torch

    sl = _loader()
    layer = sl.FP8Linear(64, 128, bias=False, compute_dtype=torch.bfloat16, device="cpu")
    bad_scale = torch.ones(3, dtype=torch.bfloat16)
    with pytest.raises(ValueError, match="does not match out_features"):
        layer.attach_scale(bad_scale)


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_attach_scale_3d_raises() -> None:
    import torch

    sl = _loader()
    layer = sl.FP8Linear(64, 128, bias=False, compute_dtype=torch.bfloat16, device="cpu")
    bad_scale = torch.ones(2, 2, 2, dtype=torch.bfloat16)
    with pytest.raises(ValueError, match="must be scalar, 1D, or 2D"):
        layer.attach_scale(bad_scale)


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_attach_input_scale_non_scalar_raises() -> None:
    import torch

    sl = _loader()
    layer = sl.FP8Linear(64, 128, bias=False, compute_dtype=torch.bfloat16, device="cpu")
    with pytest.raises(ValueError):
        layer.attach_input_scale(torch.ones(2, dtype=torch.bfloat16))


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_synth_fixture_loads(tmp_path: Path) -> None:
    import torch
    from safetensors.torch import load_file

    path = synth_fp8_safetensors(tmp_path, num_layers=2, hidden=64)
    assert path.exists()

    sd = load_file(str(path))

    fp8_keys = [k for k, v in sd.items() if v.dtype == torch.float8_e4m3fn]
    bf16_keys = [k for k, v in sd.items() if v.dtype == torch.bfloat16]

    assert len(fp8_keys) > 0, "expected at least one FP8 tensor"
    assert len(bf16_keys) > 0, "expected at least one BF16 tensor"

    # 2 layers × 3 fp8 weights + 1 top-level fp8 + 1 comfy-prefixed dup = 8
    per_layer_fp8 = 3
    top_level_fp8 = 1
    comfy_dup = 1
    expected_fp8 = per_layer_fp8 * 2 + top_level_fp8 + comfy_dup

    # 2 layers × (3 weight_scale + 1 input_scale + 2 norm tensors) + 1 top-level scale + conv3d = 14
    per_layer_bf16 = 6
    top_level_bf16 = 2
    expected_bf16 = per_layer_bf16 * 2 + top_level_bf16

    assert len(fp8_keys) == expected_fp8, (
        f"FP8 count: got {len(fp8_keys)}, expected {expected_fp8}\n"
        f"fp8_keys={fp8_keys}"
    )
    assert len(bf16_keys) == expected_bf16, (
        f"BF16 count: got {len(bf16_keys)}, expected {expected_bf16}\n"
        f"bf16_keys={bf16_keys}"
    )


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_replace_linears_with_fp8() -> None:
    import torch

    sl = _loader()

    model = torch.nn.Sequential(torch.nn.Linear(64, 128, bias=False))
    fp8_weight = (
        torch.randn(128, 64, dtype=torch.bfloat16)
        .clamp(-448.0, 448.0)
        .to(torch.float8_e4m3fn)
    )
    state_dict = {"0.weight": fp8_weight}

    swapped = sl._replace_linears_with_fp8(
        model, state_dict, compute_dtype=torch.bfloat16, device="cpu"
    )
    assert swapped == 1
    assert isinstance(model[0], sl.FP8Linear)


@pytest.mark.skipif(not _has_torch_fp8(), reason="torch float8_e4m3fn unavailable")
def test_validate_against_model_reports_missing_and_extra() -> None:
    import torch

    sl = _loader()

    class _Tiny(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.a = torch.nn.Linear(4, 4, bias=False)
            self.b = torch.nn.Linear(4, 4, bias=False)

    model = _Tiny()
    state_dict: dict[str, Any] = {
        "a.weight": torch.zeros(4, 4),
        "extra_key.weight": torch.zeros(2, 2),
    }

    matched, missing, extra, shape_mismatches = sl._validate_against_model(
        state_dict, model
    )
    assert "b.weight" in missing, f"expected b.weight in missing={missing}"
    assert "extra_key.weight" in extra, f"expected extra_key.weight in extra={extra}"
    assert len(missing) >= 1
    assert len(extra) >= 1
