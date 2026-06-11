#!/usr/bin/env bash
# Operator wrapper for gpu_smoke.py.
#
# Runs the SVI2-Pro i2v demonic-nun smoke on an RTX 5070 Ti with the
# rtx50-fp8 profile.  Prereqs: weights downloaded via install.sh,
# worker venv built (install.sh handles both).
#
# Usage:
#   smoke-rtx50-fp8.sh --models-dir D:/models --ref-image D:/inputs/nun.jpg   # i2v
#   smoke-rtx50-fp8.sh --models-dir D:/models --mode t2v                       # t2v (bundled prompts)
#   smoke-rtx50-fp8.sh --models-dir D:/models --mode t2v --prompts-file P.txt   # t2v (own prompts)
#   smoke-rtx50-fp8.sh --help
#
# All additional args are forwarded to gpu_smoke.py.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKER_DIR="${EXT_DIR}/worker"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  echo "Usage: smoke-rtx50-fp8.sh --models-dir PATH [--ref-image PATH | --mode t2v] [options]"
  echo ""
  echo "Options forwarded to gpu_smoke.py:"
  echo "  --models-dir PATH       (required) path to downloaded model weights"
  echo "  --mode i2v|t2v          render mode (default i2v); t2v synthesizes clip 0 from the prompt"
  echo "  --ref-image PATH        i2v conditioning image (required for i2v; optional for t2v)"
  echo "  --seed N                numeric seed for the t2v clip-0 noise (reproducible)"
  echo "  --prompts-file PATH     override bundled demonic_nun_prompts.txt"
  echo "  --output PATH           output mp4 (default: videos/svi2_nun.mp4)"
  echo "  --num-clips N           number of clips to render (default: 4)"
  echo "  --height N              frame height (default: 832)"
  echo "  --width N               frame width (default: 480)"
  echo "  --cfg-scale F           CFG scale (default: 5.0)"
  echo "  --num-overlap-frame N   overlap frames between clips (default: 4)"
  echo "  --num-motion-latent N   motion latent count (default: 1)"
  exit 0
fi

if ! command -v uv >/dev/null 2>&1; then
  echo "[smoke] FAIL prereq: uv not on PATH" >&2
  echo "[smoke]   install uv: https://docs.astral.sh/uv/getting-started/installation/" >&2
  exit 2
fi

if [ ! -d "${WORKER_DIR}/.venv" ]; then
  echo "[smoke] FAIL prereq: worker venv not found at ${WORKER_DIR}/.venv" >&2
  echo "[smoke]   run: cd ${EXT_DIR} && ./scripts/install.sh --profile rtx50-fp8 --dest <models_dir>" >&2
  exit 2
fi

export NEXUS_VIDEO_SVI2_RUNTIME=rtx50-fp8

cd "${WORKER_DIR}"
exec uv run --extra diffusers --extra flash python "${SCRIPT_DIR}/gpu_smoke.py" "$@"
