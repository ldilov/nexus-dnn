use crate::AppState;
use crate::envelope::ApiResponse;
use axum::Json;
use axum::Router;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::{get, post};
use nexus_deployments::DeploymentRepository;
use nexus_deployments::id::{DeploymentId, DeploymentRevisionId};
use nexus_deployments::repository::{ListFilter, MetadataPatch};
use nexus_deployments::service::clone::DeploymentCloneService;
use nexus_deployments::service::execute::DeploymentExecuteService;
use nexus_deployments::service::export::DeploymentExportService;
use nexus_deployments::service::import::DeploymentImportService;
use nexus_deployments::service::load::DeploymentLoadService;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest};
use nexus_deployments::service::validate::DeploymentValidateService;
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_events::types::NexusEvent;
use nexus_extension::ExtensionRegistry;
use nexus_storage::DeploymentMappers;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::str::FromStr;
use std::sync::Arc;

fn repo_for(state: &AppState) -> Arc<dyn DeploymentRepository> {
    let mappers = DeploymentMappers::new(state.db.pool().clone());
    Arc::new(SqliteDeploymentRepository::new(mappers))
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", post(create).get(list))
        .route("/import", post(import))
        .route(
            "/{id}",
            get(detail).patch(update_metadata).delete(delete_deployment),
        )
        .route("/{id}/revisions/{rev}", get(get_revision))
        .route("/{id}/revisions", post(save_new_revision))
        .route("/{id}/validate", post(validate))
        .route("/{id}/load", post(load))
        .route("/{id}/runs", post(run))
        .route("/{id}/clone", post(clone_deployment))
        .route("/{id}/export", post(export))
        .route("/{id}/import", post(import_into))
        .route(
            "/{id}/extension-settings/{ext_id}",
            get(get_extension_settings)
                .put(put_extension_settings)
                .delete(delete_extension_settings),
        )
}

async fn create(State(state): State<AppState>, Json(req): Json<SaveRequest>) -> impl IntoResponse {
    let repo = repo_for(&state);
    let svc = DeploymentSaveService::new(repo);
    match svc.save(req).await {
        Ok((saved, _events)) => (StatusCode::CREATED, Json(ApiResponse::ok(saved))).into_response(),
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize, Default)]
struct ListQuery {
    workspace_id: Option<String>,
    state: Option<String>,
    limit: Option<i64>,
    /// Opt-in flag — when `true`, soft-deleted rows are returned alongside
    /// live rows. Defaults to `false` so existing consumers see only live
    /// rows after the soft-delete migration lands.
    include_deleted: Option<bool>,
}

async fn list(State(state): State<AppState>, Query(q): Query<ListQuery>) -> impl IntoResponse {
    let repo = repo_for(&state);
    let filter = ListFilter {
        workspace_id: q.workspace_id,
        state: q.state,
        limit: q.limit,
        include_deleted: q.include_deleted,
        ..Default::default()
    };
    match repo.list(&filter).await {
        Ok(items) => (StatusCode::OK, Json(ApiResponse::ok(items))).into_response(),
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize, Default)]
struct DeleteQuery {
    /// When `true`, hard-purge an already-soft-deleted row. Defaults to
    /// `false` (soft-delete only). Returns 409 if the row is still live.
    purge: Option<bool>,
}

async fn delete_deployment(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Query(q): Query<DeleteQuery>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<()>::err(
                    StatusCode::BAD_REQUEST,
                    "deployment.invalid_id",
                    "deployment",
                    String::from("malformed deployment id"),
                )),
            )
                .into_response();
        }
    };
    let now = chrono::Utc::now().to_rfc3339();
    if q.purge.unwrap_or(false) {
        match repo.purge(&did).await {
            Ok(()) => {
                state.event_bus.publish(NexusEvent::DeploymentPurged {
                    deployment_id: did.to_string(),
                    purged_at: now,
                });
                (StatusCode::NO_CONTENT, ()).into_response()
            }
            Err(e) => err_to_response(e),
        }
    } else {
        match repo.soft_delete(&did).await {
            Ok(()) => {
                state.event_bus.publish(NexusEvent::DeploymentDeleted {
                    deployment_id: did.to_string(),
                    deleted_at: now,
                });
                (StatusCode::NO_CONTENT, ()).into_response()
            }
            Err(e) => err_to_response(e),
        }
    }
}

async fn detail(State(state): State<AppState>, Path(id): Path<String>) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = DeploymentId::from_str(&id).unwrap();
    match repo.fetch_deployment(&did).await {
        Ok(d) => (StatusCode::OK, Json(ApiResponse::ok(d))).into_response(),
        Err(e) => err_to_response(e),
    }
}

async fn get_revision(
    State(state): State<AppState>,
    Path((_id, rev)): Path<(String, String)>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let rid = DeploymentRevisionId::from_str(&rev).unwrap();
    match repo.fetch_revision(&rid).await {
        Ok(r) => (StatusCode::OK, Json(ApiResponse::ok(r))).into_response(),
        Err(e) => err_to_response(e),
    }
}

async fn update_metadata(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(patch): Json<MetadataPatch>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = DeploymentId::from_str(&id).unwrap();
    match repo.update_metadata(&did, &patch).await {
        Ok(()) => (StatusCode::NO_CONTENT, ()).into_response(),
        Err(e) => err_to_response(e),
    }
}

async fn save_new_revision(
    State(_state): State<AppState>,
    Path(_id): Path<String>,
    Json(_req): Json<SaveRequest>,
) -> impl IntoResponse {
    (
        StatusCode::NOT_IMPLEMENTED,
        Json(ApiResponse::<()>::err(
            StatusCode::NOT_IMPLEMENTED,
            "deployment.not_implemented",
            "deployment",
            String::from("save_new_revision pending Phase 8 expansion"),
        )),
    )
        .into_response()
}

#[derive(Debug, Deserialize)]
struct ValidateBody {
    diagnostics: Option<Vec<nexus_deployments::diagnostic::Diagnostic>>,
}

async fn validate(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<ValidateBody>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = DeploymentId::from_str(&id).unwrap();
    let svc = DeploymentValidateService::new(repo);
    match svc
        .validate(&did, body.diagnostics.unwrap_or_default())
        .await
    {
        Ok((res, _events)) => {
            #[derive(Serialize)]
            struct V {
                validation_id: String,
                overall_state: String,
            }
            (
                StatusCode::OK,
                Json(ApiResponse::ok(V {
                    validation_id: res.validation_id,
                    overall_state: res.overall_state,
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize, Default)]
struct LoadBody {
    revision_id: Option<String>,
}

async fn load(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<LoadBody>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = DeploymentId::from_str(&id).unwrap();
    let svc = DeploymentLoadService::new(repo);
    let rev = body
        .revision_id
        .map(|s| DeploymentRevisionId::from_str(&s).unwrap());
    match svc.load(&did, rev.as_ref()).await {
        Ok((res, _events)) => {
            #[derive(Serialize)]
            struct L {
                session_id: String,
                restore_state: String,
                effective_workflow_hash: String,
            }
            (
                StatusCode::OK,
                Json(ApiResponse::ok(L {
                    session_id: res.session_id,
                    restore_state: format!("{:?}", res.restore_state),
                    effective_workflow_hash: res.revision.effective_workflow_hash,
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize, Default)]
struct RunBody {
    revision_id: Option<String>,
    inputs: Option<Value>,
    run_id: String,
}

async fn run(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<RunBody>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = DeploymentId::from_str(&id).unwrap();
    let svc = DeploymentExecuteService::new(repo);
    let rev = body
        .revision_id
        .map(|s| DeploymentRevisionId::from_str(&s).unwrap());
    let inputs = body.inputs.unwrap_or(serde_json::json!({}));
    match svc.execute(&did, rev.as_ref(), &inputs, &body.run_id).await {
        Ok((res, _events)) => {
            #[derive(Serialize)]
            struct R {
                run_id: String,
                deployment_revision_id: String,
                execution_context_hash: String,
            }
            (
                StatusCode::ACCEPTED,
                Json(ApiResponse::ok(R {
                    run_id: res.run_id,
                    deployment_revision_id: res.revision_id.to_string(),
                    execution_context_hash: res.execution_context_hash,
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize)]
struct CloneBody {
    new_slug: String,
    new_display_name: String,
}

async fn clone_deployment(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<CloneBody>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = DeploymentId::from_str(&id).unwrap();
    let svc = DeploymentCloneService::new(repo);
    match svc.clone(&did, body.new_slug, body.new_display_name).await {
        Ok((new_id, _events)) => {
            #[derive(Serialize)]
            struct C {
                deployment_id: String,
            }
            (
                StatusCode::CREATED,
                Json(ApiResponse::ok(C {
                    deployment_id: new_id.to_string(),
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

async fn export(State(state): State<AppState>, Path(id): Path<String>) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(_) => return bad_id_response(),
    };
    let svc = DeploymentExportService::new(repo);
    match svc.export(&did).await {
        Ok(env) => (StatusCode::OK, Json(ApiResponse::ok(env))).into_response(),
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize)]
struct ImportBody {
    envelope: nexus_deployments::service::export::ExportEnvelope,
}

async fn import(State(state): State<AppState>, Json(body): Json<ImportBody>) -> impl IntoResponse {
    let repo = repo_for(&state);
    // Derive missing dependencies host-side from the envelope vs the registry —
    // never trust a client-supplied list to set persisted restore_state.
    let missing = nexus_deployments::service::import::missing_extensions(&body.envelope, |id| {
        state.extension_registry.get_extension(id).is_some()
    });
    let svc = DeploymentImportService::new(repo);
    match svc.import(body.envelope, missing).await {
        Ok((res, _events)) => {
            #[derive(Serialize)]
            struct I {
                deployment_id: String,
                state: String,
                diagnostics_count: usize,
            }
            (
                StatusCode::CREATED,
                Json(ApiResponse::ok(I {
                    deployment_id: res.deployment_id.to_string(),
                    state: res.state,
                    diagnostics_count: res.diagnostics_count,
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

/// In-deployment import-replace. Replaces the target deployment's config (as a
/// new active revision) and all extension settings from the uploaded envelope,
/// keeping the deployment's identity and module binding. Destructive — the
/// frontend gates it behind a confirm dialog.
async fn import_into(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<ImportBody>,
) -> impl IntoResponse {
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(_) => return bad_id_response(),
    };
    perform_import_into(&state, &did, body.envelope).await
}

/// Shared replace-in-place path used by both `POST /{id}/import` and
/// `POST /{id}/presets/{preset_id}/apply`. Pre-validates + host-recomputes each
/// bundle's schema fingerprint BEFORE any write (a 422 returns here, leaving the
/// deployment untouched), derives missing dependencies host-side, then runs the
/// atomic replace.
async fn perform_import_into(
    state: &AppState,
    did: &DeploymentId,
    mut envelope: nexus_deployments::service::export::ExportEnvelope,
) -> axum::response::Response {
    let repo = repo_for(state);
    let mut prepared = Vec::with_capacity(envelope.extension_settings.len());
    for bundle in &envelope.extension_settings {
        let fingerprint = match state
            .extension_registry
            .get_extension(&bundle.extension_id)
            .and_then(|ext| ext.manifest.config_schema)
        {
            Some(schema) => {
                if let Err(errors) =
                    nexus_extension::validate_settings_against_schema(&schema, &bundle.settings)
                {
                    return (
                        StatusCode::UNPROCESSABLE_ENTITY,
                        Json(ApiResponse::<()>::err(
                            StatusCode::UNPROCESSABLE_ENTITY,
                            "deployment.settings_schema_violation",
                            "deployment",
                            errors.join("; "),
                        )),
                    )
                        .into_response();
                }
                Some(config_schema_fingerprint(&schema))
            }
            None => None,
        };
        prepared.push(fingerprint);
    }
    for (bundle, fingerprint) in envelope.extension_settings.iter_mut().zip(prepared) {
        bundle.schema_fingerprint = fingerprint;
    }

    let missing = nexus_deployments::service::import::missing_extensions(&envelope, |id| {
        state.extension_registry.get_extension(id).is_some()
    });
    let svc = DeploymentImportService::new(repo);
    match svc.import_into(did, envelope, missing).await {
        Ok((res, _events)) => {
            #[derive(Serialize)]
            struct I {
                deployment_id: String,
                state: String,
                diagnostics_count: usize,
            }
            (
                StatusCode::OK,
                Json(ApiResponse::ok(I {
                    deployment_id: res.deployment_id.to_string(),
                    state: res.state,
                    diagnostics_count: res.diagnostics_count,
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

/// Max serialized size of a settings blob the host will persist. The host
/// stores the payload opaquely, so this is the only structural bound it
/// enforces beyond "must be a JSON object".
const MAX_SETTINGS_BYTES: usize = 256 * 1024;

#[derive(Debug, Serialize)]
struct ExtensionSettingsResponse {
    deployment_id: String,
    extension_id: String,
    settings: Value,
    schema_fingerprint: Option<String>,
    updated_at: Option<String>,
}

#[derive(Debug, Deserialize)]
struct PutExtensionSettingsBody {
    settings: Value,
}

/// Host-computed schema fingerprint: sha256 of the validating `config_schema`.
/// serde_json sorts object keys, so the serialization is deterministic across
/// loads — the same schema always yields the same fingerprint.
fn config_schema_fingerprint(schema: &Value) -> String {
    use sha2::{Digest, Sha256};
    let mut hasher = Sha256::new();
    hasher.update(schema.to_string().as_bytes());
    format!("{:x}", hasher.finalize())
}

fn bad_id_response() -> axum::response::Response {
    (
        StatusCode::BAD_REQUEST,
        Json(ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "deployment.invalid_id",
            "deployment",
            String::from("malformed deployment id"),
        )),
    )
        .into_response()
}

async fn get_extension_settings(
    State(state): State<AppState>,
    Path((id, ext_id)): Path<(String, String)>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(_) => return bad_id_response(),
    };
    if let Err(e) = repo.fetch_deployment(&did).await {
        return err_to_response(e);
    }
    match repo.get_extension_settings(&did, &ext_id).await {
        Ok(row) => {
            let (settings, schema_fingerprint, updated_at) = match row {
                Some(r) => (
                    serde_json::from_str(&r.settings_json)
                        .unwrap_or_else(|_| serde_json::json!({})),
                    r.settings_schema_fingerprint,
                    Some(r.updated_at),
                ),
                None => (serde_json::json!({}), None, None),
            };
            (
                StatusCode::OK,
                Json(ApiResponse::ok(ExtensionSettingsResponse {
                    deployment_id: did.to_string(),
                    extension_id: ext_id,
                    settings,
                    schema_fingerprint,
                    updated_at,
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

async fn put_extension_settings(
    State(state): State<AppState>,
    Path((id, ext_id)): Path<(String, String)>,
    Json(body): Json<PutExtensionSettingsBody>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(_) => return bad_id_response(),
    };
    if !body.settings.is_object() {
        return (
            StatusCode::UNPROCESSABLE_ENTITY,
            Json(ApiResponse::<()>::err(
                StatusCode::UNPROCESSABLE_ENTITY,
                "deployment.settings_not_object",
                "deployment",
                String::from("settings must be a JSON object"),
            )),
        )
            .into_response();
    }
    let settings_json = body.settings.to_string();
    if settings_json.len() > MAX_SETTINGS_BYTES {
        return (
            StatusCode::PAYLOAD_TOO_LARGE,
            Json(ApiResponse::<()>::err(
                StatusCode::PAYLOAD_TOO_LARGE,
                "deployment.settings_too_large",
                "deployment",
                format!(
                    "settings payload {} bytes exceeds maximum {MAX_SETTINGS_BYTES}",
                    settings_json.len()
                ),
            )),
        )
            .into_response();
    }
    if let Err(e) = repo.fetch_deployment(&did).await {
        return err_to_response(e);
    }
    // Validate against the extension's config_schema when declared (422), else
    // opaque passthrough. Uninstalled extension is never rejected here (gate B1).
    let schema_fingerprint = match state
        .extension_registry
        .get_extension(&ext_id)
        .and_then(|ext| ext.manifest.config_schema)
    {
        Some(schema) => {
            if let Err(errors) =
                nexus_extension::validate_settings_against_schema(&schema, &body.settings)
            {
                return (
                    StatusCode::UNPROCESSABLE_ENTITY,
                    Json(ApiResponse::<()>::err(
                        StatusCode::UNPROCESSABLE_ENTITY,
                        "deployment.settings_schema_violation",
                        "deployment",
                        errors.join("; "),
                    )),
                )
                    .into_response();
            }
            Some(config_schema_fingerprint(&schema))
        }
        None => None,
    };
    match repo
        .upsert_extension_settings(&did, &ext_id, &settings_json, schema_fingerprint.as_deref())
        .await
    {
        Ok(r) => (
            StatusCode::OK,
            Json(ApiResponse::ok(ExtensionSettingsResponse {
                deployment_id: r.deployment_id.to_string(),
                extension_id: r.extension_id,
                settings: serde_json::from_str(&r.settings_json)
                    .unwrap_or_else(|_| serde_json::json!({})),
                schema_fingerprint: r.settings_schema_fingerprint,
                updated_at: Some(r.updated_at),
            })),
        )
            .into_response(),
        Err(e) => err_to_response(e),
    }
}

async fn delete_extension_settings(
    State(state): State<AppState>,
    Path((id, ext_id)): Path<(String, String)>,
) -> impl IntoResponse {
    let repo = repo_for(&state);
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(_) => return bad_id_response(),
    };
    if let Err(e) = repo.fetch_deployment(&did).await {
        return err_to_response(e);
    }
    match repo.delete_extension_settings(&did, &ext_id).await {
        Ok(()) => (StatusCode::NO_CONTENT, ()).into_response(),
        Err(e) => err_to_response(e),
    }
}

fn err_to_response(e: nexus_deployments::DeploymentError) -> axum::response::Response {
    use nexus_deployments::DeploymentError::*;
    let (status, code) = match &e {
        NotFound(_) | RevisionNotFound(_) => (StatusCode::NOT_FOUND, "deployment.not_found"),
        SlugConflict => (StatusCode::CONFLICT, "deployment.slug_conflict"),
        PurgeRequiresSoftDeleteFirst => (
            StatusCode::CONFLICT,
            "deployment.purge_requires_soft_delete_first",
        ),
        ModuleMismatch { .. } => (StatusCode::CONFLICT, "deployment.module_mismatch"),
        InvalidEnvelope(_) => (
            StatusCode::UNPROCESSABLE_ENTITY,
            "deployment.invalid_envelope",
        ),
        ExecuteBlocked(_) | RestoreBlocked(_) => {
            (StatusCode::UNPROCESSABLE_ENTITY, "deployment.blocked")
        }
        ExportBlockedBySecret => (
            StatusCode::UNPROCESSABLE_ENTITY,
            "deployment.export_blocked_by_secret",
        ),
        PathOutsideWorkspace(_) => (StatusCode::BAD_REQUEST, "deployment.path_outside_workspace"),
        _ => (StatusCode::INTERNAL_SERVER_ERROR, "deployment.error"),
    };
    let body = serde_json::json!({"status":"error","code":code,"message":e.to_string()});
    (status, Json(body)).into_response()
}
