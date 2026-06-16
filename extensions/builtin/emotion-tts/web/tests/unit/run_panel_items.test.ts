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

// Two runs, chunked 12/3-style: chunk A = [j0,j1], chunk B = [j2,j3]. The
// backend emits a 1-BASED global_index per run, so run A emits 1 and 2, run B
// emits 1 and 2 (NOT 0 and 1).
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

describe("jobIdForEvent (1-based global_index)", () => {
  it("globalIndex=1 maps to the FIRST job in each run", () => {
    expect(jobIdForEvent(chunks, "runA", 1)).toBe("j0");
    expect(jobIdForEvent(chunks, "runB", 1)).toBe("j2");
  });

  it("the highest globalIndex maps to the LAST job in each run", () => {
    expect(jobIdForEvent(chunks, "runA", 2)).toBe("j1");
    expect(jobIdForEvent(chunks, "runB", 2)).toBe("j3");
  });

  it("returns null for the never-emitted 0 index, unknown run, or out-of-range", () => {
    expect(jobIdForEvent(chunks, "runA", 0)).toBeNull();
    expect(jobIdForEvent(chunks, "ghost", 1)).toBeNull();
    expect(jobIdForEvent(chunks, "runA", 9)).toBeNull();
  });
});

describe("applyEvent", () => {
  it("segment_started → generating, stamps runId (1-based index)", () => {
    const ev: ProgressEvent = { type: "segment_started", runId: "runB", globalIndex: 2 };
    const next = applyEvent(initialItems(jobs), chunks, ev);
    expect(next.get("j3")).toMatchObject({ status: "generating", runId: "runB" });
  });

  it("segment_completed → done with duration, clears queue position (1-based index)", () => {
    const start: ProgressEvent = { type: "segment_started", runId: "runA", globalIndex: 1 };
    const done: ProgressEvent = {
      type: "segment_completed",
      runId: "runA",
      globalIndex: 1,
      durationMs: 1234,
      cacheHit: false,
      audioArtifactRef: "ref",
    };
    let items = applyEvent(initialItems(jobs), chunks, start);
    items = applyEvent(items, chunks, done);
    expect(items.get("j0")).toMatchObject({ status: "done", durationMs: 1234 });
    expect(items.get("j0")?.queuePosition).toBeUndefined();
  });

  it("segment_failed → failed with category (1-based index)", () => {
    const ev: ProgressEvent = {
      type: "segment_failed",
      runId: "runB",
      globalIndex: 1,
      failureCategory: "synthesis_failed",
      failureDetail: "boom",
    };
    const next = applyEvent(initialItems(jobs), chunks, ev);
    expect(next.get("j2")).toMatchObject({ status: "failed", failureCategory: "synthesis_failed" });
  });

  it("does not mutate the previous map (immutability)", () => {
    const prev = initialItems(jobs);
    const ev: ProgressEvent = { type: "segment_started", runId: "runA", globalIndex: 1 };
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
  it("false while any item is queued/generating, true once the LAST segment of every run completes", () => {
    let items = initialItems(jobs);
    expect(allTerminal(items)).toBe(false);
    // Run A emits 1,2 and run B emits 1,2 — completing the highest index of
    // each run must drive every item terminal (the hang-bug regression).
    for (const [globalIndex, runId] of [[1, "runA"], [2, "runA"], [1, "runB"], [2, "runB"]] as const) {
      items = applyEvent(items, chunks, {
        type: "segment_completed",
        runId,
        globalIndex,
        durationMs: 100,
        cacheHit: false,
        audioArtifactRef: "ref",
      });
    }
    expect(items.get("j1")?.status).toBe("done");
    expect(items.get("j3")?.status).toBe("done");
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
      globalIndex: 1,
      durationMs: 2000,
      cacheHit: false,
      audioArtifactRef: "ref",
    });
    items = withQueueMetrics(items, chunks);
    // ETA counts only the items AHEAD (already in flight): j1 is the head of
    // run A's remaining queue → 0ms; j3 has one item ahead → 2000ms.
    expect(items.get("j1")?.etaMs).toBe(0);
    expect(items.get("j3")?.etaMs).toBe(2000);
    expect(items.get("j1")?.queuePosition).toBe(1);
    expect(items.get("j3")?.queuePosition).toBe(2);
  });
});

describe("applyEvent — terminal items are sticky", () => {
  it("a late segment_started does NOT regress a completed item back to generating", () => {
    const completed: ProgressEvent = {
      type: "segment_completed",
      runId: "runA",
      globalIndex: 1,
      durationMs: 500,
      cacheHit: false,
      audioArtifactRef: "ref",
    };
    let items = applyEvent(initialItems(jobs), chunks, completed);
    items = applyEvent(items, chunks, { type: "segment_started", runId: "runA", globalIndex: 1 });
    expect(items.get("j0")?.status).toBe("done");
  });

  it("a late segment_started does NOT regress a failed item", () => {
    const failed: ProgressEvent = {
      type: "segment_failed",
      runId: "runA",
      globalIndex: 1,
      failureCategory: "synthesis_failed",
      failureDetail: "boom",
    };
    let items = applyEvent(initialItems(jobs), chunks, failed);
    items = applyEvent(items, chunks, { type: "segment_started", runId: "runA", globalIndex: 1 });
    expect(items.get("j0")?.status).toBe("failed");
  });
});

describe("toRunProgressMap + countByStatus", () => {
  it("projects to RunProgress keyed by jobId", () => {
    const rp = toRunProgressMap(initialItems(jobs));
    expect(rp.get("j0")).toMatchObject({ jobId: "j0", status: "queued", runId: null });
  });

  it("counts statuses (1-based indices) with an explicit cancelled bucket", () => {
    let items = initialItems(jobs);
    items = applyEvent(items, chunks, { type: "segment_started", runId: "runA", globalIndex: 1 });
    items = applyEvent(items, chunks, {
      type: "segment_completed",
      runId: "runA",
      globalIndex: 2,
      durationMs: 1,
      cacheHit: false,
      audioArtifactRef: "ref",
    });
    expect(countByStatus(items)).toEqual({ queued: 2, generating: 1, done: 1, failed: 0, cancelled: 0 });
  });

  it("counts cancelled items separately from queued", () => {
    const items = new Map(initialItems(jobs));
    items.set("j0", { ...items.get("j0")!, status: "cancelled" });
    items.set("j1", { ...items.get("j1")!, status: "cancelled" });
    expect(countByStatus(items)).toEqual({ queued: 2, generating: 0, done: 0, failed: 0, cancelled: 2 });
  });
});
