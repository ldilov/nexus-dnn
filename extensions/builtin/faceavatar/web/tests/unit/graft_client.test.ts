import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { startGraft } from "../../src/services/graft_client";
import { DEFAULT_GRAFT_PARAMS } from "../../src/domain/defaults";

const PREFIX = "/api/v1/extensions/nexus.3d.faceavatar";

describe("startGraft", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("POSTs base_mesh + image + params to /graft/start under the faceavatar mount", async () => {
    // Arrange
    const fetchMock = vi.fn(
      async (_url: string, _init?: RequestInit) =>
        new Response(JSON.stringify({ jobId: "graft-1" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
    );
    vi.stubGlobal("fetch", fetchMock);

    // Act
    const res = await startGraft({
      base_mesh: "mesh-ref-7",
      image: "photo-ref-3",
      params: { ...DEFAULT_GRAFT_PARAMS, seam: "hairline", blend_ring: 0.5 },
    });

    // Assert
    expect(res.jobId).toBe("graft-1");
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe(`${PREFIX}/graft/start`);
    expect(init?.method).toBe("POST");
    const body = JSON.parse(String(init?.body));
    expect(body.base_mesh).toBe("mesh-ref-7");
    expect(body.image).toBe("photo-ref-3");
    expect(body.params.seam).toBe("hairline");
    expect(body.params.blend_ring).toBe(0.5);
    expect(body.params.keep_hair).toBe(true);
  });

  test("throws ExtensionApiError on a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ category: "invalid", message: "bad mesh" }), {
            status: 422,
            headers: { "content-type": "application/json" },
          }),
      ),
    );
    await expect(
      startGraft({ base_mesh: "m", image: "i", params: { ...DEFAULT_GRAFT_PARAMS } }),
    ).rejects.toMatchObject({ status: 422, message: "bad mesh" });
  });
});
