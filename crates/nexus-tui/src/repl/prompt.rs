//! Reedline prompt that renders a context label + sparkline.

use std::borrow::Cow;
use std::sync::{Arc, Mutex};

use reedline::{Prompt, PromptEditMode, PromptHistorySearch, PromptHistorySearchStatus};

use crate::mouse::targets::{ClickRegistry, ClickTarget};
use crate::render::sparkline::{
    SparklineSamples, render_sparkline, render_sparkline_with_gradient,
};
use crate::repl::ansi::{ColorDepth, SPECTRAL_PRIMARY, SPECTRAL_SECONDARY};
use crate::repl::verbosity::VerbosityLevel;

/// Query the terminal for the current cursor row. Returns `None` when
/// the terminal refuses the query (pipe, dumb terminal, transient
/// error) so callers can skip click-target registration rather than
/// anchoring to a hard-coded row that won't match real clicks.
fn current_prompt_row() -> Option<u16> {
    crossterm::cursor::position().ok().map(|(_, row)| row)
}

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_DIM: &str = "\x1b[2m";
const ANSI_ACCENT_CYAN: &str = "\x1b[38;5;75m"; // graphite blue
const ANSI_ACCENT_VIOLET: &str = "\x1b[38;5;141m";
const ANSI_ACCENT_AMBER: &str = "\x1b[38;5;215m";
const ANSI_ACCENT_GREEN: &str = "\x1b[38;5;84m";
const ANSI_ACCENT_RED: &str = "\x1b[38;5;203m";
const ANSI_ACCENT_DIM: &str = "\x1b[38;5;245m";
const ANSI_BOLD: &str = "\x1b[1m";

/// Compact pressure summary for the prompt-right badge. Prefers
/// `held` when in-flight, falls back to `dropped` lifetime count
/// otherwise. Numbers >999 collapse to `1.2k` form to keep the badge
/// fixed-width.
fn format_pressure_badge(p: &PressureSnapshot) -> String {
    if p.held > 0 {
        compact_number(u64::from(p.held))
    } else {
        format!("·{}", compact_number(p.dropped))
    }
}

fn compact_number(n: u64) -> String {
    if n < 1_000 {
        n.to_string()
    } else if n < 1_000_000 {
        format!("{:.1}k", n as f64 / 1_000.0)
    } else {
        format!("{:.1}M", n as f64 / 1_000_000.0)
    }
}

fn current_clock_hhmm() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let secs = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0);
    let total = (secs % 86_400) as u32;
    let h = total / 3600;
    let m = (total % 3600) / 60;
    format!("{h:02}:{m:02}")
}

/// Stream connection health surfaced in the prompt right-margin dot.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum ConnectionHealth {
    #[default]
    Connecting,
    Healthy,
    Disconnected,
}

#[derive(Debug, Default, Clone)]
pub struct PromptState {
    pub context_label: String,
    pub sparkline: SparklineSamples,
    pub paused: bool,
    pub filter_active: bool,
    /// Count of active filter dimensions, used for the `[!N]` badge.
    /// Falls back to `1` when `filter_active` is true but no count was
    /// provided (preserves pre-spec-044 behaviour for tests).
    pub filter_count: u8,
    pub condensing: bool,
    /// Stream connection health for the right-margin dot indicator.
    pub connection_health: ConnectionHealth,
    /// Cluster-A Queue Pressure — held + dropped + rate counters that
    /// surface in the prompt-right pressure badge (`⚡N`) when non-zero
    /// and feed the `/pressure` drawer command.
    pub pressure: PressureSnapshot,
    pub hover_hint: Option<String>,
    pub verbosity: VerbosityLevel,
    /// Spec 044 S2 — incremental filter mode is currently open and this
    /// is the live query the user is typing. Rendered as a status-line
    /// indicator like `[/ embed_] 12 hidden / 87 total`. When `None`,
    /// filter mode is closed (the persisted `/grep` setting still
    /// applies via `FilterState`).
    pub filter_query: Option<String>,
}

#[derive(Debug, Default, Clone, Copy)]
pub struct PressureSnapshot {
    /// Events currently held by the hold queue (commands in-flight).
    pub held: u32,
    /// Cumulative events dropped by the rate-guard since session start.
    pub dropped: u64,
    /// Sustained ingest rate (events/second over the trailing window).
    pub ingest_per_sec: f32,
}

impl PressureSnapshot {
    pub fn is_active(&self) -> bool {
        self.held > 0 || self.dropped > 0
    }
}

#[derive(Clone)]
pub struct AmbientPrompt {
    state: Arc<Mutex<PromptState>>,
    click_registry: Option<Arc<Mutex<ClickRegistry>>>,
    /// When set, click-target registration uses this row instead of
    /// querying the live terminal. Only consumed by tests where a
    /// real cursor position is unavailable.
    fixed_row: Option<u16>,
    mouse_enabled: bool,
    color_depth: ColorDepth,
}

impl AmbientPrompt {
    pub fn new() -> Self {
        let state = PromptState {
            context_label: "nexus".into(),
            sparkline: SparklineSamples::from_per_second(Vec::new()),
            paused: false,
            filter_active: false,
            filter_count: 0,
            condensing: false,
            connection_health: ConnectionHealth::Connecting,
            pressure: PressureSnapshot::default(),
            hover_hint: None,
            verbosity: VerbosityLevel::default(),
            filter_query: None,
        };
        Self {
            state: Arc::new(Mutex::new(state)),
            click_registry: None,
            fixed_row: None,
            mouse_enabled: true,
            color_depth: ColorDepth::Color256,
        }
    }

    pub fn with_mouse_enabled(mut self, enabled: bool) -> Self {
        self.mouse_enabled = enabled;
        self
    }

    pub fn with_color_depth(mut self, depth: ColorDepth) -> Self {
        self.color_depth = depth;
        self
    }

    pub fn with_verbosity(self, level: VerbosityLevel) -> Self {
        if let Ok(mut state) = self.state.lock() {
            state.verbosity = level;
        }
        self
    }

    /// Override the prompt row used for click-target registration.
    /// Intended for tests that exercise registry side effects without
    /// a live terminal where `crossterm::cursor::position()` would
    /// otherwise fail and skip registration.
    pub fn with_fixed_row(mut self, row: u16) -> Self {
        self.fixed_row = Some(row);
        self
    }

    pub fn handle(&self) -> Arc<Mutex<PromptState>> {
        Arc::clone(&self.state)
    }

    pub fn with_click_registry(mut self, registry: Arc<Mutex<ClickRegistry>>) -> Self {
        self.click_registry = Some(registry);
        self
    }

    fn register_regions(
        &self,
        sparkline_range: std::ops::Range<u16>,
        filter_range: Option<std::ops::Range<u16>>,
    ) {
        let Some(registry) = &self.click_registry else {
            return;
        };
        let Ok(mut reg) = registry.lock() else {
            return;
        };
        // Evict every prior prompt entry regardless of row — the prompt
        // is the only producer of these target kinds, and previous
        reg.retain_targets(|t| !matches!(t, ClickTarget::Sparkline | ClickTarget::FilterIndicator));
        let row_lookup = || {
            if self.mouse_enabled {
                current_prompt_row()
            } else {
                None
            }
        };
        let Some(prompt_row) = self.fixed_row.or_else(row_lookup) else {
            return;
        };
        reg.register(prompt_row, sparkline_range, ClickTarget::Sparkline);
        if let Some(range) = filter_range {
            reg.register(prompt_row, range, ClickTarget::FilterIndicator);
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
        let preset = snapshot.verbosity.preset();
        let bar = if !preset.sparkline_visible {
            String::new()
        } else if matches!(self.color_depth, ColorDepth::Truecolor) {
            render_sparkline_with_gradient(
                &snapshot.sparkline,
                SPECTRAL_PRIMARY,
                SPECTRAL_SECONDARY,
                self.color_depth,
            )
        } else {
            render_sparkline(&snapshot.sparkline)
        };
        let mut left = String::new();
        let mut col: u16 = 0;

        // Context label in graphite-blue accent.
        left.push_str(ANSI_ACCENT_CYAN);
        left.push_str(ANSI_BOLD);
        left.push_str(&snapshot.context_label);
        left.push_str(ANSI_RESET);
        col = col.saturating_add(visible_width(&snapshot.context_label));

        // Dim middot separator.
        left.push_str(ANSI_DIM);
        left.push_str(" · ");
        left.push_str(ANSI_RESET);
        col = col.saturating_add(3);

        // Sparkline OR state-aware placeholder. When the stream is idle
        // (no events sampled yet, or every sample is 0) the 8-cell
        let sparkline_start = col;
        if snapshot.sparkline.is_idle() {
            let (placeholder, placeholder_color) = match snapshot.connection_health {
                ConnectionHealth::Healthy => ("· idle ·", ANSI_ACCENT_DIM),
                ConnectionHealth::Connecting => ("◐ connecting…", ANSI_ACCENT_AMBER),
                ConnectionHealth::Disconnected => ("◯ offline", ANSI_ACCENT_RED),
            };
            left.push_str(placeholder_color);
            left.push_str(placeholder);
            left.push_str(ANSI_RESET);
            col = col.saturating_add(visible_width(placeholder));
        } else {
            left.push_str(ANSI_ACCENT_DIM);
            left.push_str(&bar);
            col = col.saturating_add(visible_width(&bar));
            left.push_str(ANSI_RESET);
        }
        let sparkline_end = col;

        if snapshot.condensing {
            left.push(' ');
            col = col.saturating_add(1);
            left.push_str(ANSI_ACCENT_AMBER);
            left.push('≫');
            left.push_str(ANSI_RESET);
            col = col.saturating_add(1);
        }
        if snapshot.paused {
            left.push(' ');
            col = col.saturating_add(1);
            left.push_str(ANSI_ACCENT_AMBER);
            left.push('⏸');
            left.push_str(ANSI_RESET);
            col = col.saturating_add(1);
        }

        let filter_range = if snapshot.filter_active {
            left.push(' ');
            col = col.saturating_add(1);
            let start = col;
            left.push_str(ANSI_ACCENT_VIOLET);
            let badge = if snapshot.filter_count > 1 {
                format!("[!{}]", snapshot.filter_count)
            } else {
                "[!]".to_string()
            };
            left.push_str(&badge);
            left.push_str(ANSI_RESET);
            let badge_width = visible_width(&badge);
            col = col.saturating_add(badge_width);
            Some(start..col)
        } else {
            None
        };

        // Spec 044 S2 — live incremental filter bar. When the user is
        // mid-typing a `/`-filter, the buffer text trails the badge as
        if let Some(query) = snapshot.filter_query.as_deref() {
            left.push(' ');
            col = col.saturating_add(1);
            left.push_str(ANSI_ACCENT_VIOLET);
            let chip = format!("[/ {query}▏]");
            left.push_str(&chip);
            left.push_str(ANSI_RESET);
            col = col.saturating_add(visible_width(&chip));
        }
        let _ = col;
        self.register_regions(sparkline_start..sparkline_end, filter_range);
        Cow::Owned(left)
    }

    fn render_prompt_right(&self) -> Cow<'_, str> {
        let snapshot = self.state.lock().unwrap_or_else(|p| p.into_inner()).clone();
        let (dot, dot_color) = match snapshot.connection_health {
            ConnectionHealth::Healthy => ("●", ANSI_ACCENT_GREEN),
            ConnectionHealth::Connecting => ("◐", ANSI_ACCENT_AMBER),
            ConnectionHealth::Disconnected => ("◯", ANSI_ACCENT_RED),
        };
        let clock = current_clock_hhmm();
        let preset = snapshot.verbosity.preset();
        let pressure = if preset.pressure_meter_visible && snapshot.pressure.is_active() {
            let badge = format_pressure_badge(&snapshot.pressure);
            format!("{ANSI_ACCENT_AMBER}⚡{badge}{ANSI_RESET}  ")
        } else {
            String::new()
        };
        let whisper = match snapshot.hover_hint.as_deref() {
            Some(hint) if !hint.is_empty() => format!("{ANSI_DIM}{hint}{ANSI_RESET}  "),
            _ => String::new(),
        };
        Cow::Owned(format!(
            "{whisper}{pressure}{dot_color}{dot}{ANSI_RESET} {ANSI_DIM}{clock}{ANSI_RESET}"
        ))
    }

    fn render_prompt_indicator(&self, _edit_mode: PromptEditMode) -> Cow<'_, str> {
        Cow::Owned(format!(" {ANSI_ACCENT_CYAN}›{ANSI_RESET} "))
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
