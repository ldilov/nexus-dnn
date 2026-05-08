import {
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { rpc } from "../../services/ipc_adapter";
import {
  HOST_CMD_SCHEMA_V1,
  type MetricSample,
  type MetricsSubInput,
  type Subscription,
} from "../../services/ipc_adapter_types";
import { Trace } from "./trace";
import {
  PULSE_FLOOR_HISTORY_CAPACITY,
  PULSE_FLOOR_TRACES,
  PULSE_FLOOR_WINDOW_MS,
  type PulseFloorTraceId,
} from "./thresholds";
import { pulseFloorRoot, pulseFloorTraceSlot } from "./pulse_floor.css";

interface MetricStreamSlot {
  value: number;
  available: boolean;
  history: number[];
}

type StreamMap = Record<string, MetricStreamSlot>;

const INITIAL_STATE: StreamMap = PULSE_FLOOR_TRACES.reduce<StreamMap>(
  (acc, trace) => {
    acc[trace.metricName] = {
      value: 0,
      available: false,
      history: [],
    };
    return acc;
  },
  {},
);

function appendBounded(history: number[], value: number): number[] {
  const next = history.length >= PULSE_FLOOR_HISTORY_CAPACITY
    ? history.slice(history.length - PULSE_FLOOR_HISTORY_CAPACITY + 1)
    : history.slice();
  next.push(value);
  return next;
}

export function PulseFloor(): ReactElement {
  const [streams, setStreams] = useState<StreamMap>(INITIAL_STATE);
  const subscriptionRef = useRef<Subscription | null>(null);

  const ingestSample = useCallback((sample: MetricSample): void => {
    setStreams((prev) => {
      const slot = prev[sample.metric_name];
      if (slot === undefined) return prev;
      const nextHistory = appendBounded(slot.history, sample.value);
      return {
        ...prev,
        [sample.metric_name]: {
          value: sample.value,
          available: sample.available,
          history: nextHistory,
        },
      };
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const input: MetricsSubInput = {
      schema: HOST_CMD_SCHEMA_V1,
      metric_names: PULSE_FLOOR_TRACES.map((t) => t.metricName),
      window_ms: PULSE_FLOOR_WINDOW_MS,
    };
    rpc.pulseFloor
      .metricsSubscribe(input, ingestSample)
      .then((sub) => {
        if (cancelled) {
          void sub.unsubscribe();
          return;
        }
        subscriptionRef.current = sub;
      })
      .catch(() => {
        return;
      });
    return () => {
      cancelled = true;
      const current = subscriptionRef.current;
      subscriptionRef.current = null;
      if (current !== null) {
        void current.unsubscribe();
      }
    };
  }, [ingestSample]);

  return (
    <div className={pulseFloorRoot} aria-hidden="true" data-pulse-floor="">
      {PULSE_FLOOR_TRACES.map((cfg) => {
        const slot = streams[cfg.metricName] ?? {
          value: 0,
          available: false,
          history: [],
        };
        return (
          <div
            key={cfg.id satisfies PulseFloorTraceId}
            className={pulseFloorTraceSlot}
          >
            <Trace
              id={cfg.id}
              metricName={cfg.metricName}
              thresholds={cfg.thresholds}
              value={slot.value}
              available={slot.available}
              history={slot.history}
              unavailableReason={`${cfg.label}: source unreachable`}
            />
          </div>
        );
      })}
    </div>
  );
}
