import { describe, expect, test } from "vitest";
import {
  cancelledState,
  INITIAL_STATE,
  reduceFrame,
  startedState,
} from "../../src/domain/generate_state";
import type { GenerateFrame } from "../../src/services/generate_events";

describe("generate_state reducer", () => {
  test("progress marks the stage active and prior known stages done", () => {
    const frame: GenerateFrame = {
      method: "trellis2.generate.progress",
      params: { stage: "shape", step: 1, total: 10 },
    };
    const next = reduceFrame(startedState(), frame);
    expect(next.phase).toBe("running");
    expect(next.stage).toBe("shape");
    expect(next.stageStates.load).toBe("done");
    expect(next.stageStates.encode).toBe("done");
    expect(next.stageStates.sparse).toBe("done");
    expect(next.stageStates.shape).toBe("active");
    expect(next.stageStates.glb).toBe("idle");
  });

  test("overall fraction is monotonic and derives from stage + step", () => {
    let state = startedState();
    state = reduceFrame(state, {
      method: "trellis2.generate.progress",
      params: { stage: "sparse", step: 6, total: 12 },
    });
    expect(state.overallFraction).toBeCloseTo(2.5 / 7);
    expect(state.step).toBe(6);
    expect(state.totalSteps).toBe(12);

    state = reduceFrame(state, {
      method: "trellis2.generate.progress",
      params: { stage: "sparse", step: 5, total: 12 },
    });
    expect(state.overallFraction).toBeCloseTo(2.5 / 7);
  });

  test("tolerates unknown stage strings without touching the graph", () => {
    const next = reduceFrame(startedState(), {
      method: "trellis2.generate.progress",
      params: { stage: "future_stage", step: 2, total: 4 },
    });
    expect(next.stage).toBe("future_stage");
    expect(next.step).toBe(2);
    expect(next.stageStates.load).toBe("idle");
  });

  test("ignores unknown methods like runtime.memory_stats", () => {
    const before = startedState();
    const after = reduceFrame(before, {
      method: "runtime.memory_stats",
      params: { vram_peak_gib: 7.2 },
    } as unknown as GenerateFrame);
    expect(after).toEqual(before);
  });

  test("done frame captures glbRef and metadata, no thumbnail", () => {
    const next = reduceFrame(startedState(), {
      method: "trellis2.generate.done",
      params: {
        glbRef: "glb-123",
        metadata: { mesh: { vertices: 1000, faces: 2000 }, textured: false },
      },
    });
    expect(next.phase).toBe("done");
    expect(next.overallFraction).toBe(1);
    expect(next.glbRef).toBe("glb-123");
    expect(next.thumbnailRef).toBeNull();
    expect(next.metadata?.mesh?.faces).toBe(2000);
    expect(next.stageStates.glb).toBe("done");
  });

  test("error frame marks the active known stage errored", () => {
    let state = reduceFrame(startedState(), {
      method: "trellis2.generate.progress",
      params: { stage: "decode", step: 1, total: 4 },
    });
    state = reduceFrame(state, {
      method: "trellis2.generate.error",
      params: { code: 73, message: "OOM" },
    });
    expect(state.phase).toBe("error");
    expect(state.errorCode).toBe(73);
    expect(state.stageStates.decode).toBe("error");
  });

  test("cancelledState flips phase without losing prior data", () => {
    const cancelled = cancelledState({ ...INITIAL_STATE, overallFraction: 0.5 });
    expect(cancelled.phase).toBe("cancelled");
    expect(cancelled.overallFraction).toBe(0.5);
  });
});
