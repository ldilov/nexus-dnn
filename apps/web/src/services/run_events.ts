/**
 * Spec 042 — RunEventStore (T016).
 *
 * Hot-tier in-memory ring buffer keyed by `RunId`, with rAF-batched fan-out to
 * subscribers and gap detection on `seq` continuity per `(run_id, source)`.
 * Warm tier is a port (`WarmTier`) that the IndexedDB implementation in T017
 * plugs into.
 */

import {
  RUN_EVENT_SCHEMA_V1,
  runId as brandRunId,
  type EventBatch,
  type GapEvent,
  type GapReason,
  type GapReport,
  type RunBucket,
  type RunEventItem,
  type RunId,
  type SeqRange,
} from "./run_events_types";

export type {
  EventBatch,
  GapReport,
  RunBucket,
  RunEventItem,
  RunId,
  SeqRange,
} from "./run_events_types";

const DEFAULT_HOT_CAPACITY_PER_RUN = 2000;

export interface WarmTier {
  putBatch(events: RunEventItem[]): Promise<void>;
  query(runId: RunId, range: SeqRange): Promise<RunEventItem[]>;
  bucketed(runId: RunId, bucketMs: number): Promise<RunBucket[]>;
  evictOldestRunIfFull(): Promise<void>;
}

export interface RunEventStoreOptions {
  hotCapacityPerRun?: number;
  warm?: WarmTier;
  raf?: (cb: () => void) => number;
  cancelRaf?: (handle: number) => void;
}

export interface RunEventStore {
  append(batch: EventBatch): void;
  subscribe(runId: RunId, cb: (item: RunEventItem) => void): () => void;
  query(runId: RunId, range: SeqRange): Promise<RunEventItem[]>;
  bucketed(runId: RunId, bucketMs: number): Promise<RunBucket[]>;
  detectGaps(runId: RunId): GapReport;
  snapshot(runId: RunId): RunEventItem[];
}

interface RingBuffer {
  items: RunEventItem[];
  capacity: number;
  highestSeqBySource: Map<string, number>;
}

interface SubscriberSet {
  subscribers: Set<(item: RunEventItem) => void>;
  pending: RunEventItem[];
  rafHandle: number | null;
}

function defaultRaf(cb: () => void): number {
  if (typeof globalThis !== "undefined" && "requestAnimationFrame" in globalThis) {
    return (
      globalThis as unknown as { requestAnimationFrame: (cb: () => void) => number }
    ).requestAnimationFrame(cb);
  }
  return setTimeout(cb, 16) as unknown as number;
}

function defaultCancelRaf(handle: number): void {
  if (typeof globalThis !== "undefined" && "cancelAnimationFrame" in globalThis) {
    (
      globalThis as unknown as { cancelAnimationFrame: (h: number) => void }
    ).cancelAnimationFrame(handle);
    return;
  }
  clearTimeout(handle as unknown as ReturnType<typeof setTimeout>);
}

export function createRunEventStore(
  opts: RunEventStoreOptions = {},
): RunEventStore {
  const hotCapacity = opts.hotCapacityPerRun ?? DEFAULT_HOT_CAPACITY_PER_RUN;
  const warm = opts.warm;
  const raf = opts.raf ?? defaultRaf;
  const cancelRaf = opts.cancelRaf ?? defaultCancelRaf;

  const rings = new Map<string, RingBuffer>();
  const subscribers = new Map<string, SubscriberSet>();
  const detectedGaps = new Map<string, GapEvent[]>();

  function getRing(runId: string): RingBuffer {
    let ring = rings.get(runId);
    if (!ring) {
      ring = {
        items: [],
        capacity: hotCapacity,
        highestSeqBySource: new Map(),
      };
      rings.set(runId, ring);
    }
    return ring;
  }

  function getSubscribers(runId: string): SubscriberSet {
    let set = subscribers.get(runId);
    if (!set) {
      set = { subscribers: new Set(), pending: [], rafHandle: null };
      subscribers.set(runId, set);
    }
    return set;
  }

  function pushToRing(ring: RingBuffer, event: RunEventItem): void {
    ring.items.push(event);
    if (ring.items.length > ring.capacity) {
      ring.items.splice(0, ring.items.length - ring.capacity);
    }
  }

  function detectAndEmitGap(
    ring: RingBuffer,
    event: RunEventItem,
  ): GapEvent | null {
    const lastSeq = ring.highestSeqBySource.get(event.source);
    if (lastSeq === undefined) {
      ring.highestSeqBySource.set(event.source, event.seq);
      return null;
    }
    const expected = lastSeq + 1;
    if (event.seq > expected) {
      const gap: GapEvent = {
        kind: "gap",
        schema: RUN_EVENT_SCHEMA_V1,
        seq: expected,
        ts_ms: event.ts_ms,
        run_id: event.run_id,
        source: event.source,
        from_seq: expected,
        to_seq: event.seq - 1,
        reason: "transport_drop",
      };
      ring.highestSeqBySource.set(event.source, event.seq);
      const list = detectedGaps.get(event.run_id) ?? [];
      list.push(gap);
      detectedGaps.set(event.run_id, list);
      return gap;
    }
    if (event.seq >= expected) {
      ring.highestSeqBySource.set(event.source, event.seq);
    }
    return null;
  }

  function flushRaf(runId: string): void {
    const set = subscribers.get(runId);
    if (!set || set.rafHandle === null) return;
    set.rafHandle = null;
    const pending = set.pending;
    if (pending.length === 0) return;
    set.pending = [];
    for (const cb of set.subscribers) {
      for (const item of pending) {
        try {
          cb(item);
        } catch {
          continue;
        }
      }
    }
  }

  function scheduleFlush(runId: string): void {
    const set = getSubscribers(runId);
    if (set.rafHandle !== null) return;
    set.rafHandle = raf(() => flushRaf(runId));
  }

  function enqueueForFanOut(event: RunEventItem): void {
    const set = getSubscribers(event.run_id);
    if (set.subscribers.size === 0) return;
    set.pending.push(event);
    scheduleFlush(event.run_id);
  }

  return {
    append(batch: EventBatch): void {
      if (batch.events.length === 0) return;
      const ring = getRing(batch.run_id);
      const synthesizedGaps: GapEvent[] = [];
      for (const event of batch.events) {
        const gap = detectAndEmitGap(ring, event);
        if (gap !== null) {
          pushToRing(ring, gap);
          synthesizedGaps.push(gap);
        }
        pushToRing(ring, event);
      }
      for (const gap of synthesizedGaps) {
        enqueueForFanOut(gap);
      }
      for (const event of batch.events) {
        enqueueForFanOut(event);
      }
      if (warm) {
        void warm.putBatch(batch.events);
      }
    },

    subscribe(runId: RunId, cb: (item: RunEventItem) => void): () => void {
      const set = getSubscribers(runId);
      set.subscribers.add(cb);
      return () => {
        const current = subscribers.get(runId);
        if (!current) return;
        current.subscribers.delete(cb);
        if (current.subscribers.size === 0 && current.rafHandle !== null) {
          cancelRaf(current.rafHandle);
          current.rafHandle = null;
          current.pending = [];
        }
      };
    },

    async query(runId: RunId, range: SeqRange): Promise<RunEventItem[]> {
      const ring = rings.get(runId);
      const hotMatches: RunEventItem[] = [];
      if (ring) {
        for (const item of ring.items) {
          if (item.seq >= range.from && item.seq <= range.to) {
            hotMatches.push(item);
          }
        }
      }
      if (warm) {
        const warmMatches = await warm.query(runId, range);
        const merged = mergeBySeq(warmMatches, hotMatches);
        return merged;
      }
      return hotMatches;
    },

    async bucketed(runId: RunId, bucketMs: number): Promise<RunBucket[]> {
      if (warm) {
        return warm.bucketed(runId, bucketMs);
      }
      const ring = rings.get(runId);
      if (!ring) return [];
      return bucketEventsLocally(ring.items, bucketMs);
    },

    detectGaps(runId: RunId): GapReport {
      const list = detectedGaps.get(runId) ?? [];
      return {
        runId,
        gaps: list.map((g) => ({
          from_seq: g.from_seq,
          to_seq: g.to_seq,
          reason: g.reason as GapReason,
          source: g.source,
        })),
      };
    },

    snapshot(runId: RunId): RunEventItem[] {
      const ring = rings.get(runId);
      if (!ring) return [];
      return [...ring.items];
    },
  };
}

function mergeBySeq(
  warmEvents: RunEventItem[],
  hotEvents: RunEventItem[],
): RunEventItem[] {
  const seen = new Set<string>();
  const merged: RunEventItem[] = [];
  const pushIf = (e: RunEventItem): void => {
    const key = `${e.run_id}|${e.source}|${e.seq}`;
    if (seen.has(key)) return;
    seen.add(key);
    merged.push(e);
  };
  for (const e of warmEvents) pushIf(e);
  for (const e of hotEvents) pushIf(e);
  merged.sort((a, b) => (a.seq < b.seq ? -1 : a.seq > b.seq ? 1 : 0));
  return merged;
}

function bucketEventsLocally(
  events: RunEventItem[],
  bucketMs: number,
): RunBucket[] {
  if (bucketMs < 100) {
    return [];
  }
  const buckets = new Map<number, RunBucket>();
  for (const event of events) {
    const startTs = Math.floor(event.ts_ms / bucketMs) * bucketMs;
    let bucket = buckets.get(startTs);
    if (!bucket) {
      bucket = {
        start_ts_ms: startTs,
        end_ts_ms: startTs + bucketMs,
        counts: { info: 0, warn: 0, error: 0 },
        metrics: {},
      };
      buckets.set(startTs, bucket);
    }
    accrueBucket(bucket, event);
  }
  return [...buckets.values()].sort(
    (a, b) => a.start_ts_ms - b.start_ts_ms,
  );
}

function accrueBucket(bucket: RunBucket, event: RunEventItem): void {
  if (event.kind === "line") {
    if (event.severity === "error") bucket.counts.error += 1;
    else if (event.severity === "warn") bucket.counts.warn += 1;
    else bucket.counts.info += 1;
  } else if (event.kind === "error") {
    bucket.counts.error += 1;
  } else {
    bucket.counts.info += 1;
  }
  if (event.kind === "metric") {
    const slot = bucket.metrics[event.name] ?? {
      sum: 0,
      max: 0,
      count: 0,
    };
    slot.sum += event.value;
    slot.max = Math.max(slot.max, event.value);
    slot.count += 1;
    bucket.metrics[event.name] = slot;
  }
}

export const __test__ = {
  brandRunId,
  bucketEventsLocally,
  mergeBySeq,
};
