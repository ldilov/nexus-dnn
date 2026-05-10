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
    /// Spec 044 FR-008a — when true, swap severity + source-category
    /// Unicode glyphs to ASCII proxies for terminals that cannot render
    /// the Unicode set. Box-drawing and Braille glyphs are out of scope.
    pub ascii_glyphs: bool,
}

impl RenderConfig {
    pub fn new(color_depth: ColorDepth, critical_border: bool) -> Self {
        Self {
            color_depth,
            critical_border,
            hover_target: None,
            ascii_glyphs: false,
        }
    }

    pub fn with_hover_target(mut self, target: Option<ClickTarget>) -> Self {
        self.hover_target = target;
        self
    }

    pub fn with_ascii_glyphs(mut self, ascii: bool) -> Self {
        self.ascii_glyphs = ascii;
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
    let severity_glyph = severity_glyph_for(line.severity, cfg.ascii_glyphs);
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
    if let Some(needle) = hover_run_id
        && let Some(rel) = line.summary.find(needle)
    {
        let prefix = &line.summary[..rel];
        let middle = &line.summary[rel..rel + needle.len()];
        let suffix = &line.summary[rel + needle.len()..];
        out.push_str(prefix);
        out.push_str("\x1b[1m");
        out.push_str(middle);
        out.push_str("\x1b[22m");
        out.push_str(suffix);
    } else {
        out.push_str(&line.summary);
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
    let severity_glyph = severity_glyph_for(line.severity, cfg.ascii_glyphs);
    let cat_glyph = if cfg.ascii_glyphs {
        category_glyph_ascii(line.category)
    } else {
        category_glyph(line.category)
    };
    let source_palette = source_label_color(&line.source, line.category);
    let severity_palette = severity_color(line.severity);
    let category_palette = category_color(line.category);

    let mut out = String::new();
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
    // Dim style — keeps timestamps visually quiet so they don't compete
    // with severity / source colour. ANSI 2 = faint.
    out.push_str("\x1b[2m");
    out.push_str(text);
    out.push_str("\x1b[22m");
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
