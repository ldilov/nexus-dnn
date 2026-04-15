use std::sync::Arc;
use std::time::Duration;

use chrono::Utc;
use sqlx::{Row, SqlitePool};

use super::errors::ModelStoreResult;

pub trait OwnerPredicate: Send + Sync {
    fn is_active(&self, extension_id: &str) -> bool;
}

impl<F> OwnerPredicate for F
where
    F: Fn(&str) -> bool + Send + Sync,
{
    fn is_active(&self, extension_id: &str) -> bool {
        self(extension_id)
    }
}

#[derive(Debug, Clone)]
pub struct ReclaimConfig {
    pub grace: Duration,
    pub tick_interval: Duration,
}

impl Default for ReclaimConfig {
    fn default() -> Self {
        let grace = Duration::from_secs(24 * 60 * 60);
        Self {
            grace,
            tick_interval: Duration::from_secs((grace.as_secs() / 4).max(600)),
        }
    }
}

pub async fn run_reclaim_pass(
    pool: &SqlitePool,
    predicate: &dyn OwnerPredicate,
    grace: Duration,
) -> ModelStoreResult<usize> {
    let cutoff = Utc::now() - chrono::Duration::from_std(grace).unwrap_or(chrono::Duration::zero());
    let cutoff_str = cutoff.to_rfc3339();

    let rows = sqlx::query(
        "SELECT install_id, owner_extension_id, install_root \
         FROM host_model_installs \
         WHERE private_model = 1 \
           AND state != 'reclaimed' \
           AND updated_at < $1 \
           AND NOT EXISTS ( \
               SELECT 1 FROM host_model_leases l \
               WHERE l.install_id = host_model_installs.install_id \
                 AND l.released_at IS NULL \
           )",
    )
    .bind(&cutoff_str)
    .fetch_all(pool)
    .await?;

    let mut reclaimed = 0;
    for row in rows {
        let owner: Option<String> = row.try_get("owner_extension_id").ok();
        let Some(owner) = owner else {
            continue;
        };
        if predicate.is_active(&owner) {
            continue;
        }
        let install_id: String = row.try_get("install_id")?;
        let install_root: String = row.try_get("install_root").unwrap_or_default();
        if !install_root.is_empty() {
            let _ = tokio::fs::remove_dir_all(&install_root).await;
        }
        sqlx::query(
            "UPDATE host_model_installs SET state = 'reclaimed', updated_at = $1 \
             WHERE install_id = $2",
        )
        .bind(Utc::now().to_rfc3339())
        .bind(&install_id)
        .execute(pool)
        .await?;
        reclaimed += 1;
    }
    Ok(reclaimed)
}

pub fn spawn_reclaim_ticker(
    pool: SqlitePool,
    predicate: Arc<dyn OwnerPredicate>,
    config: ReclaimConfig,
) -> tokio::task::JoinHandle<()> {
    tokio::spawn(async move {
        let mut ticker = tokio::time::interval(config.tick_interval);
        ticker.tick().await;
        loop {
            ticker.tick().await;
            match run_reclaim_pass(&pool, predicate.as_ref(), config.grace).await {
                Ok(n) if n > 0 => {
                    tracing::info!(count = n, "private-model reclaim pass swept rows");
                }
                Ok(_) => {}
                Err(e) => tracing::error!(error = %e, "reclaim pass failed"),
            }
        }
    })
}
