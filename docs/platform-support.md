# 🖥️ Platform Support

This page describes what the repo appears to support today and where the strongest validation evidence exists.

## Executive Summary

- `nexus-dnn` is architected to be cross-platform.
- The strongest recent validation evidence in the repo is Windows + NVIDIA-focused.
- The most demanding built-in extensions are tuned around recent RTX hardware, especially Blackwell-era workflows.

## Architecture Support

`nexus-dnn` targets three host architectures and is arch-aware across all three for the host binary, embedded Python, ffmpeg, and the LLM/video install pipelines. All three ship a **prebuilt cp312 flash-attn wheel** (the aarch64 wheel built on a GB10-class Spark), so even the heaviest extension — svi2-pro — installs with **no source build and no `nvcc`**. The remaining aarch64 gaps are narrow: there is no *official* CUDA arm64 llama.cpp prebuilt (CPU + Vulkan GPU are surfaced; full CUDA comes via an external `llama-server`), and the optional svi2-pro stable-diffusion.cpp edit path needs an operator-built `sd` binary. See [deployment/container-and-cuda-dependencies.md](deployment/container-and-cuda-dependencies.md) for the full flash-attn support matrix.

| Capability | amd64 Windows | amd64 Linux | aarch64 Linux (DGX Spark / GB10) |
|------------|:---:|:---:|:---|
| Host binary (`nexus-dnn`) | 🟢 | 🟢 | 🟢 build natively or cross-compile |
| Embedded Python runtime | 🟢 | 🟢 | 🟢 |
| ffmpeg (managed install) | 🟢 | 🟢 | 🟢 |
| LLM via llama.cpp (managed) | 🟢 cpu/cuda | 🟢 cpu/cuda | 🟢 CPU + Vulkan GPU; no official CUDA arm64 (CUDA via external server) |
| LLM via external server | 🟢 | 🟢 | 🟢 GPU-capable — CUDA `llama-server` on GB10 / sbsa |
| EmotionTTS | 🟢 | 🟢 | 🟢 cu128 torch **2.11+** arm64 wheels; no flash-attn dependency |
| LTX-2.3 / LongCat video | 🟢 | 🟢 | 🟢 no flash-attn dependency; LongCat uses Triton SageAttention with SDPA fallback |
| SVI2-Pro | 🟢 | 🟢 | 🟢 GB10-validated; prebuilt cp312 flash-attn wheel (no source build); optional `sd` edit path needs an operator-built binary |

**aarch64 Linux notes:**

- **Managed llama.cpp on aarch64 offers CPU and Vulkan GPU.** The managed installer surfaces both the official arm64 **CPU** build (`ubuntu-arm64`) and the arm64 **Vulkan** GPU build (`ubuntu-vulkan-arm64`, GPU-capable on GB10); on a host with a GPU/CUDA stack present, the installer defaults to the Vulkan variant. There is no *official* CUDA arm64 prebuilt — CUDA on aarch64 comes from a source build (see Arm's GB10 llama.cpp guide) or third-party arm64 CUDA tarballs (e.g. ai-dock). For the fastest CUDA path on a DGX Spark, run a CUDA `llama-server` and reach it via `NEXUS_LLAMA_SERVER_URL` (arch-agnostic).
- **EmotionTTS works on aarch64.** IndexTTS-2 uses cu128 torch with no flash-attn dependency. Note the worker pins `torch>=2.11`: the cu128 index only began publishing `manylinux_2_28_aarch64` CUDA wheels at torch 2.11.0, so the earlier 2.8.0 lock had **no** arm64 wheel and `uv sync` failed on aarch64. With the 2.11+ pin (matching the LTX-2.3 worker's cu128 setup) `uv sync` resolves cleanly.
- **SVI2-Pro now ships a prebuilt aarch64 flash-attn wheel** (`binaries/linux-aarch64/flash_attn-2.8.3-cp312-cp312-linux_aarch64.whl`, built on a GB10), referenced from `extensions/builtin/svi2-pro/worker/pyproject.toml` via a platform-gated `[tool.uv.sources]` entry. `uv sync` resolves it directly — **no source build, no `nvcc`** — matching the win-amd64 and linux-amd64 wheels. svi2-pro installs 100% on all three arches; if the wheel is ever absent the worker falls back to SDPA (the Blackwell default).
- **LongCat does not depend on flash-attn.** It uses Triton-based SageAttention v1 (arch-agnostic, JIT-compiled, no prebuilt CUDA wheel needed) with an SDPA fallback. The faster SageAttention 3 FP8 wheel is win-amd64 only and is a speed extra, not a requirement.
- **stable-diffusion.cpp (svi2-pro edit-then-animate) has no Linux arm64/CUDA prebuilt.** Core image-to-video render works; the optional edit path needs an operator-built `sd` on `PATH`.

## Tested Machine Evidence

The clearest recent repo evidence points to a workstation with:

| Component | Evidence |
|-----------|----------|
| OS | Windows |
| GPU | NVIDIA GeForce RTX 5070 Ti |
| VRAM | about 15.92 GiB |
| Driver | 570.65+ |
| Python | 3.12.11 |
| Torch | 2.12.0 + CUDA 13.2 |

This evidence is especially visible in the video-extension verification materials and runtime-selection notes.

## Support Readout

| Area | Status | Notes |
|------|--------|-------|
| Host runtime on Windows | 🟢 strongest evidence | best documented path in current repo state |
| Browser-based local UI | 🟢 strong | host serves embedded frontend bundle |
| TUI workflow | 🟢 strong | explicit cargo aliases and recent work |
| Desktop shell | 🟢 strong | active Tauri shell crate and app wiring |
| Linux/macOS host conceptually | 🟡 partial confidence | architecture supports it, but current evidence is thinner |
| CPU-only usage | 🟡 available for some flows | practical, but many flagship features are GPU-oriented |
| High-end video generation | 🟢 on recent NVIDIA stacks | most validated on RTX 50-series-oriented setups |

## Built-in Extension Expectations

| Extension | Hardware expectations |
|-----------|-----------------------|
| `nexus.local-llm` | lowest barrier; can run CPU-only, better with GPU |
| `nexus.audio.emotiontts` | practical on NVIDIA GPU; slower on CPU |
| `nexus.video.ltx23` | expects serious disk, driver, and GPU alignment |
| `nexus.video.longcat` | high-end GPU workflow, still evolving |
| `nexus.video.svi2-pro` | most demanding path; Blackwell-oriented assumptions show up repeatedly |

## What “Supported” Should Mean Here

For this repo today, “supported” is best understood in three tiers:

1. **Actively validated**
   Recent code, docs, and verification evidence line up.
2. **Architecturally intended**
   The code is written to allow it, but the repo’s validation evidence is lighter.
3. **Experimental**
   The path exists, but users should expect rough edges, long installs, or hardware-specific caveats.

## Recommended Reader Path

- [requirements.md](requirements.md) for prerequisites and resource budgets
- [getting-started.md](getting-started.md) for the quickest local launch
- [architecture.md](architecture.md) for the host/extension model
