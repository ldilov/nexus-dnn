"""Identity head → base-mesh graft (gb10 backend).

v1: run the Arc2Avatar fit (identity head GLB), then bbox-align it onto the base
mesh's head region and composite (slice the base below the seam, concatenate).
A seam-blend / Laplacian weld is a follow-up (spec §4 steps 4+6); this produces a
single fused GLB of base body + identity head.

Heavy deps (numpy/trimesh/scipy via the runner) stay lazy so this module imports
cleanly on a torch-free box.
"""
from __future__ import annotations

import os
import threading
import time
from pathlib import Path
from typing import Any, Callable

from .cancel import GenerationCancelled
from .main import WorkerError
from .params import DEFAULT_ARC_ITERS, validate_graft_head_params
from .rpc import ErrorCodes, Notifications

GPU_SPIKE_MESSAGE = "GPU path not wired — TODO(gpu-spike)"


def graft_real(
    params: dict[str, Any],
    emit_sync: Callable[[str, dict[str, Any]], None],
    cancel_event: threading.Event,
) -> dict[str, Any]:
    """Base GLB + photo → base body with the identity head grafted on (v1 composite)."""
    validated = validate_graft_head_params(params or {})
    from .arc2avatar_runner import run_graft
    from .metadata import build_metadata
    from .pipeline_arc2avatar import _progress_cb, data_dirs, finish_sync

    models_dir, hf_home = data_dirs()
    os.environ.setdefault("HF_HOME", str(hf_home))
    out_glb = Path(validated.output_path)
    iters = validated.arc_iters or DEFAULT_ARC_ITERS

    emit_sync(Notifications.PROGRESS,
              {"stage": "start", "step": 0, "total": iters, "profile": "gb10"})
    t0 = time.time()
    try:
        meta = run_graft(
            validated.base_mesh_path, validated.image_path, str(out_glb), iters=iters,
            seam=validated.seam, keep_hair=validated.keep_hair,
            blend_ring=validated.blend_ring, texture_blend=validated.texture_blend,
            workdir=str(out_glb.parent / "_run"), models_dir=str(models_dir),
            progress=_progress_cb(emit_sync, cancel_event),
        )
    except GenerationCancelled:
        raise
    except Exception as exc:
        raise WorkerError(ErrorCodes.GENERATION_FAILED, f"arc2avatar graft failed: {exc}")

    metadata = build_metadata(
        profile="gb10", operator="graft_head", attention_backend="sdpa",
        compute_cap="12.1", native_sm121=True, load_s=0.0, run_s=round(time.time() - t0, 2),
        vertices=meta.get("head_vertices", 0), faces=0, fallbacks=[],
        residency=validated.residency, tf32=True,
        extra={"base_mesh": validated.base_mesh_path, "seam": validated.seam,
               "keep_hair": validated.keep_hair, "blend_ring": validated.blend_ring,
               "align": validated.align, "texture_blend": validated.texture_blend,
               "arc_iters": iters},
    )
    return finish_sync(emit_sync, out_glb, "graft_head", meta.get("head_vertices", 0), 0,
                       metadata, done_extra={"base_mesh": validated.base_mesh_path})


__all__ = ["graft_real", "GPU_SPIKE_MESSAGE"]
