#!/usr/bin/env bash
# Install an optional attention backend into the svi2-pro worker venv.
#
# Cross-platform pair: install-attention.sh (POSIX) / install-attention.ps1 (Windows).
# The 'flash2' backend is already vendored via the pyproject 'flash' extra and
# needs no action here. sage2 / sage3 / flash3 are hardware/build-specific and
# are installed on demand into the existing worker venv (NOT the locked deps).
#
# Usage:
#   ./scripts/install-attention.sh --backend sage2
#   ./scripts/install-attention.sh --backend sage3   # Blackwell sm120 only
#   ./scripts/install-attention.sh --backend flash3  # experimental (FA4)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKER_DIR="${EXT_DIR}/worker"
BIN_DIR="${EXT_DIR}/binaries"

BACKEND=""
while [ $# -gt 0 ]; do
  case "$1" in
    --backend) BACKEND="$2"; shift 2 ;;
    --help|-h)
      echo "Usage: install-attention.sh --backend {sage2|sage3|flash3}"
      exit 0 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [ -z "${BACKEND}" ]; then
  echo "error: --backend required {sage2|sage3|flash3}" >&2
  exit 2
fi
if ! command -v uv >/dev/null 2>&1; then
  echo "error: uv not on PATH" >&2
  exit 127
fi

cd "${WORKER_DIR}"

case "${BACKEND}" in
  sage2)
    echo "[install-attention] sage2: SageAttention2 + triton"
    echo "[install-attention] NOTE: sm120/Blackwell wheels may need a source build"
    echo "[install-attention]   TORCH_CUDA_ARCH_LIST=8.0;8.6;8.9;9.0;12.0 (build-from-source path)"
    uv pip install "sageattention>=2.2" "triton>=3.0"
    ;;
  sage3)
    echo "[install-attention] sage3: SageAttention3 FP4 (Blackwell sm120 only)"
    WHEEL="$(ls "${BIN_DIR}"/sageattn3-*.whl 2>/dev/null | head -1 || true)"
    if [ -z "${WHEEL}" ]; then
      echo "[install-attention] FAIL: no sageattn3 wheel in ${BIN_DIR}" >&2
      echo "[install-attention]   download from https://huggingface.co/nhathoangfoto/SageAttention-3-Blackwell-FP4" >&2
      echo "[install-attention]   drop the .whl into ${BIN_DIR}/ then re-run" >&2
      exit 2
    fi
    echo "[install-attention] installing ${WHEEL} (--no-deps to protect torch)"
    uv pip install "${WHEEL}" --no-deps
    uv pip install "triton>=3.0"
    ;;
  flash3)
    echo "[install-attention] flash3: FlashAttention FP4 Blackwell (EXPERIMENTAL = FA4 upstream)"
    if [ "$(uname -s)" = "Linux" ]; then
      uv pip install "flash-attn-4" || {
        echo "[install-attention] flash-attn-4 install failed — build from source:" >&2
        echo "  git clone --depth=1 https://github.com/Dao-AILab/flash-attention && cd flash-attention" >&2
        echo "  TORCH_CUDA_ARCH_LIST=12.0 pip install . --no-build-isolation" >&2
        exit 2
      }
    else
      echo "[install-attention] FAIL: FA4 Windows wheels are not reliably published upstream." >&2
      echo "[install-attention]   Use sage3 for Blackwell FP4 on Windows, or build FA4 from source." >&2
      exit 2
    fi
    ;;
  *)
    echo "error: unknown backend '${BACKEND}'" >&2
    exit 2 ;;
esac

echo "[install-attention] done. Verify with: ./scripts/smoke-attention-backends.sh --backends ${BACKEND}"
