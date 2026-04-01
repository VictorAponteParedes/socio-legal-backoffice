// src/screens/clients/list/hooks/useClientsList.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClientsStore } from "../../store/clientsStore";
import { useAuth } from "@/store/authStore";
import { RoutesView } from "@/navigation/routes";
import type { Client } from "../../types";

export const useClientsList = () => {
  const { clients, isLoading, error, fetchClients } = useClientsStore();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchClients(token);
    }
  }, [token, fetchClients]);

  const handleViewDetail = (client: Client) => {
    navigate(RoutesView.CLIENTS_DETAIL.replace(":id", client.id));
  };

  return { clients, isLoading, error, handleViewDetail };
};
