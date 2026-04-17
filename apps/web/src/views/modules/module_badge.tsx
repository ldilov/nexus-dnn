import type { ModuleIcon as ModuleIconDto } from "../../api/client";
import { ModuleIcon } from "../../components/module_icon";
import { chip } from "./module_badge.css";

interface ModuleBadgeProps {
  moduleId: string;
  displayName: string;
  icon: ModuleIconDto;
  onOpen?: (moduleId: string) => void;
}

export function ModuleBadge({
  moduleId,
  displayName,
  icon,
  onOpen,
}: ModuleBadgeProps) {
  return (
    <button
      type="button"
      className={chip}
      onClick={() => onOpen?.(moduleId)}
      aria-label={`Open module ${displayName}`}
      title={moduleId}
    >
      <ModuleIcon icon={icon} size={16} />
      <span>{displayName}</span>
    </button>
  );
}
