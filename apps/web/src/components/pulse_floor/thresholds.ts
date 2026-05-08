/**
 * Spec 042 — Pulse-Floor anomaly threshold defaults (T061).
 *
 * Stage-1 absolute values; the variance-based lease thresholds noted in
 * tasks.md require historical baselines we do not yet capture, so the
 * absolute counts below act as the placeholder. Tunable per Principle V
 * (any consumer can pass a different `thresholds` to `<Trace />`).
 */

import type { TraceThresholds } from "./trace";

export type PulseFloorTraceId =
  | "vram"
  | "ram"
  | "leases"
  | "tokens_per_sec";

export interface PulseFloorTraceConfig {
  id: PulseFloorTraceId;
  metricName: string;
  label: string;
  thresholds: TraceThresholds;
}

export const PULSE_FLOOR_TRACES: ReadonlyArray<PulseFloorTraceConfig> = [
  {
    id: "vram",
    metricName: "vram.utilization",
    label: "VRAM utilisation",
    thresholds: { warn: 0.85, alarm: 0.92 },
  },
  {
    id: "ram",
    metricName: "ram.utilization",
    label: "RAM utilisation",
    thresholds: { warn: 0.8, alarm: 0.92 },
  },
  {
    id: "leases",
    metricName: "leases.active",
    label: "Active leases",
    thresholds: { warn: 4, alarm: 8 },
  },
  {
    id: "tokens_per_sec",
    metricName: "tokens_per_second.global",
    label: "Tokens per second",
    thresholds: { warn: 0.7, alarm: 0.3 },
  },
];

export const PULSE_FLOOR_WINDOW_MS = 250;

export const PULSE_FLOOR_HISTORY_CAPACITY = 240;
