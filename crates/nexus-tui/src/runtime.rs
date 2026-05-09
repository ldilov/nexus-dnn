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
use std::sync::{Arc, Mutex, RwLock};
use std::time::{Duration, Instant};

use crossterm::cursor::{Hide, Show};
use crossterm::execute;
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;

use crate::controller::{ControllerCommand, ControllerConfig, ControllerHandles, run_controller};
use crate::render::brand::render_brand;
use crate::render::cursor::{CursorChoreography, render_ambient_above_prompt};
use crate::render::event_line::{RenderConfig, render_event_line};
use crate::repl::ansi::{ColorDepth, detect_color_depth};
use crate::repl::editor::{EditorOutcome, build_editor, read_one};
use crate::repl::prompt::{AmbientPrompt, PromptState};
use crate::repl::slash::parse_slash;
use crate::stream::client::{SseClientConfig, StreamItem, spawn_endpoint_loop};
use crate::stream::event_id::RingBufferCapacity;
use crate::stream::filter::FilterState;
use crate::stream::hold_queue::{EnqueueResult, HoldQueue};
use crate::stream::rate_guard::{RateGuard, RateGuardDecision};
use crate::stream::ring_buffer::RingBuffer;
use crate::stream::severity::Severity;
use crate::stream::significance::Significance;

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
}

impl Default for RuntimeConfig {
    fn default() -> Self {
        Self {
            host_url: "http://127.0.0.1:7878".into(),
            ring_buffer_capacity: DEFAULT_RING_BUFFER_CAPACITY,
            level_floor: Severity::Info,
            probe_host_on_startup: true,
            cursor_choreography: false,
        }
    }
}

pub async fn run(cfg: RuntimeConfig) -> anyhow::Result<ExitReason> {
    if cfg.probe_host_on_startup
        && let Err(err) = probe_host(&cfg.host_url).await
    {
        return Ok(ExitReason::HostUnreachable(err));
    }

    let depth = detect_color_depth();
    let _ = print_brand(depth);

    let prompt = AmbientPrompt::new();
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

    let render_handle = tokio::spawn(consumer_loop(
        rx,
        Arc::clone(&ring),
        Arc::clone(&prompt_state),
        Arc::clone(&filter),
        Arc::clone(&hold_queue),
        depth,
        cfg.cursor_choreography,
    ));
    let sparkline_handle =
        tokio::spawn(sparkline_loop(Arc::clone(&prompt_state), shutdown.clone()));

    let (handles, controller_rx) = ControllerHandles::new(
        Arc::clone(&filter),
        Arc::clone(&hold_queue),
        Arc::clone(&prompt_state),
        Arc::clone(&ring),
        shutdown.clone(),
    );
    let controller_cfg = ControllerConfig {
        host_url: cfg.host_url.clone(),
    };
    let controller_handles = handles.clone();
    let controller_handle = tokio::spawn(async move {
        run_controller(controller_cfg, controller_handles, controller_rx).await;
    });

    let editor_outcome = run_editor_blocking(prompt.clone(), handles).await;

    shutdown.cancel();
    let _ = render_handle.await;
    let _ = sparkline_handle.await;
    let _ = controller_handle.await;
    let _ = execute!(stdout(), Show);

    match editor_outcome {
        Ok(()) => Ok(ExitReason::OperatorQuit),
        Err(err) => Err(err),
    }
}

async fn run_editor_blocking(
    prompt: AmbientPrompt,
    handles: ControllerHandles,
) -> anyhow::Result<()> {
    let mut editor_opt: Option<Reedline> = match build_editor() {
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

async fn consumer_loop(
    mut rx: mpsc::Receiver<StreamItem>,
    ring: Arc<Mutex<RingBuffer>>,
    prompt: Arc<Mutex<PromptState>>,
    filter: Arc<RwLock<FilterState>>,
    hold_queue: Arc<Mutex<HoldQueue>>,
    depth: ColorDepth,
    cursor_choreography: bool,
) {
    let mut rate_guard = RateGuard::default();
    let mut second_window_count: u32 = 0;
    let mut second_window_start = Instant::now();
    let mut history: VecDeque<u32> = VecDeque::with_capacity(60);
    let mut last_critical_border = Instant::now() - CRITICAL_BORDER_DEBOUNCE;
    let mut last_condensed_at: Option<Instant> = None;
    let choreo = if cursor_choreography {
        Some(CursorChoreography::default())
    } else {
        None
    };

    while let Some(item) = rx.recv().await {
        match item {
            StreamItem::Line(line) => {
                {
                    let mut buf = ring.lock().unwrap_or_else(|p| p.into_inner());
                    buf.push(line.clone());
                }
                let visible = filter.read().map(|f| f.is_visible(&line)).unwrap_or(false);
                if !visible {
                    continue;
                }
                let now = Instant::now();
                let decision = rate_guard.observe(&line.source, &line.summary, now);
                let to_render = match decision {
                    RateGuardDecision::Render => Some(line.clone()),
                    RateGuardDecision::Repeat { count, summary } => {
                        eprintln!("·· repeat ×{count}: {summary}");
                        None
                    }
                    RateGuardDecision::Condensed { source, dropped } => {
                        eprintln!("≫ {source}: {dropped} event(s) condensed");
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
                    second_window_count = 0;
                    second_window_start = Instant::now();
                }
            }
            StreamItem::GapDetected {
                endpoint,
                skipped_after,
            } => {
                println!("·· gap detected on {endpoint} after id {skipped_after}");
            }
            StreamItem::ConnectionLost { endpoint, reason } => {
                eprintln!("·· {endpoint} disconnected: {reason}");
            }
            StreamItem::Reconnected { endpoint } => {
                eprintln!("·· {endpoint} stream open");
            }
        }
    }
}

fn render_visible(
    line: &crate::stream::event_line::EventLine,
    depth: ColorDepth,
    now: Instant,
    last_critical_border: &mut Instant,
    choreo: Option<&CursorChoreography>,
) {
    let critical_border = matches!(line.significance, Significance::Critical)
        && now.duration_since(*last_critical_border) >= CRITICAL_BORDER_DEBOUNCE;
    if critical_border {
        *last_critical_border = now;
    }
    let cfg = RenderConfig {
        color_depth: depth,
        critical_border,
    };
    let rendered = render_event_line(line, &cfg);
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

fn print_brand(depth: ColorDepth) -> std::io::Result<()> {
    let mut out = stdout().lock();
    if !out.is_terminal() {
        return Ok(());
    }
    let _ = execute!(out, Hide);
    out.write_all(render_brand(depth).as_bytes())?;
    out.flush()?;
    Ok(())
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
