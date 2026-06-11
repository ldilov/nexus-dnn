import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Storyboard } from "./storyboard";

function renderBoard(text = "First phrase here. Second phrase too.\n\nThird stands alone.") {
  const onChange = (): void => {};
  return render(
    <Storyboard voiceAssets={[]} presets={[]} storyText={text} onStoryTextChange={onChange} />,
  );
}

function firstPhrase(): HTMLElement {
  return screen.getByRole("button", { name: /First phrase here\./ });
}

describe("Storyboard interaction flow", () => {
  it("seeds the demo cast when no real voices (AC-2.2) and shows the empty carousel (AC-3)", () => {
    renderBoard();
    expect(screen.getByText("No segments cast yet. Select a phrase above to begin.")).toBeTruthy();
    // demo cast voice present in the library footer
    expect(screen.getByText("Aether_v4")).toBeTruthy();
  });

  it("does NOT open the overlay without a selection (AC-6.4 / AC-8.3)", () => {
    renderBoard();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("selecting a phrase opens the casting overlay (AC-1.3)", () => {
    renderBoard();
    fireEvent.click(firstPhrase());
    const dialog = screen.getByRole("dialog", { name: "Cast voice" });
    expect(dialog).toBeTruthy();
    expect(within(dialog).getByRole("radio", { name: /Aether/ })).toBeTruthy();
  });

  it("casting creates a segment card labelled SEG-001 (AC-0.1 / AC-4.1)", () => {
    renderBoard();
    fireEvent.click(firstPhrase());
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Cast" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("SEG-001")).toBeTruthy();
    // the carousel card exposes voice + SEG id + status in its accessible name
    expect(screen.getByRole("button", { name: /Aether SEG-001/ })).toBeTruthy();
  });

  it("clicking an assigned phrase reopens the editor (AC-1.5)", () => {
    renderBoard();
    fireEvent.click(firstPhrase());
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cast" }));
    // re-click the now-assigned phrase
    fireEvent.click(firstPhrase());
    expect(screen.getByRole("dialog", { name: "Edit casting" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Update" })).toBeTruthy();
  });

  it("removing a casting deletes both card and marker (AC-4.5)", () => {
    renderBoard();
    fireEvent.click(firstPhrase());
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cast" }));
    expect(screen.getByText("SEG-001")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Remove SEG-001/ }));
    expect(screen.queryByText("SEG-001")).toBeNull();
    expect(screen.getByText("No segments cast yet. Select a phrase above to begin.")).toBeTruthy();
  });

  it("opens the overlay via keyboard Enter on a phrase (AC-2.5)", () => {
    renderBoard();
    fireEvent.keyDown(firstPhrase(), { key: "Enter" });
    expect(screen.getByRole("dialog", { name: "Cast voice" })).toBeTruthy();
  });

  it("arrow keys cycle the active voice in the overlay (AC-2.5)", () => {
    renderBoard();
    fireEvent.click(firstPhrase());
    const group = screen.getByRole("radiogroup", { name: "Voice" });
    // first voice (Aether) starts checked
    expect(within(group).getByRole("radio", { name: /Aether/ }).getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(within(group).getByRole("radio", { name: /Vesper/ }).getAttribute("aria-checked")).toBe("true");
    fireEvent.keyDown(group, { key: "ArrowLeft" });
    expect(within(group).getByRole("radio", { name: /Aether/ }).getAttribute("aria-checked")).toBe("true");
  });

  it("changing the voice then updating re-casts the same segment (AC-4.4)", () => {
    renderBoard();
    fireEvent.click(firstPhrase());
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Cast" }));
    fireEvent.click(firstPhrase());
    const dialog = screen.getByRole("dialog", { name: "Edit casting" });
    fireEvent.click(within(dialog).getByRole("radio", { name: /Vesper/ }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Update" }));
    // still exactly one segment, now Vesper
    expect(screen.getByText("SEG-001")).toBeTruthy();
    const cards = screen.getAllByText("Vesper");
    expect(cards.length).toBeGreaterThan(0);
  });
});
