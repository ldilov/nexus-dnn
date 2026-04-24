"""T096 — Python FamilyLoader tests (spec 034 US5)."""

from __future__ import annotations

from pathlib import Path

import pytest

from emotion_tts_worker.families import (
    DEFAULT_FAMILY_ID,
    FamilyDescriptor,
    FamilyLoader,
)


REPO_FAMILIES = (
    Path(__file__).resolve().parent.parent.parent
    / "recipes"
    / "families"
)


def test_load_real_recipes_registers_both_families():
    loader = FamilyLoader.load_from_dir(REPO_FAMILIES)
    ids = {d.family_id for d in loader.descriptors()}
    assert "indextts-2" in ids
    assert "indextts-2-5" in ids
    assert loader.active_family_id == DEFAULT_FAMILY_ID


def test_real_indextts_2_descriptor_round_trips_expected_artifacts():
    loader = FamilyLoader.load_from_dir(REPO_FAMILIES)
    desc = loader.get("indextts-2")
    assert desc is not None
    assert desc.model_family_ref == "IndexTeam/IndexTTS-2"
    assert "zh" in desc.supported_languages
    assert "en" in desc.supported_languages
    # Sanity — matches the Rust-side test (≥14 expected artifacts).
    assert len(desc.expected_artifacts) >= 14
    assert "gpt.pth" in desc.expected_artifacts


def test_wire_list_result_matches_rust_contract_shape():
    loader = FamilyLoader.load_from_dir(REPO_FAMILIES)
    wire = loader.wire_list_result()
    assert set(wire.keys()) == {"active_family", "known_families"}
    assert wire["active_family"] == DEFAULT_FAMILY_ID
    for entry in wire["known_families"]:
        assert set(entry.keys()) == {"family_id", "engine_version", "languages"}
        assert isinstance(entry["languages"], list)


def test_set_active_family_switches_and_rejects_unknown():
    loader = FamilyLoader.load_from_dir(REPO_FAMILIES)
    loader.set_active_family("indextts-2-5")
    assert loader.active_family_id == "indextts-2-5"
    with pytest.raises(KeyError):
        loader.set_active_family("fictional-v3")


def test_contains_and_get():
    loader = FamilyLoader.load_from_dir(REPO_FAMILIES)
    assert loader.contains("indextts-2")
    assert loader.contains("indextts-2-5")
    assert not loader.contains("fictional")
    assert loader.get("indextts-2") is not None
    assert loader.get("fictional") is None


def test_load_from_missing_dir_returns_empty_loader(tmp_path):
    loader = FamilyLoader.load_from_dir(tmp_path / "does_not_exist")
    assert loader.descriptors() == ()


def test_load_from_empty_dir_returns_empty_loader(tmp_path):
    loader = FamilyLoader.load_from_dir(tmp_path)
    assert loader.descriptors() == ()


def test_load_skips_non_yaml_files(tmp_path):
    (tmp_path / "readme.md").write_text("not yaml")
    (tmp_path / "fam.yaml").write_text(
        "family_id: alpha\ndisplay_name: A\nmodel_family_ref: X\nengine_version_constraint: '>=0.1.0'\n"
    )
    loader = FamilyLoader.load_from_dir(tmp_path)
    assert len(loader.descriptors()) == 1
    assert loader.descriptors()[0].family_id == "alpha"


def test_loader_with_adhoc_descriptors():
    descs = [
        FamilyDescriptor(
            family_id="alpha",
            display_name="Alpha",
            model_family_ref="X",
            engine_version_constraint=">=0.1.0",
            supported_languages=("zh",),
        ),
    ]
    loader = FamilyLoader(descs, active_family_id="alpha")
    assert loader.active_family_id == "alpha"
    assert loader.contains("alpha")
    wire = loader.wire_list_result()
    assert wire["active_family"] == "alpha"
    assert len(wire["known_families"]) == 1


def test_active_family_falls_back_when_requested_id_missing():
    descs = [
        FamilyDescriptor(
            family_id="beta",
            display_name="B",
            model_family_ref="x",
            engine_version_constraint=">=0.1.0",
        ),
    ]
    loader = FamilyLoader(descs, active_family_id="not-in-registry")
    assert loader.active_family_id == "beta"
