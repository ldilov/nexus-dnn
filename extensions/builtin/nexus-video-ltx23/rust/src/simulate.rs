use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use chrono::Utc;
use tokio::time::sleep;

use crate::errors::Result;
use crate::storage::Repos;

const FAKE_MP4_PLACEHOLDER: &[u8] = include_bytes!("../assets/fake_placeholder.mp4");

#[derive(Clone)]
pub struct SimulatorConfig {
    pub runs_dir: PathBuf,
    pub repos: Repos,
    pub segment_delay_ms: u64,
}

#[derive(Clone)]
pub struct Simulator {
    cfg: Arc<SimulatorConfig>,
}

impl Simulator {
    #[must_use]
    pub fn new(cfg: SimulatorConfig) -> Self {
        Self { cfg: Arc::new(cfg) }
    }

    pub fn spawn_fake_render(&self, run_id: String, segment_count: u32) {
        let cfg = self.cfg.clone();
        tokio::spawn(async move {
            if let Err(e) = run_fake_render(&cfg, &run_id, segment_count).await {
                tracing::error!(
                    extension_id = "nexus.video.ltx23",
                    run_id = %run_id,
                    error = %e,
                    "fake simulator: render failed"
                );
                let _ = cfg
                    .repos
                    .update_run_status(
                        &run_id,
                        "failed",
                        None,
                        Some("simulator_error"),
                        Some(&e.to_string()),
                    )
                    .await;
            }
        });
    }
}

async fn run_fake_render(cfg: &SimulatorConfig, run_id: &str, segment_count: u32) -> Result<()> {
    cfg.repos
        .update_run_status(run_id, "rendering", None, None, None)
        .await?;

    for index in 0..segment_count {
        cfg.repos
            .update_segment_status(run_id, i64::from(index), "rendering", None)
            .await?;
        sleep(Duration::from_millis(cfg.segment_delay_ms)).await;
        cfg.repos
            .update_segment_status(run_id, i64::from(index), "completed", None)
            .await?;
    }

    cfg.repos
        .update_run_status(run_id, "encoding", None, None, None)
        .await?;
    let final_path = write_placeholder_mp4(&cfg.runs_dir, run_id).await?;
    tracing::info!(
        extension_id = "nexus.video.ltx23",
        run_id = %run_id,
        path = %final_path.display(),
        "fake simulator: final placeholder written"
    );

    let artifact_id = format!("ltx23-run-{run_id}-final");
    cfg.repos
        .update_run_status(run_id, "completed", Some(&artifact_id), None, None)
        .await?;
    Ok(())
}

async fn write_placeholder_mp4(runs_dir: &std::path::Path, run_id: &str) -> Result<PathBuf> {
    let dir = runs_dir.join(run_id);
    tokio::fs::create_dir_all(&dir).await.map_err(|e| {
        crate::errors::ExtensionError::Internal(format!("mkdir {}: {e}", dir.display()))
    })?;
    let path = dir.join("final.mp4");
    tokio::fs::write(&path, FAKE_MP4_PLACEHOLDER)
        .await
        .map_err(|e| {
            crate::errors::ExtensionError::Internal(format!("write {}: {e}", path.display()))
        })?;
    Ok(path)
}

#[must_use]
pub fn now_iso() -> String {
    Utc::now().to_rfc3339()
}
