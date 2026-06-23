import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { OverflowMenu, type OverflowMenuItem } from "./overflow_menu";

afterEach(cleanup);

function makeItems(overrides: Partial<OverflowMenuItem>[] = []): OverflowMenuItem[] {
  const base: OverflowMenuItem[] = [
    { id: "import", label: "Import", icon: "upload", onSelect: vi.fn() },
    { id: "export", label: "Export", icon: "download", onSelect: vi.fn() },
    { id: "delete", label: "Delete", icon: "delete", danger: true, onSelect: vi.fn() },
  ];
  return base.map((item, i) => ({ ...item, ...overrides[i] }));
}

describe("OverflowMenu", () => {
  it("exposes the menu-button a11y contract on the trigger", () => {
    render(<OverflowMenu label="More actions" items={makeItems()} />);
    const trigger = screen.getByRole("button", { name: "More actions" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("opens on click, lists every item, and reflects aria-expanded", () => {
    render(<OverflowMenu label="More actions" items={makeItems()} />);
    const trigger = screen.getByRole("button", { name: "More actions" });

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByRole("menu", { name: "More actions" });
    expect(menu).toBeTruthy();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("invokes the item handler and closes on select", () => {
    const exportSelect = vi.fn();
    const items = makeItems([{}, { onSelect: exportSelect }]);
    render(<OverflowMenu label="More actions" items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Export" }));

    expect(exportSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("focuses the first ENABLED item on open, skipping a disabled first item", () => {
    const items = makeItems([{ disabled: true }]);
    render(<OverflowMenu label="More actions" items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "More actions" }));

    // Import (index 0) is disabled, so open-focus lands on Export.
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Export" }),
    );
  });

  it("ArrowDown roving skips a disabled middle item", () => {
    const items = makeItems([{}, { disabled: true }]);
    render(<OverflowMenu label="More actions" items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    const menu = screen.getByRole("menu");
    // Open-focus lands on Import (index 0); ArrowDown must skip disabled Export.
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Import" }),
    );

    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Delete" }),
    );
  });

  it("End roving lands on the last ENABLED item", () => {
    const items = makeItems([{}, {}, { disabled: true }]);
    render(<OverflowMenu label="More actions" items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    fireEvent.keyDown(screen.getByRole("menu"), { key: "End" });

    // Delete (last) is disabled, so End lands on Export.
    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Export" }),
    );
  });

  it("closes on Escape and restores focus to the trigger", () => {
    render(<OverflowMenu label="More actions" items={makeItems()} />);
    const trigger = screen.getByRole("button", { name: "More actions" });

    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });

    expect(screen.queryByRole("menu")).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it("closes on outside click", () => {
    render(
      <div>
        <OverflowMenu label="More actions" items={makeItems()} />
        <button type="button">outside</button>
      </div>,
    );
    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    expect(screen.getByRole("menu")).toBeTruthy();

    fireEvent.mouseDown(screen.getByRole("button", { name: "outside" }));
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("does not invoke disabled items", () => {
    const exportSelect = vi.fn();
    const items = makeItems([{}, { disabled: true, onSelect: exportSelect }]);
    render(<OverflowMenu label="More actions" items={items} />);

    fireEvent.click(screen.getByRole("button", { name: "More actions" }));
    const exportItem = screen.getByRole("menuitem", { name: "Export" });
    expect(exportItem).toBeDisabled();
    fireEvent.click(exportItem);
    expect(exportSelect).not.toHaveBeenCalled();
  });
});
