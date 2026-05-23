from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

import pytest

torch = pytest.importorskip("torch")

from ltx_video_worker import ltx2_safetensors_loader as sl  # noqa: E402
from ltx_video_worker.gguf_loader import GGUFSchemaMismatch  # noqa: E402
from ltx_video_worker.ltx2_safetensors_loader import (  # noqa: E402
    ALLOWED_OFFLOAD_MODES,
    SCALE_SUFFIXES,
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


def test_fp8_linear_is_nn_module_and_exposes_params_and_buffers() -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=True,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    assert isinstance(fp8, torch.nn.Module)

    param_names = {n for n, _ in fp8.named_parameters()}
    assert "weight" in param_names
    assert "bias" in param_names

    assert "weight_scale" in fp8._buffers

    state = fp8.state_dict()
    assert "weight" in state
    assert "bias" in state


def test_fp8_linear_state_dict_includes_fp8_weight_when_nested() -> None:
    class _Parent(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = FP8Linear(
                in_features=4,
                out_features=2,
                bias=False,
                compute_dtype=torch.float32,
                device=torch.device("cpu"),
            )

    parent = _Parent()
    sd = parent.state_dict()
    assert "fc.weight" in sd
    assert sd["fc.weight"].dtype == torch.float8_e4m3fn

    param_names = [n for n, _ in parent.named_parameters()]
    assert "fc.weight" in param_names


def test_replace_linears_uses_setattr_so_module_registry_sees_child() -> None:
    class _Parent(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.proj = torch.nn.Linear(4, 2, bias=False)

    parent = _Parent()
    sd = {"proj.weight": torch.zeros(2, 4, dtype=torch.float8_e4m3fn)}
    swapped = sl._replace_linears_with_fp8(
        parent, sd, compute_dtype=torch.float32, device=torch.device("cpu")
    )
    assert swapped == 1
    assert isinstance(parent.proj, FP8Linear)

    children = {n for n, _ in parent.named_children()}
    assert "proj" in children


def test_fp8_linear_with_per_tensor_scale() -> None:
    in_f, out_f = 8, 4
    ref = torch.nn.Linear(in_f, out_f, bias=True)
    ref.weight.data = torch.randn(out_f, in_f) * 0.05
    ref.bias.data = torch.zeros(out_f)

    scale = torch.tensor(0.5)
    expected_w = ref.weight.data * scale

    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=True,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        ref.weight.data.to(torch.float8_e4m3fn), requires_grad=False
    )
    fp8.bias = torch.nn.Parameter(ref.bias.data.clone(), requires_grad=False)
    fp8.attach_scale(scale)

    x = torch.randn(3, in_f) * 0.1
    out_fp8 = fp8(x)
    out_ref = torch.nn.functional.linear(x, expected_w, ref.bias.data)

    assert out_fp8.shape == out_ref.shape
    diff = (out_fp8 - out_ref).abs().max().item()
    assert diff < 0.1


def test_fp8_linear_with_per_channel_scale() -> None:
    in_f, out_f = 8, 4
    ref = torch.nn.Linear(in_f, out_f, bias=False)
    ref.weight.data = torch.randn(out_f, in_f) * 0.05

    scale = torch.tensor([[0.1], [0.2], [0.3], [0.4]])
    expected_w = ref.weight.data * scale

    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=False,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        ref.weight.data.to(torch.float8_e4m3fn), requires_grad=False
    )
    fp8.attach_scale(scale)

    x = torch.randn(3, in_f) * 0.1
    out_fp8 = fp8(x)
    out_ref = torch.nn.functional.linear(x, expected_w, None)

    diff = (out_fp8 - out_ref).abs().max().item()
    assert diff < 0.1


def test_fp8_linear_scale_shape_mismatch_raises_clearly() -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=False,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    bad_scale = torch.ones(7)
    with pytest.raises(ValueError, match="numel"):
        fp8.attach_scale(bad_scale)

    too_many_dims = torch.ones(2, 1, 1)
    with pytest.raises(ValueError, match="scalar, 1D, or 2D"):
        fp8.attach_scale(too_many_dims)


def test_fp8_linear_forward_propagates_non_fp8_runtimeerror() -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=False,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        torch.zeros(2, 4, dtype=torch.float8_e4m3fn), requires_grad=False
    )

    class _BadScale:
        def to(self, *_a: Any, **_k: Any) -> Any:
            raise RuntimeError("totally unrelated tensor mismatch")

        ndim = 0
        shape = ()

        def numel(self) -> int:
            return 1

    fp8.weight_scale = None
    object.__setattr__(fp8, "weight_scale", _BadScale())

    with pytest.raises(RuntimeError, match="unrelated"):
        fp8(torch.randn(1, 4))


def test_fp8_linear_forward_catches_fp8_runtimeerror_and_warns(
    caplog: pytest.LogCaptureFixture,
) -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=False,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        (torch.randn(2, 4) * 0.05).to(torch.float8_e4m3fn), requires_grad=False
    )

    class _Fp8RaisingScale:
        ndim = 0
        shape = ()

        def numel(self) -> int:
            return 1

        def to(self, *_a: Any, **_k: Any) -> Any:
            raise RuntimeError("float8 path not implemented on this device")

    object.__setattr__(fp8, "weight_scale", _Fp8RaisingScale())

    with caplog.at_level(logging.WARNING, logger="ltx_video_worker.ltx2_safetensors_loader"):
        out = fp8(torch.randn(1, 4))

    assert out.shape == (1, 2)
    assert any("fp8-related RuntimeError" in r.message for r in caplog.records)


def test_install_raises_on_unconsumed_scale_suffix() -> None:
    class _Parent(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = torch.nn.Linear(4, 2, bias=False)

    parent = _Parent()
    fp8_w = torch.zeros(2, 4, dtype=torch.float8_e4m3fn)
    sd = {
        "fc.weight": fp8_w,
        "fc.weight.foo_scale": torch.tensor(0.5),
    }

    sl._replace_linears_with_fp8(
        parent, sd, compute_dtype=torch.float32, device=torch.device("cpu")
    )
    (
        installed,
        skipped,
        fp8_installed,
        unscaled,
        unconsumed,
    ) = sl._install_state_dict(
        parent,
        sd,
        install_device=torch.device("cpu"),
        compute_dtype=torch.float32,
    )
    assert fp8_installed == 1
    assert "fc.weight" in unscaled
    assert any(
        "foo_scale" in k for k in unconsumed
    ), f"expected foo_scale in {unconsumed}"


def test_scale_suffix_coverage_includes_known_variants() -> None:
    assert ".scale_weight" in SCALE_SUFFIXES
    assert ".weight_scale" in SCALE_SUFFIXES
    assert ".scale" in SCALE_SUFFIXES
    assert ".weight_scale_inv" in SCALE_SUFFIXES
    assert ".input_scale" in SCALE_SUFFIXES


def test_partition_extras_separates_scale_like_from_orphan() -> None:
    extras = [
        "random_garbage.weight",
        "block.0.fc.weight.weight_scale_inv",
        "block.0.fc.weight.scale_weight",
        "totally.unrelated.bias",
    ]
    scale_like, orphan = sl._partition_extras(extras)
    assert "random_garbage.weight" in orphan
    assert "totally.unrelated.bias" in orphan
    assert any("weight_scale_inv" in k for k in scale_like)
    assert any("scale_weight" in k for k in scale_like)


class _SyntheticBlock(torch.nn.Module):
    @classmethod
    def make_meta(cls) -> "_SyntheticBlock":
        b = cls.__new__(cls)
        torch.nn.Module.__init__(b)
        b.fp8_proj = torch.nn.Linear(4, 4, bias=True, device="meta")
        b.bf16_proj = torch.nn.Linear(4, 4, bias=False, device="meta")
        return b


class _SyntheticTwoProjModel(torch.nn.Module):
    @classmethod
    def make_meta(cls) -> "_SyntheticTwoProjModel":
        m = cls.__new__(cls)
        torch.nn.Module.__init__(m)
        m.transformer_blocks = torch.nn.ModuleList(
            [_SyntheticBlock.make_meta()]
        )
        return m


@pytest.fixture
def synthetic_fp8_safetensors(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> Path:
    from safetensors.torch import save_file

    monkeypatch.setattr(
        "ltx_core.loader.helpers.create_meta_model",
        lambda configurator, config: _SyntheticTwoProjModel.make_meta(),
    )
    monkeypatch.setattr(
        "ltx_core.model.transformer.model_configurator.LTXModelConfigurator",
        object,
        raising=False,
    )
    monkeypatch.setattr(
        "ltx_core.model.transformer.model_configurator.LTXVideoOnlyModelConfigurator",
        object,
        raising=False,
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader._rebind_preprocessor_modules",
        lambda _m: None,
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader.rename_comfy_keys",
        lambda sd: sd,
    )

    fp8_weight_real = (torch.randn(4, 4) * 0.05).to(torch.float8_e4m3fn)
    bf16_weight = torch.randn(4, 4, dtype=torch.bfloat16) * 0.05
    bias = torch.zeros(4, dtype=torch.bfloat16)
    scale = torch.tensor(1.0)

    tensors = {
        "transformer_blocks.0.fp8_proj.weight": fp8_weight_real,
        "transformer_blocks.0.fp8_proj.bias": bias,
        "transformer_blocks.0.fp8_proj.weight_scale": scale,
        "transformer_blocks.0.bf16_proj.weight": bf16_weight,
    }
    metadata = {"config": json.dumps({"transformer": {"any": "value"}})}
    sf_path = tmp_path / "synthetic.safetensors"
    save_file(tensors, str(sf_path), metadata=metadata)
    return sf_path


def test_load_native_stack_synthetic_round_trip(
    synthetic_fp8_safetensors: Path,
) -> None:
    bundle = load_native_stack_from_safetensors(
        synthetic_fp8_safetensors,
        audio=False,
        install_device="cpu",
        offload_mode="none",
        strict_schema=False,
    )

    model = bundle.transformer
    block = model.transformer_blocks[0]
    assert sl._no_meta_tensors_remaining(model) == []
    assert isinstance(block.fp8_proj, FP8Linear)
    assert block.fp8_proj.weight.dtype == torch.float8_e4m3fn
    assert block.fp8_proj.weight_scale is not None
    assert isinstance(block.bf16_proj, torch.nn.Linear)

    x = torch.randn(1, 4, dtype=torch.bfloat16)
    out = block.fp8_proj(x)
    assert torch.isfinite(out).all()


def test_load_native_stack_round_trip_with_sequential_offload(
    synthetic_fp8_safetensors: Path,
) -> None:
    bundle = load_native_stack_from_safetensors(
        synthetic_fp8_safetensors,
        audio=False,
        install_device="cpu",
        offload_mode="sequential",
        strict_schema=False,
    )

    model = bundle.transformer
    block = model.transformer_blocks[0]
    assert isinstance(block.fp8_proj, FP8Linear)
    assert getattr(block, "_hf_hook", None) is not None

    x = torch.randn(1, 4, dtype=torch.bfloat16)
    out = block.bf16_proj(x)
    assert torch.isfinite(out).all()


def test_load_native_stack_round_trip_with_group_offload(
    synthetic_fp8_safetensors: Path,
) -> None:
    bundle = load_native_stack_from_safetensors(
        synthetic_fp8_safetensors,
        audio=False,
        install_device="cpu",
        offload_mode="group",
        strict_schema=False,
    )

    model = bundle.transformer
    block = model.transformer_blocks[0]
    assert isinstance(block.fp8_proj, FP8Linear)
    assert getattr(model, "_hf_hook", None) is not None

    x = torch.randn(1, 4, dtype=torch.bfloat16)
    out = block.bf16_proj(x)
    assert torch.isfinite(out).all()


def test_load_native_stack_raises_on_unknown_suffix_scale_key(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    from safetensors.torch import save_file

    class _SingleFp8Model(torch.nn.Module):
        @classmethod
        def make_meta(cls) -> "_SingleFp8Model":
            m = cls.__new__(cls)
            torch.nn.Module.__init__(m)
            m.fp8_proj = torch.nn.Linear(4, 4, bias=True, device="meta")
            return m

    monkeypatch.setattr(
        "ltx_core.loader.helpers.create_meta_model",
        lambda configurator, config: _SingleFp8Model.make_meta(),
    )
    monkeypatch.setattr(
        "ltx_core.model.transformer.model_configurator.LTXModelConfigurator",
        object,
        raising=False,
    )
    monkeypatch.setattr(
        "ltx_core.model.transformer.model_configurator.LTXVideoOnlyModelConfigurator",
        object,
        raising=False,
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader._rebind_preprocessor_modules",
        lambda _m: None,
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader.rename_comfy_keys",
        lambda sd: sd,
    )

    fp8_weight = (torch.randn(4, 4) * 0.05).to(torch.float8_e4m3fn)
    bias = torch.zeros(4, dtype=torch.bfloat16)
    bogus_scale = torch.tensor(0.5)

    tensors = {
        "fp8_proj.weight": fp8_weight,
        "fp8_proj.bias": bias,
        "fp8_proj.foo_scale": bogus_scale,
    }
    metadata = {"config": json.dumps({"transformer": {"any": "value"}})}
    sf_path = tmp_path / "bogus_scale.safetensors"
    save_file(tensors, str(sf_path), metadata=metadata)

    with pytest.raises(SafetensorsSchemaMismatch) as excinfo:
        load_native_stack_from_safetensors(
            sf_path,
            audio=False,
            install_device="cpu",
            offload_mode="none",
            strict_schema=False,
        )

    msg = str(excinfo.value)
    assert "fp8_proj.foo_scale" in msg, f"expected unconsumed scale key in {msg!r}"
    assert "fp8_proj.weight" in msg, f"expected unscaled fp8 weight in {msg!r}"


def test_load_strict_rejects_orphan_extra(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    from safetensors.torch import save_file

    class _Tiny(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = torch.nn.Linear(4, 2, bias=False, device="meta")

    fake_create = lambda configurator, config: _Tiny()  # noqa: E731
    monkeypatch.setattr(
        "ltx_core.loader.helpers.create_meta_model", fake_create
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader._rebind_preprocessor_modules",
        lambda _m: None,
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader.rename_comfy_keys",
        lambda sd: sd,
    )

    tensors = {
        "fc.weight": torch.zeros(2, 4, dtype=torch.bfloat16),
        "random_garbage.weight": torch.zeros(2, 2, dtype=torch.bfloat16),
    }
    metadata = {"config": json.dumps({"transformer": {"any": "value"}})}
    sf_path = tmp_path / "orphan.safetensors"
    save_file(tensors, str(sf_path), metadata=metadata)

    with pytest.raises(SafetensorsSchemaMismatch, match="random_garbage"):
        load_native_stack_from_safetensors(
            sf_path, install_device="cpu", strict_schema=True
        )


def test_load_strict_false_allows_orphan_extra_with_warning(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
    caplog: pytest.LogCaptureFixture,
) -> None:
    from safetensors.torch import save_file

    class _Tiny(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = torch.nn.Linear(4, 2, bias=False, device="meta")

    fake_create = lambda configurator, config: _Tiny()  # noqa: E731
    monkeypatch.setattr(
        "ltx_core.loader.helpers.create_meta_model", fake_create
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader._rebind_preprocessor_modules",
        lambda _m: None,
    )
    monkeypatch.setattr(
        "ltx_video_worker.ltx2_safetensors_loader.rename_comfy_keys",
        lambda sd: sd,
    )

    tensors = {
        "fc.weight": torch.zeros(2, 4, dtype=torch.bfloat16),
        "random_garbage.weight": torch.zeros(2, 2, dtype=torch.bfloat16),
    }
    metadata = {"config": json.dumps({"transformer": {"any": "value"}})}
    sf_path = tmp_path / "orphan.safetensors"
    save_file(tensors, str(sf_path), metadata=metadata)

    with caplog.at_level(logging.WARNING, logger="ltx_video_worker.ltx2_safetensors_loader"):
        bundle = load_native_stack_from_safetensors(
            sf_path, install_device="cpu", strict_schema=False
        )
    assert bundle.transformer is not None
    assert any("orphan extra" in r.message for r in caplog.records)


def test_meta_verifier_catches_uninstalled_fp8_linear() -> None:
    class _Parent(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = torch.nn.Linear(4, 2, bias=False, device="meta")

    parent = _Parent()
    sd = {"fc.weight": torch.zeros(2, 4, dtype=torch.float8_e4m3fn)}
    sl._replace_linears_with_fp8(
        parent, sd, compute_dtype=torch.float32, device=torch.device("cpu")
    )
    leftover = sl._no_meta_tensors_remaining(parent)
    assert any("fc.weight" in n for n in leftover)


def test_load_signature_does_not_accept_offload_device(
    tmp_path: Path,
) -> None:
    import inspect

    sig = inspect.signature(load_native_stack_from_safetensors)
    assert "offload_device" not in sig.parameters


def test_fp8_linear_registers_input_scale_buffer() -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=False,
        compute_dtype=torch.bfloat16,
        device=torch.device("cpu"),
    )
    assert "input_scale" in fp8._buffers
    assert fp8.input_scale is None


def test_fp8_linear_attach_input_scale_rejects_non_scalar() -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=False,
        compute_dtype=torch.bfloat16,
        device=torch.device("cpu"),
    )
    with pytest.raises(ValueError, match="scalar"):
        fp8.attach_input_scale(torch.ones(4))
    with pytest.raises(ValueError, match="scalar"):
        fp8.attach_input_scale(torch.ones(2, 2))


def test_fp8_linear_attach_input_scale_accepts_scalar_and_size1() -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=False,
        compute_dtype=torch.bfloat16,
        device=torch.device("cpu"),
    )
    fp8.attach_input_scale(torch.tensor(0.125))
    assert fp8.input_scale is not None
    assert fp8.input_scale.numel() == 1
    fp8.attach_input_scale(torch.tensor([0.25]))
    assert fp8.input_scale.numel() == 1
    fp8.attach_input_scale(None)
    assert fp8.input_scale is None


def test_fp8_linear_can_use_scaled_mm_gates_correctly() -> None:
    fp8 = FP8Linear(
        in_features=4,
        out_features=2,
        bias=False,
        compute_dtype=torch.bfloat16,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        torch.zeros(2, 4, dtype=torch.float8_e4m3fn), requires_grad=False
    )
    assert fp8._can_use_scaled_mm() is False
    fp8.attach_scale(torch.tensor(0.5))
    assert fp8._can_use_scaled_mm() is False
    fp8.attach_input_scale(torch.tensor(0.125))
    assert fp8._can_use_scaled_mm() is True
    fp8.attach_scale(torch.tensor([[0.1], [0.2]]))
    assert fp8._can_use_scaled_mm() is False


def test_fp8_linear_scaled_mm_forward_invokes_with_correct_layout(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    in_f, out_f, batch = 8, 4, 2
    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=True,
        compute_dtype=torch.bfloat16,
        device=torch.device("cpu"),
    )
    w = (torch.randn(out_f, in_f) * 0.05).to(torch.float8_e4m3fn)
    fp8.weight = torch.nn.Parameter(w, requires_grad=False)
    fp8.bias = torch.nn.Parameter(
        torch.zeros(out_f, dtype=torch.bfloat16), requires_grad=False
    )
    fp8.attach_scale(torch.tensor(0.5))
    fp8.attach_input_scale(torch.tensor(0.125))

    captured: dict[str, Any] = {}

    def fake_scaled_mm(
        mat1: Any,
        mat2: Any,
        scale_a: Any = None,
        scale_b: Any = None,
        bias: Any = None,
        out_dtype: Any = None,
        use_fast_accum: bool = False,
        **kwargs: Any,
    ) -> Any:
        captured["mat1_shape"] = tuple(mat1.shape)
        captured["mat1_dtype"] = mat1.dtype
        captured["mat2_shape"] = tuple(mat2.shape)
        captured["mat2_dtype"] = mat2.dtype
        captured["scale_a"] = scale_a
        captured["scale_b"] = scale_b
        captured["bias_dtype"] = bias.dtype if bias is not None else None
        captured["out_dtype"] = out_dtype
        captured["use_fast_accum"] = use_fast_accum
        return torch.zeros(mat1.shape[0], mat2.shape[1], dtype=out_dtype)

    monkeypatch.setattr(torch, "_scaled_mm", fake_scaled_mm, raising=False)

    x = torch.randn(batch, in_f, dtype=torch.bfloat16) * 0.1
    out = fp8(x)
    assert out.shape == (batch, out_f)
    assert out.dtype == torch.bfloat16

    assert captured["mat1_shape"] == (batch, in_f)
    assert captured["mat1_dtype"] == torch.float8_e4m3fn
    assert captured["mat2_shape"] == (in_f, out_f)
    assert captured["mat2_dtype"] == torch.float8_e4m3fn
    assert captured["bias_dtype"] == torch.bfloat16
    assert captured["out_dtype"] == torch.bfloat16
    assert captured["use_fast_accum"] is False
    assert isinstance(captured["scale_a"], torch.Tensor)
    assert isinstance(captured["scale_b"], torch.Tensor)
    assert captured["scale_a"].dtype == torch.float32
    assert captured["scale_b"].dtype == torch.float32


def test_fp8_linear_scaled_mm_forward_flattens_3d_input(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    in_f, out_f = 8, 4
    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=False,
        compute_dtype=torch.bfloat16,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        (torch.randn(out_f, in_f) * 0.05).to(torch.float8_e4m3fn),
        requires_grad=False,
    )
    fp8.attach_scale(torch.tensor(0.5))
    fp8.attach_input_scale(torch.tensor(0.125))

    def fake_scaled_mm(mat1: Any, mat2: Any, **kwargs: Any) -> Any:
        return torch.zeros(
            mat1.shape[0], mat2.shape[1], dtype=kwargs.get("out_dtype")
        )

    monkeypatch.setattr(torch, "_scaled_mm", fake_scaled_mm, raising=False)

    x = torch.randn(2, 5, in_f, dtype=torch.bfloat16) * 0.1
    out = fp8(x)
    assert out.shape == (2, 5, out_f)


def test_fp8_linear_falls_back_to_upcast_when_scaled_mm_unsupported(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    in_f, out_f = 8, 4
    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=False,
        compute_dtype=torch.float32,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        (torch.randn(out_f, in_f) * 0.05).to(torch.float8_e4m3fn),
        requires_grad=False,
    )
    fp8.attach_scale(torch.tensor(0.5))
    fp8.attach_input_scale(torch.tensor(0.125))

    def raising_scaled_mm(*_a: Any, **_k: Any) -> Any:
        raise RuntimeError("scaled_mm not supported on this device")

    monkeypatch.setattr(torch, "_scaled_mm", raising_scaled_mm, raising=False)

    with caplog.at_level(
        logging.WARNING, logger="ltx_video_worker.ltx2_safetensors_loader"
    ):
        out = fp8(torch.randn(2, in_f) * 0.1)
    assert out.shape == (2, out_f)
    assert any(
        "scaled_mm" in r.message for r in caplog.records
    ), "expected fallback warning mentioning scaled_mm"


def test_fp8_linear_scaled_mm_propagates_non_recognized_runtimeerror(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    in_f, out_f = 4, 2
    fp8 = FP8Linear(
        in_features=in_f,
        out_features=out_f,
        bias=False,
        compute_dtype=torch.bfloat16,
        device=torch.device("cpu"),
    )
    fp8.weight = torch.nn.Parameter(
        torch.zeros(out_f, in_f, dtype=torch.float8_e4m3fn),
        requires_grad=False,
    )
    fp8.attach_scale(torch.tensor(0.5))
    fp8.attach_input_scale(torch.tensor(0.125))

    def raising(*_a: Any, **_k: Any) -> Any:
        raise RuntimeError("totally unrelated cuda OOM")

    monkeypatch.setattr(torch, "_scaled_mm", raising, raising=False)

    with pytest.raises(RuntimeError, match="cuda OOM"):
        fp8(torch.randn(1, in_f, dtype=torch.bfloat16))


def test_install_state_dict_captures_input_scale_separately() -> None:
    class _Parent(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = torch.nn.Linear(4, 2, bias=False)

    parent = _Parent()
    fp8_w = (torch.randn(2, 4) * 0.05).to(torch.float8_e4m3fn)
    sd = {
        "fc.weight": fp8_w,
        "fc.weight_scale": torch.tensor(0.5),
        "fc.input_scale": torch.tensor(0.125),
    }
    sl._replace_linears_with_fp8(
        parent, sd, compute_dtype=torch.bfloat16, device=torch.device("cpu")
    )
    (
        installed,
        skipped,
        fp8_installed,
        unscaled,
        unconsumed,
    ) = sl._install_state_dict(
        parent,
        sd,
        install_device=torch.device("cpu"),
        compute_dtype=torch.bfloat16,
    )
    assert fp8_installed == 1
    assert unscaled == []
    assert unconsumed == []
    assert isinstance(parent.fc, FP8Linear)
    assert parent.fc.weight_scale is not None
    assert parent.fc.input_scale is not None
    assert parent.fc.weight_scale.item() == pytest.approx(0.5)
    assert parent.fc.input_scale.item() == pytest.approx(0.125)


def test_install_state_dict_input_scale_without_weight_scale_marks_unscaled() -> None:
    class _Parent(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = torch.nn.Linear(4, 2, bias=False)

    parent = _Parent()
    fp8_w = (torch.randn(2, 4) * 0.05).to(torch.float8_e4m3fn)
    sd = {
        "fc.weight": fp8_w,
        "fc.input_scale": torch.tensor(0.125),
    }
    sl._replace_linears_with_fp8(
        parent, sd, compute_dtype=torch.bfloat16, device=torch.device("cpu")
    )
    (
        _installed,
        _skipped,
        fp8_installed,
        unscaled,
        unconsumed,
    ) = sl._install_state_dict(
        parent,
        sd,
        install_device=torch.device("cpu"),
        compute_dtype=torch.bfloat16,
    )
    assert fp8_installed == 1
    assert "fc.weight" in unscaled
    assert unconsumed == []
    assert parent.fc.input_scale is not None
    assert parent.fc.weight_scale is None
