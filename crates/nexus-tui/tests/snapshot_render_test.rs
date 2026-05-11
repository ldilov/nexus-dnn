use insta::assert_snapshot;
use nexus_tui::render::gradient::{ansi_rgb, interpolate};
use nexus_tui::render::hover_whisper::render_hover_whisper;
use nexus_tui::render::luminance_ladder::{correlation_indent, error_left_bar};
use nexus_tui::repl::ansi::{ColorBasic, ColorDepth, PaletteColor};
use nexus_tui::Severity;
use nexus_tui::mouse::targets::ClickTarget;
use nexus_tui::EventId;

#[test]
fn snapshot_hover_whisper_for_filter_indicator() {
    let target = ClickTarget::FilterIndicator;
    let rendered = render_hover_whisper(Some(&target), ColorDepth::NoColor);
    assert_snapshot!("hover_whisper_filter_indicator", rendered);
}

#[test]
fn snapshot_hover_whisper_for_event_line() {
    let target = ClickTarget::EventLineBody {
        event_id: EventId::new(),
    };
    let rendered = render_hover_whisper(Some(&target), ColorDepth::NoColor);
    assert_snapshot!("hover_whisper_event_line", rendered);
}

#[test]
fn snapshot_hover_whisper_for_sparkline() {
    let target = ClickTarget::Sparkline;
    let rendered = render_hover_whisper(Some(&target), ColorDepth::NoColor);
    assert_snapshot!("hover_whisper_sparkline", rendered);
}

#[test]
fn snapshot_correlation_indent_levels() {
    let mut output = String::new();
    for depth in 0..=4 {
        let indent = correlation_indent(depth);
        output.push_str(&format!("depth={depth} bytes={}\n", indent.len()));
    }
    assert_snapshot!("correlation_indent_levels", output);
}

#[test]
fn snapshot_error_left_bar_per_severity() {
    let mut output = String::new();
    for severity in [
        Severity::Debug,
        Severity::Info,
        Severity::Warn,
        Severity::Error,
        Severity::Fatal,
    ] {
        let bar = error_left_bar(severity)
            .map(|c| c.to_string())
            .unwrap_or_default();
        output.push_str(&format!("{severity:?}: '{bar}'\n"));
    }
    assert_snapshot!("error_left_bar_per_severity", output);
}

#[test]
fn snapshot_gradient_midpoint() {
    let start = PaletteColor::new((0x10, 0x20, 0x30), 0, ColorBasic::Black);
    let end = PaletteColor::new((0xff, 0xa0, 0x40), 0, ColorBasic::Yellow);
    let mid = interpolate(start, end, 0.5);
    let ansi = ansi_rgb(mid);
    assert_snapshot!("gradient_midpoint", format!("{mid:?}\n{ansi}"));
}
