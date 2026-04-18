use serde::{Deserialize, Serialize};

use crate::errors::WorkerResult;

#[derive(Debug, Deserialize)]
pub struct ComposeRequest {
    pub template_id: String,
    #[serde(default)]
    pub variables: ComposeVariables,
}

#[derive(Debug, Default, Deserialize)]
pub struct ComposeVariables {
    #[serde(default)]
    pub system: Option<String>,
    #[serde(default)]
    pub history: Vec<HistoryMessage>,
    #[serde(default)]
    pub user_turn: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct HistoryMessage {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Serialize)]
pub struct ComposeResponse {
    pub prompt: String,
    pub token_estimate: u32,
}

pub fn handle(req: ComposeRequest) -> WorkerResult<ComposeResponse> {
    let mut prompt = String::new();
    if let Some(system) = &req.variables.system {
        prompt.push_str("[system]\n");
        prompt.push_str(system);
        prompt.push_str("\n\n");
    }
    for msg in &req.variables.history {
        prompt.push_str(&format!("[{}]\n{}\n\n", msg.role, msg.content));
    }
    if let Some(user_turn) = &req.variables.user_turn {
        prompt.push_str("[user]\n");
        prompt.push_str(user_turn);
        prompt.push_str("\n\n[assistant]\n");
    }

    let token_estimate = (prompt.len() / 4) as u32;

    Ok(ComposeResponse {
        prompt,
        token_estimate,
    })
}
