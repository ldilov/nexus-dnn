import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import type { DependenciesResponse, DependencyStep } from "../../types/extension_dependencies";

type SwrState = {
  data: DependenciesResponse | undefined;
  error: unknown;
  isLoading: boolean;
};

const swrState: SwrState = { data: undefined, error: undefined, isLoading: false };

vi.mock("swr", () => ({
  default: () => swrState,
}));

vi.mock("../../services/extension_dependencies_client", () => ({
  fetchDependencies: vi.fn(),
}));

const useInstallProgressMock = vi.fn(
  (..._args: unknown[]) => ({ active: false, liveByStep: {} }),
);
vi.mock("../../views/extension-settings/use_install_progress", () => ({
  useInstallProgress: (extensionId: string, swrKey: string) =>
    useInstallProgressMock(extensionId, swrKey),
}));

vi.mock("../../views/extension-settings/tabs/dependencies.tab", () => ({
  DependenciesTab: ({ extensionId }: { extensionId: string }) => (
    <div data-testid="deps-tab-body">installer:{extensionId}</div>
  ),
}));

vi.mock("react-router", () => ({
  Link: ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

import { DependencyGate } from "./dependency_gate";

function makeStep(overrides: Partial<DependencyStep> = {}): DependencyStep {
  return {
    id: "s1",
    type: "runtime",
    requires: [],
    status: "pending",
    satisfied: false,
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
    all_satisfied: false,
    total_remaining_bytes: 0,
    ...partial,
  };
  swrState.error = undefined;
  swrState.isLoading = false;
}

function child() {
  return <div data-testid="app-child">app</div>;
}

describe("DependencyGate", () => {
  beforeEach(() => {
    swrState.data = undefined;
    swrState.error = undefined;
    swrState.isLoading = false;
    window.sessionStorage.clear();
  });

  it("AC-4.2: none satisfied → full installer, no children", () => {
    setResponse({ steps: [makeStep({ satisfied: false })], all_satisfied: false });
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(screen.getByTestId("deps-tab-body")).toBeInTheDocument();
    expect(screen.getByText("Install dependencies to continue")).toBeInTheDocument();
    expect(screen.queryByTestId("app-child")).not.toBeInTheDocument();
  });

  it("AC-4.3: partial → dismissible banner + children", () => {
    setResponse({
      steps: [makeStep({ id: "a", satisfied: true }), makeStep({ id: "b", satisfied: false })],
      all_satisfied: false,
    });
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(screen.getByText("1 of 2 ready")).toBeInTheDocument();
    expect(screen.getByText("Finish setup")).toBeInTheDocument();
    expect(screen.getByTestId("app-child")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Dismiss setup banner"));
    expect(screen.queryByText("1 of 2 ready")).not.toBeInTheDocument();
    expect(screen.getByTestId("app-child")).toBeInTheDocument();
  });

  it("AC-4.4: all satisfied → only children, no chrome", () => {
    setResponse({
      steps: [makeStep({ satisfied: true })],
      all_satisfied: true,
    });
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(screen.getByTestId("app-child")).toBeInTheDocument();
    expect(screen.queryByTestId("deps-tab-body")).not.toBeInTheDocument();
    expect(screen.queryByText(/ready$/)).not.toBeInTheDocument();
  });

  it("AC-4.5: no managed deps (steps.length===0) → children directly", () => {
    setResponse({ steps: [], all_satisfied: false });
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(screen.getByTestId("app-child")).toBeInTheDocument();
    expect(screen.queryByTestId("deps-tab-body")).not.toBeInTheDocument();
  });

  it("AC-4.6: Continue anyway mounts children + persists dismissal", () => {
    setResponse({ steps: [makeStep({ satisfied: false })], all_satisfied: false });
    const { unmount } = render(
      <DependencyGate extensionId="ext.demo">{child()}</DependencyGate>,
    );

    expect(screen.queryByTestId("app-child")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Continue anyway"));
    expect(screen.getByTestId("app-child")).toBeInTheDocument();
    expect(window.sessionStorage.getItem("nexus.depgate.dismissed:ext.demo")).toBe("1");

    unmount();
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);
    expect(screen.getByTestId("app-child")).toBeInTheDocument();
    expect(screen.queryByTestId("deps-tab-body")).not.toBeInTheDocument();
  });

  it("AC-4.7: loading renders a spinner without crashing", () => {
    swrState.data = undefined;
    swrState.isLoading = true;
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(screen.getByText("Checking dependencies…")).toBeInTheDocument();
    expect(screen.queryByTestId("app-child")).not.toBeInTheDocument();
  });

  it("AC-4.7: error renders a message + retry link without crashing", () => {
    swrState.data = undefined;
    swrState.isLoading = false;
    swrState.error = new Error("boom");
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(screen.getByText(/Could not check dependencies/)).toBeInTheDocument();
    expect(screen.getByText("Open dependency settings")).toBeInTheDocument();
  });

  it("AC-4.8: subscribes to live install progress for the active extension", () => {
    setResponse({ steps: [makeStep({ satisfied: false })], all_satisfied: false });
    render(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(useInstallProgressMock).toHaveBeenCalledWith(
      "ext.demo",
      "/extensions/ext.demo/dependencies",
    );
  });

  it("AC-4.9: auto-advances to children when state transitions to all_satisfied", () => {
    setResponse({ steps: [makeStep({ satisfied: false })], all_satisfied: false });
    const { rerender } = render(
      <DependencyGate extensionId="ext.demo">{child()}</DependencyGate>,
    );
    expect(screen.queryByTestId("app-child")).not.toBeInTheDocument();

    setResponse({ steps: [makeStep({ satisfied: true })], all_satisfied: true });
    rerender(<DependencyGate extensionId="ext.demo">{child()}</DependencyGate>);

    expect(screen.getByTestId("app-child")).toBeInTheDocument();
    expect(screen.queryByTestId("deps-tab-body")).not.toBeInTheDocument();
  });
});
