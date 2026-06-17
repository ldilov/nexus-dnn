import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import type { RuntimeHealth } from "../../src/services/runtime_client";

let health: RuntimeHealth;

vi.mock("../../src/services/runtime_client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../src/services/runtime_client")>();
  return {
    ...actual,
    getRuntimeHealth: () => Promise.resolve(health),
  };
});

import { DeploymentHeader } from "../../src/views/recipe/components/deployment_header";
import {
  getDesiredWarmup,
  setDesiredWarmup,
} from "../../src/services/worker_pref";

const deployment = {
  id: "dep-1",
  backendRuntimePreference: "indextts.python",
} as never;

function baseHealth(over: Partial<RuntimeHealth>): RuntimeHealth {
  return {
    badge: "ready",
    modelLoaded: true,
    uptimeSeconds: 10,
    vramUsedMb: 0,
    vramTotalMb: 0,
    lastErrorCategory: null,
    ...over,
  };
}

describe("DeploymentHeader warmup UI", () => {
  beforeEach(() => {
    setDesiredWarmup(true);
  });

  afterEach(() => {
    cleanup();
    setDesiredWarmup(true);
  });

  it("renders the preload toggle when the pool supports >1 worker", async () => {
    health = baseHealth({ workersCeiling: 2, workersActive: 1 });
    render(<DeploymentHeader deployment={deployment} />);

    const toggle = await screen.findByLabelText<HTMLInputElement>("Preload models on start");
    expect(toggle.checked).toBe(true);
  });

  it("unchecking the toggle flips the shared warmup preference", async () => {
    health = baseHealth({ workersCeiling: 2, workersActive: 1 });
    render(<DeploymentHeader deployment={deployment} />);

    const toggle = await screen.findByLabelText<HTMLInputElement>("Preload models on start");
    await act(async () => {
      toggle.click();
    });

    await waitFor(() => expect(getDesiredWarmup()).toBe(false));
  });

  it("shows the warming indicator while workers are warming", async () => {
    health = baseHealth({ workersCeiling: 2, workersActive: 2, workersWarm: 1, workersWarming: 1 });
    render(<DeploymentHeader deployment={deployment} />);

    expect(await screen.findByText(/Warming 1\/2/)).toBeTruthy();
  });

  it("hides the warming indicator when nothing is warming", async () => {
    health = baseHealth({ workersCeiling: 2, workersActive: 2, workersWarm: 2, workersWarming: 0 });
    render(<DeploymentHeader deployment={deployment} />);

    await screen.findByLabelText("Preload models on start");
    expect(screen.queryByText(/Warming/)).toBeNull();
  });
});
