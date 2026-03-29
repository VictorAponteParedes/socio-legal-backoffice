// src/screens/lawyers/hooks/useLawyers.ts
import { useState, useEffect, useCallback } from "react";
import { lawyersService } from "../service/lawyersService";
import type { Lawyer } from "../types";

interface UseLawyersState {
  lawyers: Lawyer[];
  isLoading: boolean;
  error: string | null;
}

export const useLawyers = () => {
  const [state, setState] = useState<UseLawyersState>({
    lawyers: [],
    isLoading: true,
    error: null,
  });

  const fetchLawyers = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await lawyersService.findAll();
      setState({ lawyers: data, isLoading: false, error: null });
    } catch (err) {
      setState({
        lawyers: [],
        isLoading: false,
        error: "No se pudieron cargar los abogados. Intenta de nuevo.",
      });
      console.error("Error fetching lawyers:", err);
    }
  }, []);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  return {
    ...state,
    refetch: fetchLawyers,
  };
};
