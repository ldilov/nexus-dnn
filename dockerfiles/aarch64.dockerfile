# syntax=docker/dockerfile:1.7
# Multi-stage aarch64 (linux/arm64) image for the nexus-dnn host.
#
# Stage 1 compiles the Rust host. build.rs builds + embeds the web app via
# rust-embed, so node/pnpm are build-time only. Stage 2 is a slim runtime
# carrying just what extensions need at *install* time:
#   - ffmpeg            (system_binary dep; manifests prefer PATH ffmpeg)
#   - gcc/g++/make      (source wheels, e.g. pyahocorasick)
#   - clang -> cc shim  (python-build-standalone records CC=clang in sysconfig)
#   - uv                (drives `uv sync` package-set installs)
#   - git, curl, certs  (VCS deps + downloads)
#
# Built-in extensions ship under /usr/local/share/nexus-dnn/extensions/builtin;
# the host resolves that automatically (exe-relative ../share probe), so no
# NEXUS_BUILTIN_EXTENSIONS_DIR override is required.
#
# Build (run from repo root so the root .dockerignore applies):
#   docker build -f dockerfiles/aarch64.dockerfile -t ldilov/nexusdnn:dgx .
# Run (NVIDIA CDI GPU + persistent data volume):
#   docker run -d --name nexusdnn --restart unless-stopped \
#     --device nvidia.com/gpu=all -p 3000:3000 -v nexusdata:/data \
#     ldilov/nexusdnn:dgx

ARG NODE_VERSION=v22.22.3

FROM rust:1-bookworm AS builder
ARG NODE_VERSION
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl xz-utils ca-certificates git \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL "https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-arm64.tar.xz" \
      | tar xJ -C /usr/local --strip-components=1 \
 && corepack enable \
 && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY . .
# Per-deploy id stamped into sw.js (vite define) so its bytes change every
# build — even extension-only — so the SW purge+reload fires on every deploy.
ARG NEXUS_BUILD_ID=dev
ENV NEXUS_BUILD_ID=${NEXUS_BUILD_ID}
# Build the web app up front so apps/web/dist exists before nexus-api's
# rust-embed embeds it. nexus-api compiles before nexus-core's build.rs runs,
# so relying on that build.rs to emit dist in time is a race that loses on a
# clean build (`#[derive(RustEmbed)] folder ... does not exist`). Building it
# here makes it deterministic; build.rs may rebuild it later, which is a no-op.
RUN pnpm --dir apps/web install \
 && pnpm --dir apps/web run build
# Rebuild each built-in extension's web bundle from source (runtime serves
# <ext>/web/dist). Best-effort: a failure keeps that ext's committed dist + logs.
RUN for pj in extensions/builtin/*/web/package.json; do \
      dir="$(dirname "$pj")"; \
      node -e "process.exit((require('./$pj').scripts||{}).build?0:1)" || continue; \
      echo ">>> building extension web: $dir"; \
      if pnpm --dir "$dir" install && pnpm --dir "$dir" run build; then \
        echo ">>> ok: $dir"; \
      else \
        echo "!!! WARNING: $dir web build FAILED — shipping its committed dist"; \
      fi; \
    done
RUN cargo build --release -p nexus-core --bin nexus-dnn \
 && cp target/release/nexus-dnn /usr/local/bin/nexus-dnn

# CUDA 13 runtime base: provides system libcudart/libcublas/libcublasLt.so.13
# that the prebuilt stable-diffusion.cpp `sd` binary links against. torch-based
# extensions bring their own bundled CUDA libs in-venv and are unaffected.
FROM nvidia/cuda:13.0.1-runtime-ubuntu24.04 AS runtime
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      ffmpeg gcc g++ make git curl ca-certificates xz-utils libssl3 \
 && rm -rf /var/lib/apt/lists/*
RUN printf '#!/bin/sh\nexec cc "$@"\n'  > /usr/local/bin/clang   && chmod +x /usr/local/bin/clang \
 && printf '#!/bin/sh\nexec c++ "$@"\n' > /usr/local/bin/clang++ && chmod +x /usr/local/bin/clang++
RUN curl -fsSL https://github.com/astral-sh/uv/releases/latest/download/uv-aarch64-unknown-linux-gnu.tar.gz \
      | tar xz -C /usr/local/bin --strip-components=1 \
 && uv --version
COPY --from=builder /usr/local/bin/nexus-dnn /usr/local/bin/nexus-dnn
COPY --from=builder /app/extensions/builtin /usr/local/share/nexus-dnn/extensions/builtin
# Vendored wheels: ext workers `[tool.uv.sources]` ref `../../../../binaries/...`
# (resolves the same in-repo + in-image). Covers svi2-pro AND trellis2 sm_121 kernels.
COPY --from=builder /app/binaries /usr/local/share/nexus-dnn/binaries
COPY --from=builder /app/binaries/linux-aarch64/sd-cli-linux-aarch64 /usr/local/bin/sd
RUN chmod +x /usr/local/bin/sd
# EmotionTTS concurrent-worker ceiling — the recipe UI offers 1..this many at
# runtime start. Each worker is one resident IndexTTS-2 model (~N× VRAM); the
# pool providers are lazy so an unused ceiling costs nothing, and the active
# cap defaults to 1 (serial) until the user picks more. Override per container:
# `docker run -e EMOTIONTTS_MAX_WORKERS=2 ...` (hard max 8).
ENV NEXUS_DATA_DIR=/data \
    NEXUS_PORT=3000 \
    EMOTIONTTS_MAX_WORKERS=4
EXPOSE 3000
VOLUME ["/data"]
ENTRYPOINT ["/usr/local/bin/nexus-dnn"]
