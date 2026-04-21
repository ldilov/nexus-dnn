import { useCallback, useEffect, useState } from 'react';
import { useLoaderData, useParams, useRevalidator } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import {
  appendMessage,
  AppendMessageFailed,
  deleteThread,
  getThread,
  listMessages,
  patchThread,
  SchemaVersionMismatchError,
  type ChatMessage,
  type ChatThread,
  type SamplerOverride,
} from '../../../../services/extension_chat';
import { ChatUi } from './chat.ui';

export interface ChatLoaderData {
  thread: ChatThread;
  messages: ChatMessage[];
  versionMismatch: { stored: number; bundled: number } | null;
}

export async function loader({ params, request }: LoaderFunctionArgs): Promise<ChatLoaderData> {
  const threadId = params.threadId;
  if (!threadId) {
    throw new Response('missing threadId', { status: 400 });
  }
  try {
    const [thread, page] = await Promise.all([
      getThread(threadId, request.signal),
      listMessages(threadId, { limit: 500 }, request.signal),
    ]);
    return { thread, messages: page.messages, versionMismatch: null };
  } catch (err) {
    if (err instanceof SchemaVersionMismatchError) {
      throw new Response(
        JSON.stringify({ stored: err.stored, bundled: err.bundled }),
        { status: 503, headers: { 'content-type': 'application/json' } },
      );
    }
    throw err;
  }
}

function dismissedKey(threadId: string): string {
  return `nexus.local-llm.attach_dismissed.${threadId}`;
}

export default function ChatView() {
  const { thread: initialThread, messages: initialMessages } = useLoaderData() as ChatLoaderData;
  const { threadId = '' } = useParams();
  const revalidator = useRevalidator();

  const [thread, setThread] = useState(initialThread);
  const [messages, setMessages] = useState(initialMessages);
  const [pending, setPending] = useState({ send: false, attach: false, delete: false });
  const [errorText, setErrorText] = useState<string | null>(null);
  const [attachDismissed, setAttachDismissed] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem(dismissedKey(threadId)) === '1',
  );

  useEffect(() => {
    setThread(initialThread);
    setMessages(initialMessages);
  }, [initialThread, initialMessages]);

  const currentDeployment = useCurrentDeployment();

  const handleSend = useCallback(
    async (text: string) => {
      setErrorText(null);
      setPending((p) => ({ ...p, send: true }));
      const optimistic: ChatMessage = {
        message_id: `pending-${Date.now()}`,
        thread_id: threadId,
        ordinal: messages.length,
        role: 'user',
        content: text,
        is_partial: false,
        created_at: new Date().toISOString(),
      };
      setMessages((ms) => [...ms, optimistic]);
      try {
        await appendMessage(threadId, { role: 'user', content: text });
        revalidator.revalidate();
      } catch (err) {
        if (err instanceof AppendMessageFailed) {
          setErrorText(`Could not save this message. Text preserved: "${err.pendingText}"`);
        } else {
          setErrorText('Could not save this message.');
        }
        setMessages((ms) => ms.filter((m) => m.message_id !== optimistic.message_id));
      } finally {
        setPending((p) => ({ ...p, send: false }));
      }
    },
    [messages.length, revalidator, threadId],
  );

  const handleRename = useCallback(
    async (next: string) => {
      const prev = thread;
      setThread({ ...thread, title: next, title_resolved: next });
      try {
        const updated = await patchThread(threadId, { title: next });
        setThread(updated);
      } catch {
        setThread(prev);
        setErrorText('Rename failed.');
      }
    },
    [thread, threadId],
  );

  const handleDelete = useCallback(async () => {
    setPending((p) => ({ ...p, delete: true }));
    try {
      await deleteThread(threadId);
      window.history.back();
    } catch {
      setErrorText('Delete failed.');
    } finally {
      setPending((p) => ({ ...p, delete: false }));
    }
  }, [threadId]);

  const handleAttach = useCallback(async () => {
    setPending((p) => ({ ...p, attach: true }));
    try {
      const updated = await patchThread(threadId, { attach_to_current_deployment: true });
      setThread(updated);
    } catch {
      setErrorText('Attach failed — make sure a deployment is bound.');
    } finally {
      setPending((p) => ({ ...p, attach: false }));
    }
  }, [threadId]);

  const handleDismissAttach = useCallback(() => {
    sessionStorage.setItem(dismissedKey(threadId), '1');
    setAttachDismissed(true);
  }, [threadId]);

  const handleOverrideChange = useCallback(
    async (next: SamplerOverride | null) => {
      const prev = thread;
      const optimistic: ChatThread = { ...thread, sampler_override: next };
      setThread(optimistic);
      try {
        const updated =
          next === null
            ? await patchThread(threadId, { clear_sampler_override: true })
            : await patchThread(threadId, { sampler_override: next });
        setThread(updated);
      } catch {
        setThread(prev);
        setErrorText('Saving sampler override failed.');
      }
    },
    [thread, threadId],
  );

  return (
    <ChatUi
      thread={thread}
      messages={messages}
      currentDeployment={currentDeployment}
      attachDismissed={attachDismissed}
      pending={pending}
      errorText={errorText}
      onSend={handleSend}
      onRename={handleRename}
      onDelete={handleDelete}
      onAttach={handleAttach}
      onDismissAttachPrompt={handleDismissAttach}
      onOverrideChange={handleOverrideChange}
    />
  );
}

function useCurrentDeployment(): { id: string; label: string } | null {
  const [dep, setDep] = useState<{ id: string; label: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/v1/deployments', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        if (!body) return;
        const list: Array<{ id: string; label?: string; name?: string; state?: string }> =
          Array.isArray(body) ? body : Array.isArray(body?.deployments) ? body.deployments : [];
        const bound = list.find((d) =>
          d.state ? ['active', 'running', 'bound', 'ready'].includes(d.state) : true,
        );
        if (bound) {
          setDep({ id: bound.id, label: bound.label ?? bound.name ?? bound.id });
        } else {
          setDep(null);
        }
      })
      .catch(() => {
        setDep(null);
      });
    return () => controller.abort();
  }, []);

  return dep;
}
