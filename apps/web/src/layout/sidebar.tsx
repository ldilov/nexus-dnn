import { useState, type ReactNode, type CSSProperties } from "react";
import * as styles from "./sidebar.css";

export type NavItemId =
  | "home"
  | "recipes"
  | "workflows"
  | "runs"
  | "artifacts"
  | "extensions"
  | `ext:${string}`;

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

const CORE_NAV_ITEMS: readonly NavItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "recipes", label: "Recipes", icon: "description" },
  { id: "workflows", label: "Workflows", icon: "account_tree" },
  { id: "runs", label: "Runs", icon: "play_arrow" },
  { id: "artifacts", label: "Artifacts", icon: "inventory_2" },
  { id: "extensions", label: "Extensions", icon: "extension" },
];

const UTILITY_ITEMS: readonly UtilityItem[] = [
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "help", label: "Help", icon: "help" },
];

const FILLED_ICON_STYLE: CSSProperties = {
  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

type ExtensionNavItem = {
  readonly id: NavItemId;
  readonly label: string;
  readonly icon: string;
};

type SidebarProps = {
  activeItem: NavItemId;
  onNavigate: (id: NavItemId) => void;
  pinned: boolean;
  onTogglePin: () => void;
  secondaryContent?: ReactNode;
  onUtility?: (id: UtilityItemId) => void;
  extensionNavItems?: readonly ExtensionNavItem[];
};

export function Sidebar({
  activeItem,
  onNavigate,
  pinned,
  onTogglePin,
  secondaryContent,
  onUtility,
  extensionNavItems = [],
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
        <span
          className="material-symbols-outlined"
          style={pinned ? FILLED_ICON_STYLE : undefined}
        >
          push_pin
        </span>
      </button>
      <div className={styles.navSection}>
        {[...CORE_NAV_ITEMS.slice(0, 1), ...extensionNavItems, ...CORE_NAV_ITEMS.slice(1)].map((item) => {
          const isActive = item.id === activeItem;
          return (
            <button
              key={item.id}
              className={styles.navItemRecipe({ active: isActive })}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`material-symbols-outlined ${styles.navItemIcon}`}
                style={isActive ? FILLED_ICON_STYLE : undefined}
              >
                {item.icon}
              </span>
              <span className={labelCls}>{item.label}</span>
            </button>
          );
        })}
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
            <span className={`material-symbols-outlined ${styles.navItemIcon}`}>
              {item.icon}
            </span>
            <span className={labelCls}>{item.label}</span>
          </button>
        ))}
      </div>
      <div className={secondaryCls}>{secondaryContent}</div>
    </div>
  );
}
