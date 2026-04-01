// src/screens/specializations/list/hooks/useSpecializationsList.ts
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSpecializationsStore } from "../../store/specializationsStore";
import { useAuth } from "@/store/authStore";

export const useSpecializationsList = (search: string) => {
  const { specializations, totalPages, currentPage, total, isLoading, error, fetchSpecializations, addSpecialization, deleteSpecialization } = useSpecializationsStore();
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        fetchSpecializations(token, page, 10, search);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [token, page, search, fetchSpecializations]);

  const setPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  return {
    specializations,
    totalPages,
    currentPage,
    total,
    setPage,
    isLoading,
    error,
    addSpecialization: async (data: any) => {
      if (token) await addSpecialization(token, data);
    },
    deleteSpecialization: (id: number) => token && deleteSpecialization(token, id),
  };
};
