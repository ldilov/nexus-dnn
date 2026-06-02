#!/usr/bin/env bash
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"
W="$HOME/svi2-remote/svi2-pro/worker"
PY="$W/.venv/bin/python"
cd "$W"

SP="$($PY -c 'import site;print(site.getsitepackages()[0])')"
CU="$SP/nvidia/cu13"

# nvcc MUST match the CUDA version torch was built against (cu130 / 13.0.x),
# else nvcc errors "compiler and toolkit headers are incompatible". torch ships
# nvidia-cuda-runtime==13.0.x headers, so pin the compiler toolchain to 13.0.
echo "[cuda] pin nvcc toolchain to 13.0 (match torch cu130)"
uv pip install --python "$PY" \
  "nvidia-cuda-nvcc>=13.0,<13.1" "nvidia-cuda-crt>=13.0,<13.1" \
  "nvidia-nvvm>=13.0,<13.1" "nvidia-cuda-runtime>=13.0,<13.1" >/dev/null
echo "[cuda] nvcc version now: $($CU/bin/nvcc --version | tail -1)"
[ -x "$CU/bin/nvcc" ] || { echo "FATAL: nvcc missing at $CU"; exit 3; }

export CUDA_HOME="$CU"
export PATH="$CU/bin:$PATH"
export LD_LIBRARY_PATH="$CU/lib:${LD_LIBRARY_PATH:-}"
export CPATH="$CU/cccl/include:$CU/include:${CPATH:-}"
echo "[flash] nvcc: $(command -v nvcc)"; nvcc --version | tail -1
echo "[flash] build deps (into venv, via pip for reliable --no-build-isolation)"
uv pip install --python "$PY" pip wheel setuptools packaging psutil ninja >/dev/null
"$PY" -c "import wheel,setuptools,torch;print('builddeps ok wheel',wheel.__version__,'torch',torch.__version__)"

export TORCH_CUDA_ARCH_LIST="12.0+PTX"
export MAX_JOBS="${MAX_JOBS:-16}"
export FLASH_ATTENTION_FORCE_BUILD=TRUE
echo "[flash] building flash-attn 2.8.3 (arch=$TORCH_CUDA_ARCH_LIST jobs=$MAX_JOBS) — long compile"
time "$PY" -m pip install --no-build-isolation flash-attn==2.8.3

echo "[flash] import + numeric check (set LD_LIBRARY_PATH for runtime):"
LD_LIBRARY_PATH="$CU/lib:${LD_LIBRARY_PATH:-}" "$PY" - <<'PYEOF'
import torch, flash_attn
from flash_attn import flash_attn_func
q=torch.randn(1,64,8,64,device="cuda",dtype=torch.bfloat16)
o=flash_attn_func(q,q,q)
print("flash_attn", flash_attn.__version__, "out", tuple(o.shape), "finite", bool(torch.isfinite(o).all()))
PYEOF
echo "[flash] DONE"
