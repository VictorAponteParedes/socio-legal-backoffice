// src/screens/lawyers/hooks/useLawyerFilters.ts
import { useState, useMemo, useCallback } from "react";
import type { Lawyer } from "../types";

interface UseLawyerFiltersProps {
  lawyers: Lawyer[];
}

export const useLawyerFilters = ({ lawyers }: UseLawyerFiltersProps) => {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    return lawyers.filter((lawyer) => {
      const fullName =
        `${lawyer.user.name} ${lawyer.user.lastname}`.toLowerCase();
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        !searchTerm ||
        fullName.includes(searchTerm) ||
        lawyer.specializations.some((s) =>
          s.name.toLowerCase().includes(searchTerm)
        ) ||
        (lawyer.license?.toLowerCase().includes(searchTerm) ?? false);

      const matchesCity =
        !cityFilter ||
        (lawyer.city?.toLowerCase() ?? "").includes(cityFilter.toLowerCase());

      const matchesAvailable = !availableOnly || lawyer.isAvailable;

      return matchesSearch && matchesCity && matchesAvailable;
    });
  }, [lawyers, search, cityFilter, availableOnly]);

  const uniqueCities = useMemo(() => {
    const cities = lawyers
      .map((l) => l.city)
      .filter((c): c is string => !!c);
    return [...new Set(cities)].sort();
  }, [lawyers]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCityFilter("");
    setAvailableOnly(false);
  }, []);

  const hasActiveFilters =
    search.trim() !== "" || cityFilter !== "" || availableOnly;

  return {
    search,
    setSearch,
    cityFilter,
    setCityFilter,
    availableOnly,
    setAvailableOnly,
    filtered,
    uniqueCities,
    clearFilters,
    hasActiveFilters,
  };
};
