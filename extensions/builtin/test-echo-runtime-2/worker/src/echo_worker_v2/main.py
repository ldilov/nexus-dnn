"""Spec 032 US4 fixture — `v2:`-prefix echo variant.

Same JSON-RPC stdio shape as the v1 worker
(extensions/builtin/test-echo-runtime) but the `echo` method prepends
`v2:` to the returned text. Used by the multi-extension integration
test to prove two runtimes can coexist AND produce distinguishable
output when sent concurrent RPCs.
"""
from __future__ import annotations

import json
import sys

PROTOCOL_VERSION = "1.0"
WORKER_VERSION = "0.0.1"
ACCEPTS_METHODS = ["handshake", "health", "shutdown", "echo"]
NOTIFICATION_METHODS: list[str] = []


def _emit(payload: dict) -> None:
    sys.stdout.write(json.dumps(payload, separators=(",", ":")) + "\n")
    sys.stdout.flush()


def _ok(req_id: int, result: dict) -> None:
    _emit({"jsonrpc": "2.0", "id": req_id, "result": result})


def _err(req_id: int | None, code: int, message: str) -> None:
    _emit({"jsonrpc": "2.0", "id": req_id, "error": {"code": code, "message": message}})


def _handle(req: dict) -> bool:
    req_id = req.get("id")
    method = req.get("method")
    params = req.get("params") or {}

    if method == "handshake":
        _ok(
            req_id,
            {
                "protocol_version": PROTOCOL_VERSION,
                "worker_version": WORKER_VERSION,
                "accepts_methods": ACCEPTS_METHODS,
                "notification_methods": NOTIFICATION_METHODS,
            },
        )
        return True

    if method == "health":
        _ok(req_id, {"ok": True})
        return True

    if method == "echo":
        text = params.get("text", "")
        _ok(req_id, {"text": f"v2:{text}"})
        return True

    if method == "shutdown":
        _ok(req_id, {})
        return False

    _err(req_id, -32601, f"method not found: {method}")
    return True


def main() -> int:
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError as e:
            _err(None, -32700, f"parse error: {e}")
            continue
        try:
            keep_running = _handle(req)
        except Exception as e:  # noqa: BLE001 — worker boundary
            _err(req.get("id"), -32603, f"internal error: {e}")
            continue
        if not keep_running:
            break
    return 0


if __name__ == "__main__":
    sys.exit(main())
