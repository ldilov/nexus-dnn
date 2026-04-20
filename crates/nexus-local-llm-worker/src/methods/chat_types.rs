use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GenerationParams {
    pub temperature: f32,
    pub top_p: f32,
    pub top_k: u32,
    pub max_tokens: u32,
    pub repeat_penalty: f32,
    pub system_prompt: String,
}

impl Default for GenerationParams {
    fn default() -> Self {
        Self {
            temperature: 0.8,
            top_p: 0.95,
            top_k: 40,
            max_tokens: 4096,
            repeat_penalty: 1.1,
            system_prompt: "You are a helpful assistant.".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActiveModelBinding {
    pub family_id: String,
    pub variant_id: String,
    pub artifact_id: String,
    pub absolute_path: String,
    pub label: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DownloadedModel {
    pub family_id: String,
    pub variant_id: String,
    pub artifact_id: String,
    pub label: String,
    pub format: String,
    pub size_bytes: Option<u64>,
    pub installed_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Thread {
    pub id: String,
    pub title: String,
    pub message_count: i64,
    pub created_at: String,
    pub updated_at: String,
    pub archived_at: Option<String>,
    pub system_prompt: Option<String>,
    pub generation_settings: Option<GenerationParams>,
    pub active_model_family_id: Option<String>,
    pub active_model_variant_id: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct NewThreadRequest {
    #[serde(default)]
    pub title: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ListThreadsRequest {
    #[serde(default)]
    pub archived: bool,
    #[serde(default = "default_limit")]
    pub limit: i64,
}

fn default_limit() -> i64 {
    50
}

#[derive(Debug, Deserialize)]
pub struct ThreadSessionRequest {
    pub session_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SetActiveModelRequest {
    pub session_id: String,
    pub family_id: String,
    pub variant_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SetGenerationSettingsRequest {
    pub session_id: String,
    pub params: GenerationParams,
}

#[derive(Debug, Serialize)]
pub struct ThreadListResponse {
    pub items: Vec<Thread>,
}

#[derive(Debug, Serialize)]
pub struct DownloadedModelsResponse {
    pub items: Vec<DownloadedModel>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generation_params_defaults_match_spec() {
        let p = GenerationParams::default();
        assert_eq!(p.temperature, 0.8);
        assert_eq!(p.top_p, 0.95);
        assert_eq!(p.top_k, 40);
        assert_eq!(p.max_tokens, 4096);
        assert_eq!(p.repeat_penalty, 1.1);
        assert_eq!(p.system_prompt, "You are a helpful assistant.");
    }

    #[test]
    fn generation_params_round_trip_json() {
        let p = GenerationParams {
            temperature: 1.7,
            top_p: 0.9,
            top_k: 40,
            max_tokens: 16,
            repeat_penalty: 1.1,
            system_prompt: "sys".into(),
        };
        let s = serde_json::to_string(&p).unwrap();
        let back: GenerationParams = serde_json::from_str(&s).unwrap();
        assert_eq!(back.temperature, 1.7);
        assert_eq!(back.max_tokens, 16);
        assert_eq!(back.system_prompt, "sys");
    }
}
