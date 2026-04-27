//! `ExtensionRouterProvider` impl for the EmotionTTS extension.
//!
//! Spec 030 — registered with the host's extension router registry at
//! startup so the EmotionTTS routes become reachable via
//! `/api/v1/extensions/nexus.audio.emotiontts/*`. Without this provider
//! the host's dispatcher returns `unknown_extension` 404 for every URL
//! the bundled web UI tries to fetch.
//!
//! Mirrors `nexus_local_llm_chat_history::LocalLlmRouterProvider`.

use std::sync::Arc;

use axum::Router;
use nexus_extension::{BuildRouterError, ExtensionContext, ExtensionRouterProvider};
use sqlx::SqlitePool;

use crate::queue::RuntimeQueue;
use crate::storage::Repos;
use crate::{EXTENSION_VERSION, MIGRATIONS, build_router_with};

pub const EXTENSION_ID: &str = "nexus.audio.emotiontts";

/// Resources the EmotionTTS provider needs to construct its router.
/// Built once at host startup and handed to `EmotionTtsRouterProvider`.
#[derive(Clone)]
pub struct EmotionTtsProviderResources {
    pub pool: SqlitePool,
}

impl EmotionTtsProviderResources {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
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
        // reach the inner router. Path-parameter syntax follows axum's
        // `{name}` convention.
        vec![
            // Deployments
            "/deployments".into(),
            "/deployments/{deployment_id}".into(),
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
        // Apply emotion-tts's own migrations idempotently. The host's
        // generic `StorageManager::apply_plan` requires pre-built
        // `MigrationInput` records with checksums + namespace ids; for
        // this provider's lifecycle we side-step that and run the SQL
        // directly. Each migration is `IF NOT EXISTS`-guarded so it's
        // safe across restarts.
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
        // For now the artifact_store + lease_provider are not threaded
        // from the host. The voice-assets surface returns its
        // `not_configured` envelope (added in the recent review pass)
        // and the runtime/lease surface stays mounted but unused. Both
        // can be wired later without breaking the route mount.
        Ok(build_router_with(repos, queue, EXTENSION_VERSION))
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
