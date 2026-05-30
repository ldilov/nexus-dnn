#!/usr/bin/env bash
# Verify svi2-pro attention backends on the GPU box.
#
# Cross-platform pair: smoke-attention-backends.sh / .ps1.
# Runs attention_verify.py inside the worker venv: builds synthetic q/k/v,
# runs each available backend, compares cosine-similarity vs the SDPA
# reference. sm120-gated backends (sage3_fp4, flash3_fp4) skip gracefully on
# non-Blackwell GPUs.
#
# Usage:
#   ./scripts/smoke-attention-backends.sh                      # all backends
#   ./scripts/smoke-attention-backends.sh --backends sage2     # one backend
#   ./scripts/smoke-attention-backends.sh --backends sage2,sage3_fp4 --json
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKER_DIR="${EXT_DIR}/worker"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: smoke-attention-backends.sh [--backends LIST] [--seq N] [--dtype bfloat16|float16] [--json]"
  exit 0
fi

if ! command -v uv >/dev/null 2>&1; then
  echo "[smoke] FAIL prereq: uv not on PATH" >&2
  exit 2
fi
if [ ! -d "${WORKER_DIR}/.venv" ]; then
  echo "[smoke] FAIL prereq: worker venv not found at ${WORKER_DIR}/.venv" >&2
  echo "[smoke]   run: cd ${EXT_DIR} && ./scripts/install.sh --profile rtx50-fp8" >&2
  exit 2
fi

cd "${WORKER_DIR}"
exec uv run --extra diffusers --extra flash python "${SCRIPT_DIR}/attention_verify.py" "$@"
