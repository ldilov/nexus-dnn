import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate, useParams, useRevalidator } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import {
  appendMessage,
  AppendMessageFailed,
  createThread,
  deleteThread,
  getThread,
  listMessages,
  listThreads,
  patchThread,
  SchemaVersionMismatchError,
  type ChatMessage as RawChatMessage,
  type ChatThread,
  type SamplerOverride as RawSamplerOverride,
} from "../../../../services/extension_chat";
import {
  ChatSurface,
  type ChatMessage,
  type ChatThreadSummary,
  type SamplerOverride,
} from "../../../../components/chat";

export interface ChatLoaderData {
  thread: ChatThread;
  messages: RawChatMessage[];
  threads: ChatThread[];
  versionMismatch: { stored: number; bundled: number } | null;
}

export async function loader({ params, request }: LoaderFunctionArgs): Promise<ChatLoaderData> {
  const threadId = params.threadId;
  if (!threadId) {
    throw new Response("missing threadId", { status: 400 });
  }
  try {
    const [thread, page, threadsPage] = await Promise.all([
      getThread(threadId, request.signal),
      listMessages(threadId, { limit: 500 }, request.signal),
      listThreads({ limit: 50 }, request.signal),
    ]);
    return {
      thread,
      messages: page.messages,
      threads: threadsPage.threads,
      versionMismatch: null,
    };
  } catch (err) {
    if (err instanceof SchemaVersionMismatchError) {
      throw new Response(JSON.stringify({ stored: err.stored, bundled: err.bundled }), {
        status: 503,
        headers: { "content-type": "application/json" },
      });
    }
    throw err;
  }
}

function dismissedKey(threadId: string): string {
  return `nexus.local-llm.attach_dismissed.${threadId}`;
}

function toThreadSummary(thread: ChatThread): ChatThreadSummary {
  return {
    id: thread.thread_id,
    title: thread.title_resolved,
    updatedAt: thread.updated_at,
  };
}

function toChatMessage(raw: RawChatMessage): ChatMessage {
  return {
    id: raw.message_id,
    role: raw.role,
    text: raw.content || (raw.is_partial ? "(incomplete)" : ""),
    status: raw.is_partial ? "streaming" : "complete",
    createdAt: raw.created_at,
  };
}

function toSamplerOverride(raw: RawSamplerOverride | null | undefined): SamplerOverride | undefined {
  if (!raw) return undefined;
  return {
    temperature: raw.temperature,
    topP: raw.top_p,
    maxTokens: undefined,
    systemPromptOverride: undefined,
  };
}

function fromSamplerOverride(next: SamplerOverride): RawSamplerOverride {
  return {
    temperature: next.temperature,
    top_p: next.topP,
  };
}

export default function ChatView() {
  const {
    thread: initialThread,
    messages: initialMessages,
    threads: initialThreads,
  } = useLoaderData() as ChatLoaderData;
  const { threadId = "" } = useParams();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const [thread, setThread] = useState(initialThread);
  const [messages, setMessages] = useState(initialMessages);
  const [threadsState, setThreadsState] = useState(initialThreads);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    setThread(initialThread);
    setMessages(initialMessages);
    setThreadsState(initialThreads);
  }, [initialThread, initialMessages, initialThreads]);

  const handleSelectThread = useCallback(
    (id: string) => {
      navigate(`/extensions/nexus.local-llm/chat/${encodeURIComponent(id)}`);
    },
    [navigate],
  );

  const handleCreateThread = useCallback(async () => {
    try {
      const created = await createThread({});
      navigate(`/extensions/nexus.local-llm/chat/${encodeURIComponent(created.thread_id)}`);
    } catch {
      setErrorText("Could not create a new thread.");
    }
  }, [navigate]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      setErrorText(null);
      const optimistic: RawChatMessage = {
        message_id: `pending-${Date.now()}`,
        thread_id: threadId,
        ordinal: messages.length,
        role: "user",
        content: text,
        is_partial: false,
        created_at: new Date().toISOString(),
      };
      setMessages((ms) => [...ms, optimistic]);
      try {
        await appendMessage(threadId, { role: "user", content: text });
        revalidator.revalidate();
      } catch (err) {
        if (err instanceof AppendMessageFailed) {
          setErrorText(`Could not save this message. Text preserved: "${err.pendingText}"`);
        } else {
          setErrorText("Could not save this message.");
        }
        setMessages((ms) => ms.filter((m) => m.message_id !== optimistic.message_id));
      }
    },
    [messages.length, revalidator, threadId],
  );

  const handleRenameThread = useCallback(
    async (id: string, nextTitle: string) => {
      const prev = thread;
      setThread({ ...thread, title: nextTitle, title_resolved: nextTitle });
      try {
        const updated = await patchThread(id, { title: nextTitle });
        setThread(updated);
      } catch {
        setThread(prev);
        setErrorText("Rename failed.");
      }
    },
    [thread],
  );

  const handleDeleteThread = useCallback(
    async (id: string) => {
      try {
        await deleteThread(id);
        try {
          window.sessionStorage.removeItem(dismissedKey(id));
        } catch {
          /* ignore */
        }
        window.history.back();
      } catch {
        setErrorText("Delete failed.");
      }
    },
    [],
  );

  const handleAttachToDeployment = useCallback(
    async (id: string, _deploymentId: string) => {
      try {
        const updated = await patchThread(id, { attach_to_current_deployment: true });
        setThread(updated);
      } catch {
        setErrorText("Attach failed — make sure a deployment is bound.");
      }
    },
    [],
  );

  const handleUpdateSamplerOverride = useCallback(
    async (next: SamplerOverride) => {
      const prev = thread;
      const raw = fromSamplerOverride(next);
      setThread({ ...thread, sampler_override: raw });
      try {
        const updated = await patchThread(threadId, { sampler_override: raw });
        setThread(updated);
      } catch {
        setThread(prev);
        setErrorText("Saving sampler override failed.");
      }
    },
    [thread, threadId],
  );

  const threadsForSurface = useMemo(() => threadsState.map(toThreadSummary), [threadsState]);
  const messagesForSurface = useMemo(() => messages.map(toChatMessage), [messages]);
  const samplerOverride = toSamplerOverride(thread.sampler_override);

  const surfaceMessages = useMemo<ChatMessage[]>(() => {
    if (!errorText) return messagesForSurface;
    const banner: ChatMessage = {
      id: `error-${Date.now()}`,
      role: "system",
      text: errorText,
      status: "failed",
      isSchemaMismatch: false,
      createdAt: new Date().toISOString(),
    };
    return [...messagesForSurface, banner];
  }, [messagesForSurface, errorText]);

  return (
    <ChatSurface
      surfaceTitle="Local LLM"
      threads={threadsForSurface}
      activeThreadId={thread.thread_id}
      onSelectThread={handleSelectThread}
      onCreateThread={() => void handleCreateThread()}
      onRenameThread={handleRenameThread}
      onDeleteThread={handleDeleteThread}
      onAttachThreadToDeployment={handleAttachToDeployment}
      messages={surfaceMessages}
      isStreaming={false}
      onSendMessage={handleSendMessage}
      models={[]}
      activeModelId={null}
      modelPickerStatus="unavailable"
      samplerOverride={samplerOverride}
      onUpdateSamplerOverride={handleUpdateSamplerOverride}
      composerPlaceholder="Send a message…"
      ariaLabel="Local LLM chat"
    />
  );
}
