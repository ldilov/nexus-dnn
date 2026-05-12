use crate::repl::ansi::{ColorDepth, PaletteColor};

pub fn interpolate(start: PaletteColor, end: PaletteColor, t: f32) -> (u8, u8, u8) {
    let t = t.clamp(0.0, 1.0);
    let (r1, g1, b1) = start.truecolor;
    let (r2, g2, b2) = end.truecolor;
    (
        interp_channel(r1, r2, t),
        interp_channel(g1, g2, t),
        interp_channel(b1, b2, t),
    )
}

fn interp_channel(a: u8, b: u8, t: f32) -> u8 {
    let result = a as f32 + (b as f32 - a as f32) * t;
    result.round().clamp(0.0, 255.0) as u8
}

pub fn ansi_rgb(rgb: (u8, u8, u8)) -> String {
    let (r, g, b) = rgb;
    format!("\x1b[38;2;{r};{g};{b}m")
}

pub fn supports_truecolor_gradient(depth: ColorDepth) -> bool {
    matches!(depth, ColorDepth::Truecolor)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::repl::ansi::ColorBasic;

    fn rgb_palette(rgb: (u8, u8, u8)) -> PaletteColor {
        PaletteColor::new(rgb, 0, ColorBasic::White)
    }

    #[test]
    fn interpolate_at_zero_returns_start() {
        let start = rgb_palette((10, 20, 30));
        let end = rgb_palette((200, 100, 50));
        assert_eq!(interpolate(start, end, 0.0), (10, 20, 30));
    }

    #[test]
    fn interpolate_at_one_returns_end() {
        let start = rgb_palette((10, 20, 30));
        let end = rgb_palette((200, 100, 50));
        assert_eq!(interpolate(start, end, 1.0), (200, 100, 50));
    }

    #[test]
    fn interpolate_midpoint_is_average() {
        let start = rgb_palette((0, 0, 0));
        let end = rgb_palette((100, 200, 50));
        let mid = interpolate(start, end, 0.5);
        assert_eq!(mid, (50, 100, 25));
    }

    #[test]
    fn interpolate_clamps_t_to_unit_interval() {
        let start = rgb_palette((10, 20, 30));
        let end = rgb_palette((200, 100, 50));
        assert_eq!(interpolate(start, end, -1.0), (10, 20, 30));
        assert_eq!(interpolate(start, end, 5.0), (200, 100, 50));
    }

    #[test]
    fn ansi_rgb_emits_truecolor_sgr() {
        assert_eq!(ansi_rgb((255, 0, 128)), "\x1b[38;2;255;0;128m");
    }

    #[test]
    fn supports_truecolor_gradient_only_for_truecolor_depth() {
        assert!(supports_truecolor_gradient(ColorDepth::Truecolor));
        assert!(!supports_truecolor_gradient(ColorDepth::Color256));
        assert!(!supports_truecolor_gradient(ColorDepth::Color16));
        assert!(!supports_truecolor_gradient(ColorDepth::NoColor));
    }
}
