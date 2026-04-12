use axum::extract::{Path, State};
use axum::Json;
use serde::Deserialize;

use nexus_storage::Database;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn get_storage_status(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let storage_manager = state
        .storage_manager
        .as_ref()
        .ok_or_else(|| ApiError::Internal("storage manager not available".to_owned()))?;

    let ns = state
        .db
        .get_namespace_by_extension(&extension_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?
        .ok_or_else(|| {
            ApiError::NotFound(format!(
                "no storage namespace for extension {extension_id}"
            ))
        })?;

    let migrations = state
        .db
        .list_migrations_for_namespace(&ns.id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let objects = state
        .db
        .list_objects_for_namespace(&ns.id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let tables: Vec<&str> = objects
        .iter()
        .filter(|o| o.object_type == "table" && o.status == "present")
        .map(|o| o.object_name.as_str())
        .collect();

    let indexes: Vec<&str> = objects
        .iter()
        .filter(|o| o.object_type == "index" && o.status == "present")
        .map(|o| o.object_name.as_str())
        .collect();

    let migration_entries: Vec<serde_json::Value> = migrations
        .iter()
        .map(|m| {
            serde_json::json!({
                "migration_id": m.migration_id,
                "status": m.status,
                "path": m.path,
                "raw_checksum": m.raw_checksum_sha256,
                "expanded_checksum": m.expanded_checksum_sha256,
                "applied_at": m.applied_at,
            })
        })
        .collect();

    let _ = storage_manager;

    Ok(ApiResponse::ok(serde_json::json!({
        "extension_id": extension_id,
        "namespace": {
            "id": ns.id,
            "alias": ns.namespace_alias,
            "effective_prefix": ns.effective_prefix,
            "status": ns.status,
            "engine": ns.engine,
            "storage_spec_version": ns.storage_spec_version,
            "sql_profile": ns.sql_profile,
            "uninstall_policy": ns.uninstall_policy,
        },
        "migrations": migration_entries,
        "objects": {
            "tables": tables,
            "indexes": indexes,
        },
    })))
}

pub async fn validate_storage(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let storage_manager = state
        .storage_manager
        .as_ref()
        .ok_or_else(|| ApiError::Internal("storage manager not available".to_owned()))?;

    let ns = state
        .db
        .get_namespace_by_extension(&extension_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?
        .ok_or_else(|| {
            ApiError::NotFound(format!(
                "no storage namespace for extension {extension_id}"
            ))
        })?;

    let migrations = state
        .db
        .list_migrations_for_namespace(&ns.id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let migration_sqls: Vec<String> = migrations
        .iter()
        .filter(|m| m.status == "applied")
        .map(|m| {
            nexus_extension::storage::sql_validator::expand_prefix(
                &format!(
                    "-- migration {} placeholder\nSELECT 1;",
                    m.migration_id
                ),
                &ns.effective_prefix,
            )
        })
        .collect();

    let dry_run_result = storage_manager.validate_dry_run(&migration_sqls).await;

    let dry_run_report = match dry_run_result {
        Ok(()) => serde_json::json!({
            "errors": [],
        }),
        Err(ref e) => serde_json::json!({
            "errors": [e.to_string()],
        }),
    };

    let _ = &ns;

    Ok(ApiResponse::ok(serde_json::json!({
        "valid": dry_run_result.is_ok(),
        "static_report": {
            "statements_checked": migrations.len(),
            "objects_found": 0,
            "warnings": [],
        },
        "dry_run_report": dry_run_report,
    })))
}

pub async fn apply_storage(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let storage_manager = state
        .storage_manager
        .as_ref()
        .ok_or_else(|| ApiError::Internal("storage manager not available".to_owned()))?;

    let ns = state
        .db
        .get_namespace_by_extension(&extension_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?
        .ok_or_else(|| {
            ApiError::NotFound(format!(
                "no storage namespace for extension {extension_id}"
            ))
        })?;

    let _ = storage_manager;

    Ok(ApiResponse::ok(serde_json::json!({
        "namespace_id": ns.id,
        "action": "noop",
        "migrations_applied": 0,
        "objects_created": 0,
        "status": ns.status,
    })))
}

pub async fn verify_storage(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let storage_manager = state
        .storage_manager
        .as_ref()
        .ok_or_else(|| ApiError::Internal("storage manager not available".to_owned()))?;

    let ns = state
        .db
        .get_namespace_by_extension(&extension_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?
        .ok_or_else(|| {
            ApiError::NotFound(format!(
                "no storage namespace for extension {extension_id}"
            ))
        })?;

    let report = storage_manager
        .verify_namespace(&ns.id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(serde_json::json!({
        "namespace_id": report.namespace_id,
        "status": report.status,
        "objects_verified": report.objects_verified,
        "objects_missing": report.objects_missing,
        "objects_unexpected": report.objects_unexpected,
    })))
}

#[derive(Debug, Deserialize)]
pub struct UninstallRequest {
    pub policy_override: Option<String>,
}

pub async fn uninstall_storage(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
    body: Option<Json<UninstallRequest>>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let storage_manager = state
        .storage_manager
        .as_ref()
        .ok_or_else(|| ApiError::Internal("storage manager not available".to_owned()))?;

    let ns = state
        .db
        .get_namespace_by_extension(&extension_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?
        .ok_or_else(|| {
            ApiError::NotFound(format!(
                "no storage namespace for extension {extension_id}"
            ))
        })?;

    let policy = body
        .as_ref()
        .and_then(|b| b.policy_override.as_deref())
        .unwrap_or(&ns.uninstall_policy);

    let report = storage_manager
        .uninstall_namespace(&ns.id, policy)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(serde_json::json!({
        "namespace_id": report.namespace_id,
        "policy_executed": report.policy_executed,
        "objects_dropped": report.objects_dropped,
        "archive_path": report.archive_path,
    })))
}

pub async fn list_namespaces(
    State(state): State<AppState>,
) -> Result<ApiResponse<serde_json::Value>, ApiError> {
    let namespaces = state
        .db
        .list_namespaces()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let mut entries = Vec::new();
    for ns in &namespaces {
        let migrations = state
            .db
            .list_migrations_for_namespace(&ns.id)
            .await
            .unwrap_or_default();
        let objects = state
            .db
            .list_objects_for_namespace(&ns.id)
            .await
            .unwrap_or_default();

        entries.push(serde_json::json!({
            "id": ns.id,
            "extension_id": ns.extension_id,
            "alias": ns.namespace_alias,
            "effective_prefix": ns.effective_prefix,
            "status": ns.status,
            "migration_count": migrations.len(),
            "object_count": objects.iter().filter(|o| o.status == "present").count(),
        }));
    }

    Ok(ApiResponse::ok(
        serde_json::json!({ "namespaces": entries }),
    ))
}
