//! `GET /api/v1/backend-runtime-leases` (T085). Lists lease rows with
//! optional filters: `runtime_install_id`, `owner_kind`, `state`,
//! `live_only` (default `true`). Data comes from the SQLite leases
//! repo; the in-memory `LeaseManager` authoritatively owns live
//! handles, but historical / released rows need the persistent view.

use std::str::FromStr;

use axum::extract::{Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::{Deserialize, Serialize};
use sqlx::Row;

use nexus_backend_runtimes::generic::ids::RuntimeInstallId;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize, Default)]
pub struct ListParams {
    pub runtime_install_id: Option<String>,
    pub owner_kind: Option<String>,
    pub state: Option<String>,
    #[serde(default = "default_live_only")]
    pub live_only: bool,
}

fn default_live_only() -> bool {
    true
}

#[derive(Debug, Serialize)]
pub struct LeaseDto {
    pub lease_id: String,
    pub runtime_install_id: String,
    pub owner_kind: String,
    pub owner_ref: String,
    pub transport: String,
    pub pid: Option<i32>,
    pub state: String,
    pub crash_recovered: bool,
    pub last_failure_category: Option<String>,
    pub acquired_at: i64,
    pub released_at: Option<i64>,
}

#[derive(Debug, Serialize)]
pub struct LeasesListResponse {
    pub leases: Vec<LeaseDto>,
}

pub async fn list(
    State(state): State<AppState>,
    Query(params): Query<ListParams>,
) -> axum::response::Response {
    // Validate path-bindable parameters early so we fail fast with 400
    // instead of returning an empty list.
    if let Some(id) = &params.runtime_install_id
        && RuntimeInstallId::from_str(id).is_err()
    {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "invalid_install_id",
            "bad_request",
            format!("`{id}` is not a valid ULID"),
        )
        .into_response();
    }

    // Single parameterised query — filters applied conditionally via
    // COALESCE-style `IS NULL OR = ?`. Keeps the query plan stable.
    let rows = sqlx::query(
        r#"
        SELECT lease_id, runtime_install_id, owner_kind, owner_ref,
               transport, pid, state, crash_recovered,
               last_failure_category, acquired_at, released_at
        FROM backend_runtime_leases
        WHERE (? IS NULL OR runtime_install_id = ?)
          AND (? IS NULL OR owner_kind = ?)
          AND (? IS NULL OR state = ?)
          AND (? = 0 OR state NOT IN ('released','failed'))
        ORDER BY acquired_at DESC
        "#,
    )
    .bind(params.runtime_install_id.as_deref())
    .bind(params.runtime_install_id.as_deref())
    .bind(params.owner_kind.as_deref())
    .bind(params.owner_kind.as_deref())
    .bind(params.state.as_deref())
    .bind(params.state.as_deref())
    .bind(if params.live_only { 1_i64 } else { 0_i64 })
    .fetch_all(state.db.pool())
    .await;

    let rows = match rows {
        Ok(r) => r,
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::INTERNAL_SERVER_ERROR,
                "leases_storage_error",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };

    let mut leases = Vec::with_capacity(rows.len());
    for row in rows {
        let crash_recovered: i64 = row.try_get("crash_recovered").unwrap_or(0);
        leases.push(LeaseDto {
            lease_id: row.try_get("lease_id").unwrap_or_default(),
            runtime_install_id: row.try_get("runtime_install_id").unwrap_or_default(),
            owner_kind: row.try_get("owner_kind").unwrap_or_default(),
            owner_ref: row.try_get("owner_ref").unwrap_or_default(),
            transport: row.try_get("transport").unwrap_or_default(),
            pid: row.try_get("pid").ok(),
            state: row.try_get("state").unwrap_or_default(),
            crash_recovered: crash_recovered != 0,
            last_failure_category: row.try_get("last_failure_category").ok(),
            acquired_at: row.try_get("acquired_at").unwrap_or(0),
            released_at: row.try_get("released_at").ok(),
        });
    }

    ApiResponse::ok(LeasesListResponse { leases }).into_response()
}
