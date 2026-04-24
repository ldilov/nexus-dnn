"""T082 — shape-cache tests: padding + compile-invocation counting (spec 034 US4)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.gpt_compile import (
    CompileSettings,
    compile_gpt_stage,
    pad_to_bucket,
)


torch_available = True
try:
    import torch  # type: ignore[import-not-found]
    import torch.nn as nn  # type: ignore[import-not-found]
except ImportError:
    torch_available = False

requires_torch = pytest.mark.skipif(not torch_available, reason="torch not installed")


@pytest.mark.parametrize(
    "text_len,multiple_of,expected",
    [
        (1, 64, 64),
        (63, 64, 64),
        (64, 64, 64),
        (65, 64, 128),
        (127, 64, 128),
        (128, 64, 128),
        (200, 64, 256),
        (100, 32, 128),
    ],
)
def test_pad_to_bucket_rounds_up(text_len, multiple_of, expected):
    assert pad_to_bucket(text_len, multiple_of) == expected


def test_pad_to_bucket_zero_or_negative_multiple_passes_through():
    assert pad_to_bucket(77, 0) == 77
    assert pad_to_bucket(77, -1) == 77


@requires_torch
def test_compile_invoked_exactly_once_per_stage_setup(monkeypatch):
    """A single ``compile_gpt_stage`` call invokes ``torch.compile`` once —
    not once per forward. Repeated forwards at different shapes re-use
    the same compiled artifact because inputs get padded into a shared
    bucket."""

    module = nn.Linear(4, 4)
    calls = {"n": 0}

    def counting_compile(m, **_kw):
        calls["n"] += 1
        return m

    monkeypatch.setattr(torch, "compile", counting_compile)

    handle = compile_gpt_stage(
        module,
        CompileSettings(enabled=True, pad_to_multiple_of=64),
    )
    assert calls["n"] == 1

    # Exercise multiple shapes within a single bucket — no additional compiles.
    for text_len in [10, 30, 50, 63]:
        out = handle.forward(torch.zeros(1, 4), text_len=text_len)
        assert out.shape == (1, 4)
    assert calls["n"] == 1, "same bucket must not trigger recompile"


@requires_torch
def test_over_cap_text_len_falls_back_to_eager(monkeypatch):
    """When ``text_len`` exceeds ``max_text_tokens_per_segment`` the
    wrapper routes to eager without touching the compiled path —
    prevents a wasted compile on a one-off oversized segment."""

    module = nn.Linear(4, 4)
    monkeypatch.setattr(torch, "compile", lambda m, **_kw: m)

    handle = compile_gpt_stage(
        module,
        CompileSettings(
            enabled=True,
            pad_to_multiple_of=64,
            max_text_tokens_per_segment=400,
        ),
    )

    eager_calls = {"n": 0}

    def counting_eager(_x):
        eager_calls["n"] += 1
        return torch.zeros(1, 4)

    # Replace compiled path so we can observe which branch was taken.
    handle._compiled = lambda _x: pytest.fail("compiled path must be skipped for oversize")
    handle.module = counting_eager  # type: ignore[assignment]

    handle.forward(torch.zeros(1, 4), text_len=500)
    assert eager_calls["n"] == 1


@requires_torch
def test_shape_cache_compile_count_tracked():
    module = nn.Linear(4, 4)
    handle = compile_gpt_stage(module, CompileSettings(enabled=False))
    assert handle.compile_calls() == 0


@requires_torch
def test_successful_compile_records_one_call(monkeypatch):
    module = nn.Linear(4, 4)
    monkeypatch.setattr(torch, "compile", lambda m, **_kw: m)
    handle = compile_gpt_stage(module, CompileSettings(enabled=True))
    assert handle.compile_calls() == 1
