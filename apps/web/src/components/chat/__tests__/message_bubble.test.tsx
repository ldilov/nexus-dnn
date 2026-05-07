import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MessageBubble } from "../message_bubble";
import type { ChatMessage } from "../chat_surface";

afterEach(() => cleanup());

function build(message: Partial<ChatMessage>): ChatMessage {
  return {
    id: "m-1",
    role: "assistant",
    text: "",
    ...message,
  };
}

describe("MessageBubble", () => {
  it("renders markdown bold and italics", () => {
    const message = build({ text: "**bold** and *italic*" });
    render(<MessageBubble message={message} isStreamingTail={false} />);
    expect(screen.getByText("bold").tagName).toBe("STRONG");
    expect(screen.getByText("italic").tagName).toBe("EM");
  });

  it("renders inline code with the inlineCode class", () => {
    const message = build({ text: "use `useMemo` here" });
    const { container } = render(<MessageBubble message={message} isStreamingTail={false} />);
    const inline = container.querySelector("code");
    expect(inline).not.toBeNull();
    expect(inline?.textContent).toBe("useMemo");
    expect(inline?.className ?? "").toMatch(/inlineCode/);
  });

  it("renders a fenced code block with a CodeBlock <pre> and language data attr", () => {
    const message = build({ text: "```ts\nconst x = 1\n```" });
    const { container } = render(<MessageBubble message={message} isStreamingTail={false} />);
    const pre = container.querySelector("pre[data-lang]");
    expect(pre).not.toBeNull();
    expect(pre?.getAttribute("data-lang")).toBe("ts");
    expect(pre?.textContent).toContain("const x = 1");
  });

  it("renders inline LaTeX via KaTeX", () => {
    const message = build({ text: "The formula $E=mc^2$ matters" });
    const { container } = render(<MessageBubble message={message} isStreamingTail={false} />);
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("renders display LaTeX via KaTeX", () => {
    const message = build({ text: "Equation:\n\n$$\\int_0^1 x\\, dx$$\n\nDone" });
    const { container } = render(<MessageBubble message={message} isStreamingTail={false} />);
    expect(container.querySelector(".katex-display, .katex")).not.toBeNull();
  });

  it("renders the author label in the header", () => {
    const message = build({ authorLabel: "claude-haiku-4-5" });
    render(<MessageBubble message={message} isStreamingTail={false} />);
    expect(screen.getByText("claude-haiku-4-5")).toBeInTheDocument();
  });

  it("shows the streaming chip when isStreamingTail is true", () => {
    const message = build({ text: "thinking", status: "streaming" });
    render(<MessageBubble message={message} isStreamingTail={true} />);
    expect(screen.getByText(/generating/i)).toBeInTheDocument();
  });

  it("renders footer stats when tokens and latency are provided", () => {
    const message = build({ text: "hello", tokens: 218, latencyMs: 900 });
    render(<MessageBubble message={message} isStreamingTail={false} />);
    expect(screen.getByText(/218 tok/)).toBeInTheDocument();
    expect(screen.getByText(/0\.9s/)).toBeInTheDocument();
  });

  it("does not render the copy footer for user messages", () => {
    const message = build({ role: "user", text: "hi", authorLabel: "You" });
    render(<MessageBubble message={message} isStreamingTail={false} />);
    expect(screen.queryByLabelText(/copy message/i)).toBeNull();
  });

  it("calls clipboard.writeText when the copy button is clicked", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const original = (navigator as Navigator).clipboard;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      const message = build({ text: "to copy" });
      render(<MessageBubble message={message} isStreamingTail={false} />);
      const btn = screen.getByLabelText(/copy message/i);
      await act(async () => {
        fireEvent.click(btn);
      });
      expect(writeText).toHaveBeenCalledWith("to copy");
    } finally {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: original,
      });
    }
  });

  it("renders the failed status chip and a retry button when role is assistant and status is failed", () => {
    const onRetry = vi.fn();
    const message = build({ text: "boom", status: "failed" });
    render(<MessageBubble message={message} isStreamingTail={false} onRetry={onRetry} />);
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledWith("m-1");
  });
});
