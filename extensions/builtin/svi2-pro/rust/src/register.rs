use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use axum::Router;
use nexus_extension::{BuildRouterError, ExtensionContext, ExtensionRouterProvider};
use sqlx::SqlitePool;

use crate::backend_client::{LeaseFactory, LeaseProvider};
use crate::dispatcher::RenderChannels;
use crate::domain::Result as DomainResult;
use crate::host_adapter::Svi2LeaseFactory;
use crate::host_contract::{ModelArtifactLocator, SharedLease};
use crate::router::{self, AppState};
use crate::storage::Store;
use crate::{EXTENSION_VERSION, MIGRATIONS};

pub const EXTENSION_ID: &str = "nexus.video.svi2-pro";

const DEFAULT_PROFILE: &str = "rtx50-fp8";

#[derive(Clone)]
pub struct Svi2ProviderResources {
    pub pool: SqlitePool,
    pub extension_dir: Option<PathBuf>,
    pub host_data_dir: Option<PathBuf>,
    pub models_dir: Option<PathBuf>,
    pub profile: Option<String>,
    pub model_locator: Option<Arc<dyn ModelArtifactLocator>>,
    /// Host orchestration bus. When present, renders publish per-node status
    /// (spec 057) so the deployment's Workflow Graph tab animates.
    pub event_bus: Option<Arc<dyn nexus_events::bus::EventBus>>,
}

impl Svi2ProviderResources {
    #[must_use]
    pub fn new(pool: SqlitePool) -> Self {
        Self {
            pool,
            extension_dir: None,
            host_data_dir: None,
            models_dir: None,
            profile: None,
            model_locator: None,
            event_bus: None,
        }
    }

    #[must_use]
    pub fn with_event_bus(mut self, event_bus: Arc<dyn nexus_events::bus::EventBus>) -> Self {
        self.event_bus = Some(event_bus);
        self
    }

    #[must_use]
    pub fn with_directories(mut self, extension_dir: PathBuf, host_data_dir: PathBuf) -> Self {
        self.extension_dir = Some(extension_dir);
        self.host_data_dir = Some(host_data_dir);
        self
    }

    #[must_use]
    pub fn with_models_dir(mut self, models_dir: PathBuf) -> Self {
        self.models_dir = Some(models_dir);
        self
    }

    #[must_use]
    pub fn with_profile(mut self, profile: impl Into<String>) -> Self {
        self.profile = Some(profile.into());
        self
    }

    #[must_use]
    pub fn with_model_locator(mut self, locator: Arc<dyn ModelArtifactLocator>) -> Self {
        self.model_locator = Some(locator);
        self
    }
}

pub struct Svi2RouterProvider {
    resources: Svi2ProviderResources,
}

impl Svi2RouterProvider {
    #[must_use]
    pub fn new(resources: Svi2ProviderResources) -> Self {
        Self { resources }
    }

    async fn build_router_inner_async(&self) -> Result<Router, BuildRouterError> {
        apply_migrations(&self.resources.pool)
            .await
            .map_err(|e| Box::<dyn std::error::Error + Send + Sync>::from(e) as BuildRouterError)?;

        let store = Store::new(self.resources.pool.clone());
        let profile = self
            .resources
            .profile
            .clone()
            .unwrap_or_else(|| DEFAULT_PROFILE.to_string());

        let lease_factory: Arc<dyn LeaseFactory> = match (
            self.resources.extension_dir.clone(),
            self.resources.host_data_dir.clone(),
        ) {
            (Some(ext_dir), Some(host_data_dir)) => {
                let factory_data_dir = host_data_dir.join("extensions").join(EXTENSION_ID);
                Arc::new(
                    Svi2LeaseFactory::new(
                        ext_dir,
                        factory_data_dir,
                        profile,
                        self.resources.models_dir.clone(),
                    )
                    .with_model_locator(self.resources.model_locator.clone()),
                )
            }
            _ => Arc::new(StubLeaseFactory),
        };

        let provider = Arc::new(LeaseProvider::new(lease_factory));
        let workspace_dir = self.resources.host_data_dir.clone().map_or_else(
            || std::env::temp_dir().join(crate::FALLBACK_WORKSPACE_DIR),
            |host_data_dir| {
                host_data_dir
                    .join("extensions")
                    .join(EXTENSION_ID)
                    .join("workspace")
            },
        );
        let _ = std::fs::create_dir_all(&workspace_dir);

        Ok(router::build_router(AppState {
            store,
            provider,
            channels: RenderChannels::new(),
            workspace_dir,
            extension_version: EXTENSION_VERSION.to_string(),
            event_bus: self.resources.event_bus.clone(),
        }))
    }
}

async fn apply_migrations(pool: &SqlitePool) -> Result<(), String> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS ext_svi2_pro__schema_versions (\
             version INTEGER PRIMARY KEY,\
             name TEXT NOT NULL,\
             applied_at TEXT NOT NULL\
         )",
    )
    .execute(pool)
    .await
    .map_err(|e| e.to_string())?;

    for migration in MIGRATIONS {
        let already: Option<i64> = sqlx::query_scalar(
            "SELECT version FROM ext_svi2_pro__schema_versions WHERE version = ?",
        )
        .bind(i64::from(migration.version))
        .fetch_optional(pool)
        .await
        .map_err(|e| e.to_string())?;
        if already.is_some() {
            continue;
        }
        sqlx::raw_sql(migration.sql)
            .execute(pool)
            .await
            .map_err(|e| {
                format!(
                    "svi2 migration v{} ({}) failed: {e}",
                    migration.version, migration.name
                )
            })?;
        sqlx::query(
            "INSERT INTO ext_svi2_pro__schema_versions (version, name, applied_at) \
             VALUES (?, ?, datetime('now'))",
        )
        .bind(i64::from(migration.version))
        .bind(migration.name)
        .execute(pool)
        .await
        .map_err(|e| e.to_string())?;
    }
    Ok(())
}

struct StubLeaseFactory;

#[async_trait]
impl LeaseFactory for StubLeaseFactory {
    async fn acquire(&self) -> DomainResult<SharedLease> {
        Err(crate::domain::Svi2Error::RuntimeUnavailable(
            "svi2-pro runtime backend is not yet wired through the host. \
             Install dependencies, then ensure the host passes extension_dir + \
             host_data_dir into Svi2ProviderResources at load time."
                .into(),
        ))
    }
}

fn block_on<F, T>(fut: F) -> T
where
    F: std::future::Future<Output = T>,
{
    let handle = tokio::runtime::Handle::current();
    tokio::task::block_in_place(|| handle.block_on(fut))
}

impl ExtensionRouterProvider for Svi2RouterProvider {
    fn extension_id(&self) -> &'static str {
        EXTENSION_ID
    }

    fn build_router(
        &self,
        _cx: &ExtensionContext<'_>,
    ) -> Result<(Router, Vec<String>), BuildRouterError> {
        let router = block_on(self.build_router_inner_async())?;
        Ok((router, router::http_routes()))
    }
}
