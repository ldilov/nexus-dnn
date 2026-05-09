//! T055 — slash command parser.

use nexus_tui::repl::slash::{ParseError, ParsedCommand, parse_slash};

#[test]
fn parses_level_command() {
    let cmd = parse_slash("/level warn").unwrap();
    assert!(matches!(cmd, ParsedCommand::Level(level) if level.as_str() == "warn"));
}

#[test]
fn parses_grep_command_with_regex() {
    let cmd = parse_slash("/grep cuda.*alloc").unwrap();
    assert!(matches!(cmd, ParsedCommand::Grep(p) if p == "cuda.*alloc"));
}

#[test]
fn parses_source_command() {
    let cmd = parse_slash("/source deploy:*").unwrap();
    assert!(matches!(cmd, ParsedCommand::Source(g) if g == "deploy:*"));
}

#[test]
fn parses_pause_resume_help_quit_clear() {
    assert!(matches!(
        parse_slash("/pause").unwrap(),
        ParsedCommand::Pause
    ));
    assert!(matches!(
        parse_slash("/resume").unwrap(),
        ParsedCommand::Resume
    ));
    assert!(matches!(parse_slash("/help").unwrap(), ParsedCommand::Help));
    assert!(matches!(parse_slash("/quit").unwrap(), ParsedCommand::Quit));
    assert!(matches!(
        parse_slash("/clear-filter").unwrap(),
        ParsedCommand::ClearFilter
    ));
    assert!(matches!(
        parse_slash("/where").unwrap(),
        ParsedCommand::Where
    ));
}

#[test]
fn rejects_unknown_command() {
    assert!(matches!(
        parse_slash("/zzz"),
        Err(ParseError::UnknownCommand(_))
    ));
}

#[test]
fn rejects_missing_argument() {
    assert!(matches!(
        parse_slash("/level"),
        Err(ParseError::MissingArgument { .. })
    ));
    assert!(matches!(
        parse_slash("/grep"),
        Err(ParseError::MissingArgument { .. })
    ));
    assert!(matches!(
        parse_slash("/source"),
        Err(ParseError::MissingArgument { .. })
    ));
}

#[test]
fn rejects_invalid_level_argument() {
    assert!(matches!(
        parse_slash("/level extreme"),
        Err(ParseError::InvalidArgument { .. })
    ));
}

#[test]
fn rejects_non_slash_input() {
    assert!(matches!(
        parse_slash("hello"),
        Err(ParseError::NotASlashCommand)
    ));
}

#[test]
fn ignores_leading_and_trailing_whitespace() {
    let cmd = parse_slash("   /pause   ").unwrap();
    assert!(matches!(cmd, ParsedCommand::Pause));
}
