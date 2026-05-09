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

    pub fn len(&self) -> usize {
        self.entries.len()
    }

    pub fn is_empty(&self) -> bool {
        self.entries.is_empty()
    }
}
