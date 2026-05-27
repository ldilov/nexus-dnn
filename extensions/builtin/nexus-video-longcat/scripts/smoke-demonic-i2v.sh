#!/usr/bin/env bash
# Operator wrapper for gpu_smoke_demonic_i2v.py.
#
# Drives LLM-planned multiscene i2v render of a demonic-possession scene
# starting from a single conditioning image. Phase 1 calls plan.expand
# (LLM via HttpLeaseClient when NEXUS_HOST_PORT is set; graceful
# deterministic fallback otherwise). Phase 2 renders 2 scenes at 480p
# distill on the LongCat FP8 pipeline.
#
# Usage:
#   smoke-demonic-i2v.sh --image D:/inputs/nun.jpg [extra flags]
#
# Pass --dry-run to exercise Phase 1 only (no GPU). The full smoke
# emits a JSON report to stdout (or --report-out PATH).
#
# Exit codes propagate from gpu_smoke_demonic_i2v.py.
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
  echo "[smoke]   run: cd ${WORKER_DIR} && uv sync --extra diffusers" >&2
  exit 2
fi

cd "${WORKER_DIR}"
EXTRA_EXTRAS=""
for arg in "$@"; do
  if [ "$arg" = "--dry-run" ]; then
    EXTRA_EXTRAS=""  # dry-run skips GPU; no diffusers extra needed
    break
  fi
  EXTRA_EXTRAS="--extra diffusers"
done

# When NOT dry-run, default to including the diffusers extra.
if [ -z "${EXTRA_EXTRAS}" ]; then
  case "$*" in
    *--dry-run*) ;;
    *) EXTRA_EXTRAS="--extra diffusers" ;;
  esac
fi

exec uv run ${EXTRA_EXTRAS} python "${SCRIPT_DIR}/gpu_smoke_demonic_i2v.py" "$@"
