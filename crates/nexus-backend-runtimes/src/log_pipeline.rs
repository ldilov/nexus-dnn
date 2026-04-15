use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::io::{AsyncBufReadExt, AsyncRead, BufReader};

use crate::events::{BackendEvent, LogLinePayload, SharedPublisher};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeLogLine {
    pub timestamp: i64,
    pub source: String,
    pub runtime_id: Option<String>,
    pub deployment_id: Option<String>,
    pub severity: String,
    pub namespace: String,
    pub message: String,
}

pub struct LogPipelineContext {
    pub source: String,
    pub namespace: String,
    pub runtime_id: Option<String>,
    pub deployment_id: Option<String>,
    pub publisher: SharedPublisher,
    pub backend: String,
}

pub fn infer_severity(line: &str) -> &'static str {
    let lowered = line.to_ascii_lowercase();
    if lowered.contains("error") || lowered.contains("fatal") || lowered.contains("panic") {
        "error"
    } else if lowered.contains("warn") {
        "warn"
    } else {
        "info"
    }
}

pub async fn pipe_stream<R>(ctx: Arc<LogPipelineContext>, reader: R)
where
    R: AsyncRead + Unpin + Send + 'static,
{
    let mut buffered = BufReader::new(reader);
    let mut line = String::new();
    loop {
        line.clear();
        match buffered.read_line(&mut line).await {
            Ok(0) => break,
            Ok(_) => {
                let trimmed = line.trim_end_matches(['\r', '\n']).to_string();
                if trimmed.is_empty() {
                    continue;
                }
                let severity = infer_severity(&trimmed).to_string();
                let payload = LogLinePayload {
                    source: ctx.source.clone(),
                    runtime_id: ctx.runtime_id.clone(),
                    deployment_id: ctx.deployment_id.clone(),
                    severity: severity.clone(),
                    namespace: ctx.namespace.clone(),
                    message: trimmed.clone(),
                };
                tracing::event!(
                    target: "nexus_backend_runtimes::log",
                    tracing::Level::INFO,
                    namespace = %ctx.namespace,
                    source = %ctx.source,
                    severity = %severity,
                    "{}",
                    trimmed
                );
                let event = BackendEvent::new(
                    "llm.backend.log",
                    ctx.backend.clone(),
                    serde_json::to_value(payload).unwrap_or(serde_json::Value::Null),
                );
                ctx.publisher.publish(event).await;
            }
            Err(_) => break,
        }
    }
}
