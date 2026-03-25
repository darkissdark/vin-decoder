import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./VinForm.module.css";

interface VinFormProps {
  vin: string;
  isPending: boolean;
  onVinChange: (value: string) => void;
  onSubmitVin: (value: string) => Promise<void>;
}

export function VinForm({ vin, isPending, onVinChange, onSubmitVin }: VinFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmitVin(vin);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="vin" className={styles.label}>
        VIN code
      </label>
      <div className={styles.formRow}>
        <input
          id="vin"
          name="vin"
          type="search"
          className={styles.input}
          placeholder="1FTFW1CT5DFC10312"
          value={vin}
          maxLength={17}
          onChange={(event) => onVinChange(event.target.value.toUpperCase())}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Decoding..." : "Decode"}
        </Button>
      </div>
    </form>
  );
}
