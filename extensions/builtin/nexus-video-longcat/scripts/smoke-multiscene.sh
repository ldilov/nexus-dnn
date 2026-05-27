#!/usr/bin/env bash
# Operator wrapper for gpu_smoke_multiscene.py.
#
# Activates the worker uv venv and runs the multiscene render smoke.
# Passes through any extra args (e.g. --repro, --wall-budget=300).
#
# Prereqs:
#   - CUDA-capable GPU (RTX-class for distill, ~14 GiB usable VRAM)
#   - worker venv hydrated with [diffusers] extra
#   - NEXUS_HOST_DATA_DIR points to a writable dir with weights present
#
# Exit codes propagate from gpu_smoke_multiscene.py:
#   0 ok, 1 unexpected, 2 OOM/VRAM-budget, 3 missing weights, 4 contract fail
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKER_DIR="${EXT_DIR}/worker"

if ! command -v uv >/dev/null 2>&1; then
  echo "[smoke] FAIL prereq: uv not on PATH" >&2
  exit 2
fi

if [ ! -d "${WORKER_DIR}/.venv" ]; then
  echo "[smoke] FAIL prereq: worker venv not found at ${WORKER_DIR}/.venv" >&2
  echo "[smoke]   run: cd ${WORKER_DIR} && uv sync --extra diffusers --extra rtx" >&2
  exit 2
fi

cd "${WORKER_DIR}"
exec uv run --extra diffusers python "${SCRIPT_DIR}/gpu_smoke_multiscene.py" "$@"
