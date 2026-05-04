import * as css from "./pre_flight_block.css";

export type PreFlightStatus = "ok" | "warn" | "info";

export interface PreFlightCheck {
  id: string;
  status: PreFlightStatus;
  label: string;
  detail?: string;
}

export interface PreFlightBlockProps {
  checks: readonly PreFlightCheck[];
}

export function PreFlightBlock({ checks }: PreFlightBlockProps): JSX.Element {
  const totalOk = checks.filter((c) => c.status === "ok").length;
  return (
    <div className={css.root}>
      <header className={css.headerRow}>
        <span className={css.title}>Pre-flight</span>
        <span className={css.summary}>
          {totalOk}/{checks.length} OK
        </span>
      </header>
      <ul className={css.list}>
        {checks.map((check) => (
          <li key={check.id} className={css.item}>
            <span
              aria-hidden="true"
              className={`${css.statusDot} ${css.statusVariant[check.status]}`}
            />
            <span className={css.itemLabel}>{check.label}</span>
            {check.detail && <span className={css.itemDetail}>{check.detail}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
