import { useMemo } from "react";
import type { VehicleVariable } from "@/types/vin";

type UseFilteredVariablesOptions = {
  search: string;
  selectedGroup: string;
  currentPage: number;
  pageSize?: number;
};

type UseFilteredVariablesResult = {
  groups: string[];
  paginatedVariables: VehicleVariable[];
  totalPages: number;
  safeCurrentPage: number;
  startIndex: number;
};

const DEFAULT_PAGE_SIZE = 10;

export function useFilteredVariables(
  variables: VehicleVariable[],
  { search, selectedGroup, currentPage, pageSize = DEFAULT_PAGE_SIZE }: UseFilteredVariablesOptions
): UseFilteredVariablesResult {
  return useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let filtered = variables;
    if (normalizedSearch) {
      filtered = filtered.filter((variable) =>
        variable.Name.toLowerCase().includes(normalizedSearch)
      );
    }

    if (selectedGroup !== "all") {
      filtered = filtered.filter(
        (variable) => (variable.GroupName ?? "Ungrouped") === selectedGroup
      );
    }

    const groups = Array.from(new Set(variables.map((item) => item.GroupName ?? "Ungrouped"))).sort(
      (a, b) => a.localeCompare(b)
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (safeCurrentPage - 1) * pageSize;
    const paginatedVariables = filtered.slice(startIndex, startIndex + pageSize);

    return {
      groups,
      paginatedVariables,
      totalPages,
      safeCurrentPage,
      startIndex,
    };
  }, [variables, search, selectedGroup, currentPage, pageSize]);
}
