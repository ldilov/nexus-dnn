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
