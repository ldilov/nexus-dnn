//! Port allocation, lease guard, and bind-mode enum (per spec 015 US1).

use std::collections::BTreeSet;
use std::sync::{Arc, Mutex};

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RuntimeBindMode {
    Loopback,
    LoopbackOnly,
    UnixSocket,
    Any,
}

pub struct PortAllocator {
    low: u16,
    high: u16,
    cursor: Mutex<u16>,
    claimed: Mutex<BTreeSet<u16>>,
}

impl PortAllocator {
    pub fn new(low: u16, high: u16) -> Self {
        assert!(low <= high && low > 0, "invalid port range");
        Self {
            low,
            high,
            cursor: Mutex::new(low),
            claimed: Mutex::new(BTreeSet::new()),
        }
    }

    pub fn ephemeral() -> Self {
        Self::new(49152, 65535)
    }

    pub fn claim(&self, hint: Option<u16>) -> Option<u16> {
        let mut claimed = self.claimed.lock().expect("PortAllocator poisoned");
        if let Some(h) = hint
            && h >= self.low
            && h <= self.high
            && !claimed.contains(&h)
        {
            claimed.insert(h);
            return Some(h);
        }
        let mut cursor = self.cursor.lock().expect("PortAllocator poisoned");
        let span = (self.high - self.low + 1) as u32;
        for _ in 0..span {
            let candidate = *cursor;
            *cursor = if candidate == self.high {
                self.low
            } else {
                candidate + 1
            };
            if !claimed.contains(&candidate) {
                claimed.insert(candidate);
                return Some(candidate);
            }
        }
        None
    }

    pub fn release(&self, port: u16) {
        let mut claimed = self.claimed.lock().expect("PortAllocator poisoned");
        claimed.remove(&port);
    }

    #[cfg(test)]
    pub fn is_claimed(&self, port: u16) -> bool {
        self.claimed
            .lock()
            .expect("PortAllocator poisoned")
            .contains(&port)
    }
}

pub(super) struct PortLease {
    pub(super) port: u16,
    pub(super) allocator: Arc<PortAllocator>,
}

impl Drop for PortLease {
    fn drop(&mut self) {
        self.allocator.release(self.port);
    }
}
