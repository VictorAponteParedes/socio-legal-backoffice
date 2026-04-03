import { useEffect, useCallback, useState } from "react";
import { useTermsStore } from "../../store/termsStore";
import { termsService } from "../../service/terms.service";
import { useAuth } from "@/store/authStore";
import type { CreateTermDto, TermsTarget } from "../../types";

export const useTermsList = (search: string, targetFilter?: TermsTarget | "all") => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    terms,
    total,
    totalPages,
    isLoading,
    error,
    setTermsData,
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
      const data = await termsService.findAll(currentPage, 10, targetFilter, search);
      setTermsData({
        terms: data.data,
        total: data.total,
        page: data.page,
        totalPages: data.totalPages
      });
    } catch {
      setError("Error al cargar los términos y condiciones.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, targetFilter, search, setLoading, setError, setTermsData]);

  useEffect(() => {
    fetchTerms();
  }, [fetchTerms]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, targetFilter]);

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
    totalTerms: total,
    totalPages,
    currentPage,
    setPage: setCurrentPage,
    isLoading,
    error,
    createTerm,
    updateExistingTerm,
    deleteTerm,
    refetch: fetchTerms,
  };
};
