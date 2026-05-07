import { describe, expect, it, afterEach, vi, beforeEach } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import type { ChatThread } from "../../services/extension_chat";
import type { ModelLoadState } from "../../hooks/use_model_load_state";

const listThreadsMock = vi.fn();
const createThreadMock = vi.fn();
const patchThreadMock = vi.fn();
const deleteThreadMock = vi.fn();
const listMessagesMock = vi.fn();
const appendMessageMock = vi.fn();
const streamMessageMock = vi.fn();
const useModelLoadStateMock = vi.fn();
const useLocalLlmRuntimeStatusMock = vi.fn();
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
  listMessages: (...args: unknown[]) => listMessagesMock(...args),
  appendMessage: (...args: unknown[]) => appendMessageMock(...args),
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

vi.mock("../local_llm/use_runtime_status", () => ({
  useLocalLlmRuntimeStatus: () => useLocalLlmRuntimeStatusMock(),
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
  listMessagesMock.mockReset();
  appendMessageMock.mockReset();
  listMessagesMock.mockResolvedValue({ messages: [], has_more: false, next_after_ordinal: null });
  appendMessageMock.mockImplementation((threadId: string, input: { role: string; content: string }) =>
    Promise.resolve({
      message_id: `m-${Math.random().toString(36).slice(2, 8)}`,
      thread_id: threadId,
      ordinal: 0,
      role: input.role,
      content: input.content,
      is_partial: false,
      created_at: new Date().toISOString(),
    }),
  );
  streamMessageMock.mockReset();
  useModelLoadStateMock.mockReset();
  toastErrorMock.mockReset();
  toastSuccessMock.mockReset();
  setActiveModelMock.mockReset();
  fetchAvailableModelsMock.mockReset();
  fetchRuntimeDefaultsMock.mockReset();
  getModelMetadataMock.mockReset();
  useModelLoadStateMock.mockReturnValue(idleLoadState);
  useLocalLlmRuntimeStatusMock.mockReset();
  useLocalLlmRuntimeStatusMock.mockReturnValue(idleLoadState);
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

    const composer = screen.getByPlaceholderText(/message /i);
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

    const composer = await screen.findByPlaceholderText(/message /i);
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
    try {
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

    const composer = await screen.findByPlaceholderText(/message /i);
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
    } finally {
      Object.defineProperty(window, "localStorage", {
        configurable: true,
        value: previousLocalStorage,
      });
    }
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

  describe("thread history persistence", () => {
    it("loads_thread_history_on_thread_select", async () => {
      listThreadsMock.mockResolvedValueOnce({
        threads: [baseThread("t-1", "Alpha")],
        has_more: false,
      });
      listMessagesMock.mockResolvedValueOnce({
        messages: [
          {
            message_id: "m-1",
            thread_id: "t-1",
            ordinal: 0,
            role: "user",
            content: "Hello there",
            is_partial: false,
            created_at: "2026-05-07T12:00:00Z",
          },
          {
            message_id: "m-2",
            thread_id: "t-1",
            ordinal: 1,
            role: "assistant",
            content: "Hi back",
            is_partial: false,
            created_at: "2026-05-07T12:00:01Z",
          },
        ],
        has_more: false,
        next_after_ordinal: null,
      });

      render(<ChatPanelAdapter />);

      await waitFor(() => expect(listMessagesMock).toHaveBeenCalledWith("t-1", { limit: 200 }, expect.anything()));
      await waitFor(() => {
        expect(screen.getByText("Hello there")).toBeInTheDocument();
        expect(screen.getByText("Hi back")).toBeInTheDocument();
      });
    });

    it("persists_user_and_assistant_messages_on_send", async () => {
      listThreadsMock.mockResolvedValueOnce({
        threads: [baseThread("t-1", "Alpha")],
        has_more: false,
      });
      let capturedHandlers: { onDone?: (stats: unknown) => void } | null = null;
      streamMessageMock.mockImplementation((_req: unknown, handlers: unknown) => {
        capturedHandlers = handlers as { onDone?: (stats: unknown) => void; onToken?: (s: string) => void };
        return { abort: vi.fn() };
      });
      useModelLoadStateMock.mockReturnValue({
        phase: "ready",
        label: "test-model",
        port: 12345,
      } satisfies ModelLoadState);

      render(<ChatPanelAdapter />);

      await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());

      const composer = await screen.findByPlaceholderText(/message /i);
      fireEvent.change(composer, { target: { value: "hello" } });
      const sendBtn = screen.getByRole("button", { name: /send message/i });
      await act(async () => {
        fireEvent.click(sendBtn);
      });

      await waitFor(() => expect(streamMessageMock).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(appendMessageMock).toHaveBeenCalledWith("t-1", { role: "user", content: "hello" }),
      );

      expect(capturedHandlers).not.toBeNull();
      const handlers = capturedHandlers as unknown as {
        onToken?: (s: string) => void;
        onDone?: (stats: unknown) => void;
      };
      await act(async () => {
        handlers.onToken?.("Hi user");
      });
      await act(async () => {
        handlers.onDone?.({
          latencyMs: 50,
          promptTokens: 10,
          completionTokens: 5,
          tokensPerSec: 25,
          params: {},
        });
      });

      await waitFor(() =>
        expect(appendMessageMock).toHaveBeenCalledWith("t-1", { role: "assistant", content: "Hi user" }),
      );
    });

    it("switching_threads_loads_each_thread_history_independently", async () => {
      listThreadsMock.mockResolvedValue({
        threads: [baseThread("t-1", "Alpha"), baseThread("t-2", "Beta")],
        has_more: false,
      });

      const t1Page = {
        messages: [
          {
            message_id: "m-1",
            thread_id: "t-1",
            ordinal: 0,
            role: "user" as const,
            content: "Alpha question",
            is_partial: false,
            created_at: "2026-05-07T12:00:00Z",
          },
        ],
        has_more: false,
        next_after_ordinal: null,
      };
      const t2Page = {
        messages: [
          {
            message_id: "m-9",
            thread_id: "t-2",
            ordinal: 0,
            role: "assistant" as const,
            content: "Beta answer",
            is_partial: false,
            created_at: "2026-05-07T12:01:00Z",
          },
        ],
        has_more: false,
        next_after_ordinal: null,
      };
      listMessagesMock.mockImplementation((threadId: string) => {
        if (threadId === "t-1") return Promise.resolve(t1Page);
        if (threadId === "t-2") return Promise.resolve(t2Page);
        return Promise.resolve({ messages: [], has_more: false, next_after_ordinal: null });
      });

      render(<ChatPanelAdapter />);

      await waitFor(() => expect(screen.getByText("Alpha question")).toBeInTheDocument());

      const beta = screen.getByText("Beta");
      await act(async () => {
        fireEvent.click(beta);
      });

      await waitFor(() => expect(screen.getByText("Beta answer")).toBeInTheDocument());
      expect(screen.queryByText("Alpha question")).not.toBeInTheDocument();

      const alpha = screen.getByText("Alpha");
      await act(async () => {
        fireEvent.click(alpha);
      });

      await waitFor(() => expect(screen.getByText("Alpha question")).toBeInTheDocument());
      expect(screen.queryByText("Beta answer")).not.toBeInTheDocument();
    });
  });

  describe("sticky model per deployment", () => {
    function withLocalStorage(seed: Record<string, string>, run: () => Promise<void>) {
      const storage: Record<string, string> = { ...seed };
      const previous = window.localStorage;
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
      return run().finally(() => {
        Object.defineProperty(window, "localStorage", {
          configurable: true,
          value: previous,
        });
      });
    }

    it("auto-binds the sticky model when the active thread is idle", async () => {
      const sticky = {
        family_id: "meta/llama",
        variant_id: "Q4",
        tuning: { ctx_size: 8192, threads: 4 },
        saved_at: "2026-05-07T00:00:00Z",
      };
      await withLocalStorage(
        {
          "local-llm:deployment-active-model": JSON.stringify({ "dep-A": sticky }),
        },
        async () => {
          listThreadsMock.mockResolvedValueOnce({
            threads: [baseThread("t-1", "Alpha")],
            has_more: false,
          });
          useModelLoadStateMock.mockReturnValue({ phase: "idle" });

          render(<ChatPanelAdapter deploymentId="dep-A" />);

          await waitFor(() => expect(setActiveModelMock).toHaveBeenCalled());
          const [threadId, familyId, variantId, runtime] = setActiveModelMock.mock.calls[0]!;
          expect(threadId).toBe("t-1");
          expect(familyId).toBe("meta/llama");
          expect(variantId).toBe("Q4");
          expect(runtime).toEqual(sticky.tuning);
        },
      );
    });

    it("does not auto-bind when the load state already has a model", async () => {
      const sticky = {
        family_id: "meta/llama",
        variant_id: "Q4",
        tuning: { ctx_size: 8192 },
        saved_at: "2026-05-07T00:00:00Z",
      };
      await withLocalStorage(
        {
          "local-llm:deployment-active-model": JSON.stringify({ "dep-A": sticky }),
        },
        async () => {
          listThreadsMock.mockResolvedValueOnce({
            threads: [baseThread("t-1", "Alpha")],
            has_more: false,
          });
          useModelLoadStateMock.mockReturnValue({
            phase: "ready",
            label: "Llama Q4",
            familyId: "meta/llama",
            variantId: "Q4",
            port: 12345,
          });

          render(<ChatPanelAdapter deploymentId="dep-A" />);

          await waitFor(() => expect(listThreadsMock).toHaveBeenCalled());
          await new Promise((r) => setTimeout(r, 50));
          expect(setActiveModelMock).not.toHaveBeenCalled();
        },
      );
    });

    it("does_not_auto_bind_when_live_runtime_already_matches_sticky", async () => {
      const sticky = {
        family_id: "meta/llama",
        variant_id: "Q4",
        tuning: { ctx_size: 8192, threads: 4 },
        saved_at: "2026-05-07T00:00:00Z",
      };
      await withLocalStorage(
        {
          "local-llm:deployment-active-model": JSON.stringify({ "dep-A": sticky }),
        },
        async () => {
          listThreadsMock.mockResolvedValueOnce({
            threads: [baseThread("t-1", "Alpha")],
            has_more: false,
          });
          useModelLoadStateMock.mockReturnValue({ phase: "idle" });
          useLocalLlmRuntimeStatusMock.mockReturnValue({
            phase: "ready",
            label: "Llama Q4",
            familyId: "meta/llama",
            variantId: "Q4",
            port: 12345,
          });

          render(<ChatPanelAdapter deploymentId="dep-A" />);

          await waitFor(() => expect(listThreadsMock).toHaveBeenCalled());
          await new Promise((r) => setTimeout(r, 50));
          expect(setActiveModelMock).not.toHaveBeenCalled();
        },
      );
    });

    it("does not auto-bind when no sticky model is stored for the deployment", async () => {
      await withLocalStorage({}, async () => {
        listThreadsMock.mockResolvedValueOnce({
          threads: [baseThread("t-1", "Alpha")],
          has_more: false,
        });
        useModelLoadStateMock.mockReturnValue({ phase: "idle" });

        render(<ChatPanelAdapter deploymentId="dep-A" />);

        await waitFor(() => expect(listThreadsMock).toHaveBeenCalled());
        await new Promise((r) => setTimeout(r, 50));
        expect(setActiveModelMock).not.toHaveBeenCalled();
      });
    });

    it("does_not_flash_loading_on_thread_switch_when_runtime_already_matches_sticky", async () => {
      const sticky = {
        family_id: "meta/llama",
        variant_id: "Q4",
        tuning: { ctx_size: 8192 },
        saved_at: "2026-05-07T00:00:00Z",
      };
      await withLocalStorage(
        {
          "local-llm:deployment-active-model": JSON.stringify({ "dep-A": sticky }),
        },
        async () => {
          listThreadsMock.mockResolvedValue({
            threads: [baseThread("t-1", "Alpha"), baseThread("t-2", "Beta")],
            has_more: false,
          });
          useModelLoadStateMock.mockImplementation((threadId: string | null) => {
            if (threadId === "t-1") {
              return {
                phase: "ready",
                label: "Llama Q4",
                familyId: "meta/llama",
                variantId: "Q4",
                port: 12345,
              } satisfies ModelLoadState;
            }
            return { phase: "idle" } satisfies ModelLoadState;
          });

          render(<ChatPanelAdapter deploymentId="dep-A" />);

          await waitFor(() => expect(screen.getByText("Beta")).toBeInTheDocument());

          const beta = screen.getByText("Beta");
          await act(async () => {
            fireEvent.click(beta);
          });

          await waitFor(() => expect(useModelLoadStateMock).toHaveBeenCalledWith("t-2"));

          const composer = await screen.findByPlaceholderText(/message /i);
          expect(composer).not.toBeDisabled();
          expect(screen.queryByText(/choose a model/i)).toBeNull();
          expect(screen.queryByText(/loading/i)).toBeNull();
        },
      );
    });

    it("still_shows_loading_when_sticky_mismatches_live_runtime", async () => {
      const sticky = {
        family_id: "meta/llama",
        variant_id: "Q4",
        tuning: { ctx_size: 8192 },
        saved_at: "2026-05-07T00:00:00Z",
      };
      await withLocalStorage(
        {
          "local-llm:deployment-active-model": JSON.stringify({ "dep-A": sticky }),
        },
        async () => {
          listThreadsMock.mockResolvedValue({
            threads: [baseThread("t-1", "Alpha"), baseThread("t-2", "Beta")],
            has_more: false,
          });
          useModelLoadStateMock.mockImplementation((threadId: string | null) => {
            if (threadId === "t-1") {
              return {
                phase: "ready",
                label: "Mistral 7B",
                familyId: "mistral",
                variantId: "Q5",
                port: 12345,
              } satisfies ModelLoadState;
            }
            return { phase: "idle" } satisfies ModelLoadState;
          });

          render(<ChatPanelAdapter deploymentId="dep-A" />);

          await waitFor(() => expect(screen.getByText("Beta")).toBeInTheDocument());

          const beta = screen.getByText("Beta");
          await act(async () => {
            fireEvent.click(beta);
          });

          await waitFor(() => expect(useModelLoadStateMock).toHaveBeenCalledWith("t-2"));

          await waitFor(() => {
            expect(screen.queryByPlaceholderText(/message /i)).toBeNull();
          });
          expect(screen.getByText(/choose a model to enable the composer/i)).toBeInTheDocument();
        },
      );
    });

    it("persists the chosen model to deployment-active-model on successful load", async () => {
      await withLocalStorage({}, async () => {
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
        useModelLoadStateMock.mockReturnValue({ phase: "idle" });

        render(<ChatPanelAdapter deploymentId="dep-B" />);
        await waitFor(() => expect(fetchAvailableModelsMock).toHaveBeenCalled());

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

        const stored = window.localStorage.getItem("local-llm:deployment-active-model");
        expect(stored).not.toBeNull();
        const parsed = JSON.parse(stored!);
        expect(parsed["dep-B"]).toBeDefined();
        expect(parsed["dep-B"].family_id).toBe("meta/llama");
        expect(parsed["dep-B"].variant_id).toBe("Q4");
      });
    });
  });

  describe("global runtime status", () => {
    it("display_uses_global_runtime_when_per_thread_is_idle", async () => {
      const storage: Record<string, string> = {
        "local-llm:deployment-active-model": JSON.stringify({
          "dep-G": {
            family_id: "meta/llama",
            variant_id: "Q4",
            tuning: { ctx_size: 8192 },
            saved_at: "2026-05-07T00:00:00Z",
          },
        }),
      };
      const previous = window.localStorage;
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
      try {
        listThreadsMock.mockResolvedValueOnce({
          threads: [baseThread("t-fresh", "Fresh")],
          has_more: false,
        });
        useModelLoadStateMock.mockReturnValue(idleLoadState);
        useLocalLlmRuntimeStatusMock.mockReturnValue({
          phase: "ready",
          familyId: "meta/llama",
          variantId: "Q4",
          label: "Llama Q4",
          port: 12345,
        } satisfies ModelLoadState);

        render(<ChatPanelAdapter deploymentId="dep-G" />);

        await waitFor(() => expect(screen.getByText("Fresh")).toBeInTheDocument());

        const composer = await screen.findByPlaceholderText(/message /i);
        expect(composer).not.toBeDisabled();
        expect(screen.queryByText(/choose a model/i)).toBeNull();
        expect(screen.queryByText(/loading/i)).toBeNull();
      } finally {
        Object.defineProperty(window, "localStorage", {
          configurable: true,
          value: previous,
        });
      }
    });

    it("display_falls_through_when_global_is_idle", async () => {
      listThreadsMock.mockResolvedValueOnce({
        threads: [baseThread("t-1", "Alpha")],
        has_more: false,
      });
      useModelLoadStateMock.mockReturnValue(idleLoadState);
      useLocalLlmRuntimeStatusMock.mockReturnValue(idleLoadState);

      render(<ChatPanelAdapter />);

      await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());
      expect(
        screen.getByText(/choose a model to enable the composer/i),
      ).toBeInTheDocument();
    });
  });
});
