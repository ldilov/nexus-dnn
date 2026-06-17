import { describe, expect, it } from "vitest";
import { parseProgressEvent } from "../../src/services/run_progress_wire";

describe("parseProgressEvent — snake_case wire → camelCase ProgressEvent", () => {
  it("maps a segment_completed frame (all snake_case fields)", () => {
    const out = parseProgressEvent({
      type: "segment_completed",
      run_id: "runA",
      global_index: 2,
      duration_ms: 1234,
      cache_hit: false,
      audio_artifact_ref: "ref",
    });
    expect(out).toEqual({
      type: "segment_completed",
      runId: "runA",
      globalIndex: 2,
      durationMs: 1234,
      cacheHit: false,
      audioArtifactRef: "ref",
    });
  });

  it("maps a segment_started frame", () => {
    const out = parseProgressEvent({
      type: "segment_started",
      run_id: "runA",
      global_index: 1,
    });
    expect(out).toEqual({ type: "segment_started", runId: "runA", globalIndex: 1 });
  });

  it("maps a segment_failed frame with failure category/detail", () => {
    const out = parseProgressEvent({
      type: "segment_failed",
      run_id: "runB",
      global_index: 3,
      failure_category: "synthesis",
      failure_detail: "out of memory",
    });
    expect(out).toEqual({
      type: "segment_failed",
      runId: "runB",
      globalIndex: 3,
      failureCategory: "synthesis",
      failureDetail: "out of memory",
    });
  });

  it("maps a run_terminal frame with export ref", () => {
    const out = parseProgressEvent({
      type: "run_terminal",
      run_id: "runC",
      status: "completed",
      export_artifact_ref: "zip-ref",
    });
    expect(out).toEqual({
      type: "run_terminal",
      runId: "runC",
      status: "completed",
      exportArtifactRef: "zip-ref",
    });
  });

  it("accepts already-camelCase input (defensive identity)", () => {
    const out = parseProgressEvent({
      type: "segment_completed",
      runId: "runA",
      globalIndex: 2,
      durationMs: 9,
      cacheHit: true,
      audioArtifactRef: "ref2",
    });
    expect(out).toEqual({
      type: "segment_completed",
      runId: "runA",
      globalIndex: 2,
      durationMs: 9,
      cacheHit: true,
      audioArtifactRef: "ref2",
    });
  });

  it("returns null for non-object input", () => {
    expect(parseProgressEvent(null)).toBeNull();
    expect(parseProgressEvent("nope")).toBeNull();
    expect(parseProgressEvent(42)).toBeNull();
  });

  it("returns null for an unknown event type", () => {
    expect(parseProgressEvent({ type: "wat", run_id: "x", global_index: 1 })).toBeNull();
    expect(parseProgressEvent({ run_id: "x" })).toBeNull();
  });
});
