use std::path::Path;
use std::sync::Arc;

use anyhow::Context;
use semver::Version;

use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::{BroadcastEventBus, EventBus};
use nexus_events::types::NexusEvent;
use nexus_extension::{ActivatedExtension, DiscoveryReport, ExtensionRegistry, InMemoryExtensionRegistry};
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
}

impl NexusApp {
    pub fn new(config: NexusConfig) -> Self {
        Self { config }
    }

    pub async fn initialize(&self) -> anyhow::Result<()> {
        self.create_data_directories().await?;
        tracing::info!(
            data_dir = %self.config.resolved_data_dir().display(),
            "data directory initialized"
        );
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

        let event_bus = Arc::new(BroadcastEventBus::default());

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

        let app_for_health = Arc::new(self);
        let app_ref = Arc::clone(&app_for_health);

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

async fn persist_discovery_to_db(
    db: &Arc<SqliteDatabase>,
    registry: &Arc<InMemoryExtensionRegistry>,
) -> anyhow::Result<()> {
    let extensions = registry.list_extensions();

    for ext in &extensions {
        persist_extension_record(db, ext).await?;
        persist_operator_records(db, ext).await?;
        persist_recipe_records(db, ext).await?;
        persist_ui_contribution_records(db, ext).await?;
    }

    Ok(())
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
