import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  uploadModelWithProgress,
  type UploadProgress,
} from "../model_store";

/**
 * Minimal `XMLHttpRequest` test double. Captures the registered terminal
 * handlers so each test can drive exactly one terminal path (load / error /
 * abort / timeout) and assert the returned promise always settles — the core
 * BUG-1 stuck-state guard.
 */
class MockXhr {
  static instances: MockXhr[] = [];

  upload = { onprogress: null as ((e: ProgressEvent) => void) | null };
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onabort: (() => void) | null = null;
  ontimeout: (() => void) | null = null;

  status = 0;
  responseText = "";
  timeout = 0;
  method = "";
  url = "";
  sent: unknown = undefined;
  aborted = false;

  constructor() {
    MockXhr.instances.push(this);
  }

  open(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  send(body: unknown) {
    this.sent = body;
  }

  abort() {
    this.aborted = true;
    this.onabort?.();
  }

  emitProgress(loaded: number, total: number, lengthComputable = true) {
    this.upload.onprogress?.({
      loaded,
      total,
      lengthComputable,
    } as ProgressEvent);
  }

  emitLoad(status: number, responseText: string) {
    this.status = status;
    this.responseText = responseText;
    this.onload?.();
  }
}

const okEnvelope = (filename: string) =>
  JSON.stringify({
    meta: { request_id: "x" },
    data: {
      artifact_id: `upload:${filename}#0`,
      family_id: `upload:${filename}`,
      filename,
      size_bytes: 7,
      install_path: `/sink/${filename}`,
    },
    error: null,
  });

beforeEach(() => {
  MockXhr.instances = [];
  vi.stubGlobal("XMLHttpRequest", MockXhr as unknown as typeof XMLHttpRequest);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function makeFile(name = "m.gguf", bytes = 7): File {
  return new File([new Uint8Array(bytes)], name);
}

/** Return the n-th constructed XHR, asserting it exists (keeps tests strict). */
function xhrAt(index: number): MockXhr {
  const xhr = MockXhr.instances[index];
  if (!xhr) throw new Error(`no MockXhr at index ${index}`);
  return xhr;
}

describe("uploadModelWithProgress", () => {
  it("posts a multipart body to the upload endpoint without a Content-Type", () => {
    uploadModelWithProgress(makeFile());
    const xhr = xhrAt(0);
    expect(xhr.method).toBe("POST");
    expect(xhr.url).toBe("/api/v1/model-store/upload");
    expect(xhr.sent).toBeInstanceOf(FormData);
    const form = xhr.sent as FormData;
    expect(form.get("file")).toBeInstanceOf(File);
  });

  it("reports 0–100% progress via upload.onprogress", () => {
    const seen: UploadProgress[] = [];
    uploadModelWithProgress(makeFile(), {
      onProgress: (p) => seen.push(p),
    });
    const xhr = xhrAt(0);
    xhr.emitProgress(25, 100);
    xhr.emitProgress(100, 100);
    expect(seen).toEqual([
      { loaded: 25, total: 100, pct: 25 },
      { loaded: 100, total: 100, pct: 100 },
    ]);
  });

  it("reports null percent when the length is not computable", () => {
    const seen: UploadProgress[] = [];
    uploadModelWithProgress(makeFile(), {
      onProgress: (p) => seen.push(p),
    });
    xhrAt(0).emitProgress(2048, 0, false);
    expect(seen[0]).toEqual({ loaded: 2048, total: null, pct: null });
  });

  it("resolves with the unwrapped install result on a 2xx envelope", async () => {
    const { promise } = uploadModelWithProgress(makeFile("w.safetensors"));
    xhrAt(0).emitLoad(200, okEnvelope("w.safetensors"));
    const result = await promise;
    expect(result.filename).toBe("w.safetensors");
    expect(result.install_path).toBe("/sink/w.safetensors");
  });

  it("rejects with the server message on a non-2xx response (state never hangs)", async () => {
    const { promise } = uploadModelWithProgress(makeFile());
    xhrAt(0).emitLoad(
      400,
      JSON.stringify({ meta: {}, data: null, error: { message: "unsafe filename" } }),
    );
    await expect(promise).rejects.toThrow(/unsafe filename/);
  });

  it("ALWAYS rejects on a network error (stuck-state regression guard)", async () => {
    const { promise } = uploadModelWithProgress(makeFile());
    xhrAt(0).onerror?.();
    await expect(promise).rejects.toThrow(/network error/);
  });

  it("ALWAYS rejects on abort (stuck-state regression guard)", async () => {
    const { promise, cancel } = uploadModelWithProgress(makeFile());
    cancel();
    await expect(promise).rejects.toThrow(/aborted/);
    expect(xhrAt(0).aborted).toBe(true);
  });

  it("ALWAYS rejects on timeout (stuck-state regression guard)", async () => {
    const { promise } = uploadModelWithProgress(makeFile());
    xhrAt(0).ontimeout?.();
    await expect(promise).rejects.toThrow(/timed out/);
  });

  it("settles only once — a load after an error does not re-settle", async () => {
    const { promise } = uploadModelWithProgress(makeFile());
    const xhr = xhrAt(0);
    xhr.onerror?.();
    await expect(promise).rejects.toThrow(/network error/);
    // A late onload must be a no-op (handler already settled).
    expect(() => xhr.emitLoad(200, okEnvelope("m.gguf"))).not.toThrow();
  });

  it("aborts when an external AbortSignal fires", async () => {
    const controller = new AbortController();
    const { promise } = uploadModelWithProgress(makeFile(), {
      signal: controller.signal,
    });
    controller.abort();
    await expect(promise).rejects.toThrow(/aborted/);
    expect(xhrAt(0).aborted).toBe(true);
  });

  it("rejects immediately when the signal is already aborted", async () => {
    const controller = new AbortController();
    controller.abort();
    const { promise } = uploadModelWithProgress(makeFile(), {
      signal: controller.signal,
    });
    await expect(promise).rejects.toThrow(/aborted/);
  });

  it("keeps concurrent uploads independent", async () => {
    const onProgressA = vi.fn();
    const onProgressB = vi.fn();
    const a = uploadModelWithProgress(makeFile("a.gguf"), {
      onProgress: onProgressA,
    });
    const b = uploadModelWithProgress(makeFile("b.gguf"), {
      onProgress: onProgressB,
    });
    const xhrA = xhrAt(0);
    const xhrB = xhrAt(1);

    xhrA.emitProgress(50, 100);
    expect(onProgressA).toHaveBeenCalledTimes(1);
    expect(onProgressB).not.toHaveBeenCalled();

    // B fails; A must still be able to resolve cleanly.
    xhrB.onerror?.();
    await expect(b.promise).rejects.toThrow(/network error/);

    xhrA.emitLoad(200, okEnvelope("a.gguf"));
    const result = await a.promise;
    expect(result.filename).toBe("a.gguf");
  });
});
