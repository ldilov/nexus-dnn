//! Inspector block renderer — heavy `┃` gutter + section labels.
//!
//! Sections (per FR-024):
//!   header / metadata / fields / recent context (5 lines from same source)
//!   correlation tree / suggestions / raw payload

use crossterm::style::{Color, ResetColor, SetForegroundColor};

use crate::inspector::correlation::{CorrelationContext, walk_correlation};
use crate::inspector::heuristics::{Suggestion, match_heuristics};
use crate::render::gutter::inspector_gutter;
use crate::repl::ansi::{
    ColorDepth, PaletteColor, SPECTRAL_PRIMARY, category_color, render_color, severity_color,
    source_label_color,
};
use crate::repl::inspect::collect_recent_same_source;
use crate::stream::event_line::EventLine;
use crate::stream::ring_buffer::RingBuffer;
use crate::stream::severity::Severity;
use crate::stream::source_category::category_glyph;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum InspectorSection {
    Header,
    Metadata,
    Fields,
    CorrelationKeys,
    RecentContext,
    CorrelatedEvents,
    Suggestions,
    RawPayload,
}

impl InspectorSection {
    pub fn title(self) -> &'static str {
        match self {
            InspectorSection::Header => "header",
            InspectorSection::Metadata => "metadata",
            InspectorSection::Fields => "fields",
            InspectorSection::CorrelationKeys => "correlation keys",
            InspectorSection::RecentContext => "recent same-source events (unfiltered)",
            InspectorSection::CorrelatedEvents => "correlated events",
            InspectorSection::Suggestions => "suggestions",
            InspectorSection::RawPayload => "raw payload",
        }
    }

    pub fn slug(self) -> &'static str {
        match self {
            InspectorSection::Header => "header",
            InspectorSection::Metadata => "metadata",
            InspectorSection::Fields => "fields",
            InspectorSection::CorrelationKeys => "correlations",
            InspectorSection::RecentContext => "recent",
            InspectorSection::CorrelatedEvents => "related",
            InspectorSection::Suggestions => "suggestions",
            InspectorSection::RawPayload => "raw",
        }
    }

    pub fn all() -> [InspectorSection; 8] {
        [
            InspectorSection::Header,
            InspectorSection::Metadata,
            InspectorSection::Fields,
            InspectorSection::CorrelationKeys,
            InspectorSection::RecentContext,
            InspectorSection::CorrelatedEvents,
            InspectorSection::Suggestions,
            InspectorSection::RawPayload,
        ]
    }
}

#[derive(Debug, Clone)]
pub struct InspectorRenderConfig {
    pub color_depth: ColorDepth,
    pub recent_context_count: usize,
    pub correlation_depth: usize,
    pub collapsed: std::collections::BTreeSet<InspectorSection>,
}

impl Default for InspectorRenderConfig {
    fn default() -> Self {
        Self {
            color_depth: ColorDepth::Truecolor,
            recent_context_count: 5,
            correlation_depth: 3,
            collapsed: std::collections::BTreeSet::new(),
        }
    }
}

#[derive(Debug, Clone)]
pub struct InspectorBlockLayout {
    pub rendered: String,
    pub section_rows: Vec<(InspectorSection, u16)>,
}

pub fn render_inspector_block(
    buf: &RingBuffer,
    target: &EventLine,
    cfg: &InspectorRenderConfig,
) -> String {
    render_inspector_layout(buf, target, cfg).rendered
}

pub fn render_inspector_layout(
    buf: &RingBuffer,
    target: &EventLine,
    cfg: &InspectorRenderConfig,
) -> InspectorBlockLayout {
    let depth = cfg.color_depth;
    let mut out = String::new();
    let mut section_rows: Vec<(InspectorSection, u16)> = Vec::new();
    let mut row: u16 = 0;
    let recent = collect_recent_same_source(buf, target, cfg.recent_context_count);
    let correlation = walk_correlation(buf, target, cfg.correlation_depth);
    let suggestion = match_heuristics(&target.summary);

    push_section(&mut out, InspectorSection::Header, &cfg.collapsed, depth);
    section_rows.push((InspectorSection::Header, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::Header) {
        push_target_header(&mut out, target, depth);
        row += 1;
    }

    push_section(&mut out, InspectorSection::Metadata, &cfg.collapsed, depth);
    section_rows.push((InspectorSection::Metadata, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::Metadata) {
        push_kv(&mut out, "id", &format!("{}", target.id), depth);
        push_kv(
            &mut out,
            "timestamp_ms",
            &format!("{}", target.timestamp_ms),
            depth,
        );
        push_kv(&mut out, "severity", severity_label(target.severity), depth);
        push_kv(
            &mut out,
            "category",
            format!("{:?}", target.category).as_str(),
            depth,
        );
        push_kv(&mut out, "source", &target.source, depth);
        row += 5;
    }

    push_section(&mut out, InspectorSection::Fields, &cfg.collapsed, depth);
    section_rows.push((InspectorSection::Fields, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::Fields) {
        let added = push_payload_fields(&mut out, target, depth);
        row += added;
    }

    push_section(
        &mut out,
        InspectorSection::CorrelationKeys,
        &cfg.collapsed,
        depth,
    );
    section_rows.push((InspectorSection::CorrelationKeys, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::CorrelationKeys) {
        let mut any_key = false;
        let mut count: u16 = 0;
        if let Some(run_id) = &target.correlation.run_id {
            push_kv(&mut out, "run_id", run_id, depth);
            count += 1;
            any_key = true;
        }
        if let Some(deploy_id) = &target.correlation.deployment_id {
            push_kv(&mut out, "deployment_id", deploy_id, depth);
            count += 1;
            any_key = true;
        }
        if let Some(ext_id) = &target.correlation.extension_id {
            push_kv(&mut out, "extension_id", ext_id, depth);
            count += 1;
            any_key = true;
        }
        if let Some(ir_id) = &target.correlation.install_run_id {
            push_kv(&mut out, "install_run_id", ir_id, depth);
            count += 1;
            any_key = true;
        }
        if !any_key {
            push_line(&mut out, "  (no correlation keys)", depth);
            count += 1;
        }
        row += count;
    }

    push_section(
        &mut out,
        InspectorSection::RecentContext,
        &cfg.collapsed,
        depth,
    );
    section_rows.push((InspectorSection::RecentContext, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::RecentContext) {
        if recent.is_empty() {
            push_line(&mut out, "  (no prior events from this source)", depth);
            row += 1;
        } else {
            for line in &recent {
                push_line(
                    &mut out,
                    &format!("  {} {}", severity_label(line.severity), line.summary),
                    depth,
                );
            }
            row += recent.len() as u16;
        }
    }

    push_section(
        &mut out,
        InspectorSection::CorrelatedEvents,
        &cfg.collapsed,
        depth,
    );
    section_rows.push((InspectorSection::CorrelatedEvents, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::CorrelatedEvents) {
        let added = push_correlation(&mut out, &correlation, depth);
        row += added;
    }

    push_section(
        &mut out,
        InspectorSection::Suggestions,
        &cfg.collapsed,
        depth,
    );
    section_rows.push((InspectorSection::Suggestions, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::Suggestions) {
        if let Some(suggestion) = suggestion {
            push_suggestion(&mut out, &suggestion, depth);
            row += 2;
        } else {
            push_line(&mut out, "  (no heuristic match)", depth);
            row += 1;
        }
    }

    push_section(
        &mut out,
        InspectorSection::RawPayload,
        &cfg.collapsed,
        depth,
    );
    section_rows.push((InspectorSection::RawPayload, row));
    row += 1;
    if !cfg.collapsed.contains(&InspectorSection::RawPayload) {
        let lines = raw_payload_lines(target);
        for raw_line in &lines {
            push_line(&mut out, &format!("  {raw_line}"), depth);
        }
        row += lines.len() as u16;
    }
    let _ = row;

    InspectorBlockLayout {
        rendered: out,
        section_rows,
    }
}

fn push_payload_fields(out: &mut String, target: &EventLine, depth: ColorDepth) -> u16 {
    use crate::stream::event_line::RawPayload;
    use nexus_events::types::NexusEvent;
    let mut count: u16 = 0;
    if let RawPayload::NexusEvent(NexusEvent::HostLog {
        target: log_target,
        fields,
        span_path,
        ..
    }) = target.raw_payload.as_ref()
    {
        push_kv(out, "target", log_target, depth);
        count += 1;
        for (k, v) in fields {
            push_kv(out, k, v, depth);
            count += 1;
        }
        if let Some(spans) = span_path {
            push_kv(out, "span_path", &spans.join(" › "), depth);
            count += 1;
        }
    }
    if count == 0 {
        push_line(out, "  (no structured fields — see raw payload)", depth);
        count = 1;
    }
    count
}

fn raw_payload_lines(target: &EventLine) -> Vec<String> {
    use crate::stream::event_line::RawPayload;
    let json = match target.raw_payload.as_ref() {
        RawPayload::NexusEvent(e) => serde_json::to_string_pretty(e),
        RawPayload::RunEventItem(item) => serde_json::to_string_pretty(item),
    };
    match json {
        Ok(s) => s.lines().map(String::from).collect(),
        Err(_) => vec!["<unserializable>".to_string()],
    }
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

fn push_section(
    out: &mut String,
    section: InspectorSection,
    collapsed: &std::collections::BTreeSet<InspectorSection>,
    depth: ColorDepth,
) {
    let palette = SPECTRAL_PRIMARY;
    let is_collapsed = collapsed.contains(&section);
    let chevron = if is_collapsed { "▶" } else { "▼" };
    let icon = section_icon(section);
    let title = section.title();
    out.push_str(&format!(
        "{gutter} {open}\x1b[1m{chevron} {icon} {title}\x1b[22m{close}\n",
        gutter = colorize(inspector_gutter(), category_color_for_section(), depth),
        open = SetForegroundColor(render_color(palette, depth)),
        close = ResetColor,
    ));
}

fn section_icon(section: InspectorSection) -> &'static str {
    match section {
        InspectorSection::Header => "▾",
        InspectorSection::Metadata => "◐",
        InspectorSection::Fields => "▦",
        InspectorSection::CorrelationKeys => "◉",
        InspectorSection::RecentContext => "↺",
        InspectorSection::CorrelatedEvents => "↳",
        InspectorSection::Suggestions => "✦",
        InspectorSection::RawPayload => "{ }",
    }
}

fn push_target_header(out: &mut String, target: &EventLine, depth: ColorDepth) {
    let cat_palette = category_color(target.category);
    let sev_palette = severity_color(target.severity);
    let source_palette = source_label_color(&target.source, target.category);
    let cat_glyph = colorize(
        &format!(" {} ", category_glyph(target.category)),
        cat_palette,
        depth,
    );
    let summary = format!("{} — {}", target.source, target.summary);
    let source_colored = colorize(&summary, source_palette, depth);
    out.push_str(&format!(
        "{gutter} {sev}{cat}{reset}{cat_glyph}{source_colored}\n",
        gutter = colorize(inspector_gutter(), category_color_for_section(), depth),
        sev = SetForegroundColor(render_color(sev_palette, depth)),
        cat = severity_label(target.severity),
        reset = ResetColor,
    ));
}

fn push_kv(out: &mut String, key: &str, value: &str, depth: ColorDepth) {
    out.push_str(&format!(
        "{gutter}   {key_open}{key}{key_close}: {value}\n",
        gutter = colorize(inspector_gutter(), category_color_for_section(), depth),
        key_open = SetForegroundColor(render_color(SPECTRAL_PRIMARY, depth)),
        key_close = ResetColor,
    ));
}

fn push_line(out: &mut String, line: &str, depth: ColorDepth) {
    out.push_str(&format!(
        "{gutter} {line}\n",
        gutter = colorize(inspector_gutter(), category_color_for_section(), depth),
    ));
}

fn push_correlation(out: &mut String, ctx: &CorrelationContext, depth: ColorDepth) -> u16 {
    if ctx.related.is_empty() {
        push_line(out, "  (no related events in ring buffer)", depth);
        return 1;
    }
    for related in &ctx.related {
        push_line(
            out,
            &format!(
                "  ↳ {} {} {}",
                severity_label(related.severity),
                related.source,
                related.summary
            ),
            depth,
        );
    }
    ctx.related.len() as u16
}

fn push_suggestion(out: &mut String, suggestion: &Suggestion, depth: ColorDepth) {
    push_line(out, &format!("  ⚑ {}", suggestion.title), depth);
    push_line(out, &format!("    {}", suggestion.action), depth);
}

fn category_color_for_section() -> PaletteColor {
    SPECTRAL_PRIMARY
}

fn colorize(text: &str, palette: PaletteColor, depth: ColorDepth) -> String {
    let color: Color = render_color(palette, depth);
    format!("{}{text}{}", SetForegroundColor(color), ResetColor)
}
