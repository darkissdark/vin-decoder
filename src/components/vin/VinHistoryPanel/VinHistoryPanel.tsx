import { Button } from "@/components/ui/Button/Button";
import styles from "./VinHistoryPanel.module.css";

interface VinHistoryPanelProps {
  history: string[];
  onSelectVin: (vin: string) => Promise<void>;
}

export function VinHistoryPanel({ history, onSelectVin }: VinHistoryPanelProps) {
  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionTitle}>Last 3 requests</h2>
      {history.length === 0 ? (
        <p className={styles.emptyText}>No VIN requests yet.</p>
      ) : (
        <ul className={styles.historyList}>
          {history.map((historyVin) => (
            <li key={historyVin}>
              <Button type="button" variant="secondary" onClick={() => onSelectVin(historyVin)}>
                {historyVin}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
