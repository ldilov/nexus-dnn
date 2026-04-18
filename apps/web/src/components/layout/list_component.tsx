import { useState, type ReactNode } from "react";
import * as styles from "./layout_styles.css";

type ListItem = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
};

type ListComponentProps = {
  items?: ListItem[];
  itemType?: string;
  emptyMessage?: string;
  selectable?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
  children?: ReactNode;
};

export function ListComponent({
  items = [],
  emptyMessage = "No items",
  selectable = false,
  selectedId: controlledSelectedId,
  onSelect,
  children,
}: ListComponentProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const selectedId = controlledSelectedId ?? internalSelectedId;

  const handleSelect = (id: string) => {
    if (!selectable) return;
    setInternalSelectedId(id);
    onSelect?.(id);
  };

  if (items.length === 0) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.listItemEmpty}>{emptyMessage}</div>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {items.map((item) => {
        const isSelected = selectable && selectedId === item.id;
        const cls = isSelected
          ? `${styles.listItem} ${styles.listItemSelected}`
          : styles.listItem;
        return (
          <div
            key={item.id}
            className={cls}
            onClick={() => handleSelect(item.id)}
            role={selectable ? "option" : undefined}
            aria-selected={selectable ? isSelected : undefined}
          >
            <div>
              <div>{item.label}</div>
              {item.description && (
                <div className={styles.descSmall}>{item.description}</div>
              )}
            </div>
          </div>
        );
      })}
      {children}
    </div>
  );
}
