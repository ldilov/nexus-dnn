//! Backend capability registry — the single source of truth for which
//! runtime backends exist and which artifact formats each supports.
//!
//! Principle III (SINGLE-CHOICE) makes this module the only enumerator of
//! backends in the workspace. Principle V keeps the [`BackendAdapter`]
//! trait sealed so only host-internal implementors may add a backend.

use std::sync::Arc;

use crate::ids::BackendId;
use crate::model::{BackendCapability, BackendStatus, ModelFamily};
use crate::types::Format;

mod private {
    pub trait Sealed {}
}

pub trait BackendAdapter: private::Sealed + Send + Sync {
    fn id(&self) -> &BackendId;
    fn capability(&self) -> &BackendCapability;
}

/// In-memory registry of all compiled-in backend adapters.
///
/// Constructed once at host-assembly time and wrapped in `Arc` before
/// being injected into axum extensions.
#[derive(Default)]
pub struct CapabilityRegistry {
    backends: Vec<Arc<dyn BackendAdapter>>,
}

impl CapabilityRegistry {
    /// Fresh empty registry. Adapters are added via [`Self::register`].
    #[must_use]
    pub fn new() -> Self {
        Self {
            backends: Vec::new(),
        }
    }

    /// Register a backend. Idempotent on `backend_id`; re-registering
    /// the same id replaces the prior entry.
    pub fn register(&mut self, adapter: Arc<dyn BackendAdapter>) {
        let id = adapter.id().clone();
        self.backends.retain(|a| a.id() != &id);
        self.backends.push(adapter);
    }

    /// Every registered backend's capability, in registration order.
    pub fn list(&self) -> impl Iterator<Item = &BackendCapability> + '_ {
        self.backends.iter().map(|a| a.capability())
    }

    /// Count of registered backends — useful for the degraded-registry
    /// response header in the search handler.
    #[must_use]
    pub fn len(&self) -> usize {
        self.backends.len()
    }

    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.backends.is_empty()
    }

    /// Every enabled (or experimental) backend that supports a given
    /// format. Disabled backends are filtered out.
    pub fn supporting_format(
        &self,
        fmt: Format,
    ) -> impl Iterator<Item = &BackendCapability> + '_ {
        self.backends
            .iter()
            .map(|a| a.capability())
            .filter(move |cap| !matches!(cap.status, BackendStatus::Disabled))
            .filter(move |cap| cap.supported_formats.contains(&fmt))
    }

    /// `true` iff at least one enabled backend supports the family's
    /// primary artifact format. Used by
    /// [`crate::normalize::compat::classify_compat`].
    #[must_use]
    pub fn is_runnable(&self, family: &ModelFamily) -> bool {
        family.artifacts.iter().any(|a| {
            a.role == crate::types::DependencyRole::Primary
                && self.supporting_format(a.format).next().is_some()
        })
    }
}

/// The llama.cpp adapter — the only backend registered in v1.
pub struct LlamaCppAdapter {
    id: BackendId,
    capability: BackendCapability,
}

impl LlamaCppAdapter {
    #[must_use]
    pub fn new() -> Self {
        let id = BackendId::from("llama.cpp");
        Self {
            capability: BackendCapability {
                backend_id: id.clone(),
                display_name: "llama.cpp".into(),
                supported_formats: vec![Format::Gguf, Format::Ggml],
                supports_quantized_variants: true,
                supports_multi_artifact_models: false,
                status: BackendStatus::Enabled,
            },
            id,
        }
    }
}

impl Default for LlamaCppAdapter {
    fn default() -> Self {
        Self::new()
    }
}

impl private::Sealed for LlamaCppAdapter {}

/// Test-only adapter. Lives in the crate so the sealed trait
/// invariant is preserved — external crates cannot implement
/// [`BackendAdapter`], but they can register a `TestAdapter` to
/// exercise multi-backend code paths (SC-004).
pub struct TestAdapter {
    id: BackendId,
    capability: BackendCapability,
}

impl TestAdapter {
    #[must_use]
    pub fn new(capability: BackendCapability) -> Self {
        Self {
            id: capability.backend_id.clone(),
            capability,
        }
    }
}

impl private::Sealed for TestAdapter {}

impl BackendAdapter for TestAdapter {
    fn id(&self) -> &BackendId {
        &self.id
    }

    fn capability(&self) -> &BackendCapability {
        &self.capability
    }
}

impl BackendAdapter for LlamaCppAdapter {
    fn id(&self) -> &BackendId {
        &self.id
    }

    fn capability(&self) -> &BackendCapability {
        &self.capability
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ids::{ArtifactId, FamilyId};
    use crate::model::{Artifact, ModelRepository, SourceProvider};
    use crate::types::{
        CompatibilityStatus, DependencyRole, Modality, Precision, PrecisionSource,
    };

    fn llm_family(fmt: Format) -> ModelFamily {
        ModelFamily {
            family_id: FamilyId::from("huggingface:test/model"),
            repository: ModelRepository {
                repo_id: "test/model".into(),
                source_provider: SourceProvider::Huggingface,
                owner: "test".into(),
                name: "model".into(),
                description: None,
                license: None,
                tags: vec![],
                downloads: None,
                likes: None,
                last_updated: None,
                modality: Modality::Llm,
            },
            artifacts: vec![Artifact {
                artifact_id: ArtifactId::from("huggingface:test/model#model.gguf"),
                role: DependencyRole::Primary,
                format: fmt,
                precision: Precision::Quantized,
                precision_source: PrecisionSource::Explicit,
                size_bytes: Some(5_000_000_000),
                filename: "model.gguf".into(),
                download_url: "https://example".into(),
                sha256: None,
                install_state: crate::types::DownloadState::NotDownloaded,
            }],
            variants: vec![],
            dependencies: vec![],
            compat: CompatibilityStatus::Unknown,
            warnings: vec![],
        }
    }

    #[test]
    fn llama_cpp_adapter_advertises_gguf_and_ggml() {
        let adapter = LlamaCppAdapter::new();
        assert_eq!(adapter.capability().supported_formats, vec![Format::Gguf, Format::Ggml]);
        assert_eq!(adapter.capability().status, BackendStatus::Enabled);
    }

    #[test]
    fn registry_supporting_format_filters_correctly() {
        let mut reg = CapabilityRegistry::new();
        reg.register(Arc::new(LlamaCppAdapter::new()));
        assert_eq!(reg.supporting_format(Format::Gguf).count(), 1);
        assert_eq!(reg.supporting_format(Format::Safetensors).count(), 0);
    }

    #[test]
    fn registry_is_runnable_matches_primary_format() {
        let mut reg = CapabilityRegistry::new();
        reg.register(Arc::new(LlamaCppAdapter::new()));
        assert!(reg.is_runnable(&llm_family(Format::Gguf)));
        assert!(!reg.is_runnable(&llm_family(Format::Safetensors)));
    }

    #[test]
    fn registry_register_is_idempotent_on_id() {
        let mut reg = CapabilityRegistry::new();
        reg.register(Arc::new(LlamaCppAdapter::new()));
        reg.register(Arc::new(LlamaCppAdapter::new()));
        assert_eq!(reg.len(), 1);
    }
}
