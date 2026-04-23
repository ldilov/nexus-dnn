//! SQLite-backed [`BackendRuntimeLeasesRepo`] impl.

use std::str::FromStr;

use async_trait::async_trait;
use sqlx::Row;
use sqlx::sqlite::SqlitePool;

use super::{LeaseRecord, repo::BackendRuntimeLeasesRepo};
use crate::generic::enums::{LeaseState, OwnerKind, PipelineFailureCategory, Transport};
use crate::generic::errors::GenericRepoError;
use crate::generic::ids::{RuntimeInstallId, RuntimeLeaseId};

#[derive(Clone)]
pub struct SqliteLeasesRepo {
    pool: SqlitePool,
}

impl SqliteLeasesRepo {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    fn row_to_record(row: sqlx::sqlite::SqliteRow) -> Result<LeaseRecord, GenericRepoError> {
        let lease_id_raw: String = row.try_get("lease_id")?;
        let lease_id = RuntimeLeaseId::from_str(&lease_id_raw)
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let install_id_raw: String = row.try_get("runtime_install_id")?;
        let runtime_install_id = RuntimeInstallId::from_str(&install_id_raw)
            .map_err(|e| GenericRepoError::Serialization(e.to_string()))?;

        let owner_kind_raw: String = row.try_get("owner_kind")?;
        let owner_kind = match owner_kind_raw.as_str() {
            "deployment" => OwnerKind::Deployment,
            "run" => OwnerKind::Run,
            "preview_session" => OwnerKind::PreviewSession,
            other => {
                return Err(GenericRepoError::Serialization(format!(
                    "unknown owner_kind: {other}"
                )));
            }
        };

        let transport_raw: String = row.try_get("transport")?;
        let transport = match transport_raw.as_str() {
            "stdio" => Transport::Stdio,
            other => {
                return Err(GenericRepoError::Serialization(format!(
                    "unknown transport: {other}"
                )));
            }
        };

        let state_raw: String = row.try_get("state")?;
        let state = match state_raw.as_str() {
            "starting" => LeaseState::Starting,
            "ready" => LeaseState::Ready,
            "busy" => LeaseState::Busy,
            "stopping" => LeaseState::Stopping,
            "failed" => LeaseState::Failed,
            "released" => LeaseState::Released,
            other => {
                return Err(GenericRepoError::Serialization(format!(
                    "unknown lease state: {other}"
                )));
            }
        };

        let endpoint_json_raw: Option<String> = row.try_get("endpoint_json")?;
        let endpoint_json = endpoint_json_raw
            .map(|s| serde_json::from_str::<serde_json::Value>(&s))
            .transpose()?;

        let crash_recovered: i64 = row.try_get("crash_recovered")?;

        let last_failure_category: Option<String> = row.try_get("last_failure_category")?;
        let last_failure_category = last_failure_category
            .map(|raw| {
                PipelineFailureCategory::from_wire(&raw).map_err(|other| {
                    GenericRepoError::Serialization(format!("unknown failure category: {other}"))
                })
            })
            .transpose()?;

        Ok(LeaseRecord {
            lease_id,
            runtime_install_id,
            owner_kind,
            owner_ref: row.try_get("owner_ref")?,
            transport,
            endpoint_json,
            pid: row.try_get("pid")?,
            state,
            crash_recovered: crash_recovered != 0,
            last_failure_category,
            acquired_at: row.try_get("acquired_at")?,
            released_at: row.try_get("released_at")?,
        })
    }
}

#[async_trait]
impl BackendRuntimeLeasesRepo for SqliteLeasesRepo {
    async fn insert(&self, r: &LeaseRecord) -> Result<(), GenericRepoError> {
        let endpoint_json = r
            .endpoint_json
            .as_ref()
            .map(serde_json::to_string)
            .transpose()?;

        sqlx::query(
            r#"
            INSERT INTO backend_runtime_leases (
                lease_id, runtime_install_id, owner_kind, owner_ref,
                transport, endpoint_json, pid, state, crash_recovered,
                last_failure_category, acquired_at, released_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(r.lease_id.to_string())
        .bind(r.runtime_install_id.to_string())
        .bind(r.owner_kind.as_str())
        .bind(&r.owner_ref)
        .bind(r.transport.as_str())
        .bind(endpoint_json)
        .bind(r.pid)
        .bind(r.state.as_str())
        .bind(if r.crash_recovered { 1_i64 } else { 0_i64 })
        .bind(r.last_failure_category.as_ref().map(|c| c.to_wire()))
        .bind(r.acquired_at)
        .bind(r.released_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn get(
        &self,
        lease_id: &RuntimeLeaseId,
    ) -> Result<Option<LeaseRecord>, GenericRepoError> {
        let row = sqlx::query("SELECT * FROM backend_runtime_leases WHERE lease_id = ?")
            .bind(lease_id.to_string())
            .fetch_optional(&self.pool)
            .await?;
        row.map(Self::row_to_record).transpose()
    }

    async fn list_live_by_install(
        &self,
        install_id: &RuntimeInstallId,
    ) -> Result<Vec<LeaseRecord>, GenericRepoError> {
        let rows = sqlx::query(
            "SELECT * FROM backend_runtime_leases
             WHERE runtime_install_id = ?
               AND state NOT IN ('released','failed')
             ORDER BY acquired_at ASC",
        )
        .bind(install_id.to_string())
        .fetch_all(&self.pool)
        .await?;
        rows.into_iter().map(Self::row_to_record).collect()
    }

    async fn update_state(
        &self,
        lease_id: &RuntimeLeaseId,
        state: LeaseState,
    ) -> Result<(), GenericRepoError> {
        let result = sqlx::query("UPDATE backend_runtime_leases SET state = ? WHERE lease_id = ?")
            .bind(state.as_str())
            .bind(lease_id.to_string())
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn set_pid(
        &self,
        lease_id: &RuntimeLeaseId,
        pid: Option<i32>,
    ) -> Result<(), GenericRepoError> {
        let result = sqlx::query("UPDATE backend_runtime_leases SET pid = ? WHERE lease_id = ?")
            .bind(pid)
            .bind(lease_id.to_string())
            .execute(&self.pool)
            .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn record_released(
        &self,
        lease_id: &RuntimeLeaseId,
        released_at: i64,
    ) -> Result<(), GenericRepoError> {
        let result = sqlx::query(
            "UPDATE backend_runtime_leases
             SET state = 'released', released_at = ?
             WHERE lease_id = ?",
        )
        .bind(released_at)
        .bind(lease_id.to_string())
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn record_failed(
        &self,
        lease_id: &RuntimeLeaseId,
        category: PipelineFailureCategory,
        released_at: i64,
    ) -> Result<(), GenericRepoError> {
        let result = sqlx::query(
            "UPDATE backend_runtime_leases
             SET state = 'released',
                 last_failure_category = ?,
                 released_at = ?
             WHERE lease_id = ?",
        )
        .bind(category.to_wire())
        .bind(released_at)
        .bind(lease_id.to_string())
        .execute(&self.pool)
        .await?;
        if result.rows_affected() == 0 {
            return Err(GenericRepoError::NotFound);
        }
        Ok(())
    }

    async fn flip_non_terminal_to_released(
        &self,
        released_at: i64,
    ) -> Result<u64, GenericRepoError> {
        let result = sqlx::query(
            "UPDATE backend_runtime_leases
             SET state = 'released',
                 crash_recovered = 1,
                 released_at = ?
             WHERE state NOT IN ('released','failed')",
        )
        .bind(released_at)
        .execute(&self.pool)
        .await?;
        Ok(result.rows_affected())
    }
}
