from __future__ import annotations

from pathlib import Path

import pytest

from ltx_video_worker import seam


@pytest.fixture(autouse=True)
def _isolate(monkeypatch: pytest.MonkeyPatch):
    seam._MODEL_CACHE.clear()
    for k in (
        "NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE",
        "NEXUS_VIDEO_LTX23_FILM_MODEL_URL",
        "NEXUS_VIDEO_LTX23_FILM_MODEL",
        "NEXUS_VIDEO_LTX23_RIFE_MODEL",
        "NEXUS_HOST_DATA_DIR",
    ):
        monkeypatch.delenv(k, raising=False)
    yield
    seam._MODEL_CACHE.clear()


def _record_download(calls: list[tuple[str, Path]], create: bool):
    def _dl(url: str, dest: Path) -> bool:
        calls.append((url, dest))
        if create:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(b"\x00")
        return create

    return _dl


def test_autostage_disabled_by_default(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    calls: list[tuple[str, Path]] = []
    monkeypatch.setattr(seam, "_download", _record_download(calls, True))
    dest = tmp_path / "film_net_fp32.pt"
    seam._maybe_autostage_film("film", dest, None)
    assert calls == []
    assert not dest.is_file()


def test_autostage_enabled_downloads_when_absent(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "1")
    calls: list[tuple[str, Path]] = []
    monkeypatch.setattr(seam, "_download", _record_download(calls, True))
    dest = tmp_path / "film_net_fp32.pt"
    seam._maybe_autostage_film("film", dest, None)
    assert len(calls) == 1
    assert calls[0][0] == seam._FILM_DEFAULT_URL
    assert dest.is_file()


def test_autostage_url_override(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "yes")
    monkeypatch.setenv(
        "NEXUS_VIDEO_LTX23_FILM_MODEL_URL", "https://example.test/f.pt"
    )
    calls: list[tuple[str, Path]] = []
    monkeypatch.setattr(seam, "_download", _record_download(calls, True))
    seam._maybe_autostage_film("film", tmp_path / "f.pt", None)
    assert calls[0][0] == "https://example.test/f.pt"


def test_autostage_skips_when_present(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "on")
    calls: list[tuple[str, Path]] = []
    monkeypatch.setattr(seam, "_download", _record_download(calls, True))
    dest = tmp_path / "film_net_fp32.pt"
    dest.write_bytes(b"\x01")
    seam._maybe_autostage_film("film", dest, None)
    assert calls == []


def test_autostage_only_film_not_rife(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "1")
    calls: list[tuple[str, Path]] = []
    monkeypatch.setattr(seam, "_download", _record_download(calls, True))
    seam._maybe_autostage_film("rife", tmp_path / "rife.pt", None)
    assert calls == []


def test_autostage_download_failure_is_silent(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "1")
    calls: list[tuple[str, Path]] = []
    monkeypatch.setattr(seam, "_download", _record_download(calls, False))
    dest = tmp_path / "film_net_fp32.pt"
    seam._maybe_autostage_film("film", dest, None)
    assert len(calls) == 1
    assert not dest.is_file()


def test_load_model_locked_attempts_autostage_at_convention_path(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "1")
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    calls: list[tuple[str, Path]] = []
    monkeypatch.setattr(seam, "_download", _record_download(calls, False))
    result = seam._load_model("film", None)
    assert result is None
    assert len(calls) == 1
    expected = tmp_path / "models" / "jkawamoto" / (
        "frame-interpolation-pytorch"
    ) / "film_net_fp32.pt"
    assert calls[0][1] == expected
