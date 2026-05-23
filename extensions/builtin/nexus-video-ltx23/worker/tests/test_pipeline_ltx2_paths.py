from __future__ import annotations

from pathlib import Path

import pytest

from ltx_video_worker import pipeline_ltx2 as pl


def _set_host_data(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))


def _clear_overrides(monkeypatch: pytest.MonkeyPatch) -> None:
    for k in (
        "NEXUS_VIDEO_LTX23_LTX2_GGUF",
        "NEXUS_VIDEO_LTX23_LTX2_BASE_DIR",
        "NEXUS_VIDEO_LTX23_LTX2_UPSAMPLER",
        "NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS",
        "NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD",
        "NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD_FOLDER",
    ):
        monkeypatch.delenv(k, raising=False)


def test_resolve_paths_safetensors_inactive_by_default(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _set_host_data(monkeypatch, tmp_path)
    _clear_overrides(monkeypatch)
    paths = pl._resolve_paths()
    assert paths.safetensors_active is False
    assert paths.transformer_safetensors is None
    assert paths.safetensors_offload_mode == "none"
    assert paths.safetensors_offload_folder is None


def test_resolve_paths_safetensors_active_when_env_set(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _set_host_data(monkeypatch, tmp_path)
    _clear_overrides(monkeypatch)
    sf = tmp_path / "fp8_transformer.safetensors"
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS", str(sf))
    paths = pl._resolve_paths()
    assert paths.safetensors_active is True
    assert paths.transformer_safetensors == sf


def test_resolve_paths_rejects_bogus_offload_mode(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _set_host_data(monkeypatch, tmp_path)
    _clear_overrides(monkeypatch)
    monkeypatch.setenv(
        "NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD", "rocket"
    )
    with pytest.raises(RuntimeError, match="OFFLOAD"):
        pl._resolve_paths()


def test_resolve_paths_disk_offload_requires_folder(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _set_host_data(monkeypatch, tmp_path)
    _clear_overrides(monkeypatch)
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD", "disk")
    with pytest.raises(RuntimeError, match="OFFLOAD_FOLDER"):
        pl._resolve_paths()


def test_resolve_paths_disk_offload_accepts_folder(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _set_host_data(monkeypatch, tmp_path)
    _clear_overrides(monkeypatch)
    folder = tmp_path / "offload"
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD", "disk")
    monkeypatch.setenv(
        "NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS_OFFLOAD_FOLDER", str(folder)
    )
    paths = pl._resolve_paths()
    assert paths.safetensors_offload_mode == "disk"
    assert paths.safetensors_offload_folder == folder


def test_resolve_paths_offload_modes_match_loader(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    from ltx_video_worker.ltx2_safetensors_loader import (
        ALLOWED_OFFLOAD_MODES,
    )

    assert set(pl._ALLOWED_SAFETENSORS_OFFLOAD) == set(ALLOWED_OFFLOAD_MODES)


def test_resolve_paths_raises_when_host_data_unset(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("NEXUS_HOST_DATA_DIR", raising=False)
    _clear_overrides(monkeypatch)
    with pytest.raises(RuntimeError, match="NEXUS_HOST_DATA_DIR"):
        pl._resolve_paths()


def test_resolved_paths_safetensors_active_property() -> None:
    p1 = pl._ResolvedPaths(
        transformer_gguf=Path("g.gguf"),
        base_dir=Path("b"),
        connector=Path("c.safetensors"),
        video_vae=Path("v.safetensors"),
        audio_vae=Path("a.safetensors"),
        gemma_dir=Path("gd"),
        latent_upsampler=Path("u.safetensors"),
    )
    assert p1.safetensors_active is False

    p2 = pl._ResolvedPaths(
        transformer_gguf=Path("g.gguf"),
        base_dir=Path("b"),
        connector=Path("c.safetensors"),
        video_vae=Path("v.safetensors"),
        audio_vae=Path("a.safetensors"),
        gemma_dir=Path("gd"),
        latent_upsampler=Path("u.safetensors"),
        transformer_safetensors=Path("fp8.safetensors"),
    )
    assert p2.safetensors_active is True
