"""Per-native-dep runtime-health probe (gb10-flash backend).

Records `{name, import_smoke, kernel_smoke, wheel_provenance, fallback_used}` for
each native dependency (cumesh / flex_gemm / o_voxel / nvdiffrast / flash_attn).
A failed dep ⇒ profile reported as NotSatisfied — never a crash (P0.5 contract).

Every probe is exception-guarded so this module imports + runs with no torch.
"""
from __future__ import annotations

from typing import Any

NATIVE_DEPS = ("cumesh", "flex_gemm", "o_voxel", "nvdiffrast", "flash_attn")


def _wheel_provenance(module: Any) -> str:
    path = getattr(module, "__file__", None)
    return path or "unknown"


def _import_smoke(name: str) -> tuple[bool, Any, str]:
    import importlib

    import_name = "nvdiffrast.torch" if name == "nvdiffrast" else name
    try:
        module = importlib.import_module(import_name)
        return True, module, ""
    except Exception as exc:
        return False, None, f"{type(exc).__name__}: {exc}"


def _kernel_smoke(name: str, module: Any) -> bool:
    """Light callable/attribute presence check — proves the compiled extension
    loaded, not a full forward pass (that happens during a real run)."""
    if module is None:
        return False
    try:
        if name == "o_voxel":
            return hasattr(module, "postprocess")
        if name == "nvdiffrast":
            import nvdiffrast.torch as nvt

            return hasattr(nvt, "RasterizeCudaContext") or hasattr(nvt, "rasterize")
        if name == "flash_attn":
            return hasattr(module, "flash_attn_func") or hasattr(module, "__version__")
        return any(not attr.startswith("__") for attr in dir(module))
    except Exception:
        return False


def probe_native_dep(name: str) -> dict[str, Any]:
    imported, module, err = _import_smoke(name)
    kernel_ok = _kernel_smoke(name, module) if imported else False
    record: dict[str, Any] = {
        "name": name,
        "import_smoke": imported,
        "kernel_smoke": kernel_ok,
        "wheel_provenance": _wheel_provenance(module) if imported else "missing",
        "fallback_used": False,
    }
    if err:
        record["error"] = err
    return record


def probe_all_native_deps() -> list[dict[str, Any]]:
    return [probe_native_dep(name) for name in NATIVE_DEPS]


def compute_cap() -> str:
    try:
        import torch

        if torch.cuda.is_available():
            major, minor = torch.cuda.get_device_capability()
            return f"{major}.{minor}"
    except Exception:
        pass
    return "0.0"


def gpu_available() -> bool:
    try:
        import torch

        return bool(torch.cuda.is_available())
    except Exception:
        return False


def build_health(profile: str) -> dict[str, Any]:
    """The detail block merged into the trellis2.runtime.health response. A dep
    with a failed import/kernel smoke ⇒ profile_status NotSatisfied."""
    deps = probe_all_native_deps()
    all_ok = all(d["import_smoke"] and d["kernel_smoke"] for d in deps)
    cap = compute_cap()
    return {
        "profile_status": "Satisfied" if all_ok else "NotSatisfied",
        "compute_cap": cap,
        "native_sm121": cap == "12.1",
        "gpu_available": gpu_available(),
        "attention_backend": _attention_backend(),
        "native_deps": deps,
    }


def _attention_backend() -> str:
    from .preamble import attention_backend

    return attention_backend()
