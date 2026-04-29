use std::sync::Arc;

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use serde_json::json;

use crate::backend_client::rpc::methods;
use crate::backend_client::BackendClient;
use crate::domain::emotion::{EmotionPayload, EmotionSource};
use crate::domain::Result;
use crate::operators::{Operator, OperatorId};

pub const OP_ID: OperatorId = OperatorId {
    namespace: "emotiontts",
    name: "batch.synthesize",
    version: "1.0.0",
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SynthesisSegment {
    pub segment_id: String,
    pub global_index: i64,
    pub character_display: String,
    pub character_sanitised: String,
    pub character_index: i64,
    pub text: String,
    pub speaker_audio_ref_abs: String,
    pub emotion: EmotionPayload,
    pub generation: serde_json::Value,
    pub output_target_abs: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BatchOptimisations {
    pub use_fp16: bool,
    pub use_torch_compile: bool,
    pub use_cuda_kernel: Option<bool>,
    pub use_deepspeed: bool,
    pub use_accel: bool,
    pub low_vram: bool,
    pub gpt_batch_size: u32,
}

impl Default for BatchOptimisations {
    fn default() -> Self {
        Self {
            use_fp16: true,
            use_torch_compile: false,
            use_cuda_kernel: None,
            use_deepspeed: false,
            use_accel: false,
            low_vram: false,
            gpt_batch_size: 2,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Input {
    pub request_id: String,
    pub run_id: String,
    pub deployment_id: String,
    pub segments: Vec<SynthesisSegment>,
    pub optimisations: BatchOptimisations,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SegmentOutcome {
    pub segment_id: String,
    pub status: String,
    pub output_path_abs: Option<String>,
    pub duration_ms: Option<i64>,
    pub sample_rate: Option<i64>,
    pub failure_category: Option<String>,
    pub failure_detail: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Output {
    pub request_id: String,
    pub status: String,
    pub segments: Vec<SegmentOutcome>,
}

pub struct BatchSynthesizeOperator {
    client: Arc<BackendClient>,
}

impl BatchSynthesizeOperator {
    #[must_use]
    pub fn new(client: Arc<BackendClient>) -> Self {
        Self { client }
    }
}

fn emotion_wire(payload: &EmotionPayload) -> serde_json::Value {
    match payload {
        EmotionPayload::None => json!({ "mode": "none" }),
        EmotionPayload::AudioRef { ref_id, alpha } => json!({
            "mode": "audio_ref",
            "audio_ref_abs": ref_id,
            "emotion_alpha": alpha,
        }),
        EmotionPayload::EmotionVector { vector, alpha } => json!({
            "mode": "emotion_vector",
            "vector": vector,
            "emotion_alpha": alpha,
        }),
        EmotionPayload::QwenTemplate { template, alpha } => json!({
            "mode": "qwen_template",
            "template": template,
            "emotion_alpha": alpha,
        }),
    }
}

#[async_trait]
impl Operator for BatchSynthesizeOperator {
    type Input = Input;
    type Output = Output;

    fn id(&self) -> OperatorId {
        OP_ID
    }

    async fn execute(&self, input: Input) -> Result<Output> {
        let segments_wire: Vec<serde_json::Value> = input
            .segments
            .iter()
            .map(|s| {
                json!({
                    "segment_id": s.segment_id,
                    "global_index": s.global_index,
                    "character_display": s.character_display,
                    "character_sanitised": s.character_sanitised,
                    "character_index": s.character_index,
                    "text": s.text,
                    "speaker_audio_ref_abs": s.speaker_audio_ref_abs,
                    "emotion": emotion_wire(&s.emotion),
                    "generation": s.generation,
                    "output_target_abs": s.output_target_abs,
                })
            })
            .collect();

        let params = json!({
            "request_id": input.request_id,
            "run_id": input.run_id,
            "deployment_id": input.deployment_id,
            "segments": segments_wire,
            "optimizations": {
                "use_fp16": input.optimisations.use_fp16,
                "use_cuda_kernel": input.optimisations.use_cuda_kernel,
                "use_deepspeed": input.optimisations.use_deepspeed,
                "use_torch_compile": input.optimisations.use_torch_compile,
                "use_accel": input.optimisations.use_accel,
                "low_vram": input.optimisations.low_vram,
                "gpt_batch_size": input.optimisations.gpt_batch_size,
            },
        });

        self.client.call(methods::SYNTHESIZE_BATCH, &params).await
    }
}

#[must_use]
pub fn emotion_source_string(source: EmotionSource) -> &'static str {
    match source {
        EmotionSource::Inline => "inline",
        EmotionSource::Mapping => "mapping",
        EmotionSource::Global => "global",
        EmotionSource::None => "none",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn emotion_wire_none() {
        assert_eq!(
            emotion_wire(&EmotionPayload::None),
            json!({ "mode": "none" })
        );
    }

    #[test]
    fn emotion_wire_audio_ref() {
        let w = emotion_wire(&EmotionPayload::AudioRef {
            ref_id: "path/to.wav".into(),
            alpha: 0.8,
        });
        assert_eq!(w["mode"], "audio_ref");
        assert_eq!(w["audio_ref_abs"], "path/to.wav");
        assert_eq!(w["emotion_alpha"], 0.8);
    }

    #[test]
    fn emotion_wire_vector() {
        let w = emotion_wire(&EmotionPayload::EmotionVector {
            vector: [0.1; 8],
            alpha: 0.5,
        });
        assert_eq!(w["mode"], "emotion_vector");
        assert_eq!(w["vector"].as_array().unwrap().len(), 8);
    }

    #[test]
    fn emotion_wire_qwen() {
        let w = emotion_wire(&EmotionPayload::QwenTemplate {
            template: "Happy: {seg}".into(),
            alpha: 1.0,
        });
        assert_eq!(w["mode"], "qwen_template");
        assert_eq!(w["template"], "Happy: {seg}");
    }

    #[test]
    fn default_optimisations_match_r12() {
        let o = BatchOptimisations::default();
        assert!(o.use_fp16);
        assert!(!o.use_torch_compile);
        assert_eq!(o.gpt_batch_size, 2);
        assert!(!o.low_vram);
    }
}
