import { describe, expect, it, afterEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import {
  ChatSurface,
  type ChatMessage,
  type ChatSurfaceProps,
  type ChatThreadSummary,
  type ModelOption,
} from "../chat_surface";

afterEach(() => cleanup());

const noop = async () => {};

const baseThread: ChatThreadSummary = {
  id: "t-1",
  title: "First thread",
  updatedAt: "2026-04-29T12:00:00Z",
  modelLabel: "claude-haiku",
};

const baseModel: ModelOption = {
  id: "m-1",
  label: "claude-haiku-4-5",
  badge: "local",
};

function renderSurface(overrides: Partial<ChatSurfaceProps> = {}) {
  const props: ChatSurfaceProps = {
    threads: [baseThread, { ...baseThread, id: "t-2", title: "Second thread" }],
    activeThreadId: "t-1",
    onSelectThread: vi.fn(),
    onCreateThread: vi.fn(),
    messages: [],
    isStreaming: false,
    onSendMessage: vi.fn(noop),
    models: [baseModel],
    activeModelId: "m-1",
    ...overrides,
  };
  return { props, ...render(<ChatSurface {...props} />) };
}

describe("ChatSurface", () => {
  it("renders the thread rail with active thread marked", () => {
    renderSurface();
    const active = screen.getByRole("button", { name: /first thread/i });
    expect(active.getAttribute("aria-current")).toBe("true");
  });

  it("calls onSelectThread when a non-active thread is clicked", () => {
    const onSelectThread = vi.fn();
    renderSurface({ onSelectThread });
    fireEvent.click(screen.getByRole("button", { name: /second thread/i }));
    expect(onSelectThread).toHaveBeenCalledWith("t-2");
  });

  it("renders messages from props (no internal state)", () => {
    const messages: ChatMessage[] = [
      { id: "m1", role: "user", text: "hello" },
      { id: "m2", role: "assistant", text: "hi there" },
    ];
    renderSurface({ messages });
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("hi there")).toBeInTheDocument();
  });

  it("send button stays disabled while composer is empty", () => {
    renderSurface();
    const send = screen.getByLabelText("Send message");
    expect((send as HTMLButtonElement).disabled).toBe(true);
  });

  it("send button enables and onSendMessage fires on Enter", async () => {
    const onSendMessage = vi.fn(noop);
    renderSurface({ onSendMessage });
    const textarea = screen.getByPlaceholderText(/send a message/i);
    fireEvent.change(textarea, { target: { value: "ping" } });
    fireEvent.keyDown(textarea, { key: "Enter" });
    expect(onSendMessage).toHaveBeenCalledWith("ping");
  });

  it("Shift+Enter inserts newline rather than submitting", () => {
    const onSendMessage = vi.fn(noop);
    renderSurface({ onSendMessage });
    const textarea = screen.getByPlaceholderText(/send a message/i);
    fireEvent.change(textarea, { target: { value: "line1" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    expect(onSendMessage).not.toHaveBeenCalled();
  });

  it("model picker opens and onSelectModel fires", async () => {
    const onSelectModel = vi.fn(async () => {});
    renderSurface({
      models: [baseModel, { id: "m-2", label: "claude-sonnet" }],
      onSelectModel,
    });
    fireEvent.click(screen.getByLabelText("Model picker"));
    fireEvent.click(screen.getByRole("option", { name: /claude-sonnet/i }));
    expect(onSelectModel).toHaveBeenCalledWith("m-2");
  });

  it("schema-mismatch message renders with timestamp", () => {
    const messages: ChatMessage[] = [
      {
        id: "m1",
        role: "system",
        text: "Schema version mismatch — stored 3, bundled 4",
        isSchemaMismatch: true,
        createdAt: "2026-04-29T12:00:00Z",
      },
    ];
    renderSurface({ messages });
    expect(screen.getByText(/schema version mismatch/i)).toBeInTheDocument();
    expect(screen.getByText("2026-04-29T12:00:00Z")).toBeInTheDocument();
  });

  it("composerDisabled replaces the composer with disabledReason", () => {
    renderSurface({
      composerDisabled: true,
      composerDisabledReason: "Runtime offline",
    });
    expect(screen.getByText("Runtime offline")).toBeInTheDocument();
    expect(screen.queryByLabelText("Send message")).toBeNull();
  });

  it("isStreaming swaps the send button for a Stop button", () => {
    const onCancelStream = vi.fn();
    renderSurface({
      isStreaming: true,
      onCancelStream,
      messages: [
        { id: "m1", role: "user", text: "hi" },
        { id: "m2", role: "assistant", text: "thinking…", status: "streaming" },
      ],
    });
    fireEvent.click(screen.getByLabelText("Cancel stream"));
    expect(onCancelStream).toHaveBeenCalled();
  });

  it("failed message exposes a Retry control wired to onRetryMessage", () => {
    const onRetryMessage = vi.fn();
    const messages: ChatMessage[] = [
      { id: "m-fail", role: "assistant", text: "boom", status: "failed", createdAt: "2026-04-29T12:00:00Z" },
    ];
    renderSurface({ messages, onRetryMessage });
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetryMessage).toHaveBeenCalledWith("m-fail");
  });

  it("sampler override updates propagate via onUpdateSamplerOverride", () => {
    const onUpdateSamplerOverride = vi.fn(noop);
    renderSurface({
      samplerOverride: { temperature: 0.5 },
      onUpdateSamplerOverride,
    });
    const tempInput = screen.getByLabelText(/temperature/i) as HTMLInputElement;
    fireEvent.change(tempInput, { target: { value: "0.9" } });
    expect(onUpdateSamplerOverride).toHaveBeenCalledWith({ temperature: 0.9 });
  });

  it("renders headerSlot when provided instead of ModelPicker", () => {
    renderSurface({
      headerSlot: <button type="button">Custom Header Action</button>,
    });
    expect(screen.getByText("Custom Header Action")).toBeInTheDocument();
    expect(screen.queryByLabelText("Model picker")).toBeNull();
  });

  it("renders inspector when provided instead of SamplerPanel", () => {
    renderSurface({
      inspector: <div data-testid="custom-inspector">Custom Inspector</div>,
      samplerOverride: { temperature: 0.5 },
    });
    expect(screen.getByTestId("custom-inspector")).toBeInTheDocument();
    expect(screen.queryByLabelText(/temperature/i)).toBeNull();
  });
});
