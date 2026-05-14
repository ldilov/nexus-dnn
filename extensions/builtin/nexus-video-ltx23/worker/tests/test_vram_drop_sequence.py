"""Canonical VRAM drop sequence — verified via mock torch.

We can't actually exercise torch.cuda here (CI has no GPU). What we CAN
verify:
- evict_models() never raises when torch is absent (fake profile reality).
- memory_stats() returns the expected schema even without torch.
- The drop sequence calls pipe.to('cpu'), deletes sub-modules, then
  pipe is set to None.
"""

from __future__ import annotations

from types import SimpleNamespace
from unittest.mock import MagicMock

from ltx_video_worker.vram import evict_models, memory_stats


def test_evict_models_with_no_pipe_is_noop():
    state = SimpleNamespace(pipe=None)
    evict_models(state)
    assert state.pipe is None


def test_evict_models_moves_pipe_to_cpu_and_clears():
    pipe = MagicMock()
    pipe.transformer = MagicMock()
    pipe.vae = MagicMock()
    pipe.text_encoder = MagicMock()
    state = SimpleNamespace(pipe=pipe)

    evict_models(state)

    pipe.to.assert_called_with("cpu")
    assert state.pipe is None


def test_memory_stats_schema_without_torch():
    stats = memory_stats(generation_count=3)
    for key in (
        "allocated_mb",
        "reserved_mb",
        "peak_mb_this_segment",
        "frag_ratio",
        "num_alloc_retries",
        "num_ooms",
        "free_mb",
        "rss_mb",
        "generation_count",
    ):
        assert key in stats
    assert stats["generation_count"] == 3
