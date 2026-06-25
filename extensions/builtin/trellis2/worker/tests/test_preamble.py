import os

from trellis2_worker.preamble import (
    DINOV3_MIRROR,
    DINOV3_OFFICIAL,
    apply_env,
    attention_backend,
    dinov3_model_id,
    redirect_dinov3_in_cache,
    tf32_enabled,
)


def test_apply_env_sets_flash_attn_default(monkeypatch):
    monkeypatch.delenv("ATTN_BACKEND", raising=False)
    apply_env()
    assert attention_backend() == "flash_attn"


def test_apply_env_respects_existing_override(monkeypatch):
    monkeypatch.setenv("ATTN_BACKEND", "xformers")
    apply_env()
    assert attention_backend() == "xformers"


def test_dinov3_official_by_default(monkeypatch):
    monkeypatch.delenv("TRELLIS2_DINOV3_MIRROR", raising=False)
    assert dinov3_model_id() == DINOV3_OFFICIAL


def test_dinov3_mirror_when_opted_in(monkeypatch):
    monkeypatch.setenv("TRELLIS2_DINOV3_MIRROR", "1")
    assert dinov3_model_id() == DINOV3_MIRROR


def test_redirect_noop_without_mirror(monkeypatch, tmp_path):
    monkeypatch.delenv("TRELLIS2_DINOV3_MIRROR", raising=False)
    assert redirect_dinov3_in_cache(str(tmp_path)) == []


def test_tf32_enabled_by_default(monkeypatch):
    monkeypatch.delenv("TRELLIS2_TF32", raising=False)
    assert tf32_enabled() is True


def test_tf32_disabled_when_zero(monkeypatch):
    monkeypatch.setenv("TRELLIS2_TF32", "0")
    assert tf32_enabled() is False


def test_tf32_disabled_when_false(monkeypatch):
    monkeypatch.setenv("TRELLIS2_TF32", "false")
    assert tf32_enabled() is False


def test_redirect_rewrites_pipeline_json_when_mirror(monkeypatch, tmp_path):
    monkeypatch.setenv("TRELLIS2_DINOV3_MIRROR", "1")
    pj = tmp_path / "models" / "pipeline.json"
    pj.parent.mkdir(parents=True)
    pj.write_text('{"image_cond_model": {"args": {"model_name": "%s"}}}' % DINOV3_OFFICIAL)
    patched = redirect_dinov3_in_cache(str(tmp_path))
    assert len(patched) == 1
    assert DINOV3_MIRROR in pj.read_text()
    assert DINOV3_OFFICIAL not in pj.read_text()
