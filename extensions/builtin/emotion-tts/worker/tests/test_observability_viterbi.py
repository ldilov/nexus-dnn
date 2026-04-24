"""T051 — Viterbi-path alignment unit tests (spec 034 US2)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.observability.alignment import compute_alignment_score

from conftest_ref_audio import requires_audio_stack


@requires_audio_stack
def test_score_high_for_clean_diagonal_attention():
    import numpy as np

    heads, text_len, audio_frames = 3, 20, 40
    attention = np.full((heads, text_len, audio_frames), 1.0 / audio_frames, dtype=np.float64)
    # Strong diagonal: each text position puts mass on a monotonic audio index.
    for h in range(heads):
        for t in range(text_len):
            j = int(t * audio_frames / text_len)
            attention[h, t, :] *= 0.01
            attention[h, t, j] = 0.9
        # Re-normalise.
        attention[h] /= attention[h].sum(axis=-1, keepdims=True)

    result = compute_alignment_score(attention)
    assert 0.0 <= result.score <= 1.0
    assert result.score > 0.3, (
        f"clean diagonal attention should score well above threshold; got {result.score}"
    )
    assert len(result.per_head_scores) == heads
    assert all(0.0 <= s <= 1.0 for s in result.per_head_scores)


@requires_audio_stack
def test_score_low_for_uniform_attention():
    import numpy as np

    heads, text_len, audio_frames = 2, 20, 40
    # Uniform probability — no alignment at all.
    attention = np.full((heads, text_len, audio_frames), 1.0 / audio_frames, dtype=np.float64)
    result = compute_alignment_score(attention)
    assert result.score < 0.1, (
        f"uniform attention should score near zero; got {result.score}"
    )


@requires_audio_stack
def test_rejects_wrong_shape():
    import numpy as np

    bad = np.zeros((20, 40))  # 2-D, not 3-D
    with pytest.raises(ValueError):
        compute_alignment_score(bad)


@requires_audio_stack
def test_score_is_deterministic():
    import numpy as np

    rng = np.random.default_rng(0xEB0734)
    raw = rng.random((2, 10, 20))
    attention = raw / raw.sum(axis=-1, keepdims=True)
    a = compute_alignment_score(attention)
    b = compute_alignment_score(attention)
    assert a == b
