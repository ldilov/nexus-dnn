use futures_util::StreamExt;
use serde::{Deserialize, Serialize};
use tracing::{Instrument, debug, info, info_span, warn};

use crate::errors::WorkerResult;
use crate::ids::{CorrelationId, ModelId, VariantCodename};
use crate::operators::OperatorCtx;
use crate::proxy::chat::{ChatCompletionRequest, ChatMessage, stream_chat_completions};
use crate::proxy::sse_mapper::OperatorStreamEvent;
use crate::transport::WorkerTransport;

#[derive(Debug, Deserialize)]
pub struct ChatTurnRequest {
    pub session_id: String,
    pub model_id: ModelId,
    #[serde(default)]
    pub runtime_preference: Option<VariantCodename>,
    pub messages: Vec<ChatMessage>,
    #[serde(default)]
    pub params: ChatParams,
}

#[derive(Debug, Default, Deserialize)]
pub struct ChatParams {
    pub temperature: Option<f32>,
    pub top_p: Option<f32>,
    pub top_k: Option<u32>,
    pub max_tokens: Option<u32>,
    #[serde(default)]
    pub stop: Vec<String>,
    pub seed: Option<u64>,
}

#[derive(Debug, Serialize)]
pub struct ChatTurnResponse {
    pub stream_channel: String,
}

pub async fn handle(
    ctx: &OperatorCtx,
    transport: &WorkerTransport,
    request_id: u64,
    request: ChatTurnRequest,
) -> WorkerResult<()> {
    let correlation_id = CorrelationId::new();
    let span = info_span!(
        "llm.chat.turn",
        correlation_id = %correlation_id,
        model_id = %request.model_id,
        session_id = %request.session_id,
    );
    handle_inner(ctx, transport, request_id, request).instrument(span).await
}

async fn handle_inner(
    ctx: &OperatorCtx,
    transport: &WorkerTransport,
    request_id: u64,
    request: ChatTurnRequest,
) -> WorkerResult<()> {
    let handle = ctx
        .pool
        .acquire(&request.model_id, request.runtime_preference.as_ref())
        .await?;
    tracing::Span::current().record(
        "backend_variant",
        tracing::field::display(&handle.lease().install_id),
    );

    let stream_channel = format!("chat.stream.{}.{}", request.session_id, request_id);
    transport
        .reply_ok(
            request_id,
            ChatTurnResponse {
                stream_channel: stream_channel.clone(),
            },
        )
        .await?;

    let body = ChatCompletionRequest {
        model: request.model_id.as_str().into(),
        messages: request.messages,
        stream: true,
        temperature: request.params.temperature,
        top_p: request.params.top_p,
        top_k: request.params.top_k,
        max_tokens: request.params.max_tokens,
        stop: request.params.stop,
        seed: request.params.seed,
        tools: Vec::new(),
    };

    info!(session = %request.session_id, model = %request.model_id, "chat.turn: proxying");
    let base_url = handle.channel_base_url().to_string();
    let mut stream = stream_chat_completions(&ctx.http, &base_url, body).await?;
    let mut state_rx = handle.subscribe();

    loop {
        tokio::select! {
            biased;
            maybe_event = stream.next() => {
                match maybe_event {
                    Some(Ok(evt)) => {
                        let is_done = matches!(evt, OperatorStreamEvent::Done { .. });
                        transport.notify(&stream_channel, evt).await?;
                        if is_done { break; }
                    }
                    Some(Err(err)) => {
                        warn!(%err, "chat.turn: stream error");
                        let payload = OperatorStreamEvent::Error {
                            code: err.stable_code().into(),
                            message: err.to_string(),
                        };
                        transport.notify(&stream_channel, payload).await?;
                        break;
                    }
                    None => break,
                }
            }
            change = state_rx.changed() => {
                if change.is_err() { break; }
                let current = *state_rx.borrow_and_update();
                if !current.is_serving() {
                    warn!(state = %current, "chat.turn: lease left serving state");
                    let payload = OperatorStreamEvent::Error {
                        code: "BackendUnavailable".into(),
                        message: format!("backend transitioned to {current}"),
                    };
                    transport.notify(&stream_channel, payload).await?;
                    break;
                }
            }
        }
    }

    debug!(session = %request.session_id, "chat.turn: complete");
    Ok(())
}
