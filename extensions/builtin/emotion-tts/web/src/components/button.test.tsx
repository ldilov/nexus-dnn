import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button (emotion-tts)", () => {
  it("renders a primary md button by default", () => {
    render(<Button>Generate</Button>);
    const btn = screen.getByRole("button", { name: "Generate" });
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("type")).toBe("button");
    expect(btn.getAttribute("aria-busy")).toBeNull();
  });

  it("applies different variant + size class names", () => {
    const { rerender } = render(<Button variant="primary" size="md">A</Button>);
    const primaryClass = screen.getByRole("button").className;
    rerender(<Button variant="danger" size="lg">A</Button>);
    const dangerClass = screen.getByRole("button").className;
    expect(primaryClass).not.toEqual(dangerClass);
  });

  it("renders a spinner and sets aria-busy when loading", () => {
    render(<Button loading>Saving…</Button>);
    const btn = screen.getByRole("button", { name: "Saving…" });
    expect(btn.getAttribute("aria-busy")).toBe("true");
    expect(btn.hasAttribute("disabled")).toBe(true);
    const spinner = btn.querySelector("[aria-hidden='true']");
    expect(spinner).toBeTruthy();
  });

  it("blocks onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports iconOnly across sizes", () => {
    render(
      <Button iconOnly size="sm" aria-label="play">
        ▶
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "play" });
    expect(btn).toBeTruthy();
  });
});
