#!/usr/bin/env bash
# Collect the torch-2.12/cu132 kernel wheels (the proven production stack) for vendoring.
SPIKE=/data/_spike
exec > "$SPIKE/collect212.log" 2>&1
set +e
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq >/dev/null 2>&1 && apt-get install -y -qq python3 python3-dev git build-essential libeigen3-dev >/dev/null 2>&1
export PATH=/usr/local/cuda/bin:$PATH
export CUDA_HOME=/usr/local/cuda
export TORCH_CUDA_ARCH_LIST="12.1+PTX"
export MAX_JOBS=4
export CPLUS_INCLUDE_PATH=/usr/include/eigen3:${CPLUS_INCLUDE_PATH:-}
source "$SPIKE/venv212/bin/activate" || exit 1
mkdir -p "$SPIKE/wheels212"
for src in "$SPIKE/src/cumesh" "$SPIKE/src/flexgemm" "$SPIKE/src/TRELLIS.2/o-voxel"; do
  echo "--- wheel $src ---"
  python -m pip wheel "$src" --no-build-isolation --no-deps -w "$SPIKE/wheels212" 2>&1 | tail -3
done
echo "=== wheels212 ==="
ls -1 "$SPIKE/wheels212"/*.whl 2>/dev/null | grep -iE "cumesh|flex_gemm|o_voxel"
echo "COLLECT212_DONE"
