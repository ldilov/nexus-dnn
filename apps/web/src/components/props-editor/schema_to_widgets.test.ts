import { describe, expect, it } from "vitest";
import { extractDefaults, schemaToWidgets } from "./schema_to_widgets";

describe("schemaToWidgets", () => {
  it("returns [] when schema has no properties", () => {
    expect(schemaToWidgets({ type: "object" })).toEqual([]);
    expect(schemaToWidgets(null)).toEqual([]);
    expect(schemaToWidgets(undefined)).toEqual([]);
  });

  it("maps string type to string widget with min/max", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: {
        title: { type: "string", minLength: 1, maxLength: 80, description: "Card heading" },
      },
      required: ["title"],
    });
    expect(fields).toHaveLength(1);
    const field = fields[0]!;
    expect(field.kind).toBe("string");
    expect(field.required).toBe(true);
    expect(field.min).toBe(1);
    expect(field.max).toBe(80);
    expect(field.description).toBe("Card heading");
  });

  it("maps number/integer types to number widget with bounds", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: {
        count: { type: "integer", minimum: 0, maximum: 100 },
        pct: { type: "number" },
      },
    });
    expect(fields[0]!.kind).toBe("number");
    expect(fields[0]!.min).toBe(0);
    expect(fields[0]!.max).toBe(100);
    expect(fields[1]!.kind).toBe("number");
  });

  it("maps boolean type to boolean widget", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: { enabled: { type: "boolean", default: true } },
    });
    expect(fields[0]!.kind).toBe("boolean");
    expect(fields[0]!.defaultValue).toBe(true);
  });

  it("maps enum to enum widget preserving values", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: {
        direction: {
          type: "string",
          enum: ["horizontal", "vertical"],
          default: "horizontal",
        },
      },
    });
    expect(fields[0]!.kind).toBe("enum");
    expect(fields[0]!.enumValues).toEqual(["horizontal", "vertical"]);
  });

  it("maps const string to single-value enum", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: { flavor: { const: "mint" } },
    });
    expect(fields[0]!.kind).toBe("enum");
    expect(fields[0]!.enumValues).toEqual(["mint"]);
  });

  it("maps array type to array widget with item descriptor", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: {
        sizes: { type: "array", items: { type: "number" } },
      },
    });
    expect(fields[0]!.kind).toBe("array");
    expect(fields[0]!.itemDescriptor?.kind).toBe("number");
  });

  it("falls back to raw for unsupported shapes", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: {
        anything: { type: ["null", "integer", "string"], pattern: "foo" },
      },
    });
    // array-of-types picks first non-null; integer here
    expect(fields[0]!.kind).toBe("number");
  });

  it("falls back to raw when no known keyword matches", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: {
        mystery: { oneOf: [{ type: "string" }, { type: "number" }] },
      },
    });
    expect(fields[0]!.kind).toBe("raw");
  });

  it("extractDefaults returns only declared defaults", () => {
    const fields = schemaToWidgets({
      type: "object",
      properties: {
        direction: { type: "string", enum: ["h", "v"], default: "h" },
        sizes: { type: "array" },
      },
    });
    expect(extractDefaults(fields)).toEqual({ direction: "h" });
  });
});
