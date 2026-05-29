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
