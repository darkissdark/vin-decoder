import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getVehicleVariables,
  vehicleVariablesQueryKey,
  vehicleVariablesStaleTime,
} from "@/services/vinApi";
import { PageMeta } from "@/components/seo/PageMeta/PageMeta";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { VariableFilters } from "@/components/variables/VariableFilters/VariableFilters";
import { VariableList } from "@/components/variables/VariableList/VariableList";
import { useFilteredVariables } from "@/hooks/useFilteredVariables";
import { useVariableFilters } from "@/hooks/useVariableFilters";
import styles from "./VariablesPage.module.css";

export function VariablesPage() {
  const { search, setSearch, selectedGroup, setSelectedGroup, currentPage, setCurrentPage } =
    useVariableFilters();

  const { data, isLoading, isError } = useQuery({
    queryKey: vehicleVariablesQueryKey,
    queryFn: getVehicleVariables,
    staleTime: vehicleVariablesStaleTime,
  });

  const variables = data?.Results ?? [];
  const message = data?.Message ?? "";

  const { paginatedVariables, totalPages, groups, safeCurrentPage } = useFilteredVariables(
    variables,
    {
      search,
      selectedGroup,
      currentPage,
    }
  );

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage, setCurrentPage]);

  if (isError) {
    return (
      <section>
        <PageMeta
          title="Vehicle Variables - VIN Decoder"
          description="Browse the full list of NHTSA vehicle variables and their official descriptions."
        />
        <p className={styles.error}>Unable to load variables.</p>
      </section>
    );
  }

  return (
    <section>
      <PageMeta
        title="Vehicle Variables - VIN Decoder"
        description="Browse the full list of NHTSA vehicle variables and their official descriptions."
      />

      <h1 className={styles.title}>Vehicle Variables</h1>
      <p className={styles.subtitle}>Full list of available NHTSA variable descriptions.</p>

      <VariableFilters
        search={search}
        onSearchChange={setSearch}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        groups={groups}
      />

      {message && <p className={styles.message}>{message}</p>}

      {isLoading ? (
        <p className={styles.message}>Loading...</p>
      ) : (
        <>
          <VariableList items={paginatedVariables} />
          <Pagination current={safeCurrentPage} total={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </section>
  );
}
