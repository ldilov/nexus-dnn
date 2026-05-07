import type { KeyboardEvent, ReactNode } from "react";
import type { BlockMnemonic } from "./block";
import {
  blockHeader,
  blockHeaderLeft,
  blockHeaderRight,
  blockMnemonicChip,
  blockPromptButton,
  blockToggle,
} from "./block.css";

export interface BlockHeaderProps {
  promptHeader: string;
  mnemonic: BlockMnemonic;
  collapsed: boolean;
  onCopy: () => void;
  onToggleCollapse: () => void;
  rightSlot?: ReactNode;
}

export function BlockHeader({
  promptHeader,
  mnemonic,
  collapsed,
  onCopy,
  onToggleCollapse,
  rightSlot,
}: BlockHeaderProps) {
  function handleToggleKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggleCollapse();
    }
  }

  return (
    <div className={blockHeader}>
      <div className={blockHeaderLeft}>
        <button
          type="button"
          className={blockPromptButton}
          onClick={onCopy}
          aria-label={`Copy command: ${promptHeader}`}
          title="Click to copy"
        >
          {promptHeader}
        </button>
        <span className={blockMnemonicChip} aria-label={`Mnemonic ${mnemonic}`}>
          {mnemonic}
        </span>
      </div>
      <div className={blockHeaderRight}>
        {rightSlot}
        <button
          type="button"
          className={blockToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand block" : "Collapse block"}
          onClick={onToggleCollapse}
          onKeyDown={handleToggleKey}
        >
          {collapsed ? "+" : "−"}
        </button>
      </div>
    </div>
  );
}
