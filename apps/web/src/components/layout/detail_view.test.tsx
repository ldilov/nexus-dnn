import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { DetailView } from "./detail_view";

afterEach(() => cleanup());

describe("DetailView field formats", () => {
  it("renders text format as plain string", () => {
    render(
      <DetailView
        fields={[{ label: "Name", key: "name", format: "text" }]}
        data={{ name: "Alpha" }}
      />,
    );
    const label = screen.getByText("Name");
    expect(label.parentElement?.textContent).toContain("Alpha");
    expect(screen.queryByRole("code")).toBeNull();
  });

  it("renders code format inside a <code> element with inline-code styling", () => {
    render(
      <DetailView
        fields={[{ label: "Path", key: "path", format: "code" }]}
        data={{ path: "/usr/bin/env" }}
      />,
    );
    const codeEl = screen.getByText("/usr/bin/env");
    expect(codeEl.tagName).toBe("CODE");
    expect(codeEl.className).toMatch(/codeInline/);
  });

  it("maps 'running' to success intent for status_badge", () => {
    render(
      <DetailView
        fields={[{ label: "Status", key: "status", format: "status_badge" }]}
        data={{ status: "running" }}
      />,
    );
    const badgeLabel = screen.getByText("running");
    const badge = badgeLabel.closest("span");
    expect(badge?.className).toMatch(/success/);
  });

  it("maps 'failed' to error intent for status_badge", () => {
    render(
      <DetailView
        fields={[{ label: "Status", key: "status", format: "status_badge" }]}
        data={{ status: "failed" }}
      />,
    );
    const badge = screen.getByText("failed").closest("span");
    expect(badge?.className).toMatch(/error/);
  });

  it("maps 'pending' to warning intent for status_badge", () => {
    render(
      <DetailView
        fields={[{ label: "Status", key: "status", format: "status_badge" }]}
        data={{ status: "pending" }}
      />,
    );
    const badge = screen.getByText("pending").closest("span");
    expect(badge?.className).toMatch(/warning/);
  });

  it("falls back to info intent for unknown status values", () => {
    render(
      <DetailView
        fields={[{ label: "Status", key: "status", format: "status_badge" }]}
        data={{ status: "xyzzy" }}
      />,
    );
    const badge = screen.getByText("xyzzy").closest("span");
    expect(badge?.className).toMatch(/info/);
  });
});
