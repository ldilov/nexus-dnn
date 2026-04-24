//! EmotionTTS extension — Rust shim.
//!
//! Entry point `register()` is invoked by the Nexus host loader at extension
//! activation time. It returns an [`ExtensionHandle`] bundling the storage
//! migrations, the mounted [`axum::Router`], and the operator registry so the
//! host can wire the extension into its generic dispatch surfaces without
//! knowing anything EmotionTTS-specific.

pub mod backend_client;
pub mod domain;
pub mod host_contract;
pub mod router;
pub mod storage;

use std::sync::Arc;

use axum::Router;

use crate::host_contract::HostStoragePool;

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
    Migration { version: 1, name: "deployments",        sql: include_str!("../../storage/migrations/001_deployments.sql") },
    Migration { version: 2, name: "voice_assets",       sql: include_str!("../../storage/migrations/002_voice_assets.sql") },
    Migration { version: 3, name: "character_mappings", sql: include_str!("../../storage/migrations/003_character_mappings.sql") },
    Migration { version: 4, name: "vector_presets",     sql: include_str!("../../storage/migrations/004_vector_presets.sql") },
    Migration { version: 5, name: "runs",               sql: include_str!("../../storage/migrations/005_runs.sql") },
    Migration { version: 6, name: "utterances",         sql: include_str!("../../storage/migrations/006_utterances.sql") },
    Migration { version: 7, name: "synthesis_cache",    sql: include_str!("../../storage/migrations/007_synthesis_cache.sql") },
    Migration { version: 8, name: "export_history",     sql: include_str!("../../storage/migrations/008_export_history.sql") },
];

/// Entry point called by the host loader.
pub fn register(pool: Arc<dyn HostStoragePool>) -> ExtensionHandle {
    let router = router::build_router(pool);
    ExtensionHandle {
        migrations: MIGRATIONS,
        router,
    }
}
