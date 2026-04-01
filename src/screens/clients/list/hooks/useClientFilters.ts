// src/screens/clients/list/hooks/useClientFilters.ts
import { useState, useMemo, useCallback } from "react";
import type { Client } from "../../types";

interface UseClientFiltersProps {
  clients: Client[];
}

export const useClientFilters = ({ clients }: UseClientFiltersProps) => {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);

  const filtered = clients;

  const uniqueCities = useMemo(() => {
    const cities = clients
      .map((c) => c.city)
      .filter((c): c is string => !!c);
    return [...new Set(cities)].sort();
  }, [clients]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCityFilter("");
    setActiveOnly(false);
  }, []);

  const hasActiveFilters =
    search.trim() !== "" || cityFilter !== "" || activeOnly;

  return {
    search,
    setSearch,
    cityFilter,
    setCityFilter,
    activeOnly,
    setActiveOnly,
    filtered,
    uniqueCities,
    clearFilters,
    hasActiveFilters,
  };
};
