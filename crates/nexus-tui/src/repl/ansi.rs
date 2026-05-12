//! ANSI color palette + depth detection + downsampling.
//!
//! The Spectral Graphite palette is declared as static `PaletteColor`
//! values that carry truecolor RGB, 256-color xterm index, and 16-color
//! ANSI fallback all at once. `render_color` selects the correct tier
//! for the operator's terminal.

use crossterm::style::Color;

use crate::stream::severity::Severity;
use crate::stream::source_category::SourceCategory;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ColorDepth {
    NoColor,
    Truecolor,
    Color256,
    Color16,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ColorBasic {
    Black,
    Red,
    Green,
    Yellow,
    Blue,
    Magenta,
    Cyan,
    White,
    BrightBlack,
    BrightRed,
    BrightGreen,
    BrightYellow,
    BrightBlue,
    BrightMagenta,
    BrightCyan,
    BrightWhite,
}

impl ColorBasic {
    fn to_crossterm(self) -> Color {
        match self {
            Self::Black => Color::Black,
            Self::Red => Color::DarkRed,
            Self::Green => Color::DarkGreen,
            Self::Yellow => Color::DarkYellow,
            Self::Blue => Color::DarkBlue,
            Self::Magenta => Color::DarkMagenta,
            Self::Cyan => Color::DarkCyan,
            Self::White => Color::Grey,
            Self::BrightBlack => Color::DarkGrey,
            Self::BrightRed => Color::Red,
            Self::BrightGreen => Color::Green,
            Self::BrightYellow => Color::Yellow,
            Self::BrightBlue => Color::Blue,
            Self::BrightMagenta => Color::Magenta,
            Self::BrightCyan => Color::Cyan,
            Self::BrightWhite => Color::White,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct PaletteColor {
    pub truecolor: (u8, u8, u8),
    pub color256: u8,
    pub color16: ColorBasic,
}

pub const SPECTRAL_PRIMARY: PaletteColor = PaletteColor {
    truecolor: (0xba, 0x9e, 0xff),
    color256: 147,
    color16: ColorBasic::BrightBlue,
};

pub const SPECTRAL_SECONDARY: PaletteColor = PaletteColor {
    truecolor: (0x90, 0x93, 0xff),
    color256: 105,
    color16: ColorBasic::BrightBlue,
};

pub const SPECTRAL_TERTIARY: PaletteColor = PaletteColor {
    truecolor: (0xff, 0x84, 0x39),
    color256: 208,
    color16: ColorBasic::BrightYellow,
};

pub const SEVERITY_ERROR: PaletteColor = PaletteColor {
    truecolor: (0xff, 0x52, 0x53),
    color256: 203,
    color16: ColorBasic::BrightRed,
};

pub const SEVERITY_WARN: PaletteColor = SPECTRAL_TERTIARY;

pub const SEVERITY_DEBUG: PaletteColor = PaletteColor {
    truecolor: (0x6e, 0x76, 0x82),
    color256: 243,
    color16: ColorBasic::White,
};

pub const SEVERITY_FATAL: PaletteColor = PaletteColor {
    truecolor: (0xff, 0x1f, 0x1f),
    color256: 196,
    color16: ColorBasic::BrightRed,
};

pub const CATEGORY_WORKER: PaletteColor = PaletteColor {
    truecolor: (0x7a, 0xdf, 0x76),
    color256: 113,
    color16: ColorBasic::BrightGreen,
};

pub const CATEGORY_DEPLOY: PaletteColor = SPECTRAL_PRIMARY;

pub const CATEGORY_EXTENSION: PaletteColor = PaletteColor {
    truecolor: (0xff, 0xc0, 0x4d),
    color256: 215,
    color16: ColorBasic::BrightCyan,
};

pub const CATEGORY_STORAGE: PaletteColor = PaletteColor {
    truecolor: (0x5f, 0x87, 0xaf),
    color256: 67,
    color16: ColorBasic::Blue,
};

pub const CATEGORY_MODEL: PaletteColor = PaletteColor {
    truecolor: (0xd7, 0xaf, 0xff),
    color256: 183,
    color16: ColorBasic::BrightMagenta,
};

pub const CATEGORY_BACKEND: PaletteColor = PaletteColor {
    truecolor: (0x5f, 0xaf, 0xd7),
    color256: 74,
    color16: ColorBasic::Cyan,
};

pub const CATEGORY_OTHER: PaletteColor = PaletteColor {
    truecolor: (0x6e, 0x76, 0x82),
    color256: 243,
    color16: ColorBasic::White,
};

pub fn detect_color_depth() -> ColorDepth {
    detect_color_depth_from(
        std::env::var("COLORTERM").ok().as_deref(),
        std::env::var("TERM").ok().as_deref(),
    )
}

pub fn detect_color_depth_from(colorterm: Option<&str>, term: Option<&str>) -> ColorDepth {
    if matches!(colorterm, Some("truecolor") | Some("24bit")) {
        return ColorDepth::Truecolor;
    }
    let term_value = term.unwrap_or("").trim().to_ascii_lowercase();
    if term_value.is_empty() || term_value == "dumb" {
        return ColorDepth::Color16;
    }
    if term_value.contains("256color") {
        return ColorDepth::Color256;
    }
    ColorDepth::Color256
}

pub fn render_color(color: PaletteColor, depth: ColorDepth) -> Color {
    match depth {
        ColorDepth::Truecolor => {
            let (r, g, b) = color.truecolor;
            Color::Rgb { r, g, b }
        }
        ColorDepth::Color256 => Color::AnsiValue(color.color256),
        ColorDepth::Color16 => color.color16.to_crossterm(),
        ColorDepth::NoColor => Color::Reset,
    }
}

pub fn category_color(category: SourceCategory) -> PaletteColor {
    match category {
        SourceCategory::Runtime => SPECTRAL_SECONDARY,
        SourceCategory::Worker => CATEGORY_WORKER,
        SourceCategory::Deploy => CATEGORY_DEPLOY,
        SourceCategory::Extension => CATEGORY_EXTENSION,
        SourceCategory::Run => SPECTRAL_SECONDARY,
        SourceCategory::Host => SEVERITY_DEBUG,
        SourceCategory::Storage => CATEGORY_STORAGE,
        SourceCategory::Model => CATEGORY_MODEL,
        SourceCategory::Backend => CATEGORY_BACKEND,
        SourceCategory::Other => CATEGORY_OTHER,
    }
}

pub fn severity_color(severity: Severity) -> PaletteColor {
    match severity {
        Severity::Debug => SEVERITY_DEBUG,
        Severity::Info => SEVERITY_DEBUG,
        Severity::Warn => SEVERITY_WARN,
        Severity::Error => SEVERITY_ERROR,
        Severity::Fatal => SEVERITY_FATAL,
    }
}

/// Per-source shade table for each category (size = `SOURCE_SHADE_VARIANTS`).
/// 16-color mode collapses every shade to the category's base color so
/// the visual distinction disappears gracefully on legacy terminals (per
/// research.md decision 6).
const SOURCE_SHADE_VARIANTS: usize = 4;

const fn shade_table(base: PaletteColor) -> [PaletteColor; SOURCE_SHADE_VARIANTS] {
    let (r, g, b) = base.truecolor;
    [
        PaletteColor {
            truecolor: (r, g, b),
            color256: base.color256,
            color16: base.color16,
        },
        PaletteColor {
            truecolor: (saturate(r, 0x18), saturate(g, 0x12), saturate(b, 0x0c)),
            color256: base.color256,
            color16: base.color16,
        },
        PaletteColor {
            truecolor: (saturate(r, 0x0c), saturate(g, 0x18), saturate(b, 0x12)),
            color256: base.color256,
            color16: base.color16,
        },
        PaletteColor {
            truecolor: (saturate(r, 0x12), saturate(g, 0x0c), saturate(b, 0x18)),
            color256: base.color256,
            color16: base.color16,
        },
    ]
}

const fn saturate(value: u8, delta: u8) -> u8 {
    let raised = value as u16 + delta as u16;
    if raised > 0xff { 0xff } else { raised as u8 }
}

pub fn source_label_color(source: &str, category: SourceCategory) -> PaletteColor {
    use rustc_hash::FxHasher;
    use std::hash::Hasher;

    let mut hasher = FxHasher::default();
    hasher.write(source.as_bytes());
    let hash = hasher.finish();
    let table = shade_table(category_color(category));
    table[(hash as usize) % SOURCE_SHADE_VARIANTS]
}

/// Wrap `label` in an OSC-8 hyperlink escape pointing to `url`.
/// Modern terminals render the label as clickable; older terminals
/// strip the OSC sequence and show the label inline.
///
/// Defensive: if either `url` or `label` contains an ESC (0x1B), BEL
/// (0x07), or CSI (0x9B) byte, we refuse to emit the OSC envelope and
/// return the bare label instead. Without this guard a malicious host
/// could send a path containing `\x1b\\evil\x1b]8;;` to terminate the
/// outer OSC-8 early and hijack the subsequent terminal state. The
/// caller is responsible for percent-encoding the URL upstream;
/// this is a final belt-and-braces check.
pub fn osc8_hyperlink(url: &str, label: &str) -> String {
    if contains_terminal_control(url) || contains_terminal_control(label) {
        return label.to_string();
    }
    format!("\u{1b}]8;;{url}\u{1b}\\{label}\u{1b}]8;;\u{1b}\\")
}

fn contains_terminal_control(s: &str) -> bool {
    s.bytes().any(|b| b == 0x1b || b == 0x07 || b == 0x9b)
}
