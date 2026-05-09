use std::collections::BTreeMap;
use std::sync::Arc;
use std::time::Duration;

use nexus_core::tracing_bridge::{TargetFilter, TracingBridgeLayer};
use nexus_events::bus::{BroadcastEventBus, EventBus};
use nexus_events::redaction::{REDACTION_MARKER, SensitiveNameAllowlist};
use nexus_events::types::NexusEvent;
use tracing_subscriber::Registry;
use tracing_subscriber::layer::SubscriberExt;

fn emit_with_bridge<F>(
    bus: Arc<BroadcastEventBus>,
    allowlist: SensitiveNameAllowlist,
    target_filter: TargetFilter,
    emit: F,
) where
    F: FnOnce(),
{
    let subscriber =
        Registry::default().with(TracingBridgeLayer::new(bus, allowlist, target_filter));
    tracing::subscriber::with_default(subscriber, emit);
}

fn host_logs(bus: &BroadcastEventBus) -> Vec<NexusEvent> {
    bus.replay_after(None)
        .into_iter()
        .map(|published| published.event)
        .collect()
}

fn only_host_log(bus: &BroadcastEventBus) -> NexusEvent {
    let mut events = host_logs(bus);
    assert_eq!(
        events.len(),
        1,
        "expected exactly one published host-log event"
    );
    events.remove(0)
}

fn expect_host_log(
    event: NexusEvent,
) -> (
    String,
    String,
    String,
    BTreeMap<String, String>,
    Option<Vec<String>>,
    i64,
) {
    match event {
        NexusEvent::HostLog {
            level,
            target,
            message,
            fields,
            span_path,
            timestamp_ms,
        } => (level, target, message, fields, span_path, timestamp_ms),
        other => panic!("expected HostLog variant, got {other:?}"),
    }
}

#[test]
fn round_trip_basic_event() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::default(),
        TargetFilter::default(),
        || {
            tracing::info!(target: "test", count = 42, "hello");
        },
    );

    let (level, target, message, fields, span_path, timestamp_ms) =
        expect_host_log(only_host_log(&bus));
    assert_eq!(level, "info");
    assert_eq!(target, "test");
    assert_eq!(message, "hello");
    assert_eq!(fields.get("count").map(String::as_str), Some("42"));
    assert_eq!(span_path, None);
    assert!(timestamp_ms > 0);
}

#[test]
fn spans_get_captured() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::default(),
        TargetFilter::default(),
        || {
            let outer = tracing::info_span!("outer");
            let _outer = outer.enter();
            let inner = tracing::info_span!("inner");
            let _inner = inner.enter();
            tracing::warn!(target: "nexus_core::tracing_bridge_test", "nested");
        },
    );

    let (_, _, _, _, span_path, _) = expect_host_log(only_host_log(&bus));
    assert_eq!(
        span_path,
        Some(vec!["outer".to_string(), "inner".to_string()])
    );
}

#[test]
fn redaction_builtin_pattern() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::default(),
        TargetFilter::default(),
        || {
            tracing::error!(
                target: "nexus_core::tracing_bridge_test",
                token = "abc-secret-123",
                "oops"
            );
        },
    );

    let (_, _, message, fields, _, _) = expect_host_log(only_host_log(&bus));
    assert_eq!(message, "oops");
    assert_eq!(
        fields.get("token").map(String::as_str),
        Some(REDACTION_MARKER)
    );
}

#[test]
fn redaction_wildcard_pattern() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::default(),
        TargetFilter::default(),
        || {
            tracing::info!(
                target: "nexus_core::tracing_bridge_test",
                api_key = "xxx",
                x_api_key = "yyy",
                "hello"
            );
        },
    );

    let (_, _, _, fields, _, _) = expect_host_log(only_host_log(&bus));
    assert_eq!(
        fields.get("api_key").map(String::as_str),
        Some(REDACTION_MARKER)
    );
    assert_eq!(
        fields.get("x_api_key").map(String::as_str),
        Some(REDACTION_MARKER)
    );
}

#[test]
fn redaction_extra_pattern_from_config() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::new(["session_*"]),
        TargetFilter::default(),
        || {
            tracing::info!(
                target: "nexus_core::tracing_bridge_test",
                session_id = "abc",
                "configured"
            );
        },
    );

    let (_, _, _, fields, _, _) = expect_host_log(only_host_log(&bus));
    assert_eq!(
        fields.get("session_id").map(String::as_str),
        Some(REDACTION_MARKER)
    );
}

#[test]
fn redaction_does_not_touch_message_field() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));
    let message = "token=abc-secret-123 failed";

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::default(),
        TargetFilter::default(),
        || {
            tracing::error!(target: "nexus_core::tracing_bridge_test", "{message}");
        },
    );

    let (_, _, actual_message, fields, _, _) = expect_host_log(only_host_log(&bus));
    assert_eq!(actual_message, message);
    assert!(fields.is_empty());
}

#[test]
fn cannot_narrow_default_sensitive_patterns() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::new(["session_*"]),
        TargetFilter::default(),
        || {
            tracing::info!(
                target: "nexus_core::tracing_bridge_test",
                password = "still-secret",
                "defaults still apply"
            );
        },
    );

    let (_, _, _, fields, _, _) = expect_host_log(only_host_log(&bus));
    assert_eq!(
        fields.get("password").map(String::as_str),
        Some(REDACTION_MARKER)
    );
}

#[test]
fn filter_excludes_third_party_noise() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(32, 32));

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::default(),
        TargetFilter::default(),
        || {
            tracing::debug!(target: "hyper::client", "filtered");
        },
    );

    std::thread::sleep(Duration::from_millis(50));
    assert!(host_logs(&bus).is_empty());
}

#[test]
fn token_bucket_caps_per_target_burst() {
    let bus = Arc::new(BroadcastEventBus::with_capacities(60_000, 60_000));
    let burst: usize = 50_000;

    emit_with_bridge(
        bus.clone(),
        SensitiveNameAllowlist::default(),
        TargetFilter::default(),
        || {
            for idx in 0..burst {
                tracing::info!(target: "burst.target", item = idx, "burst");
            }
        },
    );

    let published = host_logs(&bus).len();
    assert!(
        published < burst,
        "rate limiter must drop at least one event from a {burst}-event burst; published {published}"
    );
}
