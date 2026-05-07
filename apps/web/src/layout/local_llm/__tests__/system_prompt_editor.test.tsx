import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { SystemPromptEditor } from "../system_prompt_editor";

afterEach(() => {
  cleanup();
});

describe("SystemPromptEditor", () => {
  it("renders textarea with value", () => {
    render(<SystemPromptEditor value="hello" onChange={() => {}} />);
    const textarea = screen.getByLabelText(/system prompt/i) as HTMLTextAreaElement;
    expect(textarea.value).toBe("hello");
  });

  it("typing calls onChange with full string", () => {
    const onChange = vi.fn();
    render(<SystemPromptEditor value="" onChange={onChange} />);
    const textarea = screen.getByLabelText(/system prompt/i);
    fireEvent.change(textarea, { target: { value: "Be terse." } });
    expect(onChange).toHaveBeenCalledWith("Be terse.");
  });

  it("shows token estimate", () => {
    render(<SystemPromptEditor value="hello world" onChange={() => {}} />);
    expect(screen.getByText(/~3 tokens/)).toBeInTheDocument();
  });

  it("Clear button appears only when value is non-empty", () => {
    const { rerender } = render(<SystemPromptEditor value="" onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: /clear/i })).toBeNull();

    rerender(<SystemPromptEditor value="something" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("Clear button calls onChange with empty string", () => {
    const onChange = vi.fn();
    render(<SystemPromptEditor value="something" onChange={onChange} />);
    const clearBtn = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith("");
  });
});
