"""Per-render metadata sidecar for the LTX-2 native path.

Spec 048 research follow-up. Writes a JSON sidecar next to every final
MP4 carrying the exact generation parameters — model, sampler, geometry,
conditioning, seed, VRAM peak — so any render is reproducible and
A/B-comparable. A pure builder plus an atomic (temp + rename) writer;
the sidecar is advisory and a write failure must never abort a render.
"""

from __future__ import annotations

import json
import os
import time
from pathlib import Path
from typing import Any

_SCHEMA = "nexus.video.ltx23.render-metadata.v1"


def build_render_metadata(
    *,
    profile: str,
    model_file: str,
    geometry: dict[str, Any],
    sampling: dict[str, Any],
    seed: int,
    conditioning: dict[str, Any],
    scene_count: int,
    duration_seconds: float,
    vram_peak_gib: float | None,
) -> dict[str, Any]:
    """Assemble the render-metadata dict (pure — no I/O)."""
    return {
        "schema": _SCHEMA,
        "created_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "architecture": "ltxv2",
        "profile": profile,
        "model_file": model_file,
        "geometry": {
            "width": geometry.get("width"),
            "height": geometry.get("height"),
            "num_frames": geometry.get("num_frames"),
            "base_fps": geometry.get("frame_rate"),
            "output_fps": geometry.get("output_fps"),
        },
        "sampling": {
            "num_inference_steps": sampling.get("num_inference_steps"),
            "guidance_scale": sampling.get("guidance_scale"),
        },
        "seed": seed,
        "conditioning": conditioning,
        "scene_count": scene_count,
        "duration_seconds": duration_seconds,
        "vram_peak_gib": vram_peak_gib,
    }


def write_render_metadata(json_path: Path, metadata: dict[str, Any]) -> None:
    """Atomically write ``metadata`` to ``json_path`` (temp file + rename)."""
    json_path.parent.mkdir(parents=True, exist_ok=True)
    tmp = json_path.with_suffix(json_path.suffix + ".tmp")
    tmp.write_text(
        json.dumps(metadata, indent=2, sort_keys=True), encoding="utf-8"
    )
    os.replace(tmp, json_path)
