"""The fake backend + the real pipeline module + health probe MUST all import
and behave on a torch-free box. Verified by importing in-process (this CI box
has no torch) and asserting the guarded probes return safe values."""
import importlib


def test_pipeline_fake_imports_without_torch():
    mod = importlib.import_module("trellis2_worker.pipeline_fake")
    assert hasattr(mod, "generate_fake_e2e")


def test_real_pipeline_module_imports_without_torch():
    # All torch/kernel imports are lazy (inside run fns) — the module body must
    # import on a torch-free box so the host can load it for handler wiring.
    mod = importlib.import_module("trellis2_worker.pipeline_trellis2")
    assert hasattr(mod, "register_trellis2_handlers")
    assert hasattr(mod, "generate_real")


def test_glb_writer_has_no_torch_import():
    import sys

    sys.modules.pop("torch", None)
    importlib.import_module("trellis2_worker.glb")
    assert "torch" not in sys.modules


def test_health_probe_torch_free_reports_not_satisfied():
    from trellis2_worker.health import build_health

    h = build_health("gb10-flash")
    assert h["profile_status"] == "NotSatisfied"
    assert h["gpu_available"] is False
    assert h["compute_cap"] == "0.0"
    names = {d["name"] for d in h["native_deps"]}
    assert names == {"cumesh", "flex_gemm", "o_voxel", "nvdiffrast", "flash_attn"}
    for dep in h["native_deps"]:
        assert dep["import_smoke"] is False
        assert dep["kernel_smoke"] is False
        assert dep["wheel_provenance"] == "missing"


def test_health_probe_never_raises():
    from trellis2_worker.health import probe_all_native_deps

    deps = probe_all_native_deps()
    assert len(deps) == 5
    for d in deps:
        assert set(d) >= {
            "name",
            "import_smoke",
            "kernel_smoke",
            "wheel_provenance",
            "fallback_used",
        }
