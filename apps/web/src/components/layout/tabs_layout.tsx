import { useState, type ReactNode } from "react";
import { Tabs } from "../tabs";

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
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {items.length > 0 && (
        <Tabs items={items} activeId={activeId} onSelect={setActiveId} variant="underline" />
      )}
      <div style={{ flex: 1, overflow: "auto" }}>
        {children[activeIndex] ?? null}
      </div>
    </div>
  );
}
