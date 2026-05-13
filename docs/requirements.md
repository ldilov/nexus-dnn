# Requirements

Everything you need to install BEFORE building the host or activating
an extension. The host auto-provisions some of these on first run
(embedded Python, ffmpeg, model weights), but a few must already be on
your system or the dependency installer will refuse to proceed.

This document is the single source of truth — if a step here disagrees
with another doc, fix this file. Last reviewed 2026-05-13.

## Host-level requirements

These apply to anyone building or running `nexus-dnn`, regardless of
which extensions are active.

| Tool | Minimum | Purpose | Auto-installed by host? |
|---|---|---|---|
| **Rust toolchain** | stable (latest) | Build the workspace | ❌ |
| **Node.js** | 20.x | Build the web frontend | ❌ |
| **pnpm** | 8.x | Frontend package manager | ❌ |
| **Git** | any modern | Submodule + sparse-checkout flows | ❌ |
| **C/C++ build tools** | platform standard | Native crate compile (rusqlite, ring, etc.) | ❌ |
| **OpenSSL dev headers** | 1.1.x / 3.x | Some Linux builds | ❌ (Linux only) |

### Per-platform build prerequisites

**Windows**:
- Visual Studio 2022 Build Tools with the "Desktop development with C++" workload
- Windows 10 SDK

**macOS**:
- Xcode Command Line Tools (`xcode-select --install`)

**Linux (Ubuntu/Debian)**:
```bash
sudo apt-get install build-essential pkg-config libssl-dev
```

### Install commands (host-level)

```bash
# Rust (Unix-y shells)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Rust (Windows PowerShell)
winget install Rustlang.Rustup

# Node 20+ via volta / fnm / nvm — pick your manager
fnm install 20

# pnpm
corepack enable && corepack prepare pnpm@latest --activate
```

## Extension-runtime requirements

These kick in only when an extension is **activated** AND has at least
one `dependencies.steps` entry that needs them. The host's dependency
installer (spec 035) runs through `python → pkgs → ffmpeg → validate`
in order; a missing prerequisite stalls the installer with a clear
error.

### `uv` — **REQUIRED for every extension with a Python worker**

Every built-in extension today (`emotion-tts`, `local-llm`,
`nexus-video-ltx23`) has a `package_set` step with `manager: uv` in its
manifest. The host's `package_set` handler looks for `uv` in this order:

1. The extension's embedded Python runtime
   (`<NEXUS_HOST_DATA_DIR>/extensions/<ext-id>/runtime/python/Scripts/uv.exe`
   on Windows, `.../bin/uv` on POSIX).
2. The system `PATH`.

If neither resolves, the installer returns an error pointing at
[astral docs](https://docs.astral.sh/uv/getting-started/installation/).

The bundled python-build-standalone tarball does NOT ship uv — the host
expects you to have it on your system. Install **once** per machine:

```bash
# Recommended — uv installer (Unix)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows PowerShell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Cross-platform via pipx
pipx install uv

# Verify
uv --version   # 0.5.x or newer is fine
```

### `ffmpeg` — auto-downloaded with system-PATH preference

Both `emotion-tts` and `nexus-video-ltx23` declare an `ffmpeg`
system-binary dependency with `allow_system_path: true`. The installer:

1. Looks for `ffmpeg` on your `PATH` first — uses it if found.
2. Falls back to downloading a pinned BtbN ffmpeg-master build into the
   extension's data dir on Windows / Linux, or evermeet.cx on macOS.

You can leave ffmpeg out of your system install and the host will
fetch it. If you already have ffmpeg on PATH (recommended — system
ffmpeg gets security updates), the installer skips the download.

```bash
# Optional but recommended
sudo apt-get install ffmpeg     # Linux
brew install ffmpeg             # macOS
choco install ffmpeg            # Windows (Chocolatey)
```

### Embedded Python — auto-downloaded

The host downloads `python-build-standalone` (currently 3.11.13) from
the registered Astral / Indygreg release on first activation. Lives at
`<NEXUS_HOST_DATA_DIR>/extensions/<ext-id>/runtime/python/`.

You do NOT need Python on your system PATH for extensions to work. If
you want to inspect or debug, the installer logs the resolved Python
path on every activation.

### Disk + network budget

| Slot | Approximate size |
|---|---|
| Host build (`target/`) | ~6 GB |
| Embedded Python per extension | ~80 MB |
| `emotion-tts` IndexTTS-2 models | ~15 GB |
| `local-llm` model files | varies (1–60 GB per model) |
| `nexus-video-ltx23` LTX 2.3 weights | **~88–155 GB** (see GPU section) |
| Frontend `node_modules` | ~600 MB |

`~/.nexus/` is the default data root on every platform. Override via
`NEXUS_HOST_DATA_DIR` if disk is tight.

## GPU-bound extensions

Extensions that compile against `nexus-backend-runtimes` and ship
non-`fake` runtime profiles need specific hardware + drivers.

### `nexus.local-llm` — llama.cpp backend

CPU-only mode works out of the box; GPU offload is optional.

| Optional GPU | Notes |
|---|---|
| NVIDIA (CUDA) | llama.cpp's CUDA build is auto-downloaded for `nexus.local-llm.completions` |
| Apple Silicon (Metal) | Metal build auto-downloaded on macOS |
| AMD (ROCm) | Manual — not currently shipped |
| Vulkan | Available as a fallback build |

No specific driver version is required; the bundled binaries link
against the installed CUDA / Metal runtime.

### `nexus.audio.emotiontts` — Python diffusers + CUDA

| Component | Minimum |
|---|---|
| NVIDIA GPU | Compute capability ≥ 7.0 (Volta or newer) |
| CUDA driver | 525+ (CUDA 12.x runtime) |
| VRAM | 8 GB safe; 6 GB works with chunking |
| Disk | ~15 GB models + 5 GB Python deps |

CPU-only fallback works for short clips but is dramatically slower.

### `nexus.video.ltx23` — LTX 2.3 image-to-video

Heaviest extension on disk and VRAM. See
[`extensions/builtin/nexus-video-ltx23/README.md`](../extensions/builtin/nexus-video-ltx23/README.md)
for the full runtime profile matrix; the table below is the elevator
pitch.

| Profile | Target hardware | Model repo | Disk | Peak VRAM (with `enable_sequential_cpu_offload` + `vae.enable_tiling`) |
|---|---|---|---|---|
| `fake` | any (CI / dev) | none | 0 | 0 |
| `rtx40-fp8` | RTX 40 (Ada, sm_89), CUDA 12.6+ | `dg845/LTX-2.3-Distilled-Diffusers` (BF16) | ~88 GB | **~5 GB** (measured 4.69 GB) |
| `rtx50-fp8` | RTX 50 (Blackwell, sm_120), CUDA 12.8+ | same as above | ~88 GB | **~5 GB** |
| `rtx50-nvfp4` | RTX 50 (Blackwell, sm_120 native NVFP4) | same as above today; future quant variant pending | ~88 GB | **~5 GB** |

> The runtime uses `pipe.enable_sequential_cpu_offload()` to swap
> transformer blocks in/out of GPU on demand — peak VRAM is the cost of
> one active block plus its activations, NOT the whole 22B model. This
> is what makes a BF16 22-billion-parameter video model fit on a 16 GB
> GPU. Trade-off: each step pays a small CPU↔GPU transfer cost; render
> wall-clock is dominated by inference compute rather than VRAM
> paging. See [`specs/046-ltx23-video-generation/verification/p0-t001-results.md`](../specs/046-ltx23-video-generation/verification/p0-t001-results.md)
> for the full benchmark table including the dead-ended FP8 / NVFP4 /
> SDNQ / Quanto paths.

> All three real-runtime profiles currently point at
> `dg845/LTX-2.3-Distilled-Diffusers` because diffusers 0.39.0.dev0
> (the version we pin) doesn't yet support the official
> `Lightricks/LTX-2.3-{fp8,nvfp4}` ComfyUI-style single-file format.
> When upstream diffusers ships a single-file loader for those, the
> profiles will diverge again.

#### NVFP4 on RTX 40 — clarification

NVFP4 (NVIDIA's 4-bit floating-point format) has **native tensor-core
support only on Blackwell (sm_120+)**. Ada (sm_89, RTX 40 series) and
older NVIDIA GPUs do NOT have NVFP4 tensor cores.

This does NOT mean Ada cannot consume NVFP4 weights — it just means
inference falls through to a lower-precision path:

- **Path A (recommended for Ada)**: use the `rtx40-fp8` profile and the
  `Lightricks/LTX-2.3-fp8` weights directly. Native FP8 tensor cores
  give the best throughput on Ada.
- **Path B (theoretical)**: use the `rtx50-nvfp4` profile + weights on
  Ada hardware. The runtime would have to dequantize NVFP4 → FP8 (or
  → BF16) layer-by-layer at compute time. Saves disk (~14 GB vs 28 GB)
  and possibly VRAM, but throughput depends on whether the inference
  engine has NVFP4-aware kernels for non-Blackwell hardware.
  **diffusers 0.37.x as of 2026-05-13 does NOT implement this dequant
  path.** TensorRT-LLM and some bitsandbytes/quanto configs do — pick
  your engine accordingly if you want to try this.

The current default mapping (`runtime_selection.rs::auto_select`):

- Ada / Ampere → `rtx40-fp8` regardless of opt-in
- Blackwell (no opt-in) → `rtx50-fp8`
- Blackwell (`experimental_nvfp4_opt_in=true`) → `rtx50-nvfp4`

This is intentionally conservative — auto-selection never lands on an
NVFP4 path that the active inference engine can't decode. If you want
to validate NVFP4 on Ada with a non-diffusers engine, override
explicitly via the recipe form's `runtime_profile=rtx50-nvfp4` selector
AND set the experimental opt-in flag.

#### Driver requirements (NVIDIA)

| GPU family | Compute | Recommended driver |
|---|---|---|
| Ampere (RTX 30) | 8.6 | 525+ for CUDA 12.0; 555+ for CUDA 12.5 |
| Ada (RTX 40) | 8.9 | 535+ (CUDA 12.2 minimum for FP8 fast-math) |
| Hopper (H100) | 9.0 | 535+ |
| Blackwell (RTX 50 / B100) | 12.0 | **565+ for CUDA 12.8** — needed for sm_120 kernels in torch 2.11 |

`nvidia-smi` must report `CUDA Version: 12.x` (the driver-reported
maximum CUDA the driver supports) for any of the non-fake LTX 2.3
profiles to work. The host log surfaces this on startup via
`extension_dependencies::validate`.

## Putting it all together — minimum install path

For a fresh machine that wants to run **all** built-in extensions
with real GPU profiles:

```bash
# 1. System tools
# (Rust, Node, pnpm, git, build tools — per platform — see top of doc)

# 2. uv (mandatory for every Python-worker extension)
curl -LsSf https://astral.sh/uv/install.sh | sh

# 3. NVIDIA driver (Linux example for Blackwell)
sudo apt-get install nvidia-driver-565

# 4. Optional but recommended
sudo apt-get install ffmpeg

# 5. Build the workspace
git clone https://github.com/your-org/nexus-dnn.git
cd nexus-dnn
cargo build --release
(cd apps/web && pnpm install && pnpm build)

# 6. Start the host
NEXUS_PORT=3100 ./target/release/nexus-dnn

# 7. Each extension activates on first launch — the dependency
#    installer pulls Python + worker deps automatically. GPU model
#    weights are pulled by clicking "Install runtime & download
#    weights" on the recipe surface (or POST to
#    /api/v1/extensions/<ext-id>/profiles/<profile-id>/install).
```

Plan for at least 200 GB of free disk if you want every extension's
heaviest GPU profile activated simultaneously.

## See also

- [`docs/getting-started.md`](getting-started.md) — quick-start walkthrough
- [`docs/configuration.md`](configuration.md) — environment variables + CLI flags
- [`docs/extension-internals.md`](extension-internals.md) — how the dependency installer works
- [`extensions/builtin/nexus-video-ltx23/README.md`](../extensions/builtin/nexus-video-ltx23/README.md) — full LTX 2.3 setup
- [`specs/046-ltx23-video-generation/verification/p0-t001-results.md`](../specs/046-ltx23-video-generation/verification/p0-t001-results.md) — real-GPU validation findings
