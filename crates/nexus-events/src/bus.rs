use std::collections::VecDeque;
use std::sync::Mutex;
use std::time::{SystemTime, UNIX_EPOCH};

use tokio::sync::broadcast;

use crate::types::NexusEvent;

pub type EventId = String;

#[derive(Debug, Clone)]
pub struct PublishedEvent {
    pub id: EventId,
    pub event: NexusEvent,
}

pub trait EventBus: Send + Sync {
    fn publish(&self, event: NexusEvent) -> PublishedEvent;
    fn subscribe(&self) -> EventSubscription;
    fn subscribe_from(&self, after: Option<&str>) -> EventSubscription;
    fn replay_after(&self, after: Option<&str>) -> Vec<PublishedEvent>;
    fn subscriber_count(&self) -> usize;
}

pub struct EventSubscription {
    backlog: VecDeque<PublishedEvent>,
    receiver: broadcast::Receiver<PublishedEvent>,
    skip_until_id: Option<EventId>,
}

impl EventSubscription {
    fn new(
        backlog: Vec<PublishedEvent>,
        receiver: broadcast::Receiver<PublishedEvent>,
        skip_until_id: Option<EventId>,
    ) -> Self {
        Self {
            backlog: backlog.into(),
            receiver,
            skip_until_id,
        }
    }

    pub async fn recv_published(&mut self) -> Result<PublishedEvent, broadcast::error::RecvError> {
        if let Some(event) = self.backlog.pop_front() {
            return Ok(event);
        }

        loop {
            let event = self.receiver.recv().await?;
            if self
                .skip_until_id
                .as_deref()
                .is_some_and(|last_seen| event.id.as_str() <= last_seen)
            {
                continue;
            }

            self.skip_until_id = None;
            return Ok(event);
        }
    }

    pub async fn recv(&mut self) -> Result<NexusEvent, broadcast::error::RecvError> {
        Ok(self.recv_published().await?.event)
    }
}

pub struct BroadcastEventBus {
    sender: broadcast::Sender<PublishedEvent>,
    replay: Mutex<ReplayBuffer>,
}

impl BroadcastEventBus {
    pub fn new(capacity: usize) -> Self {
        Self::with_capacities(capacity, capacity)
    }

    pub fn with_capacities(broadcast_capacity: usize, replay_capacity: usize) -> Self {
        let (sender, _) = broadcast::channel(broadcast_capacity);
        Self {
            sender,
            replay: Mutex::new(ReplayBuffer::new(replay_capacity)),
        }
    }
}

impl Default for BroadcastEventBus {
    fn default() -> Self {
        Self::with_capacities(1024, 50_000)
    }
}

impl EventBus for BroadcastEventBus {
    fn publish(&self, event: NexusEvent) -> PublishedEvent {
        let published = {
            let mut replay = self.replay.lock().expect("event replay buffer poisoned");
            let published = PublishedEvent {
                id: replay.next_id(),
                event,
            };
            replay.push(published.clone());
            published
        };

        let _ = self.sender.send(published.clone());
        published
    }

    fn subscribe(&self) -> EventSubscription {
        EventSubscription::new(Vec::new(), self.sender.subscribe(), None)
    }

    fn subscribe_from(&self, after: Option<&str>) -> EventSubscription {
        let receiver = self.sender.subscribe();
        let replay = self.replay_after(after);
        let skip_until_id = replay.last().map(|event| event.id.clone());
        EventSubscription::new(replay, receiver, skip_until_id)
    }

    fn replay_after(&self, after: Option<&str>) -> Vec<PublishedEvent> {
        let replay = self.replay.lock().expect("event replay buffer poisoned");
        replay
            .entries
            .iter()
            .filter(|entry| after.is_none_or(|after_id| entry.id.as_str() > after_id))
            .cloned()
            .collect()
    }

    fn subscriber_count(&self) -> usize {
        self.sender.receiver_count()
    }
}

struct ReplayBuffer {
    capacity: usize,
    entries: VecDeque<PublishedEvent>,
    id_generator: IdGenerator,
}

impl ReplayBuffer {
    fn new(capacity: usize) -> Self {
        Self {
            capacity,
            entries: VecDeque::with_capacity(capacity),
            id_generator: IdGenerator::default(),
        }
    }

    fn next_id(&mut self) -> EventId {
        self.id_generator.next_id()
    }

    fn push(&mut self, event: PublishedEvent) {
        if self.capacity == 0 {
            return;
        }

        if self.entries.len() == self.capacity {
            let _ = self.entries.pop_front();
        }

        self.entries.push_back(event);
    }
}

#[derive(Default)]
struct IdGenerator {
    last_millis: u128,
    sequence: u16,
}

impl IdGenerator {
    fn next_id(&mut self) -> EventId {
        let millis = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map(|duration| duration.as_millis())
            .unwrap_or(self.last_millis);

        if millis == self.last_millis {
            self.sequence = self.sequence.saturating_add(1);
        } else {
            self.last_millis = millis;
            self.sequence = 0;
        }

        format!("{:020}-{:04}", self.last_millis, self.sequence)
    }
}
