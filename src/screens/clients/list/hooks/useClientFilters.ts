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

  const filtered = useMemo(() => {
    return clients.filter((client) => {
      const fullName = `${client.user.name} ${client.user.lastname}`.toLowerCase();
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        !searchTerm ||
        fullName.includes(searchTerm) ||
        (client.user.email?.toLowerCase().includes(searchTerm) ?? false) ||
        (client.user.cedula?.toLowerCase().includes(searchTerm) ?? false);

      const matchesCity =
        !cityFilter ||
        (client.city?.toLowerCase() ?? "").includes(cityFilter.toLowerCase());

      const matchesActive = !activeOnly || client.user.status === "active";

      return matchesSearch && matchesCity && matchesActive;
    });
  }, [clients, search, cityFilter, activeOnly]);

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
