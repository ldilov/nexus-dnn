# P0 — GB10 native-dep build runbook (trellis2 spike)

> The make-or-break spike. Verdict from research + Spark recon: **GREEN with build effort** — the
> custom kernels are open-source build-from-source extensions, the aarch64/sm_121 pattern is proven,
> and the Spark already has the toolchain. This runbook is the exact recipe for the build session.

## Recon facts (Spark, live `nexusdnn` container, 2026-06-24)
- aarch64, Ubuntu 24.04.3. **CUDA 13.0 toolkit present**: `/usr/local/cuda-13.0` (sbsa-linux). nvcc
  off PATH → `export PATH=/usr/local/cuda/bin:$PATH`.
- **cu13x torch proven on sm_121 (cap 12,1):** svi2-pro venv `torch 2.12.0+cu132`; emotion-tts
  `torch 2.11.0+cu130`. uv 0.11.21 at `/usr/local/bin/uv`. **ninja missing** → `uv pip install ninja`.
- Host shell has NO nvcc/ninja; CUDA + torch live inside the container / extension venvs.

## Source provenance (from microsoft/TRELLIS.2 `setup.sh`)
- `cumesh` → `git clone --recursive https://github.com/JeffreyXiang/CuMesh.git` → `pip install . --no-build-isolation`
- `flexgemm` → `git clone --recursive https://github.com/JeffreyXiang/FlexGEMM.git` → `pip install . --no-build-isolation`
- `o-voxel` → **vendored** in TRELLIS.2 repo (`o-voxel/`) → `pip install . --no-build-isolation`
- `nvdiffrast` (NVlabs v0.4.0), `nvdiffrec` (JeffreyXiang renderutils) → **SKIP for MVP-0**
- flash-attn 2.7.3 → **SKIP** (blackwell_fix forces `ATTN_BACKEND=sdpa`)
- utils3d → `pip install git+https://github.com/EasternJournalist/utils3d.git@<pin>`
- TRELLIS.2 defaults torch 2.6 cu124 / py3.10 — **we override**: build against GB10 cu13x torch, py3.12.

## Build steps (run in a DEDICATED scratch venv — NOT the live worker venvs)
```bash
# inside container or a CUDA-13 aarch64 devel context; scratch dir on the data volume
export PATH=/usr/local/cuda/bin:$PATH
export CUDA_HOME=/usr/local/cuda
export TORCH_CUDA_ARCH_LIST="12.1"        # GB10 Blackwell sm_121; add +PTX for forward-compat
export MAX_JOBS=4                          # cap to avoid OOM on unified memory
uv venv /data/_spike/trellis2 --python 3.12
source /data/_spike/trellis2/bin/activate
uv pip install torch==2.12.0 ... (match svi2 cu132 index)   # or reuse svi2 wheel cache
uv pip install ninja setuptools wheel
# build kernels (one at a time to isolate failures):
git clone --recursive https://github.com/JeffreyXiang/CuMesh.git  && pip install ./CuMesh   --no-build-isolation
git clone --recursive https://github.com/JeffreyXiang/FlexGEMM.git && pip install ./FlexGEMM --no-build-isolation
# o-voxel from the TRELLIS.2 checkout:
git clone https://github.com/microsoft/TRELLIS.2.git && pip install ./TRELLIS.2/o-voxel --no-build-isolation
```

## Known gotchas (carry-over from svi2 SageAttention GB10 build)
- **ninja MUST be on PATH** before building or torch falls back to distutils → leaks `-fopenmp` to
  nvcc → `nvcc fatal: Unknown option -fopenmp`. Do NOT strip `-fopenmp` (breaks link) — fix PATH.
- Cap `MAX_JOBS` (unified memory OOMs under high parallel nvcc).
- Minor toolkit/torch CUDA mismatch (13.0 toolkit vs cu132 torch) usually fine; if ABI errors,
  build against the cu130 (emotion-tts) torch instead.

## Smoke gates (record each as runtime-health fact, not crash)
1. import smoke: `python -c "import cumesh, o_voxel, flex_gemm"` per built kernel.
2. GPU kernel smoke: minimal sparse op / voxel op / mesh extract on cuda:0.
3. blackwell_fix preamble applied (compute-cap spoof→(9,0); `ATTN_BACKEND=sdpa`;
   `SPARSE_CONV_BACKEND` as TRELLIS.2 expects; `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True`;
   flex_gemm Triton→torch fallback; CPU voxel→mesh fallback).
4. load `TRELLIS.2-4B` + `dinov3-vitl16` + sparse decoder from local paths, **no network**.
5. 1 low-step single-image → decode → voxel→mesh → **GLB** on disk.
6. host 3D-binary artifact spike: write+serve the GLB with `model/gltf-binary` + auth via an
   extension `/media` route.

## Exit criterion
Real GLB produced on the Spark from a single image + downloadable via the host route + a per-kernel
health record (import_smoke / kernel_smoke / fallback_used / wheel provenance). That output =
the **contract authority** for P0.5 freeze, after which P1∥P2∥P3∥P4 may fan out.

## Risk if a kernel won't build
o_voxel = the core "O-Voxel" sparse structure → load-bearing, must build. cumesh = mesh extraction
(has CPU fallback via blackwell_fix). flex_gemm = sparse linear (has torch fallback). If o_voxel
fails to build on sm_121, escalate (it's the one with no fallback).
