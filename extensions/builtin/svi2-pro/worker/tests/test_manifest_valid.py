from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]


def test_manifest_declares_svi2_runtimes():
    m = yaml.safe_load((ROOT / "manifest.yaml").read_text())
    assert m["extension"]["id"] == "nexus.video.svi2-pro"
    ids = {r["runtime_id"] for r in m["backend_runtimes"]}
    assert "nexus.video.svi2-pro.rtx50-fp8" in ids
    assert "nexus.video.svi2-pro.fake" in ids
    caps = set(m["capabilities"])
    assert {"gpu.compute", "huggingface.install", "model.registry.read"} <= caps


def test_fake_versions_empty_artifacts():
    v = yaml.safe_load((ROOT / "backends/fake/versions.yaml").read_text())
    assert v["versions"][0]["artifacts"] == []
