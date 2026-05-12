use std::borrow::Cow;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ColorDepth {
    NoColor,
    Truecolor,
    Color256,
    Color16,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub struct TerminalProbe<'a> {
    pub no_color: Option<&'a str>,
    pub colorterm: Option<&'a str>,
    pub term: Option<&'a str>,
    pub term_program: Option<&'a str>,
    pub tmux: Option<&'a str>,
    pub wt_session: Option<&'a str>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct TerminalCapabilities {
    pub color_depth: ColorDepth,
    pub inside_tmux: bool,
    pub hyperlinks: bool,
}

pub fn probe_terminal_capabilities() -> TerminalCapabilities {
    let no_color = read_env("NO_COLOR");
    let colorterm = read_env("COLORTERM");
    let term = read_env("TERM");
    let term_program = read_env("TERM_PROGRAM");
    let tmux = read_env("TMUX");
    let wt_session = read_env("WT_SESSION");

    probe_terminal_capabilities_from(TerminalProbe {
        no_color: no_color.as_deref(),
        colorterm: colorterm.as_deref(),
        term: term.as_deref(),
        term_program: term_program.as_deref(),
        tmux: tmux.as_deref(),
        wt_session: wt_session.as_deref(),
    })
}

pub fn probe_terminal_capabilities_from(probe: TerminalProbe<'_>) -> TerminalCapabilities {
    let term = normalize(probe.term);
    let inside_tmux = probe.tmux.is_some();

    TerminalCapabilities {
        color_depth: detect_color_depth_from_probe(probe),
        inside_tmux,
        hyperlinks: supports_hyperlinks(term.as_deref()),
    }
}

pub fn detect_color_depth() -> ColorDepth {
    probe_terminal_capabilities().color_depth
}

pub fn detect_color_depth_from(colorterm: Option<&str>, term: Option<&str>) -> ColorDepth {
    detect_color_depth_from_probe(TerminalProbe {
        colorterm,
        term,
        ..TerminalProbe::default()
    })
}

fn detect_color_depth_from_probe(probe: TerminalProbe<'_>) -> ColorDepth {
    if probe.no_color.is_some() {
        return ColorDepth::NoColor;
    }

    let colorterm = normalize(probe.colorterm);
    if matches!(colorterm.as_deref(), Some("truecolor") | Some("24bit")) {
        return ColorDepth::Truecolor;
    }

    let term = normalize(probe.term);
    if is_tmux_truecolor_passthrough(probe, term.as_deref())
        || term_supports_truecolor(term.as_deref())
    {
        return ColorDepth::Truecolor;
    }

    match term.as_deref() {
        None | Some("") | Some("dumb") => ColorDepth::Color16,
        Some(value) if value.contains("256color") => ColorDepth::Color256,
        Some(_) => ColorDepth::Color256,
    }
}

fn is_tmux_truecolor_passthrough(probe: TerminalProbe<'_>, term: Option<&str>) -> bool {
    if probe.tmux.is_none() {
        return false;
    }

    let term = term.unwrap_or_default();
    if !(term.starts_with("screen") || term.starts_with("tmux")) {
        return false;
    }

    if probe.wt_session.is_some() {
        return true;
    }

    matches!(
        normalize(probe.term_program).as_deref(),
        Some("wezterm")
            | Some("iterm.app")
            | Some("apple_terminal")
            | Some("vscode")
            | Some("hyper")
    )
}

fn term_supports_truecolor(term: Option<&str>) -> bool {
    matches!(
        term,
        Some(value) if value.contains("truecolor") || value.contains("24bit") || value.contains("direct")
    )
}

fn supports_hyperlinks(term: Option<&str>) -> bool {
    !matches!(term, None | Some("") | Some("dumb"))
}

fn normalize(value: Option<&str>) -> Option<Cow<'_, str>> {
    value
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(ascii_lowercase_if_needed)
}

fn ascii_lowercase_if_needed(value: &str) -> Cow<'_, str> {
    if value.bytes().all(|b| !b.is_ascii_uppercase()) {
        Cow::Borrowed(value)
    } else {
        Cow::Owned(value.to_ascii_lowercase().replace(' ', "_"))
    }
}

fn read_env(name: &str) -> Option<String> {
    std::env::var_os(name).map(|value| value.to_string_lossy().into_owned())
}
