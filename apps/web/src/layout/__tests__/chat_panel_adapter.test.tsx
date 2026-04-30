import { describe, expect, it, afterEach, vi, beforeEach } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import type { ChatThread } from "../../services/extension_chat";
import type { ModelLoadState } from "../../hooks/use_model_load_state";

const listThreadsMock = vi.fn();
const createThreadMock = vi.fn();
const patchThreadMock = vi.fn();
const deleteThreadMock = vi.fn();
const streamMessageMock = vi.fn();
const useModelLoadStateMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("../../services/extension_chat", () => ({
  listThreads: (...args: unknown[]) => listThreadsMock(...args),
  createThread: (...args: unknown[]) => createThreadMock(...args),
  patchThread: (...args: unknown[]) => patchThreadMock(...args),
  deleteThread: (...args: unknown[]) => deleteThreadMock(...args),
}));

vi.mock("../../services/local_llm_chat", () => ({
  streamMessage: (...args: unknown[]) => streamMessageMock(...args),
}));

vi.mock("../../hooks/use_model_load_state", () => ({
  useModelLoadState: (...args: unknown[]) => useModelLoadStateMock(...args),
}));

vi.mock("sonner", () => ({
  toast: {
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
}));

import { ChatPanelAdapter } from "../chat_panel_adapter";

const baseThread = (id: string, title: string): ChatThread => ({
  thread_id: id,
  extension_id: "ext.example",
  title_resolved: title,
  is_unbound: false,
  created_at: "2026-04-29T12:00:00Z",
  updated_at: "2026-04-29T12:00:00Z",
});

const idleLoadState: ModelLoadState = { phase: "idle" };

beforeEach(() => {
  listThreadsMock.mockReset();
  createThreadMock.mockReset();
  patchThreadMock.mockReset();
  deleteThreadMock.mockReset();
  streamMessageMock.mockReset();
  useModelLoadStateMock.mockReset();
  toastErrorMock.mockReset();
  useModelLoadStateMock.mockReturnValue(idleLoadState);
});

afterEach(() => {
  cleanup();
});

describe("ChatPanelAdapter", () => {
  it("auto-selects the first thread after listThreads resolves", async () => {
    listThreadsMock.mockResolvedValueOnce({
      threads: [baseThread("t-1", "Alpha"), baseThread("t-2", "Beta")],
      has_more: false,
    });

    render(<ChatPanelAdapter />);

    await waitFor(() => {
      expect(listThreadsMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Alpha")).toBeInTheDocument();
    });
    expect(useModelLoadStateMock).toHaveBeenLastCalledWith("t-1");
  });

  it("surfaces a toast when listThreads fails", async () => {
    listThreadsMock.mockRejectedValueOnce(new Error("boom"));

    render(<ChatPanelAdapter />);

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Could not load chat sessions");
    });
  });

  it("surfaces a toast when createThread fails", async () => {
    listThreadsMock.mockResolvedValueOnce({ threads: [], has_more: false });
    createThreadMock.mockRejectedValueOnce(new Error("network"));

    render(<ChatPanelAdapter />);

    await waitFor(() => expect(listThreadsMock).toHaveBeenCalled());

    const newButton = screen.getByRole("button", { name: /new thread/i });
    await act(async () => {
      fireEvent.click(newButton);
    });

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Could not create a new session");
    });
  });

  it("re-fetches threads on local-llm/thread:changed window events", async () => {
    listThreadsMock.mockResolvedValue({ threads: [], has_more: false });

    render(<ChatPanelAdapter />);

    await waitFor(() => expect(listThreadsMock).toHaveBeenCalledTimes(1));

    await act(async () => {
      window.dispatchEvent(new CustomEvent("local-llm/thread:changed"));
    });

    await waitFor(() => expect(listThreadsMock).toHaveBeenCalledTimes(2));
  });

  it("aborts the active stream on unmount", async () => {
    listThreadsMock.mockResolvedValueOnce({
      threads: [baseThread("t-1", "Alpha")],
      has_more: false,
    });
    const abortMock = vi.fn();
    streamMessageMock.mockReturnValue({ abort: abortMock });
    useModelLoadStateMock.mockReturnValue({
      phase: "ready",
      label: "test-model",
      port: 12345,
    } satisfies ModelLoadState);

    const { unmount } = render(<ChatPanelAdapter />);

    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());

    const composer = screen.getByPlaceholderText(/send a message/i);
    fireEvent.change(composer, { target: { value: "hello" } });
    const sendBtn = screen.getByRole("button", { name: /send message/i });
    await act(async () => {
      fireEvent.click(sendBtn);
    });

    expect(streamMessageMock).toHaveBeenCalledTimes(1);

    unmount();

    expect(abortMock).toHaveBeenCalled();
  });
});
