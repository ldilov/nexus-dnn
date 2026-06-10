from pathlib import Path

from svi2_video_worker.pipeline_svi2 import resolve_models_dir


def test_explicit_wins(monkeypatch):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", "/host/data")
    assert resolve_models_dir("/custom/models") == Path("/custom/models")


def test_env_models_dir_override(monkeypatch):
    monkeypatch.delenv("NEXUS_HOST_DATA_DIR", raising=False)
    monkeypatch.setenv("SVI2_MODELS_DIR", "/svi2/models")
    assert resolve_models_dir() == Path("/svi2/models")


def test_default_resolves_under_host_data_dir(monkeypatch):
    monkeypatch.delenv("SVI2_MODELS_DIR", raising=False)
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", "/host/data")
    expected = Path("/host/data") / "extensions" / "nexus.video.svi2-pro" / "models"
    assert resolve_models_dir() == expected


def test_no_hardcoded_drive_path_fallback(monkeypatch):
    monkeypatch.delenv("SVI2_MODELS_DIR", raising=False)
    monkeypatch.delenv("NEXUS_HOST_DATA_DIR", raising=False)
    out = resolve_models_dir()
    assert out == Path("models")
    assert "svi2_models" not in str(out)
