use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde::Serialize;

use crate::workflow_binding::{
    default_workflow, mappable_fields, unmappable_fields, RecipeField, WorkflowDocument,
    CURATED_NODES, WORKFLOW_TEMPLATE_ID,
};

#[must_use]
pub fn router() -> Router {
    Router::new()
        .route("/default", get(fetch_default))
        .route("/catalog", get(fetch_catalog))
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
            .map(|(id, op)| CatalogEntry { node_id: *id, operator_id: *op })
            .collect(),
        recipe_fields: RecipeField::ALL
            .iter()
            .copied()
            .map(|f| FieldEntry { field: f, targets: f.targets() })
            .collect(),
    };
    (StatusCode::OK, Json(body)).into_response()
}
