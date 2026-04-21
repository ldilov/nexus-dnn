import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  AppendMessageFailed,
  appendMessage,
  SchemaVersionMismatchError,
} from './extension_chat';

const originalFetch = globalThis.fetch;

function jsonResponse(status: number, body: unknown): Response {
  return new Response(status === 204 ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('appendMessage retry behavior', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn() as typeof fetch;
  });
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('succeeds on first try without retry', async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValueOnce(
      jsonResponse(201, {
        message_id: 'm1',
        thread_id: 't1',
        ordinal: 0,
        role: 'user',
        content: 'hi',
        is_partial: false,
        created_at: new Date().toISOString(),
      }),
    );
    const msg = await appendMessage('t1', { role: 'user', content: 'hi' });
    expect(msg.content).toBe('hi');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('retries exactly once on transient 5xx then succeeds', async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(jsonResponse(503, { error: 'transient' }))
      .mockResolvedValueOnce(
        jsonResponse(201, {
          message_id: 'm1',
          thread_id: 't1',
          ordinal: 0,
          role: 'user',
          content: 'hi',
          is_partial: false,
          created_at: new Date().toISOString(),
        }),
      );
    const msg = await appendMessage('t1', { role: 'user', content: 'hi' });
    expect(msg.message_id).toBe('m1');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('fails with AppendMessageFailed and preserves pendingText after two 5xx', async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(new Response(null, { status: 500 }));
    await expect(appendMessage('t1', { role: 'user', content: 'hello' })).rejects.toMatchObject({
      name: 'AppendMessageFailed',
      pendingText: 'hello',
      retriable: false,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not retry on schema_version_mismatch and preserves pendingText', async () => {
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValueOnce(
      jsonResponse(503, {
        error: 'schema_version_mismatch',
        stored_schema_version: 99,
        bundled_schema_version: 8,
      }),
    );
    try {
      await appendMessage('t1', { role: 'user', content: 'hi' });
      throw new Error('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(AppendMessageFailed);
      const aug = err as AppendMessageFailed;
      expect(aug.pendingText).toBe('hi');
      expect(aug.cause).toBeInstanceOf(SchemaVersionMismatchError);
    }
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
