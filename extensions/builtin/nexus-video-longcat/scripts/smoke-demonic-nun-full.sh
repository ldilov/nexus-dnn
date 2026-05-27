#!/usr/bin/env bash
# Operator wrapper for gpu_smoke_demonic_nun_full.py.
#
# Renders the 3-scene possession arc with soft transitions, refinement,
# and RTX 2x upscale. Two resolution profiles:
#   --profile 1080p  → 960x540 draft × RTX 2× → 1920x1080 final (default)
#   --profile 720p   → 640x360 draft × RTX 2× → 1280x720  final
#
# Pass through any extra args (e.g. --skip-score, --vram-budget=14.5).
#
# Prereqs:
#   - CUDA-capable GPU (RTX-class for distill + nvvfx)
#   - worker venv hydrated with [diffusers] + [rtx] extras
#   - NEXUS_HOST_DATA_DIR points to a writable dir with weights present
#   - ffmpeg + ffprobe on PATH (for boundary scoring)
#
# Exit codes:
#   0 ok, 1 unexpected, 2 OOM/VRAM-budget, 3 missing weights/nvvfx,
#   4 contract fail (frame count, wall exceeded)
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
  echo "[smoke] WARN: ffmpeg / ffprobe not on PATH; boundary scoring will be skipped" >&2
fi

cd "${WORKER_DIR}"
exec uv run --extra diffusers --extra rtx python "${SCRIPT_DIR}/gpu_smoke_demonic_nun_full.py" "$@"
