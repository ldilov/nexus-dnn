//! SSE client for the unified TUI event stream.
//!
//! Connects to a host SSE endpoint, applies exponential-backoff reconnect
//! with `Last-Event-ID` resume, detects gaps on reconnect, and forwards
//! parsed events through a tokio mpsc channel.
//!
//! `ReconnectBackoff` and `ResumeState` are split out as pure types so
//! they can be unit-tested without an HTTP transport.

use std::time::Duration;

use eventsource_stream::Eventsource;
use futures_util::stream::StreamExt;
use reqwest::header::{HeaderName, HeaderValue};
use tokio::sync::mpsc;
use tokio_util::sync::CancellationToken;

use crate::stream::event_line::EventLine;

const BACKOFF_INITIAL: Duration = Duration::from_millis(100);
const BACKOFF_CAP: Duration = Duration::from_secs(5);
const BACKOFF_FACTOR: u32 = 2;
const LAST_EVENT_ID_HEADER: &str = "last-event-id";

#[derive(Debug, Clone)]
pub struct ReconnectBackoff {
    initial: Duration,
    cap: Duration,
    factor: u32,
    attempt: u32,
}

impl Default for ReconnectBackoff {
    fn default() -> Self {
        Self {
            initial: BACKOFF_INITIAL,
            cap: BACKOFF_CAP,
            factor: BACKOFF_FACTOR,
            attempt: 0,
        }
    }
}

impl ReconnectBackoff {
    pub fn next_delay(&mut self) -> Duration {
        let multiplier = self.factor.saturating_pow(self.attempt);
        let scaled = self
            .initial
            .checked_mul(multiplier)
            .unwrap_or(self.cap)
            .min(self.cap);
        self.attempt = self.attempt.saturating_add(1);
        scaled
    }

    pub fn reset(&mut self) {
        self.attempt = 0;
    }
}

#[derive(Debug, Default, Clone)]
pub struct ResumeState {
    last_event_id: Option<String>,
}

impl ResumeState {
    pub fn record(&mut self, id: impl Into<String>) {
        let candidate = id.into();
        if candidate.is_empty() {
            return;
        }
        match &self.last_event_id {
            Some(current) if candidate.as_str() <= current.as_str() => {}
            _ => self.last_event_id = Some(candidate),
        }
    }

    pub fn last_event_id(&self) -> Option<String> {
        self.last_event_id.clone()
    }

    pub fn last_event_id_header(&self) -> Option<String> {
        self.last_event_id.clone()
    }
}

#[derive(Debug, Clone)]
pub struct SseEndpoint {
    pub url: String,
    pub label: &'static str,
}

#[derive(Debug, Clone)]
pub struct SseClientConfig {
    pub endpoints: Vec<SseEndpoint>,
}

impl SseClientConfig {
    pub fn for_host(base_url: &str) -> Self {
        let trimmed = base_url.trim_end_matches('/');
        Self {
            endpoints: vec![
                SseEndpoint {
                    url: format!("{trimmed}/api/v1/events/sse"),
                    label: "events",
                },
                SseEndpoint {
                    url: format!("{trimmed}/api/host/runs/events"),
                    label: "runs",
                },
            ],
        }
    }
}

#[derive(Debug)]
pub enum StreamItem {
    Line(EventLine),
    GapDetected {
        endpoint: &'static str,
        skipped_after: String,
    },
    ConnectionLost {
        endpoint: &'static str,
        reason: String,
    },
    Reconnected {
        endpoint: &'static str,
    },
}

/// Spawn a long-running task that streams `endpoint` into the supplied
/// sender. Reconnects forever until `shutdown` is cancelled.
pub fn spawn_endpoint_loop(
    endpoint: SseEndpoint,
    sender: mpsc::Sender<StreamItem>,
    shutdown: CancellationToken,
) {
    tokio::spawn(async move {
        endpoint_loop(endpoint, sender, shutdown).await;
    });
}

async fn endpoint_loop(
    endpoint: SseEndpoint,
    sender: mpsc::Sender<StreamItem>,
    shutdown: CancellationToken,
) {
    let label = endpoint.label;
    let client = match reqwest::Client::builder().build() {
        Ok(c) => c,
        Err(err) => {
            let _ = sender
                .send(StreamItem::ConnectionLost {
                    endpoint: label,
                    reason: format!("client build failed: {err}"),
                })
                .await;
            return;
        }
    };
    let mut backoff = ReconnectBackoff::default();
    let mut resume = ResumeState::default();

    loop {
        if shutdown.is_cancelled() {
            return;
        }

        let mut req = client
            .get(&endpoint.url)
            .header("accept", "text/event-stream");
        if let Some(last) = resume.last_event_id_header()
            && let (Ok(name), Ok(val)) = (
                LAST_EVENT_ID_HEADER.parse::<HeaderName>(),
                HeaderValue::from_str(&last),
            )
        {
            req = req.header(name, val);
        }

        let response = tokio::select! {
            _ = shutdown.cancelled() => return,
            result = req.send() => match result {
                Ok(r) => r,
                Err(err) => {
                    let _ = sender.send(StreamItem::ConnectionLost {
                        endpoint: label,
                        reason: err.to_string(),
                    }).await;
                    sleep_with_shutdown(backoff.next_delay(), &shutdown).await;
                    continue;
                }
            },
        };

        if !response.status().is_success() {
            let _ = sender
                .send(StreamItem::ConnectionLost {
                    endpoint: label,
                    reason: format!("HTTP {}", response.status()),
                })
                .await;
            sleep_with_shutdown(backoff.next_delay(), &shutdown).await;
            continue;
        }

        backoff.reset();
        let _ = sender
            .send(StreamItem::Reconnected { endpoint: label })
            .await;

        let mut bytes = response.bytes_stream().eventsource();
        let mut first_after_resume = resume.last_event_id_header().is_some();
        let mut graceful_break = false;
        loop {
            let next = tokio::select! {
                _ = shutdown.cancelled() => return,
                n = bytes.next() => n,
            };
            match next {
                Some(Ok(event)) => {
                    if !event.id.is_empty() {
                        if first_after_resume {
                            if let Some(prev) = resume.last_event_id()
                                && event.id != prev
                            {
                                let _ = sender
                                    .send(StreamItem::GapDetected {
                                        endpoint: label,
                                        skipped_after: prev,
                                    })
                                    .await;
                            }
                            first_after_resume = false;
                        }
                        resume.record(event.id.clone());
                    }
                    if let Some(line) = parse_event_line(&event)
                        && sender.send(StreamItem::Line(line)).await.is_err()
                    {
                        return;
                    }
                }
                Some(Err(err)) => {
                    let _ = sender
                        .send(StreamItem::ConnectionLost {
                            endpoint: label,
                            reason: err.to_string(),
                        })
                        .await;
                    break;
                }
                None => {
                    graceful_break = true;
                    break;
                }
            }
        }

        if graceful_break {
            let _ = sender
                .send(StreamItem::ConnectionLost {
                    endpoint: label,
                    reason: "stream closed".into(),
                })
                .await;
        }
        sleep_with_shutdown(backoff.next_delay(), &shutdown).await;
    }
}

async fn sleep_with_shutdown(delay: Duration, shutdown: &CancellationToken) {
    tokio::select! {
        _ = shutdown.cancelled() => {},
        _ = tokio::time::sleep(delay) => {},
    }
}

fn parse_event_line(event: &eventsource_stream::Event) -> Option<EventLine> {
    if event.data.is_empty() {
        return None;
    }
    serde_json::from_str::<nexus_events::types::NexusEvent>(&event.data)
        .ok()
        .map(EventLine::from_nexus_event)
}
