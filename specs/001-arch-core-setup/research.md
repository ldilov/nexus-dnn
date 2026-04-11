# Research: Architecture Core Setup

**Date**: 2026-04-11
**Feature**: 001-arch-core-setup

## R-001: Async Runtime

**Decision**: tokio 1.48 (LTS)
**Rationale**: De facto standard for async Rust. First-class support for child processes (`tokio::process`), broadcast channels (`tokio::sync::broadcast`), WebSocket via axum, and file I/O. Every major async crate (axum, sqlx, hyper) is built on tokio.
**Alternatives considered**: async-std (stalled development, smaller ecosystem — rejected)

## R-002: HTTP/WebSocket Server

**Decision**: axum 0.8
**Rationale**: Built by the tokio team on hyper+tower. Supports extractors for DI, built-in WebSocket upgrade, tower middleware for clean transport/logic separation. 100% safe Rust. Ecosystem standard in 2026.
**Alternatives considered**: actix-web (own runtime, not pure tokio — rejected), warp (unreadable type errors, less active — rejected)

## R-003: SQLite

**Decision**: sqlx 0.8 with `runtime-tokio` and `sqlite` features
**Rationale**: Native async support, compile-time checked queries, built-in migration tooling (`sqlx-cli`), bundled SQLite (no system dependency). If Postgres is ever needed, zero query-layer changes.
**Alternatives considered**: rusqlite (synchronous only, requires spawn_blocking wrappers — rejected for ergonomic reasons)

## R-004: JSON-RPC over stdio

**Decision**: Custom thin layer on serde_json + tokio I/O
**Rationale**: The JSON-RPC 2.0 wire format over stdio is trivial (~150 lines). Existing crates are either deprecated (jsonrpc-stdio-server by Parity) or lack stdio transport (jsonrpsee). A custom implementation using `tokio::io::BufReader` on stdin with `serde_json` for serialization gives full control and zero unnecessary dependencies.
**Alternatives considered**: jsonrpsee (no stdio transport — rejected), jsonrpc-stdio-server (deprecated — rejected)

## R-005: JSON Schema Validation

**Decision**: jsonschema 0.45
**Rationale**: Fastest JSON Schema validator in the Rust ecosystem. Supports Draft 4/6/7/2019-09/2020-12. Actively maintained. Validate YAML by deserializing to `serde_json::Value` first, then validating against schema.
**Alternatives considered**: valico (outdated, less spec coverage — rejected)

## R-006: YAML Parsing

**Decision**: serde-saphyr 0.0.10
**Rationale**: `serde_yaml` is deprecated and unmaintained. `serde_yml` is archived due to unsoundness. serde-saphyr is built on saphyr-parser (pure Rust, no unsafe), passes the full YAML test suite (1000+ tests), is panic-free on malformed input, and has configurable budgets against malicious YAML.
**Alternatives considered**: serde_yaml (deprecated — rejected), serde_yml (archived, segfault — rejected), yaml-rust2 (no serde integration — rejected)

## R-007: Semver Range Compatibility

**Decision**: semver 1.0 (by dtolnay)
**Rationale**: Official Rust/Cargo semver crate. Supports `VersionReq::parse(">=0.1.0, <0.2.0")` for range matching. Stable at 1.x, maintained by dtolnay. Cargo-style range syntax is the Rust ecosystem standard and natural for Rust extension authors.
**Alternatives considered**: node-semver (npm-style ranges — rejected as non-idiomatic for Rust ecosystem)

## R-008: Child Process Management

**Decision**: tokio::process + tokio_util::codec::LinesCodec
**Rationale**: `tokio::process::Command` with piped stdio is sufficient. Use `.kill_on_drop(true)` for safety. Frame stdout/stdin with `LinesCodec` + `FramedRead`/`FramedWrite` for line-delimited JSON-RPC messages. Separate read/write into independent tokio tasks coordinated via `mpsc` channels to avoid deadlocks.
**Alternatives considered**: processmanager (too heavyweight for OS process supervision — rejected), dedicated supervisor crates (unnecessary for this use case)

## R-009: Event Broadcasting

**Decision**: tokio::sync::broadcast wrapped in a typed `EventBus<T>`
**Rationale**: Multi-producer multi-consumer, bounded buffer, typed events via generics, graceful behavior when no subscribers exist (sends succeed, messages held in backlog). Lagging receivers get `RecvError::Lagged(n)` without blocking senders. ~20 lines of wrapper code. WebSocket adapter bridges broadcast receiver to each connected client.
**Alternatives considered**: tokio::sync::watch (keeps only latest value, wrong model — rejected), event_bus_rs (uses raw bytes, not typed — rejected)

## R-010: Error Handling

**Decision**: thiserror 2.x (library crates) + anyhow 1.x (binary crate)
**Rationale**: thiserror for per-crate structured error enums with `#[derive(Error)]`. anyhow for the binary entrypoint with `.context()` for rich reporting. Use `#[from]` to compose errors across crate boundaries, `#[error(transparent)]` for forwarding.
**Alternatives considered**: snafu (single crate combining both patterns — kept as future option if workspace grows beyond 20+ crates)

## R-011: Structured Logging

**Decision**: tracing 0.1 (all crates) + tracing-subscriber 0.3 (binary crate)
**Rationale**: De facto standard for async Rust structured logging. Spans with timing, events, per-crate log level control via `RUST_LOG`. Use `#[tracing::instrument]` on async functions. tracing-log bridges dependencies using the `log` crate.
**Alternatives considered**: log crate (no span support, no structured fields — rejected)

## R-012: Serialization

**Decision**: serde 1.x + serde_json 1.x
**Rationale**: Universal standard for Rust serialization. Required by every other crate in the stack.

## Dependency Summary

| Domain | Crate | Version |
|--------|-------|---------|
| Async runtime | tokio | 1.48 |
| HTTP + WebSocket | axum | 0.8 |
| SQLite | sqlx | 0.8 |
| JSON-RPC stdio | serde_json (custom layer) | 1.x |
| JSON Schema | jsonschema | 0.45 |
| YAML | serde-saphyr | 0.0.10 |
| Semver | semver | 1.0 |
| Process mgmt | tokio::process + tokio_util | 1.48 / 0.7 |
| Event bus | tokio::sync::broadcast | 1.48 |
| Errors (lib) | thiserror | 2.x |
| Errors (bin) | anyhow | 1.x |
| Logging | tracing + tracing-subscriber | 0.1 / 0.3 |
| Serialization | serde + serde_json | 1.x |
| CLI (dev) | clap | 4.x |
| UUID | uuid | 1.x |
| Time | chrono | 0.4 |
| Hashing | sha2 | 0.10 |
