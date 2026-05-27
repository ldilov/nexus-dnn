#!/usr/bin/env bash
# Operator wrapper for gpu_smoke_boundary_soft_pin.py.
#
# Activates the worker uv venv and runs the soft-pin boundary smoke.
# Renders the same 3-scene storyboard twice — once hard-cut, once soft —
# and asserts the soft boundary's transition_break_score is strictly
# lower than the hard one. Passes through any extra args (e.g.
# --wall-budget=900, --skip-assert).
#
# Prereqs:
#   - CUDA-capable GPU (RTX-class for distill, ~15 GiB usable VRAM)
#   - worker venv hydrated with [diffusers] extra
#   - NEXUS_HOST_DATA_DIR points to a writable dir with weights present
#   - ffmpeg + ffprobe on PATH (for MP4 decode and frame count probe)
#
# Exit codes propagate from gpu_smoke_boundary_soft_pin.py:
#   0 ok (soft<hard), 1 unexpected, 2 OOM/VRAM-budget, 3 missing weights,
#   4 contract fail (frame count, wall exceeded, soft>=hard)
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

if ! command -v ffmpeg >/dev/null 2>&1 || ! command -v ffprobe >/dev/null 2>&1; then
  echo "[smoke] FAIL prereq: ffmpeg / ffprobe not on PATH (required for MP4 decode + scoring)" >&2
  exit 2
fi

cd "${WORKER_DIR}"
exec uv run --extra diffusers python "${SCRIPT_DIR}/gpu_smoke_boundary_soft_pin.py" "$@"
