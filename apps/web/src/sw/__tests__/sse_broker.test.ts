import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  __resetBrokerForTests,
  extractBrokerKey,
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
