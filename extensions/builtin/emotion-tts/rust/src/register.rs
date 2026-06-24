//! `ExtensionRouterProvider` impl for the EmotionTTS extension.
//!
//! Spec 030 — registered with the host's extension router registry at
//! startup so the EmotionTTS routes become reachable via
//! `/api/v1/extensions/nexus.audio.emotiontts/*`. Without this provider
//! the host's dispatcher returns `unknown_extension` 404 for every URL
//! the bundled web UI tries to fetch.
//!
//! Mirrors `nexus_local_llm_chat_history::LocalLlmRouterProvider`.

use std::path::PathBuf;
use std::sync::Arc;

use async_trait::async_trait;
use axum::Router;
use nexus_extension::{BuildRouterError, ExtensionContext, ExtensionRouterProvider};
use sqlx::SqlitePool;

use crate::backend_client::{LeaseFactory, LeaseProvider};
use crate::domain::{EmotionTtsError, Result as DomainResult};
use crate::host_adapter::EmotionTtsLeaseFactory;
use crate::host_contract::{HostArtifactStore, ModelArtifactLocator, SharedLease};
use crate::queue::RuntimeQueue;
use crate::storage::Repos;
use crate::{EXTENSION_VERSION, MIGRATIONS};

pub const EXTENSION_ID: &str = "nexus.audio.emotiontts";

/// Resources the EmotionTTS provider needs to construct its router.
/// Built once at host startup and handed to `EmotionTtsRouterProvider`.
#[derive(Clone)]
pub struct EmotionTtsProviderResources {
    pub pool: SqlitePool,
    /// Filesystem dir the extension was loaded from (where `worker/` lives).
    /// When set together with `host_data_dir`, the provider builds a real
    /// StdioLease-backed factory and the recipe header's "Install / Start
    /// runtime" actually spawns a worker. When either is `None`, the
    /// provider falls back to a stub factory that surfaces a clear
    /// "not yet wired" error — useful for tests and minimal-config hosts.
    pub extension_dir: Option<PathBuf>,
    /// Host data dir (typically `~/.nexus`). Combined with the extension's
    /// id to derive the runtime/venv install paths the dep installer wrote.
    pub host_data_dir: Option<PathBuf>,
    /// Host-side resolver for installed model artifact paths. Required at
    /// `model.load` time — without it, the lease factory cannot tell the
    /// worker where IndexTTS-2 weights live and `model.load` fails with
    /// `adapter is not configured`.
    pub model_locator: Option<Arc<dyn ModelArtifactLocator>>,
    /// Host-side artifact store for voice-asset uploads (mp3/wav clips
    /// users upload via the mapping editor). When `None`, the voice-assets
    /// router falls back to a 503 stub and the recipe page can't load.
    pub artifact_store: Option<Arc<dyn HostArtifactStore>>,
}

impl EmotionTtsProviderResources {
    pub fn new(pool: SqlitePool) -> Self {
        Self {
            pool,
            extension_dir: None,
            host_data_dir: None,
            model_locator: None,
            artifact_store: None,
        }
    }

    /// Builder-style: attach a host-side artifact store for voice uploads.
    #[must_use]
    pub fn with_artifact_store(mut self, store: Arc<dyn HostArtifactStore>) -> Self {
        self.artifact_store = Some(store);
        self
    }

    /// Builder-style: attach the filesystem dirs the host knows about.
    /// Both must be supplied for the runtime spawn path to wire up; either
    /// missing falls back to the stub factory.
    #[must_use]
    pub fn with_directories(mut self, extension_dir: PathBuf, host_data_dir: PathBuf) -> Self {
        self.extension_dir = Some(extension_dir);
        self.host_data_dir = Some(host_data_dir);
        self
    }

    /// Builder-style: attach a model artifact locator. Required for the
    /// runtime spawn path to find IndexTTS-2 weights at acquire time.
    #[must_use]
    pub fn with_model_locator(mut self, locator: Arc<dyn ModelArtifactLocator>) -> Self {
        self.model_locator = Some(locator);
        self
    }
}

pub struct EmotionTtsRouterProvider {
    resources: EmotionTtsProviderResources,
}

impl EmotionTtsRouterProvider {
    pub fn new(resources: EmotionTtsProviderResources) -> Self {
        Self { resources }
    }

    fn http_routes() -> Vec<String> {
        // Every path the extension's frontend can hit. Used by the host
        // dispatcher's path-validation layer to reject typos before they
        vec![
            // Runtime lifecycle (recipe header polls these to decide whether to
            // show "Stopped"/"Ready"/etc. — must be declared even though the
            "/runtime/health".into(),
            "/runtime/handshake".into(),
            "/runtime/start".into(),
            "/runtime/stop".into(),
            "/runtime/restart".into(),
            // Deployments
            "/deployments".into(),
            "/deployments/{deployment_id}".into(),
            "/deployments/{deployment_id}/default-voice".into(),
            "/deployments/{deployment_id}/resume".into(),
            "/deployments/{deployment_id}/engine-settings".into(),
            "/deployments/{deployment_id}/oas-threshold".into(),
            // Runs
            "/deployments/{deployment_id}/runs".into(),
            "/deployments/{deployment_id}/runs/{run_id}".into(),
            "/deployments/{deployment_id}/runs/{run_id}/cancel".into(),
            "/deployments/{deployment_id}/runs/{run_id}/resume".into(),
            "/deployments/{deployment_id}/runs/{run_id}/progress".into(),
            "/deployments/{deployment_id}/runs/test-line".into(),
            "/runs/{run_id}/diagnostics".into(),
            // Mappings
            "/mappings".into(),
            "/mappings/import".into(),
            "/mappings/export".into(),
            "/mappings/{mapping_id}".into(),
            "/mappings/{mapping_id}/duplicate".into(),
            // Presets
            "/presets".into(),
            "/presets/{preset_id}".into(),
            // Workflows
            "/workflow".into(),
            "/workflow/default".into(),
            "/workflow/catalog".into(),
            // Voice assets
            "/voice-assets".into(),
            "/voice-assets/{voice_asset_id}".into(),
            "/voice-assets/{voice_asset_id}/preprocess".into(),
            "/voice-assets/probe".into(),
            // Exports
            "/exports/{export_id}/download".into(),
            // Families
            "/families".into(),
            "/families/{family_id}".into(),
        ]
    }

    async fn build_router_inner_async(&self) -> Result<Router, BuildRouterError> {
        // Surface a malformed bundled recipe projection at boot rather than as a
        // panic on the first run request (recipe_resolve C2).
        if let Err(e) = crate::recipe_resolve::ensure_initialized() {
            tracing::error!(error = %e, "emotion-tts recipe projection failed to assemble; run requests will error until fixed");
        }

        // Apply emotion-tts's own migrations idempotently. The host's
        // generic `StorageManager::apply_plan` requires pre-built
        let pool = &self.resources.pool;
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS ext_emotion_tts__schema_versions (\
                 version INTEGER PRIMARY KEY,\
                 name TEXT NOT NULL,\
                 applied_at TEXT NOT NULL\
             )",
        )
        .execute(pool)
        .await
        .map_err(|e| Box::new(e) as BuildRouterError)?;

        for migration in MIGRATIONS {
            let already: Option<i64> = sqlx::query_scalar(
                "SELECT version FROM ext_emotion_tts__schema_versions WHERE version = ?",
            )
            .bind(migration.version as i64)
            .fetch_optional(pool)
            .await
            .map_err(|e| Box::new(e) as BuildRouterError)?;
            if already.is_some() {
                continue;
            }
            sqlx::raw_sql(migration.sql)
                .execute(pool)
                .await
                .map_err(|e| {
                    let detail = format!(
                        "emotion-tts migration v{} ({}) failed: {e}",
                        migration.version, migration.name
                    );
                    Box::<dyn std::error::Error + Send + Sync>::from(detail) as BuildRouterError
                })?;
            sqlx::query(
                "INSERT INTO ext_emotion_tts__schema_versions (version, name, applied_at) \
                 VALUES (?, ?, datetime('now'))",
            )
            .bind(migration.version as i64)
            .bind(migration.name)
            .execute(pool)
            .await
            .map_err(|e| Box::new(e) as BuildRouterError)?;
        }

        let repos = Repos::from_pool(self.resources.pool.clone());
        let queue = Arc::new(RuntimeQueue::new());
        // Construct the real StdioLease-backed factory if the host wired in
        // both filesystem dirs; otherwise fall back to the stub that surfaces
        let lease_factory: Arc<dyn LeaseFactory> = match (
            self.resources.extension_dir.clone(),
            self.resources.host_data_dir.clone(),
        ) {
            (Some(ext_dir), Some(host_data_dir)) => {
                let factory_data_dir = host_data_dir.join("extensions").join(EXTENSION_ID);
                Arc::new(EmotionTtsLeaseFactory::new(
                    ext_dir,
                    factory_data_dir,
                    self.resources.model_locator.clone(),
                ))
            }
            _ => Arc::new(StubLeaseFactory),
        };
        let provider = Arc::new(LeaseProvider::new(lease_factory.clone()));
        let run_channels = Arc::new(crate::dispatcher::RunChannelRegistry::new());
        // Discard the JoinHandle — dropping it does not abort the task per
        // tokio::spawn semantics; the dispatcher runs for the process lifetime.
        let artifact_store_for_dispatcher = self.resources.artifact_store.clone();
        // Persist run outputs under the host data dir when one is wired
        // (`<host_data_dir>/extensions/<id>/runs`) so they survive reboots
        let output_root_base = self.resources.host_data_dir.clone().map_or_else(
            || std::env::temp_dir().join(crate::FALLBACK_RUNS_DIR),
            |host_data_dir| {
                host_data_dir
                    .join("extensions")
                    .join(EXTENSION_ID)
                    .join("runs")
            },
        );
        // Pool sized to the worker ceiling (EMOTIONTTS_MAX_WORKERS, default 1);
        // extra providers stay cold until parallel runs reach them.
        let pool = Arc::new(crate::dispatcher::LeaseProviderPool::with_ceiling(
            lease_factory,
            provider.clone(),
            crate::dispatcher::worker_ceiling(),
        ));
        drop(crate::dispatcher::spawn_dispatcher_pooled(
            queue.clone(),
            repos.clone(),
            pool.clone(),
            run_channels.clone(),
            artifact_store_for_dispatcher,
            EXTENSION_VERSION,
            output_root_base,
        ));
        drop(crate::dispatcher::spawn_idle_watcher_pooled(pool.clone()));
        let artifact_store = self.resources.artifact_store.clone();
        Ok(crate::router::build_router_with_families(
            repos,
            queue,
            EXTENSION_VERSION,
            Some(provider),
            Some(pool),
            artifact_store,
            run_channels,
            Arc::new(crate::families::FamilyRegistry::new(Vec::new())),
            crate::router::families::default_reconciler(),
        ))
    }
}

/// Placeholder factory that returns a clear, structured error any time the
/// recipe header tries to spawn the runtime. Real implementation requires
/// host-side wiring (see register.rs `build_router_inner_async` doc-comment).
///
/// The error message is intentionally explicit so the toast surfaced by
/// `DeploymentHeader.install` reads like a genuine product status, not a
/// stack-trace fragment.
struct StubLeaseFactory;

#[async_trait]
impl LeaseFactory for StubLeaseFactory {
    async fn acquire(&self) -> DomainResult<SharedLease> {
        Err(EmotionTtsError::RuntimeUnavailable(
            "EmotionTTS runtime backend is not yet wired through the host. \
             The dependency installer can validate your install (Settings → \
             Dependencies → Reinstall everything), but starting a long-lived \
             worker from the recipe header is not implemented in this build."
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

impl ExtensionRouterProvider for EmotionTtsRouterProvider {
    fn extension_id(&self) -> &'static str {
        EXTENSION_ID
    }

    fn build_router(
        &self,
        _cx: &ExtensionContext<'_>,
    ) -> Result<(Router, Vec<String>), BuildRouterError> {
        let router = block_on(self.build_router_inner_async())?;
        Ok((router, Self::http_routes()))
    }
}
