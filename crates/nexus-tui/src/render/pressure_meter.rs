//! Cluster-A — `/pressure` drawer renderer.
//!
//! Inspector-style block (`┃` heavy gutter) summarising the rate-guard
//! and hold-queue state since session start. Pure-fn: takes a snapshot
//! plus an optional hold-queue depth, returns a coloured String.

use std::time::Instant;

use crate::stream::rate_guard::RateGuardSnapshot;

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_BOLD: &str = "\x1b[1m";
const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m";
const ANSI_VIOLET: &str = "\x1b[38;5;141m";
const ANSI_AMBER: &str = "\x1b[38;5;215m";
const ANSI_GREEN: &str = "\x1b[38;5;84m";
const ANSI_RED: &str = "\x1b[38;5;203m";
const ANSI_SLATE: &str = "\x1b[38;5;252m";
const ANSI_GRAPHITE_DIM: &str = "\x1b[38;5;245m";
const GUTTER: &str = "┃";

#[derive(Debug, Clone)]
pub struct PressureRenderInput<'a> {
    pub snapshot: &'a RateGuardSnapshot,
    pub held: u32,
    pub max_rows: usize,
    pub now: Instant,
}

pub fn render_pressure_drawer(input: &PressureRenderInput<'_>) -> String {
    let mut out = String::new();

    // Header.
    push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
    out.push(' ');
    push(
        &mut out,
        "▾ pressure",
        &format!("{ANSI_BOLD}{ANSI_GRAPHITE_BLUE}"),
    );
    out.push('\n');

    // Totals row.
    push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
    out.push_str("   ");
    push(&mut out, "held=", ANSI_SLATE);
    let held_color = if input.held > 0 {
        ANSI_AMBER
    } else {
        ANSI_GRAPHITE_DIM
    };
    push(
        &mut out,
        &format!("{ANSI_BOLD}{}{ANSI_RESET}", input.held),
        held_color,
    );
    out.push_str("  ");
    push(&mut out, "dropped=", ANSI_SLATE);
    let drop_color = if input.snapshot.cumulative_dropped > 0 {
        ANSI_RED
    } else {
        ANSI_GRAPHITE_DIM
    };
    push(
        &mut out,
        &format!(
            "{ANSI_BOLD}{}{ANSI_RESET}",
            input.snapshot.cumulative_dropped
        ),
        drop_color,
    );
    out.push_str("  ");
    push(&mut out, "observed=", ANSI_SLATE);
    push(
        &mut out,
        &format!(
            "{ANSI_BOLD}{}{ANSI_RESET}",
            input.snapshot.cumulative_observed
        ),
        ANSI_VIOLET,
    );
    out.push('\n');

    // Per-source table heading.
    push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
    out.push(' ');
    push(
        &mut out,
        "▾ per source",
        &format!("{ANSI_BOLD}{ANSI_GRAPHITE_BLUE}"),
    );
    out.push('\n');

    if input.snapshot.per_source.is_empty() {
        push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
        out.push_str("   ");
        push(&mut out, "(no sources observed yet)", ANSI_GRAPHITE_DIM);
        out.push('\n');
    } else {
        // Sort by dropped DESC then observed DESC — busiest at the top.
        let mut rows: Vec<_> = input.snapshot.per_source.iter().collect();
        rows.sort_by(|(_, a), (_, b)| {
            b.total_dropped
                .cmp(&a.total_dropped)
                .then_with(|| b.total_observed.cmp(&a.total_observed))
        });
        for (source, snap) in rows.iter().take(input.max_rows) {
            push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
            out.push_str("   ");
            push(
                &mut out,
                &format!("{source:<28}"),
                &format!("{ANSI_BOLD}{ANSI_GRAPHITE_BLUE}"),
            );
            push(&mut out, "  ", ANSI_RESET);
            push(&mut out, "obs ", ANSI_SLATE);
            push(
                &mut out,
                &format!("{:>6}", snap.total_observed),
                ANSI_VIOLET,
            );
            push(&mut out, "  drop ", ANSI_SLATE);
            let drop_color = if snap.total_dropped > 0 {
                ANSI_RED
            } else {
                ANSI_GRAPHITE_DIM
            };
            push(&mut out, &format!("{:>6}", snap.total_dropped), drop_color);
            push(&mut out, "  rate ", ANSI_SLATE);
            push(
                &mut out,
                &format!("{:>5}/s", snap.current_second_count),
                ANSI_GREEN,
            );
            push(&mut out, "  last ", ANSI_SLATE);
            let age = input
                .now
                .checked_duration_since(snap.last_seen)
                .unwrap_or_default();
            push(&mut out, &format_age(age), ANSI_GRAPHITE_DIM);
            out.push('\n');
        }
        if rows.len() > input.max_rows {
            push(&mut out, GUTTER, ANSI_GRAPHITE_BLUE);
            out.push_str("   ");
            push(
                &mut out,
                &format!("(+{} more sources)", rows.len() - input.max_rows),
                ANSI_GRAPHITE_DIM,
            );
            out.push('\n');
        }
    }
    out
}

fn format_age(d: std::time::Duration) -> String {
    let s = d.as_secs();
    if s < 60 {
        format!("{s}s")
    } else if s < 3600 {
        format!("{}m{:02}s", s / 60, s % 60)
    } else {
        format!("{}h{:02}m", s / 3600, (s % 3600) / 60)
    }
}

fn push(out: &mut String, text: &str, color: &str) {
    out.push_str(color);
    out.push_str(text);
    out.push_str(ANSI_RESET);
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stream::rate_guard::{RateGuardSnapshot, SourceSnapshot};
    use std::collections::BTreeMap;
    use std::time::Duration;

    fn fixture_snapshot() -> RateGuardSnapshot {
        let mut per_source = BTreeMap::new();
        let now = Instant::now();
        per_source.insert(
            "host.scheduler".into(),
            SourceSnapshot {
                total_observed: 1_234,
                total_dropped: 0,
                current_second_count: 5,
                last_seen: now,
            },
        );
        per_source.insert(
            "host.banner".into(),
            SourceSnapshot {
                total_observed: 9_999,
                total_dropped: 234,
                current_second_count: 0,
                last_seen: now - Duration::from_secs(45),
            },
        );
        RateGuardSnapshot {
            cumulative_observed: 11_233,
            cumulative_dropped: 234,
            per_source,
        }
    }

    #[test]
    fn renders_header_and_totals() {
        let snap = fixture_snapshot();
        let out = render_pressure_drawer(&PressureRenderInput {
            snapshot: &snap,
            held: 42,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("▾ pressure"));
        assert!(out.contains("held="));
        assert!(out.contains("42"));
        assert!(out.contains("dropped="));
        assert!(out.contains("234"));
        assert!(out.contains("observed="));
        assert!(out.contains("11233"));
    }

    #[test]
    fn renders_sources_sorted_by_dropped() {
        let snap = fixture_snapshot();
        let out = render_pressure_drawer(&PressureRenderInput {
            snapshot: &snap,
            held: 0,
            max_rows: 20,
            now: Instant::now(),
        });
        let banner_idx = out.find("host.banner").expect("banner row missing");
        let scheduler_idx = out.find("host.scheduler").expect("scheduler row missing");
        assert!(
            banner_idx < scheduler_idx,
            "host.banner (more drops) must appear before host.scheduler"
        );
    }

    #[test]
    fn renders_empty_state_when_no_sources_observed() {
        let snap = RateGuardSnapshot::default();
        let out = render_pressure_drawer(&PressureRenderInput {
            snapshot: &snap,
            held: 0,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("no sources observed"));
    }

    #[test]
    fn truncates_to_max_rows() {
        let mut per_source = BTreeMap::new();
        let now = Instant::now();
        for i in 0..30u8 {
            per_source.insert(
                format!("src.{i:02}"),
                SourceSnapshot {
                    total_observed: 1,
                    total_dropped: 0,
                    current_second_count: 0,
                    last_seen: now,
                },
            );
        }
        let snap = RateGuardSnapshot {
            cumulative_observed: 30,
            cumulative_dropped: 0,
            per_source,
        };
        let out = render_pressure_drawer(&PressureRenderInput {
            snapshot: &snap,
            held: 0,
            max_rows: 10,
            now,
        });
        assert!(out.contains("(+20 more sources)"));
    }

    #[test]
    fn formats_age_under_one_minute() {
        assert_eq!(format_age(Duration::from_secs(5)), "5s");
    }

    #[test]
    fn formats_age_under_one_hour() {
        assert_eq!(format_age(Duration::from_secs(125)), "2m05s");
    }

    #[test]
    fn formats_age_over_one_hour() {
        assert_eq!(format_age(Duration::from_secs(3_725)), "1h02m");
    }
}
