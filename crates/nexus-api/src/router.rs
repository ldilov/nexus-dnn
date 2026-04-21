use axum::Router;
use axum::extract::Request;
use axum::http::HeaderValue;
use axum::middleware::{self, Next};
use axum::response::Response;
use axum::routing::{get, post};
use tower_http::compression::CompressionLayer;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::{DefaultMakeSpan, DefaultOnFailure, TraceLayer};

/// Tag responses on legacy paths with RFC 8594 Deprecation / Sunset
/// headers. Currently covers:
/// - `/api/v1/llm/backends/*` — succeeded by `/api/v1/backends` (spec 011)
/// - `/api/v1/huggingface/search` — succeeded by `/api/v1/model-store/search` (spec 025)
async fn deprecation_headers(req: Request, next: Next) -> Response {
    let path = req.uri().path().to_owned();
    let mut response = next.run(req).await;

    if path.starts_with("/api/v1/llm/backends") {
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
    } else if path == "/api/v1/huggingface/search"
        || path.starts_with("/api/v1/huggingface/search?")
        || path.starts_with("/api/v1/huggingface/repos/")
    {
        let headers = response.headers_mut();
        headers.insert("Deprecation", HeaderValue::from_static("true"));
        headers.insert(
            "Sunset",
            HeaderValue::from_static("Sun, 19 Jul 2026 00:00:00 GMT"),
        );
        headers.insert(
            "Link",
            HeaderValue::from_static(
                "</api/v1/model-store/search>; rel=\"successor-version\"",
            ),
        );
    }

    response
}

use crate::AppState;
use crate::frontend;
use crate::handlers;
use crate::handlers::{
    artifacts, backend_events_ws, backends, deployments, extension_ui, extensions, extensions_install, health,
    huggingface, metrics, modules, recipes, runs, storage_contributions, system, tools,
    ui_components, ui_contributions, ui_layouts, workflows,
};
use crate::ws;

pub fn build(state: AppState) -> Router {
    ui_components::validate_catalog(&ui_components::catalog_entries())
        .expect("UI component catalog failed validation at startup");
    let api_v1 = Router::new()
        .route("/health", get(health::health_check))
        .route("/metrics", get(metrics::get_metrics))
        .route("/ui/components", get(ui_components::list_ui_components))
        .route(
            "/ui/extension-components",
            get(extension_ui::list_extension_components),
        )
        .route(
            "/extensions/{id}/ui/{*path}",
            get(extension_ui::serve_extension_asset),
        )
        .route(
            "/extensions/{id}/reload",
            post(extension_ui::reload_extension),
        )
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
        .route(
            "/host-models",
            get(backends::list_host_models).post(backends::install_host_model),
        )
        .route("/host-models/resolve", post(backends::resolve_host_models))
        .route(
            "/host-models/{installId}/dependents",
            get(backends::list_host_model_dependents),
        )
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
            "/backends/runtime-defaults",
            get(backends::get_runtime_defaults),
        )
        .route(
            "/backends/events",
            get(backend_events_ws::backend_events_ws),
        )
        .route(
            "/backends/{family}/parameters",
            get(backends::parameter_catalog),
        )
        // Model-first runtime spawn: host picks the right runtime for the
        // model's family, validates hyperparameters against the catalog,
        // and passes `--model <path>` on the command line. Single call for
        // extensions — no need to wire up /lease themselves.
        .route("/backends/load-model", post(backends::load_model))
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
        .route(
            "/llm/backends/{backendId}/variants",
            get(backends::variants),
        )
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
        )
        .route(
            "/model-store/backends",
            get(handlers::model_store::backends::list_backends),
        )
        .route(
            "/model-store/installed",
            get(handlers::model_store::installed::get_installed),
        )
        .route(
            "/extensions/local-llm/chat/threads",
            get(handlers::extensions_local_llm::chat::list_threads)
                .post(handlers::extensions_local_llm::chat::create_thread),
        )
        .route(
            "/extensions/local-llm/chat/threads/{thread_id}/generation_settings",
            get(handlers::extensions_local_llm::chat::get_generation_settings)
                .put(handlers::extensions_local_llm::chat::set_generation_settings),
        )
        .route(
            "/extensions/local-llm/chat/threads/{thread_id}/active_model",
            get(handlers::extensions_local_llm::chat::get_active_model)
                .put(handlers::extensions_local_llm::chat::set_active_model)
                .delete(handlers::extensions_local_llm::chat::unload_active_model),
        )
        .route(
            "/extensions/local-llm/chat/threads/{thread_id}/active_model/status",
            get(handlers::extensions_local_llm::chat::get_active_model_status),
        )
        .route(
            "/extensions/local-llm/chat/threads/{thread_id}/messages",
            post(handlers::extensions_local_llm::chat::send_message),
        )
        .route(
            "/model-store/search",
            get(handlers::model_store::search::search),
        )
        .route(
            "/model-store/models/{familyId}",
            get(handlers::model_store::detail::get_family),
        )
        .route(
            "/model-store/downloads",
            post(handlers::model_store::downloads::create_download),
        )
        .route(
            "/model-store/downloads/{jobId}",
            get(handlers::model_store::downloads::get_download_status),
        )
        .route(
            "/model-store/downloads/{jobId}/pause",
            post(handlers::model_store::downloads::pause_download),
        )
        .route(
            "/model-store/downloads/{jobId}/resume",
            post(handlers::model_store::downloads::resume_download),
        )
        .route(
            "/model-store/settings/hf-token",
            get(handlers::model_store::settings::get_hf_token_status)
                .put(handlers::model_store::settings::set_hf_token)
                .delete(handlers::model_store::settings::clear_hf_token),
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
        .layer(
            CompressionLayer::new()
                .gzip(true)
                .br(true)
                .quality(tower_http::CompressionLevel::Fastest),
        )
        .with_state(state)
}
