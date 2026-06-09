import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

import type { DependencyStep } from "../../../types/extension_dependencies";
import type { LiveStepProgress } from "../use_install_progress";
import { StepRow } from "./step_row";

function makeStep(overrides: Partial<DependencyStep> = {}): DependencyStep {
  return {
    id: "runtime",
    type: "runtime",
    requires: [],
    status: "running",
    satisfied: false,
    artifact: null,
    last_error: null,
    progress: null,
    estimated_remaining_bytes: 0,
    ...overrides,
  };
}

function makeLive(overrides: Partial<LiveStepProgress> = {}): LiveStepProgress {
  return {
    currentBytes: 0,
    totalBytes: 0,
    pct: 0,
    reportedPct: null,
    speedBps: 0,
    etaSeconds: null,
    phase: "",
    message: "",
    ...overrides,
  };
}

const noop = () => {};

function renderRow(step: DependencyStep, live?: LiveStepProgress) {
  return render(
    <StepRow
      step={step}
      upstreamSatisfied
      installActive
      live={live}
      onInstallOnly={noop}
      onRetry={noop}
      onReinstall={noop}
    />,
  );
}

describe("StepRow progress region", () => {
  it("AC-3.1: renders bytes + speed + ETA when bytes_total>0", () => {
    const step = makeStep({ id: "model", type: "model_artifact" });
    const live = makeLive({
      currentBytes: 524_288_000,
      totalBytes: 1_048_576_000,
      pct: 50,
      speedBps: 10_485_760,
      etaSeconds: 50,
      phase: "downloading",
    });
    renderRow(step, live);

    expect(screen.getByText(/500.*MB \/ 1000.*MB/)).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("10 MB/s")).toBeInTheDocument();
    expect(screen.getByText("ETA 50s")).toBeInTheDocument();

    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "50");
    expect(bar).not.toHaveAttribute("aria-busy");
  });

  it("AC-3.2: renders phase label + indeterminate bar when only phase/message", () => {
    const step = makeStep({ id: "pkgs", type: "package_set" });
    const live = makeLive({
      phase: "resolving",
      message: "Resolving dependencies...",
      totalBytes: 0,
      reportedPct: null,
    });
    renderRow(step, live);

    expect(screen.getByText("Resolving")).toBeInTheDocument();
    expect(screen.getByText("Resolving dependencies...")).toBeInTheDocument();

    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-busy", "true");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("AC-3.3: renders determinate bar from pct when pct present without bytes", () => {
    const step = makeStep({ id: "pkgs", type: "package_set" });
    const live = makeLive({
      phase: "installing",
      message: "12/40 packages",
      totalBytes: 0,
      reportedPct: 30,
    });
    renderRow(step, live);

    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "30");
    expect(bar).not.toHaveAttribute("aria-busy");
  });

  it("AC-3.4: every step type renders the same row structure (icon/title/status/progress)", () => {
    const types = ["runtime", "package_set", "system_binary", "model_artifact", "validation"];
    for (const type of types) {
      const { unmount } = renderRow(
        makeStep({ id: type, type }),
        makeLive({ phase: "running", message: "working" }),
      );
      expect(screen.getByRole("article")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.getByText(type)).toBeInTheDocument();
      expect(screen.getByText("Installing")).toBeInTheDocument();
      unmount();
    }
  });

  it("AC-3.6: determinate progressbar exposes aria-valuemin/max/now", () => {
    const step = makeStep({ id: "model", type: "model_artifact" });
    const live = makeLive({ currentBytes: 250, totalBytes: 1000, pct: 25 });
    renderRow(step, live);

    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow", "25");
  });

  it("AC-3.3: unknown total + bytes flowing → 'X downloaded · speed' + indeterminate bar", () => {
    const step = makeStep({ id: "model", type: "model_artifact" });
    const live = makeLive({
      currentBytes: 314_572_800,
      totalBytes: 0,
      pct: 0,
      reportedPct: null,
      speedBps: 5_242_880,
      phase: "downloading",
    });
    renderRow(step, live);

    expect(screen.getByText(/300.*MB/)).toBeInTheDocument();
    expect(screen.getByText("downloaded", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("5.0 MB/s")).toBeInTheDocument();
    expect(screen.queryByText(/0%/)).not.toBeInTheDocument();

    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-busy", "true");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("AC-3.3: unknown-total fallback omits speed when not yet measured", () => {
    const step = makeStep({ id: "model", type: "model_artifact" });
    const live = makeLive({
      currentBytes: 104_857_600,
      totalBytes: 0,
      reportedPct: null,
      speedBps: 0,
      phase: "downloading",
    });
    renderRow(step, live);

    expect(screen.getByText(/100.*MB/)).toBeInTheDocument();
    expect(screen.getByText("downloaded", { exact: false })).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-busy", "true");
  });

  it("AC-3.4: real % path preserved when total_bytes > 0 (no unknown-total fallback)", () => {
    const step = makeStep({ id: "model", type: "model_artifact" });
    const live = makeLive({
      currentBytes: 524_288_000,
      totalBytes: 1_048_576_000,
      pct: 50,
      speedBps: 10_485_760,
      etaSeconds: 50,
      phase: "downloading",
    });
    renderRow(step, live);

    expect(screen.getByText(/500.*MB \/ 1000.*MB/)).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.queryByText(/downloaded$/)).not.toBeInTheDocument();
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "50");
    expect(bar).not.toHaveAttribute("aria-busy");
  });
});
