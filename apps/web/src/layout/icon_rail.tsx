import * as styles from "./icon_rail.css";

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
  id: NavItemId;
  label: string;
  icon: string;
};

type UtilityItem = {
  id: UtilityItemId;
  label: string;
  icon: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", label: "Home", icon: "\u2302" },
  { id: "recipes", label: "Recipes", icon: "\u2630" },
  { id: "workflows", label: "Workflows", icon: "\u2387" },
  { id: "runs", label: "Runs", icon: "\u25B6" },
  { id: "artifacts", label: "Artifacts", icon: "\u25A3" },
  { id: "extensions", label: "Extensions", icon: "\u29C9" },
  { id: "models", label: "Models", icon: "\u2338" },
] as const;

const UTILITY_ITEMS: readonly UtilityItem[] = [
  { id: "settings", label: "Settings", icon: "\u2699" },
  { id: "help", label: "Help", icon: "?" },
] as const;

type IconRailProps = {
  activeItem: NavItemId;
  onNavigate: (id: NavItemId) => void;
  onUtility?: (id: UtilityItemId) => void;
};

export function IconRail({ activeItem, onNavigate, onUtility }: IconRailProps) {
  return (
    <div className={styles.container}>
      <div className={styles.topGroup}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.railItemRecipe({ active: item.id === activeItem })}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            aria-label={item.label}
            aria-current={item.id === activeItem ? "page" : undefined}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.bottomGroup}>
        {UTILITY_ITEMS.map((item) => (
          <button
            key={item.id}
            className={styles.railItemRecipe({ active: false })}
            onClick={() => onUtility?.(item.id)}
            title={item.label}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
