"""No-GPU fake pipeline for offline E2E + protocol verification (both ops).

Drives the same operator input contract as the real Arc2Avatar/graft pipeline
(validates via the shared params module), emits the same
faceavatar.generate.progress stage/step notifications, then writes a
byte-valid minimal GLB plus metadata of the real shape. ZERO torch, zero
kernels, zero GPU — safe to import + run on Windows/CI.

Byte-deterministic: the fake never reads input image bytes, and graft_head reads
only the base_mesh PATH (echoed into metadata), never its bytes — so the output
GLB is identical regardless of inputs. This makes the rust shim, web UI, params
validation, and storage fully testable offline.
"""
from __future__ import annotations

import threading
from pathlib import Path
from typing import Any, Callable

from .cancel import GenerationCancelled
from .glb import write_minimal_glb
from .metadata import build_metadata
from .params import (
    DEFAULT_ARC_ITERS,
    GenerateHeadParams,
    GraftHeadParams,
    validate_generate_head_params,
    validate_graft_head_params,
)
from .rpc import Methods, Notifications

# generate_head stage chain. (name, stepped?) — the single stepped stage is the
# Arc2Avatar per-image optimisation loop, driven by arc_iters.
GENERATE_STAGES: tuple[tuple[str, bool], ...] = (
    ("preprocess", False),
    ("arcface", False),
    ("flame_fit", False),
    ("arc2avatar", True),
    ("mesh", False),
    ("texture", False),
    ("glb", False),
)

# graft_head stage chain — no Arc2Avatar optimisation loop is re-run for the
# graft scaffold; the (single) stepped stage is the weld iteration.
GRAFT_STAGES: tuple[tuple[str, bool], ...] = (
    ("load_base", False),
    ("arcface", False),
    ("flame_fit", False),
    ("align", False),
    ("cut", False),
    ("weld", True),
    ("blend", False),
    ("glb", False),
)

# Deterministic, small fixed weld-step count for the fake (independent of inputs).
FAKE_WELD_STEPS = 4


def _arc_iters(arc_iters: int | None) -> int:
    return arc_iters if arc_iters is not None else DEFAULT_ARC_ITERS


async def _emit_stage_chain(
    stages: tuple[tuple[str, bool], ...],
    step_counts: dict[str, int],
    total_steps: int,
    emit: Callable[[str, dict[str, Any]], Any],
    cancel_event: threading.Event | None,
) -> None:
    """Emit the start frame then one progress frame per stage (stepped stages emit
    one frame per step). Raises GenerationCancelled if the flag is set."""
    completed = 0
    await emit(
        Notifications.PROGRESS,
        {"stage": "start", "step": 0, "total": total_steps, "profile": "fake"},
    )
    for stage_name, stepped in stages:
        if stepped:
            count = step_counts[stage_name]
            for step_idx in range(count):
                if cancel_event is not None and cancel_event.is_set():
                    raise GenerationCancelled()
                completed += 1
                await emit(
                    Notifications.PROGRESS,
                    {
                        "stage": stage_name,
                        "step": step_idx + 1,
                        "total": count,
                        "overall": round(completed / total_steps, 4),
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
                    "overall": round(completed / total_steps, 4),
                },
            )


async def _finish(
    glb_path: Path,
    vertices: int,
    faces: int,
    metadata: dict[str, Any],
    emit: Callable[[str, dict[str, Any]], Any],
    done_extra: dict[str, Any],
) -> dict[str, Any]:
    glb_bytes = glb_path.stat().st_size
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
        "mesh_glb": str(glb_path),
        "bytes": glb_bytes,
        "mesh": {"vertices": vertices, "faces": faces},
        "metadata_json": metadata,
    }
    done_payload = {"output_path": str(glb_path), "bytes": glb_bytes, "profile": "fake"}
    done_payload.update(done_extra)
    await emit(Notifications.DONE, done_payload)
    return result


async def generate_head_fake_e2e(
    params: dict[str, Any],
    emit: Callable[[str, dict[str, Any]], Any],
    cancel_event: threading.Event | None = None,
) -> dict[str, Any]:
    validated = validate_generate_head_params(params or {})
    output_path = Path(validated.output_path)

    arc_steps = _arc_iters(validated.arc_iters)
    step_counts = {"arc2avatar": arc_steps}
    total_steps = max(arc_steps, 1)

    await _emit_stage_chain(GENERATE_STAGES, step_counts, total_steps, emit, cancel_event)

    glb_path, vertices, faces = write_minimal_glb(output_path)
    metadata = build_metadata(
        profile="fake",
        operator="generate_head",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=vertices,
        faces=faces,
        fallbacks=[],
        residency=validated.residency,
        tf32=False,
        extra={
            "expression": validated.expression,
            "crop": validated.crop,
            "texture": validated.texture,
            "arc_iters": arc_steps,
        },
    )
    return await _finish(glb_path, vertices, faces, metadata, emit, done_extra={})


async def graft_head_fake_e2e(
    params: dict[str, Any],
    emit: Callable[[str, dict[str, Any]], Any],
    cancel_event: threading.Event | None = None,
) -> dict[str, Any]:
    validated = validate_graft_head_params(params or {})
    output_path = Path(validated.output_path)

    step_counts = {"weld": FAKE_WELD_STEPS}
    total_steps = max(FAKE_WELD_STEPS, 1)

    await _emit_stage_chain(GRAFT_STAGES, step_counts, total_steps, emit, cancel_event)

    glb_path, vertices, faces = write_minimal_glb(output_path)
    metadata = build_metadata(
        profile="fake",
        operator="graft_head",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=vertices,
        faces=faces,
        fallbacks=[],
        residency=validated.residency,
        tf32=False,
        extra={
            "base_mesh": validated.base_mesh_path,
            "seam": validated.seam,
            "keep_hair": validated.keep_hair,
            "blend_ring": validated.blend_ring,
            "align": validated.align,
            "texture_blend": validated.texture_blend,
        },
    )
    return await _finish(
        glb_path, vertices, faces, metadata, emit, done_extra={"base_mesh": validated.base_mesh_path}
    )


def register_fake_handlers(worker: Any) -> None:
    generate_cancel_event = threading.Event()
    graft_cancel_event = threading.Event()

    async def _generate_start(params: dict[str, Any]) -> dict[str, Any]:
        generate_cancel_event.clear()

        async def _emit(method: str, payload: dict[str, Any]) -> None:
            await worker.emit_notification(method, payload)

        return await generate_head_fake_e2e(
            params or {}, _emit, cancel_event=generate_cancel_event
        )

    async def _generate_cancel(_params: Any) -> dict[str, Any]:
        generate_cancel_event.set()
        return {"cancelled": True}

    async def _graft_start(params: dict[str, Any]) -> dict[str, Any]:
        graft_cancel_event.clear()

        async def _emit(method: str, payload: dict[str, Any]) -> None:
            await worker.emit_notification(method, payload)

        return await graft_head_fake_e2e(params or {}, _emit, cancel_event=graft_cancel_event)

    async def _graft_cancel(_params: Any) -> dict[str, Any]:
        graft_cancel_event.set()
        return {"cancelled": True}

    worker.register(Methods.GENERATE_HEAD_START, _generate_start)
    worker.register(Methods.GENERATE_HEAD_CANCEL, _generate_cancel)
    worker.register(Methods.GRAFT_HEAD_START, _graft_start)
    worker.register(Methods.GRAFT_HEAD_CANCEL, _graft_cancel)


__all__ = [
    "generate_head_fake_e2e",
    "graft_head_fake_e2e",
    "register_fake_handlers",
    "GENERATE_STAGES",
    "GRAFT_STAGES",
]
