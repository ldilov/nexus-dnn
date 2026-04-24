//! Storage layer — repo traits + SQLite implementations.
//!
//! The extension owns every `ext_emotion_tts__*` table. Access happens via
//! the repo traits in [`repo_traits`]; the SQLite impls are separate files
//! (one per table) to keep each file focused.

pub mod repo_traits;

pub mod deployments_repo;
pub mod export_history_repo;
pub mod mappings_repo;
pub mod presets_repo;
pub mod runs_repo;
pub mod synthesis_cache_repo;
pub mod utterances_repo;
pub mod voice_assets_repo;

pub use repo_traits::{
    DeploymentsRepo, ExportHistoryRepo, MappingsRepo, PresetsRepo, RunsRepo, SynthesisCacheRepo,
    UtterancesRepo, VoiceAssetsRepo,
};

use std::sync::Arc;

use sqlx::SqlitePool;

use crate::host_contract::HostStoragePool;

/// Bundle of every repo — constructed once at extension registration.
#[derive(Clone)]
pub struct Repos {
    pub deployments: Arc<dyn DeploymentsRepo>,
    pub voice_assets: Arc<dyn VoiceAssetsRepo>,
    pub mappings: Arc<dyn MappingsRepo>,
    pub presets: Arc<dyn PresetsRepo>,
    pub runs: Arc<dyn RunsRepo>,
    pub utterances: Arc<dyn UtterancesRepo>,
    pub cache: Arc<dyn SynthesisCacheRepo>,
    pub exports: Arc<dyn ExportHistoryRepo>,
}

impl Repos {
    #[must_use]
    pub fn from_pool(pool: SqlitePool) -> Self {
        let p = pool;
        Self {
            deployments: Arc::new(deployments_repo::SqliteDeploymentsRepo::new(p.clone())),
            voice_assets: Arc::new(voice_assets_repo::SqliteVoiceAssetsRepo::new(p.clone())),
            mappings: Arc::new(mappings_repo::SqliteMappingsRepo::new(p.clone())),
            presets: Arc::new(presets_repo::SqlitePresetsRepo::new(p.clone())),
            runs: Arc::new(runs_repo::SqliteRunsRepo::new(p.clone())),
            utterances: Arc::new(utterances_repo::SqliteUtterancesRepo::new(p.clone())),
            cache: Arc::new(synthesis_cache_repo::SqliteSynthesisCacheRepo::new(p.clone())),
            exports: Arc::new(export_history_repo::SqliteExportHistoryRepo::new(p)),
        }
    }
}

pub async fn build_repos(pool: Arc<dyn HostStoragePool>) -> crate::domain::Result<Repos> {
    let sqlite = pool.acquire().await.map_err(crate::domain::EmotionTtsError::from)?;
    Ok(Repos::from_pool(sqlite))
}
