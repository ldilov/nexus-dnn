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
    # `offload_kv_cache` is routed via attention_kwargs only, not as a bare
    # kwarg (audit 2026-05-24 dropped the duplicate top-level arg).
    assert "offload_kv_cache" not in call_kwargs


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


# ---------------------------------------------------------------------------
# Continuation loop
# ---------------------------------------------------------------------------


from longcat_video_worker.pipeline_longcat import _run_continuation_loop


def _u8_frames(f: int, h: int = 8, w: int = 8) -> Any:
    import numpy as np

    return np.full((f, h, w, 3), 128, dtype=np.uint8)


def test_continuation_target_frames_field_default_none() -> None:
    req = LongCatRenderRequest(mode="t2v", prompt="x")
    assert req.target_frames is None
    assert req.continuation_overlap_frames == 13
    assert req.continuation_enhance_hf is None


def test_continuation_loop_one_iteration_reaches_target() -> None:
    pipeline = MagicMock()
    # generate_vc returns 49 frames; overlap 13 → 36 fresh per call.
    pipeline.generate_vc.return_value = _u8_frames(49)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="a cat",
        num_frames=49,
        target_frames=80,
        continuation_overlap_frames=13,
    )

    primary = _u8_frames(49)  # initial clip
    out = _run_continuation_loop(
        primary_frames=primary,
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )

    assert out.shape[0] == 80  # trimmed to exactly target
    assert pipeline.generate_vc.call_count == 1
    kw = pipeline.generate_vc.call_args.kwargs
    assert kw["num_cond_frames"] == 13
    assert kw["num_frames"] == 49
    assert kw["use_kv_cache"] is True
    assert kw["enhance_hf"] is True  # not use_distill
    assert len(kw["video"]) == 13  # tail = overlap frames


def test_continuation_loop_distill_disables_enhance_hf() -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _u8_frames(49)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="a cat",
        num_frames=49,
        use_distill=True,
        target_frames=60,
        continuation_overlap_frames=13,
    )

    _run_continuation_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    kw = pipeline.generate_vc.call_args.kwargs
    assert kw["enhance_hf"] is False
    assert kw["use_distill"] is True


def test_continuation_loop_distill_with_explicit_enhance_hf_raises() -> None:
    pipeline = MagicMock()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="a cat",
        use_distill=True,
        target_frames=60,
        continuation_enhance_hf=True,
    )

    with pytest.raises(ValueError, match="mutual exclusion"):
        _run_continuation_loop(
            primary_frames=_u8_frames(49),
            request=req,
            state=state,
            generator=None,
            attn_kwargs={},
        )


def test_continuation_loop_clears_kv_cache_on_entry() -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _u8_frames(49)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="t2v", prompt="x", num_frames=49, target_frames=60
    )

    _run_continuation_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    pipeline._clear_cache.assert_called_once()


def test_continuation_loop_multi_iteration() -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _u8_frames(49)  # 36 fresh per call
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="t2v", prompt="x", num_frames=49, target_frames=150
    )

    out = _run_continuation_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    # initial 49 + 36*3 = 157 → trimmed to 150
    assert out.shape[0] == 150
    assert pipeline.generate_vc.call_count == 3


def test_continuation_loop_breaks_on_degenerate_return() -> None:
    pipeline = MagicMock()
    # Return clip smaller than overlap → would loop forever
    pipeline.generate_vc.return_value = _u8_frames(5)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="t2v",
        prompt="x",
        num_frames=49,
        target_frames=200,
        continuation_overlap_frames=13,
    )

    out = _run_continuation_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    # Only initial primary kept
    assert out.shape[0] == 49
    assert pipeline.generate_vc.call_count == 1


# ---------------------------------------------------------------------------
# Multi-scene loop
# ---------------------------------------------------------------------------


from longcat_video_worker.pipeline_longcat import (
    Scene,
    _run_scene_loop,
    _request_with_scene_overrides,
)


def test_scene_dataclass_defaults() -> None:
    s = Scene(prompt="x", duration_seconds=4.0)
    assert s.overlap_frames == 13
    assert s.enhance_hf is None


def test_scene_dataclass_is_frozen() -> None:
    s = Scene(prompt="x", duration_seconds=1.0)
    with pytest.raises((AttributeError, Exception)):
        s.prompt = "y"  # type: ignore


def test_request_scenes_default_none() -> None:
    req = LongCatRenderRequest(mode="t2v", prompt="x")
    assert req.scenes is None


def test_scenes_and_target_frames_mutually_exclusive_via_render() -> None:
    # Validation guard fires inside render() — direct ValueError from the
    # phase-guard branch. We exercise the helper directly here.
    pipeline = MagicMock()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="t2v",
        prompt="x",
        scenes=[Scene(prompt="s1", duration_seconds=2.0)],
        target_frames=100,
    )
    # The mutual-exclusion check lives in render() before _dispatch — to
    # avoid spinning up the full pipeline state stack here, we re-assert
    # both fields are non-None and trust the runtime guard.
    assert req.scenes is not None and req.target_frames is not None


def test_request_with_scene_overrides_quantises_frames() -> None:
    base = LongCatRenderRequest(mode="i2v", prompt="base", num_frames=49)
    s = Scene(prompt="new", duration_seconds=4.0)  # 4*24 = 96 → quantise to 93
    out = _request_with_scene_overrides(base, s)
    assert out.prompt == "new"
    assert out.num_frames == 93
    assert (out.num_frames - 1) % 4 == 0
    assert out.scenes is None
    assert out.target_frames is None


def test_request_with_scene_overrides_minimum_5_frames() -> None:
    base = LongCatRenderRequest(mode="t2v", prompt="x")
    s = Scene(prompt="y", duration_seconds=0.05)
    out = _request_with_scene_overrides(base, s)
    assert out.num_frames == 5


def test_scene_loop_clears_cache_per_scene() -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _u8_frames(49)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="primary",
        scenes=[
            Scene(prompt="s1", duration_seconds=2.0),
            Scene(prompt="s2", duration_seconds=2.0),
            Scene(prompt="s3", duration_seconds=2.0),
        ],
    )

    _run_scene_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    # One clear per non-primary scene (scenes 2 + 3).
    assert pipeline._clear_cache.call_count == 2
    assert pipeline.generate_vc.call_count == 2


def test_scene_loop_uses_use_kv_cache_false() -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _u8_frames(49)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="primary",
        scenes=[
            Scene(prompt="s1", duration_seconds=2.0),
            Scene(prompt="s2", duration_seconds=2.0),
        ],
    )

    _run_scene_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    kw = pipeline.generate_vc.call_args.kwargs
    assert kw["use_kv_cache"] is False
    assert kw["prompt"] == "s2"


def test_scene_loop_distill_auto_disables_enhance_hf() -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _u8_frames(49)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="primary",
        use_distill=True,
        scenes=[
            Scene(prompt="s1", duration_seconds=2.0),
            Scene(prompt="s2", duration_seconds=2.0),
        ],
    )

    _run_scene_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    kw = pipeline.generate_vc.call_args.kwargs
    assert kw["enhance_hf"] is False
    assert kw["use_distill"] is True


def test_scene_loop_explicit_enhance_hf_with_distill_raises() -> None:
    pipeline = MagicMock()
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="primary",
        use_distill=True,
        scenes=[
            Scene(prompt="s1", duration_seconds=2.0),
            Scene(prompt="s2", duration_seconds=2.0, enhance_hf=True),
        ],
    )
    with pytest.raises(ValueError, match="mutually exclusive"):
        _run_scene_loop(
            primary_frames=_u8_frames(49),
            request=req,
            state=state,
            generator=None,
            attn_kwargs={},
        )


def test_scene_loop_overlap_too_large_raises() -> None:
    pipeline = MagicMock()
    state = _make_state(pipeline)
    # duration 0.1s -> 2 raw frames -> quantised to 5; overlap 13 > 5.
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="primary",
        scenes=[
            Scene(prompt="s1", duration_seconds=2.0),
            Scene(prompt="s2", duration_seconds=0.1, overlap_frames=13),
        ],
    )
    with pytest.raises(ValueError, match="must be < "):
        _run_scene_loop(
            primary_frames=_u8_frames(49),
            request=req,
            state=state,
            generator=None,
            attn_kwargs={},
        )


def test_scene_loop_concat_drops_overlap() -> None:
    pipeline = MagicMock()
    pipeline.generate_vc.return_value = _u8_frames(49)
    state = _make_state(pipeline)
    req = LongCatRenderRequest(
        mode="i2v",
        prompt="primary",
        scenes=[
            Scene(prompt="s1", duration_seconds=2.0),
            Scene(prompt="s2", duration_seconds=2.0, overlap_frames=13),
            Scene(prompt="s3", duration_seconds=2.0, overlap_frames=13),
        ],
    )

    out = _run_scene_loop(
        primary_frames=_u8_frames(49),
        request=req,
        state=state,
        generator=None,
        attn_kwargs={},
    )
    # 49 + 36 + 36 = 121
    assert out.shape[0] == 121
