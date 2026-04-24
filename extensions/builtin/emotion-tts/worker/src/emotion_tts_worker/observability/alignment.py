"""Alignment-score computation from a decoder-attention tensor.

Given an attention tensor of shape ``[heads, text_len, audio_frames]``
(probabilities per head over the text axis summed to 1 across audio
frames), produce:

* a per-head Viterbi-path probability (mean log-prob, exponentiated
  back into [0, 1]),
* an aggregate alignment score (mean over heads),
* the raw per-head scores list.

Implementation uses numpy only (pure CPU) so the module works in the
same env as the Python tests — torch is *not* a requirement.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    import numpy as np


MONOTONIC_STEP = 2  # how far the audio index may advance per text step


@dataclass(frozen=True)
class AlignmentScore:
    score: float
    per_head_scores: tuple[float, ...]


def compute_alignment_score(attention: "np.ndarray") -> AlignmentScore:
    """Return the aggregate + per-head alignment scores for an attention tensor.

    ``attention`` is expected to have shape ``[heads, text_len, audio_frames]``
    with each row (over audio_frames, fixing head + text) a probability
    distribution. We compute the monotonic Viterbi path through each head's
    matrix and exponentiate the mean log-probability so scores live in
    ``[0, 1]`` and are directly comparable against the threshold.
    """

    import numpy as np

    if attention.ndim != 3:
        raise ValueError(
            f"attention must be [heads, text_len, audio_frames]; got shape {attention.shape}"
        )

    per_head: list[float] = []
    for head_idx in range(attention.shape[0]):
        log_attn = np.log(attention[head_idx] + 1e-12)
        per_head.append(_viterbi_mean_exp(log_attn))

    return AlignmentScore(
        score=float(sum(per_head) / len(per_head)),
        per_head_scores=tuple(per_head),
    )


def _viterbi_mean_exp(log_attn: "np.ndarray") -> float:
    import numpy as np

    text_len, audio_frames = log_attn.shape
    dp = np.full((text_len, audio_frames), -np.inf, dtype=np.float64)
    dp[0] = log_attn[0]
    for t in range(1, text_len):
        for j in range(audio_frames):
            lo = max(0, j - MONOTONIC_STEP)
            best_prev = np.max(dp[t - 1, lo : j + 1])
            dp[t, j] = best_prev + log_attn[t, j]
    final = float(np.max(dp[-1]))
    mean_log = final / text_len
    return float(np.exp(mean_log))
