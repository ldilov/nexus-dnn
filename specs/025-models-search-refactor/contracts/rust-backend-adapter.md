# Contract — Rust `BackendAdapter` trait + `CapabilityRegistry`

**Feature**: 025-models-search-refactor
**Phase**: 1 (design)

## 1. `BackendAdapter` trait (sealed)

Lives in `crates/nexus-models-store/src/capabilities/adapter.rs`.

```rust
use crate::capabilities::{BackendCapability, BackendId};

pub(crate) mod private { pub trait Sealed {} }

pub trait BackendAdapter: private::Sealed + Send + Sync {
    fn id(&self) -> &BackendId;
    fn capability(&self) -> &BackendCapability;
}
```

Sealed per Principle V — only host-internal implementors may add a backend. External extensions add backends by contributing via the module-registration mechanism already used elsewhere in the workspace; they do not implement this trait directly.

## 2. `CapabilityRegistry` (SINGLE-CHOICE owner)

```rust
pub struct CapabilityRegistry {
    backends: Vec<Arc<dyn BackendAdapter>>,
}

impl CapabilityRegistry {
    pub fn new() -> Self { Self { backends: Vec::new() } }

    pub fn register(&mut self, adapter: Arc<dyn BackendAdapter>) { ... }

    pub fn list(&self) -> impl Iterator<Item = &BackendCapability> { ... }

    pub fn supporting_format(&self, fmt: Format) -> impl Iterator<Item = &BackendCapability> { ... }

    pub fn is_runnable(&self, family: &ModelFamily) -> bool { ... }
}
```

Per Principle III (SINGLE-CHOICE): **nothing else** in the workspace may enumerate backends or their supported formats. The registry is injected into `/api/v1/model-store/*` handlers via `axum::Extension<Arc<CapabilityRegistry>>`.

## 3. Worked example — adding a second backend

To add, e.g., a `diffusers` backend in a future spec:

1. Create `crates/nexus-diffusers-runtime/` with its own supervisor + installer (analogous to `nexus-backend-runtimes::llamacpp`).
2. Implement a `DiffusersAdapter` in that crate with `BackendAdapter` sealed via a thin shim crate (following the established pattern).
3. In the host assembly point, `registry.register(Arc::new(DiffusersAdapter::new()))`.

**What does NOT change**:

- `apps/web/src/views/models-search/` — zero edits.
- `crates/nexus-api/src/handlers/model_store/*.rs` — zero edits.
- `crates/nexus-models-store/src/normalize/*` — zero edits.
- DTO shapes — zero edits; `#[non_exhaustive]` on `Format` means a new variant can be added without breaking clients pinned to older versions.

Contract test `T-B2` (in `tests/contract/model_store_backends.rs`) exercises this path with a test-only adapter, proving **SC-004** mechanically.

## 4. Error taxonomy

```rust
#[derive(thiserror::Error, Debug)]
pub enum ModelStoreError {
    #[error("upstream unavailable: {0}")]      UpstreamUnavailable(#[source] reqwest::Error),
    #[error("auth required for {repo}")]        AuthRequired { repo: String },
    #[error("family not found: {0}")]           FamilyNotFound(String),
    #[error("target not found in family")]      TargetNotFound,
    #[error("incompatible: {0}")]               Incompatible(String),
    #[error("storage error")]                   Storage(#[from] sqlx::Error),
    #[error("internal: {0}")]                   Internal(String),
}
```

Handlers map this into the REST envelope's `error.code` (snake_case variant name).
