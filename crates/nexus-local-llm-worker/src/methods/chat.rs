use crate::errors::{WorkerError, WorkerResult};
use crate::methods::chat_types::{
    DownloadedModel, DownloadedModelsResponse, GenerationParams, ListThreadsRequest,
    NewThreadRequest, SetActiveModelRequest, SetGenerationSettingsRequest, Thread,
    ThreadListResponse, ThreadSessionRequest,
};

fn not_implemented(method: &str) -> WorkerError {
    WorkerError::NotImplemented {
        method: method.to_string(),
    }
}

pub async fn handle_new_thread(_req: NewThreadRequest) -> WorkerResult<Thread> {
    Err(not_implemented("llm.new_thread"))
}

pub async fn handle_list_threads(
    _req: ListThreadsRequest,
) -> WorkerResult<ThreadListResponse> {
    Err(not_implemented("llm.list_threads"))
}

pub async fn handle_get_active_model(
    _req: ThreadSessionRequest,
) -> WorkerResult<Option<crate::methods::chat_types::ActiveModelBinding>> {
    Err(not_implemented("llm.get_active_model"))
}

pub async fn handle_set_active_model(
    _req: SetActiveModelRequest,
) -> WorkerResult<crate::methods::chat_types::ActiveModelBinding> {
    Err(not_implemented("llm.set_active_model"))
}

pub async fn handle_get_generation_settings(
    _req: ThreadSessionRequest,
) -> WorkerResult<GenerationParams> {
    Err(not_implemented("llm.get_generation_settings"))
}

pub async fn handle_set_generation_settings(
    _req: SetGenerationSettingsRequest,
) -> WorkerResult<GenerationParams> {
    Err(not_implemented("llm.set_generation_settings"))
}

pub async fn handle_list_downloaded_models() -> WorkerResult<DownloadedModelsResponse> {
    Ok(DownloadedModelsResponse {
        items: Vec::<DownloadedModel>::new(),
    })
}

pub async fn handle_open_model_browser() -> WorkerResult<serde_json::Value> {
    Ok(serde_json::json!({ "kind": "open_modal", "target": "model_picker" }))
}
