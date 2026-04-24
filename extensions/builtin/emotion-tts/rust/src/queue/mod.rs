//! Runtime-lease queue (FR-026, FR-141).
//!
//! One batch at a time. FIFO for regular runs; test-line requests jump to
//! the head and occupy a single priority slot. Cancellation is cooperative
//! and observable via the `CancellationToken`.

pub mod resume;

use std::collections::VecDeque;
use std::sync::Arc;

use serde::{Deserialize, Serialize};
use tokio::sync::{Mutex, Notify};
use tokio_util::sync::CancellationToken;

use crate::domain::{EmotionTtsError, Result, RunId};

#[derive(Debug, Clone, Copy, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RunClass {
    Batch,
    TestLine,
    Resume,
}

#[derive(Debug, Clone)]
pub struct QueuedRun {
    pub run_id: RunId,
    pub deployment_id: String,
    pub class: RunClass,
    pub cancel: CancellationToken,
}

pub struct RuntimeQueue {
    state: Mutex<QueueState>,
    notify: Notify,
}

struct QueueState {
    pending: VecDeque<QueuedRun>,
    test_slot: Option<QueuedRun>,
    in_flight: Option<QueuedRun>,
}

impl RuntimeQueue {
    #[must_use]
    pub fn new() -> Self {
        Self {
            state: Mutex::new(QueueState {
                pending: VecDeque::new(),
                test_slot: None,
                in_flight: None,
            }),
            notify: Notify::new(),
        }
    }

    pub async fn enqueue_batch(&self, run_id: RunId, deployment_id: impl Into<String>) -> QueuedRun {
        self.enqueue(run_id, deployment_id, RunClass::Batch).await
    }

    pub async fn enqueue_test_line(&self, run_id: RunId, deployment_id: impl Into<String>) -> Result<QueuedRun> {
        let mut state = self.state.lock().await;
        if state.test_slot.is_some() {
            return Err(EmotionTtsError::conflict("test-line slot already occupied"));
        }
        let queued = QueuedRun {
            run_id,
            deployment_id: deployment_id.into(),
            class: RunClass::TestLine,
            cancel: CancellationToken::new(),
        };
        state.test_slot = Some(queued.clone());
        drop(state);
        self.notify.notify_waiters();
        Ok(queued)
    }

    pub async fn enqueue(&self, run_id: RunId, deployment_id: impl Into<String>, class: RunClass) -> QueuedRun {
        let queued = QueuedRun {
            run_id,
            deployment_id: deployment_id.into(),
            class,
            cancel: CancellationToken::new(),
        };
        {
            let mut state = self.state.lock().await;
            state.pending.push_back(queued.clone());
        }
        self.notify.notify_waiters();
        queued
    }

    pub async fn pop_next(&self) -> Option<QueuedRun> {
        loop {
            {
                let mut state = self.state.lock().await;
                if state.in_flight.is_some() {
                    drop(state);
                } else if let Some(test) = state.test_slot.take() {
                    state.in_flight = Some(test.clone());
                    return Some(test);
                } else if let Some(next) = state.pending.pop_front() {
                    state.in_flight = Some(next.clone());
                    return Some(next);
                } else {
                    return None;
                }
            }
            self.notify.notified().await;
        }
    }

    pub async fn complete_in_flight(&self, run_id: &RunId) {
        let mut state = self.state.lock().await;
        if let Some(cur) = &state.in_flight {
            if cur.run_id == *run_id {
                state.in_flight = None;
            }
        }
        drop(state);
        self.notify.notify_waiters();
    }

    pub async fn cancel(&self, run_id: &RunId) -> bool {
        let mut state = self.state.lock().await;
        if let Some(cur) = &state.in_flight {
            if cur.run_id == *run_id {
                cur.cancel.cancel();
                return true;
            }
        }
        if let Some(test) = &state.test_slot {
            if test.run_id == *run_id {
                test.cancel.cancel();
                state.test_slot = None;
                return true;
            }
        }
        let before = state.pending.len();
        state.pending.retain(|q| {
            if q.run_id == *run_id {
                q.cancel.cancel();
                false
            } else {
                true
            }
        });
        state.pending.len() != before
    }

    pub async fn snapshot(&self) -> QueueSnapshot {
        let state = self.state.lock().await;
        QueueSnapshot {
            in_flight: state.in_flight.as_ref().map(|q| q.run_id.clone()),
            test_slot: state.test_slot.as_ref().map(|q| q.run_id.clone()),
            pending: state.pending.iter().map(|q| q.run_id.clone()).collect(),
        }
    }

    pub async fn position_of(&self, run_id: &RunId) -> Option<i64> {
        let state = self.state.lock().await;
        if state.in_flight.as_ref().is_some_and(|q| q.run_id == *run_id) {
            return Some(0);
        }
        if state.test_slot.as_ref().is_some_and(|q| q.run_id == *run_id) {
            return Some(1);
        }
        state
            .pending
            .iter()
            .position(|q| q.run_id == *run_id)
            .map(|idx| (idx as i64) + 2)
    }
}

impl Default for RuntimeQueue {
    fn default() -> Self {
        Self::new()
    }
}

#[derive(Debug, Clone)]
pub struct QueueSnapshot {
    pub in_flight: Option<RunId>,
    pub test_slot: Option<RunId>,
    pub pending: Vec<RunId>,
}

pub type SharedQueue = Arc<RuntimeQueue>;

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn fifo_order_preserved() {
        let q = RuntimeQueue::new();
        let a = RunId::new();
        let b = RunId::new();
        q.enqueue_batch(a.clone(), "dep_a").await;
        q.enqueue_batch(b.clone(), "dep_b").await;

        let first = q.pop_next().await.unwrap();
        assert_eq!(first.run_id, a);
        q.complete_in_flight(&a).await;

        let second = q.pop_next().await.unwrap();
        assert_eq!(second.run_id, b);
    }

    #[tokio::test]
    async fn test_line_jumps_ahead_of_pending() {
        let q = RuntimeQueue::new();
        let batch = RunId::new();
        let test = RunId::new();
        q.enqueue_batch(batch.clone(), "dep").await;
        q.enqueue_test_line(test.clone(), "dep").await.unwrap();

        let first = q.pop_next().await.unwrap();
        assert_eq!(first.run_id, test);
        q.complete_in_flight(&test).await;

        let second = q.pop_next().await.unwrap();
        assert_eq!(second.run_id, batch);
    }

    #[tokio::test]
    async fn test_line_slot_single_occupancy() {
        let q = RuntimeQueue::new();
        q.enqueue_test_line(RunId::new(), "dep").await.unwrap();
        assert!(q.enqueue_test_line(RunId::new(), "dep").await.is_err());
    }

    #[tokio::test]
    async fn cancel_pending_removes_from_queue() {
        let q = RuntimeQueue::new();
        let a = RunId::new();
        let b = RunId::new();
        q.enqueue_batch(a.clone(), "d").await;
        q.enqueue_batch(b.clone(), "d").await;
        assert!(q.cancel(&a).await);

        let first = q.pop_next().await.unwrap();
        assert_eq!(first.run_id, b);
    }

    #[tokio::test]
    async fn cancel_in_flight_sets_token() {
        let q = RuntimeQueue::new();
        let a = RunId::new();
        q.enqueue_batch(a.clone(), "d").await;
        let popped = q.pop_next().await.unwrap();
        assert!(!popped.cancel.is_cancelled());
        assert!(q.cancel(&a).await);
        assert!(popped.cancel.is_cancelled());
    }

    #[tokio::test]
    async fn position_reflects_order() {
        let q = RuntimeQueue::new();
        let a = RunId::new();
        let b = RunId::new();
        let c = RunId::new();
        q.enqueue_batch(a.clone(), "d").await;
        q.enqueue_batch(b.clone(), "d").await;
        q.enqueue_batch(c.clone(), "d").await;

        let _ = q.pop_next().await.unwrap();
        assert_eq!(q.position_of(&a).await, Some(0));
        assert_eq!(q.position_of(&b).await, Some(2));
        assert_eq!(q.position_of(&c).await, Some(3));
    }

    #[tokio::test]
    async fn unknown_run_has_no_position() {
        let q = RuntimeQueue::new();
        let unknown = RunId::new();
        assert!(q.position_of(&unknown).await.is_none());
    }
}
