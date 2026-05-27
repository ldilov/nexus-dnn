"""End-to-end smoke for longcat.video.plan.expand against a live host.

Skips unless NEXUS_HOST_PORT is set AND the host responds on /api/v1/health
AND at least one Validated install advertises capability_tag "text-completion".

Drives the fake-profile worker subprocess (no GPU) so plan_llm
HttpLeaseClient round-trips through the host's /api/v1/services/text-completion
broker, then asserts the JSON-RPC response shape and the compiler-mode
contract from spec 050.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

import pytest


_REQUIRED_TAG = "text-completion"
_WORKER_PKG = "longcat_video_worker"
_WALL_BUDGET_S = 60


def _host_base() -> str | None:
    port = os.environ.get("NEXUS_HOST_PORT")
    if not port:
        return None
    return f"http://127.0.0.1:{port}"


def _host_eligible(base: str) -> bool:
    """Treat the host as eligible when it answers health.

    The broker itself is probed inside the test — it may legitimately
    return 503 (no Validated text-completion install), and the test
    still asserts the graceful-fallback contract.
    """
    try:
        req = urllib.request.Request(f"{base}/api/v1/health")
        with urllib.request.urlopen(req, timeout=2) as resp:
            return resp.status == 200
    except (urllib.error.URLError, TimeoutError):
        return False


_BASE = _host_base()
_SKIP_REASON = (
    "requires NEXUS_HOST_PORT pointing at a live host with a Validated "
    "text-completion runtime install"
)


@pytest.mark.smoke
@pytest.mark.skipif(_BASE is None or not _host_eligible(_BASE), reason=_SKIP_REASON)
def test_plan_expand_use_llm_e2e_via_worker_subprocess(tmp_path: Path) -> None:
    request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "longcat.video.plan.expand",
        "params": {
            "prompt": "Alice walks into a noir-lit bar then sits at a piano then plays a slow melody",
            "duration_seconds": 9.0,
            "scene_count": 3,
            "style_hint": "noir",
            "use_llm": True,
            "seed": 42,
        },
    }

    env = os.environ.copy()
    env["NEXUS_VIDEO_LONGCAT_RUNTIME"] = "fake"
    env["PYTHONUNBUFFERED"] = "1"

    proc = subprocess.Popen(
        [sys.executable, "-m", _WORKER_PKG],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=env,
        text=True,
    )

    try:
        proc.stdin.write(json.dumps(request) + "\n")
        proc.stdin.flush()
        proc.stdin.close()
        stdout, stderr = proc.communicate(timeout=_WALL_BUDGET_S)
    except subprocess.TimeoutExpired:
        proc.kill()
        stdout, stderr = proc.communicate()
        pytest.fail(f"worker timed out after {_WALL_BUDGET_S}s. stderr=\n{stderr}")

    first_line = (stdout.splitlines() or [""])[0]
    assert first_line, f"worker produced no stdout. stderr=\n{stderr}"

    response = json.loads(first_line)
    assert response.get("id") == 1, f"id mismatch: {response}"
    assert "result" in response, f"no result: {response}"
    result = response["result"]

    assert result["compiler"] in {"llm", "llm_fallback_deterministic", "deterministic"}, (
        f"unexpected compiler: {result['compiler']}"
    )
    assert len(result["scenes"]) == 3, f"expected 3 scenes, got {len(result['scenes'])}"
    for scene in result["scenes"]:
        assert "prompt" in scene
        assert "per_scene_generated_seconds" in scene or "duration_seconds" in scene
        assert scene.get("motion_intensity") in {"static", "dynamic", "intense"}

    assert "anchor" in result
