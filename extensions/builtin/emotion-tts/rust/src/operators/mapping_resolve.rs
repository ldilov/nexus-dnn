use std::collections::HashMap;

use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::domain::parser::ParsedUtterance;
use crate::domain::Result;
use crate::operators::{Operator, OperatorId};
use crate::storage::repo_traits::CharacterMappingRow;

pub const OP_ID: OperatorId = OperatorId {
    namespace: "emotiontts",
    name: "mapping.resolve",
    version: "1.0.0",
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Input {
    pub utterances: Vec<ParsedUtterance>,
    pub mappings: Vec<CharacterMappingRow>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ResolvedUtterance {
    pub utterance: ParsedUtterance,
    pub character_index: i64,
    pub mapping_id: Option<String>,
    pub speaker_voice_asset_id: Option<String>,
    pub default_emotion_mode: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Output {
    pub resolved: Vec<ResolvedUtterance>,
    pub unresolved_characters: Vec<String>,
}

pub struct MappingResolveOperator;

#[async_trait]
impl Operator for MappingResolveOperator {
    type Input = Input;
    type Output = Output;

    fn id(&self) -> OperatorId {
        OP_ID
    }

    async fn execute(&self, input: Input) -> Result<Output> {
        let mut by_lower: HashMap<String, &CharacterMappingRow> = HashMap::new();
        for m in &input.mappings {
            by_lower.insert(m.character_name_lower.clone(), m);
        }

        let mut character_counter: HashMap<String, i64> = HashMap::new();
        let mut unresolved: Vec<String> = Vec::new();
        let mut resolved: Vec<ResolvedUtterance> = Vec::with_capacity(input.utterances.len());

        for utt in input.utterances {
            let lower = utt.character_display.to_lowercase();
            let count = character_counter.entry(lower.clone()).or_insert(0);
            *count += 1;
            let character_index = *count;

            let mapping = by_lower.get(&lower).copied();
            if mapping.is_none() && utt.character_display != crate::domain::parser::NARRATOR {
                if !unresolved.contains(&utt.character_display) {
                    unresolved.push(utt.character_display.clone());
                }
            }

            resolved.push(ResolvedUtterance {
                utterance: utt,
                character_index,
                mapping_id: mapping.map(|m| m.mapping_id.to_string()),
                speaker_voice_asset_id: mapping.map(|m| m.speaker_voice_asset_id.to_string()),
                default_emotion_mode: mapping.map(|m| m.default_emotion_mode.clone()),
            });
        }

        Ok(Output {
            resolved,
            unresolved_characters: unresolved,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::{DeploymentId, MappingId, VoiceAssetId};
    use std::collections::BTreeMap;

    fn utt(name: &str, idx: i64) -> ParsedUtterance {
        ParsedUtterance {
            character_display: name.into(),
            text: "hi".into(),
            source_line_number: idx,
            legacy_emotion_ref: None,
            inline_overrides: BTreeMap::new(),
        }
    }

    fn mapping(name: &str) -> CharacterMappingRow {
        CharacterMappingRow {
            mapping_id: MappingId::new(),
            deployment_id: DeploymentId::new(),
            character_name: name.into(),
            character_name_lower: name.to_lowercase(),
            speaker_voice_asset_id: VoiceAssetId::new(),
            default_emotion_mode: "none".into(),
            default_emotion_voice_asset_id: None,
            default_vector_preset_id: None,
            default_qwen_template: None,
            default_speed_factor: None,
            default_generation_overrides_json: "{}".into(),
            is_active: true,
            notes: None,
            created_at: 0,
            updated_at: 0,
        }
    }

    #[tokio::test]
    async fn character_index_increments_per_character() {
        let op = MappingResolveOperator;
        let out = op
            .execute(Input {
                utterances: vec![utt("Bob", 1), utt("Alice", 2), utt("Bob", 3)],
                mappings: vec![mapping("Bob"), mapping("Alice")],
            })
            .await
            .unwrap();
        assert_eq!(out.resolved[0].character_index, 1);
        assert_eq!(out.resolved[1].character_index, 1);
        assert_eq!(out.resolved[2].character_index, 2);
        assert!(out.unresolved_characters.is_empty());
    }

    #[tokio::test]
    async fn unresolved_characters_listed_once() {
        let op = MappingResolveOperator;
        let out = op
            .execute(Input {
                utterances: vec![utt("Morgan", 1), utt("Morgan", 2)],
                mappings: vec![mapping("Bob")],
            })
            .await
            .unwrap();
        assert_eq!(out.unresolved_characters, vec!["Morgan"]);
    }

    #[tokio::test]
    async fn narrator_is_not_unresolved_even_without_mapping() {
        let op = MappingResolveOperator;
        let out = op
            .execute(Input {
                utterances: vec![utt("Narrator", 1)],
                mappings: vec![],
            })
            .await
            .unwrap();
        assert!(out.unresolved_characters.is_empty());
    }

    #[tokio::test]
    async fn three_lines_three_voices_round_trip() {
        let op = MappingResolveOperator;
        let bob = mapping("Bob");
        let alice = mapping("Alice");
        let bob_voice = bob.speaker_voice_asset_id.as_str().to_string();
        let alice_voice = alice.speaker_voice_asset_id.as_str().to_string();
        let out = op
            .execute(Input {
                utterances: vec![utt("Bob", 1), utt("Bob", 2), utt("Alice", 3), utt("Bob", 4)],
                mappings: vec![bob, alice],
            })
            .await
            .unwrap();
        assert_eq!(out.resolved.len(), 4);
        assert_eq!(
            out.resolved[0].speaker_voice_asset_id.as_ref(),
            Some(&bob_voice)
        );
        assert_eq!(out.resolved[0].character_index, 1);
        assert_eq!(
            out.resolved[1].speaker_voice_asset_id.as_ref(),
            Some(&bob_voice)
        );
        assert_eq!(out.resolved[1].character_index, 2);
        assert_eq!(
            out.resolved[2].speaker_voice_asset_id.as_ref(),
            Some(&alice_voice)
        );
        assert_eq!(out.resolved[2].character_index, 1);
        assert_eq!(
            out.resolved[3].speaker_voice_asset_id.as_ref(),
            Some(&bob_voice)
        );
        assert_eq!(out.resolved[3].character_index, 3);
        assert!(out.unresolved_characters.is_empty());
    }

    #[tokio::test]
    async fn case_insensitive_match() {
        let op = MappingResolveOperator;
        let out = op
            .execute(Input {
                utterances: vec![utt("BOB", 1)],
                mappings: vec![mapping("Bob")],
            })
            .await
            .unwrap();
        assert!(out.resolved[0].mapping_id.is_some());
    }
}
