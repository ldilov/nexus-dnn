use std::sync::Arc;

use nexus_protocol::messages::{INTERNAL_ERROR, INVALID_PARAMS, METHOD_NOT_FOUND, RpcRequest};
use tokio::sync::broadcast;
use tracing::{error, info, warn};

use crate::errors::{WorkerError, WorkerResult};
use crate::methods;
use crate::operators;
use crate::operators::OperatorCtx;
use crate::transport::WorkerTransport;

pub async fn run(
    transport: Arc<WorkerTransport>,
    ctx: OperatorCtx,
    pool_cap: usize,
) -> WorkerResult<()> {
    let mut rx: broadcast::Receiver<RpcRequest> = transport.subscribe_requests();
    loop {
        match rx.recv().await {
            Ok(req) => {
                let transport = transport.clone();
                let ctx = ctx.clone();
                tokio::spawn(async move {
                    if let Err(e) = dispatch_one(&transport, &ctx, pool_cap, req).await {
                        error!(error = %e, "dispatch error");
                    }
                });
            }
            Err(broadcast::error::RecvError::Lagged(skipped)) => {
                warn!(skipped, "request stream lagged");
            }
            Err(broadcast::error::RecvError::Closed) => {
                info!("request stream closed");
                break;
            }
        }
    }
    Ok(())
}

async fn dispatch_one(
    transport: &Arc<WorkerTransport>,
    ctx: &OperatorCtx,
    pool_cap: usize,
    req: RpcRequest,
) -> WorkerResult<()> {
    let id = req.id;
    let method = req.method.as_str();
    info!(id, method, "dispatch");

    match method {
        "llm.chat.turn" => match parse::<operators::chat_turn::ChatTurnRequest>(&req) {
            Ok(body) => operators::chat_turn::handle(ctx, transport, id, body).await,
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        "llm.prompt.compose" => match parse::<operators::prompt_compose::ComposeRequest>(&req) {
            Ok(body) => match operators::prompt_compose::handle(body) {
                Ok(resp) => transport.reply_ok(id, resp).await,
                Err(e) => reply_worker_error(transport, id, e).await,
            },
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        "llm.output.persist" => match parse::<operators::output_persist::PersistRequest>(&req) {
            Ok(body) => {
                let resp = operators::output_persist::handle(body).await?;
                transport.reply_ok(id, resp).await
            }
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        "llm.embed.text" => match parse::<operators::embed_text::EmbedRequest>(&req) {
            Ok(body) => match operators::embed_text::handle(ctx, body).await {
                Ok(resp) => transport.reply_ok(id, resp).await,
                Err(e) => reply_worker_error(transport, id, e).await,
            },
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        "llm.rag.retrieve" => match parse::<operators::rag_retrieve::RagRetrieveRequest>(&req) {
            Ok(body) => {
                let resp = operators::rag_retrieve::handle(body).await?;
                transport.reply_ok(id, resp).await
            }
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        "backend.logs.tail" => match parse::<methods::LogsTailRequest>(&req) {
            Ok(body) => {
                let resp = methods::handle_logs_tail(body).await?;
                transport.reply_ok(id, resp).await
            }
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        "backend.state.get" => match parse::<methods::StateGetRequest>(&req) {
            Ok(body) => match methods::handle_state_get(&ctx.pool, body).await {
                Ok(resp) => transport.reply_ok(id, resp).await,
                Err(e) => reply_worker_error(transport, id, e).await,
            },
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        "pool.list" => {
            let resp = methods::handle_pool_list(&ctx.pool, pool_cap).await?;
            transport.reply_ok(id, resp).await
        }
        "pool.restart" => match parse::<methods::RestartRequest>(&req) {
            Ok(body) => match methods::handle_pool_restart(&ctx.pool, body).await {
                Ok(()) => transport.reply_ok(id, serde_json::json!({"state":"Spawning"})).await,
                Err(e) => reply_worker_error(transport, id, e).await,
            },
            Err(e) => reply_invalid_params(transport, id, e).await,
        },
        _ => {
            transport
                .reply_error(id, METHOD_NOT_FOUND, format!("method not found: {method}"))
                .await
        }
    }
}

fn parse<T: for<'de> serde::Deserialize<'de>>(req: &RpcRequest) -> Result<T, serde_json::Error> {
    serde_json::from_value(req.params.clone())
}

async fn reply_invalid_params(
    transport: &WorkerTransport,
    id: u64,
    e: serde_json::Error,
) -> WorkerResult<()> {
    transport
        .reply_error(id, INVALID_PARAMS, format!("invalid params: {e}"))
        .await
}

async fn reply_worker_error(
    transport: &WorkerTransport,
    id: u64,
    e: WorkerError,
) -> WorkerResult<()> {
    let stable_code = e.stable_code();
    let retry_safe = e.retry_safe();
    let message = e.to_string();
    let data = serde_json::json!({
        "code": stable_code,
        "retry_safe": retry_safe,
    });
    transport
        .reply_error_with_data(id, INTERNAL_ERROR, format!("{stable_code}: {message}"), data)
        .await
}
