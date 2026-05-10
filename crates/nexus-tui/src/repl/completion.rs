//! Reedline tab completion for slash commands.
//!
//! Static suggestions:
//! - leading `/<name>` — slash command names
//! - second word after `/level ` — log levels
//!
//! Live, ring-buffer-driven suggestions:
//! - second word after `/source ` — source-category prefixes + every
//!   distinct source label observed in the current session
//! - second word after `/follow ` — `run:<id>`, `deploy:<id>`,
//!   `ext:<id>` shapes pulled from observed event correlations
//!
//! Fallback to static prefixes only when no `RingBuffer` handle is wired
//! (e.g. unit tests).

use std::collections::BTreeSet;
use std::sync::{Arc, Mutex};

use reedline::{Completer, Span, Suggestion};

use crate::repl::slash::{slash_command_description, slash_command_names};
use crate::stream::ring_buffer::RingBuffer;

const SOURCE_CATEGORY_PREFIXES: &[(&str, &str)] = &[
    ("host.*", "any host-emitted log or event"),
    ("deploy:*", "any deployment-bound event"),
    ("extension.*", "any extension lifecycle / install event"),
    ("run:*", "any run telemetry event"),
    ("worker:*", "any worker lifecycle event"),
    ("storage:*", "any storage / migration event"),
    ("model.*", "any model registry event"),
    ("backend.*", "any backend-runtime event"),
];

const FOLLOW_TARGET_SHAPES: &[(&str, &str)] = &[
    ("run:", "type a run id after the colon (run:01HK…)"),
    ("deploy:", "type a deployment slug (deploy:chat-prod)"),
    ("ext:", "type an extension id (ext:nexus.audio.emotiontts)"),
];

const LEVEL_ARG_DESCRIPTIONS: &[(&str, &str)] = &[
    ("debug", "show everything (verbose)"),
    ("info", "info and above (default)"),
    ("warn", "warnings, errors, fatal"),
    ("error", "errors and fatal only"),
    ("fatal", "fatal only (rarely useful)"),
];

const MAX_LIVE_SUGGESTIONS: usize = 24;
const RING_SCAN_DEPTH: usize = 2_000;

#[derive(Default)]
pub struct SlashCompleter {
    ring: Option<Arc<Mutex<RingBuffer>>>,
}

impl SlashCompleter {
    pub fn new() -> Self {
        Self { ring: None }
    }

    pub fn with_ring(ring: Arc<Mutex<RingBuffer>>) -> Self {
        Self { ring: Some(ring) }
    }

    /// Distinct source labels observed in the most recent
    /// [`RING_SCAN_DEPTH`] events. Returned in lexicographic order so
    /// the suggestion list is stable across calls.
    fn observed_sources(&self) -> Vec<String> {
        let Some(ring) = &self.ring else {
            return Vec::new();
        };
        let Ok(buf) = ring.lock() else {
            return Vec::new();
        };
        let mut seen = BTreeSet::new();
        for line in buf.iter().rev().take(RING_SCAN_DEPTH) {
            seen.insert(line.source.clone());
        }
        seen.into_iter().collect()
    }

    /// Recent correlation identifiers in `kind:value` form for `/follow`.
    fn observed_follow_targets(&self) -> Vec<String> {
        let Some(ring) = &self.ring else {
            return Vec::new();
        };
        let Ok(buf) = ring.lock() else {
            return Vec::new();
        };
        let mut seen = BTreeSet::new();
        for line in buf.iter().rev().take(RING_SCAN_DEPTH) {
            if let Some(id) = &line.correlation.run_id {
                seen.insert(format!("run:{id}"));
            }
            if let Some(id) = &line.correlation.deployment_id {
                seen.insert(format!("deploy:{id}"));
            }
            if let Some(id) = &line.correlation.extension_id {
                seen.insert(format!("ext:{id}"));
            }
        }
        seen.into_iter().collect()
    }
}

impl Completer for SlashCompleter {
    fn complete(&mut self, line: &str, pos: usize) -> Vec<Suggestion> {
        if !line.starts_with('/') {
            return Vec::new();
        }
        let head = &line[..pos.min(line.len())];
        let trailing_space = head.chars().next_back().is_some_and(|c| c.is_whitespace());

        let mut parts = head.split_whitespace();
        let first = parts.next().unwrap_or("/");

        // Three completion regimes:
        //   1. Still typing the command name  → suggest slash commands.
        //   2. Typed the command + a space    → suggest arguments with an
        //      empty prefix (everything matches; description tooltips
        //      tell the operator what each argument shape means).
        //   3. Typed the command + partial arg → filter argument
        //      suggestions by `arg_so_far` prefix.
        let (arg_so_far, arg_start) = match parts.next() {
            Some(arg) => {
                let start = head.len() - arg.len();
                (arg, start)
            }
            None if trailing_space => ("", head.len()),
            None => return suggest_command_names(first, head.len()),
        };
        let span = Span::new(arg_start, head.len());
        match first {
            "/level" => suggest_described(LEVEL_ARG_DESCRIPTIONS, arg_so_far, span),
            "/source" => {
                let sources = self.observed_sources();
                suggest_combined_with_desc(
                    SOURCE_CATEGORY_PREFIXES,
                    &sources,
                    arg_so_far,
                    span,
                    "recent",
                )
            }
            "/follow" => {
                let targets = self.observed_follow_targets();
                suggest_combined_with_desc(
                    FOLLOW_TARGET_SHAPES,
                    &targets,
                    arg_so_far,
                    span,
                    "recent",
                )
            }
            "/grep" => grep_placeholder_suggestion(arg_so_far, span),
            "/inspect" => inspect_placeholder_suggestion(arg_so_far, span),
            "/snapshot" => snapshot_placeholder_suggestion(arg_so_far, span),
            "/open" => open_placeholder_suggestion(arg_so_far, span),
            _ => Vec::new(),
        }
    }
}

/// Stand-in suggestion that does not insert real text but renders a
/// tooltip explaining what the argument should look like. Reedline
/// requires `value` to be non-empty for the menu to render, so we
/// echo back whatever the operator has already typed (zero-width
/// "completion" — the description column carries the hint).
fn placeholder_suggestion(arg_so_far: &str, span: Span, hint: &str) -> Vec<Suggestion> {
    if arg_so_far.is_empty() {
        vec![Suggestion {
            value: String::new(),
            description: Some(hint.to_string()),
            style: None,
            extra: None,
            span,
            append_whitespace: false,
        }]
    } else {
        Vec::new()
    }
}

fn grep_placeholder_suggestion(arg_so_far: &str, span: Span) -> Vec<Suggestion> {
    placeholder_suggestion(
        arg_so_far,
        span,
        "type a regex pattern (e.g. cuda|oom|panic)",
    )
}

fn inspect_placeholder_suggestion(arg_so_far: &str, span: Span) -> Vec<Suggestion> {
    placeholder_suggestion(
        arg_so_far,
        span,
        "type an event id (use /last to find recent events)",
    )
}

fn snapshot_placeholder_suggestion(arg_so_far: &str, span: Span) -> Vec<Suggestion> {
    placeholder_suggestion(
        arg_so_far,
        span,
        "type a path or @file:<prefix> for fs completion",
    )
}

fn open_placeholder_suggestion(arg_so_far: &str, span: Span) -> Vec<Suggestion> {
    placeholder_suggestion(
        arg_so_far,
        span,
        "type a desktop route (deployments/<slug>, extensions/<id>, models-search)",
    )
}

fn suggest_command_names(first: &str, end: usize) -> Vec<Suggestion> {
    let prefix = first.trim_start_matches('/');
    let span = Span::new(0, end);
    slash_command_names()
        .iter()
        .filter(|name| name.starts_with(prefix))
        .map(|name| Suggestion {
            value: format!("/{name}"),
            description: slash_command_description(name).map(String::from),
            style: None,
            extra: None,
            span,
            append_whitespace: true,
        })
        .collect()
}

fn suggest_described(options: &[(&str, &str)], arg: &str, span: Span) -> Vec<Suggestion> {
    options
        .iter()
        .filter(|(opt, _)| opt.starts_with(arg))
        .map(|(opt, desc)| Suggestion {
            value: (*opt).to_string(),
            description: Some((*desc).to_string()),
            style: None,
            extra: None,
            span,
            append_whitespace: true,
        })
        .collect()
}

fn suggest_combined_with_desc(
    static_options: &[(&str, &str)],
    live_options: &[String],
    arg: &str,
    span: Span,
    live_desc: &str,
) -> Vec<Suggestion> {
    let mut out: Vec<Suggestion> = Vec::new();
    for (opt, desc) in static_options {
        if opt.starts_with(arg) {
            out.push(Suggestion {
                value: (*opt).to_string(),
                description: Some((*desc).to_string()),
                style: None,
                extra: None,
                span,
                append_whitespace: true,
            });
        }
    }
    for opt in live_options {
        if out.len() >= MAX_LIVE_SUGGESTIONS {
            break;
        }
        if opt.starts_with(arg) && !out.iter().any(|s| s.value == *opt) {
            out.push(Suggestion {
                value: opt.clone(),
                description: Some(live_desc.to_string()),
                style: None,
                extra: None,
                span,
                append_whitespace: true,
            });
        }
    }
    out
}

const FILE_COMPLETE_PREFIX: &str = "@file:";
const MAX_FILE_SUGGESTIONS: usize = 32;

/// Complete an `@file:<partial-path>` token by walking the cwd-relative
/// directory and listing matching entries. Returns suggestions in the
/// `@file:<path>` form so the caller can substitute directly into the
/// command line. Filters dotfiles unless the partial path explicitly
/// starts with a `.`.
pub fn file_complete(token: &str, cwd: &std::path::Path) -> Vec<String> {
    let Some(partial) = token.strip_prefix(FILE_COMPLETE_PREFIX) else {
        return Vec::new();
    };
    let (dir_part, name_part) = split_dir_name(partial);
    let base = if dir_part.is_empty() {
        cwd.to_path_buf()
    } else {
        cwd.join(dir_part)
    };
    let entries = match std::fs::read_dir(&base) {
        Ok(it) => it,
        Err(_) => return Vec::new(),
    };
    let want_dotfiles = name_part.starts_with('.');
    let mut out: Vec<String> = Vec::new();
    for entry in entries.flatten() {
        let file_name = entry.file_name();
        let name = file_name.to_string_lossy();
        if !name.starts_with(name_part) {
            continue;
        }
        if !want_dotfiles && name.starts_with('.') {
            continue;
        }
        let mut suggestion = String::with_capacity(FILE_COMPLETE_PREFIX.len() + partial.len());
        suggestion.push_str(FILE_COMPLETE_PREFIX);
        if !dir_part.is_empty() {
            suggestion.push_str(dir_part);
            if !dir_part.ends_with('/') && !dir_part.ends_with('\\') {
                suggestion.push('/');
            }
        }
        suggestion.push_str(&name);
        if entry.path().is_dir() {
            suggestion.push('/');
        }
        out.push(suggestion);
        if out.len() >= MAX_FILE_SUGGESTIONS {
            break;
        }
    }
    out.sort();
    out
}

fn split_dir_name(partial: &str) -> (&str, &str) {
    match partial.rfind(['/', '\\']) {
        Some(idx) => (&partial[..idx], &partial[idx + 1..]),
        None => ("", partial),
    }
}
