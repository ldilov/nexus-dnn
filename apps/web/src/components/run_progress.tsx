import { useEventStream, type RunEvent } from "../hooks/use_event_stream";
import { vars } from "../theme/contract.css";

function latestByNode(events: RunEvent[]): Map<string, RunEvent> {
  const map = new Map<string, RunEvent>();
  for (const event of events) {
    if (event.node_id) {
      map.set(event.node_id, event);
    }
  }
  return map;
}

export function RunProgress() {
  const { events, connected, clearEvents } = useEventStream();
  const nodeStates = latestByNode(events);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>Run Progress</h3>
        <span style={{ fontSize: 12, color: connected ? vars.color.success.base : vars.color.error.base }}>
          {connected ? "connected" : "disconnected"}
        </span>
        <button onClick={clearEvents} style={{ fontSize: 12, cursor: "pointer" }}>
          clear
        </button>
      </div>
      {nodeStates.size === 0 && <p style={{ opacity: 0.6 }}>No run events yet</p>}
      {Array.from(nodeStates.entries()).map(([nodeId, event]) => (
        <div key={nodeId} style={{ marginBottom: 6 }}>
          <strong>{nodeId}</strong>
          <span style={{ marginLeft: 8 }}>{event.status ?? "unknown"}</span>
          {event.progress !== undefined && (
            <div
              style={{
                background: vars.color.bg.elevated,
                borderRadius: 2,
                height: 6,
                marginTop: 4,
                width: 200,
              }}
            >
              <div
                style={{
                  background: vars.color.success.base,
                  borderRadius: 2,
                  height: 6,
                  width: `${Math.min(event.progress * 100, 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
