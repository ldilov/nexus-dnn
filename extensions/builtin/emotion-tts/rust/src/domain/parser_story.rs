use std::collections::BTreeMap;

use crate::domain::parser::{ParsePlan, ParseReport, ParsedUtterance, ParserMode, NARRATOR};

#[derive(Debug, Clone)]
struct CharacterName(String);

impl CharacterName {
    fn new(raw: String) -> Option<Self> {
        if raw.is_empty() {
            None
        } else {
            Some(Self(raw))
        }
    }

    fn into_inner(self) -> String {
        self.0
    }
}

#[derive(Debug, PartialEq)]
enum Token {
    Character { name: CharacterName, line: i64 },
    Emotion { name: String, line: i64 },
    Text { value: String, line: i64 },
}

impl PartialEq for CharacterName {
    fn eq(&self, other: &Self) -> bool {
        self.0 == other.0
    }
}

#[must_use]
pub fn parse_story(script: &str) -> ParsePlan {
    let tokens = tokenise(script);
    walk(tokens, script)
}

fn tokenise(script: &str) -> Vec<Token> {
    let mut tokens: Vec<Token> = Vec::new();
    let mut buffer = String::new();
    let mut buffer_start_line: i64 = 1;
    let mut current_line: i64 = 1;
    let bytes = script.as_bytes();
    let chars: Vec<(usize, char)> = script.char_indices().collect();
    let mut i = 0usize;

    let flush = |buffer: &mut String, start_line: i64, tokens: &mut Vec<Token>| {
        if !buffer.is_empty() {
            tokens.push(Token::Text {
                value: std::mem::take(buffer),
                line: start_line,
            });
        }
    };

    while i < chars.len() {
        let (byte_idx, ch) = chars[i];
        if ch == '\n' {
            buffer.push(ch);
            current_line += 1;
            i += 1;
            continue;
        }

        let trigger = ch == '@' || ch == '/';
        let preceded_by_separator = byte_idx == 0
            || matches!(
                bytes.get(byte_idx.saturating_sub(1)).copied(),
                Some(b' ' | b'\t' | b'\n' | b'\r')
            );

        if trigger && preceded_by_separator {
            let mut j = i + 1;
            let mut name = String::new();
            while j < chars.len() {
                let (_, nc) = chars[j];
                if is_name_char(nc) {
                    name.push(nc);
                    j += 1;
                } else {
                    break;
                }
            }
            if let Some(name_value) = CharacterName::new(name) {
                flush(&mut buffer, buffer_start_line, &mut tokens);
                buffer_start_line = current_line;
                if ch == '@' {
                    tokens.push(Token::Character {
                        name: name_value,
                        line: current_line,
                    });
                } else {
                    tokens.push(Token::Emotion {
                        name: name_value.into_inner(),
                        line: current_line,
                    });
                }
                i = j;
                continue;
            }
        }

        buffer.push(ch);
        i += 1;
    }

    flush(&mut buffer, buffer_start_line, &mut tokens);
    tokens
}

fn is_name_char(ch: char) -> bool {
    ch.is_alphanumeric() || ch == '_' || ch == '-'
}

fn walk(tokens: Vec<Token>, script: &str) -> ParsePlan {
    let mut report = ParseReport::default();
    report.total_lines = script.lines().count().max(1) as i64;
    if script.is_empty() {
        report.total_lines = 0;
    }

    let mut utterances: Vec<ParsedUtterance> = Vec::new();
    let mut current_character: Option<CharacterName> = None;
    let mut current_emotion: Option<String> = None;
    let mut buffer = String::new();
    let mut buffer_line: i64 = 1;

    for token in tokens {
        match token {
            Token::Character { name, line } => {
                emit(
                    &mut utterances,
                    &mut buffer,
                    buffer_line,
                    current_character.as_ref(),
                    &current_emotion,
                );
                current_character = Some(name);
                current_emotion = None;
                buffer_line = line;
            }
            Token::Emotion { name, line } => {
                emit(
                    &mut utterances,
                    &mut buffer,
                    buffer_line,
                    current_character.as_ref(),
                    &current_emotion,
                );
                current_emotion = Some(name);
                buffer_line = line;
            }
            Token::Text { value, line } => {
                if buffer.is_empty() {
                    buffer_line = line;
                }
                buffer.push_str(&value);
            }
        }
    }

    emit(
        &mut utterances,
        &mut buffer,
        buffer_line,
        current_character.as_ref(),
        &current_emotion,
    );

    report.tagged_count = utterances
        .iter()
        .filter(|u| u.character_display != NARRATOR)
        .count() as i64;
    report.untagged_count = utterances
        .iter()
        .filter(|u| u.character_display == NARRATOR)
        .count() as i64;

    ParsePlan {
        mode: ParserMode::Story,
        utterances,
        report,
    }
}

fn emit(
    utterances: &mut Vec<ParsedUtterance>,
    buffer: &mut String,
    line: i64,
    character: Option<&CharacterName>,
    emotion: &Option<String>,
) {
    let raw = std::mem::take(buffer);
    let normalised = normalise_text(&raw);
    if normalised.is_empty() {
        return;
    }

    let display = character.map_or_else(|| NARRATOR.to_string(), |c| c.0.clone());

    let mut overrides: BTreeMap<String, String> = BTreeMap::new();
    if let Some(emotion_name) = emotion.as_deref() {
        overrides.insert("emotion_preset".to_string(), emotion_name.to_string());
    }

    utterances.push(ParsedUtterance {
        character_display: display,
        text: normalised,
        source_line_number: line,
        legacy_emotion_ref: None,
        inline_overrides: overrides,
    });
}

fn normalise_text(raw: &str) -> String {
    let mut out = String::with_capacity(raw.len());
    let mut prev_space = true;
    for ch in raw.chars() {
        if ch.is_whitespace() {
            if !prev_space {
                out.push(' ');
                prev_space = true;
            }
        } else {
            out.push(ch);
            prev_space = false;
        }
    }
    if out.ends_with(' ') {
        out.pop();
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    fn parse(s: &str) -> ParsePlan {
        parse_story(s)
    }

    #[test]
    fn single_character_single_line() {
        let plan = parse("@bob hello world");
        assert_eq!(plan.utterances.len(), 1);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "bob");
        assert_eq!(u.text, "hello world");
        assert!(u.inline_overrides.is_empty());
    }

    #[test]
    fn character_then_emotion_then_text() {
        let plan = parse("@bob /happy hi there");
        assert_eq!(plan.utterances.len(), 1);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "bob");
        assert_eq!(
            u.inline_overrides.get("emotion_preset"),
            Some(&"happy".to_string())
        );
        assert_eq!(u.text, "hi there");
    }

    #[test]
    fn newlines_do_not_split_utterances() {
        let plan = parse("@bob hello\nworld\nstill bob");
        assert_eq!(plan.utterances.len(), 1);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "bob");
        assert_eq!(u.text, "hello world still bob");
    }

    #[test]
    fn character_change_resets_emotion() {
        let plan = parse("@bob /happy hi @alice there");
        assert_eq!(plan.utterances.len(), 2);
        assert_eq!(plan.utterances[0].character_display, "bob");
        assert_eq!(
            plan.utterances[0].inline_overrides.get("emotion_preset"),
            Some(&"happy".to_string())
        );
        assert_eq!(plan.utterances[1].character_display, "alice");
        assert!(plan.utterances[1]
            .inline_overrides
            .get("emotion_preset")
            .is_none());
    }

    #[test]
    fn emotion_change_splits_utterance_same_character() {
        let plan = parse("@bob /happy hi /sad oh no");
        assert_eq!(plan.utterances.len(), 2);
        assert_eq!(plan.utterances[0].character_display, "bob");
        assert_eq!(plan.utterances[0].text, "hi");
        assert_eq!(
            plan.utterances[0].inline_overrides.get("emotion_preset"),
            Some(&"happy".to_string())
        );
        assert_eq!(plan.utterances[1].character_display, "bob");
        assert_eq!(plan.utterances[1].text, "oh no");
        assert_eq!(
            plan.utterances[1].inline_overrides.get("emotion_preset"),
            Some(&"sad".to_string())
        );
    }

    #[test]
    fn text_before_first_character_is_narrator() {
        let plan = parse("once upon a time @bob hello");
        assert_eq!(plan.utterances.len(), 2);
        assert_eq!(plan.utterances[0].character_display, NARRATOR);
        assert_eq!(plan.utterances[0].text, "once upon a time");
        assert_eq!(plan.utterances[1].character_display, "bob");
    }

    #[test]
    fn empty_utterance_silently_dropped() {
        let plan = parse("@bob @alice hi");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, "alice");
        assert_eq!(plan.utterances[0].text, "hi");
    }

    #[test]
    fn email_in_text_not_treated_as_character() {
        let plan = parse("@bob email me at bob@example.com please");
        assert_eq!(plan.utterances.len(), 1);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "bob");
        assert_eq!(u.text, "email me at bob@example.com please");
    }

    #[test]
    fn slash_inside_text_not_treated_as_emotion() {
        let plan = parse("@bob 1/2 of the time");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].text, "1/2 of the time");
    }

    #[test]
    fn slash_with_no_name_is_text() {
        let plan = parse("@bob a / b");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].text, "a / b");
    }

    #[test]
    fn emotion_before_any_character_attaches_to_narrator() {
        let plan = parse("/happy nobody yet");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, NARRATOR);
        assert_eq!(
            plan.utterances[0].inline_overrides.get("emotion_preset"),
            Some(&"happy".to_string())
        );
        assert_eq!(plan.utterances[0].text, "nobody yet");
    }

    #[test]
    fn unicode_character_name() {
        let plan = parse("@佐藤 こんにちは");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, "佐藤");
        assert_eq!(plan.utterances[0].text, "こんにちは");
    }

    #[test]
    fn hyphen_and_underscore_in_names() {
        let plan = parse("@bob-the-builder /very-happy can he fix it");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, "bob-the-builder");
        assert_eq!(
            plan.utterances[0].inline_overrides.get("emotion_preset"),
            Some(&"very-happy".to_string())
        );
    }

    #[test]
    fn whitespace_collapsing_inside_text() {
        let plan = parse("@bob   hello   world\n\n\tfine");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].text, "hello world fine");
    }

    #[test]
    fn trailing_command_with_no_text_dropped() {
        let plan = parse("@bob hi @alice");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, "bob");
        assert_eq!(plan.utterances[0].text, "hi");
    }

    #[test]
    fn empty_script_yields_no_utterances() {
        let plan = parse("");
        assert!(plan.utterances.is_empty());
        assert_eq!(plan.report.tagged_count, 0);
        assert_eq!(plan.report.untagged_count, 0);
    }

    #[test]
    fn whitespace_only_script_yields_no_utterances() {
        let plan = parse("   \n\t  \n");
        assert!(plan.utterances.is_empty());
    }

    #[test]
    fn report_counts_tagged_and_untagged() {
        let plan = parse("first @bob hello @alice hi");
        assert_eq!(plan.utterances.len(), 3);
        assert_eq!(plan.report.tagged_count, 2);
        assert_eq!(plan.report.untagged_count, 1);
    }

    #[test]
    fn emotion_resets_on_emotion_command_even_for_narrator() {
        let plan = parse("/happy first /sad second");
        assert_eq!(plan.utterances.len(), 2);
        assert_eq!(plan.utterances[0].character_display, NARRATOR);
        assert_eq!(plan.utterances[0].text, "first");
        assert_eq!(
            plan.utterances[0].inline_overrides.get("emotion_preset"),
            Some(&"happy".to_string())
        );
        assert_eq!(plan.utterances[1].character_display, NARRATOR);
        assert_eq!(plan.utterances[1].text, "second");
        assert_eq!(
            plan.utterances[1].inline_overrides.get("emotion_preset"),
            Some(&"sad".to_string())
        );
    }

    #[test]
    fn at_sign_not_at_word_boundary_is_text() {
        let plan = parse("user@example.com");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, NARRATOR);
        assert_eq!(plan.utterances[0].text, "user@example.com");
    }

    #[test]
    fn leading_whitespace_in_text_buffer_is_swallowed() {
        let plan = parse("@bob   hello world");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].text, "hello world");
    }

    #[test]
    fn at_sign_after_multibyte_char_is_text() {
        let plan = parse("さん@bob hello");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, NARRATOR);
        assert_eq!(plan.utterances[0].text, "さん@bob hello");
    }

    #[test]
    fn complex_dialogue_three_characters_six_utterances() {
        let plan = parse(
            "@narrator Once there were three friends.\n\
             @bob /happy I love mornings!\n\
             @alice /melancholic I prefer evenings.\n\
             @bob /sad oh\n\
             @alice anyway\n\
             @narrator the end",
        );
        assert_eq!(plan.utterances.len(), 6);
        assert_eq!(plan.utterances[0].character_display, "narrator");
        assert_eq!(plan.utterances[0].text, "Once there were three friends.");
        assert_eq!(plan.utterances[1].character_display, "bob");
        assert_eq!(
            plan.utterances[1].inline_overrides.get("emotion_preset"),
            Some(&"happy".to_string())
        );
        assert_eq!(plan.utterances[2].character_display, "alice");
        assert_eq!(
            plan.utterances[2].inline_overrides.get("emotion_preset"),
            Some(&"melancholic".to_string())
        );
        assert_eq!(plan.utterances[3].character_display, "bob");
        assert_eq!(
            plan.utterances[3].inline_overrides.get("emotion_preset"),
            Some(&"sad".to_string())
        );
        assert_eq!(plan.utterances[4].character_display, "alice");
        assert!(plan.utterances[4]
            .inline_overrides
            .get("emotion_preset")
            .is_none());
        assert_eq!(plan.utterances[5].character_display, "narrator");
        assert_eq!(plan.utterances[5].text, "the end");
    }

    #[test]
    fn trailing_emotion_command_at_eof_dropped() {
        let plan = parse("@bob hi /happy");
        assert_eq!(plan.utterances.len(), 1);
        let u = &plan.utterances[0];
        assert_eq!(u.character_display, "bob");
        assert_eq!(u.text, "hi");
        assert!(u.inline_overrides.get("emotion_preset").is_none());
    }

    #[test]
    fn repeated_same_character_command_splits_into_two_utterances() {
        let plan = parse("@bob hello @bob world");
        assert_eq!(plan.utterances.len(), 2);
        assert_eq!(plan.utterances[0].character_display, "bob");
        assert_eq!(plan.utterances[0].text, "hello");
        assert_eq!(plan.utterances[1].character_display, "bob");
        assert_eq!(plan.utterances[1].text, "world");
    }

    #[test]
    fn no_command_between_two_lines_means_one_utterance() {
        let plan = parse("@alice anyway\nthe end");
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, "alice");
        assert_eq!(plan.utterances[0].text, "anyway the end");
    }

    #[test]
    fn parse_script_dispatches_story_mode() {
        use crate::domain::parser::parse_script;
        let plan = parse_script("@bob hi", ParserMode::Story);
        assert_eq!(plan.mode, ParserMode::Story);
        assert_eq!(plan.utterances.len(), 1);
        assert_eq!(plan.utterances[0].character_display, "bob");
    }

    #[test]
    fn parser_mode_story_as_str_round_trip() {
        assert_eq!(ParserMode::Story.as_str(), "story");
    }
}
