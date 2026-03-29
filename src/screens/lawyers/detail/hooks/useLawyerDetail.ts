// src/screens/lawyers/detail/hooks/useLawyerDetail.ts
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { lawyersService } from "../../service/lawyersService";
import type { Lawyer } from "../../types";

export const useLawyerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await lawyersService.findOne(id);
      setLawyer(data);
    } catch (err) {
      setError("No se pudo cargar la información del abogado.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { lawyer, isLoading, error, refetch: fetchDetail };
};
