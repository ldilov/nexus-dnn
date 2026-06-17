//! Event-line renderer.
//!
//! Produces a single ANSI-coloured line:
//!
//! ```text
//! │ HH:MM:SS  ⚠  WARN  ◈ worker:<id>   summary text here…
//! ```
//!
//! Plus an optional full-width separator line above critical events
//! (FR-008b). Output is a `String`; the main loop writes to stdout.

use crossterm::style::{Color, ResetColor, SetForegroundColor};

use std::ops::Range;

use crate::mouse::targets::ClickTarget;
use crate::render::gutter::{ambient_gutter, inspector_gutter};
use crate::repl::ansi::{
    ColorDepth, PaletteColor, category_color, render_color, severity_color, source_label_color,
};
use crate::stream::event_line::EventLine;
use crate::stream::severity::Severity;
use crate::stream::source_category::{category_glyph, category_glyph_ascii};

#[derive(Debug, Clone)]
pub struct RenderConfig {
    pub color_depth: ColorDepth,
    pub critical_border: bool,
    /// Spec 044 T100 — when set, apply the hover affordance (underline /
    /// bold) to the matching click region within this rendered line.
    pub hover_target: Option<ClickTarget>,
    /// Spec 044 Phase 3 — when true, prepend a lavender `╰─` indent
    /// so the event reads as a continuation of an earlier thread on
    /// the same correlation key.
    pub thread_leaf: bool,
    /// Spec 044 FR-008a — when true, swap severity + source-category
    /// Unicode glyphs to ASCII proxies for terminals that cannot render
    /// the Unicode set. Box-drawing and Braille glyphs are out of scope.
    pub ascii_glyphs: bool,
    pub correlation_depth: u8,
    pub luminance_ladder: bool,
    pub grep_highlight: Option<String>,
}

impl RenderConfig {
    pub fn new(color_depth: ColorDepth, critical_border: bool) -> Self {
        Self {
            color_depth,
            critical_border,
            hover_target: None,
            thread_leaf: false,
            ascii_glyphs: false,
            correlation_depth: 0,
            luminance_ladder: false,
            grep_highlight: None,
        }
    }

    pub fn with_grep_highlight(mut self, pattern: Option<String>) -> Self {
        self.grep_highlight = pattern;
        self
    }

    pub fn with_hover_target(mut self, target: Option<ClickTarget>) -> Self {
        self.hover_target = target;
        self
    }

    pub fn with_thread_leaf(mut self, leaf: bool) -> Self {
        self.thread_leaf = leaf;
        self
    }

    pub fn with_ascii_glyphs(mut self, ascii: bool) -> Self {
        self.ascii_glyphs = ascii;
        self
    }

    pub fn with_correlation_depth(mut self, depth: u8) -> Self {
        self.correlation_depth = depth;
        self
    }

    pub fn with_luminance_ladder(mut self, enabled: bool) -> Self {
        self.luminance_ladder = enabled;
        self
    }
}

pub fn render_event_line(line: &EventLine, cfg: &RenderConfig) -> String {
    let mut out = String::new();
    if cfg.critical_border {
        out.push_str(&render_critical_border(cfg.color_depth));
        out.push('\n');
    }
    out.push_str(&render_inner(line, cfg));
    out
}

#[derive(Debug)]
pub struct EventLineLayout {
    pub rendered: String,
    pub targets: Vec<(ClickTarget, Range<u16>)>,
}

/// Render an event line and emit the visible-column ranges of each
/// clickable region (event-line body, source label, run-id reference).
/// Caller registers the ranges with the active `ClickRegistry`.
pub fn render_event_line_with_targets(line: &EventLine, cfg: &RenderConfig) -> EventLineLayout {
    let timestamp = format_timestamp(line.timestamp_ms);
    let severity_label = severity_label(line.severity);
    let event_class = crate::inspector::classifier::classify(line);
    let severity_glyph = severity_glyph_for_class(line.severity, event_class, cfg.ascii_glyphs);
    let cat_glyph = if cfg.ascii_glyphs {
        category_glyph_ascii(line.category)
    } else {
        category_glyph(line.category)
    };
    let source_palette = source_label_color(&line.source, line.category);
    let severity_palette = severity_color(line.severity);
    let category_palette = category_color(line.category);

    let mut out = String::new();
    let mut col: u16 = 0;

    if cfg.luminance_ladder {
        if let Some(bar) = crate::render::luminance_ladder::error_left_bar(line.severity) {
            push_colored(
                &mut out,
                &bar.to_string(),
                severity_palette,
                cfg.color_depth,
            );
            col = col.saturating_add(1);
        }
        let ladder_indent =
            crate::render::luminance_ladder::correlation_indent(cfg.correlation_depth);
        if !ladder_indent.is_empty() {
            out.push_str(&ladder_indent);
            col = col.saturating_add(ladder_indent.chars().count() as u16);
        }
    }

    // Thread-leaf indent — when this event continues an earlier
    // thread, prefix `  ╰─ ` in lavender. The visible columns the
    if cfg.thread_leaf {
        let indent = thread_indent_prefix();
        out.push_str(THREAD_LEAF_ANSI_OPEN);
        out.push_str(indent);
        out.push_str(THREAD_LEAF_ANSI_CLOSE);
        col = col.saturating_add(visible_width(indent));
    }

    let body_start = col;

    let gutter = if matches!(
        line.significance,
        crate::stream::significance::Significance::Critical
    ) {
        inspector_gutter()
    } else {
        ambient_gutter()
    };
    push_colored(&mut out, gutter, category_palette, cfg.color_depth);
    col = col.saturating_add(visible_width(gutter));
    out.push(' ');
    col = col.saturating_add(1);

    // Severity left-bar — colored vertical block adds vertical rhythm
    // between gutter and timestamp. ASCII fallback uses a pipe.
    let bar = severity_bar(cfg.ascii_glyphs);
    push_colored(&mut out, bar, severity_palette, cfg.color_depth);
    col = col.saturating_add(visible_width(bar));
    out.push(' ');
    col = col.saturating_add(1);

    push_colored_dim(&mut out, &timestamp, cfg.color_depth);
    col = col.saturating_add(visible_width(&timestamp));
    out.push(' ');
    col = col.saturating_add(1);

    let sev_text = format!("{severity_glyph} {severity_label:<5}");
    push_colored(&mut out, &sev_text, severity_palette, cfg.color_depth);
    col = col.saturating_add(visible_width(&sev_text));
    out.push(' ');
    col = col.saturating_add(1);

    let cat_text = format!("{cat_glyph} ");
    push_colored(&mut out, &cat_text, category_palette, cfg.color_depth);
    col = col.saturating_add(visible_width(&cat_text));

    let source_start = col;
    let hover_source = matches!(
        &cfg.hover_target,
        Some(ClickTarget::SourceLabel { source }) if source == &line.source
    );
    if hover_source {
        out.push_str("\x1b[4m");
    }
    push_colored(&mut out, &line.source, source_palette, cfg.color_depth);
    if hover_source {
        out.push_str("\x1b[24m");
    }
    col = col.saturating_add(visible_width(&line.source));
    let source_end = col;

    out.push_str("  ");
    col = col.saturating_add(2);

    let summary_start = col;
    let mut hover_run_id: Option<&str> = None;
    if let (Some(ClickTarget::RunIdReference { run_id }), Some(line_run_id)) = (
        cfg.hover_target.as_ref(),
        line.correlation.run_id.as_deref(),
    ) && run_id == line_run_id
    {
        hover_run_id = Some(line_run_id);
    }
    let highlighted_summary = apply_grep_highlight(&line.summary, cfg.grep_highlight.as_deref());
    if let Some(needle) = hover_run_id
        && let Some(rel) = line.summary.find(needle)
    {
        let prefix = &line.summary[..rel];
        let middle = &line.summary[rel..rel + needle.len()];
        let suffix = &line.summary[rel + needle.len()..];
        out.push_str(&apply_grep_highlight(prefix, cfg.grep_highlight.as_deref()));
        out.push_str("\x1b[1m");
        out.push_str(&apply_grep_highlight(middle, cfg.grep_highlight.as_deref()));
        out.push_str("\x1b[22m");
        out.push_str(&apply_grep_highlight(suffix, cfg.grep_highlight.as_deref()));
    } else {
        out.push_str(&highlighted_summary);
    }
    col = col.saturating_add(visible_width(&line.summary));
    let body_end = col;

    let mut targets: Vec<(ClickTarget, Range<u16>)> = Vec::new();
    targets.push((
        ClickTarget::EventLineBody { event_id: line.id },
        body_start..body_end,
    ));
    targets.push((
        ClickTarget::SourceLabel {
            source: line.source.clone(),
        },
        source_start..source_end,
    ));
    if let Some(run_id) = &line.correlation.run_id {
        let needle = run_id.as_str();
        if let Some(rel) = line.summary.find(needle) {
            let prefix_width = visible_width(&line.summary[..rel]);
            let id_width = visible_width(needle);
            let span_start = summary_start.saturating_add(prefix_width);
            let span_end = span_start.saturating_add(id_width);
            targets.push((
                ClickTarget::RunIdReference {
                    run_id: run_id.clone(),
                },
                span_start..span_end,
            ));
        }
    }

    EventLineLayout {
        rendered: out,
        targets,
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

fn render_inner(line: &EventLine, cfg: &RenderConfig) -> String {
    let timestamp = format_timestamp(line.timestamp_ms);
    let severity_label = severity_label(line.severity);
    let event_class = crate::inspector::classifier::classify(line);
    let severity_glyph = severity_glyph_for_class(line.severity, event_class, cfg.ascii_glyphs);
    let cat_glyph = if cfg.ascii_glyphs {
        category_glyph_ascii(line.category)
    } else {
        category_glyph(line.category)
    };
    let source_palette = source_label_color(&line.source, line.category);
    let severity_palette = severity_color(line.severity);
    let category_palette = category_color(line.category);

    let mut out = String::new();
    if cfg.thread_leaf {
        out.push_str(THREAD_LEAF_ANSI_OPEN);
        out.push_str(thread_indent_prefix());
        out.push_str(THREAD_LEAF_ANSI_CLOSE);
    }
    let gutter = if matches!(
        line.significance,
        crate::stream::significance::Significance::Critical
    ) {
        inspector_gutter()
    } else {
        ambient_gutter()
    };
    push_colored(&mut out, gutter, category_palette, cfg.color_depth);
    out.push(' ');
    let bar = severity_bar(cfg.ascii_glyphs);
    push_colored(&mut out, bar, severity_palette, cfg.color_depth);
    out.push(' ');
    push_colored_dim(&mut out, &timestamp, cfg.color_depth);
    out.push(' ');
    push_colored(
        &mut out,
        &format!("{severity_glyph} {severity_label:<5}"),
        severity_palette,
        cfg.color_depth,
    );
    out.push(' ');
    push_colored(
        &mut out,
        &format!("{cat_glyph} "),
        category_palette,
        cfg.color_depth,
    );
    push_colored(&mut out, &line.source, source_palette, cfg.color_depth);
    out.push_str("  ");
    out.push_str(&line.summary);
    out
}

fn severity_bar(ascii: bool) -> &'static str {
    if ascii { "|" } else { "▎" }
}

/// Indent prefix for thread continuations. Two leading spaces + a
/// lavender corner-arc + en-space — reads as "this belongs under the
/// previous line" without occupying visual weight.
fn thread_indent_prefix() -> &'static str {
    "  ╰─ "
}

const THREAD_LEAF_ANSI_OPEN: &str = "\x1b[38;5;183m";
const THREAD_LEAF_ANSI_CLOSE: &str = "\x1b[0m";

fn render_critical_border(depth: ColorDepth) -> String {
    let mut s = String::new();
    push_colored(
        &mut s,
        "──────────────────────────────────────────────────────────────",
        crate::repl::ansi::SEVERITY_FATAL,
        depth,
    );
    s
}

fn push_colored_dim(out: &mut String, text: &str, _depth: ColorDepth) {
    // Soft slate (252) — readable as a metadata token without the dim
    // attribute that some terminals render as low-contrast washout.
    out.push_str("\x1b[38;5;252m");
    out.push_str(text);
    out.push_str("\x1b[0m");
}

fn push_colored(out: &mut String, text: &str, palette: PaletteColor, depth: ColorDepth) {
    let color: Color = render_color(palette, depth);
    out.push_str(&format!(
        "{}{text}{}",
        SetForegroundColor(color),
        ResetColor
    ));
}

fn format_timestamp(ms: i64) -> String {
    let total_seconds = (ms / 1000).rem_euclid(86_400);
    let h = (total_seconds / 3600) as u32;
    let m = ((total_seconds % 3600) / 60) as u32;
    let s = (total_seconds % 60) as u32;
    format!("{h:02}:{m:02}:{s:02}")
}

fn severity_label(severity: Severity) -> &'static str {
    match severity {
        Severity::Debug => "DEBUG",
        Severity::Info => "INFO",
        Severity::Warn => "WARN",
        Severity::Error => "ERROR",
        Severity::Fatal => "FATAL",
    }
}

fn severity_glyph(severity: Severity) -> char {
    match severity {
        Severity::Debug => '·',
        Severity::Info => '○',
        Severity::Warn => '⚠',
        Severity::Error => '✖',
        Severity::Fatal => '☠',
    }
}

fn severity_glyph_ascii(severity: Severity) -> char {
    match severity {
        Severity::Debug => '.',
        Severity::Info => 'i',
        Severity::Warn => '!',
        Severity::Error => 'X',
        Severity::Fatal => '!',
    }
}

fn severity_glyph_for(severity: Severity, ascii: bool) -> char {
    if ascii {
        severity_glyph_ascii(severity)
    } else {
        severity_glyph(severity)
    }
}

/// Severity glyph with the per-`EventClass` "failure-affordance"
/// variant applied. For events classified as a failure that nevertheless
/// log at INFO/WARN severity (HTTP-500 logged at INFO, exception
/// captured at WARN), swap to a filled glyph so the row reads as louder
/// than its raw severity would imply. ERROR/FATAL rows already pop —
/// don't double up there. ASCII mode is unaffected; the fallback set
/// has no "filled" variant.
pub fn severity_glyph_for_class(
    severity: Severity,
    class: crate::inspector::classifier::EventClass,
    ascii: bool,
) -> char {
    let base = severity_glyph_for(severity, ascii);
    if ascii {
        return base;
    }
    if !class.is_failure() {
        return base;
    }
    match severity {
        // INFO `○` → `●` (filled). The classic "this looks fine but
        // it isn't" affordance.
        Severity::Info => '●',
        // WARN `⚠` is already visually loud; don't swap.
        // ERROR / FATAL already at peak — don't double up.
        _ => base,
    }
}

const GREP_HIGHLIGHT_OPEN: &str = "\x1b[43;30m";
const GREP_HIGHLIGHT_CLOSE: &str = "\x1b[0m";

fn apply_grep_highlight(text: &str, pattern: Option<&str>) -> String {
    let Some(pattern) = pattern else {
        return text.to_string();
    };
    if pattern.is_empty() {
        return text.to_string();
    }
    let Ok(regex) = regex::Regex::new(&format!("(?i){pattern}")) else {
        return text.to_string();
    };
    let mut last = 0;
    let mut out = String::with_capacity(text.len());
    for m in regex.find_iter(text) {
        if m.start() < last {
            continue;
        }
        out.push_str(&text[last..m.start()]);
        out.push_str(GREP_HIGHLIGHT_OPEN);
        out.push_str(m.as_str());
        out.push_str(GREP_HIGHLIGHT_CLOSE);
        last = m.end();
    }
    out.push_str(&text[last..]);
    out
}

#[cfg(test)]
mod grep_highlight_tests {
    use super::*;

    #[test]
    fn no_pattern_returns_unchanged_text() {
        assert_eq!(apply_grep_highlight("hello world", None), "hello world");
    }

    #[test]
    fn empty_pattern_returns_unchanged_text() {
        assert_eq!(apply_grep_highlight("hello world", Some("")), "hello world");
    }

    #[test]
    fn literal_match_is_wrapped_in_yellow_background() {
        let out = apply_grep_highlight("an embed event", Some("embed"));
        assert!(out.contains("\x1b[43;30membed\x1b[0m"));
    }

    #[test]
    fn match_is_case_insensitive() {
        let out = apply_grep_highlight("EMBED was logged", Some("embed"));
        assert!(out.contains("\x1b[43;30mEMBED\x1b[0m"));
    }

    #[test]
    fn multiple_matches_are_all_wrapped() {
        let out = apply_grep_highlight("embed embed embed", Some("embed"));
        assert_eq!(out.matches(GREP_HIGHLIGHT_OPEN).count(), 3);
    }

    #[test]
    fn no_match_returns_unchanged_text() {
        assert_eq!(
            apply_grep_highlight("hello world", Some("embed")),
            "hello world"
        );
    }

    #[test]
    fn invalid_regex_returns_unchanged_text() {
        assert_eq!(
            apply_grep_highlight("hello world", Some("[invalid")),
            "hello world"
        );
    }

    #[test]
    fn regex_metacharacter_matches_are_wrapped() {
        let out = apply_grep_highlight("embed_v1 plus extra", Some("embed.*"));
        assert!(out.contains(GREP_HIGHLIGHT_OPEN));
        assert!(out.contains(GREP_HIGHLIGHT_CLOSE));
    }
}
