"""Process entrypoint — runs the worker with the full Phase-4 handler set."""

from __future__ import annotations

import os
import sys
import time
from pathlib import Path

# stdout is the JSON-RPC wire protocol, NOT a log channel. Save the real
# stdout privately and replace `sys.stdout` with stderr so any rogue
# `print()` (from torch / transformers / huggingface_hub / scipy / etc.)
# goes to the log instead of corrupting our framer with empty lines or
# non-JSON output. The Worker's `emit()` writes directly to the saved
# `_JSONRPC_STDOUT` reference, bypassing the swap.
_JSONRPC_STDOUT = sys.stdout  # captured BEFORE any heavy import
sys.stdout = sys.stderr  # type: ignore[assignment]

# Expose the captured stdout via an attribute the Worker reads at init.
# Module attribute lookup is the simplest cross-module handoff that
# doesn't introduce a circular import.
sys.__nexus_jsonrpc_stdout__ = _JSONRPC_STDOUT  # type: ignore[attr-defined]

# OpenMP duplicate-runtime workaround. PyTorch's MKL and scipy's OpenBLAS
# each ship their own `libiomp5md.dll`; loading both into one process on
# Windows can lock up indefinitely inside OMP's duplicate-detection path.
# Setting this env var BEFORE any heavy import is what counts. Defense-
# in-depth: also set on the host launch spec.
os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")

# Make `ninja` findable by torch.utils.cpp_extension's
# `verify_ninja_availability()`, which does
# `subprocess.run(['ninja', '--version'])` against the OS PATH. The
# `ninja` PyPI package vendors the binary inside its own package dir
# and exposes `ninja.BIN_DIR` pointing at it; that's the most reliable
# way to surface the binary regardless of venv style (uv, venv, conda).
#
# Falls back to `<sys.executable parent>` (Windows: `Scripts/`, POSIX:
# `bin/`) when the package isn't importable yet — covers the case
# where ninja is installed via `pip install --target` or other
# unusual layouts. Prepending so the venv's ninja takes precedence
# over any older system-wide one.
#
# Without this, BigVGAN's vocoder JIT logs:
#     `RuntimeError('Ninja is required to load C++ extensions ...')`
# even with `ninja>=1.11` declared in `pyproject.toml`.
def _ensure_ninja_on_path() -> str | None:
    candidates: list[str] = []
    try:
        import ninja as _ninja  # type: ignore[import-untyped]
        bin_dir = getattr(_ninja, "BIN_DIR", None)
        if bin_dir:
            candidates.append(bin_dir)
    except ImportError:
        pass
    # Fallback: venv bindir from sys.executable.
    venv_bindir = os.path.dirname(sys.executable)
    if venv_bindir:
        candidates.append(venv_bindir)
    path_parts = os.environ.get("PATH", "").split(os.pathsep)
    for candidate in candidates:
        if candidate and candidate not in path_parts:
            os.environ["PATH"] = candidate + os.pathsep + os.environ.get("PATH", "")
            path_parts = os.environ["PATH"].split(os.pathsep)
    # Diagnostic so future runs can verify the fix landed.
    ninja_exe = "ninja.exe" if os.name == "nt" else "ninja"
    for d in os.environ.get("PATH", "").split(os.pathsep):
        if d and os.path.exists(os.path.join(d, ninja_exe)):
            print(f"[startup] ninja found at {os.path.join(d, ninja_exe)}",
                  file=sys.stderr, flush=True)
            return d
    print("[startup] ninja NOT on PATH — BigVGAN vocoder JIT will fall back "
          "to torch. Install with `uv sync` in the worker dir.",
          file=sys.stderr, flush=True)
    return None


_ensure_ninja_on_path()


def _do_heavy_imports_serially() -> None:
    """Import scipy / sklearn / transformers / indextts.infer_v2 + torch on
    the main thread, BEFORE any other thread or the asyncio event loop is
    started.

    Why serial-on-main-thread instead of a daemon-thread warmer:

      * `scipy.special` standalone imports in <1s, but in our worker context
        it has been observed to hang for 5+ minutes when other Python threads
        (stdin pump, heartbeat, asyncio idle wakeup) are alive at the same
        time as the import. The Windows DLL loader-lock + Python import-lock
        + OMP runtime detection interact pathologically under thread
        contention.
      * Doing imports BEFORE any thread spawns gives us "single-threaded
        Python" semantics — exactly what the standalone diagnostic uses.
        scipy.special then loads as fast on this code path as it does
        standalone (~1s).
      * The host's handshake timeout is 60s. Pre-imports take ~50s on a
        cold machine; tight but works. If you observe handshake-timeout
        errors, raise `HANDSHAKE_TIMEOUT` host-side rather than re-
        introducing a daemon-thread warmer.
    """
    started = time.monotonic()
    print("[warm] starting heavy imports (single-threaded, sequential)…",
          file=sys.stderr, flush=True)
    # torch first — it sets up MKL/OMP. With KMP_DUPLICATE_LIB_OK set, the
    # subsequent scipy import won't deadlock on the duplicate detection.
    chain = (
        ("torch", "torch"),
        ("scipy", "scipy"),
        ("scipy.special", "scipy.special"),
        ("sklearn", "sklearn"),
        ("transformers", "transformers"),
        ("indextts.infer_v2", "indextts.infer_v2"),
    )
    for label, mod in chain:
        step_start = time.monotonic()
        try:
            __import__(mod)
        except Exception as exc:
            elapsed = time.monotonic() - step_start
            import traceback as _tb
            print(f"[warm] {label} import FAILED after {elapsed:.1f}s: "
                  f"{type(exc).__name__}: {exc}\n{_tb.format_exc()}",
                  file=sys.stderr, flush=True)
            # Don't abort the worker — let the next model.load surface
            # a structured error from the lazy import path.
            return
        elapsed = time.monotonic() - step_start
        print(f"[warm] imported {label} in {elapsed:.1f}s",
              file=sys.stderr, flush=True)
    total = time.monotonic() - started
    print(f"[warm] heavy imports done in {total:.1f}s — handshake will respond next",
          file=sys.stderr, flush=True)


def main() -> int:
    # Force line-buffering on stderr so each `print(..., flush=True)` flushes
    # immediately even when the parent (host) is reading our stderr through
    # a pipe (Windows default-buffers pipe stderr in 4 KB blocks, which can
    # hide our progress prints for minutes).
    try:
        sys.stderr.reconfigure(line_buffering=True)  # type: ignore[attr-defined]
    except Exception:
        pass

    print("[main] worker.__main__ entered", file=sys.stderr, flush=True)

    # Heavy imports BEFORE any thread spawns. See `_do_heavy_imports_serially`
    # docstring for the rationale — short version: avoids GIL-vs-loader-lock
    # contention that intermittently stalls scipy.special for 5+ minutes.
    _do_heavy_imports_serially()

    # The warm-imports event is no longer used by ensure_model in this
    # arrangement (imports finish before any handler can run), but we set
    # it for backwards-compat with any caller that still waits on it.
    from .warm import WARM_DONE
    WARM_DONE.set()

    # Now safe to import worker components — they may transitively touch
    # the modules we just warmed.
    from .handlers import register_phase4_handlers
    from .indextts_adapter import AdapterSettings, IndexTtsAdapter
    from .main import Worker
    from .synthesis import SynthesisService

    worker = Worker()
    model_dir = os.environ.get("EMOTIONTTS_MODEL_DIR_ABS")
    adapter: IndexTtsAdapter | None = None
    synthesis: SynthesisService | None = None

    if model_dir and Path(model_dir).exists():
        adapter = IndexTtsAdapter(AdapterSettings(model_dir_abs=model_dir))
        synthesis = SynthesisService(adapter=adapter, emitter=worker._emit_sync)
        print(f"[main] adapter constructed, model_dir={model_dir}",
              file=sys.stderr, flush=True)
    else:
        print(f"[main] WARNING: no adapter — EMOTIONTTS_MODEL_DIR_ABS={model_dir!r}",
              file=sys.stderr, flush=True)

    register_phase4_handlers(worker, adapter=adapter, synthesis=synthesis)
    print("[main] handlers registered, entering asyncio.run(worker.run())",
          file=sys.stderr, flush=True)

    import asyncio
    return asyncio.run(worker.run())


if __name__ == "__main__":
    sys.exit(main())
