use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::domain::emotion::{
    resolve, EmotionMode, EmotionPayload, EmotionSource, GlobalEmotion, InlineOverrides,
    MappingDefaults,
};
use crate::domain::Result;
use crate::operators::mapping_resolve::ResolvedUtterance;
use crate::operators::{Operator, OperatorId};
use crate::storage::repo_traits::CharacterMappingRow;

pub const OP_ID: OperatorId = OperatorId {
    namespace: "emotiontts",
    name: "emotion.resolve",
    version: "1.0.0",
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Input {
    pub resolved_utterances: Vec<ResolvedUtterance>,
    pub mappings: Vec<CharacterMappingRow>,
    pub global: GlobalEmotion,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EmotionPlan {
    pub global_index: i64,
    pub source_line_number: i64,
    pub character_display: String,
    pub payload: EmotionPayload,
    pub source: EmotionSource,
    pub mode: EmotionMode,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Output {
    pub plans: Vec<EmotionPlan>,
}

pub struct EmotionResolveOperator;

#[async_trait]
impl Operator for EmotionResolveOperator {
    type Input = Input;
    type Output = Output;

    fn id(&self) -> OperatorId {
        OP_ID
    }

    async fn execute(&self, input: Input) -> Result<Output> {
        let mut plans = Vec::with_capacity(input.resolved_utterances.len());
        for (idx, ru) in input.resolved_utterances.into_iter().enumerate() {
            let global_index = (idx + 1) as i64;
            let inline = InlineOverrides::from_map(&ru.utterance.inline_overrides);
            let mapping_defaults = mapping_for(&ru, &input.mappings);
            let resolved = resolve(
                &inline,
                ru.utterance.legacy_emotion_ref.as_deref(),
                mapping_defaults.as_ref(),
                &input.global,
            );
            let mode = resolved.payload.mode();
            plans.push(EmotionPlan {
                global_index,
                source_line_number: ru.utterance.source_line_number,
                character_display: ru.utterance.character_display,
                payload: resolved.payload,
                source: resolved.source,
                mode,
            });
        }
        Ok(Output { plans })
    }
}

fn mapping_for(
    ru: &ResolvedUtterance,
    mappings: &[CharacterMappingRow],
) -> Option<MappingDefaults> {
    let id = ru.mapping_id.as_ref()?;
    let row = mappings.iter().find(|m| m.mapping_id.as_str() == id)?;
    let mode = match row.default_emotion_mode.as_str() {
        "audio_ref" => EmotionMode::AudioRef,
        "vector_preset" => EmotionMode::EmotionVector,
        "qwen_template" => EmotionMode::QwenTemplate,
        _ => EmotionMode::None,
    };
    Some(MappingDefaults {
        mode,
        audio_ref_id: row
            .default_emotion_voice_asset_id
            .as_ref()
            .map(|v| v.to_string()),
        vector: None,
        qwen_template: row.default_qwen_template.clone(),
        alpha: None,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::parser::ParsedUtterance;
    use std::collections::BTreeMap;

    fn resolved_utt(name: &str, mapping_id: Option<&str>) -> ResolvedUtterance {
        ResolvedUtterance {
            utterance: ParsedUtterance {
                character_display: name.into(),
                text: "hi".into(),
                source_line_number: 1,
                legacy_emotion_ref: None,
                inline_overrides: BTreeMap::new(),
            },
            character_index: 1,
            mapping_id: mapping_id.map(String::from),
            speaker_voice_asset_id: None,
            default_emotion_mode: None,
        }
    }

    #[tokio::test]
    async fn falls_through_to_global_when_no_mapping() {
        let op = EmotionResolveOperator;
        let out = op
            .execute(Input {
                resolved_utterances: vec![resolved_utt("Bob", None)],
                mappings: vec![],
                global: GlobalEmotion {
                    mode: EmotionMode::EmotionVector,
                    vector: Some([0.5; 8]),
                    ..Default::default()
                },
            })
            .await
            .unwrap();
        assert_eq!(out.plans[0].source, EmotionSource::Global);
        assert_eq!(out.plans[0].mode, EmotionMode::EmotionVector);
    }

    #[tokio::test]
    async fn no_mapping_no_global_yields_none() {
        let op = EmotionResolveOperator;
        let out = op
            .execute(Input {
                resolved_utterances: vec![resolved_utt("Bob", None)],
                mappings: vec![],
                global: GlobalEmotion::default(),
            })
            .await
            .unwrap();
        assert_eq!(out.plans[0].source, EmotionSource::None);
    }
}
