"""Unit tests for the LTX-2 render-metadata sidecar."""

from __future__ import annotations

import json

from ltx_video_worker import ltx2_metadata as md


def _sample_metadata() -> dict:
    return md.build_render_metadata(
        profile="ltxv2-distilled-q4",
        model_file="ltx-2-19b-distilled_Q4_K_M.gguf",
        geometry={
            "width": 768,
            "height": 512,
            "num_frames": 105,
            "frame_rate": 16,
            "output_fps": 32,
        },
        sampling={"num_inference_steps": 8, "guidance_scale": 1.0},
        seed=1234,
        conditioning={"mode": "i2v", "keyframe_strength": 1.0},
        scene_count=1,
        duration_seconds=6.56,
        vram_peak_gib=14.2,
    )


def test_build_render_metadata_maps_geometry_and_sampling() -> None:
    meta = _sample_metadata()
    assert meta["schema"] == "nexus.video.ltx23.render-metadata.v1"
    assert meta["architecture"] == "ltxv2"
    assert meta["profile"] == "ltxv2-distilled-q4"
    assert meta["geometry"]["base_fps"] == 16
    assert meta["geometry"]["output_fps"] == 32
    assert meta["geometry"]["num_frames"] == 105
    assert meta["sampling"]["guidance_scale"] == 1.0
    assert meta["seed"] == 1234
    assert meta["conditioning"]["mode"] == "i2v"
    assert meta["vram_peak_gib"] == 14.2


def test_build_render_metadata_accepts_absent_vram_peak() -> None:
    meta = md.build_render_metadata(
        profile="ltxv2-multiscene",
        model_file="m.gguf",
        geometry={},
        sampling={},
        seed=0,
        conditioning={},
        scene_count=3,
        duration_seconds=19.7,
        vram_peak_gib=None,
    )
    assert meta["vram_peak_gib"] is None
    assert meta["scene_count"] == 3


def test_write_render_metadata_round_trips_json(tmp_path) -> None:
    out = tmp_path / "render.json"
    meta = _sample_metadata()
    md.write_render_metadata(out, meta)
    assert out.is_file()
    assert not (tmp_path / "render.json.tmp").exists()
    loaded = json.loads(out.read_text(encoding="utf-8"))
    assert loaded == meta
