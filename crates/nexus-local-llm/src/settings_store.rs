use sqlx::{Row, SqlitePool};

use crate::error::{RuntimeAdapterError, SettingsError};
use crate::settings::{PortMode, RuntimeSettings};

fn now_ms() -> i64 {
    chrono::Utc::now().timestamp_millis()
}

fn port_mode_wire(mode: PortMode) -> &'static str {
    match mode {
        PortMode::Auto => "auto",
        PortMode::Fixed => "fixed",
    }
}

fn port_mode_from_wire(raw: &str) -> Result<PortMode, SettingsError> {
    match raw {
        "auto" => Ok(PortMode::Auto),
        "fixed" => Ok(PortMode::Fixed),
        other => Err(SettingsError::Invalid(format!("unknown port_mode {other}"))),
    }
}

pub async fn load(pool: &SqlitePool, backend: &str) -> Result<Option<RuntimeSettings>, RuntimeAdapterError> {
    let row = sqlx::query(
        "SELECT runtime_settings_id, backend, install_ref, threads, threads_batch, default_context,
                parallel_requests, bind_address, port_mode, fixed_port, extra_args_json
         FROM ext_local_llm_runtime_settings WHERE backend = $1",
    )
    .bind(backend)
    .fetch_optional(pool)
    .await
    .map_err(|e| RuntimeAdapterError::Storage(e.to_string()))?;
    let Some(row) = row else {
        return Ok(None);
    };
    let extra_args_json: String = row.try_get("extra_args_json").map_err(storage)?;
    let extra_args: Vec<String> = serde_json::from_str(&extra_args_json)
        .map_err(|e| RuntimeAdapterError::Storage(format!("parse extra_args: {e}")))?;
    let port_mode_raw: String = row.try_get("port_mode").map_err(storage)?;
    let fixed_port_raw: Option<i64> = row.try_get("fixed_port").map_err(storage)?;
    Ok(Some(RuntimeSettings {
        backend: row.try_get::<String, _>("backend").map_err(storage)?,
        install_ref: row.try_get::<Option<String>, _>("install_ref").map_err(storage)?,
        threads: row.try_get::<i64, _>("threads").map_err(storage)? as u32,
        threads_batch: row.try_get::<i64, _>("threads_batch").map_err(storage)? as u32,
        default_context: row.try_get::<i64, _>("default_context").map_err(storage)? as u32,
        parallel_requests: row.try_get::<i64, _>("parallel_requests").map_err(storage)? as u32,
        bind_address: row.try_get::<String, _>("bind_address").map_err(storage)?,
        port_mode: port_mode_from_wire(&port_mode_raw)?,
        fixed_port: fixed_port_raw.map(|p| p as u16),
        extra_args,
    }))
}

pub async fn upsert(pool: &SqlitePool, settings: &RuntimeSettings) -> Result<String, RuntimeAdapterError> {
    settings.validate()?;
    let extra_args_json = serde_json::to_string(&settings.extra_args)
        .map_err(|e| RuntimeAdapterError::Storage(format!("serialize extra_args: {e}")))?;
    let now = now_ms();
    let id = format!("rts_{}", ulid::Ulid::new());
    sqlx::query(
        "INSERT INTO ext_local_llm_runtime_settings
            (runtime_settings_id, backend, install_ref, threads, threads_batch, default_context,
             parallel_requests, bind_address, port_mode, fixed_port, extra_args_json, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$12)
         ON CONFLICT(backend) DO UPDATE SET
            install_ref      = excluded.install_ref,
            threads          = excluded.threads,
            threads_batch    = excluded.threads_batch,
            default_context  = excluded.default_context,
            parallel_requests= excluded.parallel_requests,
            bind_address     = excluded.bind_address,
            port_mode        = excluded.port_mode,
            fixed_port       = excluded.fixed_port,
            extra_args_json  = excluded.extra_args_json,
            updated_at       = excluded.updated_at",
    )
    .bind(&id)
    .bind(&settings.backend)
    .bind(&settings.install_ref)
    .bind(settings.threads as i64)
    .bind(settings.threads_batch as i64)
    .bind(settings.default_context as i64)
    .bind(settings.parallel_requests as i64)
    .bind(&settings.bind_address)
    .bind(port_mode_wire(settings.port_mode))
    .bind(settings.fixed_port.map(|p| p as i64))
    .bind(&extra_args_json)
    .bind(now)
    .execute(pool)
    .await
    .map_err(|e| RuntimeAdapterError::Storage(e.to_string()))?;
    Ok(id)
}

fn storage(e: sqlx::Error) -> RuntimeAdapterError {
    RuntimeAdapterError::Storage(e.to_string())
}
