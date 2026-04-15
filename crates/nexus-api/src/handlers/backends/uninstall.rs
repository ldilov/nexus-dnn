use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use serde::Deserialize;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize, Default)]
pub struct UninstallQuery {
    #[serde(default)]
    pub force: bool,
}

pub async fn uninstall_runtime(
    State(state): State<AppState>,
    Path(install_id): Path<String>,
    Query(q): Query<UninstallQuery>,
) -> axum::response::Response {
    let pool = state.db.pool();
    let row =
        match nexus_backend_runtimes::runtime_installs_store::load_by_id(pool, &install_id).await {
            Ok(Some(r)) => r,
            Ok(None) => {
                return ApiResponse::<()>::not_found(format!("install {install_id} not found"))
                    .into_response();
            }
            Err(e) => return ApiResponse::<()>::internal(e.to_string()).into_response(),
        };

    let (dependents, live_leases) = collect_uninstall_blockers(&state, &install_id).await;
    if !q.force
        && let Some(resp) = block_if_dependents(&dependents, &live_leases)
    {
        return resp;
    }

    if q.force
        && let Some(spawner) = state.spawner.as_ref()
    {
        drain_leases(
            spawner,
            &state.backend_event_bus,
            &install_id,
            &row.family,
            &live_leases,
        )
        .await;
    }

    let path = std::path::Path::new(&row.install_root);
    // of silently discarding. Uninstall continues regardless — the DB delete is
    // the source of truth for "uninstalled".
    if let Err(e) =
        nexus_backend_runtimes::runtime_installs_store::remove_binary_directory(path).await
    {
        tracing::warn!(
            install_id = %row.install_id,
            path = %path.display(),
            error = %e,
            "remove_binary_directory failed"
        );
    }
    if let Err(e) =
        nexus_backend_runtimes::runtime_installs_store::delete_row(pool, &row.install_id).await
    {
        return ApiResponse::<()>::internal(e.to_string()).into_response();
    }
    let mut resp = ApiResponse::no_content().into_response();
    *resp.status_mut() = StatusCode::NO_CONTENT;
    resp
}

async fn collect_uninstall_blockers(
    state: &AppState,
    install_id: &str,
) -> (Vec<String>, Vec<String>) {
    let pool = state.db.pool();
    let dependents =
        nexus_backend_runtimes::runtime_installs_store::list_dependents(pool, install_id)
            .await
            .unwrap_or_default();
    let live_leases = match state.spawner.as_ref() {
        Some(s) => s.list_live_leases_for_install(install_id).await,
        None => Vec::new(),
    };
    (dependents, live_leases)
}

fn block_if_dependents(
    dependents: &[String],
    live_leases: &[String],
) -> Option<axum::response::Response> {
    if dependents.is_empty() && live_leases.is_empty() {
        return None;
    }
    let details = serde_json::json!({
        "dependents": dependents,
        "live_leases": live_leases,
        "hint": "retry with ?force=true",
    });
    Some(
        ApiResponse::<()>::err_with_details(
            axum::http::StatusCode::CONFLICT,
            "RUNTIME_IN_USE",
            "state",
            "runtime has active dependents".into(),
            details,
        )
        .into_response(),
    )
}

async fn drain_leases(
    spawner: &Arc<nexus_backend_runtimes::spawn::Spawner>,
    bus: &Arc<nexus_backend_runtimes::events::BroadcastPublisher>,
    install_id: &str,
    family: &str,
    live_leases: &[String],
) {
    use nexus_backend_runtimes::events::{BackendEvent, EventPublisher};
    let drains = live_leases
        .iter()
        .map(|lease_id| async move { (lease_id.clone(), spawner.shutdown(lease_id).await) });
    let results = futures_util::future::join_all(drains).await;
    for (lease_id, _outcome) in results {
        let evt = BackendEvent::new(
            "process.withdrawn",
            family,
            serde_json::json!({ "lease_id": lease_id }),
        )
        .with_install(install_id);
        bus.publish(evt).await;
    }
}
