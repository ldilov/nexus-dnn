from __future__ import annotations

from pathlib import Path
from typing import Any

import pytest

torch = pytest.importorskip("torch")

from ltx_video_worker import ltx2_safetensors_loader as sl  # noqa: E402
from ltx_video_worker.gguf_loader import GGUFSchemaMismatch  # noqa: E402
from ltx_video_worker.ltx2_safetensors_loader import (  # noqa: E402
    ALLOWED_OFFLOAD_MODES,
    FP8Linear,
    SafetensorsSchemaMismatch,
    _is_fp8,
    _validate_offload_args,
    load_native_stack_from_safetensors,
    rename_comfy_keys,
)


def test_allowed_offload_modes_match_spec() -> None:
    assert set(ALLOWED_OFFLOAD_MODES) == {"none", "sequential", "group", "disk"}


def test_validate_offload_args_rejects_bogus_mode() -> None:
    with pytest.raises(ValueError, match="offload_mode"):
        _validate_offload_args("bogus", None)


def test_validate_offload_args_disk_requires_folder() -> None:
    with pytest.raises(ValueError, match="offload_folder"):
        _validate_offload_args("disk", None)


def test_validate_offload_args_disk_accepts_folder(tmp_path: Path) -> None:
    _validate_offload_args("disk", tmp_path)


def test_validate_offload_args_none_passes() -> None:
    _validate_offload_args("none", None)
    _validate_offload_args("sequential", None)
    _validate_offload_args("group", None)


def test_rename_comfy_keys_strips_kijai_prefix() -> None:
    sd: dict[str, Any] = {
        "model.diffusion_model.adaln_single.linear.weight": torch.zeros(2, 2),
        "model.diffusion_model.transformer_blocks.0.attn.proj.weight": torch.zeros(2, 2),
        "patchify_proj.weight": torch.zeros(2, 2),
    }
    renamed = rename_comfy_keys(sd)
    assert "adaln_single.linear.weight" in renamed
    assert "transformer_blocks.0.attn.proj.weight" in renamed
    assert "patchify_proj.weight" in renamed
    assert "model.diffusion_model.adaln_single.linear.weight" not in renamed


def test_rename_comfy_keys_raises_on_collision() -> None:
    sd: dict[str, Any] = {
        "model.diffusion_model.x.weight": torch.zeros(2, 2),
        "x.weight": torch.zeros(2, 2),
    }
    with pytest.raises(GGUFSchemaMismatch, match="rename collision"):
        rename_comfy_keys(sd)


def test_load_rejects_missing_file(tmp_path: Path) -> None:
    bogus = tmp_path / "does_not_exist.safetensors"
    with pytest.raises(FileNotFoundError, match="not found"):
        load_native_stack_from_safetensors(bogus)


def _write_safetensors_no_metadata(path: Path) -> None:
    from safetensors.torch import save_file

    save_file({"placeholder": torch.zeros(2, 2)}, str(path))


def test_load_rejects_missing_config(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_LTX2_GGUF", raising=False)
    sf = tmp_path / "fp8.safetensors"
    _write_safetensors_no_metadata(sf)
    with pytest.raises(SafetensorsSchemaMismatch, match="cannot resolve embedded LTX-2 config"):
        load_native_stack_from_safetensors(sf, install_device="cpu")


def test_load_rejects_invalid_offload_mode(tmp_path: Path) -> None:
    sf = tmp_path / "fp8.safetensors"
    _write_safetensors_no_metadata(sf)
    with pytest.raises(ValueError, match="offload_mode"):
        load_native_stack_from_safetensors(
            sf, offload_mode="rocket", install_device="cpu"
        )


def test_load_rejects_disk_without_folder(tmp_path: Path) -> None:
    sf = tmp_path / "fp8.safetensors"
    _write_safetensors_no_metadata(sf)
    with pytest.raises(ValueError, match="offload_folder"):
        load_native_stack_from_safetensors(
            sf, offload_mode="disk", install_device="cpu"
        )


def test_is_fp8_recognises_e4m3fn() -> None:
    assert _is_fp8(torch.float8_e4m3fn) is True
    assert _is_fp8(torch.bfloat16) is False
    assert _is_fp8(torch.float32) is False


def test_fp8_linear_forward_numeric_closeness() -> None:
    in_f = 8
    out_f = 4
    ref = torch.nn.Linear(in_f, out_f, bias=True)
    ref.weight.data = torch.randn(out_f, in_f) * 0.05
    ref.bias.data = torch.zeros(out_f)

    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=True,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    fp8_weight = ref.weight.data.to(torch.float8_e4m3fn)
    fp8._parameters["weight"] = torch.nn.Parameter(fp8_weight, requires_grad=False)
    fp8._parameters["bias"] = torch.nn.Parameter(
        ref.bias.data.clone(), requires_grad=False
    )

    x = torch.randn(3, in_f) * 0.1
    out_ref = ref(x)
    out_fp8 = fp8(x)

    assert out_fp8.shape == out_ref.shape
    assert out_fp8.dtype == torch.float32
    diff = (out_fp8 - out_ref).abs().max().item()
    assert diff < 0.05


def test_fp8_linear_passthrough_for_non_fp8_weight() -> None:
    in_f = 6
    out_f = 3
    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=False,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    w = torch.randn(out_f, in_f) * 0.1
    fp8._parameters["weight"] = torch.nn.Parameter(w, requires_grad=False)

    x = torch.randn(2, in_f)
    out = fp8(x)
    assert out.shape == (2, out_f)
    assert out.dtype == torch.float32


class _FakeMetaModel(torch.nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.proj = torch.nn.Linear(4, 4, bias=False)

    @classmethod
    def make_with_meta_param(cls) -> "_FakeMetaModel":
        m = cls()
        meta_param = torch.nn.Parameter(
            torch.empty(4, 4, device="meta"), requires_grad=False
        )
        m.proj._parameters["weight"] = meta_param
        return m


def test_no_meta_tensors_remaining_detects_meta() -> None:
    m = _FakeMetaModel.make_with_meta_param()
    leftover = sl._no_meta_tensors_remaining(m)
    assert any("weight" in n for n in leftover)


def test_no_meta_tensors_remaining_empty_for_real_model() -> None:
    m = _FakeMetaModel()
    leftover = sl._no_meta_tensors_remaining(m)
    assert leftover == []


def test_validate_against_model_detects_mismatches() -> None:
    class _Tiny(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.a = torch.nn.Linear(4, 4, bias=False)
            self.b = torch.nn.Linear(4, 4, bias=False)

    model = _Tiny()
    state_dict = {
        "a.weight": torch.zeros(4, 4),
        "c.weight": torch.zeros(2, 2),
    }
    matched, missing, extra, shape_mismatches = sl._validate_against_model(
        state_dict, model
    )
    assert "b.weight" in missing
    assert "c.weight" in extra
    assert matched == 1
    assert shape_mismatches == []


def test_validate_against_model_detects_shape_mismatch() -> None:
    class _Tiny(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.a = torch.nn.Linear(4, 4, bias=False)

    model = _Tiny()
    state_dict = {"a.weight": torch.zeros(8, 8)}
    matched, missing, extra, shape_mismatches = sl._validate_against_model(
        state_dict, model
    )
    assert matched == 0
    assert shape_mismatches and shape_mismatches[0][0] == "a.weight"


def test_enumerate_offload_blocks_finds_modulelist() -> None:
    class _Outer(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.transformer_blocks = torch.nn.ModuleList(
                [torch.nn.Linear(2, 2) for _ in range(3)]
            )

    model = _Outer()
    blocks = sl._enumerate_offload_blocks(model)
    assert len(blocks) == 3
