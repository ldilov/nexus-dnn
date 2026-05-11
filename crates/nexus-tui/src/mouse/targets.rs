//! `ClickRegistry` — maps `(terminal_row, col_range)` → `ClickTarget`.
//!
//! The registry is rebuilt on every render of an interactive surface
//! (event line, prompt, inspector). When ambient lines are emitted
//! above the prompt the existing entries shift up by one row.

use std::ops::Range;

use crate::EventId;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ClickTarget {
    EventLineBody { event_id: EventId },
    SourceLabel { source: String },
    RunIdReference { run_id: String },
    FilterIndicator,
    Sparkline,
    InspectorHeading { event_id: EventId },
}

impl ClickTarget {
    pub fn whisper_hint(&self) -> &'static str {
        match self {
            ClickTarget::EventLineBody { .. } => "[f: spotlight | i: inspect | b: bookmark]",
            ClickTarget::SourceLabel { .. } => "[click: filter to source | shift-click: invert]",
            ClickTarget::RunIdReference { .. } => "[click: follow run | esc: clear]",
            ClickTarget::FilterIndicator => "[click: toggle | shift-click: invert | drag: brush]",
            ClickTarget::Sparkline => "[click: pause | drag: time-scrub]",
            ClickTarget::InspectorHeading { .. } => "[enter: expand | esc: collapse]",
        }
    }

    pub fn keyboard_shortcut(&self) -> Option<&'static str> {
        match self {
            ClickTarget::EventLineBody { .. } => Some("f / i / b"),
            ClickTarget::FilterIndicator => Some("Ctrl+F"),
            ClickTarget::Sparkline => Some("Ctrl+G"),
            ClickTarget::SourceLabel { .. } | ClickTarget::RunIdReference { .. } => None,
            ClickTarget::InspectorHeading { .. } => Some("Enter"),
        }
    }
}

#[derive(Debug, Clone)]
struct Entry {
    row: i32,
    col_range: Range<u16>,
    target: ClickTarget,
}

#[derive(Debug, Default)]
pub struct ClickRegistry {
    entries: Vec<Entry>,
}

impl ClickRegistry {
    pub fn register(&mut self, row: u16, col_range: Range<u16>, target: ClickTarget) {
        self.entries.push(Entry {
            row: row as i32,
            col_range,
            target,
        });
    }

    pub fn lookup(&self, row: u16, col: u16) -> Option<ClickTarget> {
        self.entries.iter().rev().find_map(|entry| {
            if entry.row >= 0 && entry.row as u16 == row && entry.col_range.contains(&col) {
                Some(entry.target.clone())
            } else {
                None
            }
        })
    }

    pub fn shift_rows_up(&mut self, by: u16) {
        let by_i32 = by as i32;
        for entry in &mut self.entries {
            entry.row -= by_i32;
        }
        self.entries.retain(|entry| entry.row >= 0);
    }

    pub fn clear(&mut self) {
        self.entries.clear();
    }

    pub fn clear_row(&mut self, row: u16) {
        let row_i32 = row as i32;
        self.entries.retain(|entry| entry.row != row_i32);
    }

    /// Drop every entry whose target matches `predicate`. Useful for
    /// surfaces that own a known set of target kinds (e.g. the prompt
    /// owns `Sparkline` + `FilterIndicator`) and want to evict stale
    /// rows after a redraw without having to remember the prior row.
    pub fn retain_targets<F: FnMut(&ClickTarget) -> bool>(&mut self, mut keep: F) {
        self.entries.retain(|entry| keep(&entry.target));
    }

    pub fn len(&self) -> usize {
        self.entries.len()
    }

    pub fn is_empty(&self) -> bool {
        self.entries.is_empty()
    }
}

/// Decision returned by [`click_row_after_print`] describing where to anchor
/// click targets for the line just emitted and whether the existing
/// registry needs to be shifted up because the terminal scrolled.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ClickRowDecision {
    /// The println advanced the cursor without scrolling the screen.
    /// Register at `line_row`; do not shift the registry.
    Advanced { line_row: u16 },
    /// The terminal scrolled (cursor stayed at the same row because the
    /// content above moved up by one). Existing entries must be shifted
    /// up by one row before registering at `line_row`.
    Scrolled { line_row: u16 },
    /// The cursor position could not be read on at least one side of the
    /// print. No registration is attempted for this line.
    Unknown,
}

/// Decide the click-target row for a line that was just printed.
///
/// `old_row` is the row reported by `crossterm::cursor::position()` BEFORE
/// the print; `new_row` is the row reported AFTER. Both may be `None`
/// when the terminal refused the position query (pipe, dumb terminal,
/// transient error) — in that case the caller skips registration rather
/// than guessing.
///
/// Reasoning:
/// - In a non-fullscreen terminal, `println!` advances the cursor by one
///   row unless the cursor is already on the last visible row, in which
///   case the terminal scrolls all visible content up by one and the
///   cursor stays where it was.
/// - The just-emitted line therefore sits at `new_row - 1` in BOTH cases;
///   the difference is whether existing registry entries need shifting.
pub fn click_row_after_print(old_row: Option<u16>, new_row: Option<u16>) -> ClickRowDecision {
    match (old_row, new_row) {
        (Some(_), Some(0)) => {
            // Edge case: cursor wrapped to row 0 (very small terminal).
            // Treat as scroll, anchor at row 0.
            ClickRowDecision::Scrolled { line_row: 0 }
        }
        (Some(old), Some(new)) if new == old => ClickRowDecision::Scrolled {
            line_row: new.saturating_sub(1),
        },
        (Some(_), Some(new)) => ClickRowDecision::Advanced {
            line_row: new.saturating_sub(1),
        },
        _ => ClickRowDecision::Unknown,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn click_row_after_print_advances_when_cursor_moved_down() {
        let decision = click_row_after_print(Some(5), Some(6));
        assert_eq!(decision, ClickRowDecision::Advanced { line_row: 5 });
    }

    #[test]
    fn click_row_after_print_detects_scroll_when_cursor_stayed_put() {
        let decision = click_row_after_print(Some(24), Some(24));
        assert_eq!(decision, ClickRowDecision::Scrolled { line_row: 23 });
    }

    #[test]
    fn click_row_after_print_handles_failed_cursor_read() {
        assert_eq!(
            click_row_after_print(None, Some(5)),
            ClickRowDecision::Unknown
        );
        assert_eq!(
            click_row_after_print(Some(5), None),
            ClickRowDecision::Unknown
        );
        assert_eq!(click_row_after_print(None, None), ClickRowDecision::Unknown);
    }

    #[test]
    fn click_row_after_print_handles_row_zero_wrap() {
        let decision = click_row_after_print(Some(0), Some(0));
        assert_eq!(decision, ClickRowDecision::Scrolled { line_row: 0 });
    }

    #[test]
    fn shift_rows_up_keeps_entries_at_correct_row_after_scroll() {
        let mut reg = ClickRegistry::default();
        reg.register(
            5,
            0..10,
            ClickTarget::SourceLabel {
                source: "host.api".into(),
            },
        );
        reg.shift_rows_up(1);
        assert!(
            reg.lookup(5, 5).is_none(),
            "entry must have moved off row 5"
        );
        assert!(
            reg.lookup(4, 5).is_some(),
            "entry must now be reachable at row 4"
        );
    }

    #[test]
    fn retain_targets_drops_prompt_kinds_only() {
        let mut reg = ClickRegistry::default();
        reg.register(1, 0..8, ClickTarget::Sparkline);
        reg.register(1, 10..14, ClickTarget::FilterIndicator);
        reg.register(
            5,
            0..8,
            ClickTarget::SourceLabel {
                source: "host".into(),
            },
        );
        reg.retain_targets(|t| !matches!(t, ClickTarget::Sparkline | ClickTarget::FilterIndicator));
        assert_eq!(reg.len(), 1, "only the SourceLabel entry should remain");
        assert!(reg.lookup(5, 4).is_some());
    }

    #[test]
    fn scroll_then_register_full_flow() {
        let mut reg = ClickRegistry::default();
        reg.register(
            10,
            0..8,
            ClickTarget::SourceLabel {
                source: "old".into(),
            },
        );
        let decision = click_row_after_print(Some(24), Some(24));
        match decision {
            ClickRowDecision::Scrolled { line_row } => {
                reg.shift_rows_up(1);
                reg.register(
                    line_row,
                    0..8,
                    ClickTarget::SourceLabel {
                        source: "new".into(),
                    },
                );
            }
            _ => panic!("expected Scrolled"),
        }
        assert!(reg.lookup(9, 4).is_some(), "old entry must be at row 9 now");
        assert!(reg.lookup(23, 4).is_some(), "new entry must be at row 23");
    }
}
