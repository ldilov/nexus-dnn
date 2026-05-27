"""S4 — pin-frame micro-perturb (subpixel jitter + grain reseed).

Covers:
* perturb_pin_frame no-ops when both magnitudes are zero.
* perturb_pin_frame perturbs ONLY frame 0; frames 1..N stay identical.
* jitter alone changes pixels at edges (translation footprint).
* grain alone changes pixel std without shifting the centroid.
* magnitudes clamped to MAX_JITTER_PX / MAX_GRAIN_SIGMA.
* seed determinism: same seed -> identical output.
* empty tail returns input unchanged.
* dtype + shape validation raise.
* _run_scene_loop integration: jitter is applied only on soft transitions
  AND only when magnitudes are positive.
"""

from __future__ import annotations

from typing import Any

import numpy as np
import pytest

from longcat_video_worker.micro_perturb import (
    DEFAULT_GRAIN_SIGMA,
    DEFAULT_JITTER_PX,
    MAX_GRAIN_SIGMA,
    MAX_JITTER_PX,
    perturb_pin_frame,
)


def _checkerboard(t: int = 5, h: int = 16, w: int = 16) -> np.ndarray:
    """Synthetic tail. High-contrast pattern so jitter visibly shifts edges."""
    grid = np.indices((h, w)).sum(axis=0) % 2
    one_frame = (grid * 200 + 30).astype(np.uint8)
    one_frame = np.stack([one_frame] * 3, axis=-1)
    return np.stack([one_frame] * t, axis=0)


class TestPerturbBasics:
    def test_zero_magnitudes_no_op(self):
        tail = _checkerboard()
        out = perturb_pin_frame(tail, jitter_px=0.0, grain_sigma=0.0)
        assert np.array_equal(out, tail)
        # default args are zero
        out2 = perturb_pin_frame(tail)
        assert np.array_equal(out2, tail)

    def test_defaults_are_zero(self):
        assert DEFAULT_JITTER_PX == 0.0
        assert DEFAULT_GRAIN_SIGMA == 0.0

    def test_empty_tail_returns_input(self):
        empty = np.zeros((0, 16, 16, 3), dtype=np.uint8)
        out = perturb_pin_frame(empty, jitter_px=0.25, grain_sigma=0.02)
        assert out.shape == empty.shape

    def test_rejects_bad_dtype(self):
        bad = _checkerboard().astype(np.float32) / 255.0
        with pytest.raises(ValueError, match="uint8"):
            perturb_pin_frame(bad, jitter_px=0.25)

    def test_rejects_bad_shape(self):
        bad = np.zeros((5, 16, 16), dtype=np.uint8)
        with pytest.raises(ValueError, match="T, H, W, 3"):
            perturb_pin_frame(bad, jitter_px=0.25)


class TestJitterOnly:
    def test_only_frame_zero_changes(self):
        tail = _checkerboard()
        out = perturb_pin_frame(tail, jitter_px=0.4, grain_sigma=0.0, seed=42)
        # Frame 0 must differ from input frame 0
        assert not np.array_equal(out[0], tail[0])
        # Frames 1..N must be byte-identical to input.
        assert np.array_equal(out[1:], tail[1:])

    def test_deterministic_under_seed(self):
        tail = _checkerboard()
        a = perturb_pin_frame(tail, jitter_px=0.4, grain_sigma=0.0, seed=7)
        b = perturb_pin_frame(tail, jitter_px=0.4, grain_sigma=0.0, seed=7)
        assert np.array_equal(a, b)

    def test_different_seeds_differ(self):
        tail = _checkerboard()
        a = perturb_pin_frame(tail, jitter_px=0.4, grain_sigma=0.0, seed=1)
        b = perturb_pin_frame(tail, jitter_px=0.4, grain_sigma=0.0, seed=2)
        # Different seeds should produce different frame 0 outputs.
        assert not np.array_equal(a[0], b[0])


class TestGrainOnly:
    def test_only_frame_zero_changes(self):
        tail = _checkerboard()
        out = perturb_pin_frame(tail, jitter_px=0.0, grain_sigma=0.03, seed=42)
        assert not np.array_equal(out[0], tail[0])
        assert np.array_equal(out[1:], tail[1:])

    def test_centroid_preserved_within_tolerance(self):
        # Grain has zero-mean noise so the per-channel mean should not
        # drift substantially. Use a flat mid-grey frame for a clean test.
        tail = np.full((3, 32, 32, 3), 128, dtype=np.uint8)
        out = perturb_pin_frame(tail, jitter_px=0.0, grain_sigma=0.03, seed=42)
        before = tail[0].astype(np.float32).mean(axis=(0, 1))
        after = out[0].astype(np.float32).mean(axis=(0, 1))
        # Tolerance is ~3 LSB on a 32x32 frame with sigma*255 ~= 7.65.
        assert np.allclose(before, after, atol=4.0)

    def test_std_increases(self):
        tail = np.full((3, 32, 32, 3), 128, dtype=np.uint8)
        out = perturb_pin_frame(tail, jitter_px=0.0, grain_sigma=0.03, seed=42)
        assert out[0].astype(np.float32).std() > tail[0].astype(np.float32).std()


class TestMagnitudeClamping:
    def test_oversized_jitter_clamped(self):
        tail = _checkerboard()
        # Request well above the cap; output should match a request at the cap.
        a = perturb_pin_frame(tail, jitter_px=10.0, grain_sigma=0.0, seed=99)
        b = perturb_pin_frame(tail, jitter_px=MAX_JITTER_PX, grain_sigma=0.0, seed=99)
        assert np.array_equal(a, b)

    def test_oversized_grain_clamped(self):
        tail = np.full((3, 16, 16, 3), 128, dtype=np.uint8)
        a = perturb_pin_frame(tail, jitter_px=0.0, grain_sigma=1.0, seed=99)
        b = perturb_pin_frame(tail, jitter_px=0.0, grain_sigma=MAX_GRAIN_SIGMA, seed=99)
        assert np.array_equal(a, b)

    def test_negative_clamped_to_zero(self):
        tail = _checkerboard()
        out = perturb_pin_frame(tail, jitter_px=-1.0, grain_sigma=-1.0, seed=0)
        assert np.array_equal(out, tail)


class TestSceneLoopIntegration:
    """Verify _run_scene_loop actually applies the perturb on soft transitions."""

    def _build(self, request_kwargs: dict[str, Any], primary_pattern: np.ndarray) -> tuple:
        from longcat_video_worker import pipeline_longcat as plc
        from longcat_video_worker.pipeline_longcat import (
            LongCatRenderRequest,
            Scene,
            Transition,
        )

        class _FakePipe:
            def __init__(self) -> None:
                self.tail_first_frames: list[np.ndarray] = []
                self.calls: list[dict[str, Any]] = []

            def _clear_cache(self) -> None:
                return None

            def generate_vc(self, **kw: Any) -> Any:
                self.tail_first_frames.append(np.asarray(kw["video"][0]).copy())
                self.calls.append({k: v for k, v in kw.items() if k != "video"})
                return np.full(
                    (kw["num_frames"], *primary_pattern.shape[1:]),
                    128,
                    dtype=np.uint8,
                )

        class _FakeState:
            def __init__(self, pipe: Any) -> None:
                self.pipeline = pipe
                self.device = "cpu"
                self.compute_dtype = None
                self.lora_network = None

        pipe = _FakePipe()
        state = _FakeState(pipe)
        scenes = [
            Scene(prompt="scene one", overlap_frames=3, duration_seconds=1.5),
            Scene(prompt="scene two", overlap_frames=3, duration_seconds=1.5),
        ]
        transitions = request_kwargs.pop("transitions")
        request = LongCatRenderRequest(
            mode="t2v",
            prompt="scene one",
            height=480,
            width=832,
            num_frames=10,
            num_inference_steps=4,
            guidance_scale=1.0,
            use_distill=True,
            seed=42,
            scenes=scenes,
            transitions=transitions,
            **request_kwargs,
        )
        plc._run_scene_loop(
            primary_frames=primary_pattern,
            request=request,
            state=state,
            generator=None,
            attn_kwargs={},
            host_data_dir=None,
            strict_scene_errors=True,
        )
        return pipe

    def test_soft_transition_with_jitter_perturbs_pin_frame(self):
        from longcat_video_worker.pipeline_longcat import Transition

        primary = _checkerboard(t=10, h=32, w=32)
        # No perturb: tail frame 0 byte-identical to primary[-3].
        pipe_no = self._build(
            {
                "transitions": [
                    Transition(
                        from_scene=0,
                        to_scene=1,
                        type="soft",
                        bridge_text="continues",
                    )
                ],
                "boundary_jitter_px": 0.0,
                "boundary_grain_sigma": 0.0,
                "image_cond_noise_scale": 0.15,
                "adain_factor": 0.0,
            },
            primary,
        )
        assert np.array_equal(pipe_no.tail_first_frames[0], primary[-3])

        # With jitter: tail frame 0 differs from raw primary tail.
        pipe_yes = self._build(
            {
                "transitions": [
                    Transition(
                        from_scene=0,
                        to_scene=1,
                        type="soft",
                        bridge_text="continues",
                    )
                ],
                "boundary_jitter_px": 0.4,
                "boundary_grain_sigma": 0.0,
                "image_cond_noise_scale": 0.15,
                "adain_factor": 0.0,
            },
            primary,
        )
        assert not np.array_equal(pipe_yes.tail_first_frames[0], primary[-3])

    def test_hard_cut_ignores_perturb_settings(self):
        from longcat_video_worker.pipeline_longcat import Transition

        primary = _checkerboard(t=10, h=32, w=32)
        pipe = self._build(
            {
                "transitions": [
                    Transition(from_scene=0, to_scene=1, type="hard_cut")
                ],
                "boundary_jitter_px": 0.4,
                "boundary_grain_sigma": 0.03,
                "image_cond_noise_scale": 0.15,
                "adain_factor": 0.0,
            },
            primary,
        )
        # hard_cut MUST preserve byte-exact tail regardless of perturb knobs.
        assert np.array_equal(pipe.tail_first_frames[0], primary[-3])

    def test_no_transition_ignores_perturb_settings(self):
        primary = _checkerboard(t=10, h=32, w=32)
        pipe = self._build(
            {
                "transitions": None,
                "boundary_jitter_px": 0.4,
                "boundary_grain_sigma": 0.03,
                "image_cond_noise_scale": 0.15,
                "adain_factor": 0.0,
            },
            primary,
        )
        # No transition = legacy hard-pin path, perturb knobs do nothing.
        assert np.array_equal(pipe.tail_first_frames[0], primary[-3])
