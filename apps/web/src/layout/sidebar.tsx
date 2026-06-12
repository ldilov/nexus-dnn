import { type CSSProperties } from "react";
import { NavLink, useLocation } from "react-router";
import { BrandMark } from "./brand_mark";
import * as styles from "./sidebar.css";

type UtilityItemId = "settings" | "help";

type NavItem = {
  readonly path: string;
  readonly label: string;
  readonly icon: string;
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
  { path: "/deployments", label: "Deployments", icon: "rocket_launch" },
  { path: "/backends", label: "Backends", icon: "developer_board" },
  { path: "/models", label: "Models", icon: "model_training" },
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

export type SidebarVariant = "expanded" | "rail" | "float";

type SidebarProps = {
  variant?: SidebarVariant;
  pinned?: boolean;
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
  variant,
  pinned,
  onTogglePin,
  onUtility,
  extensionNavItems = [],
}: SidebarProps) {
  const { pathname } = useLocation();
  const resolvedVariant: SidebarVariant = variant ?? (pinned ? "expanded" : "rail");
  const expanded = resolvedVariant === "expanded" || resolvedVariant === "float";

  const containerCls = [
    styles.container,
    expanded ? styles.containerExpanded : "",
    resolvedVariant === "float" ? styles.containerFloat : "",
  ]
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
    expanded ? styles.pinButtonActive : "",
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

  const orderedNav: readonly NavItem[] = [
    CORE_NAV_ITEMS[0]!,
    ...extensionItems,
    ...CORE_NAV_ITEMS.slice(1),
  ];

  return (
    <div className={containerCls}>
      <div className={headerCls}>
        {expanded && (
          <span className={styles.brandSlot}>
            <BrandMark wordmark size={22} />
          </span>
        )}
        <button
          className={pinCls}
          onClick={onTogglePin}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <span className={`material-symbols-outlined ${styles.iconXl}`}>
            {expanded ? "menu_open" : "menu"}
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
