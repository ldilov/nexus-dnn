//! Chat surface for the LLM extension — migrated from the host's
//! `crates/nexus-api/src/handlers/extensions_local_llm/` directory in
//! spec 030 CP2. Mounted by `crate::router::build_router` alongside the
//! spec 029 chat-history routes.

pub mod envelope;
pub mod handlers;
pub mod inference_cancel;
pub mod load_registry;
pub mod resources;

pub use inference_cancel::InferenceCancelRegistry;
pub use load_registry::{LoadState, ModelLoadRegistry};
pub use resources::ChatHandlerResources;

use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

/// Build the chat sub-router. Mounts only the routes that have no
/// spec-029 equivalent: generation settings, active-model binding, and
/// active-model load status. Spec 029's chat-history router owns
/// `/chat/threads` (CRUD) and `/chat/threads/{id}/messages` (append/list)
/// — those URLs are NOT remounted here to avoid axum
/// "overlapping method route" panics. The legacy host-mounted
/// `create_thread` / `list_threads` / `send_message` handlers are
/// retired in CP2; spec 029's flat-shaped chat-history endpoints
/// replace them. Spec 037 retired the standalone host-side chat layout
/// components in favour of the shared `ChatSurface` plus a host adapter
/// that bridges these endpoints onto its props contract.
pub fn build_chat_router(resources: Arc<ChatHandlerResources>) -> Router {
    Router::new()
        .route(
            "/chat/threads/{thread_id}/generation_settings",
            get(handlers::get_generation_settings).put(handlers::set_generation_settings),
        )
        .route(
            "/chat/threads/{thread_id}/active_model",
            get(handlers::get_active_model)
                .put(handlers::set_active_model)
                .delete(handlers::unload_active_model),
        )
        .route(
            "/chat/threads/{thread_id}/active_model/status",
            get(handlers::get_active_model_status),
        )
        .route(
            "/chat/threads/{thread_id}/inference/cancel",
            post(handlers::cancel_inference),
        )
        .route(
            "/chat/available_models",
            get(handlers::list_available_models),
        )
        .route("/chat/runtime_status", get(handlers::get_runtime_status))
        .with_state(resources)
}
