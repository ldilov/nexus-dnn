import * as styles from "./tabs.css";

type TabItem<T extends string> = {
  id: T;
  label: string;
  badge?: number;
};

type TabsProps<T extends string> = {
  items: readonly TabItem<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  variant?: "underline" | "segmented";
  className?: string;
};

export function Tabs<T extends string>({
  items,
  activeId,
  onSelect,
  variant = "underline",
  className,
}: TabsProps<T>) {
  const containerCls = variant === "segmented"
    ? [styles.segmentedContainer, className].filter(Boolean).join(" ")
    : [styles.tabList, className].filter(Boolean).join(" ");

  return (
    <div className={containerCls} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={item.id === activeId}
          className={styles.tabRecipe({
            variant,
            active: item.id === activeId,
          })}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
          {item.badge !== undefined && item.badge > 0 && (
            <span className={styles.tabBadge}>{item.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}
