import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetchTools, type Tool } from "../api/client";
import { Input } from "../components/base/input";
import { Skeleton } from "../components/base/skeleton";
import * as styles from "./catalog.css";

const EMPTY_TOOLS: Tool[] = [];

function groupByCategory(tools: Tool[]): Record<string, Tool[]> {
  const groups: Record<string, Tool[]> = {};
  for (const tool of tools) {
    const cat = tool.category || "uncategorized";
    (groups[cat] ??= []).push(tool);
  }
  return groups;
}

export function ToolCatalog() {
  const { data: tools = EMPTY_TOOLS, error: swrError, isLoading } = useSWR<Tool[]>(
    "tools",
    () => fetchTools(),
  );
  const error = swrError
    ? swrError instanceof Error
      ? swrError.message
      : "Failed to load tools"
    : null;
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? tools.filter((t) => t.display_name.toLowerCase().includes(q)) : tools;
  }, [tools, search]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  if (error) return <p className={styles.errorState}>{error}</p>;

  return (
    <div>
      <div className={styles.searchWrapper}>
        <Input placeholder="Search tools..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {isLoading && tools.length === 0
        ? Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={styles.itemCard}>
              {/* audit-allow: px — skeleton row line heights. */}
              <Skeleton height="16px" width="40%" radius="text" />
              <Skeleton height="12px" width="70%" radius="text" style={{ marginTop: "0.5em" }} />
            </div>
          ))
        : null}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className={styles.groupLabel}>{category}</div>
          {items.map((tool) => (
            <div key={tool.id} className={styles.itemCard}>
              <div className={styles.itemName}>{tool.display_name}</div>
              <div className={styles.itemMeta}>
                {tool.kind} · {tool.category}
                {tool.description ? ` — ${tool.description}` : ""}
              </div>
            </div>
          ))}
        </div>
      ))}
      {filtered.length === 0 && !isLoading && (
        <p className={styles.emptyState}>No tools found</p>
      )}
    </div>
  );
}
