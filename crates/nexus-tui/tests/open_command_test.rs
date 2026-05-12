//! T110 — `/open` command parsing.

use nexus_tui::repl::slash::{ParseError, ParsedCommand, parse_slash};

#[test]
fn parses_open_with_relative_path() {
    let cmd = parse_slash("/open deployments/foo").unwrap();
    assert!(matches!(cmd, ParsedCommand::Open(s) if s == "deployments/foo"));
}

#[test]
fn parses_open_with_extensions_path() {
    let cmd = parse_slash("/open extensions/bar").unwrap();
    assert!(matches!(cmd, ParsedCommand::Open(s) if s == "extensions/bar"));
}

#[test]
fn parses_open_with_top_level_route() {
    let cmd = parse_slash("/open models-search").unwrap();
    assert!(matches!(cmd, ParsedCommand::Open(s) if s == "models-search"));
}

#[test]
fn parses_open_backends_route() {
    let cmd = parse_slash("/open backends").unwrap();
    assert!(matches!(cmd, ParsedCommand::Open(s) if s == "backends"));
}

#[test]
fn parses_open_free_path_with_query() {
    let cmd = parse_slash("/open settings?tab=advanced").unwrap();
    assert!(matches!(cmd, ParsedCommand::Open(s) if s == "settings?tab=advanced"));
}

#[test]
fn open_without_arg_is_missing_argument_error() {
    let err = parse_slash("/open").unwrap_err();
    assert!(matches!(
        err,
        ParseError::MissingArgument { command: "open" }
    ));
}

#[test]
fn osc8_hyperlink_wraps_label_with_url() {
    let wrapped = nexus_tui::repl::ansi::osc8_hyperlink("http://example.com/foo", "click me");
    assert!(wrapped.contains("http://example.com/foo"));
    assert!(wrapped.contains("click me"));
    assert!(wrapped.starts_with('\u{1b}'));
}
