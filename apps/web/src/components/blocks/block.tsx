import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { BlockHeader } from "./block_header";
import {
  block,
  blockBody,
  blockContainer,
  blockFocused,
  blockSparkline,
  blockSparklinePath,
  blockSummary,
  blockSummaryMetric,
} from "./block.css";

export type BlockMnemonic = string & { readonly __brand: unique symbol };

const MNEMONIC_PATTERN = /^[A-Z]{4}$/;

export function blockMnemonic(value: string): BlockMnemonic {
  if (!MNEMONIC_PATTERN.test(value)) {
    throw new Error(
      `Invalid block mnemonic "${value}": must be exactly 4 uppercase ASCII letters [A-Z]`,
    );
  }
  return value as BlockMnemonic;
}

export interface BlockPrimaryMetric {
  name: string;
  value?: number | string;
  unit?: string;
  sparkline?: number[];
}

export interface BlockProps {
  id: string;
  mnemonic: BlockMnemonic;
  promptHeader: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onToggleCollapse?: (next: boolean) => void;
  pinned?: boolean;
  primaryMetric?: BlockPrimaryMetric;
  focused?: boolean;
  children: ReactNode;
}

const SPARKLINE_VIEW_WIDTH = 80;
const SPARKLINE_VIEW_HEIGHT = 4;

function buildSparklinePath(samples: number[]): string {
  if (samples.length === 0) return "";
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const range = max - min || 1;
  const stepX = SPARKLINE_VIEW_WIDTH / Math.max(samples.length - 1, 1);
  return samples
    .map((sample, index) => {
      const x = index * stepX;
      const normalized = (sample - min) / range;
      const y = SPARKLINE_VIEW_HEIGHT - normalized * SPARKLINE_VIEW_HEIGHT;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatMetric(metric: BlockPrimaryMetric | undefined): string {
  if (!metric || metric.value === undefined) return "";
  const unit = metric.unit ? ` ${metric.unit}` : "";
  return `${metric.value}${unit}`;
}

export function Block(props: BlockProps) {
  const {
    id,
    mnemonic,
    promptHeader,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onToggleCollapse,
    pinned = false,
    primaryMetric,
    focused = false,
    children,
  } = props;

  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = collapsedProp !== undefined;
  const collapsed = isControlled ? collapsedProp : internalCollapsed;

  const handleToggle = useCallback(() => {
    const next = !collapsed;
    if (!isControlled) setInternalCollapsed(next);
    onToggleCollapse?.(next);
  }, [collapsed, isControlled, onToggleCollapse]);

  const handleCopy = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    void navigator.clipboard.writeText(promptHeader).catch(() => undefined);
  }, [promptHeader]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement | null;
      if (target && target !== event.currentTarget) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

  const sparklinePath = useMemo(
    () =>
      primaryMetric?.sparkline && primaryMetric.sparkline.length > 1
        ? buildSparklinePath(primaryMetric.sparkline)
        : null,
    [primaryMetric],
  );

  const containerClass = focused
    ? `${blockContainer} ${blockFocused}`
    : blockContainer;

  return (
    <div
      id={id}
      className={containerClass}
      data-block-id={id}
      data-block-mnemonic={mnemonic}
      data-pinned={pinned ? "true" : undefined}
      data-collapsed={collapsed ? "true" : undefined}
      data-focused={focused ? "true" : undefined}
      tabIndex={0}
      role="region"
      aria-label={promptHeader}
      onKeyDown={handleKeyDown}
    >
      <div className={block}>
        <BlockHeader
          promptHeader={promptHeader}
          mnemonic={mnemonic}
          collapsed={collapsed}
          onCopy={handleCopy}
          onToggleCollapse={handleToggle}
        />
        {collapsed ? (
          <div className={blockSummary}>
            <span>{promptHeader}</span>
            {primaryMetric ? (
              <span className={blockSummaryMetric}>
                — {formatMetric(primaryMetric)}
              </span>
            ) : null}
            {sparklinePath ? (
              <svg
                className={blockSparkline}
                viewBox={`0 0 ${SPARKLINE_VIEW_WIDTH} ${SPARKLINE_VIEW_HEIGHT}`}
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path d={sparklinePath} className={blockSparklinePath} />
              </svg>
            ) : null}
          </div>
        ) : (
          <div className={blockBody}>{children}</div>
        )}
      </div>
    </div>
  );
}
