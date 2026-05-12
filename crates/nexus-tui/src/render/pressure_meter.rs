//! Cluster-A — `/pressure` drawer renderer.
//!
//! Inspector-style block (`┃` heavy gutter) summarising the rate-guard
//! and hold-queue state since session start. Two stacked tables:
//!   1. **Totals** — held / dropped / observed across the whole session.
//!   2. **Per source** — every active source sorted by `total_dropped`
//!      DESC then `total_observed` DESC. Includes a density bar
//!      visualising relative volume.

use std::time::Instant;

use crate::render::table::{Align, Cell, Column, Row, TableSpec, fmt_thousands, render_table};
use crate::stream::rate_guard::RateGuardSnapshot;

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_BOLD: &str = "\x1b[1m";
const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m";
const ANSI_VIOLET: &str = "\x1b[38;5;141m";
const ANSI_AMBER: &str = "\x1b[38;5;215m";
const ANSI_GREEN: &str = "\x1b[38;5;84m";
const ANSI_RED: &str = "\x1b[38;5;203m";
const ANSI_GRAPHITE_DIM: &str = "\x1b[38;5;245m";

#[derive(Debug, Clone)]
pub struct PressureRenderInput<'a> {
    pub snapshot: &'a RateGuardSnapshot,
    pub held: u32,
    pub max_rows: usize,
    pub now: Instant,
}

pub fn render_pressure_drawer(input: &PressureRenderInput<'_>) -> String {
    let mut out = String::new();

    // Totals table.
    let totals_columns = &[
        Column {
            header: "held",
            min_width: 6,
            align: Align::Right,
        },
        Column {
            header: "dropped",
            min_width: 8,
            align: Align::Right,
        },
        Column {
            header: "observed",
            min_width: 10,
            align: Align::Right,
        },
    ];
    let held_color = if input.held > 0 {
        ANSI_AMBER
    } else {
        ANSI_GRAPHITE_DIM
    };
    let drop_color = if input.snapshot.cumulative_dropped > 0 {
        ANSI_RED
    } else {
        ANSI_GRAPHITE_DIM
    };
    let totals_row = Row::new(vec![
        Cell::colored(bold(&fmt_thousands(u64::from(input.held))), held_color),
        Cell::colored(
            bold(&fmt_thousands(input.snapshot.cumulative_dropped)),
            drop_color,
        ),
        Cell::colored(
            bold(&fmt_thousands(input.snapshot.cumulative_observed)),
            ANSI_VIOLET,
        ),
    ]);
    out.push_str(&render_table(
        &TableSpec {
            title: Some("⚡ pressure · totals"),
            columns: totals_columns,
            indent: 3,
            show_density: false,
        },
        &[totals_row],
    ));

    // Per-source table.
    let per_columns = &[
        Column {
            header: "source",
            min_width: 22,
            align: Align::Left,
        },
        Column {
            header: "obs",
            min_width: 7,
            align: Align::Right,
        },
        Column {
            header: "drop",
            min_width: 6,
            align: Align::Right,
        },
        Column {
            header: "rate",
            min_width: 6,
            align: Align::Right,
        },
        Column {
            header: "last",
            min_width: 5,
            align: Align::Right,
        },
    ];

    if input.snapshot.per_source.is_empty() {
        // Render a stub row so the operator sees the empty state, not
        // a header floating alone.
        let stub = Row::new(vec![
            Cell::colored("(no sources observed yet)", ANSI_GRAPHITE_DIM),
            Cell::plain(""),
            Cell::plain(""),
            Cell::plain(""),
            Cell::plain(""),
        ]);
        out.push_str(&render_table(
            &TableSpec {
                title: Some("◈ per source"),
                columns: per_columns,
                indent: 3,
                show_density: false,
            },
            &[stub],
        ));
        return out;
    }

    let mut rows: Vec<_> = input.snapshot.per_source.iter().collect();
    rows.sort_by(|(_, a), (_, b)| {
        b.total_dropped
            .cmp(&a.total_dropped)
            .then_with(|| b.total_observed.cmp(&a.total_observed))
    });
    let visible: Vec<_> = rows.iter().take(input.max_rows).collect();
    let rendered_rows: Vec<Row> = visible
        .iter()
        .map(|(source, snap)| {
            let drop_color = if snap.total_dropped > 0 {
                ANSI_RED
            } else {
                ANSI_GRAPHITE_DIM
            };
            let age = input
                .now
                .checked_duration_since(snap.last_seen)
                .unwrap_or_default();
            Row::new(vec![
                Cell::colored(source.as_str(), ANSI_GRAPHITE_BLUE),
                Cell::colored(fmt_thousands(snap.total_observed), ANSI_VIOLET),
                Cell::colored(fmt_thousands(snap.total_dropped), drop_color),
                Cell::colored(format!("{}/s", snap.current_second_count), ANSI_GREEN),
                Cell::colored(format_age(age), ANSI_GRAPHITE_DIM),
            ])
            .with_density(snap.total_observed)
        })
        .collect();
    out.push_str(&render_table(
        &TableSpec {
            title: Some("◈ per source"),
            columns: per_columns,
            indent: 3,
            show_density: true,
        },
        &rendered_rows,
    ));

    if rows.len() > input.max_rows {
        out.push_str(ANSI_GRAPHITE_BLUE);
        out.push('┃');
        out.push_str(ANSI_RESET);
        out.push_str("   ");
        out.push_str(ANSI_GRAPHITE_DIM);
        out.push_str(&format!("(+{} more sources)", rows.len() - input.max_rows));
        out.push_str(ANSI_RESET);
        out.push('\n');
    }
    out
}

fn bold(text: &str) -> String {
    format!("{ANSI_BOLD}{text}{ANSI_RESET}")
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
    fn renders_totals_table_with_thousands_separators() {
        let snap = fixture_snapshot();
        let out = render_pressure_drawer(&PressureRenderInput {
            snapshot: &snap,
            held: 42,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("⚡ pressure · totals"));
        assert!(
            out.contains("11,233"),
            "observed must use thousands sep: {out}"
        );
        assert!(out.contains("42"));
        assert!(out.contains("234"));
    }

    #[test]
    fn renders_per_source_table_sorted_by_dropped() {
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
    fn renders_density_column_with_bars() {
        let snap = fixture_snapshot();
        let out = render_pressure_drawer(&PressureRenderInput {
            snapshot: &snap,
            held: 0,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("density"));
        // At least one bar glyph must be present.
        assert!(out.contains('█') || out.contains('▇'));
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
