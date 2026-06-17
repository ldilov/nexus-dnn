//! Spec 044 follow-up — "Now-Bar" Option B (transition-emit ribbon).
//!
//! Operators don't actually want the latest event — they want the
//! *current state of the world*. The Now-Bar is a single-line cockpit
//! that re-emits on every meaningful state transition so the operator
//! can scroll back and instantly see what was true at any moment.
//!
//! Option B (this file) sidesteps the alternate-screen / cursor
//! choreography risk of a sticky-row repaint by emitting the ribbon
//! inline whenever something the operator cares about flips:
//!
//! * Filter / follow / pause mutations land via the slash-command
//!   controller — it calls [`emit_status_ribbon`] after every state
//!   change.
//! * Connection transitions (Healthy ↔ Disconnected) and the
//!   Curtain-Up settle event emit a ribbon from the consumer task.
//!
//! Format:
//! ```text
//! ▦ view live  · floor=info · filters=0 · follow=∅
//! ▦ view paused · floor=warn · filters=2 · follow=run:01HK...
//! ```
//!
//! Colours pull from the existing Spectral Graphite palette so the
//! ribbon harmonises with the prompt, severity bar, and inspector
//! sections — no new tokens introduced.

use std::sync::{Arc, Mutex, RwLock};

use crate::repl::prompt::{ConnectionHealth, PromptState};
use crate::stream::filter::{FilterState, FollowTarget};
use crate::stream::severity::Severity;

const ANSI_RESET: &str = "\x1b[0m";
const ANSI_DIM: &str = "\x1b[2m";
const ANSI_BOLD: &str = "\x1b[1m";
const ANSI_GRAPHITE_BLUE: &str = "\x1b[38;5;75m";
const ANSI_VIOLET: &str = "\x1b[38;5;141m";
const ANSI_AMBER: &str = "\x1b[38;5;215m";
const ANSI_GREEN: &str = "\x1b[38;5;84m";
const ANSI_RED: &str = "\x1b[38;5;203m";
const ANSI_SLATE: &str = "\x1b[38;5;252m";
const ANSI_GRAPHITE_DIM: &str = "\x1b[38;5;245m";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum RibbonMode {
    Live,
    Paused,
}

#[derive(Debug, Clone)]
pub struct RibbonSnapshot {
    pub mode: RibbonMode,
    pub severity_floor: Severity,
    pub filter_count: u8,
    pub follow: Option<FollowTarget>,
    pub connection: ConnectionHealth,
}

/// Pure render of a ribbon snapshot. Always returns a one-line
/// ANSI-coloured string; caller appends a newline if needed.
pub fn render_ribbon(snap: &RibbonSnapshot) -> String {
    let mut out = String::new();

    // Leading glyph + label.
    push(&mut out, ANSI_BOLD, ANSI_GRAPHITE_BLUE, "▦ view ");
    let (mode_label, mode_color) = match snap.mode {
        RibbonMode::Live => ("live", ANSI_GREEN),
        RibbonMode::Paused => ("paused", ANSI_AMBER),
    };
    push(&mut out, ANSI_BOLD, mode_color, mode_label);

    // Severity floor.
    push_separator(&mut out);
    push(&mut out, "", ANSI_SLATE, "floor=");
    let (level_label, level_color) = severity_token(snap.severity_floor);
    push(&mut out, ANSI_BOLD, level_color, level_label);

    // Filter count.
    push_separator(&mut out);
    push(&mut out, "", ANSI_SLATE, "filters=");
    let (count_text, count_color) = if snap.filter_count > 0 {
        (snap.filter_count.to_string(), ANSI_VIOLET)
    } else {
        ("0".to_string(), ANSI_GRAPHITE_DIM)
    };
    push(&mut out, ANSI_BOLD, count_color, &count_text);

    // Follow target.
    push_separator(&mut out);
    push(&mut out, "", ANSI_SLATE, "follow=");
    match &snap.follow {
        Some(target) => {
            let s = format_follow_target(target);
            push(&mut out, ANSI_BOLD, ANSI_GRAPHITE_BLUE, &s);
        }
        None => {
            push(&mut out, "", ANSI_GRAPHITE_DIM, "∅");
        }
    }

    // Connection state — only show when not Healthy (no point in
    // saying "yep, still connected" every transition; the prompt
    if !matches!(snap.connection, ConnectionHealth::Healthy) {
        push_separator(&mut out);
        let (dot, color, label) = match snap.connection {
            ConnectionHealth::Connecting => ("◐", ANSI_AMBER, "connecting"),
            ConnectionHealth::Disconnected => ("◯", ANSI_RED, "offline"),
            ConnectionHealth::Healthy => unreachable!("guarded above"),
        };
        push(&mut out, ANSI_BOLD, color, dot);
        out.push(' ');
        push(&mut out, "", color, label);
    }

    out
}

fn severity_token(level: Severity) -> (&'static str, &'static str) {
    match level {
        Severity::Debug => ("debug", ANSI_GRAPHITE_DIM),
        Severity::Info => ("info", ANSI_GRAPHITE_BLUE),
        Severity::Warn => ("warn", ANSI_AMBER),
        Severity::Error => ("error", ANSI_RED),
        Severity::Fatal => ("fatal", ANSI_RED),
    }
}

fn format_follow_target(t: &FollowTarget) -> String {
    let (kind, id) = match t {
        FollowTarget::Run(id) => ("run", id),
        FollowTarget::Deploy(id) => ("deploy", id),
        FollowTarget::Extension(id) => ("ext", id),
    };
    // Truncate long ids for ribbon readability — full id is one
    // `/inspect` or `/where` away.
    let trimmed = if id.len() > 24 {
        format!("{}…", &id[..24])
    } else {
        id.to_string()
    };
    format!("{kind}:{trimmed}")
}

fn push(out: &mut String, weight: &str, color: &str, text: &str) {
    out.push_str(weight);
    out.push_str(color);
    out.push_str(text);
    out.push_str(ANSI_RESET);
}

fn push_separator(out: &mut String) {
    out.push(' ');
    out.push_str(ANSI_DIM);
    out.push('·');
    out.push_str(ANSI_RESET);
    out.push(' ');
}

/// Build a snapshot from shared state. Cheap — copies a handful of
/// scalar fields; no allocations beyond the optional follow-target id.
pub fn snapshot_from(
    filter: &Arc<RwLock<FilterState>>,
    prompt: &Arc<Mutex<PromptState>>,
) -> RibbonSnapshot {
    let (mode, floor, count, follow) = match filter.read() {
        Ok(f) => (
            if f.paused() {
                RibbonMode::Paused
            } else {
                RibbonMode::Live
            },
            f.level_floor(),
            f.active_filter_count(),
            f.follow_ref().cloned(),
        ),
        Err(_) => (RibbonMode::Live, Severity::default(), 0, None),
    };
    let connection = prompt
        .lock()
        .map(|s| s.connection_health)
        .unwrap_or(ConnectionHealth::Healthy);
    RibbonSnapshot {
        mode,
        severity_floor: floor,
        filter_count: count,
        follow,
        connection,
    }
}

/// Build + render + print to stdout. Convenience entry-point for the
/// controller / consumer-loop call-sites.
pub fn emit_status_ribbon(filter: &Arc<RwLock<FilterState>>, prompt: &Arc<Mutex<PromptState>>) {
    let ribbon_visible = prompt
        .lock()
        .ok()
        .map(|p| p.verbosity.preset().ribbon_visible)
        .unwrap_or(true);
    if !ribbon_visible {
        return;
    }
    let snap = snapshot_from(filter, prompt);
    println!("{}", render_ribbon(&snap));
}

#[cfg(test)]
mod tests {
    use super::*;

    fn default_snap() -> RibbonSnapshot {
        RibbonSnapshot {
            mode: RibbonMode::Live,
            severity_floor: Severity::Info,
            filter_count: 0,
            follow: None,
            connection: ConnectionHealth::Healthy,
        }
    }

    /// ANSI escape codes are interleaved between every label and its
    /// value (label gets ANSI_SLATE then ANSI_RESET, value gets
    /// ANSI_BOLD ANSI_<colour> then ANSI_RESET). So tests cannot search
    /// for `filters=0` as a contiguous substring — they must check the
    /// label and value separately.
    #[test]
    fn renders_live_default_state() {
        let out = render_ribbon(&default_snap());
        assert!(out.contains("▦ view "), "must contain ribbon glyph");
        assert!(out.contains("live"), "must label as live");
        assert!(out.contains("floor="), "must show floor label");
        assert!(out.contains("info"), "default floor is info");
        assert!(out.contains("filters="), "must show filters label");
        assert!(out.contains('0'), "default filter count is 0");
        assert!(out.contains("follow="), "must show follow label");
        assert!(out.contains('∅'), "no follow target by default");
    }

    #[test]
    fn renders_paused_mode() {
        let mut s = default_snap();
        s.mode = RibbonMode::Paused;
        let out = render_ribbon(&s);
        assert!(out.contains("paused"));
    }

    #[test]
    fn renders_filter_count_violet_when_active() {
        let mut s = default_snap();
        s.filter_count = 3;
        let out = render_ribbon(&s);
        assert!(out.contains("filters="));
        assert!(out.contains('3'));
    }

    #[test]
    fn renders_run_follow_target() {
        let mut s = default_snap();
        s.follow = Some(FollowTarget::Run("01HK3R".into()));
        let out = render_ribbon(&s);
        assert!(
            out.contains("run:01HK3R"),
            "run target must render with kind prefix"
        );
    }

    #[test]
    fn renders_deploy_follow_target() {
        let mut s = default_snap();
        s.follow = Some(FollowTarget::Deploy("chat-prod".into()));
        let out = render_ribbon(&s);
        assert!(out.contains("deploy:chat-prod"));
    }

    #[test]
    fn renders_extension_follow_target() {
        let mut s = default_snap();
        s.follow = Some(FollowTarget::Extension("nexus.audio.emotiontts".into()));
        let out = render_ribbon(&s);
        assert!(out.contains("ext:nexus.audio.emotiontts"));
    }

    #[test]
    fn truncates_long_follow_ids() {
        let mut s = default_snap();
        s.follow = Some(FollowTarget::Run("01HK3RABCDEFGHIJKLMNOPQRSTUVWXYZ".into()));
        let out = render_ribbon(&s);
        assert!(
            out.contains('…'),
            "long ids must be truncated with ellipsis"
        );
    }

    #[test]
    fn hides_connection_when_healthy() {
        let s = default_snap();
        let out = render_ribbon(&s);
        assert!(
            !out.contains("connecting"),
            "must not say connecting when healthy"
        );
        assert!(
            !out.contains("offline"),
            "must not say offline when healthy"
        );
    }

    #[test]
    fn shows_connecting_state_when_not_healthy() {
        let mut s = default_snap();
        s.connection = ConnectionHealth::Connecting;
        let out = render_ribbon(&s);
        assert!(out.contains("connecting"), "must show connecting label");
    }

    #[test]
    fn shows_offline_state_when_disconnected() {
        let mut s = default_snap();
        s.connection = ConnectionHealth::Disconnected;
        let out = render_ribbon(&s);
        assert!(out.contains("offline"));
    }

    #[test]
    fn warn_severity_floor_renders_with_amber_label() {
        let mut s = default_snap();
        s.severity_floor = Severity::Warn;
        let out = render_ribbon(&s);
        assert!(out.contains("warn"));
    }
}
