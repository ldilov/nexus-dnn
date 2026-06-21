"""fast-parallel / batch-prompt-encode flag plumbing (#2 + validate defaults).

These run without torch/CUDA: ``_apply_torch_threads`` is exercised against an
injected fake ``torch`` module so we can assert ``set_num_threads`` is called
with ``THREADS`` when ``fast_parallel`` is on and restores the captured process
default when it is off.
"""

import sys
import types

import pytest

import svi2_video_worker.pipeline_svi2 as pipe
from svi2_video_worker.pipeline_svi2 import (
    THREADS,
    cpu_thread_count,
    validate_render_params,
)


def test_thread_count_is_cpu_half_min_one():
    import os

    expected = max(1, (os.cpu_count() or 2) // 2)
    assert cpu_thread_count() == expected
    assert THREADS == expected
    assert THREADS >= 1


# A torch default distinct from THREADS so restore is observable in the calls log.
_ORIGINAL_THREADS = THREADS + 7


@pytest.fixture
def fake_torch(monkeypatch):
    calls = []
    fake = types.ModuleType("torch")
    fake.set_num_threads = lambda n: calls.append(n)
    fake.get_num_threads = lambda: _ORIGINAL_THREADS
    monkeypatch.setitem(sys.modules, "torch", fake)
    # reset the latches so each test starts clean
    monkeypatch.setattr(pipe, "_torch_threads_applied", None, raising=False)
    monkeypatch.setattr(pipe, "_torch_threads_original", None, raising=False)
    return calls


def test_apply_torch_threads_on_calls_set_num_threads_with_threads(fake_torch):
    applied = pipe._apply_torch_threads(True)
    assert applied is True
    assert fake_torch == [THREADS]


def test_apply_torch_threads_off_restores_process_default(fake_torch):
    assert pipe._apply_torch_threads(True) is True
    assert pipe._apply_torch_threads(False) is True
    assert fake_torch == [THREADS, _ORIGINAL_THREADS]


def test_apply_torch_threads_is_idempotent(fake_torch):
    assert pipe._apply_torch_threads(True) is True
    assert pipe._apply_torch_threads(True) is False  # second call is a no-op
    assert fake_torch == [THREADS]  # set_num_threads invoked exactly once


def test_apply_torch_threads_torch_absent_is_safe(monkeypatch):
    monkeypatch.setattr(pipe, "_torch_threads_applied", None, raising=False)
    monkeypatch.setattr(pipe, "_torch_threads_original", None, raising=False)
    monkeypatch.setitem(sys.modules, "torch", None)  # import torch -> ImportError
    assert pipe._apply_torch_threads(True) is False


def test_validate_defaults_fast_parallel_on_batch_encode_off():
    v = validate_render_params({"mode": "text_to_video", "prompts": ["p"], "num_clips": 1})
    assert v["fast_parallel"] is True
    assert v["batch_prompt_encode"] is False


def test_validate_respects_explicit_flags():
    v = validate_render_params(
        {
            "mode": "text_to_video",
            "prompts": ["p"],
            "num_clips": 1,
            "fast_parallel": False,
            "batch_prompt_encode": True,
        }
    )
    assert v["fast_parallel"] is False
    assert v["batch_prompt_encode"] is True
