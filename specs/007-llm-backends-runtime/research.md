# Phase 0 — Research: LLM Backends Runtime Management

**Feature**: 007-llm-backends-runtime
**Date**: 2026-04-14

No `[NEEDS CLARIFICATION]` markers remain from the specification. The research below resolves the residual technology and integration questions the plan surfaces.

---

## R1. Asset format and extraction strategy for llama.cpp upstream releases

**Decision**: Treat the upstream `ggml-org/llama.cpp` GitHub Release asset as an opaque archive (either `.zip` on Windows or `.tar.gz`/`.zip` on Linux depending on release) and extract into an extension-private directory. Binary discovery looks for `llama-server(.exe)` as the primary artifact.

**Rationale**: Upstream ships prebuilt binaries per release and accelerator profile. Compiling from source is explicitly out of scope (FR-022). Using the release archive preserves the upstream packaging invariants (dynamic libraries beside the executable). Detecting the binary post-extraction keeps the resolver decoupled from the archive layout.

**Alternatives considered**:
- Install via OS package managers (winget/apt): rejected — doesn't support accelerator-profile selection and pins.
- Maintain a custom fork with bundled builds: rejected — duplicates upstream effort and risks drift.

---

## R2. Download + checksum streaming

**Decision**: Stream downloads with `reqwest::Response::bytes_stream()`, write to a temp file, hash with `sha2::Sha256` in the same loop. Progress is reported as `(bytes_downloaded, content_length)` via the event stream at a bounded cadence (~4 Hz).

**Rationale**: Overlaps IO with hashing, matches the "Parallelism-First" principle, and avoids buffering the entire package in memory (typical 100–400 MB). Cadence limits event-stream flooding.

**Alternatives considered**:
- Download-then-hash: simpler, but doubles disk IO and burns memory on big assets.
- Use `curl` subprocess: rejected — adds a runtime dependency and breaks the "ecosystem-first" rule where a Rust crate already solves the problem.

---

## R3. Archive extraction dispatch

**Decision**: Detect by sniffing the first bytes of the downloaded file — `PK\x03\x04` → `zip` crate, `\x1f\x8b` → `flate2::read::GzDecoder` + `tar` crate. Extraction runs on `tokio::task::spawn_blocking`.

**Rationale**: Upstream asset file extensions are not always reliable. Magic-byte detection is deterministic. Extraction is CPU/disk-bound and must not block the async reactor.

**Alternatives considered**:
- Trust the file extension: rejected — some upstream assets ship without extension or with variant naming.

---

## R4. Version manifest format & location

**Decision**: Ship a YAML manifest at `extensions/builtin/local-llm/backends/llamacpp/versions.yaml` with the structure defined in `contracts/version-manifest.schema.json`. Parsed by `serde-saphyr` (already in the workspace per spec 001). Validated against the JSON schema at load time via `jsonschema`.

**Rationale**: YAML is friendlier for hand-authored version matrices than JSON. `serde-saphyr` is already used by the extension loader. Schema validation catches malformed entries early.

**Alternatives considered**:
- JSON manifest: rejected — the existing extension ecosystem uses YAML.
- TOML: rejected — less idiomatic for arrays of arrays (profile matrix).

---

## R5. Cancellation model

**Decision**: Every install phase accepts a `tokio_util::sync::CancellationToken`. The token is signalled by the `Cancel` button; each phase checks the token at IO yield points. Cancellation is only safe during `Resolve release`, `Download package`, `Verify package`, and `Extract files`. Past that point the UI disables the Cancel button and the token is ignored.

**Rationale**: Matches FR-030. Using an explicit token keeps cancellation deterministic and testable without racing futures.

**Alternatives considered**:
- `tokio::select!` with oneshot: works for single tasks but awkward across a phase pipeline.

---

## R6. Validation probe strategy

**Decision**: The 7-step validator runs `llama-server --version` via `ManagedProcess` for checks 1–4, then launches a short-lived `llama-server` with `--host 127.0.0.1 --port <ephemeral>` and a trivially small context for checks 5–7. Health endpoint is polled at `/health` (present on upstream `llama-server`) with a 10 s timeout.

**Rationale**: Upstream `llama-server` exposes `/health`. A short-lived probe validates the full stack (binary load, dependent libraries, port bind, HTTP serve) without requiring a loaded model. Using `ManagedProcess` gives consistent stdout/stderr capture and cleanup.

**Alternatives considered**:
- Skip HTTP probe: rejected — leaves `dependency load failure` and `port bind failure` undetected.
- Model-loading probe: rejected — requires a model and an `n_gpu_layers` decision, which belong to Deployments.

---

## R7. Event stream transport

**Decision**: Reuse the existing host event stream (introduced by spec 005 workflow events). Publish on topics listed in FR-101 using `serde_json` payloads documented in `contracts/backend-events.md`. The frontend consumes via EventSource in a ServiceWorker; the ServiceWorker forwards to the page via `postMessage`.

**Rationale**: Avoids a second transport. ServiceWorker offloading satisfies principle X and survives page re-renders during long installs.

**Alternatives considered**:
- WebSocket per page: rejected — duplicates the existing SSE transport.
- Poll `GET /logs`: rejected — violates the "Parallelism-First" guidance and would lose ordering.

---

## R8. Persistence tables

**Decision**: Add two SQLite tables via an extension-storage contribution (spec 004) owned by the `local-llm` extension:
- `ext_local_llm_runtime_installs`
- `ext_local_llm_runtime_settings`

Schema details are in [data-model.md](./data-model.md). Migrations live in `extensions/builtin/local-llm/storage/migrations/` as a new file (next available number after `003_rag.sql`).

**Rationale**: Keeps ownership inside the extension namespace per spec 004. Settings reference an optional install (by `runtime_install_id`) so that profile switches do not silently re-use stale defaults.

**Alternatives considered**:
- File-based JSON in the runtime directory: rejected — no transactional guarantees when settings change during a launch.

---

## R9. Launch-spec determinism

**Decision**: `launch_spec::generate(&normalized_settings, effective_port)` is a pure function with a stable iteration order over fields. The ordered arg vector is:
`["--host", host, "--port", port, "--threads", n, "--threads-batch", nb, "--ctx-size", c, "--parallel", p, ...extra_args]`.

**Rationale**: Determinism is asserted by SC-007. Extra args appended last preserves the invariant that managed fields win at parse time (upstream `llama-server` uses last-value-wins for repeated flags — documented in contracts).

**Alternatives considered**:
- Random arg order: rejected — breaks determinism and makes diffing launch specs impossible.

---

## R10. Profile detection (machine descriptor)

**Decision**: Host reports a `MachineDescriptor { os, arch, cuda_toolkit_line }`. CUDA toolkit line detected by probing `nvcc --version` if present on PATH, falling back to the NVIDIA driver's reported CUDA runtime version via `nvidia-smi`. If neither is present, `cuda_toolkit_line = None` and only CPU profiles are offered.

**Rationale**: Upstream llama.cpp binaries are built against specific CUDA toolkit lines (12, 13). Selecting the wrong line surfaces as `dependency load failure` or `CUDA mismatch` at validation; detecting ahead of time avoids a known failure mode.

**Alternatives considered**:
- Always install CPU: rejected — defeats the purpose of the accelerator profile selection.
- Ask the user to pick: acceptable fallback when auto-detection is ambiguous, surfaced in the install modal pre-confirmation step.

---

## R11. Existing implementation audit

**Decision**: Before writing new code, run an audit of:
- `crates/nexus-extension/src/` — adapter registry conventions to follow.
- `crates/nexus-api/src/router.rs` — route registration style.
- `extensions/builtin/local-llm/backends/llamacpp/versions.yaml` — existing shape (extend, don't replace).
- `apps/web/src/layout/layout_renderer.tsx` and `component_registry.tsx` — renderer contract the Backends page must satisfy.
- `apps/web/src/catalog/tool_catalog.tsx` — for card styling precedent.
- `crates/nexus-installer/` — any reusable download/extract primitives; prefer adapting those over reintroducing.

**Rationale**: The specification flags that some items may already be partially implemented. Reusing in-repo primitives keeps the slice small and avoids duplicate abstractions.

---

## R12. TensorRT-LLM card handling (unavailable state)

**Decision**: The card is rendered from a static adapter stub that reports `implementation_status = "unavailable"` with a documented reason string. The stub exposes no `install`, `validate`, or `repair` endpoints; the REST handlers return `409 Conflict` with `error.code = "backend_unavailable"` if called.

**Rationale**: Satisfies FR-014 truthfully at both UI and API layers. Prevents accidental activation paths via direct API calls.

**Alternatives considered**:
- Omit the card entirely: rejected — the card communicates the roadmap, which is itself a product value.

---

## Open items (none blocking)

No blocking unknowns remain. All decisions above are implementation-ready and consistent with the constitution, the prior specs (001, 004, 005), and the existing repo layout.
