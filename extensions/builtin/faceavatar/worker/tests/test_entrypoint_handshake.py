import json
import os
import subprocess
import sys
from pathlib import Path

WORKER = Path(__file__).resolve().parents[1] / "src"


def _spawn(method: str, req_id: int):
    env = {**os.environ, "PYTHONPATH": str(WORKER), "NEXUS_3D_FACEAVATAR_RUNTIME": "fake"}
    p = subprocess.Popen(
        [sys.executable, "-m", "faceavatar_worker"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
        env=env,
    )
    out, _ = p.communicate(
        '{"jsonrpc":"2.0","id":%d,"method":"%s","params":{}}\n' % (req_id, method),
        timeout=30,
    )
    line = [l for l in out.splitlines() if l.strip()][0]
    return json.loads(line)["result"]


def test_subprocess_handshake_roundtrip():
    result = _spawn("handshake", 1)
    assert result["runtime_id"] == "nexus.3d.faceavatar.fake"


def test_subprocess_health_returns_ready():
    result = _spawn("faceavatar.runtime.health", 2)
    assert result["status"] == "ready"
    assert result["runtime_id"] == "nexus.3d.faceavatar.fake"
