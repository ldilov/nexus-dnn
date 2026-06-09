"""Subprocess proof that fd-1 (the JSON-RPC wire) is isolated from
subprocess / OS-level writes.

Swapping `sys.stdout` only catches Python-level `print()`. torch's
`cpp_extension.load()` spawns ninja/nvcc/cl as subprocesses that inherit
OS fd 1 and write `[1/N]` build progress straight to the wire, producing
the host-side `worker emitted malformed frame` warnings. `_isolate_stdout_fd`
dup2's fd 1 to stderr so those writes can never reach the framer.
"""

from __future__ import annotations

import subprocess
import sys
import textwrap


_CHILD = textwrap.dedent(
    """
    import os, sys
    from emotion_tts_worker.__main__ import _isolate_stdout_fd

    framer = _isolate_stdout_fd()
    # Simulate ninja writing build progress to the inherited OS fd 1.
    os.write(1, b"[1/3] Building anti_alias_activation_cuda\\n")
    # The framer is the only thing allowed on the wire.
    framer.write('{"jsonrpc":"2.0","id":1,"result":"ok"}\\n')
    framer.flush()
    """
)


def test_fd1_writes_never_reach_the_wire() -> None:
    proc = subprocess.run(
        [sys.executable, "-c", _CHILD],
        capture_output=True,
        text=True,
        timeout=60,
    )
    assert proc.returncode == 0, proc.stderr
    # The wire (stdout) carries ONLY the JSON frame — no ninja chatter.
    assert proc.stdout.strip() == '{"jsonrpc":"2.0","id":1,"result":"ok"}'
    # The ninja-style subprocess output landed in the log (stderr) instead.
    assert "[1/3] Building" in proc.stderr
