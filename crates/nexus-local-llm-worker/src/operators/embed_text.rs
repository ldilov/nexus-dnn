use serde::{Deserialize, Serialize};
use tracing::{Instrument, info_span};

use crate::errors::{WorkerError, WorkerResult};
use crate::ids::{CorrelationId, ModelId, VariantCodename};
use crate::operators::OperatorCtx;
use crate::proxy::embeddings::{EmbeddingsRequest, post_embeddings};

#[derive(Debug, Deserialize)]
pub struct EmbedRequest {
    pub model_id: ModelId,
    #[serde(default)]
    pub runtime_preference: Option<VariantCodename>,
    pub texts: Vec<String>,
    #[serde(default)]
    pub normalize: bool,
}

#[derive(Debug, Serialize)]
pub struct EmbedResponse {
    pub dimension: u32,
    pub vectors: Vec<Vec<f32>>,
}

pub async fn handle(ctx: &OperatorCtx, req: EmbedRequest) -> WorkerResult<EmbedResponse> {
    let correlation_id = CorrelationId::new();
    let span = info_span!(
        "llm.embed.text",
        correlation_id = %correlation_id,
        model_id = %req.model_id,
    );
    handle_inner(ctx, req).instrument(span).await
}

async fn handle_inner(ctx: &OperatorCtx, req: EmbedRequest) -> WorkerResult<EmbedResponse> {
    let handle = ctx
        .pool
        .acquire(&req.model_id, req.runtime_preference.as_ref())
        .await?;

    let lease = handle.lease();
    tracing::Span::current().record(
        "backend_variant",
        tracing::field::display(&lease.install_id),
    );
    let runtimes = crate::host_rpc::runtimes::RuntimesClient::new(ctx.host.transport());
    let runtime = runtimes.get(&lease.install_id).await?;
    if !runtime.capabilities.embeddings {
        return Err(WorkerError::CapabilityUnavailable {
            capability: "embeddings".into(),
        });
    }

    let base_url = handle.channel_base_url().to_string();
    let resp = post_embeddings(
        &ctx.http,
        &base_url,
        EmbeddingsRequest {
            model: req.model_id.as_str().into(),
            input: req.texts,
        },
    )
    .await?;

    let vectors: Vec<Vec<f32>> = resp
        .data
        .into_iter()
        .map(|item| {
            if req.normalize {
                normalize(&item.embedding)
            } else {
                item.embedding
            }
        })
        .collect();

    let dimension = vectors.first().map(|v| v.len() as u32).unwrap_or(0);

    Ok(EmbedResponse { dimension, vectors })
}

fn normalize(v: &[f32]) -> Vec<f32> {
    let norm: f32 = v.iter().map(|x| x * x).sum::<f32>().sqrt();
    if norm == 0.0 {
        return v.to_vec();
    }
    v.iter().map(|x| x / norm).collect()
}
