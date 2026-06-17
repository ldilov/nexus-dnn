"""T053 — attention-map PNG renderer unit tests (spec 034 R-34-07)."""

from __future__ import annotations

import pytest

from conftest_ref_audio import requires_audio_stack


matplotlib_available = True
try:
    import matplotlib  # type: ignore[import-not-found]  # noqa: F401
except ImportError:
    matplotlib_available = False

requires_matplotlib = pytest.mark.skipif(
    not matplotlib_available,
    reason="matplotlib not installed",
)


@requires_audio_stack
@requires_matplotlib
def test_renders_png_with_reasonable_size(tmp_path):
    import numpy as np

    from emotion_tts_worker.observability.png import render_attention_map

    heads, text_len, audio_frames = 5, 80, 120
    rng = np.random.default_rng(0xEB0734)
    raw = rng.random((heads, text_len, audio_frames))
    attention = raw / raw.sum(axis=-1, keepdims=True)

    out = tmp_path / "attn.png"
    rendered = render_attention_map(attention, out)
    assert rendered.exists()
    # Sanity bound — noisy random attention inflates the compressed PNG vs.
    # the clean-diagonal attention tensors produced by a real decoder
    size = rendered.stat().st_size
    assert 500 < size < 2_000_000, f"unexpected PNG size {size} bytes"


@requires_audio_stack
@requires_matplotlib
def test_rejects_non_3d_tensor(tmp_path):
    import numpy as np

    from emotion_tts_worker.observability.png import render_attention_map

    flat = np.zeros((10, 10))
    with pytest.raises(ValueError):
        render_attention_map(flat, tmp_path / "x.png")


@requires_audio_stack
@requires_matplotlib
def test_renders_single_head(tmp_path):
    import numpy as np

    from emotion_tts_worker.observability.png import render_attention_map

    attention = np.full((1, 20, 40), 1.0 / 40, dtype=np.float64)
    out = render_attention_map(attention, tmp_path / "one_head.png")
    assert out.stat().st_size > 0
