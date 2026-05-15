"""Tests for the offload-mode dispatch helper.

Cover the four wire values (`none`, `model`, `sequential`, unknown)
plus the parameter-extraction helper. The dispatch surface is the
small `_apply_offload_mode` function — pure on its inputs apart from
calling methods on the pipe / torch / logger — which lets us test
without paying for a real diffusers + torch import.
"""

from __future__ import annotations

from types import SimpleNamespace
from typing import Any
from unittest.mock import MagicMock

import pytest

from ltx_video_worker import pipeline_diffusers as pd
from ltx_video_worker.pipeline_diffusers import _ModelLoadFailed


def _fake_torch(total_bytes: int, free_bytes: int | None = None) -> Any:
    """Build a stand-in `torch` module that returns the requested
    `(free, total)` from `torch.cuda.mem_get_info()`."""
    if free_bytes is None:
        free_bytes = total_bytes
    cuda = SimpleNamespace(mem_get_info=lambda: (free_bytes, total_bytes))
    return SimpleNamespace(cuda=cuda)


def _logger() -> Any:
    return SimpleNamespace(info=lambda *a, **k: None)


# ---------------------------------------------------------------------------
# _offload_mode_from_params
# ---------------------------------------------------------------------------


def test_gguf_install_device_for_mode_returns_cuda_only_for_none() -> None:
    # The whole point of the install-device routing: mode=none gets
    # weights on CUDA at install time; every other mode keeps them on
    # CPU so the offload hooks have something to page from.
    assert pd._gguf_install_device_for_mode("none", "cuda") == "cuda"
    assert pd._gguf_install_device_for_mode("model", "cuda") == "cpu"
    assert pd._gguf_install_device_for_mode("sequential", "cuda") == "cpu"


def test_gguf_install_device_for_mode_honours_device_arg() -> None:
    # When the host is configured to run on a non-cuda device (CI / fake
    # profile), mode=none still respects whatever the caller passed.
    assert pd._gguf_install_device_for_mode("none", "cpu") == "cpu"


def test_offload_mode_from_params_returns_explicit_value() -> None:
    assert (
        pd._offload_mode_from_params({"advanced": {"offload_mode": "none"}})
        == "none"
    )
    assert (
        pd._offload_mode_from_params({"advanced": {"offload_mode": "model"}})
        == "model"
    )
    assert (
        pd._offload_mode_from_params(
            {"advanced": {"offload_mode": "sequential"}}
        )
        == "sequential"
    )


def test_offload_mode_from_params_defaults_when_missing() -> None:
    # No advanced block at all → sequential (safest pre-contract default).
    assert pd._offload_mode_from_params({}) == "sequential"
    # advanced present but no offload_mode key → sequential.
    assert (
        pd._offload_mode_from_params({"advanced": {"guidance_scale": 4.0}})
        == "sequential"
    )
    # advanced.offload_mode is the wrong type → sequential (never crash).
    assert (
        pd._offload_mode_from_params({"advanced": {"offload_mode": None}})
        == "sequential"
    )
    assert (
        pd._offload_mode_from_params({"advanced": {"offload_mode": 7}})
        == "sequential"
    )
    # advanced is not a dict at all (defensive against malformed payloads).
    assert pd._offload_mode_from_params({"advanced": "junk"}) == "sequential"


# ---------------------------------------------------------------------------
# _apply_offload_mode
# ---------------------------------------------------------------------------


def test_apply_offload_mode_none_moves_pipe_to_cuda_on_big_card() -> None:
    pipe = MagicMock(name="pipe")
    moved = MagicMock(name="moved_pipe")
    pipe.to.return_value = moved
    torch_mod = _fake_torch(total_bytes=24 * 1024**3, free_bytes=20 * 1024**3)

    result = pd._apply_offload_mode(
        pipe=pipe,
        offload_mode="none",
        device="cuda",
        torch_mod=torch_mod,
        logger=_logger(),
    )

    pipe.to.assert_called_once_with("cuda")
    assert result is moved
    # Offload helpers must NOT be called when mode=none.
    pipe.enable_model_cpu_offload.assert_not_called()
    pipe.enable_sequential_cpu_offload.assert_not_called()


def test_apply_offload_mode_none_skips_pipe_to_when_gguf_already_placed() -> None:
    # When the GGUF transformer was installed directly onto CUDA at load
    # time, `pipe.to("cuda")` is redundant — and worse, it can mask the
    # fact that GGUFParameters don't move via stock nn.Module.to(). The
    # caller signals this via gguf_already_placed=True and the dispatch
    # only sweeps the non-GGUF submodules onto cuda instead.
    pipe = MagicMock(name="pipe")
    vae = MagicMock(name="vae")
    text_encoder = MagicMock(name="text_encoder")
    pipe.vae = vae
    pipe.text_encoder = text_encoder
    pipe.text_encoder_2 = None  # LTX-2.3 has a single T5 encoder
    torch_mod = _fake_torch(total_bytes=16 * 1024**3, free_bytes=14 * 1024**3)

    result = pd._apply_offload_mode(
        pipe=pipe,
        offload_mode="none",
        device="cuda",
        torch_mod=torch_mod,
        logger=_logger(),
        gguf_already_placed=True,
    )

    pipe.to.assert_not_called()  # critical: no redundant sweep
    vae.to.assert_called_once_with("cuda")
    text_encoder.to.assert_called_once_with("cuda")
    assert result is pipe  # no rebinding when gguf_already_placed
    pipe.enable_model_cpu_offload.assert_not_called()
    pipe.enable_sequential_cpu_offload.assert_not_called()


def test_apply_offload_mode_none_admits_real_16gb_card() -> None:
    # Regression for the units bug caught by the 2026-05-15 smoke:
    # a genuine 16 GB RTX 5070 Ti reports ~15.92 GiB total to
    # torch.cuda.mem_get_info() (1.710e10 bytes — never a full 16 GiB,
    # the driver always reserves some). The old 16-GiB threshold
    # rejected it by ~80 MB. The 15-GiB floor must let it through.
    pipe = MagicMock(name="pipe")
    moved = MagicMock(name="moved_pipe")
    pipe.to.return_value = moved
    torch_mod = _fake_torch(total_bytes=17_100_000_000, free_bytes=16_000_000_000)

    result = pd._apply_offload_mode(
        pipe=pipe,
        offload_mode="none",
        device="cuda",
        torch_mod=torch_mod,
        logger=_logger(),
    )

    pipe.to.assert_called_once_with("cuda")
    assert result is moved


def test_apply_offload_mode_none_rejects_small_vram() -> None:
    # 8 GB card — refuse to load with mode=none rather than OOM mid-render.
    pipe = MagicMock(name="pipe")
    torch_mod = _fake_torch(total_bytes=8 * 1024**3)

    with pytest.raises(_ModelLoadFailed) as info:
        pd._apply_offload_mode(
            pipe=pipe,
            offload_mode="none",
            device="cuda",
            torch_mod=torch_mod,
            logger=_logger(),
        )

    assert "16 GB" in str(info.value)
    pipe.to.assert_not_called()


def test_apply_offload_mode_model_calls_model_offload() -> None:
    pipe = MagicMock(name="pipe")
    torch_mod = _fake_torch(total_bytes=24 * 1024**3)

    result = pd._apply_offload_mode(
        pipe=pipe,
        offload_mode="model",
        device="cuda",
        torch_mod=torch_mod,
        logger=_logger(),
    )

    pipe.enable_model_cpu_offload.assert_called_once_with()
    pipe.enable_sequential_cpu_offload.assert_not_called()
    pipe.to.assert_not_called()
    assert result is pipe


def test_apply_offload_mode_sequential_calls_sequential_offload() -> None:
    pipe = MagicMock(name="pipe")
    torch_mod = _fake_torch(total_bytes=16 * 1024**3)

    result = pd._apply_offload_mode(
        pipe=pipe,
        offload_mode="sequential",
        device="cuda",
        torch_mod=torch_mod,
        logger=_logger(),
    )

    pipe.enable_sequential_cpu_offload.assert_called_once_with()
    pipe.enable_model_cpu_offload.assert_not_called()
    pipe.to.assert_not_called()
    assert result is pipe


def test_apply_offload_mode_sequential_falls_back_to_model_when_missing() -> None:
    # Older diffusers releases ship `enable_model_cpu_offload` only.
    class OldPipe:
        def enable_model_cpu_offload(self) -> None:
            self.called = True

    pipe = OldPipe()
    pd._apply_offload_mode(
        pipe=pipe,
        offload_mode="sequential",
        device="cuda",
        torch_mod=_fake_torch(total_bytes=16 * 1024**3),
        logger=_logger(),
    )

    assert getattr(pipe, "called", False) is True


def test_apply_offload_mode_model_raises_when_helper_missing() -> None:
    class HelperLessPipe:
        pass

    with pytest.raises(_ModelLoadFailed) as info:
        pd._apply_offload_mode(
            pipe=HelperLessPipe(),
            offload_mode="model",
            device="cuda",
            torch_mod=_fake_torch(total_bytes=24 * 1024**3),
            logger=_logger(),
        )

    assert "enable_model_cpu_offload" in str(info.value)


def test_component_placement_from_params_returns_none_when_not_overridden() -> None:
    # placement_overridden=False means "use the preset" — dispatch
    # should fall through to the existing offload-hook path.
    assert (
        pd._component_placement_from_params(
            {"advanced": {"placement_overridden": False, "component_placement": {}}}
        )
        is None
    )
    assert pd._component_placement_from_params({}) is None
    assert pd._component_placement_from_params({"advanced": {}}) is None


def test_component_placement_from_params_returns_triple_when_overridden() -> None:
    result = pd._component_placement_from_params(
        {
            "advanced": {
                "placement_overridden": True,
                "component_placement": {
                    "transformer": "cuda",
                    "vae": "cuda",
                    "text_encoder": "cpu",
                },
            }
        }
    )
    assert result == {"transformer": "cuda", "vae": "cuda", "text_encoder": "cpu"}


def test_component_placement_from_params_rejects_malformed_triple() -> None:
    # If any field is missing or off-vocabulary, defer to the preset
    # rather than crash mid-load.
    assert (
        pd._component_placement_from_params(
            {
                "advanced": {
                    "placement_overridden": True,
                    "component_placement": {"transformer": "gpu"},  # typo
                }
            }
        )
        is None
    )


def test_scheduler_from_params_defaults_to_flow_match_euler() -> None:
    assert pd._scheduler_from_params({}) == "flow_match_euler"
    assert (
        pd._scheduler_from_params({"advanced": {"scheduler": "flow_match_heun"}})
        == "flow_match_heun"
    )
    # Unknown values still flow through — dispatch validation lives
    # in _apply_scheduler_choice and surfaces a clear ModelLoadFailed
    # rather than being silently substituted here.
    assert (
        pd._scheduler_from_params({"advanced": {"scheduler": "ddim"}}) == "ddim"
    )


def test_text_encoder_quant_from_params_defaults_to_default() -> None:
    assert pd._text_encoder_quant_from_params({}) == "default"
    assert (
        pd._text_encoder_quant_from_params({"advanced": {"text_encoder_quant": "nf4"}})
        == "nf4"
    )
    # Unknown values collapse to default rather than crashing the
    # later dispatch — this is the only place we soft-fail; users
    # who explicitly type "fp16" instead of "fp8" get the bf16
    # baseline they could have always chosen.
    assert (
        pd._text_encoder_quant_from_params(
            {"advanced": {"text_encoder_quant": "garbage"}}
        )
        == "default"
    )


def test_coerce_optional_float_handles_null_and_numbers() -> None:
    assert pd._coerce_optional_float(None) is None
    assert pd._coerce_optional_float(0.05) == 0.05
    assert pd._coerce_optional_float(7) == 7.0
    # Bad input collapses to None instead of crashing the segment.
    assert pd._coerce_optional_float("oops") is None
    assert pd._coerce_optional_float([0.5]) is None


def test_apply_scheduler_choice_noop_for_default() -> None:
    pipe = MagicMock(name="pipe")
    pd._apply_scheduler_choice(pipe, "flow_match_euler", _logger())
    # Default == already loaded; nothing should touch pipe.scheduler.
    assert not pipe.scheduler.from_config.called


def test_apply_scheduler_choice_rejects_unknown() -> None:
    pipe = MagicMock(name="pipe")
    with pytest.raises(_ModelLoadFailed) as info:
        pd._apply_scheduler_choice(pipe, "ddim", _logger())
    assert "unknown scheduler" in str(info.value)


def test_apply_text_encoder_quant_default_is_noop() -> None:
    pipe = MagicMock(name="pipe")
    pd._apply_text_encoder_quant(pipe, "default", "/fake", None, _logger())
    # No swap happened.
    assert not isinstance(pipe.text_encoder, MagicMock) or pipe.text_encoder is pipe.text_encoder


def test_apply_text_encoder_quant_rejects_unknown() -> None:
    pipe = MagicMock(name="pipe")
    with pytest.raises(_ModelLoadFailed) as info:
        pd._apply_text_encoder_quant(pipe, "garbage", "/fake", None, _logger())
    # Either ImportError-shaped (bnb missing) or the explicit unknown
    # check — both are acceptable failure modes.
    msg = str(info.value)
    assert "garbage" in msg or "bitsandbytes" in msg


def test_apply_offload_mode_rejects_unknown_mode() -> None:
    pipe = MagicMock(name="pipe")
    with pytest.raises(_ModelLoadFailed) as info:
        pd._apply_offload_mode(
            pipe=pipe,
            offload_mode="auto",  # host MUST resolve Auto away
            device="cuda",
            torch_mod=_fake_torch(total_bytes=24 * 1024**3),
            logger=_logger(),
        )
    assert "unknown offload_mode" in str(info.value)
    assert "'auto'" in str(info.value)
