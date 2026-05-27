"""Reproducibility smoke for multiprompt multiscene generation.

GPU-free: exercises the seed-derivation contract that `gpu_smoke_multiscene.py
--repro` relies on. If these tests pass, two GPU runs with the same base
seed and identical scene config feed bit-identical noise into every
`generate_t2v` / `generate_vc` call, which is the precondition for the
byte-identical-MP4 check the real-GPU smoke makes.

Covers:
  - per-scene seed derivation is deterministic across runs
  - per-scene Generators are distinct across scenes (so scenes don't collapse
    onto the same noise tensor)
  - per-scene seed_offset override is honoured
  - the cuda.synchronize fence is invoked BEFORE Generator construction
    (so prior-scene async work cannot leak randomness into the next scene)
  - the same multi-scene config produces the same scene-by-scene seed
    schedule across N=2 calls (the property the real-GPU repro asserts at
    the pixel level)
"""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

from longcat_video_worker.pipeline_longcat import _build_scene_generator


def _capture_seeds_for_scenes(base_seed: int, n_scenes: int) -> list[int]:
    seen: list[int] = []
    with patch("torch.cuda.synchronize"), patch("torch.Generator") as gen_cls:
        def capture(seed: int) -> str:
            seen.append(seed)
            return "g"
        gen_cls.return_value.manual_seed.side_effect = capture
        for idx in range(n_scenes):
            _build_scene_generator(base_seed, idx, None, "cpu")
    return seen


@pytest.mark.smoke
def test_multiscene_seed_schedule_is_deterministic_across_runs() -> None:
    a = _capture_seeds_for_scenes(base_seed=1357911, n_scenes=2)
    b = _capture_seeds_for_scenes(base_seed=1357911, n_scenes=2)
    assert a == b, f"seed schedule diverged across identical-input runs: {a} vs {b}"


@pytest.mark.smoke
def test_multiscene_scenes_get_distinct_seeds() -> None:
    seeds = _capture_seeds_for_scenes(base_seed=42, n_scenes=2)
    assert len(set(seeds)) == 2, (
        "scenes collapsed onto a single seed - per-scene noise would be identical"
    )


@pytest.mark.smoke
def test_multiscene_per_scene_offset_override_is_honoured() -> None:
    captured: list[int] = []
    with patch("torch.cuda.synchronize"), patch("torch.Generator") as gen_cls:
        def capture(seed: int) -> str:
            captured.append(seed)
            return "g"
        gen_cls.return_value.manual_seed.side_effect = capture
        _build_scene_generator(100, 1, None, "cpu")
        _build_scene_generator(100, 1, 4242, "cpu")
    assert captured[1] - captured[0] == 4242


@pytest.mark.smoke
def test_multiscene_cuda_sync_fences_every_scene() -> None:
    call_log: list[str] = []
    with patch("torch.cuda.synchronize", side_effect=lambda: call_log.append("sync")), \
         patch("torch.Generator") as gen_cls:
        def gen_init(*_args, **_kw):
            call_log.append("gen")
            m = MagicMock()
            m.manual_seed = MagicMock(return_value=m)
            return m
        gen_cls.side_effect = gen_init
        for idx in range(3):
            _build_scene_generator(7, idx, None, "cpu")
    for i in range(0, 6, 2):
        assert call_log[i] == "sync", (
            f"scene[{i // 2}] did not fence before Generator construction; "
            f"call_log={call_log}"
        )
        assert call_log[i + 1] == "gen"


@pytest.mark.smoke
def test_multiscene_changing_base_seed_changes_full_schedule() -> None:
    a = _capture_seeds_for_scenes(base_seed=1, n_scenes=3)
    b = _capture_seeds_for_scenes(base_seed=2, n_scenes=3)
    assert a != b, "different base seeds produced identical scene seed schedules"
