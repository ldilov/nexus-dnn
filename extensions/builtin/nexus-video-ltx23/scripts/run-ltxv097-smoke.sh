#!/usr/bin/env bash
# Runs an ltxv097 python smoke through the worker venv so the operator
# does not have to spell out the venv interpreter + PYTHONPATH by hand.
# Paired with run-ltxv097-smoke.ps1 (Windows + Linux parity).
#
# Usage: ./run-ltxv097-smoke.sh <smoke-script.py> [env passthrough...]
#   ./run-ltxv097-smoke.sh smoke-ltxv097-multiscene-20s.py
#   NEXUS_I2V_TIER=1 ./run-ltxv097-smoke.sh smoke-ltxv097-multiscene-20s.py
#   ./run-ltxv097-smoke.sh smoke-ltxv097-negprompt-verify.py
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT="$(cd "$HERE/.." && pwd)"

PY="$EXT/worker/.venv/Scripts/python.exe"
[[ -x "$PY" ]] || PY="$EXT/worker/.venv/bin/python"
[[ -x "$PY" ]] || { echo "worker venv not found under $EXT/worker/.venv — install the profile first" >&2; exit 2; }

[[ $# -ge 1 ]] || { echo "usage: $0 <smoke-script.py> [args...]" >&2; exit 2; }
SMOKE="$1"; shift
[[ -f "$SMOKE" ]] || SMOKE="$HERE/$SMOKE"
[[ -f "$SMOKE" ]] || { echo "smoke script not found: $SMOKE" >&2; exit 2; }

export PYTHONPATH="$EXT/worker/src${PYTHONPATH:+:$PYTHONPATH}"
exec "$PY" "$SMOKE" "$@"
