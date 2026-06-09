import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

import type { DependencyReadiness } from "./use_dependency_readiness";

const readiness: DependencyReadiness = {
  ready: true,
  missingCount: 0,
  total: 0,
  hasManagedDeps: true,
  isLoading: false,
  error: undefined,
};

vi.mock("./use_dependency_readiness", () => ({
  useDependencyReadiness: () => readiness,
}));

vi.mock("react-router", () => ({
  Link: ({
    to,
    children,
    className,
    "aria-label": ariaLabel,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    "aria-label"?: string;
  }) => (
    <a href={to} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ),
}));

import { DependencyStatusChip } from "./dependency_status_chip";

function setReadiness(partial: Partial<DependencyReadiness>): void {
  Object.assign(readiness, {
    ready: true,
    missingCount: 0,
    total: 0,
    hasManagedDeps: true,
    isLoading: false,
    error: undefined,
    ...partial,
  });
}

describe("DependencyStatusChip", () => {
  beforeEach(() => {
    setReadiness({});
  });

  it("AC-8.1: ready state renders a checkmark chip linking to the deps tab", () => {
    setReadiness({ ready: true, missingCount: 0, total: 3, hasManagedDeps: true });
    render(<DependencyStatusChip extensionId="ext.demo" />);

    const link = screen.getByRole("link", { name: "Dependencies ready" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "/extensions/ext.demo/settings?tab=dependencies",
    );
    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("AC-8.1: N missing renders a warning chip with the count and a setup link", () => {
    setReadiness({ ready: false, missingCount: 2, total: 5, hasManagedDeps: true });
    render(<DependencyStatusChip extensionId="ext.demo" />);

    const link = screen.getByRole("link", {
      name: "2 dependencies missing — open setup",
    });
    expect(link).toHaveAttribute(
      "href",
      "/extensions/ext.demo/settings?tab=dependencies",
    );
    expect(screen.getByText("2 missing")).toBeInTheDocument();
    expect(screen.getByText("⚠")).toBeInTheDocument();
  });

  it("AC-8.1: loading state renders a non-link status placeholder", () => {
    setReadiness({ isLoading: true, hasManagedDeps: false });
    render(<DependencyStatusChip extensionId="ext.demo" />);

    expect(screen.getByRole("status", { name: "Checking dependencies" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("AC-8.1: no managed deps renders nothing (generic, no special-casing)", () => {
    setReadiness({ ready: true, missingCount: 0, total: 0, hasManagedDeps: false });
    const { container } = render(<DependencyStatusChip extensionId="ext.demo" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("AC-8.1: a fetch error renders nothing rather than crashing", () => {
    setReadiness({ error: new Error("boom"), hasManagedDeps: true });
    const { container } = render(<DependencyStatusChip extensionId="ext.demo" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("AC-8.1: encodes the extension id in the deps link", () => {
    setReadiness({ ready: false, missingCount: 1, total: 1, hasManagedDeps: true });
    render(<DependencyStatusChip extensionId="ns/ext one" />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/extensions/ns%2Fext%20one/settings?tab=dependencies",
    );
  });
});
