# Container & CUDA dependencies

This document lists the **global system dependencies** the nexus-dnn host needs
to install and run extensions, and the **flash-attn support matrix** (which
Python / CUDA / torch combinations ship a prebuilt wheel).

The canonical aarch64 image is built from
[`dockerfiles/aarch64.dockerfile`](../../dockerfiles/aarch64.dockerfile) and
published as `ldilov/nexusdnn:dgx`.

## Global system dependencies

These are provided by the container image (or must be on `PATH` for a bare-metal
host). They are shared by all extensions — the dependency installer assumes they
exist and does **not** install them per-extension.

| Dependency | Why | Provided by |
|---|---|---|
| **CUDA runtime libs** (`libcudart`, `libcublas`, `libcublasLt` ≥ 13) | the prebuilt `sd` (stable-diffusion.cpp) binary links them; torch wheels bundle their own | `nvidia/cuda:13.0.x-runtime` base |
| **NVIDIA driver + container runtime (CDI)** | GPU access (`--device nvidia.com/gpu=all`) | host driver ≥ the torch CUDA minor; `nvidia-ctk` |
| **ffmpeg** | audio/video mux + decode (emotiontts, svi2, ltx) | `apt install ffmpeg` (or system `PATH`) |
| **gcc / g++ / make** | source-build of C/C++ Python ext wheels (e.g. `pyahocorasick`) | `apt install gcc g++ make` |
| **`clang` → `cc` shim** | python-build-standalone records `CC=clang` in sysconfig; the shim points it at gcc | `dockerfiles/aarch64.dockerfile` |
| **uv** | drives `uv sync` package-set installs | astral uv static binary |
| **git** | VCS Python dependencies (e.g. `index-tts` from GitHub) | `apt install git` |
| **`sd` (stable-diffusion.cpp, CUDA)** | svi2-pro qwen-edit path; resolved via `allow_system_path` | baked into the image at `/usr/local/bin/sd` |
| **embedded Python** | per-extension interpreter (3.11 or 3.12) | downloaded at install time from python-build-standalone (no system Python needed) |

### Per-extension Python version

The host provisions a **per-extension** interpreter chosen from each manifest's
`version` range (`crates/nexus-backend-runtimes/src/family_python/builtin_assets.rs`):

- **EmotionTTS** pins `>=3.11,<3.12` → **Python 3.11** (its `numba`/`llvmlite`
  pins ship no 3.12 wheel and fail to source-build on 3.12 setuptools).
- **svi2-pro** pins `>=3.12,<3.13` → **Python 3.12** (matches the prebuilt
  aarch64 flash-attn wheel + torch 2.12 cp312).

Both interpreters coexist on the same host; each extension gets its own venv.

## flash-attn support matrix

flash-attn has no universal wheel — it is built per `(platform, CUDA, torch,
cpython)`. Prebuilt wheels live in the repo-global
[`binaries/`](../../binaries/) tree (git-LFS) and are referenced by
`extensions/builtin/svi2-pro/worker/pyproject.toml`.

| Platform | Python | torch / CUDA | flash-attn 2.8.3 | Source |
|---|---|---|---|---|
| **linux-aarch64** | **3.12** (cp312) | torch 2.12 / cu132 (runs); wheel built on CUDA 13 | ✅ wheel | `binaries/linux-aarch64/` (built on GB10) |
| **win-amd64** | 3.11 + 3.12 | torch 2.12 / cu132 | ✅ wheels | `binaries/win-amd64/` |
| **linux-amd64** | **3.12** (cp312) | torch 2.12 / cu132 | ✅ wheel | `binaries/linux-amd64/` (mjun0812/flash-attention-prebuild-wheels) |

**All three platforms ship a prebuilt cp312 flash-attn wheel → svi2-pro installs 100%
with no source build and no `nvcc`.** flash-attn pins cp312 (svi2 pins Python 3.12).
The win-amd64 + linux-amd64 wheels come from
[mjun0812/flash-attention-prebuild-wheels](https://github.com/mjun0812/flash-attention-prebuild-wheels);
the linux-aarch64 wheel was built on the GB10. torch comes from the
`download.pytorch.org/whl/cu132` index (cp312 wheels exist for win_amd64,
manylinux x86_64, and manylinux aarch64).

Notes:
- The aarch64 wheel was built against CUDA 13.0 but loads fine against torch's
  bundled cu132 (CUDA 13.x ABI compatible). flash-attn **2.8.3 will not compile
  on a CUDA 13 toolkit** (it uses the removed `double4` vector types), which is
  why we vendor a prebuilt wheel rather than source-build on aarch64.
- On platforms with **no prebuilt wheel and no index wheel**, flash-attn falls
  back to a source build, which requires the **CUDA toolkit (`nvcc`)**. See
  "nvcc / CUDA toolkit" below. svi2-pro otherwise runs on **sdpa attention**
  (functional, slower) if flash-attn is absent.

## nvcc / CUDA toolkit

`nvcc` (the CUDA *toolkit*, ~GB+) is **not** in the runtime image — only the CUDA
*runtime* libs are. Most extensions don't need `nvcc`:

- **EmotionTTS** runs fully without it; the `nvcc not on PATH` diagnostic only
  disables the optional **BigVGAN custom CUDA kernel** (the vocoder falls back to
  torch, ~10–30% slower).
- **svi2-pro** uses prebuilt flash-attn wheels, so no `nvcc` at install time.

`nvcc` is only needed to **source-build** a CUDA Python extension that has no
prebuilt wheel for the platform. The intended path is **prebuilt wheels per
platform**; the CUDA toolkit is an opt-in fallback. To make a new prebuilt wheel
one-click on a platform, add it under `binaries/<platform>/` and reference it
from the extension's `pyproject.toml` `[tool.uv.sources]`.

### On-demand nvcc — the mechanism (no system toolkit, no sudo)

When a source build is genuinely unavoidable, an extension provisions `nvcc`
**as a pip wheel inside its own venv** — `nvidia-cuda-nvcc-cu13` ships wheels for
win-amd64, linux-x86_64, and linux-aarch64. uv puts it on the build PATH for the
source-built package; nothing is installed system-wide.

In the extension's `worker/pyproject.toml`:

```toml
[project.optional-dependencies]
# only pulled when the platform has no prebuilt wheel for `some-cuda-ext`
build-nvcc = ["nvidia-cuda-nvcc-cu13>=13.0", "ninja"]

[tool.uv.extra-build-dependencies]
# give the source build of `some-cuda-ext` an nvcc + headers from wheels
some-cuda-ext = ["nvidia-cuda-nvcc-cu13", "torch"]
```

Then install the `build-nvcc` extra on the platforms that lack a prebuilt wheel
(via the manifest `pkgs` step `extras`, gated by a platform marker).

**Caveat:** `nvcc-cu13` provides a **CUDA 13** compiler. flash-attn 2.8.3 does
**not** compile on CUDA 13 (removed `double4` types), so this path is **not**
valid for flash-attn — flash-attn must use a prebuilt wheel. nvcc-cu13 is for
other CUDA exts (e.g. sageattention) or a future flash version that restores
CUDA-13 compile support. Use `nvidia-cuda-nvcc-cu12` only if an extension is
pinned to a CUDA-12 (cu126/cu128) torch base.
