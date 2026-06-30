from pathlib import Path

import yaml

BACKENDS = Path(__file__).resolve().parents[2] / "backends"


def _load(profile: str) -> dict:
    return yaml.safe_load((BACKENDS / profile / "versions.yaml").read_text(encoding="utf-8"))


def test_fake_versions_runtime_id_and_empty_artifacts():
    doc = _load("fake")
    assert doc["backend"]["runtime_id"] == "nexus.3d.faceavatar.fake"
    assert doc["backend"]["default_version"] == "0.1.0"
    assert doc["versions"][0]["status"] == "stable"
    assert doc["versions"][0]["artifacts"] == []


def test_gb10_versions_runtime_id_and_identity_artifacts():
    doc = _load("gb10")
    assert doc["backend"]["runtime_id"] == "nexus.3d.faceavatar.gb10"
    version = doc["versions"][0]
    assert version["status"] == "experimental"
    roles = {a["role"] for a in version["artifacts"]}
    assert roles == {"flame.model", "face_recognition", "arc2avatar.weights"}
    for art in version["artifacts"]:
        assert art["source"]["kind"] == "huggingface"
        assert "repo" in art["source"]
        assert set(art) >= {"id", "role", "source", "size_bytes", "sha256"}


def test_both_backends_share_default_version():
    assert _load("fake")["backend"]["default_version"] == _load("gb10")["backend"]["default_version"]
