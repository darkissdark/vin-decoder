import type { VehicleVariable } from "@/types/vin";
import { sanitizeHtml } from "@/utils/html";
import styles from "@/pages/VariableDetails/VariableDetailsPage.module.css";

type VariableCardProps = {
  variable: VehicleVariable;
};

export function VariableCard({ variable }: VariableCardProps) {
  const sanitizedDescription = variable.Description
    ? sanitizeHtml(variable.Description).trim()
    : "";

  return (
    <article className={styles.card}>
      <h1 className={styles.title}>{variable.Name}</h1>
      <p className={styles.meta}>ID: {variable.ID}</p>
      <p className={styles.meta}>Group: {variable.GroupName || "N/A"}</p>

      {sanitizedDescription ? (
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: sanitizedDescription,
          }}
        />
      ) : (
        <p className={styles.description}>No description available.</p>
      )}
    </article>
  );
}
