pub mod messages;
pub mod threads;

use crate::chat::{ChatHandlerResources, build_chat_router};
use crate::chat_history::ChatHistoryStore;
use axum::{
    routing::{get, MethodRouter},
    Router,
};
use std::sync::Arc;

#[derive(Clone)]
pub struct ChatRouterState {
    pub store: Arc<dyn ChatHistoryStore>,
}

/// Spec 029 chat-history router. Library-only consumers can still use
/// this entry point. Spec 030 wraps it with the chat handler routes via
/// [`build_router_with_chat`].
pub fn build_router(store: Arc<dyn ChatHistoryStore>) -> Router {
    let state = ChatRouterState { store };

    let thread_by_id: MethodRouter<ChatRouterState> = get(threads::get_thread_handler)
        .patch(threads::patch_thread_handler)
        .delete(threads::delete_thread_handler);

    Router::new()
        .route(
            "/chat/threads",
            get(threads::list_threads_handler).post(threads::create_thread_handler),
        )
        .route("/chat/threads/{thread_id}", thread_by_id)
        .route(
            "/chat/threads/{thread_id}/messages",
            get(messages::list_messages_handler).post(messages::append_message_handler),
        )
        .with_state(state)
}

/// Spec 030 build entrypoint: merges the spec-029 chat-history router
/// with the spec-030 migrated chat handlers (threads list/create,
/// generation_settings, active_model, send_message, etc.). Both share
/// the same `/chat/*` URL space; the migrated chat handlers own
/// `/chat/threads` (list+create) while spec 029 owns the per-thread
/// detail routes.
pub fn build_router_with_chat(
    store: Arc<dyn ChatHistoryStore>,
    chat_resources: Arc<ChatHandlerResources>,
) -> Router {
    build_router(store).merge(build_chat_router(chat_resources))
}
