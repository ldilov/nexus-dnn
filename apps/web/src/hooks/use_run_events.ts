/**
 * Spec 042 — `useRunEvents` / `useRunEventsForRange` (T018).
 *
 * React-side consumers of the `RunEventStore`. Subscribe on mount, unsubscribe
 * on unmount, batch updates via `useReducer` so the store's rAF-batched
 * fan-out delivers a single render per frame instead of one render per event.
 */

import { useEffect, useReducer, useState } from "react";
import {
  type RunEventItem,
  type RunEventStore,
  type RunId,
  type SeqRange,
} from "../services/run_events";

export type { RunEventStore } from "../services/run_events";
export type { RunEventItem, RunId, SeqRange } from "../services/run_events_types";

interface AppendAction {
  type: "append";
  events: RunEventItem[];
}

interface ResetAction {
  type: "reset";
  events: RunEventItem[];
}

type EventsAction = AppendAction | ResetAction;

function eventsReducer(
  state: RunEventItem[],
  action: EventsAction,
): RunEventItem[] {
  switch (action.type) {
    case "append": {
      if (action.events.length === 0) return state;
      const next = state.concat(action.events);
      next.sort((a, b) => (a.seq < b.seq ? -1 : a.seq > b.seq ? 1 : 0));
      return next;
    }
    case "reset":
      return action.events;
    default:
      return state;
  }
}

export function useRunEvents(
  store: RunEventStore,
  runId: RunId | null,
): RunEventItem[] {
  const [events, dispatch] = useReducer(eventsReducer, []);

  useEffect(() => {
    if (runId === null) {
      dispatch({ type: "reset", events: [] });
      return;
    }
    dispatch({ type: "reset", events: store.snapshot(runId) });
    const buffer: RunEventItem[] = [];
    let scheduled = false;
    const flush = (): void => {
      scheduled = false;
      if (buffer.length === 0) return;
      const drained = buffer.splice(0, buffer.length);
      dispatch({ type: "append", events: drained });
    };
    const unsubscribe = store.subscribe(runId, (item: RunEventItem) => {
      buffer.push(item);
      if (!scheduled) {
        scheduled = true;
        queueMicrotask(flush);
      }
    });
    return () => {
      unsubscribe();
      buffer.length = 0;
    };
  }, [store, runId]);

  return events;
}

export function useRunEventsForRange(
  store: RunEventStore,
  runId: RunId | null,
  range: SeqRange,
): RunEventItem[] {
  const [events, setEvents] = useState<RunEventItem[]>([]);

  useEffect(() => {
    if (runId === null) {
      setEvents([]);
      return;
    }
    let cancelled = false;
    store
      .query(runId, range)
      .then((result) => {
        if (cancelled) return;
        setEvents(result);
      })
      .catch(() => {
        if (cancelled) return;
        setEvents([]);
      });
    return () => {
      cancelled = true;
    };
  }, [store, runId, range.from, range.to]);

  return events;
}
