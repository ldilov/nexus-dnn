use std::path::PathBuf;

use axum::Router;
use nexus_extension::{BuildRouterError, ExtensionContext, ExtensionRouterProvider};
use sqlx::SqlitePool;

use crate::api::{ApiState, http_routes, router};
use crate::lease::LtxLeaseFactory;
use crate::migrations::MIGRATIONS;
use crate::profile_install::ProfileInstallService;
use crate::runner::{Runner, RunnerConfig};
use crate::storage::Repos;
use crate::vram_supervisor::VramSupervisor;

pub const EXTENSION_ID: &str = "nexus.video.ltx23";
pub const EXTENSION_VERSION: &str = env!("CARGO_PKG_VERSION");

#[derive(Clone)]
pub struct LtxProviderResources {
    pub pool: SqlitePool,
    pub host_data_dir: Option<PathBuf>,
    pub extension_dir: PathBuf,
}

impl LtxProviderResources {
    #[must_use]
    pub const fn new(pool: SqlitePool) -> Self {
        Self {
            pool,
            host_data_dir: None,
            extension_dir: PathBuf::new(),
        }
    }

    #[must_use]
    pub fn with_host_data_dir(mut self, dir: PathBuf) -> Self {
        self.host_data_dir = Some(dir);
        self
    }

    #[must_use]
    pub fn with_extension_dir(mut self, dir: PathBuf) -> Self {
        self.extension_dir = dir;
        self
    }
}

pub struct LtxRouterProvider {
    resources: LtxProviderResources,
}

impl LtxRouterProvider {
    #[must_use]
    pub const fn new(resources: LtxProviderResources) -> Self {
        Self { resources }
    }

    async fn build_router_inner(&self) -> Result<Router, BuildRouterError> {
        apply_migrations(&self.resources.pool).await?;

        let runs_dir = self
            .resources
            .host_data_dir
            .clone()
            .unwrap_or_else(|| std::env::temp_dir().join("nexus-video-ltx23-runs"))
            .join("extensions")
            .join(EXTENSION_ID)
            .join("runs");

        tokio::fs::create_dir_all(&runs_dir)
            .await
            .map_err(|e| -> BuildRouterError {
                Box::new(std::io::Error::other(format!(
                    "create runs dir {}: {e}",
                    runs_dir.display()
                )))
            })?;

        let repos = Repos::from_pool(self.resources.pool.clone());

        let extension_data_dir = self
            .resources
            .host_data_dir
            .clone()
            .unwrap_or_else(std::env::temp_dir)
            .join("extensions")
            .join(EXTENSION_ID);

        let factory = std::sync::Arc::new(LtxLeaseFactory::new(
            self.resources.extension_dir.clone(),
            extension_data_dir,
        ));

        // Item B: spawn the segment-status flusher alongside the
        // runner. The JoinHandle is intentionally detached — the
        // flusher exits cleanly when every NotificationBuffer clone
        // drops (i.e. when the runner is dropped at process exit).
        // No restart logic needed; if it ever crashes, segment-status
        // writes degrade to log-only and the run still completes.
        let (notification_buffer, _flusher_handle) =
            crate::notification_buffer::NotificationBuffer::new(
                repos.clone(),
                crate::notification_buffer::DEFAULT_FLUSH_INTERVAL,
            );

        let runner = Runner::new(RunnerConfig {
            runs_dir: runs_dir.clone(),
            repos: repos.clone(),
            factory: factory.clone(),
            vram_supervisor: VramSupervisor::from_env(),
            notification_buffer,
        });

        let host_data_root = self
            .resources
            .host_data_dir
            .clone()
            .unwrap_or_else(std::env::temp_dir);
        let profile_install = ProfileInstallService::new(factory, host_data_root);

        let state = ApiState::new(
            repos,
            runner,
            runs_dir,
            EXTENSION_VERSION,
            profile_install,
        );
        Ok(router(state))
    }
}

async fn apply_migrations(pool: &SqlitePool) -> Result<(), BuildRouterError> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__schema_versions (\
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
            "SELECT version FROM ext_nexus_video_ltx23__schema_versions WHERE version = ?",
        )
        .bind(i64::from(migration.version))
        .fetch_optional(pool)
        .await
        .map_err(|e| Box::new(e) as BuildRouterError)?;
        if already.is_some() {
            continue;
        }
        // Each migration is applied atomically: the DDL + the schema-
        // version bookkeeping insert succeed-or-fail together. Prevents
        // the partial-application failure mode where the table is
        // created but the version row is missing, causing a re-run
        // next boot.
        let mut tx = pool
            .begin()
            .await
            .map_err(|e| Box::new(e) as BuildRouterError)?;
        sqlx::raw_sql(migration.sql)
            .execute(&mut *tx)
            .await
            .map_err(|e| -> BuildRouterError {
                Box::<dyn std::error::Error + Send + Sync>::from(format!(
                    "ltx23 migration v{} ({}) failed: {e}",
                    migration.version, migration.name
                ))
            })?;
        sqlx::query(
            "INSERT INTO ext_nexus_video_ltx23__schema_versions (version, name, applied_at) \
             VALUES (?, ?, datetime('now'))",
        )
        .bind(i64::from(migration.version))
        .bind(migration.name)
        .execute(&mut *tx)
        .await
        .map_err(|e| Box::new(e) as BuildRouterError)?;
        tx.commit()
            .await
            .map_err(|e| Box::new(e) as BuildRouterError)?;
    }

    // Enable foreign key enforcement for the rest of the connection's
    // lifetime. SQLite defaults to OFF; without this the FK declared in
    // migration 003 wouldn't actually trip on orphan inserts. Done
    // post-migration because the migration itself temporarily disables
    // FKs during the table-rebuild dance.
    sqlx::query("PRAGMA foreign_keys = ON")
        .execute(pool)
        .await
        .map_err(|e| Box::new(e) as BuildRouterError)?;

    Ok(())
}

fn block_on<F: std::future::Future>(fut: F) -> F::Output {
    let handle = tokio::runtime::Handle::current();
    tokio::task::block_in_place(|| handle.block_on(fut))
}

impl ExtensionRouterProvider for LtxRouterProvider {
    fn extension_id(&self) -> &'static str {
        EXTENSION_ID
    }

    fn build_router(
        &self,
        _cx: &ExtensionContext<'_>,
    ) -> Result<(Router, Vec<String>), BuildRouterError> {
        let router = block_on(self.build_router_inner())?;
        Ok((router, http_routes()))
    }
}
