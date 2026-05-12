//! Shift+wheel native-terminal scrollback passthrough.
//!
//! When mouse capture (SGR 1006) is enabled, wheel events flow to the
//! application instead of the terminal emulator — operators lose access
//! to their native scrollback buffer.
//!
//! Convention (k9s, lazygit): hold Shift while wheeling to temporarily
//! release mouse capture. The terminal then handles wheel events natively
//! (scrolls scrollback). After a debounce window with no Shift+wheel
//! activity, capture is re-enabled.
//!
//! State machine:
//! - Idle (active=false): every Shift+wheel event triggers the FIRST
//!   transition → call `disable_mouse_capture`, set active=true, stamp
//!   `last_event`.
//! - Active (active=true): subsequent Shift+wheel events just refresh
//!   `last_event`. Wheel events do not reach the app anyway — the
//!   terminal eats them — so the dispatcher only needs to maintain the
//!   timestamp via a periodic watchdog tick.
//! - Reclaim: when the watchdog tick observes `now - last_event >
//!   DEBOUNCE_MS`, it calls `enable_mouse_capture` and flips active back
//!   to false.
//!
//! The state container is `Send + Sync` so a separate tokio task can poll
//! the watchdog independent of the mouse dispatcher.

use std::sync::Mutex;
use std::sync::atomic::{AtomicBool, Ordering};
use std::time::{Duration, Instant};

/// Inactivity window before the watchdog reclaims mouse capture.
pub const DEBOUNCE: Duration = Duration::from_millis(800);

/// Watchdog tick interval — how often the reclaim task wakes up.
pub const WATCHDOG_TICK: Duration = Duration::from_millis(200);

/// Shared scrollback-passthrough state.
#[derive(Debug)]
pub struct ScrollbackPassthrough {
    active: AtomicBool,
    last_event: Mutex<Instant>,
}

impl Default for ScrollbackPassthrough {
    fn default() -> Self {
        Self::new(Instant::now())
    }
}

impl ScrollbackPassthrough {
    pub fn new(now: Instant) -> Self {
        Self {
            active: AtomicBool::new(false),
            last_event: Mutex::new(now),
        }
    }

    pub fn is_active(&self) -> bool {
        self.active.load(Ordering::Acquire)
    }

    /// Mark a Shift+wheel event at `now`.
    ///
    /// Returns `true` iff this was the activating event (caller should
    /// invoke `disable_mouse_capture`). Subsequent refresh events return
    /// `false` (already active, just bumped the timestamp).
    pub fn record_event(&self, now: Instant) -> bool {
        if let Ok(mut last) = self.last_event.lock() {
            *last = now;
        }
        !self.active.swap(true, Ordering::AcqRel)
    }

    /// Watchdog decision — should we reclaim capture now?
    ///
    /// Returns `true` iff `active=true` AND `now - last_event >= DEBOUNCE`.
    /// On a `true` return, this flips `active` back to `false` so the
    /// caller can safely call `enable_mouse_capture` exactly once.
    pub fn should_release(&self, now: Instant) -> bool {
        if !self.active.load(Ordering::Acquire) {
            return false;
        }
        let last = match self.last_event.lock() {
            Ok(guard) => *guard,
            Err(_) => return false,
        };
        if now.saturating_duration_since(last) < DEBOUNCE {
            return false;
        }
        self.active.swap(false, Ordering::AcqRel)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn record_first_event_transitions_to_active() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        assert!(!state.is_active());
        let first = state.record_event(now);
        assert!(first, "first record_event returns true (activating)");
        assert!(state.is_active());
    }

    #[test]
    fn record_subsequent_event_returns_false() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        state.record_event(now);
        let second = state.record_event(now + Duration::from_millis(50));
        assert!(!second, "subsequent record_event returns false");
        assert!(state.is_active());
    }

    #[test]
    fn should_release_false_before_debounce() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        state.record_event(now);
        assert!(!state.should_release(now + Duration::from_millis(400)));
        assert!(state.is_active());
    }

    #[test]
    fn should_release_true_after_debounce_and_flips_active() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        state.record_event(now);
        let released = state.should_release(now + Duration::from_millis(801));
        assert!(released);
        assert!(!state.is_active(), "active flips back to false on release");
    }

    #[test]
    fn should_release_idempotent_after_release() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        state.record_event(now);
        let first = state.should_release(now + Duration::from_millis(900));
        let second = state.should_release(now + Duration::from_millis(1000));
        assert!(first);
        assert!(!second, "second release after flip returns false");
    }

    #[test]
    fn should_release_false_when_never_active() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        assert!(!state.should_release(now + Duration::from_secs(10)));
    }

    #[test]
    fn record_after_release_re_activates() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        state.record_event(now);
        let _ = state.should_release(now + Duration::from_millis(900));
        assert!(!state.is_active());
        let reactivated = state.record_event(now + Duration::from_millis(1000));
        assert!(reactivated, "record after release re-activates");
        assert!(state.is_active());
    }

    #[test]
    fn refresh_extends_debounce_window() {
        let now = Instant::now();
        let state = ScrollbackPassthrough::new(now);
        state.record_event(now);
        state.record_event(now + Duration::from_millis(500));
        assert!(!state.should_release(now + Duration::from_millis(900)));
        assert!(state.should_release(now + Duration::from_millis(1500)));
    }
}
