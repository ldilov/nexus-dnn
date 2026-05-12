//! Ambient and inspector gutter glyphs.

pub const AMBIENT_GUTTER: &str = "│";
pub const INSPECTOR_GUTTER: &str = "┃";
pub const GAP_BANNER_PREFIX: &str = "··";

pub fn ambient_gutter() -> &'static str {
    AMBIENT_GUTTER
}

pub fn inspector_gutter() -> &'static str {
    INSPECTOR_GUTTER
}
