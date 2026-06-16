import { cleanup, render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

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
  RenderRequestProvider,
  useRenderRequest,
} from "../../src/store/render_request_store";

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

function setVisibility(state: "visible" | "hidden"): void {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    get: () => state,
  });
}

beforeEach(() => {
  sessionStorage.clear();
  subscribeRenderStream.mockReset();
  startRender.mockReset();
  cancelRender.mockReset();
  getRenderJob.mockReset();
  startRender.mockResolvedValue({ jobId: "job-1" });
  getRenderJob.mockResolvedValue({
    id: "job-1",
    presetId: null,
    params: { ref_image_path: "a.png", prompts: ["x"] },
    status: "running",
    outputPath: null,
    renderReport: null,
    errorCode: null,
    errorMessage: null,
    createdAt: "2026-06-09T00:00:00Z",
    updatedAt: "2026-06-09T00:01:00Z",
  });
  setVisibility("visible");
});

afterEach(() => {
  captured = null;
  cleanup();
});

describe("re-subscribe render stream on tab return", () => {
  test("visibilitychange to visible re-subscribes with the same jobId", async () => {
    const firstCleanup = vi.fn();
    const secondCleanup = vi.fn();
    subscribeRenderStream
      .mockReturnValueOnce(firstCleanup)
      .mockReturnValueOnce(secondCleanup);

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );

    await act(async () => {
      await captured?.startRenderJob();
    });
    expect(subscribeRenderStream).toHaveBeenCalledTimes(1);
    expect(subscribeRenderStream.mock.calls[0][0]).toBe("job-1");

    act(() => {
      setVisibility("visible");
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(subscribeRenderStream).toHaveBeenCalledTimes(2);
    expect(subscribeRenderStream.mock.calls[1][0]).toBe("job-1");
    expect(firstCleanup).toHaveBeenCalledTimes(1);
  });

  test("window focus re-subscribes with the same jobId", async () => {
    const firstCleanup = vi.fn();
    const secondCleanup = vi.fn();
    subscribeRenderStream
      .mockReturnValueOnce(firstCleanup)
      .mockReturnValueOnce(secondCleanup);

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );

    await act(async () => {
      await captured?.startRenderJob();
    });
    expect(subscribeRenderStream).toHaveBeenCalledTimes(1);

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });

    expect(subscribeRenderStream).toHaveBeenCalledTimes(2);
    expect(subscribeRenderStream.mock.calls[1][0]).toBe("job-1");
    expect(firstCleanup).toHaveBeenCalledTimes(1);
  });

  test("hidden visibilitychange does not re-subscribe", async () => {
    subscribeRenderStream.mockReturnValue(vi.fn());

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );

    await act(async () => {
      await captured?.startRenderJob();
    });
    expect(subscribeRenderStream).toHaveBeenCalledTimes(1);

    act(() => {
      setVisibility("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(subscribeRenderStream).toHaveBeenCalledTimes(1);
  });

  test("focus when not running does not re-subscribe", () => {
    subscribeRenderStream.mockReturnValue(vi.fn());

    render(
      <RenderRequestProvider>
        <Probe />
      </RenderRequestProvider>,
    );

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });

    expect(subscribeRenderStream).not.toHaveBeenCalled();
  });
});
