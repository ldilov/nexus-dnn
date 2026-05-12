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
use crate::render::status_ribbon::emit_status_ribbon;
use crate::repl::ansi::{detect_color_depth, osc8_hyperlink};
use crate::repl::inspect::{find_event_by_id_str, last_n_at_or_above};
use crate::repl::prompt::PromptState;
use crate::repl::queue::{CommandQueue, CtrlCOutcome};
use crate::repl::slash::{ParseError, ParsedCommand};
use crate::snapshot::{SnapshotInputs, write_snapshot};
use crate::stream::brush_selection::BrushSelection;
use crate::stream::filter::FilterState;
use crate::stream::filter_inference::infer_from;
use crate::stream::hold_queue::HoldQueue;
use crate::stream::muted_sources::MutedSources;
use crate::stream::pinned_correlations::{PinKey, PinnedSet};
use crate::stream::rate_guard::RateGuardSnapshot;
use crate::stream::ring_buffer::RingBuffer;
use crate::stream::severity::Severity;

#[derive(Debug)]
pub enum ControllerCommand {
    Submit(ParsedCommand),
    SubmitRaw(Result<ParsedCommand, ParseError>),
    Interrupt,
    Quit,
}

/// Screen-space anchor of the most recent inspector block — terminal row
/// the block starts at, and how many rows it occupies. Used to MoveTo +
/// Clear(FromCursorDown) before redrawing so toggles don't stack.
#[derive(Debug, Clone, Copy)]
pub struct InspectorBlockAnchor {
    pub start_row: u16,
    pub rows: u16,
}

#[derive(Clone)]
pub struct ControllerHandles {
    pub filter: Arc<RwLock<FilterState>>,
    pub hold_queue: Arc<Mutex<HoldQueue>>,
    pub prompt: Arc<Mutex<PromptState>>,
    pub ring: Arc<Mutex<RingBuffer>>,
    /// Cluster-A — Updated once per second by the consumer-loop tick.
    /// Read by `/pressure` to render the per-source backpressure drawer.
    pub rate_snapshot: Arc<Mutex<RateGuardSnapshot>>,
    /// Cluster-B — pinned correlation keys; bypass filters during render.
    pub pinned: Arc<RwLock<PinnedSet>>,
    /// Cluster-B — muted source labels / globs; hide from ambient.
    pub muted: Arc<RwLock<MutedSources>>,
    /// Cluster-C — brush selection of example event ids; consumed by
    /// `/yank` to infer + apply a filter.
    pub brush: Arc<RwLock<BrushSelection>>,
    pub inspector_collapsed: Arc<
        Mutex<
            std::collections::HashMap<
                crate::EventId,
                std::collections::BTreeSet<crate::render::inspector::InspectorSection>,
            >,
        >,
    >,
    /// Position + height of the most recently rendered inspector block.
    /// Used to clear the previous render before redrawing on toggle, so
    /// successive `/inspect` or section-toggle clicks don't stack
    /// duplicate cards down the screen.
    pub inspector_anchor: Arc<Mutex<Option<InspectorBlockAnchor>>>,
    pub click_registry: Arc<Mutex<crate::mouse::targets::ClickRegistry>>,
    pub command_tx: mpsc::Sender<ControllerCommand>,
    pub shutdown: CancellationToken,
}

impl ControllerHandles {
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        filter: Arc<RwLock<FilterState>>,
        hold_queue: Arc<Mutex<HoldQueue>>,
        prompt: Arc<Mutex<PromptState>>,
        ring: Arc<Mutex<RingBuffer>>,
        rate_snapshot: Arc<Mutex<RateGuardSnapshot>>,
        pinned: Arc<RwLock<PinnedSet>>,
        muted: Arc<RwLock<MutedSources>>,
        brush: Arc<RwLock<BrushSelection>>,
        click_registry: Arc<Mutex<crate::mouse::targets::ClickRegistry>>,
        shutdown: CancellationToken,
    ) -> (Self, mpsc::Receiver<ControllerCommand>) {
        let (tx, rx) = mpsc::channel(16);
        let handles = Self {
            filter,
            hold_queue,
            prompt,
            ring,
            rate_snapshot,
            pinned,
            muted,
            brush,
            inspector_collapsed: Arc::new(Mutex::new(std::collections::HashMap::new())),
            inspector_anchor: Arc::new(Mutex::new(None)),
            click_registry,
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
    let mutates_filter_state = matches!(
        cmd,
        ParsedCommand::Level(_)
            | ParsedCommand::Grep(_)
            | ParsedCommand::Source(_)
            | ParsedCommand::ClearFilter
            | ParsedCommand::Pause
            | ParsedCommand::Resume
            | ParsedCommand::Follow(_)
    );
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
        ParsedCommand::Glossary => render_glossary(handles),
        ParsedCommand::Verbosity(level) => apply_verbosity(handles, *level),
        ParsedCommand::VerbosityRaise => {
            let current = current_verbosity(handles);
            apply_verbosity(handles, current.raise())
        }
        ParsedCommand::VerbosityLower => {
            let current = current_verbosity(handles);
            apply_verbosity(handles, current.lower())
        }
        ParsedCommand::InspectorToggle { event_id, section } => {
            let resolved = match handles.ring.lock() {
                Ok(buf) => find_event_by_id_str(&buf, event_id).map(|line| line.id),
                Err(_) => None,
            };
            if let Some(id) = resolved {
                toggle_inspector_section(handles, id, *section);
            }
        }
        ParsedCommand::Quit => handles.shutdown.cancel(),
        ParsedCommand::Inspect(id) => render_inspect(handles, id),
        ParsedCommand::Last { count, level } => render_last(handles, *count, *level),
        ParsedCommand::Snapshot(path) => run_snapshot(cfg, handles, path),
        ParsedCommand::Open(target) => render_open(cfg, http, handles, target).await,
        ParsedCommand::Pressure => render_pressure(handles),
        ParsedCommand::Scrub => render_scrub(handles),
        ParsedCommand::Pin(arg) => run_pin(handles, arg),
        ParsedCommand::Unpin(arg) => run_unpin(handles, arg),
        ParsedCommand::Mute(arg) => run_mute(handles, arg),
        ParsedCommand::Unmute(arg) => run_unmute(handles, arg),
        ParsedCommand::Mixer => render_mixer(handles),
        ParsedCommand::Brush => render_brush(handles),
        ParsedCommand::BrushAdd(arg) => run_brush_add(handles, arg),
        ParsedCommand::BrushClear => run_brush_clear(handles),
        ParsedCommand::Yank => run_yank(handles),
    }
    if mutates_filter_state {
        emit_status_ribbon(&handles.filter, &handles.prompt);
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
    let rendered = match handles.ring.lock() {
        Ok(buf) => find_event_by_id_str(&buf, id).map(|target| {
            let event_class = crate::inspector::classifier::classify(target);
            // On first inspect of this event, seed the per-event
            // collapsed set from the class default (Spec 044 S4). If
            // the user has already toggled sections (entry exists in
            // the map), prefer their state.
            let collapsed = if let Ok(mut map) = handles.inspector_collapsed.lock() {
                map.entry(target.id)
                    .or_insert_with(|| {
                        crate::render::inspector::default_collapsed_for_class(event_class)
                    })
                    .clone()
            } else {
                std::collections::BTreeSet::new()
            };
            let cfg = InspectorRenderConfig {
                color_depth: depth,
                recent_context_count: 5,
                correlation_depth: 3,
                collapsed,
                event_class: Some(event_class),
            };
            let layout = crate::render::inspector::render_inspector_layout(&buf, target, &cfg);
            (layout, target.id)
        }),
        Err(_) => None,
    };
    match rendered {
        Some((layout, event_id)) => {
            clear_prior_inspector_block(handles);
            let start_row = crossterm::cursor::position().ok().map(|(_, r)| r);
            print!("{}", layout.rendered);
            remember_inspector_anchor(handles, start_row, layout.total_rows);
            if let (Some(start), Ok(mut reg)) = (start_row, handles.click_registry.lock()) {
                for (section, offset) in &layout.section_rows {
                    let row = start.saturating_add(*offset);
                    reg.register(
                        row,
                        0..u16::MAX,
                        crate::mouse::targets::ClickTarget::InspectorSection {
                            event_id,
                            section: *section,
                        },
                    );
                }
            }
        }
        None => eprintln!("·· no event found for '{id}'"),
    }
    set_holding(handles, false);
    flush_hold(handles);
}

pub fn toggle_inspector_section(
    handles: &ControllerHandles,
    event_id: crate::EventId,
    section: crate::render::inspector::InspectorSection,
) {
    if let Ok(mut map) = handles.inspector_collapsed.lock() {
        let set = map.entry(event_id).or_default();
        if !set.remove(&section) {
            set.insert(section);
        }
    }
    render_inspect(handles, &format!("{event_id}"));
}

fn clear_prior_inspector_block(handles: &ControllerHandles) {
    use crossterm::{
        QueueableCommand,
        cursor::MoveTo,
        terminal::{Clear, ClearType},
    };
    let prior = {
        let mut guard = match handles.inspector_anchor.lock() {
            Ok(g) => g,
            Err(_) => return,
        };
        guard.take()
    };
    let Some(anchor) = prior else { return };
    if anchor.rows == 0 {
        return;
    }
    let mut out = std::io::stdout();
    let _ = out.queue(MoveTo(0, anchor.start_row));
    let _ = out.queue(Clear(ClearType::FromCursorDown));
    let _ = std::io::Write::flush(&mut out);
}

fn remember_inspector_anchor(handles: &ControllerHandles, start_row: Option<u16>, rows: u16) {
    let Some(start_row) = start_row else { return };
    if let Ok(mut guard) = handles.inspector_anchor.lock() {
        *guard = Some(InspectorBlockAnchor { start_row, rows });
    }
}

fn render_last(handles: &ControllerHandles, count: usize, level: Severity) {
    set_holding(handles, true);
    let cfg = InspectorRenderConfig {
        color_depth: detect_color_depth(),
        recent_context_count: 5,
        correlation_depth: 3,
        collapsed: std::collections::BTreeSet::new(),
        event_class: None,
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

fn render_glossary(handles: &ControllerHandles) {
    set_holding(handles, true);
    print!("{}", render_glossary_block());
    set_holding(handles, false);
    flush_hold(handles);
}

pub fn render_glossary_block() -> String {
    let entries: [(&str, &str); 14] = [
        (
            "sparkline",
            "Braille 8-cell bar at the prompt — recent event rate per second.",
        ),
        (
            "filter indicator [!N]",
            "Count of active filters. Click or run /clear to drop them all.",
        ),
        (
            "pressure badge ⚡N",
            "Events held or dropped by the rate-guard. Non-zero = backlog.",
        ),
        (
            "status ribbon ▦",
            "Single-line cockpit emitted on filter / pause / connection change.",
        ),
        (
            "severity glyph",
            "✸ fatal · ● error · ▲ warn · · info/debug. ASCII fallback via --no-glyphs.",
        ),
        (
            "category glyph",
            "Domain icon prefixing the source label (host / runtime / storage / ...).",
        ),
        (
            "brush",
            "A persistent selection of events. /brush-add <id>, /brush, /yank to filter to them.",
        ),
        (
            "pressure (drawer)",
            "/pressure shows held + dropped + per-source backpressure detail.",
        ),
        (
            "source mixer",
            "/mixer shows per-source rate, mutes, and pinned correlations together.",
        ),
        (
            "pin / mute",
            "/pin <corr> bypasses filters for matching events; /mute <source> hides them.",
        ),
        (
            "follow",
            "/follow run:<id> or deploy:<id> — pin all events sharing that correlation.",
        ),
        (
            "inspect / re-inspect",
            "/inspect <id> opens a detail block. Clicking a heading re-runs it.",
        ),
        (
            "snapshot",
            "/snapshot writes a redacted JSONL of the ring buffer to disk for sharing.",
        ),
        (
            "scroll passthrough",
            "Mouse-wheel temporarily releases capture so native scrollback works.",
        ),
    ];
    let mut out = String::new();
    out.push_str(&format!(
        "{HELP_GROUP}{HELP_BOLD}nexus-tui glossary{HELP_RESET}\n"
    ));
    out.push_str(&format!(
        "{HELP_DIM}(see /help for the full slash command list){HELP_RESET}\n\n"
    ));
    for (term, explanation) in entries.iter() {
        out.push_str(&format!(
            "  {HELP_ACCENT}{term:<22}{HELP_RESET}  {explanation}\n"
        ));
    }
    out
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
        title: "Pressure & time",
        items: &[
            HelpItem {
                icon: "⚡",
                command: "/pressure",
                description: "held + dropped + per-source backpressure",
            },
            HelpItem {
                icon: "⏱",
                command: "/scrub",
                description: "time histogram of the ring buffer",
            },
        ],
    },
    HelpGroup {
        title: "Attention",
        items: &[
            HelpItem {
                icon: "📌",
                command: "/pin run:<id>|deploy:<id>|ext:<id>",
                description: "pin correlation key; bypasses filters",
            },
            HelpItem {
                icon: "—",
                command: "/unpin <kind>:<id>",
                description: "remove a pin",
            },
            HelpItem {
                icon: "🔇",
                command: "/mute <glob>",
                description: "hide source from ambient (host.*, deploy:*)",
            },
            HelpItem {
                icon: "—",
                command: "/unmute <glob>",
                description: "restore a muted source",
            },
            HelpItem {
                icon: "⫶",
                command: "/mixer",
                description: "source-mixer drawer (mute + pin state)",
            },
        ],
    },
    HelpGroup {
        title: "Brush · paint filters",
        items: &[
            HelpItem {
                icon: "✎",
                command: "/brush",
                description: "selection + inferred filter preview",
            },
            HelpItem {
                icon: "✚",
                command: "/brush-add <event-id>",
                description: "paint an event into the selection",
            },
            HelpItem {
                icon: "—",
                command: "/brush-clear",
                description: "drain the selection",
            },
            HelpItem {
                icon: "⌖",
                command: "/yank",
                description: "apply the inferred filter",
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
        ParsedCommand::Pressure => "/pressure".into(),
        ParsedCommand::Scrub => "/scrub".into(),
        ParsedCommand::Pin(_) => "/pin".into(),
        ParsedCommand::Unpin(_) => "/unpin".into(),
        ParsedCommand::Mute(_) => "/mute".into(),
        ParsedCommand::Unmute(_) => "/unmute".into(),
        ParsedCommand::Mixer => "/mixer".into(),
        ParsedCommand::Brush => "/brush".into(),
        ParsedCommand::BrushAdd(_) => "/brush-add".into(),
        ParsedCommand::BrushClear => "/brush-clear".into(),
        ParsedCommand::Yank => "/yank".into(),
        ParsedCommand::Glossary => "/glossary".into(),
        ParsedCommand::Verbosity(_) => "/verbosity".into(),
        ParsedCommand::VerbosityRaise => "/verbosity +".into(),
        ParsedCommand::VerbosityLower => "/verbosity -".into(),
        ParsedCommand::InspectorToggle { .. } => "/section".into(),
    }
}

fn current_verbosity(handles: &ControllerHandles) -> crate::repl::verbosity::VerbosityLevel {
    handles
        .prompt
        .lock()
        .ok()
        .map(|p| p.verbosity)
        .unwrap_or_default()
}

fn apply_verbosity(handles: &ControllerHandles, level: crate::repl::verbosity::VerbosityLevel) {
    set_holding(handles, true);
    if let Ok(mut prompt) = handles.prompt.lock() {
        prompt.verbosity = level;
    }
    println!("nexus: verbosity set to {}", level.label());
    set_holding(handles, false);
    flush_hold(handles);
}

fn render_brush(handles: &ControllerHandles) {
    set_holding(handles, true);
    let block = match (handles.brush.read(), handles.ring.lock()) {
        (Ok(brush), Ok(ring)) => crate::render::brush_drawer::render_brush_drawer(
            &crate::render::brush_drawer::BrushRenderInput {
                selection: &brush,
                ring: &ring,
                max_rows: 20,
                now: std::time::Instant::now(),
            },
        ),
        _ => "·· /brush: shared state lock poisoned".to_string(),
    };
    print!("{block}");
    set_holding(handles, false);
    flush_hold(handles);
}

fn run_brush_add(handles: &ControllerHandles, arg: &str) {
    let id = match handles.ring.lock() {
        Ok(buf) => match crate::repl::inspect::find_event_by_id_str(&buf, arg) {
            Some(line) => line.id,
            None => {
                eprintln!(
                    "\x1b[38;5;203mnexus: /brush-add: no event matching '{arg}' in ring buffer\x1b[0m"
                );
                return;
            }
        },
        Err(_) => return,
    };
    let added = match handles.brush.write() {
        Ok(mut b) => b.add(id),
        Err(_) => false,
    };
    if added {
        println!(
            "\x1b[1;38;5;141m✚ brushed {arg}\x1b[0m \x1b[38;5;245m· /brush to preview · /yank to apply\x1b[0m"
        );
    } else {
        println!("\x1b[38;5;245m· {arg} is already in the brush selection\x1b[0m");
    }
}

fn run_brush_clear(handles: &ControllerHandles) {
    let n = match handles.brush.write() {
        Ok(mut b) => b.clear(),
        Err(_) => return,
    };
    println!("\x1b[1;38;5;141m✚ brush cleared\x1b[0m \x1b[38;5;245m· {n} event(s) removed\x1b[0m");
}

fn run_yank(handles: &ControllerHandles) {
    let inferred = {
        let brush = match handles.brush.read() {
            Ok(b) => b,
            Err(_) => return,
        };
        let ring = match handles.ring.lock() {
            Ok(r) => r,
            Err(_) => return,
        };
        let resolved: Vec<&crate::stream::event_line::EventLine> = brush
            .as_slice()
            .iter()
            .filter_map(|id| ring.inspect_by_id(*id))
            .collect();
        if resolved.is_empty() {
            eprintln!(
                "\x1b[38;5;245m· /yank: brush is empty — try /brush-add <event-id> first\x1b[0m"
            );
            return;
        }
        infer_from(&resolved)
    };

    if inferred.is_empty() {
        eprintln!(
            "\x1b[38;5;245m· /yank: no common shape across brushed events — narrow the selection\x1b[0m"
        );
        return;
    }

    // Apply each inferred matcher directly to the filter state.
    let mut applied: Vec<String> = Vec::new();
    if let Some(source) = inferred.source.clone()
        && let Ok(mut f) = handles.filter.write()
        && f.set_source_glob(Some(&source)).is_ok()
    {
        applied.push(format!("/source {source}"));
    }
    if let Some(level) = inferred.level_floor
        && let Ok(mut f) = handles.filter.write()
    {
        f.set_level_floor(level);
        applied.push(format!(
            "/level {}",
            match level {
                Severity::Debug => "debug",
                Severity::Info => "info",
                Severity::Warn => "warn",
                Severity::Error => "error",
                Severity::Fatal => "fatal",
            }
        ));
    }
    if let Some(grep) = inferred.grep.clone()
        && let Ok(mut f) = handles.filter.write()
        && f.set_grep(Some(&grep)).is_ok()
    {
        applied.push(format!("/grep {grep}"));
    }

    update_filter_indicator(handles);
    emit_status_ribbon(&handles.filter, &handles.prompt);
    if applied.is_empty() {
        eprintln!(
            "\x1b[38;5;203m· /yank: every inferred matcher was rejected by the filter\x1b[0m"
        );
    } else {
        println!(
            "\x1b[1;38;5;141m✚ yanked filter\x1b[0m \x1b[38;5;245m· applied: {}\x1b[0m",
            applied.join(", ")
        );
    }
}

fn run_pin(handles: &ControllerHandles, arg: &str) {
    match arg.parse::<PinKey>() {
        Ok(key) => {
            let mut pinned = match handles.pinned.write() {
                Ok(p) => p,
                Err(_) => return,
            };
            match pinned.pin(key.clone()) {
                Some(_color) => {
                    println!(
                        "\x1b[1;38;5;141m📌 pinned {key}\x1b[0m \x1b[38;5;245m· bypasses filters · /unpin {key} to remove\x1b[0m"
                    );
                }
                None => {
                    println!("\x1b[38;5;245m· {key} is already pinned\x1b[0m");
                }
            }
        }
        Err(err) => eprintln!("\x1b[38;5;203mnexus: /pin: {err}\x1b[0m"),
    }
}

fn run_unpin(handles: &ControllerHandles, arg: &str) {
    match arg.parse::<PinKey>() {
        Ok(key) => {
            let mut pinned = match handles.pinned.write() {
                Ok(p) => p,
                Err(_) => return,
            };
            if pinned.unpin(&key) {
                println!("\x1b[1;38;5;141m📌 unpinned {key}\x1b[0m");
            } else {
                println!("\x1b[38;5;245m· {key} was not pinned\x1b[0m");
            }
        }
        Err(err) => eprintln!("\x1b[38;5;203mnexus: /unpin: {err}\x1b[0m"),
    }
}

fn run_mute(handles: &ControllerHandles, arg: &str) {
    let mut muted = match handles.muted.write() {
        Ok(m) => m,
        Err(_) => return,
    };
    match muted.mute(arg) {
        Ok(true) => println!(
            "\x1b[1;38;5;215m🔇 muted {arg}\x1b[0m \x1b[38;5;245m· /unmute {arg} to restore\x1b[0m"
        ),
        Ok(false) => println!("\x1b[38;5;245m· {arg} is already muted\x1b[0m"),
        Err(err) => eprintln!("\x1b[38;5;203mnexus: /mute: {err}\x1b[0m"),
    }
}

fn run_unmute(handles: &ControllerHandles, arg: &str) {
    let mut muted = match handles.muted.write() {
        Ok(m) => m,
        Err(_) => return,
    };
    if muted.unmute(arg) {
        println!("\x1b[1;38;5;215m🔇 unmuted {arg}\x1b[0m");
    } else {
        println!("\x1b[38;5;245m· {arg} was not muted\x1b[0m");
    }
}

fn render_mixer(handles: &ControllerHandles) {
    set_holding(handles, true);
    let snap = handles
        .rate_snapshot
        .lock()
        .map(|s| s.clone())
        .unwrap_or_default();
    let muted_guard = handles.muted.read().ok();
    let pinned_guard = handles.pinned.read().ok();
    let default_muted = crate::stream::muted_sources::MutedSources::new();
    let default_pinned = crate::stream::pinned_correlations::PinnedSet::new();
    let block = crate::render::source_mixer::render_mixer_drawer(
        &crate::render::source_mixer::MixerRenderInput {
            snapshot: &snap,
            muted: muted_guard.as_deref().unwrap_or(&default_muted),
            pinned: pinned_guard.as_deref().unwrap_or(&default_pinned),
            max_rows: 30,
            now: std::time::Instant::now(),
        },
    );
    print!("{block}");
    set_holding(handles, false);
    flush_hold(handles);
}

fn render_pressure(handles: &ControllerHandles) {
    set_holding(handles, true);
    let held = handles
        .hold_queue
        .lock()
        .map(|q| q.pending() as u32)
        .unwrap_or(0);
    let snap = handles
        .rate_snapshot
        .lock()
        .map(|s| s.clone())
        .unwrap_or_default();
    let block = crate::render::pressure_meter::render_pressure_drawer(
        &crate::render::pressure_meter::PressureRenderInput {
            snapshot: &snap,
            held,
            max_rows: 20,
            now: std::time::Instant::now(),
        },
    );
    print!("{block}");
    set_holding(handles, false);
    flush_hold(handles);
}

fn render_scrub(handles: &ControllerHandles) {
    set_holding(handles, true);
    let block = match handles.ring.lock() {
        Ok(buf) => crate::render::timeline::render_timeline_block(
            &buf,
            crate::render::timeline::DEFAULT_BUCKET_COUNT,
        ),
        Err(_) => "·· /scrub: ring buffer lock poisoned".to_string(),
    };
    print!("{block}");
    set_holding(handles, false);
    flush_hold(handles);
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
