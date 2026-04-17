use axum::extract::{Path, State};
use axum::response::IntoResponse;
use serde::Serialize;

use crate::AppState;
use crate::envelope::ApiResponse;
use nexus_backend_runtimes::manifest::variants::BackendVariantCatalog;
use nexus_backend_runtimes::resolver::MachineDescriptor;
use nexus_backend_runtimes::state::RuntimeCardState;

use super::{impl_status_str, map_error, registry, unwired};

#[derive(Debug, Serialize)]
pub struct BackendSummary {
    pub id: String,
    pub display_name: String,
    pub implementation_status: String,
    pub card_state: RuntimeCardState,
    pub install: Option<serde_json::Value>,
    pub supported_profiles_on_this_machine: Vec<String>,
    pub last_failure_category: Option<String>,
    pub unavailable_reason: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct BackendListResponse {
    pub backends: Vec<BackendSummary>,
    pub summary: BackendSummaryChips,
}

#[derive(Debug, Serialize, Default)]
pub struct BackendSummaryChips {
    pub installed: u32,
    pub validated: u32,
    pub issues: u32,
}

pub async fn list(State(state): State<AppState>) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let machine = MachineDescriptor::detect().await;
    let mut out = Vec::new();
    let mut chips = BackendSummaryChips::default();
    for adapter in registry.all() {
        match adapter.current_summary(&machine).await {
            Ok(summary) => {
                if summary.install.is_some() {
                    chips.installed += 1;
                }
                match summary.card_state {
                    RuntimeCardState::Ready => chips.validated += 1,
                    RuntimeCardState::Broken => chips.issues += 1,
                    _ => {}
                }
                let (status_label, reason) = impl_status_str(&summary.implementation_status);
                out.push(BackendSummary {
                    id: summary.id,
                    display_name: summary.display_name,
                    implementation_status: status_label.into(),
                    card_state: summary.card_state,
                    install: summary
                        .install
                        .as_ref()
                        .map(|m| serde_json::to_value(m).unwrap_or(serde_json::Value::Null)),
                    supported_profiles_on_this_machine: summary
                        .supported_profiles
                        .iter()
                        .map(|p| p.as_wire().to_string())
                        .collect(),
                    last_failure_category: summary.last_failure_category,
                    unavailable_reason: reason.or(summary.unavailable_reason),
                });
            }
            Err(err) => return map_error(err).into_response(),
        }
    }
    ApiResponse::ok(BackendListResponse {
        backends: out,
        summary: chips,
    })
    .into_response()
}

pub async fn variants(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    let machine = MachineDescriptor::detect().await;
    match adapter.list_variants(&machine).await {
        Ok(catalog) => ApiResponse::ok(BackendVariantsEnvelope::from(catalog)).into_response(),
        Err(err) => map_error(err).into_response(),
    }
}

#[derive(Debug, Serialize)]
pub struct BackendVariantsEnvelope {
    pub variants: Vec<nexus_backend_runtimes::manifest::variants::BackendVariant>,
    pub recommended_release_id: Option<String>,
}

impl From<BackendVariantCatalog> for BackendVariantsEnvelope {
    fn from(c: BackendVariantCatalog) -> Self {
        Self {
            variants: c.variants,
            recommended_release_id: c.recommended_release_id,
        }
    }
}

pub async fn detail(
    State(state): State<AppState>,
    Path(backend_id): Path<String>,
) -> axum::response::Response {
    let Some(registry) = registry(&state) else {
        return unwired().into_response();
    };
    let Some(adapter) = registry.get(&backend_id) else {
        return ApiResponse::<()>::not_found(format!("backend {backend_id} not found"))
            .into_response();
    };
    let machine = MachineDescriptor::detect().await;
    match adapter.current_summary(&machine).await {
        Ok(summary) => {
            let (status_label, reason) = impl_status_str(&summary.implementation_status);
            ApiResponse::ok(BackendSummary {
                id: summary.id,
                display_name: summary.display_name,
                implementation_status: status_label.into(),
                card_state: summary.card_state,
                install: summary
                    .install
                    .as_ref()
                    .map(|m| serde_json::to_value(m).unwrap_or(serde_json::Value::Null)),
                supported_profiles_on_this_machine: summary
                    .supported_profiles
                    .iter()
                    .map(|p| p.as_wire().to_string())
                    .collect(),
                last_failure_category: summary.last_failure_category,
                unavailable_reason: reason.or(summary.unavailable_reason),
            })
            .into_response()
        }
        Err(err) => map_error(err).into_response(),
    }
}
