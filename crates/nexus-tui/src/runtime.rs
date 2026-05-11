//! Main runtime loop binding `TerminalGuard`, the SSE client, the render
//! loop, the slash-command controller, and the reedline editor.
//!
//! Concurrent tokio tasks (Constitution X, Parallelism-First):
//! 1. Per-endpoint SSE loops feeding `mpsc<StreamItem>`.
//! 2. Consumer task — drains SSE channel, applies the FR-076 pre-display
//!    pipeline (ring_buffer.push → filter.is_visible → rate_guard →
//!    hold_queue → render).
//! 3. Sparkline tick — keeps prompt redrawn on idle.
//! 4. Controller task — applies slash commands to shared state.
//! 5. Editor task (`spawn_blocking`) — reads input, parses slash
//!    commands, dispatches to controller.

use std::collections::VecDeque;
use std::io::{IsTerminal, Write, stdout};
use std::path::PathBuf;
use std::sync::{Arc, Mutex, RwLock};
use std::time::{Duration, Instant};

use crossterm::cursor::{Hide, Show};
use crossterm::execute;
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;

use crate::controller::{ControllerCommand, ControllerConfig, ControllerHandles, run_controller};
use crate::mouse::capture::{
    MouseSupport, disable_mouse_capture, enable_mouse_capture, should_bypass,
};
use crate::mouse::dispatch::{ClickAction, left_click_action, right_click_action};
use crate::mouse::hover::HoverState;
use crate::mouse::menu::{MenuChoice, render_menu};
use crate::mouse::menu_controller::{MenuController, NavOutcome, OpenMenu};
use crate::mouse::targets::{ClickRegistry, ClickRowDecision, ClickTarget, click_row_after_print};
use crate::render::brand::render_brand;
use crate::render::cursor::{CursorChoreography, render_ambient_above_prompt};
use crate::render::event_line::{RenderConfig, render_event_line, render_event_line_with_targets};
use crate::render::status_ribbon::emit_status_ribbon;
use crate::repl::ansi::{ColorDepth, detect_color_depth};
use crate::repl::editor::{EditorOutcome, MouseHooks, build_editor_with_mouse, read_one};
use crate::repl::mouse_edit_mode::{MenuFocus, MenuKey};
use crate::repl::prompt::{AmbientPrompt, ConnectionHealth, PromptState};
use crate::repl::slash::{ParsedCommand, parse_slash};
use crate::stream::client::{SseClientConfig, StreamItem, spawn_endpoint_loop};
use crate::stream::correlation_threader::{CorrelationThreader, ThreadRelation};
use crate::stream::event_id::RingBufferCapacity;
use crate::stream::filter::FilterState;
use crate::stream::filter::FollowTarget;
use crate::stream::hold_queue::{EnqueueResult, HoldQueue};
use crate::stream::rate_guard::{RateGuard, RateGuardDecision};
use crate::stream::ring_buffer::RingBuffer;
use crate::stream::severity::Severity;
use crate::stream::significance::Significance;
use crate::stream::startup_phase::{
    BootDisplayDecision, BootState, SettleReport, decide as startup_decide, maybe_settle_on_quiet,
};

const DEFAULT_RING_BUFFER_CAPACITY: usize = 50_000;
const SPARKLINE_TICK: Duration = Duration::from_secs(1);
const CRITICAL_BORDER_DEBOUNCE: Duration = Duration::from_secs(5);
const STARTUP_PROBE_TIMEOUT: Duration = Duration::from_secs(2);

#[derive(Debug)]
pub enum ExitReason {
    OperatorQuit,
    HostUnreachable(String),
}

#[derive(Debug, Clone)]
pub struct RuntimeConfig {
    pub host_url: String,
    pub ring_buffer_capacity: usize,
    pub level_floor: Severity,
    pub probe_host_on_startup: bool,
    pub cursor_choreography: bool,
    pub enable_mouse: bool,
    pub ascii_glyphs: bool,
    /// When true, spawn the `nexus-dnn` host as a child process before
    /// attaching the TUI. The child is killed when the TUI exits.
    pub spawn_host: bool,
    /// Optional override path to the `nexus-dnn` binary; ignored unless
    /// `spawn_host` is true. Default behaviour searches for the binary
    /// alongside the current `nexus` executable.
    pub host_bin: Option<PathBuf>,
}

impl Default for RuntimeConfig {
    fn default() -> Self {
        Self {
            host_url: "http://127.0.0.1:3000".into(),
            ring_buffer_capacity: DEFAULT_RING_BUFFER_CAPACITY,
            level_floor: Severity::Info,
            probe_host_on_startup: true,
            cursor_choreography: false,
            enable_mouse: true,
            ascii_glyphs: false,
            spawn_host: false,
            host_bin: None,
        }
    }
}

pub async fn run(cfg: RuntimeConfig) -> anyhow::Result<ExitReason> {
    let _host_child = if cfg.spawn_host {
        match crate::host_child::spawn_host_and_wait(cfg.host_bin.as_deref(), &cfg.host_url).await {
            Ok(handle) => {
                eprintln!(
                    "nexus: host ready at {} — log: {}",
                    cfg.host_url,
                    handle.log_path().display()
                );
                Some(handle)
            }
            Err(err) => {
                return Ok(ExitReason::HostUnreachable(format!(
                    "--with-host failed: {err}"
                )));
            }
        }
    } else {
        None
    };

    if cfg.probe_host_on_startup
        && _host_child.is_none()
        && let Err(err) = probe_host(&cfg.host_url).await
    {
        return Ok(ExitReason::HostUnreachable(err));
    }

    let depth = detect_color_depth();
    let _ = print_brand(depth);

    let click_registry = Arc::new(Mutex::new(ClickRegistry::default()));
    let hover_state = Arc::new(HoverState::new());
    let prompt = AmbientPrompt::new().with_click_registry(Arc::clone(&click_registry));
    let prompt_state = prompt.handle();

    let capacity = RingBufferCapacity::new(cfg.ring_buffer_capacity)
        .map_err(|e| anyhow::anyhow!("invalid ring buffer capacity: {e}"))?;
    let ring = Arc::new(Mutex::new(RingBuffer::new(capacity)));

    let mut initial_filter = FilterState::default();
    initial_filter.set_level_floor(cfg.level_floor);
    let filter = Arc::new(RwLock::new(initial_filter));
    let hold_queue = Arc::new(Mutex::new(HoldQueue::default()));

    let (tx, rx) = mpsc::channel::<StreamItem>(1024);
    let shutdown = CancellationToken::new();

    for endpoint in SseClientConfig::for_host(&cfg.host_url).endpoints {
        spawn_endpoint_loop(endpoint, tx.clone(), shutdown.clone());
    }
    drop(tx);

    let rate_snapshot: Arc<Mutex<crate::stream::rate_guard::RateGuardSnapshot>> =
        Arc::new(Mutex::new(Default::default()));
    let pinned: Arc<RwLock<crate::stream::pinned_correlations::PinnedSet>> =
        Arc::new(RwLock::new(Default::default()));
    let muted: Arc<RwLock<crate::stream::muted_sources::MutedSources>> =
        Arc::new(RwLock::new(Default::default()));
    let brush: Arc<RwLock<crate::stream::brush_selection::BrushSelection>> =
        Arc::new(RwLock::new(Default::default()));
    let render_handle = tokio::spawn(consumer_loop(
        rx,
        Arc::clone(&ring),
        Arc::clone(&prompt_state),
        Arc::clone(&filter),
        Arc::clone(&hold_queue),
        Arc::clone(&click_registry),
        Arc::clone(&hover_state),
        Arc::clone(&rate_snapshot),
        Arc::clone(&pinned),
        Arc::clone(&muted),
        depth,
        cfg.cursor_choreography,
        cfg.ascii_glyphs,
    ));
    let sparkline_handle =
        tokio::spawn(sparkline_loop(Arc::clone(&prompt_state), shutdown.clone()));

    let (handles, controller_rx) = ControllerHandles::new(
        Arc::clone(&filter),
        Arc::clone(&hold_queue),
        Arc::clone(&prompt_state),
        Arc::clone(&ring),
        Arc::clone(&rate_snapshot),
        Arc::clone(&pinned),
        Arc::clone(&muted),
        Arc::clone(&brush),
        shutdown.clone(),
    );
    let controller_cfg = ControllerConfig {
        host_url: cfg.host_url.clone(),
    };
    let controller_handles = handles.clone();
    let controller_handle = tokio::spawn(async move {
        run_controller(controller_cfg, controller_handles, controller_rx).await;
    });

    let mouse_focus = MenuFocus::new();
    let (mouse_tx, mouse_rx) = mpsc::channel::<crossterm::event::MouseEvent>(256);
    let (menu_key_tx, menu_key_rx) = mpsc::channel::<MenuKey>(32);
    let mouse_hooks = if cfg.enable_mouse {
        Some(MouseHooks {
            mouse_tx: mouse_tx.clone(),
            menu_focus: mouse_focus.clone(),
            menu_key_tx: menu_key_tx.clone(),
        })
    } else {
        None
    };

    let mouse_support = if cfg.enable_mouse {
        let mut out = stdout().lock();
        match enable_mouse_capture(&mut out) {
            Ok(support) => support,
            Err(err) => {
                eprintln!("·· mouse capture unavailable: {err}");
                MouseSupport::Disabled
            }
        }
    } else {
        MouseSupport::Disabled
    };
    if mouse_support == MouseSupport::UnknownTerminal {
        eprintln!("·· mouse capture: TERM looks multiplexed (screen/tmux); keyboard fallback only");
    }

    let mouse_dispatch_handle = tokio::spawn(mouse_dispatcher_loop(
        mouse_rx,
        menu_key_rx,
        mouse_focus.clone(),
        Arc::clone(&click_registry),
        Arc::clone(&hover_state),
        Arc::clone(&filter),
        handles.command_tx.clone(),
        shutdown.clone(),
    ));

    let editor_outcome =
        run_editor_blocking(prompt.clone(), handles, mouse_hooks, Arc::clone(&ring)).await;

    shutdown.cancel();
    drop(mouse_tx);
    drop(menu_key_tx);
    let _ = render_handle.await;
    let _ = sparkline_handle.await;
    let _ = controller_handle.await;
    let _ = mouse_dispatch_handle.await;
    if mouse_support == MouseSupport::Enabled {
        let mut out = stdout().lock();
        let _ = disable_mouse_capture(&mut out);
    }
    let _ = execute!(stdout(), Show);

    match editor_outcome {
        Ok(()) => Ok(ExitReason::OperatorQuit),
        Err(err) => Err(err),
    }
}

async fn run_editor_blocking(
    prompt: AmbientPrompt,
    handles: ControllerHandles,
    mouse_hooks: Option<MouseHooks>,
    ring: Arc<Mutex<RingBuffer>>,
) -> anyhow::Result<()> {
    let mut editor_opt: Option<Reedline> = match build_editor_with_mouse(mouse_hooks, Some(ring)) {
        Ok(e) => Some(e),
        Err(err) => {
            eprintln!("nexus: failed to initialise editor: {err}");
            return Err(err);
        }
    };
    loop {
        let mut editor = editor_opt
            .take()
            .ok_or_else(|| anyhow::anyhow!("editor dropped"))?;
        let prompt_clone = prompt.clone();
        let join = tokio::task::spawn_blocking(move || {
            let outcome = read_one(&mut editor, &prompt_clone);
            (editor, outcome)
        })
        .await;
        let (returned_editor, outcome_res) = match join {
            Ok(pair) => pair,
            Err(err) => return Err(anyhow::anyhow!(err)),
        };
        editor_opt = Some(returned_editor);
        match outcome_res {
            Ok(EditorOutcome::Line(line)) => {
                let parsed = parse_slash(&line);
                handles
                    .command_tx
                    .send(ControllerCommand::SubmitRaw(parsed))
                    .await
                    .ok();
            }
            Ok(EditorOutcome::Interrupt) => {
                handles
                    .command_tx
                    .send(ControllerCommand::Interrupt)
                    .await
                    .ok();
            }
            Ok(EditorOutcome::Quit) => {
                handles.command_tx.send(ControllerCommand::Quit).await.ok();
                return Ok(());
            }
            Err(err) => return Err(err.into()),
        }
    }
}

#[allow(clippy::too_many_arguments)]
async fn consumer_loop(
    mut rx: mpsc::Receiver<StreamItem>,
    ring: Arc<Mutex<RingBuffer>>,
    prompt: Arc<Mutex<PromptState>>,
    filter: Arc<RwLock<FilterState>>,
    hold_queue: Arc<Mutex<HoldQueue>>,
    click_registry: Arc<Mutex<ClickRegistry>>,
    hover: Arc<HoverState>,
    rate_snapshot: Arc<Mutex<crate::stream::rate_guard::RateGuardSnapshot>>,
    pinned: Arc<RwLock<crate::stream::pinned_correlations::PinnedSet>>,
    muted: Arc<RwLock<crate::stream::muted_sources::MutedSources>>,
    depth: ColorDepth,
    cursor_choreography: bool,
    ascii_glyphs: bool,
) {
    let mut rate_guard = RateGuard::default();
    let mut second_window_count: u32 = 0;
    let mut second_window_start = Instant::now();
    let mut history: VecDeque<u32> = VecDeque::with_capacity(60);
    let mut last_critical_border = Instant::now() - CRITICAL_BORDER_DEBOUNCE;
    let mut last_condensed_at: Option<Instant> = None;
    let mut startup_phase = BootState::new(Instant::now());
    let mut threader = CorrelationThreader::default();
    let choreo = if cursor_choreography {
        Some(CursorChoreography::default())
    } else {
        None
    };

    loop {
        let item = tokio::select! {
            biased;
            item = rx.recv() => match item {
                Some(item) => item,
                None => return,
            },
            _ = tokio::time::sleep(Duration::from_millis(500)),
                if startup_phase.is_booting() =>
            {
                let now = Instant::now();
                if matches!(
                    maybe_settle_on_quiet(&startup_phase, now),
                    Some(BootDisplayDecision::SettleOnly)
                ) && let Some(report) = startup_phase.settle(now)
                    && report.folded > 0
                {
                    print_curtain_line(&report);
                    emit_status_ribbon(&filter, &prompt);
                }
                continue;
            }
        };
        match item {
            StreamItem::Line(line) => {
                if let Ok(mut state) = prompt.lock() {
                    state.connection_health = ConnectionHealth::Healthy;
                }
                {
                    let mut buf = ring.lock().unwrap_or_else(|p| p.into_inner());
                    buf.push(line.clone());
                }

                // Curtain Up — capture boot-phase noise without scrolling
                // it onto the operator's screen.
                let now_for_phase = Instant::now();
                match startup_decide(&line, &startup_phase) {
                    BootDisplayDecision::Suppress => {
                        startup_phase.record_event(now_for_phase);
                        continue;
                    }
                    BootDisplayDecision::SettleAndRender => {
                        if let Some(report) = startup_phase.settle(now_for_phase) {
                            print_curtain_line(&report);
                            emit_status_ribbon(&filter, &prompt);
                        }
                    }
                    BootDisplayDecision::Render | BootDisplayDecision::SettleOnly => {}
                }

                // Cluster-B precedence: pin > mute > filter.
                let is_pinned = pinned.read().map(|p| p.matches(&line)).unwrap_or(false);
                if !is_pinned {
                    let is_muted = muted.read().map(|m| m.matches(&line)).unwrap_or(false);
                    if is_muted {
                        continue;
                    }
                    let visible = filter.read().map(|f| f.is_visible(&line)).unwrap_or(false);
                    if !visible {
                        continue;
                    }
                }
                let now = Instant::now();
                let decision = rate_guard.observe(&line.source, &line.summary, now);
                let to_render = match decision {
                    RateGuardDecision::Render => Some(line.clone()),
                    RateGuardDecision::Repeat { count, summary } => {
                        eprintln!(
                            "\x1b[1;38;5;141m·· repeat ×{count}\x1b[0m  \x1b[38;5;252m{summary}\x1b[0m"
                        );
                        None
                    }
                    RateGuardDecision::Condensed { source, dropped } => {
                        eprintln!(
                            "\x1b[1;38;5;215m≫\x1b[0m \x1b[1;38;5;215m{source}\x1b[0m  \x1b[38;5;252m{dropped} event(s) condensed\x1b[0m"
                        );
                        last_condensed_at = Some(now);
                        if let Ok(mut state) = prompt.lock() {
                            state.condensing = true;
                        }
                        None
                    }
                };
                if let Some(at) = last_condensed_at
                    && now.duration_since(at) >= CRITICAL_BORDER_DEBOUNCE
                {
                    if let Ok(mut state) = prompt.lock() {
                        state.condensing = false;
                    }
                    last_condensed_at = None;
                }
                let Some(render_line) = to_render else {
                    continue;
                };

                let held = match hold_queue.lock() {
                    Ok(mut q) => match q.try_enqueue(render_line) {
                        EnqueueResult::Held | EnqueueResult::Overflow => true,
                        EnqueueResult::Passthrough(line) => {
                            render_visible(
                                &line,
                                depth,
                                now,
                                &mut last_critical_border,
                                choreo.as_ref(),
                                &click_registry,
                                &hover,
                                ascii_glyphs,
                                &mut threader,
                            );
                            false
                        }
                    },
                    Err(_) => false,
                };
                let _ = held;

                second_window_count = second_window_count.saturating_add(1);
                if second_window_start.elapsed() >= SPARKLINE_TICK {
                    push_history(&mut history, second_window_count);
                    update_prompt_history(&prompt, &history);
                    update_prompt_pressure(&prompt, &hold_queue, &rate_guard, second_window_count);
                    if let Ok(mut snap) = rate_snapshot.lock() {
                        *snap = rate_guard.snapshot();
                    }
                    second_window_count = 0;
                    second_window_start = Instant::now();
                }
            }
            StreamItem::GapDetected {
                endpoint,
                skipped_after,
            } => {
                println!(
                    "\x1b[1;38;5;215m⚠ gap\x1b[0m \x1b[38;5;252mon {endpoint} after id {skipped_after}\x1b[0m"
                );
            }
            StreamItem::ConnectionLost { endpoint, reason } => {
                let was_healthy = prompt
                    .lock()
                    .map(|s| s.connection_health == ConnectionHealth::Healthy)
                    .unwrap_or(false);
                eprintln!(
                    "\x1b[1;38;5;203m◯ {endpoint}\x1b[0m \x1b[38;5;252mdisconnected — {reason}\x1b[0m"
                );
                if let Ok(mut state) = prompt.lock() {
                    state.connection_health = ConnectionHealth::Disconnected;
                }
                if was_healthy {
                    emit_status_ribbon(&filter, &prompt);
                }
            }
            StreamItem::Reconnected { endpoint } => {
                let was_disconnected = prompt
                    .lock()
                    .map(|s| s.connection_health == ConnectionHealth::Disconnected)
                    .unwrap_or(false);
                eprintln!("\x1b[1;38;5;84m● {endpoint}\x1b[0m \x1b[38;5;252mstream open\x1b[0m");
                if let Ok(mut state) = prompt.lock() {
                    state.connection_health = ConnectionHealth::Healthy;
                }
                if was_disconnected {
                    emit_status_ribbon(&filter, &prompt);
                }
            }
        }
    }
}

#[allow(clippy::too_many_arguments)]
/// Emit the single "curtain rises" line that summarises the boot
/// events folded out of the ambient stream. Skip rendering if there
/// were no folded events (i.e., host came up fully silent).
fn print_curtain_line(report: &SettleReport) {
    let ms = report.duration.as_millis();
    let duration = if ms < 1_000 {
        format!("{ms}ms")
    } else {
        format!("{:.1}s", ms as f64 / 1000.0)
    };
    // Palette: graphite dim brackets + bold blue title + violet count +
    // soft slate duration. ANSI 256 colour codes degrade gracefully on
    // older terminals; the line stays readable even without colour.
    let line = format!(
        "\x1b[38;5;245m╾───\x1b[0m \
         \x1b[1;38;5;75m✦ boot complete\x1b[0m \
         \x1b[38;5;245m·\x1b[0m \
         \x1b[1;38;5;141m{folded} events folded\x1b[0m \
         \x1b[38;5;245m·\x1b[0m \
         \x1b[38;5;252m{duration}\x1b[0m \
         \x1b[38;5;245m───╼\x1b[0m",
        folded = report.folded,
        duration = duration,
    );
    println!("{line}");
}

#[allow(clippy::too_many_arguments)]
fn render_visible(
    line: &crate::stream::event_line::EventLine,
    depth: ColorDepth,
    now: Instant,
    last_critical_border: &mut Instant,
    choreo: Option<&CursorChoreography>,
    click_registry: &Arc<Mutex<ClickRegistry>>,
    hover: &Arc<HoverState>,
    ascii_glyphs: bool,
    threader: &mut CorrelationThreader,
) {
    let critical_border = matches!(line.significance, Significance::Critical)
        && now.duration_since(*last_critical_border) >= CRITICAL_BORDER_DEBOUNCE;
    if critical_border {
        *last_critical_border = now;
    }
    let hover_target = hover.snapshot().1;
    let thread_leaf = matches!(
        threader.relationship(line, now),
        ThreadRelation::Leaf { .. }
    );
    let cfg = RenderConfig::new(depth, critical_border)
        .with_hover_target(hover_target)
        .with_thread_leaf(thread_leaf)
        .with_ascii_glyphs(ascii_glyphs);
    let layout = render_event_line_with_targets(line, &cfg);
    let rendered = render_event_line(line, &cfg);
    let old_row = cursor_row();
    match choreo {
        Some(choreo) => {
            let mut out = stdout().lock();
            let _ = render_ambient_above_prompt(&mut out, choreo, &rendered);
        }
        None => {
            println!("{rendered}");
            let _ = stdout().flush();
        }
    }
    let new_row = cursor_row();
    register_targets(click_registry, old_row, new_row, layout.targets);
    threader.note_rendered(line, now);
}

fn cursor_row() -> Option<u16> {
    crossterm::cursor::position().ok().map(|(_, row)| row)
}

fn register_targets(
    click_registry: &Arc<Mutex<ClickRegistry>>,
    old_row: Option<u16>,
    new_row: Option<u16>,
    targets: Vec<(crate::mouse::targets::ClickTarget, std::ops::Range<u16>)>,
) {
    if targets.is_empty() {
        return;
    }
    let decision = click_row_after_print(old_row, new_row);
    let Ok(mut reg) = click_registry.lock() else {
        return;
    };
    let line_row = match decision {
        ClickRowDecision::Advanced { line_row } => line_row,
        ClickRowDecision::Scrolled { line_row } => {
            reg.shift_rows_up(1);
            line_row
        }
        ClickRowDecision::Unknown => return,
    };
    for (target, range) in targets {
        reg.register(line_row, range, target);
    }
}

async fn sparkline_loop(prompt: Arc<Mutex<PromptState>>, shutdown: CancellationToken) {
    let mut ticker = tokio::time::interval(SPARKLINE_TICK);
    ticker.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Skip);
    loop {
        tokio::select! {
            _ = shutdown.cancelled() => return,
            _ = ticker.tick() => {
                let mut state = prompt.lock().unwrap_or_else(|p| p.into_inner());
                let _ = &mut *state;
            }
        }
    }
}

fn push_history(history: &mut VecDeque<u32>, count: u32) {
    if history.len() == 60 {
        history.pop_front();
    }
    history.push_back(count);
}

fn update_prompt_history(prompt: &Arc<Mutex<PromptState>>, history: &VecDeque<u32>) {
    let snapshot: Vec<u32> = history.iter().copied().collect();
    let samples = crate::render::sparkline::SparklineSamples::from_per_second(snapshot);
    let mut state = prompt.lock().unwrap_or_else(|p| p.into_inner());
    state.sparkline = samples;
}

fn update_prompt_pressure(
    prompt: &Arc<Mutex<PromptState>>,
    hold_queue: &Arc<Mutex<HoldQueue>>,
    rate_guard: &RateGuard,
    last_second_count: u32,
) {
    let held = hold_queue.lock().map(|q| q.pending() as u32).unwrap_or(0);
    let snapshot = crate::repl::prompt::PressureSnapshot {
        held,
        dropped: rate_guard.cumulative_dropped(),
        ingest_per_sec: last_second_count as f32,
    };
    if let Ok(mut state) = prompt.lock() {
        state.pressure = snapshot;
    }
}

fn print_brand(depth: ColorDepth) -> std::io::Result<()> {
    let mut out = stdout().lock();
    if !out.is_terminal() {
        return Ok(());
    }
    let _ = execute!(out, Hide);
    out.write_all(render_brand(depth).as_bytes())?;
    out.write_all(startup_hint().as_bytes())?;
    out.flush()?;
    Ok(())
}

fn startup_hint() -> &'static str {
    "\x1b[2m\x1b[38;5;245m  ▸ tab to complete · /help for commands · /level warn to filter · Ctrl+D to exit\x1b[0m\n\n"
}

async fn probe_host(base: &str) -> Result<(), String> {
    let url = format!("{}/api/host/info", base.trim_end_matches('/'));
    let client = reqwest::Client::builder()
        .timeout(STARTUP_PROBE_TIMEOUT)
        .build()
        .map_err(|e| format!("client build failed: {e}"))?;
    match client.get(&url).send().await {
        Ok(r) if r.status().is_success() => Ok(()),
        Ok(r) => Err(format!("host responded {}", r.status())),
        Err(e) => Err(format!("could not reach host at {base}: {e}")),
    }
}

use reedline::Reedline;

#[allow(clippy::too_many_arguments)]
async fn mouse_dispatcher_loop(
    mut mouse_rx: mpsc::Receiver<crossterm::event::MouseEvent>,
    mut menu_key_rx: mpsc::Receiver<MenuKey>,
    menu_focus: MenuFocus,
    click_registry: Arc<Mutex<ClickRegistry>>,
    hover_state: Arc<HoverState>,
    filter: Arc<RwLock<FilterState>>,
    command_tx: mpsc::Sender<ControllerCommand>,
    shutdown: CancellationToken,
) {
    use crossterm::event::{MouseButton, MouseEventKind};

    let mut menu_controller = MenuController::default();

    loop {
        tokio::select! {
            _ = shutdown.cancelled() => break,
            maybe_event = mouse_rx.recv() => {
                let Some(event) = maybe_event else { break };
                if should_bypass(&event) {
                    if let Ok(reg) = click_registry.lock() {
                        hover_state.observe(event.row, event.column, &reg);
                    }
                    continue;
                }
                match event.kind {
                    MouseEventKind::Moved | MouseEventKind::Drag(_) => {
                        if let Ok(reg) = click_registry.lock() {
                            hover_state.observe(event.row, event.column, &reg);
                        }
                    }
                    MouseEventKind::Down(MouseButton::Left) => {
                        let target = lookup_target(&click_registry, event.row, event.column);
                        if let Some(target) = target {
                            let current_source = current_source_filter(&filter);
                            let action = left_click_action(&target, current_source.as_deref());
                            dispatch_action(action, &command_tx).await;
                        }
                    }
                    MouseEventKind::Down(MouseButton::Right) => {
                        if menu_focus.is_open() {
                            close_menu(&mut menu_controller, &menu_focus);
                        }
                        if let Some(target) = lookup_target(&click_registry, event.row, event.column) {
                            let action = right_click_action(&target);
                            if let ClickAction::OpenContextMenu(t) = action {
                                let opened = menu_controller
                                    .open(t, (event.row, event.column))
                                    .cloned();
                                if let Some(open) = opened {
                                    menu_focus.open();
                                    print_menu_block(&open, 0);
                                }
                            }
                        }
                    }
                    _ => {}
                }
            }
            maybe_key = menu_key_rx.recv() => {
                let Some(key) = maybe_key else { break };
                if !menu_focus.is_open() {
                    continue;
                }
                let prev_height = menu_controller
                    .snapshot()
                    .map(|m| m.items.len())
                    .unwrap_or(0);
                match key {
                    MenuKey::Up => {
                        menu_controller.move_up();
                        if let Some(open) = menu_controller.snapshot().cloned() {
                            print_menu_block(&open, prev_height);
                        }
                    }
                    MenuKey::Down => {
                        menu_controller.move_down();
                        if let Some(open) = menu_controller.snapshot().cloned() {
                            print_menu_block(&open, prev_height);
                        }
                    }
                    MenuKey::Enter => {
                        let outcome = menu_controller.confirm();
                        clear_menu_block(prev_height);
                        menu_focus.close();
                        if let NavOutcome::Selected(choice, target) = outcome {
                            let cmd = menu_choice_to_command(&choice, &target, &filter);
                            if let Some(parsed) = cmd {
                                let _ = command_tx
                                    .send(ControllerCommand::Submit(parsed))
                                    .await;
                            }
                        }
                    }
                    MenuKey::Esc => {
                        menu_controller.cancel();
                        clear_menu_block(prev_height);
                        menu_focus.close();
                    }
                }
            }
        }
    }
}

fn lookup_target(registry: &Arc<Mutex<ClickRegistry>>, row: u16, col: u16) -> Option<ClickTarget> {
    let reg = registry.lock().ok()?;
    reg.lookup(row, col)
}

fn current_source_filter(filter: &Arc<RwLock<FilterState>>) -> Option<String> {
    filter
        .read()
        .ok()
        .and_then(|f| f.source_glob_text().map(str::to_string))
}

async fn dispatch_action(action: ClickAction, command_tx: &mpsc::Sender<ControllerCommand>) {
    match action {
        ClickAction::Command(parsed) => {
            let _ = command_tx.send(ControllerCommand::Submit(parsed)).await;
        }
        ClickAction::OpenContextMenu(_) | ClickAction::Noop => {}
    }
}

fn close_menu(controller: &mut MenuController, focus: &MenuFocus) {
    let height = controller.snapshot().map(|m| m.items.len()).unwrap_or(0);
    controller.cancel();
    clear_menu_block(height);
    focus.close();
}

fn print_menu_block(open: &OpenMenu, prev_height: usize) {
    let mut out = stdout().lock();
    if prev_height > 0 {
        for _ in 0..prev_height {
            let _ = write!(out, "\x1b[F\x1b[2K");
        }
    }
    let rendered = render_menu(&open.items, open.selected);
    let _ = out.write_all(rendered.as_bytes());
    let _ = out.flush();
}

fn clear_menu_block(prev_height: usize) {
    if prev_height == 0 {
        return;
    }
    let mut out = stdout().lock();
    for _ in 0..prev_height {
        let _ = write!(out, "\x1b[F\x1b[2K");
    }
    let _ = out.flush();
}

fn menu_choice_to_command(
    choice: &MenuChoice,
    target: &ClickTarget,
    filter: &Arc<RwLock<FilterState>>,
) -> Option<ParsedCommand> {
    match (choice, target) {
        (MenuChoice::Inspect, ClickTarget::EventLineBody { event_id })
        | (MenuChoice::Inspect, ClickTarget::InspectorHeading { event_id }) => {
            Some(ParsedCommand::Inspect(format!("{event_id}")))
        }
        (MenuChoice::FilterToSource, ClickTarget::SourceLabel { source }) => {
            let current = current_source_filter(filter);
            if current.as_deref() == Some(source.as_str()) {
                Some(ParsedCommand::ClearFilter)
            } else {
                Some(ParsedCommand::Source(source.clone()))
            }
        }
        (MenuChoice::FilterToSource, _) => None,
        (MenuChoice::FollowRun, ClickTarget::RunIdReference { run_id }) => {
            Some(ParsedCommand::Follow(FollowTarget::Run(run_id.clone())))
        }
        (MenuChoice::FollowRun, _) => None,
        (MenuChoice::ClearFilter, _) => Some(ParsedCommand::ClearFilter),
        (MenuChoice::OpenInDesktop, _) => None,
        (MenuChoice::CopyLine | MenuChoice::CopyRawPayload, _) => None,
        (MenuChoice::Cancel, _) => None,
        (MenuChoice::Inspect, _) => None,
    }
}
