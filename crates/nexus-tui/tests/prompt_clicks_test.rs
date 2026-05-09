//! T094 — `AmbientPrompt::render_prompt_left` registers Sparkline +
//! FilterIndicator regions in the shared `ClickRegistry`.

use std::sync::{Arc, Mutex};

use nexus_tui::mouse::targets::{ClickRegistry, ClickTarget};
use nexus_tui::repl::prompt::AmbientPrompt;
use reedline::Prompt;

#[test]
fn render_left_registers_sparkline_region() {
    let registry = Arc::new(Mutex::new(ClickRegistry::default()));
    let prompt = AmbientPrompt::new().with_click_registry(Arc::clone(&registry));
    let _ = prompt.render_prompt_left();
    let reg = registry.lock().unwrap();
    let mut found = false;
    for col in 0..200 {
        if matches!(reg.lookup(1, col), Some(ClickTarget::Sparkline)) {
            found = true;
            break;
        }
    }
    assert!(found, "Sparkline region missing from prompt registry");
}

#[test]
fn filter_indicator_only_registers_when_filters_active() {
    let registry = Arc::new(Mutex::new(ClickRegistry::default()));
    let prompt = AmbientPrompt::new().with_click_registry(Arc::clone(&registry));
    let _ = prompt.render_prompt_left();
    {
        let reg = registry.lock().unwrap();
        let any_filter =
            (0..200).any(|c| matches!(reg.lookup(1, c), Some(ClickTarget::FilterIndicator)));
        assert!(
            !any_filter,
            "FilterIndicator must not register without active filters"
        );
    }

    {
        let handle = prompt.handle();
        let mut state = handle.lock().unwrap();
        state.filter_active = true;
    }
    let _ = prompt.render_prompt_left();
    let reg = registry.lock().unwrap();
    let any_filter =
        (0..200).any(|c| matches!(reg.lookup(1, c), Some(ClickTarget::FilterIndicator)));
    assert!(
        any_filter,
        "FilterIndicator must register when filters are active"
    );
}

#[test]
fn redraw_clears_stale_filter_indicator_when_filters_dropped() {
    let registry = Arc::new(Mutex::new(ClickRegistry::default()));
    let prompt = AmbientPrompt::new().with_click_registry(Arc::clone(&registry));
    {
        let handle = prompt.handle();
        let mut state = handle.lock().unwrap();
        state.filter_active = true;
    }
    let _ = prompt.render_prompt_left();
    {
        let handle = prompt.handle();
        let mut state = handle.lock().unwrap();
        state.filter_active = false;
    }
    let _ = prompt.render_prompt_left();
    let reg = registry.lock().unwrap();
    let any_filter =
        (0..200).any(|c| matches!(reg.lookup(1, c), Some(ClickTarget::FilterIndicator)));
    assert!(
        !any_filter,
        "stale FilterIndicator entries must be cleared on redraw"
    );
}

#[test]
fn prompt_without_registry_renders_without_panic() {
    let prompt = AmbientPrompt::new();
    let rendered = prompt.render_prompt_left();
    assert!(rendered.contains("nexus"));
}
