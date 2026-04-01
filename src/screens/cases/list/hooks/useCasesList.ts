// src/screens/cases/list/hooks/useCasesList.ts
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCasesStore } from "../../store/casesStore";
import { useAuth } from "@/store/authStore";
import { RoutesView } from "@/navigation/routes";
import type { Case } from "../../types";

export const useCasesList = (search: string, statusFilter: string) => {
  const { cases, totalPages, currentPage, totalCases, isLoading, error, fetchCases } = useCasesStore();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        fetchCases(token, page, 10, search, statusFilter);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [token, page, search, statusFilter, fetchCases]);

  const setPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const refetch = () => {
    if (token) {
      fetchCases(token, page, 10, search, statusFilter);
    }
  };

  const handleViewDetail = (caseItem: Case) => {
    navigate(RoutesView.CASES_DETAIL.replace(":id", caseItem.id)); // This route might need mapping
  };

  return { 
    cases, 
    totalPages, 
    currentPage, 
    totalCases, 
    setPage, 
    isLoading, 
    error, 
    refetch, 
    handleViewDetail 
  };
};
