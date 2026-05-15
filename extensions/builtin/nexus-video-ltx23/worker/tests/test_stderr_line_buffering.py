"""Regression test for the 22-minute dead-silence bug observed during the
Item E smoke run on RTX 5070 Ti (2026-05-14). Worker logs were stuck in
Python's TextIOWrapper buffer until tqdm overflowed it. Fix lives in
`ltx_video_worker.__main__._hijack_stdout`."""

from __future__ import annotations

import io
import sys

import pytest

from ltx_video_worker import __main__ as worker_main


@pytest.fixture
def restore_std_streams():
    saved_stdout = sys.stdout
    saved_stderr = sys.stderr
    saved_jsonrpc = getattr(sys, "__nexus_jsonrpc_stdout__", None)
    try:
        yield
    finally:
        sys.stdout = saved_stdout
        sys.stderr = saved_stderr
        if saved_jsonrpc is None:
            if hasattr(sys, "__nexus_jsonrpc_stdout__"):
                delattr(sys, "__nexus_jsonrpc_stdout__")
        else:
            sys.__nexus_jsonrpc_stdout__ = saved_jsonrpc


def test_hijack_stdout_makes_stderr_line_buffered(restore_std_streams):
    sys.stdout = io.TextIOWrapper(
        io.BytesIO(), encoding="utf-8", line_buffering=False, write_through=False
    )
    sys.stderr = io.TextIOWrapper(
        io.BytesIO(), encoding="utf-8", line_buffering=False, write_through=False
    )

    assert sys.stderr.line_buffering is False

    worker_main._hijack_stdout()

    assert sys.stderr.line_buffering is True, (
        "stderr must be line-buffered so logging.StreamHandler writes flush "
        "per record — see 22-min hang on 2026-05-14"
    )
    assert sys.__nexus_jsonrpc_stdout__.line_buffering is True


def test_hijack_stdout_survives_streams_without_reconfigure(restore_std_streams):
    class FakeStream:
        def write(self, _):
            return 0

        def flush(self):
            pass

    sys.stdout = FakeStream()
    sys.stderr = FakeStream()

    worker_main._hijack_stdout()
