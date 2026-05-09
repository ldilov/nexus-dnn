//! Reedline prompt that renders a context label + sparkline.

use std::borrow::Cow;
use std::sync::{Arc, Mutex};

use reedline::{Prompt, PromptEditMode, PromptHistorySearch, PromptHistorySearchStatus};

use crate::render::sparkline::{SparklineSamples, render_sparkline};

#[derive(Debug, Default, Clone)]
pub struct PromptState {
    pub context_label: String,
    pub sparkline: SparklineSamples,
    pub paused: bool,
    pub filter_active: bool,
    pub condensing: bool,
}

#[derive(Clone)]
pub struct AmbientPrompt {
    state: Arc<Mutex<PromptState>>,
}

impl AmbientPrompt {
    pub fn new() -> Self {
        let state = PromptState {
            context_label: "nexus".into(),
            sparkline: SparklineSamples::from_per_second(Vec::new()),
            paused: false,
            filter_active: false,
            condensing: false,
        };
        Self {
            state: Arc::new(Mutex::new(state)),
        }
    }

    pub fn handle(&self) -> Arc<Mutex<PromptState>> {
        Arc::clone(&self.state)
    }
}

impl Default for AmbientPrompt {
    fn default() -> Self {
        Self::new()
    }
}

impl Prompt for AmbientPrompt {
    fn render_prompt_left(&self) -> Cow<'_, str> {
        let snapshot = self.state.lock().unwrap_or_else(|p| p.into_inner()).clone();
        let bar = render_sparkline(&snapshot.sparkline);
        let mut left = format!("{} {bar}", snapshot.context_label);
        if snapshot.condensing {
            left.push_str(" ≫");
        }
        if snapshot.paused {
            left.push_str(" ⏸");
        }
        if snapshot.filter_active {
            left.push_str(" [!]");
        }
        Cow::Owned(left)
    }

    fn render_prompt_right(&self) -> Cow<'_, str> {
        Cow::Borrowed("")
    }

    fn render_prompt_indicator(&self, _edit_mode: PromptEditMode) -> Cow<'_, str> {
        Cow::Borrowed(" › ")
    }

    fn render_prompt_multiline_indicator(&self) -> Cow<'_, str> {
        Cow::Borrowed("…  ")
    }

    fn render_prompt_history_search_indicator(
        &self,
        history_search: PromptHistorySearch,
    ) -> Cow<'_, str> {
        let prefix = match history_search.status {
            PromptHistorySearchStatus::Passing => "search",
            PromptHistorySearchStatus::Failing => "no-match",
        };
        Cow::Owned(format!("({prefix}: {}) ", history_search.term))
    }
}
