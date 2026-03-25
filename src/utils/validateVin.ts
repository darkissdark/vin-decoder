const VIN_ALLOWED_PATTERN = /^[A-HJ-NPR-Z0-9]+$/i;

export function validateVin(value: string): string {
  const vin = value.trim().toUpperCase();

  if (!vin) {
    return "VIN is required";
  }

  if (vin.length > 17) {
    return "VIN must be 17 characters or less";
  }

  if (!VIN_ALLOWED_PATTERN.test(vin)) {
    return "VIN contains forbidden symbols (use A-H, J-N, P, R-Z and 0-9)";
  }

  return "";
}
