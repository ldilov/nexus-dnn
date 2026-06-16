import type { PrebuiltSegment, ProgressEvent } from "../../../services/types";
import type { RunProgress } from "./storyboard/storyboard_data";

/** One storyboard utterance, carried with a stable id + display label so the
 * per-item progress grid can key off the job rather than a positional index. */
export interface StoryboardJob {
  jobId: string;
  label: string;
  segment: PrebuiltSegment;
}

export type ItemStatus = "queued" | "generating" | "done" | "failed" | "cancelled";

/** Live UI state for a single storyboard item, merged from its run's SSE
 * stream. `runId` is null until the chunk's run has been created. */
export interface ItemState {
  jobId: string;
  runId: string | null;
  label: string;
  status: ItemStatus;
  queuePosition?: number | undefined;
  queueTotal?: number | undefined;
  etaMs?: number | undefined;
  durationMs?: number | undefined;
  failureCategory?: string | undefined;
}

/** Rough fallback estimate for a single utterance before any have completed,
 * so the first ETA chip is not blank. Replaced by a rolling mean once at least
 * one item finishes. */
export const DEFAULT_ITEM_ETA_MS = 6000;

/** A run's ordered jobs, paired with the run id once created. The backend emits
 * a 1-BASED `global_index` per run (`prepare.rs` uses `idx + 1`), so the job
 * for `globalIndex` N is `chunk.jobs[N - 1]`. */
export interface RunChunk {
  runId: string;
  jobs: StoryboardJob[];
}

export function initialItems(jobs: readonly StoryboardJob[]): Map<string, ItemState> {
  const map = new Map<string, ItemState>();
  for (const j of jobs) {
    map.set(j.jobId, { jobId: j.jobId, runId: null, label: j.label, status: "queued" });
  }
  return map;
}

/** Resolve a `(runId, globalIndex)` SSE event back to its jobId by indexing the
 * chunk's ordered job list. `globalIndex` is 1-BASED per run (the backend emits
 * `idx + 1`), so it maps to `chunk.jobs[globalIndex - 1]`. Returns null when the
 * run is unknown or the index falls outside the chunk. */
export function jobIdForEvent(
  chunks: readonly RunChunk[],
  runId: string,
  globalIndex: number,
): string | null {
  const chunk = chunks.find((c) => c.runId === runId);
  if (!chunk) return null;
  const zeroBased = globalIndex - 1;
  if (zeroBased < 0 || zeroBased >= chunk.jobs.length) return null;
  return chunk.jobs[zeroBased]?.jobId ?? null;
}

/** Apply one SSE progress event to the item map, returning a new map (the input
 * is never mutated). Unknown events / unmatched ids pass through unchanged. */
export function applyEvent(
  prev: Map<string, ItemState>,
  chunks: readonly RunChunk[],
  event: ProgressEvent,
): Map<string, ItemState> {
  if (event.type === "run_terminal") return prev;
  const jobId = jobIdForEvent(chunks, event.runId, event.globalIndex);
  if (!jobId) return prev;
  const current = prev.get(jobId);
  if (!current) return prev;

  const next = new Map(prev);
  switch (event.type) {
    case "segment_started":
      // A late started event must never regress a finished item back to
      // generating (out-of-order SSE / replay after completed/failed).
      if (current.status !== "queued") break;
      next.set(jobId, { ...current, runId: event.runId, status: "generating" });
      break;
    case "segment_completed":
      next.set(jobId, {
        ...current,
        runId: event.runId,
        status: "done",
        durationMs: event.durationMs,
        queuePosition: undefined,
        etaMs: undefined,
      });
      break;
    case "segment_failed":
      next.set(jobId, {
        ...current,
        runId: event.runId,
        status: "failed",
        failureCategory: event.failureCategory,
        queuePosition: undefined,
        etaMs: undefined,
      });
      break;
  }
  return next;
}

function isTerminal(status: ItemStatus): boolean {
  return status === "done" || status === "failed" || status === "cancelled";
}

export function allTerminal(items: ReadonlyMap<string, ItemState>): boolean {
  if (items.size === 0) return false;
  for (const it of items.values()) {
    if (!isTerminal(it.status)) return false;
  }
  return true;
}

/** Mean duration of finished items, falling back to the static estimate while
 * none have completed yet. */
function estimateItemMs(items: ReadonlyMap<string, ItemState>): number {
  let total = 0;
  let count = 0;
  for (const it of items.values()) {
    if (it.status === "done" && typeof it.durationMs === "number") {
      total += it.durationMs;
      count += 1;
    }
  }
  return count > 0 ? total / count : DEFAULT_ITEM_ETA_MS;
}

/** Recompute queue position/total + a best-effort ETA for every still-queued
 * item, scoped to its own run. Position is 1-based among the run's not-yet-
 * started items; ETA only counts the items AHEAD in the queue (the items ahead
 * are already running), so the head item reads ~0. Returns a new map. */
export function withQueueMetrics(
  items: ReadonlyMap<string, ItemState>,
  chunks: readonly RunChunk[],
): Map<string, ItemState> {
  const perItemMs = estimateItemMs(items);
  const next = new Map(items);
  for (const chunk of chunks) {
    const pending = chunk.jobs
      .map((j) => next.get(j.jobId))
      .filter((it): it is ItemState => it != null && it.status === "queued");
    const total = pending.length;
    pending.forEach((it, idx) => {
      next.set(it.jobId, {
        ...it,
        queuePosition: idx + 1,
        queueTotal: total,
        etaMs: Math.max(0, Math.round(idx * perItemMs)),
      });
    });
  }
  return next;
}

/** Project the internal item map onto the public `RunProgress` map handed up to
 * the carousel. Keyed by jobId so the carousel can look each card up directly. */
export function toRunProgressMap(
  items: ReadonlyMap<string, ItemState>,
): Map<string, RunProgress> {
  const out = new Map<string, RunProgress>();
  for (const it of items.values()) {
    out.set(it.jobId, {
      jobId: it.jobId,
      runId: it.runId,
      status: it.status,
      queuePosition: it.queuePosition,
      queueTotal: it.queueTotal,
      etaMs: it.etaMs,
      durationMs: it.durationMs,
      failureCategory: it.failureCategory,
    });
  }
  return out;
}

export interface StatusCounts {
  queued: number;
  generating: number;
  done: number;
  failed: number;
  cancelled: number;
}

export function countByStatus(items: ReadonlyMap<string, ItemState>): StatusCounts {
  const counts: StatusCounts = { queued: 0, generating: 0, done: 0, failed: 0, cancelled: 0 };
  for (const it of items.values()) {
    counts[it.status] += 1;
  }
  return counts;
}
