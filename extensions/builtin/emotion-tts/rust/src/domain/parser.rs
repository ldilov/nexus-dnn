//! Dialogue script parser.
//!
//! Grammar (dialogue mode):
//!
//! ```text
//! LINE       := TAGGED | UNTAGGED | BLANK
//! TAGGED     := "[" CHAR (":" COMPAT_REF)? ("|" OVERRIDE ("|" OVERRIDE)*)? "]" WS TEXT
//! UNTAGGED   := TEXT                 -- attributed to `Narrator`
//! BLANK      := ""                   -- skipped, line-number preserved
//! OVERRIDE   := KEY ":" VALUE
//! KEY        := [a-zA-Z_][a-zA-Z0-9_]*
//! VALUE      := anything up to next `|` or `]`
//! ```
//!
//! See FR-040..046. The parser is pure + deterministic; caller supplies the
//! raw script text and receives a parsed plan plus a structured report.

use std::collections::BTreeMap;

use once_cell::sync::Lazy;
use regex::Regex;
use serde::{Deserialize, Serialize};

pub const NARRATOR: &str = "Narrator";

pub const RESERVED_OVERRIDE_KEYS: &[&str] = &[
    "emotion_vector",
    "emotion_audio_ref",
    "emotion_alpha",
    "emotion_preset",
    "qwen",
    "speed",
    "seed",
    "temperature",
    "top_p",
    "top_k",
    "num_beams",
    "repetition_penalty",
    "length_penalty",
    "max_mel_tokens",
    "interval_silence",
    "do_sample",
];

static TAG_REGEX: Lazy<Regex> =
    Lazy::new(|| Regex::new(r"^\[(?P<body>[^\]]*)\](?P<rest>.*)$").expect("tag regex"));

#[derive(Debug, Clone, Copy, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ParserMode {
    Dialogue,
    RawText,
    AdvancedTagged,
    Story,
}

impl ParserMode {
    #[must_use]
    pub const fn as_str(&self) -> &'static str {
        match self {
            Self::Dialogue => "dialogue",
            Self::RawText => "raw_text",
            Self::AdvancedTagged => "advanced_tagged",
            Self::Story => "story",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ParsedUtterance {
    pub character_display: String,
    pub text: String,
    pub source_line_number: i64,
    pub legacy_emotion_ref: Option<String>,
    pub inline_overrides: BTreeMap<String, String>,
}

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct ParseReport {
    pub total_lines: i64,
    pub tagged_count: i64,
    pub untagged_count: i64,
    pub skipped_blank_lines: Vec<i64>,
    pub warnings: Vec<ParseWarning>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ParseWarning {
    pub line_number: i64,
    pub kind: ParseWarningKind,
    pub detail: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ParseWarningKind {
    UnknownOverrideKey,
    MalformedTag,
    EmptyCharacterName,
    EmptyTextAfterTag,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ParsePlan {
    pub mode: ParserMode,
    pub utterances: Vec<ParsedUtterance>,
    pub report: ParseReport,
}

#[must_use]
pub fn parse_script(script: &str, mode: ParserMode) -> ParsePlan {
    match mode {
        ParserMode::Dialogue | ParserMode::AdvancedTagged => parse_dialogue(script, mode),
        ParserMode::RawText => parse_raw_text(script),
        ParserMode::Story => crate::domain::parser_story::parse_story(script),
    }
}

fn parse_dialogue(script: &str, mode: ParserMode) -> ParsePlan {
    let mut utterances: Vec<ParsedUtterance> = Vec::new();
    let mut report = ParseReport::default();

    for (idx, raw_line) in script.lines().enumerate() {
        let line_number = (idx + 1) as i64;
        report.total_lines = line_number;

        let trimmed = raw_line.trim();
        if trimmed.is_empty() {
            report.skipped_blank_lines.push(line_number);
            continue;
        }

        if let Some(parsed) = try_parse_tagged(trimmed, line_number, &mut report) {
            report.tagged_count += 1;
            utterances.push(parsed);
        } else {
            report.untagged_count += 1;
            utterances.push(ParsedUtterance {
                character_display: NARRATOR.to_string(),
                text: trimmed.to_string(),
                source_line_number: line_number,
                legacy_emotion_ref: None,
                inline_overrides: BTreeMap::new(),
            });
        }
    }

    ParsePlan {
        mode,
        utterances,
        report,
    }
}

fn parse_raw_text(script: &str) -> ParsePlan {
    let mut utterances = Vec::new();
    let mut report = ParseReport::default();
    for (idx, line) in script.lines().enumerate() {
        let line_number = (idx + 1) as i64;
        report.total_lines = line_number;
        let trimmed = line.trim();
        if trimmed.is_empty() {
            report.skipped_blank_lines.push(line_number);
            continue;
        }
        report.untagged_count += 1;
        utterances.push(ParsedUtterance {
            character_display: NARRATOR.to_string(),
            text: trimmed.to_string(),
            source_line_number: line_number,
            legacy_emotion_ref: None,
            inline_overrides: BTreeMap::new(),
        });
    }
    ParsePlan {
        mode: ParserMode::RawText,
        utterances,
        report,
    }
}

fn try_parse_tagged(
    line: &str,
    line_number: i64,
    report: &mut ParseReport,
) -> Option<ParsedUtterance> {
    let caps = TAG_REGEX.captures(line)?;
    let body = caps.name("body")?.as_str().trim();
    let rest = caps.name("rest")?.as_str().trim();

    if body.is_empty() {
        report.warnings.push(ParseWarning {
            line_number,
            kind: ParseWarningKind::EmptyCharacterName,
            detail: "empty `[]` tag".to_string(),
        });
        return None;
    }

    let (char_section, override_section) = match body.split_once('|') {
        Some((c, o)) => (c.trim(), Some(o.trim())),
        None => (body, None),
    };

    let (character_display, legacy_emotion_ref) = match char_section.split_once(':') {
        Some((c, tok)) => (c.trim().to_string(), Some(tok.trim().to_string())),
        None => (char_section.to_string(), None),
    };

    if character_display.is_empty() {
        report.warnings.push(ParseWarning {
            line_number,
            kind: ParseWarningKind::EmptyCharacterName,
            detail: "character name empty before `:` or `|`".to_string(),
        });
        return None;
    }

    let inline_overrides = parse_overrides(override_section, line_number, report);

    if rest.is_empty() {
        report.warnings.push(ParseWarning {
            line_number,
            kind: ParseWarningKind::EmptyTextAfterTag,
            detail: format!("tag for '{character_display}' has no text"),
        });
    }

    Some(ParsedUtterance {
        character_display,
        text: rest.to_string(),
        source_line_number: line_number,
        legacy_emotion_ref,
        inline_overrides,
    })
}

fn parse_overrides(
    section: Option<&str>,
    line_number: i64,
    report: &mut ParseReport,
) -> BTreeMap<String, String> {
    let Some(section) = section else {
        return BTreeMap::new();
    };

    let mut out = BTreeMap::new();
    for raw in section.split('|').map(str::trim).filter(|s| !s.is_empty()) {
        let Some((key, value)) = raw.split_once(':') else {
            report.warnings.push(ParseWarning {
                line_number,
                kind: ParseWarningKind::MalformedTag,
                detail: format!("override '{raw}' missing ':'"),
            });
            continue;
        };
        let key = key.trim().to_string();
        let value = value.trim().to_string();
        if !RESERVED_OVERRIDE_KEYS.contains(&key.as_str()) {
            report.warnings.push(ParseWarning {
                line_number,
                kind: ParseWarningKind::UnknownOverrideKey,
                detail: format!("unknown override key '{key}'"),
            });
            continue;
        }
        out.insert(key, value);
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_basic_tagged_line() {
        let plan = parse_script("[Bob] Hello there", ParserMode::Dialogue);
        assert_eq!(plan.utterances.len(), 1);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "Bob");
        assert_eq!(u.text, "Hello there");
        assert_eq!(u.source_line_number, 1);
        assert!(u.legacy_emotion_ref.is_none());
        assert!(u.inline_overrides.is_empty());
    }

    #[test]
    fn parses_compat_emotion_ref() {
        let plan = parse_script("[Alice:happy_sarah] I'm excited", ParserMode::Dialogue);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "Alice");
        assert_eq!(u.legacy_emotion_ref.as_deref(), Some("happy_sarah"));
        assert_eq!(u.text, "I'm excited");
    }

    #[test]
    fn parses_pipe_overrides() {
        let plan = parse_script(
            "[Bob|speed:1.1|seed:42|temperature:0.7] Testing",
            ParserMode::Dialogue,
        );
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "Bob");
        assert_eq!(u.inline_overrides.get("speed"), Some(&"1.1".to_string()));
        assert_eq!(u.inline_overrides.get("seed"), Some(&"42".to_string()));
        assert_eq!(
            u.inline_overrides.get("temperature"),
            Some(&"0.7".to_string())
        );
    }

    #[test]
    fn untagged_line_becomes_narrator() {
        let plan = parse_script("Just some narration", ParserMode::Dialogue);
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, NARRATOR);
        assert_eq!(plan.report.untagged_count, 1);
    }

    #[test]
    fn blank_lines_are_skipped_but_counted() {
        let plan = parse_script("[Bob] a\n\n[Alice] b\n\n", ParserMode::Dialogue);
        assert_eq!(plan.utterances.len(), 2);
        assert_eq!(plan.utterances[0].source_line_number, 1);
        assert_eq!(plan.utterances[1].source_line_number, 3);
        assert_eq!(plan.report.skipped_blank_lines, vec![2, 4]);
    }

    #[test]
    fn unknown_override_key_warns_and_drops() {
        let plan = parse_script("[Bob|unknown:5] hi", ParserMode::Dialogue);
        let u = &plan.utterances[0];
        assert!(u.inline_overrides.get("unknown").is_none());
        assert_eq!(plan.report.warnings.len(), 1);
        assert!(matches!(
            plan.report.warnings[0].kind,
            ParseWarningKind::UnknownOverrideKey
        ));
    }

    #[test]
    fn malformed_override_missing_colon_warns() {
        let plan = parse_script("[Bob|speed1.1] hi", ParserMode::Dialogue);
        assert_eq!(plan.report.warnings.len(), 1);
        assert!(matches!(
            plan.report.warnings[0].kind,
            ParseWarningKind::MalformedTag
        ));
    }

    #[test]
    fn empty_character_name_warns() {
        let plan = parse_script("[] just text", ParserMode::Dialogue);
        assert_eq!(plan.report.warnings.len(), 1);
        assert!(matches!(
            plan.report.warnings[0].kind,
            ParseWarningKind::EmptyCharacterName
        ));
        assert_eq!(plan.utterances[0].character_display, NARRATOR);
    }

    #[test]
    fn empty_text_after_tag_warns() {
        let plan = parse_script("[Bob]   ", ParserMode::Dialogue);
        assert_eq!(plan.report.warnings.len(), 1);
        assert!(matches!(
            plan.report.warnings[0].kind,
            ParseWarningKind::EmptyTextAfterTag
        ));
    }

    #[test]
    fn raw_text_mode_attributes_all_to_narrator() {
        let plan = parse_script("[Bob] hello\nworld", ParserMode::RawText);
        assert_eq!(plan.utterances.len(), 2);
        assert!(plan
            .utterances
            .iter()
            .all(|u| u.character_display == NARRATOR));
    }

    #[test]
    fn unicode_character_names_preserved() {
        let plan = parse_script("[佐藤] こんにちは", ParserMode::Dialogue);
        assert_eq!(plan.utterances[0].character_display, "佐藤");
        assert_eq!(plan.utterances[0].text, "こんにちは");
    }

    #[test]
    fn whitespace_around_tag_tolerated() {
        let plan = parse_script("[ Bob | speed : 1.1 ]   hi   ", ParserMode::Dialogue);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "Bob");
        assert_eq!(u.inline_overrides.get("speed"), Some(&"1.1".to_string()));
        assert_eq!(u.text, "hi");
    }

    #[test]
    fn inline_emotion_vector_override_preserved_verbatim() {
        let plan = parse_script(
            "[Bob|emotion_vector:happy=0.7,surprised=0.2] Hi",
            ParserMode::Dialogue,
        );
        let u = &plan.utterances[0];
        assert_eq!(
            u.inline_overrides.get("emotion_vector"),
            Some(&"happy=0.7,surprised=0.2".to_string())
        );
        assert!(plan.report.warnings.is_empty());
    }

    #[test]
    fn inline_emotion_alpha_override_preserved() {
        let plan = parse_script(
            "[Bob|emotion_vector:happy=0.7|emotion_alpha:0.5] Hi",
            ParserMode::Dialogue,
        );
        let u = &plan.utterances[0];
        assert_eq!(
            u.inline_overrides.get("emotion_alpha"),
            Some(&"0.5".to_string())
        );
        assert!(plan.report.warnings.is_empty());
    }

    #[test]
    fn inline_qwen_template_override_preserved() {
        let plan = parse_script(
            "[Alice|qwen:Friendly teen voice] hello world",
            ParserMode::Dialogue,
        );
        let u = &plan.utterances[0];
        assert_eq!(
            u.inline_overrides.get("qwen"),
            Some(&"Friendly teen voice".to_string())
        );
    }

    #[test]
    fn multi_line_dialogue_report_counts() {
        let plan = parse_script(
            "[Bob] one\n[Alice] two\nuntagged three\n",
            ParserMode::Dialogue,
        );
        assert_eq!(plan.report.total_lines, 3);
        assert_eq!(plan.report.tagged_count, 2);
        assert_eq!(plan.report.untagged_count, 1);
    }
}
