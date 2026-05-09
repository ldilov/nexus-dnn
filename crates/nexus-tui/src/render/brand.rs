//! BrandMark banner — block-art "N" with violet → periwinkle gradient
//! and a single tertiary-orange dot.
//!
//! Rendered once at startup. Truecolor draws the gradient; 256-color
//! collapses to a single primary shade per glyph; 16-color uses the
//! palette's base color flat.

use crossterm::style::{ResetColor, SetForegroundColor};

use crate::repl::ansi::{
    ColorDepth, PaletteColor, SPECTRAL_PRIMARY, SPECTRAL_SECONDARY, SPECTRAL_TERTIARY, render_color,
};

const ROWS: [&str; 5] = [
    "█▄    █  ███████  ▀▄    ▄▀  █     █  ███████",
    "█ █   █  █          ▀▄▄▀    █     █  █      ",
    "█  █  █  █████       ▄▀▀▄   █     █  ███████",
    "█   █ █  █         ▄▀    ▀▄ █     █        █",
    "█    ██  ███████  ▄▀      ▀▄ █████   ███████",
];

const TAGLINE: &str = "  streaming console — spec 044";

pub fn render_brand(depth: ColorDepth) -> String {
    let mut out = String::new();
    let total_rows = ROWS.len() as f32 - 1.0;
    for (i, row) in ROWS.iter().enumerate() {
        let t = i as f32 / total_rows;
        let palette = gradient_at(t, depth);
        out.push_str(&format!(
            "  {}{row}{}\n",
            SetForegroundColor(render_color(palette, depth)),
            ResetColor
        ));
    }
    out.push_str(&format!(
        "  {}●{} {}{TAGLINE}{}\n",
        SetForegroundColor(render_color(SPECTRAL_TERTIARY, depth)),
        ResetColor,
        SetForegroundColor(render_color(SPECTRAL_SECONDARY, depth)),
        ResetColor,
    ));
    out
}

fn gradient_at(t: f32, depth: ColorDepth) -> PaletteColor {
    match depth {
        ColorDepth::Truecolor => {
            let (r1, g1, b1) = SPECTRAL_PRIMARY.truecolor;
            let (r2, g2, b2) = SPECTRAL_SECONDARY.truecolor;
            PaletteColor {
                truecolor: (interp(r1, r2, t), interp(g1, g2, t), interp(b1, b2, t)),
                color256: SPECTRAL_PRIMARY.color256,
                color16: SPECTRAL_PRIMARY.color16,
            }
        }
        ColorDepth::Color256 => SPECTRAL_PRIMARY,
        ColorDepth::Color16 => SPECTRAL_PRIMARY,
    }
}

fn interp(a: u8, b: u8, t: f32) -> u8 {
    let result = a as f32 + (b as f32 - a as f32) * t.clamp(0.0, 1.0);
    result.round().clamp(0.0, 255.0) as u8
}
