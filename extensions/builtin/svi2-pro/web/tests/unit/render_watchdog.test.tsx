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
  RenderRequestProvider,
  useRenderRequest,
} from "../../src/store/render_request_store";

let captured: ReturnType<typeof useRenderRequest> | null = null;

function Probe(): null {
  captured = useRenderRequest();
  return null;
}

const STALL_LOST_MS = 240_000;

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
  vi.useFakeTimers();
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
  vi.useRealTimers();
});

async function startThenStall(): Promise<void> {
  render(
    <RenderRequestProvider>
      <Probe />
    </RenderRequestProvider>,
  );
  await act(async () => {
    await captured?.startRenderJob();
  });
  expect(subscribeRenderStream).toHaveBeenCalledTimes(1);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(STALL_LOST_MS + 5_000);
  });
}

describe("watchdog reconnects before declaring connection lost", () => {
  test("still-running job keeps the render running after reconnect", async () => {
    getRenderJob.mockResolvedValue(jobOf("running"));
    await startThenStall();

    expect(subscribeRenderStream).toHaveBeenCalledTimes(2);
    expect(getRenderJob).toHaveBeenCalledWith("job-1");
    expect(captured?.render.phase).toBe("running");
  });

  test("rejected status check transitions to connection lost", async () => {
    getRenderJob.mockRejectedValue(new Error("gone"));
    await startThenStall();

    expect(subscribeRenderStream).toHaveBeenCalledTimes(2);
    expect(captured?.render.phase).toBe("error");
    expect(captured?.render.errorCode).toBe(-32108);
  });

  test("terminal failed job adopts the job result state", async () => {
    getRenderJob.mockResolvedValue(jobOf("failed"));
    await startThenStall();

    expect(captured?.render.phase).toBe("error");
    expect(captured?.render.errorCode).toBe(-32106);
  });

  test("reconnect is attempted once even across repeated ticks", async () => {
    getRenderJob.mockReturnValue(new Promise(() => undefined));
    await startThenStall();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(15_000);
    });

    expect(getRenderJob).toHaveBeenCalledTimes(1);
    expect(subscribeRenderStream).toHaveBeenCalledTimes(2);
  });
});
