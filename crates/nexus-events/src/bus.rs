use tokio::sync::broadcast;

use crate::types::NexusEvent;

pub trait EventBus: Send + Sync {
    fn publish(&self, event: NexusEvent);
    fn subscribe(&self) -> EventSubscription;
    fn subscriber_count(&self) -> usize;
}

pub struct EventSubscription {
    receiver: broadcast::Receiver<NexusEvent>,
}

impl EventSubscription {
    pub async fn recv(&mut self) -> Result<NexusEvent, broadcast::error::RecvError> {
        self.receiver.recv().await
    }
}

pub struct BroadcastEventBus {
    sender: broadcast::Sender<NexusEvent>,
}

impl BroadcastEventBus {
    pub fn new(capacity: usize) -> Self {
        let (sender, _) = broadcast::channel(capacity);
        Self { sender }
    }
}

impl Default for BroadcastEventBus {
    fn default() -> Self {
        Self::new(1024)
    }
}

impl EventBus for BroadcastEventBus {
    fn publish(&self, event: NexusEvent) {
        let _ = self.sender.send(event);
    }

    fn subscribe(&self) -> EventSubscription {
        EventSubscription {
            receiver: self.sender.subscribe(),
        }
    }

    fn subscriber_count(&self) -> usize {
        self.sender.receiver_count()
    }
}
