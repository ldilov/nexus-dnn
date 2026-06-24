use crate::AppState;
use crate::envelope::ApiResponse;
use crate::handlers::recipes::run::binding_error_to_api;
use crate::handlers::workflow_versioning::record_to_snapshot;
use axum::Json;
use axum::Router;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::{get, patch, post};
use nexus_deployments::DeploymentRepository;
use nexus_deployments::id::{DeploymentId, DeploymentRevisionId};
use nexus_deployments::repository::{ListFilter, MetadataPatch};
use nexus_deployments::service::clone::DeploymentCloneService;
use nexus_deployments::service::execute::DeploymentExecuteService;
use nexus_deployments::service::export::DeploymentExportService;
use nexus_deployments::service::import::DeploymentImportService;
use nexus_deployments::service::load::DeploymentLoadService;
use nexus_deployments::service::preset::{DeploymentPresetService, recipe_key_of};
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest};
use nexus_deployments::service::validate::DeploymentValidateService;
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_events::types::NexusEvent;
use nexus_extension::ExtensionRegistry;
use nexus_recipe::{ControlValues, RecipeProjection, compile_recipe_run};
use nexus_storage::{Database, DeploymentMappers};
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
        .route("/{id}/presets", get(list_presets).post(create_preset))
        .route(
            "/{id}/presets/{preset_id}",
            patch(rename_preset).delete(delete_preset),
        )
        .route("/{id}/presets/{preset_id}/apply", post(apply_preset))
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
    /// Recipe-run control overrides. When present, the run is compiled via the
    /// recipe binding compiler against the revision's pinned host workflow.
    control_values: Option<Value>,
    preset_id: Option<String>,
    // deprecated: remove after one release — legacy inputs-blob path.
    inputs: Option<Value>,
    /// Required only on the legacy inputs-blob path; the recipe path lets the
    /// run engine mint the run id.
    run_id: Option<String>,
}

#[derive(Serialize)]
struct RunResponse {
    run_id: String,
    deployment_revision_id: String,
    execution_context_hash: String,
}

async fn run(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<RunBody>,
) -> impl IntoResponse {
    let did = match DeploymentId::from_str(&id) {
        Ok(d) => d,
        Err(_) => return bad_id_response(),
    };
    if body.control_values.is_some() {
        return run_recipe_path(&state, &did, &body).await;
    }
    run_legacy_path(&state, &id, &did, body).await
}

/// Recipe-run path: validate the recipe pin against the revision's authoritative
/// pinned host workflow, compile + fan-out the control values, submit via the run
/// engine, then record the deployment run link (the engine already minted the run
/// id). Generic by `{id}` over host-owned rows.
async fn run_recipe_path(
    state: &AppState,
    did: &DeploymentId,
    body: &RunBody,
) -> axum::response::Response {
    let repo = repo_for(state);
    let deployment = match repo.fetch_deployment(did).await {
        Ok(d) => d,
        Err(e) => return err_to_response(e),
    };
    // Reject a blocked restore_state BEFORE any compile/freeze so a rejected
    // submit never orphans a frozen run + graph (mirrors execute.rs guard).
    match deployment.restore_state.as_str() {
        "restorable_read_only" => {
            return err_to_response(nexus_deployments::DeploymentError::ExecuteBlocked(
                nexus_deployments::RestoreState::RestorableReadOnly,
            ));
        }
        "not_restorable" => {
            return err_to_response(nexus_deployments::DeploymentError::ExecuteBlocked(
                nexus_deployments::RestoreState::NotRestorable,
            ));
        }
        _ => {}
    }
    let recipe_id = match deployment.source_recipe_id {
        Some(ref r) => r.clone(),
        None => {
            return unprocessable(
                "deployment.not_recipe_runnable",
                "deployment is not recipe-runnable",
            );
        }
    };
    let target_rev = match body.revision_id.clone().or_else(|| {
        deployment
            .current_revision_id
            .as_ref()
            .map(|r| r.to_string())
    }) {
        Some(s) => match DeploymentRevisionId::from_str(&s) {
            Ok(r) => r,
            Err(_) => return bad_id_response(),
        },
        None => {
            return unprocessable(
                "deployment.no_revision",
                "deployment has no resolvable revision",
            );
        }
    };
    let revision = match repo.fetch_revision(&target_rev).await {
        Ok(r) => r,
        Err(e) => return err_to_response(e),
    };
    let (base_workflow_ref, base_workflow_version_ref) = match (
        revision.base_workflow_ref,
        revision.base_workflow_version_ref,
    ) {
        (Some(wf), Some(ver)) => (wf, ver),
        _ => {
            return unprocessable(
                "deployment.revision_not_pinned",
                "revision not pinned to a host workflow version",
            );
        }
    };

    let recipe = match state.db.get_recipe(&recipe_id).await {
        Ok(r) => r,
        Err(nexus_storage::StorageError::NotFound { .. }) => {
            return not_found(format!("recipe {recipe_id} not found"));
        }
        Err(e) => return internal_error(e.to_string()),
    };
    if recipe.workflow_version.as_deref() != Some(base_workflow_version_ref.as_str()) {
        return err_to_response(nexus_deployments::DeploymentError::PinMismatch {
            recipe_version: recipe.workflow_version.unwrap_or_default(),
            revision_version: base_workflow_version_ref,
        });
    }

    let resolved = match resolve_recipe_run(
        state,
        &recipe,
        &base_workflow_ref,
        &base_workflow_version_ref,
        body,
    )
    .await
    {
        Ok(r) => r,
        Err(resp) => return resp,
    };

    let run_id = match state.run_engine.create_run_from_resolved(&resolved).await {
        Ok(rid) => rid,
        Err(e) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ApiResponse::<()>::err(
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "deployment.run_engine_error",
                    "deployment",
                    e.to_string(),
                )),
            )
                .into_response();
        }
    };

    let control_payload = body
        .control_values
        .clone()
        .unwrap_or_else(|| serde_json::json!({}));
    let svc = DeploymentExecuteService::new(repo);
    match svc
        .execute(did, Some(&target_rev), &control_payload, &run_id)
        .await
    {
        Ok((res, _events)) => {
            let engine = state.run_engine.clone();
            let rid = run_id.clone();
            tokio::spawn(async move {
                if let Err(e) = engine.execute_run(&rid).await {
                    tracing::error!(run_id = %rid, error = %e, "deployment recipe run execution failed");
                }
            });
            (
                StatusCode::ACCEPTED,
                Json(ApiResponse::ok(RunResponse {
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

/// Resolve the recipe's projection + the pinned workflow snapshot, then compile
/// the control values into a `ResolvedRun`. Maps every failure to a 4xx response.
async fn resolve_recipe_run(
    state: &AppState,
    recipe: &nexus_storage::RecipeRecord,
    base_workflow_ref: &str,
    base_workflow_version_ref: &str,
    body: &RunBody,
) -> Result<nexus_recipe::ResolvedRun, axum::response::Response> {
    let projection = match recipe.projection.as_deref() {
        Some(json_str) => serde_json::from_str::<RecipeProjection>(json_str).map_err(|e| {
            unprocessable(
                "deployment.projection_parse",
                &format!("projection parse failed: {e}"),
            )
        })?,
        None => RecipeProjection::empty(),
    };

    let record = state
        .db
        .get_workflow_version(base_workflow_ref, base_workflow_version_ref)
        .await
        .map_err(|_| {
            unprocessable(
                "deployment.broken_pin",
                "pinned host workflow version not found",
            )
        })?;
    let operators = state.extension_registry.list_operators();
    let snapshot = record_to_snapshot(&record, &operators).map_err(|e| {
        unprocessable(
            "deployment.broken_pin",
            &format!("snapshot assembly failed: {e}"),
        )
    })?;

    let control_values: ControlValues = body
        .control_values
        .as_ref()
        .and_then(|v| v.as_object())
        .map(|m| m.iter().map(|(k, v)| (k.clone(), v.clone())).collect())
        .unwrap_or_default();

    compile_recipe_run(
        &projection,
        &snapshot,
        &control_values,
        body.preset_id.as_deref(),
    )
    .map_err(|e| binding_error_to_api(e).into_response())
}

/// Legacy inputs-blob path. Deprecated — migrate to `control_values`.
async fn run_legacy_path(
    state: &AppState,
    id: &str,
    did: &DeploymentId,
    body: RunBody,
) -> axum::response::Response {
    let run_id = match body.run_id {
        Some(r) => r,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(ApiResponse::<()>::err(
                    StatusCode::BAD_REQUEST,
                    "deployment.run_id_required",
                    "deployment",
                    String::from("run_id is required for the legacy inputs-blob path"),
                )),
            )
                .into_response();
        }
    };
    tracing::warn!(
        deployment_id = %id,
        "deprecated: /deployments/{id}/runs inputs-blob path; migrate to control_values"
    );
    let repo = repo_for(state);
    let svc = DeploymentExecuteService::new(repo);
    let rev = match body.revision_id {
        Some(s) => match DeploymentRevisionId::from_str(&s) {
            Ok(r) => Some(r),
            Err(_) => return bad_id_response(),
        },
        None => None,
    };
    let inputs = body.inputs.unwrap_or(serde_json::json!({}));
    match svc.execute(did, rev.as_ref(), &inputs, &run_id).await {
        Ok((res, _events)) => (
            StatusCode::ACCEPTED,
            Json(ApiResponse::ok(RunResponse {
                run_id: res.run_id,
                deployment_revision_id: res.revision_id.to_string(),
                execution_context_hash: res.execution_context_hash,
            })),
        )
            .into_response(),
        Err(e) => err_to_response(e),
    }
}

fn unprocessable(code: &'static str, message: &str) -> axum::response::Response {
    (
        StatusCode::UNPROCESSABLE_ENTITY,
        Json(ApiResponse::<()>::err(
            StatusCode::UNPROCESSABLE_ENTITY,
            code,
            "deployment",
            message.to_owned(),
        )),
    )
        .into_response()
}

fn not_found(message: String) -> axum::response::Response {
    (
        StatusCode::NOT_FOUND,
        Json(ApiResponse::<()>::err(
            StatusCode::NOT_FOUND,
            "deployment.not_found",
            "deployment",
            message,
        )),
    )
        .into_response()
}

fn internal_error(message: String) -> axum::response::Response {
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(ApiResponse::<()>::err(
            StatusCode::INTERNAL_SERVER_ERROR,
            "deployment.error",
            "deployment",
            message,
        )),
    )
        .into_response()
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

#[derive(Debug, Serialize)]
struct PresetSummaryDto {
    id: String,
    name: String,
    description: Option<String>,
    recipe_key: String,
    source_extension_id: Option<String>,
    created_at: String,
    updated_at: String,
}

fn preset_summary(p: nexus_deployments::repository::PresetRow) -> PresetSummaryDto {
    PresetSummaryDto {
        id: p.id,
        name: p.name,
        description: p.description,
        recipe_key: p.recipe_key,
        source_extension_id: p.source_extension_id,
        created_at: p.created_at,
        updated_at: p.updated_at,
    }
}

/// Resolve the deployment + its recipe_key, mapping errors to a response.
/// Returns `Err(response)` when the deployment is missing (404) or unbound (422).
async fn deployment_recipe_key(
    state: &AppState,
    id: &str,
) -> Result<
    (
        DeploymentId,
        nexus_deployments::repository::DeploymentRow,
        String,
    ),
    axum::response::Response,
> {
    let did = DeploymentId::from_str(id).map_err(|_| bad_id_response())?;
    let repo = repo_for(state);
    let deployment = repo.fetch_deployment(&did).await.map_err(err_to_response)?;
    let recipe_key = recipe_key_of(&deployment).map_err(err_to_response)?;
    Ok((did, deployment, recipe_key))
}

async fn list_presets(State(state): State<AppState>, Path(id): Path<String>) -> impl IntoResponse {
    let (_did, _deployment, recipe_key) = match deployment_recipe_key(&state, &id).await {
        Ok(t) => t,
        Err(resp) => return resp,
    };
    let svc = DeploymentPresetService::new(repo_for(&state));
    match svc.list(&recipe_key).await {
        Ok(rows) => {
            #[derive(Serialize)]
            struct L {
                presets: Vec<PresetSummaryDto>,
            }
            (
                StatusCode::OK,
                Json(ApiResponse::ok(L {
                    presets: rows.into_iter().map(preset_summary).collect(),
                })),
            )
                .into_response()
        }
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize)]
#[serde(tag = "source", rename_all = "snake_case")]
enum CreatePresetBody {
    Current {
        name: String,
        #[serde(default)]
        description: Option<String>,
    },
    Envelope {
        name: String,
        #[serde(default)]
        description: Option<String>,
        envelope: nexus_deployments::service::export::ExportEnvelope,
    },
}

async fn create_preset(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<CreatePresetBody>,
) -> impl IntoResponse {
    let (did, deployment, recipe_key) = match deployment_recipe_key(&state, &id).await {
        Ok(t) => t,
        Err(resp) => return resp,
    };
    // Records the host deployment's module binding for provenance only;
    // recipe_key is the authority for apply-compatibility.
    let source_ext = deployment.source_extension_id.clone();
    let svc = DeploymentPresetService::new(repo_for(&state));
    let result = match body {
        CreatePresetBody::Current { name, description } => {
            svc.create_from_deployment(
                &did,
                &recipe_key,
                source_ext.as_deref(),
                &name,
                description.as_deref(),
            )
            .await
        }
        CreatePresetBody::Envelope {
            name,
            description,
            envelope,
        } => {
            svc.create_from_envelope(
                &did,
                &recipe_key,
                source_ext.as_deref(),
                envelope,
                &name,
                description.as_deref(),
            )
            .await
        }
    };
    match result {
        Ok(row) => (
            StatusCode::CREATED,
            Json(ApiResponse::ok(preset_summary(row))),
        )
            .into_response(),
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize)]
struct RenamePresetBody {
    name: String,
    #[serde(default)]
    description: Option<String>,
}

async fn rename_preset(
    State(state): State<AppState>,
    Path((id, preset_id)): Path<(String, String)>,
    Json(body): Json<RenamePresetBody>,
) -> impl IntoResponse {
    let (_did, _deployment, recipe_key) = match deployment_recipe_key(&state, &id).await {
        Ok(t) => t,
        Err(resp) => return resp,
    };
    let svc = DeploymentPresetService::new(repo_for(&state));
    match svc
        .rename(
            &preset_id,
            &recipe_key,
            &body.name,
            body.description.as_deref(),
        )
        .await
    {
        Ok(row) => (StatusCode::OK, Json(ApiResponse::ok(preset_summary(row)))).into_response(),
        Err(e) => err_to_response(e),
    }
}

async fn delete_preset(
    State(state): State<AppState>,
    Path((id, preset_id)): Path<(String, String)>,
) -> impl IntoResponse {
    let (_did, _deployment, recipe_key) = match deployment_recipe_key(&state, &id).await {
        Ok(t) => t,
        Err(resp) => return resp,
    };
    let svc = DeploymentPresetService::new(repo_for(&state));
    match svc.delete(&preset_id, &recipe_key).await {
        Ok(()) => (StatusCode::NO_CONTENT, ()).into_response(),
        Err(e) => err_to_response(e),
    }
}

async fn apply_preset(
    State(state): State<AppState>,
    Path((id, preset_id)): Path<(String, String)>,
) -> impl IntoResponse {
    let (did, _deployment, recipe_key) = match deployment_recipe_key(&state, &id).await {
        Ok(t) => t,
        Err(resp) => return resp,
    };
    let svc = DeploymentPresetService::new(repo_for(&state));
    let preset = match svc.get(&preset_id).await {
        Ok(p) => p,
        Err(e) => return err_to_response(e),
    };
    if preset.recipe_key != recipe_key {
        return err_to_response(nexus_deployments::DeploymentError::PresetNotFound(
            preset_id,
        ));
    }
    let envelope: nexus_deployments::service::export::ExportEnvelope =
        match serde_json::from_str(&preset.payload_json) {
            Ok(env) => env,
            Err(_) => {
                return (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(ApiResponse::<()>::err(
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "deployment.preset_corrupt",
                        "deployment",
                        String::from("stored preset payload is not a valid envelope"),
                    )),
                )
                    .into_response();
            }
        };
    perform_import_into(&state, &did, envelope).await
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
        PinMismatch { .. } => (StatusCode::CONFLICT, "deployment.pin_mismatch"),
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
        PresetNotFound(_) => (StatusCode::NOT_FOUND, "deployment.preset_not_found"),
        PresetNameConflict(_) => (StatusCode::CONFLICT, "deployment.preset_name_conflict"),
        PresetUnsupported(_) => (
            StatusCode::UNPROCESSABLE_ENTITY,
            "deployment.preset_unsupported",
        ),
        _ => (StatusCode::INTERNAL_SERVER_ERROR, "deployment.error"),
    };
    let body = serde_json::json!({"status":"error","code":code,"message":e.to_string()});
    (status, Json(body)).into_response()
}
