import { useEffect, useMemo, useState } from "react";
import { fetchTools, type Tool } from "../api/client";
import { Input } from "../components/input";
import * as styles from "./catalog.css";

function groupByCategory(tools: Tool[]): Record<string, Tool[]> {
  const groups: Record<string, Tool[]> = {};
  for (const tool of tools) {
    const cat = tool.category || "uncategorized";
    (groups[cat] ??= []).push(tool);
  }
  return groups;
}

export function ToolCatalog() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTools()
      .then(setTools)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load tools"),
      );
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? tools.filter((t) => t.name.toLowerCase().includes(q)) : tools;
  }, [tools, search]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  if (error) return <p className={styles.errorState}>{error}</p>;

  return (
    <div>
      <div className={styles.searchWrapper}>
        <Input placeholder="Search tools..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className={styles.groupLabel}>{category}</div>
          {items.map((tool) => (
            <div key={tool.id} className={styles.itemCard}>
              <div className={styles.itemName}>{tool.name}</div>
              <div className={styles.itemMeta}>
                {tool.input_types.join(", ")} &rarr; {tool.output_types.join(", ")}
              </div>
            </div>
          ))}
        </div>
      ))}
      {filtered.length === 0 && <p className={styles.emptyState}>No tools found</p>}
    </div>
  );
}
