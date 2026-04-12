use axum::Json;
use axum::extract::{Path, State};
use serde::Deserialize;

use nexus_extension::ExtensionRegistry;
use nexus_extension::storage::plan::{
    AppliedMigrationInfo, MigrationAction, PlanAction, build_plan,
};
use nexus_storage::Database;
use nexus_storage::storage_manager::MigrationInput;

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
            ApiError::NotFound(format!("no storage namespace for extension {extension_id}"))
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

    let ext = state
        .extension_registry
        .get_extension(&extension_id)
        .ok_or_else(|| ApiError::NotFound(format!("extension {extension_id} not found")))?;

    let storage = ext
        .storage
        .as_ref()
        .ok_or_else(|| {
            ApiError::NotFound(format!(
                "extension {extension_id} has no storage contribution"
            ))
        })?;

    let effective_prefix = storage.effective_prefix();
    let mut static_errors = Vec::new();
    let mut statements_checked = 0;
    let mut objects_found = 0;
    let mut expanded_sqls = Vec::new();

    for file_ref in &storage.migrations.files {
        let file_path = ext.directory.join(&file_ref.path);
        let raw_sql = match std::fs::read_to_string(&file_path) {
            Ok(content) => content,
            Err(e) => {
                static_errors.push(format!(
                    "cannot read {}: {e}",
                    file_path.display()
                ));
                continue;
            }
        };

        let expanded = nexus_extension::storage::sql_validator::expand_prefix(
            &raw_sql,
            &effective_prefix,
        );
        let report = nexus_extension::storage::sql_validator::validate_sql(
            &expanded,
            &effective_prefix,
        );

        statements_checked += report.statements_checked;
        objects_found += report.objects.len();

        for err in &report.errors {
            static_errors.push(format!("migration '{}': {err}", file_ref.id));
        }

        expanded_sqls.push(expanded);
    }

    let dry_run_result = storage_manager.validate_dry_run(&expanded_sqls).await;

    let dry_run_report = match dry_run_result {
        Ok(()) => serde_json::json!({ "errors": [] }),
        Err(ref e) => serde_json::json!({ "errors": [e.to_string()] }),
    };

    let valid = static_errors.is_empty() && dry_run_result.is_ok();

    Ok(ApiResponse::ok(serde_json::json!({
        "valid": valid,
        "static_report": {
            "statements_checked": statements_checked,
            "objects_found": objects_found,
            "warnings": static_errors,
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

    let ext = state
        .extension_registry
        .get_extension(&extension_id)
        .ok_or_else(|| ApiError::NotFound(format!("extension {extension_id} not found")))?;

    let storage = ext
        .storage
        .as_ref()
        .ok_or_else(|| {
            ApiError::NotFound(format!(
                "extension {extension_id} has no storage contribution"
            ))
        })?;

    let ext_id = &ext.manifest.extension.id;
    let ext_version = &ext.manifest.extension.version;

    let existing_ns = state
        .db
        .get_namespace_by_extension(ext_id)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let applied_migrations = match &existing_ns {
        Some(ns) => {
            let mig_records = state
                .db
                .list_migrations_for_namespace(&ns.id)
                .await
                .map_err(|e| ApiError::Internal(e.to_string()))?;
            mig_records
                .iter()
                .filter(|m| m.status == "applied")
                .map(|m| AppliedMigrationInfo {
                    migration_id: m.migration_id.clone(),
                    raw_checksum_sha256: m.raw_checksum_sha256.clone(),
                })
                .collect::<Vec<_>>()
        }
        None => Vec::new(),
    };

    let plan = build_plan(ext_id, ext_version, &ext.directory, storage, &applied_migrations)
        .map_err(|errs| ApiError::Internal(format!("plan errors: {}", errs.join("; "))))?;

    if matches!(plan.action, PlanAction::Noop) {
        let ns_id = existing_ns
            .as_ref()
            .map(|ns| ns.id.as_str())
            .unwrap_or("");
        return Ok(ApiResponse::ok(serde_json::json!({
            "namespace_id": ns_id,
            "action": "noop",
            "migrations_applied": 0,
            "objects_created": 0,
            "status": "active",
        })));
    }

    let namespace_id = match existing_ns {
        Some(ref ns) => ns.id.clone(),
        None => {
            let ns_id = format!("ns-{ext_id}");
            let uninstall_policy = storage
                .uninstall
                .as_ref()
                .and_then(|u| u.policy.clone())
                .unwrap_or_else(|| "retain".to_owned());

            let now = chrono::Utc::now().to_rfc3339();
            let ns_record = nexus_storage::NamespaceRecord {
                id: ns_id.clone(),
                extension_id: ext_id.clone(),
                extension_version_first_seen: ext_version.clone(),
                namespace_alias: plan.namespace_alias.clone(),
                effective_prefix: plan.effective_prefix.clone(),
                engine: storage.engine.clone(),
                storage_spec_version: storage.spec_version.clone(),
                sql_profile: storage.sql_profile.profile.clone(),
                status: "reserved".to_owned(),
                uninstall_policy,
                created_at: now.clone(),
                updated_at: now,
            };

            storage_manager
                .reserve_namespace(&ns_record)
                .await
                .map_err(|e| ApiError::Internal(e.to_string()))?;

            ns_id
        }
    };

    let migration_inputs: Vec<MigrationInput> = plan
        .migrations_to_apply
        .iter()
        .filter(|m| matches!(m.action, MigrationAction::Apply))
        .map(|m| {
            let objects = plan
                .expected_objects
                .iter()
                .filter(|o| o.created_by_migration_id == m.migration_id)
                .map(|o| nexus_storage::storage_manager::ObjectInput {
                    record_id: format!("obj-{}-{}", namespace_id, o.object_name),
                    object_name: o.object_name.clone(),
                    object_type: o.object_type.clone(),
                    migration_id: m.migration_id.clone(),
                })
                .collect();

            MigrationInput {
                record_id: format!("mig-{}-{}", namespace_id, m.migration_id),
                namespace_id: namespace_id.clone(),
                extension_id: ext_id.clone(),
                extension_version: ext_version.clone(),
                migration_id: m.migration_id.clone(),
                path: m.path.clone(),
                raw_checksum: m.raw_checksum.clone(),
                expanded_checksum: m.expanded_checksum.clone(),
                expanded_sql: m.expanded_sql.clone(),
                objects,
            }
        })
        .collect();

    let report = storage_manager
        .apply_plan(&namespace_id, plan.action.as_str(), &migration_inputs)
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    Ok(ApiResponse::ok(serde_json::json!({
        "namespace_id": report.namespace_id,
        "action": report.action,
        "migrations_applied": report.migrations_applied,
        "objects_created": report.objects_created,
        "status": report.status,
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
            ApiError::NotFound(format!("no storage namespace for extension {extension_id}"))
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
            ApiError::NotFound(format!("no storage namespace for extension {extension_id}"))
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
