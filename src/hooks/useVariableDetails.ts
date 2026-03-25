import { useQuery } from "@tanstack/react-query";
import type { VehicleVariable, VehicleVariablesResponse } from "@/types/vin";
import {
  getVehicleVariables,
  vehicleVariablesQueryKey,
  vehicleVariablesStaleTime,
} from "@/services/vinApi";

export type VariableDetailsState = "invalid" | "loading" | "error" | "notFound" | "ready";

export type VariableDetailsMeta = {
  title: string;
  description: string;
  ogType?: "article" | "website";
};

export function useVariableDetails(variableId: string | undefined): {
  state: VariableDetailsState;
  variable: VehicleVariable | undefined;
  meta: VariableDetailsMeta;
  parsedId: number;
} {
  const parsedId = Number(variableId);
  const hasValidVariableId = Number.isInteger(parsedId) && parsedId > 0;

  const {
    data: variable,
    isLoading,
    isError,
  } = useQuery({
    queryKey: vehicleVariablesQueryKey,
    queryFn: getVehicleVariables,
    staleTime: vehicleVariablesStaleTime,
    enabled: hasValidVariableId,
    select: (response: VehicleVariablesResponse | undefined): VehicleVariable | undefined =>
      response?.Results?.find((item) => item.ID === parsedId),
  });

  const state: VariableDetailsState = !hasValidVariableId
    ? "invalid"
    : isLoading
      ? "loading"
      : isError
        ? "error"
        : variable
          ? "ready"
          : "notFound";

  let title = "";
  let description = "";
  let ogType: "article" | "website" = "website";

  switch (state) {
    case "invalid":
      title = "Invalid Variable ID - VIN Decoder";
      description = "Invalid NHTSA vehicle variable ID.";
      break;
    case "loading":
      title = "Loading variable... - VIN Decoder";
      description = "Loading NHTSA vehicle variable details.";
      break;
    case "error":
      title = "Failed to load - VIN Decoder";
      description = "Failed to fetch variable details from the NHTSA API.";
      break;
    case "notFound":
      title = `Variable #${parsedId} not found - VIN Decoder`;
      description = `NHTSA vehicle variable #${parsedId} was not found.`;
      break;
    case "ready":
      if (variable) {
        ogType = "article";
        title = `${variable.Name} - VIN Decoder`;
        description = `Official NHTSA description for the vehicle variable “${variable.Name}”.`;
      }
      break;
  }

  return {
    state,
    variable,
    meta: { title, description, ogType },
    parsedId,
  };
}
