"""Environment probing — detects OS, GPU, and available backend candidates."""
from __future__ import annotations

import platform
import subprocess
from typing import Any

from worker.state import WorkerState


async def handle_probe_environment(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    os_family = platform.system().lower()
    arch = platform.machine().lower()

    nvidia_detected = False
    cuda_version: str | None = None
    gpu_devices: list[dict[str, str]] = []

    try:
        result = subprocess.run(
            ["nvidia-smi", "--query-gpu=name,memory.total,driver_version",
             "--format=csv,noheader"],
            capture_output=True, text=True, timeout=5,
        )
        if result.returncode == 0:
            nvidia_detected = True
            for line in result.stdout.strip().splitlines():
                parts = [p.strip() for p in line.split(",")]
                if len(parts) >= 3:
                    gpu_devices.append({
                        "name": parts[0],
                        "memory": parts[1],
                        "driver": parts[2],
                    })

            full = subprocess.run(
                ["nvidia-smi"], capture_output=True, text=True, timeout=5,
            )
            if full.returncode == 0 and "CUDA Version:" in full.stdout:
                cuda_version = (
                    full.stdout.split("CUDA Version:")[1].split()[0].strip()
                )
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass

    candidates = _build_candidates(nvidia_detected)

    return {
        "os_family": os_family,
        "arch": arch,
        "python_version": platform.python_version(),
        "nvidia_gpu": nvidia_detected,
        "cuda_version": cuda_version,
        "gpu_devices": gpu_devices,
        "candidates": candidates,
    }


def _build_candidates(nvidia_detected: bool) -> list[dict[str, Any]]:
    candidates: list[dict[str, Any]] = [
        {
            "id": "llamacpp-cpu",
            "backend": "llamacpp",
            "name": "Llama.cpp (CPU)",
            "acceleration": "cpu",
            "recommended": not nvidia_detected,
            "available": True,
        },
    ]

    if nvidia_detected:
        candidates.append({
            "id": "llamacpp-cuda12",
            "backend": "llamacpp",
            "name": "Llama.cpp (CUDA 12)",
            "acceleration": "cuda12",
            "recommended": True,
            "available": True,
        })
        candidates.append({
            "id": "tensorrt",
            "backend": "tensorrt_llm",
            "name": "TensorRT-LLM",
            "acceleration": "cuda",
            "recommended": False,
            "available": False,
        })

    return candidates


ENVIRONMENT_METHODS: dict[str, Any] = {
    "llm.probe_environment": handle_probe_environment,
}
