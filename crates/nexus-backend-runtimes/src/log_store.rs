use sqlx::{Row, SqlitePool};

use crate::error::RuntimeAdapterError;
use crate::log_pipeline::RuntimeLogLine;

fn storage(e: sqlx::Error) -> RuntimeAdapterError {
    RuntimeAdapterError::Storage(e.to_string())
}

pub async fn append(pool: &SqlitePool, line: &RuntimeLogLine) -> Result<(), RuntimeAdapterError> {
    sqlx::query(
        "INSERT INTO ext_local_llm_runtime_logs
            (timestamp, source, runtime_id, deployment_id, severity, namespace, message)
         VALUES ($1,$2,$3,$4,$5,$6,$7)",
    )
    .bind(line.timestamp)
    .bind(&line.source)
    .bind(&line.runtime_id)
    .bind(&line.deployment_id)
    .bind(&line.severity)
    .bind(&line.namespace)
    .bind(&line.message)
    .execute(pool)
    .await
    .map_err(storage)?;
    Ok(())
}

#[derive(Debug, Default, Clone)]
pub struct LogQuery {
    pub source: Option<String>,
    pub severity: Option<String>,
    pub since: Option<i64>,
    pub until: Option<i64>,
    pub limit: u32,
}

pub async fn fetch(
    pool: &SqlitePool,
    query: &LogQuery,
) -> Result<Vec<RuntimeLogLine>, RuntimeAdapterError> {
    let limit = query.limit.clamp(1, 5000) as i64;
    let rows = sqlx::query(
        "SELECT timestamp, source, runtime_id, deployment_id, severity, namespace, message
         FROM ext_local_llm_runtime_logs
         WHERE ($1 IS NULL OR source = $1)
           AND ($2 IS NULL OR severity = $2)
           AND ($3 IS NULL OR timestamp >= $3)
           AND ($4 IS NULL OR timestamp <= $4)
         ORDER BY timestamp DESC
         LIMIT $5",
    )
    .bind(&query.source)
    .bind(&query.severity)
    .bind(query.since)
    .bind(query.until)
    .bind(limit)
    .fetch_all(pool)
    .await
    .map_err(storage)?;
    Ok(rows
        .into_iter()
        .map(|row| RuntimeLogLine {
            timestamp: row.try_get("timestamp").unwrap_or_default(),
            source: row.try_get("source").unwrap_or_default(),
            runtime_id: row.try_get("runtime_id").ok().flatten(),
            deployment_id: row.try_get("deployment_id").ok().flatten(),
            severity: row.try_get("severity").unwrap_or_default(),
            namespace: row.try_get("namespace").unwrap_or_default(),
            message: row.try_get("message").unwrap_or_default(),
        })
        .collect())
}
