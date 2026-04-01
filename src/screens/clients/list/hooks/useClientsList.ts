// src/screens/clients/list/hooks/useClientsList.ts
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useClientsStore } from "../../store/clientsStore";
import { useAuth } from "@/store/authStore";
import { RoutesView } from "@/navigation/routes";
import type { Client } from "../../types";

export const useClientsList = () => {
  const { clients, totalPages, currentPage, totalClients, isLoading, error, fetchClients } = useClientsStore();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    if (token) {
      fetchClients(token, page);
    }
  }, [token, page, fetchClients]);

  const setPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const refetch = () => {
    if (token) fetchClients(token, page);
  };

  const handleViewDetail = (client: Client) => {
    navigate(RoutesView.CLIENTS_DETAIL.replace(":id", client.id));
  };

  return { clients, totalPages, currentPage, totalClients, setPage, isLoading, error, refetch, handleViewDetail };
};
