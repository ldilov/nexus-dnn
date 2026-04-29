//! Deterministic filename generator + sanitiser.
//!
//! Pattern: `{global_index:03}_{character_sanitised}_{character_index:03}.{ext}`.
//! Unicode display names survive separately in the manifest; the on-disk
//! name is ASCII-only and stripped of reserved characters for
//! cross-platform ZIP portability.

use once_cell::sync::Lazy;
use regex::Regex;
use serde::{Deserialize, Serialize};

static UNSAFE_CHARS: Lazy<Regex> =
    Lazy::new(|| Regex::new(r#"[^A-Za-z0-9._-]"#).expect("unsafe chars regex"));

pub const NARRATOR_SANITISED: &str = "Narrator";
pub const MAX_SANITISED_LEN: usize = 48;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct PredictedFilename {
    pub global_index: i64,
    pub character_display: String,
    pub character_sanitised: String,
    pub character_index: i64,
    pub extension: String,
    pub filename: String,
}

#[must_use]
pub fn sanitise_character_name(display: &str) -> String {
    let trimmed = display.trim();
    if trimmed.is_empty() {
        return NARRATOR_SANITISED.to_string();
    }

    let replaced = UNSAFE_CHARS.replace_all(trimmed, "_").to_string();
    let collapsed = collapse_underscores(&replaced);
    let stripped = collapsed
        .trim_matches(|c: char| c == '_' || c == '.' || c == '-')
        .to_string();

    let base = if stripped.is_empty() {
        NARRATOR_SANITISED.to_string()
    } else {
        stripped
    };

    if base.len() > MAX_SANITISED_LEN {
        base.chars().take(MAX_SANITISED_LEN).collect()
    } else {
        base
    }
}

fn collapse_underscores(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    let mut last_underscore = false;
    for c in s.chars() {
        if c == '_' {
            if !last_underscore {
                out.push('_');
            }
            last_underscore = true;
        } else {
            out.push(c);
            last_underscore = false;
        }
    }
    out
}

#[must_use]
pub fn build_filename(
    global_index: i64,
    character_display: &str,
    character_index: i64,
    extension: &str,
) -> PredictedFilename {
    let sanitised = sanitise_character_name(character_display);
    let ext = extension.trim_start_matches('.').to_lowercase();
    let filename = format!("{global_index:03}_{sanitised}_{character_index:03}.{ext}");
    PredictedFilename {
        global_index,
        character_display: character_display.to_string(),
        character_sanitised: sanitised,
        character_index,
        extension: ext,
        filename,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn basic_ascii_name() {
        let p = build_filename(1, "Bob", 1, "mp3");
        assert_eq!(p.filename, "001_Bob_001.mp3");
    }

    #[test]
    fn pads_indexes() {
        let p = build_filename(42, "Alice", 7, "wav");
        assert_eq!(p.filename, "042_Alice_007.wav");
        let p = build_filename(999, "Alice", 999, "flac");
        assert_eq!(p.filename, "999_Alice_999.flac");
    }

    #[test]
    fn sanitises_unsafe_chars() {
        let p = build_filename(1, "Bob/Alice (v2)", 1, "mp3");
        assert_eq!(p.character_sanitised, "Bob_Alice_v2");
        assert!(!p.filename.contains('/'));
    }

    #[test]
    fn unicode_display_preserved_but_sanitised_ascii() {
        let p = build_filename(1, "佐藤", 1, "mp3");
        assert_eq!(p.character_display, "佐藤");
        assert_eq!(p.character_sanitised, NARRATOR_SANITISED);
    }

    #[test]
    fn empty_name_falls_back_to_narrator() {
        let p = build_filename(1, "", 1, "mp3");
        assert_eq!(p.character_sanitised, NARRATOR_SANITISED);
    }

    #[test]
    fn whitespace_only_name_falls_back_to_narrator() {
        let p = build_filename(1, "   ", 1, "mp3");
        assert_eq!(p.character_sanitised, NARRATOR_SANITISED);
    }

    #[test]
    fn multiple_underscores_collapse() {
        assert_eq!(sanitise_character_name("a b  c"), "a_b_c");
    }

    #[test]
    fn truncates_long_names() {
        let long = "X".repeat(100);
        let s = sanitise_character_name(&long);
        assert_eq!(s.len(), MAX_SANITISED_LEN);
    }

    #[test]
    fn extension_normalised() {
        let p = build_filename(1, "Bob", 1, ".MP3");
        assert_eq!(p.extension, "mp3");
        assert_eq!(p.filename, "001_Bob_001.mp3");
    }

    #[test]
    fn leading_trailing_separators_stripped() {
        assert_eq!(sanitise_character_name("_Bob_"), "Bob");
        assert_eq!(sanitise_character_name("..Bob.."), "Bob");
    }

    #[test]
    fn numbers_preserved() {
        let p = build_filename(1, "Agent47", 1, "mp3");
        assert_eq!(p.character_sanitised, "Agent47");
    }

    #[test]
    fn collision_resistance_within_deterministic_scheme() {
        let a = build_filename(1, "Bob", 1, "mp3");
        let b = build_filename(1, "Bob", 2, "mp3");
        assert_ne!(a.filename, b.filename);
    }
}
