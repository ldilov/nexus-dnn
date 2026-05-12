use crossterm::style::Color;

use nexus_tui::repl::ansi::{ColorDepth as AnsiColorDepth, SPECTRAL_PRIMARY, render_color};
use nexus_tui::term_caps::{
    ColorDepth, TerminalCapabilities, TerminalProbe, probe_terminal_capabilities_from,
};

#[test]
fn no_color_overrides_truecolor_detection() {
    let caps = probe_terminal_capabilities_from(TerminalProbe {
        no_color: Some("1"),
        colorterm: Some("truecolor"),
        term: Some("xterm-256color"),
        ..TerminalProbe::default()
    });

    assert_eq!(
        caps,
        TerminalCapabilities {
            color_depth: ColorDepth::NoColor,
            inside_tmux: false,
            hyperlinks: true,
        }
    );
}

#[test]
fn empty_no_color_still_disables_color() {
    let caps = probe_terminal_capabilities_from(TerminalProbe {
        no_color: Some(""),
        colorterm: Some("24bit"),
        term: Some("xterm-256color"),
        ..TerminalProbe::default()
    });

    assert_eq!(caps.color_depth, ColorDepth::NoColor);
}

#[test]
fn tmux_passthrough_keeps_truecolor_for_known_outer_terminals() {
    let caps = probe_terminal_capabilities_from(TerminalProbe {
        term: Some("screen-256color"),
        term_program: Some("WezTerm"),
        tmux: Some("/tmp/tmux-1000/default,123,0"),
        ..TerminalProbe::default()
    });

    assert_eq!(
        caps,
        TerminalCapabilities {
            color_depth: ColorDepth::Truecolor,
            inside_tmux: true,
            hyperlinks: true,
        }
    );
}

#[test]
fn plain_tmux_without_outer_truecolor_hint_stays_at_256() {
    let caps = probe_terminal_capabilities_from(TerminalProbe {
        term: Some("screen-256color"),
        tmux: Some("/tmp/tmux-1000/default,123,0"),
        ..TerminalProbe::default()
    });

    assert_eq!(caps.color_depth, ColorDepth::Color256);
    assert!(caps.inside_tmux);
}

#[test]
fn render_color_no_color_uses_terminal_default() {
    assert_eq!(
        render_color(SPECTRAL_PRIMARY, AnsiColorDepth::NoColor),
        Color::Reset
    );
}
