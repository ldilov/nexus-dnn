import { useState, type ReactNode } from "react";
import { Tabs } from "../tabs";
import * as styles from "./layout_styles.css";

type TabConfig = {
  label: string;
  icon?: string;
};

type TabsLayoutProps = {
  tabs?: TabConfig[];
  children: ReactNode[];
};

export function TabsLayout({ tabs = [], children }: TabsLayoutProps) {
  const items = tabs.map((tab, i) => ({
    id: String(i),
    label: tab.label,
  }));

  const [activeId, setActiveId] = useState(items[0]?.id ?? "0");
  const activeIndex = Number(activeId);

  return (
    <div className={styles.scrollColumn}>
      {items.length > 0 && (
        <Tabs items={items} activeId={activeId} onSelect={setActiveId} variant="underline" />
      )}
      <div className={styles.scrollBody}>
        {children[activeIndex] ?? null}
      </div>
    </div>
  );
}
