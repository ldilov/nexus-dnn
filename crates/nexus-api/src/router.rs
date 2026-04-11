use axum::Router;
use axum::routing::{get, post};
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

use crate::AppState;
use crate::frontend;
use crate::handlers::{artifacts, extensions, health, recipes, runs, system, tools, ui_contributions, workflows};
use crate::ws;

pub fn build(state: AppState) -> Router {
    let api_v1 = Router::new()
        .route("/health", get(health::health_check))
        .route("/extensions", get(extensions::list_extensions))
        .route("/extensions/{id}", get(extensions::get_extension))
        .route("/extensions/refresh", post(extensions::refresh_extensions))
        .route(
            "/extensions/{id}/enable",
            post(extensions::enable_extension),
        )
        .route(
            "/extensions/{id}/disable",
            post(extensions::disable_extension),
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
        .route(
            "/workflows",
            post(workflows::create_workflow).get(workflows::list_workflows),
        )
        .route("/workflows/validate", post(workflows::validate_workflow_only))
        .route(
            "/workflows/{id}",
            get(workflows::get_workflow)
                .put(workflows::update_workflow)
                .delete(workflows::delete_workflow),
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
        .route("/events", get(ws::events_ws));

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .nest("/api/v1", api_v1)
        .fallback(frontend::static_handler)
        .layer(TraceLayer::new_for_http())
        .layer(cors)
        .with_state(state)
}
