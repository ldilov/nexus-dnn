//! Worker-scraper trait and re-exports used by the host runtime layer.
//!
//! Implementations live alongside the worker they describe (e.g. the
//! llama.cpp scraper inside `nexus-backend-runtimes`); this module
//! exists purely to host the contract.

use crate::{LineStream, RunEventItem};

/// Contract every line-oriented worker scraper implements.
///
/// Implementors buffer partial state internally and emit zero or more
/// `RunEventItem` records each time a line arrives. The trait carries
/// no associated error type — unrecognised input is reported by
/// emitting `RunEventItem::ScraperUnknown` rather than by returning an
/// error.
pub trait WorkerScraper: Send + Sync {
    /// Stable identifier for this scraper. Used as the `source` field
    /// on every event the scraper emits.
    fn id(&self) -> &str;

    /// Feed the next line into the scraper. The scraper may emit zero,
    /// one, or many events in response, including one or more
    /// `ScraperUnknown` events for unrecognised input.
    fn ingest_line(
        &mut self,
        line: &str,
        line_stream: LineStream,
    ) -> Vec<RunEventItem>;

    /// Flush any buffered state at end-of-stream and return whatever
    /// final events the scraper still owes its consumer.
    fn flush(&mut self) -> Vec<RunEventItem>;
}
