import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, act } from "@testing-library/react";

import type { Extension } from "../../../api/client";
import type {
  DependenciesResponse,
  DependencyStep,
} from "../../../types/extension_dependencies";

vi.mock("react-router", () => ({
  Link: ({
    to,
    children,
    ...rest
  }: { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("../../../api/client", () => ({
  fetchExtensions: vi.fn(),
  enableExtension: vi.fn(),
  disableExtension: vi.fn(),
}));

vi.mock("../../../services/extension_dependencies_client", () => ({
  fetchDependencies: vi.fn(),
}));

vi.mock("../../../components/install/install_extension_drawer", () => ({
  InstallExtensionDrawer: () => null,
}));

import { fetchExtensions } from "../../../api/client";
import { fetchDependencies } from "../../../services/extension_dependencies_client";
import { ExtensionsGallery } from "./gallery.view";

function makeExtension(overrides: Partial<Extension> = {}): Extension {
  return {
    id: "ext.demo",
    name: "Demo Extension",
    version: "1.0.0",
    description: null,
    publisher: null,
    runtime_family: "python",
    status: "active",
    source: "builtin",
    source_path: null,
    capabilities: ["demo.capability"],
    recipe_count: null,
    ui_contribution_count: null,
    validation_errors: [],
    installed_at: "2026-01-01T00:00:00Z",
    registry_state: "not_registered",
    ...overrides,
  };
}

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

function makeDeps(
  overrides: Partial<DependenciesResponse> = {},
): DependenciesResponse {
  return {
    steps: [],
    all_satisfied: false,
    total_remaining_bytes: 0,
    ...overrides,
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

function setupStatValue(): HTMLElement | null {
  return screen.getByText("Setup required", { selector: "span" })
    .nextElementSibling as HTMLElement | null;
}

describe("ExtensionsGallery dependency-probe loading state", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a checking chip and no toggle/setup action while the probe is in flight", async () => {
    const probe = deferred<DependenciesResponse>();
    vi.mocked(fetchExtensions).mockResolvedValue([makeExtension()]);
    vi.mocked(fetchDependencies).mockReturnValue(probe.promise);

    render(<ExtensionsGallery />);
    await screen.findByText("Demo Extension");

    expect(screen.getByText("Checking")).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Checking dependencies" })).toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(screen.queryByText("Set up")).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Dependency setup required/),
    ).not.toBeInTheDocument();
    expect(setupStatValue()).toHaveTextContent("—");

    await act(async () => {
      probe.resolve(
        makeDeps({ all_satisfied: true, steps: [makeStep({ satisfied: true })] }),
      );
      await probe.promise;
    });
  });

  it("swaps the checking chip for the setup badge + Set up CTA when missing > 0", async () => {
    const probe = deferred<DependenciesResponse>();
    vi.mocked(fetchExtensions).mockResolvedValue([makeExtension()]);
    vi.mocked(fetchDependencies).mockReturnValue(probe.promise);

    render(<ExtensionsGallery />);
    await screen.findByText("Demo Extension");
    expect(screen.getByText("Checking")).toBeInTheDocument();

    await act(async () => {
      probe.resolve(
        makeDeps({
          all_satisfied: false,
          steps: [
            makeStep({ id: "a", satisfied: false }),
            makeStep({ id: "b", satisfied: false }),
          ],
        }),
      );
      await probe.promise;
    });

    expect(
      await screen.findByLabelText("Dependency setup required — 2 missing"),
    ).toBeInTheDocument();
    expect(screen.getByText("2 missing")).toBeInTheDocument();
    expect(screen.getByText("Set up")).toBeInTheDocument();
    expect(screen.queryByText("Checking")).not.toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
  });

  it("swaps the checking chip for the toggle when the probe resolves satisfied", async () => {
    const probe = deferred<DependenciesResponse>();
    vi.mocked(fetchExtensions).mockResolvedValue([makeExtension()]);
    vi.mocked(fetchDependencies).mockReturnValue(probe.promise);

    render(<ExtensionsGallery />);
    await screen.findByText("Demo Extension");
    expect(screen.getByText("Checking")).toBeInTheDocument();

    await act(async () => {
      probe.resolve(
        makeDeps({ all_satisfied: true, steps: [makeStep({ satisfied: true })] }),
      );
      await probe.promise;
    });

    expect(await screen.findByRole("switch")).toBeInTheDocument();
    expect(screen.queryByText("Checking")).not.toBeInTheDocument();
    expect(screen.queryByText("Set up")).not.toBeInTheDocument();
    expect(setupStatValue()).toHaveTextContent("0");
  });

  it("resolves each card independently — no Promise.all barrier", async () => {
    const fast = deferred<DependenciesResponse>();
    const slow = deferred<DependenciesResponse>();
    vi.mocked(fetchExtensions).mockResolvedValue([
      makeExtension({ id: "ext.fast", name: "Fast Extension" }),
      makeExtension({ id: "ext.slow", name: "Slow Extension" }),
    ]);
    vi.mocked(fetchDependencies).mockImplementation((id: string) =>
      id === "ext.fast" ? fast.promise : slow.promise,
    );

    render(<ExtensionsGallery />);
    await screen.findByText("Fast Extension");
    expect(screen.getAllByText("Checking")).toHaveLength(2);

    await act(async () => {
      fast.resolve(
        makeDeps({ all_satisfied: true, steps: [makeStep({ satisfied: true })] }),
      );
      await fast.promise;
    });

    expect(await screen.findByRole("switch")).toBeInTheDocument();
    expect(screen.getAllByText("Checking")).toHaveLength(1);
    expect(setupStatValue()).toHaveTextContent("—");

    await act(async () => {
      slow.resolve(
        makeDeps({ all_satisfied: false, steps: [makeStep({ satisfied: false })] }),
      );
      await slow.promise;
    });

    expect(
      await screen.findByLabelText(/Dependency setup required/),
    ).toBeInTheDocument();
    expect(screen.queryByText("Checking")).not.toBeInTheDocument();
    expect(setupStatValue()).toHaveTextContent("1");
  });
});
