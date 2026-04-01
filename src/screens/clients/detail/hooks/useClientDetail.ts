// src/screens/clients/detail/hooks/useClientDetail.ts
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClientsStore } from "../../store/clientsStore";
import { useAuth } from "@/store/authStore";

export const useClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const { selectedClient, isLoading, isUpdatingStatus, error, fetchClient, updateClientStatus, clearSelected } = useClientsStore();

  useEffect(() => {
    if (token && id) {
      fetchClient(id, token);
    }
    return () => clearSelected();
  }, [id, token, fetchClient, clearSelected]);

  const handleUpdateStatus = async (status: "active" | "inactive" | "suspended" | "pending") => {
    if (id && token) {
      await updateClientStatus(id, status, token);
    }
  };

  return { client: selectedClient, isLoading, isUpdatingStatus, error, handleUpdateStatus };
};
