import { afterEach, describe, expect, test, vi } from "vitest";
import { EXTENSION_PREFIX, ExtensionApiError } from "../../src/services/http";
import { uploadFile } from "../../src/services/upload_client";

afterEach(() => {
  vi.restoreAllMocks();
});

function makeFile(): File {
  return new File([new Uint8Array([1, 2, 3])], "anchor.png", { type: "image/png" });
}

describe("uploadFile", () => {
  test("POSTs multipart file to the uploads endpoint and returns the workspace path", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ path: "/workspace/uploads/anchor.png" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await uploadFile(makeFile());

    expect(result.path).toBe("/workspace/uploads/anchor.png");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${EXTENSION_PREFIX}/uploads`);
    expect(init.method).toBe("POST");
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get("file")).toBeInstanceOf(File);
  });

  test("throws ExtensionApiError with the server envelope on failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ category: "io", message: "disk full" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(uploadFile(makeFile())).rejects.toMatchObject({
      name: "ExtensionApiError",
      status: 500,
      message: "disk full",
    });
  });

  test("surfaces the status text when the error body is not JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("nope", { status: 413, statusText: "Payload Too Large" }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const err = await uploadFile(makeFile()).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(ExtensionApiError);
    expect((err as ExtensionApiError).status).toBe(413);
  });
});
