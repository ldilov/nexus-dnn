use sqlx::{Row, SqlitePool};

use crate::error::RuntimeAdapterError;
use crate::manifest::install::{InstallManifest, InstallStatus};
use crate::settings::AcceleratorProfile;

fn storage(e: sqlx::Error) -> RuntimeAdapterError {
    RuntimeAdapterError::Storage(e.to_string())
}

// SQLite surfaces "no such table" as a generic database error rather than a
// dedicated error kind. Match on the text so the llama.cpp adapter can
fn is_missing_table_error(e: &sqlx::Error) -> bool {
    let msg = e.to_string();
    msg.contains("no such table") || msg.contains("ext_local_llm_runtime_installs")
}

// Idempotent CREATE TABLE — runs before every write so the Install button
// works on a fresh DB where the extension's own migration hasn't applied
async fn ensure_legacy_tables(pool: &SqlitePool) -> Result<(), RuntimeAdapterError> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS ext_local_llm_runtime_installs (
            runtime_install_id     TEXT PRIMARY KEY,
            backend                TEXT NOT NULL,
            release_id             TEXT NOT NULL,
            platform               TEXT NOT NULL,
            accelerator_profile    TEXT NOT NULL,
            source_url             TEXT,
            checksum_sha256        TEXT,
            install_path           TEXT NOT NULL,
            binary_path            TEXT,
            status                 TEXT NOT NULL,
            installed_at           INTEGER,
            validated_at           INTEGER,
            last_failure_category  TEXT,
            created_at             INTEGER NOT NULL,
            updated_at             INTEGER NOT NULL,
            UNIQUE(backend, release_id, platform, accelerator_profile)
        )",
    )
    .execute(pool)
    .await
    .map_err(storage)?;
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS ext_local_llm_backend_state_log (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            install_id    TEXT NOT NULL,
            from_state    TEXT,
            to_state      TEXT NOT NULL,
            trigger       TEXT NOT NULL,
            detail        TEXT,
            occurred_at   TEXT NOT NULL
        )",
    )
    .execute(pool)
    .await
    .map_err(storage)?;
    Ok(())
}

fn now_ms() -> i64 {
    chrono::Utc::now().timestamp_millis()
}

fn status_wire(status: InstallStatus) -> &'static str {
    match status {
        InstallStatus::InstalledUnvalidated => "installed_unvalidated",
        InstallStatus::Ready => "ready",
        InstallStatus::Broken => "broken",
        InstallStatus::Updating => "updating",
    }
}

fn status_from_wire(raw: &str) -> Option<InstallStatus> {
    match raw {
        "installed_unvalidated" => Some(InstallStatus::InstalledUnvalidated),
        "ready" => Some(InstallStatus::Ready),
        "broken" => Some(InstallStatus::Broken),
        "updating" => Some(InstallStatus::Updating),
        _ => None,
    }
}

fn profile_wire(p: AcceleratorProfile) -> &'static str {
    p.as_wire()
}

fn profile_from_wire(raw: &str) -> Option<AcceleratorProfile> {
    match raw {
        "cpu" => Some(AcceleratorProfile::Cpu),
        "vulkan" => Some(AcceleratorProfile::Vulkan),
        "cuda12" => Some(AcceleratorProfile::Cuda12),
        "cuda13" => Some(AcceleratorProfile::Cuda13),
        _ => None,
    }
}

pub async fn upsert(
    pool: &SqlitePool,
    manifest: &InstallManifest,
) -> Result<(), RuntimeAdapterError> {
    ensure_legacy_tables(pool).await?;
    let now = now_ms();
    sqlx::query(
        "INSERT INTO ext_local_llm_runtime_installs
            (runtime_install_id, backend, release_id, platform, accelerator_profile, source_url,
             checksum_sha256, install_path, binary_path, status, installed_at, validated_at,
             last_failure_category, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$14)
         ON CONFLICT(backend, release_id, platform, accelerator_profile) DO UPDATE SET
             source_url            = excluded.source_url,
             checksum_sha256       = excluded.checksum_sha256,
             install_path          = excluded.install_path,
             binary_path           = excluded.binary_path,
             status                = excluded.status,
             installed_at          = excluded.installed_at,
             validated_at          = excluded.validated_at,
             last_failure_category = excluded.last_failure_category,
             updated_at            = excluded.updated_at",
    )
    .bind(&manifest.runtime_install_id)
    .bind(&manifest.backend)
    .bind(&manifest.release_id)
    .bind(&manifest.platform)
    .bind(profile_wire(manifest.accelerator_profile))
    .bind(&manifest.source_url)
    .bind(&manifest.checksum_sha256)
    .bind(&manifest.install_path)
    .bind(&manifest.binary_path)
    .bind(status_wire(manifest.status))
    .bind(manifest.installed_at)
    .bind(manifest.validated_at)
    .bind(&manifest.last_failure_category)
    .bind(now)
    .execute(pool)
    .await
    .map_err(storage)?;
    Ok(())
}

pub async fn append_state_log(
    pool: &SqlitePool,
    install_id: &str,
    from_state: Option<&str>,
    to_state: &str,
    trigger: &str,
    detail: Option<&str>,
) -> Result<(), RuntimeAdapterError> {
    ensure_legacy_tables(pool).await?;
    let occurred_at = chrono::Utc::now().to_rfc3339();
    sqlx::query(
        "INSERT INTO ext_local_llm_backend_state_log \
         (install_id, from_state, to_state, trigger, detail, occurred_at) \
         VALUES ($1, $2, $3, $4, $5, $6)",
    )
    .bind(install_id)
    .bind(from_state)
    .bind(to_state)
    .bind(trigger)
    .bind(detail)
    .bind(&occurred_at)
    .execute(pool)
    .await
    .map_err(storage)?;
    Ok(())
}

pub async fn update_status(
    pool: &SqlitePool,
    runtime_install_id: &str,
    status: InstallStatus,
    last_failure_category: Option<String>,
) -> Result<(), RuntimeAdapterError> {
    ensure_legacy_tables(pool).await?;
    let now = now_ms();
    let validated_at = if matches!(status, InstallStatus::Ready) {
        Some(now)
    } else {
        None
    };
    sqlx::query(
        "UPDATE ext_local_llm_runtime_installs
         SET status = $1, validated_at = COALESCE($2, validated_at),
             last_failure_category = $3, updated_at = $4
         WHERE runtime_install_id = $5",
    )
    .bind(status_wire(status))
    .bind(validated_at)
    .bind(&last_failure_category)
    .bind(now)
    .bind(runtime_install_id)
    .execute(pool)
    .await
    .map_err(storage)?;
    Ok(())
}

pub async fn load_latest(
    pool: &SqlitePool,
    backend: &str,
) -> Result<Option<InstallManifest>, RuntimeAdapterError> {
    // The `ext_local_llm_runtime_installs` table is created by the Local Chat
    // extension's own migrations (spec 007, migration 004_runtime_installs).
    let result = sqlx::query(
        "SELECT runtime_install_id, backend, release_id, platform, accelerator_profile, source_url,
                checksum_sha256, install_path, binary_path, status, installed_at, validated_at,
                last_failure_category
         FROM ext_local_llm_runtime_installs
         WHERE backend = $1
         ORDER BY updated_at DESC
         LIMIT 1",
    )
    .bind(backend)
    .fetch_optional(pool)
    .await;
    let row = match result {
        Ok(r) => r,
        Err(e) if is_missing_table_error(&e) => return Ok(None),
        Err(e) => return Err(storage(e)),
    };
    let Some(row) = row else { return Ok(None) };
    let profile_raw: String = row.try_get("accelerator_profile").map_err(storage)?;
    let status_raw: String = row.try_get("status").map_err(storage)?;
    Ok(Some(InstallManifest {
        runtime_install_id: row.try_get("runtime_install_id").map_err(storage)?,
        backend: row.try_get("backend").map_err(storage)?,
        release_id: row.try_get("release_id").map_err(storage)?,
        platform: row.try_get("platform").map_err(storage)?,
        accelerator_profile: profile_from_wire(&profile_raw).ok_or_else(|| {
            RuntimeAdapterError::Storage(format!("unknown profile {profile_raw}"))
        })?,
        source_url: row.try_get("source_url").map_err(storage)?,
        checksum_sha256: row.try_get("checksum_sha256").map_err(storage)?,
        install_path: row.try_get("install_path").map_err(storage)?,
        binary_path: row.try_get("binary_path").map_err(storage)?,
        status: status_from_wire(&status_raw)
            .ok_or_else(|| RuntimeAdapterError::Storage(format!("unknown status {status_raw}")))?,
        installed_at: row.try_get("installed_at").map_err(storage)?,
        validated_at: row.try_get("validated_at").map_err(storage)?,
        last_failure_category: row.try_get("last_failure_category").map_err(storage)?,
    }))
}
