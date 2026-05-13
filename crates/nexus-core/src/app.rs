use std::path::Path;
use std::sync::Arc;

use anyhow::Context;
use semver::Version;

use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::EventBus;
use nexus_events::types::NexusEvent;
use nexus_extension::{
    ActivatedExtension, DiscoveryReport, ExtensionRegistry, InMemoryExtensionRegistry,
};
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::{Database, SqliteDatabase};
use nexus_worker::DefaultWorkerManager;

use crate::config::NexusConfig;

const VERSION: &str = env!("CARGO_PKG_VERSION");
const HOST_API_VERSION: &str = "0.1.0";
const PROTOCOL_VERSION: &str = "0.1.0";

#[derive(Clone, Debug, serde::Serialize)]
pub struct SubsystemStatus {
    pub name: String,
    pub status: String,
}

#[derive(Clone, Debug, serde::Serialize)]
pub struct HealthStatus {
    pub status: String,
    pub subsystems: Vec<SubsystemStatus>,
    pub version: String,
}

pub struct NexusApp {
    pub config: NexusConfig,
    pub event_bus: Arc<dyn EventBus>,
}

impl NexusApp {
    pub fn new(config: NexusConfig, event_bus: Arc<dyn EventBus>) -> Self {
        Self { config, event_bus }
    }

    pub async fn initialize(&self) -> anyhow::Result<()> {
        self.create_data_directories().await?;
        tracing::info!(
            data_dir = %self.config.resolved_data_dir().display(),
            "data directory initialized"
        );
        // Self-diagnostic banner: gather environment facts
        // (ffmpeg/nvcc on PATH, free disk, db size, etc.) so any
        // "why is X broken?" debug session has the answers in the log
        // without needing to re-run anything.
        crate::diagnostic::run_and_log(&self.config);
        Ok(())
    }

    pub fn health_status(&self) -> HealthStatus {
        let subsystem_names = [
            "database",
            "artifact_store",
            "extension_registry",
            "worker_manager",
            "event_bus",
        ];

        let subsystems = subsystem_names
            .iter()
            .map(|name| SubsystemStatus {
                name: (*name).to_owned(),
                status: "ok".to_owned(),
            })
            .collect();

        HealthStatus {
            status: "healthy".to_owned(),
            subsystems,
            version: VERSION.to_owned(),
        }
    }

    pub async fn run(self) -> anyhow::Result<()> {
        self.initialize().await?;

        let db = Arc::new(
            SqliteDatabase::new(&self.config.database_url())
                .await
                .context("failed to initialize database")?,
        );

        let artifact_store = Arc::new(FilesystemArtifactStore::new(self.config.artifacts_dir()));

        let event_bus = self.event_bus.clone();

        let extensions_dir = self.config.extensions_dir();
        let host_version = Version::parse(HOST_API_VERSION).context("invalid host api version")?;
        let protocol_version =
            Version::parse(PROTOCOL_VERSION).context("invalid protocol version")?;

        let (extension_registry, discovery_report) = InMemoryExtensionRegistry::from_directory(
            &extensions_dir,
            &host_version,
            &protocol_version,
        )
        .await
        .context("failed to initialize extension registry")?;

        tracing::info!(
            activated = discovery_report.activated.len(),
            invalid = discovery_report.invalid.len(),
            "extension discovery complete"
        );

        emit_discovery_events(event_bus.as_ref(), &discovery_report);

        let builtin_dir = self.config.builtin_extensions_dir();
        if builtin_dir.exists() {
            match extension_registry.scan_builtin_extensions_dir(
                &builtin_dir,
                &host_version,
                &protocol_version,
            ) {
                Ok(builtin_report) => {
                    tracing::info!(
                        discovered = builtin_report.activated.len(),
                        invalid = builtin_report.invalid.len(),
                        path = %builtin_dir.display(),
                        "builtin extension discovery complete"
                    );

                    for ext_id in &builtin_report.activated {
                        match extension_registry.activate_builtin_extension(
                            ext_id,
                            &host_version,
                            &protocol_version,
                        ) {
                            Ok(()) => {
                                tracing::info!(extension_id = %ext_id, "builtin extension activated");
                            }
                            Err(e) => {
                                tracing::warn!(
                                    extension_id = %ext_id,
                                    error = %e,
                                    "failed to activate builtin extension"
                                );
                            }
                        }
                    }

                    emit_discovery_events(event_bus.as_ref(), &builtin_report);
                }
                Err(e) => {
                    tracing::warn!(
                        error = %e,
                        path = %builtin_dir.display(),
                        "builtin extension discovery failed"
                    );
                }
            }
        }

        log_discovery_summary(&extension_registry);

        let extension_registry = Arc::new(extension_registry);

        persist_discovery_to_db(&db, &extension_registry).await?;

        let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));
        let scheduler: Arc<RoundRobinScheduler> = Arc::new(RoundRobinScheduler);

        let run_engine = Arc::new(DefaultRunEngine::new(
            db.clone(),
            worker_manager.clone(),
            artifact_store.clone(),
            event_bus.clone(),
            scheduler.clone(),
        ));

        let storage_manager = std::sync::Arc::new(
            nexus_storage::StorageManager::builder(db.clone())
                .event_bus(event_bus.clone())
                .build(),
        );

        let app_for_health = Arc::new(self);
        let app_ref = Arc::clone(&app_for_health);

        nexus_backend_runtimes::run_startup_migrations(
            db.pool(),
            &app_for_health.config.resolved_data_dir(),
        )
        .await
        .context("startup migrations failed")?;

        let backend_adapter_registry = build_backend_adapter_registry(
            &app_for_health.config.resolved_data_dir(),
            &app_for_health.config.builtin_extensions_dir(),
            db.pool().clone(),
            event_bus.clone(),
        )
        .await;

        let backend_event_bus =
            Arc::new(nexus_backend_runtimes::events::BackendEventBus::new(1024));

        let spawner = backend_adapter_registry.as_ref().map(|adapters| {
            let publisher: nexus_backend_runtimes::events::SharedPublisher =
                backend_event_bus.clone();
            Arc::new(nexus_backend_runtimes::spawn::Spawner::with_pool(
                publisher,
                db.pool().clone(),
                adapters.clone(),
            ))
        });

        let huggingface: Arc<dyn nexus_huggingface::HuggingFaceCapability> =
            Arc::new(nexus_huggingface::HuggingFaceClient::new(
                db.pool().clone(),
                nexus_huggingface::HfToken::from_env(),
            ));

        let host_install_paths = {
            let data_dir = app_for_health.config.resolved_data_dir();
            Some(nexus_api::HostInstallPaths {
                installs_root: data_dir.join("host-models").join("installs"),
                blobs_root: data_dir.join("host-models").join("blobs"),
            })
        };
        if let Some(paths) = host_install_paths.as_ref() {
            tokio::fs::create_dir_all(&paths.installs_root).await.ok();
            tokio::fs::create_dir_all(&paths.blobs_root).await.ok();
        }

        let capability_registry = {
            let mut reg = nexus_models_store::capabilities::CapabilityRegistry::new();
            reg.register(Arc::new(
                nexus_models_store::capabilities::LlamaCppAdapter::new(),
            ));
            Some(Arc::new(reg))
        };

        let download_sink_root = host_install_paths
            .as_ref()
            .map(|p| p.blobs_root.join("model-store-downloads"))
            .unwrap_or_else(|| std::path::PathBuf::from("./model-store-downloads"));
        if let Err(e) = tokio::fs::create_dir_all(&download_sink_root).await {
            tracing::warn!(error = %e, path = ?download_sink_root, "failed to create download sink root");
        }
        let shared_pool = Arc::new(db.pool().clone());
        let download_job_store = Arc::new(nexus_models_store::downloads::JobStore::new(
            shared_pool.clone(),
        ));
        let install_map = nexus_models_store::downloads::InstallMap::new(shared_pool);
        let hf_token_store =
            nexus_models_store::downloads::TokenStore::new(std::env::var("HF_TOKEN").ok());
        let download_orchestrator =
            Arc::new(nexus_models_store::downloads::DownloadOrchestrator::new(
                (*download_job_store).clone(),
                install_map.clone(),
                download_sink_root,
                reqwest::Client::new(),
                hf_token_store.clone(),
            ));
        if let Err(e) = download_orchestrator.recover_startup_state().await {
            tracing::warn!(error = %e, "download orchestrator startup rehydration failed");
        }

        let pool_for_extensions = db.pool().clone();
        let chat_resources =
            std::sync::Arc::new(nexus_local_llm_chat_history::ChatHandlerResources::new(
                pool_for_extensions.clone(),
                Some(install_map.clone()),
                Some(download_orchestrator.clone()),
                spawner.clone(),
                backend_event_bus.clone(),
                backend_event_bus.clone(),
                nexus_local_llm_chat_history::ModelLoadRegistry::new(),
                nexus_local_llm_chat_history::InferenceCancelRegistry::new(),
            ));
        // Spec 035 — clone the handles the dep adapters need before they get
        // moved into the AppState fields below.
        let db_for_dep = db.clone();
        let install_map_for_dep = install_map.clone();
        let download_orchestrator_for_dep = download_orchestrator.clone();
        let huggingface_for_dep = huggingface.clone();
        let capability_registry_for_dep = capability_registry.clone();
        let download_job_store_for_dep = download_job_store.clone();

        // Construct the model-store client up front so the same instance can
        // flow into (a) the extension router registry — extensions that need
        // to query installed model paths at acquire time consume it through
        // their own contract — and (b) the AppState `dep_model_store` field
        // below. Avoids two parallel constructions diverging.
        let model_store_client: Arc<dyn nexus_extension_deps::ModelStoreClient> =
            Arc::new(nexus_api::dep_bootstrap::RealModelStoreClient::new(
                install_map_for_dep.clone(),
                download_orchestrator_for_dep.clone(),
                Some(huggingface_for_dep.clone()),
                capability_registry_for_dep.clone(),
                Some(download_job_store_for_dep.clone()),
            ));

        let extension_router_registry = build_extension_router_registry(
            pool_for_extensions,
            app_for_health.config.port,
            chat_resources,
            extension_registry.clone(),
            app_for_health.config.resolved_data_dir(),
            model_store_client.clone(),
            artifact_store.clone(),
        );

        // Resolve the embedded-Python asset once: env-var override wins, then
        // the spec-032 REGISTRY pin for the host's target triple. The same
        // asset feeds BOTH the legacy backend pipeline (FamilyPythonHandler in
        // family_handlers) AND the spec-035 dep installer's RealRuntimeBootstrapper.
        let resolved_python_asset =
            match nexus_backend_runtimes::family_python::PythonAssetConfig::from_env().load() {
                Ok(Some(asset)) => {
                    tracing::info!(
                        url = %asset.url,
                        kind = ?asset.kind,
                        source = "env",
                        "embedded-Python asset configured"
                    );
                    Some(asset)
                }
                Ok(None) => {
                    match nexus_backend_runtimes::family_python::builtin_assets::for_current_target(
                    ) {
                        Some(asset) => {
                            tracing::info!(
                                url = %asset.url,
                                kind = ?asset.kind,
                                source = "registry",
                                release_tag = nexus_backend_runtimes::family_python::builtin_assets::release_tag(),
                                python_version = nexus_backend_runtimes::family_python::builtin_assets::python_version(),
                                "embedded-Python asset resolved from REGISTRY"
                            );
                            Some(asset)
                        }
                        None => {
                            tracing::debug!(
                                "no embedded-Python asset for this host target; python-family \
                         installs will fail until NEXUS_EMBEDDED_PYTHON_* env vars are set \
                         or the target triple is added to REGISTRY"
                            );
                            None
                        }
                    }
                }
                Err(reason) => {
                    tracing::warn!(%reason, "invalid NEXUS_EMBEDDED_PYTHON_* env config — falling back to REGISTRY");
                    nexus_backend_runtimes::family_python::builtin_assets::for_current_target()
                }
            };
        let python_asset_for_family_handlers = resolved_python_asset.clone();
        let python_asset_for_dep_bootstrapper = resolved_python_asset;

        let state = nexus_api::AppState {
            health_status_fn: Arc::new(move || {
                serde_json::to_value(app_ref.health_status()).unwrap_or_default()
            }),
            db,
            event_bus,
            extension_registry,
            run_engine,
            worker_manager,
            scheduler,
            artifact_store,
            extensions_dir: Some(extensions_dir),
            storage_manager: Some(storage_manager),
            backend_adapter_registry,
            spawner,
            huggingface: Some(huggingface),
            capability_registry,
            download_job_store: Some(download_job_store),
            download_orchestrator: Some(download_orchestrator),
            install_map: Some(install_map),
            hf_token_store: Some(hf_token_store),
            backend_event_publisher: backend_event_bus.clone(),
            backend_event_bus,
            draft_materialize_map:
                nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
            host_install_paths,
            extension_router_registry,
            family_handlers: {
                let registry =
                    nexus_backend_runtimes::generic::family_handler::FamilyHandlerRegistry::new();
                nexus_api::handlers::backend_runtimes::pipeline_runner::register_default_handlers(
                    &registry,
                    python_asset_for_family_handlers,
                )
                .await;
                registry
            },
            pipeline_events: {
                let (tx, _) = tokio::sync::broadcast::channel(nexus_api::PIPELINE_EVENT_CAPACITY);
                std::sync::Arc::new(tx)
            },
            lease_manager: std::sync::Arc::new(
                nexus_backend_runtimes::generic::leases::LeaseManager::new(),
            ),
            // Spec 035 — generic extension dependency installer wiring. Real
            // probe adapters delegate to host_runtime_installs (runtime) and
            // model_store_installed_artifacts (model_artifact); the action
            // path (full pipeline install / download-job creation) still
            // routes through the existing Backends + Models Search UIs.
            dep_handler_registry: Some(nexus_api::dep_bootstrap::default_dep_handler_registry()),
            dep_install_state: std::sync::Arc::new(Default::default()),
            dep_runtime_bootstrapper: Some(std::sync::Arc::new(
                nexus_api::dep_bootstrap::RealRuntimeBootstrapper::with_python_asset(
                    db_for_dep.pool().clone(),
                    python_asset_for_dep_bootstrapper,
                ),
            )),
            dep_model_store: Some(model_store_client.clone()),
            dep_worker_handshake: Some(std::sync::Arc::new(
                nexus_api::dep_bootstrap::RealWorkerHandshake,
            )),
            dep_fetch_artifact: Some(nexus_api::dep_bootstrap::default_fetch_artifact()),
            dep_host_data_dir: Some(app_for_health.config.resolved_data_dir()),
        };

        let router = nexus_api::create_router(state);

        let bind_addr = format!("0.0.0.0:{}", app_for_health.config.port);
        let listener = tokio::net::TcpListener::bind(&bind_addr)
            .await
            .with_context(|| format!("failed to bind to {bind_addr}"))?;

        tracing::info!(
            port = app_for_health.config.port,
            "nexus-dnn api server listening"
        );

        axum::serve(listener, router)
            .with_graceful_shutdown(shutdown_signal())
            .await
            .context("api server error")?;

        tracing::info!("nexus-dnn shutting down");
        Ok(())
    }

    async fn create_data_directories(&self) -> anyhow::Result<()> {
        let data_dir = self.config.resolved_data_dir();
        let directories = [
            data_dir.join("db"),
            self.config.artifacts_dir().join("blobs"),
            self.config.artifacts_dir().join("manifests"),
            self.config.artifacts_dir().join("temp"),
            self.config.artifacts_dir().join("cache"),
            self.config.extensions_dir(),
            self.config.logs_dir(),
        ];

        for dir in &directories {
            create_directory_if_missing(dir).await?;
        }

        Ok(())
    }
}

fn build_extension_router_registry(
    pool: sqlx::SqlitePool,
    host_port: u16,
    chat_resources: Arc<nexus_local_llm_chat_history::ChatHandlerResources>,
    extension_registry: Arc<nexus_extension::InMemoryExtensionRegistry>,
    host_data_dir: std::path::PathBuf,
    model_store_client: Arc<dyn nexus_extension_deps::ModelStoreClient>,
    artifact_store: Arc<nexus_artifact::FilesystemArtifactStore>,
) -> nexus_api::extension_router::SharedRegistry {
    use nexus_api::extension_router::{DefaultRegistry, ExtensionId, ExtensionRouterRegistry};
    use nexus_extension::{ExtensionContext, ExtensionRouterProvider, HostFacts};

    let registry = Arc::new(DefaultRegistry::new());
    let host_base_url = format!("http://127.0.0.1:{host_port}");

    let providers: Vec<Arc<dyn ExtensionRouterProvider>> = vec![
        Arc::new(nexus_local_llm_chat_history::LocalLlmRouterProvider::new(
            nexus_local_llm_chat_history::LocalLlmProviderResources::from_host_base_url(
                pool.clone(),
                host_base_url.clone(),
                chat_resources,
            ),
        )),
        Arc::new(emotion_tts_extension::EmotionTtsRouterProvider::new({
            let mut res = emotion_tts_extension::EmotionTtsProviderResources::new(pool.clone());
            let id = emotion_tts_extension::EXTENSION_ID;
            if let Some(ext) = extension_registry.get_extension(id) {
                res = res.with_directories(ext.directory.clone(), host_data_dir.clone());
            }
            // Adapt the generic spec-035 model-store client to the extension's
            // own `ModelArtifactLocator` contract so the lease factory can
            // resolve IndexTTS-2's on-disk path at acquire time.
            res = res.with_model_locator(Arc::new(ModelStoreLocatorAdapter {
                inner: model_store_client.clone(),
            }));
            // Wire the host's artifact store through the extension's
            // own `HostArtifactStore` adapter so the voice-asset upload +
            // resolve path is functional. Without this the recipe page
            // throws "voice asset store not configured by host" on load.
            res = res.with_artifact_store(Arc::new(
                emotion_tts_extension::host_adapter::HostArtifactStoreAdapter::new(
                    artifact_store.clone(),
                ),
            ));
            res
        })),
        Arc::new(nexus_video_ltx23_extension::LtxRouterProvider::new({
            let mut res =
                nexus_video_ltx23_extension::LtxProviderResources::new(pool.clone());
            res = res.with_host_data_dir(host_data_dir.clone());
            let id = nexus_video_ltx23_extension::EXTENSION_ID;
            if let Some(ext) = extension_registry.get_extension(id) {
                res = res.with_extension_dir(ext.directory.clone());
            }
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
    registry as nexus_api::extension_router::SharedRegistry
}

/// Bridges the spec-035 generic `ModelStoreClient` to extension-defined
/// `ModelArtifactLocator` traits. Lives here (host-side) so individual
/// extensions stay free of host-runtime crate dependencies. Generic in name
/// — any extension that defines a similar locator trait can be served by
/// this same adapter.
struct ModelStoreLocatorAdapter {
    inner: Arc<dyn nexus_extension_deps::ModelStoreClient>,
}

#[async_trait::async_trait]
impl emotion_tts_extension::host_contract::ModelArtifactLocator for ModelStoreLocatorAdapter {
    async fn locate_family(&self, family_id: &str) -> Option<std::path::PathBuf> {
        // The spec-035 trait surfaces an accelerator filter; we don't need
        // it here — the worker picks the variant at load time. Pass `None`.
        let raw = self
            .inner
            .is_family_installed(family_id, None)
            .await
            .ok()
            .flatten()?;
        // `is_family_installed`'s contract returns the path to *one file* in
        // the snapshot (the install_map's first row) — useful for single-file
        // formats like GGUF, but for multi-file snapshot installs the worker
        // wants the *directory* containing every file (config.yaml, gpt.pth,
        // s2mel.pth, qwen subdir, etc.). Normalize to the parent directory
        // when the resolved path is a regular file. If it's already a dir
        // (or a missing path), pass through unchanged.
        if raw.is_file() {
            raw.parent().map(std::path::Path::to_path_buf)
        } else {
            Some(raw)
        }
    }
}

async fn persist_discovery_to_db(
    db: &Arc<SqliteDatabase>,
    registry: &Arc<InMemoryExtensionRegistry>,
) -> anyhow::Result<()> {
    let extensions = registry.list_extensions();

    for ext in &extensions {
        persist_extension_record(db, ext).await?;
        persist_operator_records(db, ext).await?;
        persist_recipe_records(db, ext).await?;
        persist_workflow_records(db, ext).await?;
        persist_ui_contribution_records(db, ext).await?;
    }

    Ok(())
}

async fn persist_workflow_records(
    db: &Arc<SqliteDatabase>,
    ext: &ActivatedExtension,
) -> anyhow::Result<()> {
    // Collect unique workflow template paths referenced by this extension's recipes.
    let mut seen: std::collections::HashSet<String> = std::collections::HashSet::new();
    for recipe in &ext.recipes {
        let Some(template_ref) = recipe.workflow_template.as_ref() else {
            continue;
        };
        if !seen.insert(template_ref.clone()) {
            continue;
        }

        let path = ext.directory.join(template_ref);
        let content = match std::fs::read_to_string(&path) {
            Ok(c) => c,
            Err(e) => {
                tracing::warn!(
                    path = %path.display(),
                    error = %e,
                    "failed to read workflow template; skipping",
                );
                continue;
            }
        };

        let workflow = match nexus_workflow::parse_workflow(&content) {
            Ok(w) => w,
            Err(e) => {
                tracing::warn!(
                    path = %path.display(),
                    error = %e,
                    "failed to parse workflow template; skipping",
                );
                continue;
            }
        };

        let now = chrono::Utc::now().to_rfc3339();
        let existing = db.get_workflow(&workflow.id).await.ok();

        if let Some(existing) = existing.as_ref()
            && existing.user_edited_at.is_some()
        {
            if existing.extension_id.is_none()
                && let Err(e) = db
                    .stamp_workflow_extension(
                        &workflow.id,
                        &ext.manifest.extension.id,
                        &ext.manifest.extension.version,
                        &now,
                    )
                    .await
            {
                tracing::debug!(
                    workflow_id = %workflow.id,
                    error = %e,
                    "stamp_workflow_extension (user-edited row) failed"
                );
            }
            tracing::debug!(
                workflow_id = %workflow.id,
                user_edited_at = %existing.user_edited_at.as_deref().unwrap_or(""),
                "skipping workflow re-persistence: row has user edits"
            );
            continue;
        }

        let first_seen = existing
            .as_ref()
            .and_then(|e| e.extension_version_first_seen.clone())
            .unwrap_or_else(|| now.clone());
        let created_at = existing
            .as_ref()
            .map(|e| e.created_at.clone())
            .unwrap_or_else(|| now.clone());
        let record = match build_workflow_record(
            &workflow,
            &created_at,
            &now,
            Some(&ext.manifest.extension.id),
            Some(&ext.manifest.extension.version),
            Some(&first_seen),
        ) {
            Ok(r) => r,
            Err(e) => {
                tracing::warn!(error = %e, "failed to build workflow record; skipping");
                continue;
            }
        };

        if let Err(e) = db.insert_workflow(&record).await {
            tracing::debug!(workflow_id = %workflow.id, error = %e, "insert_workflow failed");
        }
    }

    Ok(())
}

fn build_workflow_record(
    workflow: &nexus_workflow::Workflow,
    created_at: &str,
    updated_at: &str,
    extension_id: Option<&str>,
    extension_version: Option<&str>,
    extension_version_first_seen: Option<&str>,
) -> anyhow::Result<nexus_storage::WorkflowRecord> {
    let edge_values: Vec<serde_json::Value> = workflow
        .extract_edges()
        .iter()
        .map(|e| {
            serde_json::json!({
                "source_node": e.source_node,
                "source_port": e.source_port,
                "target_node": e.target_node,
                "target_port": e.target_port,
            })
        })
        .collect();

    Ok(nexus_storage::WorkflowRecord {
        id: workflow.id.clone(),
        title: workflow.title.clone(),
        version: workflow.version.clone(),
        inputs: Some(serde_json::to_string(&workflow.inputs)?),
        outputs: Some(serde_json::to_string(&workflow.outputs)?),
        nodes: serde_json::to_string(&workflow.nodes)?,
        edges: serde_json::to_string(&edge_values)?,
        stages: Some(serde_json::to_string(&workflow.stages)?),
        created_at: created_at.to_owned(),
        updated_at: updated_at.to_owned(),
        user_edited_at: None,
        extension_id: extension_id.map(str::to_owned),
        extension_version: extension_version.map(str::to_owned),
        extension_version_first_seen: extension_version_first_seen.map(str::to_owned),
    })
}

async fn persist_extension_record(
    db: &Arc<SqliteDatabase>,
    ext: &ActivatedExtension,
) -> anyhow::Result<()> {
    let capabilities = ext
        .manifest
        .capabilities
        .as_ref()
        .map(|caps| serde_json::to_string(caps).unwrap_or_default());

    let validation_errors = if ext.validation_errors.is_empty() {
        None
    } else {
        Some(serde_json::to_string(&ext.validation_errors).unwrap_or_default())
    };

    let record = nexus_storage::ExtensionRecord {
        id: ext.manifest.extension.id.clone(),
        name: ext.manifest.extension.name.clone(),
        version: ext.manifest.extension.version.clone(),
        description: ext.manifest.extension.description.clone(),
        publisher: ext.manifest.extension.publisher.clone(),
        host_api_compat: ext.manifest.compatibility.host_api.clone(),
        protocol_compat: ext.manifest.compatibility.protocol.clone(),
        runtime_family: format!("{:?}", ext.manifest.runtime.family),
        entrypoint: ext.manifest.runtime.entrypoint.clone(),
        capabilities,
        status: ext.status.as_str().to_owned(),
        directory: ext.directory.display().to_string(),
        installed_at: chrono::Utc::now().to_rfc3339(),
        recipe_count: Some(ext.recipe_count as i32),
        ui_contribution_count: Some(ext.ui_contribution_count as i32),
        validation_errors,
        primary_recipe_id: None,
        default_workflow_id: None,
        icon_kind: match ext.manifest.extension.icon.as_ref() {
            Some(icon) if icon.svg.is_some() => Some(nexus_storage::IconKind::Svg),
            Some(icon) if icon.symbol.is_some() => Some(nexus_storage::IconKind::Symbol),
            _ => None,
        },
        icon_symbol: ext
            .manifest
            .extension
            .icon
            .as_ref()
            .and_then(|i| i.svg.is_none().then(|| i.symbol.clone()).flatten()),
        icon_svg: ext
            .manifest
            .extension
            .icon
            .as_ref()
            .and_then(|i| i.svg.clone()),
    };

    let _ = db.insert_extension(&record).await;
    Ok(())
}

async fn persist_operator_records(
    db: &Arc<SqliteDatabase>,
    ext: &ActivatedExtension,
) -> anyhow::Result<()> {
    let ext_id = &ext.manifest.extension.id;

    for op in &ext.operators {
        let inputs = serde_json::to_string(&op.inputs).unwrap_or_else(|_| "[]".to_owned());
        let outputs = serde_json::to_string(&op.outputs).unwrap_or_else(|_| "[]".to_owned());
        let config_schema = op
            .config_schema
            .as_ref()
            .map(|cs| serde_json::to_string(cs).unwrap_or_default());
        let resource_hints = op
            .resources
            .as_ref()
            .map(|r| serde_json::to_string(r).unwrap_or_default());

        let record = nexus_storage::OperatorRecord {
            id: op.operator.id.clone(),
            version: op.operator.version.clone(),
            extension_id: ext_id.clone(),
            display_name: op.operator.display_name.clone(),
            description: op.operator.description.clone(),
            category: op.operator.category.clone(),
            inputs,
            outputs,
            config_schema,
            execution_mode: op.execution.as_ref().and_then(|e| e.mode.clone()),
            cacheable: op
                .execution
                .as_ref()
                .and_then(|e| e.cacheable)
                .map(|b| b as i32),
            resumable: op
                .execution
                .as_ref()
                .and_then(|e| e.resumable)
                .map(|b| b as i32),
            resource_hints,
        };

        let _ = db.insert_operator(&record).await;
    }

    Ok(())
}

async fn persist_recipe_records(
    db: &Arc<SqliteDatabase>,
    ext: &ActivatedExtension,
) -> anyhow::Result<()> {
    let ext_id = &ext.manifest.extension.id;
    let _ = db.delete_recipes_by_extension(ext_id).await;

    for recipe in &ext.recipes {
        let bindings = recipe
            .bindings
            .as_ref()
            .map(|b| serde_json::to_string(b).unwrap_or_default())
            .unwrap_or_else(|| "{}".to_owned());

        let record = nexus_storage::RecipeRecord {
            id: recipe.recipe.id.clone(),
            version: recipe.recipe.version.clone(),
            display_name: recipe.recipe.display_name.clone(),
            summary: recipe.recipe.summary.clone(),
            category: recipe.recipe.category.clone(),
            extension_id: ext_id.clone(),
            extension_version: ext.manifest.extension.version.clone(),
            workflow_template_ref: recipe.workflow_template.clone().unwrap_or_default(),
            thumbnail: recipe.recipe.thumbnail.clone(),
            input_summary: recipe.recipe.input_summary.clone(),
            bindings,
            created_at: chrono::Utc::now().to_rfc3339(),
        };

        let _ = db.insert_recipe(&record).await;
    }

    Ok(())
}

async fn persist_ui_contribution_records(
    db: &Arc<SqliteDatabase>,
    ext: &ActivatedExtension,
) -> anyhow::Result<()> {
    let ext_id = &ext.manifest.extension.id;
    let _ = db.delete_ui_contributions_by_extension(ext_id).await;

    for contrib in &ext.ui_contributions {
        let kind_str = serde_json::to_value(&contrib.kind)
            .ok()
            .and_then(|v| v.as_str().map(|s| s.to_owned()))
            .unwrap_or_else(|| format!("{:?}", contrib.kind));

        let supported_types = contrib
            .supported_types
            .as_ref()
            .map(|st| serde_json::to_string(st).unwrap_or_default());

        let metadata = contrib
            .metadata
            .as_ref()
            .map(|m| serde_json::to_string(m).unwrap_or_default());

        let record = nexus_storage::UIContributionRecord {
            id: contrib.id.clone(),
            kind: kind_str,
            extension_id: ext_id.clone(),
            display_name: contrib.display_name.clone(),
            description: contrib.description.clone(),
            target: contrib.target.clone(),
            supported_types,
            priority: contrib.priority.unwrap_or(0) as i32,
            metadata,
            availability: ext.status.as_str().to_owned(),
        };

        let _ = db.insert_ui_contribution(&record).await;
    }

    Ok(())
}

fn log_discovery_summary(registry: &InMemoryExtensionRegistry) {
    let extensions = registry.list_extensions();
    let operators = registry.list_operators();
    let recipes = registry.list_recipes();
    let layouts = registry.list_layouts();
    let ui_contributions = registry.list_ui_contributions();

    use crate::log_format::BANNER_TARGET;

    // The banner target opts out of the standard timestamp/icon/level/
    // target prefix (see crates/nexus-core/src/log_format.rs). Each line
    // is emitted verbatim so the column alignment and section dividers
    // hold visually.
    //
    // Banner status tokens are intentionally plain text. An earlier
    // pass tried to color `[active]` green via raw ANSI escapes, but
    // hand-rolled ANSI doesn't auto-enable Windows
    // ENABLE_VIRTUAL_TERMINAL_PROCESSING the way tracing-subscriber's
    // own `with_ansi(true)` (via `nu-ansi-term`) does — so the codes
    // rendered as literal `\x1b[32m` text on classic Windows consoles.
    // Until we wire `enable_ansi_support` at startup or build a more
    // robust terminal detection, the banner stays plain.

    let rule_thick = "─".repeat(60);
    let rule_thin = "·".repeat(60);

    tracing::info!(target: BANNER_TARGET, "");
    tracing::info!(target: BANNER_TARGET, "  {rule_thick}");
    tracing::info!(target: BANNER_TARGET, "    NEXUS-DNN  ·  Extension Discovery");
    tracing::info!(target: BANNER_TARGET, "  {rule_thick}");

    // Extensions section.
    if extensions.is_empty() {
        tracing::warn!(target: BANNER_TARGET, "    No extensions discovered.");
    } else {
        let label = format!("Extensions ({})", extensions.len());
        tracing::info!(target: BANNER_TARGET, "    {label}");
        let name_width = extensions
            .iter()
            .map(|e| {
                e.manifest
                    .extension
                    .name
                    .as_deref()
                    .unwrap_or(&e.manifest.extension.id)
                    .chars()
                    .count()
            })
            .max()
            .unwrap_or(0);
        for ext in &extensions {
            let status = ext.status.as_str();
            let name = ext
                .manifest
                .extension
                .name
                .as_deref()
                .unwrap_or(&ext.manifest.extension.id);
            let glyph = match status {
                "active" => "●",
                "error" => "✗",
                _ => "◌",
            };
            tracing::info!(
                target: BANNER_TARGET,
                "      {glyph}  {name:<name_width$}  v{ver}  [{status}]",
                ver = ext.manifest.extension.version,
            );
        }
    }

    // Operators section.
    tracing::info!(target: BANNER_TARGET, "");
    tracing::info!(target: BANNER_TARGET, "    Operators ({})", operators.len());
    let op_id_width = operators
        .iter()
        .map(|op| op.operator.id.chars().count())
        .max()
        .unwrap_or(0);
    for op in &operators {
        tracing::info!(
            target: BANNER_TARGET,
            "      ✓  {id:<op_id_width$}  v{ver}",
            id = op.operator.id,
            ver = op.operator.version,
        );
    }

    // Recipes section.
    tracing::info!(target: BANNER_TARGET, "");
    tracing::info!(target: BANNER_TARGET, "    Recipes ({})", recipes.len());
    for recipe in &recipes {
        tracing::info!(
            target: BANNER_TARGET,
            "      ✓  {name}",
            name = recipe.recipe.display_name,
        );
    }

    // Layouts section.
    tracing::info!(target: BANNER_TARGET, "");
    tracing::info!(target: BANNER_TARGET, "    Layouts ({})", layouts.len());
    for layout in &layouts {
        let default_marker = if layout.is_default { "  (default)" } else { "" };
        tracing::info!(
            target: BANNER_TARGET,
            "      ✓  {name}{default_marker}",
            name = layout.display_name,
        );
    }

    // UI contributions tally.
    tracing::info!(target: BANNER_TARGET, "");
    tracing::info!(
        target: BANNER_TARGET,
        "    UI contributions: {count}",
        count = ui_contributions.len()
    );
    tracing::info!(target: BANNER_TARGET, "  {rule_thin}");
    tracing::info!(target: BANNER_TARGET, "");
}

fn emit_discovery_events(event_bus: &dyn EventBus, report: &DiscoveryReport) {
    for ext_id in &report.activated {
        event_bus.publish(NexusEvent::ExtensionDiscovered {
            extension_id: ext_id.clone(),
        });
        event_bus.publish(NexusEvent::ExtensionValidated {
            extension_id: ext_id.clone(),
            valid: true,
        });
        event_bus.publish(NexusEvent::ExtensionActivated {
            extension_id: ext_id.clone(),
        });
    }

    for (dir_name, _reason) in &report.invalid {
        event_bus.publish(NexusEvent::ExtensionDiscovered {
            extension_id: dir_name.clone(),
        });
        event_bus.publish(NexusEvent::ExtensionValidated {
            extension_id: dir_name.clone(),
            valid: false,
        });
    }
}

async fn build_backend_adapter_registry(
    data_dir: &Path,
    builtin_extensions_dir: &Path,
    pool: sqlx::SqlitePool,
    _event_bus: Arc<dyn EventBus>,
) -> Option<Arc<nexus_backend_runtimes::adapter::AdapterRegistry>> {
    let version_manifest_path = builtin_extensions_dir
        .join("local-llm")
        .join("backends")
        .join("llamacpp")
        .join("versions.yaml");
    if !version_manifest_path.exists() {
        tracing::debug!(
            manifest = %version_manifest_path.display(),
            "local-llm version manifest missing; skipping backend adapter registry"
        );
        return None;
    }
    let runtimes_root = data_dir
        .join("extensions")
        .join("local-llm")
        .join("runtimes");
    if let Err(err) = tokio::fs::create_dir_all(&runtimes_root).await {
        tracing::warn!(
            error = %err,
            path = %runtimes_root.display(),
            "failed to create runtimes root"
        );
        return None;
    }
    let runtimes_root_utf8 = match camino::Utf8PathBuf::from_path_buf(runtimes_root) {
        Ok(p) => p,
        Err(_) => return None,
    };
    let publisher: nexus_backend_runtimes::events::SharedPublisher =
        Arc::new(nexus_backend_runtimes::events::BackendEventBus::new(1024));
    let adapter = nexus_backend_runtimes::llamacpp::LlamaCppAdapter::new(
        version_manifest_path,
        runtimes_root_utf8,
        pool,
        publisher,
        "extension.nexus.local-llm.llama.cpp",
    );
    let adapter = match nexus_backend_runtimes::manifest::release_scanner::ReleaseScanner::new(
        nexus_backend_runtimes::manifest::release_scanner::ScannerConfig::llama_cpp_default(),
    ) {
        Ok(scanner) => adapter.with_scanner(Arc::new(scanner)),
        Err(err) => {
            tracing::warn!(
                error = %err,
                "failed to initialise GitHub release scanner; install picker will fall back to on-disk versions.yaml"
            );
            adapter
        }
    };
    let mut registry = nexus_backend_runtimes::adapter::AdapterRegistry::new();
    registry.register(Arc::new(adapter));
    registry.register(Arc::new(
        nexus_backend_runtimes::tensorrt_llm::TensorRtLlmStub::new(),
    ));
    Some(Arc::new(registry))
}

async fn shutdown_signal() {
    tokio::signal::ctrl_c()
        .await
        .expect("failed to listen for ctrl+c");
}

async fn create_directory_if_missing(path: &Path) -> anyhow::Result<()> {
    if !path.exists() {
        tokio::fs::create_dir_all(path)
            .await
            .with_context(|| format!("failed to create directory: {}", path.display()))?;
    }
    Ok(())
}
