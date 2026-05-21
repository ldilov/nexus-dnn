#!/usr/bin/env bash
# Runs an ltxv2 python smoke through the worker venv so the operator
# does not have to spell out the venv interpreter + PYTHONPATH by hand.
# Paired with run-ltxv2-smoke.ps1 (Windows + Linux parity).
#
# Usage: ./run-ltxv2-smoke.sh [<smoke-script.py>] [env passthrough...]
#   ./run-ltxv2-smoke.sh                                  # i2v render smoke
#   ./run-ltxv2-smoke.sh smoke-ltxv2-load.py              # stack + encoder load
#   ./run-ltxv2-smoke.sh smoke-ltxv2-multiscene.py        # 2-3 scene continuation
#   NEXUS_HOST_DATA_DIR=/data/.nexus ./run-ltxv2-smoke.sh smoke-ltxv2-render.py
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT="$(cd "$HERE/.." && pwd)"

PY="$EXT/worker/.venv/Scripts/python.exe"
[[ -x "$PY" ]] || PY="$EXT/worker/.venv/bin/python"
[[ -x "$PY" ]] || { echo "worker venv not found under $EXT/worker/.venv — install the profile first" >&2; exit 2; }

# Default to the render smoke; accept an optional first arg to override.
SMOKE="${1:-smoke-ltxv2-render.py}"
[[ $# -ge 1 ]] && shift || true
[[ -f "$SMOKE" ]] || SMOKE="$HERE/$SMOKE"
[[ -f "$SMOKE" ]] || { echo "smoke script not found: $SMOKE" >&2; exit 2; }

export PYTHONPATH="$EXT/worker/src${PYTHONPATH:+:$PYTHONPATH}"
exec "$PY" "$SMOKE" "$@"
