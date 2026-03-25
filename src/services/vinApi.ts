import axios from "axios";
import type {
  DecodeVinResponse,
  VehicleVariablesResponse,
  VehicleVariableValuesResponse,
} from "@/types/vin";

const api = axios.create({
  baseURL: "https://vpic.nhtsa.dot.gov/api",
  params: { format: "json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("NHTSA API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const vehicleVariablesQueryKey = ["vehicleVariables"] as const;
export const vehicleVariablesStaleTime = 24 * 60 * 60 * 1000;

export const decodeVin = async (vin: string): Promise<DecodeVinResponse> => {
  const { data } = await api.get<DecodeVinResponse>(
    `/vehicles/decodevin/${encodeURIComponent(vin)}`
  );

  return data;
};

export const getVehicleVariables = async (): Promise<VehicleVariablesResponse> => {
  const { data } = await api.get<VehicleVariablesResponse>("/vehicles/getvehiclevariablelist");

  return data;
};

export const getVehicleVariableValuesList = async (
  variableId: number
): Promise<VehicleVariableValuesResponse> => {
  const { data } = await api.get<VehicleVariableValuesResponse>(
    `/vehicles/GetVehicleVariableValuesList/${variableId}`
  );

  return data;
};

export const getLookupVariableIds = async (variableIds: number[]): Promise<number[]> => {
  const results = await Promise.allSettled(
    variableIds.map((id) => getVehicleVariableValuesList(id))
  );

  return results
    .map((result, index) => {
      if (result.status === "fulfilled" && result.value.Results.length > 0) {
        return variableIds[index];
      }

      return null;
    })
    .filter((id): id is number => id !== null);
};
