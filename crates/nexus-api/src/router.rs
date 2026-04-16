use axum::Router;
use axum::extract::Request;
use axum::http::HeaderValue;
use axum::middleware::{self, Next};
use axum::response::Response;
use axum::routing::{get, post};
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::{DefaultMakeSpan, DefaultOnFailure, TraceLayer};

/// Tag responses on legacy `/api/v1/llm/backends/*` paths with RFC 8594
async fn deprecation_headers(req: Request, next: Next) -> Response {
    let is_legacy = req.uri().path().starts_with("/api/v1/llm/backends");
    let mut response = next.run(req).await;
    if is_legacy {
        let headers = response.headers_mut();
        headers.insert("Deprecation", HeaderValue::from_static("true"));
        headers.insert(
            "Sunset",
            HeaderValue::from_static("Wed, 13 May 2026 00:00:00 GMT"),
        );
        headers.insert(
            "Link",
            HeaderValue::from_static("</api/v1/backends>; rel=\"successor-version\""),
        );
    }
    response
}

use crate::AppState;
use crate::frontend;
use crate::handlers::{
    artifacts, backend_events_ws, backends, deployments, extensions, extensions_install, health,
    huggingface, metrics, modules, recipes, runs, storage_contributions, system, tools,
    ui_contributions, ui_layouts, workflows,
};
use crate::ws;

pub fn build(state: AppState) -> Router {
    let api_v1 = Router::new()
        .route("/health", get(health::health_check))
        .route("/metrics", get(metrics::get_metrics))
        .route("/extensions", get(extensions::list_extensions))
        .route("/extensions/{id}", get(extensions::get_extension))
        .route(
            "/extensions/{id}/reveal",
            post(extensions::reveal_extension_folder),
        )
        .route("/extensions/refresh", post(extensions::refresh_extensions))
        .route(
            "/extensions/{id}/enable",
            post(extensions::enable_extension),
        )
        .route(
            "/extensions/{id}/disable",
            post(extensions::disable_extension),
        )
        .route(
            "/extensions/{id}/storage",
            get(storage_contributions::get_storage_status),
        )
        .route(
            "/extensions/{id}/storage/validate",
            post(storage_contributions::validate_storage),
        )
        .route(
            "/extensions/{id}/storage/apply",
            post(storage_contributions::apply_storage),
        )
        .route(
            "/extensions/{id}/storage/verify",
            post(storage_contributions::verify_storage),
        )
        .route(
            "/extensions/{id}/storage/uninstall",
            post(storage_contributions::uninstall_storage),
        )
        .route(
            "/storage/namespaces",
            get(storage_contributions::list_namespaces),
        )
        .route("/operators", get(extensions::list_operators))
        .route("/operators/{id}", get(extensions::get_operator))
        .route("/recipes", get(recipes::list_recipes))
        .route("/recipes/{id}", get(recipes::get_recipe))
        .route(
            "/ui/contributions",
            get(ui_contributions::list_contributions),
        )
        .route(
            "/ui/contributions/viewers",
            get(ui_contributions::list_viewers),
        )
        .route(
            "/ui/contributions/commands",
            get(ui_contributions::list_commands),
        )
        .route(
            "/ui/contributions/inspectors",
            get(ui_contributions::list_inspectors),
        )
        .route(
            "/ui/contributions/widgets",
            get(ui_contributions::list_widgets),
        )
        .route("/ui/layouts", get(ui_layouts::list_layouts))
        .route("/ui/layouts/{id}", get(ui_layouts::get_layout))
        .route(
            "/workflows",
            post(workflows::create_workflow).get(workflows::list_workflows),
        )
        .route(
            "/workflows/validate",
            post(workflows::validate_workflow_only),
        )
        .route(
            "/workflows/validate-payload",
            post(workflows::validate_workflow_payload),
        )
        .route(
            "/workflows/{id}",
            get(workflows::get_workflow)
                .put(workflows::update_workflow)
                .delete(workflows::delete_workflow),
        )
        .route(
            "/workflows/{id}/graph",
            axum::routing::put(workflows::update_workflow_graph),
        )
        .route("/workflows/{id}/revert", post(workflows::revert_workflow))
        .route(
            "/workflows/{id}/canvas",
            get(workflows::get_workflow_canvas).put(workflows::put_workflow_canvas),
        )
        .route("/runs", post(runs::create_run).get(runs::list_runs))
        .route("/runs/{id}", get(runs::get_run))
        .route("/runs/{id}/cancel", post(runs::cancel_run))
        .route("/runs/{id}/retry", post(runs::retry_run))
        .route("/artifacts", get(artifacts::list_artifacts))
        .route("/artifacts/{id}", get(artifacts::get_artifact))
        .route("/artifacts/{id}/blob", get(artifacts::get_artifact_blob))
        .route(
            "/artifacts/{id}/content",
            get(artifacts::get_artifact_content),
        )
        .route(
            "/artifacts/{id}/lineage",
            get(artifacts::get_artifact_lineage),
        )
        .route("/system/info", get(system::system_info))
        .route("/tools", get(tools::list_tools))
        .route("/events", get(ws::events_ws))
        .route("/host-models", get(backends::list_host_models))
        .route("/host-models/resolve", post(backends::resolve_host_models))
        .route(
            "/host-models/{installId}/leases",
            post(backends::create_model_lease),
        )
        .route(
            "/host-models/leases/{leaseId}",
            axum::routing::delete(backends::release_model_lease),
        )
        .route("/backends", get(backends::list_host_runtimes))
        .route(
            "/backends/events",
            get(backend_events_ws::backend_events_ws),
        )
        .route(
            "/backends/{family}/parameters",
            get(backends::parameter_catalog),
        )
        .route("/backends/{installId}/lease", post(backends::create_lease))
        .route(
            "/backends/{installId}",
            axum::routing::delete(backends::uninstall_runtime),
        )
        .route(
            "/backends/leases/{leaseId}",
            axum::routing::delete(backends::release_lease),
        )
        .route("/llm/backends", get(backends::list))
        .route("/llm/backends/{backendId}", get(backends::detail))
        .route("/llm/backends/{backendId}/install", post(backends::install))
        .route(
            "/llm/backends/{backendId}/validate",
            post(backends::validate),
        )
        .route("/llm/backends/{backendId}/repair", post(backends::repair))
        .route(
            "/llm/backends/{backendId}/settings",
            get(backends::get_settings).put(backends::put_settings),
        )
        .route("/llm/backends/{backendId}/logs", get(backends::logs))
        .route(
            "/llm/backends/{backendId}/diagnostics",
            get(backends::diagnostics),
        )
        .route(
            "/llm/backends/{backendId}/load-state",
            get(huggingface::get_load_state),
        )
        .route("/huggingface/search", get(huggingface::search))
        .route("/huggingface/repos/{repoId}", get(huggingface::repo_detail))
        .route(
            "/extensions/{extId}/huggingface/models",
            get(huggingface::list_ext_models).post(huggingface::install_ext_model),
        )
        .route(
            "/extensions/{extId}/huggingface/tasks/{taskId}/cancel",
            post(huggingface::cancel_ext_task),
        )
        .route(
            "/extensions/{extId}/huggingface/models/{modelId}/load",
            post(huggingface::load_ext_model),
        )
        .route(
            "/extensions/{extId}/huggingface/models/{modelId}/hyperparameters",
            axum::routing::patch(huggingface::patch_ext_hyperparameters),
        );

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let api_v1 = api_v1.nest("/deployments", deployments::deployments_router());
    let api_v1 = api_v1.nest("/modules", modules::router());
    let api_v1 = api_v1.nest("/modules", modules::draft_router());
    let api_v1 = api_v1.nest("/extensions", extensions_install::router());

    Router::new()
        .nest("/api/v1", api_v1)
        .fallback(frontend::static_handler)
        .layer(middleware::from_fn(deprecation_headers))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::new().include_headers(false))
                .on_failure(DefaultOnFailure::new())
                .on_response(
                    |response: &axum::http::Response<_>,
                     latency: std::time::Duration,
                     _span: &tracing::Span| {
                        if response.status().is_server_error() {
                            tracing::error!(
                                status = %response.status(),
                                latency_ms = latency.as_millis() as u64,
                                "5xx response — see preceding handler-error event for details",
                            );
                        }
                    },
                ),
        )
        .layer(cors)
        .with_state(state)
}
