"""Real Arc2Avatar identity-head pipeline (gb10 backend).

Drives the vendored Arc2Avatar optimization via :mod:`arc2avatar_runner` (subprocess
+ splat→mesh GLB) and emits the same faceavatar.generate.* notification shapes as the
fake backend, so the rust shim + web are backend-agnostic.

Heavy deps (numpy/trimesh/scipy via the runner, and torch inside the subprocess) stay
lazy — imported inside the run functions — so this module imports cleanly on a
torch-free box for handler wiring + health probing.
"""
from __future__ import annotations

import asyncio
import os
import threading
import time
from pathlib import Path
from typing import Any, Callable

from .cancel import GenerationCancelled
from .graft import graft_real
from .main import WorkerError
from .params import DEFAULT_ARC_ITERS, validate_generate_head_params
from .rpc import ErrorCodes, Methods, Notifications

EmitSync = Callable[[str, dict[str, Any]], None]


def data_dirs() -> tuple[Path, Path]:
    """(models_dir, hf_home) — persistent, SHARED across jobs so the ~GB weight set
    and SD cache download once. Honors FACEAVATAR_MODELS_DIR (set by the host lease
    factory), else derives from FACEAVATAR_DATA_DIR / NEXUS_DATA_DIR."""
    models_env = os.environ.get("FACEAVATAR_MODELS_DIR")
    if models_env:
        models_dir = Path(models_env)
        return models_dir, models_dir.parent / "hf_cache"
    root = Path(
        os.environ.get("FACEAVATAR_DATA_DIR")
        or os.environ.get("NEXUS_DATA_DIR", "/data")
    ) / "extensions" / "nexus.3d.faceavatar"
    return root / "models", root / "hf_cache"


def _progress_cb(emit_sync: EmitSync, cancel_event: threading.Event) -> Callable[[str, float], None]:
    def _cb(stage: str, frac: float) -> None:
        if cancel_event.is_set():
            raise GenerationCancelled()
        emit_sync(
            Notifications.PROGRESS,
            {"stage": stage, "step": 0, "total": 0, "overall": round(float(frac), 4)},
        )
    return _cb


def finish_sync(
    emit_sync: EmitSync, glb_path: Path, operator: str, vertices: int, faces: int,
    metadata: dict[str, Any], done_extra: dict[str, Any],
) -> dict[str, Any]:
    """Emit ARTIFACT_CREATED + MEMORY_STATS + DONE and return the RPC result — the
    same shapes the fake backend emits (the rust dispatcher keys off these)."""
    glb_bytes = glb_path.stat().st_size
    emit_sync(Notifications.ARTIFACT_CREATED, {
        "role": "mesh.glb", "output_path": str(glb_path), "bytes": glb_bytes,
        "mime_type": "model/gltf-binary",
    })
    emit_sync(Notifications.MEMORY_STATS, {"device": "cuda"})
    done_payload = {"output_path": str(glb_path), "bytes": glb_bytes, "profile": "gb10"}
    done_payload.update(done_extra)
    emit_sync(Notifications.DONE, done_payload)
    return {
        "status": "ok", "profile": "gb10", "output_path": str(glb_path),
        "mesh_glb": str(glb_path), "bytes": glb_bytes,
        "mesh": {"vertices": vertices, "faces": faces}, "metadata_json": metadata,
    }


def generate_head_real(
    params: dict[str, Any], emit_sync: EmitSync, cancel_event: threading.Event,
) -> dict[str, Any]:
    """One photo → identity head GLB via the vendored Arc2Avatar optimization."""
    validated = validate_generate_head_params(params or {})
    from .arc2avatar_runner import run_generate
    from .metadata import build_metadata

    models_dir, hf_home = data_dirs()
    os.environ.setdefault("HF_HOME", str(hf_home))
    out_glb = Path(validated.output_path)
    iters = validated.arc_iters or DEFAULT_ARC_ITERS

    emit_sync(Notifications.PROGRESS,
              {"stage": "start", "step": 0, "total": iters, "profile": "gb10"})
    t0 = time.time()
    try:
        meta = run_generate(
            validated.image_path, str(out_glb), iters=iters,
            workdir=str(out_glb.parent / "_run"), models_dir=str(models_dir),
            progress=_progress_cb(emit_sync, cancel_event),
        )
    except GenerationCancelled:
        raise
    except Exception as exc:
        raise WorkerError(ErrorCodes.GENERATION_FAILED, f"arc2avatar generate failed: {exc}")

    metadata = build_metadata(
        profile="gb10", operator="generate_head", attention_backend="sdpa",
        compute_cap="12.1", native_sm121=True, load_s=0.0, run_s=round(time.time() - t0, 2),
        vertices=meta["vertices"], faces=meta["faces"], fallbacks=[],
        residency=validated.residency, tf32=True,
        extra={"expression": validated.expression, "crop": validated.crop,
               "texture": validated.texture, "arc_iters": iters,
               "gaussians": meta.get("gaussians")},
    )
    return finish_sync(emit_sync, out_glb, "generate_head", meta["vertices"], meta["faces"],
                       metadata, done_extra={})


def register_arc2avatar_handlers(worker: Any) -> None:
    """Wire the .start/.cancel surface to the real pipeline (identical to the fake's
    method names + notification shapes)."""
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


__all__ = ["generate_head_real", "register_arc2avatar_handlers"]
