use crossterm::style::Color;

use crate::repl::ansi::{ColorBasic, ColorDepth, PaletteColor, render_color};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SpectralTheme {
    pub severity: SeverityTokens,
    pub surfaces: SurfaceTokens,
    pub accents: AccentTokens,
    pub chrome: ChromeTokens,
    pub menu: MenuTokens,
    pub motion: MotionTokens,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct MenuTokens {
    pub inactive_fg: PaletteColor,
    pub selected_fg: PaletteColor,
    pub selected_bg: PaletteColor,
    pub description_fg: PaletteColor,
    pub match_highlight_fg: PaletteColor,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SeverityTokens {
    pub debug: PaletteColor,
    pub info: PaletteColor,
    pub warn: PaletteColor,
    pub error: PaletteColor,
    pub fatal: PaletteColor,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SurfaceTokens {
    pub canvas: PaletteColor,
    pub panel: PaletteColor,
    pub subtle: PaletteColor,
    pub dim_text: PaletteColor,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct AccentTokens {
    pub primary: PaletteColor,
    pub secondary: PaletteColor,
    pub tertiary: PaletteColor,
    pub success: PaletteColor,
    pub danger: PaletteColor,
    pub info: PaletteColor,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ChromeTokens {
    pub gutter: PaletteColor,
    pub indicator: PaletteColor,
    pub link: PaletteColor,
    pub thread_leaf: PaletteColor,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct MotionTokens {
    pub reduce_motion: bool,
    pub pulse_frames: u16,
    pub hover_frames: u16,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ThemeRuntime {
    pub theme: SpectralTheme,
    pub color_depth: ColorDepth,
}

impl ThemeRuntime {
    pub fn new(theme: SpectralTheme, color_depth: ColorDepth) -> Self {
        Self { theme, color_depth }
    }

    pub fn render(&self, color: PaletteColor) -> Color {
        render_color(color, self.color_depth)
    }
}

impl Default for SpectralTheme {
    fn default() -> Self {
        Self {
            severity: SeverityTokens {
                debug: PaletteColor::new((0x98, 0xa2, 0xb3), 248, ColorBasic::BrightWhite),
                info: PaletteColor::new((0x90, 0x93, 0xff), 105, ColorBasic::BrightBlue),
                warn: PaletteColor::new((0xff, 0x84, 0x39), 208, ColorBasic::BrightYellow),
                error: PaletteColor::new((0xff, 0x52, 0x53), 203, ColorBasic::BrightRed),
                fatal: PaletteColor::new((0xff, 0x1f, 0x1f), 196, ColorBasic::BrightRed),
            },
            surfaces: SurfaceTokens {
                canvas: PaletteColor::new((0x10, 0x13, 0x17), 233, ColorBasic::Black),
                panel: PaletteColor::new((0x1b, 0x21, 0x29), 235, ColorBasic::BrightBlack),
                subtle: PaletteColor::new((0x2a, 0x33, 0x40), 238, ColorBasic::BrightBlack),
                dim_text: PaletteColor::new((0x88, 0x92, 0xa0), 245, ColorBasic::White),
            },
            accents: AccentTokens {
                primary: PaletteColor::new((0xba, 0x9e, 0xff), 147, ColorBasic::BrightBlue),
                secondary: PaletteColor::new((0x90, 0x93, 0xff), 105, ColorBasic::BrightBlue),
                tertiary: PaletteColor::new((0xff, 0x84, 0x39), 208, ColorBasic::BrightYellow),
                success: PaletteColor::new((0x54, 0xd2, 0x9b), 78, ColorBasic::BrightGreen),
                danger: PaletteColor::new((0xff, 0x52, 0x53), 203, ColorBasic::BrightRed),
                info: PaletteColor::new((0x4f, 0xb3, 0xff), 75, ColorBasic::BrightCyan),
            },
            chrome: ChromeTokens {
                gutter: PaletteColor::new((0x5f, 0x87, 0xaf), 67, ColorBasic::Blue),
                indicator: PaletteColor::new((0xba, 0x9e, 0xff), 141, ColorBasic::BrightMagenta),
                link: PaletteColor::new((0x4f, 0xb3, 0xff), 75, ColorBasic::BrightCyan),
                thread_leaf: PaletteColor::new((0xd7, 0xaf, 0xff), 183, ColorBasic::BrightMagenta),
            },
            menu: MenuTokens {
                inactive_fg: PaletteColor::new((0x4f, 0xb3, 0xff), 75, ColorBasic::BrightCyan),
                selected_fg: PaletteColor::new((0xff, 0xff, 0xff), 231, ColorBasic::BrightWhite),
                selected_bg: PaletteColor::new((0x00, 0x5f, 0xff), 33, ColorBasic::Blue),
                description_fg: PaletteColor::new((0xd0, 0xd0, 0xd0), 252, ColorBasic::White),
                match_highlight_fg: PaletteColor::new(
                    (0xff, 0xaf, 0x5f),
                    215,
                    ColorBasic::BrightYellow,
                ),
            },
            motion: MotionTokens {
                reduce_motion: false,
                pulse_frames: 24,
                hover_frames: 6,
            },
        }
    }
}

impl PaletteColor {
    pub const fn new(truecolor: (u8, u8, u8), color256: u8, color16: ColorBasic) -> Self {
        Self {
            truecolor,
            color256,
            color16,
        }
    }

    pub fn from_truecolor(truecolor: (u8, u8, u8)) -> Self {
        Self {
            truecolor,
            color256: nearest_xterm(truecolor),
            color16: nearest_basic(truecolor),
        }
    }

    pub fn contrast_ratio(self, background: PaletteColor) -> f32 {
        contrast_ratio(self.truecolor, background.truecolor)
    }

    pub fn as_nu_color(self, depth: ColorDepth) -> nu_ansi_term::Color {
        match depth {
            ColorDepth::NoColor => nu_ansi_term::Color::Default,
            ColorDepth::Color16 => nu_ansi_term_basic(self.color16),
            ColorDepth::Color256 => nu_ansi_term::Color::Fixed(self.color256),
            ColorDepth::Truecolor => {
                let (r, g, b) = self.truecolor;
                nu_ansi_term::Color::Rgb(r, g, b)
            }
        }
    }
}

fn nu_ansi_term_basic(basic: ColorBasic) -> nu_ansi_term::Color {
    match basic {
        ColorBasic::Black => nu_ansi_term::Color::Black,
        ColorBasic::Red => nu_ansi_term::Color::Red,
        ColorBasic::Green => nu_ansi_term::Color::Green,
        ColorBasic::Yellow => nu_ansi_term::Color::Yellow,
        ColorBasic::Blue => nu_ansi_term::Color::Blue,
        ColorBasic::Magenta => nu_ansi_term::Color::Magenta,
        ColorBasic::Cyan => nu_ansi_term::Color::Cyan,
        ColorBasic::White => nu_ansi_term::Color::White,
        ColorBasic::BrightBlack => nu_ansi_term::Color::DarkGray,
        ColorBasic::BrightRed => nu_ansi_term::Color::LightRed,
        ColorBasic::BrightGreen => nu_ansi_term::Color::LightGreen,
        ColorBasic::BrightYellow => nu_ansi_term::Color::LightYellow,
        ColorBasic::BrightBlue => nu_ansi_term::Color::LightBlue,
        ColorBasic::BrightMagenta => nu_ansi_term::Color::LightMagenta,
        ColorBasic::BrightCyan => nu_ansi_term::Color::LightCyan,
        ColorBasic::BrightWhite => nu_ansi_term::Color::LightGray,
    }
}

fn contrast_ratio(foreground: (u8, u8, u8), background: (u8, u8, u8)) -> f32 {
    let fg = relative_luminance(foreground);
    let bg = relative_luminance(background);
    let (lighter, darker) = if fg >= bg { (fg, bg) } else { (bg, fg) };
    (lighter + 0.05) / (darker + 0.05)
}

fn relative_luminance((r, g, b): (u8, u8, u8)) -> f32 {
    0.2126 * srgb_to_linear(r) + 0.7152 * srgb_to_linear(g) + 0.0722 * srgb_to_linear(b)
}

fn srgb_to_linear(channel: u8) -> f32 {
    let value = channel as f32 / 255.0;
    if value <= 0.04045 {
        value / 12.92
    } else {
        ((value + 0.055) / 1.055).powf(2.4)
    }
}

fn nearest_basic(rgb: (u8, u8, u8)) -> ColorBasic {
    BASIC_SWATCHES
        .iter()
        .min_by_key(|(_, candidate)| distance_squared(rgb, *candidate))
        .map(|(basic, _)| *basic)
        .unwrap_or(ColorBasic::White)
}

fn nearest_xterm(rgb: (u8, u8, u8)) -> u8 {
    let mut best_index = 16u8;
    let mut best_distance = u32::MAX;
    for idx in 0u16..=255 {
        let index = idx as u8;
        let distance = distance_squared(rgb, xterm_rgb(index));
        if distance < best_distance {
            best_distance = distance;
            best_index = index;
        }
    }
    best_index
}

fn distance_squared(a: (u8, u8, u8), b: (u8, u8, u8)) -> u32 {
    let dr = a.0 as i32 - b.0 as i32;
    let dg = a.1 as i32 - b.1 as i32;
    let db = a.2 as i32 - b.2 as i32;
    (dr * dr + dg * dg + db * db) as u32
}

fn xterm_rgb(index: u8) -> (u8, u8, u8) {
    if index < 16 {
        return BASIC_SWATCHES[index as usize].1;
    }

    if (16..=231).contains(&index) {
        let i = index - 16;
        let r = i / 36;
        let g = (i % 36) / 6;
        let b = i % 6;
        return (cube_component(r), cube_component(g), cube_component(b));
    }

    if (232..=255).contains(&index) {
        let level = 8 + (index - 232) * 10;
        return (level, level, level);
    }

    BASIC_SWATCHES[index as usize].1
}

const fn cube_component(component: u8) -> u8 {
    match component {
        0 => 0,
        1 => 95,
        2 => 135,
        3 => 175,
        4 => 215,
        _ => 255,
    }
}

const BASIC_SWATCHES: &[(ColorBasic, (u8, u8, u8))] = &[
    (ColorBasic::Black, (0x00, 0x00, 0x00)),
    (ColorBasic::Red, (0x80, 0x00, 0x00)),
    (ColorBasic::Green, (0x00, 0x80, 0x00)),
    (ColorBasic::Yellow, (0x80, 0x80, 0x00)),
    (ColorBasic::Blue, (0x00, 0x00, 0x80)),
    (ColorBasic::Magenta, (0x80, 0x00, 0x80)),
    (ColorBasic::Cyan, (0x00, 0x80, 0x80)),
    (ColorBasic::White, (0xc0, 0xc0, 0xc0)),
    (ColorBasic::BrightBlack, (0x80, 0x80, 0x80)),
    (ColorBasic::BrightRed, (0xff, 0x00, 0x00)),
    (ColorBasic::BrightGreen, (0x00, 0xff, 0x00)),
    (ColorBasic::BrightYellow, (0xff, 0xff, 0x00)),
    (ColorBasic::BrightBlue, (0x00, 0x00, 0xff)),
    (ColorBasic::BrightMagenta, (0xff, 0x00, 0xff)),
    (ColorBasic::BrightCyan, (0x00, 0xff, 0xff)),
    (ColorBasic::BrightWhite, (0xff, 0xff, 0xff)),
];
