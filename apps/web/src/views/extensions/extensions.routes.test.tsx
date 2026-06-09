import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

vi.mock("react-router", () => ({
  useParams: () => ({ layoutId: "ext.demo" }),
}));

vi.mock("./gallery/gallery.view", () => ({
  ExtensionsGallery: () => <div>gallery</div>,
}));

vi.mock("./layout/layout.view", () => ({
  ExtensionLayoutView: ({ layoutId }: { layoutId: string }) => (
    <div data-testid="layout-view">layout:{layoutId}</div>
  ),
}));

vi.mock("../../components/extension-gate", () => ({
  DependencyGate: ({
    extensionId,
    children,
  }: {
    extensionId: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="gate" data-ext={extensionId}>
      {children}
    </div>
  ),
}));

vi.mock("../../root_layout", () => ({
  useRootOutletContext: () => ({ refreshLayouts: () => {} }),
}));

import { ExtensionLayoutRoute } from "./extensions.routes";

describe("ExtensionLayoutRoute shell wiring (G5)", () => {
  it("AC-5.1: wraps the extension app in DependencyGate keyed by :id", () => {
    render(<ExtensionLayoutRoute />);

    const gate = screen.getByTestId("gate");
    expect(gate).toHaveAttribute("data-ext", "ext.demo");
    const view = screen.getByTestId("layout-view");
    expect(view).toBeInTheDocument();
    expect(gate).toContainElement(view);
  });

});
