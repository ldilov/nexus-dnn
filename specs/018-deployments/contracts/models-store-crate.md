# Contract — `nexus-models-store` public surface

**Crate role**: own the models store — install pipeline, blob dedup, lease budget, quantization matching, resolver, verify, layout, reclaim.
**Extracted from**: `crates/nexus-backend-runtimes/src/models_store/*` and `crates/nexus-backend-runtimes/src/checksum.rs`.

## Cargo manifest (outline)

```toml
[package]
name = "nexus-models-store"
version = "0.1.0"
edition = "2021"

[dependencies]
nexus-storage = { path = "../nexus-storage" }
nexus-huggingface = { path = "../nexus-huggingface" }
nexus-core = { path = "../nexus-core" }
sha2 = { workspace = true }
serde = { workspace = true, features = ["derive"] }
serde_json = { workspace = true }
thiserror = { workspace = true }
tokio = { workspace = true, features = ["rt", "fs", "io-util"] }
tracing = { workspace = true }
async-trait = { workspace = true }

[dev-dependencies]
rstest = { workspace = true }
tokio = { workspace = true, features = ["macros", "rt-multi-thread", "time"] }
```

## Moved code inventory

| From | To | Status |
|---|---|---|
| `nexus-backend-runtimes/src/models_store/errors.rs` | `nexus-models-store/src/errors.rs` | verbatim move; rename internal `ModelStoreError` if needed to match new crate. |
| `nexus-backend-runtimes/src/models_store/blobs.rs` | `nexus-models-store/src/blobs.rs` | verbatim move. |
| `nexus-backend-runtimes/src/models_store/download.rs` | `nexus-models-store/src/download.rs` | verbatim move. |
| `nexus-backend-runtimes/src/models_store/install/*` | `nexus-models-store/src/install/*` | directory move. |
| `nexus-backend-runtimes/src/models_store/leases.rs` | `nexus-models-store/src/leases.rs` | verbatim. |
| `nexus-backend-runtimes/src/models_store/quantization.rs` | `nexus-models-store/src/quantization.rs` | verbatim. |
| `nexus-backend-runtimes/src/models_store/reclaim.rs` | `nexus-models-store/src/reclaim.rs` | verbatim. |
| `nexus-backend-runtimes/src/models_store/resolver.rs` | `nexus-models-store/src/resolver.rs` | verbatim. |
| `nexus-backend-runtimes/src/models_store/verify.rs` | `nexus-models-store/src/verify.rs` | verbatim. |
| `nexus-backend-runtimes/src/checksum.rs` | `nexus-models-store/src/checksum.rs` | moved (single consumer was models-store; if any other caller remains it takes a dep on this crate). |
| `nexus-backend-runtimes/tests/model_*.rs` and `quantization_matching.rs` | `nexus-models-store/tests/*.rs` | move alongside code. |

## Public facade

The public `pub use` surface from `nexus-backend-runtimes` that currently exposes models-store types MUST be preserved by re-exporting from the new crate. `nexus-backend-runtimes::lib.rs` removes its `pub mod models_store;` and related `pub use` lines.

Consumers in `nexus-api`, `nexus-extension`, and tests that previously imported `nexus_backend_runtimes::models_store::…` MUST update their import paths to `nexus_models_store::…`. This is a mechanical change tracked in `tasks.md`.

## Invariants

- No dependency on `nexus-backend-runtimes`, `nexus-deployments`, or `nexus-api`.
- No migrations directory — all DB schema stays in `nexus-storage`.
- All SHA-256 usage preserved verbatim; no algorithm change.
- Public trait `ModelStore` (and any existing traits from the monolith) retain their signatures; only the crate path changes.
