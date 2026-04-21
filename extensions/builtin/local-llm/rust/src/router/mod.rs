pub mod messages;
pub mod threads;

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
