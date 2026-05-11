//! Cluster-B — `/mixer` drawer renderer.
//!
//! Bottom-sheet view of every source observed in the session along
//! with its rate-guard counters AND current mute state. Operators see
//! a single table that answers: "what's loud, what's muted, and what
//! has been silent for a while?"
//!
//! Pinned correlations are surfaced in the footer so the operator
//! sees pin precedence over mute at a glance.

use std::time::Instant;

use crate::render::table::{Align, Cell, Column, Row, TableSpec, fmt_thousands, render_table};
use crate::stream::muted_sources::MutedSources;
use crate::stream::pinned_correlations::PinnedSet;
use crate::stream::rate_guard::RateGuardSnapshot;

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m";
const ANSI_VIOLET: &str = "\x1b[38;5;141m";
const ANSI_AMBER: &str = "\x1b[38;5;215m";
const ANSI_GREEN: &str = "\x1b[38;5;84m";
const ANSI_SLATE: &str = "\x1b[38;5;252m";
const ANSI_GRAPHITE_DIM: &str = "\x1b[38;5;245m";

#[derive(Debug, Clone)]
pub struct MixerRenderInput<'a> {
    pub snapshot: &'a RateGuardSnapshot,
    pub muted: &'a MutedSources,
    pub pinned: &'a PinnedSet,
    pub max_rows: usize,
    pub now: Instant,
}

pub fn render_mixer_drawer(input: &MixerRenderInput<'_>) -> String {
    let mut out = String::new();

    let columns = &[
        Column {
            header: "state",
            min_width: 5,
            align: Align::Left,
        },
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
        let stub = Row::new(vec![
            Cell::colored("(no sources observed yet)", ANSI_GRAPHITE_DIM),
            Cell::plain(""),
            Cell::plain(""),
            Cell::plain(""),
            Cell::plain(""),
        ]);
        out.push_str(&render_table(
            &TableSpec {
                title: Some("mixer · sources"),
                columns,
                indent: 3,
                show_density: false,
            },
            &[stub],
        ));
        out.push_str(&render_footer(input));
        return out;
    }

    let mut rows: Vec<_> = input.snapshot.per_source.iter().collect();
    rows.sort_by(|(name_a, a), (name_b, b)| {
        let muted_a = input.muted.matches_source(name_a);
        let muted_b = input.muted.matches_source(name_b);
        // unmuted before muted, then by total_observed DESC.
        muted_a
            .cmp(&muted_b)
            .then_with(|| b.total_observed.cmp(&a.total_observed))
    });
    let visible: Vec<_> = rows.iter().take(input.max_rows).collect();
    let rendered_rows: Vec<Row> = visible
        .iter()
        .map(|(source, snap)| {
            let muted = input.muted.matches_source(source);
            let state_cell = if muted {
                Cell::colored(" 🔇  ", ANSI_AMBER)
            } else {
                Cell::colored(" ▶  ", ANSI_GREEN)
            };
            let source_color = if muted {
                ANSI_GRAPHITE_DIM
            } else {
                ANSI_GRAPHITE_BLUE
            };
            let age = input
                .now
                .checked_duration_since(snap.last_seen)
                .unwrap_or_default();
            Row::new(vec![
                state_cell,
                Cell::colored(source.as_str(), source_color),
                Cell::colored(fmt_thousands(snap.total_observed), ANSI_VIOLET),
                Cell::colored(format!("{}/s", snap.current_second_count), ANSI_GREEN),
                Cell::colored(format_age(age), ANSI_GRAPHITE_DIM),
            ])
            .with_density(snap.total_observed)
        })
        .collect();
    out.push_str(&render_table(
        &TableSpec {
            title: Some("mixer · sources"),
            columns,
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

    out.push_str(&render_footer(input));
    out
}

fn render_footer(input: &MixerRenderInput<'_>) -> String {
    let mut out = String::new();
    let muted_count = input.muted.len();
    let pin_count = input.pinned.len();

    out.push_str(ANSI_GRAPHITE_BLUE);
    out.push('┃');
    out.push_str(ANSI_RESET);
    out.push_str("   ");
    out.push_str(ANSI_SLATE);
    out.push_str("muted=");
    out.push_str(ANSI_RESET);
    let muted_color = if muted_count > 0 {
        ANSI_AMBER
    } else {
        ANSI_GRAPHITE_DIM
    };
    out.push_str(muted_color);
    out.push_str(&muted_count.to_string());
    out.push_str(ANSI_RESET);
    if muted_count > 0 {
        out.push(' ');
        out.push_str(ANSI_GRAPHITE_DIM);
        let preview: Vec<&str> = input.muted.patterns().take(3).collect();
        out.push('[');
        out.push_str(&preview.join(", "));
        if input.muted.len() > 3 {
            out.push_str(", …");
        }
        out.push(']');
        out.push_str(ANSI_RESET);
    }
    out.push_str("    ");
    out.push_str(ANSI_SLATE);
    out.push_str("pinned=");
    out.push_str(ANSI_RESET);
    let pin_color = if pin_count > 0 {
        ANSI_VIOLET
    } else {
        ANSI_GRAPHITE_DIM
    };
    out.push_str(pin_color);
    out.push_str(&pin_count.to_string());
    out.push_str(ANSI_RESET);
    if pin_count > 0 {
        out.push(' ');
        out.push_str(ANSI_GRAPHITE_DIM);
        let summary = input.pinned.summary();
        let names: Vec<String> = summary.keys().take(3).cloned().collect();
        out.push('[');
        out.push_str(&names.join(", "));
        if summary.len() > 3 {
            out.push_str(", …");
        }
        out.push(']');
        out.push_str(ANSI_RESET);
    }
    out.push('\n');
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::stream::pinned_correlations::PinKey;
    use crate::stream::rate_guard::{RateGuardSnapshot, SourceSnapshot};
    use std::collections::BTreeMap;
    use std::time::Duration;

    fn fixture() -> RateGuardSnapshot {
        let mut per_source = BTreeMap::new();
        let now = Instant::now();
        per_source.insert(
            "host.banner".into(),
            SourceSnapshot {
                total_observed: 9_999,
                total_dropped: 0,
                current_second_count: 0,
                last_seen: now - Duration::from_secs(45),
            },
        );
        per_source.insert(
            "host.scheduler".into(),
            SourceSnapshot {
                total_observed: 1_234,
                total_dropped: 0,
                current_second_count: 5,
                last_seen: now,
            },
        );
        RateGuardSnapshot {
            cumulative_observed: 11_233,
            cumulative_dropped: 0,
            per_source,
        }
    }

    #[test]
    fn renders_table_and_footer_when_empty() {
        let snap = RateGuardSnapshot::default();
        let muted = MutedSources::new();
        let pinned = PinnedSet::new();
        let out = render_mixer_drawer(&MixerRenderInput {
            snapshot: &snap,
            muted: &muted,
            pinned: &pinned,
            max_rows: 20,
            now: Instant::now(),
        });
        let stripped = strip_ansi(&out);
        assert!(stripped.contains("mixer · sources"));
        assert!(stripped.contains("no sources observed"));
        assert!(stripped.contains("muted="));
        assert!(stripped.contains("pinned="));
    }

    #[test]
    fn unmuted_sources_render_first() {
        let snap = fixture();
        let mut muted = MutedSources::new();
        muted.mute("host.banner").unwrap();
        let pinned = PinnedSet::new();
        let out = render_mixer_drawer(&MixerRenderInput {
            snapshot: &snap,
            muted: &muted,
            pinned: &pinned,
            max_rows: 20,
            now: Instant::now(),
        });
        let sched_idx = out.find("host.scheduler").expect("scheduler row missing");
        let banner_idx = out.find("host.banner").expect("banner row missing");
        assert!(
            sched_idx < banner_idx,
            "unmuted host.scheduler must render before muted host.banner"
        );
    }

    #[test]
    fn muted_glyph_appears_for_muted_sources() {
        let snap = fixture();
        let mut muted = MutedSources::new();
        muted.mute("host.banner").unwrap();
        let pinned = PinnedSet::new();
        let out = render_mixer_drawer(&MixerRenderInput {
            snapshot: &snap,
            muted: &muted,
            pinned: &pinned,
            max_rows: 20,
            now: Instant::now(),
        });
        assert!(out.contains("🔇"));
    }

    #[test]
    fn footer_shows_pinned_summary() {
        let snap = fixture();
        let muted = MutedSources::new();
        let mut pinned = PinnedSet::new();
        pinned.pin("run:abc".parse::<PinKey>().unwrap());
        let out = render_mixer_drawer(&MixerRenderInput {
            snapshot: &snap,
            muted: &muted,
            pinned: &pinned,
            max_rows: 20,
            now: Instant::now(),
        });
        let stripped = strip_ansi(&out);
        assert!(stripped.contains("pinned=1"), "stripped: {stripped}");
        assert!(stripped.contains("run:abc"));
    }

    #[test]
    fn footer_shows_muted_preview() {
        let snap = fixture();
        let mut muted = MutedSources::new();
        muted.mute("host.*").unwrap();
        muted.mute("deploy:noisy").unwrap();
        let pinned = PinnedSet::new();
        let out = render_mixer_drawer(&MixerRenderInput {
            snapshot: &snap,
            muted: &muted,
            pinned: &pinned,
            max_rows: 20,
            now: Instant::now(),
        });
        let stripped = strip_ansi(&out);
        assert!(stripped.contains("muted=2"), "stripped: {stripped}");
        assert!(stripped.contains("host.*"));
    }

    fn strip_ansi(s: &str) -> String {
        let mut out = String::with_capacity(s.len());
        let mut chars = s.chars().peekable();
        while let Some(c) = chars.next() {
            if c == '\x1b' && chars.peek() == Some(&'[') {
                chars.next();
                for ch in chars.by_ref() {
                    if ch.is_ascii_alphabetic() {
                        break;
                    }
                }
            } else {
                out.push(c);
            }
        }
        out
    }
}
