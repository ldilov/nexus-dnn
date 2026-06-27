#!/usr/bin/env bash
# P0 GB10 kernel build in a cuda:13-DEVEL container (has nvcc); writes wheels+STATUS to /data/_spike.
# Self-logs; matched torch 2.11+cu130 to the 13.0 toolkit (emotion-tts pairing, proven sm_121).
SPIKE=/data/_spike
mkdir -p "$SPIKE"
exec > "$SPIKE/build.log" 2>&1
set +e
echo "=== P0 DEVEL BUILD START $(date -u +%FT%TZ) ==="
export DEBIAN_FRONTEND=noninteractive
export PATH=/usr/local/cuda/bin:$PATH
export CUDA_HOME=/usr/local/cuda
export TORCH_CUDA_ARCH_LIST="12.1+PTX"
export MAX_JOBS=4
echo "nvcc: $(nvcc --version 2>/dev/null | tail -1)"

STATUS="$SPIKE/STATUS"; : > "$STATUS"
echo "=== apt: python + git ==="
apt-get update -qq && apt-get install -y -qq python3 python3-venv python3-dev git build-essential >/dev/null 2>&1
echo "python3: $(python3 --version)  git: $(git --version)"

VENV="$SPIKE/venv_devel"; SRC="$SPIKE/src"; mkdir -p "$SRC"
python3 -m venv "$VENV" && source "$VENV/bin/activate" || { echo "venv:FAIL" >> "$STATUS"; exit 1; }
python -m pip install -q --upgrade pip setuptools wheel ninja packaging numpy
echo "=== install torch 2.11 cu130 ==="
python -m pip install -q "torch==2.11.0" --index-url https://download.pytorch.org/whl/cu130
python -c "import torch;print('torch',torch.__version__,'cuda',torch.version.cuda,'cap',torch.cuda.get_device_capability())" \
  && echo "torch:OK" >> "$STATUS" || { echo "torch:FAIL" >> "$STATUS"; exit 1; }
echo "ninja: $(which ninja)"

build_kernel () {  # name  cloneurl-or-LOCAL  target  importname
  local name="$1" how="$2" target="$3" imp="$4"
  echo "============================================================"
  echo "=== BUILD $name ($(date -u +%T)) ==="
  if [ "$how" != "LOCAL" ]; then
    rm -rf "$SRC/$name"
    git clone --recursive "$how" "$SRC/$name" || { echo "$name:CLONE_FAIL" >> "$STATUS"; return 1; }
  fi
  ( python -m pip install "$target" --no-build-isolation -v ) > "$SPIKE/$name.build.log" 2>&1
  local rc=$?
  echo "$name build exit=$rc (tail of $name.build.log:)"
  tail -25 "$SPIKE/$name.build.log"
  if [ $rc -ne 0 ]; then echo "$name:BUILD_FAIL" >> "$STATUS"; return 1; fi
  python -c "import $imp; print('$imp import OK')" \
    && echo "$name:OK" >> "$STATUS" || echo "$name:IMPORT_FAIL" >> "$STATUS"
}

echo "=== fetch TRELLIS.2 (o-voxel source) ==="
rm -rf "$SRC/TRELLIS.2"
git clone --depth 1 https://github.com/microsoft/TRELLIS.2.git "$SRC/TRELLIS.2" \
  && echo "trellis2_repo:OK" >> "$STATUS" || echo "trellis2_repo:FAIL" >> "$STATUS"
ls "$SRC/TRELLIS.2" | head

build_kernel o_voxel  LOCAL  "$SRC/TRELLIS.2/o-voxel"                      o_voxel
build_kernel cumesh   https://github.com/JeffreyXiang/CuMesh.git   "$SRC/cumesh"   cumesh
build_kernel flexgemm https://github.com/JeffreyXiang/FlexGEMM.git "$SRC/flexgemm" flex_gemm

echo "=== collect wheels ==="
mkdir -p "$SPIKE/wheels"
python -m pip wheel "$SRC/TRELLIS.2/o-voxel" "$SRC/cumesh" "$SRC/flexgemm" --no-build-isolation -w "$SPIKE/wheels" >/dev/null 2>&1
ls -la "$SPIKE/wheels" 2>/dev/null
echo "============================================================"
echo "=== STATUS ==="; cat "$STATUS"
echo "=== P0 DEVEL BUILD DONE $(date -u +%FT%TZ) ==="
echo "ALL_DONE" >> "$STATUS"
