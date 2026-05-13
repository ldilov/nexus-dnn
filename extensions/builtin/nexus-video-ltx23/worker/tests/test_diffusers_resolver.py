"""Tests for the pipeline_diffusers model-dir resolver.

These tests do not require torch — they exercise the resolver's path
logic + the profile→family-id mapping. The actual diffusers/torch
import path is guarded inside _ensure_pipeline_loaded which only fires
on render_start.
"""

from __future__ import annotations

from pathlib import Path

import pytest

from ltx_video_worker import pipeline_diffusers as pd


DG845_REPO = "dg845/LTX-2.3-Distilled-Diffusers"


def test_expected_family_id_per_profile() -> None:
    # All real-runtime profiles point at the community diffusers-format
    # port — Lightricks' single-file repos won't load via from_pretrained.
    # See verification/p0-t001-results.md.
    assert pd._expected_family_id("rtx40-fp8") == DG845_REPO
    assert pd._expected_family_id("rtx50-fp8") == DG845_REPO
    assert pd._expected_family_id("rtx50-nvfp4") == DG845_REPO
    assert pd._expected_family_id("fake") is None
    assert pd._expected_family_id("bogus") is None


def test_resolver_returns_none_when_env_unset(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_MODEL_DIR", raising=False)
    monkeypatch.delenv("NEXUS_HOST_DATA_DIR", raising=False)
    assert pd._resolve_model_dir("rtx40-fp8") is None


def test_resolver_honours_explicit_override(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    explicit = tmp_path / "custom-weights"
    explicit.mkdir()
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_MODEL_DIR", str(explicit))
    assert pd._resolve_model_dir("rtx40-fp8") == explicit


def test_resolver_returns_none_when_override_path_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setenv(
        "NEXUS_VIDEO_LTX23_MODEL_DIR", str(tmp_path / "does-not-exist")
    )
    assert pd._resolve_model_dir("rtx40-fp8") is None


def test_resolver_walks_host_data_dir_layout(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_MODEL_DIR", raising=False)
    host_data_dir = tmp_path
    (host_data_dir / "models" / "dg845" / "LTX-2.3-Distilled-Diffusers").mkdir(
        parents=True
    )
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(host_data_dir))

    resolved = pd._resolve_model_dir("rtx40-fp8")
    assert resolved is not None
    assert resolved.exists()
    assert resolved.name == "LTX-2.3-Distilled-Diffusers"


def test_resolver_returns_same_repo_across_profiles(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    """All three real-runtime profiles share the same diffusers-format
    snapshot today — single repo per the dg845 port; hardware-specific
    quant variants are a future rung."""
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_MODEL_DIR", raising=False)
    (tmp_path / "models" / "dg845" / "LTX-2.3-Distilled-Diffusers").mkdir(
        parents=True
    )
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))

    a = pd._resolve_model_dir("rtx40-fp8")
    b = pd._resolve_model_dir("rtx50-fp8")
    c = pd._resolve_model_dir("rtx50-nvfp4")
    assert a == b == c
    assert a is not None and a.name == "LTX-2.3-Distilled-Diffusers"


def test_resolver_returns_none_for_fake_profile(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    # Fake profile has no family_id → resolver short-circuits to None.
    assert pd._resolve_model_dir("fake") is None
