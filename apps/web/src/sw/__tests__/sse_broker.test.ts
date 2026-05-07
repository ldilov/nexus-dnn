import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetBrokerForTests,
  extractBrokerKey,
  handleBrokerFetch,
  shouldIntercept,
} from "../sse_broker";

beforeEach(async () => {
  await __resetBrokerForTests();
});

afterEach(async () => {
  await __resetBrokerForTests();
  vi.restoreAllMocks();
});

function makeRequest(url: string, body: unknown): Request {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("shouldIntercept", () => {
  it("matches the direct llama-server completions endpoint", () => {
    const req = makeRequest("http://127.0.0.1:8001/v1/chat/completions", {});
    expect(shouldIntercept(req)).toBe(true);
  });

  it("matches the host-mounted /inference/stream route for any extension", () => {
    const req = makeRequest(
      "https://nexus.example/api/v1/extensions/some.extension/inference/stream",
      {},
    );
    expect(shouldIntercept(req)).toBe(true);
  });

  it("does not match unrelated endpoints", () => {
    const a = makeRequest("https://nexus.example/api/v1/host/info", {});
    const b = new Request("https://nexus.example/", { method: "GET" });
    expect(shouldIntercept(a)).toBe(false);
    expect(shouldIntercept(b)).toBe(false);
  });

  it("does not match GET requests even on the SSE path", () => {
    const req = new Request("http://127.0.0.1:8001/v1/chat/completions", {
      method: "GET",
    });
    expect(shouldIntercept(req)).toBe(false);
  });
});

describe("extractBrokerKey", () => {
  it("parses snake_case keys from the JSON body", async () => {
    const req = makeRequest("http://127.0.0.1:8001/v1/chat/completions", {
      deployment_id: "dep-1",
      thread_id: "thread-a",
      request_id: "req-xyz",
      messages: [],
    });
    const key = await extractBrokerKey(req);
    expect(key).toEqual({
      deploymentId: "dep-1",
      threadId: "thread-a",
      requestId: "req-xyz",
    });
  });

  it("falls back to camelCase keys", async () => {
    const req = makeRequest("http://127.0.0.1:8001/v1/chat/completions", {
      deploymentId: "dep-1",
      threadId: "thread-a",
      requestId: "req-xyz",
      messages: [],
    });
    const key = await extractBrokerKey(req);
    expect(key).toEqual({
      deploymentId: "dep-1",
      threadId: "thread-a",
      requestId: "req-xyz",
    });
  });

  it("returns null when any of the three identifying fields is missing", async () => {
    const req = makeRequest("http://127.0.0.1:8001/v1/chat/completions", {
      deployment_id: "dep-1",
      thread_id: "thread-a",
      messages: [],
    });
    expect(await extractBrokerKey(req)).toBeNull();
  });

  it("returns null on a body that is not parseable JSON", async () => {
    const req = new Request("http://127.0.0.1:8001/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    expect(await extractBrokerKey(req)).toBeNull();
  });

  it("returns null when an identifying field is empty", async () => {
    const req = makeRequest("http://127.0.0.1:8001/v1/chat/completions", {
      deployment_id: "",
      thread_id: "thread-a",
      request_id: "req-xyz",
      messages: [],
    });
    expect(await extractBrokerKey(req)).toBeNull();
  });
});

interface FetchSpy {
  readonly count: number;
}

function installSseFetchSpy(chunks: string[]): FetchSpy {
  const spy: { count: number } = { count: 0 };
  const fetchMock = vi.fn(
    async (input: RequestInfo | URL, _init?: RequestInit): Promise<Response> => {
      spy.count += 1;
      const url = typeof input === "string" ? input : input.toString();
      if (!url.includes("/v1/chat/completions") && !url.includes("/inference/stream")) {
        return new Response("not-broker", { status: 200 });
      }
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          for (const chunk of chunks) {
            controller.enqueue(new TextEncoder().encode(chunk));
            await new Promise((r) => setTimeout(r, 0));
          }
          controller.close();
        },
      });
      return new Response(stream, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    },
  );
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return spy;
}

async function readResponseAsText(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

describe("handleBrokerFetch (integration)", () => {
  it("opens exactly one upstream when two concurrent fetches share a key", async () => {
    const spy = installSseFetchSpy(["data: chunk-1\n\n", "data: [DONE]\n\n"]);
    const body = {
      deployment_id: "dep-1",
      thread_id: "thread-a",
      request_id: "req-shared",
      messages: [],
    };
    const requestA = new Request("http://127.0.0.1:8001/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const requestB = requestA.clone();
    const [responseA, responseB] = await Promise.all([
      handleBrokerFetch(requestA),
      handleBrokerFetch(requestB),
    ]);
    const [textA, textB] = await Promise.all([
      readResponseAsText(responseA),
      readResponseAsText(responseB),
    ]);
    expect(spy.count).toBe(1);
    expect(textA).toContain("chunk-1");
    expect(textB).toContain("chunk-1");
  });

  it("opens distinct upstreams for distinct requestIds in the same thread", async () => {
    const spy = installSseFetchSpy(["data: x\n\n", "data: [DONE]\n\n"]);
    const baseBody = {
      deployment_id: "dep-1",
      thread_id: "thread-b",
      messages: [],
    };
    const requestA = new Request("http://127.0.0.1:8001/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...baseBody, request_id: "req-A" }),
    });
    const requestB = new Request("http://127.0.0.1:8001/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...baseBody, request_id: "req-B" }),
    });
    const [responseA, responseB] = await Promise.all([
      handleBrokerFetch(requestA),
      handleBrokerFetch(requestB),
    ]);
    await Promise.all([
      readResponseAsText(responseA),
      readResponseAsText(responseB),
    ]);
    expect(spy.count).toBe(2);
  });

  it("falls back to direct fetch when the request body lacks broker keys", async () => {
    const spy = installSseFetchSpy([]);
    const request = new Request("http://127.0.0.1:8001/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    });
    await handleBrokerFetch(request);
    expect(spy.count).toBe(1);
  });
});
