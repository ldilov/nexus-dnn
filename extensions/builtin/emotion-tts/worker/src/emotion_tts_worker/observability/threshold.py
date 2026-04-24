"""Per-deployment OAS threshold logic (spec 034 R-34-03).

Three regimes — pure function, no I/O:

* **Cold** (< 100 segments seen) → literature default (0.45 from
  arXiv:2509.19852); threshold_source == "literature_default".
* **Warm** (100 .. 1000 segments) → rolling median − 1.5 × MAD over the
  last 100 samples; threshold_source == "rolling_mad".
* **Hot** (>= 1000 segments) → same rolling MAD but over the last 500
  samples. Transparent to the UI — same source tag as warm.

The caller is responsible for persisting ``threshold_learned`` on the
deployment row; this module only decides.
"""

from __future__ import annotations

import statistics
from dataclasses import dataclass
from typing import Literal, Sequence

ThresholdSource = Literal["literature_default", "rolling_mad"]


@dataclass(frozen=True)
class ThresholdDecision:
    threshold: float
    source: ThresholdSource
    sample_window: int


COLD_CUTOFF = 100
HOT_CUTOFF = 1000
WARM_WINDOW = 100
HOT_WINDOW = 500
MAD_MULTIPLIER = 1.5


def next_threshold(
    samples_seen: int,
    history: Sequence[float],
    literature_default: float = 0.45,
) -> ThresholdDecision:
    """Decide the alignment-score threshold for the next batch.

    ``samples_seen`` is the deployment's lifetime segment count *before* the
    current batch. ``history`` is the sorted-by-time list of alignment
    scores already observed for the deployment — we slice the tail.
    """

    if samples_seen < COLD_CUTOFF:
        return ThresholdDecision(
            threshold=literature_default,
            source="literature_default",
            sample_window=0,
        )

    window_size = HOT_WINDOW if samples_seen >= HOT_CUTOFF else WARM_WINDOW
    tail = list(history[-window_size:])
    if len(tail) < 2:
        return ThresholdDecision(
            threshold=literature_default,
            source="literature_default",
            sample_window=len(tail),
        )

    median = statistics.median(tail)
    deviations = [abs(x - median) for x in tail]
    mad = statistics.median(deviations) or 0.0
    threshold = max(0.0, min(1.0, median - MAD_MULTIPLIER * mad))
    return ThresholdDecision(
        threshold=threshold,
        source="rolling_mad",
        sample_window=len(tail),
    )
