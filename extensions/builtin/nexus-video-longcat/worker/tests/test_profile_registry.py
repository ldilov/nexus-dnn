from __future__ import annotations

from pathlib import Path

import pytest
import yaml

from longcat_video_worker.profile_registry import (
    ModelProfile,
    ProfileRegistry,
    ProfileRegistryError,
    load_registry,
)


def _write(path: Path, payload: dict) -> Path:
    path.write_text(yaml.safe_dump(payload), encoding="utf-8")
    return path


def _baseline(profile_id: str = "p1", safety: str = "mainstream") -> dict:
    return {
        "id": profile_id,
        "model": "Qwen/Qwen3-8B-Instruct-GGUF",
        "quant": "Q4_K_M",
        "safety_tier": safety,
        "purpose": "test",
        "context_size": 8192,
        "max_output_tokens": 2048,
        "temperature": 0.2,
        "required_tags": ["text-completion"],
        "preferred_tags": ["json-schema"],
    }


def test_loads_shipped_registry():
    registry = load_registry()
    assert registry.schema_version == 2  # Spec 051 D-B bump
    default = registry.safe_default()
    assert default.safety_tier == "mainstream"
    assert default.id == "longcat-planner-default"
    assert "text-completion" in default.required_tags
    # Default profile keeps n_gpu_layers null → auto-fit per Spec 051 D-A
    assert default.n_gpu_layers is None
    assert default.context_size == 8192


def test_dolphin_entry_is_locked_behind_safety_tier():
    registry = load_registry()
    dolphin = registry.resolve("longcat-planner-uncensored-lab")
    assert dolphin.is_uncensored()
    assert dolphin.safety_tier == "requires_local_policy"
    assert dolphin.requires_acknowledgement is True


def test_default_profile_rejects_uncensored_default(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "dolphin",
        "profiles": [_baseline("dolphin", safety="requires_local_policy")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="only mainstream"):
        load_registry(yaml_path)


def test_default_profile_rejects_developer_preview_default(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "dev",
        "profiles": [_baseline("dev", safety="developer_preview")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="only mainstream"):
        load_registry(yaml_path)


def test_filter_by_safety_excludes_uncensored_by_default(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "safe",
        "profiles": [
            _baseline("safe", "mainstream"),
            _baseline("lab", "requires_local_policy"),
        ],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    reg = load_registry(yaml_path)
    safe_only = reg.filter_by_safety(allow_uncensored=False)
    assert [p.id for p in safe_only] == ["safe"]
    all_profiles = reg.filter_by_safety(allow_uncensored=True)
    assert sorted(p.id for p in all_profiles) == ["lab", "safe"]


def test_unknown_safety_tier_rejected(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "p",
        "profiles": [{**_baseline("p"), "safety_tier": "definitely-safe"}],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="invalid safety_tier"):
        load_registry(yaml_path)


def test_default_profile_must_exist(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "missing",
        "profiles": [_baseline("present")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="default_profile"):
        load_registry(yaml_path)


def test_duplicate_profile_id_rejected(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "dup",
        "profiles": [_baseline("dup"), _baseline("dup")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="duplicate"):
        load_registry(yaml_path)


def test_resolve_unknown_id_raises(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "p",
        "profiles": [_baseline("p")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    reg = load_registry(yaml_path)
    with pytest.raises(ProfileRegistryError, match="unknown"):
        reg.resolve("ghost")


def test_v1_schema_still_loads(tmp_path):
    payload = {
        "schema_version": 1,
        "default_profile": "safe",
        "profiles": [_baseline("safe")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    reg = load_registry(yaml_path)
    assert reg.schema_version == 1
    # n_gpu_layers defaults to None when absent from v1 entry
    assert reg.safe_default().n_gpu_layers is None
    assert reg.safe_default().schema_version == 1


def test_v2_schema_with_n_gpu_layers(tmp_path):
    payload = {
        "schema_version": 2,
        "default_profile": "p",
        "profiles": [{**_baseline("p"), "n_gpu_layers": 33}],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    reg = load_registry(yaml_path)
    assert reg.schema_version == 2
    profile = reg.safe_default()
    assert profile.n_gpu_layers == 33
    assert profile.schema_version == 2


def test_v2_schema_n_gpu_layers_absent_defaults_to_none(tmp_path):
    payload = {
        "schema_version": 2,
        "default_profile": "p",
        "profiles": [_baseline("p")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    reg = load_registry(yaml_path)
    assert reg.safe_default().n_gpu_layers is None


def test_v3_schema_rejected(tmp_path):
    payload = {
        "schema_version": 3,
        "default_profile": "p",
        "profiles": [_baseline("p")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="schema_version=3"):
        load_registry(yaml_path)


def test_install_id_shaped_profile_id_rejected(tmp_path):
    payload = {
        "schema_version": 2,
        "default_profile": "01HAAAAAAAAAAAAAAAAAAAAAAA",
        "profiles": [_baseline("01HAAAAAAAAAAAAAAAAAAAAAAA")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="install id"):
        load_registry(yaml_path)


def test_install_id_prefix_rejected(tmp_path):
    payload = {
        "schema_version": 2,
        "default_profile": "inst_foo",
        "profiles": [_baseline("inst_foo")],
    }
    yaml_path = _write(tmp_path / "p.yaml", payload)
    with pytest.raises(ProfileRegistryError, match="install id"):
        load_registry(yaml_path)


def test_operator_yamls_parse():
    operators_dir = (
        Path(__file__).resolve().parents[2] / "operators"
    )
    yamls = sorted(operators_dir.glob("*.yaml"))
    assert len(yamls) >= 3, f"expected at least 3 operator yamls under {operators_dir}, got {yamls}"
    for path in yamls:
        with path.open(encoding="utf-8") as fh:
            data = yaml.safe_load(fh)
        assert data["schema_version"] == 1
        assert data["extension"] == "nexus.video.longcat"
        assert data["id"]
        assert data["method"].startswith("longcat.video.")
