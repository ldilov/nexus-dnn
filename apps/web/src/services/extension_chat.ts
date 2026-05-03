// audit-allow: boundary — boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
const BASE = '/api/v1/extensions/nexus.local-llm';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface SamplerOverride {
  temperature?: number;
  min_p?: number;
  top_k?: number;
  top_p?: number;
  seed?: number;
  repeat_penalty?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  typical_p?: number;
  dynatemp_range?: number;
  dynatemp_exponent?: number;
  xtc_threshold?: number;
  xtc_probability?: number;
  dry_multiplier?: number;
  dry_base?: number;
  dry_allowed_length?: number;
}

export interface SamplerBlock {
  temperature: number;
  min_p: number;
  top_k: number;
  seed: number;
  top_p?: number;
  repeat_penalty?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  typical_p?: number;
  dynatemp_range?: number;
  dynatemp_exponent?: number;
  xtc_threshold?: number;
  xtc_probability?: number;
  dry_multiplier?: number;
  dry_base?: number;
  dry_allowed_length?: number;
}

export interface ChatThread {
  thread_id: string;
  extension_id: string;
  deployment_id?: string | null;
  install_id?: string | null;
  title?: string | null;
  title_auto?: string | null;
  title_resolved: string;
  system_prompt?: string | null;
  sampler_override?: SamplerOverride | null;
  is_unbound: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  message_id: string;
  thread_id: string;
  ordinal: number;
  role: MessageRole;
  content: string;
  sampler_effective?: SamplerBlock | null;
  is_partial: boolean;
  retry_of_message_id?: string | null;
  created_at: string;
}

export interface ThreadListPage {
  threads: ChatThread[];
  has_more: boolean;
  next_before_updated_at: string | null;
}

export interface MessageListPage {
  messages: ChatMessage[];
  has_more: boolean;
  next_after_ordinal: number | null;
}

export interface CreateThreadInput {
  deployment_id?: string | null;
  install_id?: string | null;
  title?: string | null;
  system_prompt?: string | null;
  sampler_override?: SamplerOverride | null;
}

export interface PatchThreadInput {
  title?: string;
  sampler_override?: SamplerOverride;
  clear_sampler_override?: boolean;
  attach_to_current_deployment?: boolean;
}

export interface AppendMessageInput {
  role: MessageRole;
  content: string;
  sampler_effective?: SamplerBlock | null;
  is_partial?: boolean;
  retry_of_message_id?: string | null;
}

export interface ListThreadsOptions {
  deployment_id?: string;
  exclude_unbound?: boolean;
  limit?: number;
  before_updated_at?: string;
}

export class SchemaVersionMismatchError extends Error {
  constructor(
    public readonly stored: number,
    public readonly bundled: number,
  ) {
    super(`extension version mismatch: stored=${stored} bundled=${bundled}`);
    this.name = 'SchemaVersionMismatchError';
  }
}

export class AppendMessageFailed extends Error {
  public readonly cause?: unknown;
  constructor(
    public readonly pendingText: string,
    public readonly retriable: boolean,
    cause?: unknown,
  ) {
    super('append_message failed');
    this.name = 'AppendMessageFailed';
    this.cause = cause;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const resp = await fetch(`${BASE}${path}`, {
    method,
    headers: body === undefined ? undefined : { 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });
  if (resp.status === 503) {
    const payload = (await resp.json().catch(() => null)) as
      | { error?: string; stored_schema_version?: number; bundled_schema_version?: number }
      | null;
    if (payload?.error === 'schema_version_mismatch') {
      throw new SchemaVersionMismatchError(
        payload.stored_schema_version ?? 0,
        payload.bundled_schema_version ?? 0,
      );
    }
  }
  if (!resp.ok) {
    throw new Error(`${method} ${path} failed: ${resp.status}`);
  }
  if (resp.status === 204) return undefined as T;
  return (await resp.json()) as T;
}

export function listThreads(
  opts: ListThreadsOptions = {},
  signal?: AbortSignal,
): Promise<ThreadListPage> {
  const params = new URLSearchParams();
  if (opts.deployment_id) params.set('deployment_id', opts.deployment_id);
  if (opts.exclude_unbound) params.set('exclude_unbound', 'true');
  if (opts.limit !== undefined) params.set('limit', String(opts.limit));
  if (opts.before_updated_at) params.set('before_updated_at', opts.before_updated_at);
  const qs = params.toString();
  return request<ThreadListPage>('GET', `/chat/threads${qs ? `?${qs}` : ''}`, undefined, signal);
}

export function getThread(threadId: string, signal?: AbortSignal): Promise<ChatThread> {
  return request<ChatThread>('GET', `/chat/threads/${encodeURIComponent(threadId)}`, undefined, signal);
}

export function createThread(
  input: CreateThreadInput = {},
  signal?: AbortSignal,
): Promise<ChatThread> {
  return request<ChatThread>('POST', '/chat/threads', input, signal);
}

export function patchThread(
  threadId: string,
  input: PatchThreadInput,
  signal?: AbortSignal,
): Promise<ChatThread> {
  return request<ChatThread>(
    'PATCH',
    `/chat/threads/${encodeURIComponent(threadId)}`,
    input,
    signal,
  );
}

export function deleteThread(threadId: string, signal?: AbortSignal): Promise<void> {
  return request<void>('DELETE', `/chat/threads/${encodeURIComponent(threadId)}`, undefined, signal);
}

export function listMessages(
  threadId: string,
  opts: { after_ordinal?: number; limit?: number } = {},
  signal?: AbortSignal,
): Promise<MessageListPage> {
  const params = new URLSearchParams();
  if (opts.after_ordinal !== undefined) params.set('after_ordinal', String(opts.after_ordinal));
  if (opts.limit !== undefined) params.set('limit', String(opts.limit));
  const qs = params.toString();
  return request<MessageListPage>(
    'GET',
    `/chat/threads/${encodeURIComponent(threadId)}/messages${qs ? `?${qs}` : ''}`,
    undefined,
    signal,
  );
}

async function appendMessageOnce(
  threadId: string,
  input: AppendMessageInput,
  signal?: AbortSignal,
): Promise<ChatMessage> {
  return request<ChatMessage>(
    'POST',
    `/chat/threads/${encodeURIComponent(threadId)}/messages`,
    input,
    signal,
  );
}

export async function appendMessage(
  threadId: string,
  input: AppendMessageInput,
  signal?: AbortSignal,
): Promise<ChatMessage> {
  try {
    return await appendMessageOnce(threadId, input, signal);
  } catch (firstErr) {
    if (!isTransient(firstErr)) {
      throw new AppendMessageFailed(input.content, false, firstErr);
    }
    try {
      return await appendMessageOnce(threadId, input, signal);
    } catch (secondErr) {
      throw new AppendMessageFailed(input.content, false, secondErr);
    }
  }
}

function isTransient(err: unknown): boolean {
  if (err instanceof SchemaVersionMismatchError) return false;
  if (err instanceof Error && /failed: 5\d\d/.test(err.message)) return true;
  return false;
}
