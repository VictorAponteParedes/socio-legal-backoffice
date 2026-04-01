// src/screens/cases/list/hooks/useCaseFilters.ts
import { useState, useCallback } from "react";

export const useCaseFilters = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const clearFilters = useCallback(() => {
    setSearch("");
    setStatusFilter("");
  }, []);

  const hasActiveFilters = search.trim() !== "" || statusFilter !== "";

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    clearFilters,
    hasActiveFilters,
  };
};
