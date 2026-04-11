use axum::http::{StatusCode, Uri, header};
use axum::response::{Html, IntoResponse, Response};
use rust_embed::Embed;

#[derive(Embed)]
#[folder = "../../apps/web/dist/"]
struct FrontendAssets;

pub async fn static_handler(uri: Uri) -> Response {
    let path = uri.path().trim_start_matches('/');
    serve_embedded_file(path).await
}

async fn serve_embedded_file(path: &str) -> Response {
    let resolved_path = if path.is_empty() { "index.html" } else { path };

    match FrontendAssets::get(resolved_path) {
        Some(content) => {
            let mime = mime_guess::from_path(resolved_path)
                .first_or_octet_stream()
                .to_string();
            ([(header::CONTENT_TYPE, mime)], content.data.to_vec()).into_response()
        }
        None => {
            if has_file_extension(resolved_path) {
                StatusCode::NOT_FOUND.into_response()
            } else {
                serve_index_html().into_response()
            }
        }
    }
}

fn has_file_extension(path: &str) -> bool {
    path.rsplit('/').next().is_some_and(|segment| segment.contains('.'))
}

fn serve_index_html() -> Response {
    match FrontendAssets::get("index.html") {
        Some(content) => Html(content.data.to_vec()).into_response(),
        None => StatusCode::NOT_FOUND.into_response(),
    }
}
