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
from .params import (
    GenerateParams,
    NVDIFFRAST_FACE_LIMIT,
    ProjectParams,
    RefineParams,
    validate_generate_params,
    validate_project_params,
    validate_refine_params,
)
from .preamble import (
    apply_env,
    attention_backend,
    dinov3_model_id,
    redirect_dinov3_in_cache,
    tf32_enabled,
)
from .rpc import ErrorCodes, Methods, Notifications

TRELLIS_REPO = "microsoft/TRELLIS.2-4B"


def _apply_perf_backends() -> bool:
    """Enable TF32 matmul + cuDNN + high fp32 matmul precision on Blackwell when
    TRELLIS2_TF32 is on (default). Process-global torch flags, so set per render
    from the env toggle. Returns the effective on/off for telemetry."""
    import torch

    on = tf32_enabled()
    torch.backends.cuda.matmul.allow_tf32 = on
    torch.backends.cudnn.allow_tf32 = on
    torch.set_float32_matmul_precision("high" if on else "highest")
    return on


def _load_pipeline(low_vram: bool, remove_background: bool) -> Any:
    """Lazy-import + load the TRELLIS.2 pipeline onto CUDA.

    remove_background=True wires the non-gated BiRefNet rembg model so a raw photo
    is auto-cut (subject composited on transparent, then cropped). This is what
    stops TRELLIS reconstructing the input's ground/shadow as a flat platform mesh
    under the model. remove_background=False keeps rembg_model=None — the operator
    pre-cleans the input (e.g. an RGBA cutout), the original MVP-0 behaviour.

    low_vram=False keeps all weights GPU-resident (no per-stage CPU offload) — the
    right mode on GB10's 128GB unified memory. low_vram=True restores the
    block-swap path for tight-VRAM hosts. rembg_model is set BEFORE .cuda() so the
    pipeline's .to() moves it to the device (balanced) or leaves it for the
    per-stage offload preprocess_image() applies (low_vram)."""
    from trellis2.pipelines import Trellis2ImageTo3DPipeline

    pipeline = Trellis2ImageTo3DPipeline.from_pretrained(TRELLIS_REPO)
    pipeline.low_vram = low_vram
    if remove_background:
        from trellis2.pipelines.rembg.BiRefNet import BiRefNet

        pipeline.rembg_model = BiRefNet()
    else:
        pipeline.rembg_model = None
    pipeline.cuda()
    return pipeline


def _open_image(image_path: str) -> Any:
    from PIL import Image

    return Image.open(image_path)


def _to_glb(mesh: Any, validated: GenerateParams | RefineParams) -> Any:
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

    tf32_on = _apply_perf_backends()
    low_vram = validated.residency == "low_vram"

    emit_sync(Notifications.PROGRESS, {"stage": "load", "step": 0, "total": 0})
    load_t0 = time.time()
    try:
        pipeline = _load_pipeline(low_vram, validated.remove_background)
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
            preprocess_image=validated.remove_background,
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
        residency=validated.residency,
        tf32=tf32_on,
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


def refine_real(
    params: dict[str, Any],
    emit_sync: Callable[[str, dict[str, Any]], None],
    cancel_event: threading.Event,
) -> dict[str, Any]:
    """Synchronous (runs under asyncio.to_thread). Geometry-refine pass: re-encode
    a finished mesh to SLat and re-sample shape + texture at high resolution,
    conditioned on the source image (plus an optional face-crop view). Mirrors
    generate_real's load → run → glb → metadata path. emit_sync is the worker's
    notify_from_thread bound to a method name."""
    apply_env()
    validated = validate_refine_params(params or {})

    output_path = _resolve_under_workspace(validated.output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if not gpu_available():
        raise WorkerError(ErrorCodes.GPU_NOT_SUPPORTED, "CUDA device not available")

    mesh_path = _resolve_under_workspace(validated.mesh_path)
    if not mesh_path.is_file():
        raise WorkerError(ErrorCodes.GENERATION_FAILED, "input mesh not found")

    image_path = _resolve_under_workspace(validated.image_path)
    if not image_path.is_file():
        raise WorkerError(ErrorCodes.GENERATION_FAILED, "input image not found")

    face_path: Path | None = None
    if validated.face_image_path is not None:
        face_path = _resolve_under_workspace(validated.face_image_path)
        if not face_path.is_file():
            raise WorkerError(ErrorCodes.GENERATION_FAILED, "face image not found")

    redirect_dinov3_in_cache()
    fallbacks: list[str] = []

    tf32_on = _apply_perf_backends()
    low_vram = validated.residency == "low_vram"

    emit_sync(Notifications.PROGRESS, {"stage": "load", "step": 0, "total": 0})
    load_t0 = time.time()
    try:
        pipeline = _load_pipeline(low_vram, validated.remove_background)
    except (FileNotFoundError, OSError) as exc:
        raise WorkerError(ErrorCodes.MODEL_MISSING, f"model missing: {exc}")
    except Exception as exc:
        raise WorkerError(ErrorCodes.GENERATION_FAILED, f"pipeline load failed: {exc}")
    load_s = time.time() - load_t0

    import trimesh

    in_mesh = trimesh.load(str(mesh_path), force="mesh")
    image = _open_image(str(image_path))
    cond_images: Any = image
    if face_path is not None:
        cond_images = [image, _open_image(str(face_path))]

    def _stage_cb(stage: str) -> None:
        if cancel_event.is_set():
            raise GenerationCancelled()
        emit_sync(Notifications.PROGRESS, {"stage": stage, "step": 0, "total": 0})

    pipeline._nexus_stage_cb = _stage_cb
    run_t0 = time.time()
    try:
        seed_kwarg = {"seed": validated.seed} if validated.seed is not None else {}
        outputs = pipeline.refine_mesh(
            in_mesh,
            cond_images,
            resolution=validated.resolution,
            max_views=validated.max_views,
            max_num_tokens=validated.max_num_tokens,
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
        raise WorkerError(ErrorCodes.GENERATION_FAILED, f"refine failed: {exc}")
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
        residency=validated.residency,
        tf32=tf32_on,
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


def project_real(
    params: dict[str, Any],
    emit_sync: Callable[[str, dict[str, Any]], None],
    cancel_event: threading.Event,
) -> dict[str, Any]:
    """Synchronous (runs under asyncio.to_thread). Texture-projection pass:
    project ONE real source photo onto a finished mesh's existing UVs, replacing
    the model's hallucinated baseColor on front-facing surfaces. Pure nvdiffrast
    (needs CUDA) — NO TRELLIS model load, so it's fast (seconds). The input mesh
    is loaded preserving UV + PBR material; the projector composites over the
    existing texture. emit_sync is notify_from_thread bound to a method name."""
    apply_env()
    validated = validate_project_params(params or {})

    output_path = _resolve_under_workspace(validated.output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    if not gpu_available():
        raise WorkerError(ErrorCodes.GPU_NOT_SUPPORTED, "CUDA device not available")

    mesh_path = _resolve_under_workspace(validated.mesh_path)
    if not mesh_path.is_file():
        raise WorkerError(ErrorCodes.GENERATION_FAILED, "input mesh not found")

    image_path = _resolve_under_workspace(validated.image_path)
    if not image_path.is_file():
        raise WorkerError(ErrorCodes.GENERATION_FAILED, "input image not found")

    fallbacks: list[str] = []
    tf32_on = _apply_perf_backends()

    if cancel_event.is_set():
        raise GenerationCancelled()

    import trimesh

    emit_sync(Notifications.PROGRESS, {"stage": "load", "step": 0, "total": 0})
    load_t0 = time.time()
    loaded = trimesh.load(str(mesh_path), process=False)
    if isinstance(loaded, trimesh.Trimesh):
        in_mesh = loaded
    else:
        geometries = list(loaded.geometry.values())
        if not geometries:
            raise WorkerError(ErrorCodes.GENERATION_FAILED, "mesh has no geometry")
        in_mesh = geometries[0]
    image = _open_image(str(image_path))
    load_s = time.time() - load_t0

    run_t0 = time.time()
    try:
        if cancel_event.is_set():
            raise GenerationCancelled()
        emit_sync(Notifications.PROGRESS, {"stage": "project", "step": 0, "total": 0})
        from trellis2.pipelines.texture_projection import texture_mesh_with_multiview

        textured, _, _ = texture_mesh_with_multiview(
            in_mesh,
            [image],
            [validated.azimuth],
            [validated.elevation],
            texture_size=validated.texture_size,
            fill_holes=True,
            blend_texture=True,
        )
        emit_sync(Notifications.PROGRESS, {"stage": "export", "step": 0, "total": 0})
        textured.export(str(output_path))
        vertices, faces = _mesh_counts(textured)
    except GenerationCancelled:
        raise
    except WorkerError:
        raise
    except Exception as exc:
        raise WorkerError(ErrorCodes.GENERATION_FAILED, f"projection failed: {exc}")
    run_s = time.time() - run_t0

    glb_bytes = output_path.stat().st_size if output_path.exists() else 0
    cap = compute_cap()

    metadata = build_metadata(
        profile="projection",
        attention_backend=attention_backend(),
        compute_cap=cap,
        native_sm121=cap == "12.1",
        load_s=load_s,
        run_s=run_s,
        vertices=vertices,
        faces=faces,
        fallbacks=fallbacks,
        dinov3_model=dinov3_model_id(),
        residency=validated.residency,
        tf32=tf32_on,
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
        "profile": "projection",
        "output_path": str(output_path),
        "bytes": glb_bytes,
        "mesh": {"vertices": vertices, "faces": faces},
        "metadata_json": metadata,
    }


def register_trellis2_handlers(worker: Any) -> None:
    cancel_event = threading.Event()
    refine_cancel_event = threading.Event()
    project_cancel_event = threading.Event()

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

    async def _refine_start(params: dict[str, Any]) -> dict[str, Any]:
        import asyncio

        refine_cancel_event.clear()

        def _emit_sync(method: str, payload: dict[str, Any]) -> None:
            worker.notify_from_thread(method, payload)

        try:
            result = await asyncio.to_thread(
                refine_real, params or {}, _emit_sync, refine_cancel_event
            )
        except GenerationCancelled:
            raise WorkerError(ErrorCodes.CANCELLED, "refine cancelled")
        await worker.emit_notification(
            Notifications.DONE,
            {
                "output_path": result["output_path"],
                "bytes": result["bytes"],
                "profile": "gb10-flash",
            },
        )
        return result

    async def _refine_cancel(_params: Any) -> dict[str, Any]:
        refine_cancel_event.set()
        return {"cancelled": True}

    async def _project_start(params: dict[str, Any]) -> dict[str, Any]:
        import asyncio

        project_cancel_event.clear()

        def _emit_sync(method: str, payload: dict[str, Any]) -> None:
            worker.notify_from_thread(method, payload)

        try:
            result = await asyncio.to_thread(
                project_real, params or {}, _emit_sync, project_cancel_event
            )
        except GenerationCancelled:
            raise WorkerError(ErrorCodes.CANCELLED, "projection cancelled")
        await worker.emit_notification(
            Notifications.DONE,
            {
                "output_path": result["output_path"],
                "bytes": result["bytes"],
                "profile": "projection",
            },
        )
        return result

    async def _project_cancel(_params: Any) -> dict[str, Any]:
        project_cancel_event.set()
        return {"cancelled": True}

    from .health import build_health

    worker.health_fn = lambda: build_health(worker.profile)
    worker.register(Methods.GENERATE_START, _generate_start)
    worker.register(Methods.GENERATE_CANCEL, _generate_cancel)
    worker.register(Methods.REFINE_START, _refine_start)
    worker.register(Methods.REFINE_CANCEL, _refine_cancel)
    worker.register(Methods.PROJECT_START, _project_start)
    worker.register(Methods.PROJECT_CANCEL, _project_cancel)


__all__ = [
    "generate_real",
    "refine_real",
    "project_real",
    "register_trellis2_handlers",
]
