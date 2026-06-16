import { describe, expect, it } from "vitest";
import type { PrebuiltSegment, ProgressEvent } from "../../src/services/types";
import {
  allTerminal,
  applyEvent,
  countByStatus,
  initialItems,
  jobIdForEvent,
  toRunProgressMap,
  withQueueMetrics,
  type RunChunk,
  type StoryboardJob,
} from "../../src/views/recipe/components/run_panel_items";

function seg(text: string): PrebuiltSegment {
  return { text, voice_asset_id: "v1" };
}

function job(jobId: string, label: string): StoryboardJob {
  return { jobId, label, segment: seg(label) };
}

const jobs: StoryboardJob[] = [
  job("j0", "SEG-001"),
  job("j1", "SEG-002"),
  job("j2", "SEG-003"),
  job("j3", "SEG-004"),
];

// Two runs, chunked 12/3-style: chunk A = [j0,j1], chunk B = [j2,j3].
const chunks: RunChunk[] = [
  { runId: "runA", jobs: [jobs[0]!, jobs[1]!] },
  { runId: "runB", jobs: [jobs[2]!, jobs[3]!] },
];

describe("initialItems", () => {
  it("seeds every job as queued with null runId", () => {
    const items = initialItems(jobs);
    expect(items.size).toBe(4);
    expect(items.get("j0")).toMatchObject({ jobId: "j0", runId: null, status: "queued", label: "SEG-001" });
  });
});

describe("jobIdForEvent", () => {
  it("maps (runId, globalIndex) back to the right jobId within each run", () => {
    expect(jobIdForEvent(chunks, "runA", 0)).toBe("j0");
    expect(jobIdForEvent(chunks, "runA", 1)).toBe("j1");
    expect(jobIdForEvent(chunks, "runB", 0)).toBe("j2");
    expect(jobIdForEvent(chunks, "runB", 1)).toBe("j3");
  });

  it("returns null for unknown run or out-of-range index", () => {
    expect(jobIdForEvent(chunks, "ghost", 0)).toBeNull();
    expect(jobIdForEvent(chunks, "runA", 9)).toBeNull();
  });
});

describe("applyEvent", () => {
  it("segment_started → generating, stamps runId", () => {
    const ev: ProgressEvent = { type: "segment_started", runId: "runB", globalIndex: 1 };
    const next = applyEvent(initialItems(jobs), chunks, ev);
    expect(next.get("j3")).toMatchObject({ status: "generating", runId: "runB" });
  });

  it("segment_completed → done with duration, clears queue position", () => {
    const start: ProgressEvent = { type: "segment_started", runId: "runA", globalIndex: 0 };
    const done: ProgressEvent = {
      type: "segment_completed",
      runId: "runA",
      globalIndex: 0,
      durationMs: 1234,
      cacheHit: false,
      audioArtifactRef: "ref",
    };
    let items = applyEvent(initialItems(jobs), chunks, start);
    items = applyEvent(items, chunks, done);
    expect(items.get("j0")).toMatchObject({ status: "done", durationMs: 1234 });
    expect(items.get("j0")?.queuePosition).toBeUndefined();
  });

  it("segment_failed → failed with category", () => {
    const ev: ProgressEvent = {
      type: "segment_failed",
      runId: "runB",
      globalIndex: 0,
      failureCategory: "synthesis_failed",
      failureDetail: "boom",
    };
    const next = applyEvent(initialItems(jobs), chunks, ev);
    expect(next.get("j2")).toMatchObject({ status: "failed", failureCategory: "synthesis_failed" });
  });

  it("does not mutate the previous map (immutability)", () => {
    const prev = initialItems(jobs);
    const ev: ProgressEvent = { type: "segment_started", runId: "runA", globalIndex: 0 };
    const next = applyEvent(prev, chunks, ev);
    expect(prev.get("j0")?.status).toBe("queued");
    expect(next).not.toBe(prev);
  });

  it("run_terminal passes through unchanged", () => {
    const prev = initialItems(jobs);
    const ev: ProgressEvent = { type: "run_terminal", runId: "runA", status: "completed" };
    expect(applyEvent(prev, chunks, ev)).toBe(prev);
  });
});

describe("allTerminal", () => {
  it("false while any item is queued/generating, true once all done/failed", () => {
    let items = initialItems(jobs);
    expect(allTerminal(items)).toBe(false);
    for (const [idx, runId] of [["0", "runA"], ["1", "runA"], ["0", "runB"], ["1", "runB"]] as const) {
      items = applyEvent(items, chunks, {
        type: "segment_completed",
        runId,
        globalIndex: Number(idx),
        durationMs: 100,
        cacheHit: false,
        audioArtifactRef: "ref",
      });
    }
    expect(allTerminal(items)).toBe(true);
  });

  it("empty map is not terminal", () => {
    expect(allTerminal(new Map())).toBe(false);
  });
});

describe("withQueueMetrics", () => {
  it("assigns 1-based position within each run, scoped per-run", () => {
    const metrics = withQueueMetrics(initialItems(jobs), chunks);
    expect(metrics.get("j0")).toMatchObject({ queuePosition: 1, queueTotal: 2 });
    expect(metrics.get("j1")).toMatchObject({ queuePosition: 2, queueTotal: 2 });
    expect(metrics.get("j2")).toMatchObject({ queuePosition: 1, queueTotal: 2 });
    expect(metrics.get("j3")).toMatchObject({ queuePosition: 2, queueTotal: 2 });
  });

  it("ETA scales with position and uses completed-item mean once available", () => {
    let items = applyEvent(initialItems(jobs), chunks, {
      type: "segment_completed",
      runId: "runA",
      globalIndex: 0,
      durationMs: 2000,
      cacheHit: false,
      audioArtifactRef: "ref",
    });
    items = withQueueMetrics(items, chunks);
    // j1 is position 1 of run A's remaining queue → ~2000ms; j3 position 2 → ~4000ms.
    expect(items.get("j1")?.etaMs).toBe(2000);
    expect(items.get("j3")?.etaMs).toBe(4000);
  });
});

describe("toRunProgressMap + countByStatus", () => {
  it("projects to RunProgress keyed by jobId", () => {
    const rp = toRunProgressMap(initialItems(jobs));
    expect(rp.get("j0")).toMatchObject({ jobId: "j0", status: "queued", runId: null });
  });

  it("counts statuses", () => {
    let items = initialItems(jobs);
    items = applyEvent(items, chunks, { type: "segment_started", runId: "runA", globalIndex: 0 });
    items = applyEvent(items, chunks, {
      type: "segment_completed",
      runId: "runA",
      globalIndex: 1,
      durationMs: 1,
      cacheHit: false,
      audioArtifactRef: "ref",
    });
    expect(countByStatus(items)).toEqual({ queued: 2, generating: 1, done: 1, failed: 0 });
  });
});
