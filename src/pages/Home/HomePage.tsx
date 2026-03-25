import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { VinForm } from "@/components/vin/VinForm/VinForm";
import { VinHistoryPanel } from "@/components/vin/VinHistoryPanel/VinHistoryPanel";
import { VinResultsPanel } from "@/components/vin/VinResultsPanel/VinResultsPanel";
import { decodeVin } from "@/services/vinApi";
import { getVinHistory, saveVinToHistory } from "@/utils/history";
import { validateVin } from "@/utils/validateVin";
import { PageMeta } from "@/components/seo/PageMeta/PageMeta";
import styles from "./HomePage.module.css";

const excludedVariables = new Set(["Error Code", "Error Text"]);

const isNotApplicableValue = (value: string | null): boolean => {
  if (value === null) {
    return false;
  }

  return String(value).trim().toLowerCase() === "not applicable";
};

export function HomePage() {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<string[]>(() => getVinHistory());
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: decodeVin,
    onSuccess: (_, normalizedVin) => {
      const nextHistory = saveVinToHistory(normalizedVin);
      setHistory(nextHistory);
      setVin(normalizedVin);
    },
    onError: () => {
      setError("Request failed. Please try again later.");
    },
  });

  const message = data?.Message ?? "";

  const filledResults = useMemo(
    () =>
      (data?.Results ?? []).filter(
        (item) =>
          !excludedVariables.has(item.Variable) &&
          item.Value !== null &&
          String(item.Value).trim().length > 0 &&
          !isNotApplicableValue(item.Value)
      ),
    [data?.Results]
  );

  const loadVinData = async (inputValue: string) => {
    const normalizedVin = inputValue.trim().toUpperCase();
    const validationError = validateVin(normalizedVin);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    await mutateAsync(normalizedVin);
  };

  return (
    <section>
      <PageMeta
        title="VIN Decoder"
        description="Decode vehicle details by VIN using the official NHTSA open API."
      />

      <h1 className={styles.title}>VIN Decoder</h1>
      <p className={styles.subtitle}>Decode vehicle details by VIN using the NHTSA open API.</p>

      <VinForm vin={vin} isPending={isPending} onVinChange={setVin} onSubmitVin={loadVinData} />

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}

      <VinHistoryPanel
        history={history}
        onSelectVin={(selectedVin) => {
          setVin(selectedVin);
          return loadVinData(selectedVin);
        }}
      />
      <VinResultsPanel results={filledResults} />
    </section>
  );
}
