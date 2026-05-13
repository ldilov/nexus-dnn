"""Shared input-safety helpers for worker RPC handlers.

The worker exposes stdio JSON-RPC to whatever process holds its
file descriptor — today that's the Rust host, but the contract is
file-descriptor-based, not auth-validated. Treat ``workdir``,
``run_id``, and ``plan`` as untrusted-shape inputs and validate at
the boundary so a malformed lease (or a future external integration)
can't escape the runs-dir sandbox or trigger ``AttributeError`` deep
in the pipeline.

These checks are intentionally cheap + lossless: they normalise via
``Path.resolve()`` only when an explicit allow-root is provided, and
otherwise just reject syntactically dangerous inputs.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any


_RUN_ID_PATTERN = re.compile(r"^[A-Za-z0-9_\-]{1,64}$")


def sanitize_run_id(run_id: Any, *, fallback: str | None = None) -> str:
    """Reject path-separator / non-printable characters in run_id.

    Allows the ULID alphabet (uppercase + digits), the legacy
    ``run_<hex>`` shape emitted by ``uuid.uuid4().hex[:12]``, and the
    test-fixture pattern ``run_test_001``. Anything containing slashes,
    backslashes, dots, or whitespace is refused — these are the only
    characters that matter for path-traversal in
    ``cfg.runs_dir.join(run_id)``.

    ``fallback`` only applies when ``run_id`` is None or empty. A
    malformed-but-non-empty value still raises so a crafted RPC can't
    silently bypass the check by being unparseable.
    """
    if run_id is None or (isinstance(run_id, str) and not run_id):
        if fallback is not None:
            return fallback
        raise ValueError("run_id is required when no fallback is provided")
    if isinstance(run_id, str) and _RUN_ID_PATTERN.match(run_id):
        return run_id
    raise ValueError(
        f"run_id must match [A-Za-z0-9_-]{{1,64}}; got {run_id!r}"
    )


def sanitize_workdir(workdir: Any, *, fallback: Path) -> Path:
    """Reject path-traversal components in workdir.

    Returns ``fallback`` when ``workdir`` is empty or None. Rejects
    paths containing ``..`` components anywhere in their parts; the
    caller can pass an absolute path so long as it doesn't try to
    traverse up. We don't enforce a hard root prefix here — the
    Rust host owns the runs-dir root and is responsible for passing
    paths under it. The worker just refuses the obvious escape shapes
    so a malformed call doesn't write ``../../etc/passwd``.
    """
    if workdir is None or (isinstance(workdir, str) and not workdir.strip()):
        return fallback
    if not isinstance(workdir, str):
        raise ValueError(f"workdir must be a string, got {type(workdir).__name__}")
    p = Path(workdir)
    if any(part == ".." for part in p.parts):
        raise ValueError(f"workdir must not contain '..' components; got {workdir!r}")
    return p


def ensure_dict(value: Any, *, name: str, default: dict[str, Any] | None = None) -> dict[str, Any]:
    """Validate that ``value`` is a dict, or return ``default`` for falsy.

    Used at handler entry points to fail fast on
    ``{plan: "not-a-dict"}`` instead of crashing deep in the loop with
    ``AttributeError: 'str' object has no attribute 'get'``.
    """
    if not value:
        return default if default is not None else {}
    if not isinstance(value, dict):
        raise ValueError(f"{name} must be an object/dict, got {type(value).__name__}")
    return value


def truncate_for_log(message: str, *, max_chars: int = 2048) -> str:
    """Cap an error message length before persisting / forwarding.

    Worker exceptions can carry multi-MB tensor dumps or full stack
    traces. SQLite rows + SSE notifications don't want that. Keep the
    head + a marker, drop the rest.
    """
    if len(message) <= max_chars:
        return message
    keep = max_chars - 32
    return f"{message[:keep]} … [truncated {len(message) - keep} chars]"
