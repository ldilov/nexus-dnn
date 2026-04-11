#[derive(Debug, thiserror::Error)]
pub enum EventBusError {
    #[error("event bus channel closed")]
    ChannelClosed,

    #[error("subscriber lagged behind by {missed_count} events")]
    SubscriberLagged { missed_count: u64 },
}
