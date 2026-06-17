"""Process entrypoint — runs the worker with the full Phase-4 handler set."""

from __future__ import annotations

import os
import sys
import time
from pathlib import Path

def _isolate_stdout_fd() -> object:
    """Hard-isolate the JSON-RPC wire (OS fd 1) from non-frame output.

    Swapping `sys.stdout` only catches Python-level writes. Subprocesses
    spawned by torch's `cpp_extension.load()` (ninja, nvcc, cl) inherit OS
    fd 1 and write `[1/N]` build progress straight to the wire — ninja
    prints it even on a successful build — corrupting the host framer
    (`worker emitted malformed frame`). We dup the real fd 1 to a private
    fd for the framer, then point fd 1 at stderr so every inherited write
    lands in the log. Returns the framer file object; also stashes it on
    `sys.__nexus_jsonrpc_stdout__`, which `main.Worker.emit` reads.

    Falls back to a plain `sys.stdout`/`sys.stderr` swap when stdio has no
    real fd (pytest capture, embedded interpreter).
    """
    framer: object
    try:
        wire_fd = os.dup(1)
        framer = os.fdopen(wire_fd, "w", buffering=1, encoding="utf-8", newline="\n")
        os.dup2(sys.stderr.fileno(), 1)
    except (OSError, ValueError, AttributeError):
        framer = sys.stdout
    sys.stdout = sys.stderr  # type: ignore[assignment]
    sys.__nexus_jsonrpc_stdout__ = framer  # type: ignore[attr-defined]
    return framer


# OpenMP duplicate-runtime workaround. PyTorch's MKL and scipy's OpenBLAS
# each ship their own `libiomp5md.dll`; loading both into one process on
def _set_omp_workaround() -> None:
    os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")

# Make `ninja` findable by torch.utils.cpp_extension's
# `verify_ninja_availability()`, which does
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
    try:
        sys.stderr.reconfigure(line_buffering=True)  # type: ignore[attr-defined]
    except Exception:
        pass

    # Protect the JSON-RPC wire BEFORE any heavy import or subprocess spawn.
    _isolate_stdout_fd()
    _set_omp_workaround()
    _ensure_ninja_on_path()

    print("[main] worker.__main__ entered", file=sys.stderr, flush=True)

    # Heavy imports BEFORE any thread spawns. See `_do_heavy_imports_serially`
    # docstring for the rationale — short version: avoids GIL-vs-loader-lock
    _do_heavy_imports_serially()

    # The warm-imports event is no longer used by ensure_model in this
    # arrangement (imports finish before any handler can run), but we set
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
