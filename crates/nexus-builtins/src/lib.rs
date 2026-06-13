//! Composition bridge for first-party builtin extensions.
//!
//! This is the single sanctioned crate permitted to depend on builtin
//! extension crates. The host (`nexus-core`, `nexus-api`) stays free of
//! extension types: it constructs a [`BuiltinContext`] of generic host
//! handles and calls [`build_registry`], receiving back a sealed
//! [`nexus_api::extension_router::SharedRegistry`]. No extension type crosses
//! this boundary in either direction.

use std::path::PathBuf;
use std::sync::Arc;

use nexus_api::extension_router::{
    DefaultRegistry, ExtensionId, ExtensionRouterRegistry, SharedRegistry,
};
use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::EventBus;
use nexus_extension::{
    ExtensionContext, ExtensionRegistry, ExtensionRouterProvider, HostFacts,
    InMemoryExtensionRegistry,
};

/// Generic host handles the builtin extensions need at composition time.
/// Every field is a host-owned type — no extension type appears in this
/// struct, so `nexus-core` can build it without naming any extension.
pub struct BuiltinContext {
    pub pool: sqlx::SqlitePool,
    pub host_port: u16,
    pub extension_registry: Arc<InMemoryExtensionRegistry>,
    pub host_data_dir: PathBuf,
    pub model_store_client: Arc<dyn nexus_extension_deps::ModelStoreClient>,
    pub artifact_store: Arc<FilesystemArtifactStore>,
    pub host_model_registrar:
        Option<Arc<dyn nexus_backend_runtimes::generic::host_model_registrar::HostModelRegistrar>>,
    pub event_bus: Arc<dyn EventBus>,
    pub spawner: Option<Arc<nexus_backend_runtimes::spawn::Spawner>>,
    pub backend_event_bus: Arc<nexus_backend_runtimes::events::BackendEventBus>,
    pub install_map: nexus_models_store::downloads::InstallMap,
    pub download_orchestrator: Arc<nexus_models_store::downloads::DownloadOrchestrator>,
}

/// Builds, registers, and seals the router registry for every first-party
/// builtin extension, returning the host-generic [`SharedRegistry`].
pub fn build_registry(ctx: BuiltinContext) -> SharedRegistry {
    let registry = Arc::new(DefaultRegistry::new());
    let host_base_url = format!("http://127.0.0.1:{}", ctx.host_port);

    let chat_resources = Arc::new(nexus_local_llm_chat_history::ChatHandlerResources::new(
        ctx.pool.clone(),
        Some(ctx.install_map.clone()),
        Some(ctx.download_orchestrator.clone()),
        ctx.spawner.clone(),
        ctx.backend_event_bus.clone(),
        ctx.backend_event_bus.clone(),
        nexus_local_llm_chat_history::ModelLoadRegistry::new(),
        nexus_local_llm_chat_history::InferenceCancelRegistry::new(),
    ));

    let providers: Vec<Arc<dyn ExtensionRouterProvider>> = vec![
        Arc::new(nexus_local_llm_chat_history::LocalLlmRouterProvider::new(
            nexus_local_llm_chat_history::LocalLlmProviderResources::from_host_base_url(
                ctx.pool.clone(),
                host_base_url.clone(),
                chat_resources,
            ),
        )),
        Arc::new(emotion_tts_extension::EmotionTtsRouterProvider::new({
            let mut res = emotion_tts_extension::EmotionTtsProviderResources::new(ctx.pool.clone());
            let id = emotion_tts_extension::EXTENSION_ID;
            if let Some(ext) = ctx.extension_registry.get_extension(id) {
                res = res.with_directories(ext.directory.clone(), ctx.host_data_dir.clone());
            }
            res = res.with_model_locator(Arc::new(ModelStoreLocatorAdapter {
                inner: ctx.model_store_client.clone(),
            }));
            res = res.with_artifact_store(Arc::new(
                emotion_tts_extension::host_adapter::HostArtifactStoreAdapter::new(
                    ctx.artifact_store.clone(),
                ),
            ));
            res
        })),
        Arc::new(nexus_video_ltx23_extension::LtxRouterProvider::new({
            let mut res = nexus_video_ltx23_extension::LtxProviderResources::new(ctx.pool.clone());
            res = res.with_host_data_dir(ctx.host_data_dir.clone());
            let id = nexus_video_ltx23_extension::EXTENSION_ID;
            if let Some(ext) = ctx.extension_registry.get_extension(id) {
                res = res.with_extension_dir(ext.directory.clone());
            }
            if let Some(registrar) = ctx.host_model_registrar.clone() {
                res = res.with_host_model_registrar(registrar);
            }
            res
        })),
        Arc::new(svi2_pro_extension::Svi2RouterProvider::new({
            let mut res = svi2_pro_extension::Svi2ProviderResources::new(ctx.pool.clone());
            let id = svi2_pro_extension::EXTENSION_ID;
            if let Some(ext) = ctx.extension_registry.get_extension(id) {
                res = res.with_directories(ext.directory.clone(), ctx.host_data_dir.clone());
            }
            if let Ok(profile) = std::env::var("NEXUS_VIDEO_SVI2_RUNTIME") {
                res = res.with_profile(profile);
            }
            res = res.with_model_locator(Arc::new(ModelStoreLocatorAdapter {
                inner: ctx.model_store_client.clone(),
            }));
            res = res.with_event_bus(ctx.event_bus.clone());
            res
        })),
    ];

    for provider in &providers {
        let id_str = provider.extension_id();
        let parsed_id = match ExtensionId::parse(id_str) {
            Ok(id) => id,
            Err(e) => {
                tracing::error!(
                    extension_id = id_str,
                    error = %e,
                    "extension id failed validation; skipping",
                );
                continue;
            }
        };
        let cx = ExtensionContext::new(id_str, HostFacts::new(&host_base_url));
        match provider.build_router(&cx) {
            Ok((router, http_routes)) => {
                if let Err(e) = registry.register(parsed_id, router, http_routes) {
                    tracing::error!(
                        extension_id = id_str,
                        error = %e,
                        "extension router registration rejected",
                    );
                }
            }
            Err(e) => {
                let reason = e.to_string();
                tracing::warn!(
                    extension_id = id_str,
                    error = %reason,
                    "extension router build failed; recorded as registration_failed",
                );
                if let Err(reg_err) = registry.register_failure(parsed_id, reason) {
                    tracing::error!(
                        extension_id = id_str,
                        error = %reg_err,
                        "could not record registration failure",
                    );
                }
            }
        }
    }

    registry.seal();
    registry as SharedRegistry
}

/// Bridges the generic spec-035 `ModelStoreClient` onto extension-defined
/// `ModelArtifactLocator` contracts. Generic by design — any extension whose
/// locator trait matches this shape is served by the same adapter, keeping
/// the extensions free of host-runtime crate dependencies.
struct ModelStoreLocatorAdapter {
    inner: Arc<dyn nexus_extension_deps::ModelStoreClient>,
}

#[async_trait::async_trait]
impl emotion_tts_extension::host_contract::ModelArtifactLocator for ModelStoreLocatorAdapter {
    /// Resolves a family to the directory holding its snapshot; a single
    /// resolved file is normalized to its parent so multi-file snapshot
    /// installs (config + weights + subdirs) resolve as a whole directory.
    async fn locate_family(&self, family_id: &str) -> Option<std::path::PathBuf> {
        let raw = self
            .inner
            .is_family_installed(family_id, None)
            .await
            .ok()
            .flatten()?;
        if raw.is_file() {
            raw.parent().map(std::path::Path::to_path_buf)
        } else {
            Some(raw)
        }
    }
}

#[async_trait::async_trait]
impl svi2_pro_extension::host_contract::ModelArtifactLocator for ModelStoreLocatorAdapter {
    /// Resolves a family to its snapshot ROOT (the direct child of the
    /// `model-store-downloads` marker dir) because svi2's worker addresses
    /// artifacts by relative path under one merged models directory.
    async fn locate_family(&self, family_id: &str) -> Option<std::path::PathBuf> {
        let raw = self
            .inner
            .is_family_installed(family_id, None)
            .await
            .ok()
            .flatten()?;
        let mut cursor = raw.as_path();
        while let (Some(parent), candidate) = (cursor.parent(), cursor) {
            if parent
                .file_name()
                .is_some_and(|n| n == "model-store-downloads")
            {
                return Some(candidate.to_path_buf());
            }
            cursor = parent;
        }
        if raw.is_file() {
            raw.parent().map(std::path::Path::to_path_buf)
        } else {
            Some(raw)
        }
    }
}
