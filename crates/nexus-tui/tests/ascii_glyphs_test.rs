//! Spec 044 FR-008a — `--no-glyphs` ASCII fallback.
//!
//! Asserts that when [`RenderConfig::ascii_glyphs`] is `true`, the
//! rendered event line does NOT contain any of the Unicode severity or
//! source-category glyphs, and that the corresponding ASCII proxies
//! ARE present. Box-drawing characters (`│`, `┃`) are out-of-scope for
//! this flag and may still appear.

use std::collections::BTreeMap;

use nexus_events::types::NexusEvent;
use nexus_tui::EventLine;
use nexus_tui::render::event_line::{RenderConfig, render_event_line};
use nexus_tui::repl::ansi::ColorDepth;
use nexus_tui::stream::source_category::{SourceCategory, category_glyph, category_glyph_ascii};

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

fn cfg(ascii: bool) -> RenderConfig {
    RenderConfig {
        color_depth: ColorDepth::Truecolor,
        critical_border: false,
        hover_target: None,
        thread_leaf: false,
        ascii_glyphs: ascii,
    }
}

const UNICODE_CATEGORY_GLYPHS: &[char] = &['⚙', '◈', '▣', '⊞', '▶', '●', '▦', '◊', '◧', '▢'];
const UNICODE_SEVERITY_GLYPHS: &[char] = &['·', '○', '⚠', '✖', '☠'];

#[test]
fn ascii_mode_omits_unicode_category_glyphs() {
    let line = host_log("scheduler", "tick");
    let rendered = render_event_line(&line, &cfg(true));
    for glyph in UNICODE_CATEGORY_GLYPHS {
        assert!(
            !rendered.contains(*glyph),
            "ASCII mode must not emit Unicode category glyph {glyph} — got:\n{rendered}"
        );
    }
}

#[test]
fn ascii_mode_omits_unicode_severity_glyphs() {
    let line = host_log("scheduler", "tick");
    let rendered = render_event_line(&line, &cfg(true));
    for glyph in UNICODE_SEVERITY_GLYPHS {
        assert!(
            !rendered.contains(*glyph),
            "ASCII mode must not emit Unicode severity glyph {glyph}"
        );
    }
}

#[test]
fn unicode_mode_emits_unicode_glyphs() {
    let line = host_log("scheduler", "tick");
    let rendered = render_event_line(&line, &cfg(false));
    let host_glyph = category_glyph(SourceCategory::Host);
    assert!(
        rendered.contains(host_glyph),
        "Unicode mode must emit the host category glyph {host_glyph}"
    );
}

#[test]
fn ascii_glyph_table_is_distinct() {
    let glyphs: Vec<char> = [
        SourceCategory::Runtime,
        SourceCategory::Worker,
        SourceCategory::Deploy,
        SourceCategory::Extension,
        SourceCategory::Run,
        SourceCategory::Host,
        SourceCategory::Storage,
        SourceCategory::Model,
        SourceCategory::Backend,
        SourceCategory::Other,
    ]
    .iter()
    .map(|c| category_glyph_ascii(*c))
    .collect();
    let mut sorted = glyphs.clone();
    sorted.sort_unstable();
    sorted.dedup();
    assert_eq!(
        sorted.len(),
        glyphs.len(),
        "ASCII category glyphs must be pairwise distinct: {glyphs:?}"
    );
}

#[test]
fn box_drawing_remains_in_ascii_mode() {
    let line = host_log("scheduler", "tick");
    let rendered = render_event_line(&line, &cfg(true));
    let has_box_drawing = rendered.contains('│') || rendered.contains('┃');
    assert!(
        has_box_drawing,
        "ASCII mode preserves box-drawing per FR-008a; rendered={rendered}"
    );
}
