// src/screens/users/list/hooks/useUserFilters.ts
import { useState, useCallback } from "react";

export const useUserFilters = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const clearFilters = useCallback(() => {
    setSearch("");
    setStatusFilter("");
    setRoleFilter("");
  }, []);

  const hasActiveFilters = search.trim() !== "" || statusFilter !== "" || roleFilter !== "";

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    clearFilters,
    hasActiveFilters,
  };
};
