"""Tests for the synthesis-layer parsers. Exercise them without touching
the real ``indextts.infer_v2`` module (which requires CUDA + ~6 GB model)."""

from __future__ import annotations

from emotion_tts_worker.cancellation import CancelToken
from emotion_tts_worker.synthesis import build_settings, parse_segment


def test_parse_segment_audio_ref_mode() -> None:
    seg = parse_segment(
        {
            "segment_id": "seg_1",
            "global_index": 1,
            "text": "hi",
            "speaker_audio_ref_abs": "/tmp/bob.wav",
            "output_target_abs": "/tmp/seg1.wav",
            "emotion": {"mode": "audio_ref", "audio_ref_abs": "/tmp/emo.wav", "emotion_alpha": 0.7},
            "generation": {"seed": 42, "temperature": 0.8},
        }
    )
    assert seg.emotion_mode == "audio_ref"
    assert seg.emotion_audio_ref_abs == "/tmp/emo.wav"
    assert seg.emotion_alpha == 0.7
    assert seg.generation["seed"] == 42


def test_parse_segment_none_mode_defaults() -> None:
    seg = parse_segment(
        {
            "segment_id": "seg_1",
            "global_index": 1,
            "text": "hi",
            "speaker_audio_ref_abs": "/tmp/bob.wav",
            "output_target_abs": "/tmp/seg1.wav",
        }
    )
    assert seg.emotion_mode == "none"
    assert seg.emotion_audio_ref_abs is None
    assert seg.emotion_vector is None


def test_parse_segment_vector_mode() -> None:
    seg = parse_segment(
        {
            "segment_id": "seg_1",
            "global_index": 1,
            "text": "hi",
            "speaker_audio_ref_abs": "/tmp/bob.wav",
            "output_target_abs": "/tmp/seg1.wav",
            "emotion": {
                "mode": "emotion_vector",
                "vector": [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
                "emotion_alpha": 1.0,
            },
        }
    )
    assert seg.emotion_vector == [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]


def test_parse_segment_qwen_template() -> None:
    seg = parse_segment(
        {
            "segment_id": "seg_1",
            "global_index": 1,
            "text": "hi",
            "speaker_audio_ref_abs": "/tmp/bob.wav",
            "output_target_abs": "/tmp/seg1.wav",
            "emotion": {"mode": "qwen_template", "template": "Happy: {seg}", "emotion_alpha": 1.0},
        }
    )
    assert seg.emotion_mode == "qwen_template"
    assert seg.emotion_qwen_template == "Happy: {seg}"


def test_build_settings_default_optimisations() -> None:
    s = build_settings({}, "/model")
    assert s.use_fp16 is True
    assert s.use_torch_compile is False
    assert s.gpt_batch_size == 2
    assert s.low_vram is False


def test_build_settings_honours_overrides() -> None:
    s = build_settings(
        {
            "optimizations": {
                "use_fp16": False,
                "use_torch_compile": True,
                "gpt_batch_size": 4,
                "low_vram": True,
            }
        },
        "/model",
    )
    assert s.use_fp16 is False
    assert s.use_torch_compile is True
    assert s.gpt_batch_size == 4
    assert s.low_vram is True


def test_cancel_token_bind_and_cancel() -> None:
    t = CancelToken()
    t.bind("req_1")
    assert not t.is_cancelled()
    assert t.cancel("req_1")
    assert t.is_cancelled()


def test_cancel_token_cancel_wrong_request() -> None:
    t = CancelToken()
    t.bind("req_1")
    assert not t.cancel("req_2")
    assert not t.is_cancelled()


def test_cancel_token_clear_resets() -> None:
    t = CancelToken()
    t.bind("req_1")
    t.cancel("req_1")
    assert t.is_cancelled()
    t.clear()
    assert not t.is_cancelled()


def test_cancel_token_raises_on_check() -> None:
    from emotion_tts_worker.cancellation import CancelledError

    t = CancelToken()
    t.bind("req_1")
    t.cancel("req_1")
    try:
        t.check()
        assert False, "expected CancelledError"
    except CancelledError:
        pass
