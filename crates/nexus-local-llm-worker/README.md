# nexus-local-llm-worker

Rust sidecar worker for the builtin `nexus.local-llm` extension.

## Status

Scaffolding only. Phase 1 (Setup) + partial Phase 2 (Foundational) complete. See
[spec 024](../../specs/024-local-llm-rust-port/) for the full plan.

## What this crate is

A compiled sidecar binary launched by the Nexus host over stdio. It speaks JSON-RPC
to the host, exposes the `nexus.local-llm` Operators and Methods, and — for host-
registered runtimes (llama.cpp today) — acquires a `RuntimeLease` from the host
and proxies OpenAI-compatible HTTP calls to the leased `llama-server` child. The
host spawns and supervises the runtime child; the extension is a lease consumer.

The architectural rule is *spawn ownership follows registration ownership*. Host-
registered universal runtimes are host-spawned and shareable via leases across
extensions. Future extensions shipping their own private runtimes (e.g., a VLLM
extension with an embedded Python environment) spawn and supervise those
themselves; that path is out of scope for this crate.

## What this crate is not

- It does not install, download, or checksum-verify llama.cpp binaries. The host's
  `nexus-backend-runtimes` owns that.
- It does not download GGUFs, call HuggingFace, or parse GGUF headers. The host's
  `nexus-models-store` + `nexus-huggingface` own that.
- It does not `tokio::process::Command::spawn` `llama-server`. The host does.

## See

- [../../specs/024-local-llm-rust-port/plan.md](../../specs/024-local-llm-rust-port/plan.md)
- [../../specs/024-local-llm-rust-port/quickstart.md](../../specs/024-local-llm-rust-port/quickstart.md)
