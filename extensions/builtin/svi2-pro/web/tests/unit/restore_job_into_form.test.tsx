import { cleanup, render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { RenderJob } from "../../src/services/types";

const subscribeRenderStream = vi.fn();
const startRender = vi.fn();
const cancelRender = vi.fn();
const getRenderJob = vi.fn();
const toastWarning = vi.fn();

vi.mock("../../src/services/render_client", () => ({
  subscribeRenderStream: (...args: unknown[]) => subscribeRenderStream(...args),
  startRender: (...args: unknown[]) => startRender(...args),
  cancelRender: (...args: unknown[]) => cancelRender(...args),
}));

vi.mock("../../src/services/history_client", () => ({
  getRenderJob: (...args: unknown[]) => getRenderJob(...args),
}));

vi.mock("sonner", () => ({
  toast: {
    warning: (...args: unknown[]) => toastWarning(...args),
    error: vi.fn(),
    success: vi.fn(),
  },
}));

import { RenderRequestProvider, useRenderRequest } from "../../src/store/render_request_store";

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function succeededJob(overrides: Partial<RenderJob> = {}): RenderJob {
  return {
    id: "job-7",
    presetId: "flf2v-morph-lowvram",
    params: {
      ref_image_path: "/ws/uploads/anchor.png",
      last_image_path: "/ws/uploads/end.png",
      prompts: ["a demonic nun"],
      width: 960,
      height: 544,
      num_clips: 1,
      num_inference_steps: 30,
    },
    status: "succeeded",
    outputPath: "/ws/out/job-7.mp4",
    renderReport: { frames: 65 },
    errorCode: null,
    errorMessage: null,
    createdAt: "2026-06-21T00:00:00Z",
    updatedAt: "2026-06-21T00:05:00Z",
    ...overrides,
  };
}

beforeEach(() => {
  sessionStorage.clear();
  subscribeRenderStream.mockReset().mockReturnValue(vi.fn());
  startRender.mockReset().mockResolvedValue({ jobId: "job-1" });
  cancelRender.mockReset();
  getRenderJob.mockReset();
  toastWarning.mockReset();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true } as Response));
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => "hidden",
  });
});

afterEach(() => {
  captured = null;
  vi.unstubAllGlobals();
  cleanup();
});

describe("restoreJobIntoForm", () => {
  test("restores params, preset, images and render state when both images exist", async () => {
    const job = succeededJob();
    getRenderJob.mockResolvedValue(job);

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      await captured?.restoreJobIntoForm(job);
    });

    // Params from job.params win (prompts + settings)
    expect(captured?.params.prompts).toEqual(["a demonic nun"]);
    expect(captured?.params.width).toBe(960);
    expect(captured?.params.num_inference_steps).toBe(30);
    expect(captured?.params.ref_image_path).toBe("/ws/uploads/anchor.png");
    expect(captured?.params.last_image_path).toBe("/ws/uploads/end.png");

    // Preset id + applied flag
    expect(captured?.presetId).toBe("flf2v-morph-lowvram");
    expect(captured?.presetApplied).toBe(true);

    // Image basenames derived from the stored paths
    expect(captured?.refImageName).toBe("anchor.png");
    expect(captured?.lastImageName).toBe("end.png");

    // Render state shows the output video
    expect(captured?.render.phase).toBe("done");
    expect(captured?.render.outputPath).toBe("/ws/out/job-7.mp4");

    // No missing-image warning, dirty reset
    expect(toastWarning).not.toHaveBeenCalled();
    expect(captured?.isDirty).toBe(false);
  });

  test("missing ref image: HEAD 404 clears path, warns, but still restores the rest", async () => {
    const job = succeededJob({
      params: {
        ref_image_path: "/ws/uploads/gone.png",
        last_image_path: null,
        prompts: ["keep me"],
        width: 832,
        num_inference_steps: 50,
      },
    });
    getRenderJob.mockResolvedValue(job);
    // HEAD probe returns 404
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 } as Response));

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      await captured?.restoreJobIntoForm(job);
    });

    expect(captured?.params.ref_image_path).toBe("");
    expect(captured?.refImageName).toBeNull();
    expect(toastWarning).toHaveBeenCalledTimes(1);

    // The rest is still restored
    expect(captured?.params.prompts).toEqual(["keep me"]);
    expect(captured?.params.num_inference_steps).toBe(50);
    expect(captured?.render.phase).toBe("done");
    expect(captured?.render.outputPath).toBe("/ws/out/job-7.mp4");
    expect(captured?.isDirty).toBe(false);
  });

  test("falls back to the passed job when getRenderJob rejects", async () => {
    const job = succeededJob({ params: { ref_image_path: "", prompts: ["fallback"] } });
    getRenderJob.mockRejectedValue(new Error("offline"));

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      await captured?.restoreJobIntoForm(job);
    });

    expect(captured?.params.prompts).toEqual(["fallback"]);
    expect(captured?.render.phase).toBe("done");
  });

  test("a null preset id restores presetApplied=false", async () => {
    const job = succeededJob({ presetId: null });
    getRenderJob.mockResolvedValue(job);

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      await captured?.restoreJobIntoForm(job);
    });

    expect(captured?.presetId).toBeNull();
    expect(captured?.presetApplied).toBe(false);
  });
});

describe("dirty tracking", () => {
  test("user setters flip isDirty true; restore resets it", async () => {
    const job = succeededJob();
    getRenderJob.mockResolvedValue(job);

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    expect(captured?.isDirty).toBe(false);

    act(() => captured?.setPrompts(["edited"]));
    expect(captured?.isDirty).toBe(true);

    await act(async () => {
      await captured?.restoreJobIntoForm(job);
    });
    expect(captured?.isDirty).toBe(false);
  });

  test("each user setter marks dirty", () => {
    const preset = {
      id: "svi-canonical",
      label: "Canonical",
      description: "x",
      params: {},
    };

    function expectMarksDirty(action: () => void): void {
      render(
        <RenderRequestProvider>
          <Probe />
        </RenderRequestProvider>,
      );
      expect(captured?.isDirty).toBe(false);
      act(action);
      expect(captured?.isDirty).toBe(true);
      cleanup();
    }

    expectMarksDirty(() => captured?.updateParam("cfg_scale", 5));
    expectMarksDirty(() => captured?.setRefImage("a.png", "/ws/a.png"));
    expectMarksDirty(() => captured?.setLastImage("b.png", "/ws/b.png"));
    expectMarksDirty(() => captured?.setMode("text_to_video"));
    expectMarksDirty(() => captured?.setQwenEdit({ enabled: true }));
    expectMarksDirty(() => captured?.setPrompts(["edited"]));
    expectMarksDirty(() => captured?.applyPresetById(preset));
  });

  test("system applyPresetById (markDirty:false) does NOT mark dirty", () => {
    const preset = {
      id: "svi-canonical",
      label: "Canonical",
      description: "x",
      params: {},
    };
    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    expect(captured?.isDirty).toBe(false);
    act(() => captured?.applyPresetById(preset, { markDirty: false }));
    expect(captured?.isDirty).toBe(false);
  });

  test("startRenderJob resets dirty at the start", async () => {
    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    act(() => captured?.setPrompts(["x"]));
    expect(captured?.isDirty).toBe(true);

    await act(async () => {
      await captured?.startRenderJob();
    });
    expect(captured?.isDirty).toBe(false);
  });
});
