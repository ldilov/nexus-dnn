import { describe, expect, it, vi, beforeEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import type { ProgressEvent } from "../../src/services/types";
import type { StoryboardJob } from "../../src/views/recipe/components/run_panel_items";

const createRunMock = vi.fn();
const createRunsMock = vi.fn();
const subscribeMock = vi.fn();
const cancelRunMock = vi.fn();
const getRuntimeHealthMock = vi.fn();

// Per-run SSE callback registry so the test can drive events into each stream.
const streams = new Map<string, (event: ProgressEvent) => void>();

vi.mock("../../src/services/runs_client", async () => {
  const actual = await vi.importActual<typeof import("../../src/services/runs_client")>(
    "../../src/services/runs_client",
  );
  return {
    ...actual,
    createRun: (...args: unknown[]) => createRunMock(...args),
    createRuns: (...args: unknown[]) => createRunsMock(...args),
    cancelRun: (...args: unknown[]) => cancelRunMock(...args),
    subscribeRunProgress: (
      _deploymentId: string,
      runId: string,
      onEvent: (event: ProgressEvent) => void,
    ) => {
      streams.set(runId, onEvent);
      return () => streams.delete(runId);
    },
  };
});

vi.mock("../../src/services/runtime_client", () => ({
  getRuntimeHealth: (...args: unknown[]) => getRuntimeHealthMock(...args),
}));

// Import AFTER the mocks are registered.
import { RunPanel } from "../../src/views/recipe/components/run_panel";

function job(jobId: string, label: string): StoryboardJob {
  return { jobId, label, segment: { text: label, voice_asset_id: "v1" } };
}

const sixJobs: StoryboardJob[] = [
  job("j0", "SEG-001"),
  job("j1", "SEG-002"),
  job("j2", "SEG-003"),
  job("j3", "SEG-004"),
  job("j4", "SEG-005"),
  job("j5", "SEG-006"),
];

const payload = { script: "", outputFormat: "mp3" as const };

function renderPanel(extra?: {
  onJobProgressChange?: (m: Map<string, unknown>) => void;
}): void {
  render(
    <MemoryRouter>
      <RunPanel
        deploymentId="dep_x"
        createPayload={payload}
        canGenerate
        storyboardJobs={sixJobs}
        onJobProgressChange={extra?.onJobProgressChange as never}
      />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  streams.clear();
  getRuntimeHealthMock.mockResolvedValue({
    badge: "ready",
    modelLoaded: true,
    uptimeSeconds: 1,
    vramUsedMb: 0,
    vramTotalMb: 0,
    lastErrorCategory: null,
    workersCeiling: 4,
    workersActive: 3,
  });
});

describe("RunPanel storyboard fan-out", () => {
  it("issues 3 createRun calls (one per chunk) when workersActive=3 and 6 jobs", async () => {
    createRunsMock.mockResolvedValue([
      { runId: "runA", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
      { runId: "runB", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
      { runId: "runC", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
    ]);

    renderPanel();
    const button = await screen.findByRole("button", { name: /Generate/i });

    await act(async () => {
      button.click();
    });

    await waitFor(() => {
      expect(createRunsMock).toHaveBeenCalledTimes(1);
    });
    const [, payloads] = createRunsMock.mock.calls[0] as [string, Array<{ prebuiltSegments: unknown[] }>];
    expect(payloads).toHaveLength(3);
    // 6 jobs / 3 workers → balanced [2,2,2].
    expect(payloads.map((p) => p.prebuiltSegments.length)).toEqual([2, 2, 2]);
  });

  it("maps each chunk's SSE events to the right items and re-enables Generate when all terminal", async () => {
    createRunsMock.mockResolvedValue([
      { runId: "runA", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
      { runId: "runB", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
      { runId: "runC", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
    ]);

    const progressSnapshots: Array<Map<string, { status: string }>> = [];
    renderPanel({
      onJobProgressChange: (m) => progressSnapshots.push(m as Map<string, { status: string }>),
    });

    const button = await screen.findByRole("button", { name: /Generate/i });
    await act(async () => {
      button.click();
    });

    await waitFor(() => {
      expect(streams.size).toBe(3);
    });

    // runB index 1 maps to global job j3 (chunk B = [j2, j3]).
    await act(async () => {
      streams.get("runB")?.({ type: "segment_started", runId: "runB", globalIndex: 1 });
    });
    await waitFor(() => {
      const last = progressSnapshots[progressSnapshots.length - 1]!;
      expect(last.get("j3")?.status).toBe("generating");
    });

    // While running, Generate is disabled and a Cancel control is present.
    const generating = screen.getByRole("button", { name: /Generating/i }) as HTMLButtonElement;
    expect(generating.disabled).toBe(true);
    expect(screen.getByRole("button", { name: /Cancel all running segments/i })).toBeTruthy();

    // Complete every job across all three runs → phase becomes terminal.
    await act(async () => {
      const done = (runId: string, idx: number): ProgressEvent => ({
        type: "segment_completed",
        runId,
        globalIndex: idx,
        durationMs: 100,
        cacheHit: false,
        audioArtifactRef: "ref",
      });
      streams.get("runA")?.(done("runA", 0));
      streams.get("runA")?.(done("runA", 1));
      streams.get("runB")?.(done("runB", 0));
      streams.get("runB")?.(done("runB", 1));
      streams.get("runC")?.(done("runC", 0));
      streams.get("runC")?.(done("runC", 1));
    });

    await waitFor(() => {
      const regen = screen.getByRole("button", { name: /^Generate$/i }) as HTMLButtonElement;
      expect(regen.disabled).toBe(false);
    });
    const last = progressSnapshots[progressSnapshots.length - 1]!;
    expect([...last.values()].every((v) => v.status === "done")).toBe(true);
  });

  it("cancel cancels every run id, ignoring conflicts", async () => {
    createRunsMock.mockResolvedValue([
      { runId: "runA", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
      { runId: "runB", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
      { runId: "runC", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
    ]);
    cancelRunMock.mockRejectedValue(new Error("409 conflict"));

    renderPanel();
    const button = await screen.findByRole("button", { name: /Generate/i });
    await act(async () => {
      button.click();
    });
    await waitFor(() => expect(streams.size).toBe(3));

    const cancel = screen.getByRole("button", { name: /Cancel all running segments/i });
    await act(async () => {
      cancel.click();
    });

    await waitFor(() => {
      expect(cancelRunMock).toHaveBeenCalledTimes(3);
    });
    const cancelled = cancelRunMock.mock.calls.map((c) => c[1]);
    expect(cancelled.sort()).toEqual(["runA", "runB", "runC"]);
  });

  it("with workersActive=1 issues a single chunk containing all jobs (single-batch mode)", async () => {
    getRuntimeHealthMock.mockResolvedValue({
      badge: "running",
      modelLoaded: true,
      uptimeSeconds: 1,
      vramUsedMb: 0,
      vramTotalMb: 0,
      lastErrorCategory: null,
      workersCeiling: 4,
      workersActive: 1,
    });
    createRunsMock.mockResolvedValue([
      { runId: "runA", queuePosition: 0, preflight: { unresolvedCharacters: [], predictedFilenames: [], parserWarnings: [] } },
    ]);

    renderPanel();
    const button = await screen.findByRole("button", { name: /Generate/i });
    await act(async () => {
      button.click();
    });

    await waitFor(() => expect(createRunsMock).toHaveBeenCalledTimes(1));
    const [, payloads] = createRunsMock.mock.calls[0] as [string, Array<{ prebuiltSegments: unknown[] }>];
    expect(payloads).toHaveLength(1);
    expect(payloads[0]!.prebuiltSegments).toHaveLength(6);
  });
});
