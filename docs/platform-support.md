# 🖥️ Platform Support

This page describes what the repo appears to support today and where the strongest validation evidence exists.

## Executive Summary

- `nexus-dnn` is architected to be cross-platform.
- The strongest recent validation evidence in the repo is Windows + NVIDIA-focused.
- The most demanding built-in extensions are tuned around recent RTX hardware, especially Blackwell-era workflows.

## Architecture Support

`nexus-dnn` targets three host architectures. The host binary, embedded Python, ffmpeg, and the LLM install pipeline are arch-aware across all three. On aarch64, CPU paths and GPU LLM (Vulkan, or an external CUDA `llama-server`) work today; the only real gaps are that the managed picker does not yet surface the Vulkan arm64 build, and some GPU Python wheels (flash-attn) have no aarch64 build so they compile from source.

| Capability | amd64 Windows | amd64 Linux | aarch64 Linux (DGX Spark / GB10) |
|------------|:---:|:---:|:---|
| Host binary (`nexus-dnn`) | 🟢 | 🟢 | 🟢 build natively or cross-compile |
| Embedded Python runtime | 🟢 | 🟢 | 🟢 |
| ffmpeg (managed install) | 🟢 | 🟢 | 🟢 |
| LLM via llama.cpp (managed) | 🟢 cpu/cuda | 🟢 cpu/cuda | 🟢 CPU + Vulkan GPU; no official CUDA arm64 (CUDA via external server) |
| LLM via external server | 🟢 | 🟢 | 🟢 GPU-capable — CUDA `llama-server` on GB10 / sbsa |
| EmotionTTS | 🟢 | 🟢 | 🟢 cu128 torch **2.11+** arm64 wheels; no flash-attn dependency |
| LTX-2.3 / LongCat video | 🟢 | 🟢 | 🟡 works; SDPA fallback (flash-attn has no arm64 wheel) |
| SVI2-Pro | 🟢 | 🟡 | 🟡 GB10-validated; flash-attn builds from source or SDPA; sd-cli edit needs system binary |

**aarch64 Linux notes:**

- **Managed llama.cpp on aarch64 offers CPU and Vulkan GPU.** The managed installer surfaces both the official arm64 **CPU** build (`ubuntu-arm64`) and the arm64 **Vulkan** GPU build (`ubuntu-vulkan-arm64`, GPU-capable on GB10); on a host with a GPU/CUDA stack present, the installer defaults to the Vulkan variant. There is no *official* CUDA arm64 prebuilt — CUDA on aarch64 comes from a source build (see Arm's GB10 llama.cpp guide) or third-party arm64 CUDA tarballs (e.g. ai-dock). For the fastest CUDA path on a DGX Spark, run a CUDA `llama-server` and reach it via `NEXUS_LLAMA_SERVER_URL` (arch-agnostic).
- **EmotionTTS works on aarch64.** IndexTTS-2 uses cu128 torch with no flash-attn dependency. Note the worker pins `torch>=2.11`: the cu128 index only began publishing `manylinux_2_28_aarch64` CUDA wheels at torch 2.11.0, so the earlier 2.8.0 lock had **no** arm64 wheel and `uv sync` failed on aarch64. With the 2.11+ pin (matching the LTX-2.3 worker's cu128 setup) `uv sync` resolves cleanly.
- **SVI2-Pro / LongCat: the GPU attention wheels (flash-attn, sageattention) have no aarch64 builds.** On a host with a CUDA toolkit (e.g. DGX Spark — validated on GB10) `uv sync` compiles flash-attn from source (slow, ~30–90 min) and the render works; without a toolkit that build fails and the worker falls back to SDPA (already the Blackwell default). Arch-gating these extras to `x86_64` so the source build is skipped on aarch64 is a pending follow-up (needs a `uv.lock` regen).
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
