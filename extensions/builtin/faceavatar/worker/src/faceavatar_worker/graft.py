"""FLAME identity face-shell → base-mesh weld + texture blend — STUB.

TODO(gpu-spike): real seam-weld + texture-blend math (spec §4). NOT wired in the
scaffold pass; the fake backend (pipeline_fake.graft_head_fake_e2e) produces a
deterministic placeholder GLB so the rust shim, web UI, params, and storage are
testable offline.

Real algorithm (design intent — implement during the GPU spike):
  1. Arc2Avatar fit on the photo → FLAME identity head: canonical topology,
     known landmarks, known neck ring, ArcFace-optimised to the person; real
     photo back-projected as texture.
  2. Load the base_mesh GLB (the opaque input artifact, supplied by the user).
  3. Align the FLAME head to the base head via landmarks — scale by inter-pupil
     distance / neck-ring diameter, orient via landmark correspondence.
     (align="manual" exposes a fallback transform supplied from the UI.)
  4. Cut the base head at `seam` (neck or hairline) and weld the FLAME
     face-shell: boundary stitch + Laplacian blend over `blend_ring`.
  5. Keep the base mesh's hair/back/body when `keep_hair` — the base owns the
     hallucinated remainder, FLAME owns the identity face.
  6. Blend textures across the seam (`texture_blend`) so the two generators'
     albedo match.
  7. Export the fused GLB + metadata.

ALL torch/pytorch3d/nvdiffrast/insightface imports MUST stay lazy (inside the
run function) so this module imports cleanly on a torch-free box.
"""
from __future__ import annotations

import threading
from typing import Any, Callable

from .main import WorkerError
from .params import GraftHeadParams, validate_graft_head_params
from .rpc import ErrorCodes

GPU_SPIKE_MESSAGE = "GPU path not wired — TODO(gpu-spike)"


def graft_real(
    params: dict[str, Any],
    emit_sync: Callable[[str, dict[str, Any]], None],
    cancel_event: threading.Event,
) -> dict[str, Any]:
    """Synchronous (would run under asyncio.to_thread). Validates the inputs so
    the contract surface is exercised, then raises until the GPU spike wires the
    real FLAME→base-mesh weld + texture blend (see module docstring, spec §4)."""
    validated: GraftHeadParams = validate_graft_head_params(params or {})
    _ = validated  # contract validated; real weld is deferred
    raise WorkerError(ErrorCodes.GENERATION_FAILED, GPU_SPIKE_MESSAGE)


__all__ = ["graft_real", "GPU_SPIKE_MESSAGE"]
