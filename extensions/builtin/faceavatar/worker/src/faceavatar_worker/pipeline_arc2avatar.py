"""Real Arc2Avatar identity-head pipeline (gb10 backend) — STUB.

TODO(gpu-spike): real Arc2Avatar per-image fit + FLAME head export (spec §4 step
1) and the graft weld (graft.graft_real). NOT wired in the scaffold pass.

Real generate_head algorithm (design intent — implement during the GPU spike):
  preprocess (face crop per `crop`) → ArcFace identity embedding (insightface) →
  FLAME shape/expression fit (`expression`=neutral|source) → Arc2Avatar per-image
  optimisation for `arc_iters` steps (gaussian-splat / rasteriser) → mesh
  extraction → optional photo back-projection texture (`texture`) →
  export identity head/bust GLB + metadata.

Honest ceiling (spec §1): recognizable frontal-to-three-quarter bust; unseen
geometry is hallucinated. Per-image optimisation is minutes/photo — `arc_iters`
is the latency knob.

ALL torch/pytorch3d/nvdiffrast/insightface/flame imports MUST stay lazy (inside
the run functions) so this module imports cleanly on a torch-free box for handler
wiring + health probing.
"""
from __future__ import annotations

import asyncio
import threading
from typing import Any, Callable

from .cancel import GenerationCancelled
from .graft import GPU_SPIKE_MESSAGE, graft_real
from .main import WorkerError
from .params import GenerateHeadParams, validate_generate_head_params
from .rpc import ErrorCodes, Methods, Notifications


def generate_head_real(
    params: dict[str, Any],
    emit_sync: Callable[[str, dict[str, Any]], None],
    cancel_event: threading.Event,
) -> dict[str, Any]:
    """Synchronous (would run under asyncio.to_thread). Validates the inputs so
    the contract surface is exercised, then raises until the GPU spike wires the
    real Arc2Avatar fit (see module docstring, spec §4 step 1)."""
    validated: GenerateHeadParams = validate_generate_head_params(params or {})
    _ = validated  # contract validated; real fit is deferred
    raise WorkerError(ErrorCodes.GENERATION_FAILED, GPU_SPIKE_MESSAGE)


def register_arc2avatar_handlers(worker: Any) -> None:
    """Wire the SAME .start/.cancel surface as the fake backend so the wire
    contract is identical — but every .start raises the GPU-spike error until the
    real pipeline lands. health_fn reports per-dep status (NotSatisfied on a
    torch-free box)."""
    generate_cancel_event = threading.Event()
    graft_cancel_event = threading.Event()

    async def _generate_start(params: dict[str, Any]) -> dict[str, Any]:
        generate_cancel_event.clear()

        def _emit_sync(method: str, payload: dict[str, Any]) -> None:
            worker.notify_from_thread(method, payload)

        try:
            return await asyncio.to_thread(
                generate_head_real, params or {}, _emit_sync, generate_cancel_event
            )
        except GenerationCancelled:
            raise WorkerError(ErrorCodes.CANCELLED, "generation cancelled")

    async def _generate_cancel(_params: Any) -> dict[str, Any]:
        generate_cancel_event.set()
        return {"cancelled": True}

    async def _graft_start(params: dict[str, Any]) -> dict[str, Any]:
        graft_cancel_event.clear()

        def _emit_sync(method: str, payload: dict[str, Any]) -> None:
            worker.notify_from_thread(method, payload)

        try:
            return await asyncio.to_thread(
                graft_real, params or {}, _emit_sync, graft_cancel_event
            )
        except GenerationCancelled:
            raise WorkerError(ErrorCodes.CANCELLED, "graft cancelled")

    async def _graft_cancel(_params: Any) -> dict[str, Any]:
        graft_cancel_event.set()
        return {"cancelled": True}

    from .health import build_health

    worker.health_fn = lambda: build_health(worker.profile)
    worker.register(Methods.GENERATE_HEAD_START, _generate_start)
    worker.register(Methods.GENERATE_HEAD_CANCEL, _generate_cancel)
    worker.register(Methods.GRAFT_HEAD_START, _graft_start)
    worker.register(Methods.GRAFT_HEAD_CANCEL, _graft_cancel)


__all__ = [
    "generate_head_real",
    "register_arc2avatar_handlers",
    "GPU_SPIKE_MESSAGE",
]
