import { useCallback, useState } from "react";

type UseVariableFiltersResult = {
  search: string;
  setSearch: (next: string) => void;
  selectedGroup: string;
  setSelectedGroup: (next: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export function useVariableFilters(): UseVariableFiltersResult {
  const [search, setSearchState] = useState("");
  const [selectedGroup, setSelectedGroupState] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const setSearch = useCallback((next: string) => {
    setSearchState(next);
    setCurrentPage(1);
  }, []);

  const setSelectedGroup = useCallback((next: string) => {
    setSelectedGroupState(next);
    setCurrentPage(1);
  }, []);

  return {
    search,
    setSearch,
    selectedGroup,
    setSelectedGroup,
    currentPage,
    setCurrentPage,
  };
}
