const HISTORY_KEY = "vin_decoder_last_requests";
const MAX_HISTORY_ITEMS = 3;

export function getVinHistory(): string[] {
  try {
    const rawValue = localStorage.getItem(HISTORY_KEY);
    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function saveVinToHistory(vin: string): string[] {
  const normalizedVin = vin.trim().toUpperCase();
  const nextHistory = [
    normalizedVin,
    ...getVinHistory().filter((item) => item !== normalizedVin),
  ].slice(0, MAX_HISTORY_ITEMS);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));

  return nextHistory;
}
