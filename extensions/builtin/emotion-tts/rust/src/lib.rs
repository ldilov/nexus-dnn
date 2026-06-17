//! EmotionTTS extension — Rust shim.
//!
//! Entry point `register()` is invoked by the Nexus host loader at extension
//! activation time. It returns an [`ExtensionHandle`] bundling the storage
//! migrations, the mounted [`axum::Router`], and the operator registry so the
//! host can wire the extension into its generic dispatch surfaces without
//! knowing anything EmotionTTS-specific.

pub mod backend_client;
pub mod cache_evictor;
pub mod dispatcher;
pub mod domain;
pub mod families;
pub mod host_adapter;
pub mod host_contract;
pub mod operators;
pub mod queue;
pub mod register;
pub mod router;
pub mod storage;
pub mod workflow_binding;

pub use register::{EmotionTtsProviderResources, EmotionTtsRouterProvider, EXTENSION_ID};

/// Subdirectory used under `std::env::temp_dir()` when no `host_data_dir`
/// has been wired into the dispatcher (test embeds, the `register()`
/// entrypoint that predates host data-dir plumbing). Real host-managed
/// runs land under `<host_data_dir>/extensions/<EXTENSION_ID>/runs/` —
/// see `EmotionTtsRouterProvider::build_router_inner_async`.
pub const FALLBACK_RUNS_DIR: &str = "nexus-emotion-tts-runs";

use std::sync::Arc;

use axum::Router;

use crate::host_contract::HostStoragePool;
use crate::queue::RuntimeQueue;
use crate::storage::Repos;

/// Handle returned by [`register`] — consumed by the host loader.
///
/// The host is expected to:
/// * apply the embedded migrations against its SQLite database;
/// * mount `router` under `/api/v1/extensions/nexus.audio.emotiontts`;
/// * expose the operator registry for DAG execution (wired later in Phase 3).
pub struct ExtensionHandle {
    pub migrations: &'static [Migration],
    pub router: Router,
}

pub struct Migration {
    pub version: u32,
    pub name: &'static str,
    pub sql: &'static str,
}

pub const MIGRATIONS: &[Migration] = &[
    Migration {
        version: 1,
        name: "deployments",
        sql: include_str!("../../storage/migrations/001_deployments.sql"),
    },
    Migration {
        version: 2,
        name: "voice_assets",
        sql: include_str!("../../storage/migrations/002_voice_assets.sql"),
    },
    Migration {
        version: 3,
        name: "character_mappings",
        sql: include_str!("../../storage/migrations/003_character_mappings.sql"),
    },
    Migration {
        version: 4,
        name: "vector_presets",
        sql: include_str!("../../storage/migrations/004_vector_presets.sql"),
    },
    Migration {
        version: 5,
        name: "runs",
        sql: include_str!("../../storage/migrations/005_runs.sql"),
    },
    Migration {
        version: 6,
        name: "utterances",
        sql: include_str!("../../storage/migrations/006_utterances.sql"),
    },
    Migration {
        version: 7,
        name: "synthesis_cache",
        sql: include_str!("../../storage/migrations/007_synthesis_cache.sql"),
    },
    Migration {
        version: 8,
        name: "export_history",
        sql: include_str!("../../storage/migrations/008_export_history.sql"),
    },
    Migration {
        version: 9,
        name: "workflows",
        sql: include_str!("../../storage/migrations/009_workflows.sql"),
    },
    Migration {
        version: 10,
        name: "deployments_partial_run_id",
        sql: include_str!("../../storage/migrations/010_deployments_partial_run_id.sql"),
    },
    Migration {
        version: 11,
        name: "deployment_engine_settings",
        sql: include_str!("../../storage/migrations/011_deployment_engine_settings.sql"),
    },
    Migration {
        version: 12,
        name: "voice_assets_preprocess",
        sql: include_str!("../../storage/migrations/012_voice_assets_preprocess.sql"),
    },
    Migration {
        version: 13,
        name: "deployment_default_voice",
        sql: include_str!("../../storage/migrations/013_deployment_default_voice.sql"),
    },
    Migration {
        version: 14,
        name: "fk_cascade",
        sql: include_str!("../../storage/migrations/014_fk_cascade.sql"),
    },
    Migration {
        version: 15,
        name: "voice_asset_edit_chain",
        sql: include_str!("../../storage/migrations/015_voice_asset_edit_chain.sql"),
    },
    Migration {
        version: 16,
        name: "utterance_edit_chain",
        sql: include_str!("../../storage/migrations/016_utterance_edit_chain.sql"),
    },
    Migration {
        version: 17,
        name: "audio_edit_log",
        sql: include_str!("../../storage/migrations/017_audio_edit_log.sql"),
    },
    Migration {
        version: 18,
        name: "utterance_updated_at",
        sql: include_str!("../../storage/migrations/018_utterance_updated_at.sql"),
    },
    Migration {
        version: 19,
        name: "voice_asset_derived_ref",
        sql: include_str!("../../storage/migrations/019_voice_asset_derived_ref.sql"),
    },
    Migration {
        version: 20,
        name: "run_export_zip_stale_at",
        sql: include_str!("../../storage/migrations/020_run_export_zip_stale_at.sql"),
    },
    Migration {
        version: 21,
        name: "utterance_derived_ref",
        sql: include_str!("../../storage/migrations/021_utterance_derived_ref.sql"),
    },
    Migration {
        version: 22,
        name: "eq3_op_support",
        sql: include_str!("../../storage/migrations/022_eq3_op_support.sql"),
    },
    Migration {
        version: 23,
        name: "voice_asset_chain_digest",
        sql: include_str!("../../storage/migrations/023_voice_asset_chain_digest.sql"),
    },
    Migration {
        version: 24,
        name: "audit_chain_snapshot",
        sql: include_str!("../../storage/migrations/024_audit_chain_snapshot.sql"),
    },
    Migration {
        version: 25,
        name: "run_prebuilt_segments",
        sql: include_str!("../../storage/migrations/025_run_prebuilt_segments.sql"),
    },
];

pub const EXTENSION_VERSION: &str = env!("CARGO_PKG_VERSION");

/// Entry point called by the host loader.
pub async fn register(
    pool: Arc<dyn HostStoragePool>,
    lease_factory: Option<Arc<dyn crate::backend_client::LeaseFactory>>,
    artifact_store: Option<Arc<dyn crate::host_contract::HostArtifactStore>>,
) -> crate::domain::Result<ExtensionHandle> {
    let repos = crate::storage::build_repos(pool).await?;
    let queue = Arc::new(RuntimeQueue::new());
    let provider = lease_factory
        .as_ref()
        .map(|f| Arc::new(crate::backend_client::LeaseProvider::new(f.clone())));
    let run_channels = Arc::new(crate::dispatcher::RunChannelRegistry::new());
    // The dispatcher only runs when a LeaseProvider is wired in. Without
    // a lease there is no worker to talk to, so any enqueued run would
    let mut runtime_pool: Option<Arc<crate::dispatcher::LeaseProviderPool>> = None;
    if let (Some(p), Some(f)) = (provider.clone(), lease_factory.clone()) {
        // Discard the JoinHandle — dropping it does not abort the task per
        // tokio::spawn semantics; the dispatcher runs for the process lifetime.
        let output_root_base = std::env::temp_dir().join(crate::FALLBACK_RUNS_DIR);
        // Pool sized to the worker ceiling (EMOTIONTTS_MAX_WORKERS, default 1);
        // extras stay cold until parallel runs hit them.
        let pool = Arc::new(crate::dispatcher::LeaseProviderPool::with_ceiling(
            f,
            p.clone(),
            crate::dispatcher::worker_ceiling(),
        ));
        drop(crate::dispatcher::spawn_dispatcher_pooled(
            queue.clone(),
            repos.clone(),
            pool.clone(),
            run_channels.clone(),
            artifact_store.clone(),
            EXTENSION_VERSION,
            output_root_base,
        ));
        drop(crate::dispatcher::spawn_idle_watcher_pooled(pool.clone()));
        runtime_pool = Some(pool);
    }
    let router = router::build_router_with_families(
        repos,
        queue,
        EXTENSION_VERSION,
        provider,
        runtime_pool,
        artifact_store,
        run_channels,
        Arc::new(crate::families::FamilyRegistry::new(Vec::new())),
        crate::router::families::default_reconciler(),
    );
    Ok(ExtensionHandle {
        migrations: MIGRATIONS,
        router,
    })
}

pub fn build_router_with(
    repos: Repos,
    queue: Arc<RuntimeQueue>,
    extension_version: impl Into<String>,
) -> Router {
    router::build_router(repos, queue, extension_version, None, None)
}

pub fn build_router_with_artifact_store(
    repos: Repos,
    queue: Arc<RuntimeQueue>,
    extension_version: impl Into<String>,
    artifact_store: Arc<dyn crate::host_contract::HostArtifactStore>,
) -> Router {
    router::build_router(repos, queue, extension_version, None, Some(artifact_store))
}
