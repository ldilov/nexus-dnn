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


# --- variant-aware resolver: pre-quantised preference + detection ---

PREQUANT_REPO = "OzzyGT/LTX-2.3-Distilled-bnb-nf4"


def test_prequantized_family_only_for_nvfp4() -> None:
    assert pd._prequantized_family_for("rtx50-nvfp4") == PREQUANT_REPO
    assert pd._prequantized_family_for("rtx50-fp8") is None
    assert pd._prequantized_family_for("rtx40-fp8") is None
    assert pd._prequantized_family_for("fake") is None


def _make_tree(root: Path, family: str, quant_cfg: dict | None) -> Path:
    d = root / "models"
    for part in family.split("/"):
        d = d / part
    (d / "transformer").mkdir(parents=True)
    cfg: dict = {"_class_name": "LTX2VideoTransformer3DModel"}
    if quant_cfg is not None:
        cfg["quantization_config"] = quant_cfg
    (d / "transformer" / "config.json").write_text(
        __import__("json").dumps(cfg), encoding="utf-8"
    )
    return d


def test_dir_is_prequantized_true_when_baked_config(tmp_path: Path) -> None:
    d = _make_tree(tmp_path, PREQUANT_REPO, {"_load_in_4bit": True})
    assert pd._dir_is_prequantized(d) is True


def test_dir_is_prequantized_false_without_config(tmp_path: Path) -> None:
    d = _make_tree(tmp_path, DG845_REPO, None)
    assert pd._dir_is_prequantized(d) is False


def test_dir_is_prequantized_false_on_missing_or_garbage(tmp_path: Path) -> None:
    # No transformer/config.json at all.
    assert pd._dir_is_prequantized(tmp_path / "nope") is False
    # Garbage JSON → safe False (fall back to on-the-fly quant).
    bad = tmp_path / "bad" / "transformer"
    bad.mkdir(parents=True)
    (bad / "config.json").write_text("{not json", encoding="utf-8")
    assert pd._dir_is_prequantized(tmp_path / "bad") is False


def test_resolver_prefers_prequantized_for_nvfp4(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_MODEL_DIR", raising=False)
    _make_tree(tmp_path, DG845_REPO, None)
    pq = _make_tree(tmp_path, PREQUANT_REPO, {"_load_in_4bit": True})
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))

    assert pd._resolve_model_dir("rtx50-nvfp4") == pq
    # fp8 profiles must NOT pick up the nf4 pre-quantised tree.
    assert pd._resolve_model_dir("rtx40-fp8").name == "LTX-2.3-Distilled-Diffusers"


def test_resolver_falls_back_to_bf16_when_no_prequantized(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_MODEL_DIR", raising=False)
    dg = _make_tree(tmp_path, DG845_REPO, None)
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    # OzzyGT tree absent → nvfp4 falls through to the bf16 dg845 port.
    assert pd._resolve_model_dir("rtx50-nvfp4") == dg


def test_explicit_override_still_wins_over_prequantized(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    _make_tree(tmp_path, PREQUANT_REPO, {"_load_in_4bit": True})
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    override = tmp_path / "operator-dir"
    override.mkdir()
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_MODEL_DIR", str(override))
    assert pd._resolve_model_dir("rtx50-nvfp4") == override
