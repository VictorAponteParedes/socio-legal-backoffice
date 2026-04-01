// src/screens/clients/list/hooks/useClientsList.ts
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useClientsStore } from "../../store/clientsStore";
import { useAuth } from "@/store/authStore";
import { RoutesView } from "@/navigation/routes";
import type { Client } from "../../types";

export const useClientsList = (search: string, city: string, activeOnly: boolean) => {
  const { clients, totalPages, currentPage, totalClients, isLoading, error, fetchClients } = useClientsStore();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const statusFilter = activeOnly ? "active" : undefined;

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        // Reset a page 1 si es una búsqueda nueva (muy util en UX)
        fetchClients(token, page, 10, search, city, statusFilter);
      }, 400); // 400ms debounce

      return () => clearTimeout(timer);
    }
  }, [token, page, search, city, statusFilter, fetchClients]);

  const setPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const refetch = () => {
    if (token) fetchClients(token, page, 10, search, city, statusFilter);
  };

  const handleViewDetail = (client: Client) => {
    navigate(RoutesView.CLIENTS_DETAIL.replace(":id", client.id));
  };

  return { clients, totalPages, currentPage, totalClients, setPage, isLoading, error, refetch, handleViewDetail };
};
