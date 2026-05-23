from __future__ import annotations

import os
import sys
import tempfile
import types
from pathlib import Path
from typing import Any
from unittest.mock import MagicMock, call, patch

import pytest

from longcat_video_worker.pipeline_longcat import (
    LongCatRenderRequest,
    _PipelineError,
    _dispatch_generate,
    _PipelineState,
    render,
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _fake_frames(f: int = 5, h: int = 8, w: int = 8, c: int = 3) -> Any:
    import numpy as np

    return np.zeros((f, h, w, c), dtype=np.float32)


def _make_state(pipeline: Any) -> _PipelineState:
    import torch

    return _PipelineState(
        pipeline=pipeline,
        device=torch.device("cpu"),
        compute_dtype=torch.float32,
        vendor_dir=Path("/fake/vendor"),
        model_dir=Path("/fake/model"),
        tokenizer=MagicMock(),
        text_encoder=MagicMock(),
        vae=MagicMock(),
        scheduler=MagicMock(),
        dit=MagicMock(),
        lora_network=None,
    )


# ---------------------------------------------------------------------------
# test_render_request_construct_t2v
# ---------------------------------------------------------------------------


def test_render_request_construct_t2v() -> None:
    req = LongCatRenderRequest(mode="t2v", prompt="a cat")
    assert req.mode == "t2v"
    assert req.height == 480
    assert req.width == 832
    assert req.num_frames == 93
    assert req.num_inference_steps == 50
    assert req.guidance_scale == 4.0
    assert req.use_distill is False
    assert req.seed is None
    assert req.offload_kv_cache is False


# ---------------------------------------------------------------------------
# test_render_request_i2v_requires_image_path
# ---------------------------------------------------------------------------


def test_render_request_i2v_requires_image_path() -> None:
    req = LongCatRenderRequest(mode="i2v", prompt="a cat")
    assert req.image_path is None
    pipeline = MagicMock()
    state = _make_state(pipeline)

    with pytest.raises(ValueError, match="image_path"):
        _dispatch_generate(req, state, None, {})


# ---------------------------------------------------------------------------
# test_resolve_method_from_mode
# ---------------------------------------------------------------------------


def test_resolve_method_from_mode_t2v() -> None:
    pipeline = MagicMock()
    pipeline.generate_t2v.return_value = _fake_frames()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(mode="t2v", prompt="mountains", height=480, width=832)

    frames = _dispatch_generate(req, state, None, {})

    pipeline.generate_t2v.assert_called_once()
    call_kwargs = pipeline.generate_t2v.call_args.kwargs
    assert call_kwargs["height"] == 480
    assert call_kwargs["width"] == 832
    assert call_kwargs["prompt"] == "mountains"


def test_resolve_method_from_mode_i2v(tmp_path: Path) -> None:
    img_path = tmp_path / "frame.png"
    try:
        from PIL import Image as PILImage
        PILImage.new("RGB", (8, 8)).save(str(img_path))
    except ImportError:
        img_path.write_bytes(b"\x89PNG\r\n\x1a\n" + b"\x00" * 20)

    pipeline = MagicMock()
    pipeline.generate_i2v.return_value = _fake_frames()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v", prompt="a river", image_path=str(img_path), height=480
    )

    try:
        frames = _dispatch_generate(req, state, None, {})
        pipeline.generate_i2v.assert_called_once()
        call_kwargs = pipeline.generate_i2v.call_args.kwargs
        assert call_kwargs["resolution"] == "480p"
    except Exception as exc:
        if "cannot identify image" in str(exc).lower() or "PIL" in str(exc):
            pytest.skip("PIL cannot open sentinel PNG in this env")
        raise


def test_resolve_method_from_mode_vc(tmp_path: Path) -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _fake_frames()
    state = _make_state(pipeline)

    dummy_vid = tmp_path / "cond.mp4"
    dummy_vid.write_bytes(b"FAKE")

    req = LongCatRenderRequest(
        mode="vc",
        prompt="a wave",
        conditioning_video_path=str(dummy_vid),
        height=480,
    )

    with patch(
        "longcat_video_worker.pipeline_longcat._load_video_frames",
        return_value=_fake_frames(5, 8, 8, 3),
    ):
        frames = _dispatch_generate(req, state, None, {})

    pipeline.generate_vc.assert_called_once()
    call_kwargs = pipeline.generate_vc.call_args.kwargs
    assert call_kwargs["resolution"] == "480p"
    assert call_kwargs["offload_kv_cache"] is False


def test_resolve_method_from_mode_refine() -> None:
    pipeline = MagicMock()
    pipeline.generate_refine.return_value = _fake_frames()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="refine",
        prompt="super resolution",
        low_res_video_path="/fake/low.mp4",
    )

    frames = _dispatch_generate(req, state, None, {})
    pipeline.generate_refine.assert_called_once()


# ---------------------------------------------------------------------------
# test_kv_cache_offload_passthrough
# ---------------------------------------------------------------------------


def test_kv_cache_offload_passthrough() -> None:
    pipeline = MagicMock()
    pipeline.generate_t2v.return_value = _fake_frames()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="t2v", prompt="sky", offload_kv_cache=True
    )

    _dispatch_generate(req, state, None, {"offload_kv_cache": True})

    call_kwargs = pipeline.generate_t2v.call_args.kwargs
    attn = call_kwargs.get("attention_kwargs") or {}
    assert attn.get("offload_kv_cache") is True


def test_kv_cache_offload_false_when_not_requested() -> None:
    pipeline = MagicMock()
    pipeline.generate_t2v.return_value = _fake_frames()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(mode="t2v", prompt="sky", offload_kv_cache=False)

    _dispatch_generate(req, state, None, {})

    call_kwargs = pipeline.generate_t2v.call_args.kwargs
    attn = call_kwargs.get("attention_kwargs")
    assert attn is None or attn.get("offload_kv_cache") is not True


# ---------------------------------------------------------------------------
# test_render_uses_cached_pipeline_on_second_call
# ---------------------------------------------------------------------------


def test_render_uses_cached_pipeline_on_second_call(tmp_path: Path) -> None:
    import longcat_video_worker.pipeline_longcat as mod

    original_state = mod._STATE
    try:
        fake_pipeline = MagicMock()
        fake_pipeline.generate_t2v.return_value = _fake_frames()
        fake_state = _make_state(fake_pipeline)
        mod._STATE = fake_state

        req = LongCatRenderRequest(mode="t2v", prompt="clouds")
        out1 = render(req, output_dir=str(tmp_path))

        req2 = LongCatRenderRequest(mode="t2v", prompt="fog")
        out2 = render(req2, output_dir=str(tmp_path))

        assert fake_pipeline.generate_t2v.call_count == 2
    finally:
        mod._STATE = original_state


# ---------------------------------------------------------------------------
# test_render_distill_applies_lora_when_file_present
# ---------------------------------------------------------------------------


def test_render_distill_applies_lora_when_file_present(tmp_path: Path) -> None:
    import longcat_video_worker.pipeline_longcat as mod

    lora_path = (
        tmp_path
        / "models"
        / mod._KIJAI_REPO_SUBDIR
        / mod._DISTILL_LORA_FILENAME
    )
    lora_path.parent.mkdir(parents=True, exist_ok=True)
    lora_path.write_bytes(b"FAKE_LORA")

    mock_network = MagicMock()
    mock_network.loras = [MagicMock()] * 3

    with patch("longcat_video_worker.pipeline_longcat._maybe_load_distill_lora", return_value=mock_network) as mock_fn, \
         patch("longcat_video_worker.pipeline_longcat._ensure_state") as mock_ensure:
        import torch
        fake_pipeline = MagicMock()
        fake_pipeline.generate_t2v.return_value = _fake_frames()
        fake_state = _PipelineState(
            pipeline=fake_pipeline,
            device=torch.device("cpu"),
            compute_dtype=torch.float32,
            vendor_dir=Path("/v"),
            model_dir=Path("/m"),
            tokenizer=MagicMock(),
            text_encoder=MagicMock(),
            vae=MagicMock(),
            scheduler=MagicMock(),
            dit=MagicMock(),
            lora_network=mock_network,
        )
        mock_ensure.return_value = fake_state

        req = LongCatRenderRequest(mode="t2v", prompt="stars", use_distill=True)
        out = render(req, output_dir=str(tmp_path), host_data_dir=str(tmp_path))

        mock_ensure.assert_called_once()
        call_kwargs = mock_ensure.call_args.kwargs
        assert call_kwargs["use_distill"] is True


# ---------------------------------------------------------------------------
# test_render_distill_warns_when_lora_file_absent
# ---------------------------------------------------------------------------


def test_render_distill_warns_when_lora_file_absent(
    tmp_path: Path, caplog: pytest.LogCaptureFixture
) -> None:
    import logging
    import longcat_video_worker.pipeline_longcat as mod

    with caplog.at_level(logging.WARNING, logger="longcat_video_worker.pipeline_longcat"):
        result = mod._maybe_load_distill_lora(
            dit=MagicMock(),
            host_data_dir=str(tmp_path),
            vendor_dir=Path("/v"),
        )

    assert result is None
    assert any("distill LoRA not found" in r.message for r in caplog.records)


# ---------------------------------------------------------------------------
# test_pipeline_error_carries_phase
# ---------------------------------------------------------------------------


def test_pipeline_error_carries_phase() -> None:
    exc = _PipelineError("load_dit", "something broke")
    assert exc.phase == "load_dit"
    assert "something broke" in str(exc)


# ---------------------------------------------------------------------------
# test_render_vc_requires_conditioning_path
# ---------------------------------------------------------------------------


def test_render_vc_requires_conditioning_path() -> None:
    pipeline = MagicMock()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(mode="vc", prompt="waves")

    with pytest.raises(ValueError, match="conditioning_video_path"):
        _dispatch_generate(req, state, None, {})


# ---------------------------------------------------------------------------
# test_render_refine_requires_low_res_path
# ---------------------------------------------------------------------------


def test_render_refine_requires_low_res_path() -> None:
    pipeline = MagicMock()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(mode="refine", prompt="hd")

    with pytest.raises(ValueError, match="low_res_video_path"):
        _dispatch_generate(req, state, None, {})
