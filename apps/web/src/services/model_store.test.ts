import { describe, expect, it } from "vitest";
import {
  DEFAULT_SEARCH_PARAMS,
  parseSearchParams,
  serializeSearchParams,
  directTargetFromFamily,
  type ParsedSearchParams,
  type ModelFamily,
} from "./model_store";

describe("parseSearchParams / serializeSearchParams", () => {
  it("returns defaults for an empty querystring", () => {
    const p = parseSearchParams(new URLSearchParams());
    expect(p).toEqual(DEFAULT_SEARCH_PARAMS);
  });

  it("round-trips every field (T090)", () => {
    const input: ParsedSearchParams = {
      q: "llama-3",
      repo: "wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF",
      formats: ["gguf", "safetensors"],
      backends: ["llama.cpp"],
      modalities: ["llm", "image"],
      licenses: ["apache-2.0"],
      compat: ["compatible", "downloadable_but_not_runnable"],
      installed: "installed",
      showUnsupported: true,
      sort: "most_downloaded",
      page: 3,
      pageSize: 50,
      view: "list",
      source: "from_url",
    };
    const qs = serializeSearchParams(input);
    const back = parseSearchParams(new URLSearchParams(qs.toString()));
    expect(back).toEqual(input);
  });

  it("round-trips the generic repo filter", () => {
    const p: ParsedSearchParams = {
      ...DEFAULT_SEARCH_PARAMS,
      repo: "owner/some-model",
    };
    const qs = serializeSearchParams(p);
    expect(qs.get("repo")).toBe("owner/some-model");
    const back = parseSearchParams(new URLSearchParams(qs.toString()));
    expect(back.repo).toBe("owner/some-model");
  });

  it("omits default values from the URL (FR-093 AS #3)", () => {
    const qs = serializeSearchParams(DEFAULT_SEARCH_PARAMS);
    expect(qs.toString()).toBe("");
  });

  it("clears a single filter by reverting to default", () => {
    const withFormat: ParsedSearchParams = {
      ...DEFAULT_SEARCH_PARAMS,
      formats: ["gguf"],
    };
    const qs = serializeSearchParams(withFormat);
    expect(qs.getAll("format")).toEqual(["gguf"]);

    const cleared = parseSearchParams(new URLSearchParams());
    expect(cleared.formats).toEqual([]);
  });

  it("clamps pageSize into [10, 50]", () => {
    const low = parseSearchParams(new URLSearchParams("page_size=1"));
    expect(low.pageSize).toBe(10);
    const high = parseSearchParams(new URLSearchParams("page_size=9999"));
    expect(high.pageSize).toBe(50);
  });

  it("drops unknown enum values rather than throwing", () => {
    const p = parseSearchParams(
      new URLSearchParams("format=gguf&format=totally-made-up&compat=zzz"),
    );
    expect(p.formats).toEqual(["gguf"]);
    expect(p.compat).toEqual([]);
  });

  it("treats page < 1 as page=1", () => {
    const p = parseSearchParams(new URLSearchParams("page=0"));
    expect(p.page).toBe(1);
    const neg = parseSearchParams(new URLSearchParams("page=-5"));
    expect(neg.page).toBe(1);
  });

  it("encodes repeated values as repeated keys, not CSV", () => {
    const p: ParsedSearchParams = {
      ...DEFAULT_SEARCH_PARAMS,
      formats: ["gguf", "safetensors"],
      backends: ["llama.cpp", "diffusers"],
    };
    const qs = serializeSearchParams(p);
    expect(qs.getAll("format")).toEqual(["gguf", "safetensors"]);
    expect(qs.getAll("backend")).toEqual(["llama.cpp", "diffusers"]);
  });

  it("survives 10 random round-trip combinations (SC-008)", () => {
    const fixtures: ParsedSearchParams[] = [
      { ...DEFAULT_SEARCH_PARAMS, q: "alpha" },
      { ...DEFAULT_SEARCH_PARAMS, q: "beta", sort: "trending", page: 4 },
      { ...DEFAULT_SEARCH_PARAMS, view: "list" },
      { ...DEFAULT_SEARCH_PARAMS, showUnsupported: true },
      { ...DEFAULT_SEARCH_PARAMS, formats: ["pth"] },
      {
        ...DEFAULT_SEARCH_PARAMS,
        compat: ["unsupported"],
        showUnsupported: true,
      },
      { ...DEFAULT_SEARCH_PARAMS, licenses: ["apache-2.0", "mit"] },
      { ...DEFAULT_SEARCH_PARAMS, modalities: ["image", "upscaler"] },
      { ...DEFAULT_SEARCH_PARAMS, installed: "not_installed" },
      { ...DEFAULT_SEARCH_PARAMS, pageSize: 10, page: 2 },
    ];
    for (const p of fixtures) {
      const qs = serializeSearchParams(p);
      const back = parseSearchParams(new URLSearchParams(qs.toString()));
      expect(back).toEqual(p);
    }
  });
});

describe("source param", () => {
  it("defaults to huggingface and round-trips from_url", () => {
    expect(DEFAULT_SEARCH_PARAMS.source).toBe("huggingface");
    const qs = serializeSearchParams({
      ...DEFAULT_SEARCH_PARAMS,
      source: "from_url",
    });
    expect(qs.get("source")).toBe("from_url");
    const parsed = parseSearchParams(new URLSearchParams("source=from_url"));
    expect(parsed.source).toBe("from_url");
  });

  it("ignores unknown source values", () => {
    const parsed = parseSearchParams(new URLSearchParams("source=bogus"));
    expect(parsed.source).toBe("huggingface");
  });
});

describe("directTargetFromFamily", () => {
  it("derives a direct target from the primary artifact", () => {
    const family = {
      family_id: "direct_url:m.gguf",
      repository: { repo_id: "m.gguf", source_provider: "direct_url" },
      artifacts: [
        { artifact_id: "a0", role: "primary", filename: "m.gguf",
          download_url: "https://x/m.gguf", sha256: null, size_bytes: 10 },
      ],
    } as unknown as ModelFamily;
    const t = directTargetFromFamily(family)!;
    expect(t.download_url).toBe("https://x/m.gguf");
    expect(t.sha256).toBeNull();
    expect(t.source_provider).toBe("direct_url");
  });
});
