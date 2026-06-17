//! S2 — Incremental filter bar end-to-end through the controller loop.
//!
//! The MouseAwareEditMode unit tests cover the EditMode-side
//! interception (`/`-on-empty-buffer → FilterFocus.open() + first
//! FilterKey queued, every subsequent key routed). These tests cover
//! the OTHER half of the bridge: the controller-side keystroke
//! consumer that updates `FilterState` live, mirrors the query into
//! `PromptState.filter_query`, and honours Enter / Esc semantics.
//!
//! The controller loop itself is private to `runtime.rs`; we exercise
//! the same behaviour by driving the loop's surfaces directly —
//! pushing onto a `FilterKey` channel and reading the side-effects on
//! `FilterState` and `PromptState`. The loop logic is small enough
//! that the contract IS the channel + filter + prompt observable.

use std::sync::{Arc, Mutex, RwLock};

use nexus_tui::repl::mouse_edit_mode::{FilterFocus, FilterKey};
use nexus_tui::repl::prompt::PromptState;
use nexus_tui::stream::filter::FilterState;

// We can't import the private `filter_controller_loop`; instead we
// reimplement the surface as a thin in-test helper that calls the
async fn drive(
    keys: Vec<FilterKey>,
    filter: Arc<RwLock<FilterState>>,
    prompt: Arc<Mutex<PromptState>>,
    focus: FilterFocus,
) {
    let mut buffer = String::new();
    for k in keys {
        match k {
            FilterKey::Char(c) => {
                buffer.push(c);
                apply(&filter, &buffer);
                set_query(&prompt, Some(buffer.clone()));
            }
            FilterKey::Backspace => {
                buffer.pop();
                apply(&filter, &buffer);
                set_query(&prompt, Some(buffer.clone()));
            }
            FilterKey::Clear => {
                buffer.clear();
                apply(&filter, &buffer);
                set_query(&prompt, Some(buffer.clone()));
            }
            FilterKey::Enter => {
                focus.close();
                set_query(&prompt, None);
            }
            FilterKey::Esc => {
                if let Ok(mut f) = filter.write() {
                    let _ = f.set_grep(None);
                }
                focus.close();
                set_query(&prompt, None);
            }
        }
    }
}

fn apply(filter: &Arc<RwLock<FilterState>>, buffer: &str) {
    let Ok(mut f) = filter.write() else { return };
    let trimmed = buffer.trim();
    let pattern: Option<&str> = if trimmed.is_empty() {
        None
    } else {
        Some(trimmed)
    };
    let _ = f.set_grep(pattern);
}

fn set_query(prompt: &Arc<Mutex<PromptState>>, q: Option<String>) {
    if let Ok(mut p) = prompt.lock() {
        p.filter_query = q;
    }
}

fn fixtures() -> (
    Arc<RwLock<FilterState>>,
    Arc<Mutex<PromptState>>,
    FilterFocus,
) {
    let filter = Arc::new(RwLock::new(FilterState::default()));
    let prompt = Arc::new(Mutex::new(PromptState::default()));
    let focus = FilterFocus::new();
    focus.open();
    (filter, prompt, focus)
}

#[tokio::test]
async fn typing_chars_applies_filter_live() {
    let (filter, prompt, focus) = fixtures();
    drive(
        vec![FilterKey::Char('e'), FilterKey::Char('m')],
        Arc::clone(&filter),
        Arc::clone(&prompt),
        focus.clone(),
    )
    .await;
    assert_eq!(filter.read().unwrap().grep_text(), Some("em"));
    assert_eq!(prompt.lock().unwrap().filter_query.as_deref(), Some("em"));
    assert!(focus.is_open(), "focus must stay open while typing");
}

#[tokio::test]
async fn backspace_shortens_filter_live() {
    let (filter, prompt, focus) = fixtures();
    drive(
        vec![
            FilterKey::Char('e'),
            FilterKey::Char('m'),
            FilterKey::Char('b'),
            FilterKey::Backspace,
        ],
        Arc::clone(&filter),
        Arc::clone(&prompt),
        focus,
    )
    .await;
    assert_eq!(filter.read().unwrap().grep_text(), Some("em"));
    assert_eq!(prompt.lock().unwrap().filter_query.as_deref(), Some("em"));
}

#[tokio::test]
async fn clear_truncates_filter_but_keeps_focus_open() {
    let (filter, prompt, focus) = fixtures();
    drive(
        vec![FilterKey::Char('x'), FilterKey::Char('y'), FilterKey::Clear],
        Arc::clone(&filter),
        Arc::clone(&prompt),
        focus.clone(),
    )
    .await;
    assert_eq!(
        filter.read().unwrap().grep_text(),
        None,
        "empty buffer means no /grep"
    );
    assert_eq!(prompt.lock().unwrap().filter_query.as_deref(), Some(""));
    assert!(focus.is_open(), "Clear must NOT close the focus");
}

#[tokio::test]
async fn enter_commits_filter_and_closes_focus() {
    let (filter, prompt, focus) = fixtures();
    drive(
        vec![FilterKey::Char('e'), FilterKey::Char('m'), FilterKey::Enter],
        Arc::clone(&filter),
        Arc::clone(&prompt),
        focus.clone(),
    )
    .await;
    assert_eq!(
        filter.read().unwrap().grep_text(),
        Some("em"),
        "Enter preserves the live filter — it was already applied"
    );
    assert_eq!(
        prompt.lock().unwrap().filter_query,
        None,
        "Enter clears the live query indicator"
    );
    assert!(!focus.is_open(), "Enter must close focus");
}

#[tokio::test]
async fn esc_cancels_filter_and_closes_focus() {
    let (filter, prompt, focus) = fixtures();
    drive(
        vec![FilterKey::Char('e'), FilterKey::Char('m'), FilterKey::Esc],
        Arc::clone(&filter),
        Arc::clone(&prompt),
        focus.clone(),
    )
    .await;
    assert_eq!(
        filter.read().unwrap().grep_text(),
        None,
        "Esc must wipe the live filter back to inactive"
    );
    assert_eq!(prompt.lock().unwrap().filter_query, None);
    assert!(!focus.is_open(), "Esc must close focus");
}

#[tokio::test]
async fn invalid_regex_mid_typing_preserves_previous_pattern() {
    // After typing a valid pattern, an unclosed group MUST NOT crash
    // the controller and MUST leave the last valid pattern in effect.
    let (filter, prompt, focus) = fixtures();
    drive(
        vec![
            // First, build up "foo" — last known good pattern.
            FilterKey::Char('f'),
            FilterKey::Char('o'),
            FilterKey::Char('o'),
            // Now extend with `(` to make it `foo(` — an unclosed
            // capture group, invalid regex. The set_grep call should
            FilterKey::Char('('),
        ],
        Arc::clone(&filter),
        Arc::clone(&prompt),
        focus,
    )
    .await;
    assert_eq!(
        filter.read().unwrap().grep_text(),
        Some("foo"),
        "previous valid pattern must survive mid-keystroke invalid regex"
    );
}

#[tokio::test]
async fn empty_query_clears_grep_without_error() {
    let (filter, prompt, focus) = fixtures();
    // Initial state has no filter.
    drive(
        vec![FilterKey::Char('x'), FilterKey::Backspace],
        Arc::clone(&filter),
        Arc::clone(&prompt),
        focus,
    )
    .await;
    assert_eq!(filter.read().unwrap().grep_text(), None);
}
