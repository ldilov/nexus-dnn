//! Spec 037 — pure prompt builder for the Draft AI suggestion stream.
//!
//! Extension-agnostic: knows nothing about which backend or model will
//! consume the prompt. Returns a system + user pair that any
//! text-completion-capable model can consume.

use super::types::SuggestionIntent;

pub struct PromptInputs<'a> {
    pub draft_text: &'a str,
    pub cursor_line: u32,
    pub active_line_text: &'a str,
    pub preceding_lines: u8,
    pub intent: SuggestionIntent,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PromptPair {
    pub system: String,
    pub user: String,
}

/// Build a compact prompt for the requested intent.
///
/// Truncates the draft to the `preceding_lines` window before the cursor
/// to keep the prompt within reasonable token budgets — the stream
/// handler will further enforce per-model context caps and reject with
/// `prompt_too_long` when needed.
pub fn build_prompt(inputs: PromptInputs<'_>) -> PromptPair {
    let system = system_prompt_for(inputs.intent).to_string();
    let context = context_window(
        inputs.draft_text,
        inputs.cursor_line,
        inputs.preceding_lines,
    );
    let user = format!(
        "Context (preceding {} lines):\n{}\n\nActive line ({}): {}\n\nTask: {}",
        inputs.preceding_lines,
        context,
        inputs.cursor_line,
        inputs.active_line_text,
        task_instruction_for(inputs.intent),
    );
    PromptPair { system, user }
}

fn system_prompt_for(intent: SuggestionIntent) -> &'static str {
    match intent {
        SuggestionIntent::CompleteLine => {
            "You are an inline code-completion assistant. Continue the active line concisely."
        }
        SuggestionIntent::RewriteLine => {
            "You are an inline editor. Rewrite the active line for clarity without changing intent."
        }
        SuggestionIntent::NextStepSuggestion => {
            "You are a step-suggesting assistant. Propose the most likely next action."
        }
    }
}

fn task_instruction_for(intent: SuggestionIntent) -> &'static str {
    match intent {
        SuggestionIntent::CompleteLine => {
            "Complete the active line. Output the completion text only — no explanation, no quotes."
        }
        SuggestionIntent::RewriteLine => {
            "Rewrite the active line. Output the rewritten line only — no explanation."
        }
        SuggestionIntent::NextStepSuggestion => {
            "Suggest one concrete next step in plain text. Single sentence, no preamble."
        }
    }
}

fn context_window(draft_text: &str, cursor_line: u32, preceding_lines: u8) -> String {
    let lines: Vec<&str> = draft_text.lines().collect();
    if lines.is_empty() {
        return String::new();
    }
    let cursor_idx = (cursor_line.saturating_sub(1) as usize).min(lines.len());
    let start = cursor_idx.saturating_sub(preceding_lines as usize);
    lines[start..cursor_idx].join("\n")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn complete_line_yields_known_system_prompt() {
        let p = build_prompt(PromptInputs {
            draft_text: "alpha\nbeta\n",
            cursor_line: 2,
            active_line_text: "beta",
            preceding_lines: 5,
            intent: SuggestionIntent::CompleteLine,
        });
        assert!(p.system.contains("inline code-completion"));
        assert!(p.user.contains("beta"));
    }

    #[test]
    fn context_truncates_to_preceding_lines() {
        let lines: Vec<String> = (1..=10).map(|i| format!("line{i}")).collect();
        let draft_text = lines.join("\n");
        let p = build_prompt(PromptInputs {
            draft_text: &draft_text,
            cursor_line: 10,
            active_line_text: "line10",
            preceding_lines: 3,
            intent: SuggestionIntent::CompleteLine,
        });
        assert!(p.user.contains("line7"));
        assert!(p.user.contains("line8"));
        assert!(p.user.contains("line9"));
        assert!(!p.user.contains("line1\n"));
    }

    #[test]
    fn empty_draft_does_not_panic() {
        let p = build_prompt(PromptInputs {
            draft_text: "",
            cursor_line: 1,
            active_line_text: "",
            preceding_lines: 5,
            intent: SuggestionIntent::CompleteLine,
        });
        assert!(p.user.contains("Active line"));
    }

    #[test]
    fn rewrite_intent_uses_rewrite_system_prompt() {
        let p = build_prompt(PromptInputs {
            draft_text: "x\n",
            cursor_line: 1,
            active_line_text: "x",
            preceding_lines: 0,
            intent: SuggestionIntent::RewriteLine,
        });
        assert!(p.system.contains("inline editor"));
    }

    #[test]
    fn next_step_intent_uses_step_system_prompt() {
        let p = build_prompt(PromptInputs {
            draft_text: "todo: ship\n",
            cursor_line: 1,
            active_line_text: "todo: ship",
            preceding_lines: 0,
            intent: SuggestionIntent::NextStepSuggestion,
        });
        assert!(p.system.contains("step-suggesting"));
    }

    #[test]
    fn cursor_beyond_end_clamps_safely() {
        let p = build_prompt(PromptInputs {
            draft_text: "only-line",
            cursor_line: 99,
            active_line_text: "only-line",
            preceding_lines: 5,
            intent: SuggestionIntent::CompleteLine,
        });
        assert!(p.user.contains("only-line"));
    }
}
