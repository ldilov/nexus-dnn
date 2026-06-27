"""No-GPU fake image-to-3D pipeline for offline E2E + protocol verification.

Drives the same operator input contract as the real pipeline (validates via the
shared `params` module), emits the same `trellis2.generate.progress` stage/step
notifications, then writes a byte-valid minimal GLB plus metadata of the real
shape. ZERO torch, zero kernels, zero GPU — safe to import + run on Windows/CI.

Stages mirror the P0-COMPLETE chain so the UI progress + DAG views verify
offline: preprocess → dinov3 → sparse → shape → decode → mesh → glb.
"""
from __future__ import annotations

import threading
from pathlib import Path
from typing import Any, Callable

from .cancel import GenerationCancelled
from .glb import write_minimal_glb
from .metadata import build_metadata
from .params import (
    GenerateParams,
    ProjectParams,
    RefineParams,
    validate_generate_params,
    validate_project_params,
    validate_refine_params,
)
from .rpc import Methods, Notifications

# Stage descriptors mirror the P0-COMPLETE chain. (name, stepped?)
STAGES: tuple[tuple[str, bool], ...] = (
    ("preprocess", False),
    ("dinov3", False),
    ("sparse", True),
    ("shape", True),
    ("decode", False),
    ("mesh", False),
    ("glb", False),
)

# Stage descriptors for the geometry-refine pass (no sparse-structure stage).
REFINE_STAGES: tuple[tuple[str, bool], ...] = (
    ("encode", False),
    ("shape", True),
    ("texture", True),
    ("decode", False),
    ("mesh", False),
    ("glb", False),
)

# Stage descriptors for the texture-projection pass (no sampling, no steps).
PROJECT_STAGES: tuple[tuple[str, bool], ...] = (
    ("load", False),
    ("project", False),
    ("export", False),
)


def _stepped_total(validated: GenerateParams) -> int:
    return validated.sparse_steps + validated.shape_steps


async def generate_fake_e2e(
    params: dict[str, Any],
    emit: Callable[[str, dict[str, Any]], Any],
    cancel_event: threading.Event | None = None,
) -> dict[str, Any]:
    validated = validate_generate_params(params or {})
    output_path = Path(validated.output_path)

    total_steps = max(_stepped_total(validated), 1)
    completed_steps = 0

    await emit(
        Notifications.PROGRESS,
        {
            "stage": "start",
            "step": 0,
            "total": total_steps,
            "profile": "fake",
        },
    )

    for stage_name, stepped in STAGES:
        if stepped:
            step_count = (
                validated.sparse_steps if stage_name == "sparse" else validated.shape_steps
            )
            for step_idx in range(step_count):
                if cancel_event is not None and cancel_event.is_set():
                    raise GenerationCancelled()
                completed_steps += 1
                await emit(
                    Notifications.PROGRESS,
                    {
                        "stage": stage_name,
                        "step": step_idx + 1,
                        "total": step_count,
                        "overall": round(completed_steps / total_steps, 4),
                    },
                )
        else:
            if cancel_event is not None and cancel_event.is_set():
                raise GenerationCancelled()
            await emit(
                Notifications.PROGRESS,
                {
                    "stage": stage_name,
                    "step": 0,
                    "total": 0,
                    "overall": round(completed_steps / total_steps, 4),
                },
            )

    glb_path, vertices, faces = write_minimal_glb(output_path)
    glb_bytes = glb_path.stat().st_size

    metadata = build_metadata(
        profile="fake",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=vertices,
        faces=faces,
        fallbacks=[],
        dinov3_model="fake",
        residency=validated.residency,
        tf32=False,
    )

    await emit(
        Notifications.ARTIFACT_CREATED,
        {
            "role": "mesh.glb",
            "output_path": str(glb_path),
            "bytes": glb_bytes,
            "mime_type": "model/gltf-binary",
        },
    )

    await emit(
        Notifications.MEMORY_STATS,
        {"peak_vram_bytes": 0, "free_vram_bytes": 0, "device": "cpu"},
    )

    result = {
        "status": "ok",
        "profile": "fake",
        "output_path": str(glb_path),
        "bytes": glb_bytes,
        "mesh": {"vertices": vertices, "faces": faces},
        "metadata_json": metadata,
    }

    await emit(
        Notifications.DONE,
        {
            "output_path": str(glb_path),
            "bytes": glb_bytes,
            "profile": "fake",
        },
    )
    return result


def _refine_stepped_total(validated: RefineParams) -> int:
    return validated.shape_steps + validated.texture_steps


async def refine_fake_e2e(
    params: dict[str, Any],
    emit: Callable[[str, dict[str, Any]], Any],
    cancel_event: threading.Event | None = None,
) -> dict[str, Any]:
    validated = validate_refine_params(params or {})
    output_path = Path(validated.output_path)

    total_steps = max(_refine_stepped_total(validated), 1)
    completed_steps = 0

    await emit(
        Notifications.PROGRESS,
        {
            "stage": "start",
            "step": 0,
            "total": total_steps,
            "profile": "fake",
        },
    )

    for stage_name, stepped in REFINE_STAGES:
        if stepped:
            step_count = (
                validated.shape_steps if stage_name == "shape" else validated.texture_steps
            )
            for step_idx in range(step_count):
                if cancel_event is not None and cancel_event.is_set():
                    raise GenerationCancelled()
                completed_steps += 1
                await emit(
                    Notifications.PROGRESS,
                    {
                        "stage": stage_name,
                        "step": step_idx + 1,
                        "total": step_count,
                        "overall": round(completed_steps / total_steps, 4),
                    },
                )
        else:
            if cancel_event is not None and cancel_event.is_set():
                raise GenerationCancelled()
            await emit(
                Notifications.PROGRESS,
                {
                    "stage": stage_name,
                    "step": 0,
                    "total": 0,
                    "overall": round(completed_steps / total_steps, 4),
                },
            )

    glb_path, vertices, faces = write_minimal_glb(output_path)
    glb_bytes = glb_path.stat().st_size

    metadata = build_metadata(
        profile="fake",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=vertices,
        faces=faces,
        fallbacks=[],
        dinov3_model="fake",
        residency=validated.residency,
        tf32=False,
    )

    await emit(
        Notifications.ARTIFACT_CREATED,
        {
            "role": "mesh.glb",
            "output_path": str(glb_path),
            "bytes": glb_bytes,
            "mime_type": "model/gltf-binary",
        },
    )

    await emit(
        Notifications.MEMORY_STATS,
        {"peak_vram_bytes": 0, "free_vram_bytes": 0, "device": "cpu"},
    )

    result = {
        "status": "ok",
        "profile": "fake",
        "output_path": str(glb_path),
        "bytes": glb_bytes,
        "mesh": {"vertices": vertices, "faces": faces},
        "metadata_json": metadata,
    }

    await emit(
        Notifications.DONE,
        {
            "output_path": str(glb_path),
            "bytes": glb_bytes,
            "profile": "fake",
        },
    )
    return result


async def project_fake_e2e(
    params: dict[str, Any],
    emit: Callable[[str, dict[str, Any]], Any],
    cancel_event: threading.Event | None = None,
) -> dict[str, Any]:
    validated = validate_project_params(params or {})
    output_path = Path(validated.output_path)

    await emit(
        Notifications.PROGRESS,
        {"stage": "start", "step": 0, "total": 0, "profile": "fake"},
    )

    for stage_name, _stepped in PROJECT_STAGES:
        if cancel_event is not None and cancel_event.is_set():
            raise GenerationCancelled()
        await emit(
            Notifications.PROGRESS,
            {"stage": stage_name, "step": 0, "total": 0, "overall": 0.0},
        )

    glb_path, vertices, faces = write_minimal_glb(output_path)
    glb_bytes = glb_path.stat().st_size

    metadata = build_metadata(
        profile="fake",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=vertices,
        faces=faces,
        fallbacks=[],
        dinov3_model="fake",
        residency=validated.residency,
        tf32=False,
    )

    await emit(
        Notifications.ARTIFACT_CREATED,
        {
            "role": "mesh.glb",
            "output_path": str(glb_path),
            "bytes": glb_bytes,
            "mime_type": "model/gltf-binary",
        },
    )

    await emit(
        Notifications.MEMORY_STATS,
        {"peak_vram_bytes": 0, "free_vram_bytes": 0, "device": "cpu"},
    )

    result = {
        "status": "ok",
        "profile": "fake",
        "output_path": str(glb_path),
        "bytes": glb_bytes,
        "mesh": {"vertices": vertices, "faces": faces},
        "metadata_json": metadata,
    }

    await emit(
        Notifications.DONE,
        {"output_path": str(glb_path), "bytes": glb_bytes, "profile": "fake"},
    )
    return result


def register_fake_handlers(worker: Any) -> None:
    cancel_event = threading.Event()
    refine_cancel_event = threading.Event()
    project_cancel_event = threading.Event()

    async def _generate_start(params: dict[str, Any]) -> dict[str, Any]:
        cancel_event.clear()

        async def _emit(method: str, payload: dict[str, Any]) -> None:
            await worker.emit_notification(method, payload)

        return await generate_fake_e2e(params or {}, _emit, cancel_event=cancel_event)

    async def _generate_cancel(_params: Any) -> dict[str, Any]:
        cancel_event.set()
        return {"cancelled": True}

    async def _refine_start(params: dict[str, Any]) -> dict[str, Any]:
        refine_cancel_event.clear()

        async def _emit(method: str, payload: dict[str, Any]) -> None:
            await worker.emit_notification(method, payload)

        return await refine_fake_e2e(params or {}, _emit, cancel_event=refine_cancel_event)

    async def _refine_cancel(_params: Any) -> dict[str, Any]:
        refine_cancel_event.set()
        return {"cancelled": True}

    async def _project_start(params: dict[str, Any]) -> dict[str, Any]:
        project_cancel_event.clear()

        async def _emit(method: str, payload: dict[str, Any]) -> None:
            await worker.emit_notification(method, payload)

        return await project_fake_e2e(
            params or {}, _emit, cancel_event=project_cancel_event
        )

    async def _project_cancel(_params: Any) -> dict[str, Any]:
        project_cancel_event.set()
        return {"cancelled": True}

    worker.register(Methods.GENERATE_START, _generate_start)
    worker.register(Methods.GENERATE_CANCEL, _generate_cancel)
    worker.register(Methods.REFINE_START, _refine_start)
    worker.register(Methods.REFINE_CANCEL, _refine_cancel)
    worker.register(Methods.PROJECT_START, _project_start)
    worker.register(Methods.PROJECT_CANCEL, _project_cancel)


__all__ = [
    "generate_fake_e2e",
    "refine_fake_e2e",
    "project_fake_e2e",
    "register_fake_handlers",
    "STAGES",
    "REFINE_STAGES",
    "PROJECT_STAGES",
]
