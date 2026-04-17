import { type CSSProperties } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as styles from "./sidebar.css";

type UtilityItemId = "settings" | "help";

type NavItem = {
  readonly path: string;
  readonly label: string;
  readonly icon: string;
  // Match rule for the active state. "exact" = only when pathname === path,
  // "prefix" = when pathname starts with path. Defaults to "prefix".
  readonly match?: "exact" | "prefix";
};

type UtilityItem = {
  readonly id: UtilityItemId;
  readonly label: string;
  readonly icon: string;
};

const CORE_NAV_ITEMS: readonly NavItem[] = [
  { path: "/", label: "Home", icon: "home", match: "exact" },
  { path: "/modules", label: "Modules", icon: "apps" },
  // scan-terminology: allow — canonical sidebar label per FR-T02 glossary
  { path: "/deployments", label: "Deployments", icon: "rocket_launch" },
  // Backends + Models are host-level surfaces (spec 017 host-managed model
  // store + backend registry). They used to be declared inside each
  // extension's layout as drawers; now they live once, here, in the
  // shell so every extension shares them.
  { path: "/backends", label: "Backends", icon: "developer_board" },
  { path: "/models", label: "Models", icon: "model_training" },
  { path: "/runs", label: "Runs", icon: "play_arrow" },
  { path: "/artifacts", label: "Artifacts", icon: "inventory_2" },
  { path: "/extensions", label: "Extensions", icon: "extension", match: "exact" },
];

const UTILITY_ITEMS: readonly UtilityItem[] = [
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "help", label: "Help", icon: "help" },
];

const FILLED_ICON_STYLE: CSSProperties = {
  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

type ExtensionNavItem = {
  readonly layoutId: string;
  readonly label: string;
  readonly icon: string;
};

type SidebarProps = {
  pinned: boolean;
  onTogglePin: () => void;
  onUtility?: (id: UtilityItemId) => void;
  extensionNavItems?: readonly ExtensionNavItem[];
};

function isItemActive(pathname: string, item: NavItem): boolean {
  if (item.match === "exact") return pathname === item.path;
  if (item.path === "/") return pathname === "/";
  return pathname === item.path || pathname.startsWith(`${item.path}/`);
}

export function Sidebar({
  pinned,
  onTogglePin,
  onUtility,
  extensionNavItems = [],
}: SidebarProps) {
  const { pathname } = useLocation();
  const expanded = pinned;

  const containerCls = [styles.container, expanded ? styles.containerExpanded : ""]
    .filter(Boolean)
    .join(" ");

  const labelCls = [
    styles.navItemLabel,
    expanded ? styles.navItemLabelVisible : "",
  ]
    .filter(Boolean)
    .join(" ");

  const headerCls = [styles.header, expanded ? styles.headerExpanded : ""]
    .filter(Boolean)
    .join(" ");

  const pinCls = [
    styles.pinButton,
    pinned ? styles.pinButtonActive : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderNavItem = (item: NavItem) => {
    const active = isItemActive(pathname, item);
    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={styles.navItemRecipe({ active })}
        title={item.label}
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={`material-symbols-outlined ${styles.navItemIcon}`}
          style={active ? FILLED_ICON_STYLE : undefined}
        >
          {item.icon}
        </span>
        <span className={labelCls}>{item.label}</span>
      </NavLink>
    );
  };

  const extensionItems: readonly NavItem[] = extensionNavItems.map((ext) => ({
    path: `/extensions/${encodeURIComponent(ext.layoutId)}`,
    label: ext.label,
    icon: ext.icon,
    match: "prefix" as const,
  }));

  // Home first, then extensions, then the rest of the core nav (preserves
  // the historical ordering before the refactor).
  const orderedNav: readonly NavItem[] = [
    CORE_NAV_ITEMS[0]!,
    ...extensionItems,
    ...CORE_NAV_ITEMS.slice(1),
  ];

  return (
    <div className={containerCls}>
      <div className={headerCls}>
        <button
          className={pinCls}
          onClick={onTogglePin}
          aria-label={pinned ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={pinned}
          title={pinned ? "Collapse sidebar" : "Expand sidebar"}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
            {pinned ? "menu_open" : "menu"}
          </span>
        </button>
      </div>
      <div className={styles.navSection}>{orderedNav.map(renderNavItem)}</div>
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
    </div>
  );
}
