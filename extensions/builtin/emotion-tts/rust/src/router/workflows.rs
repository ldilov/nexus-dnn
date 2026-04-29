use std::sync::Arc;

use axum::extract::{Query, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::domain::{DeploymentId, EmotionTtsError, Result};
use crate::storage::repo_traits::WorkflowRow;
use crate::storage::Repos;
use crate::workflow_binding::{
    compute_customised, default_workflow, mappable_fields, unmappable_fields, RecipeField,
    WorkflowDocument, CURATED_NODES, WORKFLOW_TEMPLATE_ID,
};

#[derive(Clone)]
pub struct WorkflowsState {
    pub repos: Repos,
}

#[must_use]
pub fn router(repos: Repos) -> Router {
    Router::new()
        .route("/", get(fetch).put(put_workflow))
        .route("/default", get(fetch_default))
        .route("/catalog", get(fetch_catalog))
        .with_state(Arc::new(WorkflowsState { repos }))
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct FetchQuery {
    deployment_id: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkflowResponse {
    template_id: &'static str,
    deployment_id: String,
    workflow: WorkflowDocument,
    mappable_fields: Vec<RecipeField>,
    unmappable_fields: Vec<RecipeField>,
}

async fn fetch(State(state): State<Arc<WorkflowsState>>, Query(q): Query<FetchQuery>) -> Response {
    match fetch_impl(&state, &q.deployment_id).await {
        Ok(body) => (StatusCode::OK, Json(body)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn fetch_impl(state: &WorkflowsState, raw_dep: &str) -> Result<WorkflowResponse> {
    let dep = DeploymentId::try_from(raw_dep)?;
    let doc = load_or_seed(state, &dep).await?;
    Ok(build_response(&dep, doc))
}

async fn load_or_seed(state: &WorkflowsState, dep: &DeploymentId) -> Result<WorkflowDocument> {
    if let Some(row) = state.repos.workflows.get(dep).await? {
        let mut doc: WorkflowDocument = serde_json::from_str(&row.document_json)
            .map_err(|e| EmotionTtsError::internal(format!("corrupt workflow document: {e}")))?;
        doc.customised = compute_customised(&doc);
        return Ok(doc);
    }
    let seeded = default_workflow();
    persist(state, dep, &seeded).await?;
    Ok(seeded)
}

async fn persist(state: &WorkflowsState, dep: &DeploymentId, doc: &WorkflowDocument) -> Result<()> {
    let document_json = serde_json::to_string(doc)
        .map_err(|e| EmotionTtsError::internal(format!("serialise workflow: {e}")))?;
    let row = WorkflowRow {
        deployment_id: dep.clone(),
        document_json,
        customised: compute_customised(doc),
        updated_at: Utc::now().timestamp(),
    };
    state.repos.workflows.upsert(&row).await
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PutBody {
    deployment_id: String,
    workflow: Value,
}

async fn put_workflow(
    State(state): State<Arc<WorkflowsState>>,
    Json(body): Json<PutBody>,
) -> Response {
    match put_impl(&state, body).await {
        Ok(resp) => (StatusCode::OK, Json(resp)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn put_impl(state: &WorkflowsState, body: PutBody) -> Result<WorkflowResponse> {
    let dep = DeploymentId::try_from(body.deployment_id.as_str())?;
    let mut doc: WorkflowDocument = serde_json::from_value(body.workflow)
        .map_err(|e| EmotionTtsError::validation(format!("invalid workflow document: {e}")))?;
    doc.customised = compute_customised(&doc);
    persist(state, &dep, &doc).await?;
    Ok(build_response(&dep, doc))
}

fn build_response(dep: &DeploymentId, doc: WorkflowDocument) -> WorkflowResponse {
    WorkflowResponse {
        template_id: WORKFLOW_TEMPLATE_ID,
        deployment_id: dep.as_str().to_string(),
        mappable_fields: mappable_fields(&doc),
        unmappable_fields: unmappable_fields(&doc),
        workflow: doc,
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct DefaultResponse {
    template_id: &'static str,
    workflow: WorkflowDocument,
    mappable_fields: Vec<RecipeField>,
    unmappable_fields: Vec<RecipeField>,
}

async fn fetch_default() -> Response {
    let doc = default_workflow();
    let body = DefaultResponse {
        template_id: WORKFLOW_TEMPLATE_ID,
        mappable_fields: mappable_fields(&doc),
        unmappable_fields: unmappable_fields(&doc),
        workflow: doc,
    };
    (StatusCode::OK, Json(body)).into_response()
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct CatalogEntry {
    node_id: &'static str,
    operator_id: &'static str,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct CatalogResponse {
    template_id: &'static str,
    nodes: Vec<CatalogEntry>,
    recipe_fields: Vec<FieldEntry>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct FieldEntry {
    field: RecipeField,
    targets: &'static [&'static str],
}

async fn fetch_catalog() -> Response {
    let body = CatalogResponse {
        template_id: WORKFLOW_TEMPLATE_ID,
        nodes: CURATED_NODES
            .iter()
            .map(|(id, op)| CatalogEntry {
                node_id: *id,
                operator_id: *op,
            })
            .collect(),
        recipe_fields: RecipeField::ALL
            .iter()
            .copied()
            .map(|f| FieldEntry {
                field: f,
                targets: f.targets(),
            })
            .collect(),
    };
    (StatusCode::OK, Json(body)).into_response()
}
