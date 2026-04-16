# Contract — `nexus-provenance` public surface

**Crate role**: own license resolution and Hugging Face metadata probing added during the R3 work (spec-017 R3). Used by `nexus-models-store` to attach provenance to installed models, and by `nexus-deployments` to attach a provenance summary to model bindings when available.
**Extracted from**: `crates/nexus-backend-runtimes/src/models_store/provenance.rs` and any HF-metadata helpers co-located in the monolith.

## Cargo manifest (outline)

```toml
[package]
name = "nexus-provenance"
version = "0.1.0"
edition = "2021"

[dependencies]
nexus-huggingface = { path = "../nexus-huggingface" }
nexus-core = { path = "../nexus-core" }
serde = { workspace = true, features = ["derive"] }
serde_json = { workspace = true }
thiserror = { workspace = true }
tokio = { workspace = true, features = ["rt"] }
tracing = { workspace = true }
async-trait = { workspace = true }
```

## Public types (preserved semantics)

```rust
#[non_exhaustive]
pub enum ProvenanceLicense {
    Spdx(String),
    Custom { name: String, url: Option<String> },
    Unknown,
}

pub struct ProvenanceRecord {
    pub license: ProvenanceLicense,
    pub hf_repo: Option<String>,
    pub hf_revision: Option<String>,
    pub hf_file: Option<String>,
    pub fetched_at: String,
    pub source_hash: Option<String>,
}

#[async_trait::async_trait]
pub trait ProvenanceResolver: Send + Sync {
    async fn resolve(&self, source: &ProvenanceQuery) -> Result<ProvenanceRecord, ProvenanceError>;
}
```

## Invariants

- No dependency on `nexus-backend-runtimes`, `nexus-deployments`, `nexus-api`, `nexus-storage`.
- Pure orchestration + HTTP via `nexus-huggingface`.
- No HTTP surface of its own.
