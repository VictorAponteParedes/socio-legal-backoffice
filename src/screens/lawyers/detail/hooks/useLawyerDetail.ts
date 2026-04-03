// src/screens/lawyers/detail/hooks/useLawyerDetail.ts
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { lawyersService } from "../../service/lawyersService";
import type { Lawyer } from "../../types";
import { useAuth } from "@/store/authStore";

export const useLawyerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await lawyersService.findOne(id, token || undefined);
      setLawyer(data);
      
      // Also fetch chats using the user.id of the lawyer
      if (data && data.user && token) {
        setIsLoadingChats(true);
        const chatsData = await lawyersService.getLawyerChats(data.user.id, token);
        setChats(chatsData);
        setIsLoadingChats(false);
      }
    } catch (err) {
      setError("No se pudo cargar la información del abogado.");
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  const handleUpdateStatus = async (status: string) => {
    if (!id || !token) return;
    setIsUpdatingStatus(true);
    try {
      const updatedLawyer = await lawyersService.updateStatus(id, status, token);
      setLawyer(updatedLawyer);
      return true;
    } catch (err) {
      setError("No se pudo actualizar el estado del abogado.");
      return false;
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { 
    lawyer, 
    chats,
    isLoading,
    isLoadingChats, 
    isUpdatingStatus,
    error, 
    refetch: fetchDetail,
    handleUpdateStatus 
  };
};
