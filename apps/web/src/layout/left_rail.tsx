import { useState } from "react";
import { ToolCatalog } from "../catalog/tool_catalog";
import { RecipeCatalog } from "../catalog/recipe_catalog";
import { ExtensionList } from "../catalog/extension_list";
import * as styles from "./left_rail.css";

type TabId = "tools" | "recipes" | "extensions";

const TABS: { id: TabId; label: string }[] = [
  { id: "tools", label: "Tools" },
  { id: "recipes", label: "Recipes" },
  { id: "extensions", label: "Extensions" },
];

const TAB_CONTENT: Record<TabId, React.ComponentType> = {
  tools: ToolCatalog,
  recipes: RecipeCatalog,
  extensions: ExtensionList,
};

export function LeftRail() {
  const [activeTab, setActiveTab] = useState<TabId>("tools");
  const ActiveContent = TAB_CONTENT[activeTab];

  return (
    <div className={styles.container}>
      <div className={styles.tabStrip}>
        {TABS.map((t) => {
          const cls =
            t.id === activeTab
              ? `${styles.tab} ${styles.tabActive}`
              : styles.tab;
          return (
            <button key={t.id} className={cls} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          );
        })}
      </div>
      <div className={styles.content}>
        <ActiveContent />
      </div>
    </div>
  );
}
