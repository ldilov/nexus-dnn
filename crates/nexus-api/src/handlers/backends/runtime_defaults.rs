use axum::extract::State;
use axum::response::{IntoResponse, Response};
use serde::Serialize;

use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Clone, Serialize)]
pub struct RuntimeDefaults {
    pub hardware_concurrency: usize,
    pub threads_default: usize,
    pub supports_cuda: bool,
    pub platform: &'static str,
}

pub async fn get_runtime_defaults(State(state): State<AppState>) -> Response {
    let hw = std::thread::available_parallelism()
        .map(|n| n.get())
        .unwrap_or(4);
    let threads_default = std::cmp::max(4, hw / 2);

    let platform = if cfg!(target_os = "windows") {
        "windows"
    } else if cfg!(target_os = "macos") {
        "macos"
    } else {
        "linux"
    };

    let supports_cuda = detect_cuda_runtime(&state).await;

    ApiResponse::ok(RuntimeDefaults {
        hardware_concurrency: hw,
        threads_default,
        supports_cuda,
        platform,
    })
    .into_response()
}

async fn detect_cuda_runtime(state: &AppState) -> bool {
    let pool = state.db.pool();
    match nexus_backend_runtimes::runtime_installs_store::list_all(pool).await {
        Ok(rows) => rows.iter().any(|r| {
            r.state == "installed" && r.family == "llama.cpp" && r.accelerator.starts_with("cuda")
        }),
        Err(_) => false,
    }
}
