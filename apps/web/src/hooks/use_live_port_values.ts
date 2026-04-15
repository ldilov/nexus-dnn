import { useMemo } from "react";
import type { RunEvent } from "./use_event_stream";

export type PortBadge = {
  status: "idle" | "running" | "cache_hit" | "completed" | "failed";
  message?: string;
  timestamp?: string;
};

export type LivePortValue = {
  lastValue?: unknown;
  updatedAt?: string;
};

export type LivePortSnapshot = {
  /** Per-node status, derived from the most recent node-level event. */
  nodeStatus: Record<string, PortBadge>;
  /** Per-`nodeId:portName` last value seen on the stream (strings/JSON serialized on the wire). */
  portValues: Record<string, LivePortValue>;
};

/**
 * Walks the event buffer for `runId` and accumulates: the last status for each
 * node, and the last value observed on each output port. Consumers use this
 * to render status dots and port tooltips without re-rendering on every
 * unrelated event.
 */
export function useLivePortValues(
  events: RunEvent[],
  runId: string | null,
): LivePortSnapshot {
  return useMemo(() => {
    const nodeStatus: Record<string, PortBadge> = {};
    const portValues: Record<string, LivePortValue> = {};
    if (!runId) return { nodeStatus, portValues };

    for (const e of events) {
      if (e.run_id !== runId) continue;
      const nodeId = e.node_id;
      if (!nodeId) continue;

      if (e.status) {
        const mapped = mapStatus(e.status);
        if (mapped) {
          nodeStatus[nodeId] = {
            status: mapped,
            message: e.message,
            timestamp: e.timestamp,
          };
        }
      }

      if (e.type === "node.output" || e.type === "artifact.produced") {
        const port = (e as RunEvent & { port?: string; value?: unknown }).port;
        const value = (e as RunEvent & { port?: string; value?: unknown }).value;
        if (port) {
          portValues[`${nodeId}:${port}`] = {
            lastValue: value,
            updatedAt: e.timestamp,
          };
        }
      }
    }
    return { nodeStatus, portValues };
  }, [events, runId]);
}

function mapStatus(raw: string): PortBadge["status"] | null {
  switch (raw) {
    case "running":
      return "running";
    case "cache_hit":
      return "cache_hit";
    case "completed":
      return "completed";
    case "failed":
    case "cancelled":
      return "failed";
    default:
      return null;
  }
}
