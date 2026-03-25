import type { DecodeVinResultItem } from "@/types/vin";
import styles from "./VinResultsPanel.module.css";

interface VinResultsPanelProps {
  results: DecodeVinResultItem[];
}

export function VinResultsPanel({ results }: VinResultsPanelProps) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>Decode results</h2>
      {results.length === 0 ? (
        <p className={styles.emptyText}>Filled decode fields will appear here.</p>
      ) : (
        <dl className={styles.resultList}>
          {results.map((item, index) => (
            <div key={`${item.VariableId}-${index}`} className={styles.resultItem}>
              <dt className={styles.resultKey}>{item.Variable}</dt>
              <dd className={styles.resultValue}>{item.Value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
