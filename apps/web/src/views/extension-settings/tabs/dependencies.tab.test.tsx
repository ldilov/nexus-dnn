import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";

import type { DependenciesResponse, DependencyStep } from "../../../types/extension_dependencies";

type SwrState = {
  data: DependenciesResponse | undefined;
  error: unknown;
  isLoading: boolean;
};

const swrState: SwrState = { data: undefined, error: undefined, isLoading: false };
const mutateMock = vi.fn();

vi.mock("swr", () => ({
  default: () => ({ ...swrState, mutate: mutateMock }),
}));

const uninstallExtensionMock = vi.fn();
vi.mock("../../../services/extension_dependencies_client", () => ({
  fetchDependencies: vi.fn(),
  startInstall: vi.fn(),
  retryStep: vi.fn(),
  cancelInstall: vi.fn(),
  uninstallExtension: (id: string) => uninstallExtensionMock(id),
}));

vi.mock("../use_install_progress", () => ({
  useInstallProgress: () => ({ active: false, liveByStep: {} }),
}));

const toastSuccess = vi.fn();
const toastError = vi.fn();
vi.mock("sonner", () => ({
  toast: Object.assign((..._a: unknown[]) => {}, {
    success: (...a: unknown[]) => toastSuccess(...a),
    error: (...a: unknown[]) => toastError(...a),
  }),
}));

import { DependenciesTab } from "./dependencies.tab";

function makeStep(overrides: Partial<DependencyStep> = {}): DependencyStep {
  return {
    id: "s1",
    type: "runtime",
    requires: [],
    status: "ok",
    satisfied: true,
    artifact: null,
    last_error: null,
    progress: null,
    estimated_remaining_bytes: 0,
    ...overrides,
  };
}

function setResponse(partial: Partial<DependenciesResponse>): void {
  swrState.data = {
    steps: [],
    all_satisfied: true,
    total_remaining_bytes: 0,
    ...partial,
  };
  swrState.error = undefined;
  swrState.isLoading = false;
}

describe("DependenciesTab — uninstall", () => {
  beforeEach(() => {
    swrState.data = undefined;
    swrState.error = undefined;
    swrState.isLoading = false;
    mutateMock.mockReset();
    uninstallExtensionMock.mockReset();
    toastSuccess.mockReset();
    toastError.mockReset();
  });

  it("AC-6.1: Uninstall button is shown when some step is satisfied", () => {
    setResponse({ steps: [makeStep()], all_satisfied: true });
    render(<DependenciesTab extensionId="ext.demo" />);
    expect(screen.getByRole("button", { name: "Uninstall" })).toBeInTheDocument();
  });

  it("AC-6.1: no Uninstall button when nothing is installed", () => {
    setResponse({
      steps: [makeStep({ status: "pending", satisfied: false })],
      all_satisfied: false,
    });
    render(<DependenciesTab extensionId="ext.demo" />);
    expect(screen.queryByRole("button", { name: "Uninstall" })).not.toBeInTheDocument();
  });

  it("AC-6.2: confirm dialog states venv + exclusive models/size + shared kept", () => {
    setResponse({
      steps: [
        makeStep({ id: "runtime", type: "runtime" }),
        makeStep({
          id: "model",
          type: "model_artifact",
          artifact: { path: "/m", bytes_placed: 2_147_483_648, summary: "weights" },
        }),
      ],
      all_satisfied: true,
    });
    render(<DependenciesTab extensionId="ext.demo" />);

    fireEvent.click(screen.getByRole("button", { name: "Uninstall" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/virtual environment/i)).toBeInTheDocument();
    expect(screen.getByText(/1 model used only by this extension/)).toBeInTheDocument();
    expect(screen.getByText(/2\.0 GB/)).toBeInTheDocument();
    expect(screen.getByText(/shared with another extension are kept/i)).toBeInTheDocument();
  });

  it("AC-6.1/6.2: confirming calls the client then mutates readiness", async () => {
    setResponse({ steps: [makeStep()], all_satisfied: true });
    uninstallExtensionMock.mockResolvedValue({
      extension_id: "ext.demo",
      removed_models: 1,
      kept_shared_models: 2,
      freed_bytes: 1_073_741_824,
      leases_released: 0,
      install_dirs_removed: 1,
    });
    render(<DependenciesTab extensionId="ext.demo" />);

    fireEvent.click(screen.getByRole("button", { name: "Uninstall" }));
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Uninstall" }));

    await waitFor(() => expect(uninstallExtensionMock).toHaveBeenCalledWith("ext.demo"));
    await waitFor(() => expect(mutateMock).toHaveBeenCalled());
    expect(toastSuccess).toHaveBeenCalled();
  });

  it("AC-6.1: uninstall failure surfaces an error and does not mutate", async () => {
    setResponse({ steps: [makeStep()], all_satisfied: true });
    uninstallExtensionMock.mockRejectedValue(new Error("boom"));
    render(<DependenciesTab extensionId="ext.demo" />);

    fireEvent.click(screen.getByRole("button", { name: "Uninstall" }));
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Uninstall" }));

    await waitFor(() => expect(toastError).toHaveBeenCalled());
    expect(mutateMock).not.toHaveBeenCalled();
  });
});
