from pathlib import Path

import pytest

from svi2_video_worker import spandrel_upscale as sp
from svi2_video_worker.pipeline_svi2 import UPSCALE_MODELS, validate_render_params
from svi2_video_worker.spandrel_upscale import (
    DEFAULT_MODEL,
    MODELS,
    _resolve_weights,
    available_models,
    try_spandrel_upscale,
)


def _base_params(**overrides):
    params = {
        "ref_image_path": "anchor.png",
        "prompts": ["a slow pan"],
        "width": 480,
        "height": 832,
    }
    params.update(overrides)
    return params


def test_default_model_is_registered():
    assert DEFAULT_MODEL in MODELS
    assert DEFAULT_MODEL == "drct-l-hq"


def test_available_models_lists_all_transformers():
    models = available_models()
    for name in ("drct-l-hq", "drct-l-real", "hat-l", "swinir-l"):
        assert name in models


def test_rejects_bad_scale(tmp_path: Path):
    src = tmp_path / "in.mp4"
    src.write_bytes(b"x")
    assert try_spandrel_upscale(src, tmp_path / "out.mp4", 5) is False
    assert not (tmp_path / "out.mp4").exists()


def test_returns_false_when_unavailable(tmp_path: Path, monkeypatch):
    monkeypatch.setenv(sp._AUTOSTAGE_ENV, "0")
    monkeypatch.delenv(sp._WEIGHTS_ENV, raising=False)
    src = tmp_path / "in.mp4"
    src.write_bytes(b"not a real video")
    dst = tmp_path / "out.mp4"
    assert try_spandrel_upscale(src, dst, 4, models_dir=tmp_path) is False
    assert not dst.exists()


def test_resolve_weights_unknown_model_returns_none(tmp_path: Path):
    assert _resolve_weights("does-not-exist", tmp_path) is None


def test_resolve_weights_env_override_present(tmp_path: Path, monkeypatch):
    weights = tmp_path / "custom.safetensors"
    weights.write_bytes(b"weights")
    monkeypatch.setenv(sp._WEIGHTS_ENV, str(weights))
    assert _resolve_weights(DEFAULT_MODEL, None) == weights


def test_resolve_weights_uses_staged_copy(tmp_path: Path, monkeypatch):
    monkeypatch.delenv(sp._WEIGHTS_ENV, raising=False)
    monkeypatch.setenv(sp._AUTOSTAGE_ENV, "0")
    staged = tmp_path / "spandrel" / MODELS[DEFAULT_MODEL]["filename"]
    staged.parent.mkdir(parents=True)
    staged.write_bytes(b"weights")
    assert _resolve_weights(DEFAULT_MODEL, tmp_path) == staged


def test_resolve_weights_autostage_disabled_returns_none(tmp_path: Path, monkeypatch):
    monkeypatch.delenv(sp._WEIGHTS_ENV, raising=False)
    monkeypatch.setenv(sp._AUTOSTAGE_ENV, "0")
    assert _resolve_weights(DEFAULT_MODEL, tmp_path) is None


def test_upscale_model_defaults_to_auto():
    validated = validate_render_params(_base_params())
    assert validated["upscale_model"] == "auto"


@pytest.mark.parametrize("model", list(UPSCALE_MODELS))
def test_upscale_model_accepts_known_engines(model):
    validated = validate_render_params(_base_params(upscale_model=model))
    assert validated["upscale_model"] == model


def test_upscale_model_rejects_unknown():
    with pytest.raises(ValueError, match="upscale_model"):
        validate_render_params(_base_params(upscale_model="esrgan-xl"))
