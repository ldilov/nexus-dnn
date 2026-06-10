import * as s from "./ModelIdentity.css";

export interface ModelIdentityProps {
  familyId?: string;
  onDiskPath?: string;
  jobId?: string;
}

/**
 * On-disk identity for an installed model (spec 054 G7.3). Models live under
 * opaque GUID job dirs; this surfaces the owning family, resolved on-disk
 * path, and job id so an operator can map a dir back to a model. Absent
 * fields (legacy rows, model store not wired) are skipped — the panel only
 * renders when at least one identity field is present.
 */
export function ModelIdentity({ familyId, onDiskPath, jobId }: ModelIdentityProps) {
  if (!familyId && !onDiskPath && !jobId) return null;

  return (
    <dl className={s.panel} role="group" aria-label="On-disk model identity">
      {familyId ? (
        <div className={s.row}>
          <dt className={s.label}>Family</dt>
          <dd className={`${s.value} ${s.family}`}>{familyId}</dd>
        </div>
      ) : null}
      {onDiskPath ? (
        <div className={s.row}>
          <dt className={s.label}>Path</dt>
          <dd className={s.value} title={onDiskPath}>
            {onDiskPath}
          </dd>
        </div>
      ) : null}
      {jobId ? (
        <div className={s.row}>
          <dt className={s.label}>Job</dt>
          <dd className={s.value}>{jobId}</dd>
        </div>
      ) : null}
    </dl>
  );
}
