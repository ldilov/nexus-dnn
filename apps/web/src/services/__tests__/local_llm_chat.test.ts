import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { streamMessage, type ChatTurn } from "../local_llm_chat";

interface CapturedRequest {
  url: string;
  body: {
    messages: ChatTurn[];
    [key: string]: unknown;
  };
}

function makeSseResponse(): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function captureFetch(): { captured: CapturedRequest[]; restore: () => void } {
  const captured: CapturedRequest[] = [];
  const original = globalThis.fetch;
  const stub = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const raw = init?.body;
    let body: CapturedRequest["body"] = { messages: [] };
    if (typeof raw === "string") {
      body = JSON.parse(raw) as CapturedRequest["body"];
    }
    captured.push({ url, body });
    return makeSseResponse();
  });
  globalThis.fetch = stub as unknown as typeof fetch;
  return {
    captured,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

function awaitDone(handle: { abort: () => void }, capturedDone: { fired: boolean }): Promise<void> {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (capturedDone.fired) return resolve();
      if (Date.now() - start > 1000) {
        handle.abort();
        return resolve();
      }
      setTimeout(tick, 10);
    };
    tick();
  });
}

describe("streamMessage system prompt", () => {
  let fetchCapture: ReturnType<typeof captureFetch>;

  beforeEach(() => {
    fetchCapture = captureFetch();
  });

  afterEach(() => {
    fetchCapture.restore();
  });

  it("prepends system message when systemPrompt provided", async () => {
    const done = { fired: false };
    const handle = streamMessage(
      {
        port: 12345,
        messages: [{ role: "user", content: "hi" }],
        systemPrompt: "Be terse.",
      },
      {
        onToken: () => {},
        onDone: () => {
          done.fired = true;
        },
      },
    );
    await awaitDone(handle, done);

    expect(fetchCapture.captured).toHaveLength(1);
    const body = fetchCapture.captured[0]!.body;
    expect(body.messages[0]).toEqual({ role: "system", content: "Be terse." });
    expect(body.messages[1]).toEqual({ role: "user", content: "hi" });
    expect(body.messages).toHaveLength(2);
  });

  it("skips empty systemPrompt (empty string)", async () => {
    const done = { fired: false };
    const handle = streamMessage(
      {
        port: 12345,
        messages: [{ role: "user", content: "hi" }],
        systemPrompt: "",
      },
      {
        onToken: () => {},
        onDone: () => {
          done.fired = true;
        },
      },
    );
    await awaitDone(handle, done);

    const body = fetchCapture.captured[0]!.body;
    expect(body.messages).toHaveLength(1);
    expect(body.messages[0]).toEqual({ role: "user", content: "hi" });
  });

  it("skips undefined systemPrompt", async () => {
    const done = { fired: false };
    const handle = streamMessage(
      {
        port: 12345,
        messages: [{ role: "user", content: "hi" }],
      },
      {
        onToken: () => {},
        onDone: () => {
          done.fired = true;
        },
      },
    );
    await awaitDone(handle, done);

    const body = fetchCapture.captured[0]!.body;
    expect(body.messages).toHaveLength(1);
    expect(body.messages[0]).toEqual({ role: "user", content: "hi" });
  });

  it("skips whitespace-only systemPrompt", async () => {
    const done = { fired: false };
    const handle = streamMessage(
      {
        port: 12345,
        messages: [{ role: "user", content: "hi" }],
        systemPrompt: "   \n\t   ",
      },
      {
        onToken: () => {},
        onDone: () => {
          done.fired = true;
        },
      },
    );
    await awaitDone(handle, done);

    const body = fetchCapture.captured[0]!.body;
    expect(body.messages).toHaveLength(1);
    expect(body.messages[0]).toEqual({ role: "user", content: "hi" });
  });

  it("preserves user messages order when system is prepended", async () => {
    const done = { fired: false };
    const handle = streamMessage(
      {
        port: 12345,
        messages: [
          { role: "user", content: "first" },
          { role: "assistant", content: "second" },
          { role: "user", content: "third" },
        ],
        systemPrompt: "Be terse.",
      },
      {
        onToken: () => {},
        onDone: () => {
          done.fired = true;
        },
      },
    );
    await awaitDone(handle, done);

    const body = fetchCapture.captured[0]!.body;
    expect(body.messages).toEqual([
      { role: "system", content: "Be terse." },
      { role: "user", content: "first" },
      { role: "assistant", content: "second" },
      { role: "user", content: "third" },
    ]);
  });
});
