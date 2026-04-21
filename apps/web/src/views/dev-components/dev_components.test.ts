import { describe, expect, it } from "vitest";
import { deriveSnippets } from "./snippets";
import type { ComponentMetadata } from "../../services/ui_catalog";

function meta(overrides: Partial<ComponentMetadata> = {}): ComponentMetadata {
  return {
    name: "split_panel",
    display_name: "Split Panel",
    category: "layout",
    description: "",
    props_schema: {
      version: "2020-12",
      schema: { type: "object", properties: {}, additionalProperties: true },
    },
    examples: [{ title: "Default", yaml: "type: split_panel\n", tag: null }],
    docs_href: null,
    ...overrides,
  };
}

describe("deriveSnippets", () => {
  it("returns empty snippets when no component is selected", () => {
    expect(deriveSnippets(null, {})).toEqual({ yaml: "", tag: null });
  });

  it("emits type line only when no props are set", () => {
    expect(deriveSnippets(meta(), {}).yaml).toBe("type: split_panel\n");
  });

  it("emits plain string props unquoted", () => {
    const { yaml } = deriveSnippets(meta(), { title: "hello" });
    expect(yaml).toContain("title: hello");
  });

  it("quotes strings containing YAML meta characters", () => {
    const { yaml } = deriveSnippets(meta(), { q: "has: colon" });
    expect(yaml).toContain('q: "has: colon"');
  });

  it("quotes strings containing newlines", () => {
    const { yaml } = deriveSnippets(meta(), { body: "line1\nline2" });
    expect(yaml).toContain('body: "line1\\nline2"');
  });

  it("quotes empty strings", () => {
    const { yaml } = deriveSnippets(meta(), { label: "" });
    expect(yaml).toContain('label: ""');
  });

  it("quotes strings with leading or trailing whitespace", () => {
    const { yaml } = deriveSnippets(meta(), { pad: "  hi" });
    expect(yaml).toContain('pad: "  hi"');
  });

  it("emits numbers and booleans as scalars", () => {
    const { yaml } = deriveSnippets(meta(), { count: 3, enabled: true });
    expect(yaml).toContain("count: 3");
    expect(yaml).toContain("enabled: true");
  });

  it("emits null literally", () => {
    const { yaml } = deriveSnippets(meta(), { missing: null });
    expect(yaml).toContain("missing: null");
  });

  it("skips undefined props", () => {
    const { yaml } = deriveSnippets(meta(), { a: 1, b: undefined });
    expect(yaml).toContain("a: 1");
    expect(yaml).not.toContain("b:");
  });

  it("serializes arrays and objects as JSON", () => {
    const { yaml } = deriveSnippets(meta(), {
      sizes: [60, 40],
      cfg: { mode: "fast" },
    });
    expect(yaml).toContain("sizes: [60,40]");
    expect(yaml).toContain('cfg: {"mode":"fast"}');
  });

  it("returns the first example tag when available", () => {
    const withTag = meta({
      examples: [
        { title: "t", yaml: "type: x\n", tag: null },
        { title: "u", yaml: "type: y\n", tag: "ext-thing" },
      ],
    });
    expect(deriveSnippets(withTag, {}).tag).toBe("ext-thing");
  });
});
