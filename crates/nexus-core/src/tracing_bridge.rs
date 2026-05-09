use std::collections::{BTreeMap, HashMap};
use std::sync::{Arc, Mutex};
use std::time::{Duration, Instant, SystemTime, UNIX_EPOCH};

use nexus_events::bus::EventBus;
use nexus_events::redaction::SensitiveNameAllowlist;
use nexus_events::types::NexusEvent;
use tracing::field::{Field, Visit};
use tracing::{Event, Level, Subscriber};
use tracing_subscriber::layer::{Context, Layer};
use tracing_subscriber::registry::LookupSpan;

const DEFAULT_EVENTS_PER_SECOND: usize = 10_000;
const DEFAULT_IDLE_TTL: Duration = Duration::from_secs(60);
const RECURSIVE_TARGET_PREFIX: &str = "nexus_core::tracing_bridge";

pub struct TracingBridgeLayer {
    bus: Arc<dyn EventBus>,
    allowlist: SensitiveNameAllowlist,
    target_filter: TargetFilter,
    rate_limiter: PerTargetRateLimiter,
}

impl TracingBridgeLayer {
    pub fn new(
        bus: Arc<dyn EventBus>,
        allowlist: SensitiveNameAllowlist,
        target_filter: TargetFilter,
    ) -> Self {
        Self {
            bus,
            allowlist,
            target_filter,
            rate_limiter: PerTargetRateLimiter::new(DEFAULT_EVENTS_PER_SECOND, DEFAULT_IDLE_TTL),
        }
    }
}

impl<S> Layer<S> for TracingBridgeLayer
where
    S: Subscriber + for<'lookup> LookupSpan<'lookup>,
{
    fn on_event(&self, event: &Event<'_>, ctx: Context<'_, S>) {
        let metadata = event.metadata();
        let target = metadata.target();
        if target == RECURSIVE_TARGET_PREFIX
            || target.starts_with(concat!("nexus_core::tracing_bridge", "::"))
        {
            return;
        }
        if !self
            .target_filter
            .allows(metadata.target(), metadata.level())
        {
            return;
        }
        if !self.rate_limiter.allow(metadata.target()) {
            return;
        }

        let mut visitor = HostLogVisitor::default();
        event.record(&mut visitor);

        let mut fields = visitor.fields;
        self.allowlist.redact_in_place(&mut fields);

        let timestamp_ms = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|duration| duration.as_millis() as i64)
            .unwrap_or_default();

        self.bus.publish(NexusEvent::HostLog {
            level: metadata.level().as_str().to_ascii_lowercase(),
            target: metadata.target().to_string(),
            message: visitor.message.unwrap_or_default(),
            fields,
            span_path: collect_span_path(ctx),
            timestamp_ms,
        });
    }
}

#[derive(Clone, Debug)]
pub struct TargetFilter {
    rules: Vec<TargetFilterRule>,
}

impl TargetFilter {
    pub fn new(rules: Vec<TargetFilterRule>) -> Self {
        Self { rules }
    }

    pub fn allows(&self, target: &str, level: &Level) -> bool {
        !self.rules.iter().any(|rule| rule.matches(target, level))
    }
}

impl Default for TargetFilter {
    fn default() -> Self {
        Self::new(vec![
            TargetFilterRule::new("hyper", Level::DEBUG),
            TargetFilterRule::new("sqlx", Level::DEBUG),
            TargetFilterRule::new("tokio", Level::DEBUG),
            TargetFilterRule::new("want", Level::DEBUG),
            TargetFilterRule::new("mio", Level::DEBUG),
            TargetFilterRule::new("h2", Level::DEBUG),
        ])
    }
}

#[derive(Clone, Debug)]
pub struct TargetFilterRule {
    prefix: String,
    max_level: Level,
}

impl TargetFilterRule {
    pub fn new(prefix: impl Into<String>, max_level: Level) -> Self {
        Self {
            prefix: prefix.into(),
            max_level,
        }
    }

    fn matches(&self, target: &str, level: &Level) -> bool {
        target.starts_with(&self.prefix) && level_rank(level) <= level_rank(&self.max_level)
    }
}

#[derive(Default)]
struct HostLogVisitor {
    message: Option<String>,
    fields: BTreeMap<String, String>,
}

impl HostLogVisitor {
    fn record_value(&mut self, field: &Field, value: String) {
        if field.name() == "message" {
            self.message = Some(value);
            return;
        }

        self.fields.insert(field.name().to_string(), value);
    }
}

impl Visit for HostLogVisitor {
    fn record_bool(&mut self, field: &Field, value: bool) {
        self.record_value(field, value.to_string());
    }

    fn record_i64(&mut self, field: &Field, value: i64) {
        self.record_value(field, value.to_string());
    }

    fn record_u64(&mut self, field: &Field, value: u64) {
        self.record_value(field, value.to_string());
    }

    fn record_f64(&mut self, field: &Field, value: f64) {
        self.record_value(field, value.to_string());
    }

    fn record_str(&mut self, field: &Field, value: &str) {
        self.record_value(field, value.to_string());
    }

    fn record_error(&mut self, field: &Field, value: &(dyn std::error::Error + 'static)) {
        self.record_value(field, value.to_string());
    }

    fn record_debug(&mut self, field: &Field, value: &dyn std::fmt::Debug) {
        self.record_value(field, format!("{value:?}"));
    }
}

fn collect_span_path<S>(ctx: Context<'_, S>) -> Option<Vec<String>>
where
    S: Subscriber + for<'lookup> LookupSpan<'lookup>,
{
    let span = ctx.lookup_current()?;
    let path = span
        .scope()
        .from_root()
        .map(|span| span.name().to_string())
        .collect::<Vec<_>>();

    if path.is_empty() { None } else { Some(path) }
}

fn level_rank(level: &Level) -> u8 {
    match *level {
        Level::TRACE => 0,
        Level::DEBUG => 1,
        Level::INFO => 2,
        Level::WARN => 3,
        Level::ERROR => 4,
    }
}

struct PerTargetRateLimiter {
    capacity: f64,
    refill_per_second: f64,
    idle_ttl: Duration,
    state: Mutex<RateLimiterState>,
}

impl PerTargetRateLimiter {
    fn new(capacity: usize, idle_ttl: Duration) -> Self {
        Self {
            capacity: capacity as f64,
            refill_per_second: capacity as f64,
            idle_ttl,
            state: Mutex::new(RateLimiterState::new()),
        }
    }

    fn allow(&self, target: &str) -> bool {
        let now = Instant::now();
        let mut state = self.state.lock().expect("rate limiter poisoned");
        state.evict_idle(now, self.idle_ttl);

        let bucket = state
            .buckets
            .entry(target.to_string())
            .or_insert_with(|| TokenBucket::new(now, self.capacity));

        bucket.refill(now, self.capacity, self.refill_per_second);
        bucket.last_seen = now;

        if bucket.tokens >= 1.0 {
            bucket.tokens -= 1.0;
            return true;
        }

        false
    }
}

struct RateLimiterState {
    buckets: HashMap<String, TokenBucket>,
    last_eviction: Instant,
}

impl RateLimiterState {
    fn new() -> Self {
        Self {
            buckets: HashMap::new(),
            last_eviction: Instant::now(),
        }
    }

    fn evict_idle(&mut self, now: Instant, idle_ttl: Duration) {
        if now.duration_since(self.last_eviction) < idle_ttl {
            return;
        }

        self.buckets
            .retain(|_, bucket| now.duration_since(bucket.last_seen) < idle_ttl);
        self.last_eviction = now;
    }
}

struct TokenBucket {
    tokens: f64,
    last_refill: Instant,
    last_seen: Instant,
}

impl TokenBucket {
    fn new(now: Instant, capacity: f64) -> Self {
        Self {
            tokens: capacity,
            last_refill: now,
            last_seen: now,
        }
    }

    fn refill(&mut self, now: Instant, capacity: f64, refill_per_second: f64) {
        let elapsed = now.duration_since(self.last_refill).as_secs_f64();
        if elapsed > 0.0 {
            self.tokens = (self.tokens + elapsed * refill_per_second).min(capacity);
            self.last_refill = now;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::{PerTargetRateLimiter, TargetFilter, TargetFilterRule};
    use std::time::Duration;
    use tracing::Level;

    #[test]
    fn target_filter_drops_debug_and_trace_for_matching_prefixes() {
        let filter = TargetFilter::new(vec![TargetFilterRule::new("hyper", Level::DEBUG)]);
        assert!(!filter.allows("hyper::client", &Level::DEBUG));
        assert!(!filter.allows("hyper::client", &Level::TRACE));
        assert!(filter.allows("hyper::client", &Level::INFO));
        assert!(filter.allows("nexus_core::app", &Level::DEBUG));
    }

    #[test]
    fn rate_limiter_evicts_idle_targets() {
        let limiter = PerTargetRateLimiter::new(1, Duration::from_millis(5));
        assert!(limiter.allow("a"));
        std::thread::sleep(Duration::from_millis(10));
        assert!(limiter.allow("b"));
        std::thread::sleep(Duration::from_millis(10));
        assert!(limiter.allow("a"));
    }
}
