#!/usr/bin/env bash
# P0 render smoke on svi2's GB10 stack: torch 2.12/cu132 + vendored flash_attn, kernels rebuilt for 2.12.
# Reuses cloned sources in /data/_spike/src; needs HF_TOKEN for dinov3 mirror download.
SPIKE=/data/_spike
exec > "$SPIKE/smoke212.log" 2>&1
set +e
echo "=== SMOKE212 START $(date -u +%FT%TZ) ==="
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq >/dev/null 2>&1 && apt-get install -y -qq python3 python3-dev python3-venv git build-essential \
  libeigen3-dev libgl1 libglib2.0-0 libx11-dev libgl1-mesa-dev libegl1-mesa-dev libglu1-mesa-dev >/dev/null 2>&1
export PATH=/usr/local/cuda/bin:$PATH
export CUDA_HOME=/usr/local/cuda
export TORCH_CUDA_ARCH_LIST="12.1+PTX"
export MAX_JOBS=4
export CPLUS_INCLUDE_PATH=/usr/include/eigen3:${CPLUS_INCLUDE_PATH:-}
export HF_HOME=/data/_spike/hf
export HUGGINGFACE_HUB_TOKEN="${HF_TOKEN:-}"
export ATTN_BACKEND=flash_attn
export OPENCV_IO_ENABLE_OPENEXR=1
export PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True
STATUS="$SPIKE/smoke212.STATUS"; : > "$STATUS"

VENV="$SPIKE/venv212"
if [ ! -x "$VENV/bin/python" ]; then python3 -m venv "$VENV"; fi
source "$VENV/bin/activate" || { echo "venv:FAIL" >> "$STATUS"; exit 1; }
python -m pip install -q --upgrade pip setuptools wheel ninja packaging numpy
echo "=== torch 2.12 cu132 ==="
python -m pip install -q "torch==2.12.0" --index-url https://download.pytorch.org/whl/cu132 \
  && python -c "import torch;print('torch',torch.__version__,torch.version.cuda,torch.cuda.get_device_capability())" \
  && echo "torch:OK" >> "$STATUS" || { echo "torch:FAIL" >> "$STATUS"; exit 1; }

build1 () {  # name  srcdir  importname
  echo "=== build $1 (torch2.12) ==="
  ( python -m pip install "$2" --no-build-isolation -v ) > "$SPIKE/$1.212.log" 2>&1
  local rc=$?; echo "$1 exit=$rc"; tail -4 "$SPIKE/$1.212.log"
  [ $rc -eq 0 ] && python -c "import $3" 2>/dev/null && echo "$1:OK" >> "$STATUS" || echo "$1:FAIL" >> "$STATUS"
}
build1 cumesh   "$SPIKE/src/cumesh"            cumesh
build1 flexgemm "$SPIKE/src/flexgemm"          flex_gemm
build1 o_voxel  "$SPIKE/src/TRELLIS.2/o-voxel" o_voxel
( python -m pip install "$SPIKE/src/nvdiffrast" --no-build-isolation -q ) && echo "nvdiffrast:OK" >> "$STATUS" || echo "nvdiffrast:FAIL" >> "$STATUS"

echo "=== flash_attn (vendored torch2.12 wheel, no-deps) ==="
FAWHL="$SPIKE/flash_attn-2.8.3-cp312-cp312-linux_aarch64.whl"
cp -f "$SPIKE/flash_attn.whl" "$FAWHL" 2>/dev/null || true
python -m pip install "$FAWHL" --no-deps -q && python -c "import flash_attn;print('flash_attn',flash_attn.__version__)" \
  && echo "flash_attn:OK" >> "$STATUS" || echo "flash_attn:FAIL" >> "$STATUS"

echo "=== pipeline py-deps ==="
python -m pip install -q "transformers==4.56.0" safetensors einops huggingface_hub easydict scipy pillow \
  opencv-python-headless trimesh imageio imageio-ffmpeg tqdm kornia timm \
  "git+https://github.com/EasternJournalist/utils3d.git@9a4eb15e4021b67b12c460c7057d642626897ec8" \
  && echo "deps:OK" >> "$STATUS" || echo "deps:FAIL" >> "$STATUS"

echo "=== patch dinov3 mirror + rembg None ==="
for pj in $(find "$SPIKE/hf" -name pipeline.json 2>/dev/null); do
  sed -i 's#facebook/dinov3-vitl16-pretrain-lvd1689m#kiennt120/dinov3-vitl16-pretrain-lvd1689m#g' "$pj"
done
sed -i 's#.*pipeline.rembg_model = getattr(rembg.*#        pipeline.rembg_model = None#' \
  "$SPIKE/src/TRELLIS.2/trellis2/pipelines/trellis2_image_to_3d.py"

mkdir -p "$SPIKE/out"
cat > "$SPIKE/smoke212.py" <<'PY'
import os, time, traceback
S="/data/_spike/smoke212.STATUS"
def mark(x):
    open(S,"a").write(x+"\n"); print("[MARK]",x,flush=True)
try:
    import torch
    from PIL import Image
    print("torch",torch.__version__,"cap",torch.cuda.get_device_capability(),flush=True)
    from trellis2.pipelines import Trellis2ImageTo3DPipeline
    import o_voxel
    mark("imports:OK")
    t=time.time(); pipe=Trellis2ImageTo3DPipeline.from_pretrained("microsoft/TRELLIS.2-4B"); pipe.cuda()
    mark(f"pipeline_loaded:OK {time.time()-t:.0f}s")
    img=Image.open("assets/example_image/T.png"); t=time.time()
    mesh=pipe.run(img, preprocess_image=False)[0]
    mark(f"run:OK {time.time()-t:.0f}s")
    mesh.simplify(16777216)
    out="/data/_spike/out/sample.glb"
    glb=o_voxel.postprocess.to_glb(vertices=mesh.vertices,faces=mesh.faces,attr_volume=mesh.attrs,
        coords=mesh.coords,attr_layout=mesh.layout,voxel_size=mesh.voxel_size,
        aabb=[[-0.5,-0.5,-0.5],[0.5,0.5,0.5]],decimation_target=1000000,texture_size=2048,
        remesh=True,remesh_band=1,remesh_project=0,verbose=True)
    glb.export(out, extension_webp=True)
    mark(f"glb:OK {out} {os.path.getsize(out)} bytes")
except Exception as e:
    mark(f"SMOKE_FAIL {type(e).__name__}: {str(e)[:300]}"); traceback.print_exc()
PY
cd "$SPIKE/src/TRELLIS.2" || { echo "repo:MISSING" >> "$STATUS"; exit 1; }
echo "=== run smoke212 ==="
PYTHONPATH=. python "$SPIKE/smoke212.py"
echo "=== STATUS ==="; cat "$STATUS"
echo "SMOKE212_DONE" >> "$STATUS"
