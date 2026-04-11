import type { RunEvent } from "../hooks/use_event_stream";
import { StatusBadge, type BadgeStatus } from "../components/status_badge";
import * as styles from "./run_trace_view.css";

type RunTraceViewProps = {
  events: RunEvent[];
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function RunTraceView({ events }: RunTraceViewProps) {
  if (events.length === 0) {
    return <p className={styles.emptyState}>No run events yet</p>;
  }

  return (
    <div className={styles.container}>
      {events.map((evt, idx) => (
        <div key={idx} className={styles.eventRow}>
          <span className={styles.timestamp}>{formatTime(evt.timestamp)}</span>
          <span className={styles.nodeId}>{evt.node_id ?? evt.type}</span>
          {evt.status && <StatusBadge status={evt.status as BadgeStatus} />}
          <span className={styles.message}>{evt.message ?? ""}</span>
        </div>
      ))}
    </div>
  );
}
