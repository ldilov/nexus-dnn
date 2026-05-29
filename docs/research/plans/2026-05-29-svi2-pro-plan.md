# svi2-pro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new builtin extension `nexus.video.svi2-pro` — a headless Python worker that generates long, cross-clip-consistent image-to-video via Stable Video Infinity 2.0 Pro (two SVI LoRAs on Wan2.2-I2V-A14B dual-expert MoE) on a 16 GB RTX 5070 Ti.

**Architecture:** Fresh hand-rolled stdio JSON-RPC worker mirroring `nexus-video-longcat`'s contract. No DiffSynth runtime dep — vendor only the Wan2.2 `WanModel` (DiT) + flow-match scheduler + attention/embeddings from the `svi_wan22` zip. We own the fp8 loader (Kijai `_KJ` scale_weight + `torch._scaled_mm`), runtime-additive LoRA, expert router (boundary 0.875), and the SVI cross-clip error-recycling loop. One fp8 expert resident on GPU at a time; both held in 64 GB CPU RAM.

**Tech Stack:** Python ≥3.11,<3.13; torch 2.12 + cu132 (Blackwell); flash_attn 2.8.3 (mjun0812 v0.9.26 prebuilt cu132 wheel, win_amd64) + SDPA fallback; safetensors; huggingface_hub; ffmpeg; pytest + pytest-asyncio.

**Reference sources (read-only):**
- Zip (extracted): `C:\Users\lazar\AppData\Local\Temp\svi-research\Stable-Video-Infinity-svi_wan22\`
  - `diffsynth/pipelines/wan_video_svi_pro.py` — SVI Pro pipeline (algorithm reference)
  - `diffsynth/models/` — `WanModel` DiT + attention + embeddings (vendor source)
  - `inference_svi_2.0_pro.py` — clip-chaining driver
- In-repo conventions: `extensions/builtin/nexus-video-longcat/` (manifest, worker, rpc.py, main.py, __main__.py, pipeline_fake.py, longcat_safetensors_loader.py, installer.py, backends/rtx50-fp8/versions.yaml)
- Discovery notes: `C:\Users\lazar\AppData\Local\Temp\svi-research\findings\{A,B,C,D}_*.md`
- Design spec: `docs/research/2026-05-29-svi2-pro-design.md`

**⚠ Plan-review flags (confirm before/while executing):**
1. **flash_attn vs SDPA:** wheel exists for win_amd64 cu132 torch2.12, but FA2 actually *running* on sm_120 is verified only by the GPU smoke. The vendored attention MUST keep a working SDPA fallback so the worker functions even if FA2 errors at runtime.
2. **Vendored WanModel scope (Phase 2):** the exact set of `diffsynth/models` files to copy is determined by Task 2.1's import-trace — it is an investigation task, not a guess.
3. **GPU verification** is operator-run (`smoke-rtx50-fp8.{sh,ps1}`); offline tests gate "done".

**Conventions every task follows:** all paths relative to repo root `extensions/builtin/svi2-pro/`. Worker package import root is `svi2_video_worker` (under `worker/src/`). Run tests from `worker/` with `uv run pytest` (or `pytest` in the worker venv). Commit after each task. No AI-attribution trailers; commit as configured.

---

## Phase 0 — Extension scaffold (offline, no GPU)

### Task 0.1: Worker package skeleton + version

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/__init__.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_version.py`

- [ ] **Step 1: Write the failing test**

```python
# worker/tests/test_version.py
from svi2_video_worker import __version__


def test_version_is_semver():
    parts = __version__.split(".")
    assert len(parts) == 3
    assert all(p.isdigit() for p in parts)
```

- [ ] **Step 2: Run, expect fail**

Run: `cd extensions/builtin/svi2-pro/worker && python -m pytest tests/test_version.py -v`
Expected: FAIL — `ModuleNotFoundError: svi2_video_worker`.

- [ ] **Step 3: Create the package**

```python
# worker/src/svi2_video_worker/__init__.py
"""SVI 2.0 Pro video render worker (nexus.video.svi2-pro)."""

__version__ = "0.1.0"
```

- [ ] **Step 4: Run, expect pass** (after `pyproject.toml` from Task 0.2 sets `pythonpath = ["src"]`; until then run with `PYTHONPATH=src`).

Run: `cd extensions/builtin/svi2-pro/worker && PYTHONPATH=src python -m pytest tests/test_version.py -v`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add extensions/builtin/svi2-pro/worker/src/svi2_video_worker/__init__.py extensions/builtin/svi2-pro/worker/tests/test_version.py
git commit -m "feat(svi2-pro): worker package skeleton"
```

### Task 0.2: `pyproject.toml` (deps + Blackwell torch + flash_attn wheel)

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/pyproject.toml`

- [ ] **Step 1: Write the file** (mirrors LongCat; base deps thin, heavy ML in `diffusers` extra)

```toml
[project]
name = "nexus-video-svi2-pro-worker"
version = "0.1.0"
description = "Stable Video Infinity 2.0 Pro i2v render worker for nexus.video.svi2-pro. Stdio JSON-RPC. Kijai fp8 Wan2.2-A14B dual-expert + SVI LoRA. fake (no-GPU) mode for CI."
requires-python = ">=3.11,<3.13"
readme = "README.md"
license = { text = "GPL-3.0-or-later" }

dependencies = [
  "pydantic>=2.8",
  "pyyaml>=6.0",
  "ffmpeg-python>=0.2",
  "pillow>=10.0",
  "numpy>=1.26,<3.0",
  "huggingface_hub>=0.26",
]

[project.optional-dependencies]
diffusers = [
  "torch>=2.12",
  "torchvision>=0.27",
  "safetensors>=0.4",
  "einops>=0.8",
  "sentencepiece>=0.2",
  "protobuf>=4",
  "transformers>=4.41",
  "ftfy>=6.2",
  "regex>=2024.0",
  "av>=12.0",
  "imageio>=2.37",
  "imageio-ffmpeg>=0.6",
]
# flash_attn 2.8.3 prebuilt for Blackwell (cu132 + torch2.12). Windows wheel
# from mjun0812 v0.9.26; Linux from PyPI. Worker falls back to SDPA if import fails.
flash = [
  "flash-attn @ https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.9.26/flash_attn-2.8.3+cu132torch2.12-cp312-cp312-win_amd64.whl ; sys_platform == 'win32' and python_version == '3.12'",
  "flash-attn @ https://github.com/mjun0812/flash-attention-prebuild-wheels/releases/download/v0.9.26/flash_attn-2.8.3+cu132torch2.12-cp311-cp311-win_amd64.whl ; sys_platform == 'win32' and python_version == '3.11'",
  "flash-attn>=2.8 ; sys_platform == 'linux'",
]
test = [
  "pytest>=8.0",
  "pytest-asyncio>=0.23",
  "safetensors>=0.4",
  "jsonschema>=4.21,<5",
]

[project.scripts]
nexus-video-svi2-pro-worker = "svi2_video_worker.__main__:cli"
nexus-video-svi2-pro-install = "svi2_video_worker.headless_install:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["src/svi2_video_worker"]

[tool.hatch.metadata]
allow-direct-references = true

[tool.uv.sources]
torch = [{ index = "pytorch-cu132" }]
torchvision = [{ index = "pytorch-cu132" }]

[[tool.uv.index]]
name = "pytorch-cu132"
url = "https://download.pytorch.org/whl/cu132"
explicit = true

[tool.pytest.ini_options]
testpaths = ["tests"]
asyncio_mode = "auto"
pythonpath = ["src"]
markers = [
    "smoke: end-to-end smoke tests (may require GPU or external services)",
]
```

- [ ] **Step 2: Verify base install resolves** (no GPU extras)

Run: `cd extensions/builtin/svi2-pro/worker && uv sync --extra test`
Expected: resolves + installs base + test deps without error.

- [ ] **Step 3: Re-run Task 0.1 test via configured pythonpath**

Run: `cd extensions/builtin/svi2-pro/worker && uv run pytest tests/test_version.py -v`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add extensions/builtin/svi2-pro/worker/pyproject.toml
git commit -m "feat(svi2-pro): worker pyproject — Blackwell torch cu132 + flash_attn 2.8.3 wheel"
```

### Task 0.3: RPC framing (`rpc.py`)

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/rpc.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_rpc.py`

- [ ] **Step 1: Write the failing test**

```python
# worker/tests/test_rpc.py
import json
from svi2_video_worker.rpc import (
    Methods, Notifications, ErrorCodes,
    parse_request, ok_response, error_response, notification,
)


def test_parse_request_requires_jsonrpc_2():
    req = parse_request('{"jsonrpc":"2.0","id":1,"method":"handshake","params":{}}')
    assert req.id == 1 and req.method == "handshake" and req.params == {}


def test_parse_request_rejects_bad_version():
    try:
        parse_request('{"id":1,"method":"x"}')
        assert False, "expected ValueError"
    except ValueError:
        pass


def test_ok_and_error_and_notification_framing():
    assert json.loads(ok_response(7, {"a": 1})) == {"jsonrpc": "2.0", "id": 7, "result": {"a": 1}}
    err = json.loads(error_response(7, ErrorCodes.INVALID_PARAMS, "bad"))
    assert err["error"]["code"] == -32602
    note = json.loads(notification(Notifications.PROGRESS, {"pct": 0.5}))
    assert note["method"] == Notifications.PROGRESS and "id" not in note


def test_method_and_notification_names():
    assert Methods.RENDER_START == "svi2.video.render.start"
    assert Notifications.CLIP_COMPLETED == "svi2.video.clip.completed"
```

- [ ] **Step 2: Run, expect fail** — `ModuleNotFoundError: svi2_video_worker.rpc`.

- [ ] **Step 3: Implement** (port LongCat `rpc.py` framing; svi2 method/notification names)

```python
# worker/src/svi2_video_worker/rpc.py
"""JSON-RPC 2.0 framing + error codes for the svi2-pro video worker."""
from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


class Methods:
    HEALTH = "svi2.runtime.health"
    RENDER_START = "svi2.video.render.start"
    RENDER_CANCEL = "svi2.video.render.cancel"
    INSTALL_START = "svi2.video.install.start"
    INSTALL_STATUS = "svi2.video.install.status"


class Notifications:
    PROGRESS = "svi2.video.progress"
    CLIP_STARTED = "svi2.video.clip.started"
    CLIP_COMPLETED = "svi2.video.clip.completed"
    CLIP_STEP = "svi2.video.clip.step"
    ARTIFACT_CREATED = "svi2.video.artifact.created"
    DONE = "svi2.video.done"
    ERROR = "svi2.video.error"
    MEMORY_STATS = "runtime.memory_stats"


class ErrorCodes:
    PARSE_ERROR = -32700
    INVALID_REQUEST = -32600
    METHOD_NOT_FOUND = -32601
    INVALID_PARAMS = -32602
    INTERNAL_ERROR = -32603

    DRIVER_TOO_OLD = -32100
    TORCH_CUDA_MISMATCH = -32101
    GPU_NOT_SUPPORTED = -32102
    MODEL_MISSING = -32103
    MODEL_LOAD_FAILED = -32104
    VRAM_BUDGET_EXCEEDED = -32105
    RENDER_FAILED = -32106
    RENDER_CANCELLED = -32107


@dataclass
class JsonRpcRequest:
    id: str | int | None
    method: str
    params: dict[str, Any] | list[Any] | None


def parse_request(line: str) -> JsonRpcRequest:
    obj = json.loads(line)
    if obj.get("jsonrpc") != "2.0":
        raise ValueError("missing jsonrpc=2.0")
    return JsonRpcRequest(id=obj.get("id"), method=obj["method"], params=obj.get("params"))


def ok_response(request_id: Any, result: Any) -> str:
    return json.dumps({"jsonrpc": "2.0", "id": request_id, "result": result}) + "\n"


def error_response(request_id: Any, code: int, message: str, data: Any = None) -> str:
    payload: dict[str, Any] = {"code": code, "message": message}
    if data is not None:
        payload["data"] = data
    return json.dumps({"jsonrpc": "2.0", "id": request_id, "error": payload}) + "\n"


def notification(method: str, params: dict[str, Any]) -> str:
    return json.dumps({"jsonrpc": "2.0", "method": method, "params": params}) + "\n"
```

- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit**

```bash
git add extensions/builtin/svi2-pro/worker/src/svi2_video_worker/rpc.py extensions/builtin/svi2-pro/worker/tests/test_rpc.py
git commit -m "feat(svi2-pro): JSON-RPC framing + method/notification names"
```

### Task 0.4: Telemetry (`telemetry.py`)

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/telemetry.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_telemetry.py`

- [ ] **Step 1: Failing test**

```python
# worker/tests/test_telemetry.py
import json
from svi2_video_worker.telemetry import WorkerLogger


def test_logger_writes_structured_json_to_stderr(capsys):
    log = WorkerLogger()
    log.info("worker.start", profile="fake", version="0.1.0")
    err = capsys.readouterr().err.strip().splitlines()[-1]
    rec = json.loads(err)
    assert rec["level"] == "info" and rec["event"] == "worker.start"
    assert rec["profile"] == "fake" and rec["target"] == "nexus.video.svi2-pro"
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement**

```python
# worker/src/svi2_video_worker/telemetry.py
"""Structured stderr logging — never writes to the JSON-RPC stdout wire."""
from __future__ import annotations

import json
import sys
from typing import Any

_TARGET = "nexus.video.svi2-pro"


class WorkerLogger:
    def _emit(self, level: str, event: str, **fields: Any) -> None:
        rec = {"level": level, "target": _TARGET, "event": event, **fields}
        print(json.dumps(rec), file=sys.stderr, flush=True)

    def info(self, event: str, **f: Any) -> None: self._emit("info", event, **f)
    def warn(self, event: str, **f: Any) -> None: self._emit("warn", event, **f)
    def error(self, event: str, **f: Any) -> None: self._emit("error", event, **f)
```

- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): structured stderr telemetry`.

### Task 0.5: Worker event loop (`main.py`) + handshake

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/main.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_worker_dispatch.py`

- [ ] **Step 1: Failing test** (dispatch + handshake + unknown method)

```python
# worker/tests/test_worker_dispatch.py
import json
import pytest
from svi2_video_worker.main import Worker, PROTOCOL_VERSION


@pytest.mark.asyncio
async def test_handshake_returns_runtime_id(capsys):
    w = Worker(profile="fake")
    captured = []
    w._write = lambda line: captured.append(line)  # type: ignore
    await w._dispatch_line('{"jsonrpc":"2.0","id":1,"method":"handshake","params":{}}')
    res = json.loads(captured[-1])["result"]
    assert res["runtime_id"] == "nexus.video.svi2-pro.fake"
    assert res["protocol_version"] == PROTOCOL_VERSION


@pytest.mark.asyncio
async def test_unknown_method_errors(capsys):
    w = Worker(profile="fake")
    captured = []
    w._write = lambda line: captured.append(line)  # type: ignore
    await w._dispatch_line('{"jsonrpc":"2.0","id":2,"method":"nope","params":{}}')
    assert json.loads(captured[-1])["error"]["code"] == -32601
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** (port LongCat `main.py` verbatim in structure; swap runtime_id prefix to `nexus.video.svi2-pro`, import from `.` package). Include `Worker.__init__`, `register`, `emit_notification`, `_write`, `_register_intrinsic` (handshake/health/shutdown), `run` (thread-bridged stdin pump), `_dispatch_line`, `_dispatch_request`. Use the exact code from `extensions/builtin/nexus-video-longcat/worker/src/longcat_video_worker/main.py` with these substitutions: `runtime_id` f-string → `f"nexus.video.svi2-pro.{self.profile}"`; `Methods.HEALTH` from svi2 `rpc.py`. `PROTOCOL_VERSION = "1.0"`.

- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): stdio JSON-RPC worker loop + handshake`.

### Task 0.6: Entrypoint (`__main__.py`) + stdout hijack

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/__main__.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_entrypoint_handshake.py`

- [ ] **Step 1: Failing test** (spawn the worker as a subprocess, send handshake, read one response from real stdout)

```python
# worker/tests/test_entrypoint_handshake.py
import json, os, subprocess, sys
from pathlib import Path

WORKER = Path(__file__).resolve().parents[1] / "src"


def test_subprocess_handshake_roundtrip():
    env = {**os.environ, "PYTHONPATH": str(WORKER), "NEXUS_VIDEO_SVI2_RUNTIME": "fake"}
    p = subprocess.Popen(
        [sys.executable, "-m", "svi2_video_worker"],
        stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
        text=True, env=env,
    )
    out, _ = p.communicate('{"jsonrpc":"2.0","id":1,"method":"handshake","params":{}}\n', timeout=30)
    line = [l for l in out.splitlines() if l.strip()][0]
    assert json.loads(line)["result"]["runtime_id"] == "nexus.video.svi2-pro.fake"
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** (port LongCat `__main__.py`; env var `NEXUS_VIDEO_SVI2_RUNTIME`, default `fake`; pre-import torch on the main thread for non-fake profiles for Windows LoaderLock; register installer handlers always; register fake handlers when `profile == "fake"`, else `register_svi2_handlers` from `.pipeline_svi2` for `rtx50-fp8`).

```python
# worker/src/svi2_video_worker/__main__.py
from __future__ import annotations
import asyncio, os, sys


def _hijack_stdout() -> None:
    sys.__nexus_jsonrpc_stdout__ = sys.stdout
    sys.stdout = sys.stderr
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(line_buffering=True)
    if hasattr(sys.__nexus_jsonrpc_stdout__, "reconfigure"):
        sys.__nexus_jsonrpc_stdout__.reconfigure(line_buffering=True)


def cli() -> int:
    _hijack_stdout()
    from .installer import register_installer_handlers
    from .main import Worker
    from .pipeline_fake import register_fake_handlers

    profile = os.environ.get("NEXUS_VIDEO_SVI2_RUNTIME", "fake")
    if profile != "fake":
        try:
            import numpy  # noqa: F401
            import torch  # noqa: F401
        except ImportError as e:
            print(
                '{"level":"warn","target":"nexus.video.svi2-pro",'
                '"event":"pre_import_failed","error":"' + str(e) + '"}',
                file=sys.stderr, flush=True,
            )
    worker = Worker(profile=profile)
    register_installer_handlers(worker)
    if profile == "fake":
        register_fake_handlers(worker)
    elif profile == "rtx50-fp8":
        try:
            from .pipeline_svi2 import register_svi2_handlers
        except ImportError as e:
            worker.logger.error("pipeline import failed", profile=profile, error=str(e))
            return 2
        register_svi2_handlers(worker)
    else:
        worker.logger.error("unknown profile", profile=profile)
        return 2
    return asyncio.run(worker.run())


if __name__ == "__main__":
    raise SystemExit(cli())
```

- [ ] **Step 4: Run, expect pass.** (Test only exercises the `fake` profile, so installer/pipeline imports must not hard-fail at import time — keep `installer.py` import-light. Until Task 1.1 lands, stub `register_installer_handlers` as a no-op in `installer.py` so this test passes; Task 1.1 fills it in.)
- [ ] **Step 5: Commit** `feat(svi2-pro): worker entrypoint + stdout hijack`.

### Task 0.7: Fake pipeline (`pipeline_fake.py`)

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/pipeline_fake.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_pipeline_fake.py`

- [ ] **Step 1: Failing test**

```python
# worker/tests/test_pipeline_fake.py
import shutil, pytest
from pathlib import Path
from svi2_video_worker.pipeline_fake import render_fake

pytestmark = pytest.mark.skipif(shutil.which("ffmpeg") is None, reason="ffmpeg not installed")


def test_render_fake_writes_mp4(tmp_path: Path):
    out = tmp_path / "fake.mp4"
    render_fake(out, width=480, height=832, duration_seconds=0.5, fps=15)
    assert out.exists() and out.stat().st_size > 0
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** (port LongCat `pipeline_fake.py`; default size 480×832; register `Methods.RENDER_START` → `render_fake`; return `{"status":"ok","output_path":...,"profile":"fake"}`).
- [ ] **Step 4: Run, expect pass** (or skip if ffmpeg absent).
- [ ] **Step 5: Commit** `feat(svi2-pro): fake no-GPU render pipeline`.

### Task 0.8: `manifest.yaml` + fake `versions.yaml`

**Files:**
- Create: `extensions/builtin/svi2-pro/manifest.yaml`
- Create: `extensions/builtin/svi2-pro/backends/fake/versions.yaml`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_manifest_valid.py`

- [ ] **Step 1: Failing test** (manifest parses + declares both runtimes + correct id)

```python
# worker/tests/test_manifest_valid.py
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
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement `manifest.yaml`** (mirror LongCat manifest; substitute id/name/description/entrypoint/env var/runtime ids; `worker_entrypoint: worker/src/svi2_video_worker/__main__.py`; `NEXUS_VIDEO_SVI2_RUNTIME` not needed in manifest env unless host sets it — host sets the profile env from `runtime_id`). Key fields:

```yaml
spec_version: "0.1"
extension:
  id: "nexus.video.svi2-pro"
  version: "0.1.0"
  name: "SVI 2.0 Pro Video Generator"
  description: "Long, cross-clip-consistent image-to-video via Stable Video Infinity 2.0 Pro (two SVI LoRAs on Wan2.2-I2V-A14B dual-expert MoE). Kijai fp8 e4m3fn base for 16 GB Blackwell."
  publisher: "nexus"
compatibility:
  host_api: ">=0.1.0"
  protocol: ">=0.1.0"
runtime:
  family: "native"
  entrypoint: "bin/nexus-video-svi2-pro-worker${exe_suffix}"
  environment:
    cuda_version: null
    env_vars: {}
dependencies:
  steps:
    - id: python
      type: runtime
      spec: { family: python, version: ">=3.11,<3.13", accelerator_profiles: [cpu, cuda12, cuda13] }
    - id: pkgs
      type: package_set
      requires: [python]
      spec: { manager: uv, manifest_path: "worker/pyproject.toml", lock_path: "worker/uv.lock", target: extension_local }
    - id: ffmpeg
      type: system_binary
      spec:
        id: ffmpeg
        version: ">=4.0"
        allow_system_path: true
        sources:
          - { platform: windows-x64, url: "https://github.com/BtbN/FFmpeg-Builds/releases/latest/download/ffmpeg-master-latest-win64-gpl.zip", sha256: "0000000000000000000000000000000000000000000000000000000000000000", size: 0, archive: zip }
          - { platform: linux-x64, url: "https://github.com/BtbN/FFmpeg-Builds/releases/latest/download/ffmpeg-master-latest-linux64-gpl.tar.xz", sha256: "0000000000000000000000000000000000000000000000000000000000000000", size: 0, archive: tar.xz }
    - id: validate
      type: validation
      requires: [python, pkgs, ffmpeg]
      spec: { kind: worker_handshake, timeout_seconds: 120 }
capabilities:
  - "filesystem.read"
  - "filesystem.write"
  - "process.spawn"
  - "gpu.compute"
  - "huggingface.search"
  - "huggingface.install"
  - "model.registry.read"
  - "workspace.read"
  - "workspace.write"
backend_runtimes:
  - runtime_id: "nexus.video.svi2-pro.rtx50-fp8"
    display_name: "SVI 2.0 Pro i2v FP8 (RTX 50 / Blackwell, 16 GB)"
    family: "python"
    transport: "stdio"
    worker_entrypoint: "worker/src/svi2_video_worker/__main__.py"
    version_manifest: "backends/rtx50-fp8/versions.yaml"
    capability_tags: ["video-generation", "image-to-video", "long-video", "svi", "wan22", "fp8", "blackwell"]
    supported_roles: ["video.render"]
  - runtime_id: "nexus.video.svi2-pro.fake"
    display_name: "SVI 2.0 Pro Fake (CI / development)"
    family: "python"
    transport: "stdio"
    worker_entrypoint: "worker/src/svi2_video_worker/__main__.py"
    version_manifest: "backends/fake/versions.yaml"
    capability_tags: ["video-generation", "image-to-video", "long-video", "svi", "fake"]
    supported_roles: ["video.render"]
```

```yaml
# backends/fake/versions.yaml
spec_version: "0.1"
backend:
  runtime_id: "nexus.video.svi2-pro.fake"
  default_version: "0.1.0"
versions:
  - id: "0.1.0"
    status: "stable"
    artifacts: []
```

> NOTE: the host maps `runtime_id` → the worker's profile env var. Confirm during Task 0.6/integration which env var name the host injects; LongCat uses `NEXUS_VIDEO_LONGCAT_RUNTIME` set to the profile suffix. svi2 mirrors this with `NEXUS_VIDEO_SVI2_RUNTIME`. If the host derives the env var name from the extension id, adjust `__main__.py` accordingly (investigation step, no code guess).

- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): manifest + fake backend versions`.

### Task 0.9: README

**Files:**
- Create: `extensions/builtin/svi2-pro/README.md`

- [ ] **Step 1: Write a short README** — what the extension does, the two profiles (`fake`, `rtx50-fp8`), model list (link the 6 artifacts), how to run the GPU smoke. No test. Keep < 60 lines.
- [ ] **Step 2: Commit** `docs(svi2-pro): extension README`.

---

## Phase 1 — Installer / Model Foundry (offline, mocked HF)

### Task 1.1: Artifact resolution from `versions.yaml` (`installer.py`)

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/installer.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_installer.py`

**Background:** `register_installer_handlers(worker)` registers `svi2.video.install.start` / `.status`. Resolution reads the profile's `versions.yaml`, downloads each artifact via `huggingface_hub` (mocked in tests), and writes a completion sentinel. Mirror LongCat `installer.py` shape but keep imports light (no torch at import time) so Task 0.6's fake test passes.

- [ ] **Step 1: Failing test** (resolution returns the 6 artifact specs; download is mocked)

```python
# worker/tests/test_installer.py
from pathlib import Path
import yaml
from svi2_video_worker.installer import resolve_artifacts


def test_resolve_artifacts_reads_rtx50_fp8(tmp_path: Path):
    vfile = tmp_path / "versions.yaml"
    vfile.write_text(yaml.safe_dump({
        "spec_version": "0.1",
        "backend": {"runtime_id": "nexus.video.svi2-pro.rtx50-fp8", "default_version": "0.1.0"},
        "versions": [{"id": "0.1.0", "status": "experimental", "artifacts": [
            {"id": "dit-high-fp8", "source": {"kind": "huggingface", "repo": "Kijai/WanVideo_comfy_fp8_scaled", "revision": "main", "file": "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors"}},
        ]}],
    }))
    arts = resolve_artifacts(vfile)
    assert arts[0].id == "dit-high-fp8"
    assert arts[0].repo == "Kijai/WanVideo_comfy_fp8_scaled"
    assert arts[0].file.endswith("HIGH_fp8_e4m3fn_scaled_KJ.safetensors")


def test_register_installer_handlers_is_noop_safe():
    # must be importable + callable with a minimal stub (no torch)
    class Stub:
        def __init__(self): self.calls = {}
        def register(self, m, h): self.calls[m] = h
    from svi2_video_worker.installer import register_installer_handlers
    s = Stub(); register_installer_handlers(s)
    assert "svi2.video.install.start" in s.calls
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `resolve_artifacts(versions_path) -> list[Artifact]` (frozen dataclass `Artifact(id, repo, revision, file, subfolder, kind)`), `download_artifacts(artifacts, dest_dir, hf_download=...)` (default `hf_download` = `huggingface_hub.hf_hub_download`; injectable for tests), sentinel writer `.nexus-install-complete`, and `register_installer_handlers(worker)` registering async `svi2.video.install.start` (runs resolution+download in `asyncio.to_thread`, emits progress notifications) + `svi2.video.install.status` (reads sentinel). Keep module import torch-free.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): model installer + versions.yaml resolution`.

### Task 1.2: Headless install CLI (`headless_install.py`)

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/headless_install.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_headless_install.py`

- [ ] **Step 1: Failing test** — `main(["--profile","rtx50-fp8","--dest",str(tmp),"--dry-run"])` returns 0 and prints the resolved artifact ids without downloading.
- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** argparse CLI: `--profile`, `--dest`, `--dry-run`; resolves the backend's `versions.yaml` (locate via `Path(__file__).parents[3] / "backends" / profile / "versions.yaml"`), prints ids; on non-dry-run calls `download_artifacts`. `main()` is the `nexus-video-svi2-pro-install` script entry.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): headless install CLI`.

### Task 1.3: `rtx50-fp8/versions.yaml` with the 6 artifacts

**Files:**
- Create: `extensions/builtin/svi2-pro/backends/rtx50-fp8/versions.yaml`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_rtx50_versions.py`

- [ ] **Step 1: Failing test** (6 artifacts with expected ids + repos)

```python
# worker/tests/test_rtx50_versions.py
from pathlib import Path
import yaml
ROOT = Path(__file__).resolve().parents[2]


def test_rtx50_fp8_has_six_artifacts():
    v = yaml.safe_load((ROOT / "backends/rtx50-fp8/versions.yaml").read_text())
    arts = {a["id"]: a for a in v["versions"][0]["artifacts"]}
    assert set(arts) == {"dit-high-fp8", "dit-low-fp8", "svi-lora-high", "svi-lora-low", "text-encoder", "vae"}
    assert arts["dit-high-fp8"]["source"]["repo"] == "Kijai/WanVideo_comfy_fp8_scaled"
    assert arts["svi-lora-high"]["source"]["repo"] == "epfl-vita/svi-model"
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** (artifacts from design §2; `size_bytes`/`sha256` placeholders `0`/zeros, like LongCat, until pinned):

```yaml
spec_version: "0.1"
backend:
  runtime_id: "nexus.video.svi2-pro.rtx50-fp8"
  default_version: "0.1.0"
versions:
  - id: "0.1.0"
    status: "experimental"
    artifacts:
      - id: "dit-high-fp8"
        source: { kind: "huggingface", repo: "Kijai/WanVideo_comfy_fp8_scaled", revision: "main", file: "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors" }
        size_bytes: 0
        sha256: "0000000000000000000000000000000000000000000000000000000000000000"
      - id: "dit-low-fp8"
        source: { kind: "huggingface", repo: "Kijai/WanVideo_comfy_fp8_scaled", revision: "main", file: "I2V/Wan2_2-I2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors" }
        size_bytes: 0
        sha256: "0000000000000000000000000000000000000000000000000000000000000000"
      - id: "svi-lora-high"
        source: { kind: "huggingface", repo: "epfl-vita/svi-model", revision: "main", file: "version-2.0/SVI_Wan2.2-I2V-A14B_high_noise_lora_v2.0_pro.safetensors" }
        size_bytes: 0
        sha256: "0000000000000000000000000000000000000000000000000000000000000000"
      - id: "svi-lora-low"
        source: { kind: "huggingface", repo: "epfl-vita/svi-model", revision: "main", file: "version-2.0/SVI_Wan2.2-I2V-A14B_low_noise_lora_v2.0_pro.safetensors" }
        size_bytes: 0
        sha256: "0000000000000000000000000000000000000000000000000000000000000000"
      - id: "text-encoder"
        source: { kind: "huggingface", repo: "Kijai/WanVideo_comfy", revision: "main", file: "umt5-xxl-enc-fp8_e4m3fn.safetensors" }
        size_bytes: 0
        sha256: "0000000000000000000000000000000000000000000000000000000000000000"
      - id: "vae"
        source: { kind: "huggingface", repo: "Kijai/WanVideo_comfy", revision: "main", file: "Wan2_2_VAE_bf16.safetensors" }
        size_bytes: 0
        sha256: "0000000000000000000000000000000000000000000000000000000000000000"
```

- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): rtx50-fp8 model manifest (Kijai fp8 + SVI LoRA + T5 + VAE)`.

---

## Phase 2 — Vendor the model + de-risk the core (some steps are GPU-gated; mark them)

### Task 2.1 (SPIKE — investigation): Determine vendored `WanModel` module set

**Files:**
- Create: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/wan22/` (vendored modules — exact files TBD by this trace)
- Create: `docs/research/2026-05-29-svi2-pro-vendor-trace.md` (the trace result)

**This is an investigation task — no fabricated code.** Steps:

- [ ] **Step 1:** In the zip, open `diffsynth/pipelines/wan_video_svi_pro.py`; list every `from diffsynth.models...` / `from diffsynth...` import used to build `dit`, `dit2`, the VAE, and the scheduler. Record them.
- [ ] **Step 2:** Transitively trace those modules' imports inside `diffsynth/models/` (the `WanModel`/Wan DiT file + its attention + embeddings + any `RMSNorm`/rotary helpers). Produce the minimal closed set of files needed to instantiate the Wan2.2 DiT and run a forward, WITHOUT importing DiffSynth's pipeline/loader/offload machinery.
- [ ] **Step 3:** Copy that closed set into `worker/src/svi2_video_worker/wan22/`, rewriting intra-package imports to relative. Strip any DiffSynth global-state / model-manager hooks. Add an `__init__.py` exporting the DiT class (e.g. `WanModel`).
- [ ] **Step 4 (acceptance, CPU):** Write `worker/tests/test_wan22_imports.py` that does `from svi2_video_worker.wan22 import WanModel` and instantiates it with a tiny config (few layers, small dims) on CPU in bf16, then runs one forward on random inputs and asserts the output shape matches the latent shape contract `(B, 16, T, H/8, W/8)`-compatible. Run it; expect PASS. (No fp8, no real weights yet.)
- [ ] **Step 5:** Write `docs/research/2026-05-29-svi2-pro-vendor-trace.md` listing exactly which files were copied + any edits. Commit code + trace: `feat(svi2-pro): vendor Wan2.2 WanModel (DiT + attention + scheduler)`.

### Task 2.2: Attention SDPA fallback in vendored model

**Files:**
- Modify: the vendored attention module under `worker/src/svi2_video_worker/wan22/`
- Create: `worker/src/svi2_video_worker/attention_backend.py`
- Test: `worker/tests/test_attention_backend.py`

- [ ] **Step 1: Failing test** (backend selection is import-safe without flash_attn; SDPA path returns correct shape)

```python
# worker/tests/test_attention_backend.py
import pytest
torch = pytest.importorskip("torch")
from svi2_video_worker.attention_backend import scaled_attention, FLASH_AVAILABLE


def test_sdpa_path_shape():
    q = torch.randn(1, 8, 64, 40); k = torch.randn(1, 8, 64, 40); v = torch.randn(1, 8, 64, 40)
    out = scaled_attention(q, k, v, force_sdpa=True)
    assert out.shape == q.shape


def test_flash_flag_is_bool():
    assert isinstance(FLASH_AVAILABLE, bool)
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `attention_backend.py`: try `import flash_attn`; set `FLASH_AVAILABLE`. `scaled_attention(q,k,v,*,causal=False,force_sdpa=False)` uses flash_attn when available and not forced, else `torch.nn.functional.scaled_dot_product_attention`. Wire the vendored attention module to call `scaled_attention` instead of a hard flash_attn import (mirrors LongCat `_patch_attention_to_use_sdpa`).
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): attention backend with SDPA fallback`.

### Task 2.3: fp8 loader (`fp8_loader.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/fp8_loader.py`
- Test: `worker/tests/test_fp8_loader.py`

**Background:** Kijai `_KJ` safetensors store fp8_e4m3fn weights + per-tensor `*.scale_weight`. Forward = `torch._scaled_mm`. Technique reference: `nexus-video-longcat/.../longcat_safetensors_loader.py` (`WEIGHT_SCALE_SUFFIXES`, `_is_fp8`, `_strip_scale_suffix`). Re-implement fresh (no LongCat import).

- [ ] **Step 1: Failing test** (synthetic fp8 linear matches bf16 reference within tolerance)

```python
# worker/tests/test_fp8_loader.py
import pytest
torch = pytest.importorskip("torch")
from svi2_video_worker.fp8_loader import ScaledFP8Linear, is_fp8_dtype


def test_scaled_fp8_linear_matches_bf16_reference():
    torch.manual_seed(0)
    in_f, out_f = 64, 32
    w_bf16 = (torch.randn(out_f, in_f) * 0.1).to(torch.bfloat16)
    scale = w_bf16.abs().max().to(torch.float32) / 448.0
    w_fp8 = (w_bf16.float() / scale).clamp(-448, 448).to(torch.float8_e4m3fn)
    lin = ScaledFP8Linear(in_f, out_f, weight_fp8=w_fp8, scale_weight=scale)
    x = torch.randn(4, in_f, dtype=torch.bfloat16)
    ref = x.float() @ w_bf16.float().t()
    out = lin(x)
    assert out.shape == (4, out_f)
    assert torch.allclose(out.float(), ref, atol=0.5, rtol=0.1)


def test_is_fp8_dtype():
    assert is_fp8_dtype(torch.float8_e4m3fn) is True
    assert is_fp8_dtype(torch.bfloat16) is False
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `is_fp8_dtype`, `WEIGHT_SCALE_SUFFIXES`, `ScaledFP8Linear(nn.Module)` (stores fp8 weight + fp32 scale; forward casts x→fp8 with ±448 clamp and uses `torch._scaled_mm(x_fp8, w_fp8.t(), scale_a=ones, scale_b=scale_weight, out_dtype=bf16)`; falls back to dequant-matmul on CPU/when `_scaled_mm` unavailable so the CPU test passes), and `load_fp8_state_dict(path)` that pairs each `*.weight` (fp8) with its `*.scale_weight`. Provide `build_fp8_linears(state_dict)` mapping.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): fp8 e4m3fn scaled loader (_scaled_mm + dequant fallback)`.

### Task 2.4: Runtime-additive LoRA (`lora.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/lora.py`
- Test: `worker/tests/test_lora.py`

- [ ] **Step 1: Failing test** (additive delta matches reference `W + α·B@A`; key parser strips prefixes)

```python
# worker/tests/test_lora.py
import pytest
torch = pytest.importorskip("torch")
from svi2_video_worker.lora import apply_additive_lora, parse_lora_key


def test_additive_lora_matches_reference():
    torch.manual_seed(0)
    in_f, out_f, rank = 32, 16, 4
    base = torch.randn(out_f, in_f)
    A = torch.randn(rank, in_f); B = torch.randn(out_f, rank)
    x = torch.randn(8, in_f)
    ref = x @ (base + (B @ A)).t()
    base_out = x @ base.t()
    out = apply_additive_lora(base_out, x, A, B, alpha=1.0)
    assert torch.allclose(out, ref, atol=1e-4)


def test_parse_lora_key_strips_diffusion_model_prefix():
    assert parse_lora_key("diffusion_model.blocks.0.attn.q.lora_down.weight") == ("blocks.0.attn.q", "down")
    assert parse_lora_key("blocks.0.attn.q.lora_A.weight") == ("blocks.0.attn.q", "down")
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `parse_lora_key` (handle `lora_down/lora_up` and `lora_A/lora_B`, strip `diffusion_model.` prefix, return `(module_path, "down"|"up")`), `apply_additive_lora(base_out, x, A, B, alpha)` = `base_out + alpha * (x @ A.t()) @ B.t()`, and `load_lora_pairs(path)` → `{module_path: (A, B, alpha)}`.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): runtime-additive LoRA application`.

### Task 2.5 (SPIKE — GPU-gated): fp8 expert load + LoRA key hit-rate

**Files:**
- Create: `worker/scripts/spike_load_expert.py` (operator-run; not a pytest)

**This requires the real Kijai fp8 expert + SVI LoRA downloaded (Task 1.x) on the RTX 5070 Ti.** Acceptance, not unit code:

- [ ] **Step 1:** Script loads `Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors` via `fp8_loader` into the vendored `WanModel`. Audit key overlap (src vs model keys) — log src/target/overlap counts. Acceptance: overlap ≥ 95% of model Linear weights (a remap table is authored here if names differ — record it in the vendor-trace doc).
- [ ] **Step 2:** Load `SVI_..._high_noise_lora_v2.0_pro.safetensors` via `lora`; report how many LoRA module paths resolve onto loaded model modules. Acceptance: ≥ 95% LoRA-key hit-rate (else fix `parse_lora_key`/remap).
- [ ] **Step 3:** One forward on random latent at 480×832 (81-frame latent T=21) with the HIGH expert on GPU; assert finite output, log peak VRAM. Acceptance: no NaN, peak ≤ 16 GB.
- [ ] **Step 4:** Document results in the vendor-trace doc. Commit script + findings: `chore(svi2-pro): GPU spike — fp8 expert load + LoRA hit-rate`.

> If Step 1/2 overlap < 95%, STOP and resolve the key remap before Phase 3 — this is the design's risk #2/#3.

---

## Phase 3 — Pipeline assembly

### Task 3.1: Expert router (`expert_router.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/expert_router.py`
- Test: `worker/tests/test_expert_router.py`

**Background:** boundary 0.875 (timestep scale 1000 → 875). While `timestep >= 875` use HIGH; first time `timestep < 875` switch permanently to LOW (one-way). GPU residency swap is a side effect; the selection logic is pure + unit-testable.

- [ ] **Step 1: Failing test**

```python
# worker/tests/test_expert_router.py
from svi2_video_worker.expert_router import ExpertSelector


def test_one_way_switch_at_boundary():
    sel = ExpertSelector(boundary=0.875)
    assert sel.select(timestep=999) == "high"
    assert sel.select(timestep=900) == "high"
    assert sel.select(timestep=870) == "low"   # crossed
    assert sel.select(timestep=950) == "low"    # stays low (one-way)


def test_boundary_uses_scaled_threshold():
    sel = ExpertSelector(boundary=0.875)
    assert sel.threshold == 875.0
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `ExpertSelector(boundary)`: `threshold = boundary * 1000`; stateful `select(timestep)` returns `"high"` until first `timestep < threshold`, then latches `"low"`. Add `reset()` (called per clip). Keep GPU `.to()` swap out of this pure unit (handled in pipeline).
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): dual-expert router (boundary 0.875, one-way)`.

### Task 3.2: SVI cross-clip chain (`svi_chain.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/svi_chain.py`
- Test: `worker/tests/test_svi_chain.py`

**Background:** the pure bookkeeping of the error-recycling chain, independent of the diffusion model. Functions take/return tensors (or numpy) so they unit-test on CPU. Reference: `inference_svi_2.0_pro.py` `generate_streaming_video` loop + `wan_video_svi_pro.py` `WanVideoUnit_ImageEmbedderVAE`.

- [ ] **Step 1: Failing test**

```python
# worker/tests/test_svi_chain.py
import pytest
torch = pytest.importorskip("torch")
from svi2_video_worker.svi_chain import build_conditioning_latents, stitch_clip_frames


def test_clip0_conditioning_is_anchor_plus_zeros():
    anchor_lat = torch.randn(16, 1, 60, 104)      # C, T=1, H/8, W/8
    y = build_conditioning_latents(anchor_lat, prev_last_latent=None, total_latent_frames=21, num_motion_latent=1)
    assert y.shape[1] == 21                         # T dimension
    assert torch.equal(y[:, 0], anchor_lat[:, 0])   # anchor fixed at pos 0
    assert torch.count_nonzero(y[:, 1:]) == 0       # rest zero on clip 0


def test_clipN_inserts_motion_tail_after_anchor():
    anchor_lat = torch.randn(16, 1, 60, 104)
    prev = torch.randn(16, 5, 60, 104)
    y = build_conditioning_latents(anchor_lat, prev_last_latent=prev, total_latent_frames=21, num_motion_latent=1)
    assert torch.equal(y[:, 0], anchor_lat[:, 0])           # anchor still pos 0
    assert torch.equal(y[:, 1], prev[:, -1])                # 1 motion latent from tail
    assert torch.count_nonzero(y[:, 2:]) == 0


def test_stitch_drops_overlap_frames_after_first_clip():
    c0 = [f"a{i}" for i in range(81)]
    c1 = [f"b{i}" for i in range(81)]
    out = stitch_clip_frames([c0, c1], num_overlap_frame=5)
    assert len(out) == 81 + (81 - 5)
    assert out[81] == "b5"
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `build_conditioning_latents(anchor_lat, prev_last_latent, total_latent_frames, num_motion_latent)` → concat `[anchor(1), motion_tail(num_motion_latent) if prev else none, zeros(rest)]` along T to `total_latent_frames`; `stitch_clip_frames(clips, num_overlap_frame)` → clip0 full, subsequent clips drop first `num_overlap_frame`; `next_anchor_unchanged` helper documenting the anchor never updates. Pure tensor/list ops.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): SVI cross-clip conditioning + stitch (error recycling)`.

### Task 3.3: VAE + text-encoder wrappers (`vae.py`, `text_encoder.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/vae.py`, `worker/src/svi2_video_worker/text_encoder.py`
- Test: `worker/tests/test_wrappers_contract.py`

**Background:** thin wrappers around the vendored VAE (AutoencoderKLWan) + UMT5 encoder; load fp8/bf16 from the installed files; expose `encode_image`, `decode_latents`, `encode_text`. GPU-dependent forwards are not unit-tested here — only the construction contract + offload toggles are (mockable).

- [ ] **Step 1: Failing test** (interface presence + offload toggle without GPU)

```python
# worker/tests/test_wrappers_contract.py
from svi2_video_worker.vae import VaeWrapper
from svi2_video_worker.text_encoder import TextEncoderWrapper


def test_vae_wrapper_interface():
    assert hasattr(VaeWrapper, "encode_image") and hasattr(VaeWrapper, "decode_latents")
    assert hasattr(VaeWrapper, "to_cpu") and hasattr(VaeWrapper, "to_cuda")


def test_text_encoder_interface():
    assert hasattr(TextEncoderWrapper, "encode_text")
    assert hasattr(TextEncoderWrapper, "to_cpu") and hasattr(TextEncoderWrapper, "to_cuda")
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** both wrappers with lazy model construction (model built on first `to_cuda`), `encode_image(pil)->latent`, `decode_latents(latent)->frames`, `encode_text(prompt)->embeds`, and `to_cpu/to_cuda` offload toggles. Torch/vendored imports inside methods, not module top, so the interface test runs without torch.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): VAE + UMT5 wrappers with offload toggles`.

### Task 3.4: Render report + VRAM helpers (`render_report.py`, `vram.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/render_report.py`, `worker/src/svi2_video_worker/vram.py`
- Test: `worker/tests/test_render_report.py`

- [ ] **Step 1: Failing test**

```python
# worker/tests/test_render_report.py
import json
from pathlib import Path
from svi2_video_worker.render_report import write_render_report


def test_write_render_report(tmp_path: Path):
    p = write_render_report(tmp_path, {
        "profile": "rtx50-fp8", "num_clips": 3, "frames_per_clip": 81,
        "width": 480, "height": 832, "fps": 15, "peak_vram_bytes": 0,
        "output_path": str(tmp_path / "out.mp4"),
    })
    rec = json.loads(Path(p).read_text())
    assert rec["num_clips"] == 3 and rec["profile"] == "rtx50-fp8"
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `write_render_report(dir, dict) -> path` (writes `render_report.json`), and `vram.py` with `probe_free_vram()` + `peak_allocated()` (torch imported lazily; return 0 when torch/CUDA absent).
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): render report writer + VRAM probes`.

### Task 3.5: ffmpeg assembly (`ffmpeg_io.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/ffmpeg_io.py`
- Test: `worker/tests/test_ffmpeg_io.py`

- [ ] **Step 1: Failing test** (skip if no ffmpeg; assemble a few PIL frames → mp4)

```python
# worker/tests/test_ffmpeg_io.py
import shutil, pytest
from pathlib import Path
pytestmark = pytest.mark.skipif(shutil.which("ffmpeg") is None, reason="ffmpeg not installed")
Image = pytest.importorskip("PIL.Image")
from svi2_video_worker.ffmpeg_io import frames_to_mp4


def test_frames_to_mp4(tmp_path: Path):
    frames = [Image.new("RGB", (480, 832), (i, i, i)) for i in range(10)]
    out = tmp_path / "v.mp4"
    frames_to_mp4(frames, out, fps=15)
    assert out.exists() and out.stat().st_size > 0
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `frames_to_mp4(frames, out_path, fps, quality=7)` — write frames to a temp dir as PNGs (or pipe raw) and invoke ffmpeg (`-pix_fmt yuv420p`); mirror LongCat `ffmpeg_io.py` if compatible.
- [ ] **Step 4: Run, expect pass (or skip).**
- [ ] **Step 5: Commit** `feat(svi2-pro): ffmpeg frame assembly`.

### Task 3.6: Real pipeline wiring (`pipeline_svi2.py`)

**Files:**
- Create: `worker/src/svi2_video_worker/pipeline_svi2.py`
- Test: `worker/tests/test_pipeline_svi2_wiring.py`

**Background:** `register_svi2_handlers(worker)` wires `svi2.video.render.start` to the full chain: load both fp8 experts (CPU-resident) + LoRAs + VAE + T5; per-clip loop using `ExpertSelector`, `build_conditioning_latents`, the vendored DiT denoise, raw-latent recycling, VAE decode, `stitch_clip_frames`; emit `CLIP_STARTED`/`CLIP_STEP`/`CLIP_COMPLETED`/`DONE`; write report; assemble mp4. Heavy work in `asyncio.to_thread`. fp8-NaN guard: `nan_to_num` + one reseed-retry on non-finite latent.

- [ ] **Step 1: Failing test** (handler registration + params validation, mocking the GPU stages)

```python
# worker/tests/test_pipeline_svi2_wiring.py
import pytest
from svi2_video_worker.pipeline_svi2 import register_svi2_handlers, validate_render_params


def test_register_adds_render_handler():
    class Stub:
        def __init__(self): self.calls = {}
        def register(self, m, h): self.calls[m] = h
    s = Stub(); register_svi2_handlers(s)
    assert "svi2.video.render.start" in s.calls


def test_validate_render_params_rejects_missing_image():
    with pytest.raises(ValueError):
        validate_render_params({"prompts": ["a"]})


def test_validate_render_params_defaults():
    p = validate_render_params({"ref_image_path": "x.png", "prompts": ["a", "b"]})
    assert p["num_clips"] == 2 and p["height"] == 832 and p["width"] == 480
    assert p["cfg_scale"] == 5.0 and p["num_overlap_frame"] in (1, 4)
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** `validate_render_params(params)` (require `ref_image_path` + non-empty `prompts`; default `num_clips=len(prompts)`, `height=832`, `width=480`, `fps=15`, `frames_per_clip=81`, `cfg_scale=5.0`, `num_overlap_frame=4`, `num_motion_latent=1`, `seed_multiplier=42`), and `register_svi2_handlers(worker)`. The GPU render body imports torch + vendored model lazily inside `asyncio.to_thread`; guard with try/except mapping failures to `ErrorCodes.RENDER_FAILED`/`MODEL_MISSING`/`VRAM_BUDGET_EXCEEDED`. Keep all torch imports inside functions so this wiring test runs without torch.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): real SVI2 render pipeline wiring (dual-expert + chain)`.

---

## Phase 4 — Operator scripts + final integration

### Task 4.1: Install scripts (`install.sh` + `install.ps1`)

**Files:**
- Create: `extensions/builtin/svi2-pro/scripts/install.sh`, `extensions/builtin/svi2-pro/scripts/install.ps1`

- [ ] **Step 1:** Port LongCat `scripts/install.{sh,ps1}` — `uv sync --extra diffusers --extra flash` in `worker/`, then `nexus-video-svi2-pro-install --profile rtx50-fp8 --dest <models dir>`. Both files must be a behavioral pair (cross-platform rule).
- [ ] **Step 2:** Manual check: `bash scripts/install.sh --help` (or dry path) prints usage; `pwsh -File scripts/install.ps1 -WhatIf`-style guard. No unit test (operator scripts).
- [ ] **Step 3: Commit** `feat(svi2-pro): dependency install scripts (sh + ps1)`.

### Task 4.2: GPU smoke (`smoke-rtx50-fp8.sh` + `.ps1`)

**Files:**
- Create: `extensions/builtin/svi2-pro/scripts/smoke-rtx50-fp8.sh`, `.ps1`
- Create: `extensions/builtin/svi2-pro/scripts/gpu_smoke.py`

- [ ] **Step 1:** `gpu_smoke.py` spawns the worker with `NEXUS_VIDEO_SVI2_RUNTIME=rtx50-fp8`, sends a `render.start` with a sample ref image + 2-clip prompt list at 480×832, asserts: output mp4 exists, frame count == `81 + (81 - overlap)`, no NaN reported, peak VRAM ≤ 16 GB. Prereq probes (CUDA present, models downloaded) → exit 2 on prereq-fail.
- [ ] **Step 2:** `.sh` + `.ps1` wrappers set env + invoke `gpu_smoke.py`. Behavioral pair.
- [ ] **Step 3:** No CI run (operator-run on RTX 5070 Ti). Commit `feat(svi2-pro): GPU smoke (single+multi-clip i2v) sh+ps1`.

### Task 4.3: Operator + schema files

**Files:**
- Create: `extensions/builtin/svi2-pro/operators/svi2_render.yaml`
- Create: `extensions/builtin/svi2-pro/schemas/svi2_render_params.schema.json`
- Test: `worker/tests/test_render_schema.py`

- [ ] **Step 1: Failing test** (schema validates a good params doc, rejects missing ref image)

```python
# worker/tests/test_render_schema.py
import json
from pathlib import Path
import jsonschema
ROOT = Path(__file__).resolve().parents[2]


def test_schema_accepts_valid_and_rejects_missing_image():
    schema = json.loads((ROOT / "schemas/svi2_render_params.schema.json").read_text())
    jsonschema.validate({"ref_image_path": "x.png", "prompts": ["a"], "num_clips": 1}, schema)
    try:
        jsonschema.validate({"prompts": ["a"]}, schema)
        assert False
    except jsonschema.ValidationError:
        pass
```

- [ ] **Step 2: Run, expect fail.**
- [ ] **Step 3: Implement** the JSON Schema (required `ref_image_path`, `prompts`; typed optionals with the Task 3.6 defaults + ranges: `num_overlap_frame` 1–8, `num_motion_latent` 0–5, `cfg_scale` 1–10) and `operators/svi2_render.yaml` (method `svi2.video.render.start`, input schema ref, output artifact mp4) mirroring LongCat operator shape.
- [ ] **Step 4: Run, expect pass.**
- [ ] **Step 5: Commit** `feat(svi2-pro): render operator + params schema`.

### Task 4.4: `conftest.py` + full offline suite green

**Files:**
- Create: `worker/tests/conftest.py`, `worker/tests/__init__.py`

- [ ] **Step 1:** Port LongCat `conftest.py` (pythonpath/src fixture if needed). 
- [ ] **Step 2: Run the whole suite**

Run: `cd extensions/builtin/svi2-pro/worker && uv run pytest -v`
Expected: all PASS (ffmpeg/torch-gated tests skip cleanly if those aren't installed in the base env).

- [ ] **Step 3:** Generate `uv.lock`: `uv lock` in `worker/`. Commit `chore(svi2-pro): conftest + lockfile; full offline suite green`.

### Task 4.5: Host-boundary verification

**Files:** none (verification only)

- [ ] **Step 1:** Confirm zero host changes:

Run: `git diff --name-only main...HEAD -- crates/ apps/web/ migrations/ | grep -v '^extensions/' || echo CLEAN`
Expected: `CLEAN` (no host files touched).

- [ ] **Step 2:** Confirm no extension-id leakage into host (sanity):

Run: `grep -rn "svi2-pro\|svi2_pro\|svi2.video" crates/ apps/web/src/ 2>/dev/null || echo NO-HOST-COUPLING`
Expected: `NO-HOST-COUPLING`.

- [ ] **Step 3:** If clean, no commit needed. If anything shows up, STOP — boundary violation; relocate into the extension tree.

---

## Self-Review

**Spec coverage vs `2026-05-29-svi2-pro-design.md`:**
- §1 engine (hand-rolled, vendor WanModel) → Tasks 0.x, 2.1. ✔
- §2 models (6 artifacts) → Tasks 1.3, 1.1. ✔
- §3 fp8 + runtime-additive LoRA → Tasks 2.3, 2.4. ✔
- §4 16 GB expert swap (boundary 0.875) → Task 3.1 + 2.5 + 3.6. ✔
- §5 per-clip SVI loop (anchor-0, latent recycle, overlap) → Tasks 3.2, 3.6. ✔
- §6 module map → all modules created across Phases 0–3. ✔
- §7 extension shell (manifest, versions, scripts, pyproject) → Tasks 0.2, 0.8, 1.3, 4.1–4.3. ✔
- §8 error handling (NaN guard, OOM, schema, model-missing) → Tasks 3.6, 4.3, 1.1. ✔
- §9 testing (fake, rpc, fp8, lora, router, chain, installer, report) → Tasks 0.7, 0.3, 2.3, 2.4, 3.1, 3.2, 1.1, 3.4. ✔
- §10 host boundary → Task 4.5. ✔
- §11 risks → de-risk spikes Task 2.1 (WanModel), 2.5 (fp8 key + LoRA hit-rate), attention 2.2, flash_attn resolved in 0.2.

**Placeholder scan:** Tasks 2.1 and 2.5 are explicit investigation/GPU-spike tasks with concrete acceptance criteria + source file references — not vague TODOs. All deterministic tasks carry full code. The vendored `WanModel` internals are intentionally NOT fabricated (would be hallucination); Task 2.1 copies real files from the zip and verifies by forward-shape test.

**Type consistency:** `ExpertSelector.select() -> "high"|"low"`; `build_conditioning_latents(anchor_lat, prev_last_latent, total_latent_frames, num_motion_latent)`; `stitch_clip_frames(clips, num_overlap_frame)`; `ScaledFP8Linear(in_f, out_f, weight_fp8, scale_weight)`; `apply_additive_lora(base_out, x, A, B, alpha)`; `register_svi2_handlers(worker)`; `validate_render_params(params)->dict`; `resolve_artifacts(path)->list[Artifact]`. Names consistent across tasks.

**Known dependency-order note:** Task 0.6 imports `pipeline_svi2` lazily (only for `rtx50-fp8`) and `installer` eagerly — Task 1.1 must land an import-light `register_installer_handlers` (it does). The fake-profile entrypoint test (0.6) does not import the real pipeline.

---

## Execution Handoff

Plan complete and saved to `docs/research/plans/2026-05-29-svi2-pro-plan.md` (note: `docs/superpowers/` is gitignored in this repo, so plans live under `docs/research/plans/`).

Two execution options:
1. **Subagent-Driven (recommended)** — fresh subagent per task, two-stage review between tasks, fast iteration.
2. **Inline Execution** — execute tasks in this session via executing-plans, batch with checkpoints.

Which approach?
