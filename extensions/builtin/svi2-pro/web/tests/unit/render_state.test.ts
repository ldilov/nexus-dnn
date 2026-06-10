import { describe, expect, test } from "vitest";
import {
  CONNECTION_LOST_CODE,
  cancelledState,
  connectionLostState,
  initialRenderState,
  markStalled,
  reduceRenderFrame,
  renderStateFromJob,
  startedState,
} from "../../src/domain/render_state";
import type { RenderFrame } from "../../src/services/render_events";
import type { RenderJob } from "../../src/services/types";

describe("render state machine", () => {
  test("initial state is idle", () => {
    const state = initialRenderState();
    expect(state.phase).toBe("idle");
    expect(state.overallFraction).toBe(0);
    expect(state.stageStates.diffusion).toBe("idle");
  });

  test("started state activates diffusion when no qwen edit", () => {
    const state = startedState("job-1", false);
    expect(state.phase).toBe("running");
    expect(state.jobId).toBe("job-1");
    expect(state.stageStates.anchor).toBe("done");
    expect(state.stageStates.qwen_edit).toBe("idle");
    expect(state.stageStates.diffusion).toBe("active");
  });

  test("started state activates qwen edit first when enabled", () => {
    const state = startedState("job-2", true);
    expect(state.stageStates.qwen_edit).toBe("active");
    expect(state.stageStates.diffusion).toBe("idle");
  });

  test("progress frame updates overall fraction and clamps", () => {
    let state = startedState("job", false);
    state = reduceRenderFrame(state, {
      method: "svi2.video.progress",
      params: { fraction: 0.42 },
    });
    expect(state.overallFraction).toBeCloseTo(0.42);
    state = reduceRenderFrame(state, {
      method: "svi2.video.progress",
      params: { fraction: 5 },
    });
    expect(state.overallFraction).toBe(1);
  });

  test("clip step frame tracks step counters", () => {
    let state = startedState("job", false);
    state = reduceRenderFrame(state, {
      method: "svi2.video.clip.started",
      params: { clip_index: 0, num_clips: 5 },
    });
    state = reduceRenderFrame(state, {
      method: "svi2.video.clip.step",
      params: { clip_index: 0, step: 12, total_steps: 50 },
    });
    expect(state.step).toBe(12);
    expect(state.totalSteps).toBe(50);
    expect(state.numClips).toBe(5);
  });

  test("memory stats keeps the running peak", () => {
    let state = startedState("job", false);
    state = reduceRenderFrame(state, {
      method: "runtime.memory_stats",
      params: { vram_peak_gib: 10.2 },
    });
    state = reduceRenderFrame(state, {
      method: "runtime.memory_stats",
      params: { vram_peak_gib: 9.1 },
    });
    expect(state.vramPeakGib).toBeCloseTo(10.2);
  });

  test("done frame transitions to done with output and report", () => {
    let state = startedState("job", false);
    const frame: RenderFrame = {
      method: "svi2.video.done",
      params: {
        output_path: "out_48fps.mp4",
        render_report: { frames: 325, vram_peak_gib: 11.4 },
      },
    };
    state = reduceRenderFrame(state, frame);
    expect(state.phase).toBe("done");
    expect(state.overallFraction).toBe(1);
    expect(state.outputPath).toBe("out_48fps.mp4");
    expect(state.renderReport?.frames).toBe(325);
    expect(state.stageStates.mux).toBe("done");
  });

  test("error frame surfaces code and message", () => {
    let state = startedState("job", false);
    state = reduceRenderFrame(state, {
      method: "svi2.video.error",
      params: { code: -32105, message: "out of vram" },
    });
    expect(state.phase).toBe("error");
    expect(state.errorCode).toBe(-32105);
    expect(state.stageStates.diffusion).toBe("error");
  });

  test("cancelled state resets stages", () => {
    const state = cancelledState(startedState("job", false));
    expect(state.phase).toBe("cancelled");
    expect(state.stageStates.diffusion).toBe("idle");
  });

  test("started state records last frame timestamp", () => {
    const state = startedState("job", false, 1000);
    expect(state.lastFrameAt).toBe(1000);
    expect(state.stalled).toBe(false);
  });

  test("each frame advances last frame timestamp and clears stall", () => {
    let state = markStalled(startedState("job", false, 1000));
    expect(state.stalled).toBe(true);
    state = reduceRenderFrame(
      state,
      { method: "svi2.video.progress", params: { fraction: 0.5 } },
      2000,
    );
    expect(state.stalled).toBe(false);
    expect(state.lastFrameAt).toBe(2000);
  });

  test("markStalled only flags a running render", () => {
    expect(markStalled(initialRenderState()).stalled).toBe(false);
    expect(markStalled(startedState("job", false)).stalled).toBe(true);
  });

  test("connection lost transitions running render to error", () => {
    const state = connectionLostState(startedState("job", false));
    expect(state.phase).toBe("error");
    expect(state.errorCode).toBe(CONNECTION_LOST_CODE);
    expect(state.errorMessage).toContain("check History");
    expect(state.stageStates.diffusion).toBe("error");
  });

  test("renderStateFromJob maps a succeeded job to a done state", () => {
    const job: RenderJob = {
      id: "j1",
      presetId: "svi-canonical",
      params: { ref_image_path: "a.png", prompts: ["x"] },
      status: "succeeded",
      outputPath: "out.mp4",
      renderReport: { frames: 100, vram_peak_gib: 11.4 },
      errorCode: null,
      errorMessage: null,
      createdAt: "2026-06-09T00:00:00Z",
      updatedAt: "2026-06-09T00:10:00Z",
    };
    const state = renderStateFromJob(job);
    expect(state.phase).toBe("done");
    expect(state.outputPath).toBe("out.mp4");
    expect(state.vramPeakGib).toBeCloseTo(11.4);
    expect(state.stageStates.mux).toBe("done");
  });

  test("renderStateFromJob maps a failed job to an error state", () => {
    const job: RenderJob = {
      id: "j2",
      presetId: null,
      params: { ref_image_path: "a.png", prompts: ["x"] },
      status: "failed",
      outputPath: null,
      renderReport: null,
      errorCode: -32106,
      errorMessage: "boom",
      createdAt: "2026-06-09T00:00:00Z",
      updatedAt: "2026-06-09T00:10:00Z",
    };
    const state = renderStateFromJob(job);
    expect(state.phase).toBe("error");
    expect(state.errorCode).toBe(-32106);
  });
});
