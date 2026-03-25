import type { VehicleVariable } from "@/types/vin";
import type { VariableDetailsState } from "@/hooks/useVariableDetails";
import { VariableCard } from "@/components/variables/VariableCard/VariableCard";
import styles from "@/pages/VariableDetails/VariableDetailsPage.module.css";

type VariableDetailsContentProps = {
  state: VariableDetailsState;
  variable: VehicleVariable | undefined;
  parsedId: number;
};

export function VariableDetailsContent({ state, variable, parsedId }: VariableDetailsContentProps) {
  if (state === "invalid") {
    return <p className={styles.error}>Invalid Variable ID.</p>;
  }

  if (state === "loading") {
    return <p className={styles.message}>Loading variable details...</p>;
  }

  if (state === "error") {
    return <p className={styles.error}>Failed to fetch data from NHTSA.</p>;
  }

  if (state === "notFound") {
    return <p className={styles.message}>Variable #{parsedId} not found.</p>;
  }

  if (!variable) {
    return <p className={styles.message}>Variable #{parsedId} not found.</p>;
  }

  return <VariableCard variable={variable} />;
}
