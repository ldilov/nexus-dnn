import json
import os
import subprocess
import sys
from pathlib import Path

WORKER = Path(__file__).resolve().parents[1] / "src"


def test_subprocess_handshake_roundtrip():
    env = {**os.environ, "PYTHONPATH": str(WORKER), "NEXUS_3D_TRELLIS2_RUNTIME": "fake"}
    p = subprocess.Popen(
        [sys.executable, "-m", "trellis2_worker"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
        env=env,
    )
    out, _ = p.communicate(
        '{"jsonrpc":"2.0","id":1,"method":"handshake","params":{}}\n', timeout=30
    )
    line = [l for l in out.splitlines() if l.strip()][0]
    assert json.loads(line)["result"]["runtime_id"] == "nexus.3d.trellis2.fake"


def test_subprocess_health_returns_ready():
    env = {**os.environ, "PYTHONPATH": str(WORKER), "NEXUS_3D_TRELLIS2_RUNTIME": "fake"}
    p = subprocess.Popen(
        [sys.executable, "-m", "trellis2_worker"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
        env=env,
    )
    out, _ = p.communicate(
        '{"jsonrpc":"2.0","id":2,"method":"trellis2.runtime.health","params":{}}\n',
        timeout=30,
    )
    line = [l for l in out.splitlines() if l.strip()][0]
    result = json.loads(line)["result"]
    assert result["status"] == "ready"
    assert result["runtime_id"] == "nexus.3d.trellis2.fake"
