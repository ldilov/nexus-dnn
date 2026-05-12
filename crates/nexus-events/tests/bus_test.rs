use nexus_events::bus::{BroadcastEventBus, EventBus};
use nexus_events::types::NexusEvent;

fn run_created(run_id: &str) -> NexusEvent {
    NexusEvent::RunCreated {
        run_id: run_id.to_string(),
        workflow_id: "workflow".to_string(),
    }
}

#[tokio::test]
async fn subscribe_from_replays_newer_events_before_live_stream() {
    let bus = BroadcastEventBus::with_capacities(16, 16);
    let first = bus.publish(run_created("run-1"));
    let second = bus.publish(run_created("run-2"));
    let third = bus.publish(run_created("run-3"));

    let mut subscription = bus.subscribe_from(Some(&second.id));
    let replayed = subscription
        .recv_published()
        .await
        .expect("expected replayed event");

    assert_eq!(replayed.id, third.id);
    match replayed.event {
        NexusEvent::RunCreated { run_id, .. } => assert_eq!(run_id, "run-3"),
        other => panic!("expected RunCreated, got {other:?}"),
    }

    let live = bus.publish(run_created("run-4"));
    let delivered = subscription
        .recv_published()
        .await
        .expect("expected live event after replay");

    assert_eq!(delivered.id, live.id);
    assert!(delivered.id > first.id);
}

#[tokio::test]
async fn subscribe_from_does_not_duplicate_boundary_event() {
    let bus = BroadcastEventBus::with_capacities(16, 16);
    let first = bus.publish(run_created("run-1"));
    let mut subscription = bus.subscribe_from(Some(&first.id));

    let second = bus.publish(run_created("run-2"));
    let delivered = subscription
        .recv_published()
        .await
        .expect("expected event after cursor");

    assert_eq!(delivered.id, second.id);
}

#[test]
fn replay_buffer_discards_oldest_entries_when_capacity_is_reached() {
    let bus = BroadcastEventBus::with_capacities(16, 2);

    let first = bus.publish(run_created("run-1"));
    let second = bus.publish(run_created("run-2"));
    let third = bus.publish(run_created("run-3"));

    let replay = bus.replay_after(None);
    assert_eq!(replay.len(), 2);
    assert_eq!(replay[0].id, second.id);
    assert_eq!(replay[1].id, third.id);
    assert!(replay.iter().all(|published| published.id != first.id));
}
