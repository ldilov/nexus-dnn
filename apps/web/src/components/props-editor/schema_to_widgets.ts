export type WidgetKind =
  | "string"
  | "number"
  | "boolean"
  | "enum"
  | "array"
  | "object"
  | "raw";

export interface FieldDescriptor {
  name: string;
  kind: WidgetKind;
  required: boolean;
  description: string | null;
  defaultValue: unknown;
  enumValues: string[] | null;
  itemDescriptor: FieldDescriptor | null;
  objectDescriptors: FieldDescriptor[] | null;
  min: number | null;
  max: number | null;
  raw: Record<string, unknown>;
}

export function schemaToWidgets(
  schema: Record<string, unknown> | null | undefined,
): FieldDescriptor[] {
  if (!schema || typeof schema !== "object") return [];
  const properties = schema.properties;
  if (!properties || typeof properties !== "object") return [];
  const requiredList = Array.isArray(schema.required)
    ? (schema.required.filter((v): v is string => typeof v === "string"))
    : [];
  const required = new Set(requiredList);
  const entries = Object.entries(properties as Record<string, unknown>);
  return entries.map(([name, rawProp]) =>
    descriptorFor(name, rawProp, required.has(name)),
  );
}

function descriptorFor(
  name: string,
  raw: unknown,
  required: boolean,
): FieldDescriptor {
  const base: FieldDescriptor = {
    name,
    kind: "raw",
    required,
    description: null,
    defaultValue: undefined,
    enumValues: null,
    itemDescriptor: null,
    objectDescriptors: null,
    min: null,
    max: null,
    raw: coerceObject(raw),
  };
  if (!raw || typeof raw !== "object") return base;
  const prop = raw as Record<string, unknown>;
  if (typeof prop.description === "string") base.description = prop.description;
  if ("default" in prop) base.defaultValue = prop.default;

  if (Array.isArray(prop.enum) && prop.enum.every((v) => typeof v === "string")) {
    base.kind = "enum";
    base.enumValues = prop.enum as string[];
    return base;
  }

  if (typeof prop.const === "string") {
    base.kind = "enum";
    base.enumValues = [prop.const];
    return base;
  }

  const type = pickType(prop.type);
  switch (type) {
    case "string":
      base.kind = "string";
      if (typeof prop.minLength === "number") base.min = prop.minLength;
      if (typeof prop.maxLength === "number") base.max = prop.maxLength;
      return base;
    case "integer":
    case "number":
      base.kind = "number";
      if (typeof prop.minimum === "number") base.min = prop.minimum;
      if (typeof prop.maximum === "number") base.max = prop.maximum;
      return base;
    case "boolean":
      base.kind = "boolean";
      return base;
    case "array":
      base.kind = "array";
      if (prop.items && typeof prop.items === "object") {
        base.itemDescriptor = descriptorFor("item", prop.items, false);
      }
      return base;
    case "object":
      base.kind = "object";
      if (
        prop.properties &&
        typeof prop.properties === "object"
      ) {
        base.objectDescriptors = schemaToWidgets(prop as Record<string, unknown>);
      }
      return base;
    default:
      return base;
  }
}

function pickType(t: unknown): string | null {
  if (typeof t === "string") return t;
  if (Array.isArray(t) && t.length > 0) {
    const nonNull = t.find((v) => typeof v === "string" && v !== "null");
    if (typeof nonNull === "string") return nonNull;
  }
  return null;
}

function coerceObject(raw: unknown): Record<string, unknown> {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return {};
}

export function extractDefaults(
  descriptors: FieldDescriptor[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const d of descriptors) {
    if (d.defaultValue !== undefined) {
      out[d.name] = d.defaultValue;
    }
  }
  return out;
}
