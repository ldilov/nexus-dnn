/**
 * Spec 042 — Warm-tier IndexedDB storage for RunEvent items (T017).
 *
 * Backs the `WarmTier` port from `run_events.ts` with an `idb` v8-managed
 * object store keyed by `[run_id, seq]` and a secondary index on
 * `[run_id, ts_ms]`. Eviction is by run-age once the global event count exceeds
 * the configured ceiling.
 */

import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type {
  RunBucket,
  RunEventItem,
  RunId,
  SeqRange,
} from "./run_events_types";
import type { WarmTier } from "./run_events";

const DB_NAME = "nexus-run-events";
const DB_VERSION = 1;
const STORE = "events" as const;
const BY_RUN_TS = "by_run_ts" as const;

const DEFAULT_MAX_EVENTS = 100_000;

type RunEventRow = RunEventItem;

interface RunEventsSchema extends DBSchema {
  events: {
    key: [string, number];
    value: RunEventRow;
    indexes: {
      by_run_ts: [string, number];
    };
  };
}

export interface WarmTierOptions {
  maxEvents?: number;
}

export async function createWarmTier(
  opts: WarmTierOptions = {},
): Promise<WarmTier> {
  const maxEvents = opts.maxEvents ?? DEFAULT_MAX_EVENTS;
  const db = await openDb();

  async function putBatch(events: RunEventItem[]): Promise<void> {
    if (events.length === 0) return;
    const tx = db.transaction(STORE, "readwrite");
    for (const event of events) {
      await tx.store.put(event as RunEventRow);
    }
    await tx.done;
    await maybeEvict(db, maxEvents);
  }

  async function query(runId: RunId, range: SeqRange): Promise<RunEventItem[]> {
    const lower: [string, number] = [runId, range.from];
    const upper: [string, number] = [runId, range.to];
    const bound = IDBKeyRange.bound(lower, upper);
    const results = await db.getAll(STORE, bound);
    return results;
  }

  async function bucketed(
    runId: RunId,
    bucketMs: number,
  ): Promise<RunBucket[]> {
    if (bucketMs < 100) return [];
    const lower: [string, number] = [runId, 0];
    const upper: [string, number] = [runId, Number.MAX_SAFE_INTEGER];
    const bound = IDBKeyRange.bound(lower, upper);
    const events = await db.getAllFromIndex(STORE, BY_RUN_TS, bound);
    return aggregate(events, bucketMs);
  }

  async function evictOldestRunIfFull(): Promise<void> {
    await maybeEvict(db, maxEvents);
  }

  return {
    putBatch,
    query,
    bucketed,
    evictOldestRunIfFull,
  };
}

async function openDb(): Promise<IDBPDatabase<RunEventsSchema>> {
  return openDB<RunEventsSchema>(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE)) {
        const store = database.createObjectStore(STORE, {
          keyPath: ["run_id", "seq"],
        });
        store.createIndex(BY_RUN_TS, ["run_id", "ts_ms"]);
      }
    },
  });
}

async function maybeEvict(
  db: IDBPDatabase<RunEventsSchema>,
  maxEvents: number,
): Promise<void> {
  const count = await db.count(STORE);
  if (count <= maxEvents) return;
  const oldestRunId = await findOldestRunId(db);
  if (oldestRunId === null) return;
  const tx = db.transaction(STORE, "readwrite");
  const lower: [string, number] = [oldestRunId, 0];
  const upper: [string, number] = [oldestRunId, Number.MAX_SAFE_INTEGER];
  const bound = IDBKeyRange.bound(lower, upper);
  let cursor = await tx.store.openCursor(bound);
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }
  await tx.done;
}

async function findOldestRunId(
  db: IDBPDatabase<RunEventsSchema>,
): Promise<string | null> {
  const oldestByRun = new Map<string, number>();
  const tx = db.transaction(STORE, "readonly");
  let cursor = await tx.store.index(BY_RUN_TS).openCursor();
  while (cursor) {
    const value = cursor.value;
    const existing = oldestByRun.get(value.run_id);
    if (existing === undefined || value.ts_ms < existing) {
      oldestByRun.set(value.run_id, value.ts_ms);
    }
    cursor = await cursor.continue();
  }
  await tx.done;
  let oldestRunId: string | null = null;
  let oldestTs = Number.POSITIVE_INFINITY;
  for (const [runId, ts] of oldestByRun.entries()) {
    if (ts < oldestTs) {
      oldestTs = ts;
      oldestRunId = runId;
    }
  }
  return oldestRunId;
}

function aggregate(events: RunEventItem[], bucketMs: number): RunBucket[] {
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
  return [...buckets.values()].sort(
    (a, b) => a.start_ts_ms - b.start_ts_ms,
  );
}
