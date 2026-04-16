//! `POST /api/v1/modules/user:draft:{uuid}/materialize` (FR-BM04).
//!
//! Implements the contract in `specs/019-extension-modules/contracts/draft-materialize.md`.
//! Step summary:
//!   1. Validate the path UUID matches RFC 4122 v4.
//!   2. Hash the body canonically (SHA-256 over RFC 8785 JCS) using the
//!      shared hasher from `nexus_deployments::hash`.
//!   3. Consult [`DraftMaterializeMap`] for an idempotency hit. Same hash
//!      within TTL → 200 with cached ids. Different hash within TTL →
//!      409 `module.draft_uuid_conflict`.
//!   4. Otherwise: insert a fresh `workflows` row (extension_id = NULL marks
//!      it as user-authored) and call [`DeploymentSaveService::save`] with
//!      `source_kind = "user"`. Cache the resulting ids for 10 min.
//!   5. Return 201 with `{ module_id: "user:{workflow_id}", deployment_id, deployment_revision_id }`.

use std::sync::Arc;

use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use chrono::Utc;
use nexus_deployments::hash::sha256_jcs;
use nexus_deployments::service::save::{DeploymentSaveService, SaveRequest, SourceRef};
use nexus_deployments::sqlite_repo::SqliteDeploymentRepository;
use nexus_deployments::state::MappingState;
use nexus_storage::{Database, DeploymentMappers, WorkflowRecord};
use regex_lite::Regex;
use std::sync::LazyLock;
use tokio::time::Instant;
use uuid::Uuid;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::draft_map::DraftEntry;
use super::envelope::{MaterializeRequest, MaterializeResponse};
use super::module_id::ModuleId;

static UUID_V4_RE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$")
        .expect("uuid-v4 regex is valid")
});

pub async fn materialize(
    State(state): State<AppState>,
    Path(uuid_str): Path<String>,
    Json(body): Json<MaterializeRequest>,
) -> Result<axum::response::Response, ApiError> {
    if !UUID_V4_RE.is_match(&uuid_str) {
        return Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_uuid_invalid",
            "draft uuid does not match UUID v4 format",
        ));
    }

    let body_value = serde_json::to_value(&body).map_err(|e| {
        ApiError::Internal(format!("could not serialize materialize body for hashing: {e}"))
    })?;
    let body_hash = sha256_jcs(&body_value)
        .map_err(|e| ApiError::Internal(format!("body canonicalization failed: {e}")))?;

    if let Some(existing) = state.draft_materialize_map.lookup(&uuid_str).await {
        let now = Instant::now();
        let within_ttl = now.duration_since(existing.created_at) < state.draft_materialize_map.ttl();
        if within_ttl {
            if existing.body_hash == body_hash {
                let response = MaterializeResponse {
                    module_id: ModuleId::from_user_workflow(&existing.workflow_id),
                    deployment_id: existing.deployment_id.clone(),
                    deployment_revision_id: existing.deployment_revision_id.clone(),
                };
                return Ok((StatusCode::OK, Json(ApiResponse::ok(response))).into_response());
            }
            return Err(ApiError::structured(
                StatusCode::CONFLICT,
                "module.draft_uuid_conflict",
                "draft uuid already materialized with a different body within the idempotency window",
            ));
        }
    }

    let workflow_id = format!("wfl_{}", Uuid::new_v4().simple());
    let now = Utc::now().to_rfc3339();
    let workflow = WorkflowRecord {
        id: workflow_id.clone(),
        title: body
            .display_name
            .clone()
            .unwrap_or_else(|| "Untitled Module".into()),
        version: "1.0.0".into(),
        inputs: None,
        outputs: None,
        nodes: serde_json::to_string(&body.workflow_payload).unwrap_or_else(|_| "[]".into()),
        edges: "[]".into(),
        stages: None,
        created_at: now.clone(),
        updated_at: now,
        user_edited_at: None,
        extension_id: None,
        extension_version: None,
        extension_version_first_seen: None,
    };
    state
        .db
        .insert_workflow(&workflow)
        .await
        .map_err(ApiError::from)?;

    let request = build_save_request(&workflow_id, &body);
    let mappers = DeploymentMappers::new(state.db.pool().clone());
    let repo = Arc::new(SqliteDeploymentRepository::new(mappers));
    let svc = DeploymentSaveService::new(repo);
    let (saved, _events) = svc
        .save(request)
        .await
        .map_err(|e| ApiError::Internal(format!("deployment save failed: {e}")))?;

    let entry = DraftEntry {
        workflow_id: workflow_id.clone(),
        deployment_id: saved.deployment_id.to_string(),
        deployment_revision_id: saved.revision_id.to_string(),
        body_hash,
        created_at: Instant::now(),
    };
    state
        .draft_materialize_map
        .insert(uuid_str, entry)
        .await;

    let response = MaterializeResponse {
        module_id: ModuleId::from_user_workflow(&workflow_id),
        deployment_id: saved.deployment_id.to_string(),
        deployment_revision_id: saved.revision_id.to_string(),
    };
    Ok((StatusCode::CREATED, Json(ApiResponse::ok(response))).into_response())
}

fn build_save_request(workflow_id: &str, body: &MaterializeRequest) -> SaveRequest {
    let display_name = body
        .display_name
        .clone()
        .unwrap_or_else(|| "Untitled Module".into());
    let kebab = display_name
        .chars()
        .map(|c| {
            if c.is_ascii_alphanumeric() {
                c.to_ascii_lowercase()
            } else {
                '-'
            }
        })
        .collect::<String>();
    let slug = format!("{kebab}-{}", Uuid::new_v4().simple());

    SaveRequest {
        display_name,
        slug,
        workspace_id: None,
        description: None,
        tags: Vec::new(),
        created_from_surface: "blank-module".into(),
        save_mode: "create".into(),
        source: SourceRef {
            workflow_id: Some(workflow_id.to_string()),
            workflow_version: Some("1.0.0".into()),
            recipe_id: None,
            recipe_version: None,
            extension_id: None,
            source_kind: "user".into(),
        },
        workflow_payload: body.workflow_payload.clone(),
        runtime_binding: None,
        model_binding: None,
        parameters: Vec::new(),
        artifacts: Vec::new(),
        mapping_state: MappingState::FullyMapped,
        ui_restore_json: None,
        execution_policy_json: None,
    }
}
