import styles from "./Pagination.module.css";

type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (next: number) => void;
};

export function Pagination({ current, total, onPageChange }: PaginationProps) {
  const changePage = (next: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(next);
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.paginationButton}
        onClick={() => changePage(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {current} of {total}
      </span>
      <button
        type="button"
        className={styles.paginationButton}
        onClick={() => changePage(Math.min(total, current + 1))}
        disabled={current === total}
      >
        Next
      </button>
    </div>
  );
}
