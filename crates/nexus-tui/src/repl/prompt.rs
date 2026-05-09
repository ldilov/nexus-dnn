//! Reedline prompt that renders a context label + sparkline.

use std::borrow::Cow;
use std::sync::{Arc, Mutex};

use reedline::{Prompt, PromptEditMode, PromptHistorySearch, PromptHistorySearchStatus};

use crate::mouse::targets::{ClickRegistry, ClickTarget};
use crate::render::sparkline::{SparklineSamples, render_sparkline};

const PROMPT_ROW: u16 = 1;

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
    click_registry: Option<Arc<Mutex<ClickRegistry>>>,
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
            click_registry: None,
        }
    }

    pub fn handle(&self) -> Arc<Mutex<PromptState>> {
        Arc::clone(&self.state)
    }

    pub fn with_click_registry(mut self, registry: Arc<Mutex<ClickRegistry>>) -> Self {
        self.click_registry = Some(registry);
        self
    }

    fn register_regions(&self, sparkline_range: std::ops::Range<u16>, filter_range: Option<std::ops::Range<u16>>) {
        let Some(registry) = &self.click_registry else {
            return;
        };
        let Ok(mut reg) = registry.lock() else {
            return;
        };
        reg.clear_row(PROMPT_ROW);
        reg.register(PROMPT_ROW, sparkline_range, ClickTarget::Sparkline);
        if let Some(range) = filter_range {
            reg.register(PROMPT_ROW, range, ClickTarget::FilterIndicator);
        }
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
        let mut left = String::new();
        let mut col: u16 = 0;
        left.push_str(&snapshot.context_label);
        col = col.saturating_add(visible_width(&snapshot.context_label));
        left.push(' ');
        col = col.saturating_add(1);
        let sparkline_start = col;
        left.push_str(&bar);
        col = col.saturating_add(visible_width(&bar));
        let sparkline_end = col;
        if snapshot.condensing {
            left.push_str(" ≫");
            col = col.saturating_add(2);
        }
        if snapshot.paused {
            left.push_str(" ⏸");
            col = col.saturating_add(2);
        }
        let filter_range = if snapshot.filter_active {
            left.push(' ');
            col = col.saturating_add(1);
            let start = col;
            left.push_str("[!]");
            col = col.saturating_add(3);
            Some(start..col)
        } else {
            None
        };
        let _ = col;
        self.register_regions(sparkline_start..sparkline_end, filter_range);
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

fn visible_width(s: &str) -> u16 {
    let count = s.chars().count();
    if count > u16::MAX as usize {
        u16::MAX
    } else {
        count as u16
    }
}
