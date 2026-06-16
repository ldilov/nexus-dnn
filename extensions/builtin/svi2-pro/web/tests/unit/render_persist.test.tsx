import { cleanup, render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { RenderJob } from "../../src/services/types";

const subscribeRenderStream = vi.fn();
const startRender = vi.fn();
const cancelRender = vi.fn();
const getRenderJob = vi.fn();

vi.mock("../../src/services/render_client", () => ({
  subscribeRenderStream: (...args: unknown[]) => subscribeRenderStream(...args),
  startRender: (...args: unknown[]) => startRender(...args),
  cancelRender: (...args: unknown[]) => cancelRender(...args),
}));

vi.mock("../../src/services/history_client", () => ({
  getRenderJob: (...args: unknown[]) => getRenderJob(...args),
}));

import {
  ACTIVE_RENDER_KEY,
  RenderRequestProvider,
  useRenderRequest,
} from "../../src/store/render_request_store";

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function jobOf(status: RenderJob["status"]): RenderJob {
  return {
    id: "job-1",
    presetId: null,
    params: { ref_image_path: "a.png", prompts: ["x"] },
    status,
    outputPath: status === "succeeded" ? "out.mp4" : null,
    renderReport: null,
    errorCode: status === "failed" ? -32106 : null,
    errorMessage: status === "failed" ? "boom" : null,
    createdAt: "2026-06-09T00:00:00Z",
    updatedAt: "2026-06-09T00:01:00Z",
  };
}

beforeEach(() => {
  sessionStorage.clear();
  subscribeRenderStream.mockReset().mockReturnValue(vi.fn());
  startRender.mockReset().mockResolvedValue({ jobId: "job-1" });
  cancelRender.mockReset();
  getRenderJob.mockReset();
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => "hidden",
  });
});

afterEach(() => {
  captured = null;
  cleanup();
});

describe("active render persistence and hydration", () => {
  test("starting a job persists the jobId under the extension-owned key", async () => {
    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      await captured?.startRenderJob();
    });
    const stored = sessionStorage.getItem(ACTIVE_RENDER_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string).jobId).toBe("job-1");
  });

  test("a still-running stored job is restored and re-subscribed on mount", async () => {
    sessionStorage.setItem(ACTIVE_RENDER_KEY, JSON.stringify({ jobId: "job-1" }));
    getRenderJob.mockResolvedValue(jobOf("running"));

    await act(async () => {
      render(
        <RenderRequestProvider>
          <Probe />
        </RenderRequestProvider>,
      );
    });

    expect(getRenderJob).toHaveBeenCalledWith("job-1");
    expect(captured?.render.phase).toBe("running");
    expect(captured?.render.jobId).toBe("job-1");
    expect(subscribeRenderStream).toHaveBeenCalledTimes(1);
    expect(subscribeRenderStream.mock.calls[0][0]).toBe("job-1");
  });

  test("a terminal stored job is cleared and shown as a result without subscribing", async () => {
    sessionStorage.setItem(ACTIVE_RENDER_KEY, JSON.stringify({ jobId: "job-1" }));
    getRenderJob.mockResolvedValue(jobOf("succeeded"));

    await act(async () => {
      render(
        <RenderRequestProvider>
          <Probe />
        </RenderRequestProvider>,
      );
    });

    expect(getRenderJob).toHaveBeenCalledWith("job-1");
    expect(captured?.render.phase).toBe("done");
    expect(captured?.render.outputPath).toBe("out.mp4");
    expect(subscribeRenderStream).not.toHaveBeenCalled();
    expect(sessionStorage.getItem(ACTIVE_RENDER_KEY)).toBeNull();
  });

  test("cancelling a job clears the persisted key", async () => {
    cancelRender.mockResolvedValue({ status: "cancelled" });
    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );
    await act(async () => {
      await captured?.startRenderJob();
    });
    expect(sessionStorage.getItem(ACTIVE_RENDER_KEY)).not.toBeNull();

    await act(async () => {
      await captured?.cancelRenderJob();
    });
    expect(sessionStorage.getItem(ACTIVE_RENDER_KEY)).toBeNull();
  });
});
