use axum::Router;
use axum::extract::Request;
use axum::http::HeaderValue;
use axum::middleware::{self, Next};
use axum::response::Response;
use axum::routing::{get, patch, post};
use tower_http::catch_panic::CatchPanicLayer;
use tower_http::compression::CompressionLayer;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::{DefaultMakeSpan, DefaultOnFailure, TraceLayer};
use tracing::Instrument;

/// Header used to surface the per-request correlation id back to the
/// caller. Echoes any `x-request-id` header the client supplied (so
/// upstream proxies/clients keep their own id), or a freshly minted
/// ULID when absent.
const REQUEST_ID_HEADER: &str = "x-request-id";

/// Per-request correlation middleware. Generates (or echoes) a ULID,
/// wraps every downstream handler invocation in a `tracing` span
/// carrying `request_id` + `method` + `path` fields, and stamps the
/// id back into the response as `x-request-id`.
///
/// Every log line emitted by ANY handler — host or extension — during
/// this request inherits the span's fields, so post-mortem grep is
/// `grep request_id=01KQXXX` and the entire request's story shows up,
/// including downstream RPC spans (see
/// `nexus_backend_runtimes::generic::leases::stdio_lease`).
async fn request_id_middleware(mut req: Request, next: Next) -> Response {
    let request_id = req
        .headers()
        .get(REQUEST_ID_HEADER)
        .and_then(|v| v.to_str().ok())
        .map(str::to_string)
        .unwrap_or_else(|| ulid::Ulid::new().to_string());

    // Make the id observable to handlers that want to read it without
    // depending on the tracing span.
    if let Ok(value) = HeaderValue::from_str(&request_id) {
        req.headers_mut().insert(REQUEST_ID_HEADER, value);
    }

    let method = req.method().clone();
    let path = req.uri().path().to_string();
    let span = tracing::info_span!(
        "http_request",
        request_id = %request_id,
        method = %method,
        path = %path,
    );

    let started = std::time::Instant::now();
    tracing::debug!(target: "nexus_api::request", "started");
    let mut response = async move { next.run(req).await }
        .instrument(span.clone())
        .await;
    let elapsed_ms = started.elapsed().as_millis() as u64;

    // Stamp the id onto the response for client-side correlation.
    if let Ok(value) = HeaderValue::from_str(&request_id) {
        response.headers_mut().insert(REQUEST_ID_HEADER, value);
    }

    let _enter = span.enter();
    let status = response.status();
    // Threshold above which a 2xx is interesting enough to deserve `info`.
    // Anything faster is per-second polling chatter (`/metrics`,
    const SLOW_2XX_MS: u64 = 100;
    if status.is_server_error() {
        tracing::error!(target: "nexus_api::request",
            status = %status.as_u16(),
            elapsed_ms,
            "completed (5xx)"
        );
    } else if status.is_client_error() {
        tracing::warn!(target: "nexus_api::request",
            status = %status.as_u16(),
            elapsed_ms,
            "completed (4xx)"
        );
    } else if elapsed_ms >= SLOW_2XX_MS {
        tracing::info!(target: "nexus_api::request",
            status = %status.as_u16(),
            elapsed_ms,
            "completed (slow)"
        );
    } else {
        tracing::debug!(target: "nexus_api::request",
            status = %status.as_u16(),
            elapsed_ms,
            "completed"
        );
    }
    response
}

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
            HeaderValue::from_static("</api/v1/model-store/search>; rel=\"successor-version\""),
        );
    }

    response
}

use crate::AppState;
use crate::extension_router;
use crate::frontend;
use crate::handlers;
use crate::handlers::{
    artifacts, backend_events_ws, backend_runtimes, backends, deployments, desktop,
    draft_suggestions, extension_dependencies, extension_settings, extension_ui, extensions,
    extensions_install, health, host, huggingface, metrics, modules, recipes, runs,
    storage_contributions, system, text_completion, tools, ui_components, ui_contributions,
    ui_layouts, workflows,
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
            "/extensions/{id}/dependencies",
            get(extension_dependencies::list_dependencies),
        )
        .route(
            "/extensions/{id}/install",
            post(extension_dependencies::start_install),
        )
        .route(
            "/extensions/{id}/install/steps/{step_id}/retry",
            post(extension_dependencies::retry_step),
        )
        .route(
            "/extensions/{id}/install/cancel",
            post(extension_dependencies::cancel_install),
        )
        // Spec 054 G5 — host-owned uninstall overlay. Generic by `:id`:
        // releases the extension's leases, removes its runtime/venv install +
        .route(
            "/extensions/{id}/uninstall",
            post(extension_dependencies::uninstall_extension),
        )
        .route(
            "/extensions/{id}/settings/idle_timeout",
            patch(extension_settings::idle_timeout::patch_idle_timeout),
        )
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
        // P0 is the sole registrar of the /workflows/{id}/versions[/{version}]
        // subtree; the adjacent slot is reserved for P6 exposable-targets.
        .route(
            "/workflows/{id}/versions",
            get(workflows::list_workflow_versions),
        )
        .route(
            "/workflows/{id}/versions/{version}",
            get(workflows::get_workflow_version),
        )
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
        .route("/events/sse", get(host::events_sse::stream_events_sse))
        .route("/desktop/focus", post(desktop::focus::focus))
        .route(
            "/host-models",
            get(backends::list_host_models).post(backends::install_host_model),
        )
        .route("/host-models/resolve", post(backends::resolve_host_models))
        .route(
            "/host-models/register-existing",
            post(backends::register_existing_host_model),
        )
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
        // spec 032 — generic backend-runtime catalog (additive; coexists
        // with the legacy `/backends/*` surface)
        .route("/backend-runtimes", get(backend_runtimes::list::list))
        .route(
            "/backend-runtimes/{runtime_id}",
            get(backend_runtimes::get::get),
        )
        .route(
            "/backend-runtimes/{runtime_id}/install",
            post(backend_runtimes::install::install),
        )
        .route(
            "/backend-runtime-installs",
            get(backend_runtimes::installs_list::list),
        )
        .route(
            "/backend-runtime-installs/{install_id}",
            get(backend_runtimes::installs_get::get)
                .delete(backend_runtimes::installs_delete::delete),
        )
        .route(
            "/backend-runtime-installs/{install_id}/progress",
            get(backend_runtimes::installs_progress::progress),
        )
        .route(
            "/backend-runtime-installs/{install_id}/health",
            get(backend_runtimes::installs_health::get),
        )
        .route(
            "/backend-runtime-installs/{install_id}/retry",
            post(backend_runtimes::installs_retry::retry),
        )
        .route(
            "/backend-runtime-installs/{install_id}/start",
            post(backend_runtimes::installs_start::start),
        )
        .route(
            "/backend-runtime-installs/{install_id}/stop",
            post(backend_runtimes::installs_stop::stop),
        )
        .route(
            "/backend-runtime-installs/{install_id}/restart",
            post(backend_runtimes::installs_restart::restart),
        )
        .route(
            "/backend-runtime-leases",
            get(backend_runtimes::leases_list::list),
        )
        .route(
            "/backend-runtime-leases/{lease_id}",
            get(backend_runtimes::leases_get::get).delete(backend_runtimes::leases_delete::delete),
        )
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
            "/model-store/installed/{artifactId}",
            axum::routing::delete(handlers::model_store::installed::delete_installed),
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
            "/model-store/downloads/{jobId}/cancel",
            post(handlers::model_store::downloads::cancel_download),
        )
        .route(
            "/model-store/resolve-url",
            post(handlers::model_store::resolve::resolve_url),
        )
        .route(
            "/model-store/upload",
            post(handlers::model_store::upload::upload_model)
                .layer(axum::extract::DefaultBodyLimit::disable()),
        )
        .route(
            "/model-store/settings/hf-token",
            get(handlers::model_store::settings::get_hf_token_status)
                .put(handlers::model_store::settings::set_hf_token)
                .delete(handlers::model_store::settings::clear_hf_token),
        )
        .route(
            "/model-store/settings/civitai-token",
            get(handlers::model_store::settings::get_civitai_token_status)
                .put(handlers::model_store::settings::set_civitai_token)
                .delete(handlers::model_store::settings::clear_civitai_token),
        )
        // Spec 054 G2 — host-owned, generic model-store revalidate sweep:
        // prunes install-map rows whose on-disk files vanished (self-heal).
        .route(
            "/host/models/revalidate",
            post(host::models_revalidate::revalidate_models),
        );

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let api_v1 = api_v1.nest("/deployments", deployments::deployments_router());
    let api_v1 = api_v1.nest("/modules", modules::router());
    let api_v1 = api_v1.nest("/modules", modules::draft_router());
    let api_v1 = api_v1.nest("/extensions", extensions_install::router());

    // Draft AI suggestion stream (spec 037 / Phase 8 + T078b). Mounted
    // under the host root because the routes already include
    let catalog_repo: std::sync::Arc<
        dyn nexus_backend_runtimes::generic::catalog::BackendRuntimeCatalogRepo,
    > = std::sync::Arc::new(
        nexus_backend_runtimes::generic::catalog::SqliteCatalogRepo::new(state.db.pool().clone()),
    );
    let installs_repo: std::sync::Arc<
        dyn nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo,
    > = std::sync::Arc::new(
        nexus_backend_runtimes::generic::installs::SqliteInstallsRepo::new(state.db.pool().clone()),
    );
    let draft_suggestions_provider: std::sync::Arc<
        dyn draft_suggestions::SuggestionStreamProvider,
    > = std::sync::Arc::new(
        draft_suggestions::LeaseBackedStreamProvider::from_components(
            catalog_repo,
            installs_repo,
            state.lease_manager.clone(),
        ),
    );
    let draft_suggestions_router: Router<AppState> =
        draft_suggestions::router::<AppState>(draft_suggestions_provider);

    // Spec 049 — generic text-completion broker. Buffered request/
    // response over the canonical text-completion JSON-RPC contract.
    let text_completion_catalog: std::sync::Arc<
        dyn nexus_backend_runtimes::generic::catalog::BackendRuntimeCatalogRepo,
    > = std::sync::Arc::new(
        nexus_backend_runtimes::generic::catalog::SqliteCatalogRepo::new(state.db.pool().clone()),
    );
    let text_completion_installs: std::sync::Arc<
        dyn nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo,
    > = std::sync::Arc::new(
        nexus_backend_runtimes::generic::installs::SqliteInstallsRepo::new(state.db.pool().clone()),
    );
    let text_completion_leases: std::sync::Arc<
        dyn nexus_backend_runtimes::generic::leases::repo::BackendRuntimeLeasesRepo,
    > = std::sync::Arc::new(
        nexus_backend_runtimes::generic::leases::sqlite::SqliteLeasesRepo::new(
            state.db.pool().clone(),
        ),
    );
    let text_completion_family_handlers = std::sync::Arc::new(state.family_handlers.clone());
    let text_completion_service: std::sync::Arc<dyn text_completion::TextCompletionService> =
        std::sync::Arc::new(
            text_completion::LeaseBackedTextCompletion::from_components_with_acquirer(
                text_completion_catalog,
                text_completion_installs,
                text_completion_leases,
                text_completion_family_handlers,
                state.lease_manager.clone(),
            ),
        );
    let text_completion_router: Router<AppState> =
        text_completion::router::<AppState>(text_completion_service);
    let api_v1 = api_v1
        .route(
            "/extensions/{ext_id}/{*rest}",
            get(extension_router::dispatch)
                .post(extension_router::dispatch)
                .put(extension_router::dispatch)
                .patch(extension_router::dispatch)
                .delete(extension_router::dispatch),
        )
        .route(
            "/extensions/{ext_id}/",
            get(extension_router::dispatch_root)
                .post(extension_router::dispatch_root)
                .put(extension_router::dispatch_root)
                .patch(extension_router::dispatch_root)
                .delete(extension_router::dispatch_root),
        );

    let api_host = Router::new()
        .route(
            "/models/{*rest}",
            get(host::models_metadata::get_installed_model_metadata),
        )
        .route("/cpu/cores", get(host::cpu_cores::get_cpu_cores))
        .route("/runs/events", get(host::run_events::stream_run_events))
        .route(
            "/runs/{run_id}/events",
            get(host::run_events::get_run_events_window),
        )
        .route(
            "/runs/buckets",
            get(host::run_events::get_run_events_buckets),
        )
        .route("/metrics/stream", get(host::metrics_stream::stream_metrics))
        .route("/gc/free-all", post(host::gc::free_all));

    Router::new()
        .nest("/api/v1", api_v1)
        .nest("/api/host", api_host)
        .merge(draft_suggestions_router)
        .merge(text_completion_router)
        .fallback(frontend::static_handler)
        .layer(CatchPanicLayer::new())
        // request_id MUST be the outermost user-visible layer so the
        // span is active for everything inside it (including
        .layer(middleware::from_fn(request_id_middleware))
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
