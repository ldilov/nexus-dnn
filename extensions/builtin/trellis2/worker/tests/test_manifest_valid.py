"""Cross-check that the extension manifest agrees with the worker this lane owns:
the declared worker_entrypoint path exists, the runtime ids match the profiles
the entrypoint dispatches, and the pkgs step's extras exist in pyproject.
"""
from pathlib import Path

import tomllib
import yaml

# extensions/builtin/trellis2/
EXT_ROOT = Path(__file__).resolve().parents[2]
WORKER_ROOT = EXT_ROOT / "worker"


def _manifest() -> dict:
    return yaml.safe_load((EXT_ROOT / "manifest.yaml").read_text())


def test_manifest_declares_trellis2_runtimes():
    m = _manifest()
    assert m["extension"]["id"] == "nexus.3d.trellis2"
    ids = {r["runtime_id"] for r in m["backend_runtimes"]}
    assert "nexus.3d.trellis2.gb10-flash" in ids
    assert "nexus.3d.trellis2.fake" in ids


def test_worker_entrypoint_path_exists():
    m = _manifest()
    for rt in m["backend_runtimes"]:
        rel = rt["worker_entrypoint"]
        assert (EXT_ROOT / rel).exists(), rel
        assert rel == "worker/src/trellis2_worker/__main__.py"


def test_runtime_suffix_matches_dispatched_profiles():
    # __main__.cli reads NEXUS_3D_TRELLIS2_RUNTIME and dispatches fake/gb10-flash;
    # the manifest runtime_id suffixes must be exactly those two profile names.
    m = _manifest()
    suffixes = {r["runtime_id"].rsplit(".", 1)[-1] for r in m["backend_runtimes"]}
    assert suffixes == {"fake", "gb10-flash"}


def test_pkgs_extras_exist_in_pyproject():
    m = _manifest()
    pkgs = next(s for s in m["dependencies"]["steps"] if s["id"] == "pkgs")
    declared = set(pkgs["spec"]["extras"])
    pyproj = tomllib.loads((WORKER_ROOT / "pyproject.toml").read_text())
    available = set(pyproj["project"]["optional-dependencies"])
    assert declared <= available, declared - available


def test_pyproject_pins_transformers_and_requires_py312():
    pyproj = tomllib.loads((WORKER_ROOT / "pyproject.toml").read_text())
    assert pyproj["project"]["requires-python"] == ">=3.12,<3.13"
    trellis = pyproj["project"]["optional-dependencies"]["trellis"]
    assert "transformers==4.56.0" in trellis
