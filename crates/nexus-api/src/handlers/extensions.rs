use axum::extract::{Path, State};
use tracing::{info, warn};

use nexus_events::bus::EventBus;
use nexus_events::types::NexusEvent;
use nexus_extension::storage::plan::{
    AppliedMigrationInfo, MigrationAction, PlanAction, build_plan,
};
use nexus_extension::{ActivatedExtension, DiscoveryReport, ExtensionRegistry};
use nexus_storage::Database;
use nexus_storage::storage_manager::MigrationInput;

use crate::AppState;
use crate::dto::{
    EnableExtensionResponseDto, ExtensionDto, ExtensionRevealDto, ListResponseDto, OperatorDto,
    RefreshReportDto,
};
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn list_extensions(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<ExtensionDto>>, ApiError> {
    let extensions = state
        .db
        .list_extensions()
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    let items = extensions.iter().map(ExtensionDto::from).collect();
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_extension(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<ExtensionDto>, ApiError> {
    let record = state
        .db
        .get_extension(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    Ok(ApiResponse::ok(ExtensionDto::from(&record)))
}

pub async fn reveal_extension_folder(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<ExtensionRevealDto>, ApiError> {
    let record = state
        .db
        .get_extension(&id)
        .await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;

    let path = record.directory.clone();
    if path.is_empty() {
        return Ok(ApiResponse::ok(ExtensionRevealDto {
            revealed: false,
            path,
            message: Some("extension has no recorded source path".to_owned()),
        }));
    }
    if !std::path::Path::new(&path).exists() {
        return Ok(ApiResponse::ok(ExtensionRevealDto {
            revealed: false,
            path,
            message: Some("path does not exist on disk".to_owned()),
        }));
    }

    #[cfg(target_os = "windows")]
    let reveal_result = std::process::Command::new("explorer").arg(&path).spawn();
    #[cfg(target_os = "macos")]
    let reveal_result = std::process::Command::new("open").arg(&path).spawn();
    #[cfg(all(unix, not(target_os = "macos")))]
    let reveal_result = std::process::Command::new("xdg-open").arg(&path).spawn();

    match reveal_result {
        Ok(_) => Ok(ApiResponse::ok(ExtensionRevealDto {
            revealed: true,
            path,
            message: None,
        })),
        Err(e) => {
            warn!(extension_id = %id, error = %e, "reveal_extension_folder failed");
            Ok(ApiResponse::ok(ExtensionRevealDto {
                revealed: false,
                path,
                message: Some(e.to_string()),
            }))
        }
    }
}

pub async fn list_operators(
    State(state): State<AppState>,
) -> Result<ApiResponse<ListResponseDto<OperatorDto>>, ApiError> {
    let extensions = state.extension_registry.list_extensions();
    let mut items: Vec<OperatorDto> = Vec::new();
    for ext in &extensions {
        let ext_id = &ext.manifest.extension.id;
        for def in &ext.operators {
            items.push(OperatorDto::from_definition(def, ext_id));
        }
    }
    Ok(ApiResponse::ok(ListResponseDto { items }))
}

pub async fn get_operator(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<OperatorDto>, ApiError> {
    let extensions = state.extension_registry.list_extensions();
    for ext in &extensions {
        let ext_id = &ext.manifest.extension.id;
        for def in &ext.operators {
            if def.operator.id == id {
                return Ok(ApiResponse::ok(OperatorDto::from_definition(def, ext_id)));
            }
        }
    }
    Err(ApiError::NotFound(format!("operator {id} not found")))
}

pub async fn refresh_extensions(
    State(state): State<AppState>,
) -> Result<ApiResponse<RefreshReportDto>, ApiError> {
    let host_version =
        semver::Version::parse("0.1.0").map_err(|e| ApiError::Internal(e.to_string()))?;
    let protocol_version =
        semver::Version::parse("0.1.0").map_err(|e| ApiError::Internal(e.to_string()))?;

    let extensions_dir = state
        .extensions_dir
        .clone()
        .ok_or_else(|| ApiError::Internal("extensions directory not configured".to_owned()))?;

    let report = state
        .extension_registry
        .refresh(&extensions_dir, &host_version, &protocol_version)
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    emit_discovery_events(&state.event_bus, &report);
    persist_discovered_extensions(&state).await?;

    Ok(ApiResponse::ok(RefreshReportDto {
        activated: report.activated.clone(),
        invalid: report.invalid.clone(),
    }))
}

pub async fn enable_extension(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<EnableExtensionResponseDto>, ApiError> {
    state
        .extension_registry
        .enable_extension(&id)
        .map_err(|e| ApiError::InvalidState(e.to_string()))?;

    state
        .db
        .update_extension_status(&id, "active")
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    state.event_bus.publish(NexusEvent::ExtensionActivated {
        extension_id: id.clone(),
    });

    Ok(ApiResponse::ok(EnableExtensionResponseDto {
        id,
        status: "active".to_owned(),
    }))
}

pub async fn disable_extension(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<ApiResponse<EnableExtensionResponseDto>, ApiError> {
    state
        .extension_registry
        .disable_extension(&id)
        .map_err(|e| ApiError::InvalidState(e.to_string()))?;

    state
        .db
        .update_extension_status(&id, "disabled")
        .await
        .map_err(|e| ApiError::Internal(e.to_string()))?;

    state.event_bus.publish(NexusEvent::ExtensionDisabled {
        extension_id: id.clone(),
    });

    Ok(ApiResponse::ok(EnableExtensionResponseDto {
        id,
        status: "disabled".to_owned(),
    }))
}

fn emit_discovery_events(event_bus: &std::sync::Arc<dyn EventBus>, report: &DiscoveryReport) {
    for ext_id in &report.activated {
        event_bus.publish(NexusEvent::ExtensionDiscovered {
            extension_id: ext_id.clone(),
        });
        event_bus.publish(NexusEvent::ExtensionValidated {
            extension_id: ext_id.clone(),
            valid: true,
        });
        event_bus.publish(NexusEvent::ExtensionActivated {
            extension_id: ext_id.clone(),
        });
    }

    for (dir_name, _reason) in &report.invalid {
        event_bus.publish(NexusEvent::ExtensionDiscovered {
            extension_id: dir_name.clone(),
        });
        event_bus.publish(NexusEvent::ExtensionValidated {
            extension_id: dir_name.clone(),
            valid: false,
        });
    }
}

async fn persist_discovered_extensions(state: &AppState) -> Result<(), ApiError> {
    let activated = state.extension_registry.list_extensions();

    for ext in &activated {
        let record = crate::mapping::extension_to_record(ext);
        let insert_result = state.db.insert_extension(&record).await;
        if insert_result.is_err() {
            state
                .db
                .update_extension_status(&record.id, &record.status)
                .await
                .map_err(|e| ApiError::Internal(e.to_string()))?;
        }

        crate::mapping::persist_recipes_for_extension(state, ext).await?;
        crate::mapping::persist_ui_contributions_for_extension(state, ext).await?;

        if ext.storage.is_some()
            && ext.validation_errors.is_empty()
            && state.storage_manager.is_some()
            && let Err(e) = apply_storage_for_extension(state, ext).await
        {
            warn!(
                extension_id = %ext.manifest.extension.id,
                error = %e,
                "storage apply failed, disabling extension"
            );
            let _ = state
                .db
                .update_extension_status(&ext.manifest.extension.id, "disabled")
                .await;
        }
    }

    Ok(())
}

async fn apply_storage_for_extension(
    state: &AppState,
    ext: &ActivatedExtension,
) -> Result<(), ApiError> {
    let storage = ext
        .storage
        .as_ref()
        .ok_or_else(|| ApiError::Internal("no storage contribution".to_owned()))?;
    let storage_manager = state
        .storage_manager
        .as_ref()
        .ok_or_else(|| ApiError::Internal("storage manager not available".to_owned()))?;

    let ext_id = &ext.manifest.extension.id;
    let ext_version = &ext.manifest.extension.version;
    let ext_root = &ext.directory;

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

    let plan = build_plan(ext_id, ext_version, ext_root, storage, &applied_migrations)
        .map_err(|errs| ApiError::Internal(format!("storage plan errors: {}", errs.join("; "))))?;

    state.event_bus.publish(NexusEvent::StoragePlanReady {
        extension_id: ext_id.clone(),
        action: plan.action.as_str().to_owned(),
    });

    match plan.action {
        PlanAction::Noop => {
            info!(extension_id = %ext_id, "storage plan: noop");
        }
        PlanAction::NewInstall | PlanAction::Upgrade => {
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

                    state
                        .event_bus
                        .publish(NexusEvent::StorageNamespaceReserved {
                            extension_id: ext_id.clone(),
                            namespace_id: ns_id.clone(),
                            effective_prefix: plan.effective_prefix.clone(),
                        });

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

            if !migration_inputs.is_empty() {
                state.event_bus.publish(NexusEvent::StorageApplyStarted {
                    extension_id: ext_id.clone(),
                    namespace_id: namespace_id.clone(),
                });

                match storage_manager
                    .apply_plan(&namespace_id, plan.action.as_str(), &migration_inputs)
                    .await
                {
                    Ok(report) => {
                        info!(
                            extension_id = %ext_id,
                            migrations_applied = report.migrations_applied,
                            objects_created = report.objects_created,
                            "storage apply succeeded"
                        );
                    }
                    Err(e) => {
                        state.event_bus.publish(NexusEvent::StorageApplyFailed {
                            extension_id: ext_id.clone(),
                            namespace_id: namespace_id.clone(),
                            error: e.to_string(),
                        });
                        return Err(ApiError::Internal(e.to_string()));
                    }
                }
            }
        }
    }

    Ok(())
}
