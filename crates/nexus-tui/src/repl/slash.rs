//! Slash command parsing.
//!
//! `/level <level>`        — set severity floor
//! `/grep <regex>`         — display-grep summary
//! `/source <glob>`        — source-glob filter
//! `/clear-filter`         — drop all filters
//! `/pause` / `/resume`    — toggle ambient display
//! `/follow <kind>:<id>`   — narrow to a single run/deploy/extension
//! `/where`                — host context summary
//! `/help`                 — slash menu
//! `/quit`                 — clean exit
//!
//! Returns `ParsedCommand` on success, `ParseError` on shape mismatch.

use crate::stream::filter::FollowTarget;
use crate::stream::severity::Severity;

#[derive(Debug, Clone)]
pub enum ParsedCommand {
    Level(Severity),
    Grep(String),
    Source(String),
    ClearFilter,
    Pause,
    Resume,
    Follow(FollowTarget),
    Where,
    Help,
    Quit,
    Inspect(String),
    Last { count: usize, level: Severity },
    Snapshot(String),
    Open(String),
}

#[derive(Debug, thiserror::Error)]
pub enum ParseError {
    #[error("not a slash command")]
    NotASlashCommand,
    #[error("unknown slash command: {0}")]
    UnknownCommand(String),
    #[error("missing argument for {command}")]
    MissingArgument { command: &'static str },
    #[error("invalid argument for {command}: {reason}")]
    InvalidArgument {
        command: &'static str,
        reason: String,
    },
}

pub fn parse_slash(input: &str) -> Result<ParsedCommand, ParseError> {
    let trimmed = input.trim();
    let rest = trimmed
        .strip_prefix('/')
        .ok_or(ParseError::NotASlashCommand)?;
    let mut parts = rest.splitn(2, char::is_whitespace);
    let head = parts.next().unwrap_or_default();
    let arg = parts.next().map(str::trim).filter(|s| !s.is_empty());
    match head {
        "level" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "level" })?;
            let level: Severity = arg.parse().map_err(|_| ParseError::InvalidArgument {
                command: "level",
                reason: format!("unknown level '{arg}'"),
            })?;
            Ok(ParsedCommand::Level(level))
        }
        "grep" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "grep" })?;
            Ok(ParsedCommand::Grep(arg.to_string()))
        }
        "source" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "source" })?;
            Ok(ParsedCommand::Source(arg.to_string()))
        }
        "clear-filter" => Ok(ParsedCommand::ClearFilter),
        "pause" => Ok(ParsedCommand::Pause),
        "resume" => Ok(ParsedCommand::Resume),
        "follow" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "follow" })?;
            let (kind, id) = arg.split_once(':').ok_or(ParseError::InvalidArgument {
                command: "follow",
                reason: "expected kind:id (run|deploy|extension)".into(),
            })?;
            let target = match kind {
                "run" => FollowTarget::Run(id.to_string()),
                "deploy" | "deployment" => FollowTarget::Deploy(id.to_string()),
                "extension" | "ext" => FollowTarget::Extension(id.to_string()),
                other => {
                    return Err(ParseError::InvalidArgument {
                        command: "follow",
                        reason: format!("unknown kind '{other}'"),
                    });
                }
            };
            Ok(ParsedCommand::Follow(target))
        }
        "where" => Ok(ParsedCommand::Where),
        "help" => Ok(ParsedCommand::Help),
        "quit" => Ok(ParsedCommand::Quit),
        "inspect" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "inspect" })?;
            Ok(ParsedCommand::Inspect(arg.to_string()))
        }
        "last" => {
            let mut count = 1usize;
            let mut level = Severity::Info;
            if let Some(arg) = arg {
                for token in arg.split_whitespace() {
                    if let Ok(parsed_level) = token.parse::<Severity>() {
                        level = parsed_level;
                    } else if let Ok(parsed_count) = token.parse::<usize>() {
                        count = parsed_count.max(1);
                    } else {
                        return Err(ParseError::InvalidArgument {
                            command: "last",
                            reason: format!("expected count or level, got '{token}'"),
                        });
                    }
                }
            }
            Ok(ParsedCommand::Last { count, level })
        }
        "snapshot" => {
            let arg = arg.ok_or(ParseError::MissingArgument {
                command: "snapshot",
            })?;
            Ok(ParsedCommand::Snapshot(arg.to_string()))
        }
        "open" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "open" })?;
            Ok(ParsedCommand::Open(arg.to_string()))
        }
        other => Err(ParseError::UnknownCommand(other.to_string())),
    }
}

pub fn slash_command_names() -> &'static [&'static str] {
    &[
        "level",
        "grep",
        "source",
        "clear-filter",
        "pause",
        "resume",
        "follow",
        "where",
        "help",
        "quit",
        "inspect",
        "last",
        "snapshot",
        "open",
    ]
}

pub fn level_argument_values() -> &'static [&'static str] {
    &["debug", "info", "warn", "error", "fatal"]
}
