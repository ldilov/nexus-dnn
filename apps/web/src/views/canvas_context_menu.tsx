import * as styles from "./canvas_context_menu.css";

export type ContextMenuItem = {
  label: string;
  shortcut?: string;
  onClick: () => void;
  separatorBefore?: boolean;
};

export type CanvasContextMenuProps = {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
};

export function CanvasContextMenu({ x, y, items, onClose }: CanvasContextMenuProps) {
  return (
    <div
      className={styles.menu}
      style={{ top: `${y}px`, left: `${x}px` }}
      onMouseLeave={onClose}
    >
      {items.map((it, i) => (
        <div key={i}>
          {it.separatorBefore && <div className={styles.separator} />}
          <div
            className={styles.item}
            onClick={() => {
              it.onClick();
              onClose();
            }}
          >
            <span>{it.label}</span>
            {it.shortcut && <span className={styles.shortcut}>{it.shortcut}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
