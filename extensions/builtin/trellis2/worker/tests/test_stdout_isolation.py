"""fd-1 isolation: subprocess/raw output must never reach the JSON-RPC wire.

After `_hijack_stdout`, fd 1 is stderr and only the stashed RPC handle reaches
stdout — the same crash-prevention seam svi2-pro uses.
"""
import os
import subprocess
import sys
from pathlib import Path

WORKER = Path(__file__).resolve().parents[1] / "src"


def _run(snippet: str) -> subprocess.CompletedProcess:
    env = {**os.environ, "PYTHONPATH": str(WORKER)}
    return subprocess.run(
        [sys.executable, "-c", snippet],
        capture_output=True,
        text=True,
        env=env,
        timeout=30,
    )


def test_raw_fd1_write_goes_to_stderr_not_rpc_wire():
    snippet = (
        "import os,sys;"
        "from trellis2_worker.__main__ import _hijack_stdout;"
        "_hijack_stdout();"
        "os.write(1, b'CONTAMINATION\\n');"
        "sys.__nexus_jsonrpc_stdout__.write('RPCLINE\\n');"
        "sys.__nexus_jsonrpc_stdout__.flush()"
    )
    p = _run(snippet)
    assert "RPCLINE" in p.stdout, f"rpc wire lost its frame: {p.stdout!r}"
    assert "CONTAMINATION" not in p.stdout, f"raw fd1 leaked into wire: {p.stdout!r}"
    assert "CONTAMINATION" in p.stderr, f"redirected output missing from stderr: {p.stderr!r}"


def test_child_process_stdout_isolated_from_rpc_wire():
    if sys.platform == "win32":
        import pytest

        pytest.skip("child fd-1 inheritance is POSIX; worker runs on Linux")
    snippet = (
        "import os,sys;"
        "from trellis2_worker.__main__ import _hijack_stdout;"
        "_hijack_stdout();"
        "os.system('echo CONTAMINATION');"
        "sys.__nexus_jsonrpc_stdout__.write('RPCLINE\\n');"
        "sys.__nexus_jsonrpc_stdout__.flush()"
    )
    p = _run(snippet)
    assert "RPCLINE" in p.stdout, f"rpc wire lost its frame: {p.stdout!r}"
    assert "CONTAMINATION" not in p.stdout, f"child leaked into wire: {p.stdout!r}"
