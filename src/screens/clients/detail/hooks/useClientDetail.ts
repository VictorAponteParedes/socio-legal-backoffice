// src/screens/clients/detail/hooks/useClientDetail.ts
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClientsStore } from "../../store/clientsStore";
import { useAuth } from "@/store/authStore";

export const useClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const { selectedClient, isLoading, error, fetchClient, clearSelected } = useClientsStore();

  useEffect(() => {
    if (token && id) {
      fetchClient(id, token);
    }
    return () => clearSelected();
  }, [id, token, fetchClient, clearSelected]);

  return { client: selectedClient, isLoading, error };
};
