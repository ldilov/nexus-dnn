from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

from longcat_video_worker.pipeline_longcat import _build_scene_generator


def _fake_generator_cls() -> MagicMock:
    fake = MagicMock()
    fake.manual_seed = MagicMock(return_value=fake)
    return fake


def test_seed_formula_deterministic() -> None:
    base = 12345
    with patch("torch.cuda.synchronize"), patch("torch.Generator") as gen_cls:
        gen_cls.return_value.manual_seed = MagicMock(return_value="g")
        _build_scene_generator(base, 0, None, "cpu")
        gen_cls.return_value.manual_seed.assert_called_with(12345 & 0x7FFFFFFF)


def test_seed_idx_offset_distinct() -> None:
    seen: list[int] = []
    with patch("torch.cuda.synchronize"), patch("torch.Generator") as gen_cls:
        def capture(seed: int) -> str:
            seen.append(seed)
            return "g"
        gen_cls.return_value.manual_seed.side_effect = capture
        for i in range(5):
            _build_scene_generator(0, i, None, "cpu")
    assert len(set(seen)) == 5


def test_seed_offset_overrides_per_scene() -> None:
    seen: list[int] = []
    with patch("torch.cuda.synchronize"), patch("torch.Generator") as gen_cls:
        def capture(seed: int) -> str:
            seen.append(seed)
            return "g"
        gen_cls.return_value.manual_seed.side_effect = capture
        _build_scene_generator(0, 2, None, "cpu")
        _build_scene_generator(0, 2, 999, "cpu")
    assert seen[1] - seen[0] == 999


def test_seed_synchronize_called_before_generator() -> None:
    call_log: list[str] = []
    with patch("torch.cuda.synchronize", side_effect=lambda: call_log.append("sync")), \
         patch("torch.Generator") as gen_cls:
        def gen_init(*_args, **_kw):
            call_log.append("gen")
            m = MagicMock()
            m.manual_seed = MagicMock(return_value=m)
            return m
        gen_cls.side_effect = gen_init
        _build_scene_generator(7, 1, None, "cpu")
    assert call_log[0] == "sync"
    assert call_log[1] == "gen"


def test_seed_bit_mask_applied() -> None:
    big = 2**40
    seen: list[int] = []
    with patch("torch.cuda.synchronize"), patch("torch.Generator") as gen_cls:
        def capture(seed: int) -> str:
            seen.append(seed)
            return "g"
        gen_cls.return_value.manual_seed.side_effect = capture
        _build_scene_generator(big, 0, None, "cpu")
    assert seen[0] == big & 0x7FFFFFFF


def test_seed_none_base_handled_as_zero() -> None:
    seen: list[int] = []
    with patch("torch.cuda.synchronize"), patch("torch.Generator") as gen_cls:
        def capture(seed: int) -> str:
            seen.append(seed)
            return "g"
        gen_cls.return_value.manual_seed.side_effect = capture
        _build_scene_generator(None, 3, None, "cpu")
    assert seen[0] == (3 * 1_000_003) & 0x7FFFFFFF
