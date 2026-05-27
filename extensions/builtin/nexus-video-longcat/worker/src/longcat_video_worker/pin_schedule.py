"""Soft-pin decay schedule for scene-to-scene boundaries.

The legacy chain path enforces a hard clean pin at the start of every
non-zero scene: ``x0[0] == prev_scene_tail``. The eye reads this as a
freeze and the diffusion model fights pinned latents against the new
prompt's cross-attention, producing first-second identity smear.

This module produces a per-frame *ramp* over the first N frames of the
new scene that:

1. decays the x0 pin from near-1 toward 0
2. cross-fades text conditioning from the bridge prompt toward the next
   scene prompt over the same window

S2 SCOPE: pure schedule generation. No pipeline / latent / cross-attn
wiring lives here. Module is import-cheap (no torch, no numpy at module
scope) so it can be reused by tests, the planner, and the renderer
without dragging in heavy deps.
"""

from __future__ import annotations

import math
from dataclasses import dataclass
from enum import Enum
from typing import Tuple

MIN_RAMP_FRAMES = 1
MAX_RAMP_FRAMES = 24
DEFAULT_RAMP_FRAMES = 8

X0_HEAD = 0.92
X0_TAIL = 0.0
BRIDGE_HEAD = 0.70
BRIDGE_TAIL = 0.0
NEXT_HEAD = 0.30
NEXT_TAIL = 1.0


class PinCurve(str, Enum):
    """Shape of the pin decay over the ramp window.

    ``exp``    — fast initial drop, long tail. Best when the prompt-jump
                 is large; surrenders pin influence quickly so the new
                 scene's cross-attn can take over.
    ``linear`` — uniform decay. Safest neutral default; predictable in
                 telemetry; preferred when the two scenes are close.
    ``cosine`` — slow at both ends, fast in the middle. Cinematic
                 dissolve-like feel; the most "soft" perception.
    """

    EXP = "exp"
    LINEAR = "linear"
    COSINE = "cosine"


@dataclass(frozen=True)
class PinSchedule:
    """Per-frame schedule for a single boundary ramp.

    All four lists have identical length (``ramp_frames``) and are aligned
    by index: position ``t`` describes the frame ``t`` of the destination
    scene, with ``t=0`` being the boundary frame. Beyond ``ramp_frames``
    the pipeline returns to default behavior (no pin, full next-prompt).

    Invariants (enforced in ``__post_init__``):
      * len(x0_weights) == len(prompt_bridge) == len(prompt_next) == ramp_frames
      * each weight is in [0.0, 1.0]
      * prompt_bridge[t] + prompt_next[t] ~= 1.0 (text-conditioning sums to one)
      * x0_weights monotonically non-increasing
      * prompt_next monotonically non-decreasing
      * prompt_bridge monotonically non-increasing
    """

    ramp_frames: int
    curve: PinCurve
    x0_weights: Tuple[float, ...]
    prompt_bridge: Tuple[float, ...]
    prompt_next: Tuple[float, ...]

    def __post_init__(self) -> None:
        if self.ramp_frames < MIN_RAMP_FRAMES or self.ramp_frames > MAX_RAMP_FRAMES:
            raise ValueError(
                f"ramp_frames={self.ramp_frames} not in [{MIN_RAMP_FRAMES}, {MAX_RAMP_FRAMES}]"
            )
        if not (
            len(self.x0_weights)
            == len(self.prompt_bridge)
            == len(self.prompt_next)
            == self.ramp_frames
        ):
            raise ValueError(
                "PinSchedule weight tuples must all equal ramp_frames length"
            )
        for name, seq in (
            ("x0_weights", self.x0_weights),
            ("prompt_bridge", self.prompt_bridge),
            ("prompt_next", self.prompt_next),
        ):
            for i, w in enumerate(seq):
                if w < 0.0 or w > 1.0:
                    raise ValueError(f"PinSchedule.{name}[{i}]={w} not in [0.0, 1.0]")
        for i in range(1, self.ramp_frames):
            if self.x0_weights[i] > self.x0_weights[i - 1] + 1e-6:
                raise ValueError("PinSchedule.x0_weights must be monotonically non-increasing")
            if self.prompt_next[i] < self.prompt_next[i - 1] - 1e-6:
                raise ValueError("PinSchedule.prompt_next must be monotonically non-decreasing")
            if self.prompt_bridge[i] > self.prompt_bridge[i - 1] + 1e-6:
                raise ValueError("PinSchedule.prompt_bridge must be monotonically non-increasing")
        for t, (b, n) in enumerate(zip(self.prompt_bridge, self.prompt_next)):
            if abs((b + n) - 1.0) > 1e-3:
                raise ValueError(
                    f"PinSchedule.prompt_bridge[{t}]+prompt_next[{t}]={b + n:.4f} != 1.0"
                )


def _normalized_t(i: int, ramp: int) -> float:
    if ramp <= 1:
        return 0.0
    return i / (ramp - 1)


def _curve_value(t: float, curve: PinCurve) -> float:
    """Decay weight in [0.0, 1.0] given normalized position t in [0.0, 1.0].

    Returns 1.0 at t=0 (pin fully engaged) and 0.0 at t=1 (pin released).
    """
    t = max(0.0, min(1.0, t))
    if curve is PinCurve.LINEAR:
        return 1.0 - t
    if curve is PinCurve.COSINE:
        return 0.5 * (1.0 + math.cos(math.pi * t))
    # exp: e^{-k*t}, k chosen so curve(1.0) ~= 0.02 (effectively zero)
    k = 4.0
    return math.exp(-k * t)


def _interp(head: float, tail: float, weight: float) -> float:
    """Interpolate from ``head`` (weight=1) to ``tail`` (weight=0)."""
    return tail + (head - tail) * weight


def build_schedule(
    ramp_frames: int = DEFAULT_RAMP_FRAMES,
    curve: PinCurve = PinCurve.EXP,
) -> PinSchedule:
    """Build a PinSchedule of the requested length and curve shape.

    The text-conditioning ramp uses the same curve as the x0 pin so the
    operator only configures one shape per boundary. ``prompt_bridge``
    starts at ``BRIDGE_HEAD`` and decays to 0; ``prompt_next`` starts at
    ``1 - BRIDGE_HEAD`` and rises to 1. Their sum is identically 1.0 at
    every frame (preserves cross-attn temperature).
    """
    if ramp_frames < MIN_RAMP_FRAMES or ramp_frames > MAX_RAMP_FRAMES:
        raise ValueError(
            f"ramp_frames={ramp_frames} not in [{MIN_RAMP_FRAMES}, {MAX_RAMP_FRAMES}]"
        )
    x0: list[float] = []
    bridge: list[float] = []
    nxt: list[float] = []
    for i in range(ramp_frames):
        t = _normalized_t(i, ramp_frames)
        w = _curve_value(t, curve)
        x0.append(_interp(X0_HEAD, X0_TAIL, w))
        b = _interp(BRIDGE_HEAD, BRIDGE_TAIL, w)
        bridge.append(b)
        nxt.append(1.0 - b)
    return PinSchedule(
        ramp_frames=ramp_frames,
        curve=curve,
        x0_weights=tuple(x0),
        prompt_bridge=tuple(bridge),
        prompt_next=tuple(nxt),
    )


def legacy_hard_pin_schedule(ramp_frames: int = 1) -> PinSchedule:
    """Reproduce the legacy hard-pin behavior as a single-frame schedule.

    Used when transitions[].type == 'hard_cut' (or when no transitions are
    present in the plan). Frame 0 is fully pinned, fully next-prompt; the
    bridge weight is zero. Matches the pre-S2 byte-exact pin path.
    """
    return PinSchedule(
        ramp_frames=ramp_frames,
        curve=PinCurve.LINEAR,
        x0_weights=tuple([1.0] + [0.0] * (ramp_frames - 1)),
        prompt_bridge=tuple([0.0] * ramp_frames),
        prompt_next=tuple([1.0] * ramp_frames),
    )
