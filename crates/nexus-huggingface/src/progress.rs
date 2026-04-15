//! Progress events emitted by long-running capability operations.
//!
//! The type is transport-agnostic; `Stream<ProgressEvent>` is surfaced by
//! the capability and re-published by consumer extensions on their own
//! event buses.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "phase", rename_all = "snake_case")]
pub enum ProgressEvent {
    Queued {
        task_id: String,
    },
    Downloading {
        task_id: String,
        file: String,
        bytes_done: u64,
        bytes_total: Option<u64>,
    },
    Verifying {
        task_id: String,
        file: String,
    },
    Completed {
        task_id: String,
    },
    Cancelled {
        task_id: String,
    },
    Failed {
        task_id: String,
        message: String,
    },
}

impl ProgressEvent {
    pub fn task_id(&self) -> &str {
        match self {
            ProgressEvent::Queued { task_id }
            | ProgressEvent::Downloading { task_id, .. }
            | ProgressEvent::Verifying { task_id, .. }
            | ProgressEvent::Completed { task_id }
            | ProgressEvent::Cancelled { task_id }
            | ProgressEvent::Failed { task_id, .. } => task_id,
        }
    }
}
