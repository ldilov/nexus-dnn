use sqlx::SqliteExecutor;

use crate::error::BackendRuntimeResult;
use crate::state::{InstallState, TransitionTrigger};

pub async fn append<'e, E: SqliteExecutor<'e>>(
    executor: E,
    install_id: &str,
    from_state: Option<InstallState>,
    to_state: InstallState,
    trigger: TransitionTrigger,
    detail: Option<&str>,
) -> BackendRuntimeResult<()> {
    let occurred_at = chrono::Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO host_runtime_state_log \
         (install_id, from_state, to_state, trigger, detail, occurred_at) \
         VALUES ($1, $2, $3, $4, $5, $6)",
    )
    .bind(install_id)
    .bind(from_state.map(|s| s.as_str()))
    .bind(to_state.as_str())
    .bind(trigger.as_str())
    .bind(detail)
    .bind(&occurred_at)
    .execute(executor)
    .await?;
    Ok(())
}
