// src/screens/registry/hooks/useLawyersRegistry.ts
import { useState, useEffect, useCallback } from "react";
import registryService from "../service/registryService";
import type { LawyerRegistryItem, RegistryResponse } from "../types";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/store/authStore";

export const useLawyersRegistry = () => {
  const { token } = useAuth();
  const [data, setData] = useState<LawyerRegistryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const fetchRegistry = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response: RegistryResponse = await registryService.getRegistry({
        q: debouncedSearch,
        page: currentPage,
        limit: 15,
        token: token,
      });
      setData(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching registry:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, currentPage, token]);

  useEffect(() => {
    fetchRegistry();
  }, [fetchRegistry]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    data,
    total,
    loading,
    currentPage,
    searchTerm,
    totalPages,
    handleSearchChange,
    handlePageChange,
    refresh: fetchRegistry,
  };
};
