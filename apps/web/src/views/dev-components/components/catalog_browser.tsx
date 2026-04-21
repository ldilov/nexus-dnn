import { useMemo, useState, type ChangeEvent } from "react";
import type {
  ComponentCategory,
  ComponentMetadata,
} from "../../../services/ui_catalog";
import * as styles from "./catalog_browser.css";

export interface CatalogBrowserProps {
  components: ComponentMetadata[];
  selectedName: string | null;
  onSelect: (name: string) => void;
}

const CATEGORY_ORDER: ComponentCategory[] = [
  "layout",
  "data",
  "input",
  "display",
  "feedback",
  "shell",
  "domain",
];

export function CatalogBrowser({
  components,
  selectedName,
  onSelect,
}: CatalogBrowserProps) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? components.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.display_name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q),
        )
      : components;
    const byCat = new Map<ComponentCategory, ComponentMetadata[]>();
    for (const c of filtered) {
      const bucket = byCat.get(c.category) ?? [];
      bucket.push(c);
      byCat.set(c.category, bucket);
    }
    for (const bucket of byCat.values()) {
      bucket.sort((a, b) => a.display_name.localeCompare(b.display_name));
    }
    return byCat;
  }, [components, query]);

  return (
    <aside className={styles.root}>
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Filter components…"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          aria-label="Filter catalog"
        />
        <span className={styles.countBadge}>
          {Array.from(grouped.values()).reduce((s, b) => s + b.length, 0)} / {components.length}
        </span>
      </div>
      <div className={styles.categories}>
        {CATEGORY_ORDER.map((cat) => {
          const bucket = grouped.get(cat);
          if (!bucket || bucket.length === 0) return null;
          return (
            <section key={cat} className={styles.categoryBlock}>
              <h3 className={styles.categoryTitle}>{cat}</h3>
              <ul className={styles.list}>
                {bucket.map((c) => (
                  <li key={c.name}>
                    <button
                      type="button"
                      className={
                        selectedName === c.name
                          ? styles.itemSelected
                          : styles.item
                      }
                      onClick={() => onSelect(c.name)}
                      data-component-name={c.name}
                    >
                      <span className={styles.itemName}>{c.display_name}</span>
                      <span className={styles.itemTag}>{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </aside>
  );
}
