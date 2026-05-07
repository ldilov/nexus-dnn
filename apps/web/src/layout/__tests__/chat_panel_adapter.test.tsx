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
const toastSuccessMock = vi.fn();
const setActiveModelMock = vi.fn();
const fetchAvailableModelsMock = vi.fn();
const fetchRuntimeDefaultsMock = vi.fn();
const getModelMetadataMock = vi.fn();
const fetchGenerationSettingsMock = vi.fn();
const setGenerationSettingsMock = vi.fn();

const { DEFAULT_GENERATION_PARAMS_FAKE } = vi.hoisted(() => ({
  DEFAULT_GENERATION_PARAMS_FAKE: {
    temperature: 0.8,
    top_p: 0.95,
    top_k: 40,
    max_tokens: 4096,
    repeat_penalty: 1.1,
    system_prompt: "You are a helpful assistant.",
  },
}));

const { FakeSchemaVersionMismatchError } = vi.hoisted(() => {
  class FakeSchemaVersionMismatchError extends Error {
    constructor(public readonly stored: number, public readonly bundled: number) {
      super(`extension version mismatch: stored=${stored} bundled=${bundled}`);
      this.name = "SchemaVersionMismatchError";
    }
  }
  return { FakeSchemaVersionMismatchError };
});

vi.mock("../../services/extension_chat", () => ({
  listThreads: (...args: unknown[]) => listThreadsMock(...args),
  createThread: (...args: unknown[]) => createThreadMock(...args),
  patchThread: (...args: unknown[]) => patchThreadMock(...args),
  deleteThread: (...args: unknown[]) => deleteThreadMock(...args),
  SchemaVersionMismatchError: FakeSchemaVersionMismatchError,
}));

vi.mock("../../services/local_llm_chat", () => ({
  streamMessage: (...args: unknown[]) => streamMessageMock(...args),
  fetchAvailableModels: (...args: unknown[]) => fetchAvailableModelsMock(...args),
  fetchRuntimeDefaults: (...args: unknown[]) => fetchRuntimeDefaultsMock(...args),
  fetchGenerationSettings: (...args: unknown[]) => fetchGenerationSettingsMock(...args),
  setGenerationSettings: (...args: unknown[]) => setGenerationSettingsMock(...args),
  DEFAULT_GENERATION_PARAMS: DEFAULT_GENERATION_PARAMS_FAKE,
  cancelInference: () => Promise.resolve(),
  setActiveModel: (...args: unknown[]) => setActiveModelMock(...args),
  unloadActiveModel: () => Promise.resolve(),
}));

vi.mock("../../services/host_api", () => ({
  getModelMetadata: (...args: unknown[]) => getModelMetadataMock(...args),
  ModelNotFoundError: class ModelNotFoundError extends Error {},
}));

vi.mock("../../hooks/use_model_load_state", () => ({
  useModelLoadState: (...args: unknown[]) => useModelLoadStateMock(...args),
}));

vi.mock("sonner", () => ({
  toast: {
    error: (...args: unknown[]) => toastErrorMock(...args),
    success: (...args: unknown[]) => toastSuccessMock(...args),
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
  toastSuccessMock.mockReset();
  setActiveModelMock.mockReset();
  fetchAvailableModelsMock.mockReset();
  fetchRuntimeDefaultsMock.mockReset();
  getModelMetadataMock.mockReset();
  useModelLoadStateMock.mockReturnValue(idleLoadState);
  fetchAvailableModelsMock.mockResolvedValue([]);
  fetchRuntimeDefaultsMock.mockResolvedValue({
    hardware_concurrency: 16,
    threads_default: 8,
    supports_cuda: true,
    platform: "windows",
  });
  setActiveModelMock.mockResolvedValue({});
  getModelMetadataMock.mockRejectedValue(new Error("not found"));
  fetchGenerationSettingsMock.mockReset();
  setGenerationSettingsMock.mockReset();
  fetchGenerationSettingsMock.mockResolvedValue(DEFAULT_GENERATION_PARAMS_FAKE);
  setGenerationSettingsMock.mockResolvedValue(DEFAULT_GENERATION_PARAMS_FAKE);
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
      expect(toastErrorMock).toHaveBeenCalledWith("boom");
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
      expect(toastErrorMock).toHaveBeenCalledWith("network");
    });
  });

  it("renders a schema-mismatch banner when listThreads throws SchemaVersionMismatchError", async () => {
    listThreadsMock.mockRejectedValueOnce(new FakeSchemaVersionMismatchError(3, 4));

    render(<ChatPanelAdapter />);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts.some((el) => /stored 3, bundled 4/i.test(el.textContent ?? ""))).toBe(true);
    });
    expect(toastErrorMock).not.toHaveBeenCalled();
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

  it("opens the load dialog when local-llm/model-load-dialog:open fires", async () => {
    listThreadsMock.mockResolvedValueOnce({
      threads: [baseThread("t-1", "Alpha")],
      has_more: false,
    });
    fetchAvailableModelsMock.mockResolvedValueOnce([
      {
        family_id: "meta/llama",
        variant_id: "Q4",
        label: "Llama Q4",
        format: "gguf",
        size_bytes: 1024,
        max_context: 8192,
      },
    ]);

    render(<ChatPanelAdapter />);
    await waitFor(() => expect(listThreadsMock).toHaveBeenCalled());
    await waitFor(() => expect(fetchAvailableModelsMock).toHaveBeenCalled());

    expect(screen.queryByRole("dialog")).toBeNull();

    await act(async () => {
      window.dispatchEvent(new CustomEvent("local-llm/model-load-dialog:open"));
    });

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("handleLoadModel calls setActiveModel with the runtime tuning", async () => {
    listThreadsMock.mockResolvedValueOnce({
      threads: [baseThread("t-1", "Alpha")],
      has_more: false,
    });
    fetchAvailableModelsMock.mockResolvedValueOnce([
      {
        family_id: "meta/llama",
        variant_id: "Q4",
        label: "Llama Q4",
        format: "gguf",
        size_bytes: 1024,
        max_context: 8192,
      },
    ]);

    render(<ChatPanelAdapter />);
    await waitFor(() => expect(fetchAvailableModelsMock).toHaveBeenCalled());
    await waitFor(() => expect(fetchRuntimeDefaultsMock).toHaveBeenCalled());

    await act(async () => {
      window.dispatchEvent(new CustomEvent("local-llm/model-load-dialog:open"));
    });

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    const listbox = await screen.findByRole("listbox", { name: /downloaded models/i });
    const option = listbox.querySelector('[role="option"]') as HTMLElement;
    await act(async () => {
      fireEvent.click(option);
    });

    const loadBtn = screen.getByRole("button", { name: /load model/i });
    await act(async () => {
      fireEvent.click(loadBtn);
    });

    await waitFor(() => expect(setActiveModelMock).toHaveBeenCalled());
    const [threadId, familyId, variantId, runtime] = setActiveModelMock.mock.calls[0]!;
    expect(threadId).toBe("t-1");
    expect(familyId).toBe("meta/llama");
    expect(variantId).toBe("Q4");
    expect(runtime).toBeDefined();
    expect(runtime.ctx_size).toBeDefined();
    expect(runtime.cache_type_k).toBeDefined();

    expect(toastSuccessMock).toHaveBeenCalled();
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

  it("forwards systemPrompt from generation settings to streamMessage", async () => {
    listThreadsMock.mockResolvedValueOnce({
      threads: [baseThread("t-1", "Alpha")],
      has_more: false,
    });
    fetchGenerationSettingsMock.mockResolvedValueOnce({
      ...DEFAULT_GENERATION_PARAMS_FAKE,
      system_prompt: "Be terse.",
    });
    streamMessageMock.mockReturnValue({ abort: vi.fn() });
    useModelLoadStateMock.mockReturnValue({
      phase: "ready",
      label: "test-model",
      port: 12345,
    } satisfies ModelLoadState);

    render(<ChatPanelAdapter />);

    await waitFor(() => expect(fetchGenerationSettingsMock).toHaveBeenCalledWith("t-1", expect.anything()));

    const composer = await screen.findByPlaceholderText(/send a message/i);
    fireEvent.change(composer, { target: { value: "hello" } });
    const sendBtn = screen.getByRole("button", { name: /send message/i });
    await act(async () => {
      fireEvent.click(sendBtn);
    });

    await waitFor(() => expect(streamMessageMock).toHaveBeenCalledTimes(1));
    const [firstArg] = streamMessageMock.mock.calls[0]!;
    expect(firstArg.systemPrompt).toBe("Be terse.");
  });

  it("streamMessage onDone records token usage and renders the ContextMeter", async () => {
    const storage: Record<string, string> = {
      "local-llm:runtime-tuning": JSON.stringify({ "meta/llama": { ctx_size: 8192 } }),
    };
    const previousLocalStorage = window.localStorage;
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => storage[key] ?? null,
        setItem: (key: string, value: string) => {
          storage[key] = value;
        },
        removeItem: (key: string) => {
          delete storage[key];
        },
        clear: () => {
          for (const k of Object.keys(storage)) delete storage[k];
        },
        key: (i: number) => Object.keys(storage)[i] ?? null,
        get length() {
          return Object.keys(storage).length;
        },
      },
    });
    listThreadsMock.mockResolvedValueOnce({
      threads: [baseThread("t-1", "Alpha")],
      has_more: false,
    });
    fetchAvailableModelsMock.mockResolvedValueOnce([
      {
        family_id: "meta/llama",
        variant_id: "Q4",
        label: "Llama Q4",
        format: "gguf",
        size_bytes: 1024,
        max_context: 8192,
      },
    ]);
    let capturedHandlers: { onDone?: (stats: unknown) => void } | null = null;
    streamMessageMock.mockImplementation((_req: unknown, handlers: unknown) => {
      capturedHandlers = handlers as { onDone?: (stats: unknown) => void };
      return { abort: vi.fn() };
    });
    useModelLoadStateMock.mockReturnValue({
      phase: "ready",
      label: "Llama Q4",
      port: 12345,
      familyId: "meta/llama",
      variantId: "Q4",
    } satisfies ModelLoadState);

    render(<ChatPanelAdapter />);

    await waitFor(() => expect(fetchAvailableModelsMock).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());

    const composer = await screen.findByPlaceholderText(/send a message/i);
    fireEvent.change(composer, { target: { value: "hello" } });
    const sendBtn = screen.getByRole("button", { name: /send message/i });
    await act(async () => {
      fireEvent.click(sendBtn);
    });

    await waitFor(() => expect(streamMessageMock).toHaveBeenCalledTimes(1));
    expect(capturedHandlers).not.toBeNull();

    await act(async () => {
      capturedHandlers!.onDone?.({
        latencyMs: 100,
        promptTokens: 500,
        completionTokens: 200,
        tokensPerSec: 25,
        params: {
          temperature: 0.8,
          top_p: 0.95,
          top_k: 40,
          max_tokens: 4096,
          repeat_penalty: 1.1,
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByRole("progressbar", { name: /context used/i })).toBeInTheDocument();
    });
    const bar = screen.getByRole("progressbar", { name: /context used/i });
    const wrap = bar.parentElement;
    expect(wrap?.textContent ?? "").toContain("700");
    expect(wrap?.textContent ?? "").toContain("8,192");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: previousLocalStorage,
    });
  });

  it("updates the system prompt when the editor onChange fires", async () => {
    listThreadsMock.mockResolvedValueOnce({
      threads: [baseThread("t-1", "Alpha")],
      has_more: false,
    });

    render(<ChatPanelAdapter />);
    await waitFor(() => expect(fetchGenerationSettingsMock).toHaveBeenCalled());

    const editor = (await screen.findByLabelText(/system prompt/i, {
      selector: "textarea",
    })) as HTMLTextAreaElement;
    expect(editor.value).toBe(DEFAULT_GENERATION_PARAMS_FAKE.system_prompt);

    await act(async () => {
      fireEvent.change(editor, { target: { value: "New prompt." } });
    });

    expect(editor.value).toBe("New prompt.");
  });
});
