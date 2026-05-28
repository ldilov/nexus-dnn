"""F9 — general NaN recovery (prompt-independent).

FP8 (e4m3) activation overflow produces NaN/inf stochastically per noise
pattern. The pipeline must recover regardless of the operator's prompt:

  Layer 1  sanitize on cast (np.nan_to_num)
  Layer 2  reseed-retry on the failing model call (recovers full quality)
  Layer 3  sanitize fallback if the retry also diverges

Covers the pure helpers + the scene-loop reseed-retry via a fake pipeline
whose generate_vc returns NaN on the first (original-seed) call and finite
frames on the reseeded retry.
"""

from __future__ import annotations

from typing import Any

import numpy as np
import pytest

from longcat_video_worker.pipeline_longcat import (
    LongCatRenderRequest,
    Scene,
    Transition,
    _frames_finite,
    _NAN_RETRY_SEED_STRIDE,
    _sanitize_frames,
)


class TestFramesFinite:
    def test_uint8_always_finite(self):
        assert _frames_finite(np.zeros((4, 8, 8, 3), dtype=np.uint8)) is True

    def test_clean_float_finite(self):
        assert _frames_finite(np.full((4, 8, 8, 3), 0.5, dtype=np.float32)) is True

    def test_nan_detected(self):
        arr = np.full((4, 8, 8, 3), 0.5, dtype=np.float32)
        arr[2, 0, 0, 0] = np.nan
        assert _frames_finite(arr) is False

    def test_inf_detected(self):
        arr = np.full((4, 8, 8, 3), 0.5, dtype=np.float32)
        arr[1, 1, 1, 1] = np.inf
        assert _frames_finite(arr) is False


class TestSanitizeFrames:
    def test_uint8_unchanged(self):
        arr = np.zeros((2, 4, 4, 3), dtype=np.uint8)
        assert _sanitize_frames(arr) is arr

    def test_nan_mapped_to_zero(self):
        arr = np.full((2, 4, 4, 3), 0.5, dtype=np.float32)
        arr[0, 0, 0, 0] = np.nan
        out = _sanitize_frames(arr)
        assert np.all(np.isfinite(out))
        assert out[0, 0, 0, 0] == 0.0

    def test_inf_clamped(self):
        arr = np.full((2, 4, 4, 3), 0.5, dtype=np.float32)
        arr[0, 0, 0, 0] = np.inf
        arr[0, 0, 0, 1] = -np.inf
        out = _sanitize_frames(arr)
        assert out[0, 0, 0, 0] == 1.0
        assert out[0, 0, 0, 1] == 0.0


class _NanThenFinitePipe:
    """generate_vc returns NaN frames on the first call, finite on retry.

    Records the generator object of each call so the test can assert a
    DIFFERENT (reseeded) generator drove the successful retry.
    """

    def __init__(self, frame_shape=(20, 16, 16, 3)) -> None:
        self.calls = 0
        self.generators: list[Any] = []
        self._shape = frame_shape

    def _clear_cache(self) -> None:
        return None

    def generate_vc(self, **kw: Any) -> Any:
        self.calls += 1
        self.generators.append(kw.get("generator"))
        n = kw["num_frames"]
        if self.calls == 1:
            arr = np.full((n, *self._shape[1:]), 0.5, dtype=np.float32)
            arr[0, 0, 0, 0] = np.nan  # poison first attempt
            return arr
        return np.full((n, *self._shape[1:]), 128, dtype=np.uint8)


class _AlwaysNanPipe:
    def __init__(self, frame_shape=(20, 16, 16, 3)) -> None:
        self.calls = 0
        self._shape = frame_shape

    def _clear_cache(self) -> None:
        return None

    def generate_vc(self, **kw: Any) -> Any:
        self.calls += 1
        n = kw["num_frames"]
        arr = np.full((n, *self._shape[1:]), 0.5, dtype=np.float32)
        arr[0, 0, 0, 0] = np.nan
        return arr


class _FakeState:
    def __init__(self, pipe: Any) -> None:
        self.pipeline = pipe
        self.device = "cpu"
        self.compute_dtype = None
        self.lora_network = None


def _request():
    scenes = [
        Scene(prompt="scene one", overlap_frames=3, duration_seconds=1.5),
        Scene(prompt="scene two", overlap_frames=3, duration_seconds=1.5),
    ]
    return LongCatRenderRequest(
        mode="t2v",
        prompt="scene one",
        height=480,
        width=832,
        num_frames=20,
        num_inference_steps=4,
        guidance_scale=1.0,
        use_distill=True,
        seed=42,
        scenes=scenes,
        transitions=[Transition(from_scene=0, to_scene=1, type="hard_cut")],
        image_cond_noise_scale=0.15,
        adain_factor=0.0,
        apply_refinement=False,
    )


def _run(pipe):
    from longcat_video_worker import pipeline_longcat as plc

    state = _FakeState(pipe)
    primary = np.full((20, 16, 16, 3), 64, dtype=np.uint8)
    return plc._run_scene_loop(
        primary_frames=primary,
        request=_request(),
        state=state,
        generator=None,
        attn_kwargs={},
        host_data_dir=None,
        strict_scene_errors=True,
    )


class TestSceneLoopReseedRetry:
    def test_nan_then_finite_recovers_via_reseed(self):
        pipe = _NanThenFinitePipe()
        acc = _run(pipe)
        # generate_vc called twice for the single boundary: original + retry
        assert pipe.calls == 2
        # retry used a DIFFERENT generator object (reseeded)
        assert pipe.generators[0] is not pipe.generators[1]
        # final accumulator is finite (recovered)
        assert np.all(np.isfinite(np.asarray(acc, dtype=np.float64)))

    def test_persistent_nan_is_sanitized_not_propagated(self):
        pipe = _AlwaysNanPipe()
        acc = _run(pipe)
        # original + one retry, both NaN -> sanitized
        assert pipe.calls == 2
        acc_arr = np.asarray(acc)
        # accumulator must not carry NaN forward
        assert np.all(np.isfinite(acc_arr.astype(np.float64)))


class TestRetrySeedConstant:
    def test_stride_is_prime_ish_positive(self):
        assert _NAN_RETRY_SEED_STRIDE > 0


class _SmallerFramePipe:
    """generate_vc returns frames SMALLER than the accumulator.

    Simulates the mixed-resolution case: the primary (acc seed) is at
    refined res while a later scene's clip comes back at draft res (e.g.
    because its refinement was discarded on NaN). The scene loop must
    resize to the accumulator's H x W instead of crashing on concat.
    """

    def __init__(self, h=360, w=640) -> None:
        self.calls = 0
        self._h = h
        self._w = w

    def _clear_cache(self) -> None:
        return None

    def generate_vc(self, **kw: Any) -> Any:
        self.calls += 1
        n = kw["num_frames"]
        return np.full((n, self._h, self._w, 3), 100, dtype=np.uint8)


class TestResolutionUniformityGuard:
    def test_smaller_clip_resized_to_accumulator(self):
        from longcat_video_worker import pipeline_longcat as plc

        pipe = _SmallerFramePipe(h=360, w=640)
        state = _FakeState(pipe)
        # Accumulator seed at REFINED res (512x768) — taller/wider than the
        # 360x640 clips generate_vc returns.
        primary = np.full((20, 512, 768, 3), 64, dtype=np.uint8)
        acc = plc._run_scene_loop(
            primary_frames=primary,
            request=_request(),
            state=state,
            generator=None,
            attn_kwargs={},
            host_data_dir=None,
            strict_scene_errors=True,
        )
        acc_arr = np.asarray(acc)
        # No crash + accumulator stays at the seed resolution (512x768)
        assert acc_arr.shape[1] == 512
        assert acc_arr.shape[2] == 768
        # grew beyond the seed (fresh frames appended)
        assert acc_arr.shape[0] > 20
