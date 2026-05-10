//! Slash-command controller — owns the live `FilterState`, `HoldQueue`,
//! and the runtime side-effects of every slash command.
//!
//! Editor → mpsc<ControllerCommand> → controller → mutates shared state
//! (`Arc<RwLock<FilterState>>`, `Arc<Mutex<HoldQueue>>`, `Arc<Mutex<PromptState>>`).
//! Side-effects (printing inspector blocks, HTTP probes for `/where`)
//! happen on the controller task.

use std::sync::{Arc, Mutex, RwLock};
use std::time::Duration;

use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;

use crate::render::inspector::{InspectorRenderConfig, render_inspector_block};
use crate::repl::ansi::{detect_color_depth, osc8_hyperlink};
use crate::repl::inspect::{find_event_by_id_str, last_n_at_or_above};
use crate::repl::prompt::PromptState;
use crate::repl::queue::{CommandQueue, CtrlCOutcome};
use crate::repl::slash::{ParseError, ParsedCommand};
use crate::snapshot::{SnapshotInputs, write_snapshot};
use crate::stream::filter::FilterState;
use crate::stream::hold_queue::HoldQueue;
use crate::stream::ring_buffer::RingBuffer;
use crate::stream::severity::Severity;

#[derive(Debug)]
pub enum ControllerCommand {
    Submit(ParsedCommand),
    SubmitRaw(Result<ParsedCommand, ParseError>),
    Interrupt,
    Quit,
}

#[derive(Clone)]
pub struct ControllerHandles {
    pub filter: Arc<RwLock<FilterState>>,
    pub hold_queue: Arc<Mutex<HoldQueue>>,
    pub prompt: Arc<Mutex<PromptState>>,
    pub ring: Arc<Mutex<RingBuffer>>,
    pub command_tx: mpsc::Sender<ControllerCommand>,
    pub shutdown: CancellationToken,
}

impl ControllerHandles {
    pub fn new(
        filter: Arc<RwLock<FilterState>>,
        hold_queue: Arc<Mutex<HoldQueue>>,
        prompt: Arc<Mutex<PromptState>>,
        ring: Arc<Mutex<RingBuffer>>,
        shutdown: CancellationToken,
    ) -> (Self, mpsc::Receiver<ControllerCommand>) {
        let (tx, rx) = mpsc::channel(16);
        let handles = Self {
            filter,
            hold_queue,
            prompt,
            ring,
            command_tx: tx,
            shutdown,
        };
        (handles, rx)
    }
}

#[derive(Clone)]
pub struct ControllerConfig {
    pub host_url: String,
}

pub async fn run_controller(
    cfg: ControllerConfig,
    handles: ControllerHandles,
    mut rx: mpsc::Receiver<ControllerCommand>,
) {
    let mut queue = CommandQueue::default();
    let http = match reqwest::Client::builder()
        .timeout(Duration::from_secs(5))
        .build()
    {
        Ok(c) => c,
        Err(_) => return,
    };

    while let Some(cmd) = rx.recv().await {
        match cmd {
            ControllerCommand::Submit(parsed) => {
                let dispatch = queue.dispatch(parsed.clone());
                if dispatch.started {
                    execute(&parsed, &cfg, &handles, &http).await;
                    queue.finish_in_flight();
                    while let Some(next) = queue.finish_in_flight() {
                        execute(&next, &cfg, &handles, &http).await;
                    }
                }
            }
            ControllerCommand::SubmitRaw(Ok(parsed)) => {
                handles
                    .command_tx
                    .send(ControllerCommand::Submit(parsed))
                    .await
                    .ok();
            }
            ControllerCommand::SubmitRaw(Err(err)) => {
                eprintln!("nexus: {err}");
            }
            ControllerCommand::Interrupt => match queue.handle_ctrl_c() {
                CtrlCOutcome::CancelledInFlight => eprintln!("·· cancelled in-flight command"),
                CtrlCOutcome::DroppedQueueHead(c) => {
                    eprintln!("·· dropped queued command: {}", describe(&c))
                }
                CtrlCOutcome::Idle => {}
            },
            ControllerCommand::Quit => {
                handles.shutdown.cancel();
                return;
            }
        }
        update_filter_indicator(&handles);
    }
}

async fn execute(
    cmd: &ParsedCommand,
    cfg: &ControllerConfig,
    handles: &ControllerHandles,
    http: &reqwest::Client,
) {
    match cmd {
        ParsedCommand::Level(level) => with_filter(handles, |f| f.set_level_floor(*level)),
        ParsedCommand::Grep(pattern) => {
            match with_filter_result(handles, |f| f.set_grep(Some(pattern))) {
                Ok(()) => {}
                Err(err) => eprintln!("nexus: {err}"),
            }
        }
        ParsedCommand::Source(pattern) => {
            match with_filter_result(handles, |f| f.set_source_glob(Some(pattern))) {
                Ok(()) => {}
                Err(err) => eprintln!("nexus: {err}"),
            }
        }
        ParsedCommand::ClearFilter => with_filter(handles, |f| f.clear()),
        ParsedCommand::Pause => {
            with_filter(handles, |f| f.set_paused(true));
            with_prompt(handles, |p| p.paused = true);
        }
        ParsedCommand::Resume => {
            with_filter(handles, |f| f.set_paused(false));
            with_prompt(handles, |p| p.paused = false);
        }
        ParsedCommand::Follow(target) => {
            with_filter(handles, |f| f.set_follow(Some(target.clone())))
        }
        ParsedCommand::Where => render_where(cfg, http, handles).await,
        ParsedCommand::Help => render_help(handles),
        ParsedCommand::Quit => handles.shutdown.cancel(),
        ParsedCommand::Inspect(id) => render_inspect(handles, id),
        ParsedCommand::Last { count, level } => render_last(handles, *count, *level),
        ParsedCommand::Snapshot(path) => run_snapshot(cfg, handles, path),
        ParsedCommand::Open(target) => render_open(cfg, http, handles, target).await,
    }
}

async fn render_open(
    cfg: &ControllerConfig,
    http: &reqwest::Client,
    handles: &ControllerHandles,
    target: &str,
) {
    set_holding(handles, true);
    let url = format!(
        "{}/api/v1/desktop/focus",
        cfg.host_url.trim_end_matches('/')
    );
    let route = ensure_leading_slash(target);
    let response = http
        .post(&url)
        .json(&serde_json::json!({ "route": route }))
        .send()
        .await;
    match response {
        Ok(resp) => match resp.json::<serde_json::Value>().await {
            Ok(body) => print_open_result(&body),
            Err(err) => eprintln!("·· /open response parse failed: {err}"),
        },
        Err(err) => eprintln!("·· /open request failed: {err}"),
    }
    set_holding(handles, false);
    flush_hold(handles);
}

fn print_open_result(body: &serde_json::Value) {
    match body.get("status").and_then(|v| v.as_str()) {
        Some("focused") => {
            let route = body
                .get("route")
                .and_then(|v| v.as_str())
                .unwrap_or("(unknown)");
            println!("✓ desktop focused → {route}");
        }
        Some("fallback") => {
            let url = body
                .get("fallback_url")
                .and_then(|v| v.as_str())
                .unwrap_or("(no url)");
            let reason = body
                .get("reason")
                .and_then(|v| v.as_str())
                .unwrap_or("desktop unavailable");
            let link = osc8_hyperlink(url, url);
            println!("·· desktop {reason} — {link}");
        }
        _ => {
            let err = body
                .get("error")
                .and_then(|v| v.as_str())
                .unwrap_or("unknown error");
            eprintln!("·· /open: {err}");
        }
    }
}

fn ensure_leading_slash(route: &str) -> String {
    if route.starts_with('/') {
        route.to_string()
    } else {
        format!("/{route}")
    }
}

fn run_snapshot(cfg: &ControllerConfig, handles: &ControllerHandles, path: &str) {
    set_holding(handles, true);
    let resolved = resolve_snapshot_path(path);
    let result = match (handles.ring.lock(), handles.filter.read()) {
        (Ok(ring), Ok(filter)) => {
            let inputs = SnapshotInputs {
                host_url: &cfg.host_url,
                path: &resolved,
            };
            write_snapshot(&inputs, &ring, &filter)
        }
        _ => {
            eprintln!("·· /snapshot failed: shared state lock poisoned");
            set_holding(handles, false);
            flush_hold(handles);
            return;
        }
    };
    match result {
        Ok(()) => println!("┃ snapshot written → {}", resolved.display()),
        Err(err) => eprintln!("·· /snapshot failed: {err}"),
    }
    set_holding(handles, false);
    flush_hold(handles);
}

fn resolve_snapshot_path(arg: &str) -> std::path::PathBuf {
    let trimmed = arg.trim();
    let body = trimmed.strip_prefix("@file:").unwrap_or(trimmed);
    std::path::PathBuf::from(body)
}

fn render_inspect(handles: &ControllerHandles, id: &str) {
    set_holding(handles, true);
    let depth = detect_color_depth();
    let cfg = InspectorRenderConfig {
        color_depth: depth,
        recent_context_count: 5,
        correlation_depth: 3,
    };
    let rendered = match handles.ring.lock() {
        Ok(buf) => {
            find_event_by_id_str(&buf, id).map(|target| render_inspector_block(&buf, target, &cfg))
        }
        Err(_) => None,
    };
    match rendered {
        Some(block) => print!("{block}"),
        None => eprintln!("·· no event found for '{id}'"),
    }
    set_holding(handles, false);
    flush_hold(handles);
}

fn render_last(handles: &ControllerHandles, count: usize, level: Severity) {
    set_holding(handles, true);
    let cfg = InspectorRenderConfig {
        color_depth: detect_color_depth(),
        recent_context_count: 5,
        correlation_depth: 3,
    };
    let blocks: Vec<String> = match handles.ring.lock() {
        Ok(buf) => {
            let recent = last_n_at_or_above(&buf, count, level);
            recent
                .into_iter()
                .map(|line| render_inspector_block(&buf, line, &cfg))
                .collect()
        }
        Err(_) => Vec::new(),
    };
    if blocks.is_empty() {
        eprintln!("·· no events ≥ {level} in ring buffer");
    } else {
        for block in &blocks {
            print!("{block}");
        }
    }
    set_holding(handles, false);
    flush_hold(handles);
}

fn with_filter(handles: &ControllerHandles, mutator: impl FnOnce(&mut FilterState)) {
    if let Ok(mut state) = handles.filter.write() {
        mutator(&mut state);
    }
}

fn with_filter_result<E>(
    handles: &ControllerHandles,
    mutator: impl FnOnce(&mut FilterState) -> Result<(), E>,
) -> Result<(), E> {
    let mut state = handles.filter.write().unwrap_or_else(|p| p.into_inner());
    mutator(&mut state)
}

fn with_prompt(handles: &ControllerHandles, mutator: impl FnOnce(&mut PromptState)) {
    if let Ok(mut state) = handles.prompt.lock() {
        mutator(&mut state);
    }
}

fn update_filter_indicator(handles: &ControllerHandles) {
    let (active, count) = handles
        .filter
        .read()
        .map(|f| (f.has_active_filters(), f.active_filter_count()))
        .unwrap_or((false, 0));
    if let Ok(mut state) = handles.prompt.lock() {
        state.filter_active = active;
        state.filter_count = count;
    }
}

async fn render_where(cfg: &ControllerConfig, http: &reqwest::Client, handles: &ControllerHandles) {
    set_holding(handles, true);
    let url = format!("{}/api/host/info", cfg.host_url.trim_end_matches('/'));
    match http.get(&url).send().await {
        Ok(resp) => match resp.text().await {
            Ok(text) => println!("┃ host: {url}\n┃ {text}"),
            Err(err) => eprintln!("·· /where read failed: {err}"),
        },
        Err(err) => eprintln!("·· /where request failed: {err}"),
    }
    set_holding(handles, false);
    flush_hold(handles);
}

fn render_help(handles: &ControllerHandles) {
    set_holding(handles, true);
    print!("{}", render_help_block());
    set_holding(handles, false);
    flush_hold(handles);
}

const HELP_ACCENT: &str = "\x1b[38;5;75m"; // graphite blue
const HELP_GROUP: &str = "\x1b[38;5;141m"; // violet section heading
const HELP_DIM: &str = "\x1b[2m";
const HELP_BOLD: &str = "\x1b[1m";
const HELP_RESET: &str = "\x1b[0m";

struct HelpItem {
    icon: &'static str,
    command: &'static str,
    description: &'static str,
}

struct HelpGroup {
    title: &'static str,
    items: &'static [HelpItem],
}

const HELP_GROUPS: &[HelpGroup] = &[
    HelpGroup {
        title: "Filter",
        items: &[
            HelpItem {
                icon: "▣",
                command: "/level <debug|info|warn|error|fatal>",
                description: "set severity floor",
            },
            HelpItem {
                icon: "◉",
                command: "/grep <regex>",
                description: "display grep on summary text",
            },
            HelpItem {
                icon: "◧",
                command: "/source <glob>",
                description: "filter by source label",
            },
            HelpItem {
                icon: "▶",
                command: "/follow run:<id>|deploy:<id>|ext:<id>",
                description: "narrow to a single target",
            },
            HelpItem {
                icon: "◯",
                command: "/clear-filter",
                description: "drop all filters",
            },
        ],
    },
    HelpGroup {
        title: "Inspect",
        items: &[
            HelpItem {
                icon: "◎",
                command: "/inspect <event-id>",
                description: "drill into a specific event",
            },
            HelpItem {
                icon: "↺",
                command: "/last [N] [level]",
                description: "recent events from the ring buffer",
            },
            HelpItem {
                icon: "⊟",
                command: "/snapshot <path>",
                description: "write a debug artifact",
            },
            HelpItem {
                icon: "↗",
                command: "/open <route>",
                description: "focus the desktop UI",
            },
        ],
    },
    HelpGroup {
        title: "Lifecycle",
        items: &[
            HelpItem {
                icon: "⏸",
                command: "/pause · /resume",
                description: "toggle ambient display",
            },
            HelpItem {
                icon: "●",
                command: "/where",
                description: "host context summary",
            },
            HelpItem {
                icon: "?",
                command: "/help",
                description: "this menu",
            },
            HelpItem {
                icon: "⏻",
                command: "/quit",
                description: "clean exit",
            },
        ],
    },
];

fn render_help_block() -> String {
    let cmd_width = HELP_GROUPS
        .iter()
        .flat_map(|g| g.items.iter())
        .map(|i| i.command.chars().count())
        .max()
        .unwrap_or(0);

    let mut out = String::new();

    out.push_str(HELP_ACCENT);
    out.push_str(HELP_BOLD);
    out.push_str("┃ ╭─");
    let title = " Nexus TUI · slash commands ";
    out.push_str(title);
    let pad = 56_usize.saturating_sub(title.chars().count() + 2);
    for _ in 0..pad {
        out.push('─');
    }
    out.push('╮');
    out.push_str(HELP_RESET);
    out.push('\n');

    for (idx, group) in HELP_GROUPS.iter().enumerate() {
        out.push_str(HELP_ACCENT);
        out.push_str("┃ ");
        out.push_str(HELP_RESET);
        out.push_str(HELP_GROUP);
        out.push_str(HELP_BOLD);
        out.push_str("▾ ");
        out.push_str(group.title);
        out.push_str(HELP_RESET);
        out.push('\n');

        for item in group.items {
            out.push_str(HELP_ACCENT);
            out.push_str("┃   ");
            out.push_str(HELP_RESET);
            out.push_str(HELP_ACCENT);
            out.push_str(item.icon);
            out.push_str(HELP_RESET);
            out.push(' ');
            out.push_str(HELP_BOLD);
            out.push_str(item.command);
            out.push_str(HELP_RESET);
            let pad = cmd_width.saturating_sub(item.command.chars().count());
            for _ in 0..pad {
                out.push(' ');
            }
            out.push_str("  ");
            out.push_str(HELP_DIM);
            out.push_str(item.description);
            out.push_str(HELP_RESET);
            out.push('\n');
        }
        if idx + 1 < HELP_GROUPS.len() {
            out.push_str(HELP_ACCENT);
            out.push('┃');
            out.push_str(HELP_RESET);
            out.push('\n');
        }
    }

    out.push_str(HELP_ACCENT);
    out.push_str("┃ ");
    out.push_str(HELP_RESET);
    out.push_str(HELP_DIM);
    out.push_str("tab — complete · ↑/↓ — history · right-arrow — accept hint · Ctrl+D — exit");
    out.push_str(HELP_RESET);
    out.push('\n');

    out.push_str(HELP_ACCENT);
    out.push_str("┃ ╰");
    for _ in 0..58 {
        out.push('─');
    }
    out.push('╯');
    out.push_str(HELP_RESET);
    out.push('\n');

    out
}

fn set_holding(handles: &ControllerHandles, holding: bool) {
    if let Ok(mut q) = handles.hold_queue.lock() {
        q.set_holding(holding);
    }
}

fn flush_hold(handles: &ControllerHandles) {
    let report = match handles.hold_queue.lock() {
        Ok(mut q) => q.flush(),
        Err(_) => return,
    };
    if report.flushed.is_empty() && report.overflow_count == 0 {
        return;
    }
    let total = report.flushed.len() as u64 + report.overflow_count;
    println!("·· {} ambient event(s) held during command", total);
}

fn describe(cmd: &ParsedCommand) -> String {
    match cmd {
        ParsedCommand::Level(_) => "/level".into(),
        ParsedCommand::Grep(_) => "/grep".into(),
        ParsedCommand::Source(_) => "/source".into(),
        ParsedCommand::ClearFilter => "/clear-filter".into(),
        ParsedCommand::Pause => "/pause".into(),
        ParsedCommand::Resume => "/resume".into(),
        ParsedCommand::Follow(_) => "/follow".into(),
        ParsedCommand::Where => "/where".into(),
        ParsedCommand::Help => "/help".into(),
        ParsedCommand::Quit => "/quit".into(),
        ParsedCommand::Inspect(_) => "/inspect".into(),
        ParsedCommand::Last { .. } => "/last".into(),
        ParsedCommand::Snapshot(_) => "/snapshot".into(),
        ParsedCommand::Open(_) => "/open".into(),
    }
}

#[cfg(test)]
mod help_render_tests {
    use super::*;

    #[test]
    fn help_block_contains_every_command() {
        let out = render_help_block();
        for group in HELP_GROUPS {
            for item in group.items {
                assert!(
                    out.contains(item.command),
                    "missing {} in help block",
                    item.command
                );
                assert!(
                    out.contains(item.description),
                    "missing description {} in help block",
                    item.description
                );
            }
        }
    }

    #[test]
    fn help_block_renders_section_headings() {
        let out = render_help_block();
        for group in HELP_GROUPS {
            assert!(
                out.contains(group.title),
                "missing section heading {} in help block",
                group.title
            );
        }
    }

    #[test]
    fn help_block_starts_and_ends_with_box_corners() {
        let out = render_help_block();
        assert!(out.contains("┃ ╭"), "missing top-left corner");
        assert!(out.contains("┃ ╰"), "missing bottom-left corner");
    }
}
