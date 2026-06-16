import { describe, expect, it } from "vitest";
import {
  runProgressToJobStatus,
  type RunProgress,
} from "../../src/views/recipe/components/storyboard/storyboard_data";

function rp(status: RunProgress["status"]): RunProgress {
  return { jobId: "job-1", runId: "run-1", status };
}

describe("runProgressToJobStatus", () => {
  it("generating → rendering", () => {
    expect(runProgressToJobStatus(rp("generating"))).toBe("rendering");
  });

  it("done → ready", () => {
    expect(runProgressToJobStatus(rp("done"))).toBe("ready");
  });

  it("failed → failed", () => {
    expect(runProgressToJobStatus(rp("failed"))).toBe("failed");
  });

  it("queued → queued", () => {
    expect(runProgressToJobStatus(rp("queued"))).toBe("queued");
  });

  it("cancelled → queued (no cancelled job-status state in the carousel)", () => {
    expect(runProgressToJobStatus(rp("cancelled"))).toBe("queued");
  });
});
