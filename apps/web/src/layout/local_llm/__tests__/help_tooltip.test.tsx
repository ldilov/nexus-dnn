import { describe, expect, it, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { HelpTooltip } from "../help_tooltip";

describe("HelpTooltip", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders_question_button_with_aria_describedby_id", () => {
    render(
      <HelpTooltip
        id="ctx-help"
        description="Maximum tokens the model can see at once."
      />,
    );

    const button = screen.getByRole("button");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("aria-describedby")).toBe("ctx-help");
  });

  it("tooltip_hidden_by_default", () => {
    render(
      <HelpTooltip
        id="ctx-help"
        description="Maximum tokens the model can see at once."
      />,
    );

    const tooltip = document.getElementById("ctx-help");
    expect(tooltip).not.toBeNull();
    expect(tooltip?.getAttribute("aria-hidden")).toBe("true");
  });

  it("hover_reveals_tooltip_after_delay", () => {
    vi.useFakeTimers();
    render(
      <HelpTooltip
        id="ctx-help"
        description="Maximum tokens the model can see at once."
      />,
    );

    const button = screen.getByRole("button");
    act(() => {
      fireEvent.mouseEnter(button);
    });

    let tooltip = document.getElementById("ctx-help");
    expect(tooltip?.getAttribute("aria-hidden")).toBe("true");

    act(() => {
      vi.advanceTimersByTime(120);
    });

    tooltip = document.getElementById("ctx-help");
    expect(tooltip?.getAttribute("aria-hidden")).toBe("false");
  });

  it("focus_reveals_tooltip", () => {
    render(
      <HelpTooltip
        id="ctx-help"
        description="Maximum tokens the model can see at once."
      />,
    );

    const button = screen.getByRole("button");
    act(() => {
      button.focus();
      fireEvent.focus(button);
    });

    const tooltip = document.getElementById("ctx-help");
    expect(tooltip?.getAttribute("aria-hidden")).toBe("false");
  });

  it("escape_closes_tooltip_when_trigger_focused", () => {
    render(
      <HelpTooltip
        id="ctx-help"
        description="Maximum tokens the model can see at once."
      />,
    );

    const button = screen.getByRole("button");
    act(() => {
      button.focus();
      fireEvent.focus(button);
    });

    let tooltip = document.getElementById("ctx-help");
    expect(tooltip?.getAttribute("aria-hidden")).toBe("false");

    act(() => {
      fireEvent.keyDown(button, { key: "Escape" });
    });

    tooltip = document.getElementById("ctx-help");
    expect(tooltip?.getAttribute("aria-hidden")).toBe("true");
  });

  it("description_and_recommended_render_separately", () => {
    render(
      <HelpTooltip
        id="ctx-help"
        title="Context length"
        description="Maximum tokens the model can see at once."
        recommended="4096–8192 for chat"
      />,
    );

    const button = screen.getByRole("button");
    act(() => {
      button.focus();
      fireEvent.focus(button);
    });

    expect(screen.getByText("Context length")).toBeTruthy();
    expect(
      screen.getByText("Maximum tokens the model can see at once."),
    ).toBeTruthy();
    expect(screen.getByText(/4096–8192 for chat/)).toBeTruthy();
  });
});
