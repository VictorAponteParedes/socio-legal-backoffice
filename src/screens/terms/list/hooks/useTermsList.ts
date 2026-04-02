// src/screens/terms/list/hooks/useTermsList.ts
import { useEffect, useCallback } from "react";
import { useTermsStore } from "../../store/termsStore";
import { termsService } from "../../service/terms.service";
import { useAuth } from "@/store/authStore";
import type { CreateTermDto, TermsTarget } from "../../types";

export const useTermsList = (targetFilter?: TermsTarget | "all") => {
  const {
    terms,
    isLoading,
    error,
    setTerms,
    addTerm,
    updateTerm,
    removeTerm,
    setLoading,
    setError,
  } = useTermsStore();
  const { token } = useAuth();

  const fetchTerms = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await termsService.findAll(targetFilter);
      setTerms(data);
    } catch {
      setError("Error al cargar los términos y condiciones.");
    } finally {
      setLoading(false);
    }
  }, [token, targetFilter, setLoading, setError, setTerms]);

  useEffect(() => {
    fetchTerms();
  }, [fetchTerms]);

  const createTerm = async (dto: CreateTermDto) => {
    if (!token) return;
    try {
      const newTerm = await termsService.create(dto, token);
      addTerm(newTerm);
      return newTerm;
    } catch {
      setError("Error al crear el término.");
      throw new Error("Error al crear");
    }
  };

  const updateExistingTerm = async (
    id: string,
    dto: Partial<CreateTermDto>,
  ) => {
    if (!token) return;
    try {
      const updatedTerm = await termsService.update(id, dto, token);
      updateTerm(updatedTerm);
      return updatedTerm;
    } catch {
      setError("Error al actualizar el término.");
      throw new Error("Error al actualizar");
    }
  };

  const deleteTerm = async (id: string) => {
    if (!token) return;
    try {
      await termsService.delete(id, token);
      removeTerm(id);
    } catch {
      setError("Error al eliminar el término.");
      throw new Error("Error al eliminar");
    }
  };

  return {
    terms,
    isLoading,
    error,
    createTerm,
    updateExistingTerm,
    deleteTerm,
    refetch: fetchTerms,
  };
};
