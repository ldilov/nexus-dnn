//! Reedline tab completion for slash commands.
//!
//! Suggests:
//! - leading `/<name>` — slash command names
//! - second word after `/level ` — log levels
//! - second word after `/source ` — known source-category prefixes

use reedline::{Completer, Span, Suggestion};

use crate::repl::slash::{level_argument_values, slash_command_names};

const SOURCE_CATEGORY_PREFIXES: &[&str] = &[
    "host.*",
    "deploy:*",
    "extension.*",
    "run:*",
    "worker:*",
    "storage:*",
    "model.*",
    "backend.*",
];

pub struct SlashCompleter;

impl Default for SlashCompleter {
    fn default() -> Self {
        Self
    }
}

impl Completer for SlashCompleter {
    fn complete(&mut self, line: &str, pos: usize) -> Vec<Suggestion> {
        if !line.starts_with('/') {
            return Vec::new();
        }
        let head = &line[..pos.min(line.len())];
        let mut parts = head.split_whitespace();
        let first = parts.next().unwrap_or("/");
        match parts.next() {
            None => suggest_command_names(first, head.len()),
            Some(arg_so_far) => {
                let arg_start = head.len() - arg_so_far.len();
                let span = Span::new(arg_start, head.len());
                match first {
                    "/level" => suggest(level_argument_values(), arg_so_far, span),
                    "/source" => suggest(SOURCE_CATEGORY_PREFIXES, arg_so_far, span),
                    _ => Vec::new(),
                }
            }
        }
    }
}

fn suggest_command_names(first: &str, end: usize) -> Vec<Suggestion> {
    let prefix = first.trim_start_matches('/');
    let span = Span::new(0, end);
    slash_command_names()
        .iter()
        .filter(|name| name.starts_with(prefix))
        .map(|name| Suggestion {
            value: format!("/{name}"),
            description: None,
            style: None,
            extra: None,
            span,
            append_whitespace: true,
        })
        .collect()
}

fn suggest(options: &[&str], arg: &str, span: Span) -> Vec<Suggestion> {
    options
        .iter()
        .filter(|opt| opt.starts_with(arg))
        .map(|opt| Suggestion {
            value: (*opt).to_string(),
            description: None,
            style: None,
            extra: None,
            span,
            append_whitespace: true,
        })
        .collect()
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
