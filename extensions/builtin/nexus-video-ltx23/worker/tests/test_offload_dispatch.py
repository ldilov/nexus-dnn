"""Tests for the pipeline placement + offload dispatch surface.

The host always resolves Auto + per-profile defaults + operator
overrides into a concrete component-placement triple before dispatch,
so the worker side is authoritative-triple-driven. These tests cover:

- payload extraction (`_offload_mode_from_params`,
  `_component_placement_from_params`, `_scheduler_from_params`,
  `_text_encoder_quant_from_params`, `_coerce_optional_float`)
- the unified `_place_pipeline` dispatch (none → direct placement,
  model/sequential → offload hook + vae/text-encoder placement)
- `_place_components` per-submodule moves
- `_apply_scheduler_choice` + `_apply_text_encoder_quant` guards

All pure on their inputs apart from method calls on MagicMock pipes /
a SimpleNamespace torch stand-in — no real diffusers/torch import.
"""

from __future__ import annotations

from types import SimpleNamespace
from typing import Any
from unittest.mock import MagicMock

import pytest

from ltx_video_worker import pipeline_diffusers as pd
from ltx_video_worker.pipeline_diffusers import _ModelLoadFailed

_ALL_CUDA = {"transformer": "cuda", "vae": "cuda", "text_encoder": "cuda"}
_NVFP4_16GB = {"transformer": "cuda", "vae": "cuda", "text_encoder": "cpu"}
_ALL_CPU = {"transformer": "cpu", "vae": "cpu", "text_encoder": "cpu"}


def _fake_torch(total_bytes: int, free_bytes: int | None = None) -> Any:
    if free_bytes is None:
        free_bytes = total_bytes
    cuda = SimpleNamespace(mem_get_info=lambda: (free_bytes, total_bytes))
    return SimpleNamespace(cuda=cuda)


def _logger() -> Any:
    return SimpleNamespace(info=lambda *a, **k: None)


def _pipe_with_components() -> Any:
    """A MagicMock pipe whose transformer/vae/text_encoder are distinct
    mocks so we can assert exactly which got moved where. LTX-2.3 has a
    single T5 encoder, so text_encoder_2 is absent (None)."""
    pipe = MagicMock(name="pipe")
    pipe.transformer = MagicMock(name="transformer")
    pipe.vae = MagicMock(name="vae")
    pipe.text_encoder = MagicMock(name="text_encoder")
    pipe.text_encoder_2 = None
    return pipe


# ---------------------------------------------------------------------------
# payload extraction
# ---------------------------------------------------------------------------


def test_offload_mode_from_params_returns_explicit_value() -> None:
    assert pd._offload_mode_from_params({"advanced": {"offload_mode": "none"}}) == "none"
    assert (
        pd._offload_mode_from_params({"advanced": {"offload_mode": "model"}}) == "model"
    )
    assert (
        pd._offload_mode_from_params({"advanced": {"offload_mode": "sequential"}})
        == "sequential"
    )


def test_offload_mode_from_params_defaults_when_missing() -> None:
    assert pd._offload_mode_from_params({}) == "sequential"
    assert (
        pd._offload_mode_from_params({"advanced": {"guidance_scale": 4.0}})
        == "sequential"
    )
    assert (
        pd._offload_mode_from_params({"advanced": {"offload_mode": None}})
        == "sequential"
    )


def test_component_placement_from_params_returns_resolved_triple() -> None:
    # The host always sends a concrete triple — extraction is verbatim.
    result = pd._component_placement_from_params(
        {
            "advanced": {
                "component_placement": {
                    "transformer": "cuda",
                    "vae": "cuda",
                    "text_encoder": "cpu",
                }
            }
        }
    )
    assert result == _NVFP4_16GB


def test_component_placement_from_params_falls_back_for_stale_payload() -> None:
    # A payload predating the contract (no advanced / no triple /
    # malformed) collapses to the historical all-CPU placement so an
    # old queued render behaves exactly as it did before this feature.
    assert pd._component_placement_from_params({}) == _ALL_CPU
    assert pd._component_placement_from_params({"advanced": {}}) == _ALL_CPU
    assert (
        pd._component_placement_from_params(
            {"advanced": {"component_placement": {"transformer": "gpu"}}}  # typo
        )
        == _ALL_CPU
    )
    # Partial triple → wholesale fallback rather than a half-resolved mix.
    assert (
        pd._component_placement_from_params(
            {"advanced": {"component_placement": {"transformer": "cuda"}}}
        )
        == _ALL_CPU
    )


def test_scheduler_from_params_defaults_to_flow_match_euler() -> None:
    assert pd._scheduler_from_params({}) == "flow_match_euler"
    assert (
        pd._scheduler_from_params({"advanced": {"scheduler": "flow_match_heun"}})
        == "flow_match_heun"
    )
    # Unknown values pass through — validation is in _apply_scheduler_choice.
    assert pd._scheduler_from_params({"advanced": {"scheduler": "ddim"}}) == "ddim"


def test_quantization_from_params_defaults_to_none() -> None:
    # Host resolves the per-profile default (nvfp4 → nf4) before
    # dispatch; the worker reads the concrete value. Missing/garbage
    # → "none" (correct for fake/CI; loud-fail for real profiles on a
    # small card rather than silent mis-quant).
    assert pd._quantization_from_params({}) == "none"
    assert pd._quantization_from_params({"advanced": {}}) == "none"
    assert (
        pd._quantization_from_params({"advanced": {"quantization": "nf4"}}) == "nf4"
    )
    assert (
        pd._quantization_from_params({"advanced": {"quantization": "int8"}}) == "int8"
    )
    assert (
        pd._quantization_from_params({"advanced": {"quantization": "garbage"}})
        == "none"
    )


def test_build_pipeline_quant_config_none_returns_none() -> None:
    assert pd._build_pipeline_quant_config("none", None) is None


def test_build_pipeline_quant_config_rejects_unknown() -> None:
    with pytest.raises(_ModelLoadFailed) as info:
        pd._build_pipeline_quant_config("fp8", None)
    assert "unknown quantization" in str(info.value)


def _quant_stack_available() -> bool:
    try:
        import bitsandbytes  # type: ignore  # noqa: F401
        from diffusers.quantizers import (  # type: ignore  # noqa: F401
            PipelineQuantizationConfig,
        )

        return True
    except ImportError:
        return False


def test_build_pipeline_quant_config_nf4_targets_both_heavy_components() -> None:
    # bitsandbytes lives in the RUNTIME venv, not necessarily the test
    # venv — skip if the stack isn't importable here. The runtime path
    # + GPU smoke is the real validation; this just guards the config
    # shape when the deps are present.
    if not _quant_stack_available():
        pytest.skip("bitsandbytes / PipelineQuantizationConfig not in test venv")
    cfg = pd._build_pipeline_quant_config("nf4", None)
    assert cfg is not None
    components = set(getattr(cfg, "components_to_quantize", []) or [])
    assert {"transformer", "text_encoder"}.issubset(components)
    assert "4bit" in getattr(cfg, "quant_backend", "")


def test_coerce_optional_float_handles_null_and_numbers() -> None:
    assert pd._coerce_optional_float(None) is None
    assert pd._coerce_optional_float(0.05) == 0.05
    assert pd._coerce_optional_float(7) == 7.0
    assert pd._coerce_optional_float("oops") is None
    assert pd._coerce_optional_float([0.5]) is None


# ---------------------------------------------------------------------------
# _place_components
# ---------------------------------------------------------------------------


def test_place_components_moves_each_named_submodule() -> None:
    pipe = _pipe_with_components()
    pd._place_components(pipe, _NVFP4_16GB, _logger(), include_transformer=True)
    pipe.transformer.to.assert_called_once_with("cuda")
    pipe.vae.to.assert_called_once_with("cuda")
    pipe.text_encoder.to.assert_called_once_with("cpu")


def test_place_components_skips_transformer_when_excluded() -> None:
    pipe = _pipe_with_components()
    pd._place_components(pipe, _NVFP4_16GB, _logger(), include_transformer=False)
    pipe.transformer.to.assert_not_called()
    pipe.vae.to.assert_called_once_with("cuda")
    pipe.text_encoder.to.assert_called_once_with("cpu")


# ---------------------------------------------------------------------------
# _place_pipeline — none mode
# ---------------------------------------------------------------------------


def test_place_pipeline_none_keeps_t5_off_gpu_for_nvfp4_shape() -> None:
    # The regression that mattered: the nvfp4-on-16GB triple keeps the
    # ~11 GB T5 on CPU so the transformer + activations fit. NO
    # pipe.to() sweep (that was the 2026-05-15 OOM/hang).
    pipe = _pipe_with_components()
    torch_mod = _fake_torch(total_bytes=17_100_000_000, free_bytes=16_000_000_000)

    result = pd._place_pipeline(
        pipe=pipe,
        offload_mode="none",
        placement=_NVFP4_16GB,
        torch_mod=torch_mod,
        logger=_logger(),
    )

    pipe.to.assert_not_called()
    pipe.transformer.to.assert_called_once_with("cuda")
    pipe.vae.to.assert_called_once_with("cuda")
    pipe.text_encoder.to.assert_called_once_with("cpu")
    pipe.enable_model_cpu_offload.assert_not_called()
    pipe.enable_sequential_cpu_offload.assert_not_called()
    assert result is pipe


def test_place_pipeline_none_admits_real_16gb_card() -> None:
    # A genuine 16 GB RTX 5070 Ti reports ~15.92 GiB (1.710e10 bytes)
    # — the 15-GiB floor must admit it, not reject by an ~80 MB margin
    # like the old 16-GiB threshold did.
    pipe = _pipe_with_components()
    torch_mod = _fake_torch(total_bytes=17_100_000_000)
    pd._place_pipeline(
        pipe=pipe,
        offload_mode="none",
        placement=_ALL_CUDA,
        torch_mod=torch_mod,
        logger=_logger(),
    )
    pipe.transformer.to.assert_called_once_with("cuda")


def test_place_pipeline_none_rejects_small_vram_when_any_cuda() -> None:
    pipe = _pipe_with_components()
    torch_mod = _fake_torch(total_bytes=8 * 1024**3)
    with pytest.raises(_ModelLoadFailed) as info:
        pd._place_pipeline(
            pipe=pipe,
            offload_mode="none",
            placement=_NVFP4_16GB,  # transformer=cuda → triggers the check
            torch_mod=torch_mod,
            logger=_logger(),
        )
    assert "16 GB" in str(info.value)
    pipe.transformer.to.assert_not_called()


def test_place_pipeline_none_skips_vram_check_when_all_cpu() -> None:
    # An all-CPU placement under none never touches CUDA, so a tiny /
    # absent GPU must not raise.
    pipe = _pipe_with_components()
    torch_mod = _fake_torch(total_bytes=2 * 1024**3)
    pd._place_pipeline(
        pipe=pipe,
        offload_mode="none",
        placement=_ALL_CPU,
        torch_mod=torch_mod,
        logger=_logger(),
    )
    pipe.transformer.to.assert_called_once_with("cpu")


def test_place_pipeline_none_skips_transformer_when_pre_placed() -> None:
    # GGUF install already put the transformer on its device — don't
    # move it again (GGUFParameter ignores stock .to() anyway).
    pipe = _pipe_with_components()
    torch_mod = _fake_torch(total_bytes=17_100_000_000)
    pd._place_pipeline(
        pipe=pipe,
        offload_mode="none",
        placement=_NVFP4_16GB,
        torch_mod=torch_mod,
        logger=_logger(),
        transformer_pre_placed=True,
    )
    pipe.transformer.to.assert_not_called()
    pipe.vae.to.assert_called_once_with("cuda")
    pipe.text_encoder.to.assert_called_once_with("cpu")


# ---------------------------------------------------------------------------
# _place_pipeline — model / sequential modes
# ---------------------------------------------------------------------------


def test_place_pipeline_model_installs_hook_and_places_nothing() -> None:
    # enable_model_cpu_offload OWNS every component's placement: it
    # keeps weights on CPU and pages each submodule onto the GPU only
    # while active, bridging cross-device tensors itself. Manually
    # .to()-ing vae/text_encoder on top would fight the hook and
    # reintroduce the 2026-05-15 cross-device mismatch. So under model
    # we install the hook and place NOTHING by hand.
    pipe = _pipe_with_components()
    pd._place_pipeline(
        pipe=pipe,
        offload_mode="model",
        placement={"transformer": "cpu", "vae": "cuda", "text_encoder": "cuda"},
        torch_mod=_fake_torch(total_bytes=17_100_000_000),
        logger=_logger(),
    )
    pipe.enable_model_cpu_offload.assert_called_once_with()
    pipe.transformer.to.assert_not_called()
    pipe.vae.to.assert_not_called()
    pipe.text_encoder.to.assert_not_called()


def test_place_pipeline_sequential_installs_hook() -> None:
    pipe = _pipe_with_components()
    pd._place_pipeline(
        pipe=pipe,
        offload_mode="sequential",
        placement=_ALL_CPU,
        torch_mod=_fake_torch(total_bytes=17_100_000_000),
        logger=_logger(),
    )
    pipe.enable_sequential_cpu_offload.assert_called_once_with()
    pipe.transformer.to.assert_not_called()


def test_place_pipeline_sequential_falls_back_to_model_offload() -> None:
    class OldPipe:
        def __init__(self) -> None:
            self.vae = MagicMock()
            self.text_encoder = MagicMock()
            self.text_encoder_2 = None
            self.called = False

        def enable_model_cpu_offload(self) -> None:
            self.called = True

    pipe = OldPipe()
    pd._place_pipeline(
        pipe=pipe,
        offload_mode="sequential",
        placement=_ALL_CPU,
        torch_mod=_fake_torch(total_bytes=17_100_000_000),
        logger=_logger(),
    )
    assert pipe.called is True


def test_place_pipeline_model_raises_when_helper_missing() -> None:
    class HelperLessPipe:
        vae = MagicMock()
        text_encoder = MagicMock()
        text_encoder_2 = None

    with pytest.raises(_ModelLoadFailed) as info:
        pd._place_pipeline(
            pipe=HelperLessPipe(),
            offload_mode="model",
            placement=_ALL_CPU,
            torch_mod=_fake_torch(total_bytes=17_100_000_000),
            logger=_logger(),
        )
    assert "enable_model_cpu_offload" in str(info.value)


def test_place_pipeline_rejects_unknown_mode() -> None:
    pipe = _pipe_with_components()
    with pytest.raises(_ModelLoadFailed) as info:
        pd._place_pipeline(
            pipe=pipe,
            offload_mode="auto",  # host MUST resolve Auto away
            placement=_ALL_CPU,
            torch_mod=_fake_torch(total_bytes=17_100_000_000),
            logger=_logger(),
        )
    assert "unknown offload_mode" in str(info.value)
    assert "'auto'" in str(info.value)


# ---------------------------------------------------------------------------
# scheduler + text-encoder-quant guards
# ---------------------------------------------------------------------------


def test_apply_scheduler_choice_noop_for_default() -> None:
    pipe = MagicMock(name="pipe")
    pd._apply_scheduler_choice(pipe, "flow_match_euler", _logger())
    assert not pipe.scheduler.from_config.called


def test_apply_scheduler_choice_rejects_unknown() -> None:
    pipe = MagicMock(name="pipe")
    with pytest.raises(_ModelLoadFailed) as info:
        pd._apply_scheduler_choice(pipe, "ddim", _logger())
    assert "unknown scheduler" in str(info.value)


def test_build_pipeline_quant_config_int8_uses_8bit_backend() -> None:
    if not _quant_stack_available():
        pytest.skip("bitsandbytes / PipelineQuantizationConfig not in test venv")
    cfg = pd._build_pipeline_quant_config("int8", None)
    assert cfg is not None
    backend = getattr(cfg, "quant_backend", "")
    assert "8bit" in backend or "8_bit" in backend


# ---------------------------------------------------------------------------
# operator VRAM ceiling — _max_gpu_vram_gib_from_params + _apply_vram_budget
# ---------------------------------------------------------------------------

_GIB = 1024**3


def _budget_torch(
    total_gib: float,
    *,
    physical_gib: float | None = None,
    raise_info: bool = False,
    raise_set: bool = False,
    raise_props: bool = False,
) -> tuple[Any, list[float]]:
    """Fake torch whose cuda namespace records the fraction passed to
    set_per_process_memory_fraction. Returns (torch, recorded_calls).

    `total_gib` is the mem_get_info() total (WDDM-committed budget on
    Windows). `physical_gib` is get_device_properties().total_memory
    (physical VRAM) — defaults to `total_gib` so existing callers see
    no divergence; set it explicitly to simulate the WDDM gap.
    """
    physical = total_gib if physical_gib is None else physical_gib
    recorded: list[float] = []

    def _mem_get_info() -> tuple[int, int]:
        if raise_info:
            raise RuntimeError("no cuda")
        total = int(total_gib * _GIB)
        return total, total

    def _get_device_properties(_idx: int) -> Any:
        if raise_props:
            raise RuntimeError("no device properties")
        return SimpleNamespace(total_memory=int(physical * _GIB))

    def _set_fraction(fraction: float, device: int) -> None:
        if raise_set:
            raise RuntimeError("driver rejected fraction")
        recorded.append(fraction)

    cuda = SimpleNamespace(
        mem_get_info=_mem_get_info,
        get_device_properties=_get_device_properties,
        set_per_process_memory_fraction=_set_fraction,
    )
    return SimpleNamespace(cuda=cuda), recorded


@pytest.mark.parametrize(
    "advanced, expected",
    [
        ({"max_gpu_vram_gib": 15}, 15),
        ({"max_gpu_vram_gib": 4}, 4),
        ({"max_gpu_vram_gib": 128}, 128),
        ({"max_gpu_vram_gib": 3}, None),  # below floor
        ({"max_gpu_vram_gib": 129}, None),  # above ceiling
        ({"max_gpu_vram_gib": True}, None),  # bool is not an int budget
        ({"max_gpu_vram_gib": 15.5}, None),  # non-integral
        ({"max_gpu_vram_gib": "15"}, None),  # string
        ({}, None),  # absent
    ],
)
def test_max_gpu_vram_gib_from_params(advanced: dict, expected: int | None) -> None:
    assert pd._max_gpu_vram_gib_from_params({"advanced": advanced}) == expected


def test_max_gpu_vram_gib_from_params_missing_advanced() -> None:
    assert pd._max_gpu_vram_gib_from_params({}) is None
    assert pd._max_gpu_vram_gib_from_params({"advanced": None}) is None


def test_apply_vram_budget_none_budget_is_noop() -> None:
    torch, recorded = _budget_torch(16)
    assert pd._apply_vram_budget(torch, "model", None, _logger()) is None
    assert recorded == []


def test_apply_vram_budget_skipped_under_none_offload() -> None:
    torch, recorded = _budget_torch(16)
    assert pd._apply_vram_budget(torch, "none", 15, _logger()) is None
    assert recorded == []


def test_apply_vram_budget_caps_allocator_under_model_offload() -> None:
    torch, recorded = _budget_torch(16)
    fraction = pd._apply_vram_budget(torch, "model", 15, _logger())
    assert fraction is not None
    assert 0.0 < fraction < 1.0
    assert recorded == [fraction]
    # 15 GiB ceiling on a 16 GiB card → ~0.9375.
    assert abs(fraction - 15 / 16) < 1e-6


def test_apply_vram_budget_caps_under_sequential_offload() -> None:
    torch, recorded = _budget_torch(24)
    fraction = pd._apply_vram_budget(torch, "sequential", 12, _logger())
    assert fraction is not None
    assert abs(fraction - 0.5) < 1e-6
    assert recorded == [fraction]


def test_apply_vram_budget_noop_when_budget_exceeds_card() -> None:
    torch, recorded = _budget_torch(16)
    assert pd._apply_vram_budget(torch, "model", 32, _logger()) is None
    assert recorded == []


def test_apply_vram_budget_skips_when_both_vram_queries_fail() -> None:
    # Primary (get_device_properties) AND fallback (mem_get_info) must
    # both fail before the cap is skipped — it is an optional optim.
    torch, recorded = _budget_torch(16, raise_props=True, raise_info=True)
    assert pd._apply_vram_budget(torch, "model", 15, _logger()) is None
    assert recorded == []


def test_apply_vram_budget_swallows_set_fraction_error() -> None:
    torch, recorded = _budget_torch(16, raise_set=True)
    assert pd._apply_vram_budget(torch, "model", 15, _logger()) is None
    assert recorded == []


def test_apply_vram_budget_uses_physical_vram_not_wddm_budget() -> None:
    # WDDM gap: mem_get_info() reports the committed budget (15.5 GiB)
    # but the card is physically 16 GiB. set_per_process_memory_fraction
    # divides by physical internally, so the fraction MUST use physical
    # (12/16 = 0.75), not the WDDM total (12/15.5 ≈ 0.774) — otherwise
    # the cap lands ~0.5 GiB looser than the operator asked.
    torch, recorded = _budget_torch(15.5, physical_gib=16.0)
    fraction = pd._apply_vram_budget(torch, "model", 12, _logger())
    assert fraction is not None
    assert abs(fraction - 12.0 / 16.0) < 1e-9
    assert recorded == [fraction]


def test_apply_vram_budget_falls_back_to_mem_get_info_without_props() -> None:
    # No device-properties API → fall back to mem_get_info's total.
    torch, recorded = _budget_torch(16, raise_props=True)
    fraction = pd._apply_vram_budget(torch, "model", 12, _logger())
    assert fraction is not None
    assert abs(fraction - 12.0 / 16.0) < 1e-9
    assert recorded == [fraction]
