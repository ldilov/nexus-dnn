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

  it("no cross-row bleed: a pending row with no live progress shows no bar even while a global install is active", () => {
    const step = makeStep({ id: "model", type: "model_artifact", status: "pending" });
    // installActive=true (sibling row installing), but THIS row has no live → no bar.
    render(
      <StepRow
        step={step}
        upstreamSatisfied
        installActive
        live={undefined}
        onInstallOnly={noop}
        onRetry={noop}
        onReinstall={noop}
      />,
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("a pending row that has its own live progress DOES show a bar (targeted single-row install)", () => {
    const step = makeStep({ id: "model", type: "model_artifact", status: "pending" });
    const live = makeLive({ currentBytes: 250, totalBytes: 1000, pct: 25, phase: "downloading" });
    renderRow(step, live);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "25");
  });

  it("paused partial: a pending+resumable row with partial bytes shows PAUSED + frozen progress", () => {
    const step = makeStep({
      id: "model_wan_base",
      type: "model_artifact",
      status: "pending",
      satisfied: false,
      progress: { phase: "downloading", current_bytes: 3_221_225_472, total_bytes: 8_589_934_592 },
      estimated_remaining_bytes: 5_368_709_120,
    });
    render(
      <StepRow
        step={step}
        upstreamSatisfied
        installActive={false}
        resumable
        live={undefined}
        onInstallOnly={noop}
        onRetry={noop}
        onReinstall={noop}
      />,
    );
    // Status label + frozen progress line both read "Paused".
    expect(screen.getAllByText("Paused")).toHaveLength(2);
    expect(screen.getByText(/3\.0 GB \/ 8\.0 GB/)).toBeInTheDocument();
    expect(screen.getByText("38%")).toBeInTheDocument();
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "38");
    expect(screen.getByRole("button", { name: "Install only this" })).toBeEnabled();
  });

  it("paused partial: no PAUSED treatment while an install run is active or nothing is resumable", () => {
    const step = makeStep({
      id: "model_wan_base",
      type: "model_artifact",
      status: "pending",
      satisfied: false,
      progress: { phase: "downloading", current_bytes: 1024, total_bytes: 4096 },
      estimated_remaining_bytes: 3072,
    });
    render(
      <StepRow
        step={step}
        upstreamSatisfied
        installActive={false}
        resumable={false}
        live={undefined}
        onInstallOnly={noop}
        onRetry={noop}
        onReinstall={noop}
      />,
    );
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.queryByText("Paused", { selector: "span" })).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("running bytes line carries the phase label prefix (canonical mock anatomy)", () => {
    const step = makeStep({ id: "python", type: "runtime", status: "running" });
    const live = makeLive({
      currentBytes: 130_023_424,
      totalBytes: 228_589_568,
      pct: 59,
      speedBps: 8_808_038,
      etaSeconds: 12,
      phase: "installing",
    });
    renderRow(step, live);
    // Status label + live-line prefix both read "Installing".
    expect(screen.getAllByText("Installing").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/124.*MB \/ 218.*MB/)).toBeInTheDocument();
    expect(screen.getByText("59%")).toBeInTheDocument();
    expect(screen.getByText("ETA 12s")).toBeInTheDocument();
  });

  it("integrity failure: a satisfied-but-corrupt row warns and prompts reinstall", () => {
    const step = makeStep({
      id: "model",
      type: "model_artifact",
      status: "ok",
      satisfied: true,
      integrity: { ok: false, detail: "weights.bin is 5 bytes, expected 9000" },
    });
    render(
      <StepRow
        step={step}
        upstreamSatisfied
        installActive={false}
        live={undefined}
        onInstallOnly={noop}
        onRetry={noop}
        onReinstall={noop}
      />,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/Integrity check failed/)).toBeInTheDocument();
    expect(screen.getByText("Needs reinstall")).toBeInTheDocument();
    expect(screen.getByText(/expected 9000/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reinstall" })).toBeInTheDocument();
  });

  it("integrity ok: a verified row shows no warning", () => {
    const step = makeStep({
      id: "model",
      type: "model_artifact",
      status: "ok",
      satisfied: true,
      integrity: { ok: true, detail: null },
    });
    render(
      <StepRow
        step={step}
        upstreamSatisfied
        installActive={false}
        live={undefined}
        onInstallOnly={noop}
        onRetry={noop}
        onReinstall={noop}
      />,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Installed")).toBeInTheDocument();
  });

  it("G10: every status renders exactly one status-dot signal in the status pill", () => {
    const statuses: DependencyStep["status"][] = [
      "pending",
      "running",
      "ok",
      "failed",
      "skipped",
    ];
    for (const status of statuses) {
      const { unmount } = render(
        <StepRow
          step={makeStep({ id: `step-${status}`, status, satisfied: status === "ok" })}
          upstreamSatisfied
          installActive={false}
          live={undefined}
          onInstallOnly={noop}
          onRetry={noop}
          onReinstall={noop}
        />,
      );
      expect(screen.getAllByTestId("step-status-dot")).toHaveLength(1);
      unmount();
    }
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
