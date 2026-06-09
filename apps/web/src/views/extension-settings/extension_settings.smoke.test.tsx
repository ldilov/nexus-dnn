import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

vi.mock("react-router", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
  useSearchParams: () => [new URLSearchParams("tab=dependencies"), () => {}],
}));

vi.mock("swr", () => ({
  default: () => ({
    data: [{ id: "ext.demo", name: "Demo", version: "1.0.0" }],
    error: undefined,
    isLoading: false,
  }),
}));

vi.mock("../../services/api_client", () => ({
  fetchExtensions: vi.fn(),
}));

vi.mock("./tabs/dependencies.tab", () => ({
  DependenciesTab: ({ extensionId }: { extensionId: string }) => (
    <div data-testid="deps-tab-standalone">standalone:{extensionId}</div>
  ),
}));

vi.mock("./tabs/overview.tab", () => ({
  OverviewTab: () => <div>overview</div>,
}));

vi.mock("../../components/base/page_hero", () => ({
  PageHero: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

import { ExtensionSettingsView } from "./extension_settings.view";

describe("ExtensionSettingsView standalone (AC-5.2 / AC-5.4)", () => {
  it("renders DependenciesTab standalone for ?tab=dependencies, no gate", () => {
    render(<ExtensionSettingsView extensionId="ext.demo" />);

    const tab = screen.getByTestId("deps-tab-standalone");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveTextContent("standalone:ext.demo");
  });
});
