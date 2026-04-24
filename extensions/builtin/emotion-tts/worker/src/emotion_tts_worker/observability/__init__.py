"""Spec 034 US2 — OAS (Optimal Alignment Score) observability layer.

Three pure submodules (alignment / threshold / png) + one stateful context
manager (``AttentionCapture``) that instruments the engine's decoder to
emit attention probabilities. Import surface kept explicit so CPU-only
envs can exercise threshold + png without pulling torch.
"""

from .alignment import AlignmentScore, compute_alignment_score
from .hooks import AttentionCapture, CapturedAttention
from .threshold import ThresholdDecision, next_threshold

__all__ = [
    "AlignmentScore",
    "AttentionCapture",
    "CapturedAttention",
    "ThresholdDecision",
    "compute_alignment_score",
    "next_threshold",
]
