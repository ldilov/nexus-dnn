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
    Last {
        count: usize,
        level: Severity,
    },
    Snapshot(String),
    Open(String),
    /// Cluster-A — show held / dropped / per-source backpressure drawer.
    Pressure,
    /// Cluster-A — render a one-shot ring-buffer time histogram.
    Scrub,
    /// Cluster-B — pin a correlation key; pinned events bypass all
    /// filters and render with a coloured pin glyph.
    Pin(String),
    /// Cluster-B — remove a pinned correlation key.
    Unpin(String),
    /// Cluster-B — mute a source label or glob; muted events are
    /// hidden from ambient render but stay in the ring buffer.
    Mute(String),
    /// Cluster-B — remove a muted source pattern.
    Unmute(String),
    /// Cluster-B — show the source-mixer drawer (rate-guard + mute
    /// state + pinned summary).
    Mixer,
    /// Cluster-C — show the brush drawer (selected events + inferred
    /// filter preview).
    Brush,
    /// Cluster-C — add an event id to the brush selection.
    BrushAdd(String),
    /// Cluster-C — empty the brush selection.
    BrushClear,
    /// Cluster-C — apply the inferred filter from the current brush
    /// selection (auto-runs the corresponding /source /level /grep).
    Yank,
    Glossary,
    Verbosity(crate::repl::verbosity::VerbosityLevel),
    VerbosityRaise,
    VerbosityLower,
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
        "clear-filter" | "clear" | "reset" => Ok(ParsedCommand::ClearFilter),
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
        "pressure" => Ok(ParsedCommand::Pressure),
        "scrub" => Ok(ParsedCommand::Scrub),
        "pin" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "pin" })?;
            Ok(ParsedCommand::Pin(arg.to_string()))
        }
        "unpin" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "unpin" })?;
            Ok(ParsedCommand::Unpin(arg.to_string()))
        }
        "mute" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "mute" })?;
            Ok(ParsedCommand::Mute(arg.to_string()))
        }
        "unmute" => {
            let arg = arg.ok_or(ParseError::MissingArgument { command: "unmute" })?;
            Ok(ParsedCommand::Unmute(arg.to_string()))
        }
        "mixer" => Ok(ParsedCommand::Mixer),
        "brush" => Ok(ParsedCommand::Brush),
        "brush-add" => {
            let arg = arg.ok_or(ParseError::MissingArgument {
                command: "brush-add",
            })?;
            Ok(ParsedCommand::BrushAdd(arg.to_string()))
        }
        "brush-clear" => Ok(ParsedCommand::BrushClear),
        "yank" => Ok(ParsedCommand::Yank),
        "glossary" => Ok(ParsedCommand::Glossary),
        "verbosity" => {
            let arg = arg.ok_or(ParseError::MissingArgument {
                command: "verbosity",
            })?;
            match arg {
                "+" | "up" | "raise" => Ok(ParsedCommand::VerbosityRaise),
                "-" | "down" | "lower" => Ok(ParsedCommand::VerbosityLower),
                "silent" => Ok(ParsedCommand::Verbosity(
                    crate::repl::verbosity::VerbosityLevel::Silent,
                )),
                "quiet" => Ok(ParsedCommand::Verbosity(
                    crate::repl::verbosity::VerbosityLevel::Quiet,
                )),
                "default" => Ok(ParsedCommand::Verbosity(
                    crate::repl::verbosity::VerbosityLevel::Default,
                )),
                "verbose" => Ok(ParsedCommand::Verbosity(
                    crate::repl::verbosity::VerbosityLevel::Verbose,
                )),
                "debug" => Ok(ParsedCommand::Verbosity(
                    crate::repl::verbosity::VerbosityLevel::Debug,
                )),
                other => Err(ParseError::InvalidArgument {
                    command: "verbosity",
                    reason: format!(
                        "expected silent|quiet|default|verbose|debug or +/-, got {other:?}"
                    ),
                }),
            }
        }
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
    SLASH_COMMAND_NAMES
}

const SLASH_COMMAND_NAMES: &[&str] = &[
    "level",
    "grep",
    "source",
    "clear",
    "clear-filter",
    "reset",
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
    "pressure",
    "scrub",
    "pin",
    "unpin",
    "mute",
    "unmute",
    "mixer",
    "brush",
    "brush-add",
    "brush-clear",
    "yank",
    "glossary",
    "verbosity",
];

/// Single source of truth for command descriptions used both by the
/// completion-menu tooltip and the in-app `/help` block.
pub const SLASH_COMMAND_TABLE: &[(&str, &str)] = &[
    ("level", "set severity floor (debug/info/warn/error/fatal)"),
    ("grep", "filter by regex on the summary text"),
    ("source", "filter by source label or glob"),
    ("clear-filter", "drop all active filters"),
    ("pause", "freeze the ambient stream"),
    ("resume", "thaw the ambient stream"),
    ("follow", "narrow to run/deploy/extension target"),
    ("where", "host context summary"),
    ("help", "show all slash commands"),
    ("quit", "exit cleanly"),
    ("inspect", "drill into a specific event by id"),
    ("last", "recent events from the ring buffer"),
    ("snapshot", "write a debug artifact to disk"),
    ("open", "focus the desktop UI on a route"),
    ("pressure", "show held / dropped / per-source backpressure"),
    ("scrub", "render a time histogram of the ring buffer"),
    (
        "pin",
        "pin a correlation key (run:/deploy:/ext:); bypasses filters",
    ),
    ("unpin", "remove a pinned correlation key"),
    ("mute", "hide a source label or glob from ambient stream"),
    ("unmute", "remove a muted source pattern"),
    ("mixer", "show source-mixer drawer (mutes + pins)"),
    ("brush", "show brush selection + inferred filter preview"),
    ("brush-add", "add an event id to the brush selection"),
    ("brush-clear", "drop all brushed events"),
    ("yank", "apply the inferred filter from the brush selection"),
    ("glossary", "explain the UI elements (brush, pressure, mixer, ...)"),
    (
        "verbosity",
        "set UI density: silent|quiet|default|verbose|debug or +/-",
    ),
];

pub fn slash_command_description(name: &str) -> Option<&'static str> {
    SLASH_COMMAND_TABLE
        .iter()
        .find(|(n, _)| *n == name)
        .map(|(_, d)| *d)
}

pub fn level_argument_values() -> &'static [&'static str] {
    &["debug", "info", "warn", "error", "fatal"]
}
