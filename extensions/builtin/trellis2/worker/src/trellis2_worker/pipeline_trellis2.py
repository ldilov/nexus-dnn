"""Real TRELLIS.2 image-to-3D pipeline (gb10-flash backend).

Applies the P0-COMPLETE recipe exactly (see
docs/research/comfyui-trellis2/2026-06-24-trellis2-P0-COMPLETE.md):
  preprocess → DINOv3 image cond → sparse-structure flow → shape flow →
  decode → mesh.simplify → o_voxel.postprocess.to_glb → export.

ALL torch / kernel / TRELLIS imports are lazy (inside the run functions) so this
module imports cleanly on a torch-free box (Windows/CI). Cancellation is
cooperative: a _CancellingProgressBar passed as the upstream `pbar` raises
GenerationCancelled at coarse stage transitions.
"""
from __future__ import annotations

import os
import threading
import time
from pathlib import Path
from typing import Any, Callable

from . import vram
from .cancel import GenerationCancelled
from .health import compute_cap, gpu_available
from .main import WorkerError
from .metadata import build_metadata
from .params import GenerateParams, NVDIFFRAST_FACE_LIMIT, validate_generate_params
from .preamble import apply_env, attention_backend, dinov3_model_id, redirect_dinov3_in_cache
from .rpc import ErrorCodes, Notifications

TRELLIS_REPO = "microsoft/TRELLIS.2-4B"


def _load_pipeline() -> Any:
    """Lazy-import + load the TRELLIS.2 pipeline onto CUDA. Skips the gated
    RMBG-2.0 model (rembg_model=None) — the operator pre-cleans the input."""
    from trellis2.pipelines import Trellis2ImageTo3DPipeline

    pipeline = Trellis2ImageTo3DPipeline.from_pretrained(TRELLIS_REPO)
    pipeline.rembg_model = None
    pipeline.cuda()
    return pipeline


def _open_image(image_path: str) -> Any:
    from PIL import Image

    return Image.open(image_path)


def _to_glb(mesh: Any, validated: GenerateParams) -> Any:
    import o_voxel

    return o_voxel.postprocess.to_glb(
        vertices=mesh.vertices,
        faces=mesh.faces,
        attr_volume=mesh.attrs,
        coords=mesh.coords,
        attr_layout=mesh.layout,
        voxel_size=mesh.voxel_size,
        aabb=[[-0.5, -0.5, -0.5], [0.5, 0.5, 0.5]],
        decimation_target=validated.simplify_target,
        texture_size=validated.texture_size,
        remesh=True,
        remesh_band=1,
        remesh_project=0,
        verbose=False,
    )


def _mesh_counts(mesh: Any) -> tuple[int, int]:
    try:
        verts = int(getattr(mesh, "vertices").shape[0])
        faces = int(getattr(mesh, "faces").shape[0])
        return verts, faces
    except Exception:
        return 0, 0


def _resolve_under_workspace(path: str) -> Path:
    """Resolve to an absolute path. Defense-in-depth: when TRELLIS2_WORKSPACE_DIR
    is set, assert the resolved path is under it (the rust shim is the primary
    guard). Raises GENERATION_FAILED with a generic message — never echoes path."""
    resolved = Path(path).resolve()
    workspace = os.environ.get("TRELLIS2_WORKSPACE_DIR")
    if workspace:
        root = Path(workspace).resolve()
        if not resolved.is_relative_to(root):
            raise WorkerError(ErrorCodes.GENERATION_FAILED, "path outside workspace")
    return resolved


class _CancellingProgressBar:
    """tqdm-style stand-in passed as upstream `pbar`. Upstream calls `.update(n)`
    at coarse stage transitions; we check the cancel flag there and emit a
    coarse progress notification. Cancel latency is coarse (a handful of checks
    across the ~210s render) — a pipeline-architecture limit, not a worker bug.
    """

    def __init__(
        self,
        callback: Callable[[str, int, int], None],
        cancel_event: threading.Event,
    ) -> None:
        self._cb = callback
        self._cancel = cancel_event
        self._step = 0

    def update(self, n: int = 1) -> None:
        if self._cancel.is_set():
            raise GenerationCancelled()
        self._step += n
        self._cb("stage", self._step, 0)

    def close(self) -> None:
        pass


def generate_real(
    params: dict[str, Any],
    emit_sync: Callable[[str, dict[str, Any]], None],
    cancel_event: threading.Event,
) -> dict[str, Any]:
    """Synchronous (runs under asyncio.to_thread). emit_sync is the worker's
    notify_from_thread bound to a method name."""
    apply_env()
    validated = validate_generate_params(params or {})

    output_path = _resolve_under_workspace(validated.output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if not gpu_available():
        raise WorkerError(ErrorCodes.GPU_NOT_SUPPORTED, "CUDA device not available")

    image_path = _resolve_under_workspace(validated.image_path)
    if not image_path.is_file():
        raise WorkerError(ErrorCodes.GENERATION_FAILED, "input image not found")

    redirect_dinov3_in_cache()
    fallbacks: list[str] = []

    emit_sync(Notifications.PROGRESS, {"stage": "load", "step": 0, "total": 0})
    load_t0 = time.time()
    try:
        pipeline = _load_pipeline()
    except (FileNotFoundError, OSError) as exc:
        raise WorkerError(ErrorCodes.MODEL_MISSING, f"model missing: {exc}")
    except Exception as exc:
        raise WorkerError(ErrorCodes.GENERATION_FAILED, f"pipeline load failed: {exc}")
    load_s = time.time() - load_t0

    image = _open_image(str(image_path))

    def _stage_cb(stage: str) -> None:
        if cancel_event.is_set():
            raise GenerationCancelled()
        emit_sync(Notifications.PROGRESS, {"stage": stage, "step": 0, "total": 0})

    pipeline._nexus_stage_cb = _stage_cb
    run_t0 = time.time()
    try:
        # upstream run() has no pbar; steps go via sampler params. Cancel is
        # coarse (checked between worker stages, not inside the sampler loop).
        seed_kwarg = {"seed": validated.seed} if validated.seed is not None else {}
        outputs = pipeline.run(
            image,
            preprocess_image=False,
            pipeline_type=validated.pipeline_type,
            max_num_tokens=validated.max_num_tokens,
            sparse_structure_sampler_params=validated.stage_sampler_params("sparse"),
            shape_slat_sampler_params=validated.stage_sampler_params("shape"),
            tex_slat_sampler_params=validated.stage_sampler_params("texture"),
            **seed_kwarg,
        )
        mesh = outputs[0]
        mesh.simplify(NVDIFFRAST_FACE_LIMIT)
        emit_sync(Notifications.PROGRESS, {"stage": "glb", "step": 0, "total": 0})
        glb = _to_glb(mesh, validated)
        glb.export(str(output_path), extension_webp=True)
        from .glb import patch_glb_metallic

        patch_glb_metallic(output_path, validated.metallic)
        vertices, faces = _mesh_counts(mesh)
    except GenerationCancelled:
        raise
    except WorkerError:
        raise
    except Exception as exc:
        raise WorkerError(ErrorCodes.GENERATION_FAILED, f"generation failed: {exc}")
    run_s = time.time() - run_t0

    glb_bytes = output_path.stat().st_size if output_path.exists() else 0
    cap = compute_cap()

    metadata = build_metadata(
        profile="gb10-flash",
        attention_backend=attention_backend(),
        compute_cap=cap,
        native_sm121=cap == "12.1",
        load_s=load_s,
        run_s=run_s,
        vertices=vertices,
        faces=faces,
        fallbacks=fallbacks,
        dinov3_model=dinov3_model_id(),
    )

    emit_sync(
        Notifications.ARTIFACT_CREATED,
        {
            "role": "mesh.glb",
            "output_path": str(output_path),
            "bytes": glb_bytes,
            "mime_type": "model/gltf-binary",
        },
    )
    emit_sync(
        Notifications.MEMORY_STATS,
        {
            "peak_vram_bytes": vram.peak_allocated(),
            "free_vram_bytes": vram.probe_free_vram(),
            "device": "cuda",
        },
    )
    return {
        "status": "ok",
        "profile": "gb10-flash",
        "output_path": str(output_path),
        "bytes": glb_bytes,
        "mesh": {"vertices": vertices, "faces": faces},
        "metadata_json": metadata,
    }


def register_trellis2_handlers(worker: Any) -> None:
    cancel_event = threading.Event()

    async def _generate_start(params: dict[str, Any]) -> dict[str, Any]:
        import asyncio

        cancel_event.clear()

        def _emit_sync(method: str, payload: dict[str, Any]) -> None:
            worker.notify_from_thread(method, payload)

        try:
            result = await asyncio.to_thread(
                generate_real, params or {}, _emit_sync, cancel_event
            )
        except GenerationCancelled:
            raise WorkerError(ErrorCodes.CANCELLED, "generation cancelled")
        await worker.emit_notification(
            Notifications.DONE,
            {
                "output_path": result["output_path"],
                "bytes": result["bytes"],
                "profile": "gb10-flash",
            },
        )
        return result

    async def _generate_cancel(_params: Any) -> dict[str, Any]:
        cancel_event.set()
        return {"cancelled": True}

    from .health import build_health

    worker.health_fn = lambda: build_health(worker.profile)
    worker.register("trellis2.generate.start", _generate_start)
    worker.register("trellis2.generate.cancel", _generate_cancel)


__all__ = ["generate_real", "register_trellis2_handlers"]
