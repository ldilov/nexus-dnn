use crossterm::style::Color;

use nexus_tui::Severity;
use nexus_tui::SourceCategory;
use nexus_tui::repl::ansi::{
    CATEGORY_WORKER, ColorDepth, SPECTRAL_PRIMARY, category_color, detect_color_depth_from,
    render_color, severity_color,
};

#[test]
fn detect_color_depth_truecolor_via_colorterm() {
    assert_eq!(
        detect_color_depth_from(Some("truecolor"), Some("xterm-256color")),
        ColorDepth::Truecolor
    );
    assert_eq!(
        detect_color_depth_from(Some("24bit"), Some("xterm")),
        ColorDepth::Truecolor
    );
}

#[test]
fn detect_color_depth_256_via_term() {
    assert_eq!(
        detect_color_depth_from(None, Some("xterm-256color")),
        ColorDepth::Color256
    );
    assert_eq!(
        detect_color_depth_from(Some(""), Some("screen-256color")),
        ColorDepth::Color256
    );
}

#[test]
fn detect_color_depth_falls_back_to_16_when_terminal_is_dumb() {
    assert_eq!(
        detect_color_depth_from(None, Some("dumb")),
        ColorDepth::Color16
    );
    assert_eq!(detect_color_depth_from(None, Some("")), ColorDepth::Color16);
    assert_eq!(detect_color_depth_from(None, None), ColorDepth::Color16);
}

#[test]
fn detect_color_depth_unknown_term_defaults_to_256() {
    assert_eq!(
        detect_color_depth_from(None, Some("xterm")),
        ColorDepth::Color256
    );
}

#[test]
fn render_color_truecolor_emits_rgb_tuple() {
    let color = render_color(SPECTRAL_PRIMARY, ColorDepth::Truecolor);
    assert_eq!(
        color,
        Color::Rgb {
            r: 0xba,
            g: 0x9e,
            b: 0xff
        }
    );
}

#[test]
fn render_color_256_emits_ansi_value() {
    let color = render_color(SPECTRAL_PRIMARY, ColorDepth::Color256);
    assert_eq!(color, Color::AnsiValue(147));
}

#[test]
fn render_color_16_collapses_to_named_basic() {
    let color = render_color(SPECTRAL_PRIMARY, ColorDepth::Color16);
    assert_eq!(color, Color::Blue);
}

#[test]
fn category_color_worker_at_color16_is_bright_green() {
    let color = render_color(category_color(SourceCategory::Worker), ColorDepth::Color16);
    assert_eq!(color, Color::Green);
}

#[test]
fn category_color_worker_at_truecolor_matches_palette() {
    let color = render_color(CATEGORY_WORKER, ColorDepth::Truecolor);
    assert_eq!(
        color,
        Color::Rgb {
            r: 0x7a,
            g: 0xdf,
            b: 0x76
        }
    );
}

#[test]
fn severity_color_error_at_color16_is_bright_red() {
    let color = render_color(severity_color(Severity::Error), ColorDepth::Color16);
    assert_eq!(color, Color::Red);
}

#[test]
fn severity_color_fatal_at_truecolor_is_intense_red() {
    let color = render_color(severity_color(Severity::Fatal), ColorDepth::Truecolor);
    assert_eq!(
        color,
        Color::Rgb {
            r: 0xff,
            g: 0x1f,
            b: 0x1f
        }
    );
}
