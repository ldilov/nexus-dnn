import type { ExtensionDto } from "../api/generated/ExtensionDto";

export interface Groupable {
  readonly id: string;
  readonly extension_id?: string | null;
}

export interface ExtensionSummary {
  id: string;
  name: string;
  version: string;
  source?: string;
}

export interface CatalogGroup<T extends Groupable> {
  key: string;
  kind: "extension" | "user";
  label: string;
  version: string | null;
  extension?: ExtensionSummary;
  items: T[];
}

/**
 * Record-level annotation returned alongside items that reference an
 * extension no longer present in the registry. Rendered as a "missing
 * source: <id>" badge on the card.
 */
export interface OrphanAnnotation {
  readonly missingExtensionId: string;
}

export type WithOrphan<T> = T & { readonly __orphan?: OrphanAnnotation };

export function orphanOf<T>(item: WithOrphan<T>): OrphanAnnotation | null {
  return item.__orphan ?? null;
}

const USER_GROUP_KEY = "__user__";

function extensionLabel(ext: ExtensionDto): string {
  return ext.name && ext.name.trim().length > 0 ? ext.name : ext.id;
}

export function extensionSummaryFor(ext: ExtensionDto): ExtensionSummary {
  return {
    id: ext.id,
    name: extensionLabel(ext),
    version: ext.version,
    source: ext.source,
  };
}

/** Extensions are active and contribute content to catalogs. */
export function isExtensionActive(ext: ExtensionDto): boolean {
  return ext.status === "active";
}

/**
 * Filters catalog items by the current enablement state of their contributing
 * extension. Items from disabled extensions are hidden unless the item is
 * user-edited (in which case it survives as a User Workflow with a missing-
 * source badge).
 */
export interface EnablementFilterable {
  readonly id: string;
  readonly extension_id?: string | null;
  readonly user_edited_at?: string | null;
}

export function filterByExtensionEnablement<T extends EnablementFilterable>(
  items: ReadonlyArray<T>,
  extensions: ReadonlyArray<ExtensionDto>,
  opts: { keepUserEditedFromDisabled: boolean },
): T[] {
  const activeIds = new Set(extensions.filter(isExtensionActive).map((e) => e.id));
  const knownIds = new Set(extensions.map((e) => e.id));
  return items.filter((item) => {
    const extId = item.extension_id ?? null;
    if (extId === null) return true;
    if (activeIds.has(extId)) return true;
    if (!knownIds.has(extId)) return true; // orphan → handled by User bucket
    // Extension is known-but-disabled.
    if (opts.keepUserEditedFromDisabled && item.user_edited_at) return true;
    return false;
  });
}

export function groupByExtension<T extends Groupable>(
  items: ReadonlyArray<T>,
  extensions: ReadonlyArray<ExtensionDto>,
): CatalogGroup<WithOrphan<T>>[] {
  const extById = new Map(extensions.map((e) => [e.id, e] as const));
  const groups = new Map<string, CatalogGroup<WithOrphan<T>>>();

  for (const item of items) {
    const extId = item.extension_id ?? null;

    // Unknown / missing extension_id → User Workflows bucket. Orphan rows
    // (extension_id set but extension no longer installed) also land here,
    // annotated so the card can show a "missing source: X" badge.
    if (extId === null || !extById.has(extId)) {
      const annotated: WithOrphan<T> =
        extId === null ? item : { ...item, __orphan: { missingExtensionId: extId } };
      const bucket = groups.get(USER_GROUP_KEY) ?? {
        key: USER_GROUP_KEY,
        kind: "user" as const,
        label: "User Workflows",
        version: null,
        items: [] as WithOrphan<T>[],
      };
      bucket.items = [...bucket.items, annotated];
      groups.set(USER_GROUP_KEY, bucket);
      continue;
    }

    const known = extById.get(extId);
    const summary: ExtensionSummary = known
      ? extensionSummaryFor(known)
      : { id: extId, name: extId, version: "unknown" };
    const bucket = groups.get(extId) ?? {
      key: extId,
      kind: "extension" as const,
      label: summary.name,
      version: summary.version,
      extension: summary,
      items: [] as WithOrphan<T>[],
    };
    bucket.items = [...bucket.items, item as WithOrphan<T>];
    groups.set(extId, bucket);
  }

  const ordered = extensions
    .map((e) => groups.get(e.id))
    .filter((g): g is CatalogGroup<WithOrphan<T>> => g !== undefined);
  const userBucket = groups.get(USER_GROUP_KEY);
  return [...ordered, ...(userBucket ? [userBucket] : [])];
}
