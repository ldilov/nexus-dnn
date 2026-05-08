/**
 * Spec 042 — `useSystemActivity()` hook (T064).
 *
 * Derives a 3-state activity level from the same metric stream the
 * Pulse-Floor consumes, plus a broker subscription that watches for
 * model-load phase events. The level drives the Cursor pulse rate
 * (rest 1Hz / inference 2Hz / load 3Hz). Updates are debounced so
 * rapid metric churn does not thrash the cursor animation rate.
 */

import { useEffect, useRef, useState } from "react";
import { rpc } from "../services/ipc_adapter";
import {
  HOST_CMD_SCHEMA_V1,
  type EventBatch,
  type MetricSample,
  type MetricsSubInput,
  type RunEventItem,
  type SubscribeInput,
  type Subscription,
} from "../services/ipc_adapter_types";

export type SystemActivityLevel = "rest" | "inference" | "load";

const DEBOUNCE_MS = 500;

const LOAD_WINDOW_MS = 2_000;

const LOAD_PHASE_NAMES: ReadonlySet<string> = new Set([
  "discover",
  "print_meta",
  "tensors",
  "kv_reserve",
  "context_build",
]);

const TRACKED_METRICS: ReadonlyArray<string> = [
  "tokens_per_second.global",
];

interface ActivityProbeState {
  lastTokensPerSec: number;
  lastTokensPerSecTs: number;
  lastLoadPhaseTs: number;
}

function classify(state: ActivityProbeState, nowMs: number): SystemActivityLevel {
  if (nowMs - state.lastLoadPhaseTs <= LOAD_WINDOW_MS) {
    return "load";
  }
  if (state.lastTokensPerSec > 0 && nowMs - state.lastTokensPerSecTs <= LOAD_WINDOW_MS) {
    return "inference";
  }
  return "rest";
}

export function useSystemActivity(): SystemActivityLevel {
  const [activity, setActivity] = useState<SystemActivityLevel>("rest");
  const probeRef = useRef<ActivityProbeState>({
    lastTokensPerSec: 0,
    lastTokensPerSecTs: 0,
    lastLoadPhaseTs: 0,
  });
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const subscriptions: Subscription[] = [];

    const scheduleUpdate = (next: SystemActivityLevel): void => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        debounceRef.current = null;
        setActivity((current) => (current === next ? current : next));
      }, DEBOUNCE_MS);
    };

    const recompute = (): void => {
      const now = Date.now();
      const next = classify(probeRef.current, now);
      scheduleUpdate(next);
    };

    const handleSample = (sample: MetricSample): void => {
      if (sample.metric_name !== "tokens_per_second.global") return;
      probeRef.current.lastTokensPerSec = sample.value;
      probeRef.current.lastTokensPerSecTs = sample.ts_ms;
      recompute();
    };

    const handleBatch = (batch: EventBatch): void => {
      for (const ev of batch.events) {
        if (isLoadPhaseEvent(ev)) {
          probeRef.current.lastLoadPhaseTs = Date.now();
        }
      }
      recompute();
    };

    const metricsInput: MetricsSubInput = {
      schema: HOST_CMD_SCHEMA_V1,
      metric_names: [...TRACKED_METRICS],
      window_ms: 500,
    };
    rpc.pulseFloor
      .metricsSubscribe(metricsInput, handleSample)
      .then((sub) => {
        if (cancelled) {
          void sub.unsubscribe();
          return;
        }
        subscriptions.push(sub);
      })
      .catch(() => {
        return;
      });

    const eventsInput: SubscribeInput = {
      schema: HOST_CMD_SCHEMA_V1,
      run_ids: [],
    };
    rpc.runEvents
      .subscribe(eventsInput, handleBatch)
      .then((sub) => {
        if (cancelled) {
          void sub.unsubscribe();
          return;
        }
        subscriptions.push(sub);
      })
      .catch(() => {
        return;
      });

    const interval = window.setInterval(recompute, 1_000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      for (const sub of subscriptions) {
        void sub.unsubscribe();
      }
    };
  }, []);

  return activity;
}

function isLoadPhaseEvent(ev: RunEventItem): boolean {
  if (ev.kind !== "phase") return false;
  return LOAD_PHASE_NAMES.has(ev.phase as string);
}
