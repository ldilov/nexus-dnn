import * as s from "../models_search.css";

interface PaginatorProps {
  page: number;
  pageSize: number;
  totalResults: number | null;
  onPageChange: (next: number) => void;
  onPageSizeChange: (next: number) => void;
}

function pagesWindow(current: number, total: number | null): Array<number | "…"> {
  if (total === null || total <= 0) return [current];
  const last = Math.max(1, Math.ceil(total));
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }
  const out: Array<number | "…"> = [1];
  if (current > 3) out.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(last - 1, current + 1); i++) {
    out.push(i);
  }
  if (current < last - 2) out.push("…");
  out.push(last);
  return out;
}

export function Paginator({
  page,
  pageSize,
  totalResults,
  onPageChange,
  onPageSizeChange,
}: PaginatorProps) {
  const lastPage =
    totalResults === null ? null : Math.max(1, Math.ceil(totalResults / pageSize));
  const pages = pagesWindow(page, lastPage);
  const isLast = lastPage !== null && page >= lastPage;

  return (
    <nav className={s.paginator} aria-label="Pagination">
      <button
        type="button"
        className={s.pageButton}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_left
        </span>
      </button>

      <div className={s.paginatorPages}>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e-${i}`} className={s.pageEllipsis} aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={
                p === page
                  ? `${s.pageButton} ${s.pageButtonActive}`
                  : s.pageButton
              }
              aria-current={p === page ? "page" : undefined}
              aria-label={`Page ${p}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className={s.pageButton}
        onClick={() => onPageChange(page + 1)}
        disabled={isLast}
        aria-label="Next page"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          chevron_right
        </span>
      </button>

      <label className={s.screenReaderOnly} htmlFor="models-search-ps">
        Results per page
      </label>
      <select
        id="models-search-ps"
        className={s.pageSizeSelect}
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number.parseInt(e.target.value, 10))}
      >
        <option value={10}>10 / page</option>
        <option value={30}>30 / page</option>
        <option value={50}>50 / page</option>
      </select>
    </nav>
  );
}
