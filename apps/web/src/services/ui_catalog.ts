export type ComponentCategory =
  | "layout"
  | "data"
  | "input"
  | "display"
  | "feedback"
  | "shell"
  | "domain";

export interface PropsSchema {
  version: "2020-12";
  schema: Record<string, unknown>;
}

export interface ComponentExample {
  title: string;
  yaml: string;
  tag: string | null;
}

export interface ComponentMetadata {
  name: string;
  display_name: string;
  category: ComponentCategory;
  description: string;
  props_schema: PropsSchema;
  examples: ComponentExample[];
  docs_href: string | null;
}

export interface CatalogEnvelope {
  schema_version: "1";
  components: ComponentMetadata[];
}

export interface ExtensionComponentSummary {
  extension_id: string;
  tag: string;
  asset_href: string;
  entry: string;
}

export interface ExtensionComponentsEnvelope {
  schema_version: "1";
  components: ExtensionComponentSummary[];
}

export const CATALOG_SCHEMA_VERSION = "1" as const;
export const PROPS_SCHEMA_DRAFT = "2020-12" as const;

const CATALOG_ENDPOINT = "/api/v1/ui/components";

export async function fetchCatalog(
  options?: { signal?: AbortSignal },
): Promise<CatalogEnvelope> {
  const res = await fetch(CATALOG_ENDPOINT, {
    headers: { accept: "application/json" },
    signal: options?.signal,
  });
  if (!res.ok) {
    throw new Response(`catalog endpoint returned ${res.status}`, {
      status: res.status,
      statusText: res.statusText,
    });
  }
  const envelope = (await res.json()) as CatalogEnvelope;
  if (envelope.schema_version !== CATALOG_SCHEMA_VERSION) {
    throw new Response(
      `unsupported catalog schema_version: ${envelope.schema_version}`,
      { status: 500 },
    );
  }
  return envelope;
}
