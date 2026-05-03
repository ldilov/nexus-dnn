use crate::AppState;
use crate::envelope::ApiResponse;
use axum::Json;
use axum::Router;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::{get, post};
use nexus_events::types::NexusEvent;
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
        .route("/{id}", get(detail).patch(update_metadata).delete(delete_deployment))
        .route("/{id}/revisions/{rev}", get(get_revision))
        .route("/{id}/revisions", post(save_new_revision))
        .route("/{id}/validate", post(validate))
        .route("/{id}/load", post(load))
        .route("/{id}/runs", post(run))
        .route("/{id}/clone", post(clone_deployment))
        .route("/{id}/export", post(export))
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
    let did = DeploymentId::from_str(&id).unwrap();
    let svc = DeploymentExportService::new(repo);
    match svc.export(&did).await {
        Ok(env) => (StatusCode::OK, Json(ApiResponse::ok(env))).into_response(),
        Err(e) => err_to_response(e),
    }
}

#[derive(Debug, Deserialize)]
struct ImportBody {
    envelope: nexus_deployments::service::export::ExportEnvelope,
    #[serde(default)]
    missing_dependencies: Vec<String>,
}

async fn import(State(state): State<AppState>, Json(body): Json<ImportBody>) -> impl IntoResponse {
    let repo = repo_for(&state);
    let svc = DeploymentImportService::new(repo);
    match svc.import(body.envelope, body.missing_dependencies).await {
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

fn err_to_response(e: nexus_deployments::DeploymentError) -> axum::response::Response {
    use nexus_deployments::DeploymentError::*;
    let (status, code) = match &e {
        NotFound(_) | RevisionNotFound(_) => (StatusCode::NOT_FOUND, "deployment.not_found"),
        SlugConflict => (StatusCode::CONFLICT, "deployment.slug_conflict"),
        PurgeRequiresSoftDeleteFirst => (
            StatusCode::CONFLICT,
            "deployment.purge_requires_soft_delete_first",
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
