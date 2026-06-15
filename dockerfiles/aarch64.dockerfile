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
RUN cargo build --release -p nexus-core --bin nexus-dnn \
 && cp target/release/nexus-dnn /usr/local/bin/nexus-dnn

FROM debian:bookworm-slim AS runtime
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
ENV NEXUS_DATA_DIR=/data \
    NEXUS_PORT=3000
EXPOSE 3000
VOLUME ["/data"]
ENTRYPOINT ["/usr/local/bin/nexus-dnn"]
