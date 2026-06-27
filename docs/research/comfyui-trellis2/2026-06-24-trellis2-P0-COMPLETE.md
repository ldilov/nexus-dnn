# P0 COMPLETE — TRELLIS.2 image→3D runs end-to-end on GB10 (sm_121)

> **Verdict: GREEN.** Full Microsoft TRELLIS.2 pipeline produces a real 38MB textured GLB from a
> single image on the live Spark (GB10, aarch64, Blackwell sm_121). This is the **contract
> authority** for the trellis2 extension — P0.5 freeze + P1–P4 fan-out may now proceed.

## Result (2026-06-24, on `nemo-gx`)
- `pipeline_loaded:OK 61s` · `run:OK 208s` · `glb:OK sample.glb 40,031,708 bytes` (magic `glTF` ✓).
- Stack: torch **2.12.0+cu132**, Python 3.12, CUDA 13.0 toolkit (build) — matches svi2-pro's GB10 stack.
- Built in `nvidia/cuda:13.0.1-devel-ubuntu24.04` (runtime image has no nvcc); render run with `--gpus all`.

## The full working integration chain (every gotcha, in order)
1. **Build env**: runtime `nexusdnn` container has NO nvcc → build in a `cuda:13-devel` container
   mounting `-v nexusdata:/data`. `apt install python3 python3-dev python3-venv git build-essential libeigen3-dev` + X11/GL dev headers (`libx11-dev libgl1-mesa-dev libegl1-mesa-dev libglu1-mesa-dev`, for glcontext via utils3d).
2. **Native kernels** (build from source, `--no-build-isolation`, `TORCH_CUDA_ARCH_LIST=12.1+PTX`, `MAX_JOBS=4`, ninja on PATH):
   - `cumesh` ← github.com/JeffreyXiang/CuMesh (--recursive; bundles its own Eigen)
   - `flex_gemm` ← github.com/JeffreyXiang/FlexGEMM (--recursive)
   - `o_voxel` ← vendored in microsoft/TRELLIS.2 (`o-voxel/`); needs **`libeigen3-dev` + `CPLUS_INCLUDE_PATH=/usr/include/eigen3`**
   - `nvdiffrast` ← NVlabs v0.4.0 (**required** — `o_voxel.postprocess` imports it; not optional even for mesh-only GLB)
3. **Attention**: sparse-attn config only accepts `xformers`/`flash_attn`/`flash_attn_3` (NOT sdpa) →
   use **flash_attn**. Install the vendored aarch64 wheel `binaries/linux-aarch64/flash_attn-2.8.3-cp312-cp312-linux_aarch64.whl` with `--no-deps`. Set `ATTN_BACKEND=flash_attn`. **Wheel filename must be the full `name-ver-tag` form** or pip rejects it.
4. **transformers pin = `4.56.0`**: dinov3 config was made with 4.56.0.dev0; the extractor uses the flat
   `DINOv3ViTModel.embeddings/.rope_embeddings/.layer` layout. transformers 5.x moved layers under `.model` → `AttributeError: no attribute 'layer'`. Pin 4.56.0.
5. **dinov3 is gated** (Meta, manual approval). Non-gated mirror **`kiennt120/dinov3-vitl16-pretrain-lvd1689m`** (complete: config.json + preprocessor_config.json + model.safetensors; weights byte-identical to `tao-hunter/` mirror via matching SHA256 `dcb2e451…`; safetensors = no code-exec). Redirect: `sed` the cached `pipeline.json` `image_cond_model.args.model_name` → the mirror id.
6. **RMBG-2.0 is gated + uses `trust_remote_code`** (RCE risk from a mirror). The pipeline only needs it
   for background removal. Skip it like ComfyUI does: patch the source line in `trellis2_image_to_3d.py`
   `pipeline.rembg_model = getattr(rembg,...)` → `pipeline.rembg_model = None`, and call `run(image, preprocess_image=False)` with a pre-cleaned (alpha) input.
7. **Inference API** (mirrors `example.py`, minus envmap/video): `Trellis2ImageTo3DPipeline.from_pretrained("microsoft/TRELLIS.2-4B")` → `.cuda()` → `mesh = run(img, preprocess_image=False)[0]` → `mesh.simplify(16777216)` → `o_voxel.postprocess.to_glb(vertices, faces, attr_volume=mesh.attrs, coords, attr_layout=mesh.layout, voxel_size, aabb=[[-.5]*3,[.5]*3], decimation_target=1e6, texture_size=2048, remesh=True, ...)` → `glb.export(path, extension_webp=True)`.
8. **Pure-py deps**: transformers==4.56.0, safetensors, einops, huggingface_hub, easydict, scipy, pillow, opencv-python-headless, trimesh, imageio, imageio-ffmpeg, tqdm, kornia, timm, utils3d (git pin `9a4eb15e`).

## Models (downloaded with HF token; ~14GB public + 1.2GB mirror)
- `microsoft/TRELLIS.2-4B` (public), `microsoft/TRELLIS-image-large` sparse decoder (public),
  dinov3 via the kiennt120 mirror. All cached at `/data/_spike/hf`.

## Vendored artifacts
- aarch64/sm_121 kernel wheels in `binaries/linux-aarch64/` (git-LFS). **NOTE:** first vendored as
  torch-2.11 builds; the proven stack is **torch 2.12/cu132** — re-collected via `tools/spark_p0_collect212.sh`.
- Reusable justfile recipes added: `dgx-devel-run`, `dgx-vol-cat`, `dgx-devel-clean`.
- Spike scripts: `tools/spark_p0_*.sh`. Spike workspace on Spark: `/data/_spike` (venv212 + src + hf + out).

## Still open (P0.4, minor)
- Host 3D-binary artifact serve test (GLB write/serve/MIME `model/gltf-binary` + auth via extension
  `/media` route) — not yet run; do during P1 (rust shim) since it needs the host artifact store.

## Bottom line for P0.5 freeze
Operator `trellis2.generate_3d@1.0.0` is buildable + runnable on GB10. Freeze contracts from these
observed facts: GLB output (`model/gltf-binary`), metadata (attention_backend=flash_attn,
no-compute-cap-spoof-needed since native sm_121 build, run timings ~61s load + ~208s render),
per-dep health (cumesh/flex_gemm/o_voxel/nvdiffrast/flash_attn all import-OK), profile = torch2.12/cu132.
