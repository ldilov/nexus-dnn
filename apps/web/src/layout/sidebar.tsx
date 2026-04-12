import { useState, type ReactNode } from "react";
import * as styles from "./sidebar.css";

export type NavItemId =
  | "home"
  | "recipes"
  | "workflows"
  | "runs"
  | "artifacts"
  | "extensions"
  | "models";

type UtilityItemId = "settings" | "help";

type NavItem = {
  readonly id: NavItemId;
  readonly label: string;
  readonly icon: string;
};

type UtilityItem = {
  readonly id: UtilityItemId;
  readonly label: string;
  readonly icon: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", label: "Home", icon: "\u2302" },
  { id: "recipes", label: "Recipes", icon: "\u2630" },
  { id: "workflows", label: "Workflows", icon: "\u2387" },
  { id: "runs", label: "Runs", icon: "\u25B6" },
  { id: "artifacts", label: "Artifacts", icon: "\u25A3" },
  { id: "extensions", label: "Extensions", icon: "\u29C9" },
  { id: "models", label: "Models", icon: "\u2338" },
];

const UTILITY_ITEMS: readonly UtilityItem[] = [
  { id: "settings", label: "Settings", icon: "\u2699" },
  { id: "help", label: "Help", icon: "?" },
];

type SidebarProps = {
  activeItem: NavItemId;
  onNavigate: (id: NavItemId) => void;
  pinned: boolean;
  onTogglePin: () => void;
  secondaryContent?: ReactNode;
  onUtility?: (id: UtilityItemId) => void;
};

export function Sidebar({
  activeItem,
  onNavigate,
  pinned,
  onTogglePin,
  secondaryContent,
  onUtility,
}: SidebarProps) {
  const [hovered, setHovered] = useState(false);
  const expanded = hovered || pinned;

  const containerCls = [
    styles.container,
    expanded ? styles.containerExpanded : "",
    hovered && !pinned ? styles.containerHoveredOverlay : "",
  ]
    .filter(Boolean)
    .join(" ");

  const labelCls = [
    styles.navItemLabel,
    expanded ? styles.navItemLabelVisible : "",
  ]
    .filter(Boolean)
    .join(" ");

  const pinCls = [
    styles.pinButton,
    expanded ? styles.pinButtonVisible : "",
    pinned ? styles.pinButtonActive : "",
  ]
    .filter(Boolean)
    .join(" ");

  const secondaryCls = [
    styles.secondaryContent,
    pinned && secondaryContent ? styles.secondaryContentVisible : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={containerCls}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className={pinCls}
        onClick={onTogglePin}
        aria-label={pinned ? "Unpin sidebar" : "Pin sidebar"}
        title={pinned ? "Unpin sidebar" : "Pin sidebar"}
      >
        {"\u{1F4CC}"}
      </button>
      <div className={styles.navSection}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.navItemRecipe({ active: item.id === activeItem })}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            aria-label={item.label}
            aria-current={item.id === activeItem ? "page" : undefined}
          >
            <span className={styles.navItemIcon}>{item.icon}</span>
            <span className={labelCls}>{item.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.utilitySection}>
        {UTILITY_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.navItemRecipe({ active: false })}
            onClick={() => onUtility?.(item.id)}
            title={item.label}
            aria-label={item.label}
          >
            <span className={styles.navItemIcon}>{item.icon}</span>
            <span className={labelCls}>{item.label}</span>
          </button>
        ))}
      </div>
      <div className={secondaryCls}>{secondaryContent}</div>
    </div>
  );
}
