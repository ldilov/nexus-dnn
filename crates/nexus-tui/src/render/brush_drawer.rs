//! Cluster-C — `/brush` drawer renderer.
//!
//! Shows the current brush selection (one row per selected event) and
//! a preview of the filter that `/yank` would apply.

use std::time::Instant;

use crate::render::table::{Align, Cell, Column, Row, TableSpec, render_table};
use crate::stream::brush_selection::BrushSelection;
use crate::stream::event_line::EventLine;
use crate::stream::filter_inference::infer_from;
use crate::stream::ring_buffer::RingBuffer;

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m";
const ANSI_VIOLET: &str = "\x1b[38;5;141m";
const ANSI_AMBER: &str = "\x1b[38;5;215m";
const ANSI_SLATE: &str = "\x1b[38;5;252m";
const ANSI_GRAPHITE_DIM: &str = "\x1b[38;5;245m";

#[derive(Debug, Clone)]
pub struct BrushRenderInput<'a> {
    pub selection: &'a BrushSelection,
    pub ring: &'a RingBuffer,
    pub max_rows: usize,
    pub now: Instant,
}

pub fn render_brush_drawer(input: &BrushRenderInput<'_>) -> String {
    let mut out = String::new();

    if input.selection.is_empty() {
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push('┃');
        out.push_str(ANSI_RESET);
        out.push(' ');
        out.push_str("\x1b[1m");
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push_str("▾ brush · empty");
        out.push_str(ANSI_RESET);
        out.push('\n');
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push('┃');
        out.push_str(ANSI_RESET);
        out.push_str("   ");
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str("type ");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_VIOLET);
        out.push_str("/brush-add <event-id>");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str(" to paint events into the selection · ");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_VIOLET);
        out.push_str("/yank");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str(" applies the inferred filter");
        out.push_str(ANSI_RESET);
        out.push('\n');
        return out;
    }

    // Resolve selected event IDs against the ring buffer.
    let resolved: Vec<&EventLine> = input
        .selection
        .as_slice()
        .iter()
        .filter_map(|id| input.ring.inspect_by_id(*id))
        .collect();

    let columns = &[
        Column {
            header: "#",
            min_width: 2,
            align: Align::Right,
        },
        Column {
            header: "severity",
            min_width: 8,
            align: Align::Left,
        },
        Column {
            header: "source",
            min_width: 22,
            align: Align::Left,
        },
        Column {
            header: "summary",
            min_width: 30,
            align: Align::Left,
        },
    ];

    let rendered_rows: Vec<Row> = resolved
        .iter()
        .take(input.max_rows)
        .enumerate()
        .map(|(idx, evt)| {
            let trimmed_summary = truncate(&evt.summary, 60);
            Row::new(vec![
                Cell::colored(format!("{}", idx + 1), ANSI_VIOLET),
                Cell::colored(severity_label(evt.severity), severity_color(evt.severity)),
                Cell::colored(evt.source.as_str(), ANSI_GRAPHITE_BLUE),
                Cell::colored(trimmed_summary, ANSI_SLATE),
            ])
        })
        .collect();

    out.push_str(&render_table(
        &TableSpec {
            title: Some(&format!("brush · {} selected", input.selection.len())),
            columns,
            indent: 3,
            show_density: false,
        },
        &rendered_rows,
    ));

    if resolved.len() < input.selection.len() {
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push('┃');
        out.push_str(ANSI_RESET);
        out.push_str("   ");
        out.push_str(ANSI_GRAPHITE_DIM);
        let stale = input.selection.len() - resolved.len();
        out.push_str(&format!(
            "({stale} selected event(s) evicted from ring buffer)"
        ));
        out.push_str(ANSI_RESET);
        out.push('\n');
    }

    // Inferred filter preview.
    let inferred = infer_from(&resolved);
    out.push_str(ANSI_GRAPHITE_BLUE);
    out.push('┃');
    out.push_str(ANSI_RESET);
    out.push(' ');
    out.push_str("\x1b[1m");
    out.push_str(ANSI_GRAPHITE_BLUE);
    out.push_str("▾ inferred filter");
    out.push_str(ANSI_RESET);
    out.push('\n');

    let commands = inferred.as_slash_commands();
    if commands.is_empty() {
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push('┃');
        out.push_str(ANSI_RESET);
        out.push_str("   ");
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str("(no common shape — try a tighter selection)");
        out.push_str(ANSI_RESET);
        out.push('\n');
    } else {
        for cmd in &commands {
            out.push_str(ANSI_GRAPHITE_BLUE);
            out.push('┃');
            out.push_str(ANSI_RESET);
            out.push_str("   ");
            out.push_str(ANSI_AMBER);
            out.push_str("▸ ");
            out.push_str(ANSI_RESET);
            out.push_str(ANSI_VIOLET);
            out.push_str(cmd);
            out.push_str(ANSI_RESET);
            out.push('\n');
        }
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push('┃');
        out.push_str(ANSI_RESET);
        out.push_str("   ");
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str("type ");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_VIOLET);
        out.push_str("/yank");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str(" to apply · ");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_VIOLET);
        out.push_str("/brush-clear");
        out.push_str(ANSI_RESET);
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str(" to reset");
        out.push_str(ANSI_RESET);
        out.push('\n');
    }

    out
}

fn severity_label(s: crate::stream::severity::Severity) -> &'static str {
    use crate::stream::severity::Severity;
    match s {
        Severity::Debug => "DEBUG",
        Severity::Info => "INFO",
        Severity::Warn => "WARN",
        Severity::Error => "ERROR",
        Severity::Fatal => "FATAL",
    }
}

fn severity_color(s: crate::stream::severity::Severity) -> &'static str {
    use crate::stream::severity::Severity;
    match s {
        Severity::Debug => ANSI_GRAPHITE_DIM,
        Severity::Info => ANSI_GRAPHITE_BLUE,
        Severity::Warn => ANSI_AMBER,
        Severity::Error | Severity::Fatal => "\x1b[38;5;203m",
    }
}

fn truncate(s: &str, max: usize) -> String {
    let chars: Vec<char> = s.chars().collect();
    if chars.len() <= max {
        s.to_string()
    } else {
        let mut out: String = chars.into_iter().take(max - 1).collect();
        out.push('…');
        out
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stream::event_id::RingBufferCapacity;
    use crate::stream::ring_buffer::RingBuffer;
    use nexus_events::types::NexusEvent;
    use std::collections::BTreeMap;

    fn ring_with(events: Vec<EventLine>) -> RingBuffer {
        let cap = RingBufferCapacity::new(1_000).unwrap();
        let mut ring = RingBuffer::new(cap);
        for e in events {
            ring.push(e);
        }
        ring
    }

    fn host_log(target: &str, msg: &str) -> EventLine {
        EventLine::from_nexus_event(NexusEvent::HostLog {
            level: "info".into(),
            target: target.into(),
            message: msg.into(),
            fields: BTreeMap::new(),
            span_path: None,
            timestamp_ms: 0,
        })
    }

    #[test]
    fn empty_selection_renders_help() {
        let sel = BrushSelection::new();
        let ring = ring_with(vec![]);
        let out = render_brush_drawer(&BrushRenderInput {
            selection: &sel,
            ring: &ring,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("brush · empty"));
        assert!(out.contains("/brush-add"));
        assert!(out.contains("/yank"));
    }

    #[test]
    fn non_empty_selection_renders_table_and_inference() {
        let a = host_log("scheduler", "deployment chat-prod failed");
        let b = host_log("scheduler", "deployment chat-prod retried");
        let mut sel = BrushSelection::new();
        sel.add(a.id);
        sel.add(b.id);
        let ring = ring_with(vec![a, b]);
        let out = render_brush_drawer(&BrushRenderInput {
            selection: &sel,
            ring: &ring,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("brush · 2 selected"));
        assert!(out.contains("inferred filter"));
        assert!(out.contains("/source host.scheduler"));
        assert!(out.contains("/grep deployment"));
    }

    #[test]
    fn reports_stale_count_when_events_evicted() {
        let a = host_log("scheduler", "alive");
        let stale_id = crate::EventId::from_ulid(ulid::Ulid::new());
        let mut sel = BrushSelection::new();
        sel.add(a.id);
        sel.add(stale_id);
        let ring = ring_with(vec![a]);
        let out = render_brush_drawer(&BrushRenderInput {
            selection: &sel,
            ring: &ring,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("1 selected event(s) evicted"));
    }
}
