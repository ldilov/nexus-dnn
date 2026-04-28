//! Spec 034 US5 / T102 — model-family registry HTTP surface.
//!
//! The handlers are side-effect-free beyond the reconciliation probe they
//! delegate to the caller. Extensions never mutate the host model-store
//! from this surface — GETs only — so we can share the registry as a
//! plain clone-on-read `Arc`.

use std::sync::Arc;

use axum::extract::{Path, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use axum::routing::get;
use axum::Router;
use serde_json::{json, Value};

use crate::domain::{EmotionTtsError, Result};
use crate::families::{FamilyEntry, FamilyRegistry, FamilyStatusSnapshot};

pub type ReconcileResult = std::result::Result<FamilyStatusSnapshot, EmotionTtsError>;

/// A boxed async closure that reconciles a single family descriptor
/// against the host model-store. Dispatcher wiring (T120 backlog)
/// supplies a real implementation; router contract tests supply mocks.
pub type BoxReconciler = Arc<
    dyn Fn(&str) -> futures::future::BoxFuture<'static, ReconcileResult> + Send + Sync,
>;

#[derive(Clone)]
pub struct FamiliesState {
    pub registry: Arc<FamilyRegistry>,
    pub reconciler: BoxReconciler,
}

pub fn router(state: FamiliesState) -> Router {
    Router::new()
        .route("/families", get(list))
        .route("/families/{family_id}", get(fetch))
        .route("/families/{family_id}/install-hint", get(install_hint))
        .with_state(state)
}

/// Build a default "always not_installed" reconciler — used when the
/// host didn't supply one (e.g. during early boot). The UI renders an
/// Install button for every family until the host probes are live.
#[must_use]
pub fn default_reconciler() -> BoxReconciler {
    use futures::FutureExt;

    Arc::new(|_id: &str| {
        async { Ok(FamilyStatusSnapshot::not_installed()) }.boxed()
    })
}

async fn list(State(state): State<FamiliesState>) -> Response {
    match list_impl(&state).await {
        Ok(v) => (StatusCode::OK, Json(v)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn list_impl(state: &FamiliesState) -> Result<Value> {
    let reconciler = state.reconciler.clone();
    let entries = state
        .registry
        .reconcile(|desc| {
            let reconciler = reconciler.clone();
            let id = desc.family_id.clone();
            async move { reconciler(&id).await }
        })
        .await?;

    let families: Vec<Value> = entries.iter().map(family_entry_json).collect();
    Ok(json!({ "families": families }))
}

async fn fetch(
    State(state): State<FamiliesState>,
    Path(id): Path<String>,
) -> Response {
    match fetch_impl(&state, &id).await {
        Ok(v) => (StatusCode::OK, Json(v)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn fetch_impl(state: &FamiliesState, family_id: &str) -> Result<Value> {
    let desc = state
        .registry
        .get(family_id)
        .ok_or_else(|| EmotionTtsError::not_found(format!("family {family_id}")))?;
    let snap = (state.reconciler)(family_id).await?;
    let entry = FamilyEntry {
        descriptor: desc.clone(),
        status: snap.status,
        status_detail: snap.detail,
    };
    Ok(family_entry_json(&entry))
}

async fn install_hint(
    State(state): State<FamiliesState>,
    Path(id): Path<String>,
) -> Response {
    match install_hint_impl(&state, &id).await {
        Ok(v) => (StatusCode::OK, Json(v)).into_response(),
        Err(err) => err.into_response(),
    }
}

async fn install_hint_impl(state: &FamiliesState, family_id: &str) -> Result<Value> {
    let desc = state
        .registry
        .get(family_id)
        .ok_or_else(|| EmotionTtsError::not_found(format!("family {family_id}")))?;
    // URL-encode the model-family ref — the host's model-store accepts
    // percent-encoded slashes in its /families/:ref path segment.
    let encoded = urlencoding::encode(&desc.model_family_ref);
    Ok(json!({
        "modelFamilyRef": desc.model_family_ref,
        "hostEndpoint": format!("/api/v1/model-store/families/{encoded}/download"),
    }))
}

fn family_entry_json(entry: &FamilyEntry) -> Value {
    json!({
        "familyId": entry.descriptor.family_id,
        "displayName": entry.descriptor.display_name,
        "modelFamilyRef": entry.descriptor.model_family_ref,
        "engineVersionConstraint": entry.descriptor.engine_version_constraint,
        "supportedLanguages": entry.descriptor.supported_languages,
        "expectedArtifacts": entry.descriptor.expected_artifacts,
        "status": entry.status,
        "statusDetail": entry.status_detail,
        "defaultGeneration": entry.descriptor.default_generation,
    })
}
