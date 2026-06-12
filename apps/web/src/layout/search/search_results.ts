import type { DeploymentSummary, LayoutSummary } from "../../services/api_client";

export type SearchKind = "deployment" | "extension";

export interface SearchItem {
  readonly id: string;
  readonly kind: SearchKind;
  readonly label: string;
  readonly sublabel?: string;
  readonly state?: string;
  readonly icon: string;
  readonly to: string;
}

export interface SearchGroup {
  readonly kind: SearchKind;
  readonly title: string;
  readonly items: ReadonlyArray<SearchItem>;
}

const GROUP_TITLES: Record<SearchKind, string> = {
  deployment: "Deployments",
  extension: "Extensions",
};

const GROUP_ORDER: ReadonlyArray<SearchKind> = ["deployment", "extension"];

/** Flatten the two host-owned result sources into one searchable list. Pure —
 *  no fetching, no routing side effects, so it unit-tests in isolation. */
export function buildSearchItems(
  deployments: ReadonlyArray<DeploymentSummary>,
  extensions: ReadonlyArray<LayoutSummary>,
): SearchItem[] {
  const fromDeployments: SearchItem[] = deployments
    .filter((d) => !d.is_archived)
    .map((d) => ({
      id: `deployment:${d.id}`,
      kind: "deployment" as const,
      label: d.display_name || d.slug,
      sublabel: d.slug,
      state: d.state,
      icon: "rocket_launch",
      to: `/deployments/${encodeURIComponent(d.id)}`,
    }));

  const fromExtensions: SearchItem[] = extensions.map((l) => ({
    id: `extension:${l.id}`,
    kind: "extension" as const,
    label: l.display_name || l.id,
    sublabel: l.extension_id,
    icon: "extension",
    to: `/extensions/${encodeURIComponent(l.id)}`,
  }));

  return [...fromDeployments, ...fromExtensions];
}

function scoreItem(item: SearchItem, query: string): number {
  const label = item.label.toLowerCase();
  const sub = item.sublabel?.toLowerCase() ?? "";
  if (label === query) return 100;
  if (label.startsWith(query)) return 80;
  if (label.includes(query)) return 60;
  if (sub.startsWith(query)) return 45;
  if (sub.includes(query)) return 40;
  return -1;
}

/** Filter + rank a flat item list against a query. Empty query returns the
 *  full list unchanged (stable source order) so the palette opens populated. */
export function filterSearchItems(
  items: ReadonlyArray<SearchItem>,
  rawQuery: string,
): SearchItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [...items];

  return items
    .map((item) => ({ item, score: scoreItem(item, query) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) =>
      b.score - a.score || a.item.label.localeCompare(b.item.label),
    )
    .map(({ item }) => item);
}

/** Group a ranked flat list back into ordered sections for rendering, dropping
 *  empty groups. Group order is fixed; within a group, ranked order is kept. */
export function groupSearchItems(
  items: ReadonlyArray<SearchItem>,
): SearchGroup[] {
  return GROUP_ORDER.map((kind) => ({
    kind,
    title: GROUP_TITLES[kind],
    items: items.filter((item) => item.kind === kind),
  })).filter((group) => group.items.length > 0);
}
