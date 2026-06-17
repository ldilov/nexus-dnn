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
    // S4 — Sub-sectioned inspector for classified failure events.
    // These sections only render when [`InspectorRenderConfig.event_class`]
    HttpStatus,
    HttpRequest,
    HttpResponse,
    StackTrace,
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
            InspectorSection::HttpStatus => "http status",
            InspectorSection::HttpRequest => "http request",
            InspectorSection::HttpResponse => "http response",
            InspectorSection::StackTrace => "stack trace",
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
            InspectorSection::HttpStatus => "http_status",
            InspectorSection::HttpRequest => "http_request",
            InspectorSection::HttpResponse => "http_response",
            InspectorSection::StackTrace => "stack_trace",
        }
    }

    pub fn all() -> [InspectorSection; 12] {
        [
            InspectorSection::Header,
            InspectorSection::Metadata,
            InspectorSection::Fields,
            InspectorSection::CorrelationKeys,
            InspectorSection::RecentContext,
            InspectorSection::CorrelatedEvents,
            InspectorSection::Suggestions,
            InspectorSection::RawPayload,
            InspectorSection::HttpStatus,
            InspectorSection::HttpRequest,
            InspectorSection::HttpResponse,
            InspectorSection::StackTrace,
        ]
    }
}

/// Default `collapsed` set seeded for a given event class on first
/// inspect. The set contains the sections that should render in their
/// **collapsed** state — sections NOT in the set are rendered expanded.
///
/// Per Define Q3 consensus:
/// - Plain / HttpSuccess: hide HTTP/StackTrace sub-sections entirely
///   (handled by the renderer, not this set).
/// - HttpFailure: expand HttpStatus + HttpResponse; collapse everything
///   else for a tight initial render (status + 200-char body
///   snippet inline).
/// - Exception / Panic: expand StackTrace; collapse most other sections
///   so the trace is what the operator sees first.
pub fn default_collapsed_for_class(
    class: crate::inspector::classifier::EventClass,
) -> std::collections::BTreeSet<InspectorSection> {
    use crate::inspector::classifier::EventClass;
    use std::collections::BTreeSet;
    let mut collapsed = BTreeSet::new();
    match class {
        EventClass::Plain | EventClass::HttpSuccess { .. } => {
            // Use the historical default — Header/Metadata/Fields
            // expanded; everything else collapsed. The Define-Q3 matrix
            collapsed.insert(InspectorSection::CorrelationKeys);
            collapsed.insert(InspectorSection::RecentContext);
            collapsed.insert(InspectorSection::CorrelatedEvents);
            collapsed.insert(InspectorSection::Suggestions);
            collapsed.insert(InspectorSection::RawPayload);
        }
        EventClass::HttpFailure { .. } => {
            // Tight failure view: status + response visible; everything
            // else folded so the operator sees the failure quickly.
            collapsed.insert(InspectorSection::Header);
            collapsed.insert(InspectorSection::Metadata);
            collapsed.insert(InspectorSection::CorrelationKeys);
            collapsed.insert(InspectorSection::RecentContext);
            collapsed.insert(InspectorSection::CorrelatedEvents);
            collapsed.insert(InspectorSection::Suggestions);
            collapsed.insert(InspectorSection::RawPayload);
            collapsed.insert(InspectorSection::HttpRequest);
            // Fields stays expanded — carries the http.* fields.
            // HttpStatus + HttpResponse stay expanded.
        }
        EventClass::Exception | EventClass::Panic => {
            // Trace-first view.
            collapsed.insert(InspectorSection::Metadata);
            collapsed.insert(InspectorSection::Fields);
            collapsed.insert(InspectorSection::CorrelationKeys);
            collapsed.insert(InspectorSection::RecentContext);
            collapsed.insert(InspectorSection::CorrelatedEvents);
            collapsed.insert(InspectorSection::Suggestions);
            collapsed.insert(InspectorSection::RawPayload);
            // Header stays expanded (carries event-source label).
            // StackTrace stays expanded.
        }
    }
    collapsed
}

#[derive(Debug, Clone)]
pub struct InspectorRenderConfig {
    pub color_depth: ColorDepth,
    pub recent_context_count: usize,
    pub correlation_depth: usize,
    pub collapsed: std::collections::BTreeSet<InspectorSection>,
    /// Spec 044 S4 — when set, render the per-class sub-sections
    /// (HttpStatus / HttpRequest / HttpResponse for HTTP classes,
    /// StackTrace for Exception / Panic). `None` falls back to the
    /// classic 8-section layout (no sub-sections rendered).
    pub event_class: Option<crate::inspector::classifier::EventClass>,
}

impl Default for InspectorRenderConfig {
    fn default() -> Self {
        Self {
            color_depth: ColorDepth::Truecolor,
            recent_context_count: 5,
            correlation_depth: 3,
            collapsed: std::collections::BTreeSet::new(),
            event_class: None,
        }
    }
}

#[derive(Debug, Clone)]
pub struct InspectorBlockLayout {
    pub rendered: String,
    pub section_rows: Vec<(InspectorSection, u16)>,
    /// Total terminal rows the rendered block occupies. Used by
    /// the controller to clear the prior block before re-rendering on
    /// section toggle, preventing duplicate cards from stacking.
    pub total_rows: u16,
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

    // Spec 044 S4 — per-class sub-sections. Only emit when the
    // classifier marks this event as HTTP-flavoured or
    if let Some(class) = cfg.event_class {
        use crate::inspector::classifier::EventClass;
        match class {
            EventClass::HttpSuccess { status } | EventClass::HttpFailure { status } => {
                row += push_http_sections(
                    &mut out,
                    &mut section_rows,
                    target,
                    &cfg.collapsed,
                    depth,
                    status,
                    row,
                );
            }
            EventClass::Exception | EventClass::Panic => {
                row += push_stack_trace_section(
                    &mut out,
                    &mut section_rows,
                    target,
                    &cfg.collapsed,
                    depth,
                    row,
                );
            }
            EventClass::Plain => {}
        }
    }

    InspectorBlockLayout {
        rendered: out,
        section_rows,
        total_rows: row,
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

/// Render `HttpStatus` + `HttpRequest` + `HttpResponse` sub-sections.
/// Returns the row-delta added by these sections. Pulls fields from
/// the underlying `HostLog.fields` map: `http.method`, `http.url`,
/// `http.status_code`, `http.duration_ms`, `http.response_body`, etc.
fn push_http_sections(
    out: &mut String,
    section_rows: &mut Vec<(InspectorSection, u16)>,
    target: &EventLine,
    collapsed: &std::collections::BTreeSet<InspectorSection>,
    depth: ColorDepth,
    status: u16,
    base_row: u16,
) -> u16 {
    use crate::stream::event_line::RawPayload;
    use nexus_events::types::NexusEvent;
    let mut row: u16 = 0;
    let fields = match target.raw_payload.as_ref() {
        RawPayload::NexusEvent(NexusEvent::HostLog { fields, .. }) => fields,
        _ => return 0,
    };

    push_section(out, InspectorSection::HttpStatus, collapsed, depth);
    section_rows.push((InspectorSection::HttpStatus, base_row + row));
    row += 1;
    if !collapsed.contains(&InspectorSection::HttpStatus) {
        let outcome_glyph = if (200..400).contains(&status) {
            "✓"
        } else if status == 0 {
            "⚠"
        } else {
            "✗"
        };
        let duration = fields
            .get("http.duration_ms")
            .map(|d| format!("  {d} ms"))
            .unwrap_or_default();
        let status_text = if status == 0 {
            fields
                .get("http.error")
                .cloned()
                .unwrap_or_else(|| "no status".into())
        } else {
            format!("{status}")
        };
        let safe_status_text = sanitize_for_terminal(&status_text);
        let safe_duration = sanitize_for_terminal(&duration);
        push_line(
            out,
            &format!("  {outcome_glyph} {safe_status_text}{safe_duration}"),
            depth,
        );
        row += 1;
    }

    push_section(out, InspectorSection::HttpRequest, collapsed, depth);
    section_rows.push((InspectorSection::HttpRequest, base_row + row));
    row += 1;
    if !collapsed.contains(&InspectorSection::HttpRequest) {
        let method = fields.get("http.method").map(String::as_str).unwrap_or("?");
        let url = fields.get("http.url").map(String::as_str).unwrap_or("?");
        let safe_method = sanitize_for_terminal(method);
        let safe_url = sanitize_for_terminal(url);
        push_line(out, &format!("  {safe_method} {safe_url}"), depth);
        row += 1;
    }

    push_section(out, InspectorSection::HttpResponse, collapsed, depth);
    section_rows.push((InspectorSection::HttpResponse, base_row + row));
    row += 1;
    if !collapsed.contains(&InspectorSection::HttpResponse) {
        let body = fields
            .get("http.response_body")
            .map(String::as_str)
            .unwrap_or("");
        if body.is_empty() {
            push_line(out, "  (no response body captured)", depth);
            row += 1;
        } else {
            // Snippet only — first 200 chars + ellipsis. Sanitise
            // before truncation so multi-byte ESC sequences can't
            let safe_body = sanitize_for_terminal(body);
            let mut snippet: String = safe_body.chars().take(200).collect();
            if safe_body.chars().count() > 200 {
                snippet.push('…');
            }
            push_line(out, &format!("  {snippet}"), depth);
            row += 1;
        }
    }
    row
}

/// Render `StackTrace` sub-section. Parses the underlying message
/// body, then renders top-5 frames with `… N more frames` footer
/// when truncated. Non-workspace frames render dimmed.
fn push_stack_trace_section(
    out: &mut String,
    section_rows: &mut Vec<(InspectorSection, u16)>,
    target: &EventLine,
    collapsed: &std::collections::BTreeSet<InspectorSection>,
    depth: ColorDepth,
    base_row: u16,
) -> u16 {
    use crate::inspector::stack_trace::parse as parse_trace;
    use crate::stream::event_line::RawPayload;
    use nexus_events::types::NexusEvent;
    let mut row: u16 = 0;
    let message_body = match target.raw_payload.as_ref() {
        RawPayload::NexusEvent(NexusEvent::HostLog { message, .. }) => message.as_str(),
        _ => target.summary.as_str(),
    };
    let frames = parse_trace(message_body);

    push_section(out, InspectorSection::StackTrace, collapsed, depth);
    section_rows.push((InspectorSection::StackTrace, base_row + row));
    row += 1;

    if collapsed.contains(&InspectorSection::StackTrace) {
        return row;
    }
    if frames.is_empty() {
        push_line(out, "  (no parseable frames)", depth);
        row += 1;
        return row;
    }

    const TOP_N: usize = 5;
    let total = frames.len();
    let render_count = total.min(TOP_N);
    for frame in frames.iter().take(render_count) {
        // Build the location text; wrap in OSC-8 if the frame is
        // workspace code AND we have a file+line. Non-workspace frames
        let safe_file_label: std::borrow::Cow<'_, str> = frame
            .file
            .as_deref()
            .map(sanitize_for_terminal)
            .unwrap_or(std::borrow::Cow::Borrowed(""));
        let location_plain = match (frame.file.as_deref(), frame.line) {
            (Some(_), Some(line)) => format!("{safe_file_label}:{line}"),
            (Some(_), None) => safe_file_label.to_string(),
            _ => String::new(),
        };
        let location_styled = match (
            frame.is_workspace_frame(),
            frame.file.as_deref(),
            frame.line,
        ) {
            (true, Some(file), Some(line)) => {
                let url = build_frame_url(file, line, frame.column);
                crate::repl::ansi::osc8_hyperlink(&url, &location_plain)
            }
            _ => location_plain.clone(),
        };
        let safe_function = sanitize_for_terminal(&frame.function);
        let line_text = if location_plain.is_empty() {
            format!("  at {safe_function}")
        } else {
            // location_styled is either plain text (sanitised below
            // before URL-encoding) or our own OSC-8 wrap around a
            format!("  at {safe_function}  ·  {location_styled}")
        };
        if frame.is_workspace_frame() {
            push_line(out, &line_text, depth);
        } else {
            push_line(out, &format!("\x1b[2m{line_text}\x1b[0m"), depth);
        }
        row += 1;
    }
    if total > TOP_N {
        let remaining = total - TOP_N;
        push_line(
            out,
            &format!(
                "  … {remaining} more frame{}",
                if remaining == 1 { "" } else { "s" }
            ),
            depth,
        );
        row += 1;
    }
    row
}

/// Build the URL embedded in an OSC-8 hyperlink wrapping a stack-trace
/// file:line reference. The scheme is `vscode://file/<path>:<line>:<col>`
/// — the de-facto IDE-universal handler. Most modern terminals
/// (WezTerm, Kitty, iTerm2, Windows Terminal, recent gnome-terminal)
/// pass `vscode://` URIs to the OS handler; older terminals strip the
/// OSC sequence entirely so the user just sees the bare label.
///
/// The Define-Q5 decision was "accept degradation, no copy hint" — so
/// terminals without OSC-8 support are not penalised, they just see
/// the same plain-text `file:line:col` they did before.
fn build_frame_url(file: &str, line: u32, column: Option<u32>) -> String {
    // Normalize Windows backslashes to forward slashes; vscode:// expects
    // POSIX path separators inside its URI.
    let normalized = file.replace('\\', "/");
    // Percent-encode every byte that could break out of the URL or
    // hijack the OSC-8 escape envelope — ESC (0x1B), BEL (0x07), CSI
    let encoded = percent_encode_path(&normalized);
    match column {
        Some(c) => format!("vscode://file/{encoded}:{line}:{c}"),
        None => format!("vscode://file/{encoded}:{line}"),
    }
}

fn percent_encode_path(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    for &b in s.as_bytes() {
        let safe = matches!(
            b,
            b'A'..=b'Z'
                | b'a'..=b'z'
                | b'0'..=b'9'
                | b'-'
                | b'_'
                | b'.'
                | b'~'
                | b'/'
                | b':'
                | b'@'
                | b','
                | b'+'
                | b'!'
                | b'$'
                | b'&'
                | b'('
                | b')'
                | b'*'
                | b'='
                | b';'
        );
        if safe {
            out.push(b as char);
        } else {
            out.push_str(&format!("%{b:02X}"));
        }
    }
    out
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
        InspectorSection::Header => "■",
        InspectorSection::Metadata => "◐",
        InspectorSection::Fields => "▦",
        InspectorSection::CorrelationKeys => "◉",
        InspectorSection::RecentContext => "↺",
        InspectorSection::CorrelatedEvents => "↳",
        InspectorSection::Suggestions => "✦",
        InspectorSection::RawPayload => "{ }",
        InspectorSection::HttpStatus => "⚑",
        InspectorSection::HttpRequest => "→",
        InspectorSection::HttpResponse => "←",
        InspectorSection::StackTrace => "⌁",
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
    // target.source and target.summary are host-controlled — strip any
    // embedded terminal escape bytes before interpolating, so a
    let safe_source = sanitize_for_terminal(&target.source);
    let safe_summary = sanitize_for_terminal(&target.summary);
    let summary = format!("{safe_source} — {safe_summary}");
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
    let safe_key = sanitize_for_terminal(key);
    let safe_value = sanitize_for_terminal(value);
    out.push_str(&format!(
        "{gutter}   {key_open}{key}{key_close}: {value}\n",
        gutter = colorize(inspector_gutter(), category_color_for_section(), depth),
        key_open = SetForegroundColor(render_color(SPECTRAL_PRIMARY, depth)),
        key_close = ResetColor,
        key = safe_key,
        value = safe_value,
    ));
}

/// Strip terminal control bytes (ESC, BEL, CSI start) from a string
/// before interpolating it into rendered output. The TUI accepts
/// arbitrary event-payload text from the host, which may contain
/// embedded ANSI escapes — without sanitisation a malicious host log
/// could clear the screen, rewrite the title, or hijack subsequent
/// OSC sequences. This is the chokepoint for any host-controlled
/// string reaching `push_kv` / `push_line` / `osc8_hyperlink`.
///
/// Returns a `Cow` so the common case (no escapes) skips allocation.
fn sanitize_for_terminal(s: &str) -> std::borrow::Cow<'_, str> {
    if s.bytes()
        .any(|b| b == 0x1b || b == 0x07 || b == 0x9b || (b < 0x20 && b != b'\t' && b != b'\n'))
    {
        let cleaned: String = s
            .chars()
            .filter(|c| {
                let b = *c as u32;
                b != 0x1b && b != 0x07 && b != 0x9b && !(b < 0x20 && b != 0x09 && b != 0x0A)
            })
            .collect();
        std::borrow::Cow::Owned(cleaned)
    } else {
        std::borrow::Cow::Borrowed(s)
    }
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
